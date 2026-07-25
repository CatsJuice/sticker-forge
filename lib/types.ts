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
  /** Transparent texture padding in pixels. Defaults to 144 for peel clearance. */
  padding?: number;
  /** Maximum decoded texture edge. Defaults to 2048; capped at 8192. */
  textureMaxEdge?: number;
}

export interface StickerOutlineOptions {
  width?: number;
  color?: string;
}

export interface StickerEdgeOptions {
  /** Width of the inset edge bevel in CSS pixels. */
  width?: number;
  /** Directional edge highlight and shade strength from 0 to 1. */
  strength?: number;
}

export interface StickerShadowOptions {
  color?: string;
  opacity?: number;
  blur?: number;
  distance?: number;
  angle?: number;
}

export interface StickerLightDirection {
  /** Horizontal direction toward the light in view space (-1..1). */
  x: number;
  /** Vertical direction toward the light in view space (-1..1). */
  y: number;
  /** Depth direction toward the viewer-facing light hemisphere (0..1). */
  z: number;
}

export interface StickerLightingOptions {
  /** Normalized view-space direction from the sticker toward the light. */
  direction?: StickerLightDirection;
  /** Direct-light intensity from 0 to 1.5. */
  intensity?: number;
  /** Fill light applied to every surface from 0 to 1. */
  ambient?: number;
  /** Apparent light-source size from 0 (crisp) to 1 (soft). */
  softness?: number;
}

export interface StickerBackOptions {
  color?: string;
  gloss?: number;
  roughness?: number;
}

export type StickerMaterialType =
  | "original"
  | "holographic"
  | "glitter"
  | "reflective";

export const STICKER_MATERIAL_TYPES: readonly StickerMaterialType[] = [
  "original",
  "holographic",
  "glitter",
  "reflective",
];

export function stickerMaterialTypeIndex(type: StickerMaterialType): number {
  const index = STICKER_MATERIAL_TYPES.indexOf(type);
  return index < 0 ? 0 : index;
}

/** Appearance of the printed face. Procedural effects stay stable across exports. */
export interface StickerMaterialOptions {
  type?: StickerMaterialType;
  /** Overall strength of the material response, from 0 to 1. */
  intensity?: number;
  /** Relative size of procedural bands, flakes, and reflective detail. */
  scale?: number;
  /** Stable procedural variation seed. */
  seed?: number;
  /** Three colors blended cyclically across the holographic diffraction bands. */
  holographicColors?: [string, string, string];
}

export interface StickerSoundOptions {
  /** Custom peel-sound URL. Omit or leave empty to use the bundled sound. */
  src?: string;
  /** Master peel-sound volume from 0 to 1. */
  volume?: number;
  enabled?: boolean;
}

export interface StickerDisplayOptions {
  /** Exact rendered width in CSS pixels. Zero uses the normal responsive fit. */
  width?: number;
  /** Exact rendered height in CSS pixels. Zero uses the normal responsive fit. */
  height?: number;
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
  /** Progress required for a snap release to fully detach. Defaults to 0.74. */
  detachThreshold?: number;
  /** Whether peeling reveals the faint adhesive residue beneath the sticker. */
  residue?: boolean;
  /** Whether the lifted sheet casts onto the adhered printed face. */
  surfaceShadow?: boolean;
  release?: "reset" | "stay" | "snap";
}

