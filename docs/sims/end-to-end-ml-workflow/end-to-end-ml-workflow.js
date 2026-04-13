// End-to-End ML Workflow MicroSim
// Clickable horizontal flowchart of the ML pipeline
// Click each stage for a short description panel

let canvasWidth = 760;
let canvasHeight = 460;
let selectedStage = -1;

let stages = [
  {
    name: 'Data\nCollection',
    icon: 'D',
    color: [80, 160, 230],
    title: 'Data Collection',
    desc: 'Gather raw data from sources: databases, APIs, sensors, web scraping, surveys, or public datasets.\n\nKey concerns: data quantity (enough examples?), coverage (all cases represented?), and legal compliance (licensing, privacy laws like GDPR).\n\nPoor data quality here cascades through the entire pipeline.'
  },
  {
    name: 'Data\nPreprocessing',
    icon: 'P',
    color: [60, 190, 160],
    title: 'Data Preprocessing',
    desc: 'Clean and prepare raw data: handle missing values (imputation or removal), remove duplicates, fix data types, detect and handle outliers.\n\nNormalization and standardization (z-score, min-max) ensure features are on comparable scales.\n\nTypically the most time-consuming step (60-80% of project time).'
  },
  {
    name: 'Feature\nEngineering',
    icon: 'F',
    color: [120, 200, 80],
    title: 'Feature Engineering',
    desc: 'Transform raw data into informative features for the model.\n\nExamples: encoding categorical variables (one-hot, label), creating interaction features, applying domain knowledge (e.g., "day of week" from a timestamp), dimensionality reduction (PCA).\n\nGood features can improve model performance dramatically.'
  },
  {
    name: 'Model\nSelection',
    icon: 'M',
    color: [220, 180, 50],
    title: 'Model Selection',
    desc: 'Choose the right algorithm for the problem: classification, regression, clustering, or generation.\n\nConsider: dataset size, feature types, interpretability requirements, training time, inference latency.\n\nCommon models: Linear/Logistic Regression, Decision Trees, Random Forest, SVM, Neural Networks. Often start simple, then increase complexity.'
  },
  {
    name: 'Training',
    icon: 'T',
    color: [240, 130, 60],
    title: 'Model Training',
    desc: 'Fit the model to training data by optimizing a loss function using an algorithm like gradient descent.\n\nKey hyperparameters: learning rate, batch size, number of epochs, regularization strength.\n\nUse train/validation/test splits (e.g., 70/15/15) or k-fold cross-validation to avoid overfitting. Monitor loss curves during training.'
  },
  {
    name: 'Evaluation',
    icon: 'E',
    color: [220, 80, 120],
    title: 'Evaluation',
    desc: 'Measure model performance on held-out test data using appropriate metrics:\n\nClassification: Accuracy, Precision, Recall, F1-score, AUC-ROC\nRegression: MSE, RMSE, MAE, R²\nClustering: Silhouette score, Inertia\n\nCompare against baselines. Analyze error patterns. Decide if performance meets requirements before deployment.'
  },
  {
    name: 'Deployment',
    icon: 'D',
    color: [160, 80, 220],
    title: 'Deployment',
    desc: 'Serve the trained model in production: REST API (Flask/FastAPI), batch inference pipeline, edge device, or cloud ML platform.\n\nMonitor for data drift (input distribution changes) and model degradation over time.\n\nSet up retraining triggers. A/B test new model versions. Maintain model versioning and reproducibility.'
  }
];

function setup() {
  let canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent('main');
  textFont('Arial');
  windowResized();
}

function windowResized() {
  canvasWidth = min(windowWidth, 920);
  canvasHeight = 460;
  resizeCanvas(canvasWidth, canvasHeight);
}

function getStagePos(i) {
  let n = stages.length;
  let margin = 52;
  let available = canvasWidth - margin * 2;
  let x = margin + (i / (n - 1)) * available;
  let y = 170;
  return { x, y };
}

function getStageDims() {
  return { bw: 80, bh: 72 };
}

function mousePressed() {
  let { bw, bh } = getStageDims();
  for (let i = 0; i < stages.length; i++) {
    let pos = getStagePos(i);
    if (mouseX >= pos.x - bw / 2 && mouseX <= pos.x + bw / 2 &&
        mouseY >= pos.y - bh / 2 && mouseY <= pos.y + bh / 2) {
      selectedStage = (selectedStage === i) ? -1 : i;
      return;
    }
  }
  selectedStage = -1;
}

function drawArrow(x1, y1, x2, y2, col) {
  stroke(col);
  strokeWeight(2.5);
  line(x1, y1, x2, y2);
  let angle = atan2(y2 - y1, x2 - x1);
  fill(col);
  noStroke();
  push();
  translate(x2, y2);
  rotate(angle);
  triangle(0, 0, -10, -5, -10, 5);
  pop();
}

