# FastDFS安装和运行

### FastDFS运行命令

`cd /etc/fdfs/`目录下运行

```shell
//运行tracker
fdfs_trackerd tracker.conf start

//运行storage
fdfs_trackerd storage.conf start

//查看tracker进程
ps -ef | grep tracker
```

