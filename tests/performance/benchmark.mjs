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
import { performance as nodePerformance } from "node:perf_hooks";
import { fileURLToPath } from "node:url";

const PERFORMANCE_DIRECTORY = path.dirname(fileURLToPath(import.meta.url));
const REPOSITORY_ROOT = path.resolve(PERFORMANCE_DIRECTORY, "../..");
const FIXTURE_PATH = path.join(PERFORMANCE_DIRECTORY, "fixture.html");
const PAGE_RUNTIME_PATH = path.join(PERFORMANCE_DIRECTORY, "page-runtime.js");
const EMBED_BUNDLE_PATH = path.join(
  REPOSITORY_ROOT,
  "public/embed/sticker-forge.es.js",
);

const DEFAULTS = Object.freeze({
  warmups: 5,
  runs: 20,
  memoryWarmups: 8,
  memoryCycles: 20,
  pointerSteps: 48,
  pointerStepMs: 8,
  timeoutMs: 30_000,
  headed: false,
  strictParity: true,
});
const NOOP_RESIZE_ITERATIONS = 24;

const PERFORMANCE_METRIC_NAMES = Object.freeze([
  "TaskDuration",
  "ScriptDuration",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ThreadTime",
  "V8CompileDuration",
  "LayoutCount",
  "RecalcStyleCount",
  "Nodes",
  "Documents",
  "Frames",
  "JSEventListeners",
  "JSHeapUsedSize",
  "JSHeapTotalSize",
]);

const DURATION_METRICS = new Set([
  "TaskDuration",
  "ScriptDuration",
  "LayoutDuration",
  "RecalcStyleDuration",
  "ThreadTime",
  "V8CompileDuration",
]);

function usage() {
  return `Sticker Forge deterministic Chromium performance benchmark

Usage:
  node tests/performance/benchmark.mjs [options]

Target:
  --url <url>                 Use an already-running app instead of the local fixture.
  --module-url <url>          Embed ESM URL for --url mode (default: /embed/sticker-forge.es.js).
  --bundle <path>             Local embed bundle for fixture mode (default: public/embed/sticker-forge.es.js).
  --chromium <path>           Chromium/Chrome executable (or set CHROMIUM_PATH).
  --headed                    Run a visible browser. Headless Chromium is the default.

Sampling:
  --warmups <count>           Pointer peel warmups (default: ${DEFAULTS.warmups}).
  --runs <count>              Measured pointer peels (default: ${DEFAULTS.runs}).
  --memory-warmups <count>    Create/destroy warmups (default: ${DEFAULTS.memoryWarmups}).
  --memory-cycles <count>     Measured create/destroy cycles (default: ${DEFAULTS.memoryCycles}).
  --pointer-steps <count>     Trusted CDP pointer moves per peel (default: ${DEFAULTS.pointerSteps}).
  --pointer-step-ms <ms>      Target interval between moves (default: ${DEFAULTS.pointerStepMs}).
  --timeout-ms <ms>           Browser/CDP operation timeout (default: ${DEFAULTS.timeoutMs}).

Output:
  --output <path>             Also write the JSON result to this path.
  --no-strict-parity          Do not exit 2 when exact parity checks fail.
  --help                      Show this help.

The benchmark always writes one JSON document to stdout. Diagnostics go to stderr.
`;
}

function parseInteger(name, value, minimum) {
  const parsed = Number(value);
  if (!Number.isInteger(parsed) || parsed < minimum) {
    throw new Error(`${name} must be an integer >= ${minimum}; received ${value}.`);
  }
  return parsed;
}

function parseNumber(name, value, minimum) {
  const parsed = Number(value);
  if (!Number.isFinite(parsed) || parsed < minimum) {
    throw new Error(`${name} must be a number >= ${minimum}; received ${value}.`);
  }
  return parsed;
}

function parseArguments(argv) {
  const options = {
    ...DEFAULTS,
    url: null,
    moduleUrl: null,
    bundle: EMBED_BUNDLE_PATH,
    chromium: process.env.CHROMIUM_PATH || null,
    output: null,
  };
  const requireValue = (index, flag, inlineValue) => {
    if (inlineValue !== undefined) return { value: inlineValue, nextIndex: index };
    const next = argv[index + 1];
    if (!next || next.startsWith("--")) {
      throw new Error(`${flag} requires a value.`);
    }
    return { value: next, nextIndex: index + 1 };
  };

  for (let index = 0; index < argv.length; index += 1) {
    const argument = argv[index];
    const separator = argument.indexOf("=");
    const flag = separator >= 0 ? argument.slice(0, separator) : argument;
    const inlineValue = separator >= 0 ? argument.slice(separator + 1) : undefined;
    if (flag === "--help" || flag === "-h") {
      options.help = true;
      continue;
    }
    if (flag === "--headed") {
      options.headed = true;
      continue;
    }
    if (flag === "--no-strict-parity") {
      options.strictParity = false;
      continue;
    }

    const { value, nextIndex } = requireValue(index, flag, inlineValue);
    index = nextIndex;
    switch (flag) {
      case "--url":
        options.url = new URL(value).href;
        break;
      case "--module-url":
        options.moduleUrl = value;
        break;
      case "--bundle":
        options.bundle = path.resolve(value);
        break;
      case "--chromium":
        options.chromium = path.resolve(value);
        break;
      case "--output":
        options.output = path.resolve(value);
        break;
      case "--warmups":
        options.warmups = parseInteger(flag, value, 0);
        break;
      case "--runs":
        options.runs = parseInteger(flag, value, 1);
        break;
      case "--memory-warmups":
        options.memoryWarmups = parseInteger(flag, value, 0);
        break;
      case "--memory-cycles":
        options.memoryCycles = parseInteger(flag, value, 1);
        break;
      case "--pointer-steps":
        options.pointerSteps = parseInteger(flag, value, 2);
        break;
      case "--pointer-step-ms":
        options.pointerStepMs = parseNumber(flag, value, 0);
        break;
      case "--timeout-ms":
        options.timeoutMs = parseInteger(flag, value, 1_000);
        break;
      default:
        throw new Error(`Unknown option: ${flag}`);
    }
  }
  return options;
}

function percentile(sortedValues, fraction) {
  if (sortedValues.length === 0) return null;
  if (sortedValues.length === 1) return sortedValues[0];
  const index = (sortedValues.length - 1) * fraction;
  const lower = Math.floor(index);
  const upper = Math.ceil(index);
  const weight = index - lower;
  return (
    sortedValues[lower] * (1 - weight) + sortedValues[upper] * weight
  );
}

