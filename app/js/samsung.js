(function(window) {

    window.app = window.app || {};

    window.app.prepareDevice = function() {
        debug('prepare device');

        var loadJS = function(src) {
            var script = document.createElement('script');
            document.head.appendChild(script);
            script.src = src;
        };

        loadJS('$MANAGER_WIDGET/Common/API/TVKeyValue.js');
        loadJS('$MANAGER_WIDGET/Common/API/Widget.js');
        loadJS('$MANAGER_WIDGET/Common/API/Plugin.js');

    };

    window.app.initDevice = function() {

        debug('init device');

        try {
            var tvKey = new Common.API.TVKeyValue();
            var widgetAPI = new Common.API.Widget();
            var plugin = new Common.API.Plugin();
        } catch (ex) {
            debug(ex);
        }

        var onShowCalled = false;
        window.onShow = function() {
            if (onShowCalled) {
                return;
            }

            onShowCalled = true;

            try {
                plugin.registKey(tvKey.KEY_EXIT);

                document.addEventListener('keydown', function(e) {
                    if (e.keyCode == tvKey.KEY_EXIT) {
                        widgetAPI.sendExitEvent();
                    }
                });

            } catch (ex) {
                debug(ex);
            }

            window.app.start();
        };

        // for emulator
        setTimeout(function() {
            onShow();
        }, 2000);

        try {
            widgetAPI.sendReadyEvent();
        } catch (ex) {
            debug(ex);
        }
    };

})(window);