/* global escape */
var app=app||{};
(function($){
	if(!$)
		return;
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
        if (r!=null) return unescape(r[2]); return null;  
    } 
    //像素X到经度

    app.utils.pixelToLng=function(pixelX, zoom) {
        return pixelX * 360 / (parseFloat(256) << zoom) - 180;
    }

    //像素Y到纬度

    app.utils.pixelToLat=function(pixelY, zoom) {
        var y = 2 * Math.PI * (1 - pixelY / (parseFloat(128) << zoom));

        var z = Math.pow(Math.E, y);

        var siny = (z - 1) / (z + 1);

        return Math.sin(siny) * 180 / Math.PI;
    }
	//纬度到像素y
	app.utils.latToPixel=function(lat,zoom){
		var siny = Math.sin(lat*Math.PI/180);
        var y = Math.log((1 + siny)/(1 - siny));
        return (128 << zoom)*(1 - y/(2*Math.PI));
	}
	//经度到像素x
	app.utils.lngToPixel=function(lng,zoom){

		return (lng + 180)*(parseFloat(256) << zoom)/360;
	}
	/* cookie **********************************************/
	app.cookie=app.cookie||{};

	app.cookie.set=function (key,value,expiredays){
		var exdate=new Date();
		exdate.setDate(exdate.getDate()+expiredays)
		document.cookie=key+ "=" +escape(value)+
		((expiredays==null) ? "" : ";expires="+exdate.toGMTString())
	};
	app.cookie.get=function(c_name){
		if (document.cookie.length>0)
		{
			var c_start=document.cookie.indexOf(c_name + "=")
			if (c_start!=-1)
			{ 
				c_start=c_start + c_name.length+1 
				var c_end=document.cookie.indexOf(";",c_start)
				if (c_end==-1) c_end=document.cookie.length
					return unescape(document.cookie.substring(c_start,c_end))
			} 
		}
		return ""
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
		ip:'http://121.41.92.56/'
	};
})(jQuery);
