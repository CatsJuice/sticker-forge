"use client";

/* eslint-disable @next/next/no-img-element -- this is a transient local preview */

import { useEffect, useState, type CSSProperties } from "react";
import { createPortal } from "react-dom";
import { useSpringValue } from "./gallery-spring";

export type GalleryAddFlightRect = {
  left: number;
  top: number;
  width: number;
  height: number;
};

type GalleryAddFlightProps = {
  previewDataUrl: string;
  start: GalleryAddFlightRect;
  target: GalleryAddFlightRect;
  coordinateOrigin: { left: number; top: number };
  startRotation: number;
  targetRotation: number;
  onArrived: () => void;
};

function clamp01(value: number) {
  return Math.min(1, Math.max(0, value));
}

function mix(from: number, to: number, progress: number) {
  return from + (to - from) * progress;
}

function quadraticBezier(
  from: number,
  control: number,
  to: number,
  progress: number,
) {
  const remaining = 1 - progress;
  return (
    remaining * remaining * from +
    2 * remaining * progress * control +
    progress * progress * to
  );
}

export function GalleryAddFlight({
  previewDataUrl,
  start,
  target,
  coordinateOrigin,
  startRotation,
  targetRotation,
  onArrived,
}: GalleryAddFlightProps) {
  const [phase, setPhase] = useState<"lift" | "flight" | "settled">("lift");
  const { value: liftProgress } = useSpringValue(1, {
    initial: 0,
    mass: 0.82,
    stiffness: 235,
    damping: 23,
    precision: 0.001,
    onRest: () => setPhase((current) => (current === "lift" ? "flight" : current)),
  });
  const { value: flightProgress } = useSpringValue(
    phase === "flight" || phase === "settled" ? 1 : 0,
    {
      initial: 0,
      mass: 0.9,
      stiffness: 150,
      damping: 20,
      precision: 0.001,
      onRest: () => {
        setPhase((current) => (current === "flight" ? "settled" : current));
      },
    },
  );
  const { value: settledOpacity } = useSpringValue(phase === "settled" ? 0 : 1, {
    initial: 1,
    mass: 0.65,
    stiffness: 270,
    damping: 27,
    precision: 0.002,
  });

  useEffect(() => {
    if (phase === "settled") onArrived();
  }, [onArrived, phase]);

  const lift = clamp01(liftProgress);
  const flight = clamp01(flightProgress);
  const startCenterX = start.left + start.width / 2;
  const startCenterY = start.top + start.height / 2;
  const liftWidth = start.width * 0.44;
  const liftHeight = start.height * 0.44;
  const liftCenterX = startCenterX;
  const liftCenterY = startCenterY - Math.min(132, Math.max(76, start.height * 0.28));
  const targetCenterX = target.left + target.width / 2;
  const targetCenterY = target.top + target.height / 2;
  const arcHeight = Math.min(
    300,
    Math.max(150, Math.hypot(targetCenterX - liftCenterX, targetCenterY - liftCenterY) * 0.28),
  );
  const controlX = mix(liftCenterX, targetCenterX, 0.42);
  const controlY = Math.min(liftCenterY, targetCenterY) - arcHeight;

  const centerX =
    phase === "lift"
      ? mix(startCenterX, liftCenterX, lift)
      : quadraticBezier(liftCenterX, controlX, targetCenterX, flight);
  const centerY =
    phase === "lift"
      ? mix(startCenterY, liftCenterY, lift)
      : quadraticBezier(liftCenterY, controlY, targetCenterY, flight);
  const width =
    phase === "lift"
      ? mix(start.width, liftWidth, lift)
      : mix(liftWidth, target.width, flight);
  const height =
    phase === "lift"
      ? mix(start.height, liftHeight, lift)
      : mix(liftHeight, target.height, flight);
  const rotation =
    phase === "lift"
      ? mix(startRotation, startRotation - 4, lift)
      : mix(startRotation - 4, targetRotation, flight);
  // The folder dock now lives inside a horizontal scroll container. Anything
  // travelling from the editor while nested inside that container is clipped.
  // Keep the long flight in viewport space, then cross-fade to a local copy
  // between the folder's back and front layers just before it lands.
  const landingBlend =
    phase === "lift" ? 0 : clamp01((flight - 0.72) / 0.18);
  const localStyle = {
    left: centerX - width / 2 - coordinateOrigin.left,
    top: centerY - height / 2 - coordinateOrigin.top,
    width,
    height,
    opacity: settledOpacity * landingBlend,
    transform: `rotate(${rotation}deg)`,
  } satisfies CSSProperties;
  const viewportStyle = {
    left: centerX - width / 2,
    top: centerY - height / 2,
    width,
    height,
    opacity: settledOpacity * (1 - landingBlend),
    transform: `rotate(${rotation}deg)`,
  } satisfies CSSProperties;

  return (
    <>
      {typeof document !== "undefined"
        ? createPortal(
            <img
              className="gallery-add-flight gallery-add-flight-viewport"
              src={previewDataUrl}
              alt=""
              aria-hidden="true"
              draggable={false}
              data-phase={phase}
              style={viewportStyle}
            />,
            document.body,
          )
        : null}
      <img
        className="gallery-add-flight gallery-add-flight-landing"
        src={previewDataUrl}
        alt=""
        aria-hidden="true"
        draggable={false}
        data-phase={phase}
        style={localStyle}
      />
    </>
  );
}
