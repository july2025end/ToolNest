"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, safeName } from "../shared/files";
import { openForEdit, PDF_MAX, pdfBlob } from "../shared/pdf";
import { ErrorText, Field, Panel, Section } from "../shared/ui";

type Meta = { title: string; author: string; subject: string; keywords: string; creator: string; producer: string };
const FIELDS: { k: keyof Meta; label: string; hint?: string }[] = [
  { k: "title", label: "Title", hint: "Shown in the browser tab and in search results." },
  { k: "author", label: "Author" },
  { k: "subject", label: "Subject" },
  { k: "keywords", label: "Keywords", hint: "Separate with commas." },
  { k: "creator", label: "Created with" },
  { k: "producer", label: "PDF producer" },
];
const EMPTY: Meta = { title: "", author: "", subject: "", keywords: "", creator: "", producer: "" };

export default function MetadataTool({ slug }: ToolProps) {
  const [file, setFile] = useState<File | null>(null);
  const [meta, setMeta] = useState<Meta>(EMPTY);
  const [error, setError] = useState("");
  const [busy, setBusy] = useState(false);

  const load = async (f: File) => {
    setError("");
    try {
      const d = await openForEdit(await f.arrayBuffer(), { updateMetadata: false });
      setFile(f);
      setMeta({
        title: d.getTitle() ?? "",
        author: d.getAuthor() ?? "",
        subject: d.getSubject() ?? "",
        keywords: d.getKeywords() ?? "",
        creator: d.getCreator() ?? "",
        producer: d.getProducer() ?? "",
      });
    } catch (e) {
      setError(e instanceof Error ? e.message : "This file couldn't be read as a PDF.");
    }
  };

  const save = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    try {
      const d = await openForEdit(await file.arrayBuffer(), { updateMetadata: false });
      d.setTitle(meta.title, { showInWindowTitleBar: !!meta.title });
      d.setAuthor(meta.author);
      d.setSubject(meta.subject);
      d.setKeywords(meta.keywords.split(",").map((k) => k.trim()).filter(Boolean));
      d.setCreator(meta.creator);
      d.setProducer(meta.producer);
      downloadBlob(pdfBlob(await d.save()), safeName(file.name, "pdf"));
      trackToolUse(slug);
    } catch (e) {
      setError(e instanceof Error ? e.message : "Saving failed.");
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel>
      <Section title="1. Add your PDF">
        <Dropzone accept="application/pdf,.pdf" exts={["pdf"]} maxBytes={PDF_MAX} label={file ? "Choose another PDF" : "Choose PDF file"} hint="One PDF, up to 100 MB." onFiles={(f) => f[0] && load(f[0])} compact={!!file} />
        <ErrorText>{error}</ErrorText>
      </Section>
      {file && (
        <>
          <Section
            title="2. Edit the details"
            aside={
              <button type="button" className="btn-ghost min-h-9 text-sm" onClick={() => setMeta(EMPTY)}>
                Clear all
              </button>
            }
          >
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS.map((f) => (
                <Field key={f.k} label={f.label} htmlFor={`m-${f.k}`} hint={f.hint}>
                  <input id={`m-${f.k}`} className="field" value={meta[f.k]} maxLength={500} onChange={(e) => setMeta((m) => ({ ...m, [f.k]: e.target.value }))} />
                </Field>
              ))}
            </div>
          </Section>
          <Section title="3. Download">
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={save} disabled={busy}>
              <Icon name="download" />
              {busy ? "Saving…" : "Download updated PDF"}
            </button>
          </Section>
        </>
      )}
    </Panel>
  );
}
