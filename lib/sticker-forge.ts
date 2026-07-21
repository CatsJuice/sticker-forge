import * as THREE from "three";
import {
  peelShadowDepthFragmentShader,
  peelShadowDepthVertexShader,
  residueFragmentShader,
  residueVertexShader,
  stickerFragmentShader,
  stickerVertexShader,
} from "./shaders";
import {
  DEFAULT_PEEL_SOUND_URL,
  PeelAudioEngine,
} from "./peel-audio";
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
  StickerImageSource,
  StickerOptions,
  StickerOutlineOptions,
  StickerPeelOptions,
  StickerPoint,
  StickerRichTextBlock,
  StickerRichTextDocument,
  StickerRichTextRun,
  StickerShadowOptions,
  StickerSoundOptions,
  StickerSource,
  StickerState,
  StickerSvgSource,
  StickerTextSource,
} from "./types";
export { sanitizeSvgMarkup } from "./source";

const DEFAULT_SOURCE: StickerTextSource = {
  type: "text",
  text: "PEEL ME\n@cats_juice",
  color: "#19191d",
  fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
  fontWeight: 900,
  richText: {
    blocks: [
      {
        align: "center",
        lineHeight: 1.2,
        runs: [
          { text: "PEEL ", color: "#19191d", fontSize: 28, fontWeight: 900 },
          {
            text: "ME",
            color: "rgb(36, 126, 245)",
            fontSize: 28,
            fontWeight: 900,
          },
        ],
      },
      {
        align: "center",
        lineHeight: 0.8,
        runs: [
          {
            text: "@cats_juice",
            color: "#19191d",
            fontSize: 10,
            fontWeight: 500,
          },
        ],
      },
    ],
  },
};

const MIN_CURL_ANGLE = 2.55;
const MAX_CURL_ANGLE = Math.PI;
const MAX_FRONT_TO_POINTER_RATIO = 1.28;
const DIRECTION_DEAD_ZONE = 0.004;
const OUTWARD_DIRECTION_LIMIT = -0.22;
// Releasing a partially peeled sticker should reattach. The final quarter is
// reserved for the deliberate, long pull that completes the detachment.
const SNAP_DETACH_THRESHOLD = 0.74;
const MAX_STICKER_WIDTH_PX = 760;
const MAX_STICKER_HEIGHT_PX = 520;
const ENTRANCE_SCALE_DURATION = 0.72;
const ENTRANCE_SWEEP_DELAY = 0.06;
const ENTRANCE_SWEEP_DURATION = 0.42;
const INTERACTION_HINT_DURATION = 0.9;
const INTERACTION_HINT_COLOR = "#615cff";

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

function smoothstep(edge0: number, edge1: number, value: number) {
  const progress = clamp((value - edge0) / (edge1 - edge0), 0, 1);
  return progress * progress * (3 - 2 * progress);
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
    sound: { ...current.sound, ...patch.sound },
  };
}

