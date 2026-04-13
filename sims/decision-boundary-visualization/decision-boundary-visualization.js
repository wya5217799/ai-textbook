// Decision Boundary Visualization MicroSim
// Bloom Level: Understand (L2)
// 2D scatter of two classes with adjustable logistic regression decision boundary

let angleSlider, biasSlider;
let canvasWidth, canvasHeight;
let points = [];
const N = 60;

// Plot area
let plotX, plotY, plotW, plotH;

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  randomSeed(7);
  generatePoints();

  // Angle slider
  let d1 = createDiv('');
  d1.parent('main');
  d1.style('margin', '6px 10px');
  createSpan('Boundary Angle: ').parent(d1).style('font-size','13px');
  angleSlider = createSlider(-80, 80, 10, 1);
  angleSlider.parent(d1);
  angleSlider.style('width', '220px');
  angleSlider.input(() => redraw());

  // Bias slider
  let d2 = createDiv('');
  d2.parent('main');
  d2.style('margin', '4px 10px');
  createSpan('Boundary Offset: ').parent(d2).style('font-size','13px');
  biasSlider = createSlider(-60, 60, 0, 1);
  biasSlider.parent(d2);
  biasSlider.style('width', '220px');
  biasSlider.input(() => redraw());

  noLoop();
}

function generatePoints() {
  points = [];
  // Class 0: centered around (0.3, 0.35)
  for (let i = 0; i < N / 2; i++) {
    points.push({
      x: randomGaussian(0.30, 0.12),
      y: randomGaussian(0.35, 0.12),
      cls: 0,
    });
  }
  // Class 1: centered around (0.65, 0.65)
  for (let i = 0; i < N / 2; i++) {
    points.push({
      x: randomGaussian(0.65, 0.12),
      y: randomGaussian(0.65, 0.12),
      cls: 1,
    });
  }
  // Clamp to [0.02, 0.98]
  points.forEach(p => {
    p.x = constrain(p.x, 0.02, 0.98);
    p.y = constrain(p.y, 0.02, 0.98);
  });
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function toPlot(nx, ny) {
  return { x: plotX + nx * plotW, y: plotY + (1 - ny) * plotH };
}

function draw() {
  background(248);

  plotX = 60;
  plotY = 55;
  plotW = canvasWidth - 120;
  plotH = 360;

  let angleDeg = angleSlider.value();
  let bias     = biasSlider.value() / 100; // normalized

  // Title
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Decision Boundary Visualization", canvasWidth / 2, 14);

  drawBackground(angleDeg, bias);
  drawAxes();
  drawPoints();
  drawBoundary(angleDeg, bias);
  drawLegend();
  drawInfo(angleDeg, bias);
}

function drawBackground(angleDeg, bias) {
  // Color background by predicted class
  let resolution = 6;
  let cols = floor(plotW / resolution);
  let rows = floor(plotH / resolution);
  let angleRad = radians(angleDeg);
  let w1 = cos(angleRad);
  let w2 = sin(angleRad);

  noStroke();
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let nx = c / cols;
      let ny = 1 - r / rows;
      let z = w1 * (nx - 0.5) + w2 * (ny - 0.5) + bias;
      let p = 1 / (1 + exp(-z * 8));
      let px = plotX + c * resolution;
      let py = plotY + r * resolution;
      // Class 0: blue tint, Class 1: orange tint
      let r0 = lerp(210, 255, p);
      let g0 = lerp(225, 230, p);
      let b0 = lerp(255, 200, p);
      fill(r0, g0, b0, 180);
      rect(px, py, resolution + 1, resolution + 1);
    }
  }
}

