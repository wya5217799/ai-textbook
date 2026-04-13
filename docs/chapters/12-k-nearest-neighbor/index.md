---
title: K-近邻算法（K-Nearest Neighbor Algorithm）
description: 基于距离的非参数分类，包括 KNN、距离度量和超参数调优
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# K-近邻算法（K-Nearest Neighbor Algorithm）

## 概述（Summary）

本章介绍 K-Nearest Neighbor（KNN）算法，这是一种用于分类和回归的非参数方法（nonparametric method）。学生将学习距离度量（distance metrics），包括 Euclidean distance 和 L1 distance，以及多数投票（majority voting）决策规则，并了解相似度函数（similarity functions）如何用于对邻居贡献进行加权。本章还讲解 K 值选择（K value selection）、weighted KNN 变体，并以超参数调优（hyperparameter tuning）作为优化模型配置的通用策略作为结语。学完本章后，学生将能够实现 KNN 并理解选择其参数时涉及的权衡取舍。

## 涵盖概念（Concepts Covered）

本章涵盖学习图（learning graph）中的以下 10 个概念：

1. Distance Metric（距离度量）
2. Euclidean Distance（欧氏距离）
3. L1 Distance（L1 距离）
4. K-Nearest Neighbor（K-近邻）
5. Majority Voting（多数投票）
6. Nonparametric Method（非参数方法）
7. Similarity Function（相似度函数）
8. Weighted KNN（加权 KNN）
9. K Value Selection（K 值选择）
10. Hyperparameter Tuning（超参数调优）

## 前置知识（Prerequisites）

本章建立在以下章节概念的基础上：

- [第 1 章：人工智能概论](../01-intro-to-ai/index.md)
- [第 4 章：数据预处理与特征工程](../04-data-preprocessing/index.md)
- [第 7 章：优化与梯度下降](../07-optimization-gradient-descent/index.md)
- [第 8 章：回归模型评估](../08-model-evaluation-regression/index.md)
- [第 11 章：分类评估指标](../11-classification-evaluation/index.md)

---

## 一种不同的分类方法（A Different Approach to Classification）

我们迄今为止研究的分类算法（logistic regression、神经网络）都是**参数化（parametric）**方法：它们在训练期间学习一组固定的参数，训练结束后便丢弃训练数据。K-Nearest Neighbor（KNN）算法采取了一种根本不同的方式。KNN 不学习参数，而是存储整个训练数据集，并通过查找最相似的训练样本来进行预测。这使得 KNN 成为一种"基于实例（instance-based）"或"懒学习（lazy learner）"算法——它将所有计算推迟到预测时进行。

## K-近邻算法（The K-Nearest Neighbor Algorithm）

**K-Nearest Neighbor（KNN）算法** 通过找到距新数据点最近的 $K$ 个训练样本，并将这 $K$ 个邻居中的多数类别分配给该点来进行分类。

该算法极为简洁：

1. 存储整个训练数据集
2. 对于新的查询点 $x_q$：
   a. 计算 $x_q$ 到每个训练点的距离
   b. 选择距离最小的 $K$ 个训练点
   c. 将这 $K$ 个邻居中最常见的类别标签分配给该点（分类任务），或取平均目标值（回归任务）

KNN 中三个关键的设计决策是：如何度量距离、咨询多少个邻居（$K$），以及如何组合它们的投票结果。

### 非参数方法（Nonparametric Methods）

KNN 是一种**nonparametric method（非参数方法）**，意味着它对底层数据分布的数学形式不做任何假设。与 logistic regression（假设线性决策边界）或基于高斯分布的模型（假设钟形分布）不同，KNN 完全根据数据的局部结构来调整其决策边界。

非参数方法的优势：

- 对数据分布无假设
- 能够建模任意复杂的决策边界
- 易于理解和实现

非参数方法的劣势：

- 预测时计算代价高昂（需要与所有训练样本进行比较）
- 内存占用大（需要存储整个训练集）
- 在高维空间中性能下降（"维度诅咒，curse of dimensionality"）

## 距离度量（Distance Metrics）

**Distance metric（距离度量）** 是量化特征空间中两个数据点之间"距离"的函数。距离度量的选择对哪些点被认为是邻居有重大影响，进而影响模型的预测结果。

所有距离度量必须满足四个数学性质：非负性（non-negativity）、同一性（identity，$d(a,b) = 0$ 当且仅当 $a = b$）、对称性（symmetry，$d(a,b) = d(b,a)$），以及三角不等式（triangle inequality，$d(a,c) \leq d(a,b) + d(b,c)$）。

### 欧氏距离（Euclidean Distance）

**Euclidean distance（欧氏距离）**（也称 L2 distance）是空间中两点之间的直线距离。对于两点 $a = (a_1, a_2, \ldots, a_n)$ 和 $b = (b_1, b_2, \ldots, b_n)$：

#### Euclidean Distance Formula（欧氏距离公式）

$d_{\text{Euclidean}}(a, b) = \sqrt{\sum_{j=1}^{n}(a_j - b_j)^2}$

其中：

