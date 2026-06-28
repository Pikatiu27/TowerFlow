# TowerFlow Visualisation Outline

## How This Document Is Used

This document is the detailed display and view-state guide for TowerFlow. It does not replace `TOWERFLOW_ROADMAP.md`.

Document logic:

- `TOWERFLOW_ROADMAP.md` controls phase scope, deliverables, exit criteria, and release gates.
- This file controls how accepted visual features should behave once they are in scope.
- Reference files under `references/` provide source context only; they do not create visual or calculation requirements by themselves.

Update rules:

- Add or change a view rule here when it affects display state, legends, filters, camera behaviour, selection, result context, saved views, or visual verification.
- Update the roadmap separately if a visual feature changes the phase scope or release definition of done.
- Keep all product-facing visual text in English.
- Keep all units in SI. Original non-SI source values may appear only in source metadata or reference notes.
- Do not add visual effects unless the underlying calculation data, legend, and missing-data behaviour are defined.

Current Phase 1 implementation baseline:

- Static tower geometry view.
- Axial force colour view.
- Member selection with detail panel.
- Case summary panel.
- `sconmyway` public prototype watermark.

Phase 1 planned visual completion items:

- Add a visible force legend.
- Add explicit active result context: scenario, load case, result type, and units.
- Add neutral missing-data states for unavailable utilisation, code-check, foundation, and reliability results.

## Purpose

TowerFlow visuals must explain structural behaviour, not decorate the interface.

Every graphic should answer at least one engineering question:

- Where does the load go?
- Which member is in tension or compression?
- Which member controls utilisation?
- Which wind direction controls the result?
- How do tower base reactions transfer into bolts, base plate, grout, and concrete?
- What changed after adding equipment or strengthening members?

## Visualisation Principles

- Product-facing labels, legends, tooltips, charts, and reports must be in English.
- 3D views must be tied to calculation data.
- Colours must represent defined engineering values, not arbitrary styling.
- Tables and charts must always support the 3D view.
- Do not use advanced visual effects unless the underlying result is already verified.
- Do not show stress, utilisation, reliability, or failure probability without a visible legend and calculation basis.

## Commercial Software Display Logic

TowerFlow should borrow the display logic of mature structural software, but keep the scope smaller and more focused.

Commercial tools usually separate the interface into clear layers:

```text
Model definition
    -> load case / combination selection
    -> analysis results
    -> design or code-check results
    -> graphical filters
    -> tabular result review
    -> report output
```

TowerFlow should follow the same separation.

### 1. Model-first Display

Commercial pattern:

- The main graphics window always shows the current model state.
- Users can rotate, pan, zoom, select, and filter the model.
- Geometry is shown separately from analysis results.

TowerFlow rule:

- The default view should be a clean tower model, not an overloaded heat map.
- Nodes, members, supports, equipment, and foundations should each have independent visibility toggles.
- The model should remain readable even before result data is loaded.

Required controls:

- Model view.
- Force view.
- Utilisation view.
- Deformed shape view.
- Foundation view.
- Reliability view.

### 2. Explicit Result Context

Commercial pattern:

- Results are always tied to an analysis case, load combination, envelope, design code, or result type.
- Users can switch between result cases without changing the base model.

TowerFlow rule:

- Every visual result must show the active result context.

Required context labels:

- Active load case.
- Active wind direction.
- Active scenario.
- Active result type.
- Active design/check basis.
- Active unit system.

Example:

```text
Scenario: Proposed Equipment
Load Case: Wind 60 deg
Result View: Member Utilisation
Code Basis: AS 4100 simplified screening
Units: kN, m, MPa
```

### 3. Graphics and Tables as Paired Outputs

Commercial pattern:

- Graphical results are paired with tables, datasheets, or reports.
- A colour map alone is not treated as a complete engineering result.

TowerFlow rule:

- Any member colour map must have a linked table.
- Clicking a graphic object should select the corresponding table row.
- Clicking a table row should highlight the corresponding object in the 3D view.

Required pairings:

| Visual | Required Table or Panel |
| --- | --- |
| Force flow view | Member force table |
| Utilisation view | Member utilisation table |
| Deformed shape view | Node displacement table |
| Wind loading view | Height band wind pressure table |
| Foundation view | Bolt force and base reaction table |
| Reliability view | Beta / probability / assumption table |

