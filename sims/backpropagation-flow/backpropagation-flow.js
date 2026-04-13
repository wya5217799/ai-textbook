// Backpropagation Flow MicroSim
// Shows a 3-layer network (2-3-1) with step-through animation
// Forward Pass phases then Backward Pass phases

let canvasWidth = 600;
let canvasHeight = 480;
let currentStep = 0;
let totalSteps = 7; // 0=initial, 1=FP layer1, 2=FP layer2, 3=FP output, 4=BP error, 5=BP hidden, 6=BP input
let btnNext, btnPrev, btnReset;

// Network structure: layers with node positions
let layers = [];
let connections = [];
let stepInfo = [];

// Colors
const COL_BG = [245, 247, 250];
const COL_INACTIVE = [180, 180, 200];
const COL_ACTIVE_FWD = [70, 140, 255];
const COL_ACTIVE_BWD = [255, 100, 80];
const COL_NODE = [240, 240, 255];
const COL_EDGE = [200, 200, 220];
const COL_TEXT = [30, 30, 50];

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  buildNetwork();
  buildStepInfo();
  buildButtons();
  windowResized();
}

function buildNetwork() {
  // Positions are relative fractions, resolved in draw()
  layers = [
    { name: 'Input Layer', nodes: 2, color: [100, 180, 255] },
    { name: 'Hidden Layer', nodes: 3, color: [120, 200, 120] },
    { name: 'Output Layer', nodes: 1, color: [255, 160, 80] }
  ];

  // Pre-assign random weights for display
  connections = [];
  // Input -> Hidden (2x3 = 6)
  let w01 = [[0.4, -0.2, 0.7], [0.3, 0.5, -0.1]];
  for (let i = 0; i < 2; i++) {
    for (let j = 0; j < 3; j++) {
      connections.push({ from: [0, i], to: [1, j], weight: w01[i][j], grad: 0 });
    }
  }
  // Hidden -> Output (3x1 = 3)
  let w12 = [[0.6], [-0.4], [0.8]];
  for (let i = 0; i < 3; i++) {
    connections.push({ from: [1, i], to: [2, 0], weight: w12[i][0], grad: 0 });
  }

  // Activations (illustrative values)
  layers[0].activations = [0.8, 0.3];
  layers[1].activations = [0.62, 0.41, 0.54];
  layers[2].activations = [0.71];
  layers[2].target = 1.0;
  layers[2].error = 0.29;

  // Gradients (illustrative)
  layers[0].grads = [0.04, 0.02];
  layers[1].grads = [0.08, 0.05, 0.09];
  layers[2].grads = [0.29];

  let grads01 = [[0.06, 0.07, 0.08], [0.02, 0.03, 0.04]];
  let grads12 = [[0.18], [0.12], [0.15]];
  let idx = 0;
  for (let i = 0; i < 2; i++) for (let j = 0; j < 3; j++) connections[idx++].grad = grads01[i][j];
  for (let i = 0; i < 3; i++) connections[idx++].grad = grads12[i][0];
}

function buildStepInfo() {
  stepInfo = [
    {
      phase: 'Overview',
      title: 'Network Overview',
      desc: 'A 3-layer neural network: 2 inputs, 3 hidden nodes, 1 output.\nForward pass computes predictions; backward pass computes gradients.',
      activeLayer: -1,
      direction: 'none'
    },
    {
      phase: 'Forward Pass',
      title: 'Forward Pass — Input Layer',
      desc: 'Inputs x1=0.80, x2=0.30 are fed into the network.\nThese activate the first layer and propagate forward.',
      activeLayer: 0,
      direction: 'forward'
    },
    {
      phase: 'Forward Pass',
      title: 'Forward Pass — Hidden Layer',
      desc: 'Hidden nodes compute: h = sigmoid(W·x + b)\nh1=0.62, h2=0.41, h3=0.54\nWeights multiply inputs and bias shifts the result.',
      activeLayer: 1,
      direction: 'forward'
    },
    {
      phase: 'Forward Pass',
      title: 'Forward Pass — Output Layer',
      desc: 'Output: y = sigmoid(W·h + b) = 0.71\nTarget: t = 1.00\nLoss = (t - y)² / 2 = 0.042',
      activeLayer: 2,
      direction: 'forward'
    },
    {
      phase: 'Backward Pass',
      title: 'Backward Pass — Compute Error',
      desc: 'Error signal: δ = (y - t) · sigmoid\'(y)\nδ_out = (0.71 - 1.00) · y(1-y) = -0.058\nThis error flows backward through all layers.',
      activeLayer: 2,
      direction: 'backward'
    },
    {
      phase: 'Backward Pass',
      title: 'Backward Pass — Hidden Gradients',
      desc: 'Hidden gradients: δ_h = (W^T · δ_out) · sigmoid\'(h)\nEach hidden node receives error signal proportional to its weight.\nGradients: δh1=0.08, δh2=0.05, δh3=0.09',
      activeLayer: 1,
      direction: 'backward'
    },
    {
      phase: 'Backward Pass',
      title: 'Backward Pass — Update Weights',
      desc: 'Weight update: W_new = W_old - η · δ · activation\nLearning rate η = 0.01\nAll weights updated; network has learned from one sample.',
      activeLayer: 0,
      direction: 'backward'
    }
  ];
}

