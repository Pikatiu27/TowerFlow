# TowerFlow Phase 3B Member Evidence Package

## 1. Status

**Status:** `INPUT EVIDENCE CONTRACT / RESISTANCE NOT EVALUATED`

This package separates project member properties from demand and resistance
results. It supports the evidence boundaries for `CM3-03`, `CM3-04` and
`CM3-05`; it does not close those gates by itself and does not calculate a
member capacity or utilisation.

## 2. Data ownership

The package owns:

- member-to-section, member-to-material and member-to-stability assignments;
- gross and optional net area, local-axis radii of gyration and their sources;
- yield and optional tensile strength and their material source;
- explicit effective length for local `y` and local `z`;
- one overall stability source plus one basis record per local axis; and
- synthetic-fixture or reviewed-project evidence status.

It does not own load cases, combinations, member actions, AS 4100 resistance
rules, connection capacity, utilisation or release authority.

## 3. Validation rules

- Assignment, section, material and stability IDs are unique and resolvable.
- Unreferenced definitions are rejected.
- A compression screening mode requires a registered stability definition.
- A tension screening mode requires net area, net-area provenance and tensile
  strength.
- Net area cannot exceed gross area, and tensile strength cannot be below yield
  stress.
- Package, acceptance and every source status must agree on synthetic or
  project-review mode.
- Acceptance evidence IDs must cover section, net-area, material, stability and
  both local-axis effective-length source records.
- Filesystem paths and path traversal are not valid evidence IDs.

## 4. Downstream mapping

For a registered compression member, the adapter combines this package with a
separate signed demand identity and produces the existing compression-input
preflight request. The demand model ID must equal the package model ID. The
adapter hashes canonical JSON using sorted keys, compact separators, ASCII
escaping and UTF-8 encoding,
then retains package ID, model ID and SHA-256 through the preflight and blocked
CM-3 member check. The preflight derives `Le/L` and geometric `Le/r`. No stage
populates compression resistance or utilisation.

## 5. Public fixture

`examples/phase3b-member-evidence-demo.json` contains two synthetic member
assignments sharing one section and one material. One member is registered for
tension and compression and has an explicit two-axis stability definition; the
other is tension-only. Values are synthetic verification data, not project
properties.

## 6. Verification

```powershell
py -3 analysis\build_phase3b_member_evidence_demo.py --check
py -3 analysis\validate_phase3b_member_evidence.py examples\phase3b-member-evidence-demo.json
py -3 analysis\verify_phase3b_member_evidence.py
```
