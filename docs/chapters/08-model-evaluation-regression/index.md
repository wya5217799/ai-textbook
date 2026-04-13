---
title: 回归模型评估
description: 过拟合、欠拟合、正则化、交叉验证与偏差-方差权衡
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 回归模型评估（Model Evaluation for Regression）

## 概述

本章涵盖评估机器学习模型在未见数据上表现的核心技术。学生将学习 overfitting（过拟合）和 underfitting（欠拟合），以及 L1 regularization（L1 正则化）、L2 regularization（L2 正则化）和 early stopping（早停）等正则化方法如何控制模型复杂度。本章还介绍 cross-validation（交叉验证）作为一种稳健的评估策略，并解释支配模型泛化能力的 bias-variance tradeoff（偏差-方差权衡）。学完本章后，学生将能够诊断模型性能问题并应用相应的改进措施。

## 涵盖的概念

本章涵盖学习图中以下 11 个概念：

1. Overfitting（过拟合）
2. Underfitting（欠拟合）
3. Regularization（正则化）
4. L1 Regularization（L1 正则化）
5. L2 Regularization（L2 正则化）
6. Early Stopping（早停）
7. Cross-validation（交叉验证）
8. Generalization（泛化）
9. Training Error（训练误差）
10. Validation Error（验证误差）
11. Bias-Variance Tradeoff（偏差-方差权衡）

## 先修知识

本章建立在以下章节概念的基础上：

- [第 4 章：数据预处理与特征工程](../04-data-preprocessing/index.md)
- [第 5 章：机器学习的数学基础](../05-math-foundations/index.md)
- [第 6 章：线性回归](../06-linear-regression/index.md)

---

## 为什么模型评估至关重要

训练机器学习模型只是挑战的一半。真正的考验是模型在从未见过的数据上能否表现良好。一个完美记忆训练数据却在新样本上失效的模型在实践中毫无用处。本章回答这个根本问题：我们如何知道我们的模型能否泛化？

## Generalization（泛化）：机器学习的目标

**Generalization（泛化）**是指已训练模型在新的、之前未见过的数据上表现良好的能力。机器学习的全部意义在于泛化——从训练数据中学习可以迁移到真实世界的规律。一个在训练集上误差极低、在新数据上误差极高的模型，意味着泛化失败。

**training error（训练误差）**与**validation error（验证误差）**之间的区别是理解泛化的核心：

- **Training error（训练误差）**是在用于训练模型的同一数据上计算的损失，衡量模型对训练数据的拟合程度。
- **Validation error（验证误差）**是在未参与训练的独立留出数据集上计算的损失，估计模型在全新数据上的性能。

泛化能力好的模型，training error 和 validation error 都低且彼此接近。当这两个量显著分离时，说明出现了问题。

| 场景 | Training Error | Validation Error | 诊断 |
|-----|--------------|----------------|-----|
| 两者均低且接近 | 低 | 低 | 泛化良好 |
| 训练低，验证高 | 低 | 高 | Overfitting（过拟合） |
| 两者均高 | 高 | 高 | Underfitting（欠拟合） |
| 训练高，验证低 | 高 | 低 | 数据泄漏（罕见，问题严重） |

## Overfitting（过拟合）：模型记住了数据

**Overfitting（过拟合）**发生在模型过度学习训练数据时，不仅捕捉了真实的潜在规律，还记住了该特定数据集特有的噪声和随机波动。过拟合模型的 training error 低，但 validation error 高。

过拟合的常见原因包括：

- **模型复杂度过高**：参数数量相对于训练数据量过多，模型可以记忆每个训练样本
- **训练数据过少**：样本稀少时，复杂模型容易精确拟合每个点
- **训练时间过长**：在 gradient descent 等迭代方法中，模型最初学习通用规律，若训练持续太久则开始拟合噪声

过拟合的表现：

- 验证误差开始增大，而训练误差继续下降
- 模型在测试数据上的表现明显差于训练数据
- 预测结果对输入的细微变化极为敏感

#### 图示：Overfitting 与 Underfitting 可视化

<iframe src="../../sims/overfitting-underfitting-visual/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Overfitting vs. Underfitting Visual</summary>
Type: microsim
**sim-id:** overfitting-underfitting-visual<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare
Learning Objective: Compare the visual characteristics of underfitting, good fitting, and overfitting models by observing how polynomial curves of different degrees fit noisy data.

Purpose: Three-panel display showing the same data fitted with three polynomial models of increasing complexity: underfitting (degree 1), good fit (degree 3), and overfitting (degree 15).

