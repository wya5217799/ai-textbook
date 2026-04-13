# 术语表

本术语表定义了 H63AIS 人工智能系统课程中使用的关键术语。
定义遵循 ISO 11179 元数据注册标准：精确、简洁、独特、非循环，且不含业务规则。

#### Accuracy

所有预测中正确预测所占的比例，计算公式为 (True Positives + True Negatives) / Total Predictions。当类别分布不均衡时，这是一个直观但可能产生误导的指标。

在 H63AIS 中，Accuracy 是学生最先学习的评估 classification model 的指标。然而，学生必须认识到它在不均衡数据集中的局限性。

**示例：** 一个能正确标注 100 张图像中 90 张的 model，其 accuracy 为 90%。

**参见：** Precision, Recall, F1 Score

#### Activation Function

应用于 neuron 输出的数学函数，为 neural network 引入非线性特性，使网络能够学习复杂的模式。

若没有 activation function，多层网络将退化为单一的线性变换，无法对复杂的现实关系进行建模。

**示例：** ReLU activation function 对负数输入输出零，对正数输入原样输出，使网络能够学习非线性的 decision boundary。

**参见：** ReLU Activation, Sigmoid Activation, Tanh Activation

#### AI History

人工智能作为一门科学学科的历史发展脉络，从早期的理论研究和 1956 年的 Dartmouth Conference，经过 expert systems、AI winters，到 2012 年前后的 deep learning 复兴。

了解 AI history 有助于学生理解当前技术的背景，并避免重蹈过去的错误。该领域经历了多次乐观、失望与再度进步的循环。

**示例：** 1970–80 年代的 AI winter 源于过度乐观的承诺；2012 年后 deep learning 的复兴则由大规模数据集、GPU 硬件和算法进步共同驱动。

**参见：** Dartmouth Conference, Expert Systems, Deep Learning

#### Artificial Intelligence

计算机科学的广泛领域，致力于创建能够执行通常需要人类智能的任务的系统，例如视觉感知、语音识别、决策制定和学习。

Artificial Intelligence 是 H63AIS 的总体学科。学生将 machine learning 和 deep learning 的子领域作为构建智能系统的主要现代方法进行研究。

**示例：** 能自动从医学影像中诊断疾病的 AI 系统，完成的是传统上需要专家知识才能完成的任务。

**参见：** Machine Learning, Deep Learning, Expert Systems

#### Artificial Neural Network

一种受生物神经网络结构启发的计算模型，由多层相互连接的 neuron 组成，通过学习到的 weight 和 activation function 对输入进行变换。

Artificial neural network 是现代 deep learning 的基础，支撑着当今最强大的 AI 模型。H63AIS 的学生将深入研究其结构、训练方式和应用场景。

**示例：** 一个三层 artificial neural network 可以通过在 MNIST dataset 上的训练调整 weight，学会对手写数字进行分类。

**参见：** Neuron, Weight, Activation Function, Backpropagation

#### AUC

Area Under the ROC Curve；一个汇总 classifier 在所有 classification threshold 下区分正负样本整体能力的标量值。

AUC 是一种与 threshold 无关的指标，比单独使用 accuracy 能更全面地反映 classifier 的性能，在模型比较时尤为有用。

**示例：** AUC = 0.95 的 classifier 通常比 AUC = 0.70 的更可靠，意味着它在 95% 的情况下能将正样本排在负样本之前。

**参见：** ROC Curve, Classification Threshold, Evaluation Metric

#### Backpropagation

通过从输出层到输入层递归应用链式法则（chain rule），计算 loss function 相对于 neural network 中每个 weight 的梯度的算法。

Backpropagation 是 neural network 的核心训练算法。学生必须理解它，才能明白网络为何能从数据中学习，以及梯度更新如何在各层之间流动。

**示例：** 在 backpropagation 过程中，输出层的误差逐层向前传播，产生更新每个 weight 所需的梯度。

**参见：** Chain Rule, Gradient Descent, Weight Update, Forward Pass

#### Batch Gradient Descent

Gradient descent 的一种变体，在更新参数之前使用整个 training dataset 计算 loss function 的梯度，更新稳定但可能速度较慢。

理解三种 gradient descent 变体（batch、stochastic、mini-batch）在 H63AIS 中至关重要，因为变体的选择会显著影响训练速度和稳定性。

**示例：** 对于包含 10,000 个训练样本的数据集，batch gradient descent 在做一次参数更新之前，需要对所有 10,000 个样本计算梯度。

**参见：** Gradient Descent, Stochastic Gradient Descent, Mini-batch Gradient Descent

#### Benchmark Dataset

一个标准化的、公开可用的 dataset，用于在统一条件下评估和比较 machine learning 算法在特定任务上的性能。

Benchmark dataset 允许不同模型和方法之间的公平比较，使该领域能够客观衡量进展。MNIST 和 ImageNet 是本课程涵盖的典型示例。

**示例：** ImageNet 是一个包含超过一百万张有标注图像的图像分类 benchmark dataset；在 ImageNet 上的 top-5 错误率被广泛用于比较视觉模型。

**参见：** MNIST Dataset, ImageNet Dataset, Evaluation Metric

#### Bernoulli Distribution

一种针对二元结果（0 或 1）的概率分布，由单一参数 p 控制，代表正类结果的概率。

Bernoulli distribution 是 binary classification 的概率论基础。Logistic regression 通过将每个标签建模为 Bernoulli 随机变量（其概率由特征线性组合的 sigmoid 给出）而推导得出。

**示例：** 用概率 p = 0.8 对邮件是否为垃圾邮件（1）或非垃圾邮件（0）进行建模，使用的就是 Bernoulli distribution。

**参见：** Logistic Regression, Binary Classification, Sigmoid Function

#### Bias

加到 neuron 输入加权和上的可学习标量参数，允许 activation function 发生偏移，赋予网络更大的表示灵活性。

Bias 与 bias-variance tradeoff 中的统计偏差不同。在 neural network 中，bias 参数使网络能够拟合不过原点的数据。

**示例：** 没有 bias 项时，单个 neuron 只能学习过原点的超平面；添加 bias 后，它可以表示任意超平面。

**参见：** Weight, Neuron, Bias Term, Bias-Variance Tradeoff

#### Bias Term

在 linear 或 logistic regression model 中，加到输入线性组合上的可学习常数，相当于回归方程中的截距，使模型能够拟合具有非零偏移的数据。

**示例：** 在线性回归 y = wx + b 中，bias term b 使回归线垂直移动，从而能拟合不以原点为中心的数据。

**参见：** Bias, Intercept, Linear Regression

#### Bias Update

每次 gradient descent 步骤中对 bias 参数的修改，计算方式与 weight update 类似：b_new = b_old − learning_rate × (∂Loss/∂b)。

**示例：** 如果 loss 相对于某 neuron 的 bias 的梯度为 0.2，learning rate 为 0.01，则 bias update 为 b_new = b_old − 0.002，轻微移动该 neuron 的激活阈值。

**参见：** Backpropagation, Bias, Weight Update, Gradient Descent

#### Bias-Variance Tradeoff

模型产生系统性误差的倾向（bias）与对 training data 波动的敏感性（variance）之间的矛盾，减少其中一个通常会增加另一个。

Bias-variance tradeoff 是理解 overfitting 和 underfitting 的基础概念。学生用它来分析 model complexity 和 regularization 的必要性。

**示例：** 对少量数据拟合高次多项式具有低 bias 但高 variance；linear model 则具有较高 bias 但较低 variance。

**参见：** Overfitting, Underfitting, Regularization, Model Complexity

#### Binary Classification

一种 supervised learning 任务，其中每个输入必须被分配到恰好两个类别之一，通常标记为 0 和 1，或负类和正类。

Binary classification 是 H63AIS 通过 logistic regression 介绍的基础分类问题，之后会扩展到多类别分类。

**示例：** 从医学图像中检测肿瘤是良性（0）还是恶性（1），是一个 binary classification 问题。

**参见：** Logistic Regression, Sigmoid Function, Decision Boundary

#### Boundary Point

在 DBSCAN 聚类中，位于某个 core object 的 epsilon 邻域内，但自身邻域内点数不足以成为 core object 的数据点。

**示例：** 当 MinPts = 5 时，一个只有 2 个邻居但位于某 core object 邻域内的数据点是 boundary point——它被纳入一个 cluster，但不是 cluster 的中心。

**参见：** DBSCAN, Core Object, Epsilon Neighborhood, Noise Point

#### Business Intelligence

使用数据分析、报告和可视化工具与技术，支持组织进行有据可查的决策，通常应用于历史和当前的运营数据。

Business intelligence 作为 machine learning 的前置知识和应用领域被引入 H63AIS，说明从数据中提取洞察的商业价值。

**示例：** 一家零售公司使用 BI 仪表板追踪每周销售数据并识别趋势，然后再应用 machine learning 预测未来需求。

#### Centroid

一个 cluster 的几何中心，计算为分配到该 cluster 的所有数据点的均值，在 K-means clustering 中用于表示和更新 cluster 的位置。

**示例：** 如果三个数据点位于坐标 (1,2)、(3,4) 和 (5,6)，则 centroid 位于 (3,4)，它将成为下一次 K-means 迭代中新的 cluster 中心。

**参见：** K-Means Clustering, Cluster, K-Means Workflow

#### Chain Rule

计算复合函数导数的微积分法则：如果 z 依赖于 y，而 y 依赖于 x，则 dz/dx = (dz/dy)(dy/dx)。在 backpropagation 中用于计算跨网络各层的梯度。

Chain rule 是 backpropagation 的数学基础。学生必须理解它，才能追踪梯度如何在 neural network 的多个层之间传播。

**示例：** 在具有 f 和 g 两层的网络中，loss 相对于第一层 weight 的梯度，通过在每层使用 chain rule 将局部梯度相乘来计算。

**参见：** Backpropagation, Gradient, Weight Update

#### Classification Threshold

应用于 classifier 输出概率的决策边界值，高于 threshold 的预测被分配到正类，低于 threshold 的被分配到负类。

在实践中选择合适的 threshold 非常重要，因为它决定了 precision 和 recall 之间的权衡。默认 threshold 0.5 并非总是最优的。

**示例：** 使用 threshold 0.7 的垃圾邮件 classifier 仅在预测概率超过 70% 时才将邮件标记为垃圾邮件，从而在减少 false positive 的同时可能漏掉部分垃圾邮件。

**参见：** Logistic Regression, Sigmoid Function, ROC Curve, Precision

#### Cluster

一组数据点，彼此之间比与其他组的点更相似，由 clustering 算法根据邻近程度或密度识别。

**示例：** 在客户细分中，一个 cluster 可能包含所有经常购买电子产品的客户，将他们与偏好服装的 cluster 区分开来。

**参见：** K-Means Clustering, DBSCAN, Centroid

#### Clustering Objective

clustering 算法试图优化的定量准则，例如在 K-means 中最小化 cluster 内总平方距离之和。

**示例：** K-means 的 objective 是最小化每个数据点与其分配的 centroid 之间的欧氏距离平方和，从而产生紧凑、分离良好的 cluster。

**参见：** K-Means Clustering, Centroid, Euclidean Distance

#### CNN Architecture

convolutional neural network 的整体设计，规定了各层的类型、顺序和配置——通常是交替排列的 convolutional layer 和 pooling layer，最后跟若干 fully connected layer。

