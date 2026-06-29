# MStower Modeling Taxonomy Reference

## Purpose

This note captures tower-modeling vocabulary and model organization learned from the local MStower V6 manual. It is a TowerFlow reference aid, not a copied manual and not a design-code authority.

Use this file when deciding:

- What a tower model object should be called.
- How to split a tower into panels, faces, bracing systems, members, supports, guys, ancillaries, and load cases.
- Which data concepts should appear in TowerFlow schemas and UI panels.

Do not use this file as a source for design equations. TowerFlow calculations must still follow the adopted design standards and project calculation notes.

## Source

Primary local source:

```text
C:/Users/silin/Documents/Codex/Reference/Mst6 2008.pdf
```

Compact citations used in this note:

- `Mst6 2008.pdf | 1:Introduction | PDF pages 13-16 | printed pages 1-4`
- `Mst6 2008.pdf | 5:Tower Data | PDF pages 56-72 | printed pages 44-60`
- `Mst6 2008.pdf | 6:Standard Panels | PDF pages 84-89 | printed pages 72-77`
- `Mst6 2008.pdf | 7:User-Defined Panels | PDF pages 129-137 | printed pages 117-125`
- `Mst6 2008.pdf | 8:Graphics Input for UDPs | PDF pages 139-148 | printed pages 127-136`
- `Mst6 2008.pdf | 9:Tower Loading | PDF pages 160-190 | printed pages 148-178`
- `Mst6 2008.pdf | 11:Analysis | PDF page 209 | printed page 197`

## High-Level Model Concept

MStower treats a tower as a generated structural model assembled from reusable geometric components:

```text
tower profile
    -> panels by height
    -> faces by orientation
    -> face bracing, plan bracing, hip bracing, cross-arms
    -> generated nodes and members
    -> supports, guys, sections, materials, bolts
    -> loading file with load cases and ancillaries
```

TowerFlow should follow the same object separation. The tower should not be treated as one monolithic mesh.

## Tower Types

The manual scope covers these broad structure types:

| TowerFlow term | MStower-aligned meaning | Notes |
| --- | --- | --- |
| `self_supporting_lattice_tower` | Freestanding lattice tower | Can be three-sided or four-sided. |
| `communication_tower` | Lattice tower carrying communication equipment | TowerFlow's first commercial target. |
| `power_transmission_tower` | Lattice tower for power transmission | Later utility expansion target. |
| `guyed_mast` | Mast stabilized by guys/cables | Needs guy members, guy groups, anchor data, and nonlinear analysis awareness. |
| `steel_monopole` | Single cantilevered tubular pole | Different modelling path from lattice panels. |
| `rectangular_lattice_tower` | Four-sided tower with different X-face and Y-face widths/bracing | MStower V6 can distinguish X and Y faces. |

TowerFlow Phase 1 should stay with `self_supporting_lattice_tower`, preferably triangular or square, until the schema and viewer are stable.

## Coordinate and Orientation Concepts

MStower modelling assumes a global tower coordinate frame with vertical `Z`. TowerFlow already follows `Z`-up engineering data, so this aligns well.

Important orientation concepts for TowerFlow:

- `global_x`, `global_y`, `global_z`: engineering axes.
- `tower_axis`: vertical centreline, normally global `Z`.
- `face_normal`: orientation of a tower face in plan.
- `member_local_x`: member start-to-end axis.
- `member_reference_node`: a third node used to define local section orientation for members that need a controlled cross-section orientation.

TowerFlow should keep a future field for `referenceNodeId` or `orientationReference`, even if Phase 1 truss members do not yet use it.

## Core Data Blocks

MStower's tower data file is organized into logical blocks. TowerFlow should map these to explicit schema sections.