function summarize(values) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length === 0) {
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
  const sorted = finiteValues.toSorted((left, right) => left - right);
  const mean =
    finiteValues.reduce((total, value) => total + value, 0) /
    finiteValues.length;
  const p50 = percentile(sorted, 0.5);
  const variance =
    finiteValues.reduce((total, value) => total + (value - mean) ** 2, 0) /
    finiteValues.length;
  const standardDeviation = Math.sqrt(variance);
  const absoluteDeviations = finiteValues
    .map((value) => Math.abs(value - p50))
    .toSorted((left, right) => left - right);
  const cv = Math.abs(mean) > Number.EPSILON ? standardDeviation / Math.abs(mean) : null;
  return {
    count: finiteValues.length,
    min: sorted[0],
    max: sorted.at(-1),
    mean,
    p50,
    p95: percentile(sorted, 0.95),
    mad: percentile(absoluteDeviations, 0.5),
    standardDeviation,
    cv,
    cvPercent: cv === null ? null : cv * 100,
  };
}

function linearSlope(values) {
  const finiteValues = values.filter(Number.isFinite);
  if (finiteValues.length < 2) return null;
  const meanX = (finiteValues.length - 1) / 2;
  const meanY =
    finiteValues.reduce((total, value) => total + value, 0) /
    finiteValues.length;
  let numerator = 0;
  let denominator = 0;
  for (let index = 0; index < finiteValues.length; index += 1) {
    numerator += (index - meanX) * (finiteValues[index] - meanY);
    denominator += (index - meanX) ** 2;
  }
  return denominator > 0 ? numerator / denominator : null;
}

function sha256(contents) {
  return createHash("sha256").update(contents).digest("hex");
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

async function resolveChromium(explicitPath) {
  const candidates = [];
  if (explicitPath) candidates.push(explicitPath);
  if (process.platform === "darwin") {
    candidates.push(
      "/Applications/Google Chrome.app/Contents/MacOS/Google Chrome",
      "/Applications/Google Chrome for Testing.app/Contents/MacOS/Google Chrome for Testing",
      "/Applications/Chromium.app/Contents/MacOS/Chromium",
      "/Applications/Microsoft Edge.app/Contents/MacOS/Microsoft Edge",
    );
  }
  const executableNames =
    process.platform === "win32"
      ? ["chrome.exe", "chromium.exe", "msedge.exe"]
      : ["chromium", "chromium-browser", "google-chrome", "google-chrome-stable"];
  for (const directory of (process.env.PATH || "").split(path.delimiter)) {
    if (!directory) continue;
    for (const name of executableNames) candidates.push(path.join(directory, name));
  }
  if (process.platform === "win32") {
    for (const base of [
      process.env.PROGRAMFILES,
      process.env["PROGRAMFILES(X86)"],
      process.env.LOCALAPPDATA,
    ]) {
      if (!base) continue;
      candidates.push(
        path.join(base, "Google/Chrome/Application/chrome.exe"),
        path.join(base, "Chromium/Application/chrome.exe"),
        path.join(base, "Microsoft/Edge/Application/msedge.exe"),
      );
    }
  }
  for (const candidate of [...new Set(candidates)]) {
    if (await isExecutable(candidate)) return candidate;
  }
  throw new Error(
    "Could not find Chromium. Pass --chromium <path> or set CHROMIUM_PATH.",
  );
}

async function startFixtureServer(bundlePath) {
  const sourceMapPath = `${bundlePath}.map`;
  const [fixture, pageRuntime, embedBundle, embedSourceMap] = await Promise.all([
    readFile(FIXTURE_PATH),
    readFile(PAGE_RUNTIME_PATH),
    readFile(bundlePath),
    readFile(sourceMapPath).catch(() => null),
  ]);
  const resources = new Map([
    ["/", { body: fixture, type: "text/html; charset=utf-8" }],
    ["/fixture.html", { body: fixture, type: "text/html; charset=utf-8" }],
    [
      "/performance/page-runtime.js",
      { body: pageRuntime, type: "text/javascript; charset=utf-8" },
    ],
    [
      "/embed/sticker-forge.es.js",
      { body: embedBundle, type: "text/javascript; charset=utf-8" },
    ],
  ]);
  if (embedSourceMap) {
    resources.set("/embed/sticker-forge.es.js.map", {
      body: embedSourceMap,
      type: "application/json; charset=utf-8",
    });
  }

  const server = createServer((request, response) => {
    const pathname = new URL(request.url || "/", "http://localhost").pathname;
    if (pathname === "/favicon.ico") {
      response.writeHead(204);
      response.end();
      return;
    }
    const resource = resources.get(pathname);
    if (!resource) {
      response.writeHead(404, {
        "content-type": "text/plain; charset=utf-8",
        "cache-control": "no-store",
      });
      response.end("Not found");
      return;
    }
    response.writeHead(200, {
      "content-type": resource.type,
      "content-length": resource.body.byteLength,
      "cache-control": "no-store",
      "cross-origin-resource-policy": "same-origin",
    });
    response.end(resource.body);
  });
  await new Promise((resolve, reject) => {
    server.once("error", reject);
    server.listen(0, "127.0.0.1", resolve);
  });
  const address = server.address();
  if (!address || typeof address === "string") {
    throw new Error("The local fixture server did not expose a TCP address.");
  }
  return {
    server,
    url: `http://127.0.0.1:${address.port}/fixture.html`,
    close: () =>
      new Promise((resolve, reject) =>
        server.close((error) => (error ? reject(error) : resolve())),
      ),
  };
}

class CdpConnection {
  constructor(url, timeoutMs) {
    this.url = url;
    this.timeoutMs = timeoutMs;
    this.nextId = 1;
    this.pending = new Map();
    this.listeners = new Set();
    this.socket = null;
  }

  async connect() {
    this.socket = new WebSocket(this.url);
    await new Promise((resolve, reject) => {
      const timeout = setTimeout(
        () => reject(new Error(`Timed out connecting to ${this.url}.`)),
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
          reject(new Error(`Could not connect to ${this.url}.`));
        },
        { once: true },
      );
    });
    this.socket.addEventListener("message", (event) => {
      void this.handleMessage(event.data);
    });
    this.socket.addEventListener("close", () => {
      for (const { reject, timeout } of this.pending.values()) {
        clearTimeout(timeout);
        reject(new Error("The Chromium DevTools connection closed."));
      }
      this.pending.clear();
    });
  }

  async handleMessage(data) {
    let text;
    if (typeof data === "string") {
      text = data;
    } else if (data instanceof ArrayBuffer) {
      text = Buffer.from(data).toString("utf8");
    } else if (typeof Blob !== "undefined" && data instanceof Blob) {
      text = await data.text();
    } else {
      text = Buffer.from(data).toString("utf8");
    }
    const message = JSON.parse(text);
    if (message.id) {
      const pending = this.pending.get(message.id);
      if (!pending) return;
      this.pending.delete(message.id);
      clearTimeout(pending.timeout);
      if (message.error) {
        pending.reject(
          new Error(
            `${pending.method} failed (${message.error.code}): ${message.error.message}`,
          ),
        );
      } else {
        pending.resolve(message.result ?? {});
      }
      return;
    }
    for (const listener of this.listeners) listener(message);
  }

  call(method, params = {}, sessionId = undefined) {
    if (!this.socket || this.socket.readyState !== WebSocket.OPEN) {
      return Promise.reject(new Error("The Chromium DevTools connection is not open."));
    }
    const id = this.nextId;
    this.nextId += 1;
    const message = { id, method, params };
    if (sessionId) message.sessionId = sessionId;
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.pending.delete(id);
        reject(new Error(`${method} timed out after ${this.timeoutMs}ms.`));
      }, this.timeoutMs);
      this.pending.set(id, { resolve, reject, timeout, method });
      this.socket.send(JSON.stringify(message));
    });
  }

  waitFor(method, sessionId = undefined) {
    return new Promise((resolve, reject) => {
      const timeout = setTimeout(() => {
        this.listeners.delete(listener);
        reject(new Error(`${method} event timed out after ${this.timeoutMs}ms.`));
      }, this.timeoutMs);
      const listener = (message) => {
        if (
          message.method !== method ||
          (sessionId && message.sessionId !== sessionId)
        ) {
          return;
        }
        clearTimeout(timeout);
        this.listeners.delete(listener);
        resolve(message.params ?? {});
      };
      this.listeners.add(listener);
    });
  }

  close() {
    this.socket?.close();
  }
}

