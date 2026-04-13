---
title: 神经网络基础（Neural Network Foundations）
description: 神经元、感知机、激活函数，以及全连接网络的架构
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 神经网络基础（Neural Network Foundations）

## 概述（Summary）

本章介绍人工神经网络（artificial neural networks）的基本构建模块。学生将首先了解生物神经元（biological neuron）如何启发了人工智能的发展，然后学习感知机（perceptron）模型，包括权重（weights）、偏置（bias）和激活函数（activation functions）。本章涵盖三种关键激活函数：sigmoid、tanh 和 ReLU，并解释如何将神经元组织为输入层（input layer）、隐藏层（hidden layer）和输出层（output layer），从而构成全连接网络（fully connected network）。此外，本章还介绍微积分中的链式法则（chain rule），它是训练神经网络的数学基础。学完本章后，学生将理解前馈神经网络（feedforward neural network）的架构，并为学习如何训练网络做好准备。

## 涵盖概念（Concepts Covered）

本章涵盖学习图（learning graph）中的以下 15 个概念：

1. Neuron（神经元）
2. Weight（权重）
3. Bias（偏置）
4. Activation Function（激活函数）
5. Sigmoid Function（Sigmoid 函数）
6. Perceptron（感知机）
7. Artificial Neural Network（人工神经网络）
8. Sigmoid Activation（Sigmoid 激活）
9. Tanh Activation（Tanh 激活）
10. ReLU Activation（ReLU 激活）
11. Input Layer（输入层）
12. Hidden Layer（隐藏层）
13. Output Layer（输出层）
14. Fully Connected Network（全连接网络）
15. Chain Rule（链式法则）

## 前置知识（Prerequisites）

本章建立在以下章节概念的基础上：

- [第 1 章：人工智能概论](../01-intro-to-ai/index.md)

---

## 从生物学到计算（From Biology to Computation）

人工神经网络（artificial neural networks）的概念源于对生物神经系统的研究。大脑通过大量相互连接的神经细胞网络来处理信息。20 世纪 40 至 50 年代，研究人员开始思考能否在软件中构建类似的架构，以实现智能计算。尽管现代神经网络已与其生物学起源有很大差异，但了解这一灵感来源仍有助于建立直觉理解。

### 生物神经元（The Biological Neuron）

生物意义上的 **neuron（神经元）** 是一种传递电信号和化学信号的特化细胞。其基本结构包括：树突（dendrites，接收来自其他神经元的信号）、细胞体（cell body，处理信号）和轴突（axon，将输出信号传递给其他神经元）。当积累的输入信号超过某个阈值（threshold）时，神经元就会"激活（fire）"，沿轴突向下游神经元发送信号。

这种激活行为——累积输入、施加阈值、产生输出——正是人工神经网络所抽象和形式化的核心思想。

## 感知机：最简单的神经单元（The Perceptron: The Simplest Neural Unit）

**Perceptron（感知机）** 由 Frank Rosenblatt 于 1958 年提出，是最简单的人工神经元模型。它接受多个输入，计算加权求和（weighted sum），加上偏置（bias），然后将结果传入激活函数（activation function）以产生输出。

#### 图示：感知机架构（Diagram: Perceptron Architecture）

<iframe src="../../sims/perceptron-architecture/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Perceptron Architecture</summary>
Type: diagram
**sim-id:** perceptron-architecture<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain the structure and computation of a perceptron by tracing how inputs are weighted, summed with a bias, and passed through an activation function.

Purpose: Interactive diagram showing the perceptron model with labeled inputs, weights, summation, bias, activation function, and output. Students can change input values and weights to see how the output changes.

Layout:
- Left: 3 input nodes ($x_1$, $x_2$, $x_3$) with their values displayed
- Center-left: Arrows labeled with weights ($w_1$, $w_2$, $w_3$)
- Center: Summation circle showing $z = \sum w_i x_i + b$
- Center-right: Activation function box showing $a = \sigma(z)$
- Right: Output node showing the final value

Interactive elements:
- Sliders for each input value ($x_1$, $x_2$, $x_3$), range -3 to 3
- Sliders for each weight ($w_1$, $w_2$, $w_3$), range -3 to 3
- Slider for bias $b$, range -3 to 3
- Dropdown: Select activation function (step, sigmoid, tanh, ReLU)
- Display: Current weighted sum $z$, activation output $a$

