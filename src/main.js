import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";

const viewer = document.querySelector("#viewer");
const selectionCallout = document.querySelector("#selection-callout");
const infoPanel = document.querySelector(".info-panel");
const axisGizmo = document.querySelector("#axis-gizmo");
const appShell = document.querySelector(".app-shell");
const splitResizer = document.querySelector("#split-resizer");
const resetButton = document.querySelector("#reset-view");
const viewButtons = Array.from(document.querySelectorAll("[data-view]"));
const showLoadsToggle = document.querySelector("#show-loads");
const supportPreset = document.querySelector("#support-preset");
const supportTable = document.querySelector("#support-table");
const supportNote = document.querySelector("#support-note");
const resultCombinationSelect = document.querySelector("#result-combination-select");
const resultDirectionSelect = document.querySelector("#result-direction-select");
const resultSourceSection = document.querySelector("#result-source-section");
const resultDisplayType = document.querySelector("#result-display-type");
const reactionSummarySection = document.querySelector("#reaction-summary-section");
const reactionTableBody = document.querySelector("#reaction-table-body");
const displacementSummarySection = document.querySelector("#displacement-summary-section");
const deformationScaleInput = document.querySelector("#deformation-scale");
const selectionSection = document.querySelector("#selection-section");
const workspaceButtons = Array.from(document.querySelectorAll("[data-workspace-tab]"));
const workspaceSections = Array.from(document.querySelectorAll("[data-workspace-view]"));
const loadingOwnedSections = Array.from(document.querySelectorAll("[data-loading-owner]"));
const drawingsWorkspaceButton = document.querySelector('[data-workspace-tab="drawings"]');
const solverForm = document.querySelector("#solver-form");
const solveConsole = document.querySelector("#solve-console");
const runSolveButton = document.querySelector("#run-solve");
const solveStatus = document.querySelector("#solve-status");
const solveError = document.querySelector("#solve-error");
const analysisLifecycleAlert = document.querySelector("#analysis-lifecycle-alert");
const solveWindRegion = document.querySelector("#solve-wind-region");
const solveWindAri = document.querySelector("#solve-wind-ari");
const solveNorthAxis = document.querySelector("#solve-north-axis");
const solveCoastlineFraction = document.querySelector("#solve-coastline-fraction");
const coastlineField = document.querySelector("#coastline-field");
const windDirectionRows = Array.from(document.querySelectorAll("[data-wind-direction]"));
const windCalculationSummary = document.querySelector("#wind-calculation-summary");
const analysisStateBadge = document.querySelector("#analysis-state-badge");
const phase3ReviewSection = document.querySelector("#phase3-review-section");
const phase3ReviewDetailSection = document.querySelector("#phase3-review-detail-section");
const runPhase3ReviewButton = document.querySelector("#run-phase3-review");
const phase3ActionScenarioSelect = document.querySelector("#phase3-action-scenario");
const phase3ProjectInputFile = document.querySelector("#phase3-project-input-file");
const importPhase3ProjectInputButton = document.querySelector("#import-phase3-project-input");
const resetPhase3ProjectInputButton = document.querySelector("#reset-phase3-project-input");
const phase3ProjectInputState = document.querySelector("#phase3-project-input-state");
const phase3ProjectInputId = document.querySelector("#phase3-project-input-id");
const phase3ProjectInputAcceptance = document.querySelector("#phase3-project-input-acceptance");
const phase3ProjectInputCoverage = document.querySelector("#phase3-project-input-coverage");
const phase3ProjectInputErrors = document.querySelector("#phase3-project-input-errors");
const analysisModeButtons = Array.from(document.querySelectorAll("[data-analysis-mode]"));
const loadActionFilter = document.querySelector("#load-action-filter");
const combinationSelectAll = document.querySelector("#combination-select-all");
const combinationSituationInputs = Array.from(document.querySelectorAll("[data-combination-situation]"));
const loadingTabButtons = Array.from(document.querySelectorAll("[data-loading-tab]"));
const loadingViews = Array.from(document.querySelectorAll("[data-loading-view]"));
const loadingBoundary = document.querySelector("#loading-boundary");
const loadingPermanentCaseId = document.querySelector("#loading-permanent-case-id");
const loadingPermanentCaseTotal = document.querySelector("#loading-permanent-case-total");
const loadingWindCaseId = document.querySelector("#loading-wind-case-id");
const loadingWindCaseName = document.querySelector("#loading-wind-case-name");
const loadingWindCaseTotal = document.querySelector("#loading-wind-case-total");
const phase2InputStatus = document.querySelector("#phase2-input-status");
const discardPhase2ChangesButton = document.querySelector("#discard-phase2-changes");
const solveEquipmentSelect = document.querySelector("#solve-equipment-select");
const solveEquipmentHeight = document.querySelector("#solve-equipment-height");
const solveEquipmentArea = document.querySelector("#solve-equipment-area");
const solveEquipmentWeight = document.querySelector("#solve-equipment-weight");
const solvePermanentItemSelect = document.querySelector("#solve-permanent-item-select");
const solvePermanentItemType = document.querySelector("#solve-permanent-item-type");
const solvePermanentItemDistribution = document.querySelector("#solve-permanent-item-distribution");
const solvePermanentItemWeight = document.querySelector("#solve-permanent-item-weight");
const solvePermanentItemAzimuth = document.querySelector("#solve-permanent-item-azimuth");
const solvePermanentPointElevation = document.querySelector("#solve-permanent-point-elevation");
const solvePermanentBottomElevation = document.querySelector("#solve-permanent-bottom-elevation");
const solvePermanentTopElevation = document.querySelector("#solve-permanent-top-elevation");
const permanentPointElevationField = document.querySelector("#permanent-point-elevation-field");
const permanentBottomElevationField = document.querySelector("#permanent-bottom-elevation-field");
const permanentTopElevationField = document.querySelector("#permanent-top-elevation-field");
const addPermanentItemButton = document.querySelector("#add-permanent-item");
const removePermanentItemButton = document.querySelector("#remove-permanent-item");
const toggleResultReview = document.querySelector("#toggle-result-review");
const topMemberForceChart = document.querySelector("#top-member-force-chart");
const caseComparisonBody = document.querySelector("#case-comparison-body");
const reviewTabButtons = Array.from(document.querySelectorAll("[data-review-tab]"));
const reviewViews = Array.from(document.querySelectorAll("[data-review-view]"));
const legendPanel = document.querySelector("#viewport-legend");
const legendTitle = document.querySelector("#legend-title");
const legendNote = document.querySelector("#legend-note");
const resultLegendRows = Array.from(document.querySelectorAll('[data-legend-group="results"]'));
const loadLegendRows = Array.from(document.querySelectorAll('[data-legend-group="loads"]'));
const reactionLegendRows = Array.from(document.querySelectorAll('[data-legend-group="reactions"]'));
const deformationLegendRows = Array.from(document.querySelectorAll('[data-legend-group="deformation"]'));
const drawingWorkspace = document.querySelector("#drawing-workspace");
const drawingSvg = document.querySelector("#drawing-svg");
const drawingTypeButtons = Array.from(document.querySelectorAll("[data-drawing-type]"));
const drawingAnalysisSections = Array.from(document.querySelectorAll("[data-drawing-analysis-only]"));
const drawingControlledViews = document.querySelector("#drawing-controlled-views");
const drawingResultSetSelect = document.querySelector("#drawing-result-set-select");
const drawingSheet = document.querySelector(".drawing-sheet");
const drawingZoomButtons = Array.from(document.querySelectorAll("[data-drawing-zoom]"));
const drawingZoomFit = document.querySelector("#drawing-zoom-fit");
const drawingZoomValue = document.querySelector("#drawing-zoom-value");
const exportDrawingSvgButton = document.querySelector("#export-drawing-svg");
const projectBasisButton = document.querySelector("#project-basis-button");
const projectBasisDialog = document.querySelector("#project-basis-dialog");
const projectBasisClose = document.querySelector("#project-basis-close");
const solveRunLog = document.querySelector("#solve-run-log");
const solveRunLogSummary = document.querySelector("#solve-run-log-summary");
const solveRunLogEntries = document.querySelector("#solve-run-log-entries");
const readinessLabels = {
  model: document.querySelector("#readiness-model"),
  loads: document.querySelector("#readiness-loads"),
  combinations: document.querySelector("#readiness-combinations"),
  wind: document.querySelector("#readiness-wind"),
};
const queryParameters = new URLSearchParams(window.location.search);
const phase3ReviewEnabled = queryParameters.get("phase3-review") === "1";

globalThis.lucide?.createIcons();
const labels = {
  caseTitle: document.querySelector("#case-title"),
  nodeCount: document.querySelector("#node-count"),
  memberCount: document.querySelector("#member-count"),
  kpiMaxAxial: document.querySelector("#kpi-max-axial"),
  kpiMaxDisplacement: document.querySelector("#kpi-max-displacement"),
  kpiMaxReaction: document.querySelector("#kpi-max-reaction"),
  kpiForceBalance: document.querySelector("#kpi-force-balance"),
  displacementNode: document.querySelector("#displacement-node"),
  displacementUx: document.querySelector("#displacement-ux"),
  displacementUy: document.querySelector("#displacement-uy"),
  displacementUz: document.querySelector("#displacement-uz"),
  displacementMagnitude: document.querySelector("#displacement-magnitude"),
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
  activeLoadingKind: document.querySelector("#active-loading-kind"),
  activeLoadDirection: document.querySelector("#active-load-direction"),
  activeScenario: document.querySelector("#active-scenario"),
  activeResultContext: document.querySelector("#active-result-context"),
  viewerModelBadge: document.querySelector("#viewer-model-badge"),
  activeResultType: document.querySelector("#active-result-type"),
  panelLoadCase: document.querySelector("#panel-load-case"),
  modelId: document.querySelector("#model-id"),
  modelSchema: document.querySelector("#model-schema"),
  modelRevision: document.querySelector("#model-revision"),
  modelUnits: document.querySelector("#model-units"),
  modelHeight: document.querySelector("#model-height"),
  modelGroupCount: document.querySelector("#model-group-count"),
  modelSectionCount: document.querySelector("#model-section-count"),
  modelMaterial: document.querySelector("#model-material"),
  modelPropertySource: document.querySelector("#model-property-source"),
  modelSupportBasis: document.querySelector("#model-support-basis"),
  modelValidationState: document.querySelector("#model-validation-state"),
  modelValidationTitle: document.querySelector("#model-validation-title"),
  modelValidationSummary: document.querySelector("#model-validation-summary"),
  modelValidationIdentity: document.querySelector("#model-validation-identity"),
  modelValidationTopology: document.querySelector("#model-validation-topology"),
  modelValidationProperties: document.querySelector("#model-validation-properties"),
  modelValidationRestraints: document.querySelector("#model-validation-restraints"),
  modelValidationNote: document.querySelector("#model-validation-note"),
  calculatedRegionalSpeed: document.querySelector("#calculated-regional-speed"),
  calculatedDesignSpeedRange: document.querySelector("#calculated-design-speed-range"),
  calculatedWindStatus: document.querySelector("#calculated-wind-status"),
  phase3ReviewCommandStatus: document.querySelector("#phase3-review-command-status"),
  phase3ReviewReleaseStatus: document.querySelector("#phase3-review-release-status"),
  phase3ReviewProjectInput: document.querySelector("#phase3-review-project-input"),
  phase3ReviewInputAcceptance: document.querySelector("#phase3-review-input-acceptance"),
  phase3ReviewActionScenario: document.querySelector("#phase3-review-action-scenario"),
  phase3ReviewCombination: document.querySelector("#phase3-review-combination"),
  phase3ReviewMount: document.querySelector("#phase3-review-mount"),
  phase3ReviewAdapter: document.querySelector("#phase3-review-adapter"),
  phase3ReviewDirection: document.querySelector("#phase3-review-direction"),
  phase3ReviewMappingResidual: document.querySelector("#phase3-review-mapping-residual"),
  phase3ReviewStructuralResidual: document.querySelector("#phase3-review-structural-residual"),
  phase3ReviewInputHash: document.querySelector("#phase3-review-input-hash"),
  phase3ReviewSourceHash: document.querySelector("#phase3-review-source-hash"),
  phase3ReviewResultHash: document.querySelector("#phase3-review-result-hash"),
  phase3ReviewBoundary: document.querySelector("#phase3-review-boundary"),
  solveDirectionCount: document.querySelector("#solve-direction-count"),
  solveCombinationCount: document.querySelector("#solve-combination-count"),
  solveCaseCount: document.querySelector("#solve-case-count"),
  reviewCaseBadge: document.querySelector("#review-case-badge"),
  reviewEnvelopeDirection: document.querySelector("#review-envelope-direction"),
  reviewEnvelopeMember: document.querySelector("#review-envelope-member"),
  reviewEnvelopeReaction: document.querySelector("#review-envelope-reaction"),
  reviewMemberMax: document.querySelector("#review-member-max"),
  reviewCaseCount: document.querySelector("#review-case-count"),
  drawingDocumentId: document.querySelector("#drawing-document-id"),
  drawingTypeLabel: document.querySelector("#drawing-type-label"),
  drawingIssueState: document.querySelector("#drawing-issue-state"),
  drawingAnalysisSectionTitle: document.querySelector("#drawing-analysis-section-title"),
  drawingAnalysisQuantity: document.querySelector("#drawing-analysis-quantity"),
  drawingAnalysisBasis: document.querySelector("#drawing-analysis-basis"),
  drawingProfileVersion: document.querySelector("#drawing-profile-version"),
  drawingStandardAdoption: document.querySelector("#drawing-standard-adoption"),
  drawingModelId: document.querySelector("#drawing-model-id"),
  drawingGeometryRevision: document.querySelector("#drawing-geometry-revision"),
  drawingAnalysisRevision: document.querySelector("#drawing-analysis-revision"),
  drawingResultSetId: document.querySelector("#drawing-result-set-id"),
  drawingResultRange: document.querySelector("#drawing-result-range"),
  drawingLoadCase: document.querySelector("#drawing-load-case"),
  drawingCriticalMember: document.querySelector("#drawing-critical-member"),
  drawingOutputStatus: document.querySelector("#drawing-output-status"),
  drawingValidationState: document.querySelector("#drawing-validation-state"),
  drawingValidationTitle: document.querySelector("#drawing-validation-title"),
  drawingValidationSummary: document.querySelector("#drawing-validation-summary"),
  drawingValidationModel: document.querySelector("#drawing-validation-model"),
  drawingValidationIdentity: document.querySelector("#drawing-validation-identity"),
  drawingValidationAnnotations: document.querySelector("#drawing-validation-annotations"),
  drawingValidationMetadata: document.querySelector("#drawing-validation-metadata"),
  drawingValidationDirections: document.querySelector("#drawing-validation-directions"),
  drawingValidationEquilibrium: document.querySelector("#drawing-validation-equilibrium"),
  drawingValidationFreshness: document.querySelector("#drawing-validation-freshness"),
  drawingValidationPublic: document.querySelector("#drawing-validation-public"),
  drawingValidationNote: document.querySelector("#drawing-validation-note"),
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
const reactionObjects = [];
const deformedObjects = [];
const originAxisObjects = [];
const supportObjects = [];
let selectedObject = null;
let towerData = null;
let resultSourceData = null;
let phase2ResultData = null;
let phase3ReviewData = null;
let phase3ReviewRequest = null;
let phase3ReviewInputValidation = { ready: false, errors: ["No project-input package loaded"] };
let phase3ReviewIsSolving = false;
let phase2ResultsStale = false;
let activeAnalysisMode = "phase2";
const analysisResultSetIds = { phase2: null, "phase3-review": null };
let activeResultSetId = null;
let modelBounds = null;
let modelCenter = new THREE.Vector3(0, 6, 0);
let modelRadius = 8;
let activeView = "front";
let displayMode = "geometry";
let currentSupports = [];
let nodeMap = new Map();
let solverInputDraft = null;
let activeEquipmentIndex = -1;
let activePermanentItemIndex = -1;
let activeWorkspace = "results";
let activeResultQuantity = "member_axial";
let deformationScale = 20;
let reviewUserCollapsed = false;
let activeReviewView = "envelope";
let activeDrawingType = "ga";
let activeLoadingView = "cases";
let drawingProfileData = null;
let drawingAnnotationLayoutData = null;
let drawingDimensionRequirements = [];
let drawingResolvedAnnotations = [];
let drawingSelectedMemberId = null;
let drawingZoom = null;
const MEMBER_RADIUS_M = 0.018;
const MEMBER_PICK_RADIUS_M = 0.085;
const RESULT_MEMBER_SCALE = 3.2;
const LOW_FORCE_MEMBER_SCALE = 1.35;
const SELECTED_MEMBER_SCALE = 6;
const ZERO_FORCE_THRESHOLD_KN = 0.05;
const SELECTED_MEMBER_COLOUR = 0xf5b700;
const GEOMETRY_COLOUR = 0x111827;
const LOAD_COLOUR = 0xff8a00;
const PERMANENT_LOAD_COLOUR = 0x2563b8;
const LOADING_SITUATIONS = {
  ULS_WIND_STRENGTH: { label: "ULS Wind Strength", limitState: "ULS", prefix: "CO-ULS-STR-Wxxx", envelope: "EN-ULS-STR", expression: "1.2G + W_u (Q = 0)", factors: { G: 1.2, W: 1 } },
  ULS_WIND_REVERSAL: { label: "ULS Wind Reversal", limitState: "ULS", prefix: "CO-ULS-REV-Wxxx", envelope: "EN-ULS-REV", expression: "0.9G + W_u", factors: { G: 0.9, W: 1 } },
  SLS_WIND: { label: "SLS Wind", limitState: "SLS", prefix: "CO-SLS-Wxxx", envelope: "EN-SLS-W", expression: "G + W_s", factors: { G: 1, W: 1 } },
};
const REACTION_COLOUR = 0x00879a;
const DEFORMED_COLOUR = 0x7c3aed;
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
const SVG_NS = "http://www.w3.org/2000/svg";
const DRAWING_ZOOM_LEVELS = [0.6, 0.75, 1, 1.25, 1.5];

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

function formatDirectionDeg(value) {
  if (value === undefined || value === null || value === "") return "--";
  return `${Number(value).toFixed(0)} deg`;
}

function resultSetLabel(resultSet) {
  const loading = activeLoading(resultSet);
  const direction = formatDirectionDeg(resultSet?.windDirectionDeg ?? loading?.windDirectionDeg);
  return `${direction} / ${loading?.id ?? resultSet?.id ?? "result"}`;
}

function resultCombinationKey(resultSet) {
  const combination = resultSet?.loadCombination;
  if (combination?.designSituation) return combination.designSituation;
  if (combination?.expression) return `EXPRESSION:${combination.expression}`;
  if (combination?.id) return `COMBINATION:${combination.id.replace(/-W\d{3}$/i, "-Wxxx")}`;
  return resultSet?.verificationCaseId === "WIND-M01" ? "W_ONLY_REVIEW" : "PRIMARY_WIND";
}

function resultCombinationLabel(resultSet) {
  const key = resultCombinationKey(resultSet);
  const definition = LOADING_SITUATIONS[key];
  if (definition) return `${definition.label} / ${definition.expression}`;
  const combination = resultSet?.loadCombination;
  if (combination?.expression) return combination.expression;
  if (key === "W_ONLY_REVIEW") return "W only / controlled review";
  return "Primary wind cases";
}

function resultSetsForCombination(resultSets, combinationKey) {
  return resultSets.filter((resultSet) => resultCombinationKey(resultSet) === combinationKey);
}

function activeLoading(data) {
  return data?.loadCombination ?? data?.loadCases?.[0];
}

function reactionVector(reaction) {
  // Support reactions use the same global engineering basis as applied forces.
  return new THREE.Vector3(reaction.fxKN ?? 0, reaction.fzKN ?? 0, -(reaction.fyKN ?? 0));
}

function deformedNodeVector(node, scale = deformationScale) {
  const displacement = node.displacementM ?? {};
  return nodeVector({
    x: Number(node.x ?? 0) + Number(displacement.ux ?? 0) * scale,
    y: Number(node.y ?? 0) + Number(displacement.uy ?? 0) * scale,
    z: Number(node.z ?? 0) + Number(displacement.uz ?? 0) * scale,
  });
}

function svgElement(tagName, attributes = {}, textContent = "") {
  const element = document.createElementNS(SVG_NS, tagName);
  for (const [name, value] of Object.entries(attributes)) {
    if (value !== undefined && value !== null) element.setAttribute(name, String(value));
  }
  if (textContent) element.textContent = textContent;
  return element;
}

function appendSvgText(parent, x, y, text, className = "drawing-text", anchor = "start") {
  const element = svgElement("text", { x, y, class: className, "text-anchor": anchor }, text);
  parent.appendChild(element);
  return element;
}

function drawingSemanticId(value) {
  return String(value ?? "unscoped")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "");
}

function createDrawingSemanticGroup(parent, id, layerRole, attributes = {}) {
  const group = svgElement("g", {
    id,
    "data-view-id": attributes.viewId,
    "data-schedule-id": attributes.scheduleId,
    "data-layer-role": layerRole,
    "data-source-id": attributes.sourceId,
  });
  parent.appendChild(group);
  return group;
}

function drawingProjection(node, projection, deformationScale = 0) {
  const displacement = node.displacementM ?? {};
  const x = Number(node.x ?? 0) + Number(displacement.ux ?? 0) * deformationScale;
  const y = Number(node.y ?? 0) + Number(displacement.uy ?? 0) * deformationScale;
  const z = Number(node.z ?? 0) + Number(displacement.uz ?? 0) * deformationScale;
  if (projection === "plan") return [x, y];
  if (projection === "side") return [y, z];
  if (projection === "iso") return [x - y * 0.58, z + y * 0.24];
  return [x, z];
}

function drawingProjectionMapper(nodes, projection, region, deformationScale = 0) {
  const points = nodes.map((node) => drawingProjection(node, projection, deformationScale));
  const xs = points.map((point) => point[0]);
  const ys = points.map((point) => point[1]);
  const minX = Math.min(...xs);
  const maxX = Math.max(...xs);
  const minY = Math.min(...ys);
  const maxY = Math.max(...ys);
  const rangeX = Math.max(maxX - minX, 0.001);
  const rangeY = Math.max(maxY - minY, 0.001);
  const padding = region.padding ?? 22;
  const availableWidth = Math.max(region.width - padding * 2, 1);
  const availableHeight = Math.max(region.height - padding * 2, 1);
  const scale = Math.min(availableWidth / rangeX, availableHeight / rangeY);
  const modelWidth = rangeX * scale;
  const modelHeight = rangeY * scale;
  const offsetX = region.x + (region.width - modelWidth) / 2;
  const offsetY = region.y + (region.height - modelHeight) / 2;
  return (node) => {
    const point = drawingProjection(node, projection, deformationScale);
    return [
      offsetX + (point[0] - minX) * scale,
      offsetY + modelHeight - (point[1] - minY) * scale,
    ];
  };
}

function drawingForceState(member) {
  if (member.forceState === "tension" || member.forceState === "compression") return member.forceState;
  const force = Number(member.axialForceKN ?? 0);
  if (Math.abs(force) <= ZERO_FORCE_THRESHOLD_KN) return "low";
  return force > 0 ? "tension" : "compression";
}

function drawingCriticalMember(data) {
  if (!data?.members?.length) return null;
  return data.members.reduce((critical, member) =>
    Math.abs(Number(member.axialForceKN ?? 0)) > Math.abs(Number(critical.axialForceKN ?? 0))
      ? member
      : critical
  );
}

function drawingGlobalMaxForce(data) {
  const resultSets = resultSourceData?.resultSets ?? [];
  const members = resultSets.flatMap((resultSet) => resultSet.members ?? []);
  const sourceMembers = members.length > 0 ? members : data?.members ?? [];
  return Math.max(...sourceMembers.map((member) => Math.abs(Number(member.axialForceKN ?? 0))), 0.001);
}

function drawingForceExtrema(data) {
  const members = data.members ?? [];
  const sorted = [...members].sort(
    (left, right) => Math.abs(Number(right.axialForceKN ?? 0)) - Math.abs(Number(left.axialForceKN ?? 0))
  );
  const tension = members
    .filter((member) => Number(member.axialForceKN ?? 0) > 0)
    .sort((left, right) => Number(right.axialForceKN ?? 0) - Number(left.axialForceKN ?? 0))[0] ?? null;
  const compression = members
    .filter((member) => Number(member.axialForceKN ?? 0) < 0)
    .sort((left, right) => Number(left.axialForceKN ?? 0) - Number(right.axialForceKN ?? 0))[0] ?? null;
  return { critical: sorted[0] ?? null, tension, compression };
}

function drawingSupportReactionRows(data) {
  const byNode = new Map();
  for (const reaction of data.supportReactions ?? []) {
    const values = byNode.get(reaction.nodeId) ?? { nodeId: reaction.nodeId, fxKN: 0, fyKN: 0, fzKN: 0 };
    if (reaction.component in values) values[reaction.component] = Number(reaction.valueKN ?? 0);
    byNode.set(reaction.nodeId, values);
  }
  return [...byNode.values()]
    .map((row) => ({ ...row, magnitudeKN: Math.hypot(row.fxKN, row.fyKN, row.fzKN) }))
    .sort((left, right) => left.nodeId.localeCompare(right.nodeId));
}

function drawViewFrame(parent, region, title, subtitle) {
  parent.appendChild(svgElement("rect", {
    x: region.x,
    y: region.y,
    width: region.width,
    height: region.height,
    class: "drawing-view-frame",
  }));
  appendSvgText(parent, region.x + 10, region.y + 18, title, "drawing-view-title");
  appendSvgText(parent, region.x + 10, region.y + 34, subtitle, "drawing-view-subtitle");
}

function drawReviewTable(parent, region, columns, rows, options = {}) {
  const x = region.x + 16;
  const width = region.width - 32;
  const top = options.top ?? region.y + 52;
  const rowHeight = options.rowHeight ?? 22;
  const columnFractions = columns.map((column) => column.width);
  const totalFraction = columnFractions.reduce((sum, value) => sum + value, 0);
  const columnStarts = [];
  let cursor = x;
  for (const fraction of columnFractions) {
    columnStarts.push(cursor);
    cursor += width * fraction / totalFraction;
  }

  parent.appendChild(svgElement("rect", {
    x,
    y: top,
    width,
    height: rowHeight,
    class: "drawing-table-header-bg",
  }));
  columns.forEach((column, index) => {
    appendSvgText(parent, columnStarts[index] + 6, top + 14, column.label, "drawing-table-header");
  });

  rows.forEach((row, rowIndex) => {
    const rowY = top + rowHeight * (rowIndex + 1);
    const rowSourceId = options.rowSourceIds?.[rowIndex];
    const rowParent = rowSourceId
      ? createDrawingSemanticGroup(
          parent,
          `${drawingSemanticId(options.semanticId ?? "schedule")}-row-${rowIndex + 1}-${drawingSemanticId(rowSourceId)}`,
          options.rowLayerRole ?? "schedule-row",
          { viewId: parent.getAttribute("data-view-id"), sourceId: rowSourceId }
        )
      : parent;
    if (rowIndex % 2 === 1) {
      rowParent.appendChild(svgElement("rect", {
        x,
        y: rowY,
        width,
        height: rowHeight,
        class: "drawing-table-alt-bg",
      }));
    }
    rowParent.appendChild(svgElement("line", {
      x1: x,
      y1: rowY + rowHeight,
      x2: x + width,
      y2: rowY + rowHeight,
      class: "drawing-table-rule",
    }));
    row.forEach((value, columnIndex) => {
      appendSvgText(
        rowParent,
        columnStarts[columnIndex] + 6,
        rowY + 14,
        String(value),
        columnIndex === 0 ? "drawing-table-key" : "drawing-table-value"
      );
    });
  });
}

