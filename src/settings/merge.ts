import type { ColorTone, DeepPartial, Settings, ThemeAccent } from "@/settings/types";

function mergeTone<T extends ColorTone>(base: T, overlay?: DeepPartial<T>): T {
  return { ...base, ...overlay };
}

function mergeAccent(
  base: ThemeAccent,
  overlay?: DeepPartial<ThemeAccent>,
): ThemeAccent {
  return {
    "1": mergeTone(base["1"], overlay?.["1"]),
    "2": mergeTone(base["2"], overlay?.["2"]),
    "3": mergeTone(base["3"], overlay?.["3"]),
    "4": mergeTone(base["4"], overlay?.["4"]),
  };
}

export function mergeSettings(
  base: Settings,
  overlay: DeepPartial<Settings>,
): Settings {
  const colorsOverlay = overlay.theme?.colors;

  return {
    theme: {
      colors: {
        ...base.theme.colors,
        ...colorsOverlay,
        panel: mergeTone(base.theme.colors.panel, colorsOverlay?.panel),
        primary: mergeTone(base.theme.colors.primary, colorsOverlay?.primary),
        accent: mergeAccent(base.theme.colors.accent, colorsOverlay?.accent),
        success: mergeTone(base.theme.colors.success, colorsOverlay?.success),
        warning: mergeTone(base.theme.colors.warning, colorsOverlay?.warning),
        error: mergeTone(base.theme.colors.error, colorsOverlay?.error),
      },
      radius: { ...base.theme.radius, ...overlay.theme?.radius },
      borderWidth: { ...base.theme.borderWidth, ...overlay.theme?.borderWidth },
    },
  };
}
