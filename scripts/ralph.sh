#!/usr/bin/env bash
#
# ralph.sh — ONE reusable, config-driven, project-agnostic Ralph loop.
#
# Generalized from a proven per-phase driver. Instead of a new script per
# phase, this is parameterized: it sources a config file given as $1 which
# declares the branch, spec doc, ordered epic list, the verification-epic
# index, the gates, and the model/effort.
#
#   ./scripts/ralph.sh scripts/ralph-<slug>.config.sh
#
# WHAT IT DOES
#   - Resumes (or creates) $BRANCH off $BASE_BRANCH (branch-lock: refuses to
#     run off any other branch).
#   - For each epic in $EPICS (in order), spawns a fresh non-interactive
#     Claude session (`claude --print`). Claude reads the spec doc + the bd
#     issue description, implements WHAT TO DO, commits, exits. Tests are NOT
#     run by the agent (it never burns tokens on test output) — gates run in
#     the DRIVER, in bash, after the commit assertion.
#   - After each epic the driver asserts (a) a new commit exists and (b) the
#     commit message references the epic name; then runs $LEAN_GATE; then
#     closes the epic's bead. The verification epic ($VERIFY_EPIC_INDEX)
#     additionally runs $VERIFY_GATE (the full suite) and may produce no
#     commit (clean re-run).
#   - Durable, zero-edit resume: a completed epic is skipped (bead CLOSED, or
#     a commit on the branch already references the name). Re-running the same
#     config resumes from the first unfinished epic with no manual edits.
#   - On a gate failure the loop STOPS with a clear message (it does not loop)
#     so a human can intervene — durable, not destructive.
#
# CONFIG VARIABLE CONTRACT (declared in scripts/ralph-<slug>.config.sh)
#   Required:
#     PHASE_LABEL          human-readable label for banners + the prompt
#     BRANCH               locked working branch
#     SPEC_DOC             path to the frozen spec doc (read-only to agents;
#                          only the verify epic may APPEND a report)
#     EPICS                array of "bd_id|name" (name MUST appear verbatim in
#                          that epic's commit message)
#     VERIFY_EPIC_INDEX    0-based index into EPICS of the verification epic
#                          (no-commit tolerated there; runs $VERIFY_GATE)
#   Optional (sensible defaults):
#     BASE_BRANCH          default: main
#     LEAN_GATE            bash run after EVERY epic's commit (lightweight —
#                          e.g. build/lint). May be empty (no lean gate).
#     VERIFY_GATE          bash run ONLY at VERIFY_EPIC_INDEX (full suite).
#     CLAUDE_MODEL         default: claude-opus-4-7   (plain =, see below)
#     CLAUDE_EFFORT        default: high              (plain =, see below)
#     COST_PER_MTOK_IN     $/Mtok input  — if set with _OUT, driver computes
#     COST_PER_MTOK_OUT    $/Mtok output —   an est. cost; else cost: n/a
#     PREREQS              extra `command -v` names to fail-fast on (array)
#
#   Use PLAIN `=` for CLAUDE_MODEL / CLAUDE_EFFORT in the config (not
#   ${VAR:-default}) so an exported var in the operator's interactive shell
#   cannot leak into the non-interactive Ralph iterations. Per-run override is
#   still possible:  CLAUDE_MODEL=… CLAUDE_EFFORT=… ./scripts/ralph.sh <config>
#
# LOGGING (lean — summary only, no per-line token spam)
#   Dual-sink: a global .ralph-logs/<ts>/progress.log plus a per-epic
#   epic-N-<name>.log of the raw stream-json. Each epic start banner leads
#   with accumulated/elapsed time + model. Each epic summary shows model,
#   tokens (in/out, +cache), est. cost, commit (hash + diffstat or none),
#   bead (closed ✓/✗). The final table totals tokens + est. cost.
#
# USAGE
#   chmod +x scripts/ralph.sh
#   bash -n scripts/ralph-<slug>.config.sh        # syntax-check the config
#   ./scripts/ralph.sh scripts/ralph-<slug>.config.sh
#
#   Live view in another terminal:
#   tail -f .ralph-logs/$(ls -t .ralph-logs/ | head -1)/progress.log
#
#   Resume after interruption: just re-run with the SAME config — completed
#   epics auto-skip. VERBOSE=1 ./scripts/ralph.sh <config> adds skip debug.
#

