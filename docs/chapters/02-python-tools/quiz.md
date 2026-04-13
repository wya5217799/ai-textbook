# 测验：AI 的 Python 编程工具

通过以下题目测试你对 machine learning 的 Python 生态系统的理解。

---

#### 1. Python 成为 machine learning 主流语言的主要原因是什么？

<div class="upper-alpha" markdown>
1. Python 是数值计算速度最快的编程语言
2. Python 是专门为神经网络训练设计的
3. Python 简洁的语法、庞大的科学库生态系统和活跃的社区使其非常适合 ML
4. Python 是各大 ML 框架唯一支持的语言
</div>

??? question "显示答案"
    正确答案是 **C**。Python 在 ML 领域占主导地位，原因在于其可读的语法、丰富的科学库生态系统（NumPy、Pandas、PyTorch、Scikit-learn）以及庞大的社区。Python 通过库将计算密集型工作委托给优化的 C 和 CUDA 代码，尽管是解释型语言，仍能实现接近原生的性能。

    **考察概念：** Python 编程

---

#### 2. Jupyter Notebook 中有哪两种主要类型的单元格（cells）？

<div class="upper-alpha" markdown>
1. 输入单元格（input cells）和输出单元格（output cells）
2. 代码单元格（code cells）和 markdown 单元格（markdown cells）
3. 训练单元格（training cells）和验证单元格（validation cells）
4. 数据单元格（data cells）和模型单元格（model cells）
</div>

??? question "显示答案"
    正确答案是 **B**。Jupyter Notebook 由一系列单元格组成。代码单元格包含可执行的 Python 代码，输出直接显示在下方。Markdown 单元格包含格式化文本、公式和文档说明。这种基于单元格的工作流支持 machine learning 所需的迭代式、探索性方法。

    **考察概念：** Jupyter Notebook

---

#### 3. NumPy 使用哪种数据结构来高效表示数值数据的多维数组？

<div class="upper-alpha" markdown>
1. Python 列表（list）
2. Pandas DataFrame
3. NumPy ndarray
4. Python 字典（dictionary）
</div>

??? question "显示答案"
    正确答案是 **C**。NumPy 的核心数据结构是 `ndarray`（n 维数组），它将同类数值数据存储在连续的内存块中。这使得向量化操作能够在优化的 C 代码中运行，使 NumPy 在数值计算方面远快于 Python 列表。Pandas DataFrame 是构建在 NumPy 数组之上的。

    **考察概念：** NumPy

---

#### 4. Pandas 库在 machine learning 工作流中的主要用途是什么？

<div class="upper-alpha" markdown>
1. 创建图表和可视化图形
2. 为 deep learning 模型提供 GPU 加速
3. 加载、处理和探索表格数据集
4. 实现梯度下降（gradient descent）优化算法
</div>

??? question "显示答案"
    正确答案是 **C**。Pandas 专为数据处理和分析而设计，提供 DataFrame 结构用于处理表格数据。它支持加载 CSV 文件、过滤行、处理缺失值、分组数据以及计算汇总统计信息。Matplotlib 处理可视化（A），PyTorch 处理 GPU 加速的 deep learning（B）。

    **考察概念：** Pandas

---

#### 5. Python 中的"dynamic typing"（动态类型）是什么意思？

<div class="upper-alpha" markdown>
1. Python 在文件保存之前边输入边执行代码
2. Python 变量在赋值时不需要显式的类型声明
3. Python 自动更改变量类型以提高性能
4. Python 要求所有变量在程序运行前先声明
</div>

??? question "显示答案"
    正确答案是 **B**。Dynamic typing 意味着 Python 变量无需显式类型注解。你可以直接写 `x = 5`，Python 会在运行时确定类型。这加快了原型开发，因为工程师可以专注于算法而非类型声明。C++ 或 Java 等静态语言则需要预先声明类型。

    **考察概念：** Python 编程

---

#### 6. PyTorch 与 Scikit-learn 作为 machine learning 工具有何区别？

