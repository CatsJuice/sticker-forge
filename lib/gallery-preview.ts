import { prepareArtwork } from "./source";
import {
  DEFAULT_STICKER_OPTIONS,
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

/**
 * Renders an immutable gallery thumbnail from the same prepared artwork used by
 * the interactive sticker renderer. The result keeps alpha, prefers WebP, and
 * falls back to PNG when the browser has no WebP canvas encoder.
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
