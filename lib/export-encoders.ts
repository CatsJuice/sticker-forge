import * as gifencNamespace from "gifenc";

const gifenc = (
  "GIFEncoder" in gifencNamespace
    ? gifencNamespace
    : (gifencNamespace as unknown as { default: typeof gifencNamespace }).default
) as typeof gifencNamespace;
const { GIFEncoder, applyPalette, quantize } = gifenc;

export type ExportFrame = {
  rgba: Uint8ClampedArray;
  width: number;
  height: number;
  durationMs: number;
};

export type ExportFrameProcessingOptions = {
  onProgress?: (progress: number) => void;
  transformFrame?: (frame: ExportFrame, index: number) => ExportFrame;
};

export type PcmAudioTrack = {
  /** Interleaved signed 16-bit little-endian PCM samples. */
  pcm: Uint8Array;
  sampleRate: number;
  channels: 1 | 2;
};

/**
 * Samples a recorded timeline at the requested export frame rate. This lets a
 * 30 FPS interaction recording export at a lower rate, or duplicate samples
 * for a smoother 60 FPS video, without changing the animation duration.
 */
export function resampleExportFrames(
  frames: ExportFrame[],
  framesPerSecond: number,
) {
  if (!Number.isFinite(framesPerSecond) || framesPerSecond <= 0) {
    throw new Error("Export frame rate must be greater than zero.");
  }
  if (!frames.length) return [];
  if (
    frames.some(
      (frame) => !Number.isFinite(frame.durationMs) || frame.durationMs <= 0,
    )
  ) {
    throw new Error("Export frames must have a positive duration.");
  }

  const frameDuration = 1000 / framesPerSecond;
  const totalDuration = frames.reduce(
    (duration, frame) => duration + frame.durationMs,
    0,
  );
  const frameCount = Math.max(
    1,
    Math.ceil(totalDuration / frameDuration - 1e-9),
  );
  const output: ExportFrame[] = [];
  let sourceIndex = 0;
  let sourceEnd = frames[0].durationMs;

  for (let index = 0; index < frameCount; index += 1) {
    const sampleTime = index * frameDuration;
    while (
      sourceIndex < frames.length - 1 &&
      sampleTime >= sourceEnd - 1e-7
    ) {
      sourceIndex += 1;
      sourceEnd += frames[sourceIndex].durationMs;
    }
    const source = frames[sourceIndex];
    output.push({
      ...source,
      rgba: new Uint8ClampedArray(source.rgba),
      durationMs: frameDuration,
    });
  }

  return output;
}

/** Adds a resting hold between animation loops without changing its motion. */
export function appendPlaybackInterval(
  frames: ExportFrame[],
  framesPerSecond: number,
  intervalSeconds: number,
  duplicateFrames: boolean,
) {
  if (!Number.isFinite(intervalSeconds) || intervalSeconds < 0) {
    throw new Error("Playback interval must be zero or greater.");
  }
  if (!Number.isFinite(framesPerSecond) || framesPerSecond <= 0) {
    throw new Error("Export frame rate must be greater than zero.");
  }
  const intervalMs = Math.min(intervalSeconds, 5) * 1000;
  if (!frames.length || intervalMs <= 0) return frames;
  const lastFrame = frames[frames.length - 1];
  if (!duplicateFrames) {
    return frames.map((frame, index) =>
      index === frames.length - 1
        ? { ...frame, durationMs: frame.durationMs + intervalMs }
        : frame,
    );
  }
  const frameDuration = 1000 / framesPerSecond;
  const duplicateCount = Math.max(1, Math.round(intervalMs / frameDuration));
  return [
    ...frames,
    ...Array.from({ length: duplicateCount }, () => ({
      ...lastFrame,
      durationMs: frameDuration,
    })),
  ];
}

const GIF_EDGE_ALPHA_CUTOFF = 128;
const EDGE_COLOR_BLEED_ALPHA = 64;
const EDGE_COLOR_SOURCE_ALPHA = 224;
const EDGE_COLOR_SEARCH_RADIUS = 3;
const PNG_DATA_CHUNK_SIZE = 1024 * 1024;

