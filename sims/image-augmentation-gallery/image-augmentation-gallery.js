// Image Augmentation Gallery MicroSim
// Left: original digit shape; Right: augmented version with real-time p5 transforms
// Dropdown selects augmentation type; slider controls intensity
// Bloom: Apply (L3) / apply
//
// Layout:
//   drawHeight = 420
//   controlHeight = 115 (3 rows x 35 + 10)
//   canvasHeight = 535

let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 115;
let canvasHeight = drawHeight + controlHeight;
let margin = 20;
let sliderLeftMargin = 160;
let defaultTextSize = 16;

let augSelect, intensitySlider, randomBtn, resetBtn;
let currentAug = 'Rotate';
let intensity = 0;  // normalized 0-1

// Off-screen graphics buffer for the base digit image
let baseImg;
const IMG_SIZE = 120;

// The "7" digit pixel pattern (16x16 upscaled)
const DIGIT_PATTERN = [
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,0],
  [0,0,0,0,0,0,0,0,0,0,1,1,1,0,0,0],
  [0,0,0,0,0,0,0,0,0,1,1,1,0,0,0,0],
  [0,0,0,0,0,0,0,0,1,1,1,0,0,0,0,0],
  [0,0,0,0,0,0,0,1,1,1,0,0,0,0,0,0],
  [0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,0],
  [0,0,0,0,0,1,1,1,0,0,0,0,0,0,0,0],
  [0,0,0,0,1,1,1,0,0,0,0,0,0,0,0,0],
  [0,0,0,1,1,1,0,0,0,0,0,0,0,0,0,0],
  [0,0,1,1,1,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,1,1,1,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0],
  [0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0]
];

const AUG_TYPES = [
  'Rotate', 'Flip Horizontal', 'Scale', 'Brightness', 'Add Noise', 'Crop'
];

const AUG_PARAMS = {
  'Rotate':          { min: -45, max: 45,  default: 20,  unit: '°',  label: 'Angle' },
  'Flip Horizontal': { min: 0,   max: 1,   default: 1,   unit: '',   label: 'Apply' },
  'Scale':           { min: 0.5, max: 1.5, default: 1.2, unit: 'x',  label: 'Scale' },
  'Brightness':      { min: 0.3, max: 1.7, default: 1.4, unit: 'x',  label: 'Factor' },
  'Add Noise':       { min: 0,   max: 80,  default: 30,  unit: 'px', label: 'Std Dev' },
  'Crop':            { min: 0,   max: 0.3, default: 0.15,unit: '%',  label: 'Margin' }
};

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Build base image buffer
  baseImg = createGraphics(IMG_SIZE, IMG_SIZE);
  drawDigitToBuffer(baseImg);

  // Row 1: augmentation type select
  augSelect = createSelect();
  augSelect.parent(document.querySelector('main'));
  for (let a of AUG_TYPES) augSelect.option(a);
  augSelect.selected('Rotate');
  augSelect.position(sliderLeftMargin, drawHeight + 5);
  augSelect.changed(() => {
    currentAug = augSelect.value();
    let p = AUG_PARAMS[currentAug];
    intensitySlider.attribute('min', p.min);
    intensitySlider.attribute('max', p.max);
    intensitySlider.attribute('step', (p.max - p.min) / 100);
    intensitySlider.value(p.default);
  });

  // Row 2: intensity slider
  let p0 = AUG_PARAMS['Rotate'];
  intensitySlider = createSlider(p0.min, p0.max, p0.default, (p0.max - p0.min) / 100);
  intensitySlider.parent(document.querySelector('main'));
  intensitySlider.position(sliderLeftMargin, drawHeight + 42);
  intensitySlider.size(canvasWidth - sliderLeftMargin - margin);

  // Row 3: buttons
  randomBtn = createButton('Random Augment');
  randomBtn.parent(document.querySelector('main'));
  randomBtn.position(10, drawHeight + 78);
  randomBtn.mousePressed(applyRandom);

  resetBtn = createButton('Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.position(150, drawHeight + 78);
  resetBtn.mousePressed(() => {
    augSelect.selected('Rotate');
    currentAug = 'Rotate';
    let p = AUG_PARAMS['Rotate'];
    intensitySlider.attribute('min', p.min);
    intensitySlider.attribute('max', p.max);
    intensitySlider.attribute('step', (p.max - p.min) / 100);
    intensitySlider.value(0);
  });

  describe('Image augmentation explorer. Apply geometric and photometric transforms to a digit image and observe the result.', LABEL);
}

function applyRandom() {
  let aug = AUG_TYPES[floor(random(AUG_TYPES.length))];
  augSelect.selected(aug);
  currentAug = aug;
  let p = AUG_PARAMS[aug];
  intensitySlider.attribute('min', p.min);
  intensitySlider.attribute('max', p.max);
  intensitySlider.attribute('step', (p.max - p.min) / 100);
  let val = random(p.min, p.max);
  intensitySlider.value(val);
}

