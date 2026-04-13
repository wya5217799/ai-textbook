// Pooling Operations Comparison MicroSim
// 4×4 input grid, Max Pooling vs Average Pooling (2×2, stride 2)
// Highlight each 2×2 region in sync

let canvasWidth = 700;
let canvasHeight = 460;

// 4×4 input grid values
let inputGrid = [
  [3, 7, 1, 5],
  [2, 8, 4, 6],
  [5, 3, 9, 2],
  [1, 6, 4, 8]
];

// The four 2×2 regions (row, col of top-left corner)
let regions = [
  { row: 0, col: 0 },
  { row: 0, col: 2 },
  { row: 2, col: 0 },
  { row: 2, col: 2 }
];

let currentRegion = 0;
let btnPrev, btnNext, btnReset;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  buildButtons();
  windowResized();
}

function buildButtons() {
  btnPrev = createButton('Prev Region');
  btnPrev.parent('main');
  btnPrev.style('margin', '8px 4px');
  btnPrev.style('padding', '8px 18px');
  btnPrev.style('font-size', '14px');
  btnPrev.style('cursor', 'pointer');
  btnPrev.mousePressed(() => { if (currentRegion > 0) currentRegion--; });

  btnNext = createButton('Next Region');
  btnNext.parent('main');
  btnNext.style('margin', '8px 4px');
  btnNext.style('padding', '8px 18px');
  btnNext.style('font-size', '14px');
  btnNext.style('cursor', 'pointer');
  btnNext.mousePressed(() => { if (currentRegion < 3) currentRegion++; });

  btnReset = createButton('Reset');
  btnReset.parent('main');
  btnReset.style('margin', '8px 4px');
  btnReset.style('padding', '8px 18px');
  btnReset.style('font-size', '14px');
  btnReset.style('cursor', 'pointer');
  btnReset.mousePressed(() => { currentRegion = 0; });
}

