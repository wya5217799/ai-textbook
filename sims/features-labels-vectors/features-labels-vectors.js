// Features, Labels, and Vectors MicroSim
// Bloom Level: Understand (L2)
// Shows how a dataset row becomes a feature vector and label

let selectedRow = 0;
let canvasWidth, canvasHeight;
let tableX, tableY, tableW, tableH;
let vectorX, vectorY;

const dataset = [
  { features: [2.5, 130, 3], label: 0, name: "Alice" },
  { features: [3.8, 175, 7], label: 1, name: "Bob" },
  { features: [1.2, 95,  1], label: 0, name: "Carol" },
  { features: [4.5, 210, 9], label: 1, name: "Dave" },
];

const featureNames = ["Study Hrs", "Vocab Size", "Practice", "Pass?"];
const labelNames  = ["Fail", "Pass"];
const colors = {
  header:   [60, 90, 170],
  rowEven:  [240, 245, 255],
  rowOdd:   [255, 255, 255],
  selected: [255, 220, 80],
  label0:   [220, 80, 80],
  label1:   [60, 170, 90],
  vector:   [40, 130, 220],
  arrow:    [80, 80, 80],
  text:     [30, 30, 30],
};

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 480;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');
  textFont('monospace');
  noLoop();
}

function windowResized() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 480;
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function draw() {
  background(250);

  // ---- Title ----
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Features, Labels & Vectors", canvasWidth / 2, 14);

  textSize(12);
  fill(100);
  text("Click a row to select it and see the feature vector", canvasWidth / 2, 40);

  // ---- Layout calculations ----
  tableX = 30;
  tableY = 65;
  tableW = canvasWidth * 0.50;
  tableH = 240;

  vectorX = tableX + tableW + 40;
  vectorY = tableY;

  drawTable();
  drawVector();
  drawInstruction();
}

function drawTable() {
  let colWidths = [tableW * 0.22, tableW * 0.22, tableW * 0.22, tableW * 0.22, tableW * 0.12];
  let rowHeight = 40;

  // Header row
  fill(...colors.header);
  rect(tableX, tableY, tableW, rowHeight, 4, 4, 0, 0);
  fill(255);
  textSize(12);
  textAlign(CENTER, CENTER);
  let headers = ["Sample", ...featureNames];
  let cx = tableX;
  for (let i = 0; i < headers.length; i++) {
    text(headers[i], cx + colWidths[i] / 2, tableY + rowHeight / 2);
    cx += colWidths[i];
  }

  // Data rows
  for (let r = 0; r < dataset.length; r++) {
    let ry = tableY + (r + 1) * rowHeight;
    let isSelected = (r === selectedRow);

    // Row background
    if (isSelected) {
      fill(...colors.selected);
    } else {
      fill(r % 2 === 0 ? 240 : 255, r % 2 === 0 ? 245 : 255, 255);
    }
    stroke(200);
    strokeWeight(1);
    rect(tableX, ry, tableW, rowHeight);
    noStroke();

    // Row content
    fill(isSelected ? color(60, 30, 0) : color(...colors.text));
    textSize(12);
    textAlign(CENTER, CENTER);
    let rx = tableX;

    // Sample name
    text(dataset[r].name, rx + colWidths[0] / 2, ry + rowHeight / 2);
    rx += colWidths[0];

    // Features
    for (let f = 0; f < 3; f++) {
      text(dataset[r].features[f].toFixed(1), rx + colWidths[f + 1] / 2, ry + rowHeight / 2);
      rx += colWidths[f + 1];
    }

    // Label
    let lbl = dataset[r].label;
    fill(lbl === 1 ? color(...colors.label1) : color(...colors.label0));
    text(labelNames[lbl], rx + colWidths[4] / 2, ry + rowHeight / 2);
  }

  // Column dividers
  stroke(190);
  strokeWeight(1);
  let dx = tableX;
  for (let i = 0; i < colWidths.length - 1; i++) {
    dx += colWidths[i];
    line(dx, tableY, dx, tableY + (dataset.length + 1) * rowHeight);
  }
  noStroke();

  // Outer border
  stroke(150);
  strokeWeight(2);
  noFill();
  rect(tableX, tableY, tableW, (dataset.length + 1) * rowHeight, 4);
  noStroke();
}

