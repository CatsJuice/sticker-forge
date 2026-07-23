import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("loads the global Tweakpane effect controls only in debug mode", async () => {
  const [packageJson, layout, panel, settings, laserSettings, effect, notices] =
    await Promise.all([
      readFile(new URL("../package.json", import.meta.url), "utf8"),
      readFile(new URL("../app/layout.tsx", import.meta.url), "utf8"),
      readFile(new URL("../app/DebugPanel.tsx", import.meta.url), "utf8"),
      readFile(new URL("../lib/particle-debug.ts", import.meta.url), "utf8"),
      readFile(new URL("../lib/laser-debug.ts", import.meta.url), "utf8"),
      readFile(
        new URL("../app/BackgroundRemovalEffect.tsx", import.meta.url),
        "utf8",
      ),
      readFile(new URL("../THIRD_PARTY_NOTICES.md", import.meta.url), "utf8"),
    ]);

  assert.match(packageJson, /"tweakpane"/);
  assert.match(layout, /<DebugPanel \/>/);
  assert.match(panel, /params\.get\("debug"\) !== "true"/);
  assert.match(panel, /import\("tweakpane"\)/);
  for (const label of [
    "粒子大小",
    "扩散范围",
    "最小扩散速度",
    "最大扩散速度",
    "混乱强度",
    "最短消散时长",
    "最长消散时长",
    "摆动幅度",
    "摆动速度",
    "缩小延迟",
    "缩小时长",
    "贴纸入场延迟",
  ]) {
    assert.match(panel, new RegExp(label));
  }
  for (const label of [
    "扫描时长",
    "循环时长",
    "核心宽度",
    "光带宽度",
    "光带透明度",
    "光带亮度",
    "高光强度",
    "扭曲范围",
    "扭曲强度",
    "波纹密度",
    "波纹速度",
  ]) {
    assert.match(panel, new RegExp(label));
  }
  for (const label of [
    "Particle size",
    "Spread range",
    "Minimum spread speed",
    "Maximum spread speed",
    "Chaos intensity",
    "Minimum lifetime",
    "Maximum lifetime",
    "Sway amplitude",
    "Sway speed",
    "Shrink delay",
    "Shrink duration",
    "Sticker entrance delay",
  ]) {
    assert.match(panel, new RegExp(label));
  }
  assert.match(panel, /MutationObserver/);
  assert.match(panel, /attributeFilter: \["lang"\]/);
  assert.match(panel, /\[locale\]/);
  assert.match(settings, /durationMin - shrinkDelay - SHRINK_MARGIN/);
  assert.match(settings, /particleSize:\s*2\.5/);
  assert.match(settings, /spread:\s*0\.7/);
  assert.match(settings, /speedMin:\s*0\.25/);
  assert.match(settings, /speedMax:\s*2\.35/);
  assert.match(settings, /chaos:\s*0\.9/);
  assert.match(settings, /durationMin:\s*300/);
  assert.match(settings, /durationMax:\s*1640/);
  assert.match(settings, /swayAmplitude:\s*29/);
  assert.match(settings, /swaySpeed:\s*1\.6/);
  assert.match(settings, /shrinkDelay:\s*0/);
  assert.match(settings, /shrinkDuration:\s*50/);
  assert.match(settings, /entranceDelay:\s*130/);
  assert.match(settings, /entranceDelay: clamp\(value\.entranceDelay, 0, durationMax\)/);
  assert.match(laserSettings, /cycleDuration,\s*sweepDuration \+ CYCLE_MARGIN/);
  assert.match(laserSettings, /sweepDuration:\s*950/);
  assert.match(laserSettings, /cycleDuration:\s*1210/);
  assert.match(laserSettings, /coreWidth:\s*0\.04/);
  assert.match(laserSettings, /bandWidth:\s*0\.3/);
  assert.match(laserSettings, /bandOpacity:\s*0\.46/);
  assert.match(laserSettings, /brightness:\s*1\.18/);
  assert.match(laserSettings, /highlightIntensity:\s*0\.62/);
  assert.match(laserSettings, /distortionRange:\s*0\.41/);
  assert.match(laserSettings, /distortionStrength:\s*3\.15/);
  assert.match(laserSettings, /rippleDensity:\s*18/);
  assert.match(laserSettings, /rippleSpeed:\s*6/);
  assert.match(panel, /updateLaserEffectSettings/);
  assert.match(panel, /addButton\(\{ title: t\.previewLaser \}\)/);
  assert.match(panel, /LASER_PREVIEW_EVENT/);
  assert.match(
    laserSettings,
    /sticker-forge:preview-background-removal-laser/,
  );
  assert.match(effect, /getParticleEffectSettings\(\)/);
  assert.match(notices, /tweakpane/);
  assert.match(notices, /MIT License/);
});
