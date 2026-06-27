# TowerFlow (Aussie Edition) Roadmap

## Project Rule

All product-facing outputs must be in English.

This includes the web interface, labels, tooltips, reports, charts, exported files, JSON schemas, examples, calculation summaries, and release documentation.

Chinese can be used for project discussion, but the delivered product must remain English-first.

## Product Positioning

TowerFlow is a lightweight web-based engineering tool for Australian communication and utility towers.

The first practical product target is:

> Australian tower equipment co-location capacity screening and visual engineering review.

TowerFlow should help engineers, asset owners, and operators answer:

- Can this tower accept new equipment?
- Which member, wind direction, or foundation component controls the result?
- How close is the tower to its limit state?
- What strengthening option may recover capacity?
- Which assets should be reviewed first?

The product must be calculation-led, not graphics-led. 3D visualisation exists to explain structural behaviour and asset risk, not to replace engineering verification.

## Calculation Reference Policy

TowerFlow calculations must be developed against traceable project references.

Primary project reference folder:

```text
C:\Users\silin\Documents\Codex\Reference
```

Current tower-software reference files saved in that folder:

- `Bentley_OpenTower_Designer_eBook.pdf`
- `Bentley_OpenTower_Product_Data_Sheet.pdf`
- `TowerFlow_reference_sources.md`

Reference rules:

- Check the local `Reference` folder before implementing or changing calculation logic.
- Treat Bentley OpenTower material as product and workflow reference material, not as a substitute for design-code equations.
- Do not use MSTower material as an authoritative reference unless an authorized copy or verified official source is available.
- Record any reference used by a calculation in the relevant assumptions, verification, or source note.
- Australian Standards and project-approved engineering references remain the authority for design equations and capacity checks.
- When a software manual and a design code disagree, the calculation must follow the design code unless a project-specific engineering decision is documented.

## Commercial Software Interface Direction

TowerFlow should look like a concise commercial engineering software product, not a marketing landing page or visual demo.

Interface style rules:

- Use commercial software layout logic:
  - A predictable work area for the model or drawing.
  - A compact parameter/control area for inputs and commands.
  - A persistent result/inspection area for selected objects and governing checks.
  - Clear separation between navigation, input, visualisation, and output.
  - Stable dimensions for repeated controls, toolbars, result tiles, tables, and panels.
  - Workflows should support repeated engineering review, not one-time presentation.
- Prioritise scanability:
  - Important results should be visible without hunting.
  - Tables, labels, and values should align consistently.
  - Dense information is acceptable when it is grouped and readable.
  - Decorative space should not reduce engineering information density.
- Use a simple technical palette: light engineering grey backgrounds, deep graphite text, and restrained cyan/green accents.
- Preserve red and blue as semantic structural result colours:
  - Red: tension or overstress where applicable.
  - Blue: compression.
  - Grey: low force or neutral state.
- Keep typography hierarchical and compact:
  - Clear page title.
  - Smaller section titles.
  - Monospace or tabular styling for numerical engineering values.
  - Uppercase compact labels for data fields.
- Keep the 3D canvas visually clean with subtle grid, lighting, and engineering-style overlays.
- Keep information panels dense but readable, with no decorative card-heavy marketing layout.
- Avoid hero-page, brochure, or landing-page patterns inside the application experience.
- Maintain mobile-first readability:
  - No overlapping title, buttons, watermark, or result panels.
  - Controls must remain tappable.
  - Text must wrap within its container.
- Public prototypes should include a subtle `sconmyway` watermark.

## Technical Direction

The proposed technical direction is suitable, but the order of adoption matters.

Recommended stack:

- Frontend application: React, TypeScript, and Vite.
- 3D rendering: Three.js, React Three Fiber, and Drei.
- Charts and dashboards: Apache ECharts.
- Backend API: Python and FastAPI.
- Early structural analysis: PyNite or a small purpose-built 3D truss solver.
- Data exchange: versioned JSON.
- Detailed 3D assets: Blender exported to glTF or GLB.
- Reports: HTML or PDF first, with Word and Excel exports considered later.
- Verification: Python tests, hand-check examples, browser screenshots, and calculation audit notes.

Priority rules:

- Use Python plus JSON plus React Three Fiber as the Phase 1 foundation.
- Generate the main tower geometry procedurally instead of relying on CAD or BIM imports.
- Keep CAD, BIM, and high-detail finite element assets out of the first MVP.
- Use Blender later for local detail models such as base plates, anchor bolts, grout layers, and concrete blocks.
- Use stable engineering visualisation first: colour, thickness, labels, tables, and charts.
- Treat custom shaders and animated force-flow effects as enhancements, not core engineering logic.
- Use OpenSees, CalculiX, Code_Aster, or other heavier solvers only after the lightweight workflow is trusted.

