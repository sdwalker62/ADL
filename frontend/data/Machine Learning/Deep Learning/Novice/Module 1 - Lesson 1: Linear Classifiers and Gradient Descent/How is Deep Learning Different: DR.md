# How is Deep Learning Different? Distributed Representations

In this section, we will talk about how Deep Learning is different in terms of distributed representation.

![Three Viewpoints](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/three%20types%20of%20learning%202.png)

A third aspect that is interesting in Deep Learning is that it employs distributed representation, that is, no single value in the model, also known as a neuron, encodes everything and no single neuron encodes one particular thing either. It is really the concert of multiple values or multiple neurons in the representation working together that really forms its richness and allows us to perform successful tasks such as classification. Here is an example of local versus distributed representation. Suppose that you would like to classify a set of shapes, you can employ a sparse representation similar to a one-hot representation where each node represents one particular shape.

![DR1](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/dr1.png)

For example, the first node represents a vertical rectangle, while the second node represents a horizontal rectangle, and the third node represents a vertical oval, and so on.

A more interesting representation could be one that represents key attributes or dimensions of the data that actually can be combined together.

![DR2](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/dr2.png)

So for example, here, there are really two attributes. One is the orientation, the other is the shape type. And so we can have nodes that represents vertical versus horizontal, and we can also have nodes that represent rectangles versus ellipses.

Note that by doing this, we can then combine multiple values together to represent many different shapes. And for example, if our training set only had one particular combination of these things, for example, there was only a vertical rectangle, there were no horizontal rectangles in our training set, yet there were vertical and horizontal ovals, then we can still learn this representation and generalize from it to actually classify things like horizontal rectangles, even though they have never been in our training set.

![DR3](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/dr3.png)

One interesting aspect of distributed representations is that you can perform various combinations with them. So if you have a local representation that actually represents the vertical rectangle, horizontal rectangle, and horizontal ellipse, combining them doesn't make much sense. However, if we have a distributed representation where each node represents important attributed of features of the data then we can combine them. For example, if we have a node that represents vertical and another one that represents horizontal, and a third that represents ellipses. If we combine all three of those attributes, we could get a circle. So again, the key power of this is that we can actually combine these representations in complex ways, even though, for example, the training data did not have all combinations.

In summary, there are many interesting aspects to Deep Learning that make it successful. Deep Learning employs hierarchical compositional structures by combining linear and non-linear transformations over and over again to create a rich function and representation. It employs end-to-end learning where features are not hand-designed, but rather we feed in raw data and we end-to-end optimize both the features and the classifiers together. And finally, Deep Learning employs distributed representations where no single neuron encodes everything. We have very complex representations that can be combined in a interesting way to generalize to new types of object or pieces of data that did not exist in the training set.
