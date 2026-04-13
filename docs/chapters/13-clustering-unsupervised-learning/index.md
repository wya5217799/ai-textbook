---
title: 聚类与无监督学习算法
description: K-Means、DBSCAN、PCA 与降维——在无标签数据中发现结构
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 聚类与无监督学习算法

## 摘要

本章介绍无监督学习方法，用于在无标签数据中发现隐藏结构。学生将学习 K-Means 聚类算法，包括 centroid（质心）、clustering objective（聚类目标函数）、distance metric（距离度量）以及 K-Means 的迭代工作流程。随后，本章引入 DBSCAN 作为基于密度的替代方案，涵盖 core object（核心对象）、epsilon neighborhood（ε 邻域）、density reachability（密度可达性）、boundary point（边界点）与 noise point（噪声点）。最后，介绍 Principal Component Analysis（PCA，主成分分析）与 dimensionality reduction（降维）——作为简化高维数据的技术手段。完成本章后，学生将能够将聚类与降维方法应用于真实数据集。

## 涵盖概念

本章涵盖学习图谱中的以下 17 个概念：

1. K-Means Clustering
2. Centroid
3. Cluster
4. Clustering Objective
5. Euclidean Distance Metric
6. Cosine Similarity
7. K-Means Workflow
8. DBSCAN
9. Core Object
10. Epsilon Neighborhood
11. Density Reachable
12. Density Connected
13. Boundary Point
14. Noise Point
15. DBSCAN Parameters
16. Principal Component Analysis
17. Dimensionality Reduction

## 先修知识

本章建立在以下章节概念之上：

- [Chapter 1: Introduction to Artificial Intelligence](../01-intro-to-ai/index.md)
- [Chapter 4: Data Preprocessing and Feature Engineering](../04-data-preprocessing/index.md)
- [Chapter 5: Mathematical Foundations for Machine Learning](../05-math-foundations/index.md)
- [Chapter 12: K-Nearest Neighbor Algorithm](../12-k-nearest-neighbor/index.md)

---

## 无标签数据下的学习

我们迄今为止研究的所有算法——线性回归、逻辑回归、KNN——都是需要带标签训练数据的 supervised learning（监督学习）方法。然而在许多真实场景中，标签不可用、获取代价高昂，或根本不存在。客户细分、异常检测与数据探索等任务，需要直接从数据本身中发现结构。这就是 **unsupervised learning（无监督学习）** 的领域。

本章涵盖两类基本的无监督学习任务：clustering（聚类，将相似数据点分组）与 dimensionality reduction（降维，在保留结构的同时将数据压缩到更少的维度）。

## Clustering：对相似数据分组

**Cluster（簇）** 是一组数据点，这些点彼此之间的相似度高于它们与其他组数据点的相似度。聚类算法在无需任何标签引导的情况下，自动将数据集划分为多个 cluster。结果揭示了数据中天然存在的分组结构。

聚类的应用场景包括：

- 客户细分（按行为对客户分组）
- 文档整理（按主题对文章分组）
- 图像压缩（对相似像素颜色分组）
- 生物分类（按遗传相似性对生物体分组）
- 异常检测（识别不属于任何 cluster 的数据点）

## K-Means Clustering

**K-Means clustering** 是使用最广泛的聚类算法。它将 $m$ 个数据点划分为 $K$ 个 cluster，其中 $K$ 由用户预先指定。

### Centroid（质心）

**Centroid（质心）** 是所有分配给某个 cluster 的数据点的几何中心（均值）。对于包含 $n_k$ 个点的 cluster $C_k$：

#### Centroid 计算公式

$\mu_k = \frac{1}{n_k}\sum_{x_i \in C_k} x_i$

其中：

- $\mu_k$ 为第 $k$ 个 cluster 的 centroid
- $n_k$ 为第 $k$ 个 cluster 中的点数
- 求和遍历所有分配给该 cluster 的点

每个 cluster 由其 centroid 表示，数据点被分配给距离最近的 centroid 所属的 cluster。

### Clustering Objective（聚类目标函数）

**Clustering objective**（也称为 inertia 或 within-cluster sum of squares，簇内平方和）是 K-Means 所要最小化的函数：

#### K-Means 目标函数

$J = \sum_{k=1}^{K}\sum_{x_i \in C_k} \|x_i - \mu_k\|^2$

其中：

- $J$ 为总的簇内距离
- $\|x_i - \mu_k\|^2$ 是点 $x_i$ 到其所属 cluster 的 centroid $\mu_k$ 的 **Euclidean distance（欧氏距离）** 的平方

