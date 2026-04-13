// Chain Rule in Neural Networks MicroSim
// Bloom Level: Understand (L2)
// Step-through of chain rule across a 3-layer computation graph

let currentStep = 0;
let btnNext, btnPrev;
let canvasWidth, canvasHeight;

// Network: x → z1=w1*x+b1 → a1=relu(z1) → z2=w2*a1+b2 → a2=sigmoid(z2) → L=loss
// Fixed example values
const w1 = 0.5,  b1 = 0.2, x  = 1.5;
const w2 = 0.8,  b2 = 0.1;
const y  = 1.0;  // true label

const z1 = w1 * x + b1;                    // 0.95
const a1 = Math.max(0, z1);                 // relu
const z2 = w2 * a1 + b2;                   // 0.86
const a2 = 1 / (1 + Math.exp(-z2));        // sigmoid
const L  = -y * Math.log(a2) - (1-y) * Math.log(1 - a2); // BCE loss

// Derivatives
const dL_da2  = -y / a2 + (1-y) / (1 - a2);
const da2_dz2 = a2 * (1 - a2);
const dz2_da1 = w2;
const da1_dz1 = z1 > 0 ? 1 : 0; // ReLU derivative
const dz1_dw1 = x;

const dL_dz2  = dL_da2 * da2_dz2;
const dL_da1  = dL_dz2 * dz2_da1;
const dL_dz1  = dL_da1 * da1_dz1;
const dL_dw1  = dL_dz1 * dz1_dw1;

const STEPS = [
  {
    title: "Step 1: Forward Pass — Compute Network Output",
    highlight: "all",
    desc: [
      `Forward pass evaluates each node left to right.`,
      `z₁ = w₁·x + b₁ = ${w1}·${x} + ${b1} = ${z1.toFixed(4)}`,
      `a₁ = ReLU(z₁) = max(0, ${z1.toFixed(4)}) = ${a1.toFixed(4)}`,
      `z₂ = w₂·a₁ + b₂ = ${w2}·${a1.toFixed(4)} + ${b2} = ${z2.toFixed(4)}`,
      `a₂ = σ(z₂) = 1/(1+e^{−${z2.toFixed(4)}}) = ${a2.toFixed(4)}`,
      `L = −y·log(a₂) = −log(${a2.toFixed(4)}) = ${L.toFixed(4)}`,
    ],
  },
  {
    title: "Step 2: ∂L/∂a₂ — Loss w.r.t. Output Activation",
    highlight: "output",
    focus: "dL_da2",
    desc: [
      `Backpropagation starts at the loss layer.`,
      `BCE Loss:  L = −y·log(a₂) − (1−y)·log(1−a₂)`,
      `∂L/∂a₂ = −y/a₂ + (1−y)/(1−a₂)`,
      `       = −${y}/${a2.toFixed(4)} + ${1-y}/${(1-a2).toFixed(4)}`,
      `       = ${dL_da2.toFixed(4)}`,
    ],
  },
  {
    title: "Step 3: ∂L/∂z₂ — Chain Rule Through Sigmoid",
    highlight: "layer2",
    focus: "dL_dz2",
    desc: [
      `Apply chain rule:  ∂L/∂z₂ = ∂L/∂a₂ · ∂a₂/∂z₂`,
      `Sigmoid derivative:  ∂a₂/∂z₂ = a₂·(1−a₂)`,
      `  = ${a2.toFixed(4)}·(1−${a2.toFixed(4)}) = ${da2_dz2.toFixed(4)}`,
      `∂L/∂z₂ = ${dL_da2.toFixed(4)} × ${da2_dz2.toFixed(4)} = ${dL_dz2.toFixed(4)}`,
    ],
  },
  {
    title: "Step 4: ∂L/∂w₁ — Chain Rule to First Weight",
    highlight: "layer1",
    focus: "dL_dw1",
    desc: [
      `Continue chaining back through a₁ and z₁:`,
      `∂L/∂a₁ = ∂L/∂z₂ · ∂z₂/∂a₁ = ${dL_dz2.toFixed(4)} × w₂(${w2}) = ${dL_da1.toFixed(4)}`,
      `∂L/∂z₁ = ∂L/∂a₁ · ∂a₁/∂z₁ (ReLU′=${da1_dz1}) = ${dL_dz1.toFixed(4)}`,
      `∂L/∂w₁ = ∂L/∂z₁ · ∂z₁/∂w₁ = ${dL_dz1.toFixed(4)} × x(${x}) = ${dL_dw1.toFixed(4)}`,
      `Update:  w₁ ← w₁ − α·(∂L/∂w₁)  (gradient descent)`,
    ],
  },
];

