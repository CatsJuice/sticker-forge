const HEIC_EXTENSION = /\.(heic|heif)$/i;
const HEIC_MIME_TYPE = /^image\/hei[cf]$/i;

export function isHeicFile(file: File) {
  return HEIC_MIME_TYPE.test(file.type) || HEIC_EXTENSION.test(file.name);
}

export async function convertHeicToJpeg(file: File) {
  const { default: decode } = await import("heic-decode");
  const decoded = await decode({
    buffer: new Uint8Array(await file.arrayBuffer()),
  }) as {
    width: number;
    height: number;
    data: Uint8ClampedArray;
  };
  if (!decoded.width || !decoded.height || !decoded.data.length) {
    throw new Error("The HEIC image contained no displayable frame");
  }

  const sourceCanvas = document.createElement("canvas");
  sourceCanvas.width = decoded.width;
  sourceCanvas.height = decoded.height;
  const sourceContext = sourceCanvas.getContext("2d");
  if (!sourceContext) throw new Error("Canvas is unavailable");
  const pixels: Uint8ClampedArray<ArrayBuffer> = new Uint8ClampedArray(
    decoded.data.length,
  );
  pixels.set(decoded.data);
  sourceContext.putImageData(
    new ImageData(pixels, decoded.width, decoded.height),
    0,
    0,
  );

  const maximumSide = 4096;
  const scale = Math.min(
    1,
    maximumSide / Math.max(decoded.width, decoded.height),
  );
  const outputCanvas = document.createElement("canvas");
  outputCanvas.width = Math.max(1, Math.round(decoded.width * scale));
  outputCanvas.height = Math.max(1, Math.round(decoded.height * scale));
  const outputContext = outputCanvas.getContext("2d");
  if (!outputContext) throw new Error("Canvas is unavailable");
  outputContext.drawImage(
    sourceCanvas,
    0,
    0,
    outputCanvas.width,
    outputCanvas.height,
  );

  return new Promise<Blob>((resolve, reject) => {
    outputCanvas.toBlob(
      (blob) => blob
        ? resolve(blob)
        : reject(new Error("Could not encode the decoded HEIC image")),
      "image/jpeg",
      0.94,
    );
  });
}
