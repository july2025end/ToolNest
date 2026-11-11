"use client";

import qrcode from "qrcode-generator";
import { useMemo, useRef, useState } from "react";
import { Icon } from "@/components/icons";
import type { ToolProps } from "@/components/tool-renderer";
import { trackToolUse } from "@/lib/supabase";
import { downloadBlob } from "../shared/files";
import { Choice, Field, Panel, Section } from "../shared/ui";
import { buildPayload, contrast, isInverted, type QrFields, type QrType } from "./payload";

type Ec = "L" | "M" | "Q" | "H";

const TYPES: { value: QrType; label: string }[] = [
  { value: "url", label: "Link" },
  { value: "text", label: "Text" },
  { value: "wifi", label: "Wi-Fi" },
  { value: "vcard", label: "Contact" },
  { value: "email", label: "Email" },
  { value: "phone", label: "Phone" },
  { value: "sms", label: "SMS" },
  { value: "whatsapp", label: "WhatsApp" },
];

type Input = { k: string; label: string; type?: string; area?: boolean; auto?: string; mode?: "tel" | "email" | "url"; placeholder?: string; full?: boolean };
const FIELDS: Record<QrType, Input[]> = {
  url: [{ k: "url", label: "Website address", type: "url", mode: "url", placeholder: "https://example.com", full: true }],
  text: [{ k: "text", label: "Text", area: true, full: true }],
  wifi: [
    { k: "ssid", label: "Network name (SSID)", auto: "off" },
    { k: "password", label: "Password", auto: "off" },
  ],
  vcard: [
    { k: "first", label: "First name", auto: "given-name" },
    { k: "last", label: "Last name", auto: "family-name" },
    { k: "phone", label: "Phone", type: "tel", mode: "tel", auto: "tel" },
    { k: "email", label: "Email", type: "email", mode: "email", auto: "email" },
    { k: "org", label: "Company", auto: "organization" },
    { k: "title", label: "Job title", auto: "organization-title" },
    { k: "website", label: "Website", type: "url", mode: "url", auto: "url" },
    { k: "street", label: "Street", auto: "street-address" },
    { k: "city", label: "City", auto: "address-level2" },
    { k: "zip", label: "Postcode", auto: "postal-code" },
    { k: "country", label: "Country", auto: "country-name" },
  ],
  email: [
    { k: "to", label: "Email address", type: "email", mode: "email", full: true },
    { k: "subject", label: "Subject", full: true },
    { k: "body", label: "Message", area: true, full: true },
  ],
  phone: [{ k: "phone", label: "Phone number (with country code)", type: "tel", mode: "tel", placeholder: "+1 555 123 4567", full: true }],
  sms: [
    { k: "phone", label: "Phone number", type: "tel", mode: "tel", placeholder: "+1 555 123 4567", full: true },
    { k: "message", label: "Message", area: true, full: true },
  ],
  whatsapp: [
    { k: "phone", label: "WhatsApp number with country code", type: "tel", mode: "tel", placeholder: "+92 300 1234567", full: true },
    { k: "message", label: "Pre-filled message (optional)", area: true, full: true },
  ],
};

/** UTF-8 bytes as a "binary string", since the library's default encoder is Latin-1. */
const utf8 = (s: string) => Array.from(new TextEncoder().encode(s), (b) => String.fromCharCode(b)).join("");

function makeSvg(data: string, ec: Ec, fg: string, bg: string, margin: number, logo: string | null) {
  const qr = qrcode(0, ec);
  qr.addData(utf8(data), "Byte");
  qr.make();
  const n = qr.getModuleCount();
  const total = n + margin * 2;
  let d = "";
  for (let r = 0; r < n; r++) for (let c = 0; c < n; c++) if (qr.isDark(r, c)) d += `M${c + margin} ${r + margin}h1v1h-1z`;
  let logoEl = "";
  if (logo) {
    const s = n * 0.22;
    const pad = 0.8;
    const o = (total - s) / 2;
    logoEl = `<rect x="${o - pad}" y="${o - pad}" width="${s + pad * 2}" height="${s + pad * 2}" rx="1" fill="${bg}"/><image href="${logo}" x="${o}" y="${o}" width="${s}" height="${s}" preserveAspectRatio="xMidYMid meet"/>`;
  }
  return `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${total} ${total}" shape-rendering="crispEdges"><rect width="100%" height="100%" fill="${bg}"/><path d="${d}" fill="${fg}"/>${logoEl}</svg>`;
}