function alphaNoiseThreshold(x: number, y: number) {
  let value =
    Math.imul(x + 1, 0x1f123bb5) ^
    Math.imul(y + 1, 0x5f356495) ^
    0x9e3779b9;
  value = Math.imul(value ^ (value >>> 16), 0x21f0aaad);
  value = Math.imul(value ^ (value >>> 15), 0x735a2d97);
  value ^= value >>> 15;
  return (((value >>> 0) + 0.5) / 0x100000000) * 255;
}

/**
 * Replaces contaminated RGB values around partially transparent sticker edges
 * with the color of the nearest solid pixel. Alpha stays untouched, while the
 * dark fringe caused by transparent black interpolation is removed.
 */
export function repairTransparentEdgeColors(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
) {
  if (rgba.byteLength !== width * height * 4) {
    throw new Error("The RGBA data does not match its frame dimensions.");
  }
  const source = new Uint8ClampedArray(rgba);
  const output = new Uint8ClampedArray(rgba);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const alpha = source[offset + 3];
      if (alpha < EDGE_COLOR_BLEED_ALPHA || alpha >= 255) continue;

      let nearestOffset = -1;
      let nearestDistance = Number.POSITIVE_INFINITY;
      for (
        let deltaY = -EDGE_COLOR_SEARCH_RADIUS;
        deltaY <= EDGE_COLOR_SEARCH_RADIUS;
        deltaY += 1
      ) {
        const sampleY = y + deltaY;
        if (sampleY < 0 || sampleY >= height) continue;
        for (
          let deltaX = -EDGE_COLOR_SEARCH_RADIUS;
          deltaX <= EDGE_COLOR_SEARCH_RADIUS;
          deltaX += 1
        ) {
          const sampleX = x + deltaX;
          if (sampleX < 0 || sampleX >= width) continue;
          const distance = deltaX * deltaX + deltaY * deltaY;
          if (!distance || distance >= nearestDistance) continue;
          const sampleOffset = (sampleY * width + sampleX) * 4;
          if (source[sampleOffset + 3] < EDGE_COLOR_SOURCE_ALPHA) continue;
          nearestOffset = sampleOffset;
          nearestDistance = distance;
        }
      }
      if (nearestOffset < 0) continue;
      output[offset] = source[nearestOffset];
      output[offset + 1] = source[nearestOffset + 1];
      output[offset + 2] = source[nearestOffset + 2];
    }
  }
  return output;
}

/**
 * GIF only supports one transparent palette index. Sticker edges are hardened
 * after their RGB fringe is repaired. Optional shadow mode uses stable spatial
 * dithering only for the remaining low-alpha pixels.
 */
export function prepareGifAlpha(
  rgba: Uint8ClampedArray,
  width: number,
  height: number,
  includeShadow: boolean,
) {
  const output = repairTransparentEdgeColors(rgba, width, height);
  for (let y = 0; y < height; y += 1) {
    for (let x = 0; x < width; x += 1) {
      const offset = (y * width + x) * 4;
      const alpha = output[offset + 3];
      const opaque =
        alpha >= GIF_EDGE_ALPHA_CUTOFF ||
        (includeShadow && alpha > alphaNoiseThreshold(x, y));
      if (opaque) {
        output[offset + 3] = 255;
        continue;
      }
      output[offset] = 0;
      output[offset + 1] = 0;
      output[offset + 2] = 0;
      output[offset + 3] = 0;
    }
  }
  return output;
}

