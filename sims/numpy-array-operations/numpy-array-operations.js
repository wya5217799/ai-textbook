// NumPy Array Operations Explorer MicroSim
// Shows 2x2 arrays A and B, lets student select operation and step through cell-by-cell
// Bloom: Apply (L3) / demonstrate — concrete numerical data visible at every step
//
// Layout:
//   drawHeight = 420
//   controlHeight = 80 (2 rows)
//   canvasHeight = 500

let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;
let sliderLeftMargin = 140;

// UI elements
let opSelect, stepButton, runButton, resetButton;

// Operation state
let currentOp = 0;
let stepIndex = -1;  // -1 = show full result, 0..3 = highlight step
let isAnimating = false;

const OPS = [
  { name: 'Element-wise Add',      sym: '+',  fn: (a, b) => a + b },
  { name: 'Element-wise Multiply', sym: '×',  fn: (a, b) => a * b },
  { name: 'Matrix Multiply',       sym: '·',  fn: null }, // special
  { name: 'Transpose A',           sym: 'Tᴬ', fn: null }, // special
  { name: 'Broadcasting Add',      sym: '+b', fn: null }  // special: A + row vector
];

// Fixed arrays
const A = [[1,2],[3,4]];
const B = [[5,6],[7,8]];
const ROW = [10, 20]; // for broadcasting

function computeResult(opIdx) {
  let R = [[0,0],[0,0]];
  if (opIdx === 0) { // element-wise add
    for (let r=0;r<2;r++) for (let c=0;c<2;c++) R[r][c] = A[r][c] + B[r][c];
  } else if (opIdx === 1) { // element-wise multiply
    for (let r=0;r<2;r++) for (let c=0;c<2;c++) R[r][c] = A[r][c] * B[r][c];
  } else if (opIdx === 2) { // matrix multiply
    for (let r=0;r<2;r++) for (let c=0;c<2;c++) {
      R[r][c] = A[r][0]*B[0][c] + A[r][1]*B[1][c];
    }
  } else if (opIdx === 3) { // transpose
    R = [[A[0][0],A[1][0]],[A[0][1],A[1][1]]];
  } else if (opIdx === 4) { // broadcasting
    for (let r=0;r<2;r++) for (let c=0;c<2;c++) R[r][c] = A[r][c] + ROW[c];
  }
  return R;
}

function stepFormula(opIdx, step) {
  let r = Math.floor(step/2), c = step%2;
  let result = computeResult(opIdx);
  if (opIdx === 0) return `C[${r},${c}] = A[${r},${c}] + B[${r},${c}] = ${A[r][c]} + ${B[r][c]} = ${result[r][c]}`;
  if (opIdx === 1) return `C[${r},${c}] = A[${r},${c}] × B[${r},${c}] = ${A[r][c]} × ${B[r][c]} = ${result[r][c]}`;
  if (opIdx === 2) return `C[${r},${c}] = A[${r},0]·B[0,${c}] + A[${r},1]·B[1,${c}] = ${A[r][0]}·${B[0][c]} + ${A[r][1]}·${B[1][c]} = ${result[r][c]}`;
  if (opIdx === 3) return `C[${c},${r}] = A[${r},${c}] = ${A[r][c]}  (rows ↔ cols)`;
  if (opIdx === 4) return `C[${r},${c}] = A[${r},${c}] + row[${c}] = ${A[r][c]} + ${ROW[c]} = ${result[r][c]}`;
  return '';
}

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Row 1 controls
  opSelect = createSelect();
  opSelect.parent(document.querySelector('main'));
  for (let op of OPS) opSelect.option(op.name);
  opSelect.position(10, drawHeight + 5);
  opSelect.changed(() => { currentOp = OPS.findIndex(o => o.name === opSelect.value()); resetSim(); });

  stepButton = createButton('Step ▶');
  stepButton.parent(document.querySelector('main'));
  stepButton.position(190, drawHeight + 5);
  stepButton.mousePressed(doStep);

  runButton = createButton('Show All');
  runButton.parent(document.querySelector('main'));
  runButton.position(260, drawHeight + 5);
  runButton.mousePressed(() => { stepIndex = 4; });

  resetButton = createButton('Reset');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(340, drawHeight + 5);
  resetButton.mousePressed(resetSim);

  describe('NumPy array operations explorer. Choose an operation and step through each cell computation.', LABEL);
}

