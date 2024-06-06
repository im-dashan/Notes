# Maven的安装和配置

<br>

### 一、下载[`Maven`](https://maven.apache.org/download.cgi#)

![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-09_185016.png)

<br>

<br>

### 二、解压`Maven`

- 解压`Maven`，推荐解压到`D:`盘
- 解压后建议重命名文件夹`Maven-版本号`
  - 解压文件夹下一级就是`Maven`文件，不要再嵌套一个文件夹
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-09_185844.png)

<br>

<br>

### 三、配置`Maven`环境变量

- 在系统变量配置`MAVEN_HOME`变量，然后再`Path`中加入`MAVEN_HOME`变量

  - 变量值为解压的`Maven`路径
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-09_190737.png)
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-09_190819.png)
    - 依次点击确定，完成`Maven`环境变量配置

- 验证`Maven`环境变量是否安装成功

  - 在桌面打开`cmd`，输入以下命令

  - ```shell
    mvn -v
    ```

    - 出来以下界面表示配置`Maven`环境变量成功

    - ```shell
      C:\Users\大山>mvn -v
      Apache Maven 3.8.2 (ea98e05a04480131370aa0c110b8c54cf726c06f)
      Maven home: D:\Development_Environment\Maven-3.8.2
      Java version: 11.0.12, vendor: Oracle Corporation, runtime: D:\Development_Environment\JDK-11.0.12
      Default locale: zh_CN, platform encoding: GBK
      OS name: "windows 10", version: "10.0", arch: "amd64", family: "windows"
      ```

<br>

<br>

### 四、配置`Maven`

- 在`\Maven-3.8.2\`目录下创建存放`jar包`的本地仓库文件夹

  - `Warehouse`本地仓库文件夹

- 找到`\Maven-3.8.2\conf\settings.xml`文件，配置`settings.xml文件`

- 只需要替换`xml头文件` `本地仓库地址` `jdk版本`然后覆盖解压的`settings.xml`文件即可

  - `settings.xml`

  - ```xml
    <!-- 头文件 -->
    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
    
        <!-- 本地仓库地址 -->
        <localRepository>D:\Development_Environment\Maven-3.8.2\Warehouse</localRepository>
    
        <!-- 插件组 -->
        <pluginGroups></pluginGroups>
    
        <!-- 通过代理访问外部库 Servers：集成认证服务 -->
        <proxies></proxies>
        <servers></servers>
    
        <!-- 镜像库，可以指定内部中心库 -->
        <mirrors>
    		<!-- 阿里云仓库地址 -->
            <mirror>
                <id>aliyunmaven</id>
                <mirrorOf>central</mirrorOf>
                <name>阿里云公共仓库</name>
                <url>https://maven.aliyun.com/repository/public</url>
            </mirror>
    		<!-- 官方仓库地址 -->
            <mirror>
                <id>mavenCentral</id>
                <mirrorOf>central</mirrorOf>
                <name>mavenCentral</name>
                <url>https://repo.maven.apache.org/maven2/</url>
            </mirror>
        </mirrors>
    
        <!--个性配置，需要在Activation标签中激活 -->
        <profiles>
            <profile>
                <id>jdk-11</id>
                <activation>
                    <activeByDefault>true</activeByDefault>
                    <jdk>11</jdk>
                </activation>
                <properties>
                    <maven.compiler.source>11</maven.compiler.source>
                    <maven.compiler.target>11</maven.compiler.target>
                    <maven.compiler.compilerVersion>11</maven.compiler.compilerVersion>
                </properties>
            </profile>
        </profiles>
    </settings>
    ```

<br>

<br>

### 五、在`IDEA`中配置`Maven`

- 打开`IDEA`选择`File`→`Settings`→`maven`
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-13_204719.png)

- 双击`Maven`打开`Maven`子菜单，选择`lmporting`
  - 打钩的地方勾选上
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-13_205333.png)

- 选择`Runner`

  - 在`VM Options`种添加

    - ```shell
      -Xms128m -Xmx512m -Duser.language=zh -Dfile.encoding=UTF-8
      ```

    - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-13_205537.png)

- 选择`Repositories`
  
  - 选择仓库地址后点击`Update`，到这里就配置完成了
  - ![](https://github.com/Dashan-IZ/DS_Installation/raw/master/Images/Maven-Images/2021-09-12_174547.png)
