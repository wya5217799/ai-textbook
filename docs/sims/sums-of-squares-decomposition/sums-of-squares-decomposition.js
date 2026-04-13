// Sums of Squares Decomposition MicroSim
// Visualizes SST, SSR, SSE for each data point with click-to-select
// Bloom Level: Analyze (L4) - Verb: differentiate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 390;
let controlHeight = 70;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let defaultTextSize = 14;

// Toggle buttons for highlight modes
let showSSTBtn, showSSRBtn, showSSEBtn;
let highlightMode = 'all'; // 'all', 'sst', 'ssr', 'sse'

// Data
let dataX = [], dataY = [];
let N = 12;
let slope, intercept, yMean;
let SST, SSR, SSE;

// Selected point
let selectedIdx = -1;

// Plot bounds
let xMin = 0, xMax = 7;
let yMin = -1, yMax = 11;

// Colors
let colSST, colSSR, colSSE;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colSST = color(70, 130, 200);    // blue  — total
  colSSR = color(50, 170, 90);     // green — regression (explained)
  colSSE = color(210, 70, 70);     // red   — error (unexplained)

  generateData();

  // Buttons
  showSSTBtn = createButton('Highlight SST');
  showSSTBtn.position(10, drawHeight + 8);
  showSSTBtn.mousePressed(() => { highlightMode = highlightMode === 'sst' ? 'all' : 'sst'; });

  showSSRBtn = createButton('Highlight SSR');
  showSSRBtn.position(130, drawHeight + 8);
  showSSRBtn.mousePressed(() => { highlightMode = highlightMode === 'ssr' ? 'all' : 'ssr'; });

  showSSEBtn = createButton('Highlight SSE');
  showSSEBtn.position(250, drawHeight + 8);
  showSSEBtn.mousePressed(() => { highlightMode = highlightMode === 'sse' ? 'all' : 'sse'; });

  describe('Sums of squares decomposition: click data points to see SST, SSR, SSE components', LABEL);
}

function generateData() {
  dataX = []; dataY = [];
  randomSeed(99);
  for (let i = 0; i < N; i++) {
    let x = random(0.5, 6.5);
    let y = 1.3 * x + 1.0 + randomGaussian(0, 0.9);
    dataX.push(x);
    dataY.push(y);
  }
  computeRegression();
}

function computeRegression() {
  // Simple OLS slope and intercept
  let xBar = dataX.reduce((s, v) => s + v, 0) / N;
  yMean    = dataY.reduce((s, v) => s + v, 0) / N;
  let num = 0, den = 0;
  for (let i = 0; i < N; i++) {
    num += (dataX[i] - xBar) * (dataY[i] - yMean);
    den += (dataX[i] - xBar) ** 2;
  }
  slope     = num / den;
  intercept = yMean - slope * xBar;

  SST = 0; SSR = 0; SSE = 0;
  for (let i = 0; i < N; i++) {
    let yhat = slope * dataX[i] + intercept;
    SST += (dataY[i] - yMean) ** 2;
    SSR += (yhat     - yMean) ** 2;
    SSE += (dataY[i] - yhat)  ** 2;
  }
}

function draw() {
  updateCanvasSize();

  fill('aliceblue'); stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Sums of Squares Decomposition', canvasWidth / 2, 8);

  drawAxes();

  // Draw segments for all or highlighted mode
  for (let i = 0; i < N; i++) {
    drawSegments(i, highlightMode, i === selectedIdx);
  }

  // Regression line
  stroke(70, 130, 200); strokeWeight(2.5);
  line(mapX(xMin), mapY(slope * xMin + intercept),
       mapX(xMax), mapY(slope * xMax + intercept));

  // Mean line
  stroke(100); strokeWeight(1.5);
  drawingContext.setLineDash([6, 4]);
  line(mapX(xMin), mapY(yMean), mapX(xMax), mapY(yMean));
  drawingContext.setLineDash([]);
  noStroke(); fill(80); textAlign(LEFT, BOTTOM); textSize(11);
  text('ȳ = ' + yMean.toFixed(2), mapX(xMin) + 4, mapY(yMean) - 3);

  // Data points
  for (let i = 0; i < N; i++) {
    let px = mapX(dataX[i]);
    let py = mapY(dataY[i]);
    fill(i === selectedIdx ? color(255, 200, 0) : color(40, 40, 40));
    stroke(i === selectedIdx ? color(180, 130, 0) : 'white');
    strokeWeight(1.5);
    circle(px, py, 11);
  }

  // Side panel: stacked bar for SST = SSR + SSE
  drawSidePanel();

  // Selected point details
  if (selectedIdx >= 0) drawSelectedDetails(selectedIdx);

  // Summary stats (bottom of draw area)
  noStroke(); fill(60);
  textAlign(LEFT, BOTTOM); textSize(12);
  let r2 = SSR / SST;
  text('SST=' + SST.toFixed(2) + '  SSR=' + SSR.toFixed(2) + '  SSE=' + SSE.toFixed(2) +
       '  R²=' + r2.toFixed(3) + '  (SST = SSR + SSE)', margin, drawHeight - 6);

  // Button labels highlight
  updateButtonStyles();
}

