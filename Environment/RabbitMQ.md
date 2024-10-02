# `RabbitMQ`安装

<br>

- ###### [erlang/otp](https://github.com/erlang/otp)环境Github下载地址

- ###### [rabbitmq/rabbitmq-server](https://github.com/rabbitmq/rabbitmq-server)Github下载地址

<br>

<br>

### 一、把下载的文件上传到`Linux`

<br>

![下载的文件](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/RabbitMQ/2021-08-02_202334.png)

<br>

- 这里我把文件上传到`Linux`的 `/home/mytest/`目录文件夹下`该步骤省略`
- 进入`mytest`目录文件夹

```shell
cd /home/mytest/
```

<br>

<br>

<br>

### 二、解压&安装`Erlang`环境

- 先解压`otp_src_24.0.5.tar.gz`文件到`/usr/local/`目录文件夹下

```shell
tar -zxvf otp_src_24.0.5.tar.gz -C /usr/local/
```

<br>

- 安装`RabbitMQ`之前必须要先安装所需要的依赖包可以使用下面的一次性安装命令

```shell
yum install gcc glibc-devel make ncurses-devel openssl-devel xmlto -y
```

<br>

- 进入到`/usr/local/otp_src_24.0.5/`目录文件夹下

```shell
cd /usr/local/otp_src_24.0.5/
```

<br>

- 配置`erlang`的安装信息

```shell
./configure --prefix=/usr/local/erlang --without-javac
```

<br>

- 编译并安装

```shell
make && make install
```

<br>

- 进入`/usr/local/erlang/` `erlang`安装目录文件夹下

```shell
cd /usr/local/erlang/
```

<br>

- 配置环境变量

```shell
vim /etc/profile
```

<br>

- 将这些配置填写到profile文件的最后
- erlang安装目录`/usr/local/erlang`

```shell
ERL_HOME=/usr/local/erlang
PATH=$ERL_HOME/bin:$PATH
export ERL_HOME PATH
```

<br>

- 保存退出

```
:wq
```

<br>

- 启动环境变量配置文件

```shell
source /etc/profile
```

<br>

- 查看安装版本

```
erl -version
```

<br>

- 如果出现`Erlang (SMP,ASYNC_THREADS) (BEAM) emulator version 12.0.3`则表明安装成功

<br>

<br>

<br>

### 三、`RabbitMQ`安装

<br>

- 进入`/home/mytest/`目录文件夹下

```shell
cd /home/mytest/
```

<br>

- 安装 `RabbitMQ`
- `/home/mytest/`目录文件夹下的的`rabbitmq-server-3.9.1-1.el8.noarch.rpm`

```shell
rpm -ivh --nodeps rabbitmq-server-3.9.1-1.el8.noarch.rpm
```

<br>

<br>

<br>

### 四、插件管理

<br>

- 注意：`RabbitMQ`启动以后可以使用浏览器进入管控台
- 但是默认情况`RabbitMQ`不允许直接使用浏览器浏览器进行访问因此必须添加插件

```shell
rabbitmq-plugins enable rabbitmq_management
```

<br>

<br>

<br>

### 五、`RabbitMQ`常用命令

<br>

- 启动`RabbitMQ`		`&`后台启动

```shell
rabbitmq-server start &
```

<br>

- 停止`RabbitMQ`服务

```shell
rabbitmqctl stop
```

<br>

- 注意：这里可能会出现错误
- 错误原因是：`/var/lib/rabbitmq/.erlang.cookie`文件权限不够
- 解决方案对这个文件授权

```shell
chown rabbitmq:rabbitmq /var/lib/rabbitmq/.erlang.cookie

chmod 400 /var/lib/rabbitmq/.erlang.cookie
```

<br>

- 进入`/var/lib/rabbitmq/`目录文件夹下

```shell
cd /var/lib/rabbitmq/
```

- 显示隐藏文件夹

```shell
ls -al
```

- 查看`.erlang.cookie`文件的权限是否为`-r--------`

```shell
[root@localhost rabbitmq]# ls -al
总用量 8
drwxr-xr-x.  3 rabbitmq rabbitmq   42 8月   3 09:05 .
drwxr-xr-x. 30 root     root     4096 8月   3 09:00 ..
-r--------.  1 rabbitmq rabbitmq   20 8月   3 00:00 .erlang.cookie
drwxr-x---.  4 rabbitmq rabbitmq  135 8月   3 09:13 mnesia
```

<br>

- 开放`15672`端口号，`依次执行`

```shell
firewall-cmd --add-port=15672/tcp --permanent

curl localhost:15672

firewall-cmd --reload
```

<br>

<br>

<br>

### 六、创建账号

<br>

- `RabbitMQ`安装成功后使用默认用户名`guest`登录

```shell
账号：guest

密码：guest
```

`注意：`这里`guest`只允许本机登录访问需要创建用户并授权远程访问命令如下

<br>

- 如果你需要帮助的话

```shell
rabbitmqctl --help
```

<br>

-  添加用户`必要操作`

```shell
rabbitmqctl add_user {username} {password}

// 示例，创建root用户，密码为root
rabbitmqctl add_user root root
```

<br>

- 设置用户角色`必要操作`

```shell
rabbitmqctl set_user_tags {username} {tag}

// 示例，给root用户设置管理员角色
rabbitmqctl set_user_tags root administrator
```

<br>

-  删除用户

```shell
rabbitmqctl delete_user {username}
```

 <br>

- 修改密码

```shell
rabbitmqctl change_password {username} {newpassword}

// 示例， 修改密码为123456
rabbitmqctl change_password root 123456
```

 <br>

<br>

<br>

### 七、登录`RabbitMQ`

<br>

- ###### [登录`RabbitMQ`](http://192.168.152.37:15672)	`自己的`

- 登录`RabbitMQ`	`ip地址`+`端口号`



