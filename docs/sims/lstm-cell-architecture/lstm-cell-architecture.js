// LSTM Cell Architecture MicroSim
// Shows: Forget Gate → Input Gate → Cell State update → Output Gate
// Click each gate to highlight and see its formula

let canvasWidth = 700;
let canvasHeight = 470;
let selectedGate = -1;

let gates = [
  {
    name: 'Forget Gate',
    symbol: 'f_t',
    shortLabel: 'Forget\nGate',
    formula: 'f_t = σ(W_f · [h_{t-1}, x_t] + b_f)',
    desc: 'The Forget Gate decides what information to discard from the cell state.\nσ is the sigmoid function, outputting values in (0,1).\nf_t ≈ 1: keep this cell state information\nf_t ≈ 0: forget this cell state information',
    color: [255, 130, 80],
    x: 0, y: 0  // set in draw
  },
  {
    name: 'Input Gate',
    symbol: 'i_t',
    shortLabel: 'Input\nGate',
    formula: 'i_t = σ(W_i · [h_{t-1}, x_t] + b_i)\n\u0303C_t = tanh(W_C · [h_{t-1}, x_t] + b_C)',
    desc: 'The Input Gate controls what new information to store in the cell state.\ni_t selects which values to update.\n\u0303C_t (candidate values) is a tanh vector of new candidate values.\nNew info added = i_t × \u0303C_t',
    color: [80, 190, 120],
    x: 0, y: 0
  },
  {
    name: 'Cell State Update',
    symbol: 'C_t',
    shortLabel: 'Cell State\nUpdate',
    formula: 'C_t = f_t × C_{t-1} + i_t × \u0303C_t',
    desc: 'The Cell State is the LSTM\'s long-term memory, running as a "conveyor belt".\nOld cell state C_{t-1} is multiplied by f_t (forget) to drop some values.\nNew candidate values scaled by i_t are added.\nThis allows gradients to flow over long sequences without vanishing.',
    color: [100, 160, 255],
    x: 0, y: 0
  },
  {
    name: 'Output Gate',
    symbol: 'o_t',
    shortLabel: 'Output\nGate',
    formula: 'o_t = σ(W_o · [h_{t-1}, x_t] + b_o)\nh_t = o_t × tanh(C_t)',
    desc: 'The Output Gate determines what part of the cell state to output as h_t.\no_t (sigmoid) filters which cell state values are output.\ntanh(C_t) pushes values to (-1, 1).\nh_t is the new hidden state passed to the next step.',
    color: [200, 80, 200],
    x: 0, y: 0
  }
];

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  windowResized();
}

