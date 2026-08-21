import { cva, type VariantProps } from "class-variance-authority";
import type { LabelHTMLAttributes } from "react";
import { fontFaceVariants, type FontFace } from "@/fonts";
import { cn } from "@/lib/cn";

export const labelVariants = cva(
  "min-w-0 text-start text-foreground/70 tracking-normal [text-box-trim:trim-both] [text-box-edge:cap_alphabetic]",
  {
    variants: {
      size: {
        sm: "text-label-sm",
        md: "text-label-md",
        lg: "text-label",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type LabelProps = LabelHTMLAttributes<HTMLLabelElement> &
  VariantProps<typeof labelVariants> & {
    font?: FontFace;
  };

export function Label({
  className,
  size,
  font = "heeboBold",
  ...props
}: LabelProps) {
  return (
    <label
      className={cn(
        labelVariants({ size }),
        fontFaceVariants({ font }),
        className,
      )}
      {...props}
    />
  );
}
