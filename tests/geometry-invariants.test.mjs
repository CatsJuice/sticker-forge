import assert from "node:assert/strict";
import { readFile, stat } from "node:fs/promises";
import test from "node:test";

test("renders the gallery through one shared WebGL canvas", async () => {
  const [gallery, renderer] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.match(gallery, /className="gallery-shared-canvas"/);
  assert.doesNotMatch(gallery, /createSticker|InteractiveSticker|gallery-live-sticker/);
  assert.match(gallery, /className="gallery-background"/);
  assert.match(gallery, /"--gallery-presence": surfacePresence/);
  assert.match(renderer, /One WebGL renderer\/context for the whole infinite gallery canvas/);
  assert.equal((renderer.match(/new THREE\.WebGLRenderer\(/g) ?? []).length, 1);
  assert.match(renderer, /records = new Map<string, RenderRecord>/);
  assert.match(renderer, /new THREE\.CanvasTexture\(artwork\.canvas\)/);
  assert.match(renderer, /private showFlatSurface\(\)/);
  assert.match(renderer, /this\.flatMaterial = new THREE\.MeshBasicMaterial/);
  assert.match(renderer, /this\.showFlatSurface\(\)/);
});

test("keeps gallery entry and gestures on the shared canvas transform", async () => {
  const [gallery, renderer] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(gallery, /gallery-entry-ghost/);
  assert.match(gallery, /function GalleryTransitionMotion\(/);
  assert.match(gallery, /phase: "enter" \| "exit"/);
  assert.match(gallery, /rendererRef\.current\?\.setEntryTransform/);
  assert.match(gallery, /transientLayoutsRef\.current\.set\(id, layout\)/);
  assert.match(gallery, /transientLayoutsRef\.current\.has\(item\.id\)/);
  assert.match(renderer, /entryTransforms = new Map<string, GalleryScreenTransform>/);
  assert.match(renderer, /private applyEntryTransform\(/);
  assert.match(renderer, /clearEntryTransform\(id: string\)/);
  assert.match(gallery, /moved: false/);
  assert.match(gallery, /setSelectedId\(peelPointer\.itemId\)/);
  assert.match(renderer, /uPreserveFrontColor: \{ value: 1 \}/);
});

test("hit-tests gallery gestures against visible sticker pixels", async () => {
  const [gallery, renderer] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.match(renderer, /hitSurface\(local: THREE\.Vector2\)/);
  assert.match(renderer, /createAlphaHitMask\(image: CanvasImageSource\)/);
  assert.match(renderer, /record\.previewHitMask = createAlphaHitMask/);
  assert.match(renderer, /pickSticker\(clientX: number, clientY: number\)/);
  assert.match(renderer, /pickPeelTarget\(clientX: number, clientY: number\)/);
  assert.match(renderer, /const surface = this\.surfaceHit\(clientX, clientY, candidates\)/);
  assert.match(renderer, /const peelCandidates = \(surface \? \[surface\.record\] : candidates\)\.filter/);
  assert.match(gallery, /rendererRef\.current\?\.pickSticker\(clientX, clientY\) === id/);
  assert.match(gallery, /if \(!hitTestItem\(item\.id, event\.clientX, event\.clientY\)\) return/);
  assert.match(gallery, /if \(hitTestPeel\(item\.id, event\.clientX, event\.clientY\)\) return/);
  assert.match(gallery, /const hitId = rendererRef\.current\?\.pickSticker/);
});

test("only starts a peel from the exterior sticker contour", async () => {
  const [source, editor, gallery] = await Promise.all([
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.match(source, /createExteriorAlphaMask/);
  assert.match(source, /exteriorAlpha: createExteriorAlphaMask/);
  assert.match(editor, /const isOuterBoundary =/);
  assert.match(editor, /this\.sampleExterior\(candidateX - 1, candidateY\)/);
  assert.match(gallery, /const outerBoundary = this\.sampleExterior/);
  assert.doesNotMatch(editor, /const isBoundary =\s*alpha < 0\.9/);
  assert.doesNotMatch(gallery, /const boundary = alpha < 0\.9/);
});

test("scales the draggable edge band together with the sticker", async () => {
  const [editor, gallery] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.match(editor, /const unscaledDisplayedWidth =/);
  assert.match(editor, /this\.renderer\.domElement\.clientWidth/);
  assert.match(gallery, /hitEdge\(local: THREE\.Vector2, unscaledDisplayedWidth: number\)/);
  assert.match(
    gallery,
    /record\.item\.layout\.width \* 0\.78,\s*\);/,
  );
  assert.doesNotMatch(
    gallery,
    /record\.item\.layout\.width \* 0\.78 \* this\.view\.zoom/,
  );
});

test("temporarily renders the actively peeled gallery sticker above its siblings", async () => {
  const renderer = await readFile(
    new URL("../lib/gallery-renderer.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /const ACTIVE_PEEL_RENDER_ORDER = 1_000_000/);
  assert.match(renderer, /this\.setElevatedPeel\(result\.record\.item\.id\)/);
  assert.match(renderer, /needsElevatedLayer\(\)/);
  assert.match(
    renderer,
    /this\.elevatedPeelId === id[\s\S]*?!record\.sticker\.needsElevatedLayer\(\)[\s\S]*?this\.setElevatedPeel\(null\)/,
  );
  assert.match(
    renderer,
    /this\.elevatedPeelId === record\.item\.id[\s\S]*?ACTIVE_PEEL_RENDER_ORDER[\s\S]*?: layout\.zIndex/,
  );
});

test("reverses the gallery flight before unmounting the shared canvas", async () => {
  const [gallery, renderer, studio, styles] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(gallery, /phase="exit"/);
  assert.match(gallery, /exitSettledIds\.has\(item\.id\)/);
  assert.match(gallery, /!closing \|\| !presenceSettled \|\| closedRef\.current/);
  assert.match(renderer, /onPreviewIdsChange/);
  assert.match(gallery, /transitionIds\.has\(item\.id\)[\s\S]*?\? 1[\s\S]*?: presence/);
  assert.match(studio, /galleryOpen \? \([\s\S]*?<GalleryCanvas[\s\S]*?\) : null\}[\s\S]*?<GalleryFolder/);
  assert.match(styles, /--studio-canvas-background:/);
  assert.match(styles, /\.gallery-folder \{[^}]*z-index: 120;/s);
});

test("keeps repeated delete clicks on the inline Keep action", async () => {
  const [gallery, styles] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(gallery, /function GalleryDeleteControl\(/);
  assert.match(gallery, /useSpringValue\(armed \? 1 : 0/);
  assert.match(gallery, /const deleteLeft = 24 \+ progress \* 37/);
  assert.match(gallery, /"--gallery-control-counter-rotation": `\$\{-totalRotation\}deg`/);
  assert.match(gallery, /pointerEvents: armed \? "auto" : "none"/);
  assert.doesNotMatch(gallery, /translateY\(\$\{\(1 - progress\) \* 10\}px\)/);
  assert.match(gallery, /filter: `blur\(\$\{\(1 - labelProgress\) \* 7\}px\)`/);
  assert.match(styles, /\.gallery-delete-keep \{[^}]*right: -35px;[^}]*z-index: 1;/s);
  assert.match(styles, /\.gallery-delete-keep-hit \{[^}]*z-index: 4;[^}]*left: 4px;[^}]*top: 0;[^}]*cursor: pointer;/s);
  assert.match(styles, /\.gallery-delete-control \.gallery-delete-keep-hit \{[^}]*left: 4px;[^}]*top: 0;[^}]*transform: none;/s);
  assert.match(styles, /rotate\(var\(--gallery-control-counter-rotation\)\)/);
  assert.doesNotMatch(gallery, /gallery-confirm-backdrop|role="alertdialog"/);
  assert.doesNotMatch(styles, /\.gallery-confirm-dialog/);
});

test("tears a gallery sticker away before deleting its local record", async () => {
  const [gallery, renderer] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(renderer, /deleteParticle|new THREE\.Points/);
  assert.match(renderer, /tearAwayForDelete\(time: number\)/);
  assert.match(renderer, /Math\.floor\(Math\.random\(\) \* Math\.max\(pointCount, 1\)\)/);
  assert.match(renderer, /this\.springTargetDepth = this\.grabExtent/);
  assert.match(renderer, /this\.deletePermanentExit = true/);
  assert.match(renderer, /this\.uniforms\.uShadowDeleteOpacity\.value = 0/);
  assert.match(renderer, /async tearAwayForDelete\(id: string\)/);
  assert.match(gallery, /await rendererRef\.current\?\.tearAwayForDelete\(id\)/);
  assert.match(
    gallery,
    /await rendererRef\.current\?\.tearAwayForDelete\(id\);\s*await deleteGalleryItem\(id\)/,
  );
  assert.match(gallery, /rendererRef\.current\?\.restoreAfterDelete\(id\)/);
  assert.match(gallery, /selected && rendererReady && !editing && !deleting/);
});

test("moves an immutable gallery sticker into the editor through a Spring transition", async () => {
  const [gallery, studio, styles] = await Promise.all([
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(gallery, /aria-label="Edit sticker"/);
  assert.match(gallery, /aria-label=\{exportLabel\}/);
  assert.match(gallery, /function GalleryEditMotion\(/);
  assert.match(gallery, /useSpringVector\(/);
  assert.match(gallery, /width: currentItem\.layout\.width \* scale/);
  assert.match(gallery, /onEditComplete\(editTransition\.asset\)/);
  assert.match(gallery, /useSpringValue\(editHandoffReady \? 0 : 1/);
  assert.match(gallery, /editHandoffOpacity > 0\.002/);
  assert.match(gallery, /onEditHandoffComplete\(\)/);
  assert.match(studio, /function studioSettingsFrom\(/);
  assert.match(studio, /writeRichTextEditor\(richEditorRef\.current/);
  assert.match(studio, /await applySource\(source\)/);
  assert.match(studio, /data-gallery-editing=\{galleryEditing\}/);
  assert.match(studio, /data-gallery-editor-ready=\{galleryEditorReady\}/);
  assert.match(studio, /await new Promise<void>\(\(resolve\) => \{/);
  assert.match(studio, /setGalleryEditorReady\(true\)/);
  assert.match(studio, /onEditHandoffComplete=\{\(\) => \{/);
  assert.match(styles, /\.gallery-edit-button \{[^}]*right: 24px;/s);
  assert.match(styles, /\.gallery-export-button \{[^}]*left: -15\.5px;/s);
  assert.match(studio, /onExport=\{\(asset\) => \{/);
  assert.match(studio, /setExportSource\(asset\.source\)/);
  assert.match(studio, /setExportOptions\(asset\.options\)/);
  assert.match(styles, /\.sticker-host canvas \{[^}]*transition: opacity 110ms/s);
  assert.match(
    styles,
    /\.sticker-host\[data-gallery-editing="true"\]\[data-gallery-editor-ready="false"\] canvas \{[^}]*opacity: 0;/s,
  );
});

test("springs a saved sticker into the locked folder before replaying its entrance", async () => {
  const [flight, folder, studio, styles, rendererTypes] = await Promise.all([
    readFile(new URL("../app/GalleryAddFlight.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/GalleryFolder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
  ]);

  assert.match(flight, /useSpringValue\(1,/);
  assert.match(flight, /quadraticBezier\(/);
  assert.match(flight, /"lift" \| "flight" \| "settled"/);
  assert.match(flight, /mix\(liftWidth, target\.width, flight\)/);
  assert.match(flight, /mix\(startRotation - 4, targetRotation, flight\)/);
  assert.match(flight, /createPortal\(/);
  assert.match(flight, /className="gallery-add-flight gallery-add-flight-viewport"/);
  assert.match(flight, /className="gallery-add-flight gallery-add-flight-landing"/);
  assert.match(flight, /clamp01\(\(flight - 0\.72\) \/ 0\.18\)/);
  assert.match(folder, /isExit \|\| receiving \|\| dropOpen/);
  assert.match(folder, /data-receiving=\{receiving\}/);
  assert.match(folder, /onReceiveClosed\?\.\(\)/);
  assert.match(studio, /galleryLoading \|\|\s*galleryAdding \|\|/);
  assert.match(studio, /receivingItemId=\{galleryAddFlight\?\.itemId\}/);
  assert.match(studio, /flight=\{[\s\S]*?<GalleryAddFlight/);
  assert.match(studio, /coordinateOrigin=\{galleryAddFlight\.coordinateOrigin\}/);
  assert.match(studio, /controllerRef\.current\?\.reappear\(\)/);
  assert.match(
    styles,
    /\.sticker-host\[data-gallery-adding="true"\] canvas,[^}]*opacity: 0;/s,
  );
  assert.match(styles, /\.gallery-add-flight \{[^}]*position: absolute;[^}]*pointer-events: none;/s);
  assert.match(styles, /\.gallery-add-flight-viewport \{[^}]*position: fixed;[^}]*z-index: 119;/s);
  assert.match(styles, /\.gallery-folder-previews \{[^}]*z-index: 10;/s);
  assert.match(styles, /\.gallery-folder-flight-layer \{[^}]*z-index: 20;/s);
  assert.match(styles, /\.gallery-folder-front-layer \{[^}]*z-index: 30;/s);
  assert.match(styles, /:disabled:not\(\[data-receiving="true"\]\)/);
  assert.match(rendererTypes, /reappear\(\): void/);
});

test("depth-tests the gallery curl without breaking sticker stacking", async () => {
  const renderer = await readFile(
    new URL("../lib/gallery-renderer.ts", import.meta.url),
    "utf8",
  );

  assert.match(
    renderer,
    /stickerMaterial = new THREE\.ShaderMaterial\([\s\S]*?depthTest: true,[\s\S]*?depthWrite: true/,
  );
  assert.match(
    renderer,
    /residueMesh\.onBeforeRender = \(renderer\) => renderer\.clearDepth\(\)/,
  );
});

test("projects a visible gallery shadow from the live peeled geometry", async () => {
  const [renderer, shaders] = await Promise.all([
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
  ]);

  assert.match(shaders, /export const galleryShadowVertexShader/);
  assert.match(shaders, /deformed\.z, 0\.0\) \* uShadowLiftScale/);
  assert.match(
    shaders,
    /worldPosition\.xy \+= normalize\(uShadowDirection\) \* projectionDistance/,
  );
  assert.match(shaders, /export const galleryShadowFragmentShader/);
  assert.match(shaders, /uTexel \* max\(uShadowBlur, 0\.75\)/);
  assert.match(renderer, /this\.shadowMesh = new THREE\.Mesh/);
  assert.match(renderer, /value: clamp\(this\.options\.shadow\.opacity, 0, 0\.9\)/);
  assert.match(renderer, /this\.options\.shadow\.distance\) \* 0\.09/);
  assert.match(renderer, /this\.options\.shadow\.blur \* 0\.18/);
  assert.match(renderer, /setShadowScale\(scaleX: number, scaleY: number\)/);
  assert.match(renderer, /renderer\.shadowMap\.enabled = true/);
  assert.match(renderer, /peelShadowDepthVertexShader/);
  assert.match(renderer, /this\.stickerMesh\.castShadow = false/);
  assert.match(renderer, /this\.stickerMesh\.receiveShadow = true/);
  assert.match(renderer, /this\.groundShadowMesh\.receiveShadow = true/);
  assert.match(renderer, /new THREE\.ShadowMaterial/);
});

test("stacks folder previews without overlap when expanded", async () => {
  const [folder, gallery, studio, styles] = await Promise.all([
    readFile(new URL("../app/GalleryFolder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(folder, /const EXPANDED_MAX_HEIGHT = 100/);
  assert.match(folder, /const EXPANDED_GAP = 10/);
  assert.match(folder, /function seededFraction\(/);
  assert.match(folder, /previous\.expanded\.height \+ EXPANDED_GAP/);
  assert.match(folder, /layout\.collapsedRotation \* \(1 - previewProgress\)/);
  assert.match(folder, /const COLLAPSED_MAX_WIDTH = 46/);
  assert.match(folder, /const COLLAPSED_MAX_HEIGHT = 54/);
  assert.match(folder, /const COLLAPSED_TOP_EXPOSURE_MAX = 0\.48/);
  assert.match(folder, /const COLLAPSED_LANES = \[0\.08, 0\.92/);
  assert.match(folder, /const deep = index % 3 === 1/);
  assert.match(folder, /isWide \? 1 \/ aspect : aspect/);
  assert.match(folder, /direction \* \(72 \+ seededFraction\(item\.id, 53\) \* 36\)/);
  assert.match(folder, /horizontalTravel \* lane/);
  assert.match(folder, /function rotatedSize\(/);
  assert.match(styles, /\.gallery-folder-front-layer \{[^}]*overflow: visible;/s);
  assert.match(styles, /\.gallery-folder-front-glass \{[^}]*clip-path: polygon\([^}]*backdrop-filter: blur\(4px\);/s);
  assert.match(styles, /\.gallery-folder-front \{[^}]*opacity: 0\.7;/s);
  assert.match(folder, /initial: isExit \? 1 : 0/);
  assert.doesNotMatch(gallery, /<GalleryFolder/);
  assert.match(studio, /<GalleryFolderDock/);
  assert.match(studio, /holdSurfaceVisible=\{gallerySurfaceHeld\}/);
  assert.match(studio, /onSurfaceReady=\{\(\) => setGallerySurfaceHeld\(false\)\}/);
  assert.match(studio, /setGallerySurfaceHeld\(galleryOpen\)/);
  assert.match(gallery, /const surfacePresence = holdSurfaceVisible && !closing/);
  assert.match(gallery, /holdSurfaceVisible \|\| !presenceSettled \|\| presence < 0\.999/);
  assert.match(gallery, /"--gallery-presence": surfacePresence/);
  assert.match(gallery, /const exitTransitionItems = useMemo\(/);
  assert.match(gallery, /items\.filter\(\(item\) => transitionIds\.has\(item\.id\)\)/);
  assert.match(gallery, /const exitComplete = exitTransitionItems\.every/);
  assert.match(studio, /showActivePreviews=\{!galleryOpen \|\| !galleryFlightStarted\}/);
  assert.doesNotMatch(gallery, /gallery-exit-button/);
});

test("stores multiple immutable gallery folders and keeps the default locked", async () => {
  const [types, storage, dock, folder, gallery, studio, styles] = await Promise.all([
    readFile(new URL("../lib/gallery-types.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-storage.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/GalleryFolderDock.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/GalleryFolder.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/GalleryCanvas.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(types, /DEFAULT_GALLERY_FOLDER_ID = "default"/);
  assert.match(types, /EVOLUTION_GALLERY_FOLDER_ID = "evolution"/);
  assert.match(types, /folderId: string/);
  assert.match(storage, /const DATABASE_VERSION = 5/);
  assert.match(storage, /oldVersion < 3[\s\S]*?evolutionFolder\(\)/);
  assert.match(storage, /oldVersion < 4[\s\S]*?EVOLUTION_GALLERY_FOLDER_COLOR/);
  assert.match(studio, /EVOLUTION_GALLERY_IMAGE_SOURCES[\s\S]*?bridge-1\.svg[\s\S]*?bridge-5\.svg/);
  assert.match(studio, /EVOLUTION_GALLERY_LAYOUTS: GalleryLayout\[\]/);
  assert.match(studio, /\{ x: -642, y: 60, width: 404, height: 527/);
  assert.match(studio, /\{ x: 487, y: 1, width: 330, height: 759/);
  assert.doesNotMatch(studio, /function evolutionGalleryLayouts/);
  assert.match(studio, /folderId: EVOLUTION_GALLERY_FOLDER_ID/);
  assert.match(studio, /LEGACY_DEFAULT_GALLERY_SEED_V3_KEY/);
  assert.match(studio, /LEGACY_DEFAULT_GALLERY_SEED_V4_KEY/);
  assert.match(studio, /shouldRefreshEvolutionLayouts = true/);
  assert.match(studio, /updateGalleryLayout\([\s\S]*?EVOLUTION_GALLERY_LAYOUTS\[index\]/);
  assert.match(studio, /shouldRemoveDuplicateBridge = true/);
  assert.match(studio, /item\.title === "Bridge"/);
  assert.doesNotMatch(studio, /default-gallery\/bridge\.svg/);
  assert.match(storage, /cursor\.update\(\{ \.\.\.item, folderId: DEFAULT_GALLERY_FOLDER_ID \}\)/);
  assert.match(storage, /The default gallery folder cannot be deleted/);
  assert.match(storage, /The default gallery folder color is locked/);
  assert.match(storage, /The default gallery folder must remain first/);
  assert.match(storage, /export async function exportGalleryFolders/);
  assert.match(storage, /export async function importGalleryArchive/);
  assert.match(dock, /className="gallery-folder-scroll"/);
  assert.match(dock, /menuProgress \* 45/);
  assert.match(dock, /useSpringValue\(revealed \? 1 : 0/);
  assert.match(dock, /setExpandedWidth\(Math\.ceil\(32 \+ element\.scrollWidth \+ 14\)\)/);
  assert.match(dock, /width: 32 \+ hoverProgress \* \(expandedWidth - 32\)/);
  assert.doesNotMatch(dock, /width: 32 \+ hoverProgress \* 72/);
  assert.match(dock, /delayIndex \* 34/);
  assert.match(dock, /revealed && entranceSettled && entranceProgress >= 0\.999/);
  assert.match(dock, /pointerEvents: interactionReady \? "auto" : "none"/);
  assert.match(dock, /const DOCK_ACTION_STEP = 39/);
  assert.match(dock, /\(delayIndex \+ 1\) \* DOCK_ACTION_STEP/);
  assert.match(dock, /function DockGooBlob/);
  assert.match(dock, /id="gallery-folder-menu-goo"/);
  assert.match(styles, /\.gallery-folder-menu-goo-layer \{[^}]*filter: url\("#gallery-folder-menu-goo"\);/s);
  assert.match(styles, /\.gallery-folder-add \{[^}]*z-index: 2;/s);
  assert.match(styles, /\.gallery-folder-menu-actions \{[^}]*z-index: 1;/s);
  assert.match(styles, /\.gallery-folder-menu \{[^}]*margin-bottom: 27px;/s);
  assert.doesNotMatch(dock, /className="gallery-folder-color"/);
  assert.doesNotMatch(dock, /className="gallery-folder-delete-control"/);
  assert.match(dock, /function FolderEditMenu/);
  assert.match(dock, /className="gallery-folder-edit-hit"/);
  assert.match(dock, /className="gallery-folder-edit-menu-color"/);
  assert.match(dock, /className="gallery-folder-edit-menu-delete"/);
  assert.match(dock, /className="gallery-folder-edit-menu-confirm"/);
  assert.match(dock, /--gallery-folder-edit-menu-shift/);
  assert.match(dock, /const FOLDER_MENU_SHADOW_GUTTER = 28/);
  assert.match(dock, /naturalRight > safeRight/);
  assert.match(dock, /scroll\.addEventListener\("scroll", updateShift/);
  assert.match(dock, /translateX\(\$\{-deleteProgress \* 110\}%\)/);
  assert.match(styles, /@keyframes gallery-folder-edit-jiggle/);
  assert.match(styles, /data-mode="edit"[^}]*gallery-folder-edit-jiggle 240ms/s);
  assert.match(dock, /function FolderSlotMotion/);
  assert.match(dock, /initial: entering \? 0 : 1/);
  assert.match(dock, /style=\{\{ width: 68 \* progress \}\}/);
  assert.match(dock, /setEnteringFolderIds\(\(current\) => new Set\(current\)\.add\(folder\.id\)\)/);
  assert.match(dock, /mode === "edit" && !isDefault/);
  assert.match(dock, /mode === "share"/);
  assert.match(dock, /shareSelection\.size === 0/);
  assert.match(dock, /anchor\.click\(\);[\s\S]*?closeMenu\(\);/);
  assert.doesNotMatch(dock, /<button type="button" onClick=\{\(\) => setMode\(null\)\}>\{t\.cancel\}<\/button>/);
  assert.match(styles, /\.gallery-folder-selection-hit span \{[^}]*border: 0;/s);
  assert.match(styles, /\.gallery-folder-share-actions button \{[^}]*border: 0;/s);
  assert.doesNotMatch(dock, /draggable=\{mode === "edit" && !isDefault\}/);
  assert.match(dock, /const FOLDER_SORT_STEP = 80/);
  assert.match(dock, /const FOLDER_DRAG_THRESHOLD = 5/);
  assert.match(dock, /function FolderSlotMotion/);
  assert.match(dock, /dragging \? dragOffset : sortOffset/);
  assert.match(dock, /setPointerCapture\(event\.pointerId\)/);
  assert.match(dock, /offset: \(intent\.targetIndex - intent\.sourceIndex\) \* FOLDER_SORT_STEP/);
  assert.match(styles, /\.gallery-folder-slot-motion\[data-dragging="true"\] \{[^}]*z-index: 90;/s);
  assert.match(gallery, /moveGalleryItemToFolder/);
  assert.match(gallery, /document\.elementsFromPoint/);
  assert.match(gallery, /type GalleryFolderDropPreview/);
  assert.match(gallery, /dropVisualProgress/);
  assert.match(gallery, /source: galleryScreenTarget\(currentItem, viewport, view\)/);
  assert.match(dock, /dropPreview\?\.folderId === folder\.id/);
  assert.match(folder, /function FolderDropPreviewMotion/);
  assert.match(folder, /FOLDER_WIDTH - 4,[\s\S]*?EXPANDED_MAX_HEIGHT/);
  assert.match(folder, /className="gallery-folder-drop-preview-layer"/);
  assert.match(folder, /className="gallery-folder-drop-preview"/);
  assert.match(styles, /\.gallery-folder-drop-preview-layer \{[^}]*z-index: 20;/s);
  assert.match(styles, /\.gallery-folder-front-layer \{[^}]*z-index: 30;/s);
  assert.match(gallery, /items\.length === 0[\s\S]*?gallery-empty-state/);
  assert.match(gallery, /还没添加贴纸，去其他 gallery 拖入/);
  assert.match(studio, /item\.folderId === activeGalleryFolderId/);
  assert.match(styles, /\.gallery-folder-scroll \{[^}]*overflow-x: auto;/s);
  assert.match(styles, /\.gallery-folder-scroll \{[^}]*padding: 900px 12px 14px;/s);
  assert.match(styles, /\.gallery-folder-add[\s\S]*?border-radius: 50%/);
  assert.match(styles, /\.gallery-folder-slot\[data-active="true"\]::after \{[^}]*background: var\(--accent\);/s);
  assert.match(styles, /\.gallery-folder-dock-action-icon \{[^}]*place-items: center;[^}]*width: 32px;[^}]*height: 32px;/s);
  assert.match(dock, /<FontAwesomeIcon icon=\{faPlus\} \/>/);
  assert.match(styles, /\.gallery-folder-add span \{[^}]*place-items: center;/s);
});

test("drops folder sort transforms on the reorder commit frame", async () => {
  const dock = await readFile(
    new URL("../app/GalleryFolderDock.tsx", import.meta.url),
    "utf8",
  );

  assert.match(dock, /const visibleSortX = sortingActive \? sortX : 0/);
  assert.match(dock, /translate3d\(\$\{visibleSortX\}px/);
  assert.match(dock, /sortingActive=\{folderSortDrag !== null\}/);
});

test("shrinks a folder slot to zero before deleting its record", async () => {
  const dock = await readFile(
    new URL("../app/GalleryFolderDock.tsx", import.meta.url),
    "utf8",
  );

  assert.match(dock, /useSpringValue\(exiting \? 0 : 1/);
  assert.match(dock, /style=\{\{ width: 68 \* progress \}\}/);
  assert.match(dock, /if \(exiting && settled\) onExitSettled\(\)/);
  assert.match(
    dock,
    /await deleteGalleryFolder\(folderId\);[\s\S]*?onFoldersChange\(nextFolders\)/,
  );
  assert.match(dock, /onDelete=\{\(\) => startFolderExit\(folder\.id\)\}/);
});

test("keeps text outlines faithful to the artwork alpha", async () => {
  const [source, renderer] = await Promise.all([
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(source, /connectTextBacking|firstOpaque|lastOpaque/);
  assert.match(source, /const canvas = addOutline\(sourceCanvas, outline\)/);
  assert.match(source, /function distanceTransform1D\(/);
  assert.match(source, /const expandedAlpha = expandAlpha\(source, radius\)/);
  assert.doesNotMatch(source, /const rings =|const directions =/);
  assert.match(renderer, /nextTexture\.minFilter = THREE\.LinearMipmapLinearFilter/);
});

test("supports uploaded images and derives transparent silhouettes from alpha", async () => {
  const [types, source, studio, declarations] = await Promise.all([
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../public/embed/sticker-forge.d.ts", import.meta.url), "utf8"),
  ]);

  assert.match(types, /export interface StickerImageSource/);
  assert.match(types, /type: "image";\s*\/\*\*[^]*?src: string/);
  assert.match(source, /function imageHasTransparency\(image: HTMLImageElement\)/);
  assert.match(source, /if \(pixels\[index\] < 255\) return true/);
  assert.match(source, /source\.type === "image"\s*\? await renderImageSource\(source\)/);
  assert.match(source, /const canvas = addOutline\(sourceCanvas, outline\)/);
  assert.match(source, /const VISIBLE_ALPHA_THRESHOLD = 0\.1 \* 255/);
  assert.match(
    source,
    /sourcePixels\[pixel \* 4 \+ 3\] >= VISIBLE_ALPHA_THRESHOLD/,
  );
  assert.match(studio, /type SourceMode = "text" \| "image"/);
  assert.match(studio, /accept="image\/\*,\.heic,\.heif"/);
  assert.match(studio, /\{ type: "image", src: dataUrl, name: file\.name \}/);
  assert.match(declarations, /export interface StickerImageSource/);
});

test("uses the bundled image artwork before a user uploads a replacement", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );
  const asset = await stat(
    new URL("../public/default-image.svg", import.meta.url),
  );

  assert.match(studio, /const DEFAULT_IMAGE_SRC = "\/default-image\.svg"/);
  assert.match(studio, /useState\(DEFAULT_IMAGE_SRC\)/);
  assert.match(studio, /setImageDataUrl\(DEFAULT_IMAGE_SRC\)/);
  assert.ok(asset.size > 1_000);
});

test("renders rich text runs with preserved line and inline styles", async () => {
  const source = await readFile(
    new URL("../lib/source.ts", import.meta.url),
    "utf8",
  );

  assert.match(source, /source\.richText\?\.blocks/);
  assert.match(source, /run\.fontWeight \?\? defaultWeight/);
  assert.match(source, /run\.fontSize \?\? 28/);
  assert.match(source, /run\.color \?\? source\.color/);
  assert.match(source, /if \(run\.underline && run\.width > 0\)/);
  assert.match(source, /line\.align === "left"/);
  assert.match(source, /line\.align === "right"/);
  assert.match(source, /block\.lineHeight \?\? 1\.2/);
  assert.match(source, /let maxFontSize = 0/);
  assert.match(source, /const lineFontSize = maxFontSize \|\| 28 \* scale/);
  assert.match(source, /Math\.max\(ascent \+ descent, lineFontSize\)/);
  assert.doesNotMatch(source, /Math\.max\(ascent \+ descent, fallbackSize\)/);
});

test("ships the requested two-line rich-text default", async () => {
  const [studio, renderer] = await Promise.all([
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  for (const source of [studio, renderer]) {
    assert.match(source, /text: "PEEL "/);
    assert.match(source, /text: "ME"/);
    assert.match(source, /rgb\(36, 126, 245\)/);
    assert.match(source, /text: "@cats_juice"/);
    assert.match(source, /fontSize: 10/);
    assert.match(source, /lineHeight: 0\.8/);
    assert.match(source, /fontWeight: 500/);
  }
});

test("keeps the smaller logo visually symmetric with the panel toggle", async () => {
  const styles = await readFile(
    new URL("../app/globals.css", import.meta.url),
    "utf8",
  );

  assert.match(styles, /\.studio-header \{[^}]*top: 42px;[^}]*left: 34px;/s);
  assert.match(
    styles,
    /\.studio-header \.brand-mark \{[^}]*width: 39px;[^}]*height: 22px;/s,
  );
  assert.match(styles, /\.panel-toggle \{[^}]*top: 36px;[^}]*right: 36px;/s);
});

test("uses one untapered crease across the sticker", async () => {
  const shader = await readFile(
    new URL("../lib/shaders.ts", import.meta.url),
    "utf8",
  );

  assert.doesNotMatch(shader, /uInfluence|frontShape|originMask|max\(along/);
  assert.match(shader, /float front = uPeelDepth;/);
  assert.match(shader, /float arcDistance = front - along;/);
  assert.match(shader, /return curved;/);
  assert.match(shader, /vec3 stickerSurfaceNormal\(vec3 base\)/);
  assert.doesNotMatch(shader, /deformedX|deformedY|gl_FrontFacing/);
  assert.match(shader, /float frontMix = smoothstep\(-0\.035, 0\.035, signedFacing\)/);
  assert.match(shader, /step\(0\.0, signedFacing\),\s*preservedFront/);
  assert.match(shader, /float preservedFront = uPreserveFrontColor/);
  assert.match(shader, /vec3 frontColor = mix\(\s*litFrontColor,\s*printSample\.rgb,\s*preservedFront/);
  assert.match(shader, /clamp\(uMaxAngle, 2\.55, 3\.14159265\)/);
});

test("uses a dense enough mesh for a smooth folded silhouette", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /\? 240/);
  assert.match(renderer, /\? 160/);
  assert.match(renderer, /: 96;/);
  assert.match(renderer, /Math\.round\(longSegments\), 64, 256/);
  assert.match(renderer, /56,\s*192,/);
});

test("caps the rendered sticker with absolute CSS pixel dimensions", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /MAX_STICKER_WIDTH_PX = 760/);
  assert.match(renderer, /MAX_STICKER_HEIGHT_PX = 520/);
  assert.match(renderer, /MAX_STICKER_WIDTH_PX \* worldUnitsPerPixel/);
  assert.match(renderer, /MAX_STICKER_HEIGHT_PX \* worldUnitsPerPixel/);
});

test("recomputes the peel extent for the live drag direction", async () => {
  const [renderer, source] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/source.ts", import.meta.url), "utf8"),
  ]);

  assert.match(source, /support: new Float32Array\(support\)/);
  assert.match(renderer, /this\.artwork\.support\.length/);
  assert.match(
    renderer,
    /this\.grabExtent = this\.projectionExtent\(\s*this\.grabOrigin,\s*this\.activeDirection,/,
  );
});

test("smoothly returns a lifted sticker when the drag enters an invalid direction", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /let shouldReturnFromInvalidDirection = false/);
  assert.match(
    renderer,
    /candidate\.dot\(this\.grabDirection\)[\s\S]*?shouldReturnFromInvalidDirection = true/,
  );
  assert.match(
    renderer,
    /if \(shouldReturnFromInvalidDirection\) \{[\s\S]*?this\.springActive = true/,
  );
  assert.match(renderer, /const MAX_DIRECT_RETURN_STEP_RATIO = 0\.035/);
  assert.match(
    renderer,
    /returnDistance > this\.grabExtent \* MAX_DIRECT_RETURN_STEP_RATIO/,
  );
  assert.match(
    renderer,
    /-stiffness \* \(nextDepth - this\.springTargetDepth\)/,
  );
  assert.match(renderer, /const springStep = Math\.min\(remainingSpringTime, 1 \/ 120\)/);
  assert.match(renderer, /nextDepth \+= this\.springVelocity \* springStep/);
  assert.doesNotMatch(
    renderer,
    /else \{\s*this\.activeDirection\.copy\(this\.grabDirection\);\s*pointerDistance = Math\.max/,
  );
});

test("snaps a sufficiently peeled sticker to full detachment on release", async () => {
  const [renderer, types] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
  ]);

  assert.match(types, /release: "snap" as const/);
  assert.match(renderer, /SNAP_DETACH_THRESHOLD = 0\.74/);
  assert.match(
    renderer,
    /const releaseProgress = this\.springActive[\s\S]*?this\.springTargetDepth \/ Math\.max\(this\.grabExtent, 0\.001\)/,
  );
  assert.match(
    renderer,
    /release === "snap" && releaseProgress >= SNAP_DETACH_THRESHOLD/,
  );
  assert.match(renderer, /if \(shouldDetach\) \{\s*this\.setCreaseDepth\(this\.grabExtent\)/);
  assert.match(renderer, /release === "snap" && !shouldDetach/);
});

test("continues moving a sticker after the peel reaches full progress", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(
    renderer,
    /const maximumPointerDistance = this\.peelModelForDepth\([\s\S]*?this\.grabExtent,[\s\S]*?\)\.projection/,
  );
  assert.match(
    renderer,
    /this\.setDetachedDragOffset\(\s*this\.activeDirection\.x \* detachedDistance,\s*this\.activeDirection\.y \* detachedDistance,/,
  );
  assert.match(renderer, /const angle = THREE\.MathUtils\.degToRad\(this\.options\.tilt\)/);
  assert.match(renderer, /this\.stickerMesh\.position\.set\(/);
});

test("pulls a fully detached sticker flat as tension increases", async () => {
  const [renderer, gallery, shader, exportDialog] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/gallery-renderer.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ExportDialog.tsx", import.meta.url), "utf8"),
  ]);

  assert.match(renderer, /private detachedTension = 0/);
  assert.match(renderer, /Math\.hypot\(localX, localY\)/);
  assert.match(renderer, /this\.grabProjection - this\.grabExtent \* 2/);
  assert.match(renderer, /const targetX = motion\.target\.x - 0\.5/);
  assert.match(renderer, /const requestedPointerDistance = Math\.hypot\(/);
  assert.match(
    renderer,
    /const fullPointerDistance = Math\.max\([\s\S]*?requestedPointerDistance,[\s\S]*?maximumPointerDistance/,
  );
  assert.match(
    renderer,
    /pointerDistance - maximumPointerDistance/,
  );
  assert.match(gallery, /detachedDistance \/ tensionDistance/);
  assert.match(gallery, /maximumPointerDistance - this\.grabExtent \* 2/);
  assert.match(shader, /uniform float uDetachedTension/);
  assert.match(shader, /tautBack\.xy \+= direction \* \(2\.0 \* arcDistance\)/);
  assert.match(shader, /mix\(curved, tautBack, clamp\(uDetachedTension/);
  assert.match(shader, /mix\(\s*curledNormal,\s*vec3\(0\.0, 0\.0, -1\.0\)/);
  assert.match(exportDialog, /const MOTION_ANCHOR_INSET = 30/);
  assert.match(
    exportDialog,
    /anchor === "origin"[\s\S]*?clamp\(normalized\.x, 0, 1\)[\s\S]*?: normalized/,
  );
});

test("distinguishes retracing a detached peel from crossing its invalid side", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /private dragDetached = false/);
  assert.match(
    renderer,
    /returnDirection\.dot\(this\.grabDirection\) >= OUTWARD_DIRECTION_LIMIT/,
  );
  assert.match(
    renderer,
    /if \(distance < maximumPointerDistance\) \{\s*this\.dragDetached = false/,
  );
  assert.match(
    renderer,
    /this\.setCreaseDepth\(this\.grabExtent\);[\s\S]*?drag\.x - this\.activeDirection\.x \* maximumPointerDistance,[\s\S]*?drag\.y - this\.activeDirection\.y \* maximumPointerDistance/,
  );
  assert.match(
    renderer,
    /if \(this\.state\.progress >= 1 - Number\.EPSILON\) \{\s*this\.dragDetached = true/,
  );
});

test("always terminates pointer dragging when capture or window focus is lost", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /lostpointercapture/);
  assert.match(renderer, /window\.addEventListener\("pointerup", this\.onWindowPointerEnd, true\)/);
  assert.match(renderer, /window\.addEventListener\("blur", this\.onWindowBlur\)/);
  assert.match(renderer, /document\.addEventListener\("visibilitychange", this\.onVisibilityChange\)/);
  assert.match(renderer, /event\.buttons === 0/);
  assert.match(renderer, /private finishPointerDrag\(timeStamp: number\)/);
});

test("flies a fully detached sticker out instead of freezing the folded mesh", async () => {
  const renderer = await readFile(
    new URL("../lib/sticker-forge.ts", import.meta.url),
    "utf8",
  );

  assert.match(renderer, /private detachedExitActive = false/);
  assert.match(renderer, /if \(shouldDetach\) \{/);
  assert.match(renderer, /this\.detachedExitActive = true/);
  assert.match(renderer, /this\.stickerMesh\.position\.x \+=/);
  assert.match(renderer, /this\.stickerMesh\.position\.y \+=/);
  assert.match(renderer, /this\.detachedExitElapsed >= 0\.46/);
  assert.match(renderer, /this\.stickerMesh\.position\.set\(0, 0, 0\)/);
});

test("re-enters a detached sticker with a centered spring and laser sweep", async () => {
  const [renderer, shader, exportDialog, rendererTypes, reappearAsset] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/ExportDialog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/types.ts", import.meta.url), "utf8"),
    stat(new URL("../lib/assets/sticker-reappear.wav", import.meta.url)),
  ]);

  assert.ok(reappearAsset.size > 10_000);
  assert.match(renderer, /private startEntranceAnimation\(\)/);
  assert.match(renderer, /this\.peelAudio\.playReappear\(\)/);
  assert.match(renderer, /this\.meshWidth >= this\.meshHeight \? 1 : 0/);
  assert.match(renderer, /this\.meshWidth >= this\.meshHeight \? 0 : -1/);
  assert.match(renderer, /private configureEntranceAxis\(\)/);
  assert.match(renderer, /private applyEntranceElapsed\(elapsed: number\)/);
  assert.match(renderer, /this\.uniforms\.uEntranceScaleProgress\.value = scaleProgress/);
  assert.match(renderer, /elapsed < ENTRANCE_SWEEP_DELAY \? -1 : sweepProgress/);
  assert.match(renderer, /ENTRANCE_SWEEP_DELAY = 0\.06/);
  assert.match(renderer, /this\.startEntranceAnimation\(\)/);
  assert.match(renderer, /setEntranceProgress\(progress: number\): void/);
  assert.match(rendererTypes, /setEntranceProgress\(progress: number\): void/);
  assert.match(
    exportDialog,
    /controllerRef\.current\?\.setEntranceProgress\(state\.entranceProgress\)/,
  );
  assert.doesNotMatch(exportDialog, /scale: 0\.78 \+ easedEntrance/);
  assert.match(
    exportDialog,
    /const rate = phase === "peel" \? speedRef\.current : 1/,
  );
  assert.match(
    exportDialog,
    /AUTO_PEEL_DURATION_MS \/ speed \+[\s\S]*?AUTO_EXIT_DURATION_MS \+[\s\S]*?STICKER_ENTRANCE_DURATION_MS/,
  );
  assert.doesNotMatch(exportDialog, /AUTO_ANIMATION_DURATION_MS \/ speed/);
  assert.match(shader, /vec3 scaleEntranceSlice\(vec3 base\)/);
  assert.match(shader, /uEntranceScaleProgress \* 1\.42 - entranceCoordinate \* 0\.42/);
  assert.match(shader, /exp\(-3\.8 \* sliceProgress\) \* cos\(9\.0 \* sliceProgress\)/);
  assert.match(shader, /float sliceScale = mix\(0\.6, 1\.0, springResponse\)/);
  assert.match(shader, /base\.xy \*= sliceScale/);
  assert.doesNotMatch(shader, /startAnchor/);
  assert.match(shader, /uniform float uEntranceSweep/);
  assert.match(shader, /float laserCore =\s*1\.0 - smoothstep/);
  assert.match(shader, /vec3 laserColor = 0\.58 \+ 0\.42 \* cos/);
  assert.match(shader, /laserCore \* uLaserHighlightIntensity/);
  assert.match(shader, /laserHalo \* uLaserBandOpacity/);
  assert.match(renderer, /ENTRANCE_SWEEP_DURATION = 0\.42/);
});

test("highlights only the draggable edge after a missed canvas press", async () => {
  const [renderer, shader] = await Promise.all([
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
  ]);

  assert.match(renderer, /if \(!hit\) \{\s*this\.startInteractionHint\(\)/);
  assert.match(renderer, /INTERACTION_HINT_COLOR = "rgb\(36, 126, 245\)"/);
  assert.match(renderer, /INTERACTION_HINT_DURATION = 0\.9/);
  assert.match(renderer, /this\.interactionHintActive \|\|/);
  assert.match(
    renderer,
    /uInteractionHintRadius\.value = this\.artwork[\s\S]*?this\.options\.peel\.grabWidth \* textureScale/,
  );
  assert.match(shader, /hitArea \* 0\.28 \* uInteractionHint/);
  assert.match(shader, /float interactionHitArea\(/);
  assert.match(shader, /float innerLineWidth = max\(2\.0,/);
  assert.match(shader, /innerEdgeOuter - innerEdgeInner/);
  assert.match(shader, /float innerEdge =/);
  assert.match(
    shader,
    /max\(edge, innerEdge\) \* dash \* uInteractionHint/,
  );
  assert.doesNotMatch(shader, /gl_FragCoord\.y\) \* 0\.72 - uTime/);
});

test("preserves a rich-text selection before committing a font size", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    studio,
    /const savedRange = selectionRef\.current\?\.cloneRange\(\) \?\? null;\s*const savedOffsets = selectionOffsetsRef\.current/,
  );
  assert.match(studio, /document\.createTreeWalker\(editor, NodeFilter\.SHOW_TEXT\)/);
  assert.match(studio, /savedOffsets\.end > savedOffsets\.start/);
  assert.match(studio, /span\.style\.fontSize = `\$\{nextSize\}px`/);
  assert.match(studio, /applyingEditorStyleRef\.current = true/);
  assert.match(studio, /applyingEditorStyleRef\.current = false/);
  assert.match(
    studio,
    /onKeyDown=\{\(event\) => \{\s*if \(event\.key !== "Enter"\) return;\s*event\.preventDefault\(\);\s*\}\}\s*onKeyUp=\{\(event\) => \{\s*if \(event\.key !== "Enter"\) return;\s*event\.currentTarget\.blur\(\)/,
  );
});

test("offers editable font-size and line-height fields with preset menus", async () => {
  const [studio, styles] = await Promise.all([
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(studio, /const FONT_SIZE_PRESETS = \[/);
  assert.match(studio, /const LINE_HEIGHT_PRESETS = \[/);
  assert.match(studio, /aria-label=\{t\.fontSizePresets\}/);
  assert.match(studio, /aria-label=\{t\.lineHeightPresets\}/);
  assert.match(studio, /inputMode="numeric"/);
  assert.match(studio, /inputMode="decimal"/);
  assert.match(studio, /function DropdownChevron\(\)/);
  assert.match(studio, /<FontAwesomeIcon className="number-preset-chevron" icon=\{faChevronDown\} \/>/);
  assert.doesNotMatch(studio, /⌄/);
  assert.match(styles, /\.number-control-symbol \{[^}]*font-size: 15px;/s);
  assert.match(styles, /\.number-preset-select select \{/);
  assert.match(styles, /\.number-preset-chevron \{[^}]*width: 12px;[^}]*height: 12px;/s);
});

test("renders editor line height against each line's actual font size", async () => {
  const studio = await readFile(
    new URL("../app/StickerForgeStudio.tsx", import.meta.url),
    "utf8",
  );

  assert.match(studio, /function editorBlockFontSize\(element: HTMLElement\)/);
  assert.match(studio, /editorBlockFontSize\(element\) \* nextLineHeight/);
  assert.match(studio, /normalizeEditorLineHeights\(editor\)/);
  assert.match(studio, /data-line-height="0\.8"/);
  assert.match(studio, /lineHeight: "8px"/);
  assert.match(studio, /anchorElement\.closest<HTMLElement>\("div, p"\)/);
});

test("projects shadows in the sticker material without a receiver seam", async () => {
  const [shader, renderer] = await Promise.all([
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  assert.doesNotMatch(shader, /vCreaseDistance|contactShadow|peeledMaterial/);
  assert.match(shader, /vec3 color = mix\(backColor, frontColor, frontMix\)/);
  assert.doesNotMatch(shader, /selfShadowVertexShader|selfShadowFragmentShader/);
  assert.doesNotMatch(renderer, /selfShadowLayers|selfShadowMeshes/);
  assert.doesNotMatch(renderer, /shadowLayers|shadowMeshes|shadowMaterials/);
  assert.doesNotMatch(shader, /shadowVertexShader|shadowFragmentShader/);
  assert.doesNotMatch(shader, /uShadowLayer|uLayerWeight|uBlurScale/);
  assert.match(shader, /peelShadowDepthVertexShader/);
  assert.doesNotMatch(shader, /vCasterMask/);
  assert.match(shader, /if \(artworkAlpha < 0\.04\) discard/);
  assert.doesNotMatch(shader, /vCrease/);
  assert.doesNotMatch(shader, /float rim|mix\(0\.9, 1\.0, rim\)/);
  assert.doesNotMatch(shader, /stickerShadowReceiver/);
  assert.doesNotMatch(renderer, /stickerShadowReceiver/);
  assert.match(shader, /curved\.z = elevation/);
  assert.doesNotMatch(shader, /max\(0\.008, elevation\)/);
  assert.match(shader, /float flutterEnvelope = sin\(normalizedPeel \* 3\.14159265\)/);
  assert.match(shader, /curved\.xy \+= tangent \* windDisplacement \* 0\.04/);
  assert.match(shader, /curved\.xy \+= direction \* windDisplacement \* 0\.01/);
  assert.match(shader, /float projectedShadow = \(1\.0 - getShadowMask\(\)\) \* vAdhered/);
  assert.match(shader, /float frontDiffuse = mix\(1\.0, 0\.76 \+ 0\.24 \* normalLight, frontDeformation\)/);
  assert.match(shader, /#include <colorspace_fragment>/);
  assert.match(renderer, /renderer\.shadowMap\.enabled = true/);
  assert.match(renderer, /stickerMesh\.castShadow = true/);
  assert.match(renderer, /stickerMesh\.receiveShadow = true/);
  assert.match(renderer, /groundShadowMesh\.receiveShadow = true/);
  assert.match(renderer, /new THREE\.ShadowMaterial/);
  assert.match(renderer, /groundShadowMesh\.position\.z = -0\.012/);
  assert.match(renderer, /shadow\.normalBias = 0\.0015/);
});

test("leaves a faint static residue beneath the peeled sticker", async () => {
  const [shader, renderer] = await Promise.all([
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
  ]);

  assert.match(shader, /export const residueVertexShader/);
  assert.match(shader, /vResidueReveal = peeledArea \* step\(0\.00001, uPeelDepth\)/);
  assert.match(shader, /artworkAlpha \* vResidueReveal \* grain \* 0\.085/);
  assert.match(shader, /gl_FragColor = vec4\(vec3\(0\.34\), residueAlpha \* uOpacity\)/);
  assert.match(renderer, /this\.residueMesh\.position\.z = -0\.006/);
  assert.match(renderer, /this\.scene\.add\(this\.residueMesh\)/);
  assert.match(renderer, /this\.residueMesh\.geometry = nextGeometry/);
  assert.match(renderer, /this\.residueMesh\.rotation\.z = angle/);
});

test("drives processed peel foley from motion instead of absolute progress", async () => {
  const [audioController, renderer, asset] = await Promise.all([
    readFile(new URL("../lib/peel-audio.ts", import.meta.url), "utf8"),
    readFile(new URL("../lib/sticker-forge.ts", import.meta.url), "utf8"),
    stat(
      new URL(
        "../lib/assets/elevenlabs-sticker-peel-foley.mp3",
        import.meta.url,
      ),
    ),
  ]);

  assert.ok(asset.size > 10_000);
  assert.match(audioController, /class PeelAudioEngine/);
  assert.match(audioController, /BUILT_IN_PROFILE/);
  assert.match(audioController, /PROCESSED_SOURCE_START = 0\.16/);
  assert.match(audioController, /smoothedVelocity/);
  assert.match(audioController, /HOLD_SILENCE_MS = 48/);
  assert.match(audioController, /playReattach/);
  assert.match(audioController, /playFinish/);
  assert.match(audioController, /fullyDetached/);
  assert.match(
    audioController,
    /this\.fullyDetached && nextProgress >= FINISH_REARM/,
  );
  assert.doesNotMatch(audioController, /getReversedBuffer|seek\(progress/);
  assert.match(renderer, /peelAudio\.begin\(this\.state\.progress/);
  assert.match(renderer, /peelAudio\.update\(/);
  assert.match(renderer, /peelAudio\.end\(this\.state\.progress\)/);
  assert.doesNotMatch(renderer, /peelAudio\.seek/);
});

test("exports GIF, APNG, and MOV through frame-rate split buttons", async () => {
  const [exportDialog, encoders, styles] = await Promise.all([
    readFile(new URL("../app/ExportDialog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/export-encoders.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(exportDialog, /GIF_FRAME_RATES = \[10, 15, 20, 30\]/);
  assert.match(exportDialog, /APNG_FRAME_RATES = \[10, 15, 20, 30, 60\]/);
  assert.match(exportDialog, /MOV_FRAME_RATES = \[24, 30, 60\]/);
  assert.match(exportDialog, /MAX_PLAYBACK_INTERVAL = 5/);
  assert.match(exportDialog, /PLAYBACK_INTERVAL_STEP = 0\.05/);
  assert.match(exportDialog, /exportAnimation\("gif", frameRate\)/);
  assert.match(exportDialog, /exportAnimation\("apng", frameRate\)/);
  assert.match(exportDialog, /exportAnimation\("mov", frameRate\)/);
  assert.match(exportDialog, /prepareAutomaticFrames\(frameRate\)/);
  assert.match(exportDialog, /prepareRecordedFrames\(frameRate\)/);
  assert.match(exportDialog, /encodeTransparentMov\(frames, frameRate, audio\)/);
  assert.match(exportDialog, /includeShadow: gifShadow/);
  assert.match(exportDialog, /const \[gifShadow, setGifShadow\] = useState\(true\)/);
  assert.match(exportDialog, /const \[videoSound, setVideoSound\] = useState\(true\)/);
  assert.match(exportDialog, /renderStickerExportAudio/);
  assert.match(encoders, /export function resampleExportFrames/);
  assert.match(encoders, /export function appendPlaybackInterval/);
  assert.match(exportDialog, /format === "mov"/);
  assert.match(exportDialog, /label=\{t\.playbackInterval\}/);
  assert.match(encoders, /export async function encodeTransparentApng/);
  assert.match(encoders, /export function repairTransparentEdgeColors/);
  assert.match(styles, /\.export-split-action/);
  assert.match(styles, /\.export-fps-menu/);
  assert.match(styles, /\.export-footer-options/);
  assert.match(styles, /\.export-option-toggle/);
  assert.match(
    styles,
    /\.export-dialog-footer \{[^}]*position: relative;[^}]*z-index: 50;/s,
  );
  assert.match(
    styles,
    /\.export-motion-panel \{[^}]*position: relative;[^}]*z-index: 30;/s,
  );
  assert.match(
    styles,
    /\.export-speed-control:has\(\.export-speed-popover\),[\s\S]*?\.export-bezier-control:has\(\.export-bezier-popover\) \{[^}]*z-index: 10;/,
  );
  assert.match(
    styles,
    /\.export-split-action:has\(\.export-fps-menu\) \{[^}]*z-index: 10;/s,
  );
  assert.match(
    styles,
    /\.export-fps-menu \{[^}]*z-index: 100;/s,
  );
  assert.doesNotMatch(
    styles,
    /\.export-split-action:has\(> button:hover:not\(:disabled\)\) \{[^}]*transform:/s,
  );
  assert.match(exportDialog, /className="export-mode-slider"/);
  assert.match(exportDialog, /data-mode=\{mode\}/);
  assert.match(exportDialog, /className="export-method-slider"/);
  assert.match(exportDialog, /data-method=\{animationMethod\}/);
  assert.match(
    styles,
    /\.export-mode-slider \{[^}]*transition: transform 280ms cubic-bezier/s,
  );
  assert.match(
    styles,
    /\.export-mode-tabs\[data-mode="embed"\] \.export-mode-slider/,
  );
  assert.match(
    styles,
    /\.export-method-slider \{[^}]*transition: transform 260ms cubic-bezier/s,
  );
  assert.match(
    styles,
    /\.export-method-switch\[data-method="automatic"\] \.export-method-slider/,
  );
  assert.match(
    styles,
    /\.export-record-control \{[^}]*gap: 7px;/s,
  );
  assert.match(
    styles,
    /\.export-record-control \.export-interval-trigger \{[^}]*height: 38px;/s,
  );
  assert.match(exportDialog, /labelInside/);
  assert.match(
    styles,
    /\.export-auto-inline-control\.export-select-control select \{[^}]*height: 38px;/s,
  );
  assert.match(
    styles,
    /\.export-auto-inline-control \.export-speed-trigger \{[^}]*height: 38px;/s,
  );
  assert.match(
    styles,
    /\.export-motion-panel \{[^}]*min-height: 68px;/s,
  );
  assert.match(
    styles,
    /\.export-motion-panel\[data-method="manual"\] \{[^}]*min-height: 68px;/s,
  );
  assert.match(
    styles,
    /\.export-interval-control\[data-label-inside="true"\] \.export-interval-trigger \{[^}]*grid-template-rows: auto auto;/s,
  );
});

test("locks export canvas ratios and scales every export format", async () => {
  const [exportDialog, styles] = await Promise.all([
    readFile(new URL("../app/ExportDialog.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
  ]);

  assert.match(
    exportDialog,
    /ASPECT_RATIO_PRESETS = \[[\s\S]*?\["free", null\][\s\S]*?\["1:1", 1\][\s\S]*?\["16:9", 16 \/ 9\][\s\S]*?\["9:16", 9 \/ 16\]/,
  );
  assert.match(exportDialog, /EXPORT_SCALES = \[1, 2, 3\]/);
  assert.match(exportDialog, /data-aspect-locked=\{aspectRatio !== null\}/);
  assert.match(exportDialog, /composeCurrent\(EMPTY_MOTION, exportScale\)/);
  assert.match(exportDialog, /composeCurrent\(state\.visual, exportScale\)/);
  assert.match(
    exportDialog,
    /scaleExportFrames\([\s\S]*?resampleExportFrames\(recordedFramesRef\.current, frameRate\),[\s\S]*?exportScale/,
  );
  assert.match(
    styles,
    /\.export-canvas-slot \{[^}]*container-type: size;/s,
  );
  assert.match(
    styles,
    /\.export-canvas-frame\[data-aspect-locked="true"\] \{[^}]*100cqw[^}]*100cqh/s,
  );
  assert.match(
    styles,
    /\.export-output-select select \{[^}]*position: absolute;[^}]*inset: 0;[^}]*height: 100%;/s,
  );
});

test("starts manual recording from the first direct peel", async () => {
  const exportDialog = await readFile(
    new URL("../app/ExportDialog.tsx", import.meta.url),
    "utf8",
  );

  assert.match(
    exportDialog,
    /manualStateRef\.current !== "idle" &&[\s\S]*?manualStateRef\.current !== "armed"/,
  );
  assert.match(
    exportDialog,
    /mode === "animated" && animationMethod === "manual"/,
  );
  assert.match(exportDialog, /enabled: previewSoundEnabled/);
  assert.doesNotMatch(exportDialog, /sound: \{ \.\.\.options\.sound, enabled: false \}/);
  assert.match(
    exportDialog,
    /const onPeelStart = \(\) => \{[\s\S]*?recordedFramesRef\.current\.push\(captureRecordingFrame\(\)\)[\s\S]*?setManualStateSynced\("capturing"\)/,
  );
  assert.match(
    exportDialog,
    /const canPanDirectly =[\s\S]*?animationMethod === "automatic";/,
  );
  assert.doesNotMatch(
    exportDialog,
    /animationMethod === "automatic" \|\| manualState === "idle"/,
  );
});
