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
    <footer className="mt-16 pb-[env(safe-area-inset-bottom)] sm:mt-24 border-t border-border bg-surface-2/60 text-[0.8125rem]">
      <div className="container-x grid grid-cols-2 gap-x-6 gap-y-0 pt-10 pb-5 sm:gap-10 sm:py-12 lg:grid-cols-7">
        <div className="col-span-2 mb-4 sm:mb-0 lg:col-span-1">
          <Logo />
          <p className="mt-3 text-muted">Your files never leave your device.</p>
        </div>
        {categories.map((c) => (
          <div key={c.id}>
            <p className="font-semibold sm:mb-2">
              <a href={c.href} className="inline-flex min-h-11 items-center hover:underline sm:min-h-0">
                {c.name}
              </a>
            </p>
            <ul role="list" className="hidden space-y-0.5 sm:block">
              {toolsIn(c.id).map((t) => (
                <li key={t.slug}>
                  <a href={`/${t.slug}`} className="inline-flex min-h-7 items-center text-muted hover:text-text hover:underline">
                    {t.name}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      <div className="border-t border-border">
        <div className="container-x flex flex-col gap-1 py-5 text-muted sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {new Date().getFullYear()} {site.name} by {site.maker}
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
