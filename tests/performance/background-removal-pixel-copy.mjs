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
import { tmpdir } from "node:os";
import path from "node:path";
import process from "node:process";
import { fileURLToPath, pathToFileURL } from "node:url";

const DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIRECTORY, "../..");
const BACKGROUND_REMOVAL_PATH = path.join(
  ROOT,
  "lib/background-removal.ts",
);
const DEFAULTS = Object.freeze({
  warmups: 5,
  samples: 20,
  iterations: 1,
  width: 2048,
  height: 2048,
  timeoutMs: 120_000,
});

function usage() {
  return `Background-removal RGBA-copy AB/BA benchmark

Usage:
  node tests/performance/background-removal-pixel-copy.mjs [options]

Options:
  --warmups <count>    Warmup AB/BA pairs (minimum/default ${DEFAULTS.warmups}).
  --samples <count>    Measured AB/BA pairs (minimum/default ${DEFAULTS.samples}).
  --iterations <count> ImageData constructions per variant (default ${DEFAULTS.iterations}).
  --width <pixels>     Measured RGBA width (default ${DEFAULTS.width}).
  --height <pixels>    Measured RGBA height (default ${DEFAULTS.height}).
  --chromium <path>    Chromium/Chrome executable (or CHROMIUM_PATH).
  --timeout-ms <ms>    Browser timeout (default ${DEFAULTS.timeoutMs}).
  --output <path>      Also write the machine-readable JSON result.
  --help               Show this help.

A is the previous allocate-and-copy implementation. B passes the owned
ArrayBuffer-backed Uint8ClampedArray directly to ImageData. Orders alternate
AB, BA for both warmups and measured pairs. JSON goes to stdout.
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
      case "--width":
        options.width = integer(flag, value, 1);
        break;
      case "--height":
        options.height = integer(flag, value, 1);
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
      inputCount: values.length,
      count: 0,
      nonFiniteCount: values.length,
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
  const cv =
    Math.abs(mean) > Number.EPSILON
      ? standardDeviation / Math.abs(mean)
      : null;
  return {
    inputCount: values.length,
    count: finite.length,
    nonFiniteCount: values.length - finite.length,
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

function summarizePairs(samples, iterations) {
  const baseline = samples.map((sample) => sample.baseline.durationMs);
  const optimized = samples.map((sample) => sample.optimized.durationMs);
  const deltas = samples.map(
    (sample) =>
      sample.baseline.durationMs - sample.optimized.durationMs,
  );
  const speedups = samples.map(
    (sample) =>
      sample.baseline.durationMs / sample.optimized.durationMs,
  );
  const reductions = samples.map(
    (sample) =>
      ((sample.baseline.durationMs - sample.optimized.durationMs) /
        sample.baseline.durationMs) *
      100,
  );
  const byOrder = {};
  for (const order of ["AB", "BA"]) {
    const ordered = samples.filter((sample) => sample.order === order);
    byOrder[order] = {
      count: ordered.length,
      baselineDurationMs: summarize(
        ordered.map((sample) => sample.baseline.durationMs),
      ),
      optimizedDurationMs: summarize(
        ordered.map((sample) => sample.optimized.durationMs),
      ),
      pairedDeltaMs: summarize(
        ordered.map(
          (sample) =>
            sample.baseline.durationMs - sample.optimized.durationMs,
        ),
      ),
    };
  }
  return {
    baselineDurationMs: summarize(baseline),
    optimizedDurationMs: summarize(optimized),
    baselinePerIterationMs: summarize(
      baseline.map((duration) => duration / iterations),
    ),
    optimizedPerIterationMs: summarize(
      optimized.map((duration) => duration / iterations),
    ),
    pairedDeltaMs: summarize(deltas),
    pairedSpeedup: summarize(speedups),
    pairedReductionPercent: summarize(reductions),
    byOrder,
  };
}

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

async function isExecutable(candidate) {
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
    if (await isExecutable(candidate)) return candidate;
  }
  throw new Error("Chromium was not found; pass --chromium or set CHROMIUM_PATH.");
}

function browserFixture(configuration) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <title>background-removal-pixel-copy:pending</title>
</head>
<body>
<script>
(() => {
  function encodeResult(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    const chunkSize = 32_768;
    for (let offset = 0; offset < bytes.length; offset += chunkSize) {
      binary += String.fromCharCode(...bytes.subarray(offset, offset + chunkSize));
    }
    return btoa(binary);
  }

  function publish(prefix, value) {
    document.title =
      "background-removal-pixel-copy:" + prefix + encodeResult(value);
  }

  try {
    const config = ${JSON.stringify(configuration)};
    if (typeof globalThis.gc !== "function") {
      throw new Error("Forced GC is unavailable; Chromium must expose globalThis.gc.");
    }
    const pixelCount = config.width * config.height;
    const pixels = new Uint8ClampedArray(new ArrayBuffer(pixelCount * 4));
    for (let index = 0; index < pixels.length; index += 1) {
      pixels[index] = (Math.imul(index, 73) + (index >>> 7) * 19 + 41) & 255;
    }

    function baseline(source, width, height) {
      const imageDataPixels = new Uint8ClampedArray(source.length);
      imageDataPixels.set(source);
      return new ImageData(imageDataPixels, width, height);
    }

    function optimized(source, width, height) {
      return new ImageData(source, width, height);
    }

    const variants = { baseline, optimized };

    function measure(name) {
      const retained = new Array(4);
      let checksum = 2_166_136_261;
      const startedAt = performance.now();
      for (let iteration = 0; iteration < config.iterations; iteration += 1) {
        const imageData = variants[name](pixels, config.width, config.height);
        retained[iteration & 3] = imageData;
        const data = imageData.data;
        const sampleIndex =
          (Math.imul(iteration + 1, 1_048_583) % pixelCount) * 4;
        checksum = Math.imul(
          checksum ^ data[sampleIndex] ^ data[sampleIndex + 3],
          16_777_619,
        ) >>> 0;
      }
      const durationMs = performance.now() - startedAt;
      for (const imageData of retained) {
        if (imageData) checksum ^= imageData.data.byteLength;
      }
      return { durationMs, checksum: checksum >>> 0 };
    }

    function runPair(index) {
      const order = index % 2 === 0 ? ["baseline", "optimized"] : ["optimized", "baseline"];
      const measurements = {};
      for (const name of order) {
        globalThis.gc();
        measurements[name] = measure(name);
      }
      return {
        index,
        order: order[0] === "baseline" ? "AB" : "BA",
        sequence: order,
        baseline: measurements.baseline,
        optimized: measurements.optimized,
      };
    }

    const warmups = Array.from(
      { length: config.warmups },
      (_, index) => runPair(index),
    );
    const samples = Array.from(
      { length: config.samples },
      (_, index) => runPair(index),
    );

    const parityWidth = 37;
    const parityHeight = 29;
    const parityPixels = new Uint8ClampedArray(
      new ArrayBuffer(parityWidth * parityHeight * 4),
    );
    for (let index = 0; index < parityPixels.length; index += 1) {
      parityPixels[index] = (Math.imul(index, 151) + (index >>> 3) * 29 + 7) & 255;
    }
    const inputBefore = new Uint8ClampedArray(parityPixels);

    function bytesToBase64(bytes) {
      let binary = "";
      const chunkSize = 32_768;
      for (let offset = 0; offset < bytes.length; offset += chunkSize) {
        binary += String.fromCharCode(
          ...bytes.subarray(offset, offset + chunkSize),
        );
      }
      return btoa(binary);
    }

    function render(name) {
      const imageData = variants[name](
        parityPixels,
        parityWidth,
        parityHeight,
      );
      const canvas = document.createElement("canvas");
      canvas.width = parityWidth;
      canvas.height = parityHeight;
      const context = canvas.getContext("2d");
      context.putImageData(imageData, 0, 0);
      return {
        imageDataSharesInputView: imageData.data === parityPixels,
        imageDataSharesInputBuffer:
          imageData.data.buffer === parityPixels.buffer,
        dataUrl: canvas.toDataURL("image/png"),
        canvasPixelsBase64: bytesToBase64(
          context.getImageData(0, 0, parityWidth, parityHeight).data,
        ),
      };
    }

    const baselineParity = render("baseline");
    const optimizedParity = render("optimized");
    const inputAfter = bytesToBase64(parityPixels);
    const inputBeforeBase64 = bytesToBase64(inputBefore);
    const checksumsMatch = [...warmups, ...samples].every(
      (pair) => pair.baseline.checksum === pair.optimized.checksum,
    );

    publish("result:", JSON.stringify({
      browser: {
        userAgent: navigator.userAgent,
        hardwareConcurrency: navigator.hardwareConcurrency,
        deviceMemoryGiB: navigator.deviceMemory ?? null,
        forcedGcAvailable: typeof globalThis.gc === "function",
      },
      raw: { warmups, samples },
      measurementParity: {
        checksumsMatch,
        expectedChecksum: samples[0]?.baseline.checksum ?? null,
      },
      parity: {
        width: parityWidth,
        height: parityHeight,
        byteLength: parityPixels.byteLength,
        inputUnchanged: inputBeforeBase64 === inputAfter,
        canvasPixelsEqual:
          baselineParity.canvasPixelsBase64 ===
          optimizedParity.canvasPixelsBase64,
        dataUrlsEqual: baselineParity.dataUrl === optimizedParity.dataUrl,
        baseline: baselineParity,
        optimized: optimizedParity,
        inputPixelsBase64: inputAfter,
      },
    }));
  } catch (error) {
    publish("error:", String(error && error.stack ? error.stack : error));
  }
})();
</script>
</body>
</html>`;
}

