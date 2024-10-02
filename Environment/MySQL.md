# `MySQL`安装教程-`Windows`

<br>

### 一、下载[`MySQL`](https://dev.mysql.com/downloads/)

<br>

### 二、解压`MySQL`到安装目录

<br>

### 三、配置`MySQL`

进入解压目录下的`bin`目录，运行`cmd`

```shell
D:\Development_Environment\MySQL\bin
```

<br>

##### 依次执行以下命令：

`安装mysql服务`

```shell
mysqld --install
```

`安装成功标识`

```shell
Service successfully installed.
```

<br>

`初始化mysql`

```shell
mysqld --initialize --console
```

***这条命令会生成`mysql`初始密码，需要记住，在登录`mysql`时候会用到***

`安装成功标识`	`初始密码` `AZgs>Ll3;QRQ`

```shell
D:\Development_Environment\MySQL\bin>mysqld --initialize --console
2021-09-08T10:32:34.879846Z 0 [System] [MY-013169] [Server] D:\Development_Environment\MySQL\bin\mysqld.exe (mysqld 8.0.26) initializing of server in progress as process 14168
2021-09-08T10:32:34.899042Z 1 [System] [MY-013576] [InnoDB] InnoDB initialization has started.
2021-09-08T10:32:35.401003Z 1 [System] [MY-013577] [InnoDB] InnoDB initialization has ended.
2021-09-08T10:32:36.527609Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1 is enabled for channel mysql_main
2021-09-08T10:32:36.528128Z 0 [Warning] [MY-013746] [Server] A deprecated TLS version TLSv1.1 is enabled for channel mysql_main
2021-09-08T10:32:36.741459Z 6 [Note] [MY-010454] [Server] A temporary password is generated for root@localhost: AZgs>Ll3;QRQ
```

<br>

`开启mysql的服务`

```shel
net start mysql
```

`安装成功标识`

```shell
D:\Development_Environment\MySQL\bin>net start mysql
MySQL 服务正在启动 .
MySQL 服务已经启动成功。
```

<br>

`登录mysql`

```shell
mysql -u root -p
```

```shell
Enter PassWord：(密码)
```

`登录成功标识`

```shell
D:\Development_Environment\MySQL\bin>mysql -u root -p
Enter password: ************
Welcome to the MySQL monitor.  Commands end with ; or \g.
Your MySQL connection id is 8
Server version: 8.0.26

Copyright (c) 2000, 2021, Oracle and/or its affiliates.

Oracle is a registered trademark of Oracle Corporation and/or its
affiliates. Other names may be trademarks of their respective
owners.

Type 'help;' or '\h' for help. Type '\c' to clear the current input statement.

mysql>
```

<br>

`修改密码`

```shel
alter user 'root'@'localhost' identified by '密码';
```

`修改成功标识`

```shell
mysql> alter user 'root'@'localhost' identified by '1234';
Query OK, 0 rows affected (0.02 sec)

mysql>
```

***到这里`mysql`就配置完成了***

<br>

### 四、配置`MySQL`环境变量

`系统变量下配置MySQL`

`在Path中添加系统变量MySQL`

***依次点击确定完成`MySQL`安装***

<br>

### 五、可能会出现的错误

- 由于找不到`MSVCR120.dll`，无法继续执行代码。重新安装程序可能会解决此问题
- 由于找不到`VCRUNTIME140_1.dll`，无法继续执行代码。重新安装程序可能会解决此问题
  - **解决办法**
    - 系统缺少[`Visual C++`](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0)，安装完成后即可解决问题

<br>

- ```shell
  # 出现的问题
  C:\Users\大山>mysql -u root -p
  Enter password: ****
  ERROR 2003 (HY000): Can't connect to MySQL server on 'localhost:3306' (10061)
  ```

  - **解决办法**

    - 用管理员权限在`mysql/bin`目录下运行`cmd`输入以下命令
    
      - ```shell
        # 启动mysql服务，这个原因是因为mysql服务没有启动导致的
        net start mysql
        ```







