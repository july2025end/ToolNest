import type { ReactNode } from "react";
import Link from "next/link";
import { AdSlot } from "./ad-slot";
import { Breadcrumbs } from "./breadcrumbs";
import { Faq } from "./faq";
import { Icon } from "./icons";
import { JsonLd, webAppLd } from "./json-ld";
import { ToolList } from "./tool-list";
import { categories, hubFor, toolBySlug, type Tool } from "@/lib/tools";
import type { PageContent } from "@/content/types";

const appCategory: Record<Tool["category"], string> = {
  image: "MultimediaApplication",
  pdf: "BusinessApplication",
  qr: "UtilitiesApplication",
  finance: "FinanceApplication",
  ai: "MultimediaApplication",
  text: "UtilitiesApplication",
};

/** Shared skeleton for every tool page: tool → how-to → guide → FAQ → related. */
export function ToolPage({ tool, content, children }: { tool: Tool; content: PageContent; children: ReactNode }) {
  const hub = hubFor(tool.category);
  const cat = categories.find((c) => c.id === tool.category)!;
  const crumbs = [
    ...(hub ? [hub] : cat.href !== `/${tool.slug}` ? [{ name: cat.name, href: cat.href }] : []),
    { name: tool.name, href: `/${tool.slug}` },
  ];
  const related = tool.related.map((s) => toolBySlug.get(s)).filter((t): t is Tool => !!t);
  const local = tool.category !== "finance";

  return (
    <div className="container-x pt-5">
      <Breadcrumbs items={crumbs} />
      <div className="mt-8 grid gap-10 lg:grid-cols-[minmax(0,1fr)_300px]">
        <div className="min-w-0">
          <header className="max-w-[60ch]">
            <h1 className="type-h1">{content.h1}</h1>
            <p className="mt-4 text-[1.1875rem] leading-relaxed text-muted">{content.intro}</p>
            {local && (
              <p className="mt-5 inline-flex items-center gap-2 rounded-full bg-surface px-3.5 py-1.5 text-sm font-medium shadow-(--shadow-card)">
                <Icon name="lock" size={16} className="text-accent" />
                Runs in your browser. Your files never leave your device.
              </p>
            )}
          </header>

          <div className="mt-8">{children}</div>

          <div className="mt-8">
            <AdSlot variant="banner" />
          </div>

          <div className="mt-16 space-y-16">
            <section aria-labelledby="how-to">
              <h2 id="how-to" className="type-h2">
                {tool.name}: how to use it
              </h2>
              <ol role="list" className="mt-5 grid gap-3 sm:grid-cols-2">
                {content.steps.map((s, i) => (
                  <li key={s} className="card flex gap-3 p-4">
                    <span className="num flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-accent-soft text-sm font-semibold text-accent">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{s}</span>
                  </li>
                ))}
              </ol>
            </section>

            <article className="space-y-8">
              {content.guide.map((g) => (
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

            <Faq items={content.faqs} />

            <section aria-labelledby="related">
              <h2 id="related" className="type-h2">
                Related tools
              </h2>
              <div className="mt-4">
                <ToolList tools={related} />
              </div>
              {hub && (
                <p className="mt-4">
                  <Link href={hub.href} className="link">
                    See all {hub.name.toLowerCase()}
                  </Link>
                </p>
              )}
            </section>
          </div>
        </div>

        <aside className="hidden lg:block" aria-hidden="true">
          <div className="sticky top-20">
            <AdSlot variant="sidebar" />
          </div>
        </aside>
      </div>

      <JsonLd
        data={webAppLd({
          name: tool.name,
          description: content.description,
          path: `/${tool.slug}`,
          category: appCategory[tool.category],
        })}
      />
    </div>
  );
}
