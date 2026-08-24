# Phase 3A Independent Rule Review Handoff

## Purpose

`review/phase3a-rule-review-handoff.blank.json` is the controlled blank handoff
for an independent structural engineer to review the extracted AS/NZS 1170.2
rule data, evidence controls and golden cases used by TowerFlow Phase 3A.

The handoff is fail-closed. Its public form contains no reviewer identity, no
accepted decisions and no release authority. Passing its automated validation
proves only file identity, schema integrity and workflow completeness.

## Scope

The six review items cover:

1. publication and incorporated-amendment identity;
2. Section 3 regional, directional and climate rules;
3. Section 4 terrain, shielding and topography rules and evidence controls;
4. Appendix C tower and ancillary coefficients;
5. Section 6 dynamic-sensitivity screening; and
6. independent reproduction of representative `WIND-G01` to `WIND-G08`
   arithmetic and rejection behaviour.

Nineteen repository text artifacts are pinned by relative path and SHA-256
after canonical UTF-8/LF normalisation, so checkout line endings do not change
their identity. The licensed Standard is deliberately not bundled. Its
controlled-source hash remains a raw binary SHA-256, which the reviewer must
verify against an authorised copy and record.

## Public Template Verification

```powershell
py -3 analysis\build_phase3_rule_review_handoff.py
py -3 analysis\validate_phase3_rule_review_handoff.py review\phase3a-rule-review-handoff.blank.json --require-blank
py -3 analysis\verify_phase3_rule_review_handoff.py
```

The builder is deterministic. Any changed rule, implementation, verification,
schema or governance artifact makes the stored template stale until it is
regenerated and reviewed as a new revision.

## Independent Reviewer Workflow

1. Verify that the licensed AS/NZS 1170.2 copy includes Amendment 1:2023 and
   Amendment 2:2024 and that its SHA-256 matches `controlledSource.expectedSha256`.
2. Reproduce each review item directly from the controlled Standard and an
   independent calculation, not only from the TowerFlow implementation.
3. Record `accepted` or `rejected` for every item and provide concise comments
   for departures, limitations or required corrections.
4. Complete the reviewer identity, qualification, registration, independence,
   source-hash and signed-record fields.
5. Validate the completed record with `--require-complete` outside the public
   repository and retain it in the controlled project evidence system.

The automation checks structural completeness but cannot establish that the
reviewer is genuinely independent or that the engineering decisions are
correct. Those remain accountable human decisions.

## Authority Boundary

Even a structurally complete and accepted rule review keeps
`completion.releaseAuthority` equal to `false`. Phase 3A still requires an
approved project design basis, Region, eight-direction terrain and topography,
dynamic conclusion, tower geometry, ancillary and interface data, and one
approved project-input package. Results remain `REVIEW_REQUIRED` until those
separate gates are closed.
