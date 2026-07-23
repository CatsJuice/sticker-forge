"use client";

import {
  useEffect,
  useLayoutEffect,
  useRef,
  useState,
  type PointerEvent as ReactPointerEvent,
  type ReactNode,
  type RefObject,
} from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { IconDefinition } from "@fortawesome/fontawesome-svg-core";
import {
  faFolderOpen,
  faPenToSquare,
  faShareFromSquare,
  faSquarePlus,
  faTrashCan,
} from "@fortawesome/free-regular-svg-icons";
import {
  faCheck,
  faPlus,
} from "@fortawesome/free-solid-svg-icons";
import {
  createGalleryFolder,
  deleteGalleryFolder,
  exportGalleryFolders,
  importGalleryArchive,
  reorderGalleryFolders,
  updateGalleryFolderColor,
} from "@/lib/gallery-storage";
import {
  DEFAULT_GALLERY_FOLDER_ID,
  type GalleryFolderRecord,
  type GalleryItem,
} from "@/lib/gallery-types";
import type {
  GalleryEntryOrigin,
  GalleryFolderDropPreview,
} from "./GalleryCanvas";
import { GalleryFolder } from "./GalleryFolder";
import { useSpringValue } from "./gallery-spring";

type GalleryFolderDockProps = {
  folders: GalleryFolderRecord[];
  items: GalleryItem[];
  locale: "zh" | "en";
  activeFolderId: string;
  galleryOpen: boolean;
  loading: boolean;
  showActivePreviews: boolean;
  collapseActivePreviewsImmediately: boolean;
  receiving: boolean;
  receivingItemId?: string;
  dropPreview: GalleryFolderDropPreview | null;
  defaultFolderRef: RefObject<HTMLButtonElement | null>;
  flight?: ReactNode;
  onReceiveClosed: () => void;
  onFoldersChange: (folders: GalleryFolderRecord[]) => void;
  onItemsChange: (items: GalleryItem[]) => void;
  onFolderOpen: (
    folderId: string,
    origins: Record<string, GalleryEntryOrigin>,
  ) => void;
  onFolderDeleted: (folderId: string) => void;
};

const COPY = {
  zh: {
    add: "文件夹操作",
    edit: "编辑",
    create: "新建",
    share: "分享",
    import: "导入",
    cancel: "取消",
    confirm: "确认",
    confirmShare: "Share",
    deleteFolder: "删除",
    confirmDelete: "确认删除文件夹",
    color: "改颜色",
    select: "选择文件夹",
  },
  en: {
    add: "Folder actions",
    edit: "Edit",
    create: "New",
    share: "Share",
    import: "Import",
    cancel: "Cancel",
    confirm: "Confirm",
    confirmShare: "Share",
    deleteFolder: "Delete",
    confirmDelete: "Confirm folder deletion",
    color: "Color",
    select: "Select folder",
  },
} as const;

const ACTION_ICONS: Record<"edit" | "create" | "share" | "import", IconDefinition> = {
  edit: faPenToSquare,
  create: faSquarePlus,
  share: faShareFromSquare,
  import: faFolderOpen,
};

const DOCK_ACTION_STEP = 39;
const FOLDER_SORT_STEP = 80;
const FOLDER_DRAG_THRESHOLD = 5;
const FOLDER_MENU_SHADOW_GUTTER = 28;

type FolderSortDrag = {
  id: string;
  pointerId: number;
  sourceIndex: number;
  targetIndex: number;
  offset: number;
  settling: boolean;
};

type FolderPointerIntent = {
  id: string;
  pointerId: number;
  sourceIndex: number;
  startClientX: number;
  dragging: boolean;
  targetIndex: number;
};

