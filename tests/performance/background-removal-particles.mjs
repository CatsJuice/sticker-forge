import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import { pathToFileURL } from "node:url";
import { performance } from "node:perf_hooks";

const PARTICLE_LAUNCH_WINDOW_MS = 1_000;
const BASE_PARTICLE_DIRECTION = -Math.PI * 0.22;

export const PARTICLE_SETTINGS = Object.freeze({
  particleSize: 2.5,
  spread: 0.7,
  speedMin: 0.25,
  speedMax: 2.35,
  chaos: 0.9,
  durationMin: 300,
  durationMax: 1_640,
  swayAmplitude: 29,
  swaySpeed: 1.6,
  shrinkDelay: 0,
  shrinkDuration: 50,
});

export const PARITY_TIMESTAMPS_MS = Object.freeze([
  0,
  16.667,
  83.333,
  250,
  499.5,
  733.25,
  999,
  1_299.75,
  1_550,
  1_639.5,
]);

export const MEMORY_REMOVAL_RATIOS = Object.freeze([0.1, 0.5, 0.9, 1]);

function pixelNoise(x, y, seed) {
  let value = Math.imul(x + seed * 1013, 374761393);
  value = Math.imul(value ^ Math.imul(y + seed * 1619, 668265263), 1274126177);
  value ^= value >>> 16;
  return (value >>> 0) / 4_294_967_295;
}

function greatestCommonDivisor(left, right) {
  let dividend = left;
  let divisor = right;
  while (divisor !== 0) {
    const remainder = dividend % divisor;
    dividend = divisor;
    divisor = remainder;
  }
  return dividend;
}

function permutationStride(totalPixels) {
  if (totalPixels <= 1) return 1;
  let stride = Math.min(65_537, totalPixels - 1);
  if (stride % 2 === 0) stride -= 1;
  while (greatestCommonDivisor(stride, totalPixels) !== 1) stride -= 2;
  return stride;
}

export function createParticleFixture({
  drawWidth = 384,
  drawHeight = 256,
  canvasWidth = 512,
  canvasHeight = 360,
  removalRatio,
  removalThreshold,
  tiltDegrees = 7,
} = {}) {
  const targetRemovalRatio = removalRatio ?? removalThreshold ?? 0.42;
  assert.ok(
    targetRemovalRatio >= 0 && targetRemovalRatio <= 1,
    "removal ratio must be between zero and one",
  );
  const totalPixels = drawWidth * drawHeight;
  const targetRemovedPixels = Math.round(totalPixels * targetRemovalRatio);
  const stride = permutationStride(totalPixels);
  const offset = totalPixels === 0 ? 0 : 31_337 % totalPixels;
  const original = new Uint8ClampedArray(drawWidth * drawHeight * 4);
  const retained = new Uint8ClampedArray(original.length);

  for (let y = 0; y < drawHeight; y += 1) {
    for (let x = 0; x < drawWidth; x += 1) {
      const pixelIndex = y * drawWidth + x;
      const index = (y * drawWidth + x) * 4;
      const alpha = 144 + Math.floor(pixelNoise(x, y, 91) * 112);
      original[index] = (x * 17 + y * 3) & 255;
      original[index + 1] = (x * 5 + y * 13) & 255;
      original[index + 2] = (x * 11 + y * 7) & 255;
      original[index + 3] = alpha;
      retained[index] = original[index];
      retained[index + 1] = original[index + 1];
      retained[index + 2] = original[index + 2];
      retained[index + 3] =
        (pixelIndex * stride + offset) % totalPixels < targetRemovedPixels
          ? Math.max(0, alpha - 48 - Math.floor(pixelNoise(x, y, 93) * 160))
          : alpha;
    }
  }

  const tiltRadians = (-tiltDegrees * Math.PI) / 180;
  return {
    original,
    retained,
    drawWidth,
    drawHeight,
    canvasWidth,
    canvasHeight,
    centerX: canvasWidth / 2,
    centerY: canvasHeight / 2,
    tiltCosine: Math.cos(tiltRadians),
    tiltSine: Math.sin(tiltRadians),
    particleSettings: PARTICLE_SETTINGS,
    targetRemovalRatio,
  };
}

