---
title: 优化与梯度下降
description: 用于训练机器学习模型的基于梯度的优化方法
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 优化与 Gradient Descent（梯度下降）

## 概述

本章探讨基于梯度的优化方法——机器学习模型从数据中学习的主要机制。学生将学习 gradient（梯度）及其在优化中的作用，然后逐步了解 batch gradient descent（批量梯度下降）、stochastic gradient descent（随机梯度下降）和 mini-batch gradient descent（小批量梯度下降）。本章详细介绍 learning rate（学习率）、convergence（收敛）、divergence（发散）和 parameter update rule（参数更新规则）等关键概念，同时讲解 learning rate selection（学习率选择）策略以及用于可视化优化行为的 loss landscape（损失曲面）。学完本章后，学生将理解模型在训练过程中如何迭代地改进其参数。

## 涵盖的概念

本章涵盖学习图中以下 12 个概念：

1. Gradient（梯度）
2. Gradient Descent（梯度下降）
3. Learning Rate（学习率）
4. Batch Gradient Descent（批量梯度下降）
5. Stochastic Gradient Descent（随机梯度下降）
6. Mini-batch Gradient Descent（小批量梯度下降）
7. Convergence（收敛）
8. Divergence（发散）
9. Parameter Update Rule（参数更新规则）
10. Optimization（优化）
11. Learning Rate Selection（学习率选择）
12. Loss Landscape（损失曲面）

## 先修知识

本章建立在以下章节概念的基础上：

- [第 5 章：机器学习的数学基础](../05-math-foundations/index.md)
- [第 6 章：线性回归](../06-linear-regression/index.md)

---

## 从方程到迭代学习

在第 6 章中，我们使用 normal equation（正规方程）求解线性回归——这是一种一步计算出最优参数的闭式解。然而，这种解析方法有显著局限性：它需要计算矩阵逆，复杂度为 $O(n^3)$，在大特征空间下不可行。更重要的是，许多机器学习模型（神经网络、logistic regression）根本没有闭式解。因此，我们需要一种更通用的方法来寻找最优参数：**optimization（优化）**。

机器学习中的**optimization**是指寻找使目标函数最小化（或最大化）的参数值的过程。由于我们通常希望最小化 loss 或 cost function，问题简化为：给定 cost function $J(\theta)$，找到使 $J$ 取得最小值的 parameter vector $\theta^*$。

基于梯度的优化是主流方法，因为它具有通用性（适用于任意可微 cost function）、可扩展性（能处理数百万参数）和计算效率（每步代价可预测）。

## Gradient（梯度）

函数的**gradient（梯度）**是一个向量，指向该函数增长最快的方向。对于参数为 $\theta = [\theta_0, \theta_1, \ldots, \theta_n]$ 的 cost function $J(\theta)$，梯度是所有偏导数构成的向量：

#### Gradient 定义

$\nabla J(\theta) = \begin{bmatrix} \frac{\partial J}{\partial \theta_0} \\ \frac{\partial J}{\partial \theta_1} \\ \vdots \\ \frac{\partial J}{\partial \theta_n} \end{bmatrix}$

其中：

- $\nabla J(\theta)$ 是梯度向量
- $\frac{\partial J}{\partial \theta_j}$ 是 $J$ 对参数 $\theta_j$ 的偏导数

梯度的每个分量告诉我们：当我们稍微调整对应参数时，cost function 变化多少。若 $\frac{\partial J}{\partial \theta_1} = 5$，则表示将 $\theta_1$ 增大一小量，cost 将增加约 5 倍该小量。

梯度有两个关键性质使其在优化中非常有用：

- 梯度指向**最速上升（steepest ascent）**方向（增长最快）
- 负梯度 $-\nabla J(\theta)$ 指向**最速下降（steepest descent）**方向（减小最快）

因此，为最小化 cost function，应沿负梯度方向更新参数。

## Gradient Descent（梯度下降）

**Gradient descent（梯度下降）**是一种迭代优化算法，通过沿负梯度方向反复更新参数来最小化代价。在每一步中，算法计算当前参数值处 cost function 的梯度，并沿"下坡"方向迈出一小步。

### Parameter Update Rule（参数更新规则）

**Parameter update rule（参数更新规则）**精确定义了每次迭代中参数的变化方式：

#### Gradient Descent 更新规则

$\theta_{j}^{(t+1)} = \theta_{j}^{(t)} - \alpha \frac{\partial J}{\partial \theta_j}$

其中：

- $\theta_j^{(t)}$ 是迭代 $t$ 时参数 $j$ 的值
- $\theta_j^{(t+1)}$ 是迭代 $t+1$ 时的更新值
- $\alpha$ 是 learning rate
- $\frac{\partial J}{\partial \theta_j}$ 是 cost function 对 $\theta_j$ 的偏导数

