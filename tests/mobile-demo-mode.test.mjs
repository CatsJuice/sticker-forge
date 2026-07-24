import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("loads the touch visualizer only for the mobile demo route parameter", async () => {
  const [layout, loader, visualizer] = await Promise.all([
    readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/MobileDemoMode.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/TouchVisualizer.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(layout, /<MobileDemoMode \/>/);
  assert.match(loader, /params\.get\("demo"\) !== "mobile"/);
  assert.match(loader, /import\("\.\/TouchVisualizer"\)/);
  assert.doesNotMatch(loader, /from "\.\/TouchVisualizer"/);

  assert.match(visualizer, /event\.pointerType !== "touch"/);
  assert.match(visualizer, /"pointerdown"/);
  assert.match(visualizer, /"pointermove"/);
  assert.match(visualizer, /"pointerup"/);
  assert.match(visualizer, /"pointercancel"/);
  assert.match(visualizer, /z-index: 2147483647/);
  assert.match(visualizer, /pointer-events: none/);
  assert.match(visualizer, /background: rgba\(12, 14, 18, 0\.2\)/);
  assert.match(visualizer, /border: 2px solid rgba\(255, 255, 255, 0\.98\)/);
});