class StickerRenderer implements StickerInstance {
  private readonly container: HTMLElement;
  private readonly renderer: THREE.WebGLRenderer;
  private readonly camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0.01, 10);
  private readonly scene = new THREE.Scene();
  private readonly uniforms: Record<string, THREE.IUniform>;
  private readonly stickerMaterial: THREE.ShaderMaterial;
  private readonly residueMaterial: THREE.ShaderMaterial;
  private readonly peelAudio = new PeelAudioEngine();
  private readonly peelShadowDepthMaterial: THREE.ShaderMaterial;
  private readonly groundShadowGeometry = new THREE.PlaneGeometry(1, 1);
  private readonly groundShadowMaterial: THREE.ShadowMaterial;
  private readonly stickerMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly residueMesh: THREE.Mesh<THREE.PlaneGeometry, THREE.ShaderMaterial>;
  private readonly groundShadowMesh: THREE.Mesh<
    THREE.PlaneGeometry,
    THREE.ShadowMaterial
  >;
  private readonly peelShadowLight = new THREE.DirectionalLight(0xffffff, 1);
  private readonly peelShadowTarget = new THREE.Object3D();
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
  private viewportHeightPx = 420;
  private meshWidth = 1.6;
  private meshHeight = 0.62;
  private pointerId: number | null = null;
  private grabOrigin = new THREE.Vector2(-0.8, 0);
  private grabStart = new THREE.Vector2();
  private grabDirection = new THREE.Vector2(1, 0);
  private activeDirection = new THREE.Vector2(1, 0);
  private grabExtent = 1.6;
  private creaseDepth = 0;
  private basePeelRadius = 0.08;
  private effectivePeelRadius = 0.08;
  private grabProjection = 0;
  private springVelocity = 0;
  private springActive = false;
  private detachedExitActive = false;
  private detachedExitElapsed = 0;
  private detachedExitSpin = 0;
  private entranceActive = false;
  private entranceElapsed = 0;
  private interactionHintActive = false;
  private interactionHintElapsed = 0;
  private readonly entranceAxis = new THREE.Vector2(1, 0);
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
    this.renderer.shadowMap.enabled = true;
    this.renderer.shadowMap.type = THREE.PCFShadowMap;
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
      uMaxAngle: { value: 3.55 },
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
      uEntranceSweep: { value: -1 },
      uEntranceAxis: { value: this.entranceAxis.clone() },
      uEntranceScaleProgress: { value: -1 },
      uInteractionHint: { value: 0 },
      uInteractionHintRadius: { value: 3 },
      uInteractionHintColor: {
        value: colorFrom(INTERACTION_HINT_COLOR, "#615cff"),
      },
    };

    const stickerUniforms = {
      ...THREE.UniformsUtils.clone(THREE.UniformsLib.lights),
      ...this.uniforms,
    };
    this.stickerMaterial = new THREE.ShaderMaterial({
      uniforms: stickerUniforms,
      vertexShader: stickerVertexShader,
      fragmentShader: stickerFragmentShader,
      lights: true,
      side: THREE.DoubleSide,
      transparent: true,
      depthTest: true,
      depthWrite: true,
    });
    this.stickerMaterial.alphaTest = 0.008;
    this.stickerMesh = new THREE.Mesh(this.geometry, this.stickerMaterial);
    this.stickerMesh.renderOrder = 20;
    this.stickerMesh.receiveShadow = true;

    this.residueMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: residueVertexShader,
      fragmentShader: residueFragmentShader,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });
    this.residueMesh = new THREE.Mesh(this.geometry, this.residueMaterial);
    this.residueMesh.position.z = -0.006;
    this.residueMesh.renderOrder = 10;

    this.peelShadowDepthMaterial = new THREE.ShaderMaterial({
      uniforms: { ...this.uniforms },
      vertexShader: peelShadowDepthVertexShader,
      fragmentShader: peelShadowDepthFragmentShader,
      side: THREE.DoubleSide,
      depthTest: true,
      depthWrite: true,
    });
    this.stickerMesh.castShadow = true;
    this.stickerMesh.customDepthMaterial = this.peelShadowDepthMaterial;

    this.peelShadowLight.castShadow = true;
    this.peelShadowLight.shadow.mapSize.set(
      this.options.quality === "high" ? 2048 : 1024,
      this.options.quality === "high" ? 2048 : 1024,
    );
    this.peelShadowLight.shadow.bias = -0.0001;
    this.peelShadowLight.shadow.normalBias = 0.0015;
    this.peelShadowLight.target = this.peelShadowTarget;
    this.scene.add(this.peelShadowTarget, this.peelShadowLight);

    this.groundShadowMaterial = new THREE.ShadowMaterial({
      color: colorFrom(this.options.shadow.color, "#191823"),
      opacity: this.options.shadow.opacity,
      transparent: true,
      depthTest: true,
      depthWrite: false,
      toneMapped: false,
    });
    this.groundShadowMesh = new THREE.Mesh(
      this.groundShadowGeometry,
      this.groundShadowMaterial,
    );
    this.groundShadowMesh.position.z = -0.012;
    this.groundShadowMesh.receiveShadow = true;
    this.groundShadowMesh.renderOrder = 5;
    this.scene.add(this.groundShadowMesh);
    this.scene.add(this.residueMesh);
    this.scene.add(this.stickerMesh);

    const canvas = this.renderer.domElement;
    canvas.addEventListener("pointerdown", this.onPointerDown);
    canvas.addEventListener("pointermove", this.onPointerMove);
    canvas.addEventListener("pointerup", this.onPointerUp);
    canvas.addEventListener("pointercancel", this.onPointerUp);
    canvas.addEventListener("lostpointercapture", this.onLostPointerCapture);
    canvas.addEventListener("pointerleave", this.onPointerLeave);
    canvas.addEventListener("keydown", this.onKeyDown);
    canvas.addEventListener("webglcontextlost", this.onContextLost);
    window.addEventListener("pointerup", this.onWindowPointerEnd, true);
    window.addEventListener("pointercancel", this.onWindowPointerEnd, true);
    window.addEventListener("blur", this.onWindowBlur);
    document.addEventListener("visibilitychange", this.onVisibilityChange);

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
    const activePointerId = this.pointerId;
    this.pointerId = null;
    this.state.dragging = false;
    if (
      activePointerId !== null &&
      this.renderer.domElement.hasPointerCapture(activePointerId)
    ) {
      this.renderer.domElement.releasePointerCapture(activePointerId);
    }
    this.springActive = false;
    this.springVelocity = 0;
    this.detachedExitActive = false;
    this.detachedExitElapsed = 0;
    this.detachedExitSpin = 0;
    this.entranceActive = false;
    this.entranceElapsed = 0;
    this.interactionHintActive = false;
    this.interactionHintElapsed = 0;
    this.stickerMesh.position.set(0, 0, 0);
    this.stickerMesh.scale.set(1, 1, 1);
    this.stickerMesh.rotation.z = THREE.MathUtils.degToRad(this.options.tilt);
    this.uniforms.uEntranceSweep.value = -1;
    this.uniforms.uEntranceScaleProgress.value = -1;
    this.uniforms.uInteractionHint.value = 0;
    this.peelAudio.reset(0);
    this.setCreaseDepth(0);
    this.state.pointer = null;
    this.state.grabPoint = null;
    this.renderer.domElement.style.cursor = "default";
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
    this.viewportHeightPx = height;
    this.viewHeight = 2;
    this.viewWidth = (width / height) * this.viewHeight;
    this.groundShadowMesh.scale.set(
      this.viewWidth * 1.2,
      this.viewHeight * 1.2,
      1,
    );
    this.camera.left = -this.viewWidth / 2;
    this.camera.right = this.viewWidth / 2;
    this.camera.top = this.viewHeight / 2;
    this.camera.bottom = -this.viewHeight / 2;
    this.camera.updateProjectionMatrix();
    const shadowCamera = this.peelShadowLight.shadow
      .camera as THREE.OrthographicCamera;
    const shadowExtent = Math.max(this.viewWidth, this.viewHeight) * 0.9;
    shadowCamera.left = -shadowExtent;
    shadowCamera.right = shadowExtent;
    shadowCamera.top = shadowExtent;
    shadowCamera.bottom = -shadowExtent;
    shadowCamera.near = 0.1;
    shadowCamera.far = 16;
    shadowCamera.updateProjectionMatrix();
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
    canvas.removeEventListener("lostpointercapture", this.onLostPointerCapture);
    canvas.removeEventListener("pointerleave", this.onPointerLeave);
    canvas.removeEventListener("keydown", this.onKeyDown);
    canvas.removeEventListener("webglcontextlost", this.onContextLost);
    window.removeEventListener("pointerup", this.onWindowPointerEnd, true);
    window.removeEventListener("pointercancel", this.onWindowPointerEnd, true);
    window.removeEventListener("blur", this.onWindowBlur);
    document.removeEventListener("visibilitychange", this.onVisibilityChange);

    this.texture?.dispose();
    this.geometry.dispose();
    this.groundShadowGeometry.dispose();
    this.stickerMaterial.dispose();
    this.residueMaterial.dispose();
    this.peelShadowDepthMaterial.dispose();
    this.groundShadowMaterial.dispose();
    this.peelAudio.destroy();
    this.renderer.dispose();
    this.renderer.forceContextLoss();
    canvas.remove();
  }

  private applyArtwork(artwork: PreparedArtwork) {
    this.artwork = artwork;
    const nextTexture = new THREE.CanvasTexture(artwork.canvas);
    nextTexture.colorSpace = THREE.SRGBColorSpace;
    nextTexture.minFilter = THREE.LinearMipmapLinearFilter;
    nextTexture.magFilter = THREE.LinearFilter;
    nextTexture.generateMipmaps = true;
    nextTexture.anisotropy = Math.min(
      8,
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
    this.emit("ready", {
      width: artwork.width,
      height: artwork.height,
      hasTransparency: artwork.hasTransparency,
    });
  }

  private updateMeshGeometry(aspect: number) {
    const worldUnitsPerPixel =
      this.viewHeight / Math.max(1, this.viewportHeightPx);
    const maxWidth = Math.min(
      this.viewWidth * 0.78,
      MAX_STICKER_WIDTH_PX * worldUnitsPerPixel,
    );
    const maxHeight = Math.min(
      this.viewHeight * 0.58,
      MAX_STICKER_HEIGHT_PX * worldUnitsPerPixel,
    );
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
        ? 240
        : this.options.quality === "medium"
          ? 160
          : 96;
    const segmentsX = clamp(Math.round(longSegments), 64, 256);
    const segmentsY = clamp(
      Math.round(longSegments / Math.max(aspect, 0.35)),
      56,
      192,
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
    this.residueMesh.geometry = nextGeometry;
    previousGeometry.dispose();
    (this.uniforms.uMeshSize.value as THREE.Vector2).set(
      this.meshWidth,
      this.meshHeight,
    );
    this.grabOrigin.set(-this.meshWidth / 2, 0);
    this.grabDirection.set(1, 0);
    this.activeDirection.copy(this.grabDirection);
    this.grabExtent = this.meshWidth;
    this.setCreaseDepth(0);
    this.applyOptionsToRenderer();
    this.updatePeelUniforms();
  }

  private applyOptionsToRenderer() {
    const angle = THREE.MathUtils.degToRad(this.options.tilt);
    this.stickerMesh.rotation.z = angle;
    this.residueMesh.rotation.z = angle;

    this.uniforms.uBackColor.value = colorFrom(
      this.options.back.color,
      "#f7f5f2",
    );
    this.uniforms.uGloss.value = clamp(this.options.back.gloss, 0, 1);
    this.uniforms.uRoughness.value = clamp(this.options.back.roughness, 0, 1);
    this.uniforms.uWind.value = Math.max(0, this.options.wind);

    const customSoundSource = this.options.sound.src.trim();
    this.peelAudio.configure({
      enabled: this.options.sound.enabled,
      src: customSoundSource || DEFAULT_PEEL_SOUND_URL,
      volume: this.options.sound.volume,
      useBuiltInProfile: !customSoundSource,
    });

    const rawAngle = this.options.peel.maxAngle;
    const angleInRadians =
      rawAngle > Math.PI * 2 ? THREE.MathUtils.degToRad(rawAngle) : rawAngle;
    this.uniforms.uMaxAngle.value = clamp(
      angleInRadians,
      MIN_CURL_ANGLE,
      MAX_CURL_ANGLE,
    );
    const radius = this.options.peel.radius;
    const rect = this.container.getBoundingClientRect();
    const configuredRadius =
      radius <= 1
        ? Math.max(0.008, Math.min(this.meshWidth, this.meshHeight) * radius)
        : Math.max(0.008, (radius / Math.max(rect.height, 1)) * this.viewHeight);
    this.basePeelRadius =
      configuredRadius *
      THREE.MathUtils.lerp(
        0.82,
        1.16,
        clamp(this.options.peel.stiffness, 0, 1),
      );
    this.setCreaseDepth(this.creaseDepth);

    this.uniforms.uShadowColor.value = colorFrom(
      this.options.shadow.color,
      "#191823",
    );
    this.uniforms.uShadowOpacity.value = clamp(
      this.options.shadow.opacity,
      0,
      0.9,
    );
    this.groundShadowMaterial.color.copy(
      colorFrom(this.options.shadow.color, "#191823"),
    );
    this.groundShadowMaterial.opacity = clamp(
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
    this.uniforms.uInteractionHintRadius.value = this.artwork
      ? clamp(
          this.options.peel.grabWidth * textureScale,
          3,
          Math.min(this.artwork.width, this.artwork.height) * 0.13,
        )
      : 3;
    this.uniforms.uShadowBlur.value =
      Math.max(0, this.options.shadow.blur) * textureScale * 0.34;
    this.uniforms.uShadowDistance.value =
      (Math.max(0, this.options.shadow.distance) /
        Math.max(rect.width || 1, 1)) *
      this.viewWidth;
    const shadowAngle = THREE.MathUtils.degToRad(this.options.shadow.angle);
    const shadowDirection = this.uniforms.uShadowDirection.value as THREE.Vector2;
    shadowDirection
      .set(Math.cos(shadowAngle), -Math.sin(shadowAngle))
      .normalize();
    const shadowDistance = this.uniforms.uShadowDistance.value as number;
    const lightOffset = 1.6 + shadowDistance * 34;
    this.peelShadowLight.position.set(
      -shadowDirection.x * lightOffset,
      -shadowDirection.y * lightOffset,
      4.8,
    );
    this.peelShadowTarget.position.set(0, 0, 0);
    this.peelShadowLight.shadow.radius = clamp(
      this.options.shadow.blur * 0.18,
      1,
      7,
    );
    const shadowMapSize = this.options.quality === "high" ? 2048 : 1024;
    this.peelShadowLight.shadow.mapSize.set(shadowMapSize, shadowMapSize);
    this.peelShadowLight.shadow.needsUpdate = true;
  }

  private updatePeelUniforms() {
    this.uniforms.uPeel.value = this.state.progress;
    this.uniforms.uPeelDepth.value = this.creaseDepth;
    this.uniforms.uRadius.value = this.effectivePeelRadius;
    (this.uniforms.uOrigin.value as THREE.Vector2).copy(this.grabOrigin);
    (this.uniforms.uPeelDir.value as THREE.Vector2).copy(this.activeDirection);
    const percent = Math.round(clamp(this.state.progress, 0, 1) * 100);
    this.renderer.domElement.setAttribute("aria-valuenow", String(percent));
    this.renderer.domElement.setAttribute("aria-valuetext", `${percent}% peeled`);
  }

  private projectedGrabDistance(
    depth: number,
    radius: number,
    maxAngle = this.uniforms.uMaxAngle.value as number,
  ) {
    if (depth <= 0) return 0;
    const safeRadius = Math.max(radius, 0.001);
    const angle = Math.min(depth / safeRadius, maxAngle);
    const arcLength = safeRadius * maxAngle;
    let projected = -safeRadius * Math.sin(angle);
    if (depth > arcLength) {
      projected -= (depth - arcLength) * Math.cos(maxAngle);
    }
    return Math.max(0, depth + projected);
  }

  private peelModelForDepth(depth: number) {
    const safeDepth = clamp(depth, 0, Math.max(this.grabExtent, 0.001));
    if (safeDepth <= 0.000001) {
      return {
        depth: 0,
        radius: this.basePeelRadius,
        projection: 0,
      };
    }

    const baseProjection = this.projectedGrabDistance(
      safeDepth,
      this.basePeelRadius,
    );
    const minimumProjection = safeDepth / MAX_FRONT_TO_POINTER_RATIO;
    if (baseProjection >= minimumProjection) {
      return {
        depth: safeDepth,
        radius: this.basePeelRadius,
        projection: baseProjection,
      };
    }

    const adaptiveRadius = safeDepth / MIN_CURL_ANGLE;
    return {
      depth: safeDepth,
      radius: adaptiveRadius,
      projection: this.projectedGrabDistance(safeDepth, adaptiveRadius),
    };
  }

  private setCreaseDepth(depth: number) {
    const model = this.peelModelForDepth(depth);
    this.creaseDepth = model.depth;
    this.effectivePeelRadius = model.radius;
    this.grabProjection = model.projection;
    this.state.progress = clamp(
      this.creaseDepth / Math.max(this.grabExtent, 0.001),
      0,
      1,
    );
  }

  private solveCreaseDepth(pointerDistance: number) {
    const target = Math.max(0, pointerDistance);
    const maximum = this.peelModelForDepth(this.grabExtent);
    if (target >= maximum.projection) return maximum.depth;
    if (target <= 0.000001) return 0;

    let low = 0;
    let high = this.grabExtent;
    for (let iteration = 0; iteration < 16; iteration += 1) {
      const middle = (low + high) * 0.5;
      if (this.peelModelForDepth(middle).projection < target) {
        low = middle;
      } else {
        high = middle;
      }
    }
    return (low + high) * 0.5;
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
    const searchRadius = Math.ceil(radius);
    const minimumX = Math.max(0, Math.floor(pixelX - searchRadius));
    const maximumX = Math.min(
      this.artwork.width - 1,
      Math.ceil(pixelX + searchRadius),
    );
    const minimumY = Math.max(0, Math.floor(pixelY - searchRadius));
    const maximumY = Math.min(
      this.artwork.height - 1,
      Math.ceil(pixelY + searchRadius),
    );
    let nearestX = -1;
    let nearestY = -1;
    let nearestDistanceSq = radius * radius + 1;
    for (let candidateY = minimumY; candidateY <= maximumY; candidateY += 1) {
      for (let candidateX = minimumX; candidateX <= maximumX; candidateX += 1) {
        const offsetX = candidateX - pixelX;
        const offsetY = candidateY - pixelY;
        const distanceSq = offsetX * offsetX + offsetY * offsetY;
        if (distanceSq >= nearestDistanceSq || distanceSq > radius * radius) {
          continue;
        }
        const alpha = this.sampleAlpha(candidateX, candidateY);
        if (alpha < 0.1) continue;
        const isBoundary =
          alpha < 0.9 ||
          this.sampleAlpha(candidateX - 1, candidateY) < 0.1 ||
          this.sampleAlpha(candidateX + 1, candidateY) < 0.1 ||
          this.sampleAlpha(candidateX, candidateY - 1) < 0.1 ||
          this.sampleAlpha(candidateX, candidateY + 1) < 0.1;
        if (!isBoundary) continue;
        nearestX = candidateX;
        nearestY = candidateY;
        nearestDistanceSq = distanceSq;
      }
    }
    if (nearestX < 0 || nearestY < 0) return null;

    const edgeLocal = new THREE.Vector2(
      (nearestX / Math.max(this.artwork.width - 1, 1) - 0.5) * this.meshWidth,
      (0.5 - nearestY / Math.max(this.artwork.height - 1, 1)) * this.meshHeight,
    );
    const delta = clamp(radius * 0.14, 1.5, 4.5);
    const gradient = new THREE.Vector2(
      this.sampleAlpha(nearestX + delta, nearestY) -
        this.sampleAlpha(nearestX - delta, nearestY),
      -(
        this.sampleAlpha(nearestX, nearestY + delta) -
        this.sampleAlpha(nearestX, nearestY - delta)
      ),
    );
    if (gradient.lengthSq() < 0.008) gradient.set(-edgeLocal.x, -edgeLocal.y);
    if (gradient.lengthSq() < 0.0001) gradient.set(1, 0);
    gradient.normalize();
    return { local: edgeLocal, inward: gradient };
  }

  private projectionExtent(origin: THREE.Vector2, direction: THREE.Vector2) {
    if (!this.artwork) return Math.max(this.meshHeight * 0.35, this.meshWidth);
    let maximum = this.meshHeight * 0.35;
    for (let index = 0; index < this.artwork.support.length; index += 2) {
      const localX = (this.artwork.support[index] - 0.5) * this.meshWidth;
      const localY = (0.5 - this.artwork.support[index + 1]) * this.meshHeight;
      maximum = Math.max(
        maximum,
        (localX - origin.x) * direction.x +
          (localY - origin.y) * direction.y,
      );
    }
    return Math.max(this.meshHeight * 0.35, maximum + this.meshHeight * 0.025);
  }

  private onPointerDown = (event: PointerEvent) => {
    if (
      this.destroyed ||
      !this.state.ready ||
      this.detachedExitActive ||
      this.entranceActive ||
      event.button !== 0
    ) return;
    const local = this.screenToLocal(event.clientX, event.clientY);
    const hit = this.hitEdge(local);
    if (!hit) {
      this.startInteractionHint();
      return;
    }
    this.interactionHintActive = false;
    this.interactionHintElapsed = 0;
    this.uniforms.uInteractionHint.value = 0;
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
      this.grabDirection,
    );
    this.setCreaseDepth(0);
    this.springActive = false;
    this.springVelocity = 0;
    this.state.dragging = true;
    this.state.grabPoint = { x: hit.local.x, y: hit.local.y };
    this.state.pointer = { x: local.x, y: local.y };
    this.renderer.domElement.style.cursor = "grabbing";
    this.peelAudio.unlock();
    this.peelAudio.begin(this.state.progress, event.timeStamp);
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
    if (
      this.state.dragging &&
      event.pointerId === this.pointerId &&
      event.buttons === 0
    ) {
      this.finishPointerDrag(event.timeStamp);
      return;
    }
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
    let pointerDistance = 0;
    if (distance > DIRECTION_DEAD_ZONE) {
      const candidate = drag.clone().normalize();
      if (candidate.dot(this.grabDirection) >= OUTWARD_DIRECTION_LIMIT) {
        this.activeDirection.copy(candidate);
        pointerDistance = distance;
      } else {
        this.activeDirection.copy(this.grabDirection);
        pointerDistance = Math.max(0, drag.dot(this.grabDirection));
      }
    } else {
      this.activeDirection.copy(this.grabDirection);
    }
    this.grabExtent = this.projectionExtent(
      this.grabOrigin,
      this.activeDirection,
    );
    this.setCreaseDepth(this.solveCreaseDepth(pointerDistance));
    this.peelAudio.update(
      this.state.progress,
      event.timeStamp,
      this.activeDirection.x,
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
    this.finishPointerDrag(event.timeStamp);
  };

  private onWindowPointerEnd = (event: PointerEvent) => {
    if (!this.state.dragging || event.pointerId !== this.pointerId) return;
    this.finishPointerDrag(event.timeStamp);
  };

  private onLostPointerCapture = (event: PointerEvent) => {
    if (!this.state.dragging || event.pointerId !== this.pointerId) return;
    this.finishPointerDrag(event.timeStamp);
  };

  private onWindowBlur = () => {
    this.finishPointerDrag(performance.now());
  };

  private onVisibilityChange = () => {
    if (document.visibilityState === "hidden") {
      this.finishPointerDrag(performance.now());
    }
  };

  private finishPointerDrag(timeStamp: number) {
    if (!this.state.dragging) return;
    const activePointerId = this.pointerId;
    this.pointerId = null;
    this.state.dragging = false;
    if (
      activePointerId !== null &&
      this.renderer.domElement.hasPointerCapture(activePointerId)
    ) {
      this.renderer.domElement.releasePointerCapture(activePointerId);
    }
    this.renderer.domElement.style.cursor = "grab";
    const release = this.options.peel.release;
    const shouldDetach =
      release === "snap" && this.state.progress >= SNAP_DETACH_THRESHOLD;
    if (shouldDetach) {
      this.setCreaseDepth(this.grabExtent);
      this.state.pointer = {
        x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
        y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection,
      };
      this.updatePeelUniforms();
      this.peelAudio.update(
        this.state.progress,
        timeStamp,
        this.activeDirection.x,
      );
    }
    this.peelAudio.end(this.state.progress);
    const shouldReset =
      release === "reset" || (release === "snap" && !shouldDetach);
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
    if (shouldDetach) {
      if (reducedMotion) {
        this.reset();
        return;
      }
      this.detachedExitActive = true;
      this.detachedExitElapsed = 0;
      this.detachedExitSpin = this.activeDirection.x >= 0 ? -0.42 : 0.42;
    }
    if (shouldReset && reducedMotion) {
      this.reset();
      return;
    }
    this.requestRender();
  }

  private onPointerLeave = () => {
    if (!this.state.dragging) this.renderer.domElement.style.cursor = "default";
  };

  private onKeyDown = (event: KeyboardEvent) => {
    if (!this.state.ready) return;
    const increase = event.key === "ArrowUp" || event.key === "ArrowRight";
    const decrease = event.key === "ArrowDown" || event.key === "ArrowLeft";
    if (!increase && !decrease && event.key !== " ") return;
    event.preventDefault();
    this.peelAudio.unlock();
    if (event.key === " ") {
      this.reset();
      return;
    }
    this.grabOrigin.set(-this.meshWidth / 2, 0);
    this.activeDirection.set(1, 0);
    this.grabDirection.copy(this.activeDirection);
    this.grabExtent = this.meshWidth;
    const previousProgress = this.state.progress;
    const nextProgress = clamp(
      previousProgress + (increase ? 0.08 : -0.08),
      0,
      1,
    );
    this.setCreaseDepth(nextProgress * this.grabExtent);
    this.peelAudio.begin(previousProgress, event.timeStamp - 72);
    this.peelAudio.update(
      this.state.progress,
      event.timeStamp,
      this.activeDirection.x,
    );
    this.peelAudio.end(this.state.progress);
    this.state.pointer = {
      x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
      y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection,
    };
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

  private startInteractionHint() {
    this.interactionHintActive = true;
    this.interactionHintElapsed = 0;
    this.uniforms.uInteractionHint.value = 1;
    this.requestRender();
  }

  private startEntranceAnimation() {
    this.reset();
    this.peelAudio.playReappear();
    this.entranceActive = true;
    this.entranceElapsed = 0;
    this.entranceAxis.set(
      this.meshWidth >= this.meshHeight ? 1 : 0,
      this.meshWidth >= this.meshHeight ? 0 : -1,
    );
    (this.uniforms.uEntranceAxis.value as THREE.Vector2).copy(
      this.entranceAxis,
    );
    this.uniforms.uEntranceSweep.value = -1;
    this.uniforms.uEntranceScaleProgress.value = 0;
    this.requestRender();
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
        -stiffness * this.creaseDepth - damping * this.springVelocity;
      this.springVelocity += acceleration * delta;
      const nextDepth = this.creaseDepth + this.springVelocity * delta;
      if (
        nextDepth <= this.grabExtent * 0.0008 &&
        Math.abs(this.springVelocity) < this.grabExtent * 0.018
      ) {
        this.setCreaseDepth(0);
        this.springVelocity = 0;
        this.springActive = false;
        this.state.pointer = null;
        this.state.grabPoint = null;
      } else {
        this.setCreaseDepth(Math.max(0, nextDepth));
        this.state.pointer = {
          x: this.grabOrigin.x + this.activeDirection.x * this.grabProjection,
          y: this.grabOrigin.y + this.activeDirection.y * this.grabProjection,
        };
      }
      this.updatePeelUniforms();
      this.emit("peelchange", {
        amount: this.state.progress,
        progress: this.state.progress,
      });
    }

    if (this.detachedExitActive) {
      this.detachedExitElapsed += delta;
      const exitSpeed =
        Math.max(this.viewWidth, this.viewHeight) *
        (1.45 + this.detachedExitElapsed * 3.2);
      this.stickerMesh.position.x +=
        this.activeDirection.x * exitSpeed * delta;
      this.stickerMesh.position.y +=
        this.activeDirection.y * exitSpeed * delta;
      this.stickerMesh.rotation.z += this.detachedExitSpin * delta;
      if (this.detachedExitElapsed >= 0.46) {
        this.startEntranceAnimation();
        return;
      }
    }

    if (this.entranceActive) {
      this.entranceElapsed += delta;
      const scaleProgress = clamp(
        this.entranceElapsed / ENTRANCE_SCALE_DURATION,
        0,
        1,
      );
      this.uniforms.uEntranceScaleProgress.value = scaleProgress;

      const sweepStart = ENTRANCE_SWEEP_DELAY;
      const sweepProgress = clamp(
        (this.entranceElapsed - sweepStart) / ENTRANCE_SWEEP_DURATION,
        0,
        1,
      );
      this.uniforms.uEntranceSweep.value =
        this.entranceElapsed < sweepStart ? -1 : sweepProgress;

      if (scaleProgress >= 1 && sweepProgress >= 1) {
        this.entranceActive = false;
        this.uniforms.uEntranceScaleProgress.value = -1;
        this.uniforms.uEntranceSweep.value = -1;
      }
    }

    if (this.interactionHintActive) {
      this.interactionHintElapsed += delta;
      const hintProgress = clamp(
        this.interactionHintElapsed / INTERACTION_HINT_DURATION,
        0,
        1,
      );
      if (reducedMotion) {
        this.uniforms.uInteractionHint.value = hintProgress < 0.72 ? 1 : 0;
      } else {
        const fadeIn = smoothstep(0, 0.12, hintProgress);
        const fadeOut = 1 - smoothstep(0.58, 1, hintProgress);
        const pulse = 0.9 + Math.sin(hintProgress * Math.PI * 2) * 0.1;
        this.uniforms.uInteractionHint.value = fadeIn * fadeOut * pulse;
      }
      if (hintProgress >= 1) {
        this.interactionHintActive = false;
        this.uniforms.uInteractionHint.value = 0;
      }
    }

    this.uniforms.uTime.value = time / 1000;
    this.renderer.render(this.scene, this.camera);
    const windIsAnimating =
      !reducedMotion && this.options.wind > 0.001 && this.state.progress > 0.01;
    if (
      this.springActive ||
      this.detachedExitActive ||
      this.entranceActive ||
      this.interactionHintActive ||
      windIsAnimating
    ) {
      this.requestRender();
    }
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
