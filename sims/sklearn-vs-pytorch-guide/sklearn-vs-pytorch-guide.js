// Scikit-learn vs PyTorch Decision Guide MicroSim
// Click-through decision tree routing to Scikit-learn or PyTorch
// Bloom: Analyze (L4) / differentiate
//
// Layout:
//   drawHeight = 440
//   controlHeight = 50
//   canvasHeight = 490

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

// Decision tree nodes
// Each node: { id, question, yes, no }  — leaf nodes have outcome instead
const TREE = {
  q1: { question: 'Is your model a neural network?', yes: 'q2a', no: 'q2b' },
  q2a: { question: 'Do you need GPU acceleration\nor custom training loops?', yes: 'pytorch', no: 'pytorch' },
  q2b: { question: 'Do you need automatic\ndifferentiation (gradients)?', yes: 'pytorch', no: 'q3' },
  q3:  { question: 'Is your dataset > 1 million\nsamples or streaming?', yes: 'pytorch', no: 'sklearn' },
  pytorch: {
    outcome: 'PyTorch',
    color: '#E74C3C',
    desc: 'Use PyTorch for neural networks, GPU training, custom loss functions, and research-oriented deep learning.',
    api: 'model = nn.Sequential(...)\noptimizer = optim.Adam(...)\n# custom training loop'
  },
  sklearn: {
    outcome: 'Scikit-learn',
    color: '#16A085',
    desc: 'Use Scikit-learn for classical ML algorithms. Its unified .fit()/.predict() API makes switching models trivial.',
    api: 'model = LogisticRegression()\nmodel.fit(X_train, y_train)\nacc = model.score(X_test, y_test)'
  }
};

let currentNode = 'q1';
let path = ['q1'];
let resetButton;

// Node box geometry — computed each draw
let nodeBoxes = {};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  resetButton = createButton('Start Over');
  resetButton.parent(document.querySelector('main'));
  resetButton.position(10, drawHeight + 5);
  resetButton.mousePressed(resetTree);

  describe('Decision tree guiding choice between Scikit-learn and PyTorch based on task requirements.', LABEL);
}

function resetTree() {
  currentNode = 'q1';
  path = ['q1'];
}

function draw() {
  updateCanvasSize();
  nodeBoxes = {};

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
  text('Scikit-learn vs PyTorch: Which to Use?', canvasWidth / 2, 8);

  let node = TREE[currentNode];

  if (node.outcome) {
    // Terminal: show outcome
    drawOutcome(node);
  } else {
    // Draw the decision tree path so far + current question
    drawPathHistory();
    drawCurrentQuestion(node);
  }

  // Comparison table at bottom (always visible)
  drawComparisonTable();

  // Control bar hint
  fill('#666');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Step ' + path.length + ' of up to 4  |  Click Yes or No to follow the decision tree', 110, drawHeight + 25);
}

function drawPathHistory() {
  // Show breadcrumb of answered questions
  let yBase = 44;
  fill('#888');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Path taken:', margin, yBase);

  let crumbY = yBase + 18;
  for (let i = 0; i < path.length - 1; i++) {
    let n = TREE[path[i]];
    if (!n || n.outcome) continue;
    let ans = TREE[path[i]].yes === path[i + 1] ? 'Yes' : 'No';
    let crumbColor = ans === 'Yes' ? '#27AE60' : '#E74C3C';
    fill(crumbColor);
    noStroke();
    textSize(12);
    text('Q' + (i + 1) + ': ' + n.question.replace('\n', ' ') + '  →  ' + ans, margin + 10, crumbY);
    crumbY += 18;
  }
}

