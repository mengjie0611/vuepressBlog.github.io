module.exports = {
  base: '/vuepress-blog/',
  title: '孟杰前端博客',
  description: '一个努力的码农',
  serviceWorker: true,
  head: [['link', {rel: 'icon', type: 'image/x-icon', href: '/img/icon.png'}]],
  markdown: {
    // 显示代码行号
    lineNumbers: false,
  },
  themeConfig: {
    logo: '/img/logo.png',
    date_format: 'yyyy-MM-dd HH:mm:ss',
    nav: [
      {text: '首页', link: '/timeLine/'},
      {text: '技术', link: '/technology/'},
      {text: '随笔', link: '/essay/'},
      {text: '思考', link: '/ponder/'},
      {text: '其他', link: '/others/'},
      {text: '标签', link: '/tags/'},
      // { text: '关于', link: '/about/' },
      {
        text: '链接',
        items: [
          {text: 'GitHub', link: 'https://github.com/mengjie0611'},
          {text: 'ES6入门', link: 'http://es6.ruanyifeng.com/'},
        ],
      },
    ],
    sidebar: 'auto',
    sidebarDepth: 2,
    lastUpdated: 'Last Updated',
  },
};
