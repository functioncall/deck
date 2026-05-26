import type { ReactNode } from "react";

/**
 * Label — the deck's `.label` eyebrow (index.html ~212): mono, uppercase, wide
 * tracking, dim ink. `accent` switches it to the gold brand accent
 * (`.label.accent`). Token-only styling.
 */
type LabelProps = { accent?: boolean; children: ReactNode; className?: string };

export function Label({ accent = false, children, className }: LabelProps) {
  return (
    <span
      className={`font-mono text-xs font-medium uppercase tracking-widest ${
        accent ? "text-accent" : "text-ink-dim"
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </span>
  );
}
