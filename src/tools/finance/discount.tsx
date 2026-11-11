"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { Choice, Panel, Section } from "../shared/ui";
import { CurrencySelect, Disclaimer, num, NumberField, Stat, useCurrency, useTrackWhen } from "./shared";

export default function Discount({ slug }: ToolProps) {
  const { cur, set, money } = useCurrency();
  const [price, setPrice] = useState("1200");
  const [disc, setDisc] = useState("15");
  const [tax, setTax] = useState("18");
  const [taxMode, setTaxMode] = useState<"add" | "included">("add");

  const P = num(price);
  const D = disc === "" ? 0 : num(disc);
  const T = tax === "" ? 0 : num(tax);
  const valid = P > 0 && D >= 0 && D <= 100 && T >= 0 && T <= 100;
  useTrackWhen(slug, valid);

  const discountAmt = (P * D) / 100;
  const afterDiscount = P - discountAmt;
  // "add": tax is added on top. "included": the price already contains tax, so split it out.
  const net = taxMode === "add" ? afterDiscount : afterDiscount / (1 + T / 100);
  const taxAmt = taxMode === "add" ? (afterDiscount * T) / 100 : afterDiscount - net;
  const final = net + taxAmt;

  return (
    <Panel>
      <Section title="Price details" aside={<CurrencySelect value={cur} onChange={set} />}>
        <div className="grid gap-4 sm:grid-cols-3">
          <NumberField id="price" label="Original price" value={price} onChange={setPrice} min={0} />
          <NumberField id="disc" label="Discount" value={disc} onChange={setDisc} suffix="%" max={100} />
          <NumberField id="tax" label="Sales tax / GST / VAT" value={tax} onChange={setTax} suffix="%" max={100} />
        </div>
        <Choice name="taxmode" label="Tax" value={taxMode} onChange={setTaxMode} options={[{ value: "add", label: "Add tax to the price" }, { value: "included", label: "Price already includes tax" }]} />
      </Section>
      <Section title="Result">
        {valid ? (
          <dl className="grid gap-5 sm:grid-cols-2 lg:grid-cols-4" aria-live="polite">
            <Stat strong label="You pay" value={money(final)} />
            <Stat label="You save" value={money(discountAmt)} />
            <Stat label="Price before tax" value={money(net)} />
            <Stat label={`Tax (${T}%)`} value={money(taxAmt)} />
          </dl>
        ) : (
          <p className="text-sm text-muted">Enter a price, and a discount and tax rate from 0 to 100%.</p>
        )}
      </Section>
      <Disclaimer />
    </Panel>
  );
}
