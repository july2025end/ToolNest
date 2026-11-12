// Run: node --test src/tools/finance/units.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { convert, fmt, gpa, KINDS } from "./units.ts";

const k = (id: string) => KINDS.find((x) => x.id === id)!;

test("convert", () => {
  assert.equal(fmt(convert(k("length"), 1, "in", "cm")), "2.54");
  assert.equal(fmt(convert(k("length"), 1, "mi", "km")), "1.60934");
  assert.equal(fmt(convert(k("weight"), 1, "kg", "lb")), "2.20462");
  assert.equal(convert(k("temp"), 100, "c", "f"), 212);
  assert.equal(fmt(convert(k("temp"), 32, "f", "k")), "273.15");
  assert.equal(fmt(convert(k("area"), 1, "kanal", "marla")), "20");
  assert.equal(fmt(convert(k("data"), 1, "gib", "mb")), "1,073.74");
  for (const kind of KINDS) for (const a of kind.units) assert.ok(Math.abs(convert(kind, 5, a.id, a.id) - 5) < 1e-9, `${kind.id} ${a.id} round trip`);
});

test("gpa", () => {
  const r = gpa([
    { grade: "A", credits: 3 },
    { grade: "B+", credits: 4 },
    { grade: "C", credits: 2 },
  ]);
  assert.equal(r.gpa.toFixed(2), "3.24"); // (4×3 + 3.3×4 + 2×2) / 9
  assert.equal(r.credits, 9);
  assert.ok(Number.isNaN(gpa([]).gpa));
});