Data Visibility Requirements:
Stage 1: Show 20 data points from a cubic function plus noise, with a degree-1 line. Display training error and label "Underfitting."
Stage 2: Same data with degree-3 polynomial. Display training error and validation error. Label "Good Fit."
Stage 3: Same data with degree-15 polynomial that passes through nearly every point. Display training error (near zero) and high validation error. Label "Overfitting."

Interactive controls:
- Slider to adjust polynomial degree from 1 to 20, updating the fit curve and both errors in real time
- "New Data" button to regenerate the dataset
- Toggle: Show/hide validation data points (in a different color)
- Display: Training MSE and Validation MSE with current polynomial degree

Instructional Rationale: Continuous slider exploration with immediate visual feedback supports the Understand/compare objective by letting students discover for themselves the degree at which the model transitions from underfitting to overfitting.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with polynomial regression and dual error display
</details>

## Underfitting（欠拟合）：模型过于简单

**Underfitting（欠拟合）**发生在模型过于简单、无法捕捉数据中潜在规律时。欠拟合模型的 training error 高，validation error 也高，因为它无法表达真实关系的复杂性。

欠拟合的常见原因包括：

- **模型复杂度不足**：在真实关系为非线性时使用线性模型
- **特征不足**：缺少包含预测信息的重要输入变量
- **过度正则化**：对模型复杂度惩罚过重，导致模型受约束过严
- **训练迭代次数过少**：在模型来得及学习之前就停止了 gradient descent

解决 underfitting 的方法通常是增加模型容量：使用更复杂的模型、添加更多特征、减少正则化或延长训练时间。

## Regularization（正则化）：控制模型复杂度

**Regularization（正则化）**是通过在目标函数中添加对模型复杂度的惩罚来防止 overfitting 的一组技术。正则化模型不仅最小化 cost function $C(\theta)$，还要最小化代价与正则化项之和：

#### 正则化目标函数

$J(\theta) = C(\theta) + \lambda R(\theta)$

其中：

- $C(\theta)$ 是 cost function（如 MSE）
- $\lambda$ 是正则化强度（超参数）
- $R(\theta)$ 是对模型复杂度进行惩罚的正则化项

超参数 $\lambda$ 控制权衡：当 $\lambda = 0$ 时，无正则化（有 overfitting 风险）；当 $\lambda$ 很大时，模型被重度约束（有 underfitting 风险）。

### L1 Regularization（L1 正则化，Lasso）

**L1 regularization（L1 正则化）**在目标函数中加入参数绝对值之和：

#### L1 正则化项

$R(\theta) = \sum_{j=1}^{n} |\theta_j|$

其中：

- $\theta_j$ 是模型参数（不含 bias term）
- 惩罚与参数幅度成线性关系

L1 正则化的显著特性是倾向于将某些参数精确压为零，从而自动进行特征选择。得到的模型是**稀疏（sparse）**的，只使用可用特征的一个子集。带 L1 正则化的线性回归称为 **Lasso regression**。

### L2 Regularization（L2 正则化，Ridge）

**L2 regularization（L2 正则化）**在目标函数中加入参数平方值之和：

#### L2 正则化项

$R(\theta) = \sum_{j=1}^{n} \theta_j^2$

其中：

- $\theta_j$ 是模型参数（不含 bias term）
- 惩罚与参数幅度的平方成比例

L2 正则化将所有参数向零收缩，但很少将其精确压为零。它将参数幅度的"预算"更均匀地分配给所有特征。带 L2 正则化的线性回归称为 **Ridge regression**。

| 性质 | L1 (Lasso) | L2 (Ridge) |
|-----|-----------|-----------|
| 惩罚项 | $\sum|\theta_j|$ | $\sum\theta_j^2$ |
| 稀疏性 | 产生稀疏模型（部分 $\theta_j = 0$） | 所有参数收缩，但无精确为零 |
| 特征选择 | 是（自动） | 否 |
| 解的唯一性 | 可能有多个解 | 总是唯一的 |
| 最适合 | 存在许多无关特征时 | 所有特征都有一定贡献时 |

#### 图示：Regularization 效果探索器

<iframe src="../../sims/regularization-effect-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Regularization Effect Explorer</summary>
Type: microsim
**sim-id:** regularization-effect-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how increasing the regularization strength $\lambda$ simplifies the fitted model, transitioning from overfitting to underfitting.

Purpose: Interactive polynomial fit with adjustable regularization strength, showing how the fitted curve changes as $\lambda$ increases.

Interactive controls:
- Slider: Polynomial degree (1 to 15), default 10
- Slider: Regularization strength $\lambda$ (0 to 10, logarithmic scale), default 0
- Toggle: L1 vs L2 regularization
- Display: Training MSE, Validation MSE, number of nonzero parameters (for L1)
- "New Data" button

