import type {
  CreateGalleryPayload,
  GalleryAsset,
  GalleryFolderRecord,
  GalleryItem,
  GalleryLayout,
} from "./gallery-types";
import {
  DEFAULT_GALLERY_FOLDER_COLOR,
  DEFAULT_GALLERY_FOLDER_ID,
  DEFAULT_GALLERY_FOLDER_TITLE,
  EVOLUTION_GALLERY_FOLDER_COLOR,
  EVOLUTION_GALLERY_FOLDER_ID,
} from "./gallery-types";

const DATABASE_NAME = "sticker-forge-gallery";
const DATABASE_VERSION = 5;
const ITEM_STORE = "gallery-items";
const ASSET_STORE = "gallery-assets";
const PREVIEW_STORE = "gallery-previews";
const FOLDER_STORE = "gallery-folders";

type StoredGalleryAsset = GalleryAsset & { id: string };
type StoredGalleryPreview = { id: string; blob: Blob };

type GalleryArchive = {
  format: "sticker-forge-gallery";
  version: 1;
  exportedAt: number;
  folders: Array<{
    folder: GalleryFolderRecord;
    items: Array<{
      item: GalleryItem;
      asset: GalleryAsset;
      previewDataUrl: string;
    }>;
  }>;
};

let databasePromise: Promise<IDBDatabase> | null = null;
const previewUrlCache = new Map<string, string>();
const previewLoadCache = new Map<string, Promise<string>>();

function openGalleryDatabase(): Promise<IDBDatabase> {
  if (typeof indexedDB === "undefined") {
    return Promise.reject(new Error("IndexedDB is unavailable in this browser."));
  }
  if (databasePromise) return databasePromise;

  databasePromise = new Promise((resolve, reject) => {
    const request = indexedDB.open(DATABASE_NAME, DATABASE_VERSION);
    request.onupgradeneeded = (event) => {
      const database = request.result;
      const transaction = request.transaction;
      if (!database.objectStoreNames.contains(ITEM_STORE)) {
        const items = database.createObjectStore(ITEM_STORE, { keyPath: "id" });
        items.createIndex("createdAt", "createdAt");
      }
      if (!database.objectStoreNames.contains(ASSET_STORE)) {
        database.createObjectStore(ASSET_STORE, { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains(PREVIEW_STORE)) {
        database.createObjectStore(PREVIEW_STORE, { keyPath: "id" });
      }
      if (!database.objectStoreNames.contains(FOLDER_STORE)) {
        const folders = database.createObjectStore(FOLDER_STORE, { keyPath: "id" });
        folders.createIndex("order", "order");
        folders.put({
          id: DEFAULT_GALLERY_FOLDER_ID,
          title: DEFAULT_GALLERY_FOLDER_TITLE,
          color: DEFAULT_GALLERY_FOLDER_COLOR,
          createdAt: 0,
          order: 0,
          isDefault: true,
        } satisfies GalleryFolderRecord);
      }
      if ((event as IDBVersionChangeEvent).oldVersion < 2 && transaction) {
        const itemStore = transaction.objectStore(ITEM_STORE);
        const cursorRequest = itemStore.openCursor();
        cursorRequest.onsuccess = () => {
          const cursor = cursorRequest.result;
          if (!cursor) return;
          const item = cursor.value as GalleryItem;
          if (!item.folderId) {
            cursor.update({ ...item, folderId: DEFAULT_GALLERY_FOLDER_ID });
          }
          cursor.continue();
        };
      }
      if ((event as IDBVersionChangeEvent).oldVersion < 3 && transaction) {
        transaction.objectStore(FOLDER_STORE).put(evolutionFolder());
      }
      if ((event as IDBVersionChangeEvent).oldVersion < 4 && transaction) {
        const folderStore = transaction.objectStore(FOLDER_STORE);
        const evolutionRequest = folderStore.get(EVOLUTION_GALLERY_FOLDER_ID);
        evolutionRequest.onsuccess = () => {
          const folder = evolutionRequest.result as
            | GalleryFolderRecord
            | undefined;
          if (folder) {
            folderStore.put({
              ...folder,
              color: EVOLUTION_GALLERY_FOLDER_COLOR,
            });
          }
        };
      }
      if ((event as IDBVersionChangeEvent).oldVersion < 5 && transaction) {
        const folderStore = transaction.objectStore(FOLDER_STORE);
        const defaultRequest = folderStore.get(DEFAULT_GALLERY_FOLDER_ID);
        defaultRequest.onsuccess = () => {
          const folder = defaultRequest.result as
            | GalleryFolderRecord
            | undefined;
          if (folder) {
            folderStore.put({
              ...folder,
              title: DEFAULT_GALLERY_FOLDER_TITLE,
              isDefault: true,
            });
          }
        };
      }
    };
    request.onerror = () => {
      databasePromise = null;
      reject(request.error ?? new Error("Could not open the local gallery."));
    };
    request.onblocked = () => {
      databasePromise = null;
      reject(new Error("The local gallery is open in an older tab."));
    };
    request.onsuccess = () => {
      const database = request.result;
      database.onversionchange = () => {
        database.close();
        databasePromise = null;
      };
      resolve(database);
    };
  });
  return databasePromise;
}

function requestResult<T>(request: IDBRequest<T>): Promise<T> {
  return new Promise((resolve, reject) => {
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error("IndexedDB request failed."));
  });
}

function transactionDone(transaction: IDBTransaction): Promise<void> {
  return new Promise((resolve, reject) => {
    transaction.oncomplete = () => resolve();
    transaction.onabort = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction was aborted."));
    transaction.onerror = () =>
      reject(transaction.error ?? new Error("IndexedDB transaction failed."));
  });
}

function previewDataUrlToBlob(dataUrl: string): Blob {
  const match = /^data:([^;,]+);base64,([a-z0-9+/=]+)$/i.exec(dataUrl);
  if (!match) throw new Error("Gallery preview data is invalid.");
  const decoded = atob(match[2]);
  const bytes = new Uint8Array(decoded.length);
  for (let index = 0; index < decoded.length; index += 1) {
    bytes[index] = decoded.charCodeAt(index);
  }
  return new Blob([bytes], { type: match[1] });
}

function blobToDataUrl(blob: Blob): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onerror = () => reject(reader.error ?? new Error("Could not read preview."));
    reader.onload = () => resolve(String(reader.result));
    reader.readAsDataURL(blob);
  });
}

