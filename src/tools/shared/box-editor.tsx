"use client";

import { useEffect, useRef, type KeyboardEvent, type PointerEvent as RPointerEvent } from "react";

/** A rectangle in source-image pixels. */
export type R = { x: number; y: number; w: number; h: number };
type Corner = "nw" | "ne" | "sw" | "se";
const MIN = 16;

/** Largest centred box with the ratio (or 90% of the image when ratio is 0). */
export function fitBox(W: number, H: number, r: number): R {
  if (!r) return { x: W * 0.05, y: H * 0.05, w: W * 0.9, h: H * 0.9 };
  let w = W;
  let h = w / r;
  if (h > H) {
    h = H;
    w = h * r;
  }
  return { x: (W - w) / 2, y: (H - h) / 2, w, h };
}

/** New box when dragging a corner to (px, py); the opposite corner stays put. */
export function dragCorner(start: R, c: Corner, px: number, py: number, W: number, H: number, r: number): R {
  const ax = c.includes("w") ? start.x + start.w : start.x;
  const ay = c.includes("n") ? start.y + start.h : start.y;
  let w = Math.max(MIN, c.includes("w") ? ax - Math.max(0, px) : Math.min(W, px) - ax);
  let h = Math.max(MIN, c.includes("n") ? ay - Math.max(0, py) : Math.min(H, py) - ay);
  if (r) {
    if (w / h > r) w = h * r;
    else h = w / r;
  }
  return { x: c.includes("w") ? ax - w : ax, y: c.includes("n") ? ay - h : ay, w, h };
}

const clampMove = (b: R, x: number, y: number, W: number, H: number): R => ({ ...b, x: Math.min(W - b.w, Math.max(0, x)), y: Math.min(H - b.h, Math.max(0, y)) });

type Props = {
  /** What to show under the boxes. Redrawn whenever `version` changes. */
  source: ImageBitmap | HTMLCanvasElement;
  version?: number;
  boxes: R[];
  selected: number;
  onSelect: (i: number) => void;
  onChange: (i: number, b: R) => void;
  /** Aspect ratio (w/h) to keep while resizing; 0 = free. */
  ratio?: number;
  /** Darken everything outside the (single) box, for cropping. */
  shade?: boolean;
  /** Lets people drag on empty space to draw a new box. */
  onDraw?: (b: R) => void;
  label: (b: R, i: number) => string;
};

