// Loss Function Comparison MicroSim
// Plots squared loss, absolute loss, and cross-entropy loss side by side
// Bloom Level: Analyze (L4) - Verb: compare
// MicroSim template version 2026.02

let containerWidth;
let canvasWidth = 700;
let drawHeight = 380;
let controlHeight = 110;
let canvasHeight = drawHeight + controlHeight;
let margin = 55;
let sliderLeftMargin = 175;
let defaultTextSize = 14;

// Checkboxes and slider
let showSquaredCheck, showAbsCheck, showCECheck;
let errorSlider;

// Colors
let colSquared, colAbsolute, colCE;

// Plot domain for regression losses: error from -3 to 3
// For CE, we use predicted probability 0.01 to 0.99 (true label = 1)
let eMin = -3, eMax = 3;
let yMin = 0, yMax = 9;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(containerWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  colSquared  = color(70, 130, 200);   // blue
  colAbsolute = color(50, 170, 90);    // green
  colCE       = color(210, 70, 70);    // red

  // Checkboxes
  showSquaredCheck = createCheckbox('Squared Loss', true);
  showSquaredCheck.position(10, drawHeight + 8);
  showSquaredCheck.style('color', '#4682C8');

  showAbsCheck = createCheckbox('Absolute Loss', true);
  showAbsCheck.position(10, drawHeight + 32);
  showAbsCheck.style('color', '#32AA5A');

  showCECheck = createCheckbox('Cross-Entropy Loss (p=pred, y=1)', true);
  showCECheck.position(10, drawHeight + 56);
  showCECheck.style('color', '#D24646');

  // Slider: error position indicator, mapped -3 to 3 (×10)
  errorSlider = createSlider(-30, 30, 10, 1);
  errorSlider.position(sliderLeftMargin, drawHeight + 83);
  errorSlider.size(canvasWidth - sliderLeftMargin - margin);

  describe('Interactive comparison of squared, absolute, and cross-entropy loss functions', LABEL);
}

function draw() {
  updateCanvasSize();
  errorSlider.size(canvasWidth - sliderLeftMargin - margin);

  let errVal = errorSlider.value() / 10;  // -3 to 3

  // Backgrounds
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  noStroke(); fill('black');
  textAlign(CENTER, TOP); textSize(17);
  text('Loss Function Comparison', canvasWidth / 2, 8);

  drawAxes();

  // Draw curves
  if (showSquaredCheck.checked()) drawCurve('squared', colSquared);
  if (showAbsCheck.checked())     drawCurve('absolute', colAbsolute);
  if (showCECheck.checked())      drawCurve('ce', colCE);

  // Vertical indicator line
  let px = mapX(errVal);
  stroke(80); strokeWeight(1);
  drawingContext.setLineDash([5, 4]);
  line(px, mapY(yMax), px, mapY(0));
  drawingContext.setLineDash([]);

  // Value readouts at indicator
  let sqVal  = errVal * errVal;
  let absVal = Math.abs(errVal);
  // For CE: treat errVal as predicted prob mapped 0.01..0.99 when CE is shown
  // Map errVal (-3..3) -> pred prob (0.01..0.99)
  let predProb = constrain(map(errVal, eMin, eMax, 0.01, 0.99), 0.01, 0.99);
  let ceVal  = -Math.log(predProb);

  let readX = px + 8;
  if (readX > canvasWidth - 120) readX = px - 110;

  noStroke();
  textAlign(LEFT, TOP); textSize(12);
  let readY = margin + 40;

  if (showSquaredCheck.checked()) {
    fill(colSquared);
    let dotY = mapY(sqVal);
    if (dotY >= margin && dotY <= drawHeight - margin / 2) {
      noStroke(); fill(colSquared);
      circle(mapX(errVal), dotY, 8);
      fill(colSquared);
      text('Sq: ' + sqVal.toFixed(2), readX, readY);
      readY += 16;
    }
  }
  if (showAbsCheck.checked()) {
    let dotY = mapY(absVal);
    if (dotY >= margin && dotY <= drawHeight - margin / 2) {
      noStroke(); fill(colAbsolute);
      circle(mapX(errVal), dotY, 8);
      fill(colAbsolute);
      text('Abs: ' + absVal.toFixed(2), readX, readY);
      readY += 16;
    }
  }
  if (showCECheck.checked()) {
    let ceY = mapY(min(ceVal, yMax - 0.1));
    if (ceY >= margin && ceY <= drawHeight - margin / 2) {
      noStroke(); fill(colCE);
      circle(mapX(errVal), ceY, 8);
      fill(colCE);
      text('CE: ' + ceVal.toFixed(2) + ' (p=' + predProb.toFixed(2) + ')', readX, readY);
    }
  }

  // Annotation: region where squared > absolute
  noStroke(); fill(160);
  textAlign(CENTER, TOP); textSize(11);
  text('← Abs > Sq for small errors | Sq > Abs for large errors →', canvasWidth / 2, drawHeight - 22);

  // Control label
  noStroke(); fill(60);
  textAlign(LEFT, CENTER); textSize(13);
  text('Error / Predicted probability: ' + errVal.toFixed(1), 10, drawHeight + 90);
}

