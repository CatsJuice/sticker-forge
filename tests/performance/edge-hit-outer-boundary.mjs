import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { performance } from "node:perf_hooks";
import { pathToFileURL } from "node:url";

const VISIBLE_ALPHA_THRESHOLD = 0.1 * 255;
// V8 promotes these loop-heavy methods to its final optimizing tier only after
// roughly 40k calls. Thirty warmups keep tiering out of the measured samples.
const DEFAULT_WARMUPS = 30;
const DEFAULT_SAMPLES = 25;
const PARITY_QUERY_COUNT_PER_MASK = 4_096;
const BENCHMARK_QUERY_STRIDE = 4;
const RADIUS_SEQUENCE = Object.freeze([
  3.25,
  8.5,
  16.75,
  31.5,
  47.25,
  59.75,
]);

function clamp(value, minimum, maximum) {
  return Math.min(maximum, Math.max(minimum, value));
}

function nextRandom(state) {
  let value = state.value | 0;
  value ^= value << 13;
  value ^= value >>> 17;
  value ^= value << 5;
  state.value = value | 0;
  return (value >>> 0) / 4_294_967_296;
}

function hashBytes(value) {
  return createHash("sha256").update(value).digest("hex");
}

// Exact port of createExteriorAlphaMask from lib/source.ts.
export function createExteriorAlphaMask(alpha, width, height) {
  const exterior = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let queueStart = 0;
  let queueEnd = 0;

  const enqueue = (x, y) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    if (exterior[index] || alpha[index] >= VISIBLE_ALPHA_THRESHOLD) return;
    exterior[index] = 1;
    queue[queueEnd] = index;
    queueEnd += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (queueStart < queueEnd) {
    const index = queue[queueStart];
    queueStart += 1;
    const x = index % width;
    const y = Math.floor(index / width);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }
  return exterior;
}

// Exact port of createOuterBoundaryMask from lib/source.ts.
export function createOuterBoundaryMask(alpha, width, height) {
  const exterior = createExteriorAlphaMask(alpha, width, height);
  const boundary = new Uint8Array(width * height);
  for (let y = 0; y < height; y += 1) {
    const rowOffset = y * width;
    for (let x = 0; x < width; x += 1) {
      const index = rowOffset + x;
      if (alpha[index] < VISIBLE_ALPHA_THRESHOLD) continue;
      if (
        x === 0 ||
        x === width - 1 ||
        y === 0 ||
        y === height - 1 ||
        exterior[index - 1] === 1 ||
        exterior[index + 1] === 1 ||
        exterior[index - width] === 1 ||
        exterior[index + width] === 1
      ) {
        boundary[index] = 1;
      }
    }
  }
  return boundary;
}

function createLegacyBoundaryMask(alpha, exterior, width, height) {
  const boundary = new Uint8Array(width * height);
  const sampleExterior = (x, y) => {
    const pixelX = Math.round(x);
    const pixelY = Math.round(y);
    if (pixelX < 0 || pixelX >= width || pixelY < 0 || pixelY >= height) {
      return true;
    }
    return exterior[pixelY * width + pixelX] === 1;
  };

  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const index = y * width + x;
      if (alpha[index] / 255 < 0.1) continue;
      if (
        sampleExterior(x - 1, y) ||
        sampleExterior(x + 1, y) ||
        sampleExterior(x, y - 1) ||
        sampleExterior(x, y + 1)
      ) {
        boundary[index] = 1;
      }
    }
  }
  return boundary;
}

