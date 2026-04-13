---
title: 数据采集与探索
description: 为机器学习收集、标注和探索数据，包括基准数据集和数据增强技术
generated_by: claude skill chapter-content-generator
date: 2026-04-13 19:53:00
version: 0.05
---

# 数据采集与探索

## 概述

本章介绍如何为 machine learning 项目收集、标注和探索数据。学生将学习不同类型的数据集，包括 tabular data 和 image data，知名基准数据集（如 MNIST 和 ImageNet），以及生成 synthetic data 和执行 data augmentation 的技术。学完本章后，学生将理解 ML 流水线的第一阶段，并能够为给定问题识别合适的数据来源。

## 涵盖的概念

本章涵盖学习图谱中的以下 12 个概念：

1. Data Acquisition
2. Data Annotation
3. Data Exploration
4. Dataset
5. Benchmark Dataset
6. MNIST Dataset
7. ImageNet Dataset
8. Synthetic Data
9. Data Augmentation
10. Data Integration
11. Tabular Data
12. Image Data

## 先修要求

本章以以下章节的概念为基础：

- [第 1 章：人工智能导论](../01-intro-to-ai/index.md)

---

## 数据为何如此重要

Machine learning 模型的质量取决于其学习所用数据的质量。使用完美算法训练劣质数据只会产生糟糕的结果，而使用高质量、具有代表性的数据训练简单算法，往往能超越复杂得多的模型。这一原则——有时被表述为"garbage in, garbage out"（垃圾进，垃圾出）——使数据采集成为任何 ML 项目的基础。

Data acquisition（数据采集）是收集、整理和准备用于训练、验证和测试 machine learning 模型的原始信息的过程。它是 ML 流水线的第一个也是可以说最重要的阶段，因为在这里做出的决策会贯穿后续所有步骤。

本章涵盖从原始数据收集到探索分析的完整旅程，涉及数据可能呈现的不同形式以及构建高质量数据集的可用工具。

## 数据集及其结构

**Dataset**（数据集）是为分析或模型训练而组织的数据点（也称为样本、实例或示例）的结构化集合。在 supervised learning 中，每个数据点通常由输入特征和关联标签组成。在 unsupervised learning 中，只有输入特征存在。

数据集在大小、复杂度和格式上差异悬殊。一个小型研究数据集可能包含几百个存储在单个 CSV 文件中的示例，而工业级数据集可能包含分布在分布式存储系统中的数十亿条记录。

Machine learning 中出现两种基本类型的数据：

### Tabular Data（表格数据）

**Tabular data**（表格数据）以行和列的形式组织，类似于电子表格或数据库表。每行代表一个样本，每列代表一个特征（属性）。Tabular data 是结构化数据上回归和分类等经典 ML 任务最常见的格式。

| 属性 | 描述 |
|----------|-------------|
| 格式 | 行（样本）x 列（特征） |
| 存储 | CSV、Excel、SQL 数据库、Parquet 文件 |
| 示例 | 客户记录、传感器读数、金融交易 |
| 工具 | Pandas DataFrames, NumPy arrays |
| 典型规模 | 数百到数百万行 |

Tabular data 非常适合 linear regression、logistic regression、K-nearest neighbors 和基于树的方法等算法。其结构化特性使得使用 Pandas 操作进行检查、清洗和变换变得容易。

### Image Data（图像数据）

**Image data**（图像数据）将视觉信息表示为像素值的网格。灰度图像是一个二维数组，每个元素存储一个亮度值（通常为 0-255）。彩色图像增加了颜色通道（通常是红、绿、蓝）的第三维，形成形状为 (height, width, 3) 的三维数组。

| 属性 | 描述 |
|----------|-------------|
| 格式 | 二维数组（灰度）或三维数组（彩色） |
| 存储 | PNG、JPEG、TIFF 文件；文件夹结构或归档文件 |
| 示例 | 照片、医学扫描、卫星图像 |
| 工具 | NumPy arrays, PyTorch tensors, PIL/Pillow library |
| 典型规模 | 数千到数百万张图像 |

Image data 是 convolutional neural networks（CNN）的天然输入，我们将在第 15 章学习 CNN。与 tabular data 不同，image data 具有空间结构：相邻像素相互关联，而卷积操作正是利用了这种局部性。

