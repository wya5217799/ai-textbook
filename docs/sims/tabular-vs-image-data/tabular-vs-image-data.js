// Tabular vs Image Data Comparison MicroSim
// Step-through side-by-side comparison: tabular spreadsheet vs pixel grid
// Bloom: Understand (L2) / compare — step-through with concrete data, no animation
//
// Layout:
//   drawHeight = 420
//   controlHeight = 80 (2 rows)
//   canvasHeight = 500

let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let defaultTextSize = 16;

let stage = 0;
let prevButton, nextButton;
let showValues = false;
let showValuesCheck;

// Sample tabular data
const TABLE_COLS = ['Area', 'Rooms', 'Age', 'Price'];
const TABLE_DATA = [
  [1200, 3, 10, 250],
  [850,  2, 25, 160],
  [2100, 5, 5,  420],
  [950,  2, 40, 145],
  [1500, 4, 15, 310]
];

// 8x8 grayscale image pixel values (0-255), a rough "7" digit shape
const PIXELS = [
  [240,240,240,  0,  0,  0,240,240],
  [240,240,  0, 20, 20,  0,240,240],
  [240,240,  0, 20, 20,240,240,240],
  [240,240,240,  0, 20,240,240,240],
  [240,240,240, 20, 20,240,240,240],
  [240,240,240, 20, 20,240,240,240],
  [240,240,240, 20, 20,240,240,240],
  [240,240,240,240,240,240,240,240]
];

const STAGE_TITLES = [
  'Stage 1: Raw Data Representations',
  'Stage 2: Feature Extraction',
  'Stage 3: Algorithms'
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevButton = createButton('◀ Previous');
  prevButton.parent(document.querySelector('main'));
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(() => { stage = max(0, stage - 1); });

  nextButton = createButton('Next ▶');
  nextButton.parent(document.querySelector('main'));
  nextButton.position(110, drawHeight + 5);
  nextButton.mousePressed(() => { stage = min(2, stage + 1); });

  showValuesCheck = createCheckbox('Show pixel values', false);
  showValuesCheck.parent(document.querySelector('main'));
  showValuesCheck.position(10, drawHeight + 42);
  showValuesCheck.changed(() => { showValues = showValuesCheck.checked(); });

  describe('Side-by-side comparison of tabular data and image data representations at three levels of abstraction.', LABEL);
}

