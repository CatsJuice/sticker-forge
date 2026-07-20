import * as THREE from "three";
import {
  shadowFragmentShader,
  shadowVertexShader,
  stickerFragmentShader,
  stickerVertexShader,
} from "./shaders";
import { prepareArtwork, type PreparedArtwork } from "./source";
import {
  resolveStickerOptions,
  type ResolvedStickerOptions,
  type StickerInstance,
  type StickerOptions,
  type StickerPoint,
  type StickerSource,
  type StickerState,
  type StickerTextSource,
} from "./types";

export type {
  StickerBackOptions,
  StickerInstance,
  StickerOptions,
  StickerOutlineOptions,
  StickerPeelOptions,
  StickerPoint,
  StickerShadowOptions,
  StickerSource,
  StickerState,
  StickerSvgSource,
  StickerTextSource,
} from "./types";
export { sanitizeSvgMarkup } from "./source";

const DEFAULT_SOURCE: StickerTextSource = {
  type: "text",
  text: "PEEL ME",
  color: "#19191d",
  fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
  fontWeight: 900,
};

type MutableStickerState = {
  ready: boolean;
  dragging: boolean;
  progress: number;
  grabPoint: StickerPoint | null;
  pointer: StickerPoint | null;
};

type EdgeHit = {
  local: THREE.Vector2;
  inward: THREE.Vector2;
};

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

function mergePublicOptions(
  current: Partial<StickerOptions>,
  patch: Partial<StickerOptions>,
): Partial<StickerOptions> {
  return {
    ...current,
    ...patch,
    outline: { ...current.outline, ...patch.outline },
    shadow: { ...current.shadow, ...patch.shadow },
    peel: { ...current.peel, ...patch.peel },
    back: { ...current.back, ...patch.back },
  };
}

class StickerRenderer implements StickerInstance {
  private readonly container: HTMLElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
  private readonly scene = new THREE.Scene();
  private readonly uniforms: Record<string, THREE.IUniform>;
  private readonly stickerMaterial: THREE.ShaderMaterial;
  private readonly shadowMaterials: THREE.ShaderMaterial[] = [];
  private readonly stickerMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly shadowMeshes: Array<
    THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>
  > = [];
  private geometry = new THREE.PlaneGeometry(1, 1, 2, 2);
  private texture: THREE.CanvasTexture | null = null;
  private artwork: PreparedArtwork | null = null;
  private options: ResolvedStickerOptions;
  private source: StickerSource = DEFAULT_SOURCE;
  private requestedSource: StickerSource = DEFAULT_SOURCE;
  private sourceRevision = 0;
  private sourceRebuildTimer: number | null = null;
  private destroyed = false;
  private resizeObserver: ResizeObserver | null = null;
  private viewWidth = 2;
  private viewHeight = 2;
  private meshWidth = 1.6;
  private meshHeight = 0.62;
  private pointerId: number | null = null;
  private grabOrigin = new THREE.Vector2(-0.8, 0);
  private grabStart = new THREE.Vector2();
  private grabDirection = new THREE.Vector2(1, 0);
  private activeDirection = new THREE.Vector2(1, 0);
  private grabExtent = 1.6;
  private springVelocity = 0;
  private springActive = false;
  private frameRequest = 0;
  private lastFrameTime = 0;
  private state: MutableStickerState = {
    ready: false,
    dragging: false,
    progress: 0,
    grabPoint: null,
    pointer: null,
  };

