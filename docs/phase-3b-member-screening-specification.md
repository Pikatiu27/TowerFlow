# TowerFlow Phase 3B Member Screening Specification

## 1. Status and authority

**Status:** `SPECIFICATION / FAIL-CLOSED CONTRACT`

This document defines the CM-3 data boundary for first-pass steel-member
screening. The contract itself does not define AS 4100 resistance rules or
provide design certification. Separate bounded tension and CHS compression
implementations exercise the contract with verification-only values. The public
fixture remains fail-closed until reviewed rule extraction, released Phase 3A
actions, approved project member data and independent benchmarks are available.

The project-controlled source has been inspected, while its path, binary
fingerprint and licence metadata remain outside the public repository.
The blank public form of `P3B-RULE-REVIEW-001` records only the publication
basis and review workflow; its rule-extraction status remains `not_started`, and
no reviewer decision has been recorded. Separate bounded rule files remain
`extracted-independent-review-pending`. Source possession and local extraction
are therefore not calculation authority.

Public catalogue reference: [AS 4100:2020 Steel structures](https://store.standards.org.au/product/as-4100-2020).

The governed machine-readable contract is:

```text
schemas/phase-3b-member-screening.schema.json
```

The public example is deliberately blocked:

```text
examples/phase3b-member-screening-contract-demo.json
```

Source control and the blank independent-review intake are documented in
`docs/phase-3b-rule-review-handoff.md`.

The bounded axial-tension slice in
`docs/phase-3b-tension-verification.md` is now implemented for synthetic
verification. It covers only Table 3.4 and Clauses 7.1, 7.2 and 7.3.1 with a
reviewed uniform force-distribution basis. Independent review remains pending;
the calculation is not connected to the web interface and does not close
`CM3-06`.

The standard-neutral compression-input preflight in
`docs/phase-3b-compression-readiness.md` verifies only demand identity,
two-axis effective-length evidence and geometric `Le/L` and `Le/r` arithmetic.
It produces no resistance, limit-state or utilisation value and does not close
`CM3-05` or `CM3-07`.

The bounded axial-compression slice in
`docs/phase-3b-compression-verification.md` evaluates only fully effective,
constant-section, cold-formed non-stress-relieved CHS members under concentric
axial compression. Its three synthetic cases include a rounded secondary manual
benchmark and CM-3 mapping. A separate four-case set compares production output
with an implementation-independent Decimal oracle and one August 2013 Austube
tabulated capacity. Neither regression is an independent engineering review or
trusted-software benchmark. The slice does not close `CM3-05`, `CM3-07` or
`CM3-08` and is not connected to the web interface.

The upstream package in `docs/phase-3b-member-evidence.md` now separates
member assignment and section, material and stability evidence from calculated
results. It is a fail-closed input contract for `CM3-03` to `CM3-05`, not proof
that those gates or any resistance gate are complete.

## 2. Purpose

CM-3 will connect a released axial-force demand to a reviewed positive member
resistance without changing the CM-1/Phase 2 solver. It must preserve enough
identity to reproduce every reported ratio:

- model, adapter, result-set and result hash;
- load combination and wind source/force direction;
- member, section and material records;
- signed axial demand and tension/compression state;
- effective length and slenderness basis by local principal axis;
- positive selected resistance, governing limit state and clause trace;
- blockers, review state and explicit exclusions.

## 3. Preconditions

Production member screening shall not run unless all of the following are true:

1. Phase 3A has a release-ready approved project action package.
2. The structural result hash and result-set IDs are fixed and reproducible.
3. Member connectivity, section identity and material identity match that result.
4. Section properties and material properties have reviewed source records.
5. Compression members have a reviewed effective-length basis for each checked
   local axis. TowerFlow must not silently assume an effective-length factor.
6. The applicable AS 4100 resistance rules have been extracted from a controlled
   source, independently reviewed and covered by deterministic tests.
7. The scope has been checked for members governed by another standard or by a
   connection, local, fatigue, dynamic or nonlinear limit state.

Missing evidence is a blocking condition, not a warning attached to a ratio.

## 4. Demand contract

- `axialDemandKN` is signed: positive is tension and negative is compression.
- Demand is taken from one named structural result set and load combination.
- Wind results retain the source direction and the downwind force direction as
  separate values at 45 degree intervals.
- The member demand hash must equal the source-analysis result hash.
- Demand selection and enveloping do not alter the signed stored action.

The Phase 3B adapter must not recalculate wind, remap actions, or infer a result
from viewport state.

## 5. Stability and resistance contract

- Section area and radii of gyration use reviewed section-property records.
- Tension checks additionally require reviewed gross and net areas. Net-area
  deductions are provided by an upstream controlled calculation in the current
  slice.
- Yield stress and other material inputs use reviewed material records.
- Tension checks additionally require tensile strength and the connection basis
  used to establish the force-distribution factor.
- Member length, effective length and slenderness are stored for local `y` and
  `z` axes. A compression result requires both axes and a basis record.
- Version `0.4.0-draft` distinguishes synthetic stability evidence from reviewed
  project evidence and stores an effective-length basis record for each local
  axis in addition to the overall stability source record. Each member check
  also retains its evidence source mode, package ID, model ID and package hash;
  inline synthetic checks cannot claim package identity.
- The compression-input preflight accepts only explicit effective lengths. It
  does not infer effective-length factors from analytical supports or viewport
  symbols and does not apply a code slenderness limit.
- Tension and compression design resistances are positive magnitudes.
- The selected resistance must match the signed demand state.
- A resistance record identifies its calculation record, governing limit state
  and clause references. Empty references are not accepted for a reviewed check.
- AS 4100 equations, coefficients and clause interpretations remain outside
  this contract. Bounded rule implementations are separate and cannot widen the
  contract authority before controlled review is complete.

## 6. Utilisation contract

For a reviewed resistance, the presentation ratio is the dimensionless
arithmetic mapping:

```text
utilisation = abs(signed axial demand) / positive selected design resistance
```

This formula does not define the resistance. TowerFlow shall not report a ratio
when the selected resistance is absent, zero, negative, mismatched to the force
state, or unsupported by the required stability/provenance records.

The contract retains signed demand separately from positive resistance and
positive utilisation. A future viewport may colour by utilisation only after
the calculation and cross-surface gates pass.

## 7. Release gates

| Gate | Required evidence |
| --- | --- |
| `CM3-01` | Controlled AS 4100 source and independently reviewed rule extraction |
| `CM3-02` | Released Phase 3A demand package, result-set identity and result hash |
| `CM3-03` | Member-section identity and section-property provenance |
| `CM3-04` | Material-property evidence and review |
| `CM3-05` | Effective-length and slenderness basis by checked local axis |
| `CM3-06` | Tension-resistance implementation, trace and deterministic tests |
| `CM3-07` | Compression-resistance implementation, trace and deterministic tests |
| `CM3-08` | Independent hand calculation or trusted-software benchmark |
| `CM3-09` | API, table, viewport and Drawing result identity |
| `CM3-10` | Scope disclosure, exclusions and reviewer authority |

The contract version `0.4.0-draft` always carries `releaseAuthority: false` and
`screeningStatus: REVIEW_REQUIRED`. A future production contract requires a new
schema version and an explicit release decision.

## 8. Explicit exclusions

- final design certification or regulatory approval;
- connection, bolt, weld, mount, interface or local tower capacity;
- foundation, anchor, base plate or soil capacity;
- fatigue, fracture, fire or durability assessment;
- second-order, geometric-nonlinear, material-nonlinear, buckling-eigenvalue or
  tension-only/compression-only analysis;
- frame bending or combined-action checks outside the CM-1 axial truss model;
- cold-formed member checks where another material/product standard governs;
- dynamic, crosswind or aeroelastic response.

## 9. Verification boundary

`analysis/verify_phase3b_member_screening_contract.py` verifies schema shape,
deterministic rebuilding, signed-demand state, hash binding, positive resistance,
axis stability records and utilisation arithmetic. Synthetic values used by that
test exercise only the contract; they are not AS 4100 capacities or project
results.
