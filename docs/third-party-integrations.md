# 第三方集成

> 将 Claude Code 与第三方服务和平台集成。

## 云服务提供商

### Amazon Bedrock
在 AWS 上托管 Claude Code，利用 Amazon Bedrock 服务。

配置步骤：
1. 设置 AWS 凭据
2. 配置 Bedrock 访问
3. 选择适当的 Claude 模型

参见 [Amazon Bedrock 文档](./amazon-bedrock) 了解详细配置。

### Google Vertex AI
在 Google Cloud 上部署 Claude Code。

配置步骤：
1. 设置 GCP 凭据
2. 启用 Vertex AI API
3. 配置模型访问

参见 [Google Vertex AI 文档](./google-vertex-ai) 了解详细配置。

## 开发工具集成

### IDE 集成
Claude Code 支持与主流 IDE 集成：
- VS Code
- JetBrains IDEs
- Vim/Neovim

### Git 集成
- 自动提交消息生成
- 代码审查协助
- 合并冲突解决

## 企业工具

### 单点登录 (SSO)
支持企业 SSO 解决方案：
- SAML 2.0
- OAuth 2.0
- OIDC

### 安全扫描
集成安全扫描工具：
- 静态代码分析
- 依赖漏洞扫描
- 合规性检查

## API 集成

Claude Code 提供 API 接口，支持：
- 自定义工具集成
- 工作流自动化
- 批量处理任务

## 配置示例

### 基本第三方配置
```json
{
  "integrations": {
    "aws": {
      "region": "us-west-2",
      "profile": "default"
    },
    "github": {
      "token": "YOUR_TOKEN"
    }
  }
}
```

## 故障排除

常见集成问题及解决方案请参见各服务的专门文档。