"use client";

import { useEffect, useRef, useState, type PointerEvent as RPointerEvent } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { MB } from "../shared/files";
import { ErrorText, Panel, Section } from "../shared/ui";
import { IMAGE_ACCEPT, IMAGE_EXTS } from "./crop-tool";
import { hex, hsl, isLight, palette, type RGB } from "./palette";
import { decode } from "./process";

function Swatch({ rgb, big, note }: { rgb: RGB; big?: boolean; note?: string }) {
  const [copied, setCopied] = useState("");
  const values = [hex(rgb), `rgb(${rgb.join(", ")})`, hsl(rgb)];
  const copy = async (v: string) => {
    try {
      await navigator.clipboard.writeText(v);
      setCopied(v);
      setTimeout(() => setCopied(""), 1200);
    } catch {}
  };
  return (
    <div className="card overflow-hidden">
      <div className={`flex items-end p-3 ${big ? "h-28" : "h-16"} ${isLight(rgb) ? "text-black/70" : "text-white/85"}`} style={{ background: hex(rgb) }}>
        {note && <span className="num text-xs font-medium">{note}</span>}
      </div>
      <ul className="p-1.5">
        {(big ? values : values.slice(0, 1)).map((v) => (
          <li key={v}>
            <button type="button" onClick={() => copy(v)} className="num flex min-h-10 w-full items-center justify-between gap-2 rounded-sm px-2 text-left text-sm hover:bg-surface-2" aria-label={`Copy ${v}`}>
              <span className="truncate">{v}</span>
              <Icon name={copied === v ? "check" : "file"} size={16} className="shrink-0 text-muted" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function ColorTool({ slug }: ToolProps) {
  const [img, setImg] = useState<ImageBitmap | null>(null);
  const [picked, setPicked] = useState<RGB | null>(null);
  const [colors, setColors] = useState<{ rgb: RGB; share: number }[]>([]);
  const [error, setError] = useState("");
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const c = canvas.current;
    if (!img || !c) return;
    c.width = img.width;
    c.height = img.height;
    c.getContext("2d", { willReadFrequently: true })!.drawImage(img, 0, 0);
    // Palette from a small copy: fast and just as accurate for dominant colours.
    const k = Math.min(1, 120 / Math.max(img.width, img.height));
    const s = document.createElement("canvas");
    s.width = Math.max(1, Math.round(img.width * k));
    s.height = Math.max(1, Math.round(img.height * k));
    const sx = s.getContext("2d")!;
    sx.drawImage(img, 0, 0, s.width, s.height);
     
    setColors(palette(sx.getImageData(0, 0, s.width, s.height).data, 8));
  }, [img]);

  const load = async (f: File) => {
    setError("");
    try {
      const b = await decode(f);
      img?.close();
      setPicked(null);
      setImg(b);
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const pick = (e: RPointerEvent<HTMLCanvasElement>) => {
    const c = e.currentTarget;
    const r = c.getBoundingClientRect();
    const x = Math.floor(((e.clientX - r.left) / r.width) * c.width);
    const y = Math.floor(((e.clientY - r.top) / r.height) * c.height);
    // Average a 3×3 area so a single noisy pixel doesn't skew the result.
    const d = c.getContext("2d", { willReadFrequently: true })!.getImageData(Math.max(0, x - 1), Math.max(0, y - 1), 3, 3).data;
    const sum = [0, 0, 0];
    let n = 0;
    for (let i = 0; i < d.length; i += 4) {
      sum[0] += d[i];
      sum[1] += d[i + 1];
      sum[2] += d[i + 2];
      n++;
    }
    setPicked(sum.map((v) => Math.round(v / n)) as RGB);
  };

  return (
    <Panel>
      <Section title="1. Add an image">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={img ? "Choose another image" : "Choose an image"} hint="A photo, logo or screenshot. You can also paste it." onFiles={(f) => f[0] && load(f[0])} compact={!!img} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {img && (
        <>
          <Section title="2. Tap the image to pick a colour">
            <div className="grid gap-4 lg:grid-cols-[minmax(0,1fr)_220px]">
              <div className="flex justify-center rounded-md bg-surface-2 p-2">
                <canvas ref={canvas} onPointerDown={pick} onPointerMove={(e) => e.buttons === 1 && pick(e)} className="block h-auto max-h-[60vh] w-auto max-w-full cursor-crosshair touch-none" aria-label="Image. Tap or click anywhere to pick that colour." />
              </div>
              <div aria-live="polite">{picked ? <Swatch rgb={picked} big note="Picked colour" /> : <p className="text-sm text-muted">Tap or click anywhere on the image. Drag to explore.</p>}</div>
            </div>
          </Section>
          <Section title="3. Main colours in this image">
            <ul role="list" className="grid grid-cols-2 gap-3 sm:grid-cols-4">
              {colors.map((c) => (
                <li key={hex(c.rgb)}>
                  <Swatch rgb={c.rgb} note={`${Math.max(1, Math.round(c.share * 100))}%`} />
                </li>
              ))}
            </ul>
            <p className="text-sm text-muted">Tap a code to copy it. Percentages show roughly how much of the image each colour covers.</p>
          </Section>
        </>
      )}
    </Panel>
  );
}
