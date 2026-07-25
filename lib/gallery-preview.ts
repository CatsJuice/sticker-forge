import { prepareArtwork } from "./source";
import {
  DEFAULT_STICKER_OPTIONS,
  type StickerMaterialOptions,
  type StickerOutlineOptions,
  type StickerSource,
} from "./types";

export const DEFAULT_GALLERY_PREVIEW_MAX_EDGE = 480;
export const DEFAULT_GALLERY_ITEM_LONG_EDGE = 320;

export type GalleryPreviewMimeType = "image/webp" | "image/png";

export interface GalleryPreviewOptions {
  /** Maximum preview dimension in pixels. The artwork is never enlarged. */
  maxEdge?: number;
  /** Preferred longest side for a newly placed gallery item, in CSS pixels. */
  galleryLongEdge?: number;
  /** WebP encoder quality from 0 to 1. */
  webpQuality?: number;
  /** Optional front material baked into the immutable thumbnail. */
  material?: StickerMaterialOptions;
}

export interface GalleryPreviewResult {
  dataUrl: string;
  mimeType: GalleryPreviewMimeType;
  previewWidth: number;
  previewHeight: number;
  originalWidth: number;
  originalHeight: number;
  /** Aspect ratio of the prepared sticker artwork, including its transparent margin. */
  aspect: number;
  suggestedWidth: number;
  suggestedHeight: number;
}

export class GalleryPreviewError extends Error {
  readonly cause: unknown;

  constructor(message: string, cause?: unknown) {
    super(message);
    this.name = "GalleryPreviewError";
    this.cause = cause;
  }
}

function positiveNumber(value: number | undefined, fallback: number, name: string) {
  const resolved = value ?? fallback;
  if (!Number.isFinite(resolved) || resolved <= 0) {
    throw new GalleryPreviewError(`${name} must be a positive finite number.`);
  }
  return resolved;
}

function encodePreview(
  canvas: HTMLCanvasElement,
  webpQuality: number,
): { dataUrl: string; mimeType: GalleryPreviewMimeType } {
  let webpError: unknown;
  try {
    const dataUrl = canvas.toDataURL("image/webp", webpQuality);
    if (/^data:image\/webp(?:[;,])/i.test(dataUrl)) {
      return { dataUrl, mimeType: "image/webp" };
    }
  } catch (error) {
    webpError = error;
  }

  try {
    const dataUrl = canvas.toDataURL("image/png");
    if (!/^data:image\/png(?:[;,])/i.test(dataUrl)) {
      throw new Error("The browser returned an unsupported canvas encoding.");
    }
    return { dataUrl, mimeType: "image/png" };
  } catch (error) {
    throw new GalleryPreviewError(
      "The gallery preview could not be encoded as WebP or PNG.",
      error ?? webpError,
    );
  }
}

function applyMaterialPreview(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  material: StickerMaterialOptions | undefined,
) {
  const resolved = {
    ...DEFAULT_STICKER_OPTIONS.material,
    ...material,
  };
  if (resolved.type === "satin" || resolved.intensity <= 0) return;

  const amount = Math.min(1, Math.max(0, resolved.intensity));
  context.save();
  context.globalCompositeOperation = "source-atop";

  if (["glossy", "reflective", "spot-uv"].includes(resolved.type)) {
    const sheen = context.createLinearGradient(0, height, width, 0);
    sheen.addColorStop(0.25, "rgba(255,255,255,0)");
    sheen.addColorStop(0.48, `rgba(255,255,255,${0.28 * amount})`);
    sheen.addColorStop(0.58, `rgba(255,255,255,${0.08 * amount})`);
    sheen.addColorStop(0.78, "rgba(255,255,255,0)");
    context.fillStyle = sheen;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "holographic") {
    const rainbow = context.createLinearGradient(0, height, width, 0);
    rainbow.addColorStop(0, `rgba(255,80,132,${0.2 * amount})`);
    rainbow.addColorStop(0.22, `rgba(255,220,90,${0.24 * amount})`);
    rainbow.addColorStop(0.44, `rgba(92,255,190,${0.24 * amount})`);
    rainbow.addColorStop(0.66, `rgba(80,174,255,${0.24 * amount})`);
    rainbow.addColorStop(0.86, `rgba(193,104,255,${0.22 * amount})`);
    rainbow.addColorStop(1, `rgba(255,80,132,${0.2 * amount})`);
    context.fillStyle = rainbow;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "metallic") {
    context.globalAlpha = 0.32 * amount;
    context.fillStyle = resolved.tint;
    context.fillRect(0, 0, width, height);
    const foil = context.createLinearGradient(0, 0, width, height);
    foil.addColorStop(0, "rgba(255,255,255,0.42)");
    foil.addColorStop(0.5, "rgba(0,0,0,0.12)");
    foil.addColorStop(1, "rgba(255,255,255,0.28)");
    context.fillStyle = foil;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "pearlescent" || resolved.type === "lenticular") {
    const tint = context.createLinearGradient(0, 0, width, 0);
    tint.addColorStop(0, resolved.tint);
    tint.addColorStop(0.5, "rgba(255,255,255,0.08)");
    tint.addColorStop(1, resolved.secondaryTint);
    context.globalAlpha = (resolved.type === "lenticular" ? 0.28 : 0.2) * amount;
    context.fillStyle = tint;
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "kraft") {
    context.globalAlpha = 0.34 * amount;
    context.fillStyle = "#9f6b38";
    context.fillRect(0, 0, width, height);
  } else if (resolved.type === "clear" || resolved.type === "frosted") {
    context.globalAlpha = (resolved.type === "clear" ? 0.1 : 0.18) * amount;
    context.fillStyle = resolved.tint;
    context.fillRect(0, 0, width, height);
  }

  if (["matte", "paper", "kraft", "frosted", "glitter"].includes(resolved.type)) {
    let state = Math.floor(resolved.seed * 2147483647) || 1;
    const random = () => {
      state = (state * 48271) % 2147483647;
      return state / 2147483647;
    };
    const count = Math.min(
      2400,
      Math.round((width * height) / (resolved.type === "glitter" ? 520 : 240)),
    );
    for (let index = 0; index < count; index += 1) {
      const x = random() * width;
      const y = random() * height;
      const bright = random() > 0.5;
      context.globalAlpha =
        (resolved.type === "glitter" ? 0.38 : 0.055) * amount * random();
      context.fillStyle = bright ? "#ffffff" : "#34281f";
      const size =
        resolved.type === "glitter"
          ? 0.7 + random() * 1.8
          : 0.35 + random() * 0.75;
      context.fillRect(x, y, size, resolved.type === "paper" ? size * 0.3 : size);
    }
  }
  context.restore();
}