K-Means 通过寻找最优的 cluster 分配方案与 centroid 位置，使总平方距离尽可能小，从而最小化该目标函数。

### K-Means Workflow（工作流程）

**K-Means workflow** 是一个交替执行两个步骤的迭代过程：

1. **初始化（Initialize）**：随机选取 $K$ 个数据点作为初始 centroid
2. **分配步骤（Assignment step）**：将每个数据点分配给距其最近的 centroid 所在的 cluster（使用 Euclidean distance）
3. **更新步骤（Update step）**：将每个 centroid 重新计算为其所属 cluster 中所有点的均值
4. **重复** 步骤 2-3，直至 centroid 不再移动（convergence，收敛）或达到最大迭代次数

#### 图示：K-Means Clustering 逐步演示

<iframe src="../../sims/k-means-step-through/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>K-Means Clustering Step-Through</summary>
Type: microsim
**sim-id:** k-means-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain the K-Means algorithm by stepping through the assignment and update phases on a 2D dataset, observing how centroids move and cluster boundaries change at each iteration.

Purpose: Interactive step-through of the K-Means algorithm on a 2D dataset, showing assignment and update phases separately with concrete data.

Data Visibility Requirements:
Stage 1: Show ~50 data points in 2D. Display K=3 initial centroids placed randomly as large colored markers (red, blue, green).
Stage 2 (Assignment): Draw dashed lines from each point to its nearest centroid. Color each point according to its assigned cluster.
Stage 3 (Update): Show centroids moving to the mean of their assigned points. Display the old and new centroid positions.
Stage 4: Repeat assignment with updated centroids, showing points that change clusters highlighted.
Stage 5+: Continue until convergence, with the objective function $J$ displayed and decreasing.

Interactive controls:
- "Next Step" button (alternates between Assignment and Update)
- "Run to Convergence" button
- "Reset" button to re-randomize centroids
- Slider: Number of clusters K (2 to 6), default 3
- Display: Current iteration, phase (Assignment/Update), and objective function value $J$
- "New Data" button to regenerate the dataset

Instructional Rationale: Step-by-step progression through alternating assignment and update phases supports the Understand/explain objective by making the iterative convergence process visible and allowing students to predict what will happen at each step.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged algorithm execution
</details>

K-Means 的关键特性：

- **保证收敛（Guaranteed to converge）**，但只能收敛至局部最小值，不一定是全局最优
- **对初始化敏感（Sensitive to initialization）**：不同的初始 centroid 可能产生不同的最终 cluster。K-Means++ 初始化策略通过选取相互分散的初始 centroid 来改善结果。
- **需要预先指定 $K$**：用户必须提前确定 cluster 的数量。"肘部法则（elbow method）"（绘制 $J$ 关于 $K$ 的曲线，寻找折点）提供了一种启发式方法。

### Cosine Similarity（余弦相似度）

虽然 K-Means 通常使用 Euclidean distance，但某些应用场景更适合使用 **cosine similarity（余弦相似度）**，它衡量两个向量之间夹角的余弦值：

#### Cosine Similarity 计算公式

$\text{cos}(a, b) = \frac{a \cdot b}{\|a\| \cdot \|b\|} = \frac{\sum_{j=1}^{n} a_j b_j}{\sqrt{\sum_{j=1}^{n} a_j^2} \cdot \sqrt{\sum_{j=1}^{n} b_j^2}}$

其中：

- $a \cdot b$ 为点积（dot product）
- $\|a\|$ 和 $\|b\|$ 为向量的 Euclidean norm（欧氏范数，即长度）

Cosine similarity 的范围为 $-1$（方向相反）到 $+1$（方向相同）。值为 0 表示正交（无相似性）。它对于以词频向量表示的文本数据尤为有用——在这类数据中，向量的大小反映文档长度而非内容相似性。

| 度量 | 衡量内容 | 范围 | 最适用于 |
|--------|----------|-------|----------|
| Euclidean distance | 绝对距离 | $[0, \infty)$ | 稠密数值特征 |
| Cosine similarity | 角度相似性 | $[-1, 1]$ | 文本向量、高维稀疏数据 |

## DBSCAN：基于密度的聚类

**DBSCAN**（Density-Based Spatial Clustering of Applications with Noise）是一种聚类算法，它将紧密聚集的点归为一组，并将孤立的点标记为噪声。与 K-Means 不同，DBSCAN 无需预先指定 cluster 数量，并且能够发现任意形状的 cluster。

### DBSCAN 核心概念

DBSCAN 依赖两个参数来共同定义"密度"：