| MStower concept | TowerFlow schema concept | Purpose |
| --- | --- | --- |
| Title block | `metadata` | Job title, source, units, model status. |
| Component block | `customPanels` / `componentLibraryRefs` | User-defined panels or reusable panel definitions. |
| Profile block | `towerProfile` | Faces, base width, panel heights, top widths, face/plan/hip/cross-arm systems. |
| Supports block | `supports` | Support nodes or support legs, restraint type, releases, springs. |
| Guys block | `guys` | Guy geometry, anchors, pretension, library reference. |
| Sections block | `sections` | Section property IDs and library section names. |
| Material block | `materials` | Elastic modulus, density, thermal coefficient, Poisson ratio. |
| Bolt data block | `boltDefinitions` | Bolt grades, shear/tension capacity data, connection metadata. |

TowerFlow should keep geometry, support, material/section, and load data separate. This helps avoid mixing visual geometry with analysis assumptions.

## Tower Profile Objects

The profile block is the main tower generator concept.

| Object | Meaning | TowerFlow field suggestion |
| --- | --- | --- |
| `faces` | Number of tower faces, typically 3 or 4 | `faceCount` |
| `base width` | Width at the bottom panel | `baseWidthM` |
| `base depth` | Rectangular-tower Y-face depth | `baseDepthM` |
| `base level` | Elevation/reference level at bottom nodes | `baseElevationM` |
| `panel` | Vertical tower segment | `panels[]` |
| `panel height` | Height of a segment | `panel.heightM` |
| `top width` | Width at top of a panel | `panel.topWidthM` |
| `top depth` | Rectangular-tower top depth | `panel.topDepthM` |
| `face` | Bracing pattern on tower faces | `panel.faceBracing` |
| `faceY` | Different Y-face bracing for rectangular towers | `panel.faceYBracing` |
| `plan bracing` | Bracing in horizontal/plan planes | `panel.planBracing` |
| `hip bracing` | Bracing linking leg/hip systems inside a panel | `panel.hipBracing` |
| `cross-arm` | Projecting arm or external panel system | `panel.crossArms[]` |

MStower panels are generally described from bottom to top. Widths can be input at bend points and interpolated for intermediate levels. TowerFlow should support both explicit panel widths and interpolated widths, but should record which method was used.

## Member Naming and Classes

TowerFlow should use a stable member class vocabulary. The MStower manual supports two related vocabularies: profile member classes and UDP member classes.

### Profile Member Classes

| TowerFlow class | MStower-style label | Meaning |
| --- | --- | --- |
| `leg` | `LEG` | Main vertical or sloping leg member. |
| `face_brace` | `BR`, `BR1`, `BR2`, ... | Diagonal or web bracing in a tower face. |
| `face_horizontal` | `H`, `H1`, `H2`, ... | Horizontal member in a face panel. |
| `face_redundant` | `R`, `R1`, `R2`, ... | Secondary/redundant face bracing. |
| `plan_brace` | `PB`, `PB1`, ... | Bracing in plan at panel boundaries or intermediate planes. |
| `hip_brace` | `HP`, `HP1`, ... | Hip/internal bracing associated with legs and panel twist restraint. |
| `cross_arm_member` | `CR`, `CR1`, ... | Members in projecting cross-arms. |

### UDP Member Classes

| TowerFlow class | MStower UDP label | Meaning |
| --- | --- | --- |
| `leg` | `LEG` | Leg member. |
| `brace` | `BRC` | General brace other than X/K special classes. |
| `x_brace` | `XBR` | Symmetric X brace. |
| `k_brace` | `KBR` | Symmetric K brace. |
| `horizontal` | `HOR` | Horizontal member. |
| `hip_brace` | `HBR` | Hip brace. |
| `plan_brace` | `PBR` | Internal plan bracing member. |
| `redundant` | `RED` | Redundant/secondary member. |
| `cross_arm_main` | `CRM` | Cross-arm main member. |
| `tension_only_brace` | `TBR` | Tension-only bracing; nonlinear analysis awareness required. |
| `wind_only_member` | `WND` | Wind-loaded member not treated as structural restraint or checked for strength. |

TowerFlow Phase 1 currently has only a coarse `member.group`. Replace or extend it later with `memberClass`, `bracingSystem`, `panelId`, `faceId`, and `sourcePanelType`.

## Standard Panel Families

MStower states that its standard panel library contains more than 100 panel types. The important TowerFlow lesson is the family structure, not every individual diagram.

