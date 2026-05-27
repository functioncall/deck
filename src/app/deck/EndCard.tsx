import NextLink from "next/link";
import { Heading, Link, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { CTAButtonGroup, EmailCaptureForm } from "@/components/molecules";

/**
 * EndCard — the end-of-deck conversion surface, appended after the ported §7
 * close as the final slide of `/deck` (it is not part of the index.html port,
 * so it lives here in the assembly layer rather than in `slides/index.ts`).
 *
 * It composes the L1 `EmailCaptureForm` (the soft "follow along" capture —
 * client validation only, no POST; the `/api/subscribe` wiring is L4) and the
 * L1 `CTAButtonGroup` linking back to `/` and to buy the Harness Starter Kit
 * (the paid hero). The buy target is a PLACEHOLDER href until L4 swaps in the
 * real Lemon Squeezy checkout. Token-only styling (ADR-0005).
 */

// PLACEHOLDER — L4 replaces this with the real Lemon Squeezy checkout URL for
// the Harness Starter Kit. For now it points at the (L3) landing Kit section.
const KIT_CHECKOUT_HREF = "/#harness-starter-kit";

export function EndCard() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm">
        You&rsquo;ve got the map.
      </Heading>
      <Text variant="lead" className="mt-6 max-w-2xl">
        The Deck is free, and it stays free. When you&rsquo;re ready to build
        the way it describes, the{" "}
        <span className="text-ink">Harness Starter Kit</span> hands you the
        founder&rsquo;s actual harness — the custom skills,{" "}
        <span className="font-mono text-ink">CLAUDE.md</span>, the ralph-loop
        script and the <span className="font-mono text-ink">agent_docs</span>{" "}
        templates — the moment you grab it.
      </Text>

      <div className="mt-10 w-full max-w-md text-left">
        <Text variant="soft" className="mb-3">
          Follow along — new drops, plus the Screencast free when it ships.
        </Text>
        <EmailCaptureForm cta="Follow along" />
      </div>

      <CTAButtonGroup
        className="mt-10 justify-center"
        primary={
          <NextLink
            href={KIT_CHECKOUT_HREF}
            className="inline-flex items-center justify-center rounded bg-accent px-8 py-4 font-sans text-lg font-medium tracking-wide text-bg transition-colors hover:opacity-90 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent focus-visible:ring-offset-2 focus-visible:ring-offset-bg"
          >
            Get the Harness Starter Kit
          </NextLink>
        }
        secondary={
          <Link href="/" variant="muted" className="text-center">
            Back to home
          </Link>
        }
      />
    </Slide>
  );
}
