import type { IconName } from "@/components/icons";

export type CategoryId = "image" | "pdf" | "qr" | "finance" | "ai";

export const categories: { id: CategoryId; name: string; href: string; blurb: string }[] = [
  { id: "image", name: "Image", href: "/image-compressor", blurb: "Compress, convert and resize photos" },
  { id: "pdf", name: "PDF", href: "/pdf-tools", blurb: "Merge, split, compress and edit PDFs" },
  { id: "qr", name: "QR codes", href: "/qr-code-generator", blurb: "Static codes that never expire" },
  { id: "finance", name: "Calculators", href: "/calculators", blurb: "Loans, interest, savings and percentages" },
  { id: "ai", name: "Photo editing", href: "/background-remover", blurb: "Remove backgrounds automatically" },
];

export type ToolKind =
  | "image"
  | "pdf-merge"
  | "pdf-split"
  | "pdf-extract"
  | "pdf-delete"
  | "pdf-organize"
  | "pdf-rotate"
  | "pdf-from-images"
  | "pdf-to-images"
  | "pdf-compress"
  | "pdf-page-numbers"
  | "pdf-watermark"
  | "qr"
  | "calc-loan"
  | "calc-compound"
  | "calc-sip"
  | "calc-percentage"
  | "calc-discount"
  | "bg-remove";

export type ImagePreset = {
  targetKB?: number;
  format?: "image/jpeg" | "image/png" | "image/webp";
  accept?: string;
};

export type Tool = {
  slug: string;
  name: string;
  /** Card text on home/hubs. */
  blurb: string;
  category: CategoryId;
  icon: IconName;
  kind: ToolKind;
  preset?: ImagePreset | { qrType?: "wifi" };
  related: string[];
  /** Shown in the header menu and the home "popular" fallback. */
  featured?: boolean;
};

const IMG_ACCEPT = "image/jpeg,image/png,image/webp,image/heic,image/heif,.heic,.heif";

