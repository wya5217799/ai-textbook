// Convolution Operation Step-Through MicroSim
// 5×5 input grid, 3×3 filter, step-by-step convolution

let canvasWidth = 700;
let canvasHeight = 480;

// Grid data
let inputGrid = [
  [1, 2, 0, 1, 3],
  [0, 1, 3, 2, 1],
  [2, 3, 1, 0, 2],
  [1, 0, 2, 3, 1],
  [3, 1, 0, 2, 1]
];

let filter = [
  [1, 0, -1],
  [1, 0, -1],
  [1, 0, -1]
];

// Output feature map (3×3)
let outputGrid = Array.from({ length: 3 }, () => Array(3).fill(null));

let stepPos = 0; // 0..8 (3×3 = 9 positions)
let btnNext, btnPrev, btnReset;

// Precompute all step results
let stepResults = [];

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  precompute();
  buildButtons();
  windowResized();
}

function precompute() {
  stepResults = [];
  for (let row = 0; row < 3; row++) {
    for (let col = 0; col < 3; col++) {
      let products = [];
      let sum = 0;
      for (let fr = 0; fr < 3; fr++) {
        let rowProds = [];
        for (let fc = 0; fc < 3; fc++) {
          let inputVal = inputGrid[row + fr][col + fc];
          let filterVal = filter[fr][fc];
          let product = inputVal * filterVal;
          rowProds.push({ inputVal, filterVal, product });
          sum += product;
        }
        products.push(rowProds);
      }
      stepResults.push({ row, col, products, sum });
    }
  }
}

function buildButtons() {
  btnPrev = createButton('Prev');
  btnPrev.parent('main');
  btnPrev.style('margin', '8px 4px');
  btnPrev.style('padding', '8px 18px');
  btnPrev.style('font-size', '14px');
  btnPrev.style('cursor', 'pointer');
  btnPrev.mousePressed(() => {
    if (stepPos > 0) {
      stepPos--;
      rebuildOutput();
    }
  });

  btnNext = createButton('Next');
  btnNext.parent('main');
  btnNext.style('margin', '8px 4px');
  btnNext.style('padding', '8px 18px');
  btnNext.style('font-size', '14px');
  btnNext.style('cursor', 'pointer');
  btnNext.mousePressed(() => {
    if (stepPos < 9) {
      stepPos++;
      rebuildOutput();
    }
  });

  btnReset = createButton('Reset');
  btnReset.parent('main');
  btnReset.style('margin', '8px 4px');
  btnReset.style('padding', '8px 18px');
  btnReset.style('font-size', '14px');
  btnReset.style('cursor', 'pointer');
  btnReset.mousePressed(() => {
    stepPos = 0;
    outputGrid = Array.from({ length: 3 }, () => Array(3).fill(null));
  });
}

function rebuildOutput() {
  outputGrid = Array.from({ length: 3 }, () => Array(3).fill(null));
  for (let s = 0; s < stepPos; s++) {
    let sr = stepResults[s];
    outputGrid[sr.row][sr.col] = sr.sum;
  }
}

function windowResized() {
  canvasWidth = min(windowWidth, 860);
  canvasHeight = 480;
  resizeCanvas(canvasWidth, canvasHeight);
}

function drawGrid(data, rows, cols, x, y, cellSize, label, highlightRegion, highlightPos) {
  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  textStyle(BOLD);
  text(label, x + (cols * cellSize) / 2, y - 6);
  textStyle(NORMAL);

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let cx = x + c * cellSize;
      let cy = y + r * cellSize;
      let val = data[r][c];

      let isHighlighted = false;
      if (highlightRegion && highlightPos) {
        let { row, col } = highlightPos;
        isHighlighted = (r >= row && r < row + 3 && c >= col && c < col + 3);
      }

      // Cell background
      if (isHighlighted) {
        fill(255, 240, 160);
        stroke(220, 160, 0);
        strokeWeight(2);
      } else {
        fill(235, 240, 255);
        stroke(180, 190, 215);
        strokeWeight(1);
      }
      rect(cx, cy, cellSize, cellSize);

      // Value
      noStroke();
      fill(isHighlighted ? color(100, 60, 0) : color(40, 50, 80));
      textAlign(CENTER, CENTER);
      textSize(13);
      textStyle(isHighlighted ? BOLD : NORMAL);
      if (val !== null && val !== undefined) {
        text(val, cx + cellSize / 2, cy + cellSize / 2);
      }
      textStyle(NORMAL);
    }
  }
}

function drawOutputGrid(x, y, cellSize) {
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  textStyle(BOLD);
  text('Output (3×3)', x + (3 * cellSize) / 2, y - 6);
  textStyle(NORMAL);

  let currentStep = stepPos > 0 ? stepResults[stepPos - 1] : null;

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let cx = x + c * cellSize;
      let cy = y + r * cellSize;
      let val = outputGrid[r][c];
      let isCurrentOutput = currentStep && currentStep.row === r && currentStep.col === c;

      if (isCurrentOutput) {
        fill(100, 220, 130);
        stroke(40, 160, 70);
        strokeWeight(3);
      } else if (val !== null) {
        fill(200, 240, 210);
        stroke(100, 180, 120);
        strokeWeight(1.5);
      } else {
        fill(230, 232, 240);
        stroke(190, 195, 215);
        strokeWeight(1);
      }
      rect(cx, cy, cellSize, cellSize);
      noStroke();
      fill(isCurrentOutput ? color(20, 80, 30) : (val !== null ? color(30, 100, 50) : color(180, 185, 200)));
      textAlign(CENTER, CENTER);
      textSize(13);
      textStyle(isCurrentOutput ? BOLD : NORMAL);
      if (val !== null) text(val, cx + cellSize / 2, cy + cellSize / 2);
      textStyle(NORMAL);
    }
  }
}

