"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
} from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub } from "@fortawesome/free-brands-svg-icons";
import {
  faAlignCenter,
  faAlignLeft,
  faAlignRight,
  faArrowLeft,
  faArrowRight,
  faArrowUpFromBracket,
  faBold,
  faCheck,
  faChevronDown,
  faFont,
  faWandMagicSparkles,
  faPlus,
  faRotateLeft,
  faTextHeight,
  faUnderline,
} from "@fortawesome/free-solid-svg-icons";
import type {
  PreparedStickerSource,
  StickerInstance,
  StickerOptions,
  StickerRichTextBlock,
  StickerRichTextDocument,
  StickerRichTextRun,
  StickerSource,
} from "@/lib/sticker-forge";
import {
  imageSourceHasTransparency,
  sanitizeSvgMarkup,
} from "@/lib/sticker-forge";
import {
  createGalleryPreview,
  type GalleryPreviewResult,
} from "@/lib/gallery-preview";
import {
  createGalleryItem,
  deleteGalleryItem,
  getGalleryAsset,
  listGalleryFolders,
  listGalleryItems,
  updateGalleryLayout,
} from "@/lib/gallery-storage";
import type {
  CreateGalleryPayload,
  GalleryAsset,
  GalleryFolderRecord,
  GalleryItem,
  GalleryLayout,
} from "@/lib/gallery-types";
import {
  DEFAULT_GALLERY_FOLDER_ID,
  EVOLUTION_GALLERY_FOLDER_ID,
} from "@/lib/gallery-types";
import {
  GalleryCanvas,
  type GalleryEntryOrigin,
  type GalleryFolderDropPreview,
} from "./GalleryCanvas";
import { GalleryFolderDock } from "./GalleryFolderDock";
import { GalleryQuickEditFlight } from "./GalleryQuickEditFlight";
import {
  GalleryAddFlight,
  type GalleryAddFlightRect,
} from "./GalleryAddFlight";
import { ExportDialog } from "./ExportDialog";
import { BackgroundRemovalEffect } from "./BackgroundRemovalEffect";
import {
  removeImageBackground,
  type BackgroundRemovalResult,
} from "@/lib/background-removal";
import {
  getLaserEffectSettings,
  LASER_PREVIEW_EVENT,
} from "@/lib/laser-debug";
import { getParticleEffectSettings } from "@/lib/particle-debug";
import { convertHeicToJpeg, isHeicFile } from "@/lib/heic";

type StickerController = StickerInstance;
type SourceMode = "text" | "image";
type Locale = "zh" | "en";
const PANEL_AUTO_COLLAPSE_QUERY = "(max-width: 960px)";
const EXPORT_SHEET_MOBILE_BREAKPOINT = 620;
type BackgroundRemovalPhase =
  | "idle"
  | "loading"
  | "processing"
  | "dissolving"
  | "finishing"
  | "error";

type StudioSettings = {
  outline: { width: number; color: string };
  shadow: {
    opacity: number;
    blur: number;
    distance: number;
    angle: number;
    color: string;
  };
  peel: {
    radius: number;
    stiffness: number;
    grabWidth: number;
    maxAngle: number;
    release: "snap";
  };
  sound: { enabled: boolean; volume: number };
  back: { color: string; gloss: number; roughness: number };
  tilt: number;
  wind: number;
  quality: "high";
};

const DEFAULT_INK = "#19191d";
const DEFAULT_ACCENT = "rgb(36, 126, 245)";
const DEFAULT_TEXT = "PEEL ME\n@cats_juice";
const DEFAULT_IMAGE_SRC = "/default-image.svg";
const BACKGROUND_REMOVAL_TIP_SEEN_KEY =
  "sticker-forge-background-removal-tip-seen";
const ADD_TO_GALLERY_FOLDER_STORAGE_KEY =
  "sticker-forge:add-to-gallery-folder";
const PANEL_DRAG_CLICK_SLOP = 6;
const PANEL_MIN_OPEN_VIEWPORT_RATIO = 0.45;
const FONT_SIZE_PRESETS = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96, 120, 160, 200, 240];
const LINE_HEIGHT_PRESETS = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2, 2.5, 3];

function resolvePanelLength(panel: HTMLElement, cssValue: string) {
  const probe = document.createElement("span");
  probe.style.cssText =
    `position:absolute;visibility:hidden;width:0;height:${cssValue};pointer-events:none`;
  panel.appendChild(probe);
  const height = probe.getBoundingClientRect().height;
  probe.remove();
  return height;
}

function panelContentOpacity(
  offset: number,
  fadeStartOffset: number,
  collapseOffset: number,
) {
  const fadeProgress = Math.min(
    1,
    Math.max(
      0,
      (offset - fadeStartOffset) /
        Math.max(1, collapseOffset - fadeStartOffset),
    ),
  );
  return 1 - fadeProgress * 0.8;
}

const DEFAULT_RICH_TEXT = {
  blocks: [
    {
      align: "center",
      lineHeight: 1.2,
      runs: [
        { text: "PEEL ", color: DEFAULT_INK, fontSize: 28, fontWeight: 900 },
        { text: "ME", color: DEFAULT_ACCENT, fontSize: 28, fontWeight: 900 },
      ],
    },
    {
      align: "center",
      lineHeight: 0.8,
      runs: [
        {
          text: "@cats_juice",
          color: DEFAULT_INK,
          fontSize: 10,
          fontWeight: 500,
        },
      ],
    },
  ],
} satisfies StickerRichTextDocument;
const GITHUB_URL = "https://github.com/CatsJuice/sticker-forge";

const UI = {
  zh: {
    preview: "交互式贴纸预览",
    interactiveSticker: "可以从轮廓边缘拖拽撕起的交互贴纸",
    openPanel: "展开配置面板",
    closePanel: "收起配置面板",
    controls: "贴纸参数",
    title: "贴纸实验台",
    reset: "恢复默认参数",
    github: "打开 GitHub",
    language: "选择语言",
    sourceType: "素材类型",
    text: "文字",
    image: "图像",
    stickerText: "贴纸文字",
    textPlaceholder: "输入文字",
    textColor: "文字颜色",
    richEditor: "富文本贴纸内容",
    bold: "加粗",
    underline: "下划线",
    fontSize: "字号",
    fontSizePresets: "字号预设",
    lineHeight: "行高",
    lineHeightPresets: "行高预设",
    alignment: "对齐方式",
    alignLeft: "左对齐",
    alignCenter: "居中对齐",
    alignRight: "右对齐",
    uploadImage: "上传图像素材",
    uploadPrompt: "点击选择，或拖到这里",
    localOnly: "仅在浏览器本地处理",
    removeBackground: "移除背景",
    tryRemoveBackground: "试试移除背景",
    removeBackgroundHint: "AI 模型在本机运行，图像不会上传",
    loadingRemovalModel: "正在加载抠图模型",
    removingBackground: "正在识别主体",
    dissolvingBackground: "正在消散背景",
    restoringOutline: "正在生成新描边",
    backgroundRemoved: "背景已移除",
    backgroundRemovalFailed: "背景移除失败，请重试",
    waitingMaterial: "等待材质就绪",
    assetFailed: "素材处理失败，已保留上一张贴纸",
    textFailed: "文字素材处理失败，已保留上一张贴纸",
    chooseImage: "请选择图像文件",
    imageTooLarge: "图像需要小于 15 MB",
    reading: "正在本地读取",
    decodingHeic: "正在本地解码 HEIC",
    processed: "本地处理完成",
    invalidImage: "这个图像无法读取，请换一个试试",
    uploadFirst: "请先上传一个图像文件",
    resetDone: "参数已恢复默认值",
    copyBlocked: "浏览器阻止了复制，请在 HTTPS 页面重试",
    surface: "轮廓与姿态",
    outlineWidth: "描边宽度",
    tilt: "整体倾斜",
    outline: "描边",
    outlineColor: "描边颜色",
    backing: "背胶",
    backColor: "贴纸背面颜色",
    peel: "撕起手感",
    curlRadius: "卷曲半径",
    stiffness: "贴纸硬度",
    wind: "风动",
    volume: "撕开音量",
    material: "材质与阴影",
    shadowOpacity: "阴影强度",
    shadowBlur: "阴影柔度",
    backGloss: "背面光泽",
    copy: "复制嵌入代码",
    export: "导出",
    addToGallery: "添加到 Gallery",
    addingToGallery: "正在保存…",
    addedToGallery: "已添加到 Gallery",
    galleryLoadFailed: "Gallery 暂时无法加载",
    galleryAddFailed: "无法添加到 Gallery，请稍后重试",
    copied: "已复制代码",
    copiedAnnouncement: "嵌入代码已复制",
    resetSticker: "重置贴纸",
  },
  en: {
    preview: "Interactive sticker preview",
    interactiveSticker: "Interactive sticker — drag any visible edge to peel",
    openPanel: "Open settings panel",
    closePanel: "Close settings panel",
    controls: "Sticker settings",
    title: "Sticker Lab",
    reset: "Restore defaults",
    github: "Open GitHub",
    language: "Choose language",
    sourceType: "Source type",
    text: "Text",
    image: "Image",
    stickerText: "Sticker text",
    textPlaceholder: "Enter text",
    textColor: "Text color",
    richEditor: "Rich sticker text",
    bold: "Bold",
    underline: "Underline",
    fontSize: "Font size",
    fontSizePresets: "Font size presets",
    lineHeight: "Line height",
    lineHeightPresets: "Line height presets",
    alignment: "Alignment",
    alignLeft: "Align left",
    alignCenter: "Align center",
    alignRight: "Align right",
    uploadImage: "Upload image artwork",
    uploadPrompt: "Choose a file or drop it here",
    localOnly: "Processed locally in your browser",
    removeBackground: "Remove background",
    tryRemoveBackground: "Try removing the background",
    removeBackgroundHint: "AI runs locally; your image is never uploaded",
    loadingRemovalModel: "Loading cutout model",
    removingBackground: "Finding the subject",
    dissolvingBackground: "Dissolving background",
    restoringOutline: "Drawing the new outline",
    backgroundRemoved: "Background removed",
    backgroundRemovalFailed: "Background removal failed. Please try again",
    waitingMaterial: "Preparing material",
    assetFailed: "Could not process this artwork; the previous sticker was kept",
    textFailed: "Could not process this text; the previous sticker was kept",
    chooseImage: "Please choose an image file",
    imageTooLarge: "Images must be smaller than 15 MB",
    reading: "Reading locally",
    decodingHeic: "Decoding HEIC locally",
    processed: "Processed locally",
    invalidImage: "This image could not be read; please try another file",
    uploadFirst: "Upload an image file first",
    resetDone: "Defaults restored",
    copyBlocked: "Clipboard access was blocked; try again over HTTPS",
    surface: "Outline & pose",
    outlineWidth: "Outline width",
    tilt: "Tilt",
    outline: "Outline",
    outlineColor: "Outline color",
    backing: "Backing",
    backColor: "Sticker back color",
    peel: "Peel feel",
    curlRadius: "Curl radius",
    stiffness: "Sticker stiffness",
    wind: "Wind",
    volume: "Peel volume",
    material: "Material & shadow",
    shadowOpacity: "Shadow opacity",
    shadowBlur: "Shadow softness",
    backGloss: "Back gloss",
    copy: "Copy embed code",
    export: "Export",
    addToGallery: "Add to Gallery",
    addingToGallery: "Saving…",
    addedToGallery: "Added to Gallery",
    galleryLoadFailed: "Gallery is temporarily unavailable",
    galleryAddFailed: "Could not add to Gallery. Try again in a moment.",
    copied: "Code copied",
    copiedAnnouncement: "Embed code copied",
    resetSticker: "Reset sticker",
  },
} as const;

const DEFAULT_SETTINGS: StudioSettings = {
  outline: { width: 18, color: "#ffffff" },
  shadow: {
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42,
    color: "#191823",
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    release: "snap",
  },
  sound: { enabled: true, volume: 0.68 },
  back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
  tilt: -3,
  wind: 0.25,
  quality: "high",
};

function makeTextSource(
  text: string,
  color: string,
  richText?: StickerRichTextDocument,
): StickerSource {
  return {
    type: "text",
    text: text.trim() || " ",
    fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
    fontWeight: 900,
    color,
    richText,
  };
}

function editorAlignment(value: string): "left" | "center" | "right" {
  if (value === "left" || value === "start") return "left";
  if (value === "right" || value === "end") return "right";
  return "center";
}

function editorLineHeight(element: HTMLElement): number {
  const stored = Number(element.dataset.lineHeight);
  if (Number.isFinite(stored) && stored > 0) return stored;
  const style = getComputedStyle(element);
  const lineHeight = Number.parseFloat(style.lineHeight);
  const fontSize = Number.parseFloat(style.fontSize);
  if (Number.isFinite(lineHeight) && Number.isFinite(fontSize) && fontSize > 0) {
    return Math.min(3, Math.max(0.7, lineHeight / fontSize));
  }
  return 1.2;
}

function editorBlockFontSize(element: HTMLElement): number {
  const children = element.querySelectorAll<HTMLElement>("*");
  let maxFontSize = children.length
    ? 0
    : Number.parseFloat(getComputedStyle(element).fontSize) || 28;
  children.forEach((child) => {
    const fontSize = Number.parseFloat(getComputedStyle(child).fontSize);
    if (Number.isFinite(fontSize)) maxFontSize = Math.max(maxFontSize, fontSize);
  });
  return maxFontSize || 28;
}

function setEditorBlockLineHeight(element: HTMLElement, lineHeight: number) {
  const nextLineHeight = Math.min(3, Math.max(0.7, lineHeight));
  element.dataset.lineHeight = String(nextLineHeight);
  element.style.lineHeight = `${editorBlockFontSize(element) * nextLineHeight}px`;
}

function normalizeEditorLineHeights(root: HTMLDivElement) {
  Array.from(root.children)
    .filter((node): node is HTMLElement => /^(DIV|P)$/.test(node.tagName))
    .forEach((block) => setEditorBlockLineHeight(block, editorLineHeight(block)));
}

