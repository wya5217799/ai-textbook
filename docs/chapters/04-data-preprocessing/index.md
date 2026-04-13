---
title: 数据预处理与特征工程
description: 清洗原始数据、工程化特征，以及为机器学习模型训练划分数据集
generated_by: claude skill chapter-content-generator
date: 2026-04-13 19:55:00
version: 0.05
---

# 数据预处理与特征工程

## 概述

本章介绍为 machine learning 模型准备原始数据的关键步骤。学生将学习如何通过检测和处理错误、异常值和缺失值来清洗数据，以及如何通过特征选择、归一化和变换来构建有意义的特征。本章还涵盖将数据划分为训练集、验证集和测试集的核心流程，并介绍 labels、features、feature vectors 和 dimensionality 等概念。完成本章后，学生将能够将原始数据转化为适合模型训练的形式。

## 涵盖的概念

本章涵盖学习图谱中的以下 19 个概念：

1. Data Cleaning
2. Feature Engineering
3. Exploratory Data Analysis
4. Data Errors
5. Outlier Detection
6. Rule-based Detection
7. Pattern-based Detection
8. Missing Values
9. Data Preprocessing
10. Feature Selection
11. Data Normalization
12. Data Splitting
13. Training Set
14. Validation Set
15. Test Set
16. Label
17. Feature
18. Feature Vector
19. Dimensionality

## 先修要求

本章以以下章节的概念为基础：

- [第 1 章：人工智能导论](../01-intro-to-ai/index.md)
- [第 2 章：AI 的 Python 编程工具](../02-python-tools/index.md)
- [第 3 章：数据采集与探索](../03-data-acquisition/index.md)

---

## 从原始数据到可用于模型的数据

从现实世界收集的原始数据几乎从不直接适用于 machine learning 算法。它包含错误、缺失值、格式不一致以及无关信息。数据预处理是原始数据与算法所需的干净、结构化输入之间的桥梁。

预处理的重要性怎么强调都不为过。研究一致表明，数据科学家将 60-80% 的时间花在数据准备上，而这一准备工作的质量直接决定了模型性能。经过良好预处理的数据集能让简单的算法也表现出色，而糟糕的预处理则可能导致复杂的模型失败。

本章涵盖完整的预处理流水线，从理解 features 和 labels 是什么，到清洗和变换，再到最终划分为训练集、验证集和测试集。

## Features、Labels 及其表示

在深入探讨预处理技术之前，我们需要对数据集组成部分建立精确的词汇。

### Feature（特征）

**Feature**（特征，也称为属性、预测变量或自变量）是每个数据点的可测量属性，作为 machine learning 算法的输入。对于房价预测任务，features 可能包括建筑面积、卧室数量、房屋年龄和邻近地区犯罪率。

Features 可以是：

- **数值型（连续，numerical continuous）**：实值测量（例如，温度、价格）
- **数值型（离散，numerical discrete）**：整数计数（例如，房间数量）
- **类别型（categorical）**：类别成员（例如，颜色、品牌）
- **二元型（binary）**：两种可能的值（例如，has_garage: yes/no）

### Feature Vector（特征向量）

**Feature vector**（特征向量）是单个数据点所有 features 的有序集合，表示为数值数组。如果一个数据点有 $d$ 个 features，其 feature vector 是一个 $d$ 维向量：

$\mathbf{x} = [x_1, x_2, \ldots, x_d]$

其中：

- $\mathbf{x}$ 是 feature vector
- $x_i$ 是第 $i$ 个 feature 的值
- $d$ 是 features 的数量（即 dimensionality）

在 NumPy 中，$n$ 个样本、$d$ 个 features 的数据集存储为形状为 $(n, d)$ 的矩阵 $\mathbf{X}$，其中每一行是一个 feature vector。

### Dimensionality（维度）

**Dimensionality**（维度）指数据集中 features 的数量。具有 10 个 features 的数据集其维度为 10；MNIST 数据集将每张 28x28 的图像展开后，维度为 784。

高维度带来了一系列被称为"维度灾难（curse of dimensionality）"的挑战：随着 features 数量的增加，数据在 feature 空间中变得越来越稀疏，点与点之间的距离变得意义不大，模型需要指数级更多的数据才能有效学习。

### Label（标签）

