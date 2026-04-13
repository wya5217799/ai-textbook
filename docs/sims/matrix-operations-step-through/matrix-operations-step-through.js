// Matrix Operations Step-Through MicroSim
// Lets the student walk through matrix multiplication, transpose, and inverse step by step
// Bloom Level: Apply (L3) - Verb: calculate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 430;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 14;

// Operation modes
let opMode = 'multiply'; // 'multiply', 'transpose', 'inverse'
let opSelect;
let prevBtn, nextBtn, newBtn;

// Step tracking
let currentStep = 0;
let totalSteps = 0;

// Matrices
let A, B, C; // for multiply
let AT;       // for transpose
let invA, det; // for inverse

// Highlight state
let highlightRow = -1;
let highlightCol = -1;
let highlightOutRow = -1;
let highlightOutCol = -1;

// Color palette
let colA, colB, colC, colHL;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colA   = color(70, 130, 200);
  colB   = color(50, 170, 90);
  colC   = color(220, 130, 50);
  colHL  = color(255, 230, 100);

  generateMatrices();
  computeSteps();

  // Dropdown
  opSelect = createSelect();
  opSelect.position(10, drawHeight + 8);
  opSelect.option('Multiplication', 'multiply');
  opSelect.option('Transpose', 'transpose');
  opSelect.option('Inverse (2×2)', 'inverse');
  opSelect.changed(() => {
    opMode = opSelect.value();
    currentStep = 0;
    generateMatrices();
    computeSteps();
  });

  // Buttons
  prevBtn = createButton('◀ Prev');
  prevBtn.position(220, drawHeight + 8);
  prevBtn.mousePressed(() => { if (currentStep > 0) currentStep--; });

  nextBtn = createButton('Next ▶');
  nextBtn.position(300, drawHeight + 8);
  nextBtn.mousePressed(() => { if (currentStep < totalSteps - 1) currentStep++; });

  newBtn = createButton('New Matrices');
  newBtn.position(380, drawHeight + 8);
  newBtn.mousePressed(() => {
    currentStep = 0;
    generateMatrices();
    computeSteps();
  });

  describe('Step-through visualization of matrix multiplication, transpose, and inverse operations', LABEL);
}

function generateMatrices() {
  if (opMode === 'multiply') {
    // A: 2×3, B: 3×2
    A = randMatrix(2, 3);
    B = randMatrix(3, 2);
    C = multiplyMatrices(A, B);
  } else if (opMode === 'transpose') {
    A = randMatrix(3, 3);
    AT = transposeMatrix(A);
  } else {
    // 2×2 inverse
    A = randMatrix(2, 2);
    det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    if (Math.abs(det) < 0.5) {
      A[0][0] = floor(random(1, 5));
      A[1][1] = floor(random(1, 5));
      det = A[0][0] * A[1][1] - A[0][1] * A[1][0];
    }
    invA = [[A[1][1] / det, -A[0][1] / det],
            [-A[1][0] / det, A[0][0] / det]];
  }
}

function randMatrix(rows, cols) {
  let m = [];
  for (let i = 0; i < rows; i++) {
    m.push([]);
    for (let j = 0; j < cols; j++) {
      m[i].push(floor(random(1, 9)));
    }
  }
  return m;
}

function multiplyMatrices(a, b) {
  let rows = a.length, inner = b.length, cols = b[0].length;
  let result = Array.from({length: rows}, () => Array(cols).fill(0));
  for (let i = 0; i < rows; i++)
    for (let j = 0; j < cols; j++)
      for (let k = 0; k < inner; k++)
        result[i][j] += a[i][k] * b[k][j];
  return result;
}

function transposeMatrix(a) {
  return a[0].map((_, j) => a.map(row => row[j]));
}

function computeSteps() {
  if (opMode === 'multiply') {
    // Steps: one per output cell (2*2=4) + intro + final
    totalSteps = 1 + A.length * C[0].length + 1;
  } else if (opMode === 'transpose') {
    totalSteps = 1 + A.length * A[0].length + 1;
  } else {
    // inverse: intro, determinant, adjugate, divide, final
    totalSteps = 5;
  }
}

function draw() {
  updateCanvasSize();

  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(17);
  text('Matrix Operations Step-Through', canvasWidth / 2, 8);

  // Step counter
  textSize(13);
  fill(100);
  textAlign(RIGHT, TOP);
  text('Step ' + (currentStep + 1) + ' / ' + totalSteps, canvasWidth - margin, 8);

  if (opMode === 'multiply') drawMultiplyStep();
  else if (opMode === 'transpose') drawTransposeStep();
  else drawInverseStep();
}

