"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { BoxEditor, fitBox, type R } from "../shared/box-editor";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, MB } from "../shared/files";
import { canvasBlob } from "../shared/pdf";
import { Choice, ErrorText, Panel, Progress, Section } from "../shared/ui";
import { IMAGE_ACCEPT, IMAGE_EXTS } from "./crop-tool";
import { decode } from "./process";

const DPI = 300;
const SIZES = [
  { id: "35x45", label: "35 × 45 mm", note: "UK, EU and Schengen, Pakistan, India passport, Australia, most countries", w: 35, h: 45 },
  { id: "2x2", label: "2 × 2 in", note: "US passport and visa, India visa", w: 50.8, h: 50.8 },
  { id: "50x70", label: "50 × 70 mm", note: "Canada passport", w: 50, h: 70 },
  { id: "33x48", label: "33 × 48 mm", note: "China visa", w: 33, h: 48 },
] as const;
type SizeId = (typeof SIZES)[number]["id"];
const mmPx = (mm: number) => Math.round((mm / 25.4) * DPI);

/** Copies that fit on a 6×4 in sheet: 2 mm gaps when they cost nothing, edge to edge when that fits more (e.g. 2×2 in: 6 vs 2). */
function layout(pw: number, ph: number) {
  const W = 6 * DPI, H = 4 * DPI;
  const fit = (gap: number) => ({ gap, cols: Math.floor((W + gap) / (pw + gap)), rows: Math.floor((H + gap) / (ph + gap)) });
  const a = fit(mmPx(2));
  const b = fit(0);
  return a.cols * a.rows >= b.cols * b.rows ? a : b;
}

/** Photo sheet with a thin grey cut line around each copy. */
function sheet(photo: HTMLCanvasElement) {
  const c = document.createElement("canvas");
  c.width = 6 * DPI;
  c.height = 4 * DPI;
  const ctx = c.getContext("2d")!;
  ctx.fillStyle = "#fff";
  ctx.fillRect(0, 0, c.width, c.height);
  const { gap, cols, rows } = layout(photo.width, photo.height);
  const ox = (c.width - cols * photo.width - (cols - 1) * gap) / 2;
  const oy = (c.height - rows * photo.height - (rows - 1) * gap) / 2;
  for (let r = 0; r < rows; r++)
    for (let k = 0; k < cols; k++) ctx.drawImage(photo, Math.round(ox + k * (photo.width + gap)), Math.round(oy + r * (photo.height + gap)));
  ctx.strokeStyle = "#bbb";
  ctx.lineWidth = 1;
  for (let r = 0; r < rows; r++)
    for (let k = 0; k < cols; k++) ctx.strokeRect(Math.round(ox + k * (photo.width + gap)) + 0.5, Math.round(oy + r * (photo.height + gap)) + 0.5, photo.width - 1, photo.height - 1);
  return c;
}

