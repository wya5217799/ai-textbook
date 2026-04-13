---
title: AI 的 Python 编程工具
description: AI 和机器学习的 Python 生态系统，包括 NumPy、Pandas、Matplotlib、PyTorch 和 Scikit-learn
generated_by: claude skill chapter-content-generator
date: 2026-04-13 19:50:45
version: 0.05
---

# AI 的 Python 编程工具

## 概述

本章介绍贯穿全课程实现 AI 和 machine learning 算法所使用的 Python 编程生态系统。学生将学习 Python 核心语言、使用 Jupyter Notebook 进行交互式开发、使用 NumPy 进行数值计算、使用 Pandas 进行数据处理、使用 Matplotlib 进行可视化、使用 PyTorch 进行 deep learning，以及使用 Scikit-learn 进行经典 machine learning。完成本章后，学生将具备后续所有实践工作所需的软件工具包。

## 涵盖的概念

本章涵盖学习图谱中的以下 7 个概念：

1. Python Programming
2. Jupyter Notebook
3. NumPy
4. Pandas
5. Matplotlib
6. PyTorch
7. Scikit-learn

## 先修要求

本章仅需满足[课程说明](../../course-description.md)中列出的先修条件。

---

## 为什么选择 Python 进行 AI 和 Machine Learning？

Python 已成为人工智能和 machine learning 领域的主导编程语言，这是有充分理由的。其简洁的语法使算法易于阅读，丰富的科学库生态系统消除了从头实现常见操作的需要，而庞大的社区则确保了丰富的文档、教程和支持。几乎所有主要的 ML 框架——TensorFlow、PyTorch、JAX、Scikit-learn——都以 Python 接口作为其主要 API。

对于电气与电子工程专业的学生，Python 提供了一个额外的优势：它弥合了原型开发与生产部署之间的鸿沟。你可以在 notebook 中交互式地探索一个想法，将其扩展为完整的训练流水线，再将结果部署到嵌入式系统或云服务——所有这些都在同一语言生态系统内完成。

本章介绍贯穿本课程的七个工具。我们从 Python 本身和 Jupyter Notebook 环境开始，然后介绍四个核心库（NumPy、Pandas、Matplotlib）和两个 ML 框架（PyTorch、Scikit-learn）。

#### 图示：Python AI 工具栈

<iframe src="../../sims/python-ai-toolkit-stack/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Python AI Toolkit Stack</summary>
Type: diagram
**sim-id:** python-ai-toolkit-stack<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify
Learning Objective: Classify the Python AI toolkit into layers (language, computation, data, visualization, ML frameworks) and understand how they depend on each other.

Purpose: Show a layered stack diagram of the Python AI ecosystem with dependency arrows.

Components to show:
- Bottom layer: "Python 3.x" (foundation)
- Second layer: "NumPy" (numerical computing)
- Third layer (side by side): "Pandas" (data manipulation) and "Matplotlib" (visualization), both built on NumPy
- Top layer (side by side): "PyTorch" (deep learning) and "Scikit-learn" (classical ML), both using NumPy
- Side panel: "Jupyter Notebook" (development environment spanning all layers)

Connections:
- Vertical arrows showing dependency (everything depends on Python, Pandas/Matplotlib depend on NumPy, PyTorch/Scikit-learn depend on NumPy)

Color scheme:
- Python: dark blue
- NumPy: light blue
- Pandas: purple
- Matplotlib: green
- PyTorch: orange-red
- Scikit-learn: teal
- Jupyter: orange

Interactive features:
- Hover over each block to see a one-sentence role description
- Click to highlight dependency chain

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Python 编程

**Python** 是一种高级解释型编程语言，专为可读性和快速开发而设计。其在 ML 工作中的关键特性包括：

- **动态类型（dynamic typing）**：变量不需要显式类型声明，加快了原型开发速度
- **基于缩进的结构**：代码块通过缩进定义，强制保证可读性
- **丰富的标准库**：内置对文件 I/O、JSON 解析、正则表达式等的支持
- **广泛的第三方生态系统**：通过 PyPI（Python Package Index）可获取超过 400,000 个包

Python 的解释性特性意味着其在原始计算上运行速度慢于 C++ 等编译语言。然而，ML 中使用的科学库（NumPy、PyTorch）在底层将计算密集型工作委托给优化的 C 和 CUDA 代码。这意味着你编写简洁的 Python 代码，同时在关键部分获得接近原生的性能。

本课程中常用的关键 Python 特性：