function defaultFolder(): GalleryFolderRecord {
  return {
    id: DEFAULT_GALLERY_FOLDER_ID,
    title: DEFAULT_GALLERY_FOLDER_TITLE,
    color: DEFAULT_GALLERY_FOLDER_COLOR,
    createdAt: 0,
    order: 0,
    isDefault: true,
  };
}

function evolutionFolder(): GalleryFolderRecord {
  return {
    id: EVOLUTION_GALLERY_FOLDER_ID,
    title: "Evolution",
    color: EVOLUTION_GALLERY_FOLDER_COLOR,
    createdAt: 1,
    order: 1,
    isDefault: false,
  };
}

export async function listGalleryFolders(): Promise<GalleryFolderRecord[]> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(FOLDER_STORE, "readwrite");
  const done = transactionDone(transaction);
  const store = transaction.objectStore(FOLDER_STORE);
  const folders = await requestResult(
    store.getAll() as IDBRequest<GalleryFolderRecord[]>,
  );
  if (!folders.some((folder) => folder.id === DEFAULT_GALLERY_FOLDER_ID)) {
    const fallback = defaultFolder();
    store.put(fallback);
    folders.push(fallback);
  } else {
    const defaultIndex = folders.findIndex(
      (folder) => folder.id === DEFAULT_GALLERY_FOLDER_ID,
    );
    const current = folders[defaultIndex];
    if (
      current.title !== DEFAULT_GALLERY_FOLDER_TITLE ||
      !current.isDefault
    ) {
      const normalized = {
        ...current,
        title: DEFAULT_GALLERY_FOLDER_TITLE,
        isDefault: true,
      };
      store.put(normalized);
      folders[defaultIndex] = normalized;
    }
  }
  await done;
  return folders.sort((left, right) => left.order - right.order || left.createdAt - right.createdAt);
}

export async function createGalleryFolder(
  title = "Untitled",
  color = "#7f8cff",
): Promise<GalleryFolderRecord> {
  const folders = await listGalleryFolders();
  const folder: GalleryFolderRecord = {
    id: crypto.randomUUID(),
    title: title.trim().slice(0, 80) || "Untitled",
    color,
    createdAt: Date.now(),
    order: Math.max(0, ...folders.map((item) => item.order)) + 1,
    isDefault: false,
  };
  const database = await openGalleryDatabase();
  const transaction = database.transaction(FOLDER_STORE, "readwrite");
  const done = transactionDone(transaction);
  transaction.objectStore(FOLDER_STORE).add(folder);
  await done;
  return folder;
}

