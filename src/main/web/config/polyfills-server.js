// var global = this;
// var self = this;
var window = this;
// var process = {env: {}};
var console = {};
console.debug = print;
console.warn = print;
console.log = print;
console.error = print;
console.trace = print;

Object.assign = function (t) {
    for (var s, i = 1, n = arguments.length; i < n; i++) {
        s = arguments[i];
        for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p))
            t[p] = s[p];
    }
    return t;
};


(function nashornEventLoopMain(context) {
    'use strict';

    if (window.setTimeout ||
        window.clearTimeout ||
        window.setInterval ||
        window.clearInterval) {
        return;
    }

    var Timer = window.Java.type('java.util.Timer');

    function toCompatibleNumber(val) {
        switch (typeof val) {
            case 'number':
                break;
            case 'string':
                val = parseInt(val, 10);
                break;
            case 'boolean':
            case 'object':
                val = 0;
                break;

        }
        return val > 0 ? val : 0;
    }

    function setTimerRequest(handler, delay, interval, args) {
        handler = handler || function () {
        };
        delay = toCompatibleNumber(delay);
        interval = toCompatibleNumber(interval);

        var applyHandler = function () {
            handler.apply(this, args);
        };

        /*var runLater = function () {
         Platform.runLater(applyHandler);
         };*/

        var timer;
        if (interval > 0) {
            timer = new Timer('setIntervalRequest', true);
            timer.schedule(applyHandler, delay, interval);
        } else {
            timer = new Timer('setTimeoutRequest', false);
            timer.schedule(applyHandler, delay);
        }

        return timer;
    }

    function clearTimerRequest(timer) {
        timer.cancel();
    }

    /////////////////
    // Set polyfills
    /////////////////
    window.setInterval = function setInterval() {
        var args = Array.prototype.slice.call(arguments);
        var handler = args.shift();
        var ms = args.shift();

        return setTimerRequest(handler, ms, ms, args);
    };

    window.clearInterval = function clearInterval(timer) {
        clearTimerRequest(timer);
    };

    window.setTimeout = function setTimeout() {
        var args = Array.prototype.slice.call(arguments);
        var handler = args.shift();
        var ms = args.shift();

        return setTimerRequest(handler, ms, 0, args);
    };

    window.clearTimeout = function clearTimeout(timer) {
        clearTimerRequest(timer);
    };

    window.setImmediate = function setImmediate() {
        var args = Array.prototype.slice.call(arguments);
        var handler = args.shift();

        return setTimerRequest(handler, 0, 0, args);
    };

    window.clearImmediate = function clearImmediate(timer) {
        clearTimerRequest(timer);
    };

})(typeof window !== "undefined" && window || typeof self !== "undefined" && self || this);