async function runBrowser(chromium, configuration, timeoutMs) {
  const temporaryDirectory = await mkdtemp(
    path.join(tmpdir(), "sticker-forge-pixel-copy-"),
  );
  const fixturePath = path.join(temporaryDirectory, "fixture.html");
  const profilePath = path.join(temporaryDirectory, "profile");
  await writeFile(fixturePath, browserFixture(configuration));
  const argumentsList = [
    "--headless=new",
    "--no-sandbox",
    "--js-flags=--expose-gc",
    "--disable-background-networking",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-features=Translate,BackForwardCache",
    "--disable-gpu",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-first-run",
    `--user-data-dir=${profilePath}`,
    "--virtual-time-budget=1000",
    "--dump-dom",
    pathToFileURL(fixturePath).href,
  ];
  let stdout = "";
  let stderr = "";
  let timedOut = false;
  let publishedMatch = null;
  const publicationPattern =
    /<title>background-removal-pixel-copy:(result|error):([A-Za-z0-9+/=]+)<\/title>/;

  try {
    const child = spawn(chromium, argumentsList, {
      stdio: ["ignore", "pipe", "pipe"],
    });
    child.stdout.setEncoding("utf8");
    child.stderr.setEncoding("utf8");
    child.stdout.on("data", (chunk) => {
      stdout += chunk;
      publishedMatch ??= stdout.match(publicationPattern);
      if (publishedMatch) child.kill("SIGTERM");
    });
    child.stderr.on("data", (chunk) => {
      stderr += chunk;
    });
    const timer = setTimeout(() => {
      timedOut = true;
      child.kill("SIGKILL");
    }, timeoutMs);
    let exit;
    try {
      exit = await new Promise((resolve, reject) => {
        child.once("error", reject);
        child.once("exit", (exitCode, exitSignal) => {
          resolve({ code: exitCode, signal: exitSignal });
        });
      });
    } finally {
      clearTimeout(timer);
    }
    const { code, signal } = exit;
    if (timedOut && !publishedMatch) {
      throw new Error(
        `Chromium timed out after ${timeoutMs}ms.\n${stderr}\n${stdout.slice(0, 1_000)}`,
      );
    }
    if (!publishedMatch && code !== 0) {
      throw new Error(
        `Chromium exited with code ${code} (${signal ?? "no signal"}).\n${stderr}`,
      );
    }

    const match = publishedMatch ?? stdout.match(publicationPattern);
    if (!match) {
      throw new Error(
        `Chromium did not publish benchmark results.\n${stderr}\n${stdout.slice(0, 1_000)}`,
      );
    }
    const decoded = Buffer.from(match[2], "base64").toString("utf8");
    if (match[1] === "error") throw new Error(decoded);
    return JSON.parse(decoded);
  } finally {
    await rm(temporaryDirectory, { recursive: true, force: true });
  }
}