function draw() {
  background(245, 247, 250);
  let { bw, bh } = getStageDims();
  let gateY = 170;

  // Title
  fill(40, 60, 100);
  noStroke();
  textAlign(CENTER, TOP);
  textSize(16);
  textStyle(BOLD);
  text('End-to-End ML Workflow', canvasWidth / 2, 10);
  textStyle(NORMAL);
  textSize(11);
  fill(100, 110, 130);
  text('Click any stage to learn more', canvasWidth / 2, 32);

  // Pipeline number labels
  for (let i = 0; i < stages.length; i++) {
    let pos = getStagePos(i);
    noStroke();
    fill(160, 170, 190);
    textAlign(CENTER, BOTTOM);
    textSize(10);
    text('Step ' + (i + 1), pos.x, pos.y - bh / 2 - 8);
  }

  // Draw connector arrows
  for (let i = 0; i < stages.length - 1; i++) {
    let p1 = getStagePos(i);
    let p2 = getStagePos(i + 1);
    let isHighlighted = (selectedStage === i || selectedStage === i + 1);
    let col = isHighlighted ? color(80, 100, 200) : color(160, 170, 200);
    drawArrow(p1.x + bw / 2, gateY, p2.x - bw / 2, gateY, col);
  }

  // Feedback loop arrow (Evaluation → Training, below)
  {
    let evalPos = getStagePos(5);
    let trainPos = getStagePos(4);
    let loopY = gateY + bh / 2 + 36;
    stroke(180, 80, 100, 160);
    strokeWeight(1.5);
    drawingContext.setLineDash([7, 4]);
    line(evalPos.x, gateY + bh / 2, evalPos.x, loopY);
    line(evalPos.x, loopY, trainPos.x, loopY);
    drawingContext.setLineDash([]);
    // arrowhead pointing up
    fill(180, 80, 100, 160);
    noStroke();
    triangle(trainPos.x, gateY + bh / 2,
      trainPos.x - 5, gateY + bh / 2 + 10,
      trainPos.x + 5, gateY + bh / 2 + 10);
    noStroke();
    fill(150, 70, 90, 160);
    textAlign(CENTER, TOP);
    textSize(9);
    textStyle(ITALIC);
    text('retrain loop', (evalPos.x + trainPos.x) / 2, loopY + 4);
    textStyle(NORMAL);
  }

  // Draw stage blocks
  for (let i = 0; i < stages.length; i++) {
    let stage = stages[i];
    let pos = getStagePos(i);
    let isSelected = (selectedStage === i);
    let col = color(...stage.color);

    // Shadow
    noStroke();
    fill(0, 0, 0, 16);
    rect(pos.x - bw / 2 + 3, pos.y - bh / 2 + 3, bw, bh, 10);

    // Block
    if (isSelected) {
      stroke(30, 30, 30);
      strokeWeight(3);
      fill(red(col) + 30, green(col) + 30, blue(col) + 30);
    } else {
      stroke(red(col) * 0.65, green(col) * 0.65, blue(col) * 0.65);
      strokeWeight(1.5);
      fill(col);
    }
    rect(pos.x - bw / 2, pos.y - bh / 2, bw, bh, 10);

    // Icon circle
    noStroke();
    fill(255, 255, 255, 80);
    ellipse(pos.x, pos.y - 12, 28, 28);
    fill(255);
    textAlign(CENTER, CENTER);
    textSize(13);
    textStyle(BOLD);
    text(stage.icon, pos.x, pos.y - 12);
    textStyle(NORMAL);

    // Stage name
    fill(255);
    textSize(9.5);
    textStyle(BOLD);
    textAlign(CENTER, CENTER);
    text(stage.name, pos.x, pos.y + 18);
    textStyle(NORMAL);

    // Selection ring
    if (isSelected) {
      noFill();
      stroke(255, 220, 50);
      strokeWeight(3);
      rect(pos.x - bw / 2 - 4, pos.y - bh / 2 - 4, bw + 8, bh + 8, 12);
    }
  }

  // Completed progress dots
  let dotY = 56;
  let dotSpacing = 24;
  let dotsX = canvasWidth / 2 - ((stages.length - 1) * dotSpacing) / 2;
  for (let i = 0; i < stages.length; i++) {
    let col = color(...stages[i].color);
    if (i === selectedStage) {
      fill(col);
      stroke(red(col) * 0.6, green(col) * 0.6, blue(col) * 0.6);
    } else {
      fill(200, 205, 220);
      stroke(170, 175, 195);
    }
    strokeWeight(1);
    ellipse(dotsX + i * dotSpacing, dotY, 12, 12);
  }

  // Description panel
  let panelY = canvasHeight - 135;
  fill(255, 255, 255, 235);
  stroke(200, 210, 230);
  strokeWeight(1);
  rect(16, panelY, canvasWidth - 32, 122, 8);

  noStroke();
  if (selectedStage >= 0) {
    let stage = stages[selectedStage];
    let col = color(...stage.color);
    fill(col);
    rect(16, panelY, 5, 122, 8, 0, 0, 8);

    fill(40, 50, 70);
    textAlign(LEFT, TOP);
    textSize(13);
    textStyle(BOLD);
    text('Step ' + (selectedStage + 1) + ': ' + stage.title, 28, panelY + 9);
    textStyle(NORMAL);

    fill(60, 70, 90);
    textSize(10.5);
    text(stage.desc, 28, panelY + 30, canvasWidth - 56, 90);
  } else {
    fill(120, 130, 155);
    textAlign(CENTER, CENTER);
    textSize(12);
    text('Click any step in the pipeline above to learn what happens at that stage.', canvasWidth / 2, panelY + 40);
    textSize(11);
    text('A complete ML project typically follows these 7 steps from raw data to production deployment.', canvasWidth / 2, panelY + 72);
    text('Most projects iterate between steps — especially Training, Evaluation, and back to Feature Engineering.', canvasWidth / 2, panelY + 96);
  }
}