### 4. Graphical Filters

Commercial pattern:

- Mature tools provide graphical filters so engineers can reduce visual clutter.
- Users can isolate members, load cases, result types, object groups, or critical results.

TowerFlow rule:

- Filters are core engineering controls, not optional UI extras.

Initial filters:

- Show all members.
- Show selected member only.
- Show overstressed members.
- Show compression members.
- Show tension members.
- Show equipment loads.
- Show base reactions.
- Show current wind direction only.
- Show governing members only.

Later filters:

- Filter by section type.
- Filter by tower panel.
- Filter by utilisation band.
- Filter by operator/tenant equipment.
- Filter by foundation component.

### 5. Deformed Shape and Result Diagrams

Commercial pattern:

- Structural software commonly displays loading diagrams, deformed geometry, bending moment diagrams, shear force diagrams, axial force diagrams, stress diagrams, and contour diagrams.

TowerFlow rule:

- Start with the result diagrams that matter for a truss-like tower:
  - Axial force diagram.
  - Deformed shape.
  - Support reaction summary.
  - Member utilisation map.
- Do not add moment/shear diagrams until frame members are actually modelled.
- Do not add stress contours unless the result comes from a verified plate/shell/solid or local component model.

### 6. Design Results Are Separate from Analysis Results

Commercial pattern:

- Analysis results and design/code-check results are related but displayed separately.
- A member force is not the same thing as a design utilisation.

TowerFlow rule:

- Keep these result modes separate:
  - Force result.
  - Displacement result.
  - Reaction result.
  - Capacity result.
  - Utilisation result.
  - Reliability result.

Never combine them into one ambiguous colour scale.

### 7. Envelopes and Governing Results

Commercial pattern:

- Engineers often review individual load cases, load combinations, and envelopes.
- The interface usually identifies governing values.

TowerFlow rule:

- Support both individual case review and governing/envelope review.

Required modes:

- Single load case.
- Single wind direction.
- Scenario comparison.
- Governing member view.
- Envelope utilisation view.

Display requirements:

- If the view is an envelope, say so clearly.
- Show which load case generated the governing value for each critical member.

### 8. Report-ready Output

Commercial pattern:

- Engineering tools usually connect graphical results to report output.
- Reports include model assumptions, input data, result tables, and selected diagrams.

TowerFlow rule:

- Every release should support at least one exportable English summary.
- The report should not rely on screenshots alone.

Minimum report contents:

- Project and model metadata.
- Input assumptions.
- Load cases.
- Wind parameters.
- Equipment loads.
- Governing member summary.
- Selected diagrams.
- Result tables.
- Known limitations.

### 9. Customisable but Controlled Layout

Commercial pattern:

- SAP2000-style tools allow modelling, analysis, design, and reporting in one interface with configurable layouts.

TowerFlow rule:

- Keep layout simpler than full commercial software, but allow engineers to switch task modes.

Recommended task modes:

- Model.
- Loads.
- Results.
- Code Check.
- Foundation.
- Scenarios.
- Report.

Each task mode should keep the same 3D model centre, with side panels changing by task.

### 10. Verification and Example Models

Commercial pattern:

- Mature software ecosystems provide reference manuals, online help, tutorials, and verification problems.

TowerFlow rule:

- Visual features should ship with small verification examples.
- A visual mode is not complete until at least one known model demonstrates it.

Visual verification examples:

- Simple triangular truss force sign check.
- Tower under one horizontal wind load.
- Equipment added at one height.
- Overstressed member example.
- Foundation uplift example.

### Source Notes

This display logic is summarised from public official documentation and product pages, including:

- SPACE GASS technical specifications: main graphics display, graphical filters, loading diagrams, deformed geometry, member diagrams, contour diagrams, rendered geometry, and reports.
- SAP2000 product page: single interface for modelling, analysis, design, and reporting, plus 2D/3D graphics and model navigation.
- RISA documentation hub: separation of general references, online help, tutorials, and verification problems.
- Dlubal RFEM/RSTAB documentation: separation of model objects, analysis/design applications, API workflows, examples, verification examples, and report-oriented engineering workflow.

## View Control and Display State Logic

TowerFlow should handle views as explicit engineering states, not as loose camera movements.

### 0. Coordinate and View Basis

TowerFlow uses an engineering `Z`-up coordinate system:

