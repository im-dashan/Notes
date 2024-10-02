# RabbitMQ

### 一、`RabbitMQ`发送普通消息到消息队列中

###### `code`

```java
package cn.dashan.rabbitmq.base;

import com.rabbitmq.client.Channel;
import com.rabbitmq.client.Connection;
import com.rabbitmq.client.ConnectionFactory;

import java.io.IOException;
import java.util.concurrent.TimeoutException;

public class SendBaseMessage {
    public static void main(String[] args) throws IOException, TimeoutException {

        // 创建RabbitMQ的连接工厂对象
        ConnectionFactory factory = new ConnectionFactory();

        // 设置连接参数：host、port、username、password、vHost
        factory.setHost("192.168.152.37");
        // 端口号：15672是管控台的端口，客户端端口号5672
        factory.setPort(5672);
        // 用户名
        factory.setUsername("root");
        // 密码
        factory.setPassword("root");
        // 设置操作的vHost，文件夹，默认是/
        factory.setVirtualHost("/");

        // 获取连接对象
        Connection connection = factory.newConnection();

        /*
          Channel对象：
          创建交换机
          创建消息队列
          创建绑定关系
          发送消息
          监听/接收消息
          ...
          */
        // 根据连接对象创建管道对象
        Channel channel = connection.createChannel();

        /*
        Queue.DeclareOk queueDeclare(
        String queue,               消息队列名称
        boolean durable,            是否持久化
        boolean exclusive,          是否排外
        boolean autoDelete,         是否自动删除，true，没有消费者消费时，该消息队列会被自动删除
        Map<String, Object> arguments) throws IOException;      消息队列的属性设置
        */
        // 声明消息队列，在发送消息之前，必须要先声明消息队列，否则会报错
        channel.queueDeclare("basicQueue", true, false, false, null);

        // 发送消息
        String message = "basicMessage";

        // 发送消息
        // void basicPublish(
        // String exchange,             交互机名称，如果没有交换机则设置为空字符串即可
        // String routingKey,           路由键，如果发送到指定的消息队列中，则指定消息队列名称
        // BasicProperties props,       消息属性，通常设置为null
        // byte[] body)                 消息实体byte数组
        // throws IOException;
        channel.basicPublish("", "basicQueue", null, message.getBytes());

        // 关闭资源
        channel.close();
        connection.close();
    }
}
```

