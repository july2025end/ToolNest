import { Icon } from "./icons";
import type { Tool } from "@/lib/tools";

/** Plain <a> on purpose: fewer client components to hydrate on mobile. Bordered rows (not cards): icon, name, one line. Used on home, hubs and "related". */
export function ToolList({ tools, cols = 2 }: { tools: Tool[]; cols?: 1 | 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul role="list" className={`grid gap-2 ${grid}`}>
      {tools.map((t) => (
        <li key={t.slug} className="rounded-md border border-border bg-surface">
          <a href={`/${t.slug}`} className="group flex h-full min-h-16 items-start gap-3 rounded-md p-4 hover:bg-surface-2">
            <span className="mt-0.5 text-accent">
              <Icon name={t.icon} size={22} />
            </span>
            <span className="min-w-0">
              <span className="block font-semibold group-hover:text-accent">{t.name}</span>
              <span className="block text-sm text-muted">{t.blurb}</span>
            </span>
          </a>
        </li>
      ))}
    </ul>
  );
}
