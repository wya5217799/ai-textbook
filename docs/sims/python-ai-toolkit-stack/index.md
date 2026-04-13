---
title: Python AI Toolkit Stack
description: Interactive layered stack diagram of the Python AI ecosystem showing how NumPy, Pandas, Matplotlib, PyTorch and Scikit-learn depend on each other.
sim_id: python-ai-toolkit-stack
chapter: 02-python-tools
library: p5.js
bloom_level: Understand
---

# Python AI Toolkit Stack

<iframe src="main.html" width="100%" height="482px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This layered stack diagram shows the Python AI ecosystem from bottom (foundation) to top (ML frameworks):

- **Python 3.x** — Foundation: the language everything else is built on
- **NumPy** — Numerical computing: n-dimensional arrays used by all layers above
- **Pandas / Matplotlib** — Data manipulation and visualization, both built on NumPy
- **PyTorch / Scikit-learn** — Deep learning and classical ML frameworks, also NumPy-based
- **Jupyter Notebook** — Development environment spanning all layers (shown as a side panel)

**Hover** any block to read its one-line role description. **Click** to highlight its full dependency chain (everything it depends on, and everything that depends on it).

## Learning Objective

Classify the Python AI toolkit into layers and understand the dependency relationships between them. (Bloom Level: Understand / classify)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Explore | Hover each block; read the role tooltip. | 3 min |
| Click | Click PyTorch — which layers light up? Click NumPy. | 2 min |
| Discuss | Why does everything depend on NumPy? What would break without it? | 3 min |

## References

- Harris, C. R. et al. (2020). Array programming with NumPy. *Nature*, 585, 357–362.
- McKinney, W. (2010). Data Structures for Statistical Computing in Python. *Proc. SciPy*.
- Paszke, A. et al. (2019). PyTorch: An Imperative Style Deep Learning Library. *NeurIPS*.