function resetSim() {
  stepIndex = -1;
}

function doStep() {
  stepIndex = min(stepIndex + 1, 4);
}

function draw() {
  updateCanvasSize();

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('NumPy Array Operations Explorer', canvasWidth / 2, 8);

  // Subtitle: operation description
  fill('#444');
  textSize(14);
  let opIdx = currentOp;
  let opDescriptions = [
    'np.add(A, B)  →  element-wise addition',
    'np.multiply(A, B)  →  element-wise multiplication',
    'np.dot(A, B)  →  matrix multiplication (dot product)',
    'A.T  →  transpose (swap rows and columns)',
    'A + row_vector  →  broadcasting (row added to each row of A)'
  ];
  text(opDescriptions[opIdx], canvasWidth / 2, 36);

  // Array layout
  let cellSize = min(54, (canvasWidth - margin * 2) / 12);
  let gridSize = cellSize * 2;
  let spacing = cellSize * 1.3;

  // Center the three grids: A, op, B, =, C
  let totalW = gridSize * 3 + spacing * 4 + cellSize * 2;
  let startX = (canvasWidth - totalW) / 2;
  let gridY = 80;

  // Compute result
  let R = computeResult(opIdx);

  // Determine highlighted step cells
  let highlightA = new Set(), highlightB = new Set(), highlightR = new Set();
  let activeStep = stepIndex;

  if (activeStep >= 0) {
    for (let s = 0; s <= min(activeStep, 3); s++) {
      let sr = Math.floor(s/2), sc = s%2;
      if (opIdx === 2) {
        // matmul: highlight entire row of A and col of B
        highlightA.add(`${sr},0`); highlightA.add(`${sr},1`);
        highlightB.add(`0,${sc}`); highlightB.add(`1,${sc}`);
      } else if (opIdx === 3) {
        highlightA.add(`${sr},${sc}`);
      } else {
        highlightA.add(`${sr},${sc}`);
        highlightB.add(`${sr},${sc}`);
      }
      highlightR.add(`${sr},${sc}`);
    }
  }

  // Draw A
  let ax = startX;
  drawArrayLabel('A', ax, gridY - 22, gridSize);
  drawArrayLabel('shape: (2,2)', ax, gridY - 8, gridSize);
  drawGrid(A, ax, gridY, cellSize, '#4A90D9', highlightA, activeStep >= 0);

  // Operator symbol
  let opSymX = ax + gridSize + spacing * 0.4;
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text(OPS[opIdx].sym, opSymX, gridY + gridSize / 2);

  // Draw B or row vector
  let bx = ax + gridSize + spacing;
  if (opIdx === 3) {
    // No B for transpose
    fill(120);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(13);
    text('(no B\nfor transpose)', bx + cellSize, gridY + gridSize / 2);
  } else if (opIdx === 4) {
    // Broadcasting: show row vector
    drawArrayLabel('row = [10, 20]', bx, gridY - 22, gridSize);
    drawArrayLabel('shape: (2,)', bx, gridY - 8, gridSize);
    drawRowVector(ROW, bx, gridY + cellSize / 2, cellSize, highlightB, activeStep >= 0);
  } else {
    drawArrayLabel('B', bx, gridY - 22, gridSize);
    drawArrayLabel('shape: (2,2)', bx, gridY - 8, gridSize);
    drawGrid(B, bx, gridY, cellSize, '#27AE60', highlightB, activeStep >= 0);
  }

  // Equals
  let eqX = bx + gridSize + spacing * 0.4;
  fill(50);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(22);
  text('=', eqX, gridY + gridSize / 2);

  // Draw Result
  let rx = bx + gridSize + spacing;
  drawArrayLabel('C (result)', rx, gridY - 22, gridSize);
  drawArrayLabel('shape: (2,2)', rx, gridY - 8, gridSize);

  if (activeStep < 0) {
    // Show placeholder until stepped
    drawGrid([['-','-'],['-','-']], rx, gridY, cellSize, '#8E44AD', new Set(), false);
  } else {
    // Show computed cells up to current step
    let partial = [['-','-'],['-','-']];
    for (let s = 0; s <= min(activeStep, 3); s++) {
      let sr = Math.floor(s/2), sc = s%2;
      partial[sr][sc] = R[sr][sc];
    }
    drawGrid(partial, rx, gridY, cellSize, '#8E44AD', highlightR, true);
  }

  // Step formula display
  let formulaY = gridY + gridSize + 30;
  fill(255, 255, 245);
  stroke('#CCC');
  strokeWeight(1);
  rect(margin, formulaY, canvasWidth - margin * 2, 56, 8);

  fill(40);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(14);
  if (activeStep < 0) {
    text('Press "Step ▶" to trace each cell computation, or "Show All" to see the full result.', margin + 12, formulaY + 28);
  } else if (activeStep >= 4) {
    text('All cells computed!  Result C = ' + JSON.stringify(R).replace(/\[/g,'[').replace(/\]/g,']'), margin + 12, formulaY + 28);
  } else {
    text(stepFormula(opIdx, activeStep), margin + 12, formulaY + 28);
  }

  // Control bar: step counter label
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Step: ' + (activeStep < 0 ? '—' : (activeStep + 1) + '/4'), 400, drawHeight + 20);
  text('Operation:', 10, drawHeight + 55);

  // Reposition select on resize
  opSelect.position(80, drawHeight + 44);
  stepButton.position(190, drawHeight + 44);
  runButton.position(260, drawHeight + 44);
  resetButton.position(340, drawHeight + 44);
}

