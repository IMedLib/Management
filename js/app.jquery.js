var app = app || {};
(function ($) {

    if (!$) {
        return;
    }

    /* JQUERY ENHANCEMENTS ***************************************************/

    // app.ajax -> uses $.ajax ------------------------------------------------

    //TODO: Think to implement success, error and complete callbacks
    app.ajax = function (userOptions) {
        userOptions = userOptions || {};
        userOptions.error=userOptions.error||error;
        var options= $.extend({}, app.ajax.defaultOpts, userOptions);
        return $.ajax(options)
                .done(function (data) {
                    appAjaxHelper.handleData(data, userOptions);
                }).fail(function () {
                    options.error("通讯错误，请稍后再试!");
                });
    };

    function error(msg){
        app.message.error(msg);
    }
    app.ajax.resultType={
        DATA:0,
        LIST:1,
        INFO:2,
        GET:3,
        FLAG:4
    };
    app.ajax.defaultOpts = {
        dataType: 'json',
        type: 'POST',
        contentType:'application/x-www-form-urlencoded',
        resultType:app.ajax.resultType.DATA
    };

    /* JQUERY PLUGIN ENHANCEMENTS ********************************************/

    /* jQuery Form Plugin 
     * http://www.malsup.com/jquery/form/
     */

    // appAjaxForm -> uses ajaxForm ------------------------------------------

    $.fn.appAjaxForm = function (userOptions) {
        userOptions = userOptions || {};

        var options = $.extend({}, $.fn.appAjaxForm.defaults, userOptions);

        options.beforeSubmit = function () {
            appAjaxHelper.blockUI(options);
            userOptions.beforeSubmit && userOptions.beforeSubmit.apply(this, arguments);
        };

        options.success = function (data) {
            appAjaxHelper.handleData(data, userOptions);
        };

        //TODO: Error?

        options.complete = function () {
            appAjaxHelper.unblockUI(options);
            userOptions.complete && userOptions.complete.apply(this, arguments);
        };

        return this.ajaxForm(options);
    };

    $.fn.appAjaxForm.defaults = {
        method: 'POST'
    };

    /* PRIVATE METHODS *******************************************************/

    //TODO: Extract block/spin options

    //Used on ajax request
    var appAjaxHelper = {

        blockUI: function (options) {
            if (options.blockUI) {
                if (options.blockUI === true) { //block whole page
                    app.ui.setBusy();
                } else { //block an element
                    app.ui.setBusy(options.blockUI);
                }
            }
        },

        unblockUI: function (options) {
            if (options.blockUI) {
                if (options.blockUI === true) { //unblock whole page
                    app.ui.clearBusy();
                } else { //unblock an element
                    app.ui.clearBusy(options.blockUI);
                }
            }
        },

        handleData: function (data, userOptions) {
            if (data) {
                if (data.code === 0) {
                    if(!userOptions.success) {return data;}
                    switch(userOptions.resultType){
                        case app.ajax.resultType.INFO:
                            userOptions.success(data.info);
                            break;
                        case app.ajax.resultType.LIST:
                            userOptions.success(data.list);
                            break;
                        case app.ajax.resultType.GET:
                            userOptions.success(data.get);
                            break;
                        // case app.ajax.resultType.FLAG:
                        //     break;
                        default:
                            userOptions.success(data);
                            break;
                    }
                    
                } else {
                    if (data.code==1) {
                        userOptions.error(data.msg);
                    }else if(data.code==2){
                        userOptions.error('系统错误,请稍后再试!');
                    }
                }
            }else{
                userOptions.error('数据出错！');
            }
        }
    };

})(jQuery);