**Label**（标签，也称为 target、response 或因变量）是 supervised learning 算法被训练以预测的值。对于分类任务，labels 是离散类别（例如，"spam"或"not spam"）。对于回归任务，labels 是连续值（例如，以美元计的房价）。

| 术语 | 同义词 | 角色 | 示例 |
|------|---------|------|---------|
| Feature | Attribute, predictor | 模型的输入 | 建筑面积、像素值 |
| Feature vector | Input vector | 一个样本的所有 features | [1200, 3, 25, 0.02] |
| Label | Target, response | 我们预测的内容 | "cat", 250000 |
| Dimensionality | Feature count | Features 的数量 | 784（展开的 MNIST） |

#### 图示：Features、Labels 与 Vectors

<iframe src="../../sims/features-labels-vectors/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Features Labels and Vectors</summary>
Type: microsim
**sim-id:** features-labels-vectors<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: explain
Learning Objective: Explain the relationship between features, feature vectors, labels, and dimensionality by examining a concrete dataset example.

Purpose: Step-through visualization showing how a tabular dataset is decomposed into feature vectors and labels.

Data Visibility Requirements:
Stage 1: Show a small table (5 rows x 4 columns) of house data: [sqft, bedrooms, age, price]. Highlight column headers.
Stage 2: Highlight the first 3 columns as "Features" (blue) and the last column as "Label" (red). Show d=3 as the dimensionality.
Stage 3: Extract one row and display it as a feature vector x = [1200, 3, 25] with the label y = 250000.
Stage 4: Show the full feature matrix X (5x3) and label vector y (5x1) with shapes displayed.

Interactive controls:
- "Next" / "Previous" buttons to step through stages
- Click on any row to highlight it and show its feature vector and label

Instructional Rationale: Step-through with a concrete dataset supports the Understand/explain objective by showing the transformation from tabular data to the mathematical representations used by ML algorithms.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Exploratory Data Analysis（探索性数据分析）

**Exploratory data analysis**（EDA，探索性数据分析）是在应用 ML 算法之前系统地检查数据集属性的过程。虽然第 3 章介绍了数据探索的概念，但本节重点介绍直接指导预处理决策的分析技术。

EDA 回答了关键问题：

- 哪些 features 有缺失值？有多少？
- 是否存在可能扭曲模型训练的异常值？
- 各 features 的分布是什么？
- 是否有高度相关（冗余）的 features？
- 目标变量的分布是否均衡？

EDA 的工具结合了 Pandas（用于统计摘要）和 Matplotlib（用于可视化）。典型的 EDA 会话可能包括：

1. `df.describe()` 获取汇总统计（均值、标准差、四分位数）
2. `df.isnull().sum()` 统计每个 feature 的缺失值数量
3. 直方图（histograms）可视化 feature 分布
4. 散点图（scatter plots）或相关热力图（correlation heatmaps）识别关系
5. 箱线图（box plots）检测异常值

!!! tip "建模前先做 EDA"
    在跳入模型构建之前，务必先执行 EDA。你在 EDA 过程中发现的规律直接指导预处理策略：保留哪些 features，如何处理缺失值，是否需要归一化，以及应用何种异常值处理方法。

## Data Cleaning（数据清洗）

**Data cleaning**（数据清洗）是检测并纠正（或删除）数据集中错误、不一致和不准确内容的过程。干净的数据至关重要，因为 ML 算法将所有输入值视为有意义的；它们无法区分真实测量值和数据输入错误。

### Data Errors（数据错误）

**Data errors**（数据错误）是数据集中由各种来源引起的错误值：

- **测量错误（measurement errors）**：传感器故障、校准漂移或仪器限制
- **数据录入错误（data entry errors）**：拼写错误、误键入值或复制粘贴失误
- **集成错误（integration errors）**：合并多个来源数据时的格式不匹配
- **处理错误（processing errors）**：数据流水线或转换脚本中的 bug

检测数据错误需要结合自动化检查和领域知识。主要使用三种检测方法：

### Rule-based Detection（基于规则的检测）

**Rule-based detection**（基于规则的检测）通过检查数据值是否满足预定义约束来识别错误。这些规则编码了关于有效数据应有样貌的领域知识：

- **范围检查（range checks）**：年龄必须在 0 到 150 之间；温度必须高于绝对零度
- **类型检查（type checks）**：数值字段不应包含文本
- **一致性检查（consistency checks）**：如果记录显示"country: USA"，则"currency"应为"USD"
- **唯一性检查（uniqueness checks）**：主键字段不应有重复

