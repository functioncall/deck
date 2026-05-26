import type { ReactNode } from "react";

/**
 * Badge — the deck's `.tool-chip` (index.html ~561): mono label on a raised
 * `bg-soft` surface with a rule border and a small radius. Token-only styling.
 */
type BadgeProps = { children: ReactNode; className?: string };

export function Badge({ children, className }: BadgeProps) {
  return (
    <span
      className={`inline-block rounded border border-rule bg-bg-soft px-4 py-2 font-mono text-sm tracking-wider text-ink${
        className ? ` ${className}` : ""
      }`}
    >
      {children}
    </span>
  );
}
