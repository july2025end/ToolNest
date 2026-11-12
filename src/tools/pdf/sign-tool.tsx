"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import type { PDFDocumentProxy } from "pdfjs-dist";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, safeName } from "../shared/files";
import { canvasBlob, openForEdit, openForRender, PDF_MAX, pageView, pdfBlob, renderPage } from "../shared/pdf";
import { Choice, ErrorText, Field, Panel, Section } from "../shared/ui";

type Sig = { url: string; ratio: number }; // ratio = height / width
/** Position on the visible page, as fractions of its width/height (top-left of the signature). */
type Placed = { id: number; page: number; x: number; y: number; w: number };

const INKS = [
  { value: "#111111", label: "Black" },
  { value: "#1b3fa0", label: "Blue" },
];
const FONTS = '"Snell Roundhand", "Segoe Script", "Brush Script MT", "URW Chancery L", cursive';

/** Crops a canvas to its non-transparent pixels and returns it as a PNG data URL. */
function trimmed(c: HTMLCanvasElement): Sig | null {
  const ctx = c.getContext("2d")!;
  const { data, width, height } = ctx.getImageData(0, 0, c.width, c.height);
  let x0 = width, y0 = height, x1 = -1, y1 = -1;
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (data[(y * width + x) * 4 + 3] > 8) {
        if (x < x0) x0 = x;
        if (x > x1) x1 = x;
        if (y < y0) y0 = y;
        if (y > y1) y1 = y;
      }
  if (x1 < 0) return null;
  const pad = 6;
  x0 = Math.max(0, x0 - pad);
  y0 = Math.max(0, y0 - pad);
  const w = Math.min(width, x1 + pad) - x0;
  const h = Math.min(height, y1 + pad) - y0;
  const out = document.createElement("canvas");
  out.width = w;
  out.height = h;
  out.getContext("2d")!.drawImage(c, x0, y0, w, h, 0, 0, w, h);
  return { url: out.toDataURL("image/png"), ratio: h / w };
}

function DrawPad({ ink, onChange }: { ink: string; onChange: (s: Sig | null) => void }) {
  const ref = useRef<HTMLCanvasElement>(null);
  const last = useRef<{ x: number; y: number } | null>(null);
  useEffect(() => {
    const c = ref.current!;
    const r = c.getBoundingClientRect();
    c.width = Math.round(r.width * 2);
    c.height = Math.round(r.height * 2);
  }, []);
  const pt = (e: RPointerEvent) => {
    const r = ref.current!.getBoundingClientRect();
    return { x: ((e.clientX - r.left) / r.width) * ref.current!.width, y: ((e.clientY - r.top) / r.height) * ref.current!.height };
  };
  const line = (a: { x: number; y: number }, b: { x: number; y: number }) => {
    const ctx = ref.current!.getContext("2d")!;
    ctx.strokeStyle = ink;
    ctx.lineWidth = 5;
    ctx.lineCap = "round";
    ctx.lineJoin = "round";
    ctx.beginPath();
    ctx.moveTo(a.x, a.y);
    ctx.lineTo(b.x, b.y);
    ctx.stroke();
  };
  const clear = () => {
    const c = ref.current!;
    c.getContext("2d")!.clearRect(0, 0, c.width, c.height);
    onChange(null);
  };
  return (
    <div className="space-y-2">
      <canvas
        ref={ref}
        aria-label="Signature pad. Draw your signature with a finger, pen or mouse."
        className="block h-44 w-full touch-none rounded-md border border-dashed border-border-strong bg-white sm:h-52"
        onPointerDown={(e) => {
          e.currentTarget.setPointerCapture(e.pointerId);
          last.current = pt(e);
          line(last.current, { x: last.current.x + 0.1, y: last.current.y });
        }}
        onPointerMove={(e) => {
          if (!last.current) return;
          const p = pt(e);
          line(last.current, p);
          last.current = p;
        }}
        onPointerUp={() => {
          last.current = null;
          onChange(trimmed(ref.current!));
        }}
        onPointerCancel={() => (last.current = null)}
      />
      <button type="button" className="btn-secondary" onClick={clear}>
        Clear
      </button>
    </div>
  );
}