Rule-based detection 实现简单，可以发现明显的错误，但无法检测落在有效范围内的错误（例如，年龄 25 被误录为 52）。

### Pattern-based Detection（基于模式的检测）

**Pattern-based detection**（基于模式的检测）使用统计方法识别偏离数据中预期模式的值：

- **统计异常值（statistical outliers）**：距均值很远的值（例如，超过 3 个标准差）
- **分布违反（distribution violations）**：与 feature 预期分布不一致的值
- **时序模式（temporal patterns）**：时序数据中打破既定趋势的突然峰值或下降
- **关系模式（relational patterns）**：与相关 features 不一致的值（例如，GPA 为 4.0 但所有科目都不及格的学生）

Pattern-based detection 比 rule-based detection 更适合检测细微错误，但需要更多的数据和计算。

### Outlier Detection（异常值检测）

**Outlier detection**（异常值检测）是一种专注于识别与大多数数据点存在显著差异的数据点的错误检测形式。异常值可能是真实的罕见事件（应保留）或错误（应纠正或删除）。

常见的 outlier detection 方法：

| 方法 | 方式 | 适用场景 |
|--------|----------|-------------|
| Z-score | 标记距均值超过 3 个标准差的值 | 服从正态分布的 features |
| IQR 方法 | 标记超出 1.5 倍四分位距范围的值 | 任何分布 |
| Isolation Forest | 隔离异常点的 ML 算法 | 高维数据 |
| 可视化检查 | 箱线图、散点图 | 小到中型数据集 |

删除、截断还是保留异常值的决策取决于领域知识。摄氏 500 度的温度读数几乎肯定是错误，但一夜之间股价翻三倍可能是真实事件。

### Missing Values（缺失值）

**Missing values**（缺失值）出现在数据集中一个或多个数据点的某个 feature 值缺失的情况下。缺失数据在现实世界数据集中很常见，必须显式处理，因为大多数 ML 算法无法直接处理缺失值。

缺失数据机制：

- **完全随机缺失（Missing Completely at Random，MCAR）**：缺失的概率与任何变量无关
- **随机缺失（Missing at Random，MAR）**：缺失取决于观测变量，但不取决于缺失值本身
- **非随机缺失（Missing Not at Random，MNAR）**：缺失取决于缺失值本身（最难处理）

处理策略：

- **删除（deletion）**：删除有缺失值的样本或 features（简单但丢失数据）
- **均值/中位数填充（mean/median imputation）**：用 feature 的均值或中位数替换缺失值
- **众数填充（mode imputation）**：对类别 features，用最频繁的值替换
- **基于模型的填充（model-based imputation）**：使用模型从其他 features 预测缺失值
- **指示变量（indicator variable）**：添加一个二元 feature 指示原始值是否缺失

#### 图示：数据清洗流水线

<iframe src="../../sims/data-cleaning-pipeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Data Cleaning Pipeline</summary>
Type: workflow
**sim-id:** data-cleaning-pipeline<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: execute
Learning Objective: Execute a systematic data cleaning workflow by applying rule-based checks, pattern-based detection, outlier handling, and missing value imputation in the correct order.

Purpose: Interactive workflow showing the sequence of data cleaning steps with before/after data views.

Steps:
1. "Raw Data" - Show a small dataset with visible errors (negative age, missing values, outliers)
2. "Rule-based Checks" - Highlight cells that violate rules (negative age flagged red). Hover: "Check range constraints, type constraints, consistency rules"
3. "Pattern-based Detection" - Highlight statistical outliers (value far from mean). Hover: "Use z-score or IQR to find anomalous values"
4. "Handle Outliers" - Show outlier cells being capped or removed. Hover: "Cap, remove, or keep based on domain knowledge"
5. "Handle Missing Values" - Show missing cells being filled with mean/median. Hover: "Impute with mean, median, mode, or model-based methods"
6. "Clean Data" - Show the cleaned dataset with all issues resolved

Visual style: Horizontal pipeline with data table snapshots at each stage
Color coding: Red for errors, yellow for warnings, green for clean values

Interactive features:
- Click each stage to see the data transformation
- Hover over flagged cells to see the detected issue
- "Step Through" / "Reset" buttons

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Data Preprocessing（数据预处理）

