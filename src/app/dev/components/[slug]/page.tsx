import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { DocsArticle } from "@/dev/chrome/docs-article";
import { getMetaBySlug, uiMetas } from "@/dev/meta";

export function generateStaticParams() {
  return uiMetas.map((meta) => ({ slug: meta.slug }));
}

export async function generateMetadata({
  params,
}: PageProps<"/dev/components/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const meta = getMetaBySlug(slug);
  return { title: meta?.name ?? "Component" };
}

export default async function DevComponentPage({
  params,
}: PageProps<"/dev/components/[slug]">) {
  const { slug } = await params;
  const meta = getMetaBySlug(slug);
  if (!meta || meta.kind !== "ui") notFound();

  return <DocsArticle meta={meta} />;
}
