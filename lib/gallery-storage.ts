import type {
  CreateGalleryPayload,
  GalleryAsset,
  GalleryItem,
  GalleryLayout,
} from "./gallery-types";

const DATABASE_NAME = "sticker-forge-gallery";
const DATABASE_VERSION = 1;
const ITEM_STORE = "gallery-items";
const ASSET_STORE = "gallery-assets";
const PREVIEW_STORE = "gallery-previews";

type StoredGalleryAsset = GalleryAsset & { id: string };
type StoredGalleryPreview = { id: string; blob: Blob };

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
    request.onupgradeneeded = () => {
      const database = request.result;
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

export async function listGalleryItems(): Promise<GalleryItem[]> {
  const database = await openGalleryDatabase();
  const transaction = database.transaction(ITEM_STORE, "readonly");
  const done = transactionDone(transaction);
  const items = await requestResult(
    transaction.objectStore(ITEM_STORE).getAll() as IDBRequest<GalleryItem[]>,
  );
  await done;
  return items.sort(
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