function DockGooBlob({ delayIndex }: { delayIndex: number }) {
  const [revealed, setRevealed] = useState(false);
  const { value: entranceProgress } = useSpringValue(revealed ? 1 : 0, {
    initial: 0,
    mass: 0.62,
    stiffness: 520,
    damping: 24,
    precision: 0.001,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), delayIndex * 34);
    return () => window.clearTimeout(timer);
  }, [delayIndex]);

  const normalized = Math.min(1, Math.max(0, entranceProgress));
  const gooOpacity =
    normalized <= 0
      ? 0
      : normalized < 0.86
        ? Math.min(1, normalized * 8)
        : (1 - normalized) / 0.14;
  const travel = (delayIndex + 1) * DOCK_ACTION_STEP;

  return (
    <>
      <span
        className="gallery-folder-menu-goo-blob"
        style={{
          bottom: delayIndex * DOCK_ACTION_STEP,
          opacity: gooOpacity,
          transform: `translateY(${(1 - entranceProgress) * travel}px)`,
        }}
      />
      <span
        className="gallery-folder-menu-goo-blob gallery-folder-menu-goo-origin"
        style={{ opacity: gooOpacity }}
      />
    </>
  );
}

function DockAction({
  kind,
  label,
  delayIndex,
  onClick,
}: {
  kind: "edit" | "create" | "share" | "import";
  label: string;
  delayIndex: number;
  onClick: () => void;
}) {
  const [hovered, setHovered] = useState(false);
  const [revealed, setRevealed] = useState(false);
  const [expandedWidth, setExpandedWidth] = useState(32);
  const labelRef = useRef<HTMLSpanElement>(null);
  const { value: entranceProgress, settled: entranceSettled } = useSpringValue(revealed ? 1 : 0, {
    initial: 0,
    mass: 0.62,
    stiffness: 520,
    damping: 24,
    precision: 0.001,
  });
  const { value: hoverProgress } = useSpringValue(hovered ? 1 : 0, {
    initial: 0,
    mass: 0.7,
    stiffness: 310,
    damping: 24,
  });

  useEffect(() => {
    const timer = window.setTimeout(() => setRevealed(true), delayIndex * 34);
    return () => window.clearTimeout(timer);
  }, [delayIndex]);

  useLayoutEffect(() => {
    const element = labelRef.current;
    if (!element) return;
    const updateWidth = () => {
      // Icon column + measured label + a compact trailing inset.
      setExpandedWidth(Math.ceil(32 + element.scrollWidth + 14));
    };
    updateWidth();
    const observer = new ResizeObserver(updateWidth);
    observer.observe(element);
    return () => observer.disconnect();
  }, [label]);

  const normalizedEntrance = Math.min(1, Math.max(0, entranceProgress));
  const shadowProgress = Math.max(0, (normalizedEntrance - 0.72) / 0.28);
  const interactionReady =
    revealed && entranceSettled && entranceProgress >= 0.999;

  return (
    <button
      className="gallery-folder-dock-action"
      type="button"
      style={{
        width: 32 + hoverProgress * (expandedWidth - 32),
        bottom: delayIndex * DOCK_ACTION_STEP,
        opacity: entranceProgress,
        boxShadow: `0 6px 16px rgba(43, 40, 34, ${shadowProgress * 0.14})`,
        pointerEvents: interactionReady ? "auto" : "none",
        transform: `translateY(${(1 - entranceProgress) * (delayIndex + 1) * DOCK_ACTION_STEP}px) scale(${0.58 + entranceProgress * 0.42})`,
      }}
      onPointerEnter={() => {
        if (interactionReady) setHovered(true);
      }}
      onPointerLeave={() => setHovered(false)}
      onClick={onClick}
    >
      <span className="gallery-folder-dock-action-icon">
        <FontAwesomeIcon icon={ACTION_ICONS[kind]} />
      </span>
      <span
        ref={labelRef}
        className="gallery-folder-dock-action-label"
        style={{ opacity: hoverProgress }}
      >
        {label}
      </span>
    </button>
  );
}

