// Distance Metric Comparison
// Bloom Level: Understand (L2)
// Two draggable points. Shows Euclidean (L2) and Manhattan (L1) distances.

let canvasWidth, canvasHeight;
let canvasEl;

let pts = [
  { x: 0, y: 0 },  // will be set in setup
  { x: 0, y: 0 }
];

let draggingIdx = -1;

const NODE_R = 14;
const TOP_PAD = 50;
const BOTTOM_PAD = 90;

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 480;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');

  const cw = canvasWidth;
  const ch = canvasHeight - TOP_PAD - BOTTOM_PAD;
  pts[0] = { x: cw * 0.30, y: TOP_PAD + ch * 0.35 };
  pts[1] = { x: cw * 0.68, y: TOP_PAD + ch * 0.65 };

  textFont('Arial');
}

function draw() {
  background(245, 248, 255);

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Distance Metric Comparison', canvasWidth / 2, 10);

  const A = pts[0];
  const B = pts[1];

  const euclidean = dist(A.x, A.y, B.x, B.y);
  // Manhattan = |dx| + |dy|, but scale to match canvas pixel coords → real units
  // We'll display in normalized units (divide by 100 to get readable numbers)
  const scale = 100; // pixels per unit
  const dx = Math.abs(B.x - A.x) / scale;
  const dy = Math.abs(B.y - A.y) / scale;
  const euclideanU = euclidean / scale;
  const manhattanU = dx + dy;

  // Draw grid (light)
  stroke(220, 225, 240);
  strokeWeight(0.5);
  for (let gx = 0; gx < canvasWidth; gx += 50) line(gx, TOP_PAD, gx, canvasHeight - BOTTOM_PAD);
  for (let gy = TOP_PAD; gy < canvasHeight - BOTTOM_PAD; gy += 50) line(0, gy, canvasWidth, gy);

  // Manhattan path (L1): horizontal then vertical
  stroke(220, 100, 40);
  strokeWeight(3);
  setLineDash([8, 5]);
  // Horizontal leg: A.x -> B.x at A.y
  line(A.x, A.y, B.x, A.y);
  // Vertical leg: B.x at A.y -> B
  line(B.x, A.y, B.x, B.y);
  setLineDash([]);

  // Manhattan right-angle marker at elbow
  const elbowSize = 10;
  const ex = B.x, ey = A.y;
  const signX = B.x > A.x ? -1 : 1;
  const signY = B.y > A.y ? 1 : -1;
  stroke(220, 100, 40, 150);
  strokeWeight(1.5);
  noFill();
  // Right-angle box
  line(ex + signX * elbowSize, ey, ex + signX * elbowSize, ey + signY * elbowSize);
  line(ex + signX * elbowSize, ey + signY * elbowSize, ex, ey + signY * elbowSize);

  // Euclidean line (L2)
  stroke(60, 120, 220);
  strokeWeight(2.5);
  line(A.x, A.y, B.x, B.y);

  // Midpoint label for L2
  const midX = (A.x + B.x) / 2;
  const midY = (A.y + B.y) / 2;
  const angle = atan2(B.y - A.y, B.x - A.x);
  push();
  translate(midX, midY);
  rotate(angle);
  noStroke();
  fill(60, 120, 220);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('L2 (Euclidean)', 0, -6);
  pop();

  // Manhattan label at midpoint of horizontal leg
  const mhX = (A.x + B.x) / 2;
  const mhY = A.y;
  noStroke();
  fill(220, 100, 40);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('L1 (Manhattan)', mhX, mhY - 6);

  // Draw segment dimension hints
  // dx horizontal
  fill(180, 70, 30);
  textSize(11);
  textAlign(CENTER, TOP);
  const dxLabel = nf(dx, 1, 2) + ' units';
  text('dx = ' + dxLabel, (A.x + B.x) / 2, A.y + 4);
  // dy vertical
  textAlign(RIGHT, CENTER);
  text('dy = ' + nf(dy, 1, 2) + ' units', B.x - 4, (A.y + B.y) / 2);

  // Draw points
  const ptColors = [[60, 120, 220], [220, 60, 60]];
  const ptLabels = ['A', 'B'];
  for (let i = 0; i < 2; i++) {
    const p = pts[i];
    const isHover = dist(mouseX, mouseY, p.x, p.y) <= NODE_R + 4 || draggingIdx === i;
    strokeWeight(isHover ? 3 : 2);
    stroke(ptColors[i][0] * 0.6, ptColors[i][1] * 0.6, ptColors[i][2] * 0.6);
    fill(ptColors[i][0], ptColors[i][1], ptColors[i][2]);
    ellipse(p.x, p.y, NODE_R * 2);
    noStroke();
    fill(255);
    textSize(13);
    textAlign(CENTER, CENTER);
    text(ptLabels[i], p.x, p.y);
  }

  // Metrics readout box
  const boxW = 240;
  const boxH = 80;
  const boxX = canvasWidth - boxW - 14;
  const boxY = TOP_PAD + 10;
  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill(60, 120, 220);
  textSize(14);
  textAlign(LEFT, TOP);
  text(`L2 (Euclidean): ${nf(euclideanU, 1, 3)} units`, boxX + 10, boxY + 10);
  fill(220, 100, 40);
  text(`L1 (Manhattan): ${nf(manhattanU, 1, 3)} units`, boxX + 10, boxY + 34);
  fill(100);
  textSize(10);
  text(`sqrt(dx²+dy²)  vs  |dx|+|dy|`, boxX + 10, boxY + 60);

  // Instruction
  noStroke();
  fill(100, 110, 130);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  text('Drag points A or B to explore how distances change', canvasWidth / 2, canvasHeight - 6);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function mousePressed() {
  draggingIdx = -1;
  for (let i = 0; i < 2; i++) {
    if (dist(mouseX, mouseY, pts[i].x, pts[i].y) <= NODE_R + 6) {
      draggingIdx = i;
      break;
    }
  }
}

function mouseDragged() {
  if (draggingIdx >= 0) {
    const clampX = constrain(mouseX, 10, canvasWidth - 10);
    const clampY = constrain(mouseY, TOP_PAD + 5, canvasHeight - BOTTOM_PAD - 5);
    pts[draggingIdx].x = clampX;
    pts[draggingIdx].y = clampY;
  }
}

function mouseReleased() {
  draggingIdx = -1;
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);
}
