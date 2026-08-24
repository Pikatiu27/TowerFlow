# TowerFlow Phase 3B Axial Tension Verification

## 1. Status

**Status:** `VERIFICATION ONLY / INDEPENDENT ENGINEERING REVIEW PENDING`

This package implements the first bounded CM-3 resistance slice. It is not
connected to the web interface, does not close `CM3-06`, and has no design or
construction release authority.

Source basis: [AS 4100:2020 Steel structures](https://store.standards.org.au/product/as-4100-2020),
incorporating Amendment No. 1. The controlled source remains outside the public
repository. The scoped rule pointers are Table 3.4 and Clauses 7.1, 7.2 and
7.3.1.

## 2. Implemented scope

The calculation accepts only:

- positive axial tension demand from a named result set and combination;
- a single-component member under axial action only;
- reviewed or synthetic-verification gross and net areas;
- reviewed or synthetic-verification yield and tensile strengths;
- a connection basis that confirms uniform force distribution; and
- a fixed force-distribution factor of `1.0` for that reviewed connection basis.

The net area is an upstream input. TowerFlow does not calculate fastener-hole or
other deductions in this slice.

## 3. Calculation chain

With stress in `MPa`, area in `mm2` and force in `kN`:

```text
gross nominal capacity = gross area * yield stress * 0.001
net nominal capacity   = 0.85 * kt * net area * tensile strength * 0.001
nominal capacity       = min(gross nominal capacity, net nominal capacity)
design capacity        = 0.90 * nominal capacity
utilisation            = positive axial demand / design capacity
```

Nominal and design capacity are stored separately. A demand comparison does not
remove the `REVIEW_REQUIRED` status.

## 4. Verification cases

| Case | Purpose | Gross nominal | Net nominal | Design capacity | Utilisation | Governing result |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| `TENSION-T01` | Gross-section control | `300.000 kN` | `344.250 kN` | `270.000 kN` | `0.500000` | Gross-section yield |
| `TENSION-T02` | Net-section control and equality boundary | `350.000 kN` | `267.750 kN` | `240.975 kN` | `1.000000` | Net-section fracture |
| `TENSION-T03` | Demand exceeds verification-only capacity | `300.000 kN` | `344.250 kN` | `270.000 kN` | `1.111111` | Gross-section yield |

The verifier also rejects:

- non-uniform force distribution;
- an unconfirmed uniform-distribution condition;
- net area greater than gross area;
- compression demand;
- nonzero bending demand; and
- project-review mode with synthetic or unreviewed evidence.

It additionally verifies that the result can populate
`CM3-MEMBER-SCREENING-001` version `0.4.0-draft` without losing demand, result
hash, section/material provenance, connection basis, governing limit state or
utilisation identity.

## 5. Explicit exclusions

- non-uniform, eccentric or partial connection force distribution;
- connection geometry and hole-deduction calculation;
- threaded rods, built-up members, multi-component members and pin connections;
- compression, bending, shear or combined-action resistance;
- bolt, weld, connection, mount or local tower capacity;
- fatigue, fracture mechanics and final design certification; and
- any web utilisation view or project release decision.

## 6. Verification command

```powershell
py -3 analysis\verify_phase3b_tension_t01_t03.py
```

The implementation remains blocked by independent engineering review, an
independent benchmark, approved project section/material/net-area records and a
released Phase 3A demand package.