function drawReviewList(parent, region, items, options = {}) {
  let y = options.top ?? region.y + 54;
  const lineStep = options.lineStep ?? 28;
  for (const item of items) {
    parent.appendChild(svgElement("rect", {
      x: region.x + 16,
      y: y - 8,
      width: 5,
      height: 5,
      class: "drawing-review-bullet",
    }));
    appendSvgText(parent, region.x + 30, y, item, "drawing-review-list-text");
    y += lineStep;
  }
}

function drawProjectedModel(parent, data, projection, region, options = {}) {
  const nodes = data.nodes ?? [];
  const members = data.members ?? [];
  const nodesById = new Map(nodes.map((node) => [node.id, node]));
  const mapPoint = drawingProjectionMapper(nodes, projection, region, options.deformationScale ?? 0);
  const critical = options.criticalMember ?? null;
  const viewId = options.viewId ?? parent.getAttribute("data-view-id") ?? "UNSCOPED";
  const layerRole = options.layerRole ?? (options.results ? "results" : "geometry");
  const semanticViewId = drawingSemanticId(viewId);
  const semanticLayerRole = drawingSemanticId(layerRole);

  for (const member of members) {
    const startNode = nodesById.get(member.startNodeId);
    const endNode = nodesById.get(member.endNodeId);
    if (!startNode || !endNode) continue;
    if (options.memberFilter && !options.memberFilter(member, startNode, endNode)) continue;
    const [x1, y1] = mapPoint(startNode);
    const [x2, y2] = mapPoint(endNode);
    const forceState = drawingForceState(member);
    const classes = [
      "drawing-member",
      options.results ? `is-${forceState}` : "is-geometry",
      member.id === drawingSelectedMemberId ? "is-selected" : "",
    ].filter(Boolean).join(" ");
    const line = svgElement("line", {
      id: `${semanticViewId}-${semanticLayerRole}-member-${drawingSemanticId(member.id)}`,
      x1,
      y1,
      x2,
      y2,
      class: classes,
      "data-drawing-member-id": member.id,
      "data-view-id": viewId,
      "data-layer-role": layerRole,
      "data-source-id": member.id,
    });
    line.appendChild(svgElement("title", {}, `${member.id}: ${Number(member.axialForceKN ?? 0).toFixed(3)} kN`));
    parent.appendChild(line);
  }

  if (critical) {
    const startNode = nodesById.get(critical.startNodeId);
    const endNode = nodesById.get(critical.endNodeId);
    if (startNode && endNode) {
      const [x1, y1] = mapPoint(startNode);
      const [x2, y2] = mapPoint(endNode);
      parent.appendChild(svgElement("line", {
        id: `${semanticViewId}-critical-result-${drawingSemanticId(critical.id)}`,
        x1,
        y1,
        x2,
        y2,
        class: "drawing-critical-halo",
        "data-drawing-member-id": critical.id,
        "data-view-id": viewId,
        "data-layer-role": "critical-result",
        "data-source-id": critical.id,
      }));
      const labelX = (x1 + x2) / 2;
      const labelY = (y1 + y2) / 2;
      parent.appendChild(svgElement("rect", {
        x: labelX + 7,
        y: labelY - 17,
        width: 128,
        height: 25,
        class: "drawing-critical-label-bg",
      }));
      appendSvgText(
        parent,
        labelX + 14,
        labelY,
        `${critical.id}  ${Number(critical.axialForceKN ?? 0).toFixed(2)} kN`,
        "drawing-critical-label"
      );
    }
  }
  return mapPoint;
}

function drawingPaperPoint(point) {
  const units = drawingAnnotationLayoutData.coordinateSystem.svgUnitsPerMillimetre;
  return point.map((value) => Number((value / units).toFixed(3)));
}

function drawingSvgPoint(point) {
  const units = drawingAnnotationLayoutData.coordinateSystem.svgUnitsPerMillimetre;
  return point.map((value) => value * units);
}

function drawingBoxesOverlap(left, right, clearance) {
  return !(
    left.max[0] + clearance <= right.min[0]
    || right.max[0] + clearance <= left.min[0]
    || left.max[1] + clearance <= right.min[1]
    || right.max[1] + clearance <= left.min[1]
  );
}

function createLinearDimensionRequirement(options) {
  return {
    dimension_id: options.id,
    dimension_type: "LINEAR",
    intent: options.intent,
    lifecycle_role: "REFERENCE_ONLY",
    reference_entities: [
      { feature_ref: options.startNode.id, role: "START" },
      { feature_ref: options.endNode.id, role: "END" },
    ],
    coordinate_system_ref: "GLOBAL-XYZ",
    measurement_direction: {
      basis: "GLOBAL_AXIS",
      axis_ref: options.axis,
      vector: null,
    },
    measurement_method: "POINT_TO_POINT_PROJECTED",
    canonical_unit: "m",
    preferred_view: options.viewId,
    style_id: "towerflow-annotation-layout.dimension",
    display_policy_ref: "towerflow-annotation-layout@0.1.0",
    importance: "GENERAL",
    tolerance: {
      status: "REFERENCE_ONLY",
      upper_deviation: null,
      lower_deviation: null,
      upper_limit: null,
      lower_limit: null,
      fit_or_class: null,
      governing_source_ref: "docs/demo-tower-reference.md",
    },
    source_requirement_ref: "docs/demo-tower-reference.md#controlled-demo-geometry",
    model_revision: options.modelRevision,
    manual_value_override: false,
  };
}

function resolveLinearDimension(requirement, options) {
  const layout = drawingAnnotationLayoutData;
  const units = layout.coordinateSystem.svgUnitsPerMillimetre;
  const metric = layout.textMetrics;
  const geometry = layout.geometry;
  const horizontal = options.orientation === "horizontal";
  const start = options.start;
  const end = options.end;
  const direction = Math.sign(options.lineCoordinate - (horizontal ? start[1] : start[0])) || 1;
  const startIntersection = horizontal
    ? [start[0], options.lineCoordinate]
    : [options.lineCoordinate, start[1]];
  const endIntersection = horizontal
    ? [end[0], options.lineCoordinate]
    : [options.lineCoordinate, end[1]];
  const featureGap = geometry.featureGapMm * units;
  const overshoot = geometry.extensionOvershootMm * units;
  const arrowLength = geometry.arrowLengthMm * units;
  const arrowHalfWidth = geometry.arrowHalfWidthMm * units;
  const textWidth = (options.label.length * metric.characterAdvanceMm + metric.horizontalPaddingMm * 2) * units;
  const textHeight = (metric.paperHeightMm + metric.verticalPaddingMm * 2) * units;
  const midpoint = horizontal
    ? [(startIntersection[0] + endIntersection[0]) / 2, options.lineCoordinate - geometry.textGapMm * units]
    : [options.lineCoordinate - geometry.textGapMm * units, (startIntersection[1] + endIntersection[1]) / 2];
  const textBoxSvg = horizontal
    ? { min: [midpoint[0] - textWidth / 2, midpoint[1] - textHeight / 2], max: [midpoint[0] + textWidth / 2, midpoint[1] + textHeight / 2] }
    : { min: [midpoint[0] - textHeight / 2, midpoint[1] - textWidth / 2], max: [midpoint[0] + textHeight / 2, midpoint[1] + textWidth / 2] };
  const extensionStart = (point) => horizontal
    ? [point[0], point[1] + direction * featureGap]
    : [point[0] + direction * featureGap, point[1]];
  const extensionEnd = (intersection) => horizontal
    ? [intersection[0], intersection[1] + direction * overshoot]
    : [intersection[0] + direction * overshoot, intersection[1]];
  const arrows = horizontal
    ? [
        [startIntersection, [startIntersection[0] + arrowLength, startIntersection[1] - arrowHalfWidth], [startIntersection[0] + arrowLength, startIntersection[1] + arrowHalfWidth]],
        [endIntersection, [endIntersection[0] - arrowLength, endIntersection[1] - arrowHalfWidth], [endIntersection[0] - arrowLength, endIntersection[1] + arrowHalfWidth]],
      ]
    : [
        [startIntersection, [startIntersection[0] - arrowHalfWidth, startIntersection[1] + arrowLength], [startIntersection[0] + arrowHalfWidth, startIntersection[1] + arrowLength]],
        [endIntersection, [endIntersection[0] - arrowHalfWidth, endIntersection[1] - arrowLength], [endIntersection[0] + arrowHalfWidth, endIntersection[1] - arrowLength]],
      ];
  const viewBounds = {
    min: drawingPaperPoint([options.viewBounds.x, options.viewBounds.y]),
    max: drawingPaperPoint([options.viewBounds.x + options.viewBounds.width, options.viewBounds.y + options.viewBounds.height]),
  };
  const textBox = { min: drawingPaperPoint(textBoxSvg.min), max: drawingPaperPoint(textBoxSvg.max) };
  const border = layout.clearanceMm.annotationToBorder;
  const annotationPoints = [
    startIntersection,
    endIntersection,
    extensionStart(start),
    extensionEnd(startIntersection),
    extensionStart(end),
    extensionEnd(endIntersection),
    ...arrows.flat(),
  ].map(drawingPaperPoint);
  const geometryInsidePrintableArea = annotationPoints.every((point) =>
    point[0] >= viewBounds.min[0] + border
    && point[1] >= viewBounds.min[1] + border
    && point[0] <= viewBounds.max[0] - border
    && point[1] <= viewBounds.max[1] - border
  );
  const insidePrintableArea = geometryInsidePrintableArea
    && textBox.min[0] >= viewBounds.min[0] + border
    && textBox.min[1] >= viewBounds.min[1] + border
    && textBox.max[0] <= viewBounds.max[0] - border
    && textBox.max[1] <= viewBounds.max[1] - border;
  const textCollision = drawingResolvedAnnotations.some((annotation) =>
    annotation.view_id === requirement.preferred_view
    && drawingBoxesOverlap(textBox, annotation.text.bounding_box, layout.clearanceMm.textToText)
  );
  const validTargets = requirement.reference_entities.length === 2
    && requirement.reference_entities.every((entity) => entity.feature_ref);
  const fontMetricsPinned = Boolean(metric.revision && metric.renderWidthPolicy === "SVG_TEXT_LENGTH_PINNED");
  const valueMatchesRequirement = Number.isFinite(options.canonicalValue);
  const typeContractValid = requirement.dimension_type === "LINEAR";
  const releaseBlocking = !insidePrintableArea
    || textCollision
    || !validTargets
    || !fontMetricsPinned
    || !valueMatchesRequirement
    || !typeContractValid;
  const paperOffset = Math.abs(options.lineCoordinate - (horizontal ? (start[1] + end[1]) / 2 : (start[0] + end[0]) / 2)) / units;
  const toPaperSegment = (segment) => ({ start: drawingPaperPoint(segment.start), end: drawingPaperPoint(segment.end) });
  return {
    annotation_id: `${requirement.dimension_id}-ANN`,
    annotation_type: "LINEAR_DIMENSION",
    source_requirement_ref: requirement.dimension_id,
    view_id: requirement.preferred_view,
    model_revision: requirement.model_revision,
    layout_profile_id: `${layout.profileId}@${layout.version}`,
    text_metrics_revision: metric.revision,
    canonical_value: options.canonicalValue,
    canonical_unit: requirement.canonical_unit,
    anchors: {
      target_refs: requirement.reference_entities.map((entity) => entity.feature_ref),
      target_points: [drawingPaperPoint(start), drawingPaperPoint(end)],
      extension_origins: [drawingPaperPoint(start), drawingPaperPoint(end)],
      dimension_intersections: [drawingPaperPoint(startIntersection), drawingPaperPoint(endIntersection)],
      arrow_tip_points: [drawingPaperPoint(startIntersection), drawingPaperPoint(endIntersection)],
      datum_origin: null,
    },
    geometry: {
      dimension_lines: [toPaperSegment({ start: startIntersection, end: endIntersection })],
      extension_lines: [
        toPaperSegment({ start: extensionStart(start), end: extensionEnd(startIntersection) }),
        toPaperSegment({ start: extensionStart(end), end: extensionEnd(endIntersection) }),
      ],
      leader_polylines: [],
      arrow_polygons: arrows.map((polygon) => polygon.map(drawingPaperPoint)),
      symbol_paths: [],
    },
    text: {
      value: options.label,
      display_unit: requirement.canonical_unit,
      rounding_policy_id: "ROUND_HALF_AWAY_FROM_ZERO_0.001_M",
      insertion_point: drawingPaperPoint(midpoint),
      rotation: horizontal ? 0 : -90,
      bounding_box: textBox,
    },
    placement: {
      zone: options.zone,
      lane_index: options.laneIndex,
      paper_offset_mm: Number(paperOffset.toFixed(3)),
      candidate_rank: 0,
    },
    validation: {
      value_matches_requirement: valueMatchesRequirement,
      type_contract_valid: typeContractValid,
      feature_targets_valid: validTargets,
      font_metrics_pinned: fontMetricsPinned,
      text_collision: textCollision,
      geometry_collision: false,
      leader_crossing: false,
      inside_printable_area: insidePrintableArea,
      release_blocking: releaseBlocking,
      rule_results: [
        `ANN-TARGET-001:${validTargets ? "PASS" : "FAIL"}`,
        `ANN-COLL-001:${textCollision ? "FAIL" : "PASS"}`,
        `ANN-METRIC-001:${fontMetricsPinned ? "PASS" : "FAIL"}`,
        `ANN-FALLBACK-001:${releaseBlocking ? "FAIL" : "PASS"}`,
      ],
    },
    manual_adjustment: null,
  };
}

function renderResolvedLinearDimension(parent, annotation) {
  if (annotation.validation.release_blocking) return;
  parent.setAttribute("data-annotation-id", annotation.annotation_id);
  parent.setAttribute("data-requirement-id", annotation.source_requirement_ref);
  parent.setAttribute("data-validation", "pass");
  for (const segment of annotation.geometry.extension_lines) {
    const start = drawingSvgPoint(segment.start);
    const end = drawingSvgPoint(segment.end);
    parent.appendChild(svgElement("line", { x1: start[0], y1: start[1], x2: end[0], y2: end[1], class: "drawing-extension-line" }));
  }
  for (const segment of annotation.geometry.dimension_lines) {
    const start = drawingSvgPoint(segment.start);
    const end = drawingSvgPoint(segment.end);
    parent.appendChild(svgElement("line", { x1: start[0], y1: start[1], x2: end[0], y2: end[1], class: "drawing-dimension-line" }));
  }
  for (const polygon of annotation.geometry.arrow_polygons) {
    parent.appendChild(svgElement("polygon", {
      points: polygon.map((point) => drawingSvgPoint(point).join(",")).join(" "),
      class: "drawing-dimension-arrow",
    }));
  }
  const metric = drawingAnnotationLayoutData.textMetrics;
  const units = drawingAnnotationLayoutData.coordinateSystem.svgUnitsPerMillimetre;
  const insertion = drawingSvgPoint(annotation.text.insertion_point);
  const textWidth = annotation.text.value.length * metric.characterAdvanceMm * units;
  const textHeight = metric.paperHeightMm * units;
  const rotation = annotation.text.rotation;
  const transform = rotation ? `rotate(${rotation} ${insertion[0]} ${insertion[1]})` : undefined;
  parent.appendChild(svgElement("rect", {
    x: insertion[0] - textWidth / 2 - metric.horizontalPaddingMm * units,
    y: insertion[1] - textHeight / 2 - metric.verticalPaddingMm * units,
    width: textWidth + metric.horizontalPaddingMm * units * 2,
    height: textHeight + metric.verticalPaddingMm * units * 2,
    class: "drawing-dimension-text-bg",
    transform,
  }));
  const text = appendSvgText(parent, insertion[0], insertion[1] + textHeight * 0.35, annotation.text.value, "drawing-dimension-text", "middle");
  text.setAttribute("textLength", textWidth);
  text.setAttribute("lengthAdjust", "spacingAndGlyphs");
  if (transform) text.setAttribute("transform", transform);
}

function appendResolvedAnnotationMetadata(svg) {
  const metadata = svgElement("metadata", { id: "tf-ga-annotation-contract" });
  metadata.textContent = JSON.stringify({
    layoutProfile: `${drawingAnnotationLayoutData.profileId}@${drawingAnnotationLayoutData.version}`,
    dimensionRequirements: drawingDimensionRequirements,
    resolvedAnnotations: drawingResolvedAnnotations,
  });
  svg.appendChild(metadata);
}

function drawingModelExtents(data) {
  const nodes = data.nodes ?? [];
  const xs = nodes.map((node) => Number(node.x ?? 0));
  const ys = nodes.map((node) => Number(node.y ?? 0));
  const zs = nodes.map((node) => Number(node.z ?? 0));
  return {
    height: Math.max(...zs) - Math.min(...zs),
    widthX: Math.max(...xs) - Math.min(...xs),
    widthY: Math.max(...ys) - Math.min(...ys),
  };
}

function drawSheetBorder(parent, title, sheetTitle) {
  parent.appendChild(svgElement("rect", { x: 12, y: 12, width: 1164, height: 816, class: "drawing-sheet-border" }));
  appendSvgText(parent, 34, 42, title, "drawing-sheet-heading");
  appendSvgText(parent, 1152, 42, sheetTitle, "drawing-sheet-code", "end");
  parent.appendChild(svgElement("line", { x1: 32, y1: 51, x2: 1156, y2: 51, class: "drawing-rule" }));
}

function drawingCaseReviewIds(documentType) {
  return drawingProfileData?.standardAdoption?.preDrawingCaseReviews?.[documentType] ?? [];
}

const PHASE2_DRAWING_DOCUMENT_IDS = {
  structure_general_arrangement: "TF-DRW-P2-GA-001",
  load_diagram: "TF-DRW-P2-LOAD-001",
  axial_force_result_summary: "TF-DRW-P2-RES-001",
  analysis_verification: "TF-DRW-P2-VER-001",
};

function activeDrawingDocumentType() {
  if (activeDrawingType === "loads") return "load_diagram";
  if (activeDrawingType === "axial") return "axial_force_result_summary";
  if (activeDrawingType === "checks") return "analysis_verification";
  return "structure_general_arrangement";
}

function isPhase3ReviewResult(data = resultSourceData) {
  return data?.adapter?.id === "phase3-mapped-action-review";
}

function isPhase3ProjectInputReview(data = resultSourceData) {
  return isPhase3ReviewResult(data) && data?.calculationStatus === "project_review";
}

function phase3DrawingScopeNote(data = resultSourceData) {
  return isPhase3ProjectInputReview(data)
    ? "PHASE 3A PROJECT-INPUT REVIEW / NOT FOR DESIGN OR CONSTRUCTION"
    : "PHASE 3A SYNTHETIC REVIEW / NOT FOR DESIGN OR CONSTRUCTION";
}

function phase3LoadingScopeNote(data = resultSourceData) {
  const caseId = data?.actionScenario?.verificationCaseId;
  if (caseId === "WIND-M02") {
    return "1.2G + W / INSIDE-TOWER ANCILLARY / MOUNT CAPACITY NOT APPLICABLE";
  }
  if (caseId === "WIND-M03") {
    return "1.2G + W / EXTERNAL RIGID TRANSFER / PHYSICAL MOUNT CAPACITY NOT CHECKED";
  }
  return "W ONLY / TOWER BODY / NO LOAD COMBINATION";
}

function compactHash(value) {
  const hash = String(value ?? "");
  return hash.length >= 20 ? `${hash.slice(0, 8)}...${hash.slice(-6)}` : hash || "--";
}

function drawingDocumentId(documentType, data = resultSourceData) {
  if (isPhase3ReviewResult(data)) {
    return data.drawingIdentity?.documentIds?.[documentType] ?? "TF-DRW-P3A-BLOCKED";
  }
  return PHASE2_DRAWING_DOCUMENT_IDS[documentType] ?? "TF-DRW-P2-BLOCKED";
}

function drawingAnalysisRevision(data = resultSourceData, compact = false) {
  if (isPhase3ReviewResult(data)) {
    return compact
      ? `P3A-MAPPED/${data.adapter?.version ?? "--"}`
      : `${data.adapter?.id ?? "adapter-missing"}/${data.adapter?.version ?? "--"}`;
  }
  return `phase-2-adapter/${data?.schemaVersion ?? "0.2.0"}`;
}

function phase3DrawingIdentityStatus(sourceData = resultSourceData, activeSet = towerData?.activeResultSet) {
  if (!isPhase3ReviewResult(sourceData)) {
    return { applicable: false, ready: true, checks: {}, binding: null };
  }

  const identity = sourceData?.drawingIdentity ?? {};
  const resultSets = sourceData?.resultSets ?? [];
  const bindings = identity.directionBindings ?? [];
  const expectedDirections = [0, 45, 90, 135, 180, 225, 270, 315];
  const isHash = (value) => /^[0-9a-f]{64}$/.test(String(value ?? ""));
  const bindingById = new Map(bindings.map((binding) => [binding.resultSetId, binding]));
  const activeBinding = bindingById.get(activeSet?.id);
  const directionValues = resultSets.map((item) => Number(item.windDirectionDeg));

  const checks = {
    contract: identity.contractId === "TF-P3A-DRW-ID-001"
      && identity.contractVersion === "0.3.0"
      && identity.documentRevision === "R03"
      && identity.issueState === "PRIVATE_REVIEW"
      && identity.eligibleForPublicIssue === false
      && identity.profileId === "towerflow-drawing-profile"
      && identity.profileVersion === drawingProfileData?.version,
    model: identity.modelId === sourceData?.towerReference?.id
      && isHash(identity.geometryHashSha256),
    adapter: identity.adapter?.id === sourceData?.adapter?.id
      && identity.adapter?.version === sourceData?.adapter?.version,
    actionScenario: identity.actionScenario?.id === sourceData?.actionScenario?.scenarioId
      && identity.actionScenario?.verificationCaseId === sourceData?.actionScenario?.verificationCaseId
      && identity.actionScenario?.mappingMode === sourceData?.actionScenario?.mappingMode
      && identity.actionScenario?.id === sourceData?.adapter?.actionScenarioId
      && identity.actionScenario?.verificationCaseId === sourceData?.adapter?.verificationCaseId,
    projectInput: identity.projectInput?.id === sourceData?.inputSummary?.projectInputId
      && identity.projectInput?.schemaVersion === sourceData?.inputSummary?.schemaVersion
      && identity.projectInput?.inputStatus === sourceData?.calculationStatus
      && identity.projectInput?.acceptanceStatus === sourceData?.inputSummary?.acceptance?.status
      && isHash(identity.projectInput?.acceptanceHashSha256),
    hashes: identity.inputHashSha256 === sourceData?.inputHashSha256
      && identity.sourceHashSha256 === sourceData?.sourceHashSha256
      && identity.resultHashField === "resultHashSha256"
      && isHash(sourceData?.inputHashSha256)
      && isHash(sourceData?.sourceHashSha256)
      && isHash(sourceData?.resultHashSha256),
    directions: bindings.length === expectedDirections.length
      && resultSets.length === expectedDirections.length
      && directionValues.every((direction, index) => direction === expectedDirections[index])
      && resultSets.every((resultSet) => {
        const binding = bindingById.get(resultSet.id);
        const loadCases = resultSet.loadCases ?? [];
        const windCase = loadCases.find((item) => item.actionCategoryId === "W");
        const combination = resultSet.loadCombination;
        const expectedCategories = resultSet.verificationCaseId === "WIND-M01" ? ["W"] : ["G", "W"];
        const categories = loadCases.map((item) => item.actionCategoryId);
        const combinationValid = resultSet.verificationCaseId === "WIND-M01"
          ? combination == null
          : combination?.factors?.G === 1.2 && combination?.factors?.W === 1;
        const wind = windCase?.windCalculation;
        return Boolean(
          binding
          && categories.length === expectedCategories.length
          && categories.every((category, index) => category === expectedCategories[index])
          && combinationValid
          && isHash(resultSet.resultSetHashSha256)
          && binding.resultSetHashSha256 === resultSet.resultSetHashSha256
          && binding.loadingId === (combination?.id ?? windCase?.id)
          && binding.windLoadCaseId === windCase?.id
          && binding.combinationId === (combination?.id ?? null)
          && binding.actionCategoryIds?.length === expectedCategories.length
          && binding.actionCategoryIds?.every((category, index) => category === expectedCategories[index])
          && binding.sourceWindDirectionDegTrueNorth === resultSet.windDirectionDeg
          && binding.sourceWindDirectionDegTrueNorth === wind?.towerDirectionDegTrueNorth
          && binding.forceDirectionDegTrueNorth === wind?.downwindDirectionDegTrueNorth
        );
      }),
    active: Boolean(
      activeBinding
      && activeBinding.resultSetId === activeSet?.id
      && activeBinding.resultSetHashSha256 === activeSet?.resultSetHashSha256
      && activeBinding.loadingId === activeLoading(activeSet)?.id
    ),
  };
  return {
    applicable: true,
    ready: Object.values(checks).every(Boolean),
    checks,
    binding: activeBinding ?? null,
  };
}