async function launchChromium(executable, options) {
  const profileDirectory = await mkdtemp(
    path.join(tmpdir(), "sticker-forge-performance-"),
  );
  const argumentsList = [
    options.headed ? null : "--headless=new",
    "--remote-debugging-port=0",
    `--user-data-dir=${profileDirectory}`,
    "--window-size=1440,900",
    "--force-device-scale-factor=1",
    "--force-color-profile=srgb",
    "--disable-background-networking",
    "--disable-background-timer-throttling",
    "--disable-backgrounding-occluded-windows",
    "--disable-breakpad",
    "--disable-component-update",
    "--disable-default-apps",
    "--disable-extensions",
    "--disable-features=Translate,BackForwardCache,MediaRouter",
    "--disable-renderer-backgrounding",
    "--disable-sync",
    "--metrics-recording-only",
    "--mute-audio",
    "--no-default-browser-check",
    "--no-first-run",
    "--password-store=basic",
    "--use-mock-keychain",
    "about:blank",
  ].filter(Boolean);
  if (typeof process.getuid === "function" && process.getuid() === 0) {
    argumentsList.unshift("--no-sandbox");
  }

  const child = spawn(executable, argumentsList, {
    stdio: ["ignore", "ignore", "pipe"],
  });
  let stderr = "";
  let exit = null;
  child.stderr.setEncoding("utf8");
  child.stderr.on("data", (chunk) => {
    stderr = `${stderr}${chunk}`.slice(-100_000);
  });
  child.once("exit", (code, signal) => {
    exit = { code, signal };
  });
  child.once("error", (error) => {
    exit = { error: error.message };
  });

  const activePortPath = path.join(profileDirectory, "DevToolsActivePort");
  const abortLaunch = async (message) => {
    if (!exit) {
      child.kill("SIGTERM");
      const stopDeadline = Date.now() + 1_000;
      while (!exit && Date.now() < stopDeadline) await delay(25);
      if (!exit) child.kill("SIGKILL");
    }
    await rm(profileDirectory, { recursive: true, force: true }).catch(() => {});
    throw new Error(message);
  };
  const deadline = Date.now() + options.timeoutMs;
  let portFile = null;
  while (Date.now() < deadline) {
    if (exit) {
      return abortLaunch(
        `Chromium exited before CDP was ready: ${JSON.stringify(exit)}\n${stderr}`,
      );
    }
    try {
      portFile = await readFile(activePortPath, "utf8");
      if (portFile.trim()) break;
    } catch {
      // Chromium writes DevToolsActivePort after the browser process is ready.
    }
    await delay(50);
  }
  if (!portFile) {
    return abortLaunch(
      `Chromium did not expose CDP within ${options.timeoutMs}ms.\n${stderr}`,
    );
  }
  const [portLine, browserPath] = portFile.trim().split(/\r?\n/);
  const port = Number(portLine);
  if (!Number.isInteger(port) || !browserPath) {
    return abortLaunch(
      `Chromium wrote an invalid DevToolsActivePort file: ${portFile}`,
    );
  }

  async function close() {
    if (!exit) {
      child.kill("SIGTERM");
      const stopDeadline = Date.now() + 2_000;
      while (!exit && Date.now() < stopDeadline) await delay(25);
      if (!exit) child.kill("SIGKILL");
    }
    await rm(profileDirectory, { recursive: true, force: true });
  }

  return {
    child,
    profileDirectory,
    stderr: () => stderr,
    websocketUrl: `ws://127.0.0.1:${port}${browserPath}`,
    arguments: argumentsList,
    close,
  };
}

async function evaluate(cdp, sessionId, expression) {
  const response = await cdp.call(
    "Runtime.evaluate",
    {
      expression,
      awaitPromise: true,
      returnByValue: true,
      userGesture: true,
    },
    sessionId,
  );
  if (response.exceptionDetails) {
    const description =
      response.exceptionDetails.exception?.description ||
      response.exceptionDetails.text ||
      "Unknown page exception";
    throw new Error(`Page evaluation failed: ${description}`);
  }
  return response.result?.value;
}

function pageCall(cdp, sessionId, method, ...args) {
  const encodedArguments = args.map((argument) => JSON.stringify(argument)).join(",");
  return evaluate(
    cdp,
    sessionId,
    `window.__stickerForgePerformance.${method}(${encodedArguments})`,
  );
}

async function getPerformanceMetrics(cdp, sessionId) {
  const response = await cdp.call("Performance.getMetrics", {}, sessionId);
  return Object.fromEntries(
    response.metrics.map(({ name, value }) => [name, value]),
  );
}

function metricDelta(before, after) {
  const delta = {};
  for (const name of PERFORMANCE_METRIC_NAMES) {
    if (!Number.isFinite(before[name]) || !Number.isFinite(after[name])) continue;
    const difference = after[name] - before[name];
    delta[name] = DURATION_METRICS.has(name) ? difference * 1_000 : difference;
  }
  return delta;
}

