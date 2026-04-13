// Model Complexity vs. Fit Quality MicroSim
// Adjustable polynomial degree fitted to noisy quadratic data
// Bloom Level: Understand (L2) - Verb: explain
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let sliderLeftMargin = 185;
let defaultTextSize = 14;

let degreeSlider;
let newDataBtn;

// Data
let dataX = [], dataY = [];
let N = 20;

// Plot bounds (in data space)
let xMin = -3, xMax = 3;
let yMin = -8, yMax = 12;

// Colors
let colData, colFit;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colData = color(70, 130, 200);
  colFit  = color(210, 80, 50);

  generateData();

  degreeSlider = createSlider(1, 15, 1, 1);
  degreeSlider.position(sliderLeftMargin, drawHeight + 10);
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);

  newDataBtn = createButton('New Data');
  newDataBtn.position(10, drawHeight + 42);
  newDataBtn.mousePressed(() => { generateData(); });

  describe('Interactive polynomial fit explorer showing underfitting, good fit, and overfitting', LABEL);
}

function generateData() {
  dataX = [];
  dataY = [];
  for (let i = 0; i < N; i++) {
    let x = random(-3, 3);
    // True function: y = 0.5*x^2 - x + 1 + noise
    let y = 0.5 * x * x - x + 1 + randomGaussian(0, 1.5);
    dataX.push(x);
    dataY.push(y);
  }
}

function draw() {
  updateCanvasSize();
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);

  let degree = degreeSlider.value();

  // Fit polynomial
  let coeffs = fitPolynomial(dataX, dataY, degree);
  let mse = computeMSE(dataX, dataY, coeffs);

  // Determine fit label
  let fitLabel, fitColor;
  if (degree <= 1) {
    fitLabel = 'Underfitting — too simple (degree ' + degree + ')';
    fitColor = color(210, 80, 50);
  } else if (degree <= 4) {
    fitLabel = 'Good Fit — captures the pattern (degree ' + degree + ')';
    fitColor = color(50, 160, 80);
  } else {
    fitLabel = 'Overfitting — memorizes noise (degree ' + degree + ')';
    fitColor = color(180, 50, 180);
  }
  colFit = fitColor;

  // Backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Model Complexity vs. Fit Quality', canvasWidth / 2, 8);

  drawAxes();
  drawDataPoints();
  drawFitCurve(coeffs);

  // Fit label
  noStroke();
  fill(fitColor);
  textAlign(CENTER, TOP); textSize(14);
  text(fitLabel, canvasWidth / 2, drawHeight - 30);

  // MSE display
  fill(60);
  textSize(12);
  text('Training MSE: ' + mse.toFixed(3), canvasWidth / 2, drawHeight - 13);

  // True function annotation
  noStroke(); fill(150);
  textAlign(LEFT, TOP); textSize(11);
  text('True function: y = 0.5x² − x + 1 + noise', margin, margin + 2);

  // Control labels
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Polynomial Degree: ' + degree, 10, drawHeight + 16);
}

// ─── Polynomial fitting via least squares (Vandermonde) ─────────────────────
function fitPolynomial(xs, ys, degree) {
  let n = xs.length;
  let d = degree + 1;

  // Build Vandermonde matrix
  let V = [];
  for (let i = 0; i < n; i++) {
    let row = [];
    for (let j = 0; j < d; j++) row.push(Math.pow(xs[i], j));
    V.push(row);
  }

  // Normal equations: (V^T V) c = V^T y  — solved via Cholesky / simple Gaussian
  // Use a numerically safe approach with QR via Gram-Schmidt
  let A = matMul(transpose(V), V);        // d×d
  let b = matVec(transpose(V), ys);       // d×1
  return gaussianElimination(A, b);
}

function evalPoly(coeffs, x) {
  let y = 0;
  for (let j = 0; j < coeffs.length; j++) y += coeffs[j] * Math.pow(x, j);
  return y;
}

