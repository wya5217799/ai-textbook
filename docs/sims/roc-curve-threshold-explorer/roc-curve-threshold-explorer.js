// ROC Curve Threshold Explorer
// Bloom Level: Analyze (L4)
// Draggable threshold on pre-computed sigmoid-shaped ROC curve. Shows TPR/FPR live.

let canvasWidth, canvasHeight;
let canvasEl;
let thresholdIdx = 50; // index into rocPoints (0-100)
let dragging = false;

const AUC = 0.82;
const N_POINTS = 101;

// Pre-compute a realistic sigmoid-shaped ROC curve
// FPR goes 0->1, TPR follows a curve that gives AUC~0.82
function buildROC() {
  const pts = [];
  for (let i = 0; i < N_POINTS; i++) {
    const t = i / (N_POINTS - 1); // t = FPR 0..1
    // Sigmoid-shaped curve: TPR = sigmoid(a*(t - b)) normalized
    // Using: TPR = 1 - (1/(1+exp(6*(t-0.1)))) mapped to [0,1]
    // Tuned to approximate AUC 0.82
    const tpr = 1 - 1 / (1 + Math.exp(5.5 * (t - 0.08)));
    const tprClamped = Math.min(1, Math.max(0, tpr));
    // Also add a little convexity via power transform
    const tprFinal = Math.min(1, tprClamped + 0.05 * (1 - tprClamped) * t);
    pts.push({ fpr: t, tpr: Math.min(1, tprFinal) });
  }
  // Ensure endpoints
  pts[0] = { fpr: 0, tpr: 0 };
  pts[N_POINTS - 1] = { fpr: 1, tpr: 1 };
  return pts;
}

let rocPoints;

const CM = { top: 60, left: 65, right: 30, bottom: 60 };

function chartArea() {
  return {
    x: CM.left,
    y: CM.top,
    w: canvasWidth - CM.left - CM.right,
    h: canvasHeight - CM.top - CM.bottom
  };
}

function rocToCanvas(fpr, tpr, ca) {
  return {
    px: ca.x + fpr * ca.w,
    py: ca.y + (1 - tpr) * ca.h
  };
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 480;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');
  rocPoints = buildROC();
  textFont('Arial');
}

