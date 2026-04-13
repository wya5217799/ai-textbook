---
title: Matplotlib Plot Gallery
description: Interactive 2x3 gallery of six common Matplotlib plot types used in ML, with hover tooltips and click-to-expand use-case details.
sim_id: matplotlib-plot-gallery
chapter: 02-python-tools
library: p5.js
bloom_level: Remember
---

# Matplotlib Plot Gallery

<iframe src="main.html" width="100%" height="492px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This gallery presents six essential Matplotlib plot types used throughout ML projects:

| Plot | Function | Primary Use |
|------|----------|-------------|
| Line Plot | `plt.plot()` | Training loss over epochs |
| Scatter Plot | `plt.scatter()` | Feature correlations, predictions vs actual |
| Histogram | `plt.hist()` | Feature distributions |
| Bar Chart | `plt.bar()` | Comparing model accuracy |
| Heatmap | `plt.imshow()` | Confusion matrices, correlation matrices |
| Subplots | `plt.subplots()` | Multi-view analysis |

**Hover** any panel to see its use cases. **Click** to expand the detail panel showing when to use that plot type.

## Learning Objective

Identify the correct Matplotlib plot type for common ML visualisation tasks. (Bloom Level: Remember / identify)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Identify | Hover each panel and read the `plt.*` function name. | 3 min |
| Match | For each scenario below, which plot would you use? (a) Show model accuracy for 4 algorithms (b) Inspect feature distribution (c) Visualise confusion matrix | 3 min |
| Apply | In a Jupyter notebook, reproduce one panel using real Matplotlib code. | 4 min |

## References

- Hunter, J. D. (2007). Matplotlib: A 2D Graphics Environment. *Computing in Science & Engineering*, 9(3), 90–95.
- Matplotlib documentation: https://matplotlib.org/stable/gallery/