| 特性 | 示例 | ML 使用场景 |
|---------|---------|-------------|
| 列表推导式 | `[x**2 for x in range(10)]` | 数据变换 |
| 字典操作 | `params = {'lr': 0.01, 'epochs': 100}` | 超参数配置 |
| 函数和 lambda | `loss = lambda y, yhat: (y - yhat)**2` | 自定义损失函数 |
| 类和对象 | `class LinearModel: ...` | 模型定义 |
| 上下文管理器 | `with open('data.csv') as f: ...` | 安全文件处理 |
| 切片 | `data[10:20, :]` | 选取数据子集 |

## Jupyter Notebook

**Jupyter Notebook** 是一种交互式开发环境，将代码、输出、可视化和解释性文字整合在单个文档中。"Jupyter"这个名字来源于它最初支持的三种核心编程语言：Julia、Python 和 R。

Jupyter notebook 由一系列**单元格（cells）**组成，每个单元格可以是：

- **代码单元格（code cells）**：包含可执行的 Python 代码；输出直接显示在单元格下方
- **Markdown 单元格（markdown cells）**：包含格式化文本、公式、图片和文档说明

这种基于单元格的工作流程特别适合 machine learning，因为它支持迭代式、实验性的方法。你可以在一个单元格中加载数据，在下一个单元格中探索数据，训练模型，并可视化结果——同时将中间状态保持在内存中。

Jupyter Notebook 在 ML 中的主要优势：

- **即时反馈**：运行一个单元格并立即看到结果
- **内联可视化**：图表直接显示在 notebook 中
- **文档记录**：markdown 单元格让你可以为分析添加注释
- **可重现性**：notebook 可以分享并重新执行
- **丰富的输出**：支持 HTML、LaTeX 公式、图片和交互式 widgets

!!! tip "Jupyter 与 PyCharm"
    本课程同时支持 Jupyter Notebook 和 PyCharm 作为开发环境。使用 Jupyter 进行探索和实验。当构建需要调试工具和项目组织的大型模块化项目时，使用 PyCharm（或任何 IDE）。

#### 图示：Jupyter Notebook 工作流程

<iframe src="../../sims/jupyter-notebook-workflow/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Jupyter Notebook Workflow</summary>
Type: workflow
**sim-id:** jupyter-notebook-workflow<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate the typical ML workflow using Jupyter Notebook by stepping through the sequence of cells from data loading to model evaluation.

Purpose: Show the step-by-step workflow of using Jupyter Notebook for an ML project.

Steps:
1. "Import Libraries" (code cell) - Hover: "Import NumPy, Pandas, Matplotlib, PyTorch or Scikit-learn"
2. "Load Data" (code cell) - Hover: "Read CSV or load built-in dataset"
3. "Explore Data" (code cell + output) - Hover: "Check shape, summary statistics, missing values"
4. "Visualize Data" (code cell + plot output) - Hover: "Create histograms, scatter plots to understand distributions"
5. "Preprocess Data" (code cell) - Hover: "Normalize, split into train/test sets"
6. "Define Model" (code cell) - Hover: "Create model architecture or select algorithm"
7. "Train Model" (code cell + output) - Hover: "Fit model to training data, monitor loss"
8. "Evaluate Results" (code cell + plot output) - Hover: "Compute metrics, plot predictions vs actual"
9. "Document Findings" (markdown cell) - Hover: "Write conclusions and next steps"

Visual style: Vertical flowchart with notebook cell icons, alternating code and output blocks

Color coding:
- Blue: code cells
- Green: output/visualization cells
- Yellow: markdown cells

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with hover text boxes
</details>

## NumPy：数值计算

**NumPy**（Numerical Python）是 Python 中数值计算的基础库。其核心数据结构——`ndarray`（n 维数组）——为向量、矩阵和高维张量提供了高效的存储和运算。几乎所有科学 Python 库都建立在 NumPy 数组之上。

NumPy 对 machine learning 的重要性：

- **向量化操作（vectorized operations）**：无需显式循环即可对整个数组执行计算，达到 C 级速度
- **广播（broadcasting）**：自动对齐不同形状的数组以进行逐元素操作
- **线性代数（linear algebra）**：内置矩阵乘法、求逆、特征分解和 SVD 函数
- **随机数生成（random number generation）**：初始化模型权重和打乱数据的必备工具

本课程使用的核心 NumPy 概念：

