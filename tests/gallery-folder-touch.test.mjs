import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("pins a mobile Gallery folder open after a 500ms long press", async () => {
  const folder = await readFile(
    new URL("../app/GalleryFolder.tsx", import.meta.url),
    "utf8",
  );

  assert.match(folder, /const \[touchPinned, setTouchPinned\] = useState\(false\)/);
  assert.match(
    folder,
    /longPressTimerRef\.current = setTimeout\(\(\) => \{[\s\S]*?setHovered\(true\);[\s\S]*?setTouchPinned\(true\);[\s\S]*?\}, 500\);/,
  );
  assert.match(
    folder,
    /Math\.hypot\([\s\S]*?\) <= 10/,
  );
  assert.match(
    folder,
    /window\.addEventListener\("pointerdown", handleOutsidePointerDown, true\)/,
  );
  assert.match(
    folder,
    /buttonRef\.current\?\.contains\(target\)[\s\S]*?setTouchPinned\(false\);[\s\S]*?setHovered\(false\);/,
  );
});

test("does not open Gallery from the click emitted by a long press", async () => {
  const folder = await readFile(
    new URL("../app/GalleryFolder.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    folder,
    /suppressClickUntilRef\.current = performance\.now\(\) \+ 700/,
  );
  assert.match(
    folder,
    /onClick=\{\(event\) => \{\s*if \(event\.timeStamp < suppressClickUntilRef\.current\) \{\s*event\.preventDefault\(\);\s*return;/,
  );
});
