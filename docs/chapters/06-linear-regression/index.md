---
title: 线性回归
description: 第一个完整的机器学习算法，涵盖模型构建、损失度量与正规方程
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 线性回归（Linear Regression）

## 概述

本章将 linear regression（线性回归）作为课程中第一个完整的机器学习算法进行讲解。学生将学习如何用 dependent variable（因变量）和 independent variable（自变量）来构建回归问题、建立线性模型，并使用 mean squared error（均方误差）、root mean squared error（均方根误差）、mean absolute error（平均绝对误差）和 R-squared 等指标评估模型性能。本章涵盖通过 normal equation（正规方程）求得解析解，以及通过残差（residuals）、平方和（sums of squares）和预测值（predicted values）进行几何解读。学完本章后，学生将能够从零开始实现并评估线性回归模型。

## 涵盖的概念

本章涵盖学习图中以下 20 个概念：

1. Regression（回归）
2. Dependent Variable（因变量）
3. Independent Variable（自变量）
4. Linear Model（线性模型）
5. Linear Regression（线性回归）
6. Slope（斜率）
7. Intercept（截距）
8. Squared Loss（平方损失）
9. Mean Squared Error（均方误差）
10. Root Mean Squared Error（均方根误差）
11. Mean Absolute Error（平均绝对误差）
12. R-Squared（决定系数）
13. Sum of Squares Error（误差平方和）
14. Sum of Squares Regression（回归平方和）
15. Sum of Squares Total（总平方和）
16. Residual（残差）
17. Normal Equation（正规方程）
18. Predicted Value（预测值）
19. Bias Term（偏置项）
20. Parameter Vector（参数向量）

## 先修知识

本章建立在以下章节概念的基础上：

- [第 1 章：人工智能导论](../01-intro-to-ai/index.md)
- [第 4 章：数据预处理与特征工程](../04-data-preprocessing/index.md)
- [第 5 章：机器学习的数学基础](../05-math-foundations/index.md)

---

## 什么是 Regression（回归）？

**Regression（回归）**是一种监督学习任务，目标是从一个或多个输入特征预测连续的数值输出。与分类（classification）不同——分类的输出是离散类别——回归产生的值可以在连续范围内取任意数。预测明天的气温、估算房价或预测季度营收，都是回归问题。

"regression"一词在历史上源于 Francis Galton 爵士 19 世纪 80 年代的研究：他观察到一代人中的极端值在下一代往往会"回归"到平均水平。如今，这个术语简单地指从数据中预测连续值。

## 基本构成：变量与线性模型

### Dependent Variable 与 Independent Variable

在回归问题中，两类变量扮演着不同的角色：

- **Dependent variable（因变量）**（也称目标变量、响应变量或输出变量，通常记作 $y$）是我们想要预测的量，它"依赖于"输入特征。
- **Independent variable（自变量）**（也称特征、预测变量或输入变量，通常记作 $x$）是我们观测并用于预测的量。

例如，若要根据学习时长预测学生的期末考试成绩，则考试成绩是 dependent variable，学习时长是 independent variable。当只有一个 independent variable 时，称为**simple regression（简单回归）**；有多个 independent variable 时，称为**multiple regression（多元回归）**。

### Linear Model（线性模型）

**Linear model（线性模型）**假设 dependent variable 是 independent variable 的加权求和加上一个常数项。这是机器学习中最简单的参数化模型，尽管简单，却对许多实际问题效果出色。

对于单个特征，线性模型采用熟悉的直线方程：

#### Simple Linear Regression（简单线性回归）方程

$\hat{y} = \theta_1 x + \theta_0$

其中：

- $\hat{y}$ 是预测值
- $x$ 是 independent variable（特征）
- $\theta_1$ 是斜率（权重）
- $\theta_0$ 是截距（bias term）

对于多个特征，模型推广为：

#### Multiple Linear Regression（多元线性回归）方程

$\hat{y} = \theta_0 + \theta_1 x_1 + \theta_2 x_2 + \cdots + \theta_n x_n$

