// Learning Paradigms Comparison MicroSim
// Step-through showing Supervised, Unsupervised, Reinforcement Learning
// Bloom: Understand (L2) / compare — uses step-through, NOT animation
//
// Layout:
//   drawHeight = 420
//   controlHeight = 80 (2 rows x 35 + 10)
//   canvasHeight = 500
//   iframeHeight = 502

let canvasWidth = 700;
let drawHeight = 420;
let controlHeight = 80;
let canvasHeight = drawHeight + controlHeight;
let margin = 25;
let defaultTextSize = 16;

let stage = 0; // 0=Supervised, 1=Unsupervised, 2=Reinforcement
let prevButton, nextButton;

// Quiz state
let quizAnswered = false;
let quizCorrect = false;
let quizSelected = -1;

const STAGES = [
  {
    title: 'Supervised Learning',
    color: '#27AE60',
    feedback: 'Correct labels (answers)',
    dataDesc: 'Labeled input-output pairs',
    goal: 'Learn input → output mapping',
    examples: ['Email spam detection', 'House price prediction', 'Image classification'],
    quiz: {
      question: 'What type of feedback does Supervised Learning use?',
      options: ['Correct labels for every example', 'No feedback at all', 'Reward signals from the environment'],
      correct: 0
    }
  },
  {
    title: 'Unsupervised Learning',
    color: '#E67E22',
    feedback: 'None — no labels provided',
    dataDesc: 'Unlabeled inputs only',
    goal: 'Discover hidden structure',
    examples: ['Customer segmentation', 'Anomaly detection', 'Dimensionality reduction (PCA)'],
    quiz: {
      question: 'What type of feedback does Unsupervised Learning use?',
      options: ['Correct labels for every example', 'No feedback at all', 'Reward signals from the environment'],
      correct: 1
    }
  },
  {
    title: 'Reinforcement Learning',
    color: '#8E44AD',
    feedback: 'Reward signals (delayed)',
    dataDesc: 'Agent actions + environment',
    goal: 'Maximize cumulative reward',
    examples: ['AlphaGo (board games)', 'Robot locomotion', 'Resource scheduling'],
    quiz: {
      question: 'What type of feedback does Reinforcement Learning use?',
      options: ['Correct labels for every example', 'No feedback at all', 'Reward signals from the environment'],
      correct: 2
    }
  }
];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevButton = createButton('◀ Previous');
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(() => {
    stage = (stage - 1 + STAGES.length) % STAGES.length;
    quizAnswered = false;
    quizSelected = -1;
  });

  nextButton = createButton('Next ▶');
  nextButton.position(110, drawHeight + 5);
  nextButton.mousePressed(() => {
    stage = (stage + 1) % STAGES.length;
    quizAnswered = false;
    quizSelected = -1;
  });

  describe('Step-through comparison of three machine learning paradigms with quiz prompts.', LABEL);
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

  const s = STAGES[stage];

  // Title
  fill('black');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(22);
  text('Learning Paradigms Comparison', canvasWidth / 2, 10);

  // Stage indicator dots
  for (let i = 0; i < STAGES.length; i++) {
    let dotX = canvasWidth / 2 - 20 + i * 20;
    fill(i === stage ? STAGES[i].color : '#CCC');
    noStroke();
    circle(dotX, 42, 12);
  }

  // Main panel
  let panelX = margin;
  let panelY = 58;
  let panelW = canvasWidth - margin * 2;
  let panelH = drawHeight - 68;

  fill(255, 255, 255, 220);
  stroke(s.color);
  strokeWeight(2);
  rect(panelX, panelY, panelW, panelH, 12);

  // Paradigm name banner
  fill(s.color);
  noStroke();
  rect(panelX, panelY, panelW, 44, 12, 12, 0, 0);
  fill('white');
  textAlign(CENTER, CENTER);
  textSize(20);
  text(s.title, canvasWidth / 2, panelY + 22);

  // Left column: data & feedback info
  let col1X = panelX + 16;
  let col2X = panelX + panelW / 2 + 8;
  let rowY = panelY + 60;

  // Data box
  drawInfoBox(col1X, rowY, panelW / 2 - 24, 80, 'Data', s.dataDesc, '#3498DB');
  // Feedback box
  drawInfoBox(col1X, rowY + 92, panelW / 2 - 24, 80, 'Feedback', s.feedback, s.color);

  // Right column: goal + examples
  drawInfoBox(col2X, rowY, panelW / 2 - 24, 80, 'Goal', s.goal, '#16A085');

  fill('#555');
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Examples:', col2X, rowY + 92);
  for (let i = 0; i < s.examples.length; i++) {
    fill(80);
    text('• ' + s.examples[i], col2X + 6, rowY + 108 + i * 20);
  }

  // Quiz section
  let qY = panelY + panelH - 110;
  drawQuiz(s, panelX + 12, qY, panelW - 24);

  // Control bar: stage counter
  fill('#555');
  noStroke();
  textAlign(CENTER, CENTER);
  textSize(13);
  text('Stage ' + (stage + 1) + ' of ' + STAGES.length + '  |  Use buttons to navigate', canvasWidth / 2, drawHeight + 55);
}

