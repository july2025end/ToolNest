"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { Choice, Panel, Section } from "../shared/ui";
import { GrowthChart } from "./growth-chart";
import { CurrencySelect, Disclaimer, num, NumberField, Stat, useCurrency, useTrackWhen } from "./shared";

/** SIP convention: invest at the start of each month, monthly rate = annual / 12. */
const factor = (ratePct: number, months: number) => {
  const i = ratePct / 100 / 12;
  return i === 0 ? months : (((1 + i) ** months - 1) / i) * (1 + i);
};

function series(monthly: number, ratePct: number, months: number) {
  const i = ratePct / 100 / 12;
  let bal = 0;
  const pts = [];
  for (let m = 1; m <= months; m++) {
    bal = (bal + monthly) * (1 + i);
    if (m % 12 === 0 || m === months) pts.push({ year: Math.ceil(m / 12), contributed: monthly * m, balance: bal });
  }
  return pts;
}

export default function Sip({ slug }: ToolProps) {
  const { cur, set, money, compact } = useCurrency();
  const [mode, setMode] = useState<"invest" | "goal">("invest");
  const [monthly, setMonthly] = useState("500");
  const [goal, setGoal] = useState("100000");
  const [rate, setRate] = useState("10");
  const [years, setYears] = useState("10");

  const R = num(rate);
  const months = Math.round(num(years) * 12);
  const okBase = R >= 0 && R <= 50 && months >= 1 && months <= 600;
  const amount = mode === "invest" ? num(monthly) : num(goal) / factor(R, months);
  const valid = okBase && (mode === "invest" ? num(monthly) > 0 : num(goal) > 0);
  const fv = valid ? amount * factor(R, months) : 0;
  const invested = valid ? amount * months : 0;
  useTrackWhen(slug, valid);

  return (
    <Panel>
      <Section title="Your plan" aside={<CurrencySelect value={cur} onChange={set} />}>
        <Choice name="mode" label="I want to know" value={mode} onChange={setMode} options={[{ value: "invest", label: "What my monthly saving grows to" }, { value: "goal", label: "How much to save each month for a goal" }]} />
        <div className="grid gap-4 sm:grid-cols-3">
          {mode === "invest" ? (
            <NumberField id="monthly" label="Monthly investment" value={monthly} onChange={setMonthly} min={1} />
          ) : (
            <NumberField id="goal" label="Goal amount" value={goal} onChange={setGoal} min={1} />
          )}
          <NumberField id="rate" label="Expected annual return" value={rate} onChange={setRate} suffix="%" max={50} />
          <NumberField id="years" label="Time" value={years} onChange={setYears} suffix="years" min={1} max={50} />
        </div>
      </Section>
      <Section title="Result">
        {valid ? (
          <>
            <dl className="grid gap-5 sm:grid-cols-3" aria-live="polite">
              {mode === "invest" ? (
                <Stat strong label="Estimated value" value={money(fv)} />
              ) : (
                <Stat strong label="Save each month" value={money(amount)} />
              )}
              <Stat label="Total invested" value={money(invested)} />
              <Stat label="Estimated returns" value={money(fv - invested)} />
            </dl>
            <GrowthChart points={series(amount, R, months)} compact={compact} labels={["Invested", "Returns"]} />
          </>
        ) : (
          <p className="text-sm text-muted">Enter an amount, a return from 0 to 50% and 1 to 50 years.</p>
        )}
      </Section>
      <Disclaimer />
    </Panel>
  );
}