Data Visibility Requirements:
Stage 1: Show inputs and weights with their current values.
Stage 2: Show the weighted sum computation: $z = w_1 x_1 + w_2 x_2 + w_3 x_3 + b$ with numbers.
Stage 3: Show the activation function graph with the current $z$ value marked, producing output $a$.

Instructional Rationale: Interactive manipulation of inputs and weights with immediate numerical feedback supports the Understand/explain objective by letting students trace exactly how data flows through a perceptron.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with slider controls and real-time computation
</details>

### 权重（Weights）

**Weight（权重）** 是决定输入与神经元之间连接强度的参数。每个输入 $x_j$ 都有对应的权重 $w_j$。较大的正权重表示该输入对输出有强烈的激励作用；较大的负权重表示强烈的抑制作用；接近零的权重意味着该输入几乎没有影响。

加权求和（也称为预激活值或 logit）的计算公式如下：

#### 加权求和（Weighted Sum）

$z = \sum_{j=1}^{n} w_j x_j + b = w_1 x_1 + w_2 x_2 + \cdots + w_n x_n + b$

其中：

- $z$ 是加权求和（预激活值）
- $w_j$ 是输入 $x_j$ 对应的权重
- $n$ 是输入的数量
- $b$ 是偏置（bias）

在学习过程中（第 14 章），模型通过调整这些权重来最小化损失函数（loss function）。从数据中学习合适权重的能力正是神经网络强大的根源。

### 偏置（Bias）

**Bias（偏置）** $b$ 是一个额外的参数，允许神经元移动其激活阈值。若没有偏置项，感知机的决策边界（decision boundary）必须过原点。偏置赋予神经元灵活性——即使所有输入都为零时也能激活，或者需要更高的输入阈值才能触发。

偏置的作用与线性回归（linear regression）中截距（intercept）的作用相同：它使模型输出独立于输入值而发生偏移。神经网络中的每个神经元都有各自的偏置参数。

### 激活函数（Activation Functions）

**Activation function（激活函数）** 是作用于加权求和 $z$ 以产生神经元输出的数学函数。若没有激活函数，神经网络将只是一系列线性变换的叠加，最终等价于单一的线性变换。激活函数引入了非线性（nonlinearity），使网络能够学习复杂的模式。

## 关键激活函数（Key Activation Functions）

### Sigmoid 函数（The Sigmoid Function）

**Sigmoid function** 将任意实数映射到 0 到 1 之间，形成光滑的 S 形曲线：

#### Sigmoid Function

$\sigma(z) = \frac{1}{1 + e^{-z}}$

其中：

- $z$ 是输入（加权求和）
- $e$ 是自然常数（$\approx 2.718$）
- 输出始终在区间 $(0, 1)$ 内

**Sigmoid activation** 历史上非常重要，因为它是早期神经网络默认使用的激活函数。其输出可被解释为概率（probability），这使其天然适用于二分类（binary classification）输出层（详见第 10 章的 logistic regression）。然而，sigmoid 存在显著缺点：当 $z$ 非常大或非常小时，sigmoid 的梯度极小（接近零），导致深层网络中出现"梯度消失（vanishing gradient）"问题，从而减慢学习速度。

### Tanh 激活（The Tanh Activation）

**Tanh activation**（双曲正切，hyperbolic tangent）与 sigmoid 类似，但将输入映射到 $(-1, 1)$ 范围内：

#### Tanh Function

$\tanh(z) = \frac{e^z - e^{-z}}{e^z + e^{-z}}$

其中：

- $z$ 是输入
- 输出范围为 $-1$ 到 $1$

Tanh 以零为中心，通常比 sigmoid 收敛更快，因为一层的输出（即下一层的输入）是以零为中心而非始终为正的。然而，tanh 对极端输入值同样存在梯度消失问题。

### ReLU 激活（The ReLU Activation）

**ReLU activation**（Rectified Linear Unit，线性整流单元）是现代深度学习中使用最广泛的激活函数：

#### ReLU Function

$\text{ReLU}(z) = \max(0, z)$

其中：

- 若 $z > 0$，输出等于 $z$（恒等映射）
- 若 $z \leq 0$，输出为 $0$

ReLU 的优势包括：计算简单（无需指数运算）、避免了正输入下的梯度消失问题，以及促进稀疏表示（sparse representation，许多神经元输出为零）。其主要缺点是"dying ReLU"问题：若某个神经元的加权求和始终为负，则其始终输出零，停止学习。