function draw() {
  updateCanvasSize();

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
  text('Tabular Data vs Image Data', canvasWidth / 2, 8);

  // Stage label
  fill('#555');
  textSize(14);
  text(STAGE_TITLES[stage], canvasWidth / 2, 36);

  // Stage indicator dots
  for (let i = 0; i < 3; i++) {
    fill(i === stage ? '#4A90D9' : '#CCC');
    noStroke();
    circle(canvasWidth / 2 - 20 + i * 20, 58, 10);
  }

  // Two-panel layout
  let panelW = (canvasWidth - margin * 3) / 2;
  let leftX  = margin;
  let rightX = margin * 2 + panelW;
  let panelY = 68;
  let panelH = drawHeight - panelY - margin;

  // Panel backgrounds
  fill(255, 255, 255, 200);
  stroke('#4A90D9');
  strokeWeight(1.5);
  rect(leftX, panelY, panelW, panelH, 8);

  fill(255, 255, 255, 200);
  stroke('#E67E22');
  strokeWeight(1.5);
  rect(rightX, panelY, panelW, panelH, 8);

  // Panel headers
  fill('#4A90D9');
  noStroke();
  rect(leftX, panelY, panelW, 28, 8, 8, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Tabular Data', leftX + panelW / 2, panelY + 14);

  fill('#E67E22');
  noStroke();
  rect(rightX, panelY, panelW, 28, 8, 8, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('Image Data (8×8 digit)', rightX + panelW / 2, panelY + 14);

  // Content per stage
  if (stage === 0) {
    drawTabularStage0(leftX, panelY + 32, panelW, panelH - 32);
    drawImageStage0(rightX, panelY + 32, panelW, panelH - 32);
  } else if (stage === 1) {
    drawTabularStage1(leftX, panelY + 32, panelW, panelH - 32);
    drawImageStage1(rightX, panelY + 32, panelW, panelH - 32);
  } else {
    drawTabularStage2(leftX, panelY + 32, panelW, panelH - 32);
    drawImageStage2(rightX, panelY + 32, panelW, panelH - 32);
  }

  // Control area labels
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Stage ' + (stage + 1) + ' of 3', 220, drawHeight + 17);
}

// ---- Stage 0: Raw representations ----
function drawTabularStage0(x, y, w, h) {
  let cellW = (w - 16) / TABLE_COLS.length;
  let cellH = 22;
  let startY = y + 8;

  // Header row
  for (let c = 0; c < TABLE_COLS.length; c++) {
    fill('#D6EAF8');
    stroke('#AAA');
    strokeWeight(1);
    rect(x + 8 + c * cellW, startY, cellW - 2, cellH, 3);
    fill('#2980B9');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(12);
    text(TABLE_COLS[c], x + 8 + c * cellW + cellW / 2, startY + cellH / 2);
  }

  // Data rows
  for (let r = 0; r < TABLE_DATA.length; r++) {
    for (let c = 0; c < TABLE_DATA[r].length; c++) {
      fill(r % 2 === 0 ? 250 : 240);
      stroke('#DDD');
      strokeWeight(1);
      rect(x + 8 + c * cellW, startY + (r + 1) * cellH, cellW - 2, cellH, 2);
      fill(50);
      noStroke();
      textAlign(CENTER, CENTER);
      textSize(11);
      text(TABLE_DATA[r][c], x + 8 + c * cellW + cellW / 2, startY + (r + 1) * cellH + cellH / 2);
    }
  }

  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Format: rows × columns\nStorage: CSV, SQL, Excel\nSamples: 5  Features: 4', x + 8, startY + 6 * cellH + 8);
}

function drawImageStage0(x, y, w, h) {
  let psz = min((w - 20) / 8, (h - 70) / 8);
  let startX = x + (w - psz * 8) / 2;
  let startY = y + 8;

  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let v = PIXELS[r][c];
      fill(v, v, v);
      stroke('#CCC');
      strokeWeight(0.5);
      rect(startX + c * psz, startY + r * psz, psz - 1, psz - 1, 1);
      if (showValues && psz > 18) {
        fill(v < 128 ? 220 : 40);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(9);
        text(v, startX + c * psz + psz / 2, startY + r * psz + psz / 2);
      }
    }
  }

  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(11);
  text('Format: height × width pixels\nStorage: PNG/JPEG files\nSize: 8×8 = 64 values', x + 8, startY + psz * 8 + 8);
}

// ---- Stage 1: Feature extraction ----
function drawTabularStage1(x, y, w, h) {
  let row = TABLE_DATA[0];
  let cellW = (w - 16) / TABLE_COLS.length;
  let cellH = 24;
  let startY = y + 10;

  // Highlight feature columns (first 3) vs label (last)
  for (let c = 0; c < TABLE_COLS.length; c++) {
    let isFeature = c < 3;
    fill(isFeature ? '#D6EAF8' : '#FADBD8');
    stroke(isFeature ? '#4A90D9' : '#E74C3C');
    strokeWeight(2);
    rect(x + 8 + c * cellW, startY, cellW - 2, cellH, 4);
    fill(isFeature ? '#2980B9' : '#C0392B');
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(TABLE_COLS[c], x + 8 + c * cellW + cellW / 2, startY + cellH / 2);

    fill(50);
    textSize(13);
    text(row[c], x + 8 + c * cellW + cellW / 2, startY + cellH * 1.6);
  }

  // Labels
  fill('#2980B9');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(11);
  text('Features (x)', x + 8 + cellW, startY + cellH * 2.4);
  fill('#C0392B');
  text('Label (y)', x + 8 + 3 * cellW + cellW / 2, startY + cellH * 2.4);

  // Feature vector
  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Feature vector:', x + 8, startY + cellH * 3.2);
  fill('#2980B9');
  textSize(14);
  text('x = [1200, 3, 10]', x + 8, startY + cellH * 3.8);
  fill('#C0392B');
  textSize(13);
  text('y = 250  (label)', x + 8, startY + cellH * 4.5);
  fill(80);
  textSize(11);
  text('d = 3  (dimensionality)', x + 8, startY + cellH * 5.2);
}