function hashAndDropParityPayloads(parity) {
  const baselineDataUrl = parity.baseline.dataUrl;
  const optimizedDataUrl = parity.optimized.dataUrl;
  const baselinePixels = Buffer.from(
    parity.baseline.canvasPixelsBase64,
    "base64",
  );
  const optimizedPixels = Buffer.from(
    parity.optimized.canvasPixelsBase64,
    "base64",
  );
  const inputPixels = Buffer.from(parity.inputPixelsBase64, "base64");
  parity.baseline = {
    imageDataSharesInputView: parity.baseline.imageDataSharesInputView,
    imageDataSharesInputBuffer: parity.baseline.imageDataSharesInputBuffer,
    dataUrlLength: baselineDataUrl.length,
    dataUrlSha256: sha256(baselineDataUrl),
    canvasPixelsSha256: sha256(baselinePixels),
  };
  parity.optimized = {
    imageDataSharesInputView: parity.optimized.imageDataSharesInputView,
    imageDataSharesInputBuffer: parity.optimized.imageDataSharesInputBuffer,
    dataUrlLength: optimizedDataUrl.length,
    dataUrlSha256: sha256(optimizedDataUrl),
    canvasPixelsSha256: sha256(optimizedPixels),
  };
  parity.inputPixelsSha256 = sha256(inputPixels);
  delete parity.inputPixelsBase64;
}

