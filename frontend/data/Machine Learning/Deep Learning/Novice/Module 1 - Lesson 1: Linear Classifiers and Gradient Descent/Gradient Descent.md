# Gradient Descent

In this section, we will talk about how to actually optimize these models. What we want to do is find good weights for the models. And we will do this through a method called gradient descent. If you remember, we had several different parts to a Machine Learning model, we had the input, the functional form of the model and the performance measure and we talked about these.

![Full Loop](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Full%20Loop.svg)

Now we will talk about the algorithm for finding the best parameters for a particular model. This is called an optimization algorithm, and it will take the output of a loss function, and figure out how to change the weights based on that loss function, based on how incorrect the model is to reduce the loss, such that the model next time is going to be more correct.

Given the model and a loss function, finding the best set of weights is actually a search problem. We are searching through all possible weight values that obtain a really small loss on their training data. There are therefore several classes of methods that can be used. Surprisingly, you can actually use [random search](<https://en.wikipedia.org/wiki/Random_search#:~:text=Random%20search%20(RS)%20is%20a,%2C%20or%20black%2Dbox%20methods.>), just assign random values to these weights and see if your loss is lower than you've ever seen before. You can take this further and apply [genetic algorithms](https://en.wikipedia.org/wiki/Genetic_algorithm) which maintains a population of weight vectors, or matrices, and you can then combine these weight matrices, or mutate them in various ways to perform the search. Finally, you can use gradient-based optimization, you can try to model how small changes in the weights affect the loss. And if you know this, then you can try to make small weight changes that reduce the loss and keep doing this iteratively over and over again until the loss is minimized.

In Deep Learning, gradient-based methods are dominant, although keep in mind that they're not the only approach possible. And in certain application area where, for example, the weight space is not that large, other methods can actually work quite well.

The optimization algorithm that we'll be talking about, Gradient Descent, has a key idea, as the weights change, the loss changes as well. And this is often somewhat smooth locally. So small changes in the weights produce a small change in the loss. We can therefore think about iterative algorithms that take the current value of the weights, modifies them a little bit to reduce the loss and then does this over and over again until the loss is minimized. You can think of this as the surface below,

![Gradient Descent](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/gradient-descent.png)

you can have as the different weights which are represented by the two axis on bottom are modified, you have the loss function being modified as well. So what you are trying to do is move towards the minima.

The strategy that we are going to follow is pretty simple. We are going to follow the slope. If you think about it, if you are blindfolded and you are on a mountain and you want to move towards a particular valley, or minimum on the mountain, then essentially you can just reach your feet out, figure out where the slope is, and move toward the negative slope. Meaning you want to move towards directions that are lower to the ground.

Mathematically, we can find the steepest descent direction for a function by computing the derivative or the gradient. If you remember from your Calculus class, the derivative of a function is just the function at point $a$ plus some small infinitesimal step size $h$, minus the function at $a$ without that step, divided by the step size.

$$
f'(a) = \lim_{h \to 0} \frac{f(a+h) - f(a)}{h}
$$

![limit-def](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/limit-definition-of-a-derivative-1.png)

And so the steeped descent direction is actually the negative gradient. Intuitively, what we want to measure is how the function changes as the argument $a$ changes by a small step size. In Machine Learning what we want to know is how the loss function changes as weights are varied by a small amount. We can actually consider each parameter separately by taking the partial derivative of the loss function with respect to that parameter. This will be the key computation that all of our optimizations will be based on. We will take the partial derivative of the loss function with respect to a particular parameter in our model. Again, this is modeling. If we change that parameter by a small amount, how will the loss function actually change? And if we know that, we can essentially take the negative gradient to figure out the steepest direction to change that $w$ in order to reduce the loss function.

This idea can be turned into an algorithm called Gradient Descent. Specifically we are going to choose a model $f(x,W)$, for example

$$
f(x, W) = Wx
$$

We are going to choose a loss function, for example

$$
L_i = \lvert y - Wx_i \rvert^2
$$

We are going to calculate the partial derivative for each parameter

$$
\frac{\partial L}{\partial w_j}
$$

And then we are going to make an update to the parameter along the steepest direction, which is the negative gradient. So we will have an update rule that looks like this

$$
w_j = w_j - \frac{\partial L}{\partial w_j}
$$

And we will add a learning rate to prevent too big of a step. This is because given a particular set of examples in our training set, those examples might be biased, they might be noisy, and so on. And so we don't really want to take a leap of faith. What we want to do is take small gradual steps toward the minimum.

$$
w_j = w_j - \alpha \frac{\partial L}{\partial w_j}
$$

Again, this algorithm is called Gradient Descent and is the key algorithm, the key workhorse in Deep Learning that we will be using throughout.

One thing to note is that often, we only compute the gradients across a small subset of data. So while in **Full Batch Gradient Descent**, we compute the loss as the average loss over all items in our data set ($N$ is the population size)

$$
L = \frac{1}{N} \sum L(f(x_i, W), y_i)
$$

In what is called **Mini-Batch Gradient Descent**

$$
L = \frac{1}{M} \sum L(f(x_i, W), y_i)
$$

we only take a subset of the data of size $M$, where $M$ is much smaller than $N$ and compute the loss over those examples. Then we compute the gradients and then take a step in the weight space. And then we take another mini-batch. These mini-batches can be sampled randomly from the large data set, or you can just chunk up your large data set and then iteratively or sequentially go through the mini-batches.

Another thing to note is that we often average the loss across the mini-batches and therefore your gradients also get averaged across the size of the mini-batch. And this is to prevent large changes in the learning rate if your batch size changes, though if you choose a batch size of 32 examples to calculate the loss over, but then the next day choose 128 examples, then you will be taking much larger steps and you will have to change the learning rate or tune their learning rate again. And so averaging over the amount of elements in the mini-batch itself allows you to be a little bit invariant to this defect.

Gradient Descent is guaranteed to converge under some limited conditions. For example, the learning rate has to be appropriately reduced throughout training. Of course, the theory does not actually tell us in real world cases how to decrease this learning rate. And so, in practice, all we can do is try out different things empirically. Also Gradient Descent converges to a local minima, that is small changes in the weights from the local minima would not decrease the loss. However, that is not to say that there is a whole new set of parameters somewhere in weight space that can do much better. Finally, it turns out that some of the local minima that it finds in practice are still pretty good if the model is trained well. And so this is why Deep Learning works really well because even though it finds local minima, the local minima it finds tends to be really strong, especially compared to prior methods.

We know how to compute the model out and the loss function. The big question is how do we compute the partial derivative of the loss with respect to a particular weight? There is a whole class of different ways to do this.

- We can perform manual differentiation, meaning that we will calculate through analysis and our knowledge of calculus, what the actual derivative comes out to be.
- We can apply symbolic differentiation tools.
- We can apply numerical differentiation tools.
- Or we can do automatic differentiation which actually does it for us. We will talk about this later.

In most cases, manual differentiation is very labor intensive. And in some cases, we can't really compute the closed form solution for that if we have a very complex function. This is also true for symbolic differentiation, which only works for some classes of function. Numerical differentiation, on the other hand, we can do for any function, but it is very computationally intensive. And you can have numerical issues, as well.

And so really in Deep Learning and Deep Learning frameworks that already do this, they actually mostly use automatic differentiation. For some functions, we can analytically derive the partial derivative.

## Example 1

And I think it is instructive to do so in order to see how it is done. So let's take a very simple example. We have a function, which is the model and it is a very simple linear model.

$$
f(w, x_i) = w^Tx_i
$$

Our loss is going to be the difference between the ground truth $y$ and our model, and we will square the difference to make them all positive and exaggerate large differences.

$$
(y_i - w^Tx_i)^2
$$

So we can now actually derive the update rule that we should be using for Gradient Descent, let's do that.

The loss function is just the summation over all of the examples in our data set.

$$
L = \sum_{i=1}^N (y_i - w^Tx_i)^2
$$

If we have $N$ examples in our data set, we essentially sum up the loss for each example $k$. The loss for each example $k$ is simply $(y_k−w^Tx_j)^2$.

Gradient Descent tells us that we should update $w$ as follows to minimize the loss,

$$
w_j \leftarrow w_j - \alpha \frac{\partial L}{\partial w_j}
$$

Remember we are multiplying by a learning rate $\alpha$ so we do not take too large of a step. So the key question is what is the partial derivative of the loss with respect to $w_j$?

So we can write this out. First, we can move the partial derivative inside the summation, and then if you remember from Calculus class, the derivative of something squared is inside times the derivative of what is inside (the chain rule)

$$
\begin{aligned}
\frac{\partial L}{\partial w_j} &= \frac{\partial}{\partial w_j}\sum_{i=1}^N (y_i-w^Tx_i)^2 \\
&=\sum_{i=1}^N \frac{\partial}{\partial w_j}(y_i-w^Tx_i)^2 \\
&=\sum_{i=1}^N 2(y_i-w^Tx_i) \frac{\partial}{\partial w_j}(y_i-w^Tx_i) \\
&= -2 \sum_{i=1}^N \delta_i \frac{\partial}{\partial w_j} w^Tx_i \text{   where } \delta_i = y_i - w^Tx_i \\
&= -2 \sum_{i=1}^N \delta_i \frac{\partial}{\partial w_j} \sum_{k=1}^m w_kx_{ik} \\
&=-2 \sum_{i=1}^N \delta_ix_{ij}\\
\end{aligned}
$$

Let's walk through this in some detail. For simplicity, we can define $\delta_k$ as the difference between the ground truth $y_k$ and our model $w^Tx_k$. This is mostly for convenience when writing out the calculation. Now we can re-order some terms, we have a $−2$ which we can move out, the negative comes from the last part of the term which is the partial derivative of $y_k−w^Tx_k$. Because $y_k$ has nothing to do with $w_j$, then it is essentially the derivative of that with respect to $w_j$ is just the row so it goes away, but we still have the negative part. So we just move that negative into the front.

And then we can essentially write out the $w^Tx_k$ into the actual dot product that we have to do. And so for each $w_k$, we multiply it with $x_{ik}$ (this comes from the definition of the dot product). And so what is interesting here is that the partial derivative of this term, this summation, with respect to $w_j$ is really causing most of the terms to be zero. Because when $i$ is not equal to $j$, then none of those weights actually affect $w_j$. In other words, when $w_j$ is modified a little bit, then those terms don't change at all, and so those turn to zero. And so in the end, we really only have one thing, which is

$$
\frac{\partial}{\partial w_j} \sum_{k=1}^m w_kx_{ik} \\
$$

And the partial derivative of that is just

$$
x_{ij}
$$

And so, again, all of the terms within the summation in the dot product actually go away. And all we have left is that the partial derivative of the loss with respect to this one weight $w_j$ is just

$$
\begin{aligned}
\frac{\partial L}{\partial w_j} &= -2 \sum_{i=1}^N \delta_ix_{ij}\\
&= -2 \sum_{i=1}^N (y_i - w^Tx_i)x_{ij}
\end{aligned}
$$

We can now define our update rule:

$$
w_j \leftarrow w_j + 2 \alpha\sum_{i=1}^N (y_i - w^Tx_i)x_{ij}
$$

If you notice, our partial derivative of the loss with respect to $w_j$ was negative, but because the gradient descent rule tells us to take the negative gradient direction, it turns into a positive.

## Example 2

If we add a non-linearity such a sigmoid, the derivation becomes more complex, although we could still do it:

If you remember the sigmoid function is

$$
\sigma(x) = \frac{1}{1+e^{-x}}
$$

we can actually derive, but we won't show (this is good practice) that there that the derivative of the sigmoid function is actually pretty simple. It is just

$$
\sigma'(x) = \sigma(x)(1-\sigma(x))
$$

So our function now, our model will be not just $w^Tx$, which is what is inside the parentheses, but the sigmoid of that. So again, we are adding a non-linearity on top of the linear function.

$$
f(x) = \sigma(w^Tx) = \sigma \left(\sum_k w_k x_{ik} \right)
$$

Our loss is just as before, it is the summation over our entire data set of the $y_i$ minus the model squared.

$$
L = \sum_i \left(y_i - \sigma \left(\sum_k w_k x_{ik} \right) \right)^2
$$

So what we need to compute is the partial derivative of the loss with respect to $w_j$, the one particular parameter $w_j$. Again, just as before, the derivative is found using the chain rule:

$$
\begin{aligned}
\frac{\partial L}{\partial w_j} &= \sum_i 2 \left(y_i - \sigma \left(\sum_k w_k x_{ik} \right) \right)\left(-\frac{\partial}{\partial w_j} \sigma \left(\sum_k w_kx_{ik} \right) \right)\\
&= \sum_i -2 \left(y_i - \sigma \left(\sum_k w_k x_{ik} \right) \right)\sigma' \left(\sum_k w_k x_{ik} \right) \frac{\partial}{\partial w_j} \sum_k w_k x_{ik} \\
&=\sum_i -2 \delta_i \sigma(d_i)(1-\sigma(d_i))x_{ij}
\end{aligned}
$$

where $\delta_i=y_i−f(x_i)$ (the difference between $y_i$ the ground truth and our model) and $d_i=\sum w_kx_{ik}$.

So the update rule will be, again, the negative gradient. So $w_j$ will be updated by

$$
w_j \leftarrow w_j + 2 \alpha \sum_{i=1}^N \delta_i \sigma(d_i)(1-\sigma(d_i))x_{ij}
$$

So again it is a little more complex, but we can actually write a closed-form solution for this.

Now if you noticed, even analytically deriving the partial derivative of the loss with respect to particular parameters, for a pretty simple function, a sigmoid of a linear function is actually not that nice. It is a little bit messy. And so what we want to do is rather than have to hand derive this partial derivative, we are going to try to simplify the problem. We are going to decompose the complicated function into modular sub blocks. And this will allow us to develop a generic algorithm that can work on these sub blocks to derive the partial derivative.

So what we are going to do is given a library of simple functions, including addition, subtraction, multiplication, sin, cosine, log, and exponential, we are going to compose it into a more complicated function.

![GD1](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/GD1.png)

And this, again, is just the typical logistic Machine Learning algorithm (shown above) and so what we are going to do is decompose that complex function into a set of modular sub-blocks:

![GD2](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/GD2.png)

Under the left side, we have the innermost part of the function, $w^Tx$, that gets output into an intermediate variable $u$, which goes into the next sub-block, which is, again, the logistic or sigmoid function, that gets output into another intermediate variable $p$. And then we just compute the negative log of $p$, which is our loss function and that is the final output of the model.

So we have taken a logistic regression kind of model and decomposed that into a set of simple sub blocks. This will allow us to develop a generic algorithm to perform the differentiation that we want which is the partial derivative of the loss with respect to intermediate variables here. For example, we may want the partial derivative of the loss with respect to $u$, or at the end, we want the partial derivative of the loss with respect to $w$ because that is ultimately what gradient descent wants to update. And so we are going to develop a generic algorithm that takes these modular sub-blocks and does it in a much simpler way than by hand deriving the analytic forms.
