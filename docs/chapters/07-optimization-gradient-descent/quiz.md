# 测验：优化与梯度下降

通过以下题目测试你对训练 machine learning 模型的基于梯度的优化方法的理解。

---

#### 1. 代价函数（cost function）的梯度（gradient）代表什么？

<div class="upper-alpha" markdown>
1. 所有可能参数设置中代价函数的最小值
2. 一个偏导数向量，指向函数最陡上升的方向
3. 衡量代价面（cost landscape）曲率的二阶导数
4. 在单个 mini-batch 训练样本上计算的平均损失
</div>

??? question "显示答案"
    正确答案是 **B**。梯度 ∇J(θ) 是一个向量，包含代价函数对每个参数的偏导数。每个分量告诉我们当该参数略微增加时代价的变化量。关键是，梯度指向最陡上升的方向，因此沿负梯度方向移动会降低代价。

    **考察概念：** Gradient

---

#### 2. 梯度下降参数更新规则为 θ := θ − α∇J(θ)。α 代表什么？

<div class="upper-alpha" markdown>
1. 当前参数值处的梯度幅度
2. 学习率（learning rate）——控制沿负梯度方向步长大小的标量
3. 惩罚大参数值的正则化系数
4. 用于计算梯度的训练样本数量
</div>

??? question "显示答案"
    正确答案是 **B**。学习率 α 是一个正标量超参数，控制算法在每次更新时沿负梯度方向迈出的步长大小。如果 α 太大，算法可能超过最小值并发散。如果 α 太小，收敛非常慢。选择合适的学习率至关重要。

    **考察概念：** Learning Rate、Parameter Update Rule

---

#### 3. 批量梯度下降（batch gradient descent）与随机梯度下降（SGD，Stochastic Gradient Descent）的关键区别是什么？

<div class="upper-alpha" markdown>
1. Batch gradient descent 在每个训练样本后更新参数；SGD 在整个数据集后更新
2. Batch gradient descent 在整个训练集上计算梯度；SGD 每次更新使用一个随机样本计算梯度
3. Batch gradient descent 仅用于神经网络；SGD 仅用于线性模型
4. Batch gradient descent 使用固定学习率；SGD 使用自适应学习率
</div>

??? question "显示答案"
    正确答案是 **B**。Batch gradient descent 在每次更新前对全部 n 个训练样本计算精确梯度，产生稳定但缓慢的进展。随机梯度下降（SGD）每次更新使用一个随机选择的样本——这是有噪声的，但每步速度更快，并且可以逃离浅层局部最小值。Mini-batch gradient descent 是实践中的折中方案。

    **考察概念：** Batch Gradient Descent、Stochastic Gradient Descent

---

#### 4. Mini-batch gradient descent 在实践中比批量和随机梯度下降都更受青睐，因为它实现了哪种平衡？

<div class="upper-alpha" markdown>
1. 它通过计算自适应步长消除了调整学习率的需要
2. 它平衡了计算效率（批次上的向量化计算）和梯度稳定性（比 SGD 噪声更少）
3. 它保证收敛到全局最小值，不同于其他两种变体
4. 它不需要超参数选择，不像 batch GD 那样需要选择 epoch 数量
</div>

??? question "显示答案"
    正确答案是 **B**。Mini-batch gradient descent 在一小批样本（通常32-512个）上计算梯度。这允许向量化的 GPU 操作（比一次一个样本更高效），同时引入足够的噪声以避免极浅的局部最小值（比精确但缓慢的批量方法更好）。它是 deep learning 中的事实标准。

    **考察概念：** Mini-batch Gradient Descent

---

#### 5. 在梯度下降中将学习率设置得太高会发生什么？

<div class="upper-alpha" markdown>
1. 训练变慢，因为每次参数更新过于保守
2. 算法收敛到次优局部最小值而不是全局最小值
3. 参数发散——振荡或无界增长——因为更新超过了最小值
4. 梯度过早变为零，导致训练在收敛之前停止
</div>

??? question "显示答案"
    正确答案是 **C**。过大的学习率会导致发散：每步太大，算法超过最小值，代价函数振荡或爆炸。这称为发散（divergence）。过小的学习率（选项 A）会导致收敛非常慢，但不会发散。因此，选择合适的学习率至关重要。

    **考察概念：** Divergence、Learning Rate Selection

---

