# TowerFlow Phase 1 Result Schema Draft

## File

`public/data/tower-001.results.json`

## Top-Level Fields

- `schemaVersion`: version of the static result contract.
- `caseId`: unique result case identifier.
- `title`: human-readable case title.
- `units`: SI units used by the result file.
- `analysisBoundary`: engineering scope and limitations.
- `nodes`: node coordinates and solved displacements.
- `members`: member connectivity, properties, axial force, and force state.
- `supports`: restrained support degrees of freedom.
- `loadCases`: load case definitions, active wind direction, and nodal loads.
- `supportReactions`: solved support reactions.
- `checks`: simple numerical verification values.

## Member Force Convention

- Positive axial force means tension.
- Negative axial force means compression.
- Near-zero force is labelled `low force`.

## Coordinate Convention

- Node fields `x`, `y`, and `z` are engineering coordinates in metres because `units.length` is `m`.
- Global `X` and `Y` are horizontal plan axes.
- Global `Z` is vertical, positive upward.
- The default origin is the tower base centreline at the foundation or ground reference plane.
- Load components `fxKN`, `fyKN`, and `fzKN` align with global `X`, `Y`, and `Z`.
- The web viewer may remap axes internally for Three.js, but JSON values remain engineering coordinates.

## Viewer Colour Convention

- Tension: vivid red.
- Compression: vivid blue.
- Low force: neutral slate.
- Applied nodal load arrow: orange, with the graph label limited to signed magnitude.
- Pinned translational support: green triangular support symbol.
- Fixed frame support preview: purple block or clamp symbol.
- Colour intensity increases with absolute axial force magnitude.

## Load Display Convention

- `loadCases[].loads[]` stores true SI load values in `fxKN`, `fyKN`, and `fzKN`.
- `type` identifies the load category, such as `nodal wind load`.
- `display.arrowScale` may be `schematic` when arrow length is scaled for readability.
- Schematic arrow length must not change the numerical load value shown in the UI.
- The 3D viewport load label should show only the signed magnitude, such as `+0.20 kN`.
- The panel or table should show node ID, coordinate system, component, and direction.

## Support DOF Convention

- Phase 1 uses a truss stiffness model with active node DOF `ux`, `uy`, and `uz` only.
- Support records may include `rx`, `ry`, and `rz` so the interface can explain 6DOF support concepts.
- Rotational support fields are display context only until frame elements and rotational stiffness are implemented.
- A Phase 1 pinned translational base means `ux`, `uy`, and `uz` are restrained while rotations are not active in the solved model.

## Unit Convention

All result JSON values must use SI units. Original non-SI source dimensions may be retained only in metadata fields such as `towerReference.sourceOriginalUnits`.