export function countRemovedPixels(original, retained) {
  let pixelCount = 0;
  for (
    let alphaIndex = 3;
    alphaIndex < original.length;
    alphaIndex += 4
  ) {
    if (original[alphaIndex] > retained[alphaIndex]) pixelCount += 1;
  }
  return pixelCount;
}

// Direct JavaScript port of the supplied before source. Keep its maximum-size
// allocation and per-frame invariant calculations intact for A/B comparison.
export function prepareBaselineParticles(fixture) {
  const {
    original,
    retained,
    drawWidth,
    drawHeight,
    centerX,
    centerY,
    tiltCosine,
    tiltSine,
    particleSettings,
  } = fixture;
  const maximumPixels = drawWidth * drawHeight;
  const sourceX = new Float32Array(maximumPixels);
  const sourceY = new Float32Array(maximumPixels);
  const colors = new Uint8ClampedArray(maximumPixels * 4);
  const delays = new Float32Array(maximumPixels);
  const travels = new Float32Array(maximumPixels);
  const directionOffsets = new Float32Array(maximumPixels);
  const phases = new Float32Array(maximumPixels);
  const particleSpeeds = new Float32Array(maximumPixels);
  const particleLifetimes = new Float32Array(maximumPixels);
  const swayAmplitudes = new Float32Array(maximumPixels);
  const swayFrequencies = new Float32Array(maximumPixels);
  let pixelCount = 0;

  for (let y = 0; y < drawHeight; y += 1) {
    for (let x = 0; x < drawWidth; x += 1) {
      const sourceIndex = (y * drawWidth + x) * 4;
      const removedAlpha = Math.max(
        0,
        original[sourceIndex + 3] - retained[sourceIndex + 3],
      );
      if (removedAlpha === 0) continue;

      const localX = x - drawWidth / 2;
      const localY = y - drawHeight / 2;
      sourceX[pixelCount] =
        centerX + localX * tiltCosine - localY * tiltSine;
      sourceY[pixelCount] =
        centerY + localX * tiltSine + localY * tiltCosine;
      const colorIndex = pixelCount * 4;
      colors[colorIndex] = original[sourceIndex];
      colors[colorIndex + 1] = original[sourceIndex + 1];
      colors[colorIndex + 2] = original[sourceIndex + 2];
      colors[colorIndex + 3] = removedAlpha;
      delays[pixelCount] =
        (x / Math.max(1, drawWidth - 1)) * 0.18
        + pixelNoise(x, y, 1) * 0.22;
      travels[pixelCount] = 125 + pixelNoise(x, y, 2) * 225;
      directionOffsets[pixelCount] = pixelNoise(x, y, 3) - 0.5;
      phases[pixelCount] = pixelNoise(x, y, 4) * Math.PI * 2;
      particleSpeeds[pixelCount] =
        particleSettings.speedMin
        + pixelNoise(x, y, 5)
        * (particleSettings.speedMax - particleSettings.speedMin);
      particleLifetimes[pixelCount] =
        particleSettings.durationMin
        + pixelNoise(x, y, 6)
        * (particleSettings.durationMax - particleSettings.durationMin);
      swayAmplitudes[pixelCount] =
        0.65 + pixelNoise(x, y, 7) * 0.7;
      swayFrequencies[pixelCount] =
        0.72 + pixelNoise(x, y, 8) * 0.68;
      pixelCount += 1;
    }
  }

  return {
    pixelCount,
    sourceX,
    sourceY,
    colors,
    delays,
    travels,
    directionOffsets,
    phases,
    particleSpeeds,
    particleLifetimes,
    swayAmplitudes,
    swayFrequencies,
  };
}

