/**
 * Stat — the deck's `.stat` figure (index.html ~737): a serif, light-weight,
 * tabular-nums accent number above a mono uppercase dim label. Token-only
 * styling (ADR-0005).
 */
type StatProps = { value: string; label: string; className?: string };

export function Stat({ value, label, className }: StatProps) {
  return (
    <div className={`text-center${className ? ` ${className}` : ""}`}>
      <div className="font-serif text-5xl font-light leading-none tabular-nums text-accent sm:text-6xl">
        {value}
      </div>
      <div className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
        {label}
      </div>
    </div>
  );
}
