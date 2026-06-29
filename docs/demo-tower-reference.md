# TowerFlow Demo Tower Reference

## Selected Demo Geometry

The current TowerFlow demo uses an `FEC Type AA full-height triangular lattice tower` geometry.

This is not a certified FEC model and is not a construction drawing. It is an audit-sheet-derived demo geometry used to make the first structural JSON and 3D viewer more realistic than a purely arbitrary tower.

## Why This Geometry Was Chosen

The local Reference library contains `FEC Type AA - Lattice Tower Audit Sheets.pdf`, with enough Type AA schedule information to build a better first demo than the earlier generic/ROHN-inspired seed.

The FEC sheet gives a triangular self-supporting tower family, a typical module height, a top face width, nominal tower heights, actual heights, K-point face widths, and a front elevation bracing pattern. That makes it suitable for a Phase 1 visualisation and data-chain demonstration.

## Geometry Basis

- Tower type: triangular self-supporting lattice tower.
- Selected schedule row: full typical elevation to nominal 50 m Type AA tower.
- Actual demo height: 50.35 m.
- Typical module height: 4.80 m.
- Top face width: 1.50 m.
- Face width control points: 2.984 m at 21.30 m, 3.336 m at 25.20 m, 3.772 m at 30.05 m, 4.294 m at 35.85 m, 4.554 m at 38.75 m, 5.076 m at 44.55 m, and 5.598 m at 50.35 m.
- Demo levels: dense 1.50 m panel spacing plus the exact 50.35 m top level.
- Face width idealisation: piecewise-linear taper through the PDF K-point width schedule.
- Bracing idealisation: single zig-zag diagonal bracing per face between panel levels to match the PDF elevation more closely.
- Model idealisation: 3D pin-jointed truss.
- Demo section labels used by the viewer:
  - Legs: CHS/round-bar labels varying by height from the PDF module table.
  - Diagonal bracing: CHS labels varying by height from the PDF module table.
  - Horizontal bracing: round-bar labels varying by height from the PDF module table.

All TowerFlow calculation and display values remain SI.

## Source Reference

- Local PDF:
  - `C:/Users/silin/Documents/Codex/Reference/FEC Type AA - Lattice Tower Audit Sheets.pdf`
  - Accessed: 2026-06-29
- Codex reference extraction pack:
  - `C:/Users/silin/Documents/Codex/Reference/_codex_reference_packs/fec-type-aa-lattice-tower-audit-sheets/`
  - Accessed: 2026-06-29

## Engineering Use

Use this only as demo geometry for visualisation and data-flow testing.

Do not use this model for:

- Site-specific design.
- Manufacturer substitution.
- Australian Standards capacity certification.
- Foundation, guy wire, or connection design.

If an authorized manufacturer drawing, project drawing, or full digital tower schedule becomes available, this demo geometry should be replaced with a properly sourced tower definition.
