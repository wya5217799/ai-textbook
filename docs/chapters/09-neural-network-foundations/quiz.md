# 测验：神经网络基础

通过以下题目测试你对神经元、感知机、激活函数和全连接网络架构的理解。

---

#### 1. 单个感知机（perceptron）执行什么计算？

<div class="upper-alpha" markdown>
1. 它选择值最高的输入并直接传递到输出
2. 它计算所有输入的加权和，加上偏置（bias），并将结果通过激活函数（activation function）传递
3. 它对所有输入值取平均，并乘以一个学习到的标量权重
4. 它在查找表中存储输入模式，并在预测时检索最近似的匹配
</div>

??? question "显示答案"
    正确答案是 **B**。感知机（perceptron）计算 z = Σwᵢxᵢ + b（加权和加偏置），然后应用激活函数：output = f(z)。这三步计算（加权和 → 加偏置 → 应用激活函数）是所有人工神经网络的基本构建块，无论架构如何。

    **考察概念：** Perceptron、Weight、Bias

---

#### 2. 在人工神经网络中，权重（weights）的作用是什么？

<div class="upper-alpha" markdown>
1. 它们存储用于训练的输入数据
2. 它们是决定神经元之间连接强度的可学习参数
3. 它们控制梯度下降（gradient descent）期间的学习率（learning rate）
4. 它们指定每层中神经元的数量
</div>

??? question "显示答案"
    正确答案是 **B**。权重（weights）是神经网络的可学习参数。每个权重 wᵢⱼ 表示从神经元 i 到神经元 j 的连接强度。在训练过程中，反向传播（backpropagation）计算相对于权重的梯度，梯度下降（gradient descent）更新它们以最小化损失函数。所有权重共同编码网络学到的知识。

    **考察概念：** Weight

---

#### 3. 为什么激活函数（activation functions）在多层神经网络中是必要的？

<div class="upper-alpha" markdown>
1. 它们将网络的输出归一化为0到1之间的概率
2. 它们引入非线性（non-linearity），否则多层网络将退化为单一线性变换
3. 它们通过减少所需的梯度计算次数来加速训练
4. 它们在前向传播（forward pass）期间通过裁剪大权重值来防止梯度爆炸
</div>

??? question "显示答案"
    正确答案是 **B**。没有非线性激活函数，堆叠多个线性层在数学上等价于单个线性层（因为线性函数的线性组合仍然是线性的）。非线性激活使神经网络能够学习复杂的非线性决策边界。这就是为什么激活函数对于 deep learning 的正常工作至关重要。

    **考察概念：** Activation Function

---

#### 4. 哪种激活函数对正输入输出原值不变，对负输入输出零？

<div class="upper-alpha" markdown>
1. Sigmoid 激活
2. Tanh 激活
3. ReLU 激活
4. Softmax 激活
</div>

??? question "显示答案"
    正确答案是 **C**。整流线性单元（ReLU，Rectified Linear Unit）定义为 f(z) = max(0, z)。当 z > 0 时输出 z，当 z ≤ 0 时输出0。ReLU 是最广泛使用的隐藏层激活函数，因为它计算简单，对正值不会饱和，并且在实践中比 sigmoid 或 tanh 能实现更快的训练。

    **考察概念：** ReLU Activation

---

#### 5. 在深度网络中，sigmoid 激活函数相较于 ReLU 的主要缺点是什么？

<div class="upper-alpha" markdown>
1. Sigmoid 只适用于二元分类；它不能用于回归输出层
2. Sigmoid 对大的正值或负值输入会饱和，产生接近零的梯度，减慢训练（梯度消失问题，vanishing gradient problem）
3. Sigmoid 比 ReLU 需要更多内存，因为其输出值始终是非负的
4. Sigmoid 不可微，与反向传播（backpropagation）不兼容
</div>

??? question "显示答案"
    正确答案是 **B**。Sigmoid 函数 σ(z) = 1/(1+e^{-z}) 将所有输入压缩到 (0,1) 范围内。对于大的 |z|，梯度 dσ/dz ≈ 0（饱和）。当通过多层反向传播时，这些接近零的梯度相乘后消失，使早期层的权重更新变得可以忽略不计。ReLU 对正输入避免了这个问题，因为其梯度恰好为1。

    **考察概念：** Sigmoid Activation

