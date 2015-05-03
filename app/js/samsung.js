(function(window, document) {

    window.app = window.app || {};

    window.app.prepareDevice = function() {
        console.log('prepare device');

        var loadJS = function(src) {
            var script = document.createElement('script');
            document.head.appendChild(script);
            script.src = src;
        };

        loadJS('$MANAGER_WIDGET/Common/API/TVKeyValue.js');
        loadJS('$MANAGER_WIDGET/Common/API/Widget.js');
        loadJS('$MANAGER_WIDGET/Common/API/Plugin.js');
    };
    
    window.app.exit = function(){
        console.log('app.exit - not initialized');
    };

    window.app.initDevice = function() {

        console.log('init device');
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
        console.log(network.GetIP(1) || network.GetIP(0));

        var tries = 0;
        var doCommon = function(){
            console.log('doCommon');
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
                    
                    window.VK_0 = tvKey.KEY_0;
                    window.VK_1 = tvKey.KEY_1;
                    window.VK_2 = tvKey.KEY_2;
                    window.VK_3 = tvKey.KEY_3;
                    window.VK_4 = tvKey.KEY_4;
                    window.VK_5 = tvKey.KEY_5;
                    window.VK_6 = tvKey.KEY_6;
                    window.VK_7 = tvKey.KEY_7;
                    window.VK_8 = tvKey.KEY_8;
                    window.VK_9 = tvKey.KEY_9;
                    
                    window.app.exit = function(){
                        widgetAPI.sendExitEvent();
                    };
                    
                } catch (ex) {
                    console.log(ex);
                }

                var onShowCalled = false;
                window.onShow = function() {
                    if (onShowCalled) {
                        return;
                    }

                    onShowCalled = true;

                    try {
                        plugin.registKey(tvKey.KEY_EXIT);
                    } catch (ex) {
                        console.log(ex);
                    }

                    window.app.start();
                };

                // for emulator
                window.setTimeout(function() {
                    onShow();
                }, 2000);

                try {
                    widgetAPI.sendReadyEvent();
                } catch (ex) {
                    console.log(ex);
                }
            } else {
                if(tries < 2){
                    tries++;
                    setTimeout(doCommon, 100); 
                } else {
                    console.log('Tried to init device... failed...');   
                }
            }
        };
        
        doCommon();
    };

})(this, this.document);