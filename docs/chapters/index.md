# 章节目录

本教材共分 16 章，涵盖 200 个核心概念。

## 章节概览

1. [人工智能导论](01-intro-to-ai/index.md) — 介绍 AI 与 machine learning 的核心定义、塑造该领域的历史里程碑，以及 supervised、unsupervised、reinforcement learning 三大学习范式。
2. [AI 编程工具：Python 生态](02-python-tools/index.md) — 涵盖课程全程使用的 Python 工具链：Jupyter Notebook、NumPy、Pandas、Matplotlib、PyTorch 和 Scikit-learn。
3. [数据采集与探索](03-data-acquisition/index.md) — 讲解如何收集、标注和探索数据集，包括 MNIST、ImageNet 等 benchmark dataset，以及 data augmentation 和 data integration 技术。
4. [数据预处理与特征工程](04-data-preprocessing/index.md) — 涉及 data cleaning、error detection、missing value 处理、normalization、feature engineering，以及将数据划分为 training、validation、test set 的关键流程。
5. [机器学习数学基础](05-math-foundations/index.md) — 构建 ML 算法所需的数学工具箱，涵盖 matrix operations、probability distribution、loss function 和 objective function。
6. [线性回归](06-linear-regression/index.md) — 从模型建立到评估，完整呈现 linear regression，包括 normal equation、regression metric 以及最小二乘法的几何解释。
7. [优化与梯度下降](07-optimization-gradient-descent/index.md) — 探讨基于梯度的优化方法，包括 batch、stochastic、mini-batch gradient descent 及其收敛行为与 learning rate 动态。
8. [回归模型评估](08-model-evaluation-regression/index.md) — 涵盖 overfitting、underfitting、regularization、cross-validation 以及 bias-variance tradeoff，目标是构建泛化能力强的 model。
9. [神经网络基础](09-neural-network-foundations/index.md) — 介绍 neural network 的基本构件：neuron、weight、bias、activation function、network layer，以及 fully connected 架构。
10. [分类与逻辑回归](10-classification-logistic-regression/index.md) — 使用 logistic regression 进行 binary 和 multi-class classification，涉及 sigmoid、softmax 函数、cross-entropy loss 和 decision boundary。
11. [分类评估指标](11-classification-evaluation/index.md) — 介绍 confusion matrix 框架及其衍生指标：accuracy、precision、recall、F1 score、ROC curve 和 AUC。
12. [K 近邻算法](12-k-nearest-neighbor/index.md) — 讲解 KNN 算法，包括 distance metric、voting strategy、weighted variant、K 值选择与 hyperparameter tuning。
13. [聚类与无监督学习](13-clustering-unsupervised-learning/index.md) — 涵盖 K-Means clustering、DBSCAN density-based clustering、principal component analysis 和 dimensionality reduction，用于发现无标签数据中的结构。
14. [反向传播训练神经网络](14-backpropagation-training/index.md) — 讲解 neural network 的学习过程：forward pass、backpropagation、weight update、training loop 和 dropout regularization。
15. [卷积神经网络](15-convolutional-neural-networks/index.md) — 呈现 CNN 架构，包括 convolution operation、filter、pooling layer，以及在图像分类、目标检测和语义分割中的应用。
16. [循环神经网络与 ML 工作流](16-rnn-ml-workflow/index.md) — 介绍用于序列数据的 recurrent neural network 和 LSTM，并以端到端 ML workflow 与 model deployment 收尾。

## 如何使用本教材

本教材遵循精心设计的学习路径，每章内容均建立在前章基础之上。第 1–5 章建立 AI 概念、编程工具、数据处理与数学的基础知识；第 6–8 章完整介绍第一个 ML 算法（linear regression）及其优化与评估；第 9–16 章逐步引入 neural network、classification、clustering 和 deep learning 架构。

建议按顺序逐章学习，因为后续章节默认读者已掌握前面的内容。每章均列出前置章节，便于在开始前确认自身准备情况。

---

**注意：** 每章均包含所覆盖的概念列表。请确保在进入进阶章节前完成所有前置内容。
