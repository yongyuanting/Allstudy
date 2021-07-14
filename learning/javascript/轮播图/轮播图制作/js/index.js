window.addEventListener('load',function (){
    //获取元素
    var arrow_l = document.querySelector('.arrow-l');
    var arrow_r = document.querySelector('.arrow-r');
    var focus = document.querySelector('.focus');
    var focusWidth = focus.offsetWidth;
    var circle=0;
    //鼠标经过focus就显示隐藏左右按钮
    focus.addEventListener('mouseenter',function (){
        arrow_l.style.display="block";
        arrow_r.style.display="block";
        clearInterval(timer);
        timer=null;
    })
    focus.addEventListener('mouseleave',function (){
        arrow_l.style.display="none";
        arrow_r.style.display="none";
        timer=setInterval(function (){
            //手动调用点击事件
            arrow_r.click();
        },2000)
    })
    //动态生成小圆圈，有几张图片，我就生成几个小圆圈
    var ul = focus.querySelector('ul');
    var ol = focus.querySelector('.circle');
    // console.log(ul.children.length);
    for (var i=0;i<ul.children.length;i++){
        //创建一个小li
        var li = document.createElement('li');
        //记录当然小圆圈的索引号，通过自定义属性来做
        li.setAttribute('index',i);
        // 把li插入到ol里面
        ol.appendChild(li);
        //小圆圈的排他思想，生成的同时直接绑定
        li.addEventListener('click',function (){
            //干掉所有人
            for (var i=0;i<ol.children.length;i++){
                ol.children[i].className="";
            }
            //留下我自己
            this.className='current';
            //点击小圆圈移动图片 移动的是ul
            //ul的移动距离，是小圆圈的索引号乘以图片宽度，注意是负值
            //当我们点击某个小li，拿到当前小li的索引号
            var index = this.getAttribute('index');
            //当我们点击了某个li，就拿到当前li的索引号
            num=index;
            circle=index;
            console.log(focusWidth);
            console.log(index);
            animate(ul,-index*focusWidth);
        })
    }
    //把ol里面的第一个小li设置类名为current
    ol.children[0].className='current';
    //克隆第一张图片放到ul最后面
    var first = ul.children[0].cloneNode(true);
    ul.appendChild(first);
    //节流阀
    var flag = true;
    //点击右侧按钮，图片滚动一张
    var num=0;
    arrow_r.addEventListener('click',function (){
        if (flag){
            flag=false;
            //走到了最后复制的一张图片，left快速归零
            if(num === ul.children.length-1){
                ul.style.left = 0;
                num=0;
            }
            // console.log(1);
            //如果走到了最后复制的一张图片，我们ul要快速复原 left为0
            num++;
            // console.log(num)
            animate(ul,-num*focusWidth,function (){
                flag=true;
            });
            //无缝滚动
            //控制小圆圈的播放
            circle++;
            if (num===ol.children.length){
                circle=0;
            }
            console.log(circle);
            //先清除其他小圆圈，留下当前小圆圈
            circleChange();
        }
    })
    arrow_l.addEventListener('click',function (){
        if (flag){
            flag=false;
            //走到了最后复制的一张图片，left快速归零
            if(num === 0){
                num=ul.children.length-1;
                ul.style.left = -num* focusWidth+"px";
            }
            // console.log(1);
            //如果走到了最后复制的一张图片，我们ul要快速复原 left为0
            num--;
            // console.log(num)
            animate(ul,-num*focusWidth,function (){
                flag=true;
            });
            //无缝滚动
            //控制小圆圈的播放
            circle--;
            if (circle<0){
                circle=ol.children.length-1;
            }
            console.log(circle);
            //先清除其他小圆圈，留下当前小圆圈
            circleChange();
        }
    })
    function circleChange(){
        for (var i=0;i<ol.children.length;i++){
            ol.children[i].className=" ";
        }
        ol.children[circle].className="current";
    }
    //自动播放
    var timer=setInterval(function (){
        //手动调用点击事件
        arrow_r.click();
    },2000)
})