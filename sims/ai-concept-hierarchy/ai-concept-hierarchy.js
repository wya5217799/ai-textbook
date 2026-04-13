// AI Concept Hierarchy MicroSim
// Shows nested ellipses: AI > ML > Deep Learning, with ML branches to 3 paradigms
// Hover regions for tooltips; click to highlight
// Bloom: Understand (L2) / classify
//
// Layout:
//   drawHeight = 440
//   controlHeight = 50 (1 row)
//   canvasHeight = 490

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Regions for hit-testing (updated each draw)
let regions = [];
let hoveredRegion = null;
let selectedRegion = null;

const TOOLTIPS = {
  ai: {
    label: 'Artificial Intelligence',
    color: [173, 216, 230],      // light blue
    borderColor: '#4A90D9',
    def: 'The broad field of building systems that simulate intelligent behaviour. Includes rule-based systems, search, ML, robotics, and more.',
    examples: 'Expert Systems, Computer Vision, NLP, Business Intelligence'
  },
  ml: {
    label: 'Machine Learning',
    color: [100, 149, 237],      // medium blue
    borderColor: '#2980B9',
    def: 'A subset of AI where systems learn from data rather than following hand-coded rules. The dominant AI approach today.',
    examples: 'Linear Regression, K-Means, SVMs, Neural Networks'
  },
  dl: {
    label: 'Deep Learning',
    color: [30, 80, 160],        // dark blue
    borderColor: '#1A5276',
    def: 'A subset of ML using multi-layer neural networks. Drives modern breakthroughs in vision, language, and games.',
    examples: 'CNNs, RNNs, LSTMs, Transformers'
  },
  supervised: {
    label: 'Supervised',
    color: [39, 174, 96],
    borderColor: '#1a7a44',
    def: 'Learns from labeled input-output pairs to predict outputs for new inputs.',
    examples: 'Classification, Regression'
  },
  unsupervised: {
    label: 'Unsupervised',
    color: [230, 126, 34],
    borderColor: '#b05a10',
    def: 'Discovers hidden structure in unlabeled data without guidance.',
    examples: 'Clustering, Dimensionality Reduction'
  },
  reinforcement: {
    label: 'Reinforcement',
    color: [142, 68, 173],
    borderColor: '#6c3483',
    def: 'An agent learns by interacting with an environment, maximising cumulative reward.',
    examples: 'AlphaGo, Atari games, Robot control'
  }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Nested hierarchy diagram: AI contains ML which contains Deep Learning, with three ML branches for learning paradigms.', LABEL);
}

