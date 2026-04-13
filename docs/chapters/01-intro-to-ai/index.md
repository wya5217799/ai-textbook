---
title: 人工智能导论
description: 人工智能的基础概念，包括历史、主要子领域和学习范式
generated_by: claude skill chapter-content-generator
date: 2026-04-13 19:48:24
version: 0.05
---

# 人工智能导论

## 概述

本章介绍定义人工智能和机器学习这一领域的基本概念。学生将了解塑造 AI 发展的历史里程碑，从 Turing Test 到 Dartmouth Conference，并理解 machine learning、deep learning、supervised learning、unsupervised learning 和 reinforcement learning 之间的相互关系。学完本章后，学生将能够阐述什么是 AI，描述其主要子领域，并识别三种主要的学习范式。

## 涵盖的概念

本章涵盖学习图谱中的以下 13 个概念：

1. Artificial Intelligence
2. Machine Learning
3. Deep Learning
4. Supervised Learning
5. Unsupervised Learning
6. Reinforcement Learning
7. Turing Test
8. Dartmouth Conference
9. AI History
10. Expert Systems
11. Computer Vision
12. Natural Language Processing
13. Business Intelligence

## 先修要求

本章仅需满足[课程说明](../../course-description.md)中列出的先修条件。

---

## 什么是人工智能？

人工智能（Artificial Intelligence，AI）是计算机科学的一个分支，专注于构建能够执行通常需要人类智能才能完成的任务的系统。这些任务包括识别图像、理解口语、做出决策以及从数据中发现规律。AI 系统不是针对每一种可能的情况编写明确的规则，而是从经验中学习，或者被设计成以灵活的方式对世界进行推理。

AI 的范畴十分广泛。一些 AI 系统是窄域的，即在单一明确的任务上表现出色，例如下棋或检测垃圾邮件。另一些则追求通用智能（general intelligence）——这是一个尚未实现的目标，即机器能够处理人类可以完成的任何智力任务。在本课程中，我们关注 AI 的实践层面：利用数据解决真实工程问题的算法和技术。

AI 几乎渗透到现代工程和科学的每个领域。从自动驾驶汽车到医疗诊断，从金融预测到工业质量控制，构建能从数据中学习的系统，已成为电气与电子工程师的核心能力。

#### 图示：AI 全景概览

<iframe src="../../sims/ai-landscape-overview/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI Landscape Overview</summary>
Type: infographic
**sim-id:** ai-landscape-overview<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify
Learning Objective: Classify the major subfields and application areas of artificial intelligence and understand how they relate to each other.

Purpose: Present an interactive hierarchical map showing AI at the center with branches to its major subfields (Machine Learning, Computer Vision, Natural Language Processing, Robotics, Expert Systems, Business Intelligence). Each subfield node expands on hover to reveal a short definition and example application.

Layout: Central node labeled "Artificial Intelligence" with radial branches to six subfield nodes arranged evenly around it.

Interactive elements:
- Hover over any subfield node to see a tooltip with definition and one real-world example
- Click a subfield node to highlight its connections and dim unrelated nodes
- Machine Learning node has sub-branches to Supervised, Unsupervised, and Reinforcement Learning

Visual style: Clean circular nodes with connecting lines, soft blue palette for AI core, green for ML branch, orange for vision, purple for NLP, gray for expert systems, teal for business intelligence.

Instructional Rationale: An interactive concept map supports the Understand/classify objective by letting students explore relationships between AI subfields at their own pace, reinforcing the hierarchical taxonomy presented in the text.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js canvas with mouse interaction handlers
</details>

## 人工智能简史

了解 AI 的发展历程，有助于我们认识为何某些方法在今天占据主导地位，以及该领域未来的走向。AI 的历史以快速发展和激情迸发的时期为标志，之后往往伴随着早期承诺无法兑现时的失望。

### Turing Test（图灵测试）

