---
title: 卷积神经网络
description: CNN 架构、卷积运算、pooling 及其在计算机视觉中的应用
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 卷积神经网络（Convolutional Neural Networks）

## 摘要

本章介绍 Convolutional Neural Network（CNN，卷积神经网络）——处理图像数据的主流架构。学生将学习 convolution operation（卷积运算）及其参数（filter、kernel size、stride 和 padding）、feature map 如何捕捉空间模式，以及 pooling layer 如何缩减空间维度。本章涵盖完整的 CNN 架构，包括连接卷积层与全连接层的 flatten layer，并介绍经典的 LeNet-5 架构。此外，本章还讨论了 CNN 在 image classification（图像分类）、object detection（目标检测）和 image segmentation（图像分割）中的应用。完成本章后，学生将能够设计并理解用于计算机视觉任务的 CNN 架构。

## 涵盖概念

本章涵盖学习图谱中的以下 15 个概念：

1. Convolutional Neural Network
2. Convolution Operation
3. Filter
4. Kernel Size
5. Stride
6. Padding
7. Feature Map
8. Max Pooling
9. Pooling Layer
10. Flatten Layer
11. CNN Architecture
12. LeNet-5
13. Image Classification
14. Object Detection
15. Image Segmentation

## 先修知识

本章建立在以下章节概念之上：

- [Chapter 3: Data Acquisition and Exploration](../03-data-acquisition/index.md)
- [Chapter 9: Neural Network Foundations](../09-neural-network-foundations/index.md)
- [Chapter 10: Classification and Logistic Regression](../10-classification-logistic-regression/index.md)

---

## 为何全连接网络不适合图像处理

在第 9 章中，我们学习了全连接网络（fully connected network），其中每个神经元与相邻层的每个神经元相连。虽然这种架构对于具有适量特征的表格数据表现良好，但对图像却不实用。一张小小的 28×28 灰度图像包含 784 个像素；一张 224×224 的彩色图像则有 150,528 个像素值。仅对较大图像应用一个含 256 个神经元的全连接 hidden layer，就需要超过 3800 万个 weight 参数——仅仅是一层。这在计算上极为浪费，且极易产生严重的 overfitting（过拟合）。

**Convolutional Neural Network（CNN，卷积神经网络）** 通过利用图像数据中固有的空间结构来解决这一问题。CNN 采用局部连接（local connectivity）和权重共享（weight sharing），而非将每个像素与每个神经元相连，从而在大幅减少参数数量的同时更有效地捕捉空间模式。

## Convolution Operation（卷积运算）

**Convolution operation（卷积运算）** 是 CNN 的核心构建模块。它将一个小矩阵（称为 filter 或 kernel）在输入图像上滑动，在每个位置计算逐元素乘积之和。该运算用于检测边缘、纹理和形状等局部模式。

从数学上看，对于二维输入图像 $I$ 和大小为 $f \times f$ 的 filter $K$，在位置 $(i, j)$ 处的卷积为：

#### 二维卷积（2D Convolution）

$(I * K)(i, j) = \sum_{p=0}^{f-1}\sum_{q=0}^{f-1} I(i+p, j+q) \cdot K(p, q)$

其中：

- $I$ 为输入图像（或 feature map）
- $K$ 为卷积 filter（kernel）
- $f$ 为 filter 大小（kernel size）
- Filter 在输入的所有有效位置上滑动

### Filter（滤波器）

**Filter**（或 kernel）是一个小型可学习权重矩阵，用于检测特定的局部模式。不同的 filter 检测不同的特征：

- 水平边缘检测器（horizontal edge detector）：顶部为正值，底部为负值
- 垂直边缘检测器（vertical edge detector）：左侧为正值，右侧为负值
- 更复杂的 filter（在训练过程中习得）用于检测纹理、角点和更高级的模式

与手动设计的 filter 不同，CNN 的 filter 通过 backpropagation 自动学习。网络会发现哪些模式对当前任务最有用。

### Kernel Size（核大小）

**Kernel size**（$f \times f$）决定了 filter 能够检测的模式的空间范围。常见选择如下：

| Kernel Size | 检测内容 | 典型用途 |
|------------|---------|-------------|
| $1 \times 1$ | 通道间组合 | 维度调整 |
| $3 \times 3$ | 小的局部模式（边缘、角点） | 最常用的默认选择 |
| $5 \times 5$ | 稍大的模式 | 浅层 |
| $7 \times 7$ | 大型模式 | 极深网络的第一层 |

