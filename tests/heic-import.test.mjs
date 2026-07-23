import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("decodes HEIC images locally before loading sticker artwork", async () => {
  const [packageJson, heic, studio, notices] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(new URL("../lib/heic.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../THIRD_PARTY_NOTICES.md", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"heic-decode"/);
  assert.doesNotMatch(packageJson, /"heic2any"/);
  assert.match(heic, /import\("heic-decode"\)/);
  assert.match(heic, /maximumSide = 4096/);
  assert.match(heic, /"image\/jpeg"/);
  assert.match(heic, /0\.94/);
  assert.match(studio, /isHeicFile\(file\)/);
  assert.match(studio, /convertHeicToJpeg\(file\)/);
  assert.match(studio, /accept="image\/\*,\.heic,\.heif"/);
  assert.match(studio, /正在本地解码 HEIC/);
  assert.match(studio, /Decoding HEIC locally/);
  assert.match(studio, /const \[imageImportBusy, setImageImportBusy\]/);
  assert.match(studio, /setImageImportBusy\(true\)/);
  assert.match(
    studio,
    /disabled=\{backgroundRemovalBusy \|\| imageImportBusy\}/,
  );
  assert.match(studio, /importRevision === imageImportRevisionRef\.current/);
  assert.match(notices, /heic-decode/);
  assert.match(notices, /ISC\s+License/);
  assert.match(notices, /libheif-js/);
  assert.match(notices, /Lesser General\s+Public License v3\.0/);
});
