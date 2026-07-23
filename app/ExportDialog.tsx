"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type KeyboardEvent as ReactKeyboardEvent,
  type PointerEvent as ReactPointerEvent,
  type RefObject,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBezierCurve,
  faCheck,
  faChevronDown,
  faCode,
  faCrosshairs,
  faDownload,
  faFilm,
  faImage,
  faMinus,
  faPlus,
  faRecordVinyl,
  faRotateRight,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";
import {
  STICKER_ENTRANCE_DURATION_MS,
  createSticker,
  type StickerInstance,
  type StickerOptions,
  type StickerPlaybackMotion,
  type StickerSource,
} from "@/lib/sticker-forge";
import {
  downloadBlob,
  type ExportFrame,
} from "@/lib/export-encoders";
import { renderStickerExportAudio } from "@/lib/export-audio";
import {
  startStickerExportWorker,
  type StickerExportWorkerTask,
} from "@/lib/export-worker-client";
import type { StickerExportFormat } from "@/lib/export-worker-types";

type ExportMode = "static" | "animated" | "embed";
type AnimationMethod = "manual" | "automatic";
type AutomaticPhase = "peel" | "exit" | "entrance";
type AutomaticPreviewPhase = AutomaticPhase | "interval";
type ManualState = "idle" | "armed" | "capturing" | "recorded";
type RecordingPhase = "idle" | "waiting" | "peeling" | "finishing";
type TransformState = { x: number; y: number; zoom: number };
type MotionAnchor = keyof StickerPlaybackMotion;
type AspectRatioPreset = "free" | "1:1" | "4:3" | "3:4" | "16:9" | "9:16";
type ExportScale = 0.25 | 0.5 | 0.75 | 1 | 1.25 | 1.5 | 2 | 3 | 4;
type ExportProgressStage =
  | "capturing"
  | "preparing"
  | "encoding"
  | "canceling";
type ExportProgressState = {
  progress: number;
  stage: ExportProgressStage;
};
type VisualMotion = {
  x: number;
  y: number;
  scale: number;
  rotation: number;
  opacity: number;
};

type ExportDialogProps = {
  source: StickerSource;
  options: StickerOptions;
  embedCode: string;
  locale: "zh" | "en";
  onClose: () => void;
};

const CAPTURE_FPS = 30;
const CAPTURE_FRAME_DURATION = 1000 / CAPTURE_FPS;
const GIF_FRAME_RATES = [10, 15, 20, 30] as const;
const APNG_FRAME_RATES = [10, 15, 20, 30, 60] as const;
const MOV_FRAME_RATES = [24, 30, 60] as const;
const DEFAULT_GIF_FRAME_RATE = 20;
const DEFAULT_APNG_FRAME_RATE = 30;
const DEFAULT_MOV_FRAME_RATE = 30;
const EXPORT_DIALOG_SIZE_STORAGE_KEY = "sticker-forge:export-dialog-size";
const EXPORT_DIALOG_MOBILE_BREAKPOINT = 620;
const EXPORT_DIALOG_MIN_WIDTH = 620;
const EXPORT_DIALOG_MIN_HEIGHT = 560;
const EXPORT_DIALOG_VIEWPORT_INSET = 64;
const FOUR_K_PIXEL_COUNT = 3840 * 2160;
const ASPECT_RATIO_PRESETS = [
  ["free", null],
  ["1:1", 1],
  ["4:3", 4 / 3],
  ["3:4", 3 / 4],
  ["16:9", 16 / 9],
  ["9:16", 9 / 16],
] as const satisfies readonly (readonly [AspectRatioPreset, number | null])[];
const EXPORT_SCALES = [
  0.25,
  0.5,
  0.75,
  1,
  1.25,
  1.5,
  2,
  3,
  4,
] as const satisfies readonly ExportScale[];
const MIN_SPEED = 0.25;
const MAX_SPEED = 4;
const SPEED_STEP = 0.05;
const MIN_PLAYBACK_INTERVAL = 0;
const MAX_PLAYBACK_INTERVAL = 5;
const PLAYBACK_INTERVAL_STEP = 0.05;
const MOTION_ANCHOR_INSET = 30;
const AUTO_PEEL_DURATION_MS = 1500;
const AUTO_EXIT_DURATION_MS = 460;
const EMPTY_MOTION: VisualMotion = {
  x: 0,
  y: 0,
  scale: 1,
  rotation: 0,
  opacity: 1,
};
const DEFAULT_PLAYBACK_MOTION: StickerPlaybackMotion = {
  origin: { x: 0, y: 0.5 },
  target: { x: 1, y: 0.5 },
};

