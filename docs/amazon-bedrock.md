# Amazon Bedrock

> 在 AWS 上使用 Amazon Bedrock 配置和部署 Claude Code。

## 概述

Amazon Bedrock 是 AWS 的完全托管服务，提供通过 API 访问基础模型的能力。Claude Code 可以配置为使用 Bedrock 来运行 Claude 模型。

## 先决条件

1. AWS 账户和适当的 IAM 权限
2. AWS CLI 配置
3. Bedrock 服务访问权限

## 配置步骤

### 1. 安装 AWS CLI

```bash
# macOS
brew install awscli

# Linux
curl "https://awscli.amazonaws.com/awscli-exe-linux-x86_64.zip" -o "awscliv2.zip"
unzip awscliv2.zip
sudo ./aws/install

# Windows
# 下载并安装 AWS CLI MSI 安装包
```

### 2. 配置 AWS 凭据

```bash
aws configure
```

或使用 AWS SSO：

```bash
aws configure sso
```

### 3. 设置环境变量

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-west-2  # 或您首选的区域
```

### 4. 验证配置

```bash
claude --model claude-3-5-sonnet-20241022
```

## 支持的模型

Bedrock 上可用的 Claude 模型：

- claude-3-5-sonnet-20241022
- claude-3-5-haiku-20241022
- claude-3-opus-20240229

## IAM 权限

您需要以下 IAM 权限：

```json
{
    "Version": "2012-10-17",
    "Statement": [
        {
            "Effect": "Allow",
            "Action": [
                "bedrock:InvokeModel",
                "bedrock:InvokeModelWithResponseStream"
            ],
            "Resource": [
                "arn:aws:bedrock:*::foundation-model/anthropic.claude-*"
            ]
        }
    ]
}
```

## 高级配置

### 自定义凭据刷新

```json
{
    "awsAuthRefresh": "aws sso login --profile myprofile"
}
```

### 自定义凭据导出

```json
{
    "awsCredentialExport": "/bin/generate_aws_grant.sh"
}
```

## 成本优化

### 使用较小模型进行后台任务

```bash
export ANTHROPIC_SMALL_FAST_MODEL=anthropic.claude-3-haiku-20240307-v1:0
```

### 设置成本警告

Claude Code 会显示估算成本，帮助您控制使用量。

## 故障排除

### 常见问题

1. **权限错误**
   - 检查 IAM 权限
   - 确认 Bedrock 服务可用性

2. **区域问题**
   - 确认模型在所选区域可用
   - 检查区域配置

3. **凭据问题**
   - 重新运行 `aws configure`
   - 检查 SSO 会话状态

### 调试命令

```bash
# 检查 AWS 配置
aws sts get-caller-identity

# 测试 Bedrock 访问
aws bedrock list-foundation-models --region us-west-2

# 启用详细日志
claude --verbose
```

## 监控和日志

### CloudTrail 集成
启用 CloudTrail 来监控 Bedrock API 调用。

### 成本监控
使用 AWS Cost Explorer 监控 Bedrock 使用成本。

## 安全最佳实践

1. 使用 IAM 角色而非长期访问密钥
2. 启用 CloudTrail 日志记录
3. 定期轮换凭据
4. 使用 VPC 端点（如适用）

## 企业部署

### 大规模部署
- 使用 AWS Organizations 管理多账户
- 实施 Service Control Policies (SCPs)
- 配置统一的 IAM 策略

### 合规性
- 确保符合组织的安全政策
- 配置适当的数据治理
- 实施审计日志记录