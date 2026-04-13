# 测验：聚类与无监督学习算法

通过以下题目测试你对 K-Means、DBSCAN、PCA 和降维的理解。

---

#### 1. 聚类算法（clustering algorithms）的基本目标是什么？

<div class="upper-alpha" markdown>
1. 使用带标签的训练样本为每个数据点预测连续输出值
2. 将数据点分配到组中，使组内的点彼此之间比其他组的点更相似
3. 在保留类别区分性的同时减少数据集中的特征数量
4. 学习将两个带标签类别分开的决策边界
</div>

??? question "显示答案"
    正确答案是 **B**。聚类（clustering）是一种 unsupervised learning 任务，根据相似性将数据划分为组（簇）。组内相似性最大化，组间相似性最小化。与有监督分类不同，不提供标签——算法仅从数据中发现结构。

    **考察概念：** Cluster、K-Means Clustering

---

#### 2. 在 K-Means 算法中，质心（centroid）是什么？

<div class="upper-alpha" markdown>
1. 在训练前被选为初始簇代表的预定义数据点
2. 当前分配到一个簇的所有数据点的平均位置
3. 数据集中距所有其他点最远的数据点，用于检测异常值
4. 控制每个簇边界半径的超参数（hyperparameter）
</div>

??? question "显示答案"
    正确答案是 **B**。质心是当前分配到该簇的所有数据点的均值（平均位置）。每次分配步骤后，K-Means 通过对其成员的坐标取平均来重新计算每个质心。然后质心作为下一次分配步骤的簇代表。

    **考察概念：** Centroid、K-Means Clustering

---

#### 3. K-Means 聚类算法最小化的目标是什么？

<div class="upper-alpha" markdown>
1. 数据集中所有数据点之间的成对距离之和
2. 对数据集进行划分所需的簇数 K
3. 每个点到其簇质心的距离平方的总和（总的组内距离平方和）
4. 任意两个质心之间的最大距离，确保簇被良好地分离
</div>

??? question "显示答案"
    正确答案是 **C**。K-Means 目标（惯性，inertia）是 J = Σₖ Σᵢ∈Cₖ ||xᵢ - μₖ||²。它对每个数据点到其分配质心的欧几里得距离平方求和。最小化这个目标产生紧凑的簇。K-Means 在将点分配到最近质心和更新质心以最小化这个目标之间交替进行。

    **考察概念：** Clustering Objective、K-Means Workflow

---

#### 4. K-Means 聚类的主要局限性是什么，DBSCAN 被设计来克服这一局限？

<div class="upper-alpha" markdown>
1. K-Means 对大型数据集计算太慢；DBSCAN 对数百万个点更快
2. K-Means 需要预先指定 K，并假设球形簇；DBSCAN 发现任意形状的簇并识别噪声点
3. K-Means 不能处理数值特征；DBSCAN 同时支持数值和分类数据
4. K-Means 对特征尺度敏感；DBSCAN 使用余弦相似度而非欧几里得距离
</div>

??? question "显示答案"
    正确答案是 **B**。K-Means 要求用户预先指定 K（簇数），并产生凸形的、大致球形的簇。现实世界中的数据通常具有不规则形状的簇并包含噪声（异常值）。DBSCAN 可以发现任意形状的簇，识别不属于任何簇的噪声点，且不需要预先指定 K。

    **考察概念：** DBSCAN、K-Means Clustering

---

#### 5. 在 DBSCAN 中，什么是"核心对象"（core object）？

<div class="upper-alpha" markdown>
1. 算法开始时随机选择为簇代表的任意数据点
2. 在其 epsilon 邻域内至少具有所需最少邻居数量的数据点
3. 通过对分配到一个簇的所有点取平均来计算的质心
4. 恰好位于两个不同簇之间边界上的数据点
</div>

??? question "显示答案"
    正确答案是 **B**。DBSCAN 中的核心对象是在半径 epsilon（ε）内至少有 MinPts 个邻居的点。核心对象构成簇的密集内部。在 ε 范围内但本身不是核心对象的点是边界点。既不是核心对象也无法从任何核心对象到达的点是噪声点。

    **考察概念：** Core Object、DBSCAN

---

#### 6. DBSCAN 的两个关键参数是什么，每个参数控制什么？

