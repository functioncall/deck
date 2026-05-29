import { Heading, Text } from "@/components/atoms";
import { Slide } from "@/components/deck-player";
import { ContextFrame, CtxEmpty, CtxMsg } from "./ctx";

/**
 * s-2-0b — "smart zone, dumb zone" (index.html data-num 2.0b): the bridge slide
 * between the instruction ceiling and the antipatterns. The title + Dex/Geoffrey
 * attribution beside a fresh, healthy `ContextFrame` with the smart/dumb zone
 * line visible. Single state.
 */
export function SmartDumbZone() {
  return (
    <Slide anchor="center">
      <div className="grid w-full max-w-5xl grid-cols-1 items-center gap-[4vw] text-left md:grid-cols-2">
        <div className="flex flex-col gap-4 self-start">
          <Heading as="h2" size="display-sm" className="text-left font-light">
            Smart zone, <em className="text-accent">dumb zone</em>.
          </Heading>
          <Text variant="lead" className="text-left">
            The window isn&rsquo;t uniform. The first{" "}
            <em className="text-accent">~40%</em> is where the model thinks
            clearly. Past that, attention frays &mdash; tool choice gets sloppy,
            instructions get dropped, the goal drifts.
          </Text>
          <Text variant="soft" className="text-left italic">
            &ldquo;The more context you use, the worse results you&rsquo;ll
            get.&rdquo;
          </Text>
          <div className="mt-2 font-mono text-xs uppercase tracking-widest text-ink-dim">
            Dex Horthy / humanlayer.dev · Geoffrey Huntley
          </div>
        </div>
        <div className="flex justify-center">
          <ContextFrame>
            <CtxMsg tone="system" size="6.3k">
              system prompt
            </CtxMsg>
            <CtxMsg size="9.5k">tool definitions</CtxMsg>
            <CtxMsg size="2.5k">CLAUDE.md</CtxMsg>
            <CtxMsg size="0.9k">skills</CtxMsg>
            <CtxEmpty>~180k remaining · fresh session</CtxEmpty>
          </ContextFrame>
        </div>
      </div>
    </Slide>
  );
}