function appendDrawingIdentityMetadata(svg, data, documentType) {
  const source = resultSourceData ?? data;
  const status = phase3DrawingIdentityStatus(source, data.activeResultSet);
  const loading = activeLoading(data);
  const metadata = svgElement("metadata", { id: "tf-drawing-document-identity" });
  metadata.textContent = JSON.stringify({
    analysisMode: activeAnalysisMode,
    documentId: drawingDocumentId(documentType, source),
    documentRevision: source?.drawingIdentity?.documentRevision ?? "P2-DEMO",
    issueState: source?.drawingIdentity?.issueState ?? "PRIVATE_REVIEW",
    eligibleForPublicIssue: false,
    modelId: source?.towerReference?.id ?? source?.caseId,
    geometryHashSha256: source?.drawingIdentity?.geometryHashSha256 ?? null,
    adapter: source?.adapter ?? { id: "phase-2-adapter", version: source?.schemaVersion },
    actionScenarioId: source?.drawingIdentity?.actionScenario?.id ?? null,
    verificationCaseId: source?.drawingIdentity?.actionScenario?.verificationCaseId ?? null,
    mappingMode: source?.drawingIdentity?.actionScenario?.mappingMode ?? null,
    projectInputId: source?.drawingIdentity?.projectInput?.id ?? null,
    projectInputStatus: source?.drawingIdentity?.projectInput?.inputStatus ?? null,
    inputAcceptanceStatus: source?.drawingIdentity?.projectInput?.acceptanceStatus ?? null,
    inputAcceptanceHashSha256: source?.drawingIdentity?.projectInput?.acceptanceHashSha256 ?? null,
    resultSetId: data.activeResultSet?.id ?? null,
    resultSetHashSha256: data.activeResultSet?.resultSetHashSha256 ?? null,
    loadCaseId: loading?.id ?? null,
    sourceWindDirectionDegTrueNorth: status.binding?.sourceWindDirectionDegTrueNorth ?? data.windDirectionDeg,
    forceDirectionDegTrueNorth: status.binding?.forceDirectionDegTrueNorth ?? null,
    inputHashSha256: source?.inputHashSha256 ?? null,
    sourceHashSha256: source?.sourceHashSha256 ?? null,
    resultHashSha256: source?.resultHashSha256 ?? null,
    identityStatus: status.applicable ? (status.ready ? "PASS" : "BLOCKED") : "NOT_APPLICABLE",
  });
  svg.appendChild(metadata);
}

function drawTitleBlock(parent, data, documentId, drawingTitle, analysisRevision = "N/A", documentType = "structure_general_arrangement") {
  const loading = activeLoading(data);
  const loadCase = loading?.id ?? "N/A";
  const direction = formatDirectionDeg(data.windDirectionDeg ?? loading?.windDirectionDeg);
  const adoptionId = drawingProfileData?.standardAdoption?.adoptionId ?? "ADOPTION PENDING";
  const caseReviews = drawingCaseReviewIds(documentType);
  parent.appendChild(svgElement("rect", { x: 32, y: 700, width: 1124, height: 108, class: "drawing-title-block" }));
  parent.appendChild(svgElement("line", { x1: 750, y1: 700, x2: 750, y2: 808, class: "drawing-rule" }));
  parent.appendChild(svgElement("line", { x1: 942, y1: 700, x2: 942, y2: 808, class: "drawing-rule" }));
  parent.appendChild(svgElement("line", { x1: 32, y1: 754, x2: 1156, y2: 754, class: "drawing-rule" }));
  appendSvgText(parent, 48, 723, "SC TOWERFLOW", "drawing-title-brand");
  appendSvgText(parent, 48, 744, drawingTitle, "drawing-title-name");
  appendSvgText(parent, 48, 775, "PRIVATE REVIEW / NOT FOR ISSUE", "drawing-title-status");
  appendSvgText(
    parent,
    48,
    796,
    isPhase3ReviewResult(resultSourceData)
      ? phase3DrawingScopeNote(resultSourceData)
      : "PHASE 2 DEMO / NOT FOR DESIGN OR CONSTRUCTION",
    "drawing-title-note"
  );
  appendSvgText(parent, 766, 718, "DOCUMENT", "drawing-title-label");
  appendSvgText(parent, 766, 741, documentId, "drawing-title-value");
  appendSvgText(parent, 766, 772, "CASE / DIR.", "drawing-title-label");
  appendSvgText(parent, 766, 795, `${loadCase} / ${direction}`, "drawing-title-value");
  appendSvgText(parent, 958, 718, "PROFILE / ADOPTION", "drawing-title-label");
  appendSvgText(parent, 958, 741, `v${drawingProfileData?.version ?? "0.1.0"} / ${adoptionId}`, "drawing-title-value");
  appendSvgText(parent, 958, 772, "ANALYSIS REV.", "drawing-title-label");
  appendSvgText(parent, 958, 795, analysisRevision, "drawing-title-value");
  appendSvgText(parent, 742, 796, `CASE REVIEW ${caseReviews.join(", ") || "PENDING"}`, "drawing-title-note", "end");
}

function drawGeneralArrangement(svg, data) {
  const elevation = { x: 34, y: 64, width: 720, height: 610 };
  const plan = { x: 774, y: 64, width: 380, height: 610 };
  const extents = drawingModelExtents(data);
  const minimumZ = Math.min(...data.nodes.map((node) => Number(node.z ?? 0)));
  const maximumZ = Math.max(...data.nodes.map((node) => Number(node.z ?? 0)));
  const basePlanLimitZ = minimumZ + 1.51;
  const modelRevision = data.towerReference?.id ?? data.caseId ?? "current";
  drawSheetBorder(svg, "TOWER GENERAL ARRANGEMENT", "TF-GC01 VIEW SET");
  const elevationView = createDrawingSemanticGroup(svg, "tf-ga-v03-elevation", "geometry", {
    viewId: "TF-GA-V03",
    sourceId: data.towerReference?.id ?? data.caseId,
  });
  const planView = createDrawingSemanticGroup(svg, "tf-ga-v02-plan", "geometry", {
    viewId: "TF-GA-V02",
    sourceId: data.towerReference?.id ?? data.caseId,
  });
  drawViewFrame(elevationView, elevation, "ELEVATION", "ORTHOGRAPHIC / CONTROLLED");
  const elevationMapPoint = drawProjectedModel(elevationView, data, "front", {
    x: elevation.x + 28,
    y: elevation.y + 44,
    width: elevation.width - 80,
    height: elevation.height - 70,
    padding: 8,
  });
  const baseNodes = data.nodes
    .filter((node) => Math.abs(Number(node.z ?? 0) - minimumZ) <= 0.001)
    .sort((left, right) => left.id.localeCompare(right.id));
  const topNodes = data.nodes
    .filter((node) => Math.abs(Number(node.z ?? 0) - maximumZ) <= 0.001)
    .sort((left, right) => left.id.localeCompare(right.id));
  const heightRequirement = createLinearDimensionRequirement({
    id: "TF-DIM-OVERALL-HEIGHT",
    intent: "OVERALL",
    startNode: baseNodes[0],
    endNode: topNodes[0],
    axis: "GLOBAL-Z",
    viewId: "TF-GA-V03",
    modelRevision,
  });
  const heightAnnotation = resolveLinearDimension(heightRequirement, {
    orientation: "vertical",
    start: elevationMapPoint(baseNodes[0]),
    end: elevationMapPoint(topNodes[0]),
    lineCoordinate: elevation.x + elevation.width - 16,
    canonicalValue: extents.height,
    label: `H ${extents.height.toFixed(3)} m`,
    zone: "RIGHT",
    laneIndex: 0,
    viewBounds: elevation,
  });
  drawingDimensionRequirements.push(heightRequirement);
  drawingResolvedAnnotations.push(heightAnnotation);
  const elevationDimensions = createDrawingSemanticGroup(svg, "tf-ga-v03-elevation-dimensions", "dimensions", {
    viewId: "TF-GA-V03",
    sourceId: heightAnnotation.anchors.target_refs.join(","),
  });
  renderResolvedLinearDimension(elevationDimensions, heightAnnotation);

  drawViewFrame(planView, plan, "GA PLAN", "ORTHOGRAPHIC / CONTROLLED");
  const planMapPoint = drawProjectedModel(planView, data, "plan", {
    x: plan.x + 28,
    y: plan.y + 86,
    width: plan.width - 56,
    height: plan.height - 190,
    padding: 16,
  }, {
    memberFilter: (_member, startNode, endNode) =>
      Number(startNode.z ?? 0) <= basePlanLimitZ && Number(endNode.z ?? 0) <= basePlanLimitZ,
  });
  const baseLeft = baseNodes.reduce((left, node) => Number(node.x ?? 0) < Number(left.x ?? 0) ? node : left);
  const baseRight = baseNodes.reduce((right, node) => Number(node.x ?? 0) > Number(right.x ?? 0) ? node : right);
  const planDimensions = createDrawingSemanticGroup(svg, "tf-ga-v02-plan-dimensions", "dimensions", {
    viewId: "TF-GA-V02",
    sourceId: `${baseLeft.id},${baseRight.id}`,
  });
  const baseRequirement = createLinearDimensionRequirement({
    id: "TF-DIM-BASE-EXTENT-X",
    intent: "FEATURE_SIZE",
    startNode: baseLeft,
    endNode: baseRight,
    axis: "GLOBAL-X",
    viewId: "TF-GA-V02",
    modelRevision,
  });
  const baseAnnotation = resolveLinearDimension(baseRequirement, {
    orientation: "horizontal",
    start: planMapPoint(baseLeft),
    end: planMapPoint(baseRight),
    lineCoordinate: plan.y + plan.height - 48,
    canonicalValue: Number(baseRight.x) - Number(baseLeft.x),
    label: `BASE X ${(Number(baseRight.x) - Number(baseLeft.x)).toFixed(3)} m`,
    zone: "BOTTOM",
    laneIndex: 0,
    viewBounds: plan,
  });
  drawingDimensionRequirements.push(baseRequirement);
  drawingResolvedAnnotations.push(baseAnnotation);
  renderResolvedLinearDimension(planDimensions, baseAnnotation);

  const documentId = drawingDocumentId("structure_general_arrangement");
  const titleBlock = createDrawingSemanticGroup(svg, "tf-ga-title-block", "title-block", {
    sourceId: documentId,
  });
  drawTitleBlock(
    titleBlock,
    data,
    documentId,
    "TOWER GENERAL ARRANGEMENT",
    isPhase3ReviewResult() ? drawingAnalysisRevision(undefined, true) : "N/A",
    "structure_general_arrangement"
  );
  appendResolvedAnnotationMetadata(svg);
}

function drawResultLegend(parent, data, region, critical, maxForce, deformationScale) {
  drawViewFrame(parent, region, "RESULT DEFINITION", "SIGNED MEMBER AXIAL FORCE");
  const compact = region.height < 250;
  const rows = [
    ["Quantity", "N / member local x"],
    ["Basis", "kN / element"],
    ["Averaging", "None"],
    ["Range Mode", "8-direction global"],
    ["Range", `${(-maxForce).toFixed(2)} to ${maxForce.toFixed(2)} kN`],
    [data.loadCombination ? "Combination" : "Load case", activeLoading(data)?.id ?? "N/A"],
    ["Deformation", `${deformationScale.toFixed(0)}x display`],
    ["Geometry Rev.", data.towerReference?.id ?? data.caseId ?? "current"],
    ["Analysis Rev.", drawingAnalysisRevision(undefined, true)],
  ];
  let y = region.y + (compact ? 48 : 60);
  const rowStep = compact ? 16 : 23;
  for (const [label, value] of rows) {
    appendSvgText(parent, region.x + 16, y, label, "drawing-legend-label");
    appendSvgText(parent, region.x + 156, y, value, "drawing-legend-value");
    y += rowStep;
  }
  if (!compact) {
    parent.appendChild(svgElement("line", { x1: region.x + 16, y1: y + 2, x2: region.x + region.width - 16, y2: y + 2, class: "drawing-rule" }));
    appendSvgText(parent, region.x + 16, y + 24, "GOVERNING", "drawing-legend-label");
    appendSvgText(
      parent,
      region.x + 156,
      y + 24,
      critical ? `${critical.id} / ${Number(critical.axialForceKN ?? 0).toFixed(2)} kN` : "N/A",
      "drawing-legend-critical"
    );
  }
  const swatchesY = region.y + region.height - 25;
  parent.appendChild(svgElement("line", { x1: region.x + 18, y1: swatchesY, x2: region.x + 46, y2: swatchesY, class: "drawing-legend-tension" }));
  appendSvgText(parent, region.x + 54, swatchesY + 4, "TENSION +", "drawing-legend-label");
  parent.appendChild(svgElement("line", { x1: region.x + 150, y1: swatchesY, x2: region.x + 178, y2: swatchesY, class: "drawing-legend-compression" }));
  appendSvgText(parent, region.x + 186, swatchesY + 4, "COMPRESSION -", "drawing-legend-label");
}

function drawingAppliedResultant(data) {
  const checks = data.checks ?? {};
  const loads = activeLoading(data)?.loads ?? [];
  const component = (checkName, loadName) => {
    const checkedValue = Number(checks[checkName]);
    if (Number.isFinite(checkedValue)) return checkedValue;
    return loads.reduce((sum, load) => sum + Number(load[loadName] ?? 0), 0);
  };
  return {
    fxKN: component("sumAppliedFxKN", "fxKN"),
    fyKN: component("sumAppliedFyKN", "fyKN"),
    fzKN: component("sumAppliedFzKN", "fzKN"),
  };
}

function drawingLoadResultant(loads = []) {
  return loads.reduce((sum, load) => ({
    fxKN: sum.fxKN + Number(load.fxKN ?? 0),
    fyKN: sum.fyKN + Number(load.fyKN ?? 0),
    fzKN: sum.fzKN + Number(load.fzKN ?? 0),
  }), { fxKN: 0, fyKN: 0, fzKN: 0 });
}

function drawingLoadActionCategory(load) {
  if (load.actionCategoryId === "G" || load.actionCategoryId === "W") return load.actionCategoryId;
  const sourceCase = String(load.sourceLoadCaseId ?? "").toUpperCase();
  const type = String(load.type ?? "").toLowerCase();
  if (sourceCase.startsWith("LC-G") || /gravity|self-weight|permanent/.test(type)) return "G";
  if (sourceCase.startsWith("LC-W") || /wind/.test(type)) return "W";
  return null;
}

function drawingActionResultants(data) {
  const active = activeLoading(data);
  const activeLoads = active?.loads ?? [];
  const sourceCases = data.loadCases ?? [];
  const permanentCase = sourceCases.find((loadCase) => loadCase.actionCategoryId === "G");
  const windCase = sourceCases.find((loadCase) => loadCase.actionCategoryId === "W");
  const categoryLoads = (category) => activeLoads.filter((load) => drawingLoadActionCategory(load) === category);
  return {
    active,
    permanentCase,
    windCase,
    permanent: drawingLoadResultant(permanentCase?.loads ?? categoryLoads("G")),
    wind: drawingLoadResultant(windCase?.loads ?? categoryLoads("W")),
    combined: drawingAppliedResultant(data),
  };
}

function drawingActionProjection(data) {
  const actions = drawingActionResultants(data);
  const horizontal = Math.hypot(actions.wind.fxKN, actions.wind.fyKN) > 0
    ? actions.wind
    : actions.combined;
  const useFront = Math.abs(horizontal.fxKN) >= Math.abs(horizontal.fyKN);
  return {
    projection: useFront ? "front" : "side",
    horizontalComponent: useFront ? "X" : "Y",
    plane: useFront ? "X-Z" : "Y-Z",
    lookingDirection: useFront ? "-Y" : "-X",
  };
}

function drawingForceDirection(vector) {
  const tolerance = 0.005;
  const components = [
    ["X", Number(vector.fxKN ?? 0)],
    ["Y", Number(vector.fyKN ?? 0)],
    ["Z", Number(vector.fzKN ?? 0)],
  ]
    .filter(([, value]) => Math.abs(value) >= tolerance)
    .map(([axis, value]) => `${value >= 0 ? "+" : "-"}${axis}`);
  return components.length > 0 ? components.join(" / ") : "ZERO";
}

function representativeDrawingLoads(loads, nodesById, projection, maximumCount = 10) {
  const projected = loads
    .filter((load) => drawingLoadActionCategory(load) === "W")
    .filter((load) => {
      const horizontal = projection === "front" ? Number(load.fxKN ?? 0) : Number(load.fyKN ?? 0);
      return Math.hypot(horizontal, Number(load.fzKN ?? 0)) > 0;
    })
    .sort((left, right) => Number(nodesById.get(left.nodeId)?.z ?? 0) - Number(nodesById.get(right.nodeId)?.z ?? 0));
  if (projected.length <= maximumCount) return projected;
  const selected = [];
  const usedNodeIds = new Set();
  for (let index = 0; index < maximumCount; index += 1) {
    const sourceIndex = Math.round(index * (projected.length - 1) / (maximumCount - 1));
    const load = projected[sourceIndex];
    if (load && !usedNodeIds.has(load.nodeId)) {
      selected.push(load);
      usedNodeIds.add(load.nodeId);
    }
  }
  return selected;
}

function drawPinnedTranslationalSupport(parent, options) {
  const { x, y, support, viewId, semanticViewId } = options;
  const sourceId = support.nodeId;
  const semanticId = `${semanticViewId}-support-${drawingSemanticId(sourceId)}`;
  const restraintState = ["ux", "uy", "uz", "rx", "ry", "rz"]
    .map((component) => `${component.toUpperCase()}:${support[component] ? "BLOCKED" : "FREE"}`)
    .join(",");
  const group = createDrawingSemanticGroup(parent, semanticId, "restraints", {
    viewId,
    sourceId,
  });
  group.setAttribute("data-support-node-id", sourceId);
  group.setAttribute("data-support-type", support.supportType ?? "pinned-translational");
  group.setAttribute("data-restraint-state", restraintState);
  const triangle = svgElement("path", {
    d: `M ${x} ${y + 1} L ${x - 5} ${y + 9} L ${x + 5} ${y + 9} Z`,
    class: "drawing-support-symbol",
  });
  triangle.appendChild(svgElement(
    "title",
    {},
    `${sourceId}: Ux Uy Uz restrained; rotations inactive in the 3 DOF truss`
  ));
  group.appendChild(triangle);
  group.appendChild(svgElement("line", {
    x1: x - 7,
    y1: y + 9,
    x2: x + 7,
    y2: y + 9,
    class: "drawing-support-bearing-line",
  }));
  for (let offset = -5; offset <= 5; offset += 3.3) {
    group.appendChild(svgElement("line", {
      x1: x + offset,
      y1: y + 9,
      x2: x + offset - 2.5,
      y2: y + 12,
      class: "drawing-support-ground-hatch",
    }));
  }
}

function drawGlobalResultantSymbol(parent, region, data, mapPoint, actionProjection) {
  const viewId = parent.getAttribute("data-view-id") ?? "TF-RES-V02";
  const semanticViewId = drawingSemanticId(viewId);
  const nodesById = new Map((data.nodes ?? []).map((node) => [node.id, node]));
  const supports = data.supports ?? [];
  for (const support of supports) {
    const node = nodesById.get(support.nodeId);
    if (!node) continue;
    const [x, y] = mapPoint(node);
    drawPinnedTranslationalSupport(parent, { x, y, support, viewId, semanticViewId });
  }

  const actions = drawingActionResultants(data);
  const loadCaseId = actions.active?.id ?? "active-loading";
  const loads = representativeDrawingLoads(actions.active?.loads ?? [], nodesById, actionProjection.projection);
  const loadsByNode = new Map();
  for (const load of loads) {
    const entry = loadsByNode.get(load.nodeId) ?? {
      nodeId: load.nodeId,
      fxKN: 0,
      fyKN: 0,
      fzKN: 0,
      loadIds: [],
    };
    entry.fxKN += Number(load.fxKN ?? 0);
    entry.fyKN += Number(load.fyKN ?? 0);
    entry.fzKN += Number(load.fzKN ?? 0);
    entry.loadIds.push(load.id);
    loadsByNode.set(load.nodeId, entry);
  }
  const projectedLoadMagnitude = (load) => Math.hypot(
    actionProjection.projection === "front" ? load.fxKN : load.fyKN,
    load.fzKN
  );
  for (const load of loadsByNode.values()) {
    const node = nodesById.get(load.nodeId);
    const magnitude = projectedLoadMagnitude(load);
    if (!node || magnitude <= 0) continue;
    const [x, y] = mapPoint(node);
    const horizontal = actionProjection.projection === "front" ? load.fxKN : load.fyKN;
    const arrowLength = 11;
    const dx = horizontal / magnitude * arrowLength;
    const dy = -load.fzKN / magnitude * arrowLength;
    const endX = x + dx;
    const endY = y + dy;
    const headLength = 3.5;
    const headWidth = 2.2;
    const ux = dx / arrowLength;
    const uy = dy / arrowLength;
    const baseX = endX - ux * headLength;
    const baseY = endY - uy * headLength;
    const px = -uy * headWidth;
    const py = ux * headWidth;
    const loadSemanticId = `${semanticViewId}-load-node-${drawingSemanticId(load.nodeId)}`;
    parent.appendChild(svgElement("line", {
      id: `${loadSemanticId}-line`,
      x1: x,
      y1: y,
      x2: endX,
      y2: endY,
      class: "drawing-applied-load-symbol",
      "data-view-id": viewId,
      "data-layer-role": "applied-loads",
      "data-source-id": load.nodeId,
      "data-load-source-ids": load.loadIds.join(","),
      "data-arrow-convention": "tail-at-application-head-along-signed-vector",
      "data-arrow-scale": "schematic-fixed-length",
    }));
    parent.appendChild(svgElement("path", {
      id: `${loadSemanticId}-head`,
      d: `M ${endX} ${endY} L ${baseX + px} ${baseY + py} L ${baseX - px} ${baseY - py} Z`,
      class: "drawing-applied-load-head",
      "data-view-id": viewId,
      "data-layer-role": "applied-loads",
      "data-source-id": load.nodeId,
      "data-load-source-ids": load.loadIds.join(","),
      "data-arrow-convention": "tail-at-application-head-along-signed-vector",
      "data-arrow-scale": "schematic-fixed-length",
    }));
  }

  const originX = region.x + 46;
  const originY = region.y + 105;
  const axisLength = 20;
  parent.appendChild(svgElement("line", {
    x1: originX - axisLength,
    y1: originY,
    x2: originX + axisLength,
    y2: originY,
    class: "drawing-resultant-axis",
  }));
  parent.appendChild(svgElement("line", {
    x1: originX,
    y1: originY + axisLength,
    x2: originX,
    y2: originY - axisLength,
    class: "drawing-resultant-axis",
  }));
  appendSvgText(parent, originX + axisLength + 3, originY + 3, `+${actionProjection.horizontalComponent}`, "drawing-resultant-axis-label");
  appendSvgText(parent, originX + 3, originY - axisLength - 2, "+Z", "drawing-resultant-axis-label");

  const windHorizontalComponent = actionProjection.projection === "front" ? actions.wind.fxKN : actions.wind.fyKN;
  if (Math.abs(windHorizontalComponent) > 0) {
    const arrowLength = 31;
    const dx = Math.sign(windHorizontalComponent) * arrowLength;
    const dy = 0;
    const endX = originX + dx;
    const endY = originY + dy;
    const headLength = 8;
    const headWidth = 4;
    const ux = dx / arrowLength;
    const uy = dy / arrowLength;
    const baseX = endX - ux * headLength;
    const baseYHead = endY - uy * headLength;
    const px = -uy * headWidth;
    const py = ux * headWidth;
    parent.appendChild(svgElement("line", {
      id: `${semanticViewId}-global-resultant-line`,
      x1: originX,
      y1: originY,
      x2: endX,
      y2: endY,
      class: "drawing-load-symbol",
      "data-view-id": viewId,
      "data-layer-role": "actions",
      "data-source-id": loadCaseId,
    }));
    parent.appendChild(svgElement("path", {
      id: `${semanticViewId}-global-resultant-head`,
      d: `M ${endX} ${endY} L ${baseX + px} ${baseYHead + py} L ${baseX - px} ${baseYHead - py} Z`,
      class: "drawing-load-head",
      "data-view-id": viewId,
      "data-layer-role": "actions",
      "data-source-id": loadCaseId,
    }));
    appendSvgText(parent, originX + Math.sign(dx) * 18, originY - 6, "W", "drawing-load-key-label", "middle");
    appendSvgText(parent, originX, originY + 31, "DIRECTION KEY", "drawing-load-key-note", "middle");
  }

  const windDirectionDeg = Number(actions.windCase?.windDirectionDeg ?? data.windDirectionDeg ?? 0);
  const windDirectionMeaning = actions.windCase?.windDirectionMeaning
    ?? data.loadCases?.[0]?.windDirectionMeaning
    ?? "analysis load direction";
  const directionLabel = windDirectionMeaning.includes("source direction")
    ? `WIND SOURCE beta = ${windDirectionDeg.toFixed(0)} deg TN`
    : `ANALYSIS LOAD DIR = ${windDirectionDeg.toFixed(0)} deg`;
  appendSvgText(parent, region.x + 12, region.y + 48, `${data.loadCombination ? "COMBINATION" : "LOAD CASE"}: ${loadCaseId}`, "drawing-vector-key-title");
  appendSvgText(parent, region.x + 12, region.y + 59, directionLabel, "drawing-vector-key-note");
  appendSvgText(parent, region.x + 12, region.y + 69, `APPLIED FORCE: ACTS ${drawingForceDirection(actions.wind)}`, "drawing-vector-key-note");
  appendSvgText(parent, region.x + 12, region.y + 79, "NODAL ARROWS: SCHEMATIC / RESULTANT TABLE", "drawing-vector-key-note");
  appendSvgText(parent, region.x + 12, region.y + region.height - 47, "BASE NODES: Ux = Uy = Uz = 0 / ROTATIONS INACTIVE", "drawing-restraint-summary");
}

