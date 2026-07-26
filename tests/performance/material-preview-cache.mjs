#!/usr/bin/env node

import { spawn } from "node:child_process";
import { createHash } from "node:crypto";
import {
  access,
  mkdtemp,
  readFile,
  rm,
  writeFile,
} from "node:fs/promises";
import { constants as fsConstants } from "node:fs";
import { createServer } from "node:http";
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath } from "node:url";
import ts from "typescript";

const DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIRECTORY, "../..");
const MATERIAL_PREVIEW_PATH = path.join(ROOT, "lib/material-preview.ts");
const TYPES_PATH = path.join(ROOT, "lib/types.ts");
const DEFAULTS = Object.freeze({
  warmups: 5,
  samples: 20,
  iterations: 100,
  timeoutMs: 120_000,
});

function usage() {
  return `Material-preview seeded-cache AB/BA benchmark

Usage:
  node tests/performance/material-preview-cache.mjs [options]

Options:
  --warmups <count>    Warmup pairs; minimum/default ${DEFAULTS.warmups}.
  --samples <count>    Measured AB/BA pairs; minimum/default ${DEFAULTS.samples}.
  --iterations <count> Complete variant batches per A or B measurement (default ${DEFAULTS.iterations}).
  --chromium <path>    Chromium/Chrome executable (or set CHROMIUM_PATH).
  --timeout-ms <ms>    Browser/CDP timeout (default ${DEFAULTS.timeoutMs}).
  --output <path>      Also write the machine-readable JSON result.
  --help               Show this help.
`;
}

function integer(flag, value, minimum) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < minimum) {
    throw new Error(`${flag} must be an integer >= ${minimum}.`);
  }
  return parsed;
}

function parseArguments(argv) {
  const options = {
    ...DEFAULTS,
    chromium: process.env.CHROMIUM_PATH || null,
    output: null,
  };
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }
    const separator = argument.indexOf("=");
    const flag = separator >= 0 ? argument.slice(0, separator) : argument;
    const inline = separator >= 0 ? argument.slice(separator + 1) : null;
    const value = inline ?? argv[++index];
    if (!value) throw new Error(`${flag} requires a value.`);
    switch (flag) {
      case "--warmups":
        options.warmups = integer(flag, value, 5);
        break;
      case "--samples":
        options.samples = integer(flag, value, 20);
        break;
      case "--iterations":
        options.iterations = integer(flag, value, 1);
        break;
      case "--timeout-ms":
        options.timeoutMs = integer(flag, value, 1_000);
        break;
      case "--chromium":
        options.chromium = path.resolve(value);
        break;
      case "--output":
        options.output = path.resolve(value);
        break;
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }
  return options;
}

function percentile(sorted, fraction) {
  if (sorted.length === 0) return null;
  if (sorted.length === 1) return sorted[0];
  const position = (sorted.length - 1) * fraction;
  const lower = Math.floor(position);
  const upper = Math.ceil(position);
  const weight = position - lower;
  return sorted[lower] * (1 - weight) + sorted[upper] * weight;
}

function summarize(values) {
  const finite = values.filter(Number.isFinite);
  if (finite.length === 0) {
    return {
      count: 0,
      min: null,
      max: null,
      mean: null,
      p50: null,
      p95: null,
      mad: null,
      standardDeviation: null,
      cv: null,
      cvPercent: null,
    };
  }
  const sorted = finite.toSorted((left, right) => left - right);
  const mean = finite.reduce((total, value) => total + value, 0) / finite.length;
  const p50 = percentile(sorted, 0.5);
  const variance =
    finite.reduce((total, value) => total + (value - mean) ** 2, 0) /
    finite.length;
  const standardDeviation = Math.sqrt(variance);
  const deviations = finite
    .map((value) => Math.abs(value - p50))
    .toSorted((left, right) => left - right);
  const cv = Math.abs(mean) > Number.EPSILON ? standardDeviation / Math.abs(mean) : null;
  return {
    count: finite.length,
    min: sorted[0],
    max: sorted.at(-1),
    mean,
    p50,
    p95: percentile(sorted, 0.95),
    mad: percentile(deviations, 0.5),
    standardDeviation,
    cv,
    cvPercent: cv === null ? null : cv * 100,
  };
}

