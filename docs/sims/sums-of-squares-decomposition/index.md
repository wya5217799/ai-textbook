---
title: Sums of Squares Decomposition
description: Interactive visualization of SST, SSR, and SSE showing how total variability in regression is decomposed into explained and unexplained parts.
quality_score: 85
image: /sims/sums-of-squares-decomposition/sums-of-squares-decomposition.png
og:image: /sims/sums-of-squares-decomposition/sums-of-squares-decomposition.png
twitter:image: /sims/sums-of-squares-decomposition/sums-of-squares-decomposition.png
social:
   cards: false
---
# Sums of Squares Decomposition

<iframe src="main.html" height="462px" scrolling="no"></iframe>

[Run the Sums of Squares Decomposition Fullscreen](./main.html){ .md-button .md-button--primary }

Click any data point to see its individual SST, SSR, and SSE contributions displayed in a detail panel.
Use the highlight buttons to emphasize just one component across all points.
The stacked bar chart on the right shows the proportion SSR (explained) vs SSE (unexplained) of the total SST.

## Lesson Plan

**Subject:** Linear Regression — Sums of Squares

**Bloom Level:** Analyze (L4) — Verb: *differentiate*

**Learning Objective:** Differentiate between Sum of Squares Total, Sum of Squares Error, and Sum of Squares Regression by visualizing how each measures a different component of variability.

**Duration:** 10–15 minutes

**How to use in class:**
1. Click "Highlight SST" — blue lines show each point's total deviation from the mean.
2. Click "Highlight SSR" — green lines show how much of that deviation the model explains.
3. Click "Highlight SSE" — red lines show what the model fails to explain.
4. Click an individual point and verify: SST = SSR + SSE for that point.
5. Discuss: what does R² = SSR/SST tell us?

## References

- Montgomery, D. C., Peck, E. A., & Vining, G. G. (2012). *Introduction to Linear Regression Analysis*, Section 2.4.
- James et al. (2021). *An Introduction to Statistical Learning*, Chapter 3.
