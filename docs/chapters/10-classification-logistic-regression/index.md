---
title: 分类与 Logistic Regression（Classification and Logistic Regression）
description: 使用 logistic regression 的 sigmoid 和 softmax 进行二分类与多分类
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 分类与 Logistic Regression（Classification and Logistic Regression）

## 概述（Summary）

本章介绍分类问题（classification problems）以及解决分类问题的主要算法——logistic regression。学生将学习二分类（binary classification）及其向多分类（multi-class classification）的扩展，并理解 logistic regression 如何使用 sigmoid function 产生概率输出。本章还讲解决策边界（decision boundary）、作为训练目标的交叉熵损失（cross entropy loss）、用于多分类问题的 softmax function，以及用于分类标签的 one-hot encoding。学完本章后，学生将能够使用 logistic regression 构建并解释分类模型。

## 涵盖概念（Concepts Covered）

本章涵盖学习图（learning graph）中的以下 7 个概念：

1. Binary Classification（二分类）
2. Logistic Regression（Logistic 回归）
3. Decision Boundary（决策边界）
4. Cross Entropy Loss（交叉熵损失）
5. Softmax Function（Softmax 函数）
6. Multiple Classification（多分类）
7. One-hot Encoding（独热编码）

## 前置知识（Prerequisites）

本章建立在以下章节概念的基础上：

- [第 1 章：人工智能概论](../01-intro-to-ai/index.md)
- [第 4 章：数据预处理与特征工程](../04-data-preprocessing/index.md)
- [第 5 章：机器学习数学基础](../05-math-foundations/index.md)
- [第 6 章：线性回归](../06-linear-regression/index.md)
- [第 9 章：神经网络基础](../09-neural-network-foundations/index.md)

---

## 从回归到分类（From Regression to Classification）

在前几章中，我们研究了回归（regression）——预测连续值。然而，许多现实世界的问题需要预测的是类别（category）而非数值。这封邮件是垃圾邮件还是正常邮件？这张医学图像显示的是肿瘤还是正常组织？这个手写数字是 3、7 还是 9？这些都是分类问题，需要不同的处理方法。

分类的核心挑战在于输出是离散的（discrete）。我们不能简单地将 linear regression 用于分类，因为直线产生的连续值可以延伸到 $-\infty$ 或 $+\infty$，而我们需要表示类别归属的输出——通常是 0 到 1 之间的概率值。

## 二分类（Binary Classification）

**Binary classification（二分类）** 是最简单的分类形式，每个输入必须被分配到恰好两个类别之一。这两个类别通常被标记为正类（positive，1）和负类（negative，0）。

二分类问题的例子包括：

- 垃圾邮件检测：垃圾邮件（1）或正常邮件（0）
- 医疗诊断：存在疾病（1）或不存在（0）
- 质量控制：有缺陷（1）或合格（0）
- 欺诈检测：欺诈性（1）或合法（0）

在二分类中，训练数据由输入-输出对 $(x_i, y_i)$ 组成，其中 $y_i \in \{0, 1\}$。模型的目标是学习一个函数，给定新输入 $x$，能够预测正确的类别标签。

## Logistic Regression

尽管名称中带有"regression（回归）"，**logistic regression** 实际上是一种分类算法。这个名称有其历史渊源——该算法使用类似回归的数学来建模类别归属的对数几率（log-odds）。

Logistic regression 建立在第 6 章线性模型的基础上，通过将线性输出传入 sigmoid function（第 9 章已介绍）来实现分类：

#### Logistic Regression 模型（Logistic Regression Model）

$\hat{y} = \sigma(\theta^T x) = \frac{1}{1 + e^{-\theta^T x}}$

其中：

- $\theta^T x = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \cdots + \theta_n x_n$ 是特征的线性组合
- $\sigma(\cdot)$ 是 sigmoid function
- $\hat{y}$ 被解释为 $P(y = 1 \mid x)$，即输入属于正类的概率

Sigmoid function 将线性输出压缩到 $(0, 1)$ 范围内，产生有效的概率值。若 $\hat{y} > 0.5$，预测为类别 1；若 $\hat{y} \leq 0.5$，预测为类别 0。这个 0.5 的阈值（threshold）可根据具体应用进行调整（第 11 章将详细讨论阈值选择）。

