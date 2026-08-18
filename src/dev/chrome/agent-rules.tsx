import { copy } from "@/dev/copy";
import type { ComponentMeta } from "@/dev/meta/types";

export function AgentRules({ meta }: { meta: ComponentMeta }) {
  return (
    <section className="flex min-w-0 flex-col gap-2">
      <h2 className="text-lg font-semibold tracking-tight text-start">
        {copy.agentRules}
      </h2>
      <ul className="flex list-disc flex-col gap-1 ps-5 text-sm text-foreground/70">
        {meta.rules.map((rule) => (
          <li key={rule}>{rule}</li>
        ))}
      </ul>
    </section>
  );
}
