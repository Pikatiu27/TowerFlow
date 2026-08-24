# TowerFlow Load, Action, Reaction and Deformation Graphic Convention v0.1

## Status and scope

Status: `PRIVATE REVIEW / PRE-INTEGRATION`

This convention controls how TowerFlow presents engineering coordinates, applied
actions, reactions, restraints, member force results, and deformation. It applies
to the web viewer, deterministic SVG drawings, screenshots, and future exports.
It does not change the Phase 2 solver, load generation, or numerical results.

The machine-readable companion is
`rules/towerflow-graphic-convention-v0.1.json`. A graphic that fails a blocking
rule is not eligible for engineering issue.

## Reference basis

The convention is based on the following actual reference patterns:

- ISO 128-2:2022 establishes line types, line designations, leader/reference
  lines, and general line-drafting rules for technical documentation.
- ISO 5455:1979 establishes recommended drawing scales and scale designations.
- Dlubal RFEM 6 documents explicit global or user-defined load coordinate
  systems, load directions, nodal application, support degrees of freedom,
  global displacement components, graphical support reactions, and local-axis
  member-force output.
- Abaqus/CAE documents nodal symbols at the node and, for prescribed
  translational components other than pressure and restraint exceptions,
  single-headed arrows pointing out from the region in the component direction.
- The local Codex Drawing package supplies the project controls for canonical
  engineering truth, controlled orthographic views, complete result legends,
  revision matching, non-colour status channels, and release blocking.
- TowerFlow project principles and the Phase 3 wind specification remain the
  governing project definitions for axes, signs, source wind direction, and
  downwind force direction.

These references inform presentation and traceability. They do not make the
TowerFlow output a certified calculation or replace a licensed project standard.

## 1. Coordinate systems and views

### 1.1 Global engineering coordinates

TowerFlow uses a right-handed global engineering system:

| Axis | Meaning | Positive direction |
| --- | --- | --- |
| `X` | Project horizontal axis | Project-defined `+X` |
| `Y` | Project transverse axis | Completes right-handed `X-Y-Z` |
| `Z` | Vertical axis | Upward |

All load and reaction component records shall identify their coordinate system.
The browser adapter maps engineering `(X,Y,Z)` to Three.js `(x,z,-y)` only for
rendering. Camera motion and viewport orientation shall never modify engineering
vectors or reported component values.

### 1.2 Member local coordinates

The member local `x` axis runs from `startNodeId` to `endNodeId`. Member internal
forces shall state the local-axis basis. For the Phase 2 truss result:

- `N > 0`: tension;
- `N < 0`: compression;
- `N = 0` within the declared display tolerance: low force.

Reversing member connectivity reverses the local-axis definition and therefore
requires a result/sign review.

### 1.3 Controlled views

Dimensioned engineering views shall be orthographic or explicitly controlled
auxiliary views. TowerFlow standard views are:

| View | Plane | Looking direction |
| --- | --- | --- |
| Front | `X-Z` | `-Y` |
| Side | `Y-Z` | `-X` |
| Plan | `X-Y` | `-Z` |

Perspective or orthographic-isometric views are context views only and shall be
labelled `NTS / REFERENCE ONLY`.

## 2. Applied loads and actions

### 2.1 Data authority

An applied-load graphic shall be generated from a load record containing:

- load ID and load case;
- application node, member, surface, or controlled region;
- signed components and units;
- coordinate system;
- source/provenance status;
- display-scale mode.

An arrow without an application object, coordinate basis, or signed value is a
decorative symbol and shall not be used as engineering evidence.

### 2.2 Arrow geometry

For an applied concentrated or nodal force, the application object is the arrow
tail datum. The arrowhead lies on the signed-force-vector side of that datum:

- the node or member point is the physical application point;
- the shaft leaves the application point in the signed force direction;
- the arrowhead points away from the application point along that vector;
- reversing the force sign reverses the complete arrow;
- a small shaft clearance may expose the node marker, but it is graphic only
  and does not move the load application point.

The machine convention name is
`tail-at-application-head-along-signed-vector`. The arrowhead shall not be
placed at the node for an applied concentrated force because that would visually
reverse the force direction.

This rule is specific to applied concentrated forces. Commercial software uses
different symbol semantics for positive pressure and restraint glyphs; reactions
and foundation actions also require their quantity to be named. Those symbols
shall not inherit the nodal-force arrow rule without their own definition.

A resultant glyph shall be calculated from the active case values, not from a
fixed screen direction.

For a plan-view resultant:

```text
screen_dx = +Fx
screen_dy = -Fy
```

The `-Fy` term is the screen-coordinate mapping for a plan viewed along `-Z`;
it does not change the engineering sign.

