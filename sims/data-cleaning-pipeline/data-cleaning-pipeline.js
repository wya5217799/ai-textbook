// Data Cleaning Pipeline MicroSim
// Bloom Level: Understand (L2)
// Step-through of 4 data cleaning stages

let currentStep = 0;
let canvasWidth, canvasHeight;
let btnNext, btnPrev;

const STEPS = [
  { name: "Step 1: Raw Data", label: "Raw Data", color: [180, 80, 80] },
  { name: "Step 2: Detect Errors", label: "Detect Errors", color: [200, 130, 40] },
  { name: "Step 3: Handle Missing Values", label: "Handle Missing", color: [60, 130, 200] },
  { name: "Step 4: Normalize", label: "Normalize", color: [50, 160, 80] },
];

// Original raw dataset
const rawData = [
  { id: 1, age: 25,   income: 50000, score: 0.72, city: "NYC" },
  { id: 2, age: -5,   income: 62000, score: 0.88, city: "LA"  },   // error: negative age
  { id: 3, age: 31,   income: null,  score: 0.55, city: "NYC" },   // missing income
  { id: 4, age: 999,  income: 48000, score: 1.30, city: "CHI" },   // error: age 999, score>1
  { id: 5, age: 28,   income: 75000, score: null, city: "LA"  },   // missing score
];

const INCOME_MEAN = (62000 + 48000 + 75000) / 3; // mean of valid incomes
const SCORE_MEAN  = (0.72 + 0.88 + 0.55) / 3;    // mean of valid scores

// After step 2: errors flagged (rows 2 and 4 highlighted)
// After step 3: missing values imputed
const imputedData = [
  { id: 1, age: 25, income: 50000,        score: 0.72, city: "NYC" },
  { id: 3, age: 31, income: INCOME_MEAN,  score: 0.55, city: "NYC", imputed: "income" },
  { id: 5, age: 28, income: 75000,        score: SCORE_MEAN, city: "LA", imputed: "score" },
];

// After step 4: normalize age (18-60), income (0-100k), score (0-1) already scaled
function normalize(val, min, max) { return (val - min) / (max - min); }
const normalizedData = imputedData.map(r => ({
  id:     r.id,
  age:    normalize(r.age,    18, 60).toFixed(3),
  income: normalize(r.income, 30000, 100000).toFixed(3),
  score:  parseFloat(r.score).toFixed(3),
  city:   r.city,
  imputed: r.imputed,
}));

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  // Buttons
  btnPrev = createButton('◀ Prev');
  btnPrev.parent('main');
  btnPrev.style('margin', '8px 6px');
  btnPrev.style('padding', '7px 18px');
  btnPrev.style('font-size', '14px');
  btnPrev.style('cursor', 'pointer');
  btnPrev.mousePressed(() => { currentStep = max(0, currentStep - 1); redraw(); });

  btnNext = createButton('Next ▶');
  btnNext.parent('main');
  btnNext.style('margin', '8px 6px');
  btnNext.style('padding', '7px 18px');
  btnNext.style('font-size', '14px');
  btnNext.style('cursor', 'pointer');
  btnNext.mousePressed(() => { currentStep = min(STEPS.length - 1, currentStep + 1); redraw(); });

  noLoop();
}

