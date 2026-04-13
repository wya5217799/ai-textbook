// GD Variants Comparison MicroSim
// Batch GD, SGD, and Mini-batch GD on a 2D quadratic contour plot
// Cost: J(t0,t1) = t0^2 + 2*t1^2, minimum at (0,0)
// Bloom Level: Analyze (L4) - Verb: compare
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let sliderLeftMargin = 190;

// Synthetic dataset for SGD/mini-batch gradient estimation
const N_DATA = 50; // data points
let dataset = []; // [{x1, x2, y}]  — for a linear regression problem

// GD variants state
let batchRunner, sgdRunner, miniBatchRunner;
let isRunning = false;
let iterCount = 0;
const MAX_ITER = 80;
const T0_START = 3.5, T1_START = 3.0;

// Controls
let lrSlider, batchSizeSlider;
let runBtn, stepBtn, resetBtn;

// Colors
let colBatch, colSGD, colMini;

// Plot area
let plotX0, plotY0, plotW, plotH;
let tMin = -4.5, tMax = 4.5;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colBatch = color(70, 130, 200);   // blue  — Batch GD
  colSGD   = color(210, 70,  70);   // red   — SGD
  colMini  = color(50,  170, 90);   // green — Mini-batch

  generateDataset();
  resetRunners();

  lrSlider = createSlider(1, 50, 15, 1);  // alpha = value/100
  lrSlider.position(sliderLeftMargin, drawHeight + 8);
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);

  batchSizeSlider = createSlider(2, 16, 8, 2);
  batchSizeSlider.position(sliderLeftMargin, drawHeight + 40);
  batchSizeSlider.size(canvasWidth - sliderLeftMargin - margin);

  runBtn  = createButton('▶ Run');
  runBtn.position(10, drawHeight + 58);
  runBtn.mousePressed(toggleRun);

  stepBtn = createButton('Step');
  stepBtn.position(80, drawHeight + 58);
  stepBtn.mousePressed(doStep);

  resetBtn = createButton('Reset');
  resetBtn.position(145, drawHeight + 58);
  resetBtn.mousePressed(() => { resetRunners(); isRunning = false; runBtn.html('▶ Run'); });

  describe('Comparison of Batch GD (blue), SGD (red), and Mini-batch GD (green) paths on a contour plot', LABEL);
}

function generateDataset() {
  dataset = [];
  randomSeed(7);
  for (let i = 0; i < N_DATA; i++) {
    let x1 = random(-3, 3), x2 = random(-3, 3);
    // True relationship: y ≈ 0 (minimum at origin), adding noise
    dataset.push({x1, x2, noise: randomGaussian(0, 0.5)});
  }
}

// True gradient of J(t0,t1) = t0^2 + 2*t1^2
function trueGrad(t0, t1) { return {g0: 2 * t0, g1: 4 * t1}; }

// Noisy gradient: adds per-sample noise to simulate SGD/mini-batch
function noisyGrad(t0, t1, samples) {
  let g0 = 2 * t0, g1 = 4 * t1;
  let noiseScale = 1.0 / samples;
  return {
    g0: g0 + randomGaussian(0, abs(g0) * 0.6 + 0.2) * noiseScale * 8,
    g1: g1 + randomGaussian(0, abs(g1) * 0.6 + 0.2) * noiseScale * 8
  };
}

function resetRunners() {
  iterCount = 0;
  batchRunner    = { t0: T0_START, t1: T1_START, path: [{t0: T0_START, t1: T1_START}], costs: [cost(T0_START, T1_START)], label: 'Batch GD',     col: null };
  sgdRunner      = { t0: T0_START, t1: T1_START, path: [{t0: T0_START, t1: T1_START}], costs: [cost(T0_START, T1_START)], label: 'SGD (B=1)',     col: null };
  miniBatchRunner= { t0: T0_START, t1: T1_START, path: [{t0: T0_START, t1: T1_START}], costs: [cost(T0_START, T1_START)], label: 'Mini-batch',    col: null };
  batchRunner.col = colBatch; sgdRunner.col = colSGD; miniBatchRunner.col = colMini;
}

function cost(t0, t1) { return t0 * t0 + 2 * t1 * t1; }

