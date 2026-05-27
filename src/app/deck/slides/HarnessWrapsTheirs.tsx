"use client";

import type { ReactNode } from "react";
import { Heading, Text } from "@/components/atoms";
import { Reveal, Slide, useSlideState } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";

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
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 03">The harness</SectionLabel>
      <Heading as="h2" size="display-sm" className="mb-3 font-light">
        Your harness <em className="text-accent">wraps theirs</em>.
      </Heading>
      <Text variant="lead" className="mb-8">
        Anthropic ships the agent harness.{" "}
        <em className="text-accent">You ship the layer around it.</em>
      </Text>

      <FrameLayer
        frameMin={3}
        label="User harness · what you build"
        color="user"
        className="mx-auto flex w-full max-w-3xl flex-col gap-5 px-7 pb-6 pt-9"
      >
        <FrameLayer
          frameMin={2}
          label="Agent harness · Claude Code / Cursor / Codex"
          color="harness"
          className="flex w-full flex-col gap-5 px-6 pb-6 pt-8"
        >
          <div className="flex w-full justify-center">
            <FrameLayer
              frameMin={1}
              label="Agent · ↻ while true"
              color="agent"
              className="w-full px-6 pb-6 pt-8"
            >
              <div className="flex flex-wrap items-start justify-center gap-4 font-mono">
                <span className="pt-5 text-sm italic text-ink-soft">
                  user input
                </span>
                <span aria-hidden="true" className="pt-5 text-xl text-ink-soft">
                  →
                </span>
                <div className="flex flex-col items-center gap-3">
                  <span className="rounded border-2 border-accent bg-bg-card px-6 py-4 text-lg font-medium tracking-wider text-ink">
                    LLM
                  </span>
                  <Reveal
                    frameMin={1}
                    mode="label"
                    className="flex flex-col items-center gap-3"
                  >
                    <div
                      aria-hidden="true"
                      className="flex gap-2 text-lg leading-none text-ink-soft"
                    >
                      <span>↑</span>
                      <span>↓</span>
                    </div>
                    <div className="flex size-14 rotate-45 items-center justify-center border border-accent-soft bg-bg-soft">
                      <span className="-rotate-45 font-mono text-sm tracking-wide text-ink">
                        tool
                      </span>
                    </div>
                  </Reveal>
                </div>
                <span aria-hidden="true" className="pt-5 text-xl text-ink-soft">
                  →
                </span>
                <span className="pt-5 text-sm italic text-ink-soft">output</span>
              </div>
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
