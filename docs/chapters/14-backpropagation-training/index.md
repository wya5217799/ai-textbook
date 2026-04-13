---
title: 用 Backpropagation 训练神经网络
description: Forward pass、backpropagation、weight update、training loop、epoch 与 dropout
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 用 Backpropagation 训练神经网络

## 摘要

本章解释神经网络如何通过 backpropagation（反向传播）不断调整参数从而实现学习。学生将学习计算预测结果的 forward pass（前向传播），然后了解 backpropagation 算法如何利用 chain rule（链式法则）计算误差信号并将其向后传播穿越整个网络。本章涵盖 weight（权重）与 bias（偏置）的更新、output layer（输出层）与 hidden layer（隐藏层）的误差计算、包含 epoch 的 training loop（训练循环），以及作为正则化技术的 dropout——用于防止深度网络中的过拟合（overfitting）。完成本章后，学生将理解神经网络的完整训练流程。

## 涵盖概念

本章涵盖学习图谱中的以下 10 个概念：

1. Forward Pass
2. Backpropagation
3. Error Signal
4. Weight Update
5. Bias Update
6. Output Layer Error
7. Hidden Layer Error
8. Epoch
9. Training Loop
10. Dropout

## 先修知识

本章建立在以下章节概念之上：

- [Chapter 5: Mathematical Foundations for Machine Learning](../05-math-foundations/index.md)
- [Chapter 7: Optimization and Gradient Descent](../07-optimization-gradient-descent/index.md)
- [Chapter 8: Model Evaluation for Regression](../08-model-evaluation-regression/index.md)
- [Chapter 9: Neural Network Foundations](../09-neural-network-foundations/index.md)

---

## 神经网络的学习问题

在第 9 章中，我们学习了神经网络如何通过 forward pass 计算预测结果。剩下的问题是：网络如何学习到正确的 weight 和 bias？答案就是 **backpropagation**——一种高效计算梯度的算法，为 gradient descent（第 7 章）提供所需梯度，从而更新网络中的每个参数。

Backpropagation 是深度学习中最重要的单一算法。它将神经网络从静态架构转变为能够随数据不断改进的学习机器。

## Forward Pass 回顾

**Forward pass（前向传播）** 通过将输入数据逐层传播来计算网络的预测结果。对于含 $L$ 层的网络，第 $l$ 层的计算为：

#### Forward Pass 方程

$z^{[l]} = W^{[l]} a^{[l-1]} + b^{[l]}$

$a^{[l]} = g^{[l]}(z^{[l]})$

其中：

- $a^{[0]} = x$ 为输入数据
- $W^{[l]}$ 为第 $l$ 层的 weight matrix（权重矩阵）
- $b^{[l]}$ 为第 $l$ 层的 bias vector（偏置向量）
- $z^{[l]}$ 为 pre-activation（预激活值，即加权求和）
- $g^{[l]}$ 为第 $l$ 层的 activation function（激活函数）
- $a^{[l]}$ 为第 $l$ 层的 activation（激活值，即输出）
- $a^{[L]} = \hat{y}$ 为最终预测结果

在 forward pass 过程中，必须存储所有中间值（每层的 $z^{[l]}$ 和 $a^{[l]}$），因为 backpropagation 阶段需要用到它们。

计算 $\hat{y}$ 后，计算 loss（损失）：

$L = \mathcal{L}(y, \hat{y})$

其中 $\mathcal{L}$ 为 loss function（损失函数）：回归问题使用 MSE，分类问题使用 cross-entropy（交叉熵）。

## Backpropagation：高效计算梯度

**Backpropagation**（"backward propagation of errors"，误差的反向传播）计算 loss function 对网络中每个 weight 和 bias 的梯度。它通过从 output layer 到 input layer 系统地应用 chain rule 来实现这一点。

### Error Signal（误差信号）

第 $l$ 层的 **error signal**（也称为 delta 或局部梯度）量化了该层中每个神经元对总 loss 的贡献程度。它是 backpropagation 中的关键中间量。

对于任意第 $l$ 层，error signal 为：

#### Error Signal 定义

$\delta^{[l]} = \frac{\partial L}{\partial z^{[l]}}$

其中：

- $\delta^{[l]}$ 为第 $l$ 层的 error signal
- $L$ 为 loss
- $z^{[l]}$ 为第 $l$ 层的 pre-activation 值

### Output Layer Error（输出层误差）

**Output layer error** 首先被计算，因为 output layer 直接与 loss function 相连。对于 output layer $L$：

