// Time zone math on top of Intl. Checked by tz.test.ts.

/** Minutes the zone is ahead of UTC at the given instant. */
export function offset(zone: string, at: Date) {
  const p = Object.fromEntries(new Intl.DateTimeFormat("en-US", { timeZone: zone, hourCycle: "h23", year: "numeric", month: "2-digit", day: "2-digit", hour: "2-digit", minute: "2-digit" }).formatToParts(at).map((x) => [x.type, x.value]));
  return (Date.UTC(+p.year, +p.month - 1, +p.day, +p.hour, +p.minute) - Math.floor(at.getTime() / 6e4) * 6e4) / 6e4;
}
/** The instant when the wall clock in `zone` shows date+time. */
export function instant(date: string, time: string, zone: string) {
  const [y, mo, d] = date.split("-").map(Number);
  const [h, mi] = time.split(":").map(Number);
  const guess = Date.UTC(y, mo - 1, d, h, mi);
  // Two passes handle daylight-saving edges.
  let t = guess - offset(zone, new Date(guess)) * 6e4;
  t = guess - offset(zone, new Date(t)) * 6e4;
  return new Date(t);
}
/** Hour of day (0–23) on the wall clock in `zone`. */
export const hourIn = (zone: string, at: Date) => +new Intl.DateTimeFormat("en-US", { timeZone: zone, hour: "numeric", hourCycle: "h23" }).format(at);
