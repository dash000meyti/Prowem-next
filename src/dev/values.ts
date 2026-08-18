import { buttonColors } from "@/components/ui/button";

export const buttonVariantValues = [
  "filled",
  "secondary",
  "outline",
  "soft",
  "ghost",
  "subtle",
  "link",
  "muted",
] as const;

export const buttonColorValues = buttonColors;

export const radiusValues = ["none", "sm", "md", "lg", "full"] as const;

export const sizeValues = ["sm", "md", "lg"] as const;

export const paddingValues = ["none", "sm", "md", "lg"] as const;

export const borderValues = ["none", "sm", "md", "lg"] as const;

export const containerWidthValues = [
  "xs",
  "sm",
  "md",
  "lg",
  "xl",
  "full",
] as const;

export const cardSurfaceValues = ["panel", "glass"] as const;

export const cardSlotVariantValues = ["none", "filled", "border", "divider"] as const;

export const cardLightValues = ["none", ...buttonColors] as const;

export const cardBorderColorValues = ["border", ...buttonColors] as const;

export const iconPlaygroundValues = [
  "",
  "close",
  "menu",
  "chevron-up",
  "chevron-down",
] as const;

export const localeValues = ["en", "de", "pt", "es", "ar"] as const;

export const breakpointValues = ["xs", "sm", "md", "lg", "xl"] as const;

export const alignValues = ["start", "end"] as const;

export const sideMenuVariantValues = [
  "filled",
  "secondary",
  "outline",
  "soft",
  "link",
  "muted",
] as const;
