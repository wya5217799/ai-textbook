// Matrix Representation in Machine Learning MicroSim
// Shows how datasets, parameters, and predictions map to matrix structures
// Bloom Level: Understand (L2) - Verb: interpret
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let sliderLeftMargin = 120;
let defaultTextSize = 14;

// View toggle
let viewMode = 'dataset'; // 'dataset' or 'matrix'
let toggleBtn;

// Hover state
let hoveredRow = -1;
let hoveredCol = -1;

// Sample dataset (5 rows, 3 features)
let data = [
  [2.1, 3.4, 1.2],
  [4.7, 1.8, 5.3],
  [3.0, 4.2, 2.8],
  [5.5, 2.1, 4.1],
  [1.6, 5.0, 3.7]
];

// Theta vector (weights): 3x1
let theta = [0.5, -0.3, 0.8];

// Colors
let colorX, colorTheta, colorYhat;

// Layout constants (calculated in setup)
let cellW, cellH;
let tableX, tableY;
let matrixX, matrixY;
let eqY;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  const mainElement = document.querySelector('main');
  canvas.parent(mainElement);

  colorX = color(70, 130, 200);       // blue for data matrix X
  colorTheta = color(50, 170, 90);    // green for theta
  colorYhat = color(220, 130, 50);    // orange for y-hat

  // Toggle button
  toggleBtn = createButton('Switch to Matrix View');
  toggleBtn.position(10, drawHeight + 10);
  toggleBtn.mousePressed(toggleView);

  describe('Interactive visualization showing how a dataset maps to matrix notation in machine learning', LABEL);
}

function draw() {
  updateCanvasSize();

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(18);
  text('Matrix Representation in Machine Learning', canvasWidth / 2, margin / 2 + 2);

  // Recalculate layout based on current canvas width
  cellW = min(70, (canvasWidth - 2 * margin) / 10);
  cellH = 32;

  if (viewMode === 'dataset') {
    drawDatasetView();
  } else {
    drawMatrixView();
  }

  drawEquation();
}

function drawDatasetView() {
  let cols = ['Feature 1', 'Feature 2', 'Feature 3'];
  let startX = canvasWidth / 2 - (cols.length * cellW * 1.5) / 2 - cellW;
  let startY = 55;

  // Header row background
  fill(colorX);
  noStroke();
  rect(startX, startY, cellW * 1.2, cellH);
  for (let j = 0; j < cols.length; j++) {
    fill(colorX);
    rect(startX + cellW * 1.2 + j * cellW * 1.3, startY, cellW * 1.3, cellH);
    fill('white');
    textAlign(CENTER, CENTER);
    textSize(12);
    text(cols[j], startX + cellW * 1.2 + (j + 0.5) * cellW * 1.3, startY + cellH / 2);
  }

  // Row index header
  fill(200, 200, 200);
  rect(startX, startY, cellW * 1.2, cellH);
  fill(80);
  textAlign(CENTER, CENTER);
  textSize(12);
  text('Sample', startX + cellW * 0.6, startY + cellH / 2);

  // Data rows
  for (let i = 0; i < data.length; i++) {
    let rowY = startY + (i + 1) * cellH;
    let isHovered = (hoveredRow === i);

    // Row index
    fill(isHovered ? color(240, 240, 200) : color(230, 230, 230));
    stroke('silver');
    strokeWeight(0.5);
    rect(startX, rowY, cellW * 1.2, cellH);
    noStroke();
    fill(80);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('x' + (i + 1), startX + cellW * 0.6, rowY + cellH / 2);

    // Data cells
    for (let j = 0; j < data[i].length; j++) {
      let cellX = startX + cellW * 1.2 + j * cellW * 1.3;
      let isHoveredCell = (hoveredRow === i && hoveredCol === j);
      fill(isHoveredCell ? color(255, 220, 150) : (isHovered ? color(240, 240, 200) : 'white'));
      stroke('silver');
      strokeWeight(0.5);
      rect(cellX, rowY, cellW * 1.3, cellH);
      noStroke();
      fill(isHoveredCell ? color(180, 80, 0) : 'black');
      textAlign(CENTER, CENTER);
      textSize(13);
      text(data[i][j].toFixed(1), cellX + cellW * 0.65, rowY + cellH / 2);

      // Show a_ij label on hover
      if (isHoveredCell) {
        fill(180, 80, 0);
        textSize(11);
        textAlign(CENTER, BOTTOM);
        text('a' + (i + 1) + ',' + (j + 1), cellX + cellW * 0.65, rowY);
      }
    }
  }

  // Label
  noStroke();
  fill(colorX);
  textAlign(CENTER, TOP);
  textSize(14);
  text('Dataset View  (hover over cells to see matrix indices)', canvasWidth / 2, startY + (data.length + 1) * cellH + 6);

  // Check mouse position for hover
  detectHover(startX + cellW * 1.2, startY + cellH, cellW * 1.3, cellH);
}