| Component | Regression | Logistic Regression |
|-----------|-----------|-------------------|
| Model output | Continuous value $\hat{y} \in (-\infty, +\infty)$ | Probability $\hat{y} \in (0, 1)$ |
| Activation | None (linear) | Sigmoid |
| Loss function | MSE | Cross-entropy |
| Task | Predict a number | Predict a class |

## 决策边界（The Decision Boundary）

**Decision boundary（决策边界）** 是特征空间中模型预测概率等于 0.5 的边界面，标志着预测类别 0 和类别 1 之间的过渡区域。对于 logistic regression，决策边界通过将线性部分设为零来确定：

$\theta^T x = 0$

在二维空间（两个特征）中，决策边界是一条直线；在三维空间中是一个平面；在更高维空间中是一个超平面（hyperplane）。由于 logistic regression 的决策边界始终是线性的（超平面），因此 logistic regression 被称为**线性分类器（linear classifier）**。

#### 图示：决策边界可视化（Diagram: Decision Boundary Visualization）

<iframe src="../../sims/decision-boundary-visualization/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Decision Boundary Visualization</summary>
Type: microsim
**sim-id:** decision-boundary-visualization<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how the logistic regression decision boundary separates two classes in a 2D feature space and how changing model parameters shifts the boundary.

Purpose: Interactive 2D scatter plot with two classes of data points and a movable decision boundary line. Students adjust model parameters and observe how the boundary changes.

Interactive controls:
- Slider: Weight $\theta_1$ for feature $x_1$, range -3 to 3
- Slider: Weight $\theta_2$ for feature $x_2$, range -3 to 3
- Slider: Bias $\theta_0$, range -3 to 3
- Display: Current equation $\theta_0 + \theta_1 x_1 + \theta_2 x_2 = 0$
- Display: Classification accuracy percentage
- "Optimal Fit" button: Run gradient descent and animate the boundary moving to its optimal position

Visual elements:
- Scatter plot with class 0 (blue circles) and class 1 (red triangles)
- Decision boundary line in black
- Background shading: light blue on the class-0 side, light red on the class-1 side
- Misclassified points highlighted with yellow outlines

Instructional Rationale: Direct parameter manipulation with accuracy feedback supports the Apply/demonstrate objective by letting students see how the boundary's position and orientation affect classification performance, building intuition for what gradient descent optimizes.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with interactive parameter controls
</details>

## 交叉熵损失（Cross Entropy Loss）

我们不能将 MSE 用作 logistic regression 的损失函数，因为当 sigmoid function 与 MSE 配合使用时，会产生非凸（non-convex）的优化问题，使梯度下降（gradient descent）不可靠。分类任务使用**cross entropy loss（交叉熵损失）**（也称为 log loss 或 binary cross entropy），它来源于对 Bernoulli 分布标签（Bernoulli-distributed labels）应用最大似然原理（maximum likelihood principle）。

#### 二元交叉熵损失（Binary Cross Entropy Loss）

$L(y, \hat{y}) = -[y \log(\hat{y}) + (1 - y) \log(1 - \hat{y})]$

其中：

- $y \in \{0, 1\}$ 是真实标签
- $\hat{y} \in (0, 1)$ 是预测概率
- $\log$ 是自然对数

这个损失函数具有优雅的特性：

- 当 $y = 1$ 且 $\hat{y}$ 接近 1 时：损失接近 0（正确且自信的预测）
- 当 $y = 1$ 且 $\hat{y}$ 接近 0 时：损失趋向 $+\infty$（自信但错误的预测受到重罚）
- 当 $y = 0$ 且 $\hat{y}$ 接近 0 时：损失接近 0
- 当 $y = 0$ 且 $\hat{y}$ 接近 1 时：损失趋向 $+\infty$

整个数据集的代价函数（cost function）是平均交叉熵：

#### 交叉熵代价函数（Cross Entropy Cost Function）

$J(\theta) = -\frac{1}{m}\sum_{i=1}^{m}[y_i \log(\hat{y}_i) + (1 - y_i)\log(1 - \hat{y}_i)]$

其中：

- $m$ 是训练样本数量

对于 logistic regression 而言，该代价函数是凸函数（convex），保证梯度下降能找到全局最小值。

