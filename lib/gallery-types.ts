import type { StickerOptions, StickerSource } from "./types";

export const DEFAULT_GALLERY_FOLDER_ID = "default";
export const DEFAULT_GALLERY_FOLDER_TITLE = "sticker.oooo.so";
export const DEFAULT_GALLERY_FOLDER_COLOR = "#59b0d8";
export const EVOLUTION_GALLERY_FOLDER_ID = "evolution";
export const EVOLUTION_GALLERY_FOLDER_COLOR = "#909090";

export interface GalleryFolderRecord {
  id: string;
  title: string;
  color: string;
  createdAt: number;
  order: number;
  isDefault: boolean;
}

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
  folderId: string;
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
  folderId?: string;
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