async function forceGarbageCollection(cdp, sessionId) {
  await cdp.call("HeapProfiler.collectGarbage", {}, sessionId);
  await cdp.call("HeapProfiler.collectGarbage", {}, sessionId);
}

async function collectMemoryPoint(cdp, sessionId, label) {
  await forceGarbageCollection(cdp, sessionId);
  const [domCounters, heapUsage, performanceMetrics, fixture] = await Promise.all([
    cdp.call("Memory.getDOMCounters", {}, sessionId),
    cdp.call("Runtime.getHeapUsage", {}, sessionId),
    getPerformanceMetrics(cdp, sessionId),
    pageCall(cdp, sessionId, "fixtureCounts"),
  ]);
  return {
    label,
    collectedAt: new Date().toISOString(),
    heapUsage,
    domCounters,
    fixture,
    performanceMetrics,
  };
}

async function dispatchMouse(cdp, sessionId, params) {
  await cdp.call(
    "Input.dispatchMouseEvent",
    {
      pointerType: "mouse",
      modifiers: 0,
      ...params,
    },
    sessionId,
  );
}

function pointerCandidates(rect) {
  const point = (xRatio, yRatio, edge) => ({
    x: rect.left + rect.width * xRatio,
    y: rect.top + rect.height * yRatio,
    xRatio,
    yRatio,
    edge,
  });
  return [
    point(0.23, 0.5, "left"),
    point(0.25, 0.5, "left"),
    point(0.27, 0.5, "left"),
    point(0.29, 0.5, "left"),
    point(0.77, 0.5, "right"),
    point(0.75, 0.5, "right"),
    point(0.73, 0.5, "right"),
    point(0.5, 0.23, "top"),
    point(0.5, 0.25, "top"),
    point(0.5, 0.77, "bottom"),
    point(0.5, 0.75, "bottom"),
  ];
}

function pointerEnd(start, rect) {
  switch (start.edge) {
    case "left":
      return { x: rect.left + rect.width * 0.82, y: rect.centerY };
    case "right":
      return { x: rect.left + rect.width * 0.18, y: rect.centerY };
    case "top":
      return { x: rect.centerX, y: rect.top + rect.height * 0.82 };
    default:
      return { x: rect.centerX, y: rect.top + rect.height * 0.18 };
  }
}

async function discoverTrustedPeelStart(cdp, sessionId) {
  const initial = await pageCall(cdp, sessionId, "prepareRun");
  const attempts = [];
  for (const candidate of pointerCandidates(initial.rect)) {
    await pageCall(cdp, sessionId, "prepareRun");
    await pageCall(cdp, sessionId, "beginInteractionCapture");
    await dispatchMouse(cdp, sessionId, {
      type: "mouseMoved",
      x: candidate.x,
      y: candidate.y,
      button: "none",
      buttons: 0,
    });
    await dispatchMouse(cdp, sessionId, {
      type: "mousePressed",
      x: candidate.x,
      y: candidate.y,
      button: "left",
      buttons: 1,
      clickCount: 1,
    });
    const pressedState = await pageCall(cdp, sessionId, "state");
    await dispatchMouse(cdp, sessionId, {
      type: "mouseReleased",
      x: candidate.x,
      y: candidate.y,
      button: "left",
      buttons: 0,
      clickCount: 1,
    });
    const capture = await pageCall(cdp, sessionId, "endInteractionCapture");
    const trustedDown = capture.pointerEvents.some(
      (event) => event.type === "pointerdown" && event.isTrusted,
    );
    const peelStarted = capture.stickerEvents.some(
      (event) => event.type === "peelstart",
    );
    const attempt = {
      candidate,
      draggingAfterPress: pressedState?.dragging === true,
      trustedDown,
      peelStarted,
    };
    attempts.push(attempt);
    if (attempt.draggingAfterPress && trustedDown && peelStarted) {
      await pageCall(cdp, sessionId, "prepareRun");
      return {
        start: candidate,
        end: pointerEnd(candidate, initial.rect),
        rect: initial.rect,
        attempts,
      };
    }
  }
  throw new Error(
    `No trusted pointer candidate hit the sticker contour: ${JSON.stringify(attempts)}`,
  );
}

async function dispatchPeelPath(cdp, sessionId, pathConfig, options) {
  const preludeStartedAt = nodePerformance.now();
  await dispatchMouse(cdp, sessionId, {
    type: "mouseMoved",
    x: pathConfig.start.x,
    y: pathConfig.start.y,
    button: "none",
    buttons: 0,
  });
  await dispatchMouse(cdp, sessionId, {
    type: "mousePressed",
    x: pathConfig.start.x,
    y: pathConfig.start.y,
    button: "left",
    buttons: 1,
    clickCount: 1,
  });
  const dispatchStartedAt = nodePerformance.now();
  const schedule = [];
  const pendingMoves = [];
  for (let step = 1; step <= options.pointerSteps; step += 1) {
    const targetElapsed = step * options.pointerStepMs;
    const remaining = targetElapsed - (nodePerformance.now() - dispatchStartedAt);
    if (remaining > 0) await delay(remaining);
    const progress = step / options.pointerSteps;
    const x =
      pathConfig.start.x +
      (pathConfig.end.x - pathConfig.start.x) * progress;
    const y =
      pathConfig.start.y +
      (pathConfig.end.y - pathConfig.start.y) * progress;
    const beforeDispatch = nodePerformance.now();
    const entry = {
      step,
      targetElapsedMs: targetElapsed,
      dispatchedAtMs: beforeDispatch - dispatchStartedAt,
      acknowledgedAtMs: null,
      scheduleErrorMs: beforeDispatch - dispatchStartedAt - targetElapsed,
      x,
      y,
    };
    schedule.push(entry);
    const pending = dispatchMouse(cdp, sessionId, {
      type: "mouseMoved",
      x,
      y,
      button: "none",
      buttons: 1,
    }).then(() => {
      entry.acknowledgedAtMs = nodePerformance.now() - dispatchStartedAt;
    });
    pendingMoves.push(pending);
  }
  const releaseTarget = (options.pointerSteps + 1) * options.pointerStepMs;
  const releaseRemaining =
    releaseTarget - (nodePerformance.now() - dispatchStartedAt);
  if (releaseRemaining > 0) await delay(releaseRemaining);
  const releaseDispatchedAt = nodePerformance.now();
  const release = dispatchMouse(cdp, sessionId, {
    type: "mouseReleased",
    x: pathConfig.end.x,
    y: pathConfig.end.y,
    button: "left",
    buttons: 0,
    clickCount: 1,
  });
  await Promise.all([...pendingMoves, release]);
  return {
    preludeDurationMs: dispatchStartedAt - preludeStartedAt,
    startedAtMs: dispatchStartedAt,
    durationMs: nodePerformance.now() - dispatchStartedAt,
    releaseTargetElapsedMs: releaseTarget,
    releaseDispatchedAtMs: releaseDispatchedAt - dispatchStartedAt,
    schedule,
  };
}

