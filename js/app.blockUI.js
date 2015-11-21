var app = app || {};
(function () {

    if (!$.blockUI) {
        return;
    }

    $.extend($.blockUI.defaults, {
        message: ' ',
        css: { },
        overlayCSS: {
            backgroundColor: '#AAA',
            opacity: 0.3,
            cursor: 'wait'    
        }
    });
    
    app.ui.block = function (elm) {
        if (!elm) {
            $.blockUI();
        } else {
            $(elm).block();
        }
    };

    app.ui.unblock = function (elm) {
        if (!elm) {
            $.unblockUI();
        } else {
            $(elm).unblock();
        }
    };

})();