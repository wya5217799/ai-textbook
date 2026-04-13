// EDA Workflow Dashboard MicroSim
// 7-stage step-through of exploratory data analysis on a sample dataset
// Each stage shows concrete data transformations
// Bloom: Apply (L3) / execute — staged walkthrough, concrete data visible at every step
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

let stage = 0;
let prevButton, nextButton;

const STAGES = [
  { title: 'Stage 1: Load Data',            subtitle: 'df = pd.read_csv("sensors.csv")' },
  { title: 'Stage 2: Check Shape & Types',  subtitle: 'df.shape  |  df.dtypes' },
  { title: 'Stage 3: Summary Statistics',   subtitle: 'df.describe()' },
  { title: 'Stage 4: Missing Values',       subtitle: 'df.isnull().sum()' },
  { title: 'Stage 5: Distribution',         subtitle: 'plt.hist(df["temp"], bins=20)' },
  { title: 'Stage 6: Correlation',          subtitle: 'df.corr()' },
  { title: 'Stage 7: Insights',             subtitle: 'Summarise findings' }
];

// Sample dataset: 8 rows, 5 columns
// Columns: sensor_id, temp (°C), humidity (%), voltage (V), label
const COLS = ['sensor_id', 'temp', 'humidity', 'voltage', 'label'];
const DATA = [
  ['S01', 22.1, 45.0, 3.28, 'OK'],
  ['S02', 23.4, 47.2, 3.31, 'OK'],
  ['S03', 21.8, null, 3.25, 'OK'],
  ['S04', 85.0, 49.1, 3.29, 'FAULT'],
  ['S05', 22.9, 46.8, null, 'OK'],
  ['S06', 23.1, 48.0, 3.27, 'OK'],
  ['S07', 22.5, 45.5, 3.30, 'OK'],
  ['S08', 23.8, 47.9, 3.32, 'OK']
];

// Stats (pre-computed)
const STATS = {
  temp:     { mean: 27.0, std: 21.5, min: 21.8, max: 85.0 },
  humidity: { mean: 47.1, std: 1.4,  min: 45.0, max: 49.1 },
  voltage:  { mean: 3.29, std: 0.02, min: 3.25, max: 3.32 }
};

// Correlation matrix (simplified 3x3: temp, humidity, voltage)
const CORR = [
  [1.00, -0.12, 0.05],
  [-0.12, 1.00, 0.30],
  [0.05,  0.30, 1.00]
];
const CORR_LABELS = ['temp', 'humid', 'volt'];

function setup() {
  updateCanvasSize();
  const canvas = createCanvas(canvasWidth, canvasHeight);
  canvas.parent(document.querySelector('main'));

  prevButton = createButton('◀ Previous');
  prevButton.parent(document.querySelector('main'));
  prevButton.position(10, drawHeight + 5);
  prevButton.mousePressed(() => { stage = max(0, stage - 1); });

  nextButton = createButton('Next ▶');
  nextButton.parent(document.querySelector('main'));
  nextButton.position(110, drawHeight + 5);
  nextButton.mousePressed(() => { stage = min(STAGES.length - 1, stage + 1); });

  describe('EDA workflow dashboard: 7-stage step-through of exploratory data analysis on sensor data.', LABEL);
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
  text('EDA Workflow Dashboard', canvasWidth / 2, 8);

  // Stage progress bar
  let barW = canvasWidth - margin * 2;
  let barX = margin;
  let barY = 36;
  let segW = barW / STAGES.length;

  for (let i = 0; i < STAGES.length; i++) {
    let isActive = i === stage;
    let isDone   = i < stage;
    fill(isDone ? '#27AE60' : isActive ? '#4A90D9' : '#DDD');
    noStroke();
    rect(barX + i * segW + 1, barY, segW - 2, 18, 4);
    fill(isDone || isActive ? 'white' : '#888');
    textAlign(CENTER, CENTER);
    textSize(10);
    text(i + 1, barX + i * segW + segW / 2, barY + 9);
  }

  // Stage title
  fill('#333');
  noStroke();
  textAlign(CENTER, TOP);
  textSize(15);
  text(STAGES[stage].title, canvasWidth / 2, barY + 24);
  fill('#666');
  textSize(12);
  text(STAGES[stage].subtitle, canvasWidth / 2, barY + 44);

  // Content area
  let contentY = barY + 64;
  let contentH = drawHeight - contentY - margin;

  if (stage === 0) drawStage0(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 1) drawStage1(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 2) drawStage2(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 3) drawStage3(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 4) drawStage4(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 5) drawStage5(margin, contentY, canvasWidth - margin * 2, contentH);
  else if (stage === 6) drawStage6(margin, contentY, canvasWidth - margin * 2, contentH);

  // Control bar
  fill('#555');
  noStroke();
  textAlign(LEFT, CENTER);
  textSize(13);
  text('Stage ' + (stage + 1) + ' of ' + STAGES.length + '  |  Use buttons to navigate EDA steps', 220, drawHeight + 25);
}

