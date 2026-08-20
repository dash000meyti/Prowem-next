import { headingMeta } from "./heading";
import { buttonMeta } from "./button";
import { cardMeta } from "./card";
import { containerMeta } from "./container";
import { dropdownMeta } from "./dropdown";
import { sideMenuMeta } from "./side-menu";
import { siteHeaderMeta } from "./site-header";
import { textMeta } from "./text";
import { listMeta } from "./list";
import { tableMeta } from "./table";
import { codeMeta } from "./code";
import { labelMeta } from "./label";
import { inputMeta } from "./input";
import { selectMeta } from "./select";
import { checkboxMeta } from "./checkbox";
import { separatorMeta } from "./separator";
import { badgeMeta } from "./badge";
import { textareaMeta } from "./textarea";
import { switchMeta } from "./switch";
import { tabsMeta } from "./tabs";
import { alertMeta } from "./alert";
import { tooltipMeta } from "./tooltip";
import { popupMeta } from "./popup";
import type { ComponentMeta } from "./types";

export const uiMetas: ComponentMeta[] = [
  buttonMeta,
  badgeMeta,
  inputMeta,
  textareaMeta,
  selectMeta,
  checkboxMeta,
  switchMeta,
  labelMeta,
  headingMeta,
  textMeta,
  listMeta,
  codeMeta,
  tableMeta,
  separatorMeta,
  cardMeta,
  alertMeta,
  dropdownMeta,
  tooltipMeta,
  popupMeta,
  sideMenuMeta,
  tabsMeta,
  containerMeta,
];

export const templateMetas: ComponentMeta[] = [siteHeaderMeta];

export const allMetas: ComponentMeta[] = [...uiMetas, ...templateMetas];

export function getMetaBySlug(slug: string): ComponentMeta | undefined {
  return allMetas.find((meta) => meta.slug === slug);
}

export type { ComponentMeta, ComponentMetaProp, MetaKind } from "./types";
