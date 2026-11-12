"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { Panel } from "../shared/ui";
import { useTrackWhen } from "./shared";
import { convert, fmt, KINDS } from "./units";

export default function UnitConverter({ slug }: ToolProps) {
  const [kindId, setKindId] = useState(KINDS[0].id);
  const kind = KINDS.find((k) => k.id === kindId)!;
  const [from, setFrom] = useState(kind.from);
  const [to, setTo] = useState(kind.to);
  const [value, setValue] = useState("1");
  const v = parseFloat(value.replace(/,/g, ""));
  const out = Number.isFinite(v) ? convert(kind, v, from, to) : NaN;
  useTrackWhen(slug, Number.isFinite(out) && value !== "1");
  const pick = (id: string) => {
    const k = KINDS.find((x) => x.id === id)!;
    setKindId(id);
    setFrom(k.from);
    setTo(k.to);
  };
  const sel = (id: string, val: string, set: (v: string) => void, label: string) => (
    <div>
      <label htmlFor={id} className="label">
        {label}
      </label>
      <select id={id} className="field" value={val} onChange={(e) => set(e.target.value)}>
        {kind.units.map((u) => (
          <option key={u.id} value={u.id}>
            {u.label}
          </option>
        ))}
      </select>
    </div>
  );
  return (
    <Panel>
      <div className="flex flex-wrap gap-2" role="group" aria-label="What to convert">
        {KINDS.map((k) => (
          <button key={k.id} type="button" className="chip" aria-pressed={k.id === kindId} onClick={() => pick(k.id)}>
            {k.label}
          </button>
        ))}
      </div>
      <div className="grid items-end gap-4 sm:grid-cols-[minmax(0,1fr)_auto_minmax(0,1fr)]">
        <div className="space-y-3">
          <div>
            <label htmlFor="u-val" className="label">
              Value
            </label>
            <input id="u-val" type="text" inputMode="decimal" autoComplete="off" className="field num h-14 text-[1.25rem]" value={value} onChange={(e) => setValue(e.target.value)} />
          </div>
          {sel("u-from", from, setFrom, "From")}
        </div>
        <button
          type="button"
          className="btn-secondary mx-auto h-11 w-11 rotate-90 px-0 sm:mb-0 sm:rotate-0"
          aria-label="Swap units"
          onClick={() => {
            setFrom(to);
            setTo(from);
          }}
        >
          <Icon name="convert" />
        </button>
        <div className="space-y-3">
          <div>
            <p className="label">Result</p>
            <output htmlFor="u-val u-from u-to" aria-live="polite" className="num flex h-14 items-center rounded-sm bg-accent-soft px-3.5 text-[1.25rem] font-semibold break-all">
              {fmt(out)}
            </output>
          </div>
          {sel("u-to", to, setTo, "To")}
        </div>
      </div>
      {Number.isFinite(out) && (
        <p className="num text-muted">
          {fmt(v)} {kind.units.find((u) => u.id === from)!.label.replace(/ \(.*/, "").toLowerCase()} = <strong className="text-text">{fmt(out)}</strong> {kind.units.find((u) => u.id === to)!.label.replace(/ \(.*/, "").toLowerCase()}
        </p>
      )}
    </Panel>
  );
}
