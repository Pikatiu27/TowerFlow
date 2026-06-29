import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const viewer = document.querySelector("#viewer");
const axisGizmo = document.querySelector("#axis-gizmo");
const appShell = document.querySelector(".app-shell");
const splitResizer = document.querySelector("#split-resizer");
const resetButton = document.querySelector("#reset-view");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
const showLoadsToggle = document.querySelector("#show-loads");
const supportPreset = document.querySelector("#support-preset");
const supportTable = document.querySelector("#support-table");
const resultTabButtons = Array.from(document.querySelectorAll("[data-result-tab]"));
const labels = {
  caseTitle: document.querySelector("#case-title"),
  nodeCount: document.querySelector("#node-count"),
  memberCount: document.querySelector("#member-count"),
  maxForce: document.querySelector("#max-force"),
  forceBalance: document.querySelector("#force-balance"),
  loadTitle: document.querySelector("#load-title"),
  loadCount: document.querySelector("#load-count"),
  sumAppliedFx: document.querySelector("#sum-applied-fx"),
  loadDirection: document.querySelector("#load-direction"),
  memberTitle: document.querySelector("#member-title"),
  memberState: document.querySelector("#member-state"),
  memberForce: document.querySelector("#member-force"),
  memberLength: document.querySelector("#member-length"),
  memberGroup: document.querySelector("#member-group"),
  memberSection: document.querySelector("#member-section"),
  memberInterpretation: document.querySelector("#member-interpretation"),
  selectionRowA: document.querySelector("#selection-row-a-label"),
  selectionRowB: document.querySelector("#selection-row-b-label"),
  selectionRowC: document.querySelector("#selection-row-c-label"),
  selectionRowD: document.querySelector("#selection-row-d-label"),
  activeLoadCase: document.querySelector("#active-load-case"),
  activeLoadDirection: document.querySelector("#active-load-direction"),
  activeResultType: document.querySelector("#active-result-type"),
  panelLoadCase: document.querySelector("#panel-load-case"),
  summaryType: document.querySelector("#summary-type"),
  summaryDisplay: document.querySelector("#summary-display"),
  summaryEnvelope: document.querySelector("#summary-envelope"),
  summarySource: document.querySelector("#summary-source"),
  summaryRowA: document.querySelector("#summary-row-a-label"),
  summaryRowB: document.querySelector("#summary-row-b-label"),
  summaryRowC: document.querySelector("#summary-row-c-label"),
  summaryRowD: document.querySelector("#summary-row-d-label"),
  summaryRowE: document.querySelector("#summary-row-e-label"),
  summaryRowF: document.querySelector("#summary-row-f-label"),
  summaryRowG: document.querySelector("#summary-row-g-label"),
  summaryRowH: document.querySelector("#summary-row-h-label"),
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf7fbff);