1950 年，英国数学家 Alan Turing 发表了题为《Computing Machinery and Intelligence》的里程碑式论文，提出了如今所称的 **Turing Test**（图灵测试）。Turing 没有追问"机器能思考吗？"——他认为这个问题过于模糊——而是提出了一个模仿游戏。一名人类提问者通过文字与两位隐藏的应答者交流：一位是人类，另一位是机器。如果提问者无法可靠地区分机器与人类，则称该机器表现出了智能行为。

Turing Test 之所以持续产生影响，并非因为它是衡量智能的完美标准，而是因为它将讨论从哲学思辨转向了经验验证，为研究人员提供了一个具体的（尽管并不完美的）目标基准。

### Dartmouth Conference（达特茅斯会议）

"Artificial Intelligence"这一术语正式诞生于 1956 年夏季的 **Dartmouth Conference**。由 John McCarthy、Marvin Minsky、Nathaniel Rochester 和 Claude Shannon 组织的这次研讨会在新罕布什尔州达特茅斯学院举行，与会研究人员相信"学习的每个方面以及智能的任何其他特征，原则上都可以被精确描述，从而让机器加以模拟"。

Dartmouth Conference 意义重大，因为它将 AI 确立为一门独立的学术学科。尽管许多参与者关于在一代人的时间内实现人类级别 AI 的预测被证明过于乐观，但他们的热情奠定了此后数十年的研究议程。

### AI 历史：从繁荣到寒冬

达特茅斯会议之后的数十年里，AI 经历了兴奋与失望交替出现的周期：

| 时代 | 时期 | 主要发展 |
|-----|--------|-----------------|
| 早期 AI | 1956--1974 | 符号推理、定理证明器、早期 NLP 程序（如 ELIZA） |
| 第一次 AI 寒冬 | 1974--1980 | 因未能兑现宏大承诺而遭到资金削减 |
| Expert Systems 繁荣 | 1980--1987 | 基于规则的系统在工业界用于诊断和规划 |
| 第二次 AI 寒冬 | 1987--1993 | Expert systems 被证明脆弱且维护成本高昂 |
| 统计 ML 崛起 | 1993--2010 | Support vector machines、集成方法、贝叶斯方法 |
| Deep Learning 时代 | 2010--至今 | 神经网络在视觉、语言和游戏领域取得突破 |

这一周期性规律揭示了一个重要规律：AI 的进步依赖三个因素的协同——更好的算法、更多的数据和更强的计算能力。任何一个因素的缺失都会导致进展停滞。

#### 图示：AI 历史时间线

<iframe src="../../sims/ai-history-timeline/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI History Timeline</summary>
Type: timeline
**sim-id:** ai-history-timeline<br/>
**Library:** vis-timeline<br/>
**Status:** Specified

Bloom Taxonomy: Remember (L1)
Bloom Verb: recall
Learning Objective: Recall the major milestones and periods in the history of artificial intelligence from 1950 to the present day.

Purpose: Present a horizontal interactive timeline of major AI milestones from 1950 to 2025, allowing students to explore each event for details.

Time period: 1950--2025

Events:
- 1950: Turing publishes "Computing Machinery and Intelligence"
- 1956: Dartmouth Conference coins "Artificial Intelligence"
- 1966: ELIZA chatbot created at MIT
- 1974--1980: First AI Winter (funding cuts, over-promise)
- 1980: Expert systems gain commercial traction
- 1987--1993: Second AI Winter (expert systems fail to scale)
- 1997: IBM Deep Blue defeats world chess champion Garry Kasparov
- 2006: Geoffrey Hinton publishes deep belief network paper, sparking deep learning revival
- 2012: AlexNet wins ImageNet competition by large margin
- 2016: AlphaGo defeats world Go champion Lee Sedol
- 2020: GPT-3 demonstrates large language model capabilities
- 2022: ChatGPT brings AI to mainstream public awareness

