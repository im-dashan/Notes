# `SpringCloud`

<br>

### 什么是微服务？

- 微服务是一站式的技术解决方案，微服务之间是可以通过`http` `resetful` 的方式进行请求访问
- 每个微服务都是相互独立的
- 微服务能够解决的技术方案
  * `Eureka`：注册中心
    * `Eureka` `Zookeeper` `Consul` `Nacos`
    * 注册中心，是有`CAP`理论支持的
      * `C`：一致性
      * `A`：高可用
      * `P`：指的分布式系统中的某个节点或者网络分区出现了故障的时候，整个系统仍然能对外提供满足一致性和可用性的服务。也就是说部分故障不影响整体使用。
      * 没有办法全部满足`CAP`特性的，要么偏向于`CP`，要么偏向于`AP`
  * `Ribbon`：客户端负载均衡
    * 概念类似于`Nginx`
  * `Hystrix`：服务熔断和降级
    * 当遇到异常或超时问题时，快速的响应一个结果回来
    * 可以支持服务的限流
  * `Feign`：远程调用`api`
    * 类似的有`RestTemplate`，通过`http`方式进行`reset ful`风格的`api`请求
  * `Zuul`：网关
    * 微服务的第一道屏障
    * 可以在网关中进行权限的校验

<br>

<br>

### 搭建`SpringCloud`版本的步骤

- 导入`pom.xml`中的启动器依赖
- 配置文件，`properties` 或 `yml`
  * 推荐使用`yml`
- 引导类`启动类`上添加注解
  * `Application`

<br>

<br>

### `Eureka`

`Eureka`的客户端和服务器端

* 客户端
  * 向注册中心注册的微服务
* 服务器端
  * EurekaServer `注册中心`

<br>

<br>

### 搭建服务器端

- 创建工程`New Module`→`Spring Initializr`→`Dependencies:`
- `Dependencies`选择
  - `Web`→`Spring Web` `√选`
  - `Spring Cloud Discovery`→`Eureka Server` `√选`

<br>

- `pom.xml`中导入启动器依赖
  - 注意`SpringBood`和`SpringCloud`对应的版本
  - 不要自己随意导入，如果出现启动操作或`jar`包冲突，就是版本问题导致的无法启动

`pom.xml` `依赖文件` `测试依赖被删除`

```xml
<!--  springboot的信息  -->
    <parent>
        <groupId>org.springframework.boot</groupId>
        <artifactId>spring-boot-starter-parent</artifactId>
        <version>2.5.3</version>
        <relativePath/> <!-- lookup parent from repository -->
    </parent>

    <groupId>cn.dashan.springcloud</groupId>
    <artifactId>eureka-server</artifactId>
    <version>1.0.0</version>

    <name>eureka-server</name>
    <description>eureka-server</description>
    <properties>
        <java.version>11</java.version>
        <spring-cloud.version>2020.0.3</spring-cloud.version>
    </properties>

    <dependencies>
        <dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-server</artifactId>
        </dependency>
    </dependencies>

<!--  版本控制  -->
    <dependencyManagement>
        <dependencies>
            <dependency>
                <groupId>org.springframework.cloud</groupId>
                <artifactId>spring-cloud-dependencies</artifactId>
                <version>${spring-cloud.version}</version>
                <type>pom</type>
                <scope>import</scope>
            </dependency>
        </dependencies>
    </dependencyManagement>

    <build>
        <plugins>
            <plugin>
                <groupId>org.springframework.boot</groupId>
                <artifactId>spring-boot-maven-plugin</artifactId>
            </plugin>
        </plugins>
    </build>
```

<br>

- `yml`配置文件，一定要注意`yml`语法问题

`application.yml` `配置文件`

```yml
# 端口号
server:
  port: 6001


# Eureka的配置信息
eureka:
  client:
    service-url:
      # 注册中心的url
      defaultZone: http://localhost:6001/eureka
    # 无需注册到注册中心
    register-with-eureka: false
    # 无需拉取注册中心的服务列表
    fetch-registry: false
  server:
    # 服务器配置自我保护机制的关闭
    enable-self-preservation: false


# 如何测试注册中心部署成功呢？
# 在浏览器上访问eureka后台管理页面
# http://localhost:6001
```

