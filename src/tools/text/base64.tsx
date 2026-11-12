"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { Dropzone } from "../shared/dropzone";
import { formatBytes, MB } from "../shared/files";
import { Choice, Panel } from "../shared/ui";

// UTF-8 safe: emoji and non-Latin text round-trip correctly (plain btoa/atob would fail on them).
const enc = (s: string, url: boolean) => {
  let b = "";
  new TextEncoder().encode(s).forEach((c) => (b += String.fromCharCode(c)));
  const out = btoa(b);
  return url ? out.replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "") : out;
};
const dec = (s: string) => {
  const clean = s.trim().replace(/^data:[^,]*,/, "").replace(/\s+/g, "").replace(/-/g, "+").replace(/_/g, "/");
  const bin = atob(clean + "=".repeat((4 - (clean.length % 4)) % 4));
  return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(bin, (c) => c.charCodeAt(0)));
};

export default function Base64Tool({ slug }: ToolProps) {
  const [mode, setMode] = useState<"encode" | "decode">("encode");
  const [input, setInput] = useState("");
  const [url, setUrl] = useState(false);
  const [copied, setCopied] = useState(false);
  const [fileOut, setFileOut] = useState("");
  let output = "";
  let error = "";
  try {
    output = input ? (mode === "encode" ? enc(input, url) : dec(input)) : "";
  } catch {
    error = "This isn't valid Base64 text, or it decodes to a file rather than text.";
  }
  useTrackWhen(slug, !!output && input.length > 3);
  const shown = fileOut || output;
  return (
    <Panel>
      <Choice name="b64mode" label="Mode" hideLabel value={mode} onChange={(v) => { setMode(v); setInput(""); setFileOut(""); }} options={[{ value: "encode", label: "Encode to Base64" }, { value: "decode", label: "Decode from Base64" }]} />
      <div className="grid gap-4 lg:grid-cols-2">
        <div>
          <label htmlFor="b64-in" className="label">
            {mode === "encode" ? "Text" : "Base64"}
          </label>
          <textarea id="b64-in" spellCheck={false} value={input} onChange={(e) => { setInput(e.target.value); setFileOut(""); }} className="field min-h-56 resize-y py-3 font-mono text-[0.875rem]" placeholder={mode === "encode" ? "Type or paste text" : "Paste Base64, e.g. SGVsbG8="} />
        </div>
        <div>
          <label htmlFor="b64-out" className="label">
            {mode === "encode" ? "Base64" : "Text"}
          </label>
          <textarea id="b64-out" readOnly value={shown} className="field min-h-56 resize-y bg-surface-2 py-3 font-mono text-[0.875rem]" aria-describedby="b64-err" />
          <p id="b64-err" role="alert" className="mt-1 text-sm text-danger">
            {error}
          </p>
        </div>
      </div>
      <div className="flex flex-wrap items-center gap-3">
        <button
          type="button"
          className="btn-primary"
          disabled={!shown}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(shown);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
        >
          <Icon name={copied ? "check" : "file"} />
          {copied ? "Copied" : "Copy result"}
        </button>
        {mode === "encode" && (
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={url} onChange={(e) => setUrl(e.target.checked)} />
            URL-safe (- and _ instead of + and /)
          </label>
        )}
      </div>
      {mode === "encode" && (
        <Dropzone
          accept="*/*"
          exts={["jpg", "jpeg", "png", "gif", "webp", "svg", "pdf", "txt", "json", "csv", "ico", "woff2"]}
          maxBytes={5 * MB}
          label="Encode a file instead"
          hint="Images, PDFs or small files up to 5 MB. Gives a data: URL you can paste into HTML or CSS."
          compact
          onFiles={(f) => {
            const r = new FileReader();
            r.onload = () => {
              setInput("");
              setFileOut(String(r.result));
            };
            if (f[0]) r.readAsDataURL(f[0]);
          }}
        />
      )}
      {fileOut && <p className="num text-sm text-muted">Data URL length: {formatBytes(fileOut.length)}</p>}
    </Panel>
  );
}
