"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Heading, Input, Text } from "@/components/atoms";
import { FieldRow } from "./FieldRow";

/**
 * EmailCaptureForm — a single-field email capture (FieldRow + Button) that POSTs
 * to `/api/subscribe` (the L4 subscribe flow → Loops "lead" tag). Client-side
 * validation is the first gate; the authoritative validation lives at the API
 * boundary (ADR-0002/0004). On success it shows a confirmation and calls the
 * optional `onSubmit` callback. Token-only styling (ADR-0005).
 */
type EmailCaptureFormProps = {
  cta?: string;
  placeholder?: string;
  onSubmit?: (email: string) => void;
};

// Pragmatic client-side check; the authoritative validation lives at the L4 boundary.
const EMAIL_PATTERN = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function EmailCaptureForm({
  cta = "Notify me",
  placeholder = "you@company.com",
  onSubmit,
}: EmailCaptureFormProps) {
  const [email, setEmail] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);
  const [submitted, setSubmitted] = useState(false);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (submitting) return;

    const trimmed = email.trim();
    if (!EMAIL_PATTERN.test(trimmed)) {
      setError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }

    setError(undefined);
    setSubmitting(true);
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed }),
      });
      const data = (await res.json().catch(() => null)) as
        | { ok?: boolean; error?: string }
        | null;

      if (!res.ok || !data?.ok) {
        setError(data?.error ?? "Something went wrong. Please try again.");
        setSubmitted(false);
        return;
      }

      setSubmitted(true);
      onSubmit?.(trimmed);
    } catch {
      setError("Network error. Please try again.");
      setSubmitted(false);
    } finally {
      setSubmitting(false);
    }
  }

  // On success, swap the whole form for a confirmation card so the conversion
  // reads as a clear, designed moment (not a stray line of text under the CTA).
  if (submitted && !error) {
    return (
      <div
        role="status"
        aria-live="polite"
        className="animate-fade-up flex w-full max-w-md flex-col items-center gap-5 rounded-lg border border-rule bg-bg-card px-6 py-10 text-center"
      >
        <span className="flex h-14 w-14 items-center justify-center rounded-full bg-accent-soft text-accent">
          <svg
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth={2}
            strokeLinecap="round"
            strokeLinejoin="round"
            className="h-7 w-7"
            aria-hidden="true"
          >
            <path d="M20 6 9 17l-5-5" />
          </svg>
        </span>
        <div className="flex flex-col gap-2">
          <Heading as="h3" size="display-sm">
            You&rsquo;re on the list.
          </Heading>
          <Text variant="soft">
            We&rsquo;ll email you the moment early access opens.
          </Text>
        </div>
      </div>
    );
  }

  return (
    <form
      noValidate
      onSubmit={handleSubmit}
      className="flex w-full max-w-md flex-col gap-4"
    >
      <FieldRow label="Email" htmlFor="email-capture" error={error}>
        <Input
          type="email"
          name="email"
          autoComplete="email"
          placeholder={placeholder}
          value={email}
          invalid={Boolean(error)}
          disabled={submitting}
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(undefined);
          }}
        />
      </FieldRow>
      <Button type="submit" disabled={submitting}>
        {submitting ? "Sending…" : cta}
      </Button>
    </form>
  );
}
