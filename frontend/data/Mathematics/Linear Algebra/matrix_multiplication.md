# Matrix Multiplication

_Matrix multiplication is used in many applications and is a fundamental operation in linear algebra. It has a rich and beautiful theory, which is often hidden behind the mechanical process of multiplying rows and columns._

## Introduction

The rules behind matrix multiplication may seem arcane at first, but they are easy to memorize. We will give an intuitive answer at the end of this document once the mechanics of matrix multiplication are explained.

## Definition

First we will provide the formal definition of matrix multiplication and in the next section we will work through a practical example.

If you need a refresher on any of the notation below, see the "Matrix Basics" document for more information.

If $A = [a_{ij}]$ is an $m \times n$ matrix and $B=[b_{ij}]$ is an $n \times p$ matrix, then the **product AB** is an $m \times p$ matrix

$$ AB = [c_{ij}]$$

where

$$c_{ij} = \sum_{k=1}^n a_{ik}b_{kj} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots + a_{in}b_{nj} $$

## Practical Example

We will start with two small matrices $A$ and $B$:

$$
A = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}
$$

and

$$
B = \begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix}.
$$

To find the product $AB$ we will set it equal to $C$ and look at how each element of $C$ is computed:

$$
AB = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}\begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix} = \begin{bmatrix}
c_{11} & c_{12} \\
c_{21} & c_{22} \\
c_{31} & c_{32}
\end{bmatrix}
$$

The first value $c_{11}$ is computed by taking the first row in $A$ and the first column $B$,

$$c_{11} = (-1)(-3) + (3)(-4) = -9.$$

An easy way to remember this is that you take the row of the value being computed (in this case 1) and take the corresponding row from the first matrix in the product $A$. In this case, that is $[-1, 3]$. We then look at the column of the value to be computed (again 1) and take the corresponding column from the second matrix, $B$: $[-3; -4]$.

After performing the computation we have the following matrix:

$$
AB = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}\begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix} = \begin{bmatrix}
-9 & c_{12} \\
c_{21} & c_{22} \\
c_{31} & c_{32}
\end{bmatrix}
$$

Lets compute the value of the second position, $c_{12}$. We will take the first row of $A$ and the second column of $B$ and take their inner product (note this is just an easy way to describe this calculation and matrix multiplication is not comprised of a series of inner products).

$$c_{12} = (-1)(2) + (3)(1) = 1$$

That completes the first row of $C$:

$$
AB = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}\begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix} = \begin{bmatrix}
-9 & 1 \\
c_{21} & c_{22} \\
c_{31} & c_{32}
\end{bmatrix}
$$

The second row can be computed by taking the second row of $A$ and the first and second columns of $B$ for each value of $C$ respectively,

$$c_{21} = (4)(-3) + (-2)(-4) = -4$$

and

$$c_{22} = (4)(2) + (-2)(1) = 6. $$

This yields the following matrix $C$:

$$
AB = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}\begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix} = \begin{bmatrix}
-9 & 1 \\
-4 & 6 \\
c_{31} & c_{32}
\end{bmatrix}
$$

To compute the last row of $C$, we will repeat this process with the last row of $A$ and the first and second columns of $B$.

$$c_{31} = (5)(-3) + (0)(-4) = -15$$

and

$$c_{32} = (5)(2) + (0)(1).$$

This completes the multiplication and gives

$$
AB = \begin{bmatrix}
-1 & 3 \\
4 & -2 \\
5 & 0
\end{bmatrix}\begin{bmatrix}
-3 & 2 \\
-4 & 1
\end{bmatrix} = \begin{bmatrix}
-9 & 1 \\
-4 & 6 \\
-15 & 10
\end{bmatrix}
$$

### Matrix Multiplication Requirements

For two matrices to be multiplied, it is necessary that their inner dimensions agree. If the dimensions of $A$ are $m \times n$, then the first dimension of $B$ must be $n$. In the above example we had $3 \times 2$ and $2 \times 2$, so we could multiply the matrices.

### Matrix Multiplication In More Dimensions

The pattern described above works for matrices of any dimensions (as long as the two multiplied matrices inner dimensions agree). Taking the inner product of the corresponding row of the first matrix and the column of the second work for all multipliable matrices.

$$
\begin{bmatrix}
a_{11} & a_{12} & \cdots & a_{1n} \\
a_{21} & a_{22} & \cdots & a_{2n} \\
\vdots & \vdots & & \vdots \\
a_{i1} & a_{i2} & \cdots & a_{in} \\
\vdots & \vdots & & \vdots \\
a_{m1} & a_{m2} & \cdots & a_{mn}
\end{bmatrix}
\begin{bmatrix}
b_{11} & b_{12} & \cdots & b_{1j} & \cdots & b_{1p} \\
b_{21} & b_{22} & \cdots & b_{2j} & \cdots & b_{2p} \\
\vdots & \vdots & & \vdots & & \vdots \\
b_{n1} & b_{n2} & \cdots & b_{nj} & \cdots & b_{np} \\
\end{bmatrix}
=
\begin{bmatrix}
c_{11} & c_{12} & \cdots & c_{1j} & \cdots & c_{1p} \\
c_{21} & c_{22} & \cdots & c_{2j} & \cdots & c_{2p} \\
\vdots & \vdots & & \vdots & & \vdots \\
c_{i1} & c_{i2} & \cdots & c_{ij} & \cdots & c_{ip} \\
\vdots & \vdots & & \vdots & & \vdots \\
c_{m1} & c_{m2} & \cdots & c_{mj} & \cdots & c_{mp} \\
\end{bmatrix}
$$

where

$$c_{ij} = a_{i1}b_{1j} + a_{i2}b_{2j} + \cdots a_{in}b_{nj}$$

## Properties

There are a few properties of matrix multiplication that are good to remember:

- $A(BC) = (AB)C$ (associative property)
- $A(B+C) = AB + AC$ (distributive property)
- $(A+B)C = AC + BC$ (distributive property)
- $c(AB) = (cA)B = A(cB)$

These properties follow from the definition, and can be proven without any additional mechanics. Since matrix multiplication is associative, we usually drop any parentheses, and simply write $ABC$.

Note that $AB \neq BA$. This is easily shown with an example:

Let

$$
A = \begin{bmatrix}
1 & 3 \\
2 & -1
\end{bmatrix}
$$

and

$$
B = \begin{bmatrix}
2 & -1 \\
0 & 2
\end{bmatrix}
$$

then $AB$ equals

$$
AB = \begin{bmatrix}
1 & 3 \\
2 & -1
\end{bmatrix}\begin{bmatrix}
2 & -1 \\
0 & 2
\end{bmatrix}=\begin{bmatrix}
2 & 5 \\
4 & -4
\end{bmatrix}
$$

yet

$$
BA = \begin{bmatrix}
2 & -1 \\
0 & 2
\end{bmatrix}\begin{bmatrix}
1 & 3 \\
2 & -1
\end{bmatrix}=\begin{bmatrix}
0 & 7 \\
4 & -2
\end{bmatrix}
$$

Sometimes $AB=BA$, but in general this isn't true.
