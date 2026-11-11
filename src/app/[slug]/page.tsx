import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ToolPage } from "@/components/tool-page";
import { ToolRenderer } from "@/components/tool-renderer";
import { toolContent } from "@/content";
import { pageMeta } from "@/lib/meta";
import { toolBySlug, tools } from "@/lib/tools";

export const dynamicParams = false;

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export async function generateMetadata({ params }: PageProps<"/[slug]">): Promise<Metadata> {
  const { slug } = await params;
  const c = toolContent[slug];
  if (!c) return {};
  return pageMeta({ title: c.title, description: c.description, path: `/${slug}` });
}

export default async function Page({ params }: PageProps<"/[slug]">) {
  const { slug } = await params;
  const tool = toolBySlug.get(slug);
  const content = toolContent[slug];
  if (!tool || !content) notFound();
  return (
    <ToolPage tool={tool} content={content}>
      <ToolRenderer tool={tool} />
    </ToolPage>
  );
}
