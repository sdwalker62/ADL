# How is Deep Learning Different? End-to-End Learning

In this section, we will discuss how Deep Learning models are not only compositional, but they can be optimized end-to-end using just raw data.

One term that is strongly associated with Deep Learning is end-to-end learning. Here the idea is that learning is applied to the entire spectrum from raw data to features extraction to classification. And so, again, in contrast to traditional Machine Learning, we will actually learn features automatically from raw data. As mentioned before, traditional Machine Learning employed handcrafted feature extraction. And so this is limiting, because each modality a number of experts have to develop these features in order to determine what is important. And not only that, but each modality, such as images for example, have many different features that different researchers have developed.

![SIFT-HOG](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/SIFT-HOG.png)

And it is not clear which are the best features to employ for your particular application. And so traditional Machine Learning employed feature extraction through hand-engineered methods and then learned a classifier.

![ML1](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/ML1.png)

Deep Learning, on the other hand, moves this back, such that again, we are only given the raw data.

![ML2](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/ML2.png)

And then all of the other things after that, including feature extraction, are automatically learned.

So while shallow models use fixed, hand-crafted features and then learned a classifier, Deep Learning, again, on the other hand learned trainable feature transformation and then at the end learned classifiers.

![ML3](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/machine_learning/deep_learning/novice/ML3.png)

And the line between feature extraction and classification is actually rather blurry. We have a deep model that has many different compositional parts. And at each portion there is some complex transformation that is learned for the data. And then by the end the key idea is to learn very separable feature representations that can be easily classified.
