"use client";

import {
  useCallback,
  useEffect,
  useRef,
  type MouseEvent as ReactMouseEvent,
  type RefObject,
} from "react";
import { domToCanvas } from "modern-screenshot";
import type {
  StickerInstance,
  StickerOptions,
  StickerPlaybackMotion,
} from "@/lib/sticker-forge";
import {
  getSidebarPeelBackSettings,
  getSidebarPeelLightingSettings,
  getSidebarPeelShadowSettings,
  SIDEBAR_PEEL_BACK_CHANGE_EVENT,
  SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT,
  SIDEBAR_PEEL_SHADOW_CHANGE_EVENT,
  type SidebarPeelBackSettings,
  type SidebarPeelLightingSettings,
  type SidebarPeelShadowSettings,
} from "@/lib/sidebar-peel-debug";

const DESKTOP_POINTER_QUERY =
  "(min-width: 621px) and (hover: hover) and (pointer: fine)";
const CORNER_SIZE = 72;
const READY_CURL_PROGRESS = 0.012;
const READY_CURL_DURATION = 300;
const PRANK_DRAG_THRESHOLD = 32;
const SIDEBAR_DETACH_THRESHOLD = 0.5;

type Corner = "top-left" | "top-right" | "bottom-left" | "bottom-right";
export type SidebarPeelPrankPhase = "shock" | "warning" | null;

type ActiveCapture = {
  corner: Corner;
  rect: DOMRect;
  lastPoint: { x: number; y: number };
  dragStartPoint: { x: number; y: number } | null;
  startedPeeling: boolean;
  prankPhase: SidebarPeelPrankPhase;
  cancelled: boolean;
  panelHidden: boolean;
  overlay: HTMLDivElement | null;
  controller: StickerInstance | null;
  cleanupTimer: number | null;
  hintFrame: number | null;
  teardownFrame: number | null;
};

function cornerPeelMotion(corner: Corner): StickerPlaybackMotion {
  const left = corner.endsWith("left");
  const top = corner.startsWith("top");
  return {
    origin: { x: left ? 0 : 1, y: top ? 0 : 1 },
    target: {
      x: left ? 0.09 : 0.91,
      y: top ? 0.09 : 0.91,
    },
  };
}

function pointIsInCorner(
  point: { x: number; y: number },
  rect: DOMRect,
  corner: Corner,
) {
  const horizontal =
    corner.endsWith("left") ? point.x - rect.left : rect.right - point.x;
  const vertical =
    corner.startsWith("top") ? point.y - rect.top : rect.bottom - point.y;
  return (
    horizontal >= 0 &&
    vertical >= 0 &&
    horizontal <= CORNER_SIZE &&
    vertical <= CORNER_SIZE &&
    horizontal + vertical <= CORNER_SIZE + 2
  );
}

async function snapshotElement(element: HTMLElement, rect: DOMRect) {
  const scale = Math.max(1, window.devicePixelRatio || 1);
  const cornerRadius = Number.parseFloat(
    window.getComputedStyle(element).borderTopLeftRadius,
  );
  const panelToggle = document.querySelector<HTMLElement>(
    `.panel-toggle[aria-controls="${element.id}"]`,
  );
  const panelToggleRect = panelToggle?.getBoundingClientRect() ?? null;
  const [capturedCanvas, capturedToggleCanvas] = await Promise.all([
    domToCanvas(element, {
      width: rect.width,
      height: rect.height,
      scale,
      backgroundColor: "#fff",
      style: {
        background: "#fff",
        backdropFilter: "none",
      },
      filter: (candidate) =>
        !(
          candidate.nodeType === Node.ELEMENT_NODE &&
          (candidate as Element).hasAttribute("data-sidebar-peel-trigger")
        ),
    }),
    panelToggle && panelToggleRect
      ? domToCanvas(panelToggle, {
          width: panelToggleRect.width,
          height: panelToggleRect.height,
          scale,
          backgroundColor: null,
          style: {
            position: "relative",
            inset: "auto",
            margin: "0",
            transform: "none",
          },
        })
      : null,
  ]);
  const canvas = document.createElement("canvas");
  canvas.width = Math.max(1, Math.round(rect.width * scale));
  canvas.height = Math.max(1, Math.round(rect.height * scale));
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas 2D is unavailable.");
  context.drawImage(
    capturedCanvas,
    0,
    0,
    canvas.width,
    canvas.height,
  );
  if (capturedToggleCanvas && panelToggleRect) {
    context.drawImage(
      capturedToggleCanvas,
      Math.round((panelToggleRect.left - rect.left) * scale),
      Math.round((panelToggleRect.top - rect.top) * scale),
      Math.round(panelToggleRect.width * scale),
      Math.round(panelToggleRect.height * scale),
    );
  }
  context.save();
  context.globalCompositeOperation = "destination-in";
  context.beginPath();
  context.roundRect(
    0,
    0,
    canvas.width,
    canvas.height,
    Math.max(0, cornerRadius * scale),
  );
  context.fillStyle = "#fff";
  context.fill();
  context.restore();
  return canvas.toDataURL("image/png");
}

