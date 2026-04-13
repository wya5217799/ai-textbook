// Benchmark Dataset Explorer MicroSim
// Side-by-side MNIST vs ImageNet panels with shuffleable example images
// Hover images for labels; toggle pixel values for MNIST
// Bloom: Remember (L1) / identify
//
// Layout:
//   drawHeight = 440
//   controlHeight = 80 (2 rows)
//   canvasHeight = 520

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;
let defaultTextSize = 16;

let shuffleMNIST, shuffleImageNet;
let showPixelVals = false;
let showPixelCheck;

// Seeded random for reproducible digit generation
let mnistSeeds = [42, 17, 99, 33, 71, 58, 24, 86, 11, 63];
let imagenetSeeds = [7, 22, 55, 88, 14, 36, 77, 91, 3, 48];

// 9 MNIST digit examples: label + pixel pattern seed
let mnistExamples = [];
let imagenetExamples = [];

// ImageNet categories (placeholder colored rectangles)
const IMAGENET_CATS = [
  { label: 'Golden Retriever', r: 210, g: 160, b: 70 },
  { label: 'African Elephant', r: 150, g: 140, b: 130 },
  { label: 'Red Fox',          r: 200, g: 90,  b: 40 },
  { label: 'Great White Shark',r: 80,  g: 130, b: 180 },
  { label: 'Bald Eagle',       r: 50,  g: 50,  b: 60 },
  { label: 'Sunflower',        r: 240, g: 200, b: 30 },
  { label: 'School Bus',       r: 240, g: 190, b: 20 },
  { label: 'Electric Guitar',  r: 160, g: 60,  b: 60 },
  { label: 'Volcano',          r: 120, g: 80,  b: 60 }
];

let hoveredMNIST = -1;
let hoveredImageNet = -1;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  generateMNISTExamples();
  generateImageNetExamples();

  shuffleMNIST = createButton('Shuffle MNIST');
  shuffleMNIST.parent(document.querySelector('main'));
  shuffleMNIST.position(10, drawHeight + 5);
  shuffleMNIST.mousePressed(() => { mnistSeeds = mnistSeeds.map(() => floor(random(1, 200))); generateMNISTExamples(); });

  shuffleImageNet = createButton('Shuffle ImageNet');
  shuffleImageNet.parent(document.querySelector('main'));
  shuffleImageNet.position(130, drawHeight + 5);
  shuffleImageNet.mousePressed(() => { imagenetSeeds = imagenetSeeds.map(() => floor(random(1, 200))); generateImageNetExamples(); });

  showPixelCheck = createCheckbox('Show MNIST pixel values', false);
  showPixelCheck.parent(document.querySelector('main'));
  showPixelCheck.position(10, drawHeight + 44);
  showPixelCheck.changed(() => { showPixelVals = showPixelCheck.checked(); });

  describe('Benchmark dataset explorer with MNIST digit images and ImageNet category placeholders.', LABEL);
}

function generateMNISTExamples() {
  mnistExamples = [];
  let digits = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9];
  for (let i = 0; i < 9; i++) {
    randomSeed(mnistSeeds[i]);
    let d = digits[i % 10];
    mnistExamples.push({ digit: d, pixels: generateDigitPixels(d) });
  }
}

function generateImageNetExamples() {
  imagenetExamples = [];
  for (let i = 0; i < 9; i++) {
    randomSeed(imagenetSeeds[i]);
    let cat = IMAGENET_CATS[i % IMAGENET_CATS.length];
    imagenetExamples.push({ label: cat.label, r: cat.r, g: cat.g, b: cat.b });
  }
}