#### 图示：交叉熵损失行为（Diagram: Cross Entropy Loss Behavior）

<iframe src="../../sims/cross-entropy-loss-behavior/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Cross Entropy Loss Behavior</summary>
Type: microsim
**sim-id:** cross-entropy-loss-behavior<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how cross entropy loss penalizes incorrect predictions more heavily when the model is confident and wrong, compared to when it is uncertain.

Purpose: Interactive plot showing the cross entropy loss as a function of predicted probability for both $y=1$ and $y=0$ cases.

Data Visibility Requirements:
Stage 1: Show the loss curve for $y = 1$: $-\log(\hat{y})$. As $\hat{y} \to 0$, loss $\to \infty$. As $\hat{y} \to 1$, loss $\to 0$.
Stage 2: Show the loss curve for $y = 0$: $-\log(1 - \hat{y})$. As $\hat{y} \to 1$, loss $\to \infty$. As $\hat{y} \to 0$, loss $\to 0$.
Stage 3: Movable vertical cursor showing the exact loss value for a given $\hat{y}$ on both curves.

Interactive controls:
- Toggle: Show curve for $y = 1$, $y = 0$, or both
- Draggable vertical cursor along the x-axis ($\hat{y}$ from 0.01 to 0.99)
- Display: Numerical loss values at cursor position

Visual elements:
- X-axis: Predicted probability $\hat{y}$ (0 to 1)
- Y-axis: Loss (0 to 5)
- Blue curve for $y = 1$ case, red curve for $y = 0$ case
- Cursor line with intersection dots

Instructional Rationale: Direct visualization of the loss curves with interactive cursor supports the Understand/explain objective by making the asymmetric penalty structure of cross entropy concretely visible---students can see that the loss explodes when the model is confidently wrong.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with interactive curve plotting
</details>

## 扩展到多个类别（Extending to Multiple Classes）

### 多分类（Multiple Classification）

**Multiple classification（多分类）**（也称为 multi-class classification）将二分类扩展到三个或三个以上类别的问题。模型不再预测输入属于类别 0 还是类别 1，而是将输入分配到 $K$ 个可能类别之一。

例子包括：

- 手写数字识别：10 个类别（数字 0-9）
- 图像分类：数百或数千个物体类别
- 语言识别：预测文本属于 50 种语言中的哪一种

### One-hot Encoding（独热编码）

**One-hot encoding（独热编码）** 是多分类中分类标签的表示方案。与使用单个整数标签（例如 $y = 3$）不同，标签被表示为一个二进制向量，其中恰好有一个元素为 1，其余元素均为 0。

对于 $K = 4$ 个类别的问题：

| Class | Integer Label | One-hot Encoding |
|-------|--------------|-----------------|
| Cat | 0 | $[1, 0, 0, 0]$ |
| Dog | 1 | $[0, 1, 0, 0]$ |
| Bird | 2 | $[0, 0, 1, 0]$ |
| Fish | 3 | $[0, 0, 0, 1]$ |

One-hot encoding 是必要的，因为 softmax 输出层产生一个概率向量（每类一个概率），我们需要真实标签采用相同的向量格式来计算损失。

### Softmax 函数（The Softmax Function）

**Softmax function** 将 sigmoid function 推广到多个类别。给定网络输出层的原始分数（logits）$z_1, z_2, \ldots, z_K$（每类一个分数），softmax 将其转换为概率分布（probability distribution）：

#### Softmax Function

$\text{softmax}(z_j) = \frac{e^{z_j}}{\sum_{k=1}^{K} e^{z_k}}$

其中：

- $z_j$ 是类别 $j$ 的原始分数
- $K$ 是类别总数
- 输出是概率：$\text{softmax}(z_j) \in (0, 1)$
- 所有输出之和为 1：$\sum_{j=1}^{K} \text{softmax}(z_j) = 1$

预测类别是 softmax 概率最高的那个：$\hat{y} = \arg\max_j \text{softmax}(z_j)$。

对于多分类问题，交叉熵损失推广为：

#### 多分类交叉熵损失（Multi-class Cross Entropy Loss）

$L = -\sum_{k=1}^{K} y_k \log(\hat{y}_k)$

其中：

- $y_k$ 是真实标签（one-hot encoded），因此求和中只有一项非零
- $\hat{y}_k$ 是类别 $k$ 的 softmax 概率

