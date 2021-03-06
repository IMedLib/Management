/* global escape */
var app=app||{};
(function($){
	if(!$)
		return;
    document.write("<script src='/js/cookies.js'></script>");
	app.utils=app.utils||{};
	 /* Formats a string just like string.format in C#.
    *  Example:
    *  _formatString('Hello {0}','Halil') = 'Hello Halil'
    ************************************************************/
    app.utils.formatString = function () {
        if (arguments.length == 0) {
            return null;
        }

        var str = arguments[0];
        for (var i = 1; i < arguments.length; i++) {
            var placeHolder = '{' + (i - 1) + '}';
            str = str.replace(placeHolder, arguments[i]);
        }

        return str;
    };
	app.utils.getUrlParam = function(name)  
    {  
        var reg = new RegExp("(^|&)"+ name +"=([^&]*)(&|$)");  
        var r = window.location.search.substr(1).match(reg);  
        if (r!=null) return r[2]; return null;
    };
    //像素X到经度

    app.utils.pixelToLng=function(pixelX, zoom) {
        return pixelX * 360 / (256 << zoom) - 180;
    };

    //像素Y到纬度

    app.utils.pixelToLat=function(pixelY, zoom) {
        var y = 2 * Math.PI * (1 - pixelY / (128 << zoom));

        var z = Math.pow(Math.E, y);

        var siny = (z - 1) / (z + 1);

        return Math.sin(siny) * 180 / Math.PI;
    };
	//纬度到像素y
	app.utils.latToPixel=function(lat,zoom){
		var siny = Math.sin(lat*Math.PI/Number(180));
        var y = Math.log((1 + siny)/(1 - siny));
        return (Number(128) << zoom)*(1 - y/(2*Math.PI));
	};
	//经度到像素x
	app.utils.lngToPixel=function(lng,zoom){

		return (lng + 180)*(Number(256) << zoom)/360;
	};
	/* cookie **********************************************/
	app.cookie=app.cookie||{};

	app.cookie.set=function (key,value,expiredays){
		var exdate=new Date();
        var flag;
		exdate.setDate(exdate.getDate()+expiredays);
		//document.cookie=key+ "=" +encodeURIComponent(value)+
		//((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
        flag = docCookies.setItem(key, value, exdate);
        return flag;
	};
	app.cookie.get=function(key){
		//if (document.cookie.length>0)
		//{
		//	var c_start=document.cookie.indexOf(c_name + "=");
		//	if (c_start!=-1)
		//	{
		//		c_start=c_start + c_name.length+1
		//		var c_end=document.cookie.indexOf(";",c_start);
		//		if (c_end==-1) c_end=document.cookie.length;
         //       return document.cookie.substring(c_start,c_end);
		//	}
		//}
		//return ""
        var cookie;
        cookie=docCookies.getItem(key);
        return cookie;
	};

    app.cookie.remove= function (key) {
        var flag;
        flag=docCookies.removeItem(key);
        return flag;
    };

	/* AUTHORIZATION **********************************************/

	app.auth = app.auth || {};

	/* UI *******************************************************/

    app.ui = app.ui || {};

    /* UI BLOCK */
    //Defines UI Block API, not implements it

    app.ui.block = function (elm) {
    	console.log('not implement');
    };

    app.ui.unblock = function (elm) {
    	console.log('not implement');
    };

    /* UI BUSY */
    //Defines UI Busy API, not implements it

    app.ui.setBusy = function (elm, options) {
    	console.log('not implement');
    };

    app.ui.clearBusy = function (elm) {
    	console.log('not implement');
    };

	/* config  **********************************************/
	app.config=app.config||{};
	app.config={
		wait:60,
		limit:9,
		userdomain:'http://121.41.92.56:8002/',
		resourcedomain:'http://121.41.92.56:8003/',
		upload:'http://121.41.92.56:8001/',
		ip:'http://121.41.92.56/',
        ajaxDefaultOpts:{
            dataType: 'json',
            type: 'POST',
            contentType:'application/x-www-form-urlencoded'
        },
        categroy:{
            default:{
                id:0,
                title:'未知'
            },
            tjy:{
                id:1,
                title:'田家园'
            },
            ybs:{
                id:2,
                title:'云板书'
            },
            szqp:{
                id:3,
                title:'数字切片'
            },
            pic:{
                id:4,
                title:'图片'
            },
            video:{
                id:5,
                title:'视频'
            },
            radio:{
                id:6,
                title:'语音'
            },
            course:{
                id:7,
                title:'课程'
            },
            klass:{
                id:8,
                title:'知识点'
            },
            user:{
                id:9,
                title:'用户'
            },
            gourp:{
                id:10,title:'机构'
            }
        }
	};
})(jQuery);
