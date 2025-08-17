# 成本管理

> 了解和管理 Claude Code 的使用成本。

## 成本概述

Claude Code 的成本主要来源于：

1. **模型使用** - 基于输入和输出 token 数量
2. **API 调用** - 每次与 Claude 交互的费用
3. **数据传输** - 在某些云服务中可能产生的费用

## 定价模型

### Anthropic API 定价

| 模型 | 输入价格（每 1M tokens） | 输出价格（每 1M tokens） |
|------|----------------------|----------------------|
| Claude 3.5 Sonnet | $3.00 | $15.00 |
| Claude 3.5 Haiku | $0.25 | $1.25 |
| Claude 3 Opus | $15.00 | $75.00 |

### 云服务定价

#### Amazon Bedrock
价格可能与 Anthropic API 有所不同，请查看 AWS 定价页面。

#### Google Vertex AI
价格可能与 Anthropic API 有所不同，请查看 GCP 定价页面。

## 成本监控

### 内置成本跟踪

Claude Code 提供内置的成本监控功能：

```bash
# 查看当前会话成本
> /cost

# 在设置中启用成本警告
{
  "costWarnings": true,
  "costThreshold": 1.00  // 美元
}
```

### 使用统计

查看详细的使用统计：
- Token 使用量
- API 调用次数
- 估算成本

## 成本优化策略

### 1. 选择合适的模型

**Claude 3.5 Haiku**
- 适用于：简单任务、快速响应
- 成本：最低
- 用例：代码补全、简单问答

**Claude 3.5 Sonnet**
- 适用于：平衡性能和成本
- 成本：中等
- 用例：代码生成、分析、重构

**Claude 3 Opus**
- 适用于：复杂任务、高质量输出
- 成本：最高
- 用例：架构设计、复杂调试

### 2. 优化 Token 使用

**减少上下文大小**
```bash
# 定期压缩对话
> /compact

# 清除不必要的历史
> /clear
```

**智能文件引用**
- 只包含相关文件
- 使用 @ 引用替代复制粘贴

### 3. 配置后台任务模型

```bash
# 为简单任务使用较小模型
export ANTHROPIC_SMALL_FAST_MODEL=claude-3-5-haiku-20241022
```

### 4. 批量处理

将相关任务组合在单个请求中：
```
> fix these 3 files: file1.js, file2.js, file3.js
```

## 成本预算

### 设置预算警告

在 `settings.json` 中配置：

```json
{
  "cost": {
    "dailyBudget": 10.00,
    "weeklyBudget": 50.00,
    "monthlyBudget": 200.00,
    "warningThreshold": 0.8
  }
}
```

### 自动停止

```json
{
  "cost": {
    "autoStopAtBudget": true,
    "hardLimit": 100.00
  }
}
```

## 企业成本管理

### 团队预算分配

```json
{
  "team": {
    "budget": 1000.00,
    "members": [
      {"user": "dev1", "allocation": 200.00},
      {"user": "dev2", "allocation": 150.00}
    ]
  }
}
```

### 成本报告

#### 每日报告
```bash
claude cost report --period daily
```

#### 月度分析
```bash
claude cost analyze --month 2024-01
```

## 云服务成本优化

### Amazon Bedrock

1. **区域选择**
   - 选择价格较低的区域
   - 考虑数据传输成本

2. **预留容量**
   - 对于高使用量，考虑预留容量折扣

### Google Vertex AI

1. **区域优化**
   - 选择成本效益最高的区域

2. **批量折扣**
   - 利用批量使用折扣

## 成本分析工具

### 内置分析

```bash
# 查看成本趋势
claude cost trend --days 30

# 按功能分析成本
claude cost breakdown --by feature

# 比较不同模型成本
claude cost compare --models all
```

### 导出数据

```bash
# 导出成本数据到 CSV
claude cost export --format csv --output costs.csv

# 导出到云成本管理工具
claude cost export --format aws-billing
```

## 最佳实践

### 开发阶段优化

1. **本地开发**
   - 使用较小模型进行初期开发
   - 仅在必要时使用高级模型

2. **测试环境**
   - 配置适当的预算限制
   - 使用成本效益高的模型

### 生产环境

1. **监控设置**
   - 实施实时成本监控
   - 设置自动警告

2. **优化策略**
   - 定期审查使用模式
   - 优化高成本操作

## 故障排除

### 意外高成本

1. **识别原因**
   ```bash
   claude cost debug --period last-24h
   ```

2. **常见原因**
   - 大文件处理
   - 长时间对话
   - 高频 API 调用

3. **解决方案**
   - 分割大任务
   - 定期清理上下文
   - 优化工作流程

### 成本跟踪不准确

1. **同步问题**
   - 检查网络连接
   - 验证 API 凭据

2. **配置检查**
   - 确认成本跟踪已启用
   - 检查时区设置