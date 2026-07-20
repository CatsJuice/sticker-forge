"use client";

import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type CSSProperties,
  type ChangeEvent,
  type DragEvent,
} from "react";
import type {
  StickerInstance,
  StickerOptions,
  StickerSource,
} from "@/lib/sticker-forge";

type StickerController = StickerInstance;
type SourceMode = "text" | "svg";

type StudioSettings = {
  outline: { width: number; color: string };
  shadow: {
    opacity: number;
    blur: number;
    distance: number;
    angle: number;
    color: string;
  };
  peel: {
    radius: number;
    stiffness: number;
    grabWidth: number;
    maxAngle: number;
    release: "reset";
  };
  back: { color: string; gloss: number; roughness: number };
  tilt: number;
  wind: number;
  quality: "high";
};

const DEFAULT_TEXT = "PEEL ME";
const DEFAULT_INK = "#19191d";

const DEFAULT_SETTINGS: StudioSettings = {
  outline: { width: 18, color: "#ffffff" },
  shadow: {
    opacity: 0.22,
    blur: 22,
    distance: 16,
    angle: 42,
    color: "#191823",
  },
  peel: {
    radius: 0.12,
    stiffness: 0.72,
    grabWidth: 22,
    maxAngle: 3.55,
    release: "reset",
  },
  back: { color: "#f7f5f2", gloss: 0.7, roughness: 0.3 },
  tilt: -3,
  wind: 0,
  quality: "high",
};

function makeTextSource(text: string, color: string): StickerSource {
  return {
    type: "text",
    text: text.trim() || " ",
    fontFamily: "Arial Rounded MT Bold, Arial Black, sans-serif",
    fontWeight: 900,
    color,
  };
}

function asStickerOptions(
  source: StickerSource,
  settings: StudioSettings,
): StickerOptions {
  return { source, ...settings };
}

function stringifyForInlineScript(value: unknown, space?: number): string {
  return (JSON.stringify(value, null, space) ?? "null").replace(
    /</g,
    "\\u003c",
  );
}

function RangeRow({
  id,
  label,
  min,
  max,
  step,
  value,
  display,
  onChange,
}: {
  id: string;
  label: string;
  min: number;
  max: number;
  step: number;
  value: number;
  display: string;
  onChange: (value: number) => void;
}) {
  const fill = ((value - min) / (max - min)) * 100;
  const rangeStyle = { "--range-fill": `${fill}%` } as CSSProperties;

  return (
    <div className="range-row">
      <div className="range-meta">
        <label className="range-label" htmlFor={id}>
          {label}
        </label>
        <output className="range-value" htmlFor={id}>
          {display}
        </output>
      </div>
      <input
        className="range-control"
        id={id}
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        style={rangeStyle}
        onChange={(event) => onChange(Number(event.target.value))}
      />
    </div>
  );
}

