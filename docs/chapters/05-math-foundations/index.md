---
title: 机器学习的数学基础
description: 面向机器学习的矩阵运算、概率分布、损失函数与统计估计
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 机器学习的数学基础

## 概述

本章构建支撑机器学习算法的数学工具箱。学生将学习矩阵运算，包括表示、乘法、转置和求逆，以及概率分布，如 Gaussian 分布和 Bernoulli 分布。本章还介绍 loss function（损失函数）、objective function（目标函数）、cost function（代价函数）以及 model complexity（模型复杂度）的概念。Maximum likelihood estimation（最大似然估计）和 log-likelihood（对数似然）也作为训练机器学习模型的统计基础加以讲解。学完本章后，学生将具备后续章节算法所需的数学能力。

## 涵盖的概念

本章涵盖学习图中以下 13 个概念：

1. Matrix Representation（矩阵表示）
2. Matrix Multiplication（矩阵乘法）
3. Matrix Transpose（矩阵转置）
4. Matrix Inverse（矩阵求逆）
5. Probability Distribution（概率分布）
6. Gaussian Distribution（高斯分布）
7. Log-likelihood（对数似然）
8. Maximum Likelihood（最大似然）
9. Bernoulli Distribution（伯努利分布）
10. Loss Function（损失函数）
11. Objective Function（目标函数）
12. Cost Function（代价函数）
13. Model Complexity（模型复杂度）

## 先修知识

本章建立在以下章节概念的基础上：

- [第 1 章：人工智能导论](../01-intro-to-ai/index.md)
- [第 2 章：AI 的 Python 编程工具](../02-python-tools/index.md)

---

## 为什么数学对机器学习至关重要

机器学习算法从本质上说是数学过程。当神经网络学习对图像分类，或回归模型预测房价时，底层运算是矩阵乘法、概率计算以及数学函数的优化。本章提供了在本课程其余部分反复用到的核心数学模块。

我们将内容组织为三大支柱：线性代数（矩阵）、概率与统计（分布与似然）以及优化基础（损失函数与模型复杂度）。每个支柱都直接对应后续章节将遇到的具体机器学习算法。

## 线性代数：矩阵及其运算

线性代数为机器学习中的数据表示与操作提供了语言。当数据集包含数千个样本、每个样本有数百个特征时，矩阵提供了一种紧凑且计算高效的方式来表达所有数据及其上的运算。

### Matrix Representation（矩阵表示）

**Matrix（矩阵）**是按行和列排列的数字矩形阵列。在机器学习中，矩阵用于表示数据集、模型参数和变换。具有 $m$ 行 $n$ 列的矩阵称为 $m \times n$ 矩阵。

#### 矩阵记号

$A = \begin{bmatrix} a_{11} & a_{12} & \cdots & a_{1n} \\ a_{21} & a_{22} & \cdots & a_{2n} \\ \vdots & \vdots & \ddots & \vdots \\ a_{m1} & a_{m2} & \cdots & a_{mn} \end{bmatrix}$

其中：

- $A$ 是矩阵名称（按惯例用大写粗体）
- $a_{ij}$ 是第 $i$ 行第 $j$ 列的元素
- $m$ 是行数
- $n$ 是列数

在典型的机器学习场景中，考虑一个包含 100 名学生、每人有 5 个特征（五门科目的考试成绩）的数据集。该数据集自然地表示为一个 $100 \times 5$ 的矩阵，其中每行是一名学生，每列是一个特征。从矩阵中提取的单列称为列向量（column vector），单行称为行向量（row vector）。

| 机器学习概念 | 矩阵表示 | 典型形状 |
|------------|---------|---------|
| 训练数据 | 特征矩阵 $X$ | $m \times n$（样本数 x 特征数） |
| 目标值 | 标签向量 $y$ | $m \times 1$ |
| 模型权重 | 参数向量 $\theta$ | $n \times 1$ |
| 预测值 | 输出向量 $\hat{y}$ | $m \times 1$ |