#### 图示：Softmax 概率分布（Diagram: Softmax Probability Distribution）

<iframe src="../../sims/softmax-probability-distribution/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Softmax Probability Distribution</summary>
Type: microsim
**sim-id:** softmax-probability-distribution<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate
Learning Objective: Calculate the softmax output for a set of raw scores and observe how changing one score affects all output probabilities.

Purpose: Interactive calculator where students enter raw logit scores for 4 classes and see the softmax probabilities computed step by step.

Data Visibility Requirements:
Stage 1: Show input logits for 4 classes (e.g., $z = [2.0, 1.0, 0.5, -1.0]$).
Stage 2: Show $e^{z_j}$ for each class ($[7.39, 2.72, 1.65, 0.37]$).
Stage 3: Show the sum $\sum e^{z_k} = 12.13$.
Stage 4: Show final probabilities $[\frac{7.39}{12.13}, \frac{2.72}{12.13}, \frac{1.65}{12.13}, \frac{0.37}{12.13}] = [0.609, 0.224, 0.136, 0.030]$.
Stage 5: Show bar chart of probabilities with the predicted class highlighted.

Interactive controls:
- 4 sliders for logit values $z_1$ through $z_4$, range -5 to 5
- "Step Through" or continuous calculation mode toggle
- Display: Step-by-step computation table and probability bar chart
- Display: Predicted class label

Instructional Rationale: Step-by-step computation with adjustable inputs supports the Apply/calculate objective by making the softmax formula concrete---students can verify each arithmetic step and explore how changes in one logit redistribute probability across all classes.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with slider inputs and staged calculation display
</details>

## 完整的分类流程（The Full Classification Pipeline）

将各个部分整合在一起，logistic regression 的分类流程如下：

1. **数据准备**：对分类特征进行编码，对数值特征进行归一化，划分训练集/验证集/测试集
2. **选择模型类型**：二分类（sigmoid 输出）或多分类（softmax 输出）
3. **初始化参数**：随机或零初始化权重和偏置
4. **前向传播（forward pass）**：计算 $z = \theta^T x$，然后应用 sigmoid（二分类）或 softmax（多分类）
5. **计算损失**：cross entropy loss
6. **反向传播（backward pass）**：计算损失关于参数的梯度
7. **更新参数**：执行梯度下降（gradient descent）步骤
8. **重复步骤 4-7**，直至收敛
9. **评估**：在测试集上使用分类指标（第 11 章）

!!! tip "Logistic Regression 即神经网络（Logistic Regression as a Neural Network）"
    Logistic regression 模型等价于一个没有隐藏层的神经网络：输入层直接连接到一个使用 sigmoid 激活的输出神经元。从这个角度来看，只需在输入层和输出层之间添加隐藏层，就可以自然地扩展为更深的网络。

## 关键要点（Key Takeaways）

本章介绍了分类（classification）和 logistic regression 算法：

- **Binary classification（二分类）** 将每个输入分配到两个类别之一，训练标签为 $y \in \{0, 1\}$。
- **Logistic regression** 将 sigmoid function 应用于特征的线性组合，产生概率输出。尽管名称中含有"回归"，但它实际上是分类算法。
- **Decision boundary（决策边界）** 是预测概率等于 0.5 的超平面。对于 logistic regression，这个边界始终是线性的。
- **Cross entropy loss（交叉熵损失）** 来源于对 Bernoulli 分布标签的最大似然估计（maximum likelihood estimation），对自信的错误预测给予重罚，产生凸代价函数。
- **Multiple classification（多分类）** 扩展到 $K > 2$ 个类别。**One-hot encoding** 将类别标签表示为二进制向量。**Softmax function** 将原始分数转换为所有类别的概率分布。

??? question "自测：你能回答这些问题吗？（Self-Check: Can you answer these questions?）"
    1. 为什么不能将 MSE 用作 logistic regression 的损失函数？
    2. Logistic regression 的 decision boundary 是什么形状，为什么？
    3. 若预测概率为 0.95 而真实标签为 0，cross entropy loss 是高还是低？
    4. Softmax function 如何确保其输出构成有效的概率分布？
    5. 为什么多分类任务需要使用 one-hot encoding？


[See Annotated References](./references.md)
