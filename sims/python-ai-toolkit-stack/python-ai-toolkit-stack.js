// Python AI Toolkit Stack MicroSim
// Layered stack diagram: Python -> NumPy -> Pandas/Matplotlib -> PyTorch/Sklearn
// Jupyter shown as a side panel spanning all layers
// Hover to see role; click to highlight dependency chain
// Bloom: Understand (L2) / classify
//
// Layout:
//   drawHeight = 430
//   controlHeight = 50
//   canvasHeight = 480

let canvasWidth = 700;
let drawHeight = 430;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let hoveredTool = null;
let selectedTool = null;

// Tool definitions with layer ordering (layer 0 = bottom)
const TOOLS = {
  python: {
    label: 'Python 3.x',
    layer: 0,
    col: 'full',
    color: '#1A3A5C',
    textColor: 'white',
    role: 'Foundation language — readable syntax, dynamic typing, vast ecosystem.',
    deps: []
  },
  numpy: {
    label: 'NumPy',
    layer: 1,
    col: 'full',
    color: '#4A90D9',
    textColor: 'white',
    role: 'N-dimensional arrays and vectorized math. The numerical backbone for all scientific Python.',
    deps: ['python']
  },
  pandas: {
    label: 'Pandas',
    layer: 2,
    col: 'left',
    color: '#7B2D8B',
    textColor: 'white',
    role: 'DataFrames for loading, cleaning, and transforming tabular data before model training.',
    deps: ['numpy']
  },
  matplotlib: {
    label: 'Matplotlib',
    layer: 2,
    col: 'right',
    color: '#27AE60',
    textColor: 'white',
    role: 'Core plotting library for exploring data distributions and visualising training results.',
    deps: ['numpy']
  },
  pytorch: {
    label: 'PyTorch',
    layer: 3,
    col: 'left',
    color: '#E74C3C',
    textColor: 'white',
    role: 'Deep learning framework with GPU tensors and autograd. Used for all neural network chapters.',
    deps: ['numpy']
  },
  sklearn: {
    label: 'Scikit-learn',
    layer: 3,
    col: 'right',
    color: '#16A085',
    textColor: 'white',
    role: 'Unified .fit()/.predict() API for classical ML algorithms and preprocessing utilities.',
    deps: ['numpy']
  },
  jupyter: {
    label: 'Jupyter\nNotebook',
    layer: -1, // side panel — special rendering
    col: 'side',
    color: '#E67E22',
    textColor: 'white',
    role: 'Interactive development environment. Combines code, output, and documentation in one document.',
    deps: []
  }
};

// Dependency chain lookup (upward: which tools depend on this one)
function getDependencyChain(toolId) {
  let chain = new Set([toolId]);
  // walk down: deps of this tool
  function addDeps(id) {
    for (let dep of (TOOLS[id].deps || [])) {
      chain.add(dep);
      addDeps(dep);
    }
  }
  // walk up: tools that depend on this one
  function addDependents(id) {
    for (let [key, t] of Object.entries(TOOLS)) {
      if (t.deps && t.deps.includes(id)) {
        chain.add(key);
        addDependents(key);
      }
    }
  }
  addDeps(toolId);
  addDependents(toolId);
  return chain;
}

// Computed box rectangles (populated each draw)
let boxes = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Python AI toolkit stack diagram. Hover or click a layer to see its role and dependency chain.', LABEL);
}