<div class="upper-alpha" markdown>
1. PyTorch 用于经典 ML 算法；Scikit-learn 用于 deep learning
2. PyTorch 支持 GPU 加速和动态计算图，适用于 deep learning；Scikit-learn 提供经典 ML 算法
3. PyTorch 完成简单任务需要更多代码；Scikit-learn 更简洁
4. PyTorch 需要带标签的数据；Scikit-learn 只能处理未标注数据
</div>

??? question "显示答案"
    正确答案是 **B**。PyTorch 是一个 deep learning 框架，支持 GPU 加速的张量计算和自动微分，非常适合训练神经网络。Scikit-learn 提供经典 ML 算法（线性回归、SVM、KNN）的高效实现以及预处理工具，具有一致的 fit/predict API。

    **考察概念：** PyTorch、Scikit-learn

---

#### 7. 哪个库主要用于创建折线图、散点图和直方图以可视化 ML 数据？

<div class="upper-alpha" markdown>
1. NumPy
2. Scikit-learn
3. Matplotlib
4. PyTorch
</div>

??? question "显示答案"
    正确答案是 **C**。Matplotlib 是 Python 的基础绘图库。其 `pyplot` 接口提供了 `plt.plot()` 用于折线图、`plt.scatter()` 用于散点图、`plt.hist()` 用于直方图等函数。这些对于在 ML 开发过程中可视化训练曲线、数据分布和决策边界至关重要。

    **考察概念：** Matplotlib

---

#### 8. 既然 Python 是运行速度慢于编译语言的解释型语言，NumPy 和 PyTorch 等库如何实现高性能？

<div class="upper-alpha" markdown>
1. 它们在执行前将 Python 代码转换为机器码
2. 它们将计算密集型操作委托给底层优化的 C 和 CUDA 代码
3. 它们将计算限制在能放入缓存内存的小数据集上
4. 它们在 Python 解释器中使用多线程来并行化操作
</div>

??? question "显示答案"
    正确答案是 **B**。NumPy 和 PyTorch 是高度优化的原生代码的 Python 接口。当你调用 NumPy 向量化操作时，实际计算在编译的 C 代码中运行。PyTorch 使用 CUDA 编译的内核进行 GPU 操作。这种设计让工程师既能享受 Python 的可读性，又能获得接近原生的计算性能。

    **考察概念：** Python 编程、NumPy、PyTorch

---

#### 9. 与传统 Python 脚本相比，使用 Jupyter Notebook 进行探索性数据分析（EDA）有什么优势？

<div class="upper-alpha" markdown>
1. Jupyter Notebook 在执行循环和数学运算时速度更快
2. Jupyter Notebook 允许在保持中间计算状态的同时，将代码、输出和文档整合在一个文档中
3. Jupyter Notebook 自动优化 Python 代码以在 GPU 上执行
4. Jupyter Notebook 通过在代码运行前进行检查来防止错误
</div>

??? question "显示答案"
    正确答案是 **B**。Jupyter Notebook 基于单元格的结构让你可以逐步运行代码，并在单元格之间保持变量在内存中。你可以加载一次数据，在下一个单元格中探索，在另一个单元格中可视化——无需重新运行整个脚本。Markdown 单元格支持内联文档，输出（图表、表格）直接显示在文档中。

    **考察概念：** Jupyter Notebook

---

#### 10. 以下哪种说法正确描述了本章涵盖的 Python AI 工具之间的依赖关系？

<div class="upper-alpha" markdown>
1. Pandas 和 Matplotlib 独立于 NumPy；各自有自己的数值计算引擎
2. PyTorch 依赖 Scikit-learn；Scikit-learn 依赖 Matplotlib
3. Pandas 和 Matplotlib 构建在 NumPy 之上；PyTorch 和 Scikit-learn 也使用 NumPy 数组
4. 所有工具都依赖 Jupyter Notebook 作为底层运行环境
</div>

??? question "显示答案"
    正确答案是 **C**。NumPy 是基础的数值计算层。Pandas DataFrame 构建在 NumPy 数组之上，Matplotlib 对 NumPy 数组数据进行操作。PyTorch 张量（tensors）可以与 NumPy 数组互操作，Scikit-learn 使用 NumPy 数组作为其主要数据格式。Jupyter Notebook 是开发环境，而非计算依赖项。

    **考察概念：** NumPy、Pandas、Matplotlib、PyTorch、Scikit-learn

---
