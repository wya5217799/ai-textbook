---
title: 分类评估指标（Classification Evaluation Metrics）
description: 混淆矩阵、precision、recall、F1 score、ROC 曲线以及 AUC，用于评估分类器
generated_by: claude skill chapter-content-generator
date: 2026-04-13 20:04:51
version: 0.05
---

# 分类评估指标（Classification Evaluation Metrics）

## 概述（Summary）

本章介绍评估分类模型的完整框架。学生将学习如何构建和解读混淆矩阵（confusion matrix），并从其组成部分——true positive（真正例）、true negative（真负例）、false positive（假正例）和 false negative（假负例）——推导关键性能指标，包括 accuracy（准确率）、precision（精确率）、recall（召回率）和 F1 score。本章还涵盖分类阈值（classification threshold）、ROC 曲线（ROC curve）以及 AUC，作为在不同操作点上比较分类器的工具。学完本章后，学生将能够严谨地评估和比较分类模型在实际应用中的表现。

## 涵盖概念（Concepts Covered）

本章涵盖学习图（learning graph）中的以下 13 个概念：

1. Confusion Matrix（混淆矩阵）
2. True Positive（真正例）
3. True Negative（真负例）
4. False Positive（假正例）
5. False Negative（假负例）
6. Accuracy（准确率）
7. Precision（精确率）
8. Recall（召回率）
9. F1 Score
10. Classification Threshold（分类阈值）
11. ROC Curve（ROC 曲线）
12. AUC（曲线下面积）
13. Evaluation Metric（评估指标）

## 前置知识（Prerequisites）

本章建立在以下章节概念的基础上：

- [第 4 章：数据预处理与特征工程](../04-data-preprocessing/index.md)
- [第 10 章：分类与 Logistic Regression](../10-classification-logistic-regression/index.md)

---

## 为什么 Accuracy 还不够（Why Accuracy Is Not Enough）

训练完分类模型后，最自然的第一个问题是："它有多准确？"虽然 accuracy（准确率）——正确预测的百分比——看似是一个显而易见的评估指标，但它可能极具误导性。试想一个针对罕见疾病（发病率为 1%）的医学筛查测试。一个始终预测"无疾病"的模型可以达到 99% 的准确率，但完全没有实用价值。为了正确评估分类器，我们需要一套更丰富的指标体系，从不同角度衡量预测质量。

## 混淆矩阵（The Confusion Matrix）

**Confusion matrix（混淆矩阵）** 是一个通过比较模型预测结果与真实标签来汇总分类模型性能的表格。对于二分类，它是一个 2x2 的矩阵，每个单元格表示一种不同的预测结果类型。

|  | Predicted Positive | Predicted Negative |
|--|-------------------|-------------------|
| **Actual Positive** | True Positive (TP) | False Negative (FN) |
| **Actual Negative** | False Positive (FP) | True Negative (TN) |

### 四种结果（The Four Outcomes）

- **True Positive (TP，真正例)**：模型正确预测了正类。样本实际为正，模型也预测为正。例如：一封垃圾邮件被正确识别为垃圾邮件。

- **True Negative (TN，真负例)**：模型正确预测了负类。样本实际为负，模型也预测为负。例如：一封正常邮件被正确识别为非垃圾邮件。

- **False Positive (FP，假正例)**：模型错误地预测了正类。样本实际为负，但模型预测为正。也称为"Type I error（第一类错误）"或"false alarm（误报）"。例如：一封正常邮件被错误标记为垃圾邮件。

- **False Negative (FN，假负例)**：模型错误地预测了负类。样本实际为正，但模型预测为负。也称为"Type II error（第二类错误）"或"miss（漏报）"。例如：一封垃圾邮件未被过滤器检测到而漏过。

#### 图示：交互式混淆矩阵（Diagram: Interactive Confusion Matrix）

<iframe src="../../sims/interactive-confusion-matrix/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Interactive Confusion Matrix</summary>
Type: microsim
**sim-id:** interactive-confusion-matrix<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Understand (L2)
Bloom Verb: classify
Learning Objective: Classify prediction outcomes into true positives, true negatives, false positives, and false negatives by examining individual predictions against their true labels.

Purpose: Interactive confusion matrix where students can drag individual data points (with known true labels and predictions) into the correct cell of the matrix, then see derived metrics update in real time.