The first working chain should be:

```text
Python structural solver
    -> JSON result file
    -> React Three Fiber tower viewer
    -> member force colouring
    -> member click information panel
    -> English result dashboard
```

The second working chain should be:

```text
FastAPI backend
    -> parameter inputs
    -> live solve
    -> simplified AS/NZS 1170.2 wind loading
    -> AS 4100 member utilisation
    -> ECharts dashboard
```

The later foundation chain should be:

```text
Tower base reactions
    -> Blender/glTF base detail model
    -> anchor bolt and base plate visualisation
    -> concrete cone visualisation
    -> equilibrium audit panel
```

## Phase 0: Project Foundation

### Objective

Set the technical and engineering foundation before building the first prototype.

### Main Work

- Define the first use case: communication tower co-location screening.
- Confirm the initial tower type: simplified triangular lattice tower.
- Define the first analysis boundary:
  - Steel tower superstructure only.
  - Simplified wind loading.
  - Member axial force focus.
  - No detailed connection design.
  - No detailed foundation design.
- Define the first result schema:
  - Nodes.
  - Members.
  - Supports.
  - Loads.
  - Load cases.
  - Member forces.
  - Support reactions.
  - Utilisation results.
- Establish engineering documentation standards:
  - Inputs.
  - Units.
  - Assumptions.
  - Code references.
  - Software reference notes.
  - Known limitations.
  - Verification examples.
- Establish the initial project reference register from:
  - `C:\Users\silin\Documents\Codex\Reference`
  - OpenTower reference PDFs.
  - Any authorized MSTower manual provided later.
- Confirm the initial software stack:
  - React, TypeScript, and Vite for the web app.
  - React Three Fiber and Three.js for 3D.
  - Python for structural calculations.
  - JSON as the first data contract.
  - FastAPI reserved for the first live backend phase.

### Deliverables

- Project roadmap.
- Initial JSON schema draft.
- Calculation assumptions note.
- Calculation reference register.
- Example tower geometry definition.
- Technical stack decision note.

### Exit Criteria

- MVP scope is narrow and explicit.
- All product output language is confirmed as English.
- The first structural model boundary is clear.
- The data contract between analysis and frontend is defined.
- Calculation references and their authority level are documented.

## Phase 1: Static Digital Twin Prototype

### Objective

Prove the full chain from structural analysis data to interactive 3D web visualisation without a server.

### Engineering Scope

- Build a simplified single-panel or multi-panel triangular tower model.
- Use offline Python analysis to generate static result data.
- Use PyNite or a small purpose-built 3D truss solver for the first analysis loop.
- Apply one simplified horizontal wind load case.
- Export structural results to JSON.
- Include:
  - Node coordinates.
  - Member connectivity.
  - Member axial force.
  - Tension or compression state.
  - Support reactions.

### Frontend Scope

- Build a React Three Fiber / Three.js viewer.
- Render the tower skeleton in 3D using procedural geometry.
- Colour members by axial force state:
  - Tension: red.
  - Compression: blue.
  - Low force: neutral grey.
- Scale colour intensity by force magnitude.
- Add orbit controls, lighting, camera framing, and basic scene reset.
- Add member selection by click or hover.
- Use clear engineering graphics before advanced shader effects.
- Apply the project commercial software interface direction:
  - Predictable model work area.
  - Compact result and inspection panel.
  - Stable controls and no layout shift during review.
  - Light technical background.
  - Deep graphite text.
  - Restrained cyan/green accents.
  - Compact engineering data hierarchy.
  - Subtle `sconmyway` watermark for public prototypes.
- Show an English information panel with:
  - Member ID.
  - Force type.
  - Axial force.
  - Basic engineering interpretation.

### Explicitly Out of Scope

- Live backend solving.
- Full AS/NZS 1170.2 wind procedure.
- Full AS 4100 capacity checks.
- Foundation and anchor bolt design.
- High-detail finite element stress texture mapping.
- CAD or BIM import workflows.
- Blender detail models, except for optional visual experiments.
- Reliability analysis.
- Certification-ready reports.

### Deliverables

- Static web prototype.
- Example JSON result file.
- Offline Python generation script.
- Basic visual verification notes.
- Basic interface style verification notes for desktop and mobile.

### Exit Criteria

- The web app loads structural JSON successfully.
- The 3D tower geometry matches the analysis model.
- Member colours match force signs and magnitudes.
- At least one load case is manually checked for basic equilibrium.
- The user can identify force flow through the tower visually.
- The interface respects the project typography, colour, mobile, and watermark rules.

## Phase 2: Parametric Analysis MVP

### Objective

Turn the static prototype into a basic interactive engineering calculator.

