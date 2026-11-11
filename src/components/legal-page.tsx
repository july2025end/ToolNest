import type { Metadata } from "next";
import Link from "next/link";
import { Breadcrumbs } from "./breadcrumbs";
import { legalContent } from "@/content";
import { pageMeta } from "@/lib/meta";

type Slug = "about" | "privacy" | "terms";

export const legalMetadata = (slug: Slug): Metadata => {
  const c = legalContent[slug];
  return pageMeta({ title: c.title, description: c.description, path: `/${slug}` });
};

const names: Record<Slug, string> = { about: "About", privacy: "Privacy policy", terms: "Terms of use" };

// Turns bare URLs in legal copy into links.
function linkify(text: string) {
  return text.split(/(https?:\/\/[^\s),]+[^\s),.])/g).map((part, i) =>
    /^https?:\/\//.test(part) ? (
      <a key={i} href={part} className="link" rel="noopener noreferrer" target="_blank">
        {part.replace(/^https?:\/\//, "")}
      </a>
    ) : (
      part
    ),
  );
}

export function LegalPageView({ slug }: { slug: Slug }) {
  const c = legalContent[slug];
  return (
    <div className="container-x pt-6">
      <Breadcrumbs items={[{ name: names[slug], href: `/${slug}` }]} />
      <article className="mt-6 max-w-[68ch]">
        <h1 className="type-h1">{c.h1}</h1>
        <p className="mt-2 text-sm text-muted">
          Last updated <time dateTime={c.updated}>{new Date(c.updated + "T00:00:00Z").toLocaleDateString("en-US", { year: "numeric", month: "long", day: "numeric", timeZone: "UTC" })}</time>
        </p>
        <div className="mt-8 space-y-8">
          {c.sections.map((s) => (
            <section key={s.heading}>
              <h2 className="type-h2">{s.heading}</h2>
              <div className="prose-x mt-3">
                {s.paragraphs.map((p) => (
                  <p key={p.slice(0, 40)}>{linkify(p)}</p>
                ))}
              </div>
            </section>
          ))}
        </div>
        <p className="mt-10 border-t border-border pt-6 text-muted">
          Questions? <Link href="/contact" className="link">Contact us</Link>.
        </p>
      </article>
    </div>
  );
}
