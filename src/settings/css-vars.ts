import type { CSSProperties } from "react";
import type { Theme } from "@/settings/types";

export function toCssVars(theme: Theme): CSSProperties {
  return {
    "--background": theme.colors.background,
    "--foreground": theme.colors.foreground,
    "--primary": theme.colors.primary,
    "--primary-foreground": theme.colors.primaryForeground,
  } as CSSProperties;
}
