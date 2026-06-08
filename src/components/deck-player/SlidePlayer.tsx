"use client";

import NextLink from "next/link";
import { useEffect, useMemo, useReducer, useRef } from "react";
import { trackClient } from "@/lib/analytics/client";
import { JumpMenu } from "./JumpMenu";
import { ProgressBar } from "./ProgressBar";
import { SlideStateProvider } from "./Reveal";
import { Stepper } from "./Stepper";
import type { DeckSection, SlideEntry } from "./types";

/**
 * SlidePlayer — the client shell that drives the deck. It owns the
 * `{ index, state }` machine (the direct port of index.html's `cur` +
 * `setSlideState`/`data-states`), wires keyboard / click / touch-swipe nav, and
 * overlays the chrome (stepper, progress + counter, jump menu). All slides are
 * rendered into the DOM and toggled by opacity (matching index.html, and so the
 * full deck text stays in the SSG HTML / crawlable). Only this shell + `Reveal`
 * are client; slide content stays server-rendered. Token-only (ADR-0005).
 */
type SlidePlayerProps = {
  /** Ordered slide registry — server-rendered content + reveal metadata. */
  slides: SlideEntry[];
  /** The 8 deck sections, for the jump menu + section counter. */
  sections: DeckSection[];
  /** Notified whenever the active slide index changes — drives chrome rendered
   *  outside the player (e.g. hiding the sticky capture bar on the last slide). */
  onActiveSlideChange?: (index: number) => void;
};

type MachineState = { index: number; state: number };
type MachineAction =
  | { type: "next" }
  | { type: "prev" }
  | { type: "home" }
  | { type: "end" }
  | { type: "jump"; index: number };

/** Minimum horizontal travel (CSS px) for a touch drag to count as a swipe. */
const SWIPE_THRESHOLD = 48;

/**
 * Builds the reveal/nav reducer. `next`/`prev` advance the reveal state within a
 * slide before moving slides (porting `setSlideState` then `cur++`); entering a
 * slide backwards lands on its last state, exactly as index.html does.
 */
function makeReducer(slides: SlideEntry[]) {
  const total = slides.length;
  const maxStateOf = (i: number) => slides[i]?.maxState ?? 1;
  return (current: MachineState, action: MachineAction): MachineState => {
    switch (action.type) {
      case "next":
        if (current.state < maxStateOf(current.index) - 1) {
          return { index: current.index, state: current.state + 1 };
        }
        if (current.index < total - 1) {
          return { index: current.index + 1, state: 0 };
        }
        return current;
      case "prev":
        if (current.state > 0) {
          return { index: current.index, state: current.state - 1 };
        }
        if (current.index > 0) {
          const prevIndex = current.index - 1;
          return { index: prevIndex, state: maxStateOf(prevIndex) - 1 };
        }
        return current;
      case "home":
        return { index: 0, state: 0 };
      case "end":
        return { index: Math.max(total - 1, 0), state: 0 };
      case "jump":
        return { index: action.index, state: 0 };
    }
  };
}

