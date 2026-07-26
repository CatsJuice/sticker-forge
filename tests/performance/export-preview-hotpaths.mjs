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

const DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const ROOT = path.resolve(DIRECTORY, "../..");
const EMBED_PATH = path.join(ROOT, "public/embed/sticker-forge.es.js");
const DEFAULTS = Object.freeze({
  warmups: 5,
  samples: 20,
  manualTicks: 24,
  automaticTicks: 24,
  timeoutMs: 120_000,
});
const DURATION_METRICS = new Set([
  "TaskDuration",
  "ScriptDuration",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ThreadTime",
]);
const METRICS = [
  ...DURATION_METRICS,
  "LayoutCount",
  "RecalcStyleCount",
  "JSHeapUsedSize",
  "Nodes",
  "JSEventListeners",
];

function usage() {
  return `Real-Chromium export preview hot-path benchmark

Usage:
  node tests/performance/export-preview-hotpaths.mjs [options]

Full benchmark defaults:
  5 warmup AB/BA pairs, 20 measured AB/BA pairs, 24 rAF ticks/path.

Options:
  --warmups <count>          Warmup pairs (minimum 5 outside --smoke).
  --samples <count>          Measured pairs (minimum 20 outside --smoke).
  --manual-ticks <count>     Manual playback rAF ticks (default 24).
  --automatic-ticks <count>  Automatic interval rAF ticks (default 24).
  --chromium <path>          Chromium/Chrome executable (or CHROMIUM_PATH).
  --timeout-ms <ms>          Browser/CDP timeout (default 120000).
  --output <path>            Also write the JSON result.
  --smoke                    Minimal 1-pair/6-tick validation; never use for PR data.
  --help                     Show this help.

JSON is written to stdout and progress to stderr.
`;
}

