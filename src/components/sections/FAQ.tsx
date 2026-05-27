import { Heading, Label } from "@/components/atoms";
import { Accordion } from "@/components/organisms";
import { faq } from "@/content";

/**
 * FAQ — the objection-handling section (SPEC §3): the typed `faq.ts` entries
 * rendered through the L1 Radix `Accordion` (keyboard-operable, ARIA-correct).
 * Copy lives in typed content (`@/content`), never in the component. Token-only
 * styling (ADR-0005).
 */
type SectionProps = { className?: string };

export function FAQ({ className }: SectionProps) {
  return (
    <section
      className={`mx-auto max-w-3xl px-6 py-20 md:py-28${
        className ? ` ${className}` : ""
      }`}
    >
      <Label accent>Questions</Label>
      <Heading as="h2" size="display-sm" className="mt-4 mb-10">
        The honest answers.
      </Heading>
      <Accordion items={faq} />
    </section>
  );
}
