---
title: Model Complexity vs. Fit Quality
description: Interactive polynomial degree explorer showing underfitting, good fit, and overfitting on a noisy quadratic dataset.
quality_score: 85
image: /sims/model-complexity-fit/model-complexity-fit.png
og:image: /sims/model-complexity-fit/model-complexity-fit.png
twitter:image: /sims/model-complexity-fit/model-complexity-fit.png
social:
   cards: false
---
# Model Complexity vs. Fit Quality

<iframe src="main.html" height="462px" scrolling="no"></iframe>

[Run the Model Complexity MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

Adjust the polynomial degree slider to fit curves of increasing complexity to a noisy dataset.
Observe how degree 1 underfits (misses the true curve), degree 2–3 achieves a good fit,
and degree 10+ overfits by chasing noise. The dashed gray line shows the true underlying function.
Click "New Data" to regenerate the dataset and verify that overfitting produces inconsistent results.

## Lesson Plan

**Subject:** Math Foundations for Machine Learning — Model Complexity

**Bloom Level:** Understand (L2) — Verb: *explain*

**Learning Objective:** Explain how increasing model complexity affects the fit to training data, illustrating the concepts of underfitting, good fit, and overfitting.

**Duration:** 8–12 minutes

**How to use in class:**
1. Set degree = 1. Ask: "Can a straight line capture this curved data?" (No — underfitting).
2. Set degree = 2. Observe the curve matches the true function shape.
3. Set degree = 12. Ask: "Does this curve generalize? Click 'New Data' and watch."
4. Discuss: why does lower training MSE not always mean a better model?

## References

- Hastie, T., Tibshirani, R., & Friedman, J. (2009). *The Elements of Statistical Learning*, Chapter 7: Model Assessment and Selection.
- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*, Section 1.1.
