---
title: GD Variants Comparison
description: Interactive 2D contour plot showing Batch GD, SGD, and Mini-batch GD running simultaneously, comparing their path smoothness, convergence speed, and noise levels.
quality_score: 85
image: /sims/gd-variants-comparison/gd-variants-comparison.png
og:image: /sims/gd-variants-comparison/gd-variants-comparison.png
twitter:image: /sims/gd-variants-comparison/gd-variants-comparison.png
social:
   cards: false
---
# GD Variants Comparison

<iframe src="main.html" height="512px" scrolling="no"></iframe>

[Run the GD Variants Comparison Fullscreen](./main.html){ .md-button .md-button--primary }

All three gradient descent variants start from the same point and descend simultaneously on J(θ₀,θ₁) = θ₀² + 2θ₁².
Blue (Batch GD) takes smooth, exact steps. Red (SGD) follows a noisy, erratic path. Green (Mini-batch) is a compromise.
Adjust the learning rate and mini-batch size B, then observe how paths and the cost chart change.

## Lesson Plan

**Subject:** Optimization — Gradient Descent Variants

**Bloom Level:** Analyze (L4) — Verb: *compare*

**Learning Objective:** Compare the convergence trajectories of batch gradient descent, stochastic gradient descent, and mini-batch gradient descent on the same optimization problem.

**Duration:** 10–15 minutes

**How to use in class:**
1. Run with default settings. Ask: "Which variant has the smoothest path? Why?"
2. Increase B from 4 to 16. Ask: "What happens to the mini-batch path?"
3. Lower learning rate to 0.05. Compare how long each takes to reach the minimum.
4. Discuss: why does modern deep learning use mini-batch rather than batch or SGD?

## References

- Goodfellow et al. (2016). *Deep Learning*, Section 8.1: How Learning Differs from Optimization.
- Ruder, S. (2016). *An overview of gradient descent optimization algorithms*. arXiv:1609.04747.
