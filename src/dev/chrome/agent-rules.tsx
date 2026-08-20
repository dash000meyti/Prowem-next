import { Alert } from "@/components/ui/alert";
import { Heading } from "@/components/ui/heading";
import { List } from "@/components/ui/list";
import { copy } from "@/dev/copy";
import type { ComponentMeta } from "@/dev/meta/types";

export function AgentRules({ meta }: { meta: ComponentMeta }) {
  return (
    <section className="flex min-w-0 flex-col gap-2">
      <Heading level={2}>{copy.agentRules}</Heading>
      <Alert icon="info">
        <List marker="disc" gap="sm" className="text-foreground/70">
          {meta.rules.map((rule) => (
            <li key={rule}>{rule}</li>
          ))}
        </List>
      </Alert>
    </section>
  );
}
