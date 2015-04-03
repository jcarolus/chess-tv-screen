// console polyfill
! function (e) {
    "use strict";
    for (var r, o, t = {}, n = function () {}, l = "memory".split(","), i = "assert,clear,count,debug,dir,dirxml,error,exception,group,groupCollapsed,groupEnd,info,log,markTimeline,profile,profiles,profileEnd,show,table,time,timeEnd,timeline,timelineEnd,timeStamp,trace,warn".split(","); r = l.pop();) e[r] = e[r] || t;
    for (; o = i.pop();) e[o] = e[o] || n
}(this.console = this.console || {});

(function(window) {
    
    window.app = window.app || {};
    
    window.app.onLoad = function() {
        window.app.initDevice();
    };

    window.app.start = function() {
        window.app.initNav();
        window.app.poll();
    }
    
    window.app.prepareDevice();

})(window);