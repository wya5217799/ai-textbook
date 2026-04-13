// Regularization Effect Explorer MicroSim
// Shows how L1/L2 regularization with adjustable lambda simplifies an overfit polynomial
// Bloom Level: Apply (L3) - Verb: demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 390;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let sliderLeftMargin = 195;

// Controls
let degreeSlider, lambdaSlider, regTypeToggle, newDataBtn;
let regType = 'L2'; // 'L1' or 'L2'

// Data
let trainX = [], trainY = [];
let valX = [], valY = [];
let N_train = 20, N_val = 12;

// Plot
let xMin = -3, xMax = 3, yMin = -12, yMax = 14;

// Colors
let colTrain, colVal, colFit;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colTrain = color(70, 130, 200);
  colVal   = color(210, 120, 50);
  colFit   = color(160, 50, 200);

  generateData();

  degreeSlider = createSlider(1, 15, 10, 1);
  degreeSlider.position(sliderLeftMargin, drawHeight + 8);
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);

  // lambda slider: 0..100 mapped to 0..10 (log-like)
  lambdaSlider = createSlider(0, 100, 0, 1);
  lambdaSlider.position(sliderLeftMargin, drawHeight + 40);
  lambdaSlider.size(canvasWidth - sliderLeftMargin - margin);

  regTypeToggle = createButton('Switch to L1');
  regTypeToggle.position(10, drawHeight + 72);
  regTypeToggle.mousePressed(() => {
    regType = (regType === 'L2') ? 'L1' : 'L2';
    regTypeToggle.html('Switch to ' + (regType === 'L2' ? 'L1' : 'L2'));
  });

  newDataBtn = createButton('New Data');
  newDataBtn.position(130, drawHeight + 72);
  newDataBtn.mousePressed(generateData);

  describe('Regularization effect explorer: adjust lambda to see L1/L2 regularization simplify a polynomial fit', LABEL);
}

function trueY(x) { return 0.4 * x * x * x - x + 0.5; }

function generateData() {
  trainX = []; trainY = []; valX = []; valY = [];
  for (let i = 0; i < N_train; i++) {
    let x = random(-3, 3);
    trainX.push(x); trainY.push(trueY(x) + randomGaussian(0, 1.5));
  }
  for (let i = 0; i < N_val; i++) {
    let x = random(-3, 3);
    valX.push(x); valY.push(trueY(x) + randomGaussian(0, 1.5));
  }
}

function draw() {
  updateCanvasSize();
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);
  lambdaSlider.size(canvasWidth - sliderLeftMargin - margin);

  let degree = degreeSlider.value();
  let lambdaRaw = lambdaSlider.value();
  // Map 0..100 -> 0..10 with slight log curve
  let lambda = lambdaRaw === 0 ? 0 : pow(10, map(lambdaRaw, 1, 100, -2, 1));

  let coeffs = fitRegularized(trainX, trainY, degree, lambda, regType);
  let trainMSE = mseVal(trainX, trainY, coeffs);
  let valMSE   = mseVal(valX, valY, coeffs);
  let nonzero  = coeffs.slice(1).filter(c => Math.abs(c) > 1e-4).length;

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Regularization Effect Explorer (' + regType + ')', canvasWidth / 2, 8);

  drawAxes();
  drawTrueFunction();
  drawFitCurve(coeffs);
  drawDataPoints();
  drawCoeffBar(coeffs, degree);

  // MSE info
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(12);
  let infoStr = 'Train MSE: ' + trainMSE.toFixed(3) +
    '   Val MSE: ' + valMSE.toFixed(3);
  if (regType === 'L1') infoStr += '   Nonzero params: ' + nonzero + ' / ' + degree;
  text(infoStr, (margin + canvasWidth * 0.62) / 2, drawHeight - 16);

  // Stage annotation
  let stageLabel = lambda < 0.01 ? 'λ≈0: Overfit — large coefficients' :
                   lambda < 1    ? 'Moderate regularization — smoother curve' :
                                   'Heavy regularization — near flat line';
  fill(colFit); textSize(12);
  text(stageLabel, (margin + canvasWidth * 0.62) / 2, drawHeight - 32);

  // Control labels
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Polynomial degree: ' + degree, 10, drawHeight + 14);
  text('λ (' + regType + '): ' + (lambda < 0.001 ? '0' : lambda.toFixed(3)), 10, drawHeight + 46);
}

function drawDataPoints() {
  for (let i = 0; i < N_train; i++) {
    let px = mapX(trainX[i]), py = mapY(trainY[i]);
    if (py > margin && py < drawHeight - margin / 2) {
      fill(colTrain); noStroke(); circle(px, py, 8);
    }
  }
  for (let i = 0; i < N_val; i++) {
    let px = mapX(valX[i]), py = mapY(valY[i]);
    if (py > margin && py < drawHeight - margin / 2) {
      fill(colVal); noStroke();
      triangle(px - 5, py + 5, px + 5, py + 5, px, py - 5);
    }
  }
}

function drawTrueFunction() {
  stroke(180); strokeWeight(1.5); noFill();
  drawingContext.setLineDash([5, 4]);
  beginShape();
  for (let i = 0; i <= 200; i++) {
    let x = xMin + (xMax - xMin) * i / 200;
    let y = trueY(x);
    if (y < yMin || y > yMax) continue;
    vertex(mapX(x), mapY(y));
  }
  endShape();
  drawingContext.setLineDash([]);
}

