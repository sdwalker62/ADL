# Supervised Learning and Parametric Models

We often have a training set consisting of $\{X, Y\}$, where $X$ is some form of data, for instance images, and $Y$ represents the labels or categories that describe the images. In Machine Learning, we often want to learn a model that represents a function mapping $X$ to $Y$. A standard way to represent this is as a probability distribution of $Y$ given $X$.

$$
f : X \rightarrow Y \\
\Pr\{y \mid x \}
$$

Note that in some advanced textbooks you will see a mapping from $X$ to $Y$ denoted $X \mapsto Y$ instead of explicitly defining any particular symbol such as $f$ if the name is immaterial.

The inputs $x_i$ and $y_i$ are represented as vectors. Which is often written $\vec{x} = [x_1, x_2, \ldots, x_n]$ where the arrow over the symbol denotes it as a vector. We write $\mathbb{R}$ to denote the real numbers, i.e. the union of rational and irrational numbers. Deep Learning models are parameterized by floating point numbers since this allows us to take derivatives, hence if we write

$$
\vec{x} \in \mathbb{R}^n
$$

this means all components of the vector are real-valued and there $n$ such components (the cardinality of the vector is $n$). The symbol $\in$ reads "in" and denotes membership of a set (in this case $\vec{x}$ is a member of the real numbers). But this set could be anything, for instance if I had a set of actions, $A=\{\leftarrow, \rightarrow, \uparrow, \downarrow\}$, then $\rightarrow \in A$ is a true statement, but $b \in A$ is false (often denoted $b \notin A$).

In Machine Learning we are often presented a dataset to learn from, and this dataset consists of many examples $x_1, x_2, \ldots, x_n$. For each example $x_i$ we have a corresponding label $y_i$ that is the **ground truth** category that a human expert has provided (this expert annotator is sometimes called an oracle since we assume they have perfect information).

Note that the vectors $x_i$ and $y_i$ can have different sizes

$$
\begin{aligned}
X &= \{x_1, x_2, \ldots, x_n \} : x \in \mathbb{R}^d \\
Y &= \{y_1, y_2, \ldots, y_n \} : y \in \mathbb{R}^c \\
\end{aligned}
$$

We will use examples in our dataset to learn our model.

![Full Dataset](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Dataset%201.svg "full dataset")

