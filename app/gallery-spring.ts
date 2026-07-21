"use client";

import { useEffect, useRef, useState } from "react";

const DEFAULT_MASS = 1;
const DEFAULT_STIFFNESS = 220;
const DEFAULT_DAMPING = 26;
const DEFAULT_PRECISION = 0.001;
const MAX_FRAME_DELTA = 1 / 20;
const INTEGRATION_STEP = 1 / 120;

type SpringBaseOptions = {
  /** Mass in the damped spring equation. Must be greater than zero. */
  mass?: number;
  /** Spring stiffness in the damped spring equation. */
  stiffness?: number;
  /** Viscous damping in the damped spring equation. */
  damping?: number;
  /** Position tolerance used to decide when the spring has settled. */
  precision?: number;
  /** Force an immediate result in addition to the OS reduced-motion setting. */
  reducedMotion?: boolean;
  /** Called once whenever a started transition reaches its target. */
  onRest?: () => void;
};

export type SpringValueOptions = SpringBaseOptions & {
  initial?: number;
};

export type SpringVectorOptions = SpringBaseOptions & {
  initial?: readonly number[];
};

export type SpringValueResult = {
  value: number;
  settled: boolean;
};

export type SpringVectorResult = {
  values: number[];
  settled: boolean;
};

type ResolvedSpringConfig = {
  mass: number;
  stiffness: number;
  damping: number;
  precision: number;
};

function finiteOr(value: number | undefined, fallback: number): number {
  return typeof value === "number" && Number.isFinite(value) ? value : fallback;
}

function resolveConfig(options: SpringBaseOptions): ResolvedSpringConfig {
  return {
    mass: Math.max(0.0001, finiteOr(options.mass, DEFAULT_MASS)),
    stiffness: Math.max(0.0001, finiteOr(options.stiffness, DEFAULT_STIFFNESS)),
    damping: Math.max(0, finiteOr(options.damping, DEFAULT_DAMPING)),
    precision: Math.max(0.000001, finiteOr(options.precision, DEFAULT_PRECISION)),
  };
}

function normalizeVector(
  value: readonly number[],
  fallback?: readonly number[],
): number[] {
  return value.map((component, index) =>
    Number.isFinite(component) ? component : (fallback?.[index] ?? 0),
  );
}

function vectorKey(value: readonly number[]): string {
  return JSON.stringify(normalizeVector(value));
}

function vectorsMatch(left: readonly number[], right: readonly number[]) {
  return (
    left.length === right.length &&
    left.every((component, index) => Object.is(component, right[index]))
  );
}

function vectorIsAtRest(
  position: readonly number[],
  velocity: readonly number[],
  target: readonly number[],
  config: ResolvedSpringConfig,
) {
  if (position.length !== target.length || velocity.length !== target.length) {
    return false;
  }
  const velocityPrecision = config.precision * 10;
  return position.every(
    (component, index) =>
      Math.abs(component - target[index]) <= config.precision &&
      Math.abs(velocity[index]) <= velocityPrecision,
  );
}

class SpringVectorEngine {
  position: number[];
  velocity: number[];
  target: number[];
  config: ResolvedSpringConfig;
  settled: boolean;
  pendingRest: boolean;

  constructor(
    position: readonly number[],
    target: readonly number[],
    config: ResolvedSpringConfig,
  ) {
    this.position = position.slice();
    this.velocity = position.map(() => 0);
    this.target = target.slice();
    this.config = config;
    this.settled = this.isAtRest();
    this.pendingRest = !this.settled;
  }

  setTarget(nextTarget: readonly number[]) {
    const changed = !vectorsMatch(nextTarget, this.target);
    if (!changed) return false;

    if (nextTarget.length !== this.target.length) {
      this.position = nextTarget.map(
        (component, index) => this.position[index] ?? component,
      );
      this.velocity = nextTarget.map((_, index) => this.velocity[index] ?? 0);
    }
    this.target = nextTarget.slice();
    this.settled = false;
    this.pendingRest = true;
    return true;
  }

  isAtRest() {
    return vectorIsAtRest(
      this.position,
      this.velocity,
      this.target,
      this.config,
    );
  }