const camera = new THREE.OrthographicCamera(-8, 8, 8, -8, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
viewer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = false;
controls.screenSpacePanning = true;
controls.target.set(0, 0, 7);

const raycaster = new THREE.Raycaster();
const pointer = new THREE.Vector2();
const memberObjects = [];
const memberPickObjects = [];
const nodeObjects = [];
const loadObjects = [];
const originAxisObjects = [];
const supportObjects = [];
let selectedObject = null;
let towerData = null;
let modelBounds = null;
let modelCenter = new THREE.Vector3(0, 6, 0);
let modelRadius = 8;
let activeView = "front";
let activeResultTab = "load";
let currentSupports = [];
let nodeMap = new Map();
const MEMBER_RADIUS_M = 0.018;
const MEMBER_PICK_RADIUS_M = 0.085;
const LOAD_COLOUR = 0xff8a00;
const AXIS_COLOURS = {
  x: 0xe11d48,
  y: 0x16a34a,
  z: 0x006bd6,
};
const AXIS_LABEL_COLOURS = {
  x: "#e11d48",
  y: "#16a34a",
  z: "#006bd6",
};
const ENGINEERING_AXIS_DIRECTIONS = {
  x: new THREE.Vector3(1, 0, 0),
  y: new THREE.Vector3(0, 0, -1),
  z: new THREE.Vector3(0, 1, 0),
};

scene.add(new THREE.HemisphereLight(0xffffff, 0xb9c4ce, 2.35));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(8, -10, 18);
scene.add(sun);

const grid = new THREE.GridHelper(4, 8, 0x7dd3fc, 0xdbeafe);
scene.add(grid);

const axisScene = new THREE.Scene();
const axisCamera = new THREE.OrthographicCamera(-1.45, 1.45, 1.45, -1.45, 0.1, 10);
axisCamera.position.set(0, 0, 5);
const axisRenderer = axisGizmo
  ? new THREE.WebGLRenderer({ antialias: true, alpha: true })
  : null;
const axisGroup = new THREE.Group();
axisScene.add(axisGroup);
if (axisRenderer && axisGizmo) {
  axisRenderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
  axisGizmo.appendChild(axisRenderer.domElement);
}

function nodeVector(node) {
  // Engineering data is Z-up; Three.js renders Y-up. Keep this mapping local to the viewer.
  return new THREE.Vector3(node.x, node.z, -node.y);
}

function loadVector(load) {
  // Force components follow the same engineering-to-rendering adapter as node coordinates.
  return new THREE.Vector3(load.fxKN ?? 0, load.fzKN ?? 0, -(load.fyKN ?? 0));
}

function formatLoadVector(load) {
  const fx = Number(load.fxKN ?? 0).toFixed(2);
  const fy = Number(load.fyKN ?? 0).toFixed(2);
  const fz = Number(load.fzKN ?? 0).toFixed(2);
  return `Fx ${fx}, Fy ${fy}, Fz ${fz} kN`;
}

function formatSigned(value) {
  const number = Number(value ?? 0);
  const sign = number >= 0 ? "+" : "-";
  return `${sign}${Math.abs(number).toFixed(2)}`;
}

function dominantLoadComponent(load) {
  const components = [
    { axis: "X", value: Number(load.fxKN ?? 0) },
    { axis: "Y", value: Number(load.fyKN ?? 0) },
    { axis: "Z", value: Number(load.fzKN ?? 0) },
  ];
  return components.reduce((dominant, component) =>
    Math.abs(component.value) > Math.abs(dominant.value) ? component : dominant
  );
}

function formatLoadDirection(load) {
  const dominant = dominantLoadComponent(load);
  if (Math.abs(dominant.value) < 0.000001) return "--";
  return `Global ${dominant.value >= 0 ? "+" : "-"}${dominant.axis}`;
}

function formatLoadArrowLabel(load) {
  const dominant = dominantLoadComponent(load);
  if (Math.abs(dominant.value) < 0.000001) return "0.00 kN";
  return `${formatSigned(dominant.value)} kN`;
}

function makeTextSprite(text, options = {}) {
  const {
    width = 210,
    height = 52,
    font = "650 22px ui-monospace, SFMono-Regular, Consolas, monospace",
    colour = "#111827",
    strokeColour = "rgba(255, 255, 255, 0.92)",
    strokeWidth = 4,
    textX = 8,
    textY = 33,
    scale = [0.92, 0.23, 1],
  } = options;
  const canvas = document.createElement("canvas");
  canvas.width = width;
  canvas.height = height;
  const context = canvas.getContext("2d");
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.font = font;
  context.lineWidth = strokeWidth;
  if (strokeWidth > 0) {
    context.strokeStyle = strokeColour;
    context.strokeText(text, textX, textY);
  }
  context.fillStyle = colour;
  context.fillText(text, textX, textY);
  const texture = new THREE.CanvasTexture(canvas);
  const material = new THREE.SpriteMaterial({
    map: texture,
    depthTest: false,
    transparent: true,
  });
  const sprite = new THREE.Sprite(material);
  sprite.scale.set(scale[0], scale[1], scale[2]);
  return sprite;
}

function makeLoadLabel(text) {
  return makeTextSprite(text, {
    width: 190,
    height: 60,
    font: "780 32px ui-monospace, SFMono-Regular, Consolas, monospace",
    colour: "#92400e",
    strokeWidth: 5,
    textY: 40,
    scale: [1.02, 0.32, 1],
  });
}

function makeAxisLabel(text, colour, scale = [0.24, 0.13, 1]) {
  return makeTextSprite(text, {
    width: 64,
    height: 48,
    font: "800 28px ui-monospace, SFMono-Regular, Consolas, monospace",
    colour,
    strokeColour: "rgba(255, 255, 255, 0.95)",
    strokeWidth: 5,
    textX: 10,
    textY: 34,
    scale,
  });
}

function makeAxisArrow(direction, length, colour, headLength = 0.16, headWidth = 0.075) {
  const arrow = new THREE.ArrowHelper(
    direction.clone().normalize(),
    new THREE.Vector3(0, 0, 0),
    length,
    colour,
    headLength,
    headWidth
  );
  arrow.line.material.depthTest = false;
  arrow.cone.material.depthTest = false;
  return arrow;
}

function buildViewportAxisGizmo() {
  for (const [axis, direction] of Object.entries(ENGINEERING_AXIS_DIRECTIONS)) {
    const arrow = makeAxisArrow(direction, 1.05, AXIS_COLOURS[axis], 0.22, 0.1);
    const label = makeAxisLabel(axis.toUpperCase(), AXIS_LABEL_COLOURS[axis], [0.22, 0.12, 1]);
    label.position.copy(direction).multiplyScalar(1.28);
    axisGroup.add(arrow);
    axisGroup.add(label);
  }
}

function addGlobalOriginAxes() {
  const group = new THREE.Group();
  group.position.copy(nodeVector({ x: 0, y: 0, z: 0 }));
  const length = 0.72;

  for (const [axis, direction] of Object.entries(ENGINEERING_AXIS_DIRECTIONS)) {
    const arrow = makeAxisArrow(direction, length, AXIS_COLOURS[axis], 0.13, 0.055);
    const label = makeAxisLabel(axis.toUpperCase(), AXIS_LABEL_COLOURS[axis], [0.18, 0.1, 1]);
    label.position.copy(direction).multiplyScalar(length + 0.17);
    group.add(arrow);
    group.add(label);
  }

  scene.add(group);
  originAxisObjects.push(group);
}

function loadLabelVerticalOffset(load) {
  const corner = Number(String(load.nodeId ?? "").slice(-1));
  if (corner === 1) return 0.12;
  if (corner === 3) return -0.12;
  return 0;
}

function memberColour(member, maxAbsForce) {
  const magnitude = Math.min(Math.abs(member.axialForceKN) / Math.max(maxAbsForce, 0.001), 1);
  const low = new THREE.Color(0x64748b);
  const tension = new THREE.Color(0xe11d48);
  const compression = new THREE.Color(0x006bd6);
  if (Math.abs(member.axialForceKN) < 0.05) return low;
  return low.clone().lerp(member.axialForceKN > 0 ? tension : compression, 0.45 + magnitude * 0.55);
}

function makeMember(start, end, member, maxAbsForce) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(MEMBER_RADIUS_M, MEMBER_RADIUS_M, length, 10);
  const material = new THREE.MeshStandardMaterial({
    color: memberColour(member, maxAbsForce),
    roughness: 0.72,
    metalness: 0.0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  mesh.userData.member = member;

  const pickGeometry = new THREE.CylinderGeometry(MEMBER_PICK_RADIUS_M, MEMBER_PICK_RADIUS_M, length, 8);
  const pickMaterial = new THREE.MeshBasicMaterial({
    transparent: true,
    opacity: 0,
    depthWrite: false,
  });
  const pickMesh = new THREE.Mesh(pickGeometry, pickMaterial);
  pickMesh.position.copy(mesh.position);
  pickMesh.quaternion.copy(mesh.quaternion);
  pickMesh.userData.member = member;
  pickMesh.userData.visualObject = mesh;
  return { mesh, pickMesh };
}

function makeCylinderBetween(start, end, radius, colour) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(radius, radius, length, 12);
  const material = new THREE.MeshStandardMaterial({
    color: colour,
    roughness: 0.78,
    metalness: 0.0,
  });
  const mesh = new THREE.Mesh(geometry, material);
  mesh.position.copy(start).add(end).multiplyScalar(0.5);
  mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.normalize());
  return mesh;
}

