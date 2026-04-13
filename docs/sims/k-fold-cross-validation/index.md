---
title: K-Fold Cross-Validation Process
description: Step-through visualization of k-fold cross-validation showing fold rotation, per-fold validation errors, and the running cross-validation score average.
quality_score: 85
image: /sims/k-fold-cross-validation/k-fold-cross-validation.png
og:image: /sims/k-fold-cross-validation/k-fold-cross-validation.png
twitter:image: /sims/k-fold-cross-validation/k-fold-cross-validation.png
social:
   cards: false
---
# K-Fold Cross-Validation Process

<iframe src="main.html" height="472px" scrolling="no"></iframe>

[Run the K-Fold Cross-Validation Fullscreen](./main.html){ .md-button .md-button--primary }

Step through k-fold cross-validation one iteration at a time using Prev/Next Fold buttons, or click Animate All to play through automatically.
The fold grid shows each iteration with the validation fold highlighted in orange and training folds in blue.
The error panel on the right accumulates per-fold MSE values and displays the running average CV score.
Adjust k (3–10) to see how more folds changes the process.

## Lesson Plan

**Subject:** Model Evaluation — Cross-Validation

**Bloom Level:** Understand (L2) — Verb: *explain*

**Learning Objective:** Explain how k-fold cross-validation works by visualizing the rotation of training and validation folds across multiple iterations.

**Duration:** 8–12 minutes

**How to use in class:**
1. Start with k=5. Step through each fold manually. Ask: "Which data points are in the validation set each time?"
2. At the final summary, ask: "How many times did each point appear in a validation set?" (exactly once).
3. Change k to 3 vs. 10. Discuss the tradeoff: more folds = more computation, lower variance in the estimate.
4. Ask: "Why is CV preferred over a single train/val split?"

## References

- James et al. (2021). *An Introduction to Statistical Learning*, Section 5.1: Cross-Validation.
- scikit-learn `cross_val_score(model, X, y, cv=5)` documentation.
