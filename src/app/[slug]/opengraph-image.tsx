import { ogImage, ogSize } from "@/lib/og";
import { categories, toolBySlug, tools } from "@/lib/tools";

export const size = ogSize;
export const contentType = "image/png";
export const alt = "Tool preview";

export function generateStaticParams() {
  return tools.map((t) => ({ slug: t.slug }));
}

export default async function Image({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const t = toolBySlug.get(slug)!;
  return ogImage(t.name, t.blurb, categories.find((c) => c.id === t.category)?.name);
}
