"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "./icons";
import { categories, toolsIn } from "@/lib/tools";

export function ToolsMenu() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();
  const panelId = useId();
  const btn = useRef<HTMLButtonElement>(null);
  const wrap = useRef<HTMLDivElement>(null);

  // Close on navigation.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    setOpen(false);
  }

  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        btn.current?.focus();
      }
    };
    const onDown = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onDown);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onDown);
    };
  }, [open]);

  return (
    <div ref={wrap}>
      <button
        ref={btn}
        type="button"
        className="btn-ghost min-h-9 px-3.5 text-sm"
        aria-expanded={open}
        aria-controls={panelId}
        onClick={() => setOpen((o) => !o)}
      >
        <Icon name={open ? "close" : "menu"} />
        <span>All tools</span>
      </button>
      <div
        id={panelId}
        hidden={!open}
        data-open={open || undefined}
        className="absolute inset-x-0 top-14 z-40 bg-bg max-h-[calc(100dvh-3.5rem)] overflow-y-auto border-b border-border/70 shadow-(--shadow-lift)"
      >
        {open && (
        <nav aria-label="All tools" className="container-x grid gap-8 py-8 sm:grid-cols-2 lg:grid-cols-5">
          {categories.map((c) => (
            <div key={c.id}>
              <p className="eyebrow mb-2">{c.name}</p>
              <ul>
                {toolsIn(c.id).map((t) => (
                  <li key={t.slug}>
                    <Link href={`/${t.slug}`} className="flex min-h-11 items-center gap-2 rounded-sm text-[0.9375rem] hover:text-accent">
                      <Icon name={t.icon} size={18} className="shrink-0 text-muted" />
                      {t.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
        )}
      </div>
    </div>
  );
}
