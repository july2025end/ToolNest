"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, toolBySlug } from "@/lib/tools";

const labels: Record<string, string> = { image: "Images", pdf: "PDF", qr: "QR codes", finance: "Calculators", ai: "Background remover" };

export function HeaderNav() {
  const path = usePathname();
  const current = toolBySlug.get(path.slice(1))?.category;
  return (
    <nav aria-label="Categories" className="ml-4 hidden items-center gap-1 lg:flex">
      {categories.map((c) => {
        const active = path === c.href || current === c.id;
        return (
          <Link
            key={c.id}
            href={c.href}
            aria-current={path === c.href ? "page" : undefined}
            className={`flex min-h-11 items-center rounded-sm px-3 text-[0.9375rem] font-medium hover:text-text ${active ? "text-text underline decoration-accent decoration-2 underline-offset-[6px]" : "text-muted"}`}
          >
            {labels[c.id]}
          </Link>
        );
      })}
    </nav>
  );
}