function windowResized() {
  canvasWidth = min(windowWidth, 860);
  canvasHeight = 460;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getRegionValues(reg) {
  let vals = [];
  for (let r = reg.row; r < reg.row + 2; r++) {
    for (let c = reg.col; c < reg.col + 2; c++) {
      vals.push(inputGrid[r][c]);
    }
  }
  return vals;
}

function getMaxPoolOutput() {
  return regions.map(reg => max(getRegionValues(reg)));
}

function getAvgPoolOutput() {
  return regions.map(reg => {
    let vals = getRegionValues(reg);
    return (vals.reduce((a, b) => a + b, 0) / 4).toFixed(2);
  });
}

function drawInputGrid(x, y, cellSize) {
  let reg = regions[currentRegion];

  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(13);
  textStyle(BOLD);
  text('Input (4×4)', x + 2 * cellSize, y - 8);
  textStyle(NORMAL);

  for (let r = 0; r < 4; r++) {
    for (let c = 0; c < 4; c++) {
      let cx = x + c * cellSize;
      let cy = y + r * cellSize;
      let inRegion = (r >= reg.row && r < reg.row + 2 && c >= reg.col && c < reg.col + 2);

      if (inRegion) {
        fill(255, 235, 120);
        stroke(200, 150, 0);
        strokeWeight(2.5);
      } else {
        fill(230, 235, 250);
        stroke(180, 190, 215);
        strokeWeight(1);
      }
      rect(cx, cy, cellSize, cellSize);
      noStroke();
      fill(inRegion ? color(90, 50, 0) : color(40, 50, 80));
      textAlign(CENTER, CENTER);
      textSize(14);
      textStyle(inRegion ? BOLD : NORMAL);
      text(inputGrid[r][c], cx + cellSize / 2, cy + cellSize / 2);
      textStyle(NORMAL);
    }
  }

  // Highlight border around the active 2×2 region
  noFill();
  stroke(220, 130, 0);
  strokeWeight(3);
  rect(x + reg.col * cellSize, y + reg.row * cellSize, cellSize * 2, cellSize * 2, 2);
}

function drawOutputGrid(x, y, cellSize, values, label, currentIdx, accentColor) {
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, BOTTOM);
  textSize(13);
  textStyle(BOLD);
  text(label, x + cellSize, y - 8);
  textStyle(NORMAL);

  // 2×2 output
  let positions = [
    [0, 0], [0, 1],
    [1, 0], [1, 1]
  ];

  for (let i = 0; i < 4; i++) {
    let [row, col] = positions[i];
    let cx = x + col * cellSize;
    let cy = y + row * cellSize;
    let isCurrent = (i === currentIdx);

    if (isCurrent) {
      fill(accentColor);
      stroke(red(accentColor) * 0.6, green(accentColor) * 0.6, blue(accentColor) * 0.6);
      strokeWeight(3);
    } else if (i < currentIdx) {
      fill(red(accentColor) * 0.4 + 150, green(accentColor) * 0.4 + 150, blue(accentColor) * 0.4 + 150);
      stroke(red(accentColor) * 0.5 + 100, green(accentColor) * 0.5 + 100, blue(accentColor) * 0.5 + 100);
      strokeWeight(1.5);
    } else {
      fill(220, 225, 240);
      stroke(180, 190, 215);
      strokeWeight(1);
    }
    rect(cx, cy, cellSize, cellSize);
    noStroke();
    fill(isCurrent ? 255 : (i < currentIdx ? color(40, 60, 40) : color(160, 165, 180)));
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(isCurrent ? BOLD : NORMAL);
    if (i <= currentIdx) text(values[i], cx + cellSize / 2, cy + cellSize / 2);
    textStyle(NORMAL);
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
  text('Pooling Operations Comparison', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('2×2 Max Pooling vs Average Pooling — stride 2', canvasWidth / 2, 32);

  let cellSize = 58;
  let gridTop = 76;

  // Compute layout centered
  let inputW = 4 * cellSize;
  let outputW = 2 * cellSize;
  let gap = 40;
  let totalW = inputW + gap + outputW + gap + outputW;
  let startX = (canvasWidth - totalW) / 2;

  let inputX = startX;
  let maxX = startX + inputW + gap;
  let avgX = maxX + outputW + gap;

  // Input grid
  drawInputGrid(inputX, gridTop, cellSize);

  // Arrow to max pool
  stroke(80, 80, 120);
  strokeWeight(2);
  fill(80, 80, 120);
  let arrowY = gridTop + 2 * cellSize;
  line(inputX + inputW + 5, arrowY, maxX - 8, arrowY);
  triangle(maxX, arrowY, maxX - 10, arrowY - 5, maxX - 10, arrowY + 5);

  // Arrow to avg pool
  line(inputX + inputW + 5, arrowY, avgX - 8, arrowY);
  triangle(avgX, arrowY, avgX - 10, arrowY - 5, avgX - 10, arrowY + 5);

  let maxValues = getMaxPoolOutput();
  let avgValues = getAvgPoolOutput();

  drawOutputGrid(maxX, gridTop, cellSize, maxValues, 'Max Pool (2×2)', currentRegion, color(80, 160, 255));
  drawOutputGrid(avgX, gridTop, cellSize, avgValues, 'Avg Pool (2×2)', currentRegion, color(255, 130, 80));

  // Region detail panel
  let reg = regions[currentRegion];
  let vals = getRegionValues(reg);
  let mx = max(vals);
  let avg = (vals.reduce((a, b) => a + b, 0) / 4);

  let panelY = gridTop + 4 * cellSize + 20;
  fill(255, 255, 255, 235);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, panelY, canvasWidth - 32, 110, 8);

  noStroke();
  fill(40, 60, 100);
  textAlign(LEFT, TOP);
  textSize(13);
  textStyle(BOLD);
  text('Region ' + (currentRegion + 1) + ' / 4  (top-left corner: row=' + reg.row + ', col=' + reg.col + ')', 28, panelY + 10);
  textStyle(NORMAL);

  textSize(11.5);
  fill(60, 70, 100);
  text('Values in region: [' + vals.join(', ') + ']', 28, panelY + 34);

  fill(40, 100, 200);
  textStyle(BOLD);
  text('Max Pooling: max(' + vals.join(', ') + ') = ' + mx, 28, panelY + 56);
  textStyle(NORMAL);

  fill(200, 80, 40);
  textStyle(BOLD);
  text('Avg Pooling: (' + vals.join('+') + ') / 4 = ' + avg.toFixed(2), 28, panelY + 78);
  textStyle(NORMAL);

  // Region progress dots
  let dotY = panelY - 14;
  for (let i = 0; i < 4; i++) {
    if (i === currentRegion) {
      fill(100, 140, 220);
      stroke(70, 100, 180);
    } else if (i < currentRegion) {
      fill(160, 200, 160);
      stroke(120, 170, 120);
    } else {
      fill(210, 215, 230);
      stroke(180, 185, 210);
    }
    strokeWeight(1);
    ellipse(canvasWidth / 2 - 36 + i * 24, dotY, 12, 12);
  }
  noStroke();
  fill(100, 110, 130);
  textAlign(CENTER, CENTER);
  textSize(9.5);
  text('Region progress', canvasWidth / 2, dotY + 14);
}
