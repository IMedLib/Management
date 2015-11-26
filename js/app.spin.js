var app = app || {};
(function () {
    document.write("<script src='/bower_components/spin/javascripts/spin.js'></script>");

    $.fn.spin = function(opts) {
          this.each(function() {
            var $this = $(this),
            data = $this.data();

            if (data.spinner) {
              data.spinner.stop();
              delete data.spinner;
          }
          if (opts !== false) {
              data.spinner = new Spinner($.extend({color: $this.css('color')}, opts)).spin(this);
          }
        });
      return this;
    };

    app.libs = app.libs || {};

    app.libs.spinjs = {

        spinner_config: {
            lines: 11,
            length: 0,
            width: 10,
            radius: 20,
            corners: 1.0,
            trail: 60,
            speed: 1.2
        },

        //Config for busy indicator in element's inner element that has '.app-busy-indicator' class.
        spinner_config_inner_busy_indicator: {
            lines: 11,
            length: 0,
            width: 4,
            radius: 7,
            corners: 1.0,
            trail: 60,
            speed: 1.2
        }

    };

    app.ui.setBusy = function (elm, optionsOrPromise) {
        optionsOrPromise = optionsOrPromise || {};
        if (optionsOrPromise.always || optionsOrPromise['finally']) { //Check if it's promise
            optionsOrPromise = {
                promise: optionsOrPromise
            };
        }

        var options = $.extend({}, optionsOrPromise);

        if (!elm) {
            if (options.blockUI != false) {
                app.ui.block();
            }

            $('body').spin(app.libs.spinjs.spinner_config);
        } else {
            var $elm = $(elm);
            var $busyIndicator = $elm.find('.app-busy-indicator'); //TODO@Halil: What if  more than one element. What if there are nested elements?
            if ($busyIndicator.length) {
                $busyIndicator.spin(app.libs.spinjs.spinner_config_inner_busy_indicator);
            } else {
                if (options.blockUI != false) {
                    app.ui.block(elm);
                }

                $elm.spin(app.libs.spinjs.spinner_config);
            }
        }

        if (options.promise) { //Supports Q and jQuery.Deferred
            if (options.promise.always) {
                options.promise.always(function () {
                    app.ui.clearBusy(elm);
                });
            } else if (options.promise['finally']) {
                options.promise['finally'](function () {
                    app.ui.clearBusy(elm);
                });
            }
        }
    };

    app.ui.clearBusy = function (elm) {
        //TODO@Halil: Maybe better to do not call unblock if it's not blocked by setBusy
        if (!elm) {
            app.ui.unblock();
            $('body').spin(false);
        } else {
            var $elm = $(elm);
            var $busyIndicator = $elm.find('.app-busy-indicator');
            if ($busyIndicator.length) {
                $busyIndicator.spin(false);
            } else {
                app.ui.unblock(elm);
                $elm.spin(false);
            }
        }
    };

})();