#!/usr/bin/env bash
# run-all-phases.sh — orchestrate the BeyondTheLoop Ralph phases L1..L4 end-to-end.
#
# Per phase: checkout main -> run the phase's ralph loop (the driver branches the
#   phase branch off main) -> on success, merge the phase branch into main -> next.
# Halts cleanly on the first phase failure; completed phases remain merged on main.
# Resumable: just re-run this script. Completed epics auto-skip (bd-closed state),
#   so already-finished phases become no-ops and it picks up at the halted epic.
#
#   ./scripts/run-all-phases.sh
#
set -uo pipefail
REPO="/Users/shekharupadhaya/Desktop/Deck"
cd "$REPO" || { echo "cannot cd $REPO"; exit 1; }
mkdir -p .ralph-logs
LOG=".ralph-logs/run-all-$(date +%Y%m%d-%H%M%S).log"

PHASES=(
  "scripts/ralph-l1-design-system.config.sh"
  "scripts/ralph-l2-deck.config.sh"
  "scripts/ralph-l3-landing.config.sh"
  "scripts/ralph-l4-presell.config.sh"
)

log() { echo "[$(date '+%H:%M:%S')] $*" | tee -a "$LOG"; }

log "RUN-ALL START — ${#PHASES[@]} phases (L1..L4)"
for cfg in "${PHASES[@]}"; do
  BR=$(grep -E '^BRANCH=' "$cfg" | head -1 | cut -d'"' -f2)

  # Skip a phase whose branch is already merged into main (e.g. on resume).
  # Without this, an already-merged phase's epics get re-run, because the
  # driver's git-log skip finds nothing ahead of main.
  if git rev-parse --verify "$BR" >/dev/null 2>&1 && git merge-base --is-ancestor "$BR" main 2>/dev/null; then
    log "SKIP PHASE: $cfg ($BR already merged into main)"
    continue
  fi

  log "PHASE START: $cfg (branch $BR)"

  if ! git checkout main >>"$LOG" 2>&1; then
    log "FATAL: could not checkout main (dirty tree?). HALTING."
    exit 1
  fi

  ./scripts/ralph.sh "$cfg" </dev/null
  rc=$?
  if [ "$rc" -ne 0 ]; then
    log "PHASE FAILED: $cfg (rc=$rc) — HALTING. Completed phases stay merged on main. Re-run this script to resume."
    exit "$rc"
  fi

  git checkout main >>"$LOG" 2>&1
  if git rev-parse --verify "$BR" >/dev/null 2>&1; then
    if git merge --no-ff "$BR" -m "merge $BR into main (ralph phase complete)" >>"$LOG" 2>&1; then
      log "MERGED $BR -> main"
    else
      log "FATAL: merge $BR -> main failed (conflict). HALTING."
      exit 1
    fi
  else
    log "WARN: branch $BR not found after run (no-op resume?); continuing"
  fi
done

log "ALL PHASES COMPLETE — L1..L4 merged to main"