  step(delta: number) {
    let remaining = Math.min(Math.max(delta, 0), MAX_FRAME_DELTA);
    while (remaining > 0) {
      const step = Math.min(remaining, INTEGRATION_STEP);
      for (let index = 0; index < this.position.length; index += 1) {
        const displacement = this.position[index] - this.target[index];
        const acceleration =
          (-this.config.stiffness * displacement -
            this.config.damping * this.velocity[index]) /
          this.config.mass;
        // Semi-implicit Euler is stable for the small fixed substeps above and
        // preserves the overshoot expected from an under-damped spring.
        this.velocity[index] += acceleration * step;
        this.position[index] += this.velocity[index] * step;
      }
      remaining -= step;
    }
  }

  snapToTarget() {
    this.position = this.target.slice();
    this.velocity = this.target.map(() => 0);
    this.settled = true;
  }

  takeRestNotification() {
    if (!this.pendingRest) return false;
    this.pendingRest = false;
    return true;
  }
}

function usePrefersReducedMotion() {
  const [reduced, setReduced] = useState(false);

  useEffect(() => {
    const query = window.matchMedia("(prefers-reduced-motion: reduce)");
    const update = () => setReduced(query.matches);
    update();
    query.addEventListener("change", update);
    return () => query.removeEventListener("change", update);
  }, []);

  return reduced;
}

function useSpringArray(
  targetInput: readonly number[],
  options: SpringVectorOptions,
): SpringVectorResult {
  const reducedByPreference = usePrefersReducedMotion();
  const reducedMotion = reducedByPreference || options.reducedMotion === true;
  const target = normalizeVector(targetInput);
  const initial = target.map((component, index) =>
    Number.isFinite(options.initial?.[index])
      ? (options.initial?.[index] as number)
      : component,
  );
  const targetSignature = vectorKey(target);
  const config = resolveConfig(options);
  const initialVelocity = initial.map(() => 0);
  const initialSettled = vectorIsAtRest(
    initial,
    initialVelocity,
    target,
    config,
  );
  const engineRef = useRef<SpringVectorEngine | null>(null);
  if (engineRef.current === null) {
    engineRef.current = new SpringVectorEngine(initial, target, config);
  }
  const onRestRef = useRef(options.onRest);
  const [values, setValues] = useState(() => initial.slice());
  const [settled, setSettled] = useState(initialSettled);

  useEffect(() => {
    onRestRef.current = options.onRest;
  }, [options.onRest]);

  useEffect(() => {
    const engine = engineRef.current;
    if (!engine) return;
    const nextTarget = JSON.parse(targetSignature) as number[];
    engine.config = {
      mass: config.mass,
      stiffness: config.stiffness,
      damping: config.damping,
      precision: config.precision,
    };
    engine.setTarget(nextTarget);

    if (!engine.pendingRest && engine.isAtRest()) {
      return;
    }

    let frame: number | null = null;
    let lastTime: number | null = null;

    const animate = (time: number) => {
      if (reducedMotion) {
        engine.snapToTarget();
        setValues(engine.position.slice());
        setSettled(true);
        if (engine.takeRestNotification()) onRestRef.current?.();
        frame = null;
        return;
      }

      engine.settled = false;
      setSettled(false);
      const delta = lastTime === null ? 1 / 60 : (time - lastTime) / 1000;
      lastTime = time;
      engine.step(delta);

      if (engine.isAtRest()) {
        engine.snapToTarget();
        setValues(engine.position.slice());
        setSettled(true);
        if (engine.takeRestNotification()) onRestRef.current?.();
        frame = null;
        return;
      }

      setValues(engine.position.slice());
      frame = requestAnimationFrame(animate);
    };

    frame = requestAnimationFrame(animate);
    return () => {
      if (frame !== null) cancelAnimationFrame(frame);
    };
  }, [
    config.damping,
    config.mass,
    config.precision,
    config.stiffness,
    reducedMotion,
    targetSignature,
  ]);

  return { values, settled };
}

/** Animate a scalar toward a changing target with a damped physical spring. */
export function useSpringValue(
  target: number,
  options: SpringValueOptions = {},
): SpringValueResult {
  const result = useSpringArray([target], {
    ...options,
    initial: options.initial === undefined ? undefined : [options.initial],
  });
  return { value: result.values[0] ?? target, settled: result.settled };
}

/** Animate an arbitrary numeric vector toward a changing target. */
export function useSpringVector(
  target: readonly number[],
  options: SpringVectorOptions = {},
): SpringVectorResult {
  return useSpringArray(target, options);
}