其中：

- $x_1, x_2, \ldots, x_n$ 是 $n$ 个 independent variable
- $\theta_0, \theta_1, \ldots, \theta_n$ 是模型参数

### Slope（斜率）与 Intercept（截距）

**Slope（斜率）**（简单回归中的 $\theta_1$）量化变化率：$x$ 每增加一个单位，预测的 $\hat{y}$ 改变 $\theta_1$ 个单位。正斜率表示预测值随特征增大而增加；负斜率表示预测值随特征增大而减小。

**Intercept（截距）**（$\theta_0$，也称**bias term（偏置项）**）是所有特征均为零时的预测值。它使整条回归线上移或下移。在许多实际应用中，截距没有有意义的物理解释（"零学习时长"究竟意味着什么？），但它在数学上对于模型良好拟合数据是必要的。

#### 图示：Slope 与 Intercept 探索器

<iframe src="../../sims/slope-intercept-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Slope and Intercept Explorer</summary>
Type: microsim
**sim-id:** slope-intercept-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how adjusting the slope and intercept of a linear model changes the regression line and its fit to data points.

Purpose: Interactive visualization where students manipulate slope and intercept sliders and observe the regression line moving relative to a fixed set of data points. Residuals are drawn as vertical lines from each point to the line, and the total squared error updates in real time.

Interactive controls:
- Slider: Slope ($\theta_1$), range -3 to 3, default 1
- Slider: Intercept ($\theta_0$), range -5 to 5, default 0
- "Show Residuals" toggle button
- Display: Current equation $\hat{y} = \theta_1 x + \theta_0$ with values
- Display: Total squared error $\sum(y_i - \hat{y}_i)^2$

Visual elements:
- Scatter plot of 15 data points (generated from a known linear relationship plus noise)
- Regression line in blue that updates with slider changes
- Red vertical dashed lines showing residuals when toggled on
- MSE value displayed prominently

Instructional Rationale: Direct manipulation of slope and intercept with immediate visual feedback and error tracking supports the Apply/demonstrate objective, allowing students to develop intuition for how parameters affect fit quality.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with slider controls and real-time rendering
</details>

### Parameter Vector（参数向量）与矩阵表述

使用第 5 章中的矩阵记号，我们可以紧凑地表达线性模型。定义**parameter vector（参数向量）** $\theta$ 为包含所有模型参数的列向量：

#### Parameter Vector

$\theta = \begin{bmatrix} \theta_0 \\ \theta_1 \\ \vdots \\ \theta_n \end{bmatrix}$

其中：

- $\theta_0$ 是 bias term（截距）
- $\theta_1, \ldots, \theta_n$ 是各特征的权重

通过在特征矩阵 $X$ 前面添加一列 1（以处理截距），所有 $m$ 个训练样本的预测可以简化为一次矩阵乘法：

#### 线性回归的矩阵形式

$\hat{y} = X\theta$

其中：

- $X$ 是 $m \times (n+1)$ 的设计矩阵（design matrix，首列为全 1）
- $\theta$ 是 $(n+1) \times 1$ 的 parameter vector
- $\hat{y}$ 是 $m \times 1$ 的预测向量

这种紧凑记法不仅在数学上优雅，而且直接对应高效的 NumPy 代码：`y_hat = X @ theta`。

## 线性回归：寻找最优参数

**Linear regression（线性回归）**是寻找能最好拟合训练数据的 parameter vector $\theta$ 的算法。但"最好拟合"意味着什么？我们需要一个定量标准，而这个标准就是 loss function。

### Squared Loss 与 Mean Squared Error

单个预测的**squared loss（平方损失）**是实际值与预测值之差的平方：

#### Squared Loss

$L(y_i, \hat{y}_i) = (y_i - \hat{y}_i)^2$

其中：

- $y_i$ 是样本 $i$ 的实际值
- $\hat{y}_i$ 是样本 $i$ 的预测值

平方有两个作用：使所有误差为正（正负误差不会相互抵消），并对大误差的惩罚比小误差更重。

