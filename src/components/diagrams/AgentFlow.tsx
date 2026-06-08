/**
 * AgentFlow — the deck's agent primitive: the bare `user input → LLM → output`
 * inference flow with the `↑↓ tool` loop hanging below the LLM. One source for
 * the three places the deck draws it — the standalone agent frame (slide 1.2,
 * `AgentLoop`), the progressive `HarnessFrame` (slide 1.5), and the layered
 * `HarnessWrapsTheirs` build (slide 3.0) — so they stay identical and any layout
 * fix lands everywhere at once.
 *
 * The row never wraps (`flex-nowrap`) and shrinks on mobile so it stays a clean
 * single line instead of jumbling into overlapping fragments on a narrow screen
 * (the old `flex-wrap` broke `user input → / LLM → output / ↑↓ tool` apart). The
 * tool loop is always mounted and faded by `showTool` — opacity only, never
 * reflow — so a progressive build wraps the layers around a primitive that stays
 * put. The wrapping border + corner label are the parent frame's job.
 * Token-only (ADR-0005).
 */
export function AgentFlow({ showTool = true }: { showTool?: boolean }) {
  return (
    <div className="flex flex-nowrap items-start justify-center gap-2 font-mono md:gap-4">
      <span className="whitespace-nowrap pt-4 text-xs italic text-ink-soft md:pt-5 md:text-sm">
        user input
      </span>
      <span
        aria-hidden="true"
        className="pt-4 text-base text-ink-soft md:pt-5 md:text-xl"
      >
        →
      </span>
      <div className="flex flex-col items-center gap-2 md:gap-3">
        <span className="whitespace-nowrap rounded border-2 border-accent bg-bg-card px-4 py-3 text-base font-medium tracking-wider text-ink md:px-6 md:py-4 md:text-lg">
          LLM
        </span>
        <div
          aria-hidden="true"
          className={`flex flex-col items-center gap-2 transition-opacity duration-500 md:gap-3 ${
            showTool ? "opacity-100" : "opacity-0"
          }`}
        >
          <div className="flex gap-2 text-base leading-none text-ink-soft md:text-lg">
            <span>↑</span>
            <span>↓</span>
          </div>
          <div className="flex size-12 rotate-45 items-center justify-center border border-accent-soft bg-bg-soft md:size-14">
            <span className="-rotate-45 font-mono text-xs tracking-wide text-ink md:text-sm">
              tool
            </span>
          </div>
        </div>
      </div>
      <span
        aria-hidden="true"
        className="pt-4 text-base text-ink-soft md:pt-5 md:text-xl"
      >
        →
      </span>
      <span className="whitespace-nowrap pt-4 text-xs italic text-ink-soft md:pt-5 md:text-sm">
        output
      </span>
    </div>
  );
}
