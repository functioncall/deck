import NextLink from "next/link";
import { Heading, Label, Text } from "@/components/atoms";
import { EmailCaptureForm } from "@/components/molecules";

/**
 * FinalCTA — the close (SPEC §3) and the waitlist anchor (`id="join"` — the
 * target every "Join the waitlist" CTA scrolls to). The waitlist launch's
 * primary conversion is the L1 `EmailCaptureForm` (POSTs to /api/subscribe →
 * Loops "lead" tag); the free Deck is the secondary path. Token-only styling
 * (ADR-0005).
 */
type SectionProps = { className?: string };

export function FinalCTA({ className }: SectionProps) {
  return (
    <section
      id="join"
      className={`scroll-mt-24 bg-bg-soft${className ? ` ${className}` : ""}`}
    >
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Label accent>Finish the loop</Label>
        <Heading as="h2" size="display-sm" className="mt-4">
          Hand your agent the night shift.
        </Heading>
        <Text variant="lead" className="mx-auto mt-6">
          Read the Deck to see how it works — then lock the founding price
          before it rises.
        </Text>
        <div className="mt-10 flex flex-col items-center gap-6">
          <div className="flex w-full justify-center">
            <EmailCaptureForm cta="Join the waitlist" />
          </div>
          <NextLink
            href="/deck"
            className="inline-flex items-center justify-center rounded border border-rule bg-transparent px-8 py-4 font-sans text-lg font-medium tracking-wide text-ink transition-colors hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Read the Deck — free
          </NextLink>
        </div>
      </div>
    </section>
  );
}
