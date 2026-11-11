import { absUrl, site } from "@/site.config";
import type { Faq } from "@/content/types";

/** Escapes "<" so user/content strings can't close the script tag. */
export function JsonLd({ data }: { data: object | object[] }) {
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data).replace(/</g, "\\u003c") }}
    />
  );
}

export type Crumb = { name: string; href: string };

export const breadcrumbLd = (crumbs: Crumb[]) => ({
  "@context": "https://schema.org",
  "@type": "BreadcrumbList",
  itemListElement: [{ name: "Home", href: "/" }, ...crumbs].map((c, i) => ({
    "@type": "ListItem",
    position: i + 1,
    name: c.name,
    item: absUrl(c.href),
  })),
});

export const faqLd = (faqs: Faq[]) => ({
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqs.map((f) => ({
    "@type": "Question",
    name: f.q,
    acceptedAnswer: { "@type": "Answer", text: f.a },
  })),
});

export const webAppLd = (o: { name: string; description: string; path: string; category: string }) => ({
  "@context": "https://schema.org",
  "@type": "WebApplication",
  name: o.name,
  description: o.description,
  url: absUrl(o.path),
  applicationCategory: o.category,
  operatingSystem: "Any (runs in a web browser)",
  browserRequirements: "Requires JavaScript and a modern browser",
  isAccessibleForFree: true,
  offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  publisher: { "@type": "Organization", name: site.name, url: site.url },
});
