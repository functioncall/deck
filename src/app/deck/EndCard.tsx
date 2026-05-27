import { Heading, Link, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import {
  CTAButtonGroup,
  CheckoutButton,
  EmailCaptureForm,
} from "@/components/molecules";

/**
 * EndCard — the end-of-deck conversion surface, appended after the ported §7
 * close as the final slide of `/deck` (it is not part of the index.html port,
 * so it lives here in the assembly layer rather than in `slides/index.ts`).
 *
 * It composes the L1 `EmailCaptureForm` (the soft "follow along" capture —
 * client validation only, no POST; the `/api/subscribe` wiring is L4) and the
 * L1 `CTAButtonGroup` linking back to `/` and to buy the Harness Starter Kit
 * (the paid hero) via the shared `CheckoutButton` (opens the Lemon Squeezy
 * checkout). Token-only styling (ADR-0005).
 */

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
          <CheckoutButton className="px-8 py-4 text-lg">
            Get the Harness Starter Kit
          </CheckoutButton>
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
