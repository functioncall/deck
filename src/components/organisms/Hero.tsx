import type { ReactNode } from "react";
import { Heading, Label, Stat, Text } from "@/components/atoms";

/**
 * Hero — the top marketing section: an optional accent eyebrow (Label), the
 * serif Display title (Heading h1), a lead paragraph (Text), a CTA slot (the
 * CTAButtonGroup molecule passed in), and an optional row of Stats. Composes
 * atoms only and lays them out; token-only styling (ADR-0005).
 */
type HeroProps = {
  eyebrow?: string;
  title: ReactNode;
  lead: ReactNode;
  cta: ReactNode;
  stats?: { value: string; label: string }[];
};

export function Hero({ eyebrow, title, lead, cta, stats }: HeroProps) {
  return (
    <section className="mx-auto flex max-w-4xl flex-col items-start gap-6 px-6 py-24">
      {eyebrow ? <Label accent>{eyebrow}</Label> : null}
      <Heading as="h1" size="display">
        {title}
      </Heading>
      <Text variant="lead">{lead}</Text>
      <div className="mt-2">{cta}</div>
      {stats && stats.length > 0 ? (
        <div className="mt-12 grid w-full grid-cols-2 gap-8 border-t border-rule pt-12 sm:grid-cols-3">
          {stats.map((stat) => (
            <Stat key={stat.label} value={stat.value} label={stat.label} />
          ))}
        </div>
      ) : null}
    </section>
  );
}
