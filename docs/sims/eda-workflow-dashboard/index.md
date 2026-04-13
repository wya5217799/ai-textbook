---
title: EDA Workflow Dashboard
description: Interactive 7-stage exploratory data analysis walkthrough on a sensor dataset covering load, shape, stats, missing values, distribution, correlation, and insights.
sim_id: eda-workflow-dashboard
chapter: 03-data-acquisition
library: p5.js
bloom_level: Understand
---

# EDA Workflow Dashboard

<iframe src="main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This MicroSim walks through the 7 stages of Exploratory Data Analysis (EDA) on a small sensor dataset (8 rows, 5 columns). Each stage reveals a different analytical lens:

| Stage | Name | What You See |
|-------|------|-------------|
| 0 | Load Data | Raw tabular data with column headers |
| 1 | Check Shape | Row/column count and data types |
| 2 | Summary Statistics | Min, max, mean, std with outlier highlights |
| 3 | Missing Values | Heatmap of NaN cells |
| 4 | Distribution | Histogram of temperature readings |
| 5 | Correlation | Heatmap showing feature correlations |
| 6 | Insights | Key findings from the EDA |

Step through each stage with the **Next / Prev** buttons. A progress bar shows your position in the workflow.

## Learning Objective

Explain the purpose of each step in an EDA workflow and describe what information each stage reveals about a dataset. (Bloom Level: Understand / explain)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Explore | Step through all 7 stages once; read the stage label and description. | 3 min |
| Analyze | Return to Stage 2 (Summary Stats) — which column shows the highest std dev? | 2 min |
| Predict | Before moving to Stage 3, predict which cells might be missing based on Stage 0. | 2 min |
| Discuss | Why does EDA precede model training? What could go wrong if we skip any stage? | 3 min |

## References

- Tukey, J. W. (1977). *Exploratory Data Analysis*. Addison-Wesley.
- Wickham, H., & Grolemund, G. (2017). *R for Data Science* (Chapter 7: EDA). O'Reilly.
