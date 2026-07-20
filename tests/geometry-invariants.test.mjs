import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("keeps text outlines faithful to the artwork alpha", async () => {
  const source = await readFile(
    new URL("../lib/source.ts", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(source, /connectTextBacking|firstOpaque|lastOpaque/);
  assert.match(source, /const canvas = addOutline\(sourceCanvas, outline\)/);
});

test("supports uploaded images and derives transparent silhouettes from alpha", async () => {
  const [types, source, studio, declarations] = await Promise.all([
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/embed/sticker-forge.d.ts", import.meta.url), "utf8"),
  ]);

  assert.match(types, /export interface StickerImageSource/);
  assert.match(types, /type: "image";\s*\/\*\*[^]*?src: string/);
  assert.match(source, /function imageHasTransparency\(image: HTMLImageElement\)/);
  assert.match(source, /if \(pixels\[index\] < 255\) return true/);
  assert.match(source, /source\.type === "image"\s*\? await renderImageSource\(source\)/);
  assert.match(source, /const canvas = addOutline\(sourceCanvas, outline\)/);
  assert.match(studio, /type SourceMode = "text" \| "image"/);
  assert.match(studio, /accept="image\/\*"/);
  assert.match(studio, /\{ type: "image", src: dataUrl, name: file\.name \}/);
  assert.match(declarations, /export interface StickerImageSource/);
});

test("renders rich text runs with preserved line and inline styles", async () => {
  const source = await readFile(
    new URL("../lib/source.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /source\.richText\?\.blocks/);
  assert.match(source, /run\.fontWeight \?\? defaultWeight/);
  assert.match(source, /run\.fontSize \?\? 28/);
  assert.match(source, /run\.color \?\? source\.color/);
  assert.match(source, /if \(run\.underline && run\.width > 0\)/);
  assert.match(source, /line\.align === "left"/);
  assert.match(source, /line\.align === "right"/);
  assert.match(source, /block\.lineHeight \?\? 1\.2/);
  assert.match(source, /let maxFontSize = 0/);
  assert.match(source, /const lineFontSize = maxFontSize \|\| 28 \* scale/);
  assert.match(source, /Math\.max\(ascent \+ descent, lineFontSize\)/);
  assert.doesNotMatch(source, /Math\.max\(ascent \+ descent, fallbackSize\)/);
});

test("ships the requested two-line rich-text default", async () => {
  const [studio, renderer] = await Promise.all([
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  for (const source of [studio, renderer]) {
    assert.match(source, /text: "PEEL "/);
    assert.match(source, /text: "ME"/);
    assert.match(source, /rgb\(36, 126, 245\)/);
    assert.match(source, /text: "@cats_juice"/);
    assert.match(source, /fontSize: 10/);
    assert.match(source, /lineHeight: 0\.8/);
    assert.match(source, /fontWeight: 500/);
  }
});

test("keeps the smaller logo visually symmetric with the panel toggle", async () => {
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(styles, /\.studio-header \{[^}]*top: 42px;[^}]*left: 34px;/s);
  assert.match(
    styles,
    /\.studio-header \.brand-mark \{[^}]*width: 39px;[^}]*height: 22px;/s,
  );
  assert.match(styles, /\.panel-toggle \{[^}]*top: 36px;[^}]*right: 36px;/s);
});

test("uses one untapered crease across the sticker", async () => {
  const shader = await readFile(
    new URL("../lib/shaders.ts", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(shader, /uInfluence|frontShape|originMask|max\(along/);
  assert.match(shader, /float front = uPeelDepth;/);
  assert.match(shader, /float arcDistance = front - along;/);
  assert.match(shader, /return curved;/);
  assert.match(shader, /vec3 stickerSurfaceNormal\(vec3 base\)/);
  assert.doesNotMatch(shader, /deformedX|deformedY|gl_FrontFacing/);
  assert.match(shader, /float frontMix = smoothstep\(-0\.035, 0\.035, signedFacing\)/);
  assert.match(shader, /clamp\(uMaxAngle, 2\.55, 3\.14159265\)/);
});

test("uses a dense enough mesh for a smooth folded silhouette", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /\? 240/);
  assert.match(renderer, /\? 160/);
  assert.match(renderer, /: 96;/);
  assert.match(renderer, /Math\.round\(longSegments\), 64, 256/);
  assert.match(renderer, /56,\s*192,/);
});

test("caps the rendered sticker with absolute CSS pixel dimensions", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /MAX_STICKER_WIDTH_PX = 760/);
  assert.match(renderer, /MAX_STICKER_HEIGHT_PX = 520/);
  assert.match(renderer, /MAX_STICKER_WIDTH_PX \* worldUnitsPerPixel/);
  assert.match(renderer, /MAX_STICKER_HEIGHT_PX \* worldUnitsPerPixel/);
});

test("recomputes the peel extent for the live drag direction", async () => {
  const [renderer, source] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
  ]);

  assert.match(source, /support: new Float32Array\(support\)/);
  assert.match(renderer, /this\.artwork\.support\.length/);
  assert.match(
    renderer,
    /this\.grabExtent = this\.projectionExtent\(\s*this\.grabOrigin,\s*this\.activeDirection,/,
  );
});

test("snaps a sufficiently peeled sticker to full detachment on release", async () => {
  const [renderer, types] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
  ]);

  assert.match(types, /release: "snap" as const/);
  assert.match(renderer, /SNAP_DETACH_THRESHOLD = 0\.74/);
  assert.match(renderer, /if \(shouldDetach\) \{\s*this\.setCreaseDepth\(this\.grabExtent\)/);
  assert.match(renderer, /release === "snap" && !shouldDetach/);
});

