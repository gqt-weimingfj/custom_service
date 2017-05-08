function request(){
    const _config = {
        "host" : (function() {
            return process.env.NODE_ENV === 'development' ? '/dev' : '';
        })(),
        "page_num" : "10",    //每页数
        "page" : "1"       //默认第几页
    };

    function parseParam(param, key){ 
        let paramStr=""; 
        if( typeof(param) == "number" || typeof(param) == "string" || typeof(param) == "boolean" ){
            paramStr+="&"+key+"="+encodeURIComponent(param); 
        }else{ 
            $.each(param,function(i){
                // let k=key==null?i:key+(param instanceof Array?"["+i+"]":"."+i); 
                let k=key==null?i:key+(param instanceof Array?"":"."+i); 
                paramStr+='&'+parseParam(this, k); 
            });
        } 
        return paramStr.substr(1); 
    }; 

    this.href = function(url, params) {
        for(var key in params) {
            if (!params[key]) params[key] = null;
        }
        var result = _config.host + url;
        if(result.indexOf("?") != -1) {
            result += "&" + parseParam(params);
        } else {
            result += "?" + parseParam(params);
        }
        window.location.href = result; 
    }

    this.ajax = function(opts) {
        opts = $.extend({
            timeout : 30000, //超时时间设置，单位毫秒
            url: undefined,
            contentType: "application/json",
            type: "POST",
            loginValid : true,
            dataType: "json",
            data: {},
            success:function(rs){
                //alert(rs)
	        },
            error:function(data){
               // alert(data)
            },
            is_page : false
        }, opts||{});
        
        if(!!opts.is_page) {
            opts.data.page_num = opts.data.page_num || _config.page_num;
            opts.data.page = opts.data.page || _config.page;
        }
        opts.url = _config.host + opts.url;
        for(var key in opts.data) {
            if (!opts.data[key]) delete opts.data[key];
        }
        // if(process.env.NODE_ENV === 'development') {
            if(opts.url.indexOf("?") != -1) {
                opts.url += "&" + parseParam(opts.data);
            } else {
                opts.url += "?" + parseParam(opts.data);
            }
        // }
        opts.success = function(success) {
            return function(response) {
                if (opts.loginValid && response.result === '1005') {
                    window.location.href = "/#/login";
                    console.info(response); //
                    return ;
                } 
                success(response);
            }
        }(opts.success)
        $.ajax(opts)
    };
};


export const $http = new request();

/**
 * 提醒
 */
export function EMsg(value, opts) {
	// return $ionicPopup.alert($.extend({
    //     title: "提示",
    //     template: "操作异常，请联系管理员"
    // }, opts||{}));

    // if(!!value) {
    //    (opts || (opts = {})).template = value;
    // }
    opts = $.extend({template : value}, opts || {});
    this.$Message.success.apply(this, Object.values(opts) || []);
}

 /**
  * 告警提示
  */
export function EErrorMsg(value, opts) {
    opts = $.extend({template : value}, opts || {});
    this.$Message.error.apply(this, Object.values(opts) || []);
}



/**
 * 确认框
 */
export function EConfirm (opts) {
    this.$Modal.confirm($.extend({
        title : '提示',
        loading : true
    }, opts));
	// return $ionicPopup.confirm($.extend({
    //     title: '连接服务器出错',
    //     template: '<div class="error-con">请检查网络是否正常，或者重试</div>',
    //     cancelText: '重试',
    //     cancelType: 'button-reset',
    //     okText: '取消',
    //     okType: 'button-online',
    //     cssClass:'biu-link-server-error'
    // }, opts||{}));
}

export function def (obj, key, val, enumerable) {
  Object.defineProperty(obj, key, {
    value: val,
    enumerable: !!enumerable,
    writable: true,
    configurable: true
  });
}

/**
 * 运单列表
 */
export function orderList(opts) {
    opts.url = ORDER_LIST;
    $http.ajax(opts);
}

/**
 * 运单导出
 */
export function orderReport(params) {
    $http.href(ORDER_LIST_EXCEL, params);
}



/**
 * 运单开单
 */
export function orderAdd(opts) {
    opts.url = ORDER_ADD;
    $http.ajax(opts);
}

/**
 * 运单修改
 */
export function orderEdit(opts) {
    opts.url = ORDER_EDIT;
    $http.ajax(opts);
}


/**
 * 运单作废
 */
export function orderInvalid(opts) {
    opts.url = ORDER_INVALID;
    $http.ajax(opts);
}


export function orderConfirm(opts) {
    opts.url = ORDER_CONFIRM;
    $http.ajax(opts);
}

export function orderException(opts) {
    opts.url = ORDER_EXCEPTION;
    $http.ajax(opts);
}

export function orderGet(opts) {
    opts.url = ORDER_GET;
    $http.ajax(opts);
}

/**
 * 车次列表
 */
export function tripList(opts) {
    opts.url = TRIP_LIST;
    $http.ajax(opts);
}


/**
 * 运单打包车次的前置校验
 */
export function tripBeforeAdd(opts) {
    opts.url = TRIP_BEFORE_ADD;
    $http.ajax(opts);
}

/**
 * 车次导出
 */
export function tripReport(params) {
    $http.href(TRIP_LIST_EXCEL, params);
}

/**
 * 车次确认
 */
