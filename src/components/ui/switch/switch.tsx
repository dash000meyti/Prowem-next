"use client";

import { cva, type VariantProps } from "class-variance-authority";
import { useState, type ButtonHTMLAttributes, type CSSProperties } from "react";
import { buttonColors, type ButtonColor } from "@/components/ui/button";
import { fieldRadius } from "@/components/ui/input";
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

const thumbOnByColor: Record<ButtonColor, string> = {
  background: "bg-foreground",
  foreground: "bg-background",
  primary: "bg-primary-glow",
  "accent-1": "bg-accent-1-glow",
  "accent-2": "bg-accent-2-glow",
  "accent-3": "bg-accent-3-glow",
  "accent-4": "bg-accent-4-glow",
  success: "bg-success-glow",
  warning: "bg-warning-glow",
  error: "bg-error-glow",
};

/** 2× p-1 — thumb is square with equal inset (track outline is inset, no extra box size). */
const switchChromeInset = "0.5rem";

export const switchVariants = cva(
  "inline-flex shrink-0 items-center p-1 shadow-outline-sm transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      color: colorVariants,
      /** Track heights: sm 20px; md 28px; lg 34px (= Button md). Width = 2× height − chrome inset. */
      size: {
        sm: "h-5 w-[calc(2.5rem-var(--switch-chrome-inset))]",
        md: "h-7 w-[calc(3.5rem-var(--switch-chrome-inset))]",
        lg: "h-[2.125rem] w-[calc(4.25rem-var(--switch-chrome-inset))]",
      },
      radius: fieldRadius,
      checked: {
        true: "",
        false: "bg-panel",
      },
    },
    defaultVariants: {
      color: "primary",
      size: "lg",
      radius: "full",
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

export const switchThumbVariants = cva(
  "block aspect-square h-full w-auto shrink-0",
  {
    variants: {
      color: colorVariants,
      radius: fieldRadius,
      checked: {
        true: "",
        false: "bg-border",
      },
    },
    defaultVariants: {
      color: "primary",
      radius: "full",
      checked: false,
    },
    compoundVariants: [
      ...buttonColors.map((color) => ({
        checked: true as const,
        color,
        class: thumbOnByColor[color],
      })),
    ],
  },
);

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
  size = "lg",
  radius,
  checked,
  defaultChecked = false,
  disabled,
  onCheckedChange,
  onClick,
  style,
  ...props
}: SwitchProps) {
  const isControlled = checked !== undefined;
  const [uncontrolled, setUncontrolled] = useState(defaultChecked);
  const resolved = Boolean(isControlled ? checked : uncontrolled);
  const resolvedSize = size ?? "lg";
  const resolvedRadius = radius ?? "full";
  const resolvedColor = color ?? "primary";

  return (
    <button
      type="button"
      role="switch"
      aria-checked={resolved}
      disabled={disabled}
      style={
        {
          ...style,
          "--switch-chrome-inset": switchChromeInset,
        } as CSSProperties
      }
      className={cn(
        switchVariants({
          color: resolvedColor,
          size: resolvedSize,
          radius: resolvedRadius,
          checked: resolved,
        }),
        className,
      )}
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
          switchThumbVariants({
            color: resolvedColor,
            radius: resolvedRadius,
            checked: resolved,
          }),
          resolved && "ms-auto",
        )}
      />
    </button>
  );
}