| Panel family | Typical code examples from index | TowerFlow meaning |
| --- | --- | --- |
| D/V face panels | `DL`, `DR`, `VL`, `VR` variants | Single diagonal or V-style face bracing. |
| X face panels | `X`, `XH`, `XM`, `XTR`, `XV`, `XU` variants | Cross-braced face patterns with optional horizontals/redundants. |
| K face panels | `K`, `KB`, `K1`, `K2`, `KT`, `KM`, `KMG`, `KV` variants | K-bracing and portal/cranked K variants. |
| M face panels | `M`, `M1`, `M2`, `MKM`, `MG` variants | M-style face patterns and gantry-like variants. |
| W face panels | `W4`, `WS2`, `WS3`, `WD2` | Wider multi-bay or special face/cross patterns. |
| Multi-panel / 3D face systems | `DM`, `DMH`, `DLM`, `DRM`, `KXM`, `XDM`, `XDMA`, `XM`, `XMA` | Larger repeated or three-dimensional panel systems. |
| Plan bracing | `PLSM`, `PLD`, `PLX`, `PL1A`, `PL2A`, `PL3`, `PL4`, `PL5`, `PD`, `PDM`, `PWD`, `PLW`, `PP`, `PR`, `PT` variants | Horizontal bracing in plan, including square and triangular layouts. |
| Hip bracing | `HK`, `HS`, `HT`, `HWH`, `HX2` | Internal/hip bracing for restraint and torsional stability. |
| Cross-arms | `CT`, `CT1`, `CR` | Projecting arm assemblies. |

TowerFlow should store the raw source panel code where available, but expose a cleaner `bracingFamily` in the UI.

## User-Defined Panels

User-defined panels, or UDPs, are the escape hatch for non-standard geometry. MStower supports these UDP definition scopes:

| UDP scope | Meaning for TowerFlow |
| --- | --- |
| `PLANE` | A plane face used to generate a full face panel. |
| `HALF` | Half a plane face, mirrored or repeated by generation logic. |
| `QUART` | Two adjacent half panels around a leg. |
| `ADJA` | Two adjacent faces, used when adjacent faces differ. |
| `3DIM` | Full three-dimensional tower section. |

UDP concepts TowerFlow should keep:

- `heightM`, `topWidthM`, and `baseWidthM` locate the UDP in the tower.
- UDP nodes have local coordinates.
- UDP members have A/B end nodes and a C/reference node.
- End releases are explicit per member end.
- Member class and optional subclass are part of the member definition.
- Standard panels can scale with panel dimensions; UDPs are fixed-size once created.

TowerFlow should eventually support a `customPanel` object instead of forcing every geometry into a standard panel family.

## Supports, Releases, and Springs

MStower supports:

- Pinned support.
- Fixed support.
- Fixed with selected released degrees of freedom.
- Translational and rotational springs.
- Support definitions by coordinate or by leg identifier.

TowerFlow implication:

- Keep support state as explicit DOF data.
- UI labels should distinguish `pinned_translational`, `fixed_frame`, `release`, and `spring`.
- Phase 1 truss supports restrain only `Ux`, `Uy`, and `Uz`; future frame models need `Rx`, `Ry`, and `Rz`.

## Sections, Materials, Bolts, and Connections

MStower separates:

- Section library reference and section property numbers.
- Section orientation relative to the member local axis.
- Connected element information for connection/slenderness logic.
- Material properties.
- Bolt definitions and bolting metadata by member class/subclass.

TowerFlow implication:

- Do not store section names as plain display text only.
- Add stable IDs for `sectionId`, `materialId`, `connectionClass`, and `boltGroupId`.
- Keep connection metadata separate from member force results.

## Analysis Modelling Notes

Important modelling lessons:

- MStower treats members as 3D beam-column members, even when a tower is intended to behave close to a triangulated space truss.
- A stiffness reduction factor can be used in MStower to reduce bending stiffness toward truss-like behaviour.
- Tension-only members or cable/guy members require nonlinear analysis awareness.
- Good tower modelling depends on triangulated bracing and adequate restraint; software cannot always detect poor non-triangulated restraint.

