"use client";

import type { ReactNode } from "react";
import { Heading, Text } from "@/components/atoms";
import { Reveal, Slide, useSlideState } from "@/components/deck-player";
import { AgentFlow } from "@/components/diagrams";

/** The agent-harness components (same set as slide 1.5). */
const AGENT_COMPONENTS = [
  "system prompt",
  "context mgmt",
  "skills & tools",
  "MCPs",
  "sub-agents",
  "plan mode",
  "session persistence",
  "permissions & hooks",
];

/** The user-harness components — what you build on top (some span two cells). */
const USER_COMPONENTS: { label: string; wide?: boolean }[] = [
  { label: "custom CLAUDE.md" },
  { label: "agent_docs/" },
  { label: "custom skills" },
  { label: "issue tracker" },
  { label: "The Ralph loop", wide: true },
  { label: "3rd-party tools", wide: true },
];

const layerColor = {
  agent: { border: "border-layer-agent", text: "text-layer-agent" },
  harness: { border: "border-layer-harness", text: "text-layer-harness" },
  // The deck's brighter "user harness" blue maps onto the accent token so the
  // outer layer reads as the distinct layer-you-own (ADR-0005, no raw hex).
  user: { border: "border-accent", text: "text-accent" },
} as const;

/**
 * FrameLayer — the React port of the deck's `.frame-progressive` layer: the
 * border + corner label fade/draw in once the reveal state reaches `frameMin`,
 * while the children stay visible throughout (so the inner LLM flow shows at
 * state 0 and the layers wrap around it as the stepper advances).
 */
function FrameLayer({
  frameMin,
  label,
  color,
  className,
  children,
}: {
  frameMin: number;
  label: string;
  color: keyof typeof layerColor;
  className?: string;
  children: ReactNode;
}) {
  const revealed = useSlideState() >= frameMin;
  const { border, text } = layerColor[color];
  return (
    <div
      className={`relative rounded-lg border transition-colors duration-500 ${
        revealed ? `${border} bg-bg-soft` : "border-transparent bg-transparent"
      }${className ? ` ${className}` : ""}`}
    >
      <span
        className={`absolute -top-2 left-5 bg-bg px-2 font-mono text-xs uppercase tracking-widest transition-opacity duration-500 ${text} ${
          revealed ? "opacity-100" : "opacity-0"
        }`}
      >
        {label}
      </span>
      {children}
    </div>
  );
}

/** A harness-grid cell (`.harness-component`). */
function Tile({
  children,
  accent = false,
  wide = false,
}: {
  children: ReactNode;
  accent?: boolean;
  wide?: boolean;
}) {
  return (
    <div
      className={`flex min-h-12 items-center justify-center rounded border px-2 py-2 text-center font-mono text-xs leading-tight ${
        accent
          ? "border-accent-soft text-accent"
          : "border-rule bg-bg-card text-ink-soft"
      }${wide ? " md:col-span-2" : ""}`}
    >
      {children}
    </div>
  );
}

/**
 * s-3-0 — "your harness wraps theirs" (index.html data-num 3.0, data-states="4"):
 * the signature layered build. State 0 shows the bare LLM flow; the green agent
 * loop (+ the tool diamond) draws in at state 1; the agent harness shell + its
 * component grid at state 2; the outer user harness + the things you build at
 * state 3. maxState 4.
 */
export function HarnessWrapsTheirs() {
  // The tool loop fades in with the agent layer (state ≥ 1), matching the
  // shared AgentFlow's progressive contract.
  const state = useSlideState();
  return (
    <Slide anchor="center">
      {/* The thesis lands only once the outer user-harness layer is added (state
          3) — the build resolves into the claim, it doesn't pre-announce it. */}
      <Reveal frameMin={3} mode="label">
        <Heading as="h2" size="display-sm" className="mb-3 font-light">
          Your harness <em className="text-accent">wraps theirs</em>.
        </Heading>
        <Text variant="lead" className="mb-8">
          Anthropic ships the agent harness.{" "}
          <em className="text-accent">You ship the layer around it.</em>
        </Text>
      </Reveal>

      <FrameLayer
        frameMin={3}
        label="User harness · what you build"
        color="user"
        className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-7 pb-6 pt-9 max-md:gap-3 max-md:px-3 max-md:pt-7"
      >
        <FrameLayer
          frameMin={2}
          label="Agent harness · Claude Code / Cursor / Codex"
          color="harness"
          className="flex w-full flex-col gap-5 px-6 pb-6 pt-8 max-md:gap-3 max-md:px-2 max-md:pt-7"
        >
          <div className="flex w-full justify-center">
            <FrameLayer
              frameMin={1}
              label="Agent · ↻ while true"
              color="agent"
              className="w-full px-6 pb-6 pt-8 max-md:px-2 max-md:pt-7"
            >
              <AgentFlow showTool={state >= 1} />
            </FrameLayer>
          </div>
          <Reveal frameMin={2}>
            <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
              {AGENT_COMPONENTS.map((c) => (
                <Tile key={c}>{c}</Tile>
              ))}
            </div>
          </Reveal>
        </FrameLayer>
        <Reveal frameMin={3}>
          <div className="grid grid-cols-2 gap-2 md:grid-cols-4">
            {USER_COMPONENTS.map((c) => (
              <Tile key={c.label} accent wide={c.wide}>
                {c.label}
              </Tile>
            ))}
          </div>
        </Reveal>
      </FrameLayer>
    </Slide>
  );
}
