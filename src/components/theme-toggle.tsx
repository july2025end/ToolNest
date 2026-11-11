"use client";

import { Icon } from "./icons";

export function ThemeToggle() {
  const toggle = () => {
    const dark = !document.documentElement.classList.contains("dark");
    document.documentElement.classList.toggle("dark", dark);
    try {
      localStorage.setItem("theme", dark ? "dark" : "light");
    } catch {}
  };
  // Both icons render; CSS shows the right one, so server and client markup match.
  return (
    <button type="button" onClick={toggle} className="btn-ghost w-11 px-0" aria-label="Toggle dark mode">
      <Icon name="moon" className="dark:hidden" />
      <Icon name="sun" className="hidden dark:block" />
    </button>
  );
}
