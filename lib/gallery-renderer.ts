import * as THREE from "three";
import type { GalleryAsset, GalleryItem, GalleryLayout } from "./gallery-types";
import { getGalleryPreviewUrl } from "./gallery-storage";
import { PeelAudioEngine, DEFAULT_PEEL_SOUND_URL } from "./peel-audio";
import { prepareArtwork, type PreparedArtwork } from "./source";
import {
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
};

type ViewState = { x: number; y: number; zoom: number };

type RenderRecord = {
  item: GalleryItem;
  root: THREE.Group;
  preview: THREE.Mesh<THREE.PlaneGeometry, THREE.MeshBasicMaterial> | null;
  sticker: GalleryStickerMesh | null;
  previewLoading: boolean;
  stickerLoading: boolean;
  generation: number;
  hidden: boolean;
};

type QueueJob = () => Promise<void>;

const MIN_CURL_ANGLE = 2.55;
const MAX_CURL_ANGLE = Math.PI;
const MAX_FRONT_TO_POINTER_RATIO = 1.28;
const SNAP_DETACH_THRESHOLD = 0.74;

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

class GalleryStickerMesh {
  readonly root: THREE.Group;
  readonly artwork: PreparedArtwork;
  readonly options: ResolvedStickerOptions;

  private readonly geometry: THREE.PlaneGeometry;
  private readonly texture: THREE.CanvasTexture;
  private readonly uniforms: Record<string, THREE.IUniform>;
  private readonly stickerMaterial: THREE.ShaderMaterial;
  private readonly residueMaterial: THREE.ShaderMaterial;
  private readonly stickerMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly residueMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly audio: PeelAudioEngine;
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
  ) {
    this.root = root;
    this.artwork = artwork;
    this.options = resolveStickerOptions(undefined, asset.options);
    this.audio = audio;
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
    this.uniforms = {
      uMap: { value: this.texture },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
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
      uShadowOpacity: { value: clamp(this.options.shadow.opacity, 0, 0.9) },
      uShadowBlur: { value: Math.max(0, this.options.shadow.blur) },
      uShadowDistance: { value: 0.02 },
      uShadowDirection: { value: new THREE.Vector2(0.7, -0.7) },
      uEntranceSweep: { value: -1 },
      uEntranceAxis: { value: new THREE.Vector2(artwork.aspect >= 1 ? 1 : 0, artwork.aspect >= 1 ? 0 : -1) },
      uEntranceScaleProgress: { value: -1 },
      uInteractionHint: { value: 0 },
      uInteractionHintRadius: { value: 3 },
      uInteractionHintColor: { value: colorFrom("rgb(36, 126, 245)", "#247ef5") },
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
      depthTest: false,
      depthWrite: false,
    });
    this.stickerMaterial.alphaTest = 0.008;
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
    this.stickerMesh = new THREE.Mesh(this.geometry, this.stickerMaterial);
    root.add(this.residueMesh, this.stickerMesh);
  }

  setRenderOrder(order: number) {
    this.residueMesh.renderOrder = order * 2;
    this.stickerMesh.renderOrder = order * 2 + 1;
  }

  private sampleAlpha(x: number, y: number) {
    const pixelX = clamp(Math.round(x), 0, this.artwork.width - 1);
    const pixelY = clamp(Math.round(y), 0, this.artwork.height - 1);
    return this.artwork.alpha[pixelY * this.artwork.width + pixelX] / 255;
  }

  hitEdge(local: THREE.Vector2, displayedWidth: number) {
    const u = local.x + 0.5;
    const v = local.y + 0.5;
    if (u < -0.04 || u > 1.04 || v < -0.04 || v > 1.04) return null;
    const pixelX = u * (this.artwork.width - 1);
    const pixelY = (1 - v) * (this.artwork.height - 1);
    const pixelsPerCss = this.artwork.width / Math.max(displayedWidth, 1);
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
        const boundary = alpha < 0.9 || this.sampleAlpha(x - 1, y) < 0.1 || this.sampleAlpha(x + 1, y) < 0.1 || this.sampleAlpha(x, y - 1) < 0.1 || this.sampleAlpha(x, y + 1) < 0.1;
        if (!boundary) continue;
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
    this.stickerMesh.position.set(
      this.activeDirection.x * detachedDistance,
      this.activeDirection.y * detachedDistance,
      0,
    );
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
    this.stickerMesh.position.set(0, 0, 0);
    this.stickerMesh.rotation.set(0, 0, 0);
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
        if (this.springTargetDepth === 0) this.stickerMesh.position.set(0, 0, 0);
      } else {
        this.setCreaseDepth(Math.max(0, depth));
      }
      this.updateUniforms();
    }
    if (this.exitActive) {
      this.exitElapsed += delta;
      const speed = 1.45 + this.exitElapsed * 3.2;
      this.stickerMesh.position.x += this.activeDirection.x * speed * delta;
      this.stickerMesh.position.y += this.activeDirection.y * speed * delta;
      this.stickerMesh.rotation.z += this.exitSpin * delta;
      if (this.exitElapsed >= 0.46) {
        this.exitActive = false;
        this.reset();
        this.audio.playReappear();
        this.entranceActive = true;
        this.entranceElapsed = 0;
        this.uniforms.uEntranceScaleProgress.value = 0;
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
      }
    }
    this.uniforms.uTime.value = time / 1000;
    return this.dragging || this.springActive || this.exitActive || this.entranceActive || (this.options.wind > 0.001 && this.progress > 0.01);
  }

  dispose() {
    this.root.remove(this.stickerMesh, this.residueMesh);
    this.geometry.dispose();
    this.texture.dispose();
    this.stickerMaterial.dispose();
    this.residueMaterial.dispose();
  }
}

