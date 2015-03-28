(function(window) {

    window.VK_LEFT = 37;
    window.VK_UP = 38;
    window.VK_RIGHT = 39;
    window.VK_DOWN = 40;
    window.VK_ENTER = 13;
    window.VK_BACK = 8;
    window.VK_EXIT = 27;
 
    window.app = window.app || {};

    window.app.prepareDevice = function() {
        debug('prepare device');
    };

    window.app.initDevice = function() {

        debug('init device');
        window.app.start();
    };

})(window);