function drawAxes() {
  stroke(160);
  strokeWeight(1);
  noFill();
  rect(plotX, plotY, plotW, plotH);

  // Axis labels
  fill(80);
  textSize(12);
  noStroke();
  textAlign(CENTER, TOP);
  text("Feature x₁", plotX + plotW / 2, plotY + plotH + 8);
  push();
  translate(plotX - 40, plotY + plotH / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text("Feature x₂", 0, 0);
  pop();

  // Tick marks
  for (let i = 0; i <= 4; i++) {
    let tx = plotX + i * plotW / 4;
    let ty = plotY + plotH;
    stroke(180);
    strokeWeight(1);
    line(tx, ty, tx, ty + 4);
    noStroke();
    fill(100);
    textSize(10);
    textAlign(CENTER, TOP);
    text((i * 0.25).toFixed(2), tx, ty + 6);

    let ty2 = plotY + i * plotH / 4;
    stroke(180);
    line(plotX - 4, ty2, plotX, ty2);
    noStroke();
    textAlign(RIGHT, CENTER);
    text((1 - i * 0.25).toFixed(2), plotX - 6, ty2);
  }
}

function drawPoints() {
  for (let p of points) {
    let pp = toPlot(p.x, p.y);
    let r = 8;
    if (p.cls === 0) {
      fill(52, 120, 210);
      stroke(20, 70, 160);
    } else {
      fill(220, 80, 50);
      stroke(160, 40, 20);
    }
    strokeWeight(1.5);
    ellipse(pp.x, pp.y, r * 2, r * 2);
  }
  noStroke();
}

function drawBoundary(angleDeg, bias) {
  let angleRad = radians(angleDeg);
  let w1 = cos(angleRad);
  let w2 = sin(angleRad);

  // Decision boundary: w1*(x-0.5) + w2*(y-0.5) + bias = 0
  // Solve for y at x=0 and x=1
  stroke(30, 30, 30);
  strokeWeight(2.5);
  drawingContext.setLineDash([10, 5]);

  let pts = [];
  // x from 0 to 1, find y
  for (let nx = 0; nx <= 1; nx += 0.001) {
    if (abs(w2) > 0.001) {
      let ny = 0.5 - (w1 * (nx - 0.5) + bias) / w2;
      if (ny >= 0 && ny <= 1) {
        pts.push(toPlot(nx, ny));
      }
    }
  }
  if (pts.length > 1) {
    beginShape();
    noFill();
    for (let pt of pts) vertex(pt.x, pt.y);
    endShape();
  }
  drawingContext.setLineDash([]);
  noStroke();

  // Label on boundary
  if (pts.length > 1) {
    let mid = pts[floor(pts.length / 2)];
    fill(30);
    textSize(11);
    textAlign(CENTER, CENTER);
    noStroke();
    fill(255, 255, 200, 220);
    rect(mid.x - 65, mid.y - 10, 130, 20, 4);
    fill(40);
    text("Decision Boundary  σ(z) = 0.5", mid.x, mid.y);
  }
}

function drawLegend() {
  let lx = plotX + 6;
  let ly = plotY + 8;

  fill(255, 255, 255, 200);
  stroke(180);
  strokeWeight(1);
  rect(lx - 4, ly - 4, 160, 52, 4);

  fill(52, 120, 210);
  stroke(20, 70, 160);
  strokeWeight(1.5);
  ellipse(lx + 8, ly + 10, 14, 14);
  fill(40);
  noStroke();
  textSize(12);
  textAlign(LEFT, CENTER);
  text("Class 0  (negative)", lx + 20, ly + 10);

  fill(220, 80, 50);
  stroke(160, 40, 20);
  strokeWeight(1.5);
  ellipse(lx + 8, ly + 32, 14, 14);
  fill(40);
  noStroke();
  text("Class 1  (positive)", lx + 20, ly + 32);
}

function drawInfo(angleDeg, bias) {
  let angleRad = radians(angleDeg);
  let w1 = cos(angleRad).toFixed(3);
  let w2 = sin(angleRad).toFixed(3);
  let b  = bias.toFixed(3);

  fill(60);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  let infoY = plotY + plotH + 28;
  text(`Boundary equation:  ${w1}·(x₁ - 0.5) + ${w2}·(x₂ - 0.5) + ${b} = 0`, plotX, infoY);
  text(`Logistic function:  σ(z) = 1 / (1 + e^{-z})     Predict class 1 if σ(z) > 0.5`, plotX, infoY + 16);

  // Count correctly classified
  let correct = 0;
  for (let p of points) {
    let z = parseFloat(w1) * (p.x - 0.5) + parseFloat(w2) * (p.y - 0.5) + bias;
    let pred = z > 0 ? 1 : 0;
    if (pred === p.cls) correct++;
  }
  let acc = (correct / points.length * 100).toFixed(0);
  fill(...[52, 152, 80]);
  textSize(12);
  textAlign(RIGHT, TOP);
  text(`Accuracy: ${correct}/${points.length}  (${acc}%)`, plotX + plotW, infoY);
}
