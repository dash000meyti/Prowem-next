import type { ReactNode } from "react";

export function LabSection({
  title,
  hint,
  children,
}: {
  title: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <section className="min-w-0">
      <h2 className="text-lg font-semibold tracking-tight text-start">{title}</h2>
      {hint ? (
        <p className="mt-1 text-sm leading-6 text-foreground/70 text-start">{hint}</p>
      ) : null}
      <div className="mt-4 min-w-0">{children}</div>
    </section>
  );
}