# `MySQL`安装教程-`Linux`



- 下载`MySQL` `Linux`通用版本


```sh
wget https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.0-linux-glibc2.28-x86_64.tar.xz
```

- 从`/home`文件夹解压文件到`/usr/local`


```sh
tar -xvf mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz -C /usr/local/
```

- 重命名解压文件夹


```sh
mv  mysql-8.4.0-linux-glibc2.28-x86_64/ mysql-8.4.0
```

- 在`mysql-8.4.0`文件夹创建`data`文件夹


```sh
mkdir data
```

- 在`mysql-8.4.0`文件夹创建`logs`文件夹

```sh
mkdir logs
```

- 在`logs`文件夹中创建`log`日志文件

```sh
error.log

slow.log
```

- 在`mysql-8.4.0`文件夹创建`my.cnf`配置文件

```ini
[client]
port = 6033
default-character-set = utf8mb4

[mysql]
port = 6033
default-character-set = utf8mb4

[mysqld]
port = 6033
character-set-server = utf8mb4
collation-server = utf8mb4_general_ci

# 设置文件路径
basedir = /usr/local/mysql-8.4.0
datadir = /usr/local/mysql-8.4.0/data
socket = /usr/local/mysql-8.4.0/data/mysql.sock
mysqlx_socket = /usr/local/mysql-8.4.0/data/mysqlx.sock
mysqlx = ON

# 允许最大连接数
max_connections = 1000
max_connect_errors = 50

# 超时设置
wait_timeout = 300
interactive_timeout = 300

# 缓冲区和缓存
innodb_buffer_pool_size = 8G
innodb_log_file_size = 512M
innodb_log_buffer_size = 64M
innodb_file_per_table = 1
innodb_flush_log_at_trx_commit = 2
innodb_flush_method = O_DIRECT

# 临时表和缓存
tmp_table_size = 256M
max_heap_table_size = 256M
table_open_cache = 2000
table_definition_cache = 2000

# 错误日志记录
log_error = /usr/local/mysql-8.4.0/logs/error.log
slow_query_log_file = /usr/local/mysql-8.4.0/logs/slow.log
long_query_time = 1
slow_query_log = 1
```

- 进入`mysql-8.4.0/bin`文件夹运行


```sh
useradd mysql
```

- 初始化数据库，此步骤会生成数据库`初始密码`记得保存


```sh
./mysqld --initialize --user=mysql --datadir=/usr/local/mysql-8.4.0/data --basedir=/usr/local/mysql-8.4.0
```

- 生成如下内容，密码是`7LMsd(r_(lP.`


```sh
root@localhost: 7LMsd(r_(lP.
```

- 进入安装目录的上级`/usr/local`修改安装文件夹权限


```sh
chown -R mysql:mysql /usr/local/mysql-8.4.0/
```

- 启动数据库`/bin`


```sh
./mysqld_safe &

# 配置文件启动
./mysqld_safe --defaults-file=../my.cnf &
```

- 登入数据库


```sh
./mysql -u root -p
```

- 输入数据库初始密码


```sh
7LMsd(r_(lP.
```

- 修改用户`root`在`localhost`上的密码为 `xxxx`。


```sh
alter user 'root'@'localhost' identified by 'xxxx';
```

- 创建一个用户名为`root`的用户，并设置密码为 `xxxx`，该用户可以从任何主机连接到`MySQL`服务器。


```sh
create user root@'%' identified by 'xxxx';
```

- 赋予用户 `root`（从任何主机连接的）对所有数据库和表的所有权限，并允许该用户将这些权限授予其他用户。


```sh
grant all privileges on *.* to root@'%' with grant option;
```

- 刷新,安装完成


```sh
flush privileges;
```

- 缺少libaio.so.1的解决方案

```sh
sudo find / -name libaio.so.1t64

ls -l /usr/lib/x86_64-linux-gnu/libaio.so.1t64

sudo ln -s /usr/lib/x86_64-linux-gnu/libaio.so.1t64 /usr/lib/x86_64-linux-gnu/libaio.so.1

```

