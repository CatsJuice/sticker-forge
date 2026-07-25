export type BackgroundRemovalProgress = {
  phase: "loading" | "processing";
  progress?: number;
};

export type BackgroundRemovalResult = {
  dataUrl: string;
  pixels: Uint8ClampedArray;
  width: number;
  height: number;
};

type WorkerResponse =
  | {
      type: "progress";
      id: number;
      phase: BackgroundRemovalProgress["phase"];
      progress?: number;
    }
  | {
      type: "result";
      id: number;
      pixels: ArrayBuffer;
      width: number;
      height: number;
    }
  | { type: "error"; id: number; message: string };

type PendingRequest = {
  resolve: (result: BackgroundRemovalResult) => void;
  reject: (error: Error) => void;
  onProgress?: (progress: BackgroundRemovalProgress) => void;
  image: ArrayBuffer;
  mimeType: string;
  retries: number;
};

let worker: Worker | null = null;
let requestId = 0;
const pending = new Map<number, PendingRequest>();

function postWorkerRequest(
  target: Worker,
  id: number,
  request: PendingRequest,
) {
  const image = request.image.slice(0);
  target.postMessage(
    {
      type: "remove",
      id,
      image,
      mimeType: request.mimeType,
    },
    [image],
  );
}

function workerFailureMessage(event: ErrorEvent) {
  const detail =
    event.error instanceof Error ? event.error.message : event.message;
  const location = event.filename
    ? `${event.filename}${event.lineno ? `:${event.lineno}` : ""}`
    : "";
  if (detail && location) {
    return `Background removal worker failed at ${location}: ${detail}`;
  }
  if (detail) return `Background removal worker failed: ${detail}`;
  if (location) return `Background removal worker failed at ${location}`;
  return "Background removal worker failed";
}

function pixelsToDataUrl(
  pixels: Uint8ClampedArray,
  width: number,
  height: number,
) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  const imageDataPixels: Uint8ClampedArray<ArrayBuffer> = new Uint8ClampedArray(
    pixels.length,
  );
  imageDataPixels.set(pixels);
  context.putImageData(new ImageData(imageDataPixels, width, height), 0, 0);
  return canvas.toDataURL("image/png");
}

function getWorker() {
  if (worker) return worker;
  worker = new Worker(
    new URL("../workers/background-removal.worker.ts", import.meta.url),
    { type: "module", name: "sticker-background-removal" },
  );
  worker.addEventListener("message", (event: MessageEvent<WorkerResponse>) => {
    const response = event.data;
    const request = pending.get(response.id);
    if (!request) return;
    if (response.type === "progress") {
      request.onProgress?.({
        phase: response.phase,
        progress: response.progress,
      });
      return;
    }
    pending.delete(response.id);
    if (response.type === "error") {
      request.reject(new Error(response.message));
      return;
    }
    try {
      const pixels = new Uint8ClampedArray(response.pixels);
      request.resolve({
        pixels,
        width: response.width,
        height: response.height,
        dataUrl: pixelsToDataUrl(pixels, response.width, response.height),
      });
    } catch (error) {
      request.reject(
        error instanceof Error ? error : new Error("Could not create the cutout"),
      );
    }
  });
  worker.addEventListener("error", (event) => {
    const failedWorker = worker;
    worker = null;
    failedWorker?.terminate();
    const retryable: Array<[number, PendingRequest]> = [];
    const error = new Error(workerFailureMessage(event));
    for (const entry of pending.entries()) {
      const [id, request] = entry;
      if (request.retries < 1) {
        request.retries += 1;
        retryable.push([id, request]);
      } else {
        pending.delete(id);
        request.reject(error);
      }
    }
    if (!retryable.length) return;
    window.setTimeout(() => {
      let restartedWorker: Worker;
      try {
        restartedWorker = getWorker();
      } catch (restartError) {
        const failure =
          restartError instanceof Error ? restartError : error;
        for (const [id, request] of retryable) {
          pending.delete(id);
          request.reject(failure);
        }
        return;
      }
      for (const [id, request] of retryable) {
        request.onProgress?.({ phase: "loading", progress: 0 });
        postWorkerRequest(restartedWorker, id, request);
      }
    }, 120);
  });
  return worker;
}

async function normalizeImageSource(source: string) {
  const image = new Image();
  image.decoding = "async";
  await new Promise<void>((resolve, reject) => {
    image.onload = () => resolve();
    image.onerror = () => reject(new Error("The source image could not be decoded"));
    image.src = source;
  });

  const naturalWidth = image.naturalWidth || image.width;
  const naturalHeight = image.naturalHeight || image.height;
  if (!naturalWidth || !naturalHeight) {
    throw new Error("The source image has no visible dimensions");
  }
  const maximumSide = 4096;
  const scale = Math.min(1, maximumSide / Math.max(naturalWidth, naturalHeight));
  const width = Math.max(1, Math.round(naturalWidth * scale));
  const height = Math.max(1, Math.round(naturalHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  context.drawImage(image, 0, 0, width, height);
  return new Promise<Blob>((resolve, reject) => {
    canvas.toBlob(
      (blob) => blob ? resolve(blob) : reject(new Error("Could not prepare the image")),
      "image/png",
    );
  });
}

export async function removeImageBackground(
  source: string,
  onProgress?: (progress: BackgroundRemovalProgress) => void,
) {
  const blob = await normalizeImageSource(source);
  const image = await blob.arrayBuffer();
  const id = ++requestId;
  return new Promise<BackgroundRemovalResult>((resolve, reject) => {
    const request: PendingRequest = {
      resolve,
      reject,
      onProgress,
      image,
      mimeType: blob.type || "image/png",
      retries: 0,
    };
    pending.set(id, request);
    postWorkerRequest(getWorker(), id, request);
  });
}
