import { buttonMeta } from "./button";
import { cardMeta } from "./card";
import { containerMeta } from "./container";
import { dropdownMeta } from "./dropdown";
import { languageSwitcherMeta } from "./language-switcher";
import { sideMenuMeta } from "./side-menu";
import { siteHeaderMeta } from "./site-header";
import type { ComponentMeta } from "./types";

export const uiMetas: ComponentMeta[] = [
  buttonMeta,
  cardMeta,
  dropdownMeta,
  sideMenuMeta,
  containerMeta,
];

export const templateMetas: ComponentMeta[] = [
  languageSwitcherMeta,
  siteHeaderMeta,
];

export const allMetas: ComponentMeta[] = [...uiMetas, ...templateMetas];

export function getMetaBySlug(slug: string): ComponentMeta | undefined {
  return allMetas.find((meta) => meta.slug === slug);
}

export type { ComponentMeta, ComponentMetaProp, MetaKind } from "./types";