function drawDigitToBuffer(g) {
  g.background(240);
  let psz = IMG_SIZE / DIGIT_PATTERN.length;
  for (let r = 0; r < DIGIT_PATTERN.length; r++) {
    for (let c = 0; c < DIGIT_PATTERN[r].length; c++) {
      let v = DIGIT_PATTERN[r][c];
      g.fill(v === 1 ? 30 : 240);
      g.noStroke();
      g.rect(c * psz, r * psz, psz, psz);
    }
  }
}

function draw() {
  updateCanvasSize();

  // Resize slider
  intensitySlider.size(canvasWidth - sliderLeftMargin - margin);

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
  text('Image Augmentation Gallery', canvasWidth / 2, 8);

  // Panel layout
  let panelW = (canvasWidth - margin * 3) / 2;
  let leftX  = margin;
  let rightX = margin * 2 + panelW;
  let panelY = 36;
  let panelH = drawHeight - panelY - margin;
  let imgY   = panelY + 30 + (panelH - 30 - IMG_SIZE) / 2;

  // Left panel: Original
  fill(255);
  stroke('#CCC');
  strokeWeight(1);
  rect(leftX, panelY, panelW, panelH, 8);
  fill('#555');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text('Original', leftX + panelW / 2, panelY + 8);

  // Draw original image
  let imgX = leftX + (panelW - IMG_SIZE) / 2;
  image(baseImg, imgX, imgY, IMG_SIZE, IMG_SIZE);

  // Label preserved indicator
  fill('#27AE60');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Label: "7"  ✓ preserved', leftX + panelW / 2, imgY + IMG_SIZE + 8);

  // Right panel: Augmented
  fill(255);
  stroke('#4A90D9');
  strokeWeight(2);
  rect(rightX, panelY, panelW, panelH, 8);
  fill('#4A90D9');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text('Augmented: ' + currentAug, rightX + panelW / 2, panelY + 8);

  // Draw augmented image
  let aug = currentAug;
  let val = float(intensitySlider.value());
  let augImgX = rightX + (panelW - IMG_SIZE) / 2;
  let augImgY = imgY;
  let cx = augImgX + IMG_SIZE / 2;
  let cy = augImgY + IMG_SIZE / 2;

  push();
  // Clip to right panel
  translate(cx, cy);

  if (aug === 'Rotate') {
    rotate(radians(val));
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
  } else if (aug === 'Flip Horizontal') {
    if (val > 0.5) scale(-1, 1);
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
  } else if (aug === 'Scale') {
    scale(val);
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
  } else if (aug === 'Brightness') {
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
    // Overlay tint
    if (val > 1.0) {
      fill(255, 255, 255, (val - 1.0) * 200);
    } else {
      fill(0, 0, 0, (1.0 - val) * 200);
    }
    noStroke();
    rect(-IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
  } else if (aug === 'Add Noise') {
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE);
    // Draw random noise dots
    randomSeed(42);
    noStroke();
    for (let n = 0; n < int(val * 8); n++) {
      let nx = random(-IMG_SIZE / 2, IMG_SIZE / 2);
      let ny = random(-IMG_SIZE / 2, IMG_SIZE / 2);
      let nv = random(50, 200);
      fill(nv, nv, nv, 180);
      rect(nx, ny, 4, 4);
    }
  } else if (aug === 'Crop') {
    let crop = val; // fraction to cut from each edge
    let srcX = IMG_SIZE * crop;
    let srcY = IMG_SIZE * crop;
    let srcW = IMG_SIZE * (1 - crop * 2);
    // Show cropped region scaled back to full size
    image(baseImg, -IMG_SIZE / 2, -IMG_SIZE / 2, IMG_SIZE, IMG_SIZE,
          srcX, srcY, srcW, srcW);
  }
  pop();

  // Label preserved indicator for augmented
  fill('#27AE60');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Label: "7"  ✓ preserved', rightX + panelW / 2, imgY + IMG_SIZE + 8);

  // Augmentation parameter display
  let p = AUG_PARAMS[aug];
  let displayVal = nf(val, 1, aug === 'Rotate' ? 0 : 2);
  fill('#333');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(12);
  text('Applied: ' + aug + '  |  ' + p.label + ': ' + displayVal + ' ' + p.unit, canvasWidth / 2, imgY + IMG_SIZE + 26);

  // Control labels
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Type:', 10, drawHeight + 17);
  text(p.label + ': ' + displayVal + p.unit, 10, drawHeight + 53);
}

function windowResized() {
  updateCanvasSize();
  resizeCanvas(canvasWidth, canvasHeight);
  intensitySlider.size(canvasWidth - sliderLeftMargin - margin);
}

function updateCanvasSize() {
  const container = document.querySelector('main');
  if (container) {
    canvasWidth = container.offsetWidth;
  }
}
