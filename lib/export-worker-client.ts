"use client";

import type {
  StickerExportWorkerMessage,
  StickerExportWorkerProgressMessage,
  StickerExportWorkerRequest,
} from "./export-worker-types";

export type StickerExportWorkerTask = {
  cancel: () => void;
  promise: Promise<Blob>;
};

export function startStickerExportWorker(
  request: StickerExportWorkerRequest,
  onProgress: (progress: StickerExportWorkerProgressMessage) => void,
): StickerExportWorkerTask {
  const worker = new Worker(
    new URL("../workers/export.worker.ts", import.meta.url),
    { type: "module" },
  );
  let settled = false;
  let rejectTask: ((reason?: unknown) => void) | null = null;

  const cleanup = () => {
    worker.onmessage = null;
    worker.onerror = null;
    worker.terminate();
  };

  const promise = new Promise<Blob>((resolve, reject) => {
    rejectTask = reject;
    worker.onmessage = (event: MessageEvent<StickerExportWorkerMessage>) => {
      const message = event.data;
      if (message.id !== request.id || settled) return;
      if (message.type === "progress") {
        onProgress(message);
        return;
      }
      settled = true;
      cleanup();
      if (message.type === "error") {
        reject(new Error(message.error));
        return;
      }
      resolve(new Blob([message.buffer], { type: message.mimeType }));
    };
    worker.onerror = (event) => {
      if (settled) return;
      settled = true;
      cleanup();
      reject(new Error(event.message || "Export worker crashed."));
    };
    const transfer: Transferable[] = request.frames.map(
      (frame) => frame.rgba.buffer,
    );
    if (request.audio) transfer.push(request.audio.pcm.buffer);
    worker.postMessage(request, transfer);
  });

  return {
    promise,
    cancel: () => {
      if (settled) return;
      settled = true;
      cleanup();
      rejectTask?.(new DOMException("Export canceled.", "AbortError"));
    },
  };
}