function summarizeFrames(frameTimes) {
  const summary = summarize(frameTimes);
  return {
    ...summary,
    fpsFromP50: summary.p50 ? 1_000 / summary.p50 : null,
    over20ms: frameTimes.filter((value) => value > 20).length,
    over33_4ms: frameTimes.filter((value) => value > 33.4).length,
    over50ms: frameTimes.filter((value) => value > 50).length,
  };
}

async function measurePeel(cdp, sessionId, pathConfig, options, index, phase) {
  const prepared = await pageCall(cdp, sessionId, "prepareRun");
  await forceGarbageCollection(cdp, sessionId);
  await pageCall(cdp, sessionId, "beginInteractionCapture");
  await pageCall(cdp, sessionId, "startFrameCapture");
  const before = await getPerformanceMetrics(cdp, sessionId);
  const wallStartedAt = nodePerformance.now();
  const dispatch = await dispatchPeelPath(cdp, sessionId, pathConfig, options);
  await pageCall(cdp, sessionId, "waitFrames", 3);
  const wallDurationMs = nodePerformance.now() - wallStartedAt;
  const after = await getPerformanceMetrics(cdp, sessionId);
  const interaction = await pageCall(cdp, sessionId, "endInteractionCapture");
  const frames = await pageCall(cdp, sessionId, "stopFrameCapture");
  const endHash = await pageCall(cdp, sessionId, "hashCurrentCanvas");
  const restored = await pageCall(cdp, sessionId, "restoreFlatAndHash");
  const delta = metricDelta(before, after);
  const intervals = frames?.intervals ?? [];
  return {
    phase,
    index,
    wallDurationMs,
    prepared,
    dispatch,
    performance: {
      before,
      after,
      delta,
      taskUtilization:
        Number.isFinite(delta.TaskDuration) && wallDurationMs > 0
          ? delta.TaskDuration / wallDurationMs
          : null,
    },
    frames: {
      rawIntervalsMs: intervals,
      summary: summarizeFrames(intervals),
    },
    interaction,
    endHash,
    restored,
  };
}

function performanceSummary(samples) {
  const metricSummary = {};
  for (const name of PERFORMANCE_METRIC_NAMES) {
    metricSummary[name] = summarize(
      samples.map((sample) => sample.performance.delta[name]),
    );
  }
  const allFrames = samples.flatMap((sample) => sample.frames.rawIntervalsMs);
  return {
    wallDurationMs: summarize(samples.map((sample) => sample.wallDurationMs)),
    taskUtilization: summarize(
      samples.map((sample) => sample.performance.taskUtilization),
    ),
    metricDeltas: metricSummary,
    frameTimesMs: summarizeFrames(allFrames),
    dispatchScheduleErrorMs: summarize(
      samples.flatMap((sample) =>
        sample.dispatch.schedule.map((entry) => entry.scheduleErrorMs),
      ),
    ),
  };
}

async function measureNoopResize(cdp, sessionId, index, phase) {
  await forceGarbageCollection(cdp, sessionId);
  const before = await getPerformanceMetrics(cdp, sessionId);
  const wallStartedAt = nodePerformance.now();
  const page = await pageCall(
    cdp,
    sessionId,
    "runNoopResizeBatch",
    NOOP_RESIZE_ITERATIONS,
  );
  const wallDurationMs = nodePerformance.now() - wallStartedAt;
  const after = await getPerformanceMetrics(cdp, sessionId);
  return {
    phase,
    index,
    wallDurationMs,
    page,
    performance: {
      before,
      after,
      delta: metricDelta(before, after),
    },
  };
}

function noopResizeSummary(samples) {
  const metricSummary = {};
  for (const name of PERFORMANCE_METRIC_NAMES) {
    metricSummary[name] = summarize(
      samples.map((sample) => sample.performance.delta[name]),
    );
  }
  return {
    pageElapsedMs: summarize(
      samples.map((sample) => sample.page.elapsedMs),
    ),
    wallDurationMs: summarize(
      samples.map((sample) => sample.wallDurationMs),
    ),
    metricDeltas: metricSummary,
  };
}

function memoryValue(point, key) {
  switch (key) {
    case "heapUsedBytes":
      return point.heapUsage.usedSize;
    case "embedderHeapUsedBytes":
      return point.heapUsage.embedderHeapUsedSize;
    case "backingStorageBytes":
      return point.heapUsage.backingStorageSize;
    case "documents":
      return point.domCounters.documents;
    case "nodes":
      return point.domCounters.nodes;
    case "jsEventListeners":
      return point.domCounters.jsEventListeners;
    default:
      return null;
  }
}

function memorySummary(baseline, cycles) {
  const keys = [
    "heapUsedBytes",
    "embedderHeapUsedBytes",
    "backingStorageBytes",
    "documents",
    "nodes",
    "jsEventListeners",
  ];
  const summary = {};
  for (const key of keys) {
    const baselineValue = memoryValue(baseline, key);
    const afterCreate = cycles.map((cycle) => memoryValue(cycle.afterCreate, key));
    const afterDestroy = cycles.map((cycle) => memoryValue(cycle.afterDestroy, key));
    const retainedDeltas = afterDestroy.map((value) => value - baselineValue);
    summary[key] = {
      baseline: baselineValue,
      afterCreate: summarize(afterCreate),
      afterDestroy: summarize(afterDestroy),
      retainedDeltaFromBaseline: summarize(retainedDeltas),
      afterDestroySlopePerCycle: linearSlope(afterDestroy),
      finalMinusBaseline: afterDestroy.at(-1) - baselineValue,
    };
  }
  return summary;
}

function retentionSeriesSummary(baseline, points) {
  const keys = [
    "heapUsedBytes",
    "embedderHeapUsedBytes",
    "backingStorageBytes",
    "documents",
    "nodes",
    "jsEventListeners",
  ];
  const summary = {};
  for (const key of keys) {
    const baselineValue = memoryValue(baseline, key);
    const values = points.map((point) => memoryValue(point, key));
    const retainedDeltas = values.map((value) => value - baselineValue);
    summary[key] = {
      baseline: baselineValue,
      values: summarize(values),
      retainedDeltaFromBaseline: summarize(retainedDeltas),
      slopePerFailure: linearSlope(values),
      finalMinusBaseline: values.at(-1) - baselineValue,
    };
  }
  return summary;
}

