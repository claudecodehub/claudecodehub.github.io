# 高级设置

> Claude Code 的高级安装和配置选项。

## 系统要求

- Node.js 18 或更高版本
- 支持的操作系统：macOS、Linux、Windows、WSL

## 安装选项

### NPM 安装

```bash
npm install -g @anthropic-ai/claude-code
```

### 原生安装

**macOS、Linux、WSL：**
```bash
curl -fsSL claude.ai/install.sh | bash
```

**Windows PowerShell：**
```powershell
irm https://claude.ai/install.ps1 | iex
```

## 环境配置

### 代理设置

如果您在公司网络环境中，可能需要配置代理：

```bash
export HTTP_PROXY=http://proxy.company.com:8080
export HTTPS_PROXY=http://proxy.company.com:8080
```

### 防火墙设置

确保以下域名可以访问：
- api.anthropic.com
- claude.ai

## 故障排除

参见[故障排除文档](./troubleshooting)获取常见问题的解决方案。