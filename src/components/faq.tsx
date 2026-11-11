import type { Faq as FaqItem } from "@/content/types";
import { Icon } from "./icons";
import { faqLd, JsonLd } from "./json-ld";

export function Faq({ items, heading = "Frequently asked questions" }: { items: FaqItem[]; heading?: string }) {
  return (
    <section aria-labelledby="faq">
      <h2 id="faq" className="type-h2">
        {heading}
      </h2>
      <div className="mt-4 divide-y divide-border border-y border-border">
        {items.map((f) => (
          <details key={f.q} className="group">
            <summary className="flex min-h-14 cursor-pointer list-none items-center justify-between gap-4 py-3 font-semibold [&::-webkit-details-marker]:hidden">
              <h3 className="type-h3">{f.q}</h3>
              <Icon name="chevron-down" className="shrink-0 text-muted group-open:rotate-180" />
            </summary>
            <p className="prose-x pb-4 text-muted">{f.a}</p>
          </details>
        ))}
      </div>
      <JsonLd data={faqLd(items)} />
    </section>
  );
}
