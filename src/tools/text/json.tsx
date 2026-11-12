"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { downloadBlob } from "../shared/files";
import { Choice, Panel } from "../shared/ui";

/** Line and column of a JSON.parse error, from the "position N" in the message. */
function where(src: string, msg: string) {
  const pos = /position (\d+)/.exec(msg)?.[1];
  if (pos === undefined) return "";
  const before = src.slice(0, +pos);
  const line = before.split("\n").length;
  return ` (line ${line}, column ${+pos - before.lastIndexOf("\n")})`;
}

export default function JsonTool({ slug }: ToolProps) {
  const [text, setText] = useState("");
  const [indent, setIndent] = useState<"2" | "4" | "tab">("2");
  const [error, setError] = useState("");
  const [ok, setOk] = useState("");
  const [copied, setCopied] = useState(false);
  useTrackWhen(slug, !!ok);
  const apply = (mode: "format" | "minify" | "sort") => {
    setOk("");
    try {
      let v = JSON.parse(text);
      if (mode === "sort") {
        const sort = (x: unknown): unknown => (Array.isArray(x) ? x.map(sort) : x && typeof x === "object" ? Object.fromEntries(Object.keys(x).sort().map((k) => [k, sort((x as Record<string, unknown>)[k])])) : x);
        v = sort(v);
      }
      setText(JSON.stringify(v, null, mode === "minify" ? undefined : indent === "tab" ? "\t" : +indent));
      setError("");
      setOk(mode === "minify" ? "Minified. Valid JSON." : "Formatted. Valid JSON.");
    } catch (e) {
      setError(`Not valid JSON: ${(e as Error).message.replace(/^JSON\.parse: /, "")}${where(text, (e as Error).message)}.`);
    }
  };
  return (
    <Panel>
      <div>
        <label htmlFor="json" className="label">
          JSON
        </label>
        <textarea id="json" spellCheck={false} autoCapitalize="off" autoCorrect="off" value={text} onChange={(e) => { setText(e.target.value); setOk(""); setError(""); }} placeholder='Paste JSON here, e.g. {"name":"ToolNest","free":true}' className="field min-h-80 resize-y py-3 font-mono text-[0.875rem] leading-relaxed" aria-invalid={!!error || undefined} aria-describedby="json-msg" />
        <p id="json-msg" role="status" className={`mt-2 text-sm ${error ? "text-danger" : "text-accent"}`}>
          {error || ok}
        </p>
      </div>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Choice name="indent" label="Indent" value={indent} onChange={setIndent} options={[{ value: "2", label: "2 spaces" }, { value: "4", label: "4 spaces" }, { value: "tab", label: "Tab" }]} />
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" disabled={!text.trim()} onClick={() => apply("format")}>
          Format &amp; validate
        </button>
        <button type="button" className="btn-secondary" disabled={!text.trim()} onClick={() => apply("minify")}>
          Minify
        </button>
        <button type="button" className="btn-secondary" disabled={!text.trim()} onClick={() => apply("sort")}>
          Sort keys
        </button>
        <button
          type="button"
          className="btn-ghost"
          disabled={!text}
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(text);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
        >
          <Icon name={copied ? "check" : "file"} />
          {copied ? "Copied" : "Copy"}
        </button>
        <button type="button" className="btn-ghost" disabled={!text} onClick={() => downloadBlob(new Blob([text], { type: "application/json" }), "data.json")}>
          <Icon name="download" />
          Download
        </button>
      </div>
      <p className="note">Your JSON is checked in your browser and never sent anywhere, so it is safe to paste API responses and config files.</p>
    </Panel>
  );
}
