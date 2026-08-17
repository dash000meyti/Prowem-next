export type ColorTone = {
  base: string;
  foreground: string;
  hover: string;
};

export type ThemeAccent = {
  "1": ColorTone;
  "2": ColorTone;
  "3": ColorTone;
  "4": ColorTone;
};

export type ThemeColors = {
  background: string;
  foreground: string;
  border: string;
  panel: ColorTone;
  primary: ColorTone;
  accent: ThemeAccent;
  success: ColorTone;
  warning: ColorTone;
  error: ColorTone;
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
