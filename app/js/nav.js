(function(window) {

    window.app = window.app || {};

    window.app.initNav = function() {

        var keyMap = {};
        keyMap[VK_LEFT] = 'left';
        keyMap[VK_RIGHT] = 'right';
        keyMap[VK_UP] = 'up';
        keyMap[VK_DOWN] = 'down';
        keyMap[VK_ENTER] = 'enter';
        keyMap[VK_BACK] = 'back';
        keyMap[VK_EXIT] = 'exit';

        $(document).on('keydown', function(e) {

            //debug('kc ' + e.keyCode); 

            var $elt = $('.focus');
            if ($elt.count() === 0) {
                debug('No focus');
                return;
            }
            if(typeof(keyMap[e.keyCode]) === 'undefined'){
                debug('Ignoring key ' + e.keyCode);
                return;
            }
                
            e.preventDefault();

            var dataKey = keyMap[e.keyCode];

            debug(dataKey);

            return true;
        });

    };


})(window);