function createRepresentativeAlphaMask({
  width,
  height,
  seed,
  phase,
  portrait,
}) {
  const alpha = new Uint8ClampedArray(width * height);
  const centerX = width * (portrait ? 0.48 : 0.51);
  const centerY = height * (portrait ? 0.51 : 0.49);
  const radiusX = width * (portrait ? 0.34 : 0.38);
  const radiusY = height * (portrait ? 0.39 : 0.34);
  const holes = [
    {
      x: centerX - radiusX * 0.3,
      y: centerY - radiusY * 0.16,
      radius: Math.min(width, height) * 0.055,
    },
    {
      x: centerX + radiusX * 0.12,
      y: centerY + radiusY * 0.2,
      radius: Math.min(width, height) * 0.072,
    },
    {
      x: centerX + radiusX * 0.32,
      y: centerY - radiusY * 0.23,
      radius: Math.min(width, height) * 0.038,
    },
  ];

  for (let y = 0; y < height; y += 1) {
    const normalizedY = (y - centerY) / radiusY;
    for (let x = 0; x < width; x += 1) {
      const normalizedX = (x - centerX) / radiusX;
      const angle = Math.atan2(normalizedY, normalizedX);
      const radialDistance = Math.hypot(normalizedX, normalizedY);
      const contour =
        1
        + Math.sin(angle * 7 + phase) * 0.055
        + Math.cos(angle * 11 - phase * 0.7) * 0.028;
      const contourDepth = contour - radialDistance;
      if (contourDepth < 0) continue;

      // A transparent bay connected to the canvas exterior creates a concave
      // outer contour. The separate circular holes must remain non-boundaries.
      const inExteriorBay =
        x > centerX + radiusX * 0.24
        && Math.abs(y - centerY + radiusY * 0.04)
          < radiusY * (0.035 + (x - centerX) / width * 0.09);
      if (inExteriorBay) continue;

      let inHole = false;
      for (const hole of holes) {
        const offsetX = x - hole.x;
        const offsetY = y - hole.y;
        if (offsetX * offsetX + offsetY * offsetY <= hole.radius ** 2) {
          inHole = true;
          break;
        }
      }
      if (inHole) continue;

      const noise =
        ((Math.imul(x + seed, 1_103_515_245)
          ^ Math.imul(y + seed * 17, 12_345)) >>> 0) & 31;
      const index = y * width + x;
      if (contourDepth < 0.0025) {
        alpha[index] = 20 + (noise & 3);
      } else if (contourDepth < 0.009) {
        alpha[index] = 32 + noise;
      } else {
        alpha[index] = 224 + noise;
      }
    }
  }

  return {
    alpha,
    width,
    height,
    holes,
    centerX,
    centerY,
    radiusX,
    radiusY,
  };
}

function boundaryCoordinates(boundary) {
  let count = 0;
  for (const value of boundary) {
    if (value === 1) count += 1;
  }
  const coordinates = new Int32Array(count);
  let offset = 0;
  for (let index = 0; index < boundary.length; index += 1) {
    if (boundary[index] !== 1) continue;
    coordinates[offset] = index;
    offset += 1;
  }
  return coordinates;
}

function createQueries(fixture, boundary, count, seed) {
  const { width, height, holes, centerX, centerY, radiusX, radiusY } = fixture;
  const boundaryPixels = boundaryCoordinates(boundary);
  assert.ok(boundaryPixels.length > 1_000, "fixture contour is too small");
  const randomState = { value: seed | 0 };
  const queries = new Float64Array(count * 3);

  for (let queryIndex = 0; queryIndex < count; queryIndex += 1) {
    const type = queryIndex % 8;
    const radius =
      RADIUS_SEQUENCE[queryIndex % RADIUS_SEQUENCE.length]
      + nextRandom(randomState) * 0.45;
    let pixelX;
    let pixelY;

    if (type <= 3) {
      const boundaryIndex =
        boundaryPixels[
          Math.floor(nextRandom(randomState) * boundaryPixels.length)
        ];
      pixelX =
        boundaryIndex % width
        + (nextRandom(randomState) - 0.5) * radius * 1.6;
      pixelY =
        Math.floor(boundaryIndex / width)
        + (nextRandom(randomState) - 0.5) * radius * 1.6;
    } else if (type === 4 || type === 5) {
      const hole = holes[queryIndex % holes.length];
      const angle = nextRandom(randomState) * Math.PI * 2;
      const distance =
        hole.radius + (nextRandom(randomState) - 0.5) * radius * 1.5;
      pixelX = hole.x + Math.cos(angle) * distance;
      pixelY = hole.y + Math.sin(angle) * distance;
    } else if (type === 6) {
      pixelX =
        centerX + (nextRandom(randomState) - 0.5) * radiusX * 1.1;
      pixelY =
        centerY + (nextRandom(randomState) - 0.5) * radiusY * 1.1;
    } else {
      const side = queryIndex % 4;
      pixelX =
        side === 0
          ? -nextRandom(randomState) * 60
          : side === 1
            ? width - 1 + nextRandom(randomState) * 60
            : nextRandom(randomState) * width;
      pixelY =
        side === 2
          ? -nextRandom(randomState) * 60
          : side === 3
            ? height - 1 + nextRandom(randomState) * 60
            : nextRandom(randomState) * height;
    }

    const offset = queryIndex * 3;
    queries[offset] = pixelX;
    queries[offset + 1] = pixelY;
    queries[offset + 2] = radius;
  }
  return queries;
}

