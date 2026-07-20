export type StickerSource = StickerTextSource | StickerSvgSource;

export interface StickerTextSource {
  type: "text";
  text: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: number | string;
}

export interface StickerSvgSource {
  type: "svg";
  svg: string;
}

export interface StickerOutlineOptions {
  width?: number;
  color?: string;
}

export interface StickerShadowOptions {
  color?: string;
  opacity?: number;
  blur?: number;
  distance?: number;
  angle?: number;
}

export interface StickerBackOptions {
  color?: string;
  gloss?: number;
  roughness?: number;
}

export interface StickerPeelOptions {
  /** Curl radius, normalized to the sticker's short side when <= 1. */
  radius?: number;
  /** Normalized spring stiffness from 0 to 1. */
  stiffness?: number;
  /** Draggable edge-band width in CSS pixels. */
  grabWidth?: number;
  /** Maximum curl angle in radians; degree values are also accepted when > 2π. */
  maxAngle?: number;
  release?: "reset" | "stay" | "snap";
}

export interface StickerOptions {
  source?: StickerSource;
  outline?: StickerOutlineOptions;
  shadow?: StickerShadowOptions;
  peel?: StickerPeelOptions;
  back?: StickerBackOptions;
  tilt?: number;
  wind?: number;
  quality?: "low" | "medium" | "high";
}

export interface StickerPoint {
  readonly x: number;
  readonly y: number;
}

export interface StickerState {
  readonly ready: boolean;
  readonly dragging: boolean;
  readonly progress: number;
  readonly grabPoint: StickerPoint | null;
  readonly pointer: StickerPoint | null;
}

export interface StickerInstance {
  setSource(source: StickerSource): Promise<void>;
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
  resize(): void;
  getState(): Readonly<StickerState>;
  destroy(): void;
}

export const DEFAULT_STICKER_OPTIONS = {
  source: undefined as StickerSource | undefined,
  outline: { width: 18, color: "#ffffff" },
  shadow: {
    color: "#191823",
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42,
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    release: "reset" as const,
  },
  back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
  tilt: -3,
  wind: 0,
  quality: "high" as const,
};

export type ResolvedStickerOptions = {
  source?: StickerSource;
  outline: Required<StickerOutlineOptions>;
  shadow: Required<StickerShadowOptions>;
  peel: Required<StickerPeelOptions>;
  back: Required<StickerBackOptions>;
  tilt: number;
  wind: number;
  quality: "low" | "medium" | "high";
};

export function resolveStickerOptions(
  current: ResolvedStickerOptions | undefined,
  patch: Partial<StickerOptions> = {},
): ResolvedStickerOptions {
  const base = current ?? DEFAULT_STICKER_OPTIONS;
  return {
    source: patch.source ?? base.source,
    outline: { ...base.outline, ...patch.outline },
    shadow: { ...base.shadow, ...patch.shadow },
    peel: { ...base.peel, ...patch.peel },
    back: { ...base.back, ...patch.back },
    tilt: patch.tilt ?? base.tilt,
    wind: patch.wind ?? base.wind,
    quality: patch.quality ?? base.quality,
  };
}