export default function PassportTool({ slug }: ToolProps) {
  const [orig, setOrig] = useState<ImageBitmap | null>(null);
  const [source, setSource] = useState<HTMLCanvasElement | null>(null);
  const [version, setVersion] = useState(0);
  const [size, setSize] = useState<SizeId>("35x45");
  const [box, setBox] = useState<R>({ x: 0, y: 0, w: 0, h: 0 });
  const [white, setWhite] = useState<"off" | "working" | "on">("off");
  const [progress, setProgress] = useState<number | null>(null);
  const [error, setError] = useState("");
  const worker = useRef<Worker | null>(null);
  const s = SIZES.find((x) => x.id === size)!;
  const ratio = s.w / s.h;

  useEffect(() => () => worker.current?.terminate(), []);

  const toCanvas = (img: ImageBitmap | ImageData) => {
    const c = document.createElement("canvas");
    c.width = img.width;
    c.height = img.height;
    const ctx = c.getContext("2d")!;
    if (img instanceof ImageData) {
      // Cut-out on white: draw the transparent result over a white fill.
      const t = document.createElement("canvas");
      t.width = img.width;
      t.height = img.height;
      t.getContext("2d")!.putImageData(img, 0, 0);
      ctx.fillStyle = "#fff";
      ctx.fillRect(0, 0, c.width, c.height);
      ctx.drawImage(t, 0, 0);
    } else ctx.drawImage(img, 0, 0);
    return c;
  };

  const load = async (f: File) => {
    setError("");
    try {
      const b = await decode(f);
      orig?.close();
      setOrig(b);
      setSource(toCanvas(b));
      setVersion((v) => v + 1);
      setWhite("off");
      setBox(fitBox(b.width, b.height, ratio));
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const makeWhite = async () => {
    if (!orig || !source) return;
    setWhite("working");
    setError("");
    setProgress(null);
    try {
      worker.current ??= new Worker(new URL("../bg/bg.worker.ts", import.meta.url), { type: "module" });
      const w = worker.current;
      const blob = await canvasBlob(toCanvas(orig), "image/png");
      const data = await new Promise<ImageData>((resolve, reject) => {
        w.onmessage = (e) => {
          const m = e.data;
          if (m.type === "progress") setProgress(m.progress);
          else if (m.type === "ready") setProgress(null);
          else if (m.type === "result") resolve(new ImageData(m.data, m.width, m.height));
          else if (m.type === "error") reject(new Error(m.message));
        };
        w.postMessage({ id: 1, blob });
      });
      setSource(toCanvas(data));
      setVersion((v) => v + 1);
      setWhite("on");
    } catch {
      setWhite("off");
      setError("The background couldn't be removed. Check your connection and try again, or use a photo taken against a plain light wall.");
    }
  };

  const output = () => {
    const c = document.createElement("canvas");
    c.width = mmPx(s.w);
    c.height = mmPx(s.h);
    const ctx = c.getContext("2d")!;
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(source!, box.x, box.y, box.w, box.h, 0, 0, c.width, c.height);
    return c;
  };
  const save = async (kind: "single" | "sheet") => {
    const photo = output();
    const c = kind === "single" ? photo : sheet(photo);
    downloadBlob(await canvasBlob(c, "image/jpeg", 0.95), `passport-photo-${s.id}${kind === "sheet" ? "-4x6-sheet" : ""}.jpg`);
    trackToolUse(slug);
  };
  const { cols, rows } = layout(mmPx(s.w), mmPx(s.h));
  const perSheet = cols * rows;

  return (
    <Panel>
      <Section title="1. Add your photo">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={orig ? "Choose another photo" : "Choose a photo"} hint="Face the camera, even light, plain background if possible. JPG, PNG or HEIC." onFiles={(f) => f[0] && load(f[0])} compact={!!orig} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {orig && source && (
        <>
          <Section title="2. Choose the size">
            <Choice
              name="psize"
              label="Photo size"
              hideLabel
              value={size}
              onChange={(v) => {
                setSize(v);
                const n = SIZES.find((x) => x.id === v)!;
                setBox(fitBox(source.width, source.height, n.w / n.h));
              }}
              options={SIZES.map((x) => ({ value: x.id, label: x.label }))}
            />
            <p className="text-sm text-muted">{s.note}. Always check the latest rules for your country before printing.</p>
          </Section>
          <Section title="3. Background and framing">
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-secondary" onClick={makeWhite} disabled={white !== "off"}>
                <Icon name={white === "on" ? "check" : "cutout"} />
                {white === "on" ? "Background is white" : "Make background white"}
              </button>
              {white === "off" && <span className="text-sm text-muted">Uses a small AI model on your device (about 45 MB the first time).</span>}
            </div>
            {white === "working" && <Progress value={progress} label={progress === null ? "Removing background…" : "Downloading the model…"} />}
            <BoxEditor source={source} version={version} boxes={[box]} selected={0} onSelect={() => {}} onChange={(_, b) => setBox(b)} ratio={ratio} shade label={() => "Photo frame. Arrow keys move it, Shift plus arrow keys resize it."} />
            <p className="note">Frame from just above the hair to the shoulders. The face (chin to top of head) should fill about 70% of the height, with the eyes a little above the middle.</p>
          </Section>
          <Section title="4. Download">
            <div className="flex flex-col gap-2 sm:flex-row">
              <button type="button" className="btn-primary" onClick={() => save("sheet")}>
                <Icon name="download" />
                4×6 in print sheet ({perSheet} photos)
              </button>
              <button type="button" className="btn-secondary" onClick={() => save("single")}>
                <Icon name="download" />
                Single photo ({mmPx(s.w)} × {mmPx(s.h)} px)
              </button>
            </div>
            <p className="text-sm text-muted">Print the sheet as a standard 6×4 in (10×15 cm) photo at any print shop or kiosk, at 100% size, then cut along the lines.</p>
          </Section>
        </>
      )}
    </Panel>
  );
}
