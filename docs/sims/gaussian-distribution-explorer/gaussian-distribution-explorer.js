// Gaussian Distribution Explorer MicroSim
// Interactive parameter explorer for the Gaussian (Normal) distribution
// Bloom Level: Apply (L3) - Verb: demonstrate
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 90;
let canvasHeight = drawHeight + controlHeight;
let margin = 50;
let sliderLeftMargin = 180;
let defaultTextSize = 14;

// Sliders and controls
let muSlider, sigmaSlider, showAreasCheck;

// Plot bounds
let xMin = -10, xMax = 10;
let yMin = 0, yMax = 0.85;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Mean slider: -5 to 5, default 0
  muSlider = createSlider(-50, 50, 0, 1);
  muSlider.position(sliderLeftMargin, drawHeight + 8);
  muSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Sigma slider: 0.5 to 3, step 0.1, default 1
  sigmaSlider = createSlider(5, 30, 10, 1);
  sigmaSlider.position(sliderLeftMargin, drawHeight + 38);
  sigmaSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Checkbox for 68-95-99.7 shading
  showAreasCheck = createCheckbox('Show 68-95-99.7 rule shading', false);
  showAreasCheck.position(sliderLeftMargin, drawHeight + 65);

  describe('Interactive Gaussian distribution explorer with mean and standard deviation controls', LABEL);
}

function draw() {
  updateCanvasSize();

  // Resize sliders on window change
  muSlider.size(canvasWidth - sliderLeftMargin - margin);
  sigmaSlider.size(canvasWidth - sliderLeftMargin - margin);

  // Get parameter values
  let mu = muSlider.value() / 10;    // -5 to 5
  let sigma = sigmaSlider.value() / 10; // 0.5 to 3.0

  // Background
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke();
  fill('black');
  textAlign(CENTER, TOP);
  textSize(17);
  text('Gaussian Distribution Explorer', canvasWidth / 2, 8);

  // Formula display
  textSize(12);
  fill(80);
  textAlign(CENTER, TOP);
  let formulaText = 'f(x) = (1 / √(2π·' + sigma.toFixed(1) + '²)) · exp(-(x - ' + mu.toFixed(1) + ')² / (2·' + sigma.toFixed(1) + '²))';
  text(formulaText, canvasWidth / 2, 30);

  // Plot axes
  drawAxes(mu, sigma);

  // Shaded areas (68-95-99.7)
  if (showAreasCheck.checked()) {
    drawShadedAreas(mu, sigma);
  }

  // Bell curve
  drawBellCurve(mu, sigma);

  // Mean line
  let mxPx = mapX(mu);
  stroke(200, 50, 50);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(mxPx, mapY(0), mxPx, mapY(gaussPDF(mu, mu, sigma)));
  drawingContext.setLineDash([]);

  // Mean label
  noStroke();
  fill(200, 50, 50);
  textAlign(CENTER, BOTTOM);
  textSize(12);
  text('μ=' + mu.toFixed(1), mxPx, mapY(gaussPDF(mu, mu, sigma)) - 4);

  // Control labels
  drawControlLabels(mu, sigma);
}

function gaussPDF(x, mu, sigma) {
  let coeff = 1 / (sigma * Math.sqrt(2 * Math.PI));
  let exponent = -((x - mu) ** 2) / (2 * sigma ** 2);
  return coeff * Math.exp(exponent);
}

function mapX(x) {
  return map(x, xMin, xMax, margin, canvasWidth - margin);
}

function mapY(y) {
  return map(y, yMin, yMax, drawHeight - margin / 2, margin + 40);
}

function drawBellCurve(mu, sigma) {
  let steps = 300;
  let dx = (xMax - xMin) / steps;

  stroke(70, 130, 200);
  strokeWeight(2.5);
  noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = xMin + i * dx;
    let y = gaussPDF(x, mu, sigma);
    vertex(mapX(x), mapY(y));
  }
  endShape();
}

