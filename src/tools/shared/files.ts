export const MB = 1024 * 1024;

export function formatBytes(n: number) {
  if (n < 1024) return `${n} B`;
  if (n < MB) return `${(n / 1024).toFixed(n < 10 * 1024 ? 1 : 0)} KB`;
  return `${(n / MB).toFixed(2)} MB`;
}

/** Safe download name: strips path chars and control characters, keeps it short. */
export function safeName(name: string, ext?: string) {
  const base = name.replace(/\.[^.]+$/, "").replace(/[^\p{L}\p{N}._ -]+/gu, "_").trim().slice(0, 80) || "file";
  return ext ? `${base}.${ext}` : base;
}

export function downloadBlob(blob: Blob, name: string) {
  const url = URL.createObjectURL(blob);
  const a = document.createElement("a");
  a.href = url;
  a.download = name;
  document.body.appendChild(a);
  a.click();
  a.remove();
  setTimeout(() => URL.revokeObjectURL(url), 10_000);
}

/** Zips files in the browser (fflate, loaded on demand). Names are de-duplicated. */
export async function zipBlobs(files: { name: string; blob: Blob }[]) {
  const { zipSync } = await import("fflate");
  const used = new Set<string>();
  const entries: Record<string, [Uint8Array, { level: 0 }]> = {};
  for (const f of files) {
    let name = f.name;
    for (let i = 2; used.has(name); i++) name = f.name.replace(/(\.[^.]+)?$/, `-${i}$1`);
    used.add(name);
    // Already-compressed formats: store without recompressing.
    entries[name] = [new Uint8Array(await f.blob.arrayBuffer()), { level: 0 }];
  }
  const out = zipSync(entries);
  return new Blob([out as BlobPart], { type: "application/zip" });
}

export const extOf = (name: string) => name.split(".").pop()?.toLowerCase() ?? "";
