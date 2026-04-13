// K-Value Effect Explorer (KNN)
// Bloom Level: Apply (L3)
// Fixed 20 training points, slider for K, click to test predict

let canvasWidth, canvasHeight;
let canvasEl;
let sliderK;
let testPoint = null;
let trainPoints = [];

const TOP_PAD = 55;
const BOTTOM_PAD = 75;
const SIDE_PAD = 20;
const CLASS_COLORS = [
  [60, 120, 220],   // class 0: blue
  [220, 60, 60]     // class 1: red
];
const CLASS_NAMES = ['Class A (Blue)', 'Class B (Red)'];

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 490;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');

  // Fixed seed for reproducibility
  randomSeed(42);
  generateTrainingPoints();

  // Slider for K
  const sliderX = 90;
  const sliderY = canvasHeight - 48;
  const sliderW = min(canvasWidth - 110, 400);
  sliderK = createSlider(1, 9, 3, 2); // odd values only
  sliderK.position(sliderX, sliderY);
  sliderK.style('width', sliderW + 'px');
  sliderK.parent(canvasEl.parent());

  textFont('Arial');
}

function generateTrainingPoints() {
  trainPoints = [];
  // Class 0: cluster around upper-left area
  for (let i = 0; i < 10; i++) {
    trainPoints.push({
      x: random(0.1, 0.48),
      y: random(0.1, 0.50),
      cls: 0
    });
  }
  // Class 1: cluster around lower-right area
  for (let i = 0; i < 10; i++) {
    trainPoints.push({
      x: random(0.45, 0.90),
      y: random(0.45, 0.90),
      cls: 1
    });
  }
}

function canvasToNorm(px, py) {
  const aw = canvasWidth - 2 * SIDE_PAD;
  const ah = canvasHeight - TOP_PAD - BOTTOM_PAD;
  return {
    nx: (px - SIDE_PAD) / aw,
    ny: (py - TOP_PAD) / ah
  };
}

function normToCanvas(nx, ny) {
  const aw = canvasWidth - 2 * SIDE_PAD;
  const ah = canvasHeight - TOP_PAD - BOTTOM_PAD;
  return {
    px: SIDE_PAD + nx * aw,
    py: TOP_PAD + ny * ah
  };
}

function knnPredict(nx, ny, k) {
  // Compute distances
  const withDists = trainPoints.map(tp => ({
    ...tp,
    d: Math.sqrt((tp.x - nx) ** 2 + (tp.y - ny) ** 2)
  }));
  withDists.sort((a, b) => a.d - b.d);
  const kNearest = withDists.slice(0, k);
  const votes = [0, 0];
  for (let n of kNearest) votes[n.cls]++;
  const pred = votes[0] >= votes[1] ? 0 : 1;
  return { kNearest, votes, pred };
}

