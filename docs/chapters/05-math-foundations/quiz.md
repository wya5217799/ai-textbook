# 测验：Machine Learning 的数学基础

通过以下题目测试你对 ML 所需的线性代数、概率论和优化数学的理解。

---

#### 1. 一个训练数据集有200个样本，每个样本有8个特征。特征矩阵 X 的形状是什么？

<div class="upper-alpha" markdown>
1. (8, 200) — 8行，200列
2. (200, 8) — 200行，8列
3. (200, 1) — 200行，单一组合特征
4. (8, 8) — 特征协方差的方阵
</div>

??? question "显示答案"
    正确答案是 **B**。按照 ML 惯例，特征矩阵 X 的形状为（n_samples，n_features）。每行是一个样本，每列是一个特征。有200个样本和8个特征，X 是200 × 8的矩阵。权重向量 θ 的形状为（8，1），预测向量 ŷ = Xθ 的形状为（200，1）。

    **考察概念：** Matrix Representation

---

#### 2. 矩阵乘法 AB 在矩阵 A 和 B 满足什么条件时才有定义？

<div class="upper-alpha" markdown>
1. A 和 B 必须有相同的行数
2. A 和 B 必须都是相同大小的方阵
3. A 的列数必须等于 B 的行数
4. A 和 B 必须有相同的元素数量
</div>

??? question "显示答案"
    正确答案是 **C**。矩阵乘法 AB 要求 A 的形状为（m，n），B 的形状为（n，p），内维度需要匹配。结果的形状为（m，p）。这个条件确保 A 的每一行可以与 B 的每一列配对进行点积运算。预测公式 ŷ = Xθ 只有在 X 为（m，n）而 θ 为（n，1）时才有效。

    **考察概念：** Matrix Multiplication

---

#### 3. 对矩阵进行转置（transpose）在几何上实现了什么？

<div class="upper-alpha" markdown>
1. 它对矩阵求逆，使得 AA^T 等于单位矩阵
2. 它沿主对角线反射矩阵，交换行和列
3. 它按常数因子缩放所有元素
4. 它将矩阵从行优先存储转换为列优先存储
</div>

??? question "显示答案"
    正确答案是 **B**。矩阵 A 的转置 A^T 是通过沿主对角线反射得到的：元素 a_ij 变为 a_ji。形状为（m，n）的矩阵转置后变为（n，m）。在 ML 中，转置经常出现在正规方程（normal equation）θ = (X^T X)^{-1} X^T y 等公式中。

    **考察概念：** Matrix Transpose

---

#### 4. 哪种概率分布以均值 μ 和标准差 σ 的钟形曲线为特征？

<div class="upper-alpha" markdown>
1. Bernoulli 分布
2. 均匀分布（Uniform distribution）
3. 高斯分布（Gaussian distribution）
4. 二项分布（Binomial distribution）
</div>

??? question "显示答案"
    正确答案是 **C**。高斯（正态）分布是完全由均值 μ 和方差 σ² 描述的连续概率分布。其概率密度函数形成典型的钟形曲线。许多自然测量值遵循高斯分布，该分布是线性回归和最大似然估计（maximum likelihood estimation）的基础。

    **考察概念：** Gaussian Distribution、Probability Distribution

---

#### 5. Bernoulli 分布建模的是什么？

<div class="upper-alpha" markdown>
1. 身高或温度等连续测量值的分布
2. 单次二元试验的结果，成功概率为 p，失败概率为（1-p）
3. 泊松过程中罕见事件之间的等待时间
4. 许多独立随机变量之和的分布
</div>

??? question "显示答案"
    正确答案是 **B**。Bernoulli 分布对单次二元结果建模：成功（1）的概率为 p，失败（0）的概率为（1-p）。它是二元分类的基础：逻辑回归（logistic regression）中以输入 x 为条件的标签 y 遵循 Bernoulli 分布。二项分布（D）是将 Bernoulli 推广到 n 次试验。

    **考察概念：** Bernoulli Distribution

---

#### 6. 在 machine learning 中，损失函数（loss function）用于什么？