async function main() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const source = await readFile(BACKGROUND_REMOVAL_PATH, "utf8");
  const pixelsToDataUrlBody =
    source.match(
      /function pixelsToDataUrl\([\s\S]*?\n}\n\nfunction getWorker/,
    )?.[0] ?? "";
  const sourceParity = {
    ownedArrayBufferType:
      /pixels: Uint8ClampedArray<ArrayBuffer>/.test(pixelsToDataUrlBody),
    directImageData:
      /new ImageData\(pixels, width, height\)/.test(pixelsToDataUrlBody),
    redundantRgbaAllocationAbsent:
      !/new Uint8ClampedArray/.test(pixelsToDataUrlBody),
  };
  if (!Object.values(sourceParity).every(Boolean)) {
    throw new Error(
      "lib/background-removal.ts does not contain the expected direct ImageData implementation.",
    );
  }

  const chromium = await findChromium(options.chromium);
  const configuration = {
    warmups: options.warmups,
    samples: options.samples,
    iterations: options.iterations,
    width: options.width,
    height: options.height,
  };
  process.stderr.write(
    `Running ${options.warmups} warmup and ${options.samples} measured AB/BA pairs in ${chromium}\n`,
  );
  const browserResult = await runBrowser(
    chromium,
    configuration,
    options.timeoutMs,
  );
  hashAndDropParityPayloads(browserResult.parity);
  const result = {
    benchmark: "background-removal-owned-rgba-buffer",
    version: 1,
    generatedAt: new Date().toISOString(),
    environment: {
      node: process.version,
      platform: process.platform,
      architecture: process.arch,
      chromium,
      ...browserResult.browser,
    },
    configuration: {
      ...configuration,
      rgbaByteLength: options.width * options.height * 4,
      pairOrder: "alternating AB/BA; A=baseline copy, B=optimized direct view",
    },
    methodology: {
      timer: "window.performance.now()",
      timingScope:
        "RGBA view allocation/copy and ImageData construction; canvas/PNG encoding is parity-only",
      forcedGarbageCollection: {
        enabled: browserResult.browser.forcedGcAvailable,
        chromiumFlag: "--js-flags=--expose-gc",
        placement:
          "immediately before every A or B measurement, outside the timed interval",
      },
      retainedValues:
        "up to four ImageData results are retained through each timed interval",
    },
    implementation: {
      sourcePath: path.relative(ROOT, BACKGROUND_REMOVAL_PATH),
      sourceSha256: sha256(source),
      sourceParity,
      baseline:
        "allocate Uint8ClampedArray, set all RGBA bytes, construct ImageData",
      optimized:
        "construct ImageData directly from the owned ArrayBuffer-backed view",
    },
    parity: browserResult.parity,
    measurementParity: browserResult.measurementParity,
    summary: summarizePairs(browserResult.raw.samples, options.iterations),
    raw: browserResult.raw,
  };
  result.parity.passed =
    result.parity.inputUnchanged &&
    result.parity.canvasPixelsEqual &&
    result.parity.dataUrlsEqual &&
    result.measurementParity.checksumsMatch;

  const output = `${JSON.stringify(result, null, 2)}\n`;
  process.stdout.write(output);
  if (options.output) await writeFile(options.output, output);
  if (!result.parity.passed) process.exitCode = 2;
}

main().catch((error) => {
  process.stderr.write(
    `${error instanceof Error ? error.stack : String(error)}\n`,
  );
  process.exitCode = 1;
});
