# Software Calculation References

This file records official or primary documentation sources that are useful for TowerFlow's calculation engine, verification strategy, 3D result presentation, and future solver choices.

The purpose is not to copy commercial manuals. The purpose is to keep a traceable reference map: where to look, what each source is useful for, and how it should influence TowerFlow.

## Reference Policy

- Use official vendor, project, or maintainer documentation where possible.
- Do not copy proprietary manuals into this repository unless the licence clearly allows it.
- Prefer short notes, links, and implementation relevance over pasted manual content.
- Treat commercial tools as benchmarking and workflow references, not as code sources.
- Treat open-source tools as possible implementation references only after checking licence compatibility.
- Product-facing TowerFlow outputs remain in English.

## Commercial Software References

### SPACE GASS

Official links:

- Product site: https://www.spacegass.com/
- Technical specifications: https://www.spacegass.com/specifications
- User manual entry: https://spacegass.com/manual/Introduction/Introduction.htm
- Resources page: https://www.spacegass.com/resources

Relevant official notes:

- SPACE GASS is a general-purpose 2D and 3D structural analysis and design program for frames, trusses, grillages, beams, and plates.
- It explicitly targets structures from small beams and trusses through high-rise buildings, towers, cranes, and bridges.
- Its specification page lists linear and nonlinear analysis, small/finite/large displacement theories, buckling analysis, tension-only and compression-only members, elastic supports, axial force diagrams, stress diagrams, plate/member contour diagrams, and integrated reports.
- It is especially relevant because it is widely used in Australia and New Zealand.

TowerFlow relevance:

- Strong reference for Australian engineering workflow expectations.
- Useful benchmark for model input concepts: nodes, members, restraints, member releases, load cases, load combinations, and graphical result filters.
- Useful benchmark for output expectations: deformed shape, axial force, member diagrams, utilisation-style visualisation, and report generation.
- Do not attempt to match the full feature set in the MVP.

Recommended TowerFlow takeaway:

- Early TowerFlow should mimic the clarity of SPACE GASS result reporting, not its full modelling breadth.
- Prioritise a clean model/result database and graphical filters early.

### RISA-3D and RISAFoundation

Official links:

- Product site: https://risa.com/
- Product documentation hub: https://risa.com/product-updates
- RISA-3D General Reference PDF: https://risa.com/hubfs/General%20Reference/General_Reference_3D.pdf
- RISA-3D Verification Problems: https://risa.com/hubfs/Verification%20Problems/RISA-3D_Verification_Problems.zip
- RISAFoundation General Reference PDF: https://risa.com/hubfs/General%20Reference/General_Reference_FD.pdf
- Online help hub: https://risa.com/help

Relevant official notes:

- RISA describes RISA-3D as a general 3D analysis and design product.
- The documentation hub exposes general reference manuals and verification problem packages.
- RISAFoundation is relevant for later foundation and anchorage workflows.

TowerFlow relevance:

- Strong reference for verification packaging: example models, known results, and design/reference manuals.
- RISAFoundation is relevant for Phase 5 style foundation reporting, even though TowerFlow should start with simplified equilibrium-based checks.

Recommended TowerFlow takeaway:

- Build a `verification` mindset early: each solver feature needs at least one small reproducible example.
- Keep result summaries traceable enough that an engineer can compare TowerFlow with a commercial package.

### SAP2000 / CSI

Official links:

- SAP2000 product page: https://www.csiamerica.com/products/sap2000
- CSI knowledge base: https://wiki.csiamerica.com/

Relevant official notes:

- SAP2000 is positioned by CSI as structural analysis and design software using the SAPFire analysis engine.
- The product page notes multiple 64-bit solvers, eigen analysis, Ritz analysis, solver optimisation, meshing features, and code-based design features.

TowerFlow relevance:

- Useful as a high-level benchmark for analysis engine scope and reporting maturity.
- Useful reference for separating modelling, analysis, design, and reporting within one interface.
- Not a good target for MVP feature parity.

Recommended TowerFlow takeaway:

- Keep TowerFlow modular: modelling, solving, code-checking, and reporting should remain separate internal layers.
- Avoid heavy meshing and general-purpose FEA in early releases.

### Dlubal RFEM / RSTAB / RWIND

Official links:

