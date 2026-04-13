# 参考文献：反向传播训练神经网络

1. [Backpropagation](https://en.wikipedia.org/wiki/Backpropagation) - Wikipedia — 全面介绍 backpropagation 算法，包括 chain rule 推导、forward pass 与 backward pass 机制，以及该算法的发展历史。

2. [Dropout (neural networks)](https://en.wikipedia.org/wiki/Dilution_(neural_networks)) - Wikipedia — 解释 dropout 作为 regularization 技术的原理：在训练过程中随机禁用 neuron，以及这对防止 deep network overfitting 的效果。

3. [Epoch (computing)](https://en.wikipedia.org/wiki/Epoch_(computing)) - Wikipedia — 阐明 epoch 在迭代训练中的概念，解释多轮遍历 training data 与收敛性和 training loop 结构的关系。

4. Deep Learning (Adaptive Computation and Machine Learning Series) - Ian Goodfellow, Yoshua Bengio, Aaron Courville - MIT Press — 第 6 章严格介绍 feedforward network 和 backpropagation，第 7 章涵盖包括 dropout 在内的 regularization；是标准参考书。

5. Neural Networks and Deep Learning (free online book) - Michael Nielsen - Determination Press — 第 2–3 章通过大量数值算例，从零构建 backpropagation 直觉，使算法对学生而言极为易懂。

6. [Backpropagation in Neural Networks](https://www.geeksforgeeks.org/backpropagation-in-neural-network/) - GeeksforGeeks — 教程涵盖 forward pass、backward error propagation、使用 chain rule 的 weight update，以及 XOR 问题的可运行 Python 实现。

7. [PyTorch Autograd and Backpropagation](https://docs.pytorch.org/tutorials/beginner/basics/autogradqs_tutorial.html) - PyTorch Official Docs — 官方教程，解释 PyTorch 的 automatic differentiation 系统，阐明 backpropagation 中梯度的计算方式以及 optimizer step 的使用方法。

8. [Training Loop in PyTorch](https://docs.pytorch.org/tutorials/beginner/basics/optimization_tutorial.html) - PyTorch Official Docs — 官方指南，讲解如何在 PyTorch 中实现完整 training loop，包括 epoch、forward pass、loss computation、backpropagation 和 optimizer update。

9. [Dropout Regularization in Neural Networks](https://www.geeksforgeeks.org/dropout-in-machine-learning/) - GeeksforGeeks — 使用 PyTorch 实现 dropout 的实践讲解，演示其如何在 deep neural network 训练中降低 overfitting。

10. [Vanishing Gradient Problem](https://www.geeksforgeeks.org/vanishing-gradient-problem-in-machine-learning/) - GeeksforGeeks — 解释梯度在 deep network 中消失的原因，以及 activation function 选择和架构设计如何解决这一挑战。

[查看注释版参考文献](./references.md)
