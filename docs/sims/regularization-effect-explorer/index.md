---
title: Regularization Effect Explorer
description: Interactive polynomial fit with adjustable L1/L2 regularization strength, showing how increasing lambda simplifies the fitted curve and shrinks coefficient magnitudes.
quality_score: 85
image: /sims/regularization-effect-explorer/regularization-effect-explorer.png
og:image: /sims/regularization-effect-explorer/regularization-effect-explorer.png
twitter:image: /sims/regularization-effect-explorer/regularization-effect-explorer.png
social:
   cards: false
---
# Regularization Effect Explorer

<iframe src="main.html" height="502px" scrolling="no"></iframe>

[Run the Regularization Effect Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

Set a high polynomial degree (e.g., 10) and watch the curve overfit.
Then increase the λ slider to see regularization smooth the curve by shrinking coefficients.
The bar chart on the right shows each coefficient's magnitude — L1 drives them toward exactly zero, L2 shrinks them smoothly.
Toggle between L1 (Lasso) and L2 (Ridge) to compare their behavior.

## Lesson Plan

**Subject:** Model Evaluation — Regularization

**Bloom Level:** Apply (L3) — Verb: *demonstrate*

**Learning Objective:** Demonstrate how increasing the regularization strength λ simplifies the fitted model, transitioning from overfitting to underfitting.

**Duration:** 10–15 minutes

**How to use in class:**
1. Set degree=10, λ=0. Observe the wiggly overfit curve and large coefficient bars.
2. Slowly increase λ. Ask: "What happens to the coefficient bars? The curve?"
3. Switch to L1. Increase λ. Ask: "Which coefficients go to exactly zero first?"
4. Discuss: what does a zero coefficient mean in terms of feature selection?

## References

- Hastie, Tibshirani, & Friedman (2009). *The Elements of Statistical Learning*, Chapter 3: Linear Methods for Regression.
- scikit-learn `Ridge` and `Lasso` documentation.
