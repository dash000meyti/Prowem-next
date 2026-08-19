import {
  alignValues,
  buttonColorValues,
  iconPlaygroundValues,
  sideMenuVariantValues,
} from "@/dev/values";
import type { ComponentMeta } from "./types";

export const sideMenuMeta = {
  name: "SideMenu",
  slug: "side-menu",
  kind: "ui",
  file: "src/components/ui/side-menu/side-menu.tsx",
  importStatement:
    'import { SideMenu, SideMenuHeader, SideMenuContent, SideMenuFooter } from "@/components/ui/side-menu";',
  description:
    "Client atom. Overlay, Escape, and close live here. The panel is a glass Card from start or end (RTL-safe) and portals to document.body so sticky headers do not clip it.",
  rules: [
    "The trigger is a Button like Dropdown. The panel is a glass Card (primary bottom light, foreground top light). Header and Footer default to variant border.",
    "Compose SideMenuHeader / SideMenuContent / SideMenuFooter. Do not pass a footer prop.",
    "side is start|end (logical), default end.",
    "The playground LTR/RTL control sets dir on the preview only. The panel portals to document.body, so it follows the document direction.",
    "Pass closeLabel from the parent. Do not hardcode it.",
  ],
  props: [
    {
      name: "trigger",
      type: "string",
      default: "Menu",
      description: "Trigger label (or a node in real use).",
      playground: true,
    },
    {
      name: "icon",
      type: "enum",
      values: [...iconPlaygroundValues],
      default: "menu",
      description: "Optional IconName on the trigger.",
      playground: true,
    },
    {
      name: "variant",
      type: "enum",
      values: [...sideMenuVariantValues],
      default: "outline",
      description: "Button variant for the trigger.",
      playground: true,
    },
    {
      name: "color",
      type: "enum",
      values: [...buttonColorValues],
      default: "primary",
      description: "Button color for the trigger.",
      playground: true,
    },
    {
      name: "side",
      type: "enum",
      values: [...alignValues],
      default: "end",
      description: "Which logical edge the panel slides from.",
      playground: true,
    },
    {
      name: "label",
      type: "string",
      default: "Menu",
      description: "Accessible name for the trigger.",
      playground: true,
    },
    {
      name: "closeLabel",
      type: "string",
      default: "Close",
      description: "Accessible name for the close control.",
      playground: true,
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
