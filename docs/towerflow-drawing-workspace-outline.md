# TowerFlow Drawing Workspace Implementation Outline

## 1. Product purpose

The Drawing workspace is a controlled review surface generated from the active
TowerFlow model and result set. It is not a second model editor and it is not a
free-form CAD canvas. The Phase 2 solver, canonical geometry and result schema
remain unchanged.

The commercial-software hierarchy is:

1. **Application workspace** selects `Model`, `Loads`, `Solve`, `Results` or
   `Drawings`.
2. **Drawing document** selects `GA`, `Loads`, `Results` or `Verification`.
3. **Sheet view** answers one engineering question using a controlled
   projection and display preset.
4. **Inspector** reports selection, validation, source and release state; it
   does not duplicate sheet annotations.

## 2. Drawing workspace layout

The Drawing workspace follows a document-view pattern used by engineering
desktop software:

- the command bar owns document type, active result direction, zoom and Fit;
- the sheet canvas owns the drawing only;
- the right inspector owns validation, source links and selected-object data;
- changing direction regenerates the current result sheet without changing the
  active document type or zoom intent;
- browser resizing uniformly scales the fixed SVG viewBox and never reflows
  engineering annotations independently.

Controls must not appear in more than one layer. Camera controls belong to the
3D viewport; drawing zoom belongs to the Drawing command bar; result quantity
belongs to Results; drawing type belongs to Drawings.

The application-level information ownership and text hierarchy are controlled
by `docs/interface-information-architecture.md`. The drawing sheet remains a
document surface and shall not reproduce the complete application inspector.

## 3. Sheet and view hierarchy

Each sheet contains, in order of authority:

1. sheet border and document identity;
2. controlled view frames;
3. canonical projected geometry;
4. dimensions and engineering annotations;
5. result overlays and legends where applicable;
6. schedules and review notes;
7. title block and release status.

Every controlled view must state:

- view title and engineering question;
- projection and dimensional authority;
- scale state (`NTS` or controlled screen scale);
- model and analysis revision;
- semantic `viewId`, `layerRole` and source IDs.

Perspective/isometric views are context-only, `NTS` and non-dimensional.
Dimensions are permitted only in orthographic views governed by canonical model
geometry.

## 4. View composition rules

- Reserve the title band before fitting geometry.
- Fit geometry to a declared model zone, not the full view frame.
- Reserve independent annotation zones at `TOP`, `BOTTOM`, `LEFT` and `RIGHT`.
- Keep dimensions outside the object silhouette unless an internal dimension is
  the only unambiguous arrangement.
- Allocate dimensions from the object outward: feature, location, overall,
  interface, then system/grid control.
- Enlarge the view or move secondary content before reducing technical text.
- No geometry, annotation or result label may cross a view frame or title block.
- Empty space must serve a reserved annotation or comparison zone; otherwise
  refit the view.

## 5. Dimension and annotation contract

A displayed dimension is a resolved engineering annotation, not decorative
SVG text. It must retain:

- one canonical dimension requirement;
- explicit model feature anchors;
- projected anchor coordinates in the controlled view;
- typed extension lines, dimension line and arrowheads;
- exact display value, unit and precision rule;
- text box and clearance envelope;
- stable annotation ID, source ID and revision;
- containment and collision validation state.

Linear dimensions must satisfy these rules:

- extension lines are perpendicular to the dimension line;
- extension lines begin clear of the measured feature and overshoot the
  dimension line;
- arrow tips terminate at dimension-line/extension-line intersections;
- text is centred and separated from the dimension line by a clear background
  or controlled gap;
- dimension endpoints come from projected semantic targets, never arbitrary
  frame coordinates or browser pixels;
- values are measured from canonical coordinates and rounded only for display;
- unresolved targets, collisions or clipping block review readiness.

## 6. Drawing-type content

### General Arrangement

Required views: GA plan and primary elevation.
Required coverage: overall height, base X/Y extent, primary axes, levels, panel
boundaries and support locations. Raw FE nodes and fabrication details are
excluded.

### Load Diagram

Required content: applied actions and restraints, active load definition,
signed source resultants, coordinate basis, units and arrow display convention.
Nodal arrows are schematic and fixed-length; signed values govern.

### Axial Force Result

Required views: signed member axial force and deformed/undeformed comparison.
Model idealisation and applied actions are not repeated. The legend carries quantity,
component, unit, basis, location, averaging, range, case, deformation scale and
revisions. Colour is never the only result channel.

### Analysis Verification

Required content: extrema/probes, support reactions, three-axis equilibrium,
analysis basis, assumptions and exclusions. Tables own dense numeric evidence;
the graphical views show only information needed to interpret that evidence.

## 7. Validation gates

The document state is `READY_FOR_PRIVATE_REVIEW`, `BLOCKED` or future `STALE`.
Required checks include:

- model/result/profile/revision linkage;
- required view and dimension coverage;
- semantic target resolution;
- annotation containment and collision clearance;
- direction-set and result-range consistency;
- equilibrium and required result metadata;
- fixed-viewBox deterministic rendering;
- explicit private-review release boundary.

Registered negative cases `TF-NC01` to `TF-NC10` remain active. New layout
negative cases must cover arbitrary dimension endpoints, missing extension
lines, detached arrow tips, text overlap and annotation outside a view frame.

## 8. Implementation sequence

1. Correct GA dimensions using semantic anchors and resolved SVG geometry.
2. Add view-zone and annotation-containment verification.
3. Recompose Axial Force labels and critical-member callouts.
4. Reduce Analysis Verification density and move detailed evidence to tables.
5. Add monochrome review and deterministic SVG export.
6. Add vector PDF and print-scale checks only after SVG layout is stable.

## 9. Release boundary

The workspace supports the Phase 2 demonstration and the gated Phase 3A mapped
review. P3A sheets use a separate `TF-DRW-P3A-*` document series and bind the
project-input ID/status, acceptance hash, action scenario, active result-set
hash, W load case or combination, source/force direction, adapter, model and
input/source/result hashes into
deterministic SVG metadata. Identity contract `0.3.0 / R03` blocks Drawing
review on any mismatch. A reviewed project-input package is still not release
authority; neither mode is a member-capacity, connection, foundation,
fabrication, construction or certified-design output.
