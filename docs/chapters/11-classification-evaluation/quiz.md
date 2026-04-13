# 测验：分类评估指标

通过以下题目测试你对混淆矩阵、精确率、召回率、F1 分数和 ROC 曲线的理解。

---

#### 1. 二元分类器的混淆矩阵（confusion matrix）有四个单元格。哪个单元格表示实际为正类但预测为负类的样本？

<div class="upper-alpha" markdown>
1. 真正例（True Positive，TP）
2. 真负例（True Negative，TN）
3. 假正例（False Positive，FP）
4. 假负例（False Negative，FN）
</div>

??? question "显示答案"
    正确答案是 **D**。假负例（False Negative，FN）发生在真实标签为正类但模型预测为负类时。在医学筛查中，这是一个漏诊病例——被告知健康的患病患者。FN 也称为 II 类错误或"遗漏"。假正例（C）则相反：实际为负类但预测为正类。

    **考察概念：** False Negative、Confusion Matrix

---

#### 2. 垃圾邮件过滤器错误地将合法邮件标记为垃圾邮件。这种错误属于哪种类型？

<div class="upper-alpha" markdown>
1. 真正例（True Positive）— 垃圾邮件被正确识别为垃圾邮件
2. 真负例（True Negative）— 合法邮件被正确放行
3. 假正例（False Positive）— 合法邮件被错误标记为垃圾邮件
4. 假负例（False Negative）— 未被检测到的垃圾邮件
</div>

??? question "显示答案"
    正确答案是 **C**。假正例（False Positive，FP）发生在模型预测为正类（垃圾邮件）但实际标签为负类（合法邮件）时。这也称为 I 类错误或"误报"。在垃圾邮件过滤器的场景中，假正例的代价很高，因为重要邮件被阻止了。

    **考察概念：** False Positive、Confusion Matrix

---

#### 3. 准确率（Accuracy）的定义公式是哪个？

<div class="upper-alpha" markdown>
1. TP / (TP + FP)
2. TP / (TP + FN)
3. (TP + TN) / (TP + TN + FP + FN)
4. 2 × (Precision × Recall) / (Precision + Recall)
</div>

??? question "显示答案"
    正确答案是 **C**。Accuracy = (TP + TN) / Total = 所有预测中正确预测的比例。选项 A 是精确率（Precision），选项 B 是召回率（Recall），选项 D 是 F1 Score。Accuracy 直观，但对于类别不平衡的数据集会产生误导，在这种情况下，一个始终预测多数类的模型也能获得高准确率而不学到任何东西。

    **考察概念：** Accuracy

---

#### 4. 一个医学测试有高召回率（high recall）但低精确率（low precision）。在实践中这意味着什么？

<div class="upper-alpha" markdown>
1. 测试能发现大多数患病患者，但也将许多健康人标记为潜在患者
2. 测试能正确识别大多数健康患者，但遗漏了许多患病患者
3. 测试在预测中既高度准确又高度特异
4. 测试在重复时产生一致的结果，但系统性地出错
</div>

??? question "显示答案"
    正确答案是 **A**。高召回率（high recall）意味着大多数实际正例（患病患者）被正确识别——很少被遗漏。低精确率（low precision）意味着许多预测为正类的样本实际上是负类——许多健康人被标记。这种组合在过于敏感的筛查测试中很典型，这类测试旨在以许多假警报为代价捕获所有真实病例。

    **考察概念：** Recall、Precision

---

#### 5. 精确率（Precision）的正式定义是哪个比率？

<div class="upper-alpha" markdown>
1. TP / (TP + FN) — 真正例占所有实际正例
2. TP / (TP + FP) — 真正例占所有预测为正例的样本
3. TN / (TN + FP) — 真负例占所有实际负例
4. (TP + TN) / (TP + TN + FP + FN) — 正确预测占所有预测
</div>

??? question "显示答案"
    正确答案是 **B**。Precision = TP / (TP + FP)。它衡量在模型预测为正类的所有样本中，实际为正类的比例。高精确率意味着当模型说"正类"时，通常是正确的。这在垃圾邮件检测中很重要——高精确率意味着很少有合法邮件被错误地阻止。

    **考察概念：** Precision

---

