import { Label, Text } from "@/components/atoms";

/**
 * TestimonialCard — a pull-quote card: a serif editorial quote over its
 * attribution (the `.label` mono name + an optional soft title). The quote is a
 * semantic `<blockquote>` in the deck's serif voice; the attribution composes
 * the Label and Text atoms. Token-only styling (ADR-0005).
 */
type TestimonialCardProps = { quote: string; name: string; title?: string };

export function TestimonialCard({ quote, name, title }: TestimonialCardProps) {
  return (
    <figure className="flex flex-col gap-6 rounded border border-rule bg-bg-card p-8">
      <blockquote className="font-serif text-xl font-light italic leading-relaxed text-ink">
        &ldquo;{quote}&rdquo;
      </blockquote>
      <figcaption className="flex flex-col gap-1">
        <Label>{name}</Label>
        {title ? (
          <Text variant="soft" as="span">
            {title}
          </Text>
        ) : null}
      </figcaption>
    </figure>
  );
}