function doStep() {
  if (iterCount >= MAX_ITER) return;
  let alpha = lrSlider.value() / 100;
  let B     = batchSizeSlider.value();

  // Batch GD — exact gradient
  let gBatch = trueGrad(batchRunner.t0, batchRunner.t1);
  batchRunner.t0 -= alpha * gBatch.g0;
  batchRunner.t1 -= alpha * gBatch.g1;
  batchRunner.path.push({t0: batchRunner.t0, t1: batchRunner.t1});
  batchRunner.costs.push(cost(batchRunner.t0, batchRunner.t1));

  // SGD — B=1, very noisy
  let gSGD = noisyGrad(sgdRunner.t0, sgdRunner.t1, 1);
  sgdRunner.t0 = constrain(sgdRunner.t0 - alpha * gSGD.g0, tMin, tMax);
  sgdRunner.t1 = constrain(sgdRunner.t1 - alpha * gSGD.g1, tMin, tMax);
  sgdRunner.path.push({t0: sgdRunner.t0, t1: sgdRunner.t1});
  sgdRunner.costs.push(cost(sgdRunner.t0, sgdRunner.t1));

  // Mini-batch — moderate noise
  let gMini = noisyGrad(miniBatchRunner.t0, miniBatchRunner.t1, B);
  miniBatchRunner.t0 = constrain(miniBatchRunner.t0 - alpha * gMini.g0, tMin, tMax);
  miniBatchRunner.t1 = constrain(miniBatchRunner.t1 - alpha * gMini.g1, tMin, tMax);
  miniBatchRunner.path.push({t0: miniBatchRunner.t0, t1: miniBatchRunner.t1});
  miniBatchRunner.costs.push(cost(miniBatchRunner.t0, miniBatchRunner.t1));

  iterCount++;
}

function toggleRun() {
  isRunning = !isRunning;
  runBtn.html(isRunning ? '⏸ Pause' : '▶ Run');
}

function draw() {
  updateCanvasSize();
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);
  batchSizeSlider.size(canvasWidth - sliderLeftMargin - margin);

  if (isRunning && frameCount % 3 === 0 && iterCount < MAX_ITER) doStep();

  // Compute plot area
  plotX0 = margin;
  plotY0 = margin + 22;
  plotW  = canvasWidth * 0.58 - margin;
  plotH  = drawHeight - plotY0 - margin / 2;

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Gradient Descent Variants Comparison', canvasWidth / 2, 8);

  drawContours();
  drawPaths();
  drawCurrentPositions();
  drawMinMarker();
  drawLegend();
  drawCostPanel();
  drawControlLabels();
}

function drawContours() {
  let step = 4;
  noStroke();
  for (let px = plotX0; px < plotX0 + plotW; px += step) {
    for (let py = plotY0; py < plotY0 + plotH; py += step) {
      let t0 = map(px, plotX0, plotX0 + plotW, tMin, tMax);
      let t1 = map(py, plotY0, plotY0 + plotH, tMax, tMin);
      let j  = cost(t0, t1);
      let logJ = log(max(j, 0.01)) / log(40);
      let c = lerpColor(color(240, 248, 255), color(20, 50, 180), constrain(logJ, 0, 1));
      fill(c); rect(px, py, step, step);
    }
  }
  // Contour rings
  for (let J of [0.5, 2, 5, 10, 20]) {
    stroke(255, 255, 255, 100); strokeWeight(0.8); noFill();
    beginShape();
    for (let a = 0; a <= 360; a += 3) {
      let t0 = sqrt(J) * cos(radians(a));
      let t1 = sqrt(J / 2) * sin(radians(a));
      if (t0 < tMin || t0 > tMax || t1 < tMin || t1 > tMax) continue;
      vertex(pX(t0), pY(t1));
    }
    endShape(CLOSE);
  }
  // Axes labels
  noStroke(); fill(200); textAlign(CENTER, TOP); textSize(10);
  text('θ₀', plotX0 + plotW / 2, plotY0 + plotH + 2);
  push(); translate(plotX0 - 12, plotY0 + plotH / 2);
  rotate(-HALF_PI); textAlign(CENTER, CENTER); text('θ₁', 0, 0); pop();
}

