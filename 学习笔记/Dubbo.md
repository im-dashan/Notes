# [`Dubbo`分布式框架](https://dubbo.apache.org/zh/)

<br>

### 一、`Dubbo`前言

- ###### 什么是分布式框架 

  - 分布式系统是若干独立系统的集合，但是用户使用起来像是在使用一套完整的系统。

- ###### 为什么需要分布式系统? 

  - 规模的逐步扩大`&`单台计算机扛不住巨大的访问流量。

- ###### 应用架构的发展演变 

  - 单一架构：
    - 当网站流量很小的时候，我们将所有的应用（业务）放到一台服务器上打包运行。
    - 比如：公司管理系统/超市收银系统
      - 优点：开发简单、部署简单。
      - 缺点：扩展不容易（怎么处理日益增长的流量），维护不 容易，性能提升难 。
  - 垂直应用架构：
    - 将大应用拆分成为小应用（一般按照业务拆分），根据不同的访问频率决定各自业务部署的服务器数量。
      - 优点：扩展容易 。
      - 缺点：页面一改，可能造成整个项目重新部署，业务和界面没有分离开，随着业务种类增加，怎么解决业务之间的互相调用问题，订单服务器和用户服务器交互效率的问题。
  - 分布式架构：(基于`RPC`：远程过程调用) 
    - 将业务拆分后，用某种方式实现各个业务模块的远程调用和复用
    - 这时一个好的`RPC框架`就决定了你的`分布式架构`的性能，怎么调用，何时调用，服务器挂了怎么办......
    - 我们需要一个框架来帮我们解决这个问题。这时，我们主人公就出现了：`Dubbo`，是一个高性能的`RPC框架`，解决了分布式中的调用问题 。
      - 优点：解决了分布式系统中互相调用的问题 。
      - 缺点：假设有`100`台服务器，`50`台用户业务服务器，`50`台订单业务服务器，但是在上线后发现，用户服务器使用率很小，但是订单服务器压力很大，最佳配比应该是`1:4`，*这时候就要求我们还有一个统一管理的调度中心*。

<br>

<br>

### 二、初识`Dubbo`

- ###### 为什么 Dubbo 说自己性能高

  - 高性能要从底层的原理说起，既然是一个`RPC`框架，主要干的就是远程过程（方法）调用，那么提升性能就要从最关键、最耗时的两个方面入手：
    - 序列化：
      - 我们学习`Java`网络开发的时候知道，本地的对象要在网络上传输，必须要实现`Serializable`接口，也就是必须序列化。
      - 我们序列化的方案很多：`xml`、`json`、`二进制流`…   其中效率最高的就是`二进制流` （因为计算机就是二进制的）。然而`Dubbo`采用的就是效率最高的`二进制`。 
    - 网络通信：
      - 不同于`HTTP`需要进行七步走（三次握手和四次挥手），`Dubbo`采用`Socket`通信机制，一步到位，提升了通信效率，并且可以建立长连接，不用反复连接，直接传输数据；
      - 当然网速快慢也会影响`Dubbo`性能。

<br>

<br>

### 三、`Dubbo`概述

- `Dubbo`是一款高性能、轻量级的开源 `Java RPC框架`，它提供了三大核心能力：面向接口的远程方法调用， 智能容错和负载均衡，以及服务自动注册和发现。 

- `Dubbo`是一个分布式服务框架，致力于提供高性能和透明化的 RPC 远程服务调用方案、 服务治理方案。
- 面向接口代理：
  - 调用接口的方法，在`A`服务器调用`B`服务器的方法， 由`Dubbo`实现对`B`的调用，无需关心实现的细节，就像`MyBatis`访问`Dao`的接口，可以操作数据库一样。不用关心`Dao`接口方法的实现。 这样开发是方便，舒服的。

<br>

<br>

### 四、基本架构

- **服务提供者`Provider`**：暴露服务的服务提供方，服务提供者在 启动时，向注册中心注册自己提供的服务。 
- **服务消费者`Consumer`**：调用远程服务的服务消费方，服务消 费者在启动时，向注册中心订阅自己所需的服务，服务消费者，从提 供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败再选另一台调用。 
- **注册中心`Registry`**：注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者 。
- **监控中心`Monitor`**：服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。
- 调用关系说明：
  - 服务容器负责启动，加载，运行服务提供者。 
  - 服务提供者在启动时，向注册中心注册自己提供的服务。 
  - 服务消费者在启动时，向注册中心订阅自己所需的服务。 
  - 注册中心返回服务提供者地址列表给消费者，如果有变更，注册中心将基于长连接推送变更数据给消费者。 
  - 服务消费者，从提供者地址列表中，基于软负载均衡算法，选一台提供者进行调用，如果调用失败，再选另一台调用。 
  - 服务消费者和提供者，在内存中累计调用次数和调用时间，定时每分钟发送一次统计数据到监控中心。

<br>

<br>

### 五、`Dubbo`支持的协议

`Dubbo`支持多种协议：

`dubbo` 、`hessian`、`rmi` 、`http`、`webservice`、`thrift`、`memcached`、`redis`

`Dubbo`官方推荐使用`dubbo`协议

`dubbo`协议默认端口`20880 `

使用`dubbo`协议，`spring`配置文件加入：

```xml
<dubbo:protocol name="dubbo" port="20880"/>
```

<br>

<br>

### 六、`Dubbo`的使用

- ###### 直连方式一：

  - 创建`Empty Project`工程，命名为`link-dubbo-project`

    - 创建子工程`Maven-webapp`，命名为`001-link-userservice-provider`

      - 删除其他依赖，添加以下依赖

        - ```xml
          <dependencies>
                  <!-- spring-context -->
                  <dependency>
                      <groupId>org.springframework</groupId>
                      <artifactId>spring-context</artifactId>
                      <version>5.3.12</version>
                  </dependency>
                  <!-- spring-webmvc -->
                  <dependency>
                      <groupId>org.springframework</groupId>
                      <artifactId>spring-webmvc</artifactId>
                      <version>5.3.12</version>
                  </dependency>
          
                  <!-- alibaba-dubbo -->
                  <dependency>
                      <groupId>com.alibaba</groupId>
                      <artifactId>dubbo</artifactId>
                      <version>2.6.11</version>
                  </dependency>
              </dependencies>
          
              <build>
                  <resources>
                      <resource>
                          <directory>src/main/java</directory>
                          <includes>
                              <include>**/*.properties</include>
                              <include>**/*.xml</include>
                          </includes>
                          <filtering>false</filtering>
                      </resource>
                  </resources>
                  <plugins>
                      <plugin>
                          <artifactId>maven-compiler-plugin</artifactId>
                          <version>3.8.1</version>
                          <configuration>
                              <source>17</source>
                              <target>17</target>
                              <encoding>UTF-8</encoding>
                          </configuration>
                      </plugin>
                  </plugins>
              </build>
          ```

    - 

