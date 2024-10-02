# Linux常用命令

- 设置`ssh`链接方式为账号`root`密码`xxxx`

```sh
echo root:hexi1998 | chpasswd root
sed -i 's/^#\?PermitRootLogin.*/PermitRootLogin yes/g' /etc/ssh/sshd_config
sed -i 's/^#\?PasswordAuthentication.*/PasswordAuthentication yes/g' /etc/ssh/sshd_config
rm -rf /etc/ssh/sshd_config.d/* && rm -rf /etc/ssh/ssh_config.d/*
/etc/init.d/ssh* restart
```

- `Ubuntu` `cerbot`证书申请命令

```sh
#更新源
sudo apt update

#安装snapd
sudo apt install snapd

#删除cerbot
sudo apt-get remove certbot

#用install安装cerbot
sudo snap install --classic certbot

#将/snap/bin/certbot链接到/usr/bin/certbot
sudo ln -s /snap/bin/certbot /usr/bin/certbot

#使用 Certbot 获取一个新的 SSL/TLS 证书，临时 Web 服务器来完成验证
sudo certbot certonly --standalone

#使用 Web 服务器的文档根目录（即 Webroot 目录）来完成验证，适用于已经运行的 Web 服务器
sudo certbot certonly --webroot

#更新所有快要过期的证书，测试
sudo certbot renew --dry-run

#更新所有快要过期的证书
sudo certbot renew
```

- `firewalld`防火墙命令

```sh
# 安装防火墙
sudo apt install firewalld

# 开放tcp/80端口
# 默认区域
sudo firewall-cmd --permanent --add-port=80/tcp

# 指定public区域
sudo firewall-cmd --zone=public --permanent --add-port=80/tcp

# 删除tcp/80端口
# 默认区域
sudo firewall-cmd --permanent --remove-port=80/tcp

# 指定public区域
sudo firewall-cmd --zone=public --permanent --remove-port=80/tcp

# 重新加载防火墙配置
sudo firewall-cmd --reload

# 开启 firewalld 服务
sudo systemctl start firewalld

# 关闭 firewalld 服务
sudo systemctl stop firewalld

# 开启 firewalld 服务自启动
sudo systemctl enable firewalld

# 关闭 firewalld 服务自启动
sudo systemctl disable firewalld

# 查看 firewalld 服务当前状态
sudo systemctl status firewalld

# 查看当前防火墙开放的端口
sudo firewall-cmd --list-ports

#错误解决
sudo apt-get install dbus
sudo /etc/init.d/dbus start
```

- 更新源和升级包

```sh
sudo apt-get update
sudo apt-get upgrade
```

- `ubuntu`删除内核

```sh
uname -a

dpkg --get-selections|grep linux

sudo apt-get purge
```

- `linux`最大打开文件数量

```sh
vim /etc/security/limits.conf

*               hard    nofile          65535
*               soft    nofile          65535
root            hard    nofile          65535
root            soft    nofile          65535

ulimit -n 65535

ulimit -n
```

- `vm.swappiness` 参数控制系统将数据交换到 Swap 分区的频率。数值范围是 0 到 100，数值越低，表示系统倾向于尽可能少地使用 Swap。

```sh
sudo sysctl vm.swappiness=10
```

- `vm.vfs_cache_pressure` 参数控制内核回收用于目录和 inode 缓存的内存的倾向。默认值为 100，值越小，表示更倾向于保留缓存。

```sh
sudo sysctl vm.vfs_cache_pressure=50
```

- Ubuntu换源


```sh
vim /etc/apt/sources.list

vim /etc/apt/sources.list.d/ubuntu.sources
```

- 国内镜像源


```sh
华为		https://mirrors.huaweicloud.com/	速度 No.1
清华		https://mirrors.tuna.tsinghua.edu.cn/	速度 No.2
阿里云		https://mirrors.aliyun.com/		速度 NO.3
网易		https://mirrors.163.com/		速度 No.4
中科大		https://mirrors.ustc.edu.cn/		速度 No.5
```



- #### 安装 UFW防火墙命令

```bash
# 更新源
sudo apt update

# 安装ufw
sudo apt install ufw

# 启用端口
sudo ufw allow 22/tcp
sudo ufw allow 80/tcp
sudo ufw allow 80/udp
sudo ufw allow 443/tcp
sudo ufw allow 443/udp

# 删除允许端口
sudo ufw delete allow 80/tcp

# 查看开放端口
sudo ufw status

# 启用防火墙
sudo ufw enable
```
