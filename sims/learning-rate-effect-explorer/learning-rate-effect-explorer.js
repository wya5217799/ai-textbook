// Learning Rate Effect Explorer MicroSim
// Three-panel side-by-side comparison of GD with different learning rates
// Cost function: J(theta) = (theta - 3)^2   minimum at theta=3
// Bloom Level: Analyze (L4) - Verb: examine
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 30;
let sliderLeftMargin = 155;

// Three runners
let runners;
let defaultAlphas = [0.05, 0.45, 0.95];
let alphaSliders = [];
let runBtn, stepBtn, resetBtn;
let isRunning = false;
let iterCount = 0;
const MAX_ITER = 60;
const THETA_START = -2.0;

// Colors for each runner
let panelColors;

// History panel
let historyY, historyH;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  panelColors = [color(70, 130, 200), color(50, 170, 90), color(210, 70, 70)];

  resetRunners();

  // Three alpha sliders — stacked vertically in control area
  for (let i = 0; i < 3; i++) {
    let sl = createSlider(1, 99, round(defaultAlphas[i] * 100), 1);
    sl.position(sliderLeftMargin, drawHeight + 8 + i * 28);
    sl.size(canvasWidth - sliderLeftMargin - margin);
    alphaSliders.push(sl);
  }

  runBtn   = createButton('▶ Run All');
  runBtn.position(10, drawHeight + 8);
  runBtn.mousePressed(toggleRun);

  stepBtn  = createButton('Step All');
  stepBtn.position(10, drawHeight + 36);
  stepBtn.mousePressed(stepAll);

  resetBtn = createButton('Reset');
  resetBtn.position(10, drawHeight + 64);
  resetBtn.mousePressed(() => { resetRunners(); isRunning = false; runBtn.html('▶ Run All'); });

  describe('Three-panel learning rate comparison: slow, converging, and diverging gradient descent', LABEL);
}

function resetRunners() {
  iterCount = 0;
  runners = defaultAlphas.map(alpha => ({
    theta: THETA_START,
    alpha: alpha,
    history: [THETA_START],
    costs: [cost(THETA_START)]
  }));
}

function cost(t)  { return (t - 3) * (t - 3); }
function grad(t)  { return 2 * (t - 3); }

function toggleRun() {
  isRunning = !isRunning;
  runBtn.html(isRunning ? '⏸ Pause' : '▶ Run All');
}

function stepAll() {
  if (iterCount >= MAX_ITER) return;
  for (let i = 0; i < 3; i++) {
    let r = runners[i];
    r.alpha = alphaSliders[i].value() / 100;
    let g = grad(r.theta);
    r.theta -= r.alpha * g;
    r.theta = constrain(r.theta, -6, 12);
    r.history.push(r.theta);
    r.costs.push(cost(r.theta));
  }
  iterCount++;
}

function draw() {
  updateCanvasSize();

  // Update slider widths
  for (let sl of alphaSliders) sl.size(canvasWidth - sliderLeftMargin - margin);

  if (isRunning && frameCount % 4 === 0 && iterCount < MAX_ITER) stepAll();

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Learning Rate Effect Explorer', canvasWidth / 2, 8);

  // Three parabola panels
  let panelW = (canvasWidth - 2 * margin) / 3;
  let panelH = (drawHeight - margin - 85) * 0.55;
  let panelY = 32;
  let labels = ['Slow convergence', 'Fast convergence', 'Divergence / oscillation'];

  for (let i = 0; i < 3; i++) {
    let px = margin + i * panelW;
    runners[i].alpha = alphaSliders[i].value() / 100;
    drawParabolaPanel(px, panelY, panelW - 4, panelH, runners[i], panelColors[i], labels[i]);
  }

  // Cost vs iteration chart (bottom of draw area)
  historyY = panelY + panelH + 12;
  historyH = drawHeight - historyY - 10;
  drawCostChart(margin, historyY, canvasWidth - 2 * margin, historyH);

  // Control labels
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(12);
  for (let i = 0; i < 3; i++) {
    fill(panelColors[i]);
    text('α' + (i+1) + ' = ' + runners[i].alpha.toFixed(2), sliderLeftMargin - 100, drawHeight + 8 + i * 28 + 14);
  }
  fill(80); textAlign(LEFT, TOP); textSize(11);
  text('Iter: ' + iterCount + ' / ' + MAX_ITER, canvasWidth - margin - 80, drawHeight + 8);
}