export async function encodeTransparentGif(
  frames: ExportFrame[],
  options: ExportFrameProcessingOptions & { includeShadow?: boolean } = {},
) {
  if (!frames.length) throw new Error("No frames were provided for GIF export.");
  const gif = GIFEncoder({ initialCapacity: 1024 * 1024 });
  for (let frameIndex = 0; frameIndex < frames.length; frameIndex += 1) {
    const frame =
      options.transformFrame?.(frames[frameIndex], frameIndex) ??
      frames[frameIndex];
    const gifRgba = prepareGifAlpha(
      frame.rgba,
      frame.width,
      frame.height,
      Boolean(options.includeShadow),
    );
    let palette = quantize(gifRgba, 256, {
      format: "rgba4444",
      oneBitAlpha: true,
      clearAlpha: true,
      clearAlphaThreshold: 0,
      clearAlphaColor: 0xff,
    });
    let transparentIndex = palette.findIndex((color) => (color[3] ?? 255) === 0);
    if (transparentIndex < 0) {
      if (palette.length >= 256) palette = palette.slice(0, 255);
      palette = [[255, 255, 255, 0], ...palette];
      transparentIndex = 0;
    }
    const indexed = applyPalette(gifRgba, palette, "rgba4444");
    // The transparent palette entry deliberately uses a white matte to avoid
    // dark fringes in imperfect viewers. Since nearest-color matching also
    // considers RGB, transparent black pixels may otherwise be assigned to a
    // nearby opaque color. Alpha is authoritative for the transparent index.
    for (let pixel = 0; pixel < indexed.length; pixel += 1) {
      if (gifRgba[pixel * 4 + 3] === 0) indexed[pixel] = transparentIndex;
    }
    gif.writeFrame(indexed, frame.width, frame.height, {
      palette,
      transparent: true,
      transparentIndex,
      delay: Math.max(20, Math.round(frame.durationMs)),
      repeat: 0,
      dispose: 2,
    });
    options.onProgress?.((frameIndex + 1) / frames.length);
    if (frameIndex % 4 === 3) {
      await new Promise<void>((resolve) => globalThis.setTimeout(resolve, 0));
    }
  }
  gif.finish();
  const encoded = gif.bytes();
  const output = new Uint8Array(encoded.byteLength);
  output.set(encoded);
  return new Blob([output.buffer], { type: "image/gif" });
}

function concatBytes(parts: Uint8Array[]) {
  const length = parts.reduce((total, part) => total + part.byteLength, 0);
  const output = new Uint8Array(length);
  let offset = 0;
  for (const part of parts) {
    output.set(part, offset);
    offset += part.byteLength;
  }
  return output;
}

let crcTable: Uint32Array | null = null;

function pngCrc32(bytes: Uint8Array) {
  if (!crcTable) {
    crcTable = new Uint32Array(256);
    for (let index = 0; index < 256; index += 1) {
      let value = index;
      for (let bit = 0; bit < 8; bit += 1) {
        value = value & 1 ? 0xedb88320 ^ (value >>> 1) : value >>> 1;
      }
      crcTable[index] = value >>> 0;
    }
  }
  let crc = 0xffffffff;
  for (const byte of bytes) {
    crc = crcTable[(crc ^ byte) & 0xff] ^ (crc >>> 8);
  }
  return (crc ^ 0xffffffff) >>> 0;
}

function pngChunk(type: string, data = new Uint8Array()) {
  const typeBytes = new TextEncoder().encode(type);
  const output = new Uint8Array(data.byteLength + 12);
  const view = new DataView(output.buffer);
  view.setUint32(0, data.byteLength);
  output.set(typeBytes, 4);
  output.set(data, 8);
  view.setUint32(
    8 + data.byteLength,
    pngCrc32(output.subarray(4, 8 + data.byteLength)),
  );
  return output;
}

function pngScanlines(frame: ExportFrame) {
  const rgba = repairTransparentEdgeColors(
    frame.rgba,
    frame.width,
    frame.height,
  );
  const stride = frame.width * 4;
  const output = new Uint8Array((stride + 1) * frame.height);
  for (let y = 0; y < frame.height; y += 1) {
    const outputOffset = y * (stride + 1);
    output[outputOffset] = 0;
    output.set(rgba.subarray(y * stride, (y + 1) * stride), outputOffset + 1);
  }
  return output;
}

async function compressPngData(data: Uint8Array) {
  const input = data.slice().buffer;
  const stream = new Blob([input])
    .stream()
    .pipeThrough(new CompressionStream("deflate"));
  return new Uint8Array(await new Response(stream).arrayBuffer());
}

