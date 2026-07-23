"use client";

import { useEffect, useState } from "react";

import {
  getParticleEffectSettings,
  updateParticleEffectSettings,
} from "@/lib/particle-debug";
import {
  getLaserEffectSettings,
  LASER_PREVIEW_EVENT,
  updateLaserEffectSettings,
} from "@/lib/laser-debug";

type DebugBinding = {
  on: (event: "change" | "click", callback: () => void) => void;
};

type DebugFolder = {
  addButton: (options: { title: string }) => DebugBinding;
  addBinding: (
    target: Record<string, number>,
    key: string,
    options: {
      label: string;
      min: number;
      max: number;
      step: number;
    },
  ) => DebugBinding;
};

type DebugPaneInstance = {
  addFolder: (options: {
    title: string;
    expanded: boolean;
  }) => DebugFolder;
  dispose: () => void;
  refresh: () => void;
};

type DebugLocale = "zh" | "en";

const COPY = {
  zh: {
    title: "Sticker Forge 调试",
    particles: "背景移除 · 粒子",
    particleSize: "粒子大小",
    spread: "扩散范围",
    speedMin: "最小扩散速度",
    speedMax: "最大扩散速度",
    chaos: "混乱强度",
    durationMin: "最短消散时长",
    durationMax: "最长消散时长",
    swayAmplitude: "摆动幅度",
    swaySpeed: "摆动速度",
    shrinkDelay: "缩小延迟",
    shrinkDuration: "缩小时长",
    entranceDelay: "贴纸入场延迟",
    laser: "背景移除 · 镭射扫描",
    sweepDuration: "扫描时长",
    cycleDuration: "循环时长",
    coreWidth: "核心宽度",
    bandWidth: "光带宽度",
    bandOpacity: "光带透明度",
    brightness: "光带亮度",
    highlightIntensity: "高光强度",
    distortionRange: "扭曲范围",
    distortionStrength: "扭曲强度",
    rippleDensity: "波纹密度",
    rippleSpeed: "波纹速度",
    previewLaser: "预览扫描",
  },
  en: {
    title: "Sticker Forge Debug",
    particles: "Background Removal · Particles",
    particleSize: "Particle size",
    spread: "Spread range",
    speedMin: "Minimum spread speed",
    speedMax: "Maximum spread speed",
    chaos: "Chaos intensity",
    durationMin: "Minimum lifetime",
    durationMax: "Maximum lifetime",
    swayAmplitude: "Sway amplitude",
    swaySpeed: "Sway speed",
    shrinkDelay: "Shrink delay",
    shrinkDuration: "Shrink duration",
    entranceDelay: "Sticker entrance delay",
    laser: "Background Removal · Laser Scan",
    sweepDuration: "Sweep duration",
    cycleDuration: "Cycle duration",
    coreWidth: "Core width",
    bandWidth: "Band width",
    bandOpacity: "Band opacity",
    brightness: "Brightness",
    highlightIntensity: "Highlight intensity",
    distortionRange: "Distortion range",
    distortionStrength: "Distortion strength",
    rippleDensity: "Ripple density",
    rippleSpeed: "Ripple speed",
    previewLaser: "Preview scan",
  },
} satisfies Record<DebugLocale, Record<string, string>>;

function getDocumentLocale(): DebugLocale {
  return document.documentElement.lang.toLowerCase().startsWith("en")
    ? "en"
    : "zh";
}