function drawArrayLabel(lbl, x, y, w) {
  fill(80);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(12);
  text(lbl, x, y);
}

function drawGrid(data, x, y, cellSize, baseColor, highlighted, dimUnlit) {
  for (let r = 0; r < 2; r++) {
    for (let c = 0; c < 2; c++) {
      let key = `${r},${c}`;
      let isHL = highlighted.has(key);
      let dim = dimUnlit && !isHL && highlighted.size > 0;
      let cx = x + c * cellSize;
      let cy = y + r * cellSize;

      if (dim) {
        fill(220);
        stroke(180);
      } else if (isHL) {
        fill(baseColor);
        stroke(lerpColor(color(baseColor), color('black'), 0.3));
      } else {
        fill(lerpColor(color(baseColor), color('white'), 0.6));
        stroke(lerpColor(color(baseColor), color('white'), 0.2));
      }
      strokeWeight(1.5);
      rect(cx, cy, cellSize - 2, cellSize - 2, 4);

      fill(dim ? 160 : (isHL ? 255 : 40));
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(15);
      text(String(data[r][c]), cx + cellSize / 2 - 1, cy + cellSize / 2 - 1);
    }
  }
}

function drawRowVector(data, x, y, cellSize, highlighted, dimUnlit) {
  for (let c = 0; c < 2; c++) {
    let key = `0,${c}`;
    let isHL = highlighted.has(key) || highlighted.has(`1,${c}`);
    let dim = dimUnlit && !isHL && highlighted.size > 0;
    let cx = x + c * cellSize;

    fill(dim ? 220 : (isHL ? '#27AE60' : lerpColor(color('#27AE60'), color('white'), 0.6)));
    stroke(dim ? 180 : '#27AE60');
    strokeWeight(1.5);
    rect(cx, y, cellSize - 2, cellSize - 2, 4);

    fill(dim ? 160 : (isHL ? 255 : 40));
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(15);
    text(String(data[c]), cx + cellSize / 2 - 1, y + cellSize / 2 - 1);
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