/** Encodes full 8-bit alpha into a standards-compliant animated PNG. */
export async function encodeTransparentApng(
  frames: ExportFrame[],
  options: ExportFrameProcessingOptions = {},
) {
  if (!frames.length) throw new Error("No frames were provided for APNG export.");
  const firstFrame = options.transformFrame?.(frames[0], 0) ?? frames[0];
  const { width, height } = firstFrame;
  const signature = new Uint8Array([137, 80, 78, 71, 13, 10, 26, 10]);
  const header = new Uint8Array(13);
  const headerView = new DataView(header.buffer);
  headerView.setUint32(0, width);
  headerView.setUint32(4, height);
  header[8] = 8;
  header[9] = 6;

  const animationControl = new Uint8Array(8);
  const animationControlView = new DataView(animationControl.buffer);
  animationControlView.setUint32(0, frames.length);
  animationControlView.setUint32(4, 0);

  const parts = [
    signature,
    pngChunk("IHDR", header),
    pngChunk("sRGB", new Uint8Array([0])),
    pngChunk("acTL", animationControl),
  ];
  let sequence = 0;
  for (let frameIndex = 0; frameIndex < frames.length; frameIndex += 1) {
    const frame =
      frameIndex === 0
        ? firstFrame
        : (options.transformFrame?.(frames[frameIndex], frameIndex) ??
          frames[frameIndex]);
    if (
      frame.width !== width ||
      frame.height !== height ||
      frame.rgba.byteLength !== width * height * 4
    ) {
      throw new Error("All APNG export frames must use the same dimensions.");
    }
    const frameControl = new Uint8Array(26);
    const frameControlView = new DataView(frameControl.buffer);
    frameControlView.setUint32(0, sequence);
    sequence += 1;
    frameControlView.setUint32(4, width);
    frameControlView.setUint32(8, height);
    frameControlView.setUint16(
      20,
      Math.max(1, Math.min(65535, Math.round(frame.durationMs * 10))),
    );
    frameControlView.setUint16(22, 10000);
    frameControl[24] = 0;
    frameControl[25] = 0;
    parts.push(pngChunk("fcTL", frameControl));

    const compressed = await compressPngData(pngScanlines(frame));
    for (
      let offset = 0;
      offset < compressed.byteLength;
      offset += PNG_DATA_CHUNK_SIZE
    ) {
      const payload = compressed.subarray(
        offset,
        Math.min(offset + PNG_DATA_CHUNK_SIZE, compressed.byteLength),
      );
      if (frameIndex === 0) {
        parts.push(pngChunk("IDAT", payload));
      } else {
        const frameData = new Uint8Array(payload.byteLength + 4);
        new DataView(frameData.buffer).setUint32(0, sequence);
        sequence += 1;
        frameData.set(payload, 4);
        parts.push(pngChunk("fdAT", frameData));
      }
    }
    if (frameIndex % 2 === 1) {
      await new Promise<void>((resolve) => globalThis.setTimeout(resolve, 0));
    }
    options.onProgress?.((frameIndex + 1) / frames.length);
  }
  parts.push(pngChunk("IEND"));
  const output = concatBytes(parts);
  return new Blob([output.buffer], { type: "image/apng" });
}

function uint32Bytes(value: number) {
  const output = new Uint8Array(4);
  new DataView(output.buffer).setUint32(0, value);
  return output;
}

function asciiBytes(value: string) {
  return new TextEncoder().encode(value);
}

function movAtom(type: string, ...payload: Uint8Array[]) {
  if (type.length !== 4) throw new Error("MOV atom types must be four bytes.");
  const data = concatBytes(payload);
  const size = data.byteLength + 8;
  if (size > 0xffffffff) throw new Error("The MOV atom is too large.");
  return concatBytes([uint32Bytes(size), asciiBytes(type), data]);
}

function movFullAtom(
  type: string,
  version: number,
  flags: number,
  ...payload: Uint8Array[]
) {
  const header = new Uint8Array(4);
  header[0] = version;
  header[1] = (flags >>> 16) & 0xff;
  header[2] = (flags >>> 8) & 0xff;
  header[3] = flags & 0xff;
  return movAtom(type, header, ...payload);
}

type MovAtomLocation = { offset: number; size: number };

function findMovAtom(
  bytes: Uint8Array,
  type: string,
  start = 0,
  end = bytes.byteLength,
) {
  let offset = start;
  while (offset + 8 <= end) {
    const size = new DataView(
      bytes.buffer,
      bytes.byteOffset + offset,
      4,
    ).getUint32(0);
    const atomType = new TextDecoder().decode(bytes.subarray(offset + 4, offset + 8));
    if (size < 8 || offset + size > end) break;
    if (atomType === type) return { offset, size } satisfies MovAtomLocation;
    offset += size;
  }
  return null;
}

