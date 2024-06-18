# Performance Measure For A Classifier

In this section, we will take a look at performance measures for a machine learning classifier. If you remember, a machine learning model can consist of many different parts. And specifically, there is a flow with which we can obtain predictions from the model, calculate a loss function, and then have an optimizer that optimizes that loss function.

![Full Loop](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Full%20Loop.svg "Full Loop")

Let's talk about performance measures that are used to improve the model, and specifically loss or objective functions. If you remember, the output of a classifier can be considered a score. For a binary classifier, we can use a rule such as

$$
y = \begin{cases}
1 & \text{if } f(x, w) >= 0 \\
0 & \text{otherwise}
\end{cases}
$$

If we want to classify many classes, we can just employ the one versus all strategy, where we consider one class versus all of the rest of them. In a multi-class classifier setting, we can essentially just take the maximum score to make the prediction.

There are several issues with scores, however. They are not very interpretable, they have no bounded values, and it is hard to compare across different classifiers. We often want instead a probability, which are, in some sense, much more interpretable and can be related to a probabilistic view of Machine Learning, which you may have gotten from a Statistical Machine Learning class.

Another advantage is that we can actually reason about the model's uncertainty by understanding what probability distribution it outputs. For example, if it outputs roughly a uniform distribution over all the classes, that means it is not very certain about its prediction.

In Deep Learning, we specifically use the softmax function to convert scores to probability.

$$
\Pr\{Y=k \mid X=x\} = \frac{e^{s_k}}{\sum_je^{s_j}}
$$

Suppose that we have the score vector $s=f(x,W)$ which is what we have talked about before, a score for each class. We will feed this vector through the softmax function, and what we will do in particular for each class $k$ is exponentiate the score for class $k$ and then divide it by the sum of exponentials for all the scores. If you notice, this normalizes the probability output as being from zero to one, which fits the definition of a probability.

Given the output of a model, we need a performance measure to optimize. What we want to do is penalize the model for being wrong. This allows us to modify the model's parameters to reduce this penalty through an optimization procedure. This is known as an objective or loss function. In Machine Learning, we use empirical risk minimization often. This is just a fancy term to say that all we can do is reduce the loss over the training dataset. And what we are gonna do in particular is average the loss over the entire training data. So given a dataset of examples, $x_i$ and $y_i$, what we are gonna do is compute a loss for that particular example, loss $L1$.

$$
L = \frac{1}{N} \sum L_i(f(x_i, W), y_i)
$$

And if you notice, the $L1$ takes as input both the model's predictions, $f(x_i,W)$, as well as the ground truth label, $y_i$. This can be a label or it can be a probability distribution where you have one probability for the ground truth class and zero elsewhere. And so we are gonna compute this loss $L1$ for each example. And then we are just gonna take the total loss to be the average of this. Here is an example of a loss function that you might be familiar with. This loss function is suitable for scores that are output from a model.

Given an example, $x_i$ (the image) and $y_i$ (the integer label), what we are going to do is compute the loss where the loss is zero if the score for $y_i$, which is the ground truth label, is greater or equal to the scores of all the other classes, which are incorrect, plus one. Let $s=f(xi, W)$ be the shorthand for the scores vector,

$$
\begin{aligned}
y &= \sum_{j \neq y_i} \begin{cases}
0 & \text{if } s_{y_i} \geq s_j + 1 \\
s_j - s_{y_i} + 1 & \text{otherwise}
\end{cases} \\
&= \sum_{j \neq y_i} \max(0, s_j - s_{y_i} + 1)
\end{aligned}
$$

So we want to maintain a margin between the score for the ground truth label and all the other possible categories. We want to have a score that is higher by some margin for the ground truth label. If that is not the case, then we are going to penalize it by how different it is from this margin. And what we are going to do is we are going to take the max over all classes that are not the ground truth and compute this loss.

![score-delta](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/score_delta.png "Score Delta")

And so we are going to sum this up over all the classes that are not the ground truth and penalize the model whenever the score for the ground truth itself is not bigger by a particular margin. This is called the hinge loss and is shown in graphic form below:

![hinge-loss](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/hinge_loss.png "Hinge Loss")

Let's take an example. Suppose that you have three images in your training set, a cat, a car, and a frog. We show the score output for the classifier for each image. So for the cat image, the model output a score of $3.2$ for the cat, a score of $5.1$ for the car, and a score of $-1.7$ for the frog. If you notice, if you take the maximum score, then the model would be wrong. It would say that the image contains a car, which it does not.

![hcat-loss](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/loss_cat.png "Cat Loss")

So what we are going to do is we are going to iterate over all the classes that are not the ground truth, that is the car and the frog, and we are going to compute this loss function.

$$
\begin{aligned}
L_i &= \sum_{j \neq y_i}\max(0, s_j - s_{y_i} + 1) \\
&= \max(0, 5.1-3.2 + 1) + \max(0, -1.7-3.2+1)\\
&=\max(0, 2.9) + \max(0, -3.9)\\
&=2.9 + 0\\
&=2.9\\
\end{aligned}
$$

