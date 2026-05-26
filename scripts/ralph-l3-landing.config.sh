#!/usr/bin/env bash
#
# ralph-l3-landing.config.sh — config for the reusable scripts/ralph.sh driver.
#
# This file ONLY declares variables — no logic, no side effects. ralph.sh owns
# the loop, gates, branch lock, resume, bead-close, and the summary. Per-epic
# CONTEXT-TO-LOAD / WHAT-TO-DO / EXACT commit message / ACCEPTANCE / HARD RULES
# live in each bd issue (bd show <id>), NOT here.
#
#   bash -n scripts/ralph-l3-landing.config.sh     # syntax-check first
#   ./scripts/ralph.sh scripts/ralph-l3-landing.config.sh
#

# Human-readable label (banners + the iteration prompt).
PHASE_LABEL="l3-landing — the home/sales page per SPEC §3 anatomy, composed from L1 organisms + L2 diagrams, driven by typed content. (typed-content / sections-top / sections-bottom / nav+seo)"

# Locked working branch. ralph.sh checks it out (no rebase) and refuses to run
# off any other branch. Created off BASE_BRANCH if it does not yet exist.
BRANCH="feat/l3-landing"

# Base for branch creation, the resume `git log BASE..HEAD` skip grep, and the
# final-summary commit range. L0 + L1 + L2 are merged to main, so L3 branches off main.
BASE_BRANCH="main"

# The frozen spec doc. Read-only to agents. ralph.sh fails fast if it is missing.
SPEC_DOC="docs/specs/2026-05-27-l3-landing.md"

# Ordered epic list. Format: "bd_id|name". The name MUST appear verbatim in that
# epic's commit message (ralph.sh asserts it AND uses it for the resume skip).
EPICS=(
  "Deck-2h2|l3 epic-0 typed-content"
  "Deck-1y2|l3 epic-1 sections-top"
  "Deck-hzs|l3 epic-2 sections-bottom"
  "Deck-vmj|l3 epic-3 nav+seo"
)

# 0-based index into EPICS of the verification epic. ralph.sh tolerates a
# no-commit exit for THIS index only (clean re-run) and runs VERIFY_GATE here.
# Folded into the nav+seo epic (the last) — no separate verify epic.
VERIFY_EPIC_INDEX=3

# Gates run by the DRIVER in bash (the agent never runs tests / burns tokens on
# test output). On failure the loop HALTS for a human — it does not loop.
#   LEAN_GATE   : runs after EVERY epic's commit. Lightweight build only.
#   VERIFY_GATE : runs ONLY at VERIFY_EPIC_INDEX — full lint + typecheck + build.
LEAN_GATE="pnpm install && pnpm build"
VERIFY_GATE="pnpm install && pnpm lint && pnpm exec tsc --noEmit && pnpm build"

# Extra prereq binaries to fail-fast on (beyond git/claude/bd/jq).
PREREQS=(pnpm node)

# Model / effort. Plain `=` so an exported var in the operator's interactive
# shell cannot leak into the non-interactive iterations.
CLAUDE_MODEL="claude-opus-4-7[1m]"
CLAUDE_EFFORT="high"

# Optional est-cost rates ($/Mtok). Left commented — the harness reports real cost.
# COST_PER_MTOK_IN=15
# COST_PER_MTOK_OUT=75
