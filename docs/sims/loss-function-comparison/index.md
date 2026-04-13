---
title: Loss Function Comparison
description: Interactive chart comparing squared loss, absolute loss, and cross-entropy loss functions, showing how they respond differently to prediction errors.
quality_score: 85
image: /sims/loss-function-comparison/loss-function-comparison.png
og:image: /sims/loss-function-comparison/loss-function-comparison.png
twitter:image: /sims/loss-function-comparison/loss-function-comparison.png
social:
   cards: false
---
# Loss Function Comparison

<iframe src="main.html" height="492px" scrolling="no"></iframe>

[Run the Loss Function Comparison MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

Toggle each loss function on or off with the checkboxes.
Move the slider to position the indicator line and read off the exact loss value for each function at that error level.
Notice how squared loss grows much faster than absolute loss for large errors, while cross-entropy loss penalizes confident wrong predictions most severely.

## Lesson Plan

**Subject:** Math Foundations for Machine Learning — Loss Functions

**Bloom Level:** Analyze (L4) — Verb: *compare*

**Learning Objective:** Compare how squared loss, absolute loss, and cross-entropy loss respond differently to prediction errors of various magnitudes.

**Duration:** 10–15 minutes

**How to use in class:**
1. Show all three curves. Ask: "Which loss penalizes a large error most heavily?"
2. Move the slider to error = 0.5. Which loss is larger — squared or absolute?
3. Move the slider to error = 2.0. Which is larger now? Why does this matter for outliers?
4. Discuss: when would you prefer absolute loss over squared loss in practice?

## References

- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*, Section 5.5: Maximum Likelihood Estimation.
- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning*, Chapter 2.