test("always terminates pointer dragging when capture or window focus is lost", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /lostpointercapture/);
  assert.match(renderer, /window\.addEventListener\("pointerup", this\.onWindowPointerEnd, true\)/);
  assert.match(renderer, /window\.addEventListener\("blur", this\.onWindowBlur\)/);
  assert.match(renderer, /document\.addEventListener\("visibilitychange", this\.onVisibilityChange\)/);
  assert.match(renderer, /event\.buttons === 0/);
  assert.match(renderer, /private finishPointerDrag\(timeStamp: number\)/);
});

test("flies a fully detached sticker out instead of freezing the folded mesh", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /private detachedExitActive = false/);
  assert.match(renderer, /if \(shouldDetach\) \{/);
  assert.match(renderer, /this\.detachedExitActive = true/);
  assert.match(renderer, /this\.stickerMesh\.position\.x \+=/);
  assert.match(renderer, /this\.stickerMesh\.position\.y \+=/);
  assert.match(renderer, /this\.detachedExitElapsed >= 0\.46/);
  assert.match(renderer, /this\.stickerMesh\.position\.set\(0, 0, 0\)/);
});

test("re-enters a detached sticker with a centered spring and laser sweep", async () => {
  const [renderer, shader] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
  ]);

  assert.match(renderer, /private startEntranceAnimation\(\)/);
  assert.match(renderer, /this\.meshWidth >= this\.meshHeight \? 1 : 0/);
  assert.match(renderer, /this\.meshWidth >= this\.meshHeight \? 0 : -1/);
  assert.match(renderer, /this\.uniforms\.uEntranceScaleProgress\.value = 0/);
  assert.match(renderer, /this\.uniforms\.uEntranceScaleProgress\.value = scaleProgress/);
  assert.match(renderer, /const sweepStart = ENTRANCE_SWEEP_DELAY/);
  assert.match(renderer, /ENTRANCE_SWEEP_DELAY = 0\.06/);
  assert.match(renderer, /this\.startEntranceAnimation\(\)/);
  assert.match(shader, /vec3 scaleEntranceSlice\(vec3 base\)/);
  assert.match(shader, /uEntranceScaleProgress \* 1\.42 - entranceCoordinate \* 0\.42/);
  assert.match(shader, /exp\(-3\.8 \* sliceProgress\) \* cos\(9\.0 \* sliceProgress\)/);
  assert.match(shader, /float sliceScale = mix\(0\.6, 1\.0, springResponse\)/);
  assert.match(shader, /base\.xy \*= sliceScale/);
  assert.doesNotMatch(shader, /startAnchor/);
  assert.match(shader, /uniform float uEntranceSweep/);
  assert.match(shader, /float laserCore = 1\.0 - smoothstep/);
  assert.match(shader, /vec3 laserColor = 0\.58 \+ 0\.42 \* cos/);
  assert.match(shader, /color \+= laserColor \* \(laserCore \* 0\.62 \+ laserHalo \* 0\.16\)/);
  assert.match(renderer, /ENTRANCE_SWEEP_DURATION = 0\.42/);
});

test("highlights only the draggable edge after a missed canvas press", async () => {
  const [renderer, shader] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
  ]);

  assert.match(renderer, /if \(!hit\) \{\s*this\.startInteractionHint\(\)/);
  assert.match(renderer, /INTERACTION_HINT_COLOR = "#615cff"/);
  assert.match(renderer, /INTERACTION_HINT_DURATION = 0\.9/);
  assert.match(renderer, /this\.interactionHintActive \|\|/);
  assert.match(
    renderer,
    /uInteractionHintRadius\.value = this\.artwork[\s\S]*?this\.options\.peel\.grabWidth \* textureScale/,
  );
  assert.match(shader, /hitArea \* 0\.1 \* uInteractionHint/);
  assert.match(shader, /float interactionHitArea\(/);
  assert.match(shader, /float innerLineWidth = max\(2\.0,/);
  assert.match(shader, /innerEdgeOuter - innerEdgeInner/);
  assert.match(shader, /float innerEdge =/);
  assert.match(
    shader,
    /max\(edge, innerEdge\) \* dash \* uInteractionHint/,
  );
  assert.doesNotMatch(shader, /gl_FragCoord\.y\) \* 0\.72 - uTime/);
});

