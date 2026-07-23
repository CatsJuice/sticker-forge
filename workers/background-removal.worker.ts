/// <reference lib="webworker" />

import { AutoModel, RawImage, Tensor } from "@huggingface/transformers";

type RemoveRequest = {
  id: number;
  type: "remove";
  image: ArrayBuffer;
  mimeType: string;
};

type ProgressEvent = {
  status?: string;
  progress?: number;
  loaded?: number;
  total?: number;
  file?: string;
};

const MODEL_ID = "BritishWerewolf/U-2-Netp";
// U²-Net intentionally returns a soft matte, but its low-confidence tail often
// contains the original floor/wall color. Leaving that tail intact makes those
// pixels render above the sticker outline as a gray halo. Compress the tail
// while preserving a feathered transition around hair and fur.
const MATTE_BLACK_POINT = 0.12;
const MATTE_WHITE_POINT = 0.78;

let removerPromise: Promise<Awaited<ReturnType<typeof createRemover>>> | null = null;

function cleanMatteAlpha(value: number) {
  const normalized = Math.max(0, Math.min(1, value / 255));
  const clipped = Math.max(
    0,
    Math.min(
      1,
      (normalized - MATTE_BLACK_POINT) /
        (MATTE_WHITE_POINT - MATTE_BLACK_POINT),
    ),
  );
  return clipped * clipped * (3 - 2 * clipped);
}

function postProgress(id: number, phase: "loading" | "processing", progress?: number) {
  self.postMessage({ type: "progress", id, phase, progress });
}

async function createRemover(id: number) {
  const progressCallback = (event: ProgressEvent) => {
    if (event.status === "ready") {
      postProgress(id, "loading", 100);
      return;
    }
    const progress = Number(event.progress);
    if (Number.isFinite(progress)) {
      postProgress(id, "loading", Math.max(0, Math.min(100, progress)));
    }
  };

  const model = await AutoModel.from_pretrained(MODEL_ID, {
    device: "wasm",
    dtype: "fp32",
    progress_callback: progressCallback,
  });
  postProgress(id, "loading", 100);

  return async (input: Blob) => {
    const image = await RawImage.fromBlob(input);
    const inputSize = 320;
    const scale = Math.min(inputSize / image.width, inputSize / image.height);
    const resizedWidth = Math.max(1, Math.round(image.width * scale));
    const resizedHeight = Math.max(1, Math.round(image.height * scale));
    const left = Math.floor((inputSize - resizedWidth) / 2);
    const right = inputSize - resizedWidth - left;
    const top = Math.floor((inputSize - resizedHeight) / 2);
    const bottom = inputSize - resizedHeight - top;
    const resized = await image.clone().rgb().resize(resizedWidth, resizedHeight);
    const prepared = await resized.pad([left, right, top, bottom]);

    const mean = [0.485, 0.456, 0.406];
    const standardDeviation = [0.229, 0.224, 0.225];
    const planeSize = inputSize * inputSize;
    const normalized = new Float32Array(planeSize * 3);
    for (let pixel = 0; pixel < planeSize; pixel += 1) {
      for (let channel = 0; channel < 3; channel += 1) {
        normalized[channel * planeSize + pixel] =
          (prepared.data[pixel * 3 + channel] / 255 - mean[channel]) /
          standardDeviation[channel];
      }
    }
    const pixelValues = new Tensor("float32", normalized, [
      1,
      3,
      inputSize,
      inputSize,
    ]);
    const prediction = (await model({
      "input.1": pixelValues,
    })) as unknown as Record<
      string,
      { data: Float32Array | Uint8Array; dims: number[] }
    >;
    const composite = prediction["1959"] ?? Object.values(prediction)[0];
    if (!composite) throw new Error("The model returned no foreground mask");
    let minimum = Number.POSITIVE_INFINITY;
    let maximum = Number.NEGATIVE_INFINITY;
    for (const value of composite.data) {
      minimum = Math.min(minimum, Number(value));
      maximum = Math.max(maximum, Number(value));
    }
    const range = Math.max(maximum - minimum, 0.00001);
    const maskPixels = new Uint8Array(inputSize * inputSize);
    for (let index = 0; index < maskPixels.length; index += 1) {
      maskPixels[index] = Math.round(
        ((Number(composite.data[index]) - minimum) / range) * 255,
      );
    }
    const paddedMask = new RawImage(maskPixels, inputSize, inputSize, 1);
    const croppedMask = await paddedMask.crop([
      left,
      top,
      left + resizedWidth - 1,
      top + resizedHeight - 1,
    ]);
    const mask = await croppedMask.resize(image.width, image.height);
    image.rgba();
    for (let index = 0; index < mask.data.length; index += 1) {
      const cleanedAlpha = cleanMatteAlpha(mask.data[index]);
      const sourceAlpha = image.data[index * 4 + 3] / 255;
      mask.data[index] = Math.round(
        cleanedAlpha * sourceAlpha * 255,
      );
    }
    return image.putAlpha(mask);
  };
}

self.addEventListener("message", async (event: MessageEvent<RemoveRequest>) => {
  const request = event.data;
  if (request.type !== "remove") return;

  try {
    postProgress(request.id, "loading", 0);
    removerPromise ??= createRemover(request.id);
    const remover = await removerPromise;
    postProgress(request.id, "processing");

    const input = new Blob([request.image], { type: request.mimeType });
    const output = await remover(input);
    const pixels = new Uint8ClampedArray(output.data);
    self.postMessage(
      {
        type: "result",
        id: request.id,
        pixels: pixels.buffer,
        width: output.width,
        height: output.height,
      },
      { transfer: [pixels.buffer] },
    );
  } catch (error) {
    removerPromise = null;
    self.postMessage({
      type: "error",
      id: request.id,
      message: error instanceof Error ? error.message : "Background removal failed",
    });
  }
});

export {};
