import * as THREE from "https://cdn.jsdelivr.net/npm/three@0.166.1/build/three.module.js";
import { OrbitControls } from "https://cdn.jsdelivr.net/npm/three@0.166.1/examples/jsm/controls/OrbitControls.js";

const viewer = document.querySelector("#viewer");
const resetButton = document.querySelector("#reset-view");
const labels = {
  caseTitle: document.querySelector("#case-title"),
  nodeCount: document.querySelector("#node-count"),
  memberCount: document.querySelector("#member-count"),
  maxForce: document.querySelector("#max-force"),
  forceBalance: document.querySelector("#force-balance"),
  memberTitle: document.querySelector("#member-title"),
  memberState: document.querySelector("#member-state"),
  memberForce: document.querySelector("#member-force"),
  memberLength: document.querySelector("#member-length"),
  memberGroup: document.querySelector("#member-group"),
  memberInterpretation: document.querySelector("#member-interpretation"),
};

const scene = new THREE.Scene();
scene.background = new THREE.Color(0xeef3f6);

const camera = new THREE.PerspectiveCamera(45, 1, 0.1, 1000);
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: false });
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
viewer.appendChild(renderer.domElement);

const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.target.set(0, 0, 7);

const raycaster = new THREE.Raycaster();
raycaster.params.Line.threshold = 0.16;
const pointer = new THREE.Vector2();
const memberObjects = [];
let selectedObject = null;
let towerData = null;

scene.add(new THREE.HemisphereLight(0xffffff, 0x9fb0bd, 2.75));
const sun = new THREE.DirectionalLight(0xffffff, 2.2);
sun.position.set(8, -10, 18);
scene.add(sun);

const grid = new THREE.GridHelper(7, 7, 0x8fa0ae, 0xd5dee7);
grid.rotation.x = Math.PI / 2;
scene.add(grid);

function nodeVector(node) {
  return new THREE.Vector3(node.x, node.z, -node.y);
}

function memberColour(member, maxAbsForce) {
  const magnitude = Math.min(Math.abs(member.axialForceKN) / Math.max(maxAbsForce, 0.001), 1);
  const low = new THREE.Color(0x9aa6b2);
  const tension = new THREE.Color(0xd73d32);
  const compression = new THREE.Color(0x007fbd);
  if (Math.abs(member.axialForceKN) < 0.05) return low;
  return low.clone().lerp(member.axialForceKN > 0 ? tension : compression, 0.35 + magnitude * 0.65);
}

function makeMember(start, end, member, maxAbsForce) {
  const geometry = new THREE.BufferGeometry().setFromPoints([start, end]);
  const material = new THREE.LineBasicMaterial({
    color: memberColour(member, maxAbsForce),
    linewidth: 2,
  });
  const line = new THREE.Line(geometry, material);
  line.userData.member = member;
  return line;
}

function addNodeMarker(position) {
  const geometry = new THREE.SphereGeometry(0.055, 14, 14);
  const material = new THREE.MeshStandardMaterial({ color: 0x12313f, roughness: 0.5 });
  const marker = new THREE.Mesh(geometry, material);
  marker.position.copy(position);
  scene.add(marker);
}

function clearTower() {
  for (const object of memberObjects) {
    scene.remove(object);
    object.geometry.dispose();
    object.material.dispose();
  }
  memberObjects.length = 0;
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

  labels.caseTitle.textContent = data.title;
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
  camera.position.set(7, 12, 9);
  controls.target.set(0, 0, 7.5);
  controls.update();
}

function resize() {
  const width = viewer.clientWidth;
  const height = viewer.clientHeight;
  camera.aspect = width / Math.max(height, 1);
  camera.updateProjectionMatrix();
  renderer.setSize(width, height, false);
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
  requestAnimationFrame(animate);
}

window.addEventListener("resize", resize);
renderer.domElement.addEventListener("pointerup", pickMember);
resetButton.addEventListener("click", resetView);

resize();
resetView();
loadData().catch((error) => {
  labels.caseTitle.textContent = "Result data failed to load";
  labels.memberInterpretation.textContent = error.message;
});
animate();