#### 图示：机器学习中的 Matrix Representation

<iframe src="../../sims/matrix-representation-ml/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Matrix Representation in Machine Learning</summary>
Type: infographic
**sim-id:** matrix-representation-ml<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret
Learning Objective: Interpret how datasets, parameters, and predictions map to matrix structures in machine learning.

Purpose: Show an interactive visualization where a small dataset table (5 rows, 3 columns) transforms into matrix notation. The user can hover over cells to see the corresponding $a_{ij}$ label. A second panel shows how the feature matrix $X$, weight vector $\theta$, and prediction vector $\hat{y}$ relate.

Layout:
- Left panel: A small data table with column headers (Feature 1, Feature 2, Feature 3) and 5 rows of numeric data
- Right panel: The same data expressed in matrix notation with bracket symbols
- Below: Equation $\hat{y} = X\theta$ with each symbol highlighted in a matching color

Interactive elements:
- Hover over any cell in the table to highlight the corresponding element in the matrix notation
- Toggle button to switch between "Dataset View" and "Matrix View"
- Hover over $X$, $\theta$, or $\hat{y}$ in the equation to highlight the corresponding matrix/vector

Color scheme: Blue for data matrix, green for parameter vector, orange for prediction vector

Instructional Rationale: Interactive highlighting connects the concrete (data table) to the abstract (matrix notation), supporting the Understand/interpret objective by making the mapping explicit and explorable.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js canvas with mouse interaction
</details>

### Matrix Multiplication（矩阵乘法）

**Matrix multiplication（矩阵乘法）**是机器学习计算中最基础的运算。无论是神经网络计算输出、线性回归进行预测，还是对数据集进行变换，矩阵乘法都是驱动计算的核心引擎。

对于矩阵 $A$（大小为 $m \times p$）和矩阵 $B$（大小为 $p \times n$），其乘积 $C = AB$ 是一个 $m \times n$ 的矩阵，每个元素的计算方式为：

#### 矩阵乘积公式

$c_{ij} = \sum_{k=1}^{p} a_{ik} b_{kj}$

其中：

- $c_{ij}$ 是 $C$ 中第 $i$ 行第 $j$ 列的元素
- $a_{ik}$ 是 $A$ 中第 $i$ 行第 $k$ 列的元素
- $b_{kj}$ 是 $B$ 中第 $k$ 行第 $j$ 列的元素
- $p$ 是共享的内部维度

关键约束是 $A$ 的列数必须等于 $B$ 的行数，即"内部维度必须匹配"规则。结果矩阵的行来自 $A$，列来自 $B$。

矩阵乘法的关键性质包括：

- **不满足交换律**：一般情况下，$AB \neq BA$
- **满足结合律**：$(AB)C = A(BC)$
- **满足分配律**：$A(B + C) = AB + AC$

在机器学习中，线性回归的预测公式 $\hat{y} = X\theta$ 就是一次矩阵乘法：$100 \times 5$ 的数据矩阵乘以 $5 \times 1$ 的参数向量，得到 $100 \times 1$ 的预测向量。NumPy 通过 `np.dot(X, theta)` 或 `@` 运算符高效执行此操作。

### Matrix Transpose（矩阵转置）

**Matrix transpose（矩阵转置）**是沿对角线翻转矩阵的运算，将行变为列，列变为行。若 $A$ 是 $m \times n$ 矩阵，则其转置 $A^T$ 是 $n \times m$ 矩阵。

#### 转置定义

$(A^T)_{ij} = A_{ji}$

其中：

- $(A^T)_{ij}$ 是转置矩阵中第 $i$ 行第 $j$ 列的元素
- $A_{ji}$ 是原矩阵中第 $j$ 行第 $i$ 列的元素

转置的重要性质：

