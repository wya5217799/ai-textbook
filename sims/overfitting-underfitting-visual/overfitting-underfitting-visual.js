// Overfitting vs. Underfitting Visual MicroSim
// Polynomial fit with slider for degree; shows training + validation MSE
// Bloom Level: Understand (L2) - Verb: compare
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 390;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let sliderLeftMargin = 185;

// Controls
let degreeSlider, newDataBtn, showValCheck;

// Data
let trainX = [], trainY = [];
let valX   = [], valY   = [];
let N_train = 20, N_val = 15;

// Plot bounds
let xMin = -3, xMax = 3, yMin = -12, yMax = 14;

// Colors
let colTrain, colVal, colFit;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colTrain = color(70, 130, 200);
  colVal   = color(210, 120, 50);
  colFit   = color(50, 160, 80);

  generateData();

  degreeSlider = createSlider(1, 20, 1, 1);
  degreeSlider.position(sliderLeftMargin, drawHeight + 10);
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);

  showValCheck = createCheckbox('Show validation points', true);
  showValCheck.position(10, drawHeight + 42);

  newDataBtn = createButton('New Data');
  newDataBtn.position(10, drawHeight + 65);
  newDataBtn.mousePressed(generateData);

  describe('Polynomial fit explorer showing underfitting, good fit, and overfitting with training and validation MSE', LABEL);
}

// True function: y = 0.4x^3 - x + 0.5 + noise
function trueY(x) { return 0.4 * x * x * x - x + 0.5; }

function generateData() {
  trainX = []; trainY = [];
  valX   = []; valY   = [];
  for (let i = 0; i < N_train; i++) {
    let x = random(-3, 3);
    trainX.push(x);
    trainY.push(trueY(x) + randomGaussian(0, 1.5));
  }
  for (let i = 0; i < N_val; i++) {
    let x = random(-3, 3);
    valX.push(x);
    valY.push(trueY(x) + randomGaussian(0, 1.5));
  }
}

function draw() {
  updateCanvasSize();
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);

  let degree = degreeSlider.value();
  let coeffs = fitPolynomial(trainX, trainY, degree);
  let trainMSE = mse(trainX, trainY, coeffs);
  let valMSE   = mse(valX, valY, coeffs);

  // Fit label
  let label, labelCol;
  if (degree <= 2) {
    label = 'Underfitting — too simple';
    labelCol = color(200, 80, 50);
  } else if (degree <= 5) {
    label = 'Good Fit — captures the pattern';
    labelCol = color(50, 160, 80);
  } else {
    label = 'Overfitting — memorizes noise';
    labelCol = color(160, 50, 200);
  }
  colFit = labelCol;

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Overfitting vs. Underfitting', canvasWidth / 2, 8);

  drawAxes();
  drawTrueFunction();
  drawFitCurve(coeffs, colFit);

  // Validation points
  if (showValCheck.checked()) {
    for (let i = 0; i < N_val; i++) {
      let px = mapX(valX[i]), py = mapY(valY[i]);
      if (py > margin && py < drawHeight - margin / 2) {
        fill(colVal); noStroke();
        triangle(px - 5, py + 5, px + 5, py + 5, px, py - 5);
      }
    }
  }

  // Training points
  for (let i = 0; i < N_train; i++) {
    let px = mapX(trainX[i]), py = mapY(trainY[i]);
    if (py > margin && py < drawHeight - margin / 2) {
      fill(colTrain); noStroke(); circle(px, py, 8);
    }
  }

  // Fit label
  noStroke(); fill(labelCol);
  textAlign(CENTER, TOP); textSize(14);
  text(label + '  (degree ' + degree + ')', canvasWidth / 2, drawHeight - 34);

  // MSE display
  fill(60); textSize(12);
  text('Train MSE: ' + trainMSE.toFixed(3) + '   |   Val MSE: ' + valMSE.toFixed(3), canvasWidth / 2, drawHeight - 16);

  // Legend
  noStroke(); textAlign(LEFT, TOP); textSize(11);
  fill(colTrain); text('● Training data', margin, margin + 2);
  fill(colVal);   text('▲ Validation data', margin, margin + 18);
  fill(160);      text('— True function', margin, margin + 34);

  // Control labels
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Polynomial Degree: ' + degree, 10, drawHeight + 16);
}

function drawTrueFunction() {
  let steps = 200;
  stroke(180); strokeWeight(1.5); noFill();
  drawingContext.setLineDash([5, 4]);
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = xMin + (xMax - xMin) * i / steps;
    let y = trueY(x);
    if (y < yMin || y > yMax) continue;
    vertex(mapX(x), mapY(y));
  }
  endShape();
  drawingContext.setLineDash([]);
}

function drawFitCurve(coeffs, col) {
  let steps = 300;
  stroke(col); strokeWeight(2.5); noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = xMin + (xMax - xMin) * i / steps;
    let y = evalPoly(coeffs, x);
    if (y < yMin - 2 || y > yMax + 2) continue;
    vertex(mapX(x), mapY(constrain(y, yMin, yMax)));
  }
  endShape();
}

function drawAxes() {
  stroke(140); strokeWeight(1);
  line(margin, mapY(0), canvasWidth - margin, mapY(0));
  line(margin, margin, margin, drawHeight - margin / 2);
  for (let x = xMin; x <= xMax; x++) {
    let px = mapX(x);
    stroke(140); line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10); text(x, px, mapY(0) + 6);
  }
  for (let y = -10; y <= 12; y += 4) {
    let py = mapY(y);
    if (py < margin || py > drawHeight - margin / 2) continue;
    stroke(140); line(margin - 4, py, margin, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10); text(y, margin - 6, py);
  }
}

// ─── Polynomial helpers ───────────────────────────────────────────────────────
function evalPoly(c, x) {
  return c.reduce((sum, ci, i) => sum + ci * Math.pow(x, i), 0);
}

function mse(xs, ys, coeffs) {
  let sum = 0;
  for (let i = 0; i < xs.length; i++) {
    let e = ys[i] - evalPoly(coeffs, xs[i]);
    sum += e * e;
  }
  return sum / xs.length;
}

function fitPolynomial(xs, ys, degree) {
  let n = xs.length, d = degree + 1;
  let V = xs.map(x => Array.from({length: d}, (_, j) => Math.pow(x, j)));
  let VT = V[0].map((_, j) => V.map(row => row[j]));
  let A = matMul(VT, V);
  let b = matVec(VT, ys);
  return gaussElim(A, b);
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

function matVec(A, v) { return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0)); }

function gaussElim(A, b) {
  let n = b.length;
  let M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++)
      if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
    [M[col], M[maxRow]] = [M[maxRow], M[col]];
    if (Math.abs(M[col][col]) < 1e-12) M[col][col] = 1e-12;
    for (let row = 0; row < n; row++) {
      if (row === col) continue;
      let f = M[row][col] / M[col][col];
      for (let j = col; j <= n; j++) M[row][j] -= f * M[col][j];
    }
  }
  return M.map((row, i) => row[n] / row[i]);
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
