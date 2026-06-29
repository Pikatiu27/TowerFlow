import json
import math
from pathlib import Path


ROOT = Path(__file__).resolve().parents[1]
OUTPUT_PATH = ROOT / "public" / "data" / "tower-001.results.json"

E_MODULUS_KPA = 200_000_000.0
AREA_M2 = 0.0025

DEMO_TOWER = {
    "id": "fec-type-aa-20m-demo",
    "name": "FEC Type AA triangular lattice tower demo",
    "manufacturerReference": "FEC Triangular SS Tower Type AA audit sheet",
    "unitPolicy": "TowerFlow calculation and product values are SI. Source values in this seed are read as metric values from the audit sheet.",
    "geometryBasis": [
        "Triangular self-supporting lattice tower based on the FEC Type AA audit-sheet typical details.",
        "Nominal model: 20 m Type AA tower.",
        "Actual tower height used in demo: 21.30 m.",
        "Typical module height read from sheet: 4.80 m.",
        "Top face width read from sheet: 1.50 m.",
        "Face width at K-point for nominal 20 m tower: 2.984 m.",
        "Demo levels are idealised at 0.00, 4.80, 9.60, 14.40, 19.20, and 21.30 m.",
        "Face width is linearly tapered from 2.984 m at the base/K-point reference to 1.500 m at the top.",
    ],
    "sourceReferences": [
        {
            "label": "FEC Type AA - Lattice Tower Audit Sheets.pdf",
            "url": "C:/Users/silin/Documents/Codex/Reference/FEC Type AA - Lattice Tower Audit Sheets.pdf",
            "accessDate": "2026-06-29",
            "use": "Local reference PDF for Type AA typical details, height schedule, module height, and face-width values.",
        },
        {
            "label": "Codex reference extraction pack",
            "url": "C:/Users/silin/Documents/Codex/Reference/_codex_reference_packs/fec-type-aa-lattice-tower-audit-sheets/",
            "accessDate": "2026-06-29",
            "use": "Searchable text extraction used to locate the Type AA values before source-PDF verification.",
        }
    ],
    "disclaimer": "Audit-sheet-derived demo geometry only. Not a construction drawing, certified design, or manufacturer-approved model.",
}


def gaussian_solve(matrix, vector):
    n = len(vector)
    a = [row[:] + [vector[i]] for i, row in enumerate(matrix)]

    for col in range(n):
        pivot = max(range(col, n), key=lambda row: abs(a[row][col]))
        if abs(a[pivot][col]) < 1e-10:
            raise ValueError("Singular stiffness matrix. Check restraint and bracing layout.")
        a[col], a[pivot] = a[pivot], a[col]

        pivot_value = a[col][col]
        for item in range(col, n + 1):
            a[col][item] /= pivot_value

        for row in range(n):
            if row == col:
                continue
            factor = a[row][col]
            if factor == 0:
                continue
            for item in range(col, n + 1):
                a[row][item] -= factor * a[col][item]

    return [a[row][n] for row in range(n)]


def triangular_level(level_index, z, radius):
    nodes = []
    for corner in range(3):
        angle = math.radians(90 + corner * 120)
        nodes.append(
            {
                "id": f"N{level_index}{corner + 1}",
                "x": round(radius * math.cos(angle), 3),
                "y": round(radius * math.sin(angle), 3),
                "z": round(z, 3),
            }
        )
    return nodes


def section_for_group(group):
    sections = {
        "leg": {
            "sectionDesignation": "CHS 48 x 5.4",
            "sectionFamily": "CHS",
            "sectionSourceNote": "Demo section read from FEC Type AA typical details; verify against source PDF before engineering use.",
        },
        "diagonal bracing": {
            "sectionDesignation": "CHS 42 x 3.2",
            "sectionFamily": "CHS",
            "sectionSourceNote": "Demo section read from FEC Type AA typical details; verify against source PDF before engineering use.",
        },
        "plan bracing": {
            "sectionDesignation": "Round bar dia 14",
            "sectionFamily": "round bar",
            "sectionSourceNote": "Demo horizontal/secondary section from FEC Type AA typical details; verify against source PDF before engineering use.",
        },
    }
    return sections.get(
        group,
        {
            "sectionDesignation": "Section not assigned",
            "sectionFamily": "unknown",
            "sectionSourceNote": "No demo section metadata assigned.",
        },
    )


def member(member_id, start, end, group):
    return {
        "id": member_id,
        "startNodeId": start,
        "endNodeId": end,
        "group": group,
        "areaM2": AREA_M2,
        "elasticModulusKPa": E_MODULUS_KPA,
        **section_for_group(group),
    }


