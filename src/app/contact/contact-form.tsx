"use client";

import { useActionState, useState } from "react";
import { sendFeedback, type FormState } from "./actions";

export function ContactForm({ configured }: { configured: boolean }) {
  const [state, action, pending] = useActionState<FormState, FormData>(sendFeedback, { status: "idle", message: "" });
  const [t] = useState(() => Date.now());
  const err = state.fieldErrors ?? {};

  if (state.status === "ok") {
    return (
      <p role="status" className="note text-base text-text">
        {state.message}
      </p>
    );
  }

  return (
    <form action={action} className="space-y-5" noValidate>
      {!configured && (
        <p className="note-warn">
          The contact form isn&rsquo;t connected yet, so messages can&rsquo;t be delivered at the moment. Every tool on the site still works normally.
        </p>
      )}
      <div className="grid gap-5 sm:grid-cols-2">
        <div>
          <label htmlFor="name" className="label">
            Name <span className="font-normal text-muted">(optional)</span>
          </label>
          <input id="name" name="name" autoComplete="name" maxLength={100} className="field" />
        </div>
        <div>
          <label htmlFor="email" className="label">
            Email <span className="font-normal text-muted">(optional, for a reply)</span>
          </label>
          <input id="email" name="email" type="email" inputMode="email" autoComplete="email" maxLength={200} aria-invalid={!!err.email || undefined} aria-describedby={err.email ? "email-err" : undefined} className="field" />
          {err.email && <p id="email-err" className="mt-1 text-sm text-danger">{err.email}</p>}
        </div>
      </div>
      <div>
        <label htmlFor="topic" className="label">
          Topic
        </label>
        <select id="topic" name="topic" className="field sm:max-w-xs" defaultValue="general">
          <option value="general">General feedback</option>
          <option value="bug">Something isn&rsquo;t working</option>
          <option value="feature">Tool suggestion</option>
          <option value="privacy">Privacy question</option>
          <option value="other">Other</option>
        </select>
      </div>
      <div>
        <label htmlFor="message" className="label">
          Message
        </label>
        <textarea id="message" name="message" required minLength={10} maxLength={5000} rows={6} aria-invalid={!!err.message || undefined} aria-describedby={err.message ? "message-err" : undefined} className="field py-2" />
        {err.message && <p id="message-err" className="mt-1 text-sm text-danger">{err.message}</p>}
      </div>
      {/* Honeypot: hidden from people and assistive tech. */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor="company">Company</label>
        <input id="company" name="company" tabIndex={-1} autoComplete="off" />
      </div>
      <input type="hidden" name="t" value={t} />
      <div className="flex flex-wrap items-center gap-4">
        <button type="submit" className="btn-primary" disabled={pending || !configured}>
          {pending ? "Sending…" : "Send message"}
        </button>
        <p role="alert" className={state.status === "error" ? "text-sm text-danger" : "sr-only"}>
          {state.status === "error" ? state.message : ""}
        </p>
      </div>
      <p className="text-sm text-muted">Please don&rsquo;t include passwords or other sensitive details. Your files are never needed to report a problem.</p>
    </form>
  );
}
