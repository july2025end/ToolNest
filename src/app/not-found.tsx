import type { Metadata } from "next";
import Link from "next/link";
import { ToolList } from "@/components/tool-list";
import { tools } from "@/lib/tools";

export const metadata: Metadata = { title: "Page not found", robots: { index: false } };

export default function NotFound() {
  return (
    <div className="container-x pt-14">
      <p className="eyebrow">Error 404</p>
      <h1 className="type-h1 mt-2">This page doesn&rsquo;t exist</h1>
      <p className="mt-3 max-w-[56ch] text-muted">
        The link may be old or mistyped. Try one of the popular tools below, or{" "}
        <Link href="/" className="link">
          browse all tools
        </Link>
        .
      </p>
      <div className="mt-8">
        <ToolList tools={tools.filter((t) => t.featured)} cols={3} />
      </div>
    </div>
  );
}
