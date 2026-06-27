# TowerFlow Phase 1 Result Schema Draft

## File

`public/data/tower-001.results.json`

## Top-Level Fields

- `schemaVersion`: version of the static result contract.
- `caseId`: unique result case identifier.
- `title`: human-readable case title.
- `units`: length, force, and stress units.
- `analysisBoundary`: engineering scope and limitations.
- `nodes`: node coordinates and solved displacements.
- `members`: member connectivity, properties, axial force, and force state.
- `supports`: restrained support degrees of freedom.
- `loadCases`: load case definitions and nodal loads.
- `supportReactions`: solved support reactions.
- `checks`: simple numerical verification values.

## Member Force Convention

- Positive axial force means tension.
- Negative axial force means compression.
- Near-zero force is labelled `low force`.

## Viewer Colour Convention

- Tension: red.
- Compression: blue.
- Low force: neutral grey.
- Colour intensity increases with absolute axial force magnitude.
