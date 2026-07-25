import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, ROOT), "utf8");
}

const MATERIALS = [
  "satin",
  "matte",
  "glossy",
  "holographic",
  "metallic",
  "glitter",
  "paper",
  "kraft",
  "reflective",
  "pearlescent",
  "clear",
  "frosted",
  "spot-uv",
  "lenticular",
];

test("exposes every front material through the public options API", async () => {
  const [types, declarations] = await Promise.all([
    source("lib/types.ts"),
    source("public/embed/sticker-forge.d.ts"),
  ]);

  for (const material of MATERIALS) {
    assert.match(types, new RegExp(`"${material.replace("-", "\\-")}"`));
    assert.match(declarations, new RegExp(`"${material.replace("-", "\\-")}"`));
  }
  assert.match(types, /material\?: StickerMaterialOptions/);
  assert.match(declarations, /material\?: StickerMaterialOptions/);
});

test("binds material uniforms in editor and gallery renderers", async () => {
  const [renderer, gallery, shader] = await Promise.all([
    source("lib/sticker-forge.ts"),
    source("lib/gallery-renderer.ts"),
    source("lib/shaders.ts"),
  ]);

  for (const name of [
    "uMaterialType",
    "uMaterialIntensity",
    "uMaterialRoughness",
    "uMaterialScale",
    "uMaterialTint",
    "uMaterialSecondaryTint",
    "uMaterialSeed",
  ]) {
    assert.match(renderer, new RegExp(name));
    assert.match(gallery, new RegExp(name));
    assert.match(shader, new RegExp(name));
  }
  assert.match(shader, /applyFrontMaterial/);
  assert.match(gallery, /shader-backed face visible while idle/);
});

test("offers all materials in the studio and bakes gallery previews", async () => {
  const [studio, preview] = await Promise.all([
    source("app/StickerForgeStudio.tsx"),
    source("lib/gallery-preview.ts"),
  ]);

  for (const material of MATERIALS) {
    assert.ok(studio.includes(`"${material}"`), `missing ${material} preset`);
  }
  assert.match(studio, /MATERIAL_PRESETS/);
  assert.match(preview, /applyMaterialPreview/);
  assert.match(preview, /options\.material/);
});
