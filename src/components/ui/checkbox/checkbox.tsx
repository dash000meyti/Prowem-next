import { cva, type VariantProps } from "class-variance-authority";
import type { InputHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const checkboxVariants = cva(
  "shrink-0 border-md border-border bg-background text-primary accent-primary transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "size-3.5 rounded-sm",
        md: "size-4 rounded-sm",
        lg: "size-5 rounded-sm",
      },
    },
    defaultVariants: {
      size: "md",
    },
  },
);

export type CheckboxProps = Omit<InputHTMLAttributes<HTMLInputElement>, "size" | "type"> &
  VariantProps<typeof checkboxVariants>;

export function Checkbox({ className, size, ...props }: CheckboxProps) {
  return (
    <input
      type="checkbox"
      className={cn(checkboxVariants({ size }), className)}
      {...props}
    />
  );
}
