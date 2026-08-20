import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
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

export const headingVariants = cva("min-w-0 text-start tracking-tight", {
  variants: {
    level: {
      1: "text-2xl font-semibold md:text-3xl",
      2: "text-lg font-semibold",
      3: "text-sm font-medium",
      4: "text-sm font-medium",
      5: "text-xs font-medium",
      6: "text-xs font-medium",
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
});

export type HeadingProps = HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof headingVariants>;

export function Heading({
  className,
  level = 1,
  tone,
  ...props
}: HeadingProps) {
  const Tag = headingTags[level ?? 1];

  return (
    <Tag
      className={cn(headingVariants({ level, tone }), className)}
      {...props}
    />
  );
}