export async function updateGalleryFolderColor(
  id: string,
  color: string,
): Promise<GalleryFolderRecord> {
  if (id === DEFAULT_GALLERY_FOLDER_ID) {
    throw new Error("The default gallery folder color is locked.");
  }
  const database = await openGalleryDatabase();
  const transaction = database.transaction(FOLDER_STORE, "readwrite");
  const done = transactionDone(transaction);
  const store = transaction.objectStore(FOLDER_STORE);
  const folder = await requestResult(
    store.get(id) as IDBRequest<GalleryFolderRecord | undefined>,
  );
  if (!folder) throw new Error("Gallery folder not found.");
  const updated = { ...folder, color };
  store.put(updated);
  await done;
  return updated;
}

export async function updateGalleryFolderTitle(
  id: string,
  title: string,
): Promise<GalleryFolderRecord> {
  if (id === DEFAULT_GALLERY_FOLDER_ID) {
    throw new Error("The default gallery folder title is locked.");
  }
  const database = await openGalleryDatabase();
  const transaction = database.transaction(FOLDER_STORE, "readwrite");
  const done = transactionDone(transaction);
  const store = transaction.objectStore(FOLDER_STORE);
  const folder = await requestResult(
    store.get(id) as IDBRequest<GalleryFolderRecord | undefined>,
  );
  if (!folder) throw new Error("Gallery folder not found.");
  const updated = {
    ...folder,
    title: title.trim().slice(0, 80) || "Untitled",
  };
  store.put(updated);
  await done;
  return updated;
}

export async function reorderGalleryFolders(ids: string[]): Promise<void> {
  if (ids[0] !== DEFAULT_GALLERY_FOLDER_ID) {
    throw new Error("The default gallery folder must remain first.");
  }
  const database = await openGalleryDatabase();
  const transaction = database.transaction(FOLDER_STORE, "readwrite");
  const done = transactionDone(transaction);
  const store = transaction.objectStore(FOLDER_STORE);
  const folders = await requestResult(
    store.getAll() as IDBRequest<GalleryFolderRecord[]>,
  );
  const positions = new Map(ids.map((id, index) => [id, index]));
  for (const folder of folders) {
    store.put({ ...folder, order: positions.get(folder.id) ?? folder.order });
  }
  await done;
}

export async function deleteGalleryFolder(id: string): Promise<void> {
  if (id === DEFAULT_GALLERY_FOLDER_ID) {
    throw new Error("The default gallery folder cannot be deleted.");
  }
  const database = await openGalleryDatabase();
  const transaction = database.transaction(
    [FOLDER_STORE, ITEM_STORE, ASSET_STORE, PREVIEW_STORE],
    "readwrite",
  );
  const done = transactionDone(transaction);
  const itemStore = transaction.objectStore(ITEM_STORE);
  const items = await requestResult(itemStore.getAll() as IDBRequest<GalleryItem[]>);
  for (const item of items) {
    if ((item.folderId || DEFAULT_GALLERY_FOLDER_ID) !== id) continue;
    itemStore.delete(item.id);
    transaction.objectStore(ASSET_STORE).delete(item.id);
    transaction.objectStore(PREVIEW_STORE).delete(item.id);
    const previewUrl = previewUrlCache.get(item.id);
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    previewUrlCache.delete(item.id);
    previewLoadCache.delete(item.id);
  }
  transaction.objectStore(FOLDER_STORE).delete(id);
  await done;
}

export async function listGalleryItems(): Promise<GalleryItem[]> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(ITEM_STORE, "readonly");
  const done = transactionDone(transaction);
  const items = await requestResult(
    transaction.objectStore(ITEM_STORE).getAll() as IDBRequest<GalleryItem[]>,
  );
  await done;
  return items.map((item) => ({
    ...item,
    folderId: item.folderId || DEFAULT_GALLERY_FOLDER_ID,
  })).sort(
    (left, right) => right.createdAt - left.createdAt || right.id.localeCompare(left.id),
  );
}

