import type { MetadataRoute } from "next";
import { tools } from "@/lib/tools";
import { absUrl } from "@/site.config";

// No lastmod/changefreq/priority: Google ignores uniform or guessed values.
export default function sitemap(): MetadataRoute.Sitemap {
  const paths = ["/", "/image-tools", "/pdf-tools", "/calculators", ...tools.map((t) => `/${t.slug}`), "/about", "/contact", "/privacy", "/terms"];
  return paths.map((p) => ({ url: absUrl(p) }));
}
