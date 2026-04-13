---
title: NumPy Array Operations Explorer
description: Interactive step-through showing how NumPy computes element-wise, matrix multiply, transpose, and broadcasting operations on concrete 2x2 arrays.
sim_id: numpy-array-operations
chapter: 02-python-tools
library: p5.js
bloom_level: Apply
---

# NumPy Array Operations Explorer

<iframe src="main.html" width="100%" height="502px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This MicroSim shows arrays **A = [[1,2],[3,4]]** and **B = [[5,6],[7,8]]** and lets you trace five NumPy operations cell by cell:

1. **Element-wise Add** — `np.add(A, B)`
2. **Element-wise Multiply** — `np.multiply(A, B)`
3. **Matrix Multiply** — `np.dot(A, B)`
4. **Transpose** — `A.T`
5. **Broadcasting Add** — `A + [10, 20]`

**Select** an operation from the dropdown, then press **Step ▶** to advance one cell at a time. Each step highlights the source cells and shows the exact arithmetic formula. Press **Show All** to reveal the complete result, or **Reset** to start over.

## Learning Objective

Demonstrate how NumPy array operations work by visualising the step-by-step computation on concrete numerical examples. (Bloom Level: Apply / demonstrate)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Explore | Step through Element-wise Add; verify each cell manually. | 3 min |
| Compare | Switch to Matrix Multiply — notice which cells are combined. | 3 min |
| Predict | Before clicking Step, predict the result of Broadcasting Add. | 2 min |
| Discuss | Why does broadcasting work? What rule does NumPy follow? | 2 min |

## References

- Harris, C. R. et al. (2020). Array programming with NumPy. *Nature*, 585, 357–362.
- NumPy documentation: https://numpy.org/doc/stable/
