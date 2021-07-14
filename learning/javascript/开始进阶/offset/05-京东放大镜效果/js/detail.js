window.addEventListener('load',function (){
    var preview_img = document.querySelector('.preview_img');
    var mask = document.querySelector('.mask');
    var big = document.querySelector('.big');
    //1.当我们鼠标经过，显示隐藏mask和big
    preview_img.addEventListener('mouseover',function (){
        mask.style.display='block';
        big.style.display='block';
    })
    preview_img.addEventListener('mouseout',function (){
        mask.style.display="none";
        big.style.display="none";
    })
    preview_img.addEventListener('mousemove',function (e){
        //1.计算鼠标在盒子内的坐标
        var x = e.pageX-this.offsetLeft;
        var y = e.pageY-this.offsetTop;
        //盒子高度一半是150
        //mask移动的距离不能超过0
        var maskX = x - mask.offsetWidth / 2;
        var maskY = y - mask.offsetHeight / 2;
        //如果x坐标小于0，让他停在0的位置
        //遮挡层最大是父盒子宽度减去遮挡层宽度,高度同理
        if (maskX<=0){
            maskX=0;
        }else if(maskX>=preview_img.offsetWidth - mask.offsetWidth){
            maskX=100;
        }
        if (maskY<=0){
            maskY=0;
        }else if(maskY>=preview_img.offsetHeight - mask.offsetHeight){
            maskY=100;
        }
        mask.style.left=maskX+'px';
        mask.style.top=maskY+'px';
        //大图片的移动距离 = 遮挡层移动距离 * 大图片移动距离 / 遮挡层的最大移动距离
        //遮挡层最大移动距离
        var maskMax = preview_img.offsetWidth - mask.offsetWidth;
        //这是大图
        var bigImg = document.querySelector('.bigImg');
        //大图片最大移动距离
        var bigMax = bigImg.offsetWidth - big.offsetWidth;
        var bigX = maskX * bigMax / maskMax;
        var bigY = maskY * bigMax / maskMax;
        bigImg.style.left=-bigX+'px'
        bigImg.style.top=-bigY+'px'
    })




})