| 概念 | 描述 | 示例 |
|---------|-------------|---------|
| 数组创建 | 从列表或生成器创建数组 | `np.array([1, 2, 3])`, `np.zeros((3, 3))` |
| 形状与重塑 | 查询和改变数组维度 | `a.shape`, `a.reshape(2, 3)` |
| 索引与切片 | 访问数组数据的子集 | `a[0, :]`, `a[:, 1:3]` |
| 向量化数学 | 逐元素算术运算 | `a + b`, `a * 2`, `np.exp(a)` |
| 矩阵操作 | 线性代数运算 | `np.dot(A, B)`, `np.linalg.inv(A)` |
| 聚合 | 沿轴计算统计量 | `a.mean()`, `a.sum(axis=0)` |
| 广播 | 自动形状对齐 | `matrix + row_vector` |

NumPy 是 Python 与 ML 所需计算效率之间的桥梁。当你写 `np.dot(X, w)` 来计算线性回归的预测值时，NumPy 将此委托给以编译代码执行的优化 BLAS 例程。

#### 图示：NumPy 数组操作探索器

<iframe src="../../sims/numpy-array-operations/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>NumPy Array Operations Explorer</summary>
Type: microsim
**sim-id:** numpy-array-operations<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: demonstrate
Learning Objective: Demonstrate how NumPy array operations (element-wise, matrix multiplication, broadcasting) work by visualizing the step-by-step computation on concrete numerical examples.

Purpose: An interactive simulation that lets students pick an operation and see how NumPy processes arrays visually.

Data Visibility Requirements:
Stage 1: Show two input arrays (e.g., A = [[1,2],[3,4]] and B = [[5,6],[7,8]]) with their shapes displayed
Stage 2: Show the selected operation (e.g., element-wise multiply) being applied cell by cell with arithmetic shown
Stage 3: Show the result array with each cell traced back to its source computation

Interactive controls:
- Dropdown: Select operation (Element-wise Add, Element-wise Multiply, Matrix Multiply, Transpose, Broadcasting Add)
- Button: "Step Through" to advance one computation step at a time
- Button: "Run All" to show complete result
- Button: "Reset" to start over
- Editable array inputs: students can change the numbers in A and B

Visual elements:
- Two input arrays rendered as colored grids (blue for A, green for B)
- Result array rendered as a purple grid
- Animated highlights showing which cells are being combined at each step
- Computation formula displayed below (e.g., "C[0,0] = A[0,0] * B[0,0] = 1 * 5 = 5")

Instructional Rationale: Step-through with concrete numerical data supports the Apply/demonstrate objective by letting students trace each computation and build intuition for how vectorized operations work internally.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## Pandas：数据处理

**Pandas** 是 Python 中数据处理和分析的标准库。它提供两种主要数据结构：

- **Series**：一维带标签数组（类似电子表格中的一列）
- **DataFrame**：二维带标签数据结构，列可以是不同类型（类似电子表格或 SQL 表）

DataFrame 是 machine learning 中表格数据集的自然表示形式。当你加载一个训练数据的 CSV 文件时，几乎肯定会先将其加载到 Pandas DataFrame 中，然后将选定的列转换为 NumPy 数组或 PyTorch 张量以进行模型训练。

ML 工作流程中的基本 Pandas 操作：

- **加载数据**：`pd.read_csv('data.csv')` 从 CSV 文件读取数据
- **检查**：`.head()`、`.info()`、`.describe()` 提供快速摘要
- **选择**：括号索引和 `.loc[]`/`.iloc[]` 用于行和列
- **过滤**：布尔索引以选择子集（例如，`df[df['age'] > 18]`）
- **缺失数据**：`.isnull()`、`.dropna()`、`.fillna()` 用于处理缺失值
- **分组**：`.groupby()` 用于分割-应用-合并操作
- **合并**：`.merge()` 和 `.concat()` 用于合并数据集

Pandas 位于原始数据文件与 ML 算法所消耗的数值数组之间。典型的工作流程是使用 Pandas 加载数据，执行清洗和特征工程，然后提取 NumPy 数组或张量用于模型训练。

## Matplotlib：数据可视化

**Matplotlib** 是 Python 的基础绘图库。虽然 Seaborn 和 Plotly 等较新的库提供了更高级的接口，但 Matplotlib 仍然是 Python 中科学可视化的支柱，并为许多其他绘图工具提供渲染引擎。

在 machine learning 中，可视化有几个关键用途：

- **数据探索**：在建模之前了解分布、相关性和异常值
- **训练监控**：绘制损失曲线以跟踪模型收敛情况
- **结果呈现**：比较预测值与实际值、显示混淆矩阵
- **沟通交流**：为报告和论文创建出版质量的图表

本课程使用的常见图表类型：

