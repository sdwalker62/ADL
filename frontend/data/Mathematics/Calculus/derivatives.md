# Derivatives

_The derivative is a way of showing that one quantity depends on another, even if it's not immediately obvious how._

## Introduction

We are often interested in quantifying and measuring change in a system. The system under measure can be something as simple as a single variable function such as a line $y=mx+b$ or as complex as our universe. In either case we ask the question, "how did a small change of some quantity result in a change in another?". This commonly happens in real life, where small decisions throughout the day can produce different timelines that are the accumulation of minute decisions people in a large and complex system make. Indeed, you could argue that all of science focuses on the study of change, of cause and effect. While we won't study macro systems where there are countless variables contributing to outcomes, we will focus on smaller systems of one or a handful of independent variables.

One way to capture the effect one variable has on another is through derivatives. Before we move on to formal definitions of derivatives and look at some of their properties, lets introduce some necessary symbology. Since we are mainly discussing change we will look at some different symbols used to represent change. The first is the Greek letter delta, which typically represents a small change in some quantity. Suppose we are working with the variable $x$, then $\Delta x$ is a change in that quantity. This change can be positive or negative. Given two values for $x$, say $x_1$ and $x_2$, we write $\Delta x = x_1 - x_2$ for the change in $x$ between $x_1$ and $x_2$. If this change is infinitesimal, then we would instead write $dx$. Think of the symbol $dx$ as mean "very small", whereas $\Delta x$ can be any change between two acceptable values of $x$.

## Definition

To define a derivative we should first state that derivatives measure the amount of change one variable has on another. This change is expressed as a ratio between the variable that is changing and the one which caused the change:

$$\frac{dy}{dx}$$

In this fraction the numerator is the variable that changes with respect to $x$. The variable that we are measuring the effect of is the variable on the denominator. Note that there are many different ways that Mathematicians represent derivatives. It is common in differential equations to treat the derivative as a multiplier:

$$ \frac{d}{dx} y $$

where the variable on the right is the one that is dependent on $x$. Given a function $y=f(x)$, it is common to see an apostrophe to represent a derivative: $f'(x)$. Some textbooks will also use an uppercase $D$, $D_x f(x)$, but this is not nearly as common as the others and is mainly used in Physics and Differential Equations. We will stick to the first way, using $dx$ and $dy$ since this is the most intuitive way.

The formal definition of a derivative is the limit definition. An interesting historical note is that the letter $h$ is used in the definition through German convention. Mathematicians still use it today, although $\Delta x$ is becoming more common.

Given some function $f(x)$, we can measure a small change in the function's value given a small change in $x$ by examining the ratio of the function difference $f(x + \Delta x) - f(x)$ to the change in $x$ given by the calculation $x + \Delta x - x$:

$$ \frac{f(x+\Delta x) - f(x)}{x + \Delta x - x} = \frac{f(x+\Delta x) - f(x)}{\Delta x}$$

Derivatives measure "instantaneous" change, meaning $\Delta x$ cannot be arbitrarily large, it needs to be infinitesimally small. We can achieve this by taking the limit as $\Delta x$ approaches zero:

$$\lim_{\Delta x \rightarrow 0} \frac{f(x+\Delta x) - f(x)}{\Delta x} = \frac{df}{dx}$$

If this limit exists, then the derivative exists. There is another requirement that must be satisfied, namely that the domain must contain an open ball around $x$ that contains $x$. Our goal is not to teach Real Analysis, but it is a caveat that needs to be stated in case there are any Mathematicians reading this. Note that if a function $f$ has a derivative at $x=a$, then $f$ is continuous at $x=a$.

If this limit exists for every point in the function's domain, then the function is **differentiable**.

## Rules of Differentiation

I will not exhaustively define all of the rules of differentiation here, but will include some basic ones for quick reference. The goal of this document is to provide some intuition behind quantifying change as we build up to partial derivatives and onto Deep Learning.

### Constants

Since derivatives the change in one variable in a relation to another, the derivative of a constant must be zero. If $f(x) = c$, then

$$ \frac{df}{dx} = \frac{d}{dx} c = 0$$

This is fairly straightforward to prove from the definition of a limit. If you feel uneasy with proofs you can feel free to skip them whenever they show up in this document, although I would encourage you to read them and even attempt them, it is the best way to learn Mathematics.

If $f(x) = c$ is a constant function, then any change in that function's domain yields the same value. For instance if $f(x) = 5$ for all values of $x$ on the real number line, then $f(x) = 5$ and $f(x + \Delta x) = 5$, hence

