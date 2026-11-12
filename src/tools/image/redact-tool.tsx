"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { BoxEditor, type R } from "../shared/box-editor";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, MB, safeName } from "../shared/files";
import { canvasBlob } from "../shared/pdf";
import { Choice, ErrorText, Field, Panel, Section } from "../shared/ui";
import { IMAGE_ACCEPT, IMAGE_EXTS } from "./crop-tool";
import { decode } from "./process";

type Effect = "blur" | "pixelate" | "black";

/** Draws the image with every box covered by the effect. Blur = smooth down/up-scale (works in every browser, unlike ctx.filter). */
function render(c: HTMLCanvasElement, img: ImageBitmap, boxes: R[], effect: Effect, strength: number) {
  c.width = img.width;
  c.height = img.height;
  const ctx = c.getContext("2d")!;
  ctx.drawImage(img, 0, 0);
  const tmp = document.createElement("canvas");
  for (const b of boxes) {
    const x = Math.round(b.x), y = Math.round(b.y), w = Math.round(b.w), h = Math.round(b.h);
    if (w < 2 || h < 2) continue;
    if (effect === "black") {
      ctx.fillStyle = "#000";
      ctx.fillRect(x, y, w, h);
      continue;
    }
    // Larger strength = fewer pixels kept.
    const k = Math.max(2, Math.round((Math.max(w, h) / 100) * strength));
    tmp.width = Math.max(1, Math.round(w / k));
    tmp.height = Math.max(1, Math.round(h / k));
    const t = tmp.getContext("2d")!;
    t.imageSmoothingEnabled = true;
    t.drawImage(c, x, y, w, h, 0, 0, tmp.width, tmp.height);
    ctx.save();
    ctx.imageSmoothingEnabled = effect === "blur";
    ctx.imageSmoothingQuality = "high";
    ctx.drawImage(tmp, 0, 0, tmp.width, tmp.height, x, y, w, h);
    ctx.restore();
  }
}

export default function RedactTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<ImageBitmap | null>(null);
  const [boxes, setBoxes] = useState<R[]>([]);
  const [sel, setSel] = useState(-1);
  const [effect, setEffect] = useState<Effect>("blur");
  const [strength, setStrength] = useState(6);
  const [version, setVersion] = useState(0);
  const [error, setError] = useState("");
  // Offscreen canvas holding the image with effects applied (created in the browser only).
  const [preview] = useState(() => (typeof document === "undefined" ? null : document.createElement("canvas")));

  useEffect(() => {
    if (!img || !preview) return;
    render(preview, img, boxes, effect, strength);
    // eslint-disable-next-line react-hooks/set-state-in-effect -- tells BoxEditor to repaint the offscreen preview
    setVersion((v) => v + 1);
  }, [img, boxes, effect, strength, preview]);

  const load = async (f: File) => {
    setError("");
    try {
      const b = await decode(f);
      img?.close();
      setFile(f);
      setBoxes([]);
      setSel(-1);
      setImg(b);
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const add = () => {
    if (!img) return;
    const s = Math.min(img.width, img.height) * 0.25;
    setBoxes((b) => [...b, { x: (img.width - s) / 2, y: (img.height - s) / 2, w: s, h: s }]);
    setSel(boxes.length);
  };

  const save = async () => {
    if (!img || !file) return;
    const c = document.createElement("canvas");
    render(c, img, boxes, effect, strength);
    const type = file.type === "image/png" ? "image/png" : "image/jpeg";
    downloadBlob(await canvasBlob(c, type, 0.92), safeName(file.name.replace(/\.[^.]+$/, "") + "-redacted", type === "image/png" ? "png" : "jpg"));
    trackToolUse(slug);
  };

  return (
    <Panel>
      <Section title="1. Add an image">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={img ? "Choose another image" : "Choose an image"} hint="JPG, PNG, WebP or HEIC, up to 25 MB. You can also paste a screenshot." onFiles={(f) => f[0] && load(f[0])} compact={!!img} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {img && preview && (
        <>
          <Section title="2. Mark what to hide">
            <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
              <Choice name="effect" label="Effect" value={effect} onChange={setEffect} options={[{ value: "blur", label: "Blur" }, { value: "pixelate", label: "Pixelate" }, { value: "black", label: "Black box" }]} />
              {effect !== "black" && (
                <Field label="Strength" htmlFor="strength">
                  <input id="strength" type="range" min={2} max={12} value={strength} onChange={(e) => setStrength(+e.target.value)} className="w-40" />
                </Field>
              )}
            </div>
            <p className="text-sm text-muted">Drag on the image to cover a face, name or number. Tap a box to select it, then drag its corners to resize.</p>
            <BoxEditor
              source={preview}
              version={version}
              boxes={boxes}
              selected={sel}
              onSelect={setSel}
              onChange={(i, b) => setBoxes((list) => (i >= list.length ? [...list, b] : list.map((x, j) => (j === i ? b : x))))}
              onDraw={(b) => setBoxes((list) => [...list, b])}
              label={(b, i) => `Hidden area ${i + 1}. Arrow keys move it, Shift plus arrow keys resize it.`}
            />
            <div className="flex flex-wrap gap-2">
              <button type="button" className="btn-secondary" onClick={add}>
                Add a box
              </button>
              <button
                type="button"
                className="btn-ghost text-danger"
                disabled={sel < 0 || sel >= boxes.length}
                onClick={() => {
                  setBoxes((b) => b.filter((_, j) => j !== sel));
                  setSel(-1);
                }}
              >
                <Icon name="trash" />
                Remove selected
              </button>
              <span className="num self-center text-sm text-muted">{boxes.length} area{boxes.length === 1 ? "" : "s"} hidden</span>
            </div>
          </Section>
          <Section title="3. Download">
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={save} disabled={!boxes.length}>
              <Icon name="download" />
              Download image
            </button>
            {effect !== "black" && <p className="note-warn">For passwords, card numbers or ID details, use Black box. Light blur on small text can sometimes be reversed.</p>}
          </Section>
        </>
      )}
    </Panel>
  );
}
