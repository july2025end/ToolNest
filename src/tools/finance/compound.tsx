"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { Field, Panel, Section } from "../shared/ui";
import { GrowthChart } from "./growth-chart";
import { CurrencySelect, Disclaimer, num, NumberField, Stat, useCurrency, useTrackWhen } from "./shared";

const FREQ = [
  { n: 1, label: "Yearly" },
  { n: 2, label: "Half-yearly" },
  { n: 4, label: "Quarterly" },
  { n: 12, label: "Monthly" },
  { n: 365, label: "Daily" },
];

/** Month-by-month simulation. Contributions are added at the end of each month. */
export function compound(P: number, ratePct: number, years: number, n: number, monthly: number) {
  const monthlyRate = (1 + ratePct / 100 / n) ** (n / 12) - 1;
  let bal = P;
  let paid = P;
  const points = [];
  for (let m = 1; m <= Math.round(years * 12); m++) {
    bal = bal * (1 + monthlyRate) + monthly;
    paid += monthly;
    if (m % 12 === 0) points.push({ year: m / 12, contributed: paid, balance: bal });
  }
  return { balance: bal, paid, points };
}

export default function Compound({ slug }: ToolProps) {
  const { cur, set, money, compact } = useCurrency();
  const [p, setP] = useState("10000");
  const [rate, setRate] = useState("7");
  const [years, setYears] = useState("15");
  const [freq, setFreq] = useState(12);
  const [monthly, setMonthly] = useState("200");

  const P = num(p);
  const R = num(rate);
  const Y = num(years);
  const M = monthly === "" ? 0 : num(monthly);
  const valid = P >= 0 && R >= 0 && R <= 100 && Y >= 1 && Y <= 100 && M >= 0 && (P > 0 || M > 0);
  const res = valid ? compound(P, R, Y, freq, M) : null;
  useTrackWhen(slug, !!res);

  return (
    <Panel>
      <Section title="Your numbers" aside={<CurrencySelect value={cur} onChange={set} />}>
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          <NumberField id="p" label="Starting amount" value={p} onChange={setP} />
          <NumberField id="m" label="Monthly contribution" value={monthly} onChange={setMonthly} />
          <NumberField id="r" label="Annual interest rate" value={rate} onChange={setRate} suffix="%" max={100} />
          <NumberField id="y" label="Time" value={years} onChange={setYears} suffix="years" min={1} max={100} step={1} />
          <Field label="Compounding" htmlFor="freq">
            <select id="freq" className="field" value={freq} onChange={(e) => setFreq(+e.target.value)}>
              {FREQ.map((f) => (
                <option key={f.n} value={f.n}>
                  {f.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </Section>
      <Section title="Result">
        {res ? (
          <>
            <dl className="grid gap-5 sm:grid-cols-3" aria-live="polite">
              <Stat strong label={`Balance after ${Y} years`} value={money(res.balance)} />
              <Stat label="Total paid in" value={money(res.paid)} />
              <Stat label="Interest earned" value={money(res.balance - res.paid)} />
            </dl>
            <GrowthChart points={res.points} compact={compact} labels={["Paid in", "Interest earned"]} />
          </>
        ) : (
          <p className="text-sm text-muted">Enter a starting amount or monthly contribution, a rate from 0 to 100% and 1 to 100 years.</p>
        )}
      </Section>
      <Disclaimer />
    </Panel>
  );
}
