"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faDrawPolygon,
  faMagnifyingGlassMinus,
  faMagnifyingGlassPlus,
  faMinus,
  faPaintbrush,
  faPlus,
  faRotateLeft,
  faXmark,
} from "@fortawesome/free-solid-svg-icons";

import type { BackgroundRemovalResult } from "@/lib/background-removal";

type ToolMode = "select" | "brush";
type OperationMode = "add" | "subtract";
type TransformState = { x: number; y: number; zoom: number };

type ManualBackgroundRemovalDialogProps = {
  source: string;
  locale: "zh" | "en";
  entered: boolean;
  standalonePwa?: boolean;
  onClosing: () => void;
  onCancel: () => void;
  onConfirm: (result: BackgroundRemovalResult) => void;
};

type PointerGesture =
  | {
      kind: "brush";
      pointerId: number;
      lastX: number;
      lastY: number;
    }
  | {
      kind: "selection";
      pointerId: number;
      points: Array<{ x: number; y: number }>;
    }
  | {
      kind: "pan";
      pointerId: number;
      startClientX: number;
      startClientY: number;
      startX: number;
      startY: number;
    };

type PinchGesture = {
  pointerIds: [number, number];
  startDistance: number;
  startMidpointX: number;
  startMidpointY: number;
  startTransform: TransformState;
};

const MAX_WORKING_EDGE = 2048;
const MIN_ZOOM = 0.3;
const MAX_ZOOM = 6;
const MOBILE_BREAKPOINT = 620;
const PRIMARY_RGB = [36, 126, 245] as const;

const COPY = {
  zh: {
    title: "手动移除背景",
    description: "框选或涂抹要保留的区域，可随时添加或移除",
    close: "关闭手动移除背景",
    selectMode: "框选模式",
    brushMode: "涂抹模式",
    add: "添加区域",
    subtract: "移除区域",
    brushSize: "画笔大小",
    zoomOut: "缩小",
    zoomIn: "放大",
    resetView: "重置视图",
    selectHint: "沿边界拖拽并闭合区域 · 按住空格拖动画布",
    brushHint: "拖拽涂抹区域 · 按住空格拖动画布",
    loading: "正在准备图像…",
    failed: "无法打开这张图像",
    cancel: "取消",
    confirm: "确认移除",
    empty: "请先框选或涂抹需要保留的区域",
  },
  en: {
    title: "Manual background removal",
    description: "Select or paint the area to keep, then add or remove",
    close: "Close manual background removal",
    selectMode: "Select",
    brushMode: "Brush",
    add: "Add area",
    subtract: "Remove area",
    brushSize: "Brush size",
    zoomOut: "Zoom out",
    zoomIn: "Zoom in",
    resetView: "Reset view",
    selectHint: "Drag around a boundary to close it · hold Space to pan",
    brushHint: "Drag to paint an area · hold Space to pan",
    loading: "Preparing image…",
    failed: "This image could not be opened",
    cancel: "Cancel",
    confirm: "Remove background",
    empty: "Select or paint the area you want to keep first",
  },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function createCanvas(width: number, height: number) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  return canvas;
}

function pointerDistance(
  first: { x: number; y: number },
  second: { x: number; y: number },
) {
  return Math.hypot(second.x - first.x, second.y - first.y);
}

function pointerMidpoint(
  first: { x: number; y: number },
  second: { x: number; y: number },
) {
  return {
    x: (first.x + second.x) / 2,
    y: (first.y + second.y) / 2,
  };
}

