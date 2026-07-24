"use client";

import {
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type PointerEvent as ReactPointerEvent,
  type WheelEvent as ReactWheelEvent,
} from "react";
import { createPortal } from "react-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faPenToSquare,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faArrowLeft,
  faArrowUpFromBracket,
  faMinus,
  faPlus,
  faRotate,
} from "@fortawesome/free-solid-svg-icons";
import type {
  GalleryAsset,
  GalleryFolderRecord,
  GalleryItem,
  GalleryLayout,
} from "@/lib/gallery-types";
import {
  deleteGalleryItem,
  getGalleryAsset,
  moveGalleryItemToFolder,
  updateGalleryFolderTitle,
  updateGalleryLayout,
} from "@/lib/gallery-storage";
import {
  GalleryRenderer,
  type GalleryScreenTransform,
} from "@/lib/gallery-renderer";
import {
  calculateGalleryBounds,
  DEFAULT_GALLERY_VIEW,
  fitGalleryBounds,
  type GalleryViewState,
} from "@/lib/gallery-view";
import { GalleryPreviewImage } from "./GalleryPreviewImage";
import { useSpringValue, useSpringVector } from "./gallery-spring";

export type GalleryEntryOrigin = {
  left: number;
  top: number;
  width: number;
  height: number;
};

export type GalleryEditTarget = GalleryEntryOrigin & {
  rotation: number;
};

export type GalleryFolderDropPreview = {
  folderId: string;
  item: GalleryItem;
  source: GalleryScreenTransform;
};

type GalleryCanvasProps = {
  items: GalleryItem[];
  locale: "zh" | "en";
  entryOrigins: Record<string, GalleryEntryOrigin>;
  closing: boolean;
  holdSurfaceVisible?: boolean;
  currentFolderId: string;
  currentFolder: GalleryFolderRecord;
  initialView?: GalleryViewState;
  onViewChange: (folderId: string, view: GalleryViewState) => void;
  onItemsChange: (items: GalleryItem[]) => void;
  onItemMoved: (item: GalleryItem) => void;
  onFolderDragHover: (preview: GalleryFolderDropPreview | null) => void;
  onFolderChange: (folder: GalleryFolderRecord) => void;
  onRequestClose: () => void;
  onEntryStart: () => void;
  onEntryComplete: () => void;
  onSurfaceReady: () => void;
  onEditStart: () => void;
  onExport: (asset: GalleryAsset) => void;
  interactionBlocked?: boolean;
  resolveEditTarget: (item: GalleryItem) => GalleryEntryOrigin | null;
  onEditComplete: (asset: GalleryAsset) => Promise<void>;
  onEditHandoffComplete: () => void;
  onClose: () => void;
};