export async function createGalleryItem(
  payload: CreateGalleryPayload,
): Promise<GalleryItem> {
  const database = await openGalleryDatabase();
  const id = crypto.randomUUID();
  const createdAt = Date.now();
  const item: GalleryItem = {
    id,
    folderId: payload.folderId || DEFAULT_GALLERY_FOLDER_ID,
    createdAt,
    sourceType: payload.source.type,
    title: payload.title?.trim().slice(0, 120) || "Sticker",
    previewWidth: payload.previewWidth,
    previewHeight: payload.previewHeight,
    baseTilt:
      typeof payload.options.tilt === "number" && Number.isFinite(payload.options.tilt)
        ? payload.options.tilt
        : 0,
    layout: payload.layout,
  };
  const asset: StoredGalleryAsset = {
    id,
    source: payload.source,
    options: payload.options,
  };
  const preview: StoredGalleryPreview = {
    id,
    blob: previewDataUrlToBlob(payload.previewDataUrl),
  };
  const transaction = database.transaction(
    [ITEM_STORE, ASSET_STORE, PREVIEW_STORE],
    "readwrite",
  );
  const done = transactionDone(transaction);
  transaction.objectStore(ITEM_STORE).add(item);
  transaction.objectStore(ASSET_STORE).add(asset);
  transaction.objectStore(PREVIEW_STORE).add(preview);
  await done;
  return item;
}

export async function getGalleryAsset(id: string): Promise<GalleryAsset> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(ASSET_STORE, "readonly");
  const done = transactionDone(transaction);
  const stored = await requestResult(
    transaction.objectStore(ASSET_STORE).get(id) as IDBRequest<
      StoredGalleryAsset | undefined
    >,
  );
  await done;
  if (!stored) throw new Error("Gallery asset not found.");
  return { source: stored.source, options: stored.options };
}

export async function getGalleryPreviewUrl(id: string): Promise<string> {
  const cached = previewUrlCache.get(id);
  if (cached) return cached;
  const pending = previewLoadCache.get(id);
  if (pending) return pending;

  const load = (async () => {
    const database = await openGalleryDatabase();
    const transaction = database.transaction(PREVIEW_STORE, "readonly");
    const done = transactionDone(transaction);
    const stored = await requestResult(
      transaction.objectStore(PREVIEW_STORE).get(id) as IDBRequest<
        StoredGalleryPreview | undefined
      >,
    );
    await done;
    if (!stored) throw new Error("Gallery preview not found.");
    const url = URL.createObjectURL(stored.blob);
    previewUrlCache.set(id, url);
    return url;
  })();
  previewLoadCache.set(id, load);
  try {
    return await load;
  } finally {
    previewLoadCache.delete(id);
  }
}

export async function updateGalleryLayout(
  id: string,
  layout: GalleryLayout,
): Promise<GalleryItem> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(ITEM_STORE, "readwrite");
  const done = transactionDone(transaction);
  const store = transaction.objectStore(ITEM_STORE);
  const item = await requestResult(
    store.get(id) as IDBRequest<GalleryItem | undefined>,
  );
  if (!item) {
    transaction.abort();
    await done.catch(() => undefined);
    throw new Error("Gallery item not found.");
  }
  const updated = { ...item, layout };
  store.put(updated);
  await done;
  return updated;
}

export async function moveGalleryItemToFolder(
  id: string,
  folderId: string,
): Promise<GalleryItem> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction([ITEM_STORE, FOLDER_STORE], "readwrite");
  const done = transactionDone(transaction);
  const folder = await requestResult(
    transaction.objectStore(FOLDER_STORE).get(folderId) as IDBRequest<
      GalleryFolderRecord | undefined
    >,
  );
  const store = transaction.objectStore(ITEM_STORE);
  const item = await requestResult(store.get(id) as IDBRequest<GalleryItem | undefined>);
  if (!folder || !item) {
    transaction.abort();
    await done.catch(() => undefined);
    throw new Error("Gallery item or folder not found.");
  }
  const updated = { ...item, folderId };
  store.put(updated);
  await done;
  return updated;
}

