# Maven的安装和配置

<br>

### 一、下载[`Maven`](https://maven.apache.org/download.cgi#)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-09_185016.png)

<br>

<br>

### 二、解压`Maven`

- 解压`Maven`，推荐解压到`D:`盘
- 解压后建议重命名文件夹`Maven-版本号`
  - 解压文件夹下一级就是`Maven`文件，不要再嵌套一个文件夹
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-09_185844.png)

<br>

<br>

### 三、配置`Maven`环境变量

- 在系统变量配置`MAVEN_HOME`变量，然后再`Path`中加入`MAVEN_HOME`变量

  - 变量值为解压的`Maven`路径
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-09_190737.png)
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-09_190819.png)
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

- 在`\Maven-x.x.x\`目录下创建存放`jar包`的本地仓库文件夹

  - `repository`本地仓库文件夹

- 找到`\Maven-x.x.x\conf\settings.xml`文件，配置`settings.xml文件`

- 只需要替换`xml头文件` `本地仓库地址` `jdk版本`然后覆盖解压的`settings.xml`文件即可

  - `settings.xml`

  - ```xml
    <?xml version="1.0" encoding="UTF-8"?>
    <settings xmlns="http://maven.apache.org/SETTINGS/1.2.0"
              xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
              xsi:schemaLocation="http://maven.apache.org/SETTINGS/1.2.0 https://maven.apache.org/xsd/settings-1.2.0.xsd">
      
      <!-- 配置本地仓库路径 -->
      <localRepository>D:\environment\maven-3.9.7\repository</localRepository>
    
      <pluginGroups></pluginGroups>
      <proxies></proxies>
      <servers></servers>
      <!-- 配置下载源 -->
      <mirrors>
        <mirror>
          <id>aliyun-central</id>
          <mirrorOf>central</mirrorOf>
          <name>Aliyun Maven Central</name>
          <url>https://maven.aliyun.com/repository/public</url>
        </mirror>
        <mirror>
          <id>huawei-central</id>
          <mirrorOf>central</mirrorOf>
          <name>Huawei Maven Central</name>
          <url>https://repo.huaweicloud.com/repository/maven/</url>
        </mirror>
        <mirror>
          <id>tencent-central</id>
          <mirrorOf>central</mirrorOf>
          <name>Tencent Maven Central</name>
          <url>https://mirrors.cloud.tencent.com/nexus/repository/maven-public/</url>
        </mirror>
      </mirrors>
    
      <profiles>
        <!-- 配置并行下载 -->
        <profile>
          <id>parallel-download</id>
          <activation>
            <activeByDefault>true</activeByDefault>
          </activation>
          <properties>
            <maven.artifact.threads>5</maven.artifact.threads>
          </properties>
        </profile>
        <!-- 配置jdk版本 -->
        <profile>
          <id>jdk-21</id>
          <activation>
            <activeByDefault>true</activeByDefault>
            <jdk>21</jdk>
          </activation>
          <properties>
            <maven.compiler.source>21</maven.compiler.source>
            <maven.compiler.target>21</maven.compiler.target>
            <maven.compiler.release>21</maven.compiler.release>
          </properties>
        </profile>
      </profiles>
    </settings>
    ```

<br>

<br>

### 五、在`IDEA`中配置`Maven`

- 打开`IDEA`选择`File`→`Settings`→`maven`
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-13_204719.png)

- 双击`Maven`打开`Maven`子菜单，选择`lmporting`
  - 打钩的地方勾选上
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-13_205333.png)

- 选择`Runner`

  - 在`VM Options`种添加

    - ```shell
      -Xms128m -Xmx512m -Duser.language=zh -Dfile.encoding=UTF-8
      ```

    - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-13_205537.png)

- 选择`Repositories`
  
  - 选择仓库地址后点击`Update`，到这里就配置完成了
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Maven/2021-09-12_174547.png)
