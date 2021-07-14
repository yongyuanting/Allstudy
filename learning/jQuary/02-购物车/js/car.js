$(function (){
    getSum();
    //1.全选，全不选功能模块
    //把全选按钮状态复制给三个小的按钮就行
    //事件可以用change
    $(".checkall").change(function (){
        // console.log($(this).prop("checked"));
        $(".j-checkbox, .checkall").prop("checked",$(this).prop("checked"));
        if($(this).prop("checked")){
            //让所有的商品添加check-cart-item类名
            $(".cart-item").addClass("check-cart-item");
        }else{
            //check-cart-item移除
            $(".cart-item").removeClass("check-cart-item");
        }
    })
    //2.如果小复选框被选中的个数为3，就把全选按钮选上，否则全选按钮不选
    $(".j-checkbox").change(function (){
        if ($(".j-checkbox:checked").length===$(".j-checkbox").length){
            $(".checkall").prop("checked",true);
        }else{
            $(".checkall").prop("checked",false);
        }
        if($(this).prop("checked")){
            //让所有的商品添加check-cart-item类名
            $(this).parents(".cart-item").addClass("check-cart-item");
        }else{
            //check-cart-item移除
            $(this).parents(".cart-item").removeClass("check-cart-item");
        }
    })
    //3.增减数量
    $(".increment").click(function (){
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        // console.log(n);
        n++;
        $(this).siblings(".itxt").val(n);
        //3.计算当前商品的价格
        // var p = $(this).parent().parent().siblings(".p-price").html();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        p=(p*n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+p);
        getSum();
    })
    $(".decrement").click(function (){
        //得到当前兄弟文本框的值
        var n = $(this).siblings(".itxt").val();
        if (n==1){
            return false;
        }
        // console.log(n);
        n--;
        $(this).siblings(".itxt").val(n);
        //3.计算当前商品的价格
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        p=(p*n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+p);
        getSum();
    })
    //4.用户修改文本框直接计算
    $(".itxt").change(function (){
        //先得到文本框里的值，然后*单价
        var n = $(this).val();
        var p = $(this).parents(".p-num").siblings(".p-price").html();
        // console.log(p);
        p = p.substr(1);
        p=(p*n).toFixed(2);
        $(this).parents(".p-num").siblings(".p-sum").html("￥"+p);
        getSum();
    })
    //5.计算总计和总额
    function getSum(){
        var count = 0;
        var money = 0;
        $(".itxt").each(function (i,ele){
            count+= parseInt($(ele).val());
        });
        $(".amount-sum em").text(count);
        $(".p-sum").each(function (i,ele){
            money+=parseFloat($(ele).text().substr(1));
        })
        money = money.toFixed(2);
        $(".price-sum em").text("￥"+money);
    }
    //6.删除商品模块
    //(1) 商品后面的删除按钮
    $(".p-action a").click(function (){
        //删除的是当前的商品
        $(this).parents(".cart-item").remove();
        getSum();
    })
    //(2)删除选中的商品
    $(".remove-batch").click(function (){
        $(".j-checkbox:checked").parents(".cart-item").remove();
        getSum();
    })
    //(3)清空购物车
    $(".clear-all").click(function (){
        $(".cart-item").remove();
        getSum();
    })
})