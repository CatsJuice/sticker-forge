import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { mkdtemp, readFile, rm } from "node:fs/promises";
import { tmpdir } from "node:os";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { promisify } from "node:util";
import test from "node:test";

const run = promisify(execFile);
const repositoryRoot = path.resolve(
  path.dirname(fileURLToPath(import.meta.url)),
  "..",
);
const esbuild = path.join(repositoryRoot, "node_modules", ".bin", "esbuild");
const bundleDirectory = await mkdtemp(
  path.join(tmpdir(), "sticker-forge-memory-tests-"),
);

async function bundle(entry, output, extraArguments = []) {
  await run(
    esbuild,
    [
      entry,
      "--bundle",
      "--platform=node",
      "--format=esm",
      `--outfile=${path.join(bundleDirectory, output)}`,
      ...extraArguments,
    ],
    { cwd: repositoryRoot },
  );
}

await Promise.all([
  bundle("lib/background-removal.ts", "background-removal.mjs"),
  bundle("lib/export-worker-client.ts", "export-worker-client.mjs"),
  bundle("lib/gallery-storage.ts", "gallery-storage.mjs"),
  bundle("lib/peel-audio.ts", "peel-audio.mjs", [
    "--loader:.mp3=dataurl",
    "--loader:.wav=dataurl",
  ]),
]);

test.after(async () => {
  await rm(bundleDirectory, { recursive: true, force: true });
});

async function runIsolated(script) {
  const { stdout } = await run(
    process.execPath,
    ["--input-type=module", "--eval", script],
    { cwd: repositoryRoot },
  );
  return JSON.parse(stdout.trim().split("\n").at(-1));
}

function bundleUrl(name) {
  return pathToFileURL(path.join(bundleDirectory, name)).href;
}