// Helper: draw data table
function drawTable(data, cols, x, y, w, highlightFn) {
  let nCols = cols.length;
  let nRows = data.length;
  let colW = w / nCols;
  let rowH = 20;

  // Header
  fill('#D6EAF8'); stroke('#AAA'); strokeWeight(0.5);
  rect(x, y, w, rowH, 3);
  for (let c = 0; c < nCols; c++) {
    fill('#2980B9'); noStroke();
    textAlign(CENTER, CENTER); textSize(11);
    text(cols[c], x + c * colW + colW / 2, y + rowH / 2);
  }

  // Data rows
  for (let r = 0; r < nRows; r++) {
    let rowY = y + (r + 1) * rowH;
    fill(r % 2 === 0 ? 250 : 242); stroke('#DDD'); strokeWeight(0.5);
    rect(x, rowY, w, rowH);

    for (let c = 0; c < nCols; c++) {
      let val = data[r][c];
      let hilite = highlightFn ? highlightFn(r, c, val) : null;
      if (hilite) {
        fill(hilite); noStroke();
        rect(x + c * colW, rowY, colW, rowH);
      }
      fill(val === null ? '#E74C3C' : 50); noStroke();
      textAlign(CENTER, CENTER); textSize(11);
      text(val === null ? 'NaN' : String(val), x + c * colW + colW / 2, rowY + rowH / 2);
    }
  }
  return y + (nRows + 1) * rowH;
}

function drawStage0(x, y, w, h) {
  let endY = drawTable(DATA, COLS, x, y, w, null);
  fill('#555'); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('8 rows loaded from sensors.csv  |  5 columns  |  Mixed types: string, float, category', x, endY + 6);
}

function drawStage1(x, y, w, h) {
  fill(255); stroke('#CCC'); strokeWeight(1); rect(x, y, w, 80, 6);
  fill(50); noStroke(); textAlign(LEFT, TOP); textSize(13);
  text('df.shape  →  (8, 5)', x + 10, y + 8);
  let dtypes = [
    ['sensor_id', 'object (string)'],
    ['temp',      'float64'],
    ['humidity',  'float64'],
    ['voltage',   'float64'],
    ['label',     'object (category)']
  ];
  for (let i = 0; i < dtypes.length; i++) {
    fill(80); textSize(12);
    text(dtypes[i][0] + ':', x + 20, y + 28 + i * 14);
    fill('#2980B9');
    text(dtypes[i][1], x + 110, y + 28 + i * 14);
  }

  // Guidance
  fill('#555'); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('Check: Are all numeric columns float64? Do you need to encode categorical columns?', x, y + 96);
}

function drawStage2(x, y, w, h) {
  let cols2 = ['Feature', 'Mean', 'Std', 'Min', 'Max'];
  let rows2 = [
    ['temp',     '27.0', '21.5', '21.8', '85.0'],
    ['humidity', '47.1', '1.4',  '45.0', '49.1'],
    ['voltage',  '3.29', '0.02', '3.25', '3.32']
  ];

  let colW = (canvasWidth - margin * 2) / cols2.length;
  let rowH = 24;

  fill('#D6EAF8'); stroke('#AAA'); strokeWeight(0.5); rect(x, y, w, rowH, 3);
  for (let c = 0; c < cols2.length; c++) {
    fill('#2980B9'); noStroke(); textAlign(CENTER, CENTER); textSize(12);
    text(cols2[c], x + c * colW + colW / 2, y + rowH / 2);
  }
  for (let r = 0; r < rows2.length; r++) {
    fill(r % 2 === 0 ? 250 : 242); stroke('#DDD'); strokeWeight(0.5);
    rect(x, y + (r + 1) * rowH, w, rowH);
    for (let c = 0; c < rows2[r].length; c++) {
      // Highlight max of temp (85.0) as outlier candidate
      let isOutlier = r === 0 && c === 4;
      fill(isOutlier ? '#E74C3C' : 50); noStroke();
      textAlign(CENTER, CENTER); textSize(12);
      text(rows2[r][c], x + c * colW + colW / 2, y + (r + 1) * rowH + rowH / 2);
    }
  }

  fill('#E74C3C'); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('⚠ temp max = 85.0°C is suspicious — likely an outlier or sensor fault', x, y + 4 * rowH + 8);
  fill('#555');
  text('Humidity and voltage have tight ranges; temperature has very high std dev (21.5)', x, y + 4 * rowH + 26);
}

function drawStage3(x, y, w, h) {
  // Show table with NaN cells highlighted
  drawTable(DATA, COLS, x, y, w, (r, c, val) => {
    if (val === null) return '#FADBD8';
    return null;
  });

  // Missing value counts
  let mvY = y + 9 * 20 + 8;
  fill(255); stroke('#CCC'); strokeWeight(1); rect(x, mvY, w, 50, 6);
  fill(50); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('Missing value counts:', x + 10, mvY + 6);
  let mvCols = [['sensor_id',0],['temp',0],['humidity',1],['voltage',1],['label',0]];
  for (let i = 0; i < mvCols.length; i++) {
    fill(mvCols[i][1] > 0 ? '#E74C3C' : '#27AE60');
    text(mvCols[i][0] + ': ' + mvCols[i][1], x + 10 + i * (w / 5), mvY + 26);
  }
  fill('#555'); noStroke(); textSize(11);
  text('Options: drop rows, fill with mean/median, or add "is_missing" indicator column', x, mvY + 46);
}