function drawPaths() {
  let runners = [batchRunner, sgdRunner, miniBatchRunner];
  for (let r of runners) {
    if (r.path.length < 2) continue;
    noFill();
    for (let i = 1; i < r.path.length; i++) {
      let a = r.path[i-1], b = r.path[i];
      let alpha = map(i, 1, r.path.length, 40, 200);
      stroke(red(r.col), green(r.col), blue(r.col), alpha);
      strokeWeight(i === r.path.length - 1 ? 2 : 1.2);
      line(pX(a.t0), pY(a.t1), pX(b.t0), pY(b.t1));
    }
  }
}

function drawCurrentPositions() {
  let runners = [batchRunner, sgdRunner, miniBatchRunner];
  for (let r of runners) {
    fill(r.col); noStroke();
    circle(pX(r.t0), pY(r.t1), 10);
  }
}

function drawMinMarker() {
  stroke(255, 255, 200, 200); strokeWeight(1.5); noFill();
  circle(pX(0), pY(0), 12);
  noStroke(); fill(255, 255, 200, 200);
  textAlign(LEFT, BOTTOM); textSize(10);
  text('min', pX(0) + 7, pY(0) - 2);
}

function drawLegend() {
  let lx = plotX0 + plotW + 10, ly = plotY0;
  let runners = [batchRunner, sgdRunner, miniBatchRunner];
  noStroke(); fill(255, 255, 255, 180);
  rect(lx - 4, ly - 4, canvasWidth - lx - margin / 2 + 4, 75, 3);
  textAlign(LEFT, TOP); textSize(11);
  for (let i = 0; i < 3; i++) {
    let r = runners[i];
    fill(r.col);
    text('■ ' + r.label, lx, ly + i * 22);
    fill(80);
    text('J=' + r.costs[r.costs.length - 1].toFixed(3), lx + 85, ly + i * 22);
  }
}

function drawCostPanel() {
  let cx = plotX0 + plotW + 10;
  let cy = plotY0 + 85;
  let cw = canvasWidth - cx - margin / 2;
  let ch = drawHeight - cy - margin / 2;
  if (cw < 60 || ch < 40) return;

  fill(255, 255, 255, 180); stroke('silver'); strokeWeight(1);
  rect(cx, cy, cw, ch, 3);
  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
  text('Cost vs. Iteration', cx + cw / 2, cy + 3);

  let runners = [batchRunner, sgdRunner, miniBatchRunner];
  let allCosts = runners.flatMap(r => r.costs);
  let maxC = max(allCosts.filter(v => isFinite(v) && v < 500));

  let px0 = cx + 5, py0 = cy + 16, pw = cw - 10, ph = ch - 22;
  stroke(200); strokeWeight(1);
  line(px0, py0 + ph, px0 + pw, py0 + ph);

  for (let r of runners) {
    stroke(r.col); strokeWeight(1.2); noFill();
    beginShape();
    for (let i = 0; i < r.costs.length; i++) {
      let x = map(i, 0, MAX_ITER, px0, px0 + pw);
      let y = map(constrain(r.costs[i], 0, maxC), 0, maxC, py0 + ph, py0);
      vertex(x, y);
    }
    endShape();
  }

  noStroke(); fill(80); textAlign(LEFT, BOTTOM); textSize(9);
  text('0', px0, py0 + ph + 1);
  textAlign(RIGHT, BOTTOM);
  text(MAX_ITER + ' iter', px0 + pw, py0 + ph + 1);
}

function drawControlLabels() {
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Learning rate (α): ' + (lrSlider.value() / 100).toFixed(2),
       10, drawHeight + 14);
  text('Mini-batch size (B): ' + batchSizeSlider.value(),
       10, drawHeight + 46);
  fill(80); textSize(11); textAlign(LEFT, TOP);
  text('Iter: ' + iterCount + ' / ' + MAX_ITER, canvasWidth - margin - 80, drawHeight + 60);
}

function pX(t0) { return map(t0, tMin, tMax, plotX0, plotX0 + plotW); }
function pY(t1) { return map(t1, tMax, tMin, plotY0, plotY0 + plotH); }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);
  batchSizeSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
