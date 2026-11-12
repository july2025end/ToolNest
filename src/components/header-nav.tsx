"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { categories, toolBySlug } from "@/lib/tools";

const labels: Record<string, string> = { image: "Images", pdf: "PDF", qr: "QR & barcodes", finance: "Calculators", ai: "Background remover", text: "Text" };

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
            className={`flex min-h-9 items-center rounded-full px-3.5 text-sm hover:text-text ${active ? "bg-surface-2 font-medium text-text" : "text-muted"}`}
          >
            {labels[c.id]}
          </Link>
        );
      })}
    </nav>
  );
}
