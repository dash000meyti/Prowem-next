import type { CSSProperties } from "react";
import type { ColorTone, Theme } from "@/settings/types";

function toneVars(prefix: string, tone: ColorTone): Record<string, string> {
  return {
    [`--${prefix}`]: tone.base,
    [`--${prefix}-foreground`]: tone.foreground,
    [`--${prefix}-hover`]: tone.hover,
  };
}

export function toCssVars(theme: Theme): CSSProperties {
  return {
    "--background": theme.colors.background,
    "--foreground": theme.colors.foreground,
    "--border": theme.colors.border,
    ...toneVars("panel", theme.colors.panel),
    ...toneVars("primary", theme.colors.primary),
    ...toneVars("accent-1", theme.colors.accent["1"]),
    ...toneVars("accent-2", theme.colors.accent["2"]),
    ...toneVars("accent-3", theme.colors.accent["3"]),
    ...toneVars("accent-4", theme.colors.accent["4"]),
    ...toneVars("success", theme.colors.success),
    ...toneVars("warning", theme.colors.warning),
    ...toneVars("error", theme.colors.error),
    "--theme-radius-sm": theme.radius.sm,
    "--theme-radius-md": theme.radius.md,
    "--theme-radius-lg": theme.radius.lg,
    "--theme-radius-xl": theme.radius.xl,
    "--theme-radius-full": theme.radius.full,
    "--theme-border-width-sm": theme.borderWidth.sm,
    "--theme-border-width-md": theme.borderWidth.md,
    "--theme-border-width-lg": theme.borderWidth.lg,
  } as CSSProperties;
}
