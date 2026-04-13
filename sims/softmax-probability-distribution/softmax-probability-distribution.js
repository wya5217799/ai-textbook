// Softmax Probability Distribution MicroSim
// Bloom Level: Apply (L3)
// Three input logits (sliders) → softmax → real-time bar chart

let sliders = [];
let canvasWidth, canvasHeight;
const CLASSES = ["Cat", "Dog", "Bird"];
const COLORS  = [
  [52, 120, 210],
  [220, 80, 50],
  [50, 170, 80],
];

function setup() {
  canvasWidth  = min(windowWidth, 820);
  canvasHeight = 500;
  let cnv = createCanvas(canvasWidth, canvasHeight);
  cnv.parent('main');

  // Create 3 logit sliders
  let initVals = [2.0, 1.0, 0.5];
  for (let i = 0; i < 3; i++) {
    let d = createDiv('');
    d.parent('main');
    d.style('margin', '5px 10px');
    d.style('display', 'inline-block');
    d.style('min-width', '220px');

    let c = COLORS[i];
    createSpan(`z${i+1} (${CLASSES[i]}):  `).parent(d)
      .style('font-size','13px')
      .style('color', `rgb(${c[0]},${c[1]},${c[2]})`);

    let sl = createSlider(-5, 5, initVals[i], 0.1);
    sl.parent(d);
    sl.style('width', '160px');
    sl.style('accent-color', `rgb(${c[0]},${c[1]},${c[2]})`);
    sl.input(() => redraw());
    sliders.push(sl);
  }

  noLoop();
}

function windowResized() {
  canvasWidth = min(windowWidth, 820);
  resizeCanvas(canvasWidth, canvasHeight);
  redraw();
}

function softmax(logits) {
  let maxL  = Math.max(...logits);
  let exps  = logits.map(z => Math.exp(z - maxL)); // numerically stable
  let sumE  = exps.reduce((a, b) => a + b, 0);
  return exps.map(e => e / sumE);
}

function draw() {
  background(248);

  let logits = sliders.map(s => parseFloat(s.value()));
  let probs  = softmax(logits);

  // Title
  fill(30);
  noStroke();
  textSize(18);
  textAlign(CENTER, TOP);
  text("Softmax Probability Distribution", canvasWidth / 2, 14);
  fill(90);
  textSize(12);
  text("Adjust logit sliders to see probabilities update in real time", canvasWidth / 2, 38);

  // Layout
  let panelY  = 65;
  let panelH  = canvasHeight - panelY - 20;
  let leftW   = canvasWidth * 0.38;
  let rightW  = canvasWidth - leftW - 20;

  drawInputPanel(logits, probs, 10, panelY, leftW, panelH);
  drawOutputPanel(probs, logits, leftW + 20, panelY, rightW - 10, panelH);
}

function drawInputPanel(logits, probs, x, y, w, h) {
  // Panel background
  fill(240, 245, 255);
  stroke(200, 215, 240);
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();

  fill(60, 90, 170);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text("Input Logits  z", x + 12, y + 12);

  let rowH = 64;
  for (let i = 0; i < 3; i++) {
    let ry = y + 40 + i * rowH;
    let c  = COLORS[i];

    // Class label
    fill(...c);
    textSize(14);
    textAlign(LEFT, CENTER);
    noStroke();
    text(`z${i+1}  (${CLASSES[i]})`, x + 14, ry + 12);

    // Logit bar background
    let barX = x + 14;
    let barY = ry + 28;
    let barW = w - 28;
    let barH = 20;
    let zeroX = barX + barW / 2;

    fill(220, 225, 235);
    rect(barX, barY, barW, barH, 4);

    // Logit bar fill (centered at 0)
    let logit = logits[i];
    let fraction = (logit + 5) / 10; // map [-5,5] to [0,1]
    let fillW = abs(logit / 10) * barW;
    if (logit >= 0) {
      fill(...c, 200);
      rect(zeroX, barY, fillW, barH, 0, 4, 4, 0);
    } else {
      fill(...c, 200);
      rect(zeroX - fillW, barY, fillW, barH, 4, 0, 0, 4);
    }

    // Zero line
    stroke(140);
    strokeWeight(1);
    line(zeroX, barY - 2, zeroX, barY + barH + 2);
    noStroke();

    // Value label
    fill(30);
    textSize(13);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(logit.toFixed(1), x + w - 14, barY + barH / 2);
  }

  // Formula
  fill(80);
  textSize(11);
  textAlign(LEFT, TOP);
  noStroke();
  text("σ(z)ᵢ = exp(zᵢ) / Σ exp(zⱼ)", x + 14, y + 40 + 3 * rowH + 10);

  // Exp values
  let exps = logits.map(z => Math.exp(z));
  let sumE = exps.reduce((a, b) => a + b, 0);
  fill(100);
  textSize(10);
  for (let i = 0; i < 3; i++) {
    text(`exp(z${i+1}) = exp(${logits[i].toFixed(1)}) = ${exps[i].toFixed(2)}`, x + 14, y + 40 + 3 * rowH + 28 + i * 16);
  }
  fill(60, 90, 170);
  textSize(10);
  text(`Sum = ${sumE.toFixed(3)}`, x + 14, y + 40 + 3 * rowH + 28 + 3 * 16 + 4);
}

