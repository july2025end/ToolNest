"use client";

import { useEffect, useMemo, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { Panel } from "../shared/ui";
import { useTrackWhen } from "./shared";
import { hourIn, instant, offset } from "./tz";

const COMMON = ["America/Los_Angeles", "America/New_York", "Europe/London", "Europe/Paris", "Asia/Dubai", "Asia/Karachi", "Asia/Kolkata", "Asia/Singapore", "Asia/Tokyo", "Australia/Sydney"];
const pretty = (z: string) => z.split("/").pop()!.replace(/_/g, " ");

const fmtOff = (m: number) => `UTC${m >= 0 ? "+" : "−"}${String(Math.floor(Math.abs(m) / 60)).padStart(2, "0")}:${String(Math.abs(m) % 60).padStart(2, "0")}`;

export default function TimezoneConverter({ slug }: ToolProps) {
  const zones = useMemo(() => {
    try {
      return Intl.supportedValuesOf("timeZone");
    } catch {
      return COMMON;
    }
  }, []);
  const [from, setFrom] = useState("UTC");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("09:00");
  const [targets, setTargets] = useState<string[]>(["America/New_York", "Europe/London", "Asia/Karachi", "Asia/Tokyo"]);
  const [adding, setAdding] = useState("");
  // The visitor's own zone and today's date are only known in the browser.
  useEffect(() => {
    const now = new Date();
    // eslint-disable-next-line react-hooks/set-state-in-effect -- client-only defaults
    setFrom(Intl.DateTimeFormat().resolvedOptions().timeZone || "UTC");
    setDate(`${now.getFullYear()}-${String(now.getMonth() + 1).padStart(2, "0")}-${String(now.getDate()).padStart(2, "0")}`);
  }, []);
  const at = date && time ? instant(date, time, from) : null;
  useTrackWhen(slug, !!at && time !== "09:00");
  const fmt = (z: string) => new Intl.DateTimeFormat("en-GB", { timeZone: z, weekday: "short", day: "numeric", month: "short", hour: "2-digit", minute: "2-digit", hourCycle: "h23" });

  return (
    <Panel>
      <div className="grid gap-4 sm:grid-cols-3">
        <div>
          <label htmlFor="tz-date" className="label">
            Date
          </label>
          <input id="tz-date" type="date" className="field num" value={date} onChange={(e) => setDate(e.target.value)} />
        </div>
        <div>
          <label htmlFor="tz-time" className="label">
            Time
          </label>
          <input id="tz-time" type="time" className="field num" value={time} onChange={(e) => setTime(e.target.value)} />
        </div>
        <div>
          <label htmlFor="tz-from" className="label">
            In time zone
          </label>
          <select id="tz-from" className="field" value={from} onChange={(e) => setFrom(e.target.value)}>
            {[...new Set([from, ...zones])].map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
      </div>
      <ul role="list" aria-live="polite" className="divide-y divide-border rounded-md bg-surface-2">
        {at &&
          targets.map((z) => {
            const parts = fmt(z).format(at);
            const h = hourIn(z, at);
            const night = h < 7 || h >= 22;
            return (
              <li key={z} className="flex min-h-16 items-center gap-3 px-4 py-2">
                <div className="min-w-0 flex-1">
                  <p className="font-semibold">{pretty(z)}</p>
                  <p className="num text-sm text-muted">{fmtOff(offset(z, at))}</p>
                </div>
                <p className={`num text-right text-[1.125rem] font-semibold ${night ? "text-muted" : ""}`}>
                  {parts}
                  {night && <span className="block text-xs font-normal">night time</span>}
                </p>
                <button type="button" className="btn-ghost h-10 w-10 px-0 text-muted" aria-label={`Remove ${pretty(z)}`} onClick={() => setTargets((t) => t.filter((x) => x !== z))}>
                  <Icon name="close" size={18} />
                </button>
              </li>
            );
          })}
      </ul>
      <div className="flex flex-wrap items-end gap-2">
        <div className="min-w-0 flex-1 sm:max-w-xs">
          <label htmlFor="tz-add" className="label">
            Add a city or time zone
          </label>
          <select id="tz-add" className="field" value={adding} onChange={(e) => setAdding(e.target.value)}>
            <option value="">Choose…</option>
            {zones.filter((z) => !targets.includes(z)).map((z) => (
              <option key={z} value={z}>
                {z.replace(/_/g, " ")}
              </option>
            ))}
          </select>
        </div>
        <button
          type="button"
          className="btn-secondary"
          disabled={!adding}
          onClick={() => {
            setTargets((t) => [...t, adding]);
            setAdding("");
          }}
        >
          Add
        </button>
      </div>
      <p className="note">Daylight saving time is applied automatically for the date you choose, using your browser&rsquo;s time zone database.</p>
    </Panel>
  );
}
