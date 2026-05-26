import type { ReactNode } from "react";

/**
 * Slide — one slide's content frame (the port of `.slide` + `.slide-inner`).
 * Slide *components* (built in later epics) use this as their root; the absolute
 * layering + active/opacity toggling is `SlidePlayer`'s job. Anchoring mirrors
 * `.slide.anchor-top` / `.slide.has-stepper` (top-anchored so titles don't jump
 * between slides of varying height, and stepper slides clear the stepper rail).
 * Padding reuses the deck's 8vh/10vw frame (6vh/6vw under the 768px breakpoint).
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
      className={`flex h-full w-full justify-center overflow-hidden px-[10vw] py-[8vh] max-md:px-[6vw] max-md:py-[6vh] ${
        top ? "items-start" : "items-center"
      }`}
    >
      <div
        className={`flex w-full max-w-6xl flex-col items-center gap-6 text-center ${
          top ? "justify-start" : "justify-center"
        }${hasStepper ? " pt-16" : ""}`}
      >
        {children}
      </div>
    </div>
  );
}
