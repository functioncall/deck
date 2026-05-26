#!/usr/bin/env bash
#
# ralph-l4-presell.config.sh — config for the reusable scripts/ralph.sh driver.
#
# This file ONLY declares variables — no logic, no side effects. ralph.sh owns
# the loop, gates, branch lock, resume, bead-close, and the summary. Per-epic
# CONTEXT-TO-LOAD / WHAT-TO-DO / EXACT commit message / ACCEPTANCE / HARD RULES
# live in each bd issue (bd show <id>), NOT here.
#
# CRITICAL: the build (LEAN_GATE / VERIFY_GATE) MUST pass WITHOUT real API keys —
# adapters read process.env.* lazily at runtime, never at build/typecheck time;
# .env.example documents the keys but no .env* is committed or read by the gate.
#
#   bash -n scripts/ralph-l4-presell.config.sh     # syntax-check first
#   ./scripts/ralph.sh scripts/ralph-l4-presell.config.sh
#

# Human-readable label (banners + the iteration prompt).
PHASE_LABEL="l4-presell — the pre-sell engine: adapters + lazy env, subscribe flow, lemon checkout + signature-verified webhook, legal pages, funnel analytics. Build MUST be green without real keys. (adapters / subscribe-flow / checkout+webhook / legal / analytics / verify)"

# Locked working branch. ralph.sh checks it out (no rebase) and refuses to run
# off any other branch. Created off BASE_BRANCH if it does not yet exist.
BRANCH="feat/l4-presell"

# Base for branch creation, the resume `git log BASE..HEAD` skip grep, and the
# final-summary commit range. L0–L3 are merged to main, so L4 branches off main.
BASE_BRANCH="main"

# The frozen spec doc. Read-only to agents (the verify epic may append a
# Verification report). ralph.sh fails fast if it is missing.
SPEC_DOC="docs/specs/2026-05-27-l4-presell.md"

# Ordered epic list. Format: "bd_id|name". The name MUST appear verbatim in that
# epic's commit message (ralph.sh asserts it AND uses it for the resume skip).
EPICS=(
  "Deck-gr8|l4 epic-0 adapters"
  "Deck-6jn|l4 epic-1 subscribe-flow"
  "Deck-3jy|l4 epic-2 checkout+webhook"
  "Deck-lz2|l4 epic-3 legal"
  "Deck-rrx|l4 epic-4 analytics"
  "Deck-42n|l4 epic-5 verify"
)

# 0-based index into EPICS of the verification epic. ralph.sh tolerates a
# no-commit exit for THIS index only (clean re-run) and runs VERIFY_GATE here.
# L4 has a DEDICATED verify epic (the launch layer — the end-to-end gate, run
# with no real keys, warrants its own pass).
VERIFY_EPIC_INDEX=5

# Gates run by the DRIVER in bash (the agent never runs tests / burns tokens on
# test output). On failure the loop HALTS for a human — it does not loop. Both
# gates MUST be green WITHOUT real API keys (env is validated lazily at runtime).
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
