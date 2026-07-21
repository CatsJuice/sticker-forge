import { desc, eq } from "drizzle-orm";
import { galleryItems } from "@/db/schema";
import {
  galleryAssetKey,
  galleryErrorResponse,
  galleryPreviewKey,
  getGalleryDb,
  getGalleryBucket,
  jsonResponse,
  parseGalleryLayout,
  readJsonBody,
  resolveGalleryOwner,
  rowToGalleryItem,
  withGalleryOwnerCookie,
} from "@/lib/gallery-server";
import type {
  CreateGalleryPayload,
  GalleryAsset,
} from "@/lib/gallery-types";
import type {
  StickerOptions,
  StickerRichTextDocument,
  StickerSource,
} from "@/lib/types";

export const dynamic = "force-dynamic";

const MAX_CREATE_BODY_BYTES = 24_000_000;
const MAX_PREVIEW_DATA_URL_LENGTH = 1_700_000;
const MAX_PREVIEW_BYTES = 1_250_000;
const MAX_ASSET_JSON_LENGTH = 22_000_000;
const MAX_TITLE_LENGTH = 120;

type ParsedPreview = {
  bytes: Uint8Array;
  mimeType: "image/png" | "image/webp" | "image/jpeg" | "image/avif";
};

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function hasOnlyKeys(value: Record<string, unknown>, allowed: string[]) {
  return Object.keys(value).every((key) => allowed.includes(key));
}

function isBoundedString(value: unknown, maxLength: number) {
  return typeof value === "string" && value.length <= maxLength;
}

function isNumberInRange(value: unknown, min: number, max: number) {
  return typeof value === "number" && Number.isFinite(value) && value >= min && value <= max;
}

function hasValidOptionalNumber(
  value: Record<string, unknown>,
  key: string,
  min: number,
  max: number,
) {
  return !(key in value) || isNumberInRange(value[key], min, max);
}

function hasValidOptionalString(
  value: Record<string, unknown>,
  key: string,
  maxLength: number,
) {
  return !(key in value) || isBoundedString(value[key], maxLength);
}

function hasValidOptionalBoolean(value: Record<string, unknown>, key: string) {
  return !(key in value) || typeof value[key] === "boolean";
}

function isFontWeight(value: unknown) {
  return (
    (typeof value === "number" && Number.isFinite(value) && value >= 1 && value <= 1000) ||
    (typeof value === "string" && value.length <= 64)
  );
}

function parseRichText(value: unknown): StickerRichTextDocument | null {
  if (!isRecord(value) || !hasOnlyKeys(value, ["blocks"]) || !Array.isArray(value.blocks)) {
    return null;
  }
  if (value.blocks.length > 400) return null;
  let totalCharacters = 0;
  for (const block of value.blocks) {
    if (
      !isRecord(block) ||
      !hasOnlyKeys(block, ["align", "lineHeight", "runs"]) ||
      !Array.isArray(block.runs) ||
      block.runs.length > 500 ||
      ("align" in block && !["left", "center", "right"].includes(String(block.align))) ||
      !hasValidOptionalNumber(block, "lineHeight", 0.1, 10)
    ) {
      return null;
    }
    for (const run of block.runs) {
      if (
        !isRecord(run) ||
        !hasOnlyKeys(run, ["text", "color", "fontSize", "fontWeight", "underline"]) ||
        typeof run.text !== "string" ||
        !hasValidOptionalString(run, "color", 128) ||
        !hasValidOptionalNumber(run, "fontSize", 1, 1000) ||
        ("fontWeight" in run && !isFontWeight(run.fontWeight)) ||
        !hasValidOptionalBoolean(run, "underline")
      ) {
        return null;
      }
      totalCharacters += run.text.length;
      if (totalCharacters > 100_000) return null;
    }
  }
  return value as unknown as StickerRichTextDocument;
}

function parseSource(value: unknown): StickerSource | null {
  if (!isRecord(value)) return null;
  if (value.type === "text" && typeof value.text === "string") {
    if (
      value.text.length > 100_000 ||
      !hasOnlyKeys(value, ["type", "text", "color", "fontFamily", "fontWeight", "richText"]) ||
      !hasValidOptionalString(value, "color", 128) ||
      !hasValidOptionalString(value, "fontFamily", 512) ||
      ("fontWeight" in value && !isFontWeight(value.fontWeight)) ||
      ("richText" in value && !parseRichText(value.richText))
    ) {
      return null;
    }
    return value as unknown as StickerSource;
  }
  if (value.type === "svg" && typeof value.svg === "string") {
    if (
      value.svg.length > 2_000_000 ||
      !/^\s*<svg[\s>]/i.test(value.svg) ||
      !hasOnlyKeys(value, ["type", "svg"])
    ) {
      return null;
    }
    return value as unknown as StickerSource;
  }
  if (value.type === "image" && typeof value.src === "string") {
    const isStoredImage = /^data:image\//i.test(value.src);
    const isSameOriginPath = /^\/(?!\/)/.test(value.src);
    if (
      value.src.length > 20_500_000 ||
      (!isStoredImage && !isSameOriginPath) ||
      !hasOnlyKeys(value, ["type", "src", "name"]) ||
      !hasValidOptionalString(value, "name", 512)
    ) {
      return null;
    }
    return value as unknown as StickerSource;
  }
  return null;
}

