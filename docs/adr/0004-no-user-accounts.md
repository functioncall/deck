# No user accounts — email-based access, no auth system

**Status:** accepted

Buying requires no account (Lemon Squeezy checkout takes email + card only). When the **Screencast** ships, **Purchase** holders receive a private, signed/expiring access link by email to a `/watch` page — there is **no login, no password, and no auth system** in the codebase.

**Why:** for a single pre-sold product, an email link is enough; building and securing authentication before there is anything to watch (or a second product) is premature surface area.

**Boundary:** this is an explicit scope "no". A member area / passwordless (magic-link) login is the planned graduation path, added **in the future layer** that introduces multiple paid offers — behind the existing repository seam, not retrofitted into Phase 1.
