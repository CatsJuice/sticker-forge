import assert from "node:assert/strict";
import { createHash } from "node:crypto";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

import {
  createParticleFixture,
  drawBaselineFrame,
  PARITY_TIMESTAMPS_MS,
  prepareBaselineParticles,
  verifyParticleParity,
} from "./performance/background-removal-particles.mjs";

async function loadBackgroundRemovalEffectModule(source) {
  const compiled = ts.transpileModule(source, {
    compilerOptions: {
      target: ts.ScriptTarget.ES2022,
      module: ts.ModuleKind.ESNext,
      jsx: ts.JsxEmit.ReactJSX,
    },
  }).outputText;
  const executable = compiled
    .replace(
      /import \{ jsx as _jsx \} from "react\/jsx-runtime";/,
      "const _jsx = () => null;",
    )
    .replace(
      /import \{ useEffect, useRef \} from "react";/,
      "const useEffect = () => {}; const useRef = (current) => ({ current });",
    )
    .replace(
      /import \{ getParticleEffectSettings,\s*\} from "@\/lib\/particle-debug";/,
      "const getParticleEffectSettings = () => ({});",
    );
  return import(
    `data:text/javascript;base64,${Buffer.from(executable).toString("base64")}`
  );
}

function typedArrayBytes(state) {
  return Object.values(state).reduce(
    (total, value) =>
      ArrayBuffer.isView(value) ? total + value.byteLength : total,
    0,
  );
}

function sourceSection(source, startMarker, endMarker) {
  const start = source.indexOf(startMarker);
  assert.notEqual(start, -1, `missing source marker: ${startMarker}`);
  const end = source.indexOf(endMarker, start + startMarker.length);
  assert.notEqual(end, -1, `missing source marker: ${endMarker}`);
  return source.slice(start, end);
}

