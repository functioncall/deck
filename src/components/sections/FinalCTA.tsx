import NextLink from "next/link";
import { Heading, Label, Text } from "@/components/atoms";
import {
  CTAButtonGroup,
  CheckoutButton,
  EmailCaptureForm,
} from "@/components/molecules";
import { deck, harnessStarterKit } from "@/content";

/**
 * FinalCTA — the close (SPEC §3): the last dual CTA (buy the Harness Starter Kit
 * or read the free Deck) plus the L1 `EmailCaptureForm` for anyone not ready to
 * buy — they leave an email to hear when the Screencast ships. The form is
 * client-validation-only: no POST, no `/api/subscribe` — that wiring is L4
 * (ADR-0002/0004). Offer names come from typed content. Token-only (ADR-0005).
 */
type SectionProps = { className?: string };

export function FinalCTA({ className }: SectionProps) {
  return (
    <section
      className={`bg-bg-soft${className ? ` ${className}` : ""}`}
    >
      <div className="mx-auto max-w-3xl px-6 py-20 text-center md:py-28">
        <Label accent>Stop babysitting</Label>
        <Heading as="h2" size="display-sm" className="mt-4">
          Start shipping with your agent today.
        </Heading>
        <Text variant="lead" className="mx-auto mt-6">
          Read the {deck.name} to see how it works, or get the{" "}
          {harnessStarterKit.name} and run it yourself this afternoon.
        </Text>
        <div className="mt-10 flex justify-center">
          <CTAButtonGroup
            primary={
              <CheckoutButton className="px-8 py-4 text-lg">
                Get the Kit
              </CheckoutButton>
            }
            secondary={
              <NextLink
                href="/deck"
                className="inline-flex items-center justify-center rounded border border-rule bg-transparent px-8 py-4 font-sans text-lg font-medium tracking-wide text-ink transition-colors hover:bg-bg-card focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
              >
                Read the Deck — free
              </NextLink>
            }
          />
        </div>
        <div className="mt-16 flex flex-col items-center gap-4 border-t border-rule pt-12">
          <Text variant="soft">
            Not ready yet? Leave your email and we&rsquo;ll tell you the moment
            the Screencast ships.
          </Text>
          <div className="flex w-full justify-center">
            <EmailCaptureForm cta="Keep me posted" />
          </div>
        </div>
      </div>
    </section>
  );
}
