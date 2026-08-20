import { Code } from "@/components/ui/code";
import type { ComponentMeta } from "@/dev/meta/types";

export function ImportBlock({ meta }: { meta: ComponentMeta }) {
  return <Code display="block">{meta.importStatement}</Code>;
}