function drawLoadDiagram(svg, data) {
  const primary = { x: 34, y: 64, width: 760, height: 610 };
  const definition = { x: 814, y: 64, width: 340, height: 270 };
  const resultants = { x: 814, y: 354, width: 340, height: 320 };
  const loading = activeLoading(data);
  const actions = drawingActionResultants(data);
  const actionProjection = drawingActionProjection(data);
  const direction = formatDirectionDeg(data.windDirectionDeg ?? loading?.windDirectionDeg);
  const sourceDirectionDeg = Number(data.windDirectionDeg ?? loading?.windDirectionDeg);
  const forceDirectionDeg = actions.windCase?.windCalculation?.downwindDirectionDegTrueNorth
    ?? (Number.isFinite(sourceDirectionDeg) ? (sourceDirectionDeg + 180) % 360 : undefined);
  const directionBasis = isPhase3ReviewResult() ? " TN" : "";
  const sourceDirection = `${direction}${directionBasis}`;
  const forceDirection = `${formatDirectionDeg(forceDirectionDeg)}${directionBasis}`;
  const activeLabel = data.loadCombination ? "COMB" : "ACTIVE";
  const resultantRows = [];
  if (actions.permanentCase) {
    resultantRows.push(["G", actions.permanent.fxKN.toFixed(2), actions.permanent.fyKN.toFixed(2), actions.permanent.fzKN.toFixed(2)]);
  }
  if (actions.windCase) {
    resultantRows.push(["W", actions.wind.fxKN.toFixed(2), actions.wind.fyKN.toFixed(2), actions.wind.fzKN.toFixed(2)]);
  }
  if (data.loadCombination || (!actions.permanentCase && !actions.windCase)) {
    resultantRows.push([activeLabel, actions.combined.fxKN.toFixed(2), actions.combined.fyKN.toFixed(2), actions.combined.fzKN.toFixed(2)]);
  }

  drawSheetBorder(svg, "LOAD DIAGRAM", "TF-GC03 VIEW SET");
  const primaryView = createDrawingSemanticGroup(svg, "tf-load-v01-actions", "actions", {
    viewId: "TF-LOAD-V01",
    sourceId: loading?.id,
  });
  const definitionSchedule = createDrawingSemanticGroup(svg, "tf-load-s01-definition", "schedule", {
    scheduleId: "TF-LOAD-S01",
    sourceId: loading?.id,
  });
  const resultantSchedule = createDrawingSemanticGroup(svg, "tf-load-s02-resultants", "schedule", {
    scheduleId: "TF-LOAD-S02",
    sourceId: loading?.id,
  });

  drawViewFrame(
    primaryView,
    primary,
    "APPLIED ACTIONS & RESTRAINTS",
    `${actionProjection.plane} / LOOKING ${actionProjection.lookingDirection} / GLOBAL XYZ / NTS`
  );
  const actionMapPoint = drawProjectedModel(primaryView, data, actionProjection.projection, {
    x: primary.x + 420,
    y: primary.y + 58,
    width: primary.width - 460,
    height: primary.height - 118,
    padding: 12,
  });
  drawGlobalResultantSymbol(primaryView, primary, data, actionMapPoint, actionProjection);

  drawViewFrame(definitionSchedule, definition, "LOAD DEFINITION", "ACTIVE ANALYSIS CASE");
  drawReviewTable(
    definitionSchedule,
    definition,
    [
      { label: "FIELD", width: 1.2 },
      { label: "VALUE", width: 2.4 },
    ],
    [
      [data.loadCombination ? "Combination" : "Load case", loading?.id ?? "N/A"],
      ["Wind source", sourceDirection],
      ["Downwind force", forceDirection],
      ["Projection", `${actionProjection.plane} / ${actionProjection.lookingDirection}`],
      ["Coordinates", "Global XYZ"],
      ["Units", "kN"],
    ],
    { top: definition.y + 48, rowHeight: 27 }
  );

  drawViewFrame(resultantSchedule, resultants, "SOURCE RESULTANTS", "SIGNED GLOBAL COMPONENTS");
  drawReviewTable(
    resultantSchedule,
    resultants,
    [
      { label: "ACTION", width: 0.8 },
      { label: "FX", width: 1.0 },
      { label: "FY", width: 1.0 },
      { label: "FZ", width: 1.0 },
    ],
    resultantRows,
    { top: resultants.y + 52, rowHeight: 30 }
  );
  const resultantNotesTop = resultants.y + 96 + resultantRows.length * 30;
  appendSvgText(resultantSchedule, resultants.x + 16, resultantNotesTop, "ARROWS SHOW LOCATION + DIRECTION", "drawing-review-list-text");
  appendSvgText(resultantSchedule, resultants.x + 16, resultantNotesTop + 26, "SIGNED VALUES GOVERN", "drawing-review-list-text");
  appendSvgText(
    resultantSchedule,
    resultants.x + 16,
    resultantNotesTop + 64,
    isPhase3ReviewResult()
      ? phase3LoadingScopeNote()
      : "Q: NOT INCLUDED IN CURRENT MODEL",
    "drawing-warning-text"
  );

  const documentId = drawingDocumentId("load_diagram");
  const titleBlock = createDrawingSemanticGroup(svg, "tf-load-title-block", "title-block", {
    sourceId: documentId,
  });
  drawTitleBlock(
    titleBlock,
    data,
    documentId,
    "LOAD DIAGRAM",
    drawingAnalysisRevision(undefined, true),
    "load_diagram"
  );
}

function drawAxialResult(svg, data) {
  const primary = { x: 34, y: 64, width: 760, height: 610 };
  const deformed = { x: 814, y: 64, width: 340, height: 294 };
  const definition = { x: 814, y: 378, width: 340, height: 296 };
  const critical = drawingCriticalMember(data);
  const maxForce = drawingGlobalMaxForce(data);
  const deformationScale = 20;

  drawSheetBorder(svg, "AXIAL FORCE RESULT SUMMARY", "TF-GC02 VIEW SET");
  const primaryView = createDrawingSemanticGroup(svg, "tf-res-v03-axial-force", "results", {
    viewId: "TF-RES-V03",
    sourceId: activeLoading(data)?.id,
  });
  const deformationView = createDrawingSemanticGroup(svg, "tf-res-v04-deformation", "deformation", {
    viewId: "TF-RES-V04",
    sourceId: activeLoading(data)?.id,
  });
  const definitionSchedule = createDrawingSemanticGroup(svg, "tf-res-s01-result-definition", "schedule", {
    scheduleId: "TF-RES-S01",
    sourceId: activeLoading(data)?.id,
  });

  drawViewFrame(primaryView, primary, "MEMBER AXIAL FORCE", "N (LOCAL x) / ACTIVE CASE");
  drawProjectedModel(primaryView, data, "front", {
    x: primary.x + 20,
    y: primary.y + 45,
    width: primary.width - 40,
    height: primary.height - 70,
    padding: 10,
  }, {
    results: true,
    criticalMember: critical,
  });
  appendSvgText(primaryView, primary.x + 16, primary.y + primary.height - 13, "RED TENSION (+) / BLUE COMPRESSION (-) / GREY LOW |N|", "drawing-warning-text");

  drawViewFrame(deformationView, deformed, "DEFORMED / UNDEFORMED", `STATIC / ${deformationScale}x DISPLAY`);
  drawProjectedModel(deformationView, data, "front", {
    x: deformed.x + 20,
    y: deformed.y + 42,
    width: deformed.width - 40,
    height: deformed.height - 60,
    padding: 8,
  });
  const deformedGroup = createDrawingSemanticGroup(
    deformationView,
    "tf-res-v04-deformed-geometry",
    "deformed-geometry",
    { viewId: "TF-RES-V04", sourceId: activeLoading(data)?.id }
  );
  deformedGroup.setAttribute("class", "drawing-deformed-layer");
  drawProjectedModel(deformedGroup, data, "front", {
    x: deformed.x + 20,
    y: deformed.y + 42,
    width: deformed.width - 40,
    height: deformed.height - 60,
    padding: 8,
  }, {
    deformationScale,
    layerRole: "deformed-geometry",
  });

  drawResultLegend(definitionSchedule, data, definition, critical, maxForce, deformationScale);
  const documentId = drawingDocumentId("axial_force_result_summary");
  const titleBlock = createDrawingSemanticGroup(svg, "tf-res-title-block", "title-block", {
    sourceId: documentId,
  });
  drawTitleBlock(
    titleBlock,
    data,
    documentId,
    "AXIAL FORCE RESULT SUMMARY",
    drawingAnalysisRevision(undefined, true),
    "axial_force_result_summary"
  );
}

function drawAnalysisVerification(svg, data) {
  const extrema = { x: 34, y: 64, width: 700, height: 270 };
  const reactions = { x: 34, y: 350, width: 700, height: 324 };
  const basis = { x: 754, y: 64, width: 400, height: 180 };
  const assumptions = { x: 754, y: 260, width: 400, height: 190 };
  const exclusions = { x: 754, y: 466, width: 400, height: 208 };
  const checks = data.checks ?? {};
  const forceExtrema = drawingForceExtrema(data);
  const reactionRows = drawingSupportReactionRows(data);
  const maxDisplacement = checks.maxDisplacement ?? {};
  const maxReaction = checks.maxReaction ?? {};
  const loading = activeLoading(data);
  const loadCase = loading?.id ?? "N/A";
  const direction = formatDirectionDeg(data.windDirectionDeg ?? loading?.windDirectionDeg);
  const phase3Review = isPhase3ReviewResult();
  const phase3CaseId = resultSourceData?.actionScenario?.verificationCaseId;
  const phase3ActionAssumption = {
    "WIND-M01": "WIND-M01 maps tower-body W actions only.",
    "WIND-M02": "WIND-M02 maps tower and inside ancillary actions.",
    "WIND-M03": "WIND-M03 uses declared rigid six-resultant transfer.",
  }[phase3CaseId] ?? "Phase 3A mapped-action scenario.";
  const phase3LoadingAssumption = phase3CaseId === "WIND-M01"
    ? "One unfactored W case is solved for each direction."
    : "One 1.2G + W combination is solved for each direction.";
  const phase3ActionExclusion = phase3CaseId === "WIND-M03"
    ? "Mount, interface, fastener and local tower capacity."
    : phase3CaseId === "WIND-M02"
      ? "Ancillary attachment and local tower capacity."
      : "Ancillaries, physical mounts and non-accepted geometry.";

  drawSheetBorder(svg, "ANALYSIS VERIFICATION", "TF-GC04 REVIEW SCHEDULES");
  const extremaView = createDrawingSemanticGroup(svg, "tf-chk-v05-extrema", "schedules", {
    viewId: "TF-CHK-V05",
    sourceId: loadCase,
  });
  const reactionsView = createDrawingSemanticGroup(svg, "tf-chk-v06-reactions", "reactions", {
    viewId: "TF-CHK-V06",
    sourceId: loadCase,
  });
  const basisView = createDrawingSemanticGroup(svg, "tf-chk-v07-analysis-basis", "metadata", {
    viewId: "TF-CHK-V07",
    sourceId: data.towerReference?.id ?? data.caseId,
  });
  const reviewBoundaryView = createDrawingSemanticGroup(svg, "tf-chk-v08-review-boundary", "annotations", {
    viewId: "TF-CHK-V08",
    sourceId: "towerflow-drawing-profile",
  });

  drawViewFrame(extremaView, extrema, "EXTREMA & PROBES", "ACTIVE CASE / ELEMENT VALUES");
  drawReviewTable(
    extremaView,
    extrema,
    [
      { label: "PROBE", width: 2.1 },
      { label: "OBJECT", width: 1.1 },
      { label: "VALUE", width: 1.4 },
      { label: "BASIS", width: 2.0 },
    ],
    [
      ["Maximum tension", forceExtrema.tension?.id ?? "--", `${Number(forceExtrema.tension?.axialForceKN ?? 0).toFixed(3)} kN`, "Member local x / N+"],
      ["Maximum compression", forceExtrema.compression?.id ?? "--", `${Number(forceExtrema.compression?.axialForceKN ?? 0).toFixed(3)} kN`, "Member local x / N-"],
      ["Maximum absolute axial", forceExtrema.critical?.id ?? "--", `${Math.abs(Number(forceExtrema.critical?.axialForceKN ?? 0)).toFixed(3)} kN`, "Elemental member"],
      ["Maximum displacement", maxDisplacement.nodeId ?? "--", `${(Number(maxDisplacement.valueM ?? 0) * 1000).toFixed(3)} mm`, "Global resultant |u|"],
      ["Maximum reaction component", maxReaction.nodeId ?? "--", `${Number(maxReaction.valueKN ?? 0).toFixed(3)} kN`, `Global ${maxReaction.component ?? "--"}`],
    ],
    {
      top: extrema.y + 52,
      rowHeight: 28,
      semanticId: "tf-chk-v05-extrema",
      rowSourceIds: [
        forceExtrema.tension?.id,
        forceExtrema.compression?.id,
        forceExtrema.critical?.id,
        maxDisplacement.nodeId,
        maxReaction.nodeId,
      ],
    }
  );

  drawViewFrame(reactionsView, reactions, "REACTIONS & EQUILIBRIUM", "GLOBAL XYZ / SUPPORT ON MODEL");
  drawReviewTable(
    reactionsView,
    reactions,
    [
      { label: "SUPPORT", width: 1.0 },
      { label: "R_X (kN)", width: 1.2 },
      { label: "R_Y (kN)", width: 1.2 },
      { label: "R_Z (kN)", width: 1.2 },
      { label: "|R| (kN)", width: 1.3 },
    ],
    reactionRows.map((row) => [
      row.nodeId,
      row.fxKN.toFixed(3),
      row.fyKN.toFixed(3),
      row.fzKN.toFixed(3),
      row.magnitudeKN.toFixed(3),
    ]),
    {
      top: reactions.y + 52,
      rowHeight: 26,
      semanticId: "tf-chk-v06-reactions",
      rowLayerRole: "support-reaction",
      rowSourceIds: reactionRows.map((row) => row.nodeId),
    }
  );

  const equilibriumTop = reactions.y + 52 + 26 * (reactionRows.length + 1) + 20;
  const maximumResidual = Math.max(
    Math.abs(Number(checks.forceBalanceFxKN ?? 0)),
    Math.abs(Number(checks.forceBalanceFyKN ?? 0)),
    Math.abs(Number(checks.forceBalanceFzKN ?? 0))
  );
  drawReviewTable(
    reactionsView,
    reactions,
    [
      { label: "EQUILIBRIUM VECTOR", width: 1.7 },
      { label: "X (kN)", width: 1.0 },
      { label: "Y (kN)", width: 1.0 },
      { label: "Z (kN)", width: 1.0 },
      { label: "STATUS", width: 1.0 },
    ],
    [
      ["Applied actions", Number(checks.sumAppliedFxKN ?? 0).toFixed(3), Number(checks.sumAppliedFyKN ?? 0).toFixed(3), Number(checks.sumAppliedFzKN ?? 0).toFixed(3), "INPUT"],
      ["Support reactions", Number(checks.sumReactionFxKN ?? 0).toFixed(3), Number(checks.sumReactionFyKN ?? 0).toFixed(3), Number(checks.sumReactionFzKN ?? 0).toFixed(3), "SOLVED"],
      ["Residual", Number(checks.forceBalanceFxKN ?? 0).toFixed(4), Number(checks.forceBalanceFyKN ?? 0).toFixed(4), Number(checks.forceBalanceFzKN ?? 0).toFixed(4), maximumResidual <= 0.001 ? "PASS" : "REVIEW"],
    ],
    { top: equilibriumTop, rowHeight: 24 }
  );

  drawViewFrame(basisView, basis, "ANALYSIS BASIS", "ACTIVE RESULT");
  drawReviewTable(
    basisView,
    basis,
    [
      { label: "FIELD", width: 1.3 },
      { label: "VALUE", width: 2.7 },
    ],
    [
      ["Load case", `${loadCase} / ${direction}`],
      ["Model", data.towerReference?.id ?? data.caseId ?? "current"],
      ["Analysis", drawingAnalysisRevision(undefined, true)],
      ["Model link", "CURRENT RESULT SET / MODEL LINKED"],
    ],
    { top: basis.y + 48, rowHeight: 24 }
  );

  drawViewFrame(reviewBoundaryView, assumptions, "ASSUMPTIONS", phase3Review ? "PHASE 3A" : "PHASE 2");
  drawReviewList(
    reviewBoundaryView,
    assumptions,
    phase3Review
      ? isPhase3ProjectInputReview()
        ? [
            "Linear-elastic 3D truss; three translational DOF per node.",
            `Reviewed inline project inputs; ${phase3ActionAssumption}`,
            "Wind source direction and downwind force direction remain distinct.",
            phase3LoadingAssumption,
          ]
        : [
          "Linear-elastic 3D truss; three translational DOF per node.",
          `Synthetic WIND-C01 actions; ${phase3ActionAssumption}`,
          "Wind source direction and downwind force direction remain distinct.",
          phase3LoadingAssumption,
          ]
      : [
          "Linear-elastic 3D truss; three translational DOF per node.",
          "Base supports restrain global Ux, Uy and Uz.",
          "Applied actions are static Phase 2 demonstration nodal loads.",
          "Deformed view uses solved displacement with a stated 20x scale.",
        ],
    { top: assumptions.y + 56, lineStep: 31 }
  );

  drawViewFrame(reviewBoundaryView, exclusions, "EXCLUSIONS", "NOT EVALUATED");
  drawReviewList(
    reviewBoundaryView,
    exclusions,
    phase3Review
      ? isPhase3ProjectInputReview()
        ? [
            "Input review does not grant engineering release authority.",
            phase3ActionExclusion,
            "AS 4100 capacity, utilisation, connections and foundations.",
            "Nonlinear, buckling, modal and time-history response.",
            "Construction, fabrication or certified design issue.",
          ]
        : [
          "Approved project Region, terrain, topography and coefficient evidence.",
          phase3ActionExclusion,
          "AS 4100 capacity, utilisation, connections and foundations.",
          "Nonlinear, buckling, modal and time-history response.",
          "Construction, fabrication or certified design issue.",
          ]
      : [
          "AS/NZS 1170.2 project wind action calculation.",
          "Member capacity, utilisation and code compliance.",
          "Connections, foundations, anchors and soil response.",
          "Nonlinear, buckling, modal and time-history response.",
          "Construction, fabrication or certified design issue.",
        ],
    { top: exclusions.y + 54, lineStep: 29 }
  );

  const documentId = drawingDocumentId("analysis_verification");
  const titleBlock = createDrawingSemanticGroup(svg, "tf-chk-title-block", "title-block", {
    sourceId: documentId,
  });
  drawTitleBlock(
    titleBlock,
    data,
    documentId,
    "ANALYSIS VERIFICATION",
    drawingAnalysisRevision(undefined, true),
    "analysis_verification"
  );
}

function setDrawingValidationItem(element, state, text) {
  if (!element) return;
  element.dataset.state = state;
  element.textContent = text;
}

function updateDrawingValidation(data, isAnalysis) {
  const identityStatus = phase3DrawingIdentityStatus(resultSourceData, data.activeResultSet);
  const modelProfilePass = Boolean(
    (data.towerReference?.id ?? data.caseId)
    && drawingProfileData?.profileId === "towerflow-drawing-profile"
    && drawingProfileData?.version
    && drawingProfileData?.standardAdoption?.adoptionId === "TF-UWEDS-001"
    && drawingProfileData?.standardAdoption?.packageVersion === "1.7.1"
  );
  const metadataPass = Boolean(
    activeLoading(data)?.id
    && data.units?.force === "kN"
    && data.members?.length
    && data.nodes?.length
    && Number.isFinite(Number(data.checks?.maxAbsAxialForceKN))
  );
  const expectedDirections = [0, 45, 90, 135, 180, 225, 270, 315];
  const activeSituation = towerData?.loadCombination?.designSituation;
  const drawingResultSets = activeSituation
    ? (resultSourceData?.resultSets ?? []).filter(
      (resultSet) => resultSet.loadCombination?.designSituation === activeSituation
    )
    : (resultSourceData?.resultSets ?? []);
  const actualDirections = drawingResultSets
    .map((resultSet) => Number(resultSet.windDirectionDeg))
    .sort((left, right) => left - right);
  const directionsPass = actualDirections.length === expectedDirections.length
    && actualDirections.every((direction, index) => direction === expectedDirections[index]);
  const maximumResidual = Math.max(
    Math.abs(Number(data.checks?.forceBalanceFxKN ?? 0)),
    Math.abs(Number(data.checks?.forceBalanceFyKN ?? 0)),
    Math.abs(Number(data.checks?.forceBalanceFzKN ?? 0))
  );
  const equilibriumPass = Number.isFinite(maximumResidual) && maximumResidual <= 0.001;
  const resultFresh = activeAnalysisMode !== "phase2" || !phase2ResultsStale;
  const isGeneralArrangement = activeDrawingType === "ga";
  const annotationsPass = Boolean(
    drawingAnnotationLayoutData?.profileId === "towerflow-annotation-layout"
    && drawingResolvedAnnotations.length === 2
    && drawingResolvedAnnotations.every((annotation) => !annotation.validation.release_blocking)
  );
  const requiredChecks = isAnalysis
    ? [modelProfilePass, metadataPass, directionsPass, equilibriumPass, resultFresh]
    : [modelProfilePass, annotationsPass];
  if (identityStatus.applicable) requiredChecks.push(identityStatus.ready);
  const passedChecks = requiredChecks.filter(Boolean).length;
  const ready = passedChecks === requiredChecks.length;

  if (labels.drawingValidationState) {
    labels.drawingValidationState.dataset.state = ready ? "ready" : "blocked";
  }
  labels.drawingValidationTitle.textContent = ready ? "Review Ready" : "Blocked";
  labels.drawingValidationSummary.textContent = `${passedChecks}/${requiredChecks.length} passed`;
  setDrawingValidationItem(
    labels.drawingValidationModel,
    modelProfilePass ? "pass" : "blocked",
    modelProfilePass ? "PASS" : "BLOCKED"
  );
  setDrawingValidationItem(
    labels.drawingValidationIdentity,
    identityStatus.applicable ? (identityStatus.ready ? "pass" : "blocked") : "na",
    identityStatus.applicable ? (identityStatus.ready ? "PASS" : "BLOCKED") : "N/A"
  );
  setDrawingValidationItem(
    labels.drawingValidationAnnotations,
    isGeneralArrangement ? (annotationsPass ? "pass" : "blocked") : "na",
    isGeneralArrangement ? (annotationsPass ? "2 / 2 PASS" : "BLOCKED") : "N/A"
  );
  setDrawingValidationItem(
    labels.drawingValidationMetadata,
    isAnalysis ? (metadataPass ? "pass" : "blocked") : "na",
    isAnalysis ? (metadataPass ? "PASS" : "BLOCKED") : "N/A"
  );
  setDrawingValidationItem(
    labels.drawingValidationDirections,
    isAnalysis ? (directionsPass ? "pass" : "blocked") : "na",
    isAnalysis ? (directionsPass ? "8 / 8 PASS" : `${actualDirections.length} / 8`) : "N/A"
  );
  setDrawingValidationItem(
    labels.drawingValidationEquilibrium,
    isAnalysis ? (equilibriumPass ? "pass" : "blocked") : "na",
    isAnalysis ? `${maximumResidual.toFixed(4)} kN ${equilibriumPass ? "PASS" : "REVIEW"}` : "N/A"
  );
  setDrawingValidationItem(
    labels.drawingValidationFreshness,
    isAnalysis ? (resultFresh ? "pass" : "blocked") : "na",
    isAnalysis ? (resultFresh ? "CURRENT" : "STALE") : "N/A"
  );
  setDrawingValidationItem(labels.drawingValidationPublic, "blocked", "BLOCKED");
  if (exportDrawingSvgButton) exportDrawingSvgButton.disabled = !ready;
  if (labels.drawingOutputStatus) {
    labels.drawingOutputStatus.textContent = ready ? "Review SVG available" : "Validation required";
    labels.drawingOutputStatus.dataset.state = ready ? "ready" : "blocked";
  }
  if (labels.drawingValidationNote) {
    labels.drawingValidationNote.textContent = identityStatus.applicable
      ? isPhase3ProjectInputReview()
        ? "Phase 3A project-input review. Not for design, construction or public issue."
        : "Phase 3A synthetic review. Not for design, construction or public issue."
      : "Phase 2 demo. Not for design or construction.";
  }
}

function updateDrawingInspector(data) {
  const isAnalysis = activeDrawingType !== "ga";
  const isResult = activeDrawingType === "axial";
  const isLoads = activeDrawingType === "loads";
  const isChecks = activeDrawingType === "checks";
  const critical = drawingCriticalMember(data);
  const maxForce = drawingGlobalMaxForce(data);
  const profileId = drawingProfileData?.profileId ?? "towerflow-drawing-profile";
  const profileVersion = drawingProfileData?.version ?? "0.1.0";
  const standardAdoption = drawingProfileData?.standardAdoption;
  const documentType = activeDrawingDocumentType();
  const identityStatus = phase3DrawingIdentityStatus(resultSourceData, data.activeResultSet);
  labels.drawingDocumentId.textContent = drawingDocumentId(documentType);
  labels.drawingTypeLabel.textContent = isChecks
    ? "Analysis Verification"
    : isLoads ? "Load Diagram"
      : isResult ? "Axial Force Result" : "Tower General Arrangement";
  labels.drawingIssueState.textContent = (resultSourceData?.drawingIdentity?.issueState ?? "PRIVATE_REVIEW").replaceAll("_", " ");
  labels.drawingProfileVersion.textContent = `${profileId} / ${profileVersion}`;
  labels.drawingStandardAdoption.textContent = `${standardAdoption?.packageDocumentId ?? "UWEDS"} ${standardAdoption?.packageVersion ?? "--"} / ${standardAdoption?.adoptionId ?? "PENDING"}`;
  labels.drawingModelId.textContent = data.towerReference?.id ?? data.caseId ?? "Current Phase 2 model";
  const geometryRevision = resultSourceData?.drawingIdentity?.geometryHashSha256;
  labels.drawingGeometryRevision.textContent = geometryRevision
    ? compactHash(geometryRevision)
    : `${data.towerReference?.id ?? "current"} / ${resultSourceData?.schemaVersion ?? "--"}`;
  labels.drawingGeometryRevision.title = geometryRevision ?? "";
  labels.drawingAnalysisRevision.textContent = isAnalysis || isPhase3ReviewResult()
    ? drawingAnalysisRevision()
    : "N/A";
  labels.drawingResultSetId.textContent = data.activeResultSet?.id ?? "Static result";
  labels.drawingResultSetId.title = identityStatus.binding?.resultSetHashSha256 ?? "";
  labels.drawingAnalysisSectionTitle.textContent = isChecks ? "Verification Context" : isLoads ? "Load Context" : "Result Context";
  labels.drawingAnalysisQuantity.textContent = isChecks ? "Equilibrium + extrema" : isLoads ? "Applied actions" : "Member axial force, N";
  labels.drawingAnalysisBasis.textContent = isChecks
    ? "Active case / global XYZ / elements + supports"
    : isLoads
      ? "kN / global XYZ / nodes + source cases"
      : "kN / member local x / element / unaveraged";
  labels.drawingResultRange.textContent = isLoads ? "Schematic arrows" : `${(-maxForce).toFixed(2)} to ${maxForce.toFixed(2)} kN`;
  labels.drawingLoadCase.textContent = `${activeLoading(data)?.id ?? "N/A"} / ${formatDirectionDeg(data.windDirectionDeg ?? activeLoading(data)?.windDirectionDeg)}`;
  labels.drawingCriticalMember.textContent = isLoads
    ? "N/A"
    : critical
      ? `${critical.id} / ${Number(critical.axialForceKN ?? 0).toFixed(3)} kN`
      : "--";

  const views = isChecks
    ? [
        ["V05", "Extrema & probes", "Active case / element values"],
        ["V06", "Reactions & equilibrium", "Global XYZ / active case"],
        ["V07", "Analysis basis", "Revision-controlled"],
        ["V08", "Assumptions & exclusions", "Review boundary"],
      ]
    : isLoads
    ? [
        ["V01", "Applied actions & restraints", "Controlled X-Z / Y-Z / NTS"],
        ["S01", "Load definition", "Active analysis case"],
        ["S02", "Source resultants", "Signed global components"],
      ]
    : isResult
    ? [
        ["V03", "Member axial force", "Orthographic / NTS"],
        ["V04", "Deformation", "Orthographic / 20x display"],
        ["S01", "Result definition", "Signed member axial force"],
      ]
    : [
        ["V02", "GA plan", "Orthographic / controlled"],
        ["V03", "Elevation", "Orthographic / controlled"],
      ];
  drawingControlledViews.replaceChildren();
  for (const [id, title, basis] of views) {
    const row = document.createElement("div");
    const code = document.createElement("strong");
    const name = document.createElement("span");
    code.textContent = id;
    name.textContent = title;
    row.title = basis;
    row.append(code, name);
    drawingControlledViews.appendChild(row);
  }
  updateDrawingValidation(data, isAnalysis);
}