**Mean Squared Error（均方误差，MSE）**对整个训练集的 squared loss 取平均：

#### Mean Squared Error

$MSE = \frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y}_i)^2$

其中：

- $m$ 是训练样本数

MSE 是线性回归中最常用的 cost function。在误差服从 Gaussian 分布的假设下，最小化 MSE 等价于最大化 log-likelihood（如第 5 章所示）。

### Residuals（残差）与 Predicted Values（预测值）

**Residual（残差）**是观测值与模型预测值之差：

#### Residual 定义

$e_i = y_i - \hat{y}_i$

其中：

- $e_i$ 是样本 $i$ 的残差
- $y_i$ 是观测（实际）值
- $\hat{y}_i$ 是模型的**predicted value（预测值）**

残差是重要的诊断工具。若模型拟合良好，残差应较小，随机分散在零附近，且不呈现系统性规律。若残差显示出规律（如随预测值增大而增大），这表明线性模型遗漏了数据中的某些结构。

### 平方和分解（Sums of Squares Decomposition）

为了理解回归模型在多大程度上解释了数据的变异性，我们使用平方和将总变异性分解为两个分量。

#### Sum of Squares Total（总平方和，SST）

$SST = \sum_{i=1}^{m}(y_i - \bar{y})^2$

其中：

- $\bar{y}$ 是所有观测值的均值

SST 衡量 dependent variable 的总变异性，回答：实际值围绕均值有多分散？

#### Sum of Squares Error（误差平方和，SSE）

$SSE = \sum_{i=1}^{m}(y_i - \hat{y}_i)^2$

其中：

- $\hat{y}_i$ 是模型对样本 $i$ 的预测值

SSE 衡量模型未能解释的变异性——即残差变异性。

#### Sum of Squares Regression（回归平方和，SSR）

$SSR = \sum_{i=1}^{m}(\hat{y}_i - \bar{y})^2$

SSR 衡量模型能够解释的变异性——即预测值偏离均值的程度。

连接这三个量的基本恒等式为：

$SST = SSR + SSE$

这种分解将总变异性划分为"已解释"（SSR）和"未解释"（SSE）两个部分。

#### 图示：Sums of Squares 分解

<iframe src="../../sims/sums-of-squares-decomposition/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Sums of Squares Decomposition</summary>
Type: microsim
**sim-id:** sums-of-squares-decomposition<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Differentiate between Sum of Squares Total, Sum of Squares Error, and Sum of Squares Regression by visualizing how each measures a different component of variability.

Purpose: Interactive scatter plot with a regression line showing the geometric meaning of SST, SSE, and SSR for each data point.

Data Visibility Requirements:
Stage 1: Show scatter plot with regression line and horizontal mean line. For a selected data point, draw the three segments: total deviation (point to mean), predicted deviation (predicted to mean), and residual (point to predicted).
Stage 2: Show numerical values: $y_i - \bar{y}$, $\hat{y}_i - \bar{y}$, and $y_i - \hat{y}_i$ for the selected point.
Stage 3: Show running sums SST, SSR, SSE across all points with a stacked bar chart on the right.

Interactive controls:
- Click any data point to select it and show its decomposition
- Toggle buttons to highlight SST (blue), SSR (green), or SSE (red) across all points
- Display: Numerical SST, SSR, SSE, and the identity SST = SSR + SSE

Visual elements:
- 12 data points on a scatter plot
- Blue regression line
- Gray horizontal line at mean $\bar{y}$
- Color-coded vertical segments for each decomposition component
- Side panel showing stacked bar chart of SSR and SSE (summing to SST)

Instructional Rationale: Visual geometric decomposition with clickable selection supports the Analyze/differentiate objective by letting students see exactly how each sum of squares measures a different portion of the total variability for each data point.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with interactive point selection
</details>

### R-Squared（决定系数）

**R-Squared（$R^2$，决定系数）**是评估回归模型拟合优度最广泛使用的指标。它表示模型解释的 dependent variable 总变异性的比例。