function FolderSlotMotion({
  entering,
  exiting,
  sortingActive,
  sortOffset,
  dragging,
  dragOffset,
  settling,
  onSortSettled,
  onSettled,
  onExitSettled,
  children,
}: {
  entering: boolean;
  exiting: boolean;
  sortingActive: boolean;
  sortOffset: number;
  dragging: boolean;
  dragOffset: number;
  settling: boolean;
  onSortSettled: () => void;
  onSettled: () => void;
  onExitSettled: () => void;
  children: ReactNode;
}) {
  const { value: progress, settled } = useSpringValue(exiting ? 0 : 1, {
    initial: entering ? 0 : 1,
    mass: 0.74,
    stiffness: 285,
    damping: 21,
    precision: 0.001,
  });
  const { value: sortX, settled: sortSettled } = useSpringValue(
    dragging ? dragOffset : sortOffset,
    {
      initial: 0,
      mass: dragging ? 0.62 : 0.76,
      stiffness: dragging ? 560 : 390,
      damping: dragging ? 38 : 29,
      precision: 0.01,
    },
  );
  const { value: lift } = useSpringValue(dragging ? 1 : 0, {
    initial: 0,
    mass: 0.68,
    stiffness: 430,
    damping: 28,
  });
  // Committing the reordered array moves every affected keyed slot to its new
  // layout position. Stop applying the old drag transform in that same render;
  // otherwise layout movement and translateX stack for one frame and flash.
  const visibleSortX = sortingActive ? sortX : 0;

  useEffect(() => {
    if (entering && settled) onSettled();
  }, [entering, onSettled, settled]);

  useEffect(() => {
    if (exiting && settled) onExitSettled();
  }, [exiting, onExitSettled, settled]);

  useEffect(() => {
    if (dragging && settling && sortSettled) onSortSettled();
  }, [dragging, onSortSettled, settling, sortSettled]);

  return (
    <div
      className="gallery-folder-slot-motion"
      data-dragging={dragging}
      style={{ width: 68 * progress }}
    >
      <div
        className="gallery-folder-slot-motion-inner"
        style={{
          opacity: Math.min(1, progress * 1.6),
          zIndex: dragging ? 90 : 1,
          filter: `drop-shadow(0 ${lift * 7}px ${lift * 9}px rgba(31, 41, 55, ${lift * 0.18}))`,
          transform: `translate3d(${visibleSortX}px, ${-lift * 5}px, 0) scale(${progress * (1 + lift * 0.055)})`,
        }}
      >
        {children}
      </div>
    </div>
  );
}

function FolderEditMenu({
  color,
  colorLabel,
  deleteLabel,
  confirmLabel,
  cancelLabel,
  onColorChange,
  onDelete,
}: {
  color: string;
  colorLabel: string;
  deleteLabel: string;
  confirmLabel: string;
  cancelLabel: string;
  onColorChange: (color: string) => void;
  onDelete: () => void;
}) {
  const [deleteArmed, setDeleteArmed] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { value: openProgress } = useSpringValue(1, {
    initial: 0,
    mass: 0.68,
    stiffness: 390,
    damping: 25,
  });
  const { value: deleteProgress } = useSpringValue(deleteArmed ? 1 : 0, {
    initial: 0,
    mass: 0.66,
    stiffness: 430,
    damping: 27,
  });

  useLayoutEffect(() => {
    const menu = menuRef.current;
    const scroll = menu?.closest<HTMLElement>(".gallery-folder-scroll");
    const slot = menu?.closest<HTMLElement>(".gallery-folder-slot");
    if (!menu || !scroll || !slot) return;
    const updateShift = () => {
      const scrollRect = scroll.getBoundingClientRect();
      const slotRect = slot.getBoundingClientRect();
      const menuWidth = menu.offsetWidth;
      const safeLeft = scrollRect.left + FOLDER_MENU_SHADOW_GUTTER;
      const safeRight = scrollRect.right - FOLDER_MENU_SHADOW_GUTTER;
      const naturalLeft = slotRect.left + slotRect.width / 2 - menuWidth / 2;
      const naturalRight = naturalLeft + menuWidth;
      const shift =
        naturalLeft < safeLeft
          ? safeLeft - naturalLeft
          : naturalRight > safeRight
            ? safeRight - naturalRight
            : 0;
      menu.style.setProperty("--gallery-folder-edit-menu-shift", `${shift}px`);
    };
    updateShift();
    scroll.addEventListener("scroll", updateShift, { passive: true });
    window.addEventListener("resize", updateShift);
    return () => {
      scroll.removeEventListener("scroll", updateShift);
      window.removeEventListener("resize", updateShift);
    };
  }, []);

  return (
    <div
      ref={menuRef}
      className="gallery-folder-edit-menu"
      style={{
        opacity: Math.min(1, openProgress * 1.35),
        transform: `translateX(calc(-50% + var(--gallery-folder-edit-menu-shift, 0px))) translateY(${(1 - openProgress) * 10}px) scale(${0.9 + openProgress * 0.1})`,
      }}
      onClick={(event) => event.stopPropagation()}
    >
      <label className="gallery-folder-edit-menu-color">
        <span className="gallery-folder-edit-menu-swatch" style={{ background: color }} />
        <span>{colorLabel}</span>
        <input
          type="color"
          value={color}
          aria-label={colorLabel}
          onChange={(event) => onColorChange(event.target.value)}
        />
      </label>
      <div className="gallery-folder-edit-delete-viewport">
        <button
          className="gallery-folder-edit-menu-delete"
          type="button"
          style={{ transform: `translateX(${-deleteProgress * 110}%)` }}
          onClick={() => setDeleteArmed(true)}
        >
          <FontAwesomeIcon icon={faTrashCan} />
          <span>{deleteLabel}</span>
        </button>
        <div
          className="gallery-folder-edit-menu-confirm"
          style={{ transform: `translateX(${(1 - deleteProgress) * 110}%)` }}
        >
          <button type="button" onClick={onDelete}>{confirmLabel}</button>
          <button type="button" onClick={() => setDeleteArmed(false)}>{cancelLabel}</button>
        </div>
      </div>
    </div>
  );
}

