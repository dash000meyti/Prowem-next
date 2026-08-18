import type { ReactNode } from "react";
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
        <p className="text-sm text-foreground/70">{meta.file}</p>
        <h1 className="text-2xl font-semibold tracking-tight text-start md:text-3xl">
          {meta.name}
        </h1>
        <p className="text-sm leading-6 text-foreground/70">{meta.description}</p>
      </header>
      <ImportBlock meta={meta} />
      <AgentRules meta={meta} />
      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.props}
        </h2>
        <PropsTable meta={meta} />
      </section>
      <PlaygroundBySlug slug={meta.slug} meta={meta} />
      <section className="flex min-w-0 flex-col gap-3">
        <h2 className="text-lg font-semibold tracking-tight text-start">
          {copy.gallery}
        </h2>
        {gallery ?? <GalleryBySlug slug={meta.slug} />}
      </section>
    </article>
  );
}
