---
title: AI Concept Classifier Quiz
description: An interactive quiz where students classify AI and Machine Learning concepts into their correct taxonomy category, covering the full H63AIS curriculum.
image: /sims/ai-concept-classifier/ai-concept-classifier.png
og:image: /sims/ai-concept-classifier/ai-concept-classifier.png
twitter:image: /sims/ai-concept-classifier/ai-concept-classifier.png
social:
   cards: false
---

# AI Concept Classifier Quiz

<iframe src="main.html" height="532px" width="100%" scrolling="no"></iframe>

[Run the AI Concept Classifier Quiz Fullscreen](./main.html){ .md-button .md-button--primary }

## About This MicroSim

Test your ability to classify Artificial Intelligence and Machine Learning concepts into the correct category. Each question presents a description of an AI/ML concept, technique, or scenario, and you must identify which category it belongs to. The quiz draws from the full H63AIS Artificial Intelligence System curriculum, spanning data preprocessing through deep learning architectures.

### Features

- **Scenario-based questions**: Each question presents a detailed description of an AI/ML concept
- **Multiple choice format**: Select from 4 category options per question
- **Hint system**: Get a hint if you're stuck (reduces points from 10 to 5)
- **Detailed explanations**: Learn why each answer belongs to its category after responding
- **Score tracking**: Earn 10 points for correct answers (5 with hint)
- **Encouraging feedback**: Supportive messages whether right or wrong
- **Randomized order**: 10 questions randomly selected from a pool of 30 each time

### Categories Covered

| Category | Description |
|----------|-------------|
| **Neural Networks** | Perceptron, activation functions, fully connected networks, forward pass, backpropagation |
| **Deep Learning Architectures** | CNN layers, RNN/LSTM, advanced architectures, model deployment |
| **Optimization** | Gradient descent variants, learning rate, convergence, regularization |
| **Model Evaluation** | Metrics, confusion matrix, ROC/AUC, overfitting, model selection |
| **Classification** | Logistic regression, sigmoid/softmax, KNN, decision boundaries |
| **Clustering** | K-Means, DBSCAN, centroids, density-based grouping |
| **Data Preprocessing** | Data cleaning, normalization, feature engineering, EDA |
| **Data Acquisition** | Datasets, annotation, benchmarks, data augmentation |
| **Linear Regression** | Linear models, normal equation, loss functions, residuals |
| **Linear Algebra and Math** | Matrix operations, probability distributions, statistical foundations |

## Embedding This MicroSim

You can include this MicroSim on your website using the following `iframe`:

```html
<iframe src="main.html"
        height="532px"
        width="100%"
        scrolling="no">
</iframe>
```

## Lesson Plan

### Learning Objectives

By completing this quiz, students will be able to:

1. **Identify** the correct taxonomy category for core AI/ML concepts
2. **Distinguish** between closely related categories (e.g., Optimization vs. Model Evaluation)
3. **Explain** why specific concepts belong to particular categories in the ML pipeline
4. **Apply** categorical thinking to organize their understanding of the AI/ML landscape

### Bloom's Taxonomy Level

This activity primarily addresses **Application (Level 3)** - students must apply their knowledge of the AI/ML taxonomy to classify concept descriptions they haven't seen in this exact form before.

### Pre-Quiz Discussion (5 minutes)

Before starting the quiz, discuss:

- What are the major stages of the Machine Learning pipeline?
- How do we distinguish between model-building concepts and model-evaluation concepts?
- What separates neural network fundamentals from specific deep learning architectures?

### Quiz Activity (15-20 minutes)

1. Have students complete the quiz individually
2. Encourage them to use the "Show Hint" feature only after careful consideration
3. Ask them to read each explanation carefully after answering

### Post-Quiz Reflection (10 minutes)

Discussion questions:

1. Which categories were hardest to distinguish? Why?
2. Where in the ML pipeline does each category fit?
3. How does understanding these categories help you organize your study of AI?
4. Can you think of concepts that might reasonably fit in two categories?

### Extension Activity

Have students create their own concept descriptions for each category and challenge classmates to classify them correctly.

## Technical Details

- **Framework**: p5.js 1.11.10
- **Data Format**: 30 questions stored in `data.json` for easy editing
- **Canvas Size**: 800x530 pixels (responsive width)
- **Accessibility**: Includes screen reader description

## Customizing Questions

The quiz questions are stored in `data.json` and can be easily modified. Each scenario includes:

```json
{
  "id": 1,
  "scenario": "Description of the AI/ML concept...",
  "correctAnswer": "Name of the correct category",
  "options": ["Option 1", "Option 2", "Option 3", "Option 4"],
  "explanation": "Why this answer is correct...",
  "hint": "A helpful hint for students..."
}
```

To add new scenarios, simply add new objects to the `scenarios` array in `data.json`.