- Global `X`: East-West horizontal axis.
- Global `Y`: North-South horizontal axis.
- Global `Z`: vertical axis, positive upward.
- Default origin: tower base centreline at the foundation or ground reference plane.

Member local axis convention:

- Local `x`: from `start_node` to `end_node`.
- Positive axial force: tension.
- Negative axial force: compression.
- Local `y` and `z`: reserved for future frame orientation and section orientation.

Three.js mapping:

```text
Engineering X -> Three.js X
Engineering Y -> Three.js Z
Engineering Z -> Three.js Y
```

The engineering JSON schema must remain `X-Y-Z` with `Z` vertical. The viewer adapter handles the Three.js coordinate conversion.

The viewer state should always know:

```text
active task mode
active scenario
active load case
active result type
active selection
active filters
active legend
active unit system
active camera preset
```

### 1. Task Modes

Use task modes to keep the interface predictable.

Recommended modes:

- Model.
- Loads.
- Results.
- Code Check.
- Foundation.
- Scenarios.
- Report.

Mode behaviour:

| Mode | Primary Display | Side Panel | Main User Action |
| --- | --- | --- | --- |
| Model | Neutral tower geometry | Model tree and properties | Inspect topology |
| Loads | Tower with loads and wind arrows | Load inputs and load case list | Review applied loads |
| Results | Force, displacement, or reaction result | Result selector and tables | Interpret analysis output |
| Code Check | Utilisation colour map | Member checks and governing results | Find overstressed members |
| Foundation | Base detail and reaction transfer | Bolt/base/concrete values | Review load path |
| Scenarios | Before/after or scenario toggle | Scenario inputs and comparison | Compare options |
| Report | Selected diagrams and summary | Export options and included sections | Prepare output |

Only show controls relevant to the active mode.

### 2. Camera Presets

Camera control should be simple and repeatable.

Required camera presets:

- Isometric.
- Front elevation.
- Side elevation.
- Plan.
- Top-down.
- Base detail.
- Selected object.
- Reset view.

Rules:

- Presets should not change the active result type.
- `Selected object` should frame the selected member, equipment, or foundation component.
- `Base detail` should zoom to the foundation while keeping orientation understandable.
- The camera should avoid clipping the top or base of the tower after model changes.

### 3. Navigation Controls

Required interactions:

- Orbit.
- Pan.
- Zoom.
- Double-click to frame selected object.
- Reset camera.
- Fit all.

Desktop behaviour:

- Left mouse: rotate.
- Right mouse or modifier key: pan.
- Scroll: zoom.

Mobile behaviour:

- One finger: rotate.
- Two fingers: pan or zoom.
- Double tap: select or frame object.

### 4. View Toggles

Use explicit toggles instead of hidden visual states.

Initial toggles:

- Nodes.
- Member IDs.
- Supports.
- Equipment.
- Loads.
- Wind arrows.
- Deformed shape.
- Undeformed reference.
- Result legend.
- Grid / height reference.
- Critical members only.

Later toggles:

- Foundation components.
- Bolt labels.
- Concrete cone.
- Tenant equipment groups.
- Section labels.
- Utilisation threshold bands.

Rules:

- Turning a layer on or off must not change calculation results.
- Critical warnings should remain discoverable even if labels are hidden.
- If a selected object is hidden by a filter, clear the selection or show a clear message.

### 5. Result Type Switching

Result type switching should be explicit.

Recommended result types:

- None / geometry only.
- Axial force.
- Displacement.
- Support reaction.
- Member utilisation.
- Foundation force.
- Reliability index.
- Failure probability.

Rules:

- Switching result type changes colours, legend, and detail panel fields.
- It must not silently change the active load case.
- If a result type is unavailable, show it as disabled with a short reason.

Example disabled reason:

```text
Utilisation results are unavailable because member capacities have not been calculated.
```

### 6. Load Case and Envelope Display

Load case selection should be visible at all times when results are shown.

Required selectors:

- Scenario.
- Load case.
- Wind direction.
- Result envelope.

Rules:

- `Single Case` shows one selected load case.
- `Envelope` shows governing values across selected cases.
- Envelope views must display the governing case for selected members.
- Do not mix envelope and single-case values in one panel without labels.

### 7. Selection Logic

Selection must connect the 3D model, side panel, and tables.

