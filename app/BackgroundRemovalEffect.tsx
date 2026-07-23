"use client";

import { useEffect, useRef } from "react";

import { getParticleEffectSettings } from "@/lib/particle-debug";

type Props = {
  source: string;
  resultPixels: Uint8ClampedArray;
  resultWidth: number;
  resultHeight: number;
  tilt: number;
  playing: boolean;
  onReady: () => void;
  onStart: () => void;
  onComplete: () => void;
};

function pixelNoise(x: number, y: number, seed: number) {
  let value = Math.imul(x + seed * 1013, 374761393);
  value = Math.imul(value ^ Math.imul(y + seed * 1619, 668265263), 1274126177);
  value ^= value >>> 16;
  return (value >>> 0) / 4_294_967_295;
}

const PARTICLE_LAUNCH_WINDOW_MS = 1_000;

export function BackgroundRemovalEffect({
  source,
  resultPixels,
  resultWidth,
  resultHeight,
  tilt,
  playing,
  onReady,
  onStart,
  onComplete,
}: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const readyRef = useRef(onReady);
  const startRef = useRef(onStart);
  const completeRef = useRef(onComplete);
  const startAnimationRef = useRef<(() => void) | null>(null);
  const playingRef = useRef(playing);

  useEffect(() => {
    readyRef.current = onReady;
  }, [onReady]);

  useEffect(() => {
    startRef.current = onStart;
  }, [onStart]);

  useEffect(() => {
    completeRef.current = onComplete;
  }, [onComplete]);

  useEffect(() => {
    playingRef.current = playing;
    if (playing) startAnimationRef.current?.();
  }, [playing]);

  useEffect(() => {
    const canvas = canvasRef.current;
    const parent = canvas?.parentElement;
    if (!canvas || !parent) return;
    let frame = 0;
    let cancelled = false;
    const image = new Image();

    image.onload = () => {
      if (cancelled) return;
      const bounds = parent.getBoundingClientRect();
      const canvasWidth = Math.max(1, Math.round(bounds.width));
      const canvasHeight = Math.max(1, Math.round(bounds.height));
      canvas.width = canvasWidth;
      canvas.height = canvasHeight;
      canvas.style.width = `${bounds.width}px`;
      canvas.style.height = `${bounds.height}px`;
      const context = canvas.getContext("2d", { alpha: true });
      if (!context) return;

      // Mirror the image preparation and mesh sizing used by StickerRenderer
      // so every removed pixel begins exactly over its rendered source pixel.
      const sourceAspect = Math.max(
        0.15,
        Math.min(8, resultWidth / Math.max(1, resultHeight)),
      );
      const contentMax = 1740;
      const texturePadding = 144;
      const contentWidth =
        sourceAspect >= 1 ? contentMax : contentMax * sourceAspect;
      const contentHeight =
        sourceAspect >= 1 ? contentMax / sourceAspect : contentMax;
      const textureWidth = contentWidth + texturePadding * 2;
      const textureHeight = contentHeight + texturePadding * 2;
      const textureAspect = textureWidth / textureHeight;
      const maximumMeshWidth = Math.min(bounds.width * 0.78, 760);
      const maximumMeshHeight = Math.min(bounds.height * 0.58, 520);
      let meshWidth = maximumMeshWidth;
      let meshHeight = meshWidth / textureAspect;
      if (meshHeight > maximumMeshHeight) {
        meshHeight = maximumMeshHeight;
        meshWidth = meshHeight * textureAspect;
      }
      const drawWidth = Math.max(
        1,
        Math.round(meshWidth * (contentWidth / textureWidth)),
      );
      const drawHeight = Math.max(
        1,
        Math.round(meshHeight * (contentHeight / textureHeight)),
      );
      const centerX = canvasWidth / 2;
      const centerY = canvasHeight / 2;
      // WebGL rotates in a Y-up coordinate system; Canvas pixels use Y-down.
      // Negate the renderer tilt so both layers share the same screen rotation.
      const tiltRadians = (-tilt * Math.PI) / 180;
      const tiltCosine = Math.cos(tiltRadians);
      const tiltSine = Math.sin(tiltRadians);

      const originalCanvas = document.createElement("canvas");
      originalCanvas.width = drawWidth;
      originalCanvas.height = drawHeight;
      const originalContext = originalCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!originalContext) return;
      originalContext.drawImage(image, 0, 0, drawWidth, drawHeight);
      const original = originalContext.getImageData(
        0,
        0,
        drawWidth,
        drawHeight,
      ).data;

      const resultCanvas = document.createElement("canvas");
      resultCanvas.width = resultWidth;
      resultCanvas.height = resultHeight;
      const resultContext = resultCanvas.getContext("2d");
      if (!resultContext) return;
      resultContext.putImageData(
        new ImageData(
          new Uint8ClampedArray(resultPixels),
          resultWidth,
          resultHeight,
        ),
        0,
        0,
      );

      const resizedResultCanvas = document.createElement("canvas");
      resizedResultCanvas.width = drawWidth;
      resizedResultCanvas.height = drawHeight;
      const resizedResultContext = resizedResultCanvas.getContext("2d", {
        willReadFrequently: true,
      });
      if (!resizedResultContext) return;
      resizedResultContext.drawImage(
        resultCanvas,
        0,
        0,
        drawWidth,
        drawHeight,
      );
      const retained = resizedResultContext.getImageData(
        0,
        0,
        drawWidth,
        drawHeight,
      ).data;

      const maximumPixels = drawWidth * drawHeight;
      const sourceX = new Float32Array(maximumPixels);
      const sourceY = new Float32Array(maximumPixels);
      const colors = new Uint8ClampedArray(maximumPixels * 4);
      const delays = new Float32Array(maximumPixels);
      const travels = new Float32Array(maximumPixels);
      const directionOffsets = new Float32Array(maximumPixels);
      const phases = new Float32Array(maximumPixels);
      const particleSpeeds = new Float32Array(maximumPixels);
      const particleLifetimes = new Float32Array(maximumPixels);
      const swayAmplitudes = new Float32Array(maximumPixels);
      const swayFrequencies = new Float32Array(maximumPixels);
      const particleSettings = getParticleEffectSettings();
      let pixelCount = 0;

      for (let y = 0; y < drawHeight; y += 1) {
        for (let x = 0; x < drawWidth; x += 1) {
          const sourceIndex = (y * drawWidth + x) * 4;
          const removedAlpha = Math.max(
            0,
            original[sourceIndex + 3] - retained[sourceIndex + 3],
          );
          if (removedAlpha === 0) continue;

          const localX = x - drawWidth / 2;
          const localY = y - drawHeight / 2;
          sourceX[pixelCount] =
            centerX + localX * tiltCosine - localY * tiltSine;
          sourceY[pixelCount] =
            centerY + localX * tiltSine + localY * tiltCosine;
          const colorIndex = pixelCount * 4;
          colors[colorIndex] = original[sourceIndex];
          colors[colorIndex + 1] = original[sourceIndex + 1];
          colors[colorIndex + 2] = original[sourceIndex + 2];
          colors[colorIndex + 3] = removedAlpha;
          delays[pixelCount] =
            (x / Math.max(1, drawWidth - 1)) * 0.18
            + pixelNoise(x, y, 1) * 0.22;
          travels[pixelCount] = 125 + pixelNoise(x, y, 2) * 225;
          directionOffsets[pixelCount] = pixelNoise(x, y, 3) - 0.5;
          phases[pixelCount] = pixelNoise(x, y, 4) * Math.PI * 2;
          particleSpeeds[pixelCount] =
            particleSettings.speedMin
            + pixelNoise(x, y, 5)
            * (particleSettings.speedMax - particleSettings.speedMin);
          particleLifetimes[pixelCount] =
            particleSettings.durationMin
            + pixelNoise(x, y, 6)
            * (particleSettings.durationMax - particleSettings.durationMin);
          swayAmplitudes[pixelCount] =
            0.65 + pixelNoise(x, y, 7) * 0.7;
          swayFrequencies[pixelCount] =
            0.72 + pixelNoise(x, y, 8) * 0.68;
          pixelCount += 1;
        }
      }

      // Allocate and initialize everything before telling the renderer to swap
      // to the cutout. This keeps the original WebGL sticker visible until the
      // replacement particle layer has a complete first frame.
      const output = context.createImageData(canvasWidth, canvasHeight);
      const outputPixels = output.data;
      const rowStride = canvasWidth * 4;
      const writePixel = (
        pixelIndex: number,
        colorIndex: number,
        pixelAlpha: number,
      ) => {
        if (pixelAlpha <= outputPixels[pixelIndex + 3]) return;
        outputPixels[pixelIndex] = colors[colorIndex];
        outputPixels[pixelIndex + 1] = colors[colorIndex + 1];
        outputPixels[pixelIndex + 2] = colors[colorIndex + 2];
        outputPixels[pixelIndex + 3] = pixelAlpha;
      };

      const drawFrame = (elapsed: number) => {
        const shrinkDelay = particleSettings.shrinkDelay;
        const shrinkDuration = particleSettings.shrinkDuration;
        outputPixels.fill(0);
        const particleSize = particleSettings.particleSize;
        const spread = particleSettings.spread;
        const chaos = particleSettings.chaos;
        const swayAmplitude = particleSettings.swayAmplitude;
        const swaySpeed = particleSettings.swaySpeed;
        // Canvas Y points down, so a negative angle travels toward the
        // upper-right. Chaos only fans particles around this shared wind axis.
        const baseDirection = -Math.PI * 0.22;

        for (let index = 0; index < pixelCount; index += 1) {
          const lifetime = particleLifetimes[index];
          if (elapsed >= lifetime) continue;
          const launchDelay = Math.min(
            delays[index] * PARTICLE_LAUNCH_WINDOW_MS,
            lifetime * 0.35,
          );
          const motionElapsed = Math.max(
            0,
            elapsed - launchDelay,
          );
          const movementProgress = Math.min(
            1,
            motionElapsed / Math.max(1, lifetime - launchDelay),
          );
          // Start from rest, accelerate hard, then spend most of the lifetime
          // easing into a very soft exit. Driving both travel and sway with
          // this curve prevents residual constant-speed motion at the end.
          const easedTravel =
            (1 - Math.exp(-8 * movementProgress * movementProgress))
            / (1 - Math.exp(-8));
          // Preserve a visible terminal velocity. The cubic drift has zero
          // velocity at launch but a non-zero derivative at progress 1, so a
          // particle is still moving on the frame where it fully fades out.
          const terminalDrift = 0.08;
          const travelProgress =
            easedTravel * (1 - terminalDrift)
            + movementProgress
            * movementProgress
            * movementProgress
            * terminalDrift;
          const swayEnvelope = Math.min(
            1,
            movementProgress * 2.4,
          );
          const direction =
            baseDirection + directionOffsets[index] * 1.1 * chaos;
          const travel = travels[index] * spread;
          const velocityX =
            Math.cos(direction) * travel * particleSpeeds[index];
          const velocityY =
            (Math.sin(direction) * travels[index] - 18)
            * spread
            * particleSpeeds[index];
          const sway =
            Math.sin(
              phases[index]
              + travelProgress
              * swaySpeed
              * swayFrequencies[index]
              * Math.PI,
            )
            * swayAmplitude
            * swayAmplitudes[index]
            * swayEnvelope;
          const tangentX = -Math.sin(direction);
          const tangentY = Math.cos(direction);
          const x = Math.round(
            sourceX[index] + velocityX * travelProgress + tangentX * sway,
          );
          const y = Math.round(
            sourceY[index]
              + velocityY * travelProgress
              + tangentY * sway
              + 12 * spread * travelProgress,
          );
          if (x < 0 || x >= canvasWidth || y < 0 || y >= canvasHeight) continue;

          const colorIndex = index * 4;
          const targetIndex = (y * canvasWidth + x) * 4;
          const particleShrinkDuration = Math.min(
            shrinkDuration,
            Math.max(50, lifetime - shrinkDelay - 10),
          );
          const particleShrinkDelay = Math.max(
            shrinkDelay,
            lifetime - particleShrinkDuration,
          );
          const shrinkProgress = Math.max(
            0,
            Math.min(
              1,
              (elapsed - particleShrinkDelay) / particleShrinkDuration,
            ),
          );
          const easedShrink =
            shrinkProgress
            * shrinkProgress
            * (3 - 2 * shrinkProgress);
          const currentParticleSize =
            particleSize * (1 - easedShrink);
          if (currentParticleSize <= 0.15) continue;
          const maximumShoulder = Math.ceil(
            Math.max(0, currentParticleSize - 1),
          );
          const alpha = Math.round(
            colors[colorIndex + 3] * (1 - movementProgress),
          );
          if (alpha <= 0) continue;
          writePixel(targetIndex, colorIndex, alpha);

          // Each source pixel remains a single particle, but grows a soft
          // one-pixel shoulder once it leaves its exact source coordinate.
          for (let shoulder = 1; shoulder <= maximumShoulder; shoulder += 1) {
            const coverage = Math.max(
              0,
              Math.min(1, currentParticleSize - shoulder),
            );
            const shoulderAlpha = Math.round(
              alpha
              * Math.min(0.48, movementProgress * 1.35)
              * coverage,
            );
            if (shoulderAlpha <= 0) continue;
            if (x - shoulder >= 0) {
              writePixel(
                targetIndex - shoulder * 4,
                colorIndex,
                shoulderAlpha,
              );
            }
            if (x + shoulder < canvasWidth) {
              writePixel(
                targetIndex + shoulder * 4,
                colorIndex,
                shoulderAlpha,
              );
            }
            if (y - shoulder >= 0) {
              writePixel(
                targetIndex - shoulder * canvasWidth * 4,
                colorIndex,
                shoulderAlpha,
              );
            }
            if (y + shoulder < canvasHeight) {
              writePixel(
                targetIndex + shoulder * rowStride,
                colorIndex,
                shoulderAlpha,
              );
            }
          }
        }

        context.putImageData(output, 0, 0);
      };

      let started = false;
      const startAnimation = () => {
        if (cancelled || started) return;
        started = true;
        const startedAt = performance.now();
        startRef.current();
        const draw = (now: number) => {
          if (cancelled) return;
          const elapsed = now - startedAt;
          drawFrame(elapsed);
          if (elapsed < particleSettings.durationMax + 100) {
            frame = requestAnimationFrame(draw);
          } else {
            completeRef.current();
          }
        };
        frame = requestAnimationFrame(draw);
      };
      startAnimationRef.current = startAnimation;

      drawFrame(0);
      frame = requestAnimationFrame(() => {
        if (cancelled) return;
        readyRef.current();
        if (playingRef.current) startAnimation();
      });
    };
    image.src = source;

    return () => {
      cancelled = true;
      cancelAnimationFrame(frame);
      startAnimationRef.current = null;
    };
  }, [resultHeight, resultPixels, resultWidth, source, tilt]);

  return <canvas ref={canvasRef} className="background-removal-particles" aria-hidden="true" />;
}