- $(A^T)^T = A$（转置两次返回原矩阵）
- $(AB)^T = B^T A^T$（乘积的转置颠倒顺序）
- $(A + B)^T = A^T + B^T$（转置对加法分配）

转置在机器学习公式中频繁出现。例如，线性回归的正规方程（第 6 章）使用 $X^T X$ 计算"Gram 矩阵"，该矩阵捕捉特征间的相关性。两个列向量 $a$ 和 $b$ 的点积可以写为 $a^T b$。

### Matrix Inverse（矩阵求逆）

方阵 $A$ 的**matrix inverse（矩阵逆）**是矩阵 $A^{-1}$，使得二者的乘积为单位矩阵：

#### 逆矩阵定义

$A A^{-1} = A^{-1} A = I$

其中：

- $A$ 是方阵（$n \times n$）
- $A^{-1}$ 是 $A$ 的逆矩阵
- $I$ 是单位矩阵（对角线为 1，其余为 0）

并非每个矩阵都有逆矩阵。存在逆矩阵的矩阵称为**可逆（invertible）**矩阵或**非奇异（non-singular）**矩阵；没有逆矩阵的称为**奇异（singular）**矩阵。当矩阵的行（或列）线性相关，即某行可以表示为其他行的线性组合时，该矩阵是奇异的。

矩阵逆出现在线性回归的闭式解中。正规方程 $\theta = (X^T X)^{-1} X^T y$ 需要计算 $X^T X$ 的逆矩阵。在实践中，直接计算大矩阵的逆在数值上不稳定，因此 NumPy 等库使用更稳健的分解方法（如 `np.linalg.solve` 或 `np.linalg.lstsq`）。

| 运算 | 记号 | NumPy 代码 | 机器学习应用 |
|-----|------|-----------|------------|
| 乘法 | $C = AB$ | `C = A @ B` | 预测、变换 |
| 转置 | $A^T$ | `A.T` | 正规方程、Gram 矩阵 |
| 求逆 | $A^{-1}$ | `np.linalg.inv(A)` | 闭式解 |
| 单位矩阵 | $I$ | `np.eye(n)` | 正则化 |

#### 图示：Matrix Operations 逐步演示

<iframe src="../../sims/matrix-operations-step-through/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Matrix Operations Step-Through</summary>
Type: microsim
**sim-id:** matrix-operations-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate
Learning Objective: Calculate the result of matrix multiplication, transpose, and inverse operations on small matrices using step-by-step procedures.

Purpose: An interactive step-through that lets the student pick a matrix operation (multiply, transpose, inverse) and walk through the computation one element at a time on small (2x2 or 3x3) matrices.

Interactive controls:
- Dropdown: Select operation (Multiplication, Transpose, Inverse)
- "Next Step" and "Previous Step" buttons to advance through the calculation
- "New Matrices" button to generate fresh random integer matrices (values 1-9)
- Display area showing the current step with highlighted cells

Data Visibility Requirements:
Stage 1 (Multiply): Show matrices A (2x3) and B (3x2) side by side. Highlight the row of A and column of B being multiplied.
Stage 2 (Multiply): Show the dot product calculation for the highlighted row-column pair with concrete numbers.
Stage 3 (Multiply): Show the result placed in the output matrix cell. Repeat for each cell.
Stage 4 (Transpose): Show original matrix, then flip animation swapping row i, col j with row j, col i.
Stage 5 (Inverse): Show 2x2 matrix, compute determinant, show adjugate, divide by determinant.

Instructional Rationale: Step-by-step calculation with concrete numbers and visual highlighting supports the Apply/calculate objective by making the mechanical procedure visible and allowing students to predict each step before advancing.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged rendering and navigation buttons
</details>

## 机器学习的概率与统计

概率论为不确定性推理提供了框架，这是机器学习的核心。每个数据集都包含噪声，每个模型的预测都不完美，每个训练过程都涉及统计估计。本节介绍的概率概念将在推导 loss function、解释模型输出和理解训练算法时反复出现。

