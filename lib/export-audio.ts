import type { PcmAudioTrack } from "./export-encoders";
import {
  DEFAULT_PEEL_SOUND_URL,
  DEFAULT_REAPPEAR_SOUND_URL,
} from "./peel-audio";

const EXPORT_AUDIO_SAMPLE_RATE = 48_000;

type ExportAudioOptions = {
  durationMs: number;
  peelDurationMs: number;
  reappearAtMs: number;
  peelSoundSrc?: string;
  volume: number;
};

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

async function fetchAudioSource(src: string) {
  const response = await fetch(src);
  if (!response.ok) {
    throw new Error(`Export audio request failed with ${response.status}.`);
  }
  return response.arrayBuffer();
}

async function decodeAudioSource(
  context: OfflineAudioContext,
  src: string,
  fallback: string,
) {
  try {
    return await context.decodeAudioData(await fetchAudioSource(src));
  } catch (error) {
    if (src === fallback) throw error;
    return context.decodeAudioData(await fetchAudioSource(fallback));
  }
}

function connectSound(
  context: OfflineAudioContext,
  buffer: AudioBuffer,
  startSeconds: number,
  gainValue: number,
  outputDurationSeconds?: number,
) {
  const source = context.createBufferSource();
  const gain = context.createGain();
  const duration = outputDurationSeconds ?? buffer.duration;
  const attack = Math.min(0.006, duration * 0.12);
  const release = Math.min(0.03, duration * 0.2);
  const end = startSeconds + duration;

  source.buffer = buffer;
  if (outputDurationSeconds) {
    source.playbackRate.value = buffer.duration / outputDurationSeconds;
  }
  gain.gain.setValueAtTime(0, startSeconds);
  gain.gain.linearRampToValueAtTime(gainValue, startSeconds + attack);
  gain.gain.setValueAtTime(
    gainValue,
    Math.max(startSeconds + attack, end - release),
  );
  gain.gain.linearRampToValueAtTime(0, end);
  source.connect(gain);
  gain.connect(context.destination);
  source.start(startSeconds);
}

function audioBufferToPcm(buffer: AudioBuffer): PcmAudioTrack {
  const channels = 2 as const;
  const left = buffer.getChannelData(0);
  const right = buffer.numberOfChannels > 1 ? buffer.getChannelData(1) : left;
  const pcm = new Uint8Array(buffer.length * channels * 2);
  const view = new DataView(pcm.buffer);

  for (let index = 0; index < buffer.length; index += 1) {
    const leftSample = clamp(left[index], -1, 1);
    const rightSample = clamp(right[index], -1, 1);
    view.setInt16(
      index * 4,
      Math.round(leftSample < 0 ? leftSample * 0x8000 : leftSample * 0x7fff),
      true,
    );
    view.setInt16(
      index * 4 + 2,
      Math.round(
        rightSample < 0 ? rightSample * 0x8000 : rightSample * 0x7fff,
      ),
      true,
    );
  }

  return {
    pcm,
    sampleRate: buffer.sampleRate,
    channels,
  };
}

/** Renders the peel and canonical re-entry cues into a MOV-ready PCM track. */
export async function renderStickerExportAudio({
  durationMs,
  peelDurationMs,
  reappearAtMs,
  peelSoundSrc,
  volume,
}: ExportAudioOptions) {
  const durationSeconds = Math.max(0.05, durationMs / 1000);
  const frameCount = Math.max(
    1,
    Math.ceil(durationSeconds * EXPORT_AUDIO_SAMPLE_RATE),
  );
  const context = new OfflineAudioContext(
    2,
    frameCount,
    EXPORT_AUDIO_SAMPLE_RATE,
  );
  const selectedPeelSource = peelSoundSrc?.trim() || DEFAULT_PEEL_SOUND_URL;
  const [peelBuffer, reappearBuffer] = await Promise.all([
    decodeAudioSource(context, selectedPeelSource, DEFAULT_PEEL_SOUND_URL),
    decodeAudioSource(
      context,
      DEFAULT_REAPPEAR_SOUND_URL,
      DEFAULT_REAPPEAR_SOUND_URL,
    ),
  ]);
  const outputGain = clamp(volume, 0, 1);

  connectSound(
    context,
    peelBuffer,
    0,
    outputGain,
    Math.max(0.05, peelDurationMs / 1000),
  );
  connectSound(
    context,
    reappearBuffer,
    clamp(reappearAtMs / 1000, 0, durationSeconds),
    outputGain * 0.82,
  );

  return audioBufferToPcm(await context.startRendering());
}