export function SlidePlayer({
  slides,
  sections,
  onActiveSlideChange,
}: SlidePlayerProps) {
  const reducer = useMemo(() => makeReducer(slides), [slides]);
  const [{ index, state }, dispatch] = useReducer(reducer, { index: 0, state: 0 });

  const rootRef = useRef<HTMLDivElement>(null);
  const swipeStartX = useRef<number | null>(null);
  const swiped = useRef(false);

  // Focus the player on mount so keyboard nav works immediately on /deck;
  // preventScroll keeps it from yanking the page when embedded (e.g. styleguide).
  useEffect(() => {
    rootRef.current?.focus({ preventScroll: true });
  }, []);

  const total = slides.length;
  const activeMaxState = slides[index]?.maxState ?? 1;
  // The active slide's section — drives the top-left section label (the cold
  // open, index 0, shows none). Replaces the per-slide `SectionLabel`.
  const activeSection = sections.find((s) => s.index === slides[index]?.section);

  // Funnel: report deck progress through the AnalyticsClient port (via /api/track
  // — see src/lib/analytics/client.ts). `deck_slide_viewed` fires on every slide
  // change (including the initial slide 0 on mount).
  useEffect(() => {
    trackClient("deck_slide_viewed", {
      slideIndex: index,
      slideId: slides[index]?.id,
    });
  }, [index, slides]);

  // Surface the active slide index to the assembly layer (e.g. to hide the
  // sticky capture bar on the final slide). An effect keeps render pure.
  useEffect(() => {
    onActiveSlideChange?.(index);
  }, [index, onActiveSlideChange]);

  // `deck_completed` fires once, the first time the last slide is reached this
  // session (revisiting the end after navigating away must not re-fire it).
  const completedRef = useRef(false);
  useEffect(() => {
    if (!completedRef.current && total > 0 && index === total - 1) {
      completedRef.current = true;
      trackClient("deck_completed", { slides: total });
    }
  }, [index, total]);

  function handleKeyDown(e: React.KeyboardEvent<HTMLDivElement>) {
    switch (e.key) {
      case "ArrowRight":
      case " ":
      case "PageDown":
        e.preventDefault();
        dispatch({ type: "next" });
        break;
      case "ArrowLeft":
      case "PageUp":
        e.preventDefault();
        dispatch({ type: "prev" });
        break;
      case "Home":
        e.preventDefault();
        dispatch({ type: "home" });
        break;
      case "End":
        e.preventDefault();
        dispatch({ type: "end" });
        break;
    }
  }

  function handleClick(e: React.MouseEvent<HTMLDivElement>) {
    // A swipe already navigated; swallow the synthetic click that follows.
    if (swiped.current) {
      swiped.current = false;
      return;
    }
    // Don't advance when the click lands on interactive chrome (links, the jump
    // menu, form fields) — only on the slide canvas itself.
    if (
      (e.target as HTMLElement).closest(
        "a, button, input, textarea, select, label, [data-deck-control]",
      )
    ) {
      return;
    }
    rootRef.current?.focus({ preventScroll: true });
    dispatch({ type: "next" });
  }

  function handlePointerDown(e: React.PointerEvent<HTMLDivElement>) {
    // Mouse uses click-to-advance; reserve swipe for touch/pen.
    if (e.pointerType === "mouse") {
      swipeStartX.current = null;
      return;
    }
    swipeStartX.current = e.clientX;
    swiped.current = false;
  }

  function handlePointerUp(e: React.PointerEvent<HTMLDivElement>) {
    if (swipeStartX.current === null) return;
    const dx = e.clientX - swipeStartX.current;
    swipeStartX.current = null;
    if (Math.abs(dx) > SWIPE_THRESHOLD) {
      swiped.current = true;
      dispatch({ type: dx < 0 ? "next" : "prev" });
    }
  }

  return (
    <div
      ref={rootRef}
      tabIndex={0}
      role="application"
      aria-roledescription="slide deck"
      aria-label="Beontheloop deck"
      onKeyDown={handleKeyDown}
      onClick={handleClick}
      onPointerDown={handlePointerDown}
      onPointerUp={handlePointerUp}
      className="relative h-full w-full overflow-hidden bg-bg outline-none"
    >
      {slides.map((entry, i) => {
        const isActive = i === index;
        return (
          <div
            key={entry.id}
            aria-hidden={!isActive}
            className={`absolute inset-0 transition-opacity duration-500 ease-out ${
              isActive
                ? "pointer-events-auto opacity-100"
                : "pointer-events-none opacity-0"
            }`}
          >
            <SlideStateProvider state={isActive ? state : 0}>
              <entry.Component />
            </SlideStateProvider>
          </div>
        );
      })}

      {/* Top scrim — the header chrome is transparent floating text, so on a
          tall slide that scrolls the content would slide up behind it. This
          fades the content into the background just under the header (the bottom
          CTA bar's opaque/blurred background masks the other end). */}
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-x-0 top-0 z-40 h-24 bg-gradient-to-b from-bg from-40% to-transparent"
      />

      {activeMaxState > 1 ? (
        <div className="pointer-events-none absolute left-1/2 top-[5vh] z-50 -translate-x-1/2">
          <Stepper count={activeMaxState} active={state} />
        </div>
      ) : null}

      <div className="absolute left-7 top-6 z-50 flex flex-col gap-2">
        <NextLink
          href="/"
          data-deck-control
          aria-label="Beontheloop — back to home"
          className="font-serif text-base font-normal text-ink transition-colors hover:text-accent"
        >
          Beontheloop
        </NextLink>
        {sections.length > 0 ? (
          <div className="flex items-center gap-3 font-mono text-xs uppercase tracking-widest">
            <JumpMenu
              sections={sections}
              onJump={(slideIndex) =>
                dispatch({ type: "jump", index: slideIndex })
              }
            />
            {activeSection && activeSection.index > 0 ? (
              <span className="pointer-events-none font-medium text-ink-dim">
                <span className="mr-2 text-accent">
                  § {String(activeSection.index).padStart(2, "0")}
                </span>
                {activeSection.title}
              </span>
            ) : null}
          </div>
        ) : null}
      </div>

      <ProgressBar current={index + 1} total={total} />

      {index === 0 && state === 0 ? (
        <div className="pointer-events-none absolute right-7 bottom-6 z-50 font-mono text-xs tracking-widest text-ink-dim max-md:hidden">
          next →
        </div>
      ) : null}
    </div>
  );
}
