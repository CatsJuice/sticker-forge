import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

const files = await Promise.all(
  [
    "../lib/types.ts",
    "../lib/shaders.ts",
    "../lib/sticker-forge.ts",
    "../lib/gallery-renderer.ts",
    "../app/StickerForgeStudio.tsx",
  ].map((path) => readFile(new URL(path, import.meta.url), "utf8")),
);

const [types, shaders, renderer, galleryRenderer, studio] = files;

test("exposes resolved global directional-light settings", () => {
  assert.match(types, /interface StickerLightingOptions/);
  assert.match(types, /direction\?: StickerLightDirection/);
  assert.match(types, /intensity\?: number/);
  assert.match(types, /ambient\?: number/);
  assert.match(types, /softness\?: number/);
  assert.match(types, /lighting\?: StickerLightingOptions/);
  assert.match(types, /direction: \{ x: -0\.38, y: 0\.52, z: 0\.76 \}/);
  assert.match(types, /lighting: \{\s+\.\.\.base\.lighting/);
});

test("uses one light direction for material response and projected shadows", () => {
  for (const uniform of [
    "uLightDirection",
    "uLightIntensity",
    "uAmbientLight",
    "uLightSoftness",
  ]) {
    assert.match(shaders, new RegExp(`uniform .* ${uniform};`));
    assert.match(renderer, new RegExp(`${uniform}: \\{\\s*value:`));
    assert.match(galleryRenderer, new RegExp(`${uniform}: \\{\\s*value:`));
  }
  assert.match(
    shaders,
    /vec3 lightDirection = length\(uLightDirection\) > 0\.0001/,
  );
  assert.match(shaders, /normalize\(vec3\(-0\.38, 0\.52, 0\.76\)\)/);
  assert.match(
    renderer,
    /shadowDirection\.set\(-lightDirection\.x, -lightDirection\.y\)/,
  );
  assert.match(
    renderer,
    /this\.peelShadowLight\.position\.set\(\s+lightDirection\.x/,
  );
});

test("renders presets, a hemispherical direction control, and light sliders", () => {
  assert.match(studio, /function LightDirectionControl/);
  assert.match(studio, /role="slider"/);
  assert.match(studio, /LIGHTING_PRESETS/);
  assert.match(studio, /id="light-intensity"/);
  assert.match(studio, /id="ambient-light"/);
  assert.match(studio, /id="light-softness"/);
  assert.match(studio, /<ControlSection title=\{t\.lighting\} defaultOpen>/);
  assert.match(
    studio,
    /window\.addEventListener\("pointerup", finishGlobalPointerGesture, true\)/,
  );
  assert.match(studio, /window\.addEventListener\("mouseup", finishOnMouseUp, true\)/);
  assert.match(studio, /onLostPointerCapture=/);
});