function computeMSE(xs, ys, coeffs) {
  let sum = 0;
  for (let i = 0; i < xs.length; i++) {
    let err = ys[i] - evalPoly(coeffs, xs[i]);
    sum += err * err;
  }
  return sum / xs.length;
}

// ─── Linear algebra helpers ──────────────────────────────────────────────────
function transpose(M) {
  return M[0].map((_, j) => M.map(row => row[j]));
}

function matMul(A, B) {
  let r = A.length, mid = B.length, c = B[0].length;
  let C = Array.from({length: r}, () => Array(c).fill(0));
  for (let i = 0; i < r; i++)
    for (let k = 0; k < mid; k++)
      for (let j = 0; j < c; j++)
        C[i][j] += A[i][k] * B[k][j];
  return C;
}

function matVec(A, v) {
  return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0));
}

function gaussianElimination(A, b) {
  let n = b.length;
  // Augment
  let M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    // Partial pivot
    let maxRow = col;
    for (let row = col + 1; row < n; row++)
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    [M[col], M[maxRow]] = [M[maxRow], M[col]];
    if (Math.abs(M[col][col]) < 1e-12) { M[col][col] = 1e-12; }
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      let f = M[row][col] / M[col][col];
      for (let j = col; j <= n; j++) M[row][j] -= f * M[col][j];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
}

// ─── Drawing ─────────────────────────────────────────────────────────────────
function drawDataPoints() {
  fill(colData);
  noStroke();
  for (let i = 0; i < N; i++) {
    let px = mapX(dataX[i]);
    let py = mapY(dataY[i]);
    if (py > margin && py < drawHeight - margin / 2) circle(px, py, 8);
  }
}

function drawFitCurve(coeffs) {
  let steps = 300;
  let dx = (xMax - xMin) / steps;
  stroke(colFit); strokeWeight(2.5); noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = xMin + i * dx;
    let y = evalPoly(coeffs, x);
    if (y < yMin - 2 || y > yMax + 2) continue;
    vertex(mapX(x), mapY(constrain(y, yMin, yMax)));
  }
  endShape();

  // True function overlay (gray dashed)
  stroke(160); strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = xMin + i * dx;
    let y = 0.5 * x * x - x + 1;
    vertex(mapX(x), mapY(constrain(y, yMin, yMax)));
  }
  endShape();
  drawingContext.setLineDash([]);
}

function drawAxes() {
  stroke(120); strokeWeight(1);
  line(margin, mapY(0), canvasWidth - margin, mapY(0));
  line(margin, margin, margin, drawHeight - margin / 2);

  for (let x = xMin; x <= xMax; x += 1) {
    let px = mapX(x);
    stroke(120); line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
    text(x, px, mapY(0) + 6);
  }
  for (let y = -6; y <= 10; y += 2) {
    let py = mapY(y);
    if (py < margin || py > drawHeight - margin / 2) continue;
    stroke(120); line(margin - 4, py, margin, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10);
    text(y, margin - 6, py);
  }

  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(12);
  text('x', canvasWidth - margin + 10, mapY(0) - 6);

  // Legend
  noStroke();
  fill(colFit); rect(canvasWidth - 150, margin + 4, 12, 3);
  fill(60); textAlign(LEFT, TOP); textSize(11);
  text('Fitted curve', canvasWidth - 134, margin + 1);
  stroke(160); strokeWeight(1.5);
  drawingContext.setLineDash([5, 3]);
  line(canvasWidth - 150, margin + 18, canvasWidth - 138, margin + 18);
  drawingContext.setLineDash([]);
  noStroke(); fill(80); text('True function', canvasWidth - 134, margin + 14);
  fill(colData); circle(canvasWidth - 144, margin + 32, 8);
  fill(80); text('Data points', canvasWidth - 134, margin + 27);
}

function mapX(x) { return map(x, xMin, xMax, margin, canvasWidth - margin); }
function mapY(y) { return map(y, yMin, yMax, drawHeight - margin / 2, margin); }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
