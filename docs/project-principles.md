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
- Translational degrees of freedom only.
- Axial member stiffness only.
- Linear elastic material behaviour.
- Fixed translational restraints at the three base nodes.
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

## 10. Visualisation Rule

TowerFlow should look like concise engineering software, not a marketing demo or animation.

Visual style:

- Orthographic engineering views where practical.
- Clear model work area.
- Low-saturation grey technical background.
- Compact control panels.
- Stable tables and labels.
- Limited shadows and decorative effects.
- Clear legend and active result context.

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

Recommended viewport hierarchy:

- Application title: 20-22 px, heavy weight, used only once.
- Prototype or mode label: 10-11 px, uppercase, medium-heavy weight.
- Toolbar buttons: 12 px, medium weight.
- View context labels: 10 px, uppercase, grey.
- View context values: 12 px, medium weight.
- Legend title: 11 px, uppercase, medium-heavy weight.
- Legend labels: 12 px, medium weight.
- Legend note: 11 px, regular weight.
- Grid, scale, and source labels: 11 px, regular or medium weight.
- Load labels: 10-11 px, medium weight.
- Axis labels: 11-12 px, medium-heavy weight.

Viewport text rules:

- Reduce large webpage-style titles inside the model window.
- Avoid using the same heavy font weight for every label and value.
- Keep engineering values readable, but do not make every value look like a primary result.
- Use monospace only for compact engineering values, IDs, and numeric result fields.
- Keep status bars compact so they behave like software chrome, not content cards.

### Model Viewport Colour System

The model window should use a restrained technical palette.

Recommended viewport colours:

- Canvas background: `#f3f5f7` or `#f5f6f8`.
- Grid major/minor lines: `#cbd5e1` and `#e5eaf0`.
- Floating panel background: `#ffffff`.
- Panel border: `#cbd5e1`.
- Primary text: `#111827`.
- Secondary text: `#475569`.
- Muted text: `#64748b`.
- Active toolbar background: `#e2e8f0`.
- Toolbar border: `#b8c2cc`.

Structural result colours:

- Tension: deep red, recommended `#c9342c`.
- Compression: engineering blue, recommended `#1479a8`.
- Low force or neutral state: `#94a3b8`.
- Applied load: dark graphite, recommended `#1f2937`.
- Selected member: preserve original force colour where possible; prefer outline, halo, or increased thickness over replacing the semantic colour.

Viewport layout rules:

- The viewport should feel like analysis software, not a landing-page hero.
- Use a compact toolbar for view commands.
- Use a compact legend, not a large explanatory card.
- Use a bottom status bar for mode, case, result, units, and scale context.
- Put `Scale: Fit to View` in the status context, not as a large floating content block unless needed for exported drawings.
- Keep axis triad, grid reference, legend, and status context visible but visually secondary to the model.

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