<div class="upper-alpha" markdown>
1. K（簇数）和距离度量；它们决定簇的形状和数量
2. Epsilon（ε）和 MinPts；ε 定义邻域半径，MinPts 是核心对象所需的最少邻居数
3. 学习率和最大迭代次数；它们控制 DBSCAN 收敛的速度
4. 方差阈值和均值阈值；它们决定哪些特征包含在距离计算中
</div>

??? question "显示答案"
    正确答案是 **B**。DBSCAN 有两个参数：epsilon（ε），定义邻域的半径；以及 MinPts，点成为核心对象所需在 ε 范围内的最少点数。小 ε/大 MinPts → 更少、更紧密的簇，噪声更多。大 ε/小 MinPts → 更少的大簇。这些参数需要领域知识或系统搜索才能适当设置。

    **考察概念：** DBSCAN Parameters、Epsilon Neighborhood

---

#### 7. 主成分分析（PCA，Principal Component Analysis）是什么，它产生什么？

<div class="upper-alpha" markdown>
1. 一种找到与目标标签最相关特征的有监督算法
2. 一种找到数据中最大方差方向的无监督降维技术，这些方向彼此正交
3. 一种通过将数据点投影到低维流形上来对数据点进行分组的聚类算法
4. 一种基于 L1 贡献删除最不重要特征的正则化技术
</div>

??? question "显示答案"
    正确答案是 **B**。PCA 找到一组正交方向（主成分，principal components），这些方向捕获了数据中的最大方差。第一主成分解释最多的方差，第二个（与第一个正交）解释次多的方差，依此类推。将数据投影到前 k 个成分上降低了维度，同时保留了最具信息量的结构。

    **考察概念：** Principal Component Analysis、Dimensionality Reduction

---

#### 8. 在 DBSCAN 中，什么是"噪声点"（noise point）？

<div class="upper-alpha" markdown>
1. 具有损坏或缺失特征值而无法处理的数据点
2. 不在任何核心对象的 epsilon 邻域内、因此不属于任何簇的点
3. 位于两个相邻簇之间边界上、被随机分配到一个簇的点
4. 到最近质心的距离超过聚类目标阈值的点
</div>

??? question "显示答案"
    正确答案是 **B**。在 DBSCAN 中，噪声点（异常值）是不在任何核心对象的 epsilon 邻域内的数据点。它无法被分配到任何簇。这种噪声检测是 DBSCAN 的一个关键特性——与 K-Means 不同，K-Means 强制每个点进入一个簇，DBSCAN 明确识别异常值并将其标记为噪声。

    **考察概念：** Noise Point、DBSCAN

---

#### 9. 为什么工程师可能在对高维数据运行聚类算法之前应用降维？

<div class="upper-alpha" markdown>
1. 降维将分类特征转换为聚类算法所需的数值
2. 高维度会导致距离度量变得不可靠；降维到低维恢复了有意义的距离关系
3. K-Means 等聚类算法无法处理超过10个维度的特征向量
4. 降维平衡了类别频率，防止簇分配中的多数类偏差
</div>

??? question "显示答案"
    正确答案是 **B**。在高维度下，维度灾难（curse of dimensionality）使所有成对距离几乎相等，破坏了基于距离的聚类。降维（如 PCA）将数据投影到低维空间，在那里距离更有意义、可视化且计算上可处理。这通常显著提高聚类质量和速度。

    **考察概念：** Dimensionality Reduction、Principal Component Analysis

---

#### 10. 余弦相似度（cosine similarity）测量两个数据向量之间的哪个属性？

<div class="upper-alpha" markdown>
1. 两个向量在空间中端点之间的欧几里得距离
2. 两个向量之间的夹角，测量方向相似性，与其幅度无关
3. 两个向量同时具有非零值的维度数量
4. 两个向量的逐元素乘积之和，除以其总长度
</div>

??? question "显示答案"
    正确答案是 **B**。余弦相似度 = (x · y) / (||x|| × ||y||)。它测量两个向量之间夹角的余弦值，范围从 -1（方向相反）到 1（方向相同）。方向相同的两个向量余弦相似度为1，无论其幅度如何。这使余弦相似度特别适用于文档长度各异的文本数据。

    **考察概念：** Cosine Similarity

---