function drawSegments(idx, mode, isSelected) {
  let x  = dataX[idx];
  let y  = dataY[idx];
  let yhat = slope * x + intercept;
  let px = mapX(x);

  let alpha = isSelected ? 255 : (mode === 'all' ? 160 : 80);

  // SST: y_i to yMean (blue)
  if (mode === 'all' || mode === 'sst') {
    stroke(red(colSST), green(colSST), blue(colSST), isSelected ? 255 : alpha);
    strokeWeight(isSelected ? 2.5 : 1.5);
    line(px, mapY(y), px - 6, mapY(yMean));
  }
  // SSR: yhat to yMean (green)
  if (mode === 'all' || mode === 'ssr') {
    stroke(red(colSSR), green(colSSR), blue(colSSR), isSelected ? 255 : alpha);
    strokeWeight(isSelected ? 2.5 : 1.5);
    line(px, mapY(yhat), px + 6, mapY(yMean));
  }
  // SSE: y_i to yhat (red)
  if (mode === 'all' || mode === 'sse') {
    stroke(red(colSSE), green(colSSE), blue(colSSE), isSelected ? 255 : alpha);
    strokeWeight(isSelected ? 2.5 : 1.5);
    line(px, mapY(y), px, mapY(yhat));
  }
}

function drawSelectedDetails(idx) {
  let x    = dataX[idx];
  let y    = dataY[idx];
  let yhat = slope * x + intercept;

  let panelX = canvasWidth - 210;
  let panelY = margin;

  noStroke(); fill(255, 255, 240, 230);
  rect(panelX - 5, panelY - 5, 200, 95, 4);

  fill(60); textAlign(LEFT, TOP); textSize(12);
  text('Point ' + (idx+1) + ':  x=' + x.toFixed(2) + '  y=' + y.toFixed(2), panelX, panelY);

  fill(colSST); textSize(12);
  text('SST contrib: (y−ȳ)² = ' + ((y - yMean)**2).toFixed(2), panelX, panelY + 18);

  fill(colSSR);
  text('SSR contrib: (ŷ−ȳ)² = ' + ((yhat - yMean)**2).toFixed(2), panelX, panelY + 36);

  fill(colSSE);
  text('SSE contrib: (y−ŷ)² = ' + ((y - yhat)**2).toFixed(2), panelX, panelY + 54);

  fill(80); textSize(11);
  text('ŷ = ' + yhat.toFixed(2), panelX, panelY + 74);
}

function drawSidePanel() {
  let barX = canvasWidth - margin + 5;
  let barW = margin - 10;
  let barMaxH = drawHeight - 2 * margin;
  let barBase = drawHeight - margin / 2;

  // SST bar (total height)
  let sstH = barMaxH * 0.8;
  let ssrH = sstH * (SSR / SST);
  let sseH = sstH * (SSE / SST);

  // SSR (green, bottom)
  fill(colSSR); noStroke();
  rect(barX, barBase - ssrH, barW, ssrH);

  // SSE (red, on top of SSR)
  fill(colSSE);
  rect(barX, barBase - ssrH - sseH, barW, sseH);

  // Border
  stroke(100); strokeWeight(1); noFill();
  rect(barX, barBase - sstH, barW, sstH);

  // Labels
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(10);
  text('SST', barX + barW / 2, margin + 2);
  fill(colSSR); textSize(9);
  text('SSR', barX + barW / 2, barBase - ssrH + 3);
  fill(colSSE);
  text('SSE', barX + barW / 2, barBase - ssrH - sseH + 3);
}

function drawAxes() {
  stroke(140); strokeWeight(1);
  line(margin, mapY(0), canvasWidth - margin * 1.5, mapY(0));
  line(margin, margin, margin, drawHeight - margin / 2);

  for (let x = 0; x <= 7; x++) {
    let px = mapX(x);
    if (px > canvasWidth - margin * 1.5) continue;
    stroke(140); line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(10);
    text(x, px, mapY(0) + 6);
  }
  for (let y = 0; y <= 10; y += 2) {
    let py = mapY(y);
    if (py < margin || py > drawHeight - margin / 2) continue;
    stroke(140); line(margin - 4, py, margin, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10);
    text(y, margin - 6, py);
  }
}

function mousePressed() {
  // Check if a data point was clicked
  for (let i = 0; i < N; i++) {
    let px = mapX(dataX[i]);
    let py = mapY(dataY[i]);
    if (dist(mouseX, mouseY, px, py) < 10) {
      selectedIdx = (selectedIdx === i) ? -1 : i;
      return;
    }
  }
  selectedIdx = -1;
}

function updateButtonStyles() {
  showSSTBtn.style('background', highlightMode === 'sst' ? '#4682C8' : '');
  showSSTBtn.style('color', highlightMode === 'sst' ? 'white' : '');
  showSSRBtn.style('background', highlightMode === 'ssr' ? '#32AA5A' : '');
  showSSRBtn.style('color', highlightMode === 'ssr' ? 'white' : '');
  showSSEBtn.style('background', highlightMode === 'sse' ? '#D24646' : '');
  showSSEBtn.style('color', highlightMode === 'sse' ? 'white' : '');
}

function mapX(x) { return map(x, xMin, xMax, margin, canvasWidth - margin * 1.5); }
function mapY(y) { return map(y, yMin, yMax, drawHeight - margin / 2, margin); }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
