// Perceptron Architecture MicroSim
// Chapter 09: Neural Network Foundations
// Bloom Level: Understand (L2) - explain how a perceptron computes its output
// Shows inputs, weights, summation, activation function, and output

let canvasWidth = 700;
let drawHeight = 400;
let controlHeight = 155; // 4 rows of controls + extra
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Sliders
let x1Slider, x2Slider, x3Slider;
let w1Slider, w2Slider, w3Slider;
let biasSlider;
let activationSelect;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Input sliders x1, x2, x3
  x1Slider = createSlider(-30, 30, 10, 1);
  x1Slider.parent(document.querySelector('main'));

  x2Slider = createSlider(-30, 30, 15, 1);
  x2Slider.parent(document.querySelector('main'));

  x3Slider = createSlider(-30, 30, 5, 1);
  x3Slider.parent(document.querySelector('main'));

  // Weight sliders w1, w2, w3
  w1Slider = createSlider(-30, 30, 5, 1);
  w1Slider.parent(document.querySelector('main'));

  w2Slider = createSlider(-30, 30, -10, 1);
  w2Slider.parent(document.querySelector('main'));

  w3Slider = createSlider(-30, 30, 20, 1);
  w3Slider.parent(document.querySelector('main'));

  // Bias slider
  biasSlider = createSlider(-30, 30, 5, 1);
  biasSlider.parent(document.querySelector('main'));

  // Activation function selector
  activationSelect = createSelect();
  activationSelect.parent(document.querySelector('main'));
  activationSelect.option('sigmoid');
  activationSelect.option('tanh');
  activationSelect.option('relu');
  activationSelect.option('step');
  activationSelect.selected('sigmoid');

  positionControls();
  describe('Perceptron architecture showing inputs weighted summed with bias then passed through activation function', LABEL);
}

function positionControls() {
  let sliderW = max(100, canvasWidth - 280);
  let row1Y = drawHeight + 5;
  let row2Y = drawHeight + 40;
  let row3Y = drawHeight + 75;
  let row4Y = drawHeight + 110;

  // Row 1: x1, w1
  x1Slider.position(180, row1Y);
  x1Slider.size(sliderW / 2 - 10);
  w1Slider.position(180 + sliderW / 2 + 10, row1Y);
  w1Slider.size(sliderW / 2 - 10);

  // Row 2: x2, w2
  x2Slider.position(180, row2Y);
  x2Slider.size(sliderW / 2 - 10);
  w2Slider.position(180 + sliderW / 2 + 10, row2Y);
  w2Slider.size(sliderW / 2 - 10);

  // Row 3: x3, w3
  x3Slider.position(180, row3Y);
  x3Slider.size(sliderW / 2 - 10);
  w3Slider.position(180 + sliderW / 2 + 10, row3Y);
  w3Slider.size(sliderW / 2 - 10);

  // Row 4: bias, activation
  biasSlider.position(180, row4Y);
  biasSlider.size(sliderW / 2 - 10);
  activationSelect.position(180 + sliderW / 2 + 10, row4Y);
}