const COPY = {
  zh: {
    title: "导出贴纸",
    subtitle: "透明背景 · 所见即所得",
    close: "关闭导出窗口",
    static: "静态",
    animated: "动态",
    embed: "嵌入代码",
    ratio: "比例",
    freeRatio: "自由",
    quality: "清晰度",
    highResolutionWarning: "分辨率过高，可能影响导出性能",
    moveHint: "滚轮缩放 · 拖拽空白处平移 · 交互模式按住 Shift 平移",
    zoomOut: "缩小",
    zoomIn: "放大",
    center: "居中贴纸",
    downloadPng: "导出 PNG",
    manual: "手动",
    automatic: "自动",
    record: "录制",
    waitingToPeel: "等待开始撕开",
    peelToEnd: "完整撕开结束",
    waitingForAnimation: "等待动画结束",
    recordingReady: "拖动贴纸边缘，完成一次完整撕开",
    recording: "录制中…请完整撕开贴纸",
    recorded: "录制完成，正在循环预览",
    incomplete: "还差一点点——请把贴纸完整撕开",
    rerecord: "重新录制",
    startAnchor: "开始锚点",
    endAnchor: "结束锚点",
    easing: "缓动",
    speed: "速度",
    playbackInterval: "播放间隔",
    custom: "自定义贝塞尔",
    editBezier: "调节贝塞尔曲线",
    bezierEditor: "贝塞尔曲线",
    closeBezier: "关闭曲线调节菜单",
    copy: "复制代码",
    copied: "已复制",
    exportGif: "导出 GIF",
    exportApng: "导出 APNG",
    exportMov: "导出 MOV",
    gifShadow: "GIF 阴影",
    gifShadowHint: "使用抖动模拟 GIF 不支持的半透明阴影",
    videoSound: "视频音效",
    videoSoundHint: "在 MOV 中加入撕开与重新入场音效",
    frameRate: "帧率",
    exporting: "正在合成透明帧…",
    capturingFrames: "正在采集动画帧…",
    preparingExport: "正在准备导出…",
    cancelExport: "取消",
    cancelingExport: "正在取消…",
    exportCanceled: "已取消导出",
    encodingGif: "正在编码 GIF…",
    encodingApng: "正在编码 APNG…",
    encodingMov: "正在编码 MOV…",
    exportDone: "导出完成",
    exportFailed: "导出失败，请缩小画布后重试",
    resize: "拖动这里调整导出画布",
  },
  en: {
    title: "Export sticker",
    subtitle: "Transparent background · what you see is what you export",
    close: "Close export dialog",
    static: "Still",
    animated: "Motion",
    embed: "Embed code",
    ratio: "Ratio",
    freeRatio: "Free",
    quality: "Quality",
    highResolutionWarning:
      "Very high resolutions may affect export performance",
    moveHint: "Wheel to zoom · drag empty space to pan · hold Shift in interactive modes",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    center: "Center sticker",
    downloadPng: "Export PNG",
    manual: "Manual",
    automatic: "Automatic",
    record: "Record",
    waitingToPeel: "Waiting for the peel to start",
    peelToEnd: "Peel all the way to finish",
    waitingForAnimation: "Waiting for the animation to finish",
    recordingReady: "Drag a sticker edge and complete one full peel",
    recording: "Recording… complete the peel",
    recorded: "Recording complete — looping preview",
    incomplete: "Almost — peel the sticker all the way off",
    rerecord: "Record again",
    startAnchor: "Start anchor",
    endAnchor: "End anchor",
    easing: "Easing",
    speed: "Speed",
    playbackInterval: "Playback interval",
    custom: "Custom cubic Bézier",
    editBezier: "Edit Bézier curve",
    bezierEditor: "Bézier curve",
    closeBezier: "Close curve editor",
    copy: "Copy code",
    copied: "Copied",
    exportGif: "Export GIF",
    exportApng: "Export APNG",
    exportMov: "Export MOV",
    gifShadow: "GIF shadow",
    gifShadowHint: "Dither the semi-transparent shadow that GIF cannot store",
    videoSound: "Video sound",
    videoSoundHint: "Include peel and re-entry sounds in MOV exports",
    frameRate: "Frame rate",
    exporting: "Compositing transparent frames…",
    capturingFrames: "Capturing animation frames…",
    preparingExport: "Preparing export…",
    cancelExport: "Cancel",
    cancelingExport: "Canceling…",
    exportCanceled: "Export canceled",
    encodingGif: "Encoding GIF…",
    encodingApng: "Encoding APNG…",
    encodingMov: "Encoding MOV…",
    exportDone: "Export complete",
    exportFailed: "Export failed. Try a smaller canvas.",
    resize: "Drag to resize the export canvas",
  },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function exportDialogBounds() {
  const maxWidth = Math.max(1, window.innerWidth - EXPORT_DIALOG_VIEWPORT_INSET);
  const maxHeight = Math.max(1, window.innerHeight - EXPORT_DIALOG_VIEWPORT_INSET);
  return {
    minWidth: Math.min(EXPORT_DIALOG_MIN_WIDTH, maxWidth),
    minHeight: Math.min(EXPORT_DIALOG_MIN_HEIGHT, maxHeight),
    maxWidth,
    maxHeight,
  };
}

function clampExportDialogSize(width: number, height: number) {
  const bounds = exportDialogBounds();
  return {
    width: clamp(width, bounds.minWidth, bounds.maxWidth),
    height: clamp(height, bounds.minHeight, bounds.maxHeight),
  };
}

function formatSpeed(value: number) {
  return `${Number(value.toFixed(2))}×`;
}

function formatPlaybackInterval(value: number) {
  return `${Number(value.toFixed(2))} s`;
}

function stickerDisplaySize(
  canvas: { width: number; height: number },
  aspect: number,
) {
  const maxWidth = Math.min(canvas.width * 0.78, 760);
  const maxHeight = Math.min(canvas.height * 0.58, 430);
  let width = maxWidth;
  let height = width / Math.max(aspect, 0.15);
  if (height > maxHeight) {
    height = maxHeight;
    width = height * aspect;
  }
  return { width, height };
}

function nextFrame() {
  return new Promise<void>((resolve) => requestAnimationFrame(() => resolve()));
}

function throwIfAborted(signal: AbortSignal) {
  if (signal.aborted) {
    throw new DOMException("Export canceled.", "AbortError");
  }
}

function isAbortError(error: unknown) {
  return error instanceof DOMException && error.name === "AbortError";
}

function cubicBezierAt(progress: number, points: [number, number, number, number]) {
  const [x1, y1, x2, y2] = points;
  const sample = (t: number, a1: number, a2: number) => {
    const inverse = 1 - t;
    return 3 * inverse * inverse * t * a1 + 3 * inverse * t * t * a2 + t * t * t;
  };
  let low = 0;
  let high = 1;
  let t = progress;
  for (let index = 0; index < 12; index += 1) {
    t = (low + high) / 2;
    if (sample(t, x1, x2) < progress) low = t;
    else high = t;
  }
  return sample(t, y1, y2);
}

function autoFrameAt(
  phase: AutomaticPhase,
  progress: number,
  easing: [number, number, number, number],
  motion: StickerPlaybackMotion,
  size: { width: number; height: number },
) {
  const normalized = clamp(progress, 0, 1);
  const directionX = motion.target.x - motion.origin.x;
  const directionY = motion.target.y - motion.origin.y;
  const length = Math.hypot(directionX, directionY) || 1;
  const unitX = directionX / length;
  const unitY = directionY / length;
  if (phase === "peel") {
    return {
      peel: cubicBezierAt(normalized, easing),
      entranceProgress: null,
      visual: EMPTY_MOTION,
    };
  }
  if (phase === "exit") {
    const easedExit = normalized * normalized;
    return {
      peel: 1,
      entranceProgress: null,
      visual: {
        x: unitX * size.width * 0.58 * easedExit,
        y: unitY * size.height * 0.58 * easedExit,
        scale: 1,
        rotation: unitX >= 0 ? -0.34 * easedExit : 0.34 * easedExit,
        opacity: 1 - normalized,
      },
    };
  }
  return {
    peel: 0,
    entranceProgress: normalized,
    visual: EMPTY_MOTION,
  };
}

function automaticDuration(speed: number) {
  return (
    AUTO_PEEL_DURATION_MS / speed +
    AUTO_EXIT_DURATION_MS +
    STICKER_ENTRANCE_DURATION_MS
  );
}

function automaticPhaseAt(elapsed: number, speed: number) {
  const peelDuration = AUTO_PEEL_DURATION_MS / speed;
  if (elapsed < peelDuration) {
    return {
      phase: "peel" as const,
      progress: elapsed / peelDuration,
    };
  }
  const afterPeel = elapsed - peelDuration;
  if (afterPeel < AUTO_EXIT_DURATION_MS) {
    return {
      phase: "exit" as const,
      progress: afterPeel / AUTO_EXIT_DURATION_MS,
    };
  }
  return {
    phase: "entrance" as const,
    progress: clamp(
      (afterPeel - AUTO_EXIT_DURATION_MS) /
        STICKER_ENTRANCE_DURATION_MS,
      0,
      1,
    ),
  };
}

function scaledExportSize(
  width: number,
  height: number,
  outputScale: ExportScale,
) {
  return {
    width: Math.max(2, Math.round((width * outputScale) / 2) * 2),
    height: Math.max(2, Math.round((height * outputScale) / 2) * 2),
  };
}

function drawCompositedFrame(
  destination: HTMLCanvasElement,
  source: CanvasImageSource,
  width: number,
  height: number,
  transform: TransformState,
  visual: VisualMotion = EMPTY_MOTION,
  outputScale: ExportScale = 1,
) {
  const { width: outputWidth, height: outputHeight } = scaledExportSize(
    width,
    height,
    outputScale,
  );
  if (destination.width !== outputWidth) destination.width = outputWidth;
  if (destination.height !== outputHeight) destination.height = outputHeight;
  const context = destination.getContext("2d", { willReadFrequently: true });
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.clearRect(0, 0, outputWidth, outputHeight);
  context.imageSmoothingEnabled = true;
  context.imageSmoothingQuality = "high";
  context.save();
  context.globalAlpha = visual.opacity;
  context.translate(
    outputWidth / 2 + (transform.x + visual.x) * outputScale,
    outputHeight / 2 + (transform.y + visual.y) * outputScale,
  );
  context.rotate(visual.rotation);
  context.scale(transform.zoom * visual.scale, transform.zoom * visual.scale);
  context.drawImage(
    source,
    -outputWidth / 2,
    -outputHeight / 2,
    outputWidth,
    outputHeight,
  );
  context.restore();
  return context;
}

function BezierCurveEditor({
  value,
  label,
  closeLabel,
  onChange,
  onClose,
}: {
  value: [number, number, number, number];
  label: string;
  closeLabel: string;
  onChange: (value: [number, number, number, number]) => void;
  onClose: () => void;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const dragPointRef = useRef<0 | 1 | null>(null);
  const [activePoint, setActivePoint] = useState<0 | 1>(0);

  const draw = useCallback(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    if (!rect.width || !rect.height) return;
    const ratio = Math.min(window.devicePixelRatio || 1, 2);
    const width = Math.round(rect.width);
    const height = Math.round(rect.height);
    if (canvas.width !== Math.round(width * ratio)) {
      canvas.width = Math.round(width * ratio);
    }
    if (canvas.height !== Math.round(height * ratio)) {
      canvas.height = Math.round(height * ratio);
    }
    const context = canvas.getContext("2d");
    if (!context) return;
    context.setTransform(ratio, 0, 0, ratio, 0, 0);
    context.clearRect(0, 0, width, height);

    const padding = 18;
    const left = padding;
    const top = padding;
    const right = width - padding;
    const bottom = height - padding;
    const plotWidth = right - left;
    const plotHeight = bottom - top;
    const point = (x: number, y: number) => ({
      x: left + x * plotWidth,
      y: bottom - y * plotHeight,
    });
    const start = point(0, 0);
    const end = point(1, 1);
    const controlOne = point(value[0], value[1]);
    const controlTwo = point(value[2], value[3]);

    context.strokeStyle = "rgba(57, 58, 65, 0.1)";
    context.lineWidth = 1;
    for (let index = 0; index <= 4; index += 1) {
      const x = left + (plotWidth * index) / 4;
      const y = top + (plotHeight * index) / 4;
      context.beginPath();
      context.moveTo(x, top);
      context.lineTo(x, bottom);
      context.stroke();
      context.beginPath();
      context.moveTo(left, y);
      context.lineTo(right, y);
      context.stroke();
    }

    context.strokeStyle = "rgba(92, 93, 102, 0.42)";
    context.setLineDash([4, 4]);
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.lineTo(controlOne.x, controlOne.y);
    context.moveTo(end.x, end.y);
    context.lineTo(controlTwo.x, controlTwo.y);
    context.stroke();
    context.setLineDash([]);

    context.strokeStyle = "rgb(36, 126, 245)";
    context.lineWidth = 3;
    context.lineCap = "round";
    context.beginPath();
    context.moveTo(start.x, start.y);
    context.bezierCurveTo(
      controlOne.x,
      controlOne.y,
      controlTwo.x,
      controlTwo.y,
      end.x,
      end.y,
    );
    context.stroke();

    for (const fixedPoint of [start, end]) {
      context.fillStyle = "#fff";
      context.strokeStyle = "rgba(38, 39, 46, 0.5)";
      context.lineWidth = 2;
      context.beginPath();
      context.arc(fixedPoint.x, fixedPoint.y, 4, 0, Math.PI * 2);
      context.fill();
      context.stroke();
    }

    [controlOne, controlTwo].forEach((control, index) => {
      context.fillStyle = index === 0 ? "rgb(36, 126, 245)" : "#292930";
      context.strokeStyle = "#fff";
      context.lineWidth = 3;
      context.beginPath();
      context.arc(control.x, control.y, activePoint === index ? 8 : 7, 0, Math.PI * 2);
      context.fill();
      context.stroke();
      if (activePoint === index) {
        context.strokeStyle = "rgba(36, 126, 245, 0.28)";
        context.lineWidth = 3;
        context.beginPath();
        context.arc(control.x, control.y, 11, 0, Math.PI * 2);
        context.stroke();
      }
    });
  }, [activePoint, value]);

  useEffect(() => {
    draw();
    const canvas = canvasRef.current;
    if (!canvas || typeof ResizeObserver === "undefined") return;
    const observer = new ResizeObserver(draw);
    observer.observe(canvas);
    return () => observer.disconnect();
  }, [draw]);

  const updatePoint = useCallback(
    (index: 0 | 1, clientX: number, clientY: number) => {
      const canvas = canvasRef.current;
      if (!canvas) return;
      const rect = canvas.getBoundingClientRect();
      const padding = 18;
      const x = clamp(
        (clientX - rect.left - padding) / Math.max(rect.width - padding * 2, 1),
        0,
        1,
      );
      const y = clamp(
        1 -
          (clientY - rect.top - padding) /
            Math.max(rect.height - padding * 2, 1),
        0,
        1,
      );
      const next = [...value] as [number, number, number, number];
      next[index * 2] = Number(x.toFixed(3));
      next[index * 2 + 1] = Number(y.toFixed(3));
      onChange(next);
    },
    [onChange, value],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const padding = 18;
    const toPixels = (index: 0 | 1) => ({
      x: rect.left + padding + value[index * 2] * (rect.width - padding * 2),
      y:
        rect.top +
        padding +
        (1 - value[index * 2 + 1]) * (rect.height - padding * 2),
    });
    const pointOne = toPixels(0);
    const pointTwo = toPixels(1);
    const distanceOne = Math.hypot(
      event.clientX - pointOne.x,
      event.clientY - pointOne.y,
    );
    const distanceTwo = Math.hypot(
      event.clientX - pointTwo.x,
      event.clientY - pointTwo.y,
    );
    const index: 0 | 1 = distanceOne <= distanceTwo ? 0 : 1;
    setActivePoint(index);
    dragPointRef.current = index;
    event.currentTarget.setPointerCapture(event.pointerId);
    updatePoint(index, event.clientX, event.clientY);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    const index = dragPointRef.current;
    if (index === null) return;
    event.preventDefault();
    updatePoint(index, event.clientX, event.clientY);
  };

  const onPointerUp = (event: ReactPointerEvent<HTMLCanvasElement>) => {
    if (dragPointRef.current === null) return;
    dragPointRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onKeyDown = (event: ReactKeyboardEvent<HTMLCanvasElement>) => {
    const step = event.shiftKey ? 0.1 : 0.02;
    const delta =
      event.key === "ArrowLeft"
        ? { x: -step, y: 0 }
        : event.key === "ArrowRight"
          ? { x: step, y: 0 }
          : event.key === "ArrowUp"
            ? { x: 0, y: step }
            : event.key === "ArrowDown"
              ? { x: 0, y: -step }
              : null;
    if (!delta) return;
    event.preventDefault();
    const next = [...value] as [number, number, number, number];
    next[activePoint * 2] = clamp(next[activePoint * 2] + delta.x, 0, 1);
    next[activePoint * 2 + 1] = clamp(
      next[activePoint * 2 + 1] + delta.y,
      0,
      1,
    );
    onChange(next);
  };

  return (
    <div className="export-bezier-popover" role="dialog" aria-label={label}>
      <header>
        <strong>{label}</strong>
        <button type="button" aria-label={closeLabel} onClick={onClose}>
          <FontAwesomeIcon icon={faXmark} />
        </button>
      </header>
      <canvas
        ref={canvasRef}
        tabIndex={0}
        aria-label={label}
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerCancel={onPointerUp}
        onKeyDown={onKeyDown}
      />
      <div className="export-bezier-points">
        {([0, 1] as const).map((index) => (
          <button
            key={index}
            type="button"
            data-active={activePoint === index}
            onClick={() => setActivePoint(index)}
          >
            P{index + 1}
            <span>
              {value[index * 2].toFixed(2)}, {value[index * 2 + 1].toFixed(2)}
            </span>
          </button>
        ))}
      </div>
    </div>
  );
}

function PlaybackIntervalControl({
  label,
  labelInside = false,
  value,
  open,
  disabled,
  controlRef,
  onToggle,
  onChange,
}: {
  label: string;
  labelInside?: boolean;
  value: number;
  open: boolean;
  disabled: boolean;
  controlRef: RefObject<HTMLDivElement | null>;
  onToggle: () => void;
  onChange: (value: number) => void;
}) {
  const fill =
    ((value - MIN_PLAYBACK_INTERVAL) /
      (MAX_PLAYBACK_INTERVAL - MIN_PLAYBACK_INTERVAL)) *
    100;
  return (
    <div
      ref={controlRef}
      className="export-speed-control export-interval-control"
      data-label-inside={labelInside}
    >
      {!labelInside ? <span className="export-control-label">{label}</span> : null}
      <button
        className="export-speed-trigger export-interval-trigger"
        type="button"
        aria-label={`${label}: ${formatPlaybackInterval(value)}`}
        aria-expanded={open}
        data-active={open}
        disabled={disabled}
        onClick={onToggle}
      >
        {labelInside ? (
          <>
            <span className="export-interval-inline-label">{label}</span>
            <span className="export-interval-value">{formatPlaybackInterval(value)}</span>
          </>
        ) : (
          formatPlaybackInterval(value)
        )}
      </button>
      {open ? (
        <div
          className="export-speed-popover export-interval-popover"
          role="dialog"
          aria-label={label}
        >
          <header>
            <strong>{label}</strong>
            <output>{formatPlaybackInterval(value)}</output>
          </header>
          <input
            type="range"
            min={MIN_PLAYBACK_INTERVAL}
            max={MAX_PLAYBACK_INTERVAL}
            step={PLAYBACK_INTERVAL_STEP}
            value={value}
            aria-label={label}
            style={{
              background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${fill}%, rgba(44, 45, 52, 0.13) ${fill}%, rgba(44, 45, 52, 0.13) 100%)`,
            }}
            onChange={(event) => onChange(Number(event.target.value))}
          />
          <div className="export-speed-range">
            <span>{formatPlaybackInterval(MIN_PLAYBACK_INTERVAL)}</span>
            <span>{formatPlaybackInterval(MAX_PLAYBACK_INTERVAL)}</span>
          </div>
        </div>
      ) : null}
    </div>
  );
}

export function ExportDialog({
  source,
  options,
  embedCode,
  locale,
  onClose,
}: ExportDialogProps) {
  const t = COPY[locale];
  const dialogRef = useRef<HTMLDivElement>(null);
  const closeRef = useRef<HTMLButtonElement>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const stickerHostRef = useRef<HTMLDivElement>(null);
  const exportStickerHostRef = useRef<HTMLDivElement>(null);
  const layerRef = useRef<HTMLDivElement>(null);
  const playbackRef = useRef<HTMLCanvasElement>(null);
  const bezierControlRef = useRef<HTMLDivElement>(null);
  const speedControlRef = useRef<HTMLDivElement>(null);
  const intervalControlRef = useRef<HTMLDivElement>(null);
  const exportActionsRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<StickerInstance | null>(null);
  const exportAbortRef = useRef<AbortController | null>(null);
  const exportWorkerTaskRef = useRef<StickerExportWorkerTask | null>(null);
  const composeCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const recordingCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const recordingFrameRef = useRef(0);
  const manualStateRef = useRef<ManualState>("idle");
  const recordedFramesRef = useRef<ExportFrame[]>([]);
  const reachedDetachRef = useRef(false);
  const transformRef = useRef<TransformState>({ x: 0, y: 0, zoom: 1 });
  const motionRef = useRef<StickerPlaybackMotion>(DEFAULT_PLAYBACK_MOTION);
  const easingRef = useRef<[number, number, number, number]>([
    0.25, 0.1, 0.25, 1,
  ]);
  const speedRef = useRef(1);
  const playbackIntervalRef = useRef(0);
  const previousFocusRef = useRef<HTMLElement | null>(null);
  const preferredDialogSizeRef = useRef<{
    width: number;
    height: number;
  } | null>(null);
  const panRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    originX: number;
    originY: number;
  } | null>(null);
  const anchorDragRef = useRef<{
    pointerId: number;
    anchor: MotionAnchor;
  } | null>(null);
  const dialogResizeRef = useRef<{
    pointerId: number;
    startX: number;
    startY: number;
    width: number;
    height: number;
    maxWidth: number;
    maxHeight: number;
  } | null>(null);

  const [mode, setMode] = useState<ExportMode>("static");
  const [animationMethod, setAnimationMethod] =
    useState<AnimationMethod>("manual");
  const [manualState, setManualState] = useState<ManualState>("idle");
  const [recordingPhase, setRecordingPhase] =
    useState<RecordingPhase>("idle");
  const [recordedFrames, setRecordedFrames] = useState<ExportFrame[]>([]);
  const [size, setSize] = useState({ width: 720, height: 480 });
  const [aspectRatioPreset, setAspectRatioPreset] =
    useState<AspectRatioPreset>("free");
  const [exportScale, setExportScale] = useState<ExportScale>(1);
  const [transform, setTransform] = useState<TransformState>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [visualMotion, setVisualMotion] =
    useState<VisualMotion>(EMPTY_MOTION);
  const [snapping, setSnapping] = useState({ x: false, y: false });
  const [motion, setMotion] = useState<StickerPlaybackMotion>(
    DEFAULT_PLAYBACK_MOTION,
  );
  const [stickerAspect, setStickerAspect] = useState(2);
  const [easingPreset, setEasingPreset] = useState("ease");
  const [bezier, setBezier] = useState<[number, number, number, number]>([
    0.25, 0.1, 0.25, 1,
  ]);
  const [speed, setSpeed] = useState(1);
  const [playbackInterval, setPlaybackInterval] = useState(0);
  const [bezierOpen, setBezierOpen] = useState(false);
  const [speedOpen, setSpeedOpen] = useState(false);
  const [intervalOpen, setIntervalOpen] = useState(false);
  const [gifShadow, setGifShadow] = useState(true);
  const [videoSound, setVideoSound] = useState(true);
  const [gifFrameRate, setGifFrameRate] = useState(DEFAULT_GIF_FRAME_RATE);
  const [apngFrameRate, setApngFrameRate] = useState(DEFAULT_APNG_FRAME_RATE);
  const [movFrameRate, setMovFrameRate] = useState(DEFAULT_MOV_FRAME_RATE);
  const [exportMenuOpen, setExportMenuOpen] = useState<
    "gif" | "apng" | "mov" | null
  >(null);
  const [busy, setBusy] = useState<
    "gif" | "apng" | "mov" | "png" | null
  >(null);
  const [status, setStatus] = useState("");
  const [copied, setCopied] = useState(false);
  const [exportProgress, setExportProgress] = useState<ExportProgressState>({
    progress: 0,
    stage: "preparing",
  });

  const easing = useMemo<[number, number, number, number]>(() => {
    if (easingPreset === "linear") return [0, 0, 1, 1];
    if (easingPreset === "ease-in") return [0.42, 0, 1, 1];
    if (easingPreset === "ease-out") return [0, 0, 0.58, 1];
    if (easingPreset === "ease-in-out") return [0.42, 0, 0.58, 1];
    if (easingPreset === "custom") return bezier;
    return [0.25, 0.1, 0.25, 1];
  }, [bezier, easingPreset]);

  const aspectRatio = useMemo(
    () =>
      ASPECT_RATIO_PRESETS.find(([preset]) => preset === aspectRatioPreset)?.[1] ??
      null,
    [aspectRatioPreset],
  );
  const outputSize = useMemo(
    () => scaledExportSize(size.width, size.height, exportScale),
    [exportScale, size.height, size.width],
  );
  const outputExceeds4k =
    outputSize.width * outputSize.height > FOUR_K_PIXEL_COUNT;

  const updateExportProgress = useCallback(
    (progress: number, stage: ExportProgressStage) => {
      const normalized = clamp(progress, 0, 1);
      setExportProgress((current) => ({
        progress: Math.max(current.progress, normalized),
        stage,
      }));
    },
    [],
  );

  const beginExport = (format: NonNullable<typeof busy>) => {
    const abortController = new AbortController();
    exportAbortRef.current = abortController;
    panRef.current = null;
    setSnapping({ x: false, y: false });
    setBezierOpen(false);
    setSpeedOpen(false);
    setIntervalOpen(false);
    setExportMenuOpen(null);
    setBusy(format);
    setExportProgress({
      progress: 0.01,
      stage: format === "png" ? "preparing" : "capturing",
    });
    return abortController.signal;
  };

  const runExportWorker = useCallback(
    async ({
      audio,
      format,
      frameRate,
      frames,
      signal,
    }: {
      audio?: Awaited<ReturnType<typeof renderStickerExportAudio>>;
      format: StickerExportFormat;
      frameRate: number;
      frames: ExportFrame[];
      signal: AbortSignal;
    }) => {
      throwIfAborted(signal);
      const task = startStickerExportWorker(
        {
          audio,
          format,
          frameRate,
          frames,
          gifShadow,
          id: crypto.randomUUID(),
          outputScale: exportScale,
          playbackInterval,
        },
        (message) => {
          const stage: ExportProgressStage =
            message.stage === "encoding" ? "encoding" : "preparing";
          updateExportProgress(0.36 + message.progress * 0.63, stage);
        },
      );
      exportWorkerTaskRef.current = task;
      const onAbort = () => task.cancel();
      signal.addEventListener("abort", onAbort, { once: true });
      try {
        return await task.promise;
      } finally {
        signal.removeEventListener("abort", onAbort);
        if (exportWorkerTaskRef.current === task) {
          exportWorkerTaskRef.current = null;
        }
      }
    },
    [exportScale, gifShadow, playbackInterval, updateExportProgress],
  );

  const cancelExport = useCallback(() => {
    if (!exportAbortRef.current) return;
    setExportProgress((current) => ({
      ...current,
      stage: "canceling",
    }));
    exportAbortRef.current.abort();
    exportWorkerTaskRef.current?.cancel();
  }, []);

  const setTransformSynced = useCallback((next: TransformState) => {
    transformRef.current = next;
    setTransform(next);
  }, []);

  const setMotionSynced = useCallback((next: StickerPlaybackMotion) => {
    motionRef.current = next;
    setMotion(next);
  }, []);

  const setManualStateSynced = useCallback((next: ManualState) => {
    manualStateRef.current = next;
    setManualState(next);
  }, []);

  const setRecordedFramesSynced = useCallback((next: ExportFrame[]) => {
    recordedFramesRef.current = next;
    setRecordedFrames(next);
  }, []);

  useEffect(() => {
    easingRef.current = easing;
  }, [easing]);

  useEffect(() => {
    speedRef.current = speed;
  }, [speed]);

  useEffect(() => {
    playbackIntervalRef.current = playbackInterval;
  }, [playbackInterval]);

  useEffect(
    () => () => {
      exportAbortRef.current?.abort();
      exportWorkerTaskRef.current?.cancel();
    },
    [],
  );

  useEffect(() => {
    previousFocusRef.current = document.activeElement as HTMLElement | null;
    closeRef.current?.focus();
    return () => previousFocusRef.current?.focus({ preventScroll: true });
  }, []);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    try {
      const stored = window.localStorage.getItem(
        EXPORT_DIALOG_SIZE_STORAGE_KEY,
      );
      if (stored) {
        const parsed = JSON.parse(stored) as {
          width?: unknown;
          height?: unknown;
        };
        if (
          typeof parsed.width === "number" &&
          Number.isFinite(parsed.width) &&
          typeof parsed.height === "number" &&
          Number.isFinite(parsed.height)
        ) {
          preferredDialogSizeRef.current = {
            width: parsed.width,
            height: parsed.height,
          };
        }
      }
    } catch {
      // Ignore unavailable storage and malformed values.
    }
    const applyPreferredSize = () => {
      if (window.innerWidth <= EXPORT_DIALOG_MOBILE_BREAKPOINT) {
        dialog.style.removeProperty("width");
        dialog.style.removeProperty("height");
        return;
      }
      const preferred = preferredDialogSizeRef.current;
      if (!preferred) return;
      const next = clampExportDialogSize(preferred.width, preferred.height);
      dialog.style.width = `${next.width}px`;
      dialog.style.height = `${next.height}px`;
    };
    applyPreferredSize();
    window.addEventListener("resize", applyPreferredSize);
    return () => window.removeEventListener("resize", applyPreferredSize);
  }, []);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      if (bezierOpen || speedOpen || intervalOpen || exportMenuOpen) {
        setBezierOpen(false);
        setSpeedOpen(false);
        setIntervalOpen(false);
        setExportMenuOpen(null);
        return;
      }
      if (!busy) onClose();
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [
    bezierOpen,
    busy,
    exportMenuOpen,
    intervalOpen,
    onClose,
    speedOpen,
  ]);

  useEffect(() => {
    if (!bezierOpen && !speedOpen && !intervalOpen && !exportMenuOpen) return;
    const onPointerDown = (event: PointerEvent) => {
      const target = event.target as Node;
      if (bezierOpen && !bezierControlRef.current?.contains(target)) {
        setBezierOpen(false);
      }
      if (speedOpen && !speedControlRef.current?.contains(target)) {
        setSpeedOpen(false);
      }
      if (intervalOpen && !intervalControlRef.current?.contains(target)) {
        setIntervalOpen(false);
      }
      if (exportMenuOpen && !exportActionsRef.current?.contains(target)) {
        setExportMenuOpen(null);
      }
    };
    document.addEventListener("pointerdown", onPointerDown, true);
    return () => document.removeEventListener("pointerdown", onPointerDown, true);
  }, [bezierOpen, exportMenuOpen, intervalOpen, speedOpen]);

  useEffect(() => {
    if (mode === "embed") return;
    const preview = previewRef.current;
    if (!preview) return;
    let previous = size;
    const updateSize = () => {
      const rect = preview.getBoundingClientRect();
      const next = {
        width: Math.max(
          aspectRatio === null ? 240 : 2,
          Math.round(rect.width / 2) * 2,
        ),
        height: Math.max(
          aspectRatio === null ? 180 : 2,
          Math.round(rect.height / 2) * 2,
        ),
      };
      if (next.width === previous.width && next.height === previous.height) return;
      previous = next;
      setSize(next);
      controllerRef.current?.resize();
      if (recordedFramesRef.current.length) {
        setRecordedFramesSynced([]);
        setManualStateSynced("idle");
        setRecordingPhase("idle");
        setStatus("");
      }
    };
    updateSize();
    const observer = new ResizeObserver(updateSize);
    observer.observe(preview);
    return () => observer.disconnect();
    // The observer owns subsequent size updates.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [aspectRatio, mode, setManualStateSynced, setRecordedFramesSynced]);

  useEffect(() => {
    if (mode === "embed") return;
    const host = stickerHostRef.current;
    if (!host) return;
    let disposed = false;
    let controller: StickerInstance | null = null;
    const onReady = (event: Event) => {
      const detail = (event as CustomEvent<{ width?: number; height?: number }>)
        .detail;
      if (detail.width && detail.height) {
        setStickerAspect(detail.width / detail.height);
      }
    };
    host.addEventListener("ready", onReady);
    const initialize = async () => {
      const release =
        mode === "static" || animationMethod === "automatic" ? "stay" : "snap";
      const previewSoundEnabled =
        (mode === "static" ||
          (mode === "animated" && animationMethod === "manual")) &&
        (options.sound?.enabled ?? true);
      controller = await createSticker(host, {
        ...options,
        source,
        peel: { ...options.peel, release },
        sound: { ...options.sound, enabled: previewSoundEnabled },
      });
      if (disposed) {
        controller.destroy();
        return;
      }
      controllerRef.current = controller;
      controller.setRenderScale(Math.max(1, transformRef.current.zoom));
      if (mode === "animated" && animationMethod === "automatic") {
        controller.setPeelProgress(0, motionRef.current);
      }
    };
    void initialize().catch(() => setStatus(t.exportFailed));
    return () => {
      disposed = true;
      controller?.destroy();
      if (controllerRef.current === controller) controllerRef.current = null;
      host.removeEventListener("ready", onReady);
      host.replaceChildren();
    };
  }, [animationMethod, mode, options, source, t.exportFailed]);

  useEffect(() => {
    controllerRef.current?.setRenderScale(Math.max(1, transform.zoom));
  }, [transform.zoom]);

  useEffect(() => {
    if (mode !== "animated" || animationMethod !== "automatic") {
      return;
    }
    let frame = 0;
    let previousTime = performance.now();
    let phase: AutomaticPreviewPhase = "peel";
    let phaseElapsed = 0;
    const phaseDuration = () =>
      phase === "peel"
        ? AUTO_PEEL_DURATION_MS
        : phase === "exit"
          ? AUTO_EXIT_DURATION_MS
          : phase === "entrance"
            ? STICKER_ENTRANCE_DURATION_MS
            : playbackIntervalRef.current * 1000;
    const nextPhase = () => {
      phase =
        phase === "peel"
          ? "exit"
          : phase === "exit"
            ? "entrance"
            : phase === "entrance"
              ? "interval"
              : "peel";
      phaseElapsed = 0;
    };
    const advanceTimeline = (delta: number) => {
      let remaining = delta;
      while (remaining > 0) {
        const duration = phaseDuration();
        if (duration <= 0 || phaseElapsed >= duration) {
          nextPhase();
          continue;
        }
        const rate = phase === "peel" ? speedRef.current : 1;
        const timeToBoundary =
          (duration - phaseElapsed) / Math.max(rate, 0.001);
        if (remaining < timeToBoundary) {
          phaseElapsed += remaining * rate;
          break;
        }
        remaining -= timeToBoundary;
        nextPhase();
      }
    };
    const render = (time: number) => {
      advanceTimeline(Math.min(Math.max(time - previousTime, 0), 100));
      previousTime = time;
      const currentMotion = motionRef.current;
      if (phase === "interval") {
        controllerRef.current?.setPeelProgress(0, currentMotion);
        setVisualMotion(EMPTY_MOTION);
        frame = requestAnimationFrame(render);
        return;
      }
      const state = autoFrameAt(
        phase,
        phaseElapsed / phaseDuration(),
        easingRef.current,
        currentMotion,
        size,
      );
      if (state.entranceProgress === null) {
        controllerRef.current?.setPeelProgress(state.peel, currentMotion);
      } else {
        controllerRef.current?.setEntranceProgress(state.entranceProgress);
      }
      setVisualMotion(state.visual);
      frame = requestAnimationFrame(render);
    };
    frame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(frame);
  }, [animationMethod, mode, size]);

  const getSourceCanvas = useCallback(() => {
    const canvas = stickerHostRef.current?.querySelector("canvas");
    if (!canvas) throw new Error("The sticker preview is not ready.");
    return canvas;
  }, []);

  const captureRecordingFrame = useCallback(() => {
    const canvas = recordingCanvasRef.current ?? document.createElement("canvas");
    recordingCanvasRef.current = canvas;
    const context = drawCompositedFrame(
      canvas,
      getSourceCanvas(),
      size.width,
      size.height,
      transformRef.current,
    );
    return {
      rgba: new Uint8ClampedArray(
        context.getImageData(0, 0, size.width, size.height).data,
      ),
      width: size.width,
      height: size.height,
      durationMs: CAPTURE_FRAME_DURATION,
    } satisfies ExportFrame;
  }, [getSourceCanvas, size]);

  const stopRecording = useCallback(
    (complete: boolean) => {
      cancelAnimationFrame(recordingFrameRef.current);
      recordingFrameRef.current = 0;
      setRecordingPhase("idle");
      if (complete && recordedFramesRef.current.length > 1) {
        setRecordedFramesSynced([...recordedFramesRef.current]);
        setManualStateSynced("recorded");
        setStatus(t.recorded);
      } else {
        recordedFramesRef.current = [];
        setRecordedFramesSynced([]);
        setManualStateSynced("idle");
        setStatus(t.incomplete);
      }
    },
    [setManualStateSynced, setRecordedFramesSynced, t.incomplete, t.recorded],
  );

  useEffect(() => {
    if (mode !== "animated" || animationMethod !== "manual") return;
    const host = stickerHostRef.current;
    if (!host) return;
    let lastCapture = 0;
    const captureLoop = (time: number) => {
      if (manualStateRef.current !== "capturing") return;
      if (!lastCapture || time - lastCapture >= CAPTURE_FRAME_DURATION - 2) {
        lastCapture = time;
        try {
          recordedFramesRef.current.push(captureRecordingFrame());
        } catch {
          stopRecording(false);
          return;
        }
      }
      if (recordedFramesRef.current.length >= 240) {
        stopRecording(reachedDetachRef.current);
        return;
      }
      recordingFrameRef.current = requestAnimationFrame(captureLoop);
    };
    const onPeelStart = () => {
      if (
        manualStateRef.current !== "idle" &&
        manualStateRef.current !== "armed"
      ) {
        return;
      }
      recordedFramesRef.current = [];
      reachedDetachRef.current = false;
      try {
        recordedFramesRef.current.push(captureRecordingFrame());
      } catch {
        stopRecording(false);
        return;
      }
      setManualStateSynced("capturing");
      setRecordingPhase("peeling");
      setStatus(t.recording);
      lastCapture = 0;
      recordingFrameRef.current = requestAnimationFrame(captureLoop);
    };
    const onPeelChange = (event: Event) => {
      const detail = (event as CustomEvent<{ progress?: number }>).detail;
      if ((detail.progress ?? 0) >= 0.995 && !reachedDetachRef.current) {
        reachedDetachRef.current = true;
        setRecordingPhase("finishing");
      }
    };
    const onPeelEnd = (event: Event) => {
      const detail = (event as CustomEvent<{ willReset?: boolean }>).detail;
      if (
        manualStateRef.current === "capturing" &&
        detail.willReset &&
        !reachedDetachRef.current
      ) {
        window.setTimeout(() => stopRecording(false), 420);
      }
    };
    const onCycleComplete = () => {
      if (manualStateRef.current === "capturing" && reachedDetachRef.current) {
        try {
          recordedFramesRef.current.push(captureRecordingFrame());
        } catch {
          // The frames already captured remain usable.
        }
        stopRecording(true);
      }
    };
    host.addEventListener("peelstart", onPeelStart);
    host.addEventListener("peelchange", onPeelChange);
    host.addEventListener("peelend", onPeelEnd);
    host.addEventListener("cyclecomplete", onCycleComplete);
    return () => {
      cancelAnimationFrame(recordingFrameRef.current);
      host.removeEventListener("peelstart", onPeelStart);
      host.removeEventListener("peelchange", onPeelChange);
      host.removeEventListener("peelend", onPeelEnd);
      host.removeEventListener("cyclecomplete", onCycleComplete);
    };
  }, [
    animationMethod,
    captureRecordingFrame,
    mode,
    setManualStateSynced,
    stopRecording,
    t.recording,
  ]);

  useEffect(() => {
    if (
      mode !== "animated" ||
      animationMethod !== "manual" ||
      manualState !== "recorded" ||
      !recordedFrames.length
    ) return;
    const playback = playbackRef.current;
    if (!playback) return;
    let animationFrame = 0;
    const startedAt = performance.now();
    const animationDuration = recordedFrames.reduce(
      (total, frame) => total + frame.durationMs,
      0,
    );
    const totalDuration =
      animationDuration + playbackInterval * 1000;
    const render = (time: number) => {
      let cursor = (time - startedAt) % Math.max(totalDuration, 1);
      let frame = recordedFrames[recordedFrames.length - 1];
      if (cursor < animationDuration) {
        frame = recordedFrames[0];
        for (const candidate of recordedFrames) {
          if (cursor <= candidate.durationMs) {
            frame = candidate;
            break;
          }
          cursor -= candidate.durationMs;
        }
      }
      if (playback.width !== frame.width) playback.width = frame.width;
      if (playback.height !== frame.height) playback.height = frame.height;
      playback.getContext("2d")?.putImageData(
        new ImageData(new Uint8ClampedArray(frame.rgba), frame.width, frame.height),
        0,
        0,
      );
      animationFrame = requestAnimationFrame(render);
    };
    animationFrame = requestAnimationFrame(render);
    return () => cancelAnimationFrame(animationFrame);
  }, [
    animationMethod,
    manualState,
    mode,
    playbackInterval,
    recordedFrames,
  ]);

  const beginRecording = () => {
    setRecordedFramesSynced([]);
    recordedFramesRef.current = [];
    reachedDetachRef.current = false;
    controllerRef.current?.reset();
    setManualStateSynced("armed");
    setRecordingPhase("waiting");
    setStatus(t.recordingReady);
  };

  const previewLocked =
    Boolean(busy) ||
    (mode === "animated" &&
      animationMethod === "manual" &&
      manualState === "recorded");

  const canPanDirectly =
    mode === "animated" &&
    animationMethod === "automatic";

  const onPreviewPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (previewLocked) return;
    if ((event.target as Element).closest("button")) return;
    const shouldPan = canPanDirectly || event.shiftKey || event.button === 1;
    if (!shouldPan) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    panRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      originX: transformRef.current.x,
      originY: transformRef.current.y,
    };
  };

  const onPreviewPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    let x = pan.originX + event.clientX - pan.startX;
    let y = pan.originY + event.clientY - pan.startY;
    const snapX = Math.abs(x) <= 8;
    const snapY = Math.abs(y) <= 8;
    if (snapX) x = 0;
    if (snapY) y = 0;
    setSnapping({ x: snapX, y: snapY });
    setTransformSynced({ ...transformRef.current, x, y });
  };

  const onPreviewPointerUp = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (panRef.current?.pointerId !== event.pointerId) return;
    panRef.current = null;
    setSnapping({ x: false, y: false });
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const changeZoom = (nextZoom: number) => {
    if (previewLocked) return;
    setTransformSynced({
      ...transformRef.current,
      zoom: clamp(nextZoom, 0.35, 2.6),
    });
  };

  const onPreviewWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    if (previewLocked) return;
    changeZoom(transformRef.current.zoom * Math.exp(-event.deltaY * 0.0012));
  };

  const stickerFrame = useMemo(
    () => stickerDisplaySize(size, stickerAspect),
    [size, stickerAspect],
  );

  const anchorPositions = useMemo(() => {
    const angle = ((options.tilt ?? 0) * Math.PI) / 180;
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    const position = (point: StickerPlaybackMotion[MotionAnchor]) => {
      const localX =
        (point.x - 0.5) * stickerFrame.width * transform.zoom;
      const localY =
        (point.y - 0.5) * stickerFrame.height * transform.zoom;
      return {
        x:
          size.width / 2 +
          transform.x +
          localX * cosine -
          localY * sine,
        y:
          size.height / 2 +
          transform.y +
          localX * sine +
          localY * cosine,
      };
    };
    return {
      origin: position(motion.origin),
      target: position(motion.target),
    };
  }, [motion, options.tilt, size, stickerFrame, transform]);

  const updateMotionAnchor = useCallback(
    (anchor: MotionAnchor, clientX: number, clientY: number) => {
      const preview = previewRef.current;
      if (!preview) return;
      const rect = preview.getBoundingClientRect();
      if (!rect.width || !rect.height) return;
      const canvasX = clamp(
        ((clientX - rect.left) / rect.width) * size.width,
        MOTION_ANCHOR_INSET,
        size.width - MOTION_ANCHOR_INSET,
      );
      const canvasY = clamp(
        ((clientY - rect.top) / rect.height) * size.height,
        MOTION_ANCHOR_INSET,
        size.height - MOTION_ANCHOR_INSET,
      );
      const scaledX =
        (canvasX - size.width / 2 - transformRef.current.x) /
        Math.max(transformRef.current.zoom, 0.001);
      const scaledY =
        (canvasY - size.height / 2 - transformRef.current.y) /
        Math.max(transformRef.current.zoom, 0.001);
      const angle = ((options.tilt ?? 0) * Math.PI) / 180;
      const cosine = Math.cos(angle);
      const sine = Math.sin(angle);
      const localX = scaledX * cosine + scaledY * sine;
      const localY = -scaledX * sine + scaledY * cosine;
      const normalized = {
        x: localX / Math.max(stickerFrame.width, 1) + 0.5,
        y: localY / Math.max(stickerFrame.height, 1) + 0.5,
      };
      const point =
        anchor === "origin"
          ? {
              x: clamp(normalized.x, 0, 1),
              y: clamp(normalized.y, 0, 1),
            }
          : normalized;
      setMotionSynced({ ...motionRef.current, [anchor]: point });
    },
    [options.tilt, setMotionSynced, size, stickerFrame],
  );

  useEffect(() => {
    if (mode !== "animated" || animationMethod !== "automatic") return;
    const preview = previewRef.current;
    if (!preview) return;
    const target = anchorPositions.target;
    const canvasX = clamp(
      target.x,
      MOTION_ANCHOR_INSET,
      size.width - MOTION_ANCHOR_INSET,
    );
    const canvasY = clamp(
      target.y,
      MOTION_ANCHOR_INSET,
      size.height - MOTION_ANCHOR_INSET,
    );
    if (
      Math.abs(canvasX - target.x) < 0.5 &&
      Math.abs(canvasY - target.y) < 0.5
    ) {
      return;
    }
    const rect = preview.getBoundingClientRect();
    updateMotionAnchor(
      "target",
      rect.left + (canvasX / size.width) * rect.width,
      rect.top + (canvasY / size.height) * rect.height,
    );
  }, [
    anchorPositions.target,
    animationMethod,
    mode,
    size.height,
    size.width,
    updateMotionAnchor,
  ]);

  const onAnchorPointerDown = (
    anchor: MotionAnchor,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (busy) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    anchorDragRef.current = { pointerId: event.pointerId, anchor };
    updateMotionAnchor(anchor, event.clientX, event.clientY);
  };

  const onAnchorPointerMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const drag = anchorDragRef.current;
    if (!drag || drag.pointerId !== event.pointerId) return;
    event.preventDefault();
    event.stopPropagation();
    updateMotionAnchor(drag.anchor, event.clientX, event.clientY);
  };

  const onAnchorPointerUp = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (anchorDragRef.current?.pointerId !== event.pointerId) return;
    anchorDragRef.current = null;
    event.stopPropagation();
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const onAnchorKeyDown = (
    anchor: MotionAnchor,
    event: ReactKeyboardEvent<HTMLButtonElement>,
  ) => {
    const step = event.shiftKey ? 40 : 8;
    const delta =
      event.key === "ArrowLeft"
        ? { x: -step, y: 0 }
        : event.key === "ArrowRight"
          ? { x: step, y: 0 }
          : event.key === "ArrowUp"
            ? { x: 0, y: -step }
            : event.key === "ArrowDown"
              ? { x: 0, y: step }
              : null;
    if (!delta) return;
    event.preventDefault();
    const preview = previewRef.current;
    if (!preview) return;
    const rect = preview.getBoundingClientRect();
    const current = anchorPositions[anchor];
    const canvasX = clamp(
      current.x + delta.x,
      MOTION_ANCHOR_INSET,
      size.width - MOTION_ANCHOR_INSET,
    );
    const canvasY = clamp(
      current.y + delta.y,
      MOTION_ANCHOR_INSET,
      size.height - MOTION_ANCHOR_INSET,
    );
    updateMotionAnchor(
      anchor,
      rect.left + (canvasX / size.width) * rect.width,
      rect.top + (canvasY / size.height) * rect.height,
    );
  };

  const anchorPathStyle = useMemo<CSSProperties>(() => {
    const deltaX = anchorPositions.target.x - anchorPositions.origin.x;
    const deltaY = anchorPositions.target.y - anchorPositions.origin.y;
    return {
      left: anchorPositions.origin.x,
      top: anchorPositions.origin.y,
      width: Math.hypot(deltaX, deltaY),
      transform: `translateY(-50%) rotate(${Math.atan2(deltaY, deltaX)}rad)`,
    };
  }, [anchorPositions]);

  const layerStyle = {
    "--export-x": `${transform.x + visualMotion.x}px`,
    "--export-y": `${transform.y + visualMotion.y}px`,
    "--export-scale": transform.zoom * visualMotion.scale,
    "--export-rotation": `${visualMotion.rotation}rad`,
    opacity: visualMotion.opacity,
  } as CSSProperties;

  const composeCurrent = useCallback(
    (
      visual: VisualMotion = EMPTY_MOTION,
      outputScale: ExportScale = 1,
    ) => {
      const canvas = composeCanvasRef.current ?? document.createElement("canvas");
      composeCanvasRef.current = canvas;
      const context = drawCompositedFrame(
        canvas,
        getSourceCanvas(),
        size.width,
        size.height,
        transformRef.current,
        visual,
        outputScale,
      );
      return { canvas, context };
    },
    [getSourceCanvas, size],
  );

  const exportPng = async () => {
    if (exportAbortRef.current) return;
    const signal = beginExport("png");
    setStatus(t.exporting);
    try {
      await nextFrame();
      throwIfAborted(signal);
      const { context } = composeCurrent(EMPTY_MOTION);
      const frame: ExportFrame = {
        durationMs: 0,
        height: size.height,
        rgba: new Uint8ClampedArray(
          context.getImageData(0, 0, size.width, size.height).data,
        ),
        width: size.width,
      };
      updateExportProgress(0.34, "preparing");
      const blob = await runExportWorker({
        format: "png",
        frameRate: 1,
        frames: [frame],
        signal,
      });
      throwIfAborted(signal);
      downloadBlob(blob, "sticker-forge.png");
      updateExportProgress(1, "encoding");
      setStatus(t.exportDone);
    } catch (error) {
      if (isAbortError(error)) setStatus(t.exportCanceled);
      else {
        console.error("Sticker export failed.", error);
        setStatus(t.exportFailed);
      }
    } finally {
      exportAbortRef.current = null;
      exportWorkerTaskRef.current = null;
      setBusy(null);
    }
  };

  const prepareAutomaticFrames = async (
    frameRate: number,
    signal: AbortSignal,
  ) => {
    const host = exportStickerHostRef.current;
    if (!host) throw new Error("The export renderer is unavailable.");
    const frames: ExportFrame[] = [];
    const duration = automaticDuration(speed);
    const frameDuration = 1000 / frameRate;
    const frameCount = Math.max(2, Math.ceil((duration / 1000) * frameRate));
    const captureCanvas = document.createElement("canvas");
    host.style.width = `${size.width}px`;
    host.style.height = `${size.height}px`;
    let exportController: StickerInstance | null = null;
    try {
      exportController = await createSticker(host, {
        ...options,
        source,
        peel: { ...options.peel, release: "stay" },
        sound: { ...options.sound, enabled: false },
      });
      throwIfAborted(signal);
      exportController.setRenderScale(Math.max(1, transformRef.current.zoom));
      const sourceCanvas = host.querySelector("canvas");
      if (!sourceCanvas) throw new Error("The export renderer is not ready.");
      for (let index = 0; index < frameCount; index += 1) {
        throwIfAborted(signal);
        const timeline = automaticPhaseAt(index * frameDuration, speed);
        const state = autoFrameAt(
          timeline.phase,
          timeline.progress,
          easing,
          motion,
          size,
        );
        if (state.entranceProgress === null) {
          exportController.setPeelProgress(state.peel, motion);
        } else {
          exportController.setEntranceProgress(state.entranceProgress);
        }
        const context = drawCompositedFrame(
          captureCanvas,
          sourceCanvas,
          size.width,
          size.height,
          transformRef.current,
          state.visual,
        );
        frames.push({
          durationMs: frameDuration,
          height: size.height,
          rgba: new Uint8ClampedArray(
            context.getImageData(0, 0, size.width, size.height).data,
          ),
          width: size.width,
        });
        updateExportProgress(
          0.03 + ((index + 1) / frameCount) * 0.3,
          "capturing",
        );
        await nextFrame();
      }
      return frames;
    } finally {
      exportController?.destroy();
      host.replaceChildren();
      host.style.removeProperty("width");
      host.style.removeProperty("height");
    }
  };

  const prepareRecordedFrames = async (
    _frameRate: number,
    signal: AbortSignal,
  ) => {
    const sourceFrames = recordedFramesRef.current;
    const frames: ExportFrame[] = [];
    for (let index = 0; index < sourceFrames.length; index += 1) {
      throwIfAborted(signal);
      const frame = sourceFrames[index];
      frames.push({
        ...frame,
        rgba: new Uint8ClampedArray(frame.rgba),
      });
      updateExportProgress(
        0.03 + ((index + 1) / sourceFrames.length) * 0.3,
        "capturing",
      );
      if (index % 4 === 3) await nextFrame();
    }
    return frames;
  };

  const exportAnimation = async (
    format: "gif" | "apng" | "mov",
    frameRate: number,
  ) => {
    if (exportAbortRef.current) return;
    if (format === "gif") setGifFrameRate(frameRate);
    else if (format === "apng") setApngFrameRate(frameRate);
    else setMovFrameRate(frameRate);
    setExportMenuOpen(null);
    const signal = beginExport(format);
    setStatus(t.exporting);
    try {
      const animationFrames =
        animationMethod === "automatic"
          ? await prepareAutomaticFrames(frameRate, signal)
          : await prepareRecordedFrames(frameRate, signal);
      throwIfAborted(signal);
      if (!animationFrames.length) throw new Error("Record an animation first.");
      const animationDurationMs = animationFrames.reduce(
        (duration, frame) => duration + frame.durationMs,
        0,
      );
      updateExportProgress(0.34, "preparing");
      let audio:
        | Awaited<ReturnType<typeof renderStickerExportAudio>>
        | undefined;
      if (format === "mov" && videoSound) {
        const reappearAtMs =
          animationMethod === "automatic"
            ? AUTO_PEEL_DURATION_MS / speed + AUTO_EXIT_DURATION_MS
            : Math.max(
                0,
                animationDurationMs - STICKER_ENTRANCE_DURATION_MS,
              );
        const peelDurationMs =
          animationMethod === "automatic"
            ? AUTO_PEEL_DURATION_MS / speed
            : Math.max(100, reappearAtMs - AUTO_EXIT_DURATION_MS);
        audio = await renderStickerExportAudio({
          durationMs: animationDurationMs + playbackInterval * 1000,
          peelDurationMs,
          reappearAtMs,
          peelSoundSrc: options.sound?.src,
          volume: options.sound?.volume ?? 0.7,
        });
        throwIfAborted(signal);
      }
      const blob = await runExportWorker({
        audio,
        format,
        frameRate,
        frames: animationFrames,
        signal,
      });
      throwIfAborted(signal);
      downloadBlob(
        blob,
        format === "gif"
          ? "sticker-forge.gif"
          : format === "apng"
            ? "sticker-forge.png"
            : "sticker-forge-alpha.mov",
      );
      updateExportProgress(1, "encoding");
      setStatus(t.exportDone);
    } catch (error) {
      if (isAbortError(error)) setStatus(t.exportCanceled);
      else {
        console.error("Sticker export failed.", error);
        setStatus(t.exportFailed);
      }
    } finally {
      exportAbortRef.current = null;
      exportWorkerTaskRef.current = null;
      setBusy(null);
    }
  };

  const copyCode = async () => {
    try {
      await navigator.clipboard.writeText(embedCode);
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setStatus(t.exportFailed);
    }
  };

  const switchMode = (nextMode: ExportMode) => {
    if (busy) return;
    cancelAnimationFrame(recordingFrameRef.current);
    setBezierOpen(false);
    setSpeedOpen(false);
    setIntervalOpen(false);
    setExportMenuOpen(null);
    setMode(nextMode);
    setVisualMotion(EMPTY_MOTION);
    setStatus("");
    setRecordingPhase("idle");
    setManualStateSynced("idle");
    setRecordedFramesSynced([]);
  };

  const animationReady =
    animationMethod === "automatic" ||
    (manualState === "recorded" && recordedFrames.length > 1);
  const exportProgressLabel =
    exportProgress.stage === "canceling"
      ? t.cancelingExport
      : exportProgress.stage === "capturing"
        ? t.capturingFrames
        : exportProgress.stage === "preparing"
          ? t.preparingExport
          : busy === "gif"
            ? t.encodingGif
            : busy === "apng"
              ? t.encodingApng
              : busy === "mov"
                ? t.encodingMov
                : t.exporting;
  const recordingTip =
    recordingPhase === "waiting"
      ? t.waitingToPeel
      : recordingPhase === "peeling"
        ? t.peelToEnd
        : recordingPhase === "finishing"
          ? t.waitingForAnimation
          : "";

  const onDialogResizeStart = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (busy) return;
    const dialog = dialogRef.current;
    if (!dialog) return;
    event.preventDefault();
    event.stopPropagation();
    const rect = dialog.getBoundingClientRect();
    const bounds = exportDialogBounds();
    event.currentTarget.setPointerCapture(event.pointerId);
    dialogResizeRef.current = {
      pointerId: event.pointerId,
      startX: event.clientX,
      startY: event.clientY,
      width: rect.width,
      height: rect.height,
      maxWidth: bounds.maxWidth,
      maxHeight: bounds.maxHeight,
    };
  };

  const onDialogResizeMove = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const resize = dialogResizeRef.current;
    const dialog = dialogRef.current;
    if (!resize || resize.pointerId !== event.pointerId || !dialog) return;
    dialog.style.width = `${clamp(
      resize.width + (event.clientX - resize.startX) * 2,
      Math.min(EXPORT_DIALOG_MIN_WIDTH, resize.maxWidth),
      resize.maxWidth,
    )}px`;
    dialog.style.height = `${clamp(
      resize.height + (event.clientY - resize.startY) * 2,
      Math.min(EXPORT_DIALOG_MIN_HEIGHT, resize.maxHeight),
      resize.maxHeight,
    )}px`;
  };

  const onDialogResizeEnd = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (dialogResizeRef.current?.pointerId !== event.pointerId) return;
    dialogResizeRef.current = null;
    const dialog = dialogRef.current;
    if (dialog && window.innerWidth > EXPORT_DIALOG_MOBILE_BREAKPOINT) {
      const rect = dialog.getBoundingClientRect();
      const next = clampExportDialogSize(rect.width, rect.height);
      preferredDialogSizeRef.current = next;
      dialog.style.width = `${next.width}px`;
      dialog.style.height = `${next.height}px`;
      try {
        window.localStorage.setItem(
          EXPORT_DIALOG_SIZE_STORAGE_KEY,
          JSON.stringify(next),
        );
      } catch {
        // Persistence is optional when storage is unavailable.
      }
    }
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  return (
    <div className="export-backdrop">
      <div className="export-dialog-shell">
        <div
          ref={dialogRef}
          className="export-dialog"
          role="dialog"
          aria-modal="true"
          aria-labelledby="export-dialog-title"
        >
        <header className="export-dialog-header">
          <div>
            <h2 id="export-dialog-title">{t.title}</h2>
            <p>{t.subtitle}</p>
          </div>
          <button
            ref={closeRef}
            className="export-close-button"
            type="button"
            aria-label={t.close}
            disabled={Boolean(busy)}
            onClick={onClose}
          >
            <FontAwesomeIcon icon={faXmark} />
          </button>
        </header>

        <div className="export-toolbar">
          <div
            className="export-mode-tabs"
            role="tablist"
            aria-label={t.title}
            data-mode={mode}
          >
            <span className="export-mode-slider" aria-hidden="true" />
            {(
              [
                ["static", t.static, faImage],
                ["animated", t.animated, faFilm],
                ["embed", t.embed, faCode],
              ] as const
            ).map(([value, label, icon]) => (
              <button
                key={value}
                type="button"
                role="tab"
                aria-selected={mode === value}
                data-active={mode === value}
                disabled={Boolean(busy)}
                onClick={() => switchMode(value)}
              >
                <FontAwesomeIcon icon={icon} />
                {label}
              </button>
            ))}
          </div>
          {mode !== "embed" ? (
            <div className="export-output-controls">
              <label className="export-output-select">
                <span>{t.ratio}</span>
                <select
                  value={aspectRatioPreset}
                  disabled={Boolean(busy)}
                  onChange={(event) =>
                    setAspectRatioPreset(
                      event.target.value as AspectRatioPreset,
                    )
                  }
                >
                  {ASPECT_RATIO_PRESETS.map(([preset]) => (
                    <option key={preset} value={preset}>
                      {preset === "free" ? t.freeRatio : preset}
                    </option>
                  ))}
                </select>
              </label>
              <label className="export-output-select">
                <span>{t.quality}</span>
                <select
                  value={exportScale}
                  disabled={Boolean(busy)}
                  onChange={(event) =>
                    setExportScale(Number(event.target.value) as ExportScale)
                  }
                >
                  {EXPORT_SCALES.map((scale) => (
                    <option key={scale} value={scale}>
                      x{scale}
                    </option>
                  ))}
                </select>
              </label>
            </div>
          ) : null}
        </div>

        <div className="export-dialog-body">
          {mode === "embed" ? (
            <div className="export-code-preview">
              <div className="export-code-toolbar">
                <span>HTML</span>
                <span>{embedCode.split("\n").length} lines</span>
              </div>
              <pre>
                <code>{embedCode}</code>
              </pre>
            </div>
          ) : (
            <>
              <div className="export-canvas-slot">
                <div
                  ref={previewRef}
                  className="export-canvas-frame"
                  data-playback={manualState === "recorded"}
                  data-aspect-locked={aspectRatio !== null}
                  style={
                    aspectRatio === null
                      ? undefined
                      : ({
                          "--export-aspect-ratio": aspectRatio,
                        } as CSSProperties)
                  }
                  onPointerDownCapture={onPreviewPointerDown}
                  onPointerMove={onPreviewPointerMove}
                  onPointerUp={onPreviewPointerUp}
                  onPointerCancel={onPreviewPointerUp}
                  onWheel={onPreviewWheel}
                >
                <div
                  className="export-pixel-size"
                  data-warning={outputExceeds4k}
                >
                  <span>{outputSize.width} × {outputSize.height} px</span>
                  {outputExceeds4k ? (
                    <small>{t.highResolutionWarning}</small>
                  ) : null}
                </div>
                <div
                  ref={layerRef}
                  className="export-sticker-transform"
                  style={layerStyle}
                  aria-hidden={manualState === "recorded"}
                >
                  <div ref={stickerHostRef} className="export-sticker-host" />
                </div>
                <div
                  ref={exportStickerHostRef}
                  className="export-sticker-export-host"
                  aria-hidden="true"
                />
                <canvas
                  ref={playbackRef}
                  className="export-recorded-playback"
                  data-visible={manualState === "recorded"}
                  aria-label={t.recorded}
                />
                {mode === "animated" && animationMethod === "automatic" ? (
                  <div className="export-motion-path" aria-label={t.automatic}>
                    <span className="export-motion-path-line" style={anchorPathStyle} />
                    {(
                      [
                        ["origin", t.startAnchor],
                        ["target", t.endAnchor],
                      ] as const
                    ).map(([anchor, label]) => (
                      <button
                        key={anchor}
                        className="export-motion-anchor"
                        type="button"
                        data-anchor={anchor}
                        aria-label={label}
                        disabled={Boolean(busy)}
                        style={{
                          left: anchorPositions[anchor].x,
                          top: anchorPositions[anchor].y,
                        }}
                        onPointerDown={(event) =>
                          onAnchorPointerDown(anchor, event)
                        }
                        onPointerMove={onAnchorPointerMove}
                        onPointerUp={onAnchorPointerUp}
                        onPointerCancel={onAnchorPointerUp}
                        onKeyDown={(event) => onAnchorKeyDown(anchor, event)}
                      >
                        <span>{label}</span>
                      </button>
                    ))}
                  </div>
                ) : null}
                  <span className="export-guide export-guide-x" data-visible={snapping.x} />
                  <span className="export-guide export-guide-y" data-visible={snapping.y} />
                  <div className="export-canvas-tools">
                  <button
                    type="button"
                    aria-label={t.zoomOut}
                    disabled={previewLocked}
                    onClick={() => changeZoom(transform.zoom - 0.1)}
                  >
                    <FontAwesomeIcon icon={faMinus} />
                  </button>
                  <output>{Math.round(transform.zoom * 100)}%</output>
                  <button
                    type="button"
                    aria-label={t.zoomIn}
                    disabled={previewLocked}
                    onClick={() => changeZoom(transform.zoom + 0.1)}
                  >
                    <FontAwesomeIcon icon={faPlus} />
                  </button>
                  <button
                    type="button"
                    aria-label={t.center}
                    disabled={previewLocked}
                    onClick={() => setTransformSynced({ x: 0, y: 0, zoom: 1 })}
                  >
                    <FontAwesomeIcon icon={faCrosshairs} />
                  </button>
                </div>
                <p
                  className="export-canvas-hint"
                  data-recording={recordingPhase !== "idle"}
                >
                  <span>{t.moveHint}</span>
                  <strong aria-live="polite">{recordingTip || "\u00a0"}</strong>
                </p>
              </div>
              </div>

              {mode === "animated" ? (
                <div className="export-motion-panel" data-method={animationMethod}>
                  <div
                    className="export-method-switch"
                    role="group"
                    aria-label={t.animated}
                    data-method={animationMethod}
                  >
                    <span className="export-method-slider" aria-hidden="true" />
                    <button
                      type="button"
                      data-active={animationMethod === "manual"}
                      disabled={Boolean(busy)}
                      onClick={() => {
                        setAnimationMethod("manual");
                        setBezierOpen(false);
                        setSpeedOpen(false);
                        setIntervalOpen(false);
                        setVisualMotion(EMPTY_MOTION);
                        setRecordingPhase("idle");
                        setManualStateSynced("idle");
                        setRecordedFramesSynced([]);
                        setStatus("");
                      }}
                    >
                      {t.manual}
                    </button>
                    <button
                      type="button"
                      data-active={animationMethod === "automatic"}
                      disabled={Boolean(busy)}
                      onClick={() => {
                        setAnimationMethod("automatic");
                        setIntervalOpen(false);
                        setRecordingPhase("idle");
                        setManualStateSynced("idle");
                        setRecordedFramesSynced([]);
                        setStatus("");
                      }}
                    >
                      {t.automatic}
                    </button>
                  </div>

                  {animationMethod === "manual" ? (
                    <div className="export-record-control">
                      <PlaybackIntervalControl
                        label={t.playbackInterval}
                        labelInside
                        value={playbackInterval}
                        open={intervalOpen}
                        disabled={Boolean(busy)}
                        controlRef={intervalControlRef}
                        onToggle={() => {
                          setBezierOpen(false);
                          setSpeedOpen(false);
                          setIntervalOpen((open) => !open);
                        }}
                        onChange={setPlaybackInterval}
                      />
                      <button
                        className="export-record-button"
                        type="button"
                        data-recording={manualState === "armed" || manualState === "capturing"}
                        disabled={manualState === "armed" || manualState === "capturing" || Boolean(busy)}
                        onClick={beginRecording}
                      >
                        <FontAwesomeIcon icon={manualState === "recorded" ? faRotateRight : faRecordVinyl} />
                        {manualState === "recorded" ? t.rerecord : t.record}
                      </button>
                    </div>
                  ) : (
                    <div className="export-auto-controls">
                      <label
                        className="export-select-control export-auto-inline-control"
                        data-control="easing"
                      >
                        <span>{t.easing}</span>
                        <select
                          value={easingPreset}
                          disabled={Boolean(busy)}
                          onChange={(event) => {
                            const nextPreset = event.target.value;
                            setEasingPreset(nextPreset);
                            if (nextPreset !== "custom") setBezierOpen(false);
                          }}
                        >
                          <option value="ease">Ease</option>
                          <option value="linear">Linear</option>
                          <option value="ease-in">Ease in</option>
                          <option value="ease-out">Ease out</option>
                          <option value="ease-in-out">Ease in out</option>
                          <option value="custom">{t.custom}</option>
                        </select>
                      </label>
                      {easingPreset === "custom" ? (
                        <div ref={bezierControlRef} className="export-bezier-control">
                          <button
                            className="export-bezier-trigger"
                            type="button"
                            aria-label={t.editBezier}
                            aria-expanded={bezierOpen}
                            data-active={bezierOpen}
                            disabled={Boolean(busy)}
                            onClick={() => {
                              setSpeedOpen(false);
                              setIntervalOpen(false);
                              setBezierOpen((open) => !open);
                            }}
                          >
                            <FontAwesomeIcon icon={faBezierCurve} />
                          </button>
                          {bezierOpen ? (
                            <BezierCurveEditor
                              value={bezier}
                              label={t.bezierEditor}
                              closeLabel={t.closeBezier}
                              onChange={setBezier}
                              onClose={() => setBezierOpen(false)}
                            />
                          ) : null}
                        </div>
                      ) : null}
                      <div
                        ref={speedControlRef}
                        className="export-speed-control export-auto-inline-control"
                      >
                        <button
                          className="export-speed-trigger"
                          type="button"
                          aria-label={`${t.speed}: ${formatSpeed(speed)}`}
                          aria-expanded={speedOpen}
                          data-active={speedOpen}
                          disabled={Boolean(busy)}
                          onClick={() => {
                            setBezierOpen(false);
                            setIntervalOpen(false);
                            setSpeedOpen((open) => !open);
                          }}
                        >
                          <span className="export-interval-inline-label">{t.speed}</span>
                          <span className="export-interval-value">{formatSpeed(speed)}</span>
                        </button>
                        {speedOpen ? (
                          <div
                            className="export-speed-popover"
                            role="dialog"
                            aria-label={t.speed}
                          >
                            <header>
                              <strong>{t.speed}</strong>
                              <output>{formatSpeed(speed)}</output>
                            </header>
                            <input
                              type="range"
                              min={MIN_SPEED}
                              max={MAX_SPEED}
                              step={SPEED_STEP}
                              value={speed}
                              aria-label={t.speed}
                              style={{
                                background: `linear-gradient(to right, var(--accent) 0%, var(--accent) ${((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100}%, rgba(44, 45, 52, 0.13) ${((speed - MIN_SPEED) / (MAX_SPEED - MIN_SPEED)) * 100}%, rgba(44, 45, 52, 0.13) 100%)`,
                              }}
                              onChange={(event) => {
                                const nextSpeed = Number(event.target.value);
                                speedRef.current = nextSpeed;
                                setSpeed(nextSpeed);
                              }}
                            />
                            <div className="export-speed-range">
                              <span>{formatSpeed(MIN_SPEED)}</span>
                              <span>{formatSpeed(MAX_SPEED)}</span>
                            </div>
                          </div>
                        ) : null}
                      </div>
                      <PlaybackIntervalControl
                        label={t.playbackInterval}
                        labelInside
                        value={playbackInterval}
                        open={intervalOpen}
                        disabled={Boolean(busy)}
                        controlRef={intervalControlRef}
                        onToggle={() => {
                          setBezierOpen(false);
                          setSpeedOpen(false);
                          setIntervalOpen((open) => !open);
                        }}
                        onChange={setPlaybackInterval}
                      />
                    </div>
                  )}
                </div>
              ) : null}
            </>
          )}
        </div>

        <footer className="export-dialog-footer">
          {mode === "animated" ? (
            <div className="export-footer-options">
              <label className="export-option-toggle" title={t.gifShadowHint}>
                <input
                  type="checkbox"
                  checked={gifShadow}
                  disabled={Boolean(busy)}
                  onChange={(event) => setGifShadow(event.target.checked)}
                />
                <span className="export-toggle-track" aria-hidden="true">
                  <span />
                </span>
                <span className="export-option-toggle-label">
                  {t.gifShadow}
                </span>
              </label>
              <label className="export-option-toggle" title={t.videoSoundHint}>
                <input
                  type="checkbox"
                  checked={videoSound}
                  disabled={Boolean(busy)}
                  onChange={(event) => setVideoSound(event.target.checked)}
                />
                <span className="export-toggle-track" aria-hidden="true">
                  <span />
                </span>
                <span className="export-option-toggle-label">
                  {t.videoSound}
                </span>
              </label>
            </div>
          ) : null}
          {!busy ? (
            <div className="export-status" role="status" aria-live="polite">
              {mode !== "animated" || animationMethod === "automatic"
                ? status
                : ""}
            </div>
          ) : null}
          {busy ? (
            <div
              className="export-progress-panel"
              role="status"
              aria-live="polite"
            >
              <svg
                className="export-progress-ring"
                role="progressbar"
                aria-valuemin={0}
                aria-valuemax={100}
                aria-valuenow={Math.round(exportProgress.progress * 100)}
                viewBox="0 0 20 20"
              >
                <circle
                  className="export-progress-ring-track"
                  cx="10"
                  cy="10"
                  r="8"
                />
                <circle
                  className="export-progress-ring-value"
                  cx="10"
                  cy="10"
                  r="8"
                  pathLength="100"
                  style={{
                    strokeDashoffset: 100 - exportProgress.progress * 100,
                  }}
                />
              </svg>
              <div className="export-progress-copy">
                <strong>{exportProgressLabel}</strong>
              </div>
              <button
                className="export-cancel-button"
                type="button"
                disabled={exportProgress.stage === "canceling"}
                onClick={cancelExport}
              >
                <FontAwesomeIcon icon={faXmark} />
                {t.cancelExport}
              </button>
            </div>
          ) : mode === "static" ? (
            <button className="export-action-primary" type="button" disabled={Boolean(busy)} onClick={() => void exportPng()}>
              <FontAwesomeIcon icon={faDownload} />
              {t.downloadPng}
            </button>
          ) : mode === "animated" ? (
            <div ref={exportActionsRef} className="export-animation-actions">
              <div className="export-split-action">
                <button
                  className="export-split-main"
                  type="button"
                  aria-label={`${t.exportGif} · ${gifFrameRate} FPS`}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() => void exportAnimation("gif", gifFrameRate)}
                >
                  <FontAwesomeIcon icon={faDownload} />
                  {busy === "gif"
                    ? t.encodingGif
                    : `${t.exportGif} (${gifFrameRate} FPS)`}
                </button>
                <button
                  className="export-split-toggle"
                  type="button"
                  aria-label={`${t.exportGif} · ${t.frameRate}`}
                  aria-expanded={exportMenuOpen === "gif"}
                  data-active={exportMenuOpen === "gif"}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() =>
                    setExportMenuOpen((open) =>
                      open === "gif" ? null : "gif",
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {exportMenuOpen === "gif" ? (
                  <div
                    className="export-fps-menu"
                    role="menu"
                    aria-label={`${t.exportGif} · ${t.frameRate}`}
                  >
                    {GIF_FRAME_RATES.map((frameRate) => (
                      <button
                        key={frameRate}
                        type="button"
                        role="menuitemradio"
                        aria-checked={gifFrameRate === frameRate}
                        data-selected={gifFrameRate === frameRate}
                        onClick={() =>
                          void exportAnimation("gif", frameRate)
                        }
                      >
                        <span>{frameRate} FPS</span>
                        {gifFrameRate === frameRate ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="export-split-action">
                <button
                  className="export-split-main"
                  type="button"
                  aria-label={`${t.exportApng} · ${apngFrameRate} FPS`}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() =>
                    void exportAnimation("apng", apngFrameRate)
                  }
                >
                  <FontAwesomeIcon icon={faImage} />
                  {busy === "apng"
                    ? t.encodingApng
                    : `${t.exportApng} (${apngFrameRate} FPS)`}
                </button>
                <button
                  className="export-split-toggle"
                  type="button"
                  aria-label={`${t.exportApng} · ${t.frameRate}`}
                  aria-expanded={exportMenuOpen === "apng"}
                  data-active={exportMenuOpen === "apng"}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() =>
                    setExportMenuOpen((open) =>
                      open === "apng" ? null : "apng",
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {exportMenuOpen === "apng" ? (
                  <div
                    className="export-fps-menu"
                    role="menu"
                    aria-label={`${t.exportApng} · ${t.frameRate}`}
                  >
                    {APNG_FRAME_RATES.map((frameRate) => (
                      <button
                        key={frameRate}
                        type="button"
                        role="menuitemradio"
                        aria-checked={apngFrameRate === frameRate}
                        data-selected={apngFrameRate === frameRate}
                        onClick={() =>
                          void exportAnimation("apng", frameRate)
                        }
                      >
                        <span>{frameRate} FPS</span>
                        {apngFrameRate === frameRate ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
              <div className="export-split-action export-split-action-primary">
                <button
                  className="export-action-primary export-split-main"
                  type="button"
                  aria-label={`${t.exportMov} · ${movFrameRate} FPS`}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() => void exportAnimation("mov", movFrameRate)}
                >
                  <FontAwesomeIcon icon={faFilm} />
                  {busy === "mov"
                    ? t.encodingMov
                    : `${t.exportMov} (${movFrameRate} FPS)`}
                </button>
                <button
                  className="export-action-primary export-split-toggle"
                  type="button"
                  aria-label={`${t.exportMov} · ${t.frameRate}`}
                  aria-expanded={exportMenuOpen === "mov"}
                  data-active={exportMenuOpen === "mov"}
                  disabled={!animationReady || Boolean(busy)}
                  onClick={() =>
                    setExportMenuOpen((open) =>
                      open === "mov" ? null : "mov",
                    )
                  }
                >
                  <FontAwesomeIcon icon={faChevronDown} />
                </button>
                {exportMenuOpen === "mov" ? (
                  <div
                    className="export-fps-menu"
                    role="menu"
                    aria-label={`${t.exportMov} · ${t.frameRate}`}
                  >
                    {MOV_FRAME_RATES.map((frameRate) => (
                      <button
                        key={frameRate}
                        type="button"
                        role="menuitemradio"
                        aria-checked={movFrameRate === frameRate}
                        data-selected={movFrameRate === frameRate}
                        onClick={() =>
                          void exportAnimation("mov", frameRate)
                        }
                      >
                        <span>{frameRate} FPS</span>
                        {movFrameRate === frameRate ? (
                          <FontAwesomeIcon icon={faCheck} />
                        ) : null}
                      </button>
                    ))}
                  </div>
                ) : null}
              </div>
            </div>
          ) : (
            <button className="export-action-primary" type="button" data-copied={copied} onClick={() => void copyCode()}>
              <FontAwesomeIcon icon={copied ? faCheck : faCode} />
              {copied ? t.copied : t.copy}
            </button>
          )}
        </footer>
        </div>
        <button
          className="export-dialog-resize-handle"
          type="button"
          aria-label={t.resize}
          title={t.resize}
          disabled={Boolean(busy)}
          onPointerDown={onDialogResizeStart}
          onPointerMove={onDialogResizeMove}
          onPointerUp={onDialogResizeEnd}
          onPointerCancel={onDialogResizeEnd}
        />
      </div>
    </div>
  );
}
