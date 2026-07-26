(function installPageRuntime(global) {
  "use strict";

  const FIXTURE_ROOT_ID = "sticker-forge-performance-root";
  const FIXTURE_STYLE_ID = "sticker-forge-performance-style";
  const FIXTURE_SVG = [
    '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512">',
    '<defs><linearGradient id="g" x1="0" y1="0" x2="1" y2="1">',
    '<stop offset="0" stop-color="#7657ff"/>',
    '<stop offset="0.52" stop-color="#ed4f9a"/>',
    '<stop offset="1" stop-color="#ffb443"/>',
    "</linearGradient></defs>",
    '<rect width="512" height="512" rx="96" fill="url(#g)"/>',
    '<circle cx="176" cy="204" r="24" fill="#fff"/>',
    '<circle cx="336" cy="204" r="24" fill="#fff"/>',
    '<path d="M154 318c58 52 146 52 204 0" fill="none" stroke="#fff" stroke-width="24" stroke-linecap="round"/>',
    "</svg>",
  ].join("");

  const FIXTURE_OPTIONS = Object.freeze({
    source: Object.freeze({ type: "svg", svg: FIXTURE_SVG }),
    outline: Object.freeze({ width: 12, color: "#ffffff" }),
    edge: Object.freeze({ width: 3, strength: 0.72 }),
    shadow: Object.freeze({
      color: "#1d1636",
      opacity: 0.34,
      blur: 28,
      distance: 16,
      angle: 90,
    }),
    lighting: Object.freeze({
      direction: Object.freeze({ x: -0.36, y: -0.44, z: 0.82 }),
      intensity: 0.9,
      ambient: 0.42,
      softness: 0.62,
    }),
    peel: Object.freeze({
      radius: 0.12,
      stiffness: 0.55,
      grabWidth: 32,
      maxAngle: Math.PI,
      release: "stay",
    }),
    back: Object.freeze({ color: "#f5f3fa", gloss: 0.78, roughness: 0.18 }),
    material: Object.freeze({
      type: "original",
      intensity: 0.7,
      scale: 1,
      holographicGrain: 0.3,
      seed: 7,
      holographicColors: Object.freeze(["#ff5ba8", "#6e7cff", "#59e0ce"]),
    }),
    sound: Object.freeze({ enabled: false, volume: 0 }),
    tilt: 0,
    wind: 0,
    quality: "high",
  });

  function waitFrames(count = 2) {
    return new Promise((resolve) => {
      let remaining = Math.max(1, count);
      const tick = () => {
        remaining -= 1;
        if (remaining <= 0) {
          resolve();
          return;
        }
        requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
    });
  }

  function toHex(buffer) {
    return Array.from(new Uint8Array(buffer), (value) =>
      value.toString(16).padStart(2, "0"),
    ).join("");
  }

  async function hashCanvas(canvas) {
    if (!(canvas instanceof HTMLCanvasElement)) {
      throw new Error("The benchmark sticker canvas does not exist.");
    }
    const context =
      canvas.getContext("webgl2", { preserveDrawingBuffer: true }) ||
      canvas.getContext("webgl", { preserveDrawingBuffer: true });
    if (!context) throw new Error("The benchmark requires a WebGL context.");

    const width = canvas.width;
    const height = canvas.height;
    const pixels = new Uint8Array(width * height * 4);
    context.finish();
    context.readPixels(
      0,
      0,
      width,
      height,
      context.RGBA,
      context.UNSIGNED_BYTE,
      pixels,
    );
    const error = context.getError();
    if (error !== context.NO_ERROR) {
      throw new Error(`WebGL readPixels failed with error ${error}.`);
    }
    const digest = await crypto.subtle.digest("SHA-256", pixels);
    return {
      algorithm: "SHA-256",
      value: toHex(digest),
      width,
      height,
      byteLength: pixels.byteLength,
    };
  }

  function clone(value) {
    return JSON.parse(JSON.stringify(value));
  }

  function snapshotsExactlyEqual(left, right) {
    return JSON.stringify(left) === JSON.stringify(right);
  }

  async function installStickerForgePerformanceHarness(stickerForgeModule) {
    if (
      !stickerForgeModule ||
      typeof stickerForgeModule.createSticker !== "function"
    ) {
      throw new Error("Sticker Forge createSticker() is unavailable.");
    }

    if (global.__stickerForgePerformance?.dispose) {
      await global.__stickerForgePerformance.dispose();
    }

    let style = document.getElementById(FIXTURE_STYLE_ID);
    if (!style) {
      style = document.createElement("style");
      style.id = FIXTURE_STYLE_ID;
      style.textContent = `
        #${FIXTURE_ROOT_ID} {
          position: fixed;
          inset: 0;
          z-index: 2147483646;
          display: grid;
          place-items: center;
          overflow: hidden;
          background: #eceaf2;
          contain: strict;
        }
        #${FIXTURE_ROOT_ID} .sticker-forge-performance-host {
          width: 520px;
          height: 520px;
          margin: 0;
          padding: 0;
          border: 0;
          contain: strict;
          touch-action: none;
        }
      `;
      document.head.append(style);
    }

    let root = document.getElementById(FIXTURE_ROOT_ID);
    if (!root) {
      root = document.createElement("main");
      root.id = FIXTURE_ROOT_ID;
      root.setAttribute("aria-label", "Sticker Forge deterministic performance fixture");
      document.body.append(root);
    }

    let controller = null;
    let host = null;
    let frameRequest = 0;
    let frameCapture = null;
    let pointerCaptureActive = false;
    let pointerEvents = [];
    let stickerEvents = [];
    let retainedPreparedHandles = [];
    let retainedDestroyedControllers = [];

    const pointerListener = (event) => {
      if (!pointerCaptureActive) return;
      pointerEvents.push({
        type: event.type,
        isTrusted: event.isTrusted,
        pointerType: event.pointerType,
        button: event.button,
        buttons: event.buttons,
        clientX: Math.round(event.clientX * 1000) / 1000,
        clientY: Math.round(event.clientY * 1000) / 1000,
        timeStamp: event.timeStamp,
      });
    };
    global.addEventListener("pointerdown", pointerListener, true);
    global.addEventListener("pointermove", pointerListener, true);
    global.addEventListener("pointerup", pointerListener, true);
    global.addEventListener("pointercancel", pointerListener, true);

    function ensureHost() {
      if (host?.isConnected) return host;
      host = document.createElement("div");
      host.className = "sticker-forge-performance-host";
      host.setAttribute("data-performance-fixture", "");
      for (const type of ["peelstart", "peelchange", "peelend", "error"]) {
        host.addEventListener(type, (event) => {
          const detail =
            event instanceof CustomEvent && event.detail
              ? clone(event.detail)
              : null;
          stickerEvents.push({ type, detail });
        });
      }
      root.append(host);
      return host;
    }

    function canvas() {
      return host?.querySelector("canvas") ?? null;
    }

    function state() {
      if (!controller) return null;
      return clone(controller.getState());
    }

    function snapshot() {
      if (!controller) return null;
      return clone(controller.getRenderSnapshot());
    }

    async function destroy(retainController = false) {
      if (frameRequest) cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      frameCapture = null;
      pointerCaptureActive = false;
      const destroyedController = controller;
      destroyedController?.destroy();
      if (retainController && destroyedController) {
        retainedDestroyedControllers.push(destroyedController);
      }
      controller = null;
      host?.remove();
      host = null;
      pointerEvents = [];
      stickerEvents = [];
      await waitFrames(2);
    }

    async function mount() {
      await destroy();
      stickerEvents = [];
      pointerEvents = [];
      const target = ensureHost();
      controller = await stickerForgeModule.createSticker(
        target,
        FIXTURE_OPTIONS,
      );
      await waitFrames(3);
      if (!controller.getState().ready) {
        throw new Error("Sticker Forge did not enter the ready state.");
      }
      return {
        state: state(),
        rect: rect(),
        canvas: {
          width: canvas()?.width ?? 0,
          height: canvas()?.height ?? 0,
        },
      };
    }

    function rect() {
      const target = canvas() ?? host;
      if (!target) throw new Error("The benchmark fixture is not mounted.");
      const bounds = target.getBoundingClientRect();
      return {
        left: bounds.left,
        top: bounds.top,
        right: bounds.right,
        bottom: bounds.bottom,
        width: bounds.width,
        height: bounds.height,
        centerX: bounds.left + bounds.width / 2,
        centerY: bounds.top + bounds.height / 2,
      };
    }

    async function prepareRun() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      controller.reset();
      controller.setPeelProgress(0, {
        origin: { x: 0, y: 0.5 },
        target: { x: 1, y: 0.5 },
      });
      stickerEvents = [];
      pointerEvents = [];
      await waitFrames(3);
      return {
        state: state(),
        rect: rect(),
        hash: await hashCanvas(canvas()),
      };
    }

    async function retainPreparedSourceHandles() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      const committed = await controller.prepareSource(FIXTURE_OPTIONS.source);
      committed.commit();
      const disposed = await controller.prepareSource(FIXTURE_OPTIONS.source);
      disposed.dispose();
      const pending = await controller.prepareSource(FIXTURE_OPTIONS.source);
      retainedPreparedHandles.push(committed, disposed, pending);
      return {
        added: 3,
        retained: retainedPreparedHandles.length,
      };
    }

    async function runFailedCreateBatch(iterations) {
      const count = Math.max(1, Math.floor(iterations));
      let rejected = 0;
      for (let index = 0; index < count; index += 1) {
        const target = document.createElement("div");
        target.className = "sticker-forge-performance-host";
        root.append(target);
        try {
          await stickerForgeModule.createSticker(target, {
            ...FIXTURE_OPTIONS,
            source: { type: "svg", svg: "<svg><" },
          });
        } catch {
          rejected += 1;
        } finally {
          target.remove();
        }
      }
      await waitFrames(2);
      return { attempted: count, rejected };
    }

    async function runFailedConstructorBatch(iterations) {
      const count = Math.max(1, Math.floor(iterations));
      const NativeResizeObserver = global.ResizeObserver;
      let rejected = 0;
      global.ResizeObserver = class ThrowingResizeObserver {
        observe() {
          throw new Error("Injected ResizeObserver failure");
        }

        disconnect() {}
      };
      try {
        for (let index = 0; index < count; index += 1) {
          const target = document.createElement("div");
          target.className = "sticker-forge-performance-host";
          root.append(target);
          try {
            await stickerForgeModule.createSticker(target, FIXTURE_OPTIONS);
          } catch {
            rejected += 1;
          } finally {
            target.remove();
          }
        }
      } finally {
        global.ResizeObserver = NativeResizeObserver;
      }
      await waitFrames(2);
      return { attempted: count, rejected };
    }

    function clearRetainedPreparedHandles() {
      retainedPreparedHandles = [];
      retainedDestroyedControllers = [];
      return { retainedHandles: 0, retainedControllers: 0 };
    }

    function beginInteractionCapture() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      stickerEvents = [];
      pointerEvents = [];
      pointerCaptureActive = true;
    }

    function endInteractionCapture() {
      pointerCaptureActive = false;
      return {
        pointerEvents: clone(pointerEvents),
        stickerEvents: clone(stickerEvents),
        state: state(),
        snapshot: snapshot(),
      };
    }

    function startFrameCapture() {
      if (frameRequest) cancelAnimationFrame(frameRequest);
      frameCapture = {
        startedAt: performance.now(),
        firstTimestamp: null,
        lastTimestamp: null,
        intervals: [],
      };
      const tick = (timestamp) => {
        if (!frameCapture) return;
        if (frameCapture.firstTimestamp === null) {
          frameCapture.firstTimestamp = timestamp;
        }
        if (frameCapture.lastTimestamp !== null) {
          frameCapture.intervals.push(timestamp - frameCapture.lastTimestamp);
        }
        frameCapture.lastTimestamp = timestamp;
        frameRequest = requestAnimationFrame(tick);
      };
      frameRequest = requestAnimationFrame(tick);
    }

    function stopFrameCapture() {
      if (frameRequest) cancelAnimationFrame(frameRequest);
      frameRequest = 0;
      const captured = frameCapture
        ? {
            startedAt: frameCapture.startedAt,
            firstTimestamp: frameCapture.firstTimestamp,
            lastTimestamp: frameCapture.lastTimestamp,
            intervals: frameCapture.intervals.slice(),
          }
        : null;
      frameCapture = null;
      return captured;
    }

    async function hashCurrentCanvas() {
      return hashCanvas(canvas());
    }

    async function restoreFlatAndHash() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      controller.reset();
      controller.setPeelProgress(0, {
        origin: { x: 0, y: 0.5 },
        target: { x: 1, y: 0.5 },
      });
      await waitFrames(3);
      return {
        state: state(),
        hash: await hashCanvas(canvas()),
      };
    }

    async function verifySnapshotReplay() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      controller.setPeelProgress(0.625, {
        origin: { x: 0.02, y: 0.5 },
        target: { x: 1.18, y: 0.38 },
      });
      const expectedSnapshot = snapshot();
      const expectedHash = await hashCanvas(canvas());
      controller.setPeelProgress(0.18, {
        origin: { x: 0.5, y: 0.02 },
        target: { x: 0.5, y: 0.9 },
      });
      controller.setRenderSnapshot(expectedSnapshot);
      const actualSnapshot = snapshot();
      const actualHash = await hashCanvas(canvas());
      const result = {
        expectedSnapshot,
        actualSnapshot,
        expectedHash,
        actualHash,
        snapshotExact: snapshotsExactlyEqual(
          expectedSnapshot,
          actualSnapshot,
        ),
        pixelsExact: expectedHash.value === actualHash.value,
      };
      await restoreFlatAndHash();
      return result;
    }

    async function verifyPeeledPublicResize() {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      const flat = await restoreFlatAndHash();
      controller.setPeelProgress(0.625, {
        origin: { x: 0.02, y: 0.5 },
        target: { x: 1.18, y: 0.38 },
      });
      const before = {
        state: state(),
        snapshot: snapshot(),
        hash: await hashCanvas(canvas()),
      };
      controller.resize();
      const after = {
        state: state(),
        snapshot: snapshot(),
        hash: await hashCanvas(canvas()),
      };
      const result = {
        before,
        after,
        resetToFlat:
          after.state?.ready === true &&
          after.state?.dragging === false &&
          after.state?.progress === 0,
        flatPixelsExact: after.hash.value === flat.hash.value,
      };
      await restoreFlatAndHash();
      return result;
    }

    function runNoopResizeBatch(iterations) {
      if (!controller) throw new Error("The benchmark fixture is not mounted.");
      const count = Math.max(1, Math.floor(iterations));
      const before = {
        state: state(),
        snapshot: snapshot(),
        canvasWidth: canvas()?.width ?? 0,
        canvasHeight: canvas()?.height ?? 0,
      };
      const startedAt = performance.now();
      for (let index = 0; index < count; index += 1) {
        controller.resize();
      }
      const elapsedMs = performance.now() - startedAt;
      const after = {
        state: state(),
        snapshot: snapshot(),
        canvasWidth: canvas()?.width ?? 0,
        canvasHeight: canvas()?.height ?? 0,
      };
      return {
        iterations: count,
        elapsedMs,
        before,
        after,
        stateExact: snapshotsExactlyEqual(before.state, after.state),
        snapshotExact: snapshotsExactlyEqual(
          before.snapshot,
          after.snapshot,
        ),
        canvasSizeExact:
          before.canvasWidth === after.canvasWidth &&
          before.canvasHeight === after.canvasHeight,
      };
    }

    function fixtureCounts() {
      return {
        fixtureRoots: document.querySelectorAll(`#${FIXTURE_ROOT_ID}`).length,
        fixtureHosts: document.querySelectorAll(
          `#${FIXTURE_ROOT_ID} .sticker-forge-performance-host`,
        ).length,
        fixtureCanvases: document.querySelectorAll(
          `#${FIXTURE_ROOT_ID} canvas`,
        ).length,
        allDocuments: 1,
        allElements: document.getElementsByTagName("*").length,
        allCanvases: document.getElementsByTagName("canvas").length,
        controllerPresent: controller !== null,
        retainedPreparedHandles: retainedPreparedHandles.length,
        retainedDestroyedControllers: retainedDestroyedControllers.length,
      };
    }

    async function dispose() {
      await destroy();
      global.removeEventListener("pointerdown", pointerListener, true);
      global.removeEventListener("pointermove", pointerListener, true);
      global.removeEventListener("pointerup", pointerListener, true);
      global.removeEventListener("pointercancel", pointerListener, true);
      root?.remove();
      style?.remove();
      retainedPreparedHandles = [];
      retainedDestroyedControllers = [];
      delete global.__stickerForgePerformance;
    }

    const api = {
      mount,
      destroy,
      destroyAndRetain: () => destroy(true),
      dispose,
      rect,
      state,
      snapshot,
      prepareRun,
      retainPreparedSourceHandles,
      runFailedCreateBatch,
      runFailedConstructorBatch,
      clearRetainedPreparedHandles,
      beginInteractionCapture,
      endInteractionCapture,
      startFrameCapture,
      stopFrameCapture,
      hashCurrentCanvas,
      restoreFlatAndHash,
      verifySnapshotReplay,
      verifyPeeledPublicResize,
      runNoopResizeBatch,
      fixtureCounts,
      waitFrames,
    };
    global.__stickerForgePerformance = api;
    return {
      fixture: fixtureCounts(),
      moduleExports: Object.keys(stickerForgeModule).sort(),
    };
  }

  global.installStickerForgePerformanceHarness =
    installStickerForgePerformanceHarness;
})(window);