/** One WebGL renderer/context for the whole infinite gallery canvas. */
export class GalleryRenderer {
  private readonly canvas: HTMLCanvasElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly scene = new THREE.Scene();
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
  private readonly records = new Map<string, RenderRecord>();
  private readonly previewGeometry = new THREE.PlaneGeometry(1, 1);
  private readonly audio = new PeelAudioEngine();
  private readonly queue: QueueJob[] = [];
  private readonly onLiveIdsChange: (ids: Set<string>) => void;
  private view: ViewState = { x: 0, y: 0, zoom: 1 };
  private width = 1;
  private height = 1;
  private queueBusy = false;
  private destroyed = false;
  private frame = 0;
  private lastFrameTime = 0;
  private activePeel: { id: string; pointerId: number } | null = null;

  constructor(canvas: HTMLCanvasElement, onLiveIdsChange: (ids: Set<string>) => void) {
    this.canvas = canvas;
    this.onLiveIdsChange = onLiveIdsChange;
    this.renderer = new THREE.WebGLRenderer({
      canvas,
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.camera.position.z = 3;
    this.scene.add(new THREE.AmbientLight(0xffffff, 1.35));
    const light = new THREE.DirectionalLight(0xffffff, 1.8);
    light.position.set(-2, 3, 5);
    this.scene.add(light);
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
    this.camera.position.set(this.view.x, -this.view.y, 3);
    this.camera.updateProjectionMatrix();
    this.requestRender();
  }

  sync(items: GalleryRenderItem[]) {
    const nextIds = new Set(items.map(({ item }) => item.id));
    for (const [id, record] of this.records) {
      if (nextIds.has(id)) continue;
      this.removeRecord(record);
      this.records.delete(id);
    }
    for (const renderItem of items) {
      let record = this.records.get(renderItem.item.id);
      if (!record) {
        const root = new THREE.Group();
        record = {
          item: renderItem.item,
          root,
          preview: null,
          sticker: null,
          previewLoading: true,
          stickerLoading: false,
          generation: 0,
          hidden: renderItem.hidden,
        };
        this.records.set(renderItem.item.id, record);
        this.scene.add(root);
        this.enqueue(() => this.loadPreview(record!));
      }
      record.item = renderItem.item;
      record.hidden = renderItem.hidden;
      this.applyLayout(record, renderItem.item.layout);
      record.root.visible = !renderItem.hidden;
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

  private applyLayout(record: RenderRecord, layout: GalleryLayout) {
    record.root.position.set(layout.x, -layout.y, 0);
    record.root.scale.set(layout.width * 0.78, layout.height * 0.58, 1);
    record.root.rotation.z = -THREE.MathUtils.degToRad(record.item.baseTilt + layout.rotation);
    if (record.preview) record.preview.renderOrder = layout.zIndex * 2 + 1;
    record.sticker?.setRenderOrder(layout.zIndex);
    record.root.updateMatrixWorld(true);
  }

  private enqueue(job: QueueJob) {
    this.queue.push(job);
    void this.drainQueue();
  }

  private async drainQueue() {
    if (this.queueBusy) return;
    this.queueBusy = true;
    try {
      while (!this.destroyed && this.queue.length) {
        const job = this.queue.shift();
        if (job) await job();
        await new Promise<void>((resolve) => {
          if (typeof window.requestIdleCallback === "function") window.requestIdleCallback(() => resolve(), { timeout: 80 });
          else window.setTimeout(resolve, 0);
        });
      }
    } finally {
      this.queueBusy = false;
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
      const material = new THREE.MeshBasicMaterial({ map: texture, transparent: true, depthTest: false, depthWrite: false, toneMapped: false });
      const mesh = new THREE.Mesh(this.previewGeometry, material);
      mesh.renderOrder = record.item.layout.zIndex * 2 + 1;
      mesh.visible = !record.sticker;
      record.preview = mesh;
      record.previewLoading = false;
      record.root.add(mesh);
      this.requestRender();
    } catch {
      record.previewLoading = false;
      // The asset queue may still upgrade this record to its full renderer.
    }
  }

  private async loadSticker(record: RenderRecord, asset: GalleryAsset, generation: number) {
    try {
      const options = resolveStickerOptions(undefined, asset.options);
      const artwork = await prepareArtwork(asset.source, options.outline);
      if (
        this.destroyed ||
        this.records.get(record.item.id) !== record ||
        record.generation !== generation
      ) return;
      record.sticker = new GalleryStickerMesh(record.root, artwork, asset, this.audio, this.renderer.capabilities.getMaxAnisotropy());
      record.stickerLoading = false;
      record.sticker.setRenderOrder(record.item.layout.zIndex);
      if (record.preview) record.preview.visible = false;
      this.emitLiveIds();
      this.requestRender();
    } catch {
      if (this.records.get(record.item.id) === record && record.generation === generation) {
        record.stickerLoading = false;
      }
      // Keep the preview mesh when a malformed local source cannot be prepared.
    }
  }

  private emitLiveIds() {
    this.onLiveIdsChange(new Set([...this.records].filter(([, record]) => Boolean(record.sticker)).map(([id]) => id)));
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

  startPeel(clientX: number, clientY: number, pointerId: number, time: number) {
    const candidates = [...this.records.values()]
      .filter((record) => record.sticker && !record.hidden)
      .sort((a, b) => b.item.layout.zIndex - a.item.layout.zIndex);
    for (const record of candidates) {
      const local = this.clientToLocal(record, clientX, clientY);
      const hit = record.sticker!.hitEdge(
        local,
        record.item.layout.width * 0.78 * this.view.zoom,
      );
      if (!hit || !record.sticker!.start(hit, local, time)) continue;
      this.activePeel = { id: record.item.id, pointerId };
      this.requestRender();
      return record.item.id;
    }
    return null;
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
    for (const record of this.records.values()) {
      if (record.sticker?.update(delta, time)) animating = true;
    }
    this.renderer.render(this.scene, this.camera);
    if (animating) this.requestRender();
  };

  private removeRecord(record: RenderRecord) {
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
    this.queue.length = 0;
    for (const record of this.records.values()) this.removeRecord(record);
    this.records.clear();
    disposeObject(this.scene);
    this.previewGeometry.dispose();
    this.audio.destroy();
    this.renderer.dispose();
  }
}
