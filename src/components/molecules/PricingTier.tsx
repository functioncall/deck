import type { ReactNode } from "react";
import { Badge, Heading, Label, Text } from "@/components/atoms";

/**
 * PricingTier — an offer card: the tier name (`.label` eyebrow), the serif
 * price, an optional note, a feature list, and a CTA slot. When `featured` the
 * border lifts to the gold accent and a Badge marks it. Composes Heading / Text
 * / Label / Badge atoms; the CTA is a caller-provided slot. Token-only (ADR-0005).
 */
type PricingTierProps = {
  name: string;
  price: string;
  note?: string;
  features: string[];
  cta: ReactNode;
  featured?: boolean;
};

export function PricingTier({
  name,
  price,
  note,
  features,
  cta,
  featured = false,
}: PricingTierProps) {
  return (
    <div
      className={`flex flex-col gap-6 rounded border bg-bg-card p-8 ${
        featured ? "border-accent" : "border-rule"
      }`}
    >
      <div className="flex items-center justify-between gap-4">
        <Label accent={featured}>{name}</Label>
        {featured ? <Badge>Recommended</Badge> : null}
      </div>
      <div className="flex flex-col gap-1">
        <Heading as="h3" size="display-sm">
          {price}
        </Heading>
        {note ? <Text variant="soft">{note}</Text> : null}
      </div>
      <ul className="flex flex-col gap-3">
        {features.map((feature) => (
          <li key={feature} className="flex items-baseline gap-3">
            <span aria-hidden="true" className="flex-shrink-0 text-accent">
              ✓
            </span>
            <Text variant="soft" as="span">
              {feature}
            </Text>
          </li>
        ))}
      </ul>
      <div className="mt-auto">{cta}</div>
    </div>
  );
}