---

#### 6. Tanh 激活函数的输出范围是哪个区间？

<div class="upper-alpha" markdown>
1. (0, 1) — 始终为正，适合概率输出
2. (-∞, +∞) — 无界，与原始线性预激活值匹配
3. (-1, 1) — 以零为中心，有利于梯度下降收敛
4. (0, +∞) — 非负，保留正值信息
</div>

??? question "显示答案"
    正确答案是 **C**。双曲正切函数 tanh(z) = (e^z - e^{-z})/(e^z + e^{-z}) 将任何实数输入映射到 (-1, 1)。其以零为中心的输出（与 sigmoid 的 (0,1) 范围不同）通常是有益的，因为它减少了反向传播期间梯度的系统性偏差。与 sigmoid 一样，对于大的 |z| 也会出现梯度消失问题。

    **考察概念：** Tanh Activation

---

#### 7. 在全连接神经网络中，输入层（input layer）的定义是什么？

<div class="upper-alpha" markdown>
1. 计算网络最终输出预测的层
2. 接收每个数据点的原始特征并将其传递给第一个隐藏层的层
3. 网络中神经元数量最多的层
4. 反向传播（backpropagation）开始计算梯度的层
</div>

??? question "显示答案"
    正确答案是 **B**。输入层是全连接网络的第一层。它包含每个输入特征一个节点。这些节点只是接收并传递原始特征值——它们不执行任何计算。输入层节点的数量等于特征向量的维度。

    **考察概念：** Input Layer

---

#### 8. 全连接（fully connected，dense）层的定义结构特性是什么？

<div class="upper-alpha" markdown>
1. 每个神经元只连接到前一层神经元的一个小的局部区域
2. 该层中的每个神经元都与前一层中的每个神经元相连
3. 同一层内的神经元以循环方式相互连接
4. 神经元在各位置共享权重，如卷积层（convolutional layers）
</div>

??? question "显示答案"
    正确答案是 **B**。在全连接（dense）层中，每个神经元接收来自前一层所有神经元的输入。如果前一层有 m 个神经元，当前层有 n 个神经元，则有 m×n 个权重连接。这种完全连接使该层具有最大的表征能力，但也具有最大的参数数量。

    **考察概念：** Fully Connected Network

---

#### 9. 哪个数学原理使反向传播（backpropagation）能够通过多个组合函数计算梯度？

<div class="upper-alpha" markdown>
1. 乘积规则（Product rule）— d(fg)/dx = f'g + fg'
2. 商规则（Quotient rule）— d(f/g)/dx = (f'g - fg')/g²
3. 链式法则（Chain rule）— d/dx[f(g(x))] = f'(g(x)) × g'(x)
4. 分部积分（Integration by parts）— ∫u dv = uv - ∫v du
</div>

??? question "显示答案"
    正确答案是 **C**。微积分中的链式法则（chain rule）允许通过将链中每个函数的导数相乘来计算函数组合的导数。神经网络是许多函数的组合（层操作），反向传播从输出层到输入层递归应用链式法则，计算所有参数的梯度。

    **考察概念：** Chain Rule

---

#### 10. 用于预测10个数字类别（0-9）之一的神经网络，其输出层应有多少个神经元，哪种激活函数是合适的？

<div class="upper-alpha" markdown>
1. 1个输出神经元，使用 ReLU 激活，输出预测的数字索引
2. 2个输出神经元，使用 sigmoid 激活，一个用于正预测，一个用于负预测
3. 10个输出神经元，使用 softmax 激活，产生10个类别上的概率分布
4. 10个输出神经元，使用 tanh 激活，输出每个类别的有符号分数
</div>

??? question "显示答案"
    正确答案是 **C**。对于10类分类，输出层有10个神经元——每个类别一个。Softmax 函数将原始分数（logits）转换为有效的概率分布：所有输出均为正且总和为1。预测类别是概率最高的那个。Sigmoid（B）用于二元分类；tanh（D）不是有效的概率输出。

    **考察概念：** Output Layer、Artificial Neural Network

---
