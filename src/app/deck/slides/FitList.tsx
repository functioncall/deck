import type { ReactNode } from "react";

/**
 * FitList — the deck's labelled `.fit-list` criteria rows (index.html slides
 * 6.2/6.3): a `.ctx-label` chip (good/bad tone) over numbered rows, each a mono
 * index, a serif-italic heading, and dimmed supporting prose, ruled off from the
 * next. Shared chrome for the §6 task-selection slides — not a registry slide.
 * Token-only (ADR-0005); the chip tints reuse the `good`/`bad` tokens.
 */
type FitItem = { heading: ReactNode; why: ReactNode };

type FitListProps = {
  label: string;
  tone: "good" | "bad";
  items: FitItem[];
};

export function FitList({ label, tone, items }: FitListProps) {
  return (
    <div className="flex w-full max-w-3xl flex-col text-left">
      <span
        className={`mb-6 inline-block self-start rounded-sm px-3 py-1 font-mono text-xs uppercase tracking-widest ${
          tone === "good" ? "bg-good/10 text-good" : "bg-bad/10 text-bad"
        }`}
      >
        {label}
      </span>
      <div className="flex flex-col gap-5">
        {items.map((item, i) => (
          <div
            key={i}
            className="flex items-baseline gap-4 border-b border-rule pb-5 last:border-b-0 last:pb-0"
          >
            <span className="w-7 shrink-0 font-mono text-sm text-ink-dim">
              {String(i + 1).padStart(2, "0")}
            </span>
            <div className="flex-1">
              <div className="mb-1 font-serif text-2xl italic text-ink">
                {item.heading}
              </div>
              <div className="text-sm leading-snug text-ink-soft">
                {item.why}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
