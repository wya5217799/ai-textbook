// DBSCAN Point Classification MicroSim
// Shows DBSCAN labeling points as Core / Border / Noise with epsilon slider
// Library: p5.js

let canvasWidth = 600;
let drawHeight = 440;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;

let epsilonSlider, minPtsSlider;
let resetBtn;

let points = [];
let NUM_POINTS = 80;
let labels = []; // 'core', 'border', 'noise'
let clusters = [];

// Color palette (named colors)
const CORE_COLOR   = 'royalblue';
const BORDER_COLOR = 'orange';
const NOISE_COLOR  = 'lightgray';
const EPS_STROKE   = 'rgba(100,149,237,0.15)';

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  // Epsilon slider: radius neighborhood
  epsilonSlider = createSlider(10, 100, 45, 1);
  epsilonSlider.parent(document.querySelector('main'));
  epsilonSlider.style('width', '140px');

  // MinPts slider
  minPtsSlider = createSlider(1, 10, 3, 1);
  minPtsSlider.parent(document.querySelector('main'));
  minPtsSlider.style('width', '100px');

  // Reset button
  resetBtn = createButton('重置 Reset');
  resetBtn.parent(document.querySelector('main'));
  resetBtn.mousePressed(generatePoints);

  generatePoints();
  describe('DBSCAN clustering visualization: points labeled as core, border, or noise', LABEL);
}

function generatePoints() {
  points = [];
  // Generate clustered groups + noise
  let clusterCenters = [
    { x: 0.20, y: 0.30 },
    { x: 0.55, y: 0.25 },
    { x: 0.35, y: 0.65 },
    { x: 0.72, y: 0.65 }
  ];
  let perCluster = 16;
  for (let c of clusterCenters) {
    for (let i = 0; i < perCluster; i++) {
      points.push({
        x: c.x * (canvasWidth - 2 * margin) + margin + randomGaussian(0, 22),
        y: c.y * drawHeight + randomGaussian(0, 18)
      });
    }
  }
  // Scatter noise
  for (let i = 0; i < NUM_POINTS - clusterCenters.length * perCluster; i++) {
    points.push({
      x: random(margin, canvasWidth - margin),
      y: random(margin, drawHeight - margin)
    });
  }
  runDBSCAN();
}

function runDBSCAN() {
  let eps = epsilonSlider.value();
  let minPts = minPtsSlider.value();
  let n = points.length;
  let neighbors = [];

  // Find neighbors for each point
  for (let i = 0; i < n; i++) {
    neighbors[i] = [];
    for (let j = 0; j < n; j++) {
      if (i !== j) {
        let d = dist(points[i].x, points[i].y, points[j].x, points[j].y);
        if (d <= eps) neighbors[i].push(j);
      }
    }
  }

  // Classify: core if >=minPts neighbors
  labels = new Array(n).fill('noise');
  clusters = new Array(n).fill(-1);
  let clusterIdx = 0;

  for (let i = 0; i < n; i++) {
    if (neighbors[i].length >= minPts - 1) {
      labels[i] = 'core';
    }
  }

  // Assign border points
  for (let i = 0; i < n; i++) {
    if (labels[i] === 'noise') {
      for (let nb of neighbors[i]) {
        if (labels[nb] === 'core') {
          labels[i] = 'border';
          break;
        }
      }
    }
  }

  // Assign cluster IDs via BFS from core points
  let visited = new Array(n).fill(false);
  for (let i = 0; i < n; i++) {
    if (labels[i] === 'core' && !visited[i]) {
      let queue = [i];
      visited[i] = true;
      clusters[i] = clusterIdx;
      while (queue.length > 0) {
        let cur = queue.shift();
        for (let nb of neighbors[cur]) {
          if (!visited[nb] && (labels[nb] === 'core' || labels[nb] === 'border')) {
            visited[nb] = true;
            clusters[nb] = clusterIdx;
            if (labels[nb] === 'core') queue.push(nb);
          }
        }
      }
      clusterIdx++;
    }
  }
}

