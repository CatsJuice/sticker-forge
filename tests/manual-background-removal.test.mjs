import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("supports manual lasso and brush selection in web and XHS builds", async () => {
  const [dialog, studio, styles, xhsConfig] = await Promise.all([
    readFile(
      new URL("../app/ManualBackgroundRemovalDialog.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../vite.xhs.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(dialog, /type ToolMode = "select" \| "brush"/);
  assert.match(dialog, /type OperationMode = "add" \| "subtract"/);
  assert.match(dialog, /operationMode === "add" \? "source-over" : "destination-out"/);
  assert.match(dialog, /context\.closePath\(\);[\s\S]*?context\.fill\(\)/);
  assert.match(dialog, /selectionOutlinePathRef = useRef<Path2D \| null>/);
  assert.match(
    dialog,
    /const selectionOutline = selectionOutlinePathRef\.current[\s\S]*?context\.setLineDash\([\s\S]*?context\.lineDashOffset = -\(time \/ 90\)[\s\S]*?context\.stroke\(selectionOutline\)/,
  );
  assert.match(dialog, /rgba\(\$\{PRIMARY_RGB\.join\(", "\)\}, 0\.2\)/);
  assert.match(dialog, /pixels\[alphaIndex\] \* \(maskPixels\[alphaIndex\] \/ 255\)/);
  assert.match(dialog, /pointerDistance\(first, second\)/);
  assert.match(dialog, /window\.innerWidth <= MOBILE_BREAKPOINT[\s\S]*?\? 440/);
  assert.match(dialog, /closing \? " is-closing" : entered \? " is-open"/);
  assert.match(dialog, /onClosing\(\);[\s\S]*?setClosing\(true\)/);
  assert.match(styles, /\.t-modal\.is-closing/);
  assert.match(
    styles,
    /\.manual-removal-dialog\.t-modal\.is-closing\s*\{\s*opacity: 1;/,
  );
  assert.match(styles, /\.manual-removal-mode-tabs/);
  assert.match(styles, /\.manual-removal-operations/);
  assert.match(styles, /\.manual-removal-brush-size \{/);
  assert.match(dialog, /className="range-slider"/);
  assert.match(styles, /\.manual-removal-brush-preview/);
  assert.match(
    styles,
    /html\.xhs-build\s*\{[\s\S]*?--xhs-dialog-top-reserve:[\s\S]*?--safe-area-inset-top/,
  );
  assert.match(
    styles,
    /html\.xhs-build \.manual-removal-backdrop[\s\S]*?padding-top: var\(--xhs-dialog-top-reserve\)/,
  );
  assert.match(
    styles,
    /html\.xhs-build \.studio-shell[\s\S]*?--export-background-offset-y:[\s\S]*?var\(--xhs-dialog-top-reserve\) - 12px[\s\S]*?--export-background-scale: 0\.94/,
  );
  assert.match(styles, /\.manual-removal-canvas-frame/);
  assert.match(studio, /data-manual-only=\{__XHS_BUILD__ \|\| undefined\}/);
  assert.match(
    studio,
    /data-export-active=\{exportOpen \|\| manualRemovalOpen\}/,
  );
  assert.match(
    studio,
    /data-export-closing=\{exportClosing \|\| manualRemovalClosing\}/,
  );
  assert.match(
    studio,
    /root\.classList\.add\("export-sheet-open"\)[\s\S]*?\[exportOpen, manualRemovalOpen\]/,
  );
  assert.match(studio, /!__XHS_BUILD__ \? \([\s\S]*?background-removal-action/);
  assert.match(studio, /\{backgroundParticles \? \(/);
  assert.doesNotMatch(
    xhsConfig,
    /find: "@\/app\/BackgroundRemovalEffect"/,
  );
});
