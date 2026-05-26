import type { ReactNode } from "react";

/**
 * CTAButtonGroup — lays out a primary call-to-action with an optional secondary
 * one (each a Button/Link passed as a slot). Stacks on small screens, sits in a
 * row from `sm` up. Layout only — the buttons keep their own atom styling
 * (ADR-0005); no raw values.
 */
type CTAButtonGroupProps = {
  primary: ReactNode;
  secondary?: ReactNode;
  className?: string;
};

export function CTAButtonGroup({
  primary,
  secondary,
  className,
}: CTAButtonGroupProps) {
  return (
    <div
      className={`flex flex-col gap-3 sm:flex-row sm:items-center${
        className ? ` ${className}` : ""
      }`}
    >
      {primary}
      {secondary}
    </div>
  );
}
