"use client";

import { useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes } from "../shared/files";
import { openForEdit, PDF_MAX, pdfBlob } from "../shared/pdf";
import { move, useDragSort } from "../shared/sortable";
import { ErrorText, Panel, Progress, Section } from "../shared/ui";

type Item = { id: number; file: File };
let nextId = 1;

export default function MergeTool({ slug }: ToolProps) {
  const [items, setItems] = useState<Item[]>([]);
  const [busy, setBusy] = useState<number | null>(null);
  const [error, setError] = useState("");
  const [result, setResult] = useState<Blob | null>(null);
  const { itemProps } = useDragSort(items, (l) => {
    setItems(l);
    setResult(null);
  });
  const live = useRef<HTMLParagraphElement>(null);

  const reorder = (from: number, to: number) => {
    setItems((l) => move(l, from, to));
    setResult(null);
    if (live.current) live.current.textContent = `Moved to position ${to + 1}.`;
    // Keep focus on the moved file's matching arrow so repeated presses keep acting on it.
    const id = items[from].id;
    const dir = to < from ? "up" : "down";
    requestAnimationFrame(() => (document.querySelector(`[data-move="${id}-${dir}"]:not(:disabled)`) as HTMLElement | null)?.focus());
  };

  const merge = async () => {
    setError("");
    setResult(null);
    setBusy(0);
    try {
      const { PDFDocument } = await import("pdf-lib");
      const out = await PDFDocument.create();
      for (let i = 0; i < items.length; i++) {
        setBusy(i / items.length);
        let src;
        try {
          src = await openForEdit(await items[i].file.arrayBuffer());
        } catch (e) {
          throw new Error(`${items[i].file.name}: ${(e as Error).message}`);
        }
        const pages = await out.copyPages(src, src.getPageIndices());
        pages.forEach((p) => out.addPage(p));
      }
      setResult(pdfBlob(await out.save()));
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Merging failed.");
    } finally {
      setBusy(null);
    }
  };

  return (
    <Panel>
      <Section title="1. Add PDFs">
        <Dropzone
          accept="application/pdf,.pdf"
          exts={["pdf"]}
          multiple
          maxFiles={50 - items.length}
          maxBytes={PDF_MAX}
          label={items.length ? "Add more PDFs" : "Choose PDF files"}
          hint="Add two or more PDFs, up to 100 MB each."
          compact={items.length > 0}
          onFiles={(f) => {
            setItems((l) => [...l, ...f.map((file) => ({ id: nextId++, file }))]);
            setResult(null);
          }}
        />
      </Section>

      {items.length > 0 && (
        <Section title="2. Put them in order" aside={<span className="text-sm text-muted">Drag, or use the arrows</span>}>
          <ol className="divide-y divide-border rounded-md border border-border">
            {items.map((it, i) => (
              <li key={it.id} {...itemProps(i)} className="flex items-center gap-2 bg-surface p-2 data-over:bg-accent-soft sm:gap-3">
                <span className="hidden cursor-grab text-muted sm:block" aria-hidden="true">
                  <Icon name="grip" />
                </span>
                <span className="num w-6 text-center text-sm font-semibold text-muted">{i + 1}</span>
                <div className="min-w-0 flex-1">
                  <p className="truncate font-medium" title={it.file.name}>
                    {it.file.name}
                  </p>
                  <p className="num text-sm text-muted">{formatBytes(it.file.size)}</p>
                </div>
                <button type="button" className="btn-ghost w-11 px-0" data-move={`${it.id}-up`} disabled={i === 0} onClick={() => reorder(i, i - 1)} aria-label={`Move ${it.file.name} up`}>
                  <Icon name="up" size={18} />
                </button>
                <button type="button" className="btn-ghost w-11 px-0" data-move={`${it.id}-down`} disabled={i === items.length - 1} onClick={() => reorder(i, i + 1)} aria-label={`Move ${it.file.name} down`}>
                  <Icon name="down" size={18} />
                </button>
                <button
                  type="button"
                  className="btn-ghost w-11 px-0"
                  onClick={() => {
                    setItems((l) => l.filter((x) => x.id !== it.id));
                    setResult(null);
                  }}
                  aria-label={`Remove ${it.file.name}`}
                >
                  <Icon name="close" size={18} />
                </button>
              </li>
            ))}
          </ol>
          <p ref={live} aria-live="polite" className="sr-only" />
        </Section>
      )}

      {items.length > 0 && (
        <Section title="3. Merge and download">
          {busy !== null ? (
            <Progress value={busy} label="Merging…" />
          ) : (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary" disabled={items.length < 2} onClick={merge}>
                Merge {items.length} PDFs
              </button>
              {result && (
                <button type="button" className="btn-secondary" onClick={() => downloadBlob(result, "merged.pdf")}>
                  <Icon name="download" size={18} />
                  Download merged.pdf ({formatBytes(result.size)})
                </button>
              )}
              {items.length < 2 && <p className="text-sm text-muted">Add at least one more PDF.</p>}
            </div>
          )}
          <ErrorText>{error}</ErrorText>
          <p role="status" className="sr-only">{result ? `Done. merged.pdf is ready to download, ${formatBytes(result.size)}.` : ""}</p>
        </Section>
      )}
    </Panel>
  );
}
