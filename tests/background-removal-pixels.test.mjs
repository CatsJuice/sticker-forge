import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import ts from "typescript";

function deterministicDataUrl(width, height, pixels) {
  const dimensions = Buffer.alloc(8);
  dimensions.writeUInt32BE(width, 0);
  dimensions.writeUInt32BE(height, 4);
  const pixelBytes = Buffer.from(
    pixels.buffer,
    pixels.byteOffset,
    pixels.byteLength,
  );
  return `data:image/png;base64,${Buffer.concat([
    dimensions,
    pixelBytes,
  ]).toString("base64")}`;
}

async function loadPixelsToDataUrl() {
  const source = await readFile(
    new URL("../lib/background-removal.ts", import.meta.url),
    "utf8",
  );
  const instrumented = source.replace(
    "function pixelsToDataUrl(",
    "export function pixelsToDataUrl(",
  );
  assert.notEqual(instrumented, source, "pixelsToDataUrl must remain testable");
  const compiled = ts.transpileModule(instrumented, {
    compilerOptions: {
      module: ts.ModuleKind.ESNext,
      target: ts.ScriptTarget.ES2022,
    },
  }).outputText;
  return import(
    `data:text/javascript;base64,${Buffer.from(compiled).toString("base64")}`
  );
}

function baselinePixelsToDataUrl(pixels, width, height) {
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  if (!context) throw new Error("Canvas is unavailable");
  const imageDataPixels = new Uint8ClampedArray(pixels.length);
  imageDataPixels.set(pixels);
  context.putImageData(new ImageData(imageDataPixels, width, height), 0, 0);
  return canvas.toDataURL("image/png");
}

function installDeterministicCanvas() {
  const imageDataInstances = [];
  class DeterministicImageData {
    constructor(data, width, height) {
      assert.equal(data.length, width * height * 4);
      this.data = data;
      this.width = width;
      this.height = height;
      imageDataInstances.push(this);
    }
  }

  const documentStub = {
    createElement(tagName) {
      assert.equal(tagName, "canvas");
      const canvas = {
        width: 0,
        height: 0,
        imageData: null,
        getContext(kind) {
          assert.equal(kind, "2d");
          return {
            putImageData(imageData, x, y) {
              assert.equal(x, 0);
              assert.equal(y, 0);
              canvas.imageData = imageData;
            },
          };
        },
        toDataURL(type) {
          assert.equal(type, "image/png");
          assert.ok(canvas.imageData);
          return deterministicDataUrl(
            canvas.width,
            canvas.height,
            canvas.imageData.data,
          );
        },
      };
      return canvas;
    },
  };

  const originalDocument = Object.getOwnPropertyDescriptor(
    globalThis,
    "document",
  );
  const originalImageData = Object.getOwnPropertyDescriptor(
    globalThis,
    "ImageData",
  );
  Object.defineProperty(globalThis, "document", {
    configurable: true,
    value: documentStub,
  });
  Object.defineProperty(globalThis, "ImageData", {
    configurable: true,
    value: DeterministicImageData,
  });

  return {
    imageDataInstances,
    restore() {
      if (originalDocument) {
        Object.defineProperty(globalThis, "document", originalDocument);
      } else {
        delete globalThis.document;
      }
      if (originalImageData) {
        Object.defineProperty(globalThis, "ImageData", originalImageData);
      } else {
        delete globalThis.ImageData;
      }
    },
  };
}

test("background-removal PNG conversion reuses its owned RGBA buffer", async () => {
  const { pixelsToDataUrl } = await loadPixelsToDataUrl();
  const width = 4;
  const height = 3;
  const ownedBuffer = new ArrayBuffer(width * height * 4);
  const pixels = new Uint8ClampedArray(ownedBuffer);
  for (let index = 0; index < pixels.length; index += 1) {
    pixels[index] = (index * 73 + 19) & 255;
  }
  const originalPixels = new Uint8ClampedArray(pixels);
  const canvas = installDeterministicCanvas();

  try {
    const baselineDataUrl = baselinePixelsToDataUrl(pixels, width, height);
    const optimizedDataUrl = pixelsToDataUrl(pixels, width, height);
    const [baselineImageData, optimizedImageData] =
      canvas.imageDataInstances;

    assert.equal(canvas.imageDataInstances.length, 2);
    assert.notStrictEqual(baselineImageData.data, pixels);
    assert.notStrictEqual(baselineImageData.data.buffer, ownedBuffer);
    assert.strictEqual(optimizedImageData.data, pixels);
    assert.strictEqual(optimizedImageData.data.buffer, ownedBuffer);
    assert.equal(optimizedDataUrl, baselineDataUrl);
    assert.equal(
      optimizedDataUrl,
      deterministicDataUrl(width, height, pixels),
    );
    assert.deepEqual(pixels, originalPixels);
  } finally {
    canvas.restore();
  }
});
