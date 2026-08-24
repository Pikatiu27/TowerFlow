# TowerFlow Drawing Profile v0.1

## Purpose

TowerFlow Drawing Profile v0.1 converts the useful controls from the local engineering drawing package into a narrow, versioned TowerFlow contract. It defines how a Tower General Arrangement and an Axial Force Result Summary shall identify authority, projection, revisions, result metadata, selection context, and release state.

This is a governed review contract for the public demonstration model. It does not replace the Phase 2 web solver and does not make non-public project models selectable in the public result interface.

## Standard adoption

TowerFlow adopts a governed subset of Unified Web Engineering Drawing Standard
`UWEDS-001` Version `1.7.1` under project adoption record `TF-UWEDS-001`.
The project record is `DRAFT` and its release boundary is
`PRIVATE_REVIEW_ONLY`; it is not an engineering approval.

Every controlled web sheet carries the adoption ID and an applicable
pre-drawing case review ID:

- `TF-PDCR-GA-001` for the General Arrangement sheet;
- `TF-PDCR-FEA-001` for the Load Diagram, Axial Force Result and Analysis
  Verification sheets.

The records retain source role, applicability, differences and explicitly
prohibited copying. Public or software references inform presentation only;
TowerFlow project data, calculation references and governing standards remain
the engineering authority.

## Adopted controls

The profile adopts the following controls:

- The canonical engineering model owns geometry and dimensions. Display meshes and browser transforms are representations only.
- Controlled dimensional views use orthographic projection. Perspective views are reference-only, not-to-scale, and non-dimensional.
- Every view states its engineering question, authority class, projection, scale state, display preset, and geometry revision.
- The default screen view permits no more than two simultaneous overlay families and 20 visible labels.
- Selection context remains linked across the 3D view, 2D view, and properties panel; result views also link to analysis evidence.
- Engineering status includes text and does not rely on colour alone.
- A primary result view carries quantity, component, unit, coordinate basis, result location, averaging, range mode, limits, load case, deformation scale, geometry revision, and analysis revision.
- A stale analysis-to-geometry relationship is blocking.
- Profile v0.1 records are not eligible for public issue.
- GA dimensions follow `dimension_requirement -> resolved_annotation`; model
  coordinates own the value, while deterministic A4 paper coordinates own the
  extension lines, arrows, text box, lane and collision result.

## Drawing types

### TF-GC01: Tower General Arrangement

Required controlled views:

1. General Arrangement Plan.
2. Primary Elevation.

Required dimension coverage:

- overall height;
- base extent;
- primary axes;
- levels;
- panel boundaries;
- support locations.

Required schedules identify member roles, demonstration section assignments, and drawing references. Raw finite-element nodes and unfiltered result contours are outside this drawing type.

### TF-GC02: Axial Force Result

Required controlled views:

1. Member Axial Force.
2. Deformed and Undeformed Comparison.

The result sheet does not repeat model idealisation or applied actions. Those
belong to the GA and Load Diagram sheets respectively.

### TF-GC03: Load Diagram

Required content:

1. Applied nodal actions and restraints in the controlling orthographic plane.
2. Active load case or combination definition.
3. Signed global resultants for `G`, `W` and the active case/combination.
4. Arrow display convention, coordinate basis and units.

### TF-GC04: Analysis Verification

This is a schedule-led review sheet, not a second model drawing. It records
active-case extrema, reactions, equilibrium, analysis provenance, assumptions
and exclusions without repeating tower geometry.

The golden result uses the public `fec-type-aa-full-elevation-demo` model and the `LC-WIND-090` static demonstration case. The displayed force range is tied to that public result set. The action is not an AS/NZS 1170.2 wind calculation, and the deformation comparison is not a time-history or dynamic animation.

## Blocking rules

| Rule | Blocking condition |
|---|---|
| `TF-DRW-TRUTH-001` | A controlled view is not governed by the canonical model and geometry revision. |
| `TF-FEA-RES-001` | Required result legend metadata is absent or the range/deformation scale is invalid. |
| `TF-FEA-RES-002` | Result, view, authority, or analysis geometry revisions disagree. |
| `TF-WEB-UI-003` | More than two overlay families are active or status lacks a text channel. |
| `TF-ANN-001` | A mandatory dimension has invalid semantic targets, unpinned text metrics, prohibited text collision, a detached arrow target, or placement outside the controlled view. |
| `TF-REL-001` | The document attempts public issue or enables public result switching. |

`TF-NC01` removes the result unit and load case and must fail with `TF-FEA-RES-001`. `TF-NC02` replaces the result geometry revision with a stale value and must fail with `TF-FEA-RES-002`.

## Source basis

The adopted controls are scoped from the following local Drawing package records:

- `00_UNIFIED_WEB_ENGINEERING_DRAWING_STANDARD_V1.md`;
- `02_ANNOTATION_AND_DIMENSION_LAYOUT_ENGINE_SPEC_V1.md`;
- `03_DIMENSION_AND_ANNOTATION_RULES_EXTENSION_V1.md`;
- `profiles/AU_STRUCTURAL_WEB_DEFAULT.yaml`;
- `profiles/ANNOTATION_LAYOUT_DEFAULT.yaml`;
- `profiles/SCREEN_DISPLAY_DEFAULT.yaml`;
- `recipes/structure_general_arrangement.yaml`;
- `recipes/fea_result_summary.yaml`;
- `rules/drawing_rules.yaml`;
- `rules/fea_visual_rules.yaml`;
- `rules/web_release_rules.yaml`;
- `tests/GOLDEN_CASE_REGISTER.md`;
- `tests/NEGATIVE_CASE_REGISTER.md`;
- `sources/SOURCE_TO_RULE_TRACEABILITY.md`.