function parseOptions(value: unknown): StickerOptions | null {
  if (
    !isRecord(value) ||
    !hasOnlyKeys(value, ["outline", "shadow", "peel", "back", "sound", "tilt", "wind", "quality"])
  ) {
    return null;
  }
  const outline = value.outline;
  if (
    outline !== undefined &&
    (!isRecord(outline) ||
      !hasOnlyKeys(outline, ["width", "color"]) ||
      !hasValidOptionalNumber(outline, "width", 0, 512) ||
      !hasValidOptionalString(outline, "color", 128))
  ) {
    return null;
  }
  const shadow = value.shadow;
  if (
    shadow !== undefined &&
    (!isRecord(shadow) ||
      !hasOnlyKeys(shadow, ["color", "opacity", "blur", "distance", "angle"]) ||
      !hasValidOptionalString(shadow, "color", 128) ||
      !hasValidOptionalNumber(shadow, "opacity", 0, 1) ||
      !hasValidOptionalNumber(shadow, "blur", 0, 512) ||
      !hasValidOptionalNumber(shadow, "distance", -2048, 2048) ||
      !hasValidOptionalNumber(shadow, "angle", -3600, 3600))
  ) {
    return null;
  }
  const peel = value.peel;
  if (
    peel !== undefined &&
    (!isRecord(peel) ||
      !hasOnlyKeys(peel, ["radius", "stiffness", "grabWidth", "maxAngle", "release"]) ||
      !hasValidOptionalNumber(peel, "radius", 0.001, 10) ||
      !hasValidOptionalNumber(peel, "stiffness", 0, 10) ||
      !hasValidOptionalNumber(peel, "grabWidth", 0, 512) ||
      !hasValidOptionalNumber(peel, "maxAngle", 0, 360) ||
      ("release" in peel && !["reset", "stay", "snap"].includes(String(peel.release))))
  ) {
    return null;
  }
  const back = value.back;
  if (
    back !== undefined &&
    (!isRecord(back) ||
      !hasOnlyKeys(back, ["color", "gloss", "roughness"]) ||
      !hasValidOptionalString(back, "color", 128) ||
      !hasValidOptionalNumber(back, "gloss", 0, 1) ||
      !hasValidOptionalNumber(back, "roughness", 0, 1))
  ) {
    return null;
  }
  const sound = value.sound;
  if (
    sound !== undefined &&
    (!isRecord(sound) ||
      !hasOnlyKeys(sound, ["src", "volume", "enabled"]) ||
      !hasValidOptionalString(sound, "src", 2048) ||
      !hasValidOptionalNumber(sound, "volume", 0, 1) ||
      !hasValidOptionalBoolean(sound, "enabled"))
  ) {
    return null;
  }
  if (
    !hasValidOptionalNumber(value, "tilt", -3600, 3600) ||
    !hasValidOptionalNumber(value, "wind", 0, 100) ||
    ("quality" in value && !["low", "medium", "high"].includes(String(value.quality)))
  ) {
    return null;
  }
  return value as StickerOptions;
}

function hasPreviewSignature(bytes: Uint8Array, mimeType: ParsedPreview["mimeType"]) {
  if (mimeType === "image/png") {
    return bytes.length >= 8 && [137, 80, 78, 71, 13, 10, 26, 10].every((byte, index) => bytes[index] === byte);
  }
  if (mimeType === "image/jpeg") {
    return bytes.length >= 3 && bytes[0] === 0xff && bytes[1] === 0xd8 && bytes[2] === 0xff;
  }
  if (mimeType === "image/webp") {
    return bytes.length >= 12 && String.fromCharCode(...bytes.slice(0, 4)) === "RIFF" && String.fromCharCode(...bytes.slice(8, 12)) === "WEBP";
  }
  return bytes.length >= 12 && String.fromCharCode(...bytes.slice(4, 12)).includes("ftyp");
}

function parsePreview(dataUrl: unknown): ParsedPreview | null {
  if (
    typeof dataUrl !== "string" ||
    dataUrl.length > MAX_PREVIEW_DATA_URL_LENGTH
  ) {
    return null;
  }
  const match = /^data:(image\/(?:png|webp|jpeg|avif));base64,([a-z0-9+/=]+)$/i.exec(
    dataUrl,
  );
  if (!match) return null;
  try {
    const decoded = atob(match[2]);
    if (decoded.length > MAX_PREVIEW_BYTES) return null;
    const bytes = Uint8Array.from(decoded, (character) => character.charCodeAt(0));
    const mimeType = match[1].toLowerCase() as ParsedPreview["mimeType"];
    if (!hasPreviewSignature(bytes, mimeType)) return null;
    return { bytes, mimeType };
  } catch {
    return null;
  }
}

function parseDimension(value: unknown): number | null {
  return typeof value === "number" &&
    Number.isInteger(value) &&
    value > 0 &&
    value <= 4096
    ? value
    : null;
}