| 图表类型 | 使用场景 | Matplotlib 函数 |
|-----------|----------|-------------------|
| 折线图（line plot） | 训练损失随 epoch 的变化 | `plt.plot()` |
| 散点图（scatter plot） | 特征关系、预测值与实际值 | `plt.scatter()` |
| 直方图（histogram） | 特征分布 | `plt.hist()` |
| 条形图（bar chart） | 比较模型性能指标 | `plt.bar()` |
| 热力图（heatmap） | 混淆矩阵、相关矩阵 | `plt.imshow()` |
| 子图网格（subplot grid） | 多个相关可视化 | `plt.subplots()` |

基本的 Matplotlib 工作流程遵循一致的模式：创建图形，向坐标轴添加数据，自定义标签和格式，然后显示或保存结果。在 Jupyter Notebook 中，图表会在创建它们的单元格之后立即内联显示。

#### 图示：Matplotlib 图表画廊

<iframe src="../../sims/matplotlib-plot-gallery/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Matplotlib Plot Gallery</summary>
Type: infographic
**sim-id:** matplotlib-plot-gallery<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Remember (L1)
Bloom Verb: identify
Learning Objective: Identify the correct Matplotlib plot type for common ML visualization tasks.

Purpose: Interactive gallery showing six common plot types used in ML, with example visualizations and when to use each one.

Layout: 2x3 grid of plot thumbnails

Panels:
1. Line plot - "Training loss over epochs" - shows a decreasing curve
2. Scatter plot - "Feature correlations" - shows scattered points with trend
3. Histogram - "Feature distribution" - shows bell-curve-like bars
4. Bar chart - "Model comparison" - shows bars for accuracy of 3 models
5. Heatmap - "Confusion matrix" - shows colored grid with numbers
6. Subplots - "Multi-view analysis" - shows 2x2 grid of small plots

Interactive elements:
- Hover over each panel to see a tooltip with: plot type name, when to use it, and the Matplotlib function call
- Click a panel to see a larger version with example code snippet

Color scheme: Each plot type has a distinct accent color; consistent axis styling across all panels.

Instructional Rationale: An identification-based gallery supports the Remember/identify objective by associating each plot type with its visual appearance and use case, building recognition skills.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## PyTorch：Deep Learning 框架

**PyTorch** 是由 Meta AI（前身为 Facebook AI Research）开发的开源 deep learning 框架。它是本课程使用的主要 deep learning 框架，因为其设计直观、具有动态计算图，并在研究和工业界都得到了广泛采用。

PyTorch 的关键概念：

- **张量（tensors）**：基本数据结构，类似于 NumPy 数组，但支持 GPU 加速。张量通过 `torch.tensor()` 创建，支持与 NumPy 数组相同的操作。
- **Autograd**：PyTorch 的自动微分引擎。当你对张量设置 `requires_grad=True` 并执行操作时，PyTorch 会记录计算图，并能通过 `.backward()` 自动计算梯度。
- **nn.Module**：所有神经网络层和模型的基类。你通过继承 `nn.Module` 并实现 `forward()` 方法来定义模型。
- **优化器（Optimizers）**：`torch.optim` 提供梯度下降的变体（SGD、Adam 等），用于更新模型参数。
- **DataLoader**：用于高效地批处理、打乱和加载数据的工具。

NumPy 和 PyTorch 之间的关系密切：它们共享相似的 API，你可以通过 `torch.from_numpy()` 和 `.numpy()` 在两者之间转换。关键区别在于 PyTorch 张量可以在 GPU 上运行，并可跟踪梯度以进行自动微分。

最简化的 PyTorch 训练循环遵循以下模式：

1. 定义模型（继承 `nn.Module`）
2. 定义损失函数（例如，`nn.MSELoss()`）
3. 定义优化器（例如，`optim.SGD(model.parameters(), lr=0.01)`）
4. 每个 epoch：前向传播、计算损失、反向传播、更新参数

我们将从第 9 章（Neural Network Foundations）开始构建完整的 PyTorch 模型。

## Scikit-learn：经典 Machine Learning

**Scikit-learn**（通常导入为 `sklearn`）是经典 machine learning 算法的标准 Python 库。虽然 PyTorch 处理 deep learning，但 Scikit-learn 为 linear regression、logistic regression、K-nearest neighbors、K-means clustering、PCA 等众多算法提供了统一的接口。

Scikit-learn 的设计遵循一致的 API 模式，使算法切换变得容易：