Color coding:
- Blue: Foundational events (1950--1956)
- Red: AI Winters (1974--1980, 1987--1993)
- Green: Expert Systems era (1980--1987)
- Gold: Modern ML and Deep Learning breakthroughs (1997--present)

Interactive features:
- Hover over each event to see a 2-3 sentence description
- Click an event to expand a detail panel with key figures and impact
- Zoom and pan along the timeline

The visual elements must have a responsive design that must respond to window resize events.

Implementation: vis-timeline JavaScript library
</details>

## Expert Systems（专家系统）

**Expert systems**（专家系统）是最早商业化成功的 AI 应用之一。这些系统主要在 1980 年代开发，将人类专家知识编码为一系列 if-then 规则，并使用推理引擎对新情况进行推断。例如，MYCIN 是一个用于诊断细菌感染并推荐抗生素的 expert system；XCON（又名 R1）用于为 Digital Equipment Corporation 配置计算机订单。

expert system 的关键组成部分包括：

- **知识库（knowledge base）**：包含领域特定的规则和事实
- **推理引擎（inference engine）**：对知识库应用逻辑推理
- **用户界面（user interface）**：允许非专家查询系统
- **解释设施（explanation facility）**：能够为其建议提供说明

Expert systems 证明了 AI 在受限领域内能够创造真实价值，但也暴露了根本性的局限。规则必须由知识工程师与领域专家合作手工制定，这一过程缓慢、昂贵且脆弱。当情况超出预定义规则的范围时，expert systems 会以难以恢复的方式失败。这种脆弱性是第二次 AI 寒冬的重要推手。

Expert systems 的局限性推动了向 machine learning 方法的转变——让系统直接从数据中学习规律，而非依赖手工制定的规则。

## Machine Learning：从数据中学习

**Machine learning**（ML，机器学习）是 AI 的子领域，其中系统通过经验提升在任务上的表现，而无需为每种场景显式编程。工程师不再编写规则，而是提供数据和学习算法；算法自动发现数据中的规律和关系。

Tom Mitchell 被广泛引用的定义精准地概括了这一点："如果一个计算机程序在任务 T 上的性能（以性能度量 P 衡量）随着经验 E 的增加而提升，则称该程序从经验 E 中学习了关于任务 T 的内容。"

Machine learning 是本课程的核心。我们学习的几乎所有技术——从线性回归到卷积神经网络——都是 machine learning 方法。ML 的力量在于其通用性：同一算法框架只需更换数据，便可应用于图像识别、语音处理、金融预测等众多领域。

AI 与 ML 的关系是包含关系：所有 machine learning 都是 artificial intelligence，但并非所有 AI 都是 machine learning。例如，基于规则的 expert systems 属于 AI，但不属于 ML。

## 三种学习范式

Machine learning 算法根据训练过程中算法接收到的反馈类型，大致分为三种范式。理解这些范式至关重要，因为它们决定了算法能够解决哪类问题，以及需要何种类型的数据。

#### 图示：学习范式比较

<iframe src="../../sims/learning-paradigms-comparison/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Learning Paradigms Comparison</summary>
Type: microsim
**sim-id:** learning-paradigms-comparison<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: compare
Learning Objective: Compare the three primary machine learning paradigms (supervised, unsupervised, reinforcement) by examining how each uses data differently.

Purpose: Interactive step-through that shows a concrete example for each learning paradigm, illustrating the difference in data, feedback, and output.

Data Visibility Requirements:
Stage 1: Show a dataset of labeled images (cat/dog) with input-output pairs visible. Title: "Supervised Learning." Explanation: The algorithm sees both the input (image) and the correct answer (label).
Stage 2: Show a dataset of unlabeled customer records with feature columns visible. Title: "Unsupervised Learning." Explanation: The algorithm sees only inputs and must discover structure (clusters) on its own.
Stage 3: Show an agent in a grid environment receiving +1 or -1 rewards. Title: "Reinforcement Learning." Explanation: The algorithm learns by taking actions and receiving reward signals.

