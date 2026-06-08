import type { ReactNode } from "react";

/**
 * ContextWindow — the deck's `.context-window-large` visual (index.html ~1253):
 * a labelled frame holding the stacked context messages (system prompt, tool
 * defs, CLAUDE.md, the running conversation) above a dashed "unused context"
 * region, making the finite 200K budget tangible. `tall` is the deck's `.tall`
 * variant; `label` overrides the frame eyebrow. Token-only styling (ADR-0005) —
 * the deck's bespoke per-role rgba tints map onto the existing theme tokens
 * (system → harness, user → good, assistant → accent, tool → bad).
 */
type ContextWindowProps = {
  /** The deck's `.tall` variant — a taller frame for the long-context slides. */
  tall?: boolean;
  /** Overrides the frame eyebrow (default "CONTEXT WINDOW · 200K"). */
  label?: string;
  /** Appends " · not to scale" to the eyebrow — the diagram is illustrative. */
  notToScale?: boolean;
  className?: string;
};

type Tone = "system" | "context" | "user" | "assistant" | "tool";

/** Per-role border + text token (the deck's `.ctx-msg.*` tints, tokenised). */
const toneClass: Record<Tone, string> = {
  system: "border-layer-harness text-layer-harness",
  context: "border-rule text-ink-soft",
  user: "border-good text-good",
  assistant: "border-accent text-accent",
  tool: "border-bad text-bad",
};

function Msg({
  tone,
  size,
  children,
}: {
  tone: Tone;
  size: string;
  children: ReactNode;
}) {
  return (
    <div
      className={`flex flex-shrink-0 items-center justify-between rounded-sm border bg-bg-soft px-3 py-2 font-mono text-xs ${toneClass[tone]}`}
    >
      <span>{children}</span>
      <span className="text-ink-dim">{size}</span>
    </div>
  );
}

export function ContextWindow({
  tall,
  label,
  notToScale,
  className,
}: ContextWindowProps) {
  const eyebrow = label ?? "CONTEXT WINDOW · 200K";
  return (
    <div
      className={`relative flex w-full max-w-md flex-col gap-1.5 rounded-md border border-rule bg-bg-card p-2 ${
        tall ? "min-h-[80vh]" : "min-h-96"
      }${className ? ` ${className}` : ""}`}
    >
      <span className="absolute -top-2 left-3 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
        {notToScale ? `${eyebrow} · not to scale` : eyebrow}
      </span>
      <Msg tone="system" size="6.3k">
        system prompt
      </Msg>
      <Msg tone="context" size="9.5k">
        tool definitions
      </Msg>
      <Msg tone="context" size="2.5k">
        CLAUDE.md
      </Msg>
      <Msg tone="user" size="0.4k">
        user message
      </Msg>
      <Msg tone="assistant" size="1.2k">
        assistant
      </Msg>
      <Msg tone="tool" size="3.1k">
        tool result
      </Msg>
      <div className="flex flex-1 items-end justify-center rounded-sm border border-dashed border-rule pb-4 font-mono text-xs uppercase tracking-widest text-ink-dim">
        unused context
      </div>
    </div>
  );
}
