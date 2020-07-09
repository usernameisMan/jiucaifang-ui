const path = require('path')

module.exports = {
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#title
   */
  title: "JcF韭菜坊--二次封装 element-ui",
  /**
   * Ref：https://v1.vuepress.vuejs.org/config/#description
   */
  description: "",

  /**
   * Extra tags to be injected to the page HTML `<head>`
   *
   * ref：https://v1.vuepress.vuejs.org/config/#head
   */
  head: [
    ['meta', { name: 'theme-color', content: '#3eaf7c' }],
    ['meta', { name: 'apple-mobile-web-app-capable', content: 'yes' }],
    ['meta', { name: 'apple-mobile-web-app-status-bar-style', content: 'black' }]
  ],

  /**
   * Theme configuration, here is the default theme configuration for VuePress.
   *
   * ref：https://v1.vuepress.vuejs.org/theme/default-theme-config.html
   */
  themeConfig: {
    repo: '',
    editLinks: false,
    docsDir: '',
    editLinkText: '',
    lastUpdated: false,
    nav: [
    ],
    sidebar: [
      ["/", "(JcF)韭菜坊介绍"],
      {
        title: '向导',
        collapsable: false,
        children: [
          '/guide/using-components',
        ]
      },
      {
        title: '组件',
        collapsable: false,
        children: [
          '/guide/components'
        ]
      }
    ]
  },

  chainWebpack: webpackConfig =>{
    webpackConfig.resolve.alias.set(
      'vgc',
      path.resolve(__dirname, '../../src')
    )
  },
  markdown: {
    extendMarkdown: (md) => {
      md.use(require("markdown-it-task-lists"));
    },
  },

  /**
   * Apply plugins，ref：https://v1.vuepress.vuejs.org/zh/plugin/
   */
  plugins: [
    '@vuepress/plugin-back-to-top',
    '@vuepress/plugin-medium-zoom',
    "vuepress-plugin-code-box"
  ]
}
