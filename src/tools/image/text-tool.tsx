"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, MB, safeName } from "../shared/files";
import { canvasBlob } from "../shared/pdf";
import { Choice, ErrorText, Field, Panel, Section } from "../shared/ui";
import { IMAGE_ACCEPT, IMAGE_EXTS } from "./crop-tool";
import { decode } from "./process";

const FONTS = {
  impact: { label: "Bold meme", css: 'Impact, Haettenschweiler, "Arial Narrow Bold", "Arial Black", sans-serif', weight: "900" },
  sans: { label: "Clean", css: '-apple-system, "Segoe UI", Roboto, Helvetica, Arial, sans-serif', weight: "700" },
  serif: { label: "Classic", css: 'Georgia, "Times New Roman", serif', weight: "700" },
};
type FontId = keyof typeof FONTS;

/** Splits text into lines that fit maxW at the current font. */
function wrap(ctx: CanvasRenderingContext2D, text: string, maxW: number) {
  const lines: string[] = [];
  for (const para of text.split("\n")) {
    let line = "";
    for (const word of para.split(/\s+/)) {
      const t = line ? `${line} ${word}` : word;
      if (ctx.measureText(t).width > maxW && line) {
        lines.push(line);
        line = word;
      } else line = t;
    }
    lines.push(line);
  }
  return lines;
}

type Opts = { top: string; bottom: string; size: number; color: string; outline: boolean; caps: boolean; font: FontId };

function draw(c: HTMLCanvasElement, img: ImageBitmap, o: Opts) {
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const px = Math.round((Math.min(img.width, img.height) * o.size) / 100);
  const f = FONTS[o.font];
  ctx.font = `${f.weight} ${px}px ${f.css}`;
  ctx.textAlign = "center";
  ctx.lineJoin = "round";
  ctx.lineWidth = Math.max(2, px / 8);
  ctx.strokeStyle = o.color === "#ffffff" ? "#000000" : "#ffffff";
  ctx.fillStyle = o.color;
  const pad = px * 0.4;
  const block = (text: string, fromTop: boolean) => {
    if (!text.trim()) return;
    const lines = wrap(ctx, o.caps ? text.toUpperCase() : text, img.width - pad * 2);
    const lh = px * 1.1;
    lines.forEach((l, i) => {
      const y = fromTop ? pad + px * 0.9 + i * lh : img.height - pad - (lines.length - 1 - i) * lh - px * 0.15;
      if (o.outline) ctx.strokeText(l, img.width / 2, y);
      ctx.fillText(l, img.width / 2, y);
    });
  };
  block(o.top, true);
  block(o.bottom, false);
}

export default function TextTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<ImageBitmap | null>(null);
  const [o, setO] = useState<Opts>({ top: "", bottom: "", size: 10, color: "#ffffff", outline: true, caps: true, font: "impact" });
  const [error, setError] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);
  const set = <K extends keyof Opts>(k: K, v: Opts[K]) => setO((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    if (img && canvas.current) draw(canvas.current, img, o);
  }, [img, o]);

  const load = async (f: File) => {
    setError("");
    try {
      const b = await decode(f);
      img?.close();
      setFile(f);
      setImg(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const save = async () => {
    if (!canvas.current || !file) return;
    downloadBlob(await canvasBlob(canvas.current, "image/jpeg", 0.92), safeName(file.name.replace(/\.[^.]+$/, "") + "-text", "jpg"));
    trackToolUse(slug);
  };

  return (
    <Panel>
      <Section title="1. Add an image">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={img ? "Choose another image" : "Choose an image"} hint="JPG, PNG, WebP or HEIC, up to 25 MB." onFiles={(f) => f[0] && load(f[0])} compact={!!img} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {img && (
        <>
          <Section title="2. Write your text">
            <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_300px]">
              <div className="order-2 flex justify-center rounded-md bg-surface-2 p-2 lg:order-1">
                <canvas ref={canvas} className="block h-auto max-h-[65vh] w-auto max-w-full" aria-label="Preview of your image with text" />
              </div>
              <div className="order-1 space-y-4 lg:order-2">
                <Field label="Top text" htmlFor="t-top">
                  <textarea id="t-top" rows={2} className="field py-2" value={o.top} onChange={(e) => set("top", e.target.value)} placeholder="Top line" />
                </Field>
                <Field label="Bottom text" htmlFor="t-bottom">
                  <textarea id="t-bottom" rows={2} className="field py-2" value={o.bottom} onChange={(e) => set("bottom", e.target.value)} placeholder="Bottom line" />
                </Field>
                <Field label={`Text size: ${o.size}%`} htmlFor="t-size">
                  <input id="t-size" type="range" min={4} max={20} value={o.size} onChange={(e) => set("size", +e.target.value)} className="w-full" />
                </Field>
                <Choice name="font" label="Style" value={o.font} onChange={(v) => set("font", v)} options={(Object.keys(FONTS) as FontId[]).map((k) => ({ value: k, label: FONTS[k].label }))} />
                <div className="flex flex-wrap items-center gap-4">
                  <label className="flex min-h-11 items-center gap-2 text-sm">
                    Colour
                    <input type="color" value={o.color} onChange={(e) => set("color", e.target.value)} className="h-9 w-12 cursor-pointer rounded-sm border border-border-strong bg-surface" />
                  </label>
                  <label className="flex min-h-11 items-center gap-2 text-sm">
                    <input type="checkbox" checked={o.outline} onChange={(e) => set("outline", e.target.checked)} />
                    Outline
                  </label>
                  <label className="flex min-h-11 items-center gap-2 text-sm">
                    <input type="checkbox" checked={o.caps} onChange={(e) => set("caps", e.target.checked)} />
                    ALL CAPS
                  </label>
                </div>
              </div>
            </div>
          </Section>
          <Section title="3. Download">
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={save} disabled={!o.top.trim() && !o.bottom.trim()}>
              <Icon name="download" />
              Download image
            </button>
          </Section>
        </>
      )}
    </Panel>
  );
}