export function SidebarPeelEasterEgg({
  panelRef,
  optionsRef,
  onDetached,
  onPrankPhaseChange,
}: {
  panelRef: RefObject<HTMLElement | null>;
  optionsRef: RefObject<StickerOptions>;
  onDetached: () => void;
  onPrankPhaseChange: (phase: SidebarPeelPrankPhase) => void;
}) {
  const activeRef = useRef<ActiveCapture | null>(null);
  const cooldownUntilRef = useRef(0);
  const onDetachedRef = useRef(onDetached);
  const onPrankPhaseChangeRef = useRef(onPrankPhaseChange);
  onDetachedRef.current = onDetached;
  onPrankPhaseChangeRef.current = onPrankPhaseChange;

  useEffect(() => {
    const updateActiveShadow = (event: Event) => {
      const shadow = (event as CustomEvent<SidebarPeelShadowSettings>).detail;
      activeRef.current?.controller?.setOptions({
        shadow: {
          color: "#1a1922",
          angle: 90,
          ...shadow,
        },
      });
    };
    window.addEventListener(
      SIDEBAR_PEEL_SHADOW_CHANGE_EVENT,
      updateActiveShadow,
    );
    return () => {
      window.removeEventListener(
        SIDEBAR_PEEL_SHADOW_CHANGE_EVENT,
        updateActiveShadow,
      );
    };
  }, []);

  useEffect(() => {
    const updateActiveBack = (event: Event) => {
      const back = (event as CustomEvent<SidebarPeelBackSettings>).detail;
      activeRef.current?.controller?.setOptions({ back });
    };
    window.addEventListener(
      SIDEBAR_PEEL_BACK_CHANGE_EVENT,
      updateActiveBack,
    );
    return () => {
      window.removeEventListener(
        SIDEBAR_PEEL_BACK_CHANGE_EVENT,
        updateActiveBack,
      );
    };
  }, []);

  useEffect(() => {
    const updateActiveLighting = (event: Event) => {
      const direction = (
        event as CustomEvent<SidebarPeelLightingSettings>
      ).detail;
      activeRef.current?.controller?.setOptions({
        lighting: {
          direction,
          ambient: 1,
        },
      });
    };
    window.addEventListener(
      SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT,
      updateActiveLighting,
    );
    return () => {
      window.removeEventListener(
        SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT,
        updateActiveLighting,
      );
    };
  }, []);

  const cleanup = useCallback((active: ActiveCapture, restorePanel = true) => {
    if (active.cancelled) return;
    active.cancelled = true;
    if (active.prankPhase) {
      active.prankPhase = null;
      onPrankPhaseChangeRef.current(null);
    }
    if (active.cleanupTimer !== null) {
      window.clearTimeout(active.cleanupTimer);
    }
    if (active.hintFrame !== null) {
      window.cancelAnimationFrame(active.hintFrame);
    }
    if (active.teardownFrame !== null) {
      window.cancelAnimationFrame(active.teardownFrame);
    }
    window.removeEventListener("pointermove", handleGlobalPointerMove, true);
    window.removeEventListener("blur", handleWindowBlur);

    const panel = panelRef.current;
    const finishTeardown = () => {
      active.cleanupTimer = null;
      active.teardownFrame = null;
      panel?.removeAttribute("data-peel-restoring");
      active.controller?.destroy();
      active.overlay?.remove();
    };

    if (restorePanel && active.panelHidden && panel) {
      // Restore the live DOM beneath the screenshot, then give layout and the
      // compositor two frames to settle before removing the WebGL layer.
      panel.setAttribute("data-peel-restoring", "true");
      panel.removeAttribute("data-peel-captured");
      panel.removeAttribute("data-peel-preparing");
      active.panelHidden = false;
      active.teardownFrame = window.requestAnimationFrame(() => {
        active.teardownFrame = window.requestAnimationFrame(finishTeardown);
      });
    } else {
      panel?.removeAttribute("data-peel-preparing");
      finishTeardown();
    }

    if (activeRef.current === active) activeRef.current = null;
    cooldownUntilRef.current = performance.now() + 420;
    // The stable global handlers below intentionally close over this callback.
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  function handleGlobalPointerMove(event: PointerEvent) {
    const active = activeRef.current;
    if (!active || active.cancelled) return;
    active.lastPoint = { x: event.clientX, y: event.clientY };
    if (
      active.startedPeeling &&
      !active.prankPhase &&
      active.dragStartPoint &&
      Math.hypot(
        active.lastPoint.x - active.dragStartPoint.x,
        active.lastPoint.y - active.dragStartPoint.y,
      ) >= PRANK_DRAG_THRESHOLD
    ) {
      active.prankPhase = "shock";
      onPrankPhaseChangeRef.current("shock");
    }
    if (
      !active.startedPeeling &&
      event.buttons === 0 &&
      !pointIsInCorner(active.lastPoint, active.rect, active.corner)
    ) {
      cleanup(active);
    }
  }

  function handleWindowBlur() {
    const active = activeRef.current;
    if (active && !active.startedPeeling) cleanup(active);
  }

  const arm = useCallback(
    async (corner: Corner, event: ReactMouseEvent<HTMLSpanElement>) => {
      if (
        performance.now() < cooldownUntilRef.current ||
        !window.matchMedia(DESKTOP_POINTER_QUERY).matches ||
        activeRef.current
      ) {
        return;
      }
      const panel = panelRef.current;
      if (!panel || panel.dataset.open !== "true") return;

      const rect = panel.getBoundingClientRect();
      const fallbackPoint = {
        x: corner.endsWith("left") ? rect.left + 24 : rect.right - 24,
        y: corner.startsWith("top") ? rect.top + 24 : rect.bottom - 24,
      };
      const active: ActiveCapture = {
        corner,
        rect,
        lastPoint:
          event.clientX === 0 && event.clientY === 0
            ? fallbackPoint
            : { x: event.clientX, y: event.clientY },
        dragStartPoint: null,
        startedPeeling: false,
        prankPhase: null,
        cancelled: false,
        panelHidden: false,
        overlay: null,
        controller: null,
        cleanupTimer: null,
        hintFrame: null,
        teardownFrame: null,
      };
      activeRef.current = active;
      panel.setAttribute("data-peel-preparing", corner);
      window.addEventListener("pointermove", handleGlobalPointerMove, true);
      window.addEventListener("blur", handleWindowBlur);

      try {
        const snapshot = await snapshotElement(panel, rect);
        if (
          active.cancelled ||
          activeRef.current !== active ||
          !pointIsInCorner(active.lastPoint, rect, corner)
        ) {
          cleanup(active);
          return;
        }

        const overlay = document.createElement("div");
        overlay.className = "sidebar-peel-overlay";
        const host = document.createElement("div");
        host.className = "sidebar-peel-sticker-host";

        const panelCenterX = rect.left + rect.width / 2;
        const panelCenterY = rect.top + rect.height / 2;
        // The sticker engine centers its mesh inside the host. Size the host
        // symmetrically around the sidebar center until it reaches every
        // viewport edge, so a long peel can never hit an inner canvas clip.
        const hostWidth =
          Math.max(panelCenterX, window.innerWidth - panelCenterX) * 2;
        const hostHeight =
          Math.max(panelCenterY, window.innerHeight - panelCenterY) * 2;
        host.style.width = `${hostWidth}px`;
        host.style.height = `${hostHeight}px`;
        host.style.left = `${panelCenterX - hostWidth / 2}px`;
        host.style.top = `${panelCenterY - hostHeight / 2}px`;
        overlay.appendChild(host);
        document.body.appendChild(overlay);
        active.overlay = overlay;

        const { createSticker } = await import("@/lib/sticker-forge");
        const current = optionsRef.current;
        const controller = await createSticker(host, {
          ...current,
          source: {
            type: "image",
            src: snapshot,
            name: "Sidebar snapshot",
            padding: 0,
            textureMaxEdge: Math.min(
              8192,
              Math.ceil(
                Math.max(rect.width, rect.height) *
                  Math.max(1, window.devicePixelRatio || 1),
              ),
            ),
          },
          display: { width: rect.width, height: rect.height },
          outline: { width: 0, color: "transparent" },
          edge: { width: 0, strength: 0 },
          shadow: {
            color: "#1a1922",
            angle: 90,
            ...getSidebarPeelShadowSettings(),
          },
          lighting: {
            ...current.lighting,
            direction: getSidebarPeelLightingSettings(),
            ambient: 1,
          },
          material: {
            ...current.material,
            type: "original",
            intensity: 0,
          },
          back: {
            ...current.back,
            ...getSidebarPeelBackSettings(),
          },
          peel: {
            ...current.peel,
            grabWidth: Math.max(28, current.peel?.grabWidth ?? 28),
            detachThreshold: SIDEBAR_DETACH_THRESHOLD,
            residue: false,
            surfaceShadow: false,
            release: "snap",
          },
          tilt: 0,
          wind: 0,
          quality: "high",
        });
        if (active.cancelled || activeRef.current !== active) {
          controller.destroy();
          return;
        }
        active.controller = controller;
        const devicePixelRatio = Math.max(1, window.devicePixelRatio || 1);
        controller.setRenderScale(
          devicePixelRatio / Math.min(devicePixelRatio, 2),
        );

        const hintMotion = cornerPeelMotion(corner);

        // Resolve the initial hidden style before switching both layers, so
        // even a very fast GPU setup still produces a real CSS transition.
        host.querySelector("canvas")?.getBoundingClientRect();
        overlay.dataset.sidebarPeelReady = "true";
        panel.setAttribute("data-peel-captured", "true");
        panel.removeAttribute("data-peel-preparing");
        active.panelHidden = true;
        active.hintFrame = window.requestAnimationFrame(() => {
          if (
            active.cancelled ||
            active.startedPeeling ||
            activeRef.current !== active
          ) {
            active.hintFrame = null;
            return;
          }
          const hintStartedAt = performance.now();
          const animateReadyCurl = (now: number) => {
            if (
              active.cancelled ||
              active.startedPeeling ||
              activeRef.current !== active
            ) {
              active.hintFrame = null;
              return;
            }
            const elapsed = Math.min(
              1,
              Math.max(0, (now - hintStartedAt) / READY_CURL_DURATION),
            );
            const eased = 1 - (1 - elapsed) ** 3;
            controller.setPeelProgress(
              READY_CURL_PROGRESS * eased,
              hintMotion,
            );
            active.hintFrame =
              elapsed < 1
                ? window.requestAnimationFrame(animateReadyCurl)
                : null;
          };
          active.hintFrame = window.requestAnimationFrame(animateReadyCurl);
        });

        host.addEventListener("peelstart", () => {
          active.startedPeeling = true;
          active.dragStartPoint = { ...active.lastPoint };
          overlay.dataset.peeling = "true";
          controller.setOptions({
            peel: { surfaceShadow: true },
          });
          if (active.hintFrame !== null) {
            window.cancelAnimationFrame(active.hintFrame);
            active.hintFrame = null;
          }
        });
        host.addEventListener("peelchange", (peelEvent) => {
          if (!active.prankPhase) return;
          const progress =
            (peelEvent as CustomEvent<{ progress?: number }>).detail
              ?.progress ?? 0;
          const nextPhase =
            progress >= SIDEBAR_DETACH_THRESHOLD ? "warning" : "shock";
          if (nextPhase !== active.prankPhase) {
            active.prankPhase = nextPhase;
            onPrankPhaseChangeRef.current(nextPhase);
          }
        });
        host.addEventListener("peelend", (peelEvent) => {
          if (active.prankPhase) {
            active.prankPhase = null;
            onPrankPhaseChangeRef.current(null);
          }
          const detail = (
            peelEvent as CustomEvent<{
              progress?: number;
              willReset?: boolean;
            }>
          ).detail;
          overlay.dataset.releaseProgress = `${detail?.progress ?? 0}`;
          overlay.dataset.willReset = `${detail?.willReset ?? true}`;
          if (detail?.willReset === false) {
            overlay.dataset.detaching = "true";
          } else {
            overlay.dataset.peeling = "false";
            active.cleanupTimer = window.setTimeout(() => cleanup(active), 520);
          }
        });
        host.addEventListener("detachcomplete", () => {
          if (active.cancelled || activeRef.current !== active) return;
          onDetachedRef.current();
          cleanup(active, false);
          window.requestAnimationFrame(() => {
            panelRef.current?.removeAttribute("data-peel-captured");
          });
        });
      } catch (error) {
        console.warn("Could not prepare the sidebar peel easter egg.", error);
        cleanup(active);
      }
    },
    // Global listeners read the current active capture from refs.
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [cleanup, optionsRef, panelRef],
  );

  useEffect(
    () => () => {
      const active = activeRef.current;
      if (active) cleanup(active);
    },
    [cleanup],
  );

  return (
    <>
      {(
        [
          "top-left",
          "top-right",
          "bottom-left",
          "bottom-right",
        ] as const
      ).map((corner) => (
        <span
          key={corner}
          className="sidebar-peel-trigger"
          data-corner={corner}
          data-sidebar-peel-trigger=""
          aria-hidden="true"
          onMouseOver={(event) => void arm(corner, event)}
          onClick={(event) => void arm(corner, event)}
        />
      ))}
    </>
  );
}