#### R-Squared 公式

$R^2 = \frac{SSR}{SST} = 1 - \frac{SSE}{SST}$

其中：

- $R^2$ 的范围为 0 到 1（对于包含截距的模型）
- $R^2 = 1$ 表示模型解释了所有变异性（完美拟合）
- $R^2 = 0$ 表示模型没有解释任何变异性（不优于预测均值）

| $R^2$ 值 | 解读 |
|---------|-----|
| 0.90 -- 1.00 | 优秀拟合 |
| 0.70 -- 0.89 | 良好拟合 |
| 0.50 -- 0.69 | 中等拟合 |
| 0.00 -- 0.49 | 较差拟合 |

虽然 R-squared 直观且被广泛使用，但它有一个已知的局限性：随着更多特征加入模型，$R^2$ 总是增大（或保持不变），即使这些特征无关紧要。Adjusted R-squared（调整 $R^2$）通过惩罚参数数量来解决这个问题，但本章不详细介绍。

### 其他误差指标

除 MSE 和 R-squared 外，实践中还常用两种误差指标。

#### Root Mean Squared Error（均方根误差）

$RMSE = \sqrt{\frac{1}{m}\sum_{i=1}^{m}(y_i - \hat{y}_i)^2}$

其中：

- $RMSE$ 与 dependent variable 的单位相同，比 MSE 更易解读

RMSE 就是 MSE 的平方根。它的优势在于可解读性：若预测的是房价（单位：美元），RMSE 告诉我们典型误差是多少美元，而 MSE 给出的误差单位是"美元的平方"。

#### Mean Absolute Error（平均绝对误差）

$MAE = \frac{1}{m}\sum_{i=1}^{m}|y_i - \hat{y}_i|$

其中：

- $|y_i - \hat{y}_i|$ 是残差的绝对值

MAE 对异常值（outliers）比 MSE 更鲁棒，因为它不对误差平方。每个数据点按其误差大小等比例贡献。

| 指标 | 公式 | 单位 | 对异常值的敏感度 |
|-----|------|------|--------------|
| MSE | $\frac{1}{m}\sum(y_i-\hat{y}_i)^2$ | 平方 | 高 |
| RMSE | $\sqrt{MSE}$ | 与 $y$ 相同 | 高 |
| MAE | $\frac{1}{m}\sum|y_i-\hat{y}_i|$ | 与 $y$ 相同 | 低 |
| $R^2$ | $1 - SSE/SST$ | 无量纲 | 中等 |

## Normal Equation（正规方程）：解析求解线性回归

对于线性回归，存在一个闭式解（closed-form solution），可以直接计算最优 parameter vector，无需迭代。这个解称为**normal equation（正规方程）**。

从最小化 MSE（或等价地最小化 SSE）的目标出发，对 $\theta$ 求 cost function 的导数，令其等于零并求解，结果为：

#### Normal Equation

$\theta = (X^T X)^{-1} X^T y$

其中：

- $X$ 是 $m \times (n+1)$ 的设计矩阵（design matrix）
- $X^T$ 是 $X$ 的转置
- $(X^T X)^{-1}$ 是 Gram 矩阵的逆
- $y$ 是 $m \times 1$ 的实际值向量

在 NumPy 中，计算方式为：

```python
theta = np.linalg.inv(X.T @ X) @ X.T @ y
```

或者使用数值更稳定的方法：

```python
theta = np.linalg.lstsq(X, y, rcond=None)[0]
```

Normal equation 有其实际局限性。计算矩阵逆 $(X^T X)^{-1}$ 的时间复杂度为 $O(n^3)$，其中 $n$ 是特征数量。对于具有数百万特征的数据集，这会变得极其缓慢。在这种情况下，优先选择 gradient descent（梯度下降，第 7 章）等迭代方法。

| 方法 | 时间复杂度 | 适用场景 |
|-----|---------|---------|
| Normal equation | $O(n^3)$ | 小到中等特征数（$n < 10,000$） |
| Gradient descent | 每次迭代 $O(mn)$ | 特征数大或数据集大 |

