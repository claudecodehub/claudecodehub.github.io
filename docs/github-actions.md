# Claude Code GitHub Actions

> 了解如何使用 Claude Code GitHub Actions 将 Claude Code 集成到您的开发工作流程中

Claude Code GitHub Actions 为您的 GitHub 工作流程带来 AI 驱动的自动化。只需在任何 PR 或 issue 中简单地提及 `@claude`，Claude 就可以分析您的代码、创建拉取请求、实现功能和修复错误 - 所有这些都遵循您项目的标准。

> **信息** 
> 
> Claude Code GitHub Actions 目前处于测试阶段。随着我们完善体验，功能和特性可能会发生变化。

> **注意** 
> 
> Claude Code GitHub Actions 基于 [Claude Code SDK](./sdk) 构建，该 SDK 支持将 Claude Code 程序化集成到您的应用程序中。您可以使用 SDK 构建超越 GitHub Actions 的自定义自动化工作流程。

## 为什么使用 Claude Code GitHub Actions？

* **即时 PR 创建**：描述您的需求，Claude 会创建包含所有必要更改的完整 PR
* **自动化代码实现**：通过单个命令将 issue 转换为可工作的代码
* **遵循您的标准**：Claude 尊重您的 `CLAUDE.md` 指南和现有代码模式
* **简单设置**：使用我们的安装程序和 API 密钥在几分钟内开始使用
* **默认安全**：您的代码保留在 Github 的运行器上

## Claude 能做什么？

Claude Code 提供强大的 GitHub Actions，改变您处理代码的方式：

### Claude Code Action

此 GitHub Action 允许您在 GitHub Actions 工作流程中运行 Claude Code。您可以使用它在 Claude Code 之上构建任何自定义工作流程。

