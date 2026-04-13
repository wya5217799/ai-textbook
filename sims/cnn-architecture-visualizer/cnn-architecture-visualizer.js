// CNN Architecture Visualizer MicroSim
// Horizontal layer stack: Input → Conv → ReLU → MaxPool → Flatten → FC → Output
// Click each layer block to see description and dimensions

let canvasWidth = 700;
let canvasHeight = 460;

let layers = [];
let selectedLayer = -1;

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  buildLayers();
  windowResized();
}

function buildLayers() {
  layers = [
    {
      name: 'Input\nImage',
      shortName: 'Input',
      dims: '32×32×3',
      color: [100, 160, 255],
      desc: 'Input Image (32×32×3)\nThe raw input: a 32×32 pixel color image with 3 channels (R, G, B). Each pixel value is typically normalized to [0, 1]. The spatial dimensions are height × width × channels.',
      blockH: 140,
      blockW: 55
    },
    {
      name: 'Conv\nLayer',
      shortName: 'Conv',
      dims: '30×30×16',
      color: [80, 200, 120],
      desc: 'Convolutional Layer (30×30×16)\nApplies 16 learned 3×3 filters over the input. Each filter slides across the image computing a dot product, detecting local features like edges, textures. Output size: (32-3+1) = 30 per spatial dim.',
      blockH: 120,
      blockW: 52
    },
    {
      name: 'ReLU',
      shortName: 'ReLU',
      dims: '30×30×16',
      color: [255, 200, 60],
      desc: 'ReLU Activation (30×30×16)\nRectified Linear Unit: f(x) = max(0, x). Applied element-wise. Introduces non-linearity by zeroing negative values. Dimensions unchanged. Computationally cheap and avoids vanishing gradient.',
      blockH: 100,
      blockW: 44
    },
    {
      name: 'Max\nPool',
      shortName: 'MaxPool',
      dims: '15×15×16',
      color: [255, 140, 80],
      desc: 'Max Pooling Layer (15×15×16)\n2×2 max pooling with stride 2. Takes the maximum value in each 2×2 region. Halves spatial dimensions (30→15), reducing computation and providing translation invariance. Channels unchanged.',
      blockH: 80,
      blockW: 40
    },
    {
      name: 'Flatten',
      shortName: 'Flatten',
      dims: '3600',
      color: [200, 120, 220],
      desc: 'Flatten Layer (3600)\nReshapes the 15×15×16 = 3,600 feature map values into a 1D vector. This bridges the spatial convolutional layers and the fully-connected layers. No learned parameters.',
      blockH: 60,
      blockW: 34
    },
    {
      name: 'Fully\nConnected',
      shortName: 'FC',
      dims: '128',
      color: [220, 80, 130],
      desc: 'Fully Connected Layer (128 units)\nEvery input (3600) connects to every output (128). Learns global combinations of features. Parameters: 3600×128 + 128 bias = 460,928. Typically followed by ReLU.',
      blockH: 90,
      blockW: 40
    },
    {
      name: 'Output\n(Softmax)',
      shortName: 'Output',
      dims: '10',
      color: [230, 60, 60],
      desc: 'Output Layer — Softmax (10 classes)\nFully connected to 128 inputs. Softmax converts raw scores to probabilities that sum to 1.0. Each of 10 outputs is the predicted probability for one class (e.g., cat, dog, car…).',
      blockH: 70,
      blockW: 36
    }
  ];
}