class LegacyEdgeHitLookup {
  constructor(alpha, exterior, width, height) {
    this.artwork = { alpha, exteriorAlpha: exterior, width, height };
  }

  sampleAlpha(x, y) {
    const pixelX = clamp(Math.round(x), 0, this.artwork.width - 1);
    const pixelY = clamp(Math.round(y), 0, this.artwork.height - 1);
    return this.artwork.alpha[pixelY * this.artwork.width + pixelX] / 255;
  }

  sampleExterior(x, y) {
    const pixelX = Math.round(x);
    const pixelY = Math.round(y);
    if (
      pixelX < 0
      || pixelX >= this.artwork.width
      || pixelY < 0
      || pixelY >= this.artwork.height
    ) {
      return true;
    }
    return (
      this.artwork.exteriorAlpha[pixelY * this.artwork.width + pixelX] === 1
    );
  }

  hitEdge(pixelX, pixelY, radius) {
    const searchRadius = Math.ceil(radius);
    const minimumX = Math.max(0, Math.floor(pixelX - searchRadius));
    const maximumX = Math.min(
      this.artwork.width - 1,
      Math.ceil(pixelX + searchRadius),
    );
    const minimumY = Math.max(0, Math.floor(pixelY - searchRadius));
    const maximumY = Math.min(
      this.artwork.height - 1,
      Math.ceil(pixelY + searchRadius),
    );
    let nearestX = -1;
    let nearestY = -1;
    let nearestDistanceSq = radius * radius + 1;

    for (let candidateY = minimumY; candidateY <= maximumY; candidateY += 1) {
      for (
        let candidateX = minimumX;
        candidateX <= maximumX;
        candidateX += 1
      ) {
        const offsetX = candidateX - pixelX;
        const offsetY = candidateY - pixelY;
        const distanceSq = offsetX * offsetX + offsetY * offsetY;
        if (
          distanceSq >= nearestDistanceSq
          || distanceSq > radius * radius
        ) {
          continue;
        }
        const alpha = this.sampleAlpha(candidateX, candidateY);
        if (alpha < 0.1) continue;
        const isOuterBoundary =
          this.sampleExterior(candidateX - 1, candidateY)
          || this.sampleExterior(candidateX + 1, candidateY)
          || this.sampleExterior(candidateX, candidateY - 1)
          || this.sampleExterior(candidateX, candidateY + 1);
        if (!isOuterBoundary) continue;
        nearestX = candidateX;
        nearestY = candidateY;
        nearestDistanceSq = distanceSq;
      }
    }
    return nearestX < 0
      ? null
      : { x: nearestX, y: nearestY, distanceSq: nearestDistanceSq };
  }
}

class OptimizedEdgeHitLookup {
  constructor(outerBoundary, width, height) {
    this.artwork = { outerBoundary, width, height };
  }

  hitEdge(pixelX, pixelY, radius) {
    const searchRadius = Math.ceil(radius);
    const minimumX = Math.max(0, Math.floor(pixelX - searchRadius));
    const maximumX = Math.min(
      this.artwork.width - 1,
      Math.ceil(pixelX + searchRadius),
    );
    const minimumY = Math.max(0, Math.floor(pixelY - searchRadius));
    const maximumY = Math.min(
      this.artwork.height - 1,
      Math.ceil(pixelY + searchRadius),
    );
    let nearestX = -1;
    let nearestY = -1;
    let nearestDistanceSq = radius * radius + 1;

    for (let candidateY = minimumY; candidateY <= maximumY; candidateY += 1) {
      for (
        let candidateX = minimumX;
        candidateX <= maximumX;
        candidateX += 1
      ) {
        const offsetX = candidateX - pixelX;
        const offsetY = candidateY - pixelY;
        const distanceSq = offsetX * offsetX + offsetY * offsetY;
        if (
          distanceSq >= nearestDistanceSq
          || distanceSq > radius * radius
        ) {
          continue;
        }
        const candidateIndex =
          candidateY * this.artwork.width + candidateX;
        if (this.artwork.outerBoundary[candidateIndex] !== 1) continue;
        nearestX = candidateX;
        nearestY = candidateY;
        nearestDistanceSq = distanceSq;
      }
    }
    return nearestX < 0
      ? null
      : { x: nearestX, y: nearestY, distanceSq: nearestDistanceSq };
  }
}