#### Output Layer Error

$\delta^{[L]} = \frac{\partial L}{\partial a^{[L]}} \odot g'^{[L]}(z^{[L]})$

其中：

- $\frac{\partial L}{\partial a^{[L]}}$ 为 loss 对网络输出的导数
- $g'^{[L]}$ 为 output layer activation function 的导数
- $\odot$ 表示逐元素相乘（element-wise multiplication）

当使用 MSE loss 和线性输出时：$\delta^{[L]} = \hat{y} - y$

当使用 cross-entropy loss 和 sigmoid 输出时：$\delta^{[L]} = \hat{y} - y$

（在两种常见情形下，output layer error 都简洁地化简为预测值与真实值之差。）

### Hidden Layer Error（隐藏层误差）

**Hidden layer error** 通过将误差从后一层向前传播来计算。对于任意 hidden layer $l$：

#### Hidden Layer Error

$\delta^{[l]} = (W^{[l+1]})^T \delta^{[l+1]} \odot g'^{[l]}(z^{[l]})$

其中：

- $(W^{[l+1]})^T$ 为后一层 weight matrix 的转置
- $\delta^{[l+1]}$ 为后一层的 error signal
- $g'^{[l]}(z^{[l]})$ 为第 $l$ 层 activation function 的导数

这正是 chain rule 发挥作用之处：来自 output 的误差通过 weight matrix "向后传输"，再与局部 activation 导数相乘。每一层将其误差向前一层传递，形成一条梯度计算链。

#### 图示：Backpropagation Flow

<iframe src="../../sims/backpropagation-flow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Backpropagation Flow</summary>
Type: microsim
**sim-id:** backpropagation-flow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how backpropagation propagates error signals from the output layer backward through the hidden layers using the chain rule, computing gradients for each weight and bias.

Purpose: Step-through visualization of backpropagation on a small network (2 inputs, 1 hidden layer with 2 neurons, 1 output), showing the forward pass then the backward pass with concrete numerical values at each step.

Data Visibility Requirements:
Stage 1 (Forward): Show input values $x = [0.5, 0.8]$, weights, biases. Compute $z^{[1]}$, $a^{[1]}$ for hidden layer.
Stage 2 (Forward): Compute $z^{[2]}$, $a^{[2]} = \hat{y}$ for output layer. Show loss $L$.
Stage 3 (Backward - Output): Compute $\delta^{[2]} = \hat{y} - y$ with concrete number. Show gradient arrows in red flowing backward.
Stage 4 (Backward - Hidden): Compute $\delta^{[1]} = (W^{[2]})^T \delta^{[2]} \odot g'(z^{[1]})$ with concrete numbers.
Stage 5 (Gradients): Show $\frac{\partial L}{\partial W^{[2]}}$, $\frac{\partial L}{\partial W^{[1]}}$, $\frac{\partial L}{\partial b^{[2]}}$, $\frac{\partial L}{\partial b^{[1]}}$ with values.
Stage 6 (Update): Show weight update: $W^{[l]} \leftarrow W^{[l]} - \alpha \frac{\partial L}{\partial W^{[l]}}$ with new values.

Interactive controls:
- "Next Step" and "Previous Step" buttons
- Slider: Learning rate $\alpha$ (0.01 to 1.0)
- Display: Network diagram with current values on all edges and nodes
- Forward pass values in blue, backward pass values in red

Instructional Rationale: Concrete numerical step-through with distinct forward (blue) and backward (red) phases supports the Understand/explain objective by making the abstract algorithm into a traceable sequence of arithmetic operations.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged forward and backward computation
</details>

## Weight 与 Bias 的更新

一旦所有层的 error signal 计算完毕，每个 weight 和 bias 的梯度为：

### Weight Update（权重更新）

第 $l$ 层 loss 关于 weight 的梯度为：

#### Weight 梯度

$\frac{\partial L}{\partial W^{[l]}} = \delta^{[l]} (a^{[l-1]})^T$

其中：

- $\delta^{[l]}$ 为第 $l$ 层的 error signal
- $a^{[l-1]}$ 为前一层的 activation

**Weight update（权重更新）** 规则应用 gradient descent：

$W^{[l]} \leftarrow W^{[l]} - \alpha \frac{\partial L}{\partial W^{[l]}}$

其中：

- $\alpha$ 为 learning rate（学习率）

### Bias Update（偏置更新）

关于 bias 的梯度即为 error signal 本身：

#### Bias 梯度

$\frac{\partial L}{\partial b^{[l]}} = \delta^{[l]}$

