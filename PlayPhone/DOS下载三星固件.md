

# 用DOS命令下载三星固件

<br>

### <div align = "center">如果图片加载不出来，请用`VPN`访问</div>

<br>

### 为什么要使用DOS命令下载固件？

- SamFirm和Frija工具已经不可用
- DOS命令下载快速，轻量，稳定
- 从官方服务器下载三星任何固件

<br>

<br>

### 一、准备工作

- [Python官网下载地址](https://www.python.org/downloads/release/python-395/)
- [get-pip.py官网下载地址](https://bootstrap.pypa.io/get-pip.py)
- [Samloader工具GiHub开源地址](https://github.com/nlscc/samloader)

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_0.png)

<br>

- [三星驱动下载地址可以参考上一篇教程](https://github.com/im-dashan/Notes/blob/main/玩机技巧/安卓卸载内置软件.md)

<br>
<br>

### 二、python安装及配置

<br>

- 用`这里恩恩` 提供的下载地址解压获得以下内容：

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_1.png)

<br>

- 解压`python-3.9.5-embed-amd64.zip`到`D:`盘（推荐）
- 如图：

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_2.png)

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_3.png)

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_4.png)

<br>

[配置环境变量这里简单说一下，具体详细步骤参考第一篇文章](https://github.com/im-dashan/Notes/blob/main/玩机技巧/安卓卸载内置软件.md) 

<br>

<br>

- 系统变量中配置`Python`

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_5.png)

<br>

- 系统`Path`变量中配置`Python`变量：

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_6.png)

- 完成**第一步**环境变量配置。

<br>

<br>

<br>

###  三、修改python39.pth文件

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_7.png)

<br>

<br>

<br>

### 四、安装get-pip.py

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_8.png)

<br>

- 把文件`get-pip.py`复制到`python-3.9`文件夹根目录中，该地址下运行`cmd`

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_9.png)

<br>

<br>

```shell
cmd窗口输入

//安装pip 
python get-pip.py
```

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_10.png)

<br>

- 出现如下命令说明安装pip成功，现在`python-3.9`根目录多了两个文件夹，如图：


![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_11.png)

<br>

-  在配置文件`python39._pth`中用记事本打开加入`Lib\site-packages`如图：

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_12.png)

<br>

- 把`Scripts`文件夹配置到`Path`变量中

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_13.png)

- 环境变量配置完毕 


<br>

<br>

<br>

### 五、安装`samloader-master`

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_14.png)

<br>

- 解压`samloader-master.zip`，解压地址下运行`cmd`

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_15.png) 

<br>

- `cmd`窗口输入命令来安装`samloader-master`

```
//安装samloader-master 
python setup.py install

如图：
```

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_16.png)

`到这里环境已经搭建完毕，可以通过任意位置打开cmd用命令来获取任意的三星固件了`

<br>

<br>

<br>

### 六、用DOS命令下载固件获取固件命令：

`注意后面` `.` `不要忽略，命令没有换行符，因为屏幕太窄有些设备看起来命令间有换行`

<br>

<br>

`检查三星Galaxy设备的最新固件`

```shell
samloader -m <model> -r <region> checkupdate
```

`例如：检查中国 (CHC) 的 Galaxy S21 (SM-G9910) 的最新固件，命令应如下所示：`

```shell
samloader -m SM-G9910 -r CHC checkupdate
```

`该命令应输出固件版本，例如：`

```shell
G9910ZCU2AUDD/G9910CHC2AUDD/G9910ZCU2AUE1/G9910ZCU2AUDD
```

`复制显示的完整固件版本。你将在下一个命令中需要它。`

<br>

<br>

<br>

`使用以下命令为您的三星 Galaxy 设备下载最新的固件更新：`

```shell
samloader -m <model> -r <region> download -v <version> -O <output-dir>
```

`我想在"CHC"区域为 SM-G9910 下载上面输出的最新固件，那么命令应该是：`

```shell
samloader -m SM-G9910 -r CHC download -v G9910ZCU2AUDD/G9910CHC2AUDD/G9910ZCU2AUE1/G9910ZCU2AUDD -O .
```

`下载进度将显示在cmd窗口`

```shell
downloading SM-G9910_1_20210512142736_ofnn115ugq_fac.zip.enc4
[###########                     ] 44281/119835 - 00:07:40
```

<br>

<br>

<br>`从三星服务器下载的固件更新文件以.enc2格式（对于较旧的设备）或.enc4格式（对于较新的设备）进行解密。因此，你必须将固件文件解密为常规.zip格式。解密下载的 enc2/enc4 固件文件，请使用以下命令：`

```shell
samloader -m <model> -r <region> decrypt -v <version> -V <enc-version> -i <input-file> -o <output-file>
```

`我想在 CHC 区域为我的 Galaxy S21 (SM-G9910) 解密固件文件 (SM-G9910_1_20210512142736_ofnn115ugq_fac.zip.enc4)，命令应该是：`

```shell
samloader -m SM-G9910 -r CHC decrypt -v G9910ZCU2AUDD/G9910CHC2AUDD/G9910ZCU2AUE1/G9910ZCU2AUDD -V 4 -i SM-G9910_1_20210512142736_ofnn115ugq_fac.zip.enc4 -o SM-G9910_1_20210512142736_ofnn115ugq_fac.zip
```

<br>

<br>

<br>

- 注意你在什么地方运行的`cmd`窗口，下载的固件就在什么位置。
- 推荐桌面创建`ROM文件夹`，在`ROM文件夹根目录`运行`cmd`，这样下载的固件就在`ROM`文件夹下
- 用`Galaxy S21 SM-G9910` 作为演示机型，注意变通

![图片加载失败，请使用vpn打开网址！！！](https://github.com/im-dashan/Notes/raw/main/玩机技巧/Images/DOS下载三星固件/image_17.png) 

