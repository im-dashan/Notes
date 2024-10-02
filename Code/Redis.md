# Redis代码片段

<br>

`同步代码块+双重验证` `用于缓存击穿`

```java
/**
     * 同步代码块+双重验证
     *
     * @return
     */
    @Override
    public Double queryHistryAvgRate() {

        // 修改RedisTemplate key的序列化方式
        redisTemplate.setKeySerializer(new StringRedisSerializer());

        // 从redis获取数据
        Double histryAvgRate = (Double) redisTemplate.opsForValue().get(Constans.HISTRY_AVG_RATE);
        // 如果redis数据为空
        if (!ObjectUtils.allNotNull(histryAvgRate)) {
            /**
             * 同步代码块
             * 一个时间内只能有一个线程得到执行
             * 另一个线程必须等待当前线程执行完这个代码块以后才能执行该代码块
             */
            synchronized (this) {
                histryAvgRate = (Double) redisTemplate.opsForValue().get(Constans.HISTRY_AVG_RATE);
                // 再次判断
                if (!ObjectUtils.allNotNull(histryAvgRate)) {
                    // 从数据库拿数据
                    histryAvgRate = loanInfoMapper.selectHistryAvgRate();
                    // 数据存入redis、设置数据过期时间，7天
                    redisTemplate.opsForValue().set(Constans.HISTRY_AVG_RATE, histryAvgRate, 7, TimeUnit.DAYS);
                }
            }
        }
        return histryAvgRate;
    }
```

