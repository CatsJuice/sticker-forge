import defaultPeelSoundUrl from "./assets/elevenlabs-sticker-peel-foley.mp3?inline";
import reappearSoundUrl from "./assets/sticker-reappear.wav?inline";

export const DEFAULT_PEEL_SOUND_URL = defaultPeelSoundUrl;
export const DEFAULT_REAPPEAR_SOUND_URL = reappearSoundUrl;

const MAX_ACTIVE_VOICES = 5;
const MOTION_EPSILON = 0.0007;
const VELOCITY_THRESHOLD = 0.018;
const LIFT_TRIGGER = 0.012;
const LIFT_REARM = 0.006;
const FINISH_TRIGGER = 0.985;
const FINISH_REARM = 0.95;
const ACCENT_ACCELERATION = 4;
const ACCENT_COOLDOWN_MS = 90;
const HOLD_SILENCE_MS = 48;

type AudioContextConstructor = new (
  contextOptions?: AudioContextOptions,
) => AudioContext;

type AudioWindow = Window & {
  webkitAudioContext?: AudioContextConstructor;
};

type CueKind =
  | "lift"
  | "texture"
  | "reattach"
  | "accent"
  | "finish"
  | "reappear";
type SliceBankName = "micro" | "body" | "accent";

type AudioSlice = {
  key: string;
  start: number;
  end: number;
  trim: number;
};

type SampleProfile = {
  lift: AudioSlice;
  micro: AudioSlice[];
  body: AudioSlice[];
  accent: AudioSlice[];
  finish: AudioSlice;
};

type ActiveVoice = {
  source: AudioBufferSourceNode;
  gain: GainNode;
  nodes: AudioNode[];
  kind: CueKind;
};

type GrainOptions = {
  kind: CueKind;
  duration: number;
  playbackRate: number;
  gain: number;
  lowpass: number;
  highpass: number;
  attack: number;
  release: number;
  pan: number;
};

export type PeelAudioConfig = {
  enabled: boolean;
  src: string;
  volume: number;
  useBuiltInProfile?: boolean;
};

let sharedAudioContext: AudioContext | null = null;
const decodedBuffers = new Map<string, Promise<AudioBuffer>>();
const PROCESSED_SOURCE_START = 0.16;

function processedSlice(
  key: string,
  sourceStart: number,
  sourceEnd: number,
  trim: number,
): AudioSlice {
  return {
    key,
    start: sourceStart - PROCESSED_SOURCE_START,
    end: sourceEnd - PROCESSED_SOURCE_START,
    trim,
  };
}

