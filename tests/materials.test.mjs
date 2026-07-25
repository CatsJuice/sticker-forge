import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const ROOT = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, ROOT), "utf8");
}

const MATERIALS = [
  "original",
  "holographic",
  "glitter",
  "reflective",
];

const REMOVED_MATERIALS = [
  "satin",
  "matte",
  "glossy",
  "metallic",
  "paper",
  "kraft",
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
  for (const material of REMOVED_MATERIALS) {
    assert.ok(!types.includes(`| "${material}"`));
    assert.ok(!declarations.includes(`| "${material}"`));
  }
  assert.match(types, /material\?: StickerMaterialOptions/);
  assert.match(declarations, /material\?: StickerMaterialOptions/);
  assert.match(
    types,
    /holographicColors\?: \[string, string, string\]/,
  );
  assert.match(
    declarations,
    /holographicColors\?: \[string, string, string\]/,
  );
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
    "uMaterialScale",
    "uMaterialSeed",
    "uHolographicColorA",
    "uHolographicColorB",
    "uHolographicColorC",
  ]) {
    assert.match(renderer, new RegExp(name));
    assert.match(gallery, new RegExp(name));
    assert.match(shader, new RegExp(name));
  }
  assert.match(shader, /applyFrontMaterial/);
  assert.match(shader, /if \(kind < 0\.5\) return base/);
  assert.match(
    shader,
    /vec2 holographicUv = \(vUv - 0\.5\) \* scale/,
  );
  const holographicBlock = shader.match(
    /\/\/ Diffractive holographic film\.([\s\S]*?)\/\/ Glitter laminate\./,
  )?.[1];
  assert.ok(holographicBlock, "missing holographic shader block");
  assert.ok(
    !holographicBlock.includes("normal.xy"),
    "holographic band direction must not follow the peeled surface normal",
  );
  assert.match(
    holographicBlock,
    /float holographicViewShift =[\s\S]*\(1\.0 - facing\)[\s\S]*vCurl/,
  );
  assert.match(holographicBlock, /float broadSpec = pow\(ndh, 12\.0\)/);
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
  assert.match(studio, /holographic-color-controls/);
  assert.match(studio, /holographicColors/);
  assert.match(preview, /applyMaterialPreview/);
  assert.match(preview, /options\.material/);
  assert.match(preview, /resolved\.holographicColors/);
});
