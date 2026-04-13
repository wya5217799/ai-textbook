// K-Means Clustering Step-Through MicroSim
// Interactive step-through of the K-Means algorithm on a 2D dataset
// Shows assignment and update phases separately with concrete data
// Bloom Level: Understand (L2) - explain the K-Means algorithm

let canvasWidth = 400;
let drawHeight = 420;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 180;
let defaultTextSize = 16;

// K-Means state
let dataPoints = [];
let centroids = [];
let assignments = [];
let K = 3;
let iteration = 0;
let phase = 'init'; // 'init', 'assignment', 'update', 'converged'
let objectiveJ = 0;
let prevCentroids = [];
let stepHistory = [];
let currentStep = 0;

// Colors for clusters
const clusterColors = ['#e74c3c', '#3498db', '#2ecc71', '#f39c12', '#9b59b6', '#1abc9c'];
const clusterColorsDim = ['#fadbd8', '#d6eaf8', '#d5f5e3', '#fdebd0', '#e8daef', '#d1f2eb'];

// UI elements
let nextBtn, runBtn, resetBtn, newDataBtn;
let kSlider;
let highlightedPoint = -1;
let phaseChangedPoints = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Buttons row 1
  nextBtn = createButton('Next Step');
  nextBtn.position(10, drawHeight + 5);
  nextBtn.mousePressed(doNextStep);

  runBtn = createButton('Run to Convergence');
  runBtn.position(100, drawHeight + 5);
  runBtn.mousePressed(runToConvergence);

  resetBtn = createButton('Reset');
  resetBtn.position(270, drawHeight + 5);
  resetBtn.mousePressed(resetCentroids);

  newDataBtn = createButton('New Data');
  newDataBtn.position(330, drawHeight + 5);
  newDataBtn.mousePressed(generateNewData);

  // K slider row 2
  kSlider = createSlider(2, 6, 3, 1);
  kSlider.position(sliderLeftMargin, drawHeight + 42);
  kSlider.size(canvasWidth - sliderLeftMargin - margin);
  kSlider.input(() => { K = kSlider.value(); resetCentroids(); });

  generateData();
  initCentroids();

  describe('K-Means Clustering step-through showing assignment and update phases with centroids and data points', LABEL);
}

function generateData() {
  dataPoints = [];
  // Generate 3 natural clusters
  let clusterCenters = [
    [canvasWidth * 0.25, drawHeight * 0.3],
    [canvasWidth * 0.7, drawHeight * 0.25],
    [canvasWidth * 0.5, drawHeight * 0.72]
  ];
  for (let c = 0; c < 3; c++) {
    let n = 16 + floor(random(4));
    for (let i = 0; i < n; i++) {
      dataPoints.push({
        x: clusterCenters[c][0] + randomGaussian(0, canvasWidth * 0.09),
        y: clusterCenters[c][1] + randomGaussian(0, drawHeight * 0.09)
      });
    }
  }
  // Clamp to canvas
  for (let p of dataPoints) {
    p.x = constrain(p.x, margin, canvasWidth - margin);
    p.y = constrain(p.y, margin + 30, drawHeight - margin);
  }
  assignments = new Array(dataPoints.length).fill(0);
}

function generateNewData() {
  randomSeed(millis());
  generateData();
  resetCentroids();
}

function initCentroids() {
  centroids = [];
  // Pick K random data points as initial centroids
  let indices = shuffle([...Array(dataPoints.length).keys()]).slice(0, K);
  for (let i = 0; i < K; i++) {
    centroids.push({ x: dataPoints[indices[i]].x, y: dataPoints[indices[i]].y });
  }
  assignments = new Array(dataPoints.length).fill(0);
  iteration = 0;
  phase = 'init';
  objectiveJ = 0;
  prevCentroids = [];
  phaseChangedPoints = [];
}

function resetCentroids() {
  K = kSlider.value();
  initCentroids();
}

function assignmentStep() {
  let prevAssignments = [...assignments];
  for (let i = 0; i < dataPoints.length; i++) {
    let minDist = Infinity;
    let closest = 0;
    for (let k = 0; k < K; k++) {
      let d = dist(dataPoints[i].x, dataPoints[i].y, centroids[k].x, centroids[k].y);
      if (d < minDist) { minDist = d; closest = k; }
    }
    assignments[i] = closest;
  }
  // Track changed points
  phaseChangedPoints = [];
  for (let i = 0; i < dataPoints.length; i++) {
    if (assignments[i] !== prevAssignments[i]) phaseChangedPoints.push(i);
  }
  computeObjective();
}

function updateStep() {
  prevCentroids = centroids.map(c => ({ x: c.x, y: c.y }));
  for (let k = 0; k < K; k++) {
    let pts = dataPoints.filter((_, i) => assignments[i] === k);
    if (pts.length > 0) {
      centroids[k].x = pts.reduce((s, p) => s + p.x, 0) / pts.length;
      centroids[k].y = pts.reduce((s, p) => s + p.y, 0) / pts.length;
    }
  }
  phaseChangedPoints = [];
}

function computeObjective() {
  objectiveJ = 0;
  for (let i = 0; i < dataPoints.length; i++) {
    let k = assignments[i];
    let dx = dataPoints[i].x - centroids[k].x;
    let dy = dataPoints[i].y - centroids[k].y;
    objectiveJ += dx * dx + dy * dy;
  }
  // Normalize to pixel-independent value for display
  objectiveJ = Math.round(objectiveJ);
}

function hasConverged() {
  if (!prevCentroids || prevCentroids.length !== K) return false;
  for (let k = 0; k < K; k++) {
    if (dist(centroids[k].x, centroids[k].y, prevCentroids[k].x, prevCentroids[k].y) > 0.5) return false;
  }
  return true;
}

