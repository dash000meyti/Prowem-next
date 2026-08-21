import { clsx, type ClassValue } from "clsx";
import { extendTailwindMerge } from "tailwind-merge";

/**
 * Custom `--text-*` theme sizes must be registered here. Otherwise twMerge
 * treats them as `text-*` colors and drops them next to `text-foreground`.
 */
const twMerge = extendTailwindMerge({
  extend: {
    classGroups: {
      "font-size": [
        {
          text: [
            "h1",
            "h2",
            "h3",
            "h4",
            "h5",
            "h6",
            "h1-md",
            "h2-md",
            "h3-md",
            "h4-md",
            "h5-md",
            "h6-md",
            "body",
            "label",
            "label-md",
            "label-sm",
          ],
        },
      ],
    },
  },
});

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}
