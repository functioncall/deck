// Barrel: the deck slide-player engine (L2 epic-0). The React port of
// index.html's slide nav + progressive-reveal mechanic, composing L1 atoms +
// organisms and the deck tokens. Slides and `/deck` import from here.
export { SlidePlayer } from "./SlidePlayer";
export { Slide } from "./Slide";
export { Stepper } from "./Stepper";
export { ProgressBar } from "./ProgressBar";
export { JumpMenu } from "./JumpMenu";
export { Reveal, SlideStateProvider, useSlideState } from "./Reveal";
export type { SlideEntry, DeckSection, RevealMode } from "./types";
