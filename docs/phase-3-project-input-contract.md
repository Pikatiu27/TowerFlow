# Phase 3A Project Input Contract

## Purpose

`schemas/phase-3-project-input.schema.json` defines the self-contained input
package accepted by the gated Phase 3A mapped-action review endpoint.
`schemas/phase-3-project-input-preflight-report.schema.json` separately defines
the versioned intake audit report. The package keeps the design basis, tower
action geometry, Terrain Evidence Pack, Topography Evidence Pack and review
acceptance in one hashed API payload.

The contract makes project-input processing possible. It does not make the
public demonstration data project-approved and it never grants engineering
release authority.

## Input states

| `inputStatus` | Required acceptance | Intended use |
| --- | --- | --- |
| `synthetic_verification_only` | `fixture_verified` / `synthetic_fixture` | Deterministic public verification fixture |
| `project_review` | `reviewed_for_analysis` / `project_input` | Engineer-reviewed project-input package submitted for analysis review |

`acceptance.releaseAuthority` is always `false`. Calculation output remains
`REVIEW_REQUIRED` until the independent Phase 3A release gates are closed.

## Required package

The package contains:

- stable project-input ID, schema version, input status and fixed accepted
  model ID;
- identified reviewer, review date and the evidence IDs covered by acceptance;
- one or more identified action scenarios. `WIND-M01` carries tower-body W
  actions, `WIND-M02` carries an inside-tower ancillary plus `1.2G + W`, and
  `WIND-M03` additionally carries a reviewed rigid-transfer mount contract;
- complete wind case with design basis, site, tower sections, dynamic screen
  and coefficient records;
- complete eight-direction Terrain and Topography Evidence Packs.

The POST body is self-contained. Evidence file references are provenance text;
the server does not open paths supplied in the request.

## Processing sequence

```text
Phase 3A review request
    -> project-input schema and cross-record identity checks
    -> reviewed evidence and WIND-01 to WIND-10 gates
    -> AS/NZS 1170.2 wind-speed and Appendix C tower actions
    -> selected WIND-M01 / WIND-M02 / WIND-M03 action mapping
    -> source G/W cases and, where applicable, 1.2G + W combination
    -> CM-1 eight-direction structural solve
    -> result, source and Drawing identity hashes
    -> REVIEW_REQUIRED output
```

The default Phase 2 `/api/solve` endpoint is not changed.

## Browser intake

The gated `phase3-review=1` workspace accepts either a standalone project-input
package or a complete Phase 3A review request JSON. The browser performs a
concise preflight of package identity, acceptance state, supported model,
action-scenario availability and eight-direction terrain/topography coverage.
It then builds the scenario register directly from the imported package.

Browser preflight is not schema acceptance. `POST /api/solve-phase3-review`
remains authoritative and repeats the complete schema, cross-record, evidence,
mapping and release-boundary validation before analysis. Imported files remain
in browser memory and file references inside the package are never opened.

Before browser import, preflight a standalone package or complete review request
from the repository root:

```powershell
py -3 analysis\validate_phase3_project_input.py path\to\project-input.json
```

Use `--json` for a machine-readable report. The command reports package and
acceptance identity, scenario count, eight-direction terrain/topography coverage
and the fixed `releaseAuthority` state. `PREFLIGHT_READY` means the package is
structurally admissible for the review endpoint; it does not grant calculation
or release authority. Invalid or unreadable input returns exit code `1` and a
fail-closed error list.

Use strict mode for real project intake:

```powershell
py -3 analysis\validate_phase3_project_input.py path\to\project-input.json `
  --require-project-review `
  --output path\to\project-input.preflight.json
```

Strict mode rejects `synthetic_verification_only` and requires
`project_review`, `reviewed_for_analysis` and `project_input` acceptance. The
JSON audit report records canonical hashes for the submitted document and
nested Project Input, request and selected-scenario identity, all scenario IDs,
accepted evidence IDs, and the exact terrain/topography source-direction lists.
It records the hash basis and a canonical SHA-256 of every report field except
`reportSha256`. The report is written atomically and the CLI refuses to
overwrite its input.

Verify a saved report against the current input:

```powershell
py -3 analysis\validate_phase3_project_input.py path\to\project-input.json `
  --verify-report path\to\project-input.preflight.json
```

Verification checks the report version, payload hash and a fresh deterministic
preflight of the current input. A verified report may still record `BLOCKED`;
`REPORT_VERIFIED` is an integrity and current-input parity statement, not an
acceptance or calculation result. These controls improve traceability only;
`releaseAuthority` remains `false`.

## Fail-closed conditions

The request is rejected before analysis when any of the following occurs:

- project-input, wind-case or model identities disagree;
- input and acceptance states are incompatible;
- acceptance omits a design-basis, evidence-pack, dynamic or coefficient ID;
- the selected action-scenario ID is absent from the accepted project package;
- ancillary geometry, status or evidence is incomplete;
- an inside-tower ancillary lies outside its declared triangular transfer area;
- an external ancillary lacks three reviewed interfaces, all six transferred
  resultants or explicit `capacityCheckStatus: not_performed` disclosure;
- terrain or topography records are incomplete or not reviewed;
- a `project_review` package lacks identified reviewed-for-analysis acceptance;
- any existing wind release gate returns `REVIEW REQUIRED`.

Drawing review also blocks if the project-input ID, status, acceptance hash,
action-scenario ID, W source case or active combination does not match the
active structural result.

## Verification

```powershell
py -3 analysis\build_phase3_review_request_demo.py --check
py -3 analysis\validate_phase3_project_input.py examples\phase3-review-request-demo.json
py -3 analysis\verify_phase3_project_input.py
py -3 analysis\verify_phase3_review_endpoint.py
py -3 analysis\verify_phase3_drawing_identity.py
```

The generated public fixture remains synthetic. Approved Region, terrain,
topography, tower geometry, ancillary and mount-interface records must be
supplied and independently reviewed for a real project.