def build_geometry():
    actual_height_m = 21.30
    module_height_m = 4.80
    base_face_width_m = 2.984
    top_face_width_m = 1.500
    heights = [0.0, 4.80, 9.60, 14.40, 19.20, actual_height_m]
    face_widths = [
        base_face_width_m - (base_face_width_m - top_face_width_m) * (height / actual_height_m)
        for height in heights
    ]
    radii = [face_width / math.sqrt(3.0) for face_width in face_widths]
    nodes = []
    for level_index, (z, radius) in enumerate(zip(heights, radii)):
        nodes.extend(triangular_level(level_index, z, radius))

    members = []
    next_id = 1

    for level_index in range(len(heights)):
        for corner in range(3):
            start = f"N{level_index}{corner + 1}"
            end = f"N{level_index}{((corner + 1) % 3) + 1}"
            members.append(member(f"M{next_id:03d}", start, end, "plan bracing"))
            next_id += 1

    for level_index in range(len(heights) - 1):
        for corner in range(3):
            start = f"N{level_index}{corner + 1}"
            end = f"N{level_index + 1}{corner + 1}"
            members.append(member(f"M{next_id:03d}", start, end, "leg"))
            next_id += 1

        for corner in range(3):
            lower = f"N{level_index}{corner + 1}"
            upper_next = f"N{level_index + 1}{((corner + 1) % 3) + 1}"
            upper_same = f"N{level_index + 1}{corner + 1}"
            lower_next = f"N{level_index}{((corner + 1) % 3) + 1}"
            members.append(member(f"M{next_id:03d}", lower, upper_next, "diagonal bracing"))
            next_id += 1
            members.append(member(f"M{next_id:03d}", lower_next, upper_same, "diagonal bracing"))
            next_id += 1

    supports = [
        {
            "nodeId": "N01",
            "supportType": "pinned-translational",
            "ux": True,
            "uy": True,
            "uz": True,
            "rx": False,
            "ry": False,
            "rz": False,
        },
        {
            "nodeId": "N02",
            "supportType": "pinned-translational",
            "ux": True,
            "uy": True,
            "uz": True,
            "rx": False,
            "ry": False,
            "rz": False,
        },
        {
            "nodeId": "N03",
            "supportType": "pinned-translational",
            "ux": True,
            "uy": True,
            "uz": True,
            "rx": False,
            "ry": False,
            "rz": False,
        },
    ]

    load_rows = []
    for level_index, height in enumerate(heights[1:], start=1):
        if height <= module_height_m:
            fx_kn = 0.20
        elif height <= module_height_m * 2:
            fx_kn = 0.25
        elif height <= module_height_m * 3:
            fx_kn = 0.30
        elif height <= module_height_m * 4:
            fx_kn = 0.35
        else:
            fx_kn = 0.18
        for corner in range(3):
            load_rows.append((f"N{level_index}{corner + 1}", fx_kn))
    loads = [
        {
            "id": f"L-WIND-X-{index:02d}",
            "type": "nodal wind load",
            "nodeId": node_id,
            "fxKN": fx_kn,
            "fyKN": 0.0,
            "fzKN": 0.0,
            "display": {
                "showArrow": True,
                "arrowScale": "schematic",
                "label": f"{fx_kn:+.2f} kN",
            },
        }
        for index, (node_id, fx_kn) in enumerate(load_rows, start=1)
    ]

    return nodes, members, supports, loads


