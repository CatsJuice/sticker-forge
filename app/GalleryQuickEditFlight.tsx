"use client";

import { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
import type { GalleryEntryOrigin } from "./GalleryCanvas";
import { GalleryPreviewImage } from "./GalleryPreviewImage";
import { useSpringValue, useSpringVector } from "./gallery-spring";

type GalleryQuickEditFlightProps = {
  itemId: string;
  start: GalleryEntryOrigin;
  target: GalleryEntryOrigin;
  targetRotation: number;
  editorReady: boolean;
  onArrived: () => void;
  onComplete: () => void;
};

export function GalleryQuickEditFlight({
  itemId,
  start,
  target,
  targetRotation,
  editorReady,
  onArrived,
  onComplete,
}: GalleryQuickEditFlightProps) {
  const arrivedRef = useRef(false);
  const completeRef = useRef(false);
  const { values, settled } = useSpringVector(
    [
      target.left,
      target.top,
      target.width,
      target.height,
      targetRotation,
    ],
    {
      initial: [
        start.left,
        start.top,
        start.width,
        start.height,
        0,
      ],
      mass: 0.95,
      stiffness: 168,
      damping: 22,
      precision: 0.01,
    },
  );
  const { value: opacity, settled: opacitySettled } = useSpringValue(
    editorReady ? 0 : 1,
    {
      initial: 1,
      mass: 0.68,
      stiffness: 380,
      damping: 30,
      precision: 0.002,
    },
  );
  const [left, top, width, height, rotation] = values;

  useEffect(() => {
    if (!settled || arrivedRef.current) return;
    arrivedRef.current = true;
    onArrived();
  }, [onArrived, settled]);

  useEffect(() => {
    if (
      !editorReady ||
      !opacitySettled ||
      opacity > 0.002 ||
      completeRef.current
    ) {
      return;
    }
    completeRef.current = true;
    onComplete();
  }, [editorReady, onComplete, opacity, opacitySettled]);

  if (typeof document === "undefined") return null;

  return createPortal(
    <GalleryPreviewImage
      itemId={itemId}
      className="gallery-quick-edit-flight"
      alt=""
      aria-hidden="true"
      draggable={false}
      style={{
        left,
        top,
        width,
        height,
        opacity: Math.min(1, Math.max(0, opacity)),
        transform: `rotate(${rotation}deg)`,
      }}
    />,
    document.body,
  );
}
