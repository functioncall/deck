import type { ReactNode } from "react";
import { Text } from "@/components/atoms";

/**
 * FAQItem — the semantic question/answer pair: a medium-weight question over a
 * soft-ink answer. This is the content shape only; the Radix accordion that
 * makes it expand/collapse is the FAQ organism (L1 epic-3). Composes the Text
 * atom; token-only styling (ADR-0005).
 */
type FAQItemProps = { question: string; answer: ReactNode };

export function FAQItem({ question, answer }: FAQItemProps) {
  return (
    <div className="flex flex-col gap-2 border-b border-rule pb-6">
      <Text as="span" className="font-medium text-ink">
        {question}
      </Text>
      <Text variant="soft">{answer}</Text>
    </div>
  );
}
