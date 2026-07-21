import { drizzle } from "drizzle-orm/d1";
import * as schema from "@/db/schema";
import type { GalleryItem, GalleryLayout } from "./gallery-types";
import type { galleryItems } from "@/db/schema";

const OWNER_COOKIE = "sticker_forge_gallery_owner";
const OWNER_COOKIE_MAX_AGE = 60 * 60 * 24 * 365 * 2;
const OWNER_ID_PATTERN = /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export type GalleryItemRow = typeof galleryItems.$inferSelect;

export interface GalleryOwner {
  id: string;
  isNew: boolean;
}

export class GalleryRequestTooLargeError extends Error {
  constructor() {
    super("Gallery request body is too large.");
    this.name = "GalleryRequestTooLargeError";
  }
}

function readCookie(cookieHeader: string | null, name: string): string | null {
  if (!cookieHeader) return null;
  for (const part of cookieHeader.split(";")) {
    const separator = part.indexOf("=");
    if (separator < 0 || part.slice(0, separator).trim() !== name) continue;
    try {
      return decodeURIComponent(part.slice(separator + 1).trim());
    } catch {
      return null;
    }
  }
  return null;
}

export function resolveGalleryOwner(request: Request): GalleryOwner {
  const stored = readCookie(request.headers.get("cookie"), OWNER_COOKIE);
  if (stored && OWNER_ID_PATTERN.test(stored)) {
    return { id: stored, isNew: false };
  }
  return { id: crypto.randomUUID(), isNew: true };
}

export function withGalleryOwnerCookie(
  response: Response,
  request: Request,
  owner: GalleryOwner,
): Response {
  if (!owner.isNew) return response;
  const headers = new Headers(response.headers);
  const secure = new URL(request.url).protocol === "https:" ? "; Secure" : "";
  headers.append(
    "Set-Cookie",
    `${OWNER_COOKIE}=${encodeURIComponent(owner.id)}; Path=/; Max-Age=${OWNER_COOKIE_MAX_AGE}; HttpOnly; SameSite=Lax${secure}`,
  );
  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers,
  });
}

export async function getGalleryBucket(): Promise<R2Bucket> {
  const { env } = await import("cloudflare:workers");
  if (!env.GALLERY_BUCKET) {
    throw new Error(
      "Cloudflare R2 binding `GALLERY_BUCKET` is unavailable. Set the `r2` field in .openai/hosting.json to `GALLERY_BUCKET`.",
    );
  }
  return env.GALLERY_BUCKET;
}

export async function getGalleryDb() {
  const { env } = await import("cloudflare:workers");
  if (!env.DB) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable. Set the `d1` field in .openai/hosting.json to `DB`.",
    );
  }
  return drizzle(env.DB, { schema });
}

export function galleryAssetKey(ownerId: string, itemId: string): string {
  return `gallery/${ownerId}/${itemId}/asset.json`;
}

export function galleryPreviewKey(
  ownerId: string,
  itemId: string,
  mimeType: string,
): string {
  const extension =
    mimeType === "image/png"
      ? "png"
      : mimeType === "image/jpeg"
        ? "jpg"
        : mimeType === "image/avif"
          ? "avif"
          : "webp";
  return `gallery/${ownerId}/${itemId}/preview.${extension}`;
}

export function rowToGalleryItem(row: GalleryItemRow): GalleryItem {
  const id = encodeURIComponent(row.id);
  return {
    id: row.id,
    createdAt: row.createdAt,
    sourceType: row.sourceType,
    title: row.title,
    previewUrl: `/api/gallery/${id}/preview`,
    assetUrl: `/api/gallery/${id}/asset`,
    previewWidth: row.previewWidth,
    previewHeight: row.previewHeight,
    baseTilt: row.baseTilt,
    layout: {
      x: row.layoutX,
      y: row.layoutY,
      width: row.layoutWidth,
      height: row.layoutHeight,
      rotation: row.layoutRotation,
      zIndex: row.layoutZIndex,
    },
  };
}

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

function isFiniteNumber(value: unknown): value is number {
  return typeof value === "number" && Number.isFinite(value);
}

export function parseGalleryLayout(value: unknown): GalleryLayout | null {
  if (!isRecord(value)) return null;
  const { x, y, width, height, rotation, zIndex } = value;
  if (
    !isFiniteNumber(x) ||
    !isFiniteNumber(y) ||
    !isFiniteNumber(width) ||
    !isFiniteNumber(height) ||
    !isFiniteNumber(rotation) ||
    !isFiniteNumber(zIndex) ||
    !Number.isInteger(zIndex)
  ) {
    return null;
  }
  if (
    Math.abs(x) > 10_000_000 ||
    Math.abs(y) > 10_000_000 ||
    width <= 0 ||
    height <= 0 ||
    width > 100_000 ||
    height > 100_000 ||
    Math.abs(rotation) > 1_000_000 ||
    Math.abs(zIndex) > 2_000_000_000
  ) {
    return null;
  }
  return { x, y, width, height, rotation, zIndex };
}

export function jsonResponse(
  value: unknown,
  init?: ResponseInit,
): Response {
  const headers = new Headers(init?.headers);
  if (!headers.has("Cache-Control")) {
    headers.set("Cache-Control", "private, no-store");
  }
  if (!headers.has("Vary")) headers.set("Vary", "Cookie");
  return Response.json(value, { ...init, headers });
}

export async function readJsonBody(
  request: Request,
  maxBytes: number,
): Promise<unknown> {
  const declaredLength = Number(request.headers.get("content-length"));
  if (Number.isFinite(declaredLength) && declaredLength > maxBytes) {
    throw new GalleryRequestTooLargeError();
  }

  if (!request.body) return JSON.parse("");
  const reader = request.body.getReader();
  const decoder = new TextDecoder();
  const chunks: string[] = [];
  let received = 0;
  try {
    while (true) {
      const { done, value } = await reader.read();
      if (done) break;
      received += value.byteLength;
      if (received > maxBytes) {
        await reader.cancel();
        throw new GalleryRequestTooLargeError();
      }
      chunks.push(decoder.decode(value, { stream: true }));
    }
    chunks.push(decoder.decode());
    return JSON.parse(chunks.join(""));
  } finally {
    reader.releaseLock();
  }
}

export function galleryErrorResponse(error: unknown): Response {
  const message = error instanceof Error ? error.message : "Unexpected error";
  const cause =
    error instanceof Error && error.cause instanceof Error
      ? error.cause.message
      : "";
  const combined = `${message}\n${cause}`;
  if (error instanceof SyntaxError) {
    return jsonResponse({ error: "The request body is not valid JSON." }, { status: 400 });
  }
  if (error instanceof GalleryRequestTooLargeError) {
    return jsonResponse({ error: "The request body is too large." }, { status: 413 });
  }
  const missingBinding =
    combined.includes("binding") || combined.includes("unavailable");
  const missingTable = combined.includes("no such table");
  if (missingBinding || missingTable) {
    console.error("Gallery storage configuration error", error);
    return jsonResponse({ error: "Gallery storage is not configured." }, { status: 503 });
  }
  console.error("Gallery API error", error);
  return jsonResponse({ error: "Gallery storage is temporarily unavailable." }, { status: 500 });
}