**示例：** 用于图像分类的 CNN architecture 可能堆叠三个带 ReLU activation 的 convolutional layer、两个 pooling layer、一个 flatten layer 和两个 fully connected layer，最后接输出层。

**参见：** Convolutional Neural Network, Pooling Layer, LeNet-5

#### Computer Vision

人工智能的分支领域，致力于使机器能够解释和理解来自图像和视频的视觉信息。

Computer vision 是 H63AIS 通过 convolutional neural network 介绍的主要应用领域，涵盖图像分类、目标检测和图像分割。

**示例：** 在有标注照片上训练的 computer vision 系统，能够识别图像中是否包含猫、狗或其他对象。

**参见：** Convolutional Neural Network, Image Classification, Object Detection

#### Confusion Matrix

一张汇总 classifier 性能的表格，通过统计数据集上所有预测中 true positive、true negative、false positive 和 false negative 的数量来呈现。

Confusion matrix 是 H63AIS 中所有 classification evaluation metric 的出发点。学生必须能够构建并解读它，才能计算 accuracy、precision、recall 或 F1 score。

**示例：** 对 100 封邮件进行测试的 binary 垃圾邮件 classifier：40 封垃圾邮件被正确识别（TP），50 封非垃圾邮件被正确识别（TN），5 封垃圾邮件被漏掉（FN），5 封非垃圾邮件被错误分类（FP）。

**参见：** True Positive, False Positive, Precision, Recall, Accuracy

#### Convergence

优化算法中连续参数更新对 loss function 的改变可以忽略不计的状态，表明训练已达到（或接近）某个最小值。

**示例：** 当两个 epoch 之间的 loss 减少量小于 0.0001 时，gradient descent 被认为已经 converge，意味着进一步训练不太可能显著改善模型。

**参见：** Gradient Descent, Loss Function, Learning Rate, Divergence

#### Convolution Operation

一种数学运算，filter（kernel）在输入数组（如图像）上滑动，在每个位置计算 filter 权重与局部输入值的点积。

Convolution operation 是 convolutional neural network 的核心计算。它使网络能够高效地检测局部空间模式，例如边缘和纹理。

**示例：** 将 3×3 边缘检测 filter 与灰度图像进行卷积，会产生一张 feature map，突出显示明暗区域之间的边界。

**参见：** Filter, Feature Map, Convolutional Neural Network, Stride, Padding

#### Convolutional Neural Network

一种专为处理网格结构数据（尤其是图像）而设计的 deep neural network architecture，通过使用带共享 weight 的 convolutional layer 来提取空间局部特征。

CNN 是 H63AIS supervised learning 部分的核心主题，展示了架构设计选择（convolution、pooling）如何为视觉任务嵌入有用的归纳偏置。

**示例：** 在 CIFAR-10 dataset 上训练的 CNN，通过检测逐渐复杂的特征——早期层的边缘，后期层的形状——学会对动物和交通工具图像进行分类。

**参见：** Convolution Operation, Pooling Layer, Feature Map, LeNet-5

#### Core Object

在 DBSCAN 中，在其 epsilon 邻域内至少有最少数量其他数据点（MinPts）的数据点，是一个 cluster 的种子。

**示例：** 如果 MinPts = 4，而某个点在半径 ε 内有 6 个邻居，则它是一个 core object，并将锚定一个 cluster，该 cluster 会扩展以包含所有可达点。

**参见：** DBSCAN, Epsilon Neighborhood, Boundary Point, Density Reachable

#### Cosine Similarity

两个非零向量之间相似度的度量，定义为它们夹角的余弦值，范围从 −1（方向相反）到 1（方向相同），对向量的大小不敏感。

**示例：** 如果两个文本文档表示为词频向量，且它们使用相同比例的相同词汇，则无论文档长度如何，cosine similarity 都接近 1。

**参见：** Distance Metric, Euclidean Distance, Similarity Function

#### Cost Function

量化模型在所有训练样本上总误差的函数，通过提供一个待最小化的标量值来引导参数优化。通常与 loss function 互换使用，但 cost function 一般指训练集上的平均值。

**示例：** 在 linear regression 中，cost function 是对所有训练样本取平均的 mean squared error，gradient descent 通过迭代将其最小化。

**参见：** Loss Function, Gradient Descent, Optimization, Objective Function

#### Cross Entropy Loss

一种用于 classification 任务的 loss function，衡量预测概率分布与真实标签分布之间的差异，对置信度高但预测错误的情况施以重惩。

Cross entropy loss 来源于最大似然估计，是 H63AIS 中训练 logistic regression 和多类别 neural network classifier 的标准 loss function。

**示例：** 对于 binary classifier，cross entropy loss 为 −[y log(p) + (1−y) log(1−p)]，其中 y 是真实标签，p 是正类的预测概率。

**参见：** Loss Function, Logistic Regression, Softmax Function, Maximum Likelihood

#### Cross-validation

一种模型评估技术，将 dataset 划分为多个 fold；模型在除一个 fold 之外的所有 fold 上训练，并在剩余的 fold 上验证，对每个 fold 重复此过程后取平均结果。

Cross-validation 比单次 train-validation 划分能提供更稳健的泛化性能估计，尤其在数据有限时更为有用。

**示例：** 在 5-fold cross-validation 中，dataset 被分成五等份；模型在四份上训练，在第五份上验证，循环遍历所有五种配置。

**参见：** Validation Set, Overfitting, Generalization, Training Error

#### Dartmouth Conference

1956 年在美国达特茅斯学院举办的暑期研究项目，"artificial intelligence"一词在此被正式提出，该领域也由此正式确立为一门学术学科。

Dartmouth Conference 是 AI history 中的重要里程碑。了解其背景有助于学生认识该领域的巨大进步，以及早期乐观主义如何演变为现代严谨的方法论。

**示例：** 在 Dartmouth Conference 上，John McCarthy、Marvin Minsky、Claude Shannon 等人提出，人类智能的每个方面原则上都可以被精确描述，从而让机器进行模拟。

**参见：** AI History, Expert Systems, Artificial Intelligence

#### Data Acquisition

从传感器、网络爬虫、数据库、调查或 API 等各种来源收集原始数据的过程，是 machine learning pipeline 的第一步。

Data acquisition 决定了用于训练的信息的质量和数量。在 H63AIS 中，学生认识到模型性能从根本上受数据质量的限制。

**示例：** 为情感分析任务采集数据，可能需要使用 Python 的 requests 库从电商网站爬取数以千计的产品评论。

**参见：** Dataset, Data Annotation, Data Cleaning, Data Preprocessing

#### Data Annotation

为原始数据分配标签、标记或元数据，以创建 supervised learning 算法可用于训练的有标注样本的过程。

没有 annotation，supervised learning 就无法进行。Data annotation 通常成本高、耗时长，使得高效标注成为实际项目中的重要关切。

**示例：** 为行人检测标注图像 dataset，需要人工标注人员在数千张照片中的每个行人周围绘制 bounding box。

**参见：** Label, Supervised Learning, Dataset, Data Acquisition

#### Data Augmentation

通过对现有样本应用保持标签不变的变换（如翻转、旋转图像或添加噪声）来人工增加 training dataset 的大小和多样性的技术。

Data augmentation 可以在不收集新数据的情况下提高模型鲁棒性、减少 overfitting，在有标注数据稀缺时尤为有价值。

**示例：** 对训练图像 dataset 应用随机水平翻转和小角度旋转，使 CNN 能够学习对这些变换具有不变性的特征。

**参见：** Overfitting, Training Set, Convolutional Neural Network, Dataset

#### Data Cleaning

识别并纠正或删除 dataset 中的错误、不一致性和缺失值，以在模型训练前提高数据质量的过程。

"垃圾进，垃圾出"：data cleaning 至关重要，因为 machine learning 模型会从所给数据中学习模式，包括数据质量差所产生的虚假规律。

**示例：** 删除重复行、用列中位数填充缺失的年龄值，以及纠正拼写错误的类别标签，都是 data cleaning 操作。

**参见：** Missing Values, Outlier Detection, Data Errors, Data Preprocessing

#### Data Errors

dataset 中由测量错误、记录失误或冲突来源整合产生的不准确或不一致之处，若不加纠正，可能会降低模型性能。

**示例：** 一个 dataset 中温度读数有时以摄氏度记录，有时以华氏度记录但未转换，这就包含 data error，会误导任何 regression model。

**参见：** Data Cleaning, Outlier Detection, Missing Values, Data Preprocessing

#### Data Exploration

在应用 machine learning 算法之前，通常使用统计摘要和可视化手段对 dataset 的结构、分布、关系和异常进行初步分析。

**示例：** 绘制每个 feature 的直方图、计算相关性并识别类别不均衡，都是对 classification dataset 进行 data exploration 的组成部分。

**参见：** Exploratory Data Analysis, Data Cleaning, Feature Engineering

#### Data Integration

将来自多个异构来源的数据合并为一个统一、连贯的 dataset 的过程，以适合分析或模型训练。

**示例：** 将 SQL 数据库中的客户购买记录、Web 服务器的点击流日志和调查中的人口统计数据合并，可以创建一个用于推荐建模的整合 dataset。

**参见：** Dataset, Data Preprocessing, Data Errors

#### Data Normalization

一种预处理步骤，将 feature 值重新缩放到统一的范围（如 [0, 1]）或分布（如零均值和单位方差），确保没有单一 feature 因量级差异而主导学习过程。

Data normalization 对基于梯度的方法和基于距离的算法至关重要，因为两者都对 feature 量级差异敏感。

**示例：** 归一化一个某 feature 范围为 0 到 1000、另一个 feature 范围为 0 到 1 的 dataset，可防止大量级 feature 对 gradient descent 产生不成比例的影响。

**参见：** Feature Engineering, Data Preprocessing, Gradient Descent, Distance Metric

#### Data Preprocessing

在模型训练之前对原始数据进行的一系列步骤，包括清洗、归一化、feature 选择和数据集划分，以使数据适合 machine learning 算法使用。

**示例：** 图像分类任务的 preprocessing pipeline 可能包括将图像调整为固定分辨率、将像素值归一化到 [0, 1]，以及将 dataset 划分为 training set 和 test set。

**参见：** Data Cleaning, Data Normalization, Feature Engineering, Data Splitting

#### Data Splitting

将 dataset 划分为独立子集的过程——通常为 training set、validation set 和 test set——以便在一部分上训练模型，并在保留的数据上进行评估。

**示例：** 一个包含 10,000 个样本的 dataset 可以按 70% training（7,000）、15% validation（1,500）和 15% test（1,500）的比例划分，以独立地训练、调优和评估模型。

**参见：** Training Set, Validation Set, Test Set, Cross-validation

#### Dataset

数据样本（实例或记录）的结构化集合，每个样本通常由 feature 和（对于 supervised learning）对应的 label 组成，用于训练、验证或测试 machine learning model。

**示例：** MNIST dataset 是一个包含 70,000 张有标注手写数字（0–9）灰度图像的集合，分为 60,000 个 training 样本和 10,000 个 test 样本。

**参见：** Training Set, Benchmark Dataset, Feature, Label

#### DBSCAN

Density-Based Spatial Clustering of Applications with Noise；一种 clustering 算法，将高密度区域中的数据点归为一组，并将低密度区域中的点标记为噪声，无需预先指定 cluster 的数量。

DBSCAN 在 H63AIS 中作为 K-means 的补充，能够处理任意形状的 cluster 并识别异常值，而这是 K-means 无法做到的。

