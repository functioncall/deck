# ===========================================================================
# Ralph driver config — Launch #1: HN-ready waitlist funnel (PPT deck).
# Declares variables only; no logic. Run: ./scripts/ralph.sh <this file>
# The driver runs each epic as a fresh `claude --print` session, asserts the
# commit, runs gates, and closes the bead. Resume = re-run the same config.
# ===========================================================================

# --- Phase identity ---------------------------------------------------------
PHASE_LABEL="Launch #1 — HN-ready waitlist funnel (PPT deck escape+chrome, honest copy, consent, trust)"
BRANCH="feature/launch-1-waitlist-funnel"
BASE_BRANCH="main"
SPEC_DOC="docs/specs/2026-05-30-launch-1-waitlist-funnel.md"

# --- Epics (in dependency order) --------------------------------------------
# "bd_id|name" — name MUST appear verbatim in that epic's commit message.
EPICS=(
  "Deck-3dt|epic-1-deck-nav"
  "Deck-0qo|epic-2-waitlist-copy"
  "Deck-d46|epic-3-trust-and-legal"
  "Deck-kyj|epic-4-analytics-consent"
  "Deck-kzj|epic-5-verify"
)

# --- Verify epic ------------------------------------------------------------
# 0-based index. Driver runs VERIFY_GATE here and tolerates a no-commit session.
VERIFY_EPIC_INDEX=4

# --- Gates ------------------------------------------------------------------
# LEAN_GATE runs after EVERY epic's commit; VERIFY_GATE runs ONLY at the verify
# epic. Gates run in the driver (bash) — the agent never burns tokens on output.
LEAN_GATE="pnpm install --frozen-lockfile && pnpm lint && pnpm exec tsc --noEmit"
VERIFY_GATE="pnpm install --frozen-lockfile && pnpm lint && pnpm exec tsc --noEmit && pnpm build"

# --- Model / effort ---------------------------------------------------------
CLAUDE_MODEL="claude-opus-4-7"
CLAUDE_EFFORT="high"
COST_PER_MTOK_IN="3"
COST_PER_MTOK_OUT="15"

# --- Optional prereqs -------------------------------------------------------
PREREQS=("pnpm")
