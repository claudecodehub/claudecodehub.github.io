# Claude Code SDK

> 了解如何使用 Claude Code SDK 以编程方式将 Claude Code 集成到您的应用程序中。

Claude Code SDK 支持将 Claude Code 作为子进程运行，提供了一种构建 AI 驱动的编码助手和工具的方法，利用 Claude 的能力。

SDK 可用于命令行、TypeScript 和 Python 使用。

## 身份验证

要使用 Claude Code SDK，我们建议创建一个专用的 API 密钥：

1. 在 [Anthropic Console](https://console.anthropic.com/) 中创建一个 Anthropic API 密钥
2. 然后，设置 `ANTHROPIC_API_KEY` 环境变量。我们建议安全地存储此密钥（例如，使用 Github [secret](https://docs.github.com/en/actions/security-for-github-actions/security-guides/using-secrets-in-github-actions)）

## 基本 SDK 使用

Claude Code SDK 允许您在应用程序中以非交互模式使用 Claude Code。

### 命令行

以下是命令行 SDK 的一些基本示例：

```bash
# 运行单个提示并退出（打印模式）
$ claude -p "Write a function to calculate Fibonacci numbers"

# 使用管道提供 stdin
$ echo "Explain this code" | claude -p

# 以 JSON 格式输出并包含元数据
$ claude -p "Generate a hello world function" --output-format json

# 在到达时流式传输 JSON 输出
$ claude -p "Build a React component" --output-format stream-json
```

### TypeScript

TypeScript SDK 包含在 NPM 上的主要 [`@anthropic-ai/claude-code`](https://www.npmjs.com/package/@anthropic-ai/claude-code) 包中：

```ts
import { query, type SDKMessage } from "@anthropic-ai/claude-code";

const messages: SDKMessage[] = [];

for await (const message of query({
  prompt: "Write a haiku about foo.py",
  abortController: new AbortController(),
  options: {
    maxTurns: 3,
  },
})) {
  messages.push(message);
}

console.log(messages);
```

TypeScript SDK 接受命令行 SDK 支持的所有参数，以及：

| 参数                           | 描述                   | 默认值                                      |
| :--------------------------- | :------------------- | :--------------------------------------- |
| `abortController`            | 中止控制器                | `new AbortController()`                  |
| `cwd`                        | 当前工作目录               | `process.cwd()`                          |
| `executable`                 | 要使用的 JavaScript 运行时  | 在 Node.js 中运行时为 `node`，在 Bun 中运行时为 `bun` |
| `executableArgs`             | 传递给可执行文件的参数          | `[]`                                     |
| `pathToClaudeCodeExecutable` | Claude Code 可执行文件的路径 | 与 `@anthropic-ai/claude-code` 一起提供的可执行文件 |

### Python

Python SDK 在 PyPI 上作为 [`claude-code-sdk`](https://github.com/anthropics/claude-code-sdk-python) 提供：

```bash
pip install claude-code-sdk
```

**先决条件：**

* Python 3.10+
* Node.js
* Claude Code CLI：`npm install -g @anthropic-ai/claude-code`

基本使用：

```python
import anyio
from claude_code_sdk import query, ClaudeCodeOptions, Message

async def main():
    messages: list[Message] = []
    
    async for message in query(
        prompt="Write a haiku about foo.py",
        options=ClaudeCodeOptions(max_turns=3)
    ):
        messages.append(message)
    
    print(messages)

anyio.run(main)
```

Python SDK 通过 `ClaudeCodeOptions` 类接受命令行 SDK 支持的所有参数：

```python
from claude_code_sdk import query, ClaudeCodeOptions
from pathlib import Path

options = ClaudeCodeOptions(
    max_turns=3,
    system_prompt="You are a helpful assistant",
    cwd=Path("/path/to/project"),  # 可以是字符串或 Path
    allowed_tools=["Read", "Write", "Bash"],
    permission_mode="acceptEdits"
)

async for message in query(prompt="Hello", options=options):
    print(message)
```

## 高级使用

下面的文档使用命令行 SDK 作为示例，但也可以与 TypeScript 和 Python SDK 一起使用。

### 多轮对话

对于多轮对话，您可以恢复对话或从最近的会话继续：

```bash
# 继续最近的对话
$ claude --continue

# 继续并提供新的提示
$ claude --continue "Now refactor this for better performance"

# 通过会话 ID 恢复特定对话
$ claude --resume 550e8400-e29b-41d4-a716-446655440000

# 在打印模式下恢复（非交互式）
$ claude -p --resume 550e8400-e29b-41d4-a716-446655440000 "Update the tests"

# 在打印模式下继续（非交互式）
$ claude -p --continue "Add error handling"
```

### 自定义系统提示

您可以提供自定义系统提示来指导 Claude 的行为：

```bash
# 覆盖系统提示（仅适用于 --print）
$ claude -p "Build a REST API" --system-prompt "You are a senior backend engineer. Focus on security, performance, and maintainability."

# 具有特定要求的系统提示
$ claude -p "Create a database schema" --system-prompt "You are a database architect. Use PostgreSQL best practices and include proper indexing."
```

您还可以将指令附加到默认系统提示：

```bash
# 附加系统提示（仅适用于 --print）
$ claude -p "Build a REST API" --append-system-prompt "After writing code, be sure to code review yourself."
```

### MCP 配置

模型上下文协议（MCP）允许您使用来自外部服务器的附加工具和资源扩展 Claude Code。使用 `--mcp-config` 标志，您可以加载提供专门功能的 MCP 服务器，如数据库访问、API 集成或自定义工具。

创建一个包含您的 MCP 服务器的 JSON 配置文件：

```json
{
  "mcpServers": {
    "filesystem": {
      "command": "npx",
      "args": [
        "-y",
        "@modelcontextprotocol/server-filesystem",
        "/path/to/allowed/files"
      ]
    },
    "github": {
      "command": "npx",
      "args": ["-y", "@modelcontextprotocol/server-github"],
      "env": {
        "GITHUB_TOKEN": "your-github-token"
      }
    }
  }
}
```

然后与 Claude Code 一起使用：

```bash
# 从配置加载 MCP 服务器
$ claude -p "List all files in the project" --mcp-config mcp-servers.json

# 重要：必须使用 --allowedTools 明确允许 MCP 工具
# MCP 工具遵循格式：mcp__$serverName__$toolName
$ claude -p "Search for TODO comments" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__filesystem__read_file,mcp__filesystem__list_directory"

# 使用 MCP 工具在非交互模式下处理权限提示
$ claude -p "Deploy the application" \
  --mcp-config mcp-servers.json \
  --allowedTools "mcp__permissions__approve" \
  --permission-prompt-tool mcp__permissions__approve
```

> **注意**
>
> 使用 MCP 工具时，您必须使用 `--allowedTools` 标志明确允许它们。MCP 工具名称遵循模式 `mcp__<serverName>__<toolName>`，其中：
>
> * `serverName` 是您的 MCP 配置文件中的键
> * `toolName` 是该服务器提供的特定工具
>
> 这种安全措施确保 MCP 工具仅在明确允许时使用。
>
> 如果您只指定服务器名称（即 `mcp__<serverName>`），则该服务器的所有工具都将被允许。
>
> 不支持通配符模式（例如 `mcp__go*`）。

### 自定义权限提示工具

可选地，使用 `--permission-prompt-tool` 传入一个 MCP 工具，我们将使用它来检查用户是否授予模型调用给定工具的权限。当模型调用工具时，会发生以下情况：

1. 我们首先检查权限设置：所有 [settings.json 文件](./settings)，以及传递给 SDK 的 `--allowedTools` 和 `--disallowedTools`；如果其中之一允许或拒绝工具调用，我们继续进行工具调用
2. 否则，我们调用您在 `--permission-prompt-tool` 中提供的 MCP 工具

`--permission-prompt-tool` MCP 工具会传递工具名称和输入，并且必须返回一个带有结果的 JSON 字符串化载荷。载荷必须是以下之一：

```ts
// 工具调用被允许
{
  "behavior": "allow",
  "updatedInput": {...}, // 更新的输入，或者只是返回原始输入
}

// 工具调用被拒绝
{
  "behavior": "deny",
  "message": "..." // 解释为什么权限被拒绝的人类可读字符串
}
```

例如，TypeScript MCP 权限提示工具实现可能如下所示：

```ts
const server = new McpServer({
  name: "Test permission prompt MCP Server",
  version: "0.0.1",
});

server.tool(
  "approval_prompt",
  'Simulate a permission check - approve if the input contains "allow", otherwise deny',
  {
    tool_name: z.string().describe("The tool requesting permission"),
    input: z.object({}).passthrough().describe("The input for the tool"),
  },
  async ({ tool_name, input }) => {
    return {
      content: [
        {
          type: "text",
          text: JSON.stringify(
            JSON.stringify(input).includes("allow")
              ? {
                  behavior: "allow",
                  updatedInput: input,
                }
              : {
                  behavior: "deny",
                  message: "Permission denied by test approval_prompt tool",
                }
          ),
        },
      ],
    };
  }
);
```

要使用此工具，添加您的 MCP 服务器（例如使用 `--mcp-config`），然后像这样调用 SDK：

```sh
claude -p "..." \
  --permission-prompt-tool mcp__test-server__approval_prompt \
  --mcp-config my-config.json
```

使用说明：

* 使用 `updatedInput` 告诉模型权限提示改变了其输入；否则，将 `updatedInput` 设置为原始输入，如上面的示例所示。例如，如果工具向用户显示文件编辑差异并让他们手动编辑差异，权限提示工具应该返回该更新的编辑。
* 载荷必须是 JSON 字符串化的

## 可用的 CLI 选项

SDK 利用 Claude Code 中可用的所有 CLI 选项。以下是 SDK 使用的关键选项：

| 标志                         | 描述                                          | 示例                                                                                                                        |
| :------------------------- | :------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------ |
| `--print`, `-p`            | 在非交互模式下运行                                   | `claude -p "query"`                                                                                                       |
| `--output-format`          | 指定输出格式（`text`、`json`、`stream-json`）         | `claude -p --output-format json`                                                                                          |
| `--resume`, `-r`           | 通过会话 ID 恢复对话                                | `claude --resume abc123`                                                                                                  |
| `--continue`, `-c`         | 继续最近的对话                                     | `claude --continue`                                                                                                       |
| `--verbose`                | 启用详细日志记录                                    | `claude --verbose`                                                                                                        |
| `--max-turns`              | 在非交互模式下限制代理轮次                               | `claude --max-turns 3`                                                                                                    |
| `--system-prompt`          | 覆盖系统提示（仅适用于 `--print`）                      | `claude --system-prompt "Custom instruction"`                                                                             |
| `--append-system-prompt`   | 附加到系统提示（仅适用于 `--print`）                     | `claude --append-system-prompt "Custom instruction"`                                                                      |
| `--allowedTools`           | 允许的工具的空格分隔列表，或 <br /><br /> 允许的工具的逗号分隔列表字符串 | `claude --allowedTools mcp__slack mcp__filesystem`<br /><br />`claude --allowedTools "Bash(npm install),mcp__filesystem"` |
| `--disallowedTools`        | 拒绝的工具的空格分隔列表，或 <br /><br /> 拒绝的工具的逗号分隔列表字符串 | `claude --disallowedTools mcp__splunk mcp__github`<br /><br />`claude --disallowedTools "Bash(git commit),mcp__github"`   |
| `--mcp-config`             | 从 JSON 文件加载 MCP 服务器                         | `claude --mcp-config servers.json`                                                                                        |
| `--permission-prompt-tool` | 用于处理权限提示的 MCP 工具（仅适用于 `--print`）            | `claude --permission-prompt-tool mcp__auth__prompt`                                                                       |

有关 CLI 选项和功能的完整列表，请参阅 [CLI 参考](./cli-reference) 文档。

## 输出格式

SDK 支持多种输出格式：

### 文本输出（默认）

仅返回响应文本：

```bash
$ claude -p "Explain file src/components/Header.tsx"
# 输出：This is a React component showing...
```

### JSON 输出

返回包括元数据的结构化数据：

```bash
$ claude -p "How does the data layer work?" --output-format json
```

响应格式：

```json
{
  "type": "result",
  "subtype": "success",
  "total_cost_usd": 0.003,
  "is_error": false,
  "duration_ms": 1234,
  "duration_api_ms": 800,
  "num_turns": 6,
  "result": "The response text here...",
  "session_id": "abc123"
}
```

### 流式 JSON 输出

在接收到每条消息时流式传输：

```bash
$ claude -p "Build an application" --output-format stream-json
```

每个对话都以初始的 `init` 系统消息开始，然后是用户和助手消息列表，最后是带有统计信息的最终 `result` 系统消息。每条消息都作为单独的 JSON 对象发出。

## 消息模式

从 JSON API 返回的消息根据以下模式严格类型化：

```ts
type SDKMessage =
  // 助手消息
  | {
      type: "assistant";
      message: Message; // 来自 Anthropic SDK
      session_id: string;
    }

  // 用户消息
  | {
      type: "user";
      message: MessageParam; // 来自 Anthropic SDK
      session_id: string;
    }

  // 作为最后一条消息发出
  | {
      type: "result";
      subtype: "success";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      result: string;
      session_id: string;
      total_cost_usd: float;
    }

  // 作为最后一条消息发出，当我们达到最大轮次时
  | {
      type: "result";
      subtype: "error_max_turns" | "error_during_execution";
      duration_ms: float;
      duration_api_ms: float;
      is_error: boolean;
      num_turns: int;
      session_id: string;
      total_cost_usd: float;
    }

  // 在对话开始时作为第一条消息发出
  | {
      type: "system";
      subtype: "init";
      apiKeySource: string;
      cwd: string;
      session_id: string;
      tools: string[];
      mcp_servers: {
        name: string;
        status: string;
      }[];
      model: string;
      permissionMode: "default" | "acceptEdits" | "bypassPermissions" | "plan";
    };
```

我们将很快以 JSONSchema 兼容格式发布这些类型。我们对主要的 Claude Code 包使用语义版本控制来传达此格式的重大更改。

`Message` 和 `MessageParam` 类型在 Anthropic SDK 中可用。例如，请参阅 Anthropic [TypeScript](https://github.com/anthropics/anthropic-sdk-typescript) 和 [Python](https://github.com/anthropics/anthropic-sdk-python/) SDK。

## 输入格式

SDK 支持多种输入格式：

### 文本输入（默认）

输入文本可以作为参数提供：

```bash
$ claude -p "Explain this code"
```

或者输入文本可以通过 stdin 管道传输：

```bash
$ echo "Explain this code" | claude -p
```

### 流式 JSON 输入

通过 `stdin` 提供的消息流，其中每条消息代表一个用户轮次。这允许对话的多个轮次而无需重新启动 `claude` 二进制文件，并允许在模型处理请求时向模型提供指导。

每条消息都是一个 JSON '用户消息' 对象，遵循与输出消息模式相同的格式。消息使用 [jsonl](https://jsonlines.org/) 格式格式化，其中输入的每一行都是一个完整的 JSON 对象。流式 JSON 输入需要 `-p` 和 `--output-format stream-json`。

目前这仅限于纯文本用户消息。

```bash
$ echo '{"type":"user","message":{"role":"user","content":[{"type":"text","text":"Explain this code"}]}}' | claude -p --output-format=stream-json --input-format=stream-json --verbose
```

## 示例

### 简单脚本集成

```bash
#!/bin/bash

# 运行 Claude 并检查退出代码的简单函数
run_claude() {
    local prompt="$1"
    local output_format="${2:-text}"

    if claude -p "$prompt" --output-format "$output_format"; then
        echo "Success!"
    else
        echo "Error: Claude failed with exit code $?" >&2
        return 1
    fi
}

# 使用示例
run_claude "Write a Python function to read CSV files"
run_claude "Optimize this database query" "json"
```

### 使用 Claude 处理文件

```bash
# 通过 Claude 处理文件
$ cat mycode.py | claude -p "Review this code for bugs"

# 处理多个文件
$ for file in *.js; do
    echo "Processing $file..."
    claude -p "Add JSDoc comments to this file:" < "$file" > "${file}.documented"
done

# 在管道中使用 Claude
$ grep -l "TODO" *.py | while read file; do
    claude -p "Fix all TODO items in this file" < "$file"
done
```

### 会话管理

```bash
# 启动会话并捕获会话 ID
$ claude -p "Initialize a new project" --output-format json | jq -r '.session_id' > session.txt

# 使用相同会话继续
$ claude -p --resume "$(cat session.txt)" "Add unit tests"
```

## 最佳实践

1. **使用 JSON 输出格式** 进行响应的程序化解析：

   ```bash
   # 使用 jq 解析 JSON 响应
   result=$(claude -p "Generate code" --output-format json)
   code=$(echo "$result" | jq -r '.result')
   cost=$(echo "$result" | jq -r '.cost_usd')
   ```

2. **优雅地处理错误** - 检查退出代码和 stderr：

   ```bash
   if ! claude -p "$prompt" 2>error.log; then
       echo "Error occurred:" >&2
       cat error.log >&2
       exit 1
   fi
   ```

3. **使用会话管理** 在多轮对话中维护上下文

4. **考虑超时** 对于长时间运行的操作：

   ```bash
   timeout 300 claude -p "$complex_prompt" || echo "Timed out after 5 minutes"
   ```

5. **尊重速率限制** 在进行多个请求时通过在调用之间添加延迟

## 实际应用

Claude Code SDK  能够与您的开发工作流程进行强大的集成。一个值得注意的例子是 [Claude Code GitHub Actions](./github-actions)，它使用 SDK 直接在您的 GitHub 工作流程中提供自动化代码审查、PR 创建和问题分类功能。

## 相关资源

* [CLI 使用和控制](./cli-reference) - 完整的 CLI 文档
* [GitHub Actions 集成](./github-actions) - 使用 Claude 自动化您的 GitHub 工作流程
* [常见工作流程](./common-workflows) - 常见用例的分步指南