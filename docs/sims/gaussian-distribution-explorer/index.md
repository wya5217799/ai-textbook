---
title: Gaussian Distribution Explorer
description: Interactive parameter explorer for the Gaussian (normal) distribution — adjust mean and standard deviation to see the bell curve update in real time.
quality_score: 85
image: /sims/gaussian-distribution-explorer/gaussian-distribution-explorer.png
og:image: /sims/gaussian-distribution-explorer/gaussian-distribution-explorer.png
twitter:image: /sims/gaussian-distribution-explorer/gaussian-distribution-explorer.png
social:
   cards: false
---
# Gaussian Distribution Explorer

<iframe src="main.html" height="472px" scrolling="no"></iframe>

[Run the Gaussian Distribution Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

Adjust the mean (μ) and standard deviation (σ) sliders to see how the bell curve changes shape and position.
Enable the "68-95-99.7 rule shading" checkbox to visualize the proportion of values within 1, 2, and 3 standard deviations of the mean.

## Lesson Plan

**Subject:** Math Foundations for Machine Learning — Probability Distributions

**Bloom Level:** Apply (L3) — Verb: *demonstrate*

**Learning Objective:** Demonstrate how changing the mean and variance parameters of a Gaussian distribution affects its shape and spread.

**Duration:** 8–12 minutes

**How to use in class:**
1. Ask: "What happens to the curve when you increase σ?" (becomes wider and shorter — same area = 1).
2. Ask: "What happens when you change μ?" (curve shifts left/right without changing shape).
3. Enable shading. Verify that ~68% of the area falls within 1σ of the mean.
4. Set σ = 0.5, then σ = 3. Discuss which represents more uncertainty in a model's errors.

## References

- Bishop, C. M. (2006). *Pattern Recognition and Machine Learning*, Section 1.2.
- [SciPy stats.norm documentation](https://docs.scipy.org/doc/scipy/reference/generated/scipy.stats.norm.html)