function makeConeAt(position, direction, radius, height, colour) {
  const geometry = new THREE.ConeGeometry(radius, height, 18);
  const material = new THREE.MeshStandardMaterial({
    color: colour,
    roughness: 0.78,
    metalness: 0.0,
  });
  const cone = new THREE.Mesh(geometry, material);
  cone.position.copy(position);
  cone.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), direction.clone().normalize());
  return cone;
}

function addNodeMarker(node) {
  const geometry = new THREE.SphereGeometry(0.13, 18, 18);
  const material = new THREE.MeshStandardMaterial({ color: 0x0f172a, roughness: 0.68 });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(nodeVector(node));
  marker.userData.node = node;
  scene.add(marker);
  nodeObjects.push(marker);
}

function disposeRenderableTree(object) {
  scene.remove(object);
  object.traverse((child) => {
    if (child.geometry) child.geometry.dispose();
    if (child.material) {
      const materials = Array.isArray(child.material) ? child.material : [child.material];
      for (const material of materials) {
        if (material.map) material.map.dispose();
        material.dispose();
      }
    }
  });
}

function clearTower() {
  selectedObject = null;
  for (const object of memberObjects) {
    scene.remove(object);
    object.geometry.dispose();
    object.material.dispose();
  }
  for (const object of memberPickObjects) {
    scene.remove(object);
    object.geometry.dispose();
    object.material.dispose();
  }
  for (const object of nodeObjects) {
    scene.remove(object);
    object.geometry.dispose();
    object.material.dispose();
  }
  for (const object of loadObjects) {
    disposeRenderableTree(object);
  }
  for (const object of originAxisObjects) {
    disposeRenderableTree(object);
  }
  for (const object of supportObjects) {
    disposeRenderableTree(object);
  }
  memberObjects.length = 0;
  memberPickObjects.length = 0;
  nodeObjects.length = 0;
  loadObjects.length = 0;
  originAxisObjects.length = 0;
  supportObjects.length = 0;
}