function drawInfoBox(x, y, w, h, label, value, col) {
  fill(255);
  stroke(col);
  strokeWeight(1.5);
  rect(x, y, w, h, 8);

  fill(col);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(12);
  text(label.toUpperCase(), x + 8, y + 8);

  fill(40);
  textSize(14);
  text(value, x + 8, y + 28, w - 16, h - 36);
}

function drawQuiz(s, x, y, w) {
  let q = s.quiz;

  fill(250, 250, 220);
  stroke('#CCC');
  strokeWeight(1);
  rect(x, y, w, 100, 8);

  fill(80);
  noStroke();
  textAlign(LEFT, TOP);
  textSize(13);
  text('Quick Check: ' + q.question, x + 8, y + 8, w - 16, 30);

  let optW = (w - 24) / 3;
  for (let i = 0; i < q.options.length; i++) {
    let ox = x + 8 + i * (optW + 4);
    let oy = y + 48;
    let oh = 42;

    let bgCol = '#EEE';
    if (quizAnswered) {
      if (i === q.correct) bgCol = '#D5F5E3';
      else if (i === quizSelected && i !== q.correct) bgCol = '#FADBD8';
    } else if (quizSelected === i) {
      bgCol = '#D6EAF8';
    }

    fill(bgCol);
    stroke('#BBB');
    strokeWeight(1);
    rect(ox, oy, optW, oh, 6);

    fill(50);
    noStroke();
    textAlign(CENTER, CENTER);
    textSize(11);
    text(q.options[i], ox + optW / 2, oy + oh / 2, optW - 8, oh - 8);
  }

  if (quizAnswered) {
    fill(quizCorrect ? '#1a7a44' : '#a93226');
    noStroke();
    textAlign(LEFT, TOP);
    textSize(12);
    text(quizCorrect ? '✓ Correct!' : '✗ Try again — the correct answer is highlighted in green.', x + 8, y + 96);
  }
}

function mousePressed() {
  const s = STAGES[stage];
  const q = s.quiz;

  let panelX = margin;
  let panelY = 58;
  let panelW = canvasWidth - margin * 2;
  let panelH = drawHeight - 68;
  let qY = panelY + panelH - 110;

  let w = panelW - 24;
  let optW = (w - 24) / 3;

  for (let i = 0; i < q.options.length; i++) {
    let ox = panelX + 12 + 8 + i * (optW + 4);
    let oy = qY + 48;
    let oh = 42;
    if (mouseX > ox && mouseX < ox + optW && mouseY > oy && mouseY < oy + oh) {
      quizSelected = i;
      quizAnswered = true;
      quizCorrect = (i === q.correct);
      return;
    }
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
