import type { MetadataRoute } from "next";
import { absUrl } from "@/site.config";

export default function robots(): MetadataRoute.Robots {
  return { rules: [{ userAgent: "*", allow: "/" }], sitemap: absUrl("/sitemap.xml") };
}
