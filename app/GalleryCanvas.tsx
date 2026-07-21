"use client";

/* eslint-disable @next/next/no-img-element -- authenticated R2 previews are already resized and must stay cookie-scoped */

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import type {
  GalleryAsset,
  GalleryItem,
  GalleryLayout,
} from "@/lib/gallery-types";
import type { StickerInstance, StickerOptions } from "@/lib/sticker-forge";
import { useSpringValue, useSpringVector } from "./gallery-spring";

export type GalleryEntryOrigin = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type GalleryCanvasProps = {
  items: GalleryItem[];
  locale: "zh" | "en";
  entryOrigins: Record<string, GalleryEntryOrigin>;
  onItemsChange: (items: GalleryItem[]) => void;
  onClose: () => void;
};

type ViewState = {
  x: number;
  y: number;
  zoom: number;
};

type Size = {
  width: number;
  height: number;
};

type ItemGesture =
  | {
      kind: "move";
      pointerId: number;
      startClientX: number;
      startClientY: number;
      startLayout: GalleryLayout;
    }
  | {
      kind: "resize";
      pointerId: number;
      centerX: number;
      centerY: number;
      startDistance: number;
      startLayout: GalleryLayout;
    }
  | {
      kind: "rotate";
      pointerId: number;
      centerX: number;
      centerY: number;
      startAngle: number;
      startLayout: GalleryLayout;
    };

const MIN_ZOOM = 0.06;
const MAX_ZOOM = 8;
const MAX_VISIBLE_PREVIEWS = 320;
const INTERACTIVE_ZOOM_THRESHOLD = 0.24;
const INTERACTIVE_SCREEN_SIZE = 86;
const MAX_ASSET_CACHE = 28;
const MAX_ASSET_PREFETCH = 12;
const COPY = {
  zh: {
    title: "贴纸画廊",
    count: (count: number) => `${count} 张贴纸`,
    exit: "退出画廊",
    delete: "删除贴纸",
    deleteTitle: "要删除这张贴纸吗？",
    deleteBody: "这个操作无法撤销；编辑器中的当前贴纸不会受影响。",
    cancel: "取消",
    confirmDelete: "确认删除",
    saveFailed: "位置保存失败，请稍后重试",
    deleteFailed: "删除失败，请稍后重试",
    zoomIn: "放大",
    zoomOut: "缩小",
    resetView: "重置视图",
  },
  en: {
    title: "Sticker Gallery",
    count: (count: number) => `${count} sticker${count === 1 ? "" : "s"}`,
    exit: "Exit gallery",
    delete: "Delete sticker",
    deleteTitle: "Delete this sticker?",
    deleteBody:
      "This cannot be undone. The current sticker in the editor will stay untouched.",
    cancel: "Cancel",
    confirmDelete: "Delete",
    saveFailed: "Could not save the placement. Try again in a moment.",
    deleteFailed: "Could not delete the sticker. Try again in a moment.",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
  },
} as const;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function normalizedDegrees(value: number) {
  let next = value % 360;
  if (next > 180) next -= 360;
  if (next < -180) next += 360;
  return next;
}

function previewRotation(item: GalleryItem) {
  return item.baseTilt + item.layout.rotation;
}

function itemDistance(item: GalleryItem, view: ViewState) {
  return Math.hypot(item.layout.x - view.x, item.layout.y - view.y);
}

function isItemVisible(
  item: GalleryItem,
  view: ViewState,
  viewport: Size,
) {
  const halfWidth = viewport.width / Math.max(view.zoom * 2, 0.001);
  const halfHeight = viewport.height / Math.max(view.zoom * 2, 0.001);
  const margin = 240 / Math.max(view.zoom, 0.001);
  const itemHalfWidth = item.layout.width / 2;
  const itemHalfHeight = item.layout.height / 2;
  return (
    item.layout.x + itemHalfWidth >= view.x - halfWidth - margin &&
    item.layout.x - itemHalfWidth <= view.x + halfWidth + margin &&
    item.layout.y + itemHalfHeight >= view.y - halfHeight - margin &&
    item.layout.y - itemHalfHeight <= view.y + halfHeight + margin
  );
}

type RendererJob = {
  cancelled: boolean;
  run: () => Promise<void>;
};