/** Image with draggable, resizable boxes. Works with touch, mouse and keyboard (arrows move, Shift+arrows resize). */
export function BoxEditor({ source, version = 0, boxes, selected, onSelect, onChange, ratio = 0, shade, onDraw, label }: Props) {
  const canvas = useRef<HTMLCanvasElement>(null);
  const drag = useRef<{ i: number; h: Corner | "move" | "draw"; sx: number; sy: number; start: R } | null>(null);
  const W = source.width;
  const H = source.height;

  useEffect(() => {
    const c = canvas.current;
    if (!c) return;
    c.width = W;
    c.height = H;
    c.getContext("2d")!.drawImage(source, 0, 0);
  }, [source, version, W, H]);

  const at = (e: RPointerEvent) => {
    const r = canvas.current!.getBoundingClientRect();
    return { x: Math.min(W, Math.max(0, ((e.clientX - r.left) / r.width) * W)), y: Math.min(H, Math.max(0, ((e.clientY - r.top) / r.height) * H)) };
  };
  // One set of handlers on the container; data-box / data-h on the target say what was grabbed.
  const target = (e: { target: EventTarget }) => {
    const el = (e.target as HTMLElement).closest<HTMLElement>("[data-box]");
    const h: Corner | "move" = ((e.target as HTMLElement).dataset.h as Corner | undefined) ?? "move";
    return el ? { i: +el.dataset.box!, h } : null;
  };
  const begin = (e: RPointerEvent) => {
    const t = target(e);
    if (!t && !onDraw) return;
    const i = t?.i ?? -1;
    const h = t?.h ?? "draw";
    e.preventDefault();
    (e.currentTarget as Element).setPointerCapture(e.pointerId);
    const p = at(e);
    if (h === "draw") {
      const b = { x: p.x, y: p.y, w: 1, h: 1 };
      onDraw!(b);
      drag.current = { i: boxes.length, h, sx: p.x, sy: p.y, start: b };
    } else {
      onSelect(i);
      drag.current = { i, h, sx: p.x, sy: p.y, start: boxes[i] };
    }
  };
  const move = (e: RPointerEvent) => {
    const d = drag.current;
    if (!d) return;
    const p = at(e);
    if (d.h === "move") onChange(d.i, clampMove(d.start, d.start.x + p.x - d.sx, d.start.y + p.y - d.sy, W, H));
    else if (d.h === "draw") onChange(d.i, { x: Math.min(p.x, d.sx), y: Math.min(p.y, d.sy), w: Math.max(1, Math.abs(p.x - d.sx)), h: Math.max(1, Math.abs(p.y - d.sy)) });
    else onChange(d.i, dragCorner(d.start, d.h, p.x, p.y, W, H, ratio));
  };
  const end = () => {
    const d = drag.current;
    drag.current = null;
    // A tap without a drag makes a tiny box: give it a usable default size.
    if (d?.h === "draw") {
      const b = boxes[d.i];
      if (b && (b.w < MIN || b.h < MIN)) {
        const s = Math.min(W, H) * 0.2;
        onChange(d.i, clampMove({ x: 0, y: 0, w: s, h: s }, b.x - s / 2, b.y - s / 2, W, H));
      }
      onSelect(d.i);
    }
  };
  const key = (e: KeyboardEvent) => {
    const t = target(e);
    if (!t) return;
    const i = t.i;
    const k = ({ ArrowLeft: [-1, 0], ArrowRight: [1, 0], ArrowUp: [0, -1], ArrowDown: [0, 1] } as Record<string, number[]>)[e.key];
    if (!k) return;
    e.preventDefault();
    const b = boxes[i];
    const step = Math.max(1, Math.round(W / 100));
    onChange(i, e.shiftKey ? dragCorner(b, "se", b.x + b.w + k[0] * step, b.y + b.h + k[1] * step, W, H, ratio) : clampMove(b, b.x + k[0] * step, b.y + k[1] * step, W, H));
  };
  const pct = (v: number, of: number) => `${(v / of) * 100}%`;
  const pos = (b: R) => ({ left: pct(b.x, W), top: pct(b.y, H), width: pct(b.w, W), height: pct(b.h, H) });

  return (
    <div className="flex justify-center rounded-md bg-surface-2 p-2 sm:p-4">
      <div
        className={`relative inline-block max-w-full touch-none select-none ${onDraw ? "cursor-crosshair" : ""}`}
        onPointerDown={begin}
        onPointerMove={move}
        onKeyDown={key}
        onFocus={(e) => {
          const t = target(e);
          if (t) onSelect(t.i);
        }}
        onPointerUp={end}
        onPointerCancel={end}
      >
        <canvas ref={canvas} className="block h-auto max-h-[65vh] w-auto max-w-full" />
        {shade && boxes[0] && (
          <div className="pointer-events-none absolute inset-0 overflow-hidden" aria-hidden="true">
            <div className="absolute shadow-[0_0_0_9999px_rgb(0_0_0/0.5)]" style={pos(boxes[0])} />
          </div>
        )}
        {boxes.map((b, i) => (
          <div
            key={i}
            data-box={i}
            role="group"
            tabIndex={0}
            aria-label={label(b, i)}
            className={`absolute cursor-move ${i === selected ? "outline-2 outline-white" : "outline-1 outline-dashed outline-white/80"}`}
            style={pos(b)}
          >
            {shade && <span className="pointer-events-none absolute inset-0 bg-[linear-gradient(to_right,transparent_33.2%,rgb(255_255_255/.45)_33.3%,transparent_33.5%,transparent_66.5%,rgb(255_255_255/.45)_66.6%,transparent_66.8%),linear-gradient(to_bottom,transparent_33.2%,rgb(255_255_255/.45)_33.3%,transparent_33.5%,transparent_66.5%,rgb(255_255_255/.45)_66.6%,transparent_66.8%)]" />}
            {i === selected &&
              (["nw", "ne", "sw", "se"] as const).map((c) => (
                <span
                  key={c}
                  data-h={c}
                  aria-hidden="true"
                  className={`absolute flex h-7 w-7 items-center justify-center ${c.includes("n") ? "-top-3.5" : "-bottom-3.5"} ${c.includes("w") ? "-left-3.5" : "-right-3.5"} ${c === "nw" || c === "se" ? "cursor-nwse-resize" : "cursor-nesw-resize"}`}
                >
                  <span className="pointer-events-none h-4 w-4 rounded-full border-2 border-white bg-accent shadow" />
                </span>
              ))}
          </div>
        ))}
      </div>
    </div>
  );
}
