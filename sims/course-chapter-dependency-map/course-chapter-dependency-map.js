// Course Chapter Dependency Map MicroSim
// vis-network directed acyclic graph showing 16 chapter prerequisites
// Bloom: Understand (L2) / summarize

const CHAPTERS = [
  { id: 1,  label: 'Ch 1\nIntro to AI',           group: 'foundation',    title: 'Ch 1: Intro to AI — 13 concepts' },
  { id: 2,  label: 'Ch 2\nPython Tools',           group: 'foundation',    title: 'Ch 2: Python Tools — 7 concepts' },
  { id: 3,  label: 'Ch 3\nData Acquisition',       group: 'data',          title: 'Ch 3: Data Acquisition — 12 concepts' },
  { id: 4,  label: 'Ch 4\nPreprocessing',          group: 'data',          title: 'Ch 4: Data Preprocessing — 19 concepts' },
  { id: 5,  label: 'Ch 5\nMath Foundations',       group: 'math',          title: 'Ch 5: Math Foundations — core linear algebra & calculus' },
  { id: 6,  label: 'Ch 6\nLinear Regression',      group: 'math',          title: 'Ch 6: Linear Regression — 12 concepts' },
  { id: 7,  label: 'Ch 7\nGradient Descent',       group: 'math',          title: 'Ch 7: Optimization & Gradient Descent — 10 concepts' },
  { id: 8,  label: 'Ch 8\nModel Evaluation',       group: 'math',          title: 'Ch 8: Model Evaluation (Regression) — 10 concepts' },
  { id: 9,  label: 'Ch 9\nNeural Nets',            group: 'neural',        title: 'Ch 9: Neural Network Foundations — 15 concepts' },
  { id: 10, label: 'Ch 10\nLogistic Reg.',         group: 'classification', title: 'Ch 10: Classification / Logistic Regression — 12 concepts' },
  { id: 11, label: 'Ch 11\nClassif. Eval.',        group: 'classification', title: 'Ch 11: Classification Evaluation — 10 concepts' },
  { id: 12, label: 'Ch 12\nKNN',                   group: 'classification', title: 'Ch 12: K-Nearest Neighbor — 8 concepts' },
  { id: 13, label: 'Ch 13\nClustering',            group: 'advanced',      title: 'Ch 13: Clustering / Unsupervised — 10 concepts' },
  { id: 14, label: 'Ch 14\nBackprop',              group: 'neural',        title: 'Ch 14: Backpropagation & Training — 12 concepts' },
  { id: 15, label: 'Ch 15\nCNNs',                  group: 'advanced',      title: 'Ch 15: Convolutional Neural Networks — 14 concepts' },
  { id: 16, label: 'Ch 16\nRNN / Workflow',        group: 'advanced',      title: 'Ch 16: RNN & ML Workflow — 12 concepts' }
];

const EDGES_RAW = [
  [1,3],[1,5],[1,9],[1,10],[1,12],[1,13],[1,16],
  [2,4],[2,5],
  [3,4],[3,15],[3,16],
  [4,6],[4,8],[4,10],[4,11],[4,12],[4,13],[4,16],
  [5,6],[5,7],[5,8],[5,10],[5,13],[5,14],
  [6,7],[6,8],[6,10],
  [7,12],[7,14],[7,16],
  [8,12],[8,14],
  [9,10],[9,14],[9,15],[9,16],
  [10,11],[10,15],
  [11,12],[11,16],
  [12,13]
];

const GROUP_COLORS = {
  foundation:    { background: '#27AE60', border: '#1a7a44', font: { color: 'white' } },
  data:          { background: '#E67E22', border: '#b05a10', font: { color: 'white' } },
  math:          { background: '#4A90D9', border: '#2c6fad', font: { color: 'white' } },
  neural:        { background: '#8E44AD', border: '#6c3483', font: { color: 'white' } },
  classification:{ background: '#16A085', border: '#0e6655', font: { color: 'white' } },
  advanced:      { background: '#E74C3C', border: '#a93226', font: { color: 'white' } }
};

const nodes = new vis.DataSet(CHAPTERS.map(ch => ({
  id: ch.id,
  label: ch.label,
  title: ch.title,
  color: GROUP_COLORS[ch.group],
  font: GROUP_COLORS[ch.group].font,
  shape: 'ellipse',
  margin: 8
})));

const edges = new vis.DataSet(EDGES_RAW.map(([from, to], i) => ({
  id: i,
  from,
  to,
  arrows: { to: { enabled: true, scaleFactor: 0.7 } },
  color: { color: '#AAA', highlight: '#333' },
  smooth: { type: 'cubicBezier', roundness: 0.3 }
})));

const container = document.getElementById('network-container');
const detailEl  = document.getElementById('detail');

const options = {
  layout: {
    hierarchical: {
      enabled: true,
      direction: 'UD',
      sortMethod: 'directed',
      nodeSpacing: 110,
      levelSeparation: 90
    }
  },
  physics: { enabled: false },
  interaction: {
    hover: true,
    tooltipDelay: 100,
    navigationButtons: false,
    zoomView: true
  },
  nodes: {
    borderWidth: 2,
    borderWidthSelected: 3,
    size: 28,
    font: { size: 12, multi: true }
  },
  edges: {
    width: 1.5,
    selectionWidth: 3
  }
};

const network = new vis.Network(container, { nodes, edges }, options);

network.on('click', function(params) {
  if (!params.nodes.length) {
    // deselect
    detailEl.innerHTML = 'Click any chapter node to highlight its prerequisites and dependents.';
    network.setSelection({ nodes: [], edges: [] });
    return;
  }

  const id = params.nodes[0];
  const ch = CHAPTERS.find(c => c.id === id);

  // Find all prerequisites (nodes that have a path TO this node)
  const prereqs = [];
  const dependents = [];
  for (let [from, to] of EDGES_RAW) {
    if (to === id)   prereqs.push(from);
    if (from === id) dependents.push(to);
  }

  // Highlight selection
  const highlightNodes = [id, ...prereqs, ...dependents];
  const highlightEdges = edges.get().filter(e =>
    (e.from === id || e.to === id)
  ).map(e => e.id);

  network.setSelection({ nodes: highlightNodes, edges: highlightEdges });

  const prereqStr   = prereqs.length   ? prereqs.map(n => 'Ch ' + n).join(', ')   : 'None';
  const dependentStr= dependents.length ? dependents.map(n => 'Ch ' + n).join(', '): 'None';

  detailEl.innerHTML = `
    <strong>${ch.title}</strong><br>
    <span style="color:#1a7a44">Prerequisites: ${prereqStr}</span> &nbsp;|&nbsp;
    <span style="color:#2c6fad">Leads to: ${dependentStr}</span>
  `;
});

network.on('hoverNode', function(params) {
  container.style.cursor = 'pointer';
});
network.on('blurNode', function() {
  container.style.cursor = 'default';
});