### Engineering Scope

- Add a lightweight Python/FastAPI backend.
- Wrap the structural solver behind API endpoints.
- Allow user-controlled input parameters:
  - Tower height.
  - Panel spacing.
  - Base width.
  - Wind speed.
  - Wind direction.
  - Equipment weight.
  - Equipment projected area.
  - Equipment mounting height.
- Generate simplified wind loading from input parameters.
- Solve several wind directions:
  - 0 degrees.
  - 60 degrees.
  - 90 degrees.
- Return updated member forces and support reactions.

### Frontend Scope

- Add an English control panel for user inputs.
- Refresh the 3D tower result after solving.
- Add loading, error, and invalid-input states.
- Add result summary cards:
  - Maximum axial force.
  - Controlling member.
  - Controlling wind direction.
  - Maximum base reaction.
- Add basic charts:
  - Wind pressure versus height.
  - Top member forces.
- Use Apache ECharts for dashboard charts.

### Explicitly Out of Scope

- Detailed AS 4100 design capacity.
- Multi-tower asset portfolio.
- Foundation design.
- OpenSees, CalculiX, Code_Aster, or other heavy solver integration.
- Advanced strengthening optimisation.
- Reliability index or failure probability.

### Deliverables

- FastAPI backend.
- Interactive frontend controls.
- API input and output schema.
- Three verified example cases.

### Exit Criteria

- User can change wind and equipment parameters.
- Backend solves and returns updated results.
- Frontend updates without manual page reload.
- Numerical output is consistent with the 3D visual result.
- At least three non-default cases are tested and documented.

## Phase 3: Australian Code-check Screening

### Objective

Add first-pass Australian Standards-aligned member utilisation checks.

### Engineering Scope

- Implement simplified AS/NZS 1170.2 wind pressure logic for the initial use case.
- Implement first-pass AS 4100 steel member checks:
  - Tension capacity.
  - Compression capacity.
  - Slenderness limit checks.
  - Member utilisation ratio.
- Track governing result by:
  - Load case.
  - Wind direction.
  - Member.
  - Limit state.

### Frontend Scope

- Colour members by utilisation ratio:
  - Below 0.7: acceptable.
  - 0.7 to 1.0: high utilisation.
  - Above 1.0: overstressed.
- Add a member utilisation table.
- Add filters for:
  - Overstressed members.
  - Compression members.
  - Tension members.
  - Governing load case.
- Add a compact engineering summary panel.
- Allow export of a simple English calculation summary.
- Keep charts and tables audit-friendly rather than decorative.

### Explicitly Out of Scope

- Final design certification.
- Full connection design.
- Full foundation design.
- Fatigue assessment.
- Full terrain, shielding, and topographic complexity.

### Deliverables

- Code-check engine.
- Member utilisation visualisation.
- Engineering summary export.
- Verification examples with known input and output values.

### Exit Criteria

- The app identifies overstressed members.
- Utilisation ratios are numerically traceable.
- Governing wind direction and member are clearly reported.
- Calculation assumptions and limitations are visible in English.

## Phase 4: Strengthening and Scenario Comparison

### Objective

Allow users to compare equipment addition and strengthening options.

### Engineering Scope

- Add scenario management:
  - Existing tower.
  - Proposed equipment.
  - Strengthened tower.
- Allow selected member section upgrades.
- Allow simple bracing or member replacement assumptions.
- Recalculate utilisation after strengthening.
- Compare before-and-after results.

### Frontend Scope

- Add scenario tabs or a scenario selector.
- Show before-and-after utilisation maps.
- Show capacity recovery metrics:
  - Maximum utilisation before.
  - Maximum utilisation after.
  - Number of overstressed members before.
  - Number of overstressed members after.
- Add side-by-side result comparison.

### Explicitly Out of Scope

- Automated optimal strengthening design.
- Detailed fabrication drawings.
- Connection strengthening design.
- Cost estimating beyond rough placeholders.

### Deliverables

- Scenario comparison workflow.
- Strengthening input controls.
- Before-and-after engineering summary.

### Exit Criteria

- User can test a proposed equipment addition.
- User can apply a simple strengthening option.
- The app shows whether utilisation improves.
- Result comparison is clear enough for early engineering discussion.

## Phase 5: Foundation and Anchorage Load Path

### Objective

Extend the load path from the tower legs into the base plate, hold-down bolts, grout layer, and concrete foundation.

### Engineering Scope

- Use tower base reactions as foundation input.
- Calculate simplified base plate compression zones.
- Calculate hold-down bolt group tension distribution.
- Estimate shear transfer assumptions.
- Estimate local concrete bearing pressure.
- Add simplified concrete breakout cone visualisation for uplift cases.
- Add an equilibrium monitor:

