import {
  cardBorderColorValues,
  cardLightValues,
  cardSurfaceValues,
  borderValues,
  paddingValues,
  radiusValues,
} from "@/dev/values";
import type { ComponentMeta } from "./types";

export const cardMeta = {
  name: "Card",
  slug: "card",
  kind: "ui",
  file: "src/components/ui/card/card.tsx",
  importStatement:
    'import { Card, CardHeader, CardTitle, CardDescription, CardContent, CardFooter } from "@/components/ui/card";',
  description:
    "Compound surface: Card + Header / Title / Description / Content / Footer. No copy and no Button import. Lights and start/end edges follow dir.",
  rules: [
    "Compose the slots. Do not invent a second card chrome on templates.",
    "surface is only the fill (panel or glass). Lights are independent ellipse glows.",
    "lightStart / lightEnd follow dir — not left/right.",
    "Header and Footer variant border|divider inherit the parent Card border width and borderColor.",
    "CardContent fills leftover space (flex-1 min-h-0). Header and Footer stay shrink-0.",
  ],
  props: [
    {
      name: "title",
      type: "string",
      default: "Title",
      description: "Demo title in CardTitle (not a Card root prop).",
      playground: true,
    },
    {
      name: "description",
      type: "string",
      default: "Description",
      description: "Demo text in CardDescription.",
      playground: true,
    },
    {
      name: "content",
      type: "string",
      default: "Content",
      description: "Demo text in CardContent.",
      playground: true,
    },
    {
      name: "surface",
      type: "enum",
      values: [...cardSurfaceValues],
      default: "panel",
      description: "Fill: panel uses --panel; glass is the stuck-header mix plus blur.",
      playground: true,
    },
    {
      name: "lightBottom",
      type: "enum",
      values: [...cardLightValues],
      default: "none",
      description: "Bottom ellipse glow.",
      playground: true,
    },
    {
      name: "padding",
      type: "enum",
      values: [...paddingValues],
      default: "none",
      description: "Root padding. Slots have their own padding (default md).",
      playground: true,
    },
    {
      name: "radius",
      type: "enum",
      values: [...radiusValues],
      default: "md",
      description: "Corner radius token.",
      playground: true,
    },
    {
      name: "border",
      type: "enum",
      values: [...borderValues],
      default: "md",
      description: "Border width token.",
      playground: true,
    },
    {
      name: "borderColor",
      type: "enum",
      values: [...cardBorderColorValues],
      default: "border",
      description: "Border color token.",
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
