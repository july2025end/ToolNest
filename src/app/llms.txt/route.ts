import { categories, toolsIn } from "@/lib/tools";
import { absUrl, site } from "@/site.config";

// llms.txt (llmstxt.org): a plain summary AI assistants read to understand and cite the site.
export const dynamic = "force-static";

export function GET() {
  const body = [
    `# ${site.name} by ${site.maker}`,
    "",
    `> ${site.description}`,
    "",
    "All tools are free, need no account, add no watermark, and process files locally in the browser (nothing is uploaded).",
    "",
    ...categories.flatMap((c) => [
      `## ${c.name}`,
      "",
      ...toolsIn(c.id).map((t) => `- [${t.name}](${absUrl(`/${t.slug}`)}): ${t.blurb}`),
      "",
    ]),
    "## About",
    "",
    `- [About ${site.name}](${absUrl("/about")})`,
    `- [Privacy policy](${absUrl("/privacy")})`,
    "",
  ].join("\n");
  return new Response(body, { headers: { "Content-Type": "text/plain; charset=utf-8" } });
}