test("preserves a rich-text selection before committing a font size", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    studio,
    /const savedRange = selectionRef\.current\?\.cloneRange\(\) \?\? null;\s*const savedOffsets = selectionOffsetsRef\.current/,
  );
  assert.match(studio, /document\.createTreeWalker\(editor, NodeFilter\.SHOW_TEXT\)/);
  assert.match(studio, /savedOffsets\.end > savedOffsets\.start/);
  assert.match(studio, /span\.style\.fontSize = `\$\{nextSize\}px`/);
  assert.match(studio, /if \(event\.key !== "Enter"\) return;\s*event\.preventDefault\(\);\s*event\.currentTarget\.blur\(\)/);
});

test("projects shadows in the sticker material without a receiver seam", async () => {
  const [shader, renderer] = await Promise.all([
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(shader, /vCreaseDistance|contactShadow|peeledMaterial/);
  assert.match(shader, /vec3 color = mix\(backColor, frontColor, frontMix\)/);
  assert.doesNotMatch(shader, /selfShadowVertexShader|selfShadowFragmentShader/);
  assert.doesNotMatch(renderer, /selfShadowLayers|selfShadowMeshes/);
  assert.doesNotMatch(renderer, /shadowLayers|shadowMeshes|shadowMaterials/);
  assert.doesNotMatch(shader, /shadowVertexShader|shadowFragmentShader/);
  assert.doesNotMatch(shader, /uShadowLayer|uLayerWeight|uBlurScale/);
  assert.match(shader, /peelShadowDepthVertexShader/);
  assert.doesNotMatch(shader, /vCasterMask/);
  assert.match(shader, /if \(artworkAlpha < 0\.04\) discard/);
  assert.doesNotMatch(shader, /vCrease/);
  assert.doesNotMatch(shader, /float rim|mix\(0\.9, 1\.0, rim\)/);
  assert.doesNotMatch(shader, /stickerShadowReceiver/);
  assert.doesNotMatch(renderer, /stickerShadowReceiver/);
  assert.match(shader, /curved\.z = elevation/);
  assert.doesNotMatch(shader, /max\(0\.008, elevation\)/);
  assert.match(shader, /float flutterEnvelope = sin\(normalizedPeel \* 3\.14159265\)/);
  assert.match(shader, /curved\.xy \+= tangent \* windDisplacement \* 0\.04/);
  assert.match(shader, /curved\.xy \+= direction \* windDisplacement \* 0\.01/);
  assert.match(shader, /float projectedShadow = \(1\.0 - getShadowMask\(\)\) \* vAdhered/);
  assert.match(shader, /float frontDiffuse = mix\(1\.0, 0\.76 \+ 0\.24 \* normalLight, frontDeformation\)/);
  assert.match(shader, /#include <colorspace_fragment>/);
  assert.match(renderer, /renderer\.shadowMap\.enabled = true/);
  assert.match(renderer, /stickerMesh\.castShadow = true/);
  assert.match(renderer, /stickerMesh\.receiveShadow = true/);
  assert.match(renderer, /groundShadowMesh\.receiveShadow = true/);
  assert.match(renderer, /new THREE\.ShadowMaterial/);
  assert.match(renderer, /groundShadowMesh\.position\.z = -0\.012/);
  assert.match(renderer, /shadow\.normalBias = 0\.0015/);
});

test("drives processed peel foley from motion instead of absolute progress", async () => {
  const [audioController, renderer, asset] = await Promise.all([
    readFile(new URL("../lib/peel-audio.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    stat(
      new URL(
        "../lib/assets/elevenlabs-sticker-peel-foley.mp3",
        import.meta.url,
      ),
    ),
  ]);

  assert.ok(asset.size > 10_000);
  assert.match(audioController, /class PeelAudioEngine/);
  assert.match(audioController, /BUILT_IN_PROFILE/);
  assert.match(audioController, /PROCESSED_SOURCE_START = 0\.16/);
  assert.match(audioController, /smoothedVelocity/);
  assert.match(audioController, /HOLD_SILENCE_MS = 48/);
  assert.match(audioController, /playReattach/);
  assert.match(audioController, /playFinish/);
  assert.match(audioController, /fullyDetached/);
  assert.match(
    audioController,
    /this\.fullyDetached && nextProgress >= FINISH_REARM/,
  );
  assert.doesNotMatch(audioController, /getReversedBuffer|seek\(progress/);
  assert.match(renderer, /peelAudio\.begin\(this\.state\.progress/);
  assert.match(renderer, /peelAudio\.update\(/);
  assert.match(renderer, /peelAudio\.end\(this\.state\.progress\)/);
  assert.doesNotMatch(renderer, /peelAudio\.seek/);
});
