# TowerFlow Phase 2 Calculation Reference

## Status

This document records the calculation formulations, assumptions, verification checks, and external references used by the TowerFlow Phase 2 parametric analysis MVP.

The implemented analysis is a linear elastic, pin-jointed 3D truss calculation with simplified static nodal loading. It is not an AS/NZS 1170.2 wind action calculation, an AS 4100 member capacity assessment, or a design certificate.

## Implemented Formulations

### Simplified Wind Pressure

The adapter uses the internal Phase 2 pressure proxy:

```text
q = 0.000613 V^2
```

where:

- `q` is pressure in `kPa`.
- `V` is the user-entered design wind speed in `m/s`.
- `0.000613` is an internal fixed coefficient equivalent to `0.5 * 1.226 / 1000`.

This is a workflow-validation assumption. It does not include regional wind speed, direction multiplier, terrain/height multiplier, shielding, topography, aerodynamic shape factor, dynamic response, or other AS/NZS 1170.2 procedures.

### Tower Body Wind Loads

The seed tower nodal wind loads are scaled from the 45 m/s baseline:

```text
F_tower = F_seed (V / 45)^2
```

The scaled horizontal force is resolved into global components for each requested direction `theta`:

```text
Fx = F_tower cos(theta)
Fy = F_tower sin(theta)
Fz = 0
```

### Equipment Loads

Equipment wind force is:

```text
F_equipment = q A_projected
```

Equipment self-weight is:

```text
W = m g / 1000
g = 9.80665 m/s2
```

The standard acceleration due to gravity value follows the BIPM SI Brochure. Wind force is resolved into global `Fx` and `Fy`; self-weight acts in global `-Z`.

### Structural Analysis

The solver uses a custom direct-stiffness implementation with:

- Three translational degrees of freedom per node: `Ux`, `Uy`, and `Uz`.
- Two-node, pin-jointed axial truss members.
- Linear elastic material response.
- Small-displacement geometry.
- Member axial-force sign convention: positive tension, negative compression.
- Prescribed translational base restraints.
- Custom Gaussian elimination for the reduced linear system.

For each member, the global element stiffness is assembled from `AE/L` and the member direction cosines. The reduced system is solved as:

```text
Kff Uf = Ff
```

Support reactions are recovered from:

```text
R = K U - F
```

Frame3DD and OpenSees truss documentation are method references only. TowerFlow does not execute or incorporate either solver.

### Numerical Checks and Envelope

Each result set reports:

```text
equilibrium residual = sum(applied nodal loads) + sum(support reactions)
```

The direction envelope takes absolute extrema across all solved wind directions while retaining the signed force/reaction and governing result-set identifier.

## Verification Chain

| Check | Implementation | Purpose |
| --- | --- | --- |
| Input validation | `analysis/validate_phase2_input.py` | Enforces the Phase 2 input contract and parameter limits. |
| Result verification | `analysis/verify_phase2_result.py` | Checks result structure, global force equilibrium, and recomputed envelope values. |
| Hand cases | `analysis/verify_hand_cases.py` | Checks small determinate/benchmark truss cases and sign conventions. |
| Viewer data generation | `analysis/solve_phase2_input.py` | Generates the published eight-direction result JSON. |
| Local solve API | `analysis/serve_phase2.py` | Validates and solves submitted input without overwriting the published JSON. |

## Reference Register

| ID | Reference | Role | Phase 2 status |
| --- | --- | --- | --- |
| G1 | `docs/demo-tower-reference.md`; local `FEC Type AA - Lattice Tower Audit Sheets.pdf` | Geometry seed and dimensional provenance | Implemented as an idealised demo geometry; not a certified manufacturer model |
| M1 | This calculation reference and the local analysis scripts | Implemented equations, solver assumptions, equilibrium, and envelope definitions | Implemented |
| M2 | [Frame3DD project and documentation](https://frame3dd.sourceforge.net/) | Independent direct-stiffness frame/truss method reference | Reference only; no code/runtime dependency |
| M3 | [OpenSees truss element](https://opensees.github.io/OpenSeesDocumentation/user/manual/model/elements/Truss.html) | Independent truss-element scope and axial-response reference | Reference only; no code/runtime dependency |
| U1 | [Dlubal RFEM 6 Nodal Loads](https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000267) | Load case, coordinate system, direction, components, and graphical display conventions | UI/data convention reference only |
| U2 | [Dlubal RFEM 6 Nodal Supports](https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000006) | Translational and rotational restraint presentation | UI/data convention reference only |
| U3 | [Dlubal RFEM 6 Coordinate Systems](https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000124) | Global and user-defined coordinate-system presentation | UI/data convention reference only |
| U4 | [Dlubal RFEM 6 Graphics Control](https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000020) | Separation of model, loads, results, and display state | UI workflow reference only |
| P1 | [BIPM SI Brochure, 9th edition](https://www.bipm.org/documents/d/guest/si-brochure-9-en-pdf) | SI units and standard acceleration due to gravity | Applied to equipment self-weight conversion |
| S1 | [AS/NZS 1170.2:2021, Structural design actions, Part 2: Wind actions](https://store.standards.org.au/product/as-nzs-1170-2-2021) | Governing wind-action procedure | Preliminary Sections 2-4 speed-chain adapter implemented with manual exposure inputs; Appendix C actions remain outside the Phase 2 solve |
| S2 | [AS 4100:2020, Steel structures](https://store.standards.org.au/product/as-4100-2020) | Governing future steel member capacity procedure | Not implemented in Phase 2 |

## Engineering Use Boundary

Phase 2 results are suitable for software workflow development, visual review, data-contract testing, and solver verification. Project approval, structural adequacy, strengthening decisions, or certification require project-specific geometry, materials, loading, applicable standards, design combinations, member capacity checks, connection checks, foundation checks, and review by an appropriately qualified engineer.
