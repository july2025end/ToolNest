import type { Metadata } from "next";
import { Breadcrumbs } from "@/components/breadcrumbs";
import { pageMeta } from "@/lib/meta";
import { supabaseConfigured } from "@/lib/supabase";
import { site } from "@/site.config";
import { ContactForm } from "./contact-form";

export const metadata: Metadata = pageMeta({
  title: "Contact Us",
  description: `Send feedback, report a bug or suggest a new tool for ${site.name}. We read every message and reply by email when you leave an address.`,
  path: "/contact",
});

export default function ContactPage() {
  return (
    <div className="container-x pt-6">
      <Breadcrumbs items={[{ name: "Contact", href: "/contact" }]} />
      <div className="mt-6 max-w-2xl">
        <h1 className="type-h1">Contact {site.name}</h1>
        <p className="mt-3 text-[1.0625rem] text-muted">
          Found a bug, want a new tool, or have a question about privacy? Send a message. {site.contactNote}
        </p>
        <div className="panel mt-8 p-4 sm:p-6">
          <ContactForm configured={supabaseConfigured} />
        </div>
      </div>
    </div>
  );
}
