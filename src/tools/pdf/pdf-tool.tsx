"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, safeName, zipBlobs } from "../shared/files";
import { canvasBlob, openForEdit, openForRender, parseRanges, PDF_MAX, pdfBlob, pageView, renderPage } from "../shared/pdf";
import { move, useDragSort } from "../shared/sortable";
import { Choice, ErrorText, Field, IntInput, Panel, Progress, Section } from "../shared/ui";

export type PdfMode = "split" | "extract" | "delete" | "organize" | "rotate" | "compress" | "page-numbers" | "watermark" | "to-images";

const THUMB_MODES: PdfMode[] = ["extract", "delete", "organize", "rotate"];
const MAX_THUMBS = 300;

type Result = { blob: Blob; name: string; note?: string };

const actionLabel: Record<PdfMode, string> = {
  split: "Split PDF",
  extract: "Extract selected pages",
  delete: "Delete selected pages",
  organize: "Save new order",
  rotate: "Save rotated PDF",
  compress: "Compress PDF",
  "page-numbers": "Add page numbers",
  watermark: "Add watermark",
  "to-images": "Convert to images",
};

export default function PdfTool({ slug, mode, preset }: ToolProps & { mode: string }) {
  const m = mode as PdfMode;
  const [file, setFile] = useState<File | null>(null);
  const [pageCount, setPageCount] = useState(0);
  const [thumbs, setThumbs] = useState<string[]>([]);
  const [selected, setSelected] = useState<Set<number>>(new Set());
  const [order, setOrder] = useState<number[]>([]);
  const [rot, setRot] = useState<number[]>([]);
  const [busy, setBusy] = useState<{ v: number | null; label: string } | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Result | null>(null);
  const [opt, setOpt] = useState({
    splitMode: "ranges" as "ranges" | "every" | "chunks",
    ranges: "1-2, 3",
    chunk: 2,
    level: "basic" as "basic" | "strong",
    strength: "medium" as "low" | "medium" | "high",
    position: "bottom-center",
    format: "n" as "n" | "page-n-of",
    start: 1,
    skipFirst: false,
    size: 11,
    wmText: "CONFIDENTIAL",
    wmSize: 60,
    wmOpacity: 0.2,
    wmAngle: 45,
    wmColor: "#888888",
    dpi: 150,
    quality: 0.85,
    imgType: ((preset as { imgType?: "image/png" } | undefined)?.imgType ?? "image/jpeg") as "image/jpeg" | "image/png",
  });
  const set = <K extends keyof typeof opt>(k: K, v: (typeof opt)[K]) => {
    setOpt((o) => ({ ...o, [k]: v }));
    setResult(null);
  };
  const renderDoc = useRef<PDFDocumentProxy | null>(null);
  const { itemProps } = useDragSort(order, (l) => {
    setOrder(l);
    setResult(null);
  });

  // Load the PDF: page count, and thumbnails for page-picking modes.
  useEffect(() => {
    if (!file) return;
    let cancelled = false;
    const urls: string[] = [];
    (async () => {
      setError("");
      setBusy({ v: null, label: "Reading PDF…" });
      try {
        const doc = await openForRender(await file.arrayBuffer());
        if (cancelled) return void doc.loadingTask.destroy();
        renderDoc.current = doc;
        const n = doc.numPages;
        setPageCount(n);
        setOrder(Array.from({ length: n }, (_, i) => i));
        setRot(Array(n).fill(0));
        setSelected(new Set());
        setBusy(null);
        if (!THUMB_MODES.includes(m)) return;
        for (let i = 0; i < Math.min(n, MAX_THUMBS); i++) {
          if (cancelled) return;
          const c = await renderPage(doc, i + 1, 0.3);
          const url = URL.createObjectURL(await canvasBlob(c, "image/jpeg", 0.7));
          urls.push(url);
          setThumbs((t) => {
            const next = t.slice();
            next[i] = url;
            return next;
          });
        }
      } catch (e) {
        if (!cancelled) {
          setError((e as Error).message);
          setFile(null);
        }
        setBusy(null);
      }
    })();
    return () => {
      cancelled = true;
      urls.forEach(URL.revokeObjectURL);
      setThumbs([]);
      void renderDoc.current?.loadingTask.destroy();
      renderDoc.current = null;
    };
  }, [file, m]);

  const toggle = (i: number) => {
    setSelected((s) => {
      const n = new Set(s);
      if (n.has(i)) n.delete(i);
      else n.add(i);
      return n;
    });
    setResult(null);
  };

  const base = file ? safeName(file.name) : "document";

  const run = async () => {
    if (!file) return;
    setError("");
    setResult(null);
    setBusy({ v: null, label: "Working…" });
    try {
      const bytes = await file.arrayBuffer();
      const lib = await import("pdf-lib");
      const { PDFDocument, degrees, rgb, StandardFonts } = lib;
      let res: Result;

      const subset = async (indexes: number[]) => {
        const src = await openForEdit(bytes);
        const out = await PDFDocument.create();
        (await out.copyPages(src, indexes)).forEach((p) => out.addPage(p));
        return pdfBlob(await out.save());
      };

      if (m === "split") {
        const groups =
          opt.splitMode === "ranges"
            ? parseRanges(opt.ranges, pageCount)
            : Array.from({ length: Math.ceil(pageCount / (opt.splitMode === "every" ? 1 : Math.max(1, opt.chunk))) }, (_, g) => {
                const size = opt.splitMode === "every" ? 1 : Math.max(1, opt.chunk);
                return Array.from({ length: Math.min(size, pageCount - g * size) }, (_, k) => g * size + k);
              });
        const files: { name: string; blob: Blob }[] = [];
        for (let g = 0; g < groups.length; g++) {
          setBusy({ v: g / groups.length, label: `Creating file ${g + 1} of ${groups.length}…` });
          const pages = groups[g];
          const label = pages.length === 1 ? `${pages[0] + 1}` : `${pages[0] + 1}-${pages[pages.length - 1] + 1}`;
          files.push({ name: `${base}-pages-${label}.pdf`, blob: await subset(pages) });
        }
        res = files.length === 1 ? files[0] : { name: `${base}-split.zip`, blob: await zipBlobs(files), note: `${files.length} PDFs in a ZIP file` };
      } else if (m === "extract" || m === "delete") {
        const sel = [...selected].sort((a, b) => a - b);
        if (!sel.length) throw new Error("Select at least one page first.");
        const keep = m === "extract" ? sel : order.filter((i) => !selected.has(i)).sort((a, b) => a - b);
        if (!keep.length) throw new Error("You can't delete every page. Leave at least one.");
        res = { name: `${base}-${m === "extract" ? "extracted" : "edited"}.pdf`, blob: await subset(keep) };
      } else if (m === "organize") {
        res = { name: `${base}-reordered.pdf`, blob: await subset(order) };
      } else if (m === "rotate") {
        const doc = await openForEdit(bytes);
        doc.getPages().forEach((p, i) => {
          if (rot[i]) p.setRotation(degrees((p.getRotation().angle + rot[i]) % 360));
        });
        res = { name: `${base}-rotated.pdf`, blob: pdfBlob(await doc.save()) };
      } else if (m === "compress") {
        let blob: Blob;
        if (opt.level === "basic") {
          const doc = await openForEdit(bytes);
          blob = pdfBlob(await doc.save({ useObjectStreams: true }));
        } else {
          const { scale, q } = { low: { scale: 1, q: 0.45 }, medium: { scale: 1.4, q: 0.6 }, high: { scale: 2, q: 0.72 } }[opt.strength];
          const src = renderDoc.current ?? (await openForRender(bytes));
          const out = await PDFDocument.create();
          for (let i = 1; i <= src.numPages; i++) {
            setBusy({ v: (i - 1) / src.numPages, label: `Compressing page ${i} of ${src.numPages}…` });
            const page = await src.getPage(i);
            const vp = page.getViewport({ scale: 1 });
            const jpg = await out.embedJpg(await (await canvasBlob(await renderPage(src, i, scale), "image/jpeg", q)).arrayBuffer());
            out.addPage([vp.width, vp.height]).drawImage(jpg, { x: 0, y: 0, width: vp.width, height: vp.height });
          }
          blob = pdfBlob(await out.save({ useObjectStreams: true }));
        }
        const saved = 1 - blob.size / file.size;
        res = {
          name: `${base}-compressed.pdf`,
          blob,
          note:
            saved > 0.01
              ? `${formatBytes(file.size)} → ${formatBytes(blob.size)} (−${Math.round(saved * 100)}%)`
              : `This PDF is already well optimised (${formatBytes(file.size)} → ${formatBytes(blob.size)}).${opt.level === "basic" ? " Try strong compression for a bigger reduction." : ""}`,
        };
      } else if (m === "page-numbers") {
        const doc = await openForEdit(bytes);
        const font = await doc.embedFont(StandardFonts.Helvetica);
        const pages = doc.getPages();
        const total = pages.length;
        pages.forEach((p, i) => {
          if (opt.skipFirst && i === 0) return;
          const n = opt.start + i - (opt.skipFirst ? 1 : 0);
          const text = opt.format === "n" ? `${n}` : `Page ${n} of ${total - (opt.skipFirst ? 1 : 0) + opt.start - 1}`;
          const view = pageView(p);
          const tw = font.widthOfTextAtSize(text, opt.size);
          const [v, h] = opt.position.split("-");
          const margin = 28;
          const x = h === "left" ? margin : h === "right" ? view.width - margin - tw : (view.width - tw) / 2;
          const y = v === "top" ? view.height - margin - opt.size : margin;
          p.drawText(text, { ...view.at(x, y), rotate: degrees(view.rotation), size: opt.size, font, color: rgb(0.2, 0.2, 0.2) });
        });
        res = { name: `${base}-numbered.pdf`, blob: pdfBlob(await doc.save()) };
      } else if (m === "watermark") {
        const text = opt.wmText.trim();
        if (!text) throw new Error("Enter the watermark text.");
        const doc = await openForEdit(bytes);
        const font = await doc.embedFont(StandardFonts.HelveticaBold);
        let tw: number;
        try {
          tw = font.widthOfTextAtSize(text, opt.wmSize);
        } catch {
          throw new Error("The watermark can only use Latin letters, numbers and common symbols.");
        }
        const hex = opt.wmColor.replace("#", "");
        const color = rgb(parseInt(hex.slice(0, 2), 16) / 255, parseInt(hex.slice(2, 4), 16) / 255, parseInt(hex.slice(4, 6), 16) / 255);
        const a = (opt.wmAngle * Math.PI) / 180;
        doc.getPages().forEach((p) => {
          const view = pageView(p);
          // Centre the rotated text on the page.
          const x = view.width / 2 - (Math.cos(a) * tw) / 2 + (Math.sin(a) * opt.wmSize) / 3;
          const y = view.height / 2 - (Math.sin(a) * tw) / 2 - (Math.cos(a) * opt.wmSize) / 3;
          p.drawText(text, { ...view.at(x, y), size: opt.wmSize, font, color, opacity: opt.wmOpacity, rotate: degrees((opt.wmAngle + view.rotation) % 360) });
        });
        res = { name: `${base}-watermarked.pdf`, blob: pdfBlob(await doc.save()) };
      } else {
        // to-images
        const src = renderDoc.current ?? (await openForRender(bytes));
        const ext = opt.imgType === "image/png" ? "png" : "jpg";
        const files: { name: string; blob: Blob }[] = [];
        for (let i = 1; i <= src.numPages; i++) {
          setBusy({ v: (i - 1) / src.numPages, label: `Rendering page ${i} of ${src.numPages}…` });
          const c = await renderPage(src, i, opt.dpi / 72);
          files.push({ name: `${base}-page-${String(i).padStart(3, "0")}.${ext}`, blob: await canvasBlob(c, opt.imgType, opt.quality) });
          c.width = c.height = 0;
        }
        res = files.length === 1 ? files[0] : { name: `${base}-images.zip`, blob: await zipBlobs(files), note: `${files.length} images in a ZIP file` };
      }
      setResult(res);
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Something went wrong.");
    } finally {
      setBusy(null);
    }
  };

  const reset = () => {
    setFile(null);
    setPageCount(0);
    setResult(null);
    setError("");
  };

  const thumbMode = THUMB_MODES.includes(m);

  return (
    <Panel>
      <Section title="1. Choose a PDF">
        {file ? (
          <div className="flex flex-wrap items-center gap-3 rounded-md border border-border p-3">
            <Icon name="file" className="text-accent" />
            <div className="min-w-0 flex-1">
              <p className="truncate font-medium" title={file.name}>
                {file.name}
              </p>
              <p className="num text-sm text-muted">
                {formatBytes(file.size)}
                {pageCount > 0 && ` · ${pageCount} page${pageCount > 1 ? "s" : ""}`}
              </p>
            </div>
            <button type="button" className="btn-ghost" onClick={reset}>
              Choose another file
            </button>
          </div>
        ) : (
          <Dropzone accept="application/pdf,.pdf" exts={["pdf"]} maxBytes={PDF_MAX} label="Choose a PDF" hint="One PDF, up to 100 MB." onFiles={(f) => setFile(f[0])} />
        )}
      </Section>

      {file && pageCount > 0 && (
        <Section
          title={thumbMode ? (m === "organize" ? "2. Drag pages into order" : m === "rotate" ? "2. Choose pages to rotate" : `2. Select pages to ${m}`) : "2. Options"}
          aside={
            thumbMode && m !== "organize" ? (
              <div className="flex gap-1">
                <button type="button" className="btn-ghost text-sm" onClick={() => setSelected(new Set(order))}>
                  Select all
                </button>
                <button type="button" className="btn-ghost text-sm" onClick={() => setSelected(new Set())}>
                  Clear
                </button>
              </div>
            ) : undefined
          }
        >
          {thumbMode && (
            <>
              {m === "rotate" && (
                <div className="flex flex-wrap gap-2">
                  {[
                    { d: 270, label: "Rotate left" },
                    { d: 90, label: "Rotate right" },
                    { d: 180, label: "Rotate 180°" },
                  ].map((b) => (
                    <button
                      key={b.d}
                      type="button"
                      className="btn-secondary"
                      onClick={() => {
                        const targets = selected.size ? selected : new Set(order);
                        setRot((r) => r.map((v, i) => (targets.has(i) ? (v + b.d) % 360 : v)));
                        setResult(null);
                      }}
                    >
                      <Icon name="rotate" size={18} className={b.d === 270 ? "-scale-x-100" : ""} />
                      {b.label} {selected.size ? `(${selected.size})` : "(all)"}
                    </button>
                  ))}
                </div>
              )}
              <ol role="list" className="grid grid-cols-2 gap-3 min-[420px]:grid-cols-3 sm:grid-cols-4 md:grid-cols-5">
                {order.map((pi, pos) => {
                  const isSel = selected.has(pi);
                  const drag = m === "organize" ? itemProps(pos) : {};
                  return (
                    <li key={pi} {...drag} className="flex flex-col items-center gap-1 rounded-sm data-over:outline-2 data-over:outline-accent">
                      <Thumb
                        interactive={m !== "organize"}
                        onClick={() => toggle(pi)}
                        pressed={isSel}
                        label={`Page ${pi + 1}${rot[pi] ? `, rotated ${rot[pi]}°` : ""}`}
                        className={`relative flex aspect-[3/4] w-full items-center justify-center overflow-hidden rounded-sm border-2 bg-surface-2 ${
                          isSel ? (m === "delete" ? "border-danger" : "border-accent") : "border-border"
                        } ${m === "organize" ? "cursor-grab" : ""}`}
                      >
                        {thumbs[pi] ? (
                          // eslint-disable-next-line @next/next/no-img-element -- local blob thumbnail
                          <img src={thumbs[pi]} alt="" className="max-h-full max-w-full object-contain" style={{ transform: `rotate(${rot[pi]}deg)${rot[pi] % 180 ? " scale(0.75)" : ""}` }} />
                        ) : (
                          <span className="text-xs text-muted">{pi < MAX_THUMBS ? "…" : "No preview"}</span>
                        )}
                        {isSel && (
                          <span className={`absolute top-1 right-1 rounded-full p-0.5 ${m === "delete" ? "bg-danger" : "bg-accent"} text-accent-fg`}>
                            <Icon name={m === "delete" ? "close" : "check"} size={14} />
                          </span>
                        )}
                      </Thumb>
                      <div className="flex items-center gap-0.5">
                        {m === "organize" && (
                          <button type="button" className="btn-ghost min-h-11 w-11 px-0" disabled={pos === 0} onClick={() => { setOrder((o) => move(o, pos, pos - 1)); setResult(null); }} aria-label={`Move page ${pi + 1} earlier`}>
                            <Icon name="chevron" size={16} className="rotate-180" />
                          </button>
                        )}
                        <span className="num text-xs text-muted">{pi + 1}</span>
                        {m === "organize" && (
                          <button type="button" className="btn-ghost min-h-11 w-11 px-0" disabled={pos === order.length - 1} onClick={() => { setOrder((o) => move(o, pos, pos + 1)); setResult(null); }} aria-label={`Move page ${pi + 1} later`}>
                            <Icon name="chevron" size={16} />
                          </button>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ol>
              {m !== "organize" && <p className="num text-sm text-muted">{selected.size} of {pageCount} selected</p>}
            </>
          )}

          {m === "split" && (
            <div className="space-y-4">
              <Choice name="split" label="How to split" value={opt.splitMode} onChange={(v) => set("splitMode", v)} options={[{ value: "ranges", label: "By page ranges" }, { value: "every", label: "Every page" }, { value: "chunks", label: "Every N pages" }]} />
              {opt.splitMode === "ranges" && (
                <Field label="Page ranges" htmlFor="ranges" hint={`Each range becomes its own PDF. Example: 1-3, 4-${Math.max(4, pageCount)}`}>
                  <input id="ranges" inputMode="text" autoComplete="off" spellCheck={false} className="field num max-w-sm" value={opt.ranges} onChange={(e) => set("ranges", e.target.value)} />
                </Field>
              )}
              {opt.splitMode === "chunks" && (
                <Field label="Pages per file" htmlFor="chunk">
                  <IntInput id="chunk" min={1} max={Math.max(1, pageCount)} className="field num w-28" value={opt.chunk} onChange={(v) => set("chunk", v)} />
                </Field>
              )}
            </div>
          )}

          {m === "compress" && (
            <div className="space-y-4">
              <Choice name="level" label="Compression" value={opt.level} onChange={(v) => set("level", v)} options={[{ value: "basic", label: "Basic (keeps text)" }, { value: "strong", label: "Strong (smallest)" }]} />
              {opt.level === "strong" && (
                <>
                  <Choice name="strength" label="Image quality" value={opt.strength} onChange={(v) => set("strength", v)} options={[{ value: "low", label: "Low" }, { value: "medium", label: "Medium" }, { value: "high", label: "High" }]} />
                  <p className="note-warn">Strong mode turns each page into an image. Text will no longer be selectable or searchable, and links stop working.</p>
                </>
              )}
            </div>
          )}

          {m === "page-numbers" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Position" htmlFor="pos">
                <select id="pos" className="field" value={opt.position} onChange={(e) => set("position", e.target.value)}>
                  {["bottom-center", "bottom-right", "bottom-left", "top-center", "top-right", "top-left"].map((p) => (
                    <option key={p} value={p}>
                      {p.replace("-", " ").replace(/^\w/, (c) => c.toUpperCase())}
                    </option>
                  ))}
                </select>
              </Field>
              <Choice name="fmt" label="Format" value={opt.format} onChange={(v) => set("format", v)} options={[{ value: "n", label: "1, 2, 3" }, { value: "page-n-of", label: "Page 1 of N" }]} />
              <Field label="Start at" htmlFor="start">
                <IntInput id="start" min={0} max={99999} className="field num w-28" value={opt.start} onChange={(v) => set("start", v)} />
              </Field>
              <Field label="Font size" htmlFor="fs">
                <IntInput id="fs" min={6} max={48} className="field num w-28" value={opt.size} onChange={(v) => set("size", v)} />
              </Field>
              <label className="flex min-h-11 items-center gap-2 text-sm">
                <input type="checkbox" checked={opt.skipFirst} onChange={(e) => set("skipFirst", e.target.checked)} />
                Don&rsquo;t number the first page (cover)
              </label>
            </div>
          )}

          {m === "watermark" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Watermark text" htmlFor="wm">
                <input id="wm" className="field" maxLength={60} value={opt.wmText} onChange={(e) => set("wmText", e.target.value)} />
              </Field>
              <Field label="Colour" htmlFor="wmc">
                <input id="wmc" type="color" className="field w-20 p-1" value={opt.wmColor} onChange={(e) => set("wmColor", e.target.value)} />
              </Field>
              <Field label={`Size: ${opt.wmSize} pt`} htmlFor="wms">
                <input id="wms" type="range" min={16} max={140} value={opt.wmSize} onChange={(e) => set("wmSize", +e.target.value)} className="w-full" />
              </Field>
              <Field label={`Opacity: ${Math.round(opt.wmOpacity * 100)}%`} htmlFor="wmo">
                <input id="wmo" type="range" min={5} max={100} value={Math.round(opt.wmOpacity * 100)} onChange={(e) => set("wmOpacity", +e.target.value / 100)} className="w-full" />
              </Field>
              <Choice name="angle" label="Direction" value={opt.wmAngle} onChange={(v) => set("wmAngle", v)} options={[{ value: 45, label: "Diagonal" }, { value: 0, label: "Horizontal" }]} />
            </div>
          )}

          {m === "to-images" && (
            <div className="grid gap-4 sm:grid-cols-2">
              <Choice name="dpi" label="Resolution" value={opt.dpi} onChange={(v) => set("dpi", v)} options={[{ value: 72, label: "72 DPI (screen)" }, { value: 150, label: "150 DPI" }, { value: 300, label: "300 DPI (print)" }]} />
              <Choice name="itype" label="Format" value={opt.imgType} onChange={(v) => set("imgType", v)} options={[{ value: "image/jpeg", label: "JPG" }, { value: "image/png", label: "PNG" }]} />
              {opt.imgType === "image/jpeg" && (
                <Field label={`JPG quality: ${Math.round(opt.quality * 100)}%`} htmlFor="iq">
                  <input id="iq" type="range" min={30} max={100} value={Math.round(opt.quality * 100)} onChange={(e) => set("quality", +e.target.value / 100)} className="w-full" />
                </Field>
              )}
            </div>
          )}
        </Section>
      )}

      {file && pageCount > 0 && (
        <Section title="3. Download">
          {busy ? (
            <Progress value={busy.v} label={busy.label} />
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary" onClick={run}>
                {actionLabel[m]}
              </button>
              {result && (
                <button type="button" className="btn-secondary" onClick={() => downloadBlob(result.blob, result.name)}>
                  <Icon name="download" size={18} />
                  Download {result.name.endsWith(".zip") ? "ZIP" : result.name.split(".").pop()?.toUpperCase()} ({formatBytes(result.blob.size)})
                </button>
              )}
            </div>
          )}
          {result?.note && (
            <p className="num text-sm text-muted" aria-live="polite">
              {result.note}
            </p>
          )}
        </Section>
      )}
      {busy && !pageCount && <Progress value={null} label={busy.label} />}
      <p role="status" className="sr-only">
        {result ? `Done. ${result.name} is ready to download, ${formatBytes(result.blob.size)}.` : ""}
      </p>
      <ErrorText>{error}</ErrorText>
    </Panel>
  );
}

function Thumb({ interactive, onClick, pressed, label, className, children }: { interactive: boolean; onClick: () => void; pressed: boolean; label: string; className: string; children: ReactNode }) {
  return interactive ? (
    <button type="button" onClick={onClick} aria-pressed={pressed} aria-label={label} className={className}>
      {children}
    </button>
  ) : (
    <div role="img" aria-label={label} className={className}>
      {children}
    </div>
  );
}