const rendererJobs: RendererJob[] = [];
let rendererQueueBusy = false;

async function drainRendererQueue() {
  if (rendererQueueBusy) return;
  rendererQueueBusy = true;
  try {
    while (rendererJobs.length) {
      const job = rendererJobs.shift();
      if (!job || job.cancelled) continue;
      await job.run();
      await new Promise<void>((resolve) => {
        if (typeof window.requestIdleCallback === "function") {
          window.requestIdleCallback(() => resolve(), { timeout: 80 });
        } else {
          window.setTimeout(resolve, 0);
        }
      });
    }
  } finally {
    rendererQueueBusy = false;
  }
}

function scheduleRenderer(run: () => Promise<void>) {
  const job: RendererJob = { cancelled: false, run };
  rendererJobs.push(job);
  void drainRendererQueue();
  return () => {
    job.cancelled = true;
  };
}

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 1, height: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      const rect = element.getBoundingClientRect();
      setSize({
        width: Math.max(1, rect.width),
        height: Math.max(1, rect.height),
      });
    };
    update();
    const observer = new ResizeObserver(update);
    observer.observe(element);
    return () => observer.disconnect();
  }, []);

  return { ref, size };
}

function useGalleryAssets(priorityIds: string[]) {
  const [assets, setAssets] = useState<Record<string, GalleryAsset>>({});
  const [failedIds, setFailedIds] = useState<Set<string>>(() => new Set());
  const assetsRef = useRef(assets);
  const failedIdsRef = useRef(failedIds);
  const queueRef = useRef<string[]>([]);
  const queuedRef = useRef(new Set<string>());
  const inFlightRef = useRef(new Set<string>());
  const cacheOrderRef = useRef<string[]>([]);
  const loadingRef = useRef(false);
  const disposedRef = useRef(false);

  useEffect(() => {
    assetsRef.current = assets;
  }, [assets]);

  useEffect(() => {
    failedIdsRef.current = failedIds;
  }, [failedIds]);

  const pump = useCallback(async () => {
    if (loadingRef.current) return;
    loadingRef.current = true;
    try {
      while (!disposedRef.current && queueRef.current.length) {
        const id = queueRef.current.shift();
        if (!id) continue;
        queuedRef.current.delete(id);
        if (
          assetsRef.current[id] ||
          failedIdsRef.current.has(id) ||
          inFlightRef.current.has(id)
        ) {
          continue;
        }
        inFlightRef.current.add(id);
        try {
          const response = await fetch(`/api/gallery/${encodeURIComponent(id)}/asset`, {
            credentials: "same-origin",
          });
          if (!response.ok) throw new Error("Asset request failed");
          const asset = (await response.json()) as GalleryAsset;
          if (disposedRef.current) return;
          setAssets((current) => {
            const next = { ...current, [id]: asset };
            cacheOrderRef.current = [
              ...cacheOrderRef.current.filter((cachedId) => cachedId !== id),
              id,
            ];
            while (cacheOrderRef.current.length > MAX_ASSET_CACHE) {
              const expiredId = cacheOrderRef.current.shift();
              if (expiredId) delete next[expiredId];
            }
            return next;
          });
        } catch {
          if (disposedRef.current) return;
          setFailedIds((current) => {
            const next = new Set(current);
            next.add(id);
            return next;
          });
        } finally {
          inFlightRef.current.delete(id);
        }
        await new Promise<void>((resolve) => {
          if (typeof window.requestIdleCallback === "function") {
            window.requestIdleCallback(() => resolve(), { timeout: 120 });
          } else {
            window.setTimeout(resolve, 12);
          }
        });
      }
    } finally {
      loadingRef.current = false;
    }
  }, []);

  const enqueue = useCallback(
    (ids: string[], front = false) => {
      const missing = ids.filter(
        (id) =>
          !assetsRef.current[id] &&
          !failedIdsRef.current.has(id) &&
          !queuedRef.current.has(id) &&
          !inFlightRef.current.has(id),
      );
      if (!missing.length) return;
      missing.forEach((id) => queuedRef.current.add(id));
      queueRef.current = front
        ? [...missing, ...queueRef.current]
        : [...queueRef.current, ...missing];
      void pump();
    },
    [pump],
  );

  const priorityKey = priorityIds.join("|");
  useEffect(() => {
    const orderedPriority = priorityKey ? priorityKey.split("|") : [];
    enqueue(orderedPriority);
  }, [enqueue, priorityKey]);

  useEffect(() => {
    disposedRef.current = false;
    const queued = queuedRef.current;
    const inFlight = inFlightRef.current;
    return () => {
      disposedRef.current = true;
      queueRef.current = [];
      queued.clear();
      inFlight.clear();
    };
  }, []);

  return { assets, enqueue };
}