// Node positions (set in draw based on canvas size)
let nodes = [];
function computeNodes() {
  let cx = canvasWidth / 2;
  let baseY = 175;
  nodes = [
    { id: "x",  label: "x",  value: x.toFixed(2),             layer: "input",  color: [140,140,140] },
    { id: "z1", label: "z₁", value: z1.toFixed(4),            layer: "hidden", color: [52,120,210]  },
    { id: "a1", label: "a₁", value: a1.toFixed(4),            layer: "hidden", color: [52,120,210]  },
    { id: "z2", label: "z₂", value: z2.toFixed(4),            layer: "output", color: [200,100,40]  },
    { id: "a2", label: "a₂", value: a2.toFixed(4),            layer: "output", color: [200,100,40]  },
    { id: "L",  label: "L",  value: L.toFixed(4),             layer: "loss",   color: [180,50,50]   },
  ];
  let n = nodes.length;
  let spacing = (canvasWidth - 80) / (n - 1);
  for (let i = 0; i < n; i++) {
    nodes[i].x = 40 + i * spacing;
    nodes[i].y = baseY;
  }
}

// Edges with labels
function getEdges(step) {
  let s = STEPS[step];
  return [
    { from: 0, to: 1, label: `z₁=w₁·x+b₁`, back: "∂z₁/∂w₁=x",   active: step >= 3 && s.focus === "dL_dw1" },
    { from: 1, to: 2, label: `a₁=ReLU(z₁)`,  back: "∂a₁/∂z₁=ReLU′", active: step >= 3 },
    { from: 2, to: 3, label: `z₂=w₂·a₁+b₂`, back: "∂z₂/∂a₁=w₂",  active: step >= 2 },
    { from: 3, to: 4, label: `a₂=σ(z₂)`,     back: "∂a₂/∂z₂=σ′",  active: step >= 2 },
    { from: 4, to: 5, label: `L=BCE(a₂,y)`,  back: "∂L/∂a₂",       active: step >= 1 },
  ];
}

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  btnPrev = createButton('◀ Prev');
  btnPrev.parent('main');
  btnPrev.style('margin', '8px 6px');
  btnPrev.style('padding', '7px 18px');
  btnPrev.style('font-size', '14px');
  btnPrev.style('cursor', 'pointer');
  btnPrev.mousePressed(() => { currentStep = max(0, currentStep - 1); redraw(); });

  btnNext = createButton('Next ▶');
  btnNext.parent('main');
  btnNext.style('margin', '8px 6px');
  btnNext.style('padding', '7px 18px');
  btnNext.style('font-size', '14px');
  btnNext.style('cursor', 'pointer');
  btnNext.mousePressed(() => { currentStep = min(STEPS.length - 1, currentStep + 1); redraw(); });

  noLoop();
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function draw() {
  background(248);
  computeNodes();

  let step = STEPS[currentStep];

  // Title
  fill(30);
  noStroke();
  textSize(17);
  textAlign(CENTER, TOP);
  text("Chain Rule in Neural Networks", canvasWidth / 2, 12);

  // Step indicator
  fill(80);
  textSize(12);
  text(`Step ${currentStep + 1} of ${STEPS.length}`, canvasWidth / 2, 34);

  // Step title
  let titleColor = [52, 100, 200];
  if (currentStep >= 1) titleColor = [52, 100, 200];
  if (currentStep >= 2) titleColor = [170, 80, 30];
  if (currentStep >= 3) titleColor = [140, 40, 140];
  fill(...titleColor);
  textSize(14);
  textAlign(CENTER, TOP);
  noStroke();
  text(step.title, canvasWidth / 2, 50);

  drawGraph(currentStep);
  drawDescriptionPanel(step);
  drawProgressDots();
}

