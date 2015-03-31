(function(window) {

    window.VK_LEFT = 37;
    window.VK_UP = 38;
    window.VK_RIGHT = 39;
    window.VK_DOWN = 40;
    window.VK_ENTER = 13;
    window.VK_BACK = 8;
    window.VK_EXIT = 27;

    window.VK_0 = 48;
    window.VK_1 = 49;
    window.VK_2 = 50;
    window.VK_3 = 51;
    window.VK_4 = 52;
    window.VK_5 = 53;
    window.VK_6 = 54;
    window.VK_7 = 55;
    window.VK_8 = 56;
    window.VK_9 = 57;

    window.app = window.app || {};

    window.app.prepareDevice = function() {
        debug('prepare device');
    };

    window.app.exit = function() {
        debug('app.exit');
    };

    window.app.initDevice = function() {

        debug('init device');
        window.app.start();
    };

})(window);