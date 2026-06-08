/**
 * Gantt — the deck's `.gantt` timeline visual (index.html ~507): one row per
 * phase (a proportional bar with its phase label riding above it, plus a mono
 * duration), used for the plan → execute → review cascade. Each bar shares one
 * timeline: the fill is absolutely positioned by `offset` (left) + `width`, so
 * sequential phases line up edge-to-edge across rows without bleeding past the
 * track (offset + width must stay ≤ 100%); the label uses the same `offset` so
 * it sits over the bar's start. `variant` selects the fill token (plan →
 * ink-soft, agent → accent, review → ink-dim). Token-only styling (ADR-0005).
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
      className={`flex w-full max-w-2xl flex-col gap-5 text-left${
        className ? ` ${className}` : ""
      }`}
    >
      {rows.map((row) => (
        <div
          key={row.label}
          className="grid grid-cols-[1fr_auto] items-end gap-4 font-mono text-xs"
        >
          {/* The label rides above its own bar at the same offset, so cascading
              phases stay attached to their segment instead of stranding the
              label in a far-left column. */}
          <div className="relative pt-5">
            <span
              className="absolute top-0 text-ink-soft"
              style={{ left: row.offset ?? "0%" }}
            >
              {row.label}
            </span>
            <span className="relative block h-5 overflow-hidden rounded-sm bg-bg-card">
              <span
                className={`absolute inset-y-0 rounded-sm ${fillClass[row.variant ?? "plan"]}`}
                style={{ left: row.offset ?? "0%", width: row.width ?? "100%" }}
              />
            </span>
          </div>
          <span className="text-right text-ink-dim">{row.time}</span>
        </div>
      ))}
    </div>
  );
}