function drawStage4(x, y, w, h) {
  // Histogram of temp values (excluding outlier for visual clarity + outlier bar)
  let histData = [21.8, 22.1, 22.5, 22.9, 23.1, 23.4, 23.8, 85.0];
  let bins = [[21,23,5], [23,25,2], [25,27,0], [27,29,0], [29,31,0], [81,87,1]];
  let maxCount = 5;
  let barW = (w - 40) / bins.length;
  let chartH = h - 50;
  let chartX = x + 20;
  let chartY = y;

  // Axes
  stroke(150); strokeWeight(1);
  line(chartX, chartY, chartX, chartY + chartH);
  line(chartX, chartY + chartH, chartX + barW * bins.length, chartY + chartH);

  for (let i = 0; i < bins.length; i++) {
    let [lo, hi, cnt] = bins[i];
    let bh = (cnt / maxCount) * chartH;
    let bx = chartX + i * barW;
    let by = chartY + chartH - bh;
    fill(i === bins.length - 1 ? '#E74C3C' : '#4A90D9');
    stroke('white'); strokeWeight(1);
    rect(bx, by, barW - 3, bh, 3);
    fill(50); noStroke(); textAlign(CENTER, TOP); textSize(10);
    text(lo + '-' + hi, bx + barW / 2, chartY + chartH + 3);
    if (cnt > 0) { fill('white'); textAlign(CENTER, CENTER); textSize(11); text(cnt, bx + barW / 2, by + bh / 2); }
  }

  // Y axis labels
  for (let v = 0; v <= maxCount; v += 1) {
    let ly = chartY + chartH - (v / maxCount) * chartH;
    fill(100); noStroke(); textAlign(RIGHT, CENTER); textSize(10);
    text(v, chartX - 3, ly);
  }

  fill(80); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('temp distribution — red bar = outlier (85°C far from cluster 21-24°C)', x, y + chartH + 8);
}

function drawStage5(x, y, w, h) {
  // 3x3 correlation heatmap
  let n = CORR_LABELS.length;
  let cs = min((w - 80) / n, (h - 40) / n);
  let ox = x + 50 + (w - 80 - cs * n) / 2;
  let oy = y + 20;

  for (let r = 0; r < n; r++) {
    for (let c = 0; c < n; c++) {
      let v = CORR[r][c];
      let intensity = abs(v);
      let col = v > 0 ? color(lerpColor(color('white'), color('#E74C3C'), intensity))
                      : color(lerpColor(color('white'), color('#4A90D9'), intensity));
      fill(col); stroke('white'); strokeWeight(1);
      rect(ox + c * cs, oy + r * cs, cs, cs, 3);
      fill(intensity > 0.5 ? 'white' : 30); noStroke();
      textAlign(CENTER, CENTER); textSize(13);
      text(nf(v, 1, 2), ox + c * cs + cs / 2, oy + r * cs + cs / 2);
    }
    // Row labels
    fill(60); noStroke(); textAlign(RIGHT, CENTER); textSize(11);
    text(CORR_LABELS[r], ox - 4, oy + r * cs + cs / 2);
  }
  // Column labels
  for (let c = 0; c < n; c++) {
    fill(60); noStroke(); textAlign(CENTER, BOTTOM); textSize(11);
    text(CORR_LABELS[c], ox + c * cs + cs / 2, oy - 4);
  }

  fill(80); noStroke(); textAlign(LEFT, TOP); textSize(12);
  text('Humidity and voltage show moderate correlation (0.30). Temp has weak correlations — may be noisy.', x, oy + n * cs + 10, w, 30);
}

function drawStage6(x, y, w, h) {
  let insights = [
    { icon: '⚠', color: '#E74C3C', text: 'Outlier detected: sensor S04 temp = 85.0°C → likely fault, consider removal or flagging' },
    { icon: '⚠', color: '#E67E22', text: 'Missing values: humidity (S03) and voltage (S05) → impute with column mean' },
    { icon: '✓', color: '#27AE60', text: 'Temperature cluster (21–24°C) is tight for 7/8 sensors — distribution is nearly normal' },
    { icon: '✓', color: '#27AE60', text: 'Humidity and voltage show moderate correlation (0.30) — potential redundancy' },
    { icon: '→', color: '#2980B9', text: 'Next steps: remove S04 outlier, impute NaN values, then proceed to feature scaling' }
  ];

  let iy = y + 8;
  for (let ins of insights) {
    fill(lerpColor(color(ins.color), color('white'), 0.9));
    stroke(ins.color); strokeWeight(1.5);
    rect(x, iy, w, 34, 6);

    fill(ins.color); noStroke();
    textAlign(LEFT, CENTER); textSize(18);
    text(ins.icon, x + 10, iy + 17);

    fill(40); textSize(12);
    text(ins.text, x + 32, iy + 17, w - 40, 30);
    iy += 42;
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
