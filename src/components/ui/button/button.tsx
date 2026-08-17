import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

export const buttonColors = [
  "primary",
  "accent-1",
  "accent-2",
  "accent-3",
  "accent-4",
  "success",
  "warning",
  "error",
] as const;

export type ButtonColor = (typeof buttonColors)[number];

const filledByColor: Record<ButtonColor, string> = {
  primary: "bg-primary text-primary-foreground hover:bg-primary-hover",
  "accent-1": "bg-accent-1 text-accent-1-foreground hover:bg-accent-1-hover",
  "accent-2": "bg-accent-2 text-accent-2-foreground hover:bg-accent-2-hover",
  "accent-3": "bg-accent-3 text-accent-3-foreground hover:bg-accent-3-hover",
  "accent-4": "bg-accent-4 text-accent-4-foreground hover:bg-accent-4-hover",
  success: "bg-success text-success-foreground hover:bg-success-hover",
  warning: "bg-warning text-warning-foreground hover:bg-warning-hover",
  error: "bg-error text-error-foreground hover:bg-error-hover",
};

const outlineByColor: Record<ButtonColor, string> = {
  primary:
    "border-primary text-primary hover:bg-primary hover:text-primary-foreground",
  "accent-1":
    "border-accent-1 text-accent-1 hover:bg-accent-1 hover:text-accent-1-foreground",
  "accent-2":
    "border-accent-2 text-accent-2 hover:bg-accent-2 hover:text-accent-2-foreground",
  "accent-3":
    "border-accent-3 text-accent-3 hover:bg-accent-3 hover:text-accent-3-foreground",
  "accent-4":
    "border-accent-4 text-accent-4 hover:bg-accent-4 hover:text-accent-4-foreground",
  success:
    "border-success text-success hover:bg-success hover:text-success-foreground",
  warning:
    "border-warning text-warning hover:bg-warning hover:text-warning-foreground",
  error: "border-error text-error hover:bg-error hover:text-error-foreground",
};

const ghostByColor: Record<ButtonColor, string> = {
  primary: "text-foreground hover:bg-panel",
  "accent-1": "text-accent-1 hover:bg-accent-1-hover/20",
  "accent-2": "text-accent-2 hover:bg-accent-2-hover/20",
  "accent-3": "text-accent-3 hover:bg-accent-3-hover/20",
  "accent-4": "text-accent-4 hover:bg-accent-4-hover/20",
  success: "text-success hover:bg-success-hover/20",
  warning: "text-warning hover:bg-warning-hover/20",
  error: "text-error hover:bg-error-hover/20",
};

const linkByColor: Record<ButtonColor, string> = {
  primary: "text-primary hover:text-primary-hover",
  "accent-1": "text-accent-1 hover:text-accent-1-hover",
  "accent-2": "text-accent-2 hover:text-accent-2-hover",
  "accent-3": "text-accent-3 hover:text-accent-3-hover",
  "accent-4": "text-accent-4 hover:text-accent-4-hover",
  success: "text-success hover:text-success-hover",
  warning: "text-warning hover:text-warning-hover",
  error: "text-error hover:text-error-hover",
};

const colorVariants = Object.fromEntries(
  buttonColors.map((color) => [color, ""]),
) as Record<ButtonColor, string>;

export const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center font-medium transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        primary: "",
        secondary: "bg-panel text-panel-foreground hover:bg-panel-hover",
        outline: "border-sm bg-transparent",
        ghost: "bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline",
      },
      color: colorVariants,
      size: {
        sm: "h-8 px-3 text-sm",
        md: "h-9 px-3.5 text-sm md:h-10 md:px-4",
        lg: "h-10 px-4 text-sm md:h-12 md:px-6 md:text-base",
      },
      iconOnly: {
        true: "shrink-0 gap-0",
        false: "",
      },
      radius: {
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        xl: "rounded-xl",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      variant: "primary",
      color: "primary",
      size: "md",
      radius: "full",
      iconOnly: false,
    },
    compoundVariants: [
      {
        iconOnly: true,
        size: "sm",
        class: "size-8 px-0",
      },
      {
        iconOnly: true,
        size: "md",
        class: "size-9 px-0 md:size-10 md:px-0",
      },
      {
        iconOnly: true,
        size: "lg",
        class: "size-10 px-0 md:size-12 md:px-0",
      },
      ...buttonColors.map((color) => ({
        variant: "primary" as const,
        color,
        class: filledByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "outline" as const,
        color,
        class: outlineByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "ghost" as const,
        color,
        class: ghostByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "link" as const,
        color,
        class: linkByColor[color],
      })),
      {
        variant: "link",
        class: "h-auto min-h-0 px-0 py-0 md:h-auto md:px-0",
      },
    ],
  },
);

export type ButtonProps = Omit<ButtonHTMLAttributes<HTMLButtonElement>, "color"> &
  Omit<VariantProps<typeof buttonVariants>, "iconOnly"> & {
    icon?: IconName;
    iconPosition?: "start" | "end";
  };

function hasButtonLabel(children: ReactNode): boolean {
  if (children === undefined || children === null || children === false || children === true) {
    return false;
  }

  if (typeof children === "string" && children.trim() === "") {
    return false;
  }

  return true;
}

export function Button({
  className,
  variant,
  color,
  size,
  radius,
  icon,
  iconPosition = "start",
  type = "button",
  children,
  ...props
}: ButtonProps) {
  const iconOnly = Boolean(icon) && !hasButtonLabel(children);
  const iconNode = icon ? (
    <Icon name={icon} className={iconOnly ? "size-5" : "size-4"} />
  ) : null;

  return (
    <button
      type={type}
      className={cn(
        buttonVariants({ variant, color, size, radius, iconOnly }),
        icon && !iconOnly && "gap-2",
        className,
      )}
      {...props}
    >
      {iconPosition === "end" ? (
        <>
          {children}
          {iconNode}
        </>
      ) : (
        <>
          {iconNode}
          {children}
        </>
      )}
    </button>
  );
}
