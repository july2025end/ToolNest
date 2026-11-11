/** Change the brand in one place. */
export const site = {
  name: "ToolNest",
  url: "https://example.com",
  tagline: "Free online tools that run in your browser",
  description:
    "Free image, PDF, QR code and finance tools. No sign-up, no watermarks, and your files never leave your device.",
  /** Shown on the contact page and in legal text. */
  contactNote: "Use the contact form and we'll reply by email if you leave one.",
} as const;

export const absUrl = (path = "/") => new URL(path, site.url).toString();
