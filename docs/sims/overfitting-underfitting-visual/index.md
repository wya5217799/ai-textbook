---
title: Overfitting vs. Underfitting Visual
description: Polynomial fit explorer with training and validation MSE display, showing the transition from underfitting through good fit to overfitting as polynomial degree increases.
quality_score: 85
image: /sims/overfitting-underfitting-visual/overfitting-underfitting-visual.png
og:image: /sims/overfitting-underfitting-visual/overfitting-underfitting-visual.png
twitter:image: /sims/overfitting-underfitting-visual/overfitting-underfitting-visual.png
social:
   cards: false
---
# Overfitting vs. Underfitting Visual

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Overfitting vs. Underfitting Visual Fullscreen](./main.html){ .md-button .md-button--primary }

Slide the polynomial degree to see the fitted curve change from underfitting (degree 1–2) through a good fit (degree 3–5) to overfitting (degree 6+).
Blue circles are training points; orange triangles are held-out validation points.
The dashed gray curve shows the true underlying cubic function.
Watch how training MSE keeps dropping while validation MSE rises at high degrees.

## Lesson Plan

**Subject:** Model Evaluation — Overfitting and Underfitting

**Bloom Level:** Understand (L2) — Verb: *compare*

**Learning Objective:** Compare the visual characteristics of underfitting, good fitting, and overfitting models by observing how polynomial curves of different degrees fit noisy data.

**Duration:** 8–12 minutes

**How to use in class:**
1. Start at degree 1. Ask: "Does the line capture the curved trend?" (No — underfitting.)
2. Move to degree 3. Ask: "Does it follow the dashed true function?" (Yes — good fit.)
3. Move to degree 15. Ask: "Does it generalize to the orange validation points?" (No — overfitting.)
4. Click "New Data" twice. Observe that the overfit curve changes drastically — high variance.

## References

- Hastie, Tibshirani, & Friedman (2009). *The Elements of Statistical Learning*, Chapter 7.
- James et al. (2021). *An Introduction to Statistical Learning*, Chapter 2.