### Probability Distribution（概率分布）

**Probability distribution（概率分布）**描述随机变量不同结果出现的可能性。它为每个可能的值（离散变量）或每个值的区间（连续变量）分配一个概率。每个概率分布满足两个性质：所有概率非负，且它们之和（或积分）等于 1。

两大类型为：

- **Discrete distributions（离散分布）**：随机变量取可数值（如抛硬币的正面数），由 probability mass function（PMF，概率质量函数）描述。
- **Continuous distributions（连续分布）**：随机变量取连续范围内的值（如人的身高），由 probability density function（PDF，概率密度函数）描述。

在机器学习中，分布对我们观察的数据和模型产生的误差进行建模。理解分布有助于我们选择合适的 loss function，并对模型作出有效的统计推断。

### Gaussian Distribution（高斯分布）

**Gaussian distribution（高斯分布）**（也称正态分布）可以说是统计学和机器学习中最重要的分布。它由两个参数定义：均值 $\mu$（中心）和方差 $\sigma^2$（扩散程度）。

#### Gaussian Probability Density Function（高斯概率密度函数）

$f(x) = \frac{1}{\sqrt{2\pi\sigma^2}} \exp\left(-\frac{(x - \mu)^2}{2\sigma^2}\right)$

其中：

- $x$ 是随机变量
- $\mu$ 是均值（钟形曲线的中心）
- $\sigma^2$ 是方差（控制宽度）
- $\sigma$ 是标准差

Gaussian 分布在机器学习中居于核心地位，原因如下：

- **Central Limit Theorem（中心极限定理）**表明，无论各自的分布如何，许多独立随机变量之和趋向于 Gaussian 分布
- 许多自然现象（测量误差、物理量）近似服从 Gaussian 分布
- 线性回归假设误差服从 Gaussian 分布，这导出了 least squares（最小二乘）loss function
- Gaussian 分布在数学上非常方便：其对数是一个简单的二次函数

#### 图示：Gaussian Distribution 探索器

<iframe src="../../sims/gaussian-distribution-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gaussian Distribution Explorer</summary>
Type: microsim
**sim-id:** gaussian-distribution-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how changing the mean and variance parameters of a Gaussian distribution affects its shape and spread.

Purpose: Interactive parameter explorer for the Gaussian distribution. Students adjust sliders for mean and variance and observe the resulting bell curve in real time.

Interactive controls:
- Slider: Mean ($\mu$), range -5 to 5, default 0
- Slider: Standard deviation ($\sigma$), range 0.5 to 3, default 1
- Checkbox: Show probability areas (68-95-99.7 rule shading)
- Display: Current PDF formula with parameter values substituted

Visual elements:
- X-axis from -10 to 10, Y-axis from 0 to 0.5
- Bell curve drawn from the PDF formula
- Vertical dashed line at the mean
- Shaded regions for 1, 2, and 3 standard deviations when checkbox enabled
- Numerical display of area under each shaded region

Instructional Rationale: Parameter exploration with immediate visual feedback supports the Apply/demonstrate objective by letting students build intuition for how mean shifts the distribution and variance controls its width.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with real-time curve rendering and slider controls
</details>

### Bernoulli Distribution（伯努利分布）

**Bernoulli distribution（伯努利分布）**对恰好有两种可能结果的随机变量进行建模：成功（1）或失败（0）。它由单个参数 $p$（成功概率）刻画。

#### Bernoulli Probability Mass Function（伯努利概率质量函数）

$P(X = x) = p^x (1 - p)^{1-x}$

其中：

- $x \in \{0, 1\}$ 是结果
- $p$ 是成功概率（$0 \le p \le 1$）
- $1 - p$ 是失败概率

