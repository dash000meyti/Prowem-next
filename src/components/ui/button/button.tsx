import { cva, type VariantProps } from "class-variance-authority";
import type { ButtonHTMLAttributes, ReactNode } from "react";
import { Icon, type IconName } from "@/components/icons";
import { cn } from "@/lib/cn";

export const buttonColors = [
  "primary",
  "background",
  "foreground",
  "accent-1",
  "accent-2",
  "accent-3",
  "accent-4",
  "success",
  "warning",
  "error",
] as const;

export type ButtonColor = (typeof buttonColors)[number];

const glowByColor: Record<ButtonColor, string> = {
  background: "hover:shadow-glow-background active:shadow-none",
  foreground: "hover:shadow-glow-foreground active:shadow-none",
  primary: "hover:shadow-glow-primary active:shadow-none",
  "accent-1": "hover:shadow-glow-accent-1 active:shadow-none",
  "accent-2": "hover:shadow-glow-accent-2 active:shadow-none",
  "accent-3": "hover:shadow-glow-accent-3 active:shadow-none",
  "accent-4": "hover:shadow-glow-accent-4 active:shadow-none",
  success: "hover:shadow-glow-success active:shadow-none",
  warning: "hover:shadow-glow-warning active:shadow-none",
  error: "hover:shadow-glow-error active:shadow-none",
};

const pressGlowByColor: Record<ButtonColor, string> = {
  background: "active:shadow-glow-sm-background aria-expanded:shadow-glow-sm-background",
  foreground: "active:shadow-glow-sm-foreground aria-expanded:shadow-glow-sm-foreground",
  primary: "active:shadow-glow-sm-primary aria-expanded:shadow-glow-sm-primary",
  "accent-1": "active:shadow-glow-sm-accent-1 aria-expanded:shadow-glow-sm-accent-1",
  "accent-2": "active:shadow-glow-sm-accent-2 aria-expanded:shadow-glow-sm-accent-2",
  "accent-3": "active:shadow-glow-sm-accent-3 aria-expanded:shadow-glow-sm-accent-3",
  "accent-4": "active:shadow-glow-sm-accent-4 aria-expanded:shadow-glow-sm-accent-4",
  success: "active:shadow-glow-sm-success aria-expanded:shadow-glow-sm-success",
  warning: "active:shadow-glow-sm-warning aria-expanded:shadow-glow-sm-warning",
  error: "active:shadow-glow-sm-error aria-expanded:shadow-glow-sm-error",
};

const filledByColor: Record<ButtonColor, string> = {
  background: `bg-background text-foreground hover:bg-panel ${glowByColor.background}`,
  foreground: `bg-foreground text-background hover:bg-panel-foreground ${glowByColor.foreground}`,
  primary: `bg-primary text-primary-foreground hover:bg-primary-hover ${glowByColor.primary}`,
  "accent-1": `bg-accent-1 text-accent-1-foreground hover:bg-accent-1-hover ${glowByColor["accent-1"]}`,
  "accent-2": `bg-accent-2 text-accent-2-foreground hover:bg-accent-2-hover ${glowByColor["accent-2"]}`,
  "accent-3": `bg-accent-3 text-accent-3-foreground hover:bg-accent-3-hover ${glowByColor["accent-3"]}`,
  "accent-4": `bg-accent-4 text-accent-4-foreground hover:bg-accent-4-hover ${glowByColor["accent-4"]}`,
  success: `bg-success text-success-foreground hover:bg-success-hover ${glowByColor.success}`,
  warning: `bg-warning text-warning-foreground hover:bg-warning-hover ${glowByColor.warning}`,
  error: `bg-error text-error-foreground hover:bg-error-hover ${glowByColor.error}`,
};

const outlineByColor: Record<ButtonColor, string> = {
  background: `text-background hover:bg-background hover:text-foreground ${glowByColor.background} active:shadow-outline`,
  foreground: `text-foreground hover:bg-foreground hover:text-background ${glowByColor.foreground} active:shadow-outline`,
  primary: `text-primary hover:bg-primary hover:text-primary-foreground ${glowByColor.primary} active:shadow-outline`,
  "accent-1": `text-accent-1 hover:bg-accent-1 hover:text-accent-1-foreground ${glowByColor["accent-1"]} active:shadow-outline`,
  "accent-2": `text-accent-2 hover:bg-accent-2 hover:text-accent-2-foreground ${glowByColor["accent-2"]} active:shadow-outline`,
  "accent-3": `text-accent-3 hover:bg-accent-3 hover:text-accent-3-foreground ${glowByColor["accent-3"]} active:shadow-outline`,
  "accent-4": `text-accent-4 hover:bg-accent-4 hover:text-accent-4-foreground ${glowByColor["accent-4"]} active:shadow-outline`,
  success: `text-success hover:bg-success hover:text-success-foreground ${glowByColor.success} active:shadow-outline`,
  warning: `text-warning hover:bg-warning hover:text-warning-foreground ${glowByColor.warning} active:shadow-outline`,
  error: `text-error hover:bg-error hover:text-error-foreground ${glowByColor.error} active:shadow-outline`,
};