Selectable objects:

- Node.
- Member.
- Support.
- Equipment.
- Bolt.
- Base plate.
- Concrete cone.
- Load arrow.

Selection behaviour:

- Hover highlights an object lightly.
- Click selects the object.
- Selected object remains highlighted until another object is selected or selection is cleared.
- Selecting a table row highlights the corresponding 3D object.
- Selecting a 3D object scrolls or filters the relevant table row.

Detail panel requirements:

- Object ID.
- Object type.
- Source data.
- Current result values.
- Units.
- Governing case if applicable.
- Limitations or unchecked status if applicable.

### 8. Highlighting and Warnings

Use a consistent hierarchy for visual emphasis.

Highlight hierarchy:

1. Selected object.
2. Hovered object.
3. Over-capacity warning.
4. High-utilisation warning.
5. Normal result colour.
6. Inactive or filtered objects.

Rules:

- A selected object must remain visible even if its result colour is low severity.
- Over-capacity members should remain easy to find in Code Check mode.
- Warning colours must not conflict with force sign colours.
- If red is used for both tension and over-capacity, the active result mode must make the meaning obvious.

### 9. Legend Logic

The legend is part of the engineering result.

Legend requirements:

- Active result type.
- Colour scale.
- Units.
- Min and max values.
- Active load case or envelope.
- Unchecked or missing-data colour.

Rules:

- The legend must update when result type, unit system, scenario, or load case changes.
- The legend must not show utilisation thresholds when the view is axial force.
- The legend must not show force sign colours when the view is utilisation.

### 10. Units and Value Formatting

All views must use consistent units.

Default units:

- Length: m.
- Force: kN.
- Moment: kNm.
- Stress: MPa.
- Pressure: kPa.
- Utilisation: ratio.
- Reliability index: beta.
- Failure probability: scientific notation or percent.

Rules:

- Unit labels must appear in tables, legends, tooltips, and exports.
- Original source units may be stored in metadata, but UI values should use the selected unit system.
- Do not mix ft/in source dimensions into product views unless the source comparison mode is explicitly active.

### 11. Missing, Partial, and Unchecked Data

Engineering software must make absence of data visible.

Display states:

- Calculated.
- Not calculated.
- Not applicable.
- Missing source data.
- Unverified reference data.
- Out of scope for current release.

Rules:

- Use neutral grey for missing or unchecked result values.
- Show a short reason in the detail panel.
- Do not infer capacities, weights, projected areas, or geometry when the source is missing.

Example:

```text
Status: Not checked
Reason: Member section capacity is not defined.
```

### 12. Comparison View Logic

Comparison views must avoid confusing overlays.

Supported comparison modes:

- Toggle: Existing / Proposed / Strengthened.
- Side-by-side: two 3D views or one 3D view plus two summary panels.
- Difference map: show change in utilisation or force.

Rules:

- Side-by-side views must use the same camera orientation and zoom.
- Difference maps need their own legend.
- Do not compare different result types in the same colour scale.

### 13. Saved Views and Report Snapshots

TowerFlow should support reproducible views for reporting.

Saved view metadata:

- Camera position.
- Target point.
- Task mode.
- Scenario.
- Load case.
- Result type.
- Filters.
- Legend scale.
- Selected object.
- Timestamp.

Use cases:

- Report diagrams.
- Verification screenshots.
- Before/after comparison.
- Design review comments.

Rules:

- Saved views should be reproducible from data, not only stored as images.
- Report snapshots should include legend and context labels.

### 14. Display State Data Shape

Suggested frontend display state:

```json
{
  "taskMode": "Code Check",
  "scenarioId": "proposed-equipment",
  "loadCaseId": "wind-60",
  "resultType": "member_utilisation",
  "envelopeMode": false,
  "selectedObject": {
    "type": "member",
    "id": "M-104"
  },
  "filters": {
    "showNodes": false,
    "showEquipment": true,
    "showLoads": true,
    "criticalOnly": false,
    "utilisationMin": 0.0
  },
  "legend": {
    "scaleMode": "fixed_thresholds",
    "min": 0.0,
    "max": 1.2,
    "units": "ratio"
  },
  "cameraPreset": "isometric",
  "unitSystem": "SI"
}
```

### 15. View Definition of Done

A view mode is complete only when:

