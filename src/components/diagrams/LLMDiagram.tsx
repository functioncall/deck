import type { ReactNode } from "react";

/**
 * LLMDiagram — the deck's `.llm-flow` inference visual (index.html ~876): an
 * italic mono input chip → arrow → the accent-bordered `LLM` box → arrow →
 * output chip, illustrating "an LLM is a function: text in, text out, stateless".
 * The `prominent` variant is the deck's `.llm-box.prominent` (larger, used inside
 * the agent/harness frames). Token-only styling (ADR-0005).
 */
type LLMDiagramProps = {
  /** `"prominent"` enlarges the LLM box (the deck's `.llm-box.prominent`). */
  variant?: "basic" | "prominent";
  className?: string;
};

function Chip({ children }: { children: ReactNode }) {
  return (
    <span className="rounded-sm border border-rule bg-bg-soft px-4 py-3 font-mono text-sm italic text-ink-soft">
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="font-mono text-lg text-ink-dim">
      →
    </span>
  );
}

export function LLMDiagram({ variant = "basic", className }: LLMDiagramProps) {
  const prominent = variant === "prominent";
  return (
    <div
      className={`flex flex-wrap items-center justify-center gap-5${
        className ? ` ${className}` : ""
      }`}
    >
      <Chip>&ldquo;text in&rdquo;</Chip>
      <Arrow />
      <span
        className={`rounded border-accent bg-bg-card font-mono font-medium tracking-wide text-ink ${
          prominent
            ? "border-2 px-6 py-4 text-lg tracking-wider"
            : "border px-8 py-5 text-base"
        }`}
      >
        LLM
      </span>
      <Arrow />
      <Chip>&ldquo;text out&rdquo;</Chip>
    </div>
  );
}
