import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsArticle } from "@/dev/chrome/docs-article";
import { getMetaBySlug, templateMetas } from "@/dev/meta";

export function generateStaticParams() {
  return templateMetas.map((meta) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/dev/templates/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = getMetaBySlug(slug);
  return { title: meta?.name ?? "Template" };
}

export default async function DevTemplatePage({
  params,
}: PageProps<"/dev/templates/[slug]">) {
  const { slug } = await params;
  const meta = getMetaBySlug(slug);
  if (!meta || meta.kind !== "template") notFound();

  return <DocsArticle meta={meta} />;
}
