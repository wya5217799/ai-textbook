// Cross-Entropy Loss Behavior MicroSim
// Bloom Level: Understand (L2)
// Plots L = -log(p) and lets user drag a point along the curve

let dragP = 0.5;
let isDragging = false;
let canvasWidth, canvasHeight;

// Plot area
let plotX, plotY, plotW, plotH;
let pMin = 0.01, pMax = 0.99;

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
}

function getPlotBounds() {
  plotX = 80;
  plotY = 55;
  plotW = canvasWidth - 130;
  plotH = 320;
}

// Map p -> canvas x
function pToX(p) {
  return plotX + ((p - pMin) / (pMax - pMin)) * plotW;
}
// Map loss -> canvas y
function lToY(l, lMax) {
  return plotY + plotH - (l / lMax) * plotH;
}
// Map canvas x -> p
function xToP(x) {
  return pMin + ((x - plotX) / plotW) * (pMax - pMin);
}

function draw() {
  background(248);
  getPlotBounds();

  let lMax = 5.0; // display up to loss = 5

  // Title
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Cross-Entropy Loss:  L = −log(p)", canvasWidth / 2, 14);
  fill(90);
  textSize(12);
  text("Drag the point along the curve to explore loss values", canvasWidth / 2, 38);

  // --- Background zones ---
  noStroke();
  fill(255, 220, 215, 120);
  rect(plotX, plotY, plotW * 0.2, plotH); // danger zone near p=0
  fill(215, 240, 215, 120);
  rect(plotX + plotW * 0.7, plotY, plotW * 0.3, plotH); // good zone near p=1

  // Zone labels
  fill(180, 60, 60, 160);
  textSize(10);
  textAlign(CENTER, TOP);
  noStroke();
  text("High Loss\n(overconfident\nwrong prediction)", plotX + plotW * 0.10, plotY + 6);
  fill(50, 140, 60, 160);
  text("Low Loss\n(confident\ncorrect prediction)", plotX + plotW * 0.85, plotY + 6);

  // --- Grid lines ---
  stroke(210);
  strokeWeight(1);
  drawingContext.setLineDash([4, 4]);
  for (let i = 1; i <= 5; i++) {
    let ly = lToY(i, lMax);
    if (ly >= plotY && ly <= plotY + plotH) {
      line(plotX, ly, plotX + plotW, ly);
    }
  }
  for (let p = 0.1; p < 1.0; p += 0.1) {
    let lx = pToX(p);
    line(lx, plotY, lx, plotY + plotH);
  }
  drawingContext.setLineDash([]);
  noStroke();

  // --- Curve: L = -log(p) ---
  let steps = 400;
  stroke(52, 120, 210);
  strokeWeight(3);
  noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let p = pMin + (i / steps) * (pMax - pMin);
    let l = -Math.log(p);
    if (l > lMax) continue;
    vertex(pToX(p), lToY(l, lMax));
  }
  endShape();
  noStroke();

  // --- Axes ---
  stroke(80);
  strokeWeight(2);
  line(plotX, plotY, plotX, plotY + plotH);           // y-axis
  line(plotX, plotY + plotH, plotX + plotW, plotY + plotH); // x-axis
  noStroke();

  // X axis ticks & labels
  for (let p = 0.0; p <= 1.01; p += 0.1) {
    let lx = pToX(constrain(p, pMin, pMax));
    stroke(120);
    strokeWeight(1);
    line(lx, plotY + plotH, lx, plotY + plotH + 5);
    noStroke();
    fill(80);
    textSize(10);
    textAlign(CENTER, TOP);
    text(p.toFixed(1), lx, plotY + plotH + 7);
  }

  // Y axis ticks & labels
  for (let i = 0; i <= 5; i++) {
    let ly = lToY(i, lMax);
    if (ly < plotY || ly > plotY + plotH) continue;
    stroke(120);
    strokeWeight(1);
    line(plotX - 5, ly, plotX, ly);
    noStroke();
    fill(80);
    textSize(10);
    textAlign(RIGHT, CENTER);
    text(i.toFixed(0), plotX - 8, ly);
  }

  // Axis labels
  fill(60);
  textSize(13);
  textAlign(CENTER, TOP);
  noStroke();
  text("Predicted Probability  p", plotX + plotW / 2, plotY + plotH + 24);
  push();
  translate(plotX - 55, plotY + plotH / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text("Loss  L = −log(p)", 0, 0);
  pop();

  // --- Draggable point ---
  let dragPClamped = constrain(dragP, pMin, pMax);
  let loss = -Math.log(dragPClamped);
  let lossClamped = constrain(loss, 0, lMax);

  let px = pToX(dragPClamped);
  let py = lToY(lossClamped, lMax);

  // Vertical/horizontal guide lines from point
  stroke(180, 80, 80, 160);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(px, py, px, plotY + plotH);
  line(px, py, plotX, py);
  drawingContext.setLineDash([]);
  noStroke();

  // Point
  let r = isDragging ? 12 : 10;
  fill(220, 60, 60);
  stroke(140, 20, 20);
  strokeWeight(2);
  ellipse(px, py, r * 2, r * 2);
  noStroke();

  // Tooltip box
  let tipW = 195;
  let tipH = 72;
  let tipX = px + 14;
  let tipY = py - tipH - 6;
  if (tipX + tipW > plotX + plotW) tipX = px - tipW - 14;
  if (tipY < plotY) tipY = py + 10;

  fill(255, 250, 240, 240);
  stroke(180, 100, 80);
  strokeWeight(1.5);
  rect(tipX, tipY, tipW, tipH, 6);
  noStroke();

  fill(30);
  textSize(12);
  textAlign(LEFT, TOP);
  text(`p = ${dragPClamped.toFixed(3)}`, tipX + 10, tipY + 8);
  text(`L = −log(${dragPClamped.toFixed(3)})`, tipX + 10, tipY + 26);

  fill(...(loss > 3 ? [200, 40, 40] : loss > 1.5 ? [180, 130, 30] : [40, 150, 60]));
  textSize(16);
  text(`= ${loss.toFixed(4)}`, tipX + 10, tipY + 44);

  // Interpretation
  fill(100);
  textSize(10);
  textAlign(LEFT, TOP);
  let interp = loss > 3   ? "Very high loss! Model is dangerously wrong." :
               loss > 1.5 ? "Moderate loss — model is uncertain." :
               loss > 0.5 ? "Reasonable prediction." :
                            "Low loss — confident correct prediction.";
  text(interp, plotX, plotY + plotH + 44, plotW, 30);

  // Key insight callout
  fill(180, 50, 50);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text("Key insight: As p → 0, loss → ∞ (unbounded penalty for wrong confident predictions)", plotX, plotY + plotH + 62);
}

function mousePressed() {
  getPlotBounds();
  let dragPClamped = constrain(dragP, pMin, pMax);
  let loss = constrain(-Math.log(dragPClamped), 0, 5);
  let px = pToX(dragPClamped);
  let py = lToY(loss, 5);
  if (dist(mouseX, mouseY, px, py) < 20) {
    isDragging = true;
  }
}

function mouseDragged() {
  if (isDragging) {
    dragP = constrain(xToP(mouseX), pMin + 0.001, pMax);
  }
}

function mouseReleased() {
  isDragging = false;
}

function touchStarted() { mousePressed(); return false; }
function touchMoved()   { mouseDragged(); return false; }
function touchEnded()   { mouseReleased(); return false; }
