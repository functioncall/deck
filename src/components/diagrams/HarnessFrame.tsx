import type { ReactNode } from "react";
import { Reveal } from "@/components/deck-player";

/**
 * HarnessFrame — the deck's layered `.harness-full` visual (index.html ~1082):
 * the harness layer (blue, `--color-layer-harness`) wrapping the agent layer
 * (green, `--color-layer-agent`, the `↻ WHILE TRUE` loop around the LLM) and the
 * grid of harness components (system prompt, context mgmt, skills, …).
 *
 * When `progressive`, the build is staged through the `Reveal` primitive — the
 * direct port of index.html's `data-frame-min` layered reveal: the agent core
 * appears at state ≥ 1, then the harness shell (border, label, component grid)
 * draws in around it at state ≥ 2. Static (non-progressive) renders everything
 * at once — for the landing page and the styleguide. Token-only (ADR-0005).
 */
type HarnessFrameProps = {
  /** Stage the layered build through `Reveal` (agent @1, harness shell @2). */
  progressive?: boolean;
  className?: string;
  /** Optional extra content slotted below the agent core, inside the harness. */
  children?: ReactNode;
};

/** The deck's `.harness-component` cells — what the harness is, beyond the LLM. */
const HARNESS_COMPONENTS = [
  "system prompt",
  "context mgmt",
  "skills & tools",
  "MCPs",
  "sub-agents",
  "plan mode",
  "session persistence",
  "permissions & hooks",
];

/** The agent layer — the `↻ WHILE TRUE` loop wrapping the LLM (the green frame). */
function AgentCore() {
  return (
    <div className="relative mx-auto w-full rounded-lg border border-layer-agent bg-bg-soft px-6 pb-6 pt-7">
      <span className="absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-agent">
        Agent · ↻ while true
      </span>
      <div className="flex flex-wrap items-center justify-center gap-4 font-mono text-sm italic text-ink-soft">
        <span>user input</span>
        <span aria-hidden="true" className="text-lg not-italic text-ink-dim">
          →
        </span>
        <span className="rounded border-2 border-accent bg-bg-card px-6 py-4 text-lg font-medium not-italic tracking-wider text-ink">
          LLM
        </span>
        <span aria-hidden="true" className="text-lg not-italic text-ink-dim">
          →
        </span>
        <span>output</span>
      </div>
    </div>
  );
}

/** The harness component grid (fades in as one block at state ≥ 2). */
function HarnessGrid() {
  return (
    <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
      {HARNESS_COMPONENTS.map((c) => (
        <div
          key={c}
          className="flex min-h-14 items-center justify-center rounded border border-rule bg-bg-card px-2 py-2 text-center font-mono text-xs leading-tight text-ink-soft"
        >
          {c}
        </div>
      ))}
    </div>
  );
}

export function HarnessFrame({
  progressive = false,
  className,
  children,
}: HarnessFrameProps) {
  // The harness border + eyebrow are an inset overlay (out of flex flow, so it
  // never affects spacing) drawn around the agent core. The eyebrow label rides
  // inside it. In progressive mode the overlay is the `Reveal` wrapper itself so
  // the whole harness shell fades in at state ≥ 2 — the agent core is already
  // visible "inside" by then.
  const shellLabel = (
    <span className="absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-harness">
      Agent harness · Claude Code
    </span>
  );
  const shellClasses =
    "pointer-events-none absolute inset-0 rounded-lg border border-layer-harness";

  return (
    <div
      className={`relative mx-auto flex w-full max-w-3xl flex-col gap-6 rounded-lg bg-bg-soft p-8${
        className ? ` ${className}` : ""
      }`}
    >
      {progressive ? (
        <Reveal frameMin={2} className={shellClasses}>
          {shellLabel}
        </Reveal>
      ) : (
        <div aria-hidden="true" className={shellClasses}>
          {shellLabel}
        </div>
      )}
      {progressive ? (
        <Reveal frameMin={1}>
          <AgentCore />
        </Reveal>
      ) : (
        <AgentCore />
      )}
      {children}
      {progressive ? (
        <Reveal frameMin={2}>
          <HarnessGrid />
        </Reveal>
      ) : (
        <HarnessGrid />
      )}
    </div>
  );
}
