(function(window) {

    window.app = window.app || {};

    var keyMap = {};
    
    window.app.initNav = function() {

        keyMap[VK_LEFT] = 'left';
        keyMap[VK_RIGHT] = 'right';
        keyMap[VK_UP] = 'up';
        keyMap[VK_DOWN] = 'down';
        keyMap[VK_ENTER] = 'enter';
        keyMap[VK_BACK] = 'back';
        keyMap[VK_EXIT] = 'exit';

        keyMap[VK_0] = 0;
        keyMap[VK_1] = 1;
        keyMap[VK_2] = 2;
        keyMap[VK_3] = 3;
        keyMap[VK_4] = 4;
        keyMap[VK_5] = 5;
        keyMap[VK_6] = 6;
        keyMap[VK_7] = 7;
        keyMap[VK_8] = 8;
        keyMap[VK_9] = 9;

        var doNav = function($cur, dataValue) {
            $cur.removeClass('focus');
            var $elt = $(dataValue);
            $elt.addClass('focus');
        };

        var doAction = function($elt, dataValue) {

        };

        $(document).on('keydown', function(e) {

            //debug('kc ' + e.keyCode); 

            var $elt = $('.focus');
            if ($elt.count() === 0) {
                debug('No focus');
                return;
            }
            if (typeof(keyMap[e.keyCode]) === 'undefined') {
                debug('Ignoring key ' + e.keyCode);
                return;
            }

            e.preventDefault();

            if (e.keyCode == VK_EXIT) {
                window.app.exit();
                return true;
            }

            var dataKey = keyMap[e.keyCode];
            var dataValue = $elt.get(0).getAttribute('data-' + dataKey);
            if (dataValue) {
                debug(dataValue);
                switch (e.keyCode) {
                    case VK_LEFT:
                    case VK_UP:
                    case VK_RIGHT:
                    case VK_DOWN:
                        doNav($elt, dataValue);
                        break;
                    case VK_ENTER:
                        doAction($elt, dataValue);
                        break;
                }
            } else {
                var dataHandler = $elt.get(0).getAttribute('data-handler');
                if (dataHandler) {
                    window.app[dataHandler].onkeydown(e.keyCode);
                } else {
                    debug('no data- and no handler set for ' + dataKey);
                }
            }

            return true;
        });

        $('.nav').on('click', function(e) {
            $cur = $('.focus');
            $cur.removeClass('focus');
            $elt = $(e.target);
            $elt.addClass('focus');

            var dataValue = $elt.get(0).getAttribute('data-enter');
            if (dataValue) {
                doAction($elt, dataValue);
            } else {
                var dataHandler = $elt.get(0).getAttribute('data-handler');
                if (dataHandler) {
                    window.app[dataHandler].onkeydown(VK_ENTER);
                } else {
                    debug('no data- and no handler set for ' + dataKey);
                }
            }

        });

        $('.nav').on('mouseover', function(e) {
            $cur = $('.focus');
            $cur.removeClass('focus');
            $elt = $(e.target);
            $elt.addClass('focus');
        });

        window.app.input.$elt = $('.input');
    };

    window.app.setFocus = function(selector) {
        $('.focus').removeClass('focus');
        $(selector).addClass('focus')
    };

    window.app.input = {
        $elt: null,
        onkeydown: function(keyCode) {
            debug('input.onkeydown ' + keyCode);
            switch (keyCode) {
                case VK_0:
                case VK_1:
                case VK_2:
                case VK_3:
                case VK_4:
                case VK_5:
                case VK_6:
                case VK_7:
                case VK_8:
                case VK_9:
                    debug('' + keyMap[keyCode]);
                    window.app.input.addNum(keyMap[keyCode]);
                    break;
                case VK_ENTER:
                    var $elt = $('.focus');
                    if ($elt.hasClass('key')) {
                        window.app.input.addNum(parseInt($elt.html()));
                    } else if ($elt.hasClass('delKey')) {
                        window.app.input.del();
                    } else if ($elt.hasClass('ok')) {
                        window.app.setPollUrl(window.app.input.getValue());
                    } else {
                        debug($elt);   
                    }
                    break;
            }
        },
        getValue: function() {
            return window.app.input.$elt.get(0).innerHTML;
        },
        setValue: function(value) {
            window.app.input.$elt.html('' + value);
        },
        addNum: function(num) {
            window.app.input.setValue(window.app.input.getValue() + '' + num);
        },
        del: function() {
            var tmp = window.app.input.getValue();
            if (tmp.length > 0) {
                window.app.input.setValue(tmp.substr(0, tmp.length - 1));
            }
        }
    };

})(window);