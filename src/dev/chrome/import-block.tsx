import type { ComponentMeta } from "@/dev/meta/types";

export function ImportBlock({ meta }: { meta: ComponentMeta }) {
  return (
    <pre className="overflow-x-auto rounded-md border-md border-border bg-panel p-4 font-mono text-xs">
      <code>{meta.importStatement}</code>
    </pre>
  );
}
