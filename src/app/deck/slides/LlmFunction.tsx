import { Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { LLMDiagram } from "@/components/diagrams";

/**
 * s-1-1 — "the model" (index.html data-num 1.1): the LLM inference-loop diagram
 * over the framing line — an LLM is a stateless function, text in / text out.
 */
export function LlmFunction() {
  return (
    <Slide anchor="center">
      <LLMDiagram />
      <Text variant="lead" className="mt-6">
        An LLM is a function. Text in, text out.{" "}
        <em className="text-accent">Stateless.</em> No memory between calls.
      </Text>
    </Slide>
  );
}
