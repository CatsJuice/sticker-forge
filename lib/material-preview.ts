import {
  DEFAULT_STICKER_OPTIONS,
  type StickerMaterialOptions,
} from "./types";

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
  context.save();
  context.globalCompositeOperation = "source-atop";

  if (resolved.type === "reflective") {
    const sheen = context.createLinearGradient(0, height, width, 0);
    sheen.addColorStop(0.25, "rgba(255,255,255,0)");
    sheen.addColorStop(0.46, `rgba(255,255,255,${0.7 * amount})`);
    sheen.addColorStop(0.58, `rgba(255,255,255,${0.14 * amount})`);
    sheen.addColorStop(0.78, "rgba(255,255,255,0)");
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "holographic") {
    const rainbow = context.createLinearGradient(0, height, width, 0);
    const [colorA, colorB, colorC] = resolved.holographicColors;
    rainbow.addColorStop(0, colorA);
    rainbow.addColorStop(0.333333, colorB);
    rainbow.addColorStop(0.666667, colorC);
    rainbow.addColorStop(1, colorA);
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
    const count = Math.min(2400, Math.round((width * height) / 520));
    for (let index = 0; index < count; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const bright = random() > 0.5;
      context.globalAlpha = 0.38 * amount * random();
      context.fillStyle = bright ? "#ffffff" : "#34281f";
      const size = 0.7 + random() * 1.8;
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
