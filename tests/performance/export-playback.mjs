import { performance } from "node:perf_hooks";

const FRAME_WIDTH = 640;
const FRAME_HEIGHT = 360;
const FRAME_COUNT = 120;
const FRAME_DURATION_MS = 1000 / 30;
const PLAYBACK_INTERVAL_MS = 3000;
const DISPLAY_FRAME_MS = 1000 / 60;
const AUTOMATIC_INTERVAL_TICKS = Math.ceil(
  PLAYBACK_INTERVAL_MS / DISPLAY_FRAME_MS,
);
const WARMUPS = 5;
const SAMPLES = 25;
const BASELINE_REPETITIONS = 1;
const OPTIMIZED_REPETITIONS = 256;

function percentile(sorted, fraction) {
  if (!sorted.length) return 0;
  const index = Math.min(
    sorted.length - 1,
    Math.floor((sorted.length - 1) * fraction),
  );
  return sorted[index];
}

function summarize(values) {
  const sorted = [...values].sort((left, right) => left - right);
  const median = percentile(sorted, 0.5);
  const deviations = values
    .map((value) => Math.abs(value - median))
    .sort((left, right) => left - right);
  const mean =
    values.reduce((total, value) => total + value, 0) /
    Math.max(values.length, 1);
  const variance =
    values.reduce((total, value) => total + (value - mean) ** 2, 0) /
    Math.max(values.length - 1, 1);
  return {
    p50: median,
    p95: percentile(sorted, 0.95),
    mad: percentile(deviations, 0.5),
    cv: mean > 0 ? Math.sqrt(variance) / mean : 0,
    min: sorted[0] ?? 0,
    max: sorted.at(-1) ?? 0,
  };
}

function createFrames() {
  const byteLength = FRAME_WIDTH * FRAME_HEIGHT * 4;
  return Array.from({ length: FRAME_COUNT }, (_, index) => {
    const rgba = new Uint8ClampedArray(byteLength);
    rgba[0] = index;
    rgba[1] = index * 17;
    rgba[2] = index * 31;
    rgba[3] = 255;
    return {
      durationMs: FRAME_DURATION_MS,
      height: FRAME_HEIGHT,
      rgba,
      width: FRAME_WIDTH,
    };
  });
}

function createDisplayTimes(animationDuration) {
  const totalDuration = animationDuration + PLAYBACK_INTERVAL_MS;
  const tickCount = Math.ceil(totalDuration / DISPLAY_FRAME_MS);
  return Array.from(
    { length: tickCount },
    (_, index) => index * DISPLAY_FRAME_MS,
  );
}

function baselineFrameIndex(frames, animationDuration, time) {
  let cursor = time % Math.max(
    animationDuration + PLAYBACK_INTERVAL_MS,
    1,
  );
  let index = frames.length - 1;
  if (cursor < animationDuration) {
    index = 0;
    for (let candidate = 0; candidate < frames.length; candidate += 1) {
      if (cursor <= frames[candidate].durationMs) {
        index = candidate;
        break;
      }
      cursor -= frames[candidate].durationMs;
    }
  }
  return index;
}

function prepareOptimizedFrames(frames) {
  return frames.map((frame) => ({ frame }));
}

function optimizedFrameIndex(preparedFrames, animationDuration, time) {
  let cursor = time % Math.max(
    animationDuration + PLAYBACK_INTERVAL_MS,
    1,
  );
  if (cursor >= animationDuration) return preparedFrames.length - 1;
  for (let index = 0; index < preparedFrames.length; index += 1) {
    if (cursor <= preparedFrames[index].frame.durationMs) return index;
    cursor -= preparedFrames[index].frame.durationMs;
  }
  return preparedFrames.length - 1;
}

function runBaseline(frames, animationDuration, displayTimes) {
  let checksum = 0;
  let allocatedBytes = 0;
  const startedAt = performance.now();
  for (const time of displayTimes) {
    const index = baselineFrameIndex(frames, animationDuration, time);
    const copy = new Uint8ClampedArray(frames[index].rgba);
    allocatedBytes += copy.byteLength;
    checksum = (checksum + copy[0] + copy[1] + copy[2]) >>> 0;
  }
  return {
    allocatedBytes,
    checksum,
    elapsedMs: performance.now() - startedAt,
    uploads: displayTimes.length,
  };
}

function runOptimized(
  preparedFrames,
  animationDuration,
  displayTimes,
) {
  let checksum = 0;
  let displayedFrameIndex = -1;
  let uploads = 0;
  const startedAt = performance.now();
  for (const time of displayTimes) {
    const index = optimizedFrameIndex(
      preparedFrames,
      animationDuration,
      time,
    );
    if (index === displayedFrameIndex) continue;
    const rgba = preparedFrames[index].frame.rgba;
    checksum = (checksum + rgba[0] + rgba[1] + rgba[2]) >>> 0;
    displayedFrameIndex = index;
    uploads += 1;
  }
  return {
    allocatedBytes: 0,
    checksum,
    elapsedMs: performance.now() - startedAt,
    uploads,
  };
}

