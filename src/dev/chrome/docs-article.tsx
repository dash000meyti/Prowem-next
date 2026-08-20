import type { ReactNode } from "react";
import { Heading } from "@/components/ui/heading";
import { Text } from "@/components/ui/text";
import { AgentRules } from "@/dev/chrome/agent-rules";
import { ImportBlock } from "@/dev/chrome/import-block";
import { PropsTable } from "@/dev/chrome/props-table";
import { copy } from "@/dev/copy";
import { GalleryBySlug } from "@/dev/gallery";
import type { ComponentMeta } from "@/dev/meta/types";
import { PlaygroundBySlug } from "@/dev/playground/renderers";

export function DocsArticle({
  meta,
  gallery,
}: {
  meta: ComponentMeta;
  gallery?: ReactNode;
}) {
  return (
    <article className="flex min-w-0 flex-col gap-8">
      <header className="flex min-w-0 flex-col gap-3">
        <Text variant="caption">{meta.file}</Text>
        <Heading level={1}>{meta.name}</Heading>
        <Text variant="muted">{meta.description}</Text>
      </header>
      <ImportBlock meta={meta} />
      <AgentRules meta={meta} />
      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.props}</Heading>
        <PropsTable meta={meta} />
      </section>
      <PlaygroundBySlug slug={meta.slug} meta={meta} />
      <section className="flex min-w-0 flex-col gap-3">
        <Heading level={2}>{copy.gallery}</Heading>
        {gallery ?? <GalleryBySlug slug={meta.slug} />}
      </section>
    </article>
  );
}
