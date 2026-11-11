"use client";

import { useState, type ReactNode } from "react";

/**
 * Whole-number input that lets people type freely (e.g. clear the field, or type "30" when the minimum is 5).
 * Values inside [min, max] are applied as you type; anything else is corrected when the field loses focus.
 */
export function IntInput({ id, value, min, max, onChange, className }: { id: string; value: number; min: number; max: number; onChange: (v: number) => void; className?: string }) {
  const [text, setText] = useState(String(value));
  const [shown, setShown] = useState(value);
  // Follow outside changes (preset chips etc.) without overwriting what's being typed.
  if (value !== shown) {
    setShown(value);
    setText(String(value));
  }
  const clamp = (n: number) => Math.min(max, Math.max(min, Math.round(n)));
  return (
    <input
      id={id}
      type="text"
      inputMode="numeric"
      autoComplete="off"
      className={className}
      value={text}
      onChange={(e) => {
        const t = e.target.value.replace(/[^\d]/g, "");
        setText(t);
        const n = parseInt(t, 10);
        if (Number.isFinite(n) && n >= min && n <= max && n !== value) {
          setShown(n);
          onChange(n);
        }
      }}
      onBlur={() => {
        const n = parseInt(text, 10);
        const v = Number.isFinite(n) ? clamp(n) : value;
        setText(String(v));
        setShown(v);
        if (v !== value) onChange(v);
      }}
    />
  );
}

/** The tool card: input → options → result → download. */
export function Panel({ children }: { children: ReactNode }) {
  return <div className="panel space-y-6 p-4 sm:p-6">{children}</div>;
}

export function Section({ title, children, aside }: { title: string; children: ReactNode; aside?: ReactNode }) {
  return (
    <section className="space-y-3">
      <div className="flex items-center justify-between gap-3">
        <h2 className="eyebrow">{title}</h2>
        {aside}
      </div>
      {children}
    </section>
  );
}

/** Segmented single-choice control (radio group styled as chips). */
export function Choice<T extends string | number>({
  label,
  value,
  options,
  onChange,
  name,
  hideLabel,
}: {
  hideLabel?: boolean;
  label: string;
  value: T;
  options: { value: T; label: string }[];
  onChange: (v: T) => void;
  name: string;
}) {
  return (
    <fieldset>
      <legend className={hideLabel ? "sr-only" : "label"}>{label}</legend>
      <div className="flex flex-wrap gap-2">
        {options.map((o) => (
          <label key={String(o.value)} className="chip">
            <input
              type="radio"
              name={name}
              className="sr-only"
              checked={value === o.value}
              onChange={() => onChange(o.value)}
            />
            {o.label}
          </label>
        ))}
      </div>
    </fieldset>
  );
}

export function Field({ label, htmlFor, children, hint }: { label: string; htmlFor: string; children: ReactNode; hint?: string }) {
  return (
    <div>
      <label htmlFor={htmlFor} className="label">
        {label}
      </label>
      {children}
      {hint && <p className="mt-1 text-sm text-muted">{hint}</p>}
    </div>
  );
}

export function Progress({ value, label }: { value: number | null; label: string }) {
  return (
    <div role="status" aria-live="polite" className="space-y-2">
      <p className="text-sm font-medium">{label}</p>
      <div className="h-2 overflow-hidden rounded-full bg-surface-2">
        <div
          className={`h-full bg-accent ${value === null ? "w-1/3 animate-pulse" : ""}`}
          style={value === null ? undefined : { width: `${Math.round(value * 100)}%` }}
        />
      </div>
    </div>
  );
}

export function ErrorText({ children }: { children: ReactNode }) {
  if (!children) return null;
  return (
    <p role="alert" className="text-sm text-danger">
      {children}
    </p>
  );
}
