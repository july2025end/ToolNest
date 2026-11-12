"use client";

import { useEffect, useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { ageParts } from "../text/logic";
import { Field, Panel } from "../shared/ui";
import { Stat, useTrackWhen } from "./shared";

const iso = (d: Date) => `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, "0")}-${String(d.getDate()).padStart(2, "0")}`;
const parse = (s: string) => {
  const [y, m, d] = s.split("-").map(Number);
  return y > 999 ? new Date(y, m - 1, d) : null;
};
const n = (v: number) => new Intl.NumberFormat("en-US").format(v);
const WEEKDAY = new Intl.DateTimeFormat("en-US", { weekday: "long" });

export default function AgeCalculator({ slug }: ToolProps) {
  const [dob, setDob] = useState("");
  const [at, setAt] = useState("");
  // Today is only known in the browser; set it after hydration so server and client markup match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- one-time client-only default
    setAt(iso(new Date()));
  }, []);
  const from = parse(dob);
  const to = parse(at);
  const bad = from && to && from > to;
  const r = from && to && !bad ? ageParts(from, to) : null;
  useTrackWhen(slug, !!r);

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-2">
        <Field label="Date of birth" htmlFor="dob">
          <input id="dob" type="date" className="field num" value={dob} max={at || undefined} onChange={(e) => setDob(e.target.value)} />
        </Field>
        <Field label="Age on this date" htmlFor="at" hint="Today by default. Change it to find an age on any date.">
          <input id="at" type="date" className="field num" value={at} onChange={(e) => setAt(e.target.value)} />
        </Field>
      </div>
      {bad && <p role="alert" className="text-sm text-danger">The date of birth is after the second date. Swap them or pick an earlier birth date.</p>}
      <div aria-live="polite">
        {r ? (
          <div className="space-y-6">
            <p className="text-[1.75rem] leading-tight font-semibold tracking-[-0.02em] sm:text-[2.25rem]">
              <span className="num">{r.years}</span> years, <span className="num">{r.months}</span> months, <span className="num">{r.days}</span> days
            </p>
            <dl className="grid grid-cols-2 gap-5 sm:grid-cols-4">
              <Stat label="Total months" value={n(r.totalMonths)} />
              <Stat label="Total weeks" value={n(r.weeks)} />
              <Stat label="Total days" value={n(r.totalDays)} />
              <Stat label="Next birthday" value={r.toNext === 0 ? "Today!" : `in ${n(r.toNext)} days`} />
            </dl>
            <p className="text-sm text-muted">Born on a {WEEKDAY.format(from!)}.</p>
          </div>
        ) : (
          !bad && <p className="text-muted">Enter a date of birth to see the exact age.</p>
        )}
      </div>
    </Panel>
  );
}