| Activation | Range | Gradient Issue | Typical Use |
|-----------|-------|---------------|-------------|
| Sigmoid | $(0, 1)$ | Vanishing for large $|z|$ | Output layer (binary classification) |
| Tanh | $(-1, 1)$ | Vanishing for large $|z|$ | Hidden layers (some RNNs) |
| ReLU | $[0, \infty)$ | Zero for $z < 0$ (dying ReLU) | Hidden layers (default choice) |

#### 图示：激活函数比较（Diagram: Activation Function Comparison）

<iframe src="../../sims/activation-function-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Activation Function Comparison</summary>
Type: microsim
**sim-id:** activation-function-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: compare
Learning Objective: Compare the shape, range, and gradient properties of sigmoid, tanh, and ReLU activation functions to understand why each is suited to different situations.

Purpose: Interactive plot showing all three activation functions on the same axes, with their derivatives plotted below. Students can explore a movable vertical cursor that shows the function value and gradient at any input.

Layout:
- Top panel: Three activation function curves overlaid (sigmoid=blue, tanh=green, ReLU=red) on axes from $z = -5$ to $z = 5$
- Bottom panel: The derivative (gradient) of each function plotted on the same range
- Vertical cursor line that the student can drag left/right

Interactive controls:
- Draggable vertical cursor on the x-axis
- Checkboxes to toggle visibility of each function
- Display panel: For each visible function, show the function value $f(z)$ and gradient $f'(z)$ at the cursor position

Visual elements:
- Grid with labeled axes
- Color-coded curves with legend
- Highlighted regions where gradients are near zero (vanishing gradient zones)
- Cursor position indicator with readouts

Instructional Rationale: Overlaid comparison with interactive cursor supports the Analyze/compare objective by making the distinct behaviors (range, saturation, gradient magnitude) of each activation function directly quantifiable at any input value.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with dual-panel layout and draggable cursor
</details>

## 网络架构：层与连接（Network Architecture: Layers and Connections）

单个神经元是强大的模式检测器，但神经网络真正的力量在于将神经元组织成多个层。一个前馈神经网络（feedforward neural network）由三种类型的层构成。

### 输入层（Input Layer）

**Input layer（输入层）** 接收来自数据的原始特征（features），本身不进行任何计算，只是将特征值传递给下一层。若输入数据有 $n$ 个特征，则输入层有 $n$ 个节点。

例如，若我们根据三个特征（学习时长、睡眠时长、练习题数量）预测某位学生的考试分数，则输入层就有三个节点，每个节点对应一个特征。

### 隐藏层（Hidden Layers）

**Hidden layer（隐藏层）** 是输入层和输出层之间的任何层。隐藏层中的每个神经元接受前一层所有神经元的输出，计算加权求和加偏置，应用激活函数，再将结果传递给下一层。

隐藏层是网络学习内部表示（internal representations）的地方。第一个隐藏层可能检测简单的模式（例如"某特征值较大"），而更深的隐藏层则将这些简单模式组合成更复杂、更抽象的表示。隐藏层的数量和每层神经元的数量由设计者决定。

### 输出层（Output Layer）

**Output layer（输出层）** 产生网络的最终预测，其结构取决于任务类型：

- **Regression（回归）**：单个神经元，无激活函数（或使用线性激活），输出连续值
- **Binary classification（二分类）**：单个神经元，使用 sigmoid 激活，输出 0 到 1 之间的概率
- **Multi-class classification（多分类）**：多个神经元（每类一个），使用 softmax 激活，输出概率分布

### 全连接网络（Fully Connected Networks）

**Fully connected network（全连接网络）**（也称为 dense network 或 multilayer perceptron，MLP）是指一层中的每个神经元都与下一层的每个神经元相连接的网络，是最简单、最通用的神经网络架构。

含 $L$ 层的全连接网络的符号表示为：

- 第 0 层：输入层，含 $n_0$ 个特征
- 第 $l$ 层（$l = 1, \ldots, L-1$）：隐藏层，各含 $n_l$ 个神经元
- 第 $L$ 层：输出层，含 $n_L$ 个神经元

全连接网络的可学习参数总数为：

$\text{Parameters} = \sum_{l=1}^{L} (n_{l-1} \times n_l + n_l)$

