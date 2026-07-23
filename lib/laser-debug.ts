export type LaserEffectSettings = {
  sweepDuration: number;
  cycleDuration: number;
  coreWidth: number;
  bandWidth: number;
  bandOpacity: number;
  brightness: number;
  highlightIntensity: number;
  distortionRange: number;
  distortionStrength: number;
  rippleDensity: number;
  rippleSpeed: number;
};

export const DEFAULT_LASER_EFFECT_SETTINGS: LaserEffectSettings = {
  sweepDuration: 950,
  cycleDuration: 1210,
  coreWidth: 0.04,
  bandWidth: 0.3,
  bandOpacity: 0.46,
  brightness: 1.18,
  highlightIntensity: 0.62,
  distortionRange: 0.41,
  distortionStrength: 3.15,
  rippleDensity: 18,
  rippleSpeed: 6,
};

export const LASER_PREVIEW_EVENT =
  "sticker-forge:preview-background-removal-laser";

const CYCLE_MARGIN = 50;
let settings = { ...DEFAULT_LASER_EFFECT_SETTINGS };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

function normalizeLaserEffectSettings(
  value: LaserEffectSettings,
): LaserEffectSettings {
  const sweepDuration = clamp(value.sweepDuration, 150, 4000);
  const cycleDuration = clamp(
    value.cycleDuration,
    sweepDuration + CYCLE_MARGIN,
    6000,
  );
  const coreWidth = clamp(value.coreWidth, 0.01, 0.25);
  const bandWidth = clamp(value.bandWidth, coreWidth + 0.01, 0.7);

  return {
    sweepDuration,
    cycleDuration,
    coreWidth,
    bandWidth,
    bandOpacity: clamp(value.bandOpacity, 0, 1),
    brightness: clamp(value.brightness, 0, 2),
    highlightIntensity: clamp(value.highlightIntensity, 0, 1.5),
    distortionRange: clamp(value.distortionRange, 0.02, 0.6),
    distortionStrength: clamp(value.distortionStrength, 0, 4),
    rippleDensity: clamp(value.rippleDensity, 1, 60),
    rippleSpeed: clamp(value.rippleSpeed, 0, 12),
  };
}

export function getLaserEffectSettings(): Readonly<LaserEffectSettings> {
  return settings;
}

export function updateLaserEffectSettings(
  patch: Partial<LaserEffectSettings>,
) {
  settings = normalizeLaserEffectSettings({ ...settings, ...patch });
  return settings;
}