TowerFlow implication:

- Phase 1's pin-jointed truss model is narrower than MStower's general beam-column model.
- Any future frame/beam model must explicitly introduce rotations, section orientation, releases, and local axes.
- The UI must not call Phase 1 supports or members "fixed frame" unless frame DOF are actually solved.

## Loading Model

MStower separates tower geometry from loading. Its loading file uses blocks for:

| Loading block | TowerFlow concept |
| --- | --- |
| `parameters` | Code/load-generation settings and global load parameters. |
| `terrain` | Terrain and exposure data. |
| `velocity profile` | Wind speed/pressure profile by height. |
| `named nodes` | Stable aliases for load application points. |
| `guy list` | Named groups of guy members. |
| `external factors` | Factors for external members over height ranges and directions. |
| `loads` | Load cases and combinations. |
| `panel block` | Panel boundaries for load allocation. |
| `ancillaries` | Equipment and attachments. |

Load case categories to support over time:

- Wind load.
- Dead load.
- Ice load.
- Miscellaneous construction/maintenance load.
- Additional nodal load.
- Additional member temperature.
- Earthquake load.
- Combination load.

TowerFlow Phase 1 should support only simplified nodal loads, but the data model should already use type, case, direction, magnitude, location, and units.

## Ancillary and Equipment Types

MStower groups tower attachments into several ancillary categories. These map well to TowerFlow equipment objects.

| MStower category | TowerFlow object | Examples |
| --- | --- | --- |
| Linear ancillary | `linearEquipment` | Feeders, waveguides, ladders, vertical services. |
| Face ancillary | `faceEquipment` | Small antenna, platform, gusset/plate-like face item. |
| Large ancillary | `largeEquipment` | Dish antenna or large projected-area equipment. |
| Resistance | `resistanceZone` | Cladding or aggregate resistance over a height range. |
| Insulator | `guyInsulator` | Discrete item on a guy segment. |

TowerFlow co-location inputs should not be a single generic "equipment load". They should capture at least:

- Equipment type.
- Attachment face or node.
- Height/elevation.
- Offset or standoff.
- Mass.
- Projected area or effective sail area.
- Wind direction behaviour.
- Source or library reference.

## TowerFlow Schema Recommendation

Use these top-level geometry concepts:

```text
tower
  metadata
  coordinateSystem
  towerType
  profile
  levels
  panels
  faces
  nodes
  members
  supports
  guys
  sections
  materials
  connections
  equipment
  loadCases
  results
```

Minimum future member fields:

```text
memberId
startNodeId
endNodeId
referenceNodeId
panelId
faceId
memberClass
bracingSystem
sourcePanelType
sectionId
materialId
connectionClass
releaseStart
releaseEnd
```

Minimum future panel fields:

```text
panelId
levelBottomM
levelTopM
heightM
bottomWidthM
topWidthM
bottomDepthM
topDepthM
faceBracingType
planBracingType
hipBracingType
crossArmType
sourcePanelCode
customPanelId
```

## TowerFlow UI Implications

Use this vocabulary in UI panels:

- `Tower Profile`
- `Panel`
- `Face`
- `Face Bracing`
- `Plan Bracing`
- `Hip Bracing`
- `Cross-Arm`
- `Member Class`
- `Section`
- `Material`
- `Support`
- `Guy`
- `Equipment`
- `Load Case`
- `Ancillary / Equipment Library`

Avoid vague labels such as:

- `stick`
- `bar`
- `piece`
- `part`
- `thing`
- `force object`

## Phase Adoption

| Phase | Adoption |
| --- | --- |
| Phase 1 | Use only `panel`, `face`, `memberClass`, `support`, and `nodalLoad` labels; keep solver as truss-only. |
| Phase 2 | Add editable load objects and stable named load locations. |
| Phase 3 | Add section/material/member-class data needed for utilisation screening. |
| Phase 4 | Add scenario and strengthening concepts by member class and panel. |
| Phase 5 | Add foundation connection and bolt group taxonomy. |
| Phase 6 | Add reliability metadata to members, panels, equipment, and foundations. |

