$(function (){
    //初始化右边侧滚动条
    //这个方法定义在scroll.js中
    resetui();

    //为发送按钮绑定点击事件
    $("#btnSend").on("click",function (){
        var text = $("#ipt").val().trim();
        if (text.length<=0){
            return $("#ipt").val("");
        }
        //如果用户输入了聊天内容，将聊天内容追加到页面上
        $("#talk_list").append('<li class="right_word"><img src="img/person02.png"/><span>'+text+'</span></li>')
        $("#ipt").val("");
        //重置滚动条的位置
        resetui();
        //发起请求
        getMsg(text);
        // resetui();
    })

    //发起请求获取聊天信息
    function getMsg(text){
        $.ajax({
            method:'GET',
            url:'http://www.liulongbin.top:3006/api/robot',
            data:{
                spoken:text
            },
            success:function (res){
                console.log(res);
                if (res.message==='success'){
                    //接收聊天消息
                    var msg = res.data.info.text
                    $('#talk_list').append("<li class=\"left_word\"><img src=\"img/person01.png\"/><span>"+msg+"</span></li>");
                    resetui();
                    getVoice(msg);
                }
            }
        })
    }


    //语音播放
    function getVoice(text){
        $.ajax({
            method: 'GET',
            url:'http://www.liulongbin.top:3006/api/synthesize',
            data:{
                text:text
            },
            success:function (res){
                console.log(res);
                if (res.status===200){
                    //播放语音
                    $("#voice").attr('src',res.voiceUrl);
                }
            }
        })
    }


    //回车输入
    $('#ipt').on("keyup",function (e){
        console.log(e.keyCode);
        if (e.keyCode===13){
            //调用按钮的click函数，相当于我们用编程的方式点击了按钮一下
            $("#btnSend").click();
        }
    })


})