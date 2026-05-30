import { Label, Link, Text } from "@/components/atoms";

/**
 * Footer — net-new marketing footer: the brand wordmark + tagline, optional nav
 * links, a real contact `mailto:`, and a legal line. Composes the Link / Text /
 * Label atoms; token-only styling (ADR-0005). The tagline grounds the brand
 * thesis ("beyond the basic inference loop", CONTEXT.md).
 */
type FooterProps = {
  links?: { href: string; label: string }[];
};

export const CONTACT_EMAIL = "hello@beontheloop.com";

export function Footer({ links = [] }: FooterProps) {
  const year = new Date().getFullYear();
  const contactLinks = [
    ...links,
    { href: `mailto:${CONTACT_EMAIL}`, label: "Contact" },
  ];
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex max-w-6xl flex-col gap-8 px-6 py-12 sm:flex-row sm:items-center sm:justify-between">
        <div className="flex flex-col gap-2">
          <span className="font-serif text-lg text-ink">Beontheloop</span>
          <Label>Beyond the basic inference loop</Label>
        </div>
        <ul className="flex flex-wrap gap-x-6 gap-y-2">
          {contactLinks.map((link) => (
            <li key={link.href}>
              <Link href={link.href} variant="muted" className="text-sm">
                {link.label}
              </Link>
            </li>
          ))}
        </ul>
        <Text variant="soft" className="text-sm">
          © {year} Beontheloop
        </Text>
      </div>
    </footer>
  );
}
