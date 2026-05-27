"use client";

import type { SlideEntry } from "@/components/deck-player";
import { SlidePlayer } from "@/components/deck-player";
import { deckSections } from "@/content/deck";
import { slides } from "./slides";
import { EndCard } from "./EndCard";
import { StickyCaptureBar } from "./StickyCaptureBar";

/**
 * DeckExperience — the full `/deck` assembly (epic-6). The single client
 * boundary that feeds the complete ordered slide registry into `SlidePlayer`,
 * appends the end-of-deck conversion card (`EndCard`) as the final slide, and
 * overlays the persistent `StickyCaptureBar`. The slide components themselves
 * stay directive-free, so all slide content is server-rendered into the SSG
 * HTML (crawlable); only this shell + the player + `Reveal` are client.
 */
const deckSlides: SlideEntry[] = [
  ...slides,
  // The conversion card is an assembly-layer addition (not an index.html port),
  // so it is appended here rather than registered in slides/index.ts.
  { id: "s-end", section: 7, maxState: 1, Component: EndCard },
];

export function DeckExperience() {
  return (
    <>
      <SlidePlayer slides={deckSlides} sections={deckSections} />
      <StickyCaptureBar />
    </>
  );
}