#### 6. F1 Score 结合了什么，何时比准确率更受青睐？

<div class="upper-alpha" markdown>
1. 训练精度和验证精度；当监测模型 overfitting 时更受青睐
2. 精确率和召回率的调和平均值；当类别不平衡且假正例和假负例都有代价时更受青睐
3. 真正例率和真负例率；当漏检正例的代价等于误报的代价时更受青睐
4. 模型复杂度和泛化误差；当比较不同大小的模型时更受青睐
</div>

??? question "显示答案"
    正确答案是 **B**。F1 Score = 2 × (Precision × Recall) / (Precision + Recall)。作为精确率和召回率的调和平均值，它惩罚两者之间的极端不平衡。当类别不平衡时（如欺诈检测，欺诈案例很少），F1 比准确率更受青睐，因为准确率在一个从不检测欺诈的模型中也会很高。

    **考察概念：** F1 Score

---

#### 7. 分类阈值（classification threshold）在逻辑回归分类器中控制什么？

<div class="upper-alpha" markdown>
1. 梯度下降优化期间应用的学习率
2. 模型预测正类的概率截止值，控制精确率-召回率权衡
3. 训练期间应用以防止 overfitting 的正则化强度
4. 关于在模型输入中包含哪些特征的决策
</div>

??? question "显示答案"
    正确答案是 **B**。分类阈值 t 决定：如果 P(y=1|x) > t，预测为正类；否则预测为负类。降低阈值会提高召回率（减少假负例），但降低精确率（增加假正例）。提高阈值会提高精确率，但降低召回率。ROC 曲线可视化了所有可能阈值下的这种权衡。

    **考察概念：** Classification Threshold

---

#### 8. ROC 曲线绘制哪两个量的关系？

<div class="upper-alpha" markdown>
1. 随阈值变化的精确率与召回率
2. 随阈值变化的真正例率（Recall）与假正例率（False Positive Rate）
3. 训练精度与验证精度随训练 epoch 的变化
4. 模型复杂度与泛化误差
</div>

??? question "显示答案"
    正确答案是 **B**。ROC（Receiver Operating Characteristic，接收者操作特征）曲线以 y 轴表示真正例率（TPR = TP/(TP+FN)，也称召回率或敏感性），以 x 轴表示假正例率（FPR = FP/(FP+TN)），随分类阈值从1变化到0。完美分类器沿左上角延伸；随机分类器沿对角线延伸。

    **考察概念：** ROC Curve

---

#### 9. 一个分类器的 AUC = 0.5。这表明其性能如何？

<div class="upper-alpha" markdown>
1. 分类器达到50%准确率，对于类别平衡的二元任务是可以接受的
2. 在所有阈值下，分类器的表现不比随机猜测更好
3. 分类器经过完美校准——其概率输出等于经验频率
4. 分类器达到50%精确率，意味着一半的正类预测是正确的
</div>

??? question "显示答案"
    正确答案是 **B**。AUC（ROC 曲线下面积，Area Under the ROC Curve）范围从0到1。AUC = 0.5 对应于表现不比随机猜测更好的分类器（其 ROC 曲线沿对角线延伸）。AUC = 1.0 是完美分类器。AUC = 0.5 意味着模型对任务没有学到任何有用的信息。

    **考察概念：** AUC

---

#### 10. 为什么对于一个只有1%人群患病的疾病筛查测试，仅用准确率作为指标会产生误导？

<div class="upper-alpha" markdown>
1. 准确率要求正负样本数量相等才有意义
2. 一个始终预测"无疾病"的模型能达到99%准确率，而遗漏所有患病患者
3. 当正类比数据集的5%更罕见时，准确率无法计算
4. 高准确率意味着高精确率和高召回率，因此额外的指标是多余的
</div>

??? question "显示答案"
    正确答案是 **B**。在1%疾病患病率下，一个始终预测"无疾病"（从不检测任何人患病）的模型能达到99%准确率——仅仅因为99%的人口是健康的。这个模型完全没有用，但仅从准确率来看似乎表现优秀。召回率（敏感性）将为0%，揭示了该模型未能检测任何真实病例的失败。

    **考察概念：** Accuracy、Evaluation Metric

---