export interface StickerOptions {
  source?: StickerSource;
  outline?: StickerOutlineOptions;
  edge?: StickerEdgeOptions;
  shadow?: StickerShadowOptions;
  lighting?: StickerLightingOptions;
  peel?: StickerPeelOptions;
  back?: StickerBackOptions;
  material?: StickerMaterialOptions;
  sound?: StickerSoundOptions;
  display?: StickerDisplayOptions;
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

export interface StickerRenderSnapshot {
  readonly progress: number;
  readonly peelDepth: number;
  readonly peelRadius: number;
  readonly detachedTension: number;
  readonly origin: StickerPoint;
  readonly direction: StickerPoint;
  readonly position: StickerPoint;
  readonly scale: StickerPoint;
  readonly rotation: number;
  readonly entranceSweep: number;
  readonly entranceScaleProgress: number;
  readonly time: number;
}

export interface PreparedStickerSource {
  /** Atomically installs the already decoded, outlined, and GPU-warmed source. */
  commit(): void;
  /** Crossfades and shrinks into the prepared source before replaying entrance. */
  commitWithEntrance(): void;
  /** Releases the staged GPU texture when the prepared source is no longer needed. */
  dispose(): void;
}

export interface StickerInstance {
  setSource(source: StickerSource): Promise<void>;
  prepareSource(
    source: StickerSource,
    options?: Partial<StickerOptions>,
  ): Promise<PreparedStickerSource>;
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
  /** Set a deterministic peel pose without synthesizing pointer events. */
  setPeelProgress(progress: number, motion?: StickerPlaybackMotion): void;
  /** Set a deterministic pose of the built-in scale-and-laser entrance. */
  setEntranceProgress(progress: number): void;
  /** Toggle the material-bound scan used while removing an image background. */
  setBackgroundRemovalEffect(active: boolean): void;
  /** Replay the built-in spring-and-sweep entrance animation. */
  reappear(): void;
  /** Increase the backing-buffer density without changing the logical layout. */
  setRenderScale(scale: number): void;
  /** Capture the exact visual pose for deterministic high-resolution replay. */
  getRenderSnapshot(): StickerRenderSnapshot;
  /** Render a previously captured visual pose without advancing animation. */
  setRenderSnapshot(snapshot: StickerRenderSnapshot): void;
  resize(): void;
  getState(): Readonly<StickerState>;
  destroy(): void;
}

export const DEFAULT_STICKER_OPTIONS = {
  source: undefined as StickerSource | undefined,
  outline: { width: 18, color: "#ffffff" },
  edge: { width: 2.4, strength: 0.7 },
  shadow: {
    color: "#191823",
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42,
  },
  lighting: {
    direction: { x: -0.38, y: 0.52, z: 0.76 },
    intensity: 0.8,
    ambient: 0.35,
    softness: 0.6,
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    detachThreshold: 0.74,
    residue: true,
    surfaceShadow: true,
    release: "snap" as const,
  },
  back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
  material: {
    type: "original" as const,
    intensity: 0.86,
    scale: 1,
    seed: 0.37,
    holographicColors: ["#f2a7c5", "#8edfd5", "#9db4ea"] as [
      string,
      string,
      string,
    ],
  },
  sound: { src: "", volume: 0.7, enabled: true },
  display: { width: 0, height: 0 },
  tilt: -3,
  wind: 0.25,
  quality: "high" as const,
};

export type ResolvedStickerOptions = {
  source?: StickerSource;
  outline: Required<StickerOutlineOptions>;
  edge: Required<StickerEdgeOptions>;
  shadow: Required<StickerShadowOptions>;
  lighting: {
    direction: StickerLightDirection;
    intensity: number;
    ambient: number;
    softness: number;
  };
  peel: Required<StickerPeelOptions>;
  back: Required<StickerBackOptions>;
  material: Required<StickerMaterialOptions>;
  sound: Required<StickerSoundOptions>;
  display: Required<StickerDisplayOptions>;
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
    edge: { ...base.edge, ...patch.edge },
    shadow: { ...base.shadow, ...patch.shadow },
    lighting: {
      ...base.lighting,
      ...patch.lighting,
      direction: {
        ...base.lighting.direction,
        ...patch.lighting?.direction,
      },
    },
    peel: { ...base.peel, ...patch.peel },
    back: { ...base.back, ...patch.back },
    material: { ...base.material, ...patch.material },
    sound: { ...base.sound, ...patch.sound },
    display: { ...base.display, ...patch.display },
    tilt: patch.tilt ?? base.tilt,
    wind: patch.wind ?? base.wind,
    quality: patch.quality ?? base.quality,
  };
}
