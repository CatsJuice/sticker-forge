import {
  exportGalleryFolders,
  importGalleryArchive,
} from "./gallery-storage";

export async function downloadGallerySelection(folderIds: string[]) {
  const blob = await exportGalleryFolders(folderIds);
  const url = URL.createObjectURL(blob);
  const anchor = document.createElement("a");
  anchor.href = url;
  anchor.download =
    `sticker-forge-gallery-${new Date().toISOString().slice(0, 10)}.stickerforge`;
  anchor.click();
  window.setTimeout(() => URL.revokeObjectURL(url), 0);
}

export function importGallerySelection(file: File) {
  return importGalleryArchive(file);
}
