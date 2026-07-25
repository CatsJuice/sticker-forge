export type SidebarPeelShadowSettings = {
  opacity: number;
  blur: number;
  distance: number;
};

export type SidebarPeelLightingSettings = {
  x: number;
  y: number;
  z: number;
};

export type SidebarPeelBackSettings = {
  color: string;
};

export const DEFAULT_SIDEBAR_PEEL_SHADOW_SETTINGS: SidebarPeelShadowSettings = {
  opacity: 0.16,
  blur: 43,
  distance: 24,
};

export const DEFAULT_SIDEBAR_PEEL_LIGHTING_SETTINGS: SidebarPeelLightingSettings =
  {
    x: 0,
    y: 0,
    z: 1,
  };

export const DEFAULT_SIDEBAR_PEEL_BACK_SETTINGS: SidebarPeelBackSettings = {
  color: "#d8d7d3",
};

export const SIDEBAR_PEEL_SHADOW_CHANGE_EVENT =
  "sticker-forge:sidebar-peel-shadow-change";
export const SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT =
  "sticker-forge:sidebar-peel-lighting-change";
export const SIDEBAR_PEEL_BACK_CHANGE_EVENT =
  "sticker-forge:sidebar-peel-back-change";

let settings = { ...DEFAULT_SIDEBAR_PEEL_SHADOW_SETTINGS };
let lightingSettings = { ...DEFAULT_SIDEBAR_PEEL_LIGHTING_SETTINGS };
let backSettings = { ...DEFAULT_SIDEBAR_PEEL_BACK_SETTINGS };

function clamp(value: number, minimum: number, maximum: number) {
  return Math.min(maximum, Math.max(minimum, value));
}

export function getSidebarPeelShadowSettings(): Readonly<SidebarPeelShadowSettings> {
  return settings;
}

export function updateSidebarPeelShadowSettings(
  patch: Partial<SidebarPeelShadowSettings>,
) {
  settings = {
    opacity: clamp(patch.opacity ?? settings.opacity, 0, 1),
    blur: clamp(patch.blur ?? settings.blur, 0, 160),
    distance: clamp(patch.distance ?? settings.distance, 0, 80),
  };
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(SIDEBAR_PEEL_SHADOW_CHANGE_EVENT, {
        detail: { ...settings },
      }),
    );
  }
  return settings;
}

export function getSidebarPeelLightingSettings(): Readonly<SidebarPeelLightingSettings> {
  return lightingSettings;
}

export function updateSidebarPeelLightingSettings(
  patch: Partial<SidebarPeelLightingSettings>,
) {
  lightingSettings = {
    x: clamp(patch.x ?? lightingSettings.x, -1, 1),
    y: clamp(patch.y ?? lightingSettings.y, -1, 1),
    z: clamp(patch.z ?? lightingSettings.z, -1, 1),
  };
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(SIDEBAR_PEEL_LIGHTING_CHANGE_EVENT, {
        detail: { ...lightingSettings },
      }),
    );
  }
  return lightingSettings;
}

export function getSidebarPeelBackSettings(): Readonly<SidebarPeelBackSettings> {
  return backSettings;
}

export function updateSidebarPeelBackSettings(
  patch: Partial<SidebarPeelBackSettings>,
) {
  backSettings = {
    color:
      typeof patch.color === "string" && patch.color.trim()
        ? patch.color
        : backSettings.color,
  };
  if (typeof window !== "undefined") {
    window.dispatchEvent(
      new CustomEvent(SIDEBAR_PEEL_BACK_CHANGE_EVENT, {
        detail: { ...backSettings },
      }),
    );
  }
  return backSettings;
}