Bernoulli 分布与机器学习中的分类直接相关。在二分类中，每个数据点要么属于正类（$y = 1$），要么属于负类（$y = 0$）。当 logistic regression 模型对给定输入输出概率 $\hat{p}$ 时，它将标签建模为参数为 $\hat{p}$ 的 Bernoulli 随机变量。这种联系正是分类中使用 cross-entropy loss（交叉熵损失）的由来（第 10 章）。

| 分布 | 参数 | 支撑集 | 机器学习应用 |
|-----|------|--------|------------|
| Gaussian | $\mu$, $\sigma^2$ | $(-\infty, +\infty)$ | 回归误差、特征 |
| Bernoulli | $p$ | $\{0, 1\}$ | 二分类标签 |

### Maximum Likelihood Estimation（最大似然估计）

**Maximum likelihood estimation（最大似然估计，MLE）**是一种有原则地选择模型参数的方法。其思想直接明了：给定观测数据和统计模型，选择使观测数据出现概率最大的参数值。

形式上，给定 $m$ 个独立观测值 $\{x_1, x_2, \ldots, x_m\}$ 的数据集和参数为 $\theta$ 的参数化模型，**likelihood function（似然函数）**为：

#### 似然函数

$L(\theta) = \prod_{i=1}^{m} P(x_i \mid \theta)$

其中：

- $L(\theta)$ 是参数 $\theta$ 的似然
- $P(x_i \mid \theta)$ 是在参数 $\theta$ 下观测到 $x_i$ 的概率
- $m$ 是观测数量

许多小概率的乘积可能导致数值下溢（结果变得太小，计算机无法表示），这促使我们使用 log-likelihood（对数似然）。

### Log-likelihood（对数似然）

**Log-likelihood（对数似然）**是似然函数的自然对数。由于对数是单调递增函数，最大化 log-likelihood 与最大化 likelihood 给出相同的参数估计，但数值性质要好得多。

#### Log-likelihood 函数

$\ell(\theta) = \log L(\theta) = \sum_{i=1}^{m} \log P(x_i \mid \theta)$

其中：

- $\ell(\theta)$ 是 log-likelihood
- 似然中的乘积在 log-likelihood 中变为求和

Log-likelihood 在机器学习中居于核心地位，因为：

1. **乘积变为求和**，使计算数值稳定且求导更容易
2. 对于 Gaussian 分布误差，最大化 log-likelihood 等价于最小化 mean squared error（均方误差），将 MLE 与线性回归联系起来
3. 对于 Bernoulli 分布标签，最大化 log-likelihood 等价于最小化 cross-entropy loss，将 MLE 与 logistic regression 联系起来

!!! tip "MLE 将统计学与机器学习训练联系起来"
    当我们通过最小化 loss function 来训练机器学习模型时，实际上往往是在进行变相的 maximum likelihood estimation。Loss function 就是负 log-likelihood（或其缩放版本）。这就是为什么理解 MLE 能让你更深入地理解为何特定问题使用特定的 loss function。

## Loss Functions、Objective Functions 与 Cost Functions

这三个密切相关的概念构成了机器学习的优化基础。在日常讨论中它们有时可以互换使用，但存在有用的区别。

### Loss Function（损失函数）

**Loss function（损失函数）**（也称误差函数）衡量单个预测值与真实值的偏差。它以预测值和真实值作为输入，返回一个表示误差大小的非负数。

常见的 loss function 包括：

- **Squared loss（平方损失）**：$L(y, \hat{y}) = (y - \hat{y})^2$，用于回归
- **Absolute loss（绝对损失）**：$L(y, \hat{y}) = |y - \hat{y}|$，用于鲁棒回归
- **Cross-entropy loss（交叉熵损失）**：$L(y, \hat{y}) = -[y \log(\hat{y}) + (1-y)\log(1-\hat{y})]$，用于分类

Loss function 的选择对模型行为有深远影响。Squared loss 对大误差的惩罚比小误差更重（因为误差被平方），使模型对异常值敏感。Absolute loss 对所有误差成比例处理，提供更强的鲁棒性。

### Objective Function（目标函数）