#### 图示：表格数据与图像数据对比

<iframe src="../../sims/tabular-vs-image-data/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Tabular vs Image Data Comparison</summary>
Type: microsim
**sim-id:** tabular-vs-image-data<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare
Learning Objective: Compare the structure, representation, and typical use cases of tabular data versus image data in machine learning.

Purpose: Side-by-side interactive comparison showing a tabular dataset and an image dataset with their internal representations.

Data Visibility Requirements:
Stage 1: Left panel shows a small tabular dataset (5 rows, 4 columns) as a colored spreadsheet grid. Right panel shows a small 8x8 grayscale image as a pixel grid with numerical values visible.
Stage 2: Left panel highlights one row and shows its feature vector [x1, x2, x3, x4]. Right panel highlights the pixel grid and shows the flattened array representation.
Stage 3: Left panel shows "Algorithms: Linear Regression, KNN, Logistic Regression." Right panel shows "Algorithms: CNN, Image Classification."

Interactive controls:
- "Next" / "Previous" buttons to step through stages
- Toggle button: "Show Values" to display or hide numerical values in both representations

Instructional Rationale: Step-through comparison with concrete data supports the Understand/compare objective by making the structural differences between data types visually explicit.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Data Acquisition（数据采集）

**Data acquisition**（数据采集）是从各种来源收集原始数据以用于 machine learning 的过程。数据来源的选择取决于问题领域、所需数据量，以及成本、时间和法律限制等实际约束。

常见的数据采集方法包括：

- **直接测量（direct measurement）**：从传感器、仪器或 IoT 设备收集数据（例如，从可穿戴设备获取加速度计读数）
- **现有数据库（existing databases）**：从企业数据库、政府存储库或公共数据门户提取数据
- **网络爬取（web scraping）**：以编程方式从网站提取数据（需注意法律和道德约束）
- **API**：通过服务提供的应用程序编程接口访问数据（例如，天气数据、金融数据）
- **众包（crowdsourcing）**：使用 Amazon Mechanical Turk 等平台收集人工判断或标注
- **公共数据集（public datasets）**：下载研究社区整理和发布的数据集

对于工程应用，数据采集通常涉及传感器和测量设备。例如，用于预测性维护的振动监测系统可能以高采样率从多个传感器采集加速度数据。

不同来源获取的数据质量差异显著。原始数据几乎总是需要清洗和预处理才能用于模型训练，这是第 4 章的主题。

## Data Annotation（数据标注）

**Data annotation**（数据标注，也称为 data labeling）是为原始数据点分配有意义的标签或标记的过程。标注将原始的无标签数据转化为 supervised learning 所需的带标签数据集。

标注方法取决于数据类型和任务：

- **分类标签（classification labels）**：为每个样本分配类别（例如，图像的"猫"或"狗"）
- **边界框（bounding boxes）**：在图像中的物体周围绘制矩形，用于目标检测
- **分割掩码（segmentation masks）**：用物体类别标记图像中的每个像素
- **文本标签（text labels）**：标记文本数据中的实体、情感或类别
- **时序标签（temporal labels）**：标记时间序列数据中的事件或片段

数据标注的主要挑战包括：

1. **成本和时间**：手动标注工作量大，特别是对于大型数据集
2. **一致性**：不同的标注者可能对同一示例分配不同的标签（标注者间一致性）
3. **歧义性**：某些示例本质上具有歧义，单一"正确"标签存在争议
4. **领域专业知识**：某些任务需要具备专业知识的标注者（例如，医学影像）

标注的最佳实践包括：制定清晰的标注指南、衡量标注者间一致性、对关键任务每个样本使用多位标注者，以及定期审计标注质量。

## Benchmark Datasets（基准数据集）

**Benchmark datasets**（基准数据集）是研究社区广泛用于评估和比较 machine learning 算法的标准化数据集。它们为可重复实验提供了共同基础：当多位研究人员在同一基准上评估各自方法时，其结果可以直接比较。

使用基准数据集有以下几个优势：

- **可重现性（reproducibility）**：他人可以精确复现你的实验
- **可比较性（comparability）**：你的结果可以与已发表的基线进行比较
- **质量（quality）**：基准数据集通常经过精心整理，具有已知特性
- **便利性（convenience）**：可免费获取，且通常已集成到 ML 库中