**示例：** DBSCAN 可以识别天文图像 dataset 中的星团，同时将不属于任何 cluster 的孤立数据点（噪声）标记出来。

**参见：** Core Object, Epsilon Neighborhood, Density Reachable, Noise Point

#### DBSCAN Parameters

控制 DBSCAN 行为的两个用户指定的 hyperparameter：epsilon（ε），即每个点周围邻域的半径；以及 MinPts，即该半径内使一个点成为 core object 所需的最少点数。

**示例：** 设置 ε = 0.5 和 MinPts = 5 意味着一个点必须在半径 0.5 内至少有 5 个邻居，才能被视为 core object 并启动一个 cluster。

**参见：** DBSCAN, Epsilon Neighborhood, Core Object

#### Decision Boundary

feature 空间中将 classifier 分配给不同类别的区域分开的面（在二维空间中为线或曲线）。

**示例：** logistic regression classifier 学习一个线性 decision boundary——二维空间中的一条直线——将 feature 空间划分为对应两个类别的区域。

**参见：** Logistic Regression, Binary Classification, Feature

#### Deep Learning

machine learning 的一个子领域，使用具有多个层（深层架构）的 artificial neural network 直接从原始数据中学习层次化的 feature 表示。

Deep learning 是 computer vision、语音识别和自然语言处理的主流方法。H63AIS 通过 fully connected network、CNN 和 RNN 介绍 deep learning。

**示例：** 一个拥有 50 层的 deep convolutional network，可以在不需要手工设计 feature 的情况下，学会识别照片中的复杂对象。

**参见：** Artificial Neural Network, Convolutional Neural Network, Supervised Learning

#### Density Connected

在 DBSCAN 中，如果存在一个 core object，从该 core object 出发两个点都是 density-reachable 的（可能通过不同的 core object 链），则这两个点是 density-connected 的。

**示例：** 如果存在一条 core object 链 C1, C2, ...，使得 A 从 C1 可达，B 从链中最后一个 core object 可达，则点 A 和点 B 是 density-connected 的。

**参见：** DBSCAN, Density Reachable, Core Object, Cluster

#### Density Reachable

在 DBSCAN 中，如果存在一个点的序列，其中每对相邻点都在彼此的 epsilon 邻域内，且每个中间点都是 core object，则点 B 从 core point A 是 density-reachable 的。

**示例：** 如果 core object A 的邻域内有点 M，而 M 是 core object 且其邻域内有点 B，则 B 从 A 是 density-reachable 的。

**参见：** DBSCAN, Core Object, Epsilon Neighborhood, Density Connected

#### Dependent Variable

regression 或 classification model 中从一个或多个 independent（输入）变量预测其值的输出变量。也称为响应变量或目标变量。

**示例：** 在房价预测模型中，dependent variable 是售价，模型从面积、位置和房间数量等 feature 来预测它。

**参见：** Independent Variable, Regression, Linear Regression, Feature

#### Dimensionality

dataset 中 feature（输入变量）的数量，或 feature vector 的维数。高 dimensionality 可能导致维度灾难，使学习更加困难。

**示例：** 一个 dataset 中每张图像由其 784 个原始像素值（28×28）表示，则 dimensionality 为 784。

**参见：** Feature Vector, Dimensionality Reduction, Principal Component Analysis

#### Dimensionality Reduction

在尽可能保留相关信息的同时减少 dataset 中 feature 数量的技术，可简化模型并缓解维度灾难。

**示例：** Principal component analysis 可以将 784 维的图像 dataset 减少到 50 维，同时保留 95% 的方差，从而加快训练速度并改善可视化效果。

**参见：** Principal Component Analysis, Feature Selection, Dimensionality

#### Distance Metric

量化 feature 空间中两个数据点之间差异的函数，满足非负性、对称性和三角不等式性质。在 K-NN 和 clustering 算法中使用。

**示例：** 点 (1,2) 和 (4,6) 之间的 Euclidean distance 为 √[(4−1)² + (6−2)²] = √(9+16) = 5。

**参见：** Euclidean Distance, L1 Distance, Cosine Similarity, K-Nearest Neighbor

#### Divergence

迭代优化算法未能 converge 的情况，其特征是 loss function 随迭代次数增加而增加，通常由 learning rate 过大引起。

**示例：** 如果 gradient descent 中的 learning rate 设置过高，参数更新会越过最小值，导致 loss 爆炸，从而引发 divergence 而非 convergence。

**参见：** Gradient Descent, Convergence, Learning Rate

#### Dropout

neural network 的一种 regularization 技术，在每个训练步骤中，以指定概率随机停用部分 neuron，从而减少协同适应并抑制 overfitting。

Dropout 是一种广泛使用的实用 regularization 策略，可防止复杂网络记忆 training data，提高对未见样本的 generalization 能力。

**示例：** 当 dropout rate 为 0.5 时，每个 neuron 在任意给定训练步骤中有 50% 的概率被置为零，迫使网络学习冗余表示。

**参见：** Regularization, Overfitting, Generalization

#### Early Stopping

一种 regularization 策略，当模型在 validation set 上的性能停止改善时终止训练，在不改变模型架构的情况下防止 overfitting。

**示例：** 如果连续 10 个 epoch validation loss 没有下降，early stopping 将终止训练，并恢复到 validation 性能最佳的 epoch 时的模型权重。

**参见：** Overfitting, Validation Error, Regularization

#### Epoch

对整个 training dataset 的一次完整遍历，期间模型的参数被更新。多个 epoch 用于迭代地精炼模型。

**示例：** 训练 100 个 epoch 意味着模型看到每个训练样本 100 次，根据使用的 gradient descent 变体，在每个 mini-batch 后或每次完整遍历后更新 weight。

**参见：** Training Loop, Gradient Descent, Mini-batch Gradient Descent

#### Epsilon Neighborhood

在 DBSCAN 中，与给定点距离在 ε（epsilon）以内的所有数据点的集合，定义用于判断一个点是 core object、boundary point 还是 noise point 的局部区域。

**示例：** 对于点 P 和 ε = 0.3，epsilon neighborhood 由所有与 P 的 Euclidean distance 不超过 0.3 的点组成。

**参见：** DBSCAN, Core Object, DBSCAN Parameters

#### Error Signal

在 backpropagation 中，loss function 相对于某个 neuron 或层输出的梯度，表示如果该输出稍微改变，loss 将如何变化。向后传播以计算 weight 梯度。

**示例：** 输出层处较大的 error signal 表明网络的预测与真实标签差异显著，在 backpropagation 过程中会驱动更大的 weight 更新。

**参见：** Backpropagation, Gradient, Weight Update

#### Euclidean Distance

Euclidean 空间中两点之间的直线距离，计算为坐标差的平方和的平方根。是 machine learning 中最常用的 distance metric。

**示例：** feature vector (2,3) 和 (5,7) 之间的 Euclidean distance 为 √[(5−2)² + (7−3)²] = √(9+16) = 5。

**参见：** Distance Metric, L1 Distance, K-Nearest Neighbor

#### Euclidean Distance Metric

在 K-means clustering 中专门用作差异度量的 Euclidean distance，用于将数据点分配到最近的 centroid 并计算 cluster 成员关系。

**参见：** Euclidean Distance, K-Means Clustering, Centroid, Distance Metric

#### Evaluation Metric

用于评估 machine learning model 在任务上性能的定量度量，例如 accuracy、MSE、F1 score 或 AUC。指标的选择应反映任务的实际需求。

**示例：** 对于医疗诊断模型，recall（灵敏度）通常优先于 accuracy，以最大限度减少漏诊阳性病例，即使代价是产生更多误报。

**参见：** Accuracy, F1 Score, AUC, Mean Squared Error

#### Expert Systems

基于规则的 artificial intelligence 程序，将领域知识编码为一组 if-then 规则，以在特定领域进行决策或解决问题，在 1970–80 年代曾十分盛行。

Expert system 代表了 machine learning 之前的 AI 范式，展示了手工编码知识的局限性，并推动了向数据驱动学习方法的转变，这也是 H63AIS 的教学重点。

**示例：** MYCIN 是 1970 年代开发的一个 expert system，使用数百条规则来诊断细菌感染并推荐抗生素治疗方案。

**参见：** AI History, Artificial Intelligence

#### Exploratory Data Analysis

一种系统性地使用统计摘要和可视化分析 dataset 的方法，用于在建模之前发现模式、检测异常、验证假设并指导 feature engineering 决策。

**示例：** 在 exploratory data analysis 期间绘制所有 feature 对的散点矩阵并计算相关性热图，可以揭示哪些 feature 与目标变量密切相关。

**参见：** Data Exploration, Data Cleaning, Feature Engineering, Matplotlib

#### F1 Score

precision 和 recall 的调和平均值，提供平衡两者的单一指标，在类别不均衡导致 accuracy 具有误导性时尤为有用。

F1 score 在 H63AIS 中用于评估 false positive 和 false negative 都有实际代价的 classifier，例如医疗或欺诈检测应用。

**示例：** precision = 0.80、recall = 0.60 的 classifier，其 F1 score = 2 × (0.80 × 0.60) / (0.80 + 0.60) = 0.686。

**参见：** Precision, Recall, Confusion Matrix, Evaluation Metric

#### False Negative

模型对实际属于正类的样本预测为负类的结果。也称为 Type II error。

**示例：** 癌症筛查模型将恶性肿瘤分类为良性，产生了一个 false negative——这是一个潜在危及生命的错误。

**参见：** Confusion Matrix, Recall, True Positive

#### False Positive

模型对实际属于负类的样本预测为正类的结果。也称为 Type I error。

**示例：** 垃圾邮件过滤器将一封正常邮件标记为垃圾邮件，产生了一个 false positive，导致用户错过了一封重要消息。

**参见：** Confusion Matrix, Precision, True Negative

#### Feature

数据中用作 machine learning model 输入变量的可测量的单个属性或特征，也称为属性或预测变量。

**示例：** 在房价预测 dataset 中，建筑面积、卧室数量和所在街区都是用于预测售价的 feature。

**参见：** Feature Vector, Feature Engineering, Dataset, Dependent Variable

#### Feature Engineering

利用领域知识从原始数据中创建、转换或选择输入 feature，以提高模型预测性能的过程。

Feature engineering 往往比算法选择更具影响力。在 H63AIS 中，学生学会批判性地思考原始数据的哪种表示方式最能捕捉与任务相关的模式。

**示例：** 从原始时间戳 feature 中提取一天中的小时，并创建二元 "is_weekend" feature，可以改善预测交通流量的模型。

**参见：** Feature Selection, Data Preprocessing, Feature

#### Feature Map

将单个 convolutional filter 应用于输入图像或前一层后的输出，表示特定检测到的模式（如垂直边缘）在整个输入中的空间分布。

**示例：** 将 Sobel 边缘检测 filter 应用于图像，产生一张 feature map，其中亮值表示对应空间位置处存在强边缘。

**参见：** Convolution Operation, Filter, Convolutional Neural Network

#### Feature Selection

从 dataset 中选择最具信息量的 feature 子集，以提高模型性能、减少 overfitting 并缩短训练时间的过程。

**示例：** 从一个拥有 500 个 feature 的 dataset 中删除高度相关的重复 feature 和方差接近零的 feature，可将其精简至 50 个相关预测变量，同时提高速度和 generalization 能力。

**参见：** Feature Engineering, Dimensionality Reduction, Overfitting

#### Feature Vector

