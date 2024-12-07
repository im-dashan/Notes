addEventListener('fetch', event => {
  event.respondWith(handleRequest(event.request));
});

async function handleRequest(request) {
  const url = new URL(request.url);
  
  // 判断是否为根路径，如果是则显示美国当前时间和日期
  if (url.pathname === "/") {
    return showDateTime();
  }

  // 否则处理代理请求
  const targetUrl = `https://raw.githubusercontent.com${url.pathname}`;
  const response = await fetch(targetUrl, {
    method: request.method,
    headers: request.headers,
  });

  const newHeaders = new Headers(response.headers);
  
  // 设置CORS头部
  newHeaders.set('Access-Control-Allow-Origin', '*');
  newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS');
  newHeaders.set('Access-Control-Allow-Headers', '*');

  return new Response(response.body, {
    status: response.status,
    statusText: response.statusText,
    headers: newHeaders
  });
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
