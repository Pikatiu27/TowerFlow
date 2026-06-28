# Manufacturer Tower References

This file records public manufacturer and supplier references for typical communication or utility tower forms that may be useful as TowerFlow seed models.

The purpose is to collect traceable geometry and product-family references. It is not a design library and must not be used as certification data without the original manufacturer drawings, project drawings, and site-specific engineering checks.

## Reference Rules

- Use manufacturer, supplier, government, or other public traceable documents.
- Do not copy restricted drawings or proprietary schedules into this repository.
- Keep derived TowerFlow seed models generic unless manufacturer permission and project-specific documents are available.
- Record when dimensions are public, partial, or not publicly available.
- Product-facing TowerFlow outputs remain in English.

## Summary Table

| Manufacturer / Supplier | Public Source Quality | Useful Tower / Pole Type | Public Dimensions Found | TowerFlow Use |
| --- | --- | --- | --- | --- |
| ROHN Products | Strong | Self-supporting lattice towers, guyed towers, steel poles | Yes, partial standard tower and foundation dimensions | Good seed reference for generic triangular lattice tower examples |
| Civilmart / Rocla | Moderate | Duraspun concrete communication and power poles | Public product notes, no full public dimension table found | Good reference for future monopole / concrete pole workflow |
| LeBlanc / LeBlanc & Royal | Weak in current public search | Broadcast and guyed towers | No manufacturer catalogue found in current search | Keep as historical/manufacturer lead only |
| Transfield / Broadspectrum / Ventia | Weak for manufacturing | Infrastructure and telecommunications services | No tower manufacturing dimension catalogue found | Treat as contractor / asset-services reference, not tower product source |

## ROHN Products

Official links:

- Homepage: https://rohnnet.com/
- Product catalogue page: https://rohnnet.com/product-catalog/
- Self-supporting G-Series page: https://rohnnet.com/self-supporting-towers-g-series/
- G-Series design drawing, Rev G PDF: https://rohnnet.com/wp-content/uploads/2025/08/Design-REV-G.pdf
- 25GSS assembly drawing PDF: https://rohnnet.com/wp-content/uploads/2025/08/Assembly-25GSS.pdf
- Steel poles page: https://rohnnet.com/steel-poles/

Public product families visible on the ROHN site:

- Bracketed towers.
- Fold-over towers.
- Telescoping masts.
- Steel poles.
- Self-supporting towers.
- Guyed towers.

### Public Dimensional Data Captured

Source: ROHN 25GSS assembly drawing.

25GSS self-supporting tower assembly range:

| Part / Model | Public Height Information | Public Notes |
| --- | --- | --- |
| 25SS010 | 10 ft | Includes top section and short base assembly in bill of materials |
| 25SS020 | 20 ft | Includes one 10 ft standard tower section |
| 25SS030 | 30 ft | Includes two 10 ft standard tower sections |
| 25SS035 | 35 ft | Includes 4.92 ft kit plus two 10 ft sections |
| 25SS040 | 40 ft | Includes three 10 ft standard tower sections |
| 25G standard section | 10 ft | Standard tower section |
| 25AG2 top section | 9.75 ft | Top section |
| 25G5 kit | 4.92 ft | Shorter intermediate kit |
| SB25G5 short base assembly | 5 ft | Short base assembly |

Source: ROHN 25GSS assembly drawing, material notes.

| Component | Public Material / Size Note |
| --- | --- |
| Leg | 1-1/4 in diameter x 16 ga, 50 ksi minimum yield strength |
| Brace | 5/16 in solid rod, 36 ksi minimum yield strength |
| Structural steel | 50 ksi minimum yield strength |
| Fasteners | 120 ksi minimum tensile strength |

Source: ROHN G-Series design/foundation drawing.

G-Series mat foundation public values:

| Tower Number | Overturning Moment | Total Shear | Mat Width W | Concrete Volume |
| --- | ---: | ---: | ---: | ---: |
| 25G | 7,000 ft-lb | 510 lb | 4 ft 0 in | 2.4 cu yd |
| 45G | 12,300 ft-lb | 1,000 lb | 5 ft 3 in | 4.1 cu yd |
| 55G | 22,100 ft-lb | 1,600 lb | 6 ft 0 in | 5.3 cu yd |
| 65G / 45GSR | 53,100 ft-lb | 3,500 lb | 7 ft 9 in | 8.9 cu yd |

Source: ROHN G-Series design drawing.

Public design context:

- Designs are in accordance with ANSI/TIA-222-G for Structure Class I, Exposure B and C, Topographic Category 1.
- Antennas and mounts are assumed symmetrically placed at the tower apex.
- Published effective projected area tables vary by wind speed, height, exposure, and tower family.
- Purchasers must verify suitability for site-specific data.

### TowerFlow Use

ROHN is the best currently found public seed for a generic triangular lattice tower because it exposes:

- Standard tower heights.
- Modular section lengths.
- Member material notes.
- Foundation reference dimensions.
- Wind/EPA design context.
- Assembly and foundation drawings.

Recommended use:

- Build a generic `triangular_lattice_rohn_style_25g_seed` for internal testing.
- Keep the model labelled as "ROHN-style public reference seed", not an exact ROHN product clone.
- Convert US customary values into SI internally and store original units in metadata.
- Use the model only for visual, data-schema, and solver verification until project-specific Australian engineering data is available.

Important limitations:

- ROHN standards are ANSI/TIA-based, not AS/NZS 1170.2 or AS 4100.
- Face width, full bracing geometry, joint details, and site-specific capacity must be verified from the original drawings and engineering data.
- The public notes are not enough for Australian design certification.

## Civilmart / Rocla

Official links:

