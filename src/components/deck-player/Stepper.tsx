/**
 * Stepper — the per-slide reveal-state dots (the port of `.stepper .step`).
 * Renders `count` dots with the `active` one in the gold accent, mirroring
 * `.stepper .step.active`. Purely presentational; `SlidePlayer` positions it on
 * the stepper rail and feeds `{ count, active }` from the active slide's state.
 * Token-only (ADR-0005).
 */
type StepperProps = {
  /** Number of reveal states for the active slide (its `maxState`). */
  count: number;
  /** The current reveal state, 0-based. */
  active: number;
};

export function Stepper({ count, active }: StepperProps) {
  return (
    <nav
      aria-label="Slide reveal progress"
      className="flex items-center justify-center gap-3"
    >
      {Array.from({ length: count }, (_, i) => (
        <span
          key={i}
          aria-current={i === active ? "step" : undefined}
          className={`inline-block h-1.5 w-1.5 rounded-full transition-colors duration-300 ease-out ${
            i === active ? "bg-accent" : "bg-ink-dim/50"
          }`}
        />
      ))}
    </nav>
  );
}