set -euo pipefail

# ---------- LOAD CONFIG ----------

CONFIG_PATH="${1:-}"
if [ -z "$CONFIG_PATH" ]; then
  echo "ERROR: usage: $0 <config-file>"
  echo "       e.g. $0 scripts/ralph-myfeature.config.sh"
  exit 1
fi
if [ ! -f "$CONFIG_PATH" ]; then
  echo "ERROR: config file not found: $CONFIG_PATH"
  exit 1
fi

# shellcheck source=/dev/null
source "$CONFIG_PATH"

BASE_BRANCH="${BASE_BRANCH:-main}"
PHASE_LABEL="${PHASE_LABEL:-phase}"
LEAN_GATE="${LEAN_GATE:-}"
VERIFY_GATE="${VERIFY_GATE:-}"
CLAUDE_BIN="${CLAUDE_BIN:-claude}"
CLAUDE_MODEL="${CLAUDE_MODEL:-claude-opus-4-7}"
CLAUDE_EFFORT="${CLAUDE_EFFORT:-high}"
VERBOSE="${VERBOSE:-0}"
CLAUDE_EXTRA_ARGS=(--model "$CLAUDE_MODEL" --effort "$CLAUDE_EFFORT" --dangerously-skip-permissions --output-format=stream-json --verbose)

for required in BRANCH SPEC_DOC VERIFY_EPIC_INDEX; do
  if [ -z "${!required:-}" ]; then
    echo "ERROR: config $CONFIG_PATH must define $required"
    exit 1
  fi
done
if [ "${#EPICS[@]}" -eq 0 ]; then
  echo "ERROR: config $CONFIG_PATH must define a non-empty EPICS array"
  exit 1
fi

# ---------- TIMING + LOGGING HELPERS ----------

SCRIPT_START=$(date +%s)
export SCRIPT_START

fmt_duration() {
  local sec=$1
  local h=$((sec / 3600))
  local m=$(( (sec % 3600) / 60 ))
  local s=$((sec % 60))
  if [ "$h" -gt 0 ]; then
    printf "%dh%02dm%02ds" "$h" "$m" "$s"
  else
    printf "%02d:%02d" "$m" "$s"
  fi
}
export -f fmt_duration

cum_time() {
  fmt_duration $(($(date +%s) - SCRIPT_START))
}
export -f cum_time

banner_line() {
  printf "[+%s] %s\n" "$(cum_time)" "$1"
}

declare -a EPIC_ELAPSED_SECS
declare -a EPIC_COMMIT_SHA
declare -a EPIC_DIFFSTAT
declare -a EPIC_OUTCOME
declare -a EPIC_TOK_IN
declare -a EPIC_TOK_OUT
declare -a EPIC_COST
declare -a EPIC_BEAD

TOTAL_TOK_IN=0
TOTAL_TOK_OUT=0
TOTAL_COST=0

# ---------- PREREQS / SANITY ----------

REPO_ROOT="$(git rev-parse --show-toplevel)"
cd "$REPO_ROOT"

command -v "$CLAUDE_BIN" >/dev/null || { echo "ERROR: '$CLAUDE_BIN' not in PATH"; exit 1; }
command -v bd            >/dev/null || { echo "ERROR: 'bd' not in PATH (beads task tracker)"; exit 1; }
command -v jq            >/dev/null || { echo "ERROR: 'jq' not in PATH (needed to filter claude stream-json)"; exit 1; }
for extra in "${PREREQS[@]:-}"; do
  [ -z "$extra" ] && continue
  command -v "$extra" >/dev/null || { echo "ERROR: '$extra' not in PATH (config PREREQS)"; exit 1; }
done
[ -f "$SPEC_DOC" ] || { echo "ERROR: spec doc missing: $SPEC_DOC"; exit 1; }

# Working tree must be clean — allow scripts/, agent_docs/, .ralph-logs/.
DIRT="$(git status --porcelain | grep -vE '^\?\? (scripts/|agent_docs/|\.ralph-logs/)' || true)"
if [ -n "$DIRT" ]; then
  echo "ERROR: working tree not clean. Commit or stash first."
  echo "$DIRT"
  exit 1
