"use client";

import { SlidePlayer } from "@/components/deck-player";
import { deckSections } from "@/content/deck";
import { slides } from "./slides";

/**
 * DeckPreview — the build-safe wiring for the slide port. It is the single
 * client boundary (the slide components stay directive-free) that feeds the
 * ordered registry into `SlidePlayer`. Epic-2 ships the §0–1 slides; epic-6
 * replaces this preview with the full `/deck` assembly (all sections + the
 * end-of-deck capture + CTAs). Only the sections whose slides already exist are
 * exposed to the jump menu so it stays in-bounds while the port is in progress.
 */
export function DeckPreview() {
  const coveredSections = deckSections.filter(
    (section) => section.firstSlide < slides.length,
  );
  return <SlidePlayer slides={slides} sections={coveredSections} />;
}
