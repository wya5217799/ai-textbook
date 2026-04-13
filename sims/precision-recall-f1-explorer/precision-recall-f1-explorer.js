// Precision-Recall-F1 Explorer
// Bloom Level: Apply (L3)
// Two sliders: Precision and Recall → live F1. Draw PR curve with current point.

let canvasWidth, canvasHeight;
let sliderP, sliderR;
let canvasEl;

const CHART_MARGIN = { top: 60, left: 65, right: 30, bottom: 55 };

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 490;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');

  // Sliders positioned below the chart
  const sliderY1 = canvasHeight - 85;
  const sliderY2 = canvasHeight - 55;
  const sliderX = 120;
  const sliderW = min(canvasWidth - 140, 500);

  sliderP = createSlider(0, 100, 70, 1);
  sliderP.position(sliderX, sliderY1);
  sliderP.style('width', sliderW + 'px');
  sliderP.parent(canvasEl.parent());

  sliderR = createSlider(0, 100, 60, 1);
  sliderR.position(sliderX, sliderY2);
  sliderR.style('width', sliderW + 'px');
  sliderR.parent(canvasEl.parent());

  textFont('Arial');
}

function chartArea() {
  return {
    x: CHART_MARGIN.left,
    y: CHART_MARGIN.top,
    w: canvasWidth - CHART_MARGIN.left - CHART_MARGIN.right,
    h: canvasHeight - CHART_MARGIN.top - CHART_MARGIN.bottom - 80
  };
}

function toChartXY(precision, recall, ca) {
  // X axis = Recall, Y axis = Precision (standard PR curve orientation)
  return {
    px: ca.x + recall * ca.w,
    py: ca.y + (1 - precision) * ca.h
  };
}

function draw() {
  background(245, 248, 255);

  const P = sliderP.value() / 100;
  const R = sliderR.value() / 100;
  const F1 = (P + R) > 0 ? 2 * P * R / (P + R) : 0;

  const ca = chartArea();

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Precision-Recall-F1 Explorer', canvasWidth / 2, 10);

  // Chart background
  fill(255);
  stroke(180);
  strokeWeight(1);
  rect(ca.x, ca.y, ca.w, ca.h);

  // Grid lines
  stroke(220);
  strokeWeight(0.5);
  for (let i = 0; i <= 10; i++) {
    const xg = ca.x + (i / 10) * ca.w;
    const yg = ca.y + (i / 10) * ca.h;
    line(xg, ca.y, xg, ca.y + ca.h);
    line(ca.x, yg, ca.x + ca.w, yg);
  }

  // Axis labels
  noStroke();
  fill(60, 80, 140);
  textSize(12);
  textAlign(CENTER, TOP);
  for (let i = 0; i <= 5; i++) {
    const v = i / 5;
    const xg = ca.x + v * ca.w;
    text(nf(v, 1, 1), xg, ca.y + ca.h + 5);
    textAlign(RIGHT, CENTER);
    text(nf(1 - v / 5 * 5 + v, 1, 1), ca.x - 6, ca.y + (1 - v) * ca.h);
    textAlign(CENTER, TOP);
  }
  // Fix Y axis labels
  for (let i = 0; i <= 5; i++) {
    const v = i / 5;
    textAlign(RIGHT, CENTER);
    text(nf(v, 1, 1), ca.x - 6, ca.y + (1 - v) * ca.h);
  }

  // Axis titles
  textAlign(CENTER, BOTTOM);
  fill(40, 60, 100);
  textSize(13);
  text('Recall', ca.x + ca.w / 2, ca.y + ca.h + 38);
  push();
  translate(ca.x - 48, ca.y + ca.h / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER);
  text('Precision', 0, 0);
  pop();

  // Draw iso-F1 curves as background reference
  for (let f = 0.2; f <= 0.9; f += 0.2) {
    stroke(210, 220, 240);
    strokeWeight(1);
    noFill();
    beginShape();
    for (let r = 0.01; r <= 1; r += 0.01) {
      const p = f * r / (2 * r - f);
      if (p >= 0 && p <= 1) {
        const pt = toChartXY(p, r, ca);
        vertex(pt.px, pt.py);
      }
    }
    endShape();
    // Label
    const rLabel = 0.5;
    const pLabel = f * rLabel / (2 * rLabel - f);
    if (pLabel > 0 && pLabel < 1) {
      const pt = toChartXY(pLabel, rLabel, ca);
      noStroke();
      fill(160, 170, 200);
      textSize(9);
      textAlign(LEFT, CENTER);
      text('F1=' + nf(f, 1, 1), pt.px + 3, pt.py - 3);
    }
  }

  // Draw the PR operating point crosshairs
  const pt = toChartXY(P, R, ca);
  stroke(200, 60, 60, 120);
  strokeWeight(1);
  setLineDash([4, 4]);
  line(pt.px, ca.y, pt.px, ca.y + ca.h);
  line(ca.x, pt.py, ca.x + ca.w, pt.py);
  setLineDash([]);

  // Draw current iso-F1 curve highlighted
  if (F1 > 0) {
    stroke(255, 140, 0);
    strokeWeight(2);
    noFill();
    beginShape();
    for (let r = 0.01; r <= 1; r += 0.005) {
      const p = F1 * r / (2 * r - F1);
      if (p >= 0 && p <= 1) {
        const qt = toChartXY(p, r, ca);
        vertex(qt.px, qt.py);
      }
    }
    endShape();
  }

  // Current operating point
  strokeWeight(2);
  stroke(200, 40, 40);
  fill(255, 60, 60);
  ellipse(pt.px, pt.py, 14);

  // Metrics readout box
  const boxW = 200;
  const boxH = 80;
  const boxX = ca.x + ca.w - boxW - 10;
  const boxY = ca.y + 10;
  fill(255, 255, 255, 220);
  stroke(180);
  strokeWeight(1);
  rect(boxX, boxY, boxW, boxH, 6);

  noStroke();
  fill(30, 40, 80);
  textSize(13);
  textAlign(LEFT, TOP);
  text(`Precision (P) = ${nf(P, 1, 3)}`, boxX + 10, boxY + 8);
  text(`Recall    (R) = ${nf(R, 1, 3)}`, boxX + 10, boxY + 26);
  fill(220, 80, 0);
  textSize(14);
  text(`F1 Score      = ${nf(F1, 1, 3)}`, boxX + 10, boxY + 46);
  fill(100);
  textSize(10);
  text('F1 = 2·P·R / (P+R)', boxX + 10, boxY + 66);

  // Slider labels
  const sliderY1 = canvasHeight - 85;
  const sliderY2 = canvasHeight - 55;
  noStroke();
  fill(60, 100, 180);
  textSize(13);
  textAlign(RIGHT, CENTER);
  text(`P: ${nf(P, 1, 2)}`, 115, sliderY1 + 10);
  fill(180, 60, 60);
  text(`R: ${nf(R, 1, 2)}`, 115, sliderY2 + 10);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);

  const sliderY1 = canvasHeight - 85;
  const sliderY2 = canvasHeight - 55;
  const sliderX = 120;
  const sliderW = min(canvasWidth - 140, 500);

  sliderP.position(sliderX, sliderY1);
  sliderP.style('width', sliderW + 'px');
  sliderR.position(sliderX, sliderY2);
  sliderR.style('width', sliderW + 'px');
}
