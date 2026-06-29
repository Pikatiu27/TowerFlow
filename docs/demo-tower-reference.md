# TowerFlow Demo Tower Reference

## Selected Demo Geometry

The current TowerFlow demo uses an `FEC Type AA triangular lattice tower` geometry.

This is not a certified FEC model and is not a construction drawing. It is an audit-sheet-derived demo geometry used to make the first structural JSON and 3D viewer more realistic than a purely arbitrary tower.

## Why This Geometry Was Chosen

The local Reference library contains `FEC Type AA - Lattice Tower Audit Sheets.pdf`, with enough Type AA schedule information to build a better first demo than the earlier generic/ROHN-inspired seed.

The FEC sheet gives a triangular self-supporting tower family, a typical module height, a top face width, and nominal tower heights with corresponding actual heights and K-point face widths. That makes it suitable for a Phase 1 visualisation and data-chain demonstration.

## Geometry Basis

- Tower type: triangular self-supporting lattice tower.
- Selected schedule row: nominal 20 m Type AA tower.
- Actual demo height: 21.30 m.
- Typical module height: 4.80 m.
- Top face width: 1.50 m.
- Face width at K-point: 2.984 m.
- Demo levels: 0.00 m, 4.80 m, 9.60 m, 14.40 m, 19.20 m, and 21.30 m.
- Face width idealisation: linear taper from 2.984 m at the base/K-point reference to 1.500 m at the top.
- Model idealisation: 3D pin-jointed truss.

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
