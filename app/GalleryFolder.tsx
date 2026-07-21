"use client";

/* eslint-disable @next/next/no-img-element -- gallery thumbnails are private, pre-sized R2 assets */

import {
  useRef,
  useState,
  type CSSProperties,
  type FocusEvent,
} from "react";
import type { GalleryItem } from "@/lib/gallery-types";
import type { GalleryEntryOrigin } from "./GalleryCanvas";
import { useSpringValue } from "./gallery-spring";

type GalleryFolderProps = {
  items: GalleryItem[];
  locale: "zh" | "en";
  loading?: boolean;
  onOpen: (origins: Record<string, GalleryEntryOrigin>) => void;
};

const COPY = {
  zh: {
    open: "打开贴纸画廊",
  },
  en: {
    open: "Open sticker gallery",
  },
} as const;

export function GalleryFolder({
  items,
  locale,
  loading = false,
  onOpen,
}: GalleryFolderProps) {
  const t = COPY[locale];
  const [hovered, setHovered] = useState(false);
  const previewRefs = useRef(new Map<string, HTMLImageElement>());
  const previews = items.slice(0, 10);
  const { value: openProgress } = useSpringValue(hovered ? 1 : 0, {
    initial: 0,
    mass: 0.72,
    stiffness: 250,
    damping: 19,
    precision: 0.001,
  });

  const handleBlur = (event: FocusEvent<HTMLButtonElement>) => {
    if (!event.currentTarget.contains(event.relatedTarget)) setHovered(false);
  };

  const handleOpen = () => {
    if (loading) return;
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
      className="gallery-folder"
      type="button"
      disabled={loading}
      data-open={openProgress > 0.02}
      aria-label={t.open}
      title={t.open}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      onFocus={() => setHovered(true)}
      onBlur={handleBlur}
      onClick={handleOpen}
    >
      <span className="gallery-folder-art" aria-hidden="true">
        <svg className="gallery-folder-back" viewBox="0 0 270 198">
          <rect x="14.5" y="1.72" width="241" height="186" rx="22" fill="#59B0D8" />
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

        <span className="gallery-folder-previews">
          {previews.map((item, index) => {
            const restingRotation = (index % 3 - 1) * 4;
            const lift = 17 + index * 9;
            const style = {
              zIndex: 20 - index,
              opacity: 0.76 + openProgress * 0.24,
              transform: `translate3d(0, ${-lift * openProgress}px, ${index}px) rotate(${restingRotation * (1 - openProgress)}deg) scale(${0.86 + openProgress * 0.14})`,
            } as CSSProperties;
            return (
              <img
                key={item.id}
                ref={(element) => {
                  if (element) previewRefs.current.set(item.id, element);
                  else previewRefs.current.delete(item.id);
                }}
                className="gallery-folder-preview"
                src={item.previewUrl}
                alt=""
                draggable={false}
                style={style}
              />
            );
          })}
        </span>

        <svg
          className="gallery-folder-front"
          viewBox="0 0 270 198"
          style={{
            transform: `perspective(420px) rotateX(${-35 * openProgress}deg) scaleX(${1 + openProgress * 0.055})`,
          }}
        >
          <defs>
            <linearGradient
              id="gallery-folder-gradient"
              x1="60"
              y1="39.22"
              x2="211.5"
              y2="170.72"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#7EB8E2" />
              <stop offset="1" stopColor="#167CB7" />
            </linearGradient>
          </defs>
          <path
            d="M42 19.722C53 19.223 86.154 19.722 109 19.721c22.775 0 35.421 21.863 58.78 22H221.9c11.761 0 17.642 0 22.134 2.289a21 21 0 0 1 9.177 9.178c2.289 4.491 2.289 10.372 2.289 22.133v78.8c0 11.761 0 17.641-2.289 22.133a20.998 20.998 0 0 1-9.177 9.177c-4.492 2.289-10.373 2.289-22.134 2.289H48.1c-11.761 0-17.642 0-22.134-2.289a21 21 0 0 1-9.177-9.177C14.5 171.762 14.5 165.882 14.5 154.121v-112.4c0-20.5 16.5-21.499 27.5-22Z"
            fill="url(#gallery-folder-gradient)"
            stroke="white"
            strokeOpacity=".43"
          />
        </svg>
      </span>
    </button>
  );
}
