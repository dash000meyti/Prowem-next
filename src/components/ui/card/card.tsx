import { cva, type VariantProps } from "class-variance-authority";
import type { CSSProperties, HTMLAttributes } from "react";
import { buttonColors, type ButtonColor } from "@/components/ui/button";
import { fieldRadius } from "@/components/ui/input";
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
type BorderLightStop = number | `${number}`;

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

function borderLightImage(
  color: string | null | undefined,
  axis: "x" | "y",
  start: BorderLightStop | null | undefined,
  center: BorderLightStop | null | undefined,
  end: BorderLightStop | null | undefined,
): string {
  if (!isLightColor(color)) {
    return "none";
  }

  const token = cssVarByColor[color];
  const direction = axis === "x" ? "90deg" : "180deg";
  const startStop = normalizeBorderLightStop(start, 10);
  const centerStop = normalizeBorderLightStop(center, 50);
  const endStop = normalizeBorderLightStop(end, 90);

  return `linear-gradient(${direction}, color-mix(in srgb, var(${token}) 0%, transparent) ${startStop}%, color-mix(in srgb, var(${token}) 50%, transparent) ${centerStop}%, color-mix(in srgb, var(${token}) 0%, transparent) ${endStop}%)`;
}

function normalizeBorderLightStop(
  value: BorderLightStop | null | undefined,
  fallback: number,
): number {
  if (value === null || value === undefined) {
    return fallback;
  }

  const numericValue =
    typeof value === "number" ? value : Number.parseFloat(value);

  if (Number.isNaN(numericValue)) {
    return fallback;
  }

  return Math.min(100, Math.max(0, numericValue));
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

const cardRadiusVars = {
  none: "var(--theme-radius-none)",
  xs: "var(--theme-radius-xs)",
  sm: "var(--theme-radius-sm)",
  md: "var(--theme-radius-md)",
  lg: "var(--theme-radius-lg)",
  xl: "var(--theme-radius-xl)",
  full: "var(--theme-radius-full)",
} as const;

type CardBorderColorActive = `${ButtonColor}Active`;
export type CardBorderColor = "border" | ButtonColor | CardBorderColorActive;

function mutedCardBorderColor(color: ButtonColor): string {
  return `color-mix(in srgb, var(${cssVarByColor[color]}) 20%, transparent)`;
}

function buildCardBorderColors(): Record<CardBorderColor, string> {
  const colors = { border: "var(--border)" } as Record<CardBorderColor, string>;

  for (const color of buttonColors) {
    colors[color] = mutedCardBorderColor(color);
    colors[`${color}Active`] = `var(${cssVarByColor[color]})`;
  }

  return colors;
}

const cardBorderColors = buildCardBorderColors();

export function resolveCardBorderColor(
  borderColor: CardBorderColor = "border",
): string {
  return cardBorderColors[borderColor];
}

const borderColorVariants = Object.fromEntries(
  Object.keys(cardBorderColors).map((key) => [key, ""]),
) as Record<CardBorderColor, "">;

function borderVars(
  border: keyof typeof cardBorderWidth | null | undefined,
  borderColor: CardBorderColor | null | undefined,
  radius: keyof typeof cardRadiusVars | null | undefined,
  borderLightTop: string | null | undefined,
  borderLightBottom: string | null | undefined,
  borderLightStart: string | null | undefined,
  borderLightEnd: string | null | undefined,
  borderLightTopStart: BorderLightStop | null | undefined,
  borderLightTopCenter: BorderLightStop | null | undefined,
  borderLightTopEnd: BorderLightStop | null | undefined,
  borderLightBottomStart: BorderLightStop | null | undefined,
  borderLightBottomCenter: BorderLightStop | null | undefined,
  borderLightBottomEnd: BorderLightStop | null | undefined,
  borderLightStartStart: BorderLightStop | null | undefined,
  borderLightStartCenter: BorderLightStop | null | undefined,
  borderLightStartEnd: BorderLightStop | null | undefined,
  borderLightEndStart: BorderLightStop | null | undefined,
  borderLightEndCenter: BorderLightStop | null | undefined,
  borderLightEndEnd: BorderLightStop | null | undefined,
): CSSProperties {
  const hasBorder = (border ?? "sm") !== "none";
  const topLit = hasBorder && isLightColor(borderLightTop);
  const bottomLit = hasBorder && isLightColor(borderLightBottom);
  const startLit = hasBorder && isLightColor(borderLightStart);
  const endLit = hasBorder && isLightColor(borderLightEnd);

  return {
    "--card-border-width": cardBorderWidth[border ?? "sm"],
    "--card-border-color": cardBorderColors[borderColor ?? "border"],
    "--card-radius": cardRadiusVars[radius ?? "lg"],
    "--card-border-light-top-image": topLit
      ? borderLightImage(
          borderLightTop,
          "x",
          borderLightTopStart,
          borderLightTopCenter,
          borderLightTopEnd,
        )
      : "none",
    "--card-border-light-bottom-image": bottomLit
      ? borderLightImage(
          borderLightBottom,
          "x",
          borderLightBottomStart,
          borderLightBottomCenter,
          borderLightBottomEnd,
        )
      : "none",
    "--card-border-light-start-image": startLit
      ? borderLightImage(
          borderLightStart,
          "y",
          borderLightStartStart,
          borderLightStartCenter,
          borderLightStartEnd,
        )
      : "none",
    "--card-border-light-end-image": endLit
      ? borderLightImage(
          borderLightEnd,
          "y",
          borderLightEndStart,
          borderLightEndCenter,
          borderLightEndEnd,
        )
      : "none",
  } as CSSProperties;
}

function hasBorderLights(
  border: keyof typeof cardBorderWidth | null | undefined,
  borderLightTop: string | null | undefined,
  borderLightBottom: string | null | undefined,
  borderLightStart: string | null | undefined,
  borderLightEnd: string | null | undefined,
): boolean {
  if ((border ?? "sm") === "none") {
    return false;
  }

  return (
    isLightColor(borderLightTop) ||
    isLightColor(borderLightBottom) ||
    isLightColor(borderLightStart) ||
    isLightColor(borderLightEnd)
  );
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
      borderLightBottom: lightVariants,
      borderLightTop: lightVariants,
      borderLightStart: lightVariants,
      borderLightEnd: lightVariants,
      padding: cardPadding,
      radius: fieldRadius,
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
      borderLightBottom: "none",
      borderLightTop: "none",
      borderLightStart: "none",
      borderLightEnd: "none",
      padding: "none",
      radius: "lg",
      border: "sm",
      borderColor: "border",
    },
  },
);

