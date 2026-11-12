"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { downloadBlob } from "../shared/files";
import { Field, Panel, Section } from "../shared/ui";

const FORMATS = [
  { id: "CODE128", label: "Code 128", hint: "Any letters, numbers and symbols. The most flexible choice.", sample: "TOOLNEST-2026" },
  { id: "EAN13", label: "EAN-13", hint: "12 or 13 digits. Retail products outside North America.", sample: "5901234123457" },
  { id: "UPC", label: "UPC-A", hint: "11 or 12 digits. Retail products in the US and Canada.", sample: "036000291452" },
  { id: "EAN8", label: "EAN-8", hint: "7 or 8 digits. Small packages.", sample: "96385074" },
  { id: "CODE39", label: "Code 39", hint: "Capital letters, digits and - . $ / + % space.", sample: "ABC-123" },
  { id: "ITF14", label: "ITF-14", hint: "13 or 14 digits. Shipping cartons.", sample: "15400141288763" },
] as const;
type Fmt = (typeof FORMATS)[number]["id"];

export default function BarcodeTool({ slug }: ToolProps) {
  const [fmt, setFmt] = useState<Fmt>("CODE128");
  const [value, setValue] = useState<string>(FORMATS[0].sample);
  const [height, setHeight] = useState(90);
  const [width, setWidth] = useState(2);
  const [showText, setShowText] = useState(true);
  const [valid, setValid] = useState(true);
  const svg = useRef<SVGSVGElement>(null);
  const f = FORMATS.find((x) => x.id === fmt)!;
  useTrackWhen(slug, valid && value !== f.sample);

  useEffect(() => {
    let alive = true;
    import("jsbarcode").then(({ default: JsBarcode }) => {
      if (!alive || !svg.current) return;
      let ok = true;
      try {
        JsBarcode(svg.current, value || " ", { format: fmt, height, width, displayValue: showText, margin: 12, background: "#ffffff", lineColor: "#000000", font: "Helvetica, Arial, sans-serif", fontSize: 18, valid: (v: boolean) => (ok = v) });
      } catch {
        ok = false;
      }
      setValid(ok && !!value);
    });
    return () => {
      alive = false;
    };
  }, [fmt, value, height, width, showText]);

  const svgText = () => new XMLSerializer().serializeToString(svg.current!);
  const name = `barcode-${fmt.toLowerCase()}-${value.replace(/[^\w-]+/g, "_").slice(0, 40)}`;
  const savePng = () => {
    const el = svg.current!;
    const w = el.width.baseVal.value;
    const h = el.height.baseVal.value;
    const img = new Image();
    img.onload = () => {
      const k = 3; // 3× for crisp printing
      const c = document.createElement("canvas");
      c.width = w * k;
      c.height = h * k;
      const ctx = c.getContext("2d")!;
      ctx.imageSmoothingEnabled = false;
      ctx.drawImage(img, 0, 0, c.width, c.height);
      c.toBlob((b) => b && downloadBlob(b, `${name}.png`), "image/png");
    };
    img.src = "data:image/svg+xml;charset=utf-8," + encodeURIComponent(svgText());
  };

  return (
    <Panel>
      <Section title="1. Choose the type">
        <div className="flex flex-wrap gap-2" role="group" aria-label="Barcode type">
          {FORMATS.map((x) => (
            <button
              key={x.id}
              type="button"
              aria-pressed={fmt === x.id}
              className="chip"
              onClick={() => {
                setFmt(x.id);
                setValue(x.sample);
              }}
            >
              {x.label}
            </button>
          ))}
        </div>
        <p className="text-sm text-muted">{f.hint}</p>
      </Section>
      <Section title="2. Enter the content">
        <Field label="Barcode value" htmlFor="bc-value">
          <input id="bc-value" className={`field num max-w-md ${valid ? "" : "border-danger"}`} value={value} maxLength={80} onChange={(e) => setValue(e.target.value)} aria-invalid={!valid || undefined} aria-describedby="bc-err" autoComplete="off" />
        </Field>
        <p id="bc-err" className="text-sm text-danger" role="alert">
          {!valid && (value ? `This value doesn't fit ${f.label}. ${f.hint}` : "Enter a value.")}
        </p>
        <div className="grid gap-4 sm:grid-cols-3">
          <Field label={`Height: ${height}px`} htmlFor="bc-h">
            <input id="bc-h" type="range" min={30} max={200} value={height} onChange={(e) => setHeight(+e.target.value)} className="w-full" />
          </Field>
          <Field label={`Bar width: ${width}`} htmlFor="bc-w">
            <input id="bc-w" type="range" min={1} max={4} value={width} onChange={(e) => setWidth(+e.target.value)} className="w-full" />
          </Field>
          <label className="flex min-h-11 items-center gap-2 self-end text-sm">
            <input type="checkbox" checked={showText} onChange={(e) => setShowText(e.target.checked)} />
            Show text under the bars
          </label>
        </div>
      </Section>
      <Section title="3. Download">
        <div className={`overflow-x-auto rounded-md bg-white p-4 text-center ${valid ? "" : "opacity-30"}`}>
          <svg ref={svg} role="img" aria-label={`${f.label} barcode for ${value}`} className="mx-auto max-w-full" />
        </div>
        <div className="flex flex-wrap gap-2">
          <button type="button" className="btn-primary flex-1 sm:flex-none" disabled={!valid} onClick={savePng}>
            <Icon name="download" />
            PNG
          </button>
          <button type="button" className="btn-secondary flex-1 sm:flex-none" disabled={!valid} onClick={() => downloadBlob(new Blob([svgText()], { type: "image/svg+xml" }), `${name}.svg`)}>
            <Icon name="download" />
            SVG (for print)
          </button>
        </div>
        <p className="note">Free to use, including on products you sell. Real EAN and UPC numbers for retail are issued by GS1; this tool draws the barcode for a number you already have.</p>
      </Section>
    </Panel>
  );
}