function summarizeScenario(scenario) {
  const baseline = scenario.samples.map((sample) => sample.baseline.durationMs);
  const optimized = scenario.samples.map((sample) => sample.optimized.durationMs);
  const pairedSpeedup = scenario.samples.map(
    (sample) => sample.baseline.durationMs / sample.optimized.durationMs,
  );
  const pairedReduction = scenario.samples.map(
    (sample) =>
      ((sample.baseline.durationMs - sample.optimized.durationMs) /
        sample.baseline.durationMs) *
      100,
  );
  const baselineSummary = summarize(baseline);
  const optimizedSummary = summarize(optimized);
  return {
    baselineMs: baselineSummary,
    optimizedMs: optimizedSummary,
    pairedSpeedup: summarize(pairedSpeedup),
    pairedReductionPercent: summarize(pairedReduction),
    p50Speedup:
      baselineSummary.p50 !== null &&
      optimizedSummary.p50 !== null &&
      optimizedSummary.p50 > 0
        ? baselineSummary.p50 / optimizedSummary.p50
        : null,
    p50ReductionPercent:
      baselineSummary.p50 !== null &&
      optimizedSummary.p50 !== null &&
      baselineSummary.p50 > 0
        ? ((baselineSummary.p50 - optimizedSummary.p50) /
            baselineSummary.p50) *
          100
        : null,
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
}

async function executable(candidate) {
  try {
    await access(candidate, fsConstants.X_OK);
    return true;
  } catch {
    return false;
  }
}

async function findChromium(explicit) {
  const candidates = [];
  if (explicit) candidates.push(explicit);
  if (process.platform === "darwin") {
    candidates.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    );
  }
  for (const directory of (process.env.PATH || "").split(path.delimiter)) {
    if (!directory) continue;
    for (const name of [
      "chromium",
      "chromium-browser",
      "google-chrome",
      "google-chrome-stable",
    ]) {
      candidates.push(path.join(directory, name));
    }
  }
  for (const candidate of [...new Set(candidates)]) {
    if (await executable(candidate)) return candidate;
  }
  throw new Error("Chromium was not found; pass --chromium or set CHROMIUM_PATH.");
}

