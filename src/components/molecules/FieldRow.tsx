import { cloneElement, isValidElement } from "react";
import type { ReactElement, ReactNode } from "react";
import { Label } from "@/components/atoms";

/**
 * FieldRow — a labelled field: the `.label` eyebrow over an Input (passed as
 * children) plus optional help and error lines. The field child is cloned to
 * receive `id`, `aria-describedby` (help/error), and `aria-invalid`, so the
 * association is wired for assistive tech without the caller repeating ids.
 * Token-only styling (ADR-0005); composes the Label atom.
 */
type FieldRowProps = {
  label: string;
  htmlFor: string;
  error?: string;
  help?: string;
  children: ReactNode;
};

export function FieldRow({ label, htmlFor, error, help, children }: FieldRowProps) {
  const errorId = `${htmlFor}-error`;
  const helpId = `${htmlFor}-help`;
  const describedBy =
    [error ? errorId : null, help ? helpId : null].filter(Boolean).join(" ") ||
    undefined;

  const field = isValidElement(children)
    ? cloneElement(children as ReactElement<Record<string, unknown>>, {
        id: htmlFor,
        "aria-describedby": describedBy,
        "aria-invalid": error ? true : undefined,
      })
    : children;

  return (
    <div className="flex flex-col gap-2">
      <label htmlFor={htmlFor}>
        <Label>{label}</Label>
      </label>
      {field}
      {help ? (
        <span id={helpId} className="font-sans text-sm text-ink-dim">
          {help}
        </span>
      ) : null}
      {error ? (
        <span id={errorId} className="font-sans text-sm text-bad">
          {error}
        </span>
      ) : null}
    </div>
  );
}
