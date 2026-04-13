---
title: Benchmark Dataset Explorer
description: Side-by-side interactive explorer of MNIST and ImageNet benchmark datasets with shuffleable example images and statistics cards.
sim_id: benchmark-dataset-explorer
chapter: 03-data-acquisition
library: p5.js
bloom_level: Remember
---

# Benchmark Dataset Explorer

<iframe src="main.html" width="100%" height="522px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This MicroSim presents MNIST and ImageNet side by side with 3×3 grids of example images and statistics cards.

**MNIST panel:**
- 9 rendered digit images (0–9), each 8×8 pixel pattern
- Toggle "Show MNIST pixel values" to overlay numerical grayscale values
- Hover any image to see its digit label
- "Shuffle MNIST" regenerates the display examples

**ImageNet panel:**
- 9 category placeholders with colored textures and labels
- Hover any image to see the full category name
- "Shuffle ImageNet" cycles through different categories

Both panels display key dataset statistics: sample counts, image dimensions, and historical significance.

## Learning Objective

Identify the key characteristics of MNIST and ImageNet benchmark datasets including sample sizes, image dimensions, and classification categories. (Bloom Level: Remember / identify)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Explore | Read both statistics cards; compare sample counts and image sizes. | 3 min |
| Toggle | Enable "Show MNIST pixel values" — what range do the values span? | 2 min |
| Recall | Without looking: how many training samples does MNIST have? How many ImageNet classes? | 2 min |

## References

- LeCun, Y. et al. (1998). Gradient-Based Learning Applied to Document Recognition. *Proc. IEEE*.
- Deng, J. et al. (2009). ImageNet: A Large-Scale Hierarchical Image Database. *CVPR*.
- Krizhevsky, A., Sutskever, I., & Hinton, G. (2012). ImageNet Classification with Deep CNNs. *NeurIPS*.
