// AI History Timeline MicroSim
// Uses vis-timeline to show major AI milestones from 1950–2025
// Color coding: Blue=Foundational, Red=AI Winters, Green=Expert Systems, Gold=Modern ML/DL

const events = [
  {
    id: 1, start: '1950-01-01', content: '1950: Turing Paper',
    className: 'foundational',
    title: '1950: Turing — "Computing Machinery and Intelligence"',
    body: 'Alan Turing proposed the "Imitation Game" (Turing Test) as a practical criterion for machine intelligence, shifting the debate from philosophy to empirical testing.',
    figures: 'Alan Turing'
  },
  {
    id: 2, start: '1956-01-01', content: '1956: Dartmouth Conf.',
    className: 'foundational',
    title: '1956: Dartmouth Conference — AI Named as a Discipline',
    body: 'Organized by McCarthy, Minsky, Rochester, and Shannon, this summer workshop coined the term "Artificial Intelligence" and established it as an academic field.',
    figures: 'John McCarthy, Marvin Minsky, Claude Shannon'
  },
  {
    id: 3, start: '1966-01-01', content: '1966: ELIZA',
    className: 'foundational',
    title: '1966: ELIZA — Early Natural Language Chatbot',
    body: 'Joseph Weizenbaum at MIT created ELIZA, one of the first programs to process natural language. It simulated a psychotherapist using simple pattern matching.',
    figures: 'Joseph Weizenbaum'
  },
  {
    id: 4, start: '1974-01-01', end: '1980-01-01', content: 'First AI Winter',
    className: 'winter',
    title: '1974–1980: First AI Winter',
    body: 'Funding cuts followed unmet promises. The Lighthill Report (UK) and DARPA budget reductions dramatically slowed AI research after early systems failed to scale.',
    figures: 'James Lighthill'
  },
  {
    id: 5, start: '1980-01-01', content: '1980: Expert Systems Boom',
    className: 'expert',
    title: '1980: Expert Systems Gain Commercial Traction',
    body: 'Rule-based systems like XCON (DEC) and MYCIN encoded specialist knowledge and delivered real business value, attracting major corporate investment in AI.',
    figures: 'Edward Feigenbaum, Bruce Buchanan'
  },
  {
    id: 6, start: '1987-01-01', end: '1993-01-01', content: 'Second AI Winter',
    className: 'winter',
    title: '1987–1993: Second AI Winter',
    body: 'Expert systems proved brittle and expensive to maintain. The collapse of Lisp machine market and withdrawal of corporate funding triggered another research slowdown.',
    figures: ''
  },
  {
    id: 7, start: '1997-01-01', content: '1997: Deep Blue',
    className: 'modern',
    title: '1997: IBM Deep Blue Defeats Garry Kasparov',
    body: 'IBM\'s Deep Blue became the first computer to defeat a reigning world chess champion. It relied on brute-force search and hand-coded evaluation, not learning.',
    figures: 'Garry Kasparov, IBM team'
  },
  {
    id: 8, start: '2006-01-01', content: '2006: Deep Learning Revival',
    className: 'modern',
    title: '2006: Hinton\'s Deep Belief Networks',
    body: 'Geoffrey Hinton published a breakthrough paper showing deep networks could be pre-trained layer by layer, reigniting interest in neural networks and launching the deep learning era.',
    figures: 'Geoffrey Hinton'
  },
  {
    id: 9, start: '2012-01-01', content: '2012: AlexNet',
    className: 'modern',
    title: '2012: AlexNet Wins ImageNet by a Wide Margin',
    body: 'Alex Krizhevsky\'s deep CNN reduced ImageNet top-5 error by nearly 11 percentage points over prior methods, demonstrating that deep learning could dominate computer vision.',
    figures: 'Alex Krizhevsky, Ilya Sutskever, Geoffrey Hinton'
  },
  {
    id: 10, start: '2016-01-01', content: '2016: AlphaGo',
    className: 'modern',
    title: '2016: AlphaGo Defeats World Go Champion',
    body: 'DeepMind\'s AlphaGo used deep reinforcement learning and Monte Carlo Tree Search to beat Lee Sedol 4–1, a feat previously thought to be decades away.',
    figures: 'Demis Hassabis, David Silver, Lee Sedol'
  },
  {
    id: 11, start: '2020-01-01', content: '2020: GPT-3',
    className: 'modern',
    title: '2020: GPT-3 — 175 Billion Parameter Language Model',
    body: 'OpenAI\'s GPT-3 demonstrated remarkable few-shot learning across diverse language tasks, showing that scale alone could unlock new emergent capabilities in NLP.',
    figures: 'OpenAI research team'
  },
  {
    id: 12, start: '2022-11-01', content: '2022: ChatGPT',
    className: 'modern',
    title: '2022: ChatGPT Brings AI to Mainstream Awareness',
    body: 'ChatGPT reached 100 million users in two months — the fastest growing consumer application in history — sparking global public and policy interest in AI.',
    figures: 'OpenAI'
  }
];

