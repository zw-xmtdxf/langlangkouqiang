// // 可视区
// let slidewrap =document.getElementById('slide-wrap');
// // 滑动区
// let slidecontent = slidewrap.children[0];
// // 可视区宽度
// let viewwidth = document.documentElement.clientWidth||document.body.clientWidth
// // 滑动区里的ul
// let firstUl = slidewrap.getElementsByTagName('ul')[0];
// // 小点的ul
// let aItem = slidewrap.getElementsByTagName('ul')[1].children;
// //幻灯片图片
// let liItem = firstUl.children;

// let prev = slidewrap.getElementsByTagName('span')[0];
// let next = slidewrap.getElementsByTagName('span')[1];
// console.log(prev);

// //存储当前的索引
// let index= 0;


// // 设置滑动对象的宽度
// // slidecontent.style.width = viewwidth*liItem.length + px;
// slidecontent.style.width = viewwidth*liItem.length+'px';
// // 设置li对象的宽度
// for(let i = 0;i<liItem.length;i++){
//         liItem[i].style.width = viewwidth+'px'
// }

// // 高光切换
// for(let i = 0;i<aItem.length;i++){
//     aItem[i].onclick = function(){
//         for(let k = 0;k<aItem.length;k++){
//             aItem[k].className=''
//         }
//         this.className="current";
//         index = i;
//         imgSlide(i);
//     }
// }

// //图片滑动
// function imgSlide(index){
//     let left = index * - viewwidth+'px'
//     slidecontent.style.left=left;
// }

// //箭头点击事件
// prev.onclick=function(){
//     index--;
//     if(index<0){
//         index = liItem.length-1;
//     }
//     imgSlide(index);
// }

// //箭头点击事件
// next.onclick=function(){
//     index++;
//     if(index==liItem.length){
//         index = 0;
//     }
//     imgSlide(index);
// }



///////////////////////////////////////////////////////////////轮播图完整版

//索引
let currentindex = 0;

//滚动开关
let flag = false;

//标记定时器
let flagTime = null;

let autoTime = null;
//获取滚动范围对象
let slidewrap =document.getElementById('slide-wrap');
//获取滚动对象
let slidecontent = slidewrap.getElementsByClassName('slide-content')[0];
//获取li对象
let liItem = slidecontent.getElementsByTagName('li');
//获取a标签对象
let aItem = slidewrap.getElementsByClassName('slide-nav')[0].getElementsByTagName('a');

let prev = slidewrap.getElementsByTagName('span')[0];
let next = slidewrap.getElementsByTagName('span')[1];

//获取可视区域宽度
let viewwidth = document.body.clientWidth||document.documentElement.viewwidth;
//设置滚动对象的宽度
slidecontent.style.width = viewwidth * liItem.length + 'px';

//设置图片对象的宽度
for(let i=0;i<liItem.length;i++){
    liItem[i].style.width = viewwidth +'px';
    
}

//分页按钮的点击事件
for(let i = 0;i<aItem.length;i++){
    aItem[i].onclick = function(){
        currentindex = i;
        slide(i);
    }
    
}
//滚动
function slide(number){
    let left = number * viewwidth;
    slidecontent.style.left= -left+'px';
    //开启定时器
    flagTime = setTimeout(function(){
        flag = false;
        clearTimeout(flagTime);
    },1000);
    tooglehigh();
}

//高光
function tooglehigh(){
    for(let k = 0;k<aItem.length;k++){
        aItem[k].className='';
        // this.className='current'
        aItem[currentindex].className='current';
    }
}

prev.onclick = function(){
    if(flag){
        return false;
    }
    flag = true;
    currentindex--;
    if(currentindex <0){
        currentindex=aItem.length-1;
    }
    slide(currentindex);
    tooglehigh();
}
next.onclick = function(){
    if(flag){
        return false;
    }
    flag = true;
    next1();
    
}

function next1(){
    currentindex++;
    if(currentindex ==aItem.length){
        currentindex=0;
    }
    slide(currentindex);

}

autoTime = setInterval(function(){
    next1();
},3000)

slidewrap.onmouseenter = function(){
    clearInterval(autoTime);
}
slidewrap.onmouseleave = function(){
    autoTime = setInterval(function(){
        next1();
    },3000)
}


