function allSame(values) {
  return values.length <= 1 || values.every((value) => value === values[0]);
}

function stateKey(state) {
  if (!state) return null;
  return JSON.stringify({
    ready: state.ready,
    dragging: state.dragging,
    progress: state.progress,
    grabPoint: state.grabPoint,
    pointer: state.pointer,
  });
}

function createParityReport(
  snapshotReplay,
  peeledPublicResize,
  samples,
  memoryCycles,
  noopResize,
  failedCreates,
  failedConstructors,
) {
  const flatHashes = samples.map((sample) => sample.prepared.hash.value);
  const endHashes = samples.map((sample) => sample.endHash.value);
  const restoredHashes = samples.map((sample) => sample.restored.hash.value);
  const endStates = samples.map((sample) => stateKey(sample.interaction.state));
  const pointerEvents = samples.flatMap(
    (sample) => sample.interaction.pointerEvents,
  );
  const sampleChecks = samples.map((sample) => {
    const pointerDown = sample.interaction.pointerEvents.filter(
      (event) => event.type === "pointerdown",
    );
    const pointerUp = sample.interaction.pointerEvents.filter(
      (event) => event.type === "pointerup",
    );
    const peelStart = sample.interaction.stickerEvents.filter(
      (event) => event.type === "peelstart",
    );
    const peelEnd = sample.interaction.stickerEvents.filter(
      (event) => event.type === "peelend",
    );
    return {
      index: sample.index,
      flatRestoredPixelsExact:
        sample.prepared.hash.value === sample.restored.hash.value,
      restoredStateFlat:
        sample.restored.state?.ready === true &&
        sample.restored.state?.dragging === false &&
        sample.restored.state?.progress === 0,
      trustedPointerDown:
        pointerDown.length === 1 && pointerDown[0].isTrusted === true,
      trustedPointerUp:
        pointerUp.length === 1 && pointerUp[0].isTrusted === true,
      allPointerEventsTrusted: sample.interaction.pointerEvents.every(
        (event) => event.isTrusted === true,
      ),
      peelStarted: peelStart.length === 1,
      peelEnded: peelEnd.length === 1,
      madeProgress: sample.interaction.state?.progress > 0,
    };
  });
  const cleanupChecks = memoryCycles.map((cycle) => ({
    index: cycle.index,
    fixtureHosts: cycle.afterDestroy.fixture.fixtureHosts,
    fixtureCanvases: cycle.afterDestroy.fixture.fixtureCanvases,
    controllerPresent: cycle.afterDestroy.fixture.controllerPresent,
    clean:
      cycle.afterDestroy.fixture.fixtureHosts === 0 &&
      cycle.afterDestroy.fixture.fixtureCanvases === 0 &&
      cycle.afterDestroy.fixture.controllerPresent === false,
  }));
  const checks = {
    snapshotReplaySnapshotExact: snapshotReplay.snapshotExact,
    snapshotReplayPixelsExact: snapshotReplay.pixelsExact,
    peeledPublicResizeResetToFlat: peeledPublicResize.resetToFlat,
    peeledPublicResizePixelsExact: peeledPublicResize.flatPixelsExact,
    flatHashesEqualAcrossRuns: allSame(flatHashes),
    endHashesEqualAcrossRuns: allSame(endHashes),
    restoredHashesEqualAcrossRuns: allSame(restoredHashes),
    endStatesEqualAcrossRuns: allSame(endStates),
    noUntrustedPointerEvents: pointerEvents.every(
      (event) => event.isTrusted === true,
    ),
    everySamplePassed:
      sampleChecks.length > 0 &&
      sampleChecks.every((sample) =>
        Object.entries(sample)
          .filter(([key]) => key !== "index")
          .every(([, value]) => value === true),
      ),
    everyDestroyRemovedFixture:
      cleanupChecks.length > 0 && cleanupChecks.every((cycle) => cycle.clean),
    noopResizePixelsExact:
      noopResize.beforeHash.value === noopResize.afterHash.value,
    everyNoopResizePreservedState:
      noopResize.samples.length > 0 &&
      noopResize.samples.every(
        (sample) =>
          sample.page.stateExact &&
          sample.page.snapshotExact &&
          sample.page.canvasSizeExact,
      ),
    everyInvalidSourceRejected:
      failedCreates.rejected === failedCreates.attempted,
    everyInjectedConstructorFailureRejected:
      failedConstructors.rejected === failedConstructors.attempted,
  };
  return {
    pass: Object.values(checks).every((value) => value === true),
    checks,
    sampleChecks,
    cleanupChecks,
    hashes: {
      flat: flatHashes,
      peeled: endHashes,
      restored: restoredHashes,
    },
    endStates,
    snapshotReplay,
    peeledPublicResize,
  };
}

