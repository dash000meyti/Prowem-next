import { cva, type VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes } from "react";
import { buttonColors, type ButtonColor } from "@/components/ui/button";
import { cn } from "@/lib/cn";

const cardPadding = {
  none: "",
  sm: "p-2",
  md: "p-4",
  lg: "p-6",
} as const;

const cssVarByColor: Record<ButtonColor, string> = {
  background: "--background",
  foreground: "--foreground",
  primary: "--primary",
  "accent-1": "--accent-1",
  "accent-2": "--accent-2",
  "accent-3": "--accent-3",
  "accent-4": "--accent-4",
  success: "--success",
  warning: "--warning",
  error: "--error",
};

function lightVars(
  surface:
    | "panel"
    | "glass"
    | "light"
    | "glass-light"
    | "light-dual"
    | "glass-light-dual"
    | null
    | undefined,
  color: ButtonColor | null | undefined,
): CSSProperties | undefined {
  if (
    surface !== "light" &&
    surface !== "glass-light" &&
    surface !== "light-dual" &&
    surface !== "glass-light-dual"
  ) {
    return undefined;
  }

  const token = cssVarByColor[color ?? "primary"];
  const glass = surface === "glass-light" || surface === "glass-light-dual";
  const dual = surface === "light-dual" || surface === "glass-light-dual";

  const vars = {
    "--card-spot": glass
      ? `color-mix(in srgb, var(${token}) 18%, transparent)`
      : `color-mix(in srgb, var(${token}) 18%, var(--panel))`,
    "--card-base": glass
      ? "color-mix(in srgb, var(--panel) 42%, transparent)"
      : "var(--panel)",
  } as CSSProperties;

  if (!dual) {
    return vars;
  }

  return {
    ...vars,
    "--card-spot-fg": glass
      ? "color-mix(in srgb, var(--foreground) 18%, transparent)"
      : "color-mix(in srgb, var(--foreground) 18%, var(--panel))",
  } as CSSProperties;
}

const colorVariants = Object.fromEntries(
  buttonColors.map((color) => [color, ""]),
) as Record<ButtonColor, string>;

export const cardVariants = cva(
  "flex min-w-0 flex-col overflow-hidden border border-sm border-border text-panel-foreground text-start",
  {
    variants: {
      surface: {
        panel: "bg-panel",
        glass: "bg-panel/72 backdrop-blur-sm",
        light: "bg-card-light",
        "glass-light": "bg-card-glass-light backdrop-blur-sm",
        "light-dual": "bg-card-light-dual",
        "glass-light-dual": "bg-card-light-dual backdrop-blur-sm",
      },
      color: colorVariants,
      padding: cardPadding,
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
    },
    defaultVariants: {
      surface: "panel",
      color: "primary",
      padding: "none",
      radius: "md",
    },
  },
);

export type CardProps = Omit<HTMLAttributes<HTMLDivElement>, "color"> &
  VariantProps<typeof cardVariants>;

export function Card({
  className,
  surface,
  color,
  padding,
  radius,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(cardVariants({ surface, color, padding, radius }), className)}
      style={{ ...lightVars(surface, color), ...style }}
      {...props}
    />
  );
}

export const cardHeaderVariants = cva(
  "flex min-w-0 shrink-0 flex-col gap-1.5 text-start",
  {
    variants: {
      variant: {
        none: "",
        filled: "bg-panel-hover/50",
        border: "shadow-edge-bottom",
        divider: "shadow-edge-bottom bg-panel-hover/50",
      },
      padding: cardPadding,
    },
    defaultVariants: {
      variant: "none",
      padding: "md",
    },
  },
);

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardHeaderVariants>;

export function CardHeader({
  className,
  variant,
  padding,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(cardHeaderVariants({ variant, padding }), className)}
      {...props}
    />
  );
}

export type CardTitleProps = HTMLAttributes<HTMLDivElement>;

export function CardTitle({ className, ...props }: CardTitleProps) {
  return (
    <div
      className={cn(
        "min-w-0 text-start text-base font-semibold tracking-tight",
        className,
      )}
      {...props}
    />
  );
}

export type CardDescriptionProps = HTMLAttributes<HTMLDivElement>;

export function CardDescription({ className, ...props }: CardDescriptionProps) {
  return (
    <div
      className={cn(
        "min-w-0 text-start text-sm text-panel-foreground/70",
        className,
      )}
      {...props}
    />
  );
}

export const cardContentVariants = cva("min-h-0 min-w-0 flex-1 text-start", {
  variants: {
    padding: cardPadding,
  },
  defaultVariants: {
    padding: "md",
  },
});

export type CardContentProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardContentVariants>;

export function CardContent({
  className,
  padding,
  ...props
}: CardContentProps) {
  return (
    <div
      className={cn(cardContentVariants({ padding }), className)}
      {...props}
    />
  );
}

export const cardFooterVariants = cva(
  "flex min-w-0 shrink-0 flex-wrap items-center gap-2 text-start",
  {
    variants: {
      variant: {
        none: "",
        filled: "bg-panel-hover/50",
        border: "shadow-edge-top",
        divider: "shadow-edge-top bg-panel-hover/50",
      },
      padding: cardPadding,
    },
    defaultVariants: {
      variant: "none",
      padding: "md",
    },
  },
);

export type CardFooterProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardFooterVariants>;

export function CardFooter({
  className,
  variant,
  padding,
  ...props
}: CardFooterProps) {
  return (
    <div
      className={cn(cardFooterVariants({ variant, padding }), className)}
      {...props}
    />
  );
}
