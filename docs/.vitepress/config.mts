import { defineConfig } from 'vitepress'

// https://vitepress.dev/reference/site-config
export default defineConfig({
  title: "Claude Code Hub",
  description: "Claude Code Hub 提供 Claude Code 的使用教程、实战案例与最佳实践，让你更快掌握 AI 编程工具",
  ignoreDeadLinks: true,
  // 部署到 claudecodehub.github.io 用户页面，无需设置 base
  base: '/',
  
  // SEO 优化配置
  head: [
    ['meta', { name: 'keywords', content: 'Claude Code, AI编程, 编程助手, Claude, Anthropic, 拼车, 教程, 最佳实践, 开发工具' }],
    ['meta', { name: 'author', content: 'Claude Code Hub' }],
    ['meta', { property: 'og:type', content: 'website' }],
    ['meta', { property: 'og:title', content: 'Claude Code Hub - AI编程助手使用指南' }],
    ['meta', { property: 'og:description', content: 'Claude Code Hub 提供 Claude Code 的使用教程、实战案例与最佳实践，让你更快掌握 AI 编程工具' }],
    ['meta', { property: 'og:url', content: 'https://claudecodehub.github.io' }],
    ['meta', { name: 'twitter:card', content: 'summary_large_image' }],
    ['meta', { name: 'twitter:title', content: 'Claude Code Hub - AI编程助手使用指南' }],
    ['meta', { name: 'twitter:description', content: 'Claude Code Hub 提供 Claude Code 的使用教程、实战案例与最佳实践，让你更快掌握 AI 编程工具' }],
    ['link', { rel: 'canonical', href: 'https://claudecodehub.github.io' }],
    ['meta', { name: 'robots', content: 'index, follow' }],
    ['meta', { name: 'googlebot', content: 'index, follow' }],
    // 结构化数据
    ['script', { type: 'application/ld+json' }, JSON.stringify({
      "@context": "https://schema.org",
      "@type": "WebSite",
      "name": "Claude Code Hub",
      "description": "Claude Code Hub 提供 Claude Code 的使用教程、实战案例与最佳实践，让你更快掌握 AI 编程工具",
      "url": "https://claudecodehub.github.io",
      "publisher": {
        "@type": "Organization",
        "name": "Claude Code Hub"
      },
      "potentialAction": {
        "@type": "SearchAction",
        "target": "https://claudecodehub.github.io/?q={search_term_string}",
        "query-input": "required name=search_term_string"
      },
      "keywords": ["Claude Code", "AI编程", "编程助手", "Claude", "Anthropic", "拼车", "教程", "最佳实践", "开发工具"]
    })]
  ],
  
  // 站点地图配置
  sitemap: {
    hostname: 'https://claudecodehub.github.io'
  },
  themeConfig: {
    // https://vitepress.dev/reference/default-theme-config
    nav: [
      { text: '首页', link: '/' },
      { text: '拼车社群', link: '/carpool-community' }
    ],

    sidebar: [
      {
        text: '社群',
        items: [
          { text: 'Claude Code 拼车社群', link: '/carpool-community' },
          { text: 'Claude Code 拼车最佳实践分享', link: '/carpooling-best-practices' }
        ]
      },
      {
        text: '拼车使用',
        items: [
          { text: '拼车使用教程', link: '/carpooling-instructions' },
        ]
      },
      {
        text: 'Claude Code 文档',
        items: [
          { text: '概述', link: '/overview' },
          { text: '快速开始', link: '/quickstart' },
          { text: '高级设置', link: '/setup' },
          { text: '常见工作流程', link: '/common-workflows' },
          { text: 'Claude Code SDK', link: '/sdk' },
          { text: '子代理', link: '/sub-agents' },
          { text: 'Claude Code 钩子', link: '/hooks-guide' },
          { text: 'Claude Code GitHub Actions', link: '/github-actions' },
          { text: '模型上下文协议 (MCP)', link: '/mcp' },
          { text: '故障排除', link: '/troubleshooting' },
          { text: '设置', link: '/settings' },
          { text: 'IDE 集成', link: '/ide-integrations' },
          { text: '终端配置', link: '/terminal-config' },
          { text: '内存管理', link: '/memory' },
          { text: 'CLI 参考', link: '/cli-reference' },
          { text: '交互模式', link: '/interactive-mode' },
          { text: '斜杠命令', link: '/slash-commands' },
          { text: '钩子参考', link: '/hooks' },
          { text: '身份和访问管理', link: '/iam' },
          { text: '安全性', link: '/security' },
          { text: '隐私和数据使用', link: '/data-usage' },
          { text: '第三方集成', link: '/third-party-integrations' },
          { text: 'Amazon Bedrock', link: '/amazon-bedrock' },
          { text: 'Google Vertex AI', link: '/google-vertex-ai' },
          { text: 'Bedrock 和 Vertex 代理', link: '/bedrock-vertex-proxies' },
          { text: '成本管理', link: '/costs' },
        ]
      }
    ],
    socialLinks: [
      //{ icon: 'github', link: 'https://github.com/vuejs/vitepress' }
    ]
  }
})
