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
    "uMaterialBaked",
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
    /vec3 applyFrontMaterial\([\s\S]*?vec3 lightDirection/,
  );
  assert.match(
    shader,
    /\(previewGradientPhase\(\) - 0\.5\) \* scale \+ 0\.5/,
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
  assert.match(
    holographicBlock,
    /float holographicLightShift =[\s\S]*lightDirection\.xy/,
  );
  assert.match(holographicBlock, /previewGradientPhase\(\)/);
  assert.match(holographicBlock, /uLightIntensity - 0\.8/);
  assert.match(holographicBlock, /float holographicMix =[\s\S]*0\.24/);
  assert.ok(
    !holographicBlock.includes("sin(phase * 13.0)"),
    "live holographic color must not add bands absent from the baked preview",
  );
  assert.match(holographicBlock, /float broadSpec = pow\(ndh, 12\.0\)/);
  const reflectiveBlock = shader.match(
    /\/\/ Retroreflective film\.([\s\S]*?)\n  }/,
  )?.[1];
  assert.ok(reflectiveBlock, "missing reflective shader block");
  assert.match(
    reflectiveBlock,
    /dot\(lightDirection, viewDirection\)/,
  );
  assert.match(reflectiveBlock, /previewReflectiveOpacity/);
  assert.match(reflectiveBlock, /previewGradientPhase\(\)/);
  assert.match(reflectiveBlock, /mix\(base, vec3\(1\.0\)/);
  assert.match(reflectiveBlock, /uLightIntensity/);
  assert.match(gallery, /material-baked gallery preview while idle/);
  assert.match(gallery, /map: idleTexture \?\? this\.texture/);
  assert.match(gallery, /uPreparedMap: \{ value: idleTexture \?\? this\.texture \}/);
  assert.match(gallery, /uPreparedMix: \{ value: idleTexture \? 1 : 0 \}/);
  assert.match(gallery, /uMaterialBaked: \{ value: idleTexture \? 1 : 0 \}/);
  assert.match(renderer, /uMaterialBaked: \{ value: 0 \}/);
  assert.match(gallery, /this\.flatMesh\.visible = true/);
  assert.match(gallery, /this\.stickerMesh\.visible = false/);
  assert.match(
    gallery,
    /this\.loadSticker\(record!, renderItem\.asset!, generation\),\s+true/,
  );
  assert.match(
    gallery,
    /if \(!record\.preview && record\.previewLoading\) \{\s+await this\.loadPreview\(record\)/,
  );
  assert.match(
    shader,
    /smoothstep\(0\.0, 0\.22, frontDeformation\) \* 0\.35/,
  );
});

test("offers all materials in the studio and shares one baked material source", async () => {
  const [studio, preview, materialPreview, renderer] = await Promise.all([
    source("app/StickerForgeStudio.tsx"),
    source("lib/gallery-preview.ts"),
    source("lib/material-preview.ts"),
    source("lib/sticker-forge.ts"),
  ]);

  for (const material of MATERIALS) {
    assert.ok(studio.includes(`"${material}"`), `missing ${material} preset`);
  }
  assert.match(studio, /MATERIAL_PRESETS/);
  assert.match(studio, /holographic-color-controls/);
  assert.match(studio, /holographicColors/);
  assert.match(preview, /createMaterialPreviewCanvas/);
  assert.match(preview, /options\.material/);
  assert.match(materialPreview, /applyMaterialPreview/);
  assert.match(materialPreview, /resolved\.holographicColors/);
  assert.match(renderer, /createMaterialPreviewCanvas/);
  assert.match(renderer, /uMaterialBaked\.value = 1/);
  assert.match(renderer, /uPreserveFrontColor: \{ value: 1 \}/);
  assert.match(materialPreview, /scaledPhase\(position, scale\)/);
  assert.match(materialPreview, /\* scale \* scale/);
  assert.match(
    materialPreview,
    /addHolographicStops\([\s\S]*?rainbow,[\s\S]*?scale/,
  );
  assert.match(materialPreview, /addReflectiveStops\(sheen, scale/);
  assert.match(materialPreview, /lightX - defaultLightX/);
  assert.match(materialPreview, /Math\.cos\(orientation - lightAngle\)/);
  assert.match(renderer, /lighting\.direction\.x/);
  assert.match(renderer, /lighting\.intensity/);
  assert.match(
    renderer,
    /preparedOptions\.material,\s+preparedOptions\.lighting/,
  );
  assert.match(preview, /options\.lighting/);
});