test("cleans every failed background-removal request and idle worker", async (t) => {
  const result = await runIsolated(`
    const NativeMap = globalThis.Map;
    const maps = [];
    globalThis.Map = class InstrumentedMap extends NativeMap {
      constructor(...args) {
        super(...args);
        this.setCalls = 0;
        this.deleteCalls = 0;
        maps.push(this);
      }
      set(key, value) {
        this.setCalls += 1;
        return super.set(key, value);
      }
      delete(key) {
        this.deleteCalls += 1;
        return super.delete(key);
      }
    };
    globalThis.Image = class FakeImage {
      set src(value) {
        this.naturalWidth = 8;
        this.naturalHeight = 8;
        queueMicrotask(() => this.onload?.());
      }
    };
    globalThis.document = {
      createElement() {
        return {
          width: 0,
          height: 0,
          getContext() {
            return { drawImage() {} };
          },
          toBlob(callback) {
            callback(new Blob([new Uint8Array(1024)], { type: "image/png" }));
          },
        };
      },
    };
    globalThis.window = { setTimeout };

    let constructorFailures = 0;
    globalThis.Worker = class ConstructorFailureWorker {
      constructor() {
        constructorFailures += 1;
        throw new DOMException("blocked", "SecurityError");
      }
    };
    const { removeImageBackground } = await import(
      ${JSON.stringify(bundleUrl("background-removal.mjs"))}
    );
    let rejected = 0;
    for (let index = 0; index < 25; index += 1) {
      await removeImageBackground("fixed-source").catch(() => {
        rejected += 1;
      });
    }

    let postWorkers = 0;
    let terminatedWorkers = 0;
    globalThis.Worker = class PostFailureWorker {
      constructor() {
        postWorkers += 1;
      }
      addEventListener() {}
      postMessage() {
        throw new DOMException("clone failed", "DataCloneError");
      }
      terminate() {
        terminatedWorkers += 1;
      }
    };
    for (let index = 0; index < 25; index += 1) {
      await removeImageBackground("fixed-source").catch(() => {
        rejected += 1;
      });
    }

    let retryWorkers = 0;
    let retryTerminated = 0;
    globalThis.Worker = class RetryInitializationFailureWorker {
      constructor() {
        retryWorkers += 1;
      }
      addEventListener(type, listener) {
        if (retryWorkers === 2) {
          throw new DOMException("listener blocked", "SecurityError");
        }
        if (type === "error") this.errorListener = listener;
      }
      postMessage() {
        queueMicrotask(() => {
          this.errorListener?.({
            error: new Error("retry"),
            message: "retry",
            filename: "",
            lineno: 0,
            colno: 0,
          });
        });
      }
      terminate() {
        retryTerminated += 1;
      }
    };
    await removeImageBackground("fixed-source").catch(() => {
      rejected += 1;
    });

    const pending = maps.find((map) => map.setCalls === 51);
    console.log(JSON.stringify({
      operations: 51,
      rejected,
      constructorFailures,
      postWorkers,
      terminatedWorkers,
      retryWorkers,
      retryTerminated,
      pendingSize: pending?.size,
      pendingSets: pending?.setCalls,
      pendingDeletes: pending?.deleteCalls,
    }));
  `);

  assert.deepEqual(result, {
    operations: 51,
    rejected: 51,
    constructorFailures: 25,
    postWorkers: 25,
    terminatedWorkers: 25,
    retryWorkers: 2,
    retryTerminated: 2,
    pendingSize: 0,
    pendingSets: 51,
    pendingDeletes: 51,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("does not replay rejected background-removal requests across worker races", async (t) => {
  const result = await runIsolated(`
    const NativeMap = globalThis.Map;
    const maps = [];
    globalThis.Map = class InstrumentedMap extends NativeMap {
      constructor(...args) {
        super(...args);
        maps.push(this);
      }
    };
    globalThis.Image = class FakeImage {
      set src(value) {
        this.naturalWidth = 8;
        this.naturalHeight = 8;
        queueMicrotask(() => this.onload?.());
      }
    };
    globalThis.document = {
      createElement() {
        return {
          width: 0,
          height: 0,
          getContext() {
            return { drawImage() {} };
          },
          toBlob(callback) {
            callback(new Blob([new Uint8Array(1024)], { type: "image/png" }));
          },
        };
      },
    };
    const timers = [];
    globalThis.window = {
      setTimeout(callback) {
        timers.push(callback);
        return timers.length;
      },
    };
    const workers = [];
    globalThis.Worker = class RacingWorker {
      constructor() {
        this.posts = [];
        this.terminated = 0;
        this.listeners = {};
        workers.push(this);
      }
      addEventListener(type, listener) {
        this.listeners[type] = listener;
      }
      postMessage(message) {
        this.posts.push(message.id);
      }
      terminate() {
        this.terminated += 1;
      }
      fail(label) {
        this.listeners.error?.({
          error: new Error(label),
          message: label,
          filename: "",
          lineno: 0,
          colno: 0,
        });
      }
    };
    const { removeImageBackground } = await import(
      ${JSON.stringify(bundleUrl("background-removal.mjs"))}
    );
    const turn = () => new Promise((resolve) => setImmediate(resolve));
    let firstProgress = 0;
    let secondProgress = 0;
    const first = removeImageBackground("first", () => {
      firstProgress += 1;
    }).then(() => "resolved", () => "rejected");
    await turn();
    workers[0].fail("first failure");

    const second = removeImageBackground("second", () => {
      secondProgress += 1;
    }).then(() => "resolved", () => "rejected");
    await turn();
    workers[0].fail("stale first-worker event");
    workers[1].fail("second failure");
    await turn();

    const workersBeforeFirstTimer = workers.length;
    timers.shift()();
    const workersAfterStaleTimer = workers.length;
    timers.shift()();
    const workersAfterCurrentTimer = workers.length;
    workers[2].fail("final failure");
    await turn();

    const pending = maps.find((map) => map.size === 0);
    console.log(JSON.stringify({
      outcomes: [await first, await second],
      posts: workers.map((entry) => entry.posts),
      terminations: workers.map((entry) => entry.terminated),
      firstProgress,
      secondProgress,
      workersBeforeFirstTimer,
      workersAfterStaleTimer,
      workersAfterCurrentTimer,
      pendingSize: pending?.size,
      remainingTimers: timers.length,
    }));
  `);

  assert.deepEqual(result, {
    outcomes: ["rejected", "rejected"],
    posts: [[1], [2], [2]],
    terminations: [2, 1, 1],
    firstProgress: 0,
    secondProgress: 1,
    workersBeforeFirstTimer: 2,
    workersAfterStaleTimer: 2,
    workersAfterCurrentTimer: 3,
    pendingSize: 0,
    remainingTimers: 0,
  });
  t.diagnostic(`race-after ${JSON.stringify(result)}`);
});

test("terminates every export worker whose initial postMessage fails", async (t) => {
  const result = await runIsolated(`
    let created = 0;
    let terminated = 0;
    globalThis.Worker = class FailingWorker {
      constructor() {
        created += 1;
      }
      postMessage(message, transfer) {
        structuredClone(message, { transfer });
      }
      terminate() {
        terminated += 1;
      }
    };
    const { startStickerExportWorker } = await import(
      ${JSON.stringify(bundleUrl("export-worker-client.mjs"))}
    );
    let rejected = 0;
    for (let index = 0; index < 25; index += 1) {
      const shared = new ArrayBuffer(8);
      const task = startStickerExportWorker({
        id: String(index),
        format: "gif",
        frames: [
          {
            rgba: new Uint8ClampedArray(shared, 0, 4),
            width: 1,
            height: 1,
            durationMs: 16,
          },
          {
            rgba: new Uint8ClampedArray(shared, 4, 4),
            width: 1,
            height: 1,
            durationMs: 16,
          },
        ],
        frameRate: 30,
        playbackInterval: 0,
        outputScale: 1,
        gifShadow: true,
      }, () => {});
      await task.promise.catch(() => {
        rejected += 1;
      });
    }
    console.log(JSON.stringify({
      operations: 25,
      rejected,
      created,
      terminated,
      outstanding: created - terminated,
    }));
  `);

  assert.deepEqual(result, {
    operations: 25,
    rejected: 25,
    created: 25,
    terminated: 25,
    outstanding: 0,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("bounds released gallery preview URLs while retaining active leases", async (t) => {
  const result = await runIsolated(`
    let created = 0;
    let revoked = 0;
    const live = new Set();
    URL.createObjectURL = () => {
      const url = "blob:preview-" + (++created);
      live.add(url);
      return url;
    };
    URL.revokeObjectURL = (url) => {
      if (live.delete(url)) revoked += 1;
    };
    let delayReads = false;
    const delayedReads = [];

    const database = {
      onversionchange: null,
      close() {},
      transaction(_stores, mode) {
        const transaction = {
          oncomplete: null,
          onabort: null,
          onerror: null,
          error: null,
          objectStore() {
            return {
              delete() {},
              get(id) {
                const request = {
                  result: undefined,
                  error: null,
                  onsuccess: null,
                  onerror: null,
                };
                const complete = () => {
                  request.result = { id, blob: new Blob([id]) };
                  request.onsuccess?.();
                  queueMicrotask(() => transaction.oncomplete?.());
                };
                if (delayReads) delayedReads.push(complete);
                else queueMicrotask(complete);
                return request;
              },
            };
          },
        };
        if (mode === "readwrite") {
          queueMicrotask(() => transaction.oncomplete?.());
        }
        return transaction;
      },
    };
    globalThis.indexedDB = {
      open() {
        const request = {
          result: database,
          transaction: null,
          error: null,
          onsuccess: null,
          onerror: null,
          onblocked: null,
          onupgradeneeded: null,
        };
        queueMicrotask(() => request.onsuccess?.());
        return request;
      },
    };

    const {
      acquireGalleryPreviewUrl,
      deleteGalleryItem,
    } = await import(
      ${JSON.stringify(bundleUrl("gallery-storage.mjs"))}
    );
    for (let index = 0; index < 40; index += 1) {
      const lease = await acquireGalleryPreviewUrl("preview-" + index);
      lease.release();
    }

    const sharedA = await acquireGalleryPreviewUrl("preview-39");
    const sharedB = await acquireGalleryPreviewUrl("preview-39");
    sharedA.release();
    sharedA.release();
    sharedB.release();

    const active = await acquireGalleryPreviewUrl("active");
    const activeUrl = active.url;
    for (let index = 0; index < 30; index += 1) {
      const lease = await acquireGalleryPreviewUrl("churn-" + index);
      lease.release();
    }
    const activeSurvivedPressure = live.has(activeUrl);
    active.release();

    const latePromise = acquireGalleryPreviewUrl("late");
    const cancelled = true;
    const lateLease = await latePromise;
    if (cancelled) lateLease.release();
    lateLease.release();

    const activeDelete = await acquireGalleryPreviewUrl("active-delete");
    const activeDeleteUrl = activeDelete.url;
    await deleteGalleryItem("active-delete");
    const activeDeleteSurvivedUntilRelease = live.has(activeDeleteUrl);
    activeDelete.release();
    const activeDeleteRevokedAfterRelease = !live.has(activeDeleteUrl);

    delayReads = true;
    const inFlightDelete = acquireGalleryPreviewUrl("inflight-delete");
    await new Promise((resolve) => setImmediate(resolve));
    await deleteGalleryItem("inflight-delete");
    delayedReads.shift()?.();
    const inFlightDeleteRejected = await inFlightDelete.then(
      () => false,
      () => true,
    );
    const inFlightDeleteLeaked = [...live].some((url) =>
      url.includes("preview-74"),
    );

    console.log(JSON.stringify({
      operations: 74,
      created,
      revoked,
      outstanding: live.size,
      activeSurvivedPressure,
      activeDeleteSurvivedUntilRelease,
      activeDeleteRevokedAfterRelease,
      inFlightDeleteRejected,
      inFlightDeleteLeaked,
    }));
  `);

  assert.deepEqual(result, {
    operations: 74,
    created: 74,
    revoked: 50,
    outstanding: 24,
    activeSurvivedPressure: true,
    activeDeleteSurvivedUntilRelease: true,
    activeDeleteRevokedAfterRelease: true,
    inFlightDeleteRejected: true,
    inFlightDeleteLeaked: false,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("bounds zero-reference custom audio while pinning built-in buffers", async (t) => {
  const result = await runIsolated(`
    const NativeMap = globalThis.Map;
    const maps = [];
    globalThis.Map = class InstrumentedMap extends NativeMap {
      constructor(...args) {
        super(...args);
        maps.push(this);
      }
    };
    let fetches = 0;
    let decodes = 0;
    class FakeAudioContext {
      constructor() {
        this.state = "running";
        this.currentTime = 0;
        this.sampleRate = 48_000;
      }
      decodeAudioData() {
        decodes += 1;
        return Promise.resolve({ duration: 1 });
      }
    }
    globalThis.window = {
      AudioContext: FakeAudioContext,
      setTimeout,
      clearTimeout,
    };
    globalThis.fetch = async () => {
      fetches += 1;
      return {
        ok: true,
        status: 200,
        arrayBuffer: async () => new ArrayBuffer(16),
      };
    };
    const {
      DEFAULT_PEEL_SOUND_URL,
      PeelAudioEngine,
    } = await import(${JSON.stringify(bundleUrl("peel-audio.mjs"))});
    const settle = () => new Promise((resolve) => setImmediate(resolve));

    const builtIn = new PeelAudioEngine();
    builtIn.configure({
      enabled: true,
      src: DEFAULT_PEEL_SOUND_URL,
      volume: 0.7,
      useBuiltInProfile: true,
    });
    await settle();
    builtIn.destroy();

    for (let index = 0; index < 25; index += 1) {
      const engine = new PeelAudioEngine();
      engine.configure({
        enabled: true,
        src: "custom-" + index + ".wav",
        volume: 0.7,
      });
      await settle();
      engine.destroy();
    }

    const decodedCache = maps.find((map) =>
      [...map.values()].some(
        (value) =>
          value &&
          typeof value === "object" &&
          "promise" in value &&
          "references" in value &&
          "pinned" in value,
      ),
    );
    const activeA = new PeelAudioEngine();
    const activeB = new PeelAudioEngine();
    activeA.configure({ enabled: true, src: "active.wav", volume: 0.7 });
    activeB.configure({ enabled: true, src: "active.wav", volume: 0.7 });
    await settle();
    const sharedReferencesBeforeRelease =
      decodedCache?.get("active.wav")?.references;
    activeA.destroy();
    for (let index = 0; index < 20; index += 1) {
      const engine = new PeelAudioEngine();
      engine.configure({
        enabled: true,
        src: "churn-" + index + ".wav",
        volume: 0.7,
      });
      await settle();
      engine.destroy();
    }

    const activeEntry = decodedCache?.get("active.wav");
    const activeReferencesUnderPressure = activeEntry?.references;
    const sizeWithActiveLease = decodedCache?.size;
    activeB.destroy();

    const fetchesBeforeCachedReuse = fetches;
    const cachedReuse = new PeelAudioEngine();
    cachedReuse.configure({
      enabled: true,
      src: "churn-19.wav",
      volume: 0.7,
    });
    await settle();
    cachedReuse.destroy();
    const cachedReuseFetches = fetches - fetchesBeforeCachedReuse;

    const fetchesBeforeEvictedReuse = fetches;
    const evictedReuse = new PeelAudioEngine();
    evictedReuse.configure({
      enabled: true,
      src: "custom-0.wav",
      volume: 0.7,
    });
    await settle();
    evictedReuse.destroy();
    const evictedReuseFetches = fetches - fetchesBeforeEvictedReuse;

    const entries = [...decodedCache.values()];
    console.log(JSON.stringify({
      operations: 50,
      fetches,
      decodes,
      sizeWithActiveLease,
      sharedReferencesBeforeRelease,
      activeReferencesUnderPressure,
      finalCacheSize: decodedCache.size,
      pinnedEntries: entries.filter((entry) => entry.pinned).length,
      customEntries: entries.filter((entry) => !entry.pinned).length,
      positiveReferences: entries.filter((entry) => entry.references > 0).length,
      cachedReuseFetches,
      evictedReuseFetches,
    }));
  `);

  assert.deepEqual(result, {
    operations: 50,
    fetches: 49,
    decodes: 49,
    sizeWithActiveLease: 11,
    sharedReferencesBeforeRelease: 2,
    activeReferencesUnderPressure: 1,
    finalCacheSize: 10,
    pinnedEntries: 2,
    customEntries: 8,
    positiveReferences: 0,
    cachedReuseFetches: 0,
    evictedReuseFetches: 1,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("aborts evicted custom audio loads before decoding", async (t) => {
  const result = await runIsolated(`
    let started = 0;
    let aborted = 0;
    let decodes = 0;
    class FakeAudioContext {
      constructor() {
        this.state = "running";
        this.currentTime = 0;
        this.sampleRate = 48_000;
      }
      decodeAudioData() {
        decodes += 1;
        return Promise.resolve({ duration: 1 });
      }
    }
    globalThis.window = {
      AudioContext: FakeAudioContext,
      setTimeout,
      clearTimeout,
    };
    globalThis.fetch = (_src, options = {}) => {
      started += 1;
      return new Promise((_resolve, reject) => {
        options.signal?.addEventListener("abort", () => {
          aborted += 1;
          reject(new DOMException("aborted", "AbortError"));
        }, { once: true });
      });
    };
    const { PeelAudioEngine } = await import(
      ${JSON.stringify(bundleUrl("peel-audio.mjs"))}
    );
    for (let index = 0; index < 30; index += 1) {
      const engine = new PeelAudioEngine();
      engine.configure({
        enabled: true,
        src: "pending-" + index + ".wav",
        volume: 0.7,
      });
      engine.destroy();
    }
    await new Promise((resolve) => setImmediate(resolve));
    console.log(JSON.stringify({
      customLoads: 30,
      started,
      aborted,
      outstanding: started - aborted,
      decodes,
    }));
  `);

  assert.deepEqual(result, {
    customLoads: 30,
    started: 31,
    aborted: 22,
    outstanding: 9,
    decodes: 0,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("caps native audio decodes and prunes evicted queued jobs", async (t) => {
  const result = await runIsolated(`
    let fetches = 0;
    let activeDecodes = 0;
    let maximumConcurrentDecodes = 0;
    const decodeJobs = [];
    class FakeAudioContext {
      constructor() {
        this.state = "running";
        this.currentTime = 0;
        this.sampleRate = 48_000;
      }
      decodeAudioData(encoded) {
        const marker = new Uint8Array(encoded)[0];
        activeDecodes += 1;
        maximumConcurrentDecodes = Math.max(
          maximumConcurrentDecodes,
          activeDecodes,
        );
        return new Promise((resolve) => {
          decodeJobs.push({
            marker,
            finish() {
              activeDecodes -= 1;
              resolve({ duration: 1 });
            },
          });
        });
      }
    }
    globalThis.window = {
      AudioContext: FakeAudioContext,
      setTimeout,
      clearTimeout,
    };
    globalThis.fetch = async (src) => {
      fetches += 1;
      const match = /decode-(\\d+)\\.wav/.exec(String(src));
      const marker = match ? Number(match[1]) : 255;
      return {
        ok: true,
        status: 200,
        arrayBuffer: async () => Uint8Array.of(marker).buffer,
      };
    };
    const { PeelAudioEngine } = await import(
      ${JSON.stringify(bundleUrl("peel-audio.mjs"))}
    );
    const settle = async () => {
      await new Promise((resolve) => setImmediate(resolve));
      await Promise.resolve();
    };

    let retainedEngine = null;
    for (let index = 0; index < 30; index += 1) {
      const engine = new PeelAudioEngine();
      engine.configure({
        enabled: true,
        src: "decode-" + index + ".wav",
        volume: 0.7,
      });
      await settle();
      if (index === 29) retainedEngine = engine;
      else engine.destroy();
    }

    const decodesBeforeDrain = decodeJobs.length;
    let completedDecodes = 0;
    while (activeDecodes > 0) {
      const job = decodeJobs[completedDecodes];
      if (!job) throw new Error("The decode queue stopped making progress.");
      completedDecodes += 1;
      job.finish();
      await settle();
    }
    retainedEngine.destroy();
    await settle();

    const decodedMarkers = decodeJobs
      .map((job) => job.marker)
      .sort((left, right) => left - right);
    console.log(JSON.stringify({
      customLoads: 30,
      fetches,
      decodesBeforeDrain,
      completedDecodes,
      maximumConcurrentDecodes,
      activeAfterDrain: activeDecodes,
      decodedMarkers,
      retainedSoundDecoded: decodedMarkers.includes(29),
      cachedQueuedSoundsDecoded: Array.from(
        { length: 8 },
        (_, index) => index + 21,
      ).every((marker) => decodedMarkers.includes(marker)),
      evictedQueuedSoundsSkipped: Array.from(
        { length: 20 },
        (_, index) => index + 1,
      ).every((marker) => !decodedMarkers.includes(marker)),
    }));
  `);

  assert.deepEqual(result, {
    customLoads: 30,
    fetches: 31,
    decodesBeforeDrain: 2,
    completedDecodes: 11,
    maximumConcurrentDecodes: 2,
    activeAfterDrain: 0,
    decodedMarkers: [0, 21, 22, 23, 24, 25, 26, 27, 28, 29, 255],
    retainedSoundDecoded: true,
    cachedQueuedSoundsDecoded: true,
    evictedQueuedSoundsSkipped: true,
  });
  t.diagnostic(`memory-after ${JSON.stringify(result)}`);
});

test("releases preview leases after late React resolution and Three decoding", async () => {
  const [imageComponent, galleryRenderer] = await Promise.all([
    readFile(
      path.join(repositoryRoot, "app", "GalleryPreviewImage.tsx"),
      "utf8",
    ),
    readFile(path.join(repositoryRoot, "lib", "gallery-renderer.ts"), "utf8"),
  ]);

  assert.match(
    imageComponent,
    /if \(cancelled\) \{\s*acquiredLease\.release\(\);\s*return;/,
  );
  assert.match(
    imageComponent,
    /return \(\) => \{\s*cancelled = true;\s*lease\?\.release\(\);/,
  );
  assert.match(
    galleryRenderer,
    /finally \{\s*lease\?\.release\(\);\s*\}/,
  );
});

test("severs prepared handles and dense geometry on renderer destruction", async () => {
  const renderer = await readFile(
    path.join(repositoryRoot, "lib", "sticker-forge.ts"),
    "utf8",
  );

  assert.match(renderer, /function createPreparedSourceHandle\(/);
  assert.match(renderer, /function createStickerInstanceHandle\(/);
  assert.match(
    renderer,
    /finally \{\s*\/\/ The public handle can outlive destroy\(\),[\s\S]*?this\.renderer = null;/,
  );
  assert.match(
    renderer,
    /return createStickerInstanceHandle\(renderer\);/,
  );
  assert.match(
    renderer,
    /resize = \(\): void => \{\s*this\.renderer\?\.resize\(\);\s*\};/,
  );
  assert.match(
    renderer,
    /private readonly preparedSourceStates =\s*new Set<PreparedSourceHandleState>/,
  );
  assert.match(
    renderer,
    /for \(const state of this\.preparedSourceStates\) \{\s*const \{ payload \} = takePreparedSourceState\(state\);\s*payload\?\.texture\.dispose\(\);/,
  );
  assert.match(
    renderer,
    /try \{\s*this\.renderer\.initTexture\(texture\);\s*\} catch \(error\) \{\s*texture\.dispose\(\);\s*throw error;/,
  );
  assert.match(
    renderer,
    /for \(const name of Object\.keys\(this\.geometry\.attributes\)\) \{\s*this\.geometry\.deleteAttribute\(name\);/,
  );
  assert.match(renderer, /this\.geometry\.setIndex\(null\)/);
  assert.doesNotMatch(
    renderer,
    /return \{\s*commit: \(\) =>[\s\S]*?this\.destroyed/,
  );
});
