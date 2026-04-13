// Matplotlib Plot Gallery MicroSim
// 2x3 grid of mini-plots; hover for tooltip, click to expand detail panel
// Bloom: Remember (L1) / identify
//
// Layout:
//   drawHeight = 440
//   controlHeight = 50
//   canvasHeight = 490

let canvasWidth = 700;
let drawHeight = 440;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 16;
let defaultTextSize = 16;

let hoveredPanel = -1;
let selectedPanel = -1;

const PLOTS = [
  {
    name: 'Line Plot',
    fn: 'plt.plot()',
    when: 'Training loss over epochs; time-series trends',
    color: '#4A90D9',
    draw: drawLinePlot
  },
  {
    name: 'Scatter Plot',
    fn: 'plt.scatter()',
    when: 'Feature correlations; predictions vs actual values',
    color: '#27AE60',
    draw: drawScatterPlot
  },
  {
    name: 'Histogram',
    fn: 'plt.hist()',
    when: 'Feature distributions; checking for skew or outliers',
    color: '#E67E22',
    draw: drawHistogram
  },
  {
    name: 'Bar Chart',
    fn: 'plt.bar()',
    when: 'Comparing model accuracy across algorithms',
    color: '#8E44AD',
    draw: drawBarChart
  },
  {
    name: 'Heatmap',
    fn: 'plt.imshow()',
    when: 'Confusion matrices; feature correlation matrices',
    color: '#E74C3C',
    draw: drawHeatmap
  },
  {
    name: 'Subplots',
    fn: 'plt.subplots()',
    when: 'Multi-view analysis; comparing multiple features at once',
    color: '#16A085',
    draw: drawSubplots
  }
];

// Panel rectangles computed each draw
let panels = [];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  describe('Matplotlib plot gallery with 6 plot types. Hover to see when to use each; click for details.', LABEL);
}

function draw() {
  updateCanvasSize();
  panels = [];

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
  text('Matplotlib Plot Gallery', canvasWidth / 2, 8);

  // Subtitle
  fill('#555');
  textSize(13);
  text('Hover a panel to see when to use it  •  Click for code', canvasWidth / 2, 34);

  // Grid layout
  let cols = 3, rows = 2;
  let padX = margin, padY = 52;
  let gapX = 10, gapY = 10;
  let cellW = (canvasWidth - padX * 2 - gapX * (cols - 1)) / cols;
  let cellH = (drawHeight - padY - margin - gapY * (rows - 1)) / rows;

  for (let r = 0; r < rows; r++) {
    for (let c = 0; c < cols; c++) {
      let i = r * cols + c;
      let px = padX + c * (cellW + gapX);
      let py = padY + r * (cellH + gapY);
      panels.push({ i, x: px, y: py, w: cellW, h: cellH });
      drawPanel(i, px, py, cellW, cellH);
    }
  }

  // Control hint
  fill('#666');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Click any panel to see the Matplotlib function and use cases', canvasWidth / 2, drawHeight + 25);
}

function drawPanel(i, px, py, pw, ph) {
  let p = PLOTS[i];
  let isHov = hoveredPanel === i;
  let isSel = selectedPanel === i;

  // Panel background
  fill(isHov || isSel ? lerpColor(color('white'), color(p.color), 0.08) : 'white');
  stroke(isHov || isSel ? p.color : '#CCC');
  strokeWeight(isHov || isSel ? 2.5 : 1);
  rect(px, py, pw, ph, 8);

  // Mini chart area (top portion)
  let chartH = ph * 0.6;
  let chartPad = 10;

  // Clip to panel
  push();
  // Draw the mini chart
  PLOTS[i].draw(px + chartPad, py + chartPad, pw - chartPad * 2, chartH - chartPad, p.color);
  pop();

  // Label at bottom
  fill(p.color);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(13);
  text(p.name, px + pw / 2, py + chartH + 4);

  fill('#666');
  textSize(11);
  text(p.fn, px + pw / 2, py + chartH + 20);

  // Detail expansion on selected
  if (isSel) {
    fill(255, 255, 255, 230);
    stroke(p.color);
    strokeWeight(1.5);
    rect(px + 4, py + chartH + 34, pw - 8, ph - chartH - 40, 6);
    fill(50);
    noStroke();
    textAlign(CENTER, TOP);
    textSize(11);
    text(p.when, px + 8, py + chartH + 40, pw - 16, ph - chartH - 48);
  }
}

// ---- Mini chart draw functions ----

function drawLinePlot(x, y, w, h, col) {
  // Decreasing loss curve
  let pts = [0.9, 0.72, 0.55, 0.40, 0.30, 0.23, 0.18, 0.15, 0.13, 0.12];
  stroke(col); strokeWeight(2); noFill();
  beginShape();
  for (let i = 0; i < pts.length; i++) {
    vertex(x + (i / (pts.length - 1)) * w, y + pts[i] * h);
  }
  endShape();
  // axes
  stroke(180); strokeWeight(1);
  line(x, y, x, y + h);
  line(x, y + h, x + w, y + h);
}

