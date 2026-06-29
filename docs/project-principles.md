# TowerFlow Project Principles

## 1. Product Identity

TowerFlow is an engineering visualisation and tower capacity screening platform.

It is not intended to start as a full structural design package. It should first become a clear, trustworthy tool for explaining tower load path, member force flow, and early co-location screening decisions.

The first product target is:

> Australian communication tower equipment co-location screening and visual engineering review.

## 2. Language Rule

All product-facing outputs must be in English.

This includes:

- Web interface text.
- Input labels.
- Tooltips.
- Legends.
- Charts.
- Tables.
- Reports.
- Exported files.
- JSON schemas.
- Example datasets.
- Calculation summaries.
- Release documentation.

Chinese may be used for project discussion, but product deliverables remain English-first.

## 3. Unit Rule

TowerFlow uses SI units for calculations, schemas, interface values, reports, examples, and exports.

Default units:

- Length: m or mm.
- Area: m2 or mm2.
- Force: N or kN.
- Moment: kN.m or N.mm.
- Stress and pressure: MPa, kPa, or Pa.
- Mass: kg.
- Wind speed: m/s.
- Angle: degrees unless a calculation routine explicitly requires radians.

Source documents may use imperial units. Original source values may be retained in metadata, but all calculation inputs and product-facing values must be converted to SI.

## 4. Coordinate Rule

TowerFlow uses a right-handed engineering coordinate system:

- Global `X`: horizontal project axis.
- Global `Y`: horizontal transverse project axis.
- Global `Z`: vertical axis, positive upward.
- Default origin: tower base centreline at the foundation or ground reference plane.
- Plan geometry is in the global `X-Y` plane.
- Height is measured in positive global `Z`.

Loads use:

- `fx`: force in global `X`.
- `fy`: force in global `Y`.
- `fz`: force in global `Z`.

Member local axis rule:

- Local `x` runs from `start_node` to `end_node`.
- Positive axial force means tension.
- Negative axial force means compression.

The web viewer may internally remap axes for Three.js, but the engineering schema must remain `Z`-up.

### Coordinate Axis and View Orientation Rule

Coordinate axes are engineering state, not decoration.

TowerFlow must follow the mature structural software pattern checked against Dlubal RFEM 6 official help:

- The default model coordinate system is global `XYZ` tied to the global axes and the origin.
- User-defined coordinate systems may be introduced later, but they must be explicit and must not replace the global model basis.
- Loads must state both coordinate system and load direction. A load arrow without a coordinate basis is not a valid engineering input.
- The view orientation control must communicate the current camera orientation relative to global `X`, `Y`, and `Z`.

TowerFlow viewer rules:

- Show a dynamic viewport axis triad in every 3D model view.
- The triad must update when the user rotates, pans, changes preset view, or resets the view.
- Show the model-origin global axes at or near `X = 0`, `Y = 0`, `Z = 0` unless the axis layer is intentionally hidden.
- Do not use a static SVG axis icon for a rotatable model.
- Do not label viewer axes using internal Three.js coordinates.
- The bottom view status must state `Coord: Global XYZ`.
- The load status must state the active global load direction, such as `Load Dir: Global +X`.

Standard view meanings:

- `3D`: default isometric engineering review.
- `Front`: `X-Z` elevation, looking along global `-Y`.
- `Side`: `Y-Z` elevation, looking along global `-X`.
- `Plan`: `X-Y` plan, looking down global `-Z`.
- `Fit`: preserve the active engineering context while refitting the model extents.

Load display rules:

- Applied force arrows must start at the actual node or object application point.
- 3D viewport load labels should show only the signed value, for example `+0.15 kN`, to avoid crowding the model.
- Node/object reference, force component, coordinate system, and direction belong in the panel or table.
- Numeric load components remain in global engineering coordinates even if the camera view is rotated.
- Hiding the load layer may hide arrows and labels together, but must not change the active load case or calculation result.

### DOF and Boundary Condition Rule

Boundary conditions must be displayed with the same discipline as loads and results.

Reference basis:

- Dlubal RFEM 6 Nodal Supports: `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000006`.
- Dlubal RFEM 6 Nodal Loads: `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000267`.
- Dlubal RFEM 6 Coordinate Systems: `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000124`.
- Dlubal RFEM 6 Nodal Supports separates support conditions into translational and rotational degrees of freedom.
- A checked support degree of freedom means the corresponding displacement or rotation is blocked.
- Dlubal RFEM 6 Nodal Loads requires a coordinate system and load direction for nodal loads.

TowerFlow DOF rules:

- A full 3D frame model should expose six nodal degrees of freedom: `Ux`, `Uy`, `Uz`, `Rx`, `Ry`, and `Rz`.
- The current Phase 1 solver is not a full 3D frame model. It is a 3D pin-jointed truss stiffness model.
- Phase 1 active node DOF are only `Ux`, `Uy`, and `Uz`.
- `Rx`, `Ry`, and `Rz` may be shown in the interface for engineering context, but they must be labelled as not active in the Phase 1 truss solver.
- Phase 1 must not call its support condition a fully fixed 6DOF base unless rotational stiffness and frame elements have been implemented.

Support display rules:

- Pinned translational support: use a triangular green support symbol. It means `Ux`, `Uy`, and `Uz` are restrained in the Phase 1 truss model.
- Fixed frame support: use a purple block or clamp symbol. It is a future 6DOF frame-model condition unless the solver actually includes rotational DOF.
- The support table should show all six DOF columns so engineers can see the distinction between active truss DOF and future frame DOF.
- Browser-side support edits are input/display state only until the solver is re-run and the result JSON is regenerated.

## 5. Calculation-led Product Rule

TowerFlow must be calculation-led, not animation-led.

Every visual result must be traceable to calculation data:

- Member colours must come from member forces or utilisation values.
- Load arrows must come from defined load inputs.
- Reactions must come from solved support reactions.
- Deformed shapes must come from solved displacements.
- Foundation visuals must come from calculated base reactions, bolt forces, or documented assumptions.

No visual effect should imply a calculation that has not been performed.

## 6. Phase 1 Boundary

Phase 1 is a static digital twin prototype.

Phase 1 should prove:

```text
offline structural calculation
    -> JSON result data
    -> web 3D viewer
    -> force-flow colouring
    -> load display
    -> member selection
    -> basic engineering explanation
```

Phase 1 may include:

- A simplified triangular tower model.
- Offline Python 3D pin-jointed truss analysis.
- One static load case.
- Nodal applied loads.
- Member axial force results.
- Support reactions.
- Force balance check.
- Basic 3D display controls.
- Basic load display controls.

Phase 1 must not claim:

- Australian Standards compliance.
- Member capacity compliance.
- Connection design.
- Foundation design.
- Anchor bolt design.
- Certification-level output.
- Reliability or failure probability.
- Real-time parametric solving unless a backend or browser solver is explicitly added.

## 7. Current Phase 1 Calculation Basis

The current Phase 1 prototype uses:

- A small offline Python solver.
- A 3D pin-jointed truss stiffness method.
- Three active translational degrees of freedom per node: `Ux`, `Uy`, and `Uz`.
- Rotational degrees of freedom `Rx`, `Ry`, and `Rz` are not active in the Phase 1 stiffness matrix.
- Axial member stiffness only.
- Linear elastic material behaviour.
- Pinned translational restraints at the three base nodes: `Ux`, `Uy`, and `Uz` restrained.
- One simplified nodal wind load case in global `+X`.
- Equal member area and elastic modulus in the demo model.

Current calculation exclusions:

- No AS/NZS 1170.2 wind procedure.
- No AS 4100 capacity calculation.
- No geometric nonlinearity.
- No member buckling check.
- No connection stiffness.
- No foundation flexibility.
- No load combinations.
- No dynamic analysis.

This calculation basis must be visible in the product interface and documentation.

## 8. Load Input Philosophy

Load inputs should follow commercial structural software logic: loads must have type, direction, magnitude, location, load case, and units.

A load is not valid unless TowerFlow knows:

- What type of load it is.
- Where it is applied.
- Which direction it acts in.
- How large it is.
- Which load case it belongs to.
- Whether it is user-entered, generated, or reference-derived.

Initial load types for Phase 1 and Phase 2:

- Nodal force.
- Equipment gravity load.
- Equipment wind load.
- Simplified tower wind load.

Later load types:

- Member distributed load.
- Panel or projected-area wind load.
- Antenna mount load.
- Cable load.
- Platform load.
- Support settlement or imposed displacement.
- Broken-wire or conductor load for utility towers.

Australian Standards wind generation should be introduced only when the AS/NZS 1170.2 calculation path is explicitly implemented and documented.

## 9. Commercial Software Reference Rule

TowerFlow should borrow display logic from mature structural software, not copy full design-software scope.

Useful commercial-software logic:

- Real model geometry stored at true size.
- Separate model, loads, results, and checks.
- Load cases are explicit.
- Graphical results are paired with numerical tables.
- Display layers can be shown or hidden.
- Result legends are always visible.
- Units and scale context are always stated.
- Reports show assumptions, inputs, results, and limitations.

What TowerFlow should avoid in Phase 1:

- Full design-software navigation complexity.
- Too many task modes.
- Large report builder workflows.
- Full load-combination management.
- Overloaded result envelopes.
- FEA-style stress contours without a real FEA model.
- Fixed-base or moment-frame behaviour while using a truss-only solver.

## 10. Visualisation Rule

TowerFlow should look like concise engineering software, not a marketing demo or animation.

Visual style:

- Orthographic engineering views where practical.
- Clear model work area.
- Light technical background with clear high-contrast model colours.
- Compact control panels.
- Stable tables and labels.
- Limited shadows and decorative effects.
- Clear legend and active result context.

Default page layout:

- The model viewport should occupy about `3/5` of the desktop width.
- The explanation or result inspector panel should occupy about `2/5` of the desktop width.
- A resizer may allow review-specific adjustment, but the default should favour the model without starving the data panel.

Phase 1 visual priorities:

- Tower topology.
- Applied load locations.
- Load arrows.
- Axial force colours.
- Selected member details.
- Force balance summary.
- Calculation basis summary.

Animation is optional and must never replace numeric display.

### Model Viewport Typography

The model viewport must read like an engineering analysis workspace.

Reference basis:

- Dlubal RFEM 6 Nodal Loads: shifted load display and load-arrow size are graphical display settings, not calculation changes: `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000267`.
- Dlubal RFEM 6 Graphics Control: model graphics, display state, navigator objects, tables, and views are separate software concepts: `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000020`.
- Autodesk AutoCAD TEXTSIZE: text height is a drawing object setting saved in the drawing: `https://help.autodesk.com/cloudhelp/2027/ENG/AutoCAD-Core/files/GUID-DD548317-95BA-4AEA-B54D-0D917F10D3C1.htm`.
- Autodesk AutoCAD Annotation Scaling: annotation objects may be represented at different output scales: `https://help.autodesk.com/cloudhelp/2026/ENU/AutoCAD-LT-DidYouKnow/files/GUID-C33D5B68-5A3F-4AF6-9AFB-F74DAB8B6722.htm`.

TowerFlow inference:

- Screen labels and future plotted drawing text are different systems.
- Phase 1 screen labels should use fixed UI typography, not drawing-scale text heights.
- Future drawing export may map the same semantic hierarchy to plotted text heights such as 2.5 mm body text, but the live viewer remains `Fit to View`.

Recommended screen hierarchy:

| Layer | Use | Size |
| --- | --- | --- |
| Page title | Application name only | 20-22 px |
| Panel heading | Inspector title | 15-16 px |
| Section bar | Panel section names | 11-12 px |
| UI command | Toolbar buttons, tabs, toggles | 12-13 px |
| Label | Context labels, property labels | 10.5-11.5 px |
| Value | Table values, status values | 13-14 px |
| Reading text | Notes and short explanations | 14 px |
| Model load value | Signed load labels beside arrows | 14 px visual equivalent |
| Support symbol label | `PIN`, `FIX` labels | 11-12 px visual equivalent |
| Axis label | `X`, `Y`, `Z`, `GLOBAL` | 11-12 px visual equivalent |

