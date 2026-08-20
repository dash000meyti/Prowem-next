"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useState, type ButtonHTMLAttributes } from "react";
import { buttonColors, type ButtonColor } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const onByColor: Record<ButtonColor, string> = {
  background: "bg-background",
  foreground: "bg-foreground",
  primary: "bg-primary",
  "accent-1": "bg-accent-1",
  "accent-2": "bg-accent-2",
  "accent-3": "bg-accent-3",
  "accent-4": "bg-accent-4",
  success: "bg-success",
  warning: "bg-warning",
  error: "bg-error",
};

const colorVariants = Object.fromEntries(
  buttonColors.map((color) => [color, ""]),
) as Record<ButtonColor, string>;

export const switchVariants = cva(
  "inline-flex shrink-0 items-center border-md border-border p-0.5 transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: colorVariants,
      size: {
        sm: "h-5 w-9 rounded-full",
        md: "h-6 w-11 rounded-full",
        lg: "h-7 w-12 rounded-full",
      },
      checked: {
        true: "",
        false: "bg-panel",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "md",
      checked: false,
    },
    compoundVariants: [
      ...buttonColors.map((color) => ({
        checked: true as const,
        color,
        class: onByColor[color],
      })),
    ],
  },
);

const thumbBySize = {
  sm: "size-3.5",
  md: "size-4",
  lg: "size-5",
} as const;

export type SwitchProps = Omit<
  ButtonHTMLAttributes<HTMLButtonElement>,
  "color" | "onChange"
> &
  Omit<VariantProps<typeof switchVariants>, "checked"> & {
    checked?: boolean;
    defaultChecked?: boolean;
    onCheckedChange?: (checked: boolean) => void;
  };

export function Switch({
  className,
  color,
  size = "md",
  checked,
  defaultChecked = false,
  disabled,
  onCheckedChange,
  onClick,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const resolved = Boolean(isControlled ? checked : uncontrolled);
  const thumbSize = thumbBySize[size ?? "md"];

  return (
    <button
      type="button"
      role="switch"
      aria-checked={resolved}
      disabled={disabled}
      className={cn(switchVariants({ color, size, checked: resolved }), className)}
      onClick={(event) => {
        onClick?.(event);
        if (event.defaultPrevented || disabled) {
          return;
        }
        const next = !resolved;
        if (!isControlled) {
          setUncontrolled(next);
        }
        onCheckedChange?.(next);
      }}
      {...props}
    >
      <span
        className={cn(
          "block rounded-full bg-background shadow-sm",
          thumbSize,
          resolved && "ms-auto",
        )}
      />
    </button>
  );
}
