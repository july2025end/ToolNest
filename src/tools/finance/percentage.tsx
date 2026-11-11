"use client";

import { useState, type ReactNode } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { Panel } from "../shared/ui";
import { num, useTrackWhen } from "./shared";

const f = (n: number) => (Number.isFinite(n) ? new Intl.NumberFormat("en-US", { maximumFractionDigits: 4 }).format(n) : "–");

function Row({ id, parts }: { id: string; parts: (string | { label: string; value: string; set: (v: string) => void })[] }) {
  return (
    <div className="flex flex-wrap items-center gap-x-3 gap-y-2">
      {parts.map((p, i) =>
        typeof p === "string" ? (
          <span key={i} className="text-[1.0625rem]">
            {p}
          </span>
        ) : (
          <span key={i}>
            <label htmlFor={`${id}-${i}`} className="sr-only">
              {p.label}
            </label>
            <input id={`${id}-${i}`} type="text" inputMode="decimal" autoComplete="off" className="field num w-32" value={p.value} onChange={(e) => p.set(e.target.value)} />
          </span>
        ),
      )}
    </div>
  );
}

function Answer({ children }: { children: ReactNode }) {
  return (
    <p className="num border-l-[3px] border-accent pl-3 text-[1.25rem] font-bold" aria-live="polite">
      {children}
    </p>
  );
}

export default function Percentage({ slug }: ToolProps) {
  const [a1, setA1] = useState("15");
  const [b1, setB1] = useState("240");
  const [a2, setA2] = useState("80");
  const [b2, setB2] = useState("100");
  const [a3, setA3] = useState("45");
  const [b3, setB3] = useState("60");
  useTrackWhen(slug, true);

  const r1 = (num(a1) / 100) * num(b1);
  const r2 = ((num(b2) - num(a2)) / Math.abs(num(a2))) * 100;
  const r3 = (num(a3) / num(b3)) * 100;

  return (
    <Panel>
      <section className="space-y-3">
        <h2 className="type-h3">What is X% of Y?</h2>
        <Row id="p1" parts={["What is", { label: "Percent", value: a1, set: setA1 }, "% of", { label: "Number", value: b1, set: setB1 }, "?"]} />
        <Answer>= {f(r1)}</Answer>
      </section>
      <hr className="border-border" />
      <section className="space-y-3">
        <h2 className="type-h3">Percentage change from X to Y</h2>
        <Row id="p2" parts={["From", { label: "Old value", value: a2, set: setA2 }, "to", { label: "New value", value: b2, set: setB2 }]} />
        <Answer>
          {Number.isFinite(r2) ? (
            <>
              {r2 >= 0 ? "Increase" : "Decrease"} of {f(Math.abs(r2))}%
            </>
          ) : num(a2) === 0 ? (
            "The starting value can't be 0."
          ) : (
            "–"
          )}
        </Answer>
      </section>
      <hr className="border-border" />
      <section className="space-y-3">
        <h2 className="type-h3">X is what percent of Y?</h2>
        <Row id="p3" parts={[{ label: "Part", value: a3, set: setA3 }, "is what % of", { label: "Whole", value: b3, set: setB3 }, "?"]} />
        <Answer>{Number.isFinite(r3) ? `${f(r3)}%` : num(b3) === 0 ? "The whole can't be 0." : "–"}</Answer>
      </section>
    </Panel>
  );
}