Specifically for the car, we are going to take $5.1−3.2+1$. If you notice, that is greater than zero, so it will incur some penalty or loss because it was incorrect. For the frog class, we are going to take $−1.7−3.2+1$. This sum is actually below zero, and so the max of zero and that value is gonna be just zero. So we are not going to penalize it for the frog score, because if you notice, the cat score is much greater than the frog score. And so in the end, we are gonna have a penalty of $2.9+0=2.9$. So that is going to be our loss for the model. You can make similar calculations for the other classes as well. If we use the softmax function to convert scores to probabilities, as we discussed before, actually the right loss function to use is called cross-entropy. You can actually theoretically derive why this is the right loss function. We can do this by looking at the distance between the probability distributions, also known as [KL Divergence](https://en.wikipedia.org/wiki/Kullback%E2%80%93Leibler_divergence). Specifically, we have the model outputting a distribution over the class labels, and we have the ground truth probability distribution, which has a one for the ground truth class and zero elsewhere.

We can have a distance measure between two probability distributions that uses information theory, and then we can derive why this loss function is the correct one.

This can also be derived from the maximum likelihood estimation perspective, where we want to choose probabilities to maximize the likelihood of the observed data. In any case, the actual form of the loss function is shown below:

$$
L_i = - \log \Pr\{Y=y_i \mid X=x_i\}
$$

Specifically, once we convert scores to probability, we actually just take the negative law of probability of the ground truth class, $y_i$. So we take the probability score for class $y_i$ and we take the negative log of that. And that is the loss that we incur from that example.

Let's take a look at an example for the cross-entropy loss. If you remember, we are going to take the scores output by the model and convert them into probabilities through the softmax function. Specifically, we are going to take each score for each class $k$, exponentiate it, and then divide it by the summation of exponentials. This will normalize each value to be between zero and one. Here are the model outputs

![softmax](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/softmax-scores.png "Softmax")

So the model output a score of $3.2$ for the cat, $5.1$ for the car, and $-1.7$ for the frog. If you remember, the cross-entropy loss function that we will use is the negative log probability of the correct class, which in this case is the cat. So let us look at that element. The model output a score of $3.2$, we are going to feed it through the exponential function, which will result in $24.5$, then we are going to normalize it by the summation of all the exponentials, $24.5+164.0+0.18$. When we do this, we get a probability for the cat of $0.13$. If you notice, it is a pretty low probability, even though it is indeed a cat. So the model is wrong. This is because, if you notice, the scores contain high score for car, and so there is a correspondingly high probability for car. And this exponentiation that we apply actually peaks this result. So the loss function is just negative log of $0.13$, which is the probability for the cat.

$$
L_i = - \log \Pr\{Y=y_i \mid X=x_i\} = - \log(0.13)
$$

Now, you might wonder, why isn't the loss function using the probabilities of all the other classes, $0.87$ and $0.00$? Well, it turns out that through the process of normalization, we already induced a competition between the different classes. So actually, the optimization algorithm can change the weights such that the cat score increases, in this case, increasing the probability, or it could actually just decrease the score for the car. And through the normalization process, that will thereby increase the probability for the cat. There is a natural competition between the categories here. And that comes out through the normalization process. And so the loss function itself only deals with the negative log probability of the correct class.

As you noticed, we used different loss function for different outputs of the model or tasks. When we had scores, we used the support vector machine or hinge loss, and actually there are many other loss functions for scores as well. When we converted the scores to probabilities, we used the cross-entropy loss, which actually is the right thing to do. We can actually theoretically derive under what conditions we want to do that.

If we are performing regression, we can actually directly optimize to match the ground truth value. So for example, if we are trying to predict housing prices, then we can use what is called the $L1$ loss, which just takes the absolute value of the difference between the ground truth house price and the output of our model.

$$
L_i = \lvert y - Wx_i \rvert
$$

We can also have $L2$ loss, which just is a square of this.

$$
L_i = \lvert y - W x_i \rvert ^ 2
$$

Or we can have the logistic loss, which again, can take the difference between the model and the actual housing price, and perform the same exponentiation that we performed last time. Below, we show a graph of how severely or gently you are penalizing the model depending on how wrong it is.

![loss3](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/loss3.jpg "Loss")

So different loss functions have different characteristics. They can have different minimum values, different maximum values, different values at initialization, and so on.

Often we add a regularization term to the loss function. So we penalize the model not just for being incorrect, but we may want to prefer different models over others based on the complexity of the model.

For example, we can have $L1$ regularization, which is just the norm of the weight vector, or matrix.

$$
L_i = \lvert y - Wx_i \rvert ^ 2 + \lvert W \rvert
$$

And this essentially penalizes high weight so that the model doesn't rely on particular features in the inputs more than others. There are many other examples of regularizations, $L1$ or $L2$. And again, most of these encourage small values with different levels of penalty.
