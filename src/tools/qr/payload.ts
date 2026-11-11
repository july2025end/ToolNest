export type QrType = "url" | "text" | "wifi" | "vcard" | "email" | "phone" | "sms" | "whatsapp";

export type QrFields = Record<string, string>;

// Wi-Fi and vCard formats reserve these characters.
const escWifi = (s: string) => s.replace(/([\\;,:"])/g, "\\$1");
const escV = (s: string) => s.replace(/\\/g, "\\\\").replace(/\r?\n|\r/g, "\\n").replace(/([;,])/g, "\\$1");
const digits = (s: string) => s.replace(/[^\d+]/g, "");

export function buildPayload(type: QrType, f: QrFields): string {
  switch (type) {
    case "url": {
      const u = (f.url ?? "").trim();
      if (!u) return "";
      return /^[a-z][a-z0-9+.-]*:/i.test(u) ? u : `https://${u}`;
    }
    case "text":
      return f.text ?? "";
    case "wifi": {
      if (!f.ssid) return "";
      const t = f.enc === "nopass" ? "nopass" : f.enc || "WPA";
      return `WIFI:T:${t};S:${escWifi(f.ssid)};${t !== "nopass" ? `P:${escWifi(f.password ?? "")};` : ""}${f.hidden === "true" ? "H:true;" : ""};`;
    }
    case "vcard": {
      if (!f.first && !f.last && !f.org) return "";
      const lines = [
        "BEGIN:VCARD",
        "VERSION:3.0",
        `N:${escV(f.last ?? "")};${escV(f.first ?? "")};;;`,
        `FN:${escV([f.first, f.last].filter(Boolean).join(" ") || f.org || "")}`,
        f.org && `ORG:${escV(f.org)}`,
        f.title && `TITLE:${escV(f.title)}`,
        f.phone && `TEL;TYPE=CELL:${digits(f.phone)}`,
        f.email && `EMAIL:${escV(f.email)}`,
        f.website && `URL:${escV(f.website)}`,
        (f.street || f.city || f.country) && `ADR:;;${escV(f.street ?? "")};${escV(f.city ?? "")};;${escV(f.zip ?? "")};${escV(f.country ?? "")}`,
        "END:VCARD",
      ];
      return lines.filter(Boolean).join("\n");
    }
    case "email": {
      if (!f.to) return "";
      const q = [f.subject && `subject=${encodeURIComponent(f.subject)}`, f.body && `body=${encodeURIComponent(f.body)}`].filter(Boolean).join("&");
      return `mailto:${f.to.trim()}${q ? `?${q}` : ""}`;
    }
    case "phone":
      return f.phone ? `tel:${digits(f.phone)}` : "";
    case "sms":
      return f.phone ? `SMSTO:${digits(f.phone)}:${f.message ?? ""}` : "";
    case "whatsapp": {
      const d = digits(f.phone ?? "").replace(/^\+/, "");
      if (!d) return "";
      return `https://wa.me/${d}${f.message ? `?text=${encodeURIComponent(f.message)}` : ""}`;
    }
  }
}

// --- Colour contrast (WCAG relative luminance) ---
const lum = (hex: string) => {
  const n = parseInt(hex.slice(1), 16);
  const ch = [(n >> 16) & 255, (n >> 8) & 255, n & 255].map((v) => {
    const s = v / 255;
    return s <= 0.03928 ? s / 12.92 : ((s + 0.055) / 1.055) ** 2.4;
  });
  return 0.2126 * ch[0] + 0.7152 * ch[1] + 0.0722 * ch[2];
};
export const contrast = (a: string, b: string) => {
  const [x, y] = [lum(a), lum(b)].sort((p, q) => q - p);
  return (x + 0.05) / (y + 0.05);
};
export const isInverted = (fg: string, bg: string) => lum(fg) > lum(bg);
