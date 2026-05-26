import type { Metadata } from "next";
import { DeckPreview } from "./DeckPreview";

export const metadata: Metadata = {
  title: "The Deck · BeyondTheLoop",
  description:
    "From inference loops to long-running agents — the interactive deck.",
};

/**
 * /deck — the slide-player route, statically generated (SSG). This is a
 * build-safe preview while the slide port is in progress (epic-2 ships §0–1):
 * it renders the ordered registry through `SlidePlayer` in a full-viewport
 * frame. Epic-6 wires the complete assembly here (every section + the
 * end-of-deck soft email capture + CTAs + OG image) and deletes index.html.
 */
export default function DeckPage() {
  return (
    <main className="h-[100svh] w-screen overflow-hidden bg-bg">
      <DeckPreview />
    </main>
  );
}
