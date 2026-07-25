import {
  appendPlaybackInterval,
  encodeTransparentApng,
  encodeTransparentGif,
  encodeTransparentMov,
  repairTransparentEdgeColors,
  resampleExportFrames,
  type ExportFrame,
} from "../lib/export-encoders";
import type {
  StickerExportWorkerMessage,
  StickerExportWorkerRequest,
  StickerExportProgressStage,
} from "../lib/export-worker-types";

function postWorkerMessage(
  message: StickerExportWorkerMessage,
  transfer?: Transferable[],
) {
  self.postMessage(message, { transfer });
}

function scaledFrameSize(frame: ExportFrame, outputScale: number) {
  return {
    width: Math.max(2, Math.round((frame.width * outputScale) / 2) * 2),
    height: Math.max(2, Math.round((frame.height * outputScale) / 2) * 2),
  };
}

function createFrameScaler(outputScale: number) {
  let source: OffscreenCanvas | null = null;
  let destination: OffscreenCanvas | null = null;

  return (frame: ExportFrame): ExportFrame => {
    if (outputScale === 1) {
      return {
        ...frame,
        rgba: new Uint8ClampedArray(frame.rgba),
      };
    }
    const outputSize = scaledFrameSize(frame, outputScale);
    source ??= new OffscreenCanvas(frame.width, frame.height);
    destination ??= new OffscreenCanvas(outputSize.width, outputSize.height);
    source.width = frame.width;
    source.height = frame.height;
    destination.width = outputSize.width;
    destination.height = outputSize.height;
    const sourceContext = source.getContext("2d");
    const destinationContext = destination.getContext("2d", {
      willReadFrequently: true,
    });
    if (!sourceContext || !destinationContext) {
      throw new Error("Offscreen canvas is unavailable.");
    }
    const sourcePixels = new Uint8ClampedArray(frame.rgba.byteLength);
    sourcePixels.set(frame.rgba);
    sourceContext.putImageData(
      new ImageData(sourcePixels, frame.width, frame.height),
      0,
      0,
    );
    destinationContext.imageSmoothingEnabled = true;
    destinationContext.imageSmoothingQuality = "high";
    destinationContext.clearRect(0, 0, outputSize.width, outputSize.height);
    destinationContext.drawImage(
      source,
      0,
      0,
      outputSize.width,
      outputSize.height,
    );
    return {
      rgba: new Uint8ClampedArray(
        destinationContext.getImageData(
          0,
          0,
          outputSize.width,
          outputSize.height,
        ).data,
      ),
      width: outputSize.width,
      height: outputSize.height,
      durationMs: frame.durationMs,
    };
  };
}

function createEncodedFrameDecoder(encodedFrames: Blob[]) {
  let canvas: OffscreenCanvas | null = null;

  return async (frame: ExportFrame, index: number): Promise<ExportFrame> => {
    const blob = encodedFrames[Math.min(index, encodedFrames.length - 1)];
    if (!blob) throw new Error("An encoded export frame is missing.");
    const bitmap = await createImageBitmap(blob);
    try {
      canvas ??= new OffscreenCanvas(frame.width, frame.height);
      canvas.width = frame.width;
      canvas.height = frame.height;
      const context = canvas.getContext("2d", { willReadFrequently: true });
      if (!context) throw new Error("Offscreen canvas is unavailable.");
      context.clearRect(0, 0, frame.width, frame.height);
      context.drawImage(bitmap, 0, 0, frame.width, frame.height);
      return {
        ...frame,
        rgba: new Uint8ClampedArray(
          context.getImageData(0, 0, frame.width, frame.height).data,
        ),
      };
    } finally {
      bitmap.close();
    }
  };
}

function mimeTypeFor(format: StickerExportWorkerRequest["format"]) {
  if (format === "gif") return "image/gif";
  if (format === "apng") return "image/apng";
  if (format === "mov") return "video/quicktime";
  return "image/png";
}

self.onmessage = async (
  event: MessageEvent<StickerExportWorkerRequest>,
) => {
  const request = event.data;
  const report = (
    progress: number,
    stage: StickerExportProgressStage,
  ) => {
    postWorkerMessage({
      id: request.id,
      progress,
      stage,
      type: "progress",
    });
  };

  try {
    report(0.01, "preparing");
    const scaleFrame = createFrameScaler(request.outputScale);
    const transformFrame = request.encodedFrames?.length
      ? createEncodedFrameDecoder(request.encodedFrames)
      : scaleFrame;
    let blob: Blob;

    if (request.format === "png") {
      const frame = scaleFrame(request.frames[0]);
      report(0.45, "preparing");
      frame.rgba = repairTransparentEdgeColors(
        frame.rgba,
        frame.width,
        frame.height,
      );
      const canvas = new OffscreenCanvas(frame.width, frame.height);
      const context = canvas.getContext("2d");
      if (!context) throw new Error("Offscreen canvas is unavailable.");
      const pixels = new Uint8ClampedArray(frame.rgba.byteLength);
      pixels.set(frame.rgba);
      context.putImageData(
        new ImageData(pixels, frame.width, frame.height),
        0,
        0,
      );
      report(0.82, "encoding");
      blob = await canvas.convertToBlob({ type: "image/png" });
    } else {
      const sampledFrames = request.encodedFrames?.length
        ? request.frames
        : resampleExportFrames(request.frames, request.frameRate);
      const frames = appendPlaybackInterval(
        sampledFrames,
        request.frameRate,
        request.playbackInterval,
        request.format === "mov",
      );
      const onProgress = (progress: number) => {
        report(0.06 + progress * 0.92, "encoding");
      };
      if (request.format === "gif") {
        blob = await encodeTransparentGif(frames, {
          includeShadow: request.gifShadow,
          onProgress,
          transformFrame,
        });
      } else if (request.format === "apng") {
        blob = await encodeTransparentApng(frames, {
          onProgress,
          transformFrame,
        });
      } else {
        blob = await encodeTransparentMov(
          frames,
          request.frameRate,
          request.audio,
          {
            onProgress,
            transformFrame,
          },
        );
      }
    }

    report(1, "encoding");
    const buffer = await blob.arrayBuffer();
    postWorkerMessage(
      {
        buffer,
        id: request.id,
        mimeType: mimeTypeFor(request.format),
        type: "complete",
      },
      [buffer],
    );
  } catch (error) {
    postWorkerMessage({
      error: error instanceof Error ? error.message : "Export failed.",
      id: request.id,
      type: "error",
    });
  }
};

export {};
