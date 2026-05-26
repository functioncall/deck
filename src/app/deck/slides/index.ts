import type { SlideEntry } from "@/components/deck-player";
import { Title } from "./Title";
import { Bio } from "./Bio";
import { LlmFunction } from "./LlmFunction";
import { AgentLoop } from "./AgentLoop";
import { ContextArray } from "./ContextArray";
import { LoopInAction } from "./LoopInAction";
import { AgentHarness } from "./AgentHarness";
import { Takeaway } from "./Takeaway";
import { ArrayIsEverything } from "./ArrayIsEverything";

/**
 * The ordered deck slide registry — the React port of index.html's `.slide`
 * sequence, fed to `SlidePlayer`. `id` is the deck's `data-num` slug; `maxState`
 * is the slide's `data-states` (1 = no stepper). The later port epics append
 * §2–7 in order; the §0–1 entries (epic-2) start it.
 */
export const slides: SlideEntry[] = [
  // §0 — cold open
  { id: "s-0-1", section: 0, maxState: 1, Component: Title },
  { id: "s-0-2", section: 0, maxState: 1, Component: Bio },
  // §1 — the model
  { id: "s-1-1", section: 1, maxState: 1, Component: LlmFunction },
  { id: "s-1-2", section: 1, maxState: 1, Component: AgentLoop },
  { id: "s-1-3", section: 1, maxState: 1, Component: ContextArray },
  { id: "s-1-4", section: 1, maxState: 6, Component: LoopInAction },
  { id: "s-1-5", section: 1, maxState: 3, Component: AgentHarness },
  { id: "s-1-6", section: 1, maxState: 1, Component: Takeaway },
  { id: "s-1-7", section: 1, maxState: 1, Component: ArrayIsEverything },
];
