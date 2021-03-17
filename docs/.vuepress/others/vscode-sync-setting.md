---
title: vscode-sync-setting
date: 2018-05-25 15:49:01
type: 其他
tags: VSCode
note: 如何将不同设备上处的VSCode配置进行统一管理...
---

## VSCode配置的同步设置，实现不同设备上的统一

### 写在前面

* 准备工作：电脑上需安装VSCode，拥有一个github账户。实现同步的功能主要依赖于VSCode插件`Settings Sync`
* **Setting Sync 可同步包含的所有扩展和完整的用户文件夹** 
  * 设置文件
  * 快捷键设置文件
  * VSCode扩展设置
  * Launch File

<!--more-->
### 同步配置

#### 安装 同步插件"Settings Sync"

#### 生成token

* 登录Github账户设置，头像 ---> Settings 在左侧（最后一个） Developer settings ---> Personal access tokens；

![图片观看](https://i.loli.net/2018/05/26/5b096f4978275.png)

* 点击按钮 Generate new token 新增一个token

![流程一](https://i.loli.net/2018/05/26/5b096f6c74ee0.png)

![流程二](https://i.loli.net/2018/05/26/5b096f835206e.png)



![流程三](https://i.loli.net/2018/05/26/5b096f9a9b3de.png)



**提示**：记住生成的token值，最好找个笔记保存下来 。



#### 回到VSCode配置将token配置到本地

(Sync: Update / Uplaod Settings) `Shift + Alt + U` 在弹窗里输入你的token， 回车后会生成`syncSummary.txt`文件

![img](https://i.loli.net/2018/05/26/5b096fb7323ae.png)

syncSummary.txt文件会存储VSCode的设置及所安装的插件列表

此外可以将自己的token分享到自己的团队里面去，这样团队可以共用一套设置。 

#### 同步与下载

* 设置上同步下载设置
  * `Shift + Alt + U`，同步本地的配置更新到github；
  *  `Shift + Alt + D` ，在弹窗里输入你的gist值，稍后片刻便可同步成功

* 要重置同步设置，变更其它token
  * ` Ctrl+P ` 弹出输入>sync，即可重新配置你的其它token来同步
  
### 异端设置
![VSCode同步方案问题一](https://i.loli.net/2018/05/26/5b096fcdb900c.png)
