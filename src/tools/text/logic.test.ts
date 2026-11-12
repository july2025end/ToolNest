// Run: node --test src/tools/text/logic.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { ageParts, bmi, countText, makePassword, toCase } from "./logic.ts";

test("ageParts", () => {
  assert.deepEqual(ageParts(new Date(2000, 0, 15), new Date(2026, 10, 11)).years, 26);
  const a = ageParts(new Date(2000, 0, 31), new Date(2000, 2, 1)); // Jan 31 → Mar 1 (leap year)
  assert.equal(a.months, 1);
  assert.equal(a.days, 1);
  assert.equal(a.totalDays, 30);
  const b = ageParts(new Date(1990, 5, 10), new Date(2026, 5, 10));
  assert.deepEqual([b.years, b.months, b.days, b.toNext], [36, 0, 0, 0]);
  const leap = ageParts(new Date(2004, 1, 29), new Date(2027, 1, 1));
  assert.equal(leap.toNext, 27); // 28 Feb 2027
});

test("bmi", () => {
  const r = bmi(70, 175);
  assert.equal(r.value.toFixed(1), "22.9");
  assert.equal(r.band.label, "Healthy weight");
  assert.equal(bmi(50, 175).band.label, "Underweight");
});

test("countText", () => {
  const c = countText("Hello world. This is ToolNest!\n\nSecond para — here");
  assert.equal(c.words, 8);
  assert.equal(c.sentences, 3);
  assert.equal(c.paragraphs, 2);
  assert.equal(countText("   ").words, 0);
});

test("toCase", () => {
  assert.equal(toCase("the lord of the rings", "title"), "The Lord of the Rings");
  assert.equal(toCase("hello WORLD. bye now", "sentence"), "Hello world. Bye now");
  assert.equal(toCase("Make it work", "camel"), "makeItWork");
  assert.equal(toCase("Make it work", "snake"), "make_it_work");
  assert.equal(toCase("Make it work", "kebab"), "make-it-work");
});

test("makePassword", () => {
  const p = makePassword(20, { lower: true, upper: true, digits: true, symbols: true, similar: false });
  assert.equal(p.length, 20);
  assert.match(p, /[a-z]/);
  assert.match(p, /[A-Z]/);
  assert.match(p, /[0-9]/);
  assert.match(p, /[!@#$%^&*\-_=+?]/);
  assert.doesNotMatch(p, /[lIO01]/);
  assert.equal(makePassword(8, { lower: false, upper: false, digits: false, symbols: false, similar: false }), "");
});
