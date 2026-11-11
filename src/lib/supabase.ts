// Minimal Supabase REST client (PostgREST). Only the public anon key is ever used.
// Everything here is a no-op when Supabase isn't configured.

const url = process.env.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/$/, "");
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const supabaseConfigured = Boolean(url && anonKey);

const headers = () => ({
  apikey: anonKey!,
  Authorization: `Bearer ${anonKey}`,
  "Content-Type": "application/json",
});

export async function insertFeedback(row: Record<string, string | null>) {
  if (!supabaseConfigured) return { ok: false as const, reason: "not-configured" as const };
  const res = await fetch(`${url}/rest/v1/feedback`, {
    method: "POST",
    headers: { ...headers(), Prefer: "return=minimal" },
    body: JSON.stringify(row),
    cache: "no-store",
  });
  return res.ok ? { ok: true as const } : { ok: false as const, reason: "error" as const };
}

/** Fire-and-forget usage ping from the browser. */
export function trackToolUse(slug: string) {
  if (!supabaseConfigured || typeof window === "undefined") return;
  try {
    const key = `used:${slug}`;
    if (sessionStorage.getItem(key)) return; // once per tool per session
    sessionStorage.setItem(key, "1");
  } catch {}
  fetch(`${url}/rest/v1/rpc/track_tool_use`, {
    method: "POST",
    headers: headers(),
    body: JSON.stringify({ p_slug: slug }),
    keepalive: true,
  }).catch(() => {});
}

/** Server-side: aggregated counts, refreshed hourly. Returns [] on any failure. */
export async function getPopularSlugs(): Promise<string[]> {
  if (!supabaseConfigured) return [];
  try {
    const res = await fetch(`${url}/rest/v1/rpc/popular_tools`, {
      method: "POST",
      headers: headers(),
      body: JSON.stringify({ p_days: 30, p_limit: 12 }),
      next: { revalidate: 3600 },
      signal: AbortSignal.timeout(3000),
    });
    if (!res.ok) return [];
    const rows = (await res.json()) as { slug: string }[];
    return rows.map((r) => r.slug);
  } catch {
    return [];
  }
}
