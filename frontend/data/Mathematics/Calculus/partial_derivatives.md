# Partial Derivatives

_Generalization of derivatives to multivariate functions_

## Introduction

Partial derivatives extend the idea of instantaneous rate of change to functions of more than one variable. While functions of a single variable such as exponential functions $e^x$, polynomial functions $y=c +a_1x + \cdots + a_nx^n$, and trignometric functions $y=sin(x)$ are common, in the Machine Learning world it is rare for an estimator to have only a single independent variable. In this document we will describle how to extend the concept of differentiation to functions of more than one variable and examine some of the more pertinent properties.

## Multivariate Functions

Before we go define differentiation in multiple dimensions, we will first review multivariate functions. If you are comfortable with this theory already then you can move on to the next section (the outline will link you to the next section).

Real-valued functions of more than one variable, or **real multivariate functions**, are defined in a similar manner to real-valued functions of a single variable, or **real univariate functions**:

---

Suppose $D$ is a set of $n$-tuples of real numbers $(x_1, x_2, \ldots, x_n)$. A real multivariate function $f$ on $D$ is a rule that assigns a unique real number

$$
w=f(x_1, x_2, \ldots, x_n)
$$

to each element in $D$. The set $D$ is the function's **domain**. The set of $w$-values taken on by $f$ if the function's **range**. The symbol $w$ if the **dependent variable** of $f$, and $f$ is said to be a function of the $n$ **independent variables** $x_1, x_2, \ldots, x_n$. We also call the $x_j$'s the function's **input variables** and call $w$ the function's **output variables**.

---

**Note**: when dealing with real-valued functions, we consider the domain to be the set of input variables that yield a real result (unless otherwise stated)

It is useful to define the interior and boundary of a real-valued space. Before moving on we will introduce some supporting symbology. To denote the space of real-valued singletons, $x$, we write $\mathbb{R}$. For pairs of real-valued points we write $\mathbb{R}^2$. Following this trend, the set of all $n$-dimensional real-valued point is denoted $\mathbb{R}^n$.

---

A point $\vec{x} = (x_1, x_2, \ldots x_n)$ in $R$ is called an **interior point** of $R$ if there exists some infinitesimal $\delta > 0$ such that all points $\delta$ from $\vec{x}$ are contained within $R$. Below is an illustration of this in two dimensions over some region $R$.

![Interior Point Illustration](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/interior-point.svg "interior point illustration")

Notice that no matter how small we choose $\delta$, all of the points in the disc are contained within $R$. Note that in two dimensions, the set of all points $\delta$ away from $\vec{x}$ is referred to as a "disc" and in three dimensions it is referred to as a "ball". When discussing regions of more than three dimensions, it is common to still refer to this set as a ball.

If no matter how small we select $\delta$ to be, our ball still contains points outside of $R$, then $\vec{x}$ is called a **boundary point**.

![Boundary Point Illustration](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/boundary-point.svg "boundary point illustration")

Since $\vec{x}$ is in $R$, a ball will always contain _some_ points of $R$. The set of all interior points is referred to as the **interior** and the set of all boundary points is called the **boundary**.

A region is **open** if it consists entirely of interior points (the set is equal to is interior) and **closed** if it contains its interior and boundary.

Examples of open sets are any open interval $(a, b)$ where $a, b \in \mathbb{R}$ (if you are not familiar with the symbol $\in$, it means "member of", thus both $a$ and $b$ are real numbers). The interval $[a, b]$ is closed since you cannot select a $\delta$ such that the interval is entirely contained within the interval. Intervals with one $>$ or $<$ condition are open, for instance consider $(a, b]$, point $b$ is a boundary point since it will always contain points outside of the interval no matter what radius you select, whereas $a$ is an interior point, hence the interval is open.

## Limits

We say that a function $f(x_1, x_2)$ approaches the **limit** $L$ as $(x_1, x_2)$ approaches $(a, b)$, and write

$$
\lim_{(x_1, x_2) \rightarrow (a, b)} f(x_1, x_2) = L
$$

if, for every number $\epsilon > 0$, there exists a corresponding number $\delta > 0$ such that for all $(x_1, x_2)$ in the domain of $f$,

$$
\lvert f(x_1, x_2) - L \rvert < \epsilon \,\,\, \text{whenever} \,\,\, 0 < \sqrt{(x_1 - a)^2 + (x_2 - b)^2} < \delta
$$

![Limit Illustration](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/limit-def.svg "limit illustration")

---

A function $f(x_1, x_2)$ is **continuous at the point $(a, b)$** if

1. $f$ is defined at $(a, b)$,
2. $\lim_{(x_1, x_2) \rightarrow (a,b)} f(x_1, x_2)$ exists,
3. $\lim_{(x_1, x_2) \rightarrow (a,b)} f(x_1, x_2) = f(a, b)$.

A function is **continuous** if it is continuous at every point of its domain.

---

Composite functions are continuous at a point $(a, b)$ if the outer function is a continuous univariate function and the inner function is continuous at $(a, b)$; in other words, if $f$ is continuous at $(a, b)$ and $g$ is a univariate continuous function, then

$$
h(x_1, x_2) = g \circ f (x_1, x_2) = g(f(x_1, x_2))
$$

is continuous at $(a, b)$.

For example $f(x_1, x_2) = x_1 - x_2$ is continuous at $(a, b)$ and $e^{x_1}$ is a continuous univariate function, hence

$$
e^{x_1 - y_1}
$$

is continuous at $(a, b)$.