function drawShadedAreas(mu, sigma) {
  let steps = 200;
  let dx = (xMax - xMin) / steps;

  // 3 sigma region (99.7%) — lightest
  drawFilledRegion(mu - 3 * sigma, mu + 3 * sigma, mu, sigma, color(100, 160, 230, 50), steps);
  // 2 sigma region (95%) — medium
  drawFilledRegion(mu - 2 * sigma, mu + 2 * sigma, mu, sigma, color(70, 130, 200, 80), steps);
  // 1 sigma region (68%) — darkest
  drawFilledRegion(mu - sigma, mu + sigma, mu, sigma, color(40, 100, 180, 120), steps);

  // Labels
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  let labelY = mapY(0) + 6;

  fill(40, 100, 180);
  text('68%', mapX(mu), mapY(gaussPDF(mu, mu, sigma) * 0.45));

  fill(70, 130, 200);
  let x2 = mu + 1.6 * sigma;
  if (x2 < xMax - 0.5) text('95%', mapX(x2), mapY(gaussPDF(x2, mu, sigma) + 0.015));

  fill(100, 160, 230);
  let x3 = mu + 2.6 * sigma;
  if (x3 < xMax - 0.5) text('99.7%', mapX(x3), mapY(gaussPDF(x3, mu, sigma) + 0.01));

  // Sigma markers on x-axis
  stroke(150); strokeWeight(1);
  for (let k = -3; k <= 3; k++) {
    if (k === 0) continue;
    let px = mapX(mu + k * sigma);
    if (px > margin && px < canvasWidth - margin) {
      line(px, mapY(0), px, mapY(0) + 5);
      noStroke(); fill(100); textAlign(CENTER, TOP); textSize(10);
      text(k + 'σ', px, mapY(0) + 7);
      stroke(150); strokeWeight(1);
    }
  }
}

function drawFilledRegion(x1, x2, mu, sigma, col, steps) {
  let dx = (x2 - x1) / steps;
  fill(col);
  noStroke();
  beginShape();
  vertex(mapX(x1), mapY(0));
  for (let i = 0; i <= steps; i++) {
    let x = x1 + i * dx;
    vertex(mapX(x), mapY(gaussPDF(x, mu, sigma)));
  }
  vertex(mapX(x2), mapY(0));
  endShape(CLOSE);
}

function drawAxes(mu, sigma) {
  stroke(100);
  strokeWeight(1);

  // X axis
  line(margin, mapY(0), canvasWidth - margin, mapY(0));
  // Y axis
  line(margin, margin + 40, margin, mapY(0));

  // X tick marks and labels
  noStroke();
  fill(80);
  textAlign(CENTER, TOP);
  textSize(11);
  for (let x = -10; x <= 10; x += 2) {
    let px = mapX(x);
    if (px >= margin && px <= canvasWidth - margin) {
      stroke(100); strokeWeight(1);
      line(px, mapY(0), px, mapY(0) + 4);
      noStroke();
      text(x, px, mapY(0) + 6);
    }
  }

  // Y tick marks
  for (let y = 0; y <= 0.8; y += 0.1) {
    let py = mapY(y);
    if (py >= margin + 40 && py <= mapY(0)) {
      stroke(100); strokeWeight(1);
      line(margin - 4, py, margin, py);
      noStroke(); fill(80);
      textAlign(RIGHT, CENTER); textSize(10);
      text(y.toFixed(1), margin - 6, py);
    }
  }

  // Axis labels
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(13);
  text('x', canvasWidth - margin + 10, mapY(0) - 6);
  textAlign(CENTER, BOTTOM); textSize(13);
  text('f(x)', margin + 8, margin + 38);
}

function drawControlLabels(mu, sigma) {
  noStroke();
  fill(60);
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Mean (μ): ' + mu.toFixed(1), 10, drawHeight + 14);
  text('Std Dev (σ): ' + sigma.toFixed(1), 10, drawHeight + 44);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  muSlider.size(canvasWidth - sliderLeftMargin - margin);
  sigmaSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