function InteractiveSticker({
  asset,
  placementRotation,
  onReadyChange,
}: {
  asset: GalleryAsset;
  placementRotation: number;
  onReadyChange: (ready: boolean) => void;
}) {
  const hostRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<StickerInstance | null>(null);
  const rotationRef = useRef(placementRotation);

  useEffect(() => {
    rotationRef.current = placementRotation;
  }, [placementRotation]);

  useEffect(() => {
    let disposed = false;
    const cancel = scheduleRenderer(async () => {
      const host = hostRef.current;
      if (!host || disposed) return;
      try {
        const { createSticker } = await import("@/lib/sticker-forge");
        const options: StickerOptions = {
          ...asset.options,
          source: asset.source,
          quality: "low",
          tilt: (asset.options.tilt ?? 0) + rotationRef.current,
        };
        const controller = await createSticker(host, options);
        if (disposed) {
          controller.destroy();
          return;
        }
        controllerRef.current = controller;
        onReadyChange(true);
      } catch {
        if (!disposed) onReadyChange(false);
      }
    });

    return () => {
      disposed = true;
      cancel();
      onReadyChange(false);
      controllerRef.current?.destroy();
      controllerRef.current = null;
    };
  }, [asset, onReadyChange]);

  useEffect(() => {
    controllerRef.current?.setOptions({
      tilt: (asset.options.tilt ?? 0) + placementRotation,
    });
  }, [asset.options.tilt, placementRotation]);

  return <div ref={hostRef} className="gallery-live-sticker" />;
}