#### 图示：Normal Equation 逐步演示

<iframe src="../../sims/normal-equation-step-through/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Normal Equation Step-Through</summary>
Type: microsim
**sim-id:** normal-equation-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute
Learning Objective: Execute the normal equation computation step by step on a small dataset to obtain the optimal parameter vector for linear regression.

Purpose: Guided step-through that demonstrates the normal equation on a tiny dataset (4 data points, 1 feature), showing each matrix operation with concrete numbers.

Data Visibility Requirements:
Stage 1: Show raw data table: 4 (x, y) pairs. Show the design matrix X (with column of ones).
Stage 2: Compute $X^T$ and display it.
Stage 3: Compute $X^T X$ with element-by-element calculation shown.
Stage 4: Compute $(X^T X)^{-1}$ using the 2x2 inverse formula.
Stage 5: Compute $X^T y$ with element-by-element calculation.
Stage 6: Compute $\theta = (X^T X)^{-1} X^T y$ and display the final slope and intercept.
Stage 7: Plot the resulting regression line on the data points.

Interactive controls:
- "Next Step" and "Previous Step" buttons
- Highlighted cells showing which values are being computed at each stage
- "Randomize Data" button to try different datasets

Instructional Rationale: Worked example with concrete numbers at each matrix operation stage supports the Apply/execute objective by making the abstract formula into a tangible sequence of arithmetic steps that students can follow and verify.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged computation display
</details>

## 综合应用：完整示例

总结线性回归的工作流程，以根据学习时长预测学生考试成绩为例，步骤如下：

1. **收集数据**：收集过去学生的（学习时长, 成绩）数据对
2. **建立模型**：$\hat{y} = \theta_1 x + \theta_0$，其中 $x$ 是学习时长，$\hat{y}$ 是预测成绩
3. **构建设计矩阵**：在特征向量前添加一列 1
4. **计算参数**：应用 normal equation $\theta = (X^T X)^{-1} X^T y$
5. **进行预测**：对于学习了 7 小时的新学生，计算 $\hat{y} = \theta_1 \cdot 7 + \theta_0$
6. **评估性能**：在留出的测试集上计算 MSE、RMSE、MAE 和 $R^2$

!!! tip "Python 实现"
    在实践中，可以使用 `sklearn.linear_model.LinearRegression` 一行代码实现。但理解 normal equation 和 loss function 背后的数学，能为你调试模型、选择合适指标以及理解后续章节中更复杂的算法奠定基础。

## 关键要点

本章将 linear regression 作为课程中第一个完整指定的机器学习算法进行了介绍：

- **Regression** 预测连续值。**Dependent variable** 是目标，**independent variable** 是特征。
- **Linear model** 假设特征的加权和加上一个 **bias term（intercept）**。权重是**斜率（slopes）**，所有参数构成**parameter vector**。
- **Squared loss** 对误差进行二次方惩罚。在数据集上取平均后得到**Mean Squared Error**。**RMSE** 和 **MAE** 提供对异常值敏感度不同的替代误差度量。
- **Residuals** 是实际值与**predicted values** 之差。**平方和分解**（SST = SSR + SSE）将变异性划分为已解释和未解释两部分。
- **R-Squared** 衡量模型解释的变异性比例，范围从 0（无解释能力）到 1（完美拟合）。
- **Normal equation** 通过矩阵运算提供最优参数的闭式解，对于中等规模的问题效率很高。

??? question "自测：你能回答这些问题吗？"
    1. Simple regression 与 multiple regression 有什么区别？
    2. 为什么 squared loss 对大误差的惩罚比 absolute loss 更重？
    3. 如果 SSE 非常接近 SST，这说明模型的什么情况？
    4. 对于线性回归，何时会优先选择 gradient descent 而非 normal equation？
    5. 若房价模型的 MAE 为 10，从实际意义上这意味着什么？


[See Annotated References](./references.md)