// ─── MULTIPLY ───────────────────────────────────────────────────────────────
function drawMultiplyStep() {
  let cellW = 38, cellH = 32;
  let startY = 55;

  if (currentStep === 0) {
    drawExplainText('Matrix Multiplication: C = A × B\nHighlighted row (A) × column (B) → one cell of C.\nClick Next to step through each output cell.', 40);
    drawMatrixGrid(margin + 20, startY + 60, A, 'A', colA, cellW, cellH, -1, -1, false);
    drawMatrixGrid(margin + 20 + A[0].length * cellW + 80, startY + 60, B, 'B', colB, cellW, cellH, -1, -1, false);
    return;
  }

  let finalStep = totalSteps - 1;
  if (currentStep === finalStep) {
    drawMatrixGrid(margin + 20, startY, A, 'A', colA, cellW, cellH, -1, -1, false);
    let bx = margin + 20 + A[0].length * cellW + 70;
    drawMatrixGrid(bx, startY, B, 'B', colB, cellW, cellH, -1, -1, false);
    let cx = bx + B[0].length * cellW + 70;
    drawMatrixGrid(cx, startY, C, 'C = A×B', colC, cellW, cellH, -1, -1, false);
    drawExplainText('Complete! All output cells computed.', startY + A.length * cellH + 30);
    return;
  }

  // Step 1..N: which output cell
  let idx = currentStep - 1;
  let outRow = floor(idx / C[0].length);
  let outCol = idx % C[0].length;

  // Draw A with highlighted row
  drawMatrixGrid(margin + 20, startY, A, 'A', colA, cellW, cellH, outRow, -1, true);

  // Draw B with highlighted col
  let bx = margin + 20 + A[0].length * cellW + 70;
  drawMatrixGrid(bx, startY, B, 'B', colB, cellW, cellH, -1, outCol, false);

  // Draw C (partial)
  let cx = bx + B[0].length * cellW + 70;
  let partialC = C.map((row, r) =>
    row.map((v, c) => {
      let cellIdx = r * C[0].length + c;
      return cellIdx < currentStep ? v : null;
    })
  );
  drawMatrixGrid(cx, startY, partialC, 'C', colC, cellW, cellH, outRow, outCol, false);

  // Show dot product calculation
  let dotY = startY + A.length * cellH + 20;
  let dotParts = [];
  let dot = 0;
  for (let k = 0; k < A[0].length; k++) {
    dotParts.push(A[outRow][k] + '×' + B[k][outCol]);
    dot += A[outRow][k] * B[k][outCol];
  }

  noStroke();
  fill('black');
  textAlign(LEFT, TOP);
  textSize(14);
  text('c' + (outRow+1) + (outCol+1) + ' = ' + dotParts.join(' + ') + ' = ' + dot, margin + 20, dotY);

  // Operators
  noStroke(); fill('black'); textSize(20); textAlign(CENTER, CENTER);
  text('×', bx - 35, startY + A.length * cellH / 2);
  text('=', cx - 35, startY + A.length * cellH / 2);
}

// ─── TRANSPOSE ──────────────────────────────────────────────────────────────
function drawTransposeStep() {
  let cellW = 38, cellH = 32;
  let startY = 55;

  if (currentStep === 0) {
    drawExplainText('Matrix Transpose: swap rows and columns.\nElement A[i][j] moves to AT[j][i].\nClick Next to see each element move.', 40);
    drawMatrixGrid(canvasWidth / 2 - A[0].length * cellW / 2, startY + 70, A, 'A (original)', colA, cellW, cellH, -1, -1, false);
    return;
  }

  let finalStep = totalSteps - 1;
  if (currentStep === finalStep) {
    drawMatrixGrid(margin + 20, startY, A, 'A', colA, cellW, cellH, -1, -1, false);
    let atx = margin + 20 + A[0].length * cellW + 80;
    drawMatrixGrid(atx, startY, AT, 'A\u1D40 (transposed)', colC, cellW, cellH, -1, -1, false);
    drawExplainText('Transpose complete! Rows became columns.', startY + AT.length * cellH + 30);
    return;
  }

  let idx = currentStep - 1;
  let i = floor(idx / A[0].length);
  let j = idx % A[0].length;

  drawMatrixGrid(margin + 20, startY, A, 'A', colA, cellW, cellH, i, j, false);
  let atx = margin + 20 + A[0].length * cellW + 80;

  // Partial AT
  let partialAT = AT.map((row, r) =>
    row.map((v, c) => {
      let cellIdx = c * AT[0].length + r;
      return cellIdx < currentStep ? v : null;
    })
  );
  drawMatrixGrid(atx, startY, partialAT, 'A\u1D40', colC, cellW, cellH, j, i, false);

  let dotY = startY + A.length * cellH + 20;
  noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
  text('A[' + (i+1) + '][' + (j+1) + '] = ' + A[i][j] + '  →  A\u1D40[' + (j+1) + '][' + (i+1) + '] = ' + A[i][j], margin + 20, dotY);

  noStroke(); fill('black'); textSize(20); textAlign(CENTER, CENTER);
  text('→', atx - 40, startY + A.length * cellH / 2);
}

