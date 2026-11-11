"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { trackToolUse } from "@/lib/supabase";

export const CURRENCIES = [
  { code: "USD", label: "$ US dollar" },
  { code: "EUR", label: "€ Euro" },
  { code: "GBP", label: "£ British pound" },
  { code: "INR", label: "₹ Indian rupee" },
  { code: "PKR", label: "Rs Pakistani rupee" },
  { code: "AED", label: "AED UAE dirham" },
  { code: "SAR", label: "SAR Saudi riyal" },
  { code: "CAD", label: "C$ Canadian dollar" },
  { code: "AUD", label: "A$ Australian dollar" },
  { code: "NGN", label: "₦ Nigerian naira" },
  { code: "BDT", label: "৳ Bangladeshi taka" },
  { code: "JPY", label: "¥ Japanese yen" },
] as const;

export type Currency = (typeof CURRENCIES)[number]["code"];

/** Remembers the visitor's currency across calculators (per browser only). */
export function useCurrency() {
  const [cur, setCur] = useState<Currency>("USD");
  useEffect(() => {
    try {
      const saved = localStorage.getItem("currency") as Currency | null;
      // eslint-disable-next-line react-hooks/set-state-in-effect -- restore saved preference after hydration
      if (saved && CURRENCIES.some((c) => c.code === saved)) setCur(saved);
    } catch {}
  }, []);
  const set = (c: Currency) => {
    setCur(c);
    try {
      localStorage.setItem("currency", c);
    } catch {}
  };
  const fmt = new Intl.NumberFormat(cur === "INR" ? "en-IN" : "en-US", {
    style: "currency",
    currency: cur,
    maximumFractionDigits: cur === "JPY" ? 0 : 2,
  });
  // Hand-rolled compact format: Intl "compact" output differs between Node and browsers (hydration mismatch).
  const short = new Intl.NumberFormat("en-US", { style: "currency", currency: cur, minimumFractionDigits: 0, maximumFractionDigits: 1 });
  const compact = (n: number) => {
    const a = Math.abs(n);
    const [d, s] = a >= 1e9 ? [1e9, "B"] : a >= 1e6 ? [1e6, "M"] : a >= 1e3 ? [1e3, "K"] : [1, ""];
    return short.format(Math.round((n / d) * 10) / 10) + s;
  };
  return { cur, set, money: (n: number) => (Number.isFinite(n) ? fmt.format(n) : "–"), compact };
}

export function CurrencySelect({ value, onChange }: { value: Currency; onChange: (c: Currency) => void }) {
  return (
    <div className="flex items-center gap-2">
      <label htmlFor="currency" className="text-sm font-medium">
        Currency
      </label>
      <select id="currency" className="field w-auto" value={value} onChange={(e) => onChange(e.target.value as Currency)}>
        {CURRENCIES.map((c) => (
          <option key={c.code} value={c.code}>
            {c.label}
          </option>
        ))}
      </select>
    </div>
  );
}

/** Numeric input that allows empty/partial typing and reports a number (NaN when empty). */
export function NumberField({
  id,
  label,
  value,
  onChange,
  suffix,
  min = 0,
  max,
  hint,
}: {
  id: string;
  label: string;
  value: string;
  onChange: (v: string) => void;
  suffix?: string;
  min?: number;
  max?: number;
  step?: number;
  hint?: string;
}) {
  const n = parseFloat(value);
  const invalid = value !== "" && (!Number.isFinite(n) || n < min || (max !== undefined && n > max));
  return (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <div className="relative">
        <input
          id={id}
          type="text"
          inputMode="decimal"
          autoComplete="off"
          value={value}
          onChange={(e) => onChange(e.target.value)}
          aria-invalid={invalid || undefined}
          aria-describedby={invalid ? `${id}-err` : undefined}
          className={`field num ${suffix ? "pr-16" : ""} ${invalid ? "border-danger" : ""}`}
        />
        {suffix && <span className="pointer-events-none absolute top-1/2 right-3 -translate-y-1/2 text-sm text-muted">{suffix}</span>}
      </div>
      {invalid ? (
        <p id={`${id}-err`} className="mt-1 text-sm text-danger">
          Enter a number{max !== undefined ? ` from ${min} to ${max}` : ` of at least ${min}`}.
        </p>
      ) : (
        hint && <p className="mt-1 text-sm text-muted">{hint}</p>
      )}
    </div>
  );
}

export const num = (s: string) => {
  const n = parseFloat(s);
  return Number.isFinite(n) ? n : NaN;
};

export function Stat({ label, value, strong }: { label: string; value: ReactNode; strong?: boolean }) {
  return (
    <div className={strong ? "border-l-[3px] border-accent pl-3" : "pl-[15px]"}>
      <dt className="text-sm text-muted">{label}</dt>
      <dd className={`num font-bold tracking-[-0.01em] ${strong ? "text-[1.75rem] leading-tight" : "text-[1.25rem]"}`}>{value}</dd>
    </div>
  );
}

export function Disclaimer() {
  return <p className="note">For estimates only, not financial advice. Real figures depend on your lender or provider&rsquo;s exact terms, fees and rounding.</p>;
}

/** Counts one use per page view once the visitor has produced a valid result. */
export function useTrackWhen(slug: string, ready: boolean) {
  const done = useRef(false);
  useEffect(() => {
    if (ready && !done.current) {
      const t = setTimeout(() => {
        done.current = true;
        trackToolUse(slug);
      }, 3000);
      return () => clearTimeout(t);
    }
  }, [ready, slug]);
}