**Objective function（目标函数）**是优化算法试图最小化（或最大化）的函数。在机器学习中，目标函数通常将 loss function 与正则化惩罚等附加项结合起来。

#### 通用 Objective Function

$J(\theta) = \frac{1}{m}\sum_{i=1}^{m} L(y_i, f(x_i; \theta)) + \lambda R(\theta)$

其中：

- $J(\theta)$ 是目标函数
- $L$ 是对每个样本应用的 loss function
- $f(x_i; \theta)$ 是模型对输入 $x_i$ 的预测
- $\lambda$ 是正则化强度
- $R(\theta)$ 是正则化项

### Cost Function（代价函数）

**Cost function（代价函数）**是整个训练数据集上的平均损失。"Loss function"指单个样本上的误差，而"cost function"聚合了所有样本的损失。

#### Cost Function 定义

$C(\theta) = \frac{1}{m}\sum_{i=1}^{m} L(y_i, \hat{y}_i)$

其中：

- $C(\theta)$ 是代价（平均损失）
- $m$ 是训练样本数
- $L$ 是单样本损失

这三个术语的关系是：

- **Loss function** 衡量单个样本上的误差
- **Cost function** 对所有样本的损失取平均
- **Objective function** 可能在 cost function 基础上添加正则化或约束

| 术语 | 作用域 | 示例 |
|-----|-------|------|
| Loss function | 单个样本 | $(y_i - \hat{y}_i)^2$ |
| Cost function | 数据集上的平均 | $\frac{1}{m}\sum(y_i - \hat{y}_i)^2$ |
| Objective function | 代价 + 正则化 | $\frac{1}{m}\sum(y_i - \hat{y}_i)^2 + \lambda\|\theta\|^2$ |

#### 图示：Loss Function 比较

<iframe src="../../sims/loss-function-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Loss Function Comparison</summary>
Type: microsim
**sim-id:** loss-function-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare
Learning Objective: Compare how squared loss, absolute loss, and cross-entropy loss respond differently to prediction errors of various magnitudes.

Purpose: Interactive chart that plots different loss functions on the same axes, allowing students to compare their behavior as the error varies.

Interactive controls:
- Checkboxes: Toggle visibility of Squared Loss, Absolute Loss, Cross-Entropy Loss
- Slider: Adjust the predicted value $\hat{y}$ from 0 to 1 (for cross-entropy) or -3 to 3 (for regression losses), with a vertical indicator line
- Display: Numerical loss value for each active function at the current $\hat{y}$

Visual elements:
- X-axis: Prediction error (or predicted probability for cross-entropy)
- Y-axis: Loss value
- Colored curves for each loss function (blue=squared, green=absolute, red=cross-entropy)
- Vertical dashed line at the current slider position
- Intersection dots where the indicator meets each curve

Data Visibility Requirements:
Stage 1: Show all three loss curves with default true value $y = 1$
Stage 2: As slider moves, update numerical readouts and indicator dots
Stage 3: Highlight the region where squared loss exceeds absolute loss (large errors) and vice versa (small errors)

Instructional Rationale: Side-by-side comparison with interactive parameter adjustment supports the Analyze/compare objective by making the different penalty behaviors of each loss function directly visible and quantifiable.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with real-time curve plotting and slider control
</details>

## Model Complexity（模型复杂度）

**Model complexity（模型复杂度）**指模型拟合数据中复杂模式的能力。复杂度高的模型能够捕捉细微关系，但有记忆训练数据中噪声（过拟合，overfitting）的风险。复杂度低的模型可能无法捕捉真正的潜在规律（欠拟合，underfitting）。

模型复杂度的指标包括：

- **参数数量**：具有 2 个参数的线性模型比具有 10,000 个参数的神经网络更简单
- **多项式次数**：一次多项式（直线）比十次多项式更简单
- **网络深度和宽度**：更深、更宽的神经网络具有更高的复杂度