function drawParabolaPanel(px, py, pw, ph, runner, col, label) {
  // Panel background
  fill(255, 255, 255, 180); stroke(col); strokeWeight(1);
  rect(px, py, pw, ph, 3);

  let thetaMin = -3, thetaMax = 9;
  let jMax = 40;

  let mapT = t => map(t, thetaMin, thetaMax, px + 6, px + pw - 6);
  let mapJ = j => map(constrain(j, 0, jMax), 0, jMax, py + ph - 8, py + 8);

  // Parabola curve
  stroke(col); strokeWeight(1.5); noFill();
  beginShape();
  for (let t = thetaMin; t <= thetaMax; t += 0.1) {
    vertex(mapT(t), mapJ(cost(t)));
  }
  endShape();

  // Minimum marker
  stroke(180); strokeWeight(1); drawingContext.setLineDash([3, 3]);
  line(mapT(3), py + 8, mapT(3), py + ph - 8);
  drawingContext.setLineDash([]);

  // Path dots (last 15 positions)
  let hist = runner.history;
  let start = max(0, hist.length - 15);
  for (let k = start; k < hist.length; k++) {
    let t = hist[k];
    let j = cost(t);
    let alpha = map(k, start, hist.length - 1, 60, 220);
    fill(red(col), green(col), blue(col), alpha); noStroke();
    let dotY = mapJ(j);
    if (dotY > py + 6 && dotY < py + ph - 4) circle(mapT(t), dotY, 5);
  }

  // Current position
  let curT = runner.theta;
  let curJ = cost(curT);
  fill(col); noStroke();
  let cy = mapJ(curJ);
  if (cy > py + 4 && cy < py + ph - 4) circle(mapT(curT), cy, 9);

  // Label + α value + cost
  noStroke(); fill(col);
  textAlign(CENTER, TOP); textSize(10);
  text(label, px + pw / 2, py + 2);
  fill(60); textSize(10);
  text('α=' + runner.alpha.toFixed(2) + '  J=' + curJ.toFixed(2), px + pw / 2, py + ph - 16);
}

function drawCostChart(cx, cy, cw, ch) {
  fill(255, 255, 255, 180); stroke('silver'); strokeWeight(1);
  rect(cx, cy, cw, ch, 3);

  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
  text('Cost J(θ) vs. Iteration', cx + cw / 2, cy + 2);

  if (iterCount < 1) return;

  let maxCost = 0;
  for (let r of runners) maxCost = max(maxCost, max(r.costs.slice(0, MAX_ITER)));
  maxCost = min(maxCost, 100);

  let plotX = cx + 8, plotY = cy + 14, plotW = cw - 16, plotH = ch - 20;

  // Axes
  stroke(180); strokeWeight(1);
  line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);

  for (let i = 0; i < 3; i++) {
    let r = runners[i];
    let n = min(r.costs.length, MAX_ITER + 1);
    stroke(panelColors[i]); strokeWeight(1.5); noFill();
    beginShape();
    for (let k = 0; k < n; k++) {
      let x = map(k, 0, MAX_ITER, plotX, plotX + plotW);
      let y = map(constrain(r.costs[k], 0, maxCost), 0, maxCost, plotY + plotH, plotY);
      vertex(x, y);
    }
    endShape();
  }

  // Legend
  noStroke(); textAlign(LEFT, TOP); textSize(9);
  for (let i = 0; i < 3; i++) {
    fill(panelColors[i]);
    text('α' + (i+1) + '=' + runners[i].alpha.toFixed(2), plotX + i * 70, plotY + 2);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  for (let sl of alphaSliders) sl.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