**Data preprocessing**（数据预处理）涵盖对原始数据应用的所有变换，使其适合 ML 算法使用。虽然 data cleaning 删除错误，但 preprocessing 将干净的数据转换为算法可以有效使用的格式。

### Data Normalization（数据归一化）

**Data normalization**（数据归一化，也称为 feature scaling）调整 feature 值的范围，使不同 features 处于可比较的尺度上。这至关重要，因为许多 ML 算法对输入值的量级很敏感。

考虑两个 features：房屋建筑面积（范围：500-5000）和卧室数量（范围：1-6）。若不归一化，建筑面积 feature 将在距离计算中占主导地位，仅仅因为其值较大，而非因为它更具信息量。

常见的归一化方法：

#### Min-Max 归一化

$x_{normalized} = \frac{x - x_{min}}{x_{max} - x_{min}}$

其中：

- $x$ 是原始 feature 值
- $x_{min}$ 是该 feature 的最小值
- $x_{max}$ 是该 feature 的最大值

这将所有值缩放到 [0, 1] 范围内。

#### Z-Score 标准化

$x_{standardized} = \frac{x - \mu}{\sigma}$

其中：

- $x$ 是原始 feature 值
- $\mu$ 是该 feature 的均值
- $\sigma$ 是该 feature 的标准差

这将数据中心化到均值为 0、标准差为 1。

| 方法 | 输出范围 | 适用场景 |
|--------|-------------|-------------|
| Min-Max | [0, 1] | 需要有界值时；对异常值敏感 |
| Z-Score | 无界（以 0 为中心） | 当 features 应有零均值时；对异常值较鲁棒 |

## Feature Engineering（特征工程）

**Feature engineering**（特征工程）是创建新 features 或变换现有 features 以提高模型性能的过程。良好的 feature engineering 以算法可利用的形式捕获领域知识。

### Feature Selection（特征选择）

**Feature selection**（特征选择）识别给定任务中最相关的 features，并删除无关或冗余的 features。减少 features 数量有以下几个好处：

- **减少过拟合（reduced overfitting）**：更少的 features 意味着模型记忆噪声的机会更少
- **加快训练（faster training）**：更少的 features 所需计算量更少
- **提高可解释性（better interpretability）**：features 更少的模型更容易理解
- **降低维度（reduced dimensionality）**：缓解维度灾难

Feature selection 方法：

- **过滤方法（filter methods）**：通过统计度量（相关性、互信息）独立于任何模型对 features 排序
- **包装方法（wrapper methods）**：通过训练模型评估 feature 子集（例如，前向选择、后向消除）
- **嵌入方法（embedded methods）**：将选择作为模型训练的一部分（例如，L1 正则化）

#### 图示：特征工程技术

<iframe src="../../sims/feature-engineering-techniques/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Feature Engineering Techniques</summary>
Type: infographic
**sim-id:** feature-engineering-techniques<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Differentiate between feature selection methods (filter, wrapper, embedded) and feature transformation techniques (normalization, encoding) by examining how each affects the feature space.

Purpose: Interactive concept map showing the different branches of feature engineering with examples.

Layout: Central node "Feature Engineering" branches into two main categories: "Feature Selection" and "Feature Transformation." Each category further branches into specific methods.

Nodes:
- Feature Selection -> Filter Methods (correlation, mutual information)
- Feature Selection -> Wrapper Methods (forward selection, backward elimination)
- Feature Selection -> Embedded Methods (L1 regularization)
- Feature Transformation -> Normalization (Min-Max, Z-Score)
- Feature Transformation -> Encoding (one-hot, label encoding)
- Feature Transformation -> Creation (polynomial features, interaction terms)

Interactive elements:
- Hover over each method node to see a definition and concrete example
- Click a node to highlight it and show a before/after data transformation example
- Color-coded: blue for selection methods, green for transformation methods

Instructional Rationale: A branching concept map with hover details supports the Analyze/differentiate objective by making the structural relationships between methods visible.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Data Splitting（数据集划分）

**Data splitting**（数据集划分）将数据集划分为用于模型开发不同阶段的独立子集。适当的划分对于获得模型在未见数据上性能的诚实估计至关重要。

### Training Set（训练集）

**Training set**（训练集）是用于训练模型的数据子集——即学习模型参数（权重、系数）的数据。模型在优化过程中反复看到训练数据，并调整其参数以最小化这些示例上的损失函数。

### Validation Set（验证集）

