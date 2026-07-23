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
      const sampledFrames = resampleExportFrames(
        request.frames,
        request.frameRate,
      );
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
          transformFrame: scaleFrame,
        });
      } else if (request.format === "apng") {
        blob = await encodeTransparentApng(frames, {
          onProgress,
          transformFrame: scaleFrame,
        });
      } else {
        blob = await encodeTransparentMov(
          frames,
          request.frameRate,
          request.audio,
          {
            onProgress,
            transformFrame: scaleFrame,
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
