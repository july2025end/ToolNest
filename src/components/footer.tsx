import { Logo } from "./logo";
import { categories, toolsIn } from "@/lib/tools";
import { site } from "@/site.config";

const legal = [
  { href: "/about", name: "About" },
  { href: "/contact", name: "Contact" },
  { href: "/privacy", name: "Privacy policy" },
  { href: "/terms", name: "Terms of use" },
];

export function Footer() {
  return (
    <footer className="mt-24 border-t border-border bg-surface">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-4 py-12 sm:gap-10 lg:grid-cols-6">
        <div className="col-span-2 lg:col-span-1">
          <Logo />
          <p className="mt-3 text-sm text-muted">Your files never leave your device.</p>
        </div>
        {categories.map((c) => (
          <div key={c.id}>
            <p className="eyebrow mb-2">
              <a href={c.href} className="inline-flex min-h-11 items-center hover:text-text sm:min-h-0">
                {c.name}
              </a>
            </p>
            <ul role="list" className="hidden space-y-0.5 text-sm sm:block">
              {toolsIn(c.id).map((t) => (
                <li key={t.slug}>
                  <a href={`/${t.slug}`} className="inline-flex min-h-8 items-center text-muted hover:text-text">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-3 py-6 text-sm text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name}
          </p>
          <ul className="flex flex-wrap gap-x-5">
            {legal.map((l) => (
              <li key={l.href}>
                <a href={l.href} className="inline-flex min-h-11 items-center hover:text-text">
                  {l.name}
                </a>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </footer>
  );
}
