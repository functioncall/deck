"use client";

import { useState } from "react";
import type { FormEvent } from "react";
import { Button, Input, Text } from "@/components/atoms";
import { FieldRow } from "./FieldRow";

/**
 * EmailCaptureForm — a single-field email capture (FieldRow + Button) with
 * client-side validation only. On a valid submit it calls the optional
 * `onSubmit` callback and shows a confirmation; it does NOT POST anywhere — the
 * `/api/subscribe` wiring is L4 (ADR-0002/0004). Token-only styling (ADR-0005).
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

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (!EMAIL_PATTERN.test(email.trim())) {
      setError("Enter a valid email address.");
      setSubmitted(false);
      return;
    }
    setError(undefined);
    setSubmitted(true);
    onSubmit?.(email.trim()); // client-only; no network call in L1
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
          onChange={(event) => {
            setEmail(event.target.value);
            if (error) setError(undefined);
          }}
        />
      </FieldRow>
      <Button type="submit">{cta}</Button>
      {submitted && !error ? (
        <Text variant="soft">Thanks — you&rsquo;re on the list.</Text>
      ) : null}
    </form>
  );
}