模型复杂度与泛化能力之间的张力是机器学习的核心挑战之一。我们希望模型足够复杂以捕捉真实规律，但又足够简单以泛化到新数据。第 8 章将通过 bias-variance tradeoff（偏差-方差权衡）正式化这种张力，并介绍控制复杂度的正则化技术。

#### 图示：Model Complexity 与拟合质量

<iframe src="../../sims/model-complexity-fit/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Model Complexity vs. Fit Quality</summary>
Type: microsim
**sim-id:** model-complexity-fit<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how increasing model complexity affects the fit to training data, illustrating the concepts of underfitting, good fit, and overfitting.

Purpose: Interactive demonstration where the student adjusts polynomial degree to fit a noisy dataset, visually observing underfitting, good fit, and overfitting.

Data Visibility Requirements:
Stage 1: Show 20 data points generated from a quadratic function plus noise. Display a degree-1 (linear) fit. Label: "Underfitting - too simple."
Stage 2: Show degree-2 (quadratic) fit on the same data. Label: "Good fit - captures the true pattern."
Stage 3: Show degree-15 fit on the same data. Label: "Overfitting - memorizes the noise."

Interactive controls:
- Slider: Polynomial degree from 1 to 15
- "New Data" button to regenerate the noisy dataset
- Display: Training error (MSE) for the current degree
- Text label updating with "Underfitting", "Good Fit", or "Overfitting" based on degree

Instructional Rationale: Step-through with concrete visual progression from simple to complex models supports the Understand/explain objective by making the abstract concept of model complexity tangible through polynomial curves that students can directly observe.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with polynomial curve fitting and slider control
</details>

## 将数学与机器学习联系起来

本章介绍的数学工具并非孤立的主题；它们构成了驱动本课程每个机器学习算法的相互关联框架。下表将每个数学概念映射到其下游的机器学习应用：

| 数学概念 | 应用场景 |
|---------|---------|
| Matrix representation | 数据存储、特征矩阵（随处可见） |
| Matrix multiplication | 线性回归中的预测、神经网络的前向传播 |
| Matrix transpose | 正规方程、梯度计算 |
| Matrix inverse | 线性回归的闭式解 |
| Gaussian distribution | 回归误差建模、数据生成 |
| Bernoulli distribution | 二分类标签 |
| Maximum likelihood | 从第一性原理推导 loss function |
| Log-likelihood | Cross-entropy loss、MSE 推导 |
| Loss function | 训练每个机器学习模型 |
| Objective function | 在训练中添加正则化 |
| Cost function | 为 gradient descent 聚合损失 |
| Model complexity | 理解 overfitting 与 underfitting |

## 关键要点

本章建立了所有后续机器学习算法赖以构建的数学基础：

- **矩阵（Matrix）**为数据集和模型参数提供紧凑表示。核心运算——乘法、转置和求逆——几乎出现在每个机器学习公式中。
- **概率分布（Probability distributions）**对数据和预测中的不确定性进行建模。Gaussian 分布支撑回归，Bernoulli 分布支撑二分类。
- **Maximum likelihood estimation**提供了一种有原则的参数选择方法，log-likelihood 变换使优化在数值上可行。
- **Loss function** 衡量单个样本的预测误差；**cost function** 对数据集上的误差取平均；**objective function** 可能包含正则化等附加项。
- **Model complexity** 决定模型拟合数据的能力。复杂度与泛化能力之间的平衡是贯穿本课程的反复主题。

??? question "自测：你能回答这些问题吗？"
    1. 为什么两个矩阵的内部维度必须匹配，乘法才有定义？
    2. Gaussian 分布的两个参数是什么，各自控制什么？
    3. 在实践中，为什么使用 log-likelihood 而不是直接使用 likelihood？
    4. Loss function 和 cost function 之间有什么区别？
    5. 如果增加 model complexity，训练误差会怎样？测试误差呢？


[See Annotated References](./references.md)
