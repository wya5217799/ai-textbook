# 测验：线性回归

通过以下题目测试你对线性回归模型、损失指标和正规方程的理解。

---

#### 1. 线性回归（linear regression）解决的是哪类 supervised learning 任务？

<div class="upper-alpha" markdown>
1. 聚类（Clustering）— 将相似数据点分组到类别中
2. 分类（Classification）— 将输入分配到离散类别标签
3. 回归（Regression）— 从输入特征预测连续数值输出
4. Reinforcement learning — 通过奖励信号学习策略（policy）
</div>

??? question "显示答案"
    正确答案是 **C**。Linear regression 是一种用于回归任务的 supervised learning 算法，目标是预测连续值。例如预测房价、温度或考试成绩。分类（B）预测离散类别，而非连续值。

    **考察概念：** Regression

---

#### 2. 在线性模型 ŷ = θ₁x + θ₀ 中，θ₁ 和 θ₀ 分别代表什么？

<div class="upper-alpha" markdown>
1. θ₁ 是损失函数，θ₀ 是预测误差
2. θ₁ 是斜率（x 的权重），θ₀ 是截距（bias term）
3. θ₁ 是因变量，θ₀ 是自变量
4. θ₁ 是学习率（learning rate），θ₀ 是正则化系数
</div>

??? question "显示答案"
    正确答案是 **B**。在简单线性回归中，θ₁ 是斜率——它控制当 x 增加一个单位时 ŷ 的变化量。θ₀ 是截距（bias term）——当 x = 0 时 ŷ 的预测值。它们共同定义了模型拟合到数据的直线。

    **考察概念：** Slope、Intercept、Bias Term、Linear Model

---

#### 3. 线性回归中的残差（residual）是什么？

<div class="upper-alpha" markdown>
1. 梯度下降（gradient descent）过程中学习到的斜率参数
2. 单个样本的实际目标值与模型预测值之间的差
3. 用于评估模型的所有训练样本的平均损失
4. 为防止模型过拟合（overfitting）而添加的正则化惩罚
</div>

??? question "显示答案"
    正确答案是 **B**。样本 i 的残差定义为 eᵢ = yᵢ - ŷᵢ，其中 yᵢ 是真实目标值，ŷᵢ 是预测值。残差测量每个数据点到拟合直线的垂直距离。普通最小二乘法（Ordinary Least Squares）最小化残差平方和。

    **考察概念：** Residual

---

#### 4. 均方误差（MSE，Mean Squared Error）是如何计算的？

<div class="upper-alpha" markdown>
1. 所有残差之和除以样本数量
2. 预测值与真实值之间平均平方差的平方根
3. 预测值与实际值之间差的平方的平均值
4. 任意预测值与其真实值之间的最大绝对差
</div>

??? question "显示答案"
    正确答案是 **C**。MSE = (1/n) × Σ(yᵢ - ŷᵢ)²。它计算残差平方的平均值。平方化使大误差受到比小误差更大的惩罚。选项 B 描述的是均方根误差（RMSE，Root Mean Squared Error），它是 MSE 的平方根，与目标变量具有相同的单位。

    **考察概念：** Mean Squared Error

---

#### 5. 均方根误差（RMSE）相较于 MSE 有什么优势？

<div class="upper-alpha" markdown>
1. RMSE 总是小于 MSE，因此更容易达到更低的值
2. RMSE 与目标变量具有相同的单位，使其可以直接解释
3. RMSE 忽略异常值，使其对极端预测误差更具鲁棒性
4. RMSE 计算更快，因为避免了平方运算
</div>

??? question "显示答案"
    正确答案是 **B**。RMSE = √MSE。取平方根恢复了目标变量的单位。如果以千英镑为单位预测房价，MSE 的单位是千英镑²（无意义），而 RMSE 的单位是千英镑（可解释）。这种可解释性使 RMSE 成为向相关方传达模型性能的首选指标。

    **考察概念：** Root Mean Squared Error

---

#### 6. R 方（R²）在线性回归中衡量什么？