$3 \times 3$ kernel 最为流行，因为它是能够检测空间模式的最小尺寸，且堆叠多个 $3 \times 3$ 层可以实现与单个大 kernel 相同的感受野（receptive field），同时参数更少。

#### 图示：Convolution Operation 逐步演示

<iframe src="../../sims/convolution-operation-step-through/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Convolution Operation Step-Through</summary>
Type: microsim
**sim-id:** convolution-operation-step-through<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute
Learning Objective: Execute the convolution operation step by step, computing the element-wise products and sum at each filter position to produce the output feature map.

Purpose: Interactive step-through showing how a filter slides across a small input matrix, computing the output at each position with concrete numbers.

Data Visibility Requirements:
Stage 1: Show a 5x5 input matrix with integer values and a 3x3 filter with specific weights.
Stage 2: Highlight the first 3x3 region of the input. Show element-wise multiplication with the filter. Compute the sum. Place result in the output matrix.
Stage 3: Slide the filter one position right. Repeat the computation with the new input region highlighted.
Stage 4+: Continue until the output matrix is complete (3x3 output for valid convolution).

Interactive controls:
- "Next Position" and "Previous Position" buttons
- "Auto-Play" button to animate the sliding
- Dropdown: Select from preset filters (horizontal edge, vertical edge, blur, sharpen)
- Display: Input matrix, filter matrix, current element-wise products, sum, output matrix
- Speed slider for auto-play

Visual elements:
- Input matrix with highlighted 3x3 region (yellow background)
- Filter matrix beside it
- Multiplication table showing each product
- Output matrix building up position by position
- Arrow showing filter movement direction

Instructional Rationale: Step-by-step computation with concrete numbers at each filter position supports the Apply/execute objective by making the abstract convolution formula into a visible and verifiable arithmetic process.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged computation and sliding window animation
</details>

### Stride（步长）

**Stride（步长）** 控制 filter 在相邻位置之间移动的像素数。stride 为 1 表示 filter 每次移动一个像素；stride 为 2 表示每次跳过一个位置。

对于输入大小为 $n$、filter 大小为 $f$、stride 为 $s$、无 padding 的卷积，输出大小为：

#### 输出大小公式（无 Padding）

$\text{output size} = \left\lfloor\frac{n - f}{s}\right\rfloor + 1$

其中：

- $n$ 为输入维度
- $f$ 为 filter（kernel）大小
- $s$ 为 stride
- $\lfloor \cdot \rfloor$ 为下取整函数（floor function）

stride 大于 1 会缩减输出的空间维度，实际上对数据进行了下采样（downsampling）。这减少了计算量，并可以发挥类似 pooling 的作用。

### Padding（填充）

**Padding（填充）** 在对输入图像进行卷积之前，在其边缘周围添加额外的像素（通常为零）。两种最常见的 padding 策略是：

- **Valid padding**（无 padding）：filter 仅在与输入完全重叠的位置应用。输出比输入小。
- **Same padding**：添加足够的零，使输出与输入具有相同的空间维度。

对于 stride 为 1 的 same padding，每侧的填充量为：

$p = \frac{f - 1}{2}$

Padding 有两个作用：在各层之间保持空间维度，以及确保边界像素与内部像素受到相同的处理。

## Feature Map（特征图）

**Feature map**（也称 activation map，激活图）是将单个 filter 应用于输入后的输出。每个 feature map 是一个二维数组，其中每个元素表示该空间位置上 filter 响应的强度。

一个卷积层通常并行应用多个 filter，产生多个 feature map。若一层有 32 个 filter，则产生 32 个 feature map，每个检测不同的模式。这些 feature map 堆叠成一个三维体积：（height × width × filter 数量）。

浅层产生的 feature map 响应简单模式（边缘、颜色）；深层则将这些简单模式组合成越来越复杂、抽象的表示（纹理、部件、物体）。

| 层深度 | Feature Map 检测的内容 |
|------------|------------------------|
| 第 1 层 | 边缘、梯度、颜色 |
| 第 2 层 | 角点、纹理、简单形状 |
| 第 3 层 | 物体部件（眼睛、轮子、把手） |
| 第 4 层及更深 | 完整物体、场景元素 |

## Pooling Layer（池化层）

**Pooling layer（池化层）** 缩减 feature map 的空间维度，在保留最重要信息的同时，减少网络中的参数数量与计算量。

### Max Pooling（最大池化）

**Max pooling（最大池化）** 是最常见的池化操作。它将 feature map 划分为互不重叠的矩形区域，并输出每个区域中的最大值。

