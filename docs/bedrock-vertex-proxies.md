# Bedrock 和 Vertex 代理

> 配置代理服务器以访问 Amazon Bedrock 和 Google Vertex AI。

## 概述

在企业环境中，您可能需要通过代理服务器访问 Bedrock 和 Vertex AI 服务。Claude Code 支持通过 HTTP/HTTPS 代理进行连接。

## 代理配置

### 环境变量配置

```bash
# HTTP 代理
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=https://proxy.company.com:8080

# 带身份验证的代理
export HTTP_PROXY=http://username:password@proxy.company.com:8080
export HTTPS_PROXY=https://username:password@proxy.company.com:8080

# 排除特定域名
export NO_PROXY=localhost,127.0.0.1,.internal.company.com
```

### Claude Code 特定配置

在 `settings.json` 中配置：

```json
{
  "env": {
    "HTTP_PROXY": "http://proxy.company.com:8080",
    "HTTPS_PROXY": "https://proxy.company.com:8080",
    "NO_PROXY": "localhost,127.0.0.1"
  }
}
```

## Amazon Bedrock 代理

### AWS CLI 代理配置

```bash
# 配置 AWS CLI 使用代理
aws configure set proxy_url http://proxy.company.com:8080
```

### 或在配置文件中设置

`~/.aws/config`:
```ini
[default]
proxy_url = http://proxy.company.com:8080
proxy_ca_bundle_path = /path/to/ca-bundle.pem
```

### Bedrock 特定设置

```bash
export CLAUDE_CODE_USE_BEDROCK=1
export AWS_REGION=us-west-2
export HTTP_PROXY=http://proxy.company.com:8080
```

## Google Vertex AI 代理

### gcloud 代理配置

```bash
# 配置 gcloud 使用代理
gcloud config set proxy/type http
gcloud config set proxy/address proxy.company.com
gcloud config set proxy/port 8080

# 带身份验证
gcloud config set proxy/username your-username
gcloud config set proxy/password your-password
```

### Vertex AI 特定设置

```bash
export CLAUDE_CODE_USE_VERTEX=1
export GOOGLE_CLOUD_PROJECT=your-project-id
export HTTP_PROXY=http://proxy.company.com:8080
```

## SSL/TLS 配置

### 自定义 CA 证书

```bash
# 设置 CA 证书包路径
export REQUESTS_CA_BUNDLE=/path/to/ca-bundle.pem
export SSL_CERT_FILE=/path/to/ca-bundle.pem
```

### 在 settings.json 中配置

```json
{
  "env": {
    "REQUESTS_CA_BUNDLE": "/path/to/ca-bundle.pem",
    "SSL_CERT_FILE": "/path/to/ca-bundle.pem"
  }
}
```

## 模型配置

### Bedrock 模型配置

```bash
# 设置自定义模型名称
export ANTHROPIC_MODEL=anthropic.claude-3-5-sonnet-20241022-v2:0
export ANTHROPIC_SMALL_FAST_MODEL=anthropic.claude-3-haiku-20240307-v1:0
```

### Vertex AI 模型配置

```bash
# 设置自定义模型名称
export ANTHROPIC_MODEL=claude-3-5-sonnet@20241022
export ANTHROPIC_SMALL_FAST_MODEL=claude-3-5-haiku@20241022
```

## 故障排除

### 连接问题

1. **验证代理连接**
   ```bash
   curl -x http://proxy.company.com:8080 https://api.anthropic.com
   ```

2. **检查代理设置**
   ```bash
   echo $HTTP_PROXY
   echo $HTTPS_PROXY
   ```

3. **测试 AWS 连接**
   ```bash
   aws sts get-caller-identity --debug
   ```

4. **测试 GCP 连接**
   ```bash
   gcloud auth list --verbosity=debug
   ```

### SSL/TLS 问题

1. **证书验证错误**
   - 确保 CA 证书包是最新的
   - 检查证书路径是否正确

2. **自签名证书**
   ```bash
   # 仅用于测试（不推荐用于生产）
   export PYTHONHTTPSVERIFY=0
   ```

### 权限问题

1. **代理身份验证**
   - 验证用户名和密码
   - 检查域配置（如果适用）

2. **网络访问控制**
   - 确保必要的域名已加入白名单
   - 检查防火墙规则

## 高级配置

### 代理绕过

配置哪些请求绕过代理：

```bash
export NO_PROXY="localhost,127.0.0.1,.internal.company.com,metadata.google.internal"
```

### 超时设置

```bash
export HTTP_TIMEOUT=30
export HTTPS_TIMEOUT=30
```

### 重试配置

```bash
export HTTP_RETRIES=3
export BACKOFF_FACTOR=1.0
```

## 监控和日志

### 启用详细日志

```bash
claude --verbose
```

### 网络日志

```bash
# 在 settings.json 中启用网络调试
{
  "env": {
    "ANTHROPIC_DEBUG": "1",
    "AWS_DEBUG": "1"
  }
}
```

## 企业最佳实践

### 安全考虑

1. **凭据管理**
   - 使用加密存储代理凭据
   - 定期轮换密码

2. **网络隔离**
   - 使用专用代理进行 AI 服务访问
   - 实施网络分段

3. **审计日志**
   - 记录所有代理连接
   - 监控异常访问模式

### 性能优化

1. **代理选择**
   - 选择地理位置接近的代理
   - 确保代理具有足够的带宽

2. **连接池**
   - 配置适当的连接池大小
   - 启用连接重用

3. **缓存策略**
   - 在代理层实施缓存
   - 减少重复请求