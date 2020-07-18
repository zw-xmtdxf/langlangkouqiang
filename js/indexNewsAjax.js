let tagMenu = document.getElementsByClassName('tab-menu')[0];

$.ajax({
    url: "./data/newsCategory.php",    //请求的url地址
    dataType: "json",   //返回格式为json
    async: false, //请求是否异步，默认为异步，这也是ajax重要特性
    cache: false, // 是否读取缓存
    timeout:5000,//设置超时
    data:JSON.stringify ({
        module: 'news'
    }),    //参数值
    headers:{
        "Content-type" :"application/json; charset=utf-8"

    },
    type: "post",   //请求方式

    success: function(req) {
        let tagMenu = document.getElementsByClassName('tab-menu')[0];
        let data = req.data
        let menuHtml = ''
        data.forEach((item,index) => {
            let className = ''
            if(index === 0){
                className = "current"
            }
            menuHtml += `<a data-request=false href="javascript:void(0);" onclick="loadingNewsDate({_this:this,id:${item.id},index:${index}})" class="${className}" title="${item.categoryName}">${item.categoryName}</a>`
            // menuHtml += `<a href="javascript:void(0);" onclick="loadingNewsDate(this,${item.id})" class="${className}" title="${item.categoryName}">${item.categoryName}</a>`
        })
        tagMenu.innerHTML=menuHtml

        //默认读取第一个分类
        loadingNewsDate({_this:tagMenu.children[0],id:data[0].id,index:0});
     },
    complete: function() {
        //请求完成的处理
    },
    error: function() {
        //请求出错处理
    }
});




function loadingNewsDate(params){

    //获取request标识，判断是否请求过数据，true为成功，false为未请求过，需请求重新加载
    let getRequest = params._this.getAttribute('data-request')



    let tabContentWrap = document.getElementById('tab-content-wrap').children;
    for(i=0;i<tabContentWrap.length;i++){
        tabContentWrap[i].style.display = "none"
    }
    tabContentWrap[params.index].style.display = "block"


    
    let aItem = tagMenu.children;

    //清除高光
    for(let i = 0;i<aItem.length;i++){
        aItem[i].className = ''
    }
    params._this.className="current"

    if(getRequest === 'true'){return false}
                    $.ajax({
                        url: "./data/indexNews.php",    //请求的url地址
                        dataType: "json",   //返回格式为json
                        timeout:5000,//设置超时
                        data:JSON.stringify ({
                            categoryId : params.id
                        }),    //参数值
                        headers:{
                            "Content-type" :"application/json; charset=utf-8"
                    
                        },
                        type: "post",   //请求方式
                    
                        success: function(req) {
                            let data = req.data;
                            let itemHtml = `<div class="news-wrap"><div class="box clearfix">`
                            data.forEach(item => {
                                let time = item.time.split(' ');//按照空格分隔时间
                                itemHtml +=`<div class="item">
                                                <div class="img-cover" style="background-image: url(${item.imgUrl})">
                                                    <img src="./images/indexNews.png" alt="${item.title}">
                                                </div>
                                                <h4 class="title">${item.title}</h4>
                                                <time pubdate="${item.time}">${time[0]}</time>
                                                <i class="line"></i>
                                                <p class="dec">${item.dec}</p>
                                                <a href="" class="link-more">
                                                            查看更多<i class="fa fa-long-arrow-right" aria-hidden="true"></i> 
                                                </a>
                                            </div>`

                            })

                        
                            let itemHeml =`</div></div>`

                            tabContentWrap[params.index].innerHTML = itemHtml

                            //请求成功后修改标识
                            params._this.setAttribute('data-request','true')

                                                    


                },
                        complete: function() {
                            //请求完成的处理
                        },
                        error: function() {
                            //请求出错处理
                        }
                    });

                }


    


        