数字值的有序列表，每个值代表数据样本的一个 feature，构成 machine learning model 的输入。

**示例：** 一张 28×28 的 MNIST 灰度图像被展平为长度为 784 的 feature vector，其中每个元素代表一个像素的强度。

**参见：** Feature, Dimensionality, Dataset

#### Filter

convolutional neural network 中一个可学习权重的小矩阵，在输入上滑动以检测特定的局部空间模式；也称为 kernel。

**示例：** 一个设计用于检测水平边缘的 3×3 filter，在输入图像中出现水平边缘的任何位置，都会在 feature map 中产生高激活值。

**参见：** Convolution Operation, Feature Map, Kernel Size, CNN Architecture

#### Flatten Layer

neural network 中将多维 tensor（如来自 convolutional layer 的 3D feature map 体积）重塑为一维向量的层，使其能够被 fully connected layer 处理。

**示例：** CNN 的 convolutional layer 和 pooling layer 产生 4×4×64 的 feature 体积后，flatten layer 将其重塑为长度为 1024 的向量，作为分类头的输入。

**参见：** Convolutional Neural Network, Fully Connected Network, CNN Architecture

#### Forward Pass

通过从输入层到输出层依次应用每一层的变换（加权求和后跟 activation function），根据给定输入计算 neural network 输出的过程。

**示例：** 在三层网络的 forward pass 过程中，输入与第一层的 weight 相乘，经过 activation function 处理，这个过程对每个后续层重复，直到产生最终的输出预测。

**参见：** Backpropagation, Activation Function, Neural Network

#### Fully Connected Network

一种 neural network architecture，其中每一层的每个 neuron 都与下一层的每个 neuron 相连，没有共享 weight。也称为 dense network 或 multilayer perceptron。

**示例：** 一个具有 784 个输入、两个各 256 个 neuron 的 hidden layer 和 10 个输出 neuron 的 fully connected network，可以通过学习每对相连 neuron 的 weight 来对 MNIST 数字进行分类。

**参见：** Artificial Neural Network, Hidden Layer, Output Layer, Backpropagation

#### Gaussian Distribution

由均值（μ）和方差（σ²）表征的连续概率分布，产生对称的钟形曲线。许多自然现象和测量误差都遵循此分布。

Gaussian distribution 是 mean squared error 被推导为最优 loss function（在误差服从正态分布的假设下）的基础，将概率论与 regression 联系起来。

**示例：** 如果房价误差服从均值为 0、标准差为 10,000 英镑的 Gaussian distribution，则 regression 参数的最大似然估计等价于最小化 mean squared error。

**参见：** Probability Distribution, Maximum Likelihood, Mean Squared Error

#### Generalization

已训练的 machine learning model 在来自同一底层分布的新的、未见过的数据上表现良好的能力，而不仅仅是记忆训练样本。

Generalization 是 H63AIS 中 supervised learning 的最终目标。一个能够很好地 generalize 的模型，学习的是底层模式而非 training data 中的噪声。

**示例：** 一个 training accuracy 达 99% 但 test accuracy 只有 60% 的模型，未能实现 generalization——它对 training data 产生了 overfitting。

**参见：** Overfitting, Bias-Variance Tradeoff, Regularization, Test Set

#### Gradient

标量函数（如 loss function）相对于其每个参数的偏导数向量，指向函数增长最快的方向。

Gradient 是 gradient descent 用于更新模型参数的核心信号。其大小表示 loss 对每个参数的敏感程度。

**示例：** 如果 loss 相对于 weight w 的梯度为 0.5，将 w 增加一个小量 δ 将使 loss 增加大约 0.5δ。

**参见：** Gradient Descent, Backpropagation, Loss Function

#### Gradient Descent

一种迭代优化算法，沿 loss function 梯度的反方向更新模型参数，从而逐步降低 loss。

Gradient descent 是 H63AIS 中的基础优化算法，用于训练 linear regression 和 neural network。学生必须理解其机制，才能分析 learning rate 选择和 convergence 问题。

**示例：** 在 linear regression 中，gradient descent 从随机权重开始，计算 MSE 相对于每个 weight 的梯度，并从每个 weight 中减去该梯度的一个分数（learning rate），反复迭代直到 converge。

**参见：** Gradient, Learning Rate, Stochastic Gradient Descent, Convergence

#### Hidden Layer

neural network 中输入层和输出层之间的任何层，在此计算数据的中间表示。多个 hidden layer 构成深层网络。

**示例：** 一个用于图像识别的、具有三个 hidden layer 的 neural network，逐步将原始像素值转变为边缘检测器、形状检测器，最终转变为特定对象的 feature。

**参见：** Input Layer, Output Layer, Artificial Neural Network, Deep Learning

#### Hidden Layer Error

在 backpropagation 过程中计算的、loss 相对于 hidden layer 输出的梯度，通过将下一层的 error signal 乘以该层的局部梯度来计算。

**示例：** 在 backpropagation 过程中，hidden layer error 告知网络每个 hidden neuron 的输出对整体预测误差的贡献程度，从而指导流入该层的连接的 weight 更新。

**参见：** Backpropagation, Error Signal, Weight Update, Chain Rule

#### Hidden State

在 recurrent neural network 中，每个时间步计算的向量，汇总了当前输入和所有先前输入的信息，充当网络内部的"记忆"。

**示例：** 处理完"The cat sat"这些词后，RNN 的 hidden state 编码了这段短语的表示，可用于预测下一个词或对情感进行分类。

**参见：** Recurrent Neural Network, Long Short-Term Memory, Sequence Data

#### Hyperparameter Tuning

系统地搜索 hyperparameter（控制学习过程而非从数据中学习的设置，如 learning rate 和层数）最优值的过程，以最大化模型在 validation set 上的性能。

**示例：** 使用网格搜索评估 learning rate {0.001, 0.01, 0.1} 和 hidden layer 大小 {64, 128, 256} 的所有组合，可以确定 neural network 的最佳配置。

**参见：** Learning Rate, Cross-validation, Validation Error, Model Complexity

#### Image Classification

supervised learning 任务，为整张图像从固定类别集中分配一个标签，通常使用 convolutional neural network 来解决。

**示例：** 给定一张手写数字的输入图像，image classification model 预测该图像代表十个类别（0–9）中的哪一个。

**参见：** Convolutional Neural Network, Supervised Learning, ImageNet Dataset

#### Image Data

由数字图像组成的数据，通常表示为像素值的多维数组，各维度对应高度、宽度和颜色通道。

**示例：** 一张存储为 224×224×3 数组的彩色照片，包含 224 行、224 列和 3 个颜色通道（红、绿、蓝），共有 150,528 个像素值。

**参见：** Convolutional Neural Network, Feature Vector, Dataset

#### Image Segmentation

computer vision 任务，将图像中的每个像素划分为一个类别标签，产生像素级的分类图，而非对整张图像给出单一标签。

**示例：** 医学图像 segmentation model 将脑部 MRI 扫描中的每个像素标记为几种组织类型之一（灰质、白质、肿瘤等）。

**参见：** Computer Vision, Convolutional Neural Network, Object Detection, Image Classification

#### ImageNet Dataset

一个包含超过 1400 万张有标注图像、涵盖 20,000 多个类别的大规模 benchmark dataset，被广泛用于训练和评估 computer vision model。

ImageNet 和年度 ILSVRC 竞赛推动了 deep learning 革命：AlexNet 在 2012 年的胜利表明，深层 CNN 显著优于手工设计 feature 的方法。

**示例：** 在 ImageNet 的 120 万张 training 图像上训练 CNN，使网络能够学习通用的视觉 feature，这些 feature 可以很好地迁移到其他图像识别任务中。

**参见：** Benchmark Dataset, Convolutional Neural Network, Image Classification

#### Independent Variable

regression 或 classification model 中用于预测 dependent variable 值的输入 feature。也称为预测变量或解释变量。

**示例：** 在预测学生考试成绩的模型中，学习时间和以往 GPA 是 independent variable。

**参见：** Dependent Variable, Feature, Regression, Linear Regression

#### Input Layer

neural network 的第一层，接收原始输入 feature 并将其不经变换地传递到第一个 hidden layer。neuron 的数量等于输入 feature 的数量。

**示例：** 对 MNIST 数字进行分类的 neural network 有一个包含 784 个 neuron 的 input layer，每个 neuron 对应展平后的 28×28 图像中的一个像素。

**参见：** Hidden Layer, Output Layer, Feature Vector

#### Intercept

所有 independent variable 均为零时 dependent variable 的值，对应 regression 直线与纵轴的交点。在 linear model 中也称为 bias term。

**示例：** 在 linear model y = 2x + 5 中，intercept 为 5——即输入 x 为零时的预测输出。

**参见：** Slope, Linear Regression, Bias Term

#### Jupyter Notebook

一种开源的、基于 Web 的交互式计算环境，允许用户在单个文档中结合可执行代码、可视化和文本，广泛用于数据科学和 machine learning 实验。

**示例：** H63AIS 的学生使用 Jupyter Notebook 编写 Python 代码、显示 Matplotlib 图表，并在一个可共享的文件中记录分析过程。

**参见：** Python Programming, Matplotlib, NumPy, Pandas

#### K Value Selection

选择 K-NN 中最优近邻数 K（或 K-means 中 cluster 数量）的过程，通过在 validation 集上评估，在 bias（高 K）和 variance（低 K）之间取得平衡。

**示例：** 在 validation set 上评估 K ∈ {1, 3, 5, 7, 9} 时的 K-NN accuracy，并选择 validation accuracy 最高的 K，是 K value selection 的标准方法。

**参见：** K-Nearest Neighbor, Cross-validation, Bias-Variance Tradeoff

#### K-Means Clustering

一种迭代 clustering 算法，通过交替将每个点分配到最近的 centroid，然后将 centroid 更新为已分配点的均值，将 dataset 划分为 K 个 cluster，最小化 cluster 内方差。

K-means 是 H63AIS 介绍的典型 unsupervised learning 算法，展示了如何在没有标签的情况下发现模式。

**示例：** 将 K = 4 的 K-means 应用于客户购买数据，可能发现四个自然的客户群体：追求低价者、高端消费者、频繁购物者和偶发购物者。

**参见：** Centroid, Cluster, K-Means Workflow, Clustering Objective

#### K-Means Workflow

运行 K-means 的顺序步骤：(1) 初始化 K 个 centroid（随机或使用 K-means++）；(2) 将每个点分配到最近的 centroid；(3) 将 centroid 更新为 cluster 均值；(4) 重复步骤 2–3，直到 centroid 稳定或达到最大迭代次数。

**示例：** 从 K = 3 个随机放置的 centroid 开始，K-means 迭代地移动它们，直到它们稳定在数据中三个自然群体的中心。

**参见：** K-Means Clustering, Centroid, Convergence

#### K-Nearest Neighbor

一种非参数 supervised learning 算法，通过找到与新样本最相似（按距离衡量）的 K 个训练样本并聚合其标签，来对新样本进行分类或回归预测。

K-NN 在 H63AIS 中作为简单、可解释的算法被介绍，它不需要显式的训练阶段，有助于学生通过类比理解 generalization 的概念。

**示例：** 对一朵新花的测量数据进行分类时，K = 5 的 K-NN 会找到测量值最相似的 5 朵训练花，并将其中最常见的花种标签作为预测结果。

**参见：** Distance Metric, Euclidean Distance, Majority Voting, Weighted KNN

#### Kernel Size

