"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useId, useState } from "react";
import { Icon } from "./icons";
import { tools } from "@/lib/tools";

const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]+/g, " ").trim();
const index = tools.map((t) => ({ t, hay: norm(`${t.name} ${t.blurb} ${t.slug} ${t.category}`) }));

export function ToolSearch() {
  const [q, setQ] = useState("");
  const router = useRouter();
  const listId = useId();

  // Supports the WebSite SearchAction: /?q=term
  useEffect(() => {
    const initial = new URLSearchParams(window.location.search).get("q");
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time sync from the URL
    if (initial) setQ(initial.slice(0, 80));
  }, []);

  const words = norm(q).split(" ").filter(Boolean);
  const results = words.length ? index.filter((x) => words.every((w) => x.hay.includes(w))).slice(0, 6) : [];

  return (
    <form
      role="search"
      className="relative mx-auto max-w-xl"
      onSubmit={(e) => {
        e.preventDefault();
        if (results[0]) router.push(`/${results[0].t.slug}`);
        else if (!q) document.getElementById("all-tools")?.scrollIntoView();
      }}
    >
      <label htmlFor="tool-search" className="sr-only">
        Search tools
      </label>
      <Icon name="search" className="pointer-events-none absolute top-[19px] left-5 text-muted" />
      <input
        id="tool-search"
        type="search"
        name="q"
        enterKeyHint="search"
        value={q}
        onKeyDown={(e) => e.key === "Escape" && setQ("")}
        onChange={(e) => setQ(e.target.value)}
        placeholder="Search tools, e.g. merge pdf, heic, emi"
        autoComplete="off"
        aria-controls={listId}
        className="field h-14 rounded-full border-transparent bg-surface pl-12 text-base shadow-(--shadow-card) hover:border-transparent"
      />
      <p className="sr-only" aria-live="polite">
        {q ? `${results.length} tool${results.length === 1 ? "" : "s"} found` : ""}
      </p>
      <div id={listId}>
        {q && (
          <ul className="absolute inset-x-0 top-[64px] z-20 overflow-hidden rounded-md bg-surface py-1 text-left shadow-(--shadow-lift)">
            {results.length ? (
              results.map(({ t }) => (
                <li key={t.slug}>
                  <Link href={`/${t.slug}`} className="flex min-h-12 items-center gap-3 px-4 hover:bg-surface-2">
                    <Icon name={t.icon} size={18} className="text-accent" />
                    <span className="font-medium">{t.name}</span>
                    <span className="ml-auto hidden text-sm text-muted sm:inline">{t.blurb}</span>
                  </Link>
                </li>
              ))
            ) : (
              <li className="px-4 py-3 text-sm text-muted">No tools match &ldquo;{q}&rdquo;.</li>
            )}
          </ul>
        )}
      </div>
    </form>
  );
}
