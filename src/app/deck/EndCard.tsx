import { Heading, Link, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { EmailCaptureForm } from "@/components/molecules";

/**
 * EndCard — the end-of-deck conversion surface, appended after the ported §7
 * close as the final slide of `/deck` (it is not part of the index.html port,
 * so it lives here in the assembly layer rather than in `slides/index.ts`).
 *
 * It composes the L1 `EmailCaptureForm` — the waitlist capture that POSTs to
 * /api/subscribe → Loops — as the single call to action, with a quiet "Back to
 * home" link beneath it. The single waitlist verb "Join the waitlist" is used
 * everywhere (Locked decision 3). Token-only styling (ADR-0005).
 */

export function EndCard() {
  return (
    <Slide anchor="center">
      <Heading as="h2" size="display-sm">
        You&rsquo;ve got the map.
      </Heading>
      <Text variant="lead" className="mt-6 max-w-2xl">
        The Deck is free, and it stays free. When the{" "}
        <span className="text-ink">Harness Starter Kit</span> ships, it hands
        you the actual harness setup — the custom skills,{" "}
        <span className="font-mono text-ink">CLAUDE.md</span>, the ralph-loop
        script and the <span className="font-mono text-ink">agent_docs</span>{" "}
        templates. Join the waitlist to lock the founding price.
      </Text>

      <div className="mt-10 w-full max-w-md text-left">
        <Text variant="soft" className="mb-3">
          Join the waitlist — lock the founding price, get the Kit the day it
          ships, plus the Screencast free when it lands.
        </Text>
        <EmailCaptureForm cta="Join the waitlist" />
        <div className="mt-4 text-center">
          <Link href="/" variant="muted">
            Back to home
          </Link>
        </div>
      </div>
    </Slide>
  );
}
