/**
 * ProgressBar — the deck chrome: the `current / total` slide counter (top-right)
 * and the thin progress bar pinned to the bottom edge. Ports `.counter`
 * (`.total` dimmed) and `.progress` / `.progress-bar`. Both are positioned
 * absolutely within the player root (which is the deck container), so they sit
 * at the viewport edges on `/deck` and stay inside the frame when embedded.
 * Token-only (ADR-0005); the bar width is the only computed inline value.
 */
type ProgressBarProps = {
  /** 1-based index of the active slide. */
  current: number;
  /** Total number of slides. */
  total: number;
};

const pad = (n: number) => String(n).padStart(2, "0");

export function ProgressBar({ current, total }: ProgressBarProps) {
  const percent = total > 0 ? (current / total) * 100 : 0;
  return (
    <>
      <div className="pointer-events-none absolute right-7 top-6 z-50 font-mono text-xs tabular-nums tracking-widest text-ink-dim">
        <span>{pad(current)}</span>
        <span className="opacity-50"> / {pad(total)}</span>
      </div>
      <div className="absolute inset-x-0 bottom-0 z-50 h-px bg-rule-soft">
        <div
          className="h-full bg-accent transition-[width] duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </>
  );
}
