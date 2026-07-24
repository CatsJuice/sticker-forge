import * as THREE from "three";
import type { GalleryAsset, GalleryItem, GalleryLayout } from "./gallery-types";
import { getGalleryPreviewUrl } from "./gallery-storage";
import { PeelAudioEngine, DEFAULT_PEEL_SOUND_URL } from "./peel-audio";
import { prepareArtwork, type PreparedArtwork } from "./source";
import {
  galleryShadowFragmentShader,
  galleryShadowVertexShader,
  peelShadowDepthFragmentShader,
  peelShadowDepthVertexShader,
  residueFragmentShader,
  residueVertexShader,
  stickerFragmentShader,
  stickerVertexShader,
} from "./shaders";
import { resolveStickerOptions, type ResolvedStickerOptions } from "./types";

export type GalleryRenderItem = {
  item: GalleryItem;
  asset?: GalleryAsset;
  interactive: boolean;
  hidden: boolean;
  opacity: number;
};

type ViewState = { x: number; y: number; zoom: number };

export type GalleryScreenTransform = {
  left: number;
  top: number;
  width: number;
  height: number;
  rotation: number;
};

type RenderRecord = {
  item: GalleryItem;
  root: THREE.Group;
  preview: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null;
  previewHitMask: AlphaHitMask | null;
  sticker: GalleryStickerMesh | null;
  previewLoading: boolean;
  stickerLoading: boolean;
  generation: number;
  hidden: boolean;
  opacity: number;
};

type AlphaHitMask = {
  width: number;
  height: number;
  alpha: Uint8ClampedArray;
};

type QueueJob = () => Promise<void>;

const MIN_CURL_ANGLE = 2.55;
const MAX_CURL_ANGLE = Math.PI;
const MAX_FRONT_TO_POINTER_RATIO = 1.28;
const SNAP_DETACH_THRESHOLD = 0.74;
const ACTIVE_PEEL_RENDER_ORDER = 1_000_000;

function clamp(value: number, min: number, max: number) {
  return Math.min(max, Math.max(min, value));
}

function colorFrom(value: string, fallback: string) {
  try {
    return new THREE.Color(value);
  } catch {
    return new THREE.Color(fallback);
  }
}

function disposeObject(object: THREE.Object3D) {
  object.traverse((child) => {
    if (!(child instanceof THREE.Mesh)) return;
    child.geometry.dispose();
    const materials = Array.isArray(child.material) ? child.material : [child.material];
    materials.forEach((material) => {
      if (material instanceof THREE.MeshBasicMaterial) material.map?.dispose();
      material.dispose();
    });
  });
}

function createAlphaHitMask(image: CanvasImageSource) {
  const source = image as CanvasImageSource & {
    naturalWidth?: number;
    naturalHeight?: number;
    videoWidth?: number;
    videoHeight?: number;
    width?: number;
    height?: number;
  };
  const sourceWidth =
    source.naturalWidth ?? source.videoWidth ?? source.width ?? 0;
  const sourceHeight =
    source.naturalHeight ?? source.videoHeight ?? source.height ?? 0;
  if (sourceWidth <= 0 || sourceHeight <= 0) return null;
  const scale = Math.min(1, 128 / Math.max(sourceWidth, sourceHeight));
  const width = Math.max(1, Math.round(sourceWidth * scale));
  const height = Math.max(1, Math.round(sourceHeight * scale));
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d", { willReadFrequently: true });
  if (!context) return null;
  try {
    context.drawImage(image, 0, 0, width, height);
    const rgba = context.getImageData(0, 0, width, height).data;
    const alpha = new Uint8ClampedArray(width * height);
    for (let sourceIndex = 3, targetIndex = 0; sourceIndex < rgba.length; sourceIndex += 4, targetIndex += 1) {
      alpha[targetIndex] = rgba[sourceIndex];
    }
    return { width, height, alpha };
  } catch {
    return null;
  }
}

function hitAlphaMask(mask: AlphaHitMask, local: THREE.Vector2) {
  const u = local.x + 0.5;
  const v = local.y + 0.5;
  if (u < 0 || u > 1 || v < 0 || v > 1) return false;
  const x = clamp(Math.round(u * (mask.width - 1)), 0, mask.width - 1);
  const y = clamp(
    Math.round((1 - v) * (mask.height - 1)),
    0,
    mask.height - 1,
  );
  return mask.alpha[y * mask.width + x] >= 26;
}

class GalleryStickerMesh {
  readonly root: THREE.Group;
  readonly artwork: PreparedArtwork;
  readonly options: ResolvedStickerOptions;

  private readonly geometry: THREE.PlaneGeometry;
  private readonly texture: THREE.CanvasTexture;
  private readonly uniforms: Record<string, THREE.IUniform>;
  private readonly stickerMaterial: THREE.ShaderMaterial;
  private readonly peelShadowDepthMaterial: THREE.ShaderMaterial;
  private readonly residueMaterial: THREE.ShaderMaterial;
  private readonly shadowMaterial: THREE.ShaderMaterial;
  private readonly flatMaterial: THREE.MeshBasicMaterial;
  private readonly stickerMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly residueMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly shadowMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly flatMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial>;
  private readonly audio: PeelAudioEngine;
  private readonly setDynamicShadowOpacity: (opacity: number) => void;
  private deleteTearActive = false;
  private deletePermanentExit = false;
  private deleteShadowOpacity = 1;
  private deleteShadowVelocity = 0;
  private deletePromise: Promise<void> | null = null;
  private resolveDelete: (() => void) | null = null;
  private renderOrder = 0;
  private grabOrigin = new THREE.Vector2(-0.5, 0);
  private grabStart = new THREE.Vector2();
  private grabDirection = new THREE.Vector2(1, 0);
  private activeDirection = new THREE.Vector2(1, 0);
  private grabExtent = 1;
  private creaseDepth = 0;
  private basePeelRadius = 0.1;
  private effectivePeelRadius = 0.1;
  private grabProjection = 0;
  private dragging = false;
  private progress = 0;
  private springActive = false;
  private springVelocity = 0;
  private springTargetDepth = 0;
  private dragDetached = false;
  private detachedTension = 0;
  private exitActive = false;
  private exitElapsed = 0;
  private exitSpin = 0;
  private entranceActive = false;
  private entranceElapsed = 0;