convolutional layer 中 filter 的空间维度（高度 × 宽度），决定了 filter 在每个位置处理的输入局部区域的大小。

**示例：** 3×3 kernel 在每个位置检查输入的 3×3 区域，而 5×5 kernel 捕获更大的感受野，但每个 filter 的参数也更多。

**参见：** Filter, Convolution Operation, Convolutional Neural Network

#### L1 Distance

两个向量对应元素绝对差之和，也称为 Manhattan distance。是 Euclidean distance 的替代方案，对 outlier 不那么敏感。

**示例：** 向量 (1,2) 和 (4,6) 之间的 L1 distance 为 |4−1| + |6−2| = 3 + 4 = 7。

**参见：** Distance Metric, Euclidean Distance, K-Nearest Neighbor

#### L1 Regularization

一种 regularization 技术，将模型 weight 绝对值之和（乘以 hyperparameter λ）加到 loss function 中，通过将许多 weight 驱动为恰好零来鼓励稀疏性。

**示例：** 对具有 100 个 feature 的 linear regression model 应用 L1 regularization，可能导致只有 20 个非零 weight，从而有效地实现 feature selection。

**参见：** L2 Regularization, Regularization, Overfitting

#### L2 Regularization

一种 regularization 技术，将模型 weight 平方和（乘以 λ）加到 loss function 中，惩罚较大的 weight，鼓励平滑、分布均匀的解。也称为 ridge regression 或 weight decay。

**示例：** L2 regularization 将所有 weight 向零收缩，但与 L1 不同，它很少将 weight 推至恰好为零。它是 neural network 训练中最常用的 regularizer。

**参见：** L1 Regularization, Regularization, Overfitting

#### Label

supervised learning 中与训练样本关联的目标值，代表模型被训练来预测的真实输出。

**示例：** 在 MNIST dataset 中，数字"7"图像的 label 是整数 7，模型应学会从像素值预测它。

**参见：** Feature, Supervised Learning, Data Annotation

#### Learning Rate

gradient descent 中控制每次参数更新步长的正标量 hyperparameter，决定了模型在 loss landscape 上移动的速度。

Learning rate 是 H63AIS 中最重要的 hyperparameter 之一。过大会导致 divergence；过小会使训练慢到无法接受。

**示例：** 当 learning rate 为 0.01 时，梯度为 2 的参数更新量为 −0.02（沿梯度反方向移动）。当 learning rate 为 1.0 时，同样的梯度产生 −2.0 的更新，可能导致越过最小值。

**参见：** Gradient Descent, Convergence, Divergence, Hyperparameter Tuning

#### Learning Rate Selection

为 gradient descent 选择合适 learning rate 的过程，使用 learning rate schedule、warm-up 或自适应方法等技术，在训练速度和稳定性之间取得平衡。

**示例：** 从 learning rate 0.1 开始，每 30 个 epoch 将其减少 10 倍，这是一种用于 learning rate selection 的阶梯衰减策略。

**参见：** Learning Rate, Gradient Descent, Hyperparameter Tuning

#### LeNet-5

Yann LeCun 等人于 1998 年提出的开创性 convolutional neural network architecture，由两个 convolutional-pooling 模块和三个 fully connected layer 组成，专为在 MNIST 上进行手写数字识别而设计。

LeNet-5 是 H63AIS 中 CNN architecture 的典型示例，展示了支撑现代网络的基本设计原则。

**示例：** LeNet-5 在 MNIST 上达到超过 99% 的 accuracy，表明使用共享权重卷积的 CNN 能够高效地学习图像分类的空间 feature。

**参见：** Convolutional Neural Network, CNN Architecture, MNIST Dataset

#### Linear Model

预测输出为输入 feature 的线性组合（加权求和）加上 bias term 的模型。Linear model 简单、可解释，常用作基准。

**示例：** linear model ŷ = 0.5×₁ + 1.2×₂ − 3 将输出预测为两个 feature 的加权组合加上 bias，在 feature 空间中构成一个平面。

**参见：** Linear Regression, Logistic Regression, Bias Term, Parameter Vector

#### Linear Regression

一种 supervised learning 算法，通过对 training data 拟合线性函数，建立一个或多个输入 feature 与连续输出之间的关系模型，最小化残差平方和。

Linear regression 是 H63AIS 中第一个讲授的 machine learning 算法，建立了贯穿整个课程的 loss function、优化和模型评估等基础概念。

**示例：** 使用 linear regression 从学习时间预测学生考试成绩，可产生类似于"成绩 = 8.5 × 小时数 + 40"的方程，可用 MSE 进行评估。

**参见：** Loss Function, Mean Squared Error, Gradient Descent, Normal Equation

#### Log-likelihood

likelihood function 的自然对数，用于最大似然估计，通过将乘积转换为求和来简化计算，并用于解析地或通过梯度方法推导最优参数值。

**示例：** 对于 logistic regression，最大化训练标签在 Bernoulli distribution 下的 log-likelihood，等价于最小化 cross entropy loss。

**参见：** Maximum Likelihood, Cross Entropy Loss, Logistic Regression

#### Logistic Regression

一种 supervised classification 算法，使用应用于 feature 线性组合的 sigmoid function 来建模 binary class label 的概率，通过最大化 Bernoulli distribution 的 log-likelihood 来训练。

尽管名为 regression，logistic regression 实际上是一种 classification 算法。它是 H63AIS 中连接 linear regression 和 neural network classifier 的重要桥梁。

**示例：** 经过训练用于检测垃圾邮件的 logistic regression model，输出概率 0.92，表明该邮件几乎可以确定是垃圾邮件，依据是词频和发件人地址等 feature。

**参见：** Sigmoid Function, Binary Classification, Cross Entropy Loss

#### Long Short-Term Memory

一种 recurrent neural network cell 类型，具有可学习的 gate（input、forget、output），控制信息的保留、遗忘或输出，使网络能够对序列数据中的长程依赖关系进行建模。

LSTM 解决了使标准 RNN 无法从遥远历史输入中学习的 vanishing gradient 问题，使其适用于更长的序列。

**示例：** 基于 LSTM 的语言模型可以通过保留序列中更早位置出现的相关上下文（如十个词前提到的主语）来预测句子中的下一个词。

**参见：** Recurrent Neural Network, Hidden State, Sequence Data, Backpropagation

#### Loss Function

衡量模型对单个训练样本的预测与真实标签之间差异的函数，在优化过程中引导参数更新。

Loss function 的选择在 H63AIS 中至关重要：regression 使用 mean squared error，classification 使用 cross entropy。Loss function 编码了特定任务中"误差"的含义。

**示例：** 对于 regression，预测值为 ŷ、真实值为 y 的单个样本的 loss 为 squared loss (ŷ − y)²。

**参见：** Cost Function, Mean Squared Error, Cross Entropy Loss, Optimization

#### Loss Landscape

由所有可能参数配置下 loss function 值所定义的多维曲面，其几何形状决定了优化的难度。

**示例：** 碗状（凸）loss landscape 只有一个全局最小值，gradient descent 无论从哪里初始化都能找到它；而有很多局部最小值的 landscape 可能使 gradient descent 陷入远离全局最优的位置。

**参见：** Loss Function, Gradient Descent, Convergence, Optimization

#### Machine Learning

artificial intelligence 的一个子领域，其中系统通过在数据中寻找模式而非遵循显式编程规则来学习执行任务，并随着经验的积累提高性能。

Machine learning 是 H63AIS 的核心主题。课程涵盖 supervised、unsupervised 和 reinforcement learning 范式，以及从数据到部署的完整实践工作流。

**示例：** 在数千个有标注邮件样本上训练的 machine learning model，无需程序员编写明确的垃圾邮件检测规则，就能学会将新邮件分类为垃圾邮件或非垃圾邮件。

**参见：** Artificial Intelligence, Deep Learning, Supervised Learning, Unsupervised Learning

#### Majority Voting

K-nearest neighbour classification 中的决策规则，将查询点 K 个最近邻中最频繁出现的类别标签作为预测类别。

**示例：** 如果测试点的 5 个最近邻的标签为 [cat, cat, dog, cat, bird]，majority voting 预测 cat（5 票中 3 票）。

**参见：** K-Nearest Neighbor, K Value Selection

#### Matplotlib

一个提供类 MATLAB 接口的 Python 绘图库，用于创建静态、动画和交互式数据可视化，广泛用于数据科学和 machine learning 工作流。

**示例：** 学生使用 Matplotlib 绘制各 epoch 的 training loss 曲线，以揭示模型是在 converging、diverging 还是振荡。

**参见：** Python Programming, Pandas, Exploratory Data Analysis

#### Matrix Inverse

矩阵 A⁻¹，满足 A × A⁻¹ = I（单位矩阵），在其存在的情况下。用于 linear regression 的 normal equation，以解析方式计算精确的最优 weight 向量。

**示例：** normal equation 通过计算 XᵀX 的矩阵逆来求解最优 weight w = (XᵀX)⁻¹Xᵀy，其中 X 是设计矩阵，y 是标签向量。

**参见：** Normal Equation, Matrix Multiplication, Matrix Transpose, Linear Regression

#### Matrix Multiplication

对矩阵 A（m×n）和 B（n×p）进行的运算，产生矩阵 C（m×p），其中每个元素 Cᵢⱼ 是 A 的第 i 行与 B 的第 j 列的点积。是 neural network forward pass 计算的核心。

**示例：** fully connected layer 的 forward pass 使用 matrix multiplication 计算 z = Wx + b，其中 W 是 weight 矩阵，x 是输入向量。

**参见：** Matrix Representation, Forward Pass, Linear Regression

#### Matrix Representation

将 dataset 或线性方程组编码为矩阵和向量的形式，实现紧凑的符号表示，并利用矩阵运算高效计算线性变换。

**示例：** 一个拥有 100 个样本和 5 个 feature 的 dataset 被表示为 100×5 的设计矩阵 X，linear regression model 被紧凑地写作 ŷ = Xw。

**参见：** Matrix Multiplication, Normal Equation, Parameter Vector

#### Matrix Transpose

将矩阵沿对角线翻转的运算，将行转换为列，列转换为行：如果 A 的形状为 m×n，则 Aᵀ 的形状为 n×m。出现在 normal equation 和梯度计算中。

**示例：** 矩阵 [[1,2],[3,4],[5,6]]（3×2）的转置为 [[1,3,5],[2,4,6]]（2×3）。

**参见：** Matrix Multiplication, Normal Equation, Matrix Representation

#### Max Pooling

一种 pooling 运算，将输入划分为矩形区域，并输出每个区域中的最大值，从而减少 feature map 的空间维度并引入平移不变性。

**示例：** 将 2×2 的 max pooling layer 应用于 4×4 的 feature map，通过取每个不重叠的 2×2 块中的最大值，产生 2×2 的输出。

**参见：** Pooling Layer, Convolutional Neural Network, Feature Map

#### Maximum Likelihood

一种统计估计原则，通过最大化在给定参数下观测到 training data 的概率（似然）来选择模型参数。

Maximum likelihood 为常用 loss function 提供了有原则的概率论依据：Gaussian 误差对应 MSE，Bernoulli 结果对应 cross entropy。

**示例：** 通过在 Bernoulli distribution 下最大化 binary label 的似然来拟合 logistic regression model，等价于最小化 cross entropy loss 的过程。

**参见：** Log-likelihood, Gaussian Distribution, Cross Entropy Loss

#### Mean Absolute Error

