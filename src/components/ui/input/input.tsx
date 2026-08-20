import { cva, type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

/** Shared field chrome: panel fill, sm border inside the box. Select and Textarea reuse this. */
export const fieldBoxClass =
  "w-full min-w-0 appearance-none bg-panel text-panel-foreground shadow-outline-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const fieldRadius = {
  none: "rounded-none",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  full: "rounded-full",
} as const;

export const inputVariants = cva(fieldBoxClass, {
  variants: {
    size: {
      sm: "h-8 px-2 text-sm",
      md: "h-9 px-2 text-sm md:h-10 md:px-3",
      lg: "h-10 px-3 text-sm md:h-12 md:px-4 md:text-base",
    },
    radius: fieldRadius,
  },
  defaultVariants: {
    size: "md",
    radius: "md",
  },
});

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants>;

export function Input({ className, size, radius, ...props }: InputProps) {
  return (
    <input
      className={cn(inputVariants({ size, radius }), className)}
      {...props}
    />
  );
}
