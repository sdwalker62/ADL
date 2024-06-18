# Components of a Parametric Learning Algorithm

In this section, we will look at the components of a parametric Machine Learning algorithm. As mentioned, a Machine Learning algorithm has several different parts. There is the input and how you represent those inputs. There is the functional form of the model, for example a linear classifier, including the parameters that it contained. There is a performance measure that we seek to improve. And often we have a surrogate loss or objective function that we use to determine how to improve. The algorithm for finding the best parameters is called the optimization algorithm.

![Histogram Features](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Model%20With%20Just%20Histogram.svg "Histogram Features")

Above is a visual depiction of this process. For example given an image, we can convert it to features. Those features are fed into a model, for example, a linear classifier. And that classifier outputs class scores, often normalized to be a probability distribution.

![Model With Histogram](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Model%20With%20Histogram.svg "Model With Histogram")

We often have a loss function, which determines how incorrect or correct the model's outputs are when compared to some ground truth that a human annotated.

![Model With Loss Function](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Histogram%20No%20Class%20Scores.svg "Model With Loss Function")

This is often represented as a one hot vector or a probability distribution where there is a probability of one if it is the correct class and zero elsewhere. The output of this loss function is used by the optimizer to drive the model optimization.

![Full Loop](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Full%20Loop.svg "Full Loop")

Specifically, the optimizer will change the weights or parameters of the model in order to drive the loss function down. Let's take a closer look at the functional form of a model.

The form of a parametric classifier is

$$
f(x, w) = y
$$

where

- $f$ is the classifier
- $x$ is the input (vector)
- $w$ is the set of weights
- $y$ is the output

For example, it could be a scalar score for a particular class or it could be a vector representing a probability distribution over classes. So the input is a continuous number or vector, the output is also a continuous number (for classification it is typically a score). For regression, we typically output what we want to regress to such as a house prices, crime rates, etc. And $w$ is a set of weights that we want to optimize to fit the target function.

What is the simplest function you can think of to use for such a model? One of the simplest functions that we can have is just a linear function, $y=mx+b$. So our model can be

$$
f(x, w) = w \cdot x + b
$$

Remember from your Linear Algebra class that $w$ represents factors that essentially rotate the lines, whereas $b$, the bias, moves the lines up and down. We can use this simple functional form to create a classifier. Specifically, we can compute a score, $w⋅x+b$, so we multiply or dot product the vector $w$ with the vector $x$ and add a bias offset and from that we get a score. We can then have a binary classification rule where is the score is greater than or equal to zero, then we say that $y$, the label, is one; otherwise we say it is zero. And this is a binary classification model.

$$
y = \begin{cases}
1 & \text{if } f(x, w) >= 0 \\
0 & \text{otherwise}
\end{cases}
$$

We can also have a multi-class classifier by converting $w$ from a vector to a matrix.

$$
f(x, W) = Wx + b
$$

So we can have $W$ be a matrix where each row is a separate classifier. And so taking $W$ times $x$ will give us a vector which will give us a set of scores that are then added with a bias vector and then we will have as output a set of scores, one for each class. And then we can take the highest score to determine what class is in the data from the model's perspective.

While a linear classifier is pretty simple, the idea is really intuitive. What we want to do is separate classes via a high dimensional linear separator or hyperplane.

![Linear Classifier](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Linear%20Classifier.svg "Linear Classifier")

If the input representation is linearly separable, then this model will work very well. And that is why feature engineering is often used to make sure that the inputs are more than just pixels. It is one of the simplest parametric models, but is is surprisingly effective. It is used very commonly across many applications. Let's take a look more closely at all the elements that make it up.

As mentioned we have a piece of data, for example an image, we want to feed it through a model which is for example a linear classifier, and that model outputs a set of class scores, one for each category.

![Basic Model](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Basic%20Model.svg "Basic Model")

Let's take a closer look at the Linear Algebra involved. The input $x$ is a matrix. It is composed of a width and height of an image and it contains many pixels, in this case $n×n$ pixels.