用向量形式同时更新所有参数：

$\theta^{(t+1)} = \theta^{(t)} - \alpha \nabla J(\theta^{(t)})$

算法从初始参数值（通常为随机值或零）出发，计算梯度，迈出一步，反复执行直到满足某个停止准则。

#### 图示：Gradient Descent 在二维曲面上

<iframe src="../../sims/gradient-descent-2d-surface/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Gradient Descent on a 2D Surface</summary>
Type: microsim
**sim-id:** gradient-descent-2d-surface<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how gradient descent iteratively moves parameters toward the minimum of a cost function by following the negative gradient.

Purpose: Interactive 2D contour plot showing gradient descent on a bowl-shaped cost function. Students can click to set the starting point and watch the algorithm descend toward the minimum.

Interactive controls:
- Click on the contour plot to set the starting point for gradient descent
- Slider: Learning rate ($\alpha$), range 0.001 to 1.0, default 0.1
- "Run" button to execute gradient descent
- "Step" button to advance one iteration at a time
- "Reset" button to clear the path
- Display: Current parameter values, gradient vector, cost value, iteration count

Visual elements:
- Contour plot of $J(\theta_0, \theta_1) = \theta_0^2 + 2\theta_1^2$ showing elliptical contours
- Red dot at current position with green arrow showing negative gradient direction
- Blue trail showing the path taken by gradient descent
- Small dot at the minimum (0, 0)
- Side panel showing cost value vs. iteration number as a line chart

Instructional Rationale: Direct manipulation (choosing start point and learning rate) with step-by-step progression supports the Apply/demonstrate objective by letting students observe the gradient descent trajectory under different conditions and develop intuition for how the algorithm navigates the cost surface.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with contour rendering and iterative simulation
</details>

## Learning Rate（学习率）

**Learning rate（学习率，$\alpha$）**是控制 gradient descent 每次迭代步长的超参数（hyperparameter），是整个机器学习中最重要的超参数之一。

- **太小**：算法步伐极小，收敛非常缓慢，需要大量迭代才能到达最小值
- **太大**：算法越过最小值，来回震荡或向外发散
- **恰当**：算法在合理的迭代次数内高效收敛到最小值

Learning rate 不从训练数据中获取，必须由实践者手动选择。常见初始值范围为 0.001 到 0.1，但最优值取决于具体问题。

| Learning Rate | 行为 | 典型表现 |
|--------------|------|---------|
| 极小（$\alpha < 0.001$） | 收敛极慢 | Cost 几乎不下降 |
| 较小（$\alpha \approx 0.01$） | 缓慢但可靠的收敛 | Cost 平稳下降 |
| 适中（$\alpha \approx 0.1$） | 快速收敛 | 对许多问题有效 |
| 较大（$\alpha > 0.5$） | 震荡或发散 | Cost 增大或震荡 |

## Convergence（收敛）与 Divergence（发散）

**Convergence（收敛）**指 gradient descent 算法成功到达（或充分接近）cost function 的最小值。随着算法收敛，cost 单调下降，参数更新量越来越小，因为梯度幅度在最小值附近趋近于零。

**Divergence（发散）**指算法未能到达最小值，cost function 反而无限增大。发散通常由过大的 learning rate 引起：算法越过最小值，之后每步使其离最小值更远。

实用的收敛判据包括：

- Cost function 变化量小于某个小阈值（$|J^{(t)} - J^{(t-1)}| < \epsilon$）
- 梯度范数低于阈值（$\|\nabla J\| < \epsilon$）
- 达到最大迭代次数

#### 图示：Learning Rate 效果探索器

<iframe src="../../sims/learning-rate-effect-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Learning Rate Effect Explorer</summary>
Type: microsim
**sim-id:** learning-rate-effect-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine
Learning Objective: Examine how different learning rate values affect the convergence behavior of gradient descent, distinguishing between convergence, slow convergence, oscillation, and divergence.

Purpose: Side-by-side comparison showing gradient descent runs with three different learning rates on the same cost function, so students can directly compare convergence behaviors.

Layout: Three panels in a row, each showing a 1D cost function curve $J(\theta) = (\theta - 3)^2$ with gradient descent running at a different learning rate.

Visual elements per panel:
- Cost function curve plotted as a parabola
- Red dot showing current position, moving along the curve
- Trail of previous positions as fading dots
- Label showing learning rate value and current cost

Interactive controls:
- Sliders for each of the three learning rates (defaults: 0.05, 0.3, 0.9)
- "Run All" button to start all three simultaneously
- "Step All" button to advance all by one iteration
- "Reset" button
- Below the panels: a single chart showing cost vs. iteration for all three runs, color coded