This course will be concerned primarily with supervised learning, we will briefly talk about two other types of learning as well. In unsupervised learning, we only have the input $X$. That is we have no labels $Y$ associated with the data itself. All we can do is attempt to learn a probabilistic model for our data. For example, a generative model that described the distribution of the data (e.g. [Gaussian Mixture Models](https://en.wikipedia.org/wiki/Mixture_model) or [$k$-means Clustering](https://en.wikipedia.org/wiki/K-means_clustering))

![Partial Dataset](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Dataset%202.svg "partial dataset")

And so unlike supervised learning, all we have is a dataset consisting of many examples and all we can do is learn patterns or structure in the data itself.

A third form of learning that we'll cover is Reinforcement Learning. Here we have an agent acting in the world, the agent can perform various actions that affect the environment. The environment in turn changes its state based on the actions and also gives the agent a reward. For example, if it is an agent that is moving around in the environment and it bumps into a wall, it can receive a negative reward. Supervision here is in the form of a reward, not a label. Specifically, there is no supervision on what action to take at any one point in time. All we have is the reward which may come very late in the agent's life. For example you may play chess for a long time and at some point at the end, you either win or lose and that is the only supervision that you get. This is a very difficult form of learning to do because the reward can be sparse, it can be delayed, and so on.

![RL Loop](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/RL%20Diagram.svg "RL Loop")

And so you can roughly categorize Machine Learning into three different types of learning: supervised learning, unsupervised learning, and Reinforcement Learning. Note that there is a fourth type of learning you will encounter called semi-supervised learning. In this case you are provided a few examples labeled by an expert and the rest is unlabeled.

![Semi-supervised Learning](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/semi-supervised.svg "Semi-supervised Learning")

In the above figure there are some dots that are colored pink and purple with the rest empty. The colored dots are labeled and the others are unlabeled and if we tried to use supervised learning we would mis-classify some of the top set as part of the bottom (these two sets are not linearly separable). Semi-supervised methods can solve this by associating nearby points with hand-labeled points to form a non-linear classifier. For those familiar with feature engineering, it is indeed possible to transform the dataset $X$ and make this linearly separable, but this becomes intractable with more complex problems.

The beauty of Deep Learning is that we will be able to solve all of these different problem formulations using the same exact underlying techniques.

![Three Types of Learning](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Three_Types_of_Learning.svg "Three Types of Learning")

And in fact, we will be able to build large models that actually perform this at the same time. So for example, you can have one model that is trained in a supervised way where maybe you have supervision or labels in terms of the actions you should perform. But maybe you are also training at the same time using a reward function as well. And so in this series we will really focus on supervised learning for the most part, but we will cover in depth the other two as well.

## Deeper Dive

Let us delve deeper into supervised learning. Again, if you remember from previous Machine Learning courses, there are different types of Machine Learning models that you can have. For example non-parametric models which do not explicitly model a particular function that has a set of parameters. Some examples include nearest neighbor classifiers, decision trees, and so on. For example, in nearest neighbor if we have a dataset which consists of a set of examples, and each of those examples have a ground truth category such as cat, dog, and so on, we can take a new query or test example and we can label it based on the nearest example that we have from the training set.

![Nearest Neighbors](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Non-Parametric%20Nearest%20Neigbor.svg "Nearest Neighbors")

Here notice that we do not actually model a particular function. All we are doing is during test time just finding the nearest training example.

On the other hand, we can have a parametric model. A parametric model explicitly models the function from $X$ to $Y$ in the form of some parameterized function, $f(x,W)=y$, where $W$ are the parameters that you can vary. Some examples include logistic regression or classification, and of course, neural networks, which will dominate this series.

$$
f(x, W) = Wx + b
$$

Above is an example of a very simple parametric model, the linear classifier. Here $f(x,W)$ is represented as $Wx+b$. The form of this function will be explained in more detail later. But in essence, you can view $W$ as a set of weights that are multiplied by the input features $x$ with some offset $b$ applied. The output of this function is a set of scores, one for each row in $W$ which represents how likely a particular class is to be occurring in $x$. So the procedure is that you calculate the score per class for each example, and then you return the label of the maximum score or take the argmax. Here is an example. We can have an input image, for example of a cup of coffee. We have this linear classifier that essentially multiplies the pixels in this image with a set of weights and sums that result up and then adds some offset. And then the output is some set of class scores that we will get.

![Basic Model](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Basic%20Model.svg "Basic Model")

So the input $x$ and $y$ for a supervised learning model is one where $x$ is the image, $y$ is the ground truth label. For example, annotated by an expert human, and $Wx+b$ is our model, which we chose to be a linear model in this case. $W$ and $b$ are the parameters or weights of our model that must be learned. There is some space of possible weights that we can explore. And essentially a learning algorithm will tend towards the particular weights that are accurately representing the world or give us a good classification performance. We update these weights iteratively using a dataset.

**In summary**: Input $\{X, Y\}$:

- $X$ is an image
- $Y$ is a ground truth label annoated by an expert (human)
- $f(x, W) = Wx + b$ is our model (chosen to be a linear function in this case)
- $W$ and $b$ are parameters (**weights**) of our model that must be learned.

One challenge is that the image is high dimensional. For example, if we have a 512 by 512 image, meaning that the width and height are 512, then the total number of pixels that we have or values are 262,000 (512 \* 512) roughly. So we would like to learn a classifier that is able to take in this number of pixels and multiply them with some set of weights in order to separate out the different classes. This is hard to do in high-dimensional space.

Before Deep Learning, it was typical to perform feature engineering. Feature engineering means that engineers or researchers performed hand-designed algorithm development for converting the raw input into some lower dimensional set of features. Here is an example of a feature that people have used, the color histogram.

![Histogram](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Histogram.svg "Histogram")

We can take an image and convert it into a histogram. For example we can take the red channel of an image and convert those pixels which range from 0 to 255. Pick some set of bins, for example, 10 bins from 0 to 255, and then we count how many pixels are within each bin. So a color histogram is a vector of numbers that represents the number of pixels fitting within each bin. And we will later see that learning the feature representation itself is much more effective. This kind of color histogram can be used, combined with a linear classifier, in order to determine whether the image contains a bird or not. However, learned features, that is features that a human is not designing are often much more effective, especially if you have enough data to learn such features.

![Ground Truth](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Ground%20Truth.svg "Ground Truth")

Another concern is how to represent the label itself or the category. Labels are often categorical, meaning you have a set of choices to choose from, bird, cat, dog, and so on. But we really need a numerical representation. Assigning a number to each category is pretty arbitrary. Instead what we will do is represent a probability distribution over a category. A ground truth label then becomes a probability distribution where the correct category probability is 1, and all the others are 0 as in the graph above. Note that for regression this not an issue as the ground truth label for example, housing prices is a number already. Now that we have turned both the input image and the output categories into vectors, we can apply Machine Learning to learn a model, for example, the new classifier.

![Feature Model](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Model%20With%20Histogram.svg "Feature Model")

So now our $x$'s are image histograms, which can be represented as a vector and $y$'s are ground truth labels represented as a probability distribution. And we will try to learn this function $f(x,W)$ which is equal to $Wx+b$ in a linear classifier and $W$ and $b$ are the weights of our model that must be learned.

**In summary**: Input $\{X, Y\}$:

- $X$ is an image histogram
- $Y$ is a ground truth label represented by a probability distribution
- $f(x, W) = Wx + b$ is our model (chosen to be a linear function in this case)
- $W$ and $b$ are parameters (**weights**) of our model that must be learned.

![Text Model](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Model%20With%20Tweet.svg "Text Model")

Let us look at another example. Suppose that you have a tweet or a piece of text and you want to model that output whether that tweet is negative, neutral, or positive. Again, we have an input $X$ which is a sentence, $Y$ is the ground truth label annotated by an expert, and we can have the same form of model as before and the same parameters as well. One issue is how do we represent a sentence as a vector? We can do what is called a word histogram, which is very similar to an image histogram. Except that we will have a count of words.

| Word      | Count |
| --------- | ----- |
| this      | 1     |
| that      | 0     |
| is        | 2     |
| ...       |       |
| extremely | 1     |
| hello     | 0     |
| ...       |       |

So we will have a set of possible words, your entire vocabulary, which can be for example, 20,000 to 40,000 long. And we will have a count that represents how many times within that sentence each word appeared. And this can be our input representation. And again our ground truth label can also be a probability distribution just as before.

**In summary**: Input $\{X, Y\}$:

- $X$ is a sentence
- $Y$ is a ground truth label represented by a probability distribution
- $f(x, W) = Wx + b$ is our model (chosen to be a linear function in this case)
- $W$ and $b$ are parameters (**weights**) of our model that must be learned.
