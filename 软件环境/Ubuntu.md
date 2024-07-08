# Ubuntu常见命令和问题



- ubuntu24.04设置静态ip

```sh
vim /etc/netplan/50-cloud-init.yaml
```



```yaml
network:
  version: 2
  renderer: networkd
  ethernets:
    ens33:
      dhcp4: no
      dhcp6: no
      addresses:
        - 192.168.0.37/24
      routes:
        - to: default
          via: 192.168.0.2
      nameservers:
        addresses:
          - 114.114.114.114
          - 8.8.8.8
```