  constructor(container: HTMLElement, options: StickerOptions = {}) {
    this.container = container;
    this.options = resolveStickerOptions(undefined, options);
    this.camera.position.z = 3;

    this.renderer = new THREE.WebGLRenderer({
      alpha: true,
      antialias: true,
      powerPreference: "high-performance",
      premultipliedAlpha: true,
    });
    this.renderer.setClearColor(0x000000, 0);
    this.renderer.outputColorSpace = THREE.SRGBColorSpace;
    this.renderer.domElement.style.width = "100%";
    this.renderer.domElement.style.height = "100%";
    this.renderer.domElement.style.display = "block";
    this.renderer.domElement.style.touchAction = "none";
    this.renderer.domElement.style.cursor = "default";
    this.renderer.domElement.tabIndex = 0;
    this.renderer.domElement.setAttribute("role", "slider");
    this.renderer.domElement.setAttribute("aria-valuemin", "0");
    this.renderer.domElement.setAttribute("aria-valuemax", "100");
    this.renderer.domElement.setAttribute("aria-valuenow", "0");
    this.renderer.domElement.setAttribute(
      "aria-label",
      "Interactive sticker. Drag a visible edge, or use arrow keys to preview the peel.",
    );
    this.renderer.domElement.setAttribute(
      "aria-keyshortcuts",
      "ArrowUp ArrowRight ArrowDown ArrowLeft Space",
    );
    container.appendChild(this.renderer.domElement);

    this.uniforms = {
      uMap: { value: null },
      uPeel: { value: 0 },
      uPeelDepth: { value: 0 },
      uRadius: { value: 0.08 },
      uInfluence: { value: 0.2 },
      uMaxAngle: { value: 3.55 },
      uStiffness: { value: this.options.peel.stiffness },
      uWind: { value: this.options.wind },
      uTime: { value: 0 },
      uOrigin: { value: this.grabOrigin.clone() },
      uPeelDir: { value: this.activeDirection.clone() },
      uMeshSize: { value: new THREE.Vector2(this.meshWidth, this.meshHeight) },
      uTexel: { value: new THREE.Vector2(1 / 1024, 1 / 512) },
      uBackColor: { value: colorFrom(this.options.back.color, "#f7f5f2") },
      uGloss: { value: this.options.back.gloss },
      uRoughness: { value: this.options.back.roughness },
      uShadowColor: {
        value: colorFrom(this.options.shadow.color, "#191823"),
      },
      uShadowOpacity: { value: this.options.shadow.opacity },
      uShadowBlur: { value: this.options.shadow.blur },
      uShadowDistance: { value: 0.04 },
      uShadowDirection: { value: new THREE.Vector2(0.7, -0.7) },
    };

    this.stickerMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: stickerVertexShader,
      fragmentShader: stickerFragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: true,
    });
    this.stickerMaterial.alphaTest = 0.008;
    this.stickerMesh = new THREE.Mesh(this.geometry, this.stickerMaterial);
    this.stickerMesh.renderOrder = 20;

    const shadowLayers = [
      { layer: 0.3, weight: 0.4, blur: 0.46 },
      { layer: 0.64, weight: 0.34, blur: 0.82 },
      { layer: 1, weight: 0.24, blur: 1.28 },
    ];
    for (const descriptor of shadowLayers) {
      const material = new THREE.ShaderMaterial({
        uniforms: {
          ...this.uniforms,
          uShadowLayer: { value: descriptor.layer },
          uLayerWeight: { value: descriptor.weight },
          uBlurScale: { value: descriptor.blur },
        },
        vertexShader: shadowVertexShader,
        fragmentShader: shadowFragmentShader,
        side: THREE.DoubleSide,
        transparent: true,
        depthTest: false,
        depthWrite: false,
      });
      const mesh = new THREE.Mesh(this.geometry, material);
      mesh.renderOrder = Math.round(descriptor.layer * 10);
      this.shadowMaterials.push(material);
      this.shadowMeshes.push(mesh);
      this.scene.add(mesh);
    }
    this.scene.add(this.stickerMesh);

    const canvas = this.renderer.domElement;
    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointercancel", this.onPointerUp);
    canvas.addEventListener("pointerleave", this.onPointerLeave);
    canvas.addEventListener("keydown", this.onKeyDown);
    canvas.addEventListener("webglcontextlost", this.onContextLost);

    if (typeof ResizeObserver !== "undefined") {
      this.resizeObserver = new ResizeObserver(() => this.resize());
      this.resizeObserver.observe(container);
    } else {
      window.addEventListener("resize", this.resize);
    }

    this.resize();
    this.applyOptionsToRenderer();
  }

  async setSource(source: StickerSource): Promise<void> {
    if (this.destroyed) return;
    this.requestedSource = source;
    if (this.sourceRebuildTimer !== null) {
      window.clearTimeout(this.sourceRebuildTimer);
      this.sourceRebuildTimer = null;
    }
    const revision = ++this.sourceRevision;
    try {
      const artwork = await prepareArtwork(source, this.options.outline);
      if (this.destroyed || revision !== this.sourceRevision) return;
      this.source = source;
      this.options.source = source;
      this.applyArtwork(artwork);
    } catch (error) {
      const message =
        error instanceof Error ? error.message : "The sticker source failed to render.";
      this.emit("error", { message });
      throw error;
    }
  }

  setOptions(patch: Partial<StickerOptions>): void {
    if (this.destroyed) return;
    const previousOutline = this.options.outline;
    const previousQuality = this.options.quality;
    this.options = resolveStickerOptions(this.options, patch);
    this.applyOptionsToRenderer();

    if (patch.source) {
      void this.setSource(patch.source).catch(() => {
        // setSource emits the actionable error detail.
      });
    }
    const outlineChanged =
      patch.outline &&
      (this.options.outline.width !== previousOutline.width ||
        this.options.outline.color !== previousOutline.color);
    if (outlineChanged && !patch.source) {
      if (this.sourceRebuildTimer !== null) {
        window.clearTimeout(this.sourceRebuildTimer);
      }
      this.sourceRebuildTimer = window.setTimeout(() => {
        this.sourceRebuildTimer = null;
        void this.setSource(this.requestedSource).catch(() => {
          // setSource emits the actionable error detail.
        });
      }, 70);
    }
    if (this.options.quality !== previousQuality && this.artwork) {
      this.updateMeshGeometry(this.artwork.aspect);
    }
    this.requestRender();
  }

  reset(): void {
    this.springActive = false;
    this.springVelocity = 0;
    this.state.progress = 0;
    this.state.dragging = false;
    this.state.pointer = null;
    this.state.grabPoint = null;
    this.pointerId = null;
    this.updatePeelUniforms();
    this.emit("peelchange", { amount: 0, progress: 0 });
    this.requestRender();
  }

  resize = (): void => {
    if (this.destroyed) return;
    const rect = this.container.getBoundingClientRect();
    const width = Math.max(2, Math.round(rect.width || 640));
    const height = Math.max(2, Math.round(rect.height || 420));
    const qualityRatio = this.options.quality === "low" ? 1.25 : 2;
    this.renderer.setPixelRatio(
      Math.min(window.devicePixelRatio || 1, qualityRatio),
    );
    this.renderer.setSize(width, height, false);
    this.viewHeight = 2;
    this.viewWidth = (width / height) * this.viewHeight;
    this.camera.left = -this.viewWidth / 2;
    this.camera.right = this.viewWidth / 2;
    this.camera.top = this.viewHeight / 2;
    this.camera.bottom = -this.viewHeight / 2;
    this.camera.updateProjectionMatrix();
    if (this.artwork) this.updateMeshGeometry(this.artwork.aspect);
    this.applyOptionsToRenderer();
    this.requestRender();
  };

  getState(): Readonly<StickerState> {
    return {
      ready: this.state.ready,
      dragging: this.state.dragging,
      progress: this.state.progress,
      grabPoint: this.state.grabPoint ? { ...this.state.grabPoint } : null,
      pointer: this.state.pointer ? { ...this.state.pointer } : null,
    };
  }

  destroy(): void {
    if (this.destroyed) return;
    this.destroyed = true;
    cancelAnimationFrame(this.frameRequest);
    if (this.sourceRebuildTimer !== null) {
      window.clearTimeout(this.sourceRebuildTimer);
      this.sourceRebuildTimer = null;
    }
    this.resizeObserver?.disconnect();
    window.removeEventListener("resize", this.resize);

    const canvas = this.renderer.domElement;
    canvas.removeEventListener("pointerdown", this.onPointerDown);
    canvas.removeEventListener("pointermove", this.onPointerMove);
    canvas.removeEventListener("pointerup", this.onPointerUp);
    canvas.removeEventListener("pointercancel", this.onPointerUp);
    canvas.removeEventListener("pointerleave", this.onPointerLeave);
    canvas.removeEventListener("keydown", this.onKeyDown);
    canvas.removeEventListener("webglcontextlost", this.onContextLost);

    this.texture?.dispose();
    this.geometry.dispose();
    this.stickerMaterial.dispose();
    this.shadowMaterials.forEach((material) => material.dispose());
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }

  private applyArtwork(artwork: PreparedArtwork) {
    this.artwork = artwork;
    const nextTexture = new THREE.CanvasTexture(artwork.canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.generateMipmaps = true;
    nextTexture.anisotropy = Math.min(
      4,
      this.renderer.capabilities.getMaxAnisotropy(),
    );
    nextTexture.needsUpdate = true;

    const previousTexture = this.texture;
    this.texture = nextTexture;
    this.uniforms.uMap.value = nextTexture;
    (this.uniforms.uTexel.value as THREE.Vector2).set(
      1 / artwork.width,
      1 / artwork.height,
    );
    this.updateMeshGeometry(artwork.aspect);
    this.reset();
    this.state.ready = true;
    previousTexture?.dispose();
    this.emit("ready", { width: artwork.width, height: artwork.height });
  }

  private updateMeshGeometry(aspect: number) {
    const maxWidth = Math.max(1.1, this.viewWidth * 0.78);
    const maxHeight = this.viewHeight * 0.58;
    let width = maxWidth;
    let height = width / aspect;
    if (height > maxHeight) {
      height = maxHeight;
      width = height * aspect;
    }
    this.meshWidth = Math.max(0.34, width);
    this.meshHeight = Math.max(0.25, height);

    const longSegments =
      this.options.quality === "high"
        ? 112
        : this.options.quality === "medium"
          ? 72
          : 40;
    const segmentsX = clamp(Math.round(longSegments), 28, 128);
    const segmentsY = clamp(
      Math.round(longSegments / Math.max(aspect, 0.35)),
      24,
      112,
    );
    const nextGeometry = new THREE.PlaneGeometry(
      this.meshWidth,
      this.meshHeight,
      segmentsX,
      segmentsY,
    );
    const previousGeometry = this.geometry;
    this.geometry = nextGeometry;
    this.stickerMesh.geometry = nextGeometry;
    this.shadowMeshes.forEach((mesh) => {
      mesh.geometry = nextGeometry;
    });
    previousGeometry.dispose();
    (this.uniforms.uMeshSize.value as THREE.Vector2).set(
      this.meshWidth,
      this.meshHeight,
    );
    this.grabOrigin.set(-this.meshWidth / 2, 0);
    this.grabDirection.set(1, 0);
    this.activeDirection.copy(this.grabDirection);
    this.grabExtent = this.meshWidth;
    this.applyOptionsToRenderer();
    this.updatePeelUniforms();
  }

  private applyOptionsToRenderer() {
    const angle = THREE.MathUtils.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = angle;
    this.shadowMeshes.forEach((mesh) => {
      mesh.rotation.z = angle;
    });

    this.uniforms.uBackColor.value = colorFrom(
      this.options.back.color,
      "#f7f5f2",
    );
    this.uniforms.uGloss.value = clamp(this.options.back.gloss, 0, 1);
    this.uniforms.uRoughness.value = clamp(this.options.back.roughness, 0, 1);
    this.uniforms.uStiffness.value = clamp(this.options.peel.stiffness, 0, 1);
    this.uniforms.uWind.value = Math.max(0, this.options.wind);

    const rawAngle = this.options.peel.maxAngle;
    this.uniforms.uMaxAngle.value =
      rawAngle > Math.PI * 2 ? THREE.MathUtils.degToRad(rawAngle) : rawAngle;
    const radius = this.options.peel.radius;
    const rect = this.container.getBoundingClientRect();
    this.uniforms.uRadius.value =
      radius <= 1
        ? Math.max(0.008, Math.min(this.meshWidth, this.meshHeight) * radius)
        : Math.max(0.008, (radius / Math.max(rect.height, 1)) * this.viewHeight);

    this.uniforms.uShadowColor.value = colorFrom(
      this.options.shadow.color,
      "#191823",
    );
    this.uniforms.uShadowOpacity.value = clamp(
      this.options.shadow.opacity,
      0,
      0.9,
    );
    const displayWidth =
      (this.meshWidth / Math.max(this.viewWidth, 0.001)) *
      Math.max(rect.width, 1);
    const textureScale = this.artwork
      ? this.artwork.width / Math.max(displayWidth, 1)
      : 1;
    this.uniforms.uShadowBlur.value =
      Math.max(0, this.options.shadow.blur) * textureScale * 0.34;
    this.uniforms.uShadowDistance.value =
      (Math.max(0, this.options.shadow.distance) /
        Math.max(rect.width || 1, 1)) *
      this.viewWidth;
    const shadowAngle = THREE.MathUtils.degToRad(this.options.shadow.angle);
    (this.uniforms.uShadowDirection.value as THREE.Vector2)
      .set(Math.cos(shadowAngle), -Math.sin(shadowAngle))
      .normalize();
  }

  private updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress;
    this.uniforms.uPeelDepth.value = this.state.progress * this.grabExtent * 0.92;
    this.uniforms.uInfluence.value = THREE.MathUtils.lerp(
      this.meshHeight * 0.18,
      Math.hypot(this.meshWidth, this.meshHeight) * 0.72,
      Math.pow(this.state.progress, 0.58),
    );
    (this.uniforms.uOrigin.value as THREE.Vector2).copy(this.grabOrigin);
    (this.uniforms.uPeelDir.value as THREE.Vector2).copy(this.activeDirection);
    const percent = Math.round(clamp(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(percent));
    this.renderer.domElement.setAttribute("aria-valuetext", `${percent}% peeled`);
  }

  private screenToLocal(clientX: number, clientY: number) {
    const rect = this.renderer.domElement.getBoundingClientRect();
    const normalizedX = ((clientX - rect.left) / Math.max(rect.width, 1)) * 2 - 1;
    const normalizedY = 1 - ((clientY - rect.top) / Math.max(rect.height, 1)) * 2;
    const worldX = normalizedX * (this.viewWidth / 2);
    const worldY = normalizedY * (this.viewHeight / 2);
    const angle = -THREE.MathUtils.degToRad(this.options.tilt);
    const cosine = Math.cos(angle);
    const sine = Math.sin(angle);
    return new THREE.Vector2(
      worldX * cosine - worldY * sine,
      worldX * sine + worldY * cosine,
    );
  }

  private sampleAlpha(x: number, y: number) {
    if (!this.artwork) return 0;
    const pixelX = clamp(Math.round(x), 0, this.artwork.width - 1);
    const pixelY = clamp(Math.round(y), 0, this.artwork.height - 1);
    return this.artwork.alpha[pixelY * this.artwork.width + pixelX] / 255;
  }

  private hitEdge(local: THREE.Vector2): EdgeHit | null {
    if (!this.artwork) return null;
    const u = local.x / this.meshWidth + 0.5;
    const v = local.y / this.meshHeight + 0.5;
    if (u < -0.04 || u > 1.04 || v < -0.04 || v > 1.04) return null;
    const pixelX = u * (this.artwork.width - 1);
    const pixelY = (1 - v) * (this.artwork.height - 1);
    const rect = this.renderer.domElement.getBoundingClientRect();
    const displayedWidth =
      (this.meshWidth / Math.max(this.viewWidth, 0.001)) * rect.width;
    const pixelsPerCss = this.artwork.width / Math.max(displayedWidth, 1);
    const radius = clamp(
      this.options.peel.grabWidth * pixelsPerCss,
      3,
      Math.min(this.artwork.width, this.artwork.height) * 0.13,
    );
    let minimum = this.sampleAlpha(pixelX, pixelY);
    let maximum = minimum;
    for (let index = 0; index < 20; index += 1) {
      const angle = (index / 20) * Math.PI * 2;
      const alpha = this.sampleAlpha(
        pixelX + Math.cos(angle) * radius,
        pixelY + Math.sin(angle) * radius,
      );
      minimum = Math.min(minimum, alpha);
      maximum = Math.max(maximum, alpha);
    }
    if (maximum < 0.12 || minimum > 0.88) return null;

    const delta = Math.max(2, radius * 0.46);
    const gradient = new THREE.Vector2(
      this.sampleAlpha(pixelX + delta, pixelY) -
        this.sampleAlpha(pixelX - delta, pixelY),
      -(
        this.sampleAlpha(pixelX, pixelY + delta) -
        this.sampleAlpha(pixelX, pixelY - delta)
      ),
    );
    if (gradient.lengthSq() < 0.008) gradient.set(-local.x, -local.y);
    if (gradient.lengthSq() < 0.0001) gradient.set(1, 0);
    gradient.normalize();
    return { local: local.clone(), inward: gradient };
  }

  private projectionExtent(origin: THREE.Vector2, direction: THREE.Vector2) {
    const corners = [
      new THREE.Vector2(-this.meshWidth / 2, -this.meshHeight / 2),
      new THREE.Vector2(this.meshWidth / 2, -this.meshHeight / 2),
      new THREE.Vector2(this.meshWidth / 2, this.meshHeight / 2),
      new THREE.Vector2(-this.meshWidth / 2, this.meshHeight / 2),
    ];
    return Math.max(
      this.meshHeight * 0.35,
      ...corners.map((corner) => corner.sub(origin).dot(direction)),
    );
  }

  private onPointerDown = (event: PointerEvent) => {
    if (this.destroyed || !this.state.ready || event.button !== 0) return;
    const local = this.screenToLocal(event.clientX, event.clientY);
    const hit = this.hitEdge(local);
    if (!hit) return;
    event.preventDefault();
    this.renderer.domElement.focus({ preventScroll: true });
    this.renderer.domElement.setPointerCapture(event.pointerId);
    this.pointerId = event.pointerId;
    this.grabOrigin.copy(hit.local);
    this.grabStart.copy(hit.local);
    this.grabDirection.copy(hit.inward);
    this.activeDirection.copy(hit.inward);
    this.grabExtent = this.projectionExtent(
      this.grabOrigin,
      this.activeDirection,
    );
    this.springActive = false;
    this.springVelocity = 0;
    this.state.dragging = true;
    this.state.progress = Math.max(this.state.progress, 0.018);
    this.state.grabPoint = { x: hit.local.x, y: hit.local.y };
    this.state.pointer = { x: hit.local.x, y: hit.local.y };
    this.renderer.domElement.style.cursor = "grabbing";
    this.updatePeelUniforms();
    this.emit("peelstart", {
      amount: this.state.progress,
      progress: this.state.progress,
      origin: this.state.grabPoint,
    });
    this.requestRender();
  };

  private onPointerMove = (event: PointerEvent) => {
    if (this.destroyed || !this.state.ready) return;
    const local = this.screenToLocal(event.clientX, event.clientY);
    if (!this.state.dragging || event.pointerId !== this.pointerId) {
      this.renderer.domElement.style.cursor = this.hitEdge(local)
        ? "grab"
        : "default";
      return;
    }

    event.preventDefault();
    const drag = local.clone().sub(this.grabStart);
    const distance = drag.length();
    this.activeDirection.copy(this.grabDirection);
    if (distance > 0.001) {
      const candidate = drag.clone().normalize();
      if (candidate.dot(this.grabDirection) > -0.35) {
        this.activeDirection
          .multiplyScalar(0.72)
          .add(candidate.multiplyScalar(0.28))
          .normalize();
      }
    }
    this.grabExtent = this.projectionExtent(
      this.grabOrigin,
      this.activeDirection,
    );
    const inwardDistance = Math.max(0, drag.dot(this.activeDirection));
    const effectiveDistance = inwardDistance * 0.76 + distance * 0.4;
    this.state.progress = clamp(
      effectiveDistance / Math.max(this.grabExtent * 0.64, 0.08),
      0.018,
      1,
    );
    this.state.pointer = { x: local.x, y: local.y };
    this.updatePeelUniforms();
    this.emit("peelchange", {
      amount: this.state.progress,
      progress: this.state.progress,
      direction: { x: this.activeDirection.x, y: this.activeDirection.y },
    });
    this.requestRender();
  };

  private onPointerUp = (event: PointerEvent) => {
    if (!this.state.dragging || event.pointerId !== this.pointerId) return;
    if (this.renderer.domElement.hasPointerCapture(event.pointerId)) {
      this.renderer.domElement.releasePointerCapture(event.pointerId);
    }
    this.pointerId = null;
    this.state.dragging = false;
    this.renderer.domElement.style.cursor = "grab";
    const release = this.options.peel.release;
    const shouldReset =
      release === "reset" || (release === "snap" && this.state.progress < 0.68);
    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (shouldReset && !reducedMotion) {
      this.springActive = true;
      this.springVelocity = 0;
    }
    this.emit("peelend", {
      amount: this.state.progress,
      progress: this.state.progress,
      willReset: shouldReset,
    });
    if (shouldReset && reducedMotion) {
      this.reset();
      return;
    }
    this.requestRender();
  };

  private onPointerLeave = () => {
    if (!this.state.dragging) this.renderer.domElement.style.cursor = "default";
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.state.ready) return;
    const increase = event.key === "ArrowUp" || event.key === "ArrowRight";
    const decrease = event.key === "ArrowDown" || event.key === "ArrowLeft";
    if (!increase && !decrease && event.key !== " ") return;
    event.preventDefault();
    if (event.key === " ") {
      this.reset();
      return;
    }
    this.grabOrigin.set(-this.meshWidth / 2, 0);
    this.activeDirection.set(1, 0);
    this.grabDirection.copy(this.activeDirection);
    this.grabExtent = this.meshWidth;
    this.state.progress = clamp(
      this.state.progress + (increase ? 0.08 : -0.08),
      0,
      1,
    );
    this.updatePeelUniforms();
    this.emit("peelchange", {
      amount: this.state.progress,
      progress: this.state.progress,
    });
    this.requestRender();
  };

  private onContextLost = (event: Event) => {
    event.preventDefault();
    this.emit("error", {
      message: "The WebGL context was lost. Reload the page to restore the sticker.",
    });
  };

  private requestRender() {
    if (this.destroyed || this.frameRequest) return;
    this.frameRequest = requestAnimationFrame(this.renderFrame);
  }

  private renderFrame = (time: number) => {
    this.frameRequest = 0;
    if (this.destroyed) return;
    const delta = this.lastFrameTime
      ? Math.min((time - this.lastFrameTime) / 1000, 1 / 20)
      : 1 / 60;
    this.lastFrameTime = time;

    const reducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches;
    if (this.springActive && reducedMotion) {
      this.reset();
      return;
    }

    if (this.springActive) {
      const stiffness = 132 + clamp(this.options.peel.stiffness, 0, 1) * 146;
      const damping = Math.sqrt(stiffness) * 1.83;
      const acceleration =
        -stiffness * this.state.progress - damping * this.springVelocity;
      this.springVelocity += acceleration * delta;
      this.state.progress += this.springVelocity * delta;
      if (
        this.state.progress <= 0.0008 &&
        Math.abs(this.springVelocity) < 0.018
      ) {
        this.state.progress = 0;
        this.springVelocity = 0;
        this.springActive = false;
        this.state.pointer = null;
        this.state.grabPoint = null;
      } else {
        this.state.progress = Math.max(0, this.state.progress);
      }
      this.updatePeelUniforms();
      this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress,
      });
    }

    this.uniforms.uTime.value = time / 1000;
    this.renderer.render(this.scene, this.camera);
    const windIsAnimating =
      !reducedMotion && this.options.wind > 0.001 && this.state.progress > 0.01;
    if (this.springActive || windIsAnimating) this.requestRender();
  };

  private emit(name: string, detail: Record<string, unknown>) {
    this.container.dispatchEvent(new CustomEvent(name, { detail }));
  }
}