export function ManualBackgroundRemovalDialog({
  source,
  locale,
  entered,
  standalonePwa = false,
  onClosing,
  onCancel,
  onConfirm,
}: ManualBackgroundRemovalDialogProps) {
  const t = COPY[locale];
  const frameRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const sourceCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const maskCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const fillCanvasRef = useRef<HTMLCanvasElement | null>(null);
  const selectionOutlinePathRef = useRef<Path2D | null>(null);
  const transformRef = useRef<TransformState>({ x: 0, y: 0, zoom: 1 });
  const gestureRef = useRef<PointerGesture | null>(null);
  const touchPointsRef = useRef(new Map<number, { x: number; y: number }>());
  const pinchRef = useRef<PinchGesture | null>(null);
  const spacePressedRef = useRef(false);
  const closeActionRef = useRef<(() => void) | null>(null);
  const closeTimerRef = useRef<number | null>(null);
  const brushPreviewTimerRef = useRef<number | null>(null);
  const [closing, setClosing] = useState(false);
  const [ready, setReady] = useState(false);
  const [failed, setFailed] = useState(false);
  const [toolMode, setToolMode] = useState<ToolMode>("select");
  const [operationMode, setOperationMode] = useState<OperationMode>("add");
  const [brushSize, setBrushSize] = useState(44);
  const [brushPreviewVisible, setBrushPreviewVisible] = useState(false);
  const [hasSelection, setHasSelection] = useState(false);
  const [transform, setTransform] = useState<TransformState>({
    x: 0,
    y: 0,
    zoom: 1,
  });
  const [frameSize, setFrameSize] = useState({ width: 1, height: 1 });

  const setTransformSynced = useCallback((next: TransformState) => {
    transformRef.current = next;
    setTransform(next);
  }, []);

  useLayoutEffect(() => {
    const frame = frameRef.current;
    if (!frame) return;
    const update = () => {
      setFrameSize({
        width: Math.max(1, frame.clientWidth),
        height: Math.max(1, frame.clientHeight),
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(frame);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    let cancelled = false;
    const image = new Image();
    image.decoding = "async";
    image.onload = () => {
      if (cancelled) return;
      const naturalWidth = image.naturalWidth || image.width;
      const naturalHeight = image.naturalHeight || image.height;
      if (!naturalWidth || !naturalHeight) {
        setFailed(true);
        return;
      }
      const scale = Math.min(
        1,
        MAX_WORKING_EDGE / Math.max(naturalWidth, naturalHeight),
      );
      const width = Math.max(1, Math.round(naturalWidth * scale));
      const height = Math.max(1, Math.round(naturalHeight * scale));
      const sourceCanvas = createCanvas(width, height);
      const sourceContext = sourceCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!sourceContext) {
        setFailed(true);
        return;
      }
      sourceContext.drawImage(image, 0, 0, width, height);
      sourceCanvasRef.current = sourceCanvas;
      maskCanvasRef.current = createCanvas(width, height);
      fillCanvasRef.current = createCanvas(width, height);
      selectionOutlinePathRef.current = null;
      setHasSelection(false);
      setReady(true);
    };
    image.onerror = () => {
      if (!cancelled) setFailed(true);
    };
    image.src = source;
    return () => {
      cancelled = true;
    };
  }, [source]);

  useEffect(() => {
    const onKeyDown = (event: KeyboardEvent) => {
      if (event.code === "Space") {
        spacePressedRef.current = true;
        if (
          event.target instanceof HTMLElement
          && !["INPUT", "TEXTAREA", "SELECT", "BUTTON"].includes(
            event.target.tagName,
          )
        ) {
          event.preventDefault();
        }
      }
      if (event.key === "Escape" && !closing) {
        event.preventDefault();
        closeActionRef.current = onCancel;
        onClosing();
        setClosing(true);
      }
    };
    const onKeyUp = (event: KeyboardEvent) => {
      if (event.code === "Space") spacePressedRef.current = false;
    };
    window.addEventListener("keydown", onKeyDown);
    window.addEventListener("keyup", onKeyUp);
    return () => {
      window.removeEventListener("keydown", onKeyDown);
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [closing, onCancel, onClosing]);

  useEffect(() => {
    if (!closing) return;
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    const closeDuration = reducedMotion
      ? 0
      : window.innerWidth <= MOBILE_BREAKPOINT
        ? 440
        : 150;
    closeTimerRef.current = window.setTimeout(() => {
      closeActionRef.current?.();
      closeActionRef.current = null;
    }, closeDuration);
    return () => {
      if (closeTimerRef.current !== null) {
        window.clearTimeout(closeTimerRef.current);
        closeTimerRef.current = null;
      }
    };
  }, [closing]);

  const rebuildSelectionFill = useCallback(() => {
    const mask = maskCanvasRef.current;
    const fill = fillCanvasRef.current;
    if (!mask || !fill) return;
    const context = fill.getContext("2d");
    if (!context) return;
    context.clearRect(0, 0, fill.width, fill.height);
    context.drawImage(mask, 0, 0);
    context.globalCompositeOperation = "source-in";
    context.fillStyle = `rgba(${PRIMARY_RGB.join(", ")}, 0.2)`;
    context.fillRect(0, 0, fill.width, fill.height);
    context.globalCompositeOperation = "source-over";
  }, []);

  const rebuildSelectionEdge = useCallback(() => {
    const mask = maskCanvasRef.current;
    if (!mask) return;
    const maskContext = mask.getContext("2d", { willReadFrequently: true });
    if (!maskContext) return;
    const { width, height } = mask;
    const maskPixels = maskContext.getImageData(0, 0, width, height).data;
    let selected = false;
    const vertexWidth = width + 1;
    const edges = new Map<number, number[]>();
    const isSelected = (x: number, y: number) =>
      x >= 0
      && x < width
      && y >= 0
      && y < height
      && maskPixels[(y * width + x) * 4 + 3] >= 128;
    const addEdge = (
      startX: number,
      startY: number,
      endX: number,
      endY: number,
    ) => {
      const start = startY * vertexWidth + startX;
      const end = endY * vertexWidth + endX;
      const outgoing = edges.get(start);
      if (outgoing) outgoing.push(end);
      else edges.set(start, [end]);
    };

    for (let y = 0; y < height; y += 1) {
      for (let x = 0; x < width; x += 1) {
        if (!isSelected(x, y)) continue;
        selected = true;
        if (!isSelected(x, y - 1)) addEdge(x, y, x + 1, y);
        if (!isSelected(x + 1, y)) addEdge(x + 1, y, x + 1, y + 1);
        if (!isSelected(x, y + 1)) addEdge(x + 1, y + 1, x, y + 1);
        if (!isSelected(x - 1, y)) addEdge(x, y + 1, x, y);
      }
    }

    const outline = new Path2D();
    while (edges.size > 0) {
      const firstEntry = edges.entries().next().value as
        | [number, number[]]
        | undefined;
      if (!firstEntry) break;
      const start = firstEntry[0];
      let current = start;
      let firstPoint = true;
      let remaining = edges.size + 1;
      while (remaining > 0) {
        const x = current % vertexWidth;
        const y = Math.floor(current / vertexWidth);
        if (firstPoint) {
          outline.moveTo(x, y);
          firstPoint = false;
        } else {
          outline.lineTo(x, y);
        }
        const outgoing = edges.get(current);
        const next = outgoing?.pop();
        if (outgoing && outgoing.length === 0) edges.delete(current);
        if (next === undefined) break;
        current = next;
        if (current === start) {
          outline.closePath();
          break;
        }
        remaining -= 1;
      }
    }
    selectionOutlinePathRef.current = selected ? outline : null;
    setHasSelection(selected);
  }, []);

  const imageMetrics = useCallback(
    (state = transformRef.current) => {
      const sourceCanvas = sourceCanvasRef.current;
      if (!sourceCanvas) return null;
      const fitScale = Math.min(
        Math.max(1, frameSize.width - 48) / sourceCanvas.width,
        Math.max(1, frameSize.height - 48) / sourceCanvas.height,
      );
      const scale = fitScale * state.zoom;
      return {
        scale,
        left:
          frameSize.width / 2
          + state.x
          - (sourceCanvas.width * scale) / 2,
        top:
          frameSize.height / 2
          + state.y
          - (sourceCanvas.height * scale) / 2,
      };
    },
    [frameSize.height, frameSize.width],
  );

  const renderFrame = useCallback(
    (time: number) => {
      const canvas = canvasRef.current;
      const sourceCanvas = sourceCanvasRef.current;
      const fillCanvas = fillCanvasRef.current;
      if (!canvas || !sourceCanvas || !fillCanvas) {
        return;
      }
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const displayWidth = Math.max(1, Math.round(frameSize.width * dpr));
      const displayHeight = Math.max(1, Math.round(frameSize.height * dpr));
      if (canvas.width !== displayWidth || canvas.height !== displayHeight) {
        canvas.width = displayWidth;
        canvas.height = displayHeight;
      }
      const context = canvas.getContext("2d");
      if (!context) return;
      const metrics = imageMetrics(transformRef.current);
      if (!metrics) return;
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      context.clearRect(0, 0, frameSize.width, frameSize.height);
      const drawWidth = sourceCanvas.width * metrics.scale;
      const drawHeight = sourceCanvas.height * metrics.scale;
      context.drawImage(
        sourceCanvas,
        metrics.left,
        metrics.top,
        drawWidth,
        drawHeight,
      );
      context.drawImage(
        fillCanvas,
        metrics.left,
        metrics.top,
        drawWidth,
        drawHeight,
      );

      const selectionOutline = selectionOutlinePathRef.current;
      if (selectionOutline) {
        context.save();
        context.translate(metrics.left, metrics.top);
        context.scale(metrics.scale, metrics.scale);
        context.setLineDash([
          8 / metrics.scale,
          6 / metrics.scale,
        ]);
        context.lineDashOffset = -(time / 90) / metrics.scale;
        context.lineWidth = 2 / metrics.scale;
        context.strokeStyle = `rgb(${PRIMARY_RGB.join(", ")})`;
        context.stroke(selectionOutline);
        context.restore();
      }

      const gesture = gestureRef.current;
      if (gesture?.kind === "selection" && gesture.points.length > 1) {
        context.save();
        context.beginPath();
        gesture.points.forEach((point, index) => {
          const x = metrics.left + point.x * metrics.scale;
          const y = metrics.top + point.y * metrics.scale;
          if (index === 0) context.moveTo(x, y);
          else context.lineTo(x, y);
        });
        context.closePath();
        context.fillStyle = `rgba(${PRIMARY_RGB.join(", ")}, 0.2)`;
        context.fill();
        context.setLineDash([8, 6]);
        context.lineDashOffset = -(time / 70);
        context.lineWidth = 1.5;
        context.strokeStyle = `rgb(${PRIMARY_RGB.join(", ")})`;
        context.stroke();
        context.restore();
      }
    },
    [frameSize.height, frameSize.width, imageMetrics],
  );

  useEffect(() => {
    if (!ready) return;
    let frame = 0;
    const draw = (time: number) => {
      renderFrame(time);
      frame = window.requestAnimationFrame(draw);
    };
    frame = window.requestAnimationFrame(draw);
    return () => window.cancelAnimationFrame(frame);
  }, [ready, renderFrame, transform]);

  const pointInImage = useCallback(
    (clientX: number, clientY: number) => {
      const frame = frameRef.current;
      const sourceCanvas = sourceCanvasRef.current;
      const metrics = imageMetrics();
      if (!frame || !sourceCanvas || !metrics) return null;
      const rect = frame.getBoundingClientRect();
      const x = (clientX - rect.left - metrics.left) / metrics.scale;
      const y = (clientY - rect.top - metrics.top) / metrics.scale;
      if (x < 0 || y < 0 || x > sourceCanvas.width || y > sourceCanvas.height) {
        return null;
      }
      return { x, y, scale: metrics.scale };
    },
    [imageMetrics],
  );

  const drawBrushSegment = useCallback(
    (fromX: number, fromY: number, toX: number, toY: number, scale: number) => {
      const mask = maskCanvasRef.current;
      if (!mask) return;
      const context = mask.getContext("2d");
      if (!context) return;
      context.save();
      context.globalCompositeOperation =
        operationMode === "add" ? "source-over" : "destination-out";
      context.strokeStyle = "#fff";
      context.fillStyle = "#fff";
      context.lineCap = "round";
      context.lineJoin = "round";
      context.lineWidth = brushSize / Math.max(scale, 0.01);
      context.beginPath();
      context.moveTo(fromX, fromY);
      context.lineTo(toX, toY);
      context.stroke();
      context.beginPath();
      context.arc(
        toX,
        toY,
        context.lineWidth / 2,
        0,
        Math.PI * 2,
      );
      context.fill();
      context.restore();
      rebuildSelectionFill();
    },
    [brushSize, operationMode, rebuildSelectionFill],
  );

  const applySelectionPath = useCallback(
    (points: Array<{ x: number; y: number }>) => {
      const mask = maskCanvasRef.current;
      if (!mask || points.length < 3) return;
      const context = mask.getContext("2d");
      if (!context) return;
      context.save();
      context.globalCompositeOperation =
        operationMode === "add" ? "source-over" : "destination-out";
      context.fillStyle = "#fff";
      context.beginPath();
      context.moveTo(points[0].x, points[0].y);
      for (let index = 1; index < points.length; index += 1) {
        context.lineTo(points[index].x, points[index].y);
      }
      context.closePath();
      context.fill();
      context.restore();
      rebuildSelectionFill();
      rebuildSelectionEdge();
    },
    [operationMode, rebuildSelectionEdge, rebuildSelectionFill],
  );

  const finishGesture = useCallback(
    (event: ReactPointerEvent<HTMLDivElement>) => {
      touchPointsRef.current.delete(event.pointerId);
      if (
        pinchRef.current
        && pinchRef.current.pointerIds.includes(event.pointerId)
      ) {
        pinchRef.current = null;
      }
      if (gestureRef.current?.pointerId === event.pointerId) {
        if (gestureRef.current.kind === "brush") {
          rebuildSelectionEdge();
        } else if (gestureRef.current.kind === "selection") {
          applySelectionPath(gestureRef.current.points);
        }
        gestureRef.current = null;
      }
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
    },
    [applySelectionPath, rebuildSelectionEdge],
  );

  const onPointerDown = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!ready || closing) return;
    if (event.pointerType === "touch") {
      touchPointsRef.current.set(event.pointerId, {
        x: event.clientX,
        y: event.clientY,
      });
      if (touchPointsRef.current.size === 2) {
        const entries = [...touchPointsRef.current.entries()];
        const first = entries[0];
        const second = entries[1];
        const midpoint = pointerMidpoint(first[1], second[1]);
        pinchRef.current = {
          pointerIds: [first[0], second[0]],
          startDistance: Math.max(1, pointerDistance(first[1], second[1])),
          startMidpointX: midpoint.x,
          startMidpointY: midpoint.y,
          startTransform: transformRef.current,
        };
        gestureRef.current = null;
        event.currentTarget.setPointerCapture(event.pointerId);
        return;
      }
    }
    const shouldPan =
      event.button === 1
      || event.button === 2
      || spacePressedRef.current;
    if (shouldPan) {
      event.preventDefault();
      gestureRef.current = {
        kind: "pan",
        pointerId: event.pointerId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        startX: transformRef.current.x,
        startY: transformRef.current.y,
      };
    } else {
      const point = pointInImage(event.clientX, event.clientY);
      if (!point) return;
      if (toolMode === "select") {
        gestureRef.current = {
          kind: "selection",
          pointerId: event.pointerId,
          points: [{ x: point.x, y: point.y }],
        };
      } else {
        gestureRef.current = {
          kind: "brush",
          pointerId: event.pointerId,
          lastX: point.x,
          lastY: point.y,
        };
        drawBrushSegment(
          point.x,
          point.y,
          point.x,
          point.y,
          point.scale,
        );
      }
    }
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const onPointerMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.pointerType === "touch") {
      if (touchPointsRef.current.has(event.pointerId)) {
        touchPointsRef.current.set(event.pointerId, {
          x: event.clientX,
          y: event.clientY,
        });
      }
      const pinch = pinchRef.current;
      if (pinch) {
        const first = touchPointsRef.current.get(pinch.pointerIds[0]);
        const second = touchPointsRef.current.get(pinch.pointerIds[1]);
        if (!first || !second) return;
        const midpoint = pointerMidpoint(first, second);
        const zoom = clamp(
          pinch.startTransform.zoom
          * (
            pointerDistance(first, second)
            / Math.max(1, pinch.startDistance)
          ),
          MIN_ZOOM,
          MAX_ZOOM,
        );
        setTransformSynced({
          x:
            pinch.startTransform.x
            + midpoint.x
            - pinch.startMidpointX,
          y:
            pinch.startTransform.y
            + midpoint.y
            - pinch.startMidpointY,
          zoom,
        });
        return;
      }
    }
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    if (gesture.kind === "pan") {
      setTransformSynced({
        ...transformRef.current,
        x: gesture.startX + event.clientX - gesture.startClientX,
        y: gesture.startY + event.clientY - gesture.startClientY,
      });
      return;
    }
    const point = pointInImage(event.clientX, event.clientY);
    if (!point) return;
    if (gesture.kind === "selection") {
      const previous = gesture.points.at(-1);
      if (
        !previous
        || Math.hypot(point.x - previous.x, point.y - previous.y)
          * point.scale >= 3
      ) {
        gesture.points.push({ x: point.x, y: point.y });
      }
    } else {
      drawBrushSegment(
        gesture.lastX,
        gesture.lastY,
        point.x,
        point.y,
        point.scale,
      );
      gesture.lastX = point.x;
      gesture.lastY = point.y;
    }
  };

  const showBrushPreview = useCallback((linger = false) => {
    if (brushPreviewTimerRef.current !== null) {
      window.clearTimeout(brushPreviewTimerRef.current);
      brushPreviewTimerRef.current = null;
    }
    setBrushPreviewVisible(true);
    if (linger) {
      brushPreviewTimerRef.current = window.setTimeout(() => {
        setBrushPreviewVisible(false);
        brushPreviewTimerRef.current = null;
      }, 500);
    }
  }, []);

  const hideBrushPreview = useCallback(() => {
    if (brushPreviewTimerRef.current !== null) {
      window.clearTimeout(brushPreviewTimerRef.current);
      brushPreviewTimerRef.current = null;
    }
    setBrushPreviewVisible(false);
  }, []);

  useEffect(
    () => () => {
      if (brushPreviewTimerRef.current !== null) {
        window.clearTimeout(brushPreviewTimerRef.current);
      }
    },
    [],
  );

  const changeZoom = useCallback(
    (nextZoom: number) => {
      setTransformSynced({
        ...transformRef.current,
        zoom: clamp(nextZoom, MIN_ZOOM, MAX_ZOOM),
      });
    },
    [setTransformSynced],
  );

  const onWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const frame = frameRef.current;
    if (!frame) return;
    const rect = frame.getBoundingClientRect();
    const current = transformRef.current;
    const nextZoom = clamp(
      current.zoom * Math.exp(-event.deltaY * 0.0015),
      MIN_ZOOM,
      MAX_ZOOM,
    );
    const ratio = nextZoom / current.zoom;
    const pointerX = event.clientX - rect.left - frameSize.width / 2;
    const pointerY = event.clientY - rect.top - frameSize.height / 2;
    setTransformSynced({
      x: pointerX - (pointerX - current.x) * ratio,
      y: pointerY - (pointerY - current.y) * ratio,
      zoom: nextZoom,
    });
  };

  const buildResult = useCallback((): BackgroundRemovalResult | null => {
    const sourceCanvas = sourceCanvasRef.current;
    const maskCanvas = maskCanvasRef.current;
    if (!sourceCanvas || !maskCanvas || !hasSelection) return null;
    const sourceContext = sourceCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    const maskContext = maskCanvas.getContext("2d", {
      willReadFrequently: true,
    });
    if (!sourceContext || !maskContext) return null;
    const sourceImage = sourceContext.getImageData(
      0,
      0,
      sourceCanvas.width,
      sourceCanvas.height,
    );
    const maskPixels = maskContext.getImageData(
      0,
      0,
      maskCanvas.width,
      maskCanvas.height,
    ).data;
    const pixels = new Uint8ClampedArray(sourceImage.data);
    for (let alphaIndex = 3; alphaIndex < pixels.length; alphaIndex += 4) {
      pixels[alphaIndex] = Math.round(
        pixels[alphaIndex] * (maskPixels[alphaIndex] / 255),
      );
    }
    const resultCanvas = createCanvas(sourceCanvas.width, sourceCanvas.height);
    const resultContext = resultCanvas.getContext("2d");
    if (!resultContext) return null;
    resultContext.putImageData(
      new ImageData(pixels, sourceCanvas.width, sourceCanvas.height),
      0,
      0,
    );
    return {
      dataUrl: resultCanvas.toDataURL("image/png"),
      pixels,
      width: sourceCanvas.width,
      height: sourceCanvas.height,
    };
  }, [hasSelection]);

  const closeWith = useCallback((action: () => void) => {
    if (closing) return;
    closeActionRef.current = action;
    onClosing();
    setClosing(true);
  }, [closing, onClosing]);

  const confirm = () => {
    const result = buildResult();
    if (!result) return;
    closeWith(() => onConfirm(result));
  };

  return (
    <div
      className="export-backdrop manual-removal-backdrop"
      data-closing={closing || undefined}
      data-open={entered || undefined}
      data-pwa-standalone={standalonePwa || undefined}
    >
      <div className="export-dialog-shell">
        <div
          className={`export-dialog manual-removal-dialog t-modal${
            closing ? " is-closing" : entered ? " is-open" : ""
          }`}
          data-closing={closing || undefined}
          data-open={entered || undefined}
          role="dialog"
          aria-modal="true"
          aria-labelledby="manual-removal-dialog-title"
        >
          <header className="export-dialog-header">
            <div>
              <h2 id="manual-removal-dialog-title">{t.title}</h2>
              <p>{t.description}</p>
            </div>
            <button
              className="export-close-button"
              type="button"
              aria-label={t.close}
              disabled={closing}
              onClick={() => closeWith(onCancel)}
            >
              <FontAwesomeIcon icon={faXmark} />
            </button>
          </header>

          <div className="manual-removal-toolbar">
            <div
              className="manual-removal-mode-tabs"
              data-mode={toolMode}
              role="tablist"
              aria-label={t.title}
            >
              <span className="manual-removal-mode-slider" aria-hidden="true" />
              <button
                type="button"
                role="tab"
                data-active={toolMode === "select"}
                aria-selected={toolMode === "select"}
                onClick={() => setToolMode("select")}
              >
                <FontAwesomeIcon icon={faDrawPolygon} />
                <span>{t.selectMode}</span>
              </button>
              <button
                type="button"
                role="tab"
                data-active={toolMode === "brush"}
                aria-selected={toolMode === "brush"}
                onClick={() => setToolMode("brush")}
              >
                <FontAwesomeIcon icon={faPaintbrush} />
                <span>{t.brushMode}</span>
              </button>
            </div>

            <div className="manual-removal-controls">
              <div
                className="manual-removal-operations"
                role="group"
                aria-label={t.title}
              >
                <button
                  type="button"
                  data-active={operationMode === "add"}
                  aria-pressed={operationMode === "add"}
                  onClick={() => setOperationMode("add")}
                >
                  <FontAwesomeIcon icon={faPlus} />
                <span>{t.add}</span>
                </button>
                <button
                  type="button"
                  data-active={operationMode === "subtract"}
                  aria-pressed={operationMode === "subtract"}
                  onClick={() => setOperationMode("subtract")}
                >
                  <FontAwesomeIcon icon={faMinus} />
                  <span>{t.subtract}</span>
                </button>
              </div>

              {toolMode === "brush" ? (
                <label className="range-row manual-removal-brush-size">
                  <span className="range-meta">
                    <span className="range-label">{t.brushSize}</span>
                    <output className="range-value">{brushSize}px</output>
                  </span>
                  <span
                    className="range-slider"
                    style={{
                      "--range-fill": `${((brushSize - 16) / (120 - 16)) * 100}%`,
                    } as CSSProperties}
                  >
                    <span
                      className="range-track-segment range-track-fill"
                      aria-hidden="true"
                    />
                    <span
                      className="range-track-segment range-track-remainder"
                      aria-hidden="true"
                    />
                    <input
                      className="range-control"
                      type="range"
                      min="16"
                      max="120"
                      step="2"
                      value={brushSize}
                      aria-label={t.brushSize}
                      onPointerDown={() => showBrushPreview()}
                      onPointerUp={hideBrushPreview}
                      onPointerCancel={hideBrushPreview}
                      onChange={(event) => {
                        setBrushSize(Number(event.target.value));
                        showBrushPreview(true);
                      }}
                    />
                  </span>
                </label>
              ) : null}
            </div>
          </div>

          <div className="export-dialog-body manual-removal-body">
            <div
              ref={frameRef}
              className="manual-removal-canvas-frame"
              data-tool={toolMode}
              data-operation={operationMode}
              onContextMenu={(event) => event.preventDefault()}
              onPointerDown={onPointerDown}
              onPointerMove={onPointerMove}
              onPointerUp={finishGesture}
              onPointerCancel={finishGesture}
              onWheel={onWheel}
            >
              <canvas ref={canvasRef} aria-label={t.title} />
              {ready && toolMode === "brush" && brushPreviewVisible ? (
                <span
                  className="manual-removal-brush-preview"
                  style={{
                    width: brushSize,
                    height: brushSize,
                  }}
                  aria-hidden="true"
                />
              ) : null}
              {!ready ? (
                <div className="manual-removal-status">
                  {failed ? t.failed : t.loading}
                </div>
              ) : null}
              <div
                className="manual-removal-zoom-tools"
                data-gallery-ui
                onPointerDown={(event) => event.stopPropagation()}
              >
                <button
                  type="button"
                  aria-label={t.zoomOut}
                  disabled={!ready}
                  onClick={() => changeZoom(transform.zoom / 1.2)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlassMinus} />
                </button>
                <output>{Math.round(transform.zoom * 100)}%</output>
                <button
                  type="button"
                  aria-label={t.zoomIn}
                  disabled={!ready}
                  onClick={() => changeZoom(transform.zoom * 1.2)}
                >
                  <FontAwesomeIcon icon={faMagnifyingGlassPlus} />
                </button>
                <button
                  type="button"
                  aria-label={t.resetView}
                  disabled={!ready}
                  onClick={() =>
                    setTransformSynced({ x: 0, y: 0, zoom: 1 })
                  }
                >
                  <FontAwesomeIcon icon={faRotateLeft} />
                </button>
              </div>
              <p className="manual-removal-hint">
                {toolMode === "select" ? t.selectHint : t.brushHint}
              </p>
            </div>
          </div>

          <footer className="export-dialog-footer manual-removal-footer">
            <span className="manual-removal-empty-hint" aria-live="polite">
              {ready && !hasSelection ? t.empty : ""}
            </span>
            <div className="manual-removal-actions">
              <button
                className="export-cancel-button"
                type="button"
                disabled={closing}
                onClick={() => closeWith(onCancel)}
              >
                {t.cancel}
              </button>
              <button
                className="export-action-primary"
                type="button"
                disabled={!ready || !hasSelection || closing}
                onClick={confirm}
              >
                {t.confirm}
              </button>
            </div>
          </footer>
        </div>
      </div>
    </div>
  );
}