function renderDrawing() {
  if (!drawingSvg || !towerData) return;
  drawingSvg.replaceChildren();
  drawingDimensionRequirements = [];
  drawingResolvedAnnotations = [];
  if (activeDrawingType === "axial") {
    drawAxialResult(drawingSvg, towerData);
  } else if (activeDrawingType === "loads") {
    drawLoadDiagram(drawingSvg, towerData);
  } else if (activeDrawingType === "checks") {
    drawAnalysisVerification(drawingSvg, towerData);
  } else {
    drawGeneralArrangement(drawingSvg, towerData);
  }
  appendDrawingIdentityMetadata(drawingSvg, towerData, activeDrawingDocumentType());
  updateDrawingInspector(towerData);
}

function exportDrawingSvg() {
  if (!drawingSvg || exportDrawingSvgButton?.disabled) return;
  const exportedSvg = drawingSvg.cloneNode(true);
  exportedSvg.setAttribute("xmlns", SVG_NS);
  const style = document.createElementNS(SVG_NS, "style");
  style.textContent = Array.from(document.styleSheets)
    .flatMap((styleSheet) => {
      try {
        return Array.from(styleSheet.cssRules, (rule) => rule.cssText);
      } catch {
        return [];
      }
    })
    .join("\n");
  exportedSvg.prepend(style);
  const source = new XMLSerializer().serializeToString(exportedSvg);
  const blob = new Blob([`<?xml version="1.0" encoding="UTF-8"?>\n${source}`], {
    type: "image/svg+xml",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  const documentId = labels.drawingDocumentId?.textContent ?? drawingDocumentId(activeDrawingDocumentType());
  link.href = url;
  link.download = `${documentId.replace(/[^A-Za-z0-9._-]+/g, "-")}.svg`;
  document.body.appendChild(link);
  link.click();
  link.remove();
  window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  if (labels.drawingOutputStatus) labels.drawingOutputStatus.textContent = "Review SVG downloaded";
}

function applyDrawingZoom() {
  if (!drawingSheet || !drawingZoomFit || !drawingZoomValue) return;
  if (drawingZoom === null) {
    drawingSheet.style.removeProperty("width");
    drawingSheet.style.removeProperty("min-width");
    drawingZoomValue.textContent = "Fit";
    return;
  }
  const width = Math.round(1188 * drawingZoom);
  drawingSheet.style.width = `${width}px`;
  drawingSheet.style.minWidth = `${width}px`;
  drawingZoomValue.textContent = `${Math.round(drawingZoom * 100)}%`;
}

function stepDrawingZoom(direction) {
  if (drawingZoom === null) {
    drawingZoom = direction > 0 ? 1 : 0.6;
  } else {
    const currentIndex = DRAWING_ZOOM_LEVELS.reduce((nearest, value, index) =>
      Math.abs(value - drawingZoom) < Math.abs(DRAWING_ZOOM_LEVELS[nearest] - drawingZoom)
        ? index
        : nearest
    , 0);
    const nextIndex = Math.max(0, Math.min(DRAWING_ZOOM_LEVELS.length - 1, currentIndex + direction));
    drawingZoom = DRAWING_ZOOM_LEVELS[nextIndex];
  }
  applyDrawingZoom();
}

function setDrawingType(type) {
  activeDrawingType = ["ga", "loads", "axial", "checks"].includes(type) ? type : "ga";
  appShell.dataset.drawingType = activeDrawingType;
  for (const button of drawingTypeButtons) {
    const isActive = button.dataset.drawingType === activeDrawingType;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }
  for (const section of drawingAnalysisSections) {
    section.hidden = activeWorkspace !== "drawings" || activeDrawingType === "ga";
  }
  if (activeWorkspace === "drawings") {
    setDisplayMode(activeDrawingType === "ga" ? "geometry" : "results");
    renderDrawing();
  }
}

function selectDrawingMember(memberId) {
  drawingSelectedMemberId = memberId;
  const visualObject = memberObjects.find((object) => object.userData.member?.id === memberId);
  if (visualObject) selectMember(visualObject);
  renderDrawing();
}

function formatMaxForceBalance(checks = {}) {
  const maxBalance = Math.max(
    Math.abs(Number(checks.forceBalanceFxKN ?? 0)),
    Math.abs(Number(checks.forceBalanceFyKN ?? 0)),
    Math.abs(Number(checks.forceBalanceFzKN ?? 0))
  );
  return `${maxBalance.toFixed(4)} kN`;
}

function updateEnvelopeSummary(data) {
  const envelope = data?.envelope;
  const axial = envelope?.maxAbsAxialForce;
  const reaction = envelope?.maxBaseReaction;
  if (!envelope || !axial || !reaction) {
    labels.reviewEnvelopeDirection.textContent = "--";
    labels.reviewEnvelopeMember.textContent = "--";
    labels.reviewEnvelopeReaction.textContent = "--";
    return;
  }

  labels.reviewEnvelopeDirection.textContent = formatDirectionDeg(envelope.governingWindDirectionDeg);
  labels.reviewEnvelopeMember.textContent = `${axial.memberId} / ${Number(axial.magnitudeKN).toFixed(2)} kN`;
  labels.reviewEnvelopeReaction.textContent = `${Number(reaction.magnitudeKN).toFixed(2)} kN / ${formatDirectionDeg(reaction.windDirectionDeg)}`;
}

function renderTopMemberForces(data) {
  if (!topMemberForceChart) return;
  const members = [...(data?.members ?? [])]
    .sort((first, second) => Math.abs(Number(second.axialForceKN ?? 0)) - Math.abs(Number(first.axialForceKN ?? 0)))
    .slice(0, 7);
  const maxForce = Math.max(...members.map((member) => Math.abs(Number(member.axialForceKN ?? 0))), 0);
  labels.reviewMemberMax.textContent = maxForce > 0 ? `${maxForce.toFixed(2)} kN` : "--";
  topMemberForceChart.replaceChildren();

  for (const member of members) {
    const value = Number(member.axialForceKN ?? 0);
    const row = document.createElement("div");
    row.className = "member-force-row";

    const button = document.createElement("button");
    button.type = "button";
    button.className = "member-force-id";
    button.textContent = member.id;
    button.title = `Select member ${member.id} in the 3D view`;
    button.addEventListener("click", () => {
      const object = memberObjects.find((candidate) => candidate.userData.member?.id === member.id);
      if (object) selectMember(object);
      setWorkspaceView("results", false);
    });

    const stateClass = value >= 0 ? "is-tension" : "is-compression";
    const marker = document.createElement("span");
    marker.className = `member-force-marker ${stateClass}`;
    marker.setAttribute("aria-hidden", "true");

    const force = document.createElement("span");
    force.className = "member-force-value";
    force.textContent = `${value >= 0 ? "+" : ""}${value.toFixed(2)} kN`;

    const state = document.createElement("span");
    state.className = `member-force-state ${stateClass}`;
    state.textContent = value >= 0 ? "Tension" : "Compression";
    row.append(button, marker, force, state);
    topMemberForceChart.appendChild(row);
  }
}

function renderCaseComparison() {
  if (!caseComparisonBody) return;
  const allResultSets = resultSourceData?.resultSets ?? [];
  const activeSituation = towerData?.loadCombination?.designSituation;
  const resultSets = activeSituation
    ? allResultSets.filter((resultSet) => resultSet.loadCombination?.designSituation === activeSituation)
    : allResultSets;
  labels.reviewCaseCount.textContent = `${resultSets.length || 1} directions`;
  caseComparisonBody.replaceChildren();

  for (const resultSet of resultSets) {
    const row = document.createElement("tr");
    row.classList.toggle("is-active", resultSet.id === activeResultSetId);
    const directionCell = document.createElement("td");
    const directionButton = document.createElement("button");
    directionButton.type = "button";
    directionButton.className = "case-direction-button";
    directionButton.textContent = formatDirectionDeg(resultSet.windDirectionDeg);
    directionButton.title = `Review ${resultSet.loadCombination?.id ?? formatDirectionDeg(resultSet.windDirectionDeg)}`;
    directionButton.addEventListener("click", () => {
      setActiveResultSet(resultSet.id);
      setWorkspaceView("results", false);
    });
    directionCell.appendChild(directionButton);

    const axialCell = document.createElement("td");
    axialCell.textContent = Number(resultSet.checks?.maxAbsAxialForceKN ?? 0).toFixed(2);
    const displacementCell = document.createElement("td");
    displacementCell.textContent = (Number(resultSet.checks?.maxDisplacement?.valueM ?? 0) * 1000).toFixed(2);
    const reactionCell = document.createElement("td");
    reactionCell.textContent = Math.abs(Number(resultSet.checks?.maxReaction?.valueKN ?? 0)).toFixed(2);
    row.append(directionCell, axialCell, displacementCell, reactionCell);
    caseComparisonBody.appendChild(row);
  }
}

function renderResultReview(data) {
  const loading = activeLoading(data);
  labels.reviewCaseBadge.textContent = `${formatDirectionDeg(data?.windDirectionDeg ?? loading?.windDirectionDeg)} / ${loading?.id ?? "--"}`;
  renderTopMemberForces(data);
  renderCaseComparison();
}

function buildActiveTowerData(sourceData, resultSet) {
  if (!resultSet) return sourceData;
  return {
    ...sourceData,
    activeResultSet: resultSet,
    activeResultSetId: resultSet.id,
    windDirectionDeg: resultSet.windDirectionDeg,
    nodes: resultSet.nodes ?? sourceData.nodes,
    members: resultSet.members ?? sourceData.members,
    loadCases: resultSet.loadCases ?? sourceData.loadCases,
    loadCombination: resultSet.loadCombination ?? sourceData.loadCombination,
    supportReactions: resultSet.supportReactions ?? sourceData.supportReactions,
    checks: resultSet.checks ?? sourceData.checks,
  };
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

function makeLoadLabel(text, modelScale = modelRadius, colour = "#7c2d12") {
  const labelWidth = Math.max(modelScale * 0.1, 1.65);
  const labelHeight = Math.max(modelScale * 0.032, 0.52);
  return makeTextSprite(text, {
    width: 230,
    height: 70,
    font: "840 38px ui-monospace, SFMono-Regular, Consolas, monospace",
    colour,
    strokeWidth: 7,
    textY: 47,
    scale: [labelWidth, labelHeight, 1],
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
  if (corner === 1) return 1;
  if (corner === 3) return -1;
  return 0;
}

function memberColour(member, maxAbsForce) {
  const magnitude = Math.min(Math.abs(member.axialForceKN) / Math.max(maxAbsForce, 0.001), 1);
  const low = new THREE.Color(0x9aa6b2);
  const tension = new THREE.Color(0xdc263f);
  const compression = new THREE.Color(0x0057b8);
  if (Math.abs(member.axialForceKN) < ZERO_FORCE_THRESHOLD_KN) return low;
  const colourStrength = 0.48 + Math.sqrt(magnitude) * 0.52;
  return low.clone().lerp(member.axialForceKN > 0 ? tension : compression, colourStrength);
}

function currentMemberColour(member) {
  if (displayMode === "geometry" || activeResultQuantity !== "member_axial") {
    return new THREE.Color(GEOMETRY_COLOUR);
  }
  const maxAbsForce = towerData?.checks?.maxAbsAxialForceKN ?? 0;
  return memberColour(member, maxAbsForce);
}

function makeMember(start, end, member, maxAbsForce) {
  const direction = new THREE.Vector3().subVectors(end, start);
  const length = direction.length();
  const geometry = new THREE.CylinderGeometry(MEMBER_RADIUS_M, MEMBER_RADIUS_M, length, 10);
  const material = new THREE.MeshBasicMaterial({
    color: displayMode === "geometry" || activeResultQuantity !== "member_axial"
      ? GEOMETRY_COLOUR
      : memberColour(member, maxAbsForce),
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

function currentMemberScale(member) {
  if (displayMode !== "results" || activeResultQuantity !== "member_axial") return 1;
  const maxAbsForce = towerData?.checks?.maxAbsAxialForceKN ?? 0;
  const magnitude = Math.abs(Number(member.axialForceKN ?? 0));
  const relativeMagnitude = magnitude / Math.max(maxAbsForce, 0.001);
  if (magnitude < ZERO_FORCE_THRESHOLD_KN) return LOW_FORCE_MEMBER_SCALE;
  return LOW_FORCE_MEMBER_SCALE
    + Math.sqrt(Math.min(relativeMagnitude, 1)) * (RESULT_MEMBER_SCALE - LOW_FORCE_MEMBER_SCALE);
}

function clearSelectionCallout() {
  if (!selectionCallout) return;
  selectionCallout.hidden = true;
  selectionCallout.textContent = "";
  selectionCallout.style.visibility = "hidden";
}

function showSelectionCallout(member) {
  if (!selectionCallout) return;
  selectionCallout.textContent = member.id;
  selectionCallout.hidden = false;
}

function updateSelectionCalloutPosition() {
  if (!selectionCallout || selectionCallout.hidden || !selectedObject?.userData.member) return;
  const projected = selectedObject.position.clone().project(camera);
  const isVisible = projected.z >= -1 && projected.z <= 1;
  selectionCallout.style.visibility = isVisible ? "visible" : "hidden";
  selectionCallout.style.left = `${(projected.x * 0.5 + 0.5) * viewer.clientWidth}px`;
  selectionCallout.style.top = `${(-projected.y * 0.5 + 0.5) * viewer.clientHeight}px`;
}

function resetSelectionPanel() {
  labels.selectionRowA.textContent = "Axial Force";
  labels.selectionRowB.textContent = "Length";
  labels.selectionRowC.textContent = "Group";
  labels.selectionRowD.textContent = "Section";
  labels.memberTitle.textContent = "No selection";
  labels.memberState.textContent = "Member or node";
  labels.memberForce.textContent = "-";
  labels.memberLength.textContent = "-";
  labels.memberGroup.textContent = "-";
  labels.memberSection.textContent = "-";
  labels.memberInterpretation.textContent = "";
  labels.memberInterpretation.hidden = true;
}

function clearTower() {
  selectedObject = null;
  clearSelectionCallout();
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
  for (const object of reactionObjects) {
    disposeRenderableTree(object);
  }
  for (const object of deformedObjects) {
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
  reactionObjects.length = 0;
  deformedObjects.length = 0;
  originAxisObjects.length = 0;
  supportObjects.length = 0;
  resetSelectionPanel();
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
  activeView = viewName === "fit" ? "front" : viewName;
  for (const button of viewButtons) {
    const isActive = button.dataset.view === activeView;
    button.classList.toggle("is-active", isActive);
    if (button.dataset.view !== "fit") {
      button.setAttribute("aria-pressed", String(isActive));
    }
  }
}

function updateOrthoFrustum() {
  const width = viewer.clientWidth || 1;
  const height = viewer.clientHeight || 1;
  const aspect = width / height;
  const isMobileViewer = width <= 640;
  const viewScale =
    activeView === "front" || activeView === "side"
      ? isMobileViewer
        ? 1.55
        : 1.16
      : activeView === "plan"
        ? 1.28
        : 1.52;
  const halfSize = Math.max(modelRadius * viewScale, 2.8);
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

function addLoadArrow(load, nodes, maxLoadMagnitude, showLabel = true) {
  const node = nodes.get(load.nodeId);
  if (!node) return;
  const direction = loadVector(load);
  const magnitude = direction.length();
  if (magnitude <= 0) return;

  const applicationPoint = nodeVector(node);
  const unitDirection = direction.clone().normalize();
  const displayScale = Math.max(modelRadius, 8);
  const loadRatio = magnitude / Math.max(maxLoadMagnitude, 0.001);
  const arrowLength = displayScale * (0.048 + loadRatio * 0.074);
  const headHeight = Math.max(displayScale * 0.011, 0.24);
  const headRadius = Math.max(displayScale * 0.0046, 0.095);
  const shaftRadius = Math.max(displayScale * 0.00135, 0.026);
  const shaftClearance = Math.max(displayScale * 0.004, 0.08);
  const shaftLength = Math.max(arrowLength - headHeight, displayScale * 0.02);
  const tailPosition = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(shaftClearance));
  const shaftEnd = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(shaftLength));
  const headPosition = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(arrowLength));
  const group = new THREE.Group();
  const colour = load.actionCategoryId === "G" ? PERMANENT_LOAD_COLOUR : LOAD_COLOUR;
  const shaft = makeCylinderBetween(tailPosition, shaftEnd, shaftRadius, colour);
  const head = makeConeAt(headPosition, unitDirection, headRadius, headHeight, colour);
  group.add(shaft);
  group.add(head);
  if (showLabel && load.display?.showLabel !== false) {
    const labelColour = load.actionCategoryId === "G" ? "#174f96" : "#7c2d12";
    const label = makeLoadLabel(formatLoadArrowLabel(load), displayScale, labelColour);
    const labelOffset = label.scale.x * 0.5 + Math.max(displayScale * 0.012, 0.25);
    const labelSpread = label.scale.y * 1.15;
    label.position.copy(headPosition).add(unitDirection.clone().multiplyScalar(labelOffset));
    label.position.y += loadLabelVerticalOffset(load) * labelSpread;
    label.userData.kind = "load-label";
    group.add(label);
  }
  group.userData.load = load;
  group.userData.applicationPoint = applicationPoint;
  group.userData.arrowConvention = "tail-at-application-head-along-signed-vector";
  scene.add(group);
  loadObjects.push(group);
  updateDisplayOptions();
}

function addReactionArrow(reaction, nodes, maxReactionMagnitude) {
  const node = nodes.get(reaction.nodeId);
  if (!node) return;
  const direction = reactionVector(reaction);
  const magnitude = direction.length();
  if (magnitude <= 0) return;

  const applicationPoint = nodeVector(node);
  const unitDirection = direction.clone().normalize();
  const displayScale = Math.max(modelRadius, 8);
  const reactionRatio = magnitude / Math.max(maxReactionMagnitude, 0.001);
  const arrowLength = displayScale * (0.052 + reactionRatio * 0.072);
  const headHeight = Math.max(displayScale * 0.012, 0.25);
  const headRadius = Math.max(displayScale * 0.005, 0.1);
  const shaftRadius = Math.max(displayScale * 0.0015, 0.03);
  const shaftClearance = Math.max(displayScale * 0.009, 0.18);
  const shaftLength = Math.max(arrowLength - headHeight, displayScale * 0.02);
  const tailPosition = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(shaftClearance));
  const shaftEnd = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(shaftLength));
  const headPosition = applicationPoint.clone().add(unitDirection.clone().multiplyScalar(arrowLength));
  const group = new THREE.Group();
  const shaft = makeCylinderBetween(tailPosition, shaftEnd, shaftRadius, REACTION_COLOUR);
  const head = makeConeAt(headPosition, unitDirection, headRadius, headHeight, REACTION_COLOUR);
  for (const part of [shaft, head]) {
    part.material.depthTest = false;
    part.material.depthWrite = false;
    part.renderOrder = 20;
    group.add(part);
  }
  group.userData.reaction = reaction;
  group.userData.applicationPoint = applicationPoint;
  group.userData.reactionConvention = "support-on-model-head-along-signed-vector";
  scene.add(group);
  reactionObjects.push(group);
}

function renderReactionTable(reactions) {
  if (!reactionTableBody) return;
  reactionTableBody.replaceChildren();
  for (const reaction of reactions) {
    const row = document.createElement("tr");
    for (const value of [
      reaction.nodeId,
      reaction.fxKN.toFixed(2),
      reaction.fyKN.toFixed(2),
      reaction.fzKN.toFixed(2),
      reaction.magnitudeKN.toFixed(2),
    ]) {
      const cell = document.createElement("td");
      cell.textContent = value;
      row.appendChild(cell);
    }
    reactionTableBody.appendChild(row);
  }
}

function renderReactions(data, nodes) {
  const reactions = drawingSupportReactionRows(data);
  const maxReactionMagnitude = Math.max(...reactions.map((reaction) => reaction.magnitudeKN), 0);
  for (const reaction of reactions) {
    addReactionArrow(reaction, nodes, maxReactionMagnitude);
  }
  renderReactionTable(reactions);
}

function clearDeformedShape() {
  for (const object of deformedObjects) {
    disposeRenderableTree(object);
  }
  deformedObjects.length = 0;
}

function renderDisplacementSummary(data) {
  const displacement = maxDisplacement(data.nodes ?? []);
  if (labels.displacementNode) labels.displacementNode.textContent = displacement.nodeId;
  if (labels.displacementUx) labels.displacementUx.textContent = `${(displacement.ux * 1000).toFixed(3)} mm`;
  if (labels.displacementUy) labels.displacementUy.textContent = `${(displacement.uy * 1000).toFixed(3)} mm`;
  if (labels.displacementUz) labels.displacementUz.textContent = `${(displacement.uz * 1000).toFixed(3)} mm`;
  if (labels.displacementMagnitude) {
    labels.displacementMagnitude.textContent = `${(displacement.magnitude * 1000).toFixed(3)} mm`;
  }
}

function renderDeformedShape(data, nodes) {
  clearDeformedShape();
  const radius = Math.max(modelRadius * 0.0017, 0.035);
  for (const member of data.members ?? []) {
    const startNode = nodes.get(member.startNodeId);
    const endNode = nodes.get(member.endNodeId);
    if (!startNode || !endNode) continue;
    const memberMesh = makeCylinderBetween(
      deformedNodeVector(startNode),
      deformedNodeVector(endNode),
      radius,
      DEFORMED_COLOUR
    );
    memberMesh.material.depthTest = false;
    memberMesh.material.depthWrite = false;
    memberMesh.renderOrder = 16;
    memberMesh.userData.deformationScale = deformationScale;
    scene.add(memberMesh);
    deformedObjects.push(memberMesh);
  }
  updateDisplayOptions();
}

function setDeformationScale(value) {
  const nextScale = Math.min(Math.max(Number(value) || 20, 1), 100);
  deformationScale = nextScale;
  if (deformationScaleInput) deformationScaleInput.value = String(nextScale);
  if (towerData && nodeMap.size > 0) renderDeformedShape(towerData, nodeMap);
}

function updateDisplayOptions() {
  const loadWorkspaceActive = activeWorkspace === "loads" || activeWorkspace === "solve";
  const showLoads = (displayMode === "results" || loadWorkspaceActive) && (showLoadsToggle?.checked ?? true);
  const availableActionCategories = new Set(
    (activeLoading(towerData)?.loads ?? []).map((load) => load.actionCategoryId ?? "W")
  );
  for (const option of Array.from(loadActionFilter?.options ?? [])) {
    if (option.value !== "ALL") option.disabled = !availableActionCategories.has(option.value);
  }
  if (loadActionFilter?.selectedOptions?.[0]?.disabled) loadActionFilter.value = "ALL";
  const actionFilter = loadActionFilter?.value ?? "ALL";
  const showReactions = activeWorkspace === "results"
    && displayMode === "results"
    && activeResultQuantity === "support_reaction";
  const showDeformation = activeWorkspace === "results"
    && displayMode === "results"
    && activeResultQuantity === "nodal_displacement";
  for (const object of loadObjects) {
    const categoryMatches = actionFilter === "ALL" || object.userData.load?.actionCategoryId === actionFilter;
    const combinedViewMatches = actionFilter !== "ALL" || object.userData.load?.display?.showInCombinedView !== false;
    object.visible = showLoads && categoryMatches && combinedViewMatches;
  }
  for (const object of reactionObjects) {
    object.visible = showReactions;
  }
  for (const object of deformedObjects) {
    object.visible = showDeformation;
  }
  if (reactionSummarySection) reactionSummarySection.hidden = !showReactions;
  if (displacementSummarySection) displacementSummarySection.hidden = !showDeformation;
  if (selectionSection) {
    selectionSection.hidden = activeWorkspace !== "results" || activeResultQuantity !== "member_axial";
  }
  updateLegend();
}

function updateLegend() {
  if (!legendPanel) return;
  const loadWorkspaceActive = activeWorkspace === "loads" || activeWorkspace === "solve";
  const resultLegendActive = activeWorkspace === "results" && displayMode === "results";
  const reactionLegendActive = resultLegendActive && activeResultQuantity === "support_reaction";
  const deformationLegendActive = resultLegendActive && activeResultQuantity === "nodal_displacement";
  const axialLegendActive = resultLegendActive && activeResultQuantity === "member_axial";
  legendPanel.hidden = !loadWorkspaceActive && !resultLegendActive;
  for (const row of resultLegendRows) row.hidden = !axialLegendActive;
  const loading = activeLoading(towerData);
  const availableActionCategories = new Set(
    (loading?.loads ?? []).map((load) => load.actionCategoryId ?? "W")
  );
  for (const option of Array.from(loadActionFilter?.options ?? [])) {
    if (option.value !== "ALL") option.disabled = !availableActionCategories.has(option.value);
  }
  if (loadActionFilter?.selectedOptions?.[0]?.disabled) loadActionFilter.value = "ALL";
  const actionFilter = loadActionFilter?.value ?? "ALL";
  for (const row of loadLegendRows) {
    const category = row.dataset.loadLegendCategory;
    row.hidden = !loadWorkspaceActive
      || !availableActionCategories.has(category)
      || (actionFilter !== "ALL" && category !== actionFilter);
  }
  for (const row of reactionLegendRows) row.hidden = !reactionLegendActive;
  for (const row of deformationLegendRows) row.hidden = !deformationLegendActive;
  if (loadWorkspaceActive) {
    legendTitle.textContent = actionFilter === "W"
      ? "Wind Action W"
      : actionFilter === "G"
        ? "Permanent Action G"
        : towerData?.loadCombination ? "Combination Loads" : "Load Case";
    legendNote.textContent = actionFilter === "G"
      ? "Member self-weight is visible in G isolation; arrows are schematic and high-density values are sampled."
      : "Arrows are schematic; high-density values are sampled and member self-weight is hidden in the combined view.";
  } else if (reactionLegendActive) {
    legendTitle.textContent = "Support Reactions";
    legendNote.textContent = "Support on model; arrow length is schematic.";
  } else if (deformationLegendActive) {
    legendTitle.textContent = "Static Deformation";
    legendNote.textContent = `${deformationScale}x display; values are true displacement.`;
  } else if (resultLegendActive) {
    legendTitle.textContent = "Axial Force";
    legendNote.textContent = "Intensity = |N| for active direction.";
  }
}

function setReviewCollapsed(collapsed) {
  appShell.classList.toggle("is-review-collapsed", collapsed);
  toggleResultReview.setAttribute("aria-expanded", String(!collapsed));
  toggleResultReview.title = collapsed ? "Expand results review" : "Collapse results review";
  const icon = toggleResultReview.querySelector("span");
  if (icon) icon.textContent = collapsed ? "+" : "-";
  window.requestAnimationFrame(resize);
}

function setReviewView(viewName) {
  activeReviewView = reviewTabButtons.some((button) => button.dataset.reviewTab === viewName)
    ? viewName
    : "envelope";
  for (const button of reviewTabButtons) {
    const isActive = button.dataset.reviewTab === activeReviewView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }
  for (const view of reviewViews) {
    view.hidden = view.dataset.reviewView !== activeReviewView;
  }
}

function applyDisplayMode() {
  const deformationActive = displayMode === "results" && activeResultQuantity === "nodal_displacement";
  if (labels.viewerModelBadge) {
    const modelName = towerData?.towerReference?.name?.replace(" full-height triangular lattice tower demo", "") ?? "FEC Type AA";
    const windLabel = towerData?.windDirectionDeg !== undefined ? ` / Wind ${formatDirectionDeg(towerData.windDirectionDeg)}` : "";
    labels.viewerModelBadge.textContent = `${modelName} / SI${windLabel}`;
  }
  for (const object of memberObjects) {
    if (object !== selectedObject) {
      object.material.color.copy(currentMemberColour(object.userData.member));
      const scale = currentMemberScale(object.userData.member);
      object.scale.set(scale, 1, scale);
    }
    object.material.transparent = deformationActive;
    object.material.opacity = deformationActive ? 0.26 : 1;
    object.material.depthWrite = !deformationActive;
  }
  for (const object of nodeObjects) {
    if (object !== selectedObject) {
      object.material.color.set(displayMode === "geometry" ? 0x111827 : 0x0f172a);
    }
    object.material.transparent = deformationActive;
    object.material.opacity = deformationActive ? 0.32 : 1;
    object.material.depthWrite = !deformationActive;
  }
  updateDisplayOptions();
}

function setDisplayMode(mode) {
  displayMode = mode === "results" ? "results" : "geometry";
  applyDisplayMode();
}

function setActiveResultQuantity(quantity) {
  activeResultQuantity = ["member_axial", "support_reaction", "nodal_displacement"].includes(quantity)
    ? quantity
    : "member_axial";
  if (activeResultQuantity !== "member_axial") clearSelection();
  if (resultDisplayType) resultDisplayType.value = activeResultQuantity;
  if (labels.activeResultType) {
    labels.activeResultType.textContent = {
      member_axial: "Member Axial",
      support_reaction: "Support Reaction",
      nodal_displacement: "Nodal Displacement",
    }[activeResultQuantity];
  }
  applyDisplayMode();
}

function setWorkspaceView(viewName, syncViewer = true) {
  const validView = workspaceButtons.some((button) => button.dataset.workspaceTab === viewName)
    ? viewName
    : "results";
  activeWorkspace = validView;
  appShell.dataset.workspace = activeWorkspace;
  for (const button of workspaceButtons) {
    const isActive = button.dataset.workspaceTab === activeWorkspace;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }
  for (const section of workspaceSections) {
    section.hidden = section.dataset.workspaceView !== activeWorkspace;
  }
  for (const section of loadingOwnedSections) {
    section.hidden = activeWorkspace !== "loads" || section.dataset.loadingOwner !== activeLoadingView;
  }
  if (resultSourceSection) {
    resultSourceSection.hidden = activeWorkspace !== "results" || !(phase2ResultData && phase3ReviewData);
  }
  if (phase3ReviewSection) {
    phase3ReviewSection.hidden = activeWorkspace !== "solve" || !phase3ReviewEnabled;
  }
  if (phase3ReviewDetailSection) {
    phase3ReviewDetailSection.hidden = activeWorkspace !== "results"
      || activeAnalysisMode !== "phase3-review"
      || !phase3ReviewData;
  }
  if (drawingWorkspace) drawingWorkspace.hidden = activeWorkspace !== "drawings";
  for (const section of drawingAnalysisSections) {
    section.hidden = activeWorkspace !== "drawings" || activeDrawingType === "ga";
  }
  setReviewCollapsed(activeWorkspace === "results" ? reviewUserCollapsed : true);
  if (infoPanel) infoPanel.scrollTop = 0;
  if (activeWorkspace === "drawings" && towerData) renderDrawing();
  updateAnalysisLifecycleUi();
  if (!syncViewer || !towerData) return;

  const loadContext = activeWorkspace === "loads" || activeWorkspace === "solve";
  if (showLoadsToggle) showLoadsToggle.checked = loadContext;
  const resultContext = activeWorkspace === "results"
    || (activeWorkspace === "drawings" && activeDrawingType !== "ga");
  setDisplayMode(resultContext ? "results" : "geometry");
}

function publishPhase3AcceptanceSnapshot(sourceData = resultSourceData, activeSet = towerData?.activeResultSet) {
  const auditPayload = document.querySelector("#phase3-acceptance-snapshot");
  if (!isPhase3ReviewResult(sourceData) || !activeSet) {
    if (auditPayload) {
      auditPayload.dataset.state = "NOT_AVAILABLE";
      auditPayload.textContent = "{}";
    }
    return;
  }
  const identity = sourceData.drawingIdentity ?? {};
  const binding = identity.directionBindings?.find((item) => item.resultSetId === activeSet.id);
  const windCase = activeSet.loadCases?.find((item) => item.actionCategoryId === "W");
  if (!binding || !windCase) {
    if (auditPayload) {
      auditPayload.dataset.state = "BLOCKED";
      auditPayload.textContent = "{}";
    }
    return;
  }
  const combination = activeSet.loadCombination;
  const surface = {
    state: "BOUND",
    resultHashSha256: sourceData.resultHashSha256,
    resultSetId: activeSet.id,
    resultSetHashSha256: activeSet.resultSetHashSha256,
  };
  const snapshot = {
    schemaVersion: "0.1.0-cross-surface-snapshot",
    analysisMode: "phase3-review",
    projectInputId: sourceData.inputSummary.projectInputId,
    actionScenarioId: sourceData.actionScenario.scenarioId,
    verificationCaseId: sourceData.actionScenario.verificationCaseId,
    modelId: sourceData.towerReference.id,
    adapter: {
      id: sourceData.adapter.id,
      version: sourceData.adapter.version,
    },
    inputHashSha256: sourceData.inputHashSha256,
    sourceHashSha256: sourceData.sourceHashSha256,
    resultHashSha256: sourceData.resultHashSha256,
    activeResultSet: {
      id: activeSet.id,
      hashSha256: activeSet.resultSetHashSha256,
      sourceDirectionDegTrueNorth: activeSet.windDirectionDeg,
      forceDirectionDegTrueNorth: windCase.windCalculation.downwindDirectionDegTrueNorth,
      loadingId: combination?.id ?? windCase.id,
      windLoadCaseId: windCase.id,
      combinationId: combination?.id ?? null,
    },
    surfaces: {
      api: { ...surface },
      viewport3d: { ...surface },
      resultsTable: { ...surface },
      drawing: { ...surface },
    },
    drawingIdentity: {
      contractId: identity.contractId,
      contractVersion: identity.contractVersion,
      documentRevision: identity.documentRevision,
      bindingResultSetHashSha256: binding.resultSetHashSha256,
    },
  };
  if (auditPayload) {
    auditPayload.dataset.state = "READY";
    auditPayload.textContent = JSON.stringify(snapshot);
  }
}

function setHashLabel(label, value) {
  if (!label) return;
  const hash = String(value ?? "");
  label.textContent = hash.length > 24 ? `${hash.slice(0, 12)}...${hash.slice(-8)}` : hash || "--";
  label.title = hash;
}

function updateAnalysisModeControls() {
  const reviewActive = activeAnalysisMode === "phase3-review";
  if (resultSourceSection) {
    resultSourceSection.hidden = activeWorkspace !== "results" || !(phase2ResultData && phase3ReviewData);
  }
  if (phase3ReviewDetailSection) {
    phase3ReviewDetailSection.hidden = activeWorkspace !== "results" || !reviewActive || !phase3ReviewData;
  }
  for (const button of analysisModeButtons) {
    const mode = button.dataset.analysisMode;
    const isActive = mode === activeAnalysisMode;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
    button.disabled = mode === "phase3-review" && !phase3ReviewData;
  }
  if (analysisStateBadge) {
    analysisStateBadge.textContent = phase3ReviewEnabled
      ? reviewActive ? "P3A REVIEW" : "P2 ACTIVE"
      : "P2 + P3A";
  }
  if (solverForm) {
    solverForm.inert = reviewActive;
    solverForm.classList.toggle("is-inactive", reviewActive);
    solverForm.setAttribute("aria-disabled", String(reviewActive));
    const inputGroups = Array.from(solverForm.querySelectorAll("details"));
    if (reviewActive) {
      for (const group of inputGroups) group.open = false;
    }
  }
  if (phase2InputStatus) {
    phase2InputStatus.textContent = reviewActive
      ? "Inactive / Phase 2 draft"
      : phase2ResultsStale ? "Modified / solve required" : "Active / Phase 2";
  }
  if (discardPhase2ChangesButton) {
    discardPhase2ChangesButton.hidden = reviewActive || !phase2ResultsStale;
    discardPhase2ChangesButton.disabled = reviewActive || !phase2ResultsStale;
  }
  updateSolveReadiness();
  for (const input of [combinationSelectAll, ...combinationSituationInputs].filter(Boolean)) {
    input.disabled = reviewActive;
  }
  if (drawingsWorkspaceButton) {
    const identityStatus = phase3DrawingIdentityStatus(
      phase3ReviewData,
      phase3ReviewData?.resultSets?.[0]
    );
    drawingsWorkspaceButton.disabled = reviewActive && !identityStatus.ready;
    drawingsWorkspaceButton.title = reviewActive
      ? identityStatus.ready
        ? "Open controlled Phase 3A review drawings"
        : "Phase 3A Drawing identity is blocked"
      : "Open controlled drawings";
  }
  updateAnalysisLifecycleUi();
}

function updateAnalysisLifecycleUi() {
  const stalePhase2Active = phase2ResultsStale && activeAnalysisMode === "phase2";
  const staleOutputVisible = stalePhase2Active && ["results", "drawings"].includes(activeWorkspace);
  if (analysisLifecycleAlert) analysisLifecycleAlert.hidden = !staleOutputVisible;
  appShell.dataset.resultState = stalePhase2Active ? "stale" : "current";
  for (const button of workspaceButtons) {
    const resultDependent = ["results", "drawings"].includes(button.dataset.workspaceTab);
    button.classList.toggle("is-modified", stalePhase2Active && resultDependent);
  }
  if (analysisStateBadge && stalePhase2Active) analysisStateBadge.textContent = "P2 MODIFIED";
  if (resultSourceData) {
    const input = activeAnalysisMode === "phase3-review"
      ? resultSourceData.inputSummary
      : solverInputDraft ?? resultSourceData.inputSummary;
    renderLoadingRegister(input, resultSourceData);
  }
}

function markPhase2ResultsModified() {
  if (!phase2ResultData || phase2ResultsStale) return;
  phase2ResultsStale = true;
  setSolveState("modified", "Modified / solve required");
  updateAnalysisModeControls();
  if (activeWorkspace === "drawings" && towerData) renderDrawing();
}

function discardPhase2Changes() {
  if (!phase2ResultsStale || !phase2ResultData?.inputSummary) return;
  phase2ResultsStale = false;
  populateSolverControls(phase2ResultData.inputSummary);
  setSolveState("success", "Current / last solve");
  if (towerData) updateInputSummary(towerData);
  updateAnalysisModeControls();
}

function phase3ProjectInputPreflight(request) {
  const errors = [];
  const projectInput = request?.projectInput;
  if (request?.schemaVersion !== "0.5.0-review") errors.push("Review request schemaVersion must be 0.5.0-review");
  if (request?.mode !== "mapped_action_review") errors.push("Review request mode must be mapped_action_review");
  if (!projectInput || typeof projectInput !== "object" || Array.isArray(projectInput)) {
    return { ready: false, errors: [...errors, "projectInput must be a JSON object"], projectInput: null };
  }
  if (projectInput.schemaVersion !== "0.4.0-project-input") errors.push("Project input schemaVersion must be 0.4.0-project-input");
  if (!projectInput.projectInputId) errors.push("projectInputId is required");
  if (!projectInput.modelId) errors.push("modelId is required");
  if (request.modelId !== projectInput.modelId) errors.push("Request and project-input model IDs do not match");
  if (projectInput.modelId !== "fec-type-aa-full-elevation-demo") errors.push("Project input does not match the supported tower model");

  const acceptance = projectInput.acceptance;
  if (!acceptance || typeof acceptance !== "object" || Array.isArray(acceptance)) {
    errors.push("Acceptance record is required");
  } else {
    if (acceptance.releaseAuthority !== false) errors.push("releaseAuthority must remain false");
    if (!acceptance.reviewedBy || !acceptance.reviewDate) errors.push("Identified reviewer and review date are required");
    if (!Array.isArray(acceptance.evidenceIds) || acceptance.evidenceIds.length < 5) errors.push("Acceptance requires at least five evidence IDs");
    const projectReview = projectInput.inputStatus === "project_review";
    if (projectReview && (acceptance.status !== "reviewed_for_analysis" || acceptance.scope !== "project_input")) {
      errors.push("Project review input requires reviewed_for_analysis / project_input acceptance");
    }
    if (!projectReview && projectInput.inputStatus !== "synthetic_verification_only") errors.push("inputStatus is unsupported");
    if (projectInput.inputStatus === "synthetic_verification_only"
      && (acceptance.status !== "fixture_verified" || acceptance.scope !== "synthetic_fixture")) {
      errors.push("Synthetic input requires fixture_verified / synthetic_fixture acceptance");
    }
  }

  const scenarios = Array.isArray(projectInput.actionScenarios) ? projectInput.actionScenarios : [];
  if (scenarios.length === 0) errors.push("At least one action scenario is required");
  const scenarioIds = scenarios.map((scenario) => scenario?.scenarioId).filter(Boolean);
  if (new Set(scenarioIds).size !== scenarioIds.length) errors.push("Action scenario IDs must be unique");
  if (!scenarioIds.includes(request.actionScenarioId)) errors.push("Selected action scenario is not present in the project input");
  if (!projectInput.windCase || typeof projectInput.windCase !== "object") errors.push("Complete windCase is required");
  if (projectInput.windCase?.tower?.seedId !== projectInput.modelId) errors.push("Wind-case tower model does not match project input");

  const requiredDirections = [0, 45, 90, 135, 180, 225, 270, 315];
  const terrainDirections = projectInput.terrainEvidence?.directionAssessments ?? [];
  const topographyDirections = projectInput.topographyEvidence?.directionAssessments ?? [];
  const hasDirections = (records) => records.length === 8
    && requiredDirections.every((direction) => records.some((record) => Number(record?.sourceDirectionDegTrueNorth) === direction));
  if (!hasDirections(terrainDirections)) errors.push("Terrain evidence must cover all eight source directions");
  if (!hasDirections(topographyDirections)) errors.push("Topography evidence must cover all eight source directions");
  if (terrainDirections.some((record) => record?.classificationStatus !== "reviewed")) errors.push("Terrain directions must be reviewed");
  if (topographyDirections.some((record) => record?.classificationStatus !== "reviewed")) errors.push("Topography directions must be reviewed");
  if (projectInput.topographyEvidence?.assessment?.reviewStatus !== "reviewed") errors.push("Topography assessment must be reviewed");

  return {
    ready: errors.length === 0,
    errors,
    projectInput,
    coverage: {
      scenarios: scenarios.length,
      terrain: terrainDirections.length,
      topography: topographyDirections.length,
    },
  };
}

function phase3ActionScenario() {
  const scenarios = phase3ReviewRequest?.projectInput?.actionScenarios ?? [];
  return scenarios.find((scenario) => scenario.scenarioId === phase3ActionScenarioSelect?.value) ?? scenarios[0];
}

function populatePhase3ActionScenarios(request) {
  if (!phase3ActionScenarioSelect) return;
  const previousId = phase3ActionScenarioSelect.value;
  const scenarios = request?.projectInput?.actionScenarios ?? [];
  phase3ActionScenarioSelect.replaceChildren();
  for (const scenario of scenarios) {
    const option = document.createElement("option");
    option.value = scenario.scenarioId;
    option.textContent = `${scenario.verificationCaseId} | ${scenario.title}`;
    phase3ActionScenarioSelect.appendChild(option);
  }
  const requestedId = request?.actionScenarioId;
  phase3ActionScenarioSelect.value = scenarios.some((scenario) => scenario.scenarioId === previousId)
    ? previousId
    : scenarios.some((scenario) => scenario.scenarioId === requestedId)
      ? requestedId
      : scenarios[0]?.scenarioId ?? "";
}

function renderPhase3ProjectInputPreflight(sourceLabel = "") {
  const validation = phase3ReviewInputValidation;
  const input = validation.projectInput;
  const acceptance = input?.acceptance;
  if (phase3ProjectInputState) {
    phase3ProjectInputState.textContent = validation.ready ? "READY" : "BLOCKED";
    phase3ProjectInputState.dataset.state = validation.ready ? "ready" : "blocked";
    phase3ProjectInputState.title = sourceLabel;
  }
  if (phase3ProjectInputId) phase3ProjectInputId.textContent = input?.projectInputId && input?.inputStatus
    ? `${input.projectInputId} / ${input.inputStatus}`
    : input
      ? "Not recognised"
      : "Not loaded";
  if (phase3ProjectInputAcceptance) phase3ProjectInputAcceptance.textContent = acceptance
    ? `${acceptance.status} / ${acceptance.reviewedBy}`
    : "Not available";
  if (phase3ProjectInputCoverage) {
    const coverage = validation.coverage;
    phase3ProjectInputCoverage.textContent = coverage
      ? `${coverage.scenarios} scenarios / ${coverage.terrain} terrain / ${coverage.topography} topography`
      : "Not available";
  }
  if (phase3ProjectInputErrors) {
    phase3ProjectInputErrors.replaceChildren();
    for (const error of validation.errors) {
      const item = document.createElement("li");
      item.textContent = error;
      phase3ProjectInputErrors.appendChild(item);
    }
    phase3ProjectInputErrors.hidden = validation.errors.length === 0;
  }
  if (runPhase3ReviewButton) runPhase3ReviewButton.disabled = phase3ReviewIsSolving || !validation.ready;
  if (phase3ActionScenarioSelect) phase3ActionScenarioSelect.disabled = phase3ReviewIsSolving || !validation.ready;
}

function invalidatePhase3ReviewResult() {
  phase3ReviewData = null;
  analysisResultSetIds["phase3-review"] = null;
  if (activeAnalysisMode === "phase3-review") activateAnalysisResult("phase2", phase2ResultData);
}

function setPhase3ReviewRequest(request, sourceLabel) {
  phase3ReviewRequest = request;
  phase3ReviewInputValidation = phase3ProjectInputPreflight(request);
  populatePhase3ActionScenarios(request);
  invalidatePhase3ReviewResult();
  renderPhase3ProjectInputPreflight(sourceLabel);
  resetPhase3ReviewSummary();
  setPhase3ReviewState(
    phase3ReviewInputValidation.ready ? "ready" : "blocked",
    phase3ReviewInputValidation.ready ? `${phase3ActionScenario()?.verificationCaseId ?? "Phase 3A"} / ready` : "Project input blocked",
    phase3ReviewInputValidation.ready ? "" : phase3ReviewInputValidation.errors[0]
  );
}

function normalisePhase3ReviewDocument(documentData) {
  if (documentData?.projectInput) return cloneJson(documentData);
  const projectInput = cloneJson(documentData);
  return {
    schemaVersion: "0.5.0-review",
    requestId: "P3-WEB-IMPORT-001",
    mode: "mapped_action_review",
    modelId: projectInput?.modelId,
    actionScenarioId: projectInput?.actionScenarios?.[0]?.scenarioId,
    projectInput,
  };
}

async function loadPhase3DemoRequest() {
  try {
    const response = await fetch("./examples/phase3-review-request-demo.json", { cache: "no-cache" });
    if (!response.ok) throw new Error(`Review request returned HTTP ${response.status}`);
    setPhase3ReviewRequest(await response.json(), "Controlled demo fixture");
  } catch (error) {
    setPhase3ReviewRequest(null, "Demo fixture unavailable");
    setPhase3ReviewState("blocked", "Project input blocked", error.message);
  }
}

async function importPhase3ProjectInput() {
  const file = phase3ProjectInputFile?.files?.[0];
  if (!file) return;
  try {
    const parsed = JSON.parse(await file.text());
    setPhase3ReviewRequest(normalisePhase3ReviewDocument(parsed), file.name);
  } catch (error) {
    setPhase3ReviewRequest(null, file.name);
    setPhase3ReviewState("blocked", "Project input blocked", `Unable to read JSON: ${error.message}`);
  } finally {
    phase3ProjectInputFile.value = "";
  }
}

function resetPhase3ReviewSummary() {
  const scenario = phase3ActionScenario();
  const selected = phase3ActionScenarioSelect?.selectedOptions[0];
  const combination = scenario?.combination
    ? `${scenario.combination.expression} / ${scenario.combination.id}`
    : "W only / no combination";
  const mount = scenario?.mount
    ? `${scenario.mount.mountId} / rigid transfer / capacity not performed`
    : scenario?.verificationCaseId === "WIND-M02"
      ? "Inside tower / no mount transfer"
      : "Not applicable";

  labels.phase3ReviewReleaseStatus.textContent = "Not run";
  labels.phase3ReviewReleaseStatus.classList.remove("is-review-required");
  labels.phase3ReviewProjectInput.textContent = "Not loaded";
  labels.phase3ReviewInputAcceptance.textContent = "Not loaded";
  labels.phase3ReviewActionScenario.textContent = selected?.textContent ?? "--";
  labels.phase3ReviewCombination.textContent = combination;
  labels.phase3ReviewMount.textContent = mount;
  labels.phase3ReviewAdapter.textContent = "phase3-mapped-action-review";
  labels.phase3ReviewDirection.textContent = "--";
  labels.phase3ReviewMappingResidual.textContent = "--";
  labels.phase3ReviewStructuralResidual.textContent = "--";
  setHashLabel(labels.phase3ReviewInputHash, null);
  setHashLabel(labels.phase3ReviewSourceHash, null);
  setHashLabel(labels.phase3ReviewResultHash, null);
  labels.phase3ReviewBoundary.textContent = "No project-input package loaded. Release authority remains withheld.";
}

function renderPhase3ReviewSummary(data = phase3ReviewData) {
  if (!phase3ReviewDetailSection) return;
  const isReviewResult = data?.adapter?.id === "phase3-mapped-action-review";
  if (!isReviewResult) return;
  const activeSet = data.resultSets?.find((item) => item.id === activeResultSetId) ?? data.resultSets?.[0];
  const windCase = activeSet?.loadCases?.find((item) => item.actionCategoryId === "W")
    ?? activeSet?.loadCases?.[0];
  const calculation = windCase?.windCalculation;
  const sourceDirection = activeSet?.windDirectionDeg ?? calculation?.towerDirectionDegTrueNorth;
  const downwindDirection = calculation?.downwindDirectionDegTrueNorth;
  const mapping = data.mappingSummary ?? {};
  const input = data.inputSummary ?? {};
  const acceptance = input.acceptance ?? {};
  const scenario = data.actionScenario ?? input.actionScenario ?? {};
  const combination = activeSet?.loadCombination;

  labels.phase3ReviewReleaseStatus.textContent = data.releaseStatus ?? "--";
  labels.phase3ReviewReleaseStatus.classList.toggle(
    "is-review-required",
    data.releaseStatus === "REVIEW_REQUIRED"
  );
  labels.phase3ReviewProjectInput.textContent = `${input.projectInputId ?? "--"} / ${input.inputStatus ?? "--"}`;
  labels.phase3ReviewInputAcceptance.textContent = `${acceptance.status ?? "--"} / ${acceptance.reviewedBy ?? "--"} / ${acceptance.reviewDate ?? "--"}`;
  labels.phase3ReviewActionScenario.textContent = `${scenario.verificationCaseId ?? "--"} / ${scenario.title ?? scenario.mappingMode ?? "--"}`;
  labels.phase3ReviewCombination.textContent = combination
    ? `${combination.expression} / ${combination.id}`
    : "W only / no combination";
  labels.phase3ReviewMount.textContent = scenario.mountId
    ? `${scenario.mountId} / rigid transfer / capacity not performed`
    : scenario.verificationCaseId === "WIND-M02"
      ? "Inside tower / no mount transfer"
      : "Not applicable";
  labels.phase3ReviewAdapter.textContent = `${data.adapter.id} / ${data.adapter.version}`;
  labels.phase3ReviewDirection.textContent = `${formatDirectionDeg(sourceDirection)} source / ${formatDirectionDeg(downwindDirection)} force`;
  labels.phase3ReviewMappingResidual.textContent = `dF ${Number(mapping.maximumMappingForceDifferenceN ?? 0).toExponential(2)} N / dM ${Number(mapping.maximumMappingMomentDifferenceNm ?? 0).toExponential(2)} N.m`;
  labels.phase3ReviewStructuralResidual.textContent = `dF ${Number(mapping.maximumStructuralForceResidualKN ?? 0).toExponential(2)} kN / dM ${Number(mapping.maximumStructuralMomentResidualKNm ?? 0).toExponential(2)} kN.m`;
  setHashLabel(labels.phase3ReviewInputHash, data.inputHashSha256);
  setHashLabel(labels.phase3ReviewSourceHash, data.sourceHashSha256);
  setHashLabel(labels.phase3ReviewResultHash, data.resultHashSha256);
  labels.phase3ReviewBoundary.textContent = `${phase3LoadingScopeNote(data)}. ${
    isPhase3ProjectInputReview(data)
      ? "Reviewed inline project inputs; engineering release authority remains withheld."
      : "Synthetic verification; approved project inputs and release authority remain excluded."
  }`;
}

function activateAnalysisResult(mode, data) {
  if (!data) return;
  if (activeResultSetId) analysisResultSetIds[activeAnalysisMode] = activeResultSetId;
  activeAnalysisMode = mode;
  resultSourceData = data;
  populateResultSetSelect(resultSourceData);
  const preferredId = analysisResultSetIds[mode];
  const nextResultSet = resultSourceData.resultSets?.find((item) => item.id === preferredId)
    ?? resultSourceData.resultSets?.[0];
  updateAnalysisModeControls();
  setActiveResultSet(nextResultSet?.id);
}

function setPhase3ReviewState(state, message, errorMessage = "") {
  phase3ReviewIsSolving = state === "solving";
  if (labels.phase3ReviewCommandStatus) labels.phase3ReviewCommandStatus.textContent = message;
  if (importPhase3ProjectInputButton) importPhase3ProjectInputButton.disabled = phase3ReviewIsSolving;
  if (resetPhase3ProjectInputButton) resetPhase3ProjectInputButton.disabled = phase3ReviewIsSolving;
  renderPhase3ProjectInputPreflight(phase3ProjectInputState?.title ?? "");
  if (solveError) {
    solveError.hidden = !errorMessage;
    solveError.textContent = errorMessage;
  }
}

async function runPhase3Review() {
  if (!phase3ReviewInputValidation.ready || !phase3ReviewRequest) {
    setPhase3ReviewState("blocked", "Project input blocked", phase3ReviewInputValidation.errors[0]);
    return;
  }
  setPhase3ReviewState("solving", "Running mapped review...");
  try {
    const request = cloneJson(phase3ReviewRequest);
    request.actionScenarioId = phase3ActionScenarioSelect?.value ?? request.actionScenarioId;
    const response = await fetch("./api/solve-phase3-review", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(request),
    });
    const isJson = response.headers.get("content-type")?.includes("application/json");
    const payload = isJson ? await response.json() : null;
    if (!response.ok) {
      const detail = payload?.errors?.[0] ?? payload?.error ?? `Phase 3 review returned HTTP ${response.status}`;
      throw new Error(detail);
    }
    phase3ReviewData = payload;
    activateAnalysisResult("phase3-review", phase3ReviewData);
    renderPhase3ReviewSummary(phase3ReviewData);
    const solveMs = response.headers.get("X-TowerFlow-Solve-Ms");
    const timing = solveMs ? ` / ${solveMs} ms` : "";
    setPhase3ReviewState(
      "success",
      `${phase3ReviewData.adapter?.verificationCaseId ?? "Phase 3A"} / ${phase3ReviewData.resultSets?.length ?? 1} directions${timing}`
    );
    setWorkspaceView("results");
  } catch (error) {
    setPhase3ReviewState("error", "Review unavailable", error.message);
    setWorkspaceView("solve");
  }
}

function renderLoads(data, nodes) {
  const loading = activeLoading(data);
  const loads = loading?.loads ?? [];
  const maxLoadMagnitude = Math.max(...loads.map((load) => loadVector(load).length()), 0);
  const labelledLoads = representativeLoadLabels(loads, nodes);
  for (const load of loads) {
    addLoadArrow(load, nodes, maxLoadMagnitude, labelledLoads.has(load));
  }

  const loadDirection = loads.length > 0 ? formatLoadDirection(loads[0]) : "--";
  const analysisDirection = data.windDirectionDeg ?? loading?.windDirectionDeg;
  const directionLabel = analysisDirection !== undefined ? formatDirectionDeg(analysisDirection) : loadDirection;
  labels.activeLoadDirection.textContent = directionLabel;
}

function representativeLoadLabels(loads, nodes) {
  if (loads.length <= 10) return new Set(loads);
  const groups = new Map();
  for (const load of loads) {
    const category = load.actionCategoryId ?? "OTHER";
    const group = groups.get(category) ?? [];
    group.push(load);
    groups.set(category, group);
  }

  const selected = new Set();
  const maximumPerCategory = 6;
  for (const group of groups.values()) {
    const sorted = [...group].sort((first, second) => {
      const firstNode = nodes.get(first.nodeId);
      const secondNode = nodes.get(second.nodeId);
      return Number(firstNode?.z ?? 0) - Number(secondNode?.z ?? 0);
    });
    if (sorted.length <= maximumPerCategory) {
      for (const load of sorted) selected.add(load);
      continue;
    }
    for (let index = 0; index < maximumPerCategory; index += 1) {
      const position = Math.round(index * (sorted.length - 1) / (maximumPerCategory - 1));
      selected.add(sorted[position]);
    }
  }
  return selected;
}

function maxDisplacement(nodes) {
  return nodes.reduce(
    (maxValue, node) => {
      const displacement = node.displacementM ?? {};
      const ux = Number(displacement.ux ?? 0);
      const uy = Number(displacement.uy ?? 0);
      const uz = Number(displacement.uz ?? 0);
      const magnitude = Math.hypot(ux, uy, uz);
      return magnitude > maxValue.magnitude
        ? { nodeId: node.id, magnitude, ux, uy, uz }
        : maxValue;
    },
    { nodeId: "--", magnitude: 0, ux: 0, uy: 0, uz: 0 }
  );
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
  if (supportNote) {
    supportNote.textContent = preset === "pinned"
      ? "Display matches the analysis restraints. Rotations are not solver DOF."
      : "Display preview only. The Phase 2 solver remains pinned UXYZ at the three base nodes.";
  }
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
        input.title = "Rotational DOF are shown for 6DOF context but are not active in the Phase 2 truss solver.";
      }
      input.addEventListener("change", () => {
        support[component] = input.checked;
        if (supportPreset) supportPreset.value = "custom";
        if (supportNote) supportNote.textContent = "Display preview only. The Phase 2 solver remains pinned UXYZ at the three base nodes.";
        renderSupportMarkers();
      });
      label.appendChild(input);
      label.append(component.toUpperCase());
      row.appendChild(label);
    }
    supportTable.appendChild(row);
  }
}

function setLoadingView(viewName) {
  activeLoadingView = loadingTabButtons.some((button) => button.dataset.loadingTab === viewName)
    ? viewName
    : "cases";
  for (const button of loadingTabButtons) {
    const isActive = button.dataset.loadingTab === activeLoadingView;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-selected", String(isActive));
  }
  for (const view of loadingViews) view.hidden = view.dataset.loadingView !== activeLoadingView;
  for (const section of loadingOwnedSections) {
    section.hidden = activeWorkspace !== "loads" || section.dataset.loadingOwner !== activeLoadingView;
  }
}

function selectedCombinationSituationIds() {
  return combinationSituationInputs.filter((input) => input.checked).map((input) => input.value);
}

function syncCombinationSelection(selectedIds = selectedCombinationSituationIds()) {
  const selected = new Set(selectedIds);
  for (const input of combinationSituationInputs) input.checked = selected.has(input.value);
  if (combinationSelectAll) {
    combinationSelectAll.checked = selected.size === combinationSituationInputs.length;
    combinationSelectAll.indeterminate = selected.size > 0 && selected.size < combinationSituationInputs.length;
  }
  if (labels.solveCombinationCount) labels.solveCombinationCount.textContent = `${selected.size}`;
  if (labels.solveDirectionCount) labels.solveDirectionCount.textContent = "8";
  if (labels.solveCaseCount) labels.solveCaseCount.textContent = `${selected.size * 8}`;
  updateSolveReadiness();
}

function formatSourceCaseTotal(loadCase) {
  if (!loadCase) return "Solve required for source-case values";
  const loads = loadCase.loads ?? [];
  const total = loads.reduce((sum, load) => ({
    x: sum.x + Number(load.fxKN ?? 0),
    y: sum.y + Number(load.fyKN ?? 0),
    z: sum.z + Number(load.fzKN ?? 0),
  }), { x: 0, y: 0, z: 0 });
  return `${loads.length} loads / ΣF [${total.x.toFixed(2)}, ${total.y.toFixed(2)}, ${total.z.toFixed(2)}] kN`;
}

function loadActionCategory(load) {
  const declared = String(load?.actionCategoryId ?? "").toUpperCase();
  if (["G", "W", "Q"].includes(declared)) return declared;
  const descriptor = `${load?.id ?? ""} ${load?.type ?? ""}`.toUpperCase();
  if (descriptor.includes("WIND")) return "W";
  if (["GRAV", "SELF-WEIGHT", "PERMANENT"].some((token) => descriptor.includes(token))) return "G";
  return null;
}

function sourceCaseForCategory(resultSet, categoryId, fallbackId) {
  const loads = (resultSet?.loadCases ?? [])
    .flatMap((loadCase) => loadCase.loads ?? [])
    .filter((load) => loadActionCategory(load) === categoryId);
  if (loads.length === 0) return null;
  const declaredIds = [...new Set(loads.map((load) => load.sourceLoadCaseId).filter(Boolean))];
  return {
    id: declaredIds.length === 1 ? declaredIds[0] : fallbackId,
    actionCategoryId: categoryId,
    loads,
  };
}

function setLoadingCaseSummary(element, loadCase, stale) {
  if (!element) return;
  const summary = formatSourceCaseTotal(loadCase);
  element.textContent = stale ? "Last solve / STALE" : summary;
  element.title = stale ? `Previous result: ${summary}` : "";
  element.dataset.state = stale ? "stale" : "current";
}

function renderLoadingRegister(input, resultData) {
  const wind = input?.wind ?? {};
  const resultSets = resultData?.resultSets ?? [];
  const activeSet = resultSets.find((item) => item.id === activeResultSetId) ?? resultSets[0];
  const direction = activeSet?.windDirectionDeg ?? wind.directionsDeg?.[0] ?? 0;
  const directionId = String(Math.round(Number(direction))).padStart(3, "0");
  const permanentCase = activeSet?.loadCases?.find((loadCase) => loadCase.actionCategoryId === "G")
    ?? sourceCaseForCategory(activeSet, "G", "LC-G-01");
  const windCase = activeSet?.loadCases?.find((loadCase) => loadCase.actionCategoryId === "W")
    ?? sourceCaseForCategory(activeSet, "W", `LC-W-${directionId}`)
    ?? (resultData?.adapter?.id === "phase3-mapped-action-review" ? activeSet?.loadCases?.[0] : null);
  const permanentCaseId = permanentCase?.id ?? "LC-G-01";
  const windCaseId = windCase?.id ?? `LC-W-${directionId}`;
  const staleSolvedValues = phase2ResultsStale && resultData === phase2ResultData;
  if (loadingPermanentCaseId) loadingPermanentCaseId.textContent = permanentCaseId;
  setLoadingCaseSummary(loadingPermanentCaseTotal, permanentCase, staleSolvedValues);
  if (loadingWindCaseId) loadingWindCaseId.textContent = windCaseId;
  if (loadingWindCaseName) loadingWindCaseName.textContent = windCase?.name ?? `Wind from ${Number(direction).toFixed(0)} deg true North`;
  setLoadingCaseSummary(loadingWindCaseTotal, windCase, staleSolvedValues);
  if (loadingBoundary) {
    if (resultData?.adapter?.id === "phase3-mapped-action-review") {
      const scenario = resultData.actionScenario ?? {};
      loadingBoundary.textContent = phase3LoadingScopeNote(resultData);
      loadingBoundary.title = `${scenario.verificationCaseId ?? "Phase 3A"}; REVIEW_REQUIRED.`;
    } else {
      loadingBoundary.textContent = "Preliminary AS/NZS 1170.0 G/W set. Q and unentered G are excluded.";
      loadingBoundary.title = resultData?.loading?.combinationDefinition?.boundary
        ?? "Tower-member weight is source-derived; ancillary weights are user-defined. Q and unentered permanent items are not modelled.";
    }
  }
}

function setModelValidationLabel(label, state, detail = state) {
  if (!label) return;
  label.textContent = detail;
  label.dataset.state = state.toLowerCase();
}

function renderModelSummary(data) {
  const input = resultSourceData?.inputSummary ?? data?.inputSummary ?? {};
  const towerReference = data?.towerReference ?? resultSourceData?.towerReference ?? {};
  const nodes = data?.nodes ?? [];
  const members = data?.members ?? [];
  const supports = data?.supports ?? [];
  const nodeIds = new Set(nodes.map((node) => node.id));
  const sectionDesignations = new Set(members.map((member) => member.sectionDesignation).filter(Boolean));
  const memberGroups = new Set(members.map((member) => member.group).filter(Boolean));
  const elasticModuli = new Set(members.map((member) => Number(member.elasticModulusKPa)).filter(Number.isFinite));
  const memberAreas = new Set(members.map((member) => Number(member.areaM2)).filter(Number.isFinite));
  const modelId = towerReference.id ?? input?.tower?.seedId ?? "--";
  const seedMatches = !input?.tower?.seedId || input.tower.seedId === modelId;
  const identityComplete = modelId !== "--" && seedMatches;
  const revision = resultSourceData?.drawingIdentity?.geometryHashSha256
    ?? towerReference.revision
    ?? null;
  const topologyPass = nodes.length > 0
    && members.length > 0
    && members.every((member) => nodeIds.has(member.startNodeId) && nodeIds.has(member.endNodeId));
  const propertiesComplete = members.length > 0 && members.every((member) =>
    Boolean(member.sectionDesignation)
      && Number(member.areaM2) > 0
      && Number(member.elasticModulusKPa) > 0
  );
  const simplifiedProperties = sectionDesignations.size > 1 && memberAreas.size === 1;
  const propertiesPass = propertiesComplete && !simplifiedProperties;
  const restraintsPass = supports.length > 0 && supports.every((support) =>
    nodeIds.has(support.nodeId) && support.ux && support.uy && support.uz
  );
  const blocked = !identityComplete || !topologyPass || !propertiesComplete || !restraintsPass;
  const reviewRequired = !revision || !propertiesPass;
  const state = blocked ? "blocked" : reviewRequired ? "review" : "pass";
  const reviewNotes = [];
  if (!revision) reviewNotes.push("Model revision is not declared.");
  if (simplifiedProperties) {
    reviewNotes.push(sectionDesignations.size + " named sections currently share " + memberAreas.size + " analysis area value; verify section geometry and material records before engineering use.");
  }

  labels.caseTitle.textContent = towerReference.name ?? data?.title ?? "Current model";
  labels.modelId.textContent = modelId;
  labels.modelSchema.textContent = input?.schemaVersion ?? data?.schemaVersion ?? "--";
  labels.modelRevision.textContent = revision ? compactHash(revision) : "Not declared";
  labels.modelRevision.title = revision ?? "";
  labels.modelUnits.textContent = (data?.units?.length ?? "m") + " / " + (data?.units?.force ?? "kN") + " / SI";
  labels.modelHeight.textContent = Number.isFinite(Number(input?.tower?.heightM))
    ? Number(input.tower.heightM).toFixed(2) + " m"
    : "--";
  labels.modelGroupCount.textContent = memberGroups.size + " groups / " + members.length + " assignments";
  labels.modelSectionCount.textContent = sectionDesignations.size + " named sections";
  labels.modelMaterial.textContent = elasticModuli.size === 1
    ? "Linear elastic / E = " + (Number([...elasticModuli][0]) / 1e6).toFixed(0) + " GPa"
    : elasticModuli.size + " elastic-property sets";
  labels.modelPropertySource.textContent = towerReference.manufacturerReference
    ? "Audit-sheet-derived demo assignments"
    : "Source record not declared";
  labels.modelSupportBasis.textContent = supports.length + " nodes / Ux Uy Uz restrained";

  labels.modelValidationState.dataset.state = state;
  labels.modelValidationTitle.textContent = state.toUpperCase();
  labels.modelValidationSummary.textContent = blocked
    ? "Model checks contain blocking errors"
    : reviewRequired
      ? "Model records require review"
      : "Model checks complete";
  setModelValidationLabel(
    labels.modelValidationIdentity,
    identityComplete ? revision ? "pass" : "review" : "blocked"
  );
  setModelValidationLabel(labels.modelValidationTopology, topologyPass ? "pass" : "blocked");
  setModelValidationLabel(
    labels.modelValidationProperties,
    propertiesComplete ? propertiesPass ? "pass" : "review" : "blocked"
  );
  setModelValidationLabel(labels.modelValidationRestraints, restraintsPass ? "pass" : "blocked");
  labels.modelValidationNote.textContent = blocked
    ? "Resolve blocked model records before analysis."
    : reviewNotes.length > 0
      ? reviewNotes.join(" ")
      : "Model topology, properties and translational restraints are internally complete.";
}

function updateInputSummary(data) {
  const isPhase3Review = resultSourceData?.adapter?.id === "phase3-mapped-action-review";
  const input = isPhase3Review
    ? resultSourceData?.inputSummary ?? data.inputSummary
    : solverInputDraft ?? resultSourceData?.inputSummary ?? data.inputSummary;
  const selectedCombinationCount = selectedCombinationSituationIds().length;
  if (labels.solveDirectionCount) labels.solveDirectionCount.textContent = "8";
  if (labels.solveCombinationCount) labels.solveCombinationCount.textContent = `${selectedCombinationCount}`;
  if (labels.solveCaseCount) labels.solveCaseCount.textContent = `${selectedCombinationCount * 8}`;
  renderLoadingRegister(input, resultSourceData);

  const activeSituation = towerData?.loadCombination?.designSituation;
  const calculation = resultSourceData?.windCalculations?.[activeSituation]
    ?? resultSourceData?.windCalculation
    ?? data.windCalculation;
  if (windCalculationSummary) windCalculationSummary.hidden = !calculation;
  if (calculation) {
    const summarySpeeds = calculation.directionSummaries?.map((item) => Number(item.designWindSpeedMps)) ?? [];
    const sectionSpeeds = calculation.directionResults?.flatMap((direction) =>
      (direction.sections ?? []).map((section) => Number(section.designWindSpeedMps))) ?? [];
    const speeds = [...summarySpeeds, ...sectionSpeeds].filter(Number.isFinite);
    const firstSection = calculation.directionResults?.[0]?.sections?.[0];
    const firstSource = Object.values(firstSection?.siteWindSpeedBySourceDirection ?? {})[0];
    const regionalSpeed = calculation.regionalWindSpeedMps ?? firstSource?.regionalWindSpeedMps;
    labels.calculatedRegionalSpeed.textContent = Number.isFinite(Number(regionalSpeed))
      ? `${Number(regionalSpeed).toFixed(1)} m/s`
      : "--";
    labels.calculatedDesignSpeedRange.textContent = speeds.length > 0
      ? `${Math.min(...speeds).toFixed(1)}-${Math.max(...speeds).toFixed(1)} m/s`
      : "--";
    labels.calculatedWindStatus.textContent = isPhase3Review
      ? `${calculation.status ?? "--"} / synthetic / review required`
      : "Preliminary / manual TC + Mt";
  }
}

function cloneJson(value) {
  return JSON.parse(JSON.stringify(value));
}

function setSolveState(state, message, errorMessage = "") {
  if (!solverForm) return;
  solverForm.dataset.state = state;
  if (solveConsole) solveConsole.dataset.state = state;
  if (solveStatus) solveStatus.textContent = message;
  updateSolveReadiness();
  if (solveError) {
    solveError.hidden = !errorMessage;
    solveError.textContent = errorMessage;
  }
}

function commitEquipmentEditor() {
  const equipment = solverInputDraft?.equipment?.[activeEquipmentIndex];
  if (!equipment) return;
  const height = solveEquipmentHeight?.valueAsNumber;
  const area = solveEquipmentArea?.valueAsNumber;
  const weight = solveEquipmentWeight?.valueAsNumber;
  if (Number.isFinite(height)) equipment.mountingHeightM = height;
  if (Number.isFinite(area)) equipment.projectedAreaM2 = area;
  if (Number.isFinite(weight)) equipment.weightKg = weight;
}

function syncEquipmentEditor(index) {
  const equipment = solverInputDraft?.equipment?.[index];
  const fields = [solveEquipmentHeight, solveEquipmentArea, solveEquipmentWeight];
  for (const field of fields) {
    if (field) field.disabled = !equipment;
  }
  if (!equipment) {
    for (const field of fields) {
      if (field) field.value = "";
    }
    return;
  }

  activeEquipmentIndex = index;
  solveEquipmentHeight.value = String(equipment.mountingHeightM);
  solveEquipmentArea.value = String(equipment.projectedAreaM2);
  solveEquipmentWeight.value = String(equipment.weightKg);
}

function setPermanentItemFieldsEnabled(enabled) {
  for (const field of [
    solvePermanentItemType,
    solvePermanentItemDistribution,
    solvePermanentItemWeight,
    solvePermanentItemAzimuth,
    solvePermanentPointElevation,
    solvePermanentBottomElevation,
    solvePermanentTopElevation,
  ]) {
    if (field) field.disabled = !enabled;
  }
  if (removePermanentItemButton) removePermanentItemButton.disabled = !enabled;
}

function updatePermanentDistributionFields(distribution = solvePermanentItemDistribution?.value) {
  const hasItem = activePermanentItemIndex >= 0;
  const isPoint = distribution === "point";
  if (permanentPointElevationField) permanentPointElevationField.hidden = !hasItem || !isPoint;
  if (permanentBottomElevationField) permanentBottomElevationField.hidden = !hasItem || isPoint;
  if (permanentTopElevationField) permanentTopElevationField.hidden = !hasItem || isPoint;
  if (solvePermanentPointElevation) solvePermanentPointElevation.required = hasItem && isPoint;
  if (solvePermanentBottomElevation) solvePermanentBottomElevation.required = hasItem && !isPoint;
  if (solvePermanentTopElevation) solvePermanentTopElevation.required = hasItem && !isPoint;
  if (solvePermanentPointElevation) solvePermanentPointElevation.disabled = !hasItem || !isPoint;
  if (solvePermanentBottomElevation) solvePermanentBottomElevation.disabled = !hasItem || isPoint;
  if (solvePermanentTopElevation) solvePermanentTopElevation.disabled = !hasItem || isPoint;
}

function commitPermanentItemEditor() {
  const item = solverInputDraft?.permanentItems?.[activePermanentItemIndex];
  if (!item) return;
  item.type = solvePermanentItemType.value;
  item.distribution = solvePermanentItemDistribution.value;
  const weight = solvePermanentItemWeight.valueAsNumber;
  const azimuth = solvePermanentItemAzimuth.valueAsNumber;
  if (Number.isFinite(weight)) item.totalWeightKg = weight;
  if (Number.isFinite(azimuth)) item.azimuthDeg = azimuth;
  if (item.distribution === "point") {
    const elevation = solvePermanentPointElevation.valueAsNumber;
    if (Number.isFinite(elevation)) item.pointElevationM = elevation;
    delete item.bottomElevationM;
    delete item.topElevationM;
  } else {
    const bottom = solvePermanentBottomElevation.valueAsNumber;
    const top = solvePermanentTopElevation.valueAsNumber;
    if (Number.isFinite(bottom)) item.bottomElevationM = bottom;
    if (Number.isFinite(top)) item.topElevationM = top;
    delete item.pointElevationM;
  }
}

function syncPermanentItemEditor(index) {
  const item = solverInputDraft?.permanentItems?.[index];
  activePermanentItemIndex = item ? index : -1;
  setPermanentItemFieldsEnabled(Boolean(item));
  if (!item) {
    for (const field of [solvePermanentItemWeight, solvePermanentItemAzimuth, solvePermanentPointElevation, solvePermanentBottomElevation, solvePermanentTopElevation]) {
      if (field) field.value = "";
    }
    updatePermanentDistributionFields();
    return;
  }
  solvePermanentItemType.value = item.type;
  solvePermanentItemDistribution.value = item.distribution;
  solvePermanentItemWeight.value = Number(item.totalWeightKg) > 0 ? String(item.totalWeightKg) : "";
  solvePermanentItemAzimuth.value = String(item.azimuthDeg ?? 0);
  solvePermanentPointElevation.value = item.pointElevationM ?? "";
  solvePermanentBottomElevation.value = item.bottomElevationM ?? "";
  solvePermanentTopElevation.value = item.topElevationM ?? "";
  updatePermanentDistributionFields(item.distribution);
}

function populatePermanentItemEditor(selectedIndex = 0) {
  if (!solverInputDraft || !solvePermanentItemSelect) return;
  solverInputDraft.permanentItems ??= [];
  const items = solverInputDraft.permanentItems;
  solvePermanentItemSelect.replaceChildren();
  if (items.length === 0) {
    const option = document.createElement("option");
    option.value = "-1";
    option.textContent = "No permanent items";
    solvePermanentItemSelect.appendChild(option);
    solvePermanentItemSelect.disabled = true;
    syncPermanentItemEditor(-1);
    return;
  }
  items.forEach((item, index) => {
    const option = document.createElement("option");
    option.value = String(index);
    option.textContent = `${item.id} / ${String(item.type).replaceAll("_", " ")}`;
    solvePermanentItemSelect.appendChild(option);
  });
  const nextIndex = Math.min(Math.max(selectedIndex, 0), items.length - 1);
  solvePermanentItemSelect.disabled = false;
  solvePermanentItemSelect.value = String(nextIndex);
  syncPermanentItemEditor(nextIndex);
}

function addPermanentItem() {
  if (!solverInputDraft) return;
  commitPermanentItemEditor();
  solverInputDraft.permanentItems ??= [];
  const existingIds = new Set(solverInputDraft.permanentItems.map((item) => item.id));
  let sequence = solverInputDraft.permanentItems.length + 1;
  while (existingIds.has(`permanent-${sequence}`)) sequence += 1;
  solverInputDraft.permanentItems.push({
    id: `permanent-${sequence}`,
    type: "ancillary_steel",
    distribution: "point",
    totalWeightKg: 0,
    azimuthDeg: 0,
    pointElevationM: Number(solverInputDraft.tower?.heightM ?? 50) / 2,
  });
  populatePermanentItemEditor(solverInputDraft.permanentItems.length - 1);
  solvePermanentItemWeight.focus();
  markPhase2ResultsModified();
}

function removePermanentItem() {
  const items = solverInputDraft?.permanentItems;
  if (!items || activePermanentItemIndex < 0) return;
  items.splice(activePermanentItemIndex, 1);
  populatePermanentItemEditor(Math.min(activePermanentItemIndex, items.length - 1));
  markPhase2ResultsModified();
}

function defaultAsWind(input) {
  const height = Number(input?.tower?.heightM ?? 50);
  return {
    method: "as_nzs_1170_2_2021",
    limitState: "ULS",
    designSituation: "ULS_WIND_STRENGTH",
    averageRecurrenceIntervalYears: 500,
    windRegion: "A1",
    trueNorthToGlobalXDeg: 0,
    directionsDeg: windDirectionRows.map((row) => Number(row.dataset.windDirection)),
    referenceHeightM: height,
    directionalSectors: windDirectionRows.map((row) => ({
      sourceDirectionDegTrueNorth: Number(row.dataset.windDirection),
      terrainCategory: 2.5,
      topographicMultiplier: 1,
    })),
  };
}

function updateCoastlineVisibility() {
  const requiresFraction = ["C", "D"].includes(solveWindRegion?.value);
  if (coastlineField) coastlineField.hidden = !requiresFraction;
  if (solveCoastlineFraction) solveCoastlineFraction.required = requiresFraction;
}

function commitWindEditor() {
  if (!solverInputDraft) return;
  const wind = solverInputDraft.wind ?? defaultAsWind(solverInputDraft);
  wind.method = "as_nzs_1170_2_2021";
  wind.windRegion = solveWindRegion.value;
  wind.averageRecurrenceIntervalYears = solveWindAri.valueAsNumber;
  const selectedSituations = selectedCombinationSituationIds();
  wind.designSituation = selectedSituations[0] ?? "ULS_WIND_STRENGTH";
  wind.limitState = LOADING_SITUATIONS[wind.designSituation].limitState;
  wind.trueNorthToGlobalXDeg = solveNorthAxis.valueAsNumber;
  wind.directionsDeg = windDirectionRows.map((row) => Number(row.dataset.windDirection));
  wind.directionalSectors = windDirectionRows.map((row) => ({
    sourceDirectionDegTrueNorth: Number(row.dataset.windDirection),
    terrainCategory: Number(row.querySelector("[data-wind-tc]").value),
    topographicMultiplier: row.querySelector("[data-wind-mt]").valueAsNumber,
  }));
  if (["C", "D"].includes(wind.windRegion)) {
    wind.coastlineFraction = solveCoastlineFraction.valueAsNumber;
  } else {
    delete wind.coastlineFraction;
  }
  delete wind.designWindSpeedMps;
  solverInputDraft.wind = wind;
}

function populateSolverControls(input) {
  if (!solverForm || !input) return;
  solverInputDraft = cloneJson(input);
  if (solverInputDraft.wind?.method !== "as_nzs_1170_2_2021") {
    solverInputDraft.wind = defaultAsWind(solverInputDraft);
  }
  const wind = solverInputDraft.wind;
  solveWindRegion.value = wind.windRegion ?? "A1";
  solveWindAri.value = String(wind.averageRecurrenceIntervalYears ?? 500);
  const selectedSituations = wind.designSituations
    ?? [wind.designSituation ?? (wind.limitState === "SLS" ? "SLS_WIND" : "ULS_WIND_STRENGTH")];
  syncCombinationSelection(selectedSituations);
  solveNorthAxis.value = String(wind.trueNorthToGlobalXDeg ?? 0);
  solveCoastlineFraction.value = String(wind.coastlineFraction ?? 1);
  const sectors = new Map((wind.directionalSectors ?? []).map((item) => [Number(item.sourceDirectionDegTrueNorth), item]));
  for (const row of windDirectionRows) {
    const sector = sectors.get(Number(row.dataset.windDirection));
    row.querySelector("[data-wind-tc]").value = String(sector?.terrainCategory ?? 2.5);
    row.querySelector("[data-wind-mt]").value = String(sector?.topographicMultiplier ?? 1);
  }
  updateCoastlineVisibility();
  solveEquipmentHeight.max = String(input.tower?.heightM ?? 80);
  solveEquipmentSelect.replaceChildren();

  const equipment = solverInputDraft.equipment ?? [];
  if (equipment.length === 0) {
    const option = document.createElement("option");
    option.textContent = "No equipment";
    option.value = "-1";
    solveEquipmentSelect.appendChild(option);
    solveEquipmentSelect.disabled = true;
    activeEquipmentIndex = -1;
    syncEquipmentEditor(-1);
  } else {
    equipment.forEach((item, index) => {
      const option = document.createElement("option");
      option.value = String(index);
      option.textContent = `${item.id} / ${String(item.type).replaceAll("_", " ")}`;
      solveEquipmentSelect.appendChild(option);
    });
    solveEquipmentSelect.disabled = false;
    activeEquipmentIndex = 0;
    solveEquipmentSelect.value = "0";
    syncEquipmentEditor(0);
  }

  const towerHeight = String(input.tower?.heightM ?? 80);
  solvePermanentPointElevation.max = towerHeight;
  solvePermanentBottomElevation.max = towerHeight;
  solvePermanentTopElevation.max = towerHeight;
  populatePermanentItemEditor(0);
  updateSolveReadiness();
}

function evaluateSolveReadiness() {
  const selectedCombinations = selectedCombinationSituationIds();
  const windRowsReady = windDirectionRows.length === 8 && windDirectionRows.every((row) => {
    const terrainCategory = Number(row.querySelector("[data-wind-tc]")?.value);
    const topographicMultiplier = Number(row.querySelector("[data-wind-mt]")?.value);
    return Number.isFinite(terrainCategory) && terrainCategory >= 1 && terrainCategory <= 4
      && Number.isFinite(topographicMultiplier) && topographicMultiplier > 0;
  });
  const coastlineReady = !["C", "D"].includes(solveWindRegion?.value)
    || (Number.isFinite(solveCoastlineFraction?.valueAsNumber)
      && solveCoastlineFraction.valueAsNumber >= 0
      && solveCoastlineFraction.valueAsNumber <= 1);
  const checks = {
    model: Boolean(solverInputDraft?.tower && towerData?.nodes?.length && towerData?.members?.length),
    loads: Boolean(solverInputDraft && Array.isArray(solverInputDraft.equipment) && Array.isArray(solverInputDraft.permanentItems ?? [])),
    combinations: selectedCombinations.length > 0,
    wind: Boolean(solveWindRegion?.value)
      && Number.isFinite(solveWindAri?.valueAsNumber)
      && solveWindAri.valueAsNumber > 0
      && coastlineReady
      && windRowsReady,
  };
  return { ready: Object.values(checks).every(Boolean), checks };
}

function updateSolveReadiness() {
  const readiness = evaluateSolveReadiness();
  for (const [key, ready] of Object.entries(readiness.checks)) {
    const label = readinessLabels[key];
    if (!label) continue;
    label.textContent = ready ? "READY" : "BLOCKED";
    label.dataset.state = ready ? "ready" : "blocked";
  }
  if (runSolveButton) {
    runSolveButton.disabled = !readiness.ready
      || solverForm?.dataset.state === "solving"
      || activeAnalysisMode === "phase3-review";
  }
  return readiness;
}

function initialiseSolveRunLog(situationIds) {
  if (!solveRunLogEntries) return;
  solveRunLogEntries.replaceChildren();
  for (const situationId of situationIds) {
    const row = document.createElement("div");
    row.dataset.situationId = situationId;
    row.dataset.state = "queued";
    const name = document.createElement("span");
    name.textContent = LOADING_SITUATIONS[situationId]?.label ?? situationId;
    const status = document.createElement("strong");
    status.textContent = "QUEUED";
    row.append(name, status);
    solveRunLogEntries.appendChild(row);
  }
  if (solveRunLogSummary) solveRunLogSummary.textContent = `${situationIds.length} combinations / ${situationIds.length * 8} cases`;
}

function updateSolveRunLog(situationId, state, detail) {
  const row = solveRunLogEntries?.querySelector(`[data-situation-id="${situationId}"]`);
  if (!row) return;
  row.dataset.state = state;
  const status = row.querySelector("strong");
  if (status) status.textContent = detail ?? state.toUpperCase();
}

function mergePhase2CombinationPayloads(payloads, situationIds) {
  const merged = cloneJson(payloads[0]);
  merged.resultSets = payloads.flatMap((payload) => payload.resultSets ?? []);
  merged.inputSummary.wind.designSituations = [...situationIds];
  merged.inputSummary.wind.designSituation = situationIds[0];
  merged.loading.activeDesignSituation = situationIds[0];
  merged.loading.activeDesignSituations = [...situationIds];
  merged.loading.loadCombinationRegister = payloads.flatMap(
    (payload) => payload.loading?.loadCombinationRegister ?? []
  );
  merged.loading.combinationDefinitions = Object.fromEntries(
    payloads.map((payload, index) => [situationIds[index], payload.loading?.combinationDefinition])
  );
  merged.envelopesByDesignSituation = Object.fromEntries(
    payloads.map((payload, index) => [situationIds[index], payload.envelope])
  );
  merged.windCalculations = Object.fromEntries(
    payloads.map((payload, index) => [situationIds[index], payload.windCalculation])
  );
  return merged;
}

async function runPhase2Solve(event) {
  event.preventDefault();
  if (!solverInputDraft || !solverForm) return;
  if (!solverForm.checkValidity()) {
    setSolveState("invalid", "Invalid input", "Check the highlighted parameter limits.");
    setWorkspaceView("loads");
    solverForm.reportValidity();
    return;
  }

  commitEquipmentEditor();
  commitPermanentItemEditor();
  commitWindEditor();
  const situationIds = selectedCombinationSituationIds();
  if (situationIds.length === 0) {
    setSolveState("invalid", "No combination selected", "Select at least one AS/NZS 1170.0 combination.");
    setWorkspaceView("loads");
    setLoadingView("combinations");
    return;
  }
  const previousResultSetId = activeAnalysisMode === "phase2"
    ? activeResultSetId
    : analysisResultSetIds.phase2;
  initialiseSolveRunLog(situationIds);
  const runStartedAt = performance.now();
  setSolveState("solving", `Solving ${situationIds.length} combination${situationIds.length === 1 ? "" : "s"} / 8 directions...`);

  try {
    const payloads = [];
    let totalSolveMs = 0;
    for (const situationId of situationIds) {
      updateSolveRunLog(situationId, "running", "RUNNING");
      const requestInput = cloneJson(solverInputDraft);
      delete requestInput.wind.designSituations;
      requestInput.wind.designSituation = situationId;
      requestInput.wind.limitState = LOADING_SITUATIONS[situationId].limitState;
      const response = await fetch("./api/solve", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(requestInput),
      });
      const isJson = response.headers.get("content-type")?.includes("application/json");
      const payload = isJson ? await response.json() : null;
      if (!response.ok) {
        const detail = payload?.errors?.[0] ?? payload?.error ?? `Solver API returned HTTP ${response.status}`;
        updateSolveRunLog(situationId, "failed", "FAILED");
        throw new Error(`${situationId}: ${detail}`);
      }
      payloads.push(payload);
      updateSolveRunLog(situationId, "complete", `${payload?.resultSets?.length ?? 8} CASES`);
      totalSolveMs += Number(response.headers.get("X-TowerFlow-Solve-Ms") ?? 0);
    }

    phase2ResultData = mergePhase2CombinationPayloads(payloads, situationIds);
    phase2ResultsStale = false;
    analysisResultSetIds.phase2 = previousResultSetId;
    populateSolverControls(phase2ResultData.inputSummary);
    activateAnalysisResult("phase2", phase2ResultData);
    const timing = totalSolveMs > 0 ? ` / ${Math.round(totalSolveMs)} ms` : "";
    if (solveRunLogSummary) {
      solveRunLogSummary.textContent = `${situationIds.length} combinations / ${phase2ResultData.resultSets.length} cases / ${Math.round(performance.now() - runStartedAt)} ms`;
    }
    setSolveState("success", `Solved ${situationIds.length} combination${situationIds.length === 1 ? "" : "s"} / ${phase2ResultData.resultSets.length} cases${timing}`);
    setWorkspaceView("results");
  } catch (error) {
    if (solveRunLog) solveRunLog.open = true;
    if (solveRunLogSummary) solveRunLogSummary.textContent = "Run failed";
    setSolveState("error", "Solve failed", error.message);
    setWorkspaceView("solve");
  }
}

