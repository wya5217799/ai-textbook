// AI Landscape Overview MicroSim
// Shows a radial concept map: AI at center, 6 subfields as nodes around it
// Hover to see definitions; click to highlight connections; ML expands to sub-branches
// Layout: drawHeight=480, controlHeight=50, canvasHeight=530

let canvasWidth = 700;
let drawHeight = 480;
let controlHeight = 50;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

// Node data
const CENTER = { label: 'Artificial\nIntelligence', color: '#4A90D9', x: 0, y: 0 };

const SUBFIELDS = [
  {
    id: 'ml',
    label: 'Machine\nLearning',
    color: '#27AE60',
    tooltip: 'Algorithms that learn from data without being explicitly programmed.',
    example: 'Email spam detection, recommendation systems',
    angle: -90,
    subs: [
      { label: 'Supervised', color: '#82E0AA' },
      { label: 'Unsupervised', color: '#82E0AA' },
      { label: 'Reinforcement', color: '#82E0AA' }
    ]
  },
  {
    id: 'cv',
    label: 'Computer\nVision',
    color: '#E67E22',
    tooltip: 'Enabling machines to interpret and understand visual information.',
    example: 'Face recognition, medical image analysis',
    angle: -30
  },
  {
    id: 'nlp',
    label: 'Natural\nLanguage\nProcessing',
    color: '#8E44AD',
    tooltip: 'Processing and understanding human language by machines.',
    example: 'Machine translation, chatbots, sentiment analysis',
    angle: 30
  },
  {
    id: 'robotics',
    label: 'Robotics',
    color: '#7F8C8D',
    tooltip: 'Designing systems that sense, plan, and act in the physical world.',
    example: 'Industrial automation, autonomous vehicles',
    angle: 90
  },
  {
    id: 'expert',
    label: 'Expert\nSystems',
    color: '#95A5A6',
    tooltip: 'Rule-based systems encoding human expert knowledge.',
    example: 'MYCIN medical diagnosis, XCON configuration',
    angle: 150
  },
  {
    id: 'bi',
    label: 'Business\nIntelligence',
    color: '#16A085',
    tooltip: 'Using data analytics and AI to support organizational decision-making.',
    example: 'Predictive maintenance, demand forecasting',
    angle: 210
  }
];