function GalleryItemView({
  item,
  asset,
  interactive,
  selected,
  zoom,
  onSelect,
  onGestureStart,
  onLayoutChange,
  onRequestDelete,
  entryHidden,
}: {
  item: GalleryItem;
  asset?: GalleryAsset;
  interactive: boolean;
  selected: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onGestureStart: (id: string) => void;
  onLayoutChange: (id: string, layout: GalleryLayout, commit: boolean) => void;
  onRequestDelete: (id: string) => void;
  entryHidden: boolean;
}) {
  const [rendererReady, setRendererReady] = useState(false);
  const [resizePreviewMode, setResizePreviewMode] = useState(false);
  const [displayLayout, setDisplayLayout] = useState(item.layout);
  const gestureRef = useRef<ItemGesture | null>(null);
  const latestLayoutRef = useRef(item.layout);
  const totalRotation = item.baseTilt + displayLayout.rotation;
  const visualStyle = {
    "--gallery-item-rotation": `${totalRotation}deg`,
    "--gallery-handle-scale": String(1 / Math.max(zoom, 0.001)),
  } as CSSProperties;

  useEffect(() => {
    if (gestureRef.current) return;
    latestLayoutRef.current = item.layout;
    setDisplayLayout(item.layout);
  }, [item.layout]);

  const finishGesture = (
    event: ReactPointerEvent<HTMLElement>,
    cancelled = false,
  ) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    gestureRef.current = null;
    if (gesture.kind === "resize") setResizePreviewMode(false);
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (cancelled) {
      latestLayoutRef.current = gesture.startLayout;
      setDisplayLayout(gesture.startLayout);
      return;
    }
    onLayoutChange(item.id, latestLayoutRef.current, true);
  };

  const updateGesture = (event: ReactPointerEvent<HTMLElement>) => {
    const gesture = gestureRef.current;
    if (!gesture || gesture.pointerId !== event.pointerId) return;
    event.preventDefault();
    if (gesture.kind === "move") {
      const next = {
        ...gesture.startLayout,
        x:
          gesture.startLayout.x +
          (event.clientX - gesture.startClientX) / Math.max(zoom, 0.001),
        y:
          gesture.startLayout.y +
          (event.clientY - gesture.startClientY) / Math.max(zoom, 0.001),
      };
      latestLayoutRef.current = next;
      setDisplayLayout(next);
      return;
    }

    if (gesture.kind === "resize") {
      const distance = Math.max(
        1,
        Math.hypot(
          event.clientX - gesture.centerX,
          event.clientY - gesture.centerY,
        ),
      );
      const factor = distance / gesture.startDistance;
      const next = {
        ...gesture.startLayout,
        width: clamp(gesture.startLayout.width * factor, 140, 1400),
        height: clamp(gesture.startLayout.height * factor, 100, 1000),
      };
      latestLayoutRef.current = next;
      setDisplayLayout(next);
      return;
    }

    const angle = Math.atan2(
      event.clientY - gesture.centerY,
      event.clientX - gesture.centerX,
    );
    const next = {
      ...gesture.startLayout,
      rotation: normalizedDegrees(
        gesture.startLayout.rotation +
          ((angle - gesture.startAngle) * 180) / Math.PI,
      ),
    };
    latestLayoutRef.current = next;
    setDisplayLayout(next);
  };

  const startMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!rendererReady || event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("[data-gallery-control]")) return;
    const rect = event.currentTarget.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    const inMoveZone =
      Math.abs(event.clientX - centerX) <= rect.width * 0.25 &&
      Math.abs(event.clientY - centerY) <= rect.height * 0.2;
    if (!inMoveZone) return;
    event.preventDefault();
    event.stopPropagation();
    onSelect(item.id);
    onGestureStart(item.id);
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = {
      kind: "move",
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startLayout: displayLayout,
    };
  };

  const startResize = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const host = event.currentTarget.closest<HTMLElement>(".gallery-item");
    const rect = host?.getBoundingClientRect();
    if (!rect) return;
    setResizePreviewMode(true);
    onGestureStart(item.id);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = {
      kind: "resize",
      pointerId: event.pointerId,
      centerX,
      centerY,
      startDistance: Math.max(
        1,
        Math.hypot(event.clientX - centerX, event.clientY - centerY),
      ),
      startLayout: displayLayout,
    };
  };

  const startRotate = (event: ReactPointerEvent<HTMLButtonElement>) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    const host = event.currentTarget.closest<HTMLElement>(".gallery-item");
    const rect = host?.getBoundingClientRect();
    if (!rect) return;
    onGestureStart(item.id);
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    event.currentTarget.setPointerCapture(event.pointerId);
    gestureRef.current = {
      kind: "rotate",
      pointerId: event.pointerId,
      centerX,
      centerY,
      startAngle: Math.atan2(event.clientY - centerY, event.clientX - centerX),
      startLayout: displayLayout,
    };
  };

  return (
    <div
      className="gallery-item"
      data-interactive={rendererReady}
      data-selected={selected}
      style={{
        left: displayLayout.x,
        top: displayLayout.y,
        width: displayLayout.width,
        height: displayLayout.height,
        zIndex: selected ? 1_000_000 : displayLayout.zIndex,
        ...visualStyle,
      }}
      onPointerDownCapture={startMove}
      onPointerMoveCapture={updateGesture}
      onPointerUpCapture={(event) => finishGesture(event)}
      onPointerCancelCapture={(event) => finishGesture(event, true)}
    >
      <div className="gallery-preview-rotation">
        <img
          className="gallery-item-preview"
          src={item.previewUrl}
          alt={item.title}
          draggable={false}
          data-hidden={entryHidden || (rendererReady && !resizePreviewMode)}
        />
      </div>
      {interactive && asset && !resizePreviewMode ? (
        <InteractiveSticker
          asset={asset}
          placementRotation={displayLayout.rotation}
          onReadyChange={setRendererReady}
        />
      ) : null}
      {interactive && asset && !rendererReady && !resizePreviewMode ? (
        <span className="gallery-loading-ring" aria-hidden="true" />
      ) : null}
      {selected && (rendererReady || resizePreviewMode) ? (
        <div className="gallery-selection-frame" aria-label={item.title}>
          <span className="gallery-rotation-stem" aria-hidden="true" />
          <button
            className="gallery-rotate-handle"
            type="button"
            data-gallery-control
            aria-label="Rotate sticker"
            onPointerDown={startRotate}
          >
            <span aria-hidden="true" />
          </button>
          {(["nw", "ne", "se", "sw"] as const).map((corner) => (
            <button
              className={`gallery-resize-handle gallery-resize-${corner}`}
              type="button"
              key={corner}
              data-gallery-control
              aria-label={`Resize sticker from ${corner}`}
              onPointerDown={startResize}
            />
          ))}
          <button
            className="gallery-delete-handle"
            type="button"
            data-gallery-control
            aria-label="Delete sticker"
            onPointerDown={(event) => {
              event.stopPropagation();
            }}
            onClick={(event) => {
              event.stopPropagation();
              onRequestDelete(item.id);
            }}
          >
            <svg viewBox="0 0 24 24" aria-hidden="true">
              <path d="M8.5 4.5h7M5.5 7.5h13m-11 0 .7 11h7.6l.7-11M10 10.5v5m4-5v5" />
            </svg>
          </button>
        </div>
      ) : null}
    </div>
  );
}

