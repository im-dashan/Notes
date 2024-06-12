# `MySQL`安装教程-`Windows`

<br>

### 一、下载[`MySQL`](https://dev.mysql.com/downloads/)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_180121.png)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_180620.png)

<br>

<br>

### 二、解压`MySQL`到安装目录

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_181220.png)

<br>

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

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_184327.png)

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

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_183310.png)

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

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_184441.png)

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

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_185609.png)

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

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_190000.png)

***到这里`mysql`就配置完成了***

<br>

<br>

### 四、配置`MySQL`环境变量

`系统变量下配置MySQL`

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_190544.png)

`在Path中添加系统变量MySQL`

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_191051.png)

***依次点击确定完成`MySQL`安装***

<br>

<br>

### 五、可能会出现的错误

- 由于找不到`MSVCR120.dll`，无法继续执行代码。重新安装程序可能会解决此问题
- 由于找不到`VCRUNTIME140_1.dll`，无法继续执行代码。重新安装程序可能会解决此问题
  - **解决办法**
    - 系统缺少[`Visual C++`](https://support.microsoft.com/en-us/topic/the-latest-supported-visual-c-downloads-2647da03-1eea-4433-9aff-95f26a218cc0)，安装完成后即可解决问题
    - ![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/MySQL/2021-09-08_191723.png)

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



下载`MySQL` `Linux`通用版本

```sh
wget https://dev.mysql.com/get/Downloads/MySQL-8.4/mysql-8.4.0-linux-glibc2.28-x86_64.tar.xz
```

从`/home`文件夹解压文件到`/usr/local`

```sh
tar -xvf mysql-8.0.36-linux-glibc2.28-x86_64.tar.xz -C /usr/local/
```

重命名解压文件夹

```sh
mv  mysql-8.4.0-linux-glibc2.28-x86_64/ mysql-8.4.0
```

在`mysql-8.4.0`文件夹创建`data`文件夹

```sh
mkdir data
```

进入`mysql-8.4.0/bin`文件夹运行

```sh
useradd mysql
```

初始化数据库，此步骤会生成数据库`初始密码`记得保存

```sh
./mysqld --initialize --user=mysql --datadir=/usr/local/mysql-8.4.0/data --basedir=/usr/local/mysql-8.4.0
```

生成如下内容，密码是`7LMsd(r_(lP.`

```sh
root@localhost: 7LMsd(r_(lP.
```

进入安装目录的上级`/usr/local`修改安装文件夹权限

```sh
chown -R mysql:mysql /usr/local/mysql-8.4.0/
```

启动数据库

```sh
./mysqld_safe &
```

登入数据库

```sh
./mysql -u root -p
```

输入数据库初始密码

```sh
7LMsd(r_(lP.
```

修改用户 `root` 在 `localhost` 上的密码为 `hexi1998`。

```sh
alter user 'root'@'localhost' identified by 'hexi1998';
```

创建一个用户名为 `root` 的用户，并设置密码为 `hexi1998`，该用户可以从任何主机连接到 MySQL 服务器。

```sh
create user root@'%' identified by 'hexi1998';
```

赋予用户 `root`（从任何主机连接的）对所有数据库和表的所有权限，并允许该用户将这些权限授予其他用户。

```sh
grant all privileges on *.* to root@'%' with grant option;
```

刷新,安装完成

```sh
flush privileges;
```


