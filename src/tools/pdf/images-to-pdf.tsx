"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, MB } from "../shared/files";
import { canvasBlob, pdfBlob } from "../shared/pdf";
import { move, useDragSort } from "../shared/sortable";
import { Choice, ErrorText, Panel, Progress, Section } from "../shared/ui";
import { decode } from "../image/process";

type Item = { id: number; file: File; url: string };
let nextId = 1;

const SIZES = { a4: [595.28, 841.89], letter: [612, 792] } as const;
const MARGINS = { none: 0, small: 18, large: 40 } as const;

export default function ImagesToPdf({ slug }: ToolProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [size, setSize] = useState<"a4" | "letter" | "fit">("a4");
  const [margin, setMargin] = useState<keyof typeof MARGINS>("small");
  const [orient, setOrient] = useState<"auto" | "portrait" | "landscape">("auto");
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Blob | null>(null);
  const { itemProps } = useDragSort(items, (l) => {
    setItems(l);
    setResult(null);
  });
  const changed = <T,>(fn: (v: T) => void) => (v: T) => {
    fn(v);
    setResult(null);
  };

  const build = async () => {
    setError("");
    setBusy(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const doc = await PDFDocument.create();
      for (let i = 0; i < items.length; i++) {
        setBusy(i / items.length);
        const f = items[i].file;
        // Redraw through canvas: applies EXIF rotation, handles WebP/HEIC, drops metadata.
        const bmp = await decode(f);
        const c = document.createElement("canvas");
        c.width = bmp.width;
        c.height = bmp.height;
        const ctx = c.getContext("2d")!;
        const png = f.type === "image/png";
        if (!png) {
          ctx.fillStyle = "#fff";
          ctx.fillRect(0, 0, c.width, c.height);
        }
        ctx.drawImage(bmp, 0, 0);
        bmp.close();
        const bytes = await (await canvasBlob(c, png ? "image/png" : "image/jpeg", 0.92)).arrayBuffer();
        const img = png ? await doc.embedPng(bytes) : await doc.embedJpg(bytes);
        c.width = c.height = 0;

        const m = MARGINS[margin];
        let pw: number, ph: number;
        if (size === "fit") {
          pw = img.width * 0.75 + m * 2; // 96 dpi px → pt
          ph = img.height * 0.75 + m * 2;
        } else {
          [pw, ph] = SIZES[size];
          const landscape = orient === "landscape" || (orient === "auto" && img.width > img.height);
          if (landscape) [pw, ph] = [ph, pw];
        }
        const k = Math.min((pw - m * 2) / img.width, (ph - m * 2) / img.height);
        const w = img.width * k;
        const h = img.height * k;
        doc.addPage([pw, ph]).drawImage(img, { x: (pw - w) / 2, y: (ph - h) / 2, width: w, height: h });
      }
      setResult(pdfBlob(await doc.save()));
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Creating the PDF failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <Panel>
      <Section title="1. Add images">
        <Dropzone
          accept="image/jpeg,image/png,image/webp,image/heic,.heic,.heif"
          exts={["jpg", "jpeg", "png", "webp", "heic", "heif"]}
          multiple
          maxFiles={100 - items.length}
          maxBytes={25 * MB}
          label={items.length ? "Add more images" : "Choose images"}
          hint="JPG, PNG, WebP or HEIC. Up to 100 images, 25 MB each."
          compact={items.length > 0}
          onFiles={(f) => {
            setItems((l) => [...l, ...f.map((file) => ({ id: nextId++, file, url: URL.createObjectURL(file) }))]);
            setResult(null);
          }}
        />
      </Section>

      {items.length > 0 && (
        <>
          <Section title="2. Order and page settings" aside={<span className="text-sm text-muted">Drag, or use the arrows</span>}>
            <ol role="list" className="grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
              {items.map((it, i) => (
                <li key={it.id} {...itemProps(i)} className="flex flex-col items-center gap-1 rounded-sm data-over:outline-2 data-over:outline-accent">
                  <div className="flex aspect-[3/4] w-full cursor-grab items-center justify-center overflow-hidden rounded-sm border border-border bg-surface-2">
                    {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                    <img src={it.url} alt={it.file.name} className="max-h-full max-w-full object-contain" />
                  </div>
                  <div className="flex items-center">
                    <button type="button" className="btn-ghost min-h-11 w-11 px-0" disabled={i === 0} onClick={() => { setItems((l) => move(l, i, i - 1)); setResult(null); }} aria-label={`Move ${it.file.name} earlier`}>
                      <Icon name="chevron" size={16} className="rotate-180" />
                    </button>
                    <span className="num text-xs text-muted">{i + 1}</span>
                    <button type="button" className="btn-ghost min-h-11 w-11 px-0" disabled={i === items.length - 1} onClick={() => { setItems((l) => move(l, i, i + 1)); setResult(null); }} aria-label={`Move ${it.file.name} later`}>
                      <Icon name="chevron" size={16} />
                    </button>
                    <button
                      type="button"
                      className="btn-ghost min-h-11 w-11 px-0"
                      onClick={() => {
                        URL.revokeObjectURL(it.url);
                        setItems((l) => l.filter((x) => x.id !== it.id));
                        setResult(null);
                      }}
                      aria-label={`Remove ${it.file.name}`}
                    >
                      <Icon name="close" size={16} />
                    </button>
                  </div>
                </li>
              ))}
            </ol>
            <div className="grid gap-4 md:grid-cols-3">
              <Choice name="size" label="Page size" value={size} onChange={changed(setSize)} options={[{ value: "a4", label: "A4" }, { value: "letter", label: "Letter" }, { value: "fit", label: "Fit image" }]} />
              <Choice name="margin" label="Margin" value={margin} onChange={changed(setMargin)} options={[{ value: "none", label: "None" }, { value: "small", label: "Small" }, { value: "large", label: "Large" }]} />
              {size !== "fit" && (
                <Choice name="orient" label="Orientation" value={orient} onChange={changed(setOrient)} options={[{ value: "auto", label: "Auto" }, { value: "portrait", label: "Portrait" }, { value: "landscape", label: "Landscape" }]} />
              )}
            </div>
          </Section>

          <Section title="3. Create PDF">
            {busy !== null ? (
              <Progress value={busy} label="Building your PDF…" />
            ) : (
              <div className="flex flex-wrap gap-3">
                <button type="button" className="btn-primary" onClick={build}>
                  Create PDF from {items.length} image{items.length > 1 ? "s" : ""}
                </button>
                {result && (
                  <button type="button" className="btn-secondary" onClick={() => downloadBlob(result, "images.pdf")}>
                    <Icon name="download" size={18} />
                    Download PDF ({formatBytes(result.size)})
                  </button>
                )}
              </div>
            )}
            <ErrorText>{error}</ErrorText>
            <p role="status" className="sr-only">{result ? `Done. Your PDF is ready to download, ${formatBytes(result.size)}.` : ""}</p>
          </Section>
        </>
      )}
    </Panel>
  );
}