<br>

- 引导类`启动类`上添加新的注解
  - `@EnableEurekaServer` `开启注册中心的服务器端`

<br>

<br>

### 搭建客户端

##### 搭建提供者工程

- 创建工程`New Module`→`Spring Initializr`→`Dependencies:`
- `Dependencies`选择
  - `Web`→`Spring Web` `√选`
  - `Spring Cloud Discovery`→`Eureka Discovery Client` `√选` `客户端工程`

`pom.xml` `依赖文件`

```xml
		<dependency>
            <groupId>org.springframework.boot</groupId>
            <artifactId>spring-boot-starter-web</artifactId>
        </dependency>
        <dependency>
            <groupId>org.springframework.cloud</groupId>
            <artifactId>spring-cloud-starter-netflix-eureka-client</artifactId>
        </dependency>
```

`application.yml` `配置文件`

```yml
# 配置端口号
server:
  port: 7001

# 配置工程服务名称
spring:
  application:
    name: eureka-client-provider

# 注册到注册中心
eureka:
  client:
    service-url:
      defaultZone: http://localhost:6001/eureka
    # 默认值为true
    # 是否拉取服务列表到本地工程中
    fetch-registry: true
    # 是否注册到eureka注册中心
    register-with-eureka: true
  instance:
    # 向服务器端发送心跳机制的时间，以秒为单位
    lease-renewal-interval-in-seconds: 5
    # 服务器端如果没有收到心跳机制，10秒后剔除服务列表，以秒为单位
    lease-expiration-duration-in-seconds: 10
```

`Provider7001Application.java` `引导类文件`

```java
// 客户端提供者
@EnableEurekaClient
@SpringBootApplication
public class Provider7001Application {

    public static void main(String[] args) {
        SpringApplication.run(Provider7001Application.class, args);
    }
}
```

<br>

##### 搭建消费者工程

- 创建工程`New Module`→`Spring Initializr`→`Dependencies:`
- `Dependencies`选择
  - `Web`→`Spring Web` `√选`
  - `Spring Cloud Discovery`→`Eureka Discovery Client` `√选` `客户端工程`

`pom.xml` `依赖文件`

- *同提供者工程*

`application.yml` `配置文件`

```yml
# 配置端口号
server:
  port: 8001

# 配置工程服务名称
spring:
  application:
    name: eureka-client-consumer

# 注册到注册中心
eureka:
  client:
    service-url:
      defaultZone: http://localhost:6001/eureka
    # 默认值为true
    # 是否拉取服务列表到本地工程中
    fetch-registry: true
    # 是否注册到eureka注册中心
    register-with-eureka: true
  instance:
    # 向服务器端发送心跳机制的时间，以秒为单位
    lease-renewal-interval-in-seconds: 5
    # 服务器端如果没有收到心跳机制，10秒后剔除服务列表，以秒为单位
    lease-expiration-duration-in-seconds: 10
```

`Provider8001Application.java` `引导类文件`

- *同提供者工程*

<br>

<br>

### 远程调用

<br>

- 微服务之间的可以相互访问
  * 并不是一定按照消费者访问提供者工程
- 消费者工程控制器
  - 注意事项
    1. `get`和`post`是有返回值的
    2. `put`和`delete`是没有返回值的
    3. 参数传递时，`get`方式和`delete`方式，通过`RestFul`进行传递或`kv`键值对拼接
    4. 参数传递时，`post`方式和`put`方式，通过`RestFul`进行传递或`kv`键值对拼接请求体中传递
    5. 接收参数时
         1. `RestFul`参数传递，接收方式 `@PathVariable`
         2. 请求体参数传递，接收方式 `@RequestBody`
         3. 地址栏`kv`参数传递，接收方式 `@RequestParam`