Visual elements:
- Scatter plot with 20 data points
- Fitted polynomial curve that updates with slider changes
- Side panel: bar chart showing parameter magnitudes for each polynomial coefficient
- When L1 is selected, zero parameters shown in gray; nonzero in blue

Data Visibility Requirements:
Stage 1: $\lambda = 0$, show overfit curve and large parameter bars.
Stage 2: $\lambda$ moderate, show smoother curve and reduced parameter bars.
Stage 3: $\lambda$ very large, show nearly flat line and very small parameter bars.

Instructional Rationale: Direct manipulation of regularization strength with immediate visual feedback on both the fitted curve and parameter magnitudes supports the Apply/demonstrate objective by making the regularization mechanism tangible.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with regularized polynomial fitting
</details>

### Early Stopping（早停）

**Early stopping（早停）**是一种专用于 gradient descent 等迭代训练方法的正则化技术。它不是训练直到 cost function 完全收敛，而是在训练过程中监测 validation error，当 validation error 开始增大时停止训练。

Early stopping 的流程为：

1. 将数据划分为训练集（training set）、验证集（validation set）和测试集（test set）
2. 训练模型，每个 epoch 后评估 validation error
3. 记录 validation error 达到最小值时的参数
4. 当 validation error 在指定 epoch 数内（即"patience"）未再改善时，停止训练
5. 恢复最佳验证 epoch 时的参数

Early stopping 的优势在于无需修改模型或目标函数。它被广泛用于神经网络训练，通常与其他正则化方法结合使用。

## Cross-validation（交叉验证）：稳健的模型评估

**Cross-validation（交叉验证）**是一种评估策略，通过反复将数据集划分为训练和验证部分来高效利用有限数据。最常见的变体是 **k-fold cross-validation（k 折交叉验证）**：

1. 将数据集划分为 $k$ 个等大小的折（fold），通常 $k = 5$ 或 $k = 10$
2. 对每个折 $i$：
   - 将第 $i$ 折作为验证集
   - 将其余 $k - 1$ 折作为训练集
   - 训练模型并计算 validation error
3. 对 $k$ 个 validation error 取平均，得到 cross-validation 分数

#### 图示：K-Fold Cross-Validation 过程

<iframe src="../../sims/k-fold-cross-validation/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>K-Fold Cross-Validation Process</summary>
Type: microsim
**sim-id:** k-fold-cross-validation<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how k-fold cross-validation works by visualizing the rotation of training and validation folds across multiple iterations.

Purpose: Step-through visualization showing how data is split into k folds and how each fold takes its turn as the validation set.

Data Visibility Requirements:
Stage 1: Show a dataset bar divided into 5 colored segments (folds). Fold 1 highlighted as validation (orange), folds 2-5 as training (blue).
Stage 2: Fold 2 highlighted as validation, others as training. Show the validation error for fold 1 complete.
Stage 3-5: Continue rotating through folds 3, 4, 5.
Stage 6: Show all 5 fold errors and the average cross-validation score.

Interactive controls:
- "Next Fold" and "Previous Fold" buttons
- Slider: Number of folds k (3 to 10), default 5
- Display: Per-fold validation error and running average
- "Animate All" button to play through all folds automatically

Instructional Rationale: Step-through with visual fold rotation supports the Understand/explain objective by showing concretely how each data point serves as both training and validation, eliminating the mystery of where the "validation data" comes from.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged fold display
</details>

Cross-validation 相比单次 train/validation 划分的优势：

- 每个数据点既用于训练又用于验证
- 模型性能估计更稳定（方差更低）
- 在数据集较小时尤为宝贵

权衡之处是计算成本：模型需要训练 $k$ 次而非一次。对于代价高昂的模型（大型神经网络），cross-validation 可能不切实际，此时改用单次 train/validation/test 划分。

## Bias-Variance Tradeoff（偏差-方差权衡）

**Bias-variance tradeoff（偏差-方差权衡）**是解释为何没有任何模型能实现完美泛化的基本概念。任何模型的预期预测误差都可以分解为三个分量：

#### Bias-Variance 分解

$\text{Expected Error} = \text{Bias}^2 + \text{Variance} + \text{Irreducible Error}$

其中：

- **Bias（偏差）**衡量模型中错误假设导致的系统性误差。高 bias 的模型持续错过真实规律（underfitting）。
- **Variance（方差）**衡量模型对训练数据波动的敏感性。高 variance 的模型随训练集不同而剧烈变化（overfitting）。
- **Irreducible error（不可约误差）**是数据中固有的噪声，任何模型都无法消除。

权衡的本质在于：降低 bias 通常会增大 variance，反之亦然：

- 简单模型（如对非线性关系使用线性回归）具有**高 bias、低 variance**：无论训练集如何变化，都会犯相同类型的错误。
- 复杂模型（如高次多项式）具有**低 bias、高 variance**：能捕捉复杂模式，但对特定训练数据敏感。

