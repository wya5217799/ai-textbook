// K-Fold Cross-Validation Process MicroSim
// Step-through showing fold rotation with per-fold errors and running average
// Bloom Level: Understand (L2) - Verb: explain
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 40;
let sliderLeftMargin = 160;

// Controls
let kSlider, prevBtn, nextBtn, animBtn;
let currentFold = 0;  // 0 = intro, 1..k = fold active, k+1 = summary
let isAnimating = false;
let animTimer = 0;
const ANIM_INTERVAL = 90; // frames between auto-steps

// Simulated fold errors (generated once per k change)
let k = 5;
let foldErrors = [];
let lastK = -1;

// Colors
let colTrain, colVal, colAvg;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colTrain = color(70, 130, 200);
  colVal   = color(220, 130, 50);
  colAvg   = color(50, 170, 90);

  kSlider = createSlider(3, 10, 5, 1);
  kSlider.position(sliderLeftMargin, drawHeight + 8);
  kSlider.size(canvasWidth - sliderLeftMargin - margin);

  prevBtn = createButton('◀ Prev Fold');
  prevBtn.position(10, drawHeight + 38);
  prevBtn.mousePressed(() => { if (currentFold > 0) currentFold--; isAnimating = false; animBtn.html('▶ Animate All'); });

  nextBtn = createButton('Next Fold ▶');
  nextBtn.position(120, drawHeight + 38);
  nextBtn.mousePressed(() => { stepForward(); isAnimating = false; animBtn.html('▶ Animate All'); });

  animBtn = createButton('▶ Animate All');
  animBtn.position(235, drawHeight + 38);
  animBtn.mousePressed(toggleAnimate);

  describe('K-fold cross-validation step-through showing fold rotation, per-fold errors, and average CV score', LABEL);
}

function generateFoldErrors(k) {
  // Simulate realistic-looking fold validation errors
  foldErrors = [];
  let base = random(0.8, 1.8);
  for (let i = 0; i < k; i++) {
    foldErrors.push(parseFloat((base + random(-0.3, 0.3)).toFixed(3)));
  }
}

function stepForward() {
  let totalSteps = k + 1; // 0=intro, 1..k=folds, k+1=summary displayed when fold==k
  if (currentFold < k) currentFold++;
}

function toggleAnimate() {
  isAnimating = !isAnimating;
  animBtn.html(isAnimating ? '⏸ Pause' : '▶ Animate All');
  if (isAnimating && currentFold >= k) { currentFold = 0; } // restart
}

function draw() {
  updateCanvasSize();
  kSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Regenerate errors when k changes
  k = kSlider.value();
  if (k !== lastK) {
    generateFoldErrors(k);
    currentFold = 0;
    isAnimating = false;
    animBtn.html('▶ Animate All');
    lastK = k;
  }

  // Animation
  if (isAnimating) {
    animTimer++;
    if (animTimer >= ANIM_INTERVAL) {
      animTimer = 0;
      if (currentFold < k) {
        currentFold++;
      } else {
        isAnimating = false;
        animBtn.html('▶ Animate All');
      }
    }
  }

  // Backgrounds
  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('K-Fold Cross-Validation  (k = ' + k + ')', canvasWidth / 2, 8);

  drawFoldBar();
  drawFoldMatrix();
  drawErrorPanel();
  drawExplanation();
  drawControlLabels();
}

// ─── Horizontal fold bar ──────────────────────────────────────────────────────
function drawFoldBar() {
  let barX = margin, barY = 48;
  let barW = canvasWidth - 2 * margin, barH = 36;
  let foldW = barW / k;

  for (let i = 0; i < k; i++) {
    let isVal = (currentFold > 0 && i === currentFold - 1);
    let col = isVal ? colVal : colTrain;
    fill(col); stroke('white'); strokeWeight(1.5);
    rect(barX + i * foldW, barY, foldW, barH, 2);
    noStroke(); fill('white');
    textAlign(CENTER, CENTER); textSize(11);
    text((isVal ? '▶ ' : '') + 'Fold ' + (i + 1), barX + (i + 0.5) * foldW, barY + barH / 2);
  }

  // Legend
  noStroke(); textAlign(LEFT, TOP); textSize(11);
  fill(colVal);   text('■ Validation', barX, barY + barH + 4);
  fill(colTrain); text('■ Training',   barX + 100, barY + barH + 4);
}

