# How is Deep Learning Different? Hierarchical Compositionality

In this section, we will cover how Deep Learning is different from traditional Machine Learning algorithms that you may know already.

There are several concepts that Deep Learning employs to be successful, and several terms that are used in association with it. For example, Representation Learning. Unlike prior Machine Learning methods, Deep Learning takes in the raw data such as images, audio and text, and automatically learns a feature representation for that raw data. That representation is often compact so dimensionality is reduced severely. In order to really take out the key features that are important to perform the underlying tasks such as image classification, or audio text classification.

Neural Networks are by far the most dominant way to implement Deep Learning methods. Although note that other probabilistic models and methods can also be considered deep. Finally, Deep Learning can tackle using the same underlying technique, a range of Machine Learning problems, including Unsupervised Learning, Reinforcement Learning, and so on. And so all of these concepts really are what define Deep Learning.

There are three main kind of concepts that we will cover here in order to differentiate Deep Learning from prior methods.

![three-concepts](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/3concepts.png)

1. The first is that Deep Learning is one that is hierarchical or compositional. We will have a cascade of linear and non-linear transformation and multiple layers of representations that are learned.
2. There is also the concept of end-to-end learning, meaning that we will feed in raw data, we will have some very complex model with many parameters, and then we will have an output. And then we will end-to-end optimize this entire chain from input, to model, to output. And hence, we are going to also learn feature extraction. We are not going to perform hand engineering of features that will feed Deep Learning, just like we did in prior Machine Learning methods. Instead, we will automatically learn these features.
3. And finally, Deep Learning will have a distributed representation that is learned. No single neuron in the neural network will encode one particular thing or everything. Each neuron will encode some mixture of complicated thing and it will be hard to disentangle what exactly each neuron is capturing. But over multiple neurons, we will be able to have a very rich representation that is sufficient to capture what we need to perform successful classification and regression.

From your prior Machine Learning classes, you probably realized the importance of feature engineering or feature extraction. In traditional Machine Learning for each modality such as vision, speech, or text in Natural Language Processing, an expert had to determine what features are important in the raw data in order to feed those features into a particular classifier such as, Support Vector Machines or Random Forest.

![three-modalities](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/vision-speech-nlp.png)

And so this is a very cumbersome process where for each new modality, an expert is needed in order to extract and figure out these features.

A key idea in Deep Learning is to learn these features rather than hand engineer them. One of the key principles by which we can do this hierarchical compositionally. Specifically, the world is compositional, no matter what modality of data you are dealing with.

In vision, we have pixels that create edges, we have what are called motifs such as circular shapes or corners that we can detect. We have object parts and then entire object and so on.

In speech we have samples that are forming spectral bands that then define things like phonemes and words.

In Natural Language Processing, we have characters and words and clauses and sentences and stories and so on.

![three-modalities2](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/three-modalities-transform.png)

One of the key features of Deep Learning is that we will be able to automatically learn feature representations. And the reason we can do this is because we will have hierarchical or compositional models that mirrors this natural compositionally in the world.

Because we mirror what actually is the structure in the real world, we are able to more easily learn features.

The way we achieve this is by making our models themselves compositional. This is not a new idea, for example in boosting or kernel based methods, often we had a linear combination of different elements.

![DL1](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/DL1.png)

Similarly, in Deep Learning, we will have a composition of very simple functions to form a very complex function. However, the composition will become very deep in that we will have a very large number of modules all sequence together in various structures.

![DL2](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/DL2.png)

And so we can really form very complex functions that form rich representations for our data. The key power of this idea is we are not limited to any particular function.

![DL3](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/DL3.png)

We can have logs, cosines, exponential and so on. Really, we can have any function that is differentiable. And as long as that function is differentiable, we can put it in with other modules arbitrarily.

Here is a concrete example showing how we can take an image and learn a compositional representation for that image, such that by the end, we learn representations that are very discriminative. To determine whether the image contains a car or something else. Below is a visualization of the actual features that are learned at a low level. These are low-level edge based features that are actually very similar to those learned in the brain at the early visual system. For mod-level features, you can see that the model has learned things like circular shapes or corners and so on, these are called motifs. And so it is able to learn again mid-level representations that are more abstract than the low level ones. at the high-level, it can learn things like object parts, and so on.

![ml-discriminative](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/ml-discriminative.png)

And so each level here is composing information from the earlier levels. And so for example, edges are combined to form things like corners and corners and shapes are combined to form object parts. And finally, the object parts are so discriminative for the classes, such that we can actually employ any trainable classifier including Support Vector Machines or traditional Machine Learning methods. The key thing is that you can see nice features that are learned here after a long training period. However, these are actually initialized randomly, so if we just saw them in the beginning they would just be speckled noise. And over time though gradient descent and the optimization procedure, the model becomes better and better and is actually able to automatically learn that it should have low-level, mid-level, and high-level features. And this is one of the key powers that Deep Learning has that did not exist in traditional Machine Learning.