function updateModelBounds() {
  modelBounds = new THREE.Box3();
  for (const object of [...memberObjects, ...nodeObjects]) {
    modelBounds.expandByObject(object);
  }
  if (modelBounds.isEmpty()) {
    modelCenter.set(0, 6, 0);
    modelRadius = 8;
    return;
  }
  modelBounds.getCenter(modelCenter);
  const sphere = new THREE.Sphere();
  modelBounds.getBoundingSphere(sphere);
  modelRadius = Math.max(sphere.radius, 1.5);
}

function setActiveViewButton(viewName) {
  activeView = viewName === "fit" ? "iso" : viewName;
  for (const button of viewButtons) {
    button.classList.toggle("is-active", button.dataset.view === activeView);
  }
}

function updateOrthoFrustum() {
  const width = viewer.clientWidth || 1;
  const height = viewer.clientHeight || 1;
  const aspect = width / height;
  const halfSize = Math.max(modelRadius * 1.65, 2.8);
  camera.left = -halfSize * aspect;
  camera.right = halfSize * aspect;
  camera.top = halfSize;
  camera.bottom = -halfSize;
  camera.updateProjectionMatrix();
}

function setCameraView(viewName) {
  if (!modelBounds) {
    return;
  }

  const distance = Math.max(modelRadius * 4.2, 8);
  const target = modelCenter.clone();
  camera.up.set(0, 1, 0);

  if (viewName === "front") {
    camera.position.set(target.x, target.y, target.z + distance);
  } else if (viewName === "side") {
    camera.position.set(target.x + distance, target.y, target.z);
  } else if (viewName === "plan") {
    camera.position.set(target.x, target.y + distance, target.z);
    camera.up.set(0, 0, -1);
  } else {
    camera.position.set(target.x + distance * 0.55, target.y + distance * 0.28, target.z + distance * 0.82);
    viewName = "iso";
  }

  camera.near = Math.max(distance / 100, 0.05);
  camera.far = distance * 8;
  updateOrthoFrustum();
  controls.target.copy(target);
  controls.update();
  setActiveViewButton(viewName);
}

function addLoadArrow(load, nodes, maxLoadMagnitude) {
  const node = nodes.get(load.nodeId);
  if (!node) return;
  const direction = loadVector(load);
  const magnitude = direction.length();
  if (magnitude <= 0) return;

  const origin = nodeVector(node);
  const unitDirection = direction.clone().normalize();
  const arrowLength = 0.48 + (magnitude / Math.max(maxLoadMagnitude, 0.001)) * 0.78;
  const shaftLength = Math.max(arrowLength - 0.16, 0.18);
  const shaftStart = origin.clone().add(unitDirection.clone().multiplyScalar(0.07));
  const shaftEnd = origin.clone().add(unitDirection.clone().multiplyScalar(shaftLength));
  const conePosition = origin.clone().add(unitDirection.clone().multiplyScalar(arrowLength));
  const group = new THREE.Group();
  const shaft = makeCylinderBetween(shaftStart, shaftEnd, 0.015, LOAD_COLOUR);
  const head = makeConeAt(conePosition, unitDirection, 0.062, 0.16, LOAD_COLOUR);
  group.add(shaft);
  group.add(head);
  if (viewer.clientWidth > 640) {
    const label = makeLoadLabel(formatLoadArrowLabel(load));
    label.position.copy(conePosition).add(unitDirection.clone().multiplyScalar(0.26));
    label.position.y += loadLabelVerticalOffset(load);
    label.userData.kind = "load-label";
    group.add(label);
  }
  group.userData.load = load;
  scene.add(group);
  loadObjects.push(group);
  updateDisplayOptions();
}

function updateDisplayOptions() {
  const showLoads = showLoadsToggle?.checked ?? true;
  for (const object of loadObjects) {
    object.visible = showLoads;
  }
}

function renderLoads(data, nodes) {
  const activeLoadCase = data.loadCases?.[0];
  const loads = activeLoadCase?.loads ?? [];
  const maxLoadMagnitude = Math.max(...loads.map((load) => loadVector(load).length()), 0);
  for (const load of loads) {
    addLoadArrow(load, nodes, maxLoadMagnitude);
  }

  const sumAppliedFx = loads.reduce((total, load) => total + Number(load.fxKN ?? 0), 0);
  labels.loadTitle.textContent = activeLoadCase?.name ?? "No active load case";
  labels.loadCount.textContent = String(loads.length);
  labels.sumAppliedFx.textContent = `${sumAppliedFx.toFixed(3)} kN`;
  const loadDirection = loads.length > 0 ? formatLoadDirection(loads[0]) : "--";
  labels.loadDirection.textContent = loads.length > 0 ? `${loadDirection} (${formatLoadVector(loads[0])})` : "--";
  labels.activeLoadDirection.textContent = loadDirection;
}