其中 $n_{l-1} \times n_l$ 计算每层的权重数，$n_l$ 计算每层的偏置数。

#### 图示：全连接网络架构（Diagram: Fully Connected Network Architecture）

<iframe src="../../sims/fully-connected-network-arch/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Fully Connected Network Architecture</summary>
Type: diagram
**sim-id:** fully-connected-network-arch<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain how neurons are organized into input, hidden, and output layers in a fully connected network, and trace how data flows forward through the connections.

Purpose: Interactive network diagram showing a fully connected architecture with configurable layer sizes. Students can adjust the number of hidden layers and neurons per layer, and trace data flow through the network.

Layout:
- Left column: Input layer nodes (default 3 nodes)
- Center columns: Hidden layer nodes (default 2 hidden layers with 4 neurons each)
- Right column: Output layer node (default 1 node)
- Lines connecting every node in adjacent layers

Interactive controls:
- Slider: Number of hidden layers (1 to 4), default 2
- Slider: Neurons per hidden layer (2 to 8), default 4
- "Forward Pass" button: Animate data flowing from input to output with values visible on edges
- Hover over any neuron to highlight all its incoming and outgoing connections
- Display: Total parameter count (weights + biases)

Visual elements:
- Circular nodes colored by layer type (green=input, blue=hidden, orange=output)
- Lines between nodes with thickness proportional to weight magnitude
- Layer labels: "Input Layer", "Hidden Layer 1", "Hidden Layer 2", "Output Layer"
- Parameter count displayed below the network

Instructional Rationale: Configurable architecture with hover-based exploration supports the Understand/explain objective by letting students see how changing the network structure changes the connections and parameter count, building intuition for architectural design choices.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with dynamic node layout and hover interaction
</details>

## 前向传播（The Forward Pass）

**Forward pass（前向传播）** 是指给定输入，计算神经网络输出的过程。数据从输入层流经每个隐藏层，最终到达输出层，每一层都执行加权求和、加偏置并应用激活函数的操作。

对于单隐藏层网络：

1. **输入到隐藏层**：$z^{[1]} = W^{[1]} x + b^{[1]}$，然后 $a^{[1]} = g(z^{[1]})$
2. **隐藏层到输出层**：$z^{[2]} = W^{[2]} a^{[1]} + b^{[2]}$，然后 $\hat{y} = g(z^{[2]})$

其中 $W^{[l]}$ 是第 $l$ 层的权重矩阵，$b^{[l]}$ 是偏置向量，$g$ 是激活函数，$a^{[l]}$ 是第 $l$ 层的激活输出。

前向传播在概念上是一种函数复合（function composition）。每一层对其输入进行变换，最终输出是所有层变换的复合结果。这正是神经网络能够表示复杂函数的原因——它们将许多简单的非线性变换组合在一起。

## 链式法则：学习的基础（The Chain Rule: Foundation for Learning）

微积分中的**chain rule（链式法则）** 是使神经网络训练成为可能的数学工具。它告诉我们如何计算复合函数（composite function）的导数。

若 $y = f(g(x))$，则 $y$ 关于 $x$ 的导数为：

#### Chain Rule（链式法则）

$\frac{dy}{dx} = \frac{dy}{dg} \cdot \frac{dg}{dx}$

在神经网络中，输出是一长串函数复合：输入 -> 第 1 层变换 -> 第 2 层变换 -> ... -> 输出 -> 损失（loss）。为了计算损失函数关于网络深处某个权重的依赖关系，我们使用链式法则将每一层的导数"链"在一起。这一过程称为**反向传播（backpropagation）**，我们将在第 14 章详细学习。

链式法则可推广到多变量情形。对于函数 $f(g_1(x), g_2(x))$，全导数是各链式法则贡献之和：

$\frac{df}{dx} = \frac{\partial f}{\partial g_1}\frac{dg_1}{dx} + \frac{\partial f}{\partial g_2}\frac{dg_2}{dx}$

这个多变量链式法则非常关键，因为每个神经元的输出通常会输入到下一层的多个神经元中。

#### 图示：神经网络中的链式法则（Diagram: Chain Rule in Neural Networks）

<iframe src="../../sims/chain-rule-neural-networks/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Chain Rule in Neural Networks</summary>
Type: microsim
**sim-id:** chain-rule-neural-networks<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: interpret
Learning Objective: Interpret how the chain rule enables computing gradients through multiple layers by tracing the derivative computation backward from the loss to the weights.

