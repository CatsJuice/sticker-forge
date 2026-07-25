import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";

test("turns the desktop sidebar into a cancellable no-outline sticker", async () => {
  const [component, studio, styles, shaders, debugPanel, debugSettings] = await Promise.all([
    readFile(
      new URL("../app/SidebarPeelEasterEgg.tsx", import.meta.url),
      "utf8",
    ),
    readFile(new URL("../app/StickerForgeStudio.tsx", import.meta.url), "utf8"),
    readFile(new URL("../app/globals.css", import.meta.url), "utf8"),
    readFile(new URL("../lib/shaders.ts", import.meta.url), "utf8"),
    readFile(new URL("../app/DebugPanel.tsx", import.meta.url), "utf8"),
    readFile(new URL("../lib/sidebar-peel-debug.ts", import.meta.url), "utf8"),
  ]);

  assert.match(component, /"top-left"[\s\S]*"top-right"[\s\S]*"bottom-left"[\s\S]*"bottom-right"/);
  assert.match(component, /import \{ domToCanvas \} from "modern-screenshot"/);
  assert.match(component, /domToCanvas\(element,/);
  assert.match(component, /domToCanvas\(panelToggle,/);
  assert.match(component, /backgroundColor: "#fff"/);
  assert.match(component, /capturedToggleCanvas[\s\S]*panelToggleRect\.left - rect\.left/);
  assert.doesNotMatch(component, /html2canvas/);
  assert.match(component, /context\.globalCompositeOperation = "destination-in"/);
  assert.match(component, /outline: \{ width: 0, color: "transparent" \}/);
  assert.match(component, /edge: \{ width: 0, strength: 0 \}/);
  assert.match(component, /\.\.\.getSidebarPeelShadowSettings\(\)/);
  assert.match(component, /SIDEBAR_PEEL_SHADOW_CHANGE_EVENT/);
  assert.match(component, /controller\?\.setOptions\(/);
  assert.match(debugPanel, /sidebarShadowFolder/);
  assert.match(debugPanel, /updateSidebarPeelShadowSettings/);
  assert.match(debugSettings, /opacity: 0\.16/);
  assert.match(debugSettings, /blur: 43/);
  assert.match(debugSettings, /distance: 24/);
  assert.match(
    debugSettings,
    /DEFAULT_SIDEBAR_PEEL_LIGHTING_SETTINGS[\s\S]*x: 0,[\s\S]*y: 0,[\s\S]*z: 1,/,
  );
  assert.match(debugPanel, /sidebarLightingFolder/);
  assert.match(debugPanel, /updateSidebarPeelLightingSettings/);
  assert.match(debugPanel, /sidebarBackFolder/);
  assert.match(debugPanel, /updateSidebarPeelBackSettings/);
  assert.match(debugSettings, /color: "#d8d7d3"/);
  assert.match(
    component,
    /direction: getSidebarPeelLightingSettings\(\)[\s\S]*ambient: 1/,
  );
  assert.match(component, /SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT/);
  assert.match(component, /updateActiveLighting/);
  assert.match(component, /SIDEBAR_PEEL_BACK_CHANGE_EVENT/);
  assert.match(component, /\.\.\.getSidebarPeelBackSettings\(\)/);
  assert.match(component, /padding: 0/);
  assert.match(component, /textureMaxEdge: Math\.min\(\s*8192,/);
  assert.match(component, /const scale = Math\.max\(1, window\.devicePixelRatio \|\| 1\)/);
  assert.match(component, /controller\.setRenderScale\(/);
  assert.match(component, /display: \{ width: rect\.width, height: rect\.height \}/);
  assert.match(
    component,
    /Math\.max\(panelCenterX, window\.innerWidth - panelCenterX\) \* 2/,
  );
  assert.match(
    component,
    /Math\.max\(panelCenterY, window\.innerHeight - panelCenterY\) \* 2/,
  );
  assert.doesNotMatch(component, /sidebar-peel-canvas-scale/);
  assert.match(component, /SIDEBAR_DETACH_THRESHOLD = 0\.5/);
  assert.match(component, /detachThreshold: SIDEBAR_DETACH_THRESHOLD/);
  assert.match(component, /residue: false/);
  assert.match(component, /surfaceShadow: false/);
  assert.match(
    component,
    /host\.addEventListener\("peelstart"[\s\S]*peel: \{ surfaceShadow: true \}/,
  );
  assert.match(
    component,
    /PRANK_DRAG_THRESHOLD = 32/,
  );
  assert.match(
    component,
    /Math\.hypot\([\s\S]*active\.lastPoint\.x - active\.dragStartPoint\.x[\s\S]*active\.lastPoint\.y - active\.dragStartPoint\.y[\s\S]*PRANK_DRAG_THRESHOLD[\s\S]*onPrankPhaseChangeRef\.current\("shock"\)/,
  );
  assert.match(
    component,
    /host\.addEventListener\("peelstart"[\s\S]*active\.dragStartPoint = \{ \.\.\.active\.lastPoint \}/,
  );
  assert.match(
    component,
    /host\.addEventListener\("peelchange"[\s\S]*progress >= SIDEBAR_DETACH_THRESHOLD \? "warning" : "shock"[\s\S]*onPrankPhaseChangeRef\.current\(nextPhase\)/,
  );
  assert.match(
    component,
    /host\.addEventListener\("peelend"[\s\S]*onPrankPhaseChangeRef\.current\(null\)/,
  );
  assert.match(component, /cleanup[\s\S]*onPrankPhaseChangeRef\.current\(null\)/);
  assert.match(studio, /PEEL_PRANK_TEXT = "🤯🤯🤯"/);
  assert.match(studio, /peelCloseWarning: "😇 再撕可就关了"/);
  assert.match(studio, /peelCloseWarning: "😇 Keep peeling\\nand it'll close"/);
  assert.match(
    studio,
    /function makeCenteredPrankSource[\s\S]*text\.split\("\\n"\)[\s\S]*align: "center"/,
  );
  assert.match(
    studio,
    /handleSidebarPeelPrankPhaseChange[\s\S]*phase === "warning" \? t\.peelCloseWarning : PEEL_PRANK_TEXT[\s\S]*sourceRef\.current/,
  );
  assert.match(
    studio,
    /onPrankPhaseChange=\{handleSidebarPeelPrankPhaseChange\}/,
  );
  assert.match(component, /host\.addEventListener\("detachcomplete"/);
  assert.doesNotMatch(component, /onDetachedRef\.current\(\)[\s\S]*430/);
  assert.match(component, /!pointIsInCorner[\s\S]*cleanup\(active\)/);
  assert.match(
    component,
    /overlay\.dataset\.sidebarPeelReady = "true"[\s\S]*panel\.setAttribute\("data-peel-captured"[\s\S]*host\.addEventListener\("peelstart"/,
  );
  assert.match(
    styles,
    /\.sidebar-peel-overlay:not\(\[data-sidebar-peel-ready="true"\]\)[\s\S]*canvas \{\s*opacity: 0;/,
  );
  assert.match(component, /READY_CURL_PROGRESS = 0\.012/);
  assert.match(component, /READY_CURL_DURATION = 300/);
  assert.match(component, /cornerPeelMotion\(corner\)/);
  assert.match(component, /controller\.setPeelProgress\(/);
  assert.match(component, /overlay\.dataset\.sidebarPeelReady = "true"/);
  assert.match(
    component,
    /panel\.setAttribute\("data-peel-restoring", "true"\)[\s\S]*panel\.removeAttribute\("data-peel-captured"\)[\s\S]*requestAnimationFrame\(\(\) => \{[\s\S]*requestAnimationFrame\(finishTeardown\)/,
  );
  assert.match(
    styles,
    /\.controls-card\[data-peel-captured="true"\] \{[\s\S]*opacity: 0 !important;[\s\S]*transition: none !important;/,
  );
  assert.match(
    styles,
    /\.controls-card\[data-peel-restoring="true"\] \{[\s\S]*opacity: 1 !important;[\s\S]*transition: none !important;/,
  );
  assert.doesNotMatch(styles, /sidebar-peel[\s\S]*transition: opacity 300ms/);
  assert.match(
    shaders,
    /peelShadowActivation = smoothstep\(0\.001, 0\.035, uPeel\)/,
  );
  assert.match(
    shaders,
    /projectedShadow[\s\S]*vShadowReceiverProximity[\s\S]*uShadowOpacity[\s\S]*uSurfaceShadowEnabled[\s\S]*peelShadowActivation/,
  );
  assert.match(
    shaders,
    /receiverShadowReach = max\(effectiveRadius \* 1\.6,[\s\S]*vShadowReceiverProximity/,
  );
  assert.match(
    styles,
    /\.controls-card \{[\s\S]*?background: #fff;[\s\S]*?backdrop-filter: none;/,
  );
  assert.match(
    styles,
    /\.lighting-direction-control \{[\s\S]*?display: flex;[\s\S]*?flex-direction: column;/,
  );
  assert.match(
    styles,
    /\.lighting-direction-pad \{[\s\S]*?align-self: center;[\s\S]*?margin: 0;/,
  );
  assert.match(studio, /<SidebarPeelEasterEgg/);
  assert.match(
    styles,
    /@media \(max-width: 620px\) \{[\s\S]*?\.sidebar-peel-trigger \{\s*display: none;/,
  );
});
