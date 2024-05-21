# Poetry

![Poetry Logo](https://adl-imgs.nyc3.cdn.digitaloceanspaces.com/poetry-logo.svg "Poetry logo")

_Poetry is a dependency manager for Python_

## Introduction

The standard package manager for Python is `pip`. More than likely `pip` is installed alongside Python. A natural question for anyone considering `poetry` is what are the current deficiencies of `pip` that make installing `poetry` worth the effort. Both tools are capable and widely used, but here are some things to consider when thinking of using `poetry`:

1. `pip` is not deterministic since it is intended to be used alongside other projects and thus renders dependency pinning a non-starter. For instance if you have two projects A and B, and project A requires `package>=0.1.2a` and project B requires `package==0.1.3`, then pinning the packages version will break the environment. Hence `poetry` recommends installing itself in a dedicated environment using a tool such as `conda` so that pinned package versions do not create conflicts. `pip` will resolve the above environment by setting `package==0.1.3`, satisfying both project requirements. The problem with this is that you often want a deterministic dependency specification since you rely on features in specific package versions. If person B now comes along and only has the requirement that `package>=0.1.2a`, then `pip` will install version `0.1.2a`. `poetry` uses a `poetry.lock` file that will lock the dependencies, ensuring consistent versioning for all users.
2. `pip` is only a package manager and has no additional features. It only allows you to install packages in the PyPI repository. On the otherhand, `poetry` is a dependency manager that allows you to build and push your Python project to a remote repository (whether that is PyPI or something else).
3. `poetry` has a `poetry run` command that allows you to execute scripts with a set of dependencies.
4. `poetry` uses a `pyproject.toml` file to define depedencies and project configuration which is considered a best practice by the Python community. Whereas `pip` uses a `requirements.txt` to define dependencies.
5. `poetry` allows you to define dependency groups. This is helpful when you only need a dependency when developing or testing. For instance, users will not need `sphinx` to generate documentation, but project contributors will need it to update documentation.
6. `poetry` uses pre-commit hooks, which allows you to run commands before `git commit`. An example of this is checking the `poetry.lock` file to ensure it is up-to-date and verifying the `pyproject.toml` is not in a broken state before commiting it to the remote repository.

## Installation

### `pipx`

`pipx` is the recommended way to install `poetry`. Follow the instructions here to install `pipx` for your platform: https://pipx.pypa.io/stable/installation/.

Once it is installed, you can install `poetry` by running

```shell
pipx install poetry
```

It is highly recommended that you do this in a `conda` environment since that will keep your dependencies separate from any other projects on your machine. To install `conda`, follow the directions here: https://docs.anaconda.com/free/miniconda/miniconda-install/

## Post Installation

After installing `poetry` it is recommended that you add completion commands for your shell:

### `bash`

#### Auto-loaded (recommended)

```shell
poetry completions bash >> ~/.bash_completion
```

#### Lazy-loaded

```shell
poetry completions bash > ${XDG_DATA_HOME:-~/.local/share}/bash-completion/completions/poetry
```

### `fish`

```shell
poetry completions fish > ~/.config/fish/completions/poetry.fish
```

### `zsh`

```shell
poetry completions zsh > ~/.zfunc/_poetry
```

then add the following lines to your `~/.zshrc` file if they do not already exist

```shell
fpath+=~/.zfunc
autoload -Uz compinit && compinit
```

### `oh-my-zsh`

```shell
mkdir $ZSH_CUSTOM/plugins/poetry
poetry completions zsh > $ZSH_CUSTOM/plugins/poetry/_poetry
```

then add the following lines to your `~/.zshrc`

```shell
plugins(
	poetry
	...
	)
```

**Make sure to restart your shell for these changes to take effect.**

You will need to source your run commands if you do not want to close your terminal:

```shell
source ~/.zshrc | source ~/.bashrc
```

## Basic Usage

### Setup

#### New Project

To create a new project use `poetry new`

```shell
poetry new REPO_NAME
```

This will initialize a new Python project and will populate the repository with some basic files such as the `pyproject.toml`.

After running this command you should have the following project structure:

```
REPO_NAME
├── pyproject.toml
├── README.md
├── REPO_NAME
│   └── __init__.py
└── tests
    └── __init__.py
```

The `toml` file it generates should be similar to

```toml
[tool.poetry]
name = "REPO_NAME"
version = "0.1.0"
description = ""
authors = ["Athena ML, Contributors."]
readme = "README.md"
packages = [{include = "poetry_demo"}]

[tool.poetry.dependencies]
python = "^3.7"


[build-system]
requires = ["poetry-core"]
build-backend = "poetry.core.masonry.api"
```

#### Existing Project

If you already have a Python project and want to use Poetry as your dependency manager/build system then use `poetry init`.

```shell
cd REPO_NAME
poetry init
```

### Operating Modes

`poetry` has two operating modes: **package** and **non-package** mode. In package mode, `poetry` will build and package your project (into a `sdist` or `wheel`) as well as act as a depenency manager. It will also push your built package to PyPI or whatever package index you use. In non-package mode Poetry will simply act as a dependency manager. Note that when using the package mode, `poetry` will install your package in **editable** mode, allowing Python to detect changes made to your code as you make them (similar to `pip install -e .`).

### Specifiying Dependencies

To specify new dependencies you need to will define the package name and dependency in the `pyproject.toml` file. For instance to install `pendulum` write

```toml
[tool.poetry.dependencies]
pendulum = "^2.1"
```

using semantic versioning. You can skip editing the `pyproject.toml` directly by using `poetry add`:

```shell
poetry add pendulum
```

### Installing Dependencies

Note that when you use `poetry add` or edit the `pyproject.toml` file it does not automatically install those dependencies, it simply defines them in the specification. To complete the install, run `poetry install`.
