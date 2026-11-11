"use server";

import { headers } from "next/headers";
import { z } from "zod";
import { insertFeedback, supabaseConfigured } from "@/lib/supabase";

export type FormState = { status: "idle" | "ok" | "error"; message: string; fieldErrors?: Record<string, string> };

const schema = z.object({
  name: z.string().trim().max(100, "Keep your name under 100 characters.").optional().or(z.literal("")),
  email: z.union([z.literal(""), z.string().trim().max(200).email("Enter a valid email address, or leave it empty.")]),
  topic: z.enum(["general", "bug", "feature", "privacy", "other"]),
  message: z.string().trim().min(10, "Please write at least 10 characters.").max(5000, "Keep your message under 5,000 characters."),
  page: z.string().trim().max(200).optional().or(z.literal("")),
});

// Simple in-memory limiter: 3 messages per 10 minutes per IP.
// On serverless hosts each instance has its own memory, so this is a speed bump, not a guarantee.
const hits = new Map<string, number[]>();
const WINDOW = 10 * 60 * 1000;
const LIMIT = 3;

function limited(ip: string) {
  const now = Date.now();
  const recent = (hits.get(ip) ?? []).filter((t) => now - t < WINDOW);
  if (recent.length >= LIMIT) return true;
  recent.push(now);
  hits.set(ip, recent);
  // Bound memory: drop the oldest entry instead of resetting everyone.
  if (hits.size > 5000) hits.delete(hits.keys().next().value!);
  return false;
}

export async function sendFeedback(_: FormState, form: FormData): Promise<FormState> {
  // Honeypot: real people never see or fill this field. Pretend success for bots.
  if (form.get("company")) return { status: "ok", message: "Thanks, your message was sent." };

  // Too-fast submissions (under 2 seconds after the form rendered) are almost always bots.
  const started = Number(form.get("t"));
  if (Number.isFinite(started) && Date.now() - started < 2000) return { status: "ok", message: "Thanks, your message was sent." };

  if (!supabaseConfigured) {
    return { status: "error", message: "The contact form isn't connected yet. Please try again later." };
  }

  const parsed = schema.safeParse({
    name: form.get("name") ?? "",
    email: form.get("email") ?? "",
    topic: form.get("topic") ?? "general",
    message: form.get("message") ?? "",
    page: form.get("page") ?? "",
  });
  if (!parsed.success) {
    const fieldErrors: Record<string, string> = {};
    for (const issue of parsed.error.issues) fieldErrors[String(issue.path[0])] ??= issue.message;
    return { status: "error", message: "Please fix the highlighted fields.", fieldErrors };
  }

  const h = await headers();
  // Prefer headers set by the host (Vercel), which clients can't spoof; fall back to the right-most proxy hop.
  const ip = h.get("x-vercel-forwarded-for") || h.get("x-real-ip") || h.get("x-forwarded-for")?.split(",").pop()?.trim();
  if (ip && limited(ip)) return { status: "error", message: "You've sent several messages in a short time. Please wait a few minutes and try again." };

  const d = parsed.data;
  const res = await insertFeedback({
    name: d.name || null,
    email: d.email || null,
    topic: d.topic,
    message: d.message,
    page: d.page || null,
  });
  if (!res.ok) return { status: "error", message: "Your message couldn't be sent right now. Please try again later." };
  return { status: "ok", message: "Thanks, your message was sent. If you left an email, we'll reply there." };
}
