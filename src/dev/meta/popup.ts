import {
  buttonColorValues,
  iconPlaygroundValues,
  popupCardValues,
  popupSizeValues,
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
    "Client dialog. Button trigger, overlay, centered Card. card=main is the glass preset; card=none is a plain Card. Header / Content / Footer are Card slots.",
  rules: [
    "The trigger is a Button. The panel is a Card. Do not restyle a second dialog.",
    "card is none|main (default main). main applies glass + lights + border md + header underline primary and Header/Footer variant none. none keeps a plain Card with Header/Footer variant border.",
    "size is sm|md|lg|full (default sm). Max width is one container step smaller than the name (sm→xs, md→sm, lg→md); full is max-w-none.",
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
      name: "card",
      type: "enum",
      values: [...popupCardValues],
      default: "main",
      description:
        "Panel Card preset. main = glass + lights + border md + header underline primary + Header/Footer variant none. none = plain Card + Header/Footer border.",
      playground: true,
      group: "Panel",
    },
    {
      name: "size",
      type: "enum",
      values: [...popupSizeValues],
      default: "sm",
      description:
        "Panel max width: sm→container-xs, md→container-sm, lg→container-md, full→none.",
      playground: true,
      group: "Panel",
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
