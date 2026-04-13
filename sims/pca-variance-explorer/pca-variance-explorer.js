// PCA Variance Explorer MicroSim
// ~20 2D data points in an elongated cluster
// PC1 arrow can be rotated via slider
// Shows variance explained (%) for PC1 and PC2

let canvasWidth = 700;
let canvasHeight = 470;

// Slider for angle
let angleSlider;

// Data: 20 points in an elongated cluster (primary axis ~35 degrees)
let rawPoints = [];
let trueAngle = 35; // degrees – the true PC1 angle

// Canvas plot area bounds
let plotX1, plotY1, plotX2, plotY2;
let originX, originY;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  generateData();

  // Slider: 0 to 180 degrees
  angleSlider = createSlider(0, 180, trueAngle, 1);
  angleSlider.parent('main');
  angleSlider.style('width', '60%');
  angleSlider.style('margin', '6px 8px');

  windowResized();
}

function generateData() {
  rawPoints = [];
  let seed = 42;
  // Use a simple LCG for reproducible "random" values
  function lcg() {
    seed = (seed * 1664525 + 1013904223) & 0xffffffff;
    return (seed >>> 0) / 0xffffffff;
  }

  let trueRad = trueAngle * PI / 180;
  let cos0 = cos(trueRad);
  let sin0 = sin(trueRad);

  for (let i = 0; i < 22; i++) {
    // Points along PC1 with spread, small spread along PC2
    let pc1 = (lcg() - 0.5) * 3.6;   // long axis variance
    let pc2 = (lcg() - 0.5) * 0.8;   // short axis variance
    // Rotate to true angle
    let x = pc1 * cos0 - pc2 * sin0;
    let y = pc1 * sin0 + pc2 * cos0;
    rawPoints.push({ x, y });
  }

  // Center the data
  let mx = rawPoints.reduce((s, p) => s + p.x, 0) / rawPoints.length;
  let my = rawPoints.reduce((s, p) => s + p.y, 0) / rawPoints.length;
  rawPoints = rawPoints.map(p => ({ x: p.x - mx, y: p.y - my }));
}

function windowResized() {
  canvasWidth = min(windowWidth, 860);
  canvasHeight = 470;
  resizeCanvas(canvasWidth, canvasHeight);

  // Plot area: leave margins for labels
  plotX1 = 60;
  plotY1 = 50;
  plotX2 = canvasWidth - 160;
  plotY2 = canvasHeight - 140;
  originX = (plotX1 + plotX2) / 2;
  originY = (plotY1 + plotY2) / 2;

  if (angleSlider) {
    angleSlider.style('width', min(canvasWidth * 0.55, 400) + 'px');
  }
}

// Convert data coords to canvas coords
function dataToCanvas(dx, dy) {
  let scale = min((plotX2 - plotX1), (plotY2 - plotY1)) / 5.0;
  return {
    cx: originX + dx * scale,
    cy: originY - dy * scale  // y flipped
  };
}

function computeVariances(angleDeg) {
  let rad = angleDeg * PI / 180;
  let cos1 = cos(rad);
  let sin1 = sin(rad);
  // PC2 is perpendicular
  let cos2 = cos(rad + HALF_PI);
  let sin2 = sin(rad + HALF_PI);

  let proj1 = rawPoints.map(p => p.x * cos1 + p.y * sin1);
  let proj2 = rawPoints.map(p => p.x * cos2 + p.y * sin2);

  let var1 = variance(proj1);
  let var2 = variance(proj2);
  let total = var1 + var2;
  return {
    var1: var1,
    var2: var2,
    pct1: total > 0 ? (var1 / total * 100) : 50,
    pct2: total > 0 ? (var2 / total * 100) : 50
  };
}

function variance(arr) {
  let mean = arr.reduce((s, v) => s + v, 0) / arr.length;
  return arr.reduce((s, v) => s + (v - mean) ** 2, 0) / arr.length;
}