function doNextStep() {
  if (phase === 'converged') return;
  if (phase === 'init') {
    assignmentStep();
    phase = 'assignment';
    iteration = 1;
  } else if (phase === 'assignment') {
    updateStep();
    phase = 'update';
  } else if (phase === 'update') {
    if (hasConverged()) {
      phase = 'converged';
    } else {
      assignmentStep();
      phase = 'assignment';
      iteration++;
    }
  }
}

function runToConvergence() {
  let maxIter = 50;
  let steps = 0;
  while (phase !== 'converged' && steps < maxIter) {
    doNextStep();
    steps++;
  }
}

function draw() {
  updateCanvasSize();

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Resize slider
  kSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('K-Means Clustering Step-Through', canvasWidth / 2, 8);

  // Draw connecting lines (assignment phase: dashed lines to centroids)
  if (phase === 'assignment' || phase === 'update' || phase === 'converged') {
    for (let i = 0; i < dataPoints.length; i++) {
      let k = assignments[i];
      stroke(clusterColors[k]);
      strokeWeight(0.5);
      drawingContext.setLineDash([4, 4]);
      line(dataPoints[i].x, dataPoints[i].y, centroids[k].x, centroids[k].y);
      drawingContext.setLineDash([]);
    }
  }

  // Draw previous centroid positions (update phase)
  if (phase === 'update' && prevCentroids.length === K) {
    for (let k = 0; k < K; k++) {
      stroke(clusterColors[k]);
      strokeWeight(1);
      drawingContext.setLineDash([3, 3]);
      line(prevCentroids[k].x, prevCentroids[k].y, centroids[k].x, centroids[k].y);
      drawingContext.setLineDash([]);
      // Old centroid as ghost
      fill(clusterColorsDim[k]);
      stroke(clusterColors[k]);
      strokeWeight(1);
      circle(prevCentroids[k].x, prevCentroids[k].y, 22);
      fill(150);
      noStroke();
      textSize(10);
      textAlign(CENTER, CENTER);
      text('old', prevCentroids[k].x, prevCentroids[k].y);
    }
  }

  // Draw data points
  for (let i = 0; i < dataPoints.length; i++) {
    let k = (phase === 'init') ? 0 : assignments[i];
    let isChanged = phaseChangedPoints.includes(i);

    if (phase === 'init') {
      fill(200);
      stroke('gray');
    } else {
      fill(clusterColors[k % clusterColors.length]);
      stroke('white');
    }
    strokeWeight(isChanged ? 3 : 1.5);
    let r = isChanged ? 9 : 7;
    circle(dataPoints[i].x, dataPoints[i].y, r * 2);

    // Highlight changed points with ring
    if (isChanged) {
      noFill();
      stroke('yellow');
      strokeWeight(2);
      circle(dataPoints[i].x, dataPoints[i].y, r * 2 + 8);
    }
  }

  // Draw centroids
  for (let k = 0; k < K; k++) {
    fill(clusterColors[k % clusterColors.length]);
    stroke('black');
    strokeWeight(2);
    // Star shape via diamond
    let cx = centroids[k].x, cy = centroids[k].y;
    let s = 14;
    beginShape();
    vertex(cx, cy - s);
    vertex(cx + s * 0.4, cy - s * 0.4);
    vertex(cx + s, cy);
    vertex(cx + s * 0.4, cy + s * 0.4);
    vertex(cx, cy + s);
    vertex(cx - s * 0.4, cy + s * 0.4);
    vertex(cx - s, cy);
    vertex(cx - s * 0.4, cy - s * 0.4);
    endShape(CLOSE);

    // Label
    fill('black');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text('C' + (k + 1), cx, cy);
  }

  // Phase label box
  let phaseLabel = '';
  let phaseColor = '';
  if (phase === 'init') { phaseLabel = 'Phase: Initialization'; phaseColor = '#8e44ad'; }
  else if (phase === 'assignment') { phaseLabel = 'Phase: Assignment (points colored by nearest centroid)'; phaseColor = '#2980b9'; }
  else if (phase === 'update') { phaseLabel = 'Phase: Update (centroids moved to cluster means)'; phaseColor = '#27ae60'; }
  else if (phase === 'converged') { phaseLabel = 'Converged!'; phaseColor = '#e67e22'; }

  fill(phaseColor);
  noStroke();
  rect(margin, drawHeight - 38, canvasWidth - margin * 2, 28, 6);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(13);
  text(phaseLabel, canvasWidth / 2, drawHeight - 24);

  // Control area labels
  fill('black');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(defaultTextSize);

  // Row 1: iteration, objective
  text('Iter: ' + iteration + '  |  J = ' + (phase === 'init' ? '—' : objectiveJ.toLocaleString()) +
    (phase === 'converged' ? '  ✓ Converged' : ''), 10, drawHeight + 22);

  // Row 2: K slider label
  text('K (clusters): ' + K, 10, drawHeight + 57);

  // Row 3: changed points info
  if (phaseChangedPoints.length > 0 && phase === 'assignment') {
    fill('#c0392b');
    text('Points changed cluster: ' + phaseChangedPoints.length, 10, drawHeight + 90);
  } else if (phase === 'update') {
    fill('#27ae60');
    text('Centroids updated — click Next Step to reassign', 10, drawHeight + 90);
  } else {
    fill('gray');
    text(phase === 'converged' ? 'Click Reset or New Data to restart' : 'Click Next Step to begin', 10, drawHeight + 90);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  kSlider.size(canvasWidth - sliderLeftMargin - margin);
  // Reposition buttons
  runBtn.position(100, drawHeight + 5);
  resetBtn.position(270, drawHeight + 5);
  newDataBtn.position(330, drawHeight + 5);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
