export type ParticleEffectSettings = {
  particleSize: number;
  spread: number;
  speedMin: number;
  speedMax: number;
  chaos: number;
  durationMin: number;
  durationMax: number;
  swayAmplitude: number;
  swaySpeed: number;
  shrinkDelay: number;
  shrinkDuration: number;
  entranceDelay: number;
};

export const DEFAULT_PARTICLE_EFFECT_SETTINGS: ParticleEffectSettings = {
  particleSize: 2.5,
  spread: 0.7,
  speedMin: 0.25,
  speedMax: 2.35,
  chaos: 0.9,
  durationMin: 300,
  durationMax: 1640,
  swayAmplitude: 29,
  swaySpeed: 1.6,
  shrinkDelay: 0,
  shrinkDuration: 50,
  entranceDelay: 130,
};

const SHRINK_MARGIN = 10;
let settings = { ...DEFAULT_PARTICLE_EFFECT_SETTINGS };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeParticleEffectSettings(
  value: ParticleEffectSettings,
): ParticleEffectSettings {
  const speedMin = clamp(value.speedMin, 0.2, 3);
  const speedMax = clamp(value.speedMax, speedMin, 4);
  const durationMin = clamp(value.durationMin, 300, 6000);
  const durationMax = clamp(value.durationMax, durationMin, 8000);
  const shrinkDelay = clamp(value.shrinkDelay, 0, durationMin - 60);
  const shrinkDuration = clamp(
    value.shrinkDuration,
    50,
    durationMin - shrinkDelay - SHRINK_MARGIN,
  );
  return {
    particleSize: clamp(value.particleSize, 1, 4),
    spread: clamp(value.spread, 0.1, 3),
    speedMin,
    speedMax,
    chaos: clamp(value.chaos, 0, 3),
    durationMin,
    durationMax,
    swayAmplitude: clamp(value.swayAmplitude, 0, 80),
    swaySpeed: clamp(value.swaySpeed, 0, 10),
    shrinkDelay,
    shrinkDuration,
    entranceDelay: clamp(value.entranceDelay, 0, durationMax),
  };
}

export function getParticleEffectSettings(): Readonly<ParticleEffectSettings> {
  return settings;
}

export function updateParticleEffectSettings(
  patch: Partial<ParticleEffectSettings>,
) {
  settings = normalizeParticleEffectSettings({ ...settings, ...patch });
  return settings;
}
