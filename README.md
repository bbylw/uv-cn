# uv

<a href="https://pypi.python.org/pypi/uv"><img src="https://img.shields.io/pypi/v/uv.svg" alt="Latest PyPI version" /></a>
<a href="https://pypi.python.org/pypi/uv"><img src="https://img.shields.io/pypi/pyversions/uv.svg" alt="Supported Python versions" /></a>
<a href="https://discord.gg/astral-sh"><img src="https://img.shields.io/badge/Discord-%235865F2.svg?logo=discord&logoColor=white" alt="Discord" /></a>

一个用 Rust 编写的极速 Python 包与项目管理器。

<p align="center">
  <picture align="center">
    <source media="(prefers-color-scheme: dark)" srcset="https://github.com/astral-sh/uv/assets/1309177/03aa9163-1c79-4a87-a31d-7a9311ed9310">
    <source media="(prefers-color-scheme: light)" srcset="https://github.com/astral-sh/uv/assets/1309177/629e59c0-9c6e-4013-9ad4-adb2bcf5080d">
    <img alt="Shows a bar chart with benchmark results." src="https://github.com/astral-sh/uv/assets/1309177/629e59c0-9c6e-4013-9ad4-adb2bcf5080d">
  </picture>
</p>

<p align="center">
  <i>使用热缓存安装 <a href="https://trio.readthedocs.io/">Trio</a> 的依赖。</i>
</p>

## 亮点