预测值与真实值之间绝对差的平均值，提供一种比 mean squared error 对较大 outlier 不那么敏感的 loss 指标。

**示例：** 预测值 [2, 4, 6] 与真实值 [1, 5, 8] 之间的绝对误差为 [1, 1, 2]，MAE = (1+1+2)/3 = 1.33。

**参见：** Mean Squared Error, Root Mean Squared Error, Loss Function

#### Mean Squared Error

预测值与真实值之差的平方的平均值，一种对较大误差惩罚多于较小误差的 loss function，在梯度计算上也具有数学便利性。

MSE 是 H63AIS 中基础的 regression loss function，构成 linear regression 优化的基础，并激发了关于 regularization 的后续讨论。

**示例：** 预测值 [3, 5] 与真实值 [2, 7] 之间的平方误差为 [1, 4]，MSE = (1+4)/2 = 2.5。

**参见：** Loss Function, Linear Regression, Root Mean Squared Error, Gradient Descent

#### Mini-batch Gradient Descent

gradient descent 的一种变体，在每一步使用一小批随机选取的训练样本（mini-batch）计算参数更新，在 batch gradient descent 的稳定性和 stochastic gradient descent 的速度之间取得平衡。

Mini-batch gradient descent 是现代 deep learning 框架（包括 PyTorch）中 neural network 的标准训练流程。batch size 是一个关键 hyperparameter。

**示例：** 对于包含 10,000 个样本的 dataset 和 mini-batch size 64，一个 epoch 由大约 156 次参数更新组成，每次从 64 个随机样本计算。

**参见：** Gradient Descent, Batch Gradient Descent, Stochastic Gradient Descent, Epoch

#### Missing Values

由于采集失败、用户不回应或传感器错误而缺失的数据条目，需要在模型训练前进行插补或删除。

**示例：** 一个 15% 的患者没有记录血压值的医疗 dataset，存在 missing value，需要进行插补（如使用列中位数）或删除相应行。

**参见：** Data Cleaning, Data Errors, Data Preprocessing

#### ML Workflow

构建 machine learning 解决方案的端到端流程，包括数据收集、preprocessing、模型选择与训练、评估、hyperparameter tuning 和部署。

**示例：** 产品推荐的完整 ML workflow 包括：获取购买数据、清洗和转换数据、训练协同过滤模型、用保留数据评估、调整 hyperparameter，最后通过 API 部署。

**参见：** Data Acquisition, Data Preprocessing, Model Deployment, Hyperparameter Tuning

#### MNIST Dataset

一个包含 70,000 张灰度图像（28×28 像素）的手写数字（0–9）benchmark dataset，分为 60,000 个 training 样本和 10,000 个 test 样本。是 machine learning 图像分类领域的标准"Hello World"dataset。

**示例：** 在 MNIST 的 60,000 张有标注数字图像上训练 CNN，并在 10,000 张 test 图像上达到超过 99% 的 accuracy，是 H63AIS 的标准基准结果。

**参见：** Benchmark Dataset, ImageNet Dataset, Image Classification, LeNet-5

#### Model Complexity

模型拟合数据中复杂模式的能力，通常以参数数量衡量。较高的 complexity 增加 overfitting 的风险；较低的 complexity 增加 underfitting 的风险。

**示例：** 10 次多项式 regression model 比 1 次多项式具有更高的 model complexity，会更紧密地拟合 training data，但当真实关系是线性时可能会 overfit。

**参见：** Overfitting, Underfitting, Regularization, Bias-Variance Tradeoff

#### Model Deployment

将训练好的 machine learning model 集成到生产环境中，使其能够接收新输入并为现实世界应用生成预测的过程。

**示例：** 部署情感分析模型涉及导出训练好的 PyTorch model，用 Flask 将其封装为 REST API，并将其托管在云服务器上以提供实时预测。

**参见：** ML Workflow, Hyperparameter Tuning

#### Multiple Classification

一种 supervised learning 任务，将每个输入分配到三个或更多离散类别之一，通常使用 softmax function 产生所有类别上的概率分布。

**示例：** 将手写数字图像分类到十个类别（0–9）是一个 multiple classification 问题，model 为每个数字输出一个概率。

**参见：** Softmax Function, One-hot Encoding, Binary Classification

#### Natural Language Processing

artificial intelligence 的子领域，致力于使机器能够理解、生成和处理人类语言，涵盖文本分类、机器翻译和问答等任务。

NLP 在 H63AIS 中作为 machine learning 的重要应用领域被提及，但深入内容不在课程范围之内。学生可以了解该领域及其与所学技术的联系。

**示例：** 分析邮件文本内容的垃圾邮件 classifier 是一个简单的 NLP 应用。

**参见：** Artificial Intelligence, Deep Learning

#### Neural Network

参见 Artificial Neural Network。

#### Neuron

artificial neural network 的基本计算单元，计算输入的加权和，加上 bias，然后应用 activation function 产生输出。

**示例：** 一个有两个输入的 neuron 计算 output = σ(w₁x₁ + w₂x₂ + b)，其中 w₁ 和 w₂ 是 weight，x₁ 和 x₂ 是输入，b 是 bias，σ 是 activation function。

**参见：** Weight, Bias, Activation Function, Artificial Neural Network

#### Noise Point

在 DBSCAN 中，不在任何 core object 的 epsilon 邻域内、因此不被分配到任何 cluster 的数据点，被视为 outlier 或异常值。

**示例：** 一个远离任何数据点群的孤立数据点，将被 DBSCAN 分类为 noise point，表明它可能是 dataset 中的 outlier。

**参见：** DBSCAN, Core Object, Boundary Point, Outlier Detection

#### Nonparametric Method

一类 machine learning 算法，不假设模型具有固定的参数形式；model complexity 会随数据自适应调整。K-nearest neighbour 是一个典型例子。

**示例：** 与 linear regression（假设线性关系）不同，K-NN 不对 decision boundary 的形状做任何假设，允许其对任意非线性模式进行建模。

**参见：** K-Nearest Neighbor, Model Complexity

#### Normal Equation

linear regression model 最优参数的封闭形式解析解，通过将 MSE loss 的梯度设为零推导得出：w = (XᵀX)⁻¹Xᵀy。

Normal equation 提供了一个无需迭代 gradient descent 的精确解，对小 dataset 非常有用，但随着 feature 数量增多，计算上变得不切实际。

**示例：** 对于设计矩阵 X 和标签 y 的 dataset，normal equation 一步直接计算最优 weight 向量，避免了 gradient descent 的迭代过程。

**参见：** Linear Regression, Matrix Inverse, Matrix Transpose, Gradient Descent

#### NumPy

一个提供高效多维数组操作、数学函数和线性代数例程的 Python 数值计算库，是 machine learning 实现的基础。

**示例：** NumPy 的数组操作使学生能够高效地实现 matrix multiplication 和梯度计算，构成自定义 machine learning 代码的数值骨干。

**参见：** Python Programming, Pandas, PyTorch, Scikit-learn

#### Object Detection

computer vision 任务，通过预测图像中多个对象的类别标签和 bounding box 坐标，来识别和定位图像中的多个对象。

**示例：** 自动驾驶汽车的 computer vision 系统使用 object detection 同时识别行人、交通标志和其他车辆，并确定它们在摄像头图像中的位置。

**参见：** Computer Vision, Image Classification, Convolutional Neural Network

#### Objective Function

定义模型训练期间优化（最小化或最大化）准则的函数，包含 loss function 和所有 regularization 项。

**示例：** L2 regularized linear regression 的 objective function 为 MSE + λΣwᵢ²，将预测误差与对较大 weight 的惩罚相结合。

**参见：** Loss Function, Optimization, Regularization

#### One-hot Encoding

将类别变量表示为长度等于类别数量的二元向量，其中恰好一个元素为 1（表示该类别），其余所有元素为 0。

**示例：** 在具有 {cat, dog, bird} 三个类别的问题中，标签"dog"被 one-hot encoding 为 [0, 1, 0]，使模型将各类别视为独立的，而不暗示任何顺序关系。

**参见：** Multiple Classification, Softmax Function, Label

#### Optimization

找到使 objective function 最小化（或最大化）的参数值的数学过程，是训练 machine learning model 的核心。

**示例：** Gradient descent 是 H63AIS 中用于最小化 linear regression 和 neural network 的 loss function 的主要优化算法。

**参见：** Gradient Descent, Loss Function, Objective Function, Convergence

#### Outlier Detection

识别 dataset 中显著偏离一般模式的数据点的过程，这些数据点可能表明测量误差、欺诈行为或真正罕见的事件。

**示例：** 在一个交易金额主要分布在 10 至 500 美元之间的 dataset 中，100 万美元的值将被 outlier detection 方法标记为异常。

**参见：** Data Errors, Data Cleaning, DBSCAN, Rule-based Detection

#### Output Layer

neural network 的最后一层，产生模型的预测，其 neuron 数量和 activation function 由任务决定（如 binary classification 使用一个 sigmoid neuron，K 类分类使用 K 个 neuron 上的 softmax）。

**示例：** 对 MNIST 数字进行分类的网络有一个包含 10 个 neuron 和 softmax activation 的 output layer，产生数字 0–9 的概率分布。

**参见：** Input Layer, Hidden Layer, Softmax Function, Sigmoid Function

#### Output Layer Error

在 backpropagation 过程中于 output layer 计算的初始 error signal，等于 loss function 相对于 output layer 预激活值的梯度，启动 backward pass。

**示例：** 对于使用 MSE loss 的 regression 网络，单个样本的 output layer error 为 2(ŷ − y)，即 (ŷ − y)² 相对于预测值 ŷ 的导数。

**参见：** Backpropagation, Error Signal, Hidden Layer Error

#### Overfitting

一种建模失败，模型学习了 training data 的特定噪声和特有规律，而非底层模式，导致 training accuracy 高但对新数据的 generalization 能力差。

Overfitting 是 H63AIS 的核心问题，推动了对 regularization、cross-validation、early stopping 和 data augmentation 等对策的研究。

**示例：** 一个拥有数百万参数但仅在 100 个样本上训练的 neural network，很可能会记住这些样本，而无法正确预测新数据。

**参见：** Generalization, Regularization, Bias-Variance Tradeoff, Underfitting

#### Padding

在应用卷积之前，在输入图像或 feature map 的边缘添加额外像素（通常为零），控制输出维度是否缩小（无 padding）或保持不变（same padding）。

**示例：** 对 5×5 的输入用 3×3 的 filter 应用"same" padding，会在其周围添加一像素的零边框，产生 5×5 的输出，而非 3×3 的输出。

**参见：** Convolution Operation, Filter, Stride, Feature Map

#### Pandas

一个提供高层次数据结构（Series 和 DataFrame）以及针对表格数据优化的数据处理工具的 Python 库，广泛用于数据 preprocessing 和 exploratory data analysis。

**示例：** 使用 Pandas，学生可以用几行代码将 CSV 文件加载到 DataFrame，用 `.describe()` 计算摘要统计，用 `.fillna()` 填充缺失值，并按条件过滤行。

**参见：** Python Programming, NumPy, Exploratory Data Analysis, Data Preprocessing

#### Parameter Update Rule

确定每次 gradient descent 步骤中模型参数如何调整的数学公式，计算为：new_parameter = old_parameter − learning_rate × gradient。

**示例：** 对于梯度 ∂L/∂w = 0.3、learning rate α = 0.01 的 weight w，parameter update rule 给出 w_new = w_old − 0.01 × 0.3 = w_old − 0.003。