function windowResized() {
  canvasWidth = min(windowWidth, 900);
  canvasHeight = 460;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getLayerX(i) {
  let numLayers = layers.length;
  let margin = 60;
  let available = canvasWidth - margin * 2;
  return margin + (i / (numLayers - 1)) * available;
}

function getCenterY() {
  return 200;
}

function mousePressed() {
  let cy = getCenterY();
  for (let i = 0; i < layers.length; i++) {
    let lx = getLayerX(i);
    let lw = layers[i].blockW;
    let lh = layers[i].blockH;
    if (mouseX >= lx - lw / 2 && mouseX <= lx + lw / 2 &&
      mouseY >= cy - lh / 2 && mouseY <= cy + lh / 2) {
      selectedLayer = (selectedLayer === i) ? -1 : i;
      return;
    }
  }
  selectedLayer = -1;
}

function draw() {
  background(245, 247, 250);
  let cy = getCenterY();

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('CNN Architecture Visualizer', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('Click any layer block to learn more', canvasWidth / 2, 32);

  // Draw arrows between layers
  stroke(160, 170, 190);
  strokeWeight(2);
  fill(160, 170, 190);
  for (let i = 0; i < layers.length - 1; i++) {
    let x1 = getLayerX(i) + layers[i].blockW / 2;
    let x2 = getLayerX(i + 1) - layers[i + 1].blockW / 2;
    let arrowY = cy;
    line(x1, arrowY, x2 - 8, arrowY);
    // Arrowhead
    triangle(x2, arrowY, x2 - 10, arrowY - 5, x2 - 10, arrowY + 5);
  }

  // Draw layer blocks
  for (let i = 0; i < layers.length; i++) {
    let layer = layers[i];
    let lx = getLayerX(i);
    let lw = layer.blockW;
    let lh = layer.blockH;
    let isSelected = (i === selectedLayer);
    let col = color(...layer.color);

    // Shadow
    noStroke();
    fill(0, 0, 0, 20);
    rect(lx - lw / 2 + 3, cy - lh / 2 + 3, lw, lh, 6);

    // Block
    if (isSelected) {
      stroke(30, 30, 30);
      strokeWeight(3);
    } else {
      stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
      strokeWeight(1.5);
    }

    // Gradient fill
    let c1 = color(red(col) + 40, green(col) + 40, blue(col) + 40);
    let c2 = color(red(col) * 0.8, green(col) * 0.8, blue(col) * 0.8);
    fill(isSelected ? color(red(col) + 50, green(col) + 50, blue(col) + 50) : col);
    rect(lx - lw / 2, cy - lh / 2, lw, lh, 6);

    // Layer name inside block
    noStroke();
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(10);
    textStyle(BOLD);
    text(layer.name, lx, cy);
    textStyle(NORMAL);

    // Dimension label below
    fill(isSelected ? color(...layer.color) : color(80, 90, 110));
    textSize(9.5);
    textAlign(CENTER, TOP);
    text(layer.dims, lx, cy + lh / 2 + 5);

    // Selection highlight ring
    if (isSelected) {
      noFill();
      stroke(255, 220, 50);
      strokeWeight(3);
      rect(lx - lw / 2 - 3, cy - lh / 2 - 3, lw + 6, lh + 6, 8);
    }
  }

  // Description panel
  let panelY = 300;
  let panelH = 140;
  fill(255, 255, 255, 240);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, panelY, canvasWidth - 32, panelH, 8);

  noStroke();
  if (selectedLayer >= 0) {
    let layer = layers[selectedLayer];
    let col = color(...layer.color);

    // Colored left bar
    fill(col);
    rect(16, panelY, 5, panelH, 8, 0, 0, 8);

    fill(40, 50, 70);
    textAlign(LEFT, TOP);
    textSize(12);
    textStyle(BOLD);
    text(layer.shortName + ' Layer', 30, panelY + 10);
    textStyle(NORMAL);
    textSize(11);
    fill(60, 70, 90);
    text(layer.desc, 30, panelY + 32, canvasWidth - 60, 100);
  } else {
    fill(130, 140, 160);
    textAlign(CENTER, CENTER);
    textSize(13);
    text('Click a layer block above to see its description and dimensions.', canvasWidth / 2, panelY + panelH / 2);
  }

  // Axis labels
  fill(140, 150, 170);
  noStroke();
  textSize(9.5);
  textAlign(CENTER, BOTTOM);
  text('← Input Space                                              Feature Space →', canvasWidth / 2, panelY - 8);
}
