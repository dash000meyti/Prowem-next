import { cva, type VariantProps } from "class-variance-authority";
import type { LabelHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const labelVariants = cva("min-w-0 text-start text-foreground/70", {
  variants: {
    size: {
      sm: "text-xs",
      md: "text-sm",
    },
  },
  defaultVariants: {
    size: "md",
  },
});

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants>;

export function Label({ className, size, ...props }: LabelProps) {
  return (
    <label className={cn(labelVariants({ size }), className)} {...props} />
  );
}