Layout:
- Left panel: A list of 20 sample predictions showing (true label, predicted label) pairs
- Center: 2x2 confusion matrix grid where students drag samples into the correct cell
- Right panel: Computed metrics (accuracy, precision, recall, F1) that update as samples are placed

Interactive elements:
- Drag-and-drop: Move sample cards from the list into confusion matrix cells
- "Auto-Fill" button: Places all samples correctly for reference
- "Check" button: Highlights incorrectly placed samples in red
- Reset button to start over
- Display: All four cell counts and derived metrics

Instructional Rationale: Drag-and-drop classification of individual predictions supports the Understand/classify objective by requiring students to actively determine which cell each prediction belongs to, reinforcing the distinction between the four outcome types.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with drag-and-drop mechanics
</details>

## 从混淆矩阵推导的指标（Metrics Derived from the Confusion Matrix）

### Accuracy（准确率）

**Accuracy（准确率）** 是所有预测中正确预测所占的比例：

#### Accuracy Formula

$\text{Accuracy} = \frac{TP + TN}{TP + TN + FP + FN}$

其中：

- 分子统计所有正确预测的数量
- 分母是预测总数

Accuracy 直观易懂，但在数据集不平衡（imbalanced datasets）时具有误导性。当某个类别远比另一个类别常见时，模型只需始终预测多数类就能获得很高的准确率。

### Precision（精确率）

**Precision（精确率）** 回答的问题是："在模型预测为正类的所有样本中，有多少实际上是正类？"

#### Precision Formula

$\text{Precision} = \frac{TP}{TP + FP}$

其中：

- 分母是正类预测的总数

高 precision 意味着模型很少产生误报（false alarms）。当假正例（false positive）的代价较高时，precision 尤为重要——例如在垃圾邮件过滤中，高 precision 意味着正常邮件很少被误拦截。

### Recall（召回率）

**Recall（召回率）**（也称为 sensitivity 或 true positive rate）回答的问题是："在所有实际为正类的样本中，模型正确识别了多少？"

#### Recall Formula

$\text{Recall} = \frac{TP}{TP + FN}$

其中：

- 分母是实际正类的总数

高 recall 意味着模型很少漏报（miss）正类样本。当假负例（false negative）的代价较高时，recall 尤为重要——例如在疾病筛查中，高 recall 意味着很少有患病患者被漏诊。

### Precision-Recall 权衡（The Precision-Recall Tradeoff）

Precision 和 recall 往往存在相互制约的关系。提高分类阈值（要求更高的置信度才预测为正类）倾向于提高 precision（减少假正例）但降低 recall（增加假负例）。降低阈值则效果相反。

| Scenario | Priority | Why |
|----------|----------|-----|
| Spam filter | Precision | Don't want to block legitimate emails |
| Disease screening | Recall | Don't want to miss sick patients |
| Fraud detection | Balanced | Both false alarms and missed fraud are costly |

### F1 Score

**F1 score** 是 precision 和 recall 的调和平均值（harmonic mean），提供了一个平衡两者的综合指标：

#### F1 Score Formula

$F1 = 2 \times \frac{\text{Precision} \times \text{Recall}}{\text{Precision} + \text{Recall}}$

其中：

- $F1$ 范围从 0（最差）到 1（完美）
- 调和平均会惩罚极端不平衡：若 precision 或 recall 任一极低，则 F1 score 也会很低

F1 score 在不平衡数据集上比较模型时尤其有用，因为此时 accuracy 往往无法提供有效信息。

#### 图示：Precision-Recall-F1 探索器（Diagram: Precision-Recall-F1 Explorer）

<iframe src="../../sims/precision-recall-f1-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>Precision-Recall-F1 Explorer</summary>
Type: microsim
**sim-id:** precision-recall-f1-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Apply (L3)
Bloom Verb: calculate
Learning Objective: Calculate precision, recall, and F1 score from confusion matrix values and observe how changing the counts affects each metric.

Purpose: Interactive confusion matrix editor where students adjust TP, TN, FP, FN values directly and see all derived metrics update in real time.

