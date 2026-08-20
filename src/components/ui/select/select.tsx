import { cva, type VariantProps } from "class-variance-authority";
import type { SelectHTMLAttributes } from "react";
import { Icon } from "@/components/icons";
import { fieldBoxClass, fieldRadius } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const selectVariants = cva(cn(fieldBoxClass, "peer"), {
    variants: {
      size: {
        sm: "h-8 ps-2 pe-8 text-sm",
        md: "h-9 ps-2 pe-8 text-sm md:h-10 md:ps-3 md:pe-9",
        lg: "h-10 ps-3 pe-9 text-sm md:h-12 md:ps-4 md:pe-10 md:text-base",
      },
      radius: fieldRadius,
    },
    defaultVariants: {
      size: "md",
      radius: "md",
    },
  },
);

const chevronEnd = {
  sm: "end-2",
  md: "end-2 md:end-3",
  lg: "end-3 md:end-4",
} as const;

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
          chevronEnd[resolvedSize],
        )}
      />
    </span>
  );
}
