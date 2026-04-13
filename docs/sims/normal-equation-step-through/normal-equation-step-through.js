// Normal Equation Step-Through MicroSim
// Walks through θ = (X^T X)^{-1} X^T y on a 4-point dataset
// Bloom Level: Apply (L3) - Verb: execute
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 60;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 13;

// Navigation
let prevBtn, nextBtn, randBtn;
let currentStep = 0;
const TOTAL_STEPS = 7;

// Dataset: 4 (x, y) pairs
let rawX, rawY;
// Computed matrices
let X, XT, XTX, XTXinv, XTy, theta;

// Colors
let colX, colXT, colXTX, colXTXinv, colXTy, colTheta, colHL;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colX      = color(70, 130, 200);
  colXT     = color(100, 160, 220);
  colXTX    = color(50, 170, 90);
  colXTXinv = color(30, 130, 70);
  colXTy    = color(200, 130, 50);
  colTheta  = color(180, 60, 180);
  colHL     = color(255, 235, 120);

  randomizeData();

  prevBtn = createButton('◀ Prev');
  prevBtn.position(10, drawHeight + 15);
  prevBtn.mousePressed(() => { if (currentStep > 0) currentStep--; });

  nextBtn = createButton('Next ▶');
  nextBtn.position(90, drawHeight + 15);
  nextBtn.mousePressed(() => { if (currentStep < TOTAL_STEPS - 1) currentStep++; });

  randBtn = createButton('Randomize Data');
  randBtn.position(180, drawHeight + 15);
  randBtn.mousePressed(() => { randomizeData(); currentStep = 0; });

  describe('Step-by-step normal equation computation for linear regression', LABEL);
}

function randomizeData() {
  // 4 integer x values, y from a linear relationship + small noise
  rawX = [floor(random(1, 3)), floor(random(3, 5)), floor(random(5, 7)), floor(random(7, 9))];
  rawY = rawX.map(x => round(1.5 * x + 2 + random(-1, 1)));

  // Design matrix X: [1, x] for each row
  X = rawX.map(x => [1, x]);

  // Compute all intermediate matrices
  XT      = transpose(X);                            // 2×4
  XTX     = matMul(XT, X);                          // 2×2
  XTXinv  = invert2x2(XTX);                        // 2×2
  XTy     = matVec(XT, rawY);                       // 2×1
  theta   = matVec(XTXinv, XTy);                   // 2×1
}

function draw() {
  updateCanvasSize();

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title & step counter
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Normal Equation Step-Through', canvasWidth / 2, 8);
  fill(100); textSize(13); textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' / ' + TOTAL_STEPS, canvasWidth - margin, 8);

  switch (currentStep) {
    case 0: drawStep0(); break;
    case 1: drawStep1(); break;
    case 2: drawStep2(); break;
    case 3: drawStep3(); break;
    case 4: drawStep4(); break;
    case 5: drawStep5(); break;
    case 6: drawStep6(); break;
  }
}

// ─── Step renderers ──────────────────────────────────────────────────────────

function drawStep0() {
  explain('Step 1: Raw data and design matrix X\nEach row: [1, x] to handle the intercept θ₀.', 34);

  // Data table
  let tx = margin + 10, ty = 80;
  drawTableHeader(['Sample', 'x', 'y'], tx, ty, [60, 50, 50], color(80));
  for (let i = 0; i < 4; i++) {
    drawTableRow([i + 1, rawX[i], rawY[i]], tx, ty + (i + 1) * 28, [60, 50, 50], color(50));
  }

  // Design matrix X
  let mx = tx + 220;
  drawMatrixWithLabel(mx, ty, X, 'X (design matrix)', colX, 45, 28, true, '4×2');
  // Annotation
  noStroke(); fill(colX); textSize(11); textAlign(LEFT, TOP);
  text('← column of 1s handles θ₀ (intercept)', mx + 115, ty + 8);
  text('← x values', mx + 115, ty + 36);
}

function drawStep1() {
  explain('Step 2: Compute Xᵀ (transpose of X)\n(Xᵀ)ᵢⱼ = Xⱼᵢ  — swap rows and columns.', 34);
  let mx = margin + 10, ty = 80;
  drawMatrixWithLabel(mx, ty, X, 'X', colX, 45, 28, true, '4×2');
  noStroke(); fill('black'); textSize(20); textAlign(CENTER, CENTER);
  text('→', mx + 2 * 45 + 30, ty + 2 * 28);
  let mx2 = mx + 2 * 45 + 65;
  drawMatrixWithLabel(mx2, ty, XT, 'Xᵀ', colXT, 45, 28, true, '2×4');
}