**参见：** Gradient Descent, Learning Rate, Weight Update

#### Parameter Vector

包含模型所有可学习参数（weight 和 bias）的向量，用于 linear model 和 gradient descent 的紧凑数学表述。

**示例：** 一个有 3 个 feature 和 bias term 的 linear regression model，其 parameter vector 为 θ = [w₁, w₂, w₃, b]，gradient descent 通过更新它来最小化 training loss。

**参见：** Weight, Bias Term, Gradient Descent, Linear Model

#### Pattern-based Detection

一种数据质量技术，通过检查数据值是否符合预期的模式、格式或统计分布来识别异常或错误数据。

**示例：** 检测不符合格式"+[国家代码] [10位数字]"的电话号码，或识别超出合理范围 [0, 120] 的年龄值，都是 pattern-based detection 方法。

**参见：** Outlier Detection, Rule-based Detection, Data Errors

#### Perceptron

由 Frank Rosenblatt 于 1958 年提出的最简单的单层 neural network model，计算二元输入的加权和，并根据该和是否超过阈值输出一个二元预测。

Perceptron 在历史上作为现代 neural network 的前身具有重要意义，H63AIS 介绍它是为了引出多层网络和连续 activation function 的发展动机。

**示例：** 一个学习将二维平面中的点分类为某条线上方或下方的 perceptron，每次出错时调整其 weight，若数据是线性可分的，则最终会 converge 到正确的解。

**参见：** Neuron, Artificial Neural Network, Activation Function

#### Pooling Layer

convolutional neural network 中通过在局部区域内聚合值（使用 max 或 average 运算）来减少 feature map 空间维度的层，降低计算量并引入空间不变性。

**示例：** 步长为 2 的 2×2 max pooling layer，通过取每个不重叠的 2×2 区域中的最大值，将 28×28 的 feature map 缩小为 14×14。

**参见：** Max Pooling, Feature Map, Convolutional Neural Network, CNN Architecture

#### Predicted Value

model 对给定输入样本的输出，代表模型对真实标签或目标的估计，在 forward pass 中计算。

**示例：** 应用于面积为 100 m² 的房屋的 linear regression model，可能产生 £250,000 的 predicted value 作为其对售价的估计。

**参见：** Regression, Loss Function, Residual

#### Principal Component Analysis

一种 unsupervised dimensionality reduction 技术，将数据投影到由 principal component（原始 feature 空间中最大方差方向）定义的低维子空间上。

PCA 在 H63AIS 中作为压缩高维数据、可视化数据结构以及在应用其他 machine learning 算法之前去除冗余 feature 的工具被介绍。

**示例：** 对 784 维的 MNIST dataset 应用 PCA 并保留前 50 个分量，可以捕获数字图像中的大部分变化，同时将存储和计算量减少超过 90%。

**参见：** Dimensionality Reduction, Dimensionality, Unsupervised Learning

#### Probability Distribution

描述随机变量每个可能结果的概率的数学函数，满足所有概率非负且总和（或积分）为 1 的条件。

**示例：** Bernoulli distribution 将概率 p 分配给结果 1，将 (1−p) 分配给结果 0，完整地描述了 binary classification 标签的随机变量。

**参见：** Gaussian Distribution, Bernoulli Distribution, Maximum Likelihood

#### Python Programming

使用 Python 编程语言——包括其语法、数据结构和标准库——来实现 machine learning 算法、处理数据和进行模型实验。

Python 是 H63AIS 的首要编程语言。学生用 Python 编写所有实践代码，使用的库包括 NumPy、Pandas、Matplotlib、Scikit-learn 和 PyTorch。

**示例：** 学生编写一个 Python 脚本，用 Pandas 加载 CSV dataset，用 NumPy 归一化 feature，用 Scikit-learn 训练 logistic regression classifier，并用 Matplotlib 绘制 ROC 曲线。

**参见：** Jupyter Notebook, NumPy, Pandas, PyTorch, Scikit-learn

#### PyTorch

由 Meta AI 开发的开源 deep learning 框架，提供自动微分和 GPU 加速的 tensor 计算，广泛用于在研究和生产中构建和训练 neural network。

PyTorch 是 H63AIS 实践作业中使用的主要 deep learning 框架，使学生获得 tensor、autograd 以及通过 `nn.Module` 进行模型构建的实践经验。

**示例：** 在 PyTorch 中，定义一个继承自 `nn.Module` 的 neural network 类，在 `__init__` 中初始化各层，并在 `forward()` 中指定 forward pass，是构建模型的标准模式。

**参见：** Python Programming, Scikit-learn, Artificial Neural Network

#### R-Squared

一种统计度量（决定系数），范围在 0 到 1 之间，表示 dependent variable 中由 model 解释的方差比例，1 表示完美拟合。

**示例：** R² = 0.85 的 linear regression model 用输入 feature 解释了 85% 的房价变化，剩余 15% 无法解释。

**参见：** Regression, Mean Squared Error, Residual

#### Recall

classifier 正确识别的实际正类样本比例，计算公式为 True Positives / (True Positives + False Negatives)。也称为灵敏度（sensitivity）。

Recall 在 H63AIS 的场景中至关重要，例如疾病检测——漏掉一个正类（false negative）会带来严重后果。

**示例：** recall = 0.95 的癌症检测模型正确识别了 95% 的所有恶性病例，仅遗漏了 5%。

**参见：** Precision, F1 Score, Confusion Matrix, False Negative

#### Recurrent Neural Network

一种为处理序列数据而设计的 neural network architecture，其中每个时间步的输出被反馈为下一个时间步的输入，使网络能够维持一个编码时序上下文的 hidden state。

**示例：** 在每日股票价格上训练的 RNN，将每天的价格作为一个时间步处理，利用其 hidden state 捕捉趋势和季节性，以预测第二天的价格。

**参见：** Hidden State, Long Short-Term Memory, Sequence Data

#### Regression

一种 supervised learning 任务，model 预测连续的数值输出而非离散的类别标签，使用 mean squared error 或 R-squared 等指标进行评估。

**示例：** 从面积和位置等 feature 预测房屋的英镑售价，是一个 regression 问题，因为目标是一个连续值。

**参见：** Linear Regression, Loss Function, Mean Squared Error, Dependent Variable

#### Regularization

一套在训练过程中约束或惩罚模型参数的技术，通过防止模型变得过于复杂来减少 overfitting 并提高 generalization 能力。

**示例：** 在 loss function 中添加 L2 惩罚项，阻止 weight 过度增大，从而降低模型拟合 training data 中噪声的倾向。

**参见：** L1 Regularization, L2 Regularization, Overfitting, Dropout

#### Reinforcement Learning

一种 machine learning 范式，其中 agent 通过接收来自环境的奖励或惩罚来学习做出顺序决策，旨在随时间最大化累积奖励。

Reinforcement learning 在 H63AIS 中作为与 supervised 和 unsupervised learning 并列的独特学习范式被介绍，并涵盖基于价值和基于策略的方法。

**示例：** 使用 reinforcement learning 训练棋类游戏 agent：agent 赢棋时获得正奖励，输棋时获得负奖励，通过数百万局游戏学习策略。

**参见：** Supervised Learning, Unsupervised Learning, Machine Learning

#### ReLU Activation

Rectified Linear Unit；一种定义为 f(x) = max(0, x) 的 activation function，对正数输入原样输出，对负数输入输出零。由于其简单性和对 vanishing gradient 的抵抗力，成为现代深层网络 hidden layer 的默认 activation function。

**示例：** 具有 ReLU activation 的 neuron，输入 −3 时输出 0，输入 5 时输出 5。这种非线性使网络能够高效地学习复杂的 decision boundary。

**参见：** Activation Function, Sigmoid Activation, Tanh Activation

#### Residual

对于给定训练样本，观测（真实）值与模型预测值之间的差异，用于计算 loss function 和评估模型拟合程度。

**示例：** 如果 linear regression model 对一套售价为 £220,000 的房屋预测为 £200,000，则 residual 为 £20,000，表明模型低估了价格。

**参见：** Loss Function, Regression, Mean Squared Error, R-Squared

#### ROC Curve

Receiver Operating Characteristic curve；在所有 classification threshold 下，True Positive Rate（recall）对 False Positive Rate 的图形化曲线，用于在所有操作点上可视化和比较 classifier 性能。

**示例：** 绘制垃圾邮件过滤器的 ROC curve，展示了随 classification threshold 变化，检测垃圾邮件（TPR）与误标正常邮件（FPR）之间的权衡关系。

**参见：** AUC, Classification Threshold, True Positive, False Positive

#### Root Mean Squared Error

mean squared error 的平方根，一种与目标变量单位相同的 loss 指标，使其在评估预测误差大小时比 MSE 更具可解释性。

**示例：** 房价预测模型的 RMSE 为 £15,000，表明预测值平均偏离真实价格约 £15,000。

**参见：** Mean Squared Error, Mean Absolute Error, Regression

#### Rule-based Detection

一种数据质量技术，通过检查数据值是否违反预定义的逻辑规则（如范围约束或参照完整性条件）来识别异常或无效数据。

**示例：** 将任何年龄小于 0 或大于 150 的患者年龄标记为错误，是数据清洗中应用的简单 rule-based detection 机制。

**参见：** Outlier Detection, Pattern-based Detection, Data Errors

#### Scikit-learn

一个开源 Python machine learning 库，提供经典算法（linear regression、K-NN、K-means、SVM 等）的简单、一致的实现，以及 preprocessing、模型选择和评估工具。

**示例：** 使用 Scikit-learn，学生可以用三行 Python 代码训练 K-nearest neighbour classifier：`model = KNeighborsClassifier(n_neighbors=5)`、`model.fit(X_train, y_train)`、`model.score(X_test, y_test)`。

**参见：** Python Programming, PyTorch, NumPy

#### Sequence Data

元素顺序包含有意义信息的数据，如时间序列、自然语言文本、音频信号或基因组序列，需要 RNN 或 LSTM 等专门模型来处理。

**示例：** 一年内记录的每日气温测量值构成 sequence data，测量值的顺序对于建模季节性模式或进行预测至关重要。

**参见：** Recurrent Neural Network, Long Short-Term Memory, Hidden State

#### Sigmoid Activation

在 neural network hidden layer 中用作 activation function 的 sigmoid function，产生 (0,1) 范围内的输出。现在在 hidden layer 中已基本被 ReLU 取代，但在 binary classification output neuron 中仍被使用。

**示例：** 具有 sigmoid activation 且加权输入 z = 2 的 hidden neuron 输出 σ(2) ≈ 0.88。

**参见：** Activation Function, ReLU Activation, Sigmoid Function

#### Sigmoid Function

数学函数 σ(z) = 1 / (1 + e^(−z))，将任意实数映射到 (0, 1) 范围内的值，在 logistic regression 中用于将 feature 的线性组合转换为类别概率。

**示例：** logistic regression model 计算 z = w·x + b，并应用 sigmoid function 产生概率 P(y=1|x) = σ(z)，以 0.5 为阈值做出 binary 预测。

**参见：** Logistic Regression, Binary Classification, Sigmoid Activation

#### Similarity Function

量化两个数据点相似程度的函数，通常将点对映射到 [0,1] 或 [−1,1] 范围内的标量，较高的值表示更大的相似性。在 K-NN 和 clustering 中使用。

