import type { ReactNode } from "react";

/**
 * Slide — one slide's content frame (the port of `.slide` + `.slide-inner`).
 * Slide *components* use this as their root; the absolute layering +
 * active/opacity toggling is `SlidePlayer`'s job. Anchoring mirrors
 * `.slide.anchor-top` / `.slide.has-stepper` (top-anchored so titles don't jump
 * between slides of varying height, and stepper slides clear the stepper rail).
 *
 * The frame scrolls when content exceeds it (`overflow-y-auto`), so nothing is
 * ever clipped on a short/narrow viewport — short slides still center (`m-auto`
 * collapses to 0 when content overflows and pins it to the top, scrollable).
 * Top/bottom padding reserves the deck chrome (header + fixed CTA bar + the
 * phone's safe area) via the `--deck-chrome-*` tokens, so titles never collide
 * with the header and content never hides behind the bar. `touch-action: pan-y`
 * + `overscroll-contain` keep vertical scroll from triggering the player's
 * horizontal swipe-nav. Horizontal frame stays the deck's 10vw/6vw.
 */
type SlideProps = {
  anchor?: "top" | "center";
  hasStepper?: boolean;
  children: ReactNode;
};

export function Slide({
  anchor = "center",
  hasStepper = false,
  children,
}: SlideProps) {
  const top = anchor === "top" || hasStepper;
  return (
    <div
      className="flex h-full w-full flex-col overflow-y-auto overscroll-contain px-[10vw] pb-[var(--deck-chrome-bottom)] pt-[var(--deck-chrome-top)] [touch-action:pan-y] max-md:px-[6vw]"
    >
      <div
        className={`flex w-full max-w-6xl flex-col items-center gap-6 text-center ${
          top ? "mx-auto" : "m-auto"
        }${hasStepper ? " pt-8" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