Interactive controls:
- "Next" and "Previous" buttons to step through the three paradigms
- At each stage, a short quiz question appears: "What type of feedback does this paradigm use?" with multiple choice

Instructional Rationale: Step-through with concrete examples and prediction prompts supports the Understand/compare objective by forcing students to articulate the distinction between paradigms before seeing the answer.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with staged rendering and button controls
</details>

### Supervised Learning（监督学习）

**Supervised learning**（监督学习）是算法从带标签的样本中学习的范式。每个训练样本由输入（特征）和正确输出（标签）配对组成。算法的任务是学习从输入到输出的映射，使其能够推广到新的、未见过的样本。

常见的 supervised learning 任务包括：

- **Classification（分类）**：预测离散类别（例如，是否为垃圾邮件）
- **Regression（回归）**：预测连续值（例如，房价）

在本课程中，我们将学习几种 supervised learning 算法：linear regression、logistic regression、K-nearest neighbor、全连接神经网络、convolutional neural networks 和 recurrent neural networks。

### Unsupervised Learning（无监督学习）

**Unsupervised learning**（无监督学习）处理没有标签的数据。算法必须在没有被告知寻找什么的情况下，自行发现数据中的规律、分组或结构。当标注数据代价高昂或不可能时，或者当目标是探索性分析时，这一范式非常有价值。

关键的 unsupervised learning 任务包括：

- **Clustering（聚类）**：将相似的数据点归为一组（例如，客户细分）
- **Dimensionality reduction（降维）**：在保留重要结构的同时将数据压缩到更少的维度（例如，PCA）

本课程后续将以 K-means clustering、DBSCAN 和 principal component analysis 作为 unsupervised learning 的示例进行学习。

### Reinforcement Learning（强化学习）

**Reinforcement learning**（RL，强化学习）是智能体（agent）通过与环境交互来学习的范式。Agent 执行动作，观察环境的结果状态，并接收表示结果好坏的奖励信号。经过大量交互后，agent 学习到一种策略（policy）——即选择动作的方案——以最大化累积奖励。

Reinforcement learning 与 supervised learning 有本质区别：每种情况都没有明确的正确答案。Agent 必须探索不同的动作并从后果中学习。著名的应用包括游戏智能体（AlphaGo、Atari 游戏智能体）、机器人控制和资源调度。

| 范式 | 数据 | 反馈 | 目标 | 课程示例 |
|----------|------|----------|------|----------------|
| Supervised | 带标签（输入-输出对） | 提供正确答案 | 学习输入到输出的映射 | Linear regression, CNN, RNN |
| Unsupervised | 无标签（仅输入） | 无反馈 | 发现隐藏结构 | K-means, PCA |
| Reinforcement | 环境交互 | 奖励信号（延迟） | 最大化累积奖励 | 基于价值的方法、基于策略的方法 |

## Deep Learning：规模化的神经网络

**Deep learning**（深度学习）是 machine learning 的一个子集，使用具有多个层的人工神经网络——因此称为"深度"。虽然神经网络的基本思想可以追溯到 20 世纪 40、50 年代，但 deep learning 在 2010 年后才取得变革性成果，那时三个关键因素汇聚在一起：

1. **大规模数据集**通过互联网变得可用（ImageNet、Wikipedia 等）
2. **GPU** 提供了训练大型网络所需的并行计算能力
3. **算法改进**（如 ReLU 激活函数和 dropout）使训练更深的网络成为可能

Deep learning 模型自动学习数据的层次化表示。以图像识别为例，早期层可能检测边缘，中间层将边缘组合成纹理和形状，更深的层则识别物体。这种自动特征提取正是 deep learning 与需要手工特征工程的经典 ML 方法的区别所在。

在本课程中，我们将学习几种 deep learning 架构：

