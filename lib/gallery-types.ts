import type { StickerOptions, StickerSource } from "./types";

/** Gallery-space coordinates use CSS pixels at zoom 1; rotation is in degrees. */
export interface GalleryLayout {
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
}

export interface GalleryItem {
  id: string;
  createdAt: number;
  sourceType: StickerSource["type"];
  title: string;
  previewWidth: number;
  previewHeight: number;
  baseTilt: number;
  layout: GalleryLayout;
}

/** The immutable source and renderer configuration stored for one gallery item. */
export interface GalleryAsset {
  source: StickerSource;
  options: StickerOptions;
}

export interface CreateGalleryPayload {
  source: StickerSource;
  options: StickerOptions;
  previewDataUrl: string;
  previewWidth: number;
  previewHeight: number;
  title?: string;
  layout: GalleryLayout;
}

export interface UpdateGalleryLayoutPayload {
  layout: GalleryLayout;
}