<div class="upper-alpha" markdown>
1. 与目标变量相同单位的预测误差平均幅度
2. 目标变量中由模型预测解释的方差比例
3. 模型参数数量相对于训练样本数量的比值
4. 拟合后斜率和截距参数之间的相关性
</div>

??? question "显示答案"
    正确答案是 **B**。R² = 1 - SSE/SST，其中 SSE 是误差平方和，SST 是总平方和。它衡量目标变量方差中被模型捕获的比例。R² = 1 表示完美预测；R² = 0 意味着模型不比预测均值更好；负值表示模型比均值基线更差。

    **考察概念：** R-Squared

---

#### 7. 平均绝对误差（MAE，Mean Absolute Error）是什么？它与 MSE 有何不同？

<div class="upper-alpha" markdown>
1. MAE 在取平均前对单个误差进行平方；MSE 取绝对值
2. MAE 对预测值与真实值之间的绝对差取平均；MSE 对平方差取平均，对大误差的惩罚更重
3. MAE 衡量训练集上的性能；MSE 衡量验证集上的性能
4. MAE 仅适用于分类问题；MSE 仅适用于回归问题
</div>

??? question "显示答案"
    正确答案是 **B**。MAE = (1/n) × Σ|yᵢ - ŷᵢ|。因为它使用绝对值而非平方，MAE 对所有误差的处理是等比例的，对大异常值的敏感性低于 MSE。当数据集包含极端异常误差时，MAE 可能更受青睐；当大误差代价特别高时，MSE 的二次惩罚更为合适。

    **考察概念：** Mean Absolute Error

---

#### 8. 正规方程（Normal Equation）提供了什么？

<div class="upper-alpha" markdown>
1. 一种通过沿梯度调整参数的迭代更新规则
2. 一种使用矩阵运算在一步内计算最优参数的封闭解析解（closed-form analytical solution）
3. 一种在训练期间惩罚大参数值的正则化技术
4. 一种为拟合曲线数据选择最佳多项式次数的方法
</div>

??? question "显示答案"
    正确答案是 **B**。正规方程 θ = (X^T X)^{-1} X^T y 通过矩阵代数直接计算最优参数，无需迭代步骤。它精确地找到最小化误差平方和的参数向量。其局限性在于计算量：求 X^T X 的逆的复杂度为 O(n³)，对于非常大的特征空间变得不切实际。

    **考察概念：** Normal Equation

---

#### 9. 在具有 p 个特征的多元线性回归（multiple linear regression）中，参数向量 θ 的正确形状是什么？

<div class="upper-alpha" markdown>
1. (1, p) — 每个特征一个条目的行向量
2. (p+1, 1) — 每个特征一个权重加上 bias term 的列向量
3. (p, p) — 捕获特征间交互的方阵
4. (1, 1) — 代表整体模型拟合的标量
</div>

??? question "显示答案"
    正确答案是 **B**。参数向量 θ 包含每个特征一个权重加上一个 bias term（θ₀），共 p+1 个条目。当设计矩阵 X 包含一列全为1来吸收偏置时，θ = [θ₀, θ₁, ..., θₚ]^T 的形状为（p+1，1）。预测 ŷ = Xθ 是长度为 n（样本数量）的向量。

    **考察概念：** Parameter Vector、Bias Term

---

#### 10. 一个模型实现了非常低的训练 MSE 但很高的验证 MSE。以下哪种 SSE 量的组合与这一观察一致？

<div class="upper-alpha" markdown>
1. 非常大的总平方和（SST）和非常小的回归平方和（SSR）
2. 训练数据上非常小的误差平方和，但验证数据上有大残差
3. 训练和验证上相等的 SSE 值，均接近零
4. 大 SST 和大 SSR，表明模型在两个分割中都解释了大部分方差
</div>

??? question "显示答案"
    正确答案是 **B**。低训练 MSE 意味着小的训练 SSE——模型紧密拟合训练点。高验证 MSE 意味着验证集上有大残差。这种差异是过拟合（overfitting）的标志：模型记住了训练特有的模式（包括噪声），而不是学习可泛化的关系。

    **考察概念：** Sum of Squares Error、Mean Squared Error、Residual

---