  constructor(
    root: THREE.Group,
    artwork: PreparedArtwork,
    asset: GalleryAsset,
    audio: PeelAudioEngine,
    maxAnisotropy: number,
    setDynamicShadowOpacity: (opacity: number) => void,
  ) {
    this.root = root;
    this.artwork = artwork;
    this.options = resolveStickerOptions(undefined, asset.options);
    this.audio = audio;
    this.setDynamicShadowOpacity = setDynamicShadowOpacity;
    this.texture = new THREE.CanvasTexture(artwork.canvas);
    this.texture.colorSpace = THREE.SRGBColorSpace;
    this.texture.minFilter = THREE.LinearMipmapLinearFilter;
    this.texture.magFilter = THREE.LinearFilter;
    this.texture.generateMipmaps = true;
    this.texture.anisotropy = Math.min(8, maxAnisotropy);
    this.texture.needsUpdate = true;

    const segmentsX = this.options.quality === "high" ? 128 : 88;
    const segmentsY = clamp(Math.round(segmentsX / Math.max(artwork.aspect, 0.55)), 48, 112);
    this.geometry = new THREE.PlaneGeometry(1, 1, segmentsX, segmentsY);
    const rawAngle = this.options.peel.maxAngle;
    const maxAngle = rawAngle > Math.PI * 2 ? THREE.MathUtils.degToRad(rawAngle) : rawAngle;
    this.basePeelRadius = Math.max(
      0.012,
      this.options.peel.radius <= 1 ? this.options.peel.radius : 0.1,
    );
    this.effectivePeelRadius = this.basePeelRadius;
    const shadowAngle = THREE.MathUtils.degToRad(this.options.shadow.angle);
    this.uniforms = {
      uMap: { value: this.texture },
      uPreparedMap: { value: this.texture },
      uPreparedMix: { value: 0 },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
      uDetachedTension: { value: 0 },
      uRadius: { value: this.basePeelRadius },
      uMaxAngle: { value: clamp(maxAngle, MIN_CURL_ANGLE, MAX_CURL_ANGLE) },
      uWind: { value: Math.max(0, this.options.wind) },
      uTime: { value: 0 },
      uOrigin: { value: this.grabOrigin.clone() },
      uPeelDir: { value: this.activeDirection.clone() },
      uMeshSize: { value: new THREE.Vector2(1, 1) },
      uTexel: { value: new THREE.Vector2(1 / artwork.width, 1 / artwork.height) },
      uBackColor: { value: colorFrom(this.options.back.color, "#f7f5f2") },
      uGloss: { value: clamp(this.options.back.gloss, 0, 1) },
      uRoughness: { value: clamp(this.options.back.roughness, 0, 1) },
      uShadowColor: { value: colorFrom(this.options.shadow.color, "#191823") },
      uShadowOpacity: {
        value: clamp(this.options.shadow.opacity, 0, 0.9),
      },
      uShadowDeleteOpacity: { value: 1 },
      uShadowBlur: {
        value: clamp(this.options.shadow.blur * 0.18, 0.75, 7),
      },
      uShadowDistance: {
        // The editor's shadow is cast onto a plane only 0.012 world units
        // behind the sticker, so the configured distance changes the light
        // angle rather than becoming a direct pixel offset. Match that small
        // resting footprint here instead of shifting by the full CSS value.
        value: 1.4 + Math.max(0, this.options.shadow.distance) * 0.09,
      },
      uShadowDirection: {
        value: new THREE.Vector2(
          Math.cos(shadowAngle),
          -Math.sin(shadowAngle),
        ).normalize(),
      },
      uShadowLiftScale: {
        value:
          Math.max(
            1,
            Math.min(Math.abs(root.scale.x), Math.abs(root.scale.y)),
          ) * 0.58,
      },
      uEntranceSweep: { value: -1 },
      uEntranceAxis: { value: new THREE.Vector2(artwork.aspect >= 1 ? 1 : 0, artwork.aspect >= 1 ? 0 : -1) },
      uEntranceScaleProgress: { value: -1 },
      uPreEntranceProgress: { value: 0 },
      uLaserCoreWidth: { value: 0.04 },
      uLaserBandWidth: { value: 0.3 },
      uLaserBandOpacity: { value: 0.46 },
      uLaserBrightness: { value: 1.18 },
      uLaserHighlightIntensity: { value: 0.62 },
      uBackgroundRemovalDistortion: { value: 0 },
      uRemovalDistortionRange: { value: 0.37 },
      uRemovalDistortionStrength: { value: 2.25 },
      uRemovalRippleDensity: { value: 12 },
      uRemovalRippleSpeed: { value: 4.2 },
      uInteractionHint: { value: 0 },
      uInteractionHintRadius: { value: 3 },
      uInteractionHintColor: { value: colorFrom("rgb(36, 126, 245)", "#247ef5") },
      uOpacity: { value: 1 },
      // Gallery idle rendering uses an unlit MeshBasicMaterial. Keep the
      // printed face identical when switching to the peel shader.
      uPreserveFrontColor: { value: 1 },
    };

    this.stickerMaterial = new THREE.ShaderMaterial({
      uniforms: {
        ...THREE.UniformsUtils.clone(THREE.UniformsLib.lights),
        ...this.uniforms,
      },
      vertexShader: stickerVertexShader,
      fragmentShader: stickerFragmentShader,
      lights: true,
      side: THREE.DoubleSide,
      transparent: true,
      // A peeled sheet overlaps itself. Without a real depth buffer, triangle
      // submission order makes the lifted face look folded behind the sticker.
      depthTest: true,
      depthWrite: true,
      toneMapped: false,
    });
    this.stickerMaterial.alphaTest = 0.008;
    this.peelShadowDepthMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: peelShadowDepthVertexShader,
      fragmentShader: peelShadowDepthFragmentShader,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: true,
    });
    this.shadowMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: galleryShadowVertexShader,
      fragmentShader: galleryShadowFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.shadowMesh = new THREE.Mesh(this.geometry, this.shadowMaterial);
    this.residueMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: residueVertexShader,
      fragmentShader: residueFragmentShader,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.residueMesh = new THREE.Mesh(this.geometry, this.residueMaterial);
    this.residueMesh.position.z = -0.002;
    // Gallery stacking is controlled by renderOrder. Clear depth once at the
    // start of this sticker's peel pass so lower stickers cannot occlude it,
    // while the curled surface can still self-occlude correctly.
    this.residueMesh.onBeforeRender = (renderer) => renderer.clearDepth();
    this.stickerMesh = new THREE.Mesh(this.geometry, this.stickerMaterial);
    this.stickerMesh.castShadow = false;
    this.stickerMesh.receiveShadow = true;
    this.stickerMesh.customDepthMaterial = this.peelShadowDepthMaterial;
    this.flatMaterial = new THREE.MeshBasicMaterial({
      map: this.texture,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      toneMapped: false,
    });
    this.flatMesh = new THREE.Mesh(this.geometry, this.flatMaterial);
    this.stickerMesh.visible = false;
    this.residueMesh.visible = false;
    root.add(this.shadowMesh, this.residueMesh, this.stickerMesh, this.flatMesh);
  }

  setRenderOrder(order: number) {
    this.renderOrder = order;
    this.shadowMesh.renderOrder = order * 3;
    this.residueMesh.renderOrder = order * 3 + 1;
    this.stickerMesh.renderOrder = order * 3 + 2;
    this.flatMesh.renderOrder = order * 3 + 2;
  }

  needsElevatedLayer() {
    return (
      this.dragging ||
      this.springActive ||
      this.exitActive ||
      this.entranceActive ||
      this.deleteTearActive ||
      this.deletePermanentExit ||
      this.progress > 0.0001
    );
  }

  setShadowScale(scaleX: number, scaleY: number) {
    this.uniforms.uShadowLiftScale.value =
      Math.max(1, Math.min(Math.abs(scaleX), Math.abs(scaleY))) * 0.58;
  }

  setOpacity(opacity: number) {
    const next = clamp(opacity, 0, 1);
    this.uniforms.uOpacity.value = next;
    this.flatMaterial.opacity = next;
  }

  tearAwayForDelete(time: number) {
    if (this.deletePromise) return this.deletePromise;

    const support = this.artwork.support;
    const pointCount = Math.floor(support.length / 2);
    const pointIndex = Math.floor(Math.random() * Math.max(pointCount, 1)) * 2;
    const origin = new THREE.Vector2(
      (support[pointIndex] ?? 0) - 0.5,
      0.5 - (support[pointIndex + 1] ?? 0.5),
    );
    const center = new THREE.Vector2();
    for (let index = 0; index < support.length; index += 2) {
      center.x += support[index] - 0.5;
      center.y += 0.5 - support[index + 1];
    }
    if (pointCount > 0) center.multiplyScalar(1 / pointCount);
    const inward = center.sub(origin);
    if (inward.lengthSq() < 0.0001) inward.set(-origin.x, -origin.y);
    if (inward.lengthSq() < 0.0001) inward.set(1, 0);
    inward.normalize();
    const randomAngle = (Math.random() - 0.5) * 0.62;
    inward.set(
      inward.x * Math.cos(randomAngle) - inward.y * Math.sin(randomAngle),
      inward.x * Math.sin(randomAngle) + inward.y * Math.cos(randomAngle),
    );

    this.dragging = false;
    this.exitActive = false;
    this.entranceActive = false;
    this.showPeelSurface();
    this.grabOrigin.copy(origin);
    this.grabStart.copy(origin);
    this.grabDirection.copy(inward);
    this.activeDirection.copy(inward);
    this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection);
    this.setCreaseDepth(0);
    this.springActive = true;
    this.springVelocity = 0;
    this.springTargetDepth = this.grabExtent;
    this.deleteTearActive = true;
    this.deletePermanentExit = false;
    this.deleteShadowOpacity = 1;
    this.deleteShadowVelocity = 0;
    this.uniforms.uShadowDeleteOpacity.value = 1;
    this.updateUniforms();

    const customSource = this.options.sound.src.trim();
    this.audio.configure({
      enabled: this.options.sound.enabled,
      src: customSource || DEFAULT_PEEL_SOUND_URL,
      volume: this.options.sound.volume,
      useBuiltInProfile: !customSource,
    });
    this.audio.unlock();
    this.audio.begin(0, time);
    this.deletePromise = new Promise<void>((resolve) => {
      this.resolveDelete = resolve;
    });
    return this.deletePromise;
  }

  restoreAfterDelete() {
    this.deleteTearActive = false;
    this.deletePermanentExit = false;
    this.deleteShadowOpacity = 1;
    this.deleteShadowVelocity = 0;
    this.uniforms.uShadowDeleteOpacity.value = 1;
    this.exitActive = false;
    this.entranceActive = false;
    this.resolveDelete?.();
    this.resolveDelete = null;
    this.deletePromise = null;
    this.reset();
    this.showFlatSurface();
  }

  private showPeelSurface() {
    // The live curl uses the same shadow-map path as the editor: the peeled
    // sheet casts onto both the receiver plane and its own adhered surface.
    this.shadowMesh.visible = false;
    this.flatMesh.visible = false;
    this.stickerMesh.visible = true;
    this.stickerMesh.castShadow = true;
    this.residueMesh.visible = true;
    this.setDynamicShadowOpacity(1);
  }

  private showFlatSurface() {
    this.stickerMesh.castShadow = false;
    this.setDynamicShadowOpacity(0);
    this.shadowMesh.visible = true;
    this.flatMesh.visible = true;
    this.stickerMesh.visible = false;
    this.residueMesh.visible = false;
  }

  private sampleAlpha(x: number, y: number) {
    const pixelX = clamp(Math.round(x), 0, this.artwork.width - 1);
    const pixelY = clamp(Math.round(y), 0, this.artwork.height - 1);
    return this.artwork.alpha[pixelY * this.artwork.width + pixelX] / 255;
  }

  private sampleExterior(x: number, y: number) {
    const pixelX = Math.round(x);
    const pixelY = Math.round(y);
    if (pixelX < 0 || pixelX >= this.artwork.width || pixelY < 0 || pixelY >= this.artwork.height) return true;
    return this.artwork.exteriorAlpha[pixelY * this.artwork.width + pixelX] === 1;
  }

  hitSurface(local: THREE.Vector2) {
    const u = local.x + 0.5;
    const v = local.y + 0.5;
    if (u < 0 || u > 1 || v < 0 || v > 1) return false;
    return this.sampleAlpha(
      u * (this.artwork.width - 1),
      (1 - v) * (this.artwork.height - 1),
    ) >= 0.1;
  }

  hitEdge(local: THREE.Vector2, unscaledDisplayedWidth: number) {
    const u = local.x + 0.5;
    const v = local.y + 0.5;
    if (u < -0.04 || u > 1.04 || v < -0.04 || v > 1.04) return null;
    const pixelX = u * (this.artwork.width - 1);
    const pixelY = (1 - v) * (this.artwork.height - 1);
    // Keep the band in sticker-local space. Camera zoom then scales the hit
    // target together with the sticker instead of pinning it to screen pixels.
    const pixelsPerCss =
      this.artwork.width / Math.max(unscaledDisplayedWidth, 1);
    const radius = clamp(
      this.options.peel.grabWidth * pixelsPerCss,
      3,
      Math.min(this.artwork.width, this.artwork.height) * 0.13,
    );
    const searchRadius = Math.ceil(radius);
    let nearestX = -1;
    let nearestY = -1;
    let nearestDistanceSq = radius * radius + 1;
    for (let y = Math.max(0, Math.floor(pixelY - searchRadius)); y <= Math.min(this.artwork.height - 1, Math.ceil(pixelY + searchRadius)); y += 1) {
      for (let x = Math.max(0, Math.floor(pixelX - searchRadius)); x <= Math.min(this.artwork.width - 1, Math.ceil(pixelX + searchRadius)); x += 1) {
        const distanceSq = (x - pixelX) ** 2 + (y - pixelY) ** 2;
        if (distanceSq >= nearestDistanceSq || distanceSq > radius * radius) continue;
        const alpha = this.sampleAlpha(x, y);
        if (alpha < 0.1) continue;
        const outerBoundary = this.sampleExterior(x - 1, y) || this.sampleExterior(x + 1, y) || this.sampleExterior(x, y - 1) || this.sampleExterior(x, y + 1);
        if (!outerBoundary) continue;
        nearestX = x;
        nearestY = y;
        nearestDistanceSq = distanceSq;
      }
    }
    if (nearestX < 0) return null;
    const edgeLocal = new THREE.Vector2(
      nearestX / Math.max(this.artwork.width - 1, 1) - 0.5,
      0.5 - nearestY / Math.max(this.artwork.height - 1, 1),
    );
    const delta = clamp(radius * 0.14, 1.5, 4.5);
    const gradient = new THREE.Vector2(
      this.sampleAlpha(nearestX + delta, nearestY) - this.sampleAlpha(nearestX - delta, nearestY),
      -(this.sampleAlpha(nearestX, nearestY + delta) - this.sampleAlpha(nearestX, nearestY - delta)),
    );
    if (gradient.lengthSq() < 0.008) gradient.set(-edgeLocal.x, -edgeLocal.y);
    if (gradient.lengthSq() < 0.0001) gradient.set(1, 0);
    return { local: edgeLocal, inward: gradient.normalize() };
  }

  private projectionExtent(origin: THREE.Vector2, direction: THREE.Vector2) {
    let maximum = 0.35;
    for (let index = 0; index < this.artwork.support.length; index += 2) {
      const x = this.artwork.support[index] - 0.5;
      const y = 0.5 - this.artwork.support[index + 1];
      maximum = Math.max(maximum, (x - origin.x) * direction.x + (y - origin.y) * direction.y);
    }
    return Math.max(0.35, maximum + 0.025);
  }

  start(hit: { local: THREE.Vector2; inward: THREE.Vector2 }, pointer: THREE.Vector2, time: number) {
    if (this.exitActive || this.entranceActive) return false;
    this.showPeelSurface();
    this.grabOrigin.copy(hit.local);
    this.grabStart.copy(hit.local);
    this.grabDirection.copy(hit.inward);
    this.activeDirection.copy(hit.inward);
    this.grabExtent = this.projectionExtent(this.grabOrigin, this.grabDirection);
    this.setCreaseDepth(0);
    this.springActive = false;
    this.springVelocity = 0;
    this.dragDetached = false;
    this.dragging = true;
    const customSource = this.options.sound.src.trim();
    this.audio.configure({
      enabled: this.options.sound.enabled,
      src: customSource || DEFAULT_PEEL_SOUND_URL,
      volume: this.options.sound.volume,
      useBuiltInProfile: !customSource,
    });
    this.audio.unlock();
    this.audio.begin(0, time);
    this.move(pointer, time);
    return true;
  }

  move(pointer: THREE.Vector2, time: number) {
    if (!this.dragging) return;
    const drag = pointer.clone().sub(this.grabStart);
    const distance = drag.length();
    if (distance > 0.004) {
      const candidate = drag.clone().normalize();
      if (candidate.dot(this.grabDirection) >= -0.22) this.activeDirection.copy(candidate);
    }
    this.grabExtent = this.projectionExtent(this.grabOrigin, this.activeDirection);
    const maximumPointerDistance = this.peelModelForDepth(this.grabExtent).projection;
    const targetDepth = this.solveCreaseDepth(distance);
    this.springActive = false;
    this.setCreaseDepth(targetDepth);
    const detachedDistance = Math.max(0, distance - maximumPointerDistance);
    const tensionDistance = Math.max(this.grabExtent * 0.45, 0.12);
    const linearTension = clamp(detachedDistance / tensionDistance, 0, 1);
    this.detachedTension = linearTension * linearTension * (3 - 2 * linearTension);
    this.stickerMesh.position.set(
      this.activeDirection.x * detachedDistance,
      this.activeDirection.y * detachedDistance,
      0,
    );
    const flatteningOffset =
      (maximumPointerDistance - this.grabExtent * 2) * this.detachedTension;
    this.stickerMesh.position.x += this.activeDirection.x * flatteningOffset;
    this.stickerMesh.position.y += this.activeDirection.y * flatteningOffset;
    this.shadowMesh.position.copy(this.stickerMesh.position);
    this.dragDetached = this.progress >= 1 - Number.EPSILON;
    this.audio.update(this.progress, time, this.activeDirection.x);
    this.updateUniforms();
  }

  end(time: number) {
    if (!this.dragging) return;
    this.dragging = false;
    const shouldDetach = this.options.peel.release === "snap" && this.progress >= SNAP_DETACH_THRESHOLD;
    this.audio.update(this.progress, time, this.activeDirection.x);
    this.audio.end(this.progress);
    if (shouldDetach) {
      this.setCreaseDepth(this.grabExtent);
      this.exitActive = true;
      this.exitElapsed = 0;
      this.exitSpin = this.activeDirection.x >= 0 ? -0.42 : 0.42;
    } else if (this.options.peel.release === "reset" || this.options.peel.release === "snap") {
      this.springActive = true;
      this.springVelocity = 0;
      this.springTargetDepth = 0;
    }
    this.dragDetached = false;
    this.updateUniforms();
  }

  cancelPeel() {
    if (!this.dragging && this.progress <= 0) return;
    this.audio.end(0);
    this.exitActive = false;
    this.entranceActive = false;
    this.reset();
    this.showFlatSurface();
  }

  private projectedGrabDistance(depth: number, radius: number) {
    if (depth <= 0) return 0;
    const maxAngle = this.uniforms.uMaxAngle.value as number;
    const safeRadius = Math.max(radius, 0.001);
    const angle = Math.min(depth / safeRadius, maxAngle);
    const arcLength = safeRadius * maxAngle;
    let projected = -safeRadius * Math.sin(angle);
    if (depth > arcLength) projected -= (depth - arcLength) * Math.cos(maxAngle);
    return Math.max(0, depth + projected);
  }

  private peelModelForDepth(depth: number) {
    const safeDepth = clamp(depth, 0, Math.max(this.grabExtent, 0.001));
    if (safeDepth <= 0.000001) return { depth: 0, radius: this.basePeelRadius, projection: 0 };
    const projection = this.projectedGrabDistance(safeDepth, this.basePeelRadius);
    const minimum = safeDepth / MAX_FRONT_TO_POINTER_RATIO;
    if (projection >= minimum) return { depth: safeDepth, radius: this.basePeelRadius, projection };
    const radius = safeDepth / MIN_CURL_ANGLE;
    return { depth: safeDepth, radius, projection: this.projectedGrabDistance(safeDepth, radius) };
  }

  private setCreaseDepth(depth: number) {
    const model = this.peelModelForDepth(depth);
    this.creaseDepth = model.depth;
    this.effectivePeelRadius = model.radius;
    this.grabProjection = model.projection;
    this.progress = clamp(this.creaseDepth / Math.max(this.grabExtent, 0.001), 0, 1);
  }

  private solveCreaseDepth(pointerDistance: number) {
    const maximum = this.peelModelForDepth(this.grabExtent);
    if (pointerDistance >= maximum.projection) return maximum.depth;
    if (pointerDistance <= 0.000001) return 0;
    let low = 0;
    let high = this.grabExtent;
    for (let index = 0; index < 16; index += 1) {
      const middle = (low + high) / 2;
      if (this.peelModelForDepth(middle).projection < pointerDistance) low = middle;
      else high = middle;
    }
    return (low + high) / 2;
  }

  private updateUniforms() {
    this.uniforms.uPeel.value = this.progress;
    this.uniforms.uPeelDepth.value = this.creaseDepth;
    this.uniforms.uDetachedTension.value = this.detachedTension;
    this.uniforms.uRadius.value = this.effectivePeelRadius;
    (this.uniforms.uOrigin.value as THREE.Vector2).copy(this.grabOrigin);
    (this.uniforms.uPeelDir.value as THREE.Vector2).copy(this.activeDirection);
  }

  private reset() {
    this.dragging = false;
    this.progress = 0;
    this.creaseDepth = 0;
    this.springActive = false;
    this.springVelocity = 0;
    this.detachedTension = 0;
    this.stickerMesh.position.set(0, 0, 0);
    this.stickerMesh.rotation.set(0, 0, 0);
    this.shadowMesh.position.set(0, 0, 0);
    this.shadowMesh.rotation.set(0, 0, 0);
    this.updateUniforms();
  }

  update(delta: number, time: number) {
    if (this.springActive) {
      const stiffness = 132 + clamp(this.options.peel.stiffness, 0, 1) * 146;
      const damping = Math.sqrt(stiffness) * 1.83;
      let remaining = Math.min(delta, 1 / 20);
      let depth = this.creaseDepth;
      while (remaining > 0) {
        const step = Math.min(remaining, 1 / 120);
        const acceleration = -stiffness * (depth - this.springTargetDepth) - damping * this.springVelocity;
        this.springVelocity += acceleration * step;
        depth += this.springVelocity * step;
        remaining -= step;
      }
      if (Math.abs(depth - this.springTargetDepth) <= this.grabExtent * 0.0008 && Math.abs(this.springVelocity) < this.grabExtent * 0.018) {
        this.setCreaseDepth(this.springTargetDepth);
        this.springActive = false;
        this.springVelocity = 0;
        if (this.deleteTearActive) {
          this.deleteTearActive = false;
          this.deletePermanentExit = true;
          this.exitActive = true;
          this.exitElapsed = 0;
          this.exitSpin =
            (this.activeDirection.x >= 0 ? -1 : 1) *
            (0.32 + Math.random() * 0.24);
          this.audio.update(1, time, this.activeDirection.x);
          this.audio.end(1);
        } else if (this.springTargetDepth === 0) {
          this.stickerMesh.position.set(0, 0, 0);
          this.showFlatSurface();
        }
      } else {
        this.setCreaseDepth(Math.max(0, depth));
      }
      this.updateUniforms();
      if (this.deleteTearActive) {
        this.audio.update(this.progress, time, this.activeDirection.x);
      }
    }
    if (this.exitActive) {
      this.exitElapsed += delta;
      const speed = 1.45 + this.exitElapsed * 3.2;
      this.stickerMesh.position.x += this.activeDirection.x * speed * delta;
      this.stickerMesh.position.y += this.activeDirection.y * speed * delta;
      this.stickerMesh.rotation.z += this.exitSpin * delta;
      this.shadowMesh.position.copy(this.stickerMesh.position);
      this.shadowMesh.rotation.copy(this.stickerMesh.rotation);
      if (this.deletePermanentExit) {
        const stiffness = 150;
        const damping = 21;
        let remaining = Math.min(delta, 1 / 20);
        while (remaining > 0) {
          const step = Math.min(remaining, 1 / 120);
          const acceleration =
            -stiffness * this.deleteShadowOpacity -
            damping * this.deleteShadowVelocity;
          this.deleteShadowVelocity += acceleration * step;
          this.deleteShadowOpacity += this.deleteShadowVelocity * step;
          remaining -= step;
        }
        this.uniforms.uShadowDeleteOpacity.value = clamp(
          this.deleteShadowOpacity,
          0,
          1,
        );
        this.setDynamicShadowOpacity(
          clamp(this.deleteShadowOpacity, 0, 1),
        );
      }
      if (this.exitElapsed >= 0.46) {
        this.exitActive = false;
        if (this.deletePermanentExit) {
          this.deleteShadowOpacity = 0;
          this.deleteShadowVelocity = 0;
          this.uniforms.uShadowDeleteOpacity.value = 0;
          this.shadowMesh.visible = false;
          this.stickerMesh.visible = false;
          this.stickerMesh.castShadow = false;
          this.residueMesh.visible = false;
          this.setDynamicShadowOpacity(0);
          this.resolveDelete?.();
          this.resolveDelete = null;
        } else {
          this.reset();
          this.stickerMesh.castShadow = false;
          this.setDynamicShadowOpacity(0);
          this.audio.playReappear();
          this.entranceActive = true;
          this.entranceElapsed = 0;
          this.uniforms.uEntranceScaleProgress.value = 0;
        }
      }
    }
    if (this.entranceActive) {
      this.entranceElapsed += delta;
      const scale = clamp(this.entranceElapsed / 0.72, 0, 1);
      const sweep = clamp((this.entranceElapsed - 0.06) / 0.42, 0, 1);
      this.uniforms.uEntranceScaleProgress.value = scale;
      this.uniforms.uEntranceSweep.value = this.entranceElapsed < 0.06 ? -1 : sweep;
      if (scale >= 1 && sweep >= 1) {
        this.entranceActive = false;
        this.uniforms.uEntranceScaleProgress.value = -1;
        this.uniforms.uEntranceSweep.value = -1;
        this.showFlatSurface();
      }
    }
    this.uniforms.uTime.value = time / 1000;
    return this.deleteTearActive || this.dragging || this.springActive || this.exitActive || this.entranceActive || (this.options.wind > 0.001 && this.progress > 0.01);
  }

  dispose() {
    this.stickerMesh.castShadow = false;
    this.setDynamicShadowOpacity(0);
    this.resolveDelete?.();
    this.resolveDelete = null;
    this.deletePromise = null;
    this.root.remove(
      this.shadowMesh,
      this.stickerMesh,
      this.residueMesh,
      this.flatMesh,
    );
    this.geometry.dispose();
    this.texture.dispose();
    this.shadowMaterial.dispose();
    this.peelShadowDepthMaterial.dispose();
    this.stickerMaterial.dispose();
    this.residueMaterial.dispose();
    this.flatMaterial.dispose();
  }
}