function drawStep2() {
  explain('Step 3: Compute XᵀX\nResult is a 2×2 symmetric matrix.', 34);
  let ty = 80;
  let mx = margin + 10;
  drawMatrixWithLabel(mx, ty, XT, 'Xᵀ', colXT, 40, 28, true, '2×4');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('×', mx + 4 * 40 + 18, ty + 28);
  let mx2 = mx + 4 * 40 + 38;
  drawMatrixWithLabel(mx2, ty, X, 'X', colX, 40, 28, true, '4×2');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('=', mx2 + 2 * 40 + 18, ty + 28);
  let mx3 = mx2 + 2 * 40 + 38;
  drawMatrixWithLabel(mx3, ty, XTX, 'XᵀX', colXTX, 55, 32, true, '2×2');

  // Show element calculation
  noStroke(); fill(60); textSize(12); textAlign(LEFT, TOP);
  let calcY = ty + 80;
  text('e.g. XᵀX[0][0] = Σ 1² = ' + XTX[0][0], mx3, calcY);
  text('XᵀX[0][1] = Σ xᵢ = ' + XTX[0][1], mx3, calcY + 16);
  text('XᵀX[1][1] = Σ xᵢ² = ' + XTX[1][1], mx3, calcY + 32);
}

function drawStep3() {
  explain('Step 4: Compute (XᵀX)⁻¹  — inverse of the 2×2 Gram matrix.\nFor [[a,b],[c,d]]:  inv = (1/det) × [[d,−b],[−c,a]]', 34);
  let ty = 90;
  let mx = margin + 10;
  drawMatrixWithLabel(mx, ty, XTX, 'XᵀX', colXTX, 55, 32, true, '2×2');

  let det = XTX[0][0] * XTX[1][1] - XTX[0][1] * XTX[1][0];
  noStroke(); fill(60); textSize(12); textAlign(LEFT, TOP);
  text('det = ' + XTX[0][0] + '×' + XTX[1][1] + ' − ' + XTX[0][1] + '×' + XTX[1][0] + ' = ' + det.toFixed(2), mx, ty + 80);

  let mx2 = mx + 2 * 55 + 55;
  let invRound = XTXinv.map(r => r.map(v => parseFloat(v.toFixed(3))));
  drawMatrixWithLabel(mx2, ty, invRound, '(XᵀX)⁻¹', colXTXinv, 65, 32, true, '2×2');
}

function drawStep4() {
  explain('Step 5: Compute Xᵀy\nMultiply the transposed design matrix by the target vector y.', 34);
  let ty = 90;
  let mx = margin + 10;
  drawMatrixWithLabel(mx, ty, XT, 'Xᵀ', colXT, 40, 28, true, '2×4');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('×', mx + 4 * 40 + 18, ty + 28);

  // y as column vector
  let mx2 = mx + 4 * 40 + 38;
  let yMat = rawY.map(v => [v]);
  drawMatrixWithLabel(mx2, ty, yMat, 'y', colXTy, 40, 28, true, '4×1');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('=', mx2 + 40 + 18, ty + 28);

  let mx3 = mx2 + 40 + 38;
  let XTyMat = [[round(XTy[0])], [round(XTy[1])]];
  drawMatrixWithLabel(mx3, ty, XTyMat, 'Xᵀy', colXTy, 55, 32, true, '2×1');

  noStroke(); fill(60); textSize(12); textAlign(LEFT, TOP);
  text('Xᵀy[0] = Σ yᵢ = ' + XTy[0].toFixed(1), mx3, ty + 80);
  text('Xᵀy[1] = Σ xᵢyᵢ = ' + XTy[1].toFixed(1), mx3, ty + 96);
}

function drawStep5() {
  explain('Step 6: θ = (XᵀX)⁻¹ Xᵀy\nMultiply to get the optimal parameter vector.', 34);
  let ty = 90;
  let mx = margin + 10;
  let invRound = XTXinv.map(r => r.map(v => parseFloat(v.toFixed(3))));
  drawMatrixWithLabel(mx, ty, invRound, '(XᵀX)⁻¹', colXTXinv, 65, 32, true, '2×2');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('×', mx + 2 * 65 + 18, ty + 32);

  let mx2 = mx + 2 * 65 + 38;
  let XTyMat = [[parseFloat(XTy[0].toFixed(1))], [parseFloat(XTy[1].toFixed(1))]];
  drawMatrixWithLabel(mx2, ty, XTyMat, 'Xᵀy', colXTy, 55, 32, true, '2×1');
  noStroke(); fill('black'); textSize(18); textAlign(CENTER, CENTER);
  text('=', mx2 + 55 + 18, ty + 32);

  let mx3 = mx2 + 55 + 38;
  let thetaRound = [[parseFloat(theta[0].toFixed(3))], [parseFloat(theta[1].toFixed(3))]];
  drawMatrixWithLabel(mx3, ty, thetaRound, 'θ', colTheta, 65, 32, true, '2×1');

  noStroke(); fill(colTheta); textSize(14); textAlign(LEFT, TOP);
  text('θ₀ (intercept) = ' + theta[0].toFixed(3), mx3, ty + 82);
  text('θ₁ (slope)     = ' + theta[1].toFixed(3), mx3, ty + 100);
}

