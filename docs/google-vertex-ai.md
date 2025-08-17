# Google Vertex AI

> 在 Google Cloud 上使用 Vertex AI 配置和部署 Claude Code。

## 概述

Google Vertex AI 是 Google Cloud 的机器学习平台，提供对各种 AI 模型的访问。Claude Code 可以配置为使用 Vertex AI 来运行 Claude 模型。

## 先决条件

1. Google Cloud 项目
2. 启用的 Vertex AI API
3. 适当的 IAM 权限
4. Google Cloud CLI (gcloud)

## 配置步骤

### 1. 安装 Google Cloud CLI

```bash
# macOS
brew install google-cloud-sdk

# Linux
curl https://sdk.cloud.google.com | bash
exec -l $SHELL

# Windows
# 下载并安装 Google Cloud CLI 安装包
```

### 2. 初始化 gcloud

```bash
gcloud init
gcloud auth login
gcloud config set project YOUR_PROJECT_ID
```

### 3. 启用 Vertex AI API

```bash
gcloud services enable aiplatform.googleapis.com
```

### 4. 设置环境变量

```bash
export CLAUDE_CODE_USE_VERTEX=1
export GOOGLE_CLOUD_PROJECT=your-project-id
export GOOGLE_CLOUD_REGION=us-central1  # 或您首选的区域
```

### 5. 配置应用默认凭据

```bash
gcloud auth application-default login
```

## 支持的模型

Vertex AI 上可用的 Claude 模型：

- claude-3-5-sonnet@20241022
- claude-3-5-haiku@20241022
- claude-3-opus@20240229

## IAM 权限

您需要以下 IAM 角色或权限：

- `roles/aiplatform.user`
- 或自定义角色包含：
  - `aiplatform.endpoints.predict`
  - `aiplatform.models.predict`

## 区域配置

### 设置特定模型的区域

```bash
export VERTEX_REGION_CLAUDE_3_5_SONNET=us-central1
export VERTEX_REGION_CLAUDE_3_5_HAIKU=us-central1
export VERTEX_REGION_CLAUDE_3_OPUS=us-central1
```

## 配置文件设置

### settings.json 配置

```json
{
  "env": {
    "CLAUDE_CODE_USE_VERTEX": "1",
    "GOOGLE_CLOUD_PROJECT": "your-project-id"
  }
}
```

## 成本优化

### 选择适当的区域
不同区域的定价可能有所不同，选择最经济的区域。

### 使用较小模型
对于简单任务，使用 Claude 3.5 Haiku 而非 Sonnet。

## 故障排除

### 常见问题

1. **认证错误**
   ```bash
   gcloud auth application-default login
   ```

2. **项目配置错误**
   ```bash
   gcloud config set project YOUR_PROJECT_ID
   ```

3. **API 未启用**
   ```bash
   gcloud services enable aiplatform.googleapis.com
   ```

4. **权限问题**
   - 检查 IAM 权限
   - 确认用户或服务账户具有必要的角色

### 调试命令

```bash
# 检查当前配置
gcloud config list

# 检查认证状态
gcloud auth list

# 测试 Vertex AI 访问
gcloud ai models list --region=us-central1

# 启用详细日志
claude --verbose
```

## 监控和日志

### Cloud Logging
Vertex AI 请求会自动记录到 Cloud Logging。

### Cloud Monitoring
设置监控仪表板来跟踪：
- API 调用次数
- 延迟
- 错误率

### 成本监控
使用 Cloud Billing 监控 Vertex AI 使用成本。

## 安全最佳实践

1. **使用服务账户**
   ```bash
   gcloud iam service-accounts create claude-code-sa
   gcloud projects add-iam-policy-binding YOUR_PROJECT_ID \
     --member="serviceAccount:claude-code-sa@YOUR_PROJECT_ID.iam.gserviceaccount.com" \
     --role="roles/aiplatform.user"
   ```

2. **密钥管理**
   - 使用 Secret Manager 存储敏感信息
   - 定期轮换密钥

3. **网络安全**
   - 配置 VPC 防火墙规则
   - 使用私有 Google 访问（如适用）

## 企业部署

### 组织级配置
- 使用 Google Cloud Organizations
- 实施组织策略约束
- 配置统一的 IAM 策略

### 批量配置
```bash
# 为多个项目启用 API
for project in project1 project2 project3; do
  gcloud config set project $project
  gcloud services enable aiplatform.googleapis.com
done
```

### 合规性
- 确保符合数据驻留要求
- 配置审计日志
- 实施数据治理策略

## 性能优化

### 区域选择
选择距离用户最近的区域以减少延迟。

### 并发配置
根据需要调整并发请求限制。

### 缓存策略
实施适当的缓存来减少 API 调用。