- **Epsilon ($\varepsilon$)**：每个点周围邻域的半径
- **MinPts**：在 $\varepsilon$-邻域内被认为是高密度区域所需的最小点数

点 $p$ 的 **epsilon neighborhood（ε 邻域）** 是所有与 $p$ 距离不超过 $\varepsilon$ 的点的集合：

$N_\varepsilon(p) = \{q \in D : d(p, q) \leq \varepsilon\}$

根据邻域密度，每个点被分类为以下三种类型之一：

- **Core object（核心对象）**：其 $\varepsilon$-邻域中至少包含 MinPts 个点的点。Core object 构成 cluster 的"内部"。
- **Boundary point（边界点）**：位于某个 core object 的 $\varepsilon$-邻域内，但自身邻域中点数少于 MinPts 的点。Boundary point 处于 cluster 的"边缘"。
- **Noise point（噪声点）**：既不是 core object 也不是 boundary point 的点。Noise point 不属于任何 cluster。

### 密度可达性与密度连通性

DBSCAN 通过连接彼此足够接近的 core object 来构建 cluster：

- **Density reachable（密度可达）**：若存在一条由 core object 组成的链 $p = p_1, p_2, \ldots, p_n = q$，且每对相邻点之间的距离均不超过 $\varepsilon$，则称点 $q$ 从点 $p$ 密度可达。
- **Density connected（密度连通）**：若存在一个点 $o$，使得 $p$ 和 $q$ 均从 $o$ 密度可达，则称点 $p$ 和 $q$ 密度连通。

DBSCAN 中的一个 cluster 是密度连通点的最大集合。这一定义使 DBSCAN 能够发现任意形状的 cluster——包括细长形、弯曲形或嵌套形——而不像 K-Means 那样假设 cluster 大致呈球形。

#### 图示：DBSCAN 点分类

<iframe src="../../sims/dbscan-point-classification/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>DBSCAN Point Classification</summary>
Type: microsim
**sim-id:** dbscan-point-classification<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Differentiate between core objects, boundary points, and noise points in DBSCAN by examining each point's epsilon neighborhood and neighbor count.

Purpose: Interactive 2D visualization where students adjust epsilon and MinPts parameters and observe how each point is classified as core, boundary, or noise.

Interactive controls:
- Slider: Epsilon ($\varepsilon$), range 0.5 to 5.0, default 2.0
- Slider: MinPts, range 2 to 10, default 4
- Hover over any point to see its $\varepsilon$-neighborhood circle and neighbor count
- Click a point to highlight all points density-reachable from it
- "Run DBSCAN" button to color all clusters
- Display: Number of clusters found, number of noise points

Visual elements:
- ~60 data points in 2D with natural cluster structure and some outliers
- Core objects drawn as large filled circles (colored by cluster)
- Boundary points drawn as medium open circles (colored by cluster)
- Noise points drawn as small gray crosses
- When hovering, show $\varepsilon$-circle around the point with neighbors highlighted

Instructional Rationale: Interactive parameter adjustment with hover-based exploration supports the Analyze/differentiate objective by letting students examine each point's classification rationale and observe how parameter changes reclassify points between core, boundary, and noise.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with DBSCAN implementation and interactive hover
</details>

### DBSCAN Parameters（参数选择）

合理选择 **DBSCAN parameters**（$\varepsilon$ 和 MinPts）至关重要。参考指南如下：

- **MinPts**：一种常用启发式规则是 MinPts $\geq$ 数据维度 + 1。对于二维数据，MinPts = 4 通常是一个良好的起点。
- **Epsilon ($\varepsilon$)**：绘制每个点到其第 $k$ 近邻（其中 $k$ = MinPts）的距离，并按降序排列。在该图中寻找"拐点（knee）"；对应距离即为 $\varepsilon$ 的合适选择。

| 特性 | K-Means | DBSCAN |
|---------|---------|--------|
| Cluster 数量 | 必须预先指定 $K$ | 自动发现 |
| Cluster 形状 | 球形 | 任意形状 |
| 处理噪声 | 否 | 是（noise point） |
| 参数 | $K$ | $\varepsilon$、MinPts |
| 可扩展性 | 非常快 | 中等 |
| 确定性 | 否（随机初始化） | 是 |

## Principal Component Analysis 与 Dimensionality Reduction

### Dimensionality Reduction（降维）

**Dimensionality reduction（降维）** 是在尽可能保留有用信息的同时减少数据集特征数量的过程。高维数据集带来诸多挑战，包括计算时间增加、过拟合风险加大，以及难以可视化。