对 4×4 的 feature map 应用 2×2 max pooling（stride 为 2），输出为 2×2 矩阵，每个值是对应 2×2 区域中的最大值。

Max pooling 实现了两个目标：将每个方向的空间维度缩减 2 倍，以及引入一种平移不变性（translation invariance）——输入中的小位移不会改变输出，因为每个区域中的最大值得以保留。

#### 图示：Pooling Operations 对比

<iframe src="../../sims/pooling-operations-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Pooling Operations Comparison</summary>
Type: microsim
**sim-id:** pooling-operations-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare
Learning Objective: Compare max pooling and average pooling by observing how each selects different values from the same input regions and how this affects the output feature map.

Purpose: Side-by-side visualization showing both max pooling and average pooling applied to the same input, with highlighted regions showing which values are selected.

Data Visibility Requirements:
Stage 1: Show a 6x6 feature map with concrete numerical values.
Stage 2: Highlight the first 2x2 region. Show max pooling selecting the maximum value. Show average pooling computing the average.
Stage 3: Slide to the next region and repeat.
Stage 4: Show complete outputs side by side with the difference highlighted.

Interactive controls:
- "Next Region" and "Previous Region" buttons
- Toggle: 2x2 pooling vs 3x3 pooling
- Display: Input matrix, max pooling output, average pooling output
- Highlighted values: maximum in red, all values contributing to average in blue

Instructional Rationale: Side-by-side comparison of both pooling operations on the same data supports the Understand/compare objective by making the different selection strategies and their numerical effects directly visible.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with region highlighting and side-by-side display
</details>

## 完整的 CNN 架构

典型的 **CNN architecture** 由交替排列的卷积层和 pooling 层组成，之后连接一个或多个全连接层（fully connected layer），最终输出分类结果。

标准结构如下：

```
Input Image
  -> [Conv + ReLU] -> [Pooling]     （提取低级特征）
  -> [Conv + ReLU] -> [Pooling]     （提取中级特征）
  -> [Conv + ReLU] -> [Pooling]     （提取高级特征）
  -> [Flatten]                       （将三维体积转换为一维向量）
  -> [Fully Connected + ReLU]        （基于特征进行分类）
  -> [Fully Connected + Softmax]     （输出类别概率）
```

### Flatten Layer（展平层）

**Flatten layer（展平层）** 将最后一个卷积/pooling 层输出的三维体积转换为适合全连接层输入的一维向量。若最后的 pooling 层输出形状为 $7 \times 7 \times 64$，则 flatten layer 产生长度为 $7 \times 7 \times 64 = 3{,}136$ 的向量。

Flatten layer 不执行任何计算，仅对数据进行形状重排（reshape）。它是特征提取阶段（卷积层）与分类阶段（全连接层）之间的桥梁。

### LeNet-5：一个历史性的 CNN 架构

**LeNet-5** 由 Yann LeCun 等人于 1998 年设计，是最早的 CNN 架构之一，专为手写数字识别（在 MNIST 数据集上）而创建。尽管以现代标准来看相当简单，LeNet-5 确立了所有现代 CNN 所遵循的架构模板。

LeNet-5 架构如下：

| 层 | 类型 | 输出形状 | 参数数量 |
|-------|------|-------------|-----------|
| 输入 | 图像 | 32×32×1 | 0 |
| C1 | Conv（6 filters，5×5） | 28×28×6 | 156 |
| S2 | Avg Pooling（2×2） | 14×14×6 | 0 |
| C3 | Conv（16 filters，5×5） | 10×10×16 | 2,416 |
| S4 | Avg Pooling（2×2） | 5×5×16 | 0 |
| C5 | Conv（120 filters，5×5） | 1×1×120 | 48,120 |
| F6 | Fully Connected | 84 | 10,164 |
| 输出 | Fully Connected + Softmax | 10 | 850 |

总参数约 61,706 个。相比之下，对相同输入使用全连接网络：仅第一层就需要 $32 \times 32 \times 1 \times 256 = 262,144$ 个参数。

#### 图示：CNN Architecture Visualizer

<iframe src="../../sims/cnn-architecture-visualizer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>CNN Architecture Visualizer</summary>
Type: diagram
**sim-id:** cnn-architecture-visualizer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: summarize
Learning Objective: Summarize the complete CNN architecture by tracing the flow of data from input image through convolutional layers, pooling layers, flatten layer, and fully connected layers to the output classification.

Purpose: Interactive layered diagram showing the LeNet-5 architecture with 3D volume representations for each layer. Students can hover over each layer to see dimensions, parameter count, and operation type.

Layout: Left-to-right flow showing each layer as a 3D block (width x height x depth) with connecting arrows.