**Bias update（偏置更新）** 规则为：

$b^{[l]} \leftarrow b^{[l]} - \alpha \delta^{[l]}$

这些更新规则应用于每一层，从 output layer 一直追溯到第一个 hidden layer。所有参数更新完成后，下一次 forward pass 将使用改进后的参数。

## Training Loop 与 Epoch

### Training Loop（训练循环）

**Training loop** 是训练神经网络的完整迭代过程：

1. **Forward pass**：对一批训练数据计算预测结果
2. **计算 loss**：衡量预测值与真实标签之间的误差
3. **Backward pass（backpropagation）**：计算所有参数的梯度
4. **更新参数**：应用 gradient descent 调整 weight 和 bias
5. **重复**，直至 loss 收敛或满足停止条件

用代码表示（使用 PyTorch 风格伪代码）：

```python
for epoch in range(num_epochs):
    for batch_x, batch_y in data_loader:
        # Forward pass
        predictions = model(batch_x)
        loss = loss_function(predictions, batch_y)

        # Backward pass
        loss.backward()

        # Update parameters
        optimizer.step()
        optimizer.zero_grad()
```

### Epoch（训练轮次）

**Epoch** 是对整个训练数据集完整遍历一次。若数据集有 10,000 个样本，batch size 为 100，则一个 epoch 包含 100 次迭代（batch）。训练通常需要多个 epoch——往往数十到数百个——模型才能收敛。

| 训练术语 | 定义 |
|--------------|-----------|
| Iteration（迭代） | 对一个 batch 进行一次 forward pass + backward pass + 参数更新 |
| Epoch（轮次） | 对整个训练数据集完整遍历一次 |
| Batch size（批大小） | 每次迭代处理的样本数量 |

监控每个 epoch 的 loss（以及 validation loss）可以了解训练进展：

- **Loss 持续下降**：训练进展良好
- **Loss 趋于平稳**：可能需要更大的 learning rate 或不同的架构
- **Validation loss 上升而 training loss 下降**：发生了 overfitting——应施加正则化

#### 图示：Training Loss Monitor

<iframe src="../../sims/training-loss-monitor/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Training Loss Monitor</summary>
Type: microsim
**sim-id:** training-loss-monitor<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine
Learning Objective: Examine how training loss and validation loss evolve over epochs, identifying patterns that indicate healthy training, underfitting, or overfitting.

Purpose: Interactive simulation of a neural network training loop, plotting training and validation loss curves over epochs. Students can adjust hyperparameters and observe their effect on the learning curves.

Interactive controls:
- Slider: Learning rate (0.001 to 0.5), default 0.01
- Slider: Number of hidden neurons (2 to 64), default 16
- Slider: Dropout rate (0.0 to 0.8), default 0.0
- "Train" button: Run 100 epochs and animate the loss curves
- "Reset" button: Clear curves and reinitialize
- Display: Current epoch, training loss, validation loss, gap between them

Visual elements:
- X-axis: Epoch (0 to 100)
- Y-axis: Loss value
- Blue curve: Training loss
- Red curve: Validation loss
- Green vertical line: Best epoch (where validation loss is minimized)
- Text label: "Overfitting" when gap between curves exceeds a threshold

Instructional Rationale: Live training simulation with adjustable hyperparameters supports the Analyze/examine objective by letting students observe the cause-and-effect relationship between hyperparameters (learning rate, capacity, dropout) and training dynamics (convergence speed, overfitting onset).

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with simulated training dynamics
</details>

## Dropout：神经网络的正则化技术

**Dropout** 是专为神经网络设计的正则化（regularization）技术。在训练过程中，dropout 在每次迭代时随机"关闭"（设为零）某一层中的一部分神经元。这迫使网络学习冗余表示，防止单个神经元过度专门化。

每次训练迭代的 dropout 流程：

1. 对 dropout 层中的每个神经元，独立采样一个随机数
2. 若随机数小于 dropout rate $p$，则将该神经元的输出设为零
3. 将剩余激活神经元的输出按 $\frac{1}{1-p}$ 缩放，以维持期望输出幅度
4. 照常执行 forward pass 和 backward pass

在预测时（inference），dropout 被禁用，所有神经元均处于激活状态。训练期间的缩放确保训练阶段与推理阶段的期望输出一致。

| Dropout Rate | 效果 |
|-------------|--------|
| $p = 0.0$ | 无 dropout（标准训练） |
| $p = 0.2$ | 轻度正则化 |
| $p = 0.5$ | 中度正则化（常用选择） |
| $p = 0.8$ | 强正则化（有 underfitting 风险） |

