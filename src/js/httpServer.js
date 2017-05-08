
import appConfig from '@/customer/js/appConfig';
console.log(appConfig)
function httpServer(url,param,callback) {
	httpServer.GET(url,param,callback);
}

httpServer.request = function (config,callback){
	let url = '',
		type = 'POST',
		timer = null,
		contentType = 'application/json',
		data;
	if (!config || !config.url) {return }	
	url = appConfig.host + config.url;
	if (config.type) type = config.type; 
	if (config.contentType) type = config.contentType;
	if (config.data) data = config.data;
//	for(var key in data) {
//      if (!data[key]) delete data[key];
// }
	console.info('request params:');
	console.info( data);
	let AjaxRequest = $.ajax({
	    type: type,
	    timeout : 30000, //超时时间设置，单位毫秒
	    url: url,
	    // contentType: contentType,
	    dataType:"json",
	    data: data,
	    success:function(rsp){
			  if(rsp.result=='1005'){
				  window.location.href = "#/login";
				  return;
			  }
	        // if(rsp&&rsp.result == 1){
	          if (typeof callback == "function") callback(rsp);
	     //    }else{
		  		// httpServer.errorHandler(rsp)
	     //    }
	    },
	    error:function(rsp){
	  		httpServer.errorHandler(rsp)
	    },
	    complete : function(XMLHttpRequest,status){ 
	    	//请求完成后最终执行参数
	        //超时,status还有success,error等值的情况
	        if(status=='timeout'){alert('访问服务器超时'); }
	    }
	});

};
httpServer.errorHandler = function(rsp){
	if (rsp && rsp.message) alert(rsp.message)
	else alert('程序出错，没有输出错误信息')
};

httpServer.GET = function (url,param,callback){
	let requestConfig = {
		url : url,
		type: 'GET'
	};
	if (param) {requestConfig.data = param}
	httpServer.request(requestConfig,callback);
}
httpServer.GET2 = function (url,param,callback){
	let requestConfig = {
		url : url,
		type: 'GET'
	};
	if (param) {requestConfig.data = param}
	requestConfig.contentType = 'application/x-www-form-urlencoded';
	httpServer.request(requestConfig,callback);
}
httpServer.POST = function (url,param,callback){
	let requestConfig = {
		url : url,
		type: 'POST'
	};
	if (param) {requestConfig.data = param}
	httpServer.request(requestConfig,callback);
}
httpServer.POST2 = function (url,param,callback){
	let requestConfig = {
		url : url,
		type: 'POST'
	};
	if (param) {requestConfig.data = param}
	requestConfig.contentType = 'application/x-www-form-urlencoded';
	httpServer.request(requestConfig,callback);
}
httpServer.DELETE = function (url,param,callback){
	let requestConfig = {
		url : url,
		type: 'DELETE'
	};
	if (param) {requestConfig.data = param}
	httpServer.request(requestConfig,callback);
}
window.httpServer = httpServer;
// window.httpServer = httpServer;
export default httpServer