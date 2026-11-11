import Link from "next/link";
import { site } from "@/site.config";

export function Logo() {
  return (
    <Link href="/" className="flex min-h-11 items-center gap-2 rounded-sm font-bold tracking-[-0.01em]" aria-label={`${site.name} home`}>
      <svg width="26" height="26" viewBox="0 0 26 26" aria-hidden="true">
        <rect x="1" y="1" width="24" height="24" rx="7" fill="var(--accent)" />
        <path d="M7 15.5 13 19l6-3.5M7 11.5 13 15l6-3.5L13 8l-6 3.5Z" fill="none" stroke="var(--accent-fg)" strokeWidth="1.75" strokeLinejoin="round" strokeLinecap="round" />
      </svg>
      <span className="text-[1.0625rem]">{site.name}</span>
    </Link>
  );
}
