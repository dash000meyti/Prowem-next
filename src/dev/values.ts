import { buttonColors } from "@/components/ui/button";

export const buttonVariantValues = [
  "filled",
  "secondary",
  "outline",
  "soft",
  "tinted",
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

export const cardUnderlineSizeValues = ["sm", "md", "lg"] as const;

export const cardUnderlineWidthValues = ["fix", "25", "50", "75"] as const;

export const cardBorderColorValues = [
  "border",
  ...buttonColors.flatMap((color) => [color, `${color}Active`] as const),
] as const;

export const iconPlaygroundValues = [
  "",
  "close",
  "menu",
  "info",
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
  "tinted",
  "link",
  "muted",
] as const;

export const headingLevelValues = ["1", "2", "3", "4", "5", "6"] as const;

export const headingToneValues = ["default", "muted"] as const;

export const textVariantValues = [
  "body",
  "muted",
  "caption",
  "overline",
  "code",
] as const;

export const textAsValues = ["p", "span"] as const;

export const listMarkerValues = ["disc", "decimal", "none"] as const;

export const listGapValues = ["sm", "md"] as const;

export const listAsValues = ["ul", "ol"] as const;

export const codeDisplayValues = ["inline", "block"] as const;

export const labelSizeValues = ["sm", "md", "lg"] as const;

export { fontFaceValues } from "@/fonts";

export const fieldSizeValues = ["sm", "md", "lg"] as const;

export const badgeVariantValues = ["filled", "outline", "soft", "muted"] as const;

export const separatorOrientationValues = ["horizontal", "vertical"] as const;

export const tooltipSideValues = ["top", "bottom", "start", "end"] as const;

export const selectOptionValues = ["one", "two"] as const;

export const popupCardValues = ["none", "main"] as const;

export const popupSizeValues = ["sm", "md", "lg", "full"] as const;