- It has a named task mode.
- It has explicit result context.
- It has camera presets.
- It has a legend.
- It has object selection.
- It has table or panel support.
- It handles missing data.
- It can be captured as a report-ready saved view.

## Core Visual Types

### 1. Tower Geometry View

Purpose:

- Show the structural topology of the tower.
- Make nodes, members, panels, supports, and equipment locations clear.

Initial implementation:

- Use Three.js / React Three Fiber.
- Generate tower geometry procedurally from JSON.
- Render members as cylinders or line segments.
- Render nodes as small spheres.
- Render supports as simple base symbols.
- Render equipment as simple boxes or antenna panels.

Data required:

- Node coordinates.
- Member connectivity.
- Member type.
- Support locations.
- Equipment location and mounting height.

Recommended display:

- Neutral grey tower before results are loaded.
- Clear camera framing.
- Orbit controls.
- Reset view button.
- Optional grid or height reference.

### 2. Force Flow View

Purpose:

- Show whether each member is mainly in tension or compression.
- Show relative force magnitude.

Initial implementation:

- Tension: red.
- Compression: blue.
- Near-zero force: grey.
- Colour intensity scaled by absolute axial force.
- Optional member thickness scaled lightly by force magnitude.

Data required:

- Member axial force.
- Force sign convention.
- Load case ID.
- Governing wind direction.

Legend:

- Red = Tension.
- Blue = Compression.
- Grey = Low axial force.
- Darker colour = higher absolute axial force.

Avoid in MVP:

- Animated particles as the primary result display.
- Complex custom shaders.
- Unverified stress contours.

Later enhancement:

- Add subtle directional flow animation only after the force sign convention is verified.

### 3. Utilisation View

Purpose:

- Show which members are close to or over their design capacity.

Initial implementation:

- Colour by utilisation ratio.
- Suggested scale:
  - 0.00 to 0.70: green.
  - 0.70 to 1.00: amber.
  - Above 1.00: red.
  - Unchecked member: grey.

Data required:

- Design action.
- Design capacity.
- Utilisation ratio.
- Limit state type.
- Controlling load case.

Legend:

- Green = Acceptable range.
- Amber = High utilisation.
- Red = Over capacity.
- Grey = Not checked.

Interaction:

- Click a member to show:
  - Member ID.
  - Section.
  - Length.
  - Effective length.
  - Axial force.
  - Capacity.
  - Utilisation ratio.
  - Limit state.
  - Load case.

### 4. Deformed Shape View

Purpose:

- Explain global movement and stiffness behaviour.

Initial implementation:

- Show undeformed tower as faint grey.
- Show deformed tower as coloured overlay.
- Use a visible deformation scale factor.

Data required:

- Node displacements.
- Scale factor.
- Load case ID.

Display requirements:

- Always label the deformation scale.
- Never imply the displayed deformation is actual size unless scale factor is 1.0.

Later enhancement:

- For compression-controlled members, add a subtle buckling-shape preview only when there is a verified buckling mode or approximation.

### 5. Wind Loading View

Purpose:

- Show applied wind direction, height variation, and equipment exposure.

Initial implementation:

- Use arrows on the 3D tower to show wind direction.
- Use a side chart for wind pressure versus height.
- Show equipment projected area as highlighted surfaces.

Data required:

- Wind speed.
- Wind direction.
- Height bands.
- Pressure values.
- Equipment projected area.

Charts:

- Wind pressure versus height.
- Force contribution by height band.
- Optional equipment contribution breakdown.

### 6. Equipment and Appurtenance View

Purpose:

- Show where new equipment is mounted and how it affects loads.

Initial implementation:

- Render antennas as simplified rectangular panels.
- Render mounts as simple brackets or frames.
- Display mounting height and projected area.

Data required:

- Equipment type.
- Weight.
- Projected area.
- Drag coefficient or effective area assumption.
- Mounting height.
- Tower face or orientation.

Interaction:

- Click equipment to show:
  - Equipment ID.
  - Weight.
  - Projected area.
  - Mounting height.
  - Wind contribution.

Site Pro 1-style hardware:

- Treat as future accessory library data.
- Do not model exact products until dimensions, weight, and projected area are verified from official cut sheets.

### 7. Foundation and Anchorage View

Purpose:

- Explain how tower base reactions transfer into the foundation.

Initial implementation:

- Render base plate, bolts, grout layer, and concrete block.
- Show compression zone under the base plate.
- Show uplift bolts in red.
- Show bearing pressure as a contact heat map.
- Show simplified concrete breakout cone as transparent geometry.

Data required:

- Base axial force.
- Base shear.
- Overturning moment.
- Bolt layout.
- Bolt forces.
- Bearing pressure.
- Concrete cone geometry.

Interaction:

- Click bolt to show bolt tension.
- Click base plate to show compression resultants.
- Click concrete cone to show breakout assumption.

Audit panel:

```text
Sum of vertical forces
Sum of horizontal forces
Sum of overturning moments
Bolt tension resultant
Concrete compression resultant
```

Avoid in early versions:

- Full nonlinear concrete stress fields.
- Certification-style anchor design.
- FEA-like stress contours unless generated from a verified model.

### 8. Scenario Comparison View

Purpose:

- Compare existing, proposed, and strengthened tower states.

Initial implementation:

- Use side-by-side summary panels.
- Add before/after toggle for the 3D model.
- Show controlling member before and after strengthening.

Data required:

- Scenario ID.
- Input changes.
- Maximum utilisation before.
- Maximum utilisation after.
- Number of overstressed members before.
- Number of overstressed members after.

Charts:

- Top controlling members before/after.
- Capacity recovery summary.
- Load case comparison.

### 9. Reliability View

Purpose:

- Move from deterministic utilisation to probability-informed risk communication.

Initial implementation:

- Keep deterministic and probabilistic modes separate.
- Show reliability index beta and failure probability only when assumptions are visible.

Visual mapping:

- Beta high / failure probability low: lower-risk colour.
- Beta low / failure probability high: higher-risk colour.
- Always show legend and assumptions.

Data required:

- Random variables.
- Coefficients of variation.
- Limit state function.
- Reliability method.
- Beta.
- Failure probability.

Avoid:

- Combining utilisation ratio and probability into one unclear colour scale.
- Presenting probability results as final collapse predictions without validated models.

## Dashboard Components

The 3D view should be supported by compact 2D panels:

- Input panel.
- Result summary.
- Wind pressure chart.
- Member utilisation table.
- Support reaction table.
- Load case selector.
- Scenario selector.
- Assumptions and limitations panel.

## Recommended Layout

### Desktop

- Left: input controls and load case selector.
- Centre: 3D tower viewer.
- Right: selected member/equipment/foundation details.
- Bottom: charts and result tables.

### Mobile or Narrow Screen

- Top: compact result summary.
- Middle: 3D tower viewer.
- Bottom: tabs for inputs, details, charts, and assumptions.

## Phase-by-phase Visual Delivery

### Phase 1

Build only:

- Static 3D tower geometry.
- Force colouring.
- Member click panel.
- Basic result legend.

Do not build:

- Live solving.
- Utilisation checks.
- Foundation detail.
- Reliability maps.

### Phase 2

Add:

- Parameter controls.
- Wind direction arrows.
- Wind pressure chart.
- Dynamic result refresh.
- Support reaction summary.

### Phase 3

Add:

- Utilisation colour map.
- Member utilisation table.
- Governing load case display.
- English calculation summary export.

### Phase 4

Add:

- Scenario comparison.
- Before/after colour maps.
- Strengthening impact summary.

### Phase 5

Add:

- Foundation detail view.
- Bolt force visualisation.
- Base plate compression map.
- Concrete cone visualisation.
- Equilibrium audit panel.

### Phase 6

Add:

- Reliability colour map.
- Beta and failure probability dashboard.
- Portfolio risk ranking.

## File and Data Requirements

Suggested frontend data files:

```text
public/data/tower-001.geometry.json
public/data/tower-001.results.json
public/data/tower-001.scenarios.json
public/data/tower-001.foundation.json
```

Suggested result schema groups:

- `nodes`
- `members`
- `supports`
- `loads`
- `load_cases`
- `member_forces`
- `member_utilisation`
- `support_reactions`
- `equipment`
- `foundation`
- `scenarios`

## Definition of Done

A TowerFlow visual is done only when:

- It is driven by calculation data.
- It has a visible legend.
- Its units are clear.
- It has a selected-state detail panel.
- It handles missing or unchecked data gracefully.
- It is consistent with tables and charts.
- It has at least one verification screenshot or note.