#### 图示：Dropout Visualization

<iframe src="../../sims/dropout-visualization/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Dropout Visualization</summary>
Type: microsim
**sim-id:** dropout-visualization<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how dropout randomly deactivates neurons during training, creating an ensemble-like effect that reduces overfitting.

Purpose: Interactive network diagram where students can observe dropout in action: clicking "Next Iteration" randomly deactivates different neurons, showing how the active sub-network changes at each training step.

Layout:
- Network diagram: 4 input nodes, 6 hidden nodes (layer 1), 6 hidden nodes (layer 2), 2 output nodes
- Deactivated neurons shown as faded/gray with crossed-out connections
- Active neurons shown in full color with visible connections

Interactive controls:
- Slider: Dropout rate $p$ (0.0 to 0.8), default 0.5
- "Next Iteration" button: Randomly sample a new dropout mask and update the visualization
- "Show All Active" button: Display the full network without dropout (inference mode)
- Display: Number of active neurons per layer, effective network size
- Counter: How many unique sub-networks have been shown across iterations

Data Visibility Requirements:
Stage 1: Full network with all neurons active (inference mode).
Stage 2: First training iteration with random neurons deactivated. Show which neurons are dropped.
Stage 3: Second training iteration with different neurons deactivated. Emphasize that the active sub-network is different each time.

Instructional Rationale: Visual demonstration of random neuron deactivation across iterations supports the Understand/explain objective by making the ensemble interpretation of dropout concrete---each iteration trains a different sub-network.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with random mask generation and network visualization
</details>

Dropout 之所以有效，是因为它可以被理解为同时训练一个数量指数级庞大的 sub-network（子网络）集成。每个 dropout mask 生成一个不同的 sub-network，而最终预测（所有神经元均激活）近似于所有这些 sub-network 的平均预测结果。

!!! tip "组合多种正则化技术"
    在实践中，dropout 通常与 L2 regularization（weight decay，权重衰减）和 early stopping（早停）结合使用。PyTorch 使这一过程十分简便：在模型定义中使用 `nn.Dropout(p=0.5)`，在 optimizer 中设置 `weight_decay`，并通过监控 validation loss 实现 early stopping。

## 完整的训练流程

神经网络的完整训练流程综合了本章与前序章节的所有概念：

1. **数据准备**：预处理、归一化，划分为 train/validation/test 集（第 4 章）
2. **设计架构**：选择层数、神经元数、activation function（第 9 章）
3. **初始化参数**：随机初始化 weight 和 bias
4. **Training loop**（对每个 epoch）：
   a. 执行 forward pass
   b. 计算 loss
   c. 执行 backward pass（backpropagation）计算梯度
   d. 使用 gradient descent 更新 weight 和 bias（第 7 章）
   e. 评估 validation loss
5. **应用正则化**：训练期间使用 dropout，根据 validation loss 执行 early stopping（第 8 章）
6. **评估**：使用适当指标在 test set 上评估最终性能（第 6、11 章）

## 关键要点

本章阐述了神经网络的完整训练机制：

- **Forward pass** 通过将数据逐层传播来计算预测结果。
- **Backpropagation** 利用 chain rule 将 **error signal** 从 output layer 向 hidden layer 反向传播，从而高效计算梯度。
- **Output layer error** 直接与 loss function 相连；**hidden layer error** 通过将误差反向传输穿过 weight matrix 来计算。
- **Weight update** 使用梯度 $\delta^{[l]} (a^{[l-1]})^T$，**bias update** 直接使用 error signal $\delta^{[l]}$，两者均以 learning rate 为比例系数。
- **Training loop** 在多个 **epoch**（对数据集的完整遍历）中重复执行 forward pass、loss 计算、backward pass 和参数更新。
- **Dropout** 通过在训练期间随机停用神经元来防止 overfitting，有效地训练了一个 sub-network 的集成。

??? question "自测：你能回答以下问题吗？"
    1. 为什么在 forward pass 过程中必须存储中间值（$z^{[l]}$、$a^{[l]}$）？
    2. 与 forward pass 相比，backpropagation 的计算复杂度如何？
    3. 为什么 hidden layer error 公式中包含后一层 weight matrix 的转置？
    4. 如果在第 20 个 epoch 后 training loss 持续下降但 validation loss 开始上升，应该怎么做？
    5. 为什么在 inference（预测）阶段要禁用 dropout？


[See Annotated References](./references.md)
