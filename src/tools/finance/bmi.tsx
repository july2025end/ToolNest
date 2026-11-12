"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { bmi } from "../text/logic";
import { Choice, Panel } from "../shared/ui";
import { NumberField, num, Stat, useTrackWhen } from "./shared";

const one = (v: number) => v.toFixed(1);

export default function BmiCalculator({ slug }: ToolProps) {
  const [unit, setUnit] = useState<"metric" | "imperial">("metric");
  const [kg, setKg] = useState("70");
  const [cm, setCm] = useState("175");
  const [lb, setLb] = useState("154");
  const [ft, setFt] = useState("5");
  const [inch, setInch] = useState("9");
  const metric = unit === "metric";
  const w = metric ? num(kg) : num(lb) * 0.45359237;
  const h = metric ? num(cm) : (num(ft) * 12 + (num(inch) || 0)) * 2.54;
  const ok = w > 0 && h > 50 && h < 300;
  const r = ok ? bmi(w, h) : null;
  useTrackWhen(slug, !!r);
  const range = r && (metric ? `${one(r.healthy[0])}–${one(r.healthy[1])} kg` : `${Math.round(r.healthy[0] / 0.45359237)}–${Math.round(r.healthy[1] / 0.45359237)} lb`);
  // Marker position on a 15–40 scale.
  const pos = r ? Math.min(100, Math.max(0, ((r.value - 15) / 25) * 100)) : 0;

  return (
    <Panel>
      <Choice name="unit" label="Units" value={unit} onChange={setUnit} options={[{ value: "metric", label: "Metric (kg, cm)" }, { value: "imperial", label: "Imperial (lb, ft)" }]} />
      {metric ? (
        <div className="grid gap-4 sm:grid-cols-2">
          <NumberField id="kg" label="Weight" value={kg} onChange={setKg} suffix="kg" max={500} />
          <NumberField id="cm" label="Height" value={cm} onChange={setCm} suffix="cm" max={300} />
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField id="lb" label="Weight" value={lb} onChange={setLb} suffix="lb" max={1100} />
          <NumberField id="ft" label="Height" value={ft} onChange={setFt} suffix="ft" max={9} />
          <NumberField id="in" label="and" value={inch} onChange={setInch} suffix="in" max={11.99} />
        </div>
      )}
      <div aria-live="polite">
        {r ? (
          <div className="space-y-5">
            <dl className="grid grid-cols-2 gap-5">
              <Stat strong label="Your BMI" value={one(r.value)} />
              <Stat label="Category" value={<span className={r.band.tone === "ok" ? "text-accent" : "text-warn"}>{r.band.label}</span>} />
            </dl>
            <div aria-hidden="true">
              <div className="relative h-3 rounded-full bg-[linear-gradient(to_right,#5ac8fa_0%,#5ac8fa_14%,#34c759_14%,#34c759_40%,#ffcc00_40%,#ffcc00_60%,#ff9500_60%)]">
                <span className="absolute top-1/2 h-5 w-5 -translate-x-1/2 -translate-y-1/2 rounded-full border-[3px] border-surface bg-text shadow" style={{ left: `${pos}%` }} />
              </div>
              <div className="num relative mt-1.5 h-4 text-xs text-muted">
                {[15, 18.5, 25, 30, 40].map((v, i, a) => (
                  <span key={v} className={`absolute ${i === 0 ? "" : i === a.length - 1 ? "-translate-x-full" : "-translate-x-1/2"}`} style={{ left: `${((v - 15) / 25) * 100}%` }}>
                    {v}
                  </span>
                ))}
              </div>
            </div>
            <p>
              A healthy weight for your height is about <strong className="num">{range}</strong>.
            </p>
          </div>
        ) : (
          <p className="text-muted">Enter your weight and height.</p>
        )}
      </div>
      <p className="note">BMI is a quick screening number for adults, not a diagnosis. It doesn&rsquo;t tell muscle from fat, and different cut-offs are used for children and some ethnic groups.</p>
    </Panel>
  );
}