type ViewState = GalleryViewState;

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
const MAX_ASSET_PREFETCH = 24;
const COPY = {
  zh: {
    title: "贴纸画廊",
    count: (count: number) => `${count} 张贴纸`,
    exit: "退出画廊",
    saveFailed: "位置保存失败，请稍后重试",
    deleteFailed: "删除失败，请稍后重试",
    moveFailed: "移动到文件夹失败，请稍后重试",
    titleSaveFailed: "画廊标题保存失败，请稍后重试",
    editTitle: "编辑画廊标题",
    zoomIn: "放大",
    zoomOut: "缩小",
    resetView: "重置视图",
    exportSticker: "导出贴纸",
    empty: "还没添加贴纸，去其他 gallery 拖入",
  },
  en: {
    title: "Sticker Gallery",
    count: (count: number) => `${count} sticker${count === 1 ? "" : "s"}`,
    exit: "Exit gallery",
    saveFailed: "Could not save the placement. Try again in a moment.",
    deleteFailed: "Could not delete the sticker. Try again in a moment.",
    moveFailed: "Could not move the sticker into that folder. Try again.",
    titleSaveFailed: "Could not save the gallery title. Try again.",
    editTitle: "Edit gallery title",
    zoomIn: "Zoom in",
    zoomOut: "Zoom out",
    resetView: "Reset view",
    exportSticker: "Export sticker",
    empty: "No stickers yet. Drag one in from another gallery.",
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

function useElementSize<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [size, setSize] = useState<Size>({ width: 1, height: 1 });

  useEffect(() => {
    const element = ref.current;
    if (!element) return;
    const update = () => {
      setSize({
        // CSS transforms change getBoundingClientRect() during the overlay's
        // entrance spring. Canvas coordinates must stay tied to the stable
        // layout box or the preview/live handoff lands a few pixels down-right.
        width: Math.max(1, element.clientWidth),
        height: Math.max(1, element.clientHeight),
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
          const asset = await getGalleryAsset(id);
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

function GalleryDeleteControl({
  armed,
  deleting,
  onArm,
  onKeep,
  onDelete,
}: {
  armed: boolean;
  deleting: boolean;
  onArm: () => void;
  onKeep: () => void;
  onDelete: () => void;
}) {
  const { value: progress } = useSpringValue(armed ? 1 : 0, {
    initial: 0,
    mass: 0.72,
    stiffness: 285,
    damping: 22,
    precision: 0.002,
  });
  const keepWidth = 31 + progress * 45;
  const deleteWidth = 31 + progress * 45;
  // Keep the resting edit/export/delete trio centered, but converge to the
  // original compact 6px confirmation gap once the labels have expanded.
  const deleteLeft = 24 + progress * 17;
  const labelProgress = clamp((progress - 0.18) / 0.72, 0, 1);
  const iconProgress = clamp(1 - progress / 0.62, 0, 1);

  const stopPointer = (event: ReactPointerEvent<HTMLElement>) => {
    event.stopPropagation();
  };

  return (
    <div
      className="gallery-delete-control"
      data-armed={armed}
      data-gallery-control
    >
      <button
        className="gallery-delete-keep"
        type="button"
        aria-label="Keep sticker"
        aria-hidden={!armed}
        tabIndex={armed ? 0 : -1}
        disabled={deleting}
        style={{
          width: keepWidth,
          opacity: clamp(progress * 1.8, 0, 1),
          pointerEvents: armed ? "auto" : "none",
        }}
        onPointerDown={stopPointer}
        onClick={(event) => {
          event.stopPropagation();
          onKeep();
        }}
      >
        <span
          style={{
            opacity: labelProgress,
            filter: `blur(${(1 - labelProgress) * 7}px)`,
          }}
        >
          Keep
        </span>
      </button>
      <span
        className="gallery-delete-keep-hit"
        aria-hidden="true"
        style={{ pointerEvents: armed ? "auto" : "none" }}
        onPointerDown={stopPointer}
        onClick={(event) => {
          event.stopPropagation();
          onKeep();
        }}
      />
      <button
        className="gallery-delete-confirm"
        type="button"
        aria-label={armed ? "Delete sticker permanently" : "Delete sticker"}
        aria-expanded={armed}
        disabled={deleting}
        style={{
          left: deleteLeft,
          width: deleteWidth,
        }}
        onPointerDown={stopPointer}
        onClick={(event) => {
          event.stopPropagation();
          if (armed) onDelete();
          else onArm();
        }}
      >
        <FontAwesomeIcon
          icon={faTrashCan}
          style={{
            opacity: iconProgress,
            filter: `blur(${(1 - iconProgress) * 7}px)`,
            transform: `translate(-50%, -50%) scale(${0.82 + iconProgress * 0.18})`,
          }}
        />
        <span
          style={{
            opacity: labelProgress,
            filter: `blur(${(1 - labelProgress) * 7}px)`,
          }}
        >
          Delete
        </span>
      </button>
    </div>
  );
}

function GalleryItemView({
  item,
  rendererReady,
  loading,
  selected,
  zoom,
  onSelect,
  onGestureStart,
  onLayoutPreview,
  onLayoutChange,
  onRequestDelete,
  entryHidden,
  opacity,
  deleteArmed,
  deleting,
  onKeep,
  onConfirmDelete,
  editing,
  onEdit,
  onExport,
  exportLabel,
  onMovePointer,
  onMoveDrop,
  hitTestItem,
  hitTestPeel,
}: {
  item: GalleryItem;
  rendererReady: boolean;
  loading: boolean;
  selected: boolean;
  zoom: number;
  onSelect: (id: string) => void;
  onGestureStart: (id: string) => void;
  onLayoutPreview: (id: string, layout: GalleryLayout) => void;
  onLayoutChange: (id: string, layout: GalleryLayout, commit: boolean) => void;
  onRequestDelete: (id: string) => void;
  entryHidden: boolean;
  opacity: number;
  deleteArmed: boolean;
  deleting: boolean;
  onKeep: () => void;
  onConfirmDelete: () => void;
  editing: boolean;
  onEdit: (layout: GalleryLayout) => void;
  onExport: () => void;
  exportLabel: string;
  onMovePointer: (
    id: string,
    clientX: number | null,
    clientY: number | null,
  ) => void;
  onMoveDrop: (id: string, clientX: number, clientY: number) => boolean;
  hitTestItem: (id: string, clientX: number, clientY: number) => boolean;
  hitTestPeel: (id: string, clientX: number, clientY: number) => boolean;
}) {
  const [displayLayout, setDisplayLayout] = useState(item.layout);
  const gestureRef = useRef<ItemGesture | null>(null);
  const latestLayoutRef = useRef(item.layout);
  const totalRotation = item.baseTilt + displayLayout.rotation;
  const visualStyle = {
    "--gallery-item-rotation": `${totalRotation}deg`,
    "--gallery-control-counter-rotation": `${-totalRotation}deg`,
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
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    if (cancelled) {
      onMovePointer(item.id, null, null);
      latestLayoutRef.current = gesture.startLayout;
      setDisplayLayout(gesture.startLayout);
      onLayoutChange(item.id, gesture.startLayout, false);
      return;
    }
    if (
      gesture.kind === "move" &&
      onMoveDrop(item.id, event.clientX, event.clientY)
    ) {
      latestLayoutRef.current = gesture.startLayout;
      setDisplayLayout(gesture.startLayout);
      onLayoutChange(item.id, gesture.startLayout, false);
      onMovePointer(item.id, null, null);
      return;
    }
    onMovePointer(item.id, null, null);
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
      onLayoutPreview(item.id, next);
      onMovePointer(item.id, event.clientX, event.clientY);
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
      onLayoutPreview(item.id, next);
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
    onLayoutPreview(item.id, next);
  };

  const startMove = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!rendererReady || deleting || event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (target.closest("[data-gallery-control]")) return;
    // The DOM host is rectangular while the rendered sticker is not. Never
    // let a transparent part of this host select or drag it (or block a lower
    // sticker / the infinite canvas).
    if (!hitTestItem(item.id, event.clientX, event.clientY)) return;
    // The outline is the peel handle. Let the viewport own this press before
    // the rectangular move zone gets a chance to capture it.
    if (hitTestPeel(item.id, event.clientX, event.clientY)) return;
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
        opacity,
        ...visualStyle,
      }}
      onPointerDownCapture={startMove}
      onPointerMoveCapture={updateGesture}
      onPointerUpCapture={(event) => finishGesture(event)}
      onPointerCancelCapture={(event) => finishGesture(event, true)}
    >
      {!entryHidden && loading && !rendererReady ? (
        <span className="gallery-loading-ring" aria-hidden="true" />
      ) : null}
      {selected && rendererReady && !editing && !deleting ? (
        <div className="gallery-selection-frame" aria-label={item.title}>
          <span className="gallery-rotation-stem" aria-hidden="true" />
          <button
            className="gallery-rotate-handle"
            type="button"
            data-gallery-control
            aria-label="Rotate sticker"
            onPointerDown={startRotate}
          >
            <FontAwesomeIcon icon={faRotate} />
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
          <GalleryDeleteControl
            armed={deleteArmed}
            deleting={deleting}
            onArm={() => onRequestDelete(item.id)}
            onKeep={onKeep}
            onDelete={onConfirmDelete}
          />
          <div className="gallery-edit-control" data-gallery-control>
            <button
              className="gallery-edit-button"
              type="button"
              aria-label="Edit sticker"
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onEdit(latestLayoutRef.current);
              }}
            >
              <FontAwesomeIcon icon={faPenToSquare} />
            </button>
          </div>
          <div className="gallery-export-control" data-gallery-control>
            <button
              className="gallery-export-button"
              type="button"
              aria-label={exportLabel}
              onPointerDown={(event) => event.stopPropagation()}
              onClick={(event) => {
                event.stopPropagation();
                onExport();
              }}
            >
              <FontAwesomeIcon icon={faArrowUpFromBracket} />
            </button>
          </div>
        </div>
      ) : null}
    </div>
  );
}

function GalleryEditMotion({
  item,
  target,
  viewport,
  view,
  onFrame,
  onSettled,
}: {
  item: GalleryItem;
  target: GalleryEditTarget;
  viewport: Size;
  view: ViewState;
  onFrame: (id: string, transform: GalleryScreenTransform) => void;
  onSettled: () => void;
}) {
  const initial = galleryScreenTarget(item, viewport, view);
  const { values, settled } = useSpringVector(
    [target.left, target.top, target.width, target.height, target.rotation],
    {
      initial: [
        initial.left,
        initial.top,
        initial.width,
        initial.height,
        initial.rotation,
      ],
      mass: 0.95,
      stiffness: 168,
      damping: 22,
      precision: 0.01,
    },
  );
  const [left, top, width, height, rotation] = values;

  useEffect(() => {
    onFrame(item.id, { left, top, width, height, rotation });
  }, [height, item.id, left, onFrame, rotation, top, width]);

  useEffect(() => {
    if (settled) onSettled();
  }, [onSettled, settled]);

  return null;
}

function galleryScreenTarget(
  item: GalleryItem,
  viewport: Size,
  view: ViewState,
): GalleryScreenTransform {
  const width = item.layout.width * view.zoom * 0.78;
  const height = item.layout.height * view.zoom * 0.58;
  return {
    left:
      viewport.width / 2 +
      (item.layout.x - view.x) * view.zoom -
      width / 2,
    top:
      viewport.height / 2 +
      (item.layout.y - view.y) * view.zoom -
      height / 2,
    width,
    height,
    rotation: previewRotation(item),
  };
}

function GalleryTransitionMotion({
  item,
  origin,
  viewport,
  view,
  phase,
  onFrame,
  onSettled,
}: {
  item: GalleryItem;
  origin: GalleryEntryOrigin;
  viewport: Size;
  view: ViewState;
  phase: "enter" | "exit";
  onFrame: (id: string, transform: GalleryScreenTransform) => void;
  onSettled: (id: string) => void;
}) {
  const screenTarget = galleryScreenTarget(item, viewport, view);
  const folderTarget = {
    left: origin.left,
    top: origin.top,
    width: origin.width,
    height: origin.height,
    rotation: 0,
  };
  const initialTransform = phase === "enter" ? folderTarget : screenTarget;
  const targetTransform = phase === "enter" ? screenTarget : folderTarget;
  const { values, settled } = useSpringVector(
    [
      targetTransform.left,
      targetTransform.top,
      targetTransform.width,
      targetTransform.height,
      targetTransform.rotation,
    ],
    {
      initial: [
        initialTransform.left,
        initialTransform.top,
        initialTransform.width,
        initialTransform.height,
        initialTransform.rotation,
      ],
      mass: 1,
      stiffness: 176,
      damping: 22,
      precision: 0.01,
    },
  );

  const [left, top, width, height, rotation] = values;
  useEffect(() => {
    onFrame(item.id, { left, top, width, height, rotation });
  }, [height, item.id, left, onFrame, rotation, top, width]);

  useEffect(() => {
    if (settled) onSettled(item.id);
  }, [item.id, onSettled, settled]);

  return null;
}

function DirectFolderExitMotion({
  item,
  flightLayer,
  viewport,
  view,
  onSettled,
}: {
  item: GalleryItem;
  flightLayer: HTMLElement;
  viewport: Size;
  view: ViewState;
  onSettled: (id: string) => void;
}) {
  const folder = flightLayer.getBoundingClientRect();
  const initial = galleryScreenTarget(item, viewport, view);
  const aspect = initial.width / Math.max(1, initial.height);
  const targetMaxWidth = Math.min(folder.width * 0.78, initial.width * 0.34);
  const targetMaxHeight = Math.min(folder.height * 0.72, initial.height * 0.34);
  let targetWidth = targetMaxWidth;
  let targetHeight = targetWidth / Math.max(0.05, aspect);
  if (targetHeight > targetMaxHeight) {
    targetHeight = targetMaxHeight;
    targetWidth = targetHeight * aspect;
  }
  const target = {
    left: folder.left + (folder.width - targetWidth) / 2,
    top: folder.top + folder.height * 0.54 - targetHeight / 2,
    width: targetWidth,
    height: targetHeight,
    rotation: 0,
  };
  const travel = Math.hypot(
    target.left - initial.left,
    target.top - initial.top,
  );
  const arcHeight = clamp(travel * 0.2, 72, 210);
  const { value: progress, settled } = useSpringValue(1, {
    initial: 0,
    mass: 0.82,
    stiffness: 176,
    damping: 23,
    precision: 0.002,
  });
  const clampedProgress = clamp(progress, 0, 1);
  const arc = 4 * clampedProgress * (1 - clampedProgress) * arcHeight;
  const left =
    initial.left -
    folder.left +
    (target.left - initial.left) * clampedProgress;
  const top =
    initial.top -
    folder.top +
    (target.top - initial.top) * clampedProgress -
    arc;
  const width =
    initial.width + (target.width - initial.width) * clampedProgress;
  const height =
    initial.height + (target.height - initial.height) * clampedProgress;
  const rotation =
    initial.rotation +
    (target.rotation - initial.rotation) * clampedProgress;

  useEffect(() => {
    if (settled) onSettled(item.id);
  }, [item.id, onSettled, settled]);

  return createPortal(
    <GalleryPreviewImage
      itemId={item.id}
      className="gallery-folder-direct-flight"
      alt=""
      draggable={false}
      style={{
        left,
        top,
        width,
        height,
        transform: `rotate(${rotation}deg)`,
      }}
    />,
    flightLayer,
  );
}

function GalleryTransitionMotions({
  items,
  origins,
  viewport,
  view,
  phase,
  exitMode = "preview",
  folderFlightLayer,
  onFrame,
  onSettled,
}: {
  items: GalleryItem[];
  origins: Record<string, GalleryEntryOrigin>;
  viewport: Size;
  view: ViewState;
  phase: "enter" | "exit";
  exitMode?: "preview" | "folder";
  folderFlightLayer?: HTMLElement | null;
  onFrame: (id: string, transform: GalleryScreenTransform) => void;
  onSettled: (id: string) => void;
}) {
  return (
    <>
      {items.slice(0, 10).map((item) => {
        if (phase === "exit" && exitMode === "folder" && folderFlightLayer) {
          return (
            <DirectFolderExitMotion
              key={`${phase}-folder-${item.id}`}
              item={item}
              flightLayer={folderFlightLayer}
              viewport={viewport}
              view={view}
              onSettled={onSettled}
            />
          );
        }
        const origin = origins[item.id];
        if (!origin) return null;
        return (
          <GalleryTransitionMotion
            key={`${phase}-${item.id}`}
            item={item}
            origin={origin}
            viewport={viewport}
            view={view}
            phase={phase}
            onFrame={onFrame}
            onSettled={onSettled}
          />
        );
      })}
    </>
  );
}

export function GalleryCanvas({
  items: initialItems,
  locale,
  entryOrigins,
  closing,
  holdSurfaceVisible = false,
  currentFolderId,
  currentFolder,
  initialView,
  onViewChange,
  onItemsChange,
  onItemMoved,
  onFolderDragHover,
  onFolderChange,
  onRequestClose,
  onEntryStart,
  onEntryComplete,
  onSurfaceReady,
  onEditStart,
  onExport,
  interactionBlocked = false,
  resolveEditTarget,
  onEditComplete,
  onEditHandoffComplete,
  onClose,
}: GalleryCanvasProps) {
  const t = COPY[locale];
  const { ref: viewportRef, size: viewport } = useElementSize<HTMLDivElement>();
  const [items, setItems] = useState(initialItems);
  const itemsRef = useRef(items);
  const [view, setView] = useState<ViewState>(
    initialView ?? DEFAULT_GALLERY_VIEW,
  );
  const [viewInitialized, setViewInitialized] = useState(Boolean(initialView));
  const initialBoundsRef = useRef<
    ReturnType<typeof calculateGalleryBounds> | undefined
  >(undefined);
  if (initialBoundsRef.current === undefined) {
    // A restored view never needs a bounds scan. A first-open view scans once
    // and reuses the result when the viewport measurement becomes available.
    initialBoundsRef.current = initialView
      ? null
      : calculateGalleryBounds(initialItems);
  }
  const [liveIds, setLiveIds] = useState<Set<string>>(() => new Set());
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [deleteCandidate, setDeleteCandidate] = useState<string | null>(null);
  const [deleting, setDeleting] = useState(false);
  const [editTransition, setEditTransition] = useState<{
    item: GalleryItem;
    asset: GalleryAsset;
    target: GalleryEditTarget;
    folderFlightLayer: HTMLElement | null;
  } | null>(null);
  const [editHandoffReady, setEditHandoffReady] = useState(false);
  const [dropVisual, setDropVisual] = useState<{
    itemId: string;
    active: boolean;
  } | null>(null);
  const [statusMessage, setStatusMessage] = useState("");
  const [titleEditing, setTitleEditing] = useState(false);
  const [titleDraft, setTitleDraft] = useState(currentFolder.title);
  const titleInputRef = useRef<HTMLInputElement>(null);
  const [previewReadyIds, setPreviewReadyIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [exitSettledIds, setExitSettledIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [entryPendingIds, setEntryPendingIds] = useState<Set<string>>(
    () =>
      new Set(
        initialItems
          .slice(0, 10)
          .filter((item) => entryOrigins[item.id])
          .map((item) => item.id),
      ),
  );
  const [transitionItems] = useState(() =>
    initialItems
      .slice(0, 10)
      .filter((item) => Boolean(entryOrigins[item.id])),
  );
  const [transitionIds] = useState(
    () => new Set(transitionItems.map((item) => item.id)),
  );
  const exitTransitionItems = useMemo(
    () => items.filter((item) => transitionIds.has(item.id)),
    [items, transitionIds],
  );
  const editExitTransitionItems = useMemo(
    () =>
      editTransition
        ? exitTransitionItems.filter(
            (item) => item.id !== editTransition.item.id,
          )
        : [],
    [editTransition, exitTransitionItems],
  );
  const entryStarted =
    !closing &&
    viewport.width > 1 &&
    viewport.height > 1 &&
    transitionItems.every((item) => previewReadyIds.has(item.id));
  const closedRef = useRef(false);
  const overlayRef = useRef<HTMLElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rendererRef = useRef<GalleryRenderer | null>(null);
  const layoutVersionRef = useRef(new Map<string, number>());
  const layoutSaveChainsRef = useRef(new Map<string, Promise<void>>());
  const transientLayoutsRef = useRef(new Map<string, GalleryLayout>());
  const panRef = useRef<{
    pointerId: number;
    startClientX: number;
    startClientY: number;
    startView: ViewState;
  } | null>(null);
  const peelPointerRef = useRef<{
    pointerId: number;
    itemId: string;
    startClientX: number;
    startClientY: number;
    moved: boolean;
  } | null>(null);
  const { value: presence, settled: presenceSettled } = useSpringValue(
    closing ? 0 : 1,
    {
      initial: 0,
      mass: 1,
      stiffness: 210,
      damping: 27,
      precision: 0.002,
    },
  );
  const { value: editPresence } = useSpringValue(editTransition ? 0 : 1, {
    initial: 1,
    mass: 0.88,
    stiffness: 205,
    damping: 24,
    precision: 0.002,
  });
  const { value: editHandoffOpacity, settled: editHandoffSettled } =
    useSpringValue(editHandoffReady ? 0 : 1, {
      initial: 1,
      mass: 0.68,
      stiffness: 380,
      damping: 30,
      precision: 0.002,
    });
  const { value: dropVisualProgress } = useSpringValue(
    dropVisual?.active ? 1 : 0,
    {
      initial: 0,
      mass: 0.7,
      stiffness: 340,
      damping: 25,
      precision: 0.002,
    },
  );
  const combinedPresence = Math.min(presence, editPresence);
  const surfacePresence = holdSurfaceVisible && !closing
    ? 1
    : combinedPresence;
  const editCompleteRef = useRef(false);
  const editHandoffCompleteRef = useRef(false);

  useLayoutEffect(() => {
    if (
      viewInitialized ||
      viewport.width <= 1 ||
      viewport.height <= 1
    ) {
      return;
    }
    setView(fitGalleryBounds(initialBoundsRef.current ?? null, viewport));
    setViewInitialized(true);
  }, [viewInitialized, viewport]);

  useEffect(() => {
    if (!viewInitialized) return;
    onViewChange(currentFolderId, view);
  }, [currentFolderId, onViewChange, view, viewInitialized]);

  useEffect(() => {
    if (!titleEditing) return;
    titleInputRef.current?.focus({ preventScroll: true });
    titleInputRef.current?.select();
  }, [titleEditing]);

  const saveFolderTitle = useCallback(async () => {
    if (!titleEditing || currentFolder.isDefault) return;
    setTitleEditing(false);
    try {
      const updated = await updateGalleryFolderTitle(
        currentFolder.id,
        titleDraft,
      );
      setTitleDraft(updated.title);
      onFolderChange(updated);
    } catch {
      setTitleDraft(currentFolder.title);
      setStatusMessage(t.titleSaveFailed);
    }
  }, [
    currentFolder.id,
    currentFolder.isDefault,
    currentFolder.title,
    onFolderChange,
    t.titleSaveFailed,
    titleDraft,
    titleEditing,
  ]);
  useEffect(() => {
    if (!holdSurfaceVisible || !presenceSettled || presence < 0.999) return;
    onSurfaceReady();
  }, [holdSurfaceVisible, onSurfaceReady, presence, presenceSettled]);

  useEffect(() => {
    const previousFocus = document.activeElement;
    overlayRef.current?.focus({ preventScroll: true });
    return () => {
      if (previousFocus instanceof HTMLElement && previousFocus.isConnected) {
        previousFocus.focus({ preventScroll: true });
      }
    };
  }, []);

  const previewPriorityIds = useMemo(
    () => initialItems.slice(0, 10).map((item) => item.id),
    [initialItems],
  );
  const entryStartNotifiedRef = useRef(false);
  const entryCompleteNotifiedRef = useRef(false);

  useEffect(() => {
    if (!entryStarted || entryStartNotifiedRef.current) return;
    entryStartNotifiedRef.current = true;
    onEntryStart();
  }, [entryStarted, onEntryStart]);

  useEffect(() => {
    if (
      !entryStarted ||
      entryPendingIds.size > 0 ||
      entryCompleteNotifiedRef.current
    ) {
      return;
    }
    entryCompleteNotifiedRef.current = true;
    onEntryComplete();
  }, [entryPendingIds, entryStarted, onEntryComplete]);

  const visibleItems = useMemo(
    () => {
      const visible = items
        .filter((item) => isItemVisible(item, view, viewport))
        .sort((a, b) => itemDistance(a, view) - itemDistance(b, view))
        .slice(0, MAX_VISIBLE_PREVIEWS);
      const visibleIds = new Set(visible.map((item) => item.id));
      for (const item of items) {
        if (!transitionIds.has(item.id) || visibleIds.has(item.id)) continue;
        visible.push(item);
      }
      return visible;
    },
    [items, transitionIds, view, viewport],
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
      editTransition ||
      view.zoom < INTERACTIVE_ZOOM_THRESHOLD
    ) {
      return new Set<string>();
    }
    const maxRenderers = viewport.width < 720 ? 10 : 18;
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
    editTransition,
    entryPendingIds,
    presenceSettled,
    selectedId,
    view,
    viewport.width,
    visibleItems,
  ]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const renderer = new GalleryRenderer(
      canvas,
      setLiveIds,
      setPreviewReadyIds,
    );
    for (const item of transitionItems) {
      const origin = entryOrigins[item.id];
      if (!origin) continue;
      renderer.setEntryTransform(item.id, {
        ...origin,
        rotation: 0,
      });
    }
    rendererRef.current = renderer;
    return () => {
      rendererRef.current = null;
      renderer.destroy();
    };
  }, [entryOrigins, transitionItems]);

  useEffect(() => {
    rendererRef.current?.resize(viewport.width, viewport.height);
  }, [viewport.height, viewport.width]);

  useEffect(() => {
    rendererRef.current?.setView(view);
  }, [view]);

  useEffect(() => {
    rendererRef.current?.sync(
      visibleItems.map((item) => ({
        item: transientLayoutsRef.current.has(item.id)
          ? {
              ...item,
              layout: transientLayoutsRef.current.get(item.id)!,
            }
          : item,
        asset: assets[item.id],
        interactive: interactiveIds.has(item.id),
        hidden: false,
        opacity:
          (editTransition
            ? item.id === editTransition.item.id
              ? 1
              : transitionIds.has(item.id)
                ? editTransition.folderFlightLayer ||
                  exitSettledIds.has(item.id)
                  ? 0
                  : 1
                : combinedPresence
            : transitionIds.has(item.id)
              ? 1
              : presence) *
          (editTransition?.item.id === item.id ? editHandoffOpacity : 1) *
          (dropVisual?.itemId === item.id
            ? 1 - Math.min(1, Math.max(0, dropVisualProgress))
            : 1),
      })),
    );
  }, [
    assets,
    combinedPresence,
    dropVisual,
    dropVisualProgress,
    editHandoffOpacity,
    editTransition,
    exitSettledIds,
    interactiveIds,
    presence,
    transitionIds,
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
        const item = await updateGalleryLayout(id, layout);
        if (layoutVersionRef.current.get(id) === version) {
          updateItems((current) =>
            current.map((currentItem) =>
              currentItem.id === id ? item : currentItem,
            ),
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
    const item = itemsRef.current.find((current) => current.id === id);
    if (item) transientLayoutsRef.current.set(id, item.layout);
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
      transientLayoutsRef.current.delete(id);
      if (commit) queueLayoutSave(id, layout, version);
    },
    [queueLayoutSave, updateItems],
  );

  const handleLayoutPreview = useCallback((id: string, layout: GalleryLayout) => {
    transientLayoutsRef.current.set(id, layout);
    rendererRef.current?.updateLayout(id, layout);
  }, []);

  const folderAtPoint = useCallback(
    (clientX: number, clientY: number) => {
      for (const element of document.elementsFromPoint(clientX, clientY)) {
        const folder = (element as HTMLElement).closest<HTMLElement>(
          "[data-gallery-folder-id]",
        );
        const folderId = folder?.dataset.galleryFolderId;
        if (folderId && folderId !== currentFolderId) return folderId;
      }
      return null;
    },
    [currentFolderId],
  );

  const handleMovePointer = useCallback(
    (id: string, clientX: number | null, clientY: number | null) => {
      const folderId =
        clientX === null || clientY === null
          ? null
          : folderAtPoint(clientX, clientY);
      if (!folderId) {
        setDropVisual((current) =>
          current?.itemId === id ? { ...current, active: false } : current,
        );
        onFolderDragHover(null);
        return;
      }
      const item = itemsRef.current.find((current) => current.id === id);
      if (!item) return;
      const currentItem = transientLayoutsRef.current.has(id)
        ? { ...item, layout: transientLayoutsRef.current.get(id)! }
        : item;
      setDropVisual((current) =>
        current?.itemId === id && current.active
          ? current
          : { itemId: id, active: true },
      );
      onFolderDragHover({
        folderId,
        item: currentItem,
        source: galleryScreenTarget(currentItem, viewport, view),
      });
    },
    [folderAtPoint, onFolderDragHover, view, viewport],
  );

  const handleMoveDrop = useCallback(
    (id: string, clientX: number, clientY: number) => {
      const folderId = folderAtPoint(clientX, clientY);
      setDropVisual((current) =>
        current?.itemId === id ? { ...current, active: false } : current,
      );
      onFolderDragHover(null);
      if (!folderId) return false;
      void (async () => {
        try {
          const updated = await moveGalleryItemToFolder(id, folderId);
          transientLayoutsRef.current.delete(id);
          updateItems((current) => current.filter((item) => item.id !== id));
          setSelectedId((selected) => (selected === id ? null : selected));
          onItemMoved(updated);
        } catch {
          setStatusMessage(t.moveFailed);
        }
      })();
      return true;
    },
    [folderAtPoint, onFolderDragHover, onItemMoved, t.moveFailed, updateItems],
  );

  const hitTestItem = useCallback(
    (id: string, clientX: number, clientY: number) =>
      rendererRef.current?.pickSticker(clientX, clientY) === id,
    [],
  );

  const hitTestPeel = useCallback(
    (id: string, clientX: number, clientY: number) =>
      rendererRef.current?.pickPeelTarget(clientX, clientY) === id,
    [],
  );

  const handleEntryFrame = useCallback(
    (id: string, transform: GalleryScreenTransform) => {
      rendererRef.current?.setEntryTransform(id, transform);
    },
    [],
  );

  const handleEntrySettled = useCallback((id: string) => {
    rendererRef.current?.clearEntryTransform(id);
    setEntryPendingIds((current) => {
      if (!current.has(id)) return current;
      const next = new Set(current);
      next.delete(id);
      return next;
    });
  }, []);

  const handleExitSettled = useCallback((id: string) => {
    setExitSettledIds((current) => {
      if (current.has(id)) return current;
      const next = new Set(current);
      next.add(id);
      return next;
    });
  }, []);

  const handleDelete = async () => {
    const id = deleteCandidate;
    if (!id || deleting) return;
    setDeleting(true);
    try {
      await rendererRef.current?.tearAwayForDelete(id);
      await deleteGalleryItem(id);
      updateItems((current) => current.filter((item) => item.id !== id), true);
      setSelectedId((selected) => (selected === id ? null : selected));
      setDeleteCandidate(null);
    } catch {
      rendererRef.current?.restoreAfterDelete(id);
      setStatusMessage(t.deleteFailed);
    } finally {
      setDeleting(false);
    }
  };

  const handleEdit = useCallback(
    (item: GalleryItem) => {
      if (closing || editTransition) return;
      const asset = assets[item.id];
      if (!asset) return;
      const visualRotation = previewRotation(item);
      const editableAsset: GalleryAsset = {
        ...asset,
        options: {
          ...asset.options,
          // Gallery screen rotation is clockwise-positive because its Three.js
          // world is projected through an inverted Y axis. The editor tilt is
          // counter-clockwise-positive, so preserve the visual angle by
          // crossing the coordinate-system boundary with the opposite sign.
          tilt: -visualRotation,
        },
      };
      const targetRect = resolveEditTarget(item);
      if (!targetRect) return;
      const target: GalleryEditTarget = {
        ...targetRect,
        rotation: visualRotation,
      };
      const folderFlightLayer = document.querySelector<HTMLElement>(
        `[data-gallery-folder-id="${currentFolderId}"] .gallery-folder-flight-layer`,
      );
      editCompleteRef.current = false;
      editHandoffCompleteRef.current = false;
      setEditHandoffReady(false);
      setDeleteCandidate(null);
      setSelectedId(item.id);
      setEditTransition({
        item,
        asset: editableAsset,
        target,
        folderFlightLayer,
      });
      onEditStart();
    },
    [
      assets,
      closing,
      currentFolderId,
      editTransition,
      onEditStart,
      resolveEditTarget,
    ],
  );

  const handleExport = useCallback(
    (item: GalleryItem) => {
      const asset = assets[item.id];
      if (!asset) return;
      setDeleteCandidate(null);
      onExport(asset);
    },
    [assets, onExport],
  );

  const handleEditSettled = useCallback(() => {
    if (!editTransition || editCompleteRef.current) return;
    editCompleteRef.current = true;
    void onEditComplete(editTransition.asset).then(() => {
      setEditHandoffReady(true);
    });
  }, [editTransition, onEditComplete]);

  useEffect(() => {
    if (
      !editHandoffReady ||
      !editHandoffSettled ||
      editHandoffOpacity > 0.002 ||
      editExitTransitionItems.some(
        (item) => !exitSettledIds.has(item.id),
      ) ||
      editHandoffCompleteRef.current
    ) {
      return;
    }
    editHandoffCompleteRef.current = true;
    onEditHandoffComplete();
  }, [
    editHandoffOpacity,
    editHandoffReady,
    editHandoffSettled,
    editExitTransitionItems,
    exitSettledIds,
    onEditHandoffComplete,
  ]);

  const startPan = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (deleting || event.button !== 0) return;
    const target = event.target as HTMLElement;
    if (titleEditing && !target.closest(".gallery-header")) {
      titleInputRef.current?.blur();
    }
    if (target.closest("[data-gallery-ui]")) {
      return;
    }
    const peeledId = rendererRef.current?.startPeel(
      event.clientX,
      event.clientY,
      event.pointerId,
      event.timeStamp,
    );
    if (peeledId) {
      event.preventDefault();
      peelPointerRef.current = {
        pointerId: event.pointerId,
        itemId: peeledId,
        startClientX: event.clientX,
        startClientY: event.clientY,
        moved: false,
      };
      event.currentTarget.setPointerCapture(event.pointerId);
      return;
    }
    const hitId = rendererRef.current?.pickSticker(
      event.clientX,
      event.clientY,
    );
    if (hitId) {
      event.preventDefault();
      setDeleteCandidate(null);
      setSelectedId(hitId);
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
    const peelPointer = peelPointerRef.current;
    if (peelPointer?.pointerId === event.pointerId) {
      event.preventDefault();
      if (
        Math.hypot(
          event.clientX - peelPointer.startClientX,
          event.clientY - peelPointer.startClientY,
        ) >= 5
      ) {
        peelPointer.moved = true;
      }
      rendererRef.current?.movePeel(
        event.clientX,
        event.clientY,
        event.pointerId,
        event.timeStamp,
      );
      return;
    }
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
    const peelPointer = peelPointerRef.current;
    if (peelPointer?.pointerId === event.pointerId) {
      rendererRef.current?.endPeel(event.pointerId, event.timeStamp);
      peelPointerRef.current = null;
      if (!peelPointer.moved && event.type === "pointerup") {
        setDeleteCandidate(null);
        setSelectedId(peelPointer.itemId);
      }
      if (event.currentTarget.hasPointerCapture(event.pointerId)) {
        event.currentTarget.releasePointerCapture(event.pointerId);
      }
      return;
    }
    if (panRef.current?.pointerId !== event.pointerId) return;
    panRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const handleWheel = (event: ReactWheelEvent<HTMLDivElement>) => {
    if (deleting) return;
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
    if (deleting) return;
    setView((current) => ({
      ...current,
      zoom: clamp(current.zoom * factor, MIN_ZOOM, MAX_ZOOM),
    }));
  };

  const requestClose = useCallback(() => {
    if (
      closing ||
      deleting ||
      editTransition ||
      !entryCompleteNotifiedRef.current
    ) return;
    setSelectedId(null);
    setDeleteCandidate(null);
    onRequestClose();
  }, [closing, deleting, editTransition, onRequestClose]);

  useEffect(() => {
    if (!closing || !presenceSettled || closedRef.current) return;
    // A sticker can be deleted or moved after the entry set was captured.
    // Such an item has no exit motion and must not keep the gallery mounted
    // forever at the folder target coordinates.
    const exitComplete = exitTransitionItems.every((item) =>
      exitSettledIds.has(item.id),
    );
    if (!exitComplete) return;
    closedRef.current = true;
    onItemsChange(itemsRef.current);
    onClose();
  }, [
    closing,
    exitTransitionItems,
    exitSettledIds,
    onClose,
    onItemsChange,
    presenceSettled,
  ]);

  useEffect(() => {
    if (interactionBlocked) return;
    const handleKeyDown = (event: KeyboardEvent) => {
      if (deleting || editTransition) return;
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
  }, [
    deleteCandidate,
    deleting,
    editTransition,
    interactionBlocked,
    requestClose,
    selectedId,
  ]);

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
        "--gallery-presence": surfacePresence,
        pointerEvents: interactionBlocked || editTransition ? "none" : "auto",
      } as CSSProperties}
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
        <div
          className="gallery-background"
          aria-hidden="true"
          style={{ opacity: surfacePresence }}
        />
        <div className="gallery-grid" aria-hidden="true" />
        <canvas ref={canvasRef} className="gallery-shared-canvas" aria-hidden="true" />
        <header
          className="gallery-header"
          data-gallery-ui
          style={{ opacity: surfacePresence }}
        >
          <button
            className="gallery-back-button"
            type="button"
            aria-label={t.exit}
            onClick={requestClose}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </button>
          {titleEditing && !currentFolder.isDefault ? (
            <input
              ref={titleInputRef}
              className="gallery-title-input"
              value={titleDraft}
              maxLength={80}
              aria-label={t.editTitle}
              onChange={(event) => setTitleDraft(event.target.value)}
              onBlur={() => void saveFolderTitle()}
              onKeyDown={(event) => {
                if (event.key === "Enter") {
                  event.preventDefault();
                  event.currentTarget.blur();
                } else if (event.key === "Escape") {
                  event.preventDefault();
                  event.stopPropagation();
                  setTitleDraft(currentFolder.title);
                  setTitleEditing(false);
                }
              }}
            />
          ) : currentFolder.isDefault ? (
            <h1 className="gallery-title">{currentFolder.title}</h1>
          ) : (
            <button
              className="gallery-title gallery-title-editable"
              type="button"
              aria-label={`${t.editTitle}: ${currentFolder.title}`}
              onClick={() => setTitleEditing(true)}
            >
              {currentFolder.title}
            </button>
          )}
        </header>
        {items.length === 0 ? (
          <div
            className="gallery-empty-state"
            style={{ opacity: combinedPresence }}
          >
            {t.empty}
          </div>
        ) : null}
        <div className="gallery-world" style={worldStyle}>
          {visibleItems.map((item) => (
            <GalleryItemView
              key={item.id}
              item={item}
              rendererReady={liveIds.has(item.id)}
              loading={interactiveIds.has(item.id)}
              selected={selectedId === item.id}
              zoom={view.zoom}
              onSelect={setSelectedId}
              onGestureStart={handleGestureStart}
              onLayoutPreview={handleLayoutPreview}
              onLayoutChange={handleLayoutChange}
              onRequestDelete={setDeleteCandidate}
              entryHidden={entryPendingIds.has(item.id)}
              opacity={
                (editTransition
                  ? item.id === editTransition.item.id
                    ? 1
                    : transitionIds.has(item.id)
                      ? editTransition.folderFlightLayer ||
                        exitSettledIds.has(item.id)
                        ? 0
                        : 1
                      : combinedPresence
                  : transitionIds.has(item.id)
                    ? 1
                    : presence) *
                (editTransition?.item.id === item.id
                  ? editHandoffOpacity
                  : 1) *
                (dropVisual?.itemId === item.id
                  ? 1 - Math.min(1, Math.max(0, dropVisualProgress))
                  : 1)
              }
              deleteArmed={deleteCandidate === item.id}
              deleting={deleting && deleteCandidate === item.id}
              onKeep={() => setDeleteCandidate(null)}
              onConfirmDelete={() => void handleDelete()}
              editing={Boolean(editTransition)}
              onEdit={(layout) => handleEdit({ ...item, layout })}
              onExport={() => handleExport(item)}
              exportLabel={t.exportSticker}
              onMovePointer={handleMovePointer}
              onMoveDrop={handleMoveDrop}
              hitTestItem={hitTestItem}
              hitTestPeel={hitTestPeel}
            />
          ))}
        </div>

        {entryStarted && !closing ? (
          <GalleryTransitionMotions
            items={items.filter((item) => entryPendingIds.has(item.id))}
            origins={entryOrigins}
            viewport={viewport}
            view={view}
            phase="enter"
            onFrame={handleEntryFrame}
            onSettled={handleEntrySettled}
          />
        ) : null}

        {closing ? (
          <GalleryTransitionMotions
            items={exitTransitionItems.filter(
              (item) => !exitSettledIds.has(item.id),
            )}
            origins={entryOrigins}
            viewport={viewport}
            view={view}
            phase="exit"
            onFrame={handleEntryFrame}
            onSettled={handleExitSettled}
          />
        ) : null}

        {editTransition ? (
          <GalleryTransitionMotions
            items={editExitTransitionItems.filter(
              (item) => !exitSettledIds.has(item.id),
            )}
            origins={entryOrigins}
            viewport={viewport}
            view={view}
            phase="exit"
            exitMode="folder"
            folderFlightLayer={editTransition.folderFlightLayer}
            onFrame={handleEntryFrame}
            onSettled={handleExitSettled}
          />
        ) : null}

        {editTransition ? (
          <GalleryEditMotion
            item={editTransition.item}
            target={editTransition.target}
            viewport={viewport}
            view={view}
            onFrame={handleEntryFrame}
            onSettled={handleEditSettled}
          />
        ) : null}

        <div
          className="gallery-view-controls"
          data-gallery-ui
          style={{ opacity: surfacePresence }}
        >
          <button type="button" onClick={() => zoomBy(1 / 1.28)} aria-label={t.zoomOut}>
            <FontAwesomeIcon icon={faMinus} />
          </button>
          <button
            className="gallery-zoom-value"
            type="button"
            onClick={() => setView(DEFAULT_GALLERY_VIEW)}
            aria-label={t.resetView}
          >
            {Math.round(view.zoom * 100)}%
          </button>
          <button type="button" onClick={() => zoomBy(1.28)} aria-label={t.zoomIn}>
            <FontAwesomeIcon icon={faPlus} />
          </button>
        </div>

        {statusMessage ? (
          <span className="sr-only" aria-live="polite">
            {statusMessage}
          </span>
        ) : null}

      </div>
    </section>
  );
}