let hoveredNode = null;
let selectedNode = null;
let mlExpanded = false;

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));
  textFont('Arial');
  describe('Interactive radial concept map of AI subfields. Hover nodes for definitions, click ML to expand sub-branches.', LABEL);
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
  text('AI Landscape Overview', canvasWidth / 2, 10);

  // Center of radial layout
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let outerR = min(canvasWidth, drawHeight) * 0.33;

  // Draw edges first
  for (let sf of SUBFIELDS) {
    let angle = radians(sf.angle);
    let nx = cx + outerR * cos(angle);
    let ny = cy + outerR * sin(angle);

    let isHighlighted = !selectedNode || selectedNode === sf.id;
    stroke(isHighlighted ? sf.color : '#DDD');
    strokeWeight(isHighlighted ? 2.5 : 1);
    line(cx, cy, nx, ny);

    // ML sub-branches
    if (sf.id === 'ml' && mlExpanded && sf.subs) {
      for (let i = 0; i < sf.subs.length; i++) {
        let sa = radians(sf.angle - 25 + i * 25);
        let subR = outerR * 0.55;
        let sx = nx + subR * cos(sa);
        let sy = ny + subR * sin(sa);
        stroke(isHighlighted ? sf.subs[i].color : '#DDD');
        strokeWeight(1.5);
        line(nx, ny, sx, sy);
      }
    }
  }

  // Draw sub-branch nodes for ML if expanded
  for (let sf of SUBFIELDS) {
    if (sf.id === 'ml' && mlExpanded && sf.subs) {
      let angle = radians(sf.angle);
      let nx = cx + outerR * cos(angle);
      let ny = cy + outerR * sin(angle);
      let isHighlighted = !selectedNode || selectedNode === sf.id;

      for (let i = 0; i < sf.subs.length; i++) {
        let sa = radians(sf.angle - 25 + i * 25);
        let subR = outerR * 0.55;
        let sx = nx + subR * cos(sa);
        let sy = ny + subR * sin(sa);
        let alpha = isHighlighted ? 255 : 80;
        fill(red(color(sf.subs[i].color)), green(color(sf.subs[i].color)), blue(color(sf.subs[i].color)), alpha);
        stroke('white');
        strokeWeight(1);
        ellipse(sx, sy, 70, 28);
        fill(0, 0, 0, alpha);
        noStroke();
        textAlign(CENTER, CENTER);
        textSize(12);
        text(sf.subs[i].label, sx, sy);
      }
    }
  }

  // Draw outer subfield nodes
  for (let sf of SUBFIELDS) {
    let angle = radians(sf.angle);
    let nx = cx + outerR * cos(angle);
    let ny = cy + outerR * sin(angle);
    let isHovered = hoveredNode === sf.id;
    let isSelected = selectedNode === sf.id;
    let isHighlighted = !selectedNode || selectedNode === sf.id;

    let nodeR = isHovered ? 56 : 50;
    let alpha = isHighlighted ? 255 : 60;

    fill(red(color(sf.color)), green(color(sf.color)), blue(color(sf.color)), alpha);
    stroke('white');
    strokeWeight(isSelected ? 3 : 1.5);
    ellipse(nx, ny, nodeR, nodeR);

    fill(255, 255, 255, alpha);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(sf.label, nx, ny);
  }

  // Draw center node
  fill('#4A90D9');
  stroke('white');
  strokeWeight(2);
  ellipse(cx, cy, 80, 80);
  fill('white');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(11);
  text(CENTER.label, cx, cy);

  // Tooltip panel
  if (hoveredNode) {
    let sf = SUBFIELDS.find(s => s.id === hoveredNode);
    if (sf) {
      drawTooltip(sf);
    }
  }

  // Control bar instructions
  fill('#555');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Hover a node for details  |  Click ML node to expand sub-branches  |  Click again to reset', canvasWidth / 2, drawHeight + 25);
}

function drawTooltip(sf) {
  let panelW = min(300, canvasWidth - 40);
  let panelH = 85;
  let px = margin;
  let py = drawHeight - panelH - margin;

  fill(255, 255, 255, 230);
  stroke(200);
  strokeWeight(1);
  rect(px, py, panelW, panelH, 10);

  fill(sf.color);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(14);
  text(sf.label.replace('\n', ' '), px + 10, py + 10);

  fill(60);
  textSize(12);
  text(sf.tooltip, px + 10, py + 30, panelW - 20, 30);

  fill(100);
  textSize(11);
  text('e.g. ' + sf.example, px + 10, py + 62, panelW - 20, 20);
}

function mouseMoved() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let outerR = min(canvasWidth, drawHeight) * 0.33;

  hoveredNode = null;
  for (let sf of SUBFIELDS) {
    let angle = radians(sf.angle);
    let nx = cx + outerR * cos(angle);
    let ny = cy + outerR * sin(angle);
    if (dist(mouseX, mouseY, nx, ny) < 30) {
      hoveredNode = sf.id;
      break;
    }
  }
}

function mousePressed() {
  let cx = canvasWidth / 2;
  let cy = drawHeight / 2 + 10;
  let outerR = min(canvasWidth, drawHeight) * 0.33;

  for (let sf of SUBFIELDS) {
    let angle = radians(sf.angle);
    let nx = cx + outerR * cos(angle);
    let ny = cy + outerR * sin(angle);
    if (dist(mouseX, mouseY, nx, ny) < 30) {
      if (sf.id === 'ml') {
        mlExpanded = !mlExpanded;
      }
      selectedNode = (selectedNode === sf.id) ? null : sf.id;
      return;
    }
  }
  selectedNode = null;
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
