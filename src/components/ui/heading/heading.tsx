import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { fontFaceVariants, type FontFace } from "@/fonts";
import { cn } from "@/lib/cn";

export const headingLevels = [1, 2, 3, 4, 5, 6] as const;

export type HeadingLevel = (typeof headingLevels)[number];

const headingTags = {
  1: "h1",
  2: "h2",
  3: "h3",
  4: "h4",
  5: "h5",
  6: "h6",
} as const;

export const headingVariants = cva(
  "min-w-0 text-start tracking-normal [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]",
  {
    variants: {
      level: {
        1: "text-h1 md:text-h1-md",
        2: "text-h2 md:text-h2-md",
        3: "text-h3 md:text-h3-md",
        4: "text-h4 md:text-h4-md",
        5: "text-h5 md:text-h5-md",
        6: "text-h6 md:text-h6-md",
      },
      tone: {
        default: "text-foreground",
        muted: "text-foreground/70",
      },
    },
    defaultVariants: {
      level: 1,
      tone: "default",
    },
  },
);

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants> & {
    font?: FontFace;
  };

export function Heading({
  className,
  level = 1,
  tone,
  font = "bebasNeueRegular",
  ...props
}: HeadingProps) {
  const Tag = headingTags[level ?? 1];

  return (
    <Tag
      className={cn(
        headingVariants({ level, tone }),
        fontFaceVariants({ font }),
        className,
      )}
      {...props}
    />
  );
}