function maxDisplacement(nodes) {
  return nodes.reduce(
    (maxValue, node) => {
      const displacement = node.displacementM ?? {};
      const magnitude = Math.hypot(
        Number(displacement.ux ?? 0),
        Number(displacement.uy ?? 0),
        Number(displacement.uz ?? 0)
      );
      return magnitude > maxValue.magnitude ? { nodeId: node.id, magnitude } : maxValue;
    },
    { nodeId: "--", magnitude: 0 }
  );
}

function maxReaction(reactions) {
  return reactions.reduce(
    (maxValue, reaction) => {
      const magnitude = Math.abs(Number(reaction.valueKN ?? 0));
      return magnitude > maxValue.magnitude
        ? { nodeId: reaction.nodeId, component: reaction.component, magnitude, value: reaction.valueKN }
        : maxValue;
    },
    { nodeId: "--", component: "--", magnitude: 0, value: 0 }
  );
}

function updateSummaryTab(tabName) {
  activeResultTab = tabName;
  for (const button of resultTabButtons) {
    button.classList.toggle("is-active", button.dataset.resultTab === tabName);
  }
  if (!towerData) return;

  const loadCase = towerData.loadCases?.[0];
  const loads = loadCase?.loads ?? [];
  const maxAbsForce = towerData.checks.maxAbsAxialForceKN ?? 0;
  const displacement = maxDisplacement(towerData.nodes ?? []);
  const reaction = maxReaction(towerData.supportReactions ?? []);

  if (tabName === "member") {
    labels.activeResultType.textContent = "Member Axial";
    labels.summaryRowA.textContent = "Result Case";
    labels.summaryRowB.textContent = "Object Type";
    labels.summaryRowC.textContent = "Member Count";
    labels.summaryRowD.textContent = "Max |Axial|";
    labels.summaryRowE.textContent = "Colour Map";
    labels.summaryRowF.textContent = "Displayed Result";
    labels.summaryRowG.textContent = "Selection";
    labels.summaryRowH.textContent = "Source";
    labels.loadTitle.textContent = loadCase?.id ?? "LC1";
    labels.summaryType.textContent = "Truss member";
    labels.loadCount.textContent = String(towerData.members?.length ?? 0);
    labels.sumAppliedFx.textContent = `${maxAbsForce.toFixed(3)} kN`;
    labels.loadDirection.textContent = "Tension / compression sign";
    labels.summaryDisplay.textContent = "Axial force colour contour";
    labels.summaryEnvelope.textContent = selectedObject ? selectedObject.userData.member.id : "Click member";
    labels.summarySource.textContent = "Solved member forces";
    return;
  }

  if (tabName === "displacement") {
    labels.activeResultType.textContent = "Displacement";
    labels.summaryRowA.textContent = "Result Case";
    labels.summaryRowB.textContent = "Object Type";
    labels.summaryRowC.textContent = "Node Count";
    labels.summaryRowD.textContent = "Max |U|";
    labels.summaryRowE.textContent = "Node";
    labels.summaryRowF.textContent = "Display";
    labels.summaryRowG.textContent = "Shape";
    labels.summaryRowH.textContent = "Source";
    labels.loadTitle.textContent = loadCase?.id ?? "LC1";
    labels.summaryType.textContent = "Nodal displacement";
    labels.loadCount.textContent = String(towerData.nodes?.length ?? 0);
    labels.sumAppliedFx.textContent = `${displacement.magnitude.toFixed(6)} m`;
    labels.loadDirection.textContent = displacement.nodeId;
    labels.summaryDisplay.textContent = "Undeformed geometry";
    labels.summaryEnvelope.textContent = "Deformed shape next phase";
    labels.summarySource.textContent = "Solved nodal displacement";
    return;
  }

  if (tabName === "reaction") {
    labels.activeResultType.textContent = "Support Reaction";
    labels.summaryRowA.textContent = "Result Case";
    labels.summaryRowB.textContent = "Object Type";
    labels.summaryRowC.textContent = "Support Nodes";
    labels.summaryRowD.textContent = "Max Reaction";
    labels.summaryRowE.textContent = "Component";
    labels.summaryRowF.textContent = "Fx Balance";
    labels.summaryRowG.textContent = "Envelope";
    labels.summaryRowH.textContent = "Source";
    labels.loadTitle.textContent = loadCase?.id ?? "LC1";
    labels.summaryType.textContent = "Support reaction";
    labels.loadCount.textContent = String(towerData.supports?.length ?? 0);
    labels.sumAppliedFx.textContent = `${Number(reaction.value ?? 0).toFixed(3)} kN`;
    labels.loadDirection.textContent = `${reaction.nodeId} ${reaction.component}`;
    labels.summaryDisplay.textContent = `${Number(towerData.checks.forceBalanceFxKN ?? 0).toFixed(4)} kN`;
    labels.summaryEnvelope.textContent = "Base support reactions";
    labels.summarySource.textContent = "Solved reaction vector";
    return;
  }

  labels.activeResultType.textContent = "Nodal Load";
  labels.summaryRowA.textContent = "Load Case";
  labels.summaryRowB.textContent = "Object Type";
  labels.summaryRowC.textContent = "Load Count";
  labels.summaryRowD.textContent = "Applied Fx";
  labels.summaryRowE.textContent = "Direction";
  labels.summaryRowF.textContent = "Display";
  labels.summaryRowG.textContent = "Locations";
  labels.summaryRowH.textContent = "Source";
  labels.loadTitle.textContent = loadCase?.name ?? "No active load case";
  labels.summaryType.textContent = "Nodal load";
  labels.loadCount.textContent = String(loads.length);
  labels.sumAppliedFx.textContent = `${Number(towerData.checks.sumAppliedFxKN ?? 0).toFixed(3)} kN`;
  const loadDirection = loads.length > 0 ? formatLoadDirection(loads[0]) : "--";
  labels.loadDirection.textContent = loads.length > 0 ? `${loadDirection} (${formatLoadVector(loads[0])})` : "--";
  labels.summaryDisplay.textContent = "Arrows + signed values";
  labels.summaryEnvelope.textContent = loads.length > 0 ? `${loads[0].nodeId}-${loads[loads.length - 1].nodeId}` : "--";
  labels.summarySource.textContent = "Static JSON input";
}