export const tools: Tool[] = [
  // Image
  { slug: "image-compressor", name: "Image compressor", blurb: "Shrink JPG, PNG and WebP with a quality slider", category: "image", icon: "compress", kind: "image", related: ["compress-image-to-100kb", "heic-to-jpg", "png-to-jpg", "background-remover"], featured: true },
  { slug: "compress-image-to-100kb", name: "Compress image to 100KB", blurb: "Hit an exact file size automatically", category: "image", icon: "target", kind: "image", preset: { targetKB: 100 }, related: ["compress-image-to-50kb", "compress-image-to-20kb", "image-compressor", "jpg-to-pdf"] },
  { slug: "compress-image-to-50kb", name: "Compress image to 50KB", blurb: "For forms and uploads with strict limits", category: "image", icon: "target", kind: "image", preset: { targetKB: 50 }, related: ["compress-image-to-20kb", "compress-image-to-100kb", "image-compressor", "jpg-to-pdf"] },
  { slug: "compress-image-to-20kb", name: "Compress image to 20KB", blurb: "Tiny photos and signatures for applications", category: "image", icon: "target", kind: "image", preset: { targetKB: 20 }, related: ["compress-image-to-50kb", "compress-image-to-100kb", "image-compressor", "background-remover"] },
  { slug: "heic-to-jpg", name: "HEIC to JPG", blurb: "Open iPhone photos anywhere", category: "image", icon: "phone-photo", kind: "image", preset: { format: "image/jpeg", accept: IMG_ACCEPT }, related: ["png-to-jpg", "webp-to-jpg", "image-compressor", "jpg-to-pdf"] },
  { slug: "png-to-jpg", name: "PNG to JPG", blurb: "Smaller files for photos and screenshots", category: "image", icon: "convert", kind: "image", preset: { format: "image/jpeg" }, related: ["jpg-to-png", "webp-to-jpg", "image-compressor", "heic-to-jpg"] },
  { slug: "jpg-to-png", name: "JPG to PNG", blurb: "Lossless copies for editing", category: "image", icon: "convert", kind: "image", preset: { format: "image/png" }, related: ["png-to-jpg", "background-remover", "image-compressor", "webp-to-jpg"] },
  { slug: "webp-to-jpg", name: "WebP to JPG", blurb: "Convert web images for any app", category: "image", icon: "convert", kind: "image", preset: { format: "image/jpeg" }, related: ["png-to-jpg", "heic-to-jpg", "jpg-to-png", "image-compressor"] },
  // PDF
  { slug: "merge-pdf", name: "Merge PDF", blurb: "Combine files in the order you choose", category: "pdf", icon: "merge", kind: "pdf-merge", related: ["split-pdf", "organize-pdf", "compress-pdf", "jpg-to-pdf"], featured: true },
  { slug: "split-pdf", name: "Split PDF", blurb: "Cut by page ranges or into single pages", category: "pdf", icon: "split", kind: "pdf-split", related: ["extract-pdf-pages", "merge-pdf", "delete-pdf-pages", "organize-pdf"] },
  { slug: "compress-pdf", name: "Compress PDF", blurb: "Make PDFs small enough to email", category: "pdf", icon: "compress", kind: "pdf-compress", related: ["merge-pdf", "pdf-to-jpg", "image-compressor", "split-pdf"], featured: true },
  { slug: "jpg-to-pdf", name: "JPG to PDF", blurb: "Turn photos and scans into one PDF", category: "pdf", icon: "image-to-doc", kind: "pdf-from-images", related: ["merge-pdf", "pdf-to-jpg", "compress-pdf", "image-compressor"] },
  { slug: "pdf-to-jpg", name: "PDF to JPG", blurb: "Save every page as an image", category: "pdf", icon: "doc-to-image", kind: "pdf-to-images", related: ["jpg-to-pdf", "split-pdf", "compress-pdf", "image-compressor"] },
  { slug: "organize-pdf", name: "Organize PDF", blurb: "Reorder pages with thumbnails", category: "pdf", icon: "grid", kind: "pdf-organize", related: ["rotate-pdf", "delete-pdf-pages", "merge-pdf", "extract-pdf-pages"] },
  { slug: "rotate-pdf", name: "Rotate PDF", blurb: "Fix sideways or upside-down pages", category: "pdf", icon: "rotate", kind: "pdf-rotate", related: ["organize-pdf", "merge-pdf", "delete-pdf-pages", "pdf-to-jpg"] },
  { slug: "extract-pdf-pages", name: "Extract PDF pages", blurb: "Copy selected pages to a new file", category: "pdf", icon: "extract", kind: "pdf-extract", related: ["split-pdf", "delete-pdf-pages", "merge-pdf", "organize-pdf"] },
  { slug: "delete-pdf-pages", name: "Delete PDF pages", blurb: "Remove blank or unwanted pages", category: "pdf", icon: "trash", kind: "pdf-delete", related: ["extract-pdf-pages", "organize-pdf", "split-pdf", "compress-pdf"] },
  { slug: "add-page-numbers-to-pdf", name: "Add page numbers", blurb: "Number pages in any corner", category: "pdf", icon: "hash", kind: "pdf-page-numbers", related: ["watermark-pdf", "merge-pdf", "organize-pdf", "compress-pdf"] },
  { slug: "watermark-pdf", name: "Watermark PDF", blurb: "Stamp text across every page", category: "pdf", icon: "stamp", kind: "pdf-watermark", related: ["add-page-numbers-to-pdf", "merge-pdf", "compress-pdf", "rotate-pdf"] },
  // QR
  { slug: "qr-code-generator", name: "QR code generator", blurb: "Links, Wi-Fi, contacts and more", category: "qr", icon: "qr", kind: "qr", related: ["wifi-qr-code-generator", "image-compressor", "background-remover", "merge-pdf"], featured: true },
  { slug: "wifi-qr-code-generator", name: "Wi-Fi QR code", blurb: "Let guests join without typing", category: "qr", icon: "wifi", kind: "qr", preset: { qrType: "wifi" }, related: ["qr-code-generator", "image-compressor", "jpg-to-pdf", "percentage-calculator"] },
  // Finance
  { slug: "emi-calculator", name: "Loan / EMI calculator", blurb: "Monthly payment and full schedule", category: "finance", icon: "bank", kind: "calc-loan", related: ["compound-interest-calculator", "sip-calculator", "percentage-calculator", "discount-calculator"], featured: true },
  { slug: "compound-interest-calculator", name: "Compound interest", blurb: "Growth with monthly contributions", category: "finance", icon: "growth", kind: "calc-compound", related: ["sip-calculator", "emi-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "sip-calculator", name: "Savings goal / SIP", blurb: "What to save each month to reach a goal", category: "finance", icon: "target", kind: "calc-sip", related: ["compound-interest-calculator", "emi-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "percentage-calculator", name: "Percentage calculator", blurb: "Percent of, change and ratio", category: "finance", icon: "percent", kind: "calc-percentage", related: ["discount-calculator", "compound-interest-calculator", "emi-calculator", "sip-calculator"], featured: true },
  { slug: "discount-calculator", name: "Discount & tax / GST", blurb: "Sale price with tax added or removed", category: "finance", icon: "tag", kind: "calc-discount", related: ["percentage-calculator", "emi-calculator", "sip-calculator", "compound-interest-calculator"] },
  // AI
  { slug: "background-remover", name: "Background remover", blurb: "Cut out people and products automatically", category: "ai", icon: "cutout", kind: "bg-remove", related: ["image-compressor", "jpg-to-png", "compress-image-to-50kb", "qr-code-generator"], featured: true },
];

export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));

export const toolsIn = (c: CategoryId) => tools.filter((t) => t.category === c);

export const hubFor = (c: CategoryId) => {
  if (c === "pdf") return { name: "PDF tools", href: "/pdf-tools" };
  if (c === "finance") return { name: "Calculators", href: "/calculators" };
  return null;
};
