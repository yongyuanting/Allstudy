function animate(obj,target,callback){
    // console.log(callback);
    clearInterval(obj.timer);
    obj.timer = setInterval(function (){
        //移动速度渐慢
        var step = (target-obj.offsetLeft)/10;
        //向上取整和向下取整
        step = step>0?Math.ceil(step):Math.floor(step);
        //移动距离和设置距离相等就停下
        if (obj.offsetLeft==target){
            clearInterval(obj.timer);
            //回调函数写到定时器结束里面
            // if (callback){
            //     callback();
            // }
            callback && callback();
        }
        obj.style.left = obj.offsetLeft+step+'px';
    },15);
}