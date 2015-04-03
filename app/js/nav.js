(function(window) {

    window.app = window.app || {};

    var keyMap = {};

    window.app.initNav = function() {

        $(document).on('keydown', function(e) {
            e.preventDefault();
            window.app.exit();
        });

        $('.nav').on('click', function(e) {
            window.app.exit();
        });

        $('.nav').on('mouseover', function(e) {
            $cur = $('.focus');
            $cur.removeClass('focus');
            $elt = $(e.target);
            $elt.addClass('focus');
        });
    };

    window.app.setFocus = function(selector) {
        $('.focus').removeClass('focus');
        $(selector).addClass('focus')
    };


})(window);