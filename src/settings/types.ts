export type ColorTone = {
  base: string;
  foreground: string;
  hover: string;
};

export type ActionColorTone = ColorTone & {
  glow: string;
  shadow: string;
};

export type ThemeAccent = {
  "1": ActionColorTone;
  "2": ActionColorTone;
  "3": ActionColorTone;
  "4": ActionColorTone;
};

export type ThemeColors = {
  background: string;
  foreground: string;
  border: string;
  panel: ColorTone;
  primary: ActionColorTone;
  accent: ThemeAccent;
  success: ActionColorTone;
  warning: ActionColorTone;
  error: ActionColorTone;
};

export type ThemeRadius = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  full: string;
};

export type ThemeBorderWidth = {
  none: string;
  sm: string;
  md: string;
  lg: string;
};

export type ThemeContainer = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type Theme = {
  colors: ThemeColors;
  radius: ThemeRadius;
  borderWidth: ThemeBorderWidth;
  container: ThemeContainer;
};

export type BreakpointName = "xs" | "sm" | "md" | "lg" | "xl";

export type HeaderSettings = {
  navFrom: BreakpointName;
};

export type Settings = {
  theme: Theme;
  header: HeaderSettings;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