test("ships a local, permissively licensed background-removal path", async () => {
  const [
    packageJson,
    worker,
    studio,
    effect,
    styles,
    shaders,
    renderer,
    notices,
    model,
    modelConfig,
    modelLicense,
    modelSource,
    client,
    viteConfig,
  ] = await Promise.all([
    readFile(new URL("../package.json", import.meta.url), "utf8"),
    readFile(
      new URL("../workers/background-removal.worker.ts", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/BackgroundRemovalEffect.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../THIRD_PARTY_NOTICES.md", import.meta.url), "utf8"),
    readFile(
      new URL(
        "../public/models/BritishWerewolf/U-2-Netp/onnx/model.onnx",
        import.meta.url,
      ),
    ),
    readFile(
      new URL(
        "../public/models/BritishWerewolf/U-2-Netp/config.json",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../public/models/BritishWerewolf/U-2-Netp/LICENSE",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(
      new URL(
        "../public/models/BritishWerewolf/U-2-Netp/SOURCE.md",
        import.meta.url,
      ),
      "utf8",
    ),
    readFile(new URL("../lib/background-removal.ts", import.meta.url), "utf8"),
    readFile(new URL("../vite.config.ts", import.meta.url), "utf8"),
  ]);

  assert.match(packageJson, /"@huggingface\/transformers"/);
  assert.match(worker, /BritishWerewolf\/U-2-Netp/);
  assert.match(
    worker,
    /import \{ AutoModel, env, RawImage, Tensor \} from "@huggingface\/transformers"/,
  );
  assert.doesNotMatch(worker, /await import\(\s*"@huggingface\/transformers"/);
  assert.match(worker, /env\.allowLocalModels\s*=\s*true/);
  assert.match(worker, /env\.allowRemoteModels\s*=\s*false/);
  assert.match(worker, /env\.localModelPath\s*=\s*LOCAL_MODEL_PATH/);
  assert.match(worker, /const LOCAL_MODEL_PATH\s*=\s*"\/models\/"/);
  assert.match(worker, /device:\s*"wasm"/);
  assert.match(worker, /type:\s*"progress"/);
  assert.match(client, /request\.retries < 1/);
  assert.match(client, /tryPostWorkerRequest\(restartedWorker, id, request\)/);
  assert.match(client, /workerFailureMessage\(event\)/);
  assert.match(client, /window\.setTimeout\(\(\) =>/);
  assert.match(
    viteConfig,
    /optimizeDeps:\s*\{[\s\S]*?include:\s*\["@huggingface\/transformers"\]/,
  );
  assert.match(worker, /MATTE_BLACK_POINT\s*=\s*0\.12/);
  assert.match(worker, /MATTE_WHITE_POINT\s*=\s*0\.78/);
  assert.match(worker, /clipped \* clipped \* \(3 - 2 \* clipped\)/);
  assert.match(worker, /cleanedAlpha \* sourceAlpha \* 255/);
  assert.match(studio, /removeCurrentImageBackground/);
  assert.match(studio, /BACKGROUND_REMOVAL_TIP_SEEN_KEY/);
  assert.match(studio, /backgroundRemovalTipShownRef/);
  assert.match(
    studio,
    /localStorage\.setItem\(\s*BACKGROUND_REMOVAL_TIP_SEEN_KEY,\s*"true"/,
  );
  assert.match(studio, /imageSourceHasTransparency\(dataUrl\)/);
  assert.match(studio, /className="background-removal-tip"/);
  assert.match(studio, /createPortal/);
  assert.match(studio, /getBoundingClientRect/);
  assert.match(studio, /onPointerEnter/);
  assert.match(studio, /试试移除背景/);
  assert.match(studio, /Try removing the background/);
  assert.match(studio, /setBackgroundRemovalEffect\(true\)/);
  assert.match(studio, /handleBackgroundParticlesStart/);
  assert.match(studio, /LASER_PREVIEW_EVENT/);
  assert.match(studio, /getLaserEffectSettings\(\)\.sweepDuration \+ 80/);
  assert.match(studio, /getParticleEffectSettings\(\)\.entranceDelay/);
  assert.match(studio, /BackgroundRemovalEffect/);
  assert.match(effect, /x \+= 1/);
  assert.match(effect, /y \+= 1/);
  assert.match(effect, /context\.putImageData/);
  assert.match(effect, /drawFrame\(0\)/);
  assert.match(effect, /readyRef\.current\(\)/);
  assert.match(effect, /if \(playing\) startAnimationRef\.current\?\.\(\)/);
  assert.match(effect, /startRef\.current\(\)/);
  assert.match(effect, /const maximumShoulder = Math\.ceil/);
  assert.match(effect, /particleSettings\.shrinkDelay/);
  assert.match(effect, /particleSettings\.shrinkDuration/);
  assert.match(effect, /shoulderAlpha/);
  assert.match(effect, /const direction/);
  assert.match(
    effect,
    /const BASE_PARTICLE_DIRECTION = -Math\.PI \* 0\.22/,
  );
  assert.match(effect, /const PARTICLE_LAUNCH_WINDOW_MS = 1_000/);
  assert.match(effect, /countRemovedPixels\(original, retained\)/);
  assert.match(effect, /new Float32Array\(pixelCount\)/);
  assert.doesNotMatch(effect, /new Float64Array\(pixelCount\)/);
  assert.doesNotMatch(effect, /new Float32Array\(maximumPixels\)/);
  assert.match(effect, /lifetime \* 0\.35/);
  assert.match(effect, /Math\.exp\(-8 \* movementProgress \* movementProgress\)/);
  assert.match(effect, /const terminalDrift = 0\.08/);
  assert.match(
    effect,
    /movementProgress\s*\*\s*movementProgress\s*\*\s*movementProgress\s*\*\s*terminalDrift/,
  );
  assert.match(effect, /lifetime - particleShrinkDuration/);
  assert.match(effect, /delays\[index\] \* PARTICLE_LAUNCH_WINDOW_MS/);
  assert.match(effect, /Math\.max\(1, lifetime - launchDelay\)/);
  assert.equal(effect.match(/Math\.cos\(direction\)/g)?.length, 1);
  assert.equal(effect.match(/Math\.sin\(direction\)/g)?.length, 1);
  assert.match(effect, /const tangentX = -directionSine/);
  assert.match(effect, /const tangentY = directionCosine/);
  assert.match(effect, /swayFrequencies\[index\]/);
  assert.match(effect, /particleSize \* \(1 - easedShrink\)/);
  assert.match(
    effect,
    /colors\[colorIndex \+ 3\] \* \(1 - movementProgress\)/,
  );
  assert.match(effect, /tangentX \* sway/);
  assert.match(effect, /elapsed < particleSettings\.durationMax \+ 100/);
  assert.match(effect, /const tiltRadians = \(-tilt \* Math\.PI\) \/ 180/);
  assert.doesNotMatch(effect, /Math\.random/);
  assert.doesNotMatch(effect, /context\.ellipse/);
  assert.doesNotMatch(effect, /context\.fillRect/);
  assert.doesNotMatch(shaders, /uBackgroundRemovalSweep|removalDistortion/);
  assert.match(shaders, /uBackgroundRemovalDistortion/);
  assert.match(shaders, /waterWaveA/);
  assert.match(shaders, /waterWaveB/);
  assert.match(shaders, /waterWaveC/);
  assert.match(
    renderer,
    /uBackgroundRemovalDistortion\.value = active \? 1 : 0/,
  );
  assert.match(renderer, /this\.uniforms\.uEntranceSweep\.value = Math\.min/);
  assert.match(renderer, /this\.applyLaserEffectSettings\(\)/);
  assert.match(studio, /backgroundParticlesReadyRef/);
  assert.match(studio, /preparedBackgroundOutlineRef/);
  assert.match(studio, /controller\.prepareSource\(nextSource/);
  assert.match(studio, /prepared\.source\.commitWithEntrance\(\)/);
  assert.match(studio, /requestAnimationFrame\(\(\) => requestAnimationFrame/);
  assert.match(studio, /\{ \.\.\.current, playing: true \}/);
  assert.match(
    studio,
    /handleBackgroundParticlesStart = useCallback\(\s*\(revision: number\)/,
  );
  assert.match(renderer, /async prepareSource\(/);
  assert.match(renderer, /this\.renderer\.initTexture\(texture\)/);
  assert.match(
    renderer,
    /this\.applyArtwork\(prepared\.artwork, prepared\.texture\)/,
  );
  assert.match(renderer, /const PRE_ENTRANCE_DURATION = 0\.32/);
  assert.match(renderer, /uPreparedMix\.value = easedProgress/);
  assert.match(renderer, /uPreEntranceProgress\.value = easedProgress/);
  assert.match(renderer, /this\.startEntranceAnimation\(\)/);
  assert.match(
    shaders,
    /artwork = mix\([\s\S]*?texture2D\(uPreparedMap, safeUv\),[\s\S]*?uPreparedMix/,
  );
  assert.match(shaders, /base\.xy \*= mix\(1\.0, 0\.6, preEntrance\)/);
  assert.match(shaders, /if \(printSample\.a < 0\.1\) discard/);
  assert.match(shaders, /if \(artworkAlpha < 0\.1/);
  assert.match(styles, /\.background-removal-particles\s*\{[\s\S]*?z-index:\s*0/);
  assert.match(styles, /background-removal-tip-float-left/);
  assert.doesNotMatch(styles, /background-removal-outline-flash/);
  assert.match(notices, /U-2-Netp/);
  assert.match(notices, /Apache License 2\.0/);
  assert.equal(model.byteLength, 4_574_861);
  assert.equal(
    createHash("sha256").update(model).digest("hex"),
    "309c8469258dda742793dce0ebea8e6dd393174f89934733ecc8b14c76f4ddd8",
  );
  assert.equal(JSON.parse(modelConfig).model_type, "u2net");
  assert.match(modelLicense, /Apache License/);
  assert.match(
    modelSource,
    /7112208dbac3a3642496c8d54e2f0f9bb3dc1dc8/,
  );
});

test("background removal snapshots the latest gallery image synchronously", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );
  const updateCurrentImage = sourceSection(
    studio,
    "const updateCurrentImage = useCallback",
    "const [settings, setSettings]",
  );
  const applyGalleryAsset = sourceSection(
    studio,
    "const applyGalleryAssetToEditor = useCallback",
    "const updateTextSource = useCallback",
  );
  const removeBackground = sourceSection(
    studio,
    "const removeCurrentImageBackground = useCallback",
    "const previewLaser = () =>",
  );

  assert.match(
    updateCurrentImage,
    /currentImageRef\.current = \{ src, name \};[\s\S]*?setImageDataUrl\(src\);[\s\S]*?setImageName\(name\)/,
  );
  assert.match(
    applyGalleryAsset,
    /updateCurrentImage\(source\.src, source\.name \?\? ""\)/,
  );
  assert.ok(
    applyGalleryAsset.indexOf(
      'updateCurrentImage(source.src, source.name ?? "")',
    ) < applyGalleryAsset.indexOf("await applySource(source)"),
  );
  assert.match(
    removeBackground,
    /const currentImage = currentImageRef\.current/,
  );
  assert.match(
    removeBackground,
    /const originalSource = currentImage\.src/,
  );
  assert.match(
    removeBackground,
    /const originalName = currentImage\.name/,
  );
  assert.match(
    removeBackground,
    /removeImageBackground\(originalSource/,
  );
  assert.match(removeBackground, /name: originalName/);
  assert.match(removeBackground, /source: originalSource/);
  assert.doesNotMatch(
    removeBackground,
    /const originalSource = imageDataUrl|name: imageName/,
  );
});

test("gallery handoff blocks and invalidates removal work for the previous image", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );
  const applyGalleryAsset = sourceSection(
    studio,
    "const applyGalleryAssetToEditor = useCallback",
    "const updateTextSource = useCallback",
  );
  const removeBackground = sourceSection(
    studio,
    "const removeCurrentImageBackground = useCallback",
    "const previewLaser = () =>",
  );
  const removalButton = sourceSection(
    studio,
    'className="background-removal-button"',
    "aria-describedby=",
  );
  const quickEditStart = sourceSection(
    studio,
    "onPreviewEdit={(item, origin) => {",
    "{galleryQuickEdit ? (",
  );
  const quickEditFlight = sourceSection(
    studio,
    "{galleryQuickEdit ? (",
    '<span className="sr-only"',
  );

  assert.match(
    applyGalleryAsset,
    /backgroundRemovalRevisionRef\.current \+= 1/,
  );
  assert.match(
    applyGalleryAsset,
    /setBackgroundParticles\(null\)/,
  );
  assert.match(
    applyGalleryAsset,
    /setBackgroundRemoval\(\{ phase: "idle" \}\)/,
  );
  assert.match(
    applyGalleryAsset,
    /setBackgroundRemovalEffect\(false\)/,
  );
  assert.ok(
    applyGalleryAsset.indexOf("backgroundRemovalRevisionRef.current += 1")
      < applyGalleryAsset.indexOf("await applySource(source)"),
  );
  const workerCompletion = removeBackground.indexOf(
    "const result = await removeImageBackground",
  );
  const progressRevisionGuard = removeBackground.indexOf(
    "if (revision !== backgroundRemovalRevisionRef.current) return;",
    workerCompletion,
  );
  const resultRevisionGuard = removeBackground.indexOf(
    "if (revision !== backgroundRemovalRevisionRef.current) return;",
    progressRevisionGuard
      + "if (revision !== backgroundRemovalRevisionRef.current) return;".length,
  );
  const particleCommit = removeBackground.indexOf(
    "setBackgroundParticles({",
    resultRevisionGuard,
  );
  assert.ok(workerCompletion >= 0);
  assert.ok(progressRevisionGuard > workerCompletion);
  assert.ok(resultRevisionGuard > progressRevisionGuard);
  assert.ok(particleCommit > resultRevisionGuard);
  assert.match(
    removeBackground,
    /imageImportBusy \|\|[\s\S]*?galleryEditing \|\|/,
  );
  assert.match(
    removalButton,
    /disabled=\{(?=[^}]*backgroundRemovalBusy)(?=[^}]*imageImportBusy)(?=[^}]*galleryEditing)[^}]*\}/,
  );
  const galleryEditingStart = quickEditStart.indexOf("setGalleryEditing(true)");
  const quickEditCreation = quickEditStart.indexOf("setGalleryQuickEdit({");
  assert.ok(galleryEditingStart >= 0);
  assert.ok(quickEditCreation > galleryEditingStart);
  assert.match(
    quickEditFlight,
    /onComplete=\{\(\) => \{[\s\S]*?setGalleryQuickEdit\(null\);[\s\S]*?setGalleryEditing\(false\)/,
  );
});

test("background-removal particle optimization preserves every rendered pixel", async () => {
  const fixture = createParticleFixture({
    drawWidth: 96,
    drawHeight: 72,
    canvasWidth: 144,
    canvasHeight: 108,
    removalRatio: 0.47,
    tiltDegrees: -11,
  });
  const { baseline, optimized, pixelCount, checksums } =
    verifyParticleParity(fixture);
  const effectSource = await readFile(
    new URL("../app/BackgroundRemovalEffect.tsx", import.meta.url),
    "utf8",
  );
  const effectModule = await loadBackgroundRemovalEffectModule(effectSource);
  const actualParticles =
    effectModule.prepareBackgroundRemovalParticles(fixture);
  const actualOutput = new Uint8ClampedArray(
    fixture.canvasWidth * fixture.canvasHeight * 4,
  );
  const baselineOutput = new Uint8ClampedArray(actualOutput.length);
  const renderActualFrame =
    effectModule.createBackgroundRemovalParticleFrameRenderer({
      particles: actualParticles,
      particleSettings: fixture.particleSettings,
      canvasWidth: fixture.canvasWidth,
      canvasHeight: fixture.canvasHeight,
      outputPixels: actualOutput,
    });
  const directBaseline = prepareBaselineParticles(fixture);

  assert.ok(pixelCount > 0);
  assert.equal(checksums.length, 10);
  for (let index = 0; index < PARITY_TIMESTAMPS_MS.length; index += 1) {
    const elapsed = PARITY_TIMESTAMPS_MS[index];
    const { before, after } = checksums[index];
    assert.equal(after, before);
    drawBaselineFrame(directBaseline, fixture, elapsed, baselineOutput);
    renderActualFrame(elapsed);
    assert.deepEqual(actualOutput, baselineOutput);
    assert.equal(
      createHash("sha256").update(actualOutput).digest("hex"),
      before,
    );
  }

  assert.equal(baseline.sourceX.length, fixture.drawWidth * fixture.drawHeight);
  for (const [name, value] of Object.entries(actualParticles)) {
    if (!ArrayBuffer.isView(value)) continue;
    assert.equal(
      value.length,
      name === "colors" ? pixelCount * 4 : pixelCount,
      `${name} must be allocated for the exact removed-pixel count`,
    );
  }
  assert.equal(optimized.pixelCount, actualParticles.pixelCount);

  for (const removalRatio of [0.1, 0.5, 0.9, 1]) {
    const densityFixture = createParticleFixture({
      drawWidth: 48,
      drawHeight: 36,
      canvasWidth: 72,
      canvasHeight: 54,
      removalRatio,
      tiltDegrees: 13,
    });
    const densityParity = verifyParticleParity(densityFixture);
    const densityBaseline = prepareBaselineParticles(densityFixture);
    const densityActual =
      effectModule.prepareBackgroundRemovalParticles(densityFixture);
    const expectedPixelCount = Math.round(
      densityFixture.drawWidth
        * densityFixture.drawHeight
        * removalRatio,
    );
    const baselineBytes = typedArrayBytes(densityBaseline);
    const actualBytes = typedArrayBytes(densityActual);

    assert.equal(densityParity.pixelCount, expectedPixelCount);
    assert.equal(densityActual.pixelCount, expectedPixelCount);
    assert.equal(actualBytes, expectedPixelCount * 44);
    assert.ok(
      actualBytes <= baselineBytes,
      `particle state regressed at ${removalRatio * 100}% removal`,
    );

    const densityBaselineOutput = new Uint8ClampedArray(
      densityFixture.canvasWidth * densityFixture.canvasHeight * 4,
    );
    const densityActualOutput =
      new Uint8ClampedArray(densityBaselineOutput.length);
    const renderDensityActualFrame =
      effectModule.createBackgroundRemovalParticleFrameRenderer({
        particles: densityActual,
        particleSettings: densityFixture.particleSettings,
        canvasWidth: densityFixture.canvasWidth,
        canvasHeight: densityFixture.canvasHeight,
        outputPixels: densityActualOutput,
      });

    for (const elapsed of PARITY_TIMESTAMPS_MS) {
      drawBaselineFrame(
        densityBaseline,
        densityFixture,
        elapsed,
        densityBaselineOutput,
      );
      renderDensityActualFrame(elapsed);
      assert.deepEqual(
        densityActualOutput,
        densityBaselineOutput,
        `rendered pixels differ at ${removalRatio * 100}% and ${elapsed}ms`,
      );
    }
  }
});