- Rocla domain redirecting to Civilmart: https://www.rocla.com.au/
- Civilmart poles category: https://civilmart.com.au/products/electrical-communications/poles/
- Civilmart concrete pole solutions: https://civilmart.com.au/poles/
- Communication poles product page: https://civilmart.com.au/product/communication-poles/
- Power poles product page: https://civilmart.com.au/product/power-poles/
- COMMPole selection software: https://commpole.civilmart.com.au/

Public product notes captured:

- Civilmart identifies Rocla as one of its brands.
- Civilmart Duraspun poles are hollow steel-reinforced concrete poles made with a centrifugal spun-casting process.
- Communication poles are intended for antenna communication networks, mobile phone base stations, and wireless network supports.
- The communication pole product page states the poles are designed to support a wide range of antenna configurations under wind loading conditions in Australia and New Zealand.
- Civilmart notes a footing design service and foundation methods including raft footings and bored piers.
- COMMPole selection software is available for selecting communication poles based on environmental and topographical site conditions.
- Power pole applications include distribution poles, substation poles, transmission poles, line poles, and guyed structures.

### Public Dimensional Data Captured

No complete public dimension schedule was found in the current search for Civilmart/Rocla communication poles.

Known public data type:

| Data Type | Publicly Found? | Notes |
| --- | --- | --- |
| Product family | Yes | Duraspun concrete communication poles and power poles |
| Material form | Yes | Hollow steel-reinforced concrete |
| Manufacturing method | Yes | Centrifugal spun-casting process |
| Typical applications | Yes | Mobile phone base stations, antennas, wireless supports |
| Wind-region suitability | Partial | Public text says Australia and New Zealand wind loading conditions |
| Exact pole heights | Not found | May require product guide, COMMPole output, quote, or manufacturer contact |
| Tip/base diameters | Not found | Not available on public product page |
| Wall thickness / reinforcement | Not found | Not available on public product page |
| Foundation dimensions | Not found | Public page states raft footing and bored pier options, but no schedule found |

### TowerFlow Use

Civilmart/Rocla is relevant for a future concrete monopole or pole asset workflow.

Recommended use:

- Use Civilmart/Rocla as a reference for a generic Australian concrete communication pole workflow.
- Do not create a dimensioned seed model from Civilmart/Rocla until a public product guide, COMMPole output, or project-specific drawing is available.
- Add fields in the TowerFlow schema for concrete pole workflows:
  - Pole material.
  - Pole height.
  - Base diameter.
  - Tip diameter.
  - Hollow core diameter.
  - Prestress/reinforcement notes.
  - Foundation type.
  - Antenna mounting ferrules or bracket heights.

Important limitations:

- The public pages are product descriptions, not engineering design tables.
- COMMPole may be the correct source for dimensions and pole selection, but any exported data must be checked for permitted reuse.

## LeBlanc / LeBlanc & Royal

Public sources found:

- Search results show references to LeBlanc or LeBlanc & Royal in relation to large broadcast and guyed tower projects.
- No current official manufacturer product catalogue or dimension schedule was found in the current search.

TowerFlow relevance:

- Historical lead for large broadcast/guyed tower manufacturing.
- Not enough public data for a seed model.

Recommended use:

- Keep as a future research item only.
- Search again if project-specific historical broadcast towers become relevant.
- Do not use as a TowerFlow geometry source without official drawings.

## Transfield / Broadspectrum / Ventia

Official links:

- Ventia homepage: https://www.ventia.com/

Public notes:

- Transfield Services became Broadspectrum and was later integrated into Ventia.
- Public information currently positions Ventia as an infrastructure services provider rather than a tower product manufacturer.

TowerFlow relevance:

- Useful as a telecommunications infrastructure contractor / services context.
- Not useful as a manufacturer dimension source from the current public search.

Recommended use:

- Treat Transfield/Broadspectrum/Ventia as a contractor and maintenance reference, not a source of standard tower geometry.
- Search project-specific DA drawings or asset drawings if a Transfield-built site is being assessed.

## Recommended Seed Model Direction

### Seed 1: Generic Triangular Lattice Tower

Base the first TowerFlow public-reference seed on the ROHN 25GSS public assembly and G-Series foundation drawings.

Suggested metadata:

```json
{
  "seed_id": "triangular_lattice_rohn_style_25g_public_reference",
  "manufacturer_reference": "ROHN Products",
  "source_type": "public manufacturer drawings",
  "geometry_status": "partial_public_reference",
  "design_standard_reference": "ANSI/TIA-222-G, not Australian design",
  "tower_type": "self_supporting_triangular_lattice",
  "height_options_ft": [10, 20, 30, 35, 40],
  "primary_use": "TowerFlow data-schema and visualisation seed",
  "not_for_certification": true
}
```

### Seed 2: Generic Australian Concrete Communication Pole

Use Civilmart/Rocla public product descriptions only as a workflow placeholder until dimensions are obtained.

Suggested metadata:

```json
{
  "seed_id": "concrete_communication_pole_au_placeholder",
  "manufacturer_reference": "Civilmart / Rocla",
  "source_type": "public product description",
  "geometry_status": "dimension_schedule_not_found",
  "tower_type": "concrete_monopole",
  "primary_use": "future schema placeholder",
  "not_for_certification": true
}
```

## Next Research Tasks

- Search council development application documents for Telstra, Optus, TPG, and NBN sites that include elevation drawings.
- Search for publicly available Australian monopole elevation drawings with dimensions.
- Check whether COMMPole can export a non-confidential pole schedule for reference.
- Look for Australian standard detail drawings for triangular lattice towers used in mobile base station deployments.
- Add any found source into this file before using it in a TowerFlow seed model.

