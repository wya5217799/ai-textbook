// Activation Function Comparison — p5.js
// Plots Sigmoid, Tanh, and ReLU on the same axes with an interactive input slider.

let canvasWidth = 700;
const canvasHeight = 500;
const controlHeight = 60;
const drawHeight = canvasHeight - controlHeight;

// Margin around the plot area
const margin = { top: 30, right: 20, bottom: 50, left: 60 };

let inputSlider;
let xInput = 0; // current x value from slider

function setup() {
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Slider: x input from -5 to 5
  inputSlider = createSlider(-500, 500, 0, 1);
  inputSlider.parent(document.querySelector('main'));
  inputSlider.style('width', '80%');

  updateCanvasSize();
}

function updateCanvasSize() {
  canvasWidth = min(windowWidth, 720);
  resizeCanvas(canvasWidth, canvasHeight);
}

function windowResized() {
  updateCanvasSize();
}

function draw() {
  background(250);

  xInput = inputSlider.value() / 100;

  drawPlot();
  drawControls();
}

function drawPlot() {
  const pw = canvasWidth - margin.left - margin.right;
  const ph = drawHeight - margin.top - margin.bottom;

  // Axes ranges
  const xMin = -5, xMax = 5;
  const yMin = -1.2, yMax = 1.2;

  // Helper: data → canvas
  function toCanvasX(x) {
    return margin.left + ((x - xMin) / (xMax - xMin)) * pw;
  }
  function toCanvasY(y) {
    return margin.top + ((yMax - y) / (yMax - yMin)) * ph;
  }

  // Grid & axes
  strokeWeight(1);
  stroke(200);
  noFill();
  // horizontal grid lines
  for (let y = -1; y <= 1; y += 0.5) {
    line(margin.left, toCanvasY(y), margin.left + pw, toCanvasY(y));
  }
  // vertical grid lines
  for (let x = -4; x <= 4; x += 1) {
    line(toCanvasX(x), margin.top, toCanvasX(x), margin.top + ph);
  }

  // Axis lines
  stroke(100);
  strokeWeight(1.5);
  // x-axis at y=0
  line(margin.left, toCanvasY(0), margin.left + pw, toCanvasY(0));
  // y-axis at x=0
  line(toCanvasX(0), margin.top, toCanvasX(0), margin.top + ph);

  // Axis labels
  noStroke();
  fill(80);
  textSize(11);
  textAlign(CENTER);
  for (let x = -4; x <= 4; x += 1) {
    text(x, toCanvasX(x), margin.top + ph + 18);
  }
  textAlign(RIGHT);
  for (let y = -1; y <= 1; y += 0.5) {
    text(nf(y, 1, 1), margin.left - 6, toCanvasY(y) + 4);
  }

  // Axis titles
  noStroke();
  fill(60);
  textSize(12);
  textAlign(CENTER);
  text('Input x', margin.left + pw / 2, margin.top + ph + 38);
  push();
  translate(14, margin.top + ph / 2);
  rotate(-HALF_PI);
  text('Output', 0, 0);
  pop();

  // Function definitions
  const functions = [
    {
      name: 'Sigmoid',
      color: [220, 60, 60],
      fn: x => 1 / (1 + Math.exp(-x))
    },
    {
      name: 'Tanh',
      color: [50, 140, 220],
      fn: x => Math.tanh(x)
    },
    {
      name: 'ReLU',
      color: [40, 170, 90],
      fn: x => Math.max(0, x)
    }
  ];

  const step = (xMax - xMin) / pw;

  // Draw curves
  for (const f of functions) {
    stroke(...f.color);
    strokeWeight(2.5);
    noFill();
    beginShape();
    for (let x = xMin; x <= xMax; x += step) {
      const y = f.fn(x);
      vertex(toCanvasX(x), toCanvasY(y));
    }
    endShape();
  }

  // Vertical line at xInput
  stroke(180, 60, 200);
  strokeWeight(1.5);
  drawingContext.setLineDash([5, 4]);
  line(toCanvasX(xInput), margin.top, toCanvasX(xInput), margin.top + ph);
  drawingContext.setLineDash([]);

  // Dots at intersection + values
  for (const f of functions) {
    const y = f.fn(xInput);
    const cx = toCanvasX(xInput);
    const cy = toCanvasY(y);
    fill(...f.color);
    stroke(255);
    strokeWeight(1.5);
    ellipse(cx, cy, 10, 10);
  }

  // Legend
  const legendX = margin.left + pw - 140;
  const legendY = margin.top + 10;
  for (let i = 0; i < functions.length; i++) {
    const f = functions[i];
    const lx = legendX;
    const ly = legendY + i * 22;
    fill(...f.color);
    noStroke();
    rect(lx, ly, 22, 4, 2);
    fill(40);
    textSize(12);
    textAlign(LEFT);
    const val = f.fn(xInput);
    text(`${f.name}: ${nf(val, 1, 4)}`, lx + 28, ly + 4);
  }

  // Title
  noStroke();
  fill(30);
  textSize(15);
  textAlign(CENTER);
  textStyle(BOLD);
  text('Activation Function Comparison', margin.left + pw / 2, margin.top - 10);
  textStyle(NORMAL);
}

function drawControls() {
  // Control panel background
  noStroke();
  fill(235);
  rect(0, drawHeight, canvasWidth, controlHeight);

  fill(40);
  textSize(13);
  textAlign(LEFT);
  text(`Input x = ${nf(xInput, 1, 2)}`, 14, drawHeight + 22);

  fill(100);
  textSize(11);
  text('Drag slider to change x value', 14, drawHeight + 42);
}
