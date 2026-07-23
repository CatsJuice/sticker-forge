"use client";

import {
  forwardRef,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
  type ReactNode,
} from "react";
import type { GalleryItem } from "@/lib/gallery-types";
import type {
  GalleryEntryOrigin,
  GalleryFolderDropPreview,
} from "./GalleryCanvas";
import { GalleryPreviewImage } from "./GalleryPreviewImage";
import { useSpringValue, useSpringVector } from "./gallery-spring";

type GalleryFolderProps = {
  items: GalleryItem[];
  locale: "zh" | "en";
  loading?: boolean;
  interactionDisabled?: boolean;
  variant?: "launcher" | "exit";
  folderId?: string;
  color?: string;
  dropOpen?: boolean;
  dropPreview?: GalleryFolderDropPreview | null;
  showPreviews?: boolean;
  collapsePreviewsImmediately?: boolean;
  receiving?: boolean;
  receivingItemId?: string;
  flight?: ReactNode;
  onReceiveClosed?: () => void;
  onPreviewEdit?: (item: GalleryItem, origin: GalleryEntryOrigin) => void;
  onOpen: (origins: Record<string, GalleryEntryOrigin>) => void;
};

const COPY = {
  zh: {
    open: "打开贴纸画廊",
    exit: "退出贴纸画廊",
  },
  en: {
    open: "Open sticker gallery",
    exit: "Exit sticker gallery",
  },
} as const;

const FOLDER_WIDTH = 68;
const FOLDER_HEIGHT = 50;
const EXPANDED_MAX_HEIGHT = 100;
const EXPANDED_GAP = 10;
const EXPANDED_BOTTOM = 48;
const COLLAPSED_MAX_WIDTH = 46;
const COLLAPSED_MAX_HEIGHT = 54;
const COLLAPSED_TOP_EXPOSURE_MIN = 0.34;
const COLLAPSED_TOP_EXPOSURE_MAX = 0.48;
const COLLAPSED_SIDE_PADDING = 1.5;
const COLLAPSED_LANES = [0.08, 0.92, 0.32, 0.7, 0.17, 0.83, 0.46, 0.58, 0.02, 0.98];

function shadeHex(hex: string, amount: number) {
  const value = hex.replace("#", "");
  const normalized = value.length === 3
    ? value.split("").map((character) => character + character).join("")
    : value.padEnd(6, "0").slice(0, 6);
  const channels = [0, 2, 4].map((offset) =>
    Number.parseInt(normalized.slice(offset, offset + 2), 16),
  );
  return `#${channels.map((channel) => {
    const target = amount < 0 ? 0 : 255;
    const next = Math.round(channel + (target - channel) * Math.abs(amount));
    return next.toString(16).padStart(2, "0");
  }).join("")}`;
}

