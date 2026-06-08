import type { DeckSection } from "@/components/deck-player";

/**
 * The deck's 8 sections — the `data-section` openers in index.html (read-only
 * source of truth). They drive the `JumpMenu` and the section counter.
 *
 * `title` is the index.html section-label text (`<span class="num">§ 0N</span>
 * Title`); §0 has no label — it is the cold-open title (anonymous, no bio).
 * `firstSlide` is the 0-based index of the section's first slide in the ordered
 * registry (`src/app/deck/slides/index.ts`). Slide counts per section:
 * §0:2 §1:7 §2:6 §3:8 §4:5 §5:2 §6:3 §7:2 (35 total — §0 adds the cold-open
 * attribution note, so every section after the cold open shifts down by one).
 */
export const deckSections: DeckSection[] = [
  { id: "cold-open", index: 0, title: "Cold open", firstSlide: 0 },
  { id: "the-model", index: 1, title: "The model", firstSlide: 2 },
  { id: "context", index: 2, title: "Context", firstSlide: 9 },
  { id: "the-harness", index: 3, title: "The harness", firstSlide: 15 },
  { id: "the-plan", index: 4, title: "The plan", firstSlide: 23 },
  { id: "the-run", index: 5, title: "The run", firstSlide: 28 },
  { id: "task-selection", index: 6, title: "Task selection", firstSlide: 30 },
  { id: "the-shift", index: 7, title: "The shift", firstSlide: 33 },
];
