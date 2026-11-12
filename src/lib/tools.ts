import type { IconName } from "@/components/icons";

export type CategoryId = "image" | "pdf" | "qr" | "finance" | "ai" | "text";

export const categories: { id: CategoryId; name: string; href: string; blurb: string }[] = [
  { id: "image", name: "Image", href: "/image-tools", blurb: "Compress, convert and resize photos" },
  { id: "pdf", name: "PDF", href: "/pdf-tools", blurb: "Merge, split, compress and edit PDFs" },
  { id: "qr", name: "QR & barcodes", href: "/qr-code-generator", blurb: "Make and scan QR codes and barcodes" },
  { id: "finance", name: "Calculators", href: "/calculators", blurb: "Loans, interest, savings and percentages" },
  { id: "ai", name: "Photo editing", href: "/background-remover", blurb: "Remove backgrounds automatically" },
  { id: "text", name: "Text tools", href: "/word-counter", blurb: "Count, convert and generate text" },
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
  | "bg-remove"
  | "image-crop"
  | "pdf-sign"
  | "calc-age"
  | "calc-bmi"
  | "text-count"
  | "text-case"
  | "text-password"
  | "image-passport"
  | "image-redact"
  | "image-ocr"
  | "image-colors"
  | "image-text"
  | "pdf-unlock"
  | "pdf-protect"
  | "pdf-flatten"
  | "pdf-metadata"
  | "barcode"
  | "qr-scan"
  | "calc-tip"
  | "calc-gpa"
  | "calc-units"
  | "calc-timezone"
  | "text-json"
  | "text-base64"
  | "text-lorem";

export type ImagePreset = {
  targetKB?: number;
  format?: "image/jpeg" | "image/png" | "image/webp";
  accept?: string;
  /** Open with the resize controls showing. */
  resize?: "size" | "percent";
};

export type Tool = {
  slug: string;
  name: string;
  /** Card text on home/hubs. */
  blurb: string;
  category: CategoryId;
  icon: IconName;
  kind: ToolKind;
  preset?: ImagePreset | { qrType?: "wifi" } | { imgType?: "image/png" };
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
  { slug: "resize-image", name: "Resize image", blurb: "Exact pixels, percentage or social sizes", category: "image", icon: "resize", kind: "image", preset: { resize: "size" }, related: ["crop-image", "image-compressor", "compress-image-to-100kb", "jpg-to-webp"], featured: true },
  { slug: "crop-image", name: "Crop image", blurb: "Trim to square, 16:9 or any shape", category: "image", icon: "crop", kind: "image-crop", related: ["resize-image", "image-compressor", "background-remover", "compress-image-to-50kb"] },
  { slug: "compress-image-to-200kb", name: "Compress image to 200KB", blurb: "Sharp photos under a 200 KB limit", category: "image", icon: "target", kind: "image", preset: { targetKB: 200 }, related: ["compress-image-to-500kb", "compress-image-to-100kb", "resize-image", "image-compressor"] },
  { slug: "compress-image-to-500kb", name: "Compress image to 500KB", blurb: "High quality with a size cap", category: "image", icon: "target", kind: "image", preset: { targetKB: 500 }, related: ["compress-image-to-200kb", "compress-image-to-100kb", "resize-image", "image-compressor"] },
  { slug: "jpg-to-webp", name: "JPG to WebP", blurb: "Smaller images for websites", category: "image", icon: "convert", kind: "image", preset: { format: "image/webp" }, related: ["png-to-webp", "webp-to-jpg", "image-compressor", "resize-image"] },
  { slug: "png-to-webp", name: "PNG to WebP", blurb: "Keep transparency, cut the size", category: "image", icon: "convert", kind: "image", preset: { format: "image/webp" }, related: ["jpg-to-webp", "png-to-jpg", "image-compressor", "resize-image"] },
  { slug: "passport-photo-maker", name: "Passport photo maker", blurb: "Official sizes, white background, print sheet", category: "image", icon: "user", kind: "image-passport", related: ["background-remover", "crop-image", "resize-image", "compress-image-to-50kb"], featured: true },
  { slug: "blur-image", name: "Blur or redact image", blurb: "Hide faces, names and numbers", category: "image", icon: "blur", kind: "image-redact", related: ["crop-image", "add-text-to-image", "image-compressor", "background-remover"] },
  { slug: "image-to-text", name: "Image to text (OCR)", blurb: "Copy text from photos and screenshots", category: "image", icon: "ocr", kind: "image-ocr", related: ["word-counter", "pdf-to-jpg", "crop-image", "jpg-to-pdf"], featured: true },
  { slug: "color-picker-from-image", name: "Colour picker from image", blurb: "HEX, RGB and the main colours of a photo", category: "image", icon: "dropper", kind: "image-colors", related: ["crop-image", "png-to-webp", "image-compressor", "add-text-to-image"] },
  { slug: "add-text-to-image", name: "Add text to image", blurb: "Captions and memes in seconds", category: "image", icon: "type", kind: "image-text", related: ["crop-image", "resize-image", "blur-image", "image-compressor"] },
  { slug: "webp-to-jpg", name: "WebP to JPG", blurb: "Convert web images for any app", category: "image", icon: "convert", kind: "image", preset: { format: "image/jpeg" }, related: ["png-to-jpg", "heic-to-jpg", "jpg-to-png", "image-compressor"] },
  // PDF
  { slug: "merge-pdf", name: "Merge PDF", blurb: "Combine files in the order you choose", category: "pdf", icon: "merge", kind: "pdf-merge", related: ["split-pdf", "organize-pdf", "compress-pdf", "jpg-to-pdf"], featured: true },
  { slug: "split-pdf", name: "Split PDF", blurb: "Cut by page ranges or into single pages", category: "pdf", icon: "split", kind: "pdf-split", related: ["extract-pdf-pages", "merge-pdf", "delete-pdf-pages", "organize-pdf"] },
  { slug: "compress-pdf", name: "Compress PDF", blurb: "Make PDFs small enough to email", category: "pdf", icon: "compress", kind: "pdf-compress", related: ["merge-pdf", "pdf-to-jpg", "image-compressor", "split-pdf"], featured: true },
  { slug: "jpg-to-pdf", name: "JPG to PDF", blurb: "Turn photos and scans into one PDF", category: "pdf", icon: "image-to-doc", kind: "pdf-from-images", related: ["merge-pdf", "pdf-to-jpg", "compress-pdf", "image-compressor"] },
  { slug: "png-to-pdf", name: "PNG to PDF", blurb: "Screenshots and graphics into one PDF", category: "pdf", icon: "image-to-doc", kind: "pdf-from-images", related: ["jpg-to-pdf", "pdf-to-png", "merge-pdf", "compress-pdf"] },
  { slug: "pdf-to-png", name: "PDF to PNG", blurb: "Sharp, lossless page images", category: "pdf", icon: "doc-to-image", kind: "pdf-to-images", preset: { imgType: "image/png" }, related: ["pdf-to-jpg", "png-to-pdf", "split-pdf", "compress-pdf"] },
  { slug: "sign-pdf", name: "Sign PDF", blurb: "Draw or type a signature and place it", category: "pdf", icon: "sign", kind: "pdf-sign", related: ["merge-pdf", "add-page-numbers-to-pdf", "watermark-pdf", "compress-pdf"], featured: true },
  { slug: "unlock-pdf", name: "Unlock PDF", blurb: "Remove a password you know", category: "pdf", icon: "unlock", kind: "pdf-unlock", related: ["protect-pdf", "merge-pdf", "compress-pdf", "sign-pdf"] },
  { slug: "protect-pdf", name: "Protect PDF", blurb: "Add a password with AES-256", category: "pdf", icon: "shield", kind: "pdf-protect", related: ["unlock-pdf", "watermark-pdf", "sign-pdf", "compress-pdf"] },
  { slug: "flatten-pdf", name: "Flatten PDF", blurb: "Lock form fields and annotations in place", category: "pdf", icon: "layers", kind: "pdf-flatten", related: ["sign-pdf", "protect-pdf", "compress-pdf", "edit-pdf-metadata"] },
  { slug: "edit-pdf-metadata", name: "Edit PDF metadata", blurb: "Change title, author and keywords", category: "pdf", icon: "info", kind: "pdf-metadata", related: ["flatten-pdf", "compress-pdf", "merge-pdf", "protect-pdf"] },
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
  { slug: "barcode-generator", name: "Barcode generator", blurb: "Code 128, EAN-13, UPC and more", category: "qr", icon: "barcode", kind: "barcode", related: ["qr-code-generator", "qr-code-scanner", "wifi-qr-code-generator", "word-counter"] },
  { slug: "qr-code-scanner", name: "QR code scanner", blurb: "Scan with your camera or from a photo", category: "qr", icon: "scan", kind: "qr-scan", related: ["qr-code-generator", "barcode-generator", "wifi-qr-code-generator", "image-to-text"] },
  // Finance
  { slug: "emi-calculator", name: "Loan / EMI calculator", blurb: "Monthly payment and full schedule", category: "finance", icon: "bank", kind: "calc-loan", related: ["compound-interest-calculator", "sip-calculator", "percentage-calculator", "discount-calculator"], featured: true },
  { slug: "compound-interest-calculator", name: "Compound interest", blurb: "Growth with monthly contributions", category: "finance", icon: "growth", kind: "calc-compound", related: ["sip-calculator", "emi-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "sip-calculator", name: "Savings goal / SIP", blurb: "What to save each month to reach a goal", category: "finance", icon: "target", kind: "calc-sip", related: ["compound-interest-calculator", "emi-calculator", "percentage-calculator", "discount-calculator"] },
  { slug: "percentage-calculator", name: "Percentage calculator", blurb: "Percent of, change and ratio", category: "finance", icon: "percent", kind: "calc-percentage", related: ["discount-calculator", "compound-interest-calculator", "emi-calculator", "sip-calculator"], featured: true },
  { slug: "discount-calculator", name: "Discount & tax / GST", blurb: "Sale price with tax added or removed", category: "finance", icon: "tag", kind: "calc-discount", related: ["percentage-calculator", "emi-calculator", "sip-calculator", "compound-interest-calculator"] },
  { slug: "age-calculator", name: "Age calculator", blurb: "Exact age in years, months and days", category: "finance", icon: "calendar", kind: "calc-age", related: ["bmi-calculator", "percentage-calculator", "discount-calculator", "word-counter"] },
  { slug: "bmi-calculator", name: "BMI calculator", blurb: "Body mass index in metric or imperial", category: "finance", icon: "scale", kind: "calc-bmi", related: ["age-calculator", "percentage-calculator", "discount-calculator", "emi-calculator"] },
  { slug: "tip-calculator", name: "Tip calculator", blurb: "Tip and split the bill", category: "finance", icon: "tip", kind: "calc-tip", related: ["percentage-calculator", "discount-calculator", "unit-converter", "age-calculator"] },
  { slug: "gpa-calculator", name: "GPA calculator", blurb: "Grades and credits on a 4.0 scale", category: "finance", icon: "cap", kind: "calc-gpa", related: ["percentage-calculator", "age-calculator", "word-counter", "unit-converter"] },
  { slug: "unit-converter", name: "Unit converter", blurb: "Length, weight, temperature and more", category: "finance", icon: "ruler", kind: "calc-units", related: ["time-zone-converter", "percentage-calculator", "bmi-calculator", "tip-calculator"], featured: true },
  { slug: "time-zone-converter", name: "Time zone converter", blurb: "Meeting times across cities", category: "finance", icon: "globe", kind: "calc-timezone", related: ["unit-converter", "age-calculator", "percentage-calculator", "word-counter"] },
  // Text
  { slug: "word-counter", name: "Word counter", blurb: "Words, characters, sentences and reading time", category: "text", icon: "text", kind: "text-count", related: ["case-converter", "password-generator", "percentage-calculator", "qr-code-generator"], featured: true },
  { slug: "case-converter", name: "Case converter", blurb: "UPPER, lower, Title and Sentence case", category: "text", icon: "case", kind: "text-case", related: ["word-counter", "password-generator", "qr-code-generator", "percentage-calculator"] },
  { slug: "password-generator", name: "Password generator", blurb: "Strong random passwords, made on your device", category: "text", icon: "key", kind: "text-password", related: ["word-counter", "case-converter", "qr-code-generator", "wifi-qr-code-generator"] },
  { slug: "json-formatter", name: "JSON formatter", blurb: "Format, validate and minify JSON", category: "text", icon: "braces", kind: "text-json", related: ["base64-encode-decode", "case-converter", "word-counter", "password-generator"] },
  { slug: "base64-encode-decode", name: "Base64 encode / decode", blurb: "Text and files, UTF-8 safe", category: "text", icon: "code", kind: "text-base64", related: ["json-formatter", "case-converter", "password-generator", "qr-code-generator"] },
  { slug: "lorem-ipsum-generator", name: "Lorem ipsum generator", blurb: "Placeholder paragraphs, sentences or words", category: "text", icon: "paragraph", kind: "text-lorem", related: ["word-counter", "case-converter", "json-formatter", "password-generator"] },
  // AI
  { slug: "background-remover", name: "Background remover", blurb: "Cut out people and products automatically", category: "ai", icon: "cutout", kind: "bg-remove", related: ["image-compressor", "jpg-to-png", "compress-image-to-50kb", "qr-code-generator"], featured: true },
];

export const toolBySlug = new Map(tools.map((t) => [t.slug, t]));

export const toolsIn = (c: CategoryId) => tools.filter((t) => t.category === c);

export const hubFor = (c: CategoryId) => {
  if (c === "image") return { name: "Image tools", href: "/image-tools" };
  if (c === "pdf") return { name: "PDF tools", href: "/pdf-tools" };
  if (c === "finance") return { name: "Calculators", href: "/calculators" };
  return null;
};