export async function createSticker(
  target: HTMLElement | string,
  options: StickerOptions = {},
): Promise<StickerInstance> {
  if (typeof document === "undefined") {
    throw new Error("Sticker Forge can only be created in a browser.");
  }
  const container =
    typeof target === "string" ? document.querySelector<HTMLElement>(target) : target;
  if (!container) throw new Error("Sticker Forge could not find its target element.");
  const renderer = new StickerRenderer(container, options);
  await renderer.setSource(options.source ?? DEFAULT_SOURCE);
  return renderer;
}

const HTMLElementBase =
  typeof HTMLElement === "undefined"
    ? (class {} as typeof HTMLElement)
    : HTMLElement;

export class StickerForgeElement extends HTMLElementBase {
  static get observedAttributes() {
    return ["text"];
  }

  private instance: StickerInstance | null = null;
  private instancePromise: Promise<StickerInstance> | null = null;
  private mountElement: HTMLDivElement | null = null;
  private pendingOptions: Partial<StickerOptions> = {};
  private pendingSource: StickerSource | null = null;
  private lifecycleRevision = 0;

  connectedCallback() {
    if (!this.shadowRoot) {
      const shadow = this.attachShadow({ mode: "open" });
      const style = document.createElement("style");
      style.textContent = `
        :host { display: block; min-width: 160px; min-height: 120px; }
        .mount { width: 100%; height: 100%; min-height: inherit; }
      `;
      this.mountElement = document.createElement("div");
      this.mountElement.className = "mount";
      shadow.append(style, this.mountElement);
      for (const eventName of ["peelstart", "peelchange", "peelend", "error"]) {
        this.mountElement.addEventListener(eventName, (event) => {
          this.dispatchEvent(
            new CustomEvent(eventName, {
              detail: (event as CustomEvent).detail,
              bubbles: true,
              composed: true,
            }),
          );
        });
      }
    }
    if (!this.pendingSource) {
      this.pendingSource = {
        ...DEFAULT_SOURCE,
        text: this.getAttribute("text") || DEFAULT_SOURCE.text,
      };
    }
    void this.ensureInstance().catch(() => {
      // ensureInstance already forwards a useful error event.
    });
  }

