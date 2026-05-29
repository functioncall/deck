/**
 * Gantt — the deck's `.gantt` timeline visual (index.html ~507): one row per
 * phase (a mono label, a proportional bar, a mono duration), used for the
 * plan → execute → review cascade. Each bar shares one timeline: the fill is
 * absolutely positioned by `offset` (left) + `width`, so sequential phases line
 * up edge-to-edge across rows without bleeding past the track (offset + width
 * must stay ≤ 100%). `variant` selects the fill token (plan → ink-soft,
 * agent → accent, review → ink-dim). Token-only styling (ADR-0005).
 */
type GanttVariant = "plan" | "agent" | "review";

type GanttRow = {
  label: string;
  time: string;
  /** Bar width as a CSS length (e.g. "60%"); defaults to a full-width bar. */
  width?: string;
  /** Bar left offset (e.g. "60%") for cascading sequential phases. */
  offset?: string;
  /** Fill token: plan → ink-soft, agent → accent, review → ink-dim. */
  variant?: GanttVariant;
};

type GanttProps = { rows: GanttRow[]; className?: string };

const fillClass: Record<GanttVariant, string> = {
  plan: "bg-ink-soft",
  agent: "bg-accent",
  review: "bg-ink-dim",
};

export function Gantt({ rows, className }: GanttProps) {
  return (
    <div
      className={`flex w-full max-w-2xl flex-col gap-2 text-left${
        className ? ` ${className}` : ""
      }`}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[auto_1fr_auto] items-center gap-4 font-mono text-xs"
        >
          <span className="text-ink-soft">{row.label}</span>
          <span className="relative block h-5 overflow-hidden rounded-sm bg-bg-card">
            <span
              className={`absolute inset-y-0 rounded-sm ${fillClass[row.variant ?? "plan"]}`}
              style={{ left: row.offset ?? "0%", width: row.width ?? "100%" }}
            />
          </span>
          <span className="text-right text-ink-dim">{row.time}</span>
        </div>
      ))}
    </div>
  );
}
