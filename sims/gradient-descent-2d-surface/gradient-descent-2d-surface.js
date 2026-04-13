// Gradient Descent on a 2D Surface MicroSim
// Interactive contour plot with click-to-set start, step/run/reset controls
// Cost function: J(t0, t1) = t0^2 + 2*t1^2  (bowl shape, minimum at 0,0)
// Bloom Level: Apply (L3) - Verb: demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let sliderLeftMargin = 195;

// Parameter space bounds
let tMin = -4, tMax = 4;

// GD state
let theta0 = 3.0, theta1 = 3.0;
let path = [];         // [{t0, t1, cost}]
let running = false;
let iterCount = 0;
const MAX_ITER = 200;

// Controls
let lrSlider, runBtn, stepBtn, resetBtn;

// Cost history panel bounds
let histPanelX, histPanelY, histPanelW, histPanelH;
let costHistory = [];

// Contour levels
let contourLevels = [0.5, 1, 2, 4, 8, 16, 24];
let contourColors;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  contourColors = contourLevels.map((_, i) =>
    lerpColor(color(220, 240, 255), color(30, 60, 180), i / (contourLevels.length - 1))
  );

  lrSlider = createSlider(1, 100, 20, 1);   // alpha = value/100 => 0.01 to 1.0
  lrSlider.position(sliderLeftMargin, drawHeight + 8);
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);

  runBtn = createButton('▶ Run');
  runBtn.position(10, drawHeight + 35);
  runBtn.mousePressed(toggleRun);

  stepBtn = createButton('Step');
  stepBtn.position(80, drawHeight + 35);
  stepBtn.mousePressed(doStep);

  resetBtn = createButton('Reset');
  resetBtn.position(140, drawHeight + 35);
  resetBtn.mousePressed(resetGD);

  resetGD();
  describe('Interactive gradient descent on a 2D quadratic cost surface — click to set start point', LABEL);
}

function cost(t0, t1)  { return t0 * t0 + 2 * t1 * t1; }
function grad0(t0)     { return 2 * t0; }
function grad1(t1)     { return 4 * t1; }

function resetGD() {
  theta0 = 3.0; theta1 = 3.0;
  path = []; costHistory = [];
  iterCount = 0; running = false;
  runBtn.html('▶ Run');
  recordPath();
}

function recordPath() {
  path.push({t0: theta0, t1: theta1, cost: cost(theta0, theta1)});
  costHistory.push(cost(theta0, theta1));
}

function toggleRun() {
  running = !running;
  runBtn.html(running ? '⏸ Pause' : '▶ Run');
}

function doStep() {
  if (iterCount >= MAX_ITER) return;
  let alpha = lrSlider.value() / 100;
  let g0 = grad0(theta0), g1 = grad1(theta1);
  theta0 -= alpha * g0;
  theta1 -= alpha * g1;
  iterCount++;
  recordPath();
  if (cost(theta0, theta1) > 1000 || iterCount >= MAX_ITER) running = false;
}

function draw() {
  updateCanvasSize();
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);

  if (running && frameCount % 3 === 0) doStep();

  // Compute layout for history panel (right third)
  histPanelX = canvasWidth * 0.62;
  histPanelY = margin;
  histPanelW = canvasWidth - histPanelX - margin / 2;
  histPanelH = drawHeight - margin * 1.5;

  // Background
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Gradient Descent on a 2D Cost Surface', canvasWidth / 2, 8);

  drawContours();
  drawPath();
  drawCurrentPosition();
  drawMinimumMarker();
  drawHistoryPanel();
  drawInfo();
  drawControlLabels();
}

function drawContours() {
  let plotW = canvasWidth * 0.6 - margin;
  let plotH = drawHeight - margin * 1.5;
  let px0 = margin, py0 = margin + 20;

  // Draw filled contours by sampling pixels
  noStroke();
  let step = 3;
  for (let px = px0; px < px0 + plotW; px += step) {
    for (let py = py0; py < py0 + plotH; py += step) {
      let t0 = map(px, px0, px0 + plotW, tMin, tMax);
      let t1 = map(py, py0, py0 + plotH, tMax, tMin);
      let j  = cost(t0, t1);
      // color based on log cost
      let logJ = log(max(j, 0.01)) / log(32);
      let c = lerpColor(color(240, 248, 255), color(20, 50, 180), constrain(logJ, 0, 1));
      fill(c);
      rect(px, py, step, step);
    }
  }

  // Contour lines (isocurves)
  for (let lvl = 0; lvl < contourLevels.length; lvl++) {
    let J = contourLevels[lvl];
    drawContourLine(px0, py0, plotW, plotH, J);
  }

  // Axes labels
  noStroke(); fill(80);
  textAlign(CENTER, TOP); textSize(11);
  text('θ₀', px0 + plotW / 2, py0 + plotH + 4);
  push(); translate(px0 - 14, py0 + plotH / 2);
  rotate(-HALF_PI); textAlign(CENTER, CENTER); text('θ₁', 0, 0); pop();

  // Tick labels
  for (let v = -4; v <= 4; v += 2) {
    let px = map(v, tMin, tMax, px0, px0 + plotW);
    let py = map(v, tMax, tMin, py0, py0 + plotH);
    noStroke(); fill(80); textSize(9);
    textAlign(CENTER, TOP); text(v, px, py0 + plotH + 2);
    textAlign(RIGHT, CENTER); text(v, px0 - 2, py);
  }
}

