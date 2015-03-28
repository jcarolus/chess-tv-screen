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
        var loadObj = function(id, clsid) {
            var obj = document.createElement('object');
            obj.id = id;
            obj.setAttribute('classid', clsid);
            document.body.appendChild(obj);
            return obj;
        };
        loadObj('pluginObjectNNavi', 'clsid:SAMSUNG-INFOLINK-NNAVI');
        loadObj('APPCOMMON', 'clsid:SAMSUNG-INFOLINK-APPCOMMON');
        loadObj('pluginObjectTVMW', 'clsid:SAMSUNG-INFOLINK-TVMW');

        var network = loadObj('pluginObjectNetwork ', 'clsid:SAMSUNG-INFOLINK-NETWORK');
        debug(network.GetIP(1) || network.GetIP(0));

        var tries = 0;
        var doCommon = function(){
            debug('doCommon');
            if (typeof(Common) !== 'undefined' && Common.API && Common.API.Plugin && Common.API.Widget) {
                try {
                    var tvKey = new Common.API.TVKeyValue();
                    var widgetAPI = new Common.API.Widget();
                    var plugin = new Common.API.Plugin();
                    
                    window.VK_LEFT = tvKey.KEY_LEFT;
                    window.VK_UP = tvKey.KEY_UP;
                    window.VK_RIGHT = tvKey.KEY_RIGHT;
                    window.VK_DOWN = tvKey.KEY_DOWN;
                    window.VK_ENTER = tvKey.KEY_ENTER;
                    window.VK_BACK = tvKey.KEY_RETURN;
                    window.VK_EXIT = tvKey.KEY_EXIT;
                    
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
            } else {
                if(tries < 2){
                    tries++;
                    setTimeout(doCommon, 100); 
                } else {
                    debug('Tried to init device... failed...');   
                }
            }
        };
        
        doCommon();
    };

})(window);