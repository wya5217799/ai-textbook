// Interactive Confusion Matrix
// Bloom Level: Apply (L3)
// Sliders for TP/FP/FN/TN — live metrics below

let canvasWidth, canvasHeight;
let sliders = {};
let sliderLabels = ['TP', 'FP', 'FN', 'TN'];
let sliderColors = {
  TP: [80, 180, 80],
  FP: [220, 100, 60],
  FN: [220, 160, 60],
  TN: [80, 160, 220]
};
let canvasEl;

const MATRIX_SIZE = 200;
const CTRL_HEIGHT = 120;
const METRICS_HEIGHT = 100;
const TOP_PAD = 50;

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 500;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');

  const sliderStartY = MATRIX_SIZE + TOP_PAD + 20;
  const sliderW = min(canvasWidth - 80, 500);
  const sliderX = (canvasWidth - sliderW) / 2;

  sliderLabels.forEach((lbl, i) => {
    let sl = createSlider(0, 200, lbl === 'TP' ? 80 : lbl === 'TN' ? 90 : lbl === 'FP' ? 20 : 30, 1);
    sl.position(sliderX + 60, sliderStartY + i * 26);
    sl.style('width', (sliderW - 60) + 'px');
    sl.parent(canvasEl.parent());
    sliders[lbl] = sl;
  });

  textFont('Arial');
}

function getMetrics() {
  const TP = sliders.TP.value();
  const FP = sliders.FP.value();
  const FN = sliders.FN.value();
  const TN = sliders.TN.value();
  const total = TP + FP + FN + TN;
  const accuracy  = total > 0 ? (TP + TN) / total : 0;
  const precision = (TP + FP) > 0 ? TP / (TP + FP) : 0;
  const recall    = (TP + FN) > 0 ? TP / (TP + FN) : 0;
  const f1 = (precision + recall) > 0 ? 2 * precision * recall / (precision + recall) : 0;
  return { TP, FP, FN, TN, accuracy, precision, recall, f1 };
}

function draw() {
  background(245, 248, 255);

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Interactive Confusion Matrix', canvasWidth / 2, 12);

  const m = getMetrics();

  // Draw 2x2 matrix centered
  const matX = (canvasWidth - MATRIX_SIZE * 2 - 60) / 2 + 60;
  const matY = TOP_PAD;
  const cellW = MATRIX_SIZE;
  const cellH = MATRIX_SIZE / 2;

  // Axis labels
  textSize(12);
  textAlign(CENTER, CENTER);
  fill(40, 60, 100);

  // Column headers: Predicted Positive / Predicted Negative
  text('Predicted Positive', matX + cellW / 2, matY - 18);
  text('Predicted Negative', matX + cellW + cellW / 2, matY - 18);

  // Row headers: Actual Positive / Actual Negative
  push();
  translate(matX - 18, matY + cellH / 2);
  rotate(-HALF_PI);
  text('Actual Positive', 0, 0);
  pop();
  push();
  translate(matX - 18, matY + cellH + cellH / 2);
  rotate(-HALF_PI);
  text('Actual Negative', 0, 0);
  pop();

  // Cells
  const cells = [
    { lbl: 'TP', val: m.TP, col: sliderColors.TP, x: matX,         y: matY },
    { lbl: 'FP', val: m.FP, col: sliderColors.FP, x: matX + cellW, y: matY },
    { lbl: 'FN', val: m.FN, col: sliderColors.FN, x: matX,         y: matY + cellH },
    { lbl: 'TN', val: m.TN, col: sliderColors.TN, x: matX + cellW, y: matY + cellH }
  ];

  const descriptions = { TP: 'True Positive', FP: 'False Positive', FN: 'False Negative', TN: 'True Negative' };

  for (let c of cells) {
    strokeWeight(2);
    stroke(80);
    fill(c.col[0], c.col[1], c.col[2], 180);
    rect(c.x, c.y, cellW, cellH, 4);
    noStroke();
    fill(20);
    textSize(22);
    textAlign(CENTER, CENTER);
    text(c.val, c.x + cellW / 2, c.y + cellH / 2 - 10);
    textSize(11);
    fill(50);
    text(c.lbl + ' — ' + descriptions[c.lbl], c.x + cellW / 2, c.y + cellH / 2 + 14);
  }

  // Slider labels drawn on canvas (not DOM, just decoration)
  const sliderStartY = MATRIX_SIZE + TOP_PAD + 20;
  const sliderW = min(canvasWidth - 80, 500);
  const sliderX = (canvasWidth - sliderW) / 2;

  sliderLabels.forEach((lbl, i) => {
    fill(sliderColors[lbl][0], sliderColors[lbl][1], sliderColors[lbl][2]);
    textSize(13);
    textAlign(RIGHT, CENTER);
    text(lbl + ': ' + sliders[lbl].value(), sliderX + 54, sliderStartY + i * 26 + 9);
  });

  // Metrics display
  const metricsY = sliderStartY + sliderLabels.length * 26 + 20;
  const mW = 110;
  const mGap = 14;
  const totalMW = 4 * mW + 3 * mGap;
  const mStartX = (canvasWidth - totalMW) / 2;

  const metricsDefs = [
    { name: 'Accuracy',  val: m.accuracy,  formula: '(TP+TN)/All', col: [80, 160, 80] },
    { name: 'Precision', val: m.precision, formula: 'TP/(TP+FP)',   col: [200, 100, 40] },
    { name: 'Recall',    val: m.recall,    formula: 'TP/(TP+FN)',   col: [180, 140, 30] },
    { name: 'F1 Score',  val: m.f1,        formula: '2·P·R/(P+R)', col: [60, 120, 200] }
  ];

  metricsDefs.forEach((md, i) => {
    const bx = mStartX + i * (mW + mGap);
    strokeWeight(1.5);
    stroke(md.col[0] * 0.6, md.col[1] * 0.6, md.col[2] * 0.6);
    fill(md.col[0], md.col[1], md.col[2], 40);
    rect(bx, metricsY, mW, 72, 6);
    noStroke();
    fill(md.col[0] * 0.7, md.col[1] * 0.7, md.col[2] * 0.7);
    textSize(12);
    textAlign(CENTER, TOP);
    text(md.name, bx + mW / 2, metricsY + 6);
    fill(20);
    textSize(24);
    textAlign(CENTER, TOP);
    text(nf(md.val, 1, 3), bx + mW / 2, metricsY + 24);
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text(md.formula, bx + mW / 2, metricsY + 54);
  });
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);

  const sliderStartY = MATRIX_SIZE + TOP_PAD + 20;
  const sliderW = min(canvasWidth - 80, 500);
  const sliderX = (canvasWidth - sliderW) / 2;

  sliderLabels.forEach((lbl, i) => {
    sliders[lbl].position(sliderX + 60, sliderStartY + i * 26);
    sliders[lbl].style('width', (sliderW - 60) + 'px');
  });
}
