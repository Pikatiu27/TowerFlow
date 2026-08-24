# Phase 3A Cross-Surface Acceptance

## Purpose

The cross-surface acceptance contract checks that one submitted Phase 3A
request, one saved API result and the browser's active 3D, result-table and
Drawing states all identify the same analysis result. It closes a traceability
gap; it does not perform engineering approval or grant release authority.

The controlled artifacts are:

- `schemas/phase-3-cross-surface-snapshot.schema.json` for the read-only browser
  audit payload;
- `schemas/phase-3-cross-surface-acceptance.schema.json` for the CLI report;
- `examples/phase3-cross-surface-snapshot-demo.json` for deterministic synthetic
  verification only;
- `analysis/phase3_cross_surface_acceptance.py` for fail-closed comparison.

## Browser snapshot

After a Phase 3A result is active, the page writes a non-visible JSON payload to
`#phase3-acceptance-snapshot`. It records:

- Project Input, action scenario, verification case, model and adapter identity;
- input, source and complete-result SHA-256 values;
- active result-set ID, SHA-256, source/force directions and loading identity;
- matching API, 3D viewport, results-table and Drawing surface bindings;
- Drawing contract, revision and direction-binding result-set hash.

Changing the active direction regenerates the payload. The payload is state
evidence, not a screenshot or visual-quality assertion. Desktop rendering and
canvas visibility remain separate browser acceptance checks.

## Acceptance checks

| ID | Gate |
| --- | --- |
| `P3A-AC-01` | Saved API result exactly reproduces from the submitted request |
| `P3A-AC-02` | Drawing identity and all eight direction bindings validate |
| `P3A-AC-03` | API, 3D, table and Drawing share the active result identity |
| `P3A-AC-04` | Project Input is `project_review` / `reviewed_for_analysis` |
| `P3A-AC-05` | Section 6 dynamic assessment is project-reviewed |
| `P3A-AC-06` | Eight terrain and topography directions are project-reviewed |
| `P3A-AC-07` | Independent Phase 3A rule review is complete |

Run the acceptance CLI with saved files exported from the same review session:

```powershell
py -3 analysis\phase3_cross_surface_acceptance.py `
  path\to\phase3-review-request.json `
  path\to\phase3-result.json `
  path\to\phase3-browser-snapshot.json `
  --rule-review path\to\completed-phase3a-rule-review.json `
  --output path\to\phase3-acceptance.json
```

The public synthetic fixture intentionally returns `BLOCKED`: its technical
identity checks pass, while project-input and independent-review gates remain
open. A complete project package can reach
`READY_FOR_PROJECT_RELEASE_REVIEW`, never automatic release. Every report fixes
`releaseAuthority` to `false` and includes its own canonical SHA-256.
The report states its hash basis, is written atomically and cannot overwrite any
of its request, result, snapshot or rule-review inputs.

## Random synthetic verification

`analysis/generate_phase3_synthetic_case.py` creates a reproducible random
verification package. Supply `--seed` for exact reproduction or omit it to
generate a reported random 32-bit seed. Randomization is limited to supported
non-cyclonic Region, ULS recurrence interval, site elevation/orientation,
directional Terrain Category, tower action geometry and ancillary action
parameters. Model topology, Topography geometry, evidence-register structure,
action scenarios and mount interfaces remain controlled.

The generator writes six local artifacts under the ignored `generated/`
directory: Project Input, review request, preflight, result, snapshot and
acceptance report. These are numerical robustness fixtures only. They remain
`synthetic_verification_only`, cannot satisfy `P3A-AC-04` to `P3A-AC-07`, and
must never be substituted for project evidence.

`analysis/package_phase3_closeout_bundle.py` can package the request, result,
snapshot and acceptance report with the blank Phase 3A/3B handoffs, compression
benchmark exchange, blocked CM-3 contract and review guidance. Its deterministic
manifest records every bundled file hash, all seven Phase 3A checks and all ten
pending CM-3 gates. Existing output directories, stale acceptance hashes and
detached request/result/snapshot identities are rejected. The package status is
always `BLOCKED` and its handoff status is `READY_FOR_EXTERNAL_REVIEW`; packaging
does not constitute project acceptance or independent engineering review.

## External boundary

TowerFlow cannot create the required site classification, independent review or
project approval. Those records must come from the responsible project team and
a genuinely independent structural engineer. Missing records remain explicit
blocked checks and must not be replaced with demonstration values.
