"use client";

import { useEffect, useRef, useState } from "react";
import { useStoryForm, type StoryTopic } from "./StoryFormProvider";
import { storyForm, contact } from "@/lib/site";

const TOPICS: StoryTopic[] = [
  "Recovery",
  "Mental health",
  "Community",
  "Second chances",
  "Podcast guest",
  "Other",
];

type Status = "idle" | "submitting" | "success" | "error" | "fallback";

export default function StoryFormModal() {
  const { open, presetTopic, closeForm } = useStoryForm();
  const [status, setStatus] = useState<Status>("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});
  const dialogRef = useRef<HTMLDivElement>(null);
  const firstFieldRef = useRef<HTMLInputElement>(null);

  // Reset + focus when opened; lock body scroll while open.
  useEffect(() => {
    if (!open) return;
    setStatus("idle");
    setErrors({});
    document.body.style.overflow = "hidden";
    const t = setTimeout(() => firstFieldRef.current?.focus(), 50);
    return () => {
      document.body.style.overflow = "";
      clearTimeout(t);
    };
  }, [open]);

  // Close on Escape.
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && closeForm();
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open, closeForm]);

  if (!open) return null;

  const usingEmbed = storyForm.embedUrl.trim() !== "";

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);

    // Honeypot: real people leave this empty.
    if ((data.get("company") as string)?.trim()) return;

    const next: Record<string, string> = {};
    const name = (data.get("name") as string)?.trim();
    const email = (data.get("email") as string)?.trim();
    const story = (data.get("story") as string)?.trim();
    if (!name) next.name = "Please add your name.";
    if (!email || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
      next.email = "Please add a valid email.";
    if (!story) next.story = "Tell us a little about your story.";
    if (!data.get("consent")) next.consent = "Please tick the consent box.";
    setErrors(next);
    if (Object.keys(next).length > 0) return;

    // No Growtheon endpoint connected yet → graceful email fallback.
    if (!storyForm.endpoint.trim()) {
      setStatus("fallback");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch(storyForm.endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(Object.fromEntries(data.entries())),
      });
      setStatus(res.ok ? "success" : "error");
    } catch {
      setStatus("error");
    }
  }

  const fieldCls =
    "w-full rounded-xl border border-white/15 bg-ink px-4 py-2.5 text-white placeholder:text-white/40 focus:border-orange-500/60 focus:outline-none";

  return (
    <div
      className="fixed inset-0 z-[70] flex items-start justify-center overflow-y-auto p-4 sm:items-center"
      role="dialog"
      aria-modal="true"
      aria-label="Tell us your story"
    >
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/70 backdrop-blur-sm"
        onClick={closeForm}
      />

      {/* Panel */}
      <div
        ref={dialogRef}
        className={`relative my-6 w-full max-w-lg rounded-2xl border border-white/10 bg-charcoal shadow-2xl ${
          usingEmbed ? "flex h-[min(760px,85vh)] flex-col overflow-hidden" : ""
        }`}
      >
        <div className="flex shrink-0 items-start justify-between gap-4 border-b border-white/10 p-6">
          <div>
            <h2 className="headline text-2xl text-white">Tell Us Your Story</h2>
            <p className="mt-1 text-sm text-white/60">
              Real voices are the whole point. Share yours — a real person reads
              every one, and nothing is published without your say-so.
            </p>
          </div>
          <button
            type="button"
            onClick={closeForm}
            aria-label="Close"
            className="-mr-1 -mt-1 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-full text-white/70 hover:bg-white/10 hover:text-white"
          >
            ✕
          </button>
        </div>

        {/* Growtheon / LeadRescue iframe once embedUrl is set */}
        {usingEmbed ? (
          <div className="min-h-0 flex-1 p-2">
            <iframe
              src={storyForm.embedUrl}
              title="Tell us your story"
              className="h-full w-full rounded-xl"
              loading="lazy"
            />
          </div>
        ) : status === "success" ? (
          <SuccessBlock onClose={closeForm} />
        ) : (
          <form onSubmit={handleSubmit} className="space-y-4 p-6">
            {/* Honeypot */}
            <input
              type="text"
              name="company"
              tabIndex={-1}
              autoComplete="off"
              className="hidden"
              aria-hidden
            />

            <Field label="Your name" error={errors.name}>
              <input
                ref={firstFieldRef}
                name="name"
                type="text"
                className={fieldCls}
                placeholder="First name is fine"
              />
            </Field>

            <Field label="Email" error={errors.email}>
              <input
                name="email"
                type="email"
                className={fieldCls}
                placeholder="So we can reach back"
              />
            </Field>

            <div className="grid gap-4 sm:grid-cols-2">
              <Field label="Phone (optional)">
                <input name="phone" type="tel" className={fieldCls} />
              </Field>
              <Field label="What's it about?">
                <select
                  name="topic"
                  defaultValue={presetTopic ?? ""}
                  className={fieldCls}
                >
                  <option value="" disabled>
                    Choose one…
                  </option>
                  {TOPICS.map((t) => (
                    <option key={t} value={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </Field>
            </div>

            <Field label="Your story" error={errors.story}>
              <textarea
                name="story"
                rows={4}
                className={fieldCls}
                placeholder="A sentence or a paragraph — however much you want to share."
              />
            </Field>

            <label className="flex items-start gap-2.5 text-sm text-white/70">
              <input
                name="consent"
                type="checkbox"
                className="mt-0.5 h-4 w-4 shrink-0 accent-orange-500"
              />
              <span>
                I&apos;m okay with People Suq contacting me about my story.
                {errors.consent && (
                  <span className="mt-1 block text-orange-400">
                    {errors.consent}
                  </span>
                )}
              </span>
            </label>

            {status === "error" && (
              <p className="rounded-lg border border-orange-500/30 bg-orange-500/10 px-3 py-2 text-sm text-orange-200">
                Something went wrong sending that. Please try again, or email{" "}
                <a
                  href={`mailto:${contact.storyEmail}`}
                  className="underline"
                >
                  {contact.storyEmail}
                </a>
                .
              </p>
            )}

            {status === "fallback" && (
              <p className="rounded-lg border border-white/15 bg-white/[0.04] px-3 py-2 text-sm text-white/70">
                Thanks! Our story form is being finalised. For now, please email
                your story to{" "}
                <a
                  href={`mailto:${contact.storyEmail}`}
                  className="text-orange-400 underline"
                >
                  {contact.storyEmail}
                </a>{" "}
                — a real person will reply.
              </p>
            )}

            <button
              type="submit"
              disabled={status === "submitting"}
              className="w-full rounded-full bg-orange-500 px-6 py-3 font-semibold text-ink transition-colors hover:bg-orange-400 disabled:opacity-60"
            >
              {status === "submitting" ? "Sending…" : "Send my story"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="mb-1.5 block text-sm font-medium text-white/80">
        {label}
      </span>
      {children}
      {error && <span className="mt-1 block text-sm text-orange-400">{error}</span>}
    </label>
  );
}

function SuccessBlock({ onClose }: { onClose: () => void }) {
  return (
    <div className="p-8 text-center">
      <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-orange-500/15 text-2xl">
        ✓
      </div>
      <h3 className="text-xl font-bold text-white">Thank you — we&apos;ve got it.</h3>
      <p className="mt-2 text-sm text-white/65">
        A real person reads every story that comes in. We&apos;ll be in touch.
      </p>
      <button
        type="button"
        onClick={onClose}
        className="mt-6 rounded-full border border-white/20 px-6 py-2.5 text-sm font-semibold text-white hover:bg-white/10"
      >
        Close
      </button>
    </div>
  );
}
