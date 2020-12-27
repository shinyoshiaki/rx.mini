"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event() {
        var _this = this;
        this.event = { stack: [], index: 0 };
        this.execute = function () {
            var args = [];
            for (var _i = 0; _i < arguments.length; _i++) {
                args[_i] = arguments[_i];
            }
            for (var _a = 0, _b = _this.event.stack; _a < _b.length; _a++) {
                var item = _b[_a];
                item.execute.apply(item, args);
            }
        };
        this.complete = function () {
            for (var _i = 0, _a = _this.event.stack; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.complete)
                    item.complete();
            }
            _this.allUnsubscribe();
        };
        this.error = function (e) {
            for (var _i = 0, _a = _this.event.stack; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item.error)
                    item.error(e);
            }
            _this.allUnsubscribe();
        };
        this.allUnsubscribe = function () {
            _this.event = { stack: [], index: 0 };
        };
        this.subscribe = function (execute, complete, error) {
            var id = _this.event.index;
            _this.event.stack.push({ execute: execute, id: id, complete: complete, error: error });
            _this.event.index++;
            var unSubscribe = function () {
                _this.event.stack = _this.event.stack.filter(function (item) { return item.id !== id && item; });
            };
            return { unSubscribe: unSubscribe };
        };
        this.once = function (execute, complete, error) {
            var off = _this.subscribe(function () {
                var args = [];
                for (var _i = 0; _i < arguments.length; _i++) {
                    args[_i] = arguments[_i];
                }
                off.unSubscribe();
                execute.apply(void 0, args);
            }, complete, error);
        };
        this.asPromise = function (timeLimit) {
            return new Promise(function (resolve, reject) {
                var timeout = timeLimit &&
                    setTimeout(function () {
                        reject("Event asPromise timeout");
                    }, timeLimit);
                _this.once(function () {
                    var args = [];
                    for (var _i = 0; _i < arguments.length; _i++) {
                        args[_i] = arguments[_i];
                    }
                    if (timeout)
                        clearTimeout(timeout);
                    resolve(args);
                }, function () {
                    if (timeout)
                        clearTimeout(timeout);
                    resolve([]);
                }, function (err) {
                    if (timeout)
                        clearTimeout(timeout);
                    reject(err);
                });
            });
        };
    }
    Object.defineProperty(Event.prototype, "returnTrigger", {
        get: function () {
            var _a = this, execute = _a.execute, error = _a.error, complete = _a.complete;
            return { execute: execute, error: error, complete: complete };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "returnListener", {
        get: function () {
            var _a = this, subscribe = _a.subscribe, once = _a.once, asPromise = _a.asPromise;
            return { subscribe: subscribe, once: once, asPromise: asPromise };
        },
        enumerable: false,
        configurable: true
    });
    Object.defineProperty(Event.prototype, "length", {
        get: function () {
            return this.event.stack.length;
        },
        enumerable: false,
        configurable: true
    });
    return Event;
}());
exports.default = Event;
//# sourceMappingURL=index.js.map