function addSupportMarker(node, support) {
  const position = nodeVector(node);
  const preset = supportPreset?.value ?? "pinned";
  const group = new THREE.Group();
  group.position.copy(position);
  group.userData.support = support;

  if (preset === "fixed") {
    const blockMaterial = new THREE.MeshStandardMaterial({ color: 0x7c3aed, roughness: 0.58 });
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.16, 0.34), blockMaterial);
    base.position.set(0, -0.16, 0);
    const clamp = new THREE.Mesh(new THREE.BoxGeometry(0.2, 0.24, 0.2), blockMaterial);
    clamp.position.set(0, -0.01, 0);
    const label = makeTextSprite("FIX", {
      width: 92,
      height: 44,
      font: "800 24px ui-monospace, SFMono-Regular, Consolas, monospace",
      colour: "#5b21b6",
      textY: 30,
      scale: [0.32, 0.15, 1],
    });
    label.position.set(0.18, 0.12, 0.02);
    group.add(base, clamp, label);
  } else {
    const pinMaterial = new THREE.MeshStandardMaterial({ color: 0x16a34a, roughness: 0.62 });
    const cone = new THREE.Mesh(new THREE.ConeGeometry(0.19, 0.28, 3), pinMaterial);
    cone.position.set(0, -0.16, 0);
    cone.rotation.y = Math.PI / 6;
    const base = new THREE.Mesh(new THREE.BoxGeometry(0.34, 0.035, 0.34), pinMaterial);
    base.position.set(0, -0.31, 0);
    const label = makeTextSprite("PIN", {
      width: 92,
      height: 44,
      font: "800 24px ui-monospace, SFMono-Regular, Consolas, monospace",
      colour: "#15803d",
      textY: 30,
      scale: [0.32, 0.15, 1],
    });
    label.position.set(0.18, 0.1, 0.02);
    group.add(cone, base, label);
  }

  scene.add(group);
  supportObjects.push(group);
}

function clearSupportMarkers() {
  for (const object of supportObjects) {
    disposeRenderableTree(object);
  }
  supportObjects.length = 0;
}

function renderSupportMarkers() {
  clearSupportMarkers();
  for (const support of currentSupports) {
    const node = nodeMap.get(support.nodeId);
    if (node) addSupportMarker(node, support);
  }
}

function setSupportPreset(preset) {
  currentSupports = (towerData?.supports ?? []).map((support) => {
    if (preset === "fixed") {
      return { ...support, supportType: "fixed-frame-preview", ux: true, uy: true, uz: true, rx: true, ry: true, rz: true };
    }
    if (preset === "pinned") {
      return { ...support, supportType: "pinned-translational", ux: true, uy: true, uz: true, rx: false, ry: false, rz: false };
    }
    return { ...support };
  });
  renderSupportTable();
  renderSupportMarkers();
}

function renderSupportTable() {
  if (!supportTable) return;
  supportTable.replaceChildren();
  for (const support of currentSupports) {
    const row = document.createElement("div");
    row.className = "support-row";
    const node = document.createElement("strong");
    node.textContent = support.nodeId;
    row.appendChild(node);
    for (const component of ["ux", "uy", "uz", "rx", "ry", "rz"]) {
      const label = document.createElement("label");
      if (component.startsWith("r")) label.className = "is-rotational";
      const input = document.createElement("input");
      input.type = "checkbox";
      input.checked = Boolean(support[component]);
      if (component.startsWith("r")) {
        input.disabled = true;
        input.title = "Rotational DOF are shown for 6DOF context but are not active in the Phase 1 truss solver.";
      }
      input.addEventListener("change", () => {
        support[component] = input.checked;
        if (supportPreset) supportPreset.value = "custom";
        renderSupportMarkers();
      });
      label.appendChild(input);
      label.append(component.toUpperCase());
      row.appendChild(label);
    }
    supportTable.appendChild(row);
  }
}

function renderTower(data) {
  clearTower();
  const nodes = new Map(data.nodes.map((node) => [node.id, node]));
  nodeMap = nodes;
  const maxAbsForce = data.checks.maxAbsAxialForceKN ?? Math.max(...data.members.map((member) => Math.abs(member.axialForceKN)));

  for (const node of data.nodes) {
    addNodeMarker(node);
  }

  for (const member of data.members) {
    const start = nodeVector(nodes.get(member.startNodeId));
    const end = nodeVector(nodes.get(member.endNodeId));
    const { mesh, pickMesh } = makeMember(start, end, member, maxAbsForce);
    scene.add(mesh);
    scene.add(pickMesh);
    memberObjects.push(mesh);
    memberPickObjects.push(pickMesh);
  }
  setSupportPreset(supportPreset?.value ?? "pinned");
  renderLoads(data, nodes);

  updateModelBounds();
  addGlobalOriginAxes();
  setCameraView(activeView);

  labels.caseTitle.textContent = data.title;
  const activeLoadCase = data.loadCases?.[0]?.id ?? "LC1";
  labels.activeLoadCase.textContent = activeLoadCase;
  labels.panelLoadCase.textContent = activeLoadCase;
  labels.nodeCount.textContent = String(data.nodes.length);
  labels.memberCount.textContent = String(data.members.length);
  labels.maxForce.textContent = `${maxAbsForce.toFixed(2)} kN`;
  labels.forceBalance.textContent = `${Number(data.checks.forceBalanceFxKN ?? 0).toFixed(4)} kN`;
  updateSummaryTab(activeResultTab);
}

function interpretation(member) {
  if (member.forceState === "tension") {
    return "This member is carrying tensile axial force in the selected load case.";
  }
  if (member.forceState === "compression") {
    return "This member is carrying compressive axial force in the selected load case.";
  }
  return "This member has low axial force demand in the selected load case.";
}

function selectMember(object) {
  const visualObject = object.userData.visualObject ?? object;
  if (selectedObject) {
    selectedObject.material.color.copy(selectedObject.userData.baseColour);
  }
  selectedObject = visualObject;
  if (!visualObject.userData.baseColour) {
    visualObject.userData.baseColour = visualObject.material.color.clone();
  }
  visualObject.material.color.set(0x111827);

  const member = visualObject.userData.member;
  labels.selectionRowA.textContent = "Axial Force";
  labels.selectionRowB.textContent = "Length";
  labels.selectionRowC.textContent = "Group";
  labels.selectionRowD.textContent = "Section";
  labels.memberTitle.textContent = member.id;
  labels.memberState.textContent = member.forceState;
  labels.memberForce.textContent = `${member.axialForceKN.toFixed(3)} kN`;
  labels.memberLength.textContent = `${member.lengthM.toFixed(3)} m`;
  labels.memberGroup.textContent = member.group;
  labels.memberSection.textContent = member.sectionDesignation ?? "-";
  labels.memberInterpretation.textContent = interpretation(member);
  if (activeResultTab === "member") updateSummaryTab("member");
}

function selectNode(object) {
  if (selectedObject) {
    selectedObject.material.color.copy(selectedObject.userData.baseColour);
  }
  selectedObject = object;
  if (!object.userData.baseColour) {
    object.userData.baseColour = object.material.color.clone();
  }
  object.material.color.set(0xff8a00);

  const node = object.userData.node;
  const displacement = node.displacementM ?? {};
  labels.selectionRowA.textContent = "X";
  labels.selectionRowB.textContent = "Y";
  labels.selectionRowC.textContent = "Z";
  labels.selectionRowD.textContent = "Displacement";
  labels.memberTitle.textContent = node.id;
  labels.memberState.textContent = "node";
  labels.memberForce.textContent = `${Number(node.x ?? 0).toFixed(3)} m`;
  labels.memberLength.textContent = `${Number(node.y ?? 0).toFixed(3)} m`;
  labels.memberGroup.textContent = `${Number(node.z ?? 0).toFixed(3)} m`;
  labels.memberSection.textContent = `Ux ${Number(displacement.ux ?? 0).toFixed(6)}, Uy ${Number(displacement.uy ?? 0).toFixed(6)}, Uz ${Number(displacement.uz ?? 0).toFixed(6)} m`;
  labels.memberInterpretation.textContent =
    "Node coordinates are global engineering coordinates in SI units. The viewer maps engineering Z-up coordinates into the Three.js display frame.";
}

function clearSelection() {
  if (selectedObject) {
    selectedObject.material.color.copy(selectedObject.userData.baseColour);
  }
  selectedObject = null;
  labels.selectionRowA.textContent = "Axial Force";
  labels.selectionRowB.textContent = "Length";
  labels.selectionRowC.textContent = "Group";
  labels.selectionRowD.textContent = "Section";
  labels.memberTitle.textContent = "No object selected";
  labels.memberState.textContent = "No selection";
  labels.memberForce.textContent = "-";
  labels.memberLength.textContent = "-";
  labels.memberGroup.textContent = "-";
  labels.memberSection.textContent = "-";
  labels.memberInterpretation.textContent =
    "Click a tower member to review member results, or click a node to review global coordinates.";
  if (activeResultTab === "member") updateSummaryTab("member");
}

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pickMember(event) {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const nodeHits = raycaster.intersectObjects(nodeObjects, false);
  if (nodeHits.length > 0) {
    selectNode(nodeHits[0].object);
    return;
  }
  const hits = raycaster.intersectObjects(memberPickObjects, false);
  if (hits.length > 0) {
    selectMember(hits[0].object);
    return;
  }
  clearSelection();
}

function resetView() {
  setCameraView("iso");
}

function setInspectorWidth(width) {
  if (!appShell) return;
  const shellWidth = appShell.clientWidth || 0;
  const minWidth = 320;
  const maxWidth = Math.max(360, shellWidth - 420);
  const clamped = Math.min(Math.max(width, minWidth), maxWidth);
  appShell.style.setProperty("--inspector-width", `${clamped}px`);
  window.requestAnimationFrame(resize);
}

function startSplitResize(event) {
  if (!appShell || window.matchMedia("(max-width: 800px)").matches) return;
  event.preventDefault();
  splitResizer?.setPointerCapture?.(event.pointerId);
  appShell.classList.add("is-resizing");
  const move = (moveEvent) => {
    const rect = appShell.getBoundingClientRect();
    setInspectorWidth(rect.right - moveEvent.clientX - 8);
  };
  const stop = () => {
    appShell.classList.remove("is-resizing");
    window.removeEventListener("pointermove", move);
    window.removeEventListener("pointerup", stop);
  };
  window.addEventListener("pointermove", move);
  window.addEventListener("pointerup", stop, { once: true });
}

function resize() {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;
  renderer.setSize(width, height, false);
  if (axisRenderer && axisGizmo) {
    const size = axisGizmo.clientWidth || 92;
    axisRenderer.setSize(size, size, false);
  }
  updateOrthoFrustum();
}

async function loadData() {
  const response = await fetch("./public/data/tower-001.results.json", { cache: "no-cache" });
  if (!response.ok) {
    throw new Error(`Unable to load result JSON: ${response.status}`);
  }
  towerData = await response.json();
  renderTower(towerData);
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  if (axisRenderer) {
    axisGroup.quaternion.copy(camera.quaternion).invert();
    axisRenderer.render(axisScene, axisCamera);
  }
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
renderer.domElement.addEventListener("pointerup", pickMember);
splitResizer?.addEventListener("pointerdown", startSplitResize);
resetButton.addEventListener("click", resetView);
for (const button of viewButtons) {
  button.addEventListener("click", () => setCameraView(button.dataset.view));
}
showLoadsToggle?.addEventListener("change", updateDisplayOptions);
supportPreset?.addEventListener("change", () => setSupportPreset(supportPreset.value));
for (const button of resultTabButtons) {
  button.addEventListener("click", () => updateSummaryTab(button.dataset.resultTab));
}

resize();
buildViewportAxisGizmo();
loadData().catch((error) => {
  labels.caseTitle.textContent = "Result data failed to load";
  labels.memberInterpretation.textContent = error.message;
});
animate();
