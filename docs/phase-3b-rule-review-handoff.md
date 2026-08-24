# TowerFlow Phase 3B Rule Review Handoff

## 1. Status

**Status:** `SOURCE CONTROL / BLANK INTAKE TEMPLATE`

`review/phase3b-rule-review-handoff.blank.json` is the fail-closed intake for
controlling the AS 4100 source and planning independent review of future CM-3
rule data, implementation and verification.

The public handoff template contains no Standard pages, equations, coefficients,
tables or member resistance values. It does not close `CM3-01`, authorise a
capacity result, or represent the current extraction package.

The first bounded axial-tension extraction now exists separately at
`rules/as-4100-2020-amd1-section-7-tension.json`. It remains
`extracted-independent-review-pending`; its calculation and cases are documented
in `docs/phase-3b-tension-verification.md`. The blank intake remains unchanged
for an independent reviewer to begin a controlled review record.

A first bounded axial-compression extraction now also exists separately at
`rules/as-4100-2020-amd1-section-6-compression-chs.json`. It covers only a
fully effective, constant-section, cold-formed non-stress-relieved CHS under
concentric axial compression. Its three verification cases and secondary
manual benchmark are documented in
`docs/phase-3b-compression-verification.md`. It remains
`extracted-independent-review-pending`, does not close `CM3-07`, and is not
added to the blank public intake as an accepted rule artifact.

## 2. Controlled source boundary

The locally inspected source identifies the following public publication basis:

| Field | Controlled value |
| --- | --- |
| Publication | `AS 4100:2020` Steel structures |
| Incorporated amendment | Amendment No. 1 (September 2021) |
| Public catalogue | [Standards Australia AS 4100:2020](https://store.standards.org.au/product/as-4100-2020) |

The licensed PDF is deliberately excluded from Git, Pages and review bundles.
Its file path, binary fingerprint, licence identity and file metadata are also
held outside the public repository. A reviewer must have authorised access to
the controlled source and record an opaque private source-control reference;
the reference must not disclose licensed-document metadata.

## 3. Public artifact set

The blank intake pins 21 UTF-8 text artifacts after LF normalisation:

1. CM-3 member-screening specification;
2. CM-3 member-screening JSON Schema;
3. blocked-fixture builder;
4. contract validator;
5. rejection-test verifier; and
6. blocked public fixture.

The additional eight artifacts define the compression-input preflight:

7. preflight boundary document;
8. result schema;
9. standard-neutral evaluator;
10. deterministic fixture builder;
11. result validator;
12. input and result rejection verifier;
13. blocked result fixture; and
14. synthetic geometry verification cases.

Seven member-evidence artifacts complete the current input boundary:

15. evidence boundary document;
16. evidence package schema;
17. downstream preflight adapter;
18. deterministic evidence builder;
19. semantic validator;
20. reference and status verifier; and
21. blocked synthetic evidence fixture.

These artifacts define the demand/resistance interface, compression-input
readiness and fail-closed behaviour. The preflight artifacts do not contain an
AS 4100 compression rule or resistance implementation.

## 4. Review items

The eight review items cover:

1. publication, amendment and binary identity;
2. scope, applicability, authority and exclusions;
3. signed demand, combination, direction and result-hash mapping;
4. member, section and material provenance;
5. effective-length and slenderness basis by local axis;
6. future tension-resistance rule extraction and deterministic cases;
7. future compression-resistance rule extraction and deterministic cases; and
8. independent benchmark, cross-surface identity and disclosure.

Source pointers are intentionally limited to publication-level and Section 6/7
headings. Detailed clause mapping belongs in a controlled future extraction
record and must be independently checked against the licensed source.

## 5. Public verification

```powershell
py -3 analysis\build_phase3b_rule_review_handoff.py --check
py -3 analysis\validate_phase3b_rule_review_handoff.py review\phase3b-rule-review-handoff.blank.json --require-blank
py -3 analysis\verify_phase3b_rule_review_handoff.py
```

An authorised local custodian verifies the exact licensed binary in the
non-public engineering record. Neither the local source path nor its fingerprint
is accepted by the public JSON contract.

## 6. Completion boundary

The blank public intake cannot become `engineering_review_complete` while
`ruleExtraction.status` is `not_started` or while no rule-data, implementation,
golden-case and verification artifacts exist. Reviewer identity fields and
accepted decisions alone are insufficient.

Any future extraction shall:

- be prepared in independently written implementation form;
- avoid publishing the licensed PDF, page images, reproduced tables or
  substantial Standard text;
- receive a licensing/copyright review before public distribution;
- include deterministic tension and compression cases plus an independent
  calculation or trusted-software benchmark; and
- retain `releaseAuthority: false` until a separate project release decision.

Completion of source/rule review does not approve Phase 3A actions, project
member data, effective-length assumptions, connections, foundations or final
design certification.
