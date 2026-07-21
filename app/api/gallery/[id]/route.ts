import { and, eq } from "drizzle-orm";
import { galleryItems } from "@/db/schema";
import {
  galleryErrorResponse,
  getGalleryDb,
  getGalleryBucket,
  jsonResponse,
  parseGalleryLayout,
  readJsonBody,
  resolveGalleryOwner,
  rowToGalleryItem,
  withGalleryOwnerCookie,
} from "@/lib/gallery-server";

export const dynamic = "force-dynamic";

const MAX_LAYOUT_BODY_BYTES = 32_000;

type RouteContext = { params: Promise<{ id: string }> };

function isRecord(value: unknown): value is Record<string, unknown> {
  return typeof value === "object" && value !== null && !Array.isArray(value);
}

export async function PATCH(request: Request, context: RouteContext) {
  const owner = resolveGalleryOwner(request);
  try {
    if (!request.headers.get("content-type")?.toLowerCase().includes("application/json")) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Expected an application/json request body." }, { status: 415 }),
        request,
        owner,
      );
    }
    const body = await readJsonBody(request, MAX_LAYOUT_BODY_BYTES);
    if (
      !isRecord(body) ||
      Object.keys(body).some((key) => key !== "layout")
    ) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Only gallery layout may be updated." }, { status: 400 }),
        request,
        owner,
      );
    }
    const layout = parseGalleryLayout(body.layout);
    if (!layout) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "The gallery layout is invalid." }, { status: 400 }),
        request,
        owner,
      );
    }
    const { id } = await context.params;
    const db = await getGalleryDb();
    const [row] = await db
      .update(galleryItems)
      .set({
        layoutX: layout.x,
        layoutY: layout.y,
        layoutWidth: layout.width,
        layoutHeight: layout.height,
        layoutRotation: layout.rotation,
        layoutZIndex: layout.zIndex,
      })
      .where(and(eq(galleryItems.id, id), eq(galleryItems.ownerId, owner.id)))
      .returning();
    if (!row) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Gallery item not found." }, { status: 404 }),
        request,
        owner,
      );
    }
    return withGalleryOwnerCookie(
      jsonResponse({ item: rowToGalleryItem(row) }),
      request,
      owner,
    );
  } catch (error) {
    return withGalleryOwnerCookie(galleryErrorResponse(error), request, owner);
  }
}

export async function DELETE(request: Request, context: RouteContext) {
  const owner = resolveGalleryOwner(request);
  try {
    const { id } = await context.params;
    const db = await getGalleryDb();
    const [row] = await db
      .select({ assetKey: galleryItems.assetKey, previewKey: galleryItems.previewKey })
      .from(galleryItems)
      .where(and(eq(galleryItems.id, id), eq(galleryItems.ownerId, owner.id)))
      .limit(1);
    if (row) {
      const bucket = await getGalleryBucket();
      const removals = await Promise.allSettled([
        bucket.delete(row.assetKey),
        bucket.delete(row.previewKey),
      ]);
      const failedRemoval = removals.find(
        (result): result is PromiseRejectedResult => result.status === "rejected",
      );
      if (failedRemoval) throw failedRemoval.reason;
      await db
        .delete(galleryItems)
        .where(and(eq(galleryItems.id, id), eq(galleryItems.ownerId, owner.id)));
    }
    return withGalleryOwnerCookie(
      new Response(null, {
        status: 204,
        headers: {
          "Cache-Control": "private, no-store",
          Vary: "Cookie",
        },
      }),
      request,
      owner,
    );
  } catch (error) {
    return withGalleryOwnerCookie(galleryErrorResponse(error), request, owner);
  }
}