function drawCurrentQuestion(node) {
  // Central question box
  let qIdx = path.length;
  let qBoxW = min(canvasWidth - margin * 4, 500);
  let qBoxH = 72;
  let qBoxX = (canvasWidth - qBoxW) / 2;
  let qBoxY = 48 + (path.length - 1) * 18 + 20;

  // Question box
  fill(255, 248, 220);
  stroke('#F39C12');
  strokeWeight(2);
  rect(qBoxX, qBoxY, qBoxW, qBoxH, 10);

  fill('#333');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(15);
  text('Q' + qIdx + ': ' + node.question, qBoxX + qBoxW / 2, qBoxY + qBoxH / 2, qBoxW - 20, qBoxH - 10);

  // Yes / No buttons (drawn on canvas, not p5 elements)
  let btnW = 110, btnH = 42;
  let btnGap = 30;
  let btnY = qBoxY + qBoxH + 20;
  let yesX = (canvasWidth / 2) - btnW - btnGap / 2;
  let noX  = (canvasWidth / 2) + btnGap / 2;

  // Yes button
  fill('#27AE60');
  stroke('white');
  strokeWeight(2);
  rect(yesX, btnY, btnW, btnH, 8);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('Yes ✓', yesX + btnW / 2, btnY + btnH / 2);

  // No button
  fill('#E74C3C');
  stroke('white');
  strokeWeight(2);
  rect(noX, btnY, btnW, btnH, 8);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(16);
  text('No ✗', noX + btnW / 2, btnY + btnH / 2);

  // Store button positions for click detection
  nodeBoxes['yes'] = { x: yesX, y: btnY, w: btnW, h: btnH, next: node.yes };
  nodeBoxes['no']  = { x: noX,  y: btnY, w: btnW, h: btnH, next: node.no  };

  // Hint below buttons
  fill('#999');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Click Yes or No to answer', canvasWidth / 2, btnY + btnH + 10);
}

function drawOutcome(node) {
  let boxW = min(canvasWidth - margin * 4, 480);
  let boxH = 130;
  let boxX = (canvasWidth - boxW) / 2;
  let boxY = 48 + (path.length - 2) * 18 + 20;

  drawPathHistory();

  // Outcome panel
  fill(lerpColor(color(node.color), color('white'), 0.85));
  stroke(node.color);
  strokeWeight(3);
  rect(boxX, boxY, boxW, boxH, 12);

  // Recommendation label
  fill(node.color);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(20);
  text('Recommendation: ' + node.outcome, boxX + boxW / 2, boxY + 12);

  // Description
  fill(50);
  textSize(12);
  text(node.desc, boxX + 12, boxY + 44, boxW - 24, 50);

  // API snippet
  fill('#444');
  textSize(11);
  textAlign(LEFT, TOP);
  text(node.api, boxX + 12, boxY + 94, boxW - 24, 34);

  // Start Over hint
  fill('#666');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Use "Start Over" to try a different scenario', canvasWidth / 2, boxY + boxH + 12);
}

function drawComparisonTable() {
  let tableY = drawHeight - 90;
  let tableW = canvasWidth - margin * 2;
  let tableX = margin;

  fill(255);
  stroke('#CCC');
  strokeWeight(1);
  rect(tableX, tableY, tableW, 80, 6);

  // Header
  let col1 = tableX + 10;
  let col2 = tableX + tableW * 0.38;
  let col3 = tableX + tableW * 0.68;
  let rowH = 16;

  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Feature', col1, tableY + 6);
  fill('#16A085');
  text('Scikit-learn', col2, tableY + 6);
  fill('#E74C3C');
  text('PyTorch', col3, tableY + 6);

  stroke('#EEE'); strokeWeight(1);
  line(tableX, tableY + 22, tableX + tableW, tableY + 22);

  let rows = [
    ['API style',      '.fit() / .predict()',   'Custom training loop'],
    ['GPU support',    'No',                    'Yes (CUDA)'],
    ['Auto-grad',      'No',                    'Yes (.backward())'],
    ['Best for',       'Classical ML',          'Deep learning']
  ];

  for (let i = 0; i < rows.length; i++) {
    let ry = tableY + 26 + i * rowH;
    fill(i % 2 === 0 ? 245 : 255);
    noStroke();
    rect(tableX, ry, tableW, rowH);
    fill('#444');
    noStroke();
    textSize(11);
    textAlign(LEFT, CENTER);
    text(rows[i][0], col1, ry + rowH / 2);
    fill('#16A085');
    text(rows[i][1], col2, ry + rowH / 2);
    fill('#E74C3C');
    text(rows[i][2], col3, ry + rowH / 2);
  }
}

function mousePressed() {
  for (let [key, b] of Object.entries(nodeBoxes)) {
    if (mouseX >= b.x && mouseX <= b.x + b.w &&
        mouseY >= b.y && mouseY <= b.y + b.h) {
      currentNode = b.next;
      path.push(b.next);
      return;
    }
  }
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  resetButton.position(10, drawHeight + 5);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
