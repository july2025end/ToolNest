"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { BoxEditor, fitBox, type R } from "../shared/box-editor";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, MB, safeName } from "../shared/files";
import { canvasBlob } from "../shared/pdf";
import { Choice, ErrorText, Panel, Section } from "../shared/ui";
import { decode } from "./process";

const RATIOS = [
  { value: "free", label: "Free", r: 0 },
  { value: "1:1", label: "Square", r: 1 },
  { value: "4:5", label: "4:5 portrait", r: 4 / 5 },
  { value: "16:9", label: "16:9", r: 16 / 9 },
  { value: "4:3", label: "4:3", r: 4 / 3 },
  { value: "3:2", label: "3:2", r: 3 / 2 },
  { value: "9:16", label: "9:16 story", r: 9 / 16 },
] as const;
type RatioId = (typeof RATIOS)[number]["value"];

export const IMAGE_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif";
export const IMAGE_EXTS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];

export default function CropTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [img, setImg] = useState<ImageBitmap | null>(null);
  const [box, setBox] = useState<R>({ x: 0, y: 0, w: 0, h: 0 });
  const [ratio, setRatio] = useState<RatioId>("free");
  const [fmt, setFmt] = useState<"keep" | "image/jpeg" | "image/png">("keep");
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);
  const r = RATIOS.find((x) => x.value === ratio)!.r;

  const load = async (f: File) => {
    setError("");
    try {
      const b = await decode(f);
      img?.close();
      setFile(f);
      setImg(b);
      setBox(fitBox(b.width, b.height, r));
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const save = async () => {
    if (!img || !file) return;
    setBusy(true);
    try {
      const w = Math.round(box.w);
      const h = Math.round(box.h);
      const c = document.createElement("canvas");
      c.width = w;
      c.height = h;
      c.getContext("2d")!.drawImage(img, Math.round(box.x), Math.round(box.y), w, h, 0, 0, w, h);
      const type = fmt !== "keep" ? fmt : file.type === "image/png" || file.type === "image/webp" ? file.type : "image/jpeg";
      const blob = await canvasBlob(c, type, 0.92);
      // Safari returns PNG when asked for WebP; name the file after what was actually made.
      downloadBlob(blob, safeName(file.name.replace(/\.[^.]+$/, "") + "-cropped", blob.type.split("/")[1].replace("jpeg", "jpg")));
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Cropping failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel>
      <Section title="1. Add an image">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={img ? "Choose another image" : "Choose an image"} hint="JPG, PNG, WebP or HEIC, up to 25 MB. You can also drop or paste it here." onFiles={(f) => f[0] && load(f[0])} compact={!!img} />
        <ErrorText>{error}</ErrorText>
      </Section>

      {img && (
        <>
          <Section title="2. Choose the crop">
            <Choice
              name="ratio"
              label="Shape"
              value={ratio}
              onChange={(v) => {
                setRatio(v);
                setBox(fitBox(img.width, img.height, RATIOS.find((x) => x.value === v)!.r));
              }}
              options={RATIOS.map(({ value, label }) => ({ value, label }))}
            />
            <BoxEditor
              source={img}
              boxes={[box]}
              selected={0}
              onSelect={() => {}}
              onChange={(_, b) => setBox(b)}
              ratio={r}
              shade
              label={(b) => `Crop area ${Math.round(b.w)} by ${Math.round(b.h)} pixels. Arrow keys move it, Shift plus arrow keys resize it.`}
            />
            <p className="text-sm text-muted">
              Drag the box to move it and the corners to resize it. Result:{" "}
              <span className="num font-medium text-text">
                {Math.round(box.w)} × {Math.round(box.h)} px
              </span>{" "}
              (original {img.width} × {img.height}, {formatBytes(file!.size)}).
            </p>
          </Section>

          <Section title="3. Download">
            <Choice name="fmt" label="Format" value={fmt} onChange={setFmt} options={[{ value: "keep", label: "Same as original" }, { value: "image/jpeg", label: "JPG" }, { value: "image/png", label: "PNG" }]} />
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={save} disabled={busy}>
              <Icon name="download" />
              {busy ? "Cropping…" : "Download cropped image"}
            </button>
          </Section>
        </>
      )}
    </Panel>
  );
}
