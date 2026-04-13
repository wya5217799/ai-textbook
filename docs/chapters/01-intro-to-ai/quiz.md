# 测验：人工智能简介

通过以下题目测试你对人工智能基础知识、历史和学习范式的理解。

---

#### 1. Alan Turing 在1950年提出的"imitation game"的主要目的是什么？

<div class="upper-alpha" markdown>
1. 设计第一台电子计算机
2. 通过对话为机器智能提供一种实证测试方法
3. 证明机器永远无法思考
4. 建立第一个 AI 研究实验室
</div>

??? question "显示答案"
    正确答案是 **B**。Turing Test（imitation game）提出了一种实用的行为基准：如果人类审讯者无法可靠地区分机器的文本回复与人类的回复，则该机器表现出智能行为。Turing 用这一具体的实证测试取代了"机器能思考吗？"这一无从回答的哲学问题。

    **考察概念：** Turing Test

---

#### 2. "Artificial Intelligence"一词正式出现于哪一事件？

<div class="upper-alpha" markdown>
1. Turing 1950年论文的发表
2. 1959年 MIT AI 实验室的成立
3. 1956年的 Dartmouth Conference
4. 1969年第一届国际 AI 联合会议
</div>

??? question "显示答案"
    正确答案是 **C**。由 John McCarthy、Marvin Minsky、Nathaniel Rochester 和 Claude Shannon 组织的 Dartmouth Conference 在1956年夏天将 AI 确立为一门独立的学术学科，并正式创造了"Artificial Intelligence"这一术语。

    **考察概念：** Dartmouth Conference

---

#### 3. 以下哪项最准确地描述了 Machine Learning 与 Artificial Intelligence 的关系？

<div class="upper-alpha" markdown>
1. Machine learning 和 AI 是偶尔重叠的不相关领域
2. Artificial intelligence 是 machine learning 的子集
3. Machine learning 是 artificial intelligence 的子集
4. Machine learning 在第二次 AI 寒冬之后取代了 artificial intelligence
</div>

??? question "显示答案"
    正确答案是 **C**。Machine learning 是 artificial intelligence 的一个子领域。所有 ML 都是 AI，但并非所有 AI 都是 ML。例如，基于规则的专家系统是不使用 machine learning 的 AI 系统。包含关系为：AI 包含 ML，ML 进一步包含 deep learning。

    **考察概念：** Machine Learning、Artificial Intelligence

---

#### 4. Supervised learning 的定义特征是什么？

<div class="upper-alpha" markdown>
1. 算法在每次行动后接收奖励信号
2. 算法在带标签的输入-输出对上进行训练
3. 算法在没有任何反馈的情况下发现数据结构
4. 算法需要人工构建的规则库
</div>

??? question "显示答案"
    正确答案是 **B**。Supervised learning 使用带标签的训练数据，每个输入都与其正确输出配对。算法学习从输入到输出的映射，并能泛化到新样本。这将其与 unsupervised learning（无标签）和 reinforcement learning（奖励信号，而非正确答案）区分开来。

    **考察概念：** Supervised Learning

---

#### 5. 专家系统（expert systems）在1980年代取得初步商业成功后为何逐渐失去青睐？

<div class="upper-alpha" markdown>
1. 它们的计算成本对1980年代的硬件而言过于高昂
2. 它们需要当时尚不可用的带标签数据集
3. 它们人工构建的规则非常脆弱，在预定义场景之外会失效
4. 它们无法连接到数据库
</div>

??? question "显示答案"
    正确答案是 **C**。Expert systems 将领域知识编码为 if-then 规则。当出现超出这些预定义规则的情况时，系统会以不优雅的方式失败。知识工程也既慢又昂贵。这种脆弱性导致了第二次 AI 寒冬，并推动了向 machine learning 的转变——machine learning 从数据中学习，而不是依赖人工构建的规则。

    **考察概念：** Expert Systems、AI 历史

---

#### 6. 在 reinforcement learning 中，agent 用什么来学习策略（policy）？

<div class="upper-alpha" markdown>
1. 由教师提供的带标签输入-输出对
2. 在环境中采取行动后收到的奖励信号（reward signals）
3. 从未标注数据中发现的聚类分配
4. 领域专家人工编码的 if-then 规则
</div>

??? question "显示答案"
    正确答案是 **B**。在 reinforcement learning 中，agent 与环境交互，采取行动，并接收指示结果好坏的奖励信号。经过多次交互，agent 学习到能最大化累积奖励的策略（policy）。与 supervised learning 不同，每种情况都没有明确的正确答案。

    **考察概念：** Reinforcement Learning

---

#### 7. 2010年后，哪三个因素共同促成了 deep learning 革命？

<div class="upper-alpha" markdown>
1. 更快的 CPU、更小的数据集和更简单的算法
2. 大规模数据集、GPU 计算能力和算法改进
3. 云存储、移动设备和开源软件
4. 专家系统规则、互联网连接和更快的硬盘
</div>

??? question "显示答案"
    正确答案是 **B**。Deep learning 的复兴需要三个因素共同发挥作用：(1) 通过互联网获得的大规模数据集（如 ImageNet）；(2) GPU 提供的并行计算能力，用于训练大型网络；(3) 算法改进，如 ReLU 激活函数和 dropout，使训练更深的网络变得实际可行。

    **考察概念：** Deep Learning、AI 历史

---

#### 8. 以下哪项是 unsupervised learning 的例子？

<div class="upper-alpha" markdown>
1. 根据面积和位置预测房价
2. 将电子邮件分类为垃圾邮件或非垃圾邮件
3. 在没有预定义类别的情况下，根据购买行为对客户进行分组
4. 训练游戏智能体以最大化其得分
</div>

??? question "显示答案"
    正确答案是 **C**。Unsupervised learning 对未标注数据进行操作，在没有被告知目标的情况下发现模式或分组。按购买行为对客户进行分群是经典的聚类（clustering）任务。选项 A 是回归（regression，有监督），选项 B 是分类（classification，有监督），选项 D 是 reinforcement learning。

    **考察概念：** Unsupervised Learning

---

#### 9. Convolutional neural networks 在 AI 中的主要应用领域是什么？

<div class="upper-alpha" markdown>
1. 自然语言处理（natural language processing）和机器翻译
2. Computer vision 任务，如图像分类和目标检测
3. 游戏环境中的 reinforcement learning
4. 商业智能和金融预测
</div>

??? question "显示答案"
    正确答案是 **B**。Convolutional neural networks（CNNs）是 computer vision 的主流架构。它们擅长处理视觉信息相关的任务：图像分类（图像中有什么？）、目标检测（目标在哪里？）和图像分割（哪些像素属于哪个目标？）。

    **考察概念：** Computer Vision

---

#### 10. 以下哪种说法正确描述了 narrow AI 与 general AI 的区别？

<div class="upper-alpha" markdown>
1. Narrow AI 使用神经网络；general AI 使用基于规则的系统
2. Narrow AI 擅长某一特定任务；general AI 可以处理人类能完成的任何智力任务
3. Narrow AI 是 machine learning 的子集；general AI 是 deep learning 的子集
4. Narrow AI 需要带标签的数据；general AI 无需任何数据即可学习
</div>

??? question "显示答案"
    正确答案是 **B**。Narrow AI 系统被设计用于单一的、明确定义的任务（如下棋、检测垃圾邮件）。General AI 至今仍是未实现的目标，它能够执行人类可以完成的任何智力任务，无需重新训练即可灵活适应不同领域。

    **考察概念：** Artificial Intelligence

---