export async function exportGalleryFolders(folderIds: string[]): Promise<Blob> {
  const selected = new Set(folderIds);
  const database = await openGalleryDatabase();
  const transaction = database.transaction(
    [FOLDER_STORE, ITEM_STORE, ASSET_STORE, PREVIEW_STORE],
    "readonly",
  );
  const done = transactionDone(transaction);
  const folders = await requestResult(
    transaction.objectStore(FOLDER_STORE).getAll() as IDBRequest<GalleryFolderRecord[]>,
  );
  const items = await requestResult(
    transaction.objectStore(ITEM_STORE).getAll() as IDBRequest<GalleryItem[]>,
  );
  const assets = await requestResult(
    transaction.objectStore(ASSET_STORE).getAll() as IDBRequest<StoredGalleryAsset[]>,
  );
  const previews = await requestResult(
    transaction.objectStore(PREVIEW_STORE).getAll() as IDBRequest<StoredGalleryPreview[]>,
  );
  await done;
  const assetMap = new Map(assets.map(({ id, ...asset }) => [id, asset]));
  const previewMap = new Map(previews.map((preview) => [preview.id, preview.blob]));
  const archiveFolders: GalleryArchive["folders"] = [];
  for (const folder of folders.filter((item) => selected.has(item.id))) {
    const archivedItems = [];
    for (const item of items.filter((candidate) => candidate.folderId === folder.id)) {
      const asset = assetMap.get(item.id);
      const preview = previewMap.get(item.id);
      if (!asset || !preview) continue;
      archivedItems.push({ item, asset, previewDataUrl: await blobToDataUrl(preview) });
    }
    archiveFolders.push({ folder, items: archivedItems });
  }
  const archive: GalleryArchive = {
    format: "sticker-forge-gallery",
    version: 1,
    exportedAt: Date.now(),
    folders: archiveFolders,
  };
  return new Blob([JSON.stringify(archive)], { type: "application/json" });
}

export async function importGalleryArchive(
  file: File,
): Promise<{ folders: GalleryFolderRecord[]; items: GalleryItem[] }> {
  const archive = JSON.parse(await file.text()) as Partial<GalleryArchive>;
  if (archive.format !== "sticker-forge-gallery" || archive.version !== 1 || !Array.isArray(archive.folders)) {
    throw new Error("This is not a Sticker Forge gallery archive.");
  }
  const existingFolders = await listGalleryFolders();
  let nextOrder = Math.max(0, ...existingFolders.map((folder) => folder.order)) + 1;
  const folders: GalleryFolderRecord[] = [];
  const items: GalleryItem[] = [];
  const database = await openGalleryDatabase();
  const transaction = database.transaction(
    [FOLDER_STORE, ITEM_STORE, ASSET_STORE, PREVIEW_STORE],
    "readwrite",
  );
  const done = transactionDone(transaction);
  for (const entry of archive.folders) {
    if (!entry?.folder || !Array.isArray(entry.items)) continue;
    const folderId = crypto.randomUUID();
    const folder: GalleryFolderRecord = {
      ...entry.folder,
      id: folderId,
      title: entry.folder.title?.trim().slice(0, 80) || "Imported",
      createdAt: Date.now(),
      order: nextOrder,
      isDefault: false,
    };
    nextOrder += 1;
    transaction.objectStore(FOLDER_STORE).add(folder);
    folders.push(folder);
    for (const entryItem of entry.items) {
      if (!entryItem?.item || !entryItem.asset || !entryItem.previewDataUrl) continue;
      const itemId = crypto.randomUUID();
      const item: GalleryItem = {
        ...entryItem.item,
        id: itemId,
        folderId,
        createdAt: Date.now(),
      };
      transaction.objectStore(ITEM_STORE).add(item);
      transaction.objectStore(ASSET_STORE).add({ id: itemId, ...entryItem.asset });
      transaction.objectStore(PREVIEW_STORE).add({
        id: itemId,
        blob: previewDataUrlToBlob(entryItem.previewDataUrl),
      });
      items.push(item);
    }
  }
  await done;
  return { folders, items };
}

export async function deleteGalleryItem(id: string): Promise<void> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(
    [ITEM_STORE, ASSET_STORE, PREVIEW_STORE],
    "readwrite",
  );
  const done = transactionDone(transaction);
  transaction.objectStore(ITEM_STORE).delete(id);
  transaction.objectStore(ASSET_STORE).delete(id);
  transaction.objectStore(PREVIEW_STORE).delete(id);
  await done;
  const previewUrl = previewUrlCache.get(id);
  if (previewUrl) URL.revokeObjectURL(previewUrl);
  previewUrlCache.delete(id);
  previewLoadCache.delete(id);
}