**示例：** 两个文档向量之间的 cosine similarity 是一个 similarity function，对于完全相同的文档返回 1，对于完全不相关的文档返回 0。

**参见：** Cosine Similarity, Distance Metric, K-Nearest Neighbor

#### Slope

linear regression model 中 independent variable 的系数，表示 independent variable 每增加一个单位时 dependent variable 的变化量。

**示例：** 在模型 price = 3000 × area + 50000 中，slope 3000 意味着每额外增加一平方米面积，预测价格就会相应增加 £3,000。

**参见：** Intercept, Linear Regression, Independent Variable

#### Softmax Function

将实数分值（logit）向量转换为多个类别上的概率分布的函数，其中每个输出在 (0,1) 范围内，所有输出之和为 1。用于多类别分类的 output layer。

**示例：** 对于 logit [2.0, 1.0, 0.5]，softmax function 产生大约 [0.60, 0.24, 0.16] 的概率，总和为 1，给出每个类别的概率。

**参见：** Multiple Classification, Cross Entropy Loss, Output Layer

#### Squared Loss

单个训练样本的 loss，计算为预测值与真实值之差的平方：L = (ŷ − y)²。对所有样本取平均即得到 mean squared error。

**示例：** 对于预测值为 5、真实值为 3 的情况，squared loss 为 (5−3)² = 4。

**参见：** Mean Squared Error, Loss Function, Linear Regression

#### Stochastic Gradient Descent

gradient descent 的一种变体，在每一步使用单个随机选取的训练样本计算的梯度来更新模型参数，产生有噪声但快速的更新。

**示例：** 对于 10,000 个训练样本，stochastic gradient descent 每个 epoch 进行 10,000 次参数更新，每次处理一个样本，而 batch gradient descent 只进行一次更新。更新中的噪声有助于逃离浅层局部最小值。

**参见：** Gradient Descent, Batch Gradient Descent, Mini-batch Gradient Descent

#### Stride

convolutional filter 每步在输入上移动的像素数，控制输出 feature map 的空间分辨率。较大的 stride 产生更小的输出。

**示例：** 在 6×6 的输入上使用 3×3 的 filter 进行 stride 为 2 的卷积，每步移动 2 个像素，产生 2×2 的输出，而非 stride 为 1 时的 4×4 输出。

**参见：** Convolution Operation, Filter, Feature Map, Padding

#### Sum of Squares Error

每个观测值与对应预测值之差的平方和，等于 N × MSE。衡量 regression model 中总未解释变差的度量。

**示例：** 三个样本的 residual 为 [1, −2, 3]，SSE = 1² + (−2)² + 3² = 1 + 4 + 9 = 14。

**参见：** Mean Squared Error, Residual, Regression

#### Sum of Squares Regression

每个预测值与 dependent variable 总体均值之差的平方和，衡量 regression model 所解释的目标变量的变差量。

**示例：** 如果目标均值为 5，模型的预测为 [6, 4, 7]，则 SSR = (6−5)² + (4−5)² + (7−5)² = 1 + 1 + 4 = 6。

**参见：** R-Squared, Sum of Squares Total, Regression

#### Sum of Squares Total

每个观测值与 dependent variable 总体均值之差的平方和，衡量目标变量中的总变差。SST = SSR + SSE。

**示例：** 如果观测值为 [6, 3, 8]，均值为 5.67，则 SST = (6−5.67)² + (3−5.67)² + (8−5.67)² ≈ 13.33。

**参见：** Sum of Squares Error, Sum of Squares Regression, R-Squared

#### Supervised Learning

一种 machine learning 范式，model 在有标注样本（输入-输出对）上进行训练，学习从输入到输出的映射，并能推广到新的、未见过的输入。

Supervised learning 是 H63AIS 研究的主要范式，涵盖 linear regression、logistic regression、K-NN 以及课程涉及的所有 neural network architecture。

**示例：** 在数千张有标注 MRI 扫描（每张标记为肿瘤或健康）上训练的 supervised learning model，通过识别与每个标签相关的模式来学会分类新的扫描图。

**参见：** Machine Learning, Unsupervised Learning, Labelled Data

#### Synthetic Data

人工生成的、模拟真实数据统计特性的数据，通过算法创建，用于补充稀缺的真实 dataset，或生成实践中难以观测到的场景的训练样本。

**示例：** 生成具有真实年龄、诊断和治疗分布的合成患者记录，可以在不泄露患者隐私的情况下补充小型真实医疗 dataset，提高模型的鲁棒性。

**参见：** Data Augmentation, Dataset, Data Acquisition

#### Tabular Data

以行列形式组织的数据，其中每行代表一个样本，每列代表一个 feature 或标签，是经典 machine learning dataset 最常见的格式。

**示例：** 一个包含年龄、性别、学习时间和考试成绩列的学生记录电子表格是 tabular dataset，适合用于 linear regression 或 K-NN classifier。

**参见：** Feature, Dataset, Feature Vector

#### Tanh Activation

双曲正切 activation function，将输入映射到 (−1, 1) 范围。在早期网络的 hidden layer 中优先于 sigmoid，因为其输出以零为中心，但在现代深层网络中已基本被 ReLU 取代。

**示例：** 具有 tanh activation 且输入 z = 1.0 的 hidden neuron 输出 tanh(1.0) ≈ 0.76。对于负数输入，tanh 返回负值，这与 sigmoid 不同。

**参见：** Activation Function, Sigmoid Activation, ReLU Activation

#### Test Set

从 training 和 validation 中保留的 dataset 部分，在所有建模决策做出后，专门用于对已训练模型的 generalization 性能进行最终、无偏的评估。

Test set 决不能在训练或 hyperparameter 选择过程中使用；在开发过程中使用它会引入数据泄漏，产生过于乐观的性能估计。

**示例：** 使用 training set 和 validation set 训练并调优 neural network 后，在保留的 test set 上对模型进行一次评估，以报告其最终的 generalization accuracy。

**参见：** Training Set, Validation Set, Data Splitting, Generalization

#### Training Error

在拟合模型后在 training data 上测量的 loss function（或等效指标）值，反映了模型学习预测自身训练样本的程度。

**示例：** 一个 training error 为 0.1% 但 test error 为 40% 的模型严重 overfit——它记住了训练样本，但没有 generalize 到新数据。

**参见：** Validation Error, Overfitting, Loss Function

#### Training Loop

在许多 epoch 中反复采样 mini-batch、计算 forward pass、计算 loss、执行 backpropagation 并更新参数的迭代过程，直到模型 converge。

**示例：** 典型的 PyTorch training loop 在每个 epoch 的 mini-batch 上迭代：用 model 计算预测，计算 cross entropy loss，调用 `loss.backward()`，并用 `optimizer.step()` 更新 weight。

**参见：** Epoch, Mini-batch Gradient Descent, Backpropagation, Forward Pass

#### Training Set

训练过程中用于拟合模型参数的数据子集。model 反复看到这些样本及其标签，以学习底层模式。

**示例：** 在包含 10,000 张有标注图像的 dataset 中，7,000 张被指定为 training set，CNN 通过多个 epoch 的 gradient descent 从中学习对图像内容进行分类。

**参见：** Validation Set, Test Set, Data Splitting, Supervised Learning

#### True Negative

model 对实际属于负类的样本正确预测为负类的结果。

**示例：** 垃圾邮件过滤器正确地将一封正常邮件识别为非垃圾邮件，产生了一个 true negative。

**参见：** Confusion Matrix, True Positive, False Positive

#### True Positive

model 对实际属于正类的样本正确预测为正类的结果。

**示例：** 癌症检测模型正确地将恶性肿瘤分类为恶性，产生了一个 true positive。

**参见：** Confusion Matrix, True Negative, Recall

#### Turing Test

Alan Turing 于 1950 年提出的机器智能行为标准：如果一台机器在基于文本的对话中的回应与人类无法区分，则认为该机器具有智能。

Turing Test 在 H63AIS 中作为 AI 历史上的哲学基准被介绍，为"机器能否思考"这一问题提供了背景，尽管现代 AI 研究更关注特定任务的性能，而非通过此测试。

**示例：** 在 Turing Test 中，评估者与一个人类和一台机器交换文字信息；如果评估者无法可靠地判断哪个是人类，则机器通过了测试。

**参见：** AI History, Artificial Intelligence, Dartmouth Conference

#### Underfitting

一种建模失败，model 太简单，无法捕捉数据中的底层模式，导致在 training set 和 test set 上的误差都很高。

**示例：** 将一条直线拟合到遵循 U 形曲线的数据，产生了一个 underfitting model——无论 training data 的大小如何，linear model 都无法捕捉曲率。

**参见：** Overfitting, Bias-Variance Tradeoff, Model Complexity

#### Unsupervised Learning

一种 machine learning 范式，model 在没有标签的数据上训练，任务是发现底层结构，例如 cluster、分布或压缩表示。

Unsupervised learning 在 H63AIS 中通过 K-means clustering 和 principal component analysis 被介绍，展示了在没有人工标注的情况下从数据中提取有用模式的可能性。

**示例：** 对客户购买历史（没有任何预定义类别）应用 K-means clustering，可发现自然的客户群体，为定向营销策略提供参考。

**参见：** K-Means Clustering, Principal Component Analysis, Supervised Learning

#### Validation Error

在 validation set 上测量的 loss function 值，在训练过程中用于监控 generalization 能力，并为 hyperparameter、regularization 和 early stopping 的决策提供依据。

**示例：** 绘制各 epoch 的 training error 和 validation error，可以检测 overfitting：当 validation error 开始上升而 training error 继续下降时，模型开始 overfit。

**参见：** Training Error, Validation Set, Overfitting, Early Stopping

#### Validation Set

从 training 中保留的数据子集，用于在开发过程中评估模型性能，在不污染 test set 的情况下指导 hyperparameter 值和模型架构的决策。

**示例：** 在为 K-NN 进行 K value selection 期间，对每个候选 K 在 validation set 上评估模型，并在最终 test set 评估前选择 validation error 最低的 K。

**参见：** Training Set, Test Set, Cross-validation, Hyperparameter Tuning

#### Weight

neural network 中一个可学习的标量参数，对从一个 neuron 到下一个 neuron 的输入进行缩放，决定连接的强度和方向。Weight 在训练过程中通过 backpropagation 和 gradient descent 调整。

**示例：** 从像素输入到 hidden neuron 的连接上，+2.5 的 weight 意味着该像素的强度对那个 neuron 的激活有强烈的正向影响。

**参见：** Bias, Neuron, Backpropagation, Weight Update

#### Weight Update

每次 gradient descent 步骤中对模型 weight 的修改，计算公式为：w_new = w_old − learning_rate × (∂Loss/∂w)，使 weight 向降低 loss 的方向移动。

**示例：** 当 learning rate 为 0.01、weight w 的梯度为 0.5 时，weight update 为 w_new = w_old − 0.01 × 0.5 = w_old − 0.005，向更低 loss 迈进一小步。

**参见：** Backpropagation, Gradient Descent, Parameter Update Rule

#### Weighted KNN

K-nearest neighbour 的一种变体，每个邻居对预测的贡献按其与查询点距离的倒数加权，使较近的邻居具有更大的影响力。

**示例：** 在 K = 3 的 weighted K-NN 中，距离为 1 的邻居贡献权重 1，距离为 2 的邻居贡献权重 0.5，使预测对最近的邻居更加敏感。

**参见：** K-Nearest Neighbor, Distance Metric, K Value Selection
