"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type DragEvent,
} from "react";
import type {
  StickerInstance,
  StickerOptions,
  StickerRichTextBlock,
  StickerRichTextDocument,
  StickerRichTextRun,
  StickerSource,
} from "@/lib/sticker-forge";
import { sanitizeSvgMarkup } from "@/lib/sticker-forge";

type StickerController = StickerInstance;
type SourceMode = "text" | "image";
type Locale = "zh" | "en";

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
const FONT_SIZE_PRESETS = [8, 10, 12, 14, 16, 18, 20, 24, 28, 32, 36, 48, 64, 72, 96, 120, 160, 200, 240];
const LINE_HEIGHT_PRESETS = [0.7, 0.8, 0.9, 1, 1.1, 1.2, 1.3, 1.4, 1.5, 1.6, 1.8, 2, 2.5, 3];
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
    waitingMaterial: "等待材质就绪",
    assetFailed: "素材处理失败，已保留上一张贴纸",
    textFailed: "文字素材处理失败，已保留上一张贴纸",
    chooseImage: "请选择图像文件",
    imageTooLarge: "图像需要小于 15 MB",
    reading: "正在本地读取",
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
    copied: "✓ 已复制代码",
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
    waitingMaterial: "Preparing material",
    assetFailed: "Could not process this artwork; the previous sticker was kept",
    textFailed: "Could not process this text; the previous sticker was kept",
    chooseImage: "Please choose an image file",
    imageTooLarge: "Images must be smaller than 15 MB",
    reading: "Reading locally",
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
    copied: "✓ Code copied",
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

function asStickerOptions(
  source: StickerSource,
  settings: StudioSettings,
): StickerOptions {
  return { source, ...settings };
}

function stringifyForInlineScript(value: unknown, space?: number): string {
  return (JSON.stringify(value, null, space) ?? "null").replace(
    /</g,
    "\\u003c",
  );
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
  const rows =
    align === "left"
      ? [[3, 17], [3, 13], [3, 17], [3, 11]]
      : align === "right"
        ? [[3, 17], [7, 17], [3, 17], [9, 17]]
        : [[3, 17], [6, 14], [3, 17], [7, 13]];

  return (
    <svg viewBox="0 0 20 20" aria-hidden="true">
      {rows.map(([x1, x2], index) => (
        <path key={index} d={`M${x1} ${5 + index * 3.3}H${x2}`} />
      ))}
    </svg>
  );
}

function DropdownChevron() {
  return (
    <svg
      className="number-preset-chevron"
      viewBox="0 0 16 16"
      aria-hidden="true"
    >
      <path d="m4 6 4 4 4-4" />
    </svg>
  );
}

