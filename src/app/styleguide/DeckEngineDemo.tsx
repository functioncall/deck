"use client";

import { Heading, Label, Text } from "@/components/atoms";
import {
  Reveal,
  Slide,
  SlidePlayer,
  type DeckSection,
  type SlideEntry,
} from "@/components/deck-player";

/**
 * DeckEngineDemo — a THROWAWAY harness for the L2 epic-0 slide-player. It feeds
 * three placeholder slides into `SlidePlayer` so `/styleguide` exercises the
 * engine (keyboard / click / swipe nav, progress + counter, jump menu, and the
 * stepper + `Reveal` mechanic). The real 88 slides land in epics 2-5 and `/deck`
 * is wired in epic-6; this demo can be removed then. Lives in the route (not the
 * component barrel) so the production engine surface stays clean.
 */

function DemoTitle() {
  return (
    <Slide anchor="center">
      <Label accent>Deck engine · demo</Label>
      <Heading as="h1" size="display">
        The slide-player <em>works</em>
      </Heading>
      <Text variant="lead">
        Arrow keys, space, PageUp/PageDown, Home/End, click, and touch-swipe all
        navigate. The progress bar and counter track position.
      </Text>
    </Slide>
  );
}

function DemoReveal() {
  return (
    <Slide anchor="top" hasStepper>
      <Label accent>Progressive reveal</Label>
      <Heading size="display-sm">Three states, revealed in turn</Heading>
      <div className="flex flex-col gap-4">
        <Reveal frameMin={0}>
          <Text>State 0 — visible immediately.</Text>
        </Reveal>
        <Reveal frameMin={1} mode="label">
          <Text>State 1 — revealed on the next step.</Text>
        </Reveal>
        <Reveal frameMin={2}>
          <Text>State 2 — revealed last, then the deck advances.</Text>
        </Reveal>
      </div>
    </Slide>
  );
}

function DemoClose() {
  return (
    <Slide anchor="center">
      <Label>End of demo</Label>
      <Heading size="display-sm">Press Home to restart</Heading>
      <Text variant="soft">Use the Sections menu (top-left) to jump.</Text>
    </Slide>
  );
}

const demoSlides: SlideEntry[] = [
  { id: "demo-title", section: 0, maxState: 1, Component: DemoTitle },
  { id: "demo-reveal", section: 1, maxState: 3, Component: DemoReveal },
  { id: "demo-close", section: 1, maxState: 1, Component: DemoClose },
];

const demoSections: DeckSection[] = [
  { id: "intro", index: 0, title: "Intro", firstSlide: 0 },
  { id: "reveal", index: 1, title: "The reveal mechanic", firstSlide: 1 },
];

export function DeckEngineDemo() {
  return (
    <div className="relative h-[70vh] overflow-hidden rounded border border-rule">
      <SlidePlayer slides={demoSlides} sections={demoSections} />
    </div>
  );
}
