import type { Metadata } from "next";
import Link from "next/link";
import { Icon } from "@/components/icons";
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

      <section className="container-x pt-16 pb-12 text-center sm:pt-24 sm:pb-16">
        <h1 className="h-display mx-auto max-w-[18ch]">Free online tools for images, PDFs and more.</h1>
        <p className="mx-auto mt-5 max-w-[52ch] text-[1.1875rem] leading-relaxed text-muted sm:text-[1.3125rem]">
          Compress images, edit PDFs, make QR codes and work out loan payments. Free, no sign-up, and your files never
          leave your device.
        </p>
        <div className="mt-10">
          <ToolSearch />
        </div>
        <ul className="mt-6 flex flex-wrap justify-center gap-2" aria-label="Categories">
          {categories.map((c) => (
            <li key={c.id}>
              <Link href={`#${c.id}`} className="chip">
                {c.name}
              </Link>
            </li>
          ))}
        </ul>
      </section>

      <section className="container-x pt-4" aria-labelledby="popular">
        <h2 id="popular" className="type-h2">
          Popular tools
        </h2>
        <div className="mt-5">
          <ToolList tools={popular} cols={3} />
        </div>
      </section>

      <section className="container-x pt-20" aria-labelledby="all-tools">
        <h2 id="all-tools" className="type-h2">
          All tools
        </h2>
        <div className="mt-6 space-y-12">
          {categories.map((c) => (
            <div key={c.id} id={c.id} className="scroll-mt-20">
              <div className="mb-4 flex flex-wrap items-baseline justify-between gap-x-4 gap-y-1">
                <div>
                  <h3 className="text-[1.25rem] font-semibold tracking-[-0.015em]">{c.name}</h3>
                  <p className="mt-0.5 text-sm text-muted">{c.blurb}</p>
                </div>
                <Link href={c.href} className="link inline-flex min-h-11 items-center text-[0.9375rem]">
                  See all
                </Link>
              </div>
              <ToolList tools={toolsIn(c.id)} cols={3} />
            </div>
          ))}
        </div>
      </section>

      <section className="container-x pt-24" aria-labelledby="why">
        <div className="rounded-lg bg-surface px-6 py-12 text-center shadow-(--shadow-card) sm:px-12 sm:py-16">
          <h2 id="why" className="type-h1 mx-auto max-w-[20ch]">
            Private by design. Free for good.
          </h2>
          <ul role="list" className="mx-auto mt-12 grid max-w-4xl gap-10 text-left sm:grid-cols-3 sm:text-center">
            {[
              { icon: "lock" as const, title: "Your files stay with you", body: "Images, PDFs and photos are processed by your own browser. Nothing is uploaded, so nothing can leak." },
              { icon: "free" as const, title: "Free, with no account", body: "No daily limits, no watermarks, no sign-up. Open a tool, finish the job, close the tab." },
              { icon: "device" as const, title: "Works on any device", body: "Phone, tablet or computer. Once a tool has loaded, it keeps working even offline." },
            ].map((f) => (
              <li key={f.title} className="flex gap-4 sm:flex-col sm:items-center">
                <span className="icon-badge">
                  <Icon name={f.icon} size={22} />
                </span>
                <span>
                  <span className="block font-semibold">{f.title}</span>
                  <span className="mt-1 block text-[0.9375rem] text-muted">{f.body}</span>
                </span>
              </li>
            ))}
          </ul>
          <p className="mt-10">
            <Link href="/privacy" className="link">
              How we handle privacy
            </Link>
          </p>
        </div>
      </section>
    </>
  );
}
