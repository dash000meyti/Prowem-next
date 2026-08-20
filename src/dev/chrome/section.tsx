import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { cn } from "@/lib/cn";

export function LabSection({
  title,
  hint,
  className,
  children,
}: {
  title: string;
  hint?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <section className={cn("min-w-0", className)}>
      <Heading level={2}>{title}</Heading>
      {hint ? (
        <Text variant="muted" className="mt-1">
          {hint}
        </Text>
      ) : null}
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}
