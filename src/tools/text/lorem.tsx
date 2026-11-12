"use client";

import { useEffect, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { useTrackWhen } from "../finance/shared";
import { Choice, IntInput, Panel } from "../shared/ui";

const WORDS = "lorem ipsum dolor sit amet consectetur adipiscing elit sed do eiusmod tempor incididunt ut labore et dolore magna aliqua enim ad minim veniam quis nostrud exercitation ullamco laboris nisi aliquip ex ea commodo consequat duis aute irure in reprehenderit voluptate velit esse cillum fugiat nulla pariatur excepteur sint occaecat cupidatat non proident sunt culpa qui officia deserunt mollit anim id est laborum".split(" ");
const pick = () => WORDS[Math.floor(Math.random() * WORDS.length)];
const sentence = () => {
  const n = 8 + Math.floor(Math.random() * 10);
  const w = Array.from({ length: n }, pick);
  if (n > 10) w[Math.floor(n / 2)] += ",";
  const s = w.join(" ");
  return s[0].toUpperCase() + s.slice(1) + ".";
};
const paragraph = () => Array.from({ length: 4 + Math.floor(Math.random() * 3) }, sentence).join(" ");
const START = "Lorem ipsum dolor sit amet, consectetur adipiscing elit.";

function make(kind: "p" | "s" | "w", n: number, classic: boolean) {
  if (kind === "w") {
    const w = Array.from({ length: n }, pick);
    if (classic) w.splice(0, Math.min(5, n), ...WORDS.slice(0, Math.min(5, n)));
    return w.join(" ").replace(/^./, (c) => c.toUpperCase());
  }
  const list = Array.from({ length: n }, kind === "p" ? paragraph : sentence);
  if (classic) list[0] = kind === "p" ? `${START} ${list[0]}` : START;
  return list.join(kind === "p" ? "\n\n" : " ");
}

export default function LoremTool({ slug }: ToolProps) {
  const [kind, setKind] = useState<"p" | "s" | "w">("p");
  const [n, setN] = useState(3);
  const [classic, setClassic] = useState(true);
  const [html, setHtml] = useState(false);
  const [text, setText] = useState("");
  const [copied, setCopied] = useState(false);
  // Random text only in the browser, so server and client markup match.
  useEffect(() => {
    // eslint-disable-next-line react-hooks/set-state-in-effect -- randomness must come from the client
    setText(make(kind, n, classic));
  }, [kind, n, classic]);
  useTrackWhen(slug, copied);
  const out = html && kind === "p" ? text.split("\n\n").map((p) => `<p>${p}</p>`).join("\n") : text;
  return (
    <Panel>
      <div className="flex flex-wrap items-end gap-x-6 gap-y-3">
        <Choice name="kind" label="Generate" value={kind} onChange={(v) => { setKind(v); setN(v === "p" ? 3 : v === "s" ? 5 : 50); }} options={[{ value: "p", label: "Paragraphs" }, { value: "s", label: "Sentences" }, { value: "w", label: "Words" }]} />
        <div>
          <label htmlFor="lorem-n" className="label">
            How many
          </label>
          <IntInput id="lorem-n" min={1} max={kind === "w" ? 2000 : 50} value={n} onChange={setN} className="field num w-24" />
        </div>
      </div>
      <div className="flex flex-wrap gap-x-6">
        <label className="flex min-h-11 items-center gap-2 text-sm">
          <input type="checkbox" checked={classic} onChange={(e) => setClassic(e.target.checked)} />
          Start with &ldquo;Lorem ipsum dolor sit amet&rdquo;
        </label>
        {kind === "p" && (
          <label className="flex min-h-11 items-center gap-2 text-sm">
            <input type="checkbox" checked={html} onChange={(e) => setHtml(e.target.checked)} />
            Wrap in &lt;p&gt; tags
          </label>
        )}
      </div>
      <label htmlFor="lorem-out" className="sr-only">
        Generated text
      </label>
      <textarea id="lorem-out" readOnly value={out} className="field min-h-72 resize-y bg-surface-2 py-3 leading-relaxed" />
      <div className="flex flex-wrap gap-2">
        <button
          type="button"
          className="btn-primary"
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(out);
              setCopied(true);
              setTimeout(() => setCopied(false), 1500);
            } catch {}
          }}
        >
          <Icon name={copied ? "check" : "file"} />
          {copied ? "Copied" : "Copy text"}
        </button>
        <button type="button" className="btn-secondary" onClick={() => setText(make(kind, n, classic))}>
          <Icon name="rotate" />
          Generate again
        </button>
      </div>
    </Panel>
  );
}