const ghostByColor: Record<ButtonColor, string> = {
  background: `text-background hover:bg-background/20 ${pressGlowByColor.background}`,
  foreground: `text-foreground hover:bg-foreground/20 ${pressGlowByColor.foreground}`,
  primary: `text-primary hover:bg-primary-hover/20 ${pressGlowByColor.primary}`,
  "accent-1": `text-accent-1 hover:bg-accent-1-hover/20 ${pressGlowByColor["accent-1"]}`,
  "accent-2": `text-accent-2 hover:bg-accent-2-hover/20 ${pressGlowByColor["accent-2"]}`,
  "accent-3": `text-accent-3 hover:bg-accent-3-hover/20 ${pressGlowByColor["accent-3"]}`,
  "accent-4": `text-accent-4 hover:bg-accent-4-hover/20 ${pressGlowByColor["accent-4"]}`,
  success: `text-success hover:bg-success-hover/20 ${pressGlowByColor.success}`,
  warning: `text-warning hover:bg-warning-hover/20 ${pressGlowByColor.warning}`,
  error: `text-error hover:bg-error-hover/20 ${pressGlowByColor.error}`,
};

const subtleByColor: Record<ButtonColor, string> = {
  background: `text-panel-foreground hover:bg-background/20 hover:text-background ${pressGlowByColor.background}`,
  foreground: `text-panel-foreground hover:bg-foreground/20 hover:text-foreground ${pressGlowByColor.foreground}`,
  primary: `text-panel-foreground hover:bg-primary-hover/20 hover:text-primary ${pressGlowByColor.primary}`,
  "accent-1": `text-panel-foreground hover:bg-accent-1-hover/20 hover:text-accent-1 ${pressGlowByColor["accent-1"]}`,
  "accent-2": `text-panel-foreground hover:bg-accent-2-hover/20 hover:text-accent-2 ${pressGlowByColor["accent-2"]}`,
  "accent-3": `text-panel-foreground hover:bg-accent-3-hover/20 hover:text-accent-3 ${pressGlowByColor["accent-3"]}`,
  "accent-4": `text-panel-foreground hover:bg-accent-4-hover/20 hover:text-accent-4 ${pressGlowByColor["accent-4"]}`,
  success: `text-panel-foreground hover:bg-success-hover/20 hover:text-success ${pressGlowByColor.success}`,
  warning: `text-panel-foreground hover:bg-warning-hover/20 hover:text-warning ${pressGlowByColor.warning}`,
  error: `text-panel-foreground hover:bg-error-hover/20 hover:text-error ${pressGlowByColor.error}`,
};

const secondaryByColor: Record<ButtonColor, string> = {
  background: `hover:bg-background ${pressGlowByColor.background}`,
  foreground: `hover:bg-foreground/20 ${pressGlowByColor.foreground}`,
  primary: `hover:bg-primary-hover/20 ${pressGlowByColor.primary}`,
  "accent-1": `hover:bg-accent-1-hover/20 ${pressGlowByColor["accent-1"]}`,
  "accent-2": `hover:bg-accent-2-hover/20 ${pressGlowByColor["accent-2"]}`,
  "accent-3": `hover:bg-accent-3-hover/20 ${pressGlowByColor["accent-3"]}`,
  "accent-4": `hover:bg-accent-4-hover/20 ${pressGlowByColor["accent-4"]}`,
  success: `hover:bg-success-hover/20 ${pressGlowByColor.success}`,
  warning: `hover:bg-warning-hover/20 ${pressGlowByColor.warning}`,
  error: `hover:bg-error-hover/20 ${pressGlowByColor.error}`,
};

const softByColor: Record<ButtonColor, string> = {
  background: `text-background hover:bg-background ${pressGlowByColor.background}`,
  foreground: `text-foreground hover:bg-foreground/20 ${pressGlowByColor.foreground}`,
  primary: `text-primary hover:bg-primary-hover/20 ${pressGlowByColor.primary}`,
  "accent-1": `text-accent-1 hover:bg-accent-1-hover/20 ${pressGlowByColor["accent-1"]}`,
  "accent-2": `text-accent-2 hover:bg-accent-2-hover/20 ${pressGlowByColor["accent-2"]}`,
  "accent-3": `text-accent-3 hover:bg-accent-3-hover/20 ${pressGlowByColor["accent-3"]}`,
  "accent-4": `text-accent-4 hover:bg-accent-4-hover/20 ${pressGlowByColor["accent-4"]}`,
  success: `text-success hover:bg-success-hover/20 ${pressGlowByColor.success}`,
  warning: `text-warning hover:bg-warning-hover/20 ${pressGlowByColor.warning}`,
  error: `text-error hover:bg-error-hover/20 ${pressGlowByColor.error}`,
};