- **全连接神经网络（Fully connected neural networks）**（第 9 章）
- **卷积神经网络（Convolutional neural networks）**，用于图像数据（第 15 章）
- **循环神经网络和 LSTM（Recurrent neural networks and LSTMs）**，用于序列数据（第 16 章）

## AI 应用领域

人工智能几乎渗透到每一个行业和学科。以下三个应用领域与本课程的工程重点尤为相关。

### Computer Vision（计算机视觉）

**Computer vision**（计算机视觉）是使机器能够解释和理解来自世界的视觉信息（如图像和视频）的领域。计算机视觉的任务包括图像分类（这张图像里有什么？）、目标检测（物体在哪里？）、图像分割（哪些像素属于哪个物体？）以及人脸识别。

Computer vision 与 deep learning 有着深刻的联系：convolutional neural networks 是大多数视觉任务的主力架构。我们将在第 15 章详细学习 CNN。

### Natural Language Processing（自然语言处理）

**Natural language processing**（NLP，自然语言处理）是使机器能够理解、生成并使用人类语言进行交互的领域。NLP 应用包括机器翻译、情感分析、文本摘要、问答系统和对话智能体。

虽然本课程不深入涉及 NLP，但将其作为 AI 的一个主要子领域来了解，有助于建立对更广泛领域的认识。Recurrent neural networks 和 LSTM 是我们在第 16 章学习的内容，它们在被 transformer 模型大量取代之前，曾是 NLP 领域历史上重要的架构。

### Business Intelligence（商业智能）

**Business intelligence**（BI，商业智能）利用 AI 和数据分析来支持组织决策。BI 系统分析业务数据以识别趋势、预测需求、优化运营和检测异常。Machine learning 通过实现预测分析——从"发生了什么"转变为"将会发生什么"——增强了传统 BI。

对于工程专业的学生而言，BI 代表了一个实践应用领域，在这里，本课程所学的 ML 技术可以创造直接的商业价值，例如设备的预测性维护、制造业的质量控制以及供应链优化。

!!! tip "AI 与你的工程职业"
    作为电气与电子工程专业的学生，你将在许多场景中接触到 AI：信号处理、控制系统、嵌入式系统和电信。本课程所学的 ML 基础知识适用于所有这些领域。

## 各概念的关联

本章介绍的概念构成了一个层次体系，将贯穿整个课程：

- **Artificial Intelligence** 是最宽泛的类别，涵盖使机器模拟智能行为的所有技术
- **Machine Learning** 是当今 AI 中的主导方法，专注于从数据中学习
- **Deep Learning** 是 machine learning 的一个强大子集，使用多层神经网络
- **三种学习范式**（supervised、unsupervised、reinforcement）按训练信号类型对 ML 方法进行分类
- **应用领域**（computer vision、NLP、business intelligence）代表这些技术创造价值的领域

#### 图示：AI 概念层次

<iframe src="../../sims/ai-concept-hierarchy/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>AI Concept Hierarchy</summary>
Type: diagram
**sim-id:** ai-concept-hierarchy<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify
Learning Objective: Classify the relationship between AI, ML, deep learning, and the three learning paradigms as a nested hierarchy.

Purpose: Show the nested containment relationship: AI contains ML, ML contains Deep Learning, and ML branches into Supervised, Unsupervised, and Reinforcement Learning.

Components to show:
- Outermost ellipse: "Artificial Intelligence" (includes Expert Systems, Computer Vision, NLP, BI labels around the edge)
- Middle ellipse: "Machine Learning"
- Inner ellipse: "Deep Learning"
- Three branch labels from ML: "Supervised Learning", "Unsupervised Learning", "Reinforcement Learning"
- Small icons or labels for specific algorithms within each branch

Visual style: Nested ellipses (Venn-like) with labeled branches

Color scheme:
- AI outer: light blue
- ML middle: medium blue
- DL inner: dark blue
- Supervised: green
- Unsupervised: orange
- Reinforcement: purple

Interactive features:
- Hover over each region to see a tooltip definition
- Click a region to highlight example algorithms within it

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js
</details>

