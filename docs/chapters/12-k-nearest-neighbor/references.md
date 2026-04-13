# 参考文献：K 近邻算法

1. [K-nearest neighbors algorithm](https://en.wikipedia.org/wiki/K-nearest_neighbors_algorithm) - Wikipedia — 全面介绍 KNN 算法，涵盖 distance metric、majority voting、weighted variant，以及影响 KNN 性能的 curse of dimensionality。

2. [Euclidean distance](https://en.wikipedia.org/wiki/Euclidean_distance) - Wikipedia — 介绍 Euclidean（L2）distance 在多维 feature space 中的数学定义与性质，是 KNN classification 中的默认 distance metric。

3. [Hyperparameter optimization](https://en.wikipedia.org/wiki/Hyperparameter_optimization) - Wikipedia — 介绍 hyperparameter tuning 策略，包括 grid search、random search 和 cross-validation，用于选择 KNN 中 k 等最优超参数值。

4. Hands-On Machine Learning with Scikit-Learn, Keras, and TensorFlow (3rd Edition) - Aurélien Géron - O'Reilly Media — 涵盖 instance-based learning 和 KNN 算法的 Python 实践示例，包括 k 值选择策略和与其他 classifier 的对比。

5. Pattern Recognition and Machine Learning - Christopher Bishop - Springer — 第 2 章从概率视角介绍 nonparametric density estimation 和 nearest-neighbor 方法，为 KNN 提供理论基础。

6. [K-Nearest Neighbors Algorithm](https://www.geeksforgeeks.org/k-nearest-neighbours/) - GeeksforGeeks — 实践教程，涵盖 Euclidean、Manhattan 和 Minkowski distance、majority voting，以及 scikit-learn 的 Python 实现。

7. [Choosing the Right K Value for KNN](https://www.geeksforgeeks.org/how-to-find-optimal-value-of-k-in-knn/) - GeeksforGeeks — 使用 cross-validation 和 elbow curve 选择最优 k 超参数的指南，附代码示例展示不同 k 值的效果。

8. [Scikit-learn KNeighborsClassifier](https://scikit-learn.org/stable/modules/generated/sklearn.neighbors.KNeighborsClassifier.html) - Scikit-learn Official Docs — scikit-learn KNN classifier 的官方 API 文档，涵盖 distance metric 选项、weighting scheme 和算法参数。

9. [Weighted KNN](https://www.geeksforgeeks.org/weighted-k-nn/) - GeeksforGeeks — 解释 distance-weighted KNN 变体（距离越近投票权重越高），并与标准 majority voting KNN 进行对比。

10. [Curse of Dimensionality](https://www.geeksforgeeks.org/curse-of-dimensionality-in-machine-learning/) - GeeksforGeeks — 解释高维 feature space 如何降低 KNN 性能，以及为何 dimensionality reduction 对 distance-based 算法至关重要。

[查看注释版参考文献](./references.md)
