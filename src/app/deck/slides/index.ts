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
import { InstructionCeiling } from "./InstructionCeiling";
import { SmartDumbZone } from "./SmartDumbZone";
import { AllocationProblem } from "./AllocationProblem";
import { ContextRot } from "./ContextRot";
import { GoodContext } from "./GoodContext";
import { ContextTransition } from "./ContextTransition";
import { HarnessWrapsTheirs } from "./HarnessWrapsTheirs";
import { LayerYouOwn } from "./LayerYouOwn";
import { TheSetup } from "./TheSetup";
import { ClaudeMd } from "./ClaudeMd";
import { AgentDocs } from "./AgentDocs";
import { CustomSkills } from "./CustomSkills";
import { IssueTracker } from "./IssueTracker";
import { RalphLoop } from "./RalphLoop";
import { ThePlanGantt } from "./ThePlanGantt";
import { TwoWaysToPlan } from "./TwoWaysToPlan";
import { GrillBeforePlan } from "./GrillBeforePlan";
import { TheSpec } from "./TheSpec";
import { Decompose } from "./Decompose";
import { TheRun } from "./TheRun";
import { Review } from "./Review";

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
  // §2 — context (the shift): instruction ceiling, the zones, the antipatterns
  { id: "s-2-0a", section: 2, maxState: 1, Component: InstructionCeiling },
  { id: "s-2-0b", section: 2, maxState: 1, Component: SmartDumbZone },
  { id: "s-2-1", section: 2, maxState: 4, Component: AllocationProblem },
  { id: "s-2-2", section: 2, maxState: 5, Component: ContextRot },
  { id: "s-2-3", section: 2, maxState: 1, Component: GoodContext },
  { id: "s-2-8", section: 2, maxState: 1, Component: ContextTransition },
  // §3 — the harness: the layered build + the pieces you own
  { id: "s-3-0", section: 3, maxState: 4, Component: HarnessWrapsTheirs },
  { id: "s-3-1", section: 3, maxState: 1, Component: LayerYouOwn },
  { id: "s-3-2", section: 3, maxState: 1, Component: TheSetup },
  { id: "s-3-3", section: 3, maxState: 1, Component: ClaudeMd },
  { id: "s-3-4", section: 3, maxState: 1, Component: AgentDocs },
  { id: "s-3-5", section: 3, maxState: 1, Component: CustomSkills },
  { id: "s-3-6", section: 3, maxState: 1, Component: IssueTracker },
  { id: "s-3-7", section: 3, maxState: 1, Component: RalphLoop },
  // §4 — the plan: where the hours go, then grill → spec → decompose
  { id: "s-4-1", section: 4, maxState: 1, Component: ThePlanGantt },
  { id: "s-4-6", section: 4, maxState: 1, Component: TwoWaysToPlan },
  { id: "s-4-5", section: 4, maxState: 1, Component: GrillBeforePlan },
  { id: "s-4-7", section: 4, maxState: 1, Component: TheSpec },
  { id: "s-4-11", section: 4, maxState: 1, Component: Decompose },
  // §5 — the run: ralph runs and watches, then review
  { id: "s-5-2", section: 5, maxState: 1, Component: TheRun },
  { id: "s-5-9", section: 5, maxState: 1, Component: Review },
];
