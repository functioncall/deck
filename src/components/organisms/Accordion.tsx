"use client";

import * as AccordionPrimitive from "@radix-ui/react-accordion";
import type { ReactNode } from "react";
import { Text } from "@/components/atoms";

/**
 * Accordion — the FAQ surface: a token-styled wrapper over
 * `@radix-ui/react-accordion`. Each item shares the `FAQItem` molecule's Q/A
 * shape; Radix splits it across the interactive parts — the question is the
 * keyboard-operable trigger (with a `+`→`×` marker) and the answer is the
 * collapsible panel (the `Text` atom, soft ink). Radix supplies ARIA + keyboard
 * operation; we supply the deck look. Token-only styling (ADR-0005).
 *
 * `type="single"` (default) keeps one panel open and is collapsible; `multiple`
 * lets several stay open at once.
 */
type AccordionProps = {
  items: { question: string; answer: ReactNode }[];
  type?: "single" | "multiple";
};

export function Accordion({ items, type = "single" }: AccordionProps) {
  const rows = items.map((item, index) => (
    <AccordionPrimitive.Item
      key={index}
      value={`item-${index}`}
      className="border-b border-rule"
    >
      <AccordionPrimitive.Header>
        <AccordionPrimitive.Trigger className="group flex w-full items-center justify-between gap-4 py-6 text-left font-sans font-medium text-ink transition-colors hover:text-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent">
          <span>{item.question}</span>
          <span
            aria-hidden
            className="font-mono text-accent transition-transform group-data-[state=open]:rotate-45"
          >
            +
          </span>
        </AccordionPrimitive.Trigger>
      </AccordionPrimitive.Header>
      <AccordionPrimitive.Content className="overflow-hidden pb-6">
        <Text variant="soft">{item.answer}</Text>
      </AccordionPrimitive.Content>
    </AccordionPrimitive.Item>
  ));

  if (type === "multiple") {
    return (
      <AccordionPrimitive.Root type="multiple" className="w-full">
        {rows}
      </AccordionPrimitive.Root>
    );
  }

  return (
    <AccordionPrimitive.Root type="single" collapsible className="w-full">
      {rows}
    </AccordionPrimitive.Root>
  );
}