fi

# ---------- BRANCH SETUP (branch-lock) ----------

banner_line "Ralph loop starting ($PHASE_LABEL)"
banner_line "Config:     $CONFIG_PATH"
banner_line "Branch:     $BRANCH (base: $BASE_BRANCH)"
banner_line "Spec:       $SPEC_DOC"
banner_line "Model:      $CLAUDE_MODEL (effort=$CLAUDE_EFFORT)"
banner_line "Epics:      ${#EPICS[@]} sequential, linear dep chain"
banner_line "VerifyIdx:  $VERIFY_EPIC_INDEX (no-commit exit tolerated there)"

if git show-ref --verify --quiet "refs/heads/$BRANCH"; then
  banner_line "Branch exists; checking out (NOT rebasing — $BRANCH is the locked working branch)"
  git checkout "$BRANCH" >/dev/null
else
  banner_line "Creating branch off $BASE_BRANCH"
  git checkout "$BASE_BRANCH" >/dev/null
  git checkout -b "$BRANCH" >/dev/null
fi

CURRENT_BRANCH="$(git rev-parse --abbrev-ref HEAD)"
if [ "$CURRENT_BRANCH" != "$BRANCH" ]; then
  echo "ERROR: branch lock failed — on '$CURRENT_BRANCH', expected '$BRANCH'"
  exit 1
fi

for e in "${EPICS[@]}"; do
  bd update "${e%%|*}" --append-notes="branch: $BRANCH" >/dev/null 2>&1 || true
done

LOG_DIR="$REPO_ROOT/.ralph-logs/$(date +%Y%m%d-%H%M%S)"
mkdir -p "$LOG_DIR"
PROGRESS_LOG="$LOG_DIR/progress.log"
banner_line "Logs:       $LOG_DIR"
banner_line "Progress:   tail -f $PROGRESS_LOG"
banner_line "Run started"

{
  banner_line "Ralph loop started ($PHASE_LABEL)"
  banner_line "Config:     $CONFIG_PATH"
  banner_line "Branch:     $BRANCH"
  banner_line "Model:      $CLAUDE_MODEL (effort=$CLAUDE_EFFORT)"
  banner_line "Logs dir:   $LOG_DIR"
} >> "$PROGRESS_LOG"

# ---------- HELPERS ----------

prefix_stream() {
  local n=$1
  local line
  while IFS= read -r line; do
    printf "[E%s +%s] %s\n" "$n" "$(cum_time)" "$line"
  done
}

# bead_is_closed <id> : 0 if bd shows the bead CLOSED, 1 otherwise.
bead_is_closed() {
  bd show "$1" 2>/dev/null | grep -qiE '\b(closed|done)\b'
}

# run_gate <label> <log> <cmd> : run a gate command in bash; on failure print a
# clear, durable message and exit 1 (halt — do not loop). Empty cmd = no-op.
run_gate() {
  local label="$1" log="$2" cmd="$3"
  [ -z "$cmd" ] && { banner_line "$label gate: (none configured)"; return 0; }
  banner_line "$label gate: running"
  if ( eval "$cmd" ) >> "$log" 2>&1; then
    banner_line "$label gate: PASS"
    return 0
  fi
  banner_line "ERROR: $label gate FAILED. Halting so you can intervene."
  banner_line "  command: $cmd"
  banner_line "  output:  tail -n 40 '$log'"
  { echo ""; echo "=== $label gate FAILED ==="; echo "command: $cmd"; tail -n 40 "$log"; } >> "$PROGRESS_LOG"
  exit 1
}

# ---------- EPIC LOOP ----------

TOTAL_EPICS="${#EPICS[@]}"

