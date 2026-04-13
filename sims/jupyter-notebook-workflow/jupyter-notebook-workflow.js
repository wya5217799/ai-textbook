// Jupyter Notebook Workflow MicroSim
// Vertical flowchart showing 9-step ML workflow in a Jupyter notebook
// Hover any step card for details; click to highlight that step
// Bloom: Apply (L3) / demonstrate
//
// Layout:
//   drawHeight = 460
//   controlHeight = 50
//   canvasHeight = 510

let canvasWidth = 700;
let drawHeight = 460;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let hoveredStep = -1;
let selectedStep = -1;

const STEPS = [
  {
    label: '1. Import Libraries',
    type: 'code',
    detail: 'import numpy as np\nimport pandas as pd\nimport matplotlib.pyplot as plt\nfrom sklearn.model_selection import train_test_split'
  },
  {
    label: '2. Load Data',
    type: 'code',
    detail: 'df = pd.read_csv("dataset.csv")\nprint(df.shape)  # e.g. (1000, 8)\n# Or use built-in: from sklearn.datasets import load_iris'
  },
  {
    label: '3. Explore Data',
    type: 'output',
    detail: 'df.head()        # first 5 rows\ndf.describe()    # summary stats\ndf.isnull().sum()  # missing values per column'
  },
  {
    label: '4. Visualise Data',
    type: 'plot',
    detail: 'plt.hist(df["feature1"], bins=30)\nplt.scatter(df["x"], df["y"], c=df["label"])\nplt.show()'
  },
  {
    label: '5. Preprocess Data',
    type: 'code',
    detail: 'from sklearn.preprocessing import StandardScaler\nX = df.drop("target", axis=1).values\ny = df["target"].values\nX_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2)\nscaler = StandardScaler()\nX_train = scaler.fit_transform(X_train)\nX_test = scaler.transform(X_test)'
  },
  {
    label: '6. Define Model',
    type: 'code',
    detail: '# Scikit-learn:\nfrom sklearn.linear_model import LogisticRegression\nmodel = LogisticRegression()\n\n# OR PyTorch:\nimport torch.nn as nn\nmodel = nn.Sequential(nn.Linear(8, 64), nn.ReLU(), nn.Linear(64, 1))'
  },
  {
    label: '7. Train Model',
    type: 'output',
    detail: '# Scikit-learn:\nmodel.fit(X_train, y_train)\n\n# PyTorch training loop:\nfor epoch in range(100):\n    optimizer.zero_grad()\n    loss = criterion(model(X_train), y_train)\n    loss.backward()\n    optimizer.step()'
  },
  {
    label: '8. Evaluate Results',
    type: 'plot',
    detail: 'from sklearn.metrics import accuracy_score, confusion_matrix\nacc = accuracy_score(y_test, model.predict(X_test))\nprint(f"Accuracy: {acc:.3f}")\n# Plot confusion matrix, ROC curve, etc.'
  },
  {
    label: '9. Document Findings',
    type: 'markdown',
    detail: '## Conclusions\n- Model achieved 94.2% accuracy on the test set\n- Feature "voltage" was the strongest predictor\n- Next steps: tune regularisation, try ensemble methods'
  }
];

const TYPE_COLORS = {
  code:     { bg: '#D6EAF8', border: '#2980B9', label: 'Code Cell',     icon: '{ }' },
  output:   { bg: '#D5F5E3', border: '#27AE60', label: 'Output Cell',   icon: '▶' },
  plot:     { bg: '#FDEBD0', border: '#E67E22', label: 'Plot Output',   icon: '📊' },
  markdown: { bg: '#F9F0FF', border: '#8E44AD', label: 'Markdown Cell', icon: 'M↓' }
};

// Step card geometry — computed each draw
let cards = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Jupyter Notebook ML workflow: 9 steps from import to documentation. Hover each step for code details.', LABEL);
}