- $a_j$ 和 $b_j$ 是点 $a$ 和 $b$ 的第 $j$ 个特征值
- $n$ 是特征数量

Euclidean distance 是 KNN 中最常用的距离度量。当所有特征处于相似尺度时，它的效果很好。当特征值域差异很大时（例如年龄以年为单位，而收入以千元为单位），值域较大的特征将主导距离计算。这就是为什么在应用 KNN 之前，特征归一化（feature normalization，第 4 章）是必不可少的。

### L1 距离（L1 Distance）

**L1 distance**（也称 Manhattan distance 或 taxicab distance，曼哈顿距离）沿轴对齐路径测量距离，就像在城市街区网格中导航一样：

#### L1 Distance Formula（L1 距离公式）

$d_{L1}(a, b) = \sum_{j=1}^{n}|a_j - b_j|$

其中：

- $|a_j - b_j|$ 是第 $j$ 个特征的绝对差值

L1 distance 比 Euclidean distance 对异常值（outliers）更不敏感，因为它不对差值进行平方运算。L1 distance 也更适合高维稀疏数据（high-dimensional sparse data）。

| Metric | Formula | Sensitivity to Outliers | Best For |
|--------|---------|----------------------|----------|
| Euclidean (L2) | $\sqrt{\sum(a_j - b_j)^2}$ | High (squaring amplifies large differences) | Dense, normalized features |
| Manhattan (L1) | $\sum|a_j - b_j|$ | Lower (linear in differences) | High-dimensional, sparse data |

#### 图示：距离度量比较（Diagram: Distance Metric Comparison）

<iframe src="../../sims/distance-metric-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Distance Metric Comparison</summary>
Type: microsim
**sim-id:** distance-metric-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare
Learning Objective: Compare Euclidean distance and L1 distance by visualizing the paths and values each metric produces between two points in 2D space.

Purpose: Interactive 2D canvas where students click to place two points and see both the Euclidean (straight-line) path and the L1 (axis-aligned) path drawn between them, with distances displayed.

Interactive elements:
- Click to place Point A and Point B on a 2D grid
- Display: Euclidean distance value with straight-line path drawn
- Display: L1 distance value with axis-aligned (staircase) path drawn
- Slider: "Dimension" to show how both distances change when a third feature dimension is added (conceptual display)
- "Random Points" button to generate new positions

Visual elements:
- Grid with axis labels
- Point A (blue) and Point B (red) as draggable circles
- Green straight line showing Euclidean path with distance label
- Orange staircase path showing L1 path with distance label
- Circle centered on point A with radius equal to Euclidean distance (showing "equidistant" contour for L2)
- Diamond (rotated square) centered on point A with "radius" equal to L1 distance (showing equidistant contour for L1)

Instructional Rationale: Side-by-side geometric comparison of both distance metrics on the same points supports the Understand/compare objective by making the fundamental difference---straight line vs. axis-aligned path---visually concrete.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with click-and-drag point placement
</details>

## 多数投票与相似度函数（Majority Voting and Similarity Functions）

### 多数投票（Majority Voting）

**Majority voting（多数投票）** 是 KNN 分类最简单的决策规则：$K$ 个最近邻居各自为其类别标签投一票，得票最多的类别获胜。

例如，若 $K = 5$，五个最近邻居的标签为 [cat, dog, cat, cat, dog]，则多数投票结果为"cat"（3 票 vs. dog 的 2 票）。

当 $K$ 为偶数时，可能出现平票。常用的平票处理策略包括：选择距离最近的单个邻居所属的类别，或在并列类别中随机选择一个。

### 相似度函数（Similarity Functions）

**Similarity function（相似度函数）** 衡量两个数据点的"相似程度"，在概念上是距离度量的逆：距离函数对不相似的点赋予较高的值，而相似度函数对相似的点赋予较高的值。

一种简单的距离到相似度转换方式为：

$S(a, b) = \frac{1}{1 + d(a, b)}$

相似度函数用于实现 **weighted KNN（加权 KNN）** 变体。

### 加权 KNN（Weighted KNN）

在标准 KNN 中，所有 $K$ 个邻居对投票的贡献是相等的。在 **weighted KNN（加权 KNN）** 中，更近的邻居贡献更大的权重。每个邻居的权重通常取其距离的倒数：

#### 距离加权投票（Distance-Weighted Vote）

$w_i = \frac{1}{d(x_q, x_i)}$

其中：

- $w_i$ 是邻居 $i$ 的投票权重
- $d(x_q, x_i)$ 是查询点到邻居 $i$ 的距离

预测类别是总权重最高的那个。Weighted KNN 降低了距离较远的邻居（它们可能相关性较低）的影响，通常能提高预测质量，尤其是在 $K$ 值较大时。

## K 值选择（K Value Selection）

$K$ 值（邻居数量）的选择是 KNN 中最重要的超参数（hyperparameter），它直接控制偏差（bias）与方差（variance）之间的权衡：

