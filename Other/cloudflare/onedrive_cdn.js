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

    // 构建实​​际的 SharePoint URL
    const sharepointBaseUrl = "https://87808-my.sharepoint.com";
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