  disconnectedCallback() {
    this.destroy();
  }

  attributeChangedCallback(name: string, oldValue: string | null, value: string | null) {
    if (name === "text" && oldValue !== value) {
      const source = { ...DEFAULT_SOURCE, text: value || " " };
      this.pendingSource = source;
      if (this.isConnected) {
        void this.setSource(source).catch(() => {
          // The instance forwards the source failure as an error event.
        });
      }
    }
  }

  async setSource(source: StickerSource): Promise<void> {
    this.pendingSource = source;
    const instance = await this.ensureInstance();
    await instance.setSource(source);
  }

  setOptions(options: Partial<StickerOptions>): void {
    this.pendingOptions = mergePublicOptions(this.pendingOptions, options);
    this.instance?.setOptions(options);
  }

  reset(): void {
    this.instance?.reset();
  }

  resize(): void {
    this.instance?.resize();
  }

  getState(): Readonly<StickerState> {
    return (
      this.instance?.getState() ?? {
        ready: false,
        dragging: false,
        progress: 0,
        grabPoint: null,
        pointer: null,
      }
    );
  }

  destroy(): void {
    this.lifecycleRevision += 1;
    const pending = this.instancePromise;
    this.instance?.destroy();
    this.instance = null;
    this.instancePromise = null;
    if (pending) {
      void pending.then((instance) => {
        instance.destroy();
      }).catch(() => {
        // A failed initialization has already emitted an error event.
      });
    }
  }