function readRichTextEditor(
  root: HTMLDivElement,
  fallbackColor: string,
): { document: StickerRichTextDocument; text: string } {
  const blocks: StickerRichTextBlock[] = [];
  let current: StickerRichTextBlock = {
    align: editorAlignment(getComputedStyle(root).textAlign),
    lineHeight: editorLineHeight(root),
    runs: [],
  };

  const appendRun = (run: StickerRichTextRun) => {
    const previous = current.runs.at(-1);
    if (
      previous &&
      previous.color === run.color &&
      previous.fontSize === run.fontSize &&
      previous.fontWeight === run.fontWeight &&
      previous.underline === run.underline
    ) {
      previous.text += run.text;
    } else {
      current.runs.push(run);
    }
  };
  const flush = (force = false) => {
    if (current.runs.length || force) {
      if (!current.runs.length) current.runs.push({ text: "" });
      blocks.push(current);
    }
    current = {
      align: editorAlignment(getComputedStyle(root).textAlign),
      lineHeight: editorLineHeight(root),
      runs: [],
    };
  };
  const appendText = (text: string, parent: Element) => {
    const style = getComputedStyle(parent);
    const parts = text.replace(/\r/g, "").split("\n");
    parts.forEach((part, index) => {
      if (part) {
        const numericWeight = Number.parseInt(style.fontWeight, 10);
        appendRun({
          text: part,
          color: style.color || fallbackColor,
          fontSize: Number.parseFloat(style.fontSize) || 28,
          fontWeight:
            Number.isFinite(numericWeight) && numericWeight >= 600 ? 900 : 500,
          underline: style.textDecorationLine.includes("underline"),
        });
      }
      if (index < parts.length - 1) flush(true);
    });
  };
  const visit = (node: Node) => {
    if (node.nodeType === Node.TEXT_NODE) {
      appendText(node.textContent ?? "", node.parentElement ?? root);
      return;
    }
    if (!(node instanceof HTMLElement)) return;
    if (node.tagName === "BR") {
      flush(true);
      return;
    }
    const isBlock = /^(DIV|P)$/.test(node.tagName);
    if (isBlock && current.runs.length) flush();
    if (isBlock) {
      current.align = editorAlignment(getComputedStyle(node).textAlign);
      current.lineHeight = editorLineHeight(node);
    }
    node.childNodes.forEach(visit);
    if (isBlock) flush(true);
  };
  root.childNodes.forEach(visit);
  if (current.runs.length || !blocks.length) flush(true);
  while (
    blocks.length > 1 &&
    blocks.at(-1)?.runs.every((run) => !run.text)
  ) {
    blocks.pop();
  }
  return {
    document: { blocks },
    text: blocks
      .map((block) => block.runs.map((run) => run.text).join(""))
      .join("\n"),
  };
}

function writeRichTextEditor(
  root: HTMLDivElement,
  document: StickerRichTextDocument,
  fallbackColor: string,
) {
  const blocks = document.blocks.length
    ? document.blocks
    : [{ align: "center" as const, lineHeight: 1.2, runs: [{ text: "" }] }];
  const elements = blocks.map((block) => {
    const element = window.document.createElement("div");
    const lineHeight = block.lineHeight ?? 1.2;
    const maxFontSize = Math.max(
      1,
      ...block.runs.map((run) => run.fontSize ?? 28),
    );
    element.dataset.lineHeight = String(lineHeight);
    element.style.textAlign = block.align ?? "center";
    element.style.lineHeight = `${maxFontSize * lineHeight}px`;
    for (const run of block.runs) {
      const span = window.document.createElement("span");
      span.textContent = run.text;
      span.style.color = run.color ?? fallbackColor;
      span.style.fontSize = `${run.fontSize ?? 28}px`;
      span.style.fontWeight = String(run.fontWeight ?? 900);
      if (run.underline) span.style.textDecoration = "underline";
      element.appendChild(span);
    }
    return element;
  });
  root.replaceChildren(...elements);
}

function asStickerOptions(
  source: StickerSource,
  settings: StudioSettings,
): StickerOptions {
  return { source, ...settings };
}

function studioSettingsFrom(options: StickerOptions): StudioSettings {
  return {
    outline: { ...DEFAULT_SETTINGS.outline, ...options.outline },
    shadow: { ...DEFAULT_SETTINGS.shadow, ...options.shadow },
    peel: {
      ...DEFAULT_SETTINGS.peel,
      ...options.peel,
      release: "snap",
    },
    sound: { ...DEFAULT_SETTINGS.sound, ...options.sound },
    back: { ...DEFAULT_SETTINGS.back, ...options.back },
    tilt: options.tilt ?? DEFAULT_SETTINGS.tilt,
    wind: options.wind ?? DEFAULT_SETTINGS.wind,
    quality: "high",
  };
}

function stringifyForInlineScript(value: unknown, space?: number): string {
  return (JSON.stringify(value, null, space) ?? "null").replace(
    /</g,
    "\\u003c",
  );
}

function galleryLayoutFor(
  index: number,
  visualWidth: number,
  visualHeight: number,
): GalleryLayout {
  const angle = index * Math.PI * (3 - Math.sqrt(5));
  const radius = index === 0 ? 0 : 84 + Math.sqrt(index) * 92;
  return {
    x: Math.cos(angle) * radius,
    y: Math.sin(angle) * radius,
    width: Math.min(760, Math.max(190, visualWidth / 0.72)),
    height: Math.min(560, Math.max(140, visualHeight / 0.54)),
    rotation: ((index * 17) % 25) - 12,
    zIndex: index + 1,
  };
}

const LEGACY_DEFAULT_GALLERY_SEED_V1_KEY =
  "sticker-forge-gallery-indexeddb-defaults-v1";
const LEGACY_DEFAULT_GALLERY_SEED_V2_KEY =
  "sticker-forge-gallery-indexeddb-defaults-v2";
const LEGACY_DEFAULT_GALLERY_SEED_V3_KEY =
  "sticker-forge-gallery-indexeddb-defaults-v3";
const LEGACY_DEFAULT_GALLERY_SEED_V4_KEY =
  "sticker-forge-gallery-indexeddb-defaults-v4";
const DEFAULT_GALLERY_SEED_KEY = "sticker-forge-gallery-indexeddb-defaults-v5";
const DEFAULT_GALLERY_SEED_LOCK_KEY = `${DEFAULT_GALLERY_SEED_KEY}-lock`;

const DEFAULT_GALLERY_IMAGE_SOURCES: StickerSource[] = [
  { type: "image", src: "/default-gallery/vue.svg", name: "Vue" },
  { type: "image", src: "/default-gallery/react.svg", name: "React" },
  { type: "image", src: "/default-gallery/claude.svg", name: "Claude" },
  { type: "image", src: "/default-gallery/chatgpt.svg", name: "ChatGPT" },
  { type: "image", src: "/default-gallery/affine.svg", name: "AFFiNE" },
  { type: "image", src: "/default-gallery/vite.svg", name: "Vite" },
];

const EVOLUTION_GALLERY_IMAGE_SOURCES: StickerSource[] = [
  { type: "image", src: "/default-gallery/bridge-1.svg", name: "Bridge 1" },
  { type: "image", src: "/default-gallery/bridge-2.svg", name: "Bridge 2" },
  { type: "image", src: "/default-gallery/bridge-3.svg", name: "Bridge 3" },
  { type: "image", src: "/default-gallery/bridge-4.svg", name: "Bridge 4" },
  { type: "image", src: "/default-gallery/bridge-5.svg", name: "Bridge 5" },
];

const EVOLUTION_GALLERY_LAYOUTS: GalleryLayout[] = [
  { x: -642, y: 60, width: 404, height: 527, rotation: 0, zIndex: 1 },
  { x: -356, y: 46, width: 323, height: 556, rotation: 0, zIndex: 2 },
  { x: -97, y: 25, width: 355, height: 678, rotation: 0, zIndex: 3 },
  { x: 179, y: 11, width: 366, height: 770, rotation: 0, zIndex: 4 },
  { x: 487, y: 1, width: 330, height: 759, rotation: 0, zIndex: 5 },
];

function galleryTitleFor(source: StickerSource): string {
  if (source.type === "text") {
    return source.text.split(/\r?\n/, 1)[0]?.trim().slice(0, 120) || "Sticker";
  }
  if (source.type === "image") {
    return source.name?.trim().slice(0, 120) || "Image Sticker";
  }
  return "SVG Sticker";
}

async function createStoredGalleryItem(
  source: StickerSource,
  options: StudioSettings,
  layoutIndex: number,
): Promise<GalleryItem> {
  const preview = await createGalleryPreview(source, options.outline);
  const payload: CreateGalleryPayload = {
    source,
    options,
    previewDataUrl: preview.dataUrl,
    previewWidth: preview.previewWidth,
    previewHeight: preview.previewHeight,
    title: galleryTitleFor(source),
    layout: galleryLayoutFor(
      layoutIndex,
      preview.suggestedWidth,
      preview.suggestedHeight,
    ),
  };
  return createGalleryItem(payload);
}

async function createStoredGalleryItemWithPreview(
  source: StickerSource,
  options: StudioSettings,
  layoutIndex: number,
  folderId: string,
): Promise<{ item: GalleryItem; preview: GalleryPreviewResult }> {
  const preview = await createGalleryPreview(source, options.outline);
  const item = await createGalleryItem({
    folderId,
    source,
    options,
    previewDataUrl: preview.dataUrl,
    previewWidth: preview.previewWidth,
    previewHeight: preview.previewHeight,
    title: galleryTitleFor(source),
    layout: galleryLayoutFor(
      layoutIndex,
      preview.suggestedWidth,
      preview.suggestedHeight,
    ),
  });
  return { item, preview };
}

function editorStickerRect(
  host: HTMLElement,
  aspect: number,
): GalleryAddFlightRect {
  const hostRect = host.getBoundingClientRect();
  const maxWidth = Math.min(hostRect.width * 0.78, 760);
  const maxHeight = Math.min(hostRect.height * 0.58, 520);
  let width = maxWidth;
  let height = width / Math.max(0.05, aspect);
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }
  return {
    left: hostRect.left + (hostRect.width - width) / 2,
    top: hostRect.top + (hostRect.height - height) / 2,
    width,
    height,
  };
}

function folderReceiveTarget(
  folder: HTMLElement,
  aspect: number,
): { rect: GalleryAddFlightRect; rotation: number } {
  const folderRect = folder.getBoundingClientRect();
  const isWide = aspect > 1;
  const width = isWide ? 38 : Math.min(34, 38 * aspect);
  const height = isWide ? Math.max(8, width / aspect) : 38;
  const centerX = folderRect.left + folderRect.width / 2;
  const centerY = folderRect.top + 15;
  return {
    rect: {
      left: centerX - width / 2,
      top: centerY - height / 2,
      width,
      height,
    },
    rotation: isWide ? -90 : -11,
  };
}