function lossValue(type, x) {
  if (type === 'squared')  return x * x;
  if (type === 'absolute') return Math.abs(x);
  // cross-entropy: map x (-3..3) to prob (0.01..0.99), true label y=1 → -log(pred)
  let p = constrain(map(x, eMin, eMax, 0.01, 0.99), 0.01, 0.99);
  return -Math.log(p);
}

function drawCurve(type, col) {
  let steps = 300;
  let dx = (eMax - eMin) / steps;
  stroke(col); strokeWeight(2.5); noFill();
  beginShape();
  for (let i = 0; i <= steps; i++) {
    let x = eMin + i * dx;
    let y = lossValue(type, x);
    if (y > yMax + 0.5) continue;
    vertex(mapX(x), mapY(constrain(y, 0, yMax)));
  }
  endShape();
}

function drawAxes() {
  stroke(120); strokeWeight(1);
  // X axis
  line(margin, mapY(0), canvasWidth - margin, mapY(0));
  // Y axis
  line(margin, margin, margin, mapY(0));

  // X ticks
  for (let x = eMin; x <= eMax; x += 1) {
    let px = mapX(x);
    stroke(120); strokeWeight(1);
    line(px, mapY(0), px, mapY(0) + 4);
    noStroke(); fill(80);
    textAlign(CENTER, TOP); textSize(11);
    text(x.toFixed(0), px, mapY(0) + 6);
  }

  // Y ticks
  for (let y = 0; y <= yMax; y += 1) {
    let py = mapY(y);
    if (py < margin) continue;
    stroke(120); strokeWeight(1);
    line(margin - 4, py, margin, py);
    noStroke(); fill(80);
    textAlign(RIGHT, CENTER); textSize(10);
    text(y, margin - 6, py);
  }

  // Axis labels
  noStroke(); fill(60);
  textAlign(CENTER, TOP); textSize(13);
  text('Error  (or predicted prob for CE)', canvasWidth / 2, mapY(0) + 18);
  push();
  translate(14, (margin + mapY(0)) / 2);
  rotate(-HALF_PI);
  textAlign(CENTER, CENTER); textSize(13);
  text('Loss', 0, 0);
  pop();
}

function mapX(x) {
  return map(x, eMin, eMax, margin, canvasWidth - margin);
}

function mapY(y) {
  return map(y, yMin, yMax, drawHeight - margin / 2, margin);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(containerWidth, canvasHeight);
  errorSlider.size(canvasWidth - sliderLeftMargin - margin);
  redraw();
}

function updateCanvasSize() {
  const container = document.querySelector('main').getBoundingClientRect();
  containerWidth = Math.floor(container.width);
  canvasWidth = containerWidth;
}
