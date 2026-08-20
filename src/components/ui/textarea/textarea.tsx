import { cva, type VariantProps } from "class-variance-authority";
import type { TextareaHTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const textareaVariants = cva(
  "w-full min-h-20 min-w-0 border-md border-border bg-background py-2 text-foreground transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 focus-visible:ring-offset-background disabled:pointer-events-none disabled:opacity-50",
  {
    variants: {
      size: {
        sm: "px-2 text-sm",
        md: "px-2 text-sm md:px-3",
        lg: "px-3 text-sm md:px-4 md:text-base",
      },
      radius: {
        none: "rounded-none",
        sm: "rounded-sm",
        md: "rounded-md",
        lg: "rounded-lg",
        full: "rounded-full",
      },
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

export function Textarea({ className, size, radius, ...props }: TextareaProps) {
  return (
    <textarea
      className={cn(textareaVariants({ size, radius }), className)}
      {...props}
    />
  );
}