- **估计器（Estimators）**：所有模型遵循相同的接口
  - `.fit(X, y)` 在数据上训练模型
  - `.predict(X)` 生成预测
  - `.score(X, y)` 评估性能
- **变换器（Transformers）**：预处理步骤遵循：
  - `.fit(X)` 从数据中学习参数
  - `.transform(X)` 应用变换
  - `.fit_transform(X)` 一步完成两者
- **流水线（Pipelines）**：将预处理和建模步骤链接为单个对象

| Scikit-learn 模块 | 用途 | 课程章节 |
|--------------------|---------|----------------|
| `sklearn.linear_model` | Linear regression, logistic regression | 第 6、10 章 |
| `sklearn.neighbors` | K-nearest neighbors | 第 12 章 |
| `sklearn.cluster` | K-means, DBSCAN | 第 13 章 |
| `sklearn.decomposition` | PCA | 第 13 章 |
| `sklearn.preprocessing` | 归一化、编码 | 第 4 章 |
| `sklearn.model_selection` | 训练/测试集划分、交叉验证 | 第 4、8 章 |
| `sklearn.metrics` | Accuracy, precision, recall, MSE | 第 8、11 章 |

一致的 API 意味着一旦你学会使用一个 Scikit-learn 估计器，切换到另一个只需更改一行代码。这种统一性鼓励对不同算法进行实验。

#### 图示：Scikit-learn 与 PyTorch 选择指南

<iframe src="../../sims/sklearn-vs-pytorch-guide/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Scikit-learn vs PyTorch Decision Guide</summary>
Type: infographic
**sim-id:** sklearn-vs-pytorch-guide<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: differentiate
Learning Objective: Differentiate when to use Scikit-learn versus PyTorch for a given machine learning task based on the algorithm type, data size, and complexity requirements.

Purpose: Interactive decision tree that helps students choose between Scikit-learn and PyTorch for different ML tasks.

Layout: Top-down decision tree with branching questions

Decision nodes:
1. "Is your model a neural network?" -> Yes: PyTorch path, No: continue
2. "Do you need GPU acceleration?" -> Yes: PyTorch path, No: continue
3. "Do you need custom training loops?" -> Yes: PyTorch path, No: Scikit-learn path
4. Terminal nodes show recommended framework with example code snippet

Interactive elements:
- Click each decision node to follow a path
- Hover over terminal nodes to see example use cases
- "Reset" button to start over

Side panel showing comparison table:
| Feature | Scikit-learn | PyTorch |
| API style | .fit()/.predict() | Custom training loop |
| GPU support | No | Yes |
| Auto-differentiation | No | Yes |
| Best for | Classical ML | Deep learning |

Instructional Rationale: A decision tree supports the Analyze/differentiate objective by forcing students to reason through distinguishing criteria rather than memorizing a rule.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with click-based navigation
</details>

## 综合运用

本课程中一个典型的 machine learning 项目会综合使用这些工具：

1. **Jupyter Notebook** 作为开发环境
2. **Pandas** 加载和清洗数据集
3. **Matplotlib** 探索和可视化数据
4. **NumPy** 进行数值变换和特征工程
5. **Scikit-learn** 或 **PyTorch** 构建、训练和评估模型
6. **Matplotlib** 再次用于可视化结果

随着课程的推进，这一工作流程将成为你的第二天性。后续每一章都假设你能够熟练启动 Jupyter Notebook、导入这些库并执行基本的数据操作。

## 关键要点

- **Python** 因其可读的语法和丰富的生态系统，成为 AI/ML 领域的通用语言。
- **Jupyter Notebook** 提供了基于单元格的交互式环境，非常适合迭代式 ML 实验。
- **NumPy** 提供了高效的 n 维数组和向量化操作，是所有科学 Python 库的基础。
- **Pandas** 通过其 DataFrame 结构处理表格数据的加载、清洗和处理。
- **Matplotlib** 是探索数据和呈现结果的基础可视化库。
- **PyTorch** 是本课程使用的 deep learning 框架，提供支持 GPU 的张量和自动微分功能。
- **Scikit-learn** 为经典 ML 算法和预处理工具提供了一致的 API。

??? question "自测：你能回答这些问题吗？"
    1. 为什么 Python 作为解释型语言，在 ML 中不会遭受性能损失？
    2. Jupyter Notebook 基于单元格的工作流程对 ML 项目的主要优势是什么？
    3. 如何在 NumPy 数组和 PyTorch 张量之间进行转换？
    4. 定义 Scikit-learn 一致的 estimator API 的三个方法是什么？


[参见注释参考文献](./references.md)