function drawMatrixView() {
  let startX = margin + 10;
  let startY = 55;
  let mCellW = min(52, (canvasWidth - 2 * margin) / 14);
  let mCellH = 30;

  // X matrix (5x3)
  drawMatrix(startX, startY, data, 'X', colorX, mCellW, mCellH, '(5×3)');

  // theta vector (3x1)
  let thetaX = startX + mCellW * 5 + 40;
  let thetaData = theta.map(v => [v]);
  drawMatrix(thetaX, startY, thetaData, 'θ', colorTheta, mCellW, mCellH, '(3×1)');

  // = y-hat (5x1)
  let yhat = data.map(row => row.reduce((sum, v, j) => sum + v * theta[j], 0));
  let yhatX = thetaX + mCellW * 2.5 + 55;
  let yhatData = yhat.map(v => [parseFloat(v.toFixed(2))]);
  drawMatrix(yhatX, startY, yhatData, 'ŷ', colorYhat, mCellW, mCellH, '(5×1)');

  // Operators
  noStroke();
  fill('black');
  textSize(22);
  textAlign(CENTER, CENTER);
  let opY = startY + (5 * mCellH) / 2;
  text('×', thetaX - 20, opY);
  text('=', yhatX - 25, opY);

  noStroke();
  fill(80);
  textAlign(CENTER, TOP);
  textSize(13);
  text('Matrix View: ŷ = Xθ', canvasWidth / 2, startY + 5 * mCellH + 8);
}

function drawMatrix(x, y, dataArr, label, col, cw, ch, dimLabel) {
  let rows = dataArr.length;
  let cols = dataArr[0].length;
  let matW = cols * cw;
  let matH = rows * ch;

  // Label
  noStroke();
  fill(col);
  textAlign(CENTER, BOTTOM);
  textSize(16);
  text(label, x + matW / 2, y - 2);
  textSize(11);
  text(dimLabel, x + matW / 2, y - 18);

  // Bracket left
  stroke(col);
  strokeWeight(2);
  noFill();
  let bw = 6;
  line(x - bw, y, x, y);
  line(x - bw, y, x - bw, y + matH);
  line(x - bw, y + matH, x, y + matH);

  // Bracket right
  line(x + matW + bw, y, x + matW, y);
  line(x + matW + bw, y, x + matW + bw, y + matH);
  line(x + matW + bw, y + matH, x + matW, y + matH);

  // Cells
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      let cx = x + j * cw;
      let cy = y + i * ch;
      noStroke();
      fill(red(col), green(col), blue(col), 30);
      rect(cx, cy, cw - 1, ch - 1);
      fill(col);
      textAlign(CENTER, CENTER);
      textSize(12);
      text(dataArr[i][j], cx + cw / 2, cy + ch / 2);
    }
  }
}

function drawEquation() {
  let eqY = drawHeight - 40;
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);

  // ŷ = X θ with colors
  let eqCenterX = canvasWidth / 2;
  let spacing = 22;

  fill('black');
  textSize(16);
  text('ŷ', eqCenterX - spacing * 2.5, eqY);
  text('=', eqCenterX - spacing, eqY);

  fill(colorX);
  text('X', eqCenterX, eqY);

  fill(colorTheta);
  text('θ', eqCenterX + spacing, eqY);

  fill(80);
  textSize(11);
  text('(prediction = features × weights)', eqCenterX, eqY + 18);

  // Color legend
  let legendX = 10;
  let legendY = drawHeight - 65;
  textSize(12);
  textAlign(LEFT, TOP);

  fill(colorX);
  text('■ X = Feature matrix (data)', legendX, legendY);
  fill(colorTheta);
  text('■ θ = Weight vector (parameters)', legendX, legendY + 16);
  fill(colorYhat);
  text('■ ŷ = Prediction vector', legendX, legendY + 32);
}

function detectHover(startX, startY, cw, ch) {
  hoveredRow = -1;
  hoveredCol = -1;
  if (mouseX > startX && mouseX < startX + cw * 3 &&
      mouseY > startY && mouseY < startY + ch * data.length) {
    hoveredRow = floor((mouseY - startY) / ch);
    hoveredCol = floor((mouseX - startX) / cw);
    if (hoveredRow >= data.length) hoveredRow = -1;
    if (hoveredCol >= 3) hoveredCol = -1;
  }
}

function toggleView() {
  if (viewMode === 'dataset') {
    viewMode = 'matrix';
    toggleBtn.html('Switch to Dataset View');
  } else {
    viewMode = 'dataset';
    toggleBtn.html('Switch to Matrix View');
  }
  hoveredRow = -1;
  hoveredCol = -1;
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
