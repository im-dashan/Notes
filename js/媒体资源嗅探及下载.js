// ==UserScript==
// @name         iOS视频嗅探器
// @namespace    https://github.com/im-dashan
// @version      1.0.0
// @description  嗅探网页视频地址(m3u8/mp4/m4s/ts)
// @author       Dashan
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    const videoUrls = new Set();


    // 判断视频链接
    function isVideo(url) {

        if (!url) return false;

        url = String(url);

        return (
            /\.(m3u8|mp4|m4s|ts|webm|mov|flv)(\?|$)/i.test(url)
            ||
            url.includes(".m3u8")
            ||
            url.includes(".mp4")
            ||
            url.includes(".m4s")
            ||
            url.includes(".ts")
        );
    }


    // 添加地址
    function addUrl(url) {

        if (!url) return;

        if (isVideo(url)) {

            if (!videoUrls.has(url)) {

                videoUrls.add(url);

                console.log(
                    "[视频发现]",
                    url
                );
            }
        }
    }



    /*
    =====================
    fetch监听
    =====================
    */

    const oldFetch = window.fetch;

    window.fetch = function () {

        try {

            addUrl(arguments[0]);

        } catch(e){}

        return oldFetch.apply(this, arguments);
    };




    /*
    =====================
    XHR监听
    =====================
    */


    const oldOpen =
        XMLHttpRequest.prototype.open;


    XMLHttpRequest.prototype.open =
    function(method,url){

        try{

            addUrl(url);

        }catch(e){}


        return oldOpen.apply(
            this,
            arguments
        );
    };





    /*
    =====================
    Performance监听
    =====================
    */

    function scanPerformance(){

        try{

            performance
            .getEntriesByType("resource")
            .forEach(item=>{

                addUrl(item.name);

            });


        }catch(e){}

    }





    /*
    =====================
    video标签扫描
    =====================
    */

    function scanVideo(){

        document
        .querySelectorAll("video")
        .forEach(v=>{


            addUrl(v.src);

            addUrl(v.currentSrc);


            v.querySelectorAll("source")
            .forEach(s=>{

                addUrl(s.src);

            });


        });

    }




    /*
    =====================
    创建按钮
    =====================
    */


    function createButton(){

        if(document.getElementById(
            "video-sniffer-btn"
        ))
        return;


        const btn=document.createElement("button");


        btn.id="video-sniffer-btn";

        btn.innerHTML="🎬 视频";


        btn.style.position="fixed";
        btn.style.right="20px";
        btn.style.bottom="80px";
        btn.style.zIndex="999999";
        btn.style.padding="12px";
        btn.style.background="#007aff";
        btn.style.color="#fff";
        btn.style.border="0";
        btn.style.borderRadius="12px";
        btn.style.fontSize="16px";



        btn.onclick=function(){


            scanPerformance();

            scanVideo();



            if(videoUrls.size===0){

                alert(
                    "没有发现视频地址"
                );

                return;
            }



            let text="";


            [...videoUrls]
            .forEach((u,i)=>{

                text +=
                (i+1)+
                ". "+
                u+
                "\n\n";

            });



            let index =
            prompt(
                text+
                "\n输入编号复制链接"
            );



            if(!index)
                return;


            let url =
            [...videoUrls]
            [Number(index)-1];


            if(!url)
                return;



            // iOS兼容复制
            const ta =
            document.createElement(
                "textarea"
            );

            ta.value=url;

            document.body.appendChild(ta);

            ta.select();

            document.execCommand(
                "copy"
            );

            ta.remove();



            alert(
                "已复制视频地址"
            );

        };



        document.documentElement
        .appendChild(btn);

    }





    /*
    =====================
    等待页面
    =====================
    */


    setInterval(()=>{

        scanPerformance();

        scanVideo();

        createButton();

    },2000);



})();