export function prepareOptimizedParticles(fixture) {
  const {
    original,
    retained,
    drawWidth,
    drawHeight,
    centerX,
    centerY,
    tiltCosine,
    tiltSine,
    particleSettings,
  } = fixture;
  const pixelCount = countRemovedPixels(original, retained);
  const sourceX = new Float32Array(pixelCount);
  const sourceY = new Float32Array(pixelCount);
  const colors = new Uint8ClampedArray(pixelCount * 4);
  const delays = new Float32Array(pixelCount);
  const travels = new Float32Array(pixelCount);
  const directionOffsets = new Float32Array(pixelCount);
  const phases = new Float32Array(pixelCount);
  const particleSpeeds = new Float32Array(pixelCount);
  const particleLifetimes = new Float32Array(pixelCount);
  const swayAmplitudes = new Float32Array(pixelCount);
  const swayFrequencies = new Float32Array(pixelCount);
  const spread = particleSettings.spread;
  const maximumX = Math.max(1, drawWidth - 1);
  let particleIndex = 0;

  for (let y = 0; y < drawHeight; y += 1) {
    for (let x = 0; x < drawWidth; x += 1) {
      const sourceIndex = (y * drawWidth + x) * 4;
      const removedAlpha = Math.max(
        0,
        original[sourceIndex + 3] - retained[sourceIndex + 3],
      );
      if (removedAlpha === 0) continue;

      const localX = x - drawWidth / 2;
      const localY = y - drawHeight / 2;
      sourceX[particleIndex] =
        centerX + localX * tiltCosine - localY * tiltSine;
      sourceY[particleIndex] =
        centerY + localX * tiltSine + localY * tiltCosine;
      const colorIndex = particleIndex * 4;
      colors[colorIndex] = original[sourceIndex];
      colors[colorIndex + 1] = original[sourceIndex + 1];
      colors[colorIndex + 2] = original[sourceIndex + 2];
      colors[colorIndex + 3] = removedAlpha;

      delays[particleIndex] =
        (x / maximumX) * 0.18 + pixelNoise(x, y, 1) * 0.22;
      travels[particleIndex] = 125 + pixelNoise(x, y, 2) * 225;
      directionOffsets[particleIndex] = pixelNoise(x, y, 3) - 0.5;
      phases[particleIndex] = pixelNoise(x, y, 4) * Math.PI * 2;
      particleSpeeds[particleIndex] =
        particleSettings.speedMin
          + pixelNoise(x, y, 5)
          * (particleSettings.speedMax - particleSettings.speedMin);
      particleLifetimes[particleIndex] =
        particleSettings.durationMin
          + pixelNoise(x, y, 6)
          * (particleSettings.durationMax - particleSettings.durationMin);
      swayAmplitudes[particleIndex] =
        0.65 + pixelNoise(x, y, 7) * 0.7;
      swayFrequencies[particleIndex] =
        0.72 + pixelNoise(x, y, 8) * 0.68;
      particleIndex += 1;
    }
  }

  return {
    pixelCount,
    sourceX,
    sourceY,
    colors,
    delays,
    travels,
    directionOffsets,
    phases,
    particleSpeeds,
    particleLifetimes,
    swayAmplitudes,
    swayFrequencies,
    particleSize: particleSettings.particleSize,
    spread,
    chaos: particleSettings.chaos,
    swayAmplitude: particleSettings.swayAmplitude,
    swaySpeed: particleSettings.swaySpeed,
    shrinkDelay: particleSettings.shrinkDelay,
    shrinkDuration: particleSettings.shrinkDuration,
    easedTravelDenominator: 1 - Math.exp(-8),
    terminalDrift: 0.08,
    terminalTravelWeight: 1 - 0.08,
    verticalDrift: 12 * spread,
  };
}