function populateResultSetSelect(data) {
  const resultSets = data.resultSets ?? [];
  const preferredResult = resultSets.find((item) => item.id === activeResultSetId) ?? resultSets[0];

  if (resultCombinationSelect) {
    resultCombinationSelect.replaceChildren();
    const combinations = new Map();
    for (const resultSet of resultSets) {
      const key = resultCombinationKey(resultSet);
      if (!combinations.has(key)) combinations.set(key, resultCombinationLabel(resultSet));
    }
    if (combinations.size === 0) combinations.set("static", "Static result");
    for (const [key, label] of combinations) {
      const option = document.createElement("option");
      option.value = key;
      option.textContent = label;
      resultCombinationSelect.appendChild(option);
    }
    resultCombinationSelect.value = preferredResult ? resultCombinationKey(preferredResult) : "static";
    resultCombinationSelect.disabled = combinations.size <= 1;
  }

  populateResultDirectionSelect(resultSets, preferredResult);

  if (drawingResultSetSelect) {
    drawingResultSetSelect.replaceChildren();
    if (resultSets.length === 0) {
      const option = document.createElement("option");
      option.value = "static";
      option.textContent = "Static result";
      drawingResultSetSelect.appendChild(option);
    } else {
      for (const resultSet of resultSets) {
        const option = document.createElement("option");
        option.value = resultSet.id;
        option.textContent = resultSetLabel(resultSet);
        drawingResultSetSelect.appendChild(option);
      }
    }
    drawingResultSetSelect.disabled = resultSets.length <= 1;
  }
}

