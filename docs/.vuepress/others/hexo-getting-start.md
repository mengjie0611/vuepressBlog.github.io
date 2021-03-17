---
title: Hexo 入门初级指南
date: 2018-05-09 11:07:33
type: 其他
tags: Hexo
note: 使用GitHub搭建Hexo博客完整操作手册
---

## 写在前边
使用github pages服务搭建博客的好处有：

1. 全是静态文件，访问速度快；
2. 免费方便，不用花一分钱就可以搭建一个自由的个人博客，不需要服务器不需要后台；
3. 可以随意绑定自己的域名，不仔细看的话根本看不出来你的网站是基于github的；

<!--more-->

4. 数据绝对安全，基于github的版本管理，想恢复到哪个历史版本都行；
5. 博客内容可以轻松打包、转移、发布到其它平台；

## 准备工作
### 安装 Node.js

### 安装 Git

## 安装 Hexo
* 打开命令行，在命令行中输入以下命令:
  `npm install -g hexo-cli` 
* 安装Hexo的Git插件（如果不安装这个插件，会导致Hexo博客内容无法发布）
  `npm install hexo-deployer-git --save`

## 本地搭建Hexo博客
* 打开命令行，输入以下命令，用于创建Hexo博客目录。
    ```
    // 指的是用于创建Hexo博客的目录，例如 e:/hexo  hexo init <folder>
    hexo init e:/Hexo 
    ```
* 进入创建的项目，打开命令行，输入如下命令
    ```
    npm install
    ```

* 初始化完毕后，可以在命令行中输入以下命令，启动本地Hexo博客程序。 
    ```
    npm server
    ```

* 命令行出现如下信息，打开浏览器，访问 http://localhost:4000 就可以访问本地的Hexo博客程序了。
    ```
    $ hexo s
    INFO  Start processing
    INFO  Hexo is running at http://localhost:4000/. Press Ctrl+C to stop.
    ```

## **发布博客到GitHub**
* 注册GitHub账户
* 创建GitHub工程
* 配置Hexo程序
```
// 进入Hexo的安装目录，打开_config.yml配置文件。

# Site
title: 网站名称
subtitle: 网站简介
description:
author: 作者
language:
timezone:

# URL
## If your site is put in a subdirectory, set url as 'http://yoursite.com/child' and root as '/child/'
url: 网站域名  (例如：https://marlonchiu.github.io/)
root: /
permalink: :category/:title.html
permalink_defaults:

...

# Deployment
## Docs: http://hexo.io/docs/deployment.html
deploy:
  type: git
  repository: GitHub新建工程的地址（例如 git@github.com:marlonchiu/marlonchiu.github.io.git）
  branch: master
```

## 发布Hexo到GitHub
* 在Hexo的安装目录中，鼠标右键选择”Git Bash Here”选项。
* 在Git命令行中，输入以下命令。
    ```
    // 生成hexo本地目录结构
    hexo generate

    // 将hexo本地目录上传至GitCafe
    hexo deploy
    ```

> 试水详情请参照：[龙云全栈](http://www.longestory.com/2017/12/29/create-hexo-deploy-to-github.html)