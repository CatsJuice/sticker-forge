import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

const ROOT = new URL("../", import.meta.url);

async function source(path) {
  return readFile(new URL(path, ROOT), "utf8");
}

let materialPreviewInternalsPromise;

function transpile(sourceText, fileName) {
  return ts.transpileModule(sourceText, {
    fileName,
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
}

async function materialPreviewInternals() {
  materialPreviewInternalsPromise ??= (async () => {
    const [typesSource, previewSource] = await Promise.all([
      source("lib/types.ts"),
      source("lib/material-preview.ts"),
    ]);
    const typesUrl = `data:text/javascript;base64,${Buffer.from(
      transpile(typesSource, "types.ts"),
    ).toString("base64")}`;
    const instrumented = `${previewSource}
export {
  MATERIAL_PREVIEW_CACHE_LIMIT,
  getHolographicNoise,
  getGlitterRandomValues,
  holographicNoiseCache,
  glitterRandomCache,
  seededRandomInitialState,
};`;
    const previewJavaScript = transpile(
      instrumented,
      "material-preview.ts",
    ).replaceAll('"./types"', JSON.stringify(typesUrl));
    return import(
      `data:text/javascript;base64,${Buffer.from(previewJavaScript).toString(
        "base64",
      )}`
    );
  })();
  return materialPreviewInternalsPromise;
}

function referenceRandomValues(seed, count) {
  let state = Math.floor(seed * 2147483647) || 1;
  const values = new Float64Array(count);
  for (let index = 0; index < count; index += 1) {
    state = (state * 48271) % 2147483647;
    values[index] = state / 2147483647;
  }
  return values;
}

function referenceHolographicNoise(seed) {
  const randomValues = referenceRandomValues(seed, 96 * 96 * 2);
  const pixels = new Uint8ClampedArray(96 * 96 * 4);
  for (
    let pixelOffset = 0, randomOffset = 0;
    pixelOffset < pixels.length;
    pixelOffset += 4, randomOffset += 2
  ) {
    const brightness = randomValues[randomOffset] > 0.48 ? 255 : 20;
    pixels[pixelOffset] = brightness;
    pixels[pixelOffset + 1] = brightness;
    pixels[pixelOffset + 2] = brightness;
    pixels[pixelOffset + 3] = Math.round(
      38 + randomValues[randomOffset + 1] * 74,
    );
  }
  return pixels;
}

function arrayBytes(array) {
  return Buffer.from(array.buffer, array.byteOffset, array.byteLength);
}

function arraySha256(array) {
  return createHash("sha256").update(arrayBytes(array)).digest("hex");
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
  assert.match(types, /holographicGrain\?: number/);
  assert.match(declarations, /holographicGrain\?: number/);
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
    "uHolographicGrain",
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
  assert.match(holographicBlock, /float frostGrain =/);
  assert.match(holographicBlock, /float frostAmount =/);
  assert.match(holographicBlock, /uHolographicGrain/);
  assert.match(holographicBlock, /detailUv \* 1380\.0/);
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
  assert.match(studio, /id="holographic-grain"/);
  assert.match(studio, /holographicGrain: "磨砂颗粒"/);
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
  assert.match(materialPreview, /function applyHolographicFrost/);
  assert.match(materialPreview, /pattern\.setTransform/);
  assert.match(materialPreview, /0\.42 \* amount \* grain/);
  assert.match(
    materialPreview,
    /brightness = value > 0\.48 \? 255 : 20/,
  );
  assert.match(renderer, /lighting\.direction\.x/);
  assert.match(renderer, /lighting\.intensity/);
  assert.match(
    renderer,
    /preparedOptions\.material,\s+preparedOptions\.lighting/,
  );
  assert.match(preview, /options\.lighting/);
});

test("reuses bounded seeded material invariants without changing any values", async () => {
  const internals = await materialPreviewInternals();
  internals.holographicNoiseCache.clear();
  internals.glitterRandomCache.clear();

  for (const seed of [-0.731, 0, 0.37, 1.271, 4.25]) {
    const expectedNoise = referenceHolographicNoise(seed);
    const actualNoise = internals.getHolographicNoise(seed).pixels;
    assert.equal(actualNoise.byteLength, expectedNoise.byteLength);
    assert.ok(arrayBytes(actualNoise).equals(arrayBytes(expectedNoise)));
    assert.equal(arraySha256(actualNoise), arraySha256(expectedNoise));

    for (const flakeCount of [0, 1, 37, 8000]) {
      const valueCount = flakeCount * 5;
      const expectedValues = referenceRandomValues(seed, valueCount);
      const actualValues = internals
        .getGlitterRandomValues(seed, flakeCount)
        .subarray(0, valueCount);
      assert.ok(arrayBytes(actualValues).equals(arrayBytes(expectedValues)));
      assert.equal(arraySha256(actualValues), arraySha256(expectedValues));
    }
  }

  const repeatedNoise = internals.getHolographicNoise(0.37);
  assert.strictEqual(
    internals.getHolographicNoise(0.37),
    repeatedNoise,
    "the same seeded noise entry should be reused",
  );
  const repeatedGlitter = internals.getGlitterRandomValues(0.37, 8000);
  assert.strictEqual(
    internals.getGlitterRandomValues(0.37, 4000),
    repeatedGlitter,
    "a smaller glitter request should reuse the already-grown sequence",
  );

  internals.holographicNoiseCache.clear();
  internals.glitterRandomCache.clear();
  const firstSeed = 10.125;
  const firstState = internals.seededRandomInitialState(firstSeed);
  for (
    let index = 0;
    index < internals.MATERIAL_PREVIEW_CACHE_LIMIT + 12;
    index += 1
  ) {
    const seed = firstSeed + index;
    internals.getHolographicNoise(seed);
    internals.getGlitterRandomValues(seed, 8000);
  }
  assert.equal(
    internals.holographicNoiseCache.size,
    internals.MATERIAL_PREVIEW_CACHE_LIMIT,
  );
  assert.equal(
    internals.glitterRandomCache.size,
    internals.MATERIAL_PREVIEW_CACHE_LIMIT,
  );
  assert.ok(!internals.holographicNoiseCache.has(firstState));
  assert.ok(!internals.glitterRandomCache.has(firstState));
});
