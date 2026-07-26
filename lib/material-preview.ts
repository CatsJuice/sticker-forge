import {
  DEFAULT_STICKER_OPTIONS,
  type StickerLightingOptions,
  type StickerMaterialOptions,
} from "./types";

const SEEDED_RANDOM_MODULUS = 2147483647;
const SEEDED_RANDOM_MULTIPLIER = 48271;
const HOLOGRAPHIC_NOISE_SIZE = 96;
const MATERIAL_PREVIEW_CACHE_LIMIT = 6;
const GLITTER_RANDOM_VALUES_PER_FLAKE = 5;

interface HolographicNoiseCacheEntry {
  pixels: Uint8ClampedArray;
  canvas?: HTMLCanvasElement;
}

interface GlitterRandomCacheEntry {
  state: number;
  values: Float64Array;
}

const holographicNoiseCache = new Map<
  number,
  HolographicNoiseCacheEntry
>();
const glitterRandomCache = new Map<number, GlitterRandomCacheEntry>();

function seededRandomInitialState(seed: number) {
  return Math.floor(seed * SEEDED_RANDOM_MODULUS) || 1;
}

function readSeededLru<Value>(
  cache: Map<number, Value>,
  key: number,
  create: () => Value,
) {
  const existing = cache.get(key);
  if (existing !== undefined) {
    cache.delete(key);
    cache.set(key, existing);
    return existing;
  }

  const value = create();
  cache.set(key, value);
  if (cache.size > MATERIAL_PREVIEW_CACHE_LIMIT) {
    const oldest = cache.keys().next().value;
    if (oldest !== undefined) cache.delete(oldest);
  }
  return value;
}

function getHolographicNoise(seed: number) {
  const initialState = seededRandomInitialState(seed);
  return readSeededLru(holographicNoiseCache, initialState, () => {
    let state = initialState;
    const pixels = new Uint8ClampedArray(
      HOLOGRAPHIC_NOISE_SIZE * HOLOGRAPHIC_NOISE_SIZE * 4,
    );
    for (let index = 0; index < pixels.length; index += 4) {
      state =
        (state * SEEDED_RANDOM_MULTIPLIER) % SEEDED_RANDOM_MODULUS;
      const value = state / SEEDED_RANDOM_MODULUS;
      const brightness = value > 0.48 ? 255 : 20;
      pixels[index] = brightness;
      pixels[index + 1] = brightness;
      pixels[index + 2] = brightness;
      state =
        (state * SEEDED_RANDOM_MULTIPLIER) % SEEDED_RANDOM_MODULUS;
      pixels[index + 3] = Math.round(
        38 + (state / SEEDED_RANDOM_MODULUS) * 74,
      );
    }
    return { pixels };
  });
}

function getHolographicNoiseCanvas(seed: number) {
  const entry = getHolographicNoise(seed);
  if (entry.canvas) return entry.canvas;

  const canvas = document.createElement("canvas");
  canvas.width = HOLOGRAPHIC_NOISE_SIZE;
  canvas.height = HOLOGRAPHIC_NOISE_SIZE;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) return null;
  const noise = context.createImageData(
    HOLOGRAPHIC_NOISE_SIZE,
    HOLOGRAPHIC_NOISE_SIZE,
  );
  noise.data.set(entry.pixels);
  context.putImageData(noise, 0, 0);
  entry.canvas = canvas;
  return canvas;
}

function getGlitterRandomValues(seed: number, count: number) {
  const initialState = seededRandomInitialState(seed);
  const entry = readSeededLru(glitterRandomCache, initialState, () => ({
    state: initialState,
    values: new Float64Array(0),
  }));
  const requiredLength = count * GLITTER_RANDOM_VALUES_PER_FLAKE;
  if (entry.values.length >= requiredLength) return entry.values;

  const values = new Float64Array(requiredLength);
  values.set(entry.values);
  let state = entry.state;
  for (let index = entry.values.length; index < requiredLength; index += 1) {
    state = (state * SEEDED_RANDOM_MULTIPLIER) % SEEDED_RANDOM_MODULUS;
    values[index] = state / SEEDED_RANDOM_MODULUS;
  }
  entry.state = state;
  entry.values = values;
  return values;
}

function scaledPhase(position: number, scale: number) {
  return (position - 0.5) * scale + 0.5;
}

function reflectiveOpacity(phase: number) {
  const position = phase - Math.floor(phase);
  if (position < 0.25 || position > 0.78) return 0;
  if (position < 0.46) return (0.7 * (position - 0.25)) / 0.21;
  if (position < 0.58) {
    return 0.7 + ((0.14 - 0.7) * (position - 0.46)) / 0.12;
  }
  return 0.14 * (1 - (position - 0.58) / 0.2);
}

function addReflectiveStops(
  gradient: CanvasGradient,
  scale: number,
  amount: number,
  phaseOffset: number,
) {
  const samples = Math.max(32, Math.ceil(48 * scale));
  for (let index = 0; index <= samples; index += 1) {
    const position = index / samples;
    const opacity = reflectiveOpacity(
      scaledPhase(position, scale) + phaseOffset,
    );
    gradient.addColorStop(
      position,
      `rgba(255,255,255,${opacity * amount})`,
    );
  }
}

