(function($) {
    $.fn.imgUpload = function(option) {
        // console.log("fn.messagesport");
        var defaulto = {
            loadDone:"",
            multiselect: false,
            targetId: this.attr("id"), //操作区id
            arear: this.find("#group1"), //操作区
        };
        var opt = $.extend({}, defaulto, option);
        var thisid="";
        var newFile;
        var oldFile;
        var thisindex=0;
        var thsiclass=$(this).attr("class");
        $("body").delegate("."+thsiclass,"change",function(){
            //
            //$(this).change(function(){
            $(this).siblings("div:first").append("<div class='img-loadding'></div>")
            var length=$(this).attr("id").length;
            thisid=$(this).attr("id")/*.substr(length-1,1)*/;
            uploadSjbAdConf($(this));
        });
        function isImage(obj)
        {
            var test = obj.val();
            var tests= new Array(); //定义一数组
            tests=test.split(".");
            //BMP、JPG、JPEG、PNG、GIF
            var lastname = tests[1].toUpperCase();
            var filesObjSize = obj[0].files[0].size;
            if(filesObjSize>2 * 1024 * 1024){
                alert("图片超过2M");
                return false
            }
            if(lastname=="JPG"||lastname=="PNG"||lastname=="JPEG"||lastname=="GIF"||lastname=="BMP"){
                return true;
            }else{
                alertMsg.warn("图片格式不对");
                obj.val("");
                return;
            }
        }

        //上传图片操作

        window.iframeCallback=function(form, callback){
            var $form = $(form);
            if(!$("#callbackframe").length){
                $iframe = $("<iframe id='callbackframe"+thisindex+"' name='callbackframe' target-if='remove' src='about:blank' style='display:none'></iframe>").appendTo("body");
            }
            if(!form.ajax) {
                $form.append('<input type="hidden" name="ajax" value="1" />');
            }
            form.target = "callbackframe";

            _iframeResponse($iframe[0], callback);
        }
        window.uploadDone=function(json,index){
            oldFile.parent().append(newFile);
            oldFile.remove();
            $("#uploadForm"+index).remove();
            $("#callbackframe"+index).remove();
            if(opt.loadDone){
                opt.loadDone(json,thisid)
            }
        }
        var fileurl="/upload/img/file";
        function uploadSjbAdConf(obj){
            if(isImage(obj)){
                $("iframe[target-if='remove']").remove();
                $("#FileContainer").html("");
                thisindex++;
                var html=$("<form id='uploadForm"+thisindex+"' method='post' action='"+fileurl+"' enctype='multipart/form-data' onsubmit='return iframeCallback(this,uploadDone);'></form>");
                newFile=obj;
                oldFile=$(obj).clone();

                obj.parent().append(oldFile);
                html.append(newFile);
                if(!$("#FileContainer").length){

                    $("body").append("<div id='FileContainer' style='display:none'></div>");

                }

                $("#FileContainer").append(html);

                $("#uploadForm"+thisindex).submit();

            }
        }
        //删除图片
        function delSjbUploadImg(showImgId,hiddenImgId){
            $("#" + showImgId).val("");
            $("#" + showImgId).attr("src", "");
            $("#" + hiddenImgId).val("");
        }
        function _iframeResponse(iframe, callback){
            var $iframe = $(iframe), $document = $(document);
            $document.trigger("ajaxStart");
            $iframe.bind("load", function(event){
                $iframe.unbind("load");
                $document.trigger("ajaxStop");

                if (iframe.src == "javascript:'%3Chtml%3E%3C/html%3E';" || // For Safari
                    iframe.src == "javascript:'<html></html>';") { // For FF, IE
                    return;
                }

                var doc = iframe.contentDocument || iframe.document;

                // fixing Opera 9.26,10.00
                if (doc.readyState && doc.readyState != 'complete') return;
                // fixing Opera 9.64
                if (doc.body && doc.body.innerHTML == "false") return;

                var response;

                if (doc.XMLDocument) {
                    // response is a xml document Internet Explorer property
                    response = doc.XMLDocument;
                } else if (doc.body){
                    try{
                        response = $iframe.contents().find("body").text();
                        response = jQuery.parseJSON(response);
                    } catch (e){ // response is html document or plain text
                        response = doc.body.innerHTML;
                    }
                } else {
                    // response is a xml document
                    response = doc;
                }
                $(".img-loadding").remove();
                callback(response,thisindex);
            });
        };
    }
})(jQuery);