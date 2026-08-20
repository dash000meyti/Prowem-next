import {
  buttonColorValues,
  iconPlaygroundValues,
  sideMenuVariantValues,
} from "@/dev/values";
import type { ComponentMeta } from "./types";

export const popupMeta = {
  name: "Popup",
  slug: "popup",
  kind: "ui",
  file: "src/components/ui/popup/popup.tsx",
  importStatement:
    'import { Popup, PopupContent, PopupFooter, PopupHeader } from "@/components/ui/popup";',
  description:
    "Client dialog. Button trigger, overlay, centered Card. Header / Content / Footer are Card slots. Escape, overlay click, and a light focus trap live here.",
  rules: [
    "The trigger is a Button. The panel is a Card. Do not restyle a second dialog.",
    "Pin the title with PopupHeader (it renders the close control). Pin actions with PopupFooter.",
    "Pass label and closeLabel from the parent. No copy inside Popup.",
    "Portal to document.body so sticky chrome does not clip it.",
  ],
  props: [
    {
      name: "trigger",
      type: "string",
      default: "Open",
      description: "Trigger label (or a node in real use).",
      playground: true,
      group: "Demo",
    },
    {
      name: "icon",
      type: "enum",
      values: [...iconPlaygroundValues],
      default: "",
      description: "Optional IconName on the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "variant",
      type: "enum",
      values: [...sideMenuVariantValues],
      default: "outline",
      description: "Button variant for the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "color",
      type: "enum",
      values: [...buttonColorValues],
      default: "primary",
      description: "Button color for the trigger.",
      playground: true,
      group: "Trigger",
    },
    {
      name: "label",
      type: "string",
      default: "Open",
      description: "Accessible name for the trigger.",
      playground: true,
      group: "Demo",
    },
    {
      name: "closeLabel",
      type: "string",
      default: "Close",
      description: "Accessible name for close and the overlay.",
      playground: true,
      group: "Demo",
    },
    {
      name: "className",
      type: "string",
      description: "Merged onto the root with cn().",
      playground: false,
    },
  ],
} satisfies ComponentMeta;