export function StickerForgeStudio() {
  const initialSource = useMemo(
    () => makeTextSource(DEFAULT_TEXT, DEFAULT_INK, DEFAULT_RICH_TEXT),
    [],
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const richEditorRef = useRef<HTMLDivElement>(null);
  const selectionRef = useRef<Range | null>(null);
  const selectionOffsetsRef = useRef<{ start: number; end: number } | null>(null);
  const applyingEditorStyleRef = useRef(false);
  const controllerRef = useRef<StickerController | null>(null);
  const textTimerRef = useRef<number | null>(null);
  const sourceRevisionRef = useRef(0);
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
  const [sourceMessage, setSourceMessage] = useState("");
  const [copied, setCopied] = useState(false);
  const [isPanelOpen, setIsPanelOpen] = useState(true);
  const t = UI[locale];

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

      clearPendingText();
      const readRevision = ++sourceRevisionRef.current;
      setSourceMessage(`${file.name} · ${t.reading}`);
      try {
        const isSvg =
          file.type === "image/svg+xml" || file.name.toLowerCase().endsWith(".svg");
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
              reader.readAsDataURL(file);
            });
        if (readRevision !== sourceRevisionRef.current) return;
        setImageDataUrl(dataUrl);
        setImageName(file.name);
        setSourceMode("image");
        await applySource(
          { type: "image", src: dataUrl, name: file.name },
          `${file.name} · ${t.processed}`,
        );
      } catch {
        if (readRevision === sourceRevisionRef.current) {
          setSourceMessage(t.invalidImage);
        }
      }
    },
    [applySource, clearPendingText, t],
  );

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDraggingFile(false);
    void loadImageFile(event.dataTransfer.files[0]);
  };

  const switchSourceMode = (mode: SourceMode) => {
    setSourceMode(mode);
    if (mode === "text") {
      void applySource(makeTextSource(text, inkColor, richText ?? undefined));
    } else if (imageDataUrl) {
      void applySource({ type: "image", src: imageDataUrl, name: imageName });
    }
  };

  const resetStudio = () => {
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

  const buildEmbedSnippet = () => {
    const origin = window.location.origin;
    const imageSource =
      imageDataUrl === DEFAULT_IMAGE_SRC
        ? `${origin}${DEFAULT_IMAGE_SRC}`
        : imageDataUrl;
    const source: StickerSource =
      sourceMode === "image" && imageSource
        ? { type: "image", src: imageSource, name: imageName }
        : makeTextSource(text, inkColor, richText ?? undefined);

    return `<script type="module" src="${origin}/embed/sticker-forge.es.js"></script>

<sticker-forge id="my-sticker" style="display:block;width:640px;height:420px"></sticker-forge>

<script type="module">
  await customElements.whenDefined("sticker-forge");
  const sticker = document.querySelector("#my-sticker");
  await sticker.setSource(${stringifyForInlineScript(source, 2)});
  sticker.setOptions(${stringifyForInlineScript(settings, 2)});
</script>`;
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(buildEmbedSnippet());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setSourceMessage(t.copyBlocked);
    }
  };

  return (
    <main className="studio-shell" data-panel-open={isPanelOpen}>
      <header className="studio-header">
        <span className="brand-mark" role="img" aria-label="Sticker Forge" />
      </header>

      <section className="stage-card" aria-label={t.preview}>
        <div className="sticker-stage">
          <div
            ref={stageRef}
            className="sticker-host"
            data-testid="sticker-stage"
            role="group"
            aria-label={t.interactiveSticker}
          />
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
          {isPanelOpen ? "→" : "←"}
        </span>
      </button>

        <aside
          id="sticker-controls"
          className="controls-card"
          data-open={isPanelOpen}
          aria-label={t.controls}
          aria-hidden={!isPanelOpen}
        >
          <div className="controls-header">
            <div className="controls-heading-row">
              <h2 className="controls-title">{t.title}</h2>
              <div className="controls-heading-actions">
                <button
                  className="icon-button"
                  type="button"
                  onClick={resetStudio}
                  aria-label={t.reset}
                  title={t.reset}
                >
                  ↺
                </button>
                <a
                  className="icon-button"
                  href={GITHUB_URL}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={t.github}
                  title={t.github}
                >
                  <svg viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M12 2a10 10 0 0 0-3.16 19.49c.5.09.68-.22.68-.48v-1.88c-2.78.6-3.37-1.18-3.37-1.18-.45-1.16-1.11-1.47-1.11-1.47-.91-.62.07-.61.07-.61 1 .07 1.53 1.03 1.53 1.03.9 1.53 2.35 1.09 2.92.83.09-.65.35-1.09.64-1.34-2.22-.25-4.56-1.11-4.56-4.94 0-1.09.39-1.98 1.03-2.68-.1-.25-.45-1.27.1-2.64 0 0 .84-.27 2.75 1.02A9.6 9.6 0 0 1 12 6.52a9.6 9.6 0 0 1 2.5.34c1.91-1.29 2.75-1.02 2.75-1.02.55 1.37.2 2.39.1 2.64.64.7 1.03 1.59 1.03 2.68 0 3.84-2.34 4.68-4.57 4.93.36.31.68.92.68 1.86v3.06c0 .27.18.58.69.48A10 10 0 0 0 12 2Z" />
                  </svg>
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
            <div className="source-tabs" aria-label={t.sourceType}>
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
                        <strong>B</strong>
                      </button>
                      <button
                        type="button"
                        aria-label={t.underline}
                        title={t.underline}
                        onMouseDown={(event) => event.preventDefault()}
                        onClick={() => runEditorCommand("underline")}
                      >
                        <span className="underline-glyph">U</span>
                      </button>
                      <div className="toolbar-number-control" title={t.fontSize}>
                        <span className="sr-only">{t.fontSize}</span>
                        <span className="number-control-symbol" aria-hidden="true">A</span>
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
                        <span className="number-control-symbol" aria-hidden="true">↕</span>
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
                    <span className="upload-icon" aria-hidden="true">＋</span>
                    <strong>{imageName || t.uploadPrompt}</strong>
                    <span>{sourceMessage || t.localOnly}</span>
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/*"
                      onChange={(event) => void loadImageFile(event.target.files?.[0])}
                    />
                  </label>
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
            <button
              className="primary-button"
              type="button"
              data-copied={copied}
              onClick={copyEmbedCode}
            >
              {copied ? t.copied : t.copy}
            </button>
          </div>
        </aside>
      <span className="sr-only" aria-live="polite">
        {copied ? t.copiedAnnouncement : sourceMessage || t.localOnly}
      </span>
    </main>
  );
}