function drawVector() {
  let row = dataset[selectedRow];
  let panelW = canvasWidth - vectorX - 20;
  let panelH = 280;

  // Panel background
  fill(245, 250, 255);
  stroke(180, 200, 230);
  strokeWeight(1.5);
  rect(vectorX, vectorY, panelW, panelH, 8);
  noStroke();

  // Panel title
  fill(...colors.header);
  textSize(13);
  textAlign(LEFT, TOP);
  text("Selected: " + row.name, vectorX + 12, vectorY + 12);

  // Feature vector notation
  let vy = vectorY + 50;
  textSize(12);
  fill(60);
  textAlign(LEFT, TOP);
  text("Feature Vector  x :", vectorX + 12, vy);

  // Draw vector bracket
  let bx = vectorX + 14;
  let by = vy + 26;
  let bh = row.features.length * 38 + 10;
  let bw = 130;

  stroke(80);
  strokeWeight(2.5);
  // left bracket
  line(bx + 8, by, bx, by);
  line(bx, by, bx, by + bh);
  line(bx, by + bh, bx + 8, by + bh);
  // right bracket
  line(bx + bw - 8, by, bx + bw, by);
  line(bx + bw, by, bx + bw, by + bh);
  line(bx + bw, by + bh, bx + bw - 8, by + bh);
  noStroke();

  for (let f = 0; f < row.features.length; f++) {
    let fy = by + 14 + f * 38;
    // feature name
    fill(100);
    textSize(10);
    textAlign(LEFT, CENTER);
    text(featureNames[f] + ":", bx + 14, fy);
    // feature value
    fill(...colors.vector);
    textSize(16);
    textAlign(RIGHT, CENTER);
    text(row.features[f].toFixed(1), bx + bw - 10, fy);
  }

  // Arrow
  let arrowX = bx + bw + 18;
  let arrowY = by + bh / 2;
  stroke(...colors.arrow);
  strokeWeight(2);
  line(arrowX, arrowY, arrowX + 30, arrowY);
  fill(...colors.arrow);
  noStroke();
  triangle(arrowX + 30, arrowY - 6, arrowX + 30, arrowY + 6, arrowX + 44, arrowY);

  // Label box
  let lblX = arrowX + 50;
  let lblColor = row.label === 1 ? colors.label1 : colors.label0;
  fill(...lblColor);
  stroke(150);
  strokeWeight(1);
  rect(lblX, arrowY - 22, 58, 44, 6);
  noStroke();
  fill(255);
  textSize(11);
  textAlign(CENTER, CENTER);
  text("y =", lblX + 29, arrowY - 8);
  textSize(15);
  text(row.label, lblX + 29, arrowY + 10);

  // Label interpretation
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  text('Label: "' + labelNames[row.label] + '"', vectorX + 12, vy + bh + 46);

  // Equation
  fill(60);
  textSize(11);
  text("x = [" + row.features.join(", ") + "]   →   y = " + row.label,
       vectorX + 12, vy + bh + 68);
}

function drawInstruction() {
  fill(120);
  textSize(11);
  textAlign(LEFT, BOTTOM);
  noStroke();
  text("Click any row in the table to explore its feature vector and label.",
       tableX, canvasHeight - 10);
}

function mousePressed() {
  // Detect row clicks in table body
  let rowHeight = 40;
  let tableBottom = tableY + (dataset.length + 1) * rowHeight;
  if (mouseX >= tableX && mouseX <= tableX + tableW &&
      mouseY >= tableY + rowHeight && mouseY <= tableBottom) {
    let r = floor((mouseY - tableY - rowHeight) / rowHeight);
    if (r >= 0 && r < dataset.length) {
      selectedRow = r;
      redraw();
    }
  }
}
