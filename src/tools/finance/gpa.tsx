"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { Panel } from "../shared/ui";
import { Stat, useTrackWhen } from "./shared";
import { gpa, GRADES } from "./units";

type Row = { id: number; name: string; grade: string; credits: string };
let next = 4;

export default function GpaCalculator({ slug }: ToolProps) {
  const [rows, setRows] = useState<Row[]>([
    { id: 1, name: "", grade: "A", credits: "3" },
    { id: 2, name: "", grade: "B+", credits: "3" },
    { id: 3, name: "", grade: "A-", credits: "4" },
  ]);
  const patch = (id: number, v: Partial<Row>) => setRows((r) => r.map((x) => (x.id === id ? { ...x, ...v } : x)));
  const r = gpa(rows.map((x) => ({ grade: x.grade, credits: parseFloat(x.credits) })));
  useTrackWhen(slug, rows.length !== 3);
  return (
    <Panel>
      <div className="space-y-2">
        <div className="hidden grid-cols-[minmax(0,1fr)_7rem_6rem_2.75rem] gap-2 text-sm font-medium sm:grid">
          <span>Course (optional)</span>
          <span>Grade</span>
          <span>Credits</span>
        </div>
        {rows.map((x, i) => (
          <div key={x.id} className="grid grid-cols-[minmax(0,1fr)_minmax(0,1fr)_2.75rem] gap-2 rounded-md bg-surface-2 p-2 sm:grid-cols-[minmax(0,1fr)_7rem_6rem_2.75rem] sm:bg-transparent sm:p-0">
            <input aria-label={`Course ${i + 1} name`} className="field col-span-3 sm:col-span-1" placeholder={`Course ${i + 1}`} value={x.name} onChange={(e) => patch(x.id, { name: e.target.value })} />
            <select aria-label={`Course ${i + 1} grade`} className="field" value={x.grade} onChange={(e) => patch(x.id, { grade: e.target.value })}>
              {Object.keys(GRADES).map((g) => (
                <option key={g} value={g}>
                  {g} ({GRADES[g].toFixed(1)})
                </option>
              ))}
            </select>
            <input aria-label={`Course ${i + 1} credits`} type="text" inputMode="decimal" className="field num" value={x.credits} onChange={(e) => patch(x.id, { credits: e.target.value })} />
            <button type="button" className="btn-ghost h-11 w-11 px-0 text-muted" aria-label={`Remove course ${i + 1}`} disabled={rows.length <= 1} onClick={() => setRows((rs) => rs.filter((y) => y.id !== x.id))}>
              <Icon name="trash" size={18} />
            </button>
          </div>
        ))}
        <button type="button" className="btn-secondary" onClick={() => setRows((r) => [...r, { id: next++, name: "", grade: "A", credits: "3" }])}>
          Add course
        </button>
      </div>
      <dl aria-live="polite" className="grid grid-cols-2 gap-5">
        <Stat strong label="GPA (4.0 scale)" value={Number.isFinite(r.gpa) ? r.gpa.toFixed(2) : "–"} />
        <Stat label="Total credits" value={r.credits} />
      </dl>
      <p className="note">Uses the common US 4.0 scale (A = 4.0, A− = 3.7, B+ = 3.3 …). Schools differ, for example some give A+ a 4.3, so check your own grading policy.</p>
    </Panel>
  );
}
