# Linear Algebra View: Vector and Matrix Sizes

In this section, we will take a Linear Algebra view of what we have covered before, and look at the specific vectors and matrices and their sizes, as they are involved in the gradient descent algorithm.

So if you remember, a simple linear model is just $W^T
x$, we actually have the $+b$ term which is tucked into $W$.

$$
Wx = \begin{bmatrix}
w_{11} & w_{12} & \cdots & w_{1m} & b_1 \\
w_{21} & w_{22} & \cdots & w_{2m} & b_2 \\
w_{31} & w_{32} & \cdots & w_{3m} & b_3 \\
\end{bmatrix} \begin{bmatrix}x_1 \\ x_2 \\ \vdots \\ x_m \\ 1 \end{bmatrix}
$$

where the size of $W$ is $c×(d+1)$ and the size of $x$ is $(d+1)×1$ where $c$ is the number of classes and $d$ is the dimensionality of the input. The matrix $W$ has a row for each of the classes and $d+1$ columns where the extra one is for the included bias. The size of $x$ is just $d+1$.

Let's take a look at some convention with respect to the sizes of derivatives. The size of derivatives for scalars, vectors and matrices are as follows. Assume that we have a scalar $s$ which is one-dimensional (so $s\in \mathbb{R}$), we have a vector $v$ which is $m$-dimensional (so $v\in\mathbb{R}^m$), and then we have a matrix $M$ with dimensions $k×l$ (so $M\in\mathbb{R}^{k×l}$). Now what is the size of the partial derivative of $v$ with respect to $s$, or a vector with respect to a scalar? This size is actually $m×1$ (or $\partial v /\partial s \in \mathbb{R}^{m \times 1}$), which is a column vector of size $m$. Each element of this column vector is the partial derivative of a particular element in $v$ with respect to $s$

$$
\begin{bmatrix} \frac{\partial v_1}{\partial s} \\ \frac{\partial v_2}{\partial s} \\ \vdots \\ \frac{\partial v_m}{\partial s}\end{bmatrix}
$$

What is the size of the partial derivative of a scalar $s$ with respect to a vector $v$? Here, it is a row vector of size $m$, where again, each element is the partial derivative of the scalar with respect to each element in the vector.

Now what is the size of the partial derivative of a vector $v_1$ with respect to another vector $v_2$? In this case, it is actually a matrix called the Jacobian, which contains all the partial derivatives with respect to $v_1$ and $v_2$.

$$
\begin{bmatrix}
\frac{\partial v_1^1}{\partial v_1^2} & \frac{\partial v_1^1}{\partial v_2^2} & \cdots & \cdots & \frac{\partial v_1^1}{\partial v_n^2}\\
\frac{\partial v_2^1}{\partial v_1^2} & \ddots & & & \vdots\\
\vdots & & \frac{\partial v_i^1}{\partial v_j^2} & & \vdots \\
\vdots & & & \ddots & \vdots \\
\frac{\partial v_m^1}{\partial v_1^2} & \cdots & \cdots & \cdots & \frac{\partial v_m^1}{\partial v_n^2}\\
\end{bmatrix}
$$

Specifically, for row $i$ and column $j$, it has the partial derivative of $v_i^1$ with respect to $v_j^2$. And so this tells us the interactions between each element in $v_1$ and each element in $v_2$, and that is why it is a squared form. So again this tells us that for each small change in $v_2$ and element in $v_2$, how does that affect all the elements in $v_1$? And so on for all elements of $v_2$.

So what is the size of the partial derivative of a scalar with respect to a matrix, that is the size of

$$
\frac{\partial s}{\partial M}
$$

Again, it is a matrix, here the scalar is just one number and so all we have is all the elements in the matrix essentially give us the partial derivative of the scalar with respect to each element in the matrix.

$$
\begin{bmatrix}
\frac{\partial s}{\partial m_{[1, 1]}} & \frac{\partial s}{\partial m_{[1, 2]}} & \cdots & \cdots & \frac{\partial s}{\partial m_{[1, n]}}\\
\frac{\partial s}{\partial m_{[2, 1]}} & \ddots & & & \vdots\\
\vdots & & \frac{\partial s}{\partial m_{[i, j]}} & & \vdots \\
\vdots & & & \ddots & \vdots \\
\frac{\partial s}{\partial m_{[m, 1]}} & \cdots & \cdots & \cdots & \frac{\partial s}{\partial m_{[m, n]}}\\
\end{bmatrix}
$$

So in Deep Learning, what we actually care about is the change in loss with respect to $W$, the partial derivative of the loss with respect to $W$

$$
\frac{\partial L}{\partial W}
$$

So what is the dimensionality of that? Can figure that out? Remember that the loss is a scalar, and $W$ is often a matrix.

$$
W = \begin{bmatrix}
w_{11} & w_{12} & \cdots & w_{1m} & b_1 \\
w_{21} & w_{22} & \cdots & w_{2m} & b_2 \\
w_{31} & w_{32} & \cdots & w_{3m} & b_3 \\
\end{bmatrix}
$$

So the Jacobian is a matrix as well:

$$
\begin{bmatrix}
\frac{\partial L}{\partial w_{11}} & \frac{\partial L}{\partial w_{12}} & \cdots & \frac{\partial L}{\partial w_{1m}} & \frac{\partial L}{\partial b_1}\\
\frac{\partial L}{\partial w_{21}} & \frac{\partial L}{\partial w_{22}} & \cdots & \frac{\partial L}{\partial w_{2m}} & \frac{\partial L}{\partial b_2}\\
\frac{\partial L}{\partial w_{31}} & \frac{\partial L}{\partial w_{32}} & \cdots & \frac{\partial L}{\partial w_{3m}} & \frac{\partial L}{\partial b_3}\\
\end{bmatrix}
$$

What we have is a matrix specifying the change in loss with respect to any one parameter in the $W$ matrix. And so this is really what we need in order to perform gradient descent.

As mentioned earlier, gradient descent works in batches of data. And when this data is for example, matrices (if you have an image or tensors(if you have a multi channel image, then these gradients tend to turn into tensors)). For example, if you have each instance being a vector of size $m$, our batch is of size $B×m$. If each instance is a matrix, for example our grayscale image, an image of one channel of size $W×H$, then our batch is $B×W×H$. If each instance is a multi-channel matrix, for example a color image, then our batch becomes $B×C×W×H$, where $C$ is the color channel. And so, when we compute gradient with respect to these types of input, it becomes a bit unwieldy. What we do instead of turning Jacobians into tensors, is flattening out everything into vectors.

$$
\begin{bmatrix}
x_{11} & x_{12} & \cdots & x_{1n} \\
x_{21} & x_{22} & \cdots & x_{2n} \\
\vdots & \vdots & \ddots & \vdots \\
x_{n1} & x_{n2} & \cdots & x_{nn}
\end{bmatrix} \overset{\text{flatten}}{\longrightarrow}
\begin{bmatrix}
x_{11} \\ x_{12} \\ \vdots \\ x_{21} \\ x_{22} \\ \vdots \\ x_{n_1} \\ \vdots \\ x_{nn}
\end{bmatrix}
$$

And so all inputs become vectors, and then we get a vector of derivatives. This can also be done for particular derivatives between two vectors, two matrices, or two tensors. That is really the conceptually simple way to think about things.
