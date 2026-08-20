import { ChevronDownGlyph } from "@/components/icons/glyphs/chevron-down";
import { ChevronUpGlyph } from "@/components/icons/glyphs/chevron-up";
import { CloseGlyph } from "@/components/icons/glyphs/close";
import { InfoGlyph } from "@/components/icons/glyphs/info";
import { MenuGlyph } from "@/components/icons/glyphs/menu";
import { FlagAr, FlagDe, FlagEn, FlagEs, FlagPt } from "@/components/icons/flags/flags";

export const iconRegistry = {
  close: CloseGlyph,
  menu: MenuGlyph,
  info: InfoGlyph,
  "chevron-up": ChevronUpGlyph,
  "chevron-down": ChevronDownGlyph,
  "flag-en": FlagEn,
  "flag-de": FlagDe,
  "flag-pt": FlagPt,
  "flag-es": FlagEs,
  "flag-ar": FlagAr,
} as const;

export type IconName = keyof typeof iconRegistry;

export function isFlagIcon(name: IconName): boolean {
  return name.startsWith("flag-");
}