export function StickerForgeStudio() {
  const initialSource = useMemo(
    () => makeTextSource(DEFAULT_TEXT, DEFAULT_INK),
    [],
  );
  const stageRef = useRef<HTMLDivElement>(null);
  const controllerRef = useRef<StickerController | null>(null);
  const textTimerRef = useRef<number | null>(null);
  const sourceRevisionRef = useRef(0);
  const sourceRef = useRef<StickerSource>(initialSource);
  const settingsRef = useRef<StudioSettings>(DEFAULT_SETTINGS);
  const [sourceMode, setSourceMode] = useState<SourceMode>("text");
  const [text, setText] = useState(DEFAULT_TEXT);
  const [inkColor, setInkColor] = useState(DEFAULT_INK);
  const [svgMarkup, setSvgMarkup] = useState("");
  const [svgName, setSvgName] = useState("");
  const [settings, setSettings] =
    useState<StudioSettings>(DEFAULT_SETTINGS);
  const [peelAmount, setPeelAmount] = useState(0);
  const [draggingFile, setDraggingFile] = useState(false);
  const [sourceMessage, setSourceMessage] = useState("仅在浏览器本地处理");
  const [copied, setCopied] = useState(false);
  const [rendererStatus, setRendererStatus] = useState<
    "loading" | "ready" | "error"
  >("loading");

  useEffect(() => {
    const host = stageRef.current;
    if (!host) return;
    let disposed = false;
    let controller: StickerController | null = null;

    const handlePeel = (event: Event) => {
      const detail = (event as CustomEvent<{ amount?: number }>).detail;
      setPeelAmount(Math.max(0, Math.min(1, detail?.amount ?? 0)));
    };
    const handlePeelEnd = () => {
      if (settingsRef.current.peel.release === "reset") {
        window.setTimeout(() => setPeelAmount(0), 460);
      }
    };
    const handleError = (event: Event) => {
      const detail = (event as CustomEvent<{ message?: string }>).detail;
      const message = detail?.message || "渲染器已切换为兼容模式";
      setSourceMessage(message);
      if (/WebGL context|WebGL is unavailable/i.test(message)) {
        setRendererStatus("error");
      }
    };

    const initialize = async () => {
      try {
        const { createSticker } = await import("@/lib/sticker-forge");
        const sourceAtStart = sourceRef.current;
        const settingsAtStart = settingsRef.current;
        const instance = await createSticker(
          host,
          asStickerOptions(sourceAtStart, settingsAtStart),
        );
        if (disposed) {
          instance.destroy();
          return;
        }
        controller = instance;
        controllerRef.current = instance;
        host.addEventListener("peelchange", handlePeel);
        host.addEventListener("peelend", handlePeelEnd);
        host.addEventListener("error", handleError);
        if (settingsRef.current !== settingsAtStart) {
          instance.setOptions(settingsRef.current);
        }
        if (sourceRef.current !== sourceAtStart) {
          try {
            await instance.setSource(sourceRef.current);
          } catch {
            // The renderer keeps the previous valid artwork and reports the source error.
          }
        }
        if (!disposed) {
          setRendererStatus("ready");
          setSourceMessage((message) =>
            message.replace(" · 等待材质就绪", ""),
          );
        }
      } catch {
        setSourceMessage("当前浏览器无法启动实时材质");
        setRendererStatus("error");
      }
    };
    void initialize();

    return () => {
      disposed = true;
      if (controller) {
        host.removeEventListener("peelchange", handlePeel);
        host.removeEventListener("peelend", handlePeelEnd);
        host.removeEventListener("error", handleError);
      }
      if (textTimerRef.current) window.clearTimeout(textTimerRef.current);
      sourceRevisionRef.current += 1;
      controller?.destroy();
      controllerRef.current = null;
    };
  }, [initialSource]);

  const updateOptions = useCallback((partial: StickerOptions) => {
    controllerRef.current?.setOptions(partial);
  }, []);

  const updateSetting = useCallback(
    <K extends keyof StudioSettings>(key: K, value: StudioSettings[K]) => {
      const next = { ...settingsRef.current, [key]: value } as StudioSettings;
      settingsRef.current = next;
      setSettings(next);
      updateOptions({ [key]: value } as StickerOptions);
    },
    [updateOptions],
  );

  const clearPendingText = useCallback(() => {
    if (textTimerRef.current !== null) {
      window.clearTimeout(textTimerRef.current);
      textTimerRef.current = null;
    }
  }, []);

  const applySource = useCallback(
    async (source: StickerSource, successMessage?: string) => {
      clearPendingText();
      const revision = ++sourceRevisionRef.current;
      sourceRef.current = source;
      const instance = controllerRef.current;
      if (!instance) {
        if (successMessage) setSourceMessage(`${successMessage} · 等待材质就绪`);
        return;
      }
      try {
        await instance.setSource(source);
        if (revision === sourceRevisionRef.current && successMessage) {
          setSourceMessage(successMessage);
        }
      } catch {
        if (revision === sourceRevisionRef.current) {
          setSourceMessage("素材处理失败，已保留上一张贴纸");
        }
      }
    },
    [clearPendingText],
  );

  const updateTextSource = useCallback(
    (nextText: string, nextColor: string) => {
      clearPendingText();
      const source = makeTextSource(nextText, nextColor);
      const revision = ++sourceRevisionRef.current;
      sourceRef.current = source;
      textTimerRef.current = window.setTimeout(() => {
        textTimerRef.current = null;
        const instance = controllerRef.current;
        if (!instance || revision !== sourceRevisionRef.current) return;
        void instance.setSource(source).catch(() => {
          if (revision === sourceRevisionRef.current) {
            setSourceMessage("文字素材处理失败，已保留上一张贴纸");
          }
        });
      }, 90);
    },
    [clearPendingText],
  );

  const handleTextChange = (event: ChangeEvent<HTMLInputElement>) => {
    const nextText = event.target.value.slice(0, 28);
    setText(nextText);
    setSourceMode("text");
    updateTextSource(nextText, inkColor);
  };

  const handleInkChange = (nextColor: string) => {
    setInkColor(nextColor);
    if (sourceMode === "text") updateTextSource(text, nextColor);
  };

  const loadSvgFile = useCallback(
    async (file?: File) => {
      if (!file) return;
      if (!file.name.toLowerCase().endsWith(".svg")) {
        setSourceMessage("请选择 .svg 文件");
        return;
      }
      if (file.size > 2_000_000) {
        setSourceMessage("SVG 需要小于 2 MB");
        return;
      }

      clearPendingText();
      const readRevision = ++sourceRevisionRef.current;
      setSourceMessage(`${file.name} · 正在本地读取`);
      try {
        const markup = await file.text();
        if (readRevision !== sourceRevisionRef.current) return;
        if (!/<svg[\s>]/i.test(markup)) throw new Error("Invalid SVG");
        setSvgMarkup(markup);
        setSvgName(file.name);
        setSourceMode("svg");
        await applySource(
          { type: "svg", svg: markup },
          `${file.name} · 本地处理完成`,
        );
      } catch {
        if (readRevision === sourceRevisionRef.current) {
          setSourceMessage("这个 SVG 无法读取，请换一个试试");
        }
      }
    },
    [applySource, clearPendingText],
  );

  const handleDrop = (event: DragEvent<HTMLLabelElement>) => {
    event.preventDefault();
    setDraggingFile(false);
    void loadSvgFile(event.dataTransfer.files[0]);
  };

  const switchSourceMode = (mode: SourceMode) => {
    setSourceMode(mode);
    if (mode === "text") {
      void applySource(makeTextSource(text, inkColor));
    } else if (svgMarkup) {
      void applySource({ type: "svg", svg: svgMarkup });
    } else {
      clearPendingText();
      sourceRevisionRef.current += 1;
      setSourceMessage("请先上传一个 SVG 文件");
    }
  };

  const resetStudio = () => {
    setText(DEFAULT_TEXT);
    setInkColor(DEFAULT_INK);
    setSourceMode("text");
    setSvgMarkup("");
    setSvgName("");
    setSettings(DEFAULT_SETTINGS);
    settingsRef.current = DEFAULT_SETTINGS;
    setPeelAmount(0);
    setSourceMessage("参数已恢复默认值");
    controllerRef.current?.reset();
    controllerRef.current?.setOptions(DEFAULT_SETTINGS);
    void applySource(makeTextSource(DEFAULT_TEXT, DEFAULT_INK));
  };

  const buildEmbedSnippet = () => {
    const origin = window.location.origin;
    const source: StickerSource =
      sourceMode === "svg" && svgMarkup
        ? { type: "svg", svg: svgMarkup }
        : makeTextSource(text, inkColor);

    return `<script type="module" src="${origin}/embed/sticker-forge.es.js"></script>

<sticker-forge id="my-sticker" style="display:block;width:640px;height:420px"></sticker-forge>

<script type="module">
  const sticker = document.querySelector("#my-sticker");
  await sticker.setSource(${stringifyForInlineScript(source, 2)});
  sticker.setOptions(${stringifyForInlineScript(settings, 2)});
</script>`;
  };

  const copyEmbedCode = async () => {
    try {
      await navigator.clipboard.writeText(buildEmbedSnippet());
      setCopied(true);
      window.setTimeout(() => setCopied(false), 1800);
    } catch {
      setSourceMessage("浏览器阻止了复制，请在 HTTPS 页面重试");
    }
  };

  return (
    <main className="studio-shell">
      <header className="studio-header">
        <div className="brand-lockup">
          <span className="brand-mark" aria-hidden="true" />
          <div className="brand-copy">
            <h1 className="brand-title">STICKER FORGE</h1>
            <p className="brand-subtitle">把平面素材，变成有触感的贴纸</p>
          </div>
        </div>
        <div className="header-actions">
          <span
            className="status-chip"
            data-status={rendererStatus}
            role="status"
            aria-live="polite"
          >
            <span className="status-dot" aria-hidden="true" />
            <span>
              {rendererStatus === "ready"
                ? "WebGL ready"
                : rendererStatus === "error"
                  ? "WebGL unavailable"
                  : "Preparing"}
            </span>
          </span>
        </div>
      </header>

      <div className="studio-main">
        <section className="stage-card" aria-label="交互式贴纸预览">
          <div className="stage-topbar">
            <span className="mode-note">Live material</span>
            <div
              className="peel-meter"
              role="progressbar"
              aria-label="撕起进度"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(peelAmount * 100)}
            >
              <span>Peel</span>
              <span className="peel-meter-track" aria-hidden="true">
                <span
                  className="peel-meter-fill"
                  style={{ "--peel-progress": `${peelAmount * 100}%` } as CSSProperties}
                />
              </span>
              <span>{Math.round(peelAmount * 100)}%</span>
            </div>
          </div>
          <div className="sticker-stage">
            <div
              ref={stageRef}
              className="sticker-host"
              data-testid="sticker-stage"
              role="group"
              aria-label="可以从轮廓边缘拖拽撕起的交互贴纸"
            />
          </div>
          <div className="stage-hint">
            <span className="drag-glyph" aria-hidden="true">↗</span>
            从任意白色轮廓边缘向内拖拽
          </div>
        </section>

        <aside className="controls-card" aria-label="贴纸参数">
          <div className="controls-header">
            <div className="controls-heading-row">
              <div>
                <h2 className="controls-title">贴纸实验台</h2>
                <p className="controls-description">输入素材，再调到刚刚好的手感。</p>
              </div>
              <button
                className="icon-button"
                type="button"
                onClick={resetStudio}
                aria-label="恢复默认参数"
                title="恢复默认参数"
              >
                ↺
              </button>
            </div>
          </div>

          <div className="controls-scroll">
            <div className="source-tabs" aria-label="素材类型">
              <button
                className="source-tab"
                type="button"
                aria-pressed={sourceMode === "text"}
                data-active={sourceMode === "text"}
                onClick={() => switchSourceMode("text")}
              >
                文字
              </button>
              <button
                className="source-tab"
                type="button"
                aria-pressed={sourceMode === "svg"}
                data-active={sourceMode === "svg"}
                onClick={() => switchSourceMode("svg")}
              >
                SVG
              </button>
            </div>

            <div className="source-panel">
              {sourceMode === "text" ? (
                <>
                  <label className="field-label" htmlFor="sticker-text">
                    贴纸文字
                  </label>
                  <input
                    className="text-field"
                    id="sticker-text"
                    value={text}
                    maxLength={28}
                    placeholder="输入文字"
                    onChange={handleTextChange}
                  />
                  <div className="color-field-row">
                    <span className="color-value">{inkColor}</span>
                    <input
                      className="color-picker"
                      type="color"
                      value={inkColor}
                      aria-label="文字颜色"
                      onChange={(event) => handleInkChange(event.target.value)}
                    />
                  </div>
                </>
              ) : (
                <>
                  <span className="field-label">上传 SVG 素材</span>
                  <label
                    className="upload-zone"
                    data-dragging={draggingFile}
                    onDragEnter={() => setDraggingFile(true)}
                    onDragLeave={() => setDraggingFile(false)}
                    onDragOver={(event) => event.preventDefault()}
                    onDrop={handleDrop}
                  >
                    <span className="upload-icon" aria-hidden="true">＋</span>
                    <strong>{svgName || "点击选择，或拖到这里"}</strong>
                    <span>{sourceMessage}</span>
                    <input
                      className="sr-only"
                      type="file"
                      accept="image/svg+xml,.svg"
                      onChange={(event) => void loadSvgFile(event.target.files?.[0])}
                    />
                  </label>
                </>
              )}
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>轮廓与姿态</h3>
              <span>Surface</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="outline-width"
                label="描边宽度"
                min={0}
                max={44}
                step={1}
                value={settings.outline.width}
                display={`${settings.outline.width}px`}
                onChange={(width) =>
                  updateSetting("outline", { ...settings.outline, width })
                }
              />
              <RangeRow
                id="tilt"
                label="整体倾斜"
                min={-12}
                max={12}
                step={0.5}
                value={settings.tilt}
                display={`${settings.tilt.toFixed(1)}°`}
                onChange={(value) => updateSetting("tilt", value)}
              />
            </div>
            <div className="dual-color-row">
              <label className="compact-color">
                <span>描边</span>
                <input
                  type="color"
                  value={settings.outline.color}
                  aria-label="描边颜色"
                  onChange={(event) =>
                    updateSetting("outline", {
                      ...settings.outline,
                      color: event.target.value,
                    })
                  }
                />
              </label>
              <label className="compact-color">
                <span>背胶</span>
                <input
                  type="color"
                  value={settings.back.color}
                  aria-label="贴纸背面颜色"
                  onChange={(event) =>
                    updateSetting("back", {
                      ...settings.back,
                      color: event.target.value,
                    })
                  }
                />
              </label>
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>撕起手感</h3>
              <span>Peel physics</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="curl-radius"
                label="卷曲半径"
                min={0.08}
                max={0.2}
                step={0.005}
                value={settings.peel.radius}
                display={settings.peel.radius.toFixed(3)}
                onChange={(radius) =>
                  updateSetting("peel", { ...settings.peel, radius })
                }
              />
              <RangeRow
                id="stiffness"
                label="贴纸硬度"
                min={0.4}
                max={0.95}
                step={0.01}
                value={settings.peel.stiffness}
                display={`${Math.round(settings.peel.stiffness * 100)}%`}
                onChange={(stiffness) =>
                  updateSetting("peel", { ...settings.peel, stiffness })
                }
              />
              <RangeRow
                id="wind"
                label="风动"
                min={0}
                max={1.5}
                step={0.05}
                value={settings.wind}
                display={settings.wind.toFixed(2)}
                onChange={(value) => updateSetting("wind", value)}
              />
            </div>

            <div className="section-divider" />
            <div className="section-heading">
              <h3>材质与阴影</h3>
              <span>Light</span>
            </div>
            <div className="range-stack">
              <RangeRow
                id="shadow-opacity"
                label="阴影强度"
                min={0}
                max={0.5}
                step={0.01}
                value={settings.shadow.opacity}
                display={settings.shadow.opacity.toFixed(2)}
                onChange={(opacity) =>
                  updateSetting("shadow", { ...settings.shadow, opacity })
                }
              />
              <RangeRow
                id="shadow-blur"
                label="阴影柔度"
                min={4}
                max={42}
                step={1}
                value={settings.shadow.blur}
                display={`${settings.shadow.blur}px`}
                onChange={(blur) =>
                  updateSetting("shadow", { ...settings.shadow, blur })
                }
              />
              <RangeRow
                id="back-gloss"
                label="背面光泽"
                min={0}
                max={1}
                step={0.01}
                value={settings.back.gloss}
                display={`${Math.round(settings.back.gloss * 100)}%`}
                onChange={(gloss) =>
                  updateSetting("back", { ...settings.back, gloss })
                }
              />
            </div>
          </div>

          <div className="controls-footer">
            <button
              className="primary-button"
              type="button"
              data-copied={copied}
              onClick={copyEmbedCode}
            >
              {copied ? "✓ 已复制代码" : "复制嵌入代码"}
            </button>
            <button
              className="secondary-button"
              type="button"
              onClick={resetStudio}
              aria-label="重置贴纸"
              title="重置贴纸"
            >
              ↺
            </button>
          </div>
        </aside>
      </div>
      <span className="sr-only" aria-live="polite">
        {copied ? "嵌入代码已复制" : sourceMessage}
      </span>
    </main>
  );
}
