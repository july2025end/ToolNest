"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, MB, safeName } from "../shared/files";
import { ErrorText, Panel, Progress, Section } from "../shared/ui";
import { IMAGE_ACCEPT, IMAGE_EXTS } from "./crop-tool";
import { decode } from "./process";

const V = "/vendor/tesseract";

export default function OcrTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [preview, setPreview] = useState("");
  const [text, setText] = useState<string | null>(null);
  const [status, setStatus] = useState<{ label: string; p: number | null } | null>(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const run = useRef(0);

  useEffect(() => () => URL.revokeObjectURL(preview), [preview]);

  const recognize = async (f: File) => {
    const id = ++run.current;
    setError("");
    setText(null);
    setFile(f);
    setStatus({ label: "Loading the text recognizer (about 7 MB, once)…", p: null });
    let worker: import("tesseract.js").Worker | null = null;
    try {
      // HEIC and rotated phone photos: decode to a canvas first so Tesseract gets upright pixels.
      const bmp = await decode(f);
      const c = document.createElement("canvas");
      c.width = bmp.width;
      c.height = bmp.height;
      c.getContext("2d")!.drawImage(bmp, 0, 0);
      bmp.close();
      setPreview(URL.createObjectURL(f));
      const { createWorker } = await import("tesseract.js");
      worker = await createWorker("eng", 1, {
        workerPath: `${V}/worker.min.js`,
        corePath: V,
        langPath: V,
        gzip: true,
        workerBlobURL: false,
        logger: (m) => {
          if (id !== run.current) return;
          if (m.status === "recognizing text") setStatus({ label: "Reading text…", p: m.progress });
        },
      });
      const { data } = await worker.recognize(c);
      if (id !== run.current) return;
      setText(data.text.trim());
      trackToolUse(slug);
    } catch (e) {
      if (id === run.current) setError(e instanceof Error && /couldn't be read/.test(e.message) ? e.message : "Text recognition failed. Check your connection and try again with a clearer image.");
    } finally {
      await worker?.terminate();
      if (id === run.current) setStatus(null);
    }
  };

  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text ?? "");
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };

  return (
    <Panel>
      <Section title="1. Add an image with text">
        <Dropzone accept={IMAGE_ACCEPT} exts={IMAGE_EXTS} maxBytes={25 * MB} label={file ? "Choose another image" : "Choose an image"} hint="A photo of a page, a screenshot or a scan. JPG, PNG, WebP or HEIC. You can also paste a screenshot." onFiles={(f) => f[0] && recognize(f[0])} compact={!!file} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {file && (
        <Section title="2. Your text">
          {status && <Progress value={status.p} label={status.label} />}
          {text !== null && (
            <div className="grid gap-4 lg:grid-cols-[200px_minmax(0,1fr)]">
              {/* eslint-disable-next-line @next/next/no-img-element -- local blob preview */}
              {preview && <img src={preview} alt="Your image" className="hidden max-h-72 w-full rounded-md bg-surface-2 object-contain lg:block" />}
              <div className="space-y-3">
                <label htmlFor="ocr-text" className="sr-only">
                  Recognised text
                </label>
                <textarea id="ocr-text" className="field min-h-72 resize-y py-3 leading-relaxed" value={text} onChange={(e) => setText(e.target.value)} placeholder="No text was found. Try a sharper, well-lit image." />
                <div className="flex flex-wrap gap-2">
                  <button type="button" className="btn-primary" onClick={copy} disabled={!text}>
                    <Icon name={copied ? "check" : "file"} />
                    {copied ? "Copied" : "Copy text"}
                  </button>
                  <button type="button" className="btn-secondary" disabled={!text} onClick={() => downloadBlob(new Blob([text ?? ""], { type: "text/plain;charset=utf-8" }), safeName(file.name, "txt"))}>
                    <Icon name="download" />
                    Download .txt
                  </button>
                </div>
                <p className="note">Recognition is very good on clear printed English text. Check names and numbers before you rely on them. Handwriting is not supported.</p>
              </div>
            </div>
          )}
        </Section>
      )}
    </Panel>
  );
}