type CardVariantProps = VariantProps<typeof cardVariants>;

export type CardBorderLightStopProps = {
  borderLightTopStart?: BorderLightStop;
  borderLightTopCenter?: BorderLightStop;
  borderLightTopEnd?: BorderLightStop;
  borderLightBottomStart?: BorderLightStop;
  borderLightBottomCenter?: BorderLightStop;
  borderLightBottomEnd?: BorderLightStop;
  borderLightStartStart?: BorderLightStop;
  borderLightStartCenter?: BorderLightStop;
  borderLightStartEnd?: BorderLightStop;
  borderLightEndStart?: BorderLightStop;
  borderLightEndCenter?: BorderLightStop;
  borderLightEndEnd?: BorderLightStop;
};

export type CardProps = HTMLAttributes<HTMLDivElement> &
  CardVariantProps &
  CardBorderLightStopProps;

export function Card({
  className,
  surface,
  lightBottom,
  lightTop,
  lightStart,
  lightEnd,
  borderLightBottom,
  borderLightTop,
  borderLightStart,
  borderLightEnd,
  borderLightTopStart,
  borderLightTopCenter,
  borderLightTopEnd,
  borderLightBottomStart,
  borderLightBottomCenter,
  borderLightBottomEnd,
  borderLightStartStart,
  borderLightStartCenter,
  borderLightStartEnd,
  borderLightEndStart,
  borderLightEndCenter,
  borderLightEndEnd,
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
          borderLightBottom,
          borderLightTop,
          borderLightStart,
          borderLightEnd,
          padding,
          radius,
          border,
          borderColor,
        }),
        hasBorderLights(
          border,
          borderLightTop,
          borderLightBottom,
          borderLightStart,
          borderLightEnd,
        ) && "card-border-lights",
        className,
      )}
      style={{
        ...borderVars(
          border,
          borderColor,
          radius,
          borderLightTop,
          borderLightBottom,
          borderLightStart,
          borderLightEnd,
          borderLightTopStart,
          borderLightTopCenter,
          borderLightTopEnd,
          borderLightBottomStart,
          borderLightBottomCenter,
          borderLightBottomEnd,
          borderLightStartStart,
          borderLightStartCenter,
          borderLightStartEnd,
          borderLightEndStart,
          borderLightEndCenter,
          borderLightEndEnd,
        ),
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

const headerUnderlineBar =
  "relative before:pointer-events-none before:absolute before:bottom-0 before:z-10 before:content-['']";

const headerUnderline = {
  none: "",
  background: `${headerUnderlineBar} before:bg-background`,
  foreground: `${headerUnderlineBar} before:bg-foreground`,
  primary: `${headerUnderlineBar} before:bg-primary`,
  "accent-1": `${headerUnderlineBar} before:bg-accent-1`,
  "accent-2": `${headerUnderlineBar} before:bg-accent-2`,
  "accent-3": `${headerUnderlineBar} before:bg-accent-3`,
  "accent-4": `${headerUnderlineBar} before:bg-accent-4`,
  success: `${headerUnderlineBar} before:bg-success`,
  warning: `${headerUnderlineBar} before:bg-warning`,
  error: `${headerUnderlineBar} before:bg-error`,
} as const satisfies Record<CardLight, string>;

const headerUnderlineSize = {
  sm: "before:h-[var(--theme-border-width-sm)]",
  md: "before:h-[var(--theme-border-width-md)]",
  lg: "before:h-[var(--theme-border-width-lg)]",
} as const;

const headerUnderlineWidth = {
  fix: "before:w-[50px]",
  "25": "before:w-1/4",
  "50": "before:w-1/2",
  "75": "before:w-3/4",
} as const;

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
      padding: {
        none: cn(cardPadding.none, "before:start-0"),
        sm: cn(cardPadding.sm, "before:start-2"),
        md: cn(cardPadding.md, "before:start-4"),
        lg: cn(cardPadding.lg, "before:start-6"),
      },
      underline: headerUnderline,
      underlineSize: headerUnderlineSize,
      underlineWidth: headerUnderlineWidth,
    },
    compoundVariants: cardBorderEdgeCompounds,
    defaultVariants: {
      variant: "none",
      padding: "md",
      underline: "none",
      underlineSize: "md",
      underlineWidth: "fix",
    },
  },
);

export type CardHeaderProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof cardHeaderVariants>;

export function CardHeader({
  className,
  variant,
  padding,
  underline,
  underlineSize,
  underlineWidth,
  ...props
}: CardHeaderProps) {
  return (
    <div
      className={cn(
        cardHeaderVariants({
          variant,
          padding,
          underline,
          underlineSize,
          underlineWidth,
        }),
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