function drawScatterPlot(x, y, w, h, col) {
  // Scattered points with slight upward trend
  let pts = [[0.1,0.8],[0.2,0.6],[0.3,0.55],[0.4,0.4],[0.5,0.35],
             [0.6,0.3],[0.7,0.22],[0.8,0.18],[0.9,0.12],[0.5,0.5]];
  fill(col); noStroke();
  for (let p of pts) circle(x + p[0]*w, y + p[1]*h, 6);
  // trend line
  stroke(col); strokeWeight(1.5); noFill();
  line(x + 0.05*w, y + 0.85*h, x + 0.95*w, y + 0.08*h);
  // axes
  stroke(180); strokeWeight(1);
  line(x, y, x, y + h); line(x, y + h, x + w, y + h);
}

function drawHistogram(x, y, w, h, col) {
  let heights = [0.15, 0.35, 0.6, 0.85, 0.95, 0.88, 0.7, 0.45, 0.22, 0.1];
  let bw = w / heights.length;
  fill(col); stroke('white'); strokeWeight(1);
  for (let i = 0; i < heights.length; i++) {
    let bh = heights[i] * h;
    rect(x + i * bw, y + h - bh, bw - 2, bh, 2);
  }
  stroke(180); strokeWeight(1); noFill();
  line(x, y + h, x + w, y + h);
}

function drawBarChart(x, y, w, h, col) {
  let bars = [0.72, 0.85, 0.91];
  let labels = ['LinReg', 'KNN', 'RF'];
  let bw = w / (bars.length * 1.6);
  let gap = (w - bw * bars.length) / (bars.length + 1);
  let colors = ['#4A90D9','#27AE60','#E67E22'];
  for (let i = 0; i < bars.length; i++) {
    let bh = bars[i] * (h - 16);
    let bx = x + gap + i * (bw + gap);
    fill(colors[i]); noStroke();
    rect(bx, y + (h - 16) - bh, bw, bh, 3);
    fill(80); textSize(9); textAlign(CENTER, TOP);
    text(labels[i], bx + bw/2, y + h - 14);
  }
  stroke(180); strokeWeight(1); noFill();
  line(x, y, x, y + h - 14); line(x, y + h - 14, x + w, y + h - 14);
}

function drawHeatmap(x, y, w, h, col) {
  let grid = [[0.95, 0.02, 0.03],[0.05, 0.88, 0.07],[0.02, 0.08, 0.90]];
  let cs = min(w, h) / 3;
  let ox = x + (w - cs * 3) / 2;
  let oy = y + (h - cs * 3) / 2;
  for (let r = 0; r < 3; r++) for (let c = 0; c < 3; c++) {
    let v = grid[r][c];
    let intensity = Math.floor(v * 220);
    fill(r === c ? col : `rgb(${255-intensity},${255-intensity/2},${255-intensity/2})`);
    stroke('white'); strokeWeight(1);
    rect(ox + c*cs, oy + r*cs, cs-1, cs-1, 2);
    fill(v > 0.5 ? 'white' : '#333'); noStroke();
    textAlign(CENTER, CENTER); textSize(10);
    text(nf(v, 1, 2), ox + c*cs + cs/2, oy + r*cs + cs/2);
  }
}

function drawSubplots(x, y, w, h, col) {
  let hw = w/2 - 3, hh = h/2 - 3;
  // Top-left: line
  stroke(col); strokeWeight(1.5); noFill();
  beginShape();
  for (let i=0;i<6;i++) vertex(x + i/5*hw, y + (1-i/5*0.7)*hh);
  endShape();
  // Top-right: scatter
  fill(col); noStroke();
  let spts = [[0.2,0.7],[0.5,0.4],[0.8,0.2],[0.3,0.5],[0.7,0.3]];
  for (let p of spts) circle(x+hw+4+p[0]*hw, y+p[1]*hh, 5);
  // Bottom-left: histogram bars
  let bhs2 = [0.3,0.6,0.9,0.7,0.4];
  let bw2 = hw/5;
  fill(col); noStroke();
  for (let i=0;i<5;i++) rect(x+i*bw2, y+hh+4+(1-bhs2[i])*hh, bw2-1, bhs2[i]*hh);
  // Bottom-right: heatmap 2x2
  let cs2 = hh/2;
  let vals = [[0.9,0.1],[0.2,0.8]];
  for (let r=0;r<2;r++) for (let c=0;c<2;c++) {
    fill(vals[r][c]>0.5 ? col : lerpColor(color(col),color('white'),0.7));
    stroke('white'); strokeWeight(1);
    rect(x+hw+4+c*cs2, y+hh+4+r*cs2, cs2-1, cs2-1);
  }
  // grid dividers
  stroke(200); strokeWeight(1); noFill();
  line(x+hw+2, y, x+hw+2, y+h); line(x, y+hh+2, x+w, y+hh+2);
}

function mouseMoved() {
  hoveredPanel = -1;
  for (let p of panels) {
    if (mouseX >= p.x && mouseX <= p.x + p.w &&
        mouseY >= p.y && mouseY <= p.y + p.h) {
      hoveredPanel = p.i;
      break;
    }
  }
}

function mousePressed() {
  let hit = -1;
  for (let p of panels) {
    if (mouseX >= p.x && mouseX <= p.x + p.w &&
        mouseY >= p.y && mouseY <= p.y + p.h) {
      hit = p.i;
      break;
    }
  }
  selectedPanel = (selectedPanel === hit) ? -1 : hit;
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