Visual elements:
- Input image shown as a small grid (32x32)
- Convolutional layers shown as tall thin 3D blocks
- Pooling layers shown as shorter 3D blocks (reduced spatial dimensions)
- Flatten shown as a transition from 3D block to 1D bar
- Fully connected layers shown as vertical bars of decreasing width
- Output as a bar chart showing 10 class probabilities

Interactive elements:
- Hover over any layer to see: type, output shape, number of parameters, activation function
- Click a convolutional layer to see a visualization of its filters
- Animated "data pulse" that shows information flowing from input to output when "Visualize Forward Pass" button is clicked

Instructional Rationale: Layered 3D visualization with hover details supports the Understand/summarize objective by providing both the big picture (overall architecture flow) and fine-grained details (per-layer parameters and operations) in a single interactive view.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with 3D block rendering and hover interaction
</details>

## CNN 在计算机视觉中的应用

CNN 在三大主要计算机视觉任务上实现了突破性性能。

### Image Classification（图像分类）

**Image classification（图像分类）** 为整张图像分配一个标签。给定一张照片，模型预测其中包含的是猫、狗、汽车还是其他预定义类别。这是 CNN 最初被设计来解决的任务，也是迄今最常见的应用。

典型的流水线为：输入图像 -> CNN 特征提取 -> softmax 分类 -> 预测类别。训练时使用 one-hot 编码标签，以 cross-entropy loss 作为损失函数。

### Object Detection（目标检测）

**Object detection（目标检测）** 不仅识别图像中存在哪些物体，还通过 bounding box（边界框）对其进行定位，从而超越了单纯的分类。一张图像中可能包含多个不同类别的物体，每个物体都有对应的 bounding box 坐标 $(x, y, w, h)$。

目标检测架构（YOLO、SSD、Faster R-CNN）建立在 CNN 特征提取的基础上，并添加了专门用于 bounding box 回归（regression）和分类的 head。

### Image Segmentation（图像分割）

**Image segmentation（图像分割）** 为图像中的每个像素分配一个类别标签，生成场景的精细像素级映射。这是最细粒度的计算机视觉任务：

| 任务 | 输出 | 粒度 |
|------|--------|------------|
| Image classification | 每张图像一个标签 | 粗粒度 |
| Object detection | 标签 + bounding box | 中等粒度 |
| Image segmentation | 每个像素一个标签 | 细粒度 |

分割架构（U-Net、DeepLab）采用 encoder-decoder 结构：encoder（CNN）将图像压缩为特征表示，decoder 再将其上采样（upsample）回原始分辨率。

!!! tip "现代 CNN 架构"
    LeNet-5 是先驱，而现代 CNN 更深、更复杂。AlexNet（2012，8 层）、VGGNet（2014，16-19 层）、ResNet（2015，50-152 层）和 EfficientNet（2019）代表了历代的改进成果。核心洞察在于：更深的网络能够提取越来越抽象的特征，但需要 batch normalization（批归一化）和 residual connection（残差连接）等技术才能有效训练。

## 关键要点

本章介绍了图像处理的主流架构——Convolutional Neural Network：

- **CNN** 通过局部连接（local connectivity）和权重共享（weight sharing）利用空间结构，与全连接网络相比大幅减少了参数数量。
- **Convolution operation** 将 **filter**（具有特定 **kernel size**）在输入上滑动，**stride** 控制步长，**padding** 控制边界行为。
- **Feature map** 是卷积的输出，每个 feature map 捕捉不同的空间模式。深层检测越来越抽象的特征。
- **Pooling layer**（**max pooling** 最为常见）在保留重要特征的同时缩减空间维度。
- **Flatten layer** 连接卷积特征提取器与全连接分类器。
- **LeNet-5** 确立了 CNN 架构模板：交替排列的卷积层和 pooling 层，之后连接全连接层。
- CNN 驱动三大计算机视觉任务：**image classification**（每张图像一个标签）、**object detection**（标签 + bounding box）和 **image segmentation**（每个像素一个标签）。

??? question "自测：你能回答以下问题吗？"
    1. 为什么现代 CNN 更倾向于使用 3×3 kernel 而非 7×7 kernel？
    2. 输入 32×32、filter 5×5、stride 1、无 padding 的卷积输出大小是多少？
    3. Max pooling 如何提供平移不变性（translation invariance）？
    4. 为什么 flatten layer 没有可学习的参数？
    5. 用于 image classification 的 CNN 与用于 object detection 的 CNN 有何不同？


[See Annotated References](./references.md)