function populateResultDirectionSelect(resultSets, preferredResult) {
  if (!resultDirectionSelect) return;
  resultDirectionSelect.replaceChildren();
  const combinationKey = preferredResult
    ? resultCombinationKey(preferredResult)
    : resultCombinationSelect?.value;
  const directionalResults = resultSetsForCombination(resultSets, combinationKey);
  if (directionalResults.length === 0) {
    const option = document.createElement("option");
    option.value = "static";
    option.textContent = "Static result";
    resultDirectionSelect.appendChild(option);
    resultDirectionSelect.disabled = true;
    return;
  }
  for (const resultSet of directionalResults) {
    const option = document.createElement("option");
    option.value = resultSet.id;
    option.textContent = formatDirectionDeg(resultSet.windDirectionDeg);
    resultDirectionSelect.appendChild(option);
  }
  resultDirectionSelect.value = directionalResults.some((item) => item.id === preferredResult?.id)
    ? preferredResult.id
    : directionalResults[0].id;
  resultDirectionSelect.disabled = directionalResults.length <= 1;
}

function setActiveResultSet(resultSetId) {
  const resultSets = resultSourceData?.resultSets ?? [];
  if (resultSets.length === 0) {
    towerData = resultSourceData;
    renderTower(towerData);
    return;
  }

  const resultSet = resultSets.find((item) => item.id === resultSetId) ?? resultSets[0];
  activeResultSetId = resultSet.id;
  analysisResultSetIds[activeAnalysisMode] = activeResultSetId;
  if (resultCombinationSelect) resultCombinationSelect.value = resultCombinationKey(resultSet);
  populateResultDirectionSelect(resultSets, resultSet);
  if (drawingResultSetSelect) drawingResultSetSelect.value = activeResultSetId;
  towerData = buildActiveTowerData(resultSourceData, resultSet);
  renderTower(towerData);
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
  updateModelBounds();
  renderLoads(data, nodes);
  renderReactions(data, nodes);
  renderDeformedShape(data, nodes);
  addGlobalOriginAxes();
  setCameraView(activeView);

  const loading = activeLoading(data);
  const activeLoadCaseId = loading?.id ?? "LC1";
  const activeResultLabel = data.activeResultSet ? resultSetLabel(data.activeResultSet) : activeLoadCaseId;
  labels.caseTitle.textContent = data.title;
  labels.activeScenario.textContent = data.scenario?.id ?? data.caseId ?? "Demo Tower";
  labels.activeResultContext.textContent = activeResultLabel;
  labels.activeLoadCase.textContent = activeLoadCaseId;
  if (labels.activeLoadingKind) labels.activeLoadingKind.textContent = data.loadCombination ? "Combination" : "Load Case";
  labels.panelLoadCase.textContent = activeLoadCaseId;
  labels.nodeCount.textContent = String(data.nodes.length);
  labels.memberCount.textContent = String(data.members.length);
  const displacement = maxDisplacement(data.nodes ?? []);
  renderDisplacementSummary(data);
  labels.kpiMaxAxial.textContent = `${maxAbsForce.toFixed(2)} kN`;
  labels.kpiMaxDisplacement.textContent = `${displacement.magnitude.toFixed(4)} m`;
  const maxReaction = Math.abs(Number(data.checks?.maxReaction?.valueKN ?? 0));
  labels.kpiMaxReaction.textContent = `${maxReaction.toFixed(2)} kN`;
  labels.kpiForceBalance.textContent = formatMaxForceBalance(data.checks);
  renderModelSummary(data);
  updateInputSummary(data);
  updateSolveReadiness();
  renderPhase3ReviewSummary(resultSourceData);
  updateEnvelopeSummary(data);
  applyDisplayMode();
  labels.activeResultType.textContent = {
    member_axial: "Member Axial",
    support_reaction: "Support Reaction",
    nodal_displacement: "Nodal Displacement",
  }[activeResultQuantity];
  renderResultReview(data);
  const acceptanceResultSet = data.activeResultSet
    ?? resultSourceData?.resultSets?.find((item) => item.id === activeResultSetId)
    ?? resultSourceData?.resultSets?.[0];
  publishPhase3AcceptanceSnapshot(resultSourceData, acceptanceResultSet);
  if (activeWorkspace === "drawings") renderDrawing();
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

function restoreSelectedVisual() {
  if (!selectedObject) return;
  if (selectedObject.userData.member) {
    selectedObject.material.color.copy(currentMemberColour(selectedObject.userData.member));
  } else if (selectedObject.userData.baseColour) {
    selectedObject.material.color.copy(selectedObject.userData.baseColour);
  }
  if (selectedObject.userData.member) {
    const scale = currentMemberScale(selectedObject.userData.member);
    selectedObject.scale.set(scale, 1, scale);
  } else if (selectedObject.userData.baseScale) {
    selectedObject.scale.copy(selectedObject.userData.baseScale);
  }
  if (selectedObject.material.emissive && selectedObject.userData.baseEmissive) {
    selectedObject.material.emissive.copy(selectedObject.userData.baseEmissive);
    selectedObject.material.emissiveIntensity = selectedObject.userData.baseEmissiveIntensity;
  }
  selectedObject.material.depthTest = selectedObject.userData.baseDepthTest;
  selectedObject.material.depthWrite = selectedObject.userData.baseDepthWrite;
  selectedObject.renderOrder = selectedObject.userData.baseRenderOrder ?? 0;
}

function captureSelectedVisual(object) {
  object.userData.baseColour = object.material.color.clone();
  object.userData.baseScale = object.scale.clone();
  object.userData.baseRenderOrder = object.renderOrder;
  object.userData.baseDepthTest = object.material.depthTest;
  object.userData.baseDepthWrite = object.material.depthWrite;
  if (object.material.emissive) {
    object.userData.baseEmissive = object.material.emissive.clone();
    object.userData.baseEmissiveIntensity = object.material.emissiveIntensity;
  }
}

function selectMember(object) {
  const visualObject = object.userData.visualObject ?? object;
  restoreSelectedVisual();
  selectedObject = visualObject;
  captureSelectedVisual(visualObject);
  visualObject.material.color.set(SELECTED_MEMBER_COLOUR);
  visualObject.scale.set(SELECTED_MEMBER_SCALE, 1, SELECTED_MEMBER_SCALE);
  visualObject.material.depthTest = false;
  visualObject.material.depthWrite = false;
  visualObject.renderOrder = 12;
  if (visualObject.material.emissive) {
    visualObject.material.emissive.set(0x704d00);
    visualObject.material.emissiveIntensity = 0.85;
  }
  showSelectionCallout(visualObject.userData.member);

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
  labels.memberInterpretation.hidden = false;
}

function selectNode(object) {
  restoreSelectedVisual();
  clearSelectionCallout();
  selectedObject = object;
  captureSelectedVisual(object);
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
  labels.memberInterpretation.hidden = false;
}

function clearSelection() {
  restoreSelectedVisual();
  clearSelectionCallout();
  selectedObject = null;
  resetSelectionPanel();
}

function updatePointer(event) {
  const rect = renderer.domElement.getBoundingClientRect();
  pointer.x = ((event.clientX - rect.left) / rect.width) * 2 - 1;
  pointer.y = -((event.clientY - rect.top) / rect.height) * 2 + 1;
}

function pickMember(event) {
  if (activeWorkspace === "results" && activeResultQuantity !== "member_axial") return;
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
  setCameraView("front");
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
  const [resultResponse, profileResponse, annotationLayoutResponse] = await Promise.all([
    fetch("./public/data/tower-001.results.json", { cache: "no-cache" }),
    fetch("./profiles/towerflow-drawing-profile-v0.1.json", { cache: "no-cache" }),
    fetch("./profiles/towerflow-annotation-layout-v0.1.json", { cache: "no-cache" }),
  ]);
  if (!resultResponse.ok) {
    throw new Error(`Unable to load result JSON: ${resultResponse.status}`);
  }
  if (!profileResponse.ok) {
    throw new Error(`Unable to load drawing profile: ${profileResponse.status}`);
  }
  if (!annotationLayoutResponse.ok) {
    throw new Error(`Unable to load annotation layout profile: ${annotationLayoutResponse.status}`);
  }
  resultSourceData = await resultResponse.json();
  phase2ResultData = resultSourceData;
  drawingProfileData = await profileResponse.json();
  drawingAnnotationLayoutData = await annotationLayoutResponse.json();
  populateResultSetSelect(resultSourceData);
  populateSolverControls(resultSourceData.inputSummary);
  setSolveState("ready", "Ready");
  const firstResultSet = resultSourceData.resultSets?.[0];
  setActiveResultSet(firstResultSet?.id);
  updateAnalysisModeControls();
  setWorkspaceView(activeWorkspace);
  if (phase3ReviewEnabled) await loadPhase3DemoRequest();
}

function animate() {
  controls.update();
  renderer.render(scene, camera);
  if (axisRenderer) {
    axisGroup.quaternion.copy(camera.quaternion).invert();
    axisRenderer.render(axisScene, axisCamera);
  }
  updateSelectionCalloutPosition();
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
loadActionFilter?.addEventListener("change", updateDisplayOptions);
supportPreset?.addEventListener("change", () => setSupportPreset(supportPreset.value));
resultCombinationSelect?.addEventListener("change", () => {
  const resultSets = resultSourceData?.resultSets ?? [];
  const candidates = resultSetsForCombination(resultSets, resultCombinationSelect.value);
  const activeDirection = Number(towerData?.windDirectionDeg);
  const nextResult = candidates.find((resultSet) => Number(resultSet.windDirectionDeg) === activeDirection)
    ?? candidates[0];
  setActiveResultSet(nextResult?.id);
});
resultDirectionSelect?.addEventListener("change", () => setActiveResultSet(resultDirectionSelect.value));
resultDisplayType?.addEventListener("change", () => setActiveResultQuantity(resultDisplayType.value));
deformationScaleInput?.addEventListener("input", () => setDeformationScale(deformationScaleInput.value));
drawingResultSetSelect?.addEventListener("change", () => setActiveResultSet(drawingResultSetSelect.value));
for (const button of workspaceButtons) {
  button.addEventListener("click", () => setWorkspaceView(button.dataset.workspaceTab));
}
projectBasisButton?.addEventListener("click", () => projectBasisDialog?.showModal());
projectBasisClose?.addEventListener("click", () => projectBasisDialog?.close());
projectBasisDialog?.addEventListener("click", (event) => {
  if (event.target === projectBasisDialog) projectBasisDialog.close();
});
runPhase3ReviewButton?.addEventListener("click", runPhase3Review);
importPhase3ProjectInputButton?.addEventListener("click", () => phase3ProjectInputFile?.click());
resetPhase3ProjectInputButton?.addEventListener("click", loadPhase3DemoRequest);
phase3ProjectInputFile?.addEventListener("change", importPhase3ProjectInput);
phase3ActionScenarioSelect?.addEventListener("change", () => {
  invalidatePhase3ReviewResult();
  updateAnalysisModeControls();
  resetPhase3ReviewSummary();
  setPhase3ReviewState("ready", `${phase3ActionScenario()?.verificationCaseId ?? "Phase 3A"} / ready`);
});
for (const button of analysisModeButtons) {
  button.addEventListener("click", () => {
    const mode = button.dataset.analysisMode;
    const data = mode === "phase3-review" ? phase3ReviewData : phase2ResultData;
    activateAnalysisResult(mode, data);
  });
}
for (const button of drawingTypeButtons) {
  button.addEventListener("click", () => setDrawingType(button.dataset.drawingType));
}
for (const button of drawingZoomButtons) {
  button.addEventListener("click", () => stepDrawingZoom(button.dataset.drawingZoom === "in" ? 1 : -1));
}
drawingZoomFit?.addEventListener("click", () => {
  drawingZoom = null;
  applyDrawingZoom();
});
exportDrawingSvgButton?.addEventListener("click", exportDrawingSvg);
drawingSvg?.addEventListener("click", (event) => {
  const member = event.target.closest("[data-drawing-member-id]");
  if (member) selectDrawingMember(member.dataset.drawingMemberId);
});
drawingSvg?.addEventListener("keydown", (event) => {
  if (event.key !== "Enter" && event.key !== " ") return;
  const member = event.target.closest("[data-drawing-member-id]");
  if (!member) return;
  event.preventDefault();
  selectDrawingMember(member.dataset.drawingMemberId);
});
for (const button of reviewTabButtons) {
  button.addEventListener("click", () => setReviewView(button.dataset.reviewTab));
}
for (const button of loadingTabButtons) {
  button.addEventListener("click", () => setLoadingView(button.dataset.loadingTab));
}
combinationSelectAll?.addEventListener("change", () => {
  syncCombinationSelection(combinationSelectAll.checked ? combinationSituationInputs.map((input) => input.value) : []);
  markPhase2ResultsModified();
});
for (const input of combinationSituationInputs) {
  input.addEventListener("change", () => {
    syncCombinationSelection();
    markPhase2ResultsModified();
  });
}
solveEquipmentSelect?.addEventListener("change", () => {
  commitEquipmentEditor();
  syncEquipmentEditor(Number(solveEquipmentSelect.value));
});
solvePermanentItemSelect?.addEventListener("change", () => {
  commitPermanentItemEditor();
  syncPermanentItemEditor(Number(solvePermanentItemSelect.value));
});
solvePermanentItemType?.addEventListener("change", () => {
  commitPermanentItemEditor();
  const option = solvePermanentItemSelect?.querySelector(`option[value="${activePermanentItemIndex}"]`);
  const item = solverInputDraft?.permanentItems?.[activePermanentItemIndex];
  if (option && item) option.textContent = `${item.id} / ${String(item.type).replaceAll("_", " ")}`;
});
solvePermanentItemDistribution?.addEventListener("change", () => {
  commitPermanentItemEditor();
  updatePermanentDistributionFields(solvePermanentItemDistribution.value);
});
addPermanentItemButton?.addEventListener("click", addPermanentItem);
removePermanentItemButton?.addEventListener("click", removePermanentItem);
discardPhase2ChangesButton?.addEventListener("click", discardPhase2Changes);
solveWindRegion?.addEventListener("change", updateCoastlineVisibility);
const phase2AnalysisInputSelector = [
  "#solve-wind-region",
  "#solve-wind-ari",
  "#solve-north-axis",
  "#solve-coastline-fraction",
  "[data-wind-tc]",
  "[data-wind-mt]",
  "#solve-equipment-height",
  "#solve-equipment-area",
  "#solve-equipment-weight",
  "#solve-permanent-item-type",
  "#solve-permanent-item-distribution",
  "#solve-permanent-item-weight",
  "#solve-permanent-item-azimuth",
  "#solve-permanent-point-elevation",
  "#solve-permanent-bottom-elevation",
  "#solve-permanent-top-elevation",
].join(",");
function handlePhase2AnalysisInput(event) {
  updateSolveReadiness();
  if (event.target.matches(phase2AnalysisInputSelector)) markPhase2ResultsModified();
}
solverForm?.addEventListener("input", handlePhase2AnalysisInput);
solverForm?.addEventListener("change", handlePhase2AnalysisInput);
solverForm?.addEventListener("submit", runPhase2Solve);
toggleResultReview?.addEventListener("click", () => {
  reviewUserCollapsed = !appShell.classList.contains("is-review-collapsed");
  setReviewCollapsed(reviewUserCollapsed);
});
setReviewView(activeReviewView);
setLoadingView(activeLoadingView);
setDrawingType(activeDrawingType);
applyDrawingZoom();
setWorkspaceView(activeWorkspace, false);
resize();
buildViewportAxisGizmo();
loadData().catch((error) => {
  labels.caseTitle.textContent = "Result data failed to load";
  labels.memberInterpretation.textContent = error.message;
  setSolveState("error", "Data load failed", error.message);
});
animate();
