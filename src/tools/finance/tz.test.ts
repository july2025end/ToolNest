// Run: node --test src/tools/finance/tz.test.ts
import assert from "node:assert/strict";
import { test } from "node:test";
import { hourIn, instant, offset } from "./tz.ts";

test("offsets, including daylight saving", () => {
  assert.equal(offset("Asia/Karachi", new Date("2026-01-15T00:00:00Z")), 300);
  assert.equal(offset("Asia/Kolkata", new Date("2026-01-15T00:00:00Z")), 330);
  assert.equal(offset("America/New_York", new Date("2026-01-15T12:00:00Z")), -300);
  assert.equal(offset("America/New_York", new Date("2026-07-15T12:00:00Z")), -240);
});

test("instant converts wall-clock time in a zone", () => {
  assert.equal(instant("2026-07-15", "09:00", "Europe/London").toISOString(), "2026-07-15T08:00:00.000Z");
  assert.equal(instant("2026-01-15", "09:00", "Asia/Karachi").toISOString(), "2026-01-15T04:00:00.000Z");
  assert.equal(hourIn("Asia/Tokyo", new Date("2026-01-15T04:00:00Z")), 13);
});