function draw() {
  updateCanvasSize();
  boxes = {};

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
  text('Python AI Toolkit Stack', canvasWidth / 2, 10);

  // Layout constants
  let sideW = 90;       // Jupyter side panel width
  let stackX = margin;
  let stackW = canvasWidth - margin * 2 - sideW - 10;
  let layerH = 62;
  let layerGap = 10;
  let stackTop = 46;

  let highlightSet = selectedTool ? getDependencyChain(selectedTool)
                    : hoveredTool  ? getDependencyChain(hoveredTool)
                    : null;

  // Draw Jupyter side panel
  let jupH = 4 * (layerH + layerGap) - layerGap;
  let jupX = stackX + stackW + 10;
  let jupY = stackTop;
  drawToolBox('jupyter', jupX, jupY, sideW, jupH, highlightSet);

  // Label "Development Environment"
  push();
  translate(jupX + sideW - 12, jupY + jupH / 2);
  rotate(-HALF_PI);
  fill(255);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(10);
  // label is rendered inside the box by drawToolBox
  pop();

  // Draw stacked layers
  const LAYER_TOOLS = [
    ['python'],
    ['numpy'],
    ['pandas', 'matplotlib'],
    ['pytorch', 'sklearn']
  ];
  const LAYER_LABELS = ['Foundation', 'Numerical Computing', 'Data & Visualization', 'ML Frameworks'];

  for (let li = 0; li < LAYER_TOOLS.length; li++) {
    let tools = LAYER_TOOLS[li];
    let ly = stackTop + (3 - li) * (layerH + layerGap); // bottom-to-top
    let lx = stackX;
    let lw = stackW;

    // Layer label (small, left)
    fill(120);
    noStroke();
    textAlign(LEFT, CENTER);
    textSize(10);
    text(LAYER_LABELS[li], lx + 4, ly + layerH - 10);

    if (tools.length === 1) {
      drawToolBox(tools[0], lx, ly, lw, layerH, highlightSet);
    } else {
      let half = (lw - 8) / 2;
      drawToolBox(tools[0], lx, ly, half, layerH, highlightSet);
      drawToolBox(tools[1], lx + half + 8, ly, half, layerH, highlightSet);

      // Connector arrows from numpy to each pair
      if (li > 1) {
        let prevLy = stackTop + (3 - (li - 1)) * (layerH + layerGap);
        stroke(180);
        strokeWeight(1.2);
        let ax1 = lx + half / 2;
        let ax2 = lx + half + 8 + half / 2;
        line(stackX + stackW / 2, prevLy + layerH, ax1, ly);
        line(stackX + stackW / 2, prevLy + layerH, ax2, ly);
      }
    }

    // Arrow from layer to next layer up
    if (li < LAYER_TOOLS.length - 1 && tools.length === 1) {
      let nextLy = stackTop + (3 - (li + 1)) * (layerH + layerGap);
      stroke(180);
      strokeWeight(1.5);
      let ax = lx + lw / 2;
      line(ax, ly, ax, nextLy + layerH);
      // arrowhead
      fill(180);
      noStroke();
      triangle(ax - 5, ly + 5, ax + 5, ly + 5, ax, ly);
    }
  }

  // Tooltip panel
  let tipId = hoveredTool || selectedTool;
  if (tipId && TOOLS[tipId]) {
    let t = TOOLS[tipId];
    let panelW = min(320, canvasWidth - 40);
    let panelH = 68;
    let px = margin;
    let py = drawHeight - panelH - 8;
    fill(255, 255, 255, 230);
    stroke(t.color);
    strokeWeight(2);
    rect(px, py, panelW, panelH, 8);
    fill(t.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(t.label.replace('\n', ' '), px + 10, py + 8);
    fill(50);
    textSize(12);
    text(t.role, px + 10, py + 28, panelW - 20, 36);
  }

  // Control bar hint
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Hover or click a tool to see its role and highlight its dependency chain', canvasWidth / 2, drawHeight + 25);
}

function drawToolBox(id, x, y, w, h, highlightSet) {
  boxes[id] = { x, y, w, h };
  let t = TOOLS[id];
  let isHL = !highlightSet || highlightSet.has(id);
  let alpha = isHL ? 255 : 55;

  let c = color(t.color);
  fill(red(c), green(c), blue(c), alpha);
  stroke(255, 255, 255, alpha);
  strokeWeight(2);
  rect(x, y, w, h, 8);

  fill(255, 255, 255, alpha);
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(id === 'jupyter' ? 12 : 15);
  text(t.label, x + w / 2, y + h / 2);
}

function mouseMoved() {
  hoveredTool = null;
  for (let [id, b] of Object.entries(boxes)) {
    if (mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      hoveredTool = id;
      break;
    }
  }
}

function mousePressed() {
  let hit = null;
  for (let [id, b] of Object.entries(boxes)) {
    if (mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      hit = id;
      break;
    }
  }
  selectedTool = (selectedTool === hit) ? null : hit;
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