**Validation set**（验证集）在训练过程中用于监控性能并做出模型配置（超参数）相关的决策。模型不在验证数据上训练，但工程师使用验证性能来决定何时停止训练、选择哪些超参数，或哪种模型架构效果最好。

### Test Set（测试集）

**Test set**（测试集）在所有训练和超参数调整完成后保留用于最终评估。它提供了模型在真正未见数据上表现的无偏估计。测试集不应用于做出训练决策；否则，它将不再代表未见数据。

常见的划分比例是 70% 训练集、15% 验证集、15% 测试集，尽管确切比例取决于数据集大小。对于非常大的数据集（数百万个样本），98/1/1 的划分可能是合适的，因为即使 1% 也能提供大量的验证和测试样本的绝对数量。

| 子集 | 目的 | 使用时机 | 典型大小 |
|--------|---------|-------------|-------------|
| Training set | 学习模型参数 | 训练期间 | 60--80% |
| Validation set | 调整超参数，监控过拟合 | 训练期间（间接） | 10--20% |
| Test set | 最终性能评估 | 训练完成后 | 10--20% |

#### 图示：数据集划分可视化

<iframe src="../../sims/data-splitting-visualization/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Data Splitting Visualization</summary>
Type: microsim
**sim-id:** data-splitting-visualization<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how a dataset is divided into training, validation, and test sets and explain the role of each subset in the ML workflow.

Purpose: Interactive visualization showing a dataset being split into three subsets with adjustable ratios.

Visual elements:
- A horizontal bar representing the full dataset (colored as a gradient from left to right)
- Three colored segments: blue (training), orange (validation), green (test)
- Sample count and percentage displayed for each segment
- Below: three boxes showing example rows from each subset

Interactive controls:
- Slider: "Training %" (40--90, default 70)
- Slider: "Validation %" (5--30, default 15)
- Test % automatically computed as remainder
- Toggle: "Shuffle before split" (shows randomized vs sequential split)
- Display: Total samples, samples per subset

Behavior:
- As sliders move, the bar segments resize proportionally
- Sample rows update to reflect the current split
- Warning appears if test set is less than 5%

Instructional Rationale: Interactive slider control supports the Apply/demonstrate objective by letting students experiment with different split ratios and observe how each subset's size changes.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## 完整的预处理流水线

综合所有概念，典型的预处理流水线遵循以下顺序：

1. **加载数据**（Pandas: `pd.read_csv()`）
2. **探索性数据分析**（汇总统计、可视化）
3. **数据清洗**（检测和处理错误、异常值、缺失值）
4. **特征工程**（创建、变换和选择 features）
5. **数据归一化**（将 features 缩放到可比较的范围）
6. **数据集划分**（划分为训练集、验证集和测试集）

流水线中的每个步骤都必须仔细执行，预处理参数（均值、标准差、最小/最大值）只能在训练集上计算，然后应用于验证集和测试集。这防止了信息泄漏（information leakage）——即关于测试数据的知识通过预处理无意间影响了模型。

## 关键要点

- **Features** 是输入变量，**labels** 是 supervised learning 的目标值。**Feature vector** 收集一个样本的所有 features，**dimensionality** 是 features 的数量。
- **Exploratory data analysis** 揭示了指导预处理决策的数据特征。
- **Data cleaning** 通过 **rule-based detection**（约束检查）和 **pattern-based detection**（统计方法）处理 **data errors**。
- **Outlier detection** 使用 z-score、IQR 或基于 ML 的方法识别异常值。
- **Missing values** 必须通过删除、填充或指示变量来处理。
- **Data normalization** 将 features 缩放到可比较的范围，这对基于距离和基于梯度的算法至关重要。
- **Feature engineering** 和 **feature selection** 通过创建信息丰富的输入和删除无关输入来提高模型性能。
- 将数据集划分为 **training set**、**validation set** 和 **test set** 确保了对模型性能的诚实评估。
- **Data preprocessing** 是将原始数据转化为可供模型使用的输入的完整流水线。

??? question "自测：你能回答这些问题吗？"
    1. 为什么 data normalization 对 K-nearest neighbors 等算法很重要？
    2. Rule-based 和 pattern-based 错误检测之间有什么区别？
    3. 为什么归一化参数只能在训练集上计算？
    4. 如果使用测试集来做超参数决策，会发生什么？


[参见注释参考文献](./references.md)
