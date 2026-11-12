"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { IntInput, Panel } from "../shared/ui";
import { CurrencySelect, NumberField, num, Stat, useCurrency, useTrackWhen } from "./shared";

const PRESETS = [10, 12, 15, 18, 20, 25];

export default function TipCalculator({ slug }: ToolProps) {
  const { cur, set: setCur, money } = useCurrency();
  const [bill, setBill] = useState("60");
  const [pct, setPct] = useState("15");
  const [people, setPeople] = useState(1);
  const [roundUp, setRoundUp] = useState(false);
  const b = num(bill);
  const p = num(pct);
  const ok = b >= 0 && p >= 0;
  let tip = ok ? (b * p) / 100 : NaN;
  let total = b + tip;
  // Round the per-person share up to a whole unit and put the difference into the tip.
  if (ok && roundUp) {
    total = Math.ceil(total / people) * people;
    tip = total - b;
  }
  useTrackWhen(slug, ok && bill !== "60");
  return (
    <Panel>
      <div className="flex justify-end">
        <CurrencySelect value={cur} onChange={setCur} />
      </div>
      <div className="grid gap-4 sm:grid-cols-2">
        <NumberField id="bill" label="Bill amount" value={bill} onChange={setBill} />
        <div>
          <NumberField id="pct" label="Tip" value={pct} onChange={setPct} suffix="%" max={100} />
          <div className="mt-2 flex flex-wrap gap-2">
            {PRESETS.map((x) => (
              <button key={x} type="button" className="chip min-h-9 px-3" aria-pressed={pct === String(x)} onClick={() => setPct(String(x))}>
                {x}%
              </button>
            ))}
          </div>
        </div>
        <div>
          <label htmlFor="people" className="label">
            Split between
          </label>
          <div className="flex items-center gap-2">
            <button type="button" className="btn-secondary h-11 w-11 px-0 text-lg" aria-label="One fewer person" disabled={people <= 1} onClick={() => setPeople((n) => n - 1)}>
              −
            </button>
            <IntInput id="people" min={1} max={100} value={people} onChange={setPeople} className="field num w-20 text-center" />
            <button type="button" className="btn-secondary h-11 w-11 px-0 text-lg" aria-label="One more person" disabled={people >= 100} onClick={() => setPeople((n) => n + 1)}>
              +
            </button>
            <span className="text-sm text-muted">{people === 1 ? "person" : "people"}</span>
          </div>
        </div>
        <label className="flex min-h-11 items-center gap-2 self-end text-sm">
          <input type="checkbox" checked={roundUp} onChange={(e) => setRoundUp(e.target.checked)} />
          Round each share up to a whole amount
        </label>
      </div>
      <dl aria-live="polite" className="grid grid-cols-2 gap-5 sm:grid-cols-4">
        <Stat strong label={people > 1 ? "Each person pays" : "Total to pay"} value={money(total / people)} />
        <Stat label="Tip" value={money(tip)} />
        <Stat label="Total with tip" value={money(total)} />
        {people > 1 && <Stat label="Tip per person" value={money(tip / people)} />}
      </dl>
    </Panel>
  );
}
