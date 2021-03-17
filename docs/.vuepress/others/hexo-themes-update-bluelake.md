---
title: BlueLake博客主题的详细配置
date: 2018-05-09 16:07:46
type: 其他
tags: Hexo
note: 修改主题篇 --> 推荐二 --> hexo-theme-blueLake
---

## 1. 安装
### 1.1 安装主题
```
git clone https://github.com/chaooo/hexo-theme-BlueLake.git themes/BlueLake
```
### 1.2 安装主题渲染器
BlueLake是基于jade和stylus写的，所以需要安装`hexo-renderer-jade`和`hexo-renderer-stylus`来渲染。
```
npm install hexo-renderer-jade@0.3.0 --save
npm install hexo-renderer-stylus --save
```
### 1.3 启用主题
打开根`_config.yml`配置文件，找到theme字段，将其值改为BlueLake(先确认主题文件夹名称是否为BlueLake)。

```
// 根 _config.yml
theme: BlueLake
```
### 1.4 验证
首先启动 Hexo 本地站点，并开启调试模式：
```
hexo s --debug
```
在服务启动的过程，注意观察命令行输出是否有任何异常信息，如果你碰到问题，这些信息将帮助他人更好的定位错误。 当命令行输出中提示出：
```
INFO Hexo is running at http://0.0.0.0:4000/. Press Ctrl+C to stop.
此时即可使用浏览器访问 http://localhost:4000，检查站点是否正确运行。
```
### 1.5 更新主题
今后若主题添加了新功能正是您需要的，您可以直接git pull来更新主题。
```
cd themes/BlueLake
git pull
```

## 2. 配置
### 2.1 设置语言
该主题目前有七种语言：简体中文（zh-CN），繁体中文（zh-TW），英语（en），法语（fr-FR），德语（de-DE），韩语 （ko）,西班牙语（es-ES）；例如选用简体中文，在根_config.yml配置如下：
```
// 根 _config.yml
language: zh-CN
```
### 2.2 设置菜单
```
// 打开主题找到， themes/BlueLake/_config.yml
menu:
  - page: home
    directory: .
    icon: fa-home
  - page: archive
    directory: archives/
    icon: fa-archive
  # - page: about
  #   directory: about/
  #   icon: fa-user
  - page: rss
    directory: atom.xml
    icon: fa-rss
```
#### 2.2.1 添加about页面
```
// 此主题默认page页面是关于我页面的布局，在根目录下打开命令行窗口，生成一个关于我页面：
hexo new page 'about'

// 打开主题找到， themes/BlueLake/_config.yml
# About page
about:
  photo_url: ## 头像的链接地址 https://avatars0.githubusercontent.com/u/29102045?s=460&v=4
  items:
  - label: email
    url: ## 个人邮箱
    title: ## 邮箱用户名
  - label: github
    url: ## github主页
    title: ## github用户名
  - label: weibo
    url: ## weibo主页
    title: ## weibo用户名
# - label: twitter
#   url: 
#   title:
# - label: facebook
#   url:
#   title:
```

#### 2.2.2 安装 RSS(订阅) 和 sitemap(网站地图) 插件
* 在根目录下打开命令行窗口：
```
npm install hexo-generator-feed --save
npm install hexo-generator-sitemap --save
npm install hexo-generator-baidu-sitemap --save
```

* 添加主题_config.yml配置：
```
//  themes/BlueLake/_config.yml 

Plugins:
  hexo-generator-feed
  hexo-generator-sitemap
  hexo-generator-baidu-sitemap
feed:
  type: atom
  path: atom.xml
  limit: 20
sitemap:
  path: sitemap.xml
baidusitemap:
  path: baidusitemap.xml
```

### 2.3 添加本地搜索
安装插件`hexo-generator-json-content`来创建JSON数据文件：

 ```
 npm install hexo-generator-json-content@2.2.0 --save
 ```

然后在根_config.yml添加配置：
```
// 根_config.yml

jsonContent:
  meta: false
  pages: false
  posts:
    title: true
    date: true
    path: true
    text: true
    raw: false
    content: false
    slug: false
    updated: false
    comments: false
    link: false
    permalink: false
    excerpt: false
    categories: false
    tags: true
```

最后在主题themes/BlueLake/_config.yml添加配置：
```
//  themes/BlueLake/_config.yml   
local_search: true
```

### 2.4 其他配置
主题themes/BlueLake/_config.yml添加其他配置：

```
//  themes/BlueLake/_config.yml  
// show_category_count——是否显示分类下的文章数。
// widgets_on_small_screens——是否在小屏显示侧边栏，若true,则侧边栏挂件将显示在底部。

show_category_count: true 
widgets_on_small_screens: true
```

## 3. 扩展
* 添加评论
* 百度统计
* 卜算子阅读次数统计
* 微博秀

## 4. 参考
* [BlueLake博客主题的详细配置](http://chaoo.oschina.io/2016/12/29/BlueLake%E5%8D%9A%E5%AE%A2%E4%B8%BB%E9%A2%98%E7%9A%84%E8%AF%A6%E7%BB%86%E9%85%8D%E7%BD%AE.html)
* 更多配置参见 [BlueLake主题github](https://github.com/chaooo/hexo-theme-BlueLake)  可以点个star啦