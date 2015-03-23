(function(window) {

    window.app = window.app || {};

    var queryParam = function(key) {
        var url = window.location.href;
        var keysValues = url.split(/[\?&]+/);
        for (i = 0; i < keysValues.length; i++) {
            var keyValue = keysValues[i].split("=");
            if (keyValue[0] == key) {
                return keyValue[1];
            }
        }
        return false;
    };
    
    // hard coded IP and port of the Android device until the DIAL param can be fetched
    var LANCode = queryParam('LANCode');
    var pollUrl = false; 
    
    if(false === LANCode){
        LANCode = '19216817802392';
    }
    
    if(LANCode && LANCode.length == 14){
        pollUrl = 'http://' + 
            parseInt(LANCode.substr(0, 3)) + '.' + 
            parseInt(LANCode.substr(3, 3)) + '.' + 
            parseInt(LANCode.substr(6, 3)) + '.' + 
            parseInt(LANCode.substr(9, 3)) + ':80' + 
            parseInt(LANCode.substr(12, 2)) + '.';
    } 

    var lastFEN = false;

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

    window.app.poll = function() {

        debug('Polling: ' + pollUrl);

        if (pollUrl) {
            xhrGet(pollUrl, function(responseText) {
                document.body.className = "connected";
                try {
                    ChessCallBack(JSON.parse(responseText));
                } catch (ex) {
                    debug(ex);
                }
                setTimeout(function() {
                    window.app.poll();
                }, 1000);
            }, function(status) {

                if (pollUrl) {
                    document.body.className = "not-connected";
                }
                setTimeout(function() {
                    window.app.poll();
                }, 5000);
            });
        } else {
            document.body.className = "no-device";
        }
    };

})(window);