```text
Sum of vertical forces = bolt tension + concrete compression + self-weight effects
Sum of moments = applied overturning moment
```

### Frontend Scope

- Add a foundation detail view.
- Render base plate, bolts, grout layer, and concrete block.
- Use Blender-exported glTF or GLB models for detailed local components if procedural geometry becomes inefficient.
- Show uplift and compression zones.
- Show bolt tension values.
- Show transparent concrete breakout cone geometry.
- Show an English equilibrium audit panel.

### Explicitly Out of Scope

- Full nonlinear concrete modelling.
- Detailed finite element foundation simulation.
- Site-specific geotechnical design.
- Certification-ready anchorage design.

### Deliverables

- Foundation load path module.
- Bolt force and base pressure visualisation.
- Optional Blender/glTF local detail asset.
- Foundation equilibrium summary.

### Exit Criteria

- Tower reactions pass consistently into the foundation module.
- Bolt forces and compression resultants satisfy static equilibrium.
- Visual foundation behaviour matches the numerical summary.
- Assumptions and simplifications are clearly stated.

## Phase 6: Reliability and Portfolio Risk

### Objective

Move from deterministic single-tower checks to probability-informed asset risk management.

### Engineering Scope

- Add variability inputs:
  - Wind action.
  - Steel yield strength.
  - Member capacity.
  - Concrete strength.
  - Equipment loading.
- Add reliability methods:
  - First-order reliability method.
  - Response surface approximation.
  - Selected Monte Carlo checks.
- Calculate:
  - Reliability index beta.
  - Failure probability.
  - Risk ranking.
- Add portfolio-level asset comparison.

### Frontend Scope

- Add deterministic and probabilistic result modes.
- Show beta and failure probability separately from utilisation ratio.
- Add portfolio risk table.
- Add filters by:
  - Region.
  - Tower type.
  - Remaining capacity.
  - Risk level.
  - Required review priority.

### Explicitly Out of Scope

- Claiming final probability of collapse without validated models.
- Replacing detailed engineering inspection.
- Automated insurance pricing.
- Unverified asset-wide recommendations.

### Deliverables

- Reliability calculation prototype.
- Portfolio risk dashboard.
- Risk ranking summary.
- Reliability assumptions documentation.

### Exit Criteria

- Deterministic utilisation and probabilistic risk are clearly separated.
- Users can rank towers by review priority.
- Reliability assumptions are editable and transparent.
- Outputs are framed as screening results, not final certification.

## Phase 7: Utility and Transmission Tower Expansion

### Objective

Extend the platform beyond communication towers after the core workflow is trusted.

### Engineering Scope

- Add utility tower load types:
  - Conductor self-weight.
  - Wind on conductors.
  - Line tension.
  - Broken wire load cases.
  - Insulator and crossarm loads.
- Add transmission-specific load path visualisation.
- Validate whether the same data model can support utility assets.

### Frontend Scope

- Add asset type selection.
- Add conductor and crossarm visual elements.
- Add utility-specific load case controls.
- Add utility portfolio risk views.

### Explicitly Out of Scope

- Utility expansion before communication tower workflow is stable.
- Full replacement of specialist transmission design software.
- Complex conductor dynamics in the first utility release.

### Deliverables

- Utility tower proof of concept.
- Transmission load case schema.
- Migration notes from communication tower workflow.

### Exit Criteria

- The platform can represent at least one utility tower example.
- Transmission-specific loads can be entered and visualised.
- Results remain traceable and clearly bounded.

## MVP Boundary

The first MVP should include only:

- One simplified triangular communication tower model.
- One equipment addition workflow.
- Simplified Australian wind loading.
- Basic structural solving.
- Basic member utilisation or force visualisation.
- English 3D interface.
- English engineering summary.

The first MVP should avoid:

- Full finite element meshing.
- Detailed connection design.
- Detailed foundation design.
- Full reliability engine.
- Automated certification wording.
- Too many tower geometries.
- Over-complex visual effects that are not tied to calculation data.

## Release Definition of Done

Each release should include:

- Working web interface.
- Example input set.
- Example output set.
- Calculation assumptions.
- Unit checks.
- Verification case.
- Known limitations.
- Versioned JSON or API schema.
- English documentation for product-facing material.
- Reference list for any engineering calculation used in the release.
- Interface check against the project commercial software layout, typography, colour, scanability, and mobile layout rules.

## Product North Star

TowerFlow should become a trusted engineering interface between structural calculations and asset decisions.

The long-term platform should connect:

```text
Tower geometry
    -> Wind and equipment loading
    -> Structural analysis
    -> Australian code checks
    -> Load path visualisation
    -> Strengthening scenarios
    -> Reliability and risk ranking
    -> Asset-level decision support
```
