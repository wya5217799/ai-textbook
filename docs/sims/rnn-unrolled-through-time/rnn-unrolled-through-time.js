// RNN Unrolled Through Time MicroSim
// Shows RNN unrolled for 4 time steps
// x_t → h_t → y_t with h_t = tanh(W*h_{t-1} + U*x_t)

let canvasWidth = 700;
let canvasHeight = 460;
let selectedStep = -1;

// Time step data
let timeSteps = [
  { t: 1, x: 0.5,  h: 0.46, y: 0.29 },
  { t: 2, x: 0.8,  h: 0.72, y: 0.58 },
  { t: 3, x: 0.3,  h: 0.55, y: 0.41 },
  { t: 4, x: 0.6,  h: 0.65, y: 0.50 }
];

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  windowResized();
}

function windowResized() {
  canvasWidth = min(windowWidth, 860);
  canvasHeight = 460;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getTimeStepX(t) {
  let numSteps = timeSteps.length;
  let margin = 100;
  let available = canvasWidth - margin * 2;
  return margin + ((t - 1) / (numSteps - 1)) * available;
}

function mousePressed() {
  let nodeR = 28;
  for (let i = 0; i < timeSteps.length; i++) {
    let tx = getTimeStepX(i + 1);
    let hy = 220;
    // Check click on hidden node
    if (dist(mouseX, mouseY, tx, hy) < nodeR + 6) {
      selectedStep = (selectedStep === i) ? -1 : i;
      return;
    }
    // Check click on input node
    let xy = 340;
    if (dist(mouseX, mouseY, tx, xy) < nodeR + 6) {
      selectedStep = (selectedStep === i) ? -1 : i;
      return;
    }
    // Check click on output node
    let yy = 100;
    if (dist(mouseX, mouseY, tx, yy) < nodeR + 6) {
      selectedStep = (selectedStep === i) ? -1 : i;
      return;
    }
  }
  selectedStep = -1;
}

function drawArrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(2);
  line(x1, y1, x2, y2);
  // Arrowhead
  let angle = atan2(y2 - y1, x2 - x1);
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function draw() {
  background(245, 247, 250);

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('RNN Unrolled Through Time', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('Click any time step to see the hidden state formula', canvasWidth / 2, 32);

  let nodeR = 28;
  let hy = 220;  // hidden state y
  let xy = 350;  // input y
  let yy = 95;   // output y

  // Draw horizontal h_{t-1} → h_t arrows between hidden states
  for (let i = 0; i < timeSteps.length - 1; i++) {
    let x1 = getTimeStepX(i + 1) + nodeR;
    let x2 = getTimeStepX(i + 2) - nodeR;
    let isHighlighted = (selectedStep === i || selectedStep === i + 1);
    drawArrow(x1, hy, x2, hy, isHighlighted ? color(255, 160, 60) : color(140, 150, 180));
  }

  // Left arrow indicating h_0 → h_1
  {
    let x2 = getTimeStepX(1) - nodeR;
    let x1 = x2 - 36;
    stroke(160, 170, 200);
    strokeWeight(1.5);
    setLineDash([5, 4]);
    line(x1, hy, x2 - 6, hy);
    setLineDash([]);
    fill(160, 170, 200);
    noStroke();
    triangle(x2, hy, x2 - 10, hy - 4, x2 - 10, hy + 4);
    fill(130, 140, 170);
    textSize(10);
    textAlign(CENTER, CENTER);
    text('h₀', x1 - 14, hy);
  }

  // Draw each time step
  for (let i = 0; i < timeSteps.length; i++) {
    let ts = timeSteps[i];
    let tx = getTimeStepX(i + 1);
    let isSelected = (selectedStep === i);

    let accentCol = isSelected ? color(255, 140, 50) : color(100, 160, 255);

    // x_t → h_t arrow (vertical)
    drawArrow(tx, xy - nodeR, tx, hy + nodeR + 4,
      isSelected ? color(80, 200, 120) : color(160, 200, 170));

    // h_t → y_t arrow (vertical)
    drawArrow(tx, hy - nodeR, tx, yy + nodeR + 4,
      isSelected ? color(220, 100, 180) : color(180, 160, 200));

    // Input node x_t
    stroke(isSelected ? color(40, 160, 80) : color(100, 180, 120));
    strokeWeight(isSelected ? 3 : 1.5);
    fill(isSelected ? color(180, 255, 200) : color(220, 245, 225));
    ellipse(tx, xy, nodeR * 2, nodeR * 2);
    noStroke();
    fill(isSelected ? color(20, 100, 40) : color(40, 100, 60));
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('x' + subscript(ts.t), tx, xy - 7);
    textStyle(NORMAL);
    textSize(9.5);
    text(ts.x.toFixed(1), tx, xy + 8);

    // Hidden node h_t
    stroke(isSelected ? color(200, 100, 0) : color(120, 130, 180));
    strokeWeight(isSelected ? 3 : 1.5);
    fill(isSelected ? color(255, 230, 160) : color(220, 225, 255));
    ellipse(tx, hy, nodeR * 2, nodeR * 2);
    noStroke();
    fill(isSelected ? color(120, 50, 0) : color(50, 60, 120));
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('h' + subscript(ts.t), tx, hy - 7);
    textStyle(NORMAL);
    textSize(9.5);
    text(ts.h.toFixed(2), tx, hy + 8);

    // Output node y_t
    stroke(isSelected ? color(180, 0, 120) : color(160, 100, 180));
    strokeWeight(isSelected ? 3 : 1.5);
    fill(isSelected ? color(255, 200, 240) : color(240, 225, 255));
    ellipse(tx, yy, nodeR * 2, nodeR * 2);
    noStroke();
    fill(isSelected ? color(120, 0, 80) : color(80, 40, 120));
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('y' + subscript(ts.t), tx, yy - 7);
    textStyle(NORMAL);
    textSize(9.5);
    text(ts.y.toFixed(2), tx, yy + 8);

    // Time step label below input
    fill(100, 110, 130);
    noStroke();
    textSize(11);
    textStyle(BOLD);
    textAlign(CENTER, TOP);
    text('t=' + ts.t, tx, xy + nodeR + 5);
    textStyle(NORMAL);

    // Selection ring
    if (isSelected) {
      noFill();
      stroke(255, 200, 50);
      strokeWeight(2.5);
      ellipse(tx, hy, nodeR * 2 + 12, nodeR * 2 + 12);
      ellipse(tx, xy, nodeR * 2 + 12, nodeR * 2 + 12);
      ellipse(tx, yy, nodeR * 2 + 12, nodeR * 2 + 12);
    }
  }

  // Row labels
  noStroke();
  fill(80, 90, 120);
  textAlign(RIGHT, CENTER);
  textSize(11);
  textStyle(BOLD);
  let leftX = getTimeStepX(1) - nodeR - 10;
  text('y_t (output)', leftX, yy);
  text('h_t (hidden)', leftX, hy);
  text('x_t (input)', leftX, xy);
  textStyle(NORMAL);

  // Description panel
  let panelY = canvasHeight - 110;
  fill(255, 255, 255, 235);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, panelY, canvasWidth - 32, 96, 8);

  noStroke();
  if (selectedStep >= 0) {
    let ts = timeSteps[selectedStep];
    fill(200, 100, 0);
    rect(16, panelY, 5, 96, 8, 0, 0, 8);

    fill(40, 50, 70);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text('Time Step t=' + ts.t, 28, panelY + 10);
    textStyle(NORMAL);
    textSize(11);
    fill(60, 70, 90);
    text('Formula:  h_t = tanh(W · h_{t-1} + U · x_t)', 28, panelY + 30);
    text('x_' + ts.t + ' = ' + ts.x.toFixed(1) + '   h_' + (ts.t - 1) + ' (prev) → h_' + ts.t + ' = tanh(W·h_{t-1} + U·' + ts.x.toFixed(1) + ') = ' + ts.h.toFixed(2), 28, panelY + 50);
    text('y_' + ts.t + ' = sigmoid(V · h_' + ts.t + ') = ' + ts.y.toFixed(2) + '   — output at this step', 28, panelY + 70);
  } else {
    fill(120, 130, 155);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Click any time step node to see h_t = tanh(W·h_{t-1} + U·x_t) with values.', canvasWidth / 2, panelY + 30);
    textSize(11);
    text('The RNN maintains memory through the hidden state h_t passed between steps.', canvasWidth / 2, panelY + 58);
  }
}

function subscript(n) {
  const subs = ['₀','₁','₂','₃','₄','₅','₆','₇','₈','₉'];
  return subs[n] || String(n);
}

function setLineDash(segments) {
  drawingContext.setLineDash(segments);
}
