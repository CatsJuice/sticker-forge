"use client";

import { useEffect, useState, type ComponentType } from "react";

type TouchVisualizerComponent = ComponentType;

export function MobileDemoMode() {
  const [Visualizer, setVisualizer] =
    useState<TouchVisualizerComponent | null>(null);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    if (params.get("demo") !== "mobile") return;

    let active = true;
    void import("./TouchVisualizer").then(({ TouchVisualizer }) => {
      if (active) setVisualizer(() => TouchVisualizer);
    });

    return () => {
      active = false;
    };
  }, []);

  return Visualizer ? <Visualizer /> : null;
}
