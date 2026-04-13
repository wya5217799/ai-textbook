// Dropout Visualization
// Bloom Level: Understand (L2)
// 3-layer neural network. Button applies 50% dropout to hidden nodes.

let canvasWidth, canvasHeight;
let canvasEl;
let btnDropout, btnReset;

const LAYER_SIZES = [4, 6, 3]; // input, hidden, output
const LAYER_NAMES = ['Input Layer', 'Hidden Layer (dropout here)', 'Output Layer'];
const TOP_PAD = 60;
const BOTTOM_PAD = 80;
const NODE_R = 18;

let nodeStates = []; // true = active, false = dropped
let dropoutApplied = false;

function buildNodeStates() {
  nodeStates = LAYER_SIZES.map((n, li) => Array(n).fill(true));
}

function applyDropout() {
  // Dropout only on hidden layer (index 1), p=0.5
  dropoutApplied = true;
  const hidden = LAYER_SIZES[1];
  nodeStates[1] = Array.from({ length: hidden }, () => Math.random() >= 0.5);
  // Ensure at least one node survives
  if (!nodeStates[1].some(Boolean)) nodeStates[1][0] = true;
}

function resetNetwork() {
  buildNodeStates();
  dropoutApplied = false;
}

function setup() {
  canvasWidth = windowWidth;
  canvasHeight = 490;
  canvasEl = createCanvas(canvasWidth, canvasHeight);
  canvasEl.parent('main');
  buildNodeStates();

  // Buttons
  const btnY = canvasHeight - 55;
  const btnCenterX = canvasWidth / 2;

  btnDropout = createButton('Apply Dropout (p=0.5)');
  btnDropout.position(btnCenterX - 170, btnY);
  btnDropout.style('padding', '8px 18px');
  btnDropout.style('font-size', '14px');
  btnDropout.style('cursor', 'pointer');
  btnDropout.style('background', '#e07030');
  btnDropout.style('color', 'white');
  btnDropout.style('border', 'none');
  btnDropout.style('border-radius', '5px');
  btnDropout.mousePressed(applyDropout);
  btnDropout.parent(canvasEl.parent());

  btnReset = createButton('Reset Network');
  btnReset.position(btnCenterX + 10, btnY);
  btnReset.style('padding', '8px 18px');
  btnReset.style('font-size', '14px');
  btnReset.style('cursor', 'pointer');
  btnReset.style('background', '#3a82c4');
  btnReset.style('color', 'white');
  btnReset.style('border', 'none');
  btnReset.style('border-radius', '5px');
  btnReset.mousePressed(resetNetwork);
  btnReset.parent(canvasEl.parent());

  textFont('Arial');
}

function getNodePos(layerIdx, nodeIdx) {
  const usableH = canvasHeight - TOP_PAD - BOTTOM_PAD;
  const nLayers = LAYER_SIZES.length;
  const layerXPositions = [];
  for (let i = 0; i < nLayers; i++) {
    layerXPositions.push(canvasWidth * (0.18 + i * 0.32));
  }
  const n = LAYER_SIZES[layerIdx];
  const spacing = usableH / (n + 1);
  return {
    x: layerXPositions[layerIdx],
    y: TOP_PAD + spacing * (nodeIdx + 1)
  };
}

function draw() {
  background(245, 248, 255);

  // Title
  noStroke();
  fill(30, 40, 80);
  textSize(18);
  textAlign(CENTER, TOP);
  text('Dropout Visualization', canvasWidth / 2, 10);

  // Status banner
  textSize(13);
  textAlign(CENTER, TOP);
  if (dropoutApplied) {
    fill(220, 80, 20);
    const activeCount = nodeStates[1].filter(Boolean).length;
    text(`Dropout applied: ${activeCount}/${LAYER_SIZES[1]} hidden nodes active (grayed = dropped)`, canvasWidth / 2, 34);
  } else {
    fill(40, 120, 40);
    text('Full network active — no dropout', canvasWidth / 2, 34);
  }

  // Layer labels
  noStroke();
  for (let li = 0; li < LAYER_SIZES.length; li++) {
    const p = getNodePos(li, 0);
    fill(li === 1 && dropoutApplied ? color(200, 80, 20) : color(60, 80, 140));
    textSize(12);
    textAlign(CENTER, BOTTOM);
    text(LAYER_NAMES[li], p.x, TOP_PAD - 8);
  }

  // Draw edges
  for (let li = 0; li < LAYER_SIZES.length - 1; li++) {
    for (let ni = 0; ni < LAYER_SIZES[li]; ni++) {
      for (let nj = 0; nj < LAYER_SIZES[li + 1]; nj++) {
        const srcActive = nodeStates[li][ni];
        const dstActive = nodeStates[li + 1][nj];
        const edgeActive = srcActive && dstActive;
        const A = getNodePos(li, ni);
        const B = getNodePos(li + 1, nj);

        if (edgeActive) {
          stroke(160, 180, 220);
          strokeWeight(1.2);
        } else {
          stroke(210, 215, 220);
          strokeWeight(0.6);
          setLineDash([3, 4]);
        }
        line(A.x, A.y, B.x, B.y);
        setLineDash([]);
      }
    }
  }

  // Draw nodes
  for (let li = 0; li < LAYER_SIZES.length; li++) {
    for (let ni = 0; ni < LAYER_SIZES[li]; ni++) {
      const p = getNodePos(li, ni);
      const active = nodeStates[li][ni];

      let fillC, strokeC;
      if (!active) {
        // Dropped out
        fillC = color(200, 200, 205);
        strokeC = color(160, 160, 170);
      } else if (li === 0) {
        fillC = color(100, 180, 255);
        strokeC = color(40, 110, 200);
      } else if (li === 1) {
        fillC = color(130, 210, 130);
        strokeC = color(50, 150, 50);
      } else {
        fillC = color(255, 150, 150);
        strokeC = color(200, 60, 60);
      }

      strokeWeight(2);
      stroke(strokeC);
      fill(fillC);
      ellipse(p.x, p.y, NODE_R * 2);

      // Node label
      noStroke();
      if (active) {
        fill(20);
      } else {
        fill(150);
      }
      textSize(10);
      textAlign(CENTER, CENTER);
      const prefix = li === 0 ? 'x' : li === 1 ? 'h' : 'y';
      text(prefix + (ni + 1), p.x, p.y);

      // Dropped indicator
      if (!active) {
        stroke(180, 60, 60, 200);
        strokeWeight(2);
        const r = NODE_R - 2;
        line(p.x - r * 0.6, p.y - r * 0.6, p.x + r * 0.6, p.y + r * 0.6);
        line(p.x + r * 0.6, p.y - r * 0.6, p.x - r * 0.6, p.y + r * 0.6);
      }
    }
  }

  // Explanation text
  const exY = canvasHeight - BOTTOM_PAD + 10;
  noStroke();
  fill(80, 90, 110);
  textSize(11);
  textAlign(CENTER, TOP);
  text('Dropout randomly deactivates neurons during training, preventing overfitting by forcing the network to learn redundant representations.', canvasWidth / 2, exY);

  // Reposition buttons on draw (handles resize)
  const btnY = canvasHeight - 55;
  const btnCenterX = canvasWidth / 2;
  btnDropout.position(btnCenterX - 170, btnY);
  btnReset.position(btnCenterX + 10, btnY);
}

function setLineDash(list) {
  drawingContext.setLineDash(list);
}

function windowResized() {
  canvasWidth = windowWidth;
  resizeCanvas(canvasWidth, canvasHeight);
}
