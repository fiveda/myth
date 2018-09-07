var http = require('http');
var fs = require('fs');
var url = require('url');
var path = require('path');
var mime = require('mime');

var server = http.createServer(function(request, response){
    //获取输入的url解析后的对象
    var pathObj = url.parse(request.url, true);
    //static文件夹的绝对路径
    var staticPath = path.resolve('', 'src')
    //获取资源文件绝对路径
    var filePath = path.join(staticPath, pathObj.pathname)
    if(filePath.indexOf('favicon.ico') === -1){//屏蔽浏览器默认对favicon.ico的请求
        //同步读取file
        fs.readFile(filePath,'',function(err,data){
			//文件不存在或读取错误返回404，并打印page not found
			if(err){
				response.writeHead(404);
				response.end('page not found');
			}
			else{
	            response.writeHead(200,{                    //响应客户端，将文件内容发回去
                'Content-type':mime.getType(filePath)});    //通过后缀名指定mime类型
				//读取成功返回相应页面信息
				response.end(data);
			}
		});
    }
})
server.listen(8088)
console.log('node server start')