function drawFitCurve(coeffs) {
  stroke(colFit); strokeWeight(2.5); noFill();
  beginShape();
  for (let i = 0; i <= 300; i++) {
    let x = xMin + (xMax - xMin) * i / 300;
    let y = evalPoly(coeffs, x);
    if (y < yMin - 2 || y > yMax + 2) continue;
    vertex(mapX(x), mapY(constrain(y, yMin, yMax)));
  }
  endShape();
}

// Bar chart of coefficient magnitudes on the right side
function drawCoeffBar(coeffs, degree) {
  let bx = canvasWidth * 0.64, by = margin;
  let bw = canvasWidth - bx - margin / 2, bh = drawHeight - margin * 1.5;

  fill(255, 255, 240, 200); stroke('silver'); strokeWeight(1);
  rect(bx, by, bw, bh, 3);

  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
  text('Coefficient magnitudes', bx + bw / 2, by + 2);

  let sliceCoeffs = coeffs.slice(1); // skip bias
  let maxAbs = max(sliceCoeffs.map(c => Math.abs(c))) || 1;
  let barH = (bh - 20) / max(sliceCoeffs.length, 1);

  for (let j = 0; j < sliceCoeffs.length; j++) {
    let c = sliceCoeffs[j];
    let isZero = Math.abs(c) < 1e-4;
    let barLen = map(Math.abs(c), 0, maxAbs, 0, bw - 30);
    let barY = by + 16 + j * barH;
    fill(isZero ? color(200) : (regType === 'L1' ? colTrain : colFit));
    noStroke();
    rect(bx + 4, barY + 1, barLen, max(barH - 3, 4), 2);
    fill(80); textAlign(LEFT, CENTER); textSize(9);
    text('θ' + (j + 1), bx + 4, barY + barH / 2);
  }
}

function drawAxes() {
  let plotRight = canvasWidth * 0.62;
  stroke(140); strokeWeight(1);
  line(margin, mapY(0), plotRight, mapY(0));
  line(margin, margin, margin, drawHeight - margin / 2);
  for (let x = xMin; x <= xMax; x++) {
    let px = mapX(x); if (px > plotRight) continue;
    stroke(140); line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10); text(x, px, mapY(0) + 6);
  }
  for (let y = -10; y <= 12; y += 4) {
    let py = mapY(y);
    if (py < margin || py > drawHeight - margin / 2) continue;
    stroke(140); line(margin - 4, py, margin, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10); text(y, margin - 6, py);
  }
  // Legend
  noStroke(); textAlign(LEFT, TOP); textSize(10);
  fill(colTrain); text('● Train', margin, margin + 2);
  fill(colVal);   text('▲ Val',   margin, margin + 16);
  fill(160);      text('— True',  margin, margin + 30);
}

// ─── Regularized polynomial fitting (ridge / approx lasso via soft-threshold) ─
function fitRegularized(xs, ys, degree, lambda, type) {
  let n = xs.length, d = degree + 1;
  let V = xs.map(x => Array.from({length: d}, (_, j) => Math.pow(x, j)));
  let VT = V[0].map((_, j) => V.map(row => row[j]));
  let A = matMul(VT, V);
  let b = matVec(VT, ys);

  // Add L2 regularization to diagonal (skip bias at index 0)
  for (let j = 1; j < d; j++) A[j][j] += lambda;

  let coeffs = gaussElim(A, b);

  // For L1, apply soft-thresholding as post-processing approximation
  if (type === 'L1') {
    for (let j = 1; j < coeffs.length; j++) {
      let c = coeffs[j];
      coeffs[j] = Math.sign(c) * max(0, Math.abs(c) - lambda * 0.3);
    }
  }
  return coeffs;
}

function evalPoly(c, x) { return c.reduce((s, ci, i) => s + ci * Math.pow(x, i), 0); }

function mseVal(xs, ys, coeffs) {
  let sum = 0;
  for (let i = 0; i < xs.length; i++) { let e = ys[i] - evalPoly(coeffs, xs[i]); sum += e * e; }
  return sum / xs.length;
}

function matMul(A, B) {
  let r = A.length, mid = B.length, c = B[0].length;
  let C = Array.from({length: r}, () => Array(c).fill(0));
  for (let i = 0; i < r; i++) for (let k = 0; k < mid; k++) for (let j = 0; j < c; j++) C[i][j] += A[i][k] * B[k][j];
  return C;
}

function matVec(A, v) { return A.map(row => row.reduce((s, a, j) => s + a * v[j], 0)); }

function gaussElim(A, b) {
  let n = b.length;
  let M = A.map((row, i) => [...row, b[i]]);
  for (let col = 0; col < n; col++) {
    let maxRow = col;
    for (let row = col + 1; row < n; row++) if (Math.abs(M[row][col]) > Math.abs(M[maxRow][col])) maxRow = row;
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

function mapX(x) { return map(x, xMin, xMax, margin, canvasWidth * 0.62); }
function mapY(y) { return map(y, yMin, yMax, drawHeight - margin / 2, margin); }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  degreeSlider.size(canvasWidth - sliderLeftMargin - margin);
  lambdaSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