Purpose: Step-through visualization of the chain rule applied to a simple 2-layer network. Students step through the backward computation, seeing how local derivatives are multiplied together to form the full gradient.

Data Visibility Requirements:
Stage 1: Show a simple computation graph: $x \to z_1 = wx + b \to a_1 = \sigma(z_1) \to L = (a_1 - y)^2$ with concrete values ($x=2$, $w=0.5$, $b=0.1$, $y=0.8$).
Stage 2: Compute forward pass values: $z_1 = 1.1$, $a_1 = 0.75$, $L = 0.0025$.
Stage 3: Compute $\frac{\partial L}{\partial a_1} = 2(a_1 - y) = -0.10$.
Stage 4: Compute $\frac{\partial a_1}{\partial z_1} = \sigma(z_1)(1-\sigma(z_1)) = 0.187$.
Stage 5: Compute $\frac{\partial z_1}{\partial w} = x = 2$.
Stage 6: Chain them: $\frac{\partial L}{\partial w} = \frac{\partial L}{\partial a_1} \cdot \frac{\partial a_1}{\partial z_1} \cdot \frac{\partial z_1}{\partial w} = -0.10 \times 0.187 \times 2 = -0.037$.

Interactive controls:
- "Next Step" and "Previous Step" buttons
- Input sliders for $x$, $w$, $b$ to try different values
- Display: Computation graph with current step highlighted in orange
- Display: Running product of derivatives

Instructional Rationale: Concrete worked example with numerical values at every step supports the Understand/interpret objective by demystifying the chain rule in the neural network context, showing that gradient computation is just repeated multiplication of local derivatives.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with computation graph and staged highlighting
</details>

## 设计神经网络架构（Designing Neural Network Architectures）

选择合适的网络架构需要做出以下几项决策：

| Design Choice | Typical Approach |
|--------------|-----------------|
| Input layer size | Equals the number of features in the data |
| Number of hidden layers | 1-3 for most tasks; deeper for complex problems |
| Neurons per hidden layer | Start with a power of 2 (32, 64, 128); tune via validation |
| Hidden layer activation | ReLU (default); tanh for certain RNN applications |
| Output layer activation | None (regression), sigmoid (binary classification), softmax (multi-class) |

!!! tip "从简到繁（Start Simple, Then Scale）"
    一种常见策略是从单个中等规模隐藏层（例如，64 个神经元，使用 ReLU 激活）开始，训练模型，评估其表现，仅在需要时才增加复杂度。这种方法能避免不必要的过拟合（overfitting），同时保持训练成本可控。

## 关键要点（Key Takeaways）

本章介绍了神经网络的基础构建模块：

- **Neuron（神经元）** 是基本的计算单元，灵感来源于生物神经元。**Perceptron（感知机）** 模型计算输入的加权求和加上 **bias（偏置）**，然后应用 **activation function（激活函数）**。
- **Weight（权重）** 控制输入与神经元之间连接的强度，是训练过程中调整的可学习参数。
- **Sigmoid function** 将值映射到 $(0, 1)$，**tanh** 映射到 $(-1, 1)$，**ReLU** 对正值直接输出，对负值输出零。ReLU 是现代网络隐藏层的默认选择。
- 神经网络将神经元组织为 **input layer（输入层）**（接收数据）、一个或多个 **hidden layer（隐藏层）**（学习表示）和 **output layer（输出层）**（产生预测）。在 **fully connected network（全连接网络）** 中，每个神经元与相邻层的所有神经元相连。
- 微积分中的 **chain rule（链式法则）** 使我们能够计算损失函数关于网络中任意权重的依赖关系，这是反向传播（backpropagation）的数学基础（第 14 章）。

??? question "自测：你能回答这些问题吗？（Self-Check: Can you answer these questions?）"
    1. Bias 项在 perceptron 中起什么作用？若没有它会发生什么？
    2. 为什么 sigmoid function 在深层隐藏层中存在问题？
    3. 一个层结构为 [4, 8, 8, 1] 的全连接网络有多少个可学习参数？
    4. 对于隐藏层，ReLU 相比 sigmoid 的关键优势是什么？
    5. Chain rule 如何帮助计算损失关于第一个隐藏层中某个权重的梯度？


[See Annotated References](./references.md)
