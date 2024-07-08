# HTTP/3+QUIC NINGX反向代理配置

开启NGINX的HTTP/3+QUIC需要openssl和nginx

[openssl](https://github.com/openssl/openssl)

[nginx](https://nginx.org/)

下载对应安装包到

```sh
wget https://xxxx.xxx.tar.gz
```

解压文件

```sh
tar -zxvf xxxx.tar.gz
```

进入解压文件夹

```sh
cd xxxx
```

编译`nginx`所有需要的安装环境

```sh
sudo apt-get install build-essential libpcre3 libpcre3-dev zlib1g zlib1g-dev libssl-dev
```

`openssl`编译安装，默认安装到`/usr/local/openssl`文件夹下

```sh
./config --prefix=/usr/local/openssl
```

```sh
make && make install
```

`nginx`编译安装，默认安装到`/usr/local/nginx`文件夹下

`--with-cc-opt=`填`include`路径

`--with-ld-opt=`填`lib64`路径

```sh
./configure --prefix=/usr/local/nginx --with-debug --with-http_ssl_module --with-http_v2_module --with-http_v3_module --with-cc-opt="-I/usr/local/openssl/include" --with-ld-opt="-L/usr/local/openssl/lib64"
```

```sh
make && make install
```

`nginx.conf`配置文件

```sh
#user  nobody;
worker_processes  4;
events {
    worker_connections  65535;
}

http {
    log_format quic '$remote_addr - $remote_user [$time_local] '
                    '"$request" $status $body_bytes_sent '
                    '"$http_referer" "$http_user_agent" "$http3"';

    access_log logs/access.log quic;

    include       mime.types;
    default_type  application/octet-stream;
    sendfile        on;
    keepalive_timeout  65;

    server {
        listen 80;
        server_name  oneds.org;

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 quic reuseport;
        listen [::]:443 quic reuseport;
        listen 443 ssl;
        listen [::]:443 ssl;
        http2 on;

        server_name  oneds.org;

        ssl_certificate      /etc/letsencrypt/live/oneds.org/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/oneds.org/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/oneds.org/chain.pem;

        quic_retry on;
        ssl_early_data on;
        ssl_prefer_server_ciphers off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ecdh_curve X25519:secp256r1;
        ssl_session_cache    shared:SSL:10m;
        ssl_session_timeout  10m;
        ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';

        add_header Alt-Svc 'h3-29=":443"; ma=86400';
        add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;

        location / {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Range $http_range;
	        proxy_set_header If-Range $http_if_range;
            proxy_redirect off;
            proxy_pass http://localhost:5244;
            client_max_body_size 20000m;
        }
    }

    server {
        listen 80;
        server_name  iasmr.xyz;

        location / {
            return 301 https://$host$request_uri;
        }
    }

    server {
        listen 443 quic;
        listen [::]:443 quic;
        listen 443 ssl;
        listen [::]:443 ssl;
        http2 on;

        server_name  iasmr.xyz;

        ssl_certificate      /etc/letsencrypt/live/iasmr.xyz/fullchain.pem;
        ssl_certificate_key  /etc/letsencrypt/live/iasmr.xyz/privkey.pem;
        ssl_trusted_certificate /etc/letsencrypt/live/iasmr.xyz/chain.pem;

        quic_retry on;
        ssl_early_data on;
        ssl_prefer_server_ciphers off;
        ssl_protocols TLSv1.2 TLSv1.3;
        ssl_ecdh_curve X25519:secp256r1;
        ssl_session_cache    shared:SSL:10m;
        ssl_session_timeout  10m;
        ssl_ciphers 'ECDHE-ECDSA-CHACHA20-POLY1305:ECDHE-RSA-CHACHA20-POLY1305:ECDHE-ECDSA-AES128-GCM-SHA256:ECDHE-RSA-AES128-GCM-SHA256:ECDHE-ECDSA-AES256-GCM-SHA384:ECDHE-RSA-AES256-GCM-SHA384';

        add_header Alt-Svc 'h3-29=":443"; ma=86400';
        add_header Strict-Transport-Security "max-age=63072000; includeSubdomains; preload" always;

        location / {
            proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
            proxy_set_header X-Forwarded-Proto $scheme;
            proxy_set_header Host $host:$server_port;
            proxy_set_header X-Real-IP $remote_addr;
            proxy_set_header Range $http_range;
	        proxy_set_header If-Range $http_if_range;
            proxy_redirect off;
            proxy_pass http://localhost:6244;
            client_max_body_size 20000m;
        }
    }
}
```

