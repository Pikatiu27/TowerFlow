# Phase 3A Closeout Submission Admission

## Purpose

`analysis/validate_phase3a_closeout_submission.py` is the single fail-closed
admission command for a completed Phase 3A external-review submission. It joins
the existing strict Project Input preflight, independent rule-review validation
and API/3D/results/Drawing cross-surface acceptance checks.

The command does not approve a project. `READY_FOR_RELEASE_DECISION` means the
submitted records are structurally complete, internally consistent and ready
for a separately controlled engineering release decision. Every report retains
`releaseAuthority: false`.

## Required Inputs

1. A complete `0.5.0-review` request containing a `project_review` Project Input.
2. The reproduced Phase 3A API result for that request.
3. The browser cross-surface snapshot for the active result set.
4. A completed `P3A-RULE-REVIEW-001` independent engineering review.

## Command

```powershell
py -3 analysis\validate_phase3a_closeout_submission.py `
  path\to\phase3-review-request.json `
  path\to\phase3-result.json `
  path\to\phase3-browser-snapshot.json `
  path\to\completed-phase3a-rule-review.json `
  --output path\to\phase3a-closeout-admission.json
```

The report contains eight checks: strict Project Input admission followed by
the seven existing cross-surface acceptance checks. Input and subordinate
report hashes bind the decision package without copying licensed Standards or
granting calculation, design, construction or release authority.

## Status Boundary

- `BLOCKED`: one or more required records, reviews or identities failed.
- `READY_FOR_RELEASE_DECISION`: all admission checks passed; a separate
  authorised engineering decision is still required.

Synthetic fixtures, blank review templates, stale solver results, detached
browser surfaces and incomplete evidence remain blocked.
