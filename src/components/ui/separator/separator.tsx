import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const separatorVariants = cva("shrink-0 bg-border", {
  variants: {
    orientation: {
      horizontal: "h-px w-full",
      vertical: "h-full min-h-4 w-px self-stretch",
    },
  },
  defaultVariants: {
    orientation: "horizontal",
  },
});

export type SeparatorProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof separatorVariants>;

export function Separator({
  className,
  orientation = "horizontal",
  ...props
}: SeparatorProps) {
  return (
    <div
      role="separator"
      aria-orientation={orientation ?? "horizontal"}
      className={cn(separatorVariants({ orientation }), className)}
      {...props}
    />
  );
}
