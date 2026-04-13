---
title: Matrix Representation in Machine Learning
description: Interactive visualization showing how datasets, parameters, and predictions map to matrix structures in machine learning.
quality_score: 85
image: /sims/matrix-representation-ml/matrix-representation-ml.png
og:image: /sims/matrix-representation-ml/matrix-representation-ml.png
twitter:image: /sims/matrix-representation-ml/matrix-representation-ml.png
social:
   cards: false
---
# Matrix Representation in Machine Learning

<iframe src="main.html" height="472px" scrolling="no"></iframe>

[Run the Matrix Representation MicroSim Fullscreen](./main.html){ .md-button .md-button--primary }

This MicroSim shows how a tabular dataset maps to matrix notation used in machine learning.
Toggle between "Dataset View" and "Matrix View" to see how the data table transforms into
the feature matrix **X**, weight vector **θ**, and prediction vector **ŷ**.
Hover over individual cells in dataset view to see their matrix index notation a_ij.

## Lesson Plan

**Subject:** Math Foundations for Machine Learning — Matrix Representation

**Bloom Level:** Understand (L2) — Verb: *interpret*

**Learning Objective:** Interpret how datasets, parameters, and predictions map to matrix structures in machine learning.

**Duration:** 5–10 minutes

**How to use in class:**
1. Open the sim in Dataset View. Ask students: "What does each row represent? Each column?"
2. Toggle to Matrix View. Point out how the same numbers appear in matrix notation.
3. Ask: "If our dataset has 100 samples and 5 features, what is the shape of X?"
4. Discuss the equation ŷ = Xθ and what each colored symbol represents.

## References

- Goodfellow, I., Bengio, Y., & Courville, A. (2016). *Deep Learning*, Chapter 2: Linear Algebra.
- NumPy documentation: [numpy.org](https://numpy.org/doc/stable/)
