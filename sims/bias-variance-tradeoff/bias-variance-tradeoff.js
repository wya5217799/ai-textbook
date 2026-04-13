// Bias-Variance Tradeoff Visualization MicroSim
// Classic U-shaped error curves with optional bias/variance component display
// and multi-dataset overlay to show variance
// Bloom Level: Analyze (L4) - Verb: examine
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 390;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let sliderLeftMargin = 210;

// Controls
let complexitySlider, showComponentsCheck, genDatasetsBtn;
let showMultiDatasets = false;
let multiDatasets = []; // 5 fitted-curve snapshots at current complexity

// Complexity range
let cMin = 1, cMax = 20;

// Precomputed error curves (smooth analytic approximation)
// Training error: decreasing sigmoid-like
// Validation error: U-shaped — min around complexity 4-6
function trainError(c) {
  return 0.3 + 3.5 * exp(-0.35 * c);
}
function valError(c) {
  let biasComp = 2.5 * exp(-0.28 * c);
  let varComp  = 0.02 * pow(c, 1.6);
  return 0.3 + biasComp + varComp;
}
function biasSquared(c) { return 2.5 * exp(-0.28 * c); }
function variance(c)    { return 0.02 * pow(c, 1.6); }
function irreducible()  { return 0.3; }

// True function for mini-overlay display
function trueF(x) { return 0.4 * x * x * x - x + 0.5; }

// Colors
let colTrain, colVal, colBias, colVar, colOptimal;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colTrain   = color(70, 130, 200);
  colVal     = color(210, 70,  70);
  colBias    = color(200, 140, 50);
  colVar     = color(150, 50, 200);
  colOptimal = color(50, 180, 80, 60);

  complexitySlider = createSlider(cMin, cMax, 1, 1);
  complexitySlider.position(sliderLeftMargin, drawHeight + 8);
  complexitySlider.size(canvasWidth - sliderLeftMargin - margin);

  showComponentsCheck = createCheckbox('Show bias² and variance curves', false);
  showComponentsCheck.position(sliderLeftMargin, drawHeight + 40);

  genDatasetsBtn = createButton('Generate 5 Datasets (show variance)');
  genDatasetsBtn.position(10, drawHeight + 60);
  genDatasetsBtn.mousePressed(generateMultiDatasets);

  describe('Bias-variance tradeoff: U-shaped validation error curve with optional bias/variance decomposition', LABEL);
}

function generateMultiDatasets() {
  showMultiDatasets = true;
  multiDatasets = [];
  let c = complexitySlider.value();
  // Generate 5 datasets, fit polynomial of degree c, store coefficients
  for (let d = 0; d < 5; d++) {
    let xs = [], ys = [];
    for (let i = 0; i < 20; i++) {
      let x = random(-3, 3);
      xs.push(x);
      ys.push(trueF(x) + randomGaussian(0, 1.5));
    }
    try {
      let coeffs = fitPoly(xs, ys, c);
      multiDatasets.push(coeffs);
    } catch(e) { /* skip degenerate */ }
  }
}

function draw() {
  updateCanvasSize();
  complexitySlider.size(canvasWidth - sliderLeftMargin - margin);

  let c = complexitySlider.value();

  // Reset multi-dataset overlay when complexity changes
  if (showMultiDatasets && multiDatasets.length > 0) {
    // Keep showing until user clicks again
  }

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Bias-Variance Tradeoff', canvasWidth / 2, 8);

  let plotLeft   = showMultiDatasets ? canvasWidth * 0.55 : canvasWidth;
  let mainPlotW  = plotLeft - margin - 10;

  drawErrorCurves(c, mainPlotW);
  if (showMultiDatasets && multiDatasets.length > 0) {
    drawMultiOverlay(c, plotLeft, mainPlotW);
  }
  drawControlLabels(c);
}