Interactive controls:
- Four input sliders: TP (0-100), TN (0-100), FP (0-100), FN (0-100), default values (45, 40, 10, 5)
- Display panel: Accuracy, Precision, Recall, F1 Score computed from current values
- Bar chart: Visual comparison of all four metrics side by side
- "Imbalanced Dataset" preset button: Sets values showing high accuracy but low recall
- "Balanced Dataset" preset button: Sets values showing typical balanced performance

Visual elements:
- 2x2 confusion matrix with cell sizes proportional to counts
- Colored cells: Green for TP/TN, red for FP/FN
- Bar chart of metrics with colored bars
- Warning indicator when accuracy is misleading (e.g., accuracy > 90% but F1 < 50%)

Instructional Rationale: Direct manipulation of confusion matrix counts with immediate metric computation supports the Apply/calculate objective by letting students experiment with different outcome distributions and discover when accuracy is misleading versus informative.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with slider inputs and real-time computation
</details>

## 分类阈值（Classification Threshold）

**Classification threshold（分类阈值）** 是将模型预测概率转化为离散类别标签的概率截止值。对于阈值为 0.5 的 logistic regression：

- 若 $\hat{y} > 0.5$，预测为类别 1
- 若 $\hat{y} \leq 0.5$，预测为类别 0

阈值的选择直接决定了混淆矩阵，进而影响所有派生指标。降低阈值使模型更容易预测为正类（增加 TP 和 FP，从而提高 recall，但可能降低 precision）。提高阈值使模型更保守（减少 TP 和 FP，从而提高 precision，但可能降低 recall）。

不存在普遍最优的阈值；最佳选择取决于具体应用中假正例和假负例的相对代价。

## ROC 曲线（ROC Curve）

**ROC curve（ROC 曲线，Receiver Operating Characteristic curve）** 是评估二元分类器在所有可能分类阈值下表现的图形工具。它在阈值从 1（最保守）变化到 0（最激进）的过程中，绘制 True Positive Rate（TPR，即 recall）与 False Positive Rate（FPR）之间的关系曲线。

#### ROC 曲线坐标轴（ROC Curve Axes）

$TPR = \frac{TP}{TP + FN} \quad\quad FPR = \frac{FP}{FP + TN}$

其中：

- $TPR$ 是真正例率（true positive rate，即 recall）
- $FPR$ 是假正例率（false positive rate）

ROC 曲线的关键特性：

- 完美分类器的 ROC 曲线经过左上角（TPR = 1，FPR = 0）
- 随机分类器（抛硬币）产生从 (0, 0) 到 (1, 1) 的对角线
- ROC 曲线位于对角线上方的模型表现优于随机猜测
- ROC 曲线位于对角线下方的模型表现劣于随机猜测（其预测结果被反转）

#### 图示：ROC 曲线与阈值探索器（Diagram: ROC Curve and Threshold Explorer）

<iframe src="../../sims/roc-curve-threshold-explorer/main.html" width="100%" height="500px" scrolling="no"></iframe>

<details markdown="1">
<summary>ROC Curve and Threshold Explorer</summary>
Type: microsim
**sim-id:** roc-curve-threshold-explorer<br/>
**Library:** p5.js<br/>
**Status:** Specified

Bloom Taxonomy: Analyze (L4)
Bloom Verb: examine
Learning Objective: Examine how varying the classification threshold traces out the ROC curve and how different thresholds produce different precision-recall tradeoffs.

Purpose: Interactive visualization linking a threshold slider to both a probability distribution view and a ROC curve. Students see how moving the threshold changes the confusion matrix, the position on the ROC curve, and the derived metrics.

Layout:
- Left panel: Two overlapping probability distributions (class 0 in blue, class 1 in red) with a movable vertical threshold line
- Right panel: ROC curve with a dot indicating the current operating point
- Bottom panel: Confusion matrix and metric values at the current threshold

Interactive controls:
- Slider: Classification threshold (0.0 to 1.0, default 0.5)
- Display: Current TPR, FPR, Precision, Recall, F1 at the current threshold
- "Animate" button: Sweep the threshold from 0 to 1 and trace the ROC curve
- Toggle: Show/hide the random classifier diagonal

Visual elements:
- Overlapping bell curves with shaded TP, TN, FP, FN regions
- ROC curve with AUC shaded underneath
- Moving dot on the ROC curve synchronized with the threshold slider
- Confusion matrix that updates in real time

