import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/lib/cn";

export const codeVariants = cva("font-mono text-xs", {
  variants: {
    display: {
      inline: "",
      block:
        "block overflow-x-auto rounded-md border-md border-border bg-panel p-4",
    },
  },
  defaultVariants: {
    display: "inline",
  },
});

export type CodeProps = HTMLAttributes<HTMLElement> &
  VariantProps<typeof codeVariants>;

export function Code({ className, display = "inline", ...props }: CodeProps) {
  if (display === "block") {
    return (
      <pre className={cn(codeVariants({ display }), className)}>
        <code {...props} />
      </pre>
    );
  }

  return <code className={cn(codeVariants({ display }), className)} {...props} />;
}
