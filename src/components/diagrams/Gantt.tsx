/**
 * Gantt — the deck's `.gantt` timeline visual (index.html ~507): one row per
 * phase (a mono label, a proportional bar, a mono duration), used for the
 * plan → execute → review breakdown. Bar `width`/`offset` are data-driven CSS
 * lengths (percentages) supplied per row, so the same component renders any
 * cascade; `variant` selects the fill token (plan → ink-soft, agent → accent,
 * review → ink-dim). Token-only styling (ADR-0005).
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
              className={`block h-full rounded-sm ${fillClass[row.variant ?? "plan"]}`}
              style={{ width: row.width ?? "100%", marginLeft: row.offset }}
            />
          </span>
          <span className="text-right text-ink-dim">{row.time}</span>
        </div>
      ))}
    </div>
  );
}
