import type { Metadata } from "next";
import Link from "next/link";
import { JsonLd } from "@/components/json-ld";
import { ToolList } from "@/components/tool-list";
import { ToolSearch } from "@/components/tool-search";
import { pageMeta } from "@/lib/meta";
import { getPopularSlugs } from "@/lib/supabase";
import { categories, toolBySlug, tools, toolsIn, type Tool } from "@/lib/tools";
import { absUrl, site } from "@/site.config";

export const revalidate = 3600;

export const metadata: Metadata = pageMeta({
  title: `${site.name}: Free Image, PDF & QR Tools Online`,
  absoluteTitle: true,
  description:
    "Compress images, merge PDFs, make QR codes, remove backgrounds and run loan or interest calculations. Free, no sign-up, and files stay on your device.",
  path: "/",
});

export default async function Home() {
  const popularSlugs = await getPopularSlugs();
  const fromDb = popularSlugs.map((s) => toolBySlug.get(s)).filter((t): t is Tool => !!t).slice(0, 6);
  const popular = fromDb.length >= 3 ? fromDb : tools.filter((t) => t.featured).slice(0, 6);

  return (
    <>
      <JsonLd
        data={[
          {
            "@context": "https://schema.org",
            "@type": "Organization",
            name: site.name,
            url: site.url,
            logo: absUrl("/icon.svg"),
          },
          {
            "@context": "https://schema.org",
            "@type": "WebSite",
            name: site.name,
            url: site.url,
            potentialAction: {
              "@type": "SearchAction",
              target: { "@type": "EntryPoint", urlTemplate: `${site.url}/?q={search_term_string}` },
              "query-input": "required name=search_term_string",
            },
          },
        ]}
      />

      <section className="border-b border-border">
        <div className="container-x py-14 sm:py-20">
          <h1 className="h-display max-w-[20ch]">Everyday file and money tools that never upload your files</h1>
          <p className="mt-4 max-w-[56ch] text-[1.0625rem] text-muted">
            Compress and convert images, edit PDFs, make QR codes and work out loan payments. It all happens in your
            browser, so it&rsquo;s fast and private.
          </p>
          <div className="mt-8">
            <ToolSearch />
          </div>
          <ul className="mt-6 flex flex-wrap gap-2" aria-label="Categories">
            {categories.map((c) => (
              <li key={c.id}>
                <Link href={`#${c.id}`} className="chip">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="container-x pt-14" aria-labelledby="popular">
        <h2 id="popular" className="type-h2">
          Popular tools
        </h2>
        <div className="mt-4">
          <ToolList tools={popular} cols={3} />
        </div>
      </section>

      <section className="container-x pt-16" aria-labelledby="all-tools">
        <h2 id="all-tools" className="type-h2">
          All tools
        </h2>
        <div className="mt-2 divide-y divide-border">
          {categories.map((c) => (
            <div key={c.id} id={c.id} className="grid scroll-mt-6 gap-4 py-8 md:grid-cols-[220px_minmax(0,1fr)]">
              <div>
                <h3 className="type-h3">
                  <Link href={c.href} className="hover:text-accent">
                    {c.name}
                  </Link>
                </h3>
                <p className="mt-1 text-sm text-muted">{c.blurb}</p>
              </div>
              <ToolList tools={toolsIn(c.id)} cols={2} />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-8" aria-labelledby="why">
        <div className="grid gap-6 border-t border-border pt-10 md:grid-cols-[220px_minmax(0,1fr)]">
          <h2 id="why" className="type-h2">
            Why {site.name}
          </h2>
          <div className="prose-x text-muted">
            <p>
              <strong className="text-text">Your files stay on your device.</strong> Images, PDFs and photos are processed
              by your own browser, so there is no upload, no server copy and nothing for us to lose. You can even switch off
              your connection once a tool has loaded.
            </p>
            <p>
              <strong className="text-text">Free, with no account.</strong> There are no daily limits and no watermarks
              stamped on your work. Open a tool, finish the job, close the tab.{" "}
              <Link href="/privacy" className="link">
                How we handle privacy
              </Link>
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