$$
x = \begin{bmatrix}
x_{11} & x_{12} & \cdots & x_{1n} \\
x_{21} & x_{22} & \cdots & x_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
x_{n1} & x_{n2} & \cdots & x_{nn} \\
\end{bmatrix}
$$

Often in Machine Learning we want vectors not matrices as inputs (can you think why?). Thus we can flatten this matrix into a vector

$$
x = \begin{bmatrix}
x_{11} \\ x_{12} \\ \vdots \\ x_{21} \\ x_{22} \\ \vdots \\ x_{n1} \\ \vdots \\ x_{nn}
\end{bmatrix}
$$

To simplify notation, we will refer to input as $x_1$ through $x_m$, where $m=n×n$. Our actual model itself or the parameters for that model are composed of $W$ and $b$. Here $W$ is a matrix because we have a three class classifier. Each row is a particular classifier. For example row one contains the classifier for class one, and so on.

![Row Classifier](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/classifier%20per%20row.png "Row Classifier")

And then we multiply this matrix with $x$ which is again the vector input. We also add a bias and the bias term is one for each class. Again you can see this as three independent linear classifiers. Note that we can actually move the bias into the weight matrix itself, where we can have the weight matrix be composed of the values that it had originally, but we add a column for the bias term. And similarly, for the input, we add a one at the end on the bottom. This is Mathematically equivalent, but it is easier notationally.

$$
Wx = \begin{bmatrix}
w_{11} & w_{12} & \cdots & w_{1m} & b_1 \\
w_{21} & w_{22} & \cdots & w_{2m} & b_2 \\
w_{31} & w_{32} & \cdots & w_{3m} & b_3 \\
\end{bmatrix} \begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m \\ 1 \end{bmatrix}
$$

And computationally it is nice because it really allows us to perform inference or prediction from the model by just performing one matrix vector multiplication, which is efficient.

![Image Matrix](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Matrix%20Image.svg "Image Matrix")

The output of a linear classifier is a score for each class. So in this case, $W$ represents parameters for a $3$ class classifier. Really, it can be seen as $3$ independent classifiers, and each one outputs a score for each class. And so we have a cat score, a coffee cup score, and so on.

There are many interpretations that one can take for a linear classifier. Let's take an example from a data set called CIFAR-10, which has ten different categories and images of size 32 by 32.

![cifar-10](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/cifar10.png "CIFAR-10")

From the visual viewpoint, we can actually look at the weight vector as a template. Specifically, we can shape it back into the shape of an image and visualize them. Remember, the weight vectors are multiplied by the inputs, so they have to be the same shape.

![class-representations](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/class%20representations.png "Class Representations")

As you can see the result here after an optimization algorithm is applied, the images kind of look like templates for each class. For example, the car roughly look like a blurry car average over the entire data set. From the geometric viewpoint, we can again view a linear classifier as a linear separator.

![large-classifier](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/large%20classifier.png "Large Classifier")

This latter of viewpoints allows us to reason about why linear classifiers are actually limited. We can see that there are many different functions or spaces that are not separable using a linear classifier. For example, below you can see the XOR function where there is no one line that can separate the two colors in this case representing the two classes.

Similarly, if you have a bull's eye type pattern where the inside of a circle is one class as well as the outside of the circle, but the circle itself is a different class. Then we can not really draw one linear separator that can separate the two classes. And this is true for even more complex spaces as well. Later, we will start using non-linearities in order to address this, similar to how support vector machines project the input space into a different warped space, where linear separators can be effective.

![Linear Separable Failure](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Linear%20Separator%20Failure.svg "Linear Separable Failure")

So we have several different viewpoints: the algebraic viewpoint, which just looks at it as a linear algebra computation; the visual viewpoint which looks at the weight vectors as templates; and there is a geometric viewpoint which looks at it from a hyperplane.

![Machine Learning Viewpoints](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/Machine%20Learning%20Viewpoints.svg "Machine Learning Viewpoints")