Viewport text rules:

- Reduce large webpage-style titles inside the model window.
- Avoid using the same heavy font weight for every label and value.
- Make values one step larger or stronger than their labels.
- Model load values are primary engineering annotations and must not be smaller than legend or status-bar values.
- Use monospace only for compact engineering values, IDs, and numeric result fields.
- Keep status bars compact so they behave like software chrome, not content cards.
- Do not scale font size with viewport width; use fixed typography steps and hide secondary overlays on small screens when necessary.
- Keep 3D labels short: the model shows signed values, while node ID, coordinate system, direction, and source are shown in the inspector.

### Model Viewport Colour System

The model window should use a clear technical palette. It should not be so grey that the engineering state is hard to read.

Recommended viewport colours:

- Canvas background: `#f7fbff`.
- Grid major/minor lines: `#7dd3fc` and `#dbeafe`.
- Floating panel background: `#ffffff`.
- Panel border: `#cbd5e1`.
- Primary text: `#111827`.
- Secondary text: `#475569`.
- Muted text: `#64748b`.
- Active toolbar background: `#e2e8f0`.
- Toolbar border: `#b8c2cc`.

Structural result colours:

- Tension: vivid red, recommended `#e11d48`.
- Compression: vivid engineering blue, recommended `#006bd6`.
- Low force or neutral state: `#64748b`.
- Applied nodal load: orange, recommended `#ff8a00`.
- Pinned support: green, recommended `#16a34a`.
- Fixed support preview: purple, recommended `#7c3aed`.
- Selected member: preserve original force colour where possible; prefer outline, halo, or increased thickness over replacing the semantic colour.

Viewport layout rules:

- The viewport should feel like analysis software, not a landing-page hero.
- Use a compact toolbar for view commands.
- Use a compact legend, not a large explanatory card.
- Use a bottom status bar for mode, case, result, units, and scale context.
- Put `Scale: Fit to View` in the status context, not as a large floating content block unless needed for exported drawings.
- Keep axis triad, grid reference, legend, and status context visible but visually secondary to the model.

### 3D View Layer Stack

TowerFlow 3D views should be built as ordered engineering layers, similar to mature analysis software display logic:

1. Scene background, grid, and ground/reference plane.
2. Global coordinate axes and viewport orientation triad.
3. Boundary condition symbols and base/support nodes.
4. Structural topology: nodes and members.
5. Applied loads, shown as one `Nodal loads` layer containing arrows and signed values together.
6. Analysis result mapping, such as axial force colour.
7. Selection and hover feedback.
8. Labels, dimensions, legends, and status context.
9. Inspector panels and numerical tables.

Layer rules:

- Layers may be shown or hidden, but hiding a layer must not change the calculation model.
- Support symbols should remain visible when reviewing loads and reactions.
- Load arrows must not obscure support symbols at the same node.
- Result colour should remain the dominant model information in a result view.
- Clicking empty model space clears member selection and selected-member values become `-`.

## 11. Page Disclosure Rule

Every TowerFlow page or prototype must disclose:

- Active analysis model.
- Active load case.
- Active result type.
- Unit system.
- Calculation basis.
- What is not calculated.
- Whether values are schematic or design-check values.

For Phase 1, the page must clearly state:

```text
Calculation basis: linear elastic 3D pin-jointed truss stiffness analysis.
DOF basis: 3 translational DOF per node; rotations not solved in Phase 1.
Load basis: simplified user/static nodal loads in global +X.
Code checks: not calculated in Phase 1.
Certification: not for design certification.
```

## 12. Implementation Discipline

Implementation should stay narrow and verifiable.

Before adding a new visual feature:

- Confirm what engineering data drives it.
- Confirm which phase it belongs to.
- Confirm whether it is calculation, display, or future placeholder.
- Add missing-data states instead of pretending the result exists.

Before adding a new calculation feature:

- Define inputs.
- Define units.
- Define source references.
- Define output schema.
- Add a verification case.
- Show assumptions in the interface or documentation.