本课程中有两个特别重要的基准数据集：

### MNIST 数据集

**MNIST dataset**（Modified National Institute of Standards and Technology）可能是 machine learning 中最著名的基准数据集。它包含 70,000 张手写数字图像（0-9），分为 60,000 张训练图像和 10,000 张测试图像。每张图像是 28x28 像素的灰度图像，展开后有 784 个输入特征。

| 属性 | 值 |
|----------|-------|
| 任务 | 数字分类（10 个类别） |
| 训练样本 | 60,000 |
| 测试样本 | 10,000 |
| 图像尺寸 | 28 x 28 像素（灰度） |
| 输入维度 | 784（展开后） |
| 来源 | 人口普查工作人员和高中生的手写数字 |

MNIST 常被称为 machine learning 的"Hello World"，因为它足够小，可以在笔记本电脑上快速训练；足够简单，大多数算法都能达到合理的准确率；又足够复杂，能够展示不同方法之间有意义的差异。我们将在整个课程中反复使用 MNIST，特别是在神经网络和 CNN 的章节中。

### ImageNet 数据集

**ImageNet dataset** 是一个大规模图像分类基准数据集，包含超过 1400 万张图像，分为超过 20,000 个类别。用于年度 ImageNet Large Scale Visual Recognition Challenge（ILSVRC）的子集包含约 120 万张跨 1,000 个类别的训练图像。

| 属性 | 值 |
|----------|-------|
| 任务 | 图像分类（ILSVRC 有 1,000 个类别） |
| 训练样本 | 约 120 万（ILSVRC 子集） |
| 图像尺寸 | 可变（通常调整为 224 x 224） |
| 类别 | 1,000（ILSVRC），涵盖动物、物体、场景 |
| 意义 | Deep learning 革命的催化剂（AlexNet，2012） |

ImageNet 在 deep learning 革命中发挥了关键作用。2012 年，AlexNet——一个在 ImageNet 上训练的深度 CNN——以远低于任何先前方法的错误率，展示了 deep learning 在 computer vision 上的强大能力。这一成果常被视为引发当前 deep learning 研究时代的事件。

#### 图示：MNIST 和 ImageNet 数据集探索器

<iframe src="../../sims/benchmark-dataset-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>MNIST and ImageNet Dataset Explorer</summary>
Type: microsim
**sim-id:** benchmark-dataset-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Remember (L1)
Bloom Verb: identify
Learning Objective: Identify the key characteristics of MNIST and ImageNet benchmark datasets including sample sizes, image dimensions, and classification categories.

Purpose: Interactive flashcard-style explorer showing example images and statistics from both benchmark datasets.

Layout: Two panels side by side. Left panel: MNIST. Right panel: ImageNet.

Visual elements:
- Each panel shows a 3x3 grid of example images from the dataset
- Below the grid: a statistics card showing sample count, image size, number of classes
- MNIST images: 28x28 grayscale digits rendered as pixel grids
- ImageNet images: represented as colorful rectangles with class labels (since actual images cannot be embedded)

Interactive controls:
- "Shuffle" button for each panel to show different example images
- Hover over any image to see its label and pixel dimensions
- Toggle: "Show pixel values" for MNIST to display numerical values overlaid on pixels

Instructional Rationale: Flashcard-style exploration supports the Remember/identify objective by repeatedly exposing students to dataset characteristics through interactive engagement rather than passive reading.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with randomly generated example digit images for MNIST and colored placeholder rectangles for ImageNet
</details>

## Synthetic Data（合成数据）

**Synthetic data**（合成数据）是人工生成的数据，它模仿真实数据的统计特性，而不是直接从真实世界来源收集。Synthetic data 在 ML 中变得越来越重要，原因如下：

- **隐私（privacy）**：synthetic data 可以替代敏感的真实数据（例如，患者记录），同时保留统计规律
- **数量（volume）**：当真实数据稀缺时，synthetic data 可以扩充训练集
- **平衡（balance）**：synthetic data 可以通过为代表性不足的类别生成更多样本来解决类别不平衡问题
- **边缘案例（edge cases）**：synthetic data 可以创建在真实数据中重要但不常见的罕见场景
- **成本（cost）**：生成 synthetic data 通常比收集和标注真实数据更便宜