- **$K$ 值较小**（例如 $K = 1$）：决策边界高度灵活，能紧密贴合训练数据。这产生低偏差但高方差——模型对噪声和个别训练样本很敏感。
- **$K$ 值较大**（例如 $K = 50$）：决策边界更平滑，对多个邻居取平均。这产生较高偏差但较低方差——模型对噪声更鲁棒，但可能错过局部模式。

#### 图示：K 值效果探索器（Diagram: K Value Effect Explorer）

<iframe src="../../sims/k-value-effect-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>K Value Effect Explorer</summary>
Type: microsim
**sim-id:** k-value-effect-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how the value of K affects the KNN decision boundary, transitioning from a noisy, complex boundary (small K) to a smooth, simple boundary (large K).

Purpose: Interactive 2D scatter plot with two classes where students adjust K via a slider and observe the decision boundary reshape in real time.

Interactive controls:
- Slider: K value (1 to 30), default 5
- Toggle: Show/hide decision boundary (colored background regions)
- Click to add new query point and see its classification
- Display: Current K, training accuracy, and the K nearest neighbors highlighted for the query point
- "Randomize Data" button to generate new training data

Visual elements:
- Scatter plot with two classes (blue and red dots, ~40 points each)
- Decision boundary shown as colored background regions (light blue and light red)
- When a query point is placed, lines drawn from it to its K nearest neighbors
- Neighbor dots enlarged and labeled with their distance

Instructional Rationale: Direct K manipulation with real-time boundary visualization supports the Apply/demonstrate objective by letting students observe the bias-variance tradeoff in action as K changes from underfitting (large K) to overfitting (small K).

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with KNN classification on a grid for boundary visualization
</details>

选择 K 值的指导原则：

- 以 $K = \sqrt{m}$ 作为起点（其中 $m$ 是训练样本数），这是一个粗略的经验法则
- 对于二分类任务，选择奇数 $K$ 以避免平票
- 使用交叉验证（cross-validation）评估不同的 $K$ 值，选择验证误差最小的那个
- 大多数实际应用中，$K$ 值通常在 3 到 20 之间

## 超参数调优（Hyperparameter Tuning）

**Hyperparameter tuning（超参数调优）** 是寻找最佳模型设置值的过程——这些设置不是通过训练数据学习得到的。与权重和偏置（由梯度下降学习）不同，超参数必须由实践者在训练开始前设定。

各机器学习算法的超参数示例：

| Algorithm | Hyperparameters |
|-----------|----------------|
| KNN | $K$, distance metric, weighting scheme |
| Linear regression | Regularization strength $\lambda$ |
| Logistic regression | Learning rate, regularization strength |
| Neural networks | Learning rate, number of layers, neurons per layer, batch size, epochs |

常见的超参数调优策略：

- **Grid search（网格搜索）**：尝试预定义值集合中的所有组合。穷举但计算代价高昂。
- **Random search（随机搜索）**：从指定分布中随机采样超参数值。通常比网格搜索更高效，因为它能更广泛地探索参数空间。
- **Cross-validation（交叉验证）**：对每个超参数配置，使用 k-fold cross-validation（第 8 章）评估性能，选择平均验证分数最好的配置。

!!! tip "实践中的超参数调优（Hyperparameter Tuning in Practice）"
    在 scikit-learn 中，`GridSearchCV` 和 `RandomizedSearchCV` 会自动将网格搜索或随机搜索与交叉验证结合起来。对于 KNN，你可以搜索 `n_neighbors=[1, 3, 5, 7, 9, 11]`、`metric=['euclidean', 'manhattan']` 和 `weights=['uniform', 'distance']`。

## 关键要点（Key Takeaways）

本章介绍了 K-Nearest Neighbor 算法以及超参数调优这一更广泛的概念：

- **KNN** 是一种**nonparametric method（非参数方法）**，对数据分布不做任何假设。它通过找到 $K$ 个最相似的训练样本来对新样本进行分类。
- **Distance metric（距离度量）** 定义了相似性。**Euclidean distance（欧氏距离，L2）** 是标准选择；**L1 distance（曼哈顿距离）** 对异常值更鲁棒，更适合高维数据。
- **Majority voting（多数投票）** 将 $K$ 个邻居中最常见的类别作为预测结果。**Weighted KNN** 通过**similarity function（相似度函数）** 赋予更近邻居更大的投票权重。
- **K value selection（K 值选择）** 控制偏差-方差权衡：$K$ 小则灵活但对噪声敏感，$K$ 大则平滑但可能错过局部模式。
- **Hyperparameter tuning（超参数调优）** 通过网格搜索（grid search）、随机搜索（random search）和交叉验证（cross-validation）系统地搜索最优模型配置。

??? question "自测：你能回答这些问题吗？（Self-Check: Can you answer these questions?）"
    1. 为什么在应用 KNN 之前，特征归一化（feature normalization）很重要？
    2. 当 K = 1 时，KNN 的训练准确率是多少？为什么？
    3. Weighted KNN 如何降低距离较远的邻居的影响？
    4. 为什么 KNN 被称为"懒学习（lazy learner）"？
    5. 为什么 random search 在超参数调优时可能比 grid search 更高效？


[See Annotated References](./references.md)