function buildPcmAudioTrack(
  audio: PcmAudioTrack,
  chunkOffset: number,
  movieTimescale: number,
  movieDuration: number,
) {
  const bytesPerSample = audio.channels * 2;
  const sampleCount = audio.pcm.byteLength / bytesPerSample;

  const soundEntry = new Uint8Array(28);
  const soundEntryView = new DataView(soundEntry.buffer);
  soundEntryView.setUint16(6, 1);
  soundEntryView.setUint16(16, audio.channels);
  soundEntryView.setUint16(18, 16);
  soundEntryView.setUint32(24, audio.sampleRate * 65536);

  const sampleDescription = movFullAtom(
    "stsd",
    0,
    0,
    uint32Bytes(1),
    movAtom("sowt", soundEntry),
  );
  const timeToSample = movFullAtom(
    "stts",
    0,
    0,
    uint32Bytes(1),
    uint32Bytes(sampleCount),
    uint32Bytes(1),
  );
  const sampleToChunk = movFullAtom(
    "stsc",
    0,
    0,
    uint32Bytes(1),
    uint32Bytes(1),
    uint32Bytes(sampleCount),
    uint32Bytes(1),
  );
  const sampleSizes = movFullAtom(
    "stsz",
    0,
    0,
    uint32Bytes(bytesPerSample),
    uint32Bytes(sampleCount),
  );
  const chunkOffsets = movFullAtom(
    "stco",
    0,
    0,
    uint32Bytes(1),
    uint32Bytes(chunkOffset),
  );
  const sampleTable = movAtom(
    "stbl",
    sampleDescription,
    timeToSample,
    sampleToChunk,
    sampleSizes,
    chunkOffsets,
  );

  const dataReference = movFullAtom(
    "dref",
    0,
    0,
    uint32Bytes(1),
    movFullAtom("url ", 0, 1),
  );
  const mediaInformation = movAtom(
    "minf",
    movFullAtom("smhd", 0, 0, new Uint8Array(4)),
    movAtom("dinf", dataReference),
    sampleTable,
  );

  const mediaHeader = new Uint8Array(20);
  const mediaHeaderView = new DataView(mediaHeader.buffer);
  mediaHeaderView.setUint32(8, audio.sampleRate);
  mediaHeaderView.setUint32(12, sampleCount);
  mediaHeaderView.setUint16(16, 0x55c4);
  const handler = movFullAtom(
    "hdlr",
    0,
    0,
    uint32Bytes(0),
    asciiBytes("soun"),
    new Uint8Array(12),
    asciiBytes("SoundHandler\0"),
  );
  const media = movAtom(
    "mdia",
    movFullAtom("mdhd", 0, 0, mediaHeader),
    handler,
    mediaInformation,
  );

  const trackHeader = new Uint8Array(80);
  const trackHeaderView = new DataView(trackHeader.buffer);
  trackHeaderView.setUint32(8, 2);
  trackHeaderView.setUint32(16, movieDuration);
  trackHeaderView.setUint16(32, 0x0100);
  const matrix = [0x00010000, 0, 0, 0, 0x00010000, 0, 0, 0, 0x40000000];
  matrix.forEach((value, index) => {
    trackHeaderView.setUint32(36 + index * 4, value);
  });
  if (!movieTimescale) throw new Error("The MOV movie timescale is invalid.");
  return movAtom(
    "trak",
    movFullAtom("tkhd", 0, 7, trackHeader),
    media,
  );
}

