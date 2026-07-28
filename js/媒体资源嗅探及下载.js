// ==UserScript==
// @name         iOS视频嗅探及下载
// @namespace    https://github.com/im-dashan
// @version      1.0.0
// @description  嗅探网页中的 m3u8、mp4、m4s、ts 视频资源并复制下载地址
// @author       Dashan
// @match        *://*/*
// @run-at       document-start
// @grant        none
// ==/UserScript==

(function () {
    "use strict";

    console.log("[视频嗅探] 已启动");


    const urls = new Set();


    // 判断是否视频地址
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



    // 保存视频地址
    function addUrl(url) {

        if (!url) return;


        if (typeof url !== "string") {

            try {

                url = url.url || "";

            } catch(e){

                return;
            }
        }


        if (isVideo(url)) {

            if (!urls.has(url)) {

                urls.add(url);

                console.log(
                    "[发现视频]",
                    url
                );
            }
        }
    }





    /*
     =========================
     监听 fetch
     =========================
    */

    const oldFetch = window.fetch;


    window.fetch = function () {

        try {

            addUrl(arguments[0]);

        } catch(e){}


        return oldFetch.apply(
            this,
            arguments
        );
    };






    /*
     =========================
     监听 XHR
     =========================
    */


    const oldOpen =
        XMLHttpRequest.prototype.open;


    XMLHttpRequest.prototype.open =
    function(method,url){

        try {

            addUrl(url);

        } catch(e){}


        return oldOpen.apply(
            this,
            arguments
        );
    };






    /*
     =========================
     Performance资源扫描
     =========================
    */


    function scanNetwork(){

        try {

            performance
            .getEntriesByType("resource")
            .forEach(function(item){

                addUrl(item.name);

            });


        } catch(e){}

    }







    /*
     =========================
     video标签扫描
     =========================
    */


    function scanVideo(){

        try {


            document
            .querySelectorAll("video")
            .forEach(function(video){


                addUrl(video.src);

                addUrl(video.currentSrc);



                video
                .querySelectorAll("source")
                .forEach(function(source){

                    addUrl(source.src);

                });


            });


        }catch(e){}

    }







    /*
     =========================
     创建按钮
     =========================
    */


    function createButton(){


        if(
            document.getElementById(
                "video-sniffer-button"
            )
        ){

            return;
        }



        const btn =
        document.createElement("div");



        btn.id =
        "video-sniffer-button";


        btn.innerHTML =
        "🎬 视频";



        btn.style.position =
        "fixed";


        btn.style.right =
        "20px";


        btn.style.bottom =
        "80px";


        btn.style.zIndex =
        "999999";


        btn.style.background =
        "#007aff";


        btn.style.color =
        "white";


        btn.style.padding =
        "12px 16px";


        btn.style.borderRadius =
        "12px";


        btn.style.fontSize =
        "16px";


        btn.style.fontWeight =
        "bold";



        btn.onclick =
        function(){


            scanNetwork();

            scanVideo();



            if(urls.size === 0){

                alert(
                    "没有发现视频地址"
                );

                return;
            }




            let list =
            Array.from(urls);



            let text = "";



            list.forEach(function(url,index){

                text +=
                (index + 1)
                +
                ". "
                +
                url
                +
                "\n\n";

            });



            let num =
            prompt(
                text +
                "\n输入编号复制链接"
            );



            if(!num)
                return;



            let url =
            list[
                Number(num)-1
            ];



            if(!url)
                return;



            // iOS兼容复制

            let textarea =
            document.createElement(
                "textarea"
            );


            textarea.value =
            url;


            document.body.appendChild(
                textarea
            );


            textarea.select();


            document.execCommand(
                "copy"
            );


            textarea.remove();



            alert(
                "已复制视频地址"
            );


        };




        document.documentElement
        .appendChild(btn);

    }







    /*
     =========================
     定时扫描
     =========================
    */


    setInterval(function(){


        scanNetwork();

        scanVideo();

        createButton();


    },2000);



})();