  private ensureInstance(): Promise<StickerInstance> {
    if (this.instance) return Promise.resolve(this.instance);
    if (this.instancePromise) return this.instancePromise;
    if (!this.mountElement) {
      return Promise.reject(new Error("The sticker element is not connected."));
    }
    const options = mergePublicOptions(this.pendingOptions, {
      source: this.pendingSource ?? DEFAULT_SOURCE,
    });
    const revision = this.lifecycleRevision;
    const pending = createSticker(this.mountElement, options);
    this.instancePromise = pending;
    void pending
      .then((instance) => {
        if (this.instancePromise === pending) this.instancePromise = null;
        if (revision !== this.lifecycleRevision || !this.isConnected) {
          instance.destroy();
          return;
        }
        this.instance = instance;
        this.dispatchEvent(
          new CustomEvent("ready", { bubbles: true, composed: true }),
        );
      })
      .catch((error: unknown) => {
        if (this.instancePromise === pending) this.instancePromise = null;
        const message =
          error instanceof Error
            ? error.message
            : "Sticker Forge could not initialize.";
        this.dispatchEvent(
          new CustomEvent("error", {
            detail: { message },
            bubbles: true,
            composed: true,
          }),
        );
      });
    return pending;
  }
}

export function defineStickerForge(tagName = "sticker-forge"): void {
  if (typeof customElements === "undefined") return;
  if (!customElements.get(tagName)) {
    const ElementClass =
      tagName === "sticker-forge"
        ? StickerForgeElement
        : class extends StickerForgeElement {};
    customElements.define(tagName, ElementClass);
  }
}
