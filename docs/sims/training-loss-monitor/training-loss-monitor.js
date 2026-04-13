// Training Loss Monitor
// Bloom Level: Analyze (L4)
// Animated training + validation loss curves over 50 epochs. Play/Pause.

let canvasWidth, canvasHeight;
let canvasEl;
let btnPlayPause;

const N_EPOCHS = 50;
let currentEpoch = 0;
let playing = false;
let lastFrameTime = 0;
const FRAME_INTERVAL = 80; // ms per epoch step

// Pre-compute training and validation loss curves
// Training: noisy exponential decay
// Validation: converges slightly higher (generalization gap)
let trainLoss = [];
let valLoss = [];

function buildLossCurves() {
  // Deterministic seed-like generation
  const rand = (() => {
    let s = 12345;
    return () => {
      s = (s * 1664525 + 1013904223) & 0xffffffff;
      return ((s >>> 0) / 0xffffffff);
    };
  })();

  trainLoss = [];
  valLoss = [];

  for (let e = 0; e < N_EPOCHS; e++) {
    const t = e / (N_EPOCHS - 1);
    // Exponential decay base
    const base = 2.5 * Math.exp(-3.5 * t) + 0.12;
    // Add noise
    const noise = (rand() - 0.5) * 0.15 * Math.exp(-2 * t);
    trainLoss.push(Math.max(0.05, base + noise));

    // Validation: slightly higher, similar shape but converges to higher floor
    const vBase = 2.8 * Math.exp(-3.0 * t) + 0.22;
    const vNoise = (rand() - 0.5) * 0.18 * Math.exp(-1.5 * t);
    valLoss.push(Math.max(0.10, vBase + vNoise));
  }
}

const CM = { top: 60, left: 65, right: 30, bottom: 55 };

function chartArea() {
  return {
    x: CM.left,
    y: CM.top,
    w: canvasWidth - CM.left - CM.right,
    h: canvasHeight - CM.top - CM.bottom - 55
  };
}

function epochToX(ep, ca) {
  return ca.x + (ep / (N_EPOCHS - 1)) * ca.w;
}

function lossToY(loss, ca) {
  const maxL = 2.8;
  const minL = 0.0;
  return ca.y + (1 - (loss - minL) / (maxL - minL)) * ca.h;
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 490;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');

  buildLossCurves();

  const btnY = canvasHeight - 45;
  btnPlayPause = createButton('Play');
  btnPlayPause.position(canvasWidth / 2 - 40, btnY);
  btnPlayPause.style('padding', '8px 24px');
  btnPlayPause.style('font-size', '14px');
  btnPlayPause.style('cursor', 'pointer');
  btnPlayPause.style('background', '#3a82c4');
  btnPlayPause.style('color', 'white');
  btnPlayPause.style('border', 'none');
  btnPlayPause.style('border-radius', '5px');
  btnPlayPause.mousePressed(togglePlayPause);
  btnPlayPause.parent(canvasEl.parent());

  textFont('Arial');
}

function togglePlayPause() {
  playing = !playing;
  if (playing && currentEpoch >= N_EPOCHS - 1) {
    currentEpoch = 0; // restart
  }
  btnPlayPause.html(playing ? 'Pause' : 'Play');
  btnPlayPause.style('background', playing ? '#c04040' : '#3a82c4');
}

