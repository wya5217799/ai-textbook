---
title: Image Augmentation Gallery
description: Interactive real-time image augmentation explorer showing six transform types applied to a digit image with adjustable intensity.
sim_id: image-augmentation-gallery
chapter: 03-data-acquisition
library: p5.js
bloom_level: Apply
---

# Image Augmentation Gallery

<iframe src="main.html" width="100%" height="537px" scrolling="no"></iframe>

[View Fullscreen](main.html){ .md-button }

## Description

This MicroSim shows an original digit "7" on the left and a real-time augmented version on the right. Six augmentation transforms are available:

| Transform | Control | Effect |
|-----------|---------|--------|
| Rotate | Angle slider (−45° to +45°) | Geometric rotation |
| Flip Horizontal | Toggle (0/1) | Mirror image left-right |
| Scale | Factor slider (0.5× to 1.5×) | Zoom in or out |
| Brightness | Factor slider (0.3× to 1.7×) | Darken or lighten |
| Add Noise | Std Dev slider (0–80) | Random pixel noise |
| Crop | Margin slider (0–30%) | Crop and rescale |

Note that the label "7" is preserved after every transform — this is the key property of data augmentation.

**Select** a transform from the dropdown, **drag the slider** to adjust intensity, **click Random Augment** for a surprise combination, or **Reset** to return to the original.

## Learning Objective

Apply common data augmentation transformations to an image and observe how each modifies the visual content while preserving the class label. (Bloom Level: Apply / apply)

## Lesson Plan

| Phase | Activity | Duration |
|-------|----------|----------|
| Explore | Try each augmentation type at its default intensity; read the applied parameters. | 4 min |
| Experiment | Set Rotate to −45° then +45°. Does the label "7" still make sense? | 2 min |
| Predict | Before moving the Brightness slider to 0.3×, predict what the image will look like. | 2 min |
| Discuss | Which augmentations could be harmful for some digit classes? (e.g., flip 6 → 9) | 2 min |

## References

- Shorten, C., & Khoshgoftaar, T. M. (2019). A survey on image data augmentation for deep learning. *Journal of Big Data*, 6(1), 1–48.
- Simard, P. Y. et al. (2003). Best practices for convolutional neural networks. *ICDAR*.
