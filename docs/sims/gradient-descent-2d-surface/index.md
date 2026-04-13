---
title: Gradient Descent on a 2D Surface
description: Interactive contour plot where students click to set a starting point and watch gradient descent trace a path to the minimum of a bowl-shaped cost function.
quality_score: 85
image: /sims/gradient-descent-2d-surface/gradient-descent-2d-surface.png
og:image: /sims/gradient-descent-2d-surface/gradient-descent-2d-surface.png
twitter:image: /sims/gradient-descent-2d-surface/gradient-descent-2d-surface.png
social:
   cards: false
---
# Gradient Descent on a 2D Surface

<iframe src="main.html" height="492px" scrolling="no"></iframe>

[Run the Gradient Descent 2D Surface Fullscreen](./main.html){ .md-button .md-button--primary }

Click anywhere on the contour plot to set the starting point for gradient descent.
Use Run/Pause to animate the descent, or Step to advance one iteration at a time.
The green arrow shows the negative gradient direction. The yellow trail shows the path taken.
Adjust the learning rate slider to observe convergence, oscillation, or divergence.

## Lesson Plan

**Subject:** Optimization — Gradient Descent

**Bloom Level:** Apply (L3) — Verb: *demonstrate*

**Learning Objective:** Demonstrate how gradient descent iteratively moves parameters toward the minimum of a cost function by following the negative gradient.

**Duration:** 10–15 minutes

**How to use in class:**
1. Click far from the origin (e.g., top-right corner). Set α = 0.1. Run. Observe the smooth descent.
2. Reset. Increase α to 0.9. Observe oscillation.
3. Decrease α to 0.01. Observe very slow convergence.
4. Discuss: why do elliptical contours cause the path to zigzag at high learning rates?

## References

- Ruder, S. (2016). *An overview of gradient descent optimization algorithms*. arXiv:1609.04747.
- Goodfellow et al. (2016). *Deep Learning*, Chapter 8: Optimization for Training Deep Models.