def solve_truss(nodes, members, supports, loads):
    node_index = {node["id"]: i for i, node in enumerate(nodes)}
    dof_count = len(nodes) * 3
    stiffness = [[0.0 for _ in range(dof_count)] for _ in range(dof_count)]
    force = [0.0 for _ in range(dof_count)]

    for item in loads:
        base = node_index[item["nodeId"]] * 3
        force[base] += item["fxKN"]
        force[base + 1] += item["fyKN"]
        force[base + 2] += item["fzKN"]

    for item in members:
        start = nodes[node_index[item["startNodeId"]]]
        end = nodes[node_index[item["endNodeId"]]]
        dx = end["x"] - start["x"]
        dy = end["y"] - start["y"]
        dz = end["z"] - start["z"]
        length = math.sqrt(dx * dx + dy * dy + dz * dz)
        cx, cy, cz = dx / length, dy / length, dz / length
        ae_l = item["areaM2"] * item["elasticModulusKPa"] / length
        direction = [cx, cy, cz, -cx, -cy, -cz]
        dofs = [
            node_index[item["startNodeId"]] * 3,
            node_index[item["startNodeId"]] * 3 + 1,
            node_index[item["startNodeId"]] * 3 + 2,
            node_index[item["endNodeId"]] * 3,
            node_index[item["endNodeId"]] * 3 + 1,
            node_index[item["endNodeId"]] * 3 + 2,
        ]
        for i in range(6):
            for j in range(6):
                stiffness[dofs[i]][dofs[j]] += ae_l * direction[i] * direction[j]

    restrained = set()
    for item in supports:
        base = node_index[item["nodeId"]] * 3
        if item["ux"]:
            restrained.add(base)
        if item["uy"]:
            restrained.add(base + 1)
        if item["uz"]:
            restrained.add(base + 2)

    free_dofs = [i for i in range(dof_count) if i not in restrained]
    reduced_k = [[stiffness[i][j] for j in free_dofs] for i in free_dofs]
    reduced_f = [force[i] for i in free_dofs]
    solved_free = gaussian_solve(reduced_k, reduced_f)

    displacement = [0.0 for _ in range(dof_count)]
    for index, dof in enumerate(free_dofs):
        displacement[dof] = solved_free[index]

    member_results = []
    for item in members:
        start = nodes[node_index[item["startNodeId"]]]
        end = nodes[node_index[item["endNodeId"]]]
        dx = end["x"] - start["x"]
        dy = end["y"] - start["y"]
        dz = end["z"] - start["z"]
        length = math.sqrt(dx * dx + dy * dy + dz * dz)
        cx, cy, cz = dx / length, dy / length, dz / length
        dofs = [
            node_index[item["startNodeId"]] * 3,
            node_index[item["startNodeId"]] * 3 + 1,
            node_index[item["startNodeId"]] * 3 + 2,
            node_index[item["endNodeId"]] * 3,
            node_index[item["endNodeId"]] * 3 + 1,
            node_index[item["endNodeId"]] * 3 + 2,
        ]
        local_extension = (
            -cx * displacement[dofs[0]]
            - cy * displacement[dofs[1]]
            - cz * displacement[dofs[2]]
            + cx * displacement[dofs[3]]
            + cy * displacement[dofs[4]]
            + cz * displacement[dofs[5]]
        )
        axial_force = item["areaM2"] * item["elasticModulusKPa"] / length * local_extension
        state = "tension" if axial_force > 0.01 else "compression" if axial_force < -0.01 else "low force"
        member_results.append(
            {
                **item,
                "lengthM": round(length, 3),
                "axialForceKN": round(axial_force, 3),
                "forceState": state,
            }
        )

    reactions = []
    for item in supports:
        base = node_index[item["nodeId"]] * 3
        for label, dof in [("fxKN", base), ("fyKN", base + 1), ("fzKN", base + 2)]:
            reaction = sum(stiffness[dof][j] * displacement[j] for j in range(dof_count)) - force[dof]
            if abs(reaction) < 1e-8:
                reaction = 0.0
            reactions.append({"nodeId": item["nodeId"], "component": label, "valueKN": round(reaction, 3)})

    node_results = []
    for node in nodes:
        base = node_index[node["id"]] * 3
        node_results.append(
            {
                **node,
                "displacementM": {
                    "ux": round(displacement[base], 6),
                    "uy": round(displacement[base + 1], 6),
                    "uz": round(displacement[base + 2], 6),
                },
            }
        )

    return node_results, member_results, reactions


def main():
    nodes, members, supports, loads = build_geometry()
    solved_nodes, solved_members, reactions = solve_truss(nodes, members, supports, loads)
    total_load_x = sum(load["fxKN"] for load in loads)
    total_reaction_x = sum(item["valueKN"] for item in reactions if item["component"] == "fxKN")
    force_balance_x = round(total_load_x + total_reaction_x, 6)
    if abs(force_balance_x) < 1e-9:
        force_balance_x = 0.0

    result = {
        "schemaVersion": "0.1.0",
        "project": "TowerFlow",
        "caseId": "tower-001-static-wind-x",
        "title": "FEC Type AA triangular lattice tower static wind prototype",
        "towerReference": DEMO_TOWER,
        "units": {
            "length": "m",
            "displacement": "m",
            "force": "kN",
            "stress": "kPa",
            "area": "m2",
        },
        "analysisBoundary": [
            "3D pin-jointed truss model",
            "Three translational degrees of freedom per node: ux, uy, uz",
            "Rotational degrees of freedom rx, ry, rz are listed for support display context only and are not active in the Phase 1 truss stiffness matrix",
            "Steel tower superstructure only",
            "One simplified horizontal wind load case",
            "Reference-derived demo dimensions only",
            "No member capacity check",
            "No connection or foundation design",
        ],
        "nodes": solved_nodes,
        "members": solved_members,
        "supports": supports,
        "loadCases": [
            {
                "id": "LC1",
                "name": "Simplified wind in global X direction",
                "description": "Phase 1 schematic nodal wind loads applied in global +X. Values are true SI kN loads; arrow lengths are display-scaled.",
                "windDirectionDeg": 0,
                "loads": loads,
            }
        ],
        "supportReactions": reactions,
        "checks": {
            "sumAppliedFxKN": round(total_load_x, 3),
            "sumReactionFxKN": round(total_reaction_x, 3),
            "forceBalanceFxKN": force_balance_x,
            "maxAbsAxialForceKN": round(max(abs(member["axialForceKN"]) for member in solved_members), 3),
        },
    }

    OUTPUT_PATH.parent.mkdir(parents=True, exist_ok=True)
    OUTPUT_PATH.write_text(json.dumps(result, indent=2), encoding="utf-8")
    print(f"Wrote {OUTPUT_PATH}")
    print(f"Force balance X: {result['checks']['forceBalanceFxKN']} kN")


if __name__ == "__main__":
    main()
