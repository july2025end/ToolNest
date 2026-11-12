"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { Field, Panel } from "../shared/ui";
import { entropyBits, makePassword, SETS } from "./logic";

type Opts = { lower: boolean; upper: boolean; digits: boolean; symbols: boolean; similar: boolean };
const LABELS: [keyof Opts, string][] = [
  ["upper", "Uppercase (A–Z)"],
  ["lower", "Lowercase (a–z)"],
  ["digits", "Numbers (0–9)"],
  ["symbols", "Symbols (!@#…)"],
  ["similar", "Include look-alikes (l, I, O, 0, 1)"],
];

function strength(bits: number) {
  if (bits >= 100) return { label: "Very strong", w: "100%", c: "bg-accent" };
  if (bits >= 72) return { label: "Strong", w: "75%", c: "bg-accent" };
  if (bits >= 50) return { label: "Fair", w: "50%", c: "bg-warn" };
  return { label: "Weak", w: "25%", c: "bg-danger" };
}

export default function PasswordGenerator({ slug }: ToolProps) {
  const [len, setLen] = useState(16);
  const [o, setO] = useState<Opts>({ lower: true, upper: true, digits: true, symbols: true, similar: false });
  const [pw, setPw] = useState("");
  const [copied, setCopied] = useState(false);
  // Generated in the browser only (never on the server), and again whenever the options change.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomness must come from the client
    setPw(makePassword(len, o));
  }, [len, o]);
  useTrackWhen(slug, copied);
  const pool = (["lower", "upper", "digits", "symbols"] as const).filter((k) => o[k]).reduce((a, k) => a + SETS[k].length + (o.similar && k !== "symbols" ? SETS.similar[k].length : 0), 0);
  const s = strength(entropyBits(len, pool));
  const none = !o.lower && !o.upper && !o.digits && !o.symbols;
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(pw);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Panel>
      <div className="space-y-3">
        <label htmlFor="pw" className="sr-only">
          Generated password
        </label>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input id="pw" readOnly value={none ? "" : pw} placeholder="Pick at least one character type" className="field num h-14 min-w-0 flex-1 font-mono text-[1.0625rem] tracking-wide" onFocus={(e) => e.target.select()} />
          <div className="flex gap-2">
            <button type="button" className="btn-primary h-14 flex-1 sm:flex-none" onClick={copy} disabled={none}>
              <Icon name={copied ? "check" : "file"} />
              {copied ? "Copied" : "Copy"}
            </button>
            <button type="button" className="btn-secondary h-14 flex-1 sm:flex-none" onClick={() => setPw(makePassword(len, o))} disabled={none}>
              <Icon name="rotate" />
              New
            </button>
          </div>
        </div>
        {!none && (
          <div className="flex items-center gap-3" aria-live="polite">
            <div className="h-1.5 flex-1 overflow-hidden rounded-full bg-surface-2">
              <div className={`h-full ${s.c}`} style={{ width: s.w }} />
            </div>
            <span className="text-sm font-medium">{s.label}</span>
          </div>
        )}
      </div>
      <Field label={`Length: ${len} characters`} htmlFor="len">
        <input id="len" type="range" min={6} max={64} value={len} onChange={(e) => setLen(+e.target.value)} className="w-full" />
      </Field>
      <fieldset className="grid gap-1 sm:grid-cols-2">
        <legend className="label">Include</legend>
        {LABELS.map(([k, label]) => (
          <label key={k} className="flex min-h-11 items-center gap-3">
            <input type="checkbox" checked={o[k]} onChange={(e) => setO((p) => ({ ...p, [k]: e.target.checked }))} />
            {label}
          </label>
        ))}
      </fieldset>
      <p className="note">Passwords are made on your device with your browser&rsquo;s secure random generator. They are never sent or stored.</p>
    </Panel>
  );
}
