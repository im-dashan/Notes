(function () {
    "use strict";

    const urls = new Set();

    function isVideo(url) {
        if (!url) return false;
        url = url.toString();

        return /\.(mp4|m3u8|m4s|ts|mov|flv|webm)(\?|$)/i.test(url)
            || url.includes(".m3u8")
            || url.includes(".mp4")
            || url.includes(".m4s")
            || url.includes(".ts");
    }

    function addUrl(url) {
        if (!url) return;

        if (isVideo(url)) {
            urls.add(url);
            console.log("[Video]", url);
        }
    }

    //-----------------------------------------
    // Hook fetch
    //-----------------------------------------
    const oldFetch = window.fetch;
    window.fetch = function (...args) {
        addUrl(args[0]);
        return oldFetch.apply(this, args);
    };

    //-----------------------------------------
    // Hook XHR
    //-----------------------------------------
    const oldOpen = XMLHttpRequest.prototype.open;

    XMLHttpRequest.prototype.open = function (method, url) {
        addUrl(url);
        return oldOpen.apply(this, arguments);
    };

    //-----------------------------------------
    // 扫描 video
    //-----------------------------------------
    function scanVideo() {
        document.querySelectorAll("video").forEach(v => {

            if (v.currentSrc)
                addUrl(v.currentSrc);

            if (v.src)
                addUrl(v.src);

            v.querySelectorAll("source").forEach(s => {
                addUrl(s.src);
            });
        });
    }

    setInterval(scanVideo, 1000);

    //-----------------------------------------
    // 下载按钮
    //-----------------------------------------
    const btn = document.createElement("div");

    btn.innerHTML = "⬇ 下载";

    btn.style.position = "fixed";
    btn.style.right = "20px";
    btn.style.bottom = "20px";
    btn.style.zIndex = "999999";
    btn.style.background = "#007AFF";
    btn.style.color = "#fff";
    btn.style.padding = "10px 15px";
    btn.style.borderRadius = "10px";
    btn.style.fontSize = "16px";
    btn.style.cursor = "pointer";
    btn.style.boxShadow = "0 2px 8px rgba(0,0,0,.3)";

    document.body.appendChild(btn);

    //-----------------------------------------
    // 点击按钮
    //-----------------------------------------
    btn.onclick = async () => {

        scanVideo();

        if (urls.size === 0) {
            alert("没有发现视频链接");
            return;
        }

        const list = [...urls];

        let text = "";

        list.forEach((u, i) => {
            text += `${i + 1}. ${u}\n\n`;
        });

        const choose = prompt(
            text + "\n输入编号复制："
        );

        if (!choose) return;

        const index = parseInt(choose) - 1;

        if (!list[index]) return;

        await navigator.clipboard.writeText(list[index]);

        alert("已复制：\n" + list[index]);

        // 如果要调用下载器
        // location.href =
        // "downloader://download?url=" +
        // encodeURIComponent(list[index]);

    };

})();