export function GalleryFolderDock({
  folders,
  items,
  locale,
  activeFolderId,
  galleryOpen,
  loading,
  showActivePreviews,
  collapseActivePreviewsImmediately,
  receiving,
  receivingItemId,
  dropPreview,
  defaultFolderRef,
  flight,
  onReceiveClosed,
  onFoldersChange,
  onItemsChange,
  onFolderOpen,
  onFolderDeleted,
}: GalleryFolderDockProps) {
  const t = COPY[locale];
  const [menuOpen, setMenuOpen] = useState(false);
  const [mode, setMode] = useState<"edit" | "share" | null>(null);
  const [editFolderId, setEditFolderId] = useState<string | null>(null);
  const [shareSelection, setShareSelection] = useState<Set<string>>(() => new Set());
  const [folderSortDrag, setFolderSortDrag] =
    useState<FolderSortDrag | null>(null);
  const [enteringFolderIds, setEnteringFolderIds] = useState<Set<string>>(
    () => new Set(),
  );
  const [exitingFolderIds, setExitingFolderIds] = useState<Set<string>>(
    () => new Set(),
  );
  const fileInputRef = useRef<HTMLInputElement>(null);
  const folderPointerRef = useRef<FolderPointerIntent | null>(null);
  const foldersRef = useRef(folders);
  const itemsRef = useRef(items);
  const deletingFolderIdsRef = useRef<Set<string>>(new Set());
  const { value: menuProgress } = useSpringValue(menuOpen ? 1 : 0, {
    initial: 0,
    mass: 0.72,
    stiffness: 270,
    damping: 22,
  });

  useEffect(() => {
    foldersRef.current = folders;
  }, [folders]);

  useEffect(() => {
    itemsRef.current = items;
  }, [items]);

  const closeMenu = () => {
    setMenuOpen(false);
    setMode(null);
    setEditFolderId(null);
    setShareSelection(new Set());
  };

  const createFolder = async () => {
    const folder = await createGalleryFolder();
    setEnteringFolderIds((current) => new Set(current).add(folder.id));
    onFoldersChange([...folders, folder]);
  };

  const setFolderColor = async (folderId: string, color: string) => {
    const updated = await updateGalleryFolderColor(folderId, color);
    onFoldersChange(folders.map((folder) => (folder.id === folderId ? updated : folder)));
  };

  const startFolderExit = (folderId: string) => {
    setEditFolderId(null);
    setExitingFolderIds((current) => new Set(current).add(folderId));
  };

  const finishFolderExit = async (folderId: string) => {
    if (deletingFolderIdsRef.current.has(folderId)) return;
    deletingFolderIdsRef.current.add(folderId);
    try {
      await deleteGalleryFolder(folderId);
      const nextFolders = foldersRef.current.filter(
        (folder) => folder.id !== folderId,
      );
      const nextItems = itemsRef.current.filter(
        (item) => item.folderId !== folderId,
      );
      foldersRef.current = nextFolders;
      itemsRef.current = nextItems;
      deletingFolderIdsRef.current.delete(folderId);
      setExitingFolderIds((current) => {
        const next = new Set(current);
        next.delete(folderId);
        return next;
      });
      onFoldersChange(nextFolders);
      onItemsChange(nextItems);
      onFolderDeleted(folderId);
    } catch (error) {
      deletingFolderIdsRef.current.delete(folderId);
      setExitingFolderIds((current) => {
        const next = new Set(current);
        next.delete(folderId);
        return next;
      });
      console.error("Could not delete gallery folder.", error);
    }
  };

  const commitFolderSort = () => {
    const drag = folderSortDrag;
    if (!drag?.settling) return;
    const currentFolders = foldersRef.current;
    const sourceIndex = currentFolders.findIndex((folder) => folder.id === drag.id);
    const targetIndex = Math.min(
      currentFolders.length - 1,
      Math.max(1, drag.targetIndex),
    );
    setFolderSortDrag(null);
    if (sourceIndex < 1 || sourceIndex === targetIndex) return;
    const next = [...currentFolders];
    const [moved] = next.splice(sourceIndex, 1);
    next.splice(targetIndex, 0, moved);
    const ordered = next.map((folder, index) => ({ ...folder, order: index }));
    foldersRef.current = ordered;
    onFoldersChange(ordered);
    void reorderGalleryFolders(ordered.map((folder) => folder.id));
  };

  const startFolderPointer = (
    folderId: string,
    sourceIndex: number,
    event: ReactPointerEvent<HTMLButtonElement>,
  ) => {
    if (event.button !== 0) return;
    event.preventDefault();
    event.stopPropagation();
    event.currentTarget.setPointerCapture(event.pointerId);
    folderPointerRef.current = {
      id: folderId,
      pointerId: event.pointerId,
      sourceIndex,
      startClientX: event.clientX,
      dragging: false,
      targetIndex: sourceIndex,
    };
  };

  const moveFolderPointer = (event: ReactPointerEvent<HTMLButtonElement>) => {
    const intent = folderPointerRef.current;
    if (!intent || intent.pointerId !== event.pointerId) return;
    const offset = event.clientX - intent.startClientX;
    if (!intent.dragging && Math.abs(offset) < FOLDER_DRAG_THRESHOLD) return;
    event.preventDefault();
    event.stopPropagation();
    if (!intent.dragging) {
      intent.dragging = true;
      setEditFolderId(null);
    }
    intent.targetIndex = Math.min(
      foldersRef.current.length - 1,
      Math.max(1, intent.sourceIndex + Math.round(offset / FOLDER_SORT_STEP)),
    );
    setFolderSortDrag({
      id: intent.id,
      pointerId: intent.pointerId,
      sourceIndex: intent.sourceIndex,
      targetIndex: intent.targetIndex,
      offset,
      settling: false,
    });
  };

  const finishFolderPointer = (
    event: ReactPointerEvent<HTMLButtonElement>,
    cancelled = false,
  ) => {
    const intent = folderPointerRef.current;
    if (!intent || intent.pointerId !== event.pointerId) return;
    folderPointerRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
    event.preventDefault();
    event.stopPropagation();
    if (cancelled) {
      setFolderSortDrag(null);
      return;
    }
    if (!intent.dragging) {
      setEditFolderId((current) => current === intent.id ? null : intent.id);
      return;
    }
    setFolderSortDrag({
      id: intent.id,
      pointerId: intent.pointerId,
      sourceIndex: intent.sourceIndex,
      targetIndex: intent.targetIndex,
      offset: (intent.targetIndex - intent.sourceIndex) * FOLDER_SORT_STEP,
      settling: true,
    });
  };

  const downloadSelection = async () => {
    if (shareSelection.size === 0) return;
    const blob = await exportGalleryFolders([...shareSelection]);
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = `sticker-forge-gallery-${new Date().toISOString().slice(0, 10)}.stickerforge`;
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 0);
    closeMenu();
  };

  const importArchive = async (file: File) => {
    const imported = await importGalleryArchive(file);
    onFoldersChange([...folders, ...imported.folders]);
    onItemsChange([...items, ...imported.items]);
  };

  return (
    <div className="gallery-folder-dock" data-mode={mode ?? "idle"} data-gallery-ui>
      <div
        className="gallery-folder-scroll"
        onWheel={(event) => {
          if (Math.abs(event.deltaY) <= Math.abs(event.deltaX)) return;
          event.currentTarget.scrollLeft += event.deltaY;
          event.preventDefault();
        }}
      >
        <div className="gallery-folder-list">
          {folders.map((folder, folderIndex) => {
            const isDefault = folder.id === DEFAULT_GALLERY_FOLDER_ID;
            const isCurrent = activeFolderId === folder.id;
            const isActive = galleryOpen && isCurrent;
            const folderItems = items.filter((item) => item.folderId === folder.id);
            const selectedForShare = shareSelection.has(folder.id);
            const isExiting = exitingFolderIds.has(folder.id);
            const isSorting = folderSortDrag?.id === folder.id;
            let sortOffset = 0;
            if (folderSortDrag && !isSorting) {
              if (
                folderSortDrag.sourceIndex < folderSortDrag.targetIndex &&
                folderIndex > folderSortDrag.sourceIndex &&
                folderIndex <= folderSortDrag.targetIndex
              ) {
                sortOffset = -FOLDER_SORT_STEP;
              } else if (
                folderSortDrag.targetIndex < folderSortDrag.sourceIndex &&
                folderIndex >= folderSortDrag.targetIndex &&
                folderIndex < folderSortDrag.sourceIndex
              ) {
                sortOffset = FOLDER_SORT_STEP;
              }
            }
            return (
              <FolderSlotMotion
                key={folder.id}
                entering={enteringFolderIds.has(folder.id)}
                exiting={isExiting}
                sortingActive={folderSortDrag !== null}
                sortOffset={sortOffset}
                dragging={isSorting}
                dragOffset={isSorting ? folderSortDrag.offset : 0}
                settling={Boolean(isSorting && folderSortDrag.settling)}
                onSortSettled={commitFolderSort}
                onExitSettled={() => void finishFolderExit(folder.id)}
                onSettled={() => {
                  setEnteringFolderIds((current) => {
                    if (!current.has(folder.id)) return current;
                    const next = new Set(current);
                    next.delete(folder.id);
                    return next;
                  });
                }}
              >
                <div
                  className="gallery-folder-slot"
                data-active={isActive}
                data-default={isDefault}
                data-selected={selectedForShare}
                data-edit-menu-open={editFolderId === folder.id}
                data-sorting={isSorting}
                >
                <GalleryFolder
                  ref={isDefault ? defaultFolderRef : undefined}
                  items={folderItems}
                  locale={locale}
                  loading={loading}
                  interactionDisabled={mode !== null}
                  folderId={folder.id}
                  color={folder.color}
                  dropOpen={dropPreview?.folderId === folder.id}
                  dropPreview={dropPreview?.folderId === folder.id ? dropPreview : null}
                  variant={isActive && mode === null ? "exit" : "launcher"}
                  showPreviews={!galleryOpen || !isActive || showActivePreviews}
                  collapsePreviewsImmediately={
                    collapseActivePreviewsImmediately && isCurrent
                  }
                  receiving={isDefault && receiving}
                  receivingItemId={isDefault ? receivingItemId : undefined}
                  flight={isDefault ? flight : undefined}
                  onReceiveClosed={isDefault ? onReceiveClosed : undefined}
                  onOpen={(origins) => onFolderOpen(folder.id, origins)}
                />

                {mode === "share" ? (
                  <button
                    className="gallery-folder-selection-hit"
                    type="button"
                    aria-label={`${t.select}: ${folder.title}`}
                    aria-pressed={selectedForShare}
                    onClick={() => {
                      setShareSelection((current) => {
                        const next = new Set(current);
                        if (next.has(folder.id)) next.delete(folder.id);
                        else next.add(folder.id);
                        return next;
                      });
                    }}
                  >
                    <span>{selectedForShare ? <FontAwesomeIcon icon={faCheck} /> : null}</span>
                  </button>
                ) : null}

                {mode === "edit" && !isDefault && !isExiting ? (
                  <>
                    <button
                      className="gallery-folder-edit-hit"
                      type="button"
                      aria-label={`${t.edit}: ${folder.title}`}
                      aria-expanded={editFolderId === folder.id}
                      onPointerDown={(event) => {
                        startFolderPointer(folder.id, folderIndex, event);
                      }}
                      onPointerMove={moveFolderPointer}
                      onPointerUp={finishFolderPointer}
                      onPointerCancel={(event) => finishFolderPointer(event, true)}
                      onClick={(event) => {
                        if (event.detail !== 0) return;
                        setEditFolderId((current) => current === folder.id ? null : folder.id);
                      }}
                    />
                    {editFolderId === folder.id ? (
                      <FolderEditMenu
                        color={folder.color}
                        colorLabel={t.color}
                        deleteLabel={t.deleteFolder}
                        confirmLabel={t.confirm}
                        cancelLabel={t.cancel}
                        onColorChange={(color) => void setFolderColor(folder.id, color)}
                        onDelete={() => startFolderExit(folder.id)}
                      />
                    ) : null}
                  </>
                ) : null}
                </div>
              </FolderSlotMotion>
            );
          })}
        </div>
      </div>

      <div className="gallery-folder-menu">
        {menuOpen && mode === null ? (
          <div className="gallery-folder-menu-actions">
            <svg className="gallery-folder-menu-goo-defs" aria-hidden="true">
              <defs>
                <filter id="gallery-folder-menu-goo" x="-100%" y="-100%" width="300%" height="300%">
                  <feGaussianBlur in="SourceGraphic" stdDeviation="5" result="blur" />
                  <feColorMatrix
                    in="blur"
                    mode="matrix"
                    values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 19 -8"
                    result="goo"
                  />
                </filter>
              </defs>
            </svg>
            <div className="gallery-folder-menu-goo-layer" aria-hidden="true">
              {[0, 1, 2, 3].map((delayIndex) => (
                <DockGooBlob key={delayIndex} delayIndex={delayIndex} />
              ))}
            </div>
            <DockAction kind="edit" label={t.edit} delayIndex={3} onClick={() => setMode("edit")} />
            <DockAction kind="create" label={t.create} delayIndex={2} onClick={() => void createFolder()} />
            <DockAction kind="share" label={t.share} delayIndex={1} onClick={() => setMode("share")} />
            <DockAction kind="import" label={t.import} delayIndex={0} onClick={() => fileInputRef.current?.click()} />
          </div>
        ) : null}

        {mode === "share" ? (
          <div className="gallery-folder-share-actions">
            <button type="button" disabled={shareSelection.size === 0} onClick={() => void downloadSelection()}>
              {t.confirmShare}
            </button>
          </div>
        ) : null}

        <button
          className="gallery-folder-add"
          type="button"
          aria-label={t.add}
          aria-expanded={menuOpen}
          onClick={() => {
            if (menuOpen) closeMenu();
            else setMenuOpen(true);
          }}
        >
          <span style={{ transform: `rotate(${menuProgress * 45}deg)` }}>
            <FontAwesomeIcon icon={faPlus} />
          </span>
        </button>
        <input
          ref={fileInputRef}
          className="sr-only"
          type="file"
          accept=".stickerforge,.json,application/json"
          onChange={(event) => {
            const file = event.target.files?.[0];
            if (file) void importArchive(file);
            event.currentTarget.value = "";
          }}
        />
      </div>
    </div>
  );
}
