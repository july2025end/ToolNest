"use client";

import { useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { Panel } from "../shared/ui";
import { toCase, type CaseId } from "./logic";

const CASES: { id: CaseId; label: string }[] = [
  { id: "sentence", label: "Sentence case" },
  { id: "lower", label: "lower case" },
  { id: "upper", label: "UPPER CASE" },
  { id: "title", label: "Title Case" },
  { id: "capitalized", label: "Capitalized Case" },
  { id: "alternating", label: "aLtErNaTiNg" },
  { id: "camel", label: "camelCase" },
  { id: "snake", label: "snake_case" },
  { id: "kebab", label: "kebab-case" },
];

export default function CaseConverter({ slug }: ToolProps) {
  const [text, setText] = useState("");
  const [last, setLast] = useState<CaseId | null>(null);
  const [copied, setCopied] = useState(false);
  useTrackWhen(slug, !!last);
  const copy = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch {}
  };
  return (
    <Panel>
      <div>
        <label htmlFor="text" className="label">
          Your text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste text, then choose a case below."
          className="field min-h-56 resize-y py-3 leading-relaxed"
        />
      </div>
      <div className="flex flex-wrap gap-2" role="group" aria-label="Convert to">
        {CASES.map((c) => (
          <button
            key={c.id}
            type="button"
            className="chip"
            aria-pressed={last === c.id}
            disabled={!text}
            onClick={() => {
              setText(toCase(text, c.id));
              setLast(c.id);
            }}
          >
            {c.label}
          </button>
        ))}
      </div>
      <div className="flex flex-wrap gap-2">
        <button type="button" className="btn-primary" disabled={!text} onClick={copy}>
          <Icon name={copied ? "check" : "file"} />
          {copied ? "Copied" : "Copy text"}
        </button>
        <button type="button" className="btn-secondary" disabled={!text} onClick={() => setText("")}>
          Clear
        </button>
      </div>
      <p className="sr-only" aria-live="polite">
        {copied ? "Copied to clipboard" : ""}
      </p>
    </Panel>
  );
}
