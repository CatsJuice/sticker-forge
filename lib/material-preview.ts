import {
  DEFAULT_STICKER_OPTIONS,
  type StickerMaterialOptions,
} from "./types";

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
) {
  const samples = Math.max(32, Math.ceil(48 * scale));
  for (let index = 0; index <= samples; index += 1) {
    const position = index / samples;
    const opacity = reflectiveOpacity(scaledPhase(position, scale));
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
) {
  const phaseStart = scaledPhase(0, scale);
  const phaseEnd = scaledPhase(1, scale);
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

export function applyMaterialPreview(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  material: StickerMaterialOptions | undefined,
) {
  const resolved = {
    ...DEFAULT_STICKER_OPTIONS.material,
    ...material,
  };
  if (resolved.type === "original" || resolved.intensity <= 0) return;

  const amount = Math.min(1, Math.max(0, resolved.intensity));
  const scale = Math.min(4, Math.max(0.2, resolved.scale));
  context.save();
  context.globalCompositeOperation = "source-atop";

  if (resolved.type === "reflective") {
    const sheen = context.createLinearGradient(0, height, width, 0);
    addReflectiveStops(sheen, scale, amount);
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "holographic") {
    const rainbow = context.createLinearGradient(0, height, width, 0);
    addHolographicStops(rainbow, scale, resolved.holographicColors);
    context.fillStyle = rainbow;
    context.globalAlpha = 0.24 * amount;
    context.fillRect(0, 0, width, height);
  }

  if (resolved.type === "glitter") {
    let state = Math.floor(resolved.seed * 2147483647) || 1;
    const random = () => {
      state = (state * 48271) % 2147483647;
      return state / 2147483647;
    };
    const count = Math.min(
      8000,
      Math.round(((width * height) / 520) * scale * scale),
    );
    for (let index = 0; index < count; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const bright = random() > 0.5;
      context.globalAlpha = 0.38 * amount * random();
      context.fillStyle = bright ? "#ffffff" : "#34281f";
      const size = (0.7 + random() * 1.8) / Math.sqrt(scale);
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
  applyMaterialPreview(context, width, height, material);
  return canvas;
}
