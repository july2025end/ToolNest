"use client";

import { useEffect, useId, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import { extOf, formatBytes } from "./files";

type Props = {
  /** Accept string for the file input, e.g. "image/png,.heic". */
  accept: string;
  /** Extensions allowed (lowercase, no dot), used to validate dropped/pasted files. */
  exts: string[];
  multiple?: boolean;
  maxFiles?: number;
  maxBytes: number;
  label: string;
  hint: string;
  onFiles: (files: File[]) => void;
  compact?: boolean;
};

/** Drag-and-drop + file picker + paste (Ctrl/Cmd+V). Reports clear errors for bad files. */
export function Dropzone({ accept, exts, multiple, maxFiles = 1, maxBytes, label, hint, onFiles, compact }: Props) {
  const [over, setOver] = useState(false);
  const [error, setError] = useState("");
  const input = useRef<HTMLInputElement>(null);
  const id = useId();
  const onFilesRef = useRef(onFiles);
  useEffect(() => {
    onFilesRef.current = onFiles;
  });

  const take = (list: FileList | File[] | null) => {
    if (!list) return;
    const files = Array.from(list);
    const errs: string[] = [];
    const ok = files.filter((f) => {
      if (!exts.includes(extOf(f.name)) && !exts.some((e) => f.type.endsWith(`/${e}`))) {
        errs.push(`${f.name}: unsupported file type. Use ${exts.map((e) => e.toUpperCase()).join(", ")}.`);
        return false;
      }
      if (f.size > maxBytes) {
        errs.push(`${f.name} is ${formatBytes(f.size)}. The limit is ${formatBytes(maxBytes)}.`);
        return false;
      }
      return true;
    });
    const limit = multiple ? maxFiles : 1;
    if (ok.length > limit) errs.push(`Only the first ${limit} file${limit > 1 ? "s" : ""} were added.`);
    setError(errs.join(" "));
    if (ok.length) onFilesRef.current(ok.slice(0, limit));
  };
  const takeRef = useRef(take);
  useEffect(() => {
    takeRef.current = take;
  });

  // Paste anywhere on the page.
  useEffect(() => {
    const onPaste = (e: ClipboardEvent) => {
      const files = Array.from(e.clipboardData?.files ?? []);
      if (!files.length) return;
      e.preventDefault();
      // Pasted screenshots are often named "image.png"; give them a better name.
      takeRef.current(files.map((f) => (f.name === "image.png" ? new File([f], `pasted-${Date.now()}.png`, { type: f.type }) : f)));
    };
    window.addEventListener("paste", onPaste);
    return () => window.removeEventListener("paste", onPaste);
  }, []);

  return (
    <div>
      <div
        onDragOver={(e) => {
          e.preventDefault();
          setOver(true);
        }}
        onDragLeave={() => setOver(false)}
        onDrop={(e) => {
          e.preventDefault();
          setOver(false);
          take(e.dataTransfer.files);
        }}
        className={`flex flex-col items-center justify-center rounded-md border-[1.5px] border-dashed text-center ${
          compact ? "gap-2 px-4 py-6" : "gap-3 px-4 py-12"
        } ${over ? "border-accent bg-accent-soft" : error ? "border-danger bg-surface-2" : "border-control bg-surface-2"}`}
      >
        {!compact && <Icon name="upload" size={28} className="text-accent" />}
        <button type="button" className="btn-primary" onClick={() => input.current?.click()} aria-describedby={`${id}-hint`}>
          {label}
        </button>
        <p id={`${id}-hint`} className="text-sm text-muted">
          {hint}
          <span className="hidden sm:inline"> You can also drop or paste files here.</span>
        </p>
        <input
          ref={input}
          type="file"
          accept={accept}
          multiple={multiple}
          className="sr-only"
          tabIndex={-1}
          aria-hidden="true"
          onChange={(e) => {
            take(e.target.files);
            e.target.value = "";
          }}
        />
      </div>
      <p role="alert" className={error ? "mt-2 text-sm text-danger" : "sr-only"}>
        {error}
      </p>
    </div>
  );
}
