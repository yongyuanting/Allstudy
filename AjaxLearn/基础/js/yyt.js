function resolveData(data){
    var arr=[]
    //for in 循环如果是对象，那么k是键，之后的data[k]是值
    for (var k in data){
        var str = k +'='+data[k]
        arr.push(str)
    }
    // console.log(typeof data)
    return arr.join('&')
}

// console.log(resolveData({name:'zs',age:20}))
function yyt(options){
    var xhr = new XMLHttpRequest()
    //外界传递过来的对象，转化为查询字符串
    var qs = resolveData(options.data)
    //分辨GET请求和POST请求
    if (options.method.toUpperCase()==='GET'){
        xhr.open(options.method,options.url+'?'+qs)
        xhr.send()
    }else if (options.method.toUpperCase()==='POST'){
        xhr.open(options.method,options.url)
        xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded')
        xhr.send(qs)
    }
    xhr.onreadystatechange = function (){
        if (xhr.readyState===4 && xhr.status===200){
            var result = JSON.parse(xhr.responseText)
            options.success(result)
        }
    }
}