function drawGraph(stepIdx) {
  let edges = getEdges(stepIdx);
  let step  = STEPS[stepIdx];

  // Draw edges (forward arrows)
  for (let i = 0; i < edges.length; i++) {
    let e  = edges[i];
    let n1 = nodes[e.from];
    let n2 = nodes[e.to];
    let active = e.active;

    // Forward edge
    stroke(active ? color(180, 60, 60) : color(180));
    strokeWeight(active ? 2.5 : 1.5);
    drawArrow(n1.x + 22, n1.y, n2.x - 22, n2.y, active);

    // Forward label (above edge)
    noStroke();
    fill(active ? color(140, 40, 40) : color(120));
    textSize(9);
    textAlign(CENTER, BOTTOM);
    let mx = (n1.x + n2.x) / 2;
    let my = n1.y - 8;
    text(e.label, mx, my);

    // Backward label (below edge, shown when active)
    if (active) {
      fill(180, 60, 60);
      textSize(9);
      textAlign(CENTER, TOP);
      text(e.back, mx, n1.y + 8);
    }
  }

  // Draw nodes
  let nr = 22;
  for (let i = 0; i < nodes.length; i++) {
    let n = nodes[i];
    let highlighted = false;

    if (step.highlight === "all") highlighted = true;
    if (step.highlight === "output" && (n.id === "a2" || n.id === "L")) highlighted = true;
    if (step.highlight === "layer2" && (n.id === "z2" || n.id === "a2" || n.id === "L")) highlighted = true;
    if (step.highlight === "layer1" && true) highlighted = true;

    if (highlighted) {
      fill(...n.color);
      stroke(darken(n.color));
    } else {
      fill(210, 215, 225);
      stroke(170);
    }
    strokeWeight(2);
    ellipse(n.x, n.y, nr * 2, nr * 2);

    // Label
    fill(highlighted ? 255 : 100);
    textSize(13);
    textAlign(CENTER, CENTER);
    noStroke();
    text(n.label, n.x, n.y);

    // Value below node
    fill(highlighted ? color(...n.color) : color(140));
    textSize(10);
    textAlign(CENTER, TOP);
    noStroke();
    text(n.value, n.x, n.y + nr + 4);

    // w1, w2 labels beside edges (on first step)
    if (i === 0) {
      fill(100);
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text("w₁=" + w1, (nodes[0].x + nodes[1].x) / 2, nodes[0].y - 28);
    }
    if (i === 2) {
      fill(100);
      textSize(10);
      textAlign(CENTER, BOTTOM);
      text("w₂=" + w2, (nodes[2].x + nodes[3].x) / 2, nodes[2].y - 28);
    }
  }

  // Layer labels
  let layerLabels = ["Input\nLayer", "Hidden\nLayer (z₁)", "Hidden\nLayer (a₁)", "Output\nLayer (z₂)", "Output\nLayer (a₂)", "Loss\nLayer"];
  for (let i = 0; i < nodes.length; i++) {
    fill(120);
    textSize(9);
    textAlign(CENTER, TOP);
    noStroke();
    text(layerLabels[i], nodes[i].x, nodes[i].y + 46);
  }
}

function drawArrow(x1, y1, x2, y2, active) {
  let angle = atan2(y2 - y1, x2 - x1);
  line(x1, y1, x2, y2);
  let hs = 8;
  fill(active ? color(180, 60, 60) : color(160));
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -hs, hs / 2, -hs, -hs / 2);
  pop();
}

function darken(c) {
  return [c[0] * 0.6, c[1] * 0.6, c[2] * 0.6];
}

function drawDescriptionPanel(step) {
  let panelX = 20;
  let panelY = nodes[0].y + 80;
  let panelW = canvasWidth - 40;
  let panelH = canvasHeight - panelY - 20;

  fill(245, 248, 255);
  stroke(190, 205, 235);
  strokeWeight(1.5);
  rect(panelX, panelY, panelW, panelH, 8);
  noStroke();

  let lineH = 18;
  let textY  = panelY + 12;
  for (let i = 0; i < step.desc.length; i++) {
    if (i === 0) {
      fill(60, 80, 160);
      textSize(12);
    } else {
      fill(40);
      textSize(12);
    }
    textAlign(LEFT, TOP);
    noStroke();
    text(step.desc[i], panelX + 14, textY + i * lineH);
  }
}

function drawProgressDots() {
  let dotY = 45;
  let spacing = 16;
  let startX = canvasWidth / 2 + 80;

  for (let i = 0; i < STEPS.length; i++) {
    if (i === currentStep) {
      fill(52, 100, 200);
    } else if (i < currentStep) {
      fill(140, 180, 140);
    } else {
      fill(210);
    }
    noStroke();
    ellipse(startX + i * spacing, dotY + 4, 10, 10);
  }
}