## 课程路线图

下图展示了本课程各章节之间的依赖关系。每章均以其先修章节的知识为基础，因此章节顺序十分重要。

#### 图示：课程章节依赖关系图

<iframe src="../../sims/course-chapter-dependency-map/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Course Chapter Dependency Map</summary>
Type: graph-model
**sim-id:** course-chapter-dependency-map<br/>
**Library:** vis-network<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: summarize
Learning Objective: Summarize the dependencies between course chapters and identify the learning pathway through the course.

Purpose: Visualize the 16 chapters as nodes in a directed acyclic graph, with edges showing prerequisite relationships.

Node types:
1. Foundation chapters (green circles): Ch 1, Ch 2
2. Data chapters (orange circles): Ch 3, Ch 4
3. Math and core ML chapters (blue circles): Ch 5, Ch 6, Ch 7, Ch 8
4. Neural network chapters (purple circles): Ch 9, Ch 14
5. Classification chapters (teal circles): Ch 10, Ch 11, Ch 12
6. Advanced chapters (red circles): Ch 13, Ch 15, Ch 16

Edge types:
- Solid arrows showing prerequisite dependency

Sample data:
- Ch 1 -> Ch 3, Ch 5, Ch 9, Ch 10, Ch 12, Ch 13, Ch 16
- Ch 2 -> Ch 4, Ch 5
- Ch 3 -> Ch 4, Ch 15, Ch 16
- Ch 4 -> Ch 6, Ch 8, Ch 10, Ch 11, Ch 12, Ch 13, Ch 16
- Ch 5 -> Ch 6, Ch 7, Ch 8, Ch 10, Ch 13, Ch 14
- Ch 6 -> Ch 7, Ch 8, Ch 10
- Ch 7 -> Ch 12, Ch 14, Ch 16
- Ch 8 -> Ch 12, Ch 14
- Ch 9 -> Ch 10, Ch 14, Ch 15, Ch 16
- Ch 10 -> Ch 11, Ch 15
- Ch 11 -> Ch 12, Ch 16
- Ch 12 -> Ch 13

Layout: Hierarchical (top to bottom), reflecting the course progression.

Interactive features:
- Hover a node to see chapter title and concept count
- Click a node to highlight all prerequisites (upstream) and dependent chapters (downstream)
- Zoom and pan

The visual elements must have a responsive design that must respond to window resize events.

Implementation: vis-network JavaScript library
</details>

## 关键要点

本章建立了贯穿全课程的基础词汇和概念框架：

- **Artificial intelligence** 是构建展现智能行为的系统这一广泛领域。**Turing Test**（1950）提供了最早的机器智能具体基准之一。
- **Dartmouth Conference**（1956）正式将 AI 确立为一门研究学科，此后该领域经历了多次乐观与失望的循环。
- **Expert systems** 在 1980 年代展示了 AI 的商业潜力，但由于依赖手工制定的规则而饱受脆弱性困扰。
- **Machine learning** 通过直接从数据中学习规律，克服了基于规则的方法的局限性。
- 三种学习范式——**supervised learning**、**unsupervised learning** 和 **reinforcement learning**——在算法训练期间接收的反馈类型上有所不同。
- **Deep learning** 是 ML 的一个子集，使用多层神经网络，并推动了近年来大多数 AI 突破。
- AI 应用领域，包括 **computer vision**、**natural language processing** 和 **business intelligence**，代表了这些技术解决现实问题的领域。

??? question "自测：你能回答这些问题吗？"
    1. Turing Test 与简单地询问"机器能思考吗？"之间的关键区别是什么？
    2. Expert systems 为何失去青睐，什么方法取代了它？
    3. 说出 supervised learning 和 reinforcement learning 之间的一个关键区别。
    4. 大约从 2010 年开始的 deep learning 革命是由哪三个因素推动的？


[参见注释参考文献](./references.md)
