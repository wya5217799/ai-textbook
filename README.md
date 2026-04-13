# Artificial Intelligence System - Intelligent Textbook

[![MkDocs](https://img.shields.io/badge/Made%20with-MkDocs-526CFE?logo=materialformkdocs)](https://www.mkdocs.org/)
[![Material for MkDocs](https://img.shields.io/badge/Material%20for%20MkDocs-526CFE?logo=materialformkdocs)](https://squidfunk.github.io/mkdocs-material/)
[![Claude Code](https://img.shields.io/badge/Built%20with-Claude%20Code-DA7857?logo=anthropic)](https://claude.ai/code)
[![Python](https://img.shields.io/badge/Python-3776AB?logo=python&logoColor=white)](https://www.python.org/)
[![PyTorch](https://img.shields.io/badge/PyTorch-EE4C2C?logo=pytorch&logoColor=white)](https://pytorch.org/)
[![Scikit-learn](https://img.shields.io/badge/Scikit--learn-F7931E?logo=scikit-learn&logoColor=white)](https://scikit-learn.org/)
[![License: CC BY-NC-SA 4.0](https://img.shields.io/badge/License-CC%20BY--NC--SA%204.0-lightgrey.svg)](https://creativecommons.org/licenses/by-nc-sa/4.0/)

## Overview

This is an interactive, AI-assisted intelligent textbook for **H63AIS - Artificial Intelligence System**, a Level 3 undergraduate module at the **University of Nottingham Ningbo China**, Department of Electrical and Electronic Engineering. Taught by Dr. Qianyu Liu, the course examines the fundamental principles and strategies of artificial intelligence systems and explores their main models and applications.

The textbook covers the full machine learning workflow — from data acquisition and preprocessing through classical algorithms, neural network architectures, and model evaluation — giving students hands-on exposure to Python, PyTorch, Scikit-learn, and Jupyter Notebooks. Content is structured around a validated learning graph of 200 interconnected concepts spanning 12 taxonomy categories, ensuring that prerequisite knowledge is always presented before advanced topics.

Built with MkDocs and the Material theme, this resource includes interactive MicroSims, KaTeX-rendered mathematical equations, Mermaid diagrams, interactive quizzes, and a comprehensive ISO 11179-compliant glossary. Whether you are a student working through the course for the first time or an educator seeking a structured, dependency-aware curriculum resource, this textbook provides comprehensive coverage with engaging, verifiable learning progressions.

## Site Status and Metrics

| Metric | Count |
|--------|-------|
| Concepts in Learning Graph | 200 |
| Taxonomy Categories | 12 |
| Chapters | 16 |
| Markdown Files | 66 |
| Total Words | 97,641 |
| Equivalent Pages | 405 |
| Quiz Questions | 160 |
| Glossary Terms | 200 |
| Diagrams | 57 |
| Equations (LaTeX) | 124 |
| MicroSims | 2 |
| Hyperlinks | 237 |

**Taxonomy Coverage:** Model Evaluation (14.5%), Neural Networks (12.0%), Deep Learning Architectures (11.5%), Data Preprocessing (9.5%), Optimization (9.5%), Classification (8.5%), Clustering (7.5%), and more.

**Learning Graph Quality:** Valid DAG structure, 0 orphaned nodes, 0 cycles detected, maximum dependency chain length of 14 steps.

## Getting Started

### Prerequisites

- Python 3.x
- pip

### Clone the Repository

```bash
git clone <repository-url>
cd "Artificial Intelligence System/md"
```

### Install Dependencies

This project uses MkDocs with the Material theme and pymdownx extensions:

```bash
pip install mkdocs
pip install mkdocs-material
pip install pymdown-extensions
```

### Build and Serve Locally

Build the static site:

```bash
mkdocs build
```

Serve locally with live reload for development:

```bash
mkdocs serve
```

Open your browser to `http://localhost:8000`.

### Deploy to GitHub Pages

```bash
mkdocs gh-deploy
```

This builds the site and pushes it to the `gh-pages` branch automatically.

### Using the Textbook

**Navigation:**

- Use the left sidebar to browse chapters in order
- Use the search icon (top right) to search all content including glossary and quizzes
- Each chapter contains lecture content, a quiz, and annotated references

**Interactive MicroSims:**

- Found in the "MicroSims" section of the navigation
- The Learning Graph Viewer lets you explore all 200 concepts and their dependencies interactively
- The AI Concept Classifier demonstrates classification concepts hands-on
- All simulations run entirely in your browser — no installation required

**Mathematics:**

- Inline equations use KaTeX rendering: look for expressions inside `\(...\)` or `$...$`
- Display equations are rendered in full-width blocks
- 124 equations are distributed across chapters covering linear algebra, calculus, and statistics

**Quizzes:**

- Each chapter ends with a quiz page (`quiz.md`) containing 10 questions
- Quiz feedback is interactive — answers are revealed on click
- Use quizzes to self-assess before exams

**Customization:**

- Edit markdown files in `docs/` to modify or extend content
- Modify `mkdocs.yml` to change navigation structure or plugins
- Add new MicroSims under `docs/sims/`
- Customize styles in `docs/css/extra.css`

## Repository Structure

```
md/
├── docs/                              # MkDocs documentation source
│   ├── chapters/                      # 16 chapter directories
│   │   ├── 01-intro-to-ai/
│   │   │   ├── index.md              # Chapter content
│   │   │   ├── quiz.md               # Chapter quiz (10 questions)
│   │   │   └── references.md         # Annotated references
│   │   └── ...                       # Chapters 02-16 (same structure)
│   ├── sims/                          # Interactive MicroSims (p5.js / vis-network)
│   │   ├── graph-viewer/             # Learning graph visualizer
│   │   │   ├── main.html             # Standalone simulation
│   │   │   ├── script.js             # vis-network graph logic
│   │   │   └── index.md              # Documentation page
│   │   └── ai-concept-classifier/    # AI concept classification demo
│   ├── learning-graph/                # Learning graph data and analysis
│   │   ├── learning-graph.csv        # Concept dependency edges
│   │   ├── learning-graph.json       # vis-network format for rendering
│   │   ├── concept-list.md           # All 200 concepts
│   │   ├── concept-taxonomy.md       # Taxonomy assignments
│   │   ├── quality-metrics.md        # Graph quality analysis
│   │   └── taxonomy-distribution-report.md
│   ├── css/                           # Custom stylesheets
│   │   ├── extra.css                 # Iframe, prompt admonition styles
│   │   └── quiz.css                  # Interactive quiz styles
│   ├── js/                            # KaTeX rendering scripts
│   ├── javascripts/                   # Quiz interaction and extras
│   ├── includes/                      # Shared abbreviations for all pages
│   │   └── abbreviations.md
│   ├── glossary.md                    # 200 ISO 11179-compliant definitions
│   ├── course-description.md          # Full course description
│   ├── feature-checklist.md           # MkDocs feature implementation status
│   └── index.md                       # Site home page
├── Exam_Complete/                     # Past exam materials
├── Lecture_Complete/                  # Lecture slides and notes
├── Seminar_Complete/                  # Seminar materials
├── mkdocs.yml                         # MkDocs configuration
└── README.md                          # This file
```

## Course Content

The textbook covers 16 chapters organized across four topic areas:

**Data and Exploration**
1. Introduction to Artificial Intelligence
2. Python Programming Tools for AI
3. Data Acquisition and Exploration
4. Data Preprocessing and Feature Engineering

**Fundamentals of Machine Learning**
5. Mathematical Foundations for Machine Learning
6. Linear Regression
7. Optimization and Gradient Descent
8. Model Evaluation for Regression

**Neural Networks**
9. Neural Network Foundations
10. Classification and Logistic Regression
11. Classification Evaluation Metrics
12. K-Nearest Neighbor Algorithm
13. Clustering and Unsupervised Learning Algorithms

**Advanced Architectures**
14. Training Neural Networks with Backpropagation
15. Convolutional Neural Networks
16. Recurrent Neural Networks and the ML Workflow

## Reporting Issues

Found a typo, content error, broken link, or have a suggestion for improvement? Please report it via GitHub Issues:

[Open an Issue](../../issues)

When reporting issues, please include:

- A clear description of the problem or suggestion
- The chapter or page where the issue occurs
- Steps to reproduce (for interactive element bugs)
- Expected vs. actual behaviour
- Browser and OS details (for MicroSim issues)

## License

This work is licensed under the [Creative Commons Attribution-NonCommercial-ShareAlike 4.0 International License](https://creativecommons.org/licenses/by-nc-sa/4.0/).

**You are free to:**

- Share — copy and redistribute the material in any medium or format
- Adapt — remix, transform, and build upon the material

**Under the following terms:**

- **Attribution** — Give appropriate credit, provide a link to the license, and indicate if changes were made
- **NonCommercial** — You may not use the material for commercial purposes without permission
- **ShareAlike** — If you remix, transform, or build upon the material, you must distribute your contributions under the same license

## Acknowledgements

This textbook is built on the shoulders of excellent open source projects:

- **[MkDocs](https://www.mkdocs.org/)** - Static site generator optimised for project documentation
- **[Material for MkDocs](https://squidfunk.github.io/mkdocs-material/)** - Beautiful, responsive theme with rich extension support
- **[KaTeX](https://katex.org/)** - Fast, server-side math rendering for LaTeX expressions
- **[Mermaid](https://mermaid.js.org/)** - Diagram and flowchart generation from markdown
- **[vis-network](https://visjs.org/)** - Network graph visualisation library used in the Learning Graph Viewer
- **[PyTorch](https://pytorch.org/)** - Open source machine learning framework by Meta AI
- **[Scikit-learn](https://scikit-learn.org/)** - Machine learning tools for Python
- **[Python](https://www.python.org/)** community - Data processing and analysis ecosystem
- **[Claude AI](https://claude.ai)** by Anthropic - AI-assisted content generation and intelligent textbook tooling
- **[GitHub Pages](https://pages.github.com/)** - Free hosting for open source educational projects

Special thanks to Dr. Qianyu Liu and the University of Nottingham Ningbo China for establishing the educational framework this textbook supports.

## Contact

**Course Instructor:** Dr. Qianyu Liu
Assistant Professor of Electrical and Electronic Engineering
University of Nottingham Ningbo China
Research: Data mining, intelligent decision making, machine learning technology and application

For questions about course content, open an issue in this repository or contact through official university channels.

## How to Cite

If you use this textbook in your research or teaching, please cite it as:

```
Liu, Q. (2024). Artificial Intelligence System - Intelligent Textbook (H63AIS).
University of Nottingham Ningbo China.
```

BibTeX:

```bibtex
@misc{h63ais-textbook-2024,
  author    = {Liu, Qianyu},
  title     = {Artificial Intelligence System -- Intelligent Textbook},
  year      = {2024},
  publisher = {University of Nottingham Ningbo China},
  note      = {H63AIS course intelligent textbook built with MkDocs}
}
```
