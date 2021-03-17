---
title: Yilia博客主题的详情配置
date: 2018-05-09 14:19:39
type: 其他
tags: Hexo
note: 修改主题篇 --> 推荐一 --> hexo-theme-yilia
---

## 修改主题
默认主题比较丑哒，在这里可以选择符合自己风格的[官方主题](https://hexo.io/themes/)
比较推荐的主题之一：[hexo-theme-yilia](https://github.com/litten/hexo-theme-yilia)

<!--more-->
* 下载主题
``` bash
// 进入Hexo的安装目录，右键打开 Git Bash Here
$ git clone https://github.com/litten/hexo-theme-yilia.git themes/yilia
```

* 修改配置
``` bash
修改`_config.yml`中的`theme: landscape`改为`theme: yilia`，然后重新执行`hexo generate`来重新生成。
运行查看本地效果 'hexo server'
如果出现一些莫名其妙的问题，可以先执行`hexo clean`来清理一下public的内容，然后再来重新生成和发布。
```

* 上传Github
``` bash
// Hexo的安装目录，右键打开 Git Bash Here
$ hexo deploy         // 就会将本次有改动的代码全部提交，没有改动的不会.
```

## 常用hexo命令
* 常用命令
```
hexo new "postName" #新建文章
hexo new page "pageName" #新建页面
hexo generate #生成静态页面至public目录
hexo server #开启预览访问端口（默认端口4000，'ctrl + c'关闭server）
hexo deploy #部署到GitHub
hexo help  # 查看帮助
hexo version  #查看Hexo的版本
```

* 缩写命令
```
hexo n == hexo new
hexo g == hexo generate
hexo s == hexo server
hexo d == hexo deploy
```

* 组合命令
```
hexo s -g #生成并本地预览
hexo d -g #生成并上传
```

## 写博客
### 创建一篇新文章
定位到Hexo根目录，打开 Git Bash Here，执行命令
``` bash
$ hexo new 'my-first-blog'  // 文件名中间不能出现空格
```

hexo会帮我们在`...\Hexo\source\_posts`下生成相关md文件
``` bash
INFO  Created: D:\Hexo\source\_posts\my-first-blog.md
```

用markdown编辑器打开这个文件，就可以进行编辑了
```
// 默认生成如下
title: my-first-blog
date: 2018-05-09 14:19:39
tags: 
```

当然你也可以直接自己新建md文件，用这个命令的好处是帮我们自动生成了时间。

一般完整的格式如下
```
---
title: postName #文章页面上的显示名称，一般是中文
date: 2013-12-02 15:30:16 #文章生成时间，一般不改，当然也可以任意修改
categories: 默认分类 #分类
tags: [tag1,tag2,tag3] #文章标签，可空，多标签请用格式，注意:后面有个空格
description: 附加一段文章摘要，字数最好在140字以内，会出现在meta的description里面
---

以下是正文
..........

```

### 如何让博文列表不显示全部内容
此主题默认情况下，生成的博文目录会显示全部的文章内容，如何设置文章摘要的长度呢？
答案是在合适的位置加上`<!--more-->`即可，例如：
```
# 前言

使用github pages服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；

<!--more-->

4. 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；
6. 等等；
```

## 参考
* [使用hexo+github搭建免费个人博客详细教程](http://blog.haoji.me/build-blog-website-by-hexo-github.html?from=xa#xiu-gai-zhu-ti)
* 更多配置参见 [Yilia主题github](https://github.com/litten/hexo-theme-yilia)  可以点个star啦