// Pure logic for the age, BMI and text tools. Checked by logic.test.ts (`node --test src/tools/text/logic.test.ts`).

const daysIn = (y: number, m: number) => new Date(Date.UTC(y, m + 1, 0)).getUTCDate();
const utc = (d: Date) => Date.UTC(d.getFullYear(), d.getMonth(), d.getDate());

/** Calendar difference from `from` to `to` (to >= from), counted the way people say ages. */
export function ageParts(from: Date, to: Date) {
  let months = (to.getFullYear() - from.getFullYear()) * 12 + to.getMonth() - from.getMonth();
  if (to.getDate() < from.getDate()) months -= 1;
  // Add whole months to the start date (clamped to month end), then count the days left.
  const ay = from.getFullYear() + Math.floor((from.getMonth() + months) / 12);
  const am = (((from.getMonth() + months) % 12) + 12) % 12;
  const anchor = new Date(ay, am, Math.min(from.getDate(), daysIn(ay, am)));
  const d = Math.round((utc(to) - utc(anchor)) / 864e5);
  const y = Math.floor(months / 12);
  const m = months % 12;
  const totalDays = Math.round((utc(to) - utc(from)) / 864e5);
  // Next birthday; a 29 February birthday is celebrated on 28 February in non-leap years.
  const bday = (yr: number) => new Date(yr, from.getMonth(), Math.min(from.getDate(), daysIn(yr, from.getMonth())));
  let next = bday(to.getFullYear());
  if (utc(next) < utc(to)) next = bday(to.getFullYear() + 1);
  const toNext = Math.round((utc(next) - utc(to)) / 864e5);
  return { years: y, months: m, days: d, totalDays, weeks: Math.floor(totalDays / 7), totalMonths: y * 12 + m, toNext };
}

export type BmiBand = { label: string; tone: "warn" | "ok" };

/** BMI from kg and cm, with the WHO adult category. */
export function bmi(kg: number, cm: number) {
  const m = cm / 100;
  const value = kg / (m * m);
  const band: BmiBand =
    value < 18.5 ? { label: "Underweight", tone: "warn" } : value < 25 ? { label: "Healthy weight", tone: "ok" } : value < 30 ? { label: "Overweight", tone: "warn" } : { label: "Obesity", tone: "warn" };
  // Healthy range for this height (BMI 18.5–24.9).
  return { value, band, healthy: [18.5 * m * m, 24.9 * m * m] as const };
}

export function countText(s: string) {
  const trimmed = s.trim();
  const words = trimmed ? trimmed.split(/\s+/u).filter((w) => /[\p{L}\p{N}]/u.test(w)).length : 0;
  const sentences = trimmed ? (trimmed.match(/[^.!?。！？]+[.!?。！？]+|[^.!?。！？]+$/gu) ?? []).filter((x) => /[\p{L}\p{N}]/u.test(x)).length : 0;
  const paragraphs = trimmed ? trimmed.split(/\n\s*\n/).filter((p) => p.trim()).length : 0;
  return {
    words,
    chars: [...s].length,
    charsNoSpaces: [...s.replace(/\s/g, "")].length,
    sentences,
    paragraphs,
    readMin: words / 238,
    speakMin: words / 150,
  };
}

export type CaseId = "upper" | "lower" | "title" | "sentence" | "capitalized" | "alternating" | "camel" | "snake" | "kebab";

const SMALL = new Set("a an and as at but by for in nor of on or per the to via vs".split(" "));
const words = (s: string) => s.match(/[\p{L}\p{N}]+/gu) ?? [];

export function toCase(s: string, c: CaseId): string {
  switch (c) {
    case "upper":
      return s.toUpperCase();
    case "lower":
      return s.toLowerCase();
    case "capitalized":
      return s.toLowerCase().replace(/(^|[^\p{L}\p{N}'’])(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
    case "title": {
      let i = 0;
      return s.toLowerCase().replace(/[\p{L}\p{N}'’]+/gu, (w) => (i++ > 0 && SMALL.has(w) ? w : w[0].toUpperCase() + w.slice(1)));
    }
    case "sentence":
      return s.toLowerCase().replace(/(^\s*|[.!?]\s+|\n\s*)(\p{L})/gu, (_, a, b) => a + b.toUpperCase());
    case "alternating": {
      let i = 0;
      return [...s].map((ch) => (/\p{L}/u.test(ch) ? (i++ % 2 ? ch.toUpperCase() : ch.toLowerCase()) : ch)).join("");
    }
    case "camel":
      return words(s)
        .map((w, i) => (i ? w[0].toUpperCase() + w.slice(1).toLowerCase() : w.toLowerCase()))
        .join("");
    case "snake":
      return words(s).join("_").toLowerCase();
    case "kebab":
      return words(s).join("-").toLowerCase();
  }
}

export const SETS = {
  lower: "abcdefghijkmnopqrstuvwxyz",
  upper: "ABCDEFGHJKLMNPQRSTUVWXYZ",
  digits: "23456789",
  symbols: "!@#$%^&*-_=+?",
  // Look-alike characters, left out by default.
  similar: { lower: "l", upper: "IO", digits: "01" },
} as const;

/** Unbiased random index below n, using the platform CSPRNG. */
function rand(n: number) {
  const max = Math.floor(0x100000000 / n) * n;
  const buf = new Uint32Array(1);
  do crypto.getRandomValues(buf);
  while (buf[0] >= max);
  return buf[0] % n;
}

export function makePassword(len: number, o: { lower: boolean; upper: boolean; digits: boolean; symbols: boolean; similar: boolean }) {
  const groups = (["lower", "upper", "digits", "symbols"] as const)
    .filter((k) => o[k])
    .map((k) => SETS[k] + (o.similar && k !== "symbols" ? SETS.similar[k] : ""));
  if (!groups.length) return "";
  const all = groups.join("");
  // One from each chosen group so every requested kind appears, then shuffle.
  const chars = groups.map((g) => g[rand(g.length)]);
  while (chars.length < len) chars.push(all[rand(all.length)]);
  for (let i = chars.length - 1; i > 0; i--) {
    const j = rand(i + 1);
    [chars[i], chars[j]] = [chars[j], chars[i]];
  }
  return chars.slice(0, len).join("");
}

/** Entropy in bits for a random password from the chosen sets. */
export function entropyBits(len: number, poolSize: number) {
  return poolSize > 1 ? len * Math.log2(poolSize) : 0;
}
