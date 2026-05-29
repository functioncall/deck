import { Slide } from "@/components/deck-player";
import { FitList } from "./FitList";

/** The work that fits the loop (index.html 6.2 `.fit-list`). */
const FITS = [
  {
    heading: "Large refactors",
    why: "Class components to hooks. Old testing library to new one. Web app to mobile.",
  },
  {
    heading: "Migrations",
    why: "Database changes, API upgrades, repo-wide pattern swaps.",
  },
  {
    heading: "Repetitive product work",
    why: "Forms, tables, admin pages, login flows. Anything where the requirements are clear.",
  },
  {
    heading: "Mechanical cleanup",
    why: "Dead code, dependency upgrades, documentation, test coverage.",
  },
];

/**
 * s-6-2 — "what fits" (index.html data-num 6.2): the four task shapes the loop
 * handles well, as a numbered fit-list under a good-tone label. Single state.
 */
export function WhatFits() {
  return (
    <Slide anchor="center">
      <FitList label="What fits" tone="good" items={FITS} />
    </Slide>
  );
}