/** Adds a signed 16-bit PCM track to the ProRes MOV without re-encoding video. */
export function muxPcmAudioIntoMov(
  movie: Uint8Array,
  audio: PcmAudioTrack,
) {
  if (
    !Number.isInteger(audio.sampleRate) ||
    audio.sampleRate <= 0 ||
    ![1, 2].includes(audio.channels)
  ) {
    throw new Error("The MOV audio format is invalid.");
  }
  const bytesPerSample = audio.channels * 2;
  if (!audio.pcm.byteLength || audio.pcm.byteLength % bytesPerSample !== 0) {
    throw new Error("The MOV PCM sample data is invalid.");
  }

  const mediaData = findMovAtom(movie, "mdat");
  const movieData = findMovAtom(movie, "moov");
  if (!mediaData || !movieData || mediaData.offset + mediaData.size !== movieData.offset) {
    throw new Error("The ProRes MOV layout cannot accept an audio track.");
  }
  const moviePayload = new Uint8Array(
    movie.subarray(movieData.offset + 8, movieData.offset + movieData.size),
  );
  const movieHeader = findMovAtom(moviePayload, "mvhd");
  if (!movieHeader || moviePayload[movieHeader.offset + 8] !== 0) {
    throw new Error("The ProRes MOV header is unsupported.");
  }
  const movieHeaderView = new DataView(
    moviePayload.buffer,
    moviePayload.byteOffset + movieHeader.offset,
    movieHeader.size,
  );
  const movieTimescale = movieHeaderView.getUint32(20);
  const movieDuration = movieHeaderView.getUint32(24);
  movieHeaderView.setUint32(movieHeader.size - 4, 3);

  const originalMediaPayload = movie.subarray(
    mediaData.offset + 8,
    mediaData.offset + mediaData.size,
  );
  const audioChunkOffset = mediaData.offset + mediaData.size;
  const audioTrack = buildPcmAudioTrack(
    audio,
    audioChunkOffset,
    movieTimescale,
    movieDuration,
  );
  return concatBytes([
    movie.subarray(0, mediaData.offset),
    movAtom("mdat", originalMediaPayload, audio.pcm),
    movAtom("moov", moviePayload, audioTrack),
    movie.subarray(movieData.offset + movieData.size),
  ]);
}

/**
 * Encodes a Finder/QuickTime-compatible ProRes 4444 MOV with a full 8-bit
 * alpha channel. The encoder is loaded only when MOV export is requested.
 */
export async function encodeTransparentMov(
  frames: ExportFrame[],
  framesPerSecond: number,
  audio?: PcmAudioTrack,
  options: ExportFrameProcessingOptions = {},
) {
  if (!frames.length) throw new Error("No frames were provided for MOV export.");
  const firstFrame = options.transformFrame?.(frames[0], 0) ?? frames[0];
  const width = firstFrame.width;
  const height = firstFrame.height;
  if (width % 2 !== 0 || height % 2 !== 0) {
    throw new Error("MOV export dimensions must be even numbers.");
  }
  if (!Number.isFinite(framesPerSecond) || framesPerSecond <= 0) {
    throw new Error("MOV export frame rate must be greater than zero.");
  }
  if (!options.transformFrame) {
    for (const frame of frames) {
      if (frame.width !== width || frame.height !== height) {
        throw new Error("All MOV export frames must use the same dimensions.");
      }
      if (frame.rgba.byteLength !== width * height * 4) {
        throw new Error("A MOV export frame contains invalid RGBA data.");
      }
    }
  }

  const { createProResEncoder, ProResProfile } = await import(
    "prores-wasm-encoder"
  );
  const encoder = await createProResEncoder();
  try {
    encoder.initialize({
      width,
      height,
      frameRate: framesPerSecond,
      profile: ProResProfile.P4444,
      range: "limited",
    });
    for (let index = 0; index < frames.length; index += 1) {
      const frame =
        index === 0
          ? firstFrame
          : (options.transformFrame?.(frames[index], index) ?? frames[index]);
      if (
        frame.width !== width ||
        frame.height !== height ||
        frame.rgba.byteLength !== width * height * 4
      ) {
        throw new Error("All MOV export frames must use the same dimensions.");
      }
      encoder.addFrameRgba(
        repairTransparentEdgeColors(
          frame.rgba,
          frame.width,
          frame.height,
        ),
      );
      options.onProgress?.((index + 1) / frames.length);
      if (index % 3 === 2) {
        await new Promise<void>((resolve) => globalThis.setTimeout(resolve, 0));
      }
    }

    const encoded = encoder.finalize();
    let output = new Uint8Array(encoded.byteLength);
    output.set(encoded);
    if (audio) output = muxPcmAudioIntoMov(output, audio);
    return new Blob([output.buffer], { type: "video/quicktime" });
  } finally {
    encoder.destroy();
  }
}

export function downloadBlob(blob: Blob, filename: string) {
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 1200);
}
