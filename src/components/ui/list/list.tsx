import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const listVariants = cva("flex min-w-0 flex-col text-sm", {
  variants: {
    marker: {
      disc: "list-disc ps-5",
      decimal: "list-decimal ps-5",
      none: "",
    },
    gap: {
      sm: "gap-1",
      md: "gap-2",
    },
  },
  defaultVariants: {
    marker: "disc",
    gap: "md",
  },
});

export type ListProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof listVariants> & {
    as?: "ul" | "ol";
  };

export function List({
  className,
  marker,
  gap,
  as,
  ...props
}: ListProps) {
  const Tag = as ?? (marker === "decimal" ? "ol" : "ul");

  return (
    <Tag
      className={cn(listVariants({ marker, gap }), className)}
      {...props}
    />
  );
}