function draw() {
  updateCanvasSize();

  // Background regions
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);
  fill('white');
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Get slider values (divide by 10 for decimal range -3 to 3)
  let x1 = x1Slider.value() / 10;
  let x2 = x2Slider.value() / 10;
  let x3 = x3Slider.value() / 10;
  let w1 = w1Slider.value() / 10;
  let w2 = w2Slider.value() / 10;
  let w3 = w3Slider.value() / 10;
  let b = biasSlider.value() / 10;
  let actFn = activationSelect.value();

  // Compute weighted sum
  let z = w1 * x1 + w2 * x2 + w3 * x3 + b;
  let a = activate(z, actFn);

  // Layout positions
  let inputX = canvasWidth * 0.12;
  let sumX = canvasWidth * 0.48;
  let actX = canvasWidth * 0.68;
  let outX = canvasWidth * 0.88;
  let nodeY = [drawHeight * 0.25, drawHeight * 0.50, drawHeight * 0.75];
  let centerY = drawHeight * 0.50;
  let nodeR = 28;

  // Draw connections (input -> sum)
  stroke(180);
  strokeWeight(1.5);
  for (let i = 0; i < 3; i++) {
    line(inputX + nodeR, nodeY[i], sumX - nodeR, centerY);
  }
  // sum -> act
  line(sumX + nodeR, centerY, actX - nodeR, centerY);
  // act -> output
  line(actX + nodeR, centerY, outX - nodeR, centerY);

  // Weight labels on connections
  noStroke();
  fill(30, 100, 200);
  textSize(13);
  textAlign(CENTER, CENTER);
  let weights = [w1, w2, w3];
  let wLabels = ['w\u2081', 'w\u2082', 'w\u2083'];
  for (let i = 0; i < 3; i++) {
    let mx = (inputX + nodeR + sumX - nodeR) / 2;
    let my = (nodeY[i] + centerY) / 2;
    text(wLabels[i] + '=' + nf(weights[i], 1, 1), mx, my - 8);
  }

  // Input nodes
  for (let i = 0; i < 3; i++) {
    let xv = [x1, x2, x3][i];
    let lbl = ['x\u2081', 'x\u2082', 'x\u2083'][i];
    drawNode(inputX, nodeY[i], nodeR, color(100, 200, 100), lbl, nf(xv, 1, 1));
  }

  // Summation node
  drawSumNode(sumX, centerY, nodeR + 5, z, b);

  // Activation function node
  drawActNode(actX, centerY, nodeR + 5, actFn, a);

  // Output node
  drawNode(outX, centerY, nodeR, color(255, 160, 50), 'a', nf(a, 1, 3));

  // Bias arrow into sum node
  stroke(150, 50, 200);
  strokeWeight(1.5);
  let biasY = centerY - 70;
  line(sumX, biasY + 12, sumX, centerY - nodeR - 6);
  // Arrowhead
  fill(150, 50, 200);
  noStroke();
  triangle(sumX - 5, centerY - nodeR - 4, sumX + 5, centerY - nodeR - 4, sumX, centerY - nodeR + 4);
  noStroke();
  fill(150, 50, 200);
  textSize(13);
  textAlign(CENTER, CENTER);
  text('b=' + nf(b, 1, 1), sumX, biasY);

  // Formula display
  noStroke();
  fill(20);
  textSize(13);
  textAlign(LEFT, CENTER);
  let fStr = 'z = ' + nf(w1,1,1) + '\u00D7' + nf(x1,1,1) + ' + ' + nf(w2,1,1) + '\u00D7' + nf(x2,1,1) + ' + ' + nf(w3,1,1) + '\u00D7' + nf(x3,1,1) + ' + ' + nf(b,1,1) + ' = ' + nf(z,1,3);
  text(fStr, margin, drawHeight - 30);
  text('a = ' + actFn + '(z) = ' + nf(a, 1, 4), margin, drawHeight - 12);

  // Title
  noStroke();
  fill(20);
  textSize(20);
  textAlign(CENTER, TOP);
  text('Perceptron Architecture', canvasWidth / 2, 10);

  // Control labels
  textSize(13);
  textAlign(LEFT, CENTER);
  fill(20);
  noStroke();
  let row1Y = drawHeight + 15;
  let row2Y = drawHeight + 50;
  let row3Y = drawHeight + 85;
  let row4Y = drawHeight + 122;
  text('x\u2081: ' + nf(x1,1,1), margin, row1Y);
  text('x\u2082: ' + nf(x2,1,1), margin, row2Y);
  text('x\u2083: ' + nf(x3,1,1), margin, row3Y);
  text('Bias b: ' + nf(b,1,1), margin, row4Y);

  // Right side labels for weight sliders
  let midX = 175 + (canvasWidth - 280) / 2 + 5;
  text('w\u2081: ' + nf(w1,1,1), midX, row1Y);
  text('w\u2082: ' + nf(w2,1,1), midX, row2Y);
  text('w\u2083: ' + nf(w3,1,1), midX, row3Y);
  text('Activation:', midX, row4Y);
}

function drawNode(x, y, r, col, label, val) {
  stroke(80);
  strokeWeight(1.5);
  fill(col);
  ellipse(x, y, r * 2, r * 2);
  noStroke();
  fill(20);
  textSize(12);
  textAlign(CENTER, CENTER);
  text(label, x, y - 6);
  textSize(11);
  text(val, x, y + 8);
}

function drawSumNode(x, y, r, z, b) {
  stroke(80);
  strokeWeight(1.5);
  fill(220, 220, 255);
  ellipse(x, y, r * 2, r * 2);
  noStroke();
  fill(20);
  textSize(14);
  textAlign(CENTER, CENTER);
  text('\u03A3', x, y - 6);
  textSize(10);
  text('z=' + nf(z, 1, 2), x, y + 9);
}

function drawActNode(x, y, r, fn, a) {
  stroke(80);
  strokeWeight(1.5);
  fill(255, 220, 200);
  rect(x - r, y - r, r * 2, r * 2, 8);
  noStroke();
  fill(20);
  textSize(11);
  textAlign(CENTER, CENTER);
  text(fn, x, y - 6);
  textSize(10);
  text('a=' + nf(a, 1, 3), x, y + 9);
}

function activate(z, fn) {
  if (fn === 'sigmoid') return 1 / (1 + exp(-z));
  if (fn === 'tanh') return tanh(z);
  if (fn === 'relu') return max(0, z);
  if (fn === 'step') return z >= 0 ? 1 : 0;
  return z;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  positionControls();
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
