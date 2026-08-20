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

const cardBorderEdgeCompounds = [
  {
    variant: "border" as const,
    padding: "sm" as const,
    class: "[--card-edge-inset:calc(var(--spacing)_*_2)]",
  },
  {
    variant: "border" as const,
    padding: "md" as const,
    class: "[--card-edge-inset:calc(var(--spacing)_*_4)]",
  },
  {
    variant: "border" as const,
    padding: "lg" as const,
    class: "[--card-edge-inset:calc(var(--spacing)_*_6)]",
  },
];

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

type CardSurface = "panel" | "glass";
type CardLight = "none" | ButtonColor;

function isLightColor(value: string | null | undefined): value is ButtonColor {
  return Boolean(value && value !== "none" && value in cssVarByColor);
}

function spotMix(color: string | null | undefined, glass: boolean): string {
  if (!isLightColor(color)) {
    return "transparent";
  }

  const token = cssVarByColor[color];
  return glass
    ? `color-mix(in srgb, var(${token}) 18%, transparent)`
    : `color-mix(in srgb, var(${token}) 18%, var(--panel))`;
}

function lightVars(
  surface: CardSurface | null | undefined,
  lightBottom: string | null | undefined,
  lightTop: string | null | undefined,
  lightStart: string | null | undefined,
  lightEnd: string | null | undefined,
): CSSProperties {
  const glass = surface === "glass";
  const lit =
    isLightColor(lightBottom) ||
    isLightColor(lightTop) ||
    isLightColor(lightStart) ||
    isLightColor(lightEnd);

  return {
    "--card-spot-bottom": spotMix(lightBottom, glass),
    "--card-spot-top": spotMix(lightTop, glass),
    "--card-spot-start": spotMix(lightStart, glass),
    "--card-spot-end": spotMix(lightEnd, glass),
    "--card-base": glass
      ? lit
        ? "color-mix(in srgb, var(--panel) 42%, transparent)"
        : "color-mix(in srgb, var(--panel) 72%, transparent)"
      : "var(--panel)",
  } as CSSProperties;
}

const lightVariants = {
  none: "",
  ...Object.fromEntries(buttonColors.map((color) => [color, ""])),
} as Record<CardLight, string>;

const cardBorderWidth = {
  none: "var(--theme-border-width-none)",
  sm: "var(--theme-border-width-sm)",
  md: "var(--theme-border-width-md)",
  lg: "var(--theme-border-width-lg)",
} as const;

const cardBorderColors = {
  border: "var(--border)",
  background: "var(--background)",
  foreground: "var(--foreground)",
  primary: "var(--primary)",
  "accent-1": "var(--accent-1)",
  "accent-2": "var(--accent-2)",
  "accent-3": "var(--accent-3)",
  "accent-4": "var(--accent-4)",
  success: "var(--success)",
  warning: "var(--warning)",
  error: "var(--error)",
} as const;

const borderColorVariants = {
  border: "border-border",
  background: "border-background",
  foreground: "border-foreground",
  primary: "border-primary",
  "accent-1": "border-accent-1",
  "accent-2": "border-accent-2",
  "accent-3": "border-accent-3",
  "accent-4": "border-accent-4",
  success: "border-success",
  warning: "border-warning",
  error: "border-error",
} as const;

function borderVars(
  border: keyof typeof cardBorderWidth | null | undefined,
  borderColor: keyof typeof cardBorderColors | null | undefined,
): CSSProperties {
  return {
    "--card-border-width": cardBorderWidth[border ?? "sm"],
    "--card-border-color": cardBorderColors[borderColor ?? "border"],
  } as CSSProperties;
}

export const cardVariants = cva(
  "flex min-w-0 flex-col overflow-hidden bg-card-spots text-panel-foreground text-start",
  {
    variants: {
      surface: {
        panel: "",
        glass: "backdrop-blur-sm",
      },
      lightBottom: lightVariants,
      lightTop: lightVariants,
      lightStart: lightVariants,
      lightEnd: lightVariants,
      padding: cardPadding,
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
      border: {
        none: "",
        sm: "",
        md: "",
        lg: "",
      },
      borderColor: borderColorVariants,
    },
    defaultVariants: {
      surface: "panel",
      lightBottom: "none",
      lightTop: "none",
      lightStart: "none",
      lightEnd: "none",
      padding: "none",
      radius: "md",
      border: "sm",
      borderColor: "border",
    },
  },
);

export type CardProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardVariants>;

export function Card({
  className,
  surface,
  lightBottom,
  lightTop,
  lightStart,
  lightEnd,
  padding,
  radius,
  border,
  borderColor,
  style,
  ...props
}: CardProps) {
  return (
    <div
      className={cn(
        cardVariants({
          surface,
          lightBottom,
          lightTop,
          lightStart,
          lightEnd,
          padding,
          radius,
          border,
          borderColor,
        }),
        className,
      )}
      style={{
        ...borderVars(border, borderColor),
        borderStyle: "solid",
        borderWidth: "var(--card-border-width)",
        borderColor: "var(--card-border-color)",
        ...lightVars(surface, lightBottom, lightTop, lightStart, lightEnd),
        ...style,
      }}
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
        border: "card-edge-bottom",
        divider: "card-edge-bottom bg-panel-hover/50",
      },
      padding: cardPadding,
    },
    compoundVariants: cardBorderEdgeCompounds,
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
        border: "card-edge-top",
        divider: "card-edge-top bg-panel-hover/50",
      },
      padding: cardPadding,
    },
    compoundVariants: cardBorderEdgeCompounds,
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
