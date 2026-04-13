// Slope and Intercept Explorer MicroSim
// Students manipulate slope and intercept sliders and observe regression line vs data
// Bloom Level: Apply (L3) - Verb: demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 100;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let sliderLeftMargin = 200;
let defaultTextSize = 14;

// Sliders and button
let slopeSlider, interceptSlider, showResidualsBtn;
let showResiduals = false;

// Data points (x, y) — generated from y = 1.2x + 0.5 + noise
let dataX = [], dataY = [];
let N = 15;

// Plot bounds
let xMin = 0, xMax = 6;
let yMin = -4, yMax = 10;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  generateData();

  // Slope slider: -3 to 3, default 1, step 0.1 (stored ×10)
  slopeSlider = createSlider(-30, 30, 12, 1);
  slopeSlider.position(sliderLeftMargin, drawHeight + 10);
  slopeSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Intercept slider: -5 to 5, default 0, step 0.1 (stored ×10)
  interceptSlider = createSlider(-50, 50, 5, 1);
  interceptSlider.position(sliderLeftMargin, drawHeight + 42);
  interceptSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Show/hide residuals button
  showResidualsBtn = createButton('Show Residuals');
  showResidualsBtn.position(10, drawHeight + 68);
  showResidualsBtn.mousePressed(() => {
    showResiduals = !showResiduals;
    showResidualsBtn.html(showResiduals ? 'Hide Residuals' : 'Show Residuals');
  });

  describe('Interactive slope and intercept explorer with residual visualization', LABEL);
}

function generateData() {
  dataX = []; dataY = [];
  randomSeed(42);
  for (let i = 0; i < N; i++) {
    let x = random(0.5, 5.5);
    let y = 1.2 * x + 0.5 + randomGaussian(0, 0.8);
    dataX.push(x);
    dataY.push(y);
  }
}

function draw() {
  updateCanvasSize();
  slopeSlider.size(canvasWidth - sliderLeftMargin - margin);
  interceptSlider.size(canvasWidth - sliderLeftMargin - margin);

  let slope     = slopeSlider.value() / 10;
  let intercept = interceptSlider.value() / 10;

  // Compute SSE
  let sse = 0;
  for (let i = 0; i < N; i++) {
    let yhat = slope * dataX[i] + intercept;
    let e = dataY[i] - yhat;
    sse += e * e;
  }

  // Backgrounds
  fill('aliceblue');
  stroke('silver'); strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Slope and Intercept Explorer', canvasWidth / 2, 8);

  drawAxes();

  // Residual lines
  if (showResiduals) {
    for (let i = 0; i < N; i++) {
      let px = mapX(dataX[i]);
      let yhat = slope * dataX[i] + intercept;
      let pyActual  = mapY(dataY[i]);
      let pyPred    = mapY(yhat);
      stroke(210, 60, 60, 180); strokeWeight(1.5);
      drawingContext.setLineDash([4, 3]);
      line(px, pyActual, px, pyPred);
      drawingContext.setLineDash([]);
    }
  }

  // Regression line
  let x0 = xMin, x1 = xMax;
  let y0 = slope * x0 + intercept;
  let y1 = slope * x1 + intercept;
  stroke(70, 130, 200); strokeWeight(2.5);
  line(mapX(x0), mapY(y0), mapX(x1), mapY(y1));

  // Data points
  for (let i = 0; i < N; i++) {
    let px = mapX(dataX[i]);
    let py = mapY(dataY[i]);
    fill(60, 60, 60); noStroke();
    circle(px, py, 9);
  }

  // Equation display (top right)
  noStroke();
  fill(70, 130, 200);
  textAlign(RIGHT, TOP); textSize(14);
  let eqStr = 'ŷ = ' + slope.toFixed(2) + ' · x + (' + intercept.toFixed(2) + ')';
  text(eqStr, canvasWidth - margin, margin);

  // SSE display
  fill(sse < 5 ? color(40, 160, 80) : sse < 15 ? color(200, 130, 0) : color(200, 60, 60));
  textSize(13);
  text('SSE = Σ(yᵢ − ŷᵢ)² = ' + sse.toFixed(2), canvasWidth - margin, margin + 20);

  // Control labels
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Slope (θ₁): ' + slope.toFixed(2), 10, drawHeight + 16);
  text('Intercept (θ₀): ' + intercept.toFixed(2), 10, drawHeight + 48);
}

function drawAxes() {
  stroke(140); strokeWeight(1);
  line(margin, mapY(0), canvasWidth - margin, mapY(0));
  line(margin, margin, margin, drawHeight - margin / 2);

  // X ticks
  for (let x = 0; x <= 6; x++) {
    let px = mapX(x);
    stroke(140); line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80); textAlign(CENTER, TOP); textSize(11);
    text(x, px, mapY(0) + 6);
  }
  // Y ticks
  for (let y = -4; y <= 10; y += 2) {
    let py = mapY(y);
    if (py < margin || py > drawHeight - margin / 2) continue;
    stroke(140); line(margin - 4, py, margin, py);
    noStroke(); fill(80); textAlign(RIGHT, CENTER); textSize(10);
    text(y, margin - 6, py);
  }

  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(12);
  text('x (feature)', canvasWidth / 2, drawHeight - 18);
  push();
  translate(14, (margin + mapY(yMin)) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER); textSize(12);
  text('y (target)', 0, 0);
  pop();
}

function mapX(x) { return map(x, xMin, xMax, margin, canvasWidth - margin); }
function mapY(y) { return map(y, yMin, yMax, drawHeight - margin / 2, margin); }

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  slopeSlider.size(canvasWidth - sliderLeftMargin - margin);
  interceptSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
