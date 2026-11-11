"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { Choice, Panel, Section } from "../shared/ui";
import { CurrencySelect, Disclaimer, num, NumberField, Stat, useCurrency, useTrackWhen } from "./shared";

type Row = { period: string; payment: number; principal: number; interest: number; balance: number };

export function amortize(P: number, annualRate: number, months: number) {
  const r = annualRate / 100 / 12;
  const emi = r === 0 ? P / months : (P * r * (1 + r) ** months) / ((1 + r) ** months - 1);
  const rows: Row[] = [];
  let bal = P;
  for (let m = 1; m <= months; m++) {
    const interest = bal * r;
    const principal = Math.min(emi - interest, bal);
    bal = Math.max(0, bal - principal);
    rows.push({ period: String(m), payment: principal + interest, principal, interest, balance: bal });
  }
  return { emi, rows, totalInterest: rows.reduce((s, x) => s + x.interest, 0) };
}

export default function Loan({ slug }: ToolProps) {
  const { cur, set, money } = useCurrency();
  const [amount, setAmount] = useState("250000");
  const [rate, setRate] = useState("8.5");
  const [term, setTerm] = useState("20");
  const [unit, setUnit] = useState<"years" | "months">("years");
  const [view, setView] = useState<"yearly" | "monthly">("yearly");

  const P = num(amount);
  const R = num(rate);
  const months = Math.round(num(term) * (unit === "years" ? 12 : 1));
  const valid = P > 0 && R >= 0 && R <= 100 && months >= 1 && months <= 600;
  const res = valid ? amortize(P, R, months) : null;
  useTrackWhen(slug, !!res);

  const yearly: Row[] = [];
  if (res) {
    for (let y = 0; y < Math.ceil(months / 12); y++) {
      const chunk = res.rows.slice(y * 12, y * 12 + 12);
      yearly.push({
        period: `Year ${y + 1}`,
        payment: chunk.reduce((s, r) => s + r.payment, 0),
        principal: chunk.reduce((s, r) => s + r.principal, 0),
        interest: chunk.reduce((s, r) => s + r.interest, 0),
        balance: chunk[chunk.length - 1].balance,
      });
    }
  }
  const table = view === "yearly" ? yearly : res?.rows.map((r) => ({ ...r, period: `Month ${r.period}` })) ?? [];
  const interestShare = res ? res.totalInterest / (P + res.totalInterest) : 0;

  return (
    <Panel>
      <Section title="Loan details" aside={<CurrencySelect value={cur} onChange={set} />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField id="amount" label="Loan amount" value={amount} onChange={setAmount} min={1} />
          <NumberField id="rate" label="Interest rate (yearly)" value={rate} onChange={setRate} suffix="%" max={100} />
          <div>
            <NumberField id="term" label="Loan term" value={term} onChange={setTerm} min={1} max={unit === "years" ? 50 : 600} suffix={unit} />
            <div className="mt-2">
              <Choice name="unit" label="Term in" value={unit} onChange={setUnit} options={[{ value: "years", label: "Years" }, { value: "months", label: "Months" }]} />
            </div>
          </div>
        </div>
      </Section>

      <Section title="Result">
        {res ? (
          <>
            <dl className="grid gap-5 sm:grid-cols-3" aria-live="polite">
              <Stat strong label="Monthly payment (EMI)" value={money(res.emi)} />
              <Stat label="Total interest" value={money(res.totalInterest)} />
              <Stat label="Total of all payments" value={money(P + res.totalInterest)} />
            </dl>
            <div>
              <div className="flex h-3 overflow-hidden rounded-full bg-surface-2" role="img" aria-label={`Principal ${Math.round((1 - interestShare) * 100)}%, interest ${Math.round(interestShare * 100)}%`}>
                <div className="bg-accent" style={{ width: `${(1 - interestShare) * 100}%` }} />
                <div className="bg-muted" style={{ width: `${interestShare * 100}%` }} />
              </div>
              <p className="mt-2 flex flex-wrap gap-x-5 text-sm text-muted">
                <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-accent" />Principal {Math.round((1 - interestShare) * 100)}%</span>
                <span><span className="mr-1.5 inline-block h-2.5 w-2.5 rounded-full bg-muted" />Interest {Math.round(interestShare * 100)}%</span>
              </p>
            </div>
          </>
        ) : (
          <p className="text-sm text-muted">Enter a loan amount, a rate from 0 to 100% and a term up to 50 years.</p>
        )}
      </Section>

      {res && (
        <Section title="Amortization schedule" aside={<Choice name="view" label="Schedule view" hideLabel value={view} onChange={setView} options={[{ value: "yearly", label: "Yearly" }, { value: "monthly", label: "Monthly" }]} />}>
          <div className="max-h-[420px] overflow-auto rounded-md border border-border" tabIndex={0} role="region" aria-label="Amortization schedule">
            <table className="num w-full min-w-[560px] text-right text-sm">
              <thead className="sticky top-0 bg-surface-2 text-xs text-muted">
                <tr>
                  {["Period", "Payment", "Principal", "Interest", "Balance"].map((h, i) => (
                    <th key={h} scope="col" className={`px-3 py-2.5 font-semibold ${i === 0 ? "text-left" : ""}`}>
                      {h}
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody className="divide-y divide-border">
                {table.map((r) => (
                  <tr key={r.period}>
                    <th scope="row" className="px-3 py-2 text-left font-medium">
                      {r.period}
                    </th>
                    <td className="px-3 py-2">{money(r.payment)}</td>
                    <td className="px-3 py-2">{money(r.principal)}</td>
                    <td className="px-3 py-2">{money(r.interest)}</td>
                    <td className="px-3 py-2">{money(r.balance)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Section>
      )}
      <Disclaimer />
    </Panel>
  );
}
