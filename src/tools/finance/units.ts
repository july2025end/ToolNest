// Unit conversion tables. Each unit is a factor to the base unit (temperature is special-cased). Checked by units.test.ts.

export type Unit = { id: string; label: string; f: number };
export type Kind = { id: string; label: string; units: Unit[]; from: string; to: string };

const u = (id: string, label: string, f: number): Unit => ({ id, label, f });

export const KINDS: Kind[] = [
  {
    id: "length", label: "Length", from: "cm", to: "in",
    units: [u("mm", "Millimetres (mm)", 0.001), u("cm", "Centimetres (cm)", 0.01), u("m", "Metres (m)", 1), u("km", "Kilometres (km)", 1000), u("in", "Inches (in)", 0.0254), u("ft", "Feet (ft)", 0.3048), u("yd", "Yards (yd)", 0.9144), u("mi", "Miles (mi)", 1609.344)],
  },
  {
    id: "weight", label: "Weight", from: "kg", to: "lb",
    units: [u("mg", "Milligrams (mg)", 1e-6), u("g", "Grams (g)", 0.001), u("kg", "Kilograms (kg)", 1), u("t", "Tonnes (t)", 1000), u("oz", "Ounces (oz)", 0.028349523125), u("lb", "Pounds (lb)", 0.45359237), u("st", "Stones (st)", 6.35029318)],
  },
  {
    id: "temp", label: "Temperature", from: "c", to: "f",
    units: [u("c", "Celsius (°C)", 0), u("f", "Fahrenheit (°F)", 0), u("k", "Kelvin (K)", 0)],
  },
  {
    id: "area", label: "Area", from: "m2", to: "ft2",
    units: [u("cm2", "Square centimetres", 1e-4), u("m2", "Square metres (m²)", 1), u("ha", "Hectares", 1e4), u("km2", "Square kilometres", 1e6), u("in2", "Square inches", 0.00064516), u("ft2", "Square feet (ft²)", 0.09290304), u("yd2", "Square yards", 0.83612736), u("ac", "Acres", 4046.8564224), u("marla", "Marla (Pakistan, 272.25 ft²)", 25.29285264), u("kanal", "Kanal (20 marla)", 505.8570528)],
  },
  {
    id: "volume", label: "Volume", from: "l", to: "gal",
    units: [u("ml", "Millilitres (ml)", 0.001), u("l", "Litres (l)", 1), u("m3", "Cubic metres (m³)", 1000), u("tsp", "Teaspoons (US)", 0.00492892159375), u("tbsp", "Tablespoons (US)", 0.01478676478125), u("cup", "Cups (US)", 0.2365882365), u("floz", "Fluid ounces (US)", 0.0295735295625), u("gal", "Gallons (US)", 3.785411784), u("ukgal", "Gallons (UK)", 4.54609)],
  },
  {
    id: "speed", label: "Speed", from: "kmh", to: "mph",
    units: [u("ms", "Metres per second", 1), u("kmh", "Kilometres per hour", 1 / 3.6), u("mph", "Miles per hour", 0.44704), u("kn", "Knots", 0.514444444)],
  },
  {
    id: "data", label: "Data", from: "mb", to: "gb",
    units: [u("b", "Bytes", 1), u("kb", "Kilobytes (KB, 1000)", 1e3), u("mb", "Megabytes (MB, 1000)", 1e6), u("gb", "Gigabytes (GB, 1000)", 1e9), u("tb", "Terabytes (TB, 1000)", 1e12), u("kib", "Kibibytes (KiB, 1024)", 1024), u("mib", "Mebibytes (MiB)", 1024 ** 2), u("gib", "Gibibytes (GiB)", 1024 ** 3)],
  },
];

const toC = (v: number, from: string) => (from === "c" ? v : from === "f" ? ((v - 32) * 5) / 9 : v - 273.15);
const fromC = (c: number, to: string) => (to === "c" ? c : to === "f" ? (c * 9) / 5 + 32 : c + 273.15);

export function convert(kind: Kind, v: number, from: string, to: string) {
  if (kind.id === "temp") return fromC(toC(v, from), to);
  const a = kind.units.find((x) => x.id === from)!;
  const b = kind.units.find((x) => x.id === to)!;
  return (v * a.f) / b.f;
}

/** Up to 6 significant digits, without trailing zeros or exponent noise for everyday values. */
export const fmt = (n: number) => {
  if (!Number.isFinite(n)) return "–";
  if (n !== 0 && (Math.abs(n) >= 1e12 || Math.abs(n) < 1e-6)) return n.toExponential(4);
  return new Intl.NumberFormat("en-US", { maximumSignificantDigits: 6 }).format(n);
};

/** GPA on a 4.0 scale from letter grades and credits. */
export const GRADES: Record<string, number> = { "A+": 4, A: 4, "A-": 3.7, "B+": 3.3, B: 3, "B-": 2.7, "C+": 2.3, C: 2, "C-": 1.7, "D+": 1.3, D: 1, F: 0 };
export function gpa(rows: { grade: string; credits: number }[]) {
  const valid = rows.filter((r) => r.grade in GRADES && r.credits > 0);
  const credits = valid.reduce((a, r) => a + r.credits, 0);
  const points = valid.reduce((a, r) => a + GRADES[r.grade] * r.credits, 0);
  return { gpa: credits ? points / credits : NaN, credits };
}