[查看仓库 →](https://github.com/anthropics/claude-code-action)

### Claude Code Action (Base)

使用 Claude 构建自定义 GitHub 工作流程的基础。这个可扩展的框架为您提供对 Claude 功能的完全访问权限，用于创建定制的自动化。

[查看仓库 →](https://github.com/anthropics/claude-code-base-action)

## 设置

## 快速设置

设置此操作的最简单方法是通过终端中的 Claude Code。只需打开 claude 并运行 `/install-github-app`。

此命令将指导您完成设置 GitHub 应用程序和所需密钥的过程。

> **注意** 
> 
> * 您必须是仓库管理员才能安装 GitHub 应用程序和添加密钥
> * 此快速启动方法仅适用于直接 Anthropic API 用户。如果您使用 AWS Bedrock 或 Google Vertex AI，请参阅相关配置部分。

## 手动设置

如果 `/install-github-app` 命令失败或您更喜欢手动设置，请按照以下手动设置说明操作：

1. **将 Claude GitHub 应用程序安装**到您的仓库：[https://github.com/apps/claude](https://github.com/apps/claude)
2. **将 ANTHROPIC_API_KEY 添加**到您的仓库密钥中（[了解如何在 GitHub Actions 中使用密钥](https://docs.github.com/en/actions/security-guides/using-secrets-in-github-actions)）
3. **复制工作流程文件**从 [examples/claude.yml](https://github.com/anthropics/claude-code-action/blob/main/examples/claude.yml) 到您仓库的 `.github/workflows/`

> **提示** 
> 
> 完成快速启动或手动设置后，通过在 issue 或 PR 评论中标记 `@claude` 来测试操作！

## 示例用例

Claude Code GitHub Actions 可以帮助您完成各种任务。有关完整的工作示例，请参阅[示例目录](https://github.com/anthropics/claude-code-action/tree/main/examples)。

### 将 issue 转换为 PR

在 issue 评论中：

```
@claude 根据 issue 描述实现此功能
```

Claude 将分析 issue，编写代码，并创建 PR 供审查。

### 获取实现帮助

在 PR 评论中：

```
@claude 我应该如何为此端点实现用户身份验证？
```

Claude 将分析您的代码并提供具体的实现指导。

### 快速修复错误

在 issue 中：

```
@claude 修复用户仪表板组件中的 TypeError
```

Claude 将定位错误，实现修复，并创建 PR。

## 最佳实践

### CLAUDE.md 配置

在您的仓库根目录中创建一个 `CLAUDE.md` 文件来定义代码风格指南、审查标准、项目特定规则和首选模式。此文件指导 Claude 理解您的项目标准。

### 安全考虑

> **警告** 
> 
> 永远不要直接将 API 密钥提交到您的仓库！

始终使用 GitHub 密钥来存储 API 密钥：

* 将您的 API 密钥添加为名为 `ANTHROPIC_API_KEY` 的仓库密钥
* 在工作流程中引用密钥变量
* 将操作权限限制为仅必需的权限
* 在合并之前审查 Claude 的建议

始终使用 GitHub 密钥而不是在工作流程文件中直接硬编码 API 密钥。

### 优化性能

使用 issue 模板提供上下文，保持您的 `CLAUDE.md` 简洁和专注，并为您的工作流程配置适当的超时。

### CI 成本

使用 Claude Code GitHub Actions 时，请注意相关成本：

**GitHub Actions 成本：**

* Claude Code 在 GitHub 托管的运行器上运行，这会消耗您的 GitHub Actions 分钟数
* 有关详细定价和分钟数限制，请参阅 [GitHub 的计费文档](https://docs.github.com/en/billing/managing-billing-for-your-products/managing-billing-for-github-actions/about-billing-for-github-actions)

**API 成本：**

* 每次 Claude 交互都会根据提示和响应的长度消耗 API 令牌
* 令牌使用量因任务复杂性和代码库大小而异
* 有关当前令牌费率，请参阅 [Claude 的定价页面](https://www.anthropic.com/api)

**成本优化提示：**

* 使用特定的 `@claude` 命令来减少不必要的 API 调用
* 配置适当的 `max_turns` 限制以防止过度迭代
* 设置合理的 `timeout_minutes` 以避免失控的工作流程
* 考虑使用 GitHub 的并发控制来限制并行运行

## 配置示例

对于不同用例的即用型工作流程配置，包括：

* issue 和 PR 评论的基本工作流程设置
* 拉取请求的自动化代码审查
* 特定需求的自定义实现

访问 Claude Code Action 仓库中的[示例目录](https://github.com/anthropics/claude-code-action/tree/main/examples)。

> **提示** 
> 
> 示例仓库包含完整的、经过测试的工作流程，您可以直接复制到您的 `.github/workflows/` 目录中。

## 与云服务集成

Claude Code GitHub Actions 支持与以下云服务集成：

### Amazon Bedrock

- 配置 AWS IAM 角色和权限
- 设置 OIDC 身份提供者
- 使用工作负载身份联合进行安全认证

### Google Vertex AI

- 配置 Google Cloud 项目和 Vertex AI API
- 设置工作负载身份联合
- 创建服务账户和适当的 IAM 绑定

## 故障排除

### Claude 不响应 @claude 命令

验证 GitHub 应用程序是否正确安装，检查工作流程是否已启用，确保 API 密钥已在仓库密钥中设置，并确认评论包含 `@claude`（不是 `/claude`）。

### CI 不在 Claude 的提交上运行

确保您使用的是 GitHub 应用程序或自定义应用程序（不是 Actions 用户），检查工作流程触发器是否包含必要的事件，并验证应用程序权限是否包含 CI 触发器。

### 身份验证错误

确认 API 密钥有效且具有足够的权限。对于 Bedrock/Vertex，检查凭据配置并确保密钥在工作流程中正确命名。

## 高级配置

### 操作参数

Claude Code Action 支持以下关键参数：

| 参数                  | 描述               | 必需    |
| ------------------- | ---------------- | ----- |
| `prompt`            | 发送给 Claude 的提示   | 是*   |
| `prompt_file`       | 包含提示的文件路径        | 是*   |
| `anthropic_api_key` | Anthropic API 密钥 | 是** |
| `max_turns`         | 最大对话轮数           | 否     |
| `timeout_minutes`   | 执行超时             | 否     |

*需要 `prompt` 或 `prompt_file` 之一  
**直接 Anthropic API 需要，Bedrock/Vertex 不需要

### 替代集成方法

虽然 `/install-github-app` 命令是推荐的方法，但您也可以：

* **自定义 GitHub 应用程序**：对于需要品牌用户名或自定义身份验证流程的组织
* **手动 GitHub Actions**：直接工作流程配置以获得最大灵活性
* **MCP 配置**：模型上下文协议服务器的动态加载

有关详细文档，请参阅 [Claude Code Action 仓库](https://github.com/anthropics/claude-code-action)。

### 自定义 Claude 的行为

您可以通过两种方式配置 Claude 的行为：

1. **CLAUDE.md**：在仓库根目录的 `CLAUDE.md` 文件中定义编码标准、审查标准和项目特定规则。Claude 在创建 PR 和响应请求时将遵循这些指南。查看我们的[内存文档](./memory)了解更多详情。
2. **自定义提示**：在工作流程文件中使用 `prompt` 参数提供特定于工作流程的说明。这允许您为不同的工作流程或任务自定义 Claude 的行为。

Claude 在创建 PR 和响应请求时将遵循这些指南。