/** Text or SVG artwork used to build the sticker texture. */
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
  /** Raw SVG markup. Sticker Forge always sanitizes it before rasterization. */
  svg: string;
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

export interface StickerInstance {
  /** Rebuild the sticker texture. Resolves after the artwork is ready. */
  setSource(source: StickerSource): Promise<void>;
  /** Deep-merge a partial option patch into the current settings. */
  setOptions(options: Partial<StickerOptions>): void;
  reset(): void;
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
