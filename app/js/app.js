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
    };

    var xhrGet = function(url, onSuccess, onError) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', url, true);
        xhr.setRequestHeader('Accept', 'application/json');
        xhr.onreadystatechange = function() {
            if (xhr.readyState == 4) {
                if (xhr.status == 200) {
                    onSuccess(xhr.responseText);
                } else {
                    onError(xhr.status);
                }
            }
        };

        xhr.send();
    };

    var poll = function() {

        debug('Polling...');
        var url = pollUrl;

        xhrGet(url, function(responseText) {
            try {
                ChessCallBack(JSON.parse(responseText));
            } catch (ex) {

            }
            setTimeout(function() {
                poll();
            }, 1000);
        }, function(status) {
            setTimeout(function() {
                poll();
            }, 5000);
        });
    };

    window.start = function() {
        poll();
    };

})(window);