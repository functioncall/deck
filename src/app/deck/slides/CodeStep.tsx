"use client";

import type { ReactNode } from "react";
import { useSlideState } from "@/components/deck-player";

/**
 * CodeStep — one line of the slide-1.4 `agent.py` block. It highlights (accent
 * left border + tint, like index.html's `.code-line.active`) while the active
 * reveal state is one of `on`, restoring the deck's `data-state-lines` tracking
 * so the code follows the console log step by step. A block line inside the
 * `CodeBlock` <pre>; lines with no `on` (e.g. the comment) render plain.
 * Token-only (ADR-0005).
 */
export function CodeStep({
  on,
  children,
}: {
  on?: number[];
  children: ReactNode;
}) {
  const state = useSlideState();
  const active = on?.includes(state) ?? false;
  return (
    <span
      className={`-ml-2 block border-l-2 pl-2 transition-colors duration-300 ${
        active ? "border-accent bg-accent/10 text-ink" : "border-transparent"
      }`}
    >
      {children}
    </span>
  );
}