function GalleryEntryGhost({
  item,
  origin,
  viewport,
  view,
  onSettled,
}: {
  item: GalleryItem;
  origin: GalleryEntryOrigin;
  viewport: Size;
  view: ViewState;
  onSettled: (id: string) => void;
}) {
  const targetWidth = item.layout.width * view.zoom * 0.78;
  const targetHeight = item.layout.height * view.zoom * 0.58;
  const targetLeft =
    viewport.width / 2 +
    (item.layout.x - view.x) * view.zoom -
    targetWidth / 2;
  const targetTop =
    viewport.height / 2 +
    (item.layout.y - view.y) * view.zoom -
    targetHeight / 2;
  const { values, settled } = useSpringVector(
    [targetLeft, targetTop, targetWidth, targetHeight, previewRotation(item), 1],
    {
      initial: [origin.left, origin.top, origin.width, origin.height, 0, 1],
      mass: 1,
      stiffness: 176,
      damping: 22,
      precision: 0.01,
      onRest: () => onSettled(item.id),
    },
  );

  if (settled) return null;
  const [left, top, width, height, rotation, opacity] = values;
  return (
    <img
      className="gallery-entry-ghost"
      src={item.previewUrl}
      alt=""
      style={{
        left,
        top,
        width,
        height,
        opacity,
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

function GalleryEntryTransitions({
  items,
  origins,
  viewport,
  view,
  onSettled,
}: {
  items: GalleryItem[];
  origins: Record<string, GalleryEntryOrigin>;
  viewport: Size;
  view: ViewState;
  onSettled: (id: string) => void;
}) {
  return (
    <div className="gallery-entry-transitions" aria-hidden="true">
      {items.slice(0, 10).map((item) => {
        const origin = origins[item.id];
        if (!origin) return null;
        return (
          <GalleryEntryGhost
            key={item.id}
            item={item}
            origin={origin}
            viewport={viewport}
            view={view}
            onSettled={onSettled}
          />
        );
      })}
    </div>
  );
}

export function GalleryCanvas({
  items: initialItems,
  locale,
  entryOrigins,
  onItemsChange,
  onClose,
}: GalleryCanvasProps) {
  const t = COPY[locale];
  const { ref: viewportRef, size: viewport } = useElementSize<HTMLDivElement>();
  const [items, setItems] = useState(initialItems);
  const itemsRef = useRef(items);
  const [view, setView] = useState<ViewState>({ x: 0, y: 0, zoom: 1 });
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [statusMessage, setStatusMessage] = useState("");
  const [closing, setClosing] = useState(false);
  const [entryPendingIds, setEntryPendingIds] = useState<Set<string>>(
    () =>
      new Set(
        initialItems
          .slice(0, 10)
          .filter((item) => entryOrigins[item.id])
          .map((item) => item.id),
      ),
  );
  const closedRef = useRef(false);
  const overlayRef = useRef<HTMLElement>(null);
  const confirmCancelRef = useRef<HTMLButtonElement>(null);
  const layoutVersionRef = useRef(new Map<string, number>());
  const layoutSaveChainsRef = useRef(new Map<string, Promise<void>>());
  const panRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startView: ViewState;
  } | null>(null);
  const { value: presence, settled: presenceSettled } = useSpringValue(
    closing ? 0 : 1,
    {
    initial: 0,
    mass: 1,
    stiffness: 210,
    damping: 27,
    precision: 0.002,
    onRest: () => {
      if (!closing || closedRef.current) return;
      closedRef.current = true;
      onItemsChange(itemsRef.current);
      onClose();
    },
    },
  );
  const { value: confirmPresence } = useSpringValue(
    deleteCandidate ? 1 : 0,
    {
      initial: 0,
      mass: 0.82,
      stiffness: 245,
      damping: 24,
      precision: 0.002,
    },
  );

  useEffect(() => {
    const previousFocus = document.activeElement;
    overlayRef.current?.focus({ preventScroll: true });
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  useEffect(() => {
    if (deleteCandidate) confirmCancelRef.current?.focus({ preventScroll: true });
  }, [deleteCandidate]);

  const previewPriorityIds = useMemo(
    () => initialItems.slice(0, 10).map((item) => item.id),
    [initialItems],
  );

  const visibleItems = useMemo(
    () =>
      items
        .filter((item) => isItemVisible(item, view, viewport))
        .sort((a, b) => itemDistance(a, view) - itemDistance(b, view))
        .slice(0, MAX_VISIBLE_PREVIEWS),
    [items, view, viewport],
  );
  const visibleIds = useMemo(
    () => visibleItems.map((item) => item.id),
    [visibleItems],
  );
  const { assets, enqueue } = useGalleryAssets(previewPriorityIds);

  useEffect(
    () => enqueue(visibleIds.slice(0, MAX_ASSET_PREFETCH)),
    [enqueue, visibleIds],
  );

  const interactiveIds = useMemo(() => {
    if (
      !presenceSettled ||
      closing ||
      view.zoom < INTERACTIVE_ZOOM_THRESHOLD
    ) {
      return new Set<string>();
    }
    const maxRenderers = viewport.width < 720 ? 3 : 5;
    const candidates = visibleItems
      .filter(
        (item) =>
          assets[item.id] &&
          !entryPendingIds.has(item.id) &&
          Math.max(item.layout.width, item.layout.height) * view.zoom >=
            INTERACTIVE_SCREEN_SIZE,
      )
      .sort((a, b) => {
        if (a.id === selectedId) return -1;
        if (b.id === selectedId) return 1;
        return itemDistance(a, view) - itemDistance(b, view);
      })
      .slice(0, maxRenderers)
      .map((item) => item.id);
    return new Set(candidates);
  }, [
    assets,
    closing,
    entryPendingIds,
    presenceSettled,
    selectedId,
    view,
    viewport.width,
    visibleItems,
  ]);

  const updateItems = useCallback(
    (
      updater: (current: GalleryItem[]) => GalleryItem[],
      notifyParent = false,
    ) => {
      const next = updater(itemsRef.current);
      itemsRef.current = next;
      setItems(next);
      if (notifyParent) onItemsChange(next);
    },
    [onItemsChange],
  );

  const persistLayout = useCallback(
    async (id: string, layout: GalleryLayout, version: number) => {
      try {
        const response = await fetch(`/api/gallery/${encodeURIComponent(id)}`, {
          method: "PATCH",
          credentials: "same-origin",
          headers: { "content-type": "application/json" },
          body: JSON.stringify({ layout }),
        });
        if (!response.ok) throw new Error("Layout request failed");
        const payload = (await response.json()) as { item?: GalleryItem };
        if (
          payload.item &&
          layoutVersionRef.current.get(id) === version
        ) {
          updateItems((current) =>
            current.map((item) => (item.id === id ? payload.item! : item)),
            true,
          );
        }
      } catch {
        setStatusMessage(t.saveFailed);
      }
    },
    [t.saveFailed, updateItems],
  );

  const queueLayoutSave = useCallback(
    (id: string, layout: GalleryLayout, version: number) => {
      const previous = layoutSaveChainsRef.current.get(id) ?? Promise.resolve();
      const next = previous.then(() => persistLayout(id, layout, version));
      layoutSaveChainsRef.current.set(id, next);
      void next.finally(() => {
        if (layoutSaveChainsRef.current.get(id) === next) {
          layoutSaveChainsRef.current.delete(id);
        }
      });
    },
    [persistLayout],
  );

  const handleGestureStart = useCallback((id: string) => {
    layoutVersionRef.current.set(
      id,
      (layoutVersionRef.current.get(id) ?? 0) + 1,
    );
  }, []);

  const handleLayoutChange = useCallback(
    (id: string, layout: GalleryLayout, commit: boolean) => {
      const version = (layoutVersionRef.current.get(id) ?? 0) + 1;
      layoutVersionRef.current.set(id, version);
      updateItems((current) =>
        current.map((item) => (item.id === id ? { ...item, layout } : item)),
      );
      if (commit) queueLayoutSave(id, layout, version);
    },
    [queueLayoutSave, updateItems],
  );

  const handleEntrySettled = useCallback((id: string) => {
    setEntryPendingIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const handleDelete = async () => {
    const id = deleteCandidate;
    if (!id || deleting) return;
    setDeleting(true);
    try {
      const response = await fetch(`/api/gallery/${encodeURIComponent(id)}`, {
        method: "DELETE",
        credentials: "same-origin",
      });
      if (!response.ok) throw new Error("Delete request failed");
      updateItems((current) => current.filter((item) => item.id !== id), true);
      setSelectedId((selected) => (selected === id ? null : selected));
      setDeleteCandidate(null);
    } catch {
      setStatusMessage(t.deleteFailed);
    } finally {
      setDeleting(false);
    }
  };

  const startPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest(".gallery-item") || target.closest("[data-gallery-ui]")) {
      return;
    }
    event.preventDefault();
    setSelectedId(null);
    event.currentTarget.setPointerCapture(event.pointerId);
    panRef.current = {
      pointerId: event.pointerId,
      startClientX: event.clientX,
      startClientY: event.clientY,
      startView: view,
    };
  };

  const movePan = (event: ReactPointerEvent<HTMLDivElement>) => {
    const pan = panRef.current;
    if (!pan || pan.pointerId !== event.pointerId) return;
    event.preventDefault();
    setView({
      ...pan.startView,
      x:
        pan.startView.x -
        (event.clientX - pan.startClientX) / Math.max(pan.startView.zoom, 0.001),
      y:
        pan.startView.y -
        (event.clientY - pan.startClientY) / Math.max(pan.startView.zoom, 0.001),
    });
  };

  const finishPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (panRef.current?.pointerId !== event.pointerId) return;
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    event.preventDefault();
    const rect = event.currentTarget.getBoundingClientRect();
    const pointerX = event.clientX - rect.left - viewport.width / 2;
    const pointerY = event.clientY - rect.top - viewport.height / 2;
    const factor = Math.exp(-event.deltaY * 0.0014);
    const nextZoom = clamp(view.zoom * factor, MIN_ZOOM, MAX_ZOOM);
    if (nextZoom === view.zoom) return;
    const worldX = view.x + pointerX / view.zoom;
    const worldY = view.y + pointerY / view.zoom;
    setView({
      x: worldX - pointerX / nextZoom,
      y: worldY - pointerY / nextZoom,
      zoom: nextZoom,
    });
  };

  const zoomBy = (factor: number) => {
    setView((current) => ({
      ...current,
      zoom: clamp(current.zoom * factor, MIN_ZOOM, MAX_ZOOM),
    }));
  };

  const requestClose = useCallback(() => {
    if (closing) return;
    setClosing(true);
  }, [closing]);

  useEffect(() => {
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        if (deleteCandidate) {
          setDeleteCandidate(null);
        } else if (selectedId) {
          setSelectedId(null);
        } else {
          requestClose();
        }
        return;
      }
      if (
        selectedId &&
        (event.key === "Delete" || event.key === "Backspace")
      ) {
        event.preventDefault();
        setDeleteCandidate(selectedId);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [deleteCandidate, requestClose, selectedId]);

  const worldStyle = {
    transform: `translate3d(${viewport.width / 2 - view.x * view.zoom}px, ${viewport.height / 2 - view.y * view.zoom}px, 0) scale(${view.zoom})`,
  } as CSSProperties;
  return (
    <section
      ref={overlayRef}
      className="gallery-overlay"
      data-closing={closing}
      role="dialog"
      aria-modal="true"
      aria-label={t.title}
      tabIndex={-1}
      style={{
        opacity: presence,
        transform: `scale(${0.986 + presence * 0.014})`,
        pointerEvents: "auto",
      }}
    >
      <div
        ref={viewportRef}
        className="gallery-viewport"
        style={
          {
            "--gallery-grid-size": `${28 * view.zoom}px`,
            "--gallery-grid-x": `${viewport.width / 2 - view.x * view.zoom}px`,
            "--gallery-grid-y": `${viewport.height / 2 - view.y * view.zoom}px`,
          } as CSSProperties
        }
        onPointerDown={startPan}
        onPointerMove={movePan}
        onPointerUp={finishPan}
        onPointerCancel={finishPan}
        onWheel={handleWheel}
      >
        <div className="gallery-grid" aria-hidden="true" />
        <div className="gallery-world" style={worldStyle}>
          {visibleItems.map((item) => (
            <GalleryItemView
              key={item.id}
              item={item}
              asset={assets[item.id]}
              interactive={interactiveIds.has(item.id)}
              selected={selectedId === item.id}
              zoom={view.zoom}
              onSelect={setSelectedId}
              onGestureStart={handleGestureStart}
              onLayoutChange={handleLayoutChange}
              onRequestDelete={setDeleteCandidate}
              entryHidden={entryPendingIds.has(item.id)}
            />
          ))}
        </div>

        <GalleryEntryTransitions
          items={items}
          origins={entryOrigins}
          viewport={viewport}
          view={view}
          onSettled={handleEntrySettled}
        />

        <header className="gallery-titlebar" data-gallery-ui>
          <span className="gallery-title-kicker">Sticker Forge</span>
          <h1>{t.title}</h1>
          <span>{t.count(items.length)}</span>
        </header>

        <div className="gallery-view-controls" data-gallery-ui>
          <button type="button" onClick={() => zoomBy(1 / 1.28)} aria-label={t.zoomOut}>
            −
          </button>
          <button
            className="gallery-zoom-value"
            type="button"
            onClick={() => setView({ x: 0, y: 0, zoom: 1 })}
            aria-label={t.resetView}
          >
            {Math.round(view.zoom * 100)}%
          </button>
          <button type="button" onClick={() => zoomBy(1.28)} aria-label={t.zoomIn}>
            +
          </button>
        </div>

        {statusMessage ? (
          <span className="sr-only" aria-live="polite">
            {statusMessage}
          </span>
        ) : null}

        <button
          className="gallery-exit-button"
          type="button"
          data-gallery-ui
          onClick={requestClose}
          aria-label={t.exit}
          title={t.exit}
        >
          <svg viewBox="0 0 24 24" aria-hidden="true">
            <path d="m9 6-6 6 6 6M3 12h12m-1-8h6v16h-6" />
          </svg>
          <span>{t.exit}</span>
        </button>

        {deleteCandidate ? (
          <div
            className="gallery-confirm-backdrop"
            data-gallery-ui
            role="presentation"
            style={{ opacity: confirmPresence }}
          >
            <div
              className="gallery-confirm-dialog"
              role="alertdialog"
              aria-modal="true"
              aria-labelledby="gallery-delete-title"
              aria-describedby="gallery-delete-description"
              style={{
                opacity: confirmPresence,
                transform: `translateY(${(1 - confirmPresence) * 18}px) scale(${0.9 + confirmPresence * 0.1})`,
              }}
            >
              <span className="gallery-confirm-icon" aria-hidden="true">
                <svg viewBox="0 0 24 24">
                  <path d="M8.5 4.5h7M5.5 7.5h13m-11 0 .7 11h7.6l.7-11M10 10.5v5m4-5v5" />
                </svg>
              </span>
              <h2 id="gallery-delete-title">{t.deleteTitle}</h2>
              <p id="gallery-delete-description">{t.deleteBody}</p>
              <div className="gallery-confirm-actions">
                <button
                  ref={confirmCancelRef}
                  type="button"
                  disabled={deleting}
                  onClick={() => setDeleteCandidate(null)}
                >
                  {t.cancel}
                </button>
                <button
                  className="gallery-confirm-delete"
                  type="button"
                  disabled={deleting}
                  onClick={() => void handleDelete()}
                >
                  {t.confirmDelete}
                </button>
              </div>
            </div>
          </div>
        ) : null}
      </div>
    </section>
  );
}