// Distinct hues for clusters
let clusterHues = [
  'royalblue', 'crimson', 'seagreen', 'darkorchid',
  'darkorange', 'deeppink', 'teal', 'saddlebrown'
];

function draw() {
  updateCanvasSize();

  // Drawing region
  fill('aliceblue');
  stroke('silver');
  rect(0, 0, canvasWidth, drawHeight);

  // Control region
  fill('white');
  noStroke();
  rect(0, drawHeight, canvasWidth, controlHeight);

  let eps = epsilonSlider.value();
  let minPts = minPtsSlider.value();
  runDBSCAN();

  // Draw epsilon circles for core points (subtle)
  noFill();
  for (let i = 0; i < points.length; i++) {
    if (labels[i] === 'core') {
      stroke(100, 149, 237, 30);
      strokeWeight(1);
      ellipse(points[i].x, points[i].y, eps * 2, eps * 2);
    }
  }

  // Draw points
  for (let i = 0; i < points.length; i++) {
    let clr;
    if (labels[i] === 'noise') {
      clr = NOISE_COLOR;
    } else if (labels[i] === 'border') {
      clr = BORDER_COLOR;
    } else {
      // core: color by cluster
      clr = clusterHues[clusters[i] % clusterHues.length] || CORE_COLOR;
    }
    fill(clr);
    stroke('dimgray');
    strokeWeight(labels[i] === 'core' ? 1.5 : 1);
    let r = labels[i] === 'core' ? 9 : (labels[i] === 'border' ? 7 : 6);
    ellipse(points[i].x, points[i].y, r * 2, r * 2);
  }

  // Count labels
  let coreCount = labels.filter(l => l === 'core').length;
  let borderCount = labels.filter(l => l === 'border').length;
  let noiseCount = labels.filter(l => l === 'noise').length;
  let numClusters = clusters.reduce((m, v) => Math.max(m, v), -1) + 1;

  // Title
  noStroke();
  fill('black');
  textSize(16);
  textAlign(LEFT);
  text('DBSCAN 点分类  Point Classification', margin, margin + 4);

  // Legend
  let lx = canvasWidth - 160, ly = margin;
  textSize(13);
  fill(CORE_COLOR);   noStroke(); ellipse(lx, ly + 8, 14, 14);
  fill('black'); noStroke(); text('Core 核心点', lx + 10, ly + 12);
  fill(BORDER_COLOR); ellipse(lx, ly + 28, 12, 12);
  fill('black'); text('Border 边界点', lx + 10, ly + 32);
  fill(NOISE_COLOR); stroke('dimgray'); strokeWeight(1); ellipse(lx, ly + 48, 12, 12);
  noStroke(); fill('black'); text('Noise 噪声点', lx + 10, ly + 52);

  // Stats bottom of draw area
  textSize(13);
  fill('dimgray');
  noStroke();
  textAlign(LEFT);
  text(`聚类数 Clusters: ${numClusters}  |  Core: ${coreCount}  Border: ${borderCount}  Noise: ${noiseCount}`,
    margin, drawHeight - 10);

  // Control labels
  textSize(14);
  fill('black');
  noStroke();
  textAlign(LEFT);
  text(`ε (Epsilon 邻域半径): ${eps}`, margin, drawHeight + 22);
  text(`MinPts 最小点数: ${minPts}`, margin, drawHeight + 55);

  // Position controls
  epsilonSlider.position(230, drawHeight + 8);
  minPtsSlider.position(230, drawHeight + 41);
  resetBtn.position(canvasWidth - 110, drawHeight + 25);
}

function updateCanvasSize() {
  let container = document.querySelector('main');
  if (container) {
    let w = container.offsetWidth;
    if (w > 0 && w !== canvasWidth) {
      canvasWidth = w;
      if (typeof resizeCanvas === 'function') resizeCanvas(canvasWidth, canvasHeight);
    }
  }
}

function windowResized() {
  updateCanvasSize();
}