function transpile(source, fileName) {
  return ts.transpileModule(source, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
}

function browserFixture(configuration) {
  return `<!doctype html>
<html>
<head><meta charset="utf-8"><title>Material preview cache benchmark</title></head>
<body>
<script type="module">
import {
  applyMaterialPreview as applyOptimized,
  getGlitterRandomValues,
  getHolographicNoise,
} from "/module/material-preview.js";

const CONFIG = ${JSON.stringify(configuration)};
const DEFAULT_MATERIAL = {
  type: "original",
  intensity: 0.86,
  scale: 1,
  holographicGrain: 0.72,
  seed: 0.37,
  holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"],
};
const DEFAULT_LIGHTING = {
  direction: { x: -0.38, y: 0.52, z: 0.76 },
  intensity: 0.8,
  ambient: 0.35,
  softness: 0.6,
};

function scaledPhase(position, scale) {
  return (position - 0.5) * scale + 0.5;
}

function reflectiveOpacity(phase) {
  const position = phase - Math.floor(phase);
  if (position < 0.25 || position > 0.78) return 0;
  if (position < 0.46) return (0.7 * (position - 0.25)) / 0.21;
  if (position < 0.58) {
    return 0.7 + ((0.14 - 0.7) * (position - 0.46)) / 0.12;
  }
  return 0.14 * (1 - (position - 0.58) / 0.2);
}

function addReflectiveStops(gradient, scale, amount, phaseOffset) {
  const samples = Math.max(32, Math.ceil(48 * scale));
  for (let index = 0; index <= samples; index += 1) {
    const position = index / samples;
    const opacity = reflectiveOpacity(
      scaledPhase(position, scale) + phaseOffset,
    );
    gradient.addColorStop(
      position,
      "rgba(255,255,255," + opacity * amount + ")",
    );
  }
}

function addHolographicStops(gradient, scale, colors, phaseOffset) {
  const phaseStart = scaledPhase(0, scale) + phaseOffset;
  const phaseEnd = scaledPhase(1, scale) + phaseOffset;
  const firstStop = Math.floor(phaseStart * 3);
  const lastStop = Math.ceil(phaseEnd * 3);
  gradient.addColorStop(0, colors[((firstStop % 3) + 3) % 3]);
  for (let stop = firstStop; stop <= lastStop; stop += 1) {
    const position = (stop / 3 - phaseStart) / scale;
    if (position <= 0 || position >= 1) continue;
    gradient.addColorStop(position, colors[((stop % 3) + 3) % 3]);
  }
  gradient.addColorStop(1, colors[((lastStop % 3) + 3) % 3]);
}

function applyReferenceFrost(
  context,
  width,
  height,
  amount,
  grain,
  scale,
  seed,
) {
  const noiseCanvas = document.createElement("canvas");
  const noiseSize = 96;
  noiseCanvas.width = noiseSize;
  noiseCanvas.height = noiseSize;
  const noiseContext = noiseCanvas.getContext("2d", { alpha: true });
  if (!noiseContext) return;
  let state = Math.floor(seed * 2147483647) || 1;
  const random = () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
  const noise = noiseContext.createImageData(noiseSize, noiseSize);
  for (let index = 0; index < noise.data.length; index += 4) {
    const value = random();
    const brightness = value > 0.48 ? 255 : 20;
    noise.data[index] = brightness;
    noise.data[index + 1] = brightness;
    noise.data[index + 2] = brightness;
    noise.data[index + 3] = Math.round(38 + random() * 74);
  }
  noiseContext.putImageData(noise, 0, 0);
  const pattern = context.createPattern(noiseCanvas, "repeat");
  if (!pattern) return;
  pattern.setTransform(
    new DOMMatrix().scaleSelf(1 / Math.sqrt(scale), 1 / Math.sqrt(scale)),
  );
  context.save();
  context.globalAlpha = 0.42 * amount * grain;
  context.fillStyle = pattern;
  context.fillRect(0, 0, width, height);
  context.restore();
}

function applyReference(context, width, height, material, lighting) {
  const resolved = { ...DEFAULT_MATERIAL, ...material };
  if (resolved.type === "original" || resolved.intensity <= 0) return;
  const amount = Math.min(1, Math.max(0, resolved.intensity));
  const scale = Math.min(4, Math.max(0.2, resolved.scale));
  const resolvedLighting = {
    ...DEFAULT_LIGHTING,
    ...lighting,
    direction: {
      ...DEFAULT_LIGHTING.direction,
      ...(lighting && lighting.direction),
    },
  };
  const lightLength =
    Math.hypot(
      resolvedLighting.direction.x,
      resolvedLighting.direction.y,
      resolvedLighting.direction.z,
    ) || 1;
  const lightX = resolvedLighting.direction.x / lightLength;
  const lightY = resolvedLighting.direction.y / lightLength;
  const defaultDirection = DEFAULT_LIGHTING.direction;
  const defaultLength = Math.hypot(
    defaultDirection.x,
    defaultDirection.y,
    defaultDirection.z,
  );
  const defaultLightX = defaultDirection.x / defaultLength;
  const defaultLightY = defaultDirection.y / defaultLength;
  const intensity = Math.min(1.5, Math.max(0, resolvedLighting.intensity));
  context.save();
  context.globalCompositeOperation = "source-atop";
  if (resolved.type === "reflective") {
    const sheen = context.createLinearGradient(0, height, width, 0);
    const lightShift =
      (lightX - defaultLightX) * 0.28 +
      (lightY - defaultLightY) * -0.22;
    const lightStrength = Math.min(
      1.4,
      Math.max(0.5, 1 + (intensity - 0.8) * 0.5),
    );
    addReflectiveStops(sheen, scale, amount * lightStrength, lightShift);
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "holographic") {
    const rainbow = context.createLinearGradient(0, height, width, 0);
    const lightShift =
      (lightX - defaultLightX) * 0.32 +
      (lightY - defaultLightY) * -0.26;
    addHolographicStops(
      rainbow,
      scale,
      resolved.holographicColors,
      lightShift,
    );
    context.fillStyle = rainbow;
    context.globalAlpha =
      0.24 *
      amount *
      Math.min(1.3, Math.max(0.6, 1 + (intensity - 0.8) * 0.35));
    context.fillRect(0, 0, width, height);
    applyReferenceFrost(
      context,
      width,
      height,
      amount,
      Math.min(1, Math.max(0, resolved.holographicGrain)),
      scale,
      resolved.seed,
    );
  }
  if (resolved.type === "glitter") {
    const lightAngle = Math.atan2(lightY, lightX);
    const lightStrength = Math.min(
      1.4,
      Math.max(0.45, 0.5 + intensity * 0.625),
    );
    let state = Math.floor(resolved.seed * 2147483647) || 1;
    const random = () => {
      state = (state * 48271) % 2147483647;
      return state / 2147483647;
    };
    const count = Math.min(
      8000,
      Math.round(((width * height) / 520) * scale * scale),
    );
    for (let index = 0; index < count; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const bright = random() > 0.5;
      const opacity = random();
      const orientation =
        ((x * 0.013 + y * 0.017 + resolved.seed * 7) % 1) *
        Math.PI *
        2;
      const twinkle =
        0.18 +
        Math.pow(Math.max(0, Math.cos(orientation - lightAngle)), 10) * 0.82;
      context.globalAlpha =
        0.38 * amount * opacity * twinkle * lightStrength;
      context.fillStyle = bright ? "#ffffff" : "#34281f";
      const size = (0.7 + random() * 1.8) / Math.sqrt(scale);
      context.fillRect(x, y, size, size);
    }
  }
  context.restore();
}

const VARIANTS = [
  {
    name: "holographic-default",
    group: "holographic",
    width: 720,
    height: 480,
    material: {
      type: "holographic",
      intensity: 0.86,
      scale: 1,
      holographicGrain: 0.72,
      seed: 0.37,
      holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"],
    },
    lighting: DEFAULT_LIGHTING,
  },
  {
    name: "holographic-custom-seed",
    group: "holographic",
    width: 960,
    height: 540,
    material: {
      type: "holographic",
      intensity: 0.94,
      scale: 3.4,
      holographicGrain: 0.93,
      seed: -0.731,
      holographicColors: ["#ff4f9a", "#5ce1ce", "#748cff"],
    },
    lighting: {
      direction: { x: 0.61, y: -0.32, z: 0.72 },
      intensity: 1.28,
      ambient: 0.2,
      softness: 0.4,
    },
  },
  {
    name: "glitter-default",
    group: "glitter",
    width: 720,
    height: 480,
    material: {
      type: "glitter",
      intensity: 0.86,
      scale: 1,
      holographicGrain: 0.72,
      seed: 0.37,
      holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"],
    },
    lighting: DEFAULT_LIGHTING,
  },
  {
    name: "glitter-dense-custom-seed",
    group: "glitter",
    width: 1024,
    height: 720,
    material: {
      type: "glitter",
      intensity: 1,
      scale: 2.4,
      holographicGrain: 0.4,
      seed: 1.271,
      holographicColors: ["#fd98c8", "#83e7dd", "#a1b2ff"],
    },
    lighting: {
      direction: { x: -0.7, y: -0.15, z: 0.69 },
      intensity: 1.4,
      ambient: 0.25,
      softness: 0.5,
    },
  },
  {
    name: "reflective-control",
    group: "control",
    width: 640,
    height: 420,
    material: {
      type: "reflective",
      intensity: 0.78,
      scale: 2.6,
      holographicGrain: 0.72,
      seed: 4.25,
      holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"],
    },
    lighting: DEFAULT_LIGHTING,
  },
  {
    name: "original-control",
    group: "control",
    width: 640,
    height: 420,
    material: {
      type: "original",
      intensity: 1,
      scale: 1,
      holographicGrain: 1,
      seed: 0,
      holographicColors: ["#000000", "#777777", "#ffffff"],
    },
    lighting: DEFAULT_LIGHTING,
  },
];

const sourceCache = new Map();
function sourceFor(width, height) {
  const key = width + "x" + height;
  if (sourceCache.has(key)) return sourceCache.get(key);
  const source = document.createElement("canvas");
  source.width = width;
  source.height = height;
  const context = source.getContext("2d", { alpha: true });
  const gradient = context.createLinearGradient(0, 0, width, height);
  gradient.addColorStop(0, "#3f2a84");
  gradient.addColorStop(0.5, "#e0528d");
  gradient.addColorStop(1, "#f1b451");
  context.fillStyle = gradient;
  context.beginPath();
  context.roundRect(9, 11, width - 18, height - 22, Math.min(width, height) * 0.18);
  context.fill();
  context.globalCompositeOperation = "destination-out";
  context.beginPath();
  context.arc(width * 0.5, height * 0.5, Math.min(width, height) * 0.08, 0, Math.PI * 2);
  context.fill();
  sourceCache.set(key, source);
  return source;
}

function render(apply, variant) {
  const canvas = document.createElement("canvas");
  canvas.width = variant.width;
  canvas.height = variant.height;
  const context = canvas.getContext("2d", { alpha: true });
  context.drawImage(sourceFor(variant.width, variant.height), 0, 0);
  apply(
    context,
    variant.width,
    variant.height,
    variant.material,
    variant.lighting,
  );
  return canvas;
}

async function hashCanvas(canvas) {
  const context = canvas.getContext("2d", { alpha: true });
  const pixels = context.getImageData(0, 0, canvas.width, canvas.height).data;
  const digest = await crypto.subtle.digest("SHA-256", pixels);
  const hash = Array.from(
    new Uint8Array(digest),
    (value) => value.toString(16).padStart(2, "0"),
  ).join("");
  return { hash, byteLength: pixels.byteLength };
}

async function parity() {
  const variants = [];
  for (const variant of VARIANTS) {
    const reference = await hashCanvas(render(applyReference, variant));
    const optimizedCold = await hashCanvas(render(applyOptimized, variant));
    const optimizedWarm = await hashCanvas(render(applyOptimized, variant));
    variants.push({
      name: variant.name,
      group: variant.group,
      width: variant.width,
      height: variant.height,
      reference,
      optimizedCold,
      optimizedWarm,
      referenceEqualsCold: reference.hash === optimizedCold.hash,
      referenceEqualsWarm: reference.hash === optimizedWarm.hash,
      coldEqualsWarm: optimizedCold.hash === optimizedWarm.hash,
    });
  }
  return {
    pass: variants.every(
      (variant) =>
        variant.referenceEqualsCold &&
        variant.referenceEqualsWarm &&
        variant.coldEqualsWarm,
    ),
    variants,
  };
}

let sink = 0;
function consume(array) {
  let checksum = 0;
  const stride = Math.max(1, Math.floor(array.length / 257));
  for (let index = 0; index < array.length; index += stride) {
    checksum = (checksum * 33 + Number(array[index] || 0) * 1000003) >>> 0;
  }
  sink = (sink + checksum + array.length) >>> 0;
}

function referenceNoisePixels(seed) {
  let state = Math.floor(seed * 2147483647) || 1;
  const pixels = new Uint8ClampedArray(96 * 96 * 4);
  const random = () => {
    state = (state * 48271) % 2147483647;
    return state / 2147483647;
  };
  for (let index = 0; index < pixels.length; index += 4) {
    const brightness = random() > 0.48 ? 255 : 20;
    pixels[index] = brightness;
    pixels[index + 1] = brightness;
    pixels[index + 2] = brightness;
    pixels[index + 3] = Math.round(38 + random() * 74);
  }
  return pixels;
}

function referenceGlitterValues(seed, count) {
  let state = Math.floor(seed * 2147483647) || 1;
  const values = new Float64Array(count * 5);
  for (let index = 0; index < values.length; index += 1) {
    state = (state * 48271) % 2147483647;
    values[index] = state / 2147483647;
  }
  return values;
}

function baselineHolographic(variant) {
  consume(referenceNoisePixels(variant.material.seed));
}

function optimizedHolographic(variant) {
  consume(getHolographicNoise(variant.material.seed).pixels);
}

function glitterCount(variant) {
  const scale = Math.min(4, Math.max(0.2, variant.material.scale));
  return Math.min(
    8000,
    Math.round(((variant.width * variant.height) / 520) * scale * scale),
  );
}

function baselineGlitter(variant) {
  consume(referenceGlitterValues(variant.material.seed, glitterCount(variant)));
}

function optimizedGlitter(variant) {
  consume(
    getGlitterRandomValues(
      variant.material.seed,
      glitterCount(variant),
    ),
  );
}

function measure(operation, variants) {
  const started = performance.now();
  for (let iteration = 0; iteration < CONFIG.iterations; iteration += 1) {
    for (const variant of variants) operation(variant);
  }
  return { durationMs: performance.now() - started, sink };
}

async function runScenario(name, variants, baselineOperation, optimizedOperation) {
  const warmups = [];
  for (let index = 0; index < CONFIG.warmups; index += 1) {
    const order = index % 2 === 0
      ? ["baseline", "optimized"]
      : ["optimized", "baseline"];
    const pair = { index, order };
    for (const implementation of order) {
      pair[implementation] = measure(
        implementation === "baseline"
          ? baselineOperation
          : optimizedOperation,
        variants,
      );
    }
    warmups.push(pair);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  const samples = [];
  for (let index = 0; index < CONFIG.samples; index += 1) {
    const order = index % 2 === 0
      ? ["baseline", "optimized"]
      : ["optimized", "baseline"];
    const pair = { index, order };
    for (const implementation of order) {
      pair[implementation] = measure(
        implementation === "baseline"
          ? baselineOperation
          : optimizedOperation,
        variants,
      );
    }
    samples.push(pair);
    await new Promise((resolve) => setTimeout(resolve, 0));
  }
  return {
    name,
    variants: variants.map((variant) => variant.name),
    warmups,
    samples,
  };
}

window.__materialPreviewBenchmarkReady = (async () => {
  const exactParity = await parity();
  const scenarios = [];
  scenarios.push(
    await runScenario(
      "holographic-seeded-frost",
      VARIANTS.filter((variant) => variant.group === "holographic"),
      baselineHolographic,
      optimizedHolographic,
    ),
  );
  scenarios.push(
    await runScenario(
      "glitter-seeded-flakes",
      VARIANTS.filter((variant) => variant.group === "glitter"),
      baselineGlitter,
      optimizedGlitter,
    ),
  );
  return {
    exactParity,
    scenarios,
    userAgent: navigator.userAgent,
    platform: navigator.platform,
    devicePixelRatio,
    crossOriginIsolated,
    sink,
  };
})();
</script>
</body>
</html>`;
}

async function startServer(configuration, materialSource, typesSource) {
  const instrumentedMaterialSource = `${materialSource}
export { getGlitterRandomValues, getHolographicNoise };`;
  const materialJavaScript = transpile(
    instrumentedMaterialSource,
    "material-preview.ts",
  );
  const typesJavaScript = transpile(typesSource, "types.ts");
  const fixture = Buffer.from(browserFixture(configuration));
  const resources = new Map([
    ["/", ["text/html; charset=utf-8", fixture]],
    [
      "/module/material-preview.js",
      ["text/javascript; charset=utf-8", Buffer.from(materialJavaScript)],
    ],
    [
      "/module/types",
      ["text/javascript; charset=utf-8", Buffer.from(typesJavaScript)],
    ],
  ]);
  const server = createServer((request, response) => {
    const pathname = new URL(request.url || "/", "http://localhost").pathname;
    const resource = resources.get(pathname);
    if (!resource) {
      response.writeHead(404);
      response.end();
      return;
    }
    response.writeHead(200, {
      "content-type": resource[0],
      "content-length": resource[1].byteLength,
      "cache-control": "no-store",
      "cross-origin-opener-policy": "same-origin",
      "cross-origin-embedder-policy": "require-corp",
      "cross-origin-resource-policy": "same-origin",
    });
    response.end(resource[1]);
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  return {
    url: `http://127.0.0.1:${address.port}/`,
    close: () =>
      new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      ),
  };
}

class Cdp {
  constructor(url, timeoutMs) {
    this.url = url;
    this.timeoutMs = timeoutMs;
    this.id = 1;
    this.pending = new Map();
    this.listeners = new Set();
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error("CDP WebSocket connection timed out.")),
        this.timeoutMs,
      );
      this.socket.addEventListener(
        "open",
        () => {
          clearTimeout(timeout);
          resolve();
        },
        { once: true },
      );
      this.socket.addEventListener(
        "error",
        () => {
          clearTimeout(timeout);
          reject(new Error("CDP WebSocket connection failed."));
        },
        { once: true },
      );
    });
    this.socket.addEventListener("message", (event) => {
      const message = JSON.parse(event.data);
      if (message.id) {
        const pending = this.pending.get(message.id);
        if (!pending) return;
        this.pending.delete(message.id);
        clearTimeout(pending.timeout);
        if (message.error) {
          pending.reject(new Error(message.error.message));
        } else {
          pending.resolve(message.result || {});
        }
        return;
      }
      for (const listener of this.listeners) listener(message);
    });
  }

  call(method, params = {}) {
    const id = this.id++;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out.`));
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timeout });
      this.socket.send(JSON.stringify({ id, method, params }));
    });
  }

  wait(method) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.listeners.delete(listener);
        reject(new Error(`${method} event timed out.`));
      }, this.timeoutMs);
      const listener = (message) => {
        if (message.method !== method) return;
        clearTimeout(timeout);
        this.listeners.delete(listener);
        resolve(message.params || {});
      };
      this.listeners.add(listener);
    });
  }

  close() {
    this.socket?.close();
  }
}

async function launch(executable, timeoutMs) {
  const profile = await mkdtemp(path.join(tmpdir(), "material-preview-benchmark-"));
  const args = [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "--force-device-scale-factor=1",
    "--force-color-profile=srgb",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-extensions",
    "--disable-sync",
    "--no-first-run",
    "--no-default-browser-check",
    "--mute-audio",
    "about:blank",
  ];
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    args.unshift("--no-sandbox");
  }
  const child = spawn(executable, args, {
    stdio: ["ignore", "ignore", "pipe"],
  });
  let stderr = "";
  let exited = false;
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => {
    stderr = `${stderr}${chunk}`.slice(-50_000);
  });
  child.once("exit", () => {
    exited = true;
  });
  const activePortPath = path.join(profile, "DevToolsActivePort");
  const deadline = Date.now() + timeoutMs;
  let activePort = null;
  while (Date.now() < deadline && !exited) {
    try {
      activePort = await readFile(activePortPath, "utf8");
      if (activePort.trim()) break;
    } catch {
      // Chromium writes this file once remote debugging is ready.
    }
    await delay(50);
  }
  if (!activePort) {
    child.kill("SIGTERM");
    await rm(profile, { recursive: true, force: true }).catch(() => {});
    throw new Error(`Chromium did not expose CDP.\n${stderr}`);
  }
  const [port] = activePort.trim().split(/\r?\n/);
  const version = await fetch(`http://127.0.0.1:${port}/json/version`).then(
    (response) => response.json(),
  );
  const pages = await fetch(`http://127.0.0.1:${port}/json/list`).then(
    (response) => response.json(),
  );
  const page = pages.find((target) => target.type === "page");
  return {
    child,
    profile,
    version,
    websocketUrl: page.webSocketDebuggerUrl,
    async close() {
      if (!exited) child.kill("SIGTERM");
      const stopDeadline = Date.now() + 2_000;
      while (!exited && Date.now() < stopDeadline) await delay(25);
      if (!exited) child.kill("SIGKILL");
      await rm(profile, { recursive: true, force: true });
    },
  };
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }
  const [materialSource, typesSource] = await Promise.all([
    readFile(MATERIAL_PREVIEW_PATH, "utf8"),
    readFile(TYPES_PATH, "utf8"),
  ]);
  const chromium = await findChromium(options.chromium);
  const server = await startServer(options, materialSource, typesSource);
  let browser;
  let cdp;
  let result;
  try {
    process.stderr.write(`Launching ${chromium}\n`);
    browser = await launch(chromium, options.timeoutMs);
    cdp = new Cdp(browser.websocketUrl, options.timeoutMs);
    await cdp.connect();
    await Promise.all([cdp.call("Page.enable"), cdp.call("Runtime.enable")]);
    const loaded = cdp.wait("Page.loadEventFired");
    await cdp.call("Page.navigate", { url: server.url });
    await loaded;
    const evaluated = await cdp.call("Runtime.evaluate", {
      expression: "window.__materialPreviewBenchmarkReady",
      awaitPromise: true,
      returnByValue: true,
    });
    if (evaluated.exceptionDetails) {
      throw new Error(
        evaluated.exceptionDetails.exception?.description ||
          evaluated.exceptionDetails.text,
      );
    }
    const browserResult = evaluated.result.value;
    const scenarios = browserResult.scenarios.map((scenario) => ({
      ...scenario,
      summary: summarizeScenario(scenario),
    }));
    result = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      benchmark: {
        name: "material-preview-seeded-cache-ab-ba",
        methodology:
          "Alternating AB/BA pairs in a fresh headless Chrome profile. A is the pre-cache seeded algorithm; B imports the production TypeScript implementation transpiled without semantic transforms.",
        warmups: options.warmups,
        samples: options.samples,
        iterationsPerMeasurement: options.iterations,
      },
      environment: {
        node: process.version,
        platform: process.platform,
        architecture: process.arch,
        chromium,
        browser: browser.version.Browser,
        userAgent: browserResult.userAgent,
        browserPlatform: browserResult.platform,
        devicePixelRatio: browserResult.devicePixelRatio,
        crossOriginIsolated: browserResult.crossOriginIsolated,
      },
      sources: {
        materialPreview: {
          path: "lib/material-preview.ts",
          bytes: Buffer.byteLength(materialSource),
          sha256: sha256(materialSource),
        },
        types: {
          path: "lib/types.ts",
          bytes: Buffer.byteLength(typesSource),
          sha256: sha256(typesSource),
        },
      },
      exactPixelParity: browserResult.exactParity,
      scenarios,
      pass: browserResult.exactParity.pass,
    };
  } finally {
    cdp?.close();
    if (browser) await browser.close().catch(() => {});
    await server.close().catch(() => {});
  }
  const output = `${JSON.stringify(result, null, 2)}\n`;
  if (options.output) await writeFile(options.output, output);
  process.stdout.write(output);
  if (!result.pass) process.exitCode = 2;
}

run().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
