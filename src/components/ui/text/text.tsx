import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { fontFaceVariants, type FontFace } from "@/fonts";
import { cn } from "@/lib/cn";

export const textVariants = cva("min-w-0 text-start", {
  variants: {
    variant: {
      body: "text-body tracking-body text-foreground",
      muted: "text-body tracking-body text-foreground/70",
      caption: "text-xs tracking-normal text-foreground/70",
      overline:
        "text-xs font-semibold uppercase tracking-wide text-foreground/70",
      code: "font-mono text-xs tracking-normal",
    },
  },
  defaultVariants: {
    variant: "body",
  },
});

export type TextProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof textVariants> & {
    as?: "p" | "span";
    /** Catalog face. Default Ubuntu Light for body/muted; omit on code to keep mono. */
    font?: FontFace;
  };

export function Text({
  className,
  variant,
  as: Tag = "p",
  font,
  ...props
}: TextProps) {
  const resolvedVariant = variant ?? "body";
  const resolvedFont =
    font ??
    (resolvedVariant === "body" || resolvedVariant === "muted"
      ? ("ubuntuLight" as const)
      : undefined);

  return (
    <Tag
      className={cn(
        textVariants({ variant: resolvedVariant }),
        resolvedFont ? fontFaceVariants({ font: resolvedFont }) : null,
        className,
      )}
      {...props}
    />
  );
}
