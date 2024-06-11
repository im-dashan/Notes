# Tomcat的安装和配置

<br>

### 一、下载[`Tomcat`](https://tomcat.apache.org/download-90.cgi)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Tomcat/2021-09-19_170056.png)

<br>

<br>

### 二、解压`Tomcat`并配置环境变量

- 解压`Tomcat`

- 配置环境变量

  - 复制`Tomcat`根路径，在环境变量中配置它

  - ```shell
    # 变量名
    CATALINA_HOME
    # Tomcat解压根路径
    D:\Development_Environment\Tomcat-9.0.52
    # 然后在Path中添加Tomcat系统变量
    %CATALINA_HOME%\bin
    ```

  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Tomcat/2021-09-19_170703.png)

  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Tomcat/2021-09-19_171301.png)

  - 依次点击环境变量完成`Tomcat`环境变量配置

<br>

<br>

### 三、修改`Tomcat`启动日志文件，解决乱码问题

- 找到`Tomcat`配置文件

  - `Tomcat`根目录→`conf`→`logging.properties`

  - 把`UTF-8`改为`GBK`即可解决乱码问题

  - ```shell
    1catalina.org.apache.juli.AsyncFileHandler.level = FINE
    1catalina.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
    1catalina.org.apache.juli.AsyncFileHandler.prefix = catalina.
    1catalina.org.apache.juli.AsyncFileHandler.maxDays = 90
    1catalina.org.apache.juli.AsyncFileHandler.encoding = GBK
    
    2localhost.org.apache.juli.AsyncFileHandler.level = FINE
    2localhost.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
    2localhost.org.apache.juli.AsyncFileHandler.prefix = localhost.
    2localhost.org.apache.juli.AsyncFileHandler.maxDays = 90
    2localhost.org.apache.juli.AsyncFileHandler.encoding = GBK
    
    3manager.org.apache.juli.AsyncFileHandler.level = FINE
    3manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
    3manager.org.apache.juli.AsyncFileHandler.prefix = manager.
    3manager.org.apache.juli.AsyncFileHandler.maxDays = 90
    3manager.org.apache.juli.AsyncFileHandler.encoding = GBK
    
    4host-manager.org.apache.juli.AsyncFileHandler.level = FINE
    4host-manager.org.apache.juli.AsyncFileHandler.directory = ${catalina.base}/logs
    4host-manager.org.apache.juli.AsyncFileHandler.prefix = host-manager.
    4host-manager.org.apache.juli.AsyncFileHandler.maxDays = 90
    4host-manager.org.apache.juli.AsyncFileHandler.encoding = GBK
    
    java.util.logging.ConsoleHandler.level = FINE
    java.util.logging.ConsoleHandler.formatter = org.apache.juli.OneLineFormatter
    java.util.logging.ConsoleHandler.encoding = GBK
    ```

  - 这样乱码问题就解决了

<br>

<br>

### 四、`IDEA`中配置`Tomcat`

- 打开`idea`→选择`Edit Configurations...`
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Tomcat/2021-09-19_174752.png)

- 选择`+`→`Tomcat Server`→`Local`
  - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/Tomcat/2021-09-19_175354.png)