function draw() {
  updateCanvasSize();
  regions = [];

  // Drawing area
  fill('aliceblue');
  stroke('silver');
  strokeWeight(1);
  rect(0, 0, canvasWidth, drawHeight);

  // Control area
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('AI Concept Hierarchy', canvasWidth / 2, 10);

  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 15;

  // Scale ellipses to canvas width
  let aiRx = min(canvasWidth * 0.44, 300);
  let aiRy = min(drawHeight * 0.40, 170);
  let mlRx = aiRx * 0.62;
  let mlRy = aiRy * 0.62;
  let dlRx = mlRx * 0.52;
  let dlRy = mlRy * 0.52;

  // --- Draw AI ellipse ---
  drawEllipseRegion('ai', cx, cy, aiRx, aiRy, TOOLTIPS.ai);

  // --- Draw ML ellipse ---
  drawEllipseRegion('ml', cx, cy, mlRx, mlRy, TOOLTIPS.ml);

  // --- Draw Deep Learning ellipse ---
  drawEllipseRegion('dl', cx, cy, dlRx, dlRy, TOOLTIPS.dl);

  // --- AI peripheral labels (non-ML subfields) ---
  let periph = [
    { label: 'Expert\nSystems', ax: -0.72, ay: -0.55 },
    { label: 'Computer\nVision', ax: 0.72, ay: -0.55 },
    { label: 'NLP', ax: 0.88, ay: 0.15 },
    { label: 'Business\nIntelligence', ax: -0.88, ay: 0.15 },
    { label: 'Robotics', ax: 0.0, ay: 0.88 }
  ];
  for (let p of periph) {
    let px = cx + p.ax * aiRx;
    let py = cy + p.ay * aiRy;
    let isHighlighted = !selectedRegion || selectedRegion === 'ai';
    fill(isHighlighted ? 80 : 180);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(p.label, px, py);
  }

  // --- ML paradigm branch nodes ---
  let branchData = [
    { id: 'supervised',    angle: -140, dist: mlRx * 1.35 },
    { id: 'unsupervised',  angle: 180,  dist: mlRx * 1.40 },
    { id: 'reinforcement', angle: -220, dist: mlRx * 1.35 }
  ];

  for (let b of branchData) {
    let a = radians(b.angle);
    let bx = cx + cos(a) * b.dist;
    let by = cy + sin(a) * b.dist;
    let t = TOOLTIPS[b.id];
    let c = t.color;
    let isHL = !selectedRegion || selectedRegion === b.id || selectedRegion === 'ml';
    let alpha = isHL ? 200 : 50;

    // connector line from ML ellipse edge to branch node
    let edgeX = cx + cos(a) * mlRx;
    let edgeY = cy + sin(a) * mlRy;
    stroke(c[0], c[1], c[2], alpha);
    strokeWeight(1.5);
    line(edgeX, edgeY, bx, by);

    // branch node
    fill(c[0], c[1], c[2], alpha);
    stroke(t.borderColor);
    strokeWeight(isHL ? 2 : 0.5);
    ellipse(bx, by, 88, 34);

    fill(255, 255, 255, alpha);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(t.label, bx, by);

    // register for hit testing
    regions.push({ id: b.id, x: bx, y: by, rx: 44, ry: 17, type: 'ellipse' });
  }

  // Tooltip panel
  let tipId = hoveredRegion || selectedRegion;
  if (tipId && TOOLTIPS[tipId]) {
    drawTooltip(TOOLTIPS[tipId]);
  }

  // Control hint
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Hover or click any region to see its definition', canvasWidth / 2, drawHeight + 25);
}

function drawEllipseRegion(id, cx, cy, rx, ry, t) {
  let c = t.color;
  let isHovered = hoveredRegion === id;
  let isSelected = selectedRegion === id;
  let isHighlighted = !selectedRegion || selectedRegion === id;
  let alpha = isHighlighted ? (isHovered ? 180 : 140) : 40;

  fill(c[0], c[1], c[2], alpha);
  stroke(t.borderColor);
  strokeWeight(isSelected ? 3 : 1.5);
  ellipse(cx, cy, rx * 2, ry * 2);

  regions.push({ id: id, x: cx, y: cy, rx: rx, ry: ry, type: 'ellipse' });

  // Label at top of ellipse
  fill(isHighlighted ? 30 : 160);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text(t.label, cx, cy - ry + 8);
}

function drawTooltip(t) {
  let c = t.color;
  let panelW = min(280, canvasWidth - 40);
  let panelH = 90;
  let px = canvasWidth - panelW - margin;
  let py = drawHeight - panelH - margin;

  fill(255, 255, 255, 240);
  stroke(c[0], c[1], c[2]);
  strokeWeight(2);
  rect(px, py, panelW, panelH, 10);

  fill(c[0], c[1], c[2]);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text(t.label, px + 10, py + 10);

  fill(50);
  textSize(12);
  text(t.def, px + 10, py + 30, panelW - 20, 38);

  fill(100);
  textSize(11);
  text('e.g. ' + t.examples, px + 10, py + 72, panelW - 20, 16);
}

function mouseMoved() {
  hoveredRegion = null;
  // Check branch nodes first (smaller, on top visually)
  for (let r of [...regions].reverse()) {
    if (r.type === 'ellipse') {
      let dx = (mouseX - r.x) / r.rx;
      let dy = (mouseY - r.y) / r.ry;
      if (dx * dx + dy * dy <= 1) {
        hoveredRegion = r.id;
        break;
      }
    }
  }
}

function mousePressed() {
  let hit = null;
  for (let r of [...regions].reverse()) {
    let dx = (mouseX - r.x) / r.rx;
    let dy = (mouseY - r.y) / r.ry;
    if (dx * dx + dy * dy <= 1) {
      hit = r.id;
      break;
    }
  }
  selectedRegion = (selectedRegion === hit) ? null : hit;
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
