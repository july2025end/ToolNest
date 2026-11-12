import type { Metadata } from "next";
import { AdSlot } from "./ad-slot";
import { Breadcrumbs } from "./breadcrumbs";
import { Faq } from "./faq";
import { ToolList } from "./tool-list";
import { hubContent } from "@/content";
import { pageMeta } from "@/lib/meta";
import { toolsIn, type CategoryId } from "@/lib/tools";

export const hubMetadata = (slug: string): Metadata => {
  const c = hubContent[slug];
  return pageMeta({ title: c.title, description: c.description, path: `/${slug}` });
};

export function HubPage({ slug, category, name }: { slug: string; category: CategoryId; name: string }) {
  const c = hubContent[slug];
  return (
    <div className="container-x pt-6">
      <Breadcrumbs items={[{ name, href: `/${slug}` }]} />
      <header className="mt-8 max-w-[60ch]">
        <h1 className="type-h1">{c.h1}</h1>
        <p className="mt-4 text-[1.1875rem] leading-relaxed text-muted">{c.intro}</p>
      </header>
      <div className="mt-8">
        <ToolList tools={toolsIn(category)} cols={3} />
      </div>
      <div className="mt-10">
        <AdSlot variant="banner" />
      </div>
      <div className="mt-16 space-y-16">
        <section aria-labelledby="how">
          <h2 id="how" className="type-h2">
            How it works
          </h2>
          <ol role="list" className="mt-5 grid gap-3 sm:grid-cols-3">
            {c.steps.map((s, i) => (
              <li key={s} className="card flex gap-3 p-4">
                <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">{i + 1}</span>
                <span className="pt-0.5">{s}</span>
              </li>
            ))}
          </ol>
        </section>
        <article className="space-y-8">
          {c.guide.map((g) => (
            <section key={g.heading}>
              <h2 className="type-h2">{g.heading}</h2>
              <div className="prose-x mt-3">
                {g.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{p}</p>
                ))}
              </div>
            </section>
          ))}
        </article>
        <Faq items={c.faqs} />
      </div>
    </div>
  );
}
