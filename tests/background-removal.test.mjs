import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("ships a local, permissively licensed background-removal path", async () => {
  const [packageJson, worker, studio, effect, styles, shaders, renderer, notices] = await Promise.all([
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
  ]);

  assert.match(packageJson, /"@huggingface\/transformers"/);
  assert.match(worker, /BritishWerewolf\/U-2-Netp/);
  assert.match(
    worker,
    /import \{ AutoModel, RawImage, Tensor \} from "@huggingface\/transformers"/,
  );
  assert.doesNotMatch(worker, /await import\(\s*"@huggingface\/transformers"/);
  assert.match(worker, /device:\s*"wasm"/);
  assert.match(worker, /type:\s*"progress"/);
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
  assert.match(effect, /const baseDirection = -Math\.PI \* 0\.22/);
  assert.match(effect, /const PARTICLE_LAUNCH_WINDOW_MS = 1_000/);
  assert.match(
    effect,
    /delays\[index\] \* PARTICLE_LAUNCH_WINDOW_MS/,
  );
  assert.match(effect, /lifetime \* 0\.35/);
  assert.match(effect, /Math\.exp\(-8 \* movementProgress \* movementProgress\)/);
  assert.match(effect, /const terminalDrift = 0\.08/);
  assert.match(
    effect,
    /movementProgress\s*\*\s*movementProgress\s*\*\s*movementProgress\s*\*\s*terminalDrift/,
  );
  assert.match(effect, /lifetime - particleShrinkDuration/);
  assert.match(effect, /particleSpeeds\[pixelCount\]/);
  assert.match(effect, /particleLifetimes\[pixelCount\]/);
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
  assert.match(renderer, /this\.applyArtwork\(artwork, texture\)/);
  assert.match(renderer, /const PRE_ENTRANCE_DURATION = 0\.32/);
  assert.match(renderer, /uPreparedMix\.value = easedProgress/);
  assert.match(renderer, /uPreEntranceProgress\.value = easedProgress/);
  assert.match(renderer, /this\.startEntranceAnimation\(\)/);
  assert.match(shaders, /printSample = mix\(printSample, preparedSample, uPreparedMix\)/);
  assert.match(shaders, /base\.xy \*= mix\(1\.0, 0\.6, preEntrance\)/);
  assert.match(shaders, /if \(printSample\.a < 0\.1\) discard/);
  assert.match(shaders, /if \(artworkAlpha < 0\.1/);
  assert.match(styles, /\.background-removal-particles\s*\{[\s\S]*?z-index:\s*0/);
  assert.match(styles, /background-removal-tip-float-left/);
  assert.doesNotMatch(styles, /background-removal-outline-flash/);
  assert.match(notices, /U-2-Netp/);
  assert.match(notices, /Apache License 2\.0/);
});
