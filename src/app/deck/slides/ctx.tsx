"use client";

import type { ReactNode } from "react";
import { useSlideState } from "@/components/deck-player";

/**
 * The §2 context-window chrome (index.html slides 2.0b–2.3): the labelled
 * `ContextFrame` with the smart-zone / dumb-zone overlay line, the per-role
 * `CtxMsg` rows, the `CtxEmpty` budget footer, and `StateRange` — the port of the
 * deck's `data-state-min` / `data-state-max` swapping (so the window's contents
 * change as the stepper advances). Client because the swap reads the active
 * slide's reveal state. The deck's bespoke per-role rgba tints map onto existing
 * theme tokens (system → harness, user → good, assistant → accent, errors → bad),
 * matching the epic-1 `ContextWindow`. Token-only (ADR-0005).
 */

/**
 * StateRange — renders its children only while the active slide's reveal state is
 * within `[min, max]` (the port of `data-state-min` / `data-state-max`). Removed
 * from layout when out of range so swapped variants of differing height never
 * double-stack (the deck swaps, it does not overlay).
 */
export function StateRange({
  min = 0,
  max,
  children,
}: {
  min?: number;
  max?: number;
  children: ReactNode;
}) {
  const state = useSlideState();
  const shown = state >= min && (max === undefined || state <= max);
  return shown ? <>{children}</> : null;
}

/** The deck's smart-zone / dumb-zone overlay (`.ctx-zone-line`, ~60% down). */
function ZoneLine() {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-1 top-[60%] z-10 border-t border-dashed border-ink-soft"
    >
      <span className="absolute -top-4 right-1 font-mono text-xs uppercase tracking-wider text-accent">
        smart zone
      </span>
      <span className="absolute top-1 right-1 font-mono text-xs uppercase tracking-wider text-bad">
        dumb zone
      </span>
    </div>
  );
}

/** ContextFrame — the deck's tall `.context-window-large` framed budget. */
export function ContextFrame({
  label = "Context window · 200K",
  zone = true,
  children,
}: {
  label?: string;
  zone?: boolean;
  children: ReactNode;
}) {
  return (
    <div className="relative flex min-h-[80vh] w-full max-w-sm flex-col gap-1.5 rounded-md border border-rule bg-bg-card p-2">
      <span className="absolute -top-2 left-3 z-10 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
        {label}
      </span>
      {zone ? <ZoneLine /> : null}
      {children}
    </div>
  );
}

/** Per-role context message tints (the deck's `.ctx-msg.*`, tokenised). */
type Tone = "system" | "context" | "user" | "assistant" | "bad";
const toneClass: Record<Tone, string> = {
  system: "border-layer-harness text-layer-harness",
  context: "border-rule text-ink-soft",
  user: "border-good text-good",
  assistant: "border-accent text-accent",
  bad: "border-bad text-bad",
};

export function CtxMsg({
  tone = "context",
  size,
  className,
  children,
}: {
  tone?: Tone;
  size?: string;
  className?: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-between gap-2 rounded-sm border bg-bg-soft px-3 py-1.5 font-mono text-xs ${
        toneClass[tone]
      }${className ? ` ${className}` : ""}`}
    >
      <span>{children}</span>
      {size ? <span className="text-ink-dim">{size}</span> : null}
    </div>
  );
}

/** The dashed "remaining budget" footer (`.ctx-empty`) — fills the slack space. */
export function CtxEmpty({
  tone = "default",
  children,
}: {
  tone?: "default" | "bad";
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-1 items-end justify-center rounded-sm border border-dashed pb-4 text-center font-mono text-xs uppercase tracking-wider ${
        tone === "bad" ? "border-bad text-bad" : "border-rule text-ink-dim"
      }`}
    >
      {children}
    </div>
  );
}