function parseInteger(flag, value, minimum) {
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
    smoke: false,
  };
  const values = new Map();
  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    if (argument === "--help" || argument === "-h") {
      options.help = true;
      continue;
    }
    if (argument === "--smoke") {
      options.smoke = true;
      continue;
    }
    const separator = argument.indexOf("=");
    const flag = separator >= 0 ? argument.slice(0, separator) : argument;
    const inline = separator >= 0 ? argument.slice(separator + 1) : null;
    const value = inline ?? argv[++index];
    if (!value) throw new Error(`${flag} requires a value.`);
    values.set(flag, value);
  }

  if (options.smoke) {
    options.warmups = 1;
    options.samples = 1;
    options.manualTicks = 6;
    options.automaticTicks = 6;
  }
  const minimumWarmups = options.smoke ? 0 : 5;
  const minimumSamples = options.smoke ? 1 : 20;
  for (const [flag, value] of values) {
    switch (flag) {
      case "--warmups":
        options.warmups = parseInteger(flag, value, minimumWarmups);
        break;
      case "--samples":
        options.samples = parseInteger(flag, value, minimumSamples);
        break;
      case "--manual-ticks":
        options.manualTicks = parseInteger(flag, value, 2);
        break;
      case "--automatic-ticks":
        options.automaticTicks = parseInteger(flag, value, 2);
        break;
      case "--timeout-ms":
        options.timeoutMs = parseInteger(flag, value, 1_000);
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

function sha256(value) {
  return createHash("sha256").update(value).digest("hex");
}

function delay(milliseconds) {
  return new Promise((resolve) => setTimeout(resolve, milliseconds));
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

function fixtureHtml(configuration) {
  return `<!doctype html>
<html>
<head>
  <meta charset="utf-8">
  <meta name="viewport" content="width=device-width,initial-scale=1">
  <title>Export preview hot paths</title>
  <style>
    html, body { margin: 0; width: 100%; height: 100%; overflow: hidden; background: #eeeef3; }
    body { display: grid; grid-template-columns: 720px 520px; place-content: center; gap: 24px; }
    #manual { width: 720px; height: 480px; }
    #sticker { width: 520px; height: 420px; }
  </style>
</head>
<body>
  <canvas id="manual" width="720" height="480"></canvas>
  <div id="sticker"></div>
  <script type="module">
    import { createSticker } from "/embed/sticker-forge.es.js";

    window.__exportPreviewBenchmarkReady = (async () => {
    const CONFIG = ${JSON.stringify(configuration)};
    const MANUAL_WIDTH = 720;
    const MANUAL_HEIGHT = 480;
    const FRAME_COUNT = 12;
    const manualCanvas = document.querySelector("#manual");
    const manualContext = manualCanvas.getContext("2d", { alpha: true });
    const stickerHost = document.querySelector("#sticker");

    function nextFrame() {
      return new Promise((resolve) => requestAnimationFrame(resolve));
    }

    async function waitFrames(count) {
      for (let index = 0; index < count; index += 1) await nextFrame();
    }

    function createFrames() {
      const frames = [];
      for (let frameIndex = 0; frameIndex < FRAME_COUNT; frameIndex += 1) {
        const rgba = new Uint8ClampedArray(
          MANUAL_WIDTH * MANUAL_HEIGHT * 4,
        );
        for (let y = 0; y < MANUAL_HEIGHT; y += 1) {
          for (let x = 0; x < MANUAL_WIDTH; x += 1) {
            const offset = (y * MANUAL_WIDTH + x) * 4;
            rgba[offset] = (x * 3 + y * 5 + frameIndex * 17) & 255;
            rgba[offset + 1] = (x * 7 + y * 2 + frameIndex * 29) & 255;
            rgba[offset + 2] = (x + y * 11 + frameIndex * 43) & 255;
            rgba[offset + 3] =
              ((x + frameIndex * 23) % 97 < 11 ||
              (y + frameIndex * 13) % 89 < 7)
                ? 96
                : 255;
          }
        }
        frames.push({
          rgba,
          imageData: new ImageData(rgba, MANUAL_WIDTH, MANUAL_HEIGHT),
        });
      }
      return frames;
    }

    async function sha256(bytes) {
      const digest = await crypto.subtle.digest("SHA-256", bytes);
      return Array.from(
        new Uint8Array(digest),
        (value) => value.toString(16).padStart(2, "0"),
      ).join("");
    }

    async function captureManual() {
      const pixels = manualContext.getImageData(
        0,
        0,
        MANUAL_WIDTH,
        MANUAL_HEIGHT,
      ).data;
      return {
        sha256: await sha256(pixels),
        byteLength: pixels.byteLength,
      };
    }

    function normalizedSnapshot(controller) {
      const snapshot = controller.getRenderSnapshot();
      return {
        progress: snapshot.progress,
        peelDepth: snapshot.peelDepth,
        peelRadius: snapshot.peelRadius,
        detachedTension: snapshot.detachedTension,
        origin: snapshot.origin,
        direction: snapshot.direction,
        position: snapshot.position,
        scale: snapshot.scale,
        rotation: snapshot.rotation,
        entranceSweep: snapshot.entranceSweep,
        entranceScaleProgress: snapshot.entranceScaleProgress,
      };
    }

    async function captureWebgl(controller) {
      const canvas = stickerHost.querySelector("canvas");
      const context =
        canvas.getContext("webgl2", { preserveDrawingBuffer: true }) ||
        canvas.getContext("webgl", { preserveDrawingBuffer: true });
      const pixels = new Uint8Array(canvas.width * canvas.height * 4);
      context.finish();
      context.readPixels(
        0,
        0,
        canvas.width,
        canvas.height,
        context.RGBA,
        context.UNSIGNED_BYTE,
        pixels,
      );
      return {
        pixels: {
          sha256: await sha256(pixels),
          width: canvas.width,
          height: canvas.height,
          byteLength: pixels.byteLength,
        },
        state: controller.getState(),
        snapshot: normalizedSnapshot(controller),
      };
    }

    const frames = createFrames();
    const controller = await createSticker(stickerHost, {
      source: {
        type: "svg",
        svg: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 384"><rect width="512" height="384" rx="80" fill="#7958e8"/><circle cx="176" cy="154" r="22" fill="#fff"/><circle cx="336" cy="154" r="22" fill="#fff"/><path d="M160 256c54 42 138 42 192 0" fill="none" stroke="#fff" stroke-width="22" stroke-linecap="round"/></svg>',
      },
      outline: { width: 12, color: "#ffffff" },
      shadow: {
        color: "#211637",
        opacity: 0.32,
        blur: 28,
        distance: 14,
        angle: 90,
      },
      material: {
        type: "original",
        intensity: 0.86,
        scale: 1,
        holographicGrain: 0.72,
        seed: 0.37,
        holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"],
      },
      peel: { release: "stay" },
      sound: { enabled: false, volume: 0 },
      tilt: 0,
      wind: 0,
      quality: "high",
    });
    await waitFrames(3);

    async function prepareManual() {
      manualContext.clearRect(0, 0, MANUAL_WIDTH, MANUAL_HEIGHT);
      await waitFrames(2);
    }

    async function runManual(implementation) {
      const intervals = [];
      const sequence = [];
      let previousTimestamp = null;
      let previousFrameIndex = -1;
      let uploads = 0;
      let allocatedBytes = 0;
      const startedAt = performance.now();
      for (let tick = 0; tick < CONFIG.manualTicks; tick += 1) {
        const timestamp = await nextFrame();
        if (previousTimestamp !== null) {
          intervals.push(timestamp - previousTimestamp);
        }
        previousTimestamp = timestamp;
        const frameIndex = Math.floor(tick / 2) % frames.length;
        const frame = frames[frameIndex];
        sequence.push(frameIndex);
        if (implementation === "legacy") {
          const copied = new Uint8ClampedArray(frame.rgba);
          allocatedBytes += copied.byteLength;
          manualContext.putImageData(
            new ImageData(copied, MANUAL_WIDTH, MANUAL_HEIGHT),
            0,
            0,
          );
          uploads += 1;
        } else if (frameIndex !== previousFrameIndex) {
          manualContext.putImageData(frame.imageData, 0, 0);
          uploads += 1;
        }
        previousFrameIndex = frameIndex;
      }
      return {
        implementation,
        durationMs: performance.now() - startedAt,
        intervals,
        sequence,
        uploads,
        allocatedBytes,
        finalFrameIndex: sequence.at(-1),
      };
    }

    async function prepareAutomatic() {
      controller.reset();
      controller.setPeelProgress(0, {
        origin: { x: 0, y: 0.5 },
        target: { x: 1, y: 0.5 },
      });
      await waitFrames(3);
    }

    async function runAutomatic(implementation) {
      const intervals = [];
      let previousTimestamp = null;
      let renderRequests = 0;
      const startedAt = performance.now();
      for (let tick = 0; tick < CONFIG.automaticTicks; tick += 1) {
        const timestamp = await nextFrame();
        if (previousTimestamp !== null) {
          intervals.push(timestamp - previousTimestamp);
        }
        previousTimestamp = timestamp;
        if (implementation === "legacy" || tick === 0) {
          controller.setPeelProgress(0, {
            origin: { x: 0, y: 0.5 },
            target: { x: 1, y: 0.5 },
          });
          renderRequests += 1;
        }
      }
      return {
        implementation,
        durationMs: performance.now() - startedAt,
        intervals,
        renderRequests,
        state: controller.getState(),
        snapshot: normalizedSnapshot(controller),
      };
    }

    window.__exportPreviewBenchmark = {
      prepareManual,
      runManual,
      captureManual,
      prepareAutomatic,
      runAutomatic,
      captureAutomatic: () => captureWebgl(controller),
      settle: () => waitFrames(2),
      metadata: () => ({
        manual: {
          width: MANUAL_WIDTH,
          height: MANUAL_HEIGHT,
          frameCount: frames.length,
          frameBytes: frames[0].rgba.byteLength,
        },
        automatic: {
          hostWidth: stickerHost.clientWidth,
          hostHeight: stickerHost.clientHeight,
        },
        viewport: {
          width: innerWidth,
          height: innerHeight,
          devicePixelRatio,
        },
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        crossOriginIsolated,
      }),
    };
    return window.__exportPreviewBenchmark.metadata();
    })();
  </script>
</body>
</html>`;
}

async function startServer(configuration, embedBundle) {
  const fixture = Buffer.from(fixtureHtml(configuration));
  const resources = new Map([
    ["/", ["text/html; charset=utf-8", fixture]],
    [
      "/embed/sticker-forge.es.js",
      ["text/javascript; charset=utf-8", embedBundle],
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
  const profile = await mkdtemp(path.join(tmpdir(), "export-preview-benchmark-"));
  const args = [
    "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profile}`,
    "--window-size=1440,900",
    "--force-device-scale-factor=1",
    "--force-color-profile=srgb",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-extensions",
    "--disable-renderer-backgrounding",
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
      // Chromium writes this file once CDP is ready.
    }
    await delay(50);
  }
  if (!activePort) {
    child.kill("SIGTERM");
    await rm(profile, { recursive: true, force: true }).catch(() => {});
    throw new Error(`Chromium did not expose CDP.\n${stderr}`);
  }
  const [port] = activePort.trim().split(/\r?\n/);
  const [version, pages] = await Promise.all([
    fetch(`http://127.0.0.1:${port}/json/version`).then((response) =>
      response.json(),
    ),
    fetch(`http://127.0.0.1:${port}/json/list`).then((response) =>
      response.json(),
    ),
  ]);
  const page = pages.find((target) => target.type === "page");
  return {
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

async function evaluate(cdp, expression) {
  const response = await cdp.call("Runtime.evaluate", {
    expression,
    awaitPromise: true,
    returnByValue: true,
  });
  if (response.exceptionDetails) {
    throw new Error(
      response.exceptionDetails.exception?.description ||
        response.exceptionDetails.text,
    );
  }
  return response.result?.value;
}

function pageCall(cdp, method, ...args) {
  const encoded = args.map((value) => JSON.stringify(value)).join(",");
  return evaluate(cdp, `window.__exportPreviewBenchmark.${method}(${encoded})`);
}

async function performanceMetrics(cdp) {
  const response = await cdp.call("Performance.getMetrics");
  return Object.fromEntries(
    response.metrics.map(({ name, value }) => [name, value]),
  );
}

function metricsDelta(before, after) {
  const delta = {};
  for (const name of METRICS) {
    if (!Number.isFinite(before[name]) || !Number.isFinite(after[name])) continue;
    const value = after[name] - before[name];
    delta[name] = DURATION_METRICS.has(name) ? value * 1_000 : value;
  }
  return delta;
}

async function forceGc(cdp) {
  await cdp.call("HeapProfiler.collectGarbage");
  await cdp.call("HeapProfiler.collectGarbage");
}

async function measureImplementation(cdp, scenario, implementation) {
  const capitalized = scenario[0].toUpperCase() + scenario.slice(1);
  await pageCall(cdp, `prepare${capitalized}`);
  await forceGc(cdp);
  await pageCall(cdp, "settle");
  const before = await performanceMetrics(cdp);
  const run = await pageCall(cdp, `run${capitalized}`, implementation);
  const after = await performanceMetrics(cdp);
  const parity = await pageCall(cdp, `capture${capitalized}`);
  return {
    run,
    parity,
    performance: {
      before,
      after,
      delta: metricsDelta(before, after),
    },
  };
}

async function runPairs(cdp, scenario, count, phase) {
  const pairs = [];
  for (let index = 0; index < count; index += 1) {
    const order =
      index % 2 === 0
        ? ["legacy", "optimized"]
        : ["optimized", "legacy"];
    const pair = { phase, index, order };
    for (const implementation of order) {
      pair[implementation] = await measureImplementation(
        cdp,
        scenario,
        implementation,
      );
    }
    pairs.push(pair);
    process.stderr.write(
      `${scenario} ${phase} pair ${index + 1}/${count}\r`,
    );
  }
  if (count > 0) process.stderr.write("\n");
  return pairs;
}

function summarizePairs(pairs) {
  const implementations = {};
  for (const implementation of ["legacy", "optimized"]) {
    const values = pairs.map((pair) => pair[implementation]);
    implementations[implementation] = {
      durationMs: summarize(values.map((value) => value.run.durationMs)),
      taskDurationMs: summarize(
        values.map((value) => value.performance.delta.TaskDuration),
      ),
      scriptDurationMs: summarize(
        values.map((value) => value.performance.delta.ScriptDuration),
      ),
      layoutDurationMs: summarize(
        values.map((value) => value.performance.delta.LayoutDuration),
      ),
      frameIntervalsMs: summarize(
        values.flatMap((value) => value.run.intervals),
      ),
      uploads: summarize(values.map((value) => value.run.uploads)),
      allocatedBytes: summarize(
        values.map((value) => value.run.allocatedBytes),
      ),
      renderRequests: summarize(
        values.map((value) => value.run.renderRequests),
      ),
    };
  }
  const paired = (selector) =>
    summarize(
      pairs.map((pair) => {
        const legacy = selector(pair.legacy);
        const optimized = selector(pair.optimized);
        return legacy > 0 ? ((legacy - optimized) / legacy) * 100 : null;
      }),
    );
  return {
    implementations,
    pairedReductionPercent: {
      duration: paired((value) => value.run.durationMs),
      taskDuration: paired(
        (value) => value.performance.delta.TaskDuration,
      ),
      scriptDuration: paired(
        (value) => value.performance.delta.ScriptDuration,
      ),
    },
  };
}

function stableJson(value) {
  return JSON.stringify(value);
}

function parityReport(manualPairs, automaticPairs, configuration) {
  const manual = manualPairs.map((pair) => ({
    index: pair.index,
    pixelExact:
      pair.legacy.parity.sha256 === pair.optimized.parity.sha256,
    sequenceExact:
      stableJson(pair.legacy.run.sequence) ===
      stableJson(pair.optimized.run.sequence),
    finalFrameExact:
      pair.legacy.run.finalFrameIndex ===
      pair.optimized.run.finalFrameIndex,
    legacyUploadsEveryTick:
      pair.legacy.run.uploads === configuration.manualTicks,
    optimizedUploadsOnlyOnChange:
      pair.optimized.run.uploads ===
      Math.ceil(configuration.manualTicks / 2),
    optimizedAllocatedNoFrameCopies:
      pair.optimized.run.allocatedBytes === 0,
    legacyAllocatedExact:
      pair.legacy.run.allocatedBytes ===
      configuration.manualTicks * 720 * 480 * 4,
  }));
  const automatic = automaticPairs.map((pair) => ({
    index: pair.index,
    pixelExact:
      pair.legacy.parity.pixels.sha256 ===
      pair.optimized.parity.pixels.sha256,
    stateExact:
      stableJson(pair.legacy.parity.state) ===
      stableJson(pair.optimized.parity.state),
    snapshotExact:
      stableJson(pair.legacy.parity.snapshot) ===
      stableJson(pair.optimized.parity.snapshot),
    runStateExact:
      stableJson(pair.legacy.run.state) ===
      stableJson(pair.optimized.run.state),
    runSnapshotExact:
      stableJson(pair.legacy.run.snapshot) ===
      stableJson(pair.optimized.run.snapshot),
    legacyRenderedEveryTick:
      pair.legacy.run.renderRequests === configuration.automaticTicks,
    optimizedRenderedOnce:
      pair.optimized.run.renderRequests === 1,
  }));
  return {
    pass:
      manual.every((entry) =>
        Object.entries(entry)
          .filter(([key]) => key !== "index")
          .every(([, value]) => value === true),
      ) &&
      automatic.every((entry) =>
        Object.entries(entry)
          .filter(([key]) => key !== "index")
          .every(([, value]) => value === true),
      ),
    manual,
    automatic,
  };
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }
  const embedBundle = await readFile(EMBED_PATH);
  const chromium = await findChromium(options.chromium);
  const server = await startServer(options, embedBundle);
  let browser;
  let cdp;
  let result;
  try {
    process.stderr.write(`Launching ${chromium}\n`);
    browser = await launch(chromium, options.timeoutMs);
    cdp = new Cdp(browser.websocketUrl, options.timeoutMs);
    await cdp.connect();
    await Promise.all([
      cdp.call("Page.enable"),
      cdp.call("Runtime.enable"),
      cdp.call("Performance.enable", { timeDomain: "timeTicks" }),
      cdp.call("HeapProfiler.enable"),
    ]);
    await cdp.call("Emulation.setDeviceMetricsOverride", {
      width: 1440,
      height: 900,
      deviceScaleFactor: 1,
      mobile: false,
      screenWidth: 1440,
      screenHeight: 900,
    });
    await cdp.call("Emulation.setEmulatedMedia", {
      media: "screen",
      features: [
        { name: "prefers-reduced-motion", value: "no-preference" },
        { name: "prefers-color-scheme", value: "light" },
      ],
    });
    const loaded = cdp.wait("Page.loadEventFired");
    await cdp.call("Page.navigate", { url: server.url });
    await loaded;
    const metadata = await evaluate(
      cdp,
      "window.__exportPreviewBenchmarkReady",
    );
    if (
      metadata.viewport.width !== 1440 ||
      metadata.viewport.height !== 900 ||
      metadata.viewport.devicePixelRatio !== 1
    ) {
      throw new Error(`Unexpected viewport: ${JSON.stringify(metadata.viewport)}`);
    }

    const scenarios = {};
    for (const scenario of ["manual", "automatic"]) {
      process.stderr.write(`Preparing ${scenario} AB/BA benchmark\n`);
      const warmups = await runPairs(
        cdp,
        scenario,
        options.warmups,
        "warmup",
      );
      const samples = await runPairs(
        cdp,
        scenario,
        options.samples,
        "measured",
      );
      scenarios[scenario] = {
        warmups,
        samples,
        summary: summarizePairs(samples),
      };
    }
    const parity = parityReport(
      scenarios.manual.samples,
      scenarios.automatic.samples,
      options,
    );
    result = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      benchmark: {
        name: "export-preview-real-browser-hotpaths",
        description:
          "Actual Canvas2D/ImageData manual playback and real Sticker Forge WebGL automatic interval, measured as alternating legacy/optimized AB/BA pairs.",
        fullRun: !options.smoke,
        smoke: options.smoke,
        methodology: {
          viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
          manual:
            "Legacy copies RGBA and putImageData every rAF; optimized reuses ImageData and uploads only when the 30fps source frame changes.",
          automatic:
            "Legacy calls real controller.setPeelProgress(0), which synchronously renders, every rAF; optimized calls it once at interval entry.",
          cpu:
            "CDP Performance.getMetrics TaskDuration/ScriptDuration deltas exclude pixel hashing.",
          order:
            "Even pairs run legacy then optimized; odd pairs reverse the order.",
          statistics:
            "Raw samples plus linear-interpolated p50/p95, MAD, population standard deviation, and CV=sd/abs(mean).",
        },
      },
      configuration: {
        warmups: options.warmups,
        samples: options.samples,
        manualTicks: options.manualTicks,
        automaticTicks: options.automaticTicks,
      },
      environment: {
        node: process.version,
        platform: process.platform,
        architecture: process.arch,
        chromium,
        browser: browser.version.Browser,
        userAgent: metadata.userAgent,
        browserPlatform: metadata.platform,
        crossOriginIsolated: metadata.crossOriginIsolated,
      },
      sources: {
        embed: {
          path: "public/embed/sticker-forge.es.js",
          bytes: embedBundle.byteLength,
          sha256: sha256(embedBundle),
        },
      },
      fixture: metadata,
      scenarios,
      exactParity: parity,
      pass: parity.pass,
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
