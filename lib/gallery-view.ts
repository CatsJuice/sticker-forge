import type { GalleryItem } from "./gallery-types";

export type GalleryViewState = {
  x: number;
  y: number;
  zoom: number;
};

export type GalleryBounds = {
  left: number;
  top: number;
  right: number;
  bottom: number;
};

export type GalleryViewportSize = {
  width: number;
  height: number;
};

export const DEFAULT_GALLERY_VIEW: GalleryViewState = {
  x: 0,
  y: 0,
  zoom: 1,
};

/**
 * Computes the visual axis-aligned bounds once for a gallery's first open.
 * Rotation includes both the stable base tilt and the user-controlled angle.
 */
export function calculateGalleryBounds(
  items: readonly GalleryItem[],
): GalleryBounds | null {
  if (items.length === 0) return null;

  let left = Number.POSITIVE_INFINITY;
  let top = Number.POSITIVE_INFINITY;
  let right = Number.NEGATIVE_INFINITY;
  let bottom = Number.NEGATIVE_INFINITY;

  for (const item of items) {
    const radians =
      ((item.baseTilt + item.layout.rotation) * Math.PI) / 180;
    const cosine = Math.abs(Math.cos(radians));
    const sine = Math.abs(Math.sin(radians));
    const halfWidth =
      (item.layout.width * cosine + item.layout.height * sine) / 2;
    const halfHeight =
      (item.layout.width * sine + item.layout.height * cosine) / 2;

    left = Math.min(left, item.layout.x - halfWidth);
    top = Math.min(top, item.layout.y - halfHeight);
    right = Math.max(right, item.layout.x + halfWidth);
    bottom = Math.max(bottom, item.layout.y + halfHeight);
  }

  return { left, top, right, bottom };
}

/**
 * Centers the cached bounds and fits them into the unobscured viewport.
 * The zoom is capped at 100% so a small gallery does not open oversized.
 */
export function fitGalleryBounds(
  bounds: GalleryBounds | null,
  viewport: GalleryViewportSize,
): GalleryViewState {
  if (!bounds) return DEFAULT_GALLERY_VIEW;

  const horizontalPadding = Math.min(
    96,
    Math.max(24, viewport.width * 0.08),
  );
  const verticalPadding = Math.min(
    120,
    Math.max(48, viewport.height * 0.12),
  );
  const availableWidth = Math.max(1, viewport.width - horizontalPadding * 2);
  const availableHeight = Math.max(1, viewport.height - verticalPadding * 2);
  const boundsWidth = Math.max(1, bounds.right - bounds.left);
  const boundsHeight = Math.max(1, bounds.bottom - bounds.top);

  return {
    x: (bounds.left + bounds.right) / 2,
    y: (bounds.top + bounds.bottom) / 2,
    zoom: Math.min(
      1,
      availableWidth / boundsWidth,
      availableHeight / boundsHeight,
    ),
  };
}