function buildButtons() {
  btnPrev = createButton('Prev');
  btnPrev.parent('main');
  btnPrev.style('margin', '8px 4px');
  btnPrev.style('padding', '8px 20px');
  btnPrev.style('font-size', '14px');
  btnPrev.style('cursor', 'pointer');
  btnPrev.mousePressed(() => { if (currentStep > 0) currentStep--; });

  btnNext = createButton('Next');
  btnNext.parent('main');
  btnNext.style('margin', '8px 4px');
  btnNext.style('padding', '8px 20px');
  btnNext.style('font-size', '14px');
  btnNext.style('cursor', 'pointer');
  btnNext.mousePressed(() => { if (currentStep < totalSteps - 1) currentStep++; });

  btnReset = createButton('Reset');
  btnReset.parent('main');
  btnReset.style('margin', '8px 4px');
  btnReset.style('padding', '8px 20px');
  btnReset.style('font-size', '14px');
  btnReset.style('cursor', 'pointer');
  btnReset.mousePressed(() => { currentStep = 0; });
}

function windowResized() {
  canvasWidth = min(windowWidth, 840);
  canvasHeight = 480;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getNodePos(layerIdx, nodeIdx) {
  let margin = 80;
  let netW = canvasWidth - margin * 2;
  let netH = canvasHeight - 160;
  let topY = 80;
  let numLayers = layers.length;
  let x = margin + (layerIdx / (numLayers - 1)) * netW;
  let numNodes = layers[layerIdx].nodes;
  let spacing = netH / (numNodes + 1);
  let y = topY + spacing * (nodeIdx + 1);
  return { x, y };
}

function draw() {
  background(...COL_BG);
  let info = stepInfo[currentStep];
  let activeLayer = info.activeLayer;
  let direction = info.direction;

  // Title bar
  let phaseColor = direction === 'forward' ? color(...COL_ACTIVE_FWD)
    : direction === 'backward' ? color(...COL_ACTIVE_BWD)
    : color(100, 100, 140);
  fill(phaseColor);
  noStroke();
  rect(0, 0, canvasWidth, 44, 0, 0, 6, 6);
  fill(255);
  textAlign(CENTER, CENTER);
  textSize(15);
  textStyle(BOLD);
  text(info.phase + '  —  Step ' + (currentStep + 1) + ' / ' + totalSteps, canvasWidth / 2, 22);
  textStyle(NORMAL);

  // Draw connections
  for (let c of connections) {
    let fromLayer = c.from[0];
    let fromNode = c.from[1];
    let toLayer = c.to[0];
    let toNode = c.to[1];
    let fromPos = getNodePos(fromLayer, fromNode);
    let toPos = getNodePos(toLayer, toNode);

    // Determine if this connection is active
    let isActive = false;
    if (direction === 'forward') {
      isActive = (fromLayer === activeLayer || toLayer === activeLayer) && activeLayer >= 0;
    } else if (direction === 'backward') {
      isActive = (fromLayer === activeLayer || toLayer === activeLayer) && activeLayer >= 0;
    }

    let edgeCol = isActive
      ? (direction === 'forward' ? color(...COL_ACTIVE_FWD, 200) : color(...COL_ACTIVE_BWD, 200))
      : color(...COL_EDGE);
    stroke(edgeCol);
    strokeWeight(isActive ? 2.5 : 1.2);
    line(fromPos.x, fromPos.y, toPos.x, toPos.y);

    // Show weight or gradient label on active connections
    if (isActive) {
      let mx = (fromPos.x + toPos.x) / 2;
      let my = (fromPos.y + toPos.y) / 2;
      let val = direction === 'backward' ? c.grad : c.weight;
      let label = direction === 'backward' ? 'g=' : 'w=';
      noStroke();
      fill(255, 250, 220);
      rect(mx - 18, my - 10, 36, 18, 4);
      fill(direction === 'backward' ? color(...COL_ACTIVE_BWD) : color(...COL_ACTIVE_FWD));
      textSize(9);
      textAlign(CENTER, CENTER);
      text(label + nf(val, 1, 2), mx, my);
    }
  }

  // Draw nodes
  let nodeR = 24;
  for (let li = 0; li < layers.length; li++) {
    let layer = layers[li];
    let isActiveLayer = li === activeLayer;
    for (let ni = 0; ni < layer.nodes; ni++) {
      let pos = getNodePos(li, ni);
      let nodeColor = isActiveLayer
        ? (direction === 'forward' ? color(...COL_ACTIVE_FWD) : color(...COL_ACTIVE_BWD))
        : color(...COL_INACTIVE);

      // Node circle
      stroke(nodeColor);
      strokeWeight(isActiveLayer ? 3 : 1.5);
      fill(isActiveLayer ? color(red(nodeColor) * 0.2 + 220, green(nodeColor) * 0.2 + 220, blue(nodeColor) * 0.2 + 220) : color(...COL_NODE));
      ellipse(pos.x, pos.y, nodeR * 2, nodeR * 2);

      // Activation value
      noStroke();
      fill(isActiveLayer ? nodeColor : color(...COL_TEXT));
      textSize(11);
      textAlign(CENTER, CENTER);
      let val = direction === 'backward' && isActiveLayer
        ? layer.grads[ni]
        : layer.activations[ni];
      let prefix = direction === 'backward' && isActiveLayer ? 'δ=' : 'a=';
      text(prefix + nf(val, 1, 2), pos.x, pos.y);
    }
  }

  // Layer labels
  for (let li = 0; li < layers.length; li++) {
    let pos = getNodePos(li, 0);
    let layer = layers[li];
    let isActiveLayer = li === activeLayer;
    fill(isActiveLayer
      ? (direction === 'forward' ? color(...COL_ACTIVE_FWD) : color(...COL_ACTIVE_BWD))
      : color(...COL_TEXT));
    noStroke();
    textSize(12);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(layer.name, pos.x, 56);
    textStyle(NORMAL);

    // Node count label
    textSize(10);
    fill(120, 120, 140);
    text(layer.nodes + ' node' + (layer.nodes > 1 ? 's' : ''), pos.x, 70);
  }

  // Description box
  let boxY = canvasHeight - 130;
  fill(255, 255, 255, 230);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, boxY, canvasWidth - 32, 110, 8);

  noStroke();
  fill(color(...COL_TEXT));
  textSize(13);
  textStyle(BOLD);
  textAlign(LEFT, TOP);
  text(info.title, 28, boxY + 10);
  textStyle(NORMAL);
  textSize(11.5);
  fill(60, 60, 80);
  text(info.desc, 28, boxY + 32, canvasWidth - 56, 80);

  // Step counter dots
  let dotY = boxY - 16;
  let dotSpacing = 18;
  let dotsX = canvasWidth / 2 - ((totalSteps - 1) * dotSpacing) / 2;
  for (let s = 0; s < totalSteps; s++) {
    if (s === currentStep) {
      fill(phaseColor);
      stroke(phaseColor);
    } else if (s < currentStep) {
      fill(180, 200, 180);
      stroke(160, 180, 160);
    } else {
      fill(210, 210, 220);
      stroke(190, 190, 200);
    }
    strokeWeight(1);
    ellipse(dotsX + s * dotSpacing, dotY, 10, 10);
  }

  // Direction arrow (decorative)
  if (direction !== 'none') {
    let arrowY = 46 + 14;
    noStroke();
    fill(255, 255, 255, 150);
    textSize(20);
    textAlign(CENTER, CENTER);
    text(direction === 'forward' ? '→' : '←', canvasWidth / 2, arrowY);
  }
}