function drawOutputPanel(probs, logits, x, y, w, h) {
  // Panel background
  fill(245, 252, 245);
  stroke(190, 220, 195);
  strokeWeight(1);
  rect(x, y, w, h, 8);
  noStroke();

  fill(40, 140, 60);
  textSize(13);
  textAlign(LEFT, TOP);
  noStroke();
  text("Output Probabilities  (sum = 1.000)", x + 12, y + 12);

  // Bar chart area
  let chartX = x + 20;
  let chartY = y + 40;
  let chartW = w - 40;
  let chartH = h - 120;
  let barGap = 24;
  let barW   = (chartH - barGap * 2) / 3;
  let maxBarH = chartW - 60;

  for (let i = 0; i < 3; i++) {
    let by   = chartY + i * (barW + barGap);
    let p    = probs[i];
    let bLen = p * maxBarH;
    let c    = COLORS[i];
    let isMax = probs.indexOf(Math.max(...probs)) === i;

    // Background bar
    fill(220, 230, 220);
    rect(chartX + 50, by, maxBarH, barW, 4);

    // Filled bar
    fill(...c, isMax ? 255 : 180);
    rect(chartX + 50, by, bLen, barW, 4);

    // Class label
    fill(...c);
    textSize(14);
    textAlign(RIGHT, CENTER);
    noStroke();
    text(CLASSES[i], chartX + 46, by + barW / 2);

    // Probability value
    fill(isMax ? color(...c) : color(60));
    textSize(isMax ? 15 : 13);
    textAlign(LEFT, CENTER);
    noStroke();
    text(`${(p * 100).toFixed(1)}%`, chartX + 50 + bLen + 6, by + barW / 2);

    // "PREDICTED" badge for argmax
    if (isMax) {
      fill(...c, 40);
      stroke(...c, 120);
      strokeWeight(1);
      rect(chartX + 50 + maxBarH + 2, by, 80, barW, 4);
      noStroke();
      fill(...c);
      textSize(10);
      textAlign(CENTER, CENTER);
      text("PREDICTED", chartX + 50 + maxBarH + 42, by + barW / 2);
    }
  }

  // Sum check
  let pSum = probs.reduce((a, b) => a + b, 0);
  fill(40, 140, 60);
  textSize(12);
  textAlign(LEFT, TOP);
  noStroke();
  let infoY = y + h - 72;
  text(`Sum of probabilities: ${pSum.toFixed(6)} ≈ 1.000  ✓`, x + 12, infoY);
  fill(80);
  textSize(11);
  text(`Predicted class: "${CLASSES[probs.indexOf(Math.max(...probs))]}"  (argmax)`, x + 12, infoY + 18);
  text(`Logit difference z1−z2: ${(logits[0] - logits[1]).toFixed(2)}  |  Temperature: 1.0 (fixed)`, x + 12, infoY + 36);
  fill(100);
  textSize(10);
  text("Softmax is shift-invariant: adding a constant to all logits doesn't change output.", x + 12, infoY + 54);
}
