# YOLOv8 Introduction

## Setup

In this tutorial we will use Mamba to manage our Python version. Other package managers can be used, just insure you are using Python 3.8 or above and PyTorch 1.7 or above.

### Mamba

Assuming you already have Mamba, create a new environment for the install. If you don't have Mamba, follow any of the available guides to install Mamba on your host machine. Personally, I recommend mambaforge which can be installed using this link:

https://github.com/conda-forge/miniforge#mambaforge

Make sure to follow the guide for your platform (`x86_64` vs `aarch64` ...).

Mamba uses Conda to setup the environment since it just wraps Conda. Thus, we will create our environment using the same command

```shell
mamba create -n 'yolov8'
```

$$
(3.20) \quad \, \, q_*(s, a) = \mathbb{E}[R_{t+1} + \gamma \max_{a'} q_* (S_{t+1}, a') \mid S_t =s, A_t=a] \\
\quad \quad \quad \quad \quad \quad  \quad \, \, = \sum_{s', r} p(s', r \mid s, a)[r + \gamma \max_{a'}(s', a')].
$$

$$ \frac{1}{2} $$

$$1+2$$

| Item         | Price    | # In stock |
| ------------ | -------- | ---------- |
| Juicy Apples | 1.99     | _7_        |
| Bananas      | **1.89** | 5234       |

If this doesn't work and you just installed Mamba, you need to restart your shell or re-run your shell's init file. As an example, if you are using bash then run `source ~/.bashrc` Now activate this environment:

```shell
mamba activate yolov8
```

### Python

Now we will install the correct version of Python. At the time of writing, the appropiate version of Python is 3.8 or above.

```shell
mamba install python=3.8
```

### PyTorch

To install PyTorch we will use the `conda-forge` channel:

```shell
mamba install pytorch torchvision torchaudio pytorch-cuda=11.7 -c pytorch -c nvidia
```

### YOLOv8

Now we can install YOLOv8 using `pip`:

```shell
pip install ultralytics
```

### Roboflow

We will use Roboflow to obtain data to train our model. We can install this using `pip`

```shell
pip install roboflow
```

### Jupyterlab

I would highly recommend using Jupyterlab for Machine Learning studies. Jupyterlab provides a REPL that will allow us to work with code in a more interactive way.

We will install jupyterlab using `pip`:

```shell
pip install jupyterlab
```

This ends the setup section. We will now prepare our data for YOLOv8 in the next section.

---

## Data Preparation

To prepare our data we will use a utility called Roboflow:

https://roboflow.com/

This is a free utility that will allow us to label data and then create training, dev, and test sets.

To find readily available datasets look at Roboflow Universe:

https://universe.roboflow.com/

In this tutorial we will use the Double Twelve Dominoes Detection dataset:

https://universe.roboflow.com/pip-tracker/double-twelve-dominoes

To obtain this dataset go to the Dataset section on the left-hand side of the main screen and download the dataset matching YOLOv8.

The fragment of code you that will download the dataset will look something like this:

```python
rf = Roboflow(api_key=__API_KEY__)
project = rf.workspace("pip-tracker").project("double-twelve-dominoes")
dataset = project.version(2).download("yolov8")
```

With `__API_KEY__` replaced with the specific to your account. This will download the data into your current directory.

Look specifically for the `data.yaml` file in the downloaded directory. This will setup the training data for YOLOv8. In this file there are a few things we need to double check:

1. We can modify the names in this file under the `name` section.
2. Make sure the test, train, and val sets are using the correct paths.

---

## Training the Model

### Setting up the model

To train the model we will need to select which model we want to train. We can select either a blank model or a pre-trained model. To train a blank model use

```python
model = YOLO("yolov8n.yaml")
```

where the `n` stand for `nano`. You can exchange this value for whatever size mode you want. Keep in mind that bigger does not always mean better, and depending on your platform it might be better to select a smaller model.

If you want to fine tune a pre-trained model use

```python
model = YOLO("yolov8n.pt")
```

This will download a pre-trained YOLOv8-nano model to your machine to be fine-tuned on your dataset.

### Training your model

The command to train our model is

```python
model.train(data="__ABSOLUTE_PATH_TO_DATA.YAML__", epochs=__NUM_OF_EPOCHS__)  # train the model
```

You will need to adjust the number of epochs depending on the size and complexity of the model.

### Evaluate the Model

To evaluate the model on the test set use

```python
metrics = model.val()
```

This will produce statistics for each class. If the performance of your model is low you might need better/more data or adjust the hyperparameters of your model.

### Evaluate on a specific media

To use your own image/video run

```python
results = model("___PATH_TO_MEDIA___")
```

---

## Notebook

Here is the full notebook for reference, with personal details redacted:

```python
from ultralytics import YOLO
from roboflow import Roboflow
```

```python
import torch
print(f'Is CUDA available: {torch.cuda.is_available()}')
print(f'Number of GPUs: {torch.cuda._device_count_nvml()}')
```

```python
rf = Roboflow(api_key="__API_KEY__")
project = rf.workspace("pip-tracker").project("double-twelve-dominoes")
dataset = project.version(2).download("yolov8")
```

```python
model = YOLO("yolov8n.pt")
```

```python
model.train(data="/home/dwalker/dev/work/yolov8/Double-twelve-dominoes-2/data.yaml", epochs=100)
```

```python
metrics = model.val()
```

```python
trained_model = YOLO('/home/dwalker/dev/work/yolov8/runs/detect/train3/weights/best.pt')
```

```python
results = trained_model("/home/dwalker/dev/work/yolov8/6998a487-db76-4051-bb16-ce6cc9dac0fa.0919efc649321c2c244a6d84503c77c1.webp", augment=True, imgsz=640, show=True)
```
