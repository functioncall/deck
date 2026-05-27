import Image from "next/image";
import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { SectionLabel } from "./SectionLabel";
import chart from "./instruction-ceiling.jpg";

/**
 * s-2-0a — "the instruction ceiling is real" (index.html data-num 2.0a): the
 * research chart (instruction-following accuracy vs. instruction count, from the
 * deck's embedded JPEG) beside the title + lead + decay caption, with the arxiv
 * source line pinned to the bottom. Single state.
 */
export function InstructionCeiling() {
  return (
    <Slide anchor="center">
      <SectionLabel num="§ 02">Context</SectionLabel>
      <div className="grid w-full max-w-6xl grid-cols-1 items-center gap-[3vw] text-left md:grid-cols-[1.5fr_1fr]">
        <div className="flex items-center justify-center">
          <Image
            src={chart}
            alt="Instruction-following accuracy decays as the number of instructions grows; frontier thinking models hold to roughly 150–200 instructions before rules start getting ignored."
            priority
            className="h-auto max-h-[60vh] w-full object-contain"
          />
        </div>
        <div>
          <Heading as="h2" size="display-sm" className="mb-4 text-left font-light">
            The instruction ceiling <em className="text-accent">is real</em>.
          </Heading>
          <Text variant="lead" className="text-left">
            Frontier thinking models reliably follow{" "}
            <em className="text-accent">~150&ndash;200 instructions.</em> Beyond
            that, even rules at the top get ignored.
          </Text>
          <div className="mt-5 flex flex-wrap items-center gap-2 font-mono text-xs text-ink-soft">
            <span>
              <span className="text-ink-dim">smaller models</span> · exponential
              decay
            </span>
            <span aria-hidden="true" className="text-accent">
              •
            </span>
            <span>
              <span className="text-ink-dim">frontier thinking</span> · linear
              decay
            </span>
          </div>
        </div>
      </div>
      <div className="absolute inset-x-[10vw] bottom-[6vh] text-center font-mono text-xs uppercase tracking-widest text-ink-dim">
        source · Dex Horthy / humanlayer.dev · arxiv:2507.11538
      </div>
    </Slide>
  );
}
