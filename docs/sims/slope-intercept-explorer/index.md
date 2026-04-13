---
title: Slope and Intercept Explorer
description: Interactive visualization for adjusting slope and intercept of a linear model, with real-time residual lines and SSE display.
quality_score: 85
image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
og:image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
twitter:image: /sims/slope-intercept-explorer/slope-intercept-explorer.png
social:
   cards: false
---
# Slope and Intercept Explorer

<iframe src="main.html" height="482px" scrolling="no"></iframe>

[Run the Slope and Intercept Explorer Fullscreen](./main.html){ .md-button .md-button--primary }

Drag the slope (θ₁) and intercept (θ₀) sliders to move the regression line across the scatter plot.
Toggle residual lines to see the vertical distance from each point to the line.
Watch the SSE (Sum of Squared Errors) update in real time — try to minimize it by finding the best-fitting line.

## Lesson Plan

**Subject:** Linear Regression — Slope and Intercept

**Bloom Level:** Apply (L3) — Verb: *demonstrate*

**Learning Objective:** Demonstrate how adjusting the slope and intercept of a linear model changes the regression line and its fit to data points.

**Duration:** 8–12 minutes

**How to use in class:**
1. Start with slope = 0. Ask: "What does a flat line predict?"
2. Increase slope until SSE starts to decrease.
3. Enable residuals. Ask: "What do long residual lines tell us?"
4. Challenge: Can you get SSE below 10? What are your best θ₀ and θ₁?

## References

- James, G., Witten, D., Hastie, T., & Tibshirani, R. (2021). *An Introduction to Statistical Learning*, Chapter 3.
- scikit-learn `LinearRegression` documentation.
