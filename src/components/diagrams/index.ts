// Barrel: the deck's reusable diagram visuals (L2 epic-1), extracted from
// index.html as token-only React components reusing the L1 atoms + the
// `--color-layer-agent` / `--color-layer-harness` tokens. Shared by `/deck`
// (the slide port) and, later, the landing page (L3) — they are the deck's
// marketing visuals, so they are components, not slide-local markup (ADR-0001).
export { LLMDiagram } from "./LLMDiagram";
export { AgentFlow } from "./AgentFlow";
export { ContextWindow } from "./ContextWindow";
export { HarnessFrame } from "./HarnessFrame";
export { Gantt } from "./Gantt";