export function DebugPanel() {
  const [locale, setLocale] = useState<DebugLocale>("zh");

  useEffect(() => {
    const syncLocale = () => setLocale(getDocumentLocale());
    const observer = new MutationObserver(syncLocale);
    syncLocale();
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ["lang"],
    });
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("debug") !== "true") return;

    const t = COPY[locale];
    let disposed = false;
    let disposePane: (() => void) | undefined;

    void import("tweakpane").then(({ Pane }) => {
      if (disposed) return;
      const container = document.createElement("div");
      container.className = "debug-pane-host";
      document.body.appendChild(container);

      const pane = new Pane({
        title: t.title,
        container,
      }) as unknown as DebugPaneInstance;
      const particles = { ...getParticleEffectSettings() };
      const particleFolder = pane.addFolder({
        title: t.particles,
        expanded: true,
      });

      const particleBindings = [
        particleFolder.addBinding(particles, "particleSize", {
          label: t.particleSize,
          min: 1,
          max: 4,
          step: 0.1,
        }),
        particleFolder.addBinding(particles, "spread", {
          label: t.spread,
          min: 0.1,
          max: 3,
          step: 0.05,
        }),
        particleFolder.addBinding(particles, "speedMin", {
          label: t.speedMin,
          min: 0.2,
          max: 3,
          step: 0.05,
        }),
        particleFolder.addBinding(particles, "speedMax", {
          label: t.speedMax,
          min: 0.2,
          max: 4,
          step: 0.05,
        }),
        particleFolder.addBinding(particles, "chaos", {
          label: t.chaos,
          min: 0,
          max: 3,
          step: 0.05,
        }),
        particleFolder.addBinding(particles, "durationMin", {
          label: t.durationMin,
          min: 300,
          max: 6000,
          step: 10,
        }),
        particleFolder.addBinding(particles, "durationMax", {
          label: t.durationMax,
          min: 300,
          max: 8000,
          step: 10,
        }),
        particleFolder.addBinding(particles, "swayAmplitude", {
          label: t.swayAmplitude,
          min: 0,
          max: 80,
          step: 1,
        }),
        particleFolder.addBinding(particles, "swaySpeed", {
          label: t.swaySpeed,
          min: 0,
          max: 10,
          step: 0.1,
        }),
        particleFolder.addBinding(particles, "shrinkDelay", {
          label: t.shrinkDelay,
          min: 0,
          max: 4000,
          step: 10,
        }),
        particleFolder.addBinding(particles, "shrinkDuration", {
          label: t.shrinkDuration,
          min: 50,
          max: 5000,
          step: 10,
        }),
        particleFolder.addBinding(particles, "entranceDelay", {
          label: t.entranceDelay,
          min: 0,
          max: 6000,
          step: 10,
        }),
      ];

      for (const binding of particleBindings) {
        binding.on("change", () => {
          Object.assign(
            particles,
            updateParticleEffectSettings(particles),
          );
          pane.refresh();
        });
      }

      const laser = { ...getLaserEffectSettings() };
      const laserFolder = pane.addFolder({
        title: t.laser,
        expanded: false,
      });
      laserFolder.addButton({ title: t.previewLaser }).on("click", () => {
        window.dispatchEvent(new Event(LASER_PREVIEW_EVENT));
      });
      const laserBindings = [
        laserFolder.addBinding(laser, "sweepDuration", {
          label: t.sweepDuration,
          min: 150,
          max: 4000,
          step: 10,
        }),
        laserFolder.addBinding(laser, "cycleDuration", {
          label: t.cycleDuration,
          min: 200,
          max: 6000,
          step: 10,
        }),
        laserFolder.addBinding(laser, "coreWidth", {
          label: t.coreWidth,
          min: 0.01,
          max: 0.25,
          step: 0.005,
        }),
        laserFolder.addBinding(laser, "bandWidth", {
          label: t.bandWidth,
          min: 0.02,
          max: 0.7,
          step: 0.01,
        }),
        laserFolder.addBinding(laser, "bandOpacity", {
          label: t.bandOpacity,
          min: 0,
          max: 1,
          step: 0.01,
        }),
        laserFolder.addBinding(laser, "brightness", {
          label: t.brightness,
          min: 0,
          max: 2,
          step: 0.05,
        }),
        laserFolder.addBinding(laser, "highlightIntensity", {
          label: t.highlightIntensity,
          min: 0,
          max: 1.5,
          step: 0.05,
        }),
        laserFolder.addBinding(laser, "distortionRange", {
          label: t.distortionRange,
          min: 0.02,
          max: 0.6,
          step: 0.01,
        }),
        laserFolder.addBinding(laser, "distortionStrength", {
          label: t.distortionStrength,
          min: 0,
          max: 4,
          step: 0.05,
        }),
        laserFolder.addBinding(laser, "rippleDensity", {
          label: t.rippleDensity,
          min: 1,
          max: 60,
          step: 1,
        }),
        laserFolder.addBinding(laser, "rippleSpeed", {
          label: t.rippleSpeed,
          min: 0,
          max: 12,
          step: 0.1,
        }),
      ];
      for (const binding of laserBindings) {
        binding.on("change", () => {
          Object.assign(laser, updateLaserEffectSettings(laser));
          pane.refresh();
        });
      }

      disposePane = () => {
        pane.dispose();
        container.remove();
      };
    });

    return () => {
      disposed = true;
      disposePane?.();
    };
  }, [locale]);

  return null;
}
