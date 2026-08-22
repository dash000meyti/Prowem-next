import { cva, type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes, Ref } from "react";
import { cn } from "@/lib/cn";

/** Shared field chrome: panel fill, sm border inside the box. Select and Textarea reuse this. */
export const fieldBoxClass =
  "w-full min-w-0 appearance-none bg-panel text-panel-foreground shadow-outline-sm transition placeholder:font-heebo placeholder:font-normal placeholder:text-body placeholder:leading-none placeholder:tracking-normal focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50";

export const fieldRadius = {
  none: "rounded-none",
  xs: "rounded-xs",
  sm: "rounded-sm",
  md: "rounded-md",
  lg: "rounded-lg",
  xl: "rounded-xl",
  full: "rounded-full",
} as const;

/**
 * Heights and type match Button: sm 32/14, md 34/16, lg 40/18 (px).
 * Horizontal padding matches Button (12 / 14 / 16).
 */
export const fieldSize = {
  sm: "h-8 px-3 text-sm",
  md: "h-[34px] px-3.5 text-base",
  lg: "h-10 px-4 text-lg",
} as const;

/** Select / SelectMenu / Combobox triggers — same height and type; end padding for chevron. */
export const fieldSelectSize = {
  sm: "h-8 ps-3 pe-8 text-sm",
  md: "h-[34px] ps-3.5 pe-9 text-base",
  lg: "h-10 ps-4 pe-10 text-lg",
} as const;

export const fieldChevronEnd = {
  sm: "end-2",
  md: "end-3",
  lg: "end-4",
} as const;

export const inputVariants = cva(fieldBoxClass, {
  variants: {
    size: fieldSize,
    radius: fieldRadius,
  },
  defaultVariants: {
    size: "md",
    radius: "sm",
  },
});

export type InputProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size"> &
  VariantProps<typeof inputVariants> & {
    ref?: Ref<HTMLInputElement>;
  };

export function Input({ className, size, radius, ref, ...props }: InputProps) {
  return (
    <input
      ref={ref}
      className={cn(inputVariants({ size, radius }), className)}
      {...props}
    />
  );
}
