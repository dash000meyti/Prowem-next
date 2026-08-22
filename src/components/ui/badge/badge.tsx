import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { buttonColors, type ButtonColor } from "@/components/ui/button";
import { fieldRadius } from "@/components/ui/input";
import { cn } from "@/lib/cn";

const filledByColor: Record<ButtonColor, string> = {
  background: "bg-background text-foreground",
  foreground: "bg-foreground text-background",
  primary: "bg-primary text-primary-foreground",
  "accent-1": "bg-accent-1 text-accent-1-foreground",
  "accent-2": "bg-accent-2 text-accent-2-foreground",
  "accent-3": "bg-accent-3 text-accent-3-foreground",
  "accent-4": "bg-accent-4 text-accent-4-foreground",
  success: "bg-success text-success-foreground",
  warning: "bg-warning text-warning-foreground",
  error: "bg-error text-error-foreground",
};

const outlineByColor: Record<ButtonColor, string> = {
  background: "text-background shadow-outline-sm",
  foreground: "text-foreground shadow-outline-sm",
  primary: "text-primary shadow-outline-sm",
  "accent-1": "text-accent-1 shadow-outline-sm",
  "accent-2": "text-accent-2 shadow-outline-sm",
  "accent-3": "text-accent-3 shadow-outline-sm",
  "accent-4": "text-accent-4 shadow-outline-sm",
  success: "text-success shadow-outline-sm",
  warning: "text-warning shadow-outline-sm",
  error: "text-error shadow-outline-sm",
};

const softByColor: Record<ButtonColor, string> = {
  background: "bg-background/20 text-background",
  foreground: "bg-foreground/20 text-foreground",
  primary: "bg-primary-hover/20 text-primary",
  "accent-1": "bg-accent-1-hover/20 text-accent-1",
  "accent-2": "bg-accent-2-hover/20 text-accent-2",
  "accent-3": "bg-accent-3-hover/20 text-accent-3",
  "accent-4": "bg-accent-4-hover/20 text-accent-4",
  success: "bg-success-hover/20 text-success",
  warning: "bg-warning-hover/20 text-warning",
  error: "bg-error-hover/20 text-error",
};

const mutedByColor: Record<ButtonColor, string> = {
  background: "bg-panel text-panel-foreground",
  foreground: "bg-panel text-panel-foreground",
  primary: "bg-panel text-primary",
  "accent-1": "bg-panel text-accent-1",
  "accent-2": "bg-panel text-accent-2",
  "accent-3": "bg-panel text-accent-3",
  "accent-4": "bg-panel text-accent-4",
  success: "bg-panel text-success",
  warning: "bg-panel text-warning",
  error: "bg-panel text-error",
};

const colorVariants = Object.fromEntries(
  buttonColors.map((color) => [color, ""]),
) as Record<ButtonColor, string>;

export const badgeVariants = cva(
  "inline-flex max-w-full items-center font-medium",
  {
    variants: {
      variant: {
        filled: "",
        outline: "bg-transparent",
        soft: "",
        muted: "",
      },
      color: colorVariants,
      size: {
        sm: "px-2 py-0.5 text-xs",
        md: "px-2.5 py-0.5 text-sm",
      },
      radius: fieldRadius,
    },
    defaultVariants: {
      variant: "filled",
      color: "primary",
      size: "sm",
      radius: "full",
    },
    compoundVariants: [
      ...buttonColors.map((color) => ({
        variant: "filled" as const,
        color,
        class: filledByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "outline" as const,
        color,
        class: outlineByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "soft" as const,
        color,
        class: softByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "muted" as const,
        color,
        class: mutedByColor[color],
      })),
    ],
  },
);

export type BadgeProps = Omit<HTMLAttributes<HTMLSpanElement>, "color"> &
  VariantProps<typeof badgeVariants>;

export function Badge({
  className,
  variant,
  color,
  size,
  radius,
  ...props
}: BadgeProps) {
  return (
    <span
      className={cn(badgeVariants({ variant, color, size, radius }), className)}
      {...props}
    />
  );
}
