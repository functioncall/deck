"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import { Button } from "@/components/atoms";
import { Dialog } from "@/components/organisms";
import type { DeckSection } from "./types";

/**
 * JumpMenu — section navigation. Reuses the L1 `Dialog` organism (Radix focus
 * trap + Escape) for the overlay; each section is wrapped in `Dialog.Close` so
 * selecting it both jumps and closes. The trigger carries `data-deck-control`
 * so `SlidePlayer`'s tap-to-advance ignores it. Token-only (ADR-0005).
 */
type JumpMenuProps = {
  sections: DeckSection[];
  onJump: (slideIndex: number) => void;
};

export function JumpMenu({ sections, onJump }: JumpMenuProps) {
  return (
    <Dialog
      title="Jump to section"
      trigger={
        <Button
          variant="ghost"
          size="sm"
          data-deck-control
          className="absolute left-6 top-5 z-50 font-mono text-xs uppercase tracking-widest"
        >
          Sections
        </Button>
      }
    >
      <ul className="flex flex-col gap-1">
        {sections.map((section) => (
          <li key={section.id}>
            <DialogPrimitive.Close asChild>
              <button
                type="button"
                onClick={() => onJump(section.firstSlide)}
                className="flex w-full items-center gap-3 rounded px-3 py-2 text-left font-sans text-ink-soft transition-colors hover:bg-bg-soft hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
              >
                <span className="font-mono text-xs tabular-nums text-accent">
                  {String(section.index).padStart(2, "0")}
                </span>
                <span>{section.title}</span>
              </button>
            </DialogPrimitive.Close>
          </li>
        ))}
      </ul>
    </Dialog>
  );
}
