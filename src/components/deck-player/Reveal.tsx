"use client";

import { createContext, useContext } from "react";
import type { ReactNode } from "react";
import type { RevealMode } from "./types";

/**
 * Reveal — the React port of index.html's `data-frame-min` progressive reveal.
 * `SlidePlayer` publishes the active slide's reveal state through context; a
 * `Reveal` shows its child once that state reaches `frameMin` (the direct port
 * of `setSlideState`: `state >= data-frame-min` toggles `.frame-revealed`).
 *
 * Both modes preserve layout (opacity-only, mirroring `.frame-progressive` and
 * `.label-progressive` which never reflow the slide). Token-only (ADR-0005).
 */

/** Active slide's reveal state, provided by `SlidePlayer`; defaults to 0. */
const SlideStateContext = createContext(0);

/** Wraps a slide's content so its `Reveal` children see the current state. */
export function SlideStateProvider({
  state,
  children,
}: {
  state: number;
  children: ReactNode;
}) {
  return (
    <SlideStateContext.Provider value={state}>
      {children}
    </SlideStateContext.Provider>
  );
}

/** Read the active slide's reveal state (for bespoke diagram reveal logic). */
export function useSlideState(): number {
  return useContext(SlideStateContext);
}

type RevealProps = {
  /** Lowest slide state at which this child is revealed (port of data-frame-min). */
  frameMin: number;
  /** `"frame"` (default) for frame/diagram chrome, `"label"` for labels/strips. */
  mode?: RevealMode;
  className?: string;
  children: ReactNode;
};

export function Reveal({
  frameMin,
  mode = "frame",
  className,
  children,
}: RevealProps) {
  const state = useSlideState();
  const revealed = state >= frameMin;
  return (
    <div
      data-revealed={revealed}
      data-reveal-mode={mode}
      className={`transition-opacity duration-500 ease-out ${
        revealed ? "opacity-100" : "opacity-0 pointer-events-none"
      }${className ? ` ${className}` : ""}`}
    >
      {children}
    </div>
  );
}
