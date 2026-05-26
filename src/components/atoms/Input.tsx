import type { InputHTMLAttributes } from "react";

/**
 * Input — net-new token-styled text/email field. Raised `bg-soft` surface, rule
 * border, ink text with dim placeholder, accent focus ring. `invalid` switches
 * the border to the `bad` token and sets `aria-invalid` for assistive tech.
 * Markup only — no submission logic (L4). Token-only styling (ADR-0005).
 */
type InputProps = InputHTMLAttributes<HTMLInputElement> & { invalid?: boolean };

export function Input({ invalid = false, className, ...props }: InputProps) {
  return (
    <input
      aria-invalid={invalid || undefined}
      className={`w-full rounded border bg-bg-soft px-4 py-3 font-sans text-ink transition-colors placeholder:text-ink-dim focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent ${
        invalid ? "border-bad" : "border-rule focus:border-accent"
      }${className ? ` ${className}` : ""}`}
      {...props}
    />
  );
}