function draw() {
  background(245, 248, 255);

  const K = sliderK.value();

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('K-Value Effect Explorer (KNN)', canvasWidth / 2, 10);

  // Draw plot area border
  const aw = canvasWidth - 2 * SIDE_PAD;
  const ah = canvasHeight - TOP_PAD - BOTTOM_PAD;
  stroke(180);
  strokeWeight(1);
  fill(255);
  rect(SIDE_PAD, TOP_PAD, aw, ah);

  // Compute KNN result
  let result = null;
  if (testPoint) {
    result = knnPredict(testPoint.nx, testPoint.ny, K);
  }

  // Draw KNN neighbor circles (behind points)
  if (result) {
    for (let n of result.kNearest) {
      const cp = normToCanvas(n.x, n.y);
      const tp = normToCanvas(testPoint.nx, testPoint.ny);
      // Distance circle
      const dr = dist(cp.px, cp.py, tp.px, tp.py);
      noFill();
      stroke(180, 180, 100, 80);
      strokeWeight(1);
      // Connection line
      stroke(200, 180, 50, 150);
      strokeWeight(1.5);
      line(tp.px, tp.py, cp.px, cp.py);
    }
    // Max neighbor distance circle
    if (result.kNearest.length > 0) {
      const lastN = result.kNearest[result.kNearest.length - 1];
      const lcp = normToCanvas(lastN.x, lastN.y);
      const tp = normToCanvas(testPoint.nx, testPoint.ny);
      const rCircle = dist(lcp.px, lcp.py, tp.px, tp.py);
      noFill();
      stroke(160, 160, 60, 120);
      strokeWeight(1.5);
      setLineDash([5, 4]);
      ellipse(tp.px, tp.py, rCircle * 2);
      setLineDash([]);
    }
  }

  // Draw training points
  for (let tp of trainPoints) {
    const cp = normToCanvas(tp.x, tp.y);
    const c = CLASS_COLORS[tp.cls];
    let isNeighbor = false;
    if (result) {
      isNeighbor = result.kNearest.some(n => n === tp);
    }
    strokeWeight(isNeighbor ? 3 : 1.5);
    stroke(c[0] * 0.6, c[1] * 0.6, c[2] * 0.6);
    fill(c[0], c[1], c[2], isNeighbor ? 255 : 180);
    ellipse(cp.px, cp.py, isNeighbor ? 20 : 14);
    if (isNeighbor) {
      noStroke();
      fill(255);
      textSize(9);
      textAlign(CENTER, CENTER);
      text('K', cp.px, cp.py);
    }
  }

  // Draw test point
  if (testPoint) {
    const tp = normToCanvas(testPoint.nx, testPoint.ny);
    const predC = result ? CLASS_COLORS[result.pred] : [150, 150, 150];
    strokeWeight(3);
    stroke(50);
    fill(predC[0], predC[1], predC[2], 200);
    // Star / diamond shape for test point
    push();
    translate(tp.px, tp.py);
    rotate(PI / 4);
    rect(-9, -9, 18, 18, 2);
    pop();
    noStroke();
    fill(255);
    textSize(11);
    textAlign(CENTER, CENTER);
    text('?', tp.px, tp.py);
  }

  // Slider label
  noStroke();
  fill(40, 60, 120);
  textSize(13);
  textAlign(RIGHT, CENTER);
  text('K = ' + K, 85, canvasHeight - 48 + 10);

  // Result info box
  const boxX = SIDE_PAD + aw - 230;
  const boxY = TOP_PAD + 10;
  const boxW = 220;
  const boxH = testPoint && result ? 110 : 60;
  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);
  noStroke();
  fill(30, 40, 80);
  textSize(12);
  textAlign(LEFT, TOP);
  text(`K = ${K}  (odd → no ties)`, boxX + 10, boxY + 8);

  if (testPoint && result) {
    const pc = CLASS_COLORS[result.pred];
    fill(100);
    text(`Votes: Class A=${result.votes[0]}, Class B=${result.votes[1]}`, boxX + 10, boxY + 28);
    fill(pc[0], pc[1], pc[2]);
    textSize(14);
    text(`Predicted: ${CLASS_NAMES[result.pred]}`, boxX + 10, boxY + 48);
    fill(100);
    textSize(11);
    text(`(${K} nearest neighbors highlighted)`, boxX + 10, boxY + 72);
    text(`Yellow lines = neighbor connections`, boxX + 10, boxY + 90);
  } else {
    fill(100);
    textSize(11);
    text('Click in the plot to place\na test point and predict!', boxX + 10, boxY + 28);
  }

  // Legend
  noStroke();
  for (let i = 0; i < 2; i++) {
    const c = CLASS_COLORS[i];
    fill(c[0], c[1], c[2]);
    ellipse(SIDE_PAD + 12, TOP_PAD + 20 + i * 22, 12);
    fill(40, 60, 100);
    textSize(11);
    textAlign(LEFT, CENTER);
    text(CLASS_NAMES[i], SIDE_PAD + 22, TOP_PAD + 20 + i * 22);
  }
  // Test point legend
  fill(80);
  push();
  translate(SIDE_PAD + 12, TOP_PAD + 66);
  rotate(PI / 4);
  rect(-6, -6, 12, 12, 1);
  pop();
  fill(40, 60, 100);
  textSize(11);
  textAlign(LEFT, CENTER);
  text('Test point (?)', SIDE_PAD + 22, TOP_PAD + 66);

  // Bottom instruction
  noStroke();
  fill(100, 110, 130);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Click anywhere in the plot to place a test point • Adjust K with the slider', canvasWidth / 2, canvasHeight - 6);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  if (mouseX >= SIDE_PAD && mouseX <= canvasWidth - SIDE_PAD &&
      mouseY >= TOP_PAD && mouseY <= canvasHeight - BOTTOM_PAD) {
    const n = canvasToNorm(mouseX, mouseY);
    testPoint = { nx: n.nx, ny: n.ny };
  }
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);

  const sliderX = 90;
  const sliderY = canvasHeight - 48;
  const sliderW = min(canvasWidth - 110, 400);
  sliderK.position(sliderX, sliderY);
  sliderK.style('width', sliderW + 'px');
}