function addHolographicStops(
  gradient: CanvasGradient,
  scale: number,
  colors: readonly string[],
  phaseOffset: number,
) {
  const phaseStart = scaledPhase(0, scale) + phaseOffset;
  const phaseEnd = scaledPhase(1, scale) + phaseOffset;
  const firstStop = Math.floor(phaseStart * 3);
  const lastStop = Math.ceil(phaseEnd * 3);

  // Anchor the ends so sub-1 scales still fill the complete sticker.
  gradient.addColorStop(0, colors[((firstStop % 3) + 3) % 3]);
  for (let stop = firstStop; stop <= lastStop; stop += 1) {
    const position = (stop / 3 - phaseStart) / scale;
    if (position <= 0 || position >= 1) continue;
    gradient.addColorStop(position, colors[((stop % 3) + 3) % 3]);
  }
  gradient.addColorStop(1, colors[((lastStop % 3) + 3) % 3]);
}

function applyHolographicFrost(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  amount: number,
  grain: number,
  scale: number,
  seed: number,
) {
  const noiseCanvas = getHolographicNoiseCanvas(seed);
  if (!noiseCanvas) return;
  const pattern = context.createPattern(noiseCanvas, "repeat");
  if (!pattern) return;
  pattern.setTransform(
    new DOMMatrix().scaleSelf(1 / Math.sqrt(scale), 1 / Math.sqrt(scale)),
  );
  context.save();
  context.globalAlpha = 0.42 * amount * grain;
  context.fillStyle = pattern;
  context.fillRect(0, 0, width, height);
  context.restore();
}

export function applyMaterialPreview(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  material: StickerMaterialOptions | undefined,
  lighting: StickerLightingOptions | undefined,
) {
  const resolved = {
    ...DEFAULT_STICKER_OPTIONS.material,
    ...material,
  };
  if (resolved.type === "original" || resolved.intensity <= 0) return;

  const amount = Math.min(1, Math.max(0, resolved.intensity));
  const scale = Math.min(4, Math.max(0.2, resolved.scale));
  const resolvedLighting = {
    ...DEFAULT_STICKER_OPTIONS.lighting,
    ...lighting,
    direction: {
      ...DEFAULT_STICKER_OPTIONS.lighting.direction,
      ...lighting?.direction,
    },
  };
  const lightLength =
    Math.hypot(
      resolvedLighting.direction.x,
      resolvedLighting.direction.y,
      resolvedLighting.direction.z,
    ) || 1;
  const lightX = resolvedLighting.direction.x / lightLength;
  const lightY = resolvedLighting.direction.y / lightLength;
  const defaultDirection = DEFAULT_STICKER_OPTIONS.lighting.direction;
  const defaultLength = Math.hypot(
    defaultDirection.x,
    defaultDirection.y,
    defaultDirection.z,
  );
  const defaultLightX = defaultDirection.x / defaultLength;
  const defaultLightY = defaultDirection.y / defaultLength;
  const intensity = Math.min(1.5, Math.max(0, resolvedLighting.intensity));
  context.save();
  context.globalCompositeOperation = "source-atop";

  if (resolved.type === "reflective") {
    const sheen = context.createLinearGradient(0, height, width, 0);
    const lightShift =
      (lightX - defaultLightX) * 0.28
      + (lightY - defaultLightY) * -0.22;
    const lightStrength = Math.min(
      1.4,
      Math.max(0.5, 1 + (intensity - 0.8) * 0.5),
    );
    addReflectiveStops(sheen, scale, amount * lightStrength, lightShift);
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "holographic") {
    const rainbow = context.createLinearGradient(0, height, width, 0);
    const lightShift =
      (lightX - defaultLightX) * 0.32
      + (lightY - defaultLightY) * -0.26;
    addHolographicStops(
      rainbow,
      scale,
      resolved.holographicColors,
      lightShift,
    );
    context.fillStyle = rainbow;
    context.globalAlpha =
      0.24
      * amount
      * Math.min(1.3, Math.max(0.6, 1 + (intensity - 0.8) * 0.35));
    context.fillRect(0, 0, width, height);
    applyHolographicFrost(
      context,
      width,
      height,
      amount,
      Math.min(1, Math.max(0, resolved.holographicGrain)),
      scale,
      resolved.seed,
    );
  }

  if (resolved.type === "glitter") {
    const lightAngle = Math.atan2(lightY, lightX);
    const lightStrength = Math.min(
      1.4,
      Math.max(0.45, 0.5 + intensity * 0.625),
    );
    const count = Math.min(
      8000,
      Math.round(((width * height) / 520) * scale * scale),
    );
    const randomValues = getGlitterRandomValues(resolved.seed, count);
    for (let index = 0; index < count; index += 1) {
      const randomOffset = index * GLITTER_RANDOM_VALUES_PER_FLAKE;
      const x = randomValues[randomOffset] * width;
      const y = randomValues[randomOffset + 1] * height;
      const bright = randomValues[randomOffset + 2] > 0.5;
      const opacity = randomValues[randomOffset + 3];
      const orientation =
        ((x * 0.013 + y * 0.017 + resolved.seed * 7) % 1) * Math.PI * 2;
      const twinkle =
        0.18
        + Math.pow(Math.max(0, Math.cos(orientation - lightAngle)), 10) * 0.82;
      context.globalAlpha =
        0.38 * amount * opacity * twinkle * lightStrength;
      context.fillStyle = bright ? "#ffffff" : "#34281f";
      const size =
        (0.7 + randomValues[randomOffset + 4] * 1.8) / Math.sqrt(scale);
      context.fillRect(x, y, size, size);
    }
  }
  context.restore();
}

export function createMaterialPreviewCanvas(
  source: CanvasImageSource,
  width: number,
  height: number,
  material: StickerMaterialOptions | undefined,
  lighting?: StickerLightingOptions,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { alpha: true });
  if (!context) {
    throw new Error("Canvas 2D is unavailable.");
  }
  context.clearRect(0, 0, width, height);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.drawImage(source, 0, 0, width, height);
  applyMaterialPreview(context, width, height, material, lighting);
  return canvas;
}
