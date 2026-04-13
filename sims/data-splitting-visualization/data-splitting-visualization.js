// Data Splitting Visualization MicroSim
// Bloom Level: Apply (L3)
// Shows 100 data points split into Train / Validation / Test sets

let trainSlider, valSlider;
let canvasWidth, canvasHeight;
let points = [];
let trainPct = 70;
let valPct   = 15;
// testPct = 100 - trainPct - valPct

const TOTAL = 100;
const COLORS = {
  train: [52, 152, 219],
  val:   [231, 76, 60],
  test:  [46, 204, 113],
  bg:    [248, 248, 248],
};

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  // Seed reproducible layout
  randomSeed(42);
  for (let i = 0; i < TOTAL; i++) {
    points.push({ x: random(), y: random() });
  }

  // Train % slider
  let sliderDiv = createDiv('');
  sliderDiv.parent('main');
  sliderDiv.style('margin', '6px 10px');

  createSpan('Train %: ').parent(sliderDiv).style('font-size','13px');
  trainSlider = createSlider(40, 80, 70, 5);
  trainSlider.parent(sliderDiv);
  trainSlider.style('width', '200px');
  trainSlider.input(() => {
    trainPct = trainSlider.value();
    // Keep val+test reasonable
    let remaining = 100 - trainPct;
    if (valPct >= remaining) valPct = max(5, remaining - 5);
    valSlider.value(valPct);
    redraw();
  });

  createSpan('  ').parent(sliderDiv);

  createSpan('Val %: ').parent(sliderDiv).style('font-size','13px');
  valSlider = createSlider(5, 30, 15, 5);
  valSlider.parent(sliderDiv);
  valSlider.style('width', '150px');
  valSlider.input(() => {
    valPct = valSlider.value();
    let remaining = 100 - trainPct;
    if (valPct >= remaining) valPct = remaining - 5;
    valSlider.value(valPct);
    redraw();
  });

  noLoop();
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function draw() {
  background(...COLORS.bg);

  let testPct = 100 - trainPct - valPct;

  // Title
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Train / Validation / Test Split", canvasWidth / 2, 14);

  // Counts
  let trainN = Math.round(TOTAL * trainPct / 100);
  let valN   = Math.round(TOTAL * valPct   / 100);
  let testN  = TOTAL - trainN - valN;

  // --- Dot grid ---
  let gridX = 30, gridY = 60;
  let gridW = canvasWidth - 60;
  let gridH = 240;
  let cols  = 20, rows = 5;
  let cellW = gridW / cols;
  let cellH = gridH / rows;
  let r = min(cellW, cellH) * 0.38;

  for (let i = 0; i < TOTAL; i++) {
    let col = i % cols;
    let row = floor(i / cols);
    let cx  = gridX + col * cellW + cellW / 2;
    let cy  = gridY + row * cellH + cellH / 2;

    let c;
    if (i < trainN)          c = COLORS.train;
    else if (i < trainN + valN) c = COLORS.val;
    else                     c = COLORS.test;

    fill(...c);
    noStroke();
    ellipse(cx, cy, r * 2, r * 2);
  }

  // Divider lines
  let trainX = gridX + (trainN / cols) * cellW;
  // Simpler: draw vertical bands
  // Actually draw lines between sections using index-based columns
  let trainEndCol = trainN % cols === 0 ? trainN / cols : floor(trainN / cols);
  let valEndCol   = (trainN + valN) % cols === 0 ? (trainN + valN) / cols : floor((trainN + valN) / cols);

  stroke(60);
  strokeWeight(2);
  let dx1 = gridX + trainEndCol * cellW;
  let dx2 = gridX + valEndCol   * cellW;

  // Draw partial separators per row for cleaner look
  // Full vertical lines at section boundaries (approximate)
  drawingContext.setLineDash([6, 4]);
  if (trainN % cols === 0) {
    line(dx1, gridY, dx1, gridY + gridH);
  }
  if ((trainN + valN) % cols === 0) {
    line(dx2, gridY, dx2, gridY + gridH);
  }
  drawingContext.setLineDash([]);
  noStroke();

  // Grid border
  stroke(180);
  strokeWeight(1);
  noFill();
  rect(gridX, gridY, gridW, gridH, 4);
  noStroke();

  // --- Proportion bar ---
  let barY = gridY + gridH + 20;
  let barH = 36;

  let trainW = gridW * (trainPct / 100);
  let valW   = gridW * (valPct   / 100);
  let testW  = gridW - trainW - valW;

  fill(...COLORS.train);
  rect(gridX, barY, trainW, barH, 4, 0, 0, 4);
  fill(...COLORS.val);
  rect(gridX + trainW, barY, valW, barH);
  fill(...COLORS.test);
  rect(gridX + trainW + valW, barY, testW, barH, 0, 4, 4, 0);

  // Bar labels
  fill(255);
  textSize(13);
  textAlign(CENTER, CENTER);
  noStroke();
  if (trainW > 60) text(`Train ${trainPct}%`, gridX + trainW / 2, barY + barH / 2);
  if (valW > 50)   text(`Val ${valPct}%`, gridX + trainW + valW / 2, barY + barH / 2);
  if (testW > 50)  text(`Test ${testPct}%`, gridX + trainW + valW + testW / 2, barY + barH / 2);

  // Bar border
  stroke(150);
  strokeWeight(1);
  noFill();
  rect(gridX, barY, gridW, barH, 4);
  noStroke();

  // --- Legend & counts ---
  let legendY = barY + barH + 24;
  let items = [
    { label: "Training Set",   n: trainN, pct: trainPct, c: COLORS.train,
      desc: "Model learns parameters from this data." },
    { label: "Validation Set", n: valN,   pct: valPct,   c: COLORS.val,
      desc: "Tune hyperparameters; monitor for overfitting." },
    { label: "Test Set",       n: testN,  pct: testPct,  c: COLORS.test,
      desc: "Final unbiased evaluation — used once only." },
  ];

  let lx = gridX;
  let colW2 = gridW / 3;
  for (let item of items) {
    fill(...item.c);
    ellipse(lx + 10, legendY + 10, 16, 16);

    fill(30);
    textSize(13);
    textAlign(LEFT, TOP);
    noStroke();
    text(`${item.label}`, lx + 24, legendY);
    textSize(20);
    fill(...item.c);
    text(`${item.n} pts  (${item.pct}%)`, lx + 24, legendY + 16);
    textSize(10);
    fill(100);
    text(item.desc, lx + 24, legendY + 42, colW2 - 30);

    lx += colW2;
  }
}
