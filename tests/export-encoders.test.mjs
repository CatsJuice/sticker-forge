import assert from "node:assert/strict";
import { execFile } from "node:child_process";
import { promisify } from "node:util";
import test from "node:test";

const run = promisify(execFile);

test("encodes transparent GIF, APNG, and ProRes 4444 MOV", async () => {
  const script = `
    import { appendPlaybackInterval, encodeTransparentApng, encodeTransparentGif, encodeTransparentMov, prepareGifAlpha, repairTransparentEdgeColors, resampleExportFrames } from "./lib/export-encoders.ts";
    import { inflateSync } from "node:zlib";
    const width = 12;
    const height = 10;
    const frames = Array.from({ length: 3 }, (_, frameIndex) => {
      const rgba = new Uint8ClampedArray(width * height * 4);
      for (let y = 2; y < 8; y += 1) {
        for (let x = 2 + frameIndex; x < 7 + frameIndex; x += 1) {
          const offset = (y * width + x) * 4;
          rgba[offset] = 36;
          rgba[offset + 1] = 126;
          rgba[offset + 2] = 245;
          rgba[offset + 3] = 255;
        }
      }
      return { rgba, width, height, durationMs: 50 };
    });
    const gif = new Uint8Array(await (await encodeTransparentGif(frames)).arrayBuffer());
    const graphicControlOffset = gif.findIndex(
      (byte, index) => byte === 0x21 && gif[index + 1] === 0xf9 && gif[index + 2] === 0x04,
    );
    const transparentIndex = gif[graphicControlOffset + 6];
    const transparentPaletteOffset = 13 + transparentIndex * 3;
    const transparentPaletteColor = Array.from(
      gif.slice(transparentPaletteOffset, transparentPaletteOffset + 3),
    );
    const decodeFirstGifFrame = (bytes) => {
      let offset = 13;
      const globalTableSize = 1 << ((bytes[10] & 0x07) + 1);
      if (bytes[10] & 0x80) offset += globalTableSize * 3;
      let minimumCodeSize = 0;
      const compressed = [];
      while (offset < bytes.length) {
        const marker = bytes[offset++];
        if (marker === 0x21) {
          offset += 1;
          while (bytes[offset]) offset += bytes[offset] + 1;
          offset += 1;
          continue;
        }
        if (marker !== 0x2c) continue;
        const packed = bytes[offset + 8];
        offset += 9;
        if (packed & 0x80) offset += (1 << ((packed & 0x07) + 1)) * 3;
        minimumCodeSize = bytes[offset++];
        while (bytes[offset]) {
          const length = bytes[offset++];
          compressed.push(...bytes.slice(offset, offset + length));
          offset += length;
        }
        break;
      }
      const clearCode = 1 << minimumCodeSize;
      const endCode = clearCode + 1;
      let codeSize = minimumCodeSize + 1;
      let nextCode = endCode + 1;
      let bitOffset = 0;
      let previous = null;
      let dictionary = [];
      const reset = () => {
        dictionary = Array.from({ length: clearCode }, (_, index) => [index]);
        codeSize = minimumCodeSize + 1;
        nextCode = endCode + 1;
        previous = null;
      };
      const readCode = () => {
        let code = 0;
        for (let bit = 0; bit < codeSize; bit += 1) {
          code |= ((compressed[bitOffset >> 3] >> (bitOffset & 7)) & 1) << bit;
          bitOffset += 1;
        }
        return code;
      };
      const output = [];
      reset();
      while (bitOffset + codeSize <= compressed.length * 8) {
        const code = readCode();
        if (code === clearCode) {
          reset();
          continue;
        }
        if (code === endCode) break;
        const entry = dictionary[code] ??
          (code === nextCode && previous ? [...previous, previous[0]] : null);
        if (!entry) throw new Error("Invalid GIF LZW stream.");
        output.push(...entry);
        if (previous) {
          dictionary[nextCode] = [...previous, entry[0]];
          nextCode += 1;
          if (nextCode === 1 << codeSize && codeSize < 12) codeSize += 1;
        }
        previous = entry;
      }
      return output;
    };
    const firstGifFrame = decodeFirstGifFrame(gif);
    const apng = new Uint8Array(await (await encodeTransparentApng(frames)).arrayBuffer());
    const silentPcm = new Uint8Array(4_800 * 2 * 2);
    const mov = new Uint8Array(await (await encodeTransparentMov(frames, 30, {
      pcm: silentPcm,
      sampleRate: 48_000,
      channels: 2,
    })).arrayBuffer());
    const apngChunks = [];
    for (let offset = 8; offset < apng.length;) {
      const length = new DataView(apng.buffer, apng.byteOffset + offset, 4).getUint32(0);
      const type = new TextDecoder().decode(apng.slice(offset + 4, offset + 8));
      apngChunks.push({ type, data: apng.slice(offset + 8, offset + 8 + length) });
      offset += length + 12;
    }
    const firstFrameData = apngChunks
      .filter((chunk) => chunk.type === "IDAT")
      .map((chunk) => chunk.data);
    const firstFrameCompressed = new Uint8Array(
      firstFrameData.reduce((length, chunk) => length + chunk.length, 0),
    );
    let firstFrameOffset = 0;
    for (const chunk of firstFrameData) {
      firstFrameCompressed.set(chunk, firstFrameOffset);
      firstFrameOffset += chunk.length;
    }
    const firstFrameRaw = inflateSync(firstFrameCompressed);
    const translucent = new Uint8ClampedArray(64 * 64 * 4);
    for (let index = 0; index < 64 * 64; index += 1) {
      translucent[index * 4] = 87;
      translucent[index * 4 + 1] = 87;
      translucent[index * 4 + 2] = 87;
      translucent[index * 4 + 3] = 22;
    }
    const cleanShadow = prepareGifAlpha(translucent, 64, 64, false);
    const ditheredShadow = prepareGifAlpha(translucent, 64, 64, true);
    const contaminatedEdge = new Uint8ClampedArray([
      255, 255, 255, 255,
      88, 88, 88, 128,
      0, 0, 0, 0,
    ]);
    const repairedEdge = repairTransparentEdgeColors(contaminatedEdge, 3, 1);
    const preparedEdge = prepareGifAlpha(contaminatedEdge, 3, 1, false);
    const recorded = [32, 224].map((red) => ({
      rgba: new Uint8ClampedArray([red, 0, 0, 255]),
      width: 1,
      height: 1,
      durationMs: 100,
    }));
    const resampled10 = resampleExportFrames(recorded, 10);
    const resampled20 = resampleExportFrames(recorded, 20);
    const heldGifFrames = appendPlaybackInterval(resampled10, 10, 2, false);
    const heldMovFrames = appendPlaybackInterval(resampled10, 10, 0.5, true);
    let cleanOpaque = 0;
    let cleanTransparent = 0;
    let ditheredOpaque = 0;
    let ditheredPartial = 0;
    for (let y = 0; y < 64; y += 1) {
      for (let x = 0; x < 64; x += 1) {
        const index = (y * 64 + x) * 4 + 3;
        if (cleanShadow[index] === 255) cleanOpaque += 1;
        else if (cleanShadow[index] === 0) cleanTransparent += 1;
        if (ditheredShadow[index] === 255) ditheredOpaque += 1;
        else if (ditheredShadow[index] !== 0) ditheredPartial += 1;
      }
    }
    const ascii = (bytes) => new TextDecoder().decode(bytes);
    console.log(JSON.stringify({
      gifHeader: ascii(gif.slice(0, 6)),
      transparentPaletteColor,
      gifTransparentIndex: transparentIndex,
      gifCornerIndex: firstGifFrame[0],
      gifStickerIndex: firstGifFrame[3 * width + 3],
      apngSignature: Array.from(apng.slice(0, 8)),
      hasApngControl: ascii(apng).includes("acTL"),
      hasApngFrames: ascii(apng).includes("fcTL") && ascii(apng).includes("fdAT"),
      apngFrameControlCount: apngChunks.filter((chunk) => chunk.type === "fcTL").length,
      firstFrameRawLength: firstFrameRaw.length,
      movHeader: ascii(mov.slice(4, 16)),
      hasProRes4444Codec: ascii(mov).includes("ap4h"),
      hasPcmAudioCodec: ascii(mov).includes("sowt"),
      hasSoundHandler: ascii(mov).includes("soun"),
      gifSize: gif.length,
      apngSize: apng.length,
      movSize: mov.length,
      cleanOpaque,
      cleanTransparent,
      ditheredOpaque,
      ditheredPartial,
      repairedEdge: Array.from(repairedEdge.slice(4, 8)),
      preparedEdge: Array.from(preparedEdge.slice(4, 8)),
      resampled10Count: resampled10.length,
      resampled20Count: resampled20.length,
      resampled20Reds: resampled20.map((frame) => frame.rgba[0]),
      resampled20Duration: resampled20[0].durationMs,
      heldGifFrameCount: heldGifFrames.length,
      heldGifLastDuration: heldGifFrames.at(-1).durationMs,
      heldMovFrameCount: heldMovFrames.length,
      heldMovDuration: heldMovFrames.reduce((total, frame) => total + frame.durationMs, 0),
    }));
  `;
  const { stdout } = await run(
    process.execPath,
    ["--experimental-strip-types", "--input-type=module", "--eval", script],
    { cwd: new URL("..", import.meta.url) },
  );
  const result = JSON.parse(stdout.trim());
  assert.equal(result.gifHeader, "GIF89a");
  assert.deepEqual(result.transparentPaletteColor, [255, 255, 255]);
  assert.equal(result.gifCornerIndex, result.gifTransparentIndex);
  assert.notEqual(result.gifStickerIndex, result.gifTransparentIndex);
  assert.deepEqual(result.apngSignature, [137, 80, 78, 71, 13, 10, 26, 10]);
  assert.equal(result.hasApngControl, true);
  assert.equal(result.hasApngFrames, true);
  assert.equal(result.apngFrameControlCount, 3);
  assert.equal(result.firstFrameRawLength, 490);
  assert.equal(result.movHeader, "ftypqt  \u0000\u0000\u0002\u0000");
  assert.equal(result.hasProRes4444Codec, true);
  assert.equal(result.hasPcmAudioCodec, true);
  assert.equal(result.hasSoundHandler, true);
  assert.ok(result.gifSize > 100);
  assert.ok(result.apngSize > 200);
  assert.ok(result.movSize > 500);
  assert.equal(result.cleanOpaque, 0);
  assert.equal(result.cleanTransparent, 4096);
  assert.ok(result.ditheredOpaque > 250 && result.ditheredOpaque < 500);
  assert.equal(result.ditheredPartial, 0);
  assert.deepEqual(result.repairedEdge, [255, 255, 255, 128]);
  assert.deepEqual(result.preparedEdge, [255, 255, 255, 255]);
  assert.equal(result.resampled10Count, 2);
  assert.equal(result.resampled20Count, 4);
  assert.deepEqual(result.resampled20Reds, [32, 32, 224, 224]);
  assert.equal(result.resampled20Duration, 50);
  assert.equal(result.heldGifFrameCount, 2);
  assert.equal(result.heldGifLastDuration, 2100);
  assert.equal(result.heldMovFrameCount, 7);
  assert.equal(result.heldMovDuration, 700);
});
