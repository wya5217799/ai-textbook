---
title: Normal Equation Step-Through
description: Guided 7-stage walkthrough of the normal equation θ = (XᵀX)⁻¹Xᵀy on a tiny 4-point dataset, showing every matrix operation with concrete numbers.
quality_score: 85
image: /sims/normal-equation-step-through/normal-equation-step-through.png
og:image: /sims/normal-equation-step-through/normal-equation-step-through.png
twitter:image: /sims/normal-equation-step-through/normal-equation-step-through.png
social:
   cards: false
---
# Normal Equation Step-Through

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Normal Equation Step-Through Fullscreen](./main.html){ .md-button .md-button--primary }

Click Next to advance through all 7 stages of the normal equation computation:
raw data → design matrix → Xᵀ → XᵀX → (XᵀX)⁻¹ → Xᵀy → θ → regression plot.
Every matrix operation is shown with the actual numbers from the current dataset.
Click "Randomize Data" to generate a new dataset and verify the process generalizes.

## Lesson Plan

**Subject:** Linear Regression — Normal Equation

**Bloom Level:** Apply (L3) — Verb: *execute*

**Learning Objective:** Execute the normal equation computation step by step on a small dataset to obtain the optimal parameter vector for linear regression.

**Duration:** 12–18 minutes

**How to use in class:**
1. Work through stages 1–3 — pause at XᵀX and ask students to verify one element by hand.
2. At stage 4 (inverse), recall the 2×2 inverse formula and verify the determinant.
3. At stage 6, have students compute the matrix-vector product manually and compare.
4. At stage 7, verify the regression line visually matches the data scatter.

## References

- Normal equation derivation: Ng, A. (2012). CS229 Lecture Notes, Section 1.3.
- NumPy: `np.linalg.lstsq(X, y)` for numerically stable version.