async function run() {
  const options = parseArguments(process.argv.slice(2));
  if (options.help) {
    process.stdout.write(usage());
    return;
  }

  const [pageRuntimeSource, embedBundle] = await Promise.all([
    readFile(PAGE_RUNTIME_PATH, "utf8"),
    readFile(options.bundle),
  ]);
  const chromiumExecutable = await resolveChromium(options.chromium);
  let fixtureServer = null;
  let browser = null;
  let cdp = null;
  let targetId = null;
  let result = null;
  let runError = null;

  try {
    if (!options.url) fixtureServer = await startFixtureServer(options.bundle);
    const targetUrl = options.url || fixtureServer.url;
    const moduleUrl = options.moduleUrl
      ? new URL(options.moduleUrl, targetUrl).href
      : new URL("/embed/sticker-forge.es.js", targetUrl).href;

    process.stderr.write(`Launching ${chromiumExecutable}\n`);
    process.stderr.write(`Benchmark target: ${targetUrl}\n`);
    browser = await launchChromium(chromiumExecutable, options);
    cdp = new CdpConnection(browser.websocketUrl, options.timeoutMs);
    await cdp.connect();

    const [browserVersion, systemInfo] = await Promise.all([
      cdp.call("Browser.getVersion"),
      cdp.call("SystemInfo.getInfo").catch((error) => ({
        unavailable: error.message,
      })),
    ]);
    const target = await cdp.call("Target.createTarget", { url: "about:blank" });
    targetId = target.targetId;
    const attached = await cdp.call("Target.attachToTarget", {
      targetId,
      flatten: true,
    });
    const sessionId = attached.sessionId;

    await Promise.all([
      cdp.call("Page.enable", {}, sessionId),
      cdp.call("Runtime.enable", {}, sessionId),
      cdp.call("Performance.enable", { timeDomain: "timeTicks" }, sessionId),
      cdp.call("HeapProfiler.enable", {}, sessionId),
    ]);
    await cdp.call(
      "Emulation.setDeviceMetricsOverride",
      {
        width: 1440,
        height: 900,
        deviceScaleFactor: 1,
        mobile: false,
        screenWidth: 1440,
        screenHeight: 900,
        screenOrientation: { type: "landscapePrimary", angle: 0 },
      },
      sessionId,
    );
    await cdp.call(
      "Emulation.setEmulatedMedia",
      {
        media: "screen",
        features: [
          { name: "prefers-reduced-motion", value: "no-preference" },
          { name: "prefers-color-scheme", value: "light" },
        ],
      },
      sessionId,
    );

    const loaded = cdp.waitFor("Page.loadEventFired", sessionId);
    await cdp.call("Page.navigate", { url: targetUrl }, sessionId);
    await loaded;
    if (options.url) {
      await evaluate(
        cdp,
        sessionId,
        `${pageRuntimeSource}\n//# sourceURL=sticker-forge-performance-page-runtime.js`,
      );
      await evaluate(
        cdp,
        sessionId,
        `(async () => {
          window.__stickerForgePerformanceReady =
            window.installStickerForgePerformanceHarness(
              await import(${JSON.stringify(moduleUrl)})
            );
          return window.__stickerForgePerformanceReady;
        })()`,
      );
    } else {
      await evaluate(
        cdp,
        sessionId,
        "window.__stickerForgePerformanceReady",
      );
    }

    const viewport = await evaluate(
      cdp,
      sessionId,
      `({
        innerWidth,
        innerHeight,
        outerWidth,
        outerHeight,
        devicePixelRatio,
        userAgent: navigator.userAgent,
        platform: navigator.platform,
        hardwareConcurrency: navigator.hardwareConcurrency,
        crossOriginIsolated,
      })`,
    );
    if (
      viewport.innerWidth !== 1440 ||
      viewport.innerHeight !== 900 ||
      viewport.devicePixelRatio !== 1
    ) {
      throw new Error(
        `The fixed viewport was not applied: ${JSON.stringify(viewport)}`,
      );
    }

    const mounted = await pageCall(cdp, sessionId, "mount");
    process.stderr.write(
      `Mounted ${mounted.canvas.width}x${mounted.canvas.height} WebGL canvas at DPR 1.\n`,
    );
    const pathDiscovery = await discoverTrustedPeelStart(cdp, sessionId);
    process.stderr.write(
      `Trusted contour hit: ${pathDiscovery.start.edge} at (${pathDiscovery.start.x.toFixed(
        1,
      )}, ${pathDiscovery.start.y.toFixed(1)}).\n`,
    );
    const snapshotReplay = await pageCall(
      cdp,
      sessionId,
      "verifySnapshotReplay",
    );
    const peeledPublicResize = await pageCall(
      cdp,
      sessionId,
      "verifyPeeledPublicResize",
    );

    const warmups = [];
    for (let index = 0; index < options.warmups; index += 1) {
      process.stderr.write(`Pointer warmup ${index + 1}/${options.warmups}\r`);
      warmups.push(
        await measurePeel(
          cdp,
          sessionId,
          pathDiscovery,
          options,
          index,
          "warmup",
        ),
      );
    }
    if (options.warmups > 0) process.stderr.write("\n");

    const samples = [];
    for (let index = 0; index < options.runs; index += 1) {
      process.stderr.write(`Measured pointer peel ${index + 1}/${options.runs}\r`);
      samples.push(
        await measurePeel(
          cdp,
          sessionId,
          pathDiscovery,
          options,
          index,
          "measured",
        ),
      );
    }
    process.stderr.write("\n");

    const noopResizeBeforeHash = await pageCall(
      cdp,
      sessionId,
      "hashCurrentCanvas",
    );
    const noopResizeWarmups = [];
    for (let index = 0; index < options.warmups; index += 1) {
      process.stderr.write(
        `No-op resize warmup ${index + 1}/${options.warmups}\r`,
      );
      noopResizeWarmups.push(
        await measureNoopResize(cdp, sessionId, index, "warmup"),
      );
    }
    if (options.warmups > 0) process.stderr.write("\n");
    const noopResizeSamples = [];
    for (let index = 0; index < options.runs; index += 1) {
      process.stderr.write(
        `Measured no-op resize ${index + 1}/${options.runs}\r`,
      );
      noopResizeSamples.push(
        await measureNoopResize(cdp, sessionId, index, "measured"),
      );
    }
    process.stderr.write("\n");
    const noopResizeAfterHash = await pageCall(
      cdp,
      sessionId,
      "hashCurrentCanvas",
    );
    const noopResize = {
      iterationsPerSample: NOOP_RESIZE_ITERATIONS,
      beforeHash: noopResizeBeforeHash,
      afterHash: noopResizeAfterHash,
      warmups: noopResizeWarmups,
      samples: noopResizeSamples,
      summary: noopResizeSummary(noopResizeSamples),
    };

    await pageCall(cdp, sessionId, "destroy");
    for (let index = 0; index < options.memoryWarmups; index += 1) {
      process.stderr.write(
        `Create/destroy warmup ${index + 1}/${options.memoryWarmups}\r`,
      );
      await pageCall(cdp, sessionId, "mount");
      await pageCall(cdp, sessionId, "retainPreparedSourceHandles");
      await forceGarbageCollection(cdp, sessionId);
      await pageCall(cdp, sessionId, "destroyAndRetain");
      await pageCall(cdp, sessionId, "clearRetainedPreparedHandles");
      await forceGarbageCollection(cdp, sessionId);
    }
    if (options.memoryWarmups > 0) process.stderr.write("\n");

    const memoryBaseline = await collectMemoryPoint(
      cdp,
      sessionId,
      "baseline-after-warmups",
    );
    const memoryCycles = [];
    for (let index = 0; index < options.memoryCycles; index += 1) {
      process.stderr.write(
        `Measured create/destroy cycle ${index + 1}/${options.memoryCycles}\r`,
      );
      await pageCall(cdp, sessionId, "mount");
      await pageCall(cdp, sessionId, "retainPreparedSourceHandles");
      const afterCreate = await collectMemoryPoint(
        cdp,
        sessionId,
        `cycle-${index}-after-create`,
      );
      await pageCall(cdp, sessionId, "destroyAndRetain");
      const afterDestroy = await collectMemoryPoint(
        cdp,
        sessionId,
        `cycle-${index}-after-destroy`,
      );
      memoryCycles.push({ index, afterCreate, afterDestroy });
    }
    process.stderr.write("\n");
    await pageCall(cdp, sessionId, "clearRetainedPreparedHandles");
    await forceGarbageCollection(cdp, sessionId);

    for (let index = 0; index < options.memoryWarmups; index += 1) {
      process.stderr.write(
        `Failed-create warmup ${index + 1}/${options.memoryWarmups}\r`,
      );
      await pageCall(cdp, sessionId, "runFailedCreateBatch", 1);
      await forceGarbageCollection(cdp, sessionId);
    }
    if (options.memoryWarmups > 0) process.stderr.write("\n");
    const failedCreateBaseline = await collectMemoryPoint(
      cdp,
      sessionId,
      "failed-create-baseline-after-warmups",
    );
    const failedCreatePoints = [];
    let failedCreateRejected = 0;
    for (let index = 0; index < options.memoryCycles; index += 1) {
      process.stderr.write(
        `Measured failed create ${index + 1}/${options.memoryCycles}\r`,
      );
      const operation = await pageCall(
        cdp,
        sessionId,
        "runFailedCreateBatch",
        1,
      );
      failedCreateRejected += operation.rejected;
      failedCreatePoints.push(
        await collectMemoryPoint(
          cdp,
          sessionId,
          `failed-create-${index}`,
        ),
      );
    }
    process.stderr.write("\n");
    const failedCreates = {
      attempted: options.memoryCycles,
      rejected: failedCreateRejected,
      baseline: failedCreateBaseline,
      points: failedCreatePoints,
      summary: retentionSeriesSummary(
        failedCreateBaseline,
        failedCreatePoints,
      ),
    };

    for (let index = 0; index < options.memoryWarmups; index += 1) {
      process.stderr.write(
        `Constructor-failure warmup ${index + 1}/${options.memoryWarmups}\r`,
      );
      await pageCall(cdp, sessionId, "runFailedConstructorBatch", 1);
      await forceGarbageCollection(cdp, sessionId);
    }
    if (options.memoryWarmups > 0) process.stderr.write("\n");
    const failedConstructorBaseline = await collectMemoryPoint(
      cdp,
      sessionId,
      "constructor-failure-baseline-after-warmups",
    );
    const failedConstructorPoints = [];
    let failedConstructorRejected = 0;
    for (let index = 0; index < options.memoryCycles; index += 1) {
      process.stderr.write(
        `Measured constructor failure ${index + 1}/${options.memoryCycles}\r`,
      );
      const operation = await pageCall(
        cdp,
        sessionId,
        "runFailedConstructorBatch",
        1,
      );
      failedConstructorRejected += operation.rejected;
      failedConstructorPoints.push(
        await collectMemoryPoint(
          cdp,
          sessionId,
          `constructor-failure-${index}`,
        ),
      );
    }
    process.stderr.write("\n");
    const failedConstructors = {
      attempted: options.memoryCycles,
      rejected: failedConstructorRejected,
      baseline: failedConstructorBaseline,
      points: failedConstructorPoints,
      summary: retentionSeriesSummary(
        failedConstructorBaseline,
        failedConstructorPoints,
      ),
    };

    const parity = createParityReport(
      snapshotReplay,
      peeledPublicResize,
      samples,
      memoryCycles,
      noopResize,
      failedCreates,
      failedConstructors,
    );
    const gpu = systemInfo.gpu
      ? {
          devices: systemInfo.gpu.devices,
          auxAttributes: systemInfo.gpu.auxAttributes,
          driverBugWorkarounds: systemInfo.gpu.driverBugWorkarounds,
          featureStatus: systemInfo.gpu.featureStatus,
        }
      : systemInfo;
    result = {
      schemaVersion: 1,
      generatedAt: new Date().toISOString(),
      benchmark: {
        name: "sticker-forge-cdp-performance",
        description:
          "Trusted pointer peel CPU/frame timing and forced-GC create/destroy retention.",
        methodology: {
          viewport: { width: 1440, height: 900, deviceScaleFactor: 1 },
          pointerInput:
            "Input.dispatchMouseEvent over CDP; page verifies isTrusted and peelstart/peelend.",
          cpu:
            "Performance.getMetrics deltas; duration values are converted from seconds to milliseconds.",
          frames:
            "requestAnimationFrame timestamp deltas bracket the trusted pointer peel.",
          memory:
            "Two forced-GC passes bracket create/destroy snapshots; consumed and pending PreparedStickerSource handles are intentionally retained across measured cycles.",
          statistics:
            "Linear-interpolated p50/p95, median absolute deviation, population standard deviation, and CV=sd/abs(mean).",
        },
      },
      configuration: {
        mode: options.url ? "running-app" : "self-served-embed",
        targetUrl,
        moduleUrl,
        warmups: options.warmups,
        runs: options.runs,
        memoryWarmups: options.memoryWarmups,
        memoryCycles: options.memoryCycles,
        pointerSteps: options.pointerSteps,
        pointerStepMs: options.pointerStepMs,
        strictParity: options.strictParity,
      },
      environment: {
        node: process.version,
        platform: process.platform,
        architecture: process.arch,
        chromiumExecutable,
        browserVersion,
        viewport,
        gpu,
        chromiumArguments: browser.arguments.filter(
          (argument) => !argument.startsWith("--user-data-dir="),
        ),
      },
      sources: {
        embedBundle: {
          path: path.relative(REPOSITORY_ROOT, options.bundle),
          bytes: embedBundle.byteLength,
          sha256: sha256(embedBundle),
        },
        pageRuntime: {
          path: path.relative(REPOSITORY_ROOT, PAGE_RUNTIME_PATH),
          bytes: Buffer.byteLength(pageRuntimeSource),
          sha256: sha256(pageRuntimeSource),
        },
      },
      trustedPathDiscovery: pathDiscovery,
      rendering: {
        mounted,
        snapshotReplay,
        peeledPublicResize,
      },
      performance: {
        warmups,
        samples,
        summary: performanceSummary(samples),
        noopResize,
      },
      memory: {
        baseline: memoryBaseline,
        cycles: memoryCycles,
        summary: memorySummary(memoryBaseline, memoryCycles),
        failedCreates,
        failedConstructors,
      },
      parity,
    };
  } catch (error) {
    runError = error;
  } finally {
    if (cdp && targetId) {
      await cdp.call("Target.closeTarget", { targetId }).catch(() => {});
    }
    cdp?.close();
    if (browser) await browser.close().catch(() => {});
    if (fixtureServer) await fixtureServer.close().catch(() => {});
  }

  if (runError) throw runError;
  const output = `${JSON.stringify(result, null, 2)}\n`;
  if (options.output) await writeFile(options.output, output);
  process.stdout.write(output);
  if (options.strictParity && !result.parity.pass) process.exitCode = 2;
}

run().catch((error) => {
  process.stderr.write(`${error.stack || error.message}\n`);
  process.exitCode = 1;
});
