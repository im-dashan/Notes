# Linux常用命令

- 设置`ssh`链接方式为账号`root`密码`xxxx`

```sh
echo root:xxxx | chpasswd root
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
#安装防火墙
sudo apt install firewalld

#开放tcp/80端口
sudo firewall-cmd --zone=public --permanent --add-port=80/tcp

#删除tcp/80端口
sudo firewall-cmd --zone=public --remove-port=80/tcp

#使配置失效
sudo firewall-cmd --reload

#开启服务
systemctl start firewalld.service

#设置开机启动
systemctl enable firewalld.service
systemctl status firewalld.service

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



Ubuntu换源

```sh
vim /etc/apt/sources.list

vim /etc/apt/sources.list.d/ubuntu.sources
```

国内镜像源

```sh
华为		https://mirrors.huaweicloud.com/	速度 No.1
清华		https://mirrors.tuna.tsinghua.edu.cn/	速度 No.2
阿里云		https://mirrors.aliyun.com/		速度 NO.3
网易		https://mirrors.163.com/		速度 No.4
中科大		https://mirrors.ustc.edu.cn/		速度 No.5
```


