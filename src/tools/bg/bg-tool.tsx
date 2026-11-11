"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, MB, safeName } from "../shared/files";
import { Choice, ErrorText, Field, Panel, Progress, Section } from "../shared/ui";
import { decode } from "../image/process";

type Status = { label: string; v: number | null } | null;
const MAX_SIDE = 2048;
// Transparency pattern built from theme tokens.
const checker = "bg-[repeating-conic-gradient(var(--surface-2)_0_25%,var(--surface)_0_50%)] bg-[length:20px_20px]";

export default function BgTool({ slug }: ToolProps) {
  const worker = useRef<Worker | null>(null);
  // Only the latest request may update the UI; picking a new photo supersedes the one in progress.
  const current = useRef(0);
  const [file, setFile] = useState<File | null>(null);
  const [status, setStatus] = useState<Status>(null);
  const [error, setError] = useState("");
  const [orig, setOrig] = useState<string>("");
  const [cut, setCut] = useState<HTMLCanvasElement | null>(null);
  const [cutUrl, setCutUrl] = useState("");
  const [bgMode, setBgMode] = useState<"none" | "color" | "image">("none");
  const [color, setColor] = useState("#ffffff");
  const [bgImg, setBgImg] = useState<ImageBitmap | null>(null);
  const [preview, setPreview] = useState("");
  const [split, setSplit] = useState(50);

  useEffect(() => () => worker.current?.terminate(), []);

  const run = async (f: File) => {
    const id = ++current.current;
    const stale = () => id !== current.current;
    setFile(f);
    setError("");
    setCut(null);
    setStatus({ label: "Preparing image…", v: null });
    try {
      // Downscale very large photos to keep memory use reasonable on phones.
      const bmp = await decode(f);
      const k = Math.min(1, MAX_SIDE / Math.max(bmp.width, bmp.height));
      const c = document.createElement("canvas");
      c.width = Math.round(bmp.width * k);
      c.height = Math.round(bmp.height * k);
      c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
      bmp.close();
      const input = await new Promise<Blob>((res) => c.toBlob((b) => res(b!), "image/png"));
      if (stale()) return;
      setOrig((old) => {
        if (old) URL.revokeObjectURL(old);
        return URL.createObjectURL(input);
      });

      worker.current ??= new Worker(new URL("./bg.worker.ts", import.meta.url), { type: "module" });
      const w = worker.current;
      setStatus({ label: "Loading the AI model (about 45 MB, downloaded once and then cached)…", v: 0 });
      const result = await new Promise<ImageData>((resolve, reject) => {
        w.onmessage = (e) => {
          const m = e.data;
          if (m.id !== undefined && m.id !== id) return; // reply to an earlier photo
          if (m.type === "progress") setStatus({ label: `Downloading the AI model: ${formatBytes(m.loaded ?? 0)} of ${formatBytes(m.total ?? 0)} (one time only)`, v: m.progress });
          else if (m.type === "ready") setStatus({ label: "Removing background…", v: null });
          else if (m.type === "result") resolve(new ImageData(m.data, m.width, m.height));
          else if (m.type === "error") reject(new Error(m.message));
        };
        w.onerror = () => reject(new Error("The AI model couldn't start in this browser."));
        w.postMessage({ id, blob: input });
      });
      if (stale()) return;
      const out = document.createElement("canvas");
      out.width = result.width;
      out.height = result.height;
      out.getContext("2d")!.putImageData(result, 0, 0);
      setCut(out);
      trackToolUse(slug);
    } catch (e) {
      if (stale()) return;
      console.error(e);
      setError(
        e instanceof Error && /fetch|network|load/i.test(e.message)
          ? "The AI model couldn't be downloaded. Check your connection and try again."
          : e instanceof Error && e.message.length < 140
            ? e.message
            : "Background removal failed on this device. Try a smaller image or another browser.",
      );
    } finally {
      if (!stale()) setStatus(null);
    }
  };

  // Transparent cutout preview URL.
  useEffect(() => {
    if (!cut) return;
    let url = "";
    cut.toBlob((b) => {
      if (!b) return;
      url = URL.createObjectURL(b);
      setCutUrl(url);
    }, "image/png");
    return () => URL.revokeObjectURL(url);
  }, [cut]);

  // Composite with the chosen background.
  const compose = () => {
    if (!cut) return null;
    const c = document.createElement("canvas");
    c.width = cut.width;
    c.height = cut.height;
    const ctx = c.getContext("2d")!;
    if (bgMode === "color") {
      ctx.fillStyle = color;
      ctx.fillRect(0, 0, c.width, c.height);
    } else if (bgMode === "image" && bgImg) {
      const k = Math.max(c.width / bgImg.width, c.height / bgImg.height); // cover
      const w = bgImg.width * k;
      const h = bgImg.height * k;
      ctx.drawImage(bgImg, (c.width - w) / 2, (c.height - h) / 2, w, h);
    }
    ctx.drawImage(cut, 0, 0);
    return c;
  };

  useEffect(() => {
    if (!cut) return;
    let url = "";
    const c = compose();
    c?.toBlob((b) => {
      if (!b) return;
      url = URL.createObjectURL(b);
      setPreview(url);
    }, "image/png");
    return () => URL.revokeObjectURL(url);
    // eslint-disable-next-line react-hooks/exhaustive-deps -- compose reads exactly these
  }, [cut, bgMode, color, bgImg]);

  const download = () => {
    const c = compose();
    c?.toBlob((b) => b && file && downloadBlob(b, safeName(file.name, "png").replace(/\.png$/, "-no-bg.png")), "image/png");
  };

  return (
    <Panel>
      <Section title="1. Choose a photo">
        <Dropzone
          accept="image/jpeg,image/png,image/webp,image/heic,.heic,.heif"
          exts={["jpg", "jpeg", "png", "webp", "heic", "heif"]}
          maxBytes={25 * MB}
          label={file ? "Choose another photo" : "Choose a photo"}
          hint="JPG, PNG, WebP or HEIC up to 25 MB. Works best with a clear subject."
          onFiles={(f) => run(f[0])}
          compact={!!file}
        />
      </Section>

      {status && <Progress value={status.v} label={status.label} />}
      <p role="status" className="sr-only">{cut && !status ? "Background removed. The result is ready to download." : ""}</p>
      <ErrorText>{error}</ErrorText>

      {cut && orig && preview && (
        <>
          <Section title="2. Compare">
            <div className="relative mx-auto w-full max-w-xl overflow-hidden rounded-md border border-border" style={{ aspectRatio: `${cut.width} / ${cut.height}` }}>
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob */}
              <img src={orig} alt="Original photo" className="absolute inset-0 h-full w-full object-contain" />
              <div className={`absolute inset-0 ${bgMode === "none" ? checker : ""}`} style={{ clipPath: `inset(0 0 0 ${split}%)` }}>
                {/* eslint-disable-next-line @next/next/no-img-element -- local blob */}
                <img src={preview} alt="Photo with background removed" className="h-full w-full object-contain" />
              </div>
              <div className="pointer-events-none absolute inset-y-0 w-0.5 bg-accent" style={{ left: `${split}%` }} />
              <span className="eyebrow absolute top-2 left-2 rounded-sm bg-surface px-1.5 py-0.5">Original</span>
              <span className="eyebrow absolute top-2 right-2 rounded-sm bg-surface px-1.5 py-0.5">Removed</span>
            </div>
            <Field label="Before / after" htmlFor="split">
              <input id="split" type="range" min={0} max={100} value={split} aria-valuetext={`${split}% original, ${100 - split}% background removed`} onChange={(e) => setSplit(+e.target.value)} className="mx-auto block w-full max-w-xl" />
            </Field>
          </Section>

          <Section title="3. Background and download">
            <Choice name="bg" label="New background" value={bgMode} onChange={setBgMode} options={[{ value: "none", label: "Transparent" }, { value: "color", label: "Solid colour" }, { value: "image", label: "Image" }]} />
            {bgMode === "color" && (
              <div className="flex flex-wrap items-end gap-3">
                <Field label="Colour" htmlFor="bgc">
                  <input id="bgc" type="color" className="field w-20 p-1" value={color} onChange={(e) => setColor(e.target.value)} />
                </Field>
                {["#ffffff", "#000000", "#e6f0ea", "#dbe7f5", "#f5e1dc"].map((c) => (
                  <button key={c} type="button" className="h-11 w-11 rounded-sm border border-control aria-pressed:outline-2 aria-pressed:outline-offset-2 aria-pressed:outline-accent" style={{ background: c }} aria-pressed={color === c} onClick={() => setColor(c)} aria-label={`Use colour ${c}`} />
                ))}
              </div>
            )}
            {bgMode === "image" && (
              <label className="btn-secondary w-fit">
                <Icon name="upload" size={18} />
                {bgImg ? "Change background image" : "Choose background image"}
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp"
                  className="sr-only"
                  onChange={async (e) => {
                    const f = e.target.files?.[0];
                    if (!f) return;
                    if (f.size > 25 * MB) return setError("Background images must be under 25 MB.");
                    try {
                      setBgImg(await createImageBitmap(f));
                    } catch {
                      setError("That background image couldn't be read.");
                    }
                  }}
                />
              </label>
            )}
            <button type="button" className="btn-primary w-fit" onClick={download}>
              <Icon name="download" size={18} />
              Download PNG
            </button>
            {cutUrl && <p className="text-sm text-muted">Output size: {cut.width}×{cut.height} px</p>}
          </Section>
        </>
      )}
    </Panel>
  );
}