function draw() {
  background(245, 247, 250);

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('Convolution Operation Step-Through', canvasWidth / 2, 10);
  textStyle(NORMAL);

  let cellSize = 46;
  let filterCellSize = 46;
  let gridTop = 60;

  // Layout: Input | Filter | Output side by side
  let inputX = 30;
  let filterX = inputX + 5 * cellSize + 40;
  let outputX = filterX + 3 * filterCellSize + 40;

  // Current step info
  let currentStepData = stepPos > 0 ? stepResults[stepPos - 1] : null;
  let highlightPos = stepPos > 0 ? { row: currentStepData.row, col: currentStepData.col } : null;
  let nextStepData = stepPos < 9 ? stepResults[stepPos] : null;

  // Draw Input Grid
  drawGrid(inputGrid, 5, 5, inputX, gridTop, cellSize, 'Input (5×5)', true, highlightPos || (nextStepData ? { row: nextStepData.row, col: nextStepData.col } : null));

  // Show "next" highlight if no current step yet
  if (stepPos === 0 && nextStepData) {
    // draw next region outline
    let nr = nextStepData.row;
    let nc = nextStepData.col;
    noFill();
    stroke(100, 160, 255);
    strokeWeight(3);
    rect(inputX + nc * cellSize, gridTop + nr * cellSize, cellSize * 3, cellSize * 3, 3);
  }

  // Highlight rectangle around active region
  if (highlightPos) {
    noFill();
    stroke(220, 140, 0);
    strokeWeight(3);
    rect(inputX + highlightPos.col * cellSize, gridTop + highlightPos.row * cellSize, cellSize * 3, cellSize * 3, 3);
  }

  // Draw Filter Grid
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(12);
  textStyle(BOLD);
  text('Filter (3×3)', filterX + (3 * filterCellSize) / 2, gridTop - 6);
  textStyle(NORMAL);

  for (let r = 0; r < 3; r++) {
    for (let c = 0; c < 3; c++) {
      let cx = filterX + c * filterCellSize;
      let cy = gridTop + r * filterCellSize;
      fill(220, 200, 255);
      stroke(140, 100, 200);
      strokeWeight(1.5);
      rect(cx, cy, filterCellSize, filterCellSize);
      noStroke();
      fill(80, 40, 140);
      textAlign(CENTER, CENTER);
      textSize(13);
      textStyle(BOLD);
      text(filter[r][c], cx + filterCellSize / 2, cy + filterCellSize / 2);
      textStyle(NORMAL);
    }
  }

  // Multiplication detail panel (between filter and output)
  let detailX = filterX;
  let detailY = gridTop + 3 * filterCellSize + 14;

  if (currentStepData) {
    fill(255, 255, 240);
    stroke(200, 190, 150);
    strokeWeight(1);
    rect(detailX, detailY, 3 * filterCellSize, 90, 6);

    noStroke();
    fill(80, 60, 20);
    textAlign(LEFT, TOP);
    textSize(10);
    textStyle(BOLD);
    text('Element-wise products:', detailX + 6, detailY + 6);
    textStyle(NORMAL);

    let parts = [];
    for (let fr = 0; fr < 3; fr++) {
      let rowStr = '';
      for (let fc = 0; fc < 3; fc++) {
        let { inputVal, filterVal, product } = currentStepData.products[fr][fc];
        rowStr += inputVal + '×(' + filterVal + ')=' + product;
        if (fc < 2) rowStr += '  ';
      }
      parts.push(rowStr);
    }
    for (let i = 0; i < parts.length; i++) {
      fill(60, 40, 10);
      textSize(9.5);
      text(parts[i], detailX + 6, detailY + 22 + i * 18);
    }

    fill(30, 120, 60);
    textSize(11);
    textStyle(BOLD);
    text('Sum = ' + currentStepData.sum, detailX + 6, detailY + 68);
    textStyle(NORMAL);
  }

  // Draw Output Grid
  drawOutputGrid(outputX, gridTop, cellSize);

  // Status / info bar
  let barY = canvasHeight - 100;
  fill(255, 255, 255, 230);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, barY, canvasWidth - 32, 80, 8);

  noStroke();
  fill(40, 60, 100);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);

  let stepLabel = 'Step ' + stepPos + ' / 9';
  text(stepLabel, 28, barY + 10);
  textStyle(NORMAL);
  textSize(11);
  fill(70, 80, 100);

  if (stepPos === 0) {
    text('Press "Next" to begin. The 3×3 filter slides over the 5×5 input.\nEach position: multiply element-wise, sum the products → one output cell.', 28, barY + 30, canvasWidth - 56, 50);
  } else if (stepPos < 9) {
    let pos = currentStepData;
    text('Filter at row=' + pos.row + ', col=' + pos.col + '. Computed sum=' + pos.sum + ' → output[' + pos.row + '][' + pos.col + ']. Press Next to continue.', 28, barY + 30, canvasWidth - 56, 50);
  } else {
    fill(30, 120, 60);
    textStyle(BOLD);
    text('Convolution complete! All 9 output values computed. Press Reset to start over.', 28, barY + 30, canvasWidth - 56, 50);
    textStyle(NORMAL);
  }

  // Step progress bar
  let barW = canvasWidth - 100;
  let barH = 6;
  let bx = 50;
  let by = barY - 14;
  fill(220, 225, 235);
  noStroke();
  rect(bx, by, barW, barH, 3);
  fill(80, 160, 100);
  rect(bx, by, (stepPos / 9) * barW, barH, 3);
}
