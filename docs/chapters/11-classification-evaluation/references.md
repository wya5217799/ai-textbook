# 参考文献：分类评估指标

1. [Confusion matrix](https://en.wikipedia.org/wiki/Confusion_matrix) - Wikipedia — 全面介绍 confusion matrix 结构、四类预测结果（TP、TN、FP、FN）以及所有衍生 classification metric。

2. [Precision and recall](https://en.wikipedia.org/wiki/Precision_and_recall) - Wikipedia — 详细解释 precision 和 recall 指标、F1 score，以及不同 classification threshold 和应用场景下两者之间的权衡关系。

3. [Receiver operating characteristic](https://en.wikipedia.org/wiki/Receiver_operating_characteristic) - Wikipedia — 介绍 ROC curve、AUC 指标，以及它们如何在所有 operating point 上对 classifier 性能进行与 threshold 无关的比较。

4. Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (3rd Edition) - Aurélien Géron - O'Reilly Media — 第 3 章通过大量实例，实践讲解所有 classification evaluation metric，包括 confusion matrix、ROC curve 和 precision-recall tradeoff。

5. Pattern Recognition and Machine Learning - Christopher Bishop - Springer — 第 1 章从决策理论基础出发介绍 classification evaluation，将 confusion matrix 指标与概率决策理论相联系。

6. [Confusion Matrix in Machine Learning](https://www.geeksforgeeks.org/confusion-matrix-machine-learning/) - GeeksforGeeks — 实践教程，附 scikit-learn 和 Seaborn Python 代码，演示如何为 binary 和 multi-class classifier 构建并可视化 confusion matrix。

7. [F1 Score in Machine Learning](https://www.geeksforgeeks.org/f1-score-in-machine-learning/) - GeeksforGeeks — 解释 F1 score 作为 precision 和 recall 调和平均数的含义，附公式、解读方法和优先选用 F1 而非 accuracy 的适用场景。

8. [ROC Curve and AUC in Machine Learning](https://www.geeksforgeeks.org/auc-roc-curve/) - GeeksforGeeks — 使用 scikit-learn 绘制 ROC curve 和计算 AUC 的教程，解释如何用这些工具比较 classifier 并选择操作 threshold。

9. [Classification Report in Scikit-learn](https://scikit-learn.org/stable/modules/generated/sklearn.metrics.classification_report.html) - Scikit-learn Official Docs — scikit-learn classification_report 函数的 API 文档，一次调用即可计算每个类别的 precision、recall、F1 和 support。

10. [Accuracy, Precision, Recall, and F1 Score](https://www.geeksforgeeks.org/ml-classification-accuracy-precision-recall-and-f1-score/) - GeeksforGeeks — 并列比较四大主要 classification metric，附公式、可视化示例，以及在不均衡数据集中选择合适指标的指导建议。

[查看注释版参考文献](./references.md)