function drawImageStage1(x, y, w, h) {
  let psz = min((w - 20) / 8, 22);
  let startX = x + (w - psz * 8) / 2;
  let startY = y + 10;

  // Draw pixel grid with highlight on flattened row
  let highlightRow = 2;
  for (let r = 0; r < 8; r++) {
    for (let c = 0; c < 8; c++) {
      let v = PIXELS[r][c];
      let isHL = r === highlightRow;
      fill(isHL ? lerpColor(color(v,v,v), color('#4A90D9'), 0.4) : color(v,v,v));
      stroke(isHL ? '#4A90D9' : '#CCC');
      strokeWeight(isHL ? 2 : 0.5);
      rect(startX + c * psz, startY + r * psz, psz - 1, psz - 1, 1);
    }
  }

  // Flattened vector display
  fill(60);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text('Highlighted row flattened →', x + 8, startY + psz * 8 + 6);
  fill('#2980B9');
  textSize(11);
  let rowVals = PIXELS[highlightRow].map(v => v === 240 ? '240' : v.toString()).join(', ');
  text('[' + rowVals + ']', x + 8, startY + psz * 8 + 22, w - 16, 30);
  fill(80);
  textSize(11);
  text('Full image flattened: shape (64,)', x + 8, startY + psz * 8 + 52);
}

// ---- Stage 2: Algorithms ----
function drawTabularStage2(x, y, w, h) {
  let items = [
    { lib: 'Scikit-learn', algs: ['Linear Regression', 'Logistic Regression', 'KNN', 'K-Means'], color: '#16A085' },
    { lib: 'PyTorch', algs: ['Fully-connected NN', 'MLP Classifier'], color: '#E74C3C' }
  ];
  let ty = y + 12;
  for (let item of items) {
    fill(lerpColor(color(item.color), color('white'), 0.85));
    stroke(item.color);
    strokeWeight(1.5);
    rect(x + 8, ty, w - 16, 20 + item.algs.length * 18, 6);
    fill(item.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(item.lib + ':', x + 14, ty + 6);
    fill(50);
    textSize(12);
    for (let i = 0; i < item.algs.length; i++) {
      text('• ' + item.algs[i], x + 20, ty + 24 + i * 18);
    }
    ty += 28 + item.algs.length * 18;
  }
}

function drawImageStage2(x, y, w, h) {
  let items = [
    { lib: 'PyTorch', algs: ['Convolutional Neural Network (CNN)', 'ResNet, VGG, EfficientNet', 'Vision Transformer (ViT)'], color: '#E74C3C' },
    { lib: 'Scikit-learn', algs: ['SVM (with flattened pixels)', 'PCA for compression'], color: '#16A085' }
  ];
  let ty = y + 12;
  for (let item of items) {
    fill(lerpColor(color(item.color), color('white'), 0.85));
    stroke(item.color);
    strokeWeight(1.5);
    rect(x + 8, ty, w - 16, 20 + item.algs.length * 18, 6);
    fill(item.color);
    noStroke();
    textAlign(LEFT, TOP);
    textSize(13);
    text(item.lib + ':', x + 14, ty + 6);
    fill(50);
    textSize(12);
    for (let i = 0; i < item.algs.length; i++) {
      text('• ' + item.algs[i], x + 20, ty + 24 + i * 18);
    }
    ty += 28 + item.algs.length * 18;
  }
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