function windowResized() {
  canvasWidth  = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function draw() {
  background(248);

  // Title
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Data Cleaning Pipeline", canvasWidth / 2, 14);

  drawStepIndicator();
  drawStepContent();
}

function drawStepIndicator() {
  let sw = (canvasWidth - 60) / STEPS.length;
  let sy = 55;
  let sh = 36;

  for (let i = 0; i < STEPS.length; i++) {
    let sx = 30 + i * sw;
    let active = (i === currentStep);
    let done   = (i < currentStep);

    if (active) {
      fill(...STEPS[i].color);
    } else if (done) {
      fill(180, 210, 180);
    } else {
      fill(220);
    }
    stroke(150);
    strokeWeight(1);
    rect(sx, sy, sw - 4, sh, 6);

    fill(active ? 255 : (done ? 50 : 100));
    noStroke();
    textSize(11);
    textAlign(CENTER, CENTER);
    text(STEPS[i].label, sx + (sw - 4) / 2, sy + sh / 2);

    // Connector arrow
    if (i < STEPS.length - 1) {
      fill(160);
      noStroke();
      let ax = sx + sw - 2;
      let ay = sy + sh / 2;
      triangle(ax, ay - 5, ax, ay + 5, ax + 6, ay);
    }
  }
}

function drawStepContent() {
  let cy = 115;

  switch (currentStep) {
    case 0: drawRawData(cy);     break;
    case 1: drawDetectErrors(cy);break;
    case 2: drawHandleMissing(cy);break;
    case 3: drawNormalize(cy);   break;
  }

  // Step description at bottom
  let desc = [
    "Raw data loaded from source. Inspect the table — notice potential issues: negative age, outlier age (999), score > 1.0, and missing values (null).",
    "Errors detected and flagged (red). Rows with age < 0, age > 120, or score > 1.0 are invalid and will be removed before further processing.",
    "Invalid rows removed. Missing values (null) imputed using column means: income ← mean(62k,48k,75k), score ← mean(0.72,0.88,0.55). Imputed cells shown in blue.",
    "Features normalized to [0,1] range using Min-Max scaling. Age: range [18,60]. Income: range [30k,100k]. Score: already in [0,1]. Blue cells were previously imputed.",
  ];
  fill(70);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text(desc[currentStep], 30, canvasHeight - 72, canvasWidth - 60, 60);
}

function drawRawData(cy) {
  let cols = ["ID", "Age", "Income", "Score", "City"];
  let rows = rawData.map(r => [r.id, r.age, r.income === null ? "null" : r.income, r.score === null ? "null" : r.score, r.city]);
  drawTable(cols, rows, cy, null, null);
}

function drawDetectErrors(cy) {
  let cols = ["ID", "Age", "Income", "Score", "City", "Status"];
  let errorRows = [1, 3]; // 0-indexed: rows with id 2 and 4
  let rows = rawData.map((r, i) => {
    let err = errorRows.includes(i);
    return [r.id, r.age, r.income === null ? "null" : r.income,
            r.score === null ? "null" : r.score, r.city,
            err ? "ERROR" : "OK"];
  });
  drawTable(cols, rows, cy, errorRows, null);
}

function drawHandleMissing(cy) {
  let cols = ["ID", "Age", "Income", "Score", "City"];
  let imputedCells = {};
  imputedData.forEach((r, ri) => {
    if (r.imputed === "income") imputedCells[ri + "," + 2] = true;
    if (r.imputed === "score")  imputedCells[ri + "," + 3] = true;
  });
  let rows = imputedData.map(r => [
    r.id, r.age,
    r.income === null ? "null" : r.income.toFixed(0),
    r.score  === null ? "null" : parseFloat(r.score).toFixed(2),
    r.city,
  ]);
  drawTable(cols, rows, cy, null, imputedCells);
}

function drawNormalize(cy) {
  let cols = ["ID", "Age (norm)", "Income (norm)", "Score", "City"];
  let imputedCells = {};
  normalizedData.forEach((r, ri) => {
    if (r.imputed === "income") imputedCells[ri + "," + 2] = true;
    if (r.imputed === "score")  imputedCells[ri + "," + 3] = true;
  });
  let rows = normalizedData.map(r => [r.id, r.age, r.income, r.score, r.city]);
  drawTable(cols, rows, cy, null, imputedCells);

  // Formula note
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text("Min-Max formula:  x_norm = (x - x_min) / (x_max - x_min)", 30, cy + 185);
}

function drawTable(cols, rows, y, errorRowIdxs, imputedCells) {
  let colW   = (canvasWidth - 60) / cols.length;
  let rowH   = 34;
  let tx     = 30;

  // Header
  fill(60, 90, 170);
  noStroke();
  rect(tx, y, canvasWidth - 60, rowH, 4, 4, 0, 0);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  for (let c = 0; c < cols.length; c++) {
    text(cols[c], tx + c * colW + colW / 2, y + rowH / 2);
  }

  // Data rows
  for (let r = 0; r < rows.length; r++) {
    let ry = y + (r + 1) * rowH;
    let isError = errorRowIdxs && errorRowIdxs.includes(r);

    if (isError) {
      fill(255, 220, 215);
    } else {
      fill(r % 2 === 0 ? 242 : 255, r % 2 === 0 ? 246 : 255, 255);
    }
    stroke(210);
    strokeWeight(1);
    rect(tx, ry, canvasWidth - 60, rowH);

    for (let c = 0; c < rows[r].length; c++) {
      let cellKey = r + "," + c;
      let isImputed = imputedCells && imputedCells[cellKey];
      let isErrorCell = isError && (cols[c] === "Status" || cols[c] === "Age" || cols[c] === "Score");

      if (isImputed) fill(40, 100, 200);
      else if (isError && cols[c] === "Status") fill(180, 40, 40);
      else fill(isError ? 140 : 40);

      noStroke();
      textSize(12);
      textAlign(CENTER, CENTER);
      text(String(rows[r][c]), tx + c * colW + colW / 2, ry + rowH / 2);
    }
  }

  // Border
  stroke(160);
  strokeWeight(1.5);
  noFill();
  rect(tx, y, canvasWidth - 60, (rows.length + 1) * rowH, 4);
  noStroke();
}