目标是找到使总误差最小的模型复杂度——即 bias 与 variance 取得平衡的"甜蜜点"。

| 模型复杂度 | Bias | Variance | Training Error | Validation Error |
|---------|------|---------|--------------|----------------|
| 过于简单 | 高 | 低 | 高 | 高 |
| 恰当 | 适中 | 适中 | 适中 | 适中（总误差最低） |
| 过于复杂 | 低 | 高 | 极低 | 高 |

#### 图示：Bias-Variance Tradeoff 可视化

<iframe src="../../sims/bias-variance-tradeoff/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Bias-Variance Tradeoff Visualization</summary>
Type: microsim
**sim-id:** bias-variance-tradeoff<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine
Learning Objective: Examine how model complexity affects bias and variance by observing the behavior of the training error curve, validation error curve, and their relationship.

Purpose: Classic U-shaped curve visualization showing how training error and validation error change as model complexity increases, with the optimal complexity region highlighted.

Interactive controls:
- Slider: Model complexity (1 to 20), representing polynomial degree or number of parameters
- Display: Current bias estimate, variance estimate, training error, validation error
- Toggle: Show/hide bias and variance component curves
- "Generate New Datasets" button: Sample 5 different training sets and show how predictions change (illustrating variance)

Visual elements:
- Main plot: X-axis = model complexity, Y-axis = error
- Blue curve: Training error (decreasing)
- Red curve: Validation error (U-shaped)
- Green region: Optimal complexity zone where validation error is minimized
- Optional: Dotted curves for bias^2 and variance when toggle enabled

Data Visibility Requirements:
Stage 1: Show both curves with current complexity indicated by vertical line.
Stage 2: When "Generate New Datasets" is pressed, show 5 fitted curves overlaid, demonstrating low variance (clustered together) for simple models and high variance (spread apart) for complex models.

Instructional Rationale: The dual-curve visualization with interactive complexity slider supports the Analyze/examine objective by making the opposing forces of bias and variance directly observable as the student moves from simple to complex models.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with dual-curve plotting and multiple-dataset visualization
</details>

## 将评估联系到实践

本章的概念构成了模型构建的决策框架：

1. **从简单开始**：从低复杂度模型出发，评估其 training error 和 validation error
2. **诊断问题**：若两者均高，模型 underfitting（增加复杂度）；若 training error 低而 validation error 高，模型 overfitting（应用正则化）
3. **应用正则化**：若怀疑存在许多无关特征，选择 L1；L2 可作为通用默认选项；迭代训练时使用 early stopping
4. **使用 cross-validation**：稳健地评估模型性能，尤其在数据有限时
5. **迭代优化**：根据 bias-variance tradeoff 调整模型复杂度、正则化强度和特征

!!! tip "Python 实用工作流"
    在 Python 的 scikit-learn 中，这个工作流对应：先用 `LinearRegression()`，若 overfitting 则改用 `Ridge(alpha=1.0)` 或 `Lasso(alpha=1.0)`，并通过 `cross_val_score(model, X, y, cv=5)` 进行评估。超参数（正则化的 `alpha`，复杂度的多项式次数）通过 cross-validation 进行调整。

## 关键要点

本章解决了模型评估与泛化的核心挑战：

- **Generalization** 是终极目标：在未见数据上表现良好。**Training error** 和 **validation error** 共同揭示模型是否能泛化。
- **Overfitting** 意味着模型记住了训练噪声（training error 低，validation error 高）；**Underfitting** 意味着模型过于简单（两者误差均高）。
- **Regularization** 对模型复杂度施加惩罚：**L1 regularization（Lasso）**产生稀疏模型并执行特征选择；**L2 regularization（Ridge）**收缩所有参数。
- **Early stopping** 在 validation error 开始增大时停止训练，无需修改目标函数即提供隐式正则化。
- **Cross-validation** 通过将验证集在数据所有折中轮转，提供泛化能力的稳健估计。
- **Bias-variance tradeoff** 解释了为何总误差在中等模型复杂度时取得最小值：过简单导致高 bias，过复杂导致高 variance。

??? question "自测：你能回答这些问题吗？"
    1. 若 training error 为 0.02，validation error 为 0.45，最可能的诊断是什么？
    2. L1 regularization 与 L2 在所得模型参数方面有何不同？
    3. 为什么 cross-validation 比单次 train/test 划分给出更可靠的泛化估计？
    4. 在 bias-variance tradeoff 中，增大多项式次数后 bias 和 variance 分别如何变化？
    5. Early stopping 如何起到正则化的作用？


[See Annotated References](./references.md)