- 一个工具即可替代 `pip`、`pip-tools`、`pipx`、`poetry`、`pyenv`、`twine`、`virtualenv` 等。
- 比 `pip` [快 10 到 100 倍](https://github.com/astral-sh/uv/blob/main/BENCHMARKS.md)。
- 提供[全面的项目管理](#projects)，并带有[通用锁文件](https://docs.astral.sh/uv/concepts/projects/layout#the-lockfile)。
- [运行脚本](#scripts)，并支持[内联依赖元数据](https://docs.astral.sh/uv/guides/scripts#declaring-script-dependencies)。
- [安装与管理](#python-versions) Python 版本。
- [运行与安装](#tools) 以 Python 包形式发布的工具。
- 内置[兼容 pip 的接口](#the-pip-interface)，在熟悉的命令行下获得性能提升。
- 支持 Cargo 风格的 [workspaces（工作区）](https://docs.astral.sh/uv/concepts/projects/workspaces)，便于项目规模化。
- 磁盘空间高效利用，通过[全局缓存](https://docs.astral.sh/uv/concepts/cache) 实现依赖去重。
- 无需 Rust 或 Python，通过 `curl` 或 `pip` 即可安装。
- 支持 macOS、Linux 与 Windows。

uv 由 [Astral](https://astral.sh) 提供支持，其也是 [Ruff](https://github.com/astral-sh/ruff) 与 [ty](https://github.com/astral-sh/ty) 的创造者。

## 安装

通过我们的独立安装器安装 uv：

```bash
# 在 macOS 和 Linux 上。
curl -LsSf https://astral.sh/uv/install.sh | sh
```

```bash
# 在 Windows 上。
powershell -ExecutionPolicy ByPass -c "irm https://astral.sh/uv/install.ps1 | iex"
```

或者，从 [PyPI](https://pypi.org/project/uv/) 安装：

```bash
# 使用 pip。
pip install uv
```

```bash
# 或 pipx。
pipx install uv
```

如果通过独立安装器安装，uv 可自我更新到最新版本：

```bash
uv self update
```

查看[安装文档](https://docs.astral.sh/uv/getting-started/installation/)了解详情与其他安装方式。

## 文档

uv 的文档位于 [docs.astral.sh/uv](https://docs.astral.sh/uv)。

此外，可使用 `uv help` 查看命令行参考文档。

## 功能

<a id="projects"></a>
### 项目

uv 管理项目依赖与环境，支持锁文件、工作区等，类似于 `rye` 或 `poetry`：

```console
$ uv init example
Initialized project `example` at `/home/user/example`

$ cd example

$ uv add ruff
Creating virtual environment at: .venv
Resolved 2 packages in 170ms
   Built example @ file:///home/user/example
Prepared 2 packages in 627ms
Installed 2 packages in 1ms
 + example==0.1.0 (from file:///home/user/example)
 + ruff==0.5.0

$ uv run ruff check
All checks passed!

$ uv lock
Resolved 2 packages in 0.33ms

$ uv sync
Resolved 2 packages in 0.70ms
Checked 1 package in 0.02ms
```

查看[项目文档](https://docs.astral.sh/uv/guides/projects/)开始使用。

uv 还支持构建与发布项目，即使这些项目并非由 uv 管理。详见[发布指南](https://docs.astral.sh/uv/guides/publish/)。

<a id="scripts"></a>
### 脚本

uv 为单文件脚本管理依赖与环境。

创建新脚本，并添加声明其依赖的内联元数据：

```console
$ echo 'import requests; print(requests.get("https://astral.sh"))' > example.py

$ uv add --script example.py requests
Updated `example.py`
```

随后，在隔离的虚拟环境中运行该脚本：

```console
$ uv run example.py
Reading inline script metadata from: example.py
Installed 5 packages in 12ms
<Response [200]>
```

查看[脚本文档](https://docs.astral.sh/uv/guides/scripts/)开始使用。

<a id="tools"></a>
### 工具

uv 执行并安装由 Python 包提供的命令行工具，类似于 `pipx`。

使用 `uvx`（`uv tool run` 的别名）在临时环境中运行工具：

```console
$ uvx pycowsay 'hello world!'
Resolved 1 package in 167ms
Installed 1 package in 9ms
 + pycowsay==0.0.0.2
  """

  ------------
< hello world! >
  ------------
   \   ^__^
    \  (oo)\_______
       (__)\       )\/\
           ||----w |
           ||     ||
```

使用 `uv tool install` 安装工具：

```console
$ uv tool install ruff
Resolved 1 package in 6ms
Installed 1 package in 2ms
 + ruff==0.5.0
Installed 1 executable: ruff

$ ruff --version
ruff 0.5.0
```

查看[工具文档](https://docs.astral.sh/uv/guides/tools/)开始使用。

<a id="python-versions"></a>
### Python 版本

uv 安装 Python，并可快速在多个版本之间切换。

安装多个 Python 版本：

```console
$ uv python install 3.12 3.13 3.14
Installed 3 versions in 972ms
 + cpython-3.12.12-macos-aarch64-none (python3.12)
 + cpython-3.13.9-macos-aarch64-none (python3.13)
 + cpython-3.14.0-macos-aarch64-none (python3.14)

```

按需下载 Python 版本：

```console
$ uv venv --python 3.12.0
Using Python 3.12.0
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate

$ uv run --python pypy@3.8 -- python --version
Python 3.8.16 (a9dbdca6fc3286b0addd2240f11d97d8e8de187a, Dec 29 2022, 11:45:30)
[PyPy 7.3.11 with GCC Apple LLVM 13.1.6 (clang-1316.0.21.2.5)] on darwin
Type "help", "copyright", "credits" or "license" for more information.
>>>>
```

在当前目录使用指定的 Python 版本：

```console
$ uv python pin 3.11
Pinned `.python-version` to `3.11`
```

查看[Python 安装文档](https://docs.astral.sh/uv/guides/install-python/)开始使用。

<a id="the-pip-interface"></a>
### pip 接口

uv 可作为常用 `pip`、`pip-tools` 与 `virtualenv` 命令的即插即用的替代品。

uv 通过高级功能扩展了这些接口，例如依赖版本覆盖、平台无关的解析、可复现的解析、替代解析策略等。

借助 `uv pip` 接口，无需改变现有工作流即可迁移到 uv，并获得 10 到 100 倍的提速。

将依赖编译为平台无关的需求文件：

```console
$ uv pip compile requirements.in \
   --universal \
   --output-file requirements.txt
Resolved 43 packages in 12ms
```

创建虚拟环境：

```console
$ uv venv
Using Python 3.12.3
Creating virtual environment at: .venv
Activate with: source .venv/bin/activate
```

安装已锁定的依赖：

```console
$ uv pip sync requirements.txt
Resolved 43 packages in 11ms
Installed 43 packages in 208ms
 + babel==2.15.0
 + black==24.4.2
 + certifi==2024.7.4
 ...
```

查看[pip 接口文档](https://docs.astral.sh/uv/pip/index/)开始使用。

## 贡献

我们热忱地支持各经验水平的贡献者，并期待你参与本项目。查看[贡献指南](https://github.com/astral-sh/uv?tab=contributing-ov-file#contributing)开始。

## 常见问题

#### 如何发音 uv？

发音为「you - vee」（[`/juː viː/`](https://en.wikipedia.org/wiki/Help:IPA/English#Key)）

#### 我该如何书写 uv？

请直接写作「uv」。详见[样式指南](https://github.com/astral-sh/uv/blob/main/STYLE.md#styling-uv)。

#### uv 支持哪些平台？

查看 uv 的[平台支持](https://docs.astral.sh/uv/reference/platforms/)文档。

#### uv 可用于生产环境吗？

是的，uv 已稳定并在生产环境中被广泛使用。详见 uv 的[版本策略](https://docs.astral.sh/uv/reference/versioning/)文档。

## 致谢

uv 的依赖解析器底层使用了 [PubGrub](https://github.com/pubgrub-rs/pubgrub)。我们感谢 PubGrub 的维护者，尤其是 [Jacob Finkelman](https://github.com/Eh2406)，给予的支持。

uv 的 Git 实现基于 [Cargo](https://github.com/rust-lang/cargo)。

uv 的部分优化灵感来自我们在 [pnpm](https://pnpm.io/)、[Orogene](https://github.com/orogene/orogene) 与 [Bun](https://github.com/oven-sh/bun) 中看到的出色工作。我们也从 Nathaniel J. Smith 的 [Posy](https://github.com/njsmith/posy) 中学到很多，并借鉴其 [trampoline](https://github.com/njsmith/posy/tree/main/src/trampolines/windows-trampolines/posy-trampoline) 以支持 Windows。

## 许可证

uv 采用以下两种许可之一：

- Apache License, Version 2.0，（[LICENSE-APACHE](https://github.com/astral-sh/uv/blob/main/LICENSE-APACHE) 或
  <https://www.apache.org/licenses/LICENSE-2.0>）
- MIT license（[LICENSE-MIT](https://github.com/astral-sh/uv/blob/main/LICENSE-MIT) 或 <https://opensource.org/licenses/MIT>）

由你自行选择。

除非你另有明确声明，否则按 Apache-2.0 许可的定义，你有意提交以纳入 uv 的任何贡献，均须按上述双重许可授权，不附加任何额外条款或条件。

<div align="center">
  <a target="_blank" href="https://astral.sh" style="background:none">
    <img src="https://raw.githubusercontent.com/astral-sh/uv/main/assets/svg/Astral.svg" alt="Made by Astral">
  </a>
</div>
