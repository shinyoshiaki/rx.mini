"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Event = /** @class */ (function () {
    function Event() {
        var _this = this;
        this.event = { stack: [], index: 0 };
        this.execute = function (data) {
            for (var _i = 0, _a = _this.event.stack; _i < _a.length; _i++) {
                var item = _a[_i];
                item.func(data);
            }
        };
        this.executeNull = function () {
            for (var _i = 0, _a = _this.event.stack; _i < _a.length; _i++) {
                var item = _a[_i];
                item.func(undefined);
            }
        };
        this.subscribe = function (func) {
            var id = _this.event.index;
            _this.event.stack.push({ func: func, id: id });
            _this.event.index++;
            var unSubscribe = function () {
                _this.event.stack = _this.event.stack.filter(function (item) { return item.id !== id && item; });
            };
            return { unSubscribe: unSubscribe };
        };
        this.allUnsubscribe = function () {
            _this.event = { stack: [], index: 0 };
        };
        this.once = function (func) {
            var off = _this.subscribe(function (data) {
                off.unSubscribe();
                func(data);
            });
        };
        this.asPromise = function (timelimit) {
            return new Promise(function (resolve, reject) {
                var timeout = timelimit &&
                    setTimeout(function () {
                        reject("Event asPromise timeout");
                    }, timelimit);
                _this.once(function (data) {
                    if (timeout)
                        clearTimeout(timeout);
                    resolve(data);
                });
            });
        };
    }
    return Event;
}());
exports.default = Event;
//# sourceMappingURL=index.js.map