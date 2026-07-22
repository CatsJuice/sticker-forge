export type StickerSource = StickerTextSource | StickerSvgSource | StickerImageSource;

export interface StickerRichTextRun {
  text: string;
  color?: string;
  fontSize?: number;
  fontWeight?: number | string;
  underline?: boolean;
}

export interface StickerRichTextBlock {
  align?: "left" | "center" | "right";
  lineHeight?: number;
  runs: StickerRichTextRun[];
}

export interface StickerRichTextDocument {
  blocks: StickerRichTextBlock[];
}

export interface StickerTextSource {
  type: "text";
  text: string;
  color?: string;
  fontFamily?: string;
  fontWeight?: number | string;
  richText?: StickerRichTextDocument;
}

export interface StickerSvgSource {
  type: "svg";
  svg: string;
}

export interface StickerImageSource {
  type: "image";
  /** Browser-decodable image URL, typically a data URL from a local upload. */
  src: string;
  name?: string;
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

export interface StickerSoundOptions {
  /** Custom peel-sound URL. Omit or leave empty to use the bundled sound. */
  src?: string;
  /** Master peel-sound volume from 0 to 1. */
  volume?: number;
  enabled?: boolean;
}

export interface StickerPeelOptions {
  /** Curl radius, normalized to the sticker's short side when <= 1. */
  radius?: number;
  /** Normalized spring stiffness from 0 to 1. */
  stiffness?: number;
  /** Draggable edge-band width in CSS pixels at 100% scale. */
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
  sound?: StickerSoundOptions;
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

export interface StickerPlaybackMotion {
  /** Normalized sticker position where the peel begins (0..1 on each axis). */
  origin: StickerPoint;
  /**
   * Normalized sticker-space position the drag travels toward. Values may
   * extend outside 0..1 to model pulling a detached sticker taut.
   */
  target: StickerPoint;
}

export interface StickerInstance {
  setSource(source: StickerSource): Promise<void>;
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
  /** Set a deterministic peel pose without synthesizing pointer events. */
  setPeelProgress(progress: number, motion?: StickerPlaybackMotion): void;
  /** Set a deterministic pose of the built-in scale-and-laser entrance. */
  setEntranceProgress(progress: number): void;
  /** Replay the built-in spring-and-sweep entrance animation. */
  reappear(): void;
  /** Increase the backing-buffer density without changing the logical layout. */
  setRenderScale(scale: number): void;
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
    release: "snap" as const,
  },
  back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
  sound: { src: "", volume: 0.7, enabled: true },
  tilt: -3,
  wind: 0.25,
  quality: "high" as const,
};

export type ResolvedStickerOptions = {
  source?: StickerSource;
  outline: Required<StickerOutlineOptions>;
  shadow: Required<StickerShadowOptions>;
  peel: Required<StickerPeelOptions>;
  back: Required<StickerBackOptions>;
  sound: Required<StickerSoundOptions>;
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
    sound: { ...base.sound, ...patch.sound },
    tilt: patch.tilt ?? base.tilt,
    wind: patch.wind ?? base.wind,
    quality: patch.quality ?? base.quality,
  };
}
