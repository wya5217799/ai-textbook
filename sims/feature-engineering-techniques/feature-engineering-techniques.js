// Feature Engineering Techniques MicroSim
// Bloom Level: Apply (L3)
// Shows 3 techniques: Min-Max Normalization, One-Hot Encoding, Log Transform

let activeTab = 0;
let canvasWidth, canvasHeight;
let tabBtns = [];

const TABS = ["Min-Max Normalization", "One-Hot Encoding", "Log Transform"];
const TAB_COLORS = [
  [52, 120, 210],
  [180, 80, 160],
  [40, 160, 90],
];

// --- Min-Max data ---
const rawValues = [200, 450, 1200, 850, 50, 975];
const mmMin = Math.min(...rawValues);
const mmMax = Math.max(...rawValues);
const normalizedValues = rawValues.map(v => ((v - mmMin) / (mmMax - mmMin)));

// --- One-Hot data ---
const categories = ["NYC", "LA", "CHI", "NYC", "LA", "CHI"];
const uniqueCats = ["NYC", "LA", "CHI"];

// --- Log Transform data ---
const skewedValues = [1, 5, 10, 50, 200, 800, 3000, 12000];

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  // Tab buttons
  for (let i = 0; i < TABS.length; i++) {
    let btn = createButton(TABS[i]);
    btn.parent('main');
    btn.style('margin', '6px 4px');
    btn.style('padding', '7px 16px');
    btn.style('font-size', '13px');
    btn.style('cursor', 'pointer');
    btn.style('border-radius', '4px');
    const idx = i;
    btn.mousePressed(() => { activeTab = idx; updateTabStyles(); redraw(); });
    tabBtns.push(btn);
  }
  updateTabStyles();
  noLoop();
}