Data Visibility Requirements:
Stage 1: Show initial position (same for all three) and the cost function.
Stage 2: After each step, show the updated position, the gradient value, the step size, and the new cost.
Stage 3: After multiple steps, the comparison chart reveals convergence, slow convergence, and divergence clearly.

Instructional Rationale: Simultaneous comparison of three learning rates supports the Analyze/examine objective by making the cause-effect relationship between learning rate and convergence behavior immediately visible and quantifiable.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with multi-panel layout
</details>

## Gradient Descent 的变体

在实践中，基础的 gradient descent 算法有三种变体，区别在于每步计算梯度时使用多少数据。变体的选择同时影响计算效率和收敛行为。

### Batch Gradient Descent（批量梯度下降）

**Batch gradient descent（批量梯度下降）**（也称 vanilla gradient descent）在每次迭代中使用整个训练数据集计算梯度：

#### Batch Gradient Descent 更新

$\theta^{(t+1)} = \theta^{(t)} - \alpha \frac{1}{m}\sum_{i=1}^{m} \nabla L(y_i, f(x_i; \theta^{(t)}))$

其中：

- $m$ 是训练样本总数
- 梯度在所有样本上取平均

Batch gradient descent 的优点：

- 产生稳定、平滑的收敛轨迹
- 梯度估计精确（无采样带来的噪声）
- 对于凸 cost function，保证收敛到全局最小值

缺点：

- 每次更新都需要处理整个数据集，大数据集时速度慢
- 无法利用数据冗余（许多样本可能传递相似信息）
- 需要将完整数据集加载到内存

### Stochastic Gradient Descent（随机梯度下降，SGD）

**Stochastic gradient descent（随机梯度下降，SGD）**在每次迭代中使用一个随机选取的训练样本计算梯度：

#### SGD 更新

$\theta^{(t+1)} = \theta^{(t)} - \alpha \nabla L(y_i, f(x_i; \theta^{(t)}))$

其中：

- 每步随机选取单个样本 $(x_i, y_i)$

SGD 的优点：

- 每次更新速度极快（只处理一个样本）
- 嘈杂的梯度估计有助于逃脱浅层局部最小值
- 天然适合在线学习（数据逐样本到达）

缺点：

- 嘈杂的更新导致轨迹在最小值附近震荡
- 不能精确收敛，在最小值附近振荡
- 难以充分利用向量化硬件（GPU 并行计算）

### Mini-batch Gradient Descent（小批量梯度下降）

**Mini-batch gradient descent（小批量梯度下降）**是 batch 和 stochastic gradient descent 之间实用的折中方案。它在每次迭代中使用训练数据的一个小随机子集（mini-batch）计算梯度：

#### Mini-batch 更新

$\theta^{(t+1)} = \theta^{(t)} - \alpha \frac{1}{B}\sum_{i \in \mathcal{B}} \nabla L(y_i, f(x_i; \theta^{(t)}))$

其中：

- $\mathcal{B}$ 是随机选取的包含 $B$ 个样本的 mini-batch
- $B$ 是 batch size（批大小），通常为 32、64、128 或 256

Mini-batch gradient descent 是现代深度学习中的主流方法，因为它兼顾了 batch GD 的稳定性和 SGD 的速度，并充分发挥 GPU 并行计算的优势。

| 变体 | 每次更新使用样本数 | 梯度质量 | 速度 | GPU 利用率 |
|-----|---------------|---------|------|---------|
| Batch GD | 全部 $m$ 个 | 精确 | 每轮慢 | 良好 |
| SGD | 1 个 | 噪声很大 | 每次更新快 | 较差 |
| Mini-batch GD | $B$ 个（如 64） | 适度噪声 | 每轮快 | 优秀 |

#### 图示：GD 变体比较

<iframe src="../../sims/gd-variants-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>GD Variants Comparison</summary>
Type: microsim
**sim-id:** gd-variants-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare
Learning Objective: Compare the convergence trajectories of batch gradient descent, stochastic gradient descent, and mini-batch gradient descent on the same optimization problem.

Purpose: Interactive visualization showing all three GD variants running simultaneously on a 2D contour plot, so students can compare their paths, speed, and noise levels.

Visual elements:
- 2D contour plot of a quadratic cost function
- Three colored paths: blue (Batch GD), red (SGD), green (Mini-batch GD)
- Dots at current positions with arrows showing the gradient direction
- Legend identifying each variant

Interactive controls:
- "Run" button to start all three variants simultaneously
- "Step" button to advance all by one iteration
- "Reset" button
- Slider: Learning rate (shared by all three)
- Slider: Mini-batch size B (4 to 128)
- Display: Iteration count and current cost for each variant