// Generate a plausible 8x8 digit pattern (simplified, not real MNIST)
function generateDigitPixels(digit) {
  // Digit patterns as 8x8 binary maps (1=dark, 0=light)
  const patterns = {
    0: [[0,1,1,1,1,1,0,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,1,0],[1,0,0,0,0,0,1,0],[0,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    1: [[0,0,1,1,0,0,0,0],[0,1,1,1,0,0,0,0],[0,0,1,1,0,0,0,0],[0,0,1,1,0,0,0,0],[0,0,1,1,0,0,0,0],[0,0,1,1,0,0,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    2: [[0,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0],[0,1,0,0,0,0,0,0],[1,1,1,1,1,1,0,0],[0,0,0,0,0,0,0,0]],
    3: [[0,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[0,0,1,1,1,0,0,0],[0,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    4: [[0,0,0,1,1,0,0,0],[0,0,1,0,1,0,0,0],[0,1,0,0,1,0,0,0],[1,0,0,0,1,0,0,0],[1,1,1,1,1,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,1,0,0,0],[0,0,0,0,0,0,0,0]],
    5: [[1,1,1,1,1,1,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,0,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    6: [[0,0,1,1,1,0,0,0],[0,1,0,0,0,0,0,0],[1,0,0,0,0,0,0,0],[1,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    7: [[1,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,0,1,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,1,0,0,0,0,0],[0,0,0,0,0,0,0,0]],
    8: [[0,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,0,0,0],[0,0,0,0,0,0,0,0]],
    9: [[0,1,1,1,1,0,0,0],[1,0,0,0,0,1,0,0],[1,0,0,0,0,1,0,0],[0,1,1,1,1,1,0,0],[0,0,0,0,0,1,0,0],[0,0,0,0,1,0,0,0],[0,0,1,1,0,0,0,0],[0,0,0,0,0,0,0,0]]
  };

  let pat = patterns[digit] || patterns[0];
  // Add slight noise
  return pat.map(row => row.map(v => {
    let noise = random(-20, 20);
    return v === 1 ? max(0, 30 + noise) : min(255, 230 + abs(noise));
  }));
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
  text('Benchmark Dataset Explorer', canvasWidth / 2, 8);

  // Two panel layout
  let panelW = (canvasWidth - margin * 3) / 2;
  let leftX  = margin;
  let rightX = margin * 2 + panelW;
  let panelY = 38;
  let panelH = drawHeight - panelY - margin;

  // MNIST panel
  fill(255);
  stroke('#4A90D9');
  strokeWeight(2);
  rect(leftX, panelY, panelW, panelH, 8);

  fill('#4A90D9');
  noStroke();
  rect(leftX, panelY, panelW, 26, 8, 8, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('MNIST Dataset', leftX + panelW / 2, panelY + 13);

  drawMNISTPanel(leftX, panelY + 30, panelW, panelH - 30);

  // ImageNet panel
  fill(255);
  stroke('#E67E22');
  strokeWeight(2);
  rect(rightX, panelY, panelW, panelH, 8);

  fill('#E67E22');
  noStroke();
  rect(rightX, panelY, panelW, 26, 8, 8, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(14);
  text('ImageNet Dataset', rightX + panelW / 2, panelY + 13);

  drawImageNetPanel(rightX, panelY + 30, panelW, panelH - 30);

  // Control bar hint
  fill('#666');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Hover images for labels', 270, drawHeight + 18);

  // Reposition controls on resize
  shuffleMNIST.position(10, drawHeight + 5);
  shuffleImageNet.position(140, drawHeight + 5);
  showPixelCheck.position(10, drawHeight + 44);
}

function drawMNISTPanel(x, y, w, h) {
  // 3x3 grid of digit images
  let cols = 3, rows = 3;
  let pad = 8;
  let cellW = (w - pad * (cols + 1)) / cols;
  let cellH = cellW; // square cells
  let gridH = rows * cellH + (rows + 1) * pad;
  let startX = x + pad;
  let startY = y + pad;

  hoveredMNIST = -1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let i = r * cols + c;
      let ex = mnistExamples[i];
      let cx = startX + c * (cellW + pad);
      let cy = startY + r * (cellH + pad);

      let isHov = mouseX >= cx && mouseX <= cx + cellW &&
                  mouseY >= cy && mouseY <= cy + cellH;
      if (isHov) hoveredMNIST = i;

      // Draw pixel grid
      let psz = cellW / 8;
      for (let pr = 0; pr < 8; pr++) {
        for (let pc = 0; pc < 8; pc++) {
          let v = ex.pixels[pr][pc];
          fill(v, v, v);
          stroke(isHov ? '#4A90D9' : '#EEE');
          strokeWeight(0.3);
          rect(cx + pc * psz, cy + pr * psz, psz, psz);
        }
      }

      // Pixel value overlay
      if (showPixelVals && psz > 8) {
        for (let pr = 0; pr < 8; pr++) {
          for (let pc = 0; pc < 8; pc++) {
            let v = ex.pixels[pr][pc];
            fill(v < 128 ? 220 : 30);
            noStroke();
            textAlign(CENTER, CENTER);
            textSize(7);
            text(floor(v), cx + pc * psz + psz / 2, cy + pr * psz + psz / 2);
          }
        }
      }

      // Label on hover
      if (isHov) {
        fill(255, 255, 200, 230);
        stroke('#4A90D9');
        strokeWeight(1);
        rect(cx, cy - 18, cellW, 16, 4);
        fill('#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(11);
        text('Digit: ' + ex.digit, cx + cellW / 2, cy - 10);
      }
    }
  }

  // Stats card
  let statsY = startY + gridH + 4;
  fill(240);
  noStroke();
  rect(x + pad, statsY, w - pad * 2, h - gridH - pad * 2, 6);
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  let stats = [
    'Task: 10-class digit classification',
    'Train: 60,000  Test: 10,000',
    'Image size: 28×28 pixels (grayscale)',
    'Input dims: 784 (flattened)',
    '"Hello World" of ML benchmarks'
  ];
  for (let i = 0; i < stats.length; i++) {
    text(stats[i], x + pad + 6, statsY + 4 + i * 14);
  }
}

function drawImageNetPanel(x, y, w, h) {
  let cols = 3, rows = 3;
  let pad = 8;
  let cellW = (w - pad * (cols + 1)) / cols;
  let cellH = cellW;
  let gridH = rows * cellH + (rows + 1) * pad;
  let startX = x + pad;
  let startY = y + pad;

  hoveredImageNet = -1;
  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let i = r * cols + c;
      let ex = imagenetExamples[i];
      let cx = startX + c * (cellW + pad);
      let cy = startY + r * (cellH + pad);

      let isHov = mouseX >= cx && mouseX <= cx + cellW &&
                  mouseY >= cy && mouseY <= cy + cellH;
      if (isHov) hoveredImageNet = i;

      // Colored rectangle placeholder with texture
      randomSeed(imagenetSeeds[i] * 3);
      fill(ex.r, ex.g, ex.b);
      stroke(isHov ? '#E67E22' : '#DDD');
      strokeWeight(isHov ? 2.5 : 1);
      rect(cx, cy, cellW, cellH, 4);

      // Texture: random lighter patches
      for (let t = 0; t < 6; t++) {
        let tx = cx + random(4, cellW - 10);
        let ty = cy + random(4, cellH - 10);
        let tr = random(4, 12);
        fill(ex.r + 40, ex.g + 40, ex.b + 40, 120);
        noStroke();
        circle(tx, ty, tr);
      }

      // Category label centered
      fill(255, 255, 255, 200);
      noStroke();
      rect(cx + 2, cy + cellH - 18, cellW - 4, 16, 3);
      fill(30);
      textAlign(CENTER, CENTER);
      textSize(9);
      text(ex.label.split(' ').slice(-1)[0], cx + cellW / 2, cy + cellH - 10);

      // Full label on hover
      if (isHov) {
        fill(255, 255, 200, 230);
        stroke('#E67E22');
        strokeWeight(1);
        rect(cx, cy - 18, cellW, 16, 4);
        fill('#333');
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(10);
        text(ex.label, cx + cellW / 2, cy - 10);
      }
    }
  }

  // Stats card
  let statsY = startY + gridH + 4;
  fill(240);
  noStroke();
  rect(x + pad, statsY, w - pad * 2, h - gridH - pad * 2, 6);
  fill(60);
  textAlign(LEFT, TOP);
  textSize(11);
  let stats = [
    'Task: 1,000-class image classification',
    'Train: ~1.2M  Val: 50K  (ILSVRC)',
    'Image size: variable (224×224 typical)',
    'Significance: AlexNet 2012 breakthrough',
    'Full dataset: 14M+ images, 20K classes'
  ];
  for (let i = 0; i < stats.length; i++) {
    text(stats[i], x + pad + 6, statsY + 4 + i * 14);
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
