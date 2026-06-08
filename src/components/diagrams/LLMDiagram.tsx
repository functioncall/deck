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
    <span className="whitespace-nowrap rounded-sm border border-rule bg-bg-soft px-2.5 py-2 font-mono text-xs italic text-ink-soft md:px-4 md:py-3 md:text-sm">
      {children}
    </span>
  );
}

function Arrow() {
  return (
    <span aria-hidden="true" className="font-mono text-base text-ink-dim md:text-lg">
      →
    </span>
  );
}

export function LLMDiagram({ variant = "basic", className }: LLMDiagramProps) {
  const prominent = variant === "prominent";
  // `flex-nowrap` + compact mobile sizing keeps text-in → LLM → text-out on one
  // continuous line on phones (it used to wrap "text out" to a second row); the
  // md: scale restores the deck's full-size diagram on desktop.
  return (
    <div
      className={`flex flex-nowrap items-center justify-center gap-2 md:gap-5${
        className ? ` ${className}` : ""
      }`}
    >
      <Chip>&ldquo;text in&rdquo;</Chip>
      <Arrow />
      <span
        className={`whitespace-nowrap rounded border-accent bg-bg-card font-mono font-medium tracking-wide text-ink ${
          prominent
            ? "border-2 px-4 py-3 text-base md:px-6 md:py-4 md:text-lg md:tracking-wider"
            : "border px-4 py-3 text-sm md:px-8 md:py-5 md:text-base"
        }`}
      >
        LLM
      </span>
      <Arrow />
      <Chip>&ldquo;text out&rdquo;</Chip>
    </div>
  );
}
