import { Callout, Heading, Label, Text } from "@/components/atoms";
import { HarnessFrame, LLMDiagram } from "@/components/diagrams";

/**
 * TheShift — the deck thesis (SPEC §3): an agent is not a smarter model, it is a
 * harness around one. It reuses the L2 deck diagrams as marketing visuals — the
 * `LLMDiagram` (the model as a stateless function) and the `HarnessFrame` (the
 * loop + context + tools wrapped around it). Static (non-progressive) renders.
 * Token-only styling (ADR-0005).
 */
type SectionProps = { className?: string };

export function TheShift({ className }: SectionProps) {
  return (
    <section
      className={`mx-auto max-w-4xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>The shift</Label>
      <Heading as="h2" size="display-sm" className="mt-4">
        An agent isn&rsquo;t a smarter model. It&rsquo;s a{" "}
        <em className="text-accent">harness</em> around one.
      </Heading>
      <Text variant="lead" className="mt-6">
        On its own, an LLM is a stateless function: text in, text out. Nothing
        more.
      </Text>
      <div className="mt-10">
        <LLMDiagram />
      </div>
      <Text variant="lead" className="mt-14">
        What turns that function into something that ships work is everything you
        wrap around it — the loop, the context you load, the tools and skills it
        can reach. That wrapper is the harness — and a good one is the difference
        between a loop that <em className="text-accent">finishes</em> and one
        that spins out.
      </Text>
      <div className="mt-10">
        <HarnessFrame />
      </div>
      <Callout className="mt-10">
        This is the Deck&rsquo;s whole thesis: the harness is what makes a long
        run <strong>finish</strong>, not just start — and it&rsquo;s the part the{" "}
        <strong>Harness Starter Kit</strong> hands you ready to run.
      </Callout>
    </section>
  );
}
