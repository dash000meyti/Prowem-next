import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const textVariants = cva("min-w-0 text-start", {
  variants: {
    variant: {
      body: "text-sm leading-6 text-foreground",
      muted: "text-sm leading-6 text-foreground/70",
      caption: "text-xs text-foreground/70",
      overline: "text-xs font-semibold uppercase tracking-wide text-foreground/70",
      code: "font-mono text-xs",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span";
  };

export function Text({
  className,
  variant,
  as: Tag = "p",
  ...props
}: TextProps) {
  return (
    <Tag className={cn(textVariants({ variant }), className)} {...props} />
  );
}
