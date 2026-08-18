import type { CSSProperties } from "react";
import type { ActionColorTone, ColorTone, Theme } from "@/settings/types";

function toneVars(prefix: string, tone: ColorTone): Record<string, string> {
  return {
    [`--${prefix}`]: tone.base,
    [`--${prefix}-foreground`]: tone.foreground,
    [`--${prefix}-hover`]: tone.hover,
  };
}

function actionToneVars(prefix: string, tone: ActionColorTone): Record<string, string> {
  return {
    ...toneVars(prefix, tone),
    [`--${prefix}-glow`]: tone.glow,
    [`--${prefix}-shadow`]: tone.shadow,
  };
}

export function toCssVars(theme: Theme): CSSProperties {
  return {
    "--background": theme.colors.background,
    "--foreground": theme.colors.foreground,
    "--border": theme.colors.border,
    ...toneVars("panel", theme.colors.panel),
    ...actionToneVars("primary", theme.colors.primary),
    ...actionToneVars("accent-1", theme.colors.accent["1"]),
    ...actionToneVars("accent-2", theme.colors.accent["2"]),
    ...actionToneVars("accent-3", theme.colors.accent["3"]),
    ...actionToneVars("accent-4", theme.colors.accent["4"]),
    ...actionToneVars("success", theme.colors.success),
    ...actionToneVars("warning", theme.colors.warning),
    ...actionToneVars("error", theme.colors.error),
    "--theme-radius-none": theme.radius.none,
    "--theme-radius-sm": theme.radius.sm,
    "--theme-radius-md": theme.radius.md,
    "--theme-radius-lg": theme.radius.lg,
    "--theme-radius-full": theme.radius.full,
    "--theme-border-width-none": theme.borderWidth.none,
    "--theme-border-width-sm": theme.borderWidth.sm,
    "--theme-border-width-md": theme.borderWidth.md,
    "--theme-border-width-lg": theme.borderWidth.lg,
    "--container-xs": theme.container.xs,
    "--container-sm": theme.container.sm,
    "--container-md": theme.container.md,
    "--container-lg": theme.container.lg,
    "--container-xl": theme.container.xl,
    "--container-full": theme.container.full,
  } as CSSProperties;
}