Instructional Rationale: Simultaneous execution and visual comparison supports the Analyze/compare objective by making the tradeoffs between convergence smoothness and computational cost directly observable.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with multi-path simulation on contour plot
</details>

## Loss Landscape（损失曲面）

**Loss landscape（损失曲面）**是 cost function 在参数空间上的可视化曲面。对于具有两个参数的模型，loss landscape 是一个三维曲面，水平轴表示参数，垂直轴表示代价。Gradient descent 在这个曲面上导航，寻找最低点。

Loss landscape 的关键特征包括：

- **Global minimum（全局最小值）**：曲面上的绝对最低点（最优参数值）
- **Local minima（局部最小值）**：低于其周围邻域但不是整体最低的点
- **Saddle points（鞍点）**：梯度为零但曲面在某些方向上凸起、在其他方向上凹陷的点
- **Plateaus（平坦区域）**：梯度非常小的平坦区域，导致收敛缓慢

对于凸（convex）cost function（如线性回归的 MSE），loss landscape 呈碗形，只有一个全局最小值，gradient descent 必然能找到它。对于非凸（non-convex）cost function（如神经网络的），loss landscape 可能非常复杂，存在许多局部最小值和鞍点。

## Learning Rate Selection（学习率选择）

**Learning rate selection（学习率选择）**是为 gradient descent 选择合适 learning rate 的过程。由于 learning rate 决定性地影响算法是否收敛以及收敛速度，已发展出多种策略：

- **Fixed learning rate（固定学习率）**：训练全程使用单一常数值。简单，但可能不是最优的。
- **Learning rate decay（学习率衰减）**：从较大的 learning rate 开始，随时间逐步减小。常见方案包括 step decay（每 $k$ 个 epoch 降低一个因子）和 exponential decay（指数衰减）。
- **Adaptive methods（自适应方法）**：Adam、RMSProp 和 AdaGrad 等算法根据梯度历史自动为每个参数调整 learning rate。

一个常见的实用方法是从 learning rate 0.01 开始，根据观察到的收敛行为进行调整。若 cost 平稳下降，该值可能合适；若 cost 震荡，则减小；若 cost 几乎不变，则增大。

| 策略 | 工作方式 | 优点 | 缺点 |
|-----|---------|------|------|
| Fixed | 常数 $\alpha$ | 简单、可预测 | 可能非最优 |
| Step decay | 每 $k$ 个 epoch 将 $\alpha$ 降低一个因子 | 更好的收敛 | 需要调整衰减计划 |
| Exponential decay | $\alpha_t = \alpha_0 e^{-kt}$ | 平滑下降 | 额外超参数 |
| Adaptive (Adam) | 基于梯度历史的每参数自适应学习率 | 鲁棒，通常效果好 | 更多内存占用 |

!!! tip "实践建议：从 Adam 开始"
    对于大多数深度学习应用，默认 learning rate 为 0.001 的 Adam optimizer 是一个可靠的起点。它将自适应 learning rate 与 momentum 相结合，通常无需大量调参即可良好收敛。我们将在神经网络训练的背景下重新讨论 Adam。

## 关键要点

本章介绍了驱动机器学习训练的优化框架：

- **Gradient（梯度）**是偏导数向量，指向 cost function 增长最快的方向。沿负梯度方向移动可以减小 cost。
- **Gradient descent** 使用**parameter update rule**迭代更新参数：$\theta \leftarrow \theta - \alpha \nabla J(\theta)$。
- **Learning rate（$\alpha$）**控制步长。过小会导致收敛缓慢（**convergence**问题）；过大会导致**divergence**（发散）或震荡。
- **Batch gradient descent** 每次更新使用全部样本（稳定但慢），**stochastic gradient descent** 每次使用一个样本（快但嘈杂），**mini-batch gradient descent** 每次使用一个子集（实践中的默认选择）。
- **Loss landscape** 可视化了 cost function 在参数空间中的变化。凸 landscape 保证收敛到全局最小值；非凸 landscape 可能存在局部最小值和鞍点。
- **Learning rate selection** 策略从固定值到自适应方法（如 Adam）不等，后者在训练过程中自动调整 learning rate。

??? question "自测：你能回答这些问题吗？"
    1. 为什么 gradient descent 沿负梯度方向而非正梯度方向移动？
    2. 如果 learning rate 翻倍，gradient descent 的轨迹会发生什么变化？
    3. 在深度学习中，为什么 mini-batch gradient descent 优于 batch GD 和 SGD？
    4. Gradient descent 会在 saddle point 处卡住吗？为什么？
    5. 与固定 learning rate 相比，自适应 learning rate 方法的主要优势是什么？


[See Annotated References](./references.md)