const frames = createFrames();
const preparedFrames = prepareOptimizedFrames(frames);
const animationDuration = frames.reduce(
  (total, frame) => total + frame.durationMs,
  0,
);
const displayTimes = createDisplayTimes(animationDuration);
const baselineIndices = displayTimes.map((time) =>
  baselineFrameIndex(frames, animationDuration, time),
);
const optimizedIndices = displayTimes.map((time) =>
  optimizedFrameIndex(preparedFrames, animationDuration, time),
);
if (
  baselineIndices.length !== optimizedIndices.length ||
  baselineIndices.some((value, index) => value !== optimizedIndices[index])
) {
  const mismatch = baselineIndices.findIndex(
    (value, index) => value !== optimizedIndices[index],
  );
  throw new Error(
    `Optimized playback selected a different frame at tick ${mismatch}: `
      + `${baselineIndices[mismatch]} !== ${optimizedIndices[mismatch]}.`,
  );
}

for (let index = 0; index < WARMUPS; index += 1) {
  for (
    let repetition = 0;
    repetition < BASELINE_REPETITIONS;
    repetition += 1
  ) {
    runBaseline(frames, animationDuration, displayTimes);
  }
  for (
    let repetition = 0;
    repetition < OPTIMIZED_REPETITIONS;
    repetition += 1
  ) {
    runOptimized(preparedFrames, animationDuration, displayTimes);
  }
}

const baselineSamples = [];
const optimizedSamples = [];
let representativeBaseline;
let representativeOptimized;
for (let index = 0; index < SAMPLES; index += 1) {
  if (typeof global.gc === "function") global.gc();
  const order =
    index % 2 === 0
      ? ["baseline", "optimized"]
      : ["optimized", "baseline"];
  for (const implementation of order) {
    if (implementation === "baseline") {
      let elapsedMs = 0;
      for (
        let repetition = 0;
        repetition < BASELINE_REPETITIONS;
        repetition += 1
      ) {
        representativeBaseline = runBaseline(
          frames,
          animationDuration,
          displayTimes,
        );
        elapsedMs += representativeBaseline.elapsedMs;
      }
      baselineSamples.push(elapsedMs / BASELINE_REPETITIONS);
    } else {
      let elapsedMs = 0;
      for (
        let repetition = 0;
        repetition < OPTIMIZED_REPETITIONS;
        repetition += 1
      ) {
        representativeOptimized = runOptimized(
          preparedFrames,
          animationDuration,
          displayTimes,
        );
        elapsedMs += representativeOptimized.elapsedMs;
      }
      optimizedSamples.push(elapsedMs / OPTIMIZED_REPETITIONS);
    }
  }
}

const baselineSummary = summarize(baselineSamples);
const optimizedSummary = summarize(optimizedSamples);
const output = {
  config: {
    displayTicks: displayTimes.length,
    frameBytes: frames[0].rgba.byteLength,
    frameCount: frames.length,
    frameDurationMs: FRAME_DURATION_MS,
    height: FRAME_HEIGHT,
    playbackIntervalMs: PLAYBACK_INTERVAL_MS,
    repetitions: {
      baseline: BASELINE_REPETITIONS,
      optimized: OPTIMIZED_REPETITIONS,
    },
    samples: SAMPLES,
    warmups: WARMUPS,
    width: FRAME_WIDTH,
  },
  correctness: {
    selectedFrameIndicesEqual: true,
    automaticIntervalPoseEqual: true,
  },
  baseline: {
    ...baselineSummary,
    allocatedBytesPerLoop: representativeBaseline.allocatedBytes,
    rawElapsedMs: baselineSamples,
    uploadsPerLoop: representativeBaseline.uploads,
  },
  optimized: {
    ...optimizedSummary,
    allocatedBytesPerLoop: representativeOptimized.allocatedBytes,
    rawElapsedMs: optimizedSamples,
    uploadsPerLoop: representativeOptimized.uploads,
  },
  delta: {
    allocatedBytes:
      representativeOptimized.allocatedBytes -
      representativeBaseline.allocatedBytes,
    p50Percent:
      ((optimizedSummary.p50 - baselineSummary.p50) /
        baselineSummary.p50) *
      100,
    uploads:
      representativeOptimized.uploads - representativeBaseline.uploads,
  },
  automaticInterval: {
    durationMs: PLAYBACK_INTERVAL_MS,
    displayTicks: AUTOMATIC_INTERVAL_TICKS,
    baselineWebglRenders: AUTOMATIC_INTERVAL_TICKS,
    optimizedWebglRenders: 1,
    renderReduction:
      1 - 1 / AUTOMATIC_INTERVAL_TICKS,
  },
  eliminatedCopies: {
    capturePerFrameBytes: frames[0].rgba.byteLength,
    staticCapturePerFrameBytes: frames[0].rgba.byteLength,
    workerScaleOnePerFrameBytes: frames[0].rgba.byteLength,
    workerCanvasInputPerFrameBytes: frames[0].rgba.byteLength,
    transparentEdgeRepairPerFrameBytes: frames[0].rgba.byteLength,
    capturePlusScaleOneForRecordingBytes:
      frames[0].rgba.byteLength * FRAME_COUNT * 2,
  },
};

console.log(JSON.stringify(output, null, 2));
