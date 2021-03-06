module.exports = {
  title: '我的博客', // 显示在左上角的网页名称以及首页在浏览器标签显示的title名称
  description: '前端技术博客', // meta 中的描述文字，用于SEO
  // 注入到当前页面的 HTML <head> 中的标签
  head: [
    ['link',
      { rel: 'icon', href: '/blog-logo.png' }
      //浏览器的标签栏的网页图标，第一个'/'会遍历public文件夹的文件
    ],
  ],
  themeConfig: {
    logo: false,  //网页顶端导航栏左上角的图标

    //顶部导航栏
    nav: [
      //格式一：直接跳转，'/'为不添加路由，跳转至首页
      { text: '首页', link: '/' },

      //格式二：添加下拉菜单，link指向的文件路径
      // {
      //   text: '分类',  //默认显示
      //   ariaLabel: '分类',   //用于识别的label
      //   items: [
      //     { text: '文章', link: '/pages/folder1/test1.md' },
      //     //点击标签会跳转至link的markdown文件生成的页面
      //     { text: '琐碎', link: '/pages/folder2/test4.md' },
      //   ]
      // },
      { text: '文章', link: '/pages/ES6/main.md' },

      //格式三：跳转至外部网页，需http/https前缀
      { text: 'Github', link: 'https://github.com/jiangqianqian' },
    ],

    sidebar: false,

    //侧边导航栏：会根据当前的文件路径是否匹配侧边栏数据，自动显示/隐藏
    // sidebar: [
    //   {
    //     title: 'ES6',   // 必要的
    //     path: '/pages/ES6/main.md',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //   },
    //   {
    //     title: 'Vue',   // 必要的
    //     path: '/pages/Vue/main.md',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //   },
    //   // {
    //   //   title: '移动端',   // 必要的
    //   //   path: '/pages/Mobile/main.md',      // 可选的, 应该是一个绝对路径
    //   //   collapsable: false, // 可选的, 默认值是 true,
    //   // },
    //   {
    //     title: '地图使用',   // 必要的
    //     path: '/pages/Map/main.md',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //   },
    //   {
    //     title: '网络',   // 必要的
    //     path: '/pages/Network/main.md',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //   },
    //   {
    //     title: 'Webpack',   // 必要的
    //     path: '/pages/Webpack/main.md',      // 可选的, 应该是一个绝对路径
    //     collapsable: false, // 可选的, 默认值是 true,
    //   },
    //   // {
    //   //   title: 'NodeJS',   // 必要的
    //   //   path: '/pages/Node/main.md',      // 可选的, 应该是一个绝对路径
    //   //   collapsable: false, // 可选的, 默认值是 true,
    //   // },
    //   // {
    //   //   title: '安全',   // 必要的
    //   //   path: '/pages/Secure/main.md',      // 可选的, 应该是一个绝对路径
    //   //   collapsable: false, // 可选的, 默认值是 true,
    //   // },
    // ]
  }
}