/** One WebGL renderer/context for the whole infinite gallery canvas. */
export class GalleryRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(
    -1,
    1,
    1,
    -1,
    0.1,
    20_000,
  );
  private readonly peelShadowLight = new THREE.DirectionalLight(0xffffff, 1);
  private readonly peelShadowTarget = new THREE.Object3D();
  private readonly groundShadowGeometry = new THREE.PlaneGeometry(1, 1);
  private readonly groundShadowMaterial = new THREE.ShadowMaterial({
    color: 0x191823,
    opacity: 0,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    toneMapped: false,
  });
  private readonly groundShadowMesh = new THREE.Mesh(
    this.groundShadowGeometry,
    this.groundShadowMaterial,
  );
  private readonly records = new Map<string, RenderRecord>();
  private readonly entryTransforms = new Map<string, GalleryScreenTransform>();
  private readonly previewGeometry = new THREE.PlaneGeometry(1, 1);
  private readonly audio = new PeelAudioEngine();
  private readonly queue: QueueJob[] = [];
  private readonly onLiveIdsChange: (ids: Set<string>) => void;
  private readonly onPreviewIdsChange: (ids: Set<string>) => void;
  private view: ViewState = { x: 0, y: 0, zoom: 1 };
  private width = 1;
  private height = 1;
  private queueBusy = false;
  private idleCallback: number | null = null;
  private destroyed = false;
  private frame = 0;
  private lastFrameTime = 0;
  private activePeel: { id: string; pointerId: number } | null = null;
  private elevatedPeelId: string | null = null;
  private dynamicShadowOwner: string | null = null;
  private dynamicShadowDirection = new THREE.Vector2(0.7, -0.7).normalize();
  private dynamicShadowSlope = 0.58;

  constructor(
    canvas: HTMLCanvasElement,
    onLiveIdsChange: (ids: Set<string>) => void,
    onPreviewIdsChange: (ids: Set<string>) => void = () => undefined,
  ) {
    this.canvas = canvas;
    this.onLiveIdsChange = onLiveIdsChange;
    this.onPreviewIdsChange = onPreviewIdsChange;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
    this.camera.position.z = 10_000;
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    this.peelShadowLight.castShadow = true;
    this.peelShadowLight.shadow.mapSize.set(2048, 2048);
    this.peelShadowLight.shadow.bias = -0.0001;
    this.peelShadowLight.shadow.normalBias = 0.35;
    this.peelShadowLight.target = this.peelShadowTarget;
    this.groundShadowMesh.position.z = -3;
    this.groundShadowMesh.receiveShadow = true;
    this.groundShadowMesh.renderOrder = -1_000_000;
    this.scene.add(
      this.groundShadowMesh,
      this.peelShadowTarget,
      this.peelShadowLight,
    );
    this.requestRender();
  }

  resize(width: number, height: number) {
    this.width = Math.max(1, width);
    this.height = Math.max(1, height);
    this.renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 2.5));
    this.renderer.setSize(this.width, this.height, false);
    this.updateCamera();
  }

  setView(view: ViewState) {
    this.view = view;
    this.updateCamera();
  }

  private updateCamera() {
    const halfWidth = this.width / Math.max(this.view.zoom * 2, 0.001);
    const halfHeight = this.height / Math.max(this.view.zoom * 2, 0.001);
    this.camera.left = -halfWidth;
    this.camera.right = halfWidth;
    this.camera.top = halfHeight;
    this.camera.bottom = -halfHeight;
    this.camera.position.set(this.view.x, -this.view.y, 10_000);
    this.camera.updateProjectionMatrix();
    this.updateDynamicShadowRig(halfWidth, halfHeight);
    for (const [id, transform] of this.entryTransforms) {
      const record = this.records.get(id);
      if (record) this.applyEntryTransform(record, transform);
    }
    this.requestRender();
  }

  private updateDynamicShadowRig(
    halfWidth = this.width / Math.max(this.view.zoom * 2, 0.001),
    halfHeight = this.height / Math.max(this.view.zoom * 2, 0.001),
  ) {
    const centerX = this.view.x;
    const centerY = -this.view.y;
    const lightHeight = 4_000;
    const horizontalOffset = lightHeight * this.dynamicShadowSlope;
    this.peelShadowTarget.position.set(centerX, centerY, 0);
    this.peelShadowLight.position.set(
      centerX - this.dynamicShadowDirection.x * horizontalOffset,
      centerY - this.dynamicShadowDirection.y * horizontalOffset,
      lightHeight,
    );
    const shadowCamera = this.peelShadowLight.shadow
      .camera as THREE.OrthographicCamera;
    const extent = Math.max(halfWidth, halfHeight) * 1.45;
    shadowCamera.left = -extent;
    shadowCamera.right = extent;
    shadowCamera.top = extent;
    shadowCamera.bottom = -extent;
    shadowCamera.near = 0.1;
    shadowCamera.far = lightHeight * 2;
    shadowCamera.updateProjectionMatrix();
    this.groundShadowMesh.position.set(centerX, centerY, -3);
    this.groundShadowMesh.scale.set(
      Math.max(1, halfWidth * 2.6),
      Math.max(1, halfHeight * 2.6),
      1,
    );
    this.peelShadowLight.shadow.needsUpdate = true;
  }

  private setDynamicShadow(
    id: string,
    options: ResolvedStickerOptions,
    opacity: number,
  ) {
    const nextOpacity = clamp(opacity, 0, 1);
    if (nextOpacity <= 0) {
      if (this.dynamicShadowOwner !== id) return;
      this.dynamicShadowOwner = null;
      this.groundShadowMaterial.opacity = 0;
      return;
    }
    this.dynamicShadowOwner = id;
    const ownerScale = this.records.get(id)?.root.scale.z ?? 1;
    this.peelShadowLight.shadow.normalBias = clamp(
      Math.abs(ownerScale) * (0.0015 / 0.62),
      0.02,
      1.5,
    );
    this.groundShadowMaterial.color.copy(
      colorFrom(options.shadow.color, "#191823"),
    );
    this.groundShadowMaterial.opacity =
      clamp(options.shadow.opacity, 0, 0.9) * nextOpacity;
    const shadowAngle = THREE.MathUtils.degToRad(options.shadow.angle);
    this.dynamicShadowDirection
      .set(Math.cos(shadowAngle), -Math.sin(shadowAngle))
      .normalize();
    // Mirror the editor's directional-light geometry. Its configured CSS
    // distance changes the horizontal light position; it is not applied as a
    // direct shadow translation.
    const configuredDistance =
      (Math.max(0, options.shadow.distance) / Math.max(this.height, 1)) * 2;
    this.dynamicShadowSlope =
      (1.6 + configuredDistance * 34) / 4.8;
    this.peelShadowLight.shadow.radius = clamp(
      options.shadow.blur * 0.18,
      1,
      7,
    );
    this.updateDynamicShadowRig();
  }

  sync(items: GalleryRenderItem[]) {
    const nextIds = new Set(items.map(({ item }) => item.id));
    let removedPreview = false;
    for (const [id, record] of this.records) {
      if (nextIds.has(id)) continue;
      removedPreview ||= !record.previewLoading;
      this.removeRecord(record);
      this.records.delete(id);
    }
    if (removedPreview) this.emitPreviewIds();
    for (const renderItem of items) {
      let record = this.records.get(renderItem.item.id);
      if (!record) {
        const root = new THREE.Group();
        record = {
          item: renderItem.item,
          root,
          preview: null,
          previewHitMask: null,
          sticker: null,
          previewLoading: true,
          stickerLoading: false,
          generation: 0,
          hidden: renderItem.hidden,
          opacity: clamp(renderItem.opacity, 0, 1),
        };
        this.records.set(renderItem.item.id, record);
        this.scene.add(root);
        this.enqueue(() => this.loadPreview(record!));
      }
      record.item = renderItem.item;
      record.hidden = renderItem.hidden;
      record.opacity = clamp(renderItem.opacity, 0, 1);
      this.applyLayout(record, renderItem.item.layout);
      record.root.visible = !renderItem.hidden && record.opacity > 0.001;
      record.sticker?.setOpacity(record.opacity);
      if (
        renderItem.interactive &&
        renderItem.asset &&
        !record.sticker &&
        !record.stickerLoading
      ) {
        record.stickerLoading = true;
        const generation = ++record.generation;
        this.enqueue(() => this.loadSticker(record!, renderItem.asset!, generation));
      } else if (!renderItem.interactive && (record.sticker || record.stickerLoading)) {
        record.generation += 1;
        record.sticker?.dispose();
        record.sticker = null;
        record.stickerLoading = false;
        if (record.preview) record.preview.visible = true;
      }
      if (record.preview) {
        record.preview.material.opacity = record.opacity;
      }
    }
    this.emitLiveIds();
    this.requestRender();
  }

  updateLayout(id: string, layout: GalleryLayout) {
    const record = this.records.get(id);
    if (!record) return;
    record.item = { ...record.item, layout };
    this.applyLayout(record, layout);
    this.requestRender();
  }

  setEntryTransform(id: string, transform: GalleryScreenTransform) {
    this.entryTransforms.set(id, transform);
    const record = this.records.get(id);
    if (record) this.applyEntryTransform(record, transform);
    this.requestRender();
  }

  clearEntryTransform(id: string) {
    this.entryTransforms.delete(id);
    const record = this.records.get(id);
    if (record) this.applyLayout(record, record.item.layout);
    this.requestRender();
  }

  private applyLayout(record: RenderRecord, layout: GalleryLayout) {
    const entryTransform = this.entryTransforms.get(record.item.id);
    if (entryTransform) {
      this.applyEntryTransform(record, entryTransform);
      return;
    }
    record.root.position.set(layout.x, -layout.y, 0);
    const scaleX = layout.width * 0.78;
    const scaleY = layout.height * 0.58;
    record.root.scale.set(
      scaleX,
      scaleY,
      Math.max(1, Math.min(Math.abs(scaleX), Math.abs(scaleY))),
    );
    record.root.rotation.z = -THREE.MathUtils.degToRad(record.item.baseTilt + layout.rotation);
    const renderOrder =
      this.elevatedPeelId === record.item.id
        ? ACTIVE_PEEL_RENDER_ORDER
        : layout.zIndex;
    if (record.preview) record.preview.renderOrder = renderOrder * 3 + 2;
    record.sticker?.setShadowScale(record.root.scale.x, record.root.scale.y);
    record.sticker?.setRenderOrder(renderOrder);
    record.root.updateMatrixWorld(true);
  }

  private applyEntryTransform(
    record: RenderRecord,
    transform: GalleryScreenTransform,
  ) {
    const rect = this.canvas.getBoundingClientRect();
    const centerX = transform.left + transform.width / 2;
    const centerY = transform.top + transform.height / 2;
    const pixelsPerWorldX =
      this.view.zoom * (rect.width / Math.max(this.width, 1));
    const pixelsPerWorldY =
      this.view.zoom * (rect.height / Math.max(this.height, 1));
    record.root.position.set(
      this.view.x +
        (centerX - rect.left - rect.width / 2) /
          Math.max(pixelsPerWorldX, 0.001),
      -this.view.y -
        (centerY - rect.top - rect.height / 2) /
          Math.max(pixelsPerWorldY, 0.001),
      0,
    );
    const scaleX = transform.width / Math.max(pixelsPerWorldX, 0.001);
    const scaleY = transform.height / Math.max(pixelsPerWorldY, 0.001);
    record.root.scale.set(
      scaleX,
      scaleY,
      Math.max(1, Math.min(Math.abs(scaleX), Math.abs(scaleY))),
    );
    record.root.rotation.z = -THREE.MathUtils.degToRad(transform.rotation);
    const renderOrder =
      this.elevatedPeelId === record.item.id
        ? ACTIVE_PEEL_RENDER_ORDER
        : record.item.layout.zIndex;
    if (record.preview) record.preview.renderOrder = renderOrder * 3 + 2;
    record.sticker?.setShadowScale(record.root.scale.x, record.root.scale.y);
    record.sticker?.setRenderOrder(renderOrder);
    record.root.updateMatrixWorld(true);
  }

  private enqueue(job: QueueJob) {
    this.queue.push(job);
    this.scheduleNextJob();
  }

  private scheduleNextJob() {
    if (this.destroyed || this.queueBusy || this.idleCallback !== null) return;
    if (!this.queue.length) return;

    const runNext = () => {
      this.idleCallback = null;
      if (this.destroyed) return;

      // Taking exactly one job per idle callback keeps pointer and wheel input
      // ahead of gallery asset preparation, even when many stickers enter the
      // viewport at once.
      const job = this.queue.shift();
      if (!job) return;
      void this.runQueueJob(job);
    };

    if (typeof window.requestIdleCallback === "function") {
      this.idleCallback = window.requestIdleCallback(runNext);
    } else {
      this.idleCallback = window.setTimeout(runNext, 0);
    }
  }

  private async runQueueJob(job: QueueJob) {
    this.queueBusy = true;
    try {
      await job();
    } finally {
      this.queueBusy = false;
      this.scheduleNextJob();
    }
  }

  private async loadPreview(record: RenderRecord) {
    if (
      this.destroyed ||
      this.records.get(record.item.id) !== record ||
      record.preview
    ) return;
    try {
      const url = await getGalleryPreviewUrl(record.item.id);
      const texture = await new THREE.TextureLoader().loadAsync(url);
      if (this.destroyed || this.records.get(record.item.id) !== record) {
        texture.dispose();
        return;
      }
      texture.colorSpace = THREE.SRGBColorSpace;
      texture.minFilter = THREE.LinearMipmapLinearFilter;
      texture.magFilter = THREE.LinearFilter;
      texture.generateMipmaps = true;
      texture.anisotropy = Math.min(4, this.renderer.capabilities.getMaxAnisotropy());
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, opacity: record.opacity, depthTest: false, depthWrite: false, toneMapped: false });
      const mesh = new THREE.Mesh(this.previewGeometry, material);
      mesh.renderOrder = record.item.layout.zIndex * 3 + 2;
      mesh.visible = !record.sticker;
      record.preview = mesh;
      record.previewHitMask = createAlphaHitMask(
        texture.image as CanvasImageSource,
      );
      record.previewLoading = false;
      record.root.add(mesh);
      this.emitPreviewIds();
      this.requestRender();
    } catch {
      record.previewLoading = false;
      this.emitPreviewIds();
      // The asset queue may still upgrade this record to its full renderer.
    }
  }

  private async loadSticker(record: RenderRecord, asset: GalleryAsset, generation: number) {
    if (
      this.destroyed ||
      this.records.get(record.item.id) !== record ||
      record.generation !== generation ||
      !record.stickerLoading
    ) return;
    try {
      const options = resolveStickerOptions(undefined, asset.options);
      const artwork = await prepareArtwork(asset.source, options.outline);
      if (
        this.destroyed ||
        this.records.get(record.item.id) !== record ||
        record.generation !== generation
      ) return;
      record.sticker = new GalleryStickerMesh(
        record.root,
        artwork,
        asset,
        this.audio,
        this.renderer.capabilities.getMaxAnisotropy(),
        (opacity) =>
          this.setDynamicShadow(
            record.item.id,
            options,
            opacity * record.opacity,
          ),
      );
      record.sticker.setOpacity(record.opacity);
      record.sticker.setShadowScale(record.root.scale.x, record.root.scale.y);
      record.stickerLoading = false;
      record.sticker.setRenderOrder(record.item.layout.zIndex);
      if (record.preview) record.preview.visible = false;
      this.emitLiveIds();
      this.requestRender();
    } catch {
      if (this.records.get(record.item.id) === record && record.generation === generation) {
        record.stickerLoading = false;
        if (record.preview) {
          record.preview.material.opacity = record.opacity;
        }
        this.requestRender();
      }
      // Keep the preview mesh when a malformed local source cannot be prepared.
    }
  }

  private emitLiveIds() {
    this.onLiveIdsChange(new Set([...this.records].filter(([, record]) => Boolean(record.sticker)).map(([id]) => id)));
  }

  private emitPreviewIds() {
    this.onPreviewIdsChange(
      new Set(
        [...this.records]
          .filter(([, record]) => !record.previewLoading)
          .map(([id]) => id),
      ),
    );
  }

  private clientToLocal(record: RenderRecord, clientX: number, clientY: number) {
    const rect = this.canvas.getBoundingClientRect();
    const world = new THREE.Vector3(
      this.view.x + (clientX - rect.left - rect.width / 2) / this.view.zoom,
      -this.view.y - (clientY - rect.top - rect.height / 2) / this.view.zoom,
      0,
    );
    record.root.updateMatrixWorld(true);
    record.root.worldToLocal(world);
    return new THREE.Vector2(world.x, world.y);
  }

  private hitCandidates() {
    return [...this.records.values()]
      .filter(
        (record) =>
          (record.sticker || record.previewHitMask) &&
          !record.hidden &&
          record.opacity > 0.001 &&
          record.root.visible,
      )
      .sort((a, b) => b.item.layout.zIndex - a.item.layout.zIndex);
  }

  private surfaceHit(
    clientX: number,
    clientY: number,
    candidates = this.hitCandidates(),
  ) {
    for (const record of candidates) {
      const local = this.clientToLocal(record, clientX, clientY);
      const hit = record.sticker
        ? record.sticker.hitSurface(local)
        : record.previewHitMask
          ? hitAlphaMask(record.previewHitMask, local)
          : false;
      if (hit) return { record, local };
    }
    return null;
  }

  /** Returns the topmost sticker with a visible pixel at this screen point. */
  pickSticker(clientX: number, clientY: number) {
    return this.surfaceHit(clientX, clientY)?.record.item.id ?? null;
  }

  private peelHit(
    clientX: number,
    clientY: number,
    candidates = this.hitCandidates(),
  ) {
    const surface = this.surfaceHit(clientX, clientY, candidates);
    // An opaque pixel owns the pointer. Only allow that sticker to peel so an
    // edge on a lower layer cannot steal the gesture through visible artwork.
    // When the pointer is just outside an edge there is no surface hit, so all
    // layers remain eligible and transparent regions naturally pass through.
    const peelCandidates = (surface ? [surface.record] : candidates).filter(
      (record) => Boolean(record.sticker),
    );
    for (const record of peelCandidates) {
      const local =
        surface?.record === record
          ? surface.local
          : this.clientToLocal(record, clientX, clientY);
      const hit = record.sticker!.hitEdge(
        local,
        record.item.layout.width * 0.78,
      );
      if (hit) return { record, local, hit };
    }
    return null;
  }

  /** Returns the visible sticker whose edge owns a peel gesture here. */
  pickPeelTarget(clientX: number, clientY: number) {
    return this.peelHit(clientX, clientY)?.record.item.id ?? null;
  }

  startPeel(clientX: number, clientY: number, pointerId: number, time: number) {
    if (this.activePeel) return null;
    const result = this.peelHit(clientX, clientY);
    if (!result?.record.sticker?.start(result.hit, result.local, time)) {
      return null;
    }
    this.setElevatedPeel(result.record.item.id);
    this.activePeel = { id: result.record.item.id, pointerId };
    this.requestRender();
    return result.record.item.id;
  }

  movePeel(clientX: number, clientY: number, pointerId: number, time: number) {
    if (this.activePeel?.pointerId !== pointerId) return false;
    const record = this.records.get(this.activePeel.id);
    if (!record?.sticker) return false;
    record.sticker.move(this.clientToLocal(record, clientX, clientY), time);
    this.requestRender();
    return true;
  }

  endPeel(pointerId: number, time: number) {
    if (this.activePeel?.pointerId !== pointerId) return false;
    const record = this.records.get(this.activePeel.id);
    record?.sticker?.end(time);
    this.activePeel = null;
    this.requestRender();
    return true;
  }

  cancelPeel() {
    if (!this.activePeel) return false;
    const record = this.records.get(this.activePeel.id);
    record?.sticker?.cancelPeel();
    this.activePeel = null;
    this.setElevatedPeel(null);
    this.requestRender();
    return true;
  }

  async tearAwayForDelete(id: string) {
    const record = this.records.get(id);
    if (!record?.sticker) return false;
    if (this.activePeel?.id === id) this.activePeel = null;
    this.setElevatedPeel(id);
    const animation = record.sticker.tearAwayForDelete(performance.now());
    this.requestRender();
    await animation;
    return true;
  }

  restoreAfterDelete(id: string) {
    const record = this.records.get(id);
    if (!record?.sticker) return;
    record.sticker.restoreAfterDelete();
    if (this.elevatedPeelId === id) this.setElevatedPeel(null);
    this.requestRender();
  }

  private setElevatedPeel(id: string | null) {
    if (this.elevatedPeelId === id) return;
    const previous = this.elevatedPeelId
      ? this.records.get(this.elevatedPeelId)
      : null;
    this.elevatedPeelId = id;
    if (previous) this.applyLayout(previous, previous.item.layout);
    const next = id ? this.records.get(id) : null;
    if (next) this.applyLayout(next, next.item.layout);
  }

  private requestRender() {
    if (this.destroyed || this.frame) return;
    this.frame = requestAnimationFrame(this.renderFrame);
  }

  private renderFrame = (time: number) => {
    this.frame = 0;
    if (this.destroyed) return;
    const delta = this.lastFrameTime ? Math.min((time - this.lastFrameTime) / 1000, 1 / 20) : 1 / 60;
    this.lastFrameTime = time;
    let animating = false;
    for (const [id, record] of this.records) {
      if (record.sticker?.update(delta, time)) animating = true;
      if (
        this.elevatedPeelId === id &&
        record.sticker &&
        !record.sticker.needsElevatedLayer()
      ) {
        this.setElevatedPeel(null);
      }
    }
    this.renderer.render(this.scene, this.camera);
    if (animating) this.requestRender();
  };

  private removeRecord(record: RenderRecord) {
    if (this.elevatedPeelId === record.item.id) {
      this.elevatedPeelId = null;
    }
    record.generation += 1;
    record.sticker?.dispose();
    if (record.preview) {
      record.root.remove(record.preview);
      record.preview.geometry = this.previewGeometry;
      record.preview.material.map?.dispose();
      record.preview.material.dispose();
    }
    this.scene.remove(record.root);
  }

  destroy() {
    this.destroyed = true;
    if (this.frame) cancelAnimationFrame(this.frame);
    if (this.idleCallback !== null) {
      if (typeof window.cancelIdleCallback === "function") {
        window.cancelIdleCallback(this.idleCallback);
      } else {
        window.clearTimeout(this.idleCallback);
      }
      this.idleCallback = null;
    }
    this.queue.length = 0;
    for (const record of this.records.values()) this.removeRecord(record);
    this.records.clear();
    disposeObject(this.scene);
    this.previewGeometry.dispose();
    this.audio.destroy();
    this.renderer.dispose();
  }
}
