[![banner](https://z3.ax1x.com/2021/04/06/c3elOH.png)](https://imgtu.com/i/c3elOH)
# Text2Image

Text2Image 是一个可以将图片与文本互转的小工具。使用本工具，您可以将一般的文本转换成不易被阅读的图片，以达到隐蔽文本保存、分享、传输的目的。

![Language:EPL](https://img.shields.io/badge/Language-EPL-brightgreen)
![Language:JavaScript](https://img.shields.io/badge/Language-JavaScript-brightgreen)

## 如何使用？

### 软件版 （Windows）

- 在本页的 [`Release`](https://github.com/MisaLiu/Text2Image/releases) 一栏中下载最新版的 Text2Image ，直接运行
- 选择 `文本转图片` 选项
- 选择你想要转换的文本文件（也可以直接拖进目录框，仅支持 `txt` 格式文档），然后指定输出图片的位置
- 按下 `转换` 按钮，稍等片刻，一张充满文化气息的图片就出现在了你的硬盘中

如果需要将图片转换为文本文档，只需要选择 `图片转文本` 然后重复 3~4 步即可。

### 在线版

#### 图片转文字 模式

- 访问 https://t2i.misaliu.top/
- 点击 `导入文件` 按钮，选择需要转换的图片；
- 如果网站没有报错（提示「文件导入成功」），点击 `开始转换` 按钮；
- 只需片刻，您就应该会在「输入/输出区」看见您需要的内容。此时网站会有弹窗提示，并询问「是否需要复制内容到剪贴板」，按照个人需求选择是否即可。

#### 文字转图片 模式

- 访问 https://t2i.misaliu.top/
- 点击 `导入文件` 按钮，选择需要转换的文本文档（仅支持 `txt` 格式文件）。或者，直接在「输入/输出区」输入您需要转换的内容，推荐在30字以上；
- 如果一切都没有问题，点击 `开始转换` 按钮；
- 只需稍等片刻，网站即可将您需要的图片制作完成，并弹窗提示「是否立即下载图片」，根据个人需求选择是否即可。

## 例子

在 [`example`](https://github.com/MisaLiu/Text2Image/tree/main/example) 文件夹中存放了两个文件，一个是使用狗屁不通文章生成器生成的 [`example.txt`](https://github.com/MisaLiu/Text2Image/blob/main/example/example.txt) ，内含 500 个字。

而另外一个 [`example.jpg`](https://github.com/MisaLiu/Text2Image/blob/main/example/example.jpg) 就是该 txt 文档生成出来的图片。它看起来是这样的：

![例子](https://raw.githubusercontent.com/MisaLiu/Text2Image/main/example/example.jpg)

通过这个例子，你有没有对这个程序的用途有更多的了解了呢？

## 注意事项

### 图片相关

我们推荐您尽量使用 **无损方式** 来进行传输（e.g. 发送原图、将图片放入压缩包后再发送），这样可以避免因图片部分像素点失真而导致的转换出错。

请不要尝试转换非本工具生成的图片，您只有可能得到一坨乱码，或是什么也得不到。

### 文本相关

导入的文本文档仅支持 **UTF-8** 编码，如果使用如 GBK 等其他编码的文档，可能会导致乱码（本条仅适用于在线版）。

为了最大兼容性，不推荐转换包含 Emoji 的文本文档。

## Todo

- 制作手机版（Android）
- ~制作在线版~ https://t2i.misaliu.top

## 关于

本软件的灵感来自 B站@偶尔有点小迷糊 迷糊老师的 [这期视频](https://www.bilibili.com/video/BV1Ai4y1V7rg) 。

快去三连！快去关注！！

关于本软件的任何问题和建议都可以去本仓库提 issue ～