for i in "${!EPICS[@]}"; do
  EPIC="${EPICS[$i]}"
  EPIC_ID="${EPIC%%|*}"
  EPIC_NAME="${EPIC#*|}"
  EPIC_NAME="${EPIC_NAME%%|*}"   # tolerate a legacy "id|name|gatetype" third field
  EPIC_NUM="$i"

  LOG="$LOG_DIR/epic-${EPIC_NUM}-${EPIC_NAME// /-}.log"

  # Defaults for this epic's accumulators.
  EPIC_ELAPSED_SECS[$i]=0
  EPIC_COMMIT_SHA[$i]="(none)"
  EPIC_DIFFSTAT[$i]=""
  EPIC_TOK_IN[$i]=0
  EPIC_TOK_OUT[$i]=0
  EPIC_COST[$i]=""
  EPIC_BEAD[$i]="?"

  echo ""
  echo "============================================================"
  EPIC_BANNER="── Epic $((EPIC_NUM + 1))/$TOTAL_EPICS · $EPIC_NAME · bead $EPIC_ID · $CLAUDE_MODEL · elapsed +$(cum_time) ──"
  banner_line "$EPIC_BANNER"
  banner_line "Log:       $LOG"
  echo "============================================================"
  {
    echo ""
    echo "============================================================"
    banner_line "$EPIC_BANNER"
    banner_line "Log: $LOG"
    echo "============================================================"
  } >> "$PROGRESS_LOG"

  # ---- DURABLE CLEAN RESUME (zero manual edits) ----
  # bd-state first, git-log fallback. A completed epic is skipped cleanly.
  if bead_is_closed "$EPIC_ID"; then
    banner_line "✓ bead $EPIC_ID already CLOSED — already done, skipping"
    EPIC_OUTCOME[$i]="SKIPPED (bead closed)"
    EPIC_BEAD[$i]="✓"
    continue
  fi
  IDEMPOTENT_MATCH="$(git log "$BASE_BRANCH..HEAD" --oneline 2>/dev/null | grep -c "$EPIC_NAME" || true)"
  if [ "${VERBOSE}" = "1" ]; then
    banner_line "DEBUG idempotency: EPIC_NAME='$EPIC_NAME' BASE_BRANCH='$BASE_BRANCH' MATCH_COUNT=$IDEMPOTENT_MATCH"
  fi
  if [ "$IDEMPOTENT_MATCH" -gt 0 ]; then
    banner_line "✓ commit referencing '$EPIC_NAME' already on branch — already done, skipping"
    if ! bead_is_closed "$EPIC_ID"; then
      bd close "$EPIC_ID" >/dev/null 2>&1 && banner_line "  (closed lingering open bead $EPIC_ID)"
    fi
    EPIC_OUTCOME[$i]="SKIPPED (commit present)"
    EPIC_BEAD[$i]="✓"
    continue
  fi

  EPIC_START_TIME=$(date +%s)
  PRE_HEAD="$(git rev-parse HEAD)"

  NOCOMMIT_NOTE=""
  if [ "$EPIC_NUM" -eq "$VERIFY_EPIC_INDEX" ]; then
    NOCOMMIT_NOTE=" This is the verification epic: a commit is OPTIONAL — if there is genuinely no diff (e.g. a clean re-run) you may exit without committing. The driver runs the full verification suite for you after this iteration."
  fi

  read -r -d '' PROMPT <<EOF || true
You are one iteration of a Ralph loop implementing $PHASE_LABEL.

Branch (stay here, do NOT switch):   $BRANCH
Spec (read first, source of truth):  $SPEC_DOC
This iteration epic:                 $EPIC_ID ($EPIC_NAME)

CONTEXT TO LOAD FIRST
1. Read CLAUDE.md (root) — note the task-tracker (bd/beads) block + Critical
   rules.
2. Read the spec at $SPEC_DOC end-to-end. Its Locked decisions, File
   structure, Public APIs, Architecture-by-concern, and Per-epic
   specifications are durable — do not re-decide them.
3. Run: bd show $EPIC_ID — its description IS the work specification for this
   iteration (CONTEXT TO LOAD FIRST, WHAT TO DO with the EXACT commit message,
   ACCEPTANCE CRITERIA, HARD RULES). Read every line. Also read its subtasks
   and CLOSE EACH SUBTASK as you complete it (the DRIVER closes this epic's
   bead after your commit — you only close subtasks).

EXECUTION
1. Do everything in the bd description's WHAT TO DO, in order. No scope
   expansion. No "while I'm here" cleanups in unrelated files.
2. Write tests where the bd issue calls for them, but do NOT run the project's
   test suite — the DRIVER runs the gates after you commit, so you don't burn
   tokens on test output. Quick local sanity checks (compile a single file,
   read back a diff) are fine.