#### 6. 梯度下降"收敛"（converged）是什么意思？

<div class="upper-alpha" markdown>
1. 梯度变得非常大，表明算法找到了曲率高的区域
2. 迭代之间代价函数值和参数变化变得可以忽略不计
3. 训练损失等于零，意味着模型完美拟合所有训练样本
4. 验证损失停止改善，触发提前停止（early stopping）
</div>

??? question "显示答案"
    正确答案是 **B**。收敛意味着梯度下降算法已达到稳定解，其中进一步的迭代在代价函数值和参数值方面都产生可忽略的变化。在实践中，当梯度范数或代价变化低于一个小的容差阈值时，收敛被宣告。完美的零损失（C）通常既无法实现也不受欢迎。

    **考察概念：** Convergence

---

#### 7. 当正规方程（Normal Equation）为线性回归提供精确解时，为什么神经网络训练需要梯度下降？

<div class="upper-alpha" markdown>
1. 对于小数据集且特征少的情况，梯度下降比正规方程更快
2. 神经网络没有封闭解，因为其损失函数是非凸的且涉及多层组合
3. 正规方程需要带标签数据，而神经网络在训练期间不使用
4. 神经网络使用整数参数，正规方程无法求解
</div>

??? question "显示答案"
    正确答案是 **B**。正规方程只适用于线性回归，因为最小二乘目标具有唯一的解析最小值。神经网络损失函数是高度非凸的（有许多局部最小值和鞍点），涉及许多非线性函数的组合。不存在封闭形式的解；基于迭代梯度的优化是唯一实用的方法。

    **考察概念：** Optimization、Gradient Descent

---

#### 8. Machine learning 模型的损失面（loss landscape）是哪两个量的图？

<div class="upper-alpha" markdown>
1. 不同 epoch 的训练精度与验证精度
2. 代价函数值作为模型参数的函数
3. 不同批大小（batch sizes）下学习率与收敛速度的关系
4. 梯度幅度与网络层数的关系
</div>

??? question "显示答案"
    正确答案是 **B**。损失面（或误差面）将代价函数 J(θ) 可视化为参数值 θ 空间上的图。对于两个参数，可以显示为3D曲面或等高线图。理解损失面——它是否凸的、是否有多个最小值或包含平坦鞍点——指导优化算法设计。

    **考察概念：** Loss Landscape

---

#### 9. 鉴于随机梯度下降（SGD）每次更新使用一个随机训练样本，对于非常大的数据集，它的哪个特性最有价值？

<div class="upper-alpha" markdown>
1. 它的更新与批量梯度下降相同，但并行执行
2. 每次更新计算成本低，与批量 GD 相比，单位时间内可以进行更多参数更新
3. 它保证收敛到全局最小值，无论损失面形状如何
4. 它不需要指定学习率，因为步长由噪声水平决定
</div>

??? question "显示答案"
    正确答案是 **B**。对于 n 个训练样本，批量梯度下降在单次更新前计算 n 个损失值。SGD 计算一个损失并立即更新。对于 n = 1,000,000，这意味着 SGD 可以在批量 GD 进行一次更新的时间内进行一百万次更新。这种巨大的速度优势使 SGD 和 mini-batch SGD 对于大规模 ML 训练至关重要。

    **考察概念：** Stochastic Gradient Descent、Optimization

---

#### 10. 一名 machine learning 工程师注意到训练损失起初下降很快，然后非常缓慢，最终停止下降。以下哪项最好地描述了适当的行动？

<div class="upper-alpha" markdown>
1. 增加批大小（batch size）以减少梯度噪声，实现更快的最终收敛
2. 增加学习率以逃离缓慢收敛区域，更快到达最小值
3. 应用学习率调度（learning rate schedule，如随时间衰减 α）以在早期迈大步，在接近收敛时迈小步
4. 从 mini-batch 切换到完整批量梯度下降以消除梯度近似误差
</div>

??? question "显示答案"
    正确答案是 **C**。学习率调度在训练过程中降低 α。训练早期的大步长使进展迅速；接近最小值时的较小步长防止过冲（overshooting）。常见的调度包括阶梯衰减（step decay）、指数衰减（exponential decay）和余弦退火（cosine annealing）。在训练后期增加学习率（B）有在最小值附近发散的风险。

    **考察概念：** Learning Rate Selection、Convergence

---