$$
\begin{aligned}
\frac{df}{dx} &= \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{c - c}{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{0}{\Delta x} \\
&= \lim_{\Delta x \to 0} 0 \\
&= 0
\end{aligned}
$$

### Polynomials

The first rule that is often taught is the derivative of a polynomial. This will be the only rule we derive, just to expose the reader to how these rules come into existence.

Before deriving the formula, we need to quickly talk about the Binomial Theorem and polynomial expansions. You will often run into expressions of the form $(x+y)^n$ where $n$ is some integer. The expansion of this expression for the first few values of $n$ are as follows:

$$
\begin{aligned}
(x+y)^0 &= 1 \\
(x+y)^1 &= (x+y) \\
(x+y)^2 &= x^2 + 2xy + y^2 \\
(x+y)^3 &= x^3 + 3x^2y + 3xy^2 + y^3 \\
(x+y)^4 &= x^4 + 4x^3y + 6x^2y^2 + 4xy^3 + y^4 \\
(x+y)^5 &= x^5 + 5x^4y + 10x^3y^2 + 10x^2y^3 + 5xy^4 + y^5
\end{aligned}
$$

Do you notice a pattern forming? Notice that there is no $y$ term in the first quantity of the expansion, but $y$ is present in all of the following quantities of the summation. We can write a general expansion of this as

$$(x+y)^n = x^n + nx^{n-1}y + \frac{n(n-1)}{2}x^{n-2}y^2 + \cdots + \frac{n(n-1)}{2}x^2y^{n-2} + nxy^{n-1} + y^n$$

Feel free to verify this equation with a few values of $n$. With this formula we can define the derivative of a polynomial:

Let $f(x) = x^n$,

$$
\begin{aligned}
\frac{df}{dx} &= \lim_{\Delta x \rightarrow 0} \frac{f(x+\Delta x) - f(x)}{\Delta x} \\
&= \lim_{\Delta x \rightarrow 0} \frac{(x + \Delta x)^n - x^n}{\Delta x} \\
&= \lim_{\Delta x \rightarrow 0} \frac{x^n + nx^{n-1}\Delta x + \frac{n(n-1)}{2}x^{n-2}\Delta x^2 + \cdots - x^n}{\Delta x} \\
&= \lim_{\Delta x \rightarrow 0} \frac{nx^{n-1}\Delta x + \frac{n(n-1)}{2}x^{n-2}\Delta x^2 + \cdots}{\Delta x} \\
&= \lim_{\Delta x \rightarrow 0} nx^{n-1} + \frac{n(n-1)}{2}x^{n-2}\Delta x + \cdots \\
&= nx^{n-1}
\end{aligned}
$$

Line one is the standard definition of a derivative using the limit definition and line two substitutes the functions in place of $f$. We used the binomial expansion to expand $(x+\Delta x)^n$ on line three. On line four we canceled the two $x^n$ terms and finally on line five we divided all of the terms by $\Delta x$. Finally, on line six we have the result after all of the quantities with $\Delta x$ values are taken to zero (multiplying any amount by zero yields zero).

Keep in mind that coefficients can be factored out using standard limit rules, hence

$$ \frac{d}{dx}cx^n = cnx^{n-1}.$$

## Trigonometric Functions

For the following functions we will show the derivation of the derivative of $\sin(x)$, the rest are computed in a similar manner, using the appropriate trigonometry identities.

Recall the angle sum identity for $\sin(x)$:

$$\sin(x + h) = \sin(x)\cos(h) + \cos(x)\sin(h),$$

we can use this and the limit definition to compute the derivative of sine.

$$
\begin{aligned}
\frac{d \sin(x)}{dx} &= \lim_{\Delta x \to 0} \frac{f(x + \Delta x) - f(x)}{\Delta x} \\
&= \lim_{\Delta x \to 0} \frac{\sin(x + \Delta x) - \sin(x)}{\Delta x}\\
&= \lim_{\Delta x \to 0} \frac{(\sin(x)\cos(\Delta x) + \cos(x)\sin(\Delta x)) - \sin(x)}{\Delta x} \\
&= \lim_{\Delta X \to 0} \frac{\sin(x)\cos(\Delta x - 1) + \cos(x)\sin(\Delta x)}{\Delta x} \\
&= \lim_{\Delta x \to 0} \left(\sin(x)\cdot \frac{\cos(\Delta x - 1)}{\Delta x} \right) + \lim_{\Delta x \to 0} \left(\cos(x)\cdot \frac{\sin(\Delta x - 1)}{\Delta x} \right) \\
&= \sin(x) \cdot \lim_{\Delta x \to 0} \frac{\cos(\Delta x - 1)}{\Delta x} + \cos(x) \cdot \lim_{\Delta x \to 0} \frac{\sin(\Delta x)}{\Delta x} \\
&= \sin(x) \cdot 0 + \cos(x) \cdot 1 \\
&= \cos(x)
\end{aligned}
$$

We will list the rest of the identities below.

$$
\begin{aligned}
\frac{d}{dx} \cos(x) &= -\sin(x) \\
\frac{d}{dx} \tan(x) &= \sec^2(x) \\
\frac{d}{dx} \cot(x) &= - \csc^2(x) \\
\frac{d}{dx} \sec(x) &= \sec(x)\tan(x) \\
\frac{d}{dx} \csc(x) &= -\csc(x)\cot(x)
\end{aligned}
$$

![Epsilon-Delta Limit](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/calculus/derivatives/epsilon-delta.svg "epsilon-delta-limit")

![Product Rule](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/calculus/derivatives/product-rule.svg "product-rule")

![Chain Rule](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/calculus/derivatives/chain-rule.svg "chain-rule")
