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

    var pollUrl = false;

    window.app.setPollUrl = function(LANCode) {
        if (LANCode && LANCode.length == 14) {
            pollUrl = 'http://' +
                parseInt(LANCode.substr(0, 3)) + '.' +
                parseInt(LANCode.substr(3, 3)) + '.' +
                parseInt(LANCode.substr(6, 3)) + '.' +
                parseInt(LANCode.substr(9, 3)) + ':80' +
                parseInt(LANCode.substr(12, 2));
        }
    };

    window.app.setPollUrl(queryParam('LANCode') || (queryParam('debug') ? '19216817802392' : false));

    var lastFEN = false;

    var xhrGet = function(url, onSuccess, onError) {
        try {
            var xhr = new XMLHttpRequest();
            xhr.open('GET', url, true);
            xhr.setRequestHeader('Accept', 'application/json');
            xhr.timeout = 10000;
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
        } catch (ex) {
            console.log('xhr caught ' + ex);
            onError(0);
        }
    };

    window.app.poll = function() {

        console.log('Polling: ' + pollUrl);

        if (pollUrl) {
            xhrGet(pollUrl, function(responseText) {
                document.body.className = "connected";
                try {
                    var data = JSON.parse(responseText);
                    console.log('Got FEN ' + data.FEN);
                    if (lastFEN != data.FEN) {
                        window.app.loadFEN(data.FEN, 'board', 70);
                        lastFEN = data.FEN;
                    }
                } catch (ex) {
                    console.log(ex);
                }
                setTimeout(function() {
                    window.app.poll();
                }, 1000);
            }, function(status) {
                console.log('xhr status ' + status);

                document.body.className = "no-connection";

                setTimeout(function() {
                    window.app.poll();
                }, 5000);
            });
        } else {
            document.body.className = "no-device";
        }
    };

})(window);