# 学习图谱质量指标报告

## 总览

- **概念总数**：200
- **基础概念**（无前置依赖，其他概念依赖它们）：6
- **终端节点**（有前置依赖，但没有其他概念依赖它们）：82
- **孤立节点**（完全断开，无任何边）：0
- **有依赖关系的概念**：194
- **每个概念的平均依赖数**：1.52

## 图结构验证

- **有效 DAG 结构**：✅ 是
- **自依赖**：未检测到 ✅
- **循环检测**：0

## 基础概念

以下概念没有任何前置依赖：

- **1**: Artificial Intelligence
- **14**: Python Programming
- **91**: Probability Distribution
- **154**: Weight
- **155**: Bias
- **166**: Chain Rule

## 依赖链分析

- **最大依赖链长度**：14

### 最长学习路径：

1. **Artificial Intelligence**（ID: 1）
2. **Machine Learning**（ID: 2）
3. **Supervised Learning**（ID: 4）
4. **Label**（ID: 46）
5. **Binary Classification**（ID: 106）
6. **Confusion Matrix**（ID: 115）
7. **True Positive**（ID: 116）
8. **Precision**（ID: 121）
9. **Classification Threshold**（ID: 114）
10. **ROC Curve**（ID: 124）
11. **AUC**（ID: 125）
12. **Evaluation Metric**（ID: 126）
13. **ML Workflow**（ID: 197）
14. **Model Deployment**（ID: 196）

## 终端节点分析

终端节点是没有其他概念依赖、但自身有前置依赖的概念。它们代表学习路径的自然终点——收尾性或专业性概念。

- **终端节点总数**：82（占所有概念的 41.0%）
- **健康范围**：占总概念数的 5–40%

学习路径终点概念举例：

- **3**: Deep Learning
- **6**: Reinforcement Learning
- **10**: Expert Systems
- **11**: Computer Vision
- **12**: Natural Language Processing
- **13**: Business Intelligence
- **15**: Jupyter Notebook
- **19**: PyTorch
- **20**: Scikit-learn
- **22**: Data Annotation
- **28**: MNIST Dataset
- **29**: ImageNet Dataset
- **31**: Data Augmentation
- **32**: Data Integration
- **33**: Exploratory Data Analysis
- **35**: Outlier Detection
- **36**: Rule-based Detection
- **37**: Pattern-based Detection
- **38**: Missing Values
- **40**: Feature Selection

*……以及另外 62 个概念*

## 孤立节点分析

孤立节点是完全断开、既无入边也无出边的概念。这类节点表明存在质量问题——每个概念都应与图谱相连。

- **孤立节点总数**：0

✅ 未检测到孤立节点，所有概念均已连入图谱。

## 连通分量

- **连通分量数量**：1

✅ 所有概念连接在单一图谱中。

## 入度分析

以下是作为最多其他概念前置依赖的 Top 10 概念：

| 排名 | 概念 ID | 概念名称 | 入度 |
|------|---------|----------|------|
| 1 | 60 | Loss Function | 12 |
| 2 | 2 | Machine Learning | 8 |
| 3 | 52 | Linear Regression | 8 |
| 4 | 79 | Gradient Descent | 8 |
| 5 | 1 | Artificial Intelligence | 7 |
| 6 | 21 | Data Acquisition | 7 |
| 7 | 26 | Dataset | 7 |
| 8 | 80 | Learning Rate | 7 |
| 9 | 14 | Python Programming | 6 |
| 10 | 93 | Overfitting | 6 |

## 出度分布

| 依赖数量 | 概念数 |
|----------|--------|
| 0 | 6 |
| 1 | 116 |
| 2 | 59 |
| 3 | 17 |
| 4 | 1 |
| 5 | 1 |

## 建议

- ℹ️ **终端节点比例偏高**（41.0%）：建议考虑部分终端概念是否应作为进阶概念的前置依赖
- ✅ **DAG 结构已验证**：图谱支持有效的学习路径推进

---

*本报告由 learning-graph-reports/analyze_graph.py 生成*

## 关系类型分布

- **有类型关系总数**：41

| 类型 | 数量 |
|------|------|
| contrasts_with（对比关系）| 19 |
| is_part_of（从属关系）| 6 |
| related_to（相关关系）| 16 |