export default function SignTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [doc, setDoc] = useState<PDFDocumentProxy | null>(null);
  const [pageNo, setPageNo] = useState(1);
  const [preview, setPreview] = useState("");
  const [mode, setMode] = useState<"draw" | "type">("draw");
  const [ink, setInk] = useState(INKS[0].value);
  const [name, setName] = useState("");
  const [drawn, setDrawn] = useState<Sig | null>(null);
  const [typed, setTyped] = useState<Sig | null>(null);
  const [placed, setPlaced] = useState<Placed[]>([]);
  const [sel, setSel] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const pageEl = useRef<HTMLDivElement>(null);
  const drag = useRef<{ id: number; sx: number; sy: number; x: number; y: number } | null>(null);
  const nextId = useRef(1);
  const sig = mode === "draw" ? drawn : typed;

  // Typed signature: render the name in a script font to a transparent canvas.
  useEffect(() => {
    if (!name.trim()) {
      // eslint-disable-next-line react-hooks/set-state-in-effect -- derived from the input, needs a canvas
      setTyped(null);
      return;
    }
    const c = document.createElement("canvas");
    c.width = 1200;
    c.height = 300;
    const ctx = c.getContext("2d")!;
    ctx.font = `120px ${FONTS}`;
    ctx.fillStyle = ink;
    ctx.textBaseline = "middle";
    ctx.fillText(name.trim().slice(0, 40), 20, 150, 1160);
    setTyped(trimmed(c));
  }, [name, ink]);

  // Render the current page for placing signatures.
  useEffect(() => {
    if (!doc) return;
    let alive = true;
    let url = "";
    (async () => {
      const c = await renderPage(doc, pageNo, 1.5);
      url = URL.createObjectURL(await canvasBlob(c, "image/jpeg", 0.85));
      if (alive) setPreview(url);
      else URL.revokeObjectURL(url);
    })().catch(() => alive && setError("This page couldn't be shown."));
    return () => {
      alive = false;
      if (url) URL.revokeObjectURL(url);
    };
  }, [doc, pageNo]);

  const load = async (f: File) => {
    setError("");
    try {
      const d = await openForRender(await f.arrayBuffer());
      void doc?.loadingTask.destroy();
      setFile(f);
      setDoc(d);
      setPageNo(1);
      setPlaced([]);
    } catch (e) {
      setError(e instanceof Error ? e.message : "This file couldn't be read as a PDF.");
    }
  };

  const add = () => {
    if (!sig) return;
    const id = nextId.current++;
    setPlaced((p) => [...p, { id, page: pageNo, x: 0.55, y: 0.78, w: 0.3 }]);
    setSel(id);
  };
  const patch = (id: number, v: Partial<Placed>) => setPlaced((p) => p.map((s) => (s.id === id ? { ...s, ...v } : s)));

  const onMove = (e: RPointerEvent) => {
    const d = drag.current;
    if (!d || !pageEl.current) return;
    const r = pageEl.current.getBoundingClientRect();
    patch(d.id, { x: Math.min(0.98, Math.max(-0.02, d.x + (e.clientX - d.sx) / r.width)), y: Math.min(0.98, Math.max(-0.02, d.y + (e.clientY - d.sy) / r.height)) });
  };

  const save = async () => {
    if (!file || !sig || !placed.length) return;
    setBusy(true);
    setError("");
    try {
      const pdf = await openForEdit(await file.arrayBuffer());
      const { degrees } = await import("pdf-lib");
      const img = await pdf.embedPng(sig.url);
      for (const s of placed) {
        const page = pdf.getPage(s.page - 1);
        const view = pageView(page);
        const w = s.w * view.width;
        const h = w * sig.ratio;
        const u = s.x * view.width;
        const v = view.height - s.y * view.height - h;
        page.drawImage(img, { ...view.at(u, v), width: w, height: h, rotate: degrees(view.rotation) });
      }
      downloadBlob(pdfBlob(await pdf.save()), safeName(file.name.replace(/\.pdf$/i, "") + "-signed", "pdf"));
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Signing failed.");
    } finally {
      setBusy(false);
    }
  };

  const pages = doc?.numPages ?? 0;
  const here = placed.filter((s) => s.page === pageNo);
  const selected = placed.find((s) => s.id === sel);

  return (
    <Panel>
      <Section title="1. Add your PDF">
        <Dropzone
          accept="application/pdf,.pdf"
          exts={["pdf"]}
          maxBytes={PDF_MAX}
          label={doc ? "Choose another PDF" : "Choose PDF file"}
          hint="One PDF, up to 100 MB. You can also drop it here."
          onFiles={(f) => f[0] && load(f[0])}
          compact={!!doc}
        />
        <ErrorText>{error}</ErrorText>
      </Section>

      {doc && (
        <>
          <Section title="2. Create your signature">
            <div className="flex flex-wrap gap-x-6 gap-y-3">
              <Choice name="sigmode" label="Method" value={mode} onChange={setMode} options={[{ value: "draw", label: "Draw" }, { value: "type", label: "Type" }]} />
              <Choice name="ink" label="Ink" value={ink} onChange={setInk} options={INKS} />
            </div>
            {mode === "draw" ? (
              <DrawPad key={ink} ink={ink} onChange={setDrawn} />
            ) : (
              <div className="space-y-3">
                <Field label="Your name" htmlFor="sig-name">
                  <input id="sig-name" className="field max-w-md" value={name} maxLength={40} autoComplete="name" onChange={(e) => setName(e.target.value)} placeholder="e.g. Sara Khan" />
                </Field>
                {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
                {typed && <img src={typed.url} alt={`Typed signature: ${name}`} className="h-20 max-w-full rounded-md bg-white p-2" />}
              </div>
            )}
          </Section>

          <Section title="3. Place it on the page">
            <div className="flex flex-wrap items-center gap-2">
              <button type="button" className="btn-primary" onClick={add} disabled={!sig}>
                <Icon name="sign" />
                Add signature to page {pageNo}
              </button>
              {!sig && <span className="text-sm text-muted">{mode === "draw" ? "Draw your signature above first." : "Type your name above first."}</span>}
            </div>

            <div className="rounded-md bg-surface-2 p-2 sm:p-4">
              <div ref={pageEl} className="relative mx-auto w-full max-w-[640px] touch-none select-none bg-white shadow-(--shadow-card)" onPointerMove={onMove} onPointerUp={() => (drag.current = null)} onPointerCancel={() => (drag.current = null)}>
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
                {preview ? <img src={preview} alt={`Page ${pageNo} of ${pages}`} className="block w-full" draggable={false} /> : <div className="aspect-[1/1.414]" />}
                {sig &&
                  here.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      aria-label={`Signature on page ${s.page}. Drag to move, arrow keys to nudge.`}
                      aria-pressed={sel === s.id}
                      className={`absolute cursor-move rounded-sm p-0 ${sel === s.id ? "outline-2 outline-offset-2 outline-accent" : "outline-1 outline-dashed outline-border-strong"}`}
                      style={{ left: `${s.x * 100}%`, top: `${s.y * 100}%`, width: `${s.w * 100}%` }}
                      onPointerDown={(e) => {
                        e.preventDefault();
                        setSel(s.id);
                        drag.current = { id: s.id, sx: e.clientX, sy: e.clientY, x: s.x, y: s.y };
                      }}
                      onKeyDown={(e) => {
                        const k = { ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] }[e.key];
                        if (!k) return;
                        e.preventDefault();
                        patch(s.id, { x: s.x + k[0] * 0.01, y: s.y + k[1] * 0.01 });
                      }}
                    >
                      {/* eslint-disable-next-line @next/next/no-img-element -- local data URL */}
                      <img src={sig.url} alt="" className="pointer-events-none block w-full" draggable={false} />
                    </button>
                  ))}
              </div>
            </div>

            {pages > 1 && (
              <nav aria-label="Pages" className="flex items-center justify-center gap-3">
                <button type="button" className="btn-secondary" disabled={pageNo <= 1} onClick={() => setPageNo((n) => n - 1)}>
                  Previous
                </button>
                <span className="num text-sm text-muted">
                  Page {pageNo} of {pages}
                </span>
                <button type="button" className="btn-secondary" disabled={pageNo >= pages} onClick={() => setPageNo((n) => n + 1)}>
                  Next
                </button>
              </nav>
            )}

            {selected && (
              <div className="flex flex-wrap items-end gap-4">
                <Field label={`Size: ${Math.round(selected.w * 100)}% of page width`} htmlFor="sig-size">
                  <input id="sig-size" type="range" min={8} max={70} value={Math.round(selected.w * 100)} onChange={(e) => patch(selected.id, { w: +e.target.value / 100 })} className="w-56 max-w-full" />
                </Field>
                <button
                  type="button"
                  className="btn-ghost text-danger"
                  onClick={() => {
                    setPlaced((p) => p.filter((s) => s.id !== selected.id));
                    setSel(null);
                  }}
                >
                  <Icon name="trash" />
                  Remove
                </button>
              </div>
            )}
          </Section>

          <Section title="4. Download">
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={save} disabled={busy || !sig || !placed.length}>
              <Icon name="download" />
              {busy ? "Signing…" : `Download signed PDF${placed.length > 1 ? ` (${placed.length} signatures)` : ""}`}
            </button>
            <p className="note">Your PDF and signature stay on this device. Nothing is uploaded.</p>
          </Section>
        </>
      )}
    </Panel>
  );
}
