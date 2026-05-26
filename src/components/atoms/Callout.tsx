import type { ReactNode } from "react";

/**
 * Callout — the deck's `.callout` annotation line (index.html ~384): an accent
 * ◆ marker followed by sans ink-soft body copy, where any `<strong>` lifts to
 * full `ink`. The marker is decorative (`aria-hidden`). Token-only styling
 * (ADR-0005).
 */
type CalloutProps = { children: ReactNode; className?: string };

export function Callout({ children, className }: CalloutProps) {
  return (
    <p
      className={`flex items-baseline gap-3 font-sans text-base leading-normal text-ink-soft [&_strong]:font-medium [&_strong]:text-ink${
        className ? ` ${className}` : ""
      }`}
    >
      <span aria-hidden="true" className="flex-shrink-0 text-xs text-accent">
        ◆
      </span>
      <span>{children}</span>
    </p>
  );
}
