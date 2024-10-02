# Redis foRr Linux安装教程

[Redis下载链接](https://github.com/redis/redis/releases)

要手动安装 Redis 并自定义安装目录和配置文件，可以按照以下步骤进行操作：

### 步骤一：准备工作

1. **安装构建工具和依赖**（以 Ubuntu 为例）：

   ```
   bash复制代码sudo apt update
   sudo apt install build-essential tcl
   ```

2. **下载 Redis 源码**：

   ```
   bash复制代码wget http://download.redis.io/releases/redis-6.2.6.tar.gz
   tar xzf redis-6.2.6.tar.gz
   cd redis-6.2.6
   ```

### 步骤二：编译和安装 Redis

1. **编译 Redis**：

   ```
   bash
   复制代码
   make
   ```

2. **运行测试（可选）**：

   ```
   bash
   复制代码
   make test
   ```

3. **自定义安装目录**： 在这个步骤中，我们假设要将 Redis 安装到 `/usr/local/redis` 目录。

   创建安装目录：

   ```
   bash
   复制代码
   sudo mkdir -p /usr/local/redis
   ```

   安装 Redis：

   ```
   bash
   复制代码
   sudo make PREFIX=/usr/local/redis install
   ```

### 步骤三：配置 Redis

1. **创建配置文件目录**：

   ```
   bash复制代码sudo mkdir /usr/local/redis/etc
   sudo cp redis.conf /usr/local/redis/etc
   ```

2. **编辑配置文件**： 编辑 `/usr/local/redis/etc/redis.conf` 文件，根据需要进行修改。常见修改包括：

   - 将 `supervised no` 改为 `supervised systemd`

   - 更改 

     ```
     dir
     ```

      指向的持久化数据目录，例如 

     ```
     /usr/local/redis/data
     ```

     ，并创建该目录：

     ```
     bash复制代码sudo mkdir /usr/local/redis/data
     sudo chown your-username:your-group /usr/local/redis/data
     ```

   ```
   bash
   复制代码
   sudo nano /usr/local/redis/etc/redis.conf
   ```

### 步骤四：创建系统服务文件

1. **创建 Redis 用户和组**：

   ```
   bash复制代码sudo adduser --system --group --no-create-home redis
   sudo mkdir /var/lib/redis
   sudo chown redis:redis /var/lib/redis
   sudo chmod 770 /var/lib/redis
   ```

2. **创建 Redis 服务文件 `/etc/systemd/system/redis.service`**：

   ```
   bash
   复制代码
   sudo nano /etc/systemd/system/redis.service
   ```

   添加以下内容：

   ```
   ini复制代码[Unit]
   Description=Redis In-Memory Data Store
   After=network.target
   
   [Service]
   User=redis
   Group=redis
   ExecStart=/usr/local/redis/bin/redis-server /usr/local/redis/etc/redis.conf
   ExecStop=/usr/local/redis/bin/redis-cli shutdown
   Restart=always
   
   [Install]
   WantedBy=multi-user.target
   ```

3. **启动并启用 Redis 服务**：

   ```
   bash复制代码sudo systemctl start redis
   sudo systemctl enable redis
   ```

### 步骤五：验证安装

1. 验证 Redis 是否正在运行

   ：

   ```
   bash
   复制代码
   redis-cli ping
   ```

   如果返回 

   ```
   PONG
   ```

   ，则表示 Redis 正常运行。

通过这些步骤，您可以手动安装 Redis 并自定义安装目录和配置文件。





手动怎么启动redis



ChatGPT

要手动启动 Redis，可以按照以下步骤进行操作：

### 步骤一：确保 Redis 已经安装

首先，确保已经按照之前的步骤安装了 Redis，并且配置文件已经设置好。

### 步骤二：手动启动 Redis

1. **进入 Redis 安装目录**（假设安装在 `/usr/local/redis`）：

   ```
   bash
   复制代码
   cd /usr/local/redis
   ```

2. **使用 Redis 配置文件启动 Redis**：

   ```
   bash
   复制代码
   ./bin/redis-server ./etc/redis.conf
   ```

### 步骤三：验证 Redis 是否启动成功

1. 使用 `redis-cli` 检查 Redis 是否正常运行

   ：

   ```
   bash
   复制代码
   ./bin/redis-cli ping
   ```

   如果返回 

   ```
   PONG
   ```

   ，则表示 Redis 启动成功。

### 详细步骤

以下是详细的命令步骤：

```
bash复制代码# 假设 Redis 安装在 /usr/local/redis
cd /usr/local/redis

# 使用配置文件启动 Redis
./bin/redis-server ./etc/redis.conf

# 检查 Redis 是否启动成功
./bin/redis-cli ping
# 期望输出：PONG
```

### 后台运行 Redis

如果希望 Redis 在后台运行，可以在启动命令中添加 `&`，或者在配置文件中设置 `daemonize yes`。

1. **在配置文件中设置 `daemonize yes`**：

   ```
   bash
   复制代码
   sudo nano /usr/local/redis/etc/redis.conf
   ```

   找到 `daemonize no` 并将其改为 `daemonize yes`，保存并退出。

2. **启动 Redis**：

   ```
   bash
   复制代码
   ./bin/redis-server ./etc/redis.conf
   ```

### 停止 Redis

要停止手动启动的 Redis 实例，可以使用 `redis-cli shutdown` 命令：

```
bash
复制代码
./bin/redis-cli shutdown
```

这样就可以手动启动和停止 Redis 了。









### 基本配置

1. **指定 Redis 运行目录**：

   ```
   plaintext
   复制代码
   dir /opt/redis-7.4/data
   ```

   这是 Redis 数据文件的存储位置。

2. **启用后台运行**：

   ```
   plaintext
   复制代码
   daemonize yes
   ```

   让 Redis 以守护进程（后台）方式运行。

3. **指定日志文件**：

   ```
   plaintext
   复制代码
   logfile /opt/redis-7.4/logs/redis.log
   ```

   日志文件的位置和名称。确保日志目录存在并且有写权限。

4. **设置绑定地址**：

   ```
   plaintext
   复制代码
   bind 127.0.0.1
   ```

   限制 Redis 只接受来自本地的连接。可以添加其他IP地址或使用 `0.0.0.0` 以允许所有IP地址访问。

5. **设置端口**：

   ```
   plaintext
   复制代码
   port 6379
   ```

   Redis 监听的端口。

6. **配置持久化**： 持久化是指将内存中的数据保存到磁盘。Redis 提供两种方式：快照（RDB）和AOF。

   - **快照持久化（RDB）**：

     ```
     plaintext复制代码save 900 1
     save 300 10
     save 60 10000
     ```

     这意味着在900秒（15分钟）内如果有1个更改、在300秒（5分钟）内如果有10个更改、或在60秒（1分钟）内如果有10000个更改时，Redis 会保存快照。

   - **AOF持久化**：

     ```
     plaintext复制代码appendonly yes
     appendfilename "appendonly.aof"
     ```

     这启用AOF持久化并指定AOF文件名。AOF每次有数据修改时将命令追加到文件末尾，确保数据不丢失。

### 高级配置

1. **最大内存使用**：

   ```
   plaintext
   复制代码
   maxmemory 256mb
   ```

   设置 Redis 使用的最大内存。超过此值后 Redis 会根据配置的淘汰策略进行数据淘汰。

2. **最大客户端连接数**：

   ```
   plaintext
   复制代码
   maxclients 1000
   ```

   限制最大客户端连接数，防止耗尽系统资源。

3. **日志级别**：

   ```
   plaintext
   复制代码
   loglevel notice
   ```

   设置日志记录的级别，可以是 `debug`、`verbose`、`notice` 或 `warning`。

### 安全配置

1. 设置密码

   ：

   ```
   plaintext
   复制代码
   requirepass yourpassword
   ```

   为 Redis 设置访问密码。

### 样例配置文件

以下是一个修改过的 `redis.conf` 样例文件：

```
plaintext复制代码# 基本配置
bind 127.0.0.1
port 6379
daemonize yes
pidfile /var/run/redis_6379.pid
loglevel notice
logfile /opt/redis-7.4/logs/redis.log
dir /opt/redis-7.4/data

# 持久化配置
save 900 1
save 300 10
save 60 10000

appendonly yes
appendfilename "appendonly.aof"

# 内存和客户端限制
maxmemory 256mb
maxclients 1000

# 安全配置
requirepass yourpassword
```

### 注意事项

1. **创建必要的目录**： 确保配置文件中指定的目录存在，并且 Redis 有权限读写这些目录。

   ```
   sh复制代码sudo mkdir -p /opt/redis-7.4/logs
   sudo mkdir -p /opt/redis-7.4/data
   sudo chown -R youruser:yourgroup /opt/redis-7.4
   ```

2. **检查并确保权限**：

   ```
   sh复制代码sudo chown redis:redis /opt/redis-7.4/logs /opt/redis-7.4/data
   sudo chmod 750 /opt/redis-7.4/logs /opt/redis-7.4/data
   ```

3. **启动 Redis**： 使用修改后的配置文件启动 Redis：

   ```
   sh
   复制代码
   /opt/redis-7.4/bin/redis-server /opt/redis-7.4/etc/redis.conf
   ```

通过这些步骤和配置，你应该能够成功地手动安装、配置并启动 Redis 7.4。