function updateTabStyles() {
  for (let i = 0; i < tabBtns.length; i++) {
    let c = TAB_COLORS[i];
    if (i === activeTab) {
      tabBtns[i].style('background', `rgb(${c[0]},${c[1]},${c[2]})`);
      tabBtns[i].style('color', 'white');
      tabBtns[i].style('border', `2px solid rgb(${c[0]},${c[1]},${c[2]})`);
    } else {
      tabBtns[i].style('background', 'white');
      tabBtns[i].style('color', `rgb(${c[0]},${c[1]},${c[2]})`);
      tabBtns[i].style('border', `2px solid rgb(${c[0]},${c[1]},${c[2]})`);
    }
  }
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function draw() {
  background(248);

  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Feature Engineering Techniques", canvasWidth / 2, 14);

  switch (activeTab) {
    case 0: drawMinMax();   break;
    case 1: drawOneHot();   break;
    case 2: drawLogTransform(); break;
  }
}

// ---- Tab 0: Min-Max Normalization ----
function drawMinMax() {
  let tc = TAB_COLORS[0];
  let startY = 60;
  let cw = canvasWidth - 60;

  // Formula
  fill(...tc);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text("Formula:  x_norm = (x - x_min) / (x_max - x_min)", 30, startY);
  fill(80);
  textSize(11);
  text(`Data range: min = ${mmMin},  max = ${mmMax}`, 30, startY + 20);

  // Table
  let cols = ["Original Value", "Calculation", "Normalized [0,1]"];
  let rows = rawValues.map((v, i) => [
    v,
    `(${v} - ${mmMin}) / (${mmMax} - ${mmMin})`,
    normalizedValues[i].toFixed(4),
  ]);
  drawTableBasic(cols, rows, 30, startY + 46, cw, tc);

  // Bar chart
  let chartY = startY + 46 + (rows.length + 1) * 32 + 24;
  drawBarChart(normalizedValues, rawValues, chartY, tc);
}

function drawBarChart(normVals, origVals, y, tc) {
  let chartW = canvasWidth - 60;
  let chartH = 100;
  let barW   = chartW / normVals.length - 10;

  fill(200, 220, 240);
  stroke(180);
  strokeWeight(1);
  rect(30, y, chartW, chartH, 4);
  noStroke();

  for (let i = 0; i < normVals.length; i++) {
    let bx = 30 + i * (chartW / normVals.length) + 5;
    let bh = normVals[i] * (chartH - 20);
    let by = y + chartH - bh - 4;

    fill(...tc, 200);
    rect(bx, by, barW, bh, 3, 3, 0, 0);

    fill(30);
    textSize(10);
    textAlign(CENTER, BOTTOM);
    noStroke();
    text(normVals[i].toFixed(2), bx + barW / 2, by - 2);
    fill(80);
    textSize(9);
    textAlign(CENTER, TOP);
    text(origVals[i], bx + barW / 2, y + chartH + 2);
  }

  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  text("Normalized bar chart (original values shown below bars)", 30, y + chartH + 16);
}

// ---- Tab 1: One-Hot Encoding ----
function drawOneHot() {
  let tc = TAB_COLORS[1];
  let startY = 60;
  let cw = canvasWidth - 60;

  fill(...tc);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text("One-Hot Encoding converts categorical values into binary columns.", 30, startY);
  fill(80);
  textSize(11);
  text(`Categories: ${uniqueCats.join(', ')}  →  ${uniqueCats.length} binary columns`, 30, startY + 18);

  // Before table
  fill(60);
  textSize(12);
  text("Before:", 30, startY + 40);
  let beforeCols = ["Row", "City"];
  let beforeRows = categories.map((c, i) => [i + 1, c]);
  drawTableBasic(beforeCols, beforeRows, 30, startY + 58, cw * 0.28, tc);

  // After table
  fill(60);
  textSize(12);
  textAlign(LEFT, TOP);
  text("After (One-Hot Encoded):", 30 + cw * 0.32, startY + 40);
  let afterCols = ["Row", ...uniqueCats.map(c => `is_${c}`)];
  let afterRows = categories.map((cat, i) => {
    let row = [i + 1];
    for (let uc of uniqueCats) row.push(cat === uc ? 1 : 0);
    return row;
  });
  drawTableBasic(afterCols, afterRows, 30 + cw * 0.32, startY + 58, cw * 0.65, tc);

  // Explanation
  let ey = startY + 58 + (categories.length + 1) * 32 + 16;
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text("Each category gets its own binary column (0 or 1). Only one column is 1 per row.", 30, ey);
  text("This avoids implying ordinal relationship (e.g., NYC=1, LA=2, CHI=3 would be wrong).", 30, ey + 16);
  text("With K categories, use K-1 columns (drop one) to avoid the dummy variable trap.", 30, ey + 32);
}

// ---- Tab 2: Log Transform ----
function drawLogTransform() {
  let tc = TAB_COLORS[2];
  let startY = 60;
  let cw = canvasWidth - 60;

  fill(...tc);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text("Log Transform compresses skewed distributions. Formula:  x_log = log(x + 1)", 30, startY);
  fill(80);
  textSize(11);
  text("Useful when data spans many orders of magnitude (e.g., income, population).", 30, startY + 18);

  // Table
  let cols = ["Original x", "log(x + 1)", "Compression"];
  let rows = skewedValues.map(v => {
    let logV = Math.log(v + 1);
    let comp = ((v - logV) / v * 100).toFixed(0);
    return [v, logV.toFixed(3), `-${comp}%`];
  });
  drawTableBasic(cols, rows, 30, startY + 40, cw, tc);

  // Dual bar chart
  let chartY = startY + 40 + (rows.length + 1) * 32 + 16;
  drawLogChart(chartY, tc);
}

function drawLogChart(y, tc) {
  let chartW = canvasWidth - 60;
  let chartH = 110;
  let n = skewedValues.length;
  let sectionW = chartW / n;
  let barW     = sectionW * 0.32;

  // Background
  fill(240, 248, 240);
  stroke(190);
  strokeWeight(1);
  rect(30, y, chartW, chartH, 4);
  noStroke();

  let origMax = Math.max(...skewedValues);
  let logMax  = Math.log(Math.max(...skewedValues) + 1);

  for (let i = 0; i < n; i++) {
    let bx = 30 + i * sectionW + sectionW * 0.1;
    let origH = (skewedValues[i] / origMax) * (chartH - 24);
    let logH  = (Math.log(skewedValues[i] + 1) / logMax) * (chartH - 24);

    // Original bar
    fill(220, 120, 80, 200);
    rect(bx, y + chartH - origH - 4, barW, origH, 2, 2, 0, 0);

    // Log bar
    fill(...tc, 200);
    rect(bx + barW + 2, y + chartH - logH - 4, barW, logH, 2, 2, 0, 0);

    // x label
    fill(60);
    textSize(9);
    textAlign(CENTER, TOP);
    noStroke();
    text(skewedValues[i], bx + barW, y + chartH + 2);
  }

  // Legend
  fill(220, 120, 80);
  rect(30, y + chartH + 18, 12, 12, 2);
  fill(60);
  textSize(11);
  textAlign(LEFT, CENTER);
  noStroke();
  text("Original (skewed)", 46, y + chartH + 24);

  fill(...tc);
  rect(200, y + chartH + 18, 12, 12, 2);
  fill(60);
  text("Log-transformed (compressed)", 216, y + chartH + 24);
}

function drawTableBasic(cols, rows, x, y, w, tc) {
  let colW  = w / cols.length;
  let rowH  = 32;

  fill(...tc);
  noStroke();
  rect(x, y, w, rowH, 4, 4, 0, 0);
  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < cols.length; c++) {
    text(cols[c], x + c * colW + colW / 2, y + rowH / 2);
  }

  for (let r = 0; r < rows.length; r++) {
    let ry = y + (r + 1) * rowH;
    fill(r % 2 === 0 ? 245 : 255, r % 2 === 0 ? 248 : 255, 255);
    stroke(210);
    strokeWeight(1);
    rect(x, ry, w, rowH);
    fill(40);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    for (let c = 0; c < rows[r].length; c++) {
      text(String(rows[r][c]), x + c * colW + colW / 2, ry + rowH / 2);
    }
  }

  stroke(160);
  strokeWeight(1.5);
  noFill();
  rect(x, y, w, (rows.length + 1) * rowH, 4);
  noStroke();
}
