// Fully Connected Network Architecture
// Bloom Level: Understand (L2)
// Click a node to highlight all its connections

let canvasWidth, canvasHeight;
let nodes = { input: [], hidden: [], output: [] };
let selectedNode = null;
let canvasEl;

const LAYER_DEFS = [
  { key: 'input',  count: 3, label: 'Input Layer'  },
  { key: 'hidden', count: 4, label: 'Hidden Layer' },
  { key: 'output', count: 2, label: 'Output Layer' }
];

const NODE_R = 22;
const TOP_PAD = 60;
const BOTTOM_PAD = 80;

function buildNodes() {
  nodes = { input: [], hidden: [], output: [] };
  const usableH = canvasHeight - TOP_PAD - BOTTOM_PAD;
  const layerXPositions = [
    canvasWidth * 0.18,
    canvasWidth * 0.50,
    canvasWidth * 0.82
  ];

  LAYER_DEFS.forEach((def, li) => {
    const count = def.count;
    const spacing = usableH / (count + 1);
    for (let i = 0; i < count; i++) {
      nodes[def.key].push({
        x: layerXPositions[li],
        y: TOP_PAD + spacing * (i + 1),
        layer: def.key,
        index: i
      });
    }
  });
}

function isConnected(n) {
  if (!selectedNode) return false;
  if (selectedNode === n) return true;
  if (selectedNode.layer === 'input' && n.layer === 'hidden') return true;
  if (selectedNode.layer === 'hidden' && n.layer === 'input') return true;
  if (selectedNode.layer === 'hidden' && n.layer === 'output') return true;
  if (selectedNode.layer === 'output' && n.layer === 'hidden') return true;
  return false;
}

function isEdgeHighlighted(a, b) {
  if (!selectedNode) return false;
  if (selectedNode === a || selectedNode === b) return true;
  return false;
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 480;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');
  buildNodes();
  textFont('Arial');
}

function draw() {
  background(245, 248, 255);

  // Draw title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Fully Connected Network Architecture', canvasWidth / 2, 12);

  // Layer labels
  textSize(13);
  fill(60, 80, 140);
  LAYER_DEFS.forEach((def, li) => {
    const xs = [canvasWidth * 0.18, canvasWidth * 0.50, canvasWidth * 0.82];
    text(def.label, xs[li], TOP_PAD - 28);
  });

  // Draw edges input->hidden
  for (let a of nodes.input) {
    for (let b of nodes.hidden) {
      const hi = isEdgeHighlighted(a, b);
      stroke(hi ? color(255, 120, 30) : color(180, 190, 210));
      strokeWeight(hi ? 2.5 : 1);
      line(a.x, a.y, b.x, b.y);
    }
  }
  // Draw edges hidden->output
  for (let a of nodes.hidden) {
    for (let b of nodes.output) {
      const hi = isEdgeHighlighted(a, b);
      stroke(hi ? color(255, 120, 30) : color(180, 190, 210));
      strokeWeight(hi ? 2.5 : 1);
      line(a.x, a.y, b.x, b.y);
    }
  }

  // Draw nodes
  const allNodes = [...nodes.input, ...nodes.hidden, ...nodes.output];
  for (let n of allNodes) {
    const isSel = selectedNode === n;
    const isConn = isConnected(n);
    let fillC, strokeC, sw;
    if (isSel) {
      fillC = color(255, 100, 20);
      strokeC = color(180, 60, 0);
      sw = 3;
    } else if (isConn && selectedNode) {
      fillC = color(255, 200, 100);
      strokeC = color(200, 140, 30);
      sw = 2;
    } else if (n.layer === 'input') {
      fillC = color(100, 180, 255);
      strokeC = color(40, 110, 200);
      sw = 2;
    } else if (n.layer === 'hidden') {
      fillC = color(130, 210, 130);
      strokeC = color(50, 150, 50);
      sw = 2;
    } else {
      fillC = color(255, 150, 150);
      strokeC = color(200, 60, 60);
      sw = 2;
    }
    strokeWeight(sw);
    stroke(strokeC);
    fill(fillC);
    ellipse(n.x, n.y, NODE_R * 2);

    // Node label
    noStroke();
    fill(20);
    textSize(12);
    textAlign(CENTER, CENTER);
    const prefix = n.layer === 'input' ? 'x' : n.layer === 'hidden' ? 'h' : 'y';
    text(prefix + (n.index + 1), n.x, n.y);
  }

  // Instruction / status text
  noStroke();
  fill(80, 90, 110);
  textSize(12);
  textAlign(CENTER, BOTTOM);
  if (selectedNode) {
    const prefix = selectedNode.layer === 'input' ? 'x' : selectedNode.layer === 'hidden' ? 'h' : 'y';
    text(`Selected: ${prefix}${selectedNode.index + 1} (${selectedNode.layer} layer) — highlighted connections shown in orange`, canvasWidth / 2, canvasHeight - 10);
  } else {
    text('Click any node to highlight its connections', canvasWidth / 2, canvasHeight - 10);
  }
}

function mousePressed() {
  const allNodes = [...nodes.input, ...nodes.hidden, ...nodes.output];
  let found = null;
  for (let n of allNodes) {
    if (dist(mouseX, mouseY, n.x, n.y) <= NODE_R) {
      found = n;
      break;
    }
  }
  if (found === selectedNode) {
    selectedNode = null;
  } else {
    selectedNode = found;
  }
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);
  buildNodes();
}
