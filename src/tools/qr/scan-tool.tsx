"use client";

import { useEffect, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { Dropzone } from "../shared/dropzone";
import { MB } from "../shared/files";
import { ErrorText, Panel, Section } from "../shared/ui";
import { decode } from "../image/process";

type JsQR = typeof import("jsqr").default;

/** Reads a QR code from a canvas; tries the image as-is, then inverted (light-on-dark codes). */
function scan(jsQR: JsQR, c: HTMLCanvasElement) {
  const { data, width, height } = c.getContext("2d", { willReadFrequently: true })!.getImageData(0, 0, c.width, c.height);
  return jsQR(data, width, height, { inversionAttempts: "attemptBoth" })?.data ?? null;
}

const isUrl = (s: string) => /^https?:\/\/\S+$/i.test(s.trim());
const wifi = (s: string) => {
  const m = /^WIFI:(.*);;?$/i.exec(s.trim());
  if (!m) return null;
  const get = (k: string) => new RegExp(`(?:^|;)${k}:((?:\\\\.|[^;])*)`, "i").exec(m[1])?.[1]?.replace(/\\(.)/g, "$1") ?? "";
  return { ssid: get("S"), password: get("P"), type: get("T") || "nopass" };
};

export default function ScanTool({ slug }: ToolProps) {
  const [result, setResult] = useState<string | null>(null);
  const [camera, setCamera] = useState(false);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const video = useRef<HTMLVideoElement>(null);
  const stream = useRef<MediaStream | null>(null);

  const found = (text: string) => {
    setResult(text);
    trackToolUse(slug);
    if (navigator.vibrate) navigator.vibrate(60);
  };

  const stop = () => {
    stream.current?.getTracks().forEach((t) => t.stop());
    stream.current = null;
    setCamera(false);
  };

  // Scan camera frames while the camera is on.
  useEffect(() => {
    if (!camera) return;
    let raf = 0;
    let alive = true;
    const c = document.createElement("canvas");
    import("jsqr").then(({ default: jsQR }) => {
      const tick = () => {
        if (!alive) return;
        const v = video.current;
        if (v && v.readyState >= 2 && v.videoWidth) {
          // Scan a downscaled frame: faster on phones and still plenty for QR codes.
          const k = Math.min(1, 640 / Math.max(v.videoWidth, v.videoHeight));
          c.width = Math.round(v.videoWidth * k);
          c.height = Math.round(v.videoHeight * k);
          c.getContext("2d", { willReadFrequently: true })!.drawImage(v, 0, 0, c.width, c.height);
          const text = scan(jsQR, c);
          if (text) {
            found(text);
            stop();
            return;
          }
        }
        raf = requestAnimationFrame(tick);
      };
      tick();
    });
    return () => {
      alive = false;
      cancelAnimationFrame(raf);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps -- runs per camera session
  }, [camera]);

  useEffect(() => () => stream.current?.getTracks().forEach((t) => t.stop()), []);

  const start = async () => {
    setError("");
    setResult(null);
    if (!navigator.mediaDevices?.getUserMedia) {
      setError(window.isSecureContext ? "This browser can't use the camera. Upload a photo of the QR code instead." : "The camera only works on a secure (https) page. Upload a photo of the QR code instead.");
      return;
    }
    try {
      const s = await navigator.mediaDevices.getUserMedia({ video: { facingMode: { ideal: "environment" } }, audio: false });
      stream.current = s;
      setCamera(true);
      requestAnimationFrame(() => {
        if (video.current) {
          video.current.srcObject = s;
          void video.current.play();
        }
      });
    } catch (e) {
      const name = (e as Error).name;
      setError(name === "NotAllowedError" ? "Camera access was blocked. Allow the camera in your browser settings, or upload a photo instead." : name === "NotFoundError" ? "No camera was found. Upload a photo of the QR code instead." : "The camera couldn't be started. Upload a photo instead.");
    }
  };

  const fromFile = async (f: File) => {
    setError("");
    setResult(null);
    stop();
    try {
      const [{ default: jsQR }, bmp] = await Promise.all([import("jsqr"), decode(f)]);
      const c = document.createElement("canvas");
      // Large photos: scan a ~1200px copy first (faster), then full size if nothing was found.
      for (const max of [1200, Infinity]) {
        const k = Math.min(1, max / Math.max(bmp.width, bmp.height));
        c.width = Math.round(bmp.width * k);
        c.height = Math.round(bmp.height * k);
        c.getContext("2d", { willReadFrequently: true })!.drawImage(bmp, 0, 0, c.width, c.height);
        const text = scan(jsQR, c);
        if (text) return found(text);
        if (k === 1) break;
      }
      setError("No QR code was found in this image. Try a sharper, closer photo with the whole code visible.");
    } catch (e) {
      setError(e instanceof Error ? e.message : "This image couldn't be read.");
    }
  };

  const w = result ? wifi(result) : null;

  return (
    <Panel>
      <Section title="1. Scan a QR code">
        <div className="grid gap-3 sm:grid-cols-2">
          <button type="button" className="btn-primary min-h-14" onClick={camera ? stop : start}>
            <Icon name={camera ? "close" : "qr"} />
            {camera ? "Stop camera" : "Scan with camera"}
          </button>
          <Dropzone accept="image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif" exts={["jpg", "jpeg", "png", "webp", "heic", "heif"]} maxBytes={25 * MB} label="Upload a photo" hint="Or drop or paste a screenshot here." onFiles={(f) => f[0] && fromFile(f[0])} compact />
        </div>
        {camera && (
          <div className="relative mx-auto aspect-square w-full max-w-sm overflow-hidden rounded-lg bg-black">
            <video ref={video} playsInline muted className="h-full w-full object-cover" aria-label="Camera preview" />
            <span aria-hidden="true" className="absolute inset-[18%] rounded-xl border-[3px] border-white/90 shadow-[0_0_0_9999px_rgb(0_0_0/0.35)]" />
            <p className="absolute inset-x-0 bottom-3 text-center text-sm font-medium text-white">Point at a QR code</p>
          </div>
        )}
        <ErrorText>{error}</ErrorText>
      </Section>

      {result !== null && (
        <Section title="2. Result">
          <div aria-live="polite" className="space-y-3">
            {w ? (
              <dl className="grid gap-2 rounded-md bg-surface-2 p-4 sm:grid-cols-3">
                <div>
                  <dt className="text-sm text-muted">Wi-Fi network</dt>
                  <dd className="font-semibold break-all">{w.ssid}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Password</dt>
                  <dd className="num font-semibold break-all">{w.password || "None"}</dd>
                </div>
                <div>
                  <dt className="text-sm text-muted">Security</dt>
                  <dd className="font-semibold">{w.type === "nopass" ? "Open" : w.type}</dd>
                </div>
              </dl>
            ) : (
              <p className="rounded-md bg-surface-2 p-4 text-[1.0625rem] break-all whitespace-pre-wrap">{result}</p>
            )}
            <div className="flex flex-wrap gap-2">
              {isUrl(result) && (
                <a href={result.trim()} target="_blank" rel="noopener noreferrer nofollow" className="btn-primary">
                  Open link
                </a>
              )}
              <button
                type="button"
                className="btn-secondary"
                onClick={async () => {
                  try {
                    await navigator.clipboard.writeText(w?.password || result);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 1500);
                  } catch {}
                }}
              >
                <Icon name={copied ? "check" : "file"} />
                {copied ? "Copied" : w ? "Copy password" : "Copy text"}
              </button>
              <button type="button" className="btn-ghost" onClick={start}>
                Scan another
              </button>
            </div>
            {isUrl(result) && <p className="note-warn">Check the address before you open it. QR codes in public places are sometimes swapped for scam links.</p>}
          </div>
        </Section>
      )}
    </Panel>
  );
}
