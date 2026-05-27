import type { Metadata } from "next";
import { DeckExperience } from "./DeckExperience";

export const metadata: Metadata = {
  title: "The Deck · Beontheloop",
  description:
    "From inference loops to long-running agents — the interactive deck.",
};

/**
 * /deck — the slide-player route, statically generated (SSG). It assembles the
 * complete ordered slide registry (the React port of index.html, §0–7) plus the
 * end-of-deck conversion card into `SlidePlayer`, and overlays the persistent
 * email/CTA capture bar. All slide content is server-rendered into the static
 * HTML for crawlability; only the player shell is client. The colocated
 * `opengraph-image.tsx` supplies the share image.
 */
export default function DeckPage() {
  return (
    <main className="h-[100svh] w-screen overflow-hidden bg-bg">
      <DeckExperience />
    </main>
  );
}