function draw() {
  background(245, 248, 255);

  const ca = chartArea();
  const pt = rocPoints[thresholdIdx];

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('ROC Curve Threshold Explorer', canvasWidth / 2, 10);

  // Chart background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(ca.x, ca.y, ca.w, ca.h);

  // Grid
  stroke(220);
  strokeWeight(0.5);
  for (let i = 0; i <= 10; i++) {
    const xg = ca.x + (i / 10) * ca.w;
    const yg = ca.y + (i / 10) * ca.h;
    line(xg, ca.y, xg, ca.y + ca.h);
    line(ca.x, yg, ca.x + ca.w, yg);
  }

  // Diagonal reference line (random classifier)
  stroke(180, 180, 220);
  strokeWeight(1.5);
  setLineDash([6, 4]);
  line(ca.x, ca.y + ca.h, ca.x + ca.w, ca.y);
  setLineDash([]);
  noStroke();
  fill(160, 170, 200);
  textSize(10);
  textAlign(CENTER, CENTER);
  push();
  translate(ca.x + ca.w * 0.6, ca.y + ca.h * 0.45);
  rotate(-atan2(ca.h, ca.w));
  text('Random Classifier', 0, -8);
  pop();

  // AUC shading
  noStroke();
  fill(100, 180, 255, 40);
  beginShape();
  vertex(ca.x, ca.y + ca.h);
  for (let rp of rocPoints) {
    const c = rocToCanvas(rp.fpr, rp.tpr, ca);
    vertex(c.px, c.py);
  }
  vertex(ca.x + ca.w, ca.y + ca.h);
  endShape(CLOSE);

  // ROC curve
  stroke(60, 120, 220);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let rp of rocPoints) {
    const c = rocToCanvas(rp.fpr, rp.tpr, ca);
    vertex(c.px, c.py);
  }
  endShape();

  // Crosshairs at current threshold
  const cp = rocToCanvas(pt.fpr, pt.tpr, ca);
  stroke(220, 60, 60, 150);
  strokeWeight(1);
  setLineDash([4, 4]);
  line(cp.px, ca.y, cp.px, ca.y + ca.h);
  line(ca.x, cp.py, ca.x + ca.w, cp.py);
  setLineDash([]);

  // Draggable threshold marker
  const isDragging = dragging;
  strokeWeight(2.5);
  stroke(200, 40, 40);
  fill(isDragging ? color(255, 80, 80) : color(255, 100, 100));
  ellipse(cp.px, cp.py, 18);
  // Inner dot
  fill(200, 40, 40);
  noStroke();
  ellipse(cp.px, cp.py, 6);

  // Axis ticks and labels
  noStroke();
  fill(60, 80, 140);
  textSize(11);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 5; i++) {
    const v = i / 5;
    text(nf(v, 1, 1), ca.x + v * ca.w, ca.y + ca.h + 5);
  }
  textAlign(RIGHT, CENTER);
  for (let i = 0; i <= 5; i++) {
    const v = i / 5;
    text(nf(v, 1, 1), ca.x - 6, ca.y + (1 - v) * ca.h);
  }

  // Axis titles
  textAlign(CENTER, BOTTOM);
  fill(40, 60, 100);
  textSize(13);
  text('False Positive Rate (FPR)', ca.x + ca.w / 2, ca.y + ca.h + 48);
  push();
  translate(ca.x - 50, ca.y + ca.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('True Positive Rate (TPR)', 0, 0);
  pop();

  // Info box
  const boxW = 210;
  const boxH = 105;
  const boxX = ca.x + ca.w - boxW - 10;
  const boxY = ca.y + 10;
  fill(255, 255, 255, 230);
  stroke(160);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill(30, 40, 80);
  textSize(13);
  textAlign(LEFT, TOP);
  const threshVal = 1 - thresholdIdx / (N_POINTS - 1);
  text(`Threshold = ${nf(threshVal, 1, 2)}`, boxX + 10, boxY + 8);
  fill(60, 120, 220);
  text(`TPR (Sensitivity) = ${nf(pt.tpr, 1, 3)}`, boxX + 10, boxY + 28);
  fill(220, 80, 60);
  text(`FPR (1-Specificity) = ${nf(pt.fpr, 1, 3)}`, boxX + 10, boxY + 48);
  stroke(180);
  strokeWeight(0.5);
  line(boxX + 8, boxY + 70, boxX + boxW - 8, boxY + 70);
  noStroke();
  fill(30, 40, 80);
  textSize(14);
  text(`AUC = ${nf(AUC, 1, 2)}`, boxX + 10, boxY + 78);
  fill(100);
  textSize(10);
  text('(Area Under Curve)', boxX + 10, boxY + 95);

  // Drag instruction
  noStroke();
  fill(100, 110, 130);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Drag the red marker along the ROC curve to explore threshold effects', canvasWidth / 2, canvasHeight - 5);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function closestROCIndex(mx, my) {
  const ca = chartArea();
  let best = 0;
  let bestDist = Infinity;
  for (let i = 0; i < rocPoints.length; i++) {
    const c = rocToCanvas(rocPoints[i].fpr, rocPoints[i].tpr, ca);
    const d = dist(mx, my, c.px, c.py);
    if (d < bestDist) {
      bestDist = d;
      best = i;
    }
  }
  return best;
}

function mousePressed() {
  const ca = chartArea();
  const cp = rocToCanvas(rocPoints[thresholdIdx].fpr, rocPoints[thresholdIdx].tpr, ca);
  if (dist(mouseX, mouseY, cp.px, cp.py) <= 20) {
    dragging = true;
  }
}

function mouseDragged() {
  if (dragging) {
    thresholdIdx = closestROCIndex(mouseX, mouseY);
  }
}

function mouseReleased() {
  dragging = false;
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);
}