function drawStep6() {
  explain('Step 7: Plot the regression line ŷ = θ₀ + θ₁x\nVerify it passes through the data cloud.', 34);

  // Mini scatter plot
  let px0 = margin + 10, py0 = 80;
  let pw = min(canvasWidth / 2 - 40, 300), ph = drawHeight - 140;

  let xMin = min(...rawX) - 1, xMax2 = max(...rawX) + 1;
  let yMin2 = min(...rawY) - 2, yMax2 = max(...rawY) + 2;

  // Axes
  stroke(140); strokeWeight(1);
  line(px0, py0 + ph, px0 + pw, py0 + ph);
  line(px0, py0, px0, py0 + ph);

  // Regression line
  let lx0 = xMin, lx1 = xMax2;
  let ly0 = theta[0] + theta[1] * lx0;
  let ly1 = theta[0] + theta[1] * lx1;
  let mpX = x => map(x, xMin, xMax2, px0, px0 + pw);
  let mpY = y => map(y, yMin2, yMax2, py0 + ph, py0);
  stroke(colTheta); strokeWeight(2.5);
  line(mpX(lx0), mpY(ly0), mpX(lx1), mpY(ly1));

  // Data points
  for (let i = 0; i < 4; i++) {
    fill(colX); noStroke();
    circle(mpX(rawX[i]), mpY(rawY[i]), 10);
  }

  // Equation
  noStroke(); fill(colTheta); textSize(14); textAlign(LEFT, TOP);
  let eqX = px0 + pw + 30;
  text('ŷ = ' + theta[0].toFixed(2) + ' + ' + theta[1].toFixed(2) + ' · x', eqX, py0 + 20);
  fill(60); textSize(12);
  text('θ₀ = ' + theta[0].toFixed(3) + ' (intercept)', eqX, py0 + 50);
  text('θ₁ = ' + theta[1].toFixed(3) + ' (slope)', eqX, py0 + 68);

  // Verify with predictions
  fill(80); textSize(11);
  text('Predictions:', eqX, py0 + 100);
  for (let i = 0; i < 4; i++) {
    let yhat = theta[0] + theta[1] * rawX[i];
    text('x=' + rawX[i] + ' → ŷ=' + yhat.toFixed(2) + ' (actual ' + rawY[i] + ')', eqX, py0 + 116 + i * 16);
  }
}

// ─── Matrix display helper ────────────────────────────────────────────────────
function drawMatrixWithLabel(x, y, data, label, col, cw, ch, showBrackets, dimLabel) {
  let rows = data.length, cols = data[0].length;
  let matW = cols * cw, matH = rows * ch;

  // Label
  noStroke(); fill(col);
  textAlign(CENTER, BOTTOM); textSize(13);
  text(label, x + matW / 2, y - 2);
  if (dimLabel) { textSize(10); text(dimLabel, x + matW / 2, y - 16); }

  if (showBrackets) {
    stroke(col); strokeWeight(2); noFill();
    let bw = 5;
    line(x - bw, y, x, y); line(x - bw, y, x - bw, y + matH); line(x - bw, y + matH, x, y + matH);
    line(x + matW + bw, y, x + matW, y); line(x + matW + bw, y, x + matW + bw, y + matH); line(x + matW + bw, y + matH, x + matW, y + matH);
  }

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cx = x + j * cw, cy = y + i * ch;
      noStroke(); fill(red(col), green(col), blue(col), 28);
      rect(cx, cy, cw - 1, ch - 1, 2);
      fill(col); textAlign(CENTER, CENTER); textSize(12);
      text(data[i][j], cx + cw / 2, cy + ch / 2);
    }
  }
}

function drawTableHeader(headers, x, y, widths, col) {
  let cx = x;
  for (let i = 0; i < headers.length; i++) {
    fill(col); noStroke();
    rect(cx, y, widths[i], 24, 2);
    fill('white'); textAlign(CENTER, CENTER); textSize(12);
    text(headers[i], cx + widths[i] / 2, y + 12);
    cx += widths[i];
  }
}

function drawTableRow(vals, x, y, widths, col) {
  let cx = x;
  for (let i = 0; i < vals.length; i++) {
    stroke('silver'); strokeWeight(0.5); fill(255);
    rect(cx, y, widths[i], 28);
    noStroke(); fill(col); textAlign(CENTER, CENTER); textSize(13);
    text(vals[i], cx + widths[i] / 2, y + 14);
    cx += widths[i];
  }
}

function explain(msg, y) {
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(13);
  let lines = msg.split('\n');
  lines.forEach((l, i) => text(l, canvasWidth / 2, y + i * 17));
}

// ─── Linear algebra ──────────────────────────────────────────────────────────
function transpose(M) { return M[0].map((_, j) => M.map(row => row[j])); }

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

function invert2x2(M) {
  let det = M[0][0] * M[1][1] - M[0][1] * M[1][0];
  if (Math.abs(det) < 1e-10) det = 1e-10;
  return [[M[1][1] / det, -M[0][1] / det], [-M[1][0] / det, M[0][0] / det]];
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