Arrow length may be schematic or normalized for readability. The graphic shall
then state `NTS`, `SCHEMATIC`, or the applicable force-arrow scale. A visual
offset or resized arrow does not create load eccentricity or an additional
moment. Physical eccentricity must be an explicit analysis input.

On the controlled TowerFlow action sheet, representative nodal-force arrows use
one fixed paper length. They communicate application location and signed vector
direction only; they do not encode relative magnitude. The sheet states
`NODAL ARROWS: SCHEMATIC / RESULTANT TABLE`, and the signed resultant table
governs.
The separate `W / DIRECTION KEY` glyph is a vector key, not an additional load.

Reference implementations:

- Abaqus/CAE 2024, *Understanding symbol location and direction*:
  `https://docs.software.vt.edu/abaqusv2024/English/SIMACAECAERefMap/simacae-c-lbiarrowslocation.htm`.
- Abaqus/CAE 2024, *What do single-headed and double-headed arrows represent?*:
  `https://docs.software.vt.edu/abaqusv2024/English/SIMACAECAERefMap/simacae-c-lbiarrowsheads.htm`.
- Dlubal RFEM 6, *Nodal Loads*:
  `https://www.dlubal.com/en/downloads-and-information/documents/online-manuals/rfem-6/000267`.

### 2.3 Values and labels

At least one text channel shall report the true signed components or magnitude
with units. The preferred compact form is:

```text
GLOBAL SUM F = [Fx, Fy, Fz] kN
```

Where an active combination contains more than one action category, the drawing
shall not label the combined resultant as one source action. Report the
unfactored source resultants and the factored active resultant separately:

```text
SUM F_G    = [Fx, Fy, Fz] kN
SUM F_W    = [Fx, Fy, Fz] kN
SUM F_COMB = [Fx, Fy, Fz] kN
```

An action view shall state the load case or combination ID. An `X-Z` elevation
uses `+Z` as its vertical axis and states its looking direction; an `X-Y`
direction key shall not be placed inside an `X-Z` or `Y-Z` elevation.

The active load case and coordinate basis shall remain visible in the same
sheet or inspector. Colour, arrow direction, or arrow length alone is
insufficient.

### 2.4 Wind direction terminology

The following quantities shall remain distinct:

| Quantity | Meaning |
| --- | --- |
| Source direction `beta` | Direction from which wind approaches, clockwise from true North |
| Downwind direction | Source direction plus 180 degrees |
| Global force vector | Downwind force resolved into TowerFlow global `X-Y-Z` |
| View direction | Camera/view orientation only |

Phase 2 direction branches are analysis load directions. They shall be labelled
`GLOBAL LOAD DIR` or `ANALYSIS DIRECTION`, not `WIND SOURCE DIRECTION`.
Phase 3 graphics shall show source azimuth and downwind/global force separately.
Use `WIND SOURCE ... FROM` only for the meteorological/source azimuth. Use
`APPLIED FORCE: ACTS +X/-X/+Y/-Y` for the signed structural load vector.

## 3. Moments

A moment is an axial vector. Positive moment graphics shall use the right-hand
rule about the named positive axis. A curved arrow shall include the axis label,
signed value, unit, and coordinate basis. A clockwise/counter-clockwise label
without a stated viewing direction is ambiguous and shall not be issued.

## 4. Restraints

Each support record shall expose six contextual degrees of freedom:

```text
Ux, Uy, Uz, Rx, Ry, Rz
```

A checked or filled restraint state means the degree of freedom is blocked.
An open state means it is free. The Phase 2 truss solver activates only
`Ux/Uy/Uz`; rotational states may be displayed for context but shall be disabled
and labelled inactive.

Support symbols are summaries, not substitutes for the DOF record:

- pinned translational support: conventional open triangle plus bearing line
  and ground hatch; `Ux/Uy/Uz` blocked, rotations inactive/free;
- fixed frame preview: six blocked states shown only as a future 6-DOF context;
- custom: display the actual component state and do not infer it from the icon.

The 2D pin symbol alone does not prove a three-dimensional restraint condition.
The adjacent machine-readable record and sheet text therefore state
`Ux = Uy = Uz = 0 / ROTATIONS INACTIVE`. Omitting either the DOF record or the
text makes the support graphic insufficient for engineering review.

## 5. Reactions and foundation actions

TowerFlow shall distinguish:

- **support reaction**: force or moment exerted by the support on the model;
- **foundation action**: equal-and-opposite action transferred from the model
  into the support/foundation.

Every reaction graphic shall name which quantity is shown. Reaction arrows shall
originate at the support node and use the same global coordinate contract as
applied loads unless another basis is explicitly declared.

