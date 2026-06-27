# TowerFlow Phase 1 Verification Notes

## Current Case

- Case ID: `tower-001-static-wind-x`
- Solver: offline Python 3D truss solver.
- Viewer: static HTML and JavaScript using Three.js.
- Load case: simplified horizontal wind in global X direction.

## Required Checks

- The JSON file loads in the browser.
- The 3D tower has the same node and member count as the JSON file.
- Tension members render red.
- Compression members render blue.
- Low-force members render grey.
- Selecting a member updates the information panel.
- The global X force balance in `checks.forceBalanceFxKN` is close to zero.

## Current Limitation

This is not an Australian Standards capacity check. It is a static data-chain and engineering visualisation prototype only.
