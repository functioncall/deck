"use client";

import type { ReactNode } from "react";
import { useSlideState } from "@/components/deck-player";
import { AgentFlow } from "./AgentFlow";

/**
 * HarnessFrame — the deck's layered `.harness-full` visual (index.html ~1082):
 * the harness layer (blue, `--color-layer-harness`) wrapping the agent layer
 * (green, `--color-layer-agent`, the `↻ WHILE TRUE` loop around the LLM + the
 * tool diamond) and the grid of harness components.
 *
 * When `progressive`, the build is staged in three steps driven by the active
 * slide's reveal state (read via `useSlideState`), so it reads as a buildup
 * rather than appearing whole:
 *   - **state 0** — only the bare `user input → LLM → output` primitive: no green
 *     agent border, no tool diamond, no harness box/background.
 *   - **state 1** — the green `↻ WHILE TRUE` agent loop draws in *with* the tool
 *     diamond (the agent primitive — consistent with `AgentLoop` / slide 3.0).
 *   - **state 2** — the harness shell (border, background, label) + the component
 *     grid draw in around it.
 * Borders/backgrounds transition by token (opacity/color only, never reflow), so
 * the primitive stays put as the layers wrap around it. Static (non-progressive)
 * renders everything at once — for the landing page and the styleguide.
 * Token-only (ADR-0005).
 */
type HarnessFrameProps = {
  /** Stage the layered build through the reveal state (agent @1, harness @2). */
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

/**
 * The agent layer — the bare `user input → LLM → output` flow, wrapped by the
 * green `↻ WHILE TRUE` border + tool diamond once `revealed`. The flow text is
 * always present; the border, label, and tool diamond fade in together so the
 * primitive becomes the agent loop in one step.
 */
function AgentCore({ revealed }: { revealed: boolean }) {
  return (
    <div
      className={`relative mx-auto w-full rounded-lg border px-4 pb-4 pt-6 transition-colors duration-500 max-md:px-3 ${
        revealed ? "border-layer-agent bg-bg-soft" : "border-transparent"
      }`}
    >
      <span
        className={`absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-agent transition-opacity duration-500 ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        Agent · ↻ while true
      </span>
      <AgentFlow showTool={revealed} />
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
          className="flex min-h-12 items-center justify-center rounded border border-rule bg-bg-card px-2 py-2 text-center font-mono text-xs leading-tight text-ink-soft"
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
  const state = useSlideState();
  // Static renders everything; progressive gates each layer on the reveal state.
  const agentRevealed = !progressive || state >= 1;
  const harnessRevealed = !progressive || state >= 2;

  return (
    <div
      className={`relative mx-auto flex w-full max-w-3xl flex-col gap-4 rounded-lg border px-4 pb-4 pt-6 transition-colors duration-500 max-md:px-3 ${
        harnessRevealed ? "border-layer-harness bg-bg-soft" : "border-transparent"
      }${className ? ` ${className}` : ""}`}
    >
      <span
        className={`absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest text-layer-harness transition-opacity duration-500 ${
          harnessRevealed ? "opacity-100" : "opacity-0"
        }`}
      >
        Agent harness · Claude Code
      </span>
      <AgentCore revealed={agentRevealed} />
      {children}
      <div
        className={`transition-opacity duration-500 ${
          harnessRevealed ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
      >
        <HarnessGrid />
      </div>
    </div>
  );
}