function createFixture(specification) {
  const fixture = createRepresentativeAlphaMask(specification);
  const exterior = createExteriorAlphaMask(
    fixture.alpha,
    fixture.width,
    fixture.height,
  );
  const legacyBoundary = createLegacyBoundaryMask(
    fixture.alpha,
    exterior,
    fixture.width,
    fixture.height,
  );
  const outerBoundary = createOuterBoundaryMask(
    fixture.alpha,
    fixture.width,
    fixture.height,
  );
  assert.deepEqual(
    outerBoundary,
    legacyBoundary,
    "precomputed boundary differs from legacy exterior-neighbor semantics",
  );

  let enclosedHoleEdgesChecked = 0;
  for (const hole of fixture.holes) {
    for (let direction = 0; direction < 4; direction += 1) {
      const angle = direction * Math.PI * 0.5;
      let x = Math.round(hole.x + Math.cos(angle) * (hole.radius + 1));
      let y = Math.round(hole.y + Math.sin(angle) * (hole.radius + 1));
      for (let step = 0; step < 5; step += 1) {
        const index = y * fixture.width + x;
        if (fixture.alpha[index] >= VISIBLE_ALPHA_THRESHOLD) {
          assert.equal(
            outerBoundary[index],
            0,
            "transparent enclosed holes must not become peel boundaries",
          );
          enclosedHoleEdgesChecked += 1;
          break;
        }
        x += Math.sign(Math.cos(angle));
        y += Math.sign(Math.sin(angle));
      }
    }
  }
  assert.equal(enclosedHoleEdgesChecked, fixture.holes.length * 4);

  const parityQueries = createQueries(
    fixture,
    outerBoundary,
    PARITY_QUERY_COUNT_PER_MASK,
    specification.seed ^ 0x51f15e,
  );
  const benchmarkQueryCount =
    Math.ceil(PARITY_QUERY_COUNT_PER_MASK / BENCHMARK_QUERY_STRIDE);
  const benchmarkQueries = new Float64Array(benchmarkQueryCount * 3);
  let benchmarkOffset = 0;
  for (
    let queryIndex = 0;
    queryIndex < PARITY_QUERY_COUNT_PER_MASK;
    queryIndex += BENCHMARK_QUERY_STRIDE
  ) {
    benchmarkQueries.set(
      parityQueries.subarray(queryIndex * 3, queryIndex * 3 + 3),
      benchmarkOffset,
    );
    benchmarkOffset += 3;
  }

  return {
    ...fixture,
    exterior,
    legacyBoundary,
    outerBoundary,
    legacyLookup: new LegacyEdgeHitLookup(
      fixture.alpha,
      exterior,
      fixture.width,
      fixture.height,
    ),
    optimizedLookup: new OptimizedEdgeHitLookup(
      outerBoundary,
      fixture.width,
      fixture.height,
    ),
    parityQueries,
    benchmarkQueries,
    enclosedHoleEdgesChecked,
  };
}

function updateChecksum(checksum, hit) {
  let value = checksum;
  value = Math.imul(value ^ (hit?.x ?? -1), 16_777_619);
  value = Math.imul(value ^ (hit?.y ?? -1), 16_777_619);
  return value >>> 0;
}

function runLegacyQueryBatch(fixtures, queryField) {
  let checksum = 2_166_136_261;
  let hits = 0;
  let queries = 0;
  for (const fixture of fixtures) {
    const queryValues = fixture[queryField];
    for (let offset = 0; offset < queryValues.length; offset += 3) {
      const pixelX = queryValues[offset];
      const pixelY = queryValues[offset + 1];
      const radius = queryValues[offset + 2];
      const hit = fixture.legacyLookup.hitEdge(pixelX, pixelY, radius);
      if (hit) hits += 1;
      checksum = updateChecksum(checksum, hit);
      queries += 1;
    }
  }
  return { checksum, hits, queries };
}