const BUILT_IN_PROFILE: SampleProfile = {
  // The bundled mono asset is a non-destructive derivative of the supplied
  // recording: source 0.16-1.82s, high-passed at 150Hz, with its long silent
  // tail removed. These source-time slices make it an audio sprite.
  lift: processedSlice("lift", 0.178, 0.325, 2.65),
  micro: [
    processedSlice("micro-a", 0.185, 0.205, 2.9),
    processedSlice("micro-b", 0.282, 0.322, 2.8),
    processedSlice("micro-c", 0.407, 0.44, 2.75),
    processedSlice("micro-d", 0.483, 0.565, 2.65),
    processedSlice("micro-e", 0.603, 0.698, 2.55),
    processedSlice("micro-f", 0.724, 0.92, 2.45),
  ],
  body: [
    processedSlice("body-a", 0.94, 1.126, 0.64),
    processedSlice("body-b", 1.352, 1.446, 0.7),
    processedSlice("body-c", 1.558, 1.708, 0.68),
  ],
  accent: [
    processedSlice("accent-a", 1.222, 1.292, 0.58),
    processedSlice("accent-b", 1.574, 1.715, 0.62),
  ],
  finish: processedSlice("finish", 1.73, 1.795, 0.72),
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function smoothstep(edge0: number, edge1: number, value: number) {
  const position = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return position * position * (3 - 2 * position);
}

function randomBetween(min: number, max: number) {
  return min + Math.random() * (max - min);
}

function shuffledIndices(length: number) {
  const indices = Array.from({ length }, (_, index) => index);
  for (let index = indices.length - 1; index > 0; index -= 1) {
    const swapIndex = Math.floor(Math.random() * (index + 1));
    [indices[index], indices[swapIndex]] = [
      indices[swapIndex],
      indices[index],
    ];
  }
  return indices;
}

function decibelsToGain(decibels: number) {
  return 10 ** (decibels / 20);
}

function randomPitch(maxSemitones: number) {
  return 2 ** (randomBetween(-maxSemitones, maxSemitones) / 12);
}

function randomSpacingMultiplier() {
  const exponential = -Math.log(Math.max(0.001, 1 - Math.random()));
  return clamp(exponential, 0.55, 1.8);
}

function nowMilliseconds() {
  return typeof performance === "undefined" ? Date.now() : performance.now();
}

function getSharedAudioContext() {
  if (sharedAudioContext) return sharedAudioContext;
  if (typeof window === "undefined") return null;

  const AudioContextClass =
    window.AudioContext ?? (window as AudioWindow).webkitAudioContext;
  if (!AudioContextClass) return null;

  try {
    sharedAudioContext = new AudioContextClass({ latencyHint: "interactive" });
  } catch {
    return null;
  }
  return sharedAudioContext;
}

function loadAudioBuffer(src: string, context: AudioContext) {
  const cached = decodedBuffers.get(src);
  if (cached) return cached;

  const pending = fetch(src)
    .then((response) => {
      if (!response.ok) {
        throw new Error(`Peel audio request failed with ${response.status}.`);
      }
      return response.arrayBuffer();
    })
    .then((encoded) => context.decodeAudioData(encoded));
  decodedBuffers.set(src, pending);
  void pending.catch(() => {
    if (decodedBuffers.get(src) === pending) decodedBuffers.delete(src);
  });
  return pending;
}

function relativeSlice(
  key: string,
  duration: number,
  startRatio: number,
  endRatio: number,
  trim = 1,
): AudioSlice {
  return {
    key,
    start: duration * startRatio,
    end: duration * endRatio,
    trim,
  };
}

function genericProfile(duration: number): SampleProfile {
  return {
    lift: relativeSlice("lift", duration, 0.02, 0.18, 1.2),
    micro: [
      relativeSlice("micro-a", duration, 0.12, 0.32, 1.05),
      relativeSlice("micro-b", duration, 0.28, 0.48, 1),
      relativeSlice("micro-c", duration, 0.44, 0.62, 0.95),
    ],
    body: [
      relativeSlice("body-a", duration, 0.32, 0.56, 0.9),
      relativeSlice("body-b", duration, 0.52, 0.76, 0.86),
      relativeSlice("body-c", duration, 0.7, 0.88, 0.82),
    ],
    accent: [relativeSlice("accent", duration, 0.58, 0.78, 0.82)],
    finish: relativeSlice("finish", duration, 0.8, 0.98, 0.9),
  };
}

/**
 * Turns one peel recording into event-driven foley. Progress is used only to
 * detect lift/finish boundaries; motion velocity controls the texture itself.
 */
export class PeelAudioEngine {
  private enabled = false;
  private src = "";
  private volume = 0.7;
  private useBuiltInProfile = false;
  private buffer: AudioBuffer | null = null;
  private reappearBuffer: AudioBuffer | null = null;
  private profile: SampleProfile | null = null;
  private loadRevision = 0;
  private masterGain: GainNode | null = null;
  private compressor: DynamicsCompressorNode | null = null;
  private activeVoices = new Set<ActiveVoice>();
  private gestureActive = false;
  private lastProgress = 0;
  private lastUpdateTime = 0;
  private smoothedVelocity = 0;
  private smoothedAcceleration = 0;
  private forwardTravel = 0;
  private backwardTravel = 0;
  private nextForwardSpacing = 0.006;
  private nextBackwardSpacing = 0.025;
  private liftArmed = true;
  private finishArmed = true;
  private fullyDetached = false;
  private lastAccentTime = -Infinity;
  private holdTimer: number | null = null;
  private panWalk = 0;
  private lastSliceKey = "";
  private sliceBags: Record<SliceBankName, number[]> = {
    micro: [],
    body: [],
    accent: [],
  };
  private destroyed = false;

  configure(config: PeelAudioConfig) {
    if (this.destroyed) return;
    const nextSource = config.src.trim();
    const nextBuiltInProfile = Boolean(config.useBuiltInProfile);
    const sourceChanged = nextSource !== this.src;
    const profileChanged = nextBuiltInProfile !== this.useBuiltInProfile;

    this.enabled = config.enabled && Boolean(nextSource);
    this.src = nextSource;
    this.volume = clamp(config.volume, 0, 1);
    this.useBuiltInProfile = nextBuiltInProfile;

    if (this.masterGain) {
      this.masterGain.gain.setTargetAtTime(
        this.volume,
        this.masterGain.context.currentTime,
        0.012,
      );
    }

    if (sourceChanged || profileChanged) {
      this.reset(0);
      this.buffer = null;
      this.profile = null;
      this.loadRevision += 1;
    }
    if (!this.enabled) {
      this.reset(this.lastProgress);
      return;
    }
    if (!this.buffer) this.preload();
    if (!this.reappearBuffer) this.preloadReappear();
  }

  unlock() {
    if (!this.enabled || this.destroyed) return;
    const context = getSharedAudioContext();
    if (!context) return;
    if (context.state === "suspended") {
      void context.resume().catch(() => {
        // A later trusted pointer or keyboard event can retry the resume.
      });
    }
    if (!this.buffer) this.preload();
    if (!this.reappearBuffer) this.preloadReappear();
  }

  begin(progress: number, timestamp = nowMilliseconds()) {
    this.clearHoldTimer();
    this.gestureActive = true;
    this.lastProgress = clamp(progress, 0, 1);
    this.lastUpdateTime = timestamp;
    this.smoothedVelocity = 0;
    this.smoothedAcceleration = 0;
    this.forwardTravel = 0;
    this.backwardTravel = 0;
    this.nextForwardSpacing = randomBetween(0.004, 0.008);
    this.nextBackwardSpacing = randomBetween(0.018, 0.032);
    this.lastAccentTime = -Infinity;
    this.panWalk = 0;
    this.stopVoices(new Set<CueKind>(["texture", "reattach"]), 0.012);
    if (this.lastProgress <= LIFT_REARM) this.liftArmed = true;
    if (this.lastProgress < FINISH_REARM) {
      this.fullyDetached = false;
      this.finishArmed = true;
    } else if (this.lastProgress >= FINISH_TRIGGER) {
      this.fullyDetached = true;
      this.finishArmed = false;
    }
  }

  update(
    progress: number,
    timestamp = nowMilliseconds(),
    horizontalDirection = 0,
  ) {
    const nextProgress = clamp(progress, 0, 1);
    if (!this.gestureActive) {
      this.begin(nextProgress, timestamp);
      return;
    }

    const previousProgress = this.lastProgress;
    const elapsedSeconds = Math.max((timestamp - this.lastUpdateTime) / 1000, 0);
    const delta = nextProgress - previousProgress;
    this.lastProgress = nextProgress;
    this.lastUpdateTime = timestamp;

    if (nextProgress <= LIFT_REARM) this.liftArmed = true;
    if (nextProgress < FINISH_REARM) {
      this.fullyDetached = false;
      this.finishArmed = true;
    }

    if (Math.abs(delta) < MOTION_EPSILON) {
      const decay = Math.exp(-Math.min(elapsedSeconds, 0.12) / 0.045);
      this.smoothedVelocity *= decay;
      this.smoothedAcceleration *= decay;
      return;
    }

    this.armHoldSilence();

    const measurementDelta = clamp(elapsedSeconds || 1 / 60, 1 / 240, 0.25);
    if (elapsedSeconds > 0.14) {
      this.smoothedVelocity = 0;
      this.smoothedAcceleration = 0;
    }
    const rawVelocity = delta / measurementDelta;
    const previousVelocity = this.smoothedVelocity;
    const velocityBlend = 1 - Math.exp(-measurementDelta / 0.045);
    this.smoothedVelocity +=
      (rawVelocity - this.smoothedVelocity) * velocityBlend;
    const rawAcceleration =
      (this.smoothedVelocity - previousVelocity) / measurementDelta;
    const previousAcceleration = this.smoothedAcceleration;
    const accelerationBlend = 1 - Math.exp(-measurementDelta / 0.075);
    this.smoothedAcceleration +=
      (rawAcceleration - this.smoothedAcceleration) * accelerationBlend;

    const speed =
      Math.abs(rawVelocity) * 0.52 + Math.abs(this.smoothedVelocity) * 0.48;
    const intensity = clamp(Math.log1p(8 * speed) / Math.log(13), 0, 1);
    this.panWalk = clamp(
      this.panWalk + randomBetween(-0.018, 0.018),
      -0.05,
      0.05,
    );
    const pan = clamp(horizontalDirection * 0.08 + this.panWalk, -0.12, 0.12);

    if (this.fullyDetached && nextProgress >= FINISH_REARM) {
      this.forwardTravel = 0;
      this.backwardTravel = 0;
      this.stopVoices(new Set<CueKind>(["texture", "reattach"]), 0.01);
      return;
    }

    if (delta > 0 && speed >= VELOCITY_THRESHOLD) {
      this.stopVoices(new Set<CueKind>(["reattach"]), 0.012);
      const crossedLift =
        this.liftArmed &&
        previousProgress <= LIFT_TRIGGER &&
        nextProgress >= LIFT_TRIGGER;
      if (crossedLift) {
        this.playLift(intensity, pan);
        this.liftArmed = false;
      }

      const crossedFinish =
        this.finishArmed &&
        previousProgress < FINISH_TRIGGER &&
        nextProgress >= FINISH_TRIGGER;
      if (crossedFinish) {
        this.playFinish(intensity, pan);
        this.finishArmed = false;
        this.fullyDetached = true;
        this.forwardTravel = 0;
        this.backwardTravel = 0;
        return;
      }

      if (!this.fullyDetached) {
        this.forwardTravel += delta;
        const rate = 6 + 44 * intensity ** 0.75;
        const meanSpacing = clamp(speed / rate, 0.0032, 0.035);
        let emitted = 0;
        while (
          this.forwardTravel >= this.nextForwardSpacing &&
          emitted < 2
        ) {
          const envelope =
            smoothstep(0.008, 0.035, nextProgress) *
            (1 - 0.28 * smoothstep(0.86, 0.98, nextProgress));
          this.playTexture(intensity, envelope, pan);
          this.forwardTravel -= this.nextForwardSpacing;
          this.nextForwardSpacing = meanSpacing * randomSpacingMultiplier();
          emitted += 1;
        }
        if (emitted === 2 && this.forwardTravel >= this.nextForwardSpacing) {
          // Drop catch-up work after a large frame jump instead of playing late.
          this.forwardTravel = 0;
        }
      }

      const crossedAccent =
        previousAcceleration <= ACCENT_ACCELERATION &&
        this.smoothedAcceleration > ACCENT_ACCELERATION;
      if (
        crossedAccent &&
        intensity > 0.2 &&
        timestamp - this.lastAccentTime >= ACCENT_COOLDOWN_MS &&
        nextProgress < FINISH_TRIGGER
      ) {
        const accentIntensity = clamp(
          (this.smoothedAcceleration - ACCENT_ACCELERATION) / 8,
          0,
          1,
        );
        this.playAccent(intensity, accentIntensity, pan);
        this.lastAccentTime = timestamp;
      }
      this.backwardTravel = 0;
      return;
    }

    if (delta < 0 && speed >= VELOCITY_THRESHOLD) {
      this.stopVoices(new Set<CueKind>(["texture"]), 0.014);
      this.backwardTravel += -delta;
      const rate = 2 + 12 * intensity ** 0.8;
      const meanSpacing = clamp(speed / rate, 0.008, 0.07);
      let emitted = 0;
      while (
        this.backwardTravel >= this.nextBackwardSpacing &&
        emitted < 1
      ) {
        this.playReattach(intensity, pan);
        this.backwardTravel -= this.nextBackwardSpacing;
        this.nextBackwardSpacing = meanSpacing * randomSpacingMultiplier();
        emitted += 1;
      }
      if (emitted && this.backwardTravel >= this.nextBackwardSpacing) {
        this.backwardTravel = 0;
      }
      this.forwardTravel = 0;
    }
  }

  end(progress: number) {
    this.clearHoldTimer();
    this.gestureActive = false;
    this.lastProgress = clamp(progress, 0, 1);
    this.smoothedVelocity = 0;
    this.smoothedAcceleration = 0;
    this.forwardTravel = 0;
    this.backwardTravel = 0;
    this.stopVoices(new Set<CueKind>(["texture", "reattach"]), 0.016);
  }

  playReappear() {
    if (!this.enabled || this.destroyed) return;
    const context = getSharedAudioContext();
    const buffer = this.reappearBuffer;
    if (!context || !buffer || this.activeVoices.size >= MAX_ACTIVE_VOICES) {
      if (!buffer) this.preloadReappear();
      return;
    }

    const when = context.currentTime + 0.002;
    const duration = buffer.duration;
    const source = context.createBufferSource();
    const voiceGain = context.createGain();
    const peakGain = 0.82;
    const attack = Math.min(0.004, duration * 0.12);
    const release = Math.min(0.025, duration * 0.2);

    source.buffer = buffer;
    voiceGain.gain.setValueAtTime(0, when);
    voiceGain.gain.linearRampToValueAtTime(peakGain, when + attack);
    voiceGain.gain.setValueAtTime(
      peakGain,
      Math.max(when + attack, when + duration - release),
    );
    voiceGain.gain.linearRampToValueAtTime(0, when + duration);
    source.connect(voiceGain);
    voiceGain.connect(this.ensureOutput(context));

    const nodes: AudioNode[] = [source, voiceGain];
    const voice: ActiveVoice = {
      source,
      gain: voiceGain,
      nodes,
      kind: "reappear",
    };
    this.activeVoices.add(voice);
    source.addEventListener(
      "ended",
      () => {
        this.activeVoices.delete(voice);
        for (const node of nodes) node.disconnect();
      },
      { once: true },
    );
    source.start(when);
  }

  reset(progress = 0) {
    this.clearHoldTimer();
    this.gestureActive = false;
    this.lastProgress = clamp(progress, 0, 1);
    this.lastUpdateTime = 0;
    this.smoothedVelocity = 0;
    this.smoothedAcceleration = 0;
    this.forwardTravel = 0;
    this.backwardTravel = 0;
    this.liftArmed = this.lastProgress <= LIFT_REARM;
    this.fullyDetached = this.lastProgress >= FINISH_TRIGGER;
    this.finishArmed = !this.fullyDetached;
    this.lastAccentTime = -Infinity;
    this.stopVoices(undefined, 0.012);
  }

  stop() {
    this.clearHoldTimer();
    this.gestureActive = false;
    this.stopVoices(undefined, 0.012);
  }

  destroy() {
    if (this.destroyed) return;
    this.destroyed = true;
    this.loadRevision += 1;
    this.stop();
    this.masterGain?.disconnect();
    this.compressor?.disconnect();
    this.masterGain = null;
    this.compressor = null;
    this.buffer = null;
    this.reappearBuffer = null;
    this.profile = null;
  }

  private preload() {
    const context = getSharedAudioContext();
    if (!context || !this.enabled || !this.src || this.destroyed) return;
    const revision = ++this.loadRevision;
    void loadAudioBuffer(this.src, context)
      .then((buffer) => {
        if (this.destroyed || revision !== this.loadRevision) return;
        this.buffer = buffer;
        this.profile = this.useBuiltInProfile
          ? BUILT_IN_PROFILE
          : genericProfile(buffer.duration);
        this.sliceBags = { micro: [], body: [], accent: [] };
      })
      .catch(() => {
        // Sound is progressive enhancement and never blocks sticker rendering.
      });
  }

  private preloadReappear() {
    const context = getSharedAudioContext();
    if (!context || !this.enabled || this.destroyed) return;
    void loadAudioBuffer(reappearSoundUrl, context)
      .then((buffer) => {
        if (this.destroyed) return;
        this.reappearBuffer = buffer;
      })
      .catch(() => {
        // Sound is progressive enhancement and never blocks sticker rendering.
      });
  }

  private armHoldSilence() {
    if (typeof window === "undefined") return;
    this.clearHoldTimer();
    this.holdTimer = window.setTimeout(() => {
      this.holdTimer = null;
      if (!this.gestureActive) return;
      this.smoothedVelocity = 0;
      this.smoothedAcceleration = 0;
      this.stopVoices(new Set<CueKind>(["texture", "reattach"]), 0.012);
    }, HOLD_SILENCE_MS);
  }

  private clearHoldTimer() {
    if (this.holdTimer === null || typeof window === "undefined") return;
    window.clearTimeout(this.holdTimer);
    this.holdTimer = null;
  }

  private playLift(intensity: number, pan: number) {
    const slice = this.profile?.lift;
    if (!slice) return;
    this.playSlice(slice, {
      kind: "lift",
      duration: 0.07 + intensity * 0.025,
      playbackRate: (0.94 + intensity * 0.12) * randomPitch(0.5),
      gain: 0.11 + intensity * 0.065,
      lowpass: 4_200 + intensity * 5_400,
      highpass: 180,
      attack: 0.004,
      release: 0.018,
      pan,
    });
  }

  private playTexture(intensity: number, envelope: number, pan: number) {
    const profile = this.profile;
    if (!profile || envelope <= 0.001) return;
    const useBody = Math.random() < clamp(0.12 + 0.58 * intensity, 0, 0.72);
    const slice = this.takeSlice(useBody ? "body" : "micro");
    if (!slice) return;
    const duration = randomBetween(0.85, 1.15) * (0.066 - 0.032 * intensity);
    this.playSlice(slice, {
      kind: "texture",
      duration,
      playbackRate: (0.92 + intensity * 0.18) * randomPitch(0.7),
      gain:
        (0.07 + 0.2 * intensity ** 0.65) *
        envelope *
        decibelsToGain(randomBetween(-1.5, 1.5)),
      lowpass: 2_400 + intensity * 9_000,
      highpass: 210,
      attack: 0.006 - intensity * 0.0035,
      release: 0.017 - intensity * 0.008,
      pan,
    });
  }

  private playReattach(intensity: number, pan: number) {
    const slice = this.takeSlice("micro");
    if (!slice) return;
    this.playSlice(slice, {
      kind: "reattach",
      duration: randomBetween(0.03, 0.05),
      playbackRate: (0.67 + intensity * 0.17) * randomPitch(0.5),
      gain:
        (0.024 + 0.052 * intensity ** 0.7) *
        decibelsToGain(randomBetween(-1.2, 1.2)),
      lowpass: 1_500 + intensity * 2_400,
      highpass: 120,
      attack: 0.005,
      release: 0.02,
      pan: pan * 0.6,
    });
  }

  private playAccent(
    intensity: number,
    acceleration: number,
    pan: number,
  ) {
    const slice = this.takeSlice("accent");
    if (!slice) return;
    this.playSlice(slice, {
      kind: "accent",
      duration: randomBetween(0.045, 0.072),
      playbackRate:
        (0.96 + intensity * 0.12) *
        (1 + acceleration * 0.08) *
        randomPitch(0.45),
      gain: (0.14 + intensity * 0.1) * (1 + acceleration * 0.35),
      lowpass: 5_200 + intensity * 6_000,
      highpass: 220,
      attack: 0.002,
      release: 0.024,
      pan,
    });
  }

  private playFinish(intensity: number, pan: number) {
    const slice = this.profile?.finish;
    if (!slice) return;
    this.stopVoices(new Set<CueKind>(["texture", "reattach"]), 0.01);
    this.playSlice(slice, {
      kind: "finish",
      duration: 0.064,
      playbackRate: (0.97 + intensity * 0.08) * randomPitch(0.35),
      gain: 0.2 + intensity * 0.12,
      lowpass: 7_500 + intensity * 4_500,
      highpass: 180,
      attack: 0.0015,
      release: 0.038,
      pan,
    });
  }

  private takeSlice(bankName: SliceBankName) {
    const bank = this.profile?.[bankName] ?? [];
    if (!bank.length) return null;
    let bag = this.sliceBags[bankName];
    if (!bag.length) {
      bag = shuffledIndices(bank.length);
      if (bag.length > 1 && bank[bag[bag.length - 1]]?.key === this.lastSliceKey) {
        [bag[0], bag[bag.length - 1]] = [
          bag[bag.length - 1],
          bag[0],
        ];
      }
      this.sliceBags[bankName] = bag;
    }
    const slice = bank[bag.pop() ?? 0] ?? null;
    if (slice) this.lastSliceKey = slice.key;
    return slice;
  }

  private playSlice(slice: AudioSlice, options: GrainOptions) {
    if (!this.enabled || this.destroyed || this.activeVoices.size >= MAX_ACTIVE_VOICES) {
      return;
    }
    const context = getSharedAudioContext();
    const buffer = this.buffer;
    if (!context || !buffer) return;

    const sliceStart = clamp(slice.start, 0, Math.max(buffer.duration - 0.004, 0));
    const sliceEnd = clamp(slice.end, sliceStart + 0.004, buffer.duration);
    const availableDuration = sliceEnd - sliceStart;
    if (availableDuration < 0.004) return;
    const inputDuration = Math.min(options.duration * options.playbackRate, availableDuration);
    const offsetRoom = Math.max(availableDuration - inputDuration, 0);
    const offset = sliceStart + (offsetRoom ? Math.random() * offsetRoom : 0);
    const outputDuration = inputDuration / options.playbackRate;
    const when = context.currentTime + 0.002;
    const attack = Math.min(options.attack, outputDuration * 0.36);
    const release = Math.min(options.release, outputDuration * 0.48);
    const releaseAt = Math.max(when + attack, when + outputDuration - release);
    const peakGain = clamp(options.gain * slice.trim, 0, 1.1);

    const source = context.createBufferSource();
    const highpass = context.createBiquadFilter();
    const lowpass = context.createBiquadFilter();
    const voiceGain = context.createGain();
    const panner =
      typeof context.createStereoPanner === "function"
        ? context.createStereoPanner()
        : null;

    source.buffer = buffer;
    source.playbackRate.setValueAtTime(options.playbackRate, when);
    highpass.type = "highpass";
    highpass.frequency.setValueAtTime(options.highpass, when);
    highpass.Q.setValueAtTime(0.7, when);
    lowpass.type = "lowpass";
    lowpass.frequency.setValueAtTime(
      clamp(options.lowpass, 600, context.sampleRate * 0.46),
      when,
    );
    lowpass.Q.setValueAtTime(0.72, when);
    if (panner) panner.pan.setValueAtTime(options.pan, when);

    voiceGain.gain.setValueAtTime(0, when);
    voiceGain.gain.linearRampToValueAtTime(peakGain, when + attack);
    voiceGain.gain.setValueAtTime(peakGain, releaseAt);
    voiceGain.gain.linearRampToValueAtTime(0, when + outputDuration);

    source.connect(highpass);
    highpass.connect(lowpass);
    const tailNode: AudioNode = panner ?? lowpass;
    if (panner) lowpass.connect(panner);
    tailNode.connect(voiceGain);
    voiceGain.connect(this.ensureOutput(context));

    const nodes: AudioNode[] = [source, highpass, lowpass];
    if (panner) nodes.push(panner);
    nodes.push(voiceGain);
    const voice: ActiveVoice = {
      source,
      gain: voiceGain,
      nodes,
      kind: options.kind,
    };
    this.activeVoices.add(voice);
    source.addEventListener(
      "ended",
      () => {
        this.activeVoices.delete(voice);
        for (const node of nodes) node.disconnect();
      },
      { once: true },
    );
    source.start(when, offset, inputDuration);
  }

  private stopVoices(kinds: Set<CueKind> | undefined, fadeSeconds: number) {
    const context = sharedAudioContext;
    if (!context) return;
    const now = context.currentTime;
    for (const voice of [...this.activeVoices]) {
      if (kinds && !kinds.has(voice.kind)) continue;
      try {
        voice.gain.gain.cancelScheduledValues(now);
        voice.gain.gain.setTargetAtTime(0, now, Math.max(fadeSeconds / 3, 0.002));
        voice.source.stop(now + fadeSeconds);
      } catch {
        // The voice may already have ended between frames.
      }
      this.activeVoices.delete(voice);
    }
  }

  private ensureOutput(context: AudioContext) {
    if (this.masterGain) return this.masterGain;
    this.masterGain = context.createGain();
    this.compressor = context.createDynamicsCompressor();
    this.masterGain.gain.setValueAtTime(this.volume, context.currentTime);
    this.compressor.threshold.setValueAtTime(-14, context.currentTime);
    this.compressor.knee.setValueAtTime(8, context.currentTime);
    this.compressor.ratio.setValueAtTime(4, context.currentTime);
    this.compressor.attack.setValueAtTime(0.003, context.currentTime);
    this.compressor.release.setValueAtTime(0.1, context.currentTime);
    this.masterGain.connect(this.compressor);
    this.compressor.connect(context.destination);
    return this.masterGain;
  }
}