- RFEM 6 online manual: https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6
- Dlubal product page and documentation hub: https://www.dlubal.com/
- Dlubal API documentation entry: https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6

Relevant official notes:

- RFEM is presented as a finite element analysis platform for members, surfaces, solids, and contact elements.
- RSTAB is presented as a 3D beam, frame, and truss analysis product.
- Dlubal exposes API-oriented workflows using Python and C#.
- RWIND is relevant later as a conceptual reference for wind simulation, but it is outside the MVP scope.

TowerFlow relevance:

- Good reference for parametric modelling and API-driven structural workflows.
- Good reference for separating general FEA from beam/truss-specific workflows.
- Useful for later thinking about wind load generation and digital wind tunnel concepts.

Recommended TowerFlow takeaway:

- TowerFlow should follow an API-first data model from the beginning.
- Keep the MVP closer to RSTAB-style frame/truss analysis than RFEM-style general FEA.

### Strand7

Official links:

- Product site: https://www.strand7.com/
- Online help: https://www.strand7.com/strand7r3help/
- Webnotes entry: https://www.strand7.com/webnotes/

Relevant official notes:

- Strand7 is a finite element analysis package with online help and Webnotes.
- The Webnotes are described by Strand7 as a library covering modelling, application, usage, installation, and general background/theory of FEA.
- Some Webnotes require supported-user login.

TowerFlow relevance:

- Useful Australian FEA reference for later detailed local models, base plate studies, and high-detail stress visualisation.
- Not suitable as a direct MVP dependency.

Recommended TowerFlow takeaway:

- Use Strand7-style FEA thinking only for later validation and local component studies.
- Do not make FEA stress plots the core of Phase 1.

## Open-source Software References

### PyNite

Official links:

- Documentation home: https://pynite.readthedocs.io/en/latest/
- Analysis documentation: https://pynite.readthedocs.io/en/latest/analysis.html
- Stability documentation: https://pynite.readthedocs.io/en/latest/stability.html
- P-Delta documentation: https://pynite.readthedocs.io/en/latest/PDelta.html

Relevant official notes:

- PyNite provides simple finite element analysis for Python.
- It supports sparse and dense matrix solvers.
- Linear analysis uses superposition and is limited to models without nonlinear features.
- General analysis can iterate for tension-only or compression-only elements or supports.
- The stability notes are useful for debugging rigid body motion, nodal instability, and second-order effects.

TowerFlow relevance:

- Best early candidate for Phase 1 or Phase 2 if we do not write a small custom 3D truss solver.
- Good Python-native fit for FastAPI and JSON workflows.
- Documentation is practical but not a full theory manual, so TowerFlow still needs its own calculation notes.

Recommended TowerFlow takeaway:

- Use PyNite only if its member behaviour, releases, load handling, and output access stay transparent enough for audit.
- For the first truss-only MVP, a small custom 3D truss solver may still be clearer and easier to verify.

### OpenSees / OpenSeesPy

Official links:

- OpenSees documentation: https://opensees.github.io/OpenSeesDocumentation/
- OpenSeesPy documentation: https://openseespydoc.readthedocs.io/en/latest/
- OpenSeesPy truss element: https://openseespydoc.readthedocs.io/en/latest/src/trussEle.html
- OpenSeesPy corotational truss element: https://openseespydoc.readthedocs.io/en/latest/src/corotTruss.html

Relevant official notes:

- OpenSees is a finite element framework originally developed for performance-based earthquake engineering.
- OpenSees documentation states it is used for structures under natural hazards including fire, wind, earthquake, and wave action.
- OpenSeesPy exposes structural commands, elements, materials, constraints, recorders, and examples in Python.
- The truss element documentation is directly relevant to member-based tower models, but the basic truss element note states that it does not include geometric nonlinearities.

TowerFlow relevance:

- Strong future candidate for nonlinear, dynamic, and research-grade workflows.
- Useful reference for element taxonomy, material models, recorders, and advanced analysis architecture.
- Too heavy for the first MVP unless a specific feature requires it.

Recommended TowerFlow takeaway:

- Keep OpenSeesPy as a later solver option.
- Do not introduce it before the lightweight JSON and visual workflow is stable.

### Frame3DD

Official links:

- Project site: https://frame3dd.sourceforge.net/
- Documentation and downloads are linked from the project site.

Relevant official notes:

