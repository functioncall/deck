import { Fragment, type ReactNode } from "react";
import Image, { type StaticImageData } from "next/image";
import { Heading } from "@/components/atoms";

/**
 * The §4–5 "the plan / the run" shared chrome (index.html slides 4.5–5.9). These
 * sections share a fixed workflow rail (`Pipeline`), a tall centred slide heading
 * with an optional `/skill` suffix (`StageHeading`), and the good/bad context
 * chips (`CtxLabel`). Shared chrome — not registry slides. Token-only (ADR-0005).
 */

/** The five workflow stages, in order (index.html `.stepper .step` rail). */
const STAGES = ["grill", "spec", "decompose", "run", "review"] as const;
export type Stage = (typeof STAGES)[number];

/**
 * Pipeline — the static workflow rail pinned top-centre of the §4–5 stepper
 * slides (the deck's `.stepper` with a `║` divider before `run`). Unlike the
 * reveal `Stepper`, the active stage is fixed per slide (these slides are
 * single-state), so it is slide content, not a `SlidePlayer` control.
 */
export function Pipeline({ active }: { active: Stage }) {
  return (
    <nav
      aria-label="Workflow stage"
      className="absolute left-1/2 top-[5vh] z-10 flex -translate-x-1/2 items-center gap-5 whitespace-nowrap font-mono text-xs uppercase tracking-widest"
    >
      {STAGES.map((stage) => (
        <Fragment key={stage}>
          {stage === "run" ? (
            <span aria-hidden="true" className="text-ink-dim opacity-40">
              ║
            </span>
          ) : null}
          <span
            className={
              stage === active
                ? "border-b border-accent pb-1 text-accent"
                : "border-b border-transparent pb-1 text-ink-dim"
            }
          >
            {stage}
          </span>
        </Fragment>
      ))}
    </nav>
  );
}

/**
 * StageHeading — the §4–5 slide title in a fixed-height row (the deck's
 * `min-height:4.5rem` heading band so titles share a baseline across the set),
 * with an optional accent `/skill` suffix (`· /grill-me`). Skill slides align to
 * the baseline; the plain titles anchor to the top of the band.
 */
export function StageHeading({
  children,
  skill,
}: {
  children: ReactNode;
  skill?: string;
}) {
  return (
    <div
      className={`mb-2 flex min-h-18 justify-center gap-3 ${
        skill ? "items-baseline" : "items-start"
      }`}
    >
      <Heading as="h2" size="display-sm" className="font-light leading-none">
        {children}
      </Heading>
      {skill ? (
        <>
          <span aria-hidden="true" className="font-mono text-2xl leading-none text-ink-dim">
            ·
          </span>
          <span className="font-mono text-2xl leading-none text-accent">
            {skill}
          </span>
        </>
      ) : null}
    </div>
  );
}

/**
 * CtxLabel — the deck's `.ctx-label` good/bad chip (a mono uppercase pill on a
 * translucent good/bad tint). The 0.12-alpha tints map to the `good`/`bad` tokens
 * at /10 opacity (no raw rgba — ADR-0005).
 */
export function CtxLabel({
  tone,
  children,
}: {
  tone: "good" | "bad";
  children: ReactNode;
}) {
  return (
    <span
      className={`inline-block rounded-sm px-3 py-1 font-mono text-xs uppercase tracking-widest ${
        tone === "good" ? "bg-good/10 text-good" : "bg-bad/10 text-bad"
      }`}
    >
      {children}
    </span>
  );
}

/**
 * PhoneSplit — the §5 "the run / review" two-column layout (index.html slides
 * 5.2 / 5.9): a phone screenshot beside its three bullets. The screenshots are the
 * deck's embedded JPEGs, extracted to files and rendered via `next/image` (the
 * same precedent as the §2 instruction-ceiling chart). `children` is the bullets.
 */
export function PhoneSplit({
  src,
  alt,
  children,
}: {
  src: StaticImageData;
  alt: string;
  children: ReactNode;
}) {
  return (
    <div className="grid w-full max-w-7xl grid-cols-1 items-center gap-10 text-left md:grid-cols-2 md:gap-16">
      <div className="flex justify-center">
        <Image
          src={src}
          alt={alt}
          className="h-auto max-h-[55vh] w-auto max-w-full rounded-lg"
        />
      </div>
      <div className="max-w-lg">{children}</div>
    </div>
  );
}
