---
title: Learning Rate Effect Explorer
description: Three-panel side-by-side comparison showing gradient descent with slow, fast, and diverging learning rates on the same 1D cost function.
quality_score: 85
image: /sims/learning-rate-effect-explorer/learning-rate-effect-explorer.png
og:image: /sims/learning-rate-effect-explorer/learning-rate-effect-explorer.png
twitter:image: /sims/learning-rate-effect-explorer/learning-rate-effect-explorer.png
social:
   cards: false
---
# Learning Rate Effect Explorer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Learning Rate Effect Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

Three panels run gradient descent simultaneously with three different learning rates on J(θ) = (θ−3)².
Adjust each α slider independently, then click Run All to observe convergence, slow descent, and divergence in parallel.
The cost vs. iteration chart at the bottom shows all three trajectories together for direct comparison.

## Lesson Plan

**Subject:** Optimization — Learning Rate

**Bloom Level:** Analyze (L4) — Verb: *examine*

**Learning Objective:** Examine how different learning rate values affect the convergence behavior of gradient descent, distinguishing between convergence, slow convergence, oscillation, and divergence.

**Duration:** 10–15 minutes

**How to use in class:**
1. Run with defaults (α = 0.05, 0.45, 0.95). Ask: "Which converges fastest? Which overshoots?"
2. Set all three to α = 0.5. Step through — observe all behave similarly.
3. Set α₃ = 1.0 or higher. Watch divergence. Ask: "What update rule causes this?"
4. Discuss: in practice, how do you find a good learning rate?

## References

- Goodfellow et al. (2016). *Deep Learning*, Section 8.3: Basic Algorithms.
- Smith, L. N. (2017). Cyclical Learning Rates for Training Neural Networks. *WACV 2017*.
