"use client";

import * as DialogPrimitive from "@radix-ui/react-dialog";
import type { ReactNode } from "react";
import { Text } from "@/components/atoms";

/**
 * Dialog — a token-styled wrapper over `@radix-ui/react-dialog`. Radix provides
 * focus trapping, ARIA wiring, Escape-to-close and keyboard operation; we supply
 * the deck look (dimmed overlay, ruled card, serif title). The `trigger` is a
 * caller-supplied element (a Button atom) rendered `asChild` so it stays a
 * single accessible control. Token-only styling (ADR-0005).
 */
type DialogProps = {
  trigger: ReactNode;
  title: string;
  description?: string;
  children: ReactNode;
};

export function Dialog({ trigger, title, description, children }: DialogProps) {
  return (
    <DialogPrimitive.Root>
      <DialogPrimitive.Trigger asChild>{trigger}</DialogPrimitive.Trigger>
      <DialogPrimitive.Portal>
        <DialogPrimitive.Overlay className="fixed inset-0 z-50 bg-bg/80 backdrop-blur-sm" />
        <DialogPrimitive.Content className="fixed left-1/2 top-1/2 z-50 w-full max-w-md -translate-x-1/2 -translate-y-1/2 rounded border border-rule bg-bg-card p-8 shadow-2xl focus:outline-none focus-visible:outline-none">
          <DialogPrimitive.Close
            aria-label="Close"
            className="absolute right-4 top-4 font-mono text-lg leading-none text-ink-soft transition-colors hover:text-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
          >
            ×
          </DialogPrimitive.Close>
          <DialogPrimitive.Title className="pr-8 font-serif text-2xl font-normal text-ink">
            {title}
          </DialogPrimitive.Title>
          {description ? (
            <DialogPrimitive.Description asChild>
              <Text variant="soft" className="mt-2">
                {description}
              </Text>
            </DialogPrimitive.Description>
          ) : null}
          <div className="mt-4 font-sans text-ink">{children}</div>
        </DialogPrimitive.Content>
      </DialogPrimitive.Portal>
    </DialogPrimitive.Root>
  );
}
