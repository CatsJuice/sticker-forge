import type {
  StickerImageSource,
  StickerOutlineOptions,
  StickerSource,
  StickerSvgSource,
  StickerTextSource,
} from "./types";

export interface PreparedArtwork {
  canvas: HTMLCanvasElement;
  width: number;
  height: number;
  aspect: number;
  alpha: Uint8ClampedArray;
  /** Transparent pixels connected to the canvas edge (the sticker exterior). */
  exteriorAlpha: Uint8Array;
  /** Normalized left/right silhouette extremes for every occupied scanline. */
  support: Float32Array;
  /** 4-connected opaque regions, numbered from 1. Zero is transparent. */
  componentLabels: Uint8Array;
  components: PreparedArtworkComponent[];
  /** Whether the decoded source image contained non-opaque pixels. */
  hasTransparency: boolean;
}

export interface PreparedArtworkComponent {
  id: number;
  support: Float32Array;
}

// The export workspace supports up to 260% zoom. A 2K source keeps generated
// text and SVG artwork sharp at that scale without inflating every texture to 4K.
const MAX_TEXTURE_EDGE = 2048;
const MIN_TEXTURE_EDGE = 320;
const VISIBLE_ALPHA_THRESHOLD = 0.1 * 255;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

export function createExteriorAlphaMask(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
) {
  const exterior = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  let queueStart = 0;
  let queueEnd = 0;

  const enqueue = (x: number, y: number) => {
    if (x < 0 || x >= width || y < 0 || y >= height) return;
    const index = y * width + x;
    if (exterior[index] || alpha[index] >= VISIBLE_ALPHA_THRESHOLD) return;
    exterior[index] = 1;
    queue[queueEnd] = index;
    queueEnd += 1;
  };

  for (let x = 0; x < width; x += 1) {
    enqueue(x, 0);
    enqueue(x, height - 1);
  }
  for (let y = 1; y < height - 1; y += 1) {
    enqueue(0, y);
    enqueue(width - 1, y);
  }

  while (queueStart < queueEnd) {
    const index = queue[queueStart];
    queueStart += 1;
    const x = index % width;
    const y = Math.floor(index / width);
    enqueue(x - 1, y);
    enqueue(x + 1, y);
    enqueue(x, y - 1);
    enqueue(x, y + 1);
  }

  return exterior;
}

function findConnectedComponents(
  alpha: Uint8ClampedArray,
  width: number,
  height: number,
) {
  const labels = new Uint8Array(width * height);
  const queue = new Int32Array(width * height);
  const components: PreparedArtworkComponent[] = [];
  const threshold = 0.1 * 255;
  let nextId = 1;

  for (let start = 0; start < labels.length; start += 1) {
    if (labels[start] || alpha[start] < threshold || nextId > 255) continue;
    const id = nextId++;
    let head = 0;
    let tail = 0;
    queue[tail++] = start;
    labels[start] = id;
    const rowBounds = new Int32Array(height * 2);
    rowBounds.fill(-1);
    while (head < tail) {
      const index = queue[head++];
      const x = index % width;
      const y = Math.floor(index / width);
      const bound = y * 2;
      if (rowBounds[bound] < 0 || x < rowBounds[bound]) rowBounds[bound] = x;
      if (x > rowBounds[bound + 1]) rowBounds[bound + 1] = x;
      const visit = (candidate: number) => {
        if (labels[candidate] || alpha[candidate] < threshold) return;
        labels[candidate] = id;
        queue[tail++] = candidate;
      };
      if (x > 0) visit(index - 1);
      if (x + 1 < width) visit(index + 1);
      if (y > 0) visit(index - width);
      if (y + 1 < height) visit(index + width);
    }
    const support: number[] = [];
    for (let y = 0; y < height; y += 1) {
      const left = rowBounds[y * 2];
      const right = rowBounds[y * 2 + 1];
      if (left < 0) continue;
      const normalizedY = y / Math.max(height - 1, 1);
      support.push(left / Math.max(width - 1, 1), normalizedY);
      if (right !== left) {
        support.push(right / Math.max(width - 1, 1), normalizedY);
      }
    }
    components.push({ id, support: new Float32Array(support) });
  }
  return { labels, components };
}

function parseSvgNumber(value: string | null): number | null {
  if (!value) return null;
  const parsed = Number.parseFloat(value);
  return Number.isFinite(parsed) && parsed > 0 ? parsed : null;
}

