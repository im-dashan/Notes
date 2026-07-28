// ==UserScript==
// @name         iOS视频嗅探下载器
// @description  嗅探网页中的m3u8、mp4、m4s、ts视频地址
// @version      1.0.0
// @namespace    https://github.com/im-dashan/
// @author       Dashan
// @homepageURL  https://github.com/im-dashan
// @match        *://*/*
// @include      *
// @icon         https://www.apple.com/favicon.ico
// @inject-into  content
// @run-at       document-start
// @grant        none
// ==/UserScript==


(function () {

    "use strict";


    console.log("[视频嗅探]启动");


    const videoList = new Set();



    // 判断视频地址

    function checkVideo(url) {

        if (!url || typeof url !== "string") {
            return false;
        }


        return (
            url.includes(".m3u8") ||
            url.includes(".mp4") ||
            url.includes(".m4s") ||
            url.includes(".ts") ||
            url.includes(".webm") ||
            url.includes(".mov")
        );

    }



    // 保存地址

    function addVideo(url) {

        if (!url) return;


        if (typeof url !== "string") {

            try {
                url = url.url;
            } catch(e) {
                return;
            }

        }


        if (checkVideo(url)) {

            if (!videoList.has(url)) {

                videoList.add(url);

                console.log(
                    "[发现视频]",
                    url
                );

            }

        }

    }





    /*
     * fetch监听
     */

    const oldFetch = window.fetch;


    window.fetch = function () {


        try {

            addVideo(arguments[0]);

        } catch(e){}


        return oldFetch.apply(
            this,
            arguments
        );

    };






    /*
     * XHR监听
     */

    const oldOpen =
        XMLHttpRequest.prototype.open;


    XMLHttpRequest.prototype.open =
    function(method,url){


        try {

            addVideo(url);

        } catch(e){}



        return oldOpen.apply(
            this,
            arguments
        );

    };






    /*
     * 页面资源扫描
     */


    function scanResource(){


        try {


            performance
            .getEntriesByType("resource")
            .forEach(function(item){


                addVideo(
                    item.name
                );


            });


        } catch(e){}



    }







    /*
     * video标签扫描
     */


    function scanVideo(){


        document
        .querySelectorAll("video")
        .forEach(function(v){


            addVideo(v.src);

            addVideo(v.currentSrc);



        });


    }








    /*
     * 创建按钮
     */


    function createButton(){


        if(
            document.getElementById(
                "video-sniffer-btn"
            )
        ){
            return;
        }



        const btn =
        document.createElement("button");



        btn.id =
        "video-sniffer-btn";



        btn.innerText =
        "🎬视频";



        btn.style.position =
        "fixed";


        btn.style.right =
        "20px";


        btn.style.bottom =
        "80px";


        btn.style.zIndex =
        "999999";


        btn.style.padding =
        "12px";


        btn.style.borderRadius =
        "10px";


        btn.style.background =
        "#007aff";


        btn.style.color =
        "#fff";


        btn.style.border =
        "0";



        btn.onclick=function(){


            scanResource();

            scanVideo();



            if(videoList.size===0){

                alert(
                    "没有发现视频地址"
                );

                return;

            }



            const list =
            Array.from(videoList);



            let text="";


            list.forEach(function(url,index){


                text +=
                (index+1)
                +
                ". "
                +
                url
                +
                "\n\n";


            });



            let choose =
            prompt(
                text+
                "\n输入编号复制"
            );



            if(!choose)
                return;



            let url =
            list[
                Number(choose)-1
            ];



            if(!url)
                return;




            // iOS复制兼容

            let input =
            document.createElement(
                "textarea"
            );


            input.value =
            url;


            document.body.appendChild(
                input
            );


            input.select();


            document.execCommand(
                "copy"
            );


            input.remove();



            alert(
                "视频地址已复制"
            );


        };



        document.documentElement
        .appendChild(btn);



    }








    /*
     * 定时检测
     */


    setInterval(function(){


        scanResource();

        scanVideo();

        createButton();


    },2000);



})();