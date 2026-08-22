import { cva, type VariantProps } from "class-variance-authority";
import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/components/icons";
import {
  fieldBoxClass,
  fieldChevronEnd,
  fieldRadius,
  fieldSelectSize,
} from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const selectVariants = cva(cn(fieldBoxClass, "peer"), {
  variants: {
    size: fieldSelectSize,
    radius: fieldRadius,
  },
  defaultVariants: {
    size: "md",
    radius: "sm",
  },
});

export type SelectProps = Omit<SelectHTMLAttributes<HTMLSelectElement>, "size"> &
  VariantProps<typeof selectVariants>;

export function Select({ className, size = "md", radius, ...props }: SelectProps) {
  const resolvedSize = size ?? "md";

  return (
    <span className={cn("relative block w-full min-w-0", className)}>
      <select className={cn(selectVariants({ size, radius }))} {...props} />
      <Icon
        name="chevron-down"
        className={cn(
          "pointer-events-none absolute top-1/2 size-4 -translate-y-1/2 text-panel-foreground peer-disabled:opacity-50",
          fieldChevronEnd[resolvedSize],
        )}
      />
    </span>
  );
}