function draw() {
  background(245, 247, 250);

  let angleDeg = angleSlider.value();
  let rad = angleDeg * PI / 180;
  let vars = computeVariances(angleDeg);

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('PCA Variance Explorer', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('Rotate PC1 with the slider below — watch variance explained change', canvasWidth / 2, 32);

  // Plot background
  fill(255);
  stroke(210, 215, 230);
  strokeWeight(1);
  rect(plotX1, plotY1, plotX2 - plotX1, plotY2 - plotY1, 6);

  // Grid lines
  stroke(225, 230, 240);
  strokeWeight(0.7);
  let scale = min((plotX2 - plotX1), (plotY2 - plotY1)) / 5.0;
  for (let v = -3; v <= 3; v++) {
    let cx = originX + v * scale;
    let cy = originY - v * scale;
    line(cx, plotY1, cx, plotY2);
    line(plotX1, cy, plotX2, cy);
  }

  // Axes
  stroke(180, 185, 210);
  strokeWeight(1.2);
  line(plotX1, originY, plotX2, originY);
  line(originX, plotY1, originX, plotY2);

  // Project points onto PC1 and draw projection lines
  let cos1 = cos(rad);
  let sin1 = sin(rad);
  let arrowLen = min((plotX2 - plotX1), (plotY2 - plotY1)) / 2.3;

  for (let p of rawPoints) {
    let proj = p.x * cos1 + p.y * sin1;
    let px = proj * cos1;
    let py = proj * sin1;
    let c1 = dataToCanvas(p.x, p.y);
    let c2 = dataToCanvas(px, py);
    stroke(100, 160, 220, 120);
    strokeWeight(1);
    drawingContext.setLineDash([4, 3]);
    line(c1.cx, c1.cy, c2.cx, c2.cy);
    drawingContext.setLineDash([]);
  }

  // Data points
  for (let p of rawPoints) {
    let c = dataToCanvas(p.x, p.y);
    fill(60, 120, 220);
    stroke(30, 70, 160);
    strokeWeight(1.2);
    ellipse(c.cx, c.cy, 9, 9);
  }

  // PC1 arrow
  {
    let ex = cos(rad) * arrowLen;
    let ey = -sin(rad) * arrowLen; // canvas y is flipped
    // Both directions
    stroke(220, 80, 50);
    strokeWeight(3);
    fill(220, 80, 50);
    line(originX - ex, originY + ey, originX + ex, originY - ey);
    // Arrowheads
    drawArrowHead(originX + ex, originY - ey, rad, color(220, 80, 50));
    drawArrowHead(originX - ex, originY + ey, rad + PI, color(220, 80, 50));

    noStroke();
    fill(180, 40, 20);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('PC1', originX + ex + 6, originY - ey);
    textStyle(NORMAL);
  }

  // PC2 arrow (perpendicular)
  {
    let rad2 = rad + HALF_PI;
    let ex2 = cos(rad2) * arrowLen * 0.4;
    let ey2 = -sin(rad2) * arrowLen * 0.4;
    stroke(50, 180, 100);
    strokeWeight(2.5);
    fill(50, 180, 100);
    line(originX - ex2, originY + ey2, originX + ex2, originY - ey2);
    drawArrowHead(originX + ex2, originY - ey2, rad2, color(50, 180, 100));
    drawArrowHead(originX - ex2, originY + ey2, rad2 + PI, color(50, 180, 100));

    noStroke();
    fill(20, 130, 60);
    textAlign(LEFT, CENTER);
    textSize(12);
    textStyle(BOLD);
    text('PC2', originX + ex2 + 6, originY - ey2);
    textStyle(NORMAL);
  }

  // Angle label on plot
  noStroke();
  fill(80, 90, 120);
  textAlign(LEFT, BOTTOM);
  textSize(10);
  text('PC1 angle: ' + angleDeg + '°', plotX1 + 6, plotY2 - 4);

  // Slider label
  noStroke();
  fill(60, 70, 100);
  textAlign(LEFT, TOP);
  textSize(11);
  textStyle(BOLD);
  text('PC1 Angle: ' + angleDeg + '°', 8, canvasHeight - 126);
  textStyle(NORMAL);

  // --- Variance panel (right side) ---
  let panelX = plotX2 + 14;
  let panelW = canvasWidth - panelX - 10;
  let panelTop = plotY1;
  let panelH = plotY2 - plotY1;

  fill(255, 255, 255, 240);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(panelX, panelTop, panelW, panelH, 8);

  noStroke();
  fill(40, 60, 100);
  textAlign(CENTER, TOP);
  textSize(11);
  textStyle(BOLD);
  text('Variance\nExplained', panelX + panelW / 2, panelTop + 8);
  textStyle(NORMAL);

  let barX = panelX + 12;
  let barW = panelW - 24;
  let barH = 24;

  // PC1 bar
  let bar1Y = panelTop + 52;
  fill(220, 80, 50);
  rect(barX, bar1Y, barW * (vars.pct1 / 100), barH, 4);
  fill(230, 235, 248);
  rect(barX + barW * (vars.pct1 / 100), bar1Y, barW * (1 - vars.pct1 / 100), barH, 0, 4, 4, 0);
  noStroke();
  fill(40, 50, 70);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('PC1', barX, bar1Y - 16);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  fill(vars.pct1 > 30 ? 255 : 60);
  textSize(11);
  textStyle(BOLD);
  text(nf(vars.pct1, 2, 1) + '%', barX + barW / 2, bar1Y + barH / 2);
  textStyle(NORMAL);

  // PC2 bar
  let bar2Y = panelTop + 116;
  fill(50, 180, 100);
  rect(barX, bar2Y, barW * (vars.pct2 / 100), barH, 4);
  fill(230, 235, 248);
  rect(barX + barW * (vars.pct2 / 100), bar2Y, barW * (1 - vars.pct2 / 100), barH, 0, 4, 4, 0);
  noStroke();
  fill(40, 50, 70);
  textAlign(LEFT, TOP);
  textSize(10);
  textStyle(BOLD);
  text('PC2', barX, bar2Y - 16);
  textStyle(NORMAL);
  textAlign(CENTER, CENTER);
  fill(vars.pct2 > 30 ? 255 : 60);
  textSize(11);
  textStyle(BOLD);
  text(nf(vars.pct2, 2, 1) + '%', barX + barW / 2, bar2Y + barH / 2);
  textStyle(NORMAL);

  // Optimal angle hint
  let diff = abs(angleDeg - trueAngle);
  let diffAlt = abs(angleDeg - (trueAngle + 180));
  let nearOptimal = min(diff, diffAlt) < 8;
  noStroke();
  if (nearOptimal) {
    fill(20, 160, 70);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    textStyle(BOLD);
    text('Near\nOptimal!', panelX + panelW / 2, panelTop + panelH - 8);
    textStyle(NORMAL);
  } else {
    fill(140, 150, 175);
    textAlign(CENTER, BOTTOM);
    textSize(9);
    text('Rotate to\nmaximize\nPC1', panelX + panelW / 2, panelTop + panelH - 8);
  }

  // Bottom description panel
  let descY = canvasHeight - 108;
  fill(255, 255, 255, 230);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, descY, canvasWidth - 32, 94, 8);

  noStroke();
  fill(40, 60, 100);
  textAlign(LEFT, TOP);
  textSize(12);
  textStyle(BOLD);
  text('Principal Component Analysis (PCA)', 28, descY + 8);
  textStyle(NORMAL);
  fill(60, 70, 90);
  textSize(11);
  text('PC1 (red) is the direction of maximum variance. PC2 (green) is perpendicular to PC1.', 28, descY + 30);
  text('Variance explained shows how much of the data spread each axis captures.', 28, descY + 50);
  text('Rotate the slider to find the angle where PC1 explains the most variance (≈' + trueAngle + '° for this dataset).', 28, descY + 70);
}

function drawArrowHead(x, y, angle, col) {
  fill(col);
  noStroke();
  push();
  translate(x, y);
  rotate(-angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}