/** Chrome's createImageBitmap can't decode SVG files, so SVG logos go through an <img>. */
async function svgImage(file: File) {
  const url = URL.createObjectURL(file);
  try {
    const img = new Image();
    img.src = url;
    await img.decode();
    // SVGs without width/height report 0×0; rasterise them at 256 px.
    if (!img.naturalWidth || !img.naturalHeight) {
      img.width = img.height = 256;
    } else {
      img.width = img.naturalWidth;
      img.height = img.naturalHeight;
    }
    return img;
  } finally {
    URL.revokeObjectURL(url);
  }
}

const svgUrl = (svg: string) => `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svg)}`;

export default function QrTool({ slug, preset }: ToolProps) {
  const [type, setType] = useState<QrType>((preset as { qrType?: QrType } | undefined)?.qrType ?? "url");
  const [fields, setFields] = useState<QrFields>({ enc: "WPA" });
  const [fg, setFg] = useState("#111111");
  const [bg, setBg] = useState("#ffffff");
  const [size, setSize] = useState(512);
  const [margin, setMargin] = useState(4);
  const [ecChoice, setEc] = useState<Ec>("M");
  const [logo, setLogo] = useState<string | null>(null);
  const [logoError, setLogoError] = useState("");
  const tracked = useRef(false);

  const ec: Ec = logo ? "H" : ecChoice;
  const payload = buildPayload(type, fields);
  const { svg, error } = useMemo(() => {
    if (!payload) return { svg: "", error: "" };
    try {
      return { svg: makeSvg(payload, ec, fg, bg, margin, logo), error: "" };
    } catch {
      return { svg: "", error: "That's too much data for one QR code. Shorten the text or lower the error correction." };
    }
  }, [payload, ec, fg, bg, margin, logo]);

  const ratio = contrast(fg, bg);
  const lowContrast = ratio < 4;
  const inverted = isInverted(fg, bg);

  const markUsed = () => {
    if (!tracked.current) {
      tracked.current = true;
      trackToolUse(slug);
    }
  };

  const [pngError, setPngError] = useState("");
  const downloadPng = async () => {
    const img = new Image();
    img.src = svgUrl(svg);
    try {
      await img.decode();
      setPngError("");
    } catch {
      setPngError("The PNG couldn't be created in this browser. Download the SVG instead.");
      return;
    }
    const c = document.createElement("canvas");
    c.width = c.height = size;
    const ctx = c.getContext("2d")!;
    ctx.imageSmoothingEnabled = false;
    ctx.drawImage(img, 0, 0, size, size);
    c.toBlob((b) => b && downloadBlob(b, `qr-${type}.png`), "image/png");
    markUsed();
  };

  const onLogo = async (file: File | undefined) => {
    if (!file) return;
    if (!/^image\/(png|jpeg|webp|svg\+xml)$/.test(file.type) || file.size > 5 * 1024 * 1024) {
      setLogoError("Use a PNG, JPG, WebP or SVG logo under 5 MB.");
      return;
    }
    // Downscale to 256px and re-encode, so the SVG stays small and contains no foreign markup.
    const bmp = await (file.type === "image/svg+xml" ? svgImage(file) : createImageBitmap(file)).catch(() => null);
    if (!bmp || !bmp.width || !bmp.height) return setLogoError("That logo couldn't be read.");
    setLogoError("");
    const k = Math.min(1, 256 / Math.max(bmp.width, bmp.height));
    const c = document.createElement("canvas");
    c.width = Math.round(bmp.width * k);
    c.height = Math.round(bmp.height * k);
    c.getContext("2d")!.drawImage(bmp, 0, 0, c.width, c.height);
    setLogo(c.toDataURL("image/png"));
  };

  const setF = (k: string, v: string) => setFields((f) => ({ ...f, [k]: v }));

  return (
    <Panel>
      <div className="grid gap-8 md:grid-cols-[minmax(0,1fr)_280px]">
        <div className="space-y-6">
          <Section title="1. Content">
            <Choice name="qrtype" label="QR code type" value={type} onChange={setType} options={TYPES} />
            <div className="grid gap-4 sm:grid-cols-2">
              {FIELDS[type].map((inp) => {
                const id = `qr-${inp.k}`;
                return (
                  <div key={inp.k} className={inp.full || inp.area ? "sm:col-span-2" : ""}>
                    <Field label={inp.label} htmlFor={id}>
                      {inp.area ? (
                        <textarea id={id} rows={3} maxLength={1500} className="field py-2" value={fields[inp.k] ?? ""} onChange={(e) => setF(inp.k, e.target.value)} />
                      ) : (
                        <input
                          id={id}
                          type={inp.type ?? "text"}
                          inputMode={inp.mode}
                          autoComplete={inp.auto}
                          placeholder={inp.placeholder}
                          maxLength={500}
                          className="field"
                          value={fields[inp.k] ?? ""}
                          onChange={(e) => setF(inp.k, e.target.value)}
                        />
                      )}
                    </Field>
                  </div>
                );
              })}
              {type === "wifi" && (
                <>
                  <Field label="Security" htmlFor="qr-enc">
                    <select id="qr-enc" className="field" value={fields.enc} onChange={(e) => setF("enc", e.target.value)}>
                      <option value="WPA">WPA / WPA2 / WPA3</option>
                      <option value="WEP">WEP</option>
                      <option value="nopass">None (open network)</option>
                    </select>
                  </Field>
                  <label className="flex min-h-11 items-center gap-2 self-end text-sm">
                    <input type="checkbox" checked={fields.hidden === "true"} onChange={(e) => setF("hidden", String(e.target.checked))} />
                    Hidden network
                  </label>
                </>
              )}
            </div>
          </Section>

          <Section title="2. Style">
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex gap-4">
                <Field label="Foreground" htmlFor="fg">
                  <input id="fg" type="color" className="field w-20 p-1" value={fg} onChange={(e) => setFg(e.target.value)} />
                </Field>
                <Field label="Background" htmlFor="bg">
                  <input id="bg" type="color" className="field w-20 p-1" value={bg} onChange={(e) => setBg(e.target.value)} />
                </Field>
              </div>
              <Field label={`PNG size: ${size} px`} htmlFor="size">
                <input id="size" type="range" min={128} max={2048} step={64} value={size} onChange={(e) => setSize(+e.target.value)} className="w-full" />
              </Field>
              <Field label={`Margin: ${margin} modules`} htmlFor="margin" hint="Scanners need a quiet zone; 4 is the standard.">
                <input id="margin" type="range" min={0} max={8} value={margin} onChange={(e) => setMargin(+e.target.value)} className="w-full" />
              </Field>
              <Field label="Error correction" htmlFor="ec" hint={logo ? "Set to High automatically because a logo covers part of the code." : "Higher survives damage but makes a denser code."}>
                <select id="ec" className="field" value={ec} disabled={!!logo} onChange={(e) => setEc(e.target.value as Ec)}>
                  <option value="L">Low (7%)</option>
                  <option value="M">Medium (15%)</option>
                  <option value="Q">Quartile (25%)</option>
                  <option value="H">High (30%)</option>
                </select>
              </Field>
              <div className="sm:col-span-2">
                <span className="label">Centre logo (optional)</span>
                <div className="flex flex-wrap items-center gap-2">
                  <label className="btn-secondary">
                    <Icon name="upload" size={18} />
                    {logo ? "Change logo" : "Add logo"}
                    <input type="file" accept="image/png,image/jpeg,image/webp,image/svg+xml" className="sr-only" onChange={(e) => onLogo(e.target.files?.[0])} />
                  </label>
                  {logo && (
                    <button type="button" className="btn-ghost" onClick={() => setLogo(null)}>
                      Remove logo
                    </button>
                  )}
                </div>
                {logoError && <p role="alert" className="mt-2 text-sm text-danger">{logoError}</p>}
              </div>
            </div>
          </Section>
        </div>

        <Section title="3. Preview and download">
          <div className="flex aspect-square w-full items-center justify-center rounded-md border border-border bg-surface-2 p-3">
            {svg ? (
              // eslint-disable-next-line @next/next/no-img-element -- generated SVG preview
              <img src={svgUrl(svg)} alt={`QR code preview (${TYPES.find((t) => t.value === type)?.label})`} className="h-full w-full" />
            ) : (
              <p className="px-4 text-center text-sm text-muted">{error || "Fill in the details to see your QR code."}</p>
            )}
          </div>
          <div aria-live="polite" className="space-y-2">
            {(lowContrast || inverted) && (
              <p className="note-warn">
                {lowContrast ? `Contrast is low (${ratio.toFixed(1)}:1). Many phones won't scan it. Use a darker foreground or lighter background.` : "Light code on a dark background. Some older scanners can't read inverted codes."}
              </p>
            )}
          </div>
          <div className="grid grid-cols-2 gap-2">
            <button type="button" className="btn-primary" disabled={!svg} onClick={downloadPng}>
              <Icon name="download" size={18} /> PNG
            </button>
            <button
              type="button"
              className="btn-secondary"
              disabled={!svg}
              onClick={() => {
                downloadBlob(new Blob([svg], { type: "image/svg+xml" }), `qr-${type}.svg`);
                markUsed();
              }}
            >
              <Icon name="download" size={18} /> SVG
            </button>
          </div>
          {pngError && <p role="alert" className="text-sm text-danger">{pngError}</p>}
          <p className="note">Static code: the data is stored in the pattern itself. No tracking, no redirects, and it never expires.</p>
        </Section>
      </div>
    </Panel>
  );
}
