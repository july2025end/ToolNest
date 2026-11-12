import { Icon } from "./icons";
import type { Tool } from "@/lib/tools";

/** Plain <a> on purpose: fewer client components to hydrate on mobile. Soft tiles: icon badge, name, one line. Used on home, hubs and "related". */
export function ToolList({ tools, cols = 2 }: { tools: Tool[]; cols?: 1 | 2 | 3 }) {
  const grid = cols === 3 ? "sm:grid-cols-2 lg:grid-cols-3" : cols === 2 ? "sm:grid-cols-2" : "";
  return (
    <ul role="list" className={`grid gap-3 ${grid}`}>
      {tools.map((t) => (
        <li key={t.slug}>
          <a href={`/${t.slug}`} className="tile group flex h-full min-h-20 items-center gap-4 p-4 sm:p-5">
            <span className="icon-badge">
              <Icon name={t.icon} size={22} />
            </span>
            <span className="min-w-0 flex-1">
              <span className="block font-semibold tracking-[-0.01em]">{t.name}</span>
              <span className="mt-0.5 block text-sm leading-snug text-muted">{t.blurb}</span>
            </span>
            <Icon name="chevron" size={18} className="shrink-0 text-border-strong group-hover:text-accent" />
          </a>
        </li>
      ))}
    </ul>
  );
}
