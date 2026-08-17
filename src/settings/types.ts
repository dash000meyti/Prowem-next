export type ThemeColors = {
  background: string;
  foreground: string;
  primary: string;
  primaryForeground: string;
};

export type Theme = {
  colors: ThemeColors;
};

export type Settings = {
  theme: Theme;
};
