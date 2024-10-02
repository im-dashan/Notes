addEventListener('fetch', event => {
    event.respondWith(handleRequest(event.request));
  });
  
  async function handleRequest(request) {
    const url = new URL(request.url);
    // 修改为目标URL
    const targetUrl = `https://raw.githubusercontent.com${url.pathname}`;
    
    const response = await fetch(targetUrl, {
        method: request.method,
        headers: request.headers,
    });
    
    const newHeaders = new Headers(response.headers);
    
    // 设置CORS头部
    newHeaders.set('Access-Control-Allow-Origin', '*'); // 允许所有域
    newHeaders.set('Access-Control-Allow-Methods', 'GET, POST, OPTIONS'); // 允许的方法
    newHeaders.set('Access-Control-Allow-Headers', '*'); // 允许的请求头
  
    return new Response(response.body, {
        status: response.status,
        statusText: response.statusText,
        headers: newHeaders
    });
  }  