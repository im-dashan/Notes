# Vmware虚拟机设置固定IP地

<br>

### 一、设置虚拟机`ip`地址

- 打开编辑→虚拟网络编辑器

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/VMware/2021-09-19_131631.png)

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/VMware/2021-09-19_132502.png)

- 选择`NAT`设置，设置网关

![](https://github.com/im-dashan/Notes/raw/main/软件环境/Images/VMware/2021-09-19_134023.png)

<br>

<br>

### 二、虚拟机配置静态`IP`

- 然后打开虚拟机，我这里以`CentOS Linux`系统为例

  - 进入`ifcfg-ensXX`

  - ```shell
    # 每个人的ensXX都不一样，我的是ens33，我以它为例
    vim /etc/sysconfig/network-scripts/ifcfg-ens33
    ```
    
  - ```shell
    TYPE=Ethernet
    PROXY_METHOD=none
    BROWSER_ONLY=no
    # 改为static
    BOOTPROTO=static
    DEFROUTE=yes
    IPV4_FAILURE_FATAL=no
    IPV6INIT=yes
    IPV6_AUTOCONF=yes
    IPV6_DEFROUTE=yes
    IPV6_FAILURE_FATAL=no
    NAME=ens33
    UUID=5252409b-c2c1-456a-a5b8-5c3db6507fcd
    DEVICE=ens33
    # 改为yes
    ONBOOT=yes
    
    # 子网ip
    IPADDR=192.168.152.37
    # 子网掩码
    NETMASK=255.255.255.0
    # 网关ip
    GATEWAY=192.168.152.2
    # DNS
    DNS1=114.114.114.114
    DNS2=8.8.8.8
    ```

- 改完后`:wq`保存配置

- 重启网卡

  - ```shell
    # 任选一种方案，如果选中的方案命令提示错误，请更换
    #CentOS 7
    systemctl restart network
    #CentOS 8
    systemctl restart NetworkManager
    
    
    # CentOS7
    service network restart
    # CentOS8
    nmcli c reload
    ```

- 设置`NetworkManger`开机自启

  - ```shell
    # 启动
    systemctl start NetworkManger
    # 关闭
    systemctl stop NetworkManager
    # 开机启动
    systemctl enable NetworkManager
    # 查看是否开机启动
    systemctl is-enabled NetworkManager
    # 禁用开机启动
    systemctl disable NetworkManager
    ```



- **可能会遇到的问题`ifcfg-ensXX`配置`ip`后配置文件不生效，输入`ip addr`显示没有`ip`地址**

  - 解决方法：

  - ```shell
    # 查看托管状态
    nmcli n
    # 显示 disabled 则为本文遇到的问题，如果是 enabled 则可以不用往下看了
    # 开启 托管
    nmcli n on
    # 重启
    reboot
    ```