/**
 * Renders an immutable gallery thumbnail from the same prepared artwork used by
 * the interactive sticker renderer. Callers persist this result only when a
 * gallery item is created; editor changes and layout updates deliberately do
 * not regenerate or rewrite the thumbnail. The result keeps alpha, prefers
 * WebP, and falls back to PNG when the browser has no WebP canvas encoder.
 */
export async function createGalleryPreview(
  source: StickerSource,
  outline: StickerOutlineOptions = {},
  options: GalleryPreviewOptions = {},
): Promise<GalleryPreviewResult> {
  if (typeof document === "undefined") {
    throw new GalleryPreviewError(
      "Gallery previews can only be created in a browser document.",
    );
  }

  const maxEdge = positiveNumber(
    options.maxEdge,
    DEFAULT_GALLERY_PREVIEW_MAX_EDGE,
    "maxEdge",
  );
  const galleryLongEdge = positiveNumber(
    options.galleryLongEdge,
    DEFAULT_GALLERY_ITEM_LONG_EDGE,
    "galleryLongEdge",
  );
  const webpQuality = options.webpQuality ?? 0.86;
  if (!Number.isFinite(webpQuality) || webpQuality < 0 || webpQuality > 1) {
    throw new GalleryPreviewError("webpQuality must be between 0 and 1.");
  }

  try {
    const artwork = await prepareArtwork(source, {
      width: outline.width ?? DEFAULT_STICKER_OPTIONS.outline.width,
      color: outline.color ?? DEFAULT_STICKER_OPTIONS.outline.color,
    });
    const originalLongEdge = Math.max(artwork.width, artwork.height);
    const previewScale = Math.min(1, maxEdge / originalLongEdge);
    const previewWidth = Math.max(1, Math.round(artwork.width * previewScale));
    const previewHeight = Math.max(1, Math.round(artwork.height * previewScale));

    const canvas = document.createElement("canvas");
    canvas.width = previewWidth;
    canvas.height = previewHeight;
    const context = canvas.getContext("2d", { alpha: true });
    if (!context) {
      throw new GalleryPreviewError("Canvas 2D is unavailable.");
    }
    context.clearRect(0, 0, previewWidth, previewHeight);
    context.imageSmoothingEnabled = true;
    context.imageSmoothingQuality = "high";
    context.drawImage(artwork.canvas, 0, 0, previewWidth, previewHeight);
    applyMaterialPreview(
      context,
      previewWidth,
      previewHeight,
      options.material,
    );

    const encoded = encodePreview(canvas, webpQuality);
    const suggestedLongEdge = Math.min(
      galleryLongEdge,
      Math.max(previewWidth, previewHeight),
    );
    const suggestedWidth =
      artwork.aspect >= 1
        ? Math.round(suggestedLongEdge)
        : Math.max(1, Math.round(suggestedLongEdge * artwork.aspect));
    const suggestedHeight =
      artwork.aspect >= 1
        ? Math.max(1, Math.round(suggestedLongEdge / artwork.aspect))
        : Math.round(suggestedLongEdge);

    return {
      ...encoded,
      previewWidth,
      previewHeight,
      originalWidth: artwork.width,
      originalHeight: artwork.height,
      aspect: artwork.aspect,
      suggestedWidth,
      suggestedHeight,
    };
  } catch (error) {
    if (error instanceof GalleryPreviewError) throw error;
    throw new GalleryPreviewError(
      "The sticker artwork could not be rendered for the gallery preview.",
      error,
    );
  }
}