function runOptimizedQueryBatch(fixtures, queryField) {
  let checksum = 2_166_136_261;
  let hits = 0;
  let queries = 0;
  for (const fixture of fixtures) {
    const queryValues = fixture[queryField];
    for (let offset = 0; offset < queryValues.length; offset += 3) {
      const pixelX = queryValues[offset];
      const pixelY = queryValues[offset + 1];
      const radius = queryValues[offset + 2];
      const hit = fixture.optimizedLookup.hitEdge(pixelX, pixelY, radius);
      if (hit) hits += 1;
      checksum = updateChecksum(checksum, hit);
      queries += 1;
    }
  }
  return { checksum, hits, queries };
}

function verifyQueryParity(fixtures) {
  const legacy = runLegacyQueryBatch(fixtures, "parityQueries");
  const optimized = runOptimizedQueryBatch(fixtures, "parityQueries");
  assert.deepEqual(optimized, legacy, "nearest-hit query results differ");

  // Batch checksums catch aggregate drift; this loop identifies the exact
  // query if row-order, tie behavior, or boundary semantics ever diverge.
  for (const fixture of fixtures) {
    for (let offset = 0; offset < fixture.parityQueries.length; offset += 3) {
      const pixelX = fixture.parityQueries[offset];
      const pixelY = fixture.parityQueries[offset + 1];
      const radius = fixture.parityQueries[offset + 2];
      const before = fixture.legacyLookup.hitEdge(pixelX, pixelY, radius);
      const after = fixture.optimizedLookup.hitEdge(pixelX, pixelY, radius);
      assert.deepEqual(
        after,
        before,
        `nearest hit differs at query ${offset / 3}`,
      );
    }
  }
  return legacy;
}

function quantile(values, probability) {
  const sorted = [...values].sort((left, right) => left - right);
  const position = (sorted.length - 1) * probability;
  const lower = Math.floor(position);
  const fraction = position - lower;
  return sorted[lower]
    + (sorted[Math.min(sorted.length - 1, lower + 1)] - sorted[lower])
    * fraction;
}

function summarize(values) {
  const mean = values.reduce((sum, value) => sum + value, 0) / values.length;
  const variance =
    values.reduce((sum, value) => sum + (value - mean) ** 2, 0)
    / values.length;
  const p50 = quantile(values, 0.5);
  return {
    p50,
    p95: quantile(values, 0.95),
    mad: quantile(
      values.map((value) => Math.abs(value - p50)),
      0.5,
    ),
    cv: Math.sqrt(variance) / Math.abs(mean),
    mean,
  };
}

function timedBatch(fixtures, variant) {
  const run =
    variant === "legacy" ? runLegacyQueryBatch : runOptimizedQueryBatch;
  const startedAt = performance.now();
  const result = run(fixtures, "benchmarkQueries");
  return {
    durationMs: performance.now() - startedAt,
    ...result,
  };
}