function writePixel(outputPixels, colors, pixelIndex, colorIndex, pixelAlpha) {
  if (pixelAlpha <= outputPixels[pixelIndex + 3]) return;
  outputPixels[pixelIndex] = colors[colorIndex];
  outputPixels[pixelIndex + 1] = colors[colorIndex + 1];
  outputPixels[pixelIndex + 2] = colors[colorIndex + 2];
  outputPixels[pixelIndex + 3] = pixelAlpha;
}

export function drawBaselineFrame(
  state,
  fixture,
  elapsed,
  outputPixels = new Uint8ClampedArray(
    fixture.canvasWidth * fixture.canvasHeight * 4,
  ),
) {
  const { canvasWidth, canvasHeight, particleSettings } = fixture;
  const {
    pixelCount,
    sourceX,
    sourceY,
    colors,
    delays,
    travels,
    directionOffsets,
    phases,
    particleSpeeds,
    particleLifetimes,
    swayAmplitudes,
    swayFrequencies,
  } = state;
  const shrinkDelay = particleSettings.shrinkDelay;
  const shrinkDuration = particleSettings.shrinkDuration;
  const particleSize = particleSettings.particleSize;
  const spread = particleSettings.spread;
  const chaos = particleSettings.chaos;
  const swayAmplitude = particleSettings.swayAmplitude;
  const swaySpeed = particleSettings.swaySpeed;
  const rowStride = canvasWidth * 4;
  const baseDirection = -Math.PI * 0.22;
  outputPixels.fill(0);

  for (let index = 0; index < pixelCount; index += 1) {
    const lifetime = particleLifetimes[index];
    if (elapsed >= lifetime) continue;
    const launchDelay = Math.min(
      delays[index] * PARTICLE_LAUNCH_WINDOW_MS,
      lifetime * 0.35,
    );
    const motionElapsed = Math.max(0, elapsed - launchDelay);
    const movementProgress = Math.min(
      1,
      motionElapsed / Math.max(1, lifetime - launchDelay),
    );
    const easedTravel =
      (1 - Math.exp(-8 * movementProgress * movementProgress))
      / (1 - Math.exp(-8));
    const terminalDrift = 0.08;
    const travelProgress =
      easedTravel * (1 - terminalDrift)
      + movementProgress
      * movementProgress
      * movementProgress
      * terminalDrift;
    const swayEnvelope = Math.min(1, movementProgress * 2.4);
    const direction =
      baseDirection + directionOffsets[index] * 1.1 * chaos;
    const travel = travels[index] * spread;
    const velocityX =
      Math.cos(direction) * travel * particleSpeeds[index];
    const velocityY =
      (Math.sin(direction) * travels[index] - 18)
      * spread
      * particleSpeeds[index];
    const sway =
      Math.sin(
        phases[index]
        + travelProgress
        * swaySpeed
        * swayFrequencies[index]
        * Math.PI,
      )
      * swayAmplitude
      * swayAmplitudes[index]
      * swayEnvelope;
    const tangentX = -Math.sin(direction);
    const tangentY = Math.cos(direction);
    const x = Math.round(
      sourceX[index] + velocityX * travelProgress + tangentX * sway,
    );
    const y = Math.round(
      sourceY[index]
        + velocityY * travelProgress
        + tangentY * sway
        + 12 * spread * travelProgress,
    );
    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) continue;

    const colorIndex = index * 4;
    const targetIndex = (y * canvasWidth + x) * 4;
    const particleShrinkDuration = Math.min(
      shrinkDuration,
      Math.max(50, lifetime - shrinkDelay - 10),
    );
    const particleShrinkDelay = Math.max(
      shrinkDelay,
      lifetime - particleShrinkDuration,
    );
    const shrinkProgress = Math.max(
      0,
      Math.min(
        1,
        (elapsed - particleShrinkDelay) / particleShrinkDuration,
      ),
    );
    const easedShrink =
      shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);
    const currentParticleSize = particleSize * (1 - easedShrink);
    if (currentParticleSize <= 0.15) continue;
    const maximumShoulder = Math.ceil(
      Math.max(0, currentParticleSize - 1),
    );
    const alpha = Math.round(
      colors[colorIndex + 3] * (1 - movementProgress),
    );
    if (alpha <= 0) continue;
    writePixel(outputPixels, colors, targetIndex, colorIndex, alpha);

    for (let shoulder = 1; shoulder <= maximumShoulder; shoulder += 1) {
      const coverage = Math.max(
        0,
        Math.min(1, currentParticleSize - shoulder),
      );
      const shoulderAlpha = Math.round(
        alpha
        * Math.min(0.48, movementProgress * 1.35)
        * coverage,
      );
      if (shoulderAlpha <= 0) continue;
      if (x - shoulder >= 0) {
        writePixel(
          outputPixels,
          colors,
          targetIndex - shoulder * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (x + shoulder < canvasWidth) {
        writePixel(
          outputPixels,
          colors,
          targetIndex + shoulder * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (y - shoulder >= 0) {
        writePixel(
          outputPixels,
          colors,
          targetIndex - shoulder * canvasWidth * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (y + shoulder < canvasHeight) {
        writePixel(
          outputPixels,
          colors,
          targetIndex + shoulder * rowStride,
          colorIndex,
          shoulderAlpha,
        );
      }
    }
  }
  return outputPixels;
}

export function drawOptimizedFrame(
  state,
  fixture,
  elapsed,
  outputPixels = new Uint8ClampedArray(
    fixture.canvasWidth * fixture.canvasHeight * 4,
  ),
) {
  const { canvasWidth, canvasHeight } = fixture;
  const {
    pixelCount,
    sourceX,
    sourceY,
    colors,
    delays,
    travels,
    directionOffsets,
    phases,
    particleSpeeds,
    particleLifetimes,
    swayAmplitudes,
    swayFrequencies,
    particleSize,
    spread,
    chaos,
    swayAmplitude,
    swaySpeed,
    shrinkDelay,
    shrinkDuration,
    easedTravelDenominator,
    terminalDrift,
    terminalTravelWeight,
    verticalDrift,
  } = state;
  const rowStride = canvasWidth * 4;
  outputPixels.fill(0);

  for (let index = 0; index < pixelCount; index += 1) {
    const lifetime = particleLifetimes[index];
    if (elapsed >= lifetime) continue;
    const launchDelay = Math.min(
      delays[index] * PARTICLE_LAUNCH_WINDOW_MS,
      lifetime * 0.35,
    );
    const motionElapsed = Math.max(0, elapsed - launchDelay);
    const movementProgress = Math.min(
      1,
      motionElapsed / Math.max(1, lifetime - launchDelay),
    );
    let x;
    let y;
    if (movementProgress === 0) {
      x = Math.round(sourceX[index]);
      y = Math.round(sourceY[index]);
    } else {
      const easedTravel =
        (1 - Math.exp(-8 * movementProgress * movementProgress))
        / easedTravelDenominator;
      const travelProgress =
        easedTravel * terminalTravelWeight
        + movementProgress
        * movementProgress
        * movementProgress
        * terminalDrift;
      const swayEnvelope = Math.min(1, movementProgress * 2.4);
      const direction =
        BASE_PARTICLE_DIRECTION + directionOffsets[index] * 1.1 * chaos;
      const directionCosine = Math.cos(direction);
      const directionSine = Math.sin(direction);
      const travel = travels[index] * spread;
      const velocityX =
        directionCosine * travel * particleSpeeds[index];
      const velocityY =
        (directionSine * travels[index] - 18)
        * spread
        * particleSpeeds[index];
      const tangentX = -directionSine;
      const tangentY = directionCosine;
      const sway =
        Math.sin(
          phases[index]
          + travelProgress
          * swaySpeed
          * swayFrequencies[index]
          * Math.PI,
        )
        * swayAmplitude
        * swayAmplitudes[index]
        * swayEnvelope;
      x = Math.round(
        sourceX[index]
          + velocityX * travelProgress
          + tangentX * sway,
      );
      y = Math.round(
        sourceY[index]
          + velocityY * travelProgress
          + tangentY * sway
          + verticalDrift * travelProgress,
      );
    }
    if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) continue;

    const colorIndex = index * 4;
    const targetIndex = (y * canvasWidth + x) * 4;
    const particleShrinkDuration = Math.min(
      shrinkDuration,
      Math.max(50, lifetime - shrinkDelay - 10),
    );
    const particleShrinkDelay = Math.max(
      shrinkDelay,
      lifetime - particleShrinkDuration,
    );
    let currentParticleSize = particleSize;
    if (elapsed > particleShrinkDelay) {
      if (elapsed >= particleShrinkDelay + particleShrinkDuration) continue;
      const shrinkProgress =
        (elapsed - particleShrinkDelay) / particleShrinkDuration;
      const easedShrink =
        shrinkProgress * shrinkProgress * (3 - 2 * shrinkProgress);
      currentParticleSize = particleSize * (1 - easedShrink);
    }
    if (currentParticleSize <= 0.15) continue;
    const maximumShoulder = Math.ceil(
      Math.max(0, currentParticleSize - 1),
    );
    const alpha = Math.round(
      colors[colorIndex + 3] * (1 - movementProgress),
    );
    if (alpha <= 0) continue;
    writePixel(outputPixels, colors, targetIndex, colorIndex, alpha);
    if (movementProgress === 0) continue;

    for (let shoulder = 1; shoulder <= maximumShoulder; shoulder += 1) {
      const coverage = Math.max(
        0,
        Math.min(1, currentParticleSize - shoulder),
      );
      const shoulderAlpha = Math.round(
        alpha
        * Math.min(0.48, movementProgress * 1.35)
        * coverage,
      );
      if (shoulderAlpha <= 0) continue;
      if (x - shoulder >= 0) {
        writePixel(
          outputPixels,
          colors,
          targetIndex - shoulder * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (x + shoulder < canvasWidth) {
        writePixel(
          outputPixels,
          colors,
          targetIndex + shoulder * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (y - shoulder >= 0) {
        writePixel(
          outputPixels,
          colors,
          targetIndex - shoulder * canvasWidth * 4,
          colorIndex,
          shoulderAlpha,
        );
      }
      if (y + shoulder < canvasHeight) {
        writePixel(
          outputPixels,
          colors,
          targetIndex + shoulder * rowStride,
          colorIndex,
          shoulderAlpha,
        );
      }
    }
  }
  return outputPixels;
}

function checksum(pixels) {
  return createHash("sha256").update(pixels).digest("hex");
}

export function verifyParticleParity(
  fixture = createParticleFixture({
    drawWidth: 128,
    drawHeight: 96,
    canvasWidth: 192,
    canvasHeight: 144,
  }),
  timestamps = PARITY_TIMESTAMPS_MS,
) {
  const baseline = prepareBaselineParticles(fixture);
  const optimized = prepareOptimizedParticles(fixture);
  assert.equal(optimized.pixelCount, baseline.pixelCount);
  const baselineOutput = new Uint8ClampedArray(
    fixture.canvasWidth * fixture.canvasHeight * 4,
  );
  const optimizedOutput = new Uint8ClampedArray(baselineOutput.length);
  const checksums = [];

  for (const elapsed of timestamps) {
    drawBaselineFrame(baseline, fixture, elapsed, baselineOutput);
    drawOptimizedFrame(optimized, fixture, elapsed, optimizedOutput);
    const before = checksum(baselineOutput);
    const after = checksum(optimizedOutput);
    assert.equal(after, before, `pixel checksum differs at ${elapsed}ms`);
    checksums.push({ elapsed, before, after });
  }

  return {
    pixelCount: baseline.pixelCount,
    checksums,
    baseline,
    optimized,
  };
}

function typedArrayBytes(state) {
  return Object.values(state).reduce(
    (total, value) =>
      ArrayBuffer.isView(value) ? total + value.byteLength : total,
    0,
  );
}

function measureParticleStateByRemovalRatio() {
  return MEMORY_REMOVAL_RATIOS.map((targetRemovalRatio) => {
    const fixture = createParticleFixture({ removalRatio: targetRemovalRatio });
    const parity = verifyParticleParity(fixture);
    const totalPixels = fixture.drawWidth * fixture.drawHeight;
    const expectedRemovedPixels = Math.round(totalPixels * targetRemovalRatio);
    const baselineBytes = typedArrayBytes(parity.baseline);
    const optimizedBytes = typedArrayBytes(parity.optimized);

    assert.equal(parity.pixelCount, expectedRemovedPixels);
    assert.ok(
      optimizedBytes <= baselineBytes,
      `optimized state regressed at ${targetRemovalRatio * 100}% removal`,
    );

    return {
      targetRemovalRatio,
      removedPixels: parity.pixelCount,
      actualRemovalRatio: parity.pixelCount / totalPixels,
      baselineBytes,
      optimizedBytes,
      difference: optimizedBytes - baselineBytes,
      reductionPercent:
        ((baselineBytes - optimizedBytes) / baselineBytes) * 100,
      checksums: parity.checksums,
    };
  });
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
  const deviations = values.map((value) => Math.abs(value - p50));
  return {
    p50,
    p95: quantile(values, 0.95),
    mad: quantile(deviations, 0.5),
    cv: Math.sqrt(variance) / mean,
    mean,
  };
}

function animationTimestamps() {
  return Array.from({ length: 31 }, (_, index) =>
    (PARTICLE_SETTINGS.durationMax * index) / 30);
}

function runTimedVariant(fixture, variant, timestamps) {
  const prepare = variant === "baseline"
    ? prepareBaselineParticles
    : prepareOptimizedParticles;
  const draw = variant === "baseline"
    ? drawBaselineFrame
    : drawOptimizedFrame;
  const output = new Uint8ClampedArray(
    fixture.canvasWidth * fixture.canvasHeight * 4,
  );
  const startedAt = performance.now();
  const state = prepare(fixture);
  const preparedAt = performance.now();
  for (const elapsed of timestamps) draw(state, fixture, elapsed, output);
  const completedAt = performance.now();
  return {
    preparationMs: preparedAt - startedAt,
    animationMs: completedAt - preparedAt,
    totalMs: completedAt - startedAt,
    stateBytes: typedArrayBytes(state),
    lastByte: output[output.length - 1],
  };
}

export async function runParticleBenchmark({
  warmups = 7,
  samples = 25,
  baselineSourcePath = process.env.BACKGROUND_REMOVAL_BASELINE,
} = {}) {
  assert.ok(warmups >= 5, "benchmark requires at least five warmups");
  assert.ok(samples >= 20, "benchmark requires at least twenty samples");
  const baselineSource = baselineSourcePath
    ? await readFile(baselineSourcePath, "utf8")
    : [
      prepareBaselineParticles.toString(),
      drawBaselineFrame.toString(),
    ].join("\n");
  for (const marker of [
    "const maximumPixels = drawWidth * drawHeight",
    "Math.cos(direction) * travel * particleSpeeds[index]",
    "const particleShrinkDuration = Math.min",
  ]) {
    assert.ok(
      baselineSource.includes(marker),
      `supplied baseline is missing expected algorithm marker: ${marker}`,
    );
  }

  const fixture = createParticleFixture();
  const parity = verifyParticleParity(fixture);
  const timestamps = animationTimestamps();

  for (let index = 0; index < warmups; index += 1) {
    if (index % 2 === 0) {
      runTimedVariant(fixture, "baseline", timestamps);
      runTimedVariant(fixture, "optimized", timestamps);
    } else {
      runTimedVariant(fixture, "optimized", timestamps);
      runTimedVariant(fixture, "baseline", timestamps);
    }
  }

  const raw = { baseline: [], optimized: [] };
  for (let index = 0; index < samples; index += 1) {
    const order = index % 2 === 0
      ? ["baseline", "optimized"]
      : ["optimized", "baseline"];
    for (const variant of order) {
      raw[variant].push(runTimedVariant(fixture, variant, timestamps));
    }
  }

  const metricSummary = (variant, metric) =>
    summarize(raw[variant].map((sample) => sample[metric]));
  const pairedAnimationDelta = raw.baseline.map(
    (sample, index) => sample.animationMs - raw.optimized[index].animationMs,
  );
  const pairedTotalDelta = raw.baseline.map(
    (sample, index) => sample.totalMs - raw.optimized[index].totalMs,
  );
  const baselineBytes = raw.baseline[0].stateBytes;
  const optimizedBytes = raw.optimized[0].stateBytes;
  const memoryByRemovalRatio = measureParticleStateByRemovalRatio();
  const summary = {
    baseline: {
      preparationMs: metricSummary("baseline", "preparationMs"),
      animationMs: metricSummary("baseline", "animationMs"),
      totalMs: metricSummary("baseline", "totalMs"),
    },
    optimized: {
      preparationMs: metricSummary("optimized", "preparationMs"),
      animationMs: metricSummary("optimized", "animationMs"),
      totalMs: metricSummary("optimized", "totalMs"),
    },
    pairedAnimationDeltaMs: summarize(pairedAnimationDelta),
    pairedTotalDeltaMs: summarize(pairedTotalDelta),
    p50AnimationReductionPercent:
      ((metricSummary("baseline", "animationMs").p50
        - metricSummary("optimized", "animationMs").p50)
        / metricSummary("baseline", "animationMs").p50)
      * 100,
    p50TotalReductionPercent:
      ((metricSummary("baseline", "totalMs").p50
        - metricSummary("optimized", "totalMs").p50)
        / metricSummary("baseline", "totalMs").p50)
      * 100,
    particleStateBytes: {
      baseline: baselineBytes,
      optimized: optimizedBytes,
      difference: optimizedBytes - baselineBytes,
      reductionPercent:
        ((baselineBytes - optimizedBytes) / baselineBytes) * 100,
    },
    particleStateBytesByRemovalRatio: memoryByRemovalRatio.map(
      (measurement) => ({
        targetRemovalRatio: measurement.targetRemovalRatio,
        removedPixels: measurement.removedPixels,
        actualRemovalRatio: measurement.actualRemovalRatio,
        baselineBytes: measurement.baselineBytes,
        optimizedBytes: measurement.optimizedBytes,
        difference: measurement.difference,
        reductionPercent: measurement.reductionPercent,
      }),
    ),
  };

  return {
    protocol: {
      ordering: "paired ABBA",
      warmups,
      samples,
      timedFramesPerSample: timestamps.length,
      timestamps,
      fixture: {
        drawWidth: fixture.drawWidth,
        drawHeight: fixture.drawHeight,
        canvasWidth: fixture.canvasWidth,
        canvasHeight: fixture.canvasHeight,
        removedPixels: parity.pixelCount,
        removedRatio:
          parity.pixelCount / (fixture.drawWidth * fixture.drawHeight),
      },
      statistics: "linear p50/p95; population MAD/CV; no outlier removal",
    },
    source: {
      kind: baselineSourcePath
        ? "supplied before-source file"
        : "embedded exact before-source port",
      path: baselineSourcePath ?? null,
      sha256: createHash("sha256").update(baselineSource).digest("hex"),
    },
    parity: parity.checksums,
    parityByRemovalRatio: memoryByRemovalRatio.map(
      ({ targetRemovalRatio, checksums }) => ({
        targetRemovalRatio,
        checksums,
      }),
    ),
    raw,
    summary,
  };
}

async function main() {
  const result = await runParticleBenchmark();
  process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
}

if (
  process.argv[1]
  && import.meta.url === pathToFileURL(process.argv[1]).href
) {
  await main();
}