function windowResized() {
  canvasWidth = min(windowWidth, 860);
  canvasHeight = 470;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getGatePos(i) {
  let numGates = gates.length;
  let margin = 80;
  let available = canvasWidth - margin * 2;
  let x = margin + (i / (numGates - 1)) * available;
  let y = 195;
  return { x, y };
}

function mousePressed() {
  for (let i = 0; i < gates.length; i++) {
    let pos = getGatePos(i);
    let bw = 110, bh = 68;
    if (mouseX >= pos.x - bw / 2 && mouseX <= pos.x + bw / 2 &&
        mouseY >= pos.y - bh / 2 && mouseY <= pos.y + bh / 2) {
      selectedGate = (selectedGate === i) ? -1 : i;
      return;
    }
  }
  selectedGate = -1;
}

function drawArrow(x1, y1, x2, y2, col, dashed) {
  stroke(col);
  strokeWeight(2);
  if (dashed) setLineDash([6, 4]);
  line(x1, y1, x2, y2);
  setLineDash([]);
  let angle = atan2(y2 - y1, x2 - x1);
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function setLineDash(segments) {
  drawingContext.setLineDash(segments);
}

function draw() {
  background(245, 247, 250);

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('LSTM Cell Architecture', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('Click any gate to see its formula and role', canvasWidth / 2, 32);

  let bw = 110, bh = 68;
  let gateY = 195;

  // Cell state "conveyor belt" line at top
  let csBeltY = 90;
  stroke(100, 160, 255, 180);
  strokeWeight(4);
  setLineDash([10, 4]);
  let firstX = getGatePos(0).x;
  let lastX = getGatePos(3).x;
  line(firstX - 40, csBeltY, lastX + 40, csBeltY);
  setLineDash([]);

  // Labels for C_{t-1} and C_t
  noStroke();
  fill(60, 100, 200);
  textAlign(RIGHT, CENTER);
  textSize(11);
  textStyle(BOLD);
  text('C_{t-1}', firstX - 44, csBeltY);
  textAlign(LEFT, CENTER);
  text('C_t', lastX + 44, csBeltY);
  textStyle(NORMAL);

  // Draw input arrows (x_t and h_{t-1})
  let inputY = gateY + bh / 2 + 20;

  // h_{t-1} → first gate from left
  drawArrow(firstX - 60, gateY, firstX - bw / 2, gateY, color(140, 100, 220), false);
  noStroke();
  fill(100, 60, 180);
  textAlign(RIGHT, CENTER);
  textSize(10);
  textStyle(BOLD);
  text('h_{t-1}', firstX - 64, gateY - 8);
  textStyle(NORMAL);

  // x_t entering all gates from below
  for (let i = 0; i < gates.length; i++) {
    let pos = getGatePos(i);
    drawArrow(pos.x, gateY + bh / 2 + 36, pos.x, gateY + bh / 2 + 2, color(80, 160, 100), false);
    noStroke();
    fill(40, 100, 60);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    textStyle(BOLD);
    text('x_t', pos.x, gateY + bh / 2 + 50);
    textStyle(NORMAL);
  }

  // Arrows between gates (horizontal, at gate level)
  for (let i = 0; i < gates.length - 1; i++) {
    let p1 = getGatePos(i);
    let p2 = getGatePos(i + 1);
    let isHighlighted = (selectedGate === i || selectedGate === i + 1);
    drawArrow(p1.x + bw / 2, gateY, p2.x - bw / 2, gateY,
      isHighlighted ? color(80, 80, 180) : color(160, 170, 200), false);
  }

  // Cell state interaction arrows (down from belt to gates, for F and I)
  for (let i = 0; i < 2; i++) {
    let pos = getGatePos(i);
    let isHighlighted = (selectedGate === i);
    stroke(isHighlighted ? color(60, 100, 220) : color(120, 150, 210, 140));
    strokeWeight(isHighlighted ? 2 : 1.5);
    setLineDash([5, 3]);
    line(pos.x, csBeltY + 2, pos.x, gateY - bh / 2 - 2);
    setLineDash([]);
    fill(isHighlighted ? color(60, 100, 220) : color(120, 150, 210, 140));
    noStroke();
    triangle(pos.x, gateY - bh / 2,
      pos.x - 5, gateY - bh / 2 - 8,
      pos.x + 5, gateY - bh / 2 - 8);
  }

  // Cell state update arrow (gate 2 → belt)
  {
    let pos = getGatePos(2);
    let isHighlighted = (selectedGate === 2);
    drawArrow(pos.x, gateY - bh / 2, pos.x, csBeltY + 2,
      isHighlighted ? color(100, 150, 255) : color(130, 160, 220, 140), false);
  }

  // Output arrow from Output Gate
  {
    let pos = getGatePos(3);
    let isHighlighted = (selectedGate === 3);
    drawArrow(pos.x + bw / 2, gateY, pos.x + bw / 2 + 50, gateY,
      isHighlighted ? color(180, 50, 180) : color(170, 130, 200), false);
    noStroke();
    fill(isHighlighted ? color(140, 0, 140) : color(130, 80, 160));
    textAlign(LEFT, CENTER);
    textSize(10);
    textStyle(BOLD);
    text('h_t', pos.x + bw / 2 + 54, gateY - 8);
    textStyle(NORMAL);
  }

  // Draw gate blocks
  for (let i = 0; i < gates.length; i++) {
    let gate = gates[i];
    let pos = getGatePos(i);
    let isSelected = (selectedGate === i);
    let col = color(...gate.color);

    // Shadow
    noStroke();
    fill(0, 0, 0, 18);
    rect(pos.x - bw / 2 + 3, pos.y - bh / 2 + 3, bw, bh, 8);

    // Block
    if (isSelected) {
      stroke(30, 30, 30);
      strokeWeight(3);
      fill(red(col) + 30, green(col) + 30, blue(col) + 30);
    } else {
      stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
      strokeWeight(1.5);
      fill(col);
    }
    rect(pos.x - bw / 2, pos.y - bh / 2, bw, bh, 8);

    // Gate label
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(11);
    textStyle(BOLD);
    text(gate.shortLabel, pos.x, pos.y);
    textStyle(NORMAL);

    // Symbol label above
    fill(isSelected ? col : color(80, 90, 120));
    textSize(11);
    textAlign(CENTER, BOTTOM);
    textStyle(BOLD);
    text(gate.symbol, pos.x, pos.y - bh / 2 - 5);
    textStyle(NORMAL);

    // Selection ring
    if (isSelected) {
      noFill();
      stroke(255, 220, 50);
      strokeWeight(3);
      rect(pos.x - bw / 2 - 4, pos.y - bh / 2 - 4, bw + 8, bh + 8, 10);
    }
  }

  // Description panel
  let panelY = canvasHeight - 120;
  fill(255, 255, 255, 235);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, panelY, canvasWidth - 32, 108, 8);

  noStroke();
  if (selectedGate >= 0) {
    let gate = gates[selectedGate];
    let col = color(...gate.color);
    fill(col);
    rect(16, panelY, 5, 108, 8, 0, 0, 8);

    fill(40, 50, 70);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(gate.name + '  (' + gate.symbol + ')', 28, panelY + 8);
    textStyle(NORMAL);

    fill(col);
    textSize(11);
    textStyle(ITALIC);
    text(gate.formula, 28, panelY + 28);
    textStyle(NORMAL);

    fill(60, 70, 90);
    textSize(11);
    text(gate.desc, 28, panelY + 52, canvasWidth - 56, 56);
  } else {
    fill(120, 130, 155);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Click any gate block to see its formula and role in the LSTM cell.', canvasWidth / 2, panelY + 30);
    textSize(11);
    text('Inputs: x_t (current input), h_{t-1} (previous hidden state), C_{t-1} (cell state)', canvasWidth / 2, panelY + 58);
    text('Outputs: h_t (new hidden state), C_t (updated cell state)', canvasWidth / 2, panelY + 80);
  }

  // Cell state belt label
  noStroke();
  fill(60, 100, 200);
  textAlign(CENTER, TOP);
  textSize(10);
  textStyle(BOLD);
  text('Cell State  C_t  (long-term memory)', canvasWidth / 2, csBeltY - 22);
  textStyle(NORMAL);
}