export function sanitizeSvgMarkup(markup: string): string {
  if (markup.length > 2_000_000) {
    throw new Error("SVG markup must be smaller than 2 MB.");
  }
  const documentNode = new DOMParser().parseFromString(markup, "image/svg+xml");
  if (documentNode.querySelector("parsererror")) {
    throw new Error("The SVG could not be parsed.");
  }

  const root = documentNode.documentElement;
  if (root.localName.toLowerCase() !== "svg") {
    throw new Error("The uploaded file is not an SVG document.");
  }

  root
    .querySelectorAll(
      "script, foreignObject, iframe, object, embed, audio, video, canvas, style, animate, animateMotion, animateTransform, set",
    )
    .forEach((node) => node.remove());

  for (const node of [root, ...Array.from(root.querySelectorAll("*"))]) {
    for (const attribute of Array.from(node.attributes)) {
      const name = attribute.name.toLowerCase();
      const value = attribute.value.trim();
      if (name.startsWith("on")) {
        node.removeAttribute(attribute.name);
        continue;
      }
      if (name === "href" || name === "xlink:href") {
        if (!value.startsWith("#")) node.removeAttribute(attribute.name);
        continue;
      }
      if (/url\s*\(/i.test(value) && !/url\s*\(\s*["']?#/i.test(value)) {
        node.removeAttribute(attribute.name);
      }
      if (/^javascript:/i.test(value) || /^data:text\/html/i.test(value)) {
        node.removeAttribute(attribute.name);
      }
    }
  }

  root.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  return new XMLSerializer().serializeToString(root);
}

function getSvgAspect(markup: string): number {
  const documentNode = new DOMParser().parseFromString(markup, "image/svg+xml");
  const root = documentNode.documentElement;
  const viewBox = root.getAttribute("viewBox")?.trim().split(/[\s,]+/).map(Number);
  if (
    viewBox?.length === 4 &&
    Number.isFinite(viewBox[2]) &&
    Number.isFinite(viewBox[3]) &&
    viewBox[2] > 0 &&
    viewBox[3] > 0
  ) {
    return clamp(viewBox[2] / viewBox[3], 0.15, 8);
  }
  const width = parseSvgNumber(root.getAttribute("width"));
  const height = parseSvgNumber(root.getAttribute("height"));
  return width && height ? clamp(width / height, 0.15, 8) : 1;
}

async function loadSvgImage(markup: string): Promise<HTMLImageElement> {
  const blob = new Blob([markup], { type: "image/svg+xml;charset=utf-8" });
  const url = URL.createObjectURL(blob);
  try {
    const image = new Image();
    image.decoding = "async";
    image.src = url;
    await image.decode();
    return image;
  } finally {
    URL.revokeObjectURL(url);
  }
}

async function loadImage(src: string): Promise<HTMLImageElement> {
  if (!/^(data:|blob:|https?:|\/)/i.test(src)) {
    throw new Error("The image URL must use data, blob, HTTP, or HTTPS.");
  }
  const image = new Image();
  image.decoding = "async";
  if (/^https?:/i.test(src)) image.crossOrigin = "anonymous";
  image.src = src;
  await image.decode();
  if (!image.naturalWidth || !image.naturalHeight) {
    throw new Error("The image has no drawable dimensions.");
  }
  return image;
}

function imageHasTransparency(image: HTMLImageElement): boolean {
  const maxEdge = 640;
  const scale = Math.min(
    1,
    maxEdge / Math.max(image.naturalWidth, image.naturalHeight),
  );
  const width = Math.max(1, Math.round(image.naturalWidth * scale));
  const height = Math.max(1, Math.round(image.naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.clearRect(0, 0, width, height);
  context.drawImage(image, 0, 0, width, height);
  const pixels = context.getImageData(0, 0, width, height).data;
  for (let index = 3; index < pixels.length; index += 4) {
    if (pixels[index] < 255) return true;
  }
  return false;
}

export async function imageSourceHasTransparency(src: string) {
  return imageHasTransparency(await loadImage(src));
}

async function renderTextSource(source: StickerTextSource) {
  const fontFamily =
    source.fontFamily ?? "Arial Rounded MT Bold, Arial Black, sans-serif";
  const defaultWeight = source.fontWeight ?? 900;
  const richBlocks = source.richText?.blocks.filter((block) => block.runs.length);
  if (richBlocks?.length) {
    const probe = document.createElement("canvas").getContext("2d");
    if (!probe) throw new Error("Canvas 2D is unavailable.");
    const padding = 144;

    const buildLayout = (scale: number) => {
      const lines = richBlocks.map((block) => {
        let width = 0;
        let ascent = 0;
        let descent = 0;
        let maxFontSize = 0;
        const runs = block.runs.map((run) => {
          const fontSize = clamp((run.fontSize ?? 28) * scale, 24, 720);
          maxFontSize = Math.max(maxFontSize, fontSize);
          const fontWeight = run.fontWeight ?? defaultWeight;
          probe.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
          const metrics = probe.measureText(run.text || " ");
          const runAscent =
            metrics.actualBoundingBoxAscent || Math.max(fontSize * 0.76, 1);
          const runDescent =
            metrics.actualBoundingBoxDescent || Math.max(fontSize * 0.2, 1);
          const runWidth = run.text ? metrics.width : 0;
          width += runWidth;
          ascent = Math.max(ascent, runAscent);
          descent = Math.max(descent, runDescent);
          return { ...run, fontSize, fontWeight, width: runWidth };
        });
        const lineFontSize = maxFontSize || 28 * scale;
        if (!runs.length || ascent + descent < 1) {
          ascent = lineFontSize * 0.76;
          descent = lineFontSize * 0.24;
        }
        return {
          align: block.align ?? "center",
          runs,
          width,
          ascent,
          descent,
          height:
            Math.max(ascent + descent, lineFontSize) *
            clamp(block.lineHeight ?? 1.2, 0.7, 3),
        };
      });
      return {
        lines,
        contentWidth: Math.max(1, ...lines.map((line) => line.width)),
        contentHeight: lines.reduce((sum, line) => sum + line.height, 0),
      };
    };

    let scale = 8;
    let layout = buildLayout(scale);
    const widthScale = 1750 / Math.max(layout.contentWidth, 1);
    const heightScale = 1790 / Math.max(layout.contentHeight, 1);
    if (widthScale < 1 || heightScale < 1) {
      scale *= Math.min(widthScale, heightScale);
      layout = buildLayout(scale);
    }

    if (document.fonts?.load) {
      const fonts = new Set<string>();
      for (const line of layout.lines) {
        for (const run of line.runs) {
          fonts.add(`${run.fontWeight} ${run.fontSize}px ${fontFamily}`);
        }
      }
      await Promise.all(
        [...fonts].map((font) => document.fonts.load(font).catch(() => [])),
      );
      layout = buildLayout(scale);
    }

    const width = clamp(
      Math.ceil(layout.contentWidth + padding * 2),
      MIN_TEXTURE_EDGE,
      MAX_TEXTURE_EDGE,
    );
    const height = clamp(
      Math.ceil(layout.contentHeight + padding * 2),
      MIN_TEXTURE_EDGE,
      MAX_TEXTURE_EDGE,
    );
    const canvas = document.createElement("canvas");
    canvas.width = width;
    canvas.height = height;
    const context = canvas.getContext("2d", { willReadFrequently: true });
    if (!context) throw new Error("Canvas 2D is unavailable.");
    context.clearRect(0, 0, width, height);
    context.textBaseline = "alphabetic";

    let top = (height - layout.contentHeight) / 2;
    for (const line of layout.lines) {
      const lineLeft =
        line.align === "left"
          ? padding
          : line.align === "right"
            ? width - padding - line.width
            : (width - line.width) / 2;
      const baseline =
        top + (line.height - line.ascent - line.descent) / 2 + line.ascent;
      let x = lineLeft;
      for (const run of line.runs) {
        context.font = `${run.fontWeight} ${run.fontSize}px ${fontFamily}`;
        context.fillStyle = run.color ?? source.color ?? "#19191d";
        context.fillText(run.text, x, baseline);
        if (run.underline && run.width > 0) {
          const thickness = Math.max(2, run.fontSize * 0.045);
          context.fillRect(
            x,
            baseline + Math.max(2, run.fontSize * 0.07),
            run.width,
            thickness,
          );
        }
        x += run.width;
      }
      top += line.height;
    }
    return canvas;
  }

  const fontWeight = defaultWeight;
  let fontSize = 420;
  const probe = document.createElement("canvas").getContext("2d");
  if (!probe) throw new Error("Canvas 2D is unavailable.");

  if (document.fonts?.load) {
    try {
      await document.fonts.load(`${fontWeight} ${fontSize}px ${fontFamily}`);
    } catch {
      // Browser font fallback remains deterministic enough for texture creation.
    }
  }

  const text = source.text || " ";
  probe.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  let metrics = probe.measureText(text);
  const initialWidth = Math.max(1, metrics.width);
  if (initialWidth > 1750) {
    fontSize *= 1750 / initialWidth;
    probe.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
    metrics = probe.measureText(text);
  }

  const ascent =
    metrics.actualBoundingBoxAscent || Math.max(fontSize * 0.76, 1);
  const descent = metrics.actualBoundingBoxDescent || Math.max(fontSize * 0.2, 1);
  const padding = 144;
  const width = clamp(
    Math.ceil(metrics.width + padding * 2),
    MIN_TEXTURE_EDGE,
    MAX_TEXTURE_EDGE,
  );
  const height = clamp(
    Math.ceil(ascent + descent + padding * 2),
    MIN_TEXTURE_EDGE,
    1280,
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");

  context.clearRect(0, 0, width, height);
  context.font = `${fontWeight} ${fontSize}px ${fontFamily}`;
  context.textBaseline = "alphabetic";
  context.textAlign = "center";
  context.fillStyle = source.color ?? "#19191d";
  context.fillText(text, width / 2, (height + ascent - descent) / 2);
  return canvas;
}

async function renderSvgSource(source: StickerSvgSource) {
  const sanitized = sanitizeSvgMarkup(source.svg);
  const aspect = getSvgAspect(sanitized);
  const contentMax = 1740;
  const padding = 144;
  const contentWidth = aspect >= 1 ? contentMax : contentMax * aspect;
  const contentHeight = aspect >= 1 ? contentMax / aspect : contentMax;
  const width = clamp(
    Math.ceil(contentWidth + padding * 2),
    MIN_TEXTURE_EDGE,
    MAX_TEXTURE_EDGE,
  );
  const height = clamp(
    Math.ceil(contentHeight + padding * 2),
    MIN_TEXTURE_EDGE,
    MAX_TEXTURE_EDGE,
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");

  const image = await loadSvgImage(sanitized);
  context.drawImage(
    image,
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
  );
  return canvas;
}

async function renderImageSource(source: StickerImageSource) {
  const image = await loadImage(source.src);
  const hasTransparency = imageHasTransparency(image);
  const aspect = clamp(image.naturalWidth / image.naturalHeight, 0.15, 8);
  const contentMax = 1740;
  const padding = 144;
  const contentWidth = aspect >= 1 ? contentMax : contentMax * aspect;
  const contentHeight = aspect >= 1 ? contentMax / aspect : contentMax;
  const width = clamp(
    Math.ceil(contentWidth + padding * 2),
    MIN_TEXTURE_EDGE,
    MAX_TEXTURE_EDGE,
  );
  const height = clamp(
    Math.ceil(contentHeight + padding * 2),
    MIN_TEXTURE_EDGE,
    MAX_TEXTURE_EDGE,
  );
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.clearRect(0, 0, width, height);
  context.drawImage(
    image,
    padding,
    padding,
    width - padding * 2,
    height - padding * 2,
  );
  return { canvas, hasTransparency };
}

function tintAlpha(source: HTMLCanvasElement, color: string) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.fillStyle = color;
  context.fillRect(0, 0, canvas.width, canvas.height);
  context.globalCompositeOperation = "destination-in";
  context.drawImage(source, 0, 0);
  return canvas;
}

const DISTANCE_INFINITY = 1_000_000_000_000;

function distanceTransform1D(
  source: Float32Array,
  sourceOffset: number,
  sourceStride: number,
  target: Float32Array,
  targetOffset: number,
  targetStride: number,
  length: number,
  parabolas: Int32Array,
  boundaries: Float64Array,
) {
  let envelopeIndex = 0;
  parabolas[0] = 0;
  boundaries[0] = Number.NEGATIVE_INFINITY;
  boundaries[1] = Number.POSITIVE_INFINITY;

  for (let position = 1; position < length; position += 1) {
    let previous = parabolas[envelopeIndex];
    let intersection =
      (source[sourceOffset + position * sourceStride] + position * position -
        (source[sourceOffset + previous * sourceStride] + previous * previous)) /
      (2 * position - 2 * previous);
    while (intersection <= boundaries[envelopeIndex]) {
      envelopeIndex -= 1;
      previous = parabolas[envelopeIndex];
      intersection =
        (source[sourceOffset + position * sourceStride] + position * position -
          (source[sourceOffset + previous * sourceStride] + previous * previous)) /
        (2 * position - 2 * previous);
    }
    envelopeIndex += 1;
    parabolas[envelopeIndex] = position;
    boundaries[envelopeIndex] = intersection;
    boundaries[envelopeIndex + 1] = Number.POSITIVE_INFINITY;
  }

  envelopeIndex = 0;
  for (let position = 0; position < length; position += 1) {
    while (boundaries[envelopeIndex + 1] < position) envelopeIndex += 1;
    const nearest = parabolas[envelopeIndex];
    const delta = position - nearest;
    target[targetOffset + position * targetStride] =
      delta * delta + source[sourceOffset + nearest * sourceStride];
  }
}

/** Expands an alpha silhouette with a continuous round Euclidean offset. */
function expandAlpha(source: HTMLCanvasElement, radius: number) {
  const width = source.width;
  const height = source.height;
  const sourceContext = source.getContext("2d", { willReadFrequently: true });
  if (!sourceContext) throw new Error("Canvas 2D is unavailable.");
  const sourcePixels = sourceContext.getImageData(0, 0, width, height).data;
  const size = width * height;
  const seeds = new Float32Array(size);
  const rowDistances = new Float32Array(size);
  let hasSeed = false;

  for (let pixel = 0; pixel < size; pixel += 1) {
    const occupied =
      sourcePixels[pixel * 4 + 3] >= VISIBLE_ALPHA_THRESHOLD;
    seeds[pixel] = occupied ? 0 : DISTANCE_INFINITY;
    hasSeed ||= occupied;
  }

  const maxLength = Math.max(width, height);
  const parabolas = new Int32Array(maxLength);
  const boundaries = new Float64Array(maxLength + 1);
  if (hasSeed) {
    for (let y = 0; y < height; y += 1) {
      distanceTransform1D(
        seeds,
        y * width,
        1,
        rowDistances,
        y * width,
        1,
        width,
        parabolas,
        boundaries,
      );
    }
    for (let x = 0; x < width; x += 1) {
      distanceTransform1D(
        rowDistances,
        x,
        width,
        seeds,
        x,
        width,
        height,
        parabolas,
        boundaries,
      );
    }
  }

  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable.");
  const mask = context.createImageData(width, height);
  for (let pixel = 0; pixel < size; pixel += 1) {
    const coverage = hasSeed
      ? clamp(radius + 0.5 - Math.sqrt(seeds[pixel]), 0, 1)
      : 0;
    const offset = pixel * 4;
    mask.data[offset] = 255;
    mask.data[offset + 1] = 255;
    mask.data[offset + 2] = 255;
    mask.data[offset + 3] = Math.round(coverage * 255);
  }
  context.putImageData(mask, 0, 0);
  return canvas;
}

function addOutline(
  source: HTMLCanvasElement,
  outline: Required<StickerOutlineOptions>,
) {
  const canvas = document.createElement("canvas");
  canvas.width = source.width;
  canvas.height = source.height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");

  const radius = clamp(outline.width * 2.35, 0, 112);
  if (radius > 0.25) {
    const expandedAlpha = expandAlpha(source, radius);
    context.drawImage(tintAlpha(expandedAlpha, outline.color), 0, 0);
  }
  context.drawImage(source, 0, 0);
  return canvas;
}

export async function prepareArtwork(
  source: StickerSource,
  outline: Required<StickerOutlineOptions>,
): Promise<PreparedArtwork> {
  const rendered =
    source.type === "image"
      ? await renderImageSource(source)
      : {
          canvas:
            source.type === "text"
              ? await renderTextSource(source)
              : await renderSvgSource(source),
          hasTransparency: true,
        };
  const sourceCanvas = rendered.canvas;
  const canvas = addOutline(sourceCanvas, outline);
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");
  const image = context.getImageData(0, 0, canvas.width, canvas.height);
  const alpha = new Uint8ClampedArray(canvas.width * canvas.height);
  for (let sourceIndex = 3, targetIndex = 0; sourceIndex < image.data.length; sourceIndex += 4) {
    alpha[targetIndex] = image.data[sourceIndex];
    targetIndex += 1;
  }
  const support: number[] = [];
  for (let y = 0; y < canvas.height; y += 1) {
    const rowOffset = y * canvas.width;
    let left = -1;
    let right = -1;
    for (let x = 0; x < canvas.width; x += 1) {
      if (alpha[rowOffset + x] < VISIBLE_ALPHA_THRESHOLD) continue;
      if (left < 0) left = x;
      right = x;
    }
    if (left < 0) continue;
    const normalizedY = y / Math.max(canvas.height - 1, 1);
    support.push(left / Math.max(canvas.width - 1, 1), normalizedY);
    if (right !== left) {
      support.push(right / Math.max(canvas.width - 1, 1), normalizedY);
    }
  }
  const connected = findConnectedComponents(alpha, canvas.width, canvas.height);
  return {
    canvas,
    width: canvas.width,
    height: canvas.height,
    aspect: canvas.width / canvas.height,
    alpha,
    exteriorAlpha: createExteriorAlphaMask(alpha, canvas.width, canvas.height),
    support: new Float32Array(support),
    componentLabels: connected.labels,
    components: connected.components,
    hasTransparency: rendered.hasTransparency,
  };
}
