function getCommentList(){
    $.ajax({
        method:'GET',
        url:'http://www.liulongbin.top:3006/api/cmtlist',
        success:function (res){
            // console.log(res);
            if (res.status!==200){
                return alert('获取评论失败');
            }
            console.log('获取数据成功');
            // console.log(res.data);
            var rows=[];
            //只有使用ul结构才需要用到$.each
            $.each(res.data,function (i,item){
                console.log(item.content);
                var str = '<li class="list-group-item"><span class="badge" style="background-color: yellowgreen">'+item.time+'</span><span class="badge" style="background-color: skyblue">'+item.username+'</span>'+item.content+'</li>'
                rows.push(str)
            })
            //给ul设置id，更改他里面的所有li
            $('#cmt-list').empty().append(rows.join(''))
        }
    })
}

getCommentList();

$(function (){
    $('#formAddCmt').submit(function (e){
        //只采集数据
        e.preventDefault();
        var data=$(this).serialize()
        // console.log(data);
        $.post('http://www.liulongbin.top:3006/api/addcmt',data,function (res){
            if (res.status!==201){
                return alert('发表评论失败');
            }
            getCommentList();
            //清空form表单信息,把jquary对象转换为原生DOM对象使用JquaryDom[0]
            $('#formAddCmt')[0].reset()
        })
    })
})