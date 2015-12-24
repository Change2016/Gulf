// JavaScript Document
/*function createXHR(){
  if(typeof XMLHttpRequest != "undefined"){ // 非IE6浏览器
    return new XMLHttpRequest();
  }else if(typeof ActiveXObject != "undefined"){   // IE6浏览器
    var version = [
          "MSXML2.XMLHttp.6.0",
          "MSXML2.XMLHttp.3.0",
          "MSXML2.XMLHttp",
    ];
    for(var i = 0; i < version.length; i++){
      try{
        return new ActiveXObject(version[i]);
      }catch(e){
        //跳过
      }
    }
  }else{
    throw new Error("您的系统或浏览器不支持XHR对象！");
  }  
}*/


 function createXHR() {     
    //1.创建XMLHttpRequest对象     
    //这是XMLHttpReuquest对象无部使用中最复杂的一步     
    //需要针对IE和其他类型的浏览器建立这个对象的不同方式写不同的代码     
    var xmlHttpRequest;  
    if (window.XMLHttpRequest) {     
         //针对FireFox，Mozillar，Opera，Safari，IE7，IE8     
         xmlHttpRequest = new XMLHttpRequest();     
         //针对某些特定版本的mozillar浏览器的BUG进行修正     
         if (xmlHttpRequest.overrideMimeType) {     
             xmlHttpRequest.overrideMimeType("text/xml");     
         }     
     } else if (window.ActiveXObject) {     
         //针对IE6，IE5.5，IE5     
         //两个可以用于创建XMLHTTPRequest对象的控件名称，保存在一个js的数组中     
         //排在前面的版本较新     
         var activexName = [ "MSXML2.XMLHTTP", "Microsoft.XMLHTTP" ];     
          for ( var i = 0; i < activexName.length; i++) {     
                try {     
                      //取出一个控件名进行创建，如果创建成功就终止循环     
                      //如果创建失败，回抛出异常，然后可以继续循环，继续尝试创建     
                      xmlHttpRequest = new ActiveXObject(activexName[i]);   
                      if(xmlHttpRequest){  
                          break;  
                      }  
                } catch (e) {     
                }     
          }     
      }     
      return xmlHttpRequest;  
}     

// 转义字符
function params(data){
   var arr = [];
   for(var i in data){
     arr.push(encodeURIComponent(i) + "=" + encodeURIComponent(data[i]));
   }
   return arr.join("&");
}
// 封装ajax
function ajax(obj){
   var xhr = createXHR();
   //obj.url = obj.url + "?rand=" + Math.random(); // 清除缓存
   obj.data = params(obj.data);      // 转义字符串
   if(obj.method === "get"){      // 判断使用的是否是get方式发送
      obj.url += obj.url.indexOf("?") == "-1" ? "?" + obj.data : "&" + obj.data;
   }
   // 异步
   if(obj.async === true){
     // 异步的时候需要触发onreadystatechange事件
     xhr.onreadystatechange = function(){
       // 执行完成
       if(xhr.readyState == 4){
          callBack();
       }
     }
   }
   xhr.open(obj.method,obj.url,obj.async);  // false是同步 true是异步 // "demo.php?rand="+Math.random()+"&name=ga&ga",
   if(obj.method === "post"){
      xhr.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
      xhr.send(obj.data);
   }else{
      xhr.send(null);
   }
   // xhr.abort(); // 取消异步请求
   // 同步
   if(obj.async === false){
      callBack();
   }
   // 返回数据
   function callBack(){
      // 判断是否返回正确
      if(xhr.status == 200){
         obj.success(xhr.responseText);
      }else{
         obj.Error("获取数据失败，错误代号为："+xhr.status+"错误信息为："+xhr.statusText);
      }
   }
}


   
/*示例：
ajax({
		 "url":url,
		 "data":{"foodid":foodid,"foodname":foodname},
		 "method":"post",
		 "async":true,
		 "Error":function(tex){
			 alert(tex);
		 },
		 "success":function(data){
			 obj.siblings(".num").html(num).siblings(".fly").html(html).css({opacity:1}).animate({marginTop:top+"px",marginLeft:left+"px"},800,function(){
		       $("#cart").html(allNum);
		       $(this).css({marginTop:0,marginLeft:0,opacity:0});
	     	 });
		 }
	 })

*/ 

 

/*4.    readyState与status:

         readyState有五种状态：

　　0 (未初始化)： (XMLHttpRequest)对象已经创建，但还没有调用open()方法；
　　1 (载入)：已经调用open() 方法，但尚未发送请求；
　　2 (载入完成)： 请求已经发送完成；
　　3 (交互)：可以接收到部分响应数据；
　　4 (完成)：已经接收到了全部数据，并且连接已经关闭。
如此一来，你应该就能明白readyState的功能，而status实际是一种辅状态判断，只是status更多是服务器方的状态判断。关于status，由于它的状态有几十种，我只列出平时常用的几种：
　　100——客户必须继续发出请求
　　101——客户要求服务器根据请求转换HTTP协议版本
　　200——成功
　　201——提示知道新文件的URL
　　300——请求的资源可在多处得到
　　301——删除请求数据
　　404——没有发现文件、查询或URl
　　500——服务器产生内部错误*/