function seededFraction(value: string, salt: number) {
  let hash = 2166136261 ^ salt;
  for (let index = 0; index < value.length; index += 1) {
    hash ^= value.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  return (hash >>> 0) / 4_294_967_295;
}

function containedSize(
  aspect: number,
  maxWidth: number,
  maxHeight: number,
) {
  const safeAspect = Math.max(0.05, aspect);
  let width = maxWidth;
  let height = width / safeAspect;
  if (height > maxHeight) {
    height = maxHeight;
    width = height * safeAspect;
  }
  return { width, height };
}

function rotatedSize(width: number, height: number, degrees: number) {
  const radians = (Math.abs(degrees) * Math.PI) / 180;
  const cosine = Math.abs(Math.cos(radians));
  const sine = Math.abs(Math.sin(radians));
  return {
    width: width * cosine + height * sine,
    height: width * sine + height * cosine,
  };
}

type RelativeDropPreview = {
  item: GalleryItem;
  source: {
    left: number;
    top: number;
    width: number;
    height: number;
    rotation: number;
  };
};

function FolderDropPreviewMotion({
  preview,
  active,
  onExited,
}: {
  preview: RelativeDropPreview;
  active: boolean;
  onExited: () => void;
}) {
  const aspect =
    preview.item.previewWidth / Math.max(1, preview.item.previewHeight);
  const targetSize = containedSize(
    aspect,
    FOLDER_WIDTH - 4,
    EXPANDED_MAX_HEIGHT,
  );
  const target = {
    left: (FOLDER_WIDTH - targetSize.width) / 2,
    top: FOLDER_HEIGHT - targetSize.height - 3,
    width: targetSize.width,
    height: targetSize.height,
    rotation: 0,
    opacity: 1,
  };
  const destination = active
    ? target
    : { ...preview.source, opacity: 0 };
  const { values, settled } = useSpringVector(
    [
      destination.left,
      destination.top,
      destination.width,
      destination.height,
      destination.rotation,
      destination.opacity,
    ],
    {
      initial: [
        preview.source.left,
        preview.source.top,
        preview.source.width,
        preview.source.height,
        preview.source.rotation,
        0,
      ],
      mass: 0.72,
      stiffness: 330,
      damping: 25,
      precision: 0.002,
    },
  );
  const [left, top, width, height, rotation, opacity] = values;

  useEffect(() => {
    if (!active && settled) onExited();
  }, [active, onExited, settled]);

  return (
    <GalleryPreviewImage
      itemId={preview.item.id}
      className="gallery-folder-drop-preview"
      alt=""
      draggable={false}
      style={{
        left,
        top,
        width,
        height,
        opacity: Math.min(1, Math.max(0, opacity)),
        transform: `rotate(${rotation}deg)`,
      }}
    />
  );
}

export const GalleryFolder = forwardRef<HTMLButtonElement, GalleryFolderProps>(function GalleryFolder({
  items,
  locale,
  loading = false,
  interactionDisabled = false,
  variant = "launcher",
  folderId = "default",
  color = "#59b0d8",
  dropOpen = false,
  dropPreview = null,
  showPreviews = true,
  collapsePreviewsImmediately = false,
  receiving = false,
  receivingItemId,
  flight,
  onReceiveClosed,
  onPreviewEdit,
  onOpen,
}, forwardedRef) {
  const t = COPY[locale];
  const isExit = variant === "exit";
  const [hovered, setHovered] = useState(false);
  const artRef = useRef<HTMLSpanElement>(null);
  const [renderedDropPreview, setRenderedDropPreview] =
    useState<RelativeDropPreview | null>(null);
  const previewRefs = useRef(new Map<string, HTMLImageElement>());
  const previews = useMemo(
    () =>
      showPreviews
        ? items.filter((item) => item.id !== receivingItemId).slice(0, 10)
        : [],
    [items, receivingItemId, showPreviews],
  );

  const previewLayouts = useMemo(() => {
    const layouts = previews.map((item, index) => {
      const aspect =
        item.previewWidth / Math.max(1, item.previewHeight);
      const isWide = aspect > 1;
      const deep = index % 3 === 1;
      const depthScale = deep
        ? 0.72 + seededFraction(item.id, 79) * 0.1
        : 1;
      const collapsedScale =
        (0.9 + seededFraction(item.id, 7) * 0.2) * depthScale;
      const collapsedVisual = containedSize(
        isWide ? 1 / aspect : aspect,
        COLLAPSED_MAX_WIDTH * collapsedScale,
        COLLAPSED_MAX_HEIGHT * collapsedScale,
      );
      // Landscape artwork is stored sideways so its closed-folder silhouette
      // behaves like the same kind of vertical strip as portrait artwork.
      const collapsed = isWide
        ? { width: collapsedVisual.height, height: collapsedVisual.width }
        : collapsedVisual;
      const expanded = containedSize(
        aspect,
        FOLDER_WIDTH,
        EXPANDED_MAX_HEIGHT,
      );
      // Alternate the lean direction so a small set cannot accidentally form
      // one straight bundle, then keep the exact angle stable per sticker.
      const direction = index % 2 === 0 ? -1 : 1;
      const collapsedRotation = isWide
        ? direction * (72 + seededFraction(item.id, 53) * 36)
        : direction * (10 + seededFraction(item.id, 53) * 22);
      const collapsedBounds = rotatedSize(
        collapsed.width,
        collapsed.height,
        collapsedRotation,
      );
      const exposedFraction =
        COLLAPSED_TOP_EXPOSURE_MIN +
        seededFraction(item.id, 29) *
          (COLLAPSED_TOP_EXPOSURE_MAX - COLLAPSED_TOP_EXPOSURE_MIN);
      const visualBottom = deep
        ? 1 + seededFraction(item.id, 67) * 4
        : FOLDER_HEIGHT -
          collapsedBounds.height +
          collapsedBounds.height * exposedFraction;
      // Deliberately distribute the first ten previews across the folder,
      // with a small per-item jitter. Position the rotated bounding box (not
      // the unrotated image) so angled artwork still stays inside the sides.
      const lane = Math.min(
        1,
        Math.max(
          0,
          COLLAPSED_LANES[index % COLLAPSED_LANES.length] +
            (seededFraction(item.id, 17) - 0.5) * 0.1,
        ),
      );
      const horizontalTravel = Math.max(
        0,
        FOLDER_WIDTH - COLLAPSED_SIDE_PADDING * 2 - collapsedBounds.width,
      );
      const visualLeft = COLLAPSED_SIDE_PADDING + horizontalTravel * lane;
      const layout = {
        isWide,
        deep,
        collapsed,
        expanded,
        // left/bottom position the unrotated image so its rotated bounding box
        // lands in the requested top or deep folder slot.
        collapsedLeft:
          visualLeft + (collapsedBounds.width - collapsed.width) / 2,
        collapsedBottom:
          visualBottom + (collapsedBounds.height - collapsed.height) / 2,
        collapsedRotation,
        expandedLeft: (FOLDER_WIDTH - expanded.width) / 2,
      };
      return layout;
    });
    return layouts.map((layout, index) => ({
      ...layout,
      expandedBottom:
        EXPANDED_BOTTOM +
        layouts
          .slice(0, index)
          .reduce(
            (offset, previous) =>
              offset + previous.expanded.height + EXPANDED_GAP,
            0,
          ),
    }));
  }, [previews]);
  const previewHitHeight = previewLayouts.reduce(
    (height, layout) =>
      Math.max(height, layout.expandedBottom + layout.expanded.height),
    FOLDER_HEIGHT,
  );
  const shouldOpen =
    isExit || receiving || dropOpen || (!loading && !interactionDisabled && hovered);
  const { value: openProgress, settled: openSettled } = useSpringValue(shouldOpen ? 1 : 0, {
    initial: isExit ? 1 : 0,
    mass: 0.72,
    stiffness: 250,
    damping: 19,
    precision: 0.001,
  });
  const shouldExpandPreviews =
    !dropOpen &&
    (isExit || receiving || (!loading && !interactionDisabled && hovered));
  const { value: previewProgress } = useSpringValue(
    shouldExpandPreviews ? 1 : 0,
    {
      initial: isExit ? 1 : 0,
      mass: 0.72,
      stiffness: 250,
      damping: 19,
      precision: 0.001,
      reducedMotion: collapsePreviewsImmediately,
    },
  );
  const renderedPreviewProgress = collapsePreviewsImmediately
    ? 0
    : previewProgress;
  const receivedRef = useRef(false);

  useLayoutEffect(() => {
    if (!dropPreview) return;
    const rect = artRef.current?.getBoundingClientRect();
    if (!rect) return;
    setRenderedDropPreview({
      item: dropPreview.item,
      source: {
        left: dropPreview.source.left - rect.left,
        top: dropPreview.source.top - rect.top,
        width: dropPreview.source.width,
        height: dropPreview.source.height,
        rotation: dropPreview.source.rotation,
      },
    });
  }, [dropPreview]);

  useEffect(() => {
    if (receiving) receivedRef.current = true;
  }, [receiving]);

  useEffect(() => {
    if (!hovered) return;
    const handlePointerMove = (event: PointerEvent) => {
      const art = artRef.current;
      const target = event.target;
      if (art && target instanceof Node && art.contains(target)) return;
      setHovered(false);
    };
    window.addEventListener("pointermove", handlePointerMove, true);
    return () => {
      window.removeEventListener("pointermove", handlePointerMove, true);
    };
  }, [hovered]);

  useEffect(() => {
    if (
      receiving ||
      !receivedRef.current ||
      !openSettled ||
      openProgress > 0.01
    ) {
      return;
    }
    receivedRef.current = false;
    onReceiveClosed?.();
  }, [onReceiveClosed, openProgress, openSettled, receiving]);

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    const nextTarget = event.relatedTarget;
    if (
      !(nextTarget instanceof Node) ||
      !event.currentTarget.contains(nextTarget)
    ) {
      setHovered(false);
    }
  };

  const handleOpen = () => {
    if (loading) return;
    setHovered(false);
    const origins: Record<string, GalleryEntryOrigin> = {};
    for (const item of previews) {
      const element = previewRefs.current.get(item.id);
      if (!element) continue;
      const rect = element.getBoundingClientRect();
      origins[item.id] = {
        left: rect.left,
        top: rect.top,
        width: rect.width,
        height: rect.height,
      };
    }
    onOpen(origins);
  };

  return (
    <button
      ref={forwardedRef}
      className="gallery-folder"
      type="button"
      disabled={loading}
      data-gallery-ui
      data-gallery-folder-id={folderId}
      data-variant={variant}
      data-open={openProgress > 0.02}
      data-drop-open={dropOpen}
      data-receiving={receiving}
      aria-label={isExit ? t.exit : t.open}
      title={isExit ? t.exit : t.open}
      onPointerEnter={() => {
        if (!loading && !interactionDisabled) setHovered(true);
      }}
      onPointerMove={() => {
        if (!loading && !interactionDisabled) setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => {
        if (!loading && !interactionDisabled) setHovered(true);
      }}
      onBlur={handleBlur}
      onClick={() => {
        if (!interactionDisabled) handleOpen();
      }}
    >
      <span ref={artRef} className="gallery-folder-art" aria-hidden="true">
        <svg className="gallery-folder-back" viewBox="0 0 270 198">
          <rect
            x="14.5"
            y="1.72"
            width="241"
            height="186"
            rx="22"
            fill={shadeHex(color, -0.2)}
          />
          <rect
            x="15"
            y="2.22"
            width="240"
            height="185"
            rx="21.5"
            fill="none"
            stroke="white"
            strokeOpacity=".74"
          />
        </svg>

        <span
          className="gallery-folder-previews"
          style={{
            height: previewHitHeight,
            pointerEvents: shouldExpandPreviews ? "auto" : "none",
          }}
          onPointerEnter={() => {
            if (!loading && !interactionDisabled) setHovered(true);
          }}
          onPointerLeave={(event) => {
            const nextTarget = event.relatedTarget;
            const folder = event.currentTarget.closest(".gallery-folder");
            if (
              nextTarget instanceof Node &&
              folder?.contains(nextTarget)
            ) {
              return;
            }
            setHovered(false);
          }}
        >
          {previews.map((item, index) => {
            const layout = previewLayouts[index];
            const width =
              layout.collapsed.width +
              (layout.expanded.width - layout.collapsed.width) *
                renderedPreviewProgress;
            const height =
              layout.collapsed.height +
              (layout.expanded.height - layout.collapsed.height) *
                renderedPreviewProgress;
            const left =
              layout.collapsedLeft +
              (layout.expandedLeft - layout.collapsedLeft) *
                renderedPreviewProgress;
            const bottom =
              layout.collapsedBottom +
              (layout.expandedBottom - layout.collapsedBottom) *
                renderedPreviewProgress;
            const style = {
              zIndex: 20 - index,
              width,
              height,
              left,
              bottom,
              opacity: 0.82 + renderedPreviewProgress * 0.18,
              transform: `rotate(${layout.collapsedRotation * (1 - renderedPreviewProgress)}deg)`,
            } as CSSProperties;
            return (
              <GalleryPreviewImage
                key={item.id}
                itemId={item.id}
                ref={(element) => {
                  if (element) previewRefs.current.set(item.id, element);
                  else previewRefs.current.delete(item.id);
                }}
                className="gallery-folder-preview"
                data-folder-depth={layout.deep ? "deep" : "top"}
                data-folder-orientation={layout.isWide ? "strip" : "portrait"}
                data-quick-edit={onPreviewEdit ? true : undefined}
                alt=""
                draggable={false}
                style={{
                  ...style,
                  pointerEvents:
                    onPreviewEdit && shouldExpandPreviews ? "auto" : "none",
                }}
                onPointerDown={(event) => {
                  if (onPreviewEdit && shouldExpandPreviews) {
                    event.stopPropagation();
                  }
                }}
                onClick={(event) => {
                  if (!onPreviewEdit || !shouldExpandPreviews) return;
                  event.preventDefault();
                  event.stopPropagation();
                  const rect = event.currentTarget.getBoundingClientRect();
                  setHovered(false);
                  onPreviewEdit(item, {
                    left: rect.left,
                    top: rect.top,
                    width: rect.width,
                    height: rect.height,
                  });
                }}
              />
            );
          })}
        </span>

        {renderedDropPreview ? (
          <span className="gallery-folder-drop-preview-layer">
            <FolderDropPreviewMotion
              key={renderedDropPreview.item.id}
              preview={renderedDropPreview}
              active={dropPreview?.item.id === renderedDropPreview.item.id}
              onExited={() => {
                if (!dropPreview) setRenderedDropPreview(null);
              }}
            />
          </span>
        ) : null}

        <span className="gallery-folder-flight-layer">{flight}</span>

        <span
          className="gallery-folder-front-layer"
          style={{
            transform: `perspective(420px) rotateX(${-35 * openProgress}deg) scaleX(${1 + openProgress * 0.055})`,
          }}
        >
          <span className="gallery-folder-front-glass" />
          <svg className="gallery-folder-front" viewBox="0 0 270 198">
            <defs>
              <linearGradient
                id={`gallery-folder-gradient-${folderId}`}
                x1="60"
                y1="39.22"
                x2="211.5"
                y2="170.72"
                gradientUnits="userSpaceOnUse"
              >
                <stop stopColor={shadeHex(color, 0.22)} />
                <stop offset="1" stopColor={shadeHex(color, -0.2)} />
              </linearGradient>
            </defs>
            <path
              d="M42 19.722C53 19.223 86.154 19.722 109 19.721c22.775 0 35.421 21.863 58.78 22H221.9c11.761 0 17.642 0 22.134 2.289a21 21 0 0 1 9.177 9.178c2.289 4.491 2.289 10.372 2.289 22.133v78.8c0 11.761 0 17.641-2.289 22.133a20.998 20.998 0 0 1-9.177 9.177c-4.492 2.289-10.373 2.289-22.134 2.289H48.1c-11.761 0-17.642 0-22.134-2.289a21 21 0 0 1-9.177-9.177C14.5 171.762 14.5 165.882 14.5 154.121v-112.4c0-20.5 16.5-21.499 27.5-22Z"
              fill={`url(#gallery-folder-gradient-${folderId})`}
              stroke="white"
              strokeOpacity=".43"
            />
          </svg>
        </span>
      </span>
    </button>
  );
});
