# TowerFlow Phase 3B Compression-Input Readiness

## 1. Status

**Status:** `INPUT PREFLIGHT / GENERAL COMPRESSION RESISTANCE NOT IMPLEMENTED`

This preflight checks whether a single-component axial-compression member has
the explicit two-axis geometry and evidence needed for a future resistance
calculation. The preflight itself does not evaluate an AS 4100 compression
capacity, slenderness limit, buckling curve or utilisation. A separate,
verification-only cold-formed CHS slice is documented in
`docs/phase-3b-compression-verification.md`; it does not widen this general
preflight or its release authority. Neither path is connected to the web
interface.

## 2. Accepted input

The preflight requires:

- a negative axial demand tied to a named result set, combination and result
  hash;
- zero bending and shear demand;
- gross area, yield stress and reviewed or synthetic source records;
- positive radii of gyration about local `y` and local `z`;
- a positive member length and explicit effective length for both axes; and
- a separate basis record for each effective-length value.

TowerFlow does not infer an effective-length factor from support symbols,
viewport geometry or member end labels.

## 3. Geometry audit

For each local axis, the preflight reports only:

```text
effective-length factor = explicit effective length / member length
geometric slenderness   = explicit effective length / radius of gyration
```

The unit adapter converts metres to millimetres for the second expression. The
larger geometric value is identified for data review only; it is not declared a
governing AS 4100 limit state.

## 4. Verification cases

| Case | Purpose | `Le/L` local Y / Z | `Le/r` local Y / Z | Larger geometric axis |
| --- | --- | --- | --- | --- |
| `COMPRESSION-READY-C01` | Local Z audit | `1.10 / 1.20` | `132 / 240` | `localZ` |
| `COMPRESSION-READY-C02` | Local Y audit | `1.20 / 1.00` | `250 / 100` | `localY` |

The verifier rejects a positive demand, nonzero bending, a missing axis, a
missing basis record, an inferred instead of explicit effective length, a zero
radius, a multi-component member, an invalid result hash and project mode with
unreviewed evidence. A fully reviewed project-input record still returns
`INPUTS_COMPLETE_RULE_EVALUATION_BLOCKED`.

## 5. Output boundary

Every accepted result retains:

```text
screeningStatus = REVIEW_REQUIRED
releaseAuthority = false
compressionDesignResistanceKN = null
utilisation = null
clauseReferences = []
```

`CM3-07` remains open. A bounded CHS rule extraction and deterministic cases now
exist, but independent engineering review, a separately prepared benchmark and
approved project evidence are still required.

## 6. Verification command

```powershell
py -3 analysis\build_phase3b_compression_readiness_demo.py --check
py -3 analysis\validate_phase3b_compression_readiness.py examples\phase3b-compression-readiness-demo.json
py -3 analysis\verify_phase3b_compression_readiness_c01_c02.py
```

The result fixture is governed by
`schemas/phase-3b-compression-readiness.schema.json`. The validator separately
checks demand magnitude, both geometric calculations, the reported larger axis
and mandatory blocking states that JSON Schema alone cannot reconcile.

The synthetic bridge maps this result into `CM3-MEMBER-SCREENING-001` version
`0.4.0-draft`. It preserves the result hash, signed demand, evidence source
mode, package/model identity, package hash, two-axis geometry, overall
stability source and each axis basis record while keeping resistance and
utilisation unevaluated.
