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
  sm: string;
  md: string;
  lg: string;
  xl: string;
  full: string;
};

export type ThemeBorderWidth = {
  sm: string;
  md: string;
  lg: string;
};

export type Theme = {
  colors: ThemeColors;
  radius: ThemeRadius;
  borderWidth: ThemeBorderWidth;
};

export type Settings = {
  theme: Theme;
};

export type DeepPartial<T> = {
  [K in keyof T]?: T[K] extends object ? DeepPartial<T[K]> : T[K];
};
