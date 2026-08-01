const HEIC_EXTENSION = /\.(heic|heif)$/i;
const HEIC_MIME_TYPE = /^image\/hei[cf]$/i;

export function isHeicFile(file: File) {
  return HEIC_MIME_TYPE.test(file.type) || HEIC_EXTENSION.test(file.name);
}

export async function convertHeicToJpeg(): Promise<Blob> {
  throw new Error("HEIC images are unavailable in the XHS build.");
}