The TowerFlow profile does not copy connection, bolt, weld, base-plate, fabrication, or product-specific modules from that package.

## Files

```text
profiles/towerflow-drawing-profile-v0.1.json
profiles/towerflow-annotation-layout-v0.1.json
engineering/drawing-standard-adoption.json
engineering/pre-drawing-case-reviews/TF-PDCR-GA-001.json
engineering/pre-drawing-case-reviews/TF-PDCR-FEA-001.json
schemas/towerflow-drawing-document.schema.json
examples/towerflow-drawing-tf-gc01-ga.json
examples/towerflow-drawing-tf-gc02-axial-result.json
examples/towerflow-dimension-requirements.json
verification/towerflow-drawing-contract-cases.json
analysis/validate_towerflow_drawing.py
analysis/verify_towerflow_drawing_contract.py
analysis/verify_towerflow_drawing_adoption.py
analysis/verify_towerflow_graphic_convention.py
analysis/verify_towerflow_semantic_drawing.py
analysis/verify_towerflow_annotation_layout.py
```

## Verification

```powershell
py -3 -m pip install -r requirements-dev.txt
py -3 analysis\validate_towerflow_drawing.py examples\towerflow-drawing-tf-gc01-ga.json
py -3 analysis\validate_towerflow_drawing.py examples\towerflow-drawing-tf-gc02-axial-result.json
py -3 analysis\verify_towerflow_drawing_contract.py
py -3 analysis\verify_towerflow_drawing_adoption.py
py -3 analysis\verify_towerflow_drawing_workspace.py
py -3 analysis\verify_towerflow_graphic_convention.py
py -3 analysis\verify_towerflow_drawing_validation.py
py -3 analysis\verify_towerflow_semantic_drawing.py
py -3 analysis\verify_towerflow_annotation_layout.py
py -3 analysis\verify_towerflow_ui_copy.py
```

The verifier validates both golden cases against Draft 2020-12 JSON Schema,
applies the ten registered negative-case mutations, confirms each blocking rule
and field path, and ties the examples to the current private source-model ID,
topology hash, support IDs, node/member counts, eight 45-degree directions, and
Version 2 axial-force envelope.

## Web workspace implementation

The desktop web application includes a fifth `Drawings` workspace. It generates
four deterministic SVG sheets from the active Phase 2 result set or the gated,
fixed Phase 3A synthetic review result:

- General Arrangement: primary elevation, base control-level plan, overall height, base extent, and a controlled title block.
- Load Diagram: applied actions and restraints, active definition, signed source resultants and arrow convention.
- Axial Force Result: signed member axial-force view, deformed and undeformed comparison, compact result definition and controlling member value.
- Analysis Verification: active-case extrema and critical probes, solved support reactions, three-axis equilibrium, analysis provenance, assumptions, and explicit exclusions.

The analysis sheets share the active eight-direction result-set selector.
Changing direction updates the drawings, controlling member, load case,
reaction schedule, equilibrium table and analysis metadata without invoking a
second solver path. Phase 3A uses separate `TF-DRW-P3A-*` document identities
and binds the selected result-set hash, W load case, source/force direction,
adapter, model, project-input ID/status, acceptance hash and
input/source/result hashes. Drawing identity contract `0.3.0` issues these
records at `R03` and also binds the selected M01/M02/M03 action scenario, W
source case and active combination; any mismatch is blocking. The
axial-force legend uses the fixed eight-direction envelope so direction changes
remain visually comparable. Drawing member selection is linked to the existing
3D member-selection state.

Load, action, reaction, restraint, member-force, and deformation presentation is
controlled by `docs/load-action-reaction-deformation-graphic-convention-v0.1.md`
and `rules/towerflow-graphic-convention-v0.1.json`. The Boundary Conditions /
Actions view calculates its plan arrow from the active result set's signed global
resultant and reports `Fx/Fy/Fz`; it is not a fixed viewport symbol.

The web workspace loads `profiles/towerflow-drawing-profile-v0.1.json`, but it
does not load the private `TF-GC01` or `TF-GC02` source-model examples. Every
generated sheet is marked `PRIVATE REVIEW / NOT FOR ISSUE` and
`NOT FOR DESIGN OR CONSTRUCTION`. The inspector identifies the active Phase 2
public model and the `UWEDS-001` package version/adoption record. Controlled
sheet title blocks also carry the applicable pre-drawing case review ID.

The GA sheet also loads `profiles/towerflow-annotation-layout-v0.1.json`.
Its fixed `1188 x 840` SVG viewBox maps to A4 landscape at exactly four SVG
units per paper millimetre. Overall height and base X extent are measured from
stable node IDs, resolved into paper-space records, checked for text collision
and view-border clearance, embedded in SVG metadata, and rendered only when the
annotation record is non-blocking. SVG `textLength` pins rendered width to the
versioned metric record instead of browser-estimated glyph bounds.