// ─── INVERSE ────────────────────────────────────────────────────────────────
function drawInverseStep() {
  let cellW = 48, cellH = 36;
  let startY = 60;
  let stages = [
    'Step 1: Start with 2×2 matrix A.\nWe want to find A⁻¹ such that A × A⁻¹ = I.',
    'Step 2: Calculate the determinant.\ndet(A) = a·d − b·c',
    'Step 3: Form the adjugate matrix.\nSwap diagonal elements; negate off-diagonal.',
    'Step 4: Divide adjugate by determinant.\nA⁻¹ = (1/det) × adjugate',
    'Step 5: Verify: A × A⁻¹ ≈ Identity matrix.'
  ];

  drawExplainText(stages[currentStep], 32);

  if (currentStep === 0) {
    drawMatrixGrid(canvasWidth / 2 - cellW, startY + 80, A, 'A', colA, cellW, cellH, -1, -1, false);
  } else if (currentStep === 1) {
    drawMatrixGrid(margin + 20, startY + 60, A, 'A', colA, cellW, cellH, -1, -1, false);
    noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(14);
    let detY = startY + 2 * cellH + 75;
    text('det(A) = ' + A[0][0] + '×' + A[1][1] + ' − ' + A[0][1] + '×' + A[1][0] + ' = ' + det.toFixed(1), margin + 20, detY);
  } else if (currentStep === 2) {
    drawMatrixGrid(margin + 20, startY + 55, A, 'A', colA, cellW, cellH, -1, -1, false);
    let adjugate = [[A[1][1], -A[0][1]], [-A[1][0], A[0][0]]];
    let adjX = margin + 20 + 2 * cellW + 80;
    drawMatrixGrid(adjX, startY + 55, adjugate, 'Adjugate', colB, cellW, cellH, -1, -1, false);
  } else if (currentStep === 3) {
    let invRound = invA.map(row => row.map(v => parseFloat(v.toFixed(2))));
    drawMatrixGrid(margin + 20, startY + 55, A, 'A', colA, cellW, cellH, -1, -1, false);
    let invX = margin + 20 + 2 * cellW + 80;
    drawMatrixGrid(invX, startY + 55, invRound, 'A⁻¹', colC, cellW, cellH, -1, -1, false);
    noStroke(); fill('black'); textAlign(LEFT, TOP); textSize(13);
    text('Each element ÷ det(' + det.toFixed(1) + ')', margin + 20, startY + 2 * cellH + 75);
  } else if (currentStep === 4) {
    // Verify: A × A⁻¹
    let product = multiplyMatrices(A, invA);
    let productRound = product.map(row => row.map(v => parseFloat(v.toFixed(1))));
    let invRound = invA.map(row => row.map(v => parseFloat(v.toFixed(2))));
    drawMatrixGrid(margin + 10, startY + 55, A, 'A', colA, cellW, cellH, -1, -1, false);
    let invX = margin + 10 + 2 * cellW + 50;
    drawMatrixGrid(invX, startY + 55, invRound, 'A⁻¹', colC, cellW, cellH, -1, -1, false);
    let prodX = invX + 2 * cellW + 60;
    drawMatrixGrid(prodX, startY + 55, productRound, 'A × A⁻¹', colB, cellW, cellH, -1, -1, false);

    noStroke(); fill('black'); textSize(20); textAlign(CENTER, CENTER);
    text('×', invX - 25, startY + cellH + 55);
    text('=', prodX - 28, startY + cellH + 55);
    noStroke(); fill(50, 160, 80); textSize(13); textAlign(LEFT, TOP);
    text('≈ Identity ✓', prodX, startY + 2 * cellH + 75);
  }
}

// ─── HELPERS ─────────────────────────────────────────────────────────────────
function drawMatrixGrid(x, y, data, label, col, cw, ch, hlRow, hlCol, hlEntireRow) {
  let rows = data.length;
  let cols = data[0].length;
  let matW = cols * cw;
  let matH = rows * ch;

  // Label
  noStroke(); fill(col);
  textAlign(CENTER, BOTTOM); textSize(14);
  text(label, x + matW / 2, y - 4);

  // Brackets
  stroke(col); strokeWeight(2); noFill();
  let bw = 5;
  line(x - bw, y, x, y); line(x - bw, y, x - bw, y + matH); line(x - bw, y + matH, x, y + matH);
  line(x + matW + bw, y, x + matW, y); line(x + matW + bw, y, x + matW + bw, y + matH); line(x + matW + bw, y + matH, x + matW, y + matH);

  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cx = x + j * cw;
      let cy = y + i * ch;
      let isHL = (hlEntireRow && i === hlRow) || (!hlEntireRow && i === hlRow && j === hlCol) || (hlCol >= 0 && j === hlCol && hlRow < 0);
      noStroke();
      fill(isHL ? colHL : color(red(col), green(col), blue(col), 25));
      rect(cx, cy, cw - 1, ch - 1, 2);
      fill(data[i][j] === null ? color(200) : (isHL ? color(100, 60, 0) : col));
      textAlign(CENTER, CENTER); textSize(14);
      text(data[i][j] === null ? '?' : data[i][j], cx + cw / 2, cy + ch / 2);
    }
  }
}

function drawExplainText(msg, y) {
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(13);
  let lines = msg.split('\n');
  lines.forEach((line, i) => text(line, canvasWidth / 2, y + i * 18));
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
