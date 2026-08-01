import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("compacts supported gallery actions when transfer actions are hidden", async () => {
  const dock = await readFile(
    new URL("../app/GalleryFolderDock.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    dock,
    /galleryTransferEnabled \? \[0, 1, 2, 3\] : \[0, 1\]/,
  );
  assert.match(
    dock,
    /kind="edit"[\s\S]*?delayIndex=\{galleryTransferEnabled \? 3 : 1\}/,
  );
  assert.match(
    dock,
    /kind="create"[\s\S]*?delayIndex=\{galleryTransferEnabled \? 2 : 0\}/,
  );
});

test("keeps the mobile folder dock horizontally scrollable", async () => {
  const [folder, styles] = await Promise.all([
    readFile(new URL("../app/GalleryFolder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(
    folder,
    /onPointerEnter=\{\(event\) => \{\s*if \(event\.pointerType === "touch"\) return;/,
  );
  assert.match(
    folder,
    /onPointerMove=\{\(event\) => \{\s*if \(event\.pointerType === "touch"\) \{[\s\S]*?Math\.hypot\(/,
  );
  assert.match(
    styles,
    /\.gallery-folder-scroll\s*\{[\s\S]*?overscroll-behavior-x: contain;[\s\S]*?-webkit-overflow-scrolling: touch;/,
  );
  assert.match(
    styles,
    /\.gallery-folder-list,\s*\.gallery-folder\s*\{\s*touch-action: pan-x;/,
  );
});

test("aligns the XHS mobile gallery header beside the host back button", async () => {
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(
    styles,
    /html\.xhs-build \.gallery-header\s*\{[^}]*top:\s*max\(6px,\s*calc\(var\(--mobile-safe-top\) - 2px\)\);[^}]*left:\s*calc\(46px \+ var\(--mobile-safe-left\)\);[^}]*height:\s*44px;/s,
  );
  assert.match(
    styles,
    /html\.xhs-build \.gallery-back-button\s*\{[^}]*width:\s*42px;[^}]*height:\s*42px;[^}]*font-size:\s*20px;/s,
  );
  assert.match(
    styles,
    /html\.xhs-build \.gallery-back-button svg\s*\{[^}]*width:\s*19px;[^}]*height:\s*19px;/s,
  );
  assert.match(
    styles,
    /html\.xhs-build \.gallery-title,[\s\S]*?html\.xhs-build \.gallery-title-input\s*\{[^}]*margin-left:\s*9px;[^}]*font-size:\s*19px;[^}]*font-weight:\s*750;/s,
  );
});