生成 synthetic data 的方法包括：

1. **基于规则的生成（rule-based generation）**：根据已知数学模型或领域规则创建数据
2. **统计采样（statistical sampling）**：从拟合的概率分布中采样
3. **仿真（simulation）**：使用物理引擎或领域模拟器生成真实场景
4. **生成模型（generative models）**：使用 GAN 或变分自编码器学习并从数据分布中采样

例如，在自动驾驶领域，可以使用 3D 渲染引擎生成合成驾驶场景，为感知系统提供几乎无限的训练数据。

## Data Augmentation（数据增强）

**Data augmentation**（数据增强）是一种通过对现有数据点应用变换来人工扩大训练数据集规模和多样性的技术。与创建全新样本的 synthetic data 生成不同，augmentation 以保留标签的方式修改现有样本。

Data augmentation 对 image data 尤为重要，可以应用多种几何和光度变换：

- **几何变换（geometric transformations）**：旋转、翻转、裁剪、缩放、平移
- **光度变换（photometric transformations）**：亮度调整、对比度变化、颜色抖动
- **噪声注入（noise injection）**：向图像添加随机噪声
- **弹性形变（elastic deformation）**：应用平滑的空间扭曲

| 增强方式 | 类型 | 效果 | 标签是否保留？ |
|-------------|------|--------|-----------------|
| 水平翻转 | 几何 | 左右镜像 | 是（对大多数任务） |
| 随机旋转（±15 度） | 几何 | 轻微旋转 | 是 |
| 随机裁剪 | 几何 | 提取子区域 | 是（如果物体仍可见） |
| 亮度变化 | 光度 | 变亮或变暗 | 是 |
| 高斯噪声 | 噪声 | 添加随机像素噪声 | 是 |

Data augmentation 起到正则化的作用：通过向模型展示每个训练示例的略微不同版本，它减少了过拟合并提高了泛化能力。现代 deep learning 流水线在训练过程中动态应用 augmentation，因此增强后的图像是动态生成的，而不是存储在磁盘上。

#### 图示：图像增强画廊

<iframe src="../../sims/image-augmentation-gallery/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Image Augmentation Gallery</summary>
Type: microsim
**sim-id:** image-augmentation-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: apply
Learning Objective: Apply common data augmentation transformations to an image and observe how each transformation modifies the visual content while preserving the label.

Purpose: Let students interactively apply augmentation transforms to a sample image and see the result in real time.

Visual elements:
- Left panel: Original image (a simple drawn digit or geometric shape)
- Right panel: Augmented version after applying the selected transform
- Below: slider controls for transform parameters

Interactive controls:
- Dropdown: Select augmentation type (Flip Horizontal, Rotate, Scale, Brightness, Add Noise, Crop)
- Slider: Transform intensity (e.g., rotation angle from -45 to +45 degrees, brightness from 0.5 to 1.5)
- Button: "Random Augmentation" applies a random combination of transforms
- Button: "Reset" returns to original image
- Display: Shows the augmentation parameters applied

Default parameters:
- Augmentation type: Rotate
- Rotation angle: 0 degrees
- Original image: a simple 8x8 grid pattern or drawn digit

Instructional Rationale: Interactive parameter exploration supports the Apply objective by letting students directly manipulate augmentation parameters and see their effects, building intuition for how augmentation modifies data.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with pixel manipulation functions
</details>

## Data Integration（数据集成）

**Data integration**（数据集成）是将多个来源的数据合并为适合分析或模型训练的统一数据集的过程。在实践中，ML 项目所需的数据很少来自单一来源；工程师必须合并、对齐和协调来自数据库、API、文件和传感器的数据。

数据集成的主要挑战包括：

- **模式对齐（schema alignment）**：不同来源可能对同一数量使用不同的列名、数据类型或单位
- **记录匹配（record matching）**：识别不同来源的记录何时指向同一现实世界实体
- **冲突解决（conflict resolution）**：当来源不一致时决定保留哪个值
- **时序对齐（temporal alignment）**：同步在不同时间或采样率下收集的数据
- **规模差异（scale differences）**：一个来源可能有数百万条记录，而另一个只有数千条

