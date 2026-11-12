"use client";

import { useState } from "react";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { Panel } from "../shared/ui";
import { countText } from "./logic";

const n = (v: number) => new Intl.NumberFormat("en-US").format(v);
const mins = (m: number) => (m < 1 ? `${Math.max(1, Math.round(m * 60))} sec` : `${Math.round(m)} min`);

export default function WordCounter({ slug }: ToolProps) {
  const [text, setText] = useState("");
  const c = countText(text);
  useTrackWhen(slug, c.words > 20);
  const stats = [
    ["Words", n(c.words)],
    ["Characters", n(c.chars)],
    ["Without spaces", n(c.charsNoSpaces)],
    ["Sentences", n(c.sentences)],
    ["Paragraphs", n(c.paragraphs)],
    ["Reading time", c.words ? mins(c.readMin) : "–"],
  ];
  return (
    <Panel>
      <dl aria-live="polite" className="grid grid-cols-3 gap-px overflow-hidden rounded-md bg-border sm:grid-cols-6">
        {stats.map(([k, v]) => (
          <div key={k} className="bg-surface-2 px-3 py-3 text-center">
            <dd className="num text-[1.375rem] leading-tight font-semibold tracking-[-0.02em]">{v}</dd>
            <dt className="mt-0.5 text-xs text-muted">{k}</dt>
          </div>
        ))}
      </dl>
      <div>
        <label htmlFor="text" className="label">
          Your text
        </label>
        <textarea
          id="text"
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Type or paste your text here. Counts update as you type."
          className="field min-h-72 resize-y py-3 leading-relaxed sm:min-h-96"
          spellCheck
        />
      </div>
      <div className="flex flex-wrap items-center gap-2">
        <button type="button" className="btn-secondary" disabled={!text} onClick={() => setText("")}>
          Clear
        </button>
        <span className="text-sm text-muted">Speaking time: {c.words ? mins(c.speakMin) : "–"}. Your text is not saved or sent anywhere.</span>
      </div>
    </Panel>
  );
}