const container = document.getElementById('timeline');
const detailPanel = document.getElementById('detail-panel');
const hint = document.getElementById('hint');

const items = new vis.DataSet(events.map(e => ({
  id: e.id,
  start: e.start,
  end: e.end || undefined,
  content: e.content,
  className: e.className,
  title: e.title  // vis uses title for native hover tooltip
})));

const options = {
  start: '1948-01-01',
  end: '2026-01-01',
  min: '1945-01-01',
  max: '2027-01-01',
  height: '340px',
  zoomMin: 1000 * 60 * 60 * 24 * 365 * 2,   // 2 years minimum zoom
  zoomMax: 1000 * 60 * 60 * 24 * 365 * 85,   // 85 years maximum zoom
  orientation: { axis: 'bottom' },
  showMajorLabels: true,
  showMinorLabels: true,
  moveable: true,
  zoomable: true,
  selectable: true,
  stack: true
};

const timeline = new vis.Timeline(container, items, options);

timeline.on('select', function(props) {
  if (!props.items.length) {
    detailPanel.innerHTML = '<p style="color:#999;">Select an event on the timeline to see its description.</p>';
    hint.textContent = 'Click any event to see details below';
    return;
  }
  const id = props.items[0];
  const ev = events.find(e => e.id === id);
  if (!ev) return;

  hint.textContent = '';
  let html = `<h3 style="color: ${colorForClass(ev.className)}">${ev.title}</h3>`;
  html += `<p>${ev.body}</p>`;
  if (ev.figures) {
    html += `<p style="color:#777; font-size:12px; margin-top:6px;">Key figures: ${ev.figures}</p>`;
  }
  detailPanel.innerHTML = html;
});

function colorForClass(cls) {
  switch(cls) {
    case 'foundational': return '#2c6fad';
    case 'winter': return '#a93226';
    case 'expert': return '#1a7a44';
    case 'modern': return '#b07d0e';
    default: return '#333';
  }
}

// Legend
const legendDiv = document.createElement('div');
legendDiv.style.cssText = 'display:flex; gap:16px; padding:4px 16px; background:aliceblue; border-bottom:1px solid silver; font-size:12px; flex-wrap:wrap;';
legendDiv.innerHTML = `
  <span><span style="display:inline-block;width:14px;height:14px;background:#4A90D9;border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Foundational</span>
  <span><span style="display:inline-block;width:14px;height:14px;background:#E74C3C;border-radius:3px;vertical-align:middle;margin-right:4px;"></span>AI Winters</span>
  <span><span style="display:inline-block;width:14px;height:14px;background:#27AE60;border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Expert Systems</span>
  <span><span style="display:inline-block;width:14px;height:14px;background:#F39C12;border-radius:3px;vertical-align:middle;margin-right:4px;"></span>Modern ML/DL</span>
`;
container.parentNode.insertBefore(legendDiv, container.nextSibling);