function drawContourLine(px0, py0, plotW, plotH, J) {
  // Approximate contour as an ellipse: t0^2 + 2*t1^2 = J
  // t0 = sqrt(J)*cos, t1 = sqrt(J/2)*sin
  let steps = 120;
  let pts = [];
  for (let i = 0; i <= steps; i++) {
    let angle = TWO_PI * i / steps;
    let t0 = Math.sqrt(J) * Math.cos(angle);
    let t1 = Math.sqrt(J / 2) * Math.sin(angle);
    if (t0 < tMin || t0 > tMax || t1 < tMin || t1 > tMax) continue;
    pts.push({px: map(t0, tMin, tMax, px0, px0 + plotW),
              py: map(t1, tMax, tMin, py0, py0 + plotH)});
  }
  if (pts.length < 2) return;
  stroke(255, 255, 255, 120); strokeWeight(0.8); noFill();
  beginShape();
  pts.forEach(p => vertex(p.px, p.py));
  endShape(CLOSE);
}

function plotPos(t0, t1) {
  let plotW = canvasWidth * 0.6 - margin;
  let plotH = drawHeight - margin * 1.5;
  let px0 = margin, py0 = margin + 20;
  return {
    x: map(t0, tMin, tMax, px0, px0 + plotW),
    y: map(t1, tMax, tMin, py0, py0 + plotH)
  };
}

function drawPath() {
  if (path.length < 2) return;
  noFill();
  for (let i = 1; i < path.length; i++) {
    let a = plotPos(path[i-1].t0, path[i-1].t1);
    let b = plotPos(path[i].t0,   path[i].t1);
    let alpha = map(i, 1, path.length, 60, 220);
    stroke(255, 230, 0, alpha); strokeWeight(1.5);
    line(a.x, a.y, b.x, b.y);
  }
}

function drawCurrentPosition() {
  let p = plotPos(theta0, theta1);
  // Gradient arrow
  let alpha = lrSlider.value() / 100;
  let g0 = grad0(theta0), g1 = grad1(theta1);
  let scale = 20;
  let arrowLen = min(Math.sqrt(g0*g0 + g1*g1) * scale, 40);
  let angle = atan2(-g1, -g0); // negative gradient direction in screen space (t1 axis flipped)
  stroke(50, 220, 50); strokeWeight(2);
  let ex = p.x + cos(angle) * arrowLen;
  let ey = p.y + sin(angle) * arrowLen;
  line(p.x, p.y, ex, ey);
  // Arrow head
  fill(50, 220, 50); noStroke();
  let hw = 6;
  triangle(ex, ey,
    ex - hw * cos(angle - 0.4), ey - hw * sin(angle - 0.4),
    ex - hw * cos(angle + 0.4), ey - hw * sin(angle + 0.4));

  // Current position dot
  fill(220, 60, 60); noStroke();
  circle(p.x, p.y, 10);
}

function drawMinimumMarker() {
  let p = plotPos(0, 0);
  stroke(255, 255, 255, 200); strokeWeight(1.5); noFill();
  circle(p.x, p.y, 10);
  noStroke(); fill(255, 255, 255, 200);
  textAlign(LEFT, BOTTOM); textSize(10);
  text('min', p.x + 6, p.y - 2);
}

function drawHistoryPanel() {
  // Panel background
  fill(255, 255, 255, 200); stroke('silver'); strokeWeight(1);
  rect(histPanelX, histPanelY, histPanelW, histPanelH, 4);

  if (costHistory.length < 2) {
    noStroke(); fill(120); textAlign(CENTER, CENTER); textSize(11);
    text('Cost history\n(run to populate)', histPanelX + histPanelW / 2, histPanelY + histPanelH / 2);
    return;
  }

  let maxCost = max(costHistory);
  let plotX = histPanelX + 8, plotY = histPanelY + 10;
  let plotW = histPanelW - 16, plotH = histPanelH - 25;

  // Axes
  stroke(180); strokeWeight(1);
  line(plotX, plotY, plotX, plotY + plotH);
  line(plotX, plotY + plotH, plotX + plotW, plotY + plotH);

  // Cost curve
  stroke(220, 80, 80); strokeWeight(1.5); noFill();
  beginShape();
  for (let i = 0; i < costHistory.length; i++) {
    let x = map(i, 0, max(costHistory.length - 1, 1), plotX, plotX + plotW);
    let y = map(costHistory[i], 0, maxCost, plotY + plotH, plotY);
    vertex(x, y);
  }
  endShape();

  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
  text('Cost vs. Iteration', histPanelX + histPanelW / 2, histPanelY + histPanelH + 2);
}

function drawInfo() {
  let j = cost(theta0, theta1);
  noStroke(); fill(60);
  textAlign(LEFT, TOP); textSize(12);
  let infoX = canvasWidth * 0.62 - 10;
  let infoY = drawHeight - 68;
  text('θ₀ = ' + theta0.toFixed(3), infoX, infoY);
  text('θ₁ = ' + theta1.toFixed(3), infoX, infoY + 16);
  text('J(θ) = ' + j.toFixed(4), infoX, infoY + 32);
  text('Iter: ' + iterCount, infoX, infoY + 48);
}

function drawControlLabels() {
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Learning rate (α): ' + (lrSlider.value() / 100).toFixed(2), 10, drawHeight + 14);
}

function mousePressed() {
  // Check if click is within contour plot area
  let plotW = canvasWidth * 0.6 - margin;
  let plotH = drawHeight - margin * 1.5;
  let px0 = margin, py0 = margin + 20;
  if (mouseX >= px0 && mouseX <= px0 + plotW &&
      mouseY >= py0 && mouseY <= py0 + plotH) {
    theta0 = map(mouseX, px0, px0 + plotW, tMin, tMax);
    theta1 = map(mouseY, py0, py0 + plotH, tMax, tMin);
    path = []; costHistory = []; iterCount = 0; running = false;
    runBtn.html('▶ Run');
    recordPath();
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  lrSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
