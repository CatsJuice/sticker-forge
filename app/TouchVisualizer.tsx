"use client";

import { useEffect, useRef, useState } from "react";

type VisibleTouch = {
  id: number;
  x: number;
  y: number;
  released: boolean;
};

const RELEASE_DURATION_MS = 360;

export function TouchVisualizer() {
  const [touches, setTouches] = useState<VisibleTouch[]>([]);
  const removalTimersRef = useRef(new Map<number, ReturnType<typeof setTimeout>>());

  useEffect(() => {
    const removalTimers = removalTimersRef.current;

    const handlePointerDown = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;

      const previousTimer = removalTimers.get(event.pointerId);
      if (previousTimer) clearTimeout(previousTimer);
      removalTimers.delete(event.pointerId);

      setTouches((current) => [
        ...current.filter((touch) => touch.id !== event.pointerId),
        {
          id: event.pointerId,
          x: event.clientX,
          y: event.clientY,
          released: false,
        },
      ]);
    };

    const handlePointerMove = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;

      setTouches((current) => {
        const index = current.findIndex(
          (touch) => touch.id === event.pointerId && !touch.released,
        );
        if (index < 0) return current;

        const next = [...current];
        next[index] = {
          ...next[index],
          x: event.clientX,
          y: event.clientY,
        };
        return next;
      });
    };

    const handlePointerEnd = (event: PointerEvent) => {
      if (event.pointerType !== "touch") return;

      setTouches((current) =>
        current.map((touch) =>
          touch.id === event.pointerId
            ? {
                ...touch,
                x: event.clientX,
                y: event.clientY,
                released: true,
              }
            : touch,
        ),
      );

      const previousTimer = removalTimers.get(event.pointerId);
      if (previousTimer) clearTimeout(previousTimer);
      removalTimers.set(
        event.pointerId,
        setTimeout(() => {
          removalTimers.delete(event.pointerId);
          setTouches((current) =>
            current.filter((touch) => touch.id !== event.pointerId),
          );
        }, RELEASE_DURATION_MS),
      );
    };

    const listenerOptions = { capture: true, passive: true } as const;
    window.addEventListener("pointerdown", handlePointerDown, listenerOptions);
    window.addEventListener("pointermove", handlePointerMove, listenerOptions);
    window.addEventListener("pointerup", handlePointerEnd, listenerOptions);
    window.addEventListener("pointercancel", handlePointerEnd, listenerOptions);

    return () => {
      window.removeEventListener("pointerdown", handlePointerDown, true);
      window.removeEventListener("pointermove", handlePointerMove, true);
      window.removeEventListener("pointerup", handlePointerEnd, true);
      window.removeEventListener("pointercancel", handlePointerEnd, true);
      for (const timer of removalTimers.values()) clearTimeout(timer);
      removalTimers.clear();
    };
  }, []);

  return (
    <div className="touch-visualizer-layer" aria-hidden="true">
      <style>{`
        .touch-visualizer-layer {
          position: fixed;
          inset: 0;
          z-index: 2147483647;
          overflow: hidden;
          pointer-events: none;
          contain: strict;
        }

        .touch-visualizer-point {
          position: absolute;
          width: 46px;
          height: 46px;
          margin: -23px 0 0 -23px;
          border: 2px solid rgba(255, 255, 255, 0.98);
          border-radius: 999px;
          background: rgba(12, 14, 18, 0.2);
          box-shadow:
            0 0 0 2px rgba(255, 255, 255, 0.2),
            0 0 18px rgba(255, 255, 255, 0.72),
            inset 0 0 10px rgba(255, 255, 255, 0.28);
          transform: scale(1);
          opacity: 1;
          will-change: left, top, transform, opacity;
          animation: touch-visualizer-press 140ms ease-out;
        }

        .touch-visualizer-point[data-released="true"] {
          animation: touch-visualizer-release ${RELEASE_DURATION_MS}ms ease-out
            forwards;
        }

        @keyframes touch-visualizer-press {
          from {
            transform: scale(0.72);
            opacity: 0.35;
          }
        }

        @keyframes touch-visualizer-release {
          to {
            transform: scale(1.45);
            opacity: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .touch-visualizer-point,
          .touch-visualizer-point[data-released="true"] {
            animation-duration: 1ms;
          }
        }
      `}</style>

      {touches.map((touch) => (
        <span
          className="touch-visualizer-point"
          data-released={touch.released}
          key={touch.id}
          style={{ left: touch.x, top: touch.y }}
        />
      ))}
    </div>
  );
}