function draw() {
  updateCanvasSize();
  cards = [];

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
  text('Jupyter Notebook ML Workflow', canvasWidth / 2, 8);

  // Layout: two columns of steps (left col: 1-5, right col: 6-9)
  let colW = (canvasWidth - margin * 3) / 2;
  let cardH = 36;
  let cardGap = 6;
  let col1X = margin;
  let col2X = margin * 2 + colW;
  let startY = 42;

  // Left column steps 0-4
  for (let i = 0; i < 5; i++) {
    let cy = startY + i * (cardH + cardGap);
    drawStepCard(i, col1X, cy, colW, cardH);

    // Arrow to next
    if (i < 4) {
      stroke(150);
      strokeWeight(1.2);
      let ax = col1X + colW / 2;
      line(ax, cy + cardH, ax, cy + cardH + cardGap);
      fill(150);
      noStroke();
      triangle(ax - 4, cy + cardH + cardGap, ax + 4, cy + cardH + cardGap, ax, cy + cardH + cardGap + 5);
    }
  }

  // Right column steps 5-8
  for (let i = 5; i < 9; i++) {
    let cy = startY + (i - 5) * (cardH + cardGap);
    drawStepCard(i, col2X, cy, colW, cardH);

    if (i < 8) {
      stroke(150);
      strokeWeight(1.2);
      let ax = col2X + colW / 2;
      line(ax, cy + cardH, ax, cy + cardH + cardGap);
      fill(150);
      noStroke();
      triangle(ax - 4, cy + cardH + cardGap, ax + 4, cy + cardH + cardGap, ax, cy + cardH + cardGap + 5);
    }
  }

  // Bridge arrow from bottom of col1 to top of col2
  let bridgeY1 = startY + 4 * (cardH + cardGap) + cardH;
  let bridgeY2 = startY;
  let bridgeMidX = col1X + colW + margin / 2;
  stroke(150);
  strokeWeight(1.2);
  noFill();
  // L-shape: down from col1, across, up to col2
  line(col1X + colW / 2, bridgeY1, col1X + colW / 2, bridgeY1 + 10);
  line(col1X + colW / 2, bridgeY1 + 10, col2X + colW / 2, bridgeY1 + 10);
  line(col2X + colW / 2, bridgeY1 + 10, col2X + colW / 2, bridgeY2);
  fill(150);
  noStroke();
  triangle(col2X + colW / 2 - 4, bridgeY2, col2X + colW / 2 + 4, bridgeY2, col2X + colW / 2, bridgeY2 - 5);

  // Legend
  let legX = margin;
  let legY = drawHeight - 38;
  let types = ['code', 'output', 'plot', 'markdown'];
  let legItemW = (canvasWidth - margin * 2) / types.length;
  for (let i = 0; i < types.length; i++) {
    let t = TYPE_COLORS[types[i]];
    let lx = legX + i * legItemW;
    fill(t.bg);
    stroke(t.border);
    strokeWeight(1);
    rect(lx, legY, legItemW - 8, 22, 4);
    fill(60);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(t.icon + '  ' + t.label, lx + (legItemW - 8) / 2, legY + 11);
  }

  // Detail panel for hovered/selected step
  let tipIdx = hoveredStep >= 0 ? hoveredStep : selectedStep;
  if (tipIdx >= 0 && tipIdx < STEPS.length) {
    drawDetailPanel(STEPS[tipIdx]);
  }

  // Control hint
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Hover any step card to see example code • Click to pin', canvasWidth / 2, drawHeight + 25);
}

function drawStepCard(i, x, y, w, h) {
  cards.push({ i, x, y, w, h });
  let s = STEPS[i];
  let t = TYPE_COLORS[s.type];
  let isHov = hoveredStep === i;
  let isSel = selectedStep === i;

  fill(isHov || isSel ? lerpColor(color(t.bg), color(t.border), 0.15) : color(t.bg));
  stroke(t.border);
  strokeWeight(isHov || isSel ? 2.5 : 1.5);
  rect(x, y, w, h, 6);

  fill(40);
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text(s.label, x + 8, y + h / 2);

  // type badge
  fill(t.border);
  noStroke();
  textAlign(RIGHT, CENTER);
  textSize(11);
  text(t.icon, x + w - 8, y + h / 2);
}

function drawDetailPanel(s) {
  let t = TYPE_COLORS[s.type];
  let panelH = 110;
  let panelW = canvasWidth - margin * 2;
  let px = margin;
  let py = drawHeight - panelH - 46;

  fill(255, 255, 255, 235);
  stroke(t.border);
  strokeWeight(2);
  rect(px, py, panelW, panelH, 8);

  fill(t.border);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(s.label + '  [' + TYPE_COLORS[s.type].label + ']', px + 10, py + 8);

  fill(50);
  textSize(11);
  // monospace-like by using a fixed font rendering
  let lines = s.detail.split('\n');
  for (let i = 0; i < min(lines.length, 5); i++) {
    text(lines[i], px + 10, py + 26 + i * 16);
  }
}

function mouseMoved() {
  hoveredStep = -1;
  for (let c of cards) {
    if (mouseX >= c.x && mouseX <= c.x + c.w &&
        mouseY >= c.y && mouseY <= c.y + c.h) {
      hoveredStep = c.i;
      break;
    }
  }
}

function mousePressed() {
  let hit = -1;
  for (let c of cards) {
    if (mouseX >= c.x && mouseX <= c.x + c.w &&
        mouseY >= c.y && mouseY <= c.y + c.h) {
      hit = c.i;
      break;
    }
  }
  selectedStep = (selectedStep === hit) ? -1 : hit;
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