The live Results viewport displays `Support Reaction` as the force exerted by
the support on the model. At each support node, the three solved global
components are combined into one resultant arrow:

- the support node is the arrow-tail datum;
- the arrowhead follows the signed support-reaction vector;
- the numerical table reports `R_X`, `R_Y`, `R_Z`, and `|R|` in `kN`;
- arrow length is schematic and normalized within the active result set;
- member axial-force colouring is suppressed while reaction vectors are active;
- equal-and-opposite foundation action is not displayed in this mode.

The result view shall expose equilibrium:

```text
sum(applied actions) + sum(support reactions) = residual
```

Residual components shall be reported with tolerance. A table labelled
`foundation loads` shall not be plotted as `support reactions` without reversing
the vector sense and changing the label.

## 6. Member-force results

The current Phase 2 quantity is signed member axial force `N` in member local
`x`, located on the elemental member with no averaging:

| State | Sign | Primary colour | Required text |
| --- | --- | --- | --- |
| Tension | `+` | red | `TENSION +` and signed `N` |
| Compression | `-` | blue | `COMPRESSION -` and signed `N` |
| Low force | near zero | grey | `LOW FORCE` or signed value |

Colour is a redundant channel, not the definition. Selection, critical-member
identification, tooltip, table, and drawing label shall preserve member ID,
signed value, unit, load case, and coordinate basis.

The result legend shall include quantity, component, unit, coordinate basis,
location, averaging, range mode, range, load case, deformation scale, geometry
revision, and analysis revision.

## 7. Deformation

A static deformed shape shall use solved nodal displacement components:

```text
x_display = x_original + scale * ux
y_display = y_original + scale * uy
z_display = z_original + scale * uz
```

The undeformed geometry shall remain visible as a reference unless the view
explicitly states otherwise. The display scale shall always be visible, for
example `DISPLAY SCALE 20x`. A display scale changes presentation only; labels
and tables retain the true solved displacement.

The live `Nodal Displacement` result mode implements this as follows:

- undeformed nodes and members remain as a subdued reference;
- deformed members are rebuilt from solved `Ux`, `Uy`, and `Uz`;
- the default display scale is `20x`, adjustable from `1x` to `100x`;
- the maximum-displacement node reports signed `U_X`, `U_Y`, `U_Z`, and `|u|`
  as true values in `mm`;
- changing display scale does not change the active result set or solved values;
- static deformation is not animated and shall not be described as force
  propagation or time-history response.

Normalized eigenmodes are not static deformations. A future mode-shape view
shall state `NORMALIZED / DIMENSIONLESS` and its normalization basis.

## 8. Scale, lines, and colour

TowerFlow separates:

1. canonical model dimensions;
2. screen zoom;
3. drawing scale;
4. action/reaction arrow scale;
5. deformation scale;
6. result colour range.

Changing one shall not silently change another. Controlled drawing scales use
the `SCALE 1:n` designation; schematic result diagrams use `NTS`.

Visible geometry, reference geometry, deformed overlays, dimensions, loads,
and reactions shall use distinct semantic line roles. Status and result meaning
shall remain understandable in monochrome through text, sign, line pattern,
weight, or symbol shape.

## 9. Mandatory graphic records

The following minimum metadata is required:

| Graphic | Mandatory fields |
| --- | --- |
| Applied action | ID, case, application object, vector, unit, coordinate system, arrow scale |
| Resultant action | case, summed vector, unit, coordinate system, projection, arrow scale |
| Restraint | support node, six DOF states, active solver DOF, support type |
| Reaction | support node, vector/moment, unit, basis, quantity sense, equilibrium residual |
| Member force | member ID, quantity, sign convention, local axis, unit, location, averaging, case |
| Deformation | displacement source, components, unit, display scale, undeformed-reference state |

## 10. Blocking conditions

The following conditions block engineering issue:

- a load/resultant arrow is fixed to the viewport and disagrees with the active
  engineering vector;
- camera rotation changes reported vector components;
- source wind direction is presented as the downwind force direction;
- applied load and reaction senses are not distinguished;
- a restraint icon disagrees with the stored DOF state;
- member-force colour is shown without signed text and a legend;
- a deformed shape omits its display scale or uses unsolved displacement;
- a result view omits load case, coordinate basis, unit, or revision;
- a schematic graphic is presented as a dimensionally scaled drawing.

## 11. Implementation boundary

Version 0.1 implements the global resultant glyph, signed Phase 2 axial-force
display, translational restraint state, support-on-model reaction vectors, and
the static deformed/undeformed overlay with an explicit display scale. Graphical
moment vectors remain specified but not implemented. Their absence shall be
explicit; placeholder arrows are prohibited.
