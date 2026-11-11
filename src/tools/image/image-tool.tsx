"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { trackToolUse } from "@/lib/supabase";
import type { ImagePreset } from "@/lib/tools";
import type { ToolProps } from "@/components/tool-renderer";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, MB, safeName, zipBlobs } from "../shared/files";
import { Choice, Field, IntInput, Panel, Section } from "../shared/ui";
import { extFor, processImage, type ImageOptions, type OutFormat } from "./process";

type Item = {
  id: number;
  file: File;
  status: "waiting" | "working" | "done" | "error";
  out?: { blob: Blob; name: string; w: number; h: number; url: string };
  error?: string;
};

const EXTS = ["jpg", "jpeg", "png", "webp", "heic", "heif"];
const ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif";
const TARGETS = [20, 50, 100, 200, 500];
let nextId = 1;

export default function ImageTool({ slug, preset }: ToolProps) {
  const p = (preset ?? {}) as ImagePreset;
  const [items, setItems] = useState<Item[]>([]);
  const [o, setO] = useState<ImageOptions>({
    format: p.format ?? "keep",
    mode: p.targetKB ? "target" : "quality",
    quality: 0.75,
    targetKB: p.targetKB ?? 100,
    resize: "none",
    width: null,
    height: null,
    lock: true,
    percent: 50,
  });
  const set = <K extends keyof ImageOptions>(k: K, v: ImageOptions[K]) => setO((prev) => ({ ...prev, [k]: v }));
  const [zipping, setZipping] = useState(false);
  const run = useRef(0);
  const tracked = useRef(false);

  const itemsRef = useRef(items);
  useEffect(() => {
    itemsRef.current = items;
  });
  const update = (id: number, patch: Partial<Item>) =>
    setItems((list) =>
      list.map((i) => {
        if (i.id !== id) return i;
        if (patch.out && i.out) URL.revokeObjectURL(i.out.url);
        return { ...i, ...patch };
      }),
    );

  // Re-process everything (sequentially, to keep memory low) whenever files or options change.
  const fileKey = items.map((i) => i.id).join(",");
  useEffect(() => {
    if (!fileKey) return;
    const token = ++run.current;
    const ids = fileKey.split(",").map(Number);
    const timer = setTimeout(async () => {
      for (const id of ids) {
        if (token !== run.current) return;
        const file = itemsRef.current.find((i) => i.id === id)?.file;
        if (!file) continue;
        update(id, { status: "working", error: undefined });
        try {
          const r = await processImage(file, o);
          if (token !== run.current) return;
          const name = safeName(file.name, extFor(r.type));
          update(id, { status: "done", out: { blob: r.blob, name, w: r.w, h: r.h, url: URL.createObjectURL(r.blob) } });
          if (!tracked.current) {
            tracked.current = true;
            trackToolUse(slug);
          }
        } catch (e) {
          if (token !== run.current) return;
          update(id, { status: "error", error: e instanceof Error ? e.message : "Something went wrong with this image." });
        }
      }
    }, 250);
    return () => clearTimeout(timer);
  }, [fileKey, o, slug]);


  // Revoke preview URLs on unmount.
  useEffect(() => () => itemsRef.current.forEach((i) => i.out && URL.revokeObjectURL(i.out.url)), []);

  const add = (files: File[]) =>
    setItems((list) => [...list, ...files.map((file) => ({ id: nextId++, file, status: "waiting" as const }))].slice(0, 20));
  const remove = (id: number) =>
    setItems((list) => {
      const it = list.find((i) => i.id === id);
      if (it?.out) URL.revokeObjectURL(it.out.url);
      return list.filter((i) => i.id !== id);
    });

  const done = items.filter((i) => i.status === "done" && i.out);
  const before = done.reduce((s, i) => s + i.file.size, 0);
  const after = done.reduce((s, i) => s + i.out!.blob.size, 0);
  const busy = items.some((i) => i.status === "working" || i.status === "waiting");

  const formatOptions: { value: OutFormat; label: string }[] = [
    { value: "keep", label: "Same as input" },
    { value: "image/jpeg", label: "JPG" },
    { value: "image/png", label: "PNG" },
    { value: "image/webp", label: "WebP" },
  ];

  return (
    <Panel>
      <Section title="1. Add images">
        <Dropzone
          accept={ACCEPT}
          exts={EXTS}
          multiple
          maxFiles={20 - items.length}
          maxBytes={25 * MB}
          label={items.length ? "Add more images" : "Choose images"}
          hint="JPG, PNG, WebP or HEIC. Up to 20 images, 25 MB each."
          onFiles={add}
          compact={items.length > 0}
        />
      </Section>

      <Section title="2. Options">
        <div className="grid gap-5 md:grid-cols-2">
          <Choice
            name="mode"
            label="Compression"
            value={o.mode}
            onChange={(v) => set("mode", v)}
            options={[
              { value: "quality", label: "Quality slider" },
              { value: "target", label: "Target file size" },
            ]}
          />
          <Choice name="format" label="Output format" value={o.format} onChange={(v) => set("format", v)} options={formatOptions} />

          {o.mode === "quality" ? (
            <Field label={`Quality: ${Math.round(o.quality * 100)}%`} htmlFor="q" hint={o.format === "image/png" ? "PNG is lossless, so quality doesn't change it. Resize or pick JPG/WebP to shrink it." : "75–80% is a good balance for photos."}>
              <input id="q" type="range" min={5} max={100} value={Math.round(o.quality * 100)} onChange={(e) => set("quality", +e.target.value / 100)} className="w-full" />
            </Field>
          ) : (
            <div>
              <Field label="Maximum size (KB)" htmlFor="kb" hint="PNG files are saved as JPG in this mode, since PNG can't be compressed to a target.">
                <IntInput id="kb" min={5} max={20000} value={o.targetKB} onChange={(v) => set("targetKB", v)} className="field num max-w-40" />
              </Field>
              <div className="mt-2 flex flex-wrap gap-2">
                {TARGETS.map((t) => (
                  <button key={t} type="button" className="chip" aria-pressed={o.targetKB === t} onClick={() => set("targetKB", t)}>
                    {t} KB
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="space-y-3">
            <Choice
              name="resize"
              label="Resize"
              value={o.resize}
              onChange={(v) => set("resize", v)}
              options={[
                { value: "none", label: "Original size" },
                { value: "size", label: "Width / height" },
                { value: "percent", label: "Percentage" },
              ]}
            />
            {o.resize === "size" && (
              <div className="flex flex-wrap items-end gap-3">
                <Field label="Width (px)" htmlFor="w">
                  <input id="w" type="number" inputMode="numeric" min={1} max={10000} value={o.width ?? ""} onChange={(e) => set("width", e.target.value ? +e.target.value : null)} className="field num w-28" />
                </Field>
                <Field label="Height (px)" htmlFor="h">
                  <input id="h" type="number" inputMode="numeric" min={1} max={10000} value={o.height ?? ""} onChange={(e) => set("height", e.target.value ? +e.target.value : null)} className="field num w-28" />
                </Field>
                <label className="flex min-h-11 items-center gap-2 text-sm">
                  <input type="checkbox" checked={o.lock} onChange={(e) => set("lock", e.target.checked)} />
                  Keep aspect ratio
                </label>
              </div>
            )}
            {o.resize === "percent" && (
              <Field label={`Scale: ${o.percent}%`} htmlFor="pct">
                <input id="pct" type="range" min={5} max={100} value={o.percent} onChange={(e) => set("percent", +e.target.value)} className="w-full" />
              </Field>
            )}
          </div>
        </div>
        <p className="note">Location and camera details (EXIF/GPS) are removed from every image automatically.</p>
      </Section>

      {items.length > 0 && (
        <Section
          title="3. Results"
          aside={
            done.length > 0 && (
              <p className="num text-sm text-muted">
                {formatBytes(before)} → {formatBytes(after)}{" "}
                <SavedBadge before={before} after={after} />
              </p>
            )
          }
        >
          <p role="status" className="sr-only">
            {busy ? `Processing ${done.length + 1} of ${items.length}` : `${done.length} of ${items.length} images ready`}
          </p>
          <ul role="list" className="divide-y divide-border rounded-md border border-border">
            {items.map((i) => (
              <li key={i.id} className="flex flex-wrap items-center gap-3 p-3 sm:flex-nowrap">
                <div className="flex h-12 w-12 shrink-0 items-center justify-center overflow-hidden rounded-sm bg-surface-2">
                  {i.out ? (
                    // eslint-disable-next-line @next/next/no-img-element -- local blob preview
                    <img src={i.out.url} alt={`Preview of ${i.file.name}`} width={48} height={48} className="h-12 w-12 object-cover" />
                  ) : (
                    <Icon name="file" className="text-muted" />
                  )}
                </div>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium" title={i.file.name}>
                    {i.file.name}
                  </p>
                  <p className="num text-sm text-muted">
                    {i.status === "error" ? (
                      <span className="text-danger">{i.error}</span>
                    ) : i.status === "done" && i.out ? (
                      <>
                        {formatBytes(i.file.size)} → {formatBytes(i.out.blob.size)} · {i.out.w}×{i.out.h}{" "}
                        <SavedBadge before={i.file.size} after={i.out.blob.size} />
                      </>
                    ) : (
                      "Processing…"
                    )}
                  </p>
                </div>
                <div className="flex gap-1">
                  {i.out && i.status === "done" && (
                    <button type="button" className="btn-secondary" onClick={() => downloadBlob(i.out!.blob, i.out!.name)}>
                      <Icon name="download" size={18} />
                      <span className="sr-only sm:not-sr-only">Download</span>
                      <span className="sr-only"> {i.out.name}</span>
                    </button>
                  )}
                  <button type="button" className="btn-ghost w-11 px-0" onClick={() => remove(i.id)} aria-label={`Remove ${i.file.name}`}>
                    <Icon name="close" size={18} />
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="flex flex-wrap gap-2">
            {done.length > 1 && (
              <button
                type="button"
                className="btn-primary"
                disabled={busy || zipping}
                onClick={async () => {
                  setZipping(true);
                  try {
                    downloadBlob(await zipBlobs(done.map((i) => ({ name: i.out!.name, blob: i.out!.blob }))), "images.zip");
                  } finally {
                    setZipping(false);
                  }
                }}
              >
                <Icon name="download" size={18} />
                {zipping ? "Preparing ZIP…" : `Download all (${done.length}) as ZIP`}
              </button>
            )}
            {done.length === 1 && items.length === 1 && (
              <button type="button" className="btn-primary" onClick={() => downloadBlob(done[0].out!.blob, done[0].out!.name)}>
                <Icon name="download" size={18} />
                Download {done[0].out!.name.split(".").pop()?.toUpperCase()}
              </button>
            )}
            <button type="button" className="btn-ghost" onClick={() => setItems([])}>
              Clear all
            </button>
          </div>
        </Section>
      )}
    </Panel>
  );
}

function SavedBadge({ before, after }: { before: number; after: number }) {
  if (!before) return null;
  const pct = Math.round((1 - after / before) * 100);
  return pct >= 0 ? (
    <span className="font-semibold text-accent">−{pct}%</span>
  ) : (
    <span className="font-semibold text-warn">+{-pct}% larger</span>
  );
}
