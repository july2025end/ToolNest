"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { downloadBlob, formatBytes, safeName } from "../shared/files";
import { PDF_MAX, pdfBlob } from "../shared/pdf";
import { ErrorText, Field, Panel, Progress, Section } from "../shared/ui";

type Mode = "unlock" | "protect" | "flatten";

let seq = 0;
/** Runs qpdf (public/qpdf.worker.js) on a PDF. Rejects with { code, message }. */
function qpdf(bytes: ArrayBuffer, args: string[]) {
  return new Promise<Uint8Array>((resolve, reject) => {
    const w = new Worker("/qpdf.worker.js");
    const id = ++seq;
    w.onmessage = ({ data }) => {
      if (data.id !== id) return;
      w.terminate();
      if (data.error) reject(Object.assign(new Error(data.error), { code: data.code as number | undefined }));
      else resolve(new Uint8Array(data.bytes));
    };
    w.onerror = () => {
      w.terminate();
      reject(new Error("The PDF engine failed to load. Check your connection and try again."));
    };
    w.postMessage({ id, bytes, args }, [bytes]);
  });
}

const COPY: Record<Mode, { button: string; busy: string; suffix: string }> = {
  unlock: { button: "Unlock PDF", busy: "Unlocking…", suffix: "unlocked" },
  protect: { button: "Protect PDF", busy: "Encrypting…", suffix: "protected" },
  flatten: { button: "Flatten PDF", busy: "Flattening…", suffix: "flattened" },
};

export default function QpdfTool({ slug, mode }: ToolProps & { mode: Mode }) {
  const [file, setFile] = useState<File | null>(null);
  const [pw, setPw] = useState("");
  const [pw2, setPw2] = useState("");
  const [show, setShow] = useState(false);
  const [busy, setBusy] = useState(false);
  const [error, setError] = useState("");
  const [done, setDone] = useState<{ blob: Blob; name: string } | null>(null);
  const c = COPY[mode];
  const mismatch = mode === "protect" && pw2 !== "" && pw !== pw2;
  const canRun = !!file && !busy && (mode !== "protect" || (pw.length >= 4 && pw === pw2));

  const run = async () => {
    if (!file) return;
    setBusy(true);
    setError("");
    setDone(null);
    try {
      // Args stay inside this device: the password never leaves the browser.
      const args =
        mode === "unlock"
          ? [`--password=${pw}`, "--decrypt", "/in.pdf", "/out.pdf"]
          : mode === "protect"
            ? ["/in.pdf", "--encrypt", pw, pw, "256", "--", "/out.pdf"]
            : ["--flatten-annotations=all", "--generate-appearances", "/in.pdf", "/out.pdf"];
      const out = await qpdf(await file.arrayBuffer(), args);
      const blob = pdfBlob(out);
      setDone({ blob, name: safeName(file.name.replace(/\.pdf$/i, "") + "-" + c.suffix, "pdf") });
      trackToolUse(slug);
    } catch (e) {
      const err = e as Error & { code?: number };
      const msg = err.message || "";
      setError(
        /invalid password/i.test(msg) || (mode === "unlock" && err.code === 2)
          ? pw
            ? "That password is not correct. Check it and try again."
            : "This PDF needs a password to open. Enter it above and try again."
          : /not a PDF|can't find PDF header|unable to find trailer/i.test(msg)
            ? "This file couldn't be read as a PDF. It may be damaged."
            : msg.startsWith("The PDF engine")
              ? msg
              : "Something went wrong while processing this PDF. It may be damaged.",
      );
    } finally {
      setBusy(false);
    }
  };

  return (
    <Panel>
      <Section title="1. Add your PDF">
        <Dropzone
          accept="application/pdf,.pdf"
          exts={["pdf"]}
          maxBytes={PDF_MAX}
          label={file ? "Choose another PDF" : "Choose PDF file"}
          hint="One PDF, up to 100 MB. You can also drop it here."
          onFiles={(f) => {
            if (!f[0]) return;
            setFile(f[0]);
            setDone(null);
            setError("");
          }}
          compact={!!file}
        />
        {file && (
          <p className="flex items-center gap-2 text-sm">
            <Icon name="file" size={18} className="text-muted" />
            <span className="font-medium break-all">{file.name}</span>
            <span className="num text-muted">{formatBytes(file.size)}</span>
          </p>
        )}
      </Section>

      {file && mode !== "flatten" && (
        <Section title={mode === "unlock" ? "2. Enter the password" : "2. Choose a password"}>
          <div className="grid max-w-xl gap-4 sm:grid-cols-2">
            <Field label={mode === "unlock" ? "Password" : "New password"} htmlFor="pw" hint={mode === "unlock" ? "Leave empty if the PDF opens without one but can't be printed or copied." : "At least 4 characters. Anyone with it can open the PDF."}>
              <input id="pw" type={show ? "text" : "password"} className="field" value={pw} autoComplete={mode === "unlock" ? "current-password" : "new-password"} onChange={(e) => setPw(e.target.value)} onKeyDown={(e) => e.key === "Enter" && canRun && run()} />
            </Field>
            {mode === "protect" && (
              <Field label="Repeat password" htmlFor="pw2">
                <input id="pw2" type={show ? "text" : "password"} className={`field ${mismatch ? "border-danger" : ""}`} value={pw2} autoComplete="new-password" aria-invalid={mismatch || undefined} onChange={(e) => setPw2(e.target.value)} />
                {mismatch && <p className="mt-1 text-sm text-danger">The passwords don&rsquo;t match.</p>}
              </Field>
            )}
          </div>
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={show} onChange={(e) => setShow(e.target.checked)} />
            Show password
          </label>
        </Section>
      )}

      {file && (
        <Section title={mode === "flatten" ? "2. Flatten" : "3. Download"}>
          {busy ? (
            <Progress value={null} label={c.busy} />
          ) : done ? (
            <div className="flex flex-wrap items-center gap-3">
              <button type="button" className="btn-primary w-full sm:w-auto" onClick={() => downloadBlob(done.blob, done.name)}>
                <Icon name="download" />
                Download {done.name}
              </button>
              <span className="num text-sm text-muted">{formatBytes(done.blob.size)}</span>
            </div>
          ) : (
            <button type="button" className="btn-primary w-full sm:w-auto" onClick={run} disabled={!canRun}>
              <Icon name={mode === "flatten" ? "file" : "lock"} />
              {c.button}
            </button>
          )}
          <ErrorText>{error}</ErrorText>
          <p className="note">Your PDF and password stay on this device. Nothing is uploaded.</p>
        </Section>
      )}
    </Panel>
  );
}
