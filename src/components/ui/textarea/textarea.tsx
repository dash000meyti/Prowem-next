import { cva, type VariantProps } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import { fieldRadius } from "@/components/ui/input";
import { cn } from "@/lib/cn";

export const textareaVariants = cva(
  "flex w-full min-h-20 min-w-0 flex-col bg-panel text-panel-foreground shadow-outline-sm transition focus-within:outline-none focus-within:ring-2 focus-within:ring-primary focus-within:ring-offset-2 focus-within:ring-offset-background has-[:disabled]:pointer-events-none has-[:disabled]:opacity-50",
  {
    variants: {
      size: {
        sm: "p-2 text-sm",
        md: "p-2 text-sm md:p-3",
        lg: "p-3 text-sm md:p-4 md:text-base",
      },
      radius: fieldRadius,
    },
    defaultVariants: {
      size: "md",
      radius: "md",
    },
  },
);

export type TextareaProps = Omit<
  TextareaHTMLAttributes<HTMLTextAreaElement>,
  "size"
> &
  VariantProps<typeof textareaVariants>;

export function Textarea({
  className,
  size,
  radius,
  disabled,
  ...props
}: TextareaProps) {
  return (
    <div className={cn(textareaVariants({ size, radius }), className)}>
      <textarea
        disabled={disabled}
        className="block min-h-16 w-full min-w-0 flex-1 resize-y appearance-none bg-transparent text-inherit outline-none"
        {...props}
      />
    </div>
  );
}