常见的数据集成工作流程包括：

1. 识别所有相关数据来源
2. 将每个来源的数据提取为通用格式（通常为 Pandas DataFrames）
3. 标准化列名、单位和数据类型
4. 在公共键上连接或合并数据集
5. 解决冲突并处理不匹配
6. 验证集成数据集的完整性和一致性

## Data Exploration（数据探索）

**Data exploration**（数据探索，也称为探索性数据分析，EDA）是在构建模型之前检查数据集以了解其结构、质量和特征的过程。EDA 至关重要，因为它揭示了影响建模决策的规律、异常和潜在问题。

系统化的 EDA 流程通常包括：

1. **规模与形状**：有多少样本和特征？数据类型是什么？
2. **汇总统计**：每个特征的均值、中位数、标准差、最小值、最大值
3. **缺失值**：哪些特征有缺失数据？缺失多少？
4. **分布**：特征是否服从正态分布、偏态分布或多峰分布？
5. **相关性**：哪些特征相互之间或与目标变量相关？
6. **异常值**：是否存在可能影响模型训练的极端值？
7. **类别平衡**：对于分类任务，类别是否大致均衡？

可视化是 EDA 的主要工具。直方图揭示分布，散点图显示特征间的关系，箱线图识别异常值，相关热力图展示特征间的成对关系。

#### 图示：EDA 工作流程仪表盘

<iframe src="../../sims/eda-workflow-dashboard/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>EDA Workflow Dashboard</summary>
Type: infographic
**sim-id:** eda-workflow-dashboard<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute
Learning Objective: Execute a systematic exploratory data analysis workflow by stepping through each stage from data loading to insight extraction.

Purpose: Interactive walkthrough of an EDA process on a sample dataset, showing what each step reveals.

Data Visibility Requirements:
Stage 1: "Load Data" - Show a small sample dataset (8 rows, 5 columns) with header row
Stage 2: "Check Shape" - Display "8 rows x 5 columns", data types for each column
Stage 3: "Summary Statistics" - Show mean, std, min, max table
Stage 4: "Missing Values" - Highlight cells with missing values in red, show count per column
Stage 5: "Distribution" - Show a histogram for one numeric feature
Stage 6: "Correlation" - Show a small correlation heatmap
Stage 7: "Insights" - Bullet list of findings (e.g., "Feature X is right-skewed", "Features A and B are highly correlated")

Interactive controls:
- "Next" / "Previous" buttons to step through stages
- At each stage, a brief explanation of what to look for

Instructional Rationale: Staged walkthrough with concrete data supports the Apply/execute objective by giving students a template workflow they can replicate with their own datasets.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with step-based rendering
</details>

## 关键要点

- **Dataset** 是用于 ML 的有组织的数据点集合，以 **tabular data**（行和列）和 **image data**（像素网格）等格式存在。
- **Data acquisition** 涉及从传感器、数据库、API、网络爬取或公共存储库收集数据，是任何 ML 流水线的第一阶段。
- **Data annotation** 为原始数据分配标签以用于 supervised learning，高质量的标注需要清晰的指南和一致性检查。
- **MNIST**（70,000 张手写数字）和 **ImageNet**（1400 万+张图像，1000+个类别）等 **benchmark datasets** 为 ML 研究提供了标准化的评估基准。
- **Synthetic data** 是人工生成的，用于扩充稀缺的真实数据、解决隐私问题或创建罕见的边缘案例。
- **Data augmentation** 对现有样本应用变换（旋转、翻转、噪声），以扩大训练集规模并提高泛化能力。
- **Data integration** 将多个来源的数据合并为统一数据集，需要模式对齐和冲突解决。
- **Data exploration** 在建模开始之前通过统计和可视化系统地检查数据集特征。

??? question "自测：你能回答这些问题吗？"
    1. Synthetic data 和 data augmentation 之间有什么区别？
    2. ImageNet 数据集为何对 deep learning 革命具有重要意义？
    3. 说出数据标注过程中出现的三个挑战。
    4. 系统性探索性数据分析（EDA）的关键步骤是什么？


[参见注释参考文献](./references.md)