- Frame3DD is free open-source software for static and dynamic structural analysis of 2D and 3D frames and trusses with elastic and geometric stiffness.
- It computes static deflections, reactions, internal element forces, natural frequencies, mode shapes, and modal participation factors using direct stiffness and mass assembly.
- It includes examples, including a triangular tower example.
- It is GPL licensed.

TowerFlow relevance:

- Very relevant as an open-source calculation reference for frame/truss direct stiffness workflows.
- The triangular tower example is especially relevant for TowerFlow validation thinking.
- GPL licence means direct code reuse inside a closed-source or permissively licensed product would need careful legal review.

Recommended TowerFlow takeaway:

- Use Frame3DD as a calculation and verification reference, not as copied source code.
- Study its input/output structure and example cases for TowerFlow's own verification suite.

### CalculiX

Official links:

- Project site: https://www.calculix.de/
- Downloads and documentation are linked from the project site.

Relevant official notes:

- CalculiX is a free three-dimensional structural finite element program.
- It supports finite element model building, solving, and post-processing.
- The solver can perform linear and nonlinear calculations with static, dynamic, and thermal solutions.
- It uses an Abaqus-style input format.
- It is GPL licensed.

TowerFlow relevance:

- Useful later for detailed local component studies, such as base plates, anchor bolts, and stress visualisation.
- Not appropriate for the first tower-level MVP.

Recommended TowerFlow takeaway:

- Keep CalculiX as a future offline verification or stress-field generation tool.
- Do not couple the main web workflow to CalculiX until the simplified engineering model is mature.

### Code_Aster

Official links:

- Project site: https://www.code-aster.org/
- Documentation entry: https://www.code-aster.org/

Relevant official notes:

- Code_Aster is positioned as a structures and thermomechanics analysis program for studies and research.
- The official site provides documentation, training, downloads, and support/community links.

TowerFlow relevance:

- Useful later for advanced structural or thermomechanical research workflows.
- Too broad and heavy for Phase 1 or Phase 2.

Recommended TowerFlow takeaway:

- Treat Code_Aster as a long-term reference for serious nonlinear FEA, not as a near-term dependency.

## TowerFlow Implementation Guidance from These References

### MVP Solver Direction

Use one of these two paths:

- Preferred for maximum transparency: write a small 3D truss direct-stiffness solver for the first MVP.
- Preferred for faster feature coverage: use PyNite, but wrap it behind TowerFlow's own result schema.

The first MVP should not depend on OpenSees, CalculiX, Code_Aster, or commercial software.

### Verification Direction

Create a local verification library with:

- A single 3D truss benchmark.
- A triangular tower benchmark.
- A cantilever or portal frame benchmark if frame elements are introduced.
- Static equilibrium checks.
- Support reaction checks.
- Member force sign convention checks.
- JSON fixture files with expected results.

Frame3DD examples and RISA verification packages are good references for how to structure this.

### UI and Reporting Direction

Commercial tools consistently separate:

- Model input.
- Analysis result display.
- Design/code-check result display.
- Graphical filtering.
- Tabular output.
- Report generation.

TowerFlow should copy that separation conceptually:

- 3D view for spatial understanding.
- Dashboard for governing results.
- Tables for auditability.
- Exported English summary for communication.

### Foundation and Local Stress Direction

Do not begin with full FEA. Start with equilibrium-based engineering checks:

- Base reactions.
- Bolt group tension distribution.
- Concrete compression resultants.
- Base plate bearing zones.
- Simplified concrete cone visualisation.

Use Strand7, CalculiX, Code_Aster, or similar FEA tools later for validating local stress fields or generating static visual assets.

## Priority Reading List

Read first for Phase 1:

1. PyNite analysis and stability documentation.
2. Frame3DD overview and triangular tower example.
3. SPACE GASS specification and manual introduction.

Read first for Phase 2 and Phase 3:

1. PyNite P-Delta notes.
2. RISA-3D general reference and verification problems.
3. SPACE GASS technical specifications.

Read first for Phase 5:

1. RISAFoundation general reference.
2. Strand7 help and Webnotes.
3. CalculiX documentation and examples.

Read only for later advanced solver strategy:

1. OpenSees/OpenSeesPy documentation.
2. Code_Aster documentation.
3. Dlubal RFEM/RSTAB and API documentation.