function RangeRow({
  id,
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  const rangeStyle = { "--range-fill": `${fill}%` } as CSSProperties;

  return (
    <div className="range-row">
      <div className="range-meta">
        <label className="range-label" htmlFor={id}>
          {label}
        </label>
        <output className="range-value" htmlFor={id}>
          {display}
        </output>
      </div>
      <input
        className="range-control"
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={rangeStyle}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

function AlignmentIcon({ align }: { align: "left" | "center" | "right" }) {
  return <FontAwesomeIcon icon={align === "left" ? faAlignLeft : align === "right" ? faAlignRight : faAlignCenter} />;
}

function DropdownChevron() {
  return <FontAwesomeIcon className="number-preset-chevron" icon={faChevronDown} />;
}

function shadeFolderColor(hex: string, amount: number) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value.padEnd(6, "0").slice(0, 6);
  return `#${[0, 2, 4].map((offset) => {
    const channel = Number.parseInt(normalized.slice(offset, offset + 2), 16);
    const target = amount < 0 ? 0 : 255;
    return Math.round(channel + (target - channel) * Math.abs(amount))
      .toString(16)
      .padStart(2, "0");
  }).join("")}`;
}

function GalleryFolderIcon({ color }: { color: string }) {
  return (
    <svg
      className="gallery-add-folder-icon"
      viewBox="0 0 24 20"
      aria-hidden="true"
    >
      <path
        d="M2.25 5.25A2.25 2.25 0 0 1 4.5 3h4.1c.7 0 1.36.33 1.78.89l.84 1.11H19.5a2.25 2.25 0 0 1 2.25 2.25v8.5A2.25 2.25 0 0 1 19.5 18H4.5a2.25 2.25 0 0 1-2.25-2.25V5.25Z"
        fill={shadeFolderColor(color, -0.18)}
      />
      <path
        d="M2.25 8.1A2.1 2.1 0 0 1 4.35 6h4.73c.64 0 1.24.29 1.64.79l.58.71h8.35a2.1 2.1 0 0 1 2.1 2.1v6.3a2.1 2.1 0 0 1-2.1 2.1H4.35a2.1 2.1 0 0 1-2.1-2.1V8.1Z"
        fill={color}
      />
      <path
        d="M3.25 9.1A2.1 2.1 0 0 1 5.35 7h13.3a2.1 2.1 0 0 1 2.1 2.1v5.8a2.1 2.1 0 0 1-2.1 2.1H5.35a2.1 2.1 0 0 1-2.1-2.1V9.1Z"
        fill={shadeFolderColor(color, 0.12)}
        opacity=".72"
      />
    </svg>
  );
}

function BackgroundRemovalTip({
  anchor,
  label,
}: {
  anchor: RefObject<HTMLButtonElement | null>;
  label: string;
}) {
  const [position, setPosition] = useState<{
    left: number;
    top: number;
    side: "left" | "above";
  } | null>(null);

  useEffect(() => {
    const button = anchor.current;
    if (!button) return;
    const updatePosition = () => {
      const bounds = button.getBoundingClientRect();
      const side = bounds.left >= 180 ? "left" : "above";
      setPosition({
        left: side === "left" ? bounds.left - 12 : bounds.left + bounds.width / 2,
        top: side === "left" ? bounds.top + bounds.height / 2 : bounds.top - 10,
        side,
      });
    };
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(button);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [anchor]);

  if (!position) return null;
  return createPortal(
    <span
      className="background-removal-tip"
      id="background-removal-tip"
      role="tooltip"
      data-side={position.side}
      style={{ left: position.left, top: position.top }}
    >
      {label}
    </span>,
    document.body,
  );
}

export function StickerForgeStudio() {
  const initialSource = useMemo(
    () => makeTextSource(DEFAULT_TEXT, DEFAULT_INK, DEFAULT_RICH_TEXT),
    [],
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const studioShellRef = useRef<HTMLElement>(null);
  const controlsCardRef = useRef<HTMLElement>(null);
  const panelDragRef = useRef<{
    pointerId: number;
    startY: number;
    startOffset: number;
    collapseOffset: number;
    fadeStartOffset: number;
    maxPanelHeight: number;
    startedOpen: boolean;
  } | null>(null);
  const panelDragClickSuppressedUntilRef = useRef(0);
  const backgroundRemovalButtonRef = useRef<HTMLButtonElement>(null);
  const galleryFolderRef = useRef<HTMLButtonElement>(null);
  const galleryAddControlRef = useRef<HTMLDivElement>(null);
  const galleryAddMainRef = useRef<HTMLButtonElement>(null);
  const galleryAddMenuRef = useRef<HTMLDivElement>(null);
  const galleryAddRestLabelRef = useRef<HTMLSpanElement>(null);
  const galleryAddHoverLabelRef = useRef<HTMLSpanElement>(null);
  const richEditorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const selectionOffsetsRef = useRef<{ start: number; end: number } | null>(null);
  const applyingEditorStyleRef = useRef(false);
  const controllerRef = useRef<StickerController | null>(null);
  const textTimerRef = useRef<number | null>(null);
  const exportThemeRestoreTimerRef = useRef<number | null>(null);
  const sourceRevisionRef = useRef(0);
  const imageImportRevisionRef = useRef(0);
  const backgroundRemovalRevisionRef = useRef(0);
  const backgroundRemovalTipShownRef = useRef(false);
  const backgroundParticlesReadyRef = useRef<number | null>(null);
  const backgroundEntranceStartedRef = useRef<number | null>(null);
  const preparedBackgroundOutlineRef = useRef<{
    revision: number;
    source: PreparedStickerSource;
  } | null>(null);
  const laserPreviewTimerRef = useRef<number | null>(null);
  const sourceRef = useRef<StickerSource>(initialSource);
  const settingsRef = useRef<StudioSettings>(DEFAULT_SETTINGS);
  const [sourceMode, setSourceMode] = useState<SourceMode>("text");
  const [text, setText] = useState(DEFAULT_TEXT);
  const [inkColor, setInkColor] = useState(DEFAULT_INK);
  const [richText, setRichText] =
    useState<StickerRichTextDocument | null>(DEFAULT_RICH_TEXT);
  const [editorFontSize, setEditorFontSize] = useState("28");
  const [editorLineHeightValue, setEditorLineHeightValue] = useState("1.2");
  const [editorAlign, setEditorAlign] =
    useState<"left" | "center" | "right">("center");
  const [imageDataUrl, setImageDataUrl] = useState(DEFAULT_IMAGE_SRC);
  const [imageName, setImageName] = useState("");
  const [settings, setSettings] =
    useState<StudioSettings>(DEFAULT_SETTINGS);
  const [locale, setLocale] = useState<Locale>("zh");
  const [isLanguageOpen, setIsLanguageOpen] = useState(false);
  const [draggingFile, setDraggingFile] = useState(false);
  const [imageImportBusy, setImageImportBusy] = useState(false);
  const [showBackgroundRemovalTip, setShowBackgroundRemovalTip] =
    useState(false);
  const [sourceMessage, setSourceMessage] = useState("");
  const [backgroundRemoval, setBackgroundRemoval] = useState<{
    phase: BackgroundRemovalPhase;
    progress?: number;
  }>({ phase: "idle" });
  const [backgroundParticles, setBackgroundParticles] = useState<{
    source: string;
    result: BackgroundRemovalResult;
    nextSource: StickerSource;
    revision: number;
    playing: boolean;
  } | null>(null);
  const [exportOpen, setExportOpen] = useState(false);
  const [exportClosing, setExportClosing] = useState(false);
  const [exportSource, setExportSource] = useState<StickerSource>(initialSource);
  const [exportOptions, setExportOptions] =
    useState<StickerOptions>(DEFAULT_SETTINGS);
  const [isStandalonePwa, setIsStandalonePwa] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const [galleryItems, setGalleryItems] = useState<GalleryItem[]>([]);
  const [galleryFolders, setGalleryFolders] = useState<GalleryFolderRecord[]>([]);
  const [activeGalleryFolderId, setActiveGalleryFolderId] = useState(
    DEFAULT_GALLERY_FOLDER_ID,
  );
  const [galleryDropPreview, setGalleryDropPreview] =
    useState<GalleryFolderDropPreview | null>(null);
  const [galleryLoading, setGalleryLoading] = useState(true);
  const [galleryAdding, setGalleryAdding] = useState(false);
  const [galleryAddMenuOpen, setGalleryAddMenuOpen] = useState(false);
  const [galleryAddHovered, setGalleryAddHovered] = useState(false);
  const [galleryAddLabelWidth, setGalleryAddLabelWidth] = useState(0);
  const [galleryAddLabelOverflowing, setGalleryAddLabelOverflowing] =
    useState(false);
  const [galleryAddMenuPosition, setGalleryAddMenuPosition] = useState<{
    right: number;
    bottom: number;
    maxHeight: number;
  } | null>(null);
  const [addToGalleryFolderId, setAddToGalleryFolderId] = useState(
    DEFAULT_GALLERY_FOLDER_ID,
  );
  const [galleryFolderReceiving, setGalleryFolderReceiving] = useState(false);
  const [galleryAddFlight, setGalleryAddFlight] = useState<{
    itemId: string;
    previewDataUrl: string;
    start: GalleryAddFlightRect;
    target: GalleryAddFlightRect;
    coordinateOrigin: { left: number; top: number };
    startRotation: number;
    targetRotation: number;
  } | null>(null);
  const [galleryOpen, setGalleryOpen] = useState(false);
  const [galleryClosing, setGalleryClosing] = useState(false);
  const [galleryFlightStarted, setGalleryFlightStarted] = useState(false);
  const [galleryEntryComplete, setGalleryEntryComplete] = useState(false);
  const [gallerySurfaceHeld, setGallerySurfaceHeld] = useState(false);
  const [galleryEditing, setGalleryEditing] = useState(false);
  const [collapseGalleryPreviewsImmediately, setCollapseGalleryPreviewsImmediately] =
    useState(false);
  const [galleryEditorReady, setGalleryEditorReady] = useState(false);
  const [galleryQuickEdit, setGalleryQuickEdit] = useState<{
    item: GalleryItem;
    asset: GalleryAsset;
    start: GalleryEntryOrigin;
    target: GalleryEntryOrigin;
    targetRotation: number;
  } | null>(null);
  const [galleryEntryOrigins, setGalleryEntryOrigins] = useState<
    Record<string, GalleryEntryOrigin>
  >({});

  useEffect(() => {
    const query = window.matchMedia(PANEL_AUTO_COLLAPSE_QUERY);
    const collapseForNarrowViewport = () => {
      if (query.matches) setIsPanelOpen(false);
    };
    const frame = window.requestAnimationFrame(collapseForNarrowViewport);
    query.addEventListener("change", collapseForNarrowViewport);
    return () => {
      window.cancelAnimationFrame(frame);
      query.removeEventListener("change", collapseForNarrowViewport);
    };
  }, []);

  useEffect(() => {
    const query = window.matchMedia("(display-mode: standalone)");
    const updateStandaloneState = () => {
      const iosNavigator = window.navigator as Navigator & {
        standalone?: boolean;
      };
      setIsStandalonePwa(query.matches || iosNavigator.standalone === true);
    };
    updateStandaloneState();
    query.addEventListener("change", updateStandaloneState);
    return () => {
      query.removeEventListener("change", updateStandaloneState);
    };
  }, []);

  useEffect(() => {
    if (
      !exportOpen ||
      window.innerWidth > EXPORT_SHEET_MOBILE_BREAKPOINT
    ) {
      return;
    }
    if (exportThemeRestoreTimerRef.current !== null) {
      window.clearTimeout(exportThemeRestoreTimerRef.current);
      exportThemeRestoreTimerRef.current = null;
    }
    const root = document.documentElement;
    const body = document.body;
    let themeMeta = document.querySelector<HTMLMetaElement>(
      'meta[name="theme-color"]',
    );
    const createdThemeMeta = !themeMeta;
    if (!themeMeta) {
      themeMeta = document.createElement("meta");
      themeMeta.name = "theme-color";
      document.head.appendChild(themeMeta);
    }
    const previousThemeColor = themeMeta.getAttribute("content");
    root.classList.add("export-sheet-open");
    body.classList.add("export-sheet-open");
    themeMeta.setAttribute("content", "#000000");

    return () => {
      exportThemeRestoreTimerRef.current = window.setTimeout(() => {
        root.classList.remove("export-sheet-open");
        body.classList.remove("export-sheet-open");
        if (createdThemeMeta) {
          themeMeta?.remove();
        } else if (previousThemeColor === null) {
          themeMeta?.removeAttribute("content");
        } else {
          themeMeta?.setAttribute("content", previousThemeColor);
        }
        exportThemeRestoreTimerRef.current = null;
      }, 0);
    };
  }, [exportOpen]);

  const t = UI[locale];
  const backgroundRemovalBusy = !["idle", "error"].includes(
    backgroundRemoval.phase,
  );
  const backgroundRemovalLabel =
    backgroundRemoval.phase === "loading"
      ? `${t.loadingRemovalModel}${
          Number.isFinite(backgroundRemoval.progress)
            ? ` ${Math.round(backgroundRemoval.progress ?? 0)}%`
            : ""
        }`
      : backgroundRemoval.phase === "processing"
        ? t.removingBackground
        : backgroundRemoval.phase === "dissolving"
          ? t.dissolvingBackground
          : backgroundRemoval.phase === "finishing"
            ? t.restoringOutline
            : t.removeBackground;

  useEffect(() => {
    const stored = window.localStorage.getItem("sticker-forge-locale");
    if (stored === "zh" || stored === "en") {
      window.queueMicrotask(() => setLocale(stored));
    }
  }, []);

  useEffect(() => {
    document.documentElement.lang = locale === "zh" ? "zh-CN" : "en";
    window.localStorage.setItem("sticker-forge-locale", locale);
  }, [locale]);

  useEffect(() => {
    let cancelled = false;
    const loadGallery = async () => {
      try {
        const [loadedItems, nextFolders] = await Promise.all([
          listGalleryItems(),
          listGalleryFolders(),
        ]);
        if (!cancelled) {
          setGalleryFolders(nextFolders);
          setAddToGalleryFolderId((current) =>
            nextFolders.some((folder) => folder.id === current)
              ? current
              : DEFAULT_GALLERY_FOLDER_ID,
          );
        }
        let nextItems = loadedItems;
        const lockToken = String(Date.now());
        let shouldSeedDefaults = nextItems.length === 0;
        let defaultFolderSourcesToSeed: StickerSource[] = [
          initialSource,
          {
            type: "image",
            src: DEFAULT_IMAGE_SRC,
            name: "Default Image",
          },
          ...DEFAULT_GALLERY_IMAGE_SOURCES,
        ];
        let shouldSeedEvolutionGallery = true;
        let shouldRefreshEvolutionLayouts = false;
        let shouldRemoveDuplicateBridge = false;
        let ownsSeedLock = false;
        try {
          const alreadySeeded =
            window.localStorage.getItem(DEFAULT_GALLERY_SEED_KEY) === "done";
          const v2DefaultsWereSeeded =
            window.localStorage.getItem(LEGACY_DEFAULT_GALLERY_SEED_V2_KEY) ===
            "done";
          const v3DefaultsWereSeeded =
            window.localStorage.getItem(LEGACY_DEFAULT_GALLERY_SEED_V3_KEY) ===
            "done";
          const v4DefaultsWereSeeded =
            window.localStorage.getItem(LEGACY_DEFAULT_GALLERY_SEED_V4_KEY) ===
            "done";
          const v1DefaultsWereSeeded =
            window.localStorage.getItem(LEGACY_DEFAULT_GALLERY_SEED_V1_KEY) ===
            "done";
          const lockStartedAt = Number(
            window.localStorage.getItem(DEFAULT_GALLERY_SEED_LOCK_KEY),
          );
          const lockIsFresh =
            Number.isFinite(lockStartedAt) && Date.now() - lockStartedAt < 120_000;
          shouldSeedDefaults = !alreadySeeded && !lockIsFresh;
          if (shouldSeedDefaults) {
            if (v4DefaultsWereSeeded) {
              defaultFolderSourcesToSeed = [];
              shouldSeedEvolutionGallery = false;
              shouldRemoveDuplicateBridge = true;
            } else if (v3DefaultsWereSeeded) {
              defaultFolderSourcesToSeed = [];
              shouldSeedEvolutionGallery = false;
              shouldRefreshEvolutionLayouts = true;
              shouldRemoveDuplicateBridge = true;
            } else if (v2DefaultsWereSeeded) {
              defaultFolderSourcesToSeed = [];
              shouldRemoveDuplicateBridge = true;
            } else if (v1DefaultsWereSeeded) {
              defaultFolderSourcesToSeed = DEFAULT_GALLERY_IMAGE_SOURCES;
            }
            window.localStorage.setItem(DEFAULT_GALLERY_SEED_LOCK_KEY, lockToken);
            ownsSeedLock = true;
          } else {
            shouldSeedEvolutionGallery = false;
          }
        } catch {
          // If browser storage is unavailable, seed only a genuinely empty gallery.
          shouldSeedEvolutionGallery = shouldSeedDefaults;
        }

        if (shouldSeedDefaults) {
          const created: GalleryItem[] = [];
          const firstLayoutIndex = nextItems.reduce(
            (largest, item) => Math.max(largest, item.layout.zIndex),
            0,
          );
          try {
            if (shouldRemoveDuplicateBridge) {
              const duplicateBridge = nextItems.find(
                (item) =>
                  item.folderId === DEFAULT_GALLERY_FOLDER_ID &&
                  item.title === "Bridge",
              );
              if (duplicateBridge) {
                await deleteGalleryItem(duplicateBridge.id);
                nextItems = nextItems.filter(
                  (item) => item.id !== duplicateBridge.id,
                );
              }
            }
            for (const [offset, source] of defaultFolderSourcesToSeed.entries()) {
              try {
                created.push(
                  await createStoredGalleryItem(
                    source,
                    DEFAULT_SETTINGS,
                    firstLayoutIndex + offset,
                  ),
                );
              } catch (error) {
                console.error(`Could not seed ${galleryTitleFor(source)}.`, error);
                throw error;
              }
            }
            if (shouldRefreshEvolutionLayouts) {
              for (const [index, source] of
                EVOLUTION_GALLERY_IMAGE_SOURCES.entries()) {
                const title = galleryTitleFor(source);
                const existing = nextItems.find(
                  (item) =>
                    item.folderId === EVOLUTION_GALLERY_FOLDER_ID &&
                    item.title === title,
                );
                if (!existing) continue;
                const updated = await updateGalleryLayout(
                  existing.id,
                  EVOLUTION_GALLERY_LAYOUTS[index],
                );
                nextItems = nextItems.map((item) =>
                  item.id === updated.id ? updated : item,
                );
              }
            }
            if (shouldSeedEvolutionGallery) {
              const evolutionPreviews = await Promise.all(
                EVOLUTION_GALLERY_IMAGE_SOURCES.map((source) =>
                  createGalleryPreview(source, DEFAULT_SETTINGS.outline),
                ),
              );
              for (const [index, source] of
                EVOLUTION_GALLERY_IMAGE_SOURCES.entries()) {
                const preview = evolutionPreviews[index];
                created.push(
                  await createGalleryItem({
                    folderId: EVOLUTION_GALLERY_FOLDER_ID,
                    source,
                    options: DEFAULT_SETTINGS,
                    previewDataUrl: preview.dataUrl,
                    previewWidth: preview.previewWidth,
                    previewHeight: preview.previewHeight,
                    title: galleryTitleFor(source),
                    layout: EVOLUTION_GALLERY_LAYOUTS[index],
                  }),
                );
              }
            }
            nextItems = [...created].reverse().concat(nextItems);
            try {
              window.localStorage.setItem(DEFAULT_GALLERY_SEED_KEY, "done");
            } catch {
              // IndexedDB remains the source of truth if preference storage fails.
            }
          } catch (error) {
            await Promise.allSettled(
              created.map((item) => deleteGalleryItem(item.id)),
            );
            throw error;
          } finally {
            if (ownsSeedLock) {
              try {
                if (
                  window.localStorage.getItem(DEFAULT_GALLERY_SEED_LOCK_KEY) ===
                  lockToken
                ) {
                  window.localStorage.removeItem(DEFAULT_GALLERY_SEED_LOCK_KEY);
                }
              } catch {
                // The lock expires naturally if browser storage becomes unavailable.
              }
            }
          }
        }

        if (!cancelled) {
          setGalleryItems(nextItems);
          setGalleryFolders(nextFolders);
          let storedFolderId: string | null = null;
          try {
            storedFolderId = window.localStorage.getItem(
              ADD_TO_GALLERY_FOLDER_STORAGE_KEY,
            );
          } catch {
            // Keep the default folder when preference storage is unavailable.
          }
          setAddToGalleryFolderId(
            nextFolders.some((folder) => folder.id === storedFolderId)
              ? storedFolderId!
              : DEFAULT_GALLERY_FOLDER_ID,
          );
        }
      } catch (error) {
        console.error("Could not initialize the local gallery.", error);
        if (!cancelled) {
          setSourceMessage((message) =>
            message || UI.zh.galleryLoadFailed,
          );
        }
      } finally {
        if (!cancelled) setGalleryLoading(false);
      }
    };
    void loadGallery();
    return () => {
      cancelled = true;
    };
  }, [initialSource]);

  const addToGalleryFolder =
    galleryFolders.find((folder) => folder.id === addToGalleryFolderId)
    ?? galleryFolders.find((folder) => folder.id === DEFAULT_GALLERY_FOLDER_ID)
    ?? null;
  const addToGalleryRestLabel = galleryAdding
    ? t.addingToGallery
    : t.addToGallery;
  const addToGalleryHoverLabel = galleryAdding
    ? t.addingToGallery
    : locale === "zh"
      ? `添加到 ${addToGalleryFolder?.title ?? "Gallery"}`
      : `Add to ${addToGalleryFolder?.title ?? "Gallery"}`;

  useLayoutEffect(() => {
    const label = galleryAddHovered
      ? galleryAddHoverLabelRef.current
      : galleryAddRestLabelRef.current;
    const button = galleryAddMainRef.current;
    if (!label || !button) return;
    const updateLabelMetrics = () => {
      const measuredWidth =
        Math.ceil(label.getBoundingClientRect().width) + 1;
      const buttonStyle = window.getComputedStyle(button);
      const availableWidth =
        button.clientWidth
        - Number.parseFloat(buttonStyle.paddingLeft)
        - Number.parseFloat(buttonStyle.paddingRight)
        - 27;
      setGalleryAddLabelWidth(measuredWidth);
      setGalleryAddLabelOverflowing(measuredWidth > availableWidth);
    };
    updateLabelMetrics();
    const observer = new ResizeObserver(updateLabelMetrics);
    observer.observe(button);
    return () => observer.disconnect();
  }, [
    addToGalleryHoverLabel,
    addToGalleryRestLabel,
    galleryAddHovered,
  ]);

  useEffect(() => {
    if (!galleryAddMenuOpen) return;
    const closeMenu = (event: PointerEvent) => {
      if (
        event.target instanceof Node
        && !galleryAddControlRef.current?.contains(event.target)
        && !galleryAddMenuRef.current?.contains(event.target)
      ) {
        setGalleryAddMenuOpen(false);
        setGalleryAddMenuPosition(null);
      }
    };
    const closeOnEscape = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setGalleryAddMenuOpen(false);
        setGalleryAddMenuPosition(null);
      }
    };
    document.addEventListener("pointerdown", closeMenu);
    document.addEventListener("keydown", closeOnEscape);
    return () => {
      document.removeEventListener("pointerdown", closeMenu);
      document.removeEventListener("keydown", closeOnEscape);
    };
  }, [galleryAddMenuOpen]);

  useLayoutEffect(() => {
    if (!galleryAddMenuOpen) return;
    const anchor = galleryAddControlRef.current;
    if (!anchor) return;
    const updatePosition = () => {
      const rect = anchor.getBoundingClientRect();
      setGalleryAddMenuPosition({
        right: Math.max(8, window.innerWidth - rect.right),
        bottom: Math.max(8, window.innerHeight - rect.top + 8),
        maxHeight: Math.max(96, Math.min(286, rect.top - 16)),
      });
    };
    updatePosition();
    const observer = new ResizeObserver(updatePosition);
    observer.observe(anchor);
    window.addEventListener("resize", updatePosition);
    window.addEventListener("scroll", updatePosition, true);
    return () => {
      observer.disconnect();
      window.removeEventListener("resize", updatePosition);
      window.removeEventListener("scroll", updatePosition, true);
    };
  }, [galleryAddMenuOpen]);

  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    let disposed = false;
    let controller: StickerController | null = null;

    const handleError = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      const message = detail?.message || "渲染器已切换为兼容模式";
      setSourceMessage(message);
    };

    const initialize = async () => {
      try {
        const { createSticker } = await import("@/lib/sticker-forge");
        const sourceAtStart = sourceRef.current;
        const settingsAtStart = settingsRef.current;
        const instance = await createSticker(
          host,
          asStickerOptions(sourceAtStart, settingsAtStart),
        );
        if (disposed) {
          instance.destroy();
          return;
        }
        controller = instance;
        controllerRef.current = instance;
        host.addEventListener("error", handleError);
        if (settingsRef.current !== settingsAtStart) {
          instance.setOptions(settingsRef.current);
        }
        if (sourceRef.current !== sourceAtStart) {
          try {
            await instance.setSource(sourceRef.current);
          } catch {
            // The renderer keeps the previous valid artwork and reports the source error.
          }
        }
        if (!disposed) {
          setSourceMessage((message) =>
            message.replace(/ · (等待材质就绪|Preparing material)$/, ""),
          );
        }
      } catch {
        setSourceMessage("当前浏览器无法启动实时材质");
      }
    };
    void initialize();

    return () => {
      disposed = true;
      if (controller) {
        host.removeEventListener("error", handleError);
      }
      if (textTimerRef.current) window.clearTimeout(textTimerRef.current);
      sourceRevisionRef.current += 1;
      controller?.destroy();
      controllerRef.current = null;
    };
  }, [initialSource]);

  const updateOptions = useCallback((partial: StickerOptions) => {
    controllerRef.current?.setOptions(partial);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof StudioSettings>(key: K, value: StudioSettings[K]) => {
      const next = { ...settingsRef.current, [key]: value } as StudioSettings;
      settingsRef.current = next;
      setSettings(next);
      updateOptions({ [key]: value } as StickerOptions);
    },
    [updateOptions],
  );

  const clearPendingText = useCallback(() => {
    if (textTimerRef.current !== null) {
      window.clearTimeout(textTimerRef.current);
      textTimerRef.current = null;
    }
  }, []);

  const applySource = useCallback(
    async (source: StickerSource, successMessage?: string) => {
      clearPendingText();
      const revision = ++sourceRevisionRef.current;
      sourceRef.current = source;
      const instance = controllerRef.current;
      if (!instance) {
        if (successMessage) setSourceMessage(`${successMessage} · ${t.waitingMaterial}`);
        return;
      }
      try {
        await instance.setSource(source);
        if (revision === sourceRevisionRef.current && successMessage) {
          setSourceMessage(successMessage);
        }
      } catch {
        if (revision === sourceRevisionRef.current) {
          setSourceMessage(t.assetFailed);
        }
      }
    },
    [clearPendingText, t],
  );

  const applyGalleryAssetToEditor = useCallback(
    async (asset: GalleryAsset) => {
      const nextSettings = studioSettingsFrom(asset.options);
      settingsRef.current = nextSettings;
      setSettings(nextSettings);
      controllerRef.current?.setOptions(nextSettings);

      const source = asset.source;
      selectionRef.current = null;
      selectionOffsetsRef.current = null;
      if (source.type === "text") {
        const nextColor =
          source.color ??
          source.richText?.blocks[0]?.runs[0]?.color ??
          DEFAULT_INK;
        const nextDocument =
          source.richText ??
          ({
            blocks: source.text.split(/\r?\n/).map((line) => ({
              align: "center" as const,
              lineHeight: 1.2,
              runs: [{
                text: line,
                color: nextColor,
                fontSize: 28,
                fontWeight: source.fontWeight ?? 900,
              }],
            })),
          } satisfies StickerRichTextDocument);
        const firstBlock = nextDocument.blocks[0];
        const firstRun = firstBlock?.runs[0];
        setSourceMode("text");
        setText(source.text);
        setInkColor(nextColor);
        setRichText(nextDocument);
        setEditorFontSize(String(firstRun?.fontSize ?? 28));
        setEditorLineHeightValue(String(firstBlock?.lineHeight ?? 1.2));
        setEditorAlign(firstBlock?.align ?? "center");
        if (richEditorRef.current) {
          writeRichTextEditor(richEditorRef.current, nextDocument, nextColor);
        }
      } else if (source.type === "image") {
        setSourceMode("image");
        setImageDataUrl(source.src);
        setImageName(source.name ?? "");
      } else {
        setSourceMode("image");
        setImageDataUrl(
          `data:image/svg+xml;charset=utf-8,${encodeURIComponent(source.svg)}`,
        );
        setImageName("SVG Sticker");
      }

      await applySource(source);
      // setSource resolves after the new texture and geometry are installed,
      // while the actual WebGL draw is queued for the next animation frame.
      // Wait for that draw before exposing the editor below the gallery copy.
      await new Promise<void>((resolve) => {
        window.requestAnimationFrame(() => resolve());
      });
      // Reveal the prepared editor renderer beneath the final gallery frame.
      // GalleryCanvas owns the short Spring cross-fade and unmounts afterward.
      setGalleryEditorReady(true);
    },
    [applySource],
  );

  const updateTextSource = useCallback(
    (
      nextText: string,
      nextColor: string,
      nextRichText?: StickerRichTextDocument,
    ) => {
      clearPendingText();
      const source = makeTextSource(nextText, nextColor, nextRichText);
      const revision = ++sourceRevisionRef.current;
      sourceRef.current = source;
      textTimerRef.current = window.setTimeout(() => {
        textTimerRef.current = null;
        const instance = controllerRef.current;
        if (!instance || revision !== sourceRevisionRef.current) return;
        void instance.setSource(source).catch(() => {
          if (revision === sourceRevisionRef.current) {
            setSourceMessage(t.textFailed);
          }
        });
      }, 90);
    },
    [clearPendingText, t],
  );

  const rememberEditorSelection = () => {
    const editor = richEditorRef.current;
    const selection = window.getSelection();
    if (
      !editor ||
      !selection?.rangeCount ||
      !editor.contains(selection.anchorNode)
    ) {
      return;
    }
    const selectedRange = selection.getRangeAt(0).cloneRange();
    selectionRef.current = selectedRange;
    try {
      const beforeStart = document.createRange();
      beforeStart.selectNodeContents(editor);
      beforeStart.setEnd(selectedRange.startContainer, selectedRange.startOffset);
      const beforeEnd = document.createRange();
      beforeEnd.selectNodeContents(editor);
      beforeEnd.setEnd(selectedRange.endContainer, selectedRange.endOffset);
      selectionOffsetsRef.current = {
        start: beforeStart.toString().length,
        end: beforeEnd.toString().length,
      };
    } catch {
      selectionOffsetsRef.current = null;
    }
    const anchorElement =
      selection.anchorNode instanceof Element
        ? selection.anchorNode
        : selection.anchorNode?.parentElement;
    if (anchorElement instanceof HTMLElement && !applyingEditorStyleRef.current) {
      const anchorStyle = getComputedStyle(anchorElement);
      const anchorBlock = anchorElement.closest<HTMLElement>("div, p");
      setEditorAlign(editorAlignment(anchorStyle.textAlign));
      const anchorFontSize = Number.parseFloat(anchorStyle.fontSize);
      if (Number.isFinite(anchorFontSize)) {
        setEditorFontSize(String(Math.round(anchorFontSize)));
      }
      setEditorLineHeightValue(
        editorLineHeight(anchorBlock && editor?.contains(anchorBlock) ? anchorBlock : anchorElement).toFixed(1),
      );
    }
  };

  useEffect(() => {
    const rememberSelection = () => {
      const editor = richEditorRef.current;
      const selection = window.getSelection();
      if (
        editor &&
        selection?.rangeCount &&
        editor.contains(selection.anchorNode)
      ) {
        selectionRef.current = selection.getRangeAt(0).cloneRange();
      }
    };

    document.addEventListener("selectionchange", rememberSelection);
    return () => document.removeEventListener("selectionchange", rememberSelection);
  }, []);

  const restoreEditorSelection = (savedRange = selectionRef.current) => {
    const selection = window.getSelection();
    if (!selection || !savedRange) return;
    selection.removeAllRanges();
    selection.addRange(savedRange);
  };

  const syncRichEditor = () => {
    const editor = richEditorRef.current;
    if (!editor) return;
    normalizeEditorLineHeights(editor);
    const next = readRichTextEditor(editor, inkColor);
    setText(next.text);
    setRichText(next.document);
    setSourceMode("text");
    updateTextSource(next.text, inkColor, next.document);
    rememberEditorSelection();
  };

  const runEditorCommand = (command: string, value?: string) => {
    const editor = richEditorRef.current;
    if (!editor) return;
    editor.focus({ preventScroll: true });
    restoreEditorSelection();
    document.execCommand("styleWithCSS", false, "true");
    document.execCommand(command, false, value);
    syncRichEditor();
  };

  const changeEditorFontSize = (fontSize: number) => {
    const editor = richEditorRef.current;
    if (!editor) return;
    const nextSize = Math.min(240, Math.max(8, fontSize));
    const savedRange = selectionRef.current?.cloneRange() ?? null;
    const savedOffsets = selectionOffsetsRef.current;
    applyingEditorStyleRef.current = true;
    try {
      editor.focus({ preventScroll: true });
      restoreEditorSelection(savedRange);
      if (savedOffsets && savedOffsets.end > savedOffsets.start) {
        const walker = document.createTreeWalker(editor, NodeFilter.SHOW_TEXT);
        const selectedNodes: Array<{
          node: Text;
          start: number;
          end: number;
        }> = [];
        let textOffset = 0;
        for (let node = walker.nextNode(); node; node = walker.nextNode()) {
          const textNode = node as Text;
          const nodeStart = textOffset;
          const nodeEnd = nodeStart + textNode.data.length;
          const start = Math.max(0, savedOffsets.start - nodeStart);
          const end = Math.min(textNode.data.length, savedOffsets.end - nodeStart);
          if (
            start < end &&
            savedOffsets.start < nodeEnd &&
            savedOffsets.end > nodeStart
          ) {
            selectedNodes.push({ node: textNode, start, end });
          }
          textOffset = nodeEnd;
        }
        const wrapped: HTMLSpanElement[] = [];
        selectedNodes.reverse().forEach(({ node, start, end }) => {
          if (end < node.data.length) node.splitText(end);
          const selectedNode = start > 0 ? node.splitText(start) : node;
          const span = document.createElement("span");
          span.style.fontSize = `${nextSize}px`;
          selectedNode.parentNode?.insertBefore(span, selectedNode);
          span.appendChild(selectedNode);
          wrapped.push(span);
        });
        wrapped.reverse();
        if (wrapped.length) {
          const nextRange = document.createRange();
          nextRange.setStartBefore(wrapped[0]);
          nextRange.setEndAfter(wrapped[wrapped.length - 1]);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(nextRange);
          selectionRef.current = nextRange.cloneRange();
        }
      } else {
        document.execCommand("styleWithCSS", false, "true");
        document.execCommand("fontSize", false, "7");
      }
      syncRichEditor();
    } finally {
      window.setTimeout(() => {
        applyingEditorStyleRef.current = false;
        setEditorFontSize(String(nextSize));
      }, 0);
    }
  };

  const changeEditorLineHeight = (lineHeight: number) => {
    const editor = richEditorRef.current;
    if (!editor) return;
    const nextLineHeight = Math.min(3, Math.max(0.7, lineHeight));
    applyingEditorStyleRef.current = true;
    try {
      editor.focus({ preventScroll: true });
      restoreEditorSelection();
      const range = selectionRef.current;
      const blockElements = Array.from(editor.children).filter(
        (node): node is HTMLElement => /^(DIV|P)$/.test(node.tagName),
      );
      const selectedBlocks = range
        ? blockElements.filter((block) => {
            try {
              return range.intersectsNode(block);
            } catch {
              return false;
            }
          })
        : [];
      const targets = selectedBlocks.length
        ? selectedBlocks
        : blockElements.length
          ? blockElements
          : [editor];
      targets.forEach((target) => {
        setEditorBlockLineHeight(target, nextLineHeight);
      });
      syncRichEditor();
    } finally {
      window.setTimeout(() => {
        applyingEditorStyleRef.current = false;
        setEditorLineHeightValue(nextLineHeight.toFixed(1));
      }, 0);
    }
  };

  const handleRichInput = () => {
    syncRichEditor();
  };

  const handleEditorColor = (nextColor: string) => {
    setInkColor(nextColor);
    runEditorCommand("foreColor", nextColor);
  };

  const changeEditorAlignment = (
    command: "justifyLeft" | "justifyCenter" | "justifyRight",
    align: "left" | "center" | "right",
  ) => {
    setEditorAlign(align);
    runEditorCommand(command);
  };

  const loadImageFile = useCallback(
    async (file?: File) => {
      if (!file) return;
      const looksLikeImage =
        file.type.startsWith("image/") ||
        /\.(avif|bmp|gif|heic|heif|ico|jpe?g|png|svg|webp)$/i.test(file.name);
      if (!looksLikeImage) {
        setSourceMessage(t.chooseImage);
        return;
      }
      if (file.size > 15_000_000) {
        setSourceMessage(t.imageTooLarge);
        return;
      }

      backgroundRemovalRevisionRef.current += 1;
      preparedBackgroundOutlineRef.current?.source.dispose();
      preparedBackgroundOutlineRef.current = null;
      setBackgroundRemoval({ phase: "idle" });
      setBackgroundParticles(null);
      controllerRef.current?.setBackgroundRemovalEffect(false);
      controllerRef.current?.setOptions({ outline: settingsRef.current.outline });
      clearPendingText();
      const readRevision = ++sourceRevisionRef.current;
      const importRevision = ++imageImportRevisionRef.current;
      const heic = isHeicFile(file);
      setImageImportBusy(true);
      setSourceMessage(
        `${file.name} · ${heic ? t.decodingHeic : t.reading}`,
      );
      try {
        const isSvg =
          file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
        const readableBlob = heic ? await convertHeicToJpeg(file) : file;
        const dataUrl = isSvg
          ? `data:image/svg+xml;charset=utf-8,${encodeURIComponent(
              sanitizeSvgMarkup(await file.text()),
            )}`
          : await new Promise<string>((resolve, reject) => {
              const reader = new FileReader();
              reader.onerror = () =>
                reject(reader.error ?? new Error("Read failed"));
              reader.onload = () =>
                typeof reader.result === "string"
                  ? resolve(reader.result)
                  : reject(new Error("Read failed"));
              reader.readAsDataURL(readableBlob);
            });
        if (readRevision !== sourceRevisionRef.current) return;
        const backgroundRemovalTipSeen =
          backgroundRemovalTipShownRef.current
          || window.localStorage.getItem(
            BACKGROUND_REMOVAL_TIP_SEEN_KEY,
          ) === "true";
        if (!backgroundRemovalTipSeen) {
          const hasTransparency =
            isSvg || await imageSourceHasTransparency(dataUrl);
          if (readRevision !== sourceRevisionRef.current) return;
          if (!hasTransparency) {
            backgroundRemovalTipShownRef.current = true;
            window.localStorage.setItem(
              BACKGROUND_REMOVAL_TIP_SEEN_KEY,
              "true",
            );
            setShowBackgroundRemovalTip(true);
          }
        }
        setImageDataUrl(dataUrl);
        setImageName(file.name);
        setSourceMode("image");
        await applySource(
          { type: "image", src: dataUrl, name: file.name },
          `${file.name} · ${t.processed}`,
        );
      } catch (error) {
        console.error(
          "Could not load image file.",
          error instanceof Error
            ? `${error.name}: ${error.message}`
            : JSON.stringify(error),
        );
        if (readRevision === sourceRevisionRef.current) {
          setSourceMessage(t.invalidImage);
        }
      } finally {
        if (importRevision === imageImportRevisionRef.current) {
          setImageImportBusy(false);
        }
      }
    },
    [applySource, clearPendingText, t],
  );

  const handleBackgroundParticlesStart = useCallback(
    (revision: number) => {
      if (backgroundEntranceStartedRef.current === revision) return;
      backgroundEntranceStartedRef.current = revision;
      window.setTimeout(() => {
        if (revision !== backgroundRemovalRevisionRef.current) return;
        const prepared = preparedBackgroundOutlineRef.current;
        if (!prepared || prepared.revision !== revision) return;
        prepared.source.commitWithEntrance();
        preparedBackgroundOutlineRef.current = null;
        setBackgroundRemoval({ phase: "finishing" });
      }, getParticleEffectSettings().entranceDelay);
    },
    [],
  );

  const handleBackgroundParticlesReady = useCallback(
    async (
      revision: number,
      nextSource: StickerSource,
      resultDataUrl: string,
    ) => {
      if (
        revision !== backgroundRemovalRevisionRef.current
        || backgroundParticlesReadyRef.current === revision
      ) {
        return;
      }
      backgroundParticlesReadyRef.current = revision;
      const controller = controllerRef.current;
      if (!controller) return;

      try {
        // First install a cutout without an outline. The particle canvas is
        // already paused on a complete first frame, so this is visually
        // identical to the original image but ready to animate.
        clearPendingText();
        const sourceRevision = ++sourceRevisionRef.current;
        sourceRef.current = nextSource;
        await controller.setSource(nextSource);
        if (sourceRevision !== sourceRevisionRef.current) return;
        if (revision !== backgroundRemovalRevisionRef.current) return;

        // Build and upload the outlined variant now, but do not expose it yet.
        // The prepared texture is committed atomically in the exact callback
        // that starts the sticker entrance animation.
        const preparedOutline = await controller.prepareSource(nextSource, {
          outline: settingsRef.current.outline,
        });
        if (revision !== backgroundRemovalRevisionRef.current) {
          preparedOutline.dispose();
          return;
        }
        preparedBackgroundOutlineRef.current?.source.dispose();
        preparedBackgroundOutlineRef.current = {
          revision,
          source: preparedOutline,
        };

        // Let the texture upload and first WebGL render settle before the CPU
        // particle loop starts, so the entrance animation cannot collide with
        // source preparation on the main thread.
        await new Promise<void>((resolve) => {
          requestAnimationFrame(() => requestAnimationFrame(() => resolve()));
        });
        if (revision !== backgroundRemovalRevisionRef.current) return;

        setImageDataUrl(resultDataUrl);
        setBackgroundRemoval({ phase: "dissolving" });
        setBackgroundParticles((current) =>
          current?.revision === revision
            ? { ...current, playing: true }
            : current,
        );
      } catch {
        if (revision !== backgroundRemovalRevisionRef.current) return;
        setBackgroundParticles(null);
        preparedBackgroundOutlineRef.current?.source.dispose();
        preparedBackgroundOutlineRef.current = null;
        controller.setOptions({ outline: settingsRef.current.outline });
        setBackgroundRemoval({ phase: "error" });
        setSourceMessage(t.backgroundRemovalFailed);
      }
    },
    [clearPendingText, t.backgroundRemovalFailed],
  );

  const handleBackgroundParticlesComplete = useCallback(() => {
    preparedBackgroundOutlineRef.current?.source.dispose();
    preparedBackgroundOutlineRef.current = null;
    setBackgroundParticles(null);
    setBackgroundRemoval({ phase: "idle" });
    setSourceMessage(t.backgroundRemoved);
  }, [t.backgroundRemoved]);

  const removeCurrentImageBackground = useCallback(async () => {
    if (
      !imageDataUrl ||
      imageImportBusy ||
      !["idle", "error"].includes(backgroundRemoval.phase)
    ) {
      return;
    }

    const revision = ++backgroundRemovalRevisionRef.current;
    preparedBackgroundOutlineRef.current?.source.dispose();
    preparedBackgroundOutlineRef.current = null;
    const originalSource = imageDataUrl;
    const outline = settingsRef.current.outline;
    setSourceMessage("");
    setBackgroundParticles(null);
    setBackgroundRemoval({ phase: "loading", progress: 0 });
    controllerRef.current?.setOptions({
      outline: { ...outline, width: 0 },
    });
    controllerRef.current?.setBackgroundRemovalEffect(true);

    try {
      const result = await removeImageBackground(originalSource, (progress) => {
        if (revision !== backgroundRemovalRevisionRef.current) return;
        setBackgroundRemoval({
          phase: progress.phase,
          progress: progress.progress,
        });
      });
      if (revision !== backgroundRemovalRevisionRef.current) return;

      controllerRef.current?.setBackgroundRemovalEffect(false);
      setBackgroundRemoval({ phase: "dissolving" });
      const nextSource: StickerSource = {
        type: "image",
        src: result.dataUrl,
        name: imageName,
      };
      setBackgroundParticles({
        source: originalSource,
        result,
        nextSource,
        revision,
        playing: false,
      });
    } catch (error) {
      if (revision !== backgroundRemovalRevisionRef.current) return;
      console.error("Could not remove the image background.", error);
      controllerRef.current?.setBackgroundRemovalEffect(false);
      controllerRef.current?.setOptions({ outline });
      setBackgroundRemoval({ phase: "error" });
      setSourceMessage(t.backgroundRemovalFailed);
    }
  }, [
    backgroundRemoval.phase,
    imageImportBusy,
    imageDataUrl,
    imageName,
    t.backgroundRemovalFailed,
  ]);

  useEffect(() => {
    const previewLaser = () => {
      if (
        sourceMode !== "image"
        || !imageDataUrl
        || !["idle", "error"].includes(backgroundRemoval.phase)
      ) {
        return;
      }
      if (laserPreviewTimerRef.current !== null) {
        window.clearTimeout(laserPreviewTimerRef.current);
      }
      controllerRef.current?.setBackgroundRemovalEffect(true);
      laserPreviewTimerRef.current = window.setTimeout(() => {
        controllerRef.current?.setBackgroundRemovalEffect(false);
        laserPreviewTimerRef.current = null;
      }, getLaserEffectSettings().sweepDuration + 80);
    };

    window.addEventListener(LASER_PREVIEW_EVENT, previewLaser);
    return () => {
      window.removeEventListener(LASER_PREVIEW_EVENT, previewLaser);
      if (laserPreviewTimerRef.current !== null) {
        window.clearTimeout(laserPreviewTimerRef.current);
        laserPreviewTimerRef.current = null;
      }
    };
  }, [backgroundRemoval.phase, imageDataUrl, sourceMode]);

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDraggingFile(false);
    void loadImageFile(event.dataTransfer.files[0]);
  };

  const switchSourceMode = (mode: SourceMode) => {
    backgroundRemovalRevisionRef.current += 1;
    imageImportRevisionRef.current += 1;
    setImageImportBusy(false);
    preparedBackgroundOutlineRef.current?.source.dispose();
    preparedBackgroundOutlineRef.current = null;
    setBackgroundRemoval({ phase: "idle" });
    setBackgroundParticles(null);
    controllerRef.current?.setBackgroundRemovalEffect(false);
    controllerRef.current?.setOptions({ outline: settingsRef.current.outline });
    setSourceMode(mode);
    if (mode === "text") {
      void applySource(makeTextSource(text, inkColor, richText ?? undefined));
    } else if (imageDataUrl) {
      void applySource({ type: "image", src: imageDataUrl, name: imageName });
    }
  };

  const resetStudio = () => {
    backgroundRemovalRevisionRef.current += 1;
    imageImportRevisionRef.current += 1;
    setImageImportBusy(false);
    preparedBackgroundOutlineRef.current?.source.dispose();
    preparedBackgroundOutlineRef.current = null;
    setBackgroundRemoval({ phase: "idle" });
    setBackgroundParticles(null);
    controllerRef.current?.setBackgroundRemovalEffect(false);
    setText(DEFAULT_TEXT);
    setInkColor(DEFAULT_INK);
    setSourceMode("text");
    setImageDataUrl(DEFAULT_IMAGE_SRC);
    setImageName("");
    setRichText(DEFAULT_RICH_TEXT);
    setEditorFontSize("28");
    setEditorLineHeightValue("1.2");
    setEditorAlign("center");
    setSettings(DEFAULT_SETTINGS);
    settingsRef.current = DEFAULT_SETTINGS;
    setSourceMessage(t.resetDone);
    controllerRef.current?.reset();
    controllerRef.current?.setOptions(DEFAULT_SETTINGS);
    if (richEditorRef.current) {
      richEditorRef.current.innerHTML =
        '<div data-line-height="1.2" style="text-align:center;line-height:33.6px"><span style="color:#19191d;font-size:28px;font-weight:900">PEEL </span><span style="color:rgb(36, 126, 245);font-size:28px;font-weight:900">ME</span></div><div data-line-height="0.8" style="text-align:center;line-height:8px"><span style="color:#19191d;font-size:10px;font-weight:500">@cats_juice</span></div>';
    }
    void applySource(makeTextSource(DEFAULT_TEXT, DEFAULT_INK, DEFAULT_RICH_TEXT));
  };

  const buildEmbedSnippet = (
    selectedSource: StickerSource,
    selectedOptions: StickerOptions,
  ) => {
    const origin = window.location.origin;
    const source: StickerSource =
      selectedSource.type === "image" && selectedSource.src.startsWith("/")
        ? { ...selectedSource, src: `${origin}${selectedSource.src}` }
        : selectedSource;

    return `<script type="module" src="${origin}/embed/sticker-forge.es.js"></script>

<sticker-forge id="my-sticker" style="display:block;width:640px;height:420px"></sticker-forge>

<script type="module">
  await customElements.whenDefined("sticker-forge");
  const sticker = document.querySelector("#my-sticker");
  await sticker.setSource(${stringifyForInlineScript(source, 2)});
  sticker.setOptions(${stringifyForInlineScript(selectedOptions, 2)});
</script>`;
  };

  const addCurrentStickerToGallery = async (
    folderId = addToGalleryFolderId,
  ) => {
    if (galleryAdding || galleryLoading) return;
    const targetFolderId = galleryFolders.some((folder) => folder.id === folderId)
      ? folderId
      : DEFAULT_GALLERY_FOLDER_ID;
    setGalleryAdding(true);
    setGalleryAddMenuOpen(false);
    setGalleryAddMenuPosition(null);
    try {
      const source = sourceRef.current;
      const currentSettings = settingsRef.current;
      const nextGalleryIndex = galleryItems.reduce(
        (largest, item) => Math.max(largest, item.layout.zIndex),
        0,
      );
      const { item, preview } = await createStoredGalleryItemWithPreview(
        source,
        currentSettings,
        nextGalleryIndex,
        targetFolderId,
      );
      setGalleryItems((items) => [item, ...items]);
      setSourceMessage(t.addedToGallery);
      const host = stageRef.current;
      const folder = galleryFolderRef.current;
      if (!host || !folder) {
        controllerRef.current?.reappear();
        setGalleryAdding(false);
        return;
      }
      const destination = folderReceiveTarget(folder, preview.aspect);
      const folderRect = folder.getBoundingClientRect();
      setGalleryFolderReceiving(true);
      setGalleryAddFlight({
        itemId: item.id,
        previewDataUrl: preview.dataUrl,
        start: editorStickerRect(host, preview.aspect),
        target: destination.rect,
        coordinateOrigin: {
          left: folderRect.left,
          top: folderRect.top,
        },
        startRotation: currentSettings.tilt,
        targetRotation: destination.rotation,
      });
    } catch {
      setSourceMessage(t.galleryAddFailed);
      setGalleryAdding(false);
    }
  };

  const resetPanelSettledPosition = () => {
    const shell = studioShellRef.current;
    shell?.style.removeProperty("--panel-settled-y");
    shell?.style.removeProperty("--panel-settled-content-opacity");
  };

  const startPanelDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (!event.isPrimary || event.button !== 0) return;
    const panel = controlsCardRef.current;
    const shell = studioShellRef.current;
    if (!panel || !shell) return;
    event.preventDefault();
    event.currentTarget.setPointerCapture(event.pointerId);
    const minimumStageHeight = resolvePanelLength(
      panel,
      "var(--mobile-stage-min-height)",
    );
    const startOffset = Math.max(
      0,
      panel.getBoundingClientRect().top - minimumStageHeight,
    );
    const peekHeight = resolvePanelLength(
      panel,
      "var(--mobile-panel-peek-height)",
    );
    const maxPanelHeight = window.innerHeight - minimumStageHeight;
    const fadeStartOffset = Math.max(
      0,
      maxPanelHeight -
        window.innerHeight * PANEL_MIN_OPEN_VIEWPORT_RATIO,
    );
    const collapseOffset = Math.max(1, maxPanelHeight - peekHeight);
    shell.style.setProperty("--panel-drag-y", `${startOffset}px`);
    shell.style.setProperty(
      "--panel-content-opacity",
      `${panelContentOpacity(startOffset, fadeStartOffset, collapseOffset)}`,
    );
    panelDragRef.current = {
      pointerId: event.pointerId,
      startY: event.clientY,
      startOffset,
      collapseOffset,
      fadeStartOffset,
      maxPanelHeight,
      startedOpen: isPanelOpen,
    };
    shell.setAttribute("data-panel-dragging", "true");
    panel.setAttribute("data-dragging", "true");
  };

  const movePanelDrag = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = panelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    const offset = Math.max(
      0,
      Math.min(
        drag.collapseOffset,
        drag.startOffset + event.clientY - drag.startY,
      ),
    );
    studioShellRef.current?.style.setProperty(
      "--panel-drag-y",
      `${offset}px`,
    );
    studioShellRef.current?.style.setProperty(
      "--panel-content-opacity",
      `${panelContentOpacity(
        offset,
        drag.fadeStartOffset,
        drag.collapseOffset,
      )}`,
    );
  };

  const finishPanelDrag = (
    event: ReactPointerEvent<HTMLButtonElement>,
    cancelled = false,
  ) => {
    const drag = panelDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    panelDragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    const panel = controlsCardRef.current;
    const shell = studioShellRef.current;
    const travel = event.clientY - drag.startY;
    if (!cancelled && Math.abs(travel) > PANEL_DRAG_CLICK_SLOP) {
      panelDragClickSuppressedUntilRef.current = performance.now() + 350;
    }
    const finalOffset = Math.max(
      0,
      Math.min(drag.collapseOffset, drag.startOffset + travel),
    );
    const visiblePanelHeight = drag.maxPanelHeight - finalOffset;
    const reachedUsableHeight =
      visiblePanelHeight >=
      window.innerHeight * PANEL_MIN_OPEN_VIEWPORT_RATIO;
    const hasReopenIntent =
      !drag.startedOpen && travel < -PANEL_DRAG_CLICK_SLOP;
    const targetOpen = cancelled
      ? drag.startedOpen
      : drag.startedOpen
        ? reachedUsableHeight
        : hasReopenIntent;

    panel?.removeAttribute("data-dragging");
    shell?.removeAttribute("data-panel-dragging");
    if (panel) {
      // Commit the dragged position before restoring transitions so a
      // canceled gesture springs back instead of snapping.
      panel.getBoundingClientRect();
    }
    if (!cancelled && targetOpen && reachedUsableHeight && shell) {
      shell.style.setProperty(
        "--panel-settled-y",
        `${(finalOffset / window.innerHeight) * 100}dvh`,
      );
      shell.style.setProperty(
        "--panel-settled-content-opacity",
        `${panelContentOpacity(
          finalOffset,
          drag.fadeStartOffset,
          drag.collapseOffset,
        )}`,
      );
    } else if (!cancelled && targetOpen && !reachedUsableHeight) {
      resetPanelSettledPosition();
    }
    setIsPanelOpen(targetOpen);
    window.requestAnimationFrame(() => {
      shell?.style.removeProperty("--panel-drag-y");
      shell?.style.removeProperty("--panel-content-opacity");
    });
  };

  return (
    <main
      ref={studioShellRef}
      className="studio-shell"
      data-panel-open={isPanelOpen}
      data-gallery-open={galleryOpen}
      data-gallery-editing={galleryEditing}
      data-export-active={exportOpen}
      data-export-open={exportOpen && !exportClosing}
      data-export-closing={exportClosing}
      data-pwa-standalone={isStandalonePwa}
    >
      <header className="studio-header">
        <span className="brand-mark" role="img" aria-label="Sticker Forge" />
      </header>

      <section className="stage-card" aria-label={t.preview}>
        <div
          className="sticker-stage"
          data-background-removal={backgroundRemoval.phase}
        >
          <div
            ref={stageRef}
            className="sticker-host"
            data-gallery-adding={Boolean(galleryAddFlight)}
            data-gallery-editing={galleryEditing}
            data-gallery-editor-ready={galleryEditorReady}
            data-testid="sticker-stage"
            role="group"
            aria-label={t.interactiveSticker}
          />
          {backgroundParticles ? (
            <BackgroundRemovalEffect
              source={backgroundParticles.source}
              resultPixels={backgroundParticles.result.pixels}
              resultWidth={backgroundParticles.result.width}
              resultHeight={backgroundParticles.result.height}
              tilt={settings.tilt}
              playing={backgroundParticles.playing}
              onReady={() =>
                void handleBackgroundParticlesReady(
                  backgroundParticles.revision,
                  backgroundParticles.nextSource,
                  backgroundParticles.result.dataUrl,
                )
              }
              onStart={() =>
                handleBackgroundParticlesStart(
                  backgroundParticles.revision,
                )
              }
              onComplete={handleBackgroundParticlesComplete}
            />
          ) : null}
        </div>
      </section>

      <button
        className="panel-toggle"
        data-open={isPanelOpen}
        type="button"
        aria-label={isPanelOpen ? t.closePanel : t.openPanel}
        aria-expanded={isPanelOpen}
        aria-controls="sticker-controls"
        onClick={() => setIsPanelOpen((open) => !open)}
      >
        <span className="panel-toggle-arrow" aria-hidden="true">
          <FontAwesomeIcon icon={isPanelOpen ? faArrowRight : faArrowLeft} />
        </span>
      </button>

        <aside
          ref={controlsCardRef}
          id="sticker-controls"
          className="controls-card"
          data-open={isPanelOpen}
          aria-label={t.controls}
        >
          <button
            className="controls-drag-region"
            type="button"
            aria-label={isPanelOpen ? t.closePanel : t.openPanel}
            aria-expanded={isPanelOpen}
            aria-controls="sticker-controls"
            onPointerDown={startPanelDrag}
            onPointerMove={movePanelDrag}
            onPointerUp={finishPanelDrag}
            onPointerCancel={(event) => finishPanelDrag(event, true)}
            onClick={() => {
              if (performance.now() < panelDragClickSuppressedUntilRef.current) {
                return;
              }
              resetPanelSettledPosition();
              setIsPanelOpen((open) => !open);
            }}
          >
            <span className="controls-drag-handle" aria-hidden="true" />
          </button>
          <div className="controls-header">
            <div className="controls-heading-row">
              <h2 className="controls-title">{t.title}</h2>
              <div className="controls-heading-actions">
                <button
                  className="icon-button reset-button"
                  type="button"
                  onClick={resetStudio}
                  aria-label={t.reset}
                  title={t.reset}
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
                <a
                  className="icon-button"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.github}
                  title={t.github}
                >
                  <FontAwesomeIcon icon={faGithub} />
                </a>
                <div className="language-picker">
                  <button
                    className="icon-button language-button"
                    type="button"
                    aria-label={t.language}
                    title={t.language}
                    aria-haspopup="menu"
                    aria-expanded={isLanguageOpen}
                    onClick={() => setIsLanguageOpen((open) => !open)}
                  >
                    {locale === "zh" ? "中" : "EN"}
                  </button>
                  {isLanguageOpen ? (
                    <div className="language-menu" role="menu" aria-label={t.language}>
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={locale === "zh"}
                        onClick={() => {
                          setLocale("zh");
                          setSourceMessage("");
                          setIsLanguageOpen(false);
                        }}
                      >
                        中文
                      </button>
                      <button
                        type="button"
                        role="menuitemradio"
                        aria-checked={locale === "en"}
                        onClick={() => {
                          setLocale("en");
                          setSourceMessage("");
                          setIsLanguageOpen(false);
                        }}
                      >
                        English
                      </button>
                    </div>
                  ) : null}
                </div>
              </div>
            </div>
          </div>

          <div className="controls-scroll">
            <div
              className="source-tabs"
              data-mode={sourceMode}
              aria-label={t.sourceType}
            >
              <button
                className="source-tab"
                type="button"
                aria-pressed={sourceMode === "text"}
                data-active={sourceMode === "text"}
                onClick={() => switchSourceMode("text")}
              >
                {t.text}
              </button>
              <button
                className="source-tab"
                type="button"
                aria-pressed={sourceMode === "image"}
                data-active={sourceMode === "image"}
                onClick={() => switchSourceMode("image")}
              >
                {t.image}
              </button>
            </div>

            <div className="source-panel">
              {sourceMode === "text" ? (
                <>
                  <span className="field-label">{t.stickerText}</span>
                  <div className="rich-text-shell">
                    <div className="rich-text-toolbar" role="toolbar" aria-label={t.richEditor}>
                      <button
                        type="button"
                        aria-label={t.bold}
                        title={t.bold}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runEditorCommand("bold")}
                      >
                        <FontAwesomeIcon icon={faBold} />
                      </button>
                      <button
                        type="button"
                        aria-label={t.underline}
                        title={t.underline}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runEditorCommand("underline")}
                      >
                        <FontAwesomeIcon icon={faUnderline} />
                      </button>
                      <div className="toolbar-number-control" title={t.fontSize}>
                        <span className="sr-only">{t.fontSize}</span>
                        <span className="number-control-symbol" aria-hidden="true"><FontAwesomeIcon icon={faFont} /></span>
                        <input
                          type="text"
                          inputMode="numeric"
                          aria-label={t.fontSize}
                          value={editorFontSize}
                          onMouseDown={rememberEditorSelection}
                          onChange={(event) => setEditorFontSize(event.target.value)}
                          onBlur={(event) =>
                            changeEditorFontSize(
                              Number(event.currentTarget.value) || 28,
                            )
                          }
                          onKeyDown={(event) => {
                            if (event.key !== "Enter") return;
                            event.preventDefault();
                          }}
                          onKeyUp={(event) => {
                            if (event.key !== "Enter") return;
                            event.currentTarget.blur();
                          }}
                        />
                        <span className="number-preset-select">
                          <select
                            aria-label={t.fontSizePresets}
                            value=""
                            onMouseDown={rememberEditorSelection}
                            onChange={(event) => {
                              const nextSize = Number(event.currentTarget.value);
                              setEditorFontSize(String(nextSize));
                              changeEditorFontSize(nextSize);
                            }}
                          >
                            <option value="" disabled>{t.fontSizePresets}</option>
                            {FONT_SIZE_PRESETS.map((size) => (
                              <option key={size} value={size}>{size}</option>
                            ))}
                          </select>
                          <DropdownChevron />
                        </span>
                      </div>
                      <div className="toolbar-number-control line-height-control" title={t.lineHeight}>
                        <span className="sr-only">{t.lineHeight}</span>
                        <span className="number-control-symbol" aria-hidden="true"><FontAwesomeIcon icon={faTextHeight} /></span>
                        <input
                          type="text"
                          inputMode="decimal"
                          aria-label={t.lineHeight}
                          value={editorLineHeightValue}
                          onMouseDown={rememberEditorSelection}
                          onChange={(event) =>
                            setEditorLineHeightValue(event.target.value)
                          }
                          onBlur={(event) =>
                            changeEditorLineHeight(
                              Number(event.currentTarget.value) || 1.2,
                            )
                          }
                          onKeyDown={(event) => {
                            if (event.key !== "Enter") return;
                            event.preventDefault();
                          }}
                          onKeyUp={(event) => {
                            if (event.key !== "Enter") return;
                            event.currentTarget.blur();
                          }}
                        />
                        <span className="number-preset-select">
                          <select
                            aria-label={t.lineHeightPresets}
                            value=""
                            onMouseDown={rememberEditorSelection}
                            onChange={(event) => {
                              const nextLineHeight = Number(event.currentTarget.value);
                              setEditorLineHeightValue(String(nextLineHeight));
                              changeEditorLineHeight(nextLineHeight);
                            }}
                          >
                            <option value="" disabled>{t.lineHeightPresets}</option>
                            {LINE_HEIGHT_PRESETS.map((lineHeight) => (
                              <option key={lineHeight} value={lineHeight}>{lineHeight}</option>
                            ))}
                          </select>
                          <DropdownChevron />
                        </span>
                      </div>
                      <span className="toolbar-divider" aria-hidden="true" />
                      <div
                        className="alignment-group"
                        role="group"
                        aria-label={t.alignment}
                      >
                        {([
                          ["left", "justifyLeft", t.alignLeft],
                          ["center", "justifyCenter", t.alignCenter],
                          ["right", "justifyRight", t.alignRight],
                        ] as const).map(([align, command, label]) => (
                          <button
                            className="alignment-button"
                            type="button"
                            key={align}
                            aria-label={label}
                            aria-pressed={editorAlign === align}
                            data-active={editorAlign === align}
                            title={label}
                            onMouseDown={(event) => event.preventDefault()}
                            onClick={() => changeEditorAlignment(command, align)}
                          >
                            <AlignmentIcon align={align} />
                          </button>
                        ))}
                      </div>
                      <label className="rich-color-control" title={t.textColor}>
                        <span className="sr-only">{t.textColor}</span>
                        <span style={{ background: inkColor }} aria-hidden="true" />
                        <input
                          type="color"
                          value={inkColor}
                          aria-label={t.textColor}
                          onMouseDown={rememberEditorSelection}
                          onChange={(event) => handleEditorColor(event.target.value)}
                        />
                      </label>
                    </div>
                    <div
                      ref={richEditorRef}
                      id="sticker-text"
                      className="rich-text-editor"
                      contentEditable
                      suppressContentEditableWarning
                      role="textbox"
                      aria-label={t.richEditor}
                      aria-multiline="true"
                      data-placeholder={t.textPlaceholder}
                      spellCheck={false}
                      onInput={handleRichInput}
                      onSelect={rememberEditorSelection}
                      onKeyUp={rememberEditorSelection}
                      onMouseUp={rememberEditorSelection}
                      onFocus={rememberEditorSelection}
                    >
                      <div
                        data-line-height="1.2"
                        style={{ textAlign: "center", lineHeight: "33.6px" }}
                      >
                        <span
                          style={{
                            color: DEFAULT_INK,
                            fontSize: 28,
                            fontWeight: 900,
                          }}
                        >
                          PEEL{" "}
                        </span>
                        <span
                          style={{
                            color: DEFAULT_ACCENT,
                            fontSize: 28,
                            fontWeight: 900,
                          }}
                        >
                          ME
                        </span>
                      </div>
                      <div
                        data-line-height="0.8"
                        style={{ textAlign: "center", lineHeight: "8px" }}
                      >
                        <span
                          style={{
                            color: DEFAULT_INK,
                            fontSize: 10,
                            fontWeight: 500,
                          }}
                        >
                          @cats_juice
                        </span>
                      </div>
                    </div>
                  </div>
                </>
              ) : (
                <>
                  <span className="field-label">{t.uploadImage}</span>
                  <label
                    className="upload-zone"
                    data-dragging={draggingFile}
                    onDragEnter={() => setDraggingFile(true)}
                    onDragLeave={() => setDraggingFile(false)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <span className="upload-icon" aria-hidden="true"><FontAwesomeIcon icon={faPlus} /></span>
                    <strong>{imageName || t.uploadPrompt}</strong>
                    <span>{sourceMessage || t.localOnly}</span>
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/*,.heic,.heif"
                      onChange={(event) => void loadImageFile(event.target.files?.[0])}
                    />
                  </label>
                  <div className="background-removal-control">
                    <div
                      className="background-removal-action"
                      onPointerEnter={() =>
                        setShowBackgroundRemovalTip(false)
                      }
                    >
                      {showBackgroundRemovalTip ? (
                        <BackgroundRemovalTip
                          anchor={backgroundRemovalButtonRef}
                          label={t.tryRemoveBackground}
                        />
                      ) : null}
                      <button
                        ref={backgroundRemovalButtonRef}
                        className="background-removal-button"
                        type="button"
                        data-phase={backgroundRemoval.phase}
                        disabled={backgroundRemovalBusy || imageImportBusy}
                        aria-busy={backgroundRemovalBusy || imageImportBusy}
                        aria-describedby={
                          showBackgroundRemovalTip
                            ? "background-removal-tip"
                            : undefined
                        }
                        onPointerEnter={() =>
                          setShowBackgroundRemovalTip(false)
                        }
                        onFocus={() => setShowBackgroundRemovalTip(false)}
                        onClick={() => {
                          setShowBackgroundRemovalTip(false);
                          void removeCurrentImageBackground();
                        }}
                      >
                        <FontAwesomeIcon icon={faWandMagicSparkles} aria-hidden="true" />
                        <span>{backgroundRemovalLabel}</span>
                        {backgroundRemoval.phase === "loading" ? (
                          <span
                            className="background-removal-progress"
                            style={{
                              "--background-removal-progress": `${backgroundRemoval.progress ?? 0}%`,
                            } as CSSProperties}
                            aria-hidden="true"
                          />
                        ) : null}
                      </button>
                    </div>
                    <small
                      className="background-removal-caption"
                      data-error={backgroundRemoval.phase === "error"}
                    >
                      {backgroundRemoval.phase === "error"
                        ? t.backgroundRemovalFailed
                        : t.removeBackgroundHint}
                    </small>
                  </div>
                  <span className="sr-only" aria-live="polite">
                    {backgroundRemovalBusy ? backgroundRemovalLabel : ""}
                  </span>
                </>
              )}
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>{t.surface}</h3>
              <span>Surface</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="outline-width"
                label={t.outlineWidth}
                min={0}
                max={44}
                step={1}
                value={settings.outline.width}
                display={`${settings.outline.width}px`}
                onChange={(width) =>
                  updateSetting("outline", { ...settings.outline, width })
                }
              />
              <RangeRow
                id="tilt"
                label={t.tilt}
                min={-12}
                max={12}
                step={0.5}
                value={settings.tilt}
                display={`${settings.tilt.toFixed(1)}°`}
                onChange={(value) => updateSetting("tilt", value)}
              />
            </div>
            <div className="dual-color-row">
              <label className="compact-color">
                <span>{t.outline}</span>
                <input
                  type="color"
                  value={settings.outline.color}
                  aria-label={t.outlineColor}
                  onChange={(event) =>
                    updateSetting("outline", {
                      ...settings.outline,
                      color: event.target.value,
                    })
                  }
                />
              </label>
              <label className="compact-color">
                <span>{t.backing}</span>
                <input
                  type="color"
                  value={settings.back.color}
                  aria-label={t.backColor}
                  onChange={(event) =>
                    updateSetting("back", {
                      ...settings.back,
                      color: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>{t.peel}</h3>
              <span>Peel physics</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="curl-radius"
                label={t.curlRadius}
                min={0.08}
                max={0.2}
                step={0.005}
                value={settings.peel.radius}
                display={settings.peel.radius.toFixed(3)}
                onChange={(radius) =>
                  updateSetting("peel", { ...settings.peel, radius })
                }
              />
              <RangeRow
                id="stiffness"
                label={t.stiffness}
                min={0.4}
                max={0.95}
                step={0.01}
                value={settings.peel.stiffness}
                display={`${Math.round(settings.peel.stiffness * 100)}%`}
                onChange={(stiffness) =>
                  updateSetting("peel", { ...settings.peel, stiffness })
                }
              />
              <RangeRow
                id="wind"
                label={t.wind}
                min={0}
                max={1.5}
                step={0.05}
                value={settings.wind}
                display={settings.wind.toFixed(2)}
                onChange={(value) => updateSetting("wind", value)}
              />
              <RangeRow
                id="peel-volume"
                label={t.volume}
                min={0}
                max={1}
                step={0.01}
                value={settings.sound?.volume ?? DEFAULT_SETTINGS.sound.volume}
                display={`${Math.round(
                  (settings.sound?.volume ?? DEFAULT_SETTINGS.sound.volume) *
                    100,
                )}%`}
                onChange={(volume) =>
                  updateSetting("sound", {
                    enabled: settings.sound?.enabled ?? true,
                    volume,
                  })
                }
              />
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>{t.material}</h3>
              <span>Light</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="shadow-opacity"
                label={t.shadowOpacity}
                min={0}
                max={0.5}
                step={0.01}
                value={settings.shadow.opacity}
                display={settings.shadow.opacity.toFixed(2)}
                onChange={(opacity) =>
                  updateSetting("shadow", { ...settings.shadow, opacity })
                }
              />
              <RangeRow
                id="shadow-blur"
                label={t.shadowBlur}
                min={4}
                max={42}
                step={1}
                value={settings.shadow.blur}
                display={`${settings.shadow.blur}px`}
                onChange={(blur) =>
                  updateSetting("shadow", { ...settings.shadow, blur })
                }
              />
              <RangeRow
                id="back-gloss"
                label={t.backGloss}
                min={0}
                max={1}
                step={0.01}
                value={settings.back.gloss}
                display={`${Math.round(settings.back.gloss * 100)}%`}
                onChange={(gloss) =>
                  updateSetting("back", { ...settings.back, gloss })
                }
              />
            </div>
          </div>

          <div className="controls-footer">
            <div
              ref={galleryAddControlRef}
              className="gallery-add-control"
              data-menu-open={galleryAddMenuOpen}
              onPointerEnter={() => setGalleryAddHovered(true)}
              onPointerLeave={() => setGalleryAddHovered(false)}
              onFocusCapture={() => setGalleryAddHovered(true)}
              onBlurCapture={(event) => {
                const nextTarget = event.relatedTarget;
                if (
                  !(nextTarget instanceof Node) ||
                  !event.currentTarget.contains(nextTarget)
                ) {
                  setGalleryAddHovered(false);
                }
              }}
            >
              <button
                ref={galleryAddMainRef}
                className="primary-button gallery-add-button gallery-add-main"
                type="button"
                disabled={galleryAdding || galleryLoading}
                aria-label={addToGalleryHoverLabel}
                onClick={() => void addCurrentStickerToGallery()}
              >
                <span className="gallery-add-main-content">
                  <GalleryFolderIcon
                    color={addToGalleryFolder?.color ?? "#59b0d8"}
                  />
                  <span
                    className="gallery-add-label-viewport"
                    data-hovered={galleryAddHovered && !galleryAdding}
                    data-overflowing={galleryAddLabelOverflowing}
                    style={{
                      "--gallery-add-label-width": `${galleryAddLabelWidth}px`,
                    } as CSSProperties}
                  >
                    <span className="gallery-add-label-track">
                      <span>{addToGalleryRestLabel}</span>
                      <span>{addToGalleryHoverLabel}</span>
                    </span>
                  </span>
                  <span
                    className="gallery-add-label-measurer"
                    aria-hidden="true"
                  >
                    <span ref={galleryAddRestLabelRef}>
                      {addToGalleryRestLabel}
                    </span>
                    <span ref={galleryAddHoverLabelRef}>
                      {addToGalleryHoverLabel}
                    </span>
                  </span>
                </span>
              </button>
              <button
                className="primary-button gallery-add-toggle"
                type="button"
                disabled={galleryAdding || galleryLoading}
                aria-label={
                  locale === "zh" ? "选择目标 Gallery" : "Choose target Gallery"
                }
                aria-expanded={galleryAddMenuOpen}
                data-active={galleryAddMenuOpen}
                onClick={() => {
                  if (galleryAddMenuOpen) {
                    setGalleryAddMenuOpen(false);
                    setGalleryAddMenuPosition(null);
                    return;
                  }
                  const rect =
                    galleryAddControlRef.current?.getBoundingClientRect();
                  if (rect) {
                    setGalleryAddMenuPosition({
                      right: Math.max(8, window.innerWidth - rect.right),
                      bottom: Math.max(
                        8,
                        window.innerHeight - rect.top + 8,
                      ),
                      maxHeight: Math.max(
                        96,
                        Math.min(286, rect.top - 16),
                      ),
                    });
                  }
                  setGalleryAddMenuOpen(true);
                }}
              >
                <FontAwesomeIcon icon={faChevronDown} />
              </button>
            </div>
            <button
              className="primary-button export-button"
              type="button"
              onClick={() => {
                setExportSource(sourceRef.current);
                setExportOptions(settingsRef.current);
                setExportClosing(false);
                setExportOpen(true);
              }}
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
              <span>{t.export}</span>
            </button>
          </div>
        </aside>
      {galleryAddMenuOpen && galleryAddMenuPosition
        ? createPortal(
            <div
              ref={galleryAddMenuRef}
              className="gallery-add-menu"
              role="menu"
              aria-label={
                locale === "zh" ? "Gallery 列表" : "Gallery list"
              }
              style={{
                right: galleryAddMenuPosition.right,
                bottom: galleryAddMenuPosition.bottom,
                maxHeight: galleryAddMenuPosition.maxHeight,
              }}
            >
              {galleryFolders.map((folder) => (
                <button
                  key={folder.id}
                  type="button"
                  role="menuitemradio"
                  aria-checked={folder.id === addToGalleryFolderId}
                  data-selected={folder.id === addToGalleryFolderId}
                  onClick={() => {
                    setAddToGalleryFolderId(folder.id);
                    window.localStorage.setItem(
                      ADD_TO_GALLERY_FOLDER_STORAGE_KEY,
                      folder.id,
                    );
                    void addCurrentStickerToGallery(folder.id);
                  }}
                >
                  <GalleryFolderIcon color={folder.color} />
                  <span>{folder.title}</span>
                  {folder.id === addToGalleryFolderId ? (
                    <FontAwesomeIcon
                      className="gallery-add-menu-check"
                      icon={faCheck}
                    />
                  ) : null}
                </button>
              ))}
            </div>,
            document.body,
          )
        : null}
      {exportOpen && typeof document !== "undefined"
        ? createPortal(
            <ExportDialog
              source={exportSource}
              options={exportOptions}
              embedCode={buildEmbedSnippet(exportSource, exportOptions)}
              locale={locale}
              standalonePwa={isStandalonePwa}
              onClosing={() => setExportClosing(true)}
              onClose={() => {
                setExportOpen(false);
                setExportClosing(false);
              }}
            />,
            document.body,
          )
        : null}
      {galleryOpen ? (
        <GalleryCanvas
          key={activeGalleryFolderId}
          items={galleryItems.filter(
            (item) => item.folderId === activeGalleryFolderId,
          )}
          locale={locale}
          entryOrigins={galleryEntryOrigins}
          closing={galleryClosing}
          holdSurfaceVisible={gallerySurfaceHeld}
          currentFolderId={activeGalleryFolderId}
          currentFolder={galleryFolders.find(
            (folder) => folder.id === activeGalleryFolderId,
          )!}
          onItemsChange={(folderItems) => {
            setGalleryItems((current) => [
              ...folderItems,
              ...current.filter(
                (item) => item.folderId !== activeGalleryFolderId,
              ),
            ]);
          }}
          onItemMoved={(movedItem) => {
            setGalleryItems((current) =>
              current.map((item) =>
                item.id === movedItem.id ? movedItem : item,
              ),
            );
          }}
          onFolderDragHover={setGalleryDropPreview}
          onFolderChange={(updatedFolder) => {
            setGalleryFolders((current) =>
              current.map((folder) =>
                folder.id === updatedFolder.id ? updatedFolder : folder,
              ),
            );
          }}
          onRequestClose={() => setGalleryClosing(true)}
          onEntryStart={() => setGalleryFlightStarted(true)}
          onEntryComplete={() => setGalleryEntryComplete(true)}
          onSurfaceReady={() => setGallerySurfaceHeld(false)}
          onEditStart={() => {
            setGalleryEditorReady(false);
            setGalleryEditing(true);
            setCollapseGalleryPreviewsImmediately(true);
          }}
          interactionBlocked={exportOpen}
          onExport={(asset) => {
            setExportSource(asset.source);
            setExportOptions(asset.options);
            setExportClosing(false);
            setExportOpen(true);
          }}
          resolveEditTarget={(item) => {
            const host = stageRef.current;
            if (!host) return null;
            return editorStickerRect(
              host,
              item.previewWidth / Math.max(1, item.previewHeight),
            );
          }}
          onEditComplete={applyGalleryAssetToEditor}
          onEditHandoffComplete={() => {
            setGalleryOpen(false);
            setGalleryClosing(false);
            setGalleryFlightStarted(false);
            setGalleryEntryComplete(false);
            setGalleryEntryOrigins({});
            setGalleryDropPreview(null);
            setGallerySurfaceHeld(false);
            window.requestAnimationFrame(() => {
              setGalleryEditing(false);
              setGalleryEditorReady(false);
              window.requestAnimationFrame(() => {
                setCollapseGalleryPreviewsImmediately(false);
              });
            });
          }}
          onClose={() => {
            setGalleryOpen(false);
            setGalleryClosing(false);
            setGalleryFlightStarted(false);
            setGalleryEntryComplete(false);
            setGalleryEntryOrigins({});
            setGalleryEditing(false);
            setCollapseGalleryPreviewsImmediately(false);
            setGalleryEditorReady(false);
            setGalleryDropPreview(null);
            setGallerySurfaceHeld(false);
          }}
        />
      ) : null}
      <GalleryFolderDock
        receivingFolderRef={galleryFolderRef}
        receivingFolderId={
          addToGalleryFolder?.id ?? DEFAULT_GALLERY_FOLDER_ID
        }
        key="gallery-folder-dock"
        folders={galleryFolders}
        items={galleryItems}
        locale={locale}
        activeFolderId={activeGalleryFolderId}
        galleryOpen={galleryOpen}
        showActivePreviews={!galleryOpen || !galleryFlightStarted}
        collapseActivePreviewsImmediately={
          collapseGalleryPreviewsImmediately
        }
        dropPreview={galleryDropPreview}
        loading={
          galleryLoading ||
          galleryAdding ||
          galleryEditing ||
          galleryClosing ||
          (galleryOpen && !galleryEntryComplete)
        }
        receiving={galleryFolderReceiving}
        receivingItemId={galleryAddFlight?.itemId}
        flight={
          galleryAddFlight ? (
            <GalleryAddFlight
              previewDataUrl={galleryAddFlight.previewDataUrl}
              start={galleryAddFlight.start}
              target={galleryAddFlight.target}
              coordinateOrigin={galleryAddFlight.coordinateOrigin}
              startRotation={galleryAddFlight.startRotation}
              targetRotation={galleryAddFlight.targetRotation}
              onArrived={() => setGalleryFolderReceiving(false)}
            />
          ) : null
        }
        onReceiveClosed={() => {
          controllerRef.current?.reappear();
          setGalleryAddFlight(null);
          setGalleryAdding(false);
        }}
        onFoldersChange={setGalleryFolders}
        onItemsChange={setGalleryItems}
        onFolderDeleted={(folderId) => {
          if (folderId === addToGalleryFolderId) {
            setAddToGalleryFolderId(DEFAULT_GALLERY_FOLDER_ID);
            window.localStorage.setItem(
              ADD_TO_GALLERY_FOLDER_STORAGE_KEY,
              DEFAULT_GALLERY_FOLDER_ID,
            );
          }
          if (folderId !== activeGalleryFolderId) return;
          setGallerySurfaceHeld(true);
          setActiveGalleryFolderId(DEFAULT_GALLERY_FOLDER_ID);
          setGalleryEntryOrigins({});
          setGalleryFlightStarted(false);
          setGalleryEntryComplete(false);
        }}
        onFolderOpen={(folderId, origins) => {
          if (galleryAdding || galleryEditing) return;
          if (galleryOpen && folderId === activeGalleryFolderId) {
            setGalleryClosing(true);
            return;
          }
          setGallerySurfaceHeld(galleryOpen);
          setActiveGalleryFolderId(folderId);
          setGalleryEntryOrigins(origins);
          setGalleryClosing(false);
          setGalleryFlightStarted(false);
          setGalleryEntryComplete(false);
          setCollapseGalleryPreviewsImmediately(false);
          setGalleryOpen(true);
        }}
        onPreviewEdit={(item, origin) => {
          if (
            galleryLoading ||
            galleryAdding ||
            galleryEditing ||
            galleryClosing ||
            galleryOpen
          ) {
            return;
          }
          const host = stageRef.current;
          if (!host) return;
          setGalleryEditorReady(false);
          setGalleryEditing(true);
          void getGalleryAsset(item.id)
            .then((asset) => {
              const target = editorStickerRect(
                host,
                item.previewWidth / Math.max(1, item.previewHeight),
              );
              setGalleryQuickEdit({
                item,
                asset,
                start: origin,
                target,
                targetRotation: -(asset.options.tilt ?? 0),
              });
            })
            .catch(() => {
              setGalleryEditing(false);
              setSourceMessage(t.assetFailed);
            });
        }}
      />
      {galleryQuickEdit ? (
        <GalleryQuickEditFlight
          itemId={galleryQuickEdit.item.id}
          start={galleryQuickEdit.start}
          target={galleryQuickEdit.target}
          targetRotation={galleryQuickEdit.targetRotation}
          editorReady={galleryEditorReady}
          onArrived={() => {
            void applyGalleryAssetToEditor(galleryQuickEdit.asset);
          }}
          onComplete={() => {
            setGalleryQuickEdit(null);
            setGalleryEditing(false);
            setGalleryEditorReady(false);
          }}
        />
      ) : null}
      <span className="sr-only" aria-live="polite">
        {sourceMessage || t.localOnly}
      </span>
    </main>
  );
}
