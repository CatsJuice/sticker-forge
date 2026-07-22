/** Text, SVG markup, or browser-decodable image artwork. */
export type StickerSource =
  | StickerTextSource
  | StickerSvgSource
  | StickerImageSource;

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
  /** Raw SVG markup. Sticker Forge always sanitizes it before rasterization. */
  svg: string;
}

export interface StickerImageSource {
  type: "image";
  /** Browser-decodable image URL, typically a data URL from a local upload. */
  src: string;
  name?: string;
}

export interface StickerOutlineOptions {
  /** Outline width in artwork-space pixels. */
  width?: number;
  color?: string;
}

export interface StickerShadowOptions {
  color?: string;
  opacity?: number;
  blur?: number;
  distance?: number;
  /** Shadow direction in degrees. */
  angle?: number;
}

export interface StickerBackOptions {
  color?: string;
  gloss?: number;
  roughness?: number;
}

export interface StickerSoundOptions {
  /** Custom peel-sound URL. Omit it to use the sound bundled with Sticker Forge. */
  src?: string;
  /** Master peel-sound volume from 0 to 1. */
  volume?: number;
  enabled?: boolean;
}

export interface StickerPeelOptions {
  /** Curl radius normalized to the sticker's short side. `0.12` means 12%. */
  radius?: number;
  /** Normalized spring strength from 0 to 1. */
  stiffness?: number;
  /** Width of the draggable edge band in CSS pixels. */
  grabWidth?: number;
  /** Maximum curl angle in radians. */
  maxAngle?: number;
  /** What happens after a pointer is released. */
  release?: "reset" | "stay" | "snap";
}

export interface StickerOptions {
  source?: StickerSource;
  outline?: StickerOutlineOptions;
  shadow?: StickerShadowOptions;
  peel?: StickerPeelOptions;
  back?: StickerBackOptions;
  sound?: StickerSoundOptions;
  /** Flat sticker rotation in degrees. */
  tilt?: number;
  /** Subtle free-edge flutter intensity. */
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
  /** Normalized peel amount from 0 (flat) to 1 (fully lifted). */
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
  /** Rebuild the sticker texture. Resolves after the artwork is ready. */
  setSource(source: StickerSource): Promise<void>;
  /** Deep-merge a partial option patch into the current settings. */
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

/** Mount an interactive sticker into an element or a matching selector. */
export declare function createSticker(
  target: HTMLElement | string,
  options?: StickerOptions,
): Promise<StickerInstance>;

/** Register `<sticker-forge>` once. Calling this repeatedly is safe. */
export declare function defineStickerForge(tagName?: string): void;

/** Sanitize raw SVG markup with the same policy used by `setSource()`. */
export declare function sanitizeSvgMarkup(markup: string): string;

/** Duration of the built-in scale-and-laser entrance animation. */
export declare const STICKER_ENTRANCE_DURATION_MS = 720;

export interface StickerReadyDetail {
  width: number;
  height: number;
}

export interface StickerPeelStartDetail {
  amount: number;
  progress: number;
  origin: StickerPoint;
}

export interface StickerPeelChangeDetail {
  amount: number;
  progress: number;
  direction?: StickerPoint;
}

export interface StickerPeelEndDetail {
  amount: number;
  progress: number;
  willReset: boolean;
}

export interface StickerErrorDetail {
  message: string;
}

/**
 * Runtime class behind the auto-registered `<sticker-forge>` element.
 * Its `ready` event has no detail; peel and error events use the detail types above.
 */
export declare class StickerForgeElement extends HTMLElement {
  static readonly observedAttributes: string[];
  setSource(source: StickerSource): Promise<void>;
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
  setPeelProgress(progress: number, motion?: StickerPlaybackMotion): void;
  setEntranceProgress(progress: number): void;
  reappear(): void;
  setRenderScale(scale: number): void;
  resize(): void;
  getState(): Readonly<StickerState>;
  destroy(): void;

  addEventListener(
    type: "ready",
    listener: (this: StickerForgeElement, event: CustomEvent<void>) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "peelstart",
    listener: (
      this: StickerForgeElement,
      event: CustomEvent<StickerPeelStartDetail>,
    ) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "peelchange",
    listener: (
      this: StickerForgeElement,
      event: CustomEvent<StickerPeelChangeDetail>,
    ) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "peelend",
    listener: (
      this: StickerForgeElement,
      event: CustomEvent<StickerPeelEndDetail>,
    ) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "cyclecomplete",
    listener: (
      this: StickerForgeElement,
      event: CustomEvent<{ progress: 0 }>,
    ) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: "error",
    listener: (
      this: StickerForgeElement,
      event: CustomEvent<StickerErrorDetail>,
    ) => unknown,
    options?: boolean | AddEventListenerOptions,
  ): void;
  addEventListener(
    type: string,
    listener: EventListenerOrEventListenerObject,
    options?: boolean | AddEventListenerOptions,
  ): void;
}

declare global {
  interface HTMLElementTagNameMap {
    "sticker-forge": StickerForgeElement;
  }
}

/** Exposes the same exports as `window.StickerForge` in the IIFE build. */
export as namespace StickerForge;