const pressTintByColor: Record<ButtonColor, string> = {
  background: "active:bg-background/20 aria-expanded:bg-background/20",
  foreground: "active:bg-foreground/20 aria-expanded:bg-foreground/20",
  primary: "active:bg-primary-hover/20 aria-expanded:bg-primary-hover/20",
  "accent-1": "active:bg-accent-1-hover/20 aria-expanded:bg-accent-1-hover/20",
  "accent-2": "active:bg-accent-2-hover/20 aria-expanded:bg-accent-2-hover/20",
  "accent-3": "active:bg-accent-3-hover/20 aria-expanded:bg-accent-3-hover/20",
  "accent-4": "active:bg-accent-4-hover/20 aria-expanded:bg-accent-4-hover/20",
  success: "active:bg-success-hover/20 aria-expanded:bg-success-hover/20",
  warning: "active:bg-warning-hover/20 aria-expanded:bg-warning-hover/20",
  error: "active:bg-error-hover/20 aria-expanded:bg-error-hover/20",
};

const linkByColor: Record<ButtonColor, string> = {
  background: `text-background hover:text-panel ${pressTintByColor.background}`,
  foreground: `text-foreground hover:text-panel-foreground ${pressTintByColor.foreground}`,
  primary: `text-primary hover:text-primary-hover ${pressTintByColor.primary}`,
  "accent-1": `text-accent-1 hover:text-accent-1-hover ${pressTintByColor["accent-1"]}`,
  "accent-2": `text-accent-2 hover:text-accent-2-hover ${pressTintByColor["accent-2"]}`,
  "accent-3": `text-accent-3 hover:text-accent-3-hover ${pressTintByColor["accent-3"]}`,
  "accent-4": `text-accent-4 hover:text-accent-4-hover ${pressTintByColor["accent-4"]}`,
  success: `text-success hover:text-success-hover ${pressTintByColor.success}`,
  warning: `text-warning hover:text-warning-hover ${pressTintByColor.warning}`,
  error: `text-error hover:text-error-hover ${pressTintByColor.error}`,
};

const mutedByColor: Record<ButtonColor, string> = {
  background: `text-panel-foreground hover:text-panel ${pressTintByColor.background}`,
  foreground: `text-panel-foreground hover:text-panel-foreground ${pressTintByColor.foreground}`,
  primary: `text-panel-foreground hover:text-primary-hover ${pressTintByColor.primary}`,
  "accent-1": `text-panel-foreground hover:text-accent-1-hover ${pressTintByColor["accent-1"]}`,
  "accent-2": `text-panel-foreground hover:text-accent-2-hover ${pressTintByColor["accent-2"]}`,
  "accent-3": `text-panel-foreground hover:text-accent-3-hover ${pressTintByColor["accent-3"]}`,
  "accent-4": `text-panel-foreground hover:text-accent-4-hover ${pressTintByColor["accent-4"]}`,
  success: `text-panel-foreground hover:text-success-hover ${pressTintByColor.success}`,
  warning: `text-panel-foreground hover:text-warning-hover ${pressTintByColor.warning}`,
  error: `text-panel-foreground hover:text-error-hover ${pressTintByColor.error}`,
};

const colorVariants = Object.fromEntries(
  buttonColors.map((color) => [color, ""]),
) as Record<ButtonColor, string>;

export const buttonVariants = cva(
  "inline-flex max-w-full items-center justify-center font-medium transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      variant: {
        filled: "",
        secondary: "bg-panel text-panel-foreground",
        outline: "bg-transparent shadow-outline",
        soft: "bg-transparent shadow-outline",
        ghost: "bg-transparent",
        subtle: "bg-transparent",
        link: "bg-transparent underline-offset-4 hover:underline",
        muted: "bg-transparent underline-offset-4 hover:underline",
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
      variant: "filled",
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
        variant: "filled" as const,
        color,
        class: filledByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "secondary" as const,
        color,
        class: secondaryByColor[color],
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
        variant: "ghost" as const,
        color,
        class: ghostByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "subtle" as const,
        color,
        class: subtleByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "link" as const,
        color,
        class: linkByColor[color],
      })),
      ...buttonColors.map((color) => ({
        variant: "muted" as const,
        color,
        class: mutedByColor[color],
      })),
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