### Principal Component Analysis（主成分分析）

**Principal Component Analysis（PCA，主成分分析）** 是使用最广泛的降维技术。PCA 寻找能够捕获数据最大方差的新坐标轴（称为 principal component，主成分），然后将数据投影到数量更少的这些轴上。

PCA 的核心思想如下：

1. **寻找最大方差方向**：第一个 principal component（PC1）是特征空间中数据变化最大的方向。
2. **寻找下一个方向**：PC2 是与 PC1 正交且能捕获最多剩余方差的方向。
3. **依此继续**：每个后续 principal component 在与前面所有成分正交的约束下，捕获尽可能多的方差。
4. **投影（Project）**：仅保留前 $k$ 个 principal component（其中 $k < n$），将数据从 $n$ 维投影至 $k$ 维。

PCA 利用数据协方差矩阵的 eigenvalue（特征值）和 eigenvector（特征向量）。Eigenvector 定义 principal component 的方向，eigenvalue 表示每个成分所捕获的方差大小。

#### 图示：PCA Variance Explorer

<iframe src="../../sims/pca-variance-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>PCA Variance Explorer</summary>
Type: microsim
**sim-id:** pca-variance-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how PCA identifies the directions of maximum variance in data and how projecting onto principal components reduces dimensionality while preserving structure.

Purpose: Interactive 2D visualization showing how PCA finds the axes of maximum variance and projects data onto them.

Data Visibility Requirements:
Stage 1: Show a cloud of 50 points in 2D with a clear elongated shape (correlated features). Draw the mean point.
Stage 2: Show PC1 as an arrow from the mean in the direction of maximum variance. Display the eigenvalue (variance captured).
Stage 3: Show PC2 as an arrow perpendicular to PC1. Display its eigenvalue.
Stage 4: Show the projection of all points onto PC1 only (1D reduction). Compare the spread in the original 2D vs. the 1D projection.

Interactive controls:
- Slider: Rotation angle (0 to 180 degrees) to rotate the data cloud and observe how principal components adjust
- Slider: Correlation strength (0 to 0.99) to change the elongation of the data cloud
- Toggle: Show projections onto PC1 only
- Display: Variance explained by PC1, PC2, and cumulative percentage
- "New Data" button

Instructional Rationale: Direct visualization of principal components as rotated axes with real-time data manipulation supports the Understand/explain objective by making the abstract concept of "directions of maximum variance" geometrically concrete.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with PCA computation and visual projection
</details>

PCA 的实用指南：

- 选择 $k$ 以保留 90-95% 的总方差（使用累积解释方差图）
- 在进行 PCA 之前，始终对特征进行标准化（因为 PCA 对特征尺度敏感）
- PCA 是一种线性方法；对于非线性降维，可考虑 t-SNE 或 UMAP（超出本课程范围）

!!! tip "PCA 用于可视化"
    PCA 的一个常见用途是将高维数据降至 2 或 3 维以便可视化。即使 2D 无法捕获全部方差，PCA 也能提供数据结构的"最佳可能"低维视图。

## 关键要点

本章涵盖了三种最重要的无监督学习算法：

- **K-Means clustering** 通过迭代地将数据点分配给最近的 **centroid** 并更新 centroid，将数据划分为 $K$ 个球形 **cluster**。**K-Means workflow** 交替执行分配和更新步骤，直至以 **Euclidean distance** 为基础的 **clustering objective**（簇内平方和）收敛。
- **Cosine similarity** 提供基于向量角度而非大小的替代距离度量，适用于文本数据和稀疏数据。
- **DBSCAN** 是一种基于密度的算法，利用 **epsilon neighborhood** 和 MinPts 将点分类为 **core object**、**boundary point** 或 **noise point**。Cluster 通过 **density reachable** 和 **density connected** 路径形成。**DBSCAN parameters**（$\varepsilon$、MinPts）控制密度灵敏度。
- **Principal component analysis** 通过将数据投影到最大方差方向上执行 **dimensionality reduction**，从而实现高维数据集的压缩、去噪与可视化。

??? question "自测：你能回答以下问题吗？"
    1. 如果以差异很大的初始 centroid 运行 K-Means，结果会怎样？
    2. 什么情况下应优先选用 cosine similarity 而非 Euclidean distance？
    3. DBSCAN 如何识别 noise point？
    4. 对于非球形 cluster，DBSCAN 相比 K-Means 有何优势？
    5. 如果前两个 principal component 捕获了 95% 的方差，这说明数据具有什么特征？


[See Annotated References](./references.md)