<div class="upper-alpha" markdown>
1. 在预处理过程中选择要包含在模型中的特征
2. 衡量单个训练样本的模型预测与真实目标值之间的差异
3. 对模型参数进行正则化（regularize）以防止过拟合（overfitting）
4. 在训练开始前初始化模型权重
</div>

??? question "显示答案"
    正确答案是 **B**。损失函数（loss function）衡量模型对单个样本预测的错误程度。常见例子包括用于回归的平方损失（squared loss）(y - ŷ)² 和用于分类的交叉熵损失（cross-entropy loss）。代价函数（cost function）是训练集上所有损失的平均值。最小化代价函数是优化的目标。

    **考察概念：** Loss Function

---

#### 7. 什么是最大似然估计（MLE，Maximum Likelihood Estimation），它寻求找到什么？

<div class="upper-alpha" markdown>
1. 一种通过选择参数最少的模型来避免过拟合（overfitting）的技术
2. 一种寻找能最大化在模型下观测训练数据概率的参数值的统计方法
3. 一种计算正规方程（normal equation）中矩阵逆的算法
4. 一种选择能最小化梯度下降（gradient descent）收敛时间的学习率的方法
</div>

??? question "显示答案"
    正确答案是 **B**。最大似然估计寻找使观测训练数据最可能出现的模型参数 θ。形式上，它最大化 P(data | θ)。在高斯噪声假设下的线性回归中，MLE 等价于最小化均方误差（mean squared error），将训练的概率视角和优化视角联系起来。

    **考察概念：** Maximum Likelihood

---

#### 8. 为什么 machine learning 从业者通常最大化对数似然（log-likelihood）而不是直接最大化似然（likelihood）？

<div class="upper-alpha" markdown>
1. 因为对数将最大化问题转化为最小化问题
2. 因为将许多小概率相乘会导致数值下溢（numerical underflow）；对数将乘积转换为求和
3. 因为对数似然总是大于似然，使优化更快
4. 因为神经网络库内部只支持对数计算
</div>

??? question "显示答案"
    正确答案是 **B**。似然是所有训练样本的概率乘积（每个都在0和1之间）。对于大型数据集，这个乘积会数值下溢为零。取对数将乘积转换为求和（因为 log(ab) = log a + log b），这在数值上是稳定的。由于对数是单调递增函数，最大化对数似然等价于最大化似然。

    **考察概念：** Log-likelihood

---

#### 9. 什么是模型复杂度（model complexity），它与过拟合（overfitting）风险有何关系？

<div class="upper-alpha" markdown>
1. 模型复杂度衡量训练速度；更复杂的模型在现代硬件上训练更快
2. 模型复杂度指可学习参数的数量和性质；更高的复杂度增加了拟合训练数据的能力和 overfitting 的风险
3. 模型复杂度衡量模型收敛前所需的训练样本数量
4. 模型复杂度描述输入中包含的特征数量；更多特征总是能提高泛化能力
</div>

??? question "显示答案"
    正确答案是 **B**。模型复杂度衡量模型的容量——通常与参数数量有关。高度复杂的模型可以记住训练数据包括噪声，导致 overfitting（低训练误差，高测试误差）。正则化技术（L1、L2）约束复杂度。偏差-方差权衡（bias-variance tradeoff）将这一关系形式化。

    **考察概念：** Model Complexity

---

#### 10. Machine learning 优化中的目标函数（objective function）通常代表哪个量？

<div class="upper-alpha" markdown>
1. 一个 epoch 内正确分类的训练样本数量
2. 优化算法寻求最小化的训练数据集上的平均损失
3. 控制参数更新幅度随时间变化的学习率调度（learning rate schedule）
4. 确定隐藏层数量的架构超参数（hyperparameter）
</div>

??? question "显示答案"
    正确答案是 **B**。目标函数（也称为代价函数或训练目标）将所有训练样本的损失聚合，通常取平均值。梯度下降等优化算法迭代调整模型参数以最小化该函数。目标函数、代价函数和损失函数这几个术语通常可以互换使用，尽管损失通常指单个样本的情况。

    **考察概念：** Objective Function、Cost Function

---