Instructional Rationale: Linked visualization of threshold, distributions, and ROC curve supports the Analyze/examine objective by showing the complete causal chain: threshold position determines which predictions change class, which determines the confusion matrix, which determines the operating point on the ROC curve.

The visual elements must have a responsive design that must respond to window resize events.

Implementation: p5.js with linked multi-panel visualization
</details>

## AUC：ROC 曲线下面积（AUC: Area Under the ROC Curve）

**AUC（Area Under the Curve，曲线下面积）** 是 ROC 曲线的单数值汇总。它表示：随机选取一个正类样本，其预测概率高于随机选取的一个负类样本的概率。

| AUC Value | Interpretation |
|-----------|---------------|
| 1.0 | Perfect classifier |
| 0.9 -- 1.0 | Excellent |
| 0.8 -- 0.9 | Good |
| 0.7 -- 0.8 | Moderate |
| 0.5 | Random (no discrimination) |
| < 0.5 | Worse than random |

AUC 的优势：

- **与阈值无关（Threshold-independent）**：同时评估模型在所有可能阈值下的表现
- **应对不平衡（Handles imbalance）**：相比 accuracy，对不平衡数据集更具鲁棒性
- **可比较（Comparable）**：便于在同一数据集上比较不同模型

AUC 的局限性：

- 不能告诉你实践中应使用哪个阈值
- 当 ROC 曲线的不同部分具有不同重要性时（例如只有低 FPR 区域重要），AUC 可能产生误导

## 选择正确的评估指标（Choosing the Right Evaluation Metric）

没有哪个单一指标是普遍最优的，选择取决于具体的应用场景：

| Application | Primary Metric | Reason |
|-------------|---------------|--------|
| Medical screening | Recall | Missing a disease is dangerous |
| Spam filtering | Precision | Blocking good email is annoying |
| Balanced classification | F1 Score | Balances precision and recall |
| Model comparison | AUC | Threshold-independent comparison |
| Simple reporting | Accuracy | Easy to understand (if classes balanced) |

**Evaluation metric（评估指标）** 这一术语泛指用于评估模型性能的任何定量度量。本章中的各项指标构成了一个工具箱，熟练的实践者会根据具体应用的代价结构和优先级来选择最合适的指标。

!!! tip "始终报告多个指标（Always Report Multiple Metrics）"
    在实际应用中，至少应报告混淆矩阵、precision、recall、F1 和 AUC。单一指标可能隐藏重要信息。例如，一个模型可能有很高的 AUC，但在你实际需要使用的阈值处 precision 很差。

## 关键要点（Key Takeaways）

本章提供了评估分类模型的完整工具箱：

- **Confusion matrix（混淆矩阵）** 将预测分为四类：**true positive（真正例）**、**true negative（真负例）**、**false positive（假正例）** 和 **false negative（假负例）**。
- **Accuracy（准确率）** 衡量整体正确率，但在数据集不平衡时具有误导性。
- **Precision（精确率）** 衡量正类预测的可靠性；**recall（召回率）** 衡量正类检测的完整性。二者通过 **classification threshold（分类阈值）** 相互制约。
- **F1 score** 使用调和平均值平衡 precision 和 recall。
- **ROC curve（ROC 曲线）** 通过绘制 TPR vs. FPR 来可视化分类器在所有阈值下的性能。**AUC** 将 ROC 曲线汇总为单一数值。
- 正确的 **evaluation metric（评估指标）** 取决于应用的代价结构：当漏报代价高时优先考虑 recall，当误报代价高时优先考虑 precision，需要综合比较时使用 F1 或 AUC。

??? question "自测：你能回答这些问题吗？（Self-Check: Can you answer these questions?）"
    1. 某模型的 TP=80，TN=900，FP=10，FN=10。计算 accuracy、precision、recall 和 F1。
    2. 为什么降低 classification threshold 会提高 recall？
    3. 若模型 A 的 AUC 为 0.92，模型 B 的 AUC 为 0.85，哪个更好？需要注意什么？
    4. 在针对致命疾病的医学测试中，你会优化 precision 还是 recall？为什么？
    5. ROC 曲线接近对角线意味着什么？


[See Annotated References](./references.md)