async function verifyProductionSource() {
  const [source, editor, gallery] = await Promise.all([
    readFile(new URL("../../lib/source.ts", import.meta.url), "utf8"),
    readFile(new URL("../../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);
  const status = source.includes("createOuterBoundaryMask")
    ? "precomputed-outer-boundary"
    : "legacy-exterior-neighbor";
  if (status === "precomputed-outer-boundary") {
    assert.match(
      source,
      /const exterior = createExteriorAlphaMask\(alpha, width, height\)/,
    );
    assert.match(source, /alpha\[index\] < VISIBLE_ALPHA_THRESHOLD/);
    assert.match(source, /exterior\[index - 1\] === 1/);
    assert.match(source, /exterior\[index \+ width\] === 1/);
    assert.match(source, /outerBoundary: createOuterBoundaryMask/);
    assert.match(
      editor,
      /this\.artwork\.outerBoundary\[candidateIndex\] !== 1/,
    );
    assert.match(
      gallery,
      /this\.artwork\.outerBoundary\[y \* this\.artwork\.width \+ x\] !== 1/,
    );
  } else {
    assert.match(source, /exteriorAlpha: createExteriorAlphaMask/);
    assert.match(editor, /this\.sampleExterior\(candidateX - 1, candidateY\)/);
    assert.match(gallery, /this\.sampleExterior\(x - 1, y\)/);
  }
  return {
    status,
    sourceSha256: hashBytes(source),
    editorSha256: hashBytes(editor),
    gallerySha256: hashBytes(gallery),
  };
}

export async function runEdgeHitBenchmark({
  warmups = DEFAULT_WARMUPS,
  samples = DEFAULT_SAMPLES,
} = {}) {
  assert.ok(warmups >= 5, "benchmark requires at least five warmups");
  assert.ok(samples >= 20, "benchmark requires at least twenty samples");
  const productionSources = await verifyProductionSource();
  const fixtures = [
    createFixture({
      width: 2_048,
      height: 1_536,
      seed: 0x13579b,
      phase: 0.37,
      portrait: false,
    }),
    createFixture({
      width: 1_792,
      height: 2_048,
      seed: 0x2468ac,
      phase: 1.13,
      portrait: true,
    }),
  ];
  const parity = verifyQueryParity(fixtures);
  const expectedBenchmark = runLegacyQueryBatch(fixtures, "benchmarkQueries");

  for (let index = 0; index < warmups; index += 1) {
    const order =
      index % 2 === 0 ? ["legacy", "optimized"] : ["optimized", "legacy"];
    for (const variant of order) {
      const result = timedBatch(fixtures, variant);
      assert.equal(result.checksum, expectedBenchmark.checksum);
      assert.equal(result.hits, expectedBenchmark.hits);
    }
  }

  const raw = { legacy: [], optimized: [] };
  for (let index = 0; index < samples; index += 1) {
    const order =
      index % 2 === 0 ? ["legacy", "optimized"] : ["optimized", "legacy"];
    for (const variant of order) {
      const result = timedBatch(fixtures, variant);
      assert.equal(result.checksum, expectedBenchmark.checksum);
      assert.equal(result.hits, expectedBenchmark.hits);
      raw[variant].push(result);
    }
  }

  const legacyDurations = raw.legacy.map((sample) => sample.durationMs);
  const optimizedDurations = raw.optimized.map((sample) => sample.durationMs);
  const pairedDeltas = legacyDurations.map(
    (duration, index) => duration - optimizedDurations[index],
  );
  const legacySummary = summarize(legacyDurations);
  const optimizedSummary = summarize(optimizedDurations);
  return {
    runtime: {
      node: process.version,
      v8: process.versions.v8,
      platform: process.platform,
      architecture: process.arch,
    },
    protocol: {
      ordering: "paired alternating AB/BA",
      warmups,
      samples,
      outlierRemoval: "none",
      masks: fixtures.map((fixture) => ({
        width: fixture.width,
        height: fixture.height,
        exteriorBoundaryPixels: fixture.outerBoundary.reduce(
          (sum, value) => sum + value,
          0,
        ),
        enclosedTransparentHoles: fixture.holes.length,
        enclosedHoleEdgeAssertions: fixture.enclosedHoleEdgesChecked,
        alphaSha256: hashBytes(fixture.alpha),
        boundarySha256: hashBytes(fixture.outerBoundary),
      })),
      parityQueries: parity.queries,
      benchmarkQueriesPerSample: expectedBenchmark.queries,
      radii: RADIUS_SEQUENCE,
      statistics: "linear p50/p95, median absolute deviation, population CV",
    },
    productionSources,
    parity: {
      boundaryMasksExact: true,
      nearestHitsExact: true,
      queryChecksum: parity.checksum,
      hits: parity.hits,
    },
    raw,
    summary: {
      legacyMs: legacySummary,
      optimizedMs: optimizedSummary,
      pairedDeltaMs: summarize(pairedDeltas),
      p50ReductionPercent:
        ((legacySummary.p50 - optimizedSummary.p50) / legacySummary.p50)
        * 100,
      p95ReductionPercent:
        ((legacySummary.p95 - optimizedSummary.p95) / legacySummary.p95)
        * 100,
    },
  };
}

async function main() {
  const result = await runEdgeHitBenchmark();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (
  process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