function draw() {
  background(245, 248, 255);

  // Advance epoch
  if (playing) {
    const now = millis();
    if (now - lastFrameTime > FRAME_INTERVAL) {
      lastFrameTime = now;
      currentEpoch = min(currentEpoch + 1, N_EPOCHS - 1);
      if (currentEpoch >= N_EPOCHS - 1) {
        playing = false;
        btnPlayPause.html('Play');
        btnPlayPause.style('background', '#3a82c4');
      }
    }
  }

  const ca = chartArea();

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Training Loss Monitor', canvasWidth / 2, 10);

  // Chart background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(ca.x, ca.y, ca.w, ca.h);

  // Grid
  stroke(220);
  strokeWeight(0.5);
  const nGridX = 5;
  const nGridY = 7;
  for (let i = 0; i <= nGridX; i++) {
    const xg = ca.x + (i / nGridX) * ca.w;
    line(xg, ca.y, xg, ca.y + ca.h);
  }
  for (let i = 0; i <= nGridY; i++) {
    const yg = ca.y + (i / nGridY) * ca.h;
    line(ca.x, yg, ca.x + ca.w, yg);
  }

  // Epoch axis labels
  noStroke();
  fill(60, 80, 140);
  textSize(11);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= nGridX; i++) {
    const ep = Math.round((i / nGridX) * (N_EPOCHS - 1));
    text(ep, ca.x + (i / nGridX) * ca.w, ca.y + ca.h + 5);
  }

  // Loss axis labels
  const maxL = 2.8;
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= nGridY; i++) {
    const loss = maxL * (1 - i / nGridY);
    text(nf(loss, 1, 1), ca.x - 5, ca.y + (i / nGridY) * ca.h);
  }

  // Axis titles
  textAlign(CENTER, BOTTOM);
  fill(40, 60, 100);
  textSize(13);
  text('Epoch', ca.x + ca.w / 2, ca.y + ca.h + 42);
  push();
  translate(ca.x - 50, ca.y + ca.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Loss', 0, 0);
  pop();

  // Draw training loss curve (up to currentEpoch)
  if (currentEpoch > 0) {
    // Validation loss (draw first, behind)
    stroke(220, 100, 40);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let e = 0; e <= currentEpoch; e++) {
      vertex(epochToX(e, ca), lossToY(valLoss[e], ca));
    }
    endShape();

    // Training loss (draw on top)
    stroke(60, 120, 220);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let e = 0; e <= currentEpoch; e++) {
      vertex(epochToX(e, ca), lossToY(trainLoss[e], ca));
    }
    endShape();

    // Current epoch marker - train
    const cx = epochToX(currentEpoch, ca);
    const cyT = lossToY(trainLoss[currentEpoch], ca);
    const cyV = lossToY(valLoss[currentEpoch], ca);

    strokeWeight(2);
    stroke(60, 120, 220);
    fill(255);
    ellipse(cx, cyT, 10);

    stroke(220, 100, 40);
    fill(255);
    ellipse(cx, cyV, 10);

    // Vertical line at current epoch
    stroke(150, 150, 180, 150);
    strokeWeight(1);
    setLineDash([4, 3]);
    line(cx, ca.y, cx, ca.y + ca.h);
    setLineDash([]);
  }

  // Generalization gap annotation (after enough epochs)
  if (currentEpoch >= 30) {
    const ep = currentEpoch;
    const cx = epochToX(ep, ca);
    const cyT = lossToY(trainLoss[ep], ca);
    const cyV = lossToY(valLoss[ep], ca);
    const midY = (cyT + cyV) / 2;
    // Arrow / brace
    stroke(80, 80, 80, 160);
    strokeWeight(1);
    line(cx + 8, cyT, cx + 8, cyV);
    noStroke();
    fill(80, 80, 80);
    textSize(10);
    textAlign(LEFT, CENTER);
    text('Gap', cx + 12, midY);
  }

  // Info box
  const tl = currentEpoch < N_EPOCHS ? trainLoss[currentEpoch] : 0;
  const vl = currentEpoch < N_EPOCHS ? valLoss[currentEpoch] : 0;
  const boxW = 220;
  const boxH = 90;
  const boxX = ca.x + ca.w - boxW - 10;
  const boxY = ca.y + 10;
  fill(255, 255, 255, 230);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill(30, 40, 80);
  textSize(13);
  textAlign(LEFT, TOP);
  text(`Epoch: ${currentEpoch} / ${N_EPOCHS - 1}`, boxX + 10, boxY + 8);
  fill(60, 120, 220);
  text(`Train Loss:  ${nf(tl, 1, 4)}`, boxX + 10, boxY + 28);
  fill(220, 100, 40);
  text(`Val Loss:    ${nf(vl, 1, 4)}`, boxX + 10, boxY + 48);
  fill(100);
  textSize(10);
  text('Val > Train = generalization gap', boxX + 10, boxY + 72);

  // Legend
  const legX = ca.x + 10;
  const legY = ca.y + 10;
  stroke(60, 120, 220);
  strokeWeight(2.5);
  line(legX, legY + 8, legX + 30, legY + 8);
  noStroke();
  fill(40, 60, 100);
  textSize(12);
  textAlign(LEFT, CENTER);
  text('Training Loss', legX + 35, legY + 8);

  stroke(220, 100, 40);
  strokeWeight(2);
  line(legX, legY + 26, legX + 30, legY + 26);
  noStroke();
  fill(40, 60, 100);
  text('Validation Loss', legX + 35, legY + 26);

  // Bottom instruction
  noStroke();
  fill(100, 110, 130);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Press Play to animate training • Val loss converges higher than train loss (generalization gap)', canvasWidth / 2, canvasHeight - 5);

  // Reposition button
  btnPlayPause.position(canvasWidth / 2 - 40, canvasHeight - 45);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);
}