// ─── Grid matrix showing all folds across all iterations ─────────────────────
function drawFoldMatrix() {
  let gridX = margin, gridY = 105;
  let cellW = (canvasWidth - 2 * margin) / k;
  let cellH = 26;

  noStroke(); fill(100); textAlign(LEFT, TOP); textSize(12);
  text('Iteration:', gridX, gridY - 16);

  for (let fold = 0; fold < k; fold++) {
    // Row label
    noStroke(); fill(80);
    textAlign(RIGHT, CENTER); textSize(11);
    text('Iter ' + (fold + 1), gridX - 4, gridY + fold * cellH + cellH / 2);

    for (let i = 0; i < k; i++) {
      let isVal = (i === fold);
      let isPast = fold < currentFold - 1;
      let isCurrent = fold === currentFold - 1;
      let isFuture = fold >= currentFold;

      let col;
      if (isFuture) col = color(220);
      else if (isVal) col = isCurrent ? colVal : color(red(colVal), green(colVal), blue(colVal), 160);
      else col = isCurrent ? colTrain : color(red(colTrain), green(colTrain), blue(colTrain), 120);

      fill(col); stroke('white'); strokeWeight(1);
      rect(gridX + i * cellW, gridY + fold * cellH, cellW, cellH, 2);

      noStroke(); fill(isFuture ? color(160) : 'white');
      textAlign(CENTER, CENTER); textSize(10);
      text(isVal ? 'VAL' : 'train', gridX + (i + 0.5) * cellW, gridY + fold * cellH + cellH / 2);
    }

    // Error for completed rows
    if (fold < currentFold) {
      noStroke(); fill(colVal);
      textAlign(LEFT, CENTER); textSize(11);
      text('MSE=' + foldErrors[fold], gridX + k * cellW + 8, gridY + fold * cellH + cellH / 2);
    }
  }

  // Col headers
  for (let i = 0; i < k; i++) {
    noStroke(); fill(80); textAlign(CENTER, BOTTOM); textSize(10);
    text('F' + (i + 1), gridX + (i + 0.5) * cellW, gridY - 2);
  }
}

// ─── Error summary panel ──────────────────────────────────────────────────────
function drawErrorPanel() {
  if (currentFold === 0) return;

  let panelX = canvasWidth * 0.68;
  let panelY = 105;
  let panelW = canvasWidth - panelX - margin / 2;
  let panelH = drawHeight - panelY - margin;

  fill(255, 255, 240, 220); stroke('silver'); strokeWeight(1);
  rect(panelX, panelY, panelW, panelH, 4);

  noStroke(); fill(80); textAlign(CENTER, TOP); textSize(11);
  text('Fold Errors', panelX + panelW / 2, panelY + 4);

  let completed = min(currentFold, k);
  let barMaxW = panelW - 30;
  let maxErr = max(foldErrors) || 1;

  for (let i = 0; i < completed; i++) {
    let barY = panelY + 22 + i * 22;
    let barLen = map(foldErrors[i], 0, maxErr, 0, barMaxW);
    fill(colVal); noStroke();
    rect(panelX + 4, barY, barLen, 14, 2);
    noStroke(); fill(60); textAlign(LEFT, CENTER); textSize(10);
    text('F' + (i + 1) + ': ' + foldErrors[i], panelX + 4, barY + 7);
  }

  // Average
  if (completed > 0) {
    let avg = foldErrors.slice(0, completed).reduce((s, v) => s + v, 0) / completed;
    let avgY = panelY + 22 + completed * 22 + 6;
    noStroke(); fill(colAvg); textSize(11); textAlign(LEFT, TOP);
    text('Avg: ' + avg.toFixed(3), panelX + 4, avgY);
    if (completed === k) {
      fill(50, 150, 60); textSize(10);
      text('CV Score = ' + avg.toFixed(3), panelX + 4, avgY + 16);
    }
  }
}

// ─── Explanation text ─────────────────────────────────────────────────────────
function drawExplanation() {
  let msgs = [
    'Dataset is divided into ' + k + ' equal folds.\nClick "Next Fold" to start the first iteration.',
    ...Array.from({length: k}, (_, i) =>
      'Iteration ' + (i + 1) + ': Fold ' + (i + 1) + ' is the validation set.\n' +
      'Remaining ' + (k - 1) + ' folds are used for training.\n' +
      'Validation MSE = ' + (foldErrors[i] || '?'))
  ];

  let idx = min(currentFold, msgs.length - 1);
  let msg = msgs[idx];
  if (currentFold >= k) {
    let avg = foldErrors.reduce((s, v) => s + v, 0) / k;
    msg = 'All ' + k + ' folds complete!\nCV Score = mean of fold errors = ' + avg.toFixed(3) + '\nEvery data point was in the validation set exactly once.';
  }

  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(12);
  let lines = msg.split('\n');
  let msgY = drawHeight - 52;
  lines.forEach((line, i) => text(line, canvasWidth / 2, msgY + i * 16));
}

function drawControlLabels() {
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Number of folds k: ' + k, 10, drawHeight + 14);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  kSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