export function tripConfirm(opts) {
    opts.url = TRIP_CONFIRM;
    $http.ajax(opts);
}

/**
 * 车次异常
 */
export function tripException(opts) {
    opts.url = TRIP_EXCEPTION;
    $http.ajax(opts);
}

export function tripDelete(opts) {
    opts.url = TRIP_DELETE;
    $http.ajax(opts);
}

export function tripCountNode(opts) {
    opts.url = TRIP_COUNT_NODE;
    $http.ajax(opts);
}

export function tripAdd(opts) {
    opts.url = TRIP_ADD;
    $http.ajax(opts);
}

export function tripFeeClose(opts) {
    opts.url = TRIP_FEE_CLOSE;
    $http.ajax(opts);
}

export function roleList(opts) {
    opts.url = ROLE_LIST;
    $http.ajax(opts);
}

export function roleGet(opts) {
    opts.url = ROLE_GET;
    $http.ajax(opts);
}

export function roleEdit(opts) {
    opts.url = ROLE_EDIT;
    $http.ajax(opts);
}

export function roleAdd(opts) {
    opts.url = ROLE_ADD;
    $http.ajax(opts);
}

export function roleDelete(opts) {
    opts.url = ROLE_DELETE;
    $http.ajax(opts);
}

export function rolePrivilege(opts) {
    opts.url = ROLE_PRIVILEGE;
    $http.ajax(opts);
}

export function menuListForRoleId(opts) {
    opts.url = MENU_LIST_FOR_ROLE_ID;
    $http.ajax(opts);
}


export function userList(opts) {
    opts.url = USER_LIST;
    $http.ajax(opts);
}

export function userGet(opts) {
    opts.url = USER_GET;
    $http.ajax(opts);
}

export function userAdd(opts) {
    opts.url = USER_ADD;
    $http.ajax(opts);
}

export function userEdit(opts) {
    opts.url = USER_EDIT;
    $http.ajax(opts);
}

export function userDelete(opts) {
    opts.url = USER_DELETE;
    $http.ajax(opts);
}

export function userResetPwd(opts) {
    opts.url = USER_RESET_PWD;
    $http.ajax(opts);
}

/**
 * 用户登入
 */
export function login() {
    let opts = {};
    opts.url = LOGIN;
    opts.url +='?mobile_no=13599040857&user_pwd=123456';
    $http.ajax(opts);

}

export function testRe(val, re) {
    console.info('test re :' + re);
    return !!val && re.test(val)
}


export  function format(fmt) { //author: meizz 
  var o = { 
    "M+" : this.getMonth()+1,                 //月份 
    "d+" : this.getDate(),                    //日 
    "h+" : this.getHours(),                   //小时 
    "m+" : this.getMinutes(),                 //分 
    "s+" : this.getSeconds(),                 //秒 
    "q+" : Math.floor((this.getMonth()+3)/3), //季度 
    "S"  : this.getMilliseconds()             //毫秒 
  }; 
  if(/(y+)/.test(fmt)) 
    fmt=fmt.replace(RegExp.$1, (this.getFullYear()+"").substr(4 - RegExp.$1.length)); 
  for(var k in o) 
    if(new RegExp("("+ k +")").test(fmt)) 
  fmt = fmt.replace(RegExp.$1, (RegExp.$1.length==1) ? (o[k]) : (("00"+ o[k]).substr((""+ o[k]).length))); 
  return fmt; 
}

Array.prototype.unique = function(){
    
    var res = [];
    var json = {};
    for(var i = 0; i < this.length; i++){
        if(this[i] && !json[this[i]]){
            res.push(this[i]);
            json[this[i]] = 1;
        }
    }
    console.info('res:' + res)
    return res;
}


const LOGIN = '/user/login';
const ORDER_LIST = '/order/list';
const ORDER_LIST_EXCEL = '/order/listToExcel';
const ORDER_INVALID = '/order/invalid';
const ORDER_EXCEPTION = '/order/checkOrderException';
const ORDER_CONFIRM = '/order/confirm';
const ORDER_ADD = '/order/add';
const ORDER_GET = '/order/get';
const ORDER_EDIT = '/order/edit';
const TRIP_BEFORE_ADD = '/trip/beforeAdd';
const TRIP_LIST = '/trip/list';
const TRIP_LIST_EXCEL = '/trip/listToExcel';
const TRIP_CONFIRM = '/trip/confirm';
const TRIP_DELETE = '/trip/delete';
const TRIP_COUNT_NODE = '/trip/countNode';
const TRIP_ADD = '/trip/add';
const TRIP_EXCEPTION = '/trip/checkTripException';
const TRIP_FEE_CLOSE = '/trip/carryFeeClose';
const ROLE_LIST = '/role/list';
const ROLE_GET = '/role/get';
const ROLE_EDIT = '/role/edit';
const ROLE_ADD = '/role/add';
const ROLE_DELETE = '/role/delete';
const ROLE_PRIVILEGE = '/role/privilege';
const MENU_LIST_FOR_ROLE_ID = '/menu/listForRoleId';
const USER_LIST = '/user/list';
const USER_GET = '/user/get';
const USER_ADD = '/user/add';
const USER_EDIT = '/user/edit';
const USER_DELETE = '/user/delete';
const USER_RESET_PWD = '/user/resetPwd';

