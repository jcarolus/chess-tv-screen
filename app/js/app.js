(function(window) {

    var lastFEN = false;

    var debug = function(s) {
        console.log(s);
    }

    // JSONP callback from Android Chess app
    window.ChessCallBack = function(data) {
        debug('Got FEN ' + data.FEN);
        if (lastFEN != data.FEN) {
            loadFEN(data.FEN, 'board', 70);
            lastFEN = data.FEN;
        }

        setTimeout(function() {
            poll();
        }, 1000);
    };

    var poll = function() {
        var timeout = 3000,
            callBackTimeout = function() {
                debug('Poll timed out');
                setTimeout(function() {
                    poll();
                }, 5000);
            };
        debug('Polling...');
        var url = pollUrl;
        var script, head = document.head || document.getElementsByTagName("head")[0] || document.documentElement;
        script = document.createElement("script");
        script.async = "async";
        script.src = url;
        head.insertBefore(script, head.firstChild);

        script.onload = script.onreadystatechange = function(_, isAbort) {
            if (isAbort || !script.readyState || /loaded|complete/.test(script.readyState)) {

                // Handle memory leak in IE
                script.onload = script.onreadystatechange = null;

                // Remove the script
                if (head && script.parentNode) {
                    head.removeChild(script);
                }
                script = undefined;
            }
        };

        if (timeout && callBackTimeout) {
            setTimeout(function() {
                if (script) {
                    script.onload(0, true);
                    callBackTimeout();
                }
            }, timeout);
        }
    };

    var startPoll = function() {
        poll();
    };

    window.start = function() {
        startPoll();
    };

})(window);