function defaultTitle(source: StickerSource): string {
  if (source.type === "text") {
    const firstLine = source.text.split(/\r?\n/, 1)[0]?.trim();
    if (firstLine) return firstLine.slice(0, MAX_TITLE_LENGTH);
  }
  if (source.type === "image" && source.name?.trim()) {
    return source.name.trim().slice(0, MAX_TITLE_LENGTH);
  }
  return "Sticker";
}

function parseCreatePayload(value: unknown): {
  payload: CreateGalleryPayload;
  preview: ParsedPreview;
  asset: GalleryAsset;
  assetBody: string;
} | null {
  if (!isRecord(value)) return null;
  const source = parseSource(value.source);
  const options = parseOptions(value.options);
  const preview = parsePreview(value.previewDataUrl);
  const previewWidth = parseDimension(value.previewWidth);
  const previewHeight = parseDimension(value.previewHeight);
  const layout = parseGalleryLayout(value.layout);
  if (!source || !options || !preview || !previewWidth || !previewHeight || !layout) {
    return null;
  }
  const title =
    typeof value.title === "string" && value.title.trim()
      ? value.title.trim().slice(0, MAX_TITLE_LENGTH)
      : defaultTitle(source);
  const payload: CreateGalleryPayload = {
    source,
    options,
    previewDataUrl: value.previewDataUrl as string,
    previewWidth,
    previewHeight,
    title,
    layout,
  };
  const asset: GalleryAsset = { source, options };
  const assetBody = JSON.stringify(asset);
  if (assetBody.length > MAX_ASSET_JSON_LENGTH) return null;
  return { payload, preview, asset, assetBody };
}

export async function GET(request: Request) {
  const owner = resolveGalleryOwner(request);
  try {
    const db = await getGalleryDb();
    const rows = await db
      .select()
      .from(galleryItems)
      .where(eq(galleryItems.ownerId, owner.id))
      .orderBy(desc(galleryItems.createdAt), desc(galleryItems.id));
    return withGalleryOwnerCookie(
      jsonResponse({ items: rows.map(rowToGalleryItem) }),
      request,
      owner,
    );
  } catch (error) {
    return withGalleryOwnerCookie(galleryErrorResponse(error), request, owner);
  }
}

export async function POST(request: Request) {
  const owner = resolveGalleryOwner(request);
  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Expected an application/json request body." }, { status: 415 }),
        request,
        owner,
      );
    }
    const parsed = parseCreatePayload(await readJsonBody(request, MAX_CREATE_BODY_BYTES));
    if (!parsed) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "The gallery item payload is invalid." }, { status: 400 }),
        request,
        owner,
      );
    }

    const id = crypto.randomUUID();
    const createdAt = Date.now();
    const assetKey = galleryAssetKey(owner.id, id);
    const previewKey = galleryPreviewKey(owner.id, id, parsed.preview.mimeType);
    const bucket = await getGalleryBucket();
    try {
      const writes = await Promise.allSettled([
        bucket.put(assetKey, parsed.assetBody, {
          httpMetadata: {
            contentType: "application/json; charset=utf-8",
            cacheControl: "private, max-age=31536000, immutable",
          },
          customMetadata: { ownerId: owner.id, itemId: id, kind: "asset" },
        }),
        bucket.put(previewKey, parsed.preview.bytes, {
          httpMetadata: {
            contentType: parsed.preview.mimeType,
            cacheControl: "private, max-age=31536000, immutable",
          },
          customMetadata: { ownerId: owner.id, itemId: id, kind: "preview" },
        }),
      ]);
      const failedWrite = writes.find(
        (result): result is PromiseRejectedResult => result.status === "rejected",
      );
      if (failedWrite) throw failedWrite.reason;

      const tilt = parsed.payload.options.tilt;
      const db = await getGalleryDb();
      const [row] = await db
        .insert(galleryItems)
        .values({
          id,
          ownerId: owner.id,
          createdAt,
          sourceType: parsed.payload.source.type,
          title: parsed.payload.title ?? defaultTitle(parsed.payload.source),
          assetKey,
          previewKey,
          previewWidth: parsed.payload.previewWidth,
          previewHeight: parsed.payload.previewHeight,
          baseTilt: typeof tilt === "number" && Number.isFinite(tilt) ? tilt : 0,
          layoutX: parsed.payload.layout.x,
          layoutY: parsed.payload.layout.y,
          layoutWidth: parsed.payload.layout.width,
          layoutHeight: parsed.payload.layout.height,
          layoutRotation: parsed.payload.layout.rotation,
          layoutZIndex: parsed.payload.layout.zIndex,
        })
        .returning();

      return withGalleryOwnerCookie(
        jsonResponse({ item: rowToGalleryItem(row) }, { status: 201 }),
        request,
        owner,
      );
    } catch (error) {
      // allSettled waits for both writes, so cleanup cannot race a late R2 put.
      // Removing both keys is idempotent and also rolls back a D1 insert failure.
      await Promise.allSettled([bucket.delete(assetKey), bucket.delete(previewKey)]);
      throw error;
    }
  } catch (error) {
    return withGalleryOwnerCookie(galleryErrorResponse(error), request, owner);
  }
}
