addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  // 处理标头的特殊情况
  const specialCases = {
    "*": {
      "Origin": "DELETE",
      "Referer": "DELETE"
    }
  };
  
  function handleSpecialCases(headers) {
    for (const [key, action] of Object.entries(specialCases["*"])) {
      if (action === "DELETE") {
        headers.delete(key);
      }
    }
  }
  
  async function handleRequest(request) {
    const url = new URL(request.url);
  
    // 判断是否为根路径，如果是则显示当前时间
    if (url.pathname === "/") {
      return showDateTime();
    }
  
    // 否则处理代理请求
    const sharepointBaseUrl = "https://oneids-my.sharepoint.com";
    const actualUrl = `${sharepointBaseUrl}${url.pathname}${url.search}${url.hash}`;
  
    // 使用修改后的 URL 创建新的请求
    const modifiedRequest = new Request(actualUrl, {
      headers: new Headers(request.headers),
      method: request.method,
      body: request.body,
      redirect: 'follow'
    });
  
    handleSpecialCases(modifiedRequest.headers);
  
    const response = await fetch(modifiedRequest);
    const newHeaders = new Headers(response.headers);
    
    // 添加 CORS 标头
    newHeaders.set('Access-Control-Allow-Origin', '*'); // 允许所有域
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的方法
    newHeaders.set('Access-Control-Allow-Headers', '*'); // 允许的请求头
  
    const modifiedResponse = new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers: newHeaders
    });
    return modifiedResponse;
  }
  
  // 显示美国当前时间和日期
  function showDateTime() {
    // 获取当前UTC时间
    const getTimeInUTC = () => {
      const date = new Date();
  
      // UTC时间选项
      const options = {
        timeZone: 'UTC',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: true
      };
  
      return new Intl.DateTimeFormat('en-US', options).format(date);
    };
  
    // 初始时间
    let timeInUTC = getTimeInUTC();
  
    // HTML 内容，包括动态更新的脚本
    const htmlContent = `
      <html>
        <head>
          <title>Current UTC Time</title>
          <style>
            body {
              font-family: Arial, sans-serif;
              display: flex;
              flex-direction: column;
              justify-content: center;
              align-items: center;
              height: 100vh;
              margin: 0;
              background-color: #f0f0f0;
              color: #333;
              text-align: center;
            }
            .time {
              font-size: 3em;  /* 增大时间的字体 */
              margin-bottom: 10px;
            }
            .message {
              font-size: 1.2em; /* 使提示文字较小 */
              color: #555;
            }
          </style>
        </head>
        <body>
          <div class="time" id="time">${timeInUTC}</div>
          <div class="message">Current time in UTC (Coordinated Universal Time)</div>
          <script>
            function updateTime() {
              // 获取当前UTC时间
              const date = new Date();
              const options = {
                timeZone: 'UTC',
                year: 'numeric',
                month: 'long',
                day: 'numeric',
                hour: '2-digit',
                minute: '2-digit',
                second: '2-digit',
                hour12: true
              };
              const timeInUTC = new Intl.DateTimeFormat('en-US', options).format(date);
  
              // 更新页面时间
              document.getElementById('time').textContent = timeInUTC;
            }
  
            // 每秒更新一次
            setInterval(updateTime, 1000);
          </script>
        </body>
      </html>
    `;
  
    return new Response(htmlContent, {
      headers: { 'Content-Type': 'text/html' }
    });
  }
  
