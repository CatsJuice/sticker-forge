import { and, eq } from "drizzle-orm";
import { galleryItems } from "@/db/schema";
import {
  galleryErrorResponse,
  getGalleryDb,
  getGalleryBucket,
  jsonResponse,
  resolveGalleryOwner,
  withGalleryOwnerCookie,
} from "@/lib/gallery-server";

export const dynamic = "force-dynamic";

type RouteContext = { params: Promise<{ id: string }> };

export async function GET(request: Request, context: RouteContext) {
  const owner = resolveGalleryOwner(request);
  try {
    const { id } = await context.params;
    const db = await getGalleryDb();
    const [row] = await db
      .select({ key: galleryItems.assetKey })
      .from(galleryItems)
      .where(and(eq(galleryItems.id, id), eq(galleryItems.ownerId, owner.id)))
      .limit(1);
    if (!row) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Gallery asset not found." }, { status: 404 }),
        request,
        owner,
      );
    }
    const bucket = await getGalleryBucket();
    const object = await bucket.get(row.key);
    if (!object) {
      return withGalleryOwnerCookie(
        jsonResponse({ error: "Gallery asset not found." }, { status: 404 }),
        request,
        owner,
      );
    }
    const headers = new Headers({
      "Cache-Control": "private, max-age=31536000, immutable",
      ETag: object.httpEtag,
      Vary: "Cookie",
      "X-Content-Type-Options": "nosniff",
    });
    object.writeHttpMetadata(headers);
    return withGalleryOwnerCookie(new Response(object.body, { headers }), request, owner);
  } catch (error) {
    return withGalleryOwnerCookie(galleryErrorResponse(error), request, owner);
  }
}
