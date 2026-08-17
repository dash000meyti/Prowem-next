import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const containerVariants = cva("mx-auto w-full min-w-0", {
  variants: {
    width: {
      sm: "max-w-3xl",
      md: "max-w-5xl",
      lg: "max-w-7xl",
      full: "max-w-none",
    },
    padding: {
      none: "",
      sm: "px-4 md:px-5",
      md: "px-4 md:px-6 lg:px-8",
      lg: "px-4 md:px-8 lg:px-10",
    },
  },
  defaultVariants: {
    width: "lg",
    padding: "md",
  },
});

export type ContainerProps = HTMLAttributes<HTMLDivElement> &
  VariantProps<typeof containerVariants>;

export function Container({
  className,
  width,
  padding,
  ...props
}: ContainerProps) {
  return (
    <div
      className={cn(containerVariants({ width, padding }), className)}
      {...props}
    />
  );
}
