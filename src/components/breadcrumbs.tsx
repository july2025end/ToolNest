import Link from "next/link";
import { Icon } from "./icons";
import { breadcrumbLd, JsonLd, type Crumb } from "./json-ld";

/** Visible breadcrumbs + BreadcrumbList JSON-LD. The last crumb is the current page. */
export function Breadcrumbs({ items }: { items: Crumb[] }) {
  const all = [{ name: "Home", href: "/" }, ...items];
  return (
    <>
      <nav aria-label="Breadcrumb" className="text-sm text-muted">
        <ol className="flex flex-wrap items-center gap-1">
          {all.map((c, i) => (
            <li key={c.href} className="flex items-center gap-1">
              {i > 0 && <Icon name="chevron" size={14} />}
              {i === all.length - 1 ? (
                <span aria-current="page" className="text-text">
                  {c.name}
                </span>
              ) : (
                <Link href={c.href} className="inline-flex min-h-8 items-center hover:text-text">
                  {c.name}
                </Link>
              )}
            </li>
          ))}
        </ol>
      </nav>
      <JsonLd data={breadcrumbLd(items)} />
    </>
  );
}