function drawErrorCurves(c, plotW) {
  let plotX = margin, plotY = margin + 20;
  let ph = drawHeight - plotY - margin / 2;

  // Y range
  let yMin = 0, yMax = 4.5;
  let mapC = cx => map(cx, cMin, cMax, plotX, plotX + plotW);
  let mapE = e  => map(e, yMin, yMax, plotY + ph, plotY);

  // Optimal zone shading (around the minimum of val error)
  let optC = 5; // approximate minimum
  fill(colOptimal); noStroke();
  beginShape();
  vertex(mapC(optC - 1.5), plotY);
  vertex(mapC(optC + 1.5), plotY);
  vertex(mapC(optC + 1.5), plotY + ph);
  vertex(mapC(optC - 1.5), plotY + ph);
  endShape(CLOSE);

  // Irreducible error line
  stroke(180); strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  line(mapC(cMin), mapE(irreducible()), mapC(cMax), mapE(irreducible()));
  drawingContext.setLineDash([]);
  noStroke(); fill(160); textAlign(LEFT, CENTER); textSize(10);
  text('Irreducible', plotX + 3, mapE(irreducible()) - 8);

  // Optional: bias² and variance curves
  if (showComponentsCheck.checked()) {
    // Bias²
    stroke(colBias); strokeWeight(1.5); noFill();
    drawingContext.setLineDash([5, 3]);
    beginShape();
    for (let cx = cMin; cx <= cMax; cx += 0.2) vertex(mapC(cx), mapE(biasSquared(cx)));
    endShape();
    drawingContext.setLineDash([]);

    // Variance
    stroke(colVar); strokeWeight(1.5); noFill();
    drawingContext.setLineDash([3, 3]);
    beginShape();
    for (let cx = cMin; cx <= cMax; cx += 0.2) vertex(mapC(cx), mapE(variance(cx)));
    endShape();
    drawingContext.setLineDash([]);
  }

  // Training error curve (blue)
  stroke(colTrain); strokeWeight(2.5); noFill();
  beginShape();
  for (let cx = cMin; cx <= cMax; cx += 0.2) vertex(mapC(cx), mapE(trainError(cx)));
  endShape();

  // Validation error curve (red, U-shaped)
  stroke(colVal); strokeWeight(2.5); noFill();
  beginShape();
  for (let cx = cMin; cx <= cMax; cx += 0.2) vertex(mapC(cx), mapE(valError(cx)));
  endShape();

  // Current complexity vertical line
  stroke(80); strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(mapC(c), plotY, mapC(c), plotY + ph);
  drawingContext.setLineDash([]);

  // Dots at current complexity
  let tE = trainError(c), vE = valError(c);
  fill(colTrain); noStroke(); circle(mapC(c), mapE(tE), 10);
  fill(colVal);   noStroke(); circle(mapC(c), mapE(vE), 10);

  // Value readouts
  noStroke(); fill(colTrain); textAlign(LEFT, TOP); textSize(12);
  text('Train: ' + tE.toFixed(3), plotX + plotW - 130, plotY + 4);
  fill(colVal);
  text('Val:   ' + vE.toFixed(3), plotX + plotW - 130, plotY + 20);
  if (showComponentsCheck.checked()) {
    fill(colBias); text('Bias²: ' + biasSquared(c).toFixed(3), plotX + plotW - 130, plotY + 36);
    fill(colVar);  text('Var:   ' + variance(c).toFixed(3),    plotX + plotW - 130, plotY + 52);
  }

  // Region labels
  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(11);
  text('← Underfitting', mapC((cMin + optC - 1) / 2), plotY + ph - 18);
  text('Optimal zone', mapC(optC), plotY + ph - 18);
  text('Overfitting →', mapC((optC + cMax) / 2 + 1), plotY + ph - 18);

  // Axes
  stroke(140); strokeWeight(1);
  line(plotX, plotY + ph, plotX + plotW, plotY + ph);
  line(plotX, plotY, plotX, plotY + ph);
  for (let cx = cMin; cx <= cMax; cx += 2) {
    stroke(140); line(mapC(cx), plotY + ph, mapC(cx), plotY + ph + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
    text(cx, mapC(cx), plotY + ph + 6);
  }
  for (let e = 0; e <= 4; e++) {
    let py = mapE(e); if (py < plotY) continue;
    stroke(140); line(plotX - 4, py, plotX, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10);
    text(e.toFixed(1), plotX - 6, py);
  }
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(12);
  text('Model Complexity', plotX + plotW / 2, plotY + ph + 18);
  push(); translate(14, plotY + ph / 2); rotate(-HALF_PI);
  textAlign(CENTER, CENTER); textSize(12); text('Error', 0, 0); pop();

  // Legend
  noStroke(); textAlign(LEFT, TOP); textSize(11);
  fill(colTrain); text('— Training Error',    plotX, plotY + 2);
  fill(colVal);   text('— Validation Error',  plotX, plotY + 18);
  if (showComponentsCheck.checked()) {
    fill(colBias); text('-- Bias²',  plotX, plotY + 34);
    fill(colVar);  text('-- Variance', plotX, plotY + 50);
  }
  fill(colOptimal); rect(plotX + 160, plotY + 4, 10, 10, 2);
  fill(80); text('Optimal zone', plotX + 174, plotY + 2);
}

function drawMultiOverlay(c, plotLeft, mainPlotW) {
  // Mini scatter plot showing 5 fitted curves
  let px = plotLeft + 6, py = margin + 20;
  let pw = canvasWidth - px - margin / 2;
  let ph = drawHeight - py - margin;

  fill(255, 255, 240, 220); stroke('silver'); strokeWeight(1);
  rect(px, py, pw, ph, 3);

  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(11);
  text('5 datasets @ degree ' + c, px + pw / 2, py + 3);

  let xMin2 = -3, xMax2 = 3, yMin2 = -10, yMax2 = 12;
  let mpX = x => map(x, xMin2, xMax2, px + 6, px + pw - 6);
  let mpY = y => map(y, yMin2, yMax2, py + ph - 6, py + 18);

  // True function (dashed)
  stroke(180); strokeWeight(1.2); noFill();
  drawingContext.setLineDash([4, 3]);
  beginShape();
  for (let i = 0; i <= 100; i++) {
    let x = xMin2 + (xMax2 - xMin2) * i / 100;
    vertex(mpX(x), mpY(constrain(trueF(x), yMin2, yMax2)));
  }
  endShape();
  drawingContext.setLineDash([]);

  // 5 fitted curves
  let fitColors = [color(70,130,200,160), color(210,70,70,160), color(50,170,90,160),
                   color(200,130,50,160), color(150,50,200,160)];
  for (let d = 0; d < multiDatasets.length; d++) {
    let coeffs = multiDatasets[d];
    stroke(fitColors[d]); strokeWeight(1.5); noFill();
    beginShape();
    for (let i = 0; i <= 150; i++) {
      let x = xMin2 + (xMax2 - xMin2) * i / 150;
      let y = evalPoly(coeffs, x);
      if (y < yMin2 - 2 || y > yMax2 + 2) continue;
      vertex(mpX(x), mpY(constrain(y, yMin2, yMax2)));
    }
    endShape();
  }

  // Variance label
  let spreadMsg = c <= 3 ? 'Low variance — curves clustered' : 'High variance — curves spread apart';
  noStroke(); fill(80); textAlign(CENTER, BOTTOM); textSize(10);
  text(spreadMsg, px + pw / 2, py + ph - 2);
}

function drawControlLabels(c) {
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Model Complexity: ' + c + (c <= 2 ? ' (underfitting zone)' : c <= 6 ? ' (optimal zone)' : ' (overfitting zone)'), 10, drawHeight + 14);
}

// ─── Polynomial helpers ───────────────────────────────────────────────────────
function evalPoly(c, x) { return c.reduce((s, ci, i) => s + ci * Math.pow(x, i), 0); }

function fitPoly(xs, ys, degree) {
  let n = xs.length, d = min(degree + 1, n - 1);
  let V = xs.map(x => Array.from({length: d}, (_, j) => Math.pow(x, j)));
  let VT = V[0].map((_, j) => V.map(row => row[j]));
  let A = matMul(VT, V);
  let b = matVec(VT, ys);
  for (let j = 1; j < d; j++) A[j][j] += 0.01; // tiny ridge to stabilize
  return gaussElim(A, b);
}

function matMul(A, B) {
  let r = A.length, mid = B.length, c = B[0].length;
  let C = Array.from({length: r}, () => Array(c).fill(0));
  for (let i = 0; i < r; i++) for (let k = 0; k < mid; k++) for (let j = 0; j < c; j++) C[i][j] += A[i][k] * B[k][j];
  return C;
}
function matVec(A, v) { return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0)); }
function gaussElim(A, b) {
  let n = b.length, M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    [M[col], M[maxRow]] = [M[maxRow], M[col]];
    if (Math.abs(M[col][col]) < 1e-12) M[col][col] = 1e-12;
    for (let row = 0; row < n; row++) { if (row === col) continue; let f = M[row][col] / M[col][col]; for (let j = col; j <= n; j++) M[row][j] -= f * M[col][j]; }
  }
  return M.map((row, i) => row[n] / row[i]);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  complexitySlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
