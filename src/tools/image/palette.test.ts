// Run: node --test src/tools/image/palette.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { hex, hsl, isLight, palette } from "./palette.ts";

test("hex and hsl", () => {
  assert.equal(hex([0, 113, 227]), "#0071e3");
  assert.equal(hsl([255, 0, 0]), "hsl(0, 100%, 50%)");
  assert.equal(isLight([255, 255, 255]), true);
  assert.equal(isLight([0, 0, 0]), false);
});

test("palette finds the two colours of a split image, biggest first", () => {
  const n = 1000;
  const d = new Uint8ClampedArray(n * 4);
  for (let i = 0; i < n; i++) {
    const red = i < 700;
    d.set(red ? [220, 20, 30, 255] : [10, 40, 200, 255], i * 4);
  }
  const p = palette(d, 6);
  assert.equal(p.length, 2);
  assert.equal(hex(p[0].rgb), "#dc141e");
  assert.equal(Math.round(p[0].share * 100), 70);
});

test("palette ignores transparent pixels", () => {
  assert.deepEqual(palette(new Uint8ClampedArray(40)), []);
});
