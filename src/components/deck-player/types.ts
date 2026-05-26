import type { ComponentType } from "react";

/**
 * Engine contract types for the deck slide-player. The concrete data lives in
 * `src/content/deck/sections.ts` (sections) and `src/app/deck/slides/index.ts`
 * (the ordered slide registry) — built in later epics — but the *types* are
 * owned here because they are the player's prop contract.
 */

/** One of the deck's 8 sections — drives the jump menu + section counter. */
export type DeckSection = {
  /** Stable slug, e.g. "the-problem". */
  id: string;
  /** 0..7 — the section's order. */
  index: number;
  /** Human-readable title shown in the jump menu. */
  title: string;
  /** Index (0-based) of this section's first slide in the ordered registry. */
  firstSlide: number;
};

/** One entry in the ordered slide registry consumed by `SlidePlayer`. */
export type SlideEntry = {
  /** Stable slug, e.g. "s-1-2". */
  id: string;
  /** Owning section, 0..7. */
  section: number;
  /**
   * Number of progressive-reveal states (the `data-states` port). `1` means a
   * single static state and no stepper; `N` means states `0..N-1`.
   */
  maxState: number;
  /** The server-rendered slide content. */
  Component: ComponentType;
};

/**
 * How a `Reveal` child fades in (the port of index.html's `.frame-progressive`
 * vs `.label-progressive`): both preserve layout (opacity-only), `"label"` is
 * for labels/strips, `"frame"` for layered frame/diagram chrome.
 */
export type RevealMode = "frame" | "label";
