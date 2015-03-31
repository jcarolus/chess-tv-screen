(function(window) {
    
    window.app = window.app || {};
    
    window.debug = function(s) {
        if (console && typeof(console.log) === 'function') {
            console.log(s);
        } else {
            alert(s);   
        }
    }
    
    window.app.onLoad = function() {
        window.app.initDevice();
    };

    window.app.start = function() {
        window.app.initNav();
        window.app.poll();
    }
    
    window.app.prepareDevice();

})(window);