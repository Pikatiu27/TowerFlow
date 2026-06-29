import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const viewer = document.querySelector("#viewer");
const axisGizmo = document.querySelector("#axis-gizmo");
const resetButton = document.querySelector("#reset-view");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
const showLoadsToggle = document.querySelector("#show-loads");
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
  memberInterpretation: document.querySelector("#member-interpretation"),
  activeLoadCase: document.querySelector("#active-load-case"),
  activeLoadDirection: document.querySelector("#active-load-direction"),
  panelLoadCase: document.querySelector("#panel-load-case"),
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xf4f6f8);

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
const nodeObjects = [];
const loadObjects = [];
const originAxisObjects = [];
let selectedObject = null;
let towerData = null;
let modelBounds = null;
let modelCenter = new THREE.Vector3(0, 6, 0);
let modelRadius = 8;
let activeView = "iso";
const MEMBER_RADIUS_M = 0.018;
const LOAD_COLOUR = 0x1f2937;
const AXIS_COLOURS = {
  x: 0xc9342c,
  y: 0x2f855a,
  z: 0x1479a8,
};
const AXIS_LABEL_COLOURS = {
  x: "#c9342c",
  y: "#2f855a",
  z: "#1479a8",
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

const grid = new THREE.GridHelper(4, 8, 0x94a3b8, 0xd6dde5);
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
  if (Math.abs(dominant.value) < 0.000001) return `${load.nodeId} 0.00 kN`;
  return `${load.nodeId} F${dominant.axis} ${formatSigned(dominant.value)} kN`;
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
    width: 270,
    height: 52,
    scale: [1.18, 0.23, 1],
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
  const low = new THREE.Color(0x94a3b8);
  const tension = new THREE.Color(0xc9342c);
  const compression = new THREE.Color(0x1479a8);
  if (Math.abs(member.axialForceKN) < 0.05) return low;
  return low.clone().lerp(member.axialForceKN > 0 ? tension : compression, 0.35 + magnitude * 0.65);
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
  return mesh;
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

function addNodeMarker(position) {
  const geometry = new THREE.SphereGeometry(0.055, 14, 14);
  const material = new THREE.MeshStandardMaterial({ color: 0x22313f, roughness: 0.75 });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(position);
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
  for (const object of memberObjects) {
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
  memberObjects.length = 0;
  nodeObjects.length = 0;
  loadObjects.length = 0;
  originAxisObjects.length = 0;
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

function renderTower(data) {
  clearTower();
  const nodes = new Map(data.nodes.map((node) => [node.id, node]));
  const maxAbsForce = data.checks.maxAbsAxialForceKN ?? Math.max(...data.members.map((member) => Math.abs(member.axialForceKN)));

  for (const node of data.nodes) {
    addNodeMarker(nodeVector(node));
  }

  for (const member of data.members) {
    const start = nodeVector(nodes.get(member.startNodeId));
    const end = nodeVector(nodes.get(member.endNodeId));
    const object = makeMember(start, end, member, maxAbsForce);
    scene.add(object);
    memberObjects.push(object);
  }
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
  if (selectedObject) {
    selectedObject.material.color.copy(selectedObject.userData.baseColour);
  }
  selectedObject = object;
  if (!object.userData.baseColour) {
    object.userData.baseColour = object.material.color.clone();
  }
  object.material.color.set(0x111827);

  const member = object.userData.member;
  labels.memberTitle.textContent = member.id;
  labels.memberState.textContent = member.forceState;
  labels.memberForce.textContent = `${member.axialForceKN.toFixed(3)} kN`;
  labels.memberLength.textContent = `${member.lengthM.toFixed(3)} m`;
  labels.memberGroup.textContent = member.group;
  labels.memberInterpretation.textContent = interpretation(member);
}

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pickMember(event) {
  updatePointer(event);
  raycaster.setFromCamera(pointer, camera);
  const hits = raycaster.intersectObjects(memberObjects, false);
  if (hits.length > 0) {
    selectMember(hits[0].object);
  }
}

function resetView() {
  setCameraView("iso");
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
resetButton.addEventListener("click", resetView);
for (const button of viewButtons) {
  button.addEventListener("click", () => setCameraView(button.dataset.view));
}
showLoadsToggle?.addEventListener("change", updateDisplayOptions);

resize();
buildViewportAxisGizmo();
loadData().catch((error) => {
  labels.caseTitle.textContent = "Result data failed to load";
  labels.memberInterpretation.textContent = error.message;
});
animate();