3. Stage the epic's files and commit ONCE with the EXACT message specified in
   the bd issue's WHAT TO DO step.$NOCOMMIT_NOTE
4. Exit.

HARD RULES
- Stay on branch $BRANCH. Never git checkout another branch. Never git push.
  Never open a PR.
- Never git commit --amend or git reset --hard. If something goes wrong, stop
  and fail loudly (exit non-zero) — the loop halts for a human.
- Do not modify $SPEC_DOC or other frozen specs. EXCEPTION: the verification
  epic MAY append a "Verification report" section to $SPEC_DOC.
- Do not read or write any .env* files. They contain secrets.
- Do not use TodoWrite or TaskCreate. This project uses bd for task tracking.
- Obey every HARD RULE in the bd issue (project conventions, module
  boundaries, no new dependencies, etc.) — they are copied from CLAUDE.md.
EOF

  banner_line "Invoking claude (this can take several minutes per epic)"

  # Capture the stream-json result event's usage/model line for this epic.
  RESULT_JSON="$LOG.result.json"
  : > "$RESULT_JSON"

  set +e
  "$CLAUDE_BIN" "${CLAUDE_EXTRA_ARGS[@]}" --print "$PROMPT" 2>&1 \
    | tee "$LOG" \
    | jq --unbuffered -rc '
        def short(s): (s | tostring | gsub("\n"; " ") | .[0:140]);
        if .type == "assistant" then
          (.message.content[]? |
            if .type == "text" then
              "… " + short(.text)
            elif .type == "tool_use" then
              "→ \(.name): " + short(
                .input.file_path // .input.command // .input.pattern //
                .input.path // .input.query // (.input | tostring)
              )
            else empty end)
        elif .type == "result" then
          # Stash the full result line for token/cost/model extraction, then
          # emit ONE terse done marker to the live stream (no token spam).
          (. as $r | ($r | tostring) | stderr | empty),
          "✓ claude done (turn finished)"
        else empty end
      ' 2>"$RESULT_JSON" \
    | prefix_stream "$EPIC_NUM" \
    | tee -a "$PROGRESS_LOG"
  CLAUDE_EXIT="${PIPESTATUS[0]}"
  set -e

  # Extract tokens / model / cost from the captured result line.
  if [ -s "$RESULT_JSON" ]; then
    RLINE="$(grep -a '"type":"result"' "$RESULT_JSON" | tail -1 || true)"
    if [ -n "$RLINE" ]; then
      EPIC_TOK_IN[$i]="$(printf '%s' "$RLINE"  | jq -r '((.usage.input_tokens // 0) + (.usage.cache_read_input_tokens // 0) + (.usage.cache_creation_input_tokens // 0))' 2>/dev/null || echo 0)"
      EPIC_TOK_OUT[$i]="$(printf '%s' "$RLINE" | jq -r '(.usage.output_tokens // 0)' 2>/dev/null || echo 0)"
      EPIC_TOK_IN_RAW="$(printf '%s' "$RLINE"  | jq -r '(.usage.input_tokens // 0)' 2>/dev/null || echo 0)"
      EPIC_TOK_CACHE="$(printf '%s' "$RLINE"   | jq -r '((.usage.cache_read_input_tokens // 0) + (.usage.cache_creation_input_tokens // 0))' 2>/dev/null || echo 0)"
      EPIC_HARNESS_COST="$(printf '%s' "$RLINE" | jq -r '(.total_cost_usd // empty)' 2>/dev/null || true)"
      EPIC_MODEL_USED="$(printf '%s' "$RLINE"  | jq -r '((.modelUsage // .model // {}) | keys[0]) // empty' 2>/dev/null || true)"
    fi
  fi
  [ -z "${EPIC_MODEL_USED:-}" ] && EPIC_MODEL_USED="$CLAUDE_MODEL"

  # Est. cost: config COST_PER_MTOK_* wins; else fall back to the harness's
  # own total_cost_usd if present; else n/a.
  if [ -n "${COST_PER_MTOK_IN:-}" ] && [ -n "${COST_PER_MTOK_OUT:-}" ]; then
    EPIC_COST[$i]="$(awk -v ti="${EPIC_TOK_IN[$i]}" -v to="${EPIC_TOK_OUT[$i]}" -v ci="$COST_PER_MTOK_IN" -v co="$COST_PER_MTOK_OUT" 'BEGIN{printf "$%.4f", ti/1000000*ci + to/1000000*co}')"
  elif [ -n "${EPIC_HARNESS_COST:-}" ]; then
    EPIC_COST[$i]="$(awk -v c="$EPIC_HARNESS_COST" 'BEGIN{printf "$%.4f", c}')"
  else
    EPIC_COST[$i]="n/a"
  fi

  EPIC_END_TIME=$(date +%s)
  EPIC_ELAPSED=$((EPIC_END_TIME - EPIC_START_TIME))
  EPIC_ELAPSED_SECS[$i]="$EPIC_ELAPSED"

  if [ "$CLAUDE_EXIT" -ne 0 ]; then
    banner_line "ERROR: claude exited $CLAUDE_EXIT for epic $EPIC_NAME. Halting."
    banner_line "Full log: $LOG"
    EPIC_OUTCOME[$i]="FAILED (claude exit $CLAUDE_EXIT)"
    exit 1
  fi

  # ---- COMMIT ASSERTION ----
  POST_HEAD="$(git rev-parse HEAD)"
  if [ "$PRE_HEAD" = "$POST_HEAD" ]; then
    if [ "$EPIC_NUM" -eq "$VERIFY_EPIC_INDEX" ]; then
      banner_line "No commit made — accepted (verification epic, no-op allowed on re-run)"
      EPIC_OUTCOME[$i]="OK (no commit — verify re-run)"
    else
      banner_line "ERROR: no commit was made for epic $EPIC_NAME. Halting."
      EPIC_OUTCOME[$i]="FAILED (no commit)"
      exit 1
    fi
  else
    if ! git log "$PRE_HEAD..HEAD" --pretty=%B | grep -q "$EPIC_NAME"; then
      banner_line "ERROR: commit for '$EPIC_NAME' not found in new commits. Halting."
      git log "$PRE_HEAD..HEAD" --oneline
      EPIC_OUTCOME[$i]="FAILED (commit msg mismatch)"
      exit 1
    fi
    EPIC_COMMIT_SHA[$i]="$(git rev-parse --short HEAD)"
    EPIC_DIFFSTAT[$i]="$(git diff --shortstat "$PRE_HEAD" HEAD 2>/dev/null | sed 's/^ //')"
    EPIC_OUTCOME[$i]="OK"
  fi

  # ---- GATES (driver-run, in bash, after the commit assertion) ----
  run_gate "lean" "$LOG" "$LEAN_GATE"
  if [ "$EPIC_NUM" -eq "$VERIFY_EPIC_INDEX" ]; then
    run_gate "verify" "$LOG" "$VERIFY_GATE"
  fi

  # ---- DRIVER-LEVEL BEAD CLOSE (guaranteed; guard if already closed) ----
  if bead_is_closed "$EPIC_ID"; then
    EPIC_BEAD[$i]="✓"
  elif bd close "$EPIC_ID" >/dev/null 2>&1; then
    banner_line "Closed bead $EPIC_ID"
    EPIC_BEAD[$i]="✓"
  else
    banner_line "WARN: could not close bead $EPIC_ID (bd close failed). Continuing."
    EPIC_BEAD[$i]="✗"
  fi

  # ---- ACCUMULATE TOTALS ----
  TOTAL_TOK_IN=$((TOTAL_TOK_IN + ${EPIC_TOK_IN[$i]:-0}))
  TOTAL_TOK_OUT=$((TOTAL_TOK_OUT + ${EPIC_TOK_OUT[$i]:-0}))
  if [ -n "${COST_PER_MTOK_IN:-}" ] && [ -n "${COST_PER_MTOK_OUT:-}" ]; then
    TOTAL_COST="$(awk -v acc="$TOTAL_COST" -v c="${EPIC_COST[$i]#\$}" 'BEGIN{printf "%.4f", acc + c}')"
  elif [ -n "${EPIC_HARNESS_COST:-}" ]; then
    TOTAL_COST="$(awk -v acc="$TOTAL_COST" -v c="$EPIC_HARNESS_COST" 'BEGIN{printf "%.4f", acc + c}')"
  fi

  # ---- PER-EPIC SUMMARY ----
  {
    echo ""
    echo "─── Epic $((EPIC_NUM + 1)) summary ───"
    printf "  Outcome:     %s\n" "${EPIC_OUTCOME[$i]}"
    printf "  Model:       %s (effort=%s)\n" "$EPIC_MODEL_USED" "$CLAUDE_EFFORT"
    printf "  Tokens:      in %s (cache %s) / out %s\n" "${EPIC_TOK_IN_RAW:-?}" "${EPIC_TOK_CACHE:-0}" "${EPIC_TOK_OUT[$i]}"
    printf "  Est. cost:   %s\n" "${EPIC_COST[$i]}"
    printf "  Duration:    %s   Elapsed: +%s\n" "$(fmt_duration "$EPIC_ELAPSED")" "$(cum_time)"
    if [ "${EPIC_COMMIT_SHA[$i]}" != "(none)" ]; then
      printf "  Commit:      %s — %s\n" "${EPIC_COMMIT_SHA[$i]}" "$(git log -1 --pretty=%s 2>/dev/null)"
      printf "               %s\n" "${EPIC_DIFFSTAT[$i]}"
    else
      printf "  Commit:      none\n"
    fi
    printf "  Bead:        %s (closed %s)\n" "$EPIC_ID" "${EPIC_BEAD[$i]}"
    echo ""
  } | tee -a "$PROGRESS_LOG"

  # Reset per-iteration scratch so a later skip can't reuse stale values.
  unset EPIC_TOK_IN_RAW EPIC_TOK_CACHE EPIC_HARNESS_COST EPIC_MODEL_USED

done

# ---------- FINAL SUMMARY ----------

TOTAL_ELAPSED=$(($(date +%s) - SCRIPT_START))
if [ -n "${COST_PER_MTOK_IN:-}" ] && [ -n "${COST_PER_MTOK_OUT:-}" ] || [ "$TOTAL_COST" != "0" ]; then
  TOTAL_COST_DISPLAY="\$$TOTAL_COST"
else
  TOTAL_COST_DISPLAY="n/a"
fi

{
  echo ""
  echo "============================================================"
  printf "All %d epics complete on branch %s in %s\n" "$TOTAL_EPICS" "$BRANCH" "$(fmt_duration "$TOTAL_ELAPSED")"
  echo "============================================================"
  echo ""
  printf "%-4s  %-9s  %-24s  %10s  %10s  %-9s  %s\n" "Idx" "Duration" "Outcome" "TokIn" "TokOut" "Cost" "Commit / diff"
  printf "%-4s  %-9s  %-24s  %10s  %10s  %-9s  %s\n" "---" "--------" "-------" "-----" "------" "----" "-------------"
  for i in "${!EPICS[@]}"; do
    EPIC_NM="${EPICS[$i]#*|}"; EPIC_NM="${EPIC_NM%%|*}"
    printf "%-4s  %-9s  %-24s  %10s  %10s  %-9s  %s %s\n" \
      "E$((i+1))" \
      "$(fmt_duration "${EPIC_ELAPSED_SECS[$i]:-0}")" \
      "${EPIC_OUTCOME[$i]:-?}" \
      "${EPIC_TOK_IN[$i]:-0}" \
      "${EPIC_TOK_OUT[$i]:-0}" \
      "${EPIC_COST[$i]:-n/a}" \
      "${EPIC_COMMIT_SHA[$i]:-?}" \
      "${EPIC_DIFFSTAT[$i]:-}"
  done
  echo ""
  printf "Total wall-clock: %s\n" "$(fmt_duration "$TOTAL_ELAPSED")"
  printf "Total tokens:     in %s / out %s\n" "$TOTAL_TOK_IN" "$TOTAL_TOK_OUT"
  printf "Total est. cost:  %s\n" "$TOTAL_COST_DISPLAY"
  echo ""
  echo "Branch commits:"
  git log "$BASE_BRANCH..HEAD" --oneline
  echo ""
  echo "Next steps:"
  echo "  1. Review the full diff:  git diff $BASE_BRANCH..HEAD"
  echo "  2. Walk the manual verification checklist in $SPEC_DOC."
  echo "  3. Merge $BRANCH when satisfied."
} | tee -a "$PROGRESS_LOG"
