# 拼车使用教程

## 1. 安装官方原版的 Claude Code

需要 Node.js 版本 18 或更高版本：

```shell
npm install -g @anthropic-ai/claude-code
```

## 2. 运行

拼车成功后，您会收到一条消息，包含您的 ANTHROPIC_AUTH_TOKEN 和 ANTHROPIC_BASE_URL，然后可以运行：

```shell
cd your-project-folder
export ANTHROPIC_BASE_URL=我们给你的URL
export ANTHROPIC_AUTH_TOKEN=我们给你的TOKEN
claude
```

## 3.设置环境变量

如果不想每次运行 claude 命令时都设置环境变量，可以将这些环境变量写入您的 shell 配置文件中。如果您使用的是 bash 或 zsh，可以将以下内容添加到您的 ~/.bash_profile、~/.bashrc 或 ~/.zshrc 文件中：

```shell
cd your-project-folder
export ANTHROPIC_BASE_URL=我们给你的URL
export ANTHROPIC_AUTH_TOKEN=我们给你的TOKEN
claude
```

重启终端后，就可以直接使用 claude 命令来使